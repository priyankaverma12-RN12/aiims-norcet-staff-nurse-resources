'use strict';
// Manual completion is separate from timed attempts and daily activity.
const completionKey='nursing-completion-v1';
const progressTypes={theory:'Theory topics',mcq:'MCQ banks',mock:'Mock tests',pyq:'PYQ practice',revision:'Revision topics',imported:'Imported practice',embedded:'Embedded practice'};
let progressCatalog=null;
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
   out.push({path:p,chapter:c.id,title:m.title,kind,slots:b?.slots||0,scoreable:b?.scoreable||0});
  }
 }
 return out.sort((a,b)=>a.chapter.localeCompare(b.chapter)||Object.keys(progressTypes).indexOf(a.kind)-Object.keys(progressTypes).indexOf(b.kind)||a.path.localeCompare(b.path,undefined,{numeric:true}));
}
function loadCompletion(){try{const d=JSON.parse(localStorage.getItem(completionKey)||'{}');return d&&typeof d==='object'&&!Array.isArray(d)?d:{}}catch{return {}}}
function writeCompletion(d){try{localStorage.setItem(completionKey,JSON.stringify(d));return true}catch{return false}}
function completionState(record,marks,routine){
 const mark=marks[record.path],done=!!mark&&mark.slots===record.slots,changed=!!mark&&!done;
 const saved=routine.banks?.[record.path],checked=Math.min(record.scoreable,record.slots,Object.keys(saved?.questions||{}).length);
 return {done,changed,checked,slots:record.slots,covered:done?record.slots:checked};
}
function completionPercent(n,total){return total?(n>=total?100:Math.min(99.9,Math.round(1000*n/total)/10)):0}
function completionSummary(records,marks,routine){
 const s={done:0,total:records.length,slots:0,covered:0,checked:0};
 for(const record of records){const x=completionState(record,marks,routine);s.done+=Number(x.done);s.slots+=x.slots;s.covered+=x.covered;s.checked+=x.checked}
 s.percent=completionPercent(s.done,s.total);s.questionPercent=completionPercent(s.covered,s.slots);return s;
}
function setCompletion(r,done){
 const d=loadCompletion();if(done)d[r.path]={slots:r.slots,at:new Date().toISOString()};else delete d[r.path];
 if(!writeCompletion(d))return false;
 document.dispatchEvent(new CustomEvent('study-progress-change'));return true;
}
function clearScope(marks,routine,paths){
 for(const p of paths){delete marks[p];delete routine.banks[p]}return {marks,routine};
}
function resetCompletionScope(records,label){
 if(!confirm('Reset '+label+'? This clears completion marks, checked-question coverage and revision suggestions for this scope. Daily activity history, bookmarks and saved test results stay unchanged.'))return false;
 const old=loadCompletion(),d=loadCompletion(),routine=loadRoutine();clearScope(d,routine,records.map(r=>r.path));
 if(!writeCompletion(d)){alert('Your browser could not reset progress.');return false}
 if(!saveRoutine(routine)){writeCompletion(old);alert('Your browser could not reset question coverage.');return false}
 document.dispatchEvent(new CustomEvent('study-progress-change'));return true;
}
function completionLabel(p){
 const r=progressCatalog?.find(x=>x.path===p);if(!r)return null;const state=completionState(r,loadCompletion(),loadRoutine());
 return state.done?'Completed':state.changed?'Bank changed — review again':null;
}
function completionMeter(percent,label){const meter=node('progress',undefined,'completion-meter');meter.max=100;meter.value=percent;meter.setAttribute('aria-label',label);return meter}
function completionControl(r){
 const wrap=node('div',undefined,'completion-control'),label=node('label',undefined,'completion-check'),input=node('input');input.type='checkbox';input.setAttribute('aria-label','Mark '+r.title+' done');
 const status=node('span'),reset=node('button','Reset','completion-reset');reset.type='button';reset.setAttribute('aria-label','Reset progress for '+r.title);
 const error=node('small','','completion-error');error.setAttribute('role','status');
 input.dataset.progressPath=r.path;label.append(input,status);wrap.append(label,reset,error);
 function refresh(){const x=completionState(r,loadCompletion(),loadRoutine());input.checked=x.done;status.textContent=x.done?'Done':x.changed?'Mark done again':'Mark done';reset.disabled=!x.done&&!x.changed&&!x.checked;wrap.classList.toggle('is-completed',x.done)}
 input.onchange=()=>{if(!setCompletion(r,input.checked)){error.textContent='Progress could not be saved.';refresh()}else{error.textContent='';refresh()}};
 reset.onclick=()=>{if(resetCompletionScope([r],r.title)){error.textContent='';refresh()}else refresh()};wrap.refreshCompletion=refresh;
 refresh();return wrap;
}
function readerCompletion(p){
 const panel=document.getElementById('reader-completion');if(!panel)return;
 const r=progressCatalog?.find(x=>x.path===p);if(!r)return;
 panel.hidden=false;
 const summary=node('div',undefined,'reader-progress-summary'),text=node('strong'),bar=completionMeter(0,'Topic question coverage'),control=completionControl(r);
 summary.append(text,bar);panel.replaceChildren(summary,control);
 function refresh(){const x=completionState(r,loadCompletion(),loadRoutine());text.textContent=x.done?'Completed':x.changed?'Bank changed — review again':x.slots?x.checked+' / '+x.slots+' questions checked':'Study completion';bar.hidden=!x.slots;bar.value=completionPercent(x.covered,x.slots);control.refreshCompletion();panel.classList.toggle('is-completed',x.done)}
 refresh();document.addEventListener('study-progress-change',refresh);
}
function chapterProgressLabel(id){
 if(!progressCatalog)return null;const s=completionSummary(progressCatalog.filter(x=>x.chapter===id),loadCompletion(),loadRoutine());if(!s.total)return null;
 return node('span',s.percent+'% marked complete','chapter-completion-label');
}
async function showProgress(){
 $('home').hidden=true;$('reader').hidden=true;$('metrics').hidden=true;$('progress-page').hidden=false;document.title='My progress | Nursing Study Hub';
 const data=await getMetrics();if(!data){$('progress-status').textContent='Study inventory unavailable. Your saved progress is unchanged.';return}
 const records=completionRecords(data);progressCatalog=records;
 const chapter=$('progress-chapter'),kind=$('progress-kind'),query=$('progress-search'),filter=$('progress-filter'),list=$('progress-list'),summary=$('progress-summary'),message=$('progress-status');
 for(const c of data.chapters){const o=node('option',c.name);o.value=c.id;chapter.append(o)}for(const [key,label] of Object.entries(progressTypes)){const o=node('option',label);o.value=key;kind.append(o)}
 const requested=params.get('chapter');if(data.chapters.some(c=>c.id===requested))chapter.value=requested;
 const opened=new Set(chapter.value?[chapter.value]:[]);
 function scope(){return records.filter(r=>!chapter.value||r.chapter===chapter.value)}
 function summaryBox(label,s){
  const box=node('div',undefined,'completion-stat');box.append(node('span',label),node('strong',s.total?s.percent+'%':'—'),completionMeter(s.percent,label+' completion'),node('small',s.done+' / '+s.total+' resources done'));if(s.slots)box.append(node('small',s.covered+' / '+s.slots+' question slots covered · '+s.questionPercent+'%'));return box
 }
 function draw(){
  const focusPath=document.activeElement?.dataset.progressPath;const marks=loadCompletion(),routine=loadRoutine(),scoped=scope(),s=completionSummary(scoped,marks,routine);
  summary.replaceChildren(summaryBox('Overall completion',s));
  for(const [key,label] of Object.entries(progressTypes)){const rows=scoped.filter(r=>r.kind===key);if(rows.length)summary.append(summaryBox(label,completionSummary(rows,marks,routine)))}
  const search=query.value.trim().toLowerCase(),selected=kind.value,show=filter.value;
  list.replaceChildren();let visible=0;
  for(const c of data.chapters.filter(c=>!chapter.value||c.id===chapter.value)){
   const all=records.filter(r=>r.chapter===c.id),matches=all.filter(r=>{const x=completionState(r,marks,routine);return (!selected||r.kind===selected)&&(!search||(r.title+' '+r.path+' '+c.name).toLowerCase().includes(search))&&(!show||(show==='done'?x.done:!x.done))});
   if(!matches.length)continue;visible+=matches.length;
   const card=node('details',undefined,'completion-chapter');card.dataset.chapter=c.id;
   const head=node('summary'),cs=completionSummary(all,marks,routine),label=node('div');label.append(node('strong',c.name),node('small',cs.done+' / '+cs.total+' resources done'));head.append(label,node('strong',cs.percent+'%','chapter-completion-percent'));card.append(head,completionMeter(cs.percent,c.name+' completion'));
   const actions=node('div',undefined,'completion-chapter-actions'),link=node('a','Open chapter');link.href=route('Chapters/'+c.id+'/README.md');const reset=node('button','Reset chapter progress','completion-reset');reset.type='button';reset.onclick=()=>{if(!resetCompletionScope(all,c.name))return};actions.append(link,reset);card.append(actions);
   const body=node('div',undefined,'completion-resources');card.append(body);
   function populate(){if(body.children.length)return;for(const r of matches){
    const x=completionState(r,loadCompletion(),loadRoutine()),tile=node('article',undefined,'completion-resource'),a=node('a',undefined,'completion-resource-link');a.href=route(r.path);
    a.append(node('small',progressTypes[r.kind]),node('strong',r.title));tile.append(a);
    if(r.slots){const line=node('div',undefined,'completion-question-label');line.append(node('span',x.checked+' / '+r.slots+' checked'),node('strong',completionPercent(x.covered,r.slots)+'% covered'));tile.append(line,completionMeter(100*x.covered/r.slots,r.title+' question coverage'));if(r.scoreable<r.slots)tile.append(node('small',r.scoreable+' questions support interactive tracking','muted'))}
    tile.append(completionControl(r));tile.classList.toggle('is-completed',x.done);body.append(tile)
   }}
   card.open=!!chapter.value||!!search||opened.has(c.id);if(card.open)populate();card.ontoggle=()=>{if(card.open){opened.add(c.id);populate()}else opened.delete(c.id)};list.append(card);
  }
  if(!visible)list.append(node('p','No matching study resources.','empty-state'));
  message.textContent=visible+' matching resources · Completion is your own study checklist, not a mastery score.';if(focusPath)[...list.querySelectorAll('input[data-progress-path]')].find(x=>x.dataset.progressPath===focusPath)?.focus({preventScroll:true});
 }
 chapter.onchange=()=>{opened.clear();if(chapter.value)opened.add(chapter.value);const u=new URL(location.href);if(chapter.value)u.searchParams.set('chapter',chapter.value);else u.searchParams.delete('chapter');history.replaceState(history.state,'',u.href);draw()};
 kind.onchange=draw;query.oninput=draw;filter.onchange=draw;
 $('reset-progress').onclick=()=>resetCompletionScope(scope(),chapter.value?'this chapter':'all tracked chapters');
 document.addEventListener('study-progress-change',draw);draw();
}
if(typeof module!=='undefined')module.exports={completionRecords,completionState,completionSummary,clearScope};
