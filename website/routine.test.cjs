'use strict';
const assert=require('node:assert/strict');
const {emptyRoutine,offsetDay,routineCount,updateRoutine,bankProgress,quickItems}=require('./routine.js');
const d=emptyRoutine(),p='Chapters/X/MCQs/A.md',day='2026-11-28',items=Array.from({length:8},(_,i)=>({id:String(i),stem:'Question '+i,options:['a','b','c','d'],key:'B'}));
assert.equal(offsetDay('2026-12-31',1),'2027-01-01');
assert.equal(routineCount(d,day),0);
assert.equal(updateRoutine(d,p,items,{'0':'B','1':'A'},day).after,2);
assert.equal(updateRoutine(d,p,items,{'0':'B'},day).after,2);
assert.deepEqual(bankProgress(d,p,day),{checked:2,total:8,due:0,last:day});
assert.equal(bankProgress(d,p,offsetDay(day,1)).due,1);
assert.equal(quickItems(d,p,items,'review',offsetDay(day,1))[0].id,'1');
assert.deepEqual(quickItems(d,p,items,'quick',day).map(q=>q.id),['2','3','4','5','6']);
assert.equal(updateRoutine(d,p,items,{'1':'B'},offsetDay(day,1)).after,1);
assert.equal(bankProgress(d,p,offsetDay(day,1)).due,0);
assert.equal(updateRoutine(d,p,items,{},day).changed,false);
assert.equal(routineCount(d,day),2);
console.log('Daily goal deduplication, local date rollover, revision scheduling and quick practice tests passed.');

const {missedItems}=require('./routine.js');
const review=emptyRoutine();updateRoutine(review,p,items,{'0':'A','1':'B'},day);
assert.deepEqual(missedItems(review,p,items).map(q=>q.id),['0']);
assert.deepEqual(quickItems(review,p,items,'mistakes',day).map(q=>q.id),['0']);
updateRoutine(review,p,items,{'0':'B'},day);assert.equal(missedItems(review,p,items).length,0);
assert.equal(routineCount(review,day),2);
console.log('Review mistakes immediately, remove corrected answers and avoid duplicate daily counting passed.');

const {dailyStudyStats,localDay}=require('./routine.js');
const stamp=new Date(2026,10,28,12).toISOString(),yesterday=new Date(2026,10,27,12).toISOString(),today=localDay(new Date(stamp));
const manual=emptyRoutine(),other='Chapters/X/MCQs/B.md',theory='Chapters/X/Concepts/T.md';
const marks={[p]:{slots:8,at:stamp},[other]:{slots:20,at:yesterday},[theory]:{slots:0,at:stamp}};
assert.deepEqual(dailyStudyStats(manual,marks,today),{answered:0,marked:8,extra:8,topics:2,total:8});
updateRoutine(manual,p,items,{'0':'B','1':'A'},today);
assert.deepEqual(dailyStudyStats(manual,marks,today),{answered:2,marked:8,extra:6,topics:2,total:8});
updateRoutine(manual,other,items,{'0':'B'},today);
assert.equal(dailyStudyStats(manual,marks,today).total,9);
assert.equal(dailyStudyStats(manual,{...marks,[p]:{mode:'pending',slots:8,at:stamp}},today).total,3);
assert.equal(dailyStudyStats(manual,{},today).total,3);
assert.equal(dailyStudyStats(manual,marks,'2026-11-27').total,20);
assert.equal(dailyStudyStats(manual,marks,'2026-11-29').total,0);
assert.equal(dailyStudyStats(manual,{[p]:{slots:8,at:'bad date'}},today).total,3);
console.log('Manual completion dates, combined daily goal, duplicate prevention, reset and existing mark compatibility passed.');

const {DAILY_MCQ_GOAL,dailyGoalFeedback,loadRoutine,saveRoutine}=require('./routine.js');
assert.equal(DAILY_MCQ_GOAL,50);assert.equal(emptyRoutine().goal,50);
for(const [count,level,remaining,percent] of [[0,'new',50,0],[5,'started',45,10],[10,'started',40,20],[25,'half',25,50],[40,'near',10,80],[49,'near',1,98],[50,'complete',0,100],[75,'complete',0,150]]){
 const f=dailyGoalFeedback(count);assert.equal(f.level,level);assert.equal(f.remaining,remaining);assert.equal(f.percent,percent);assert(f.title&&f.message);
}
const original={goal:10,days:{[today]:{[p]:['one','two']}},banks:{[p]:{questions:{one:{right:true,due:today}},total:8}}};
let raw=JSON.stringify(original);global.localStorage={getItem:()=>raw,setItem:(k,v)=>{raw=v}};
const migrated=loadRoutine();assert.equal(migrated.goal,50);assert.deepEqual(migrated.days,original.days);assert.deepEqual(migrated.banks,original.banks);
assert(saveRoutine(migrated));assert.equal(JSON.parse(raw).goal,50);
assert.equal(dailyStudyStats(migrated,{[p]:{slots:75,at:stamp}},today).total,75);
delete global.localStorage;
console.log('Fixed 50-MCQ target, previous history migration, motivational milestones and uncapped totals passed.');

const {currentRevisionCount}=require('./routine.js');
const revisionFixture={banks:{[p]:{questions:{a:{due:day},b:{due:day},c:{due:offsetDay(day,1)}}}}};
assert.equal(currentRevisionCount({path:p,questionKeys:['a','c','a']},revisionFixture,day),1);
assert.equal(currentRevisionCount({path:p,questionKeys:['c']},revisionFixture,day),0);
console.log('Revision suggestions exclude removed questions and duplicates.');

const {calendarStudyStats}=require('./routine.js');
const historical=emptyRoutine();
for(const date of ['2025-11-28','2026-10-01','2026-11-23','2026-11-28','2026-12-01','2027-01-01'])updateRoutine(historical,p,items,{'0':'B'},date);
updateRoutine(historical,p,items,{'0':'A','1':'B'},'2026-11-28');
const cal=calendarStudyStats(historical,{[p]:{slots:5,at:new Date(2026,10,28,12).toISOString()}},'2026-11-28');
assert.equal(cal.monday,'2026-11-23');assert.equal(cal.daily.answered,2);assert.equal(cal.daily.extra,3);assert.equal(cal.weekly.answered,3);assert.equal(cal.monthly.answered,3);assert.equal(cal.monthly.total,6);assert.equal(cal.months['2025-11'].answered,1);assert.equal(cal.months['2026-10'].answered,1);assert.equal(cal.months['2026-12'],undefined);assert.equal(cal.months['2027-01'],undefined);
assert.equal(calendarStudyStats(historical,{},'2027-01-01').weekly.answered,1);assert.equal(calendarStudyStats(historical,{},'2027-01-01').months['2026-12'].answered,1);assert.equal(calendarStudyStats(historical,{},'2026-11-28').daily.total,2);
assert.equal(Object.keys(historical.days).length,6);
assert.equal(calendarStudyStats(emptyRoutine(),{},'2027-01-01').monthly.answered,0);
console.log('Calendar activity, retained multi-year history, Monday boundaries, manual deduplication and future-date exclusion passed.');
