'use strict';
// Personal progress only: no requests, accounts, analytics or writes to the repository.
const routineKey='nursing-routine-v1';
const DAILY_MCQ_GOAL=50;
function localDay(d=new Date()){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function offsetDay(day,n){const d=new Date(day+'T12:00:00');d.setDate(d.getDate()+n);return localDay(d)}
function emptyRoutine(){return {goal:DAILY_MCQ_GOAL,days:{},banks:{}}}
function loadRoutine(){try{const d=JSON.parse(localStorage.getItem(routineKey)||'null');if(d&&d.days&&d.banks&&typeof d.days==='object'&&typeof d.banks==='object'&&!Array.isArray(d.days)&&!Array.isArray(d.banks))return {...d,goal:DAILY_MCQ_GOAL}}catch{}return emptyRoutine()}
function saveRoutine(d){try{localStorage.setItem(routineKey,JSON.stringify({...d,goal:DAILY_MCQ_GOAL}));return true}catch{return false}}
function practiceKey(q){let h=2166136261;const s=JSON.stringify([q.stem,q.options,q.key]);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(16)+'-'+s.length}
function routineCount(d,day=localDay()){return Object.values(d.days[day]||{}).reduce((n,ids)=>n+(Array.isArray(ids)?ids.length:0),0)}

// Manual completion is self-reported study, not an answer or a score.
// Derive credits from current saved marks and their original local date.
// For one question bank on one day, use the larger count, never their sum.
function dailyStudyStats(d,marks,day=localDay()){
 const actual=d.days[day]||{},manual={},topics=new Set();let answered=0,marked=0,extra=0;
 for(const [p,ids] of Object.entries(actual))if(Array.isArray(ids))answered+=new Set(ids).size;
 for(const [p,m] of Object.entries(marks||{})){
  if(!m||m.mode==='pending'||typeof m.at!=='string')continue;
  const when=new Date(m.at);if(!Number.isFinite(when.getTime())||localDay(when)!==day)continue;
  if(!Number.isSafeInteger(m.slots)||m.slots<0)continue;
  topics.add(p);
  if(m.slots>0)manual[p]=m.slots;
 }
 for(const [p,n] of Object.entries(manual)){marked+=n;extra+=Math.max(0,n-(Array.isArray(actual[p])?new Set(actual[p]).size:0))}
 return {answered,marked,extra,topics:topics.size,total:answered+extra};
}
function dailyGoalFeedback(count){
 const remaining=Math.max(0,DAILY_MCQ_GOAL-count),percent=Math.floor(100*count/DAILY_MCQ_GOAL);
 if(count>DAILY_MCQ_GOAL)return {title:'Hurrah! Goal exceeded!',message:'You studied '+count+' MCQs today — '+(count-DAILY_MCQ_GOAL)+' beyond your goal. Review what you learned and take a well-earned break.',remaining,percent,level:'complete'};
 if(count===DAILY_MCQ_GOAL)return {title:'Hurrah! 50 MCQs completed!',message:'Your daily goal is complete. Great consistency! Revise your mistakes or enjoy a break.',remaining,percent,level:'complete'};
 if(count>=40)return {title:'Almost there!',message:'Only '+remaining+' MCQs left. Finish strong, one question at a time.',remaining,percent,level:'near'};
 if(count>=25)return {title:'Halfway or more — well done!',message:'You have built good momentum. '+remaining+' MCQs left to reach today’s goal.',remaining,percent,level:'half'};
 if(count>=10)return {title:'Great progress! Keep it up.',message:'You have studied '+count+' MCQs. Take another short practice session when you are ready.',remaining,percent,level:'started'};
 if(count>0)return {title:'Nice start! Every MCQ counts.',message:'You have already started learning today. Try another 5 questions to build momentum.',remaining,percent,level:'started'};
 return {title:'Start your 50-MCQ challenge',message:'Begin with 5 questions, then build toward 50 at your own pace. Understand each explanation as you go.',remaining,percent,level:'new'};
}
function currentStudyMarks(){return typeof loadCompletion==='function'?loadCompletion():{}}

function updateRoutine(d,p,items,answers,day=localDay()){
 const before=routineCount(d,day),bank=d.banks[p]||{questions:{},total:0,last:''};
 const valid=new Set(items.map(practiceKey));for(const key of Object.keys(bank.questions))if(!valid.has(key))delete bank.questions[key];
 const ids=new Set(d.days[day]?.[p]||[]);let changed=false;
 for(const q of items){const answer=answers[q.id];if(!['A','B','C','D'].includes(answer))continue;const key=practiceKey(q),right=answer===q.key;ids.add(key);bank.questions[key]={right,due:offsetDay(day,right?3:1)};changed=true}
 if(changed){bank.total=items.length;bank.last=day;d.banks[p]=bank;(d.days[day]||={})[p]=[...ids];for(const date of Object.keys(d.days))if(date<offsetDay(day,-34))delete d.days[date]}
 return {changed,before,after:routineCount(d,day),goal:d.goal};
}
function recordRoutine(p,items,answers){const d=loadRoutine(),marks=currentStudyMarks(),day=localDay(),before=dailyStudyStats(d,marks,day).total,result=updateRoutine(d,p,items,answers,day);const saved=!result.changed||saveRoutine(d);if(result.changed&&saved&&typeof document!=='undefined')document.dispatchEvent(new CustomEvent('study-progress-change'));return {...result,goal:DAILY_MCQ_GOAL,before,after:dailyStudyStats(d,marks,day).total,saved}}
function bankProgress(d,p,day=localDay()){const b=d.banks[p];if(!b)return {checked:0,total:0,due:0};const entries=Object.values(b.questions||{});return {checked:entries.length,total:b.total,due:entries.filter(x=>x.due<=day).length,last:b.last}}
function missedItems(d,p,items){const known=d.banks[p]?.questions||{};return items.filter(q=>known[practiceKey(q)]?.right===false)}
function quickItems(d,p,items,mode,day=localDay()){
 if(mode==='mistakes')return missedItems(d,p,items).slice(0,5);
 const seen=d.banks[p]?.questions||{},due=[],fresh=[],later=[];
 for(const q of items){const x=seen[practiceKey(q)];if(x&&x.due<=day)due.push(q);else if(!x)fresh.push(q);else later.push(q)}
 return (mode==='review'?due:[...due,...fresh,...later]).slice(0,5);
}
function currentRevisionCount(record,d,day=localDay()){const saved=d.banks[record.path]?.questions||{};return Array.isArray(record.questionKeys)?[...new Set(record.questionKeys)].filter(k=>saved[k]?.due&&saved[k].due<=day).length:bankProgress(d,record.path,day).due}
function topicLabel(p){const s=bankProgress(loadRoutine(),p);if(!s.checked)return '';return s.due?s.due+' due for revision':s.checked+' / '+s.total+' practised'}
function studyLabel(p){const label=topicLabel(p);if(!label)return null;return node('span',label,'personal-topic-label')}
function drawRoutine(data){
 const panel=document.getElementById('daily-study');if(!panel)return;panel.replaceChildren();
 const d=loadRoutine(),marks=currentStudyMarks(),today=localDay(),daily=dailyStudyStats(d,marks,today),count=daily.total,goal=DAILY_MCQ_GOAL,completed=count>=goal,feedback=dailyGoalFeedback(count);
 const header=node('div',undefined,'daily-header'),heading=node('div');heading.append(node('p','YOUR DAILY STUDY','kicker'),node('h2',feedback.title),node('p',feedback.message,'muted'));
 const target=node('div',undefined,'daily-target');target.append(node('span','DAILY GOAL'),node('strong','50 MCQs'));header.append(heading,target);panel.append(header);
 const stats=node('div',undefined,'daily-progress'),total=node('div',undefined,'daily-total');total.append(node('span','Total studied today'),node('strong',count.toLocaleString('en-IN')+' MCQs'));stats.append(total);
 const label=node('div',undefined,'daily-progress-label');label.append(node('strong',count+' / '+goal+' MCQs'),node('span',completed?(count===goal?'Goal reached':(count-goal)+' extra MCQs'):feedback.remaining+' remaining'));const meter=node('progress');meter.max=goal;meter.value=Math.min(count,goal);meter.setAttribute('aria-label','Daily 50-MCQ goal progress');stats.append(label,meter);
 const milestone=node('div',undefined,'daily-milestones');for(const n of [10,25,40,50]){const step=node('span',(count>=n?'✓ ':'')+n+' MCQs','daily-milestone');step.dataset.reached=String(count>=n);milestone.append(step)}stats.append(milestone);
 const status=node('p',feedback.percent+'% of daily goal'+(completed?' · Goal completed':''),'daily-goal-status');status.dataset.level=feedback.level;stats.append(status);
 const detail=node('div',undefined,'daily-count-breakdown');detail.append(node('span',daily.answered.toLocaleString('en-IN')+' answered here'),node('span',daily.extra.toLocaleString('en-IN')+' more marked done'));if(daily.topics)detail.append(node('span',daily.topics+' '+(daily.topics===1?'topic':'topics')+' marked done today'));stats.append(detail);panel.append(stats);
 panel.append(node('h3','Your last 7 days','daily-week-heading'));const week=node('div',undefined,'study-week');for(let i=6;i>=0;i--){const day=offsetDay(today,-i),n=dailyStudyStats(d,marks,day).total,cell=node('div',undefined,'study-day'+(n?' active':'')+(i===0?' today':''));cell.setAttribute('aria-label',day+': '+n+' questions studied');cell.append(node('span',new Date(day+'T12:00:00').toLocaleDateString('en-IN',{weekday:'short'})),node('strong',n?String(n):'—'));week.append(cell)}panel.append(week);const weekStats=Array.from({length:7},(_,i)=>dailyStudyStats(d,marks,offsetDay(today,-i))),days=weekStats.filter(x=>x.total>0||x.topics>0).length;panel.append(node('p',weekStats.reduce((n,x)=>n+x.total,0).toLocaleString('en-IN')+' MCQs studied in the last 7 days','daily-week-total'));panel.append(node('p',days?('You studied on '+days+' of the last 7 days. Every study day counts!'):'Start with five questions today.','study-week-note'));
 const records=(data?.chapters||[]).flatMap(c=>c.records).filter(f=>f.scoreable>0&&!data.resources?.[f.path]?.draft);
 const allowed=new Map(records.map(f=>[f.path,f]));const recent=getRecent().find(x=>allowed.has(x.path)&&allowed.get(x.path).category!=='mock');
 const unfinished=f=>f.category!=='mock'&&(!marks[f.path]||marks[f.path].mode==='pending')&&(!f.questionKeys?.length||f.questionKeys.some(k=>!Object.hasOwn(d.banks[f.path]?.questions||{},k)));const recentBank=recent&&allowed.get(recent.path);const next=(recentBank&&unfinished(recentBank)?recentBank.path:null)||records.find(f=>f.path.includes('/Nursing-Foundations/MCQs/')&&unfinished(f))?.path||records.find(unfinished)?.path||recent?.path||records[0]?.path;
 const due=records.map(f=>({path:f.path,n:currentRevisionCount(f,d,today)})).filter(x=>x.n>0).sort((a,b)=>b.n-a.n);
 const actions=node('div',undefined,'daily-actions');
 const partial=records.find(f=>f.path===recent?.path&&f.questionKeys?.some(k=>Object.hasOwn(d.banks[f.path]?.questions||{},k))&&f.questionKeys.some(k=>!Object.hasOwn(d.banks[f.path]?.questions||{},k)));
 if(partial){const remaining=partial.questionKeys.filter(k=>!Object.hasOwn(d.banks[partial.path]?.questions||{},k)).length,card=node('a',undefined,'daily-action');card.href=route(partial.path)+'&session=remaining';card.append(node('strong','Continue where you stopped'),node('span',knownTitle(partial.path)),node('small',remaining+' questions left →'));actions.append(card)}
 if(next){const card=node('a',undefined,'daily-action primary-daily');card.href=route(next)+'&session=quick';card.append(node('strong','Quick 5-question practice'),node('span',knownTitle(next)),node('small','No timer · See explanations →'));actions.append(card)}
 if(due.length){const p=due[0].path,card=node('a',undefined,'daily-action');card.href=route(p)+'&session=review';card.append(node('strong','Revise questions due'),node('span',knownTitle(p)),node('small',due.reduce((n,x)=>n+x.n,0)+' questions ready to revise across '+due.length+' topics →'));actions.append(card)}
 else{const card=node('a',undefined,'daily-action');card.href='#bookmarks';card.append(node('strong','Review saved questions'),node('span','Revisit your bookmarks'),node('small','No questions need revision today'));actions.append(card)}
 const mistakes=records.map(f=>({f,n:(f.questionKeys||[]).filter(k=>d.banks[f.path]?.questions?.[k]?.right===false).length})).filter(x=>x.n>0).sort((a,b)=>b.n-a.n);if(mistakes.length){const card=node('a',undefined,'daily-action mistakes-action');card.href=route(mistakes[0].f.path)+'&session=mistakes';card.append(node('strong','Learn from your mistakes'),node('span',knownTitle(mistakes[0].f.path)),node('small',mistakes[0].n+' questions to try again →'));actions.append(card)}
 const progressLink=node('a','View my chapter and topic progress →','daily-progress-link');progressLink.href='./?progress=1';panel.append(actions,progressLink,node('p','Today’s goal includes questions answered here and questions you mark done. We do not add the same bank twice. Undoing or resetting a mark removes its manual credit; actual answer history stays. Progress is saved on this browser.','daily-note'));
}
if(typeof module!=='undefined')module.exports={localDay,offsetDay,emptyRoutine,routineCount,updateRoutine,bankProgress,quickItems,practiceKey,missedItems,dailyStudyStats,dailyGoalFeedback,DAILY_MCQ_GOAL,loadRoutine,saveRoutine,currentRevisionCount};
