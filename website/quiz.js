'use strict';
function parseBank(md){
 const starts=[...md.matchAll(/^#{2,6}\s+(?:Q(?:uestion)?\s*)?(\d+)[.):]\s+(.+)$/gim)];
 const items=[], rejected=[];
 for(let i=0;i<starts.length;i++){
  const m=starts[i],end=starts[i+1]?.index??md.length,body=md.slice(m.index+m[0].length,end);
  const answers=[...body.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)];
  const before=body.split(/<details\b/i)[0].replace(/<!--[\s\S]*?-->/g,'');
  const opts=[...before.matchAll(/^[ \t]*(?:[-*][ \t]+)?(?:\*\*)?([A-D])[.)](?:\*\*)?[ \t]+(.+)$/gm)];
  const splitOption=opts.slice(0,-1).some((o,j)=>before.slice(o.index+o[0].length,opts[j+1].index).trim()!=='');
  const keys=answers.flatMap((a,j)=>[...a[1].matchAll(/^\s*(?:\*\*)?(?:Correct(?:\s+answer)?|Answer)\s*:\s*(?:\*\*)?([A-D])(?:[.)\s]|$)/gim)].map(k=>({letter:k[1],block:j})));
  if(splitOption||opts.length!==4||opts.map(x=>x[1]).join('')!=='ABCD'||keys.length!==1||!m[2].trim()){rejected.push(m[1]);continue}
  const stem=m[2].trim();
  // Keep any non-option prompt lines and source metadata, including question diagrams.
  const extra=before.split('\n').filter(line=>!opts.some(o=>o[0].trim()===line.trim())).join('\n').trim();
  items.push({id:m[1]+'-'+i,stem,extra,options:opts.map(o=>o[2].trim()),key:keys[0].letter.toUpperCase(),explanation:answers[keys[0].block][1].replace(/<summary\b[^>]*>[\s\S]*?<\/summary>/i,'').trim()});
 }
 return {items,rejected,total:starts.length};
}
function scoreBank(items,selected,penalty){
 let correct=0,wrong=0,skipped=0;
 for(const q of items){const a=selected[q.id];if(!a)skipped++;else if(a===q.key)correct++;else wrong++}
 return {correct,wrong,skipped,score:correct-wrong*penalty,total:items.length};
}
// A changed source invalidates saved attempts rather than silently shifting answers.
function bankSignature(items){
 let h=2166136261;
 const text=JSON.stringify(items.map(q=>[q.id,q.stem,q.extra,q.options,q.key]));
 for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619)}
 return (h>>>0).toString(16)+'-'+items.length;
}
function validateAttempt(saved,items){
 if(!saved||saved.signature!==bankSignature(items)||!Number.isFinite(saved.deadline)||![0,1/3].includes(saved.penalty)||!Number.isInteger(saved.at)||saved.at<0||saved.at>=items.length||typeof saved.finished!=='boolean'||!saved.selected||typeof saved.selected!=='object'||Array.isArray(saved.selected))return null;
 const allowed=new Set(items.map(q=>q.id));const selected={};
 for(const [id,a] of Object.entries(saved.selected)){if(!allowed.has(id)||!['A','B','C','D'].includes(a))return null;selected[id]=a}
 return {...saved,selected};
}
function resultMetrics(items,selected,penalty){
 const s=scoreBank(items,selected,penalty),answered=s.correct+s.wrong;
 return {...s,answered,percentage:s.total?100*s.score/s.total:0,accuracy:answered?100*s.correct/answered:null};
}
function answerStatus(q,selected){return !selected[q.id]?'skipped':selected[q.id]===q.key?'correct':'incorrect'}
function mountQuiz(md,path,content,render,route){
 const bank=parseBank(md);if(!bank.total)return;
 const el=(tag,txt,cls)=>{const n=document.createElement(tag);if(txt!==undefined)n.textContent=txt;if(cls)n.className=cls;return n};
 const btn=(label,fn,cls)=>{const b=el('button',label,cls);b.type='button';b.onclick=fn;return b};
 const root=el('section',undefined,'quiz-panel');root.id='practice';content.before(root);
 const intro=el('div',undefined,'practice-intro');intro.append(el('p','STUDY • PRACTISE • REVIEW','kicker'),el('h2','Interactive practice'));
 const info=el('p',bank.items.length+' scoreable questions out of '+bank.total+' detected numbered headings. '+(bank.rejected.length?'Unsupported headings: '+bank.rejected.join(', ')+'. Use original reading mode for these.':'All detected numbered headings parsed.'),'muted');intro.append(info);root.append(intro);
 if(!bank.items.length)return;
 const description=el('p','Custom practice using the published source key. Original reading mode preserves unsupported questions and shared notes.','muted');intro.append(description);
 const config=el('div',undefined,'quiz-config');
 const minutes=el('input');minutes.type='number';minutes.min='1';minutes.max='300';minutes.value=String(Number(md.match(/(?:Suggested time|Time limit)\s*:\s*(\d+)\s*minutes/i)?.[1]||Math.min(bank.items.length,135)));
 const timeLabel=el('label','Timer minutes ');timeLabel.append(minutes);
 const neg=el('input');neg.type='checkbox';neg.checked=/[−–-]\s*1\s*\/\s*3/.test(md);const negLabel=el('label',' Deduct ⅓ for incorrect answers');negLabel.prepend(neg);config.append(timeLabel,negLabel);root.append(config);
 const actions=el('div',undefined,'practice-start-actions');root.append(actions);
 const state=el('p');state.setAttribute('role','status');state.setAttribute('aria-live','polite');root.append(state);
 const body=el('div',undefined,'practice-body');root.append(body);
 const controls=el('div',undefined,'quiz-controls');root.append(controls);
 let selected={},started=false,finished=false,timer=null,deadline=0,penalty=0,at=0,reviewFilter='all',reviewPage=0,submitReason='submitted',palette=null,progress=null;
 const attemptKey='nursing-attempt-v1:'+path;
 const signature=bankSignature(bank.items);
 function persist(){try{localStorage.setItem(attemptKey,JSON.stringify({signature,selected,finished,deadline,penalty,at,submitReason}));return true}catch{return false}}
 function getSaved(){try{return validateAttempt(JSON.parse(localStorage.getItem(attemptKey)||'null'),bank.items)}catch{return null}}
 function clearSaved(){try{localStorage.removeItem(attemptKey)}catch{}}
 function loadMarks(){try{const v=JSON.parse(localStorage.getItem('nursing-marks-v1')||'[]');return Array.isArray(v)?v.filter(m=>m&&typeof m.path==='string'&&typeof m.stem==='string'):[]}catch{return []}}
 function toggleMark(q,b){let marks=loadMarks();const exists=marks.some(m=>m.path===path&&m.stem===q.stem);marks=exists?marks.filter(m=>!(m.path===path&&m.stem===q.stem)):[...marks,{path,stem:q.stem}];try{localStorage.setItem('nursing-marks-v1',JSON.stringify(marks));b.textContent=exists?'☆ Bookmark':'★ Bookmarked';b.setAttribute('aria-pressed',String(!exists))}catch{b.textContent='Bookmark unavailable'}}
 function markButton(q){const saved=loadMarks().some(m=>m.path===path&&m.stem===q.stem);const b=btn(saved?'★ Bookmarked':'☆ Bookmark',()=>toggleMark(q,b));b.setAttribute('aria-pressed',String(saved));return b}
 function setView(view){root.dataset.view=view;const locationText=document.getElementById('reading-position');if(locationText)locationText.textContent=view==='results'?'Test results & answer review':view==='practice'?'Interactive practice':'Document introduction';const u=new URL(location.href);if(view==='results')u.searchParams.set('view','results');else u.searchParams.delete('view');if(view!=='setup')u.hash='';history.replaceState(history.state,'',u.href)}
 function focusHeading(h){h.tabIndex=-1;h.focus({preventScroll:true});h.scrollIntoView({block:'start',behavior:'instant'})}
 function stopTimer(){clearInterval(timer);timer=null}
 function showSetup(){stopTimer();started=false;finished=false;selected={};at=0;body.replaceChildren();controls.replaceChildren();state.textContent='';intro.hidden=false;config.hidden=false;actions.hidden=false;content.hidden=false;setView('setup');drawStartActions()}
 function showResults(reason='submitted',focus=true){
  stopTimer();for(const dialog of root.querySelectorAll('dialog[open]'))dialog.close();started=true;finished=true;submitReason=reason;intro.hidden=true;config.hidden=true;actions.hidden=true;content.hidden=true;body.replaceChildren();controls.replaceChildren();setView('results');
  const s=resultMetrics(bank.items,selected,penalty);const saved=persist();
  state.textContent='Result: '+s.correct+' correct · '+s.wrong+' incorrect · '+s.skipped+' skipped · Score '+s.score.toFixed(2)+' / '+s.total;
  state.classList.add('result-announcement');
  const hero=el('div',undefined,'result-hero'),copy=el('div',undefined,'result-copy'),check=el('span','✓','result-check');check.setAttribute('aria-hidden','true');copy.append(check,el('p','ATTEMPT COMPLETE','result-kicker'));
  const greeting=s.percentage>=80?'Excellent work!':s.percentage>=50?'Well done!':'Keep going — every attempt counts.';
  const h=el('h2',greeting,'result-heading');copy.append(h,el('p',reason==='expired'?'Time is up. Your answers have been submitted.':'You have completed your practice session. Review your answers and build on what you learned.'));
  const metric=el('div',undefined,'result-score');metric.append(el('span','YOUR SCORE'),el('strong',s.score.toFixed(2)+' / '+s.total),el('span',s.percentage.toFixed(1)+'% of available marks'));hero.append(copy,metric);body.append(hero);
  const stats=el('div',undefined,'result-stats');
  for(const [label,value,cls] of [['Correct',s.correct,'is-correct'],['Incorrect',s.wrong,'is-incorrect'],['Unanswered',s.skipped,'is-skipped'],['Accuracy',s.accuracy===null?'—':s.accuracy.toFixed(1)+'%','']]){const card=el('div',undefined,'result-stat '+cls);card.append(el('span',label),el('strong',String(value)));stats.append(card)}body.append(stats);
  const bar=el('div',undefined,'result-distribution');bar.setAttribute('role','img');bar.setAttribute('aria-label',s.correct+' correct, '+s.wrong+' incorrect, '+s.skipped+' unanswered');for(const [n,cls] of [[s.correct,'dist-correct'],[s.wrong,'dist-incorrect'],[s.skipped,'dist-skipped']]){const segment=el('span',undefined,cls);segment.style.flex=String(n);bar.append(segment)}body.append(bar);
  body.append(el('p','Marks: +1 per correct answer, '+(penalty?'−⅓ per incorrect answer':'no deduction for incorrect answers')+', 0 for unanswered. Percentage uses net marks divided by total scoreable questions; accuracy uses correct answers divided by attempted questions.','result-note'));
  if(!saved)body.append(el('p','Your result is available on this screen, but browser storage is unavailable. Refreshing may lose the attempt.','load-error'));
  const commands=el('div',undefined,'result-actions');const reviewButton=btn('Review my answers ↓',()=>focusHeading(reviewHeading),'primary-action');const retake=btn('Try again',()=>{if(confirm('Start a new attempt? This replaces the saved result for this question bank.')){clearSaved();showSetup();focusHeading(intro.querySelector('h2'))}});const readButton=btn('Back to study material',()=>{showSetup();focusHeading(content.querySelector('h1')||content)});commands.append(reviewButton,retake,readButton);body.append(commands);
  const review=el('section',undefined,'answer-review');const reviewHeading=el('h2','Review your answers');review.append(reviewHeading,el('p','Compare your selection with the published answer. Every explanation below is taken directly from the original GitHub question bank.','muted'));
  const filters=el('div',undefined,'review-filters');filters.setAttribute('aria-label','Filter answer review');const list=el('div',undefined,'review-list');const nav=el('div',undefined,'review-pagination');review.append(filters,list,nav);body.append(review);
  const perPage=8;reviewFilter='all';reviewPage=0;
  function drawReview(focusList=false){
   filters.replaceChildren();list.replaceChildren();nav.replaceChildren();
   for(const [id,label,n] of [['all','All',s.total],['correct','Correct',s.correct],['incorrect','Incorrect',s.wrong],['skipped','Unanswered',s.skipped]]){const b=btn(label+' ('+n+')',()=>{reviewFilter=id;reviewPage=0;drawReview(true)},'review-filter');b.setAttribute('aria-pressed',String(reviewFilter===id));filters.append(b)}
   const matches=bank.items.map((q,i)=>({q,i})).filter(({q})=>reviewFilter==='all'||answerStatus(q,selected)===reviewFilter);const pages=Math.max(1,Math.ceil(matches.length/perPage));reviewPage=Math.min(reviewPage,pages-1);
   const range=el('p',matches.length?'Showing '+(reviewPage*perPage+1)+'–'+Math.min((reviewPage+1)*perPage,matches.length)+' of '+matches.length+' questions':'No questions in this category.','review-range');list.append(range);
   for(const {q,i} of matches.slice(reviewPage*perPage,(reviewPage+1)*perPage)){
    const status=answerStatus(q,selected),choice=selected[q.id],card=el('article',undefined,'review-card '+status);const meta=el('div',undefined,'review-card-meta');const title=el('h3','Question '+(i+1)+' of '+s.total);meta.append(title,el('span',status==='correct'?'✓ Correct':status==='incorrect'?'✕ Incorrect':'— Unanswered','review-status '+status),markButton(q));card.append(meta);
    const stem=el('div',undefined,'question-stem');render(stem,q.stem+'\n\n'+q.extra,path);card.append(stem);
    const choices=el('ol',undefined,'review-options');choices.setAttribute('aria-label','Submitted answer and correct answer');
    for(let j=0;j<4;j++){const letter='ABCD'[j],row=el('li',undefined,'review-option');if(letter===q.key)row.classList.add('correct-choice');if(letter===choice&&choice!==q.key)row.classList.add('wrong-choice');const option=el('div',undefined,'review-option-text');render(option,letter+'. '+q.options[j],path);row.append(option);const labels=el('div',undefined,'review-option-labels');if(letter===choice)labels.append(el('span','Your answer','selection-label'));if(letter===q.key)labels.append(el('span','Correct answer','correct-label'));row.append(labels);choices.append(row)}card.append(choices);
    const summary=el('div',undefined,'answer-comparison');summary.append(el('p','Your answer: '+(choice||'Not answered')),el('p','Correct answer: '+q.key));card.append(summary);
    const details=el('details',undefined,'original-explanation');details.open=true;details.append(el('summary','Original GitHub explanation'));const ex=el('div',undefined,'explanation-body');render(ex,q.explanation,path);details.append(ex);card.append(details);list.append(card)
   }
   if(pages>1){const previous=btn('← Previous review page',()=>{reviewPage--;drawReview(true)});previous.disabled=reviewPage===0;const next=btn('Next review page →',()=>{reviewPage++;drawReview(true)});next.disabled=reviewPage===pages-1;nav.append(previous,el('span','Page '+(reviewPage+1)+' / '+pages),next)}
   if(focusList)focusHeading(range);
  }
  drawReview();if(focus)focusHeading(h);
 }
 function finish(reason='submitted'){if(!started||finished)return;showResults(reason)}
 function tick(){if(!started||finished)return;const remain=Math.max(0,Math.ceil((deadline-Date.now())/1000));const text='Time remaining: '+Math.floor(remain/60)+':'+String(remain%60).padStart(2,'0')+' · '+Object.keys(selected).length+'/'+bank.items.length+' answered';if(state.textContent!==text)state.textContent=text;if(!remain)finish('expired')}
 function syncProgress(){if(progress)progress.value=Object.keys(selected).length;if(palette){for(const b of palette.querySelectorAll('button[data-index]')){const i=Number(b.dataset.index),yes=!!selected[bank.items[i].id];b.classList.toggle('answered',yes);b.setAttribute('aria-label','Question '+(i+1)+(yes?', answered':', unanswered'));if(i===at)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')}}}
 function confirmSubmit(){const answered=Object.keys(selected).length,skipped=bank.items.length-answered;
  if(typeof HTMLDialogElement==='undefined'||typeof HTMLDialogElement.prototype.showModal!=='function'){if(confirm('Submit '+answered+' answered and '+skipped+' unanswered questions?'))finish();return}
  const d=el('dialog',undefined,'submit-dialog'),h=el('h2','Ready to submit?');h.id='submit-dialog-title';d.setAttribute('aria-labelledby',h.id);d.append(h,el('p','You have answered '+answered+' of '+bank.items.length+' questions. '+skipped+' will remain unanswered. You can review the correct answers and explanations after submission.'));
  const row=el('div',undefined,'result-actions');row.append(btn('Keep practising',()=>d.close()),btn('Submit and see results',()=>{d.close();finish()},'primary-action'));d.append(row);root.append(d);d.addEventListener('close',()=>d.remove(),{once:true});d.showModal()
 }
 function drawPractice(focus=false){
  body.replaceChildren();controls.replaceChildren();state.classList.remove('result-announcement');if(!started||finished)return;persist();const q=bank.items[at];const meta=el('div',undefined,'question-meta'),h=el('h3','Question '+(at+1)+' / '+bank.items.length);meta.append(h,markButton(q));body.append(meta);
  progress=el('progress',undefined,'quiz-progress');progress.max=bank.items.length;progress.setAttribute('aria-label','Questions answered');body.append(progress);
  const questionMap=el('details',undefined,'question-map');questionMap.append(el('summary','Question navigator'));palette=el('div',undefined,'question-palette');for(let i=0;i<bank.items.length;i++){const b=btn(String(i+1),()=>{at=i;drawPractice(true)});b.dataset.index=String(i);palette.append(b)}questionMap.append(palette);body.append(questionMap);syncProgress();
  const stem=el('div',undefined,'question-stem');render(stem,q.stem+'\n\n'+q.extra,path);body.append(stem);
  const field=el('fieldset');field.append(el('legend','Select one answer'));
  for(let i=0;i<4;i++){const letter='ABCD'[i],label=el('label',undefined,'quiz-option'),input=el('input');input.type='radio';input.name='quiz-choice';input.value=letter;input.checked=selected[q.id]===letter;input.onchange=()=>{selected[q.id]=letter;syncProgress();persist();tick()};const text=el('div');render(text,letter+'. '+q.options[i],path);label.append(input,text);field.append(label)}body.append(field);
  const prev=btn('← Previous',()=>{at--;drawPractice(true)});prev.disabled=at===0;const next=btn('Next →',()=>{at++;drawPractice(true)},'primary-action');next.disabled=at===bank.items.length-1;const jump=el('select');jump.setAttribute('aria-label','Jump to question');bank.items.forEach((x,i)=>{const op=el('option',String(i+1)+(selected[x.id]?' ✓':''));op.value=String(i);op.selected=i===at;jump.append(op)});jump.onchange=()=>{at=Number(jump.value);drawPractice(true)};controls.append(prev,jump,next,btn('Clear answer',()=>{delete selected[q.id];drawPractice();tick()}),btn('Submit test',confirmSubmit,'primary-action'));
  controls.append(btn('Save & exit',()=>{persist();showSetup();focusHeading(intro.querySelector('h2'))}));if(focus)focusHeading(h)
 }
 function begin(saved){
  stopTimer();started=true;finished=false;intro.hidden=true;config.hidden=true;actions.hidden=true;content.hidden=true;setView('practice');
  if(saved){({selected,finished,deadline,penalty,at}=saved);submitReason=saved.submitReason||'submitted';if(finished){showResults(submitReason);return}}
  else{selected={};at=0;penalty=neg.checked?1/3:0;deadline=Date.now()+Number(minutes.value)*60000;submitReason='submitted'}
  drawPractice(true);tick();if(!finished)timer=setInterval(tick,250)
 }
 function drawStartActions(){
  actions.replaceChildren();const saved=getSaved();const start=btn('Start timed practice',()=>{const mins=Number(minutes.value);if(!Number.isFinite(mins)||mins<1||mins>300){state.textContent='Enter 1–300 minutes.';return}if(saved&&!confirm('Start a new attempt and replace the saved attempt or result?'))return;clearSaved();begin(null)},'primary-action');actions.append(start);
  if(saved)actions.append(btn(saved.finished?'Review saved result':'Resume saved attempt',()=>begin(saved)),btn('Discard saved attempt',()=>{if(confirm('Remove the saved attempt or result from this device?')){clearSaved();drawStartActions()}}));
 }
 drawStartActions();const saved=getSaved();if(new URLSearchParams(location.search).get('view')==='results'){if(saved?.finished)begin(saved);else{setView('setup');state.textContent='No saved result is available for this question bank.'}}
}
if(typeof module!=='undefined')module.exports={parseBank,scoreBank,bankSignature,validateAttempt,resultMetrics,answerStatus};
