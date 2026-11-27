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
function mountQuiz(md,path,content,render,route){
 const bank=parseBank(md);if(!bank.total)return;
 const el=(tag,txt)=>{const n=document.createElement(tag);if(txt!==undefined)n.textContent=txt;return n};
 const btn=(label,fn)=>{const b=el('button',label);b.type='button';b.onclick=fn;return b};
 const root=el('section');root.className='quiz-panel';content.before(root);
 const title=el('h2','Interactive practice');root.append(title);
 const info=el('p',bank.items.length+' scoreable questions out of '+bank.total+' detected numbered headings. '+(bank.rejected.length?'Unsupported headings: '+bank.rejected.join(', ')+'. Use original reading mode for these.':'All detected numbered headings parsed.'));
 root.append(info);if(!bank.items.length)return;
 root.append(el('p','Custom practice only. Original source remains available for shared diagrams, notes and unsupported questions. Scores use the published key, not an independent clinical revalidation.'));
 const minutes=el('input');minutes.type='number';minutes.min='1';minutes.max='300';minutes.value=String(Number(md.match(/(?:Suggested time|Time limit)\s*:\s*(\d+)\s*minutes/i)?.[1]||Math.min(bank.items.length,135)));
 const timeLabel=el('label','Timer minutes (custom practice) ');timeLabel.append(minutes);
 const neg=el('input');neg.type='checkbox';neg.checked=/[−–-]\s*1\s*\/\s*3/.test(md);const negLabel=el('label',' Deduct ⅓ for incorrect answers');negLabel.prepend(neg);
 const config=el('div');config.className='quiz-config';config.append(timeLabel,negLabel);root.append(config);
 const state=el('p');state.setAttribute('role','status');root.append(state);
 const body=el('div');root.append(body);
 const controls=el('div');controls.className='quiz-controls';root.append(controls);
 let selected={},started=false,finished=false,timer=null,deadline=0,penalty=0,at=0;
 function loadMarks(){try{return JSON.parse(localStorage.getItem('nursing-marks-v1')||'[]')}catch{return []}}
 function toggleMark(q,b){let marks=loadMarks();const exists=marks.some(m=>m.path===path&&m.stem===q.stem);marks=exists?marks.filter(m=>!(m.path===path&&m.stem===q.stem)):[...marks,{path,stem:q.stem}];try{localStorage.setItem('nursing-marks-v1',JSON.stringify(marks));b.textContent=exists?'☆ Bookmark':'★ Bookmarked'}catch{state.textContent='Bookmark storage unavailable.'}}
 function finish(){if(!started||finished)return;finished=true;clearInterval(timer);const s=scoreBank(bank.items,selected,penalty);state.textContent='Result: '+s.correct+' correct · '+s.wrong+' incorrect · '+s.skipped+' skipped · Score '+s.score.toFixed(2)+' / '+s.total;draw()}
 function tick(){const remain=Math.max(0,Math.ceil((deadline-Date.now())/1000));state.textContent='Time remaining: '+Math.floor(remain/60)+':'+String(remain%60).padStart(2,'0')+' · '+Object.keys(selected).length+'/'+bank.items.length+' answered';if(!remain)finish()}
 function draw(){body.replaceChildren();controls.replaceChildren();if(!started)return;const q=bank.items[at];const h=el('h3','Question '+(at+1)+' / '+bank.items.length);body.append(h);const mark=btn(loadMarks().some(m=>m.path===path&&m.stem===q.stem)?'★ Bookmarked':'☆ Bookmark',()=>toggleMark(q,mark));body.append(mark);
 const stem=el('div');render(stem,q.stem+'\n\n'+q.extra,path);body.append(stem);
 const field=el('fieldset');field.append(el('legend','Select one answer'));
 for(let i=0;i<4;i++){const letter='ABCD'[i],label=el('label');label.className='quiz-option';const input=el('input');input.type='radio';input.name='quiz-choice';input.value=letter;input.checked=selected[q.id]===letter;input.disabled=finished;input.onchange=()=>{selected[q.id]=letter;tick()};const text=el('div');render(text,letter+'. '+q.options[i],path);label.append(input,text);if(finished&&letter===q.key)label.classList.add('correct-choice');if(finished&&selected[q.id]===letter&&letter!==q.key)label.classList.add('wrong-choice');field.append(label)}body.append(field);
 if(finished){const d=el('details');d.append(el('summary','Answer and original explanation'));const ex=el('div');render(ex,q.explanation,path);d.append(ex);body.append(d)}
 const prev=btn('← Previous',()=>{at--;draw()});prev.disabled=at===0;const next=btn('Next →',()=>{at++;draw()});next.disabled=at===bank.items.length-1;const jump=el('select');jump.setAttribute('aria-label','Jump to question');bank.items.forEach((x,i)=>{const op=el('option',(i+1)+ (selected[x.id]?' ✓':''));op.value=String(i);op.selected=i===at;jump.append(op)});jump.onchange=()=>{at=Number(jump.value);draw()};controls.append(prev,jump,next);
 if(!finished){controls.append(btn('Clear answer',()=>{delete selected[q.id];draw();tick()}),btn('Submit test',()=>{if(confirm('Submit this attempt?'))finish()}))}
 controls.append(btn('Exit to original reading',()=>{if(!finished&&!confirm('Discard this attempt?'))return;clearInterval(timer);started=false;finished=false;selected={};at=0;body.replaceChildren();controls.replaceChildren();state.textContent='';config.hidden=false;start.hidden=false;content.hidden=false}));
 }
 const start=btn('Start timed practice',()=>{const mins=Number(minutes.value);if(!Number.isFinite(mins)||mins<1||mins>300){state.textContent='Enter 1–300 minutes.';return}started=true;finished=false;penalty=neg.checked?1/3:0;deadline=Date.now()+mins*60000;config.hidden=true;start.hidden=true;content.hidden=true;draw();tick();if(!finished)timer=setInterval(tick,250)});
 root.append(start);
}
if(typeof module!=='undefined')module.exports={parseBank,scoreBank};
