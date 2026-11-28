'use strict';
// Personal progress only: no requests, accounts, analytics or writes to the repository.
const routineKey='nursing-routine-v1';
function localDay(d=new Date()){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function offsetDay(day,n){const d=new Date(day+'T12:00:00');d.setDate(d.getDate()+n);return localDay(d)}
function emptyRoutine(){return {goal:10,days:{},banks:{}}}
function loadRoutine(){try{const d=JSON.parse(localStorage.getItem(routineKey)||'null');if(d&&d.days&&d.banks&&[5,10,20,30].includes(d.goal))return d}catch{}return emptyRoutine()}
function saveRoutine(d){try{localStorage.setItem(routineKey,JSON.stringify(d));return true}catch{return false}}
function practiceKey(q){let h=2166136261;const s=JSON.stringify([q.stem,q.options,q.key]);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(16)+'-'+s.length}
function routineCount(d,day=localDay()){return Object.values(d.days[day]||{}).reduce((n,ids)=>n+(Array.isArray(ids)?ids.length:0),0)}
function updateRoutine(d,p,items,answers,day=localDay()){
 const before=routineCount(d,day),bank=d.banks[p]||{questions:{},total:0,last:''};
 const valid=new Set(items.map(practiceKey));for(const key of Object.keys(bank.questions))if(!valid.has(key))delete bank.questions[key];
 const ids=new Set(d.days[day]?.[p]||[]);let changed=false;
 for(const q of items){const answer=answers[q.id];if(!['A','B','C','D'].includes(answer))continue;const key=practiceKey(q),right=answer===q.key;ids.add(key);bank.questions[key]={right,due:offsetDay(day,right?3:1)};changed=true}
 if(changed){bank.total=items.length;bank.last=day;d.banks[p]=bank;(d.days[day]||={})[p]=[...ids];for(const date of Object.keys(d.days))if(date<offsetDay(day,-34))delete d.days[date]}
 return {changed,before,after:routineCount(d,day),goal:d.goal};
}
function recordRoutine(p,items,answers){const d=loadRoutine(),result=updateRoutine(d,p,items,answers);return {...result,saved:!result.changed||saveRoutine(d)}}
function bankProgress(d,p,day=localDay()){const b=d.banks[p];if(!b)return {checked:0,total:0,due:0};const entries=Object.values(b.questions||{});return {checked:entries.length,total:b.total,due:entries.filter(x=>x.due<=day).length,last:b.last}}
function quickItems(d,p,items,mode,day=localDay()){
 const seen=d.banks[p]?.questions||{},due=[],fresh=[],later=[];
 for(const q of items){const x=seen[practiceKey(q)];if(x&&x.due<=day)due.push(q);else if(!x)fresh.push(q);else later.push(q)}
 return (mode==='review'?due:[...due,...fresh,...later]).slice(0,5);
}
function topicLabel(p){const s=bankProgress(loadRoutine(),p);if(!s.checked)return '';return s.due?s.due+' due for revision':s.checked+' / '+s.total+' practised'}
function studyLabel(p){const label=topicLabel(p);if(!label)return null;return node('span',label,'personal-topic-label')}
function drawRoutine(data){
 const panel=document.getElementById('daily-study');if(!panel)return;panel.replaceChildren();
 const d=loadRoutine(),today=localDay(),count=routineCount(d,today),goal=d.goal,completed=count>=goal;
 const header=node('div',undefined,'daily-header'),heading=node('div'),k=node('p','YOUR DAILY STUDY','kicker');heading.append(k,node('h2',completed?'Daily goal complete!':'A little progress every day'),node('p',completed?'Great work. You can revise, take a break or keep learning.':'Choose a small practice session and build your understanding.','muted'));
 const goalWrap=node('label','Daily question goal','daily-goal-select'),sel=node('select');sel.setAttribute('aria-label','Daily question goal');for(const n of [5,10,20,30]){const o=node('option',String(n));o.value=String(n);o.selected=n===goal;sel.append(o)}sel.onchange=()=>{const current=loadRoutine();current.goal=Number(sel.value);if(saveRoutine(current))drawRoutine(data);else panel.append(node('p','Your browser could not save this goal.','load-error'))};goalWrap.append(sel);header.append(heading,goalWrap);panel.append(header);
 const stats=node('div',undefined,'daily-progress'),label=node('div',undefined,'daily-progress-label');label.append(node('strong',count+' / '+goal+' questions'),node('span',completed?'Goal reached':Math.max(0,goal-count)+' remaining'));const meter=node('progress');meter.max=goal;meter.value=Math.min(count,goal);meter.setAttribute('aria-label','Daily question goal progress');stats.append(label,meter);panel.append(stats);
 const week=node('div',undefined,'study-week');for(let i=6;i>=0;i--){const day=offsetDay(today,-i),n=routineCount(d,day),cell=node('div',undefined,'study-day'+(n?' active':'')+(i===0?' today':''));cell.setAttribute('aria-label',day+': '+n+' questions practised');cell.append(node('span',new Date(day+'T12:00:00').toLocaleDateString('en-IN',{weekday:'short'})),node('strong',n?String(n):'—'));week.append(cell)}panel.append(week);
 const records=(data?.chapters||[]).flatMap(c=>c.records).filter(f=>f.scoreable>0&&!data.resources?.[f.path]?.draft);
 const allowed=new Map(records.map(f=>[f.path,f]));const recent=getRecent().find(x=>allowed.has(x.path)&&allowed.get(x.path).category!=='mock');
 const next=recent?.path||records.find(f=>f.path.includes('/Nursing-Foundations/MCQs/'))?.path||records[0]?.path;
 const due=Object.keys(d.banks).filter(p=>allowed.has(p)&&bankProgress(d,p).due).sort((a,b)=>bankProgress(d,b).due-bankProgress(d,a).due);
 const actions=node('div',undefined,'daily-actions');
 if(next){const card=node('a',undefined,'daily-action primary-daily');card.href=route(next)+'&session=quick';card.append(node('strong','Quick 5-question practice'),node('span',knownTitle(next)),node('small','Untimed · Original explanations →'));actions.append(card)}
 if(due.length){const p=due[0],card=node('a',undefined,'daily-action');card.href=route(p)+'&session=review';card.append(node('strong','Revise questions due'),node('span',knownTitle(p)),node('small',due.reduce((n,p)=>n+bankProgress(d,p).due,0)+' due across '+due.length+' banks →'));actions.append(card)}
 else{const card=node('a',undefined,'daily-action');card.href='#bookmarks';card.append(node('strong','Review saved questions'),node('span','Revisit your bookmarks'),node('small','No scheduled revision due from tracked banks'));actions.append(card)}
 panel.append(actions,node('p','Progress stays on this browser. A question counts once per bank each day. Revision intervals are 1 day after an incorrect answer and 3 days after a correct answer.','daily-note'));
}
if(typeof module!=='undefined')module.exports={localDay,offsetDay,emptyRoutine,routineCount,updateRoutine,bankProgress,quickItems,practiceKey};
