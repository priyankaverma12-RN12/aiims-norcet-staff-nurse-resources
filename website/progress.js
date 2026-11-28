'use strict';
// Manual completion is independent of answer accuracy; the daily dashboard reads its saved dates.
const completionKey='nursing-completion-v1';
const progressTypes={theory:'Theory topics',mcq:'MCQ banks',mock:'Mock tests',pyq:'PYQ practice',revision:'Revision topics',imported:'Imported practice',embedded:'Embedded practice'};
let progressCatalog=null;
function countSlots(md){
 const clean=md.replace(/<!--[\s\S]*?-->/g,'').replace(/<details\b[^>]*>[\s\S]*?<\/details>/gi,'').replace(/^\s*\x60{3,}[^\n]*\n[\s\S]*?^\s*\x60{3,}[^\n]*$/gm,'');
 const lines=clean.split(/\r?\n/);let expect=0,count=0;
 for(const line of lines){
  const match=line.match(/^\s*(?:[-*+]\s+)?(?:\*\*)?([A-D])[.)](?:\*\*)?\s+\S/i);
  if(!match)continue;
  const i='ABCD'.indexOf(match[1].toUpperCase());
  if(i===0)expect=1;
  else if(i===expect&&expect>0){expect++;if(expect===4){count++;expect=0}}
  else expect=0;
 }
 return count;
}

function completionRecords(data){
 const out=[];for(const c of data?.chapters||[]){
  const banks=new Map(c.records.map(r=>[r.path,r]));
  const prefix='Chapters/'+c.id+'/';
  for(const [p,m] of Object.entries(data.resources||{})){
   if(!p.startsWith(prefix)||m.draft||m.type==='Draft question set')continue;
   const b=banks.get(p);let kind=b?.category;
   if(m.type==='Theory')kind='theory';else if(m.type==='Revision')kind='revision';
   if(!kind||!progressTypes[kind])continue;
   if(['Study guide','Research and evidence notes','Resource index','Study index','Chapter overview'].includes(m.type))continue;
   out.push({path:p,chapter:c.id,title:m.title,kind,slots:b?.slots||0,scoreable:b?.scoreable||0,questionKeys:b?.questionKeys||null,signature:b?.signature||null});
  }
 }
 return out.sort((a,b)=>a.chapter.localeCompare(b.chapter)||Object.keys(progressTypes).indexOf(a.kind)-Object.keys(progressTypes).indexOf(b.kind)||a.path.localeCompare(b.path,undefined,{numeric:true}));
}
function loadCompletion(){try{const d=JSON.parse(localStorage.getItem(completionKey)||'{}');return d&&typeof d==='object'&&!Array.isArray(d)?d:{}}catch{return {}}}
function writeCompletion(d){try{localStorage.setItem(completionKey,JSON.stringify(d));return true}catch{return false}}
function completionState(record,marks,routine){
 const mark=marks[record.path],saved=routine.banks?.[record.path],known=saved?.questions||{};
 const keys=Array.isArray(record.questionKeys)?[...new Set(record.questionKeys)]:null;
 const checked=Math.min(record.scoreable,record.slots,keys?keys.filter(k=>Object.hasOwn(known,k)).length:Object.keys(known).length);
 const manual=!!mark&&mark.mode!=='pending'&&mark.slots===record.slots&&(!mark.signature||!record.signature||mark.signature===record.signature);
 const auto=!!keys&&record.slots>0&&record.scoreable===record.slots&&keys.length===record.slots&&checked===record.slots;
 const pending=mark?.mode==='pending'&&(!mark.signature||mark.signature===record.signature);const done=manual||(auto&&!pending),changed=!!mark&&mark.mode!=='pending'&&!manual&&!auto;
 return {done,changed,checked,slots:record.slots,covered:done?record.slots:checked,automatic:done&&!manual&&auto};
}
function completionPercent(n,total){return total?(n>=total?100:Math.min(99.9,Math.round(1000*n/total)/10)):0}
function completionSummary(records,marks,routine){
 const s={done:0,total:records.length,slots:0,covered:0,checked:0};
 for(const record of records){const x=completionState(record,marks,routine);s.done+=Number(x.done);s.slots+=x.slots;s.covered+=x.covered;s.checked+=x.checked}
 s.percent=completionPercent(s.done,s.total);s.questionPercent=completionPercent(s.covered,s.slots);return s;
}
function setCompletion(r,done){
 const d=loadCompletion(),state=completionState(r,d,loadRoutine());if(done){const previous=d[r.path];d[r.path]={slots:r.slots,signature:r.signature||null,at:state.done&&previous?.mode!=='pending'&&previous?.at?previous.at:new Date().toISOString()}}else if(state.checked===r.slots&&r.slots>0)d[r.path]={mode:'pending',slots:r.slots,signature:r.signature||null};else delete d[r.path];
 if(!writeCompletion(d))return false;
 document.dispatchEvent(new CustomEvent('study-progress-change'));return true;
}
function clearScope(marks,routine,paths){
 for(const p of paths){delete marks[p];delete routine.banks[p]}return {marks,routine};
}
function resetCompletionScope(records,label){
 if(!confirm('Reset '+label+'? This clears your completed marks, answered questions and revision reminders here. Questions answered today still count toward your daily history. Manual completion credit will be removed. Your bookmarks and saved test results stay safe.'))return false;
 const old=loadCompletion(),d=loadCompletion(),routine=loadRoutine();clearScope(d,routine,records.map(r=>r.path));
 if(!writeCompletion(d)){alert('Your browser could not reset progress.');return false}
 if(!saveRoutine(routine)){writeCompletion(old);alert('Your browser could not reset question progress.');return false}
 document.dispatchEvent(new CustomEvent('study-progress-change'));return true;
}
function completionLabel(p){
 const r=progressCatalog?.find(x=>x.path===p);if(!r)return null;const state=completionState(r,loadCompletion(),loadRoutine());
 return state.automatic?'Completed automatically':state.done?'Completed':state.changed?'New or updated questions — review again':null;
}
function completionMeter(percent,label){const meter=node('progress',undefined,'completion-meter');meter.max=100;meter.value=percent;meter.setAttribute('aria-label',label);return meter}
function completionControl(r){
 const wrap=node('div',undefined,'completion-control'),label=node('label',undefined,'completion-check'),input=node('input');input.type='checkbox';input.setAttribute('aria-label','Mark '+r.title+' done');
 const status=node('span'),reset=node('button','Reset','completion-reset');reset.type='button';reset.setAttribute('aria-label','Reset progress for '+r.title);
 const error=node('small','','completion-error');error.setAttribute('role','status');
 input.dataset.progressPath=r.path;label.append(input,status);wrap.append(label,reset,error);
 function refresh(){const x=completionState(r,loadCompletion(),loadRoutine());input.checked=x.done;status.textContent=x.automatic?'Done automatically':x.done?'Done':x.changed?'Mark done again':'Mark done';reset.disabled=!x.done&&!x.changed&&!x.checked;wrap.classList.toggle('is-completed',x.done)}
 input.onchange=()=>{if(!setCompletion(r,input.checked)){error.textContent='Progress could not be saved.';refresh()}else{error.textContent='';refresh()}};
 reset.onclick=()=>{if(resetCompletionScope([r],r.title)){error.textContent='';refresh()}else refresh()};wrap.refreshCompletion=refresh;
 refresh();return wrap;
}
function readerCompletion(p){
 const panel=document.getElementById('reader-completion');if(!panel)return;
 const r=progressCatalog?.find(x=>x.path===p);if(!r)return;
 panel.hidden=false;
 const summary=node('div',undefined,'reader-progress-summary'),text=node('strong'),bar=completionMeter(0,'Topic progress'),control=completionControl(r);
 summary.append(text,bar);panel.replaceChildren(summary,control);
 function refresh(){const x=completionState(r,loadCompletion(),loadRoutine());text.textContent=x.slots?(x.done?'Completed · ':'')+x.checked+' / '+x.slots+' checked · '+completionPercent(x.covered,x.slots)+'% covered'+(x.changed?' · Bank changed':''):x.done?'Topic completed':'Mark this topic done after studying';bar.hidden=false;bar.value=x.slots?completionPercent(x.covered,x.slots):x.done?100:0;control.refreshCompletion();panel.classList.toggle('is-completed',x.done)}
 refresh();document.addEventListener('study-progress-change',refresh);
}

function registerLiveBank(p,md,items){
 let existing=progressCatalog?.find(x=>x.path===p);const meta=getResourceMeta(p),slots=countSlots(md);
 if(meta.draft||meta.type==='Draft question set'||!slots)return existing;
 if(!existing){const kind=({'Topic MCQs':'mcq','Mock test':'mock','Previous year questions':'pyq','Reported exam practice':'pyq','Theory':'theory','Revision':'revision','Imported practice':'imported'}[meta.type]);if(!kind)return null;existing={path:p,chapter:p.split('/')[1],title:meta.title,kind};(progressCatalog||=[]).push(existing)}
 existing.slots=slots;existing.scoreable=items.length;existing.questionKeys=items.map(practiceKey);existing.signature=bankSignature(items);
 return existing;
}
function attachBankProgress(root,p){
 const r=progressCatalog?.find(x=>x.path===p);if(!r||!r.slots)return;
 const panel=node('div',undefined,'quiz-bank-progress'),line=node('div',undefined,'quiz-bank-progress-line'),title=node('strong'),percent=node('strong'),bar=completionMeter(0,'Your total progress'),note=node('small'),link=node('a','My progress');
 link.href='./?progress=1&chapter='+encodeURIComponent(r.chapter);line.append(title,percent);panel.append(line,bar,note,link);
 const target=root.querySelector('.practice-start-actions');if(target)target.before(panel);else root.prepend(panel);
 let previous=false,initialized=false;
 function refresh(){const x=completionState(r,loadCompletion(),loadRoutine());title.textContent=x.done?'✓ Bank completed':'Your bank progress';percent.textContent=completionPercent(x.covered,r.slots)+'%';bar.value=completionPercent(x.covered,r.slots);
 note.textContent=x.checked+' / '+r.slots+' checked'+(x.done&&!x.automatic&&x.checked<r.slots?' · Manually marked done':x.automatic?' · Completed automatically':x.changed?' · Questions updated — review again':'');
 panel.classList.toggle('is-completed',x.done);if(initialized&&!previous&&x.automatic){panel.classList.add('celebrate-once');note.textContent+=' — Great work!'}previous=x.done;initialized=true}
 refresh();document.addEventListener('study-progress-change',refresh);
}


// Shared card controls: one source of truth, no nested interactive elements.
let studyInventory=null;

// A published mock test is a question-containing document classified as a mock,
// not a draft fragment, plan or audit. Keep historic inventory fields unchanged.
function mockSummary(data,records){
 const s={tests:0,questions:0,drafts:0,draftQuestions:0,otherQuestions:0};
 for(const f of records||[]){if(f.category!=='mock'||!f.slots)continue;const m=data?.resources?.[f.path];if(m?.draft||m?.type==='Draft question set'){s.drafts++;s.draftQuestions+=f.slots}else if(m?.type==='Mock test'){s.tests++;s.questions+=f.slots}else s.otherQuestions+=f.slots}
 return s;
}
function countPhrase(n,one,many=one+'s'){return n.toLocaleString('en-IN')+' '+(n===1?one:many)}
function mockCountText(s){return countPhrase(s.tests,'mock test')+' · '+countPhrase(s.questions,'question')}
function scopedInventoryRecords(p,data=studyInventory){
 const parts=p.split('/').filter(Boolean),c=data?.chapters.find(x=>x.id===parts[1]);if(!c)return [];
 if(parts.length===3&&parts[2]==='README.md')return c.records;
 return p.endsWith('/')?c.records.filter(f=>f.path.startsWith(p)):c.records.filter(f=>f.path===p);
}

function theoryRecords(data,scope=''){
 const chapter=scope.split('/')[1],overview=scope==='Chapters/'+chapter+'/README.md';
 return Object.entries(data?.resources||{}).filter(([path,m])=>m.type==='Theory'&&!m.draft&&path.startsWith('Chapters/')&&(!scope||(overview?path.startsWith('Chapters/'+chapter+'/'):scope.endsWith('/')?path.startsWith(scope):path===scope))).map(([path,m])=>({path,title:m.title,category:'theory',slots:0,chapter:path.split('/')[1]}));
}
function theoryCountText(n){return countPhrase(n,'theory topic')}
function theoryProgressTag(data,scope){
 const records=theoryRecords(data,scope),paths=new Set(records.map(r=>r.path)),eligible=(progressCatalog||[]).filter(r=>r.kind==='theory'&&paths.has(r.path));
 const tag=studyTag(theoryCountText(records.length),'theory');tag.dataset.role='theory-count';
 liveProgressRefresh(()=>{const done=completionSummary(eligible,loadCompletion(),loadRoutine()).done;tag.textContent=theoryCountText(records.length)+' · '+done+' done'},tag);
 return tag;
}

function inventoryLabelParts(p,data=studyInventory){
 if(!data?.chapters.some(c=>c.id===p.split('/')[1]))return [];
 const records=scopedInventoryRecords(p,data),totals={mcq:0,pyq:0,imported:0,embedded:0};for(const f of records)if(Object.hasOwn(totals,f.category))totals[f.category]+=f.slots;
 const labels=[],theory=theoryRecords(data,p).length;if(theory||p.endsWith('/Concepts/')||p.endsWith('/README.md')&&p.split('/').length===3)labels.push({kind:'theory',text:theoryCountText(theory)});if(totals.mcq)labels.push({kind:'mcq',text:countPhrase(totals.mcq,'MCQ','MCQs')});
 const mock=mockSummary(data,records);
 if(mock.tests||p.endsWith('/Mock-Tests/')||p.endsWith('/README.md')&&p.split('/').length===3)labels.push({kind:'mock',text:mockCountText(mock)});
 if(mock.drafts)labels.push({kind:'draft',text:countPhrase(mock.drafts,'unfinished mock section')+' · '+countPhrase(mock.draftQuestions,'question')});
 if(mock.otherQuestions)labels.push({kind:'neutral',text:countPhrase(mock.otherQuestions,'other mock question')});
 if(totals.pyq)labels.push({kind:'pyq',text:countPhrase(totals.pyq,'PYQ question')});
 if(totals.imported)labels.push({kind:'neutral',text:countPhrase(totals.imported,'imported question')});
 if(totals.embedded)labels.push({kind:'neutral',text:countPhrase(totals.embedded,'question in notes','questions in notes')});
 return labels;
}
function studyTag(label,kind='neutral'){const tag=node('span',label,'study-tag');tag.dataset.kind=kind;return tag}
function typeTagInfo(p){const type=getResourceMeta(p).type;return ({'Theory':['Theory','theory'],'Topic MCQs':['MCQ practice','mcq'],'Mock test':['Mock test','mock'],'Previous year questions':['Previous exam questions','pyq'],'Reported exam practice':['Reported exam questions','pyq'],'Revision':['Revision','revision'],'Draft question set':['Draft · not a finished test','draft'],'Imported practice':['Imported practice','neutral'],'Research and evidence notes':['Exam notes and sources','neutral'],'Study guide':['Study guide','neutral'],'Resource collection':['Study collection','neutral']}[type]||[type,'neutral'])}
function resourceTypeTag(p){const [label,kind]=typeTagInfo(p);return studyTag(label,kind)}
function progressTagInfo(x){return x.done?['✓ Completed','done']:x.changed?['Updated · review again','revision']:x.checked?['In progress','active']:['Not started','neutral']}

function inventoryText(p){return inventoryLabelParts(p).map(x=>x.text).join(' · ')}
function addInventoryCount(target,p){
 const labels=inventoryLabelParts(p);if(!labels.length)return target;
 const wrap=node('span',undefined,'resource-question-count study-labels');for(const item of labels)wrap.append(item.kind==='theory'?theoryProgressTag(studyInventory,p):studyTag(item.text,item.kind));target.append(wrap);return target;
}
const progressRefreshers=new Map();
function liveProgressRefresh(fn,element){fn();for(const el of progressRefreshers.keys())if(!el.isConnected&&el.dataset.mounted==='true')progressRefreshers.delete(el);progressRefreshers.set(element,fn);queueMicrotask(()=>{if(element.isConnected)element.dataset.mounted='true';else progressRefreshers.delete(element)})}
if(typeof document!=='undefined')document.addEventListener('study-progress-change',()=>{for(const [el,fn] of progressRefreshers){if(el.isConnected)fn();else progressRefreshers.delete(el)}});
function resourceCardWithProgress(anchor,p,options={}){
 if(!anchor.querySelector('.study-tag[data-role=type]')){const tag=resourceTypeTag(p);tag.dataset.role='type';anchor.append(tag)}
 const r=progressCatalog?.find(x=>x.path===p);
 if(!r){if(options.count!==false)addInventoryCount(anchor,p);return anchor}
 const card=node('div',undefined,'tracked-resource-card'),status=node('div',undefined,'tracked-resource-status'),line=node('div',undefined,'tracked-resource-line'),text=node('span'),percent=node('strong'),meter=completionMeter(0,r.title+' progress'),control=completionControl(r);
 if(options.count!==false)addInventoryCount(anchor,p);
 const stateTag=studyTag('Not started');stateTag.dataset.role='status';line.append(text,percent);status.append(stateTag,line,meter,control);card.append(anchor,status);
 const refresh=()=>{const x=completionState(r,loadCompletion(),loadRoutine()),value=r.slots?completionPercent(x.covered,r.slots):Number(x.done)*100;
  text.textContent=r.slots?(x.done?'Completed · ':'')+x.checked+' / '+r.slots+' checked':x.done?'1 / 1 topic done':'0 / 1 topic done';
  const [state,kind]=progressTagInfo(x);stateTag.textContent=state;stateTag.dataset.kind=kind;percent.textContent=value+'%';meter.value=value;card.classList.toggle('is-completed',x.done);control.refreshCompletion()
 };
 liveProgressRefresh(refresh,card);return card;
}
function chapterCardProgress(id){
 const resources=(progressCatalog||[]).filter(r=>r.chapter===id);if(!resources.length)return null;
 const section=node('div',undefined,'chapter-card-progress'),line=node('div',undefined,'tracked-resource-line'),label=node('span'),percent=node('strong'),meter=completionMeter(0,id+' completion'),link=node('a','Track topics →');
 link.href='./?progress=1&chapter='+encodeURIComponent(id);line.append(label,percent);section.append(line,meter,link);
 liveProgressRefresh(()=>{const s=completionSummary(resources,loadCompletion(),loadRoutine());label.textContent=s.done+' / '+s.total+' resources done';percent.textContent=s.percent+'%';meter.value=s.percent},section);
 return section;
}

function chapterProgressLabel(id){
 if(!progressCatalog)return null;const records=progressCatalog.filter(x=>x.chapter===id);if(!records.length)return null;const label=node('span',undefined,'chapter-completion-label');liveProgressRefresh(()=>{label.textContent=completionSummary(records,loadCompletion(),loadRoutine()).percent+'% complete'},label);return label;
}
async function showProgress(){
 $('home').hidden=true;$('reader').hidden=true;$('metrics').hidden=true;$('progress-page').hidden=false;document.title='My progress | Nursing Study Hub';
 const data=await getMetrics();if(!data){$('progress-status').textContent='Study inventory unavailable. Your saved progress is unchanged.';return}
 const records=completionRecords(data);progressCatalog=records;
 const chapter=$('progress-chapter'),kind=$('progress-kind'),query=$('progress-search'),filter=$('progress-filter'),list=$('progress-list'),summary=$('progress-summary'),message=$('progress-status');
 for(const c of data.chapters){const o=node('option',c.name);o.value=c.id;chapter.append(o)}for(const [key,label] of Object.entries(progressTypes)){const o=node('option',label);o.value=key;kind.append(o)}
 const requested=params.get('chapter');if(data.chapters.some(c=>c.id===requested))chapter.value=requested;
 const opened=new Set(chapter.value?[chapter.value]:[]),openedGroups=new Set();
 function scope(){return records.filter(r=>!chapter.value||r.chapter===chapter.value)}
 function summaryBox(label,s){
  const box=node('div',undefined,'completion-stat');box.append(node('span',label),node('strong',s.total?s.percent+'%':'—'),completionMeter(s.percent,label+' completion'),node('small',s.done+' / '+s.total+(label==='Theory topics'?' topics done':' resources done')));if(s.slots)box.append(node('small',s.covered+' / '+s.slots+' questions covered · '+s.questionPercent+'%'));return box
 }
 function draw(){
  const focusPath=document.activeElement?.dataset.progressPath;
  for(const group of list.querySelectorAll('.completion-category')){if(group.open)openedGroups.add(group.dataset.group);else openedGroups.delete(group.dataset.group)}
const marks=loadCompletion(),routine=loadRoutine(),scoped=scope(),s=completionSummary(scoped,marks,routine);
  summary.replaceChildren(summaryBox('Overall completion',s));

  const search=query.value.trim().toLowerCase(),selected=kind.value,show=filter.value;
  list.replaceChildren();let visible=0;
  for(const c of data.chapters.filter(c=>!chapter.value||c.id===chapter.value)){
   const all=records.filter(r=>r.chapter===c.id),matches=all.filter(r=>{const x=completionState(r,marks,routine);return (!selected||r.kind===selected)&&(!search||(r.title+' '+r.path+' '+c.name).toLowerCase().includes(search))&&(!show||(show==='done'?x.done:!x.done))});
   if(!matches.length)continue;visible+=matches.length;
   const card=node('details',undefined,'completion-chapter');card.dataset.chapter=c.id;
   const head=node('summary'),cs=completionSummary(all,marks,routine),label=node('div');label.append(node('strong',c.name),node('small',cs.done+' / '+cs.total+' resources done'));head.append(label,node('strong',cs.percent+'%','chapter-completion-percent'));card.append(head,completionMeter(cs.percent,c.name+' completion'));
   const actions=node('div',undefined,'completion-chapter-actions'),link=node('a','Open chapter');link.href=route('Chapters/'+c.id+'/README.md');const reset=node('button','Reset chapter progress','completion-reset');reset.type='button';reset.onclick=()=>{if(!resetCompletionScope(all,c.name))return};actions.append(link,reset);card.append(actions);
   const categories=node('div',undefined,'completion-categories');card.append(categories);
   function populate(){
    if(categories.children.length)return;
    for(const [type,typeLabel] of Object.entries(progressTypes)){
     const rows=matches.filter(r=>r.kind===type),allType=all.filter(r=>r.kind===type);
     if(!rows.length&&(selected||search||show||!['theory','mcq','mock','pyq'].includes(type)))continue;
     const group=node('details',undefined,'completion-category');group.dataset.kind=type;group.dataset.group=c.id+':'+type;
     const counts=completionSummary(allType,marks,routine),groupHead=node('summary'),copy=node('div',undefined,'completion-category-copy');
     const name={theory:'Theory',mcq:'MCQ practice',mock:'Mock tests',pyq:'Previous-year questions'}[type]||typeLabel;
     copy.append(node('strong',name),node('small',counts.done+' / '+counts.total+' done'+(rows.length!==allType.length?' · '+rows.length+' shown':'')));
     groupHead.append(copy,node('span',counts.total?counts.percent+'%':'—','completion-category-percent'));group.append(groupHead);
     const body=node('div',undefined,'completion-resources');group.append(body);
     function populateRows(){if(body.children.length)return;if(!rows.length){body.append(node('p','No published resources in this section yet.','muted completion-empty'));return}for(const r of rows){
    const x=completionState(r,loadCompletion(),loadRoutine()),tile=node('article',undefined,'completion-resource'),a=node('a',undefined,'completion-resource-link');a.href=route(r.path);
    a.append(resourceTypeTag(r.path),node('strong',r.title));tile.append(a);const [state,kind]=progressTagInfo(x);const tag=studyTag(state,kind);tag.dataset.role='status';tile.append(tag);
    if(r.slots){const line=node('div',undefined,'completion-question-label');line.append(node('span',x.checked+' / '+r.slots+' checked'+(x.automatic?' · Auto-completed':'')),node('strong',completionPercent(x.covered,r.slots)+'% covered'));tile.append(line,completionMeter(100*x.covered/r.slots,r.title+' question coverage'));if(r.scoreable<r.slots)tile.append(node('small',r.scoreable+' questions can be answered here; read the others in the original notes','muted'))}
    if(r.kind==='theory'&&!r.slots)tile.append(node('p',x.done?'1 / 1 topic done':'0 / 1 topic done','theory-topic-status'),completionMeter(x.done?100:0,r.title+' progress'));tile.append(completionControl(r));tile.classList.toggle('is-completed',x.done);body.append(tile)
     }}
     group.open=openedGroups.has(group.dataset.group)||!!selected||!!search||!!show;
     if(group.open)populateRows();
     group.ontoggle=()=>{if(group.open)populateRows()};
     categories.append(group);
    }
   }
   card.open=!!chapter.value||!!search||opened.has(c.id);if(card.open)populate();card.ontoggle=()=>{if(card.open){opened.add(c.id);populate()}else opened.delete(c.id)};list.append(card);
  }
  if(!visible)list.append(node('p','No matching study resources.','empty-state'));
  message.textContent=visible+' study resources · Open a chapter, then a study type.';$('clear-progress').hidden=!chapter.value&&!selected&&!show&&!search;if(focusPath)[...list.querySelectorAll('input[data-progress-path]')].find(x=>x.dataset.progressPath===focusPath)?.focus({preventScroll:true});
 }
 chapter.onchange=()=>{opened.clear();if(chapter.value)opened.add(chapter.value);const u=new URL(location.href);if(chapter.value)u.searchParams.set('chapter',chapter.value);else u.searchParams.delete('chapter');history.replaceState(history.state,'',u.href);draw()};
 kind.onchange=draw;query.oninput=draw;filter.onchange=draw;$('clear-progress').onclick=()=>{chapter.value='';kind.value='';filter.value='';query.value='';chapter.onchange();query.focus()};
 $('reset-progress').onclick=()=>resetCompletionScope(scope(),chapter.value?'this chapter':'all tracked chapters');
 document.addEventListener('study-progress-change',draw);draw();
}
if(typeof module!=='undefined')module.exports={completionRecords,completionState,completionSummary,clearScope,countSlots,mockSummary,mockCountText,inventoryLabelParts,progressTagInfo,theoryRecords,theoryCountText};
