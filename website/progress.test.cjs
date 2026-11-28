'use strict';
const assert=require('node:assert/strict');
const {completionRecords,completionState,completionSummary,clearScope}=require('./progress.js');
const p='Chapters/X/MCQs/A.md',m='Chapters/X/Mock-Tests/M.md',t='Chapters/X/Concepts/T.md',draft='Chapters/X/Mock-Tests/Draft.md';
const data={chapters:[{id:'X',records:[{path:p,category:'mcq',slots:20,scoreable:20},{path:m,category:'mock',slots:120,scoreable:120},{path:draft,category:'mock',slots:10,scoreable:10}]}],resources:{[p]:{type:'Topic MCQs',title:'A'},[m]:{type:'Mock test',title:'M'},[t]:{type:'Theory',title:'T'},[draft]:{type:'Draft question set',draft:true,title:'Draft'}}};
const records=completionRecords(data);assert.equal(records.length,3);
const marks={[p]:{slots:20}},routine={days:{today:{[p]:['a']}},banks:{[p]:{questions:{a:{},b:{}}},[m]:{questions:{x:{}}}}};
assert.deepEqual(completionSummary(records,marks,routine),{done:1,total:3,slots:140,covered:21,checked:3,percent:33.3,questionPercent:15});
assert.equal(completionState({...records.find(x=>x.path===p),slots:21},marks,routine).changed,true);
assert.equal(completionState({...records.find(x=>x.path===p),slots:21},marks,routine).done,false);
clearScope(marks,routine,[p]);assert.equal(marks[p],undefined);assert.equal(routine.banks[p],undefined);assert(routine.banks[m]);assert.deepEqual(routine.days,{today:{[p]:['a']}});
assert.equal(completionSummary(records,marks,routine).covered,1);
console.log('Completion tracking, resource percentages, question coverage, changed bank detection and scoped reset tests passed.');

const keyRecord={path:p,slots:2,scoreable:2,questionKeys:['a','b'],signature:'v1'};
let checked={banks:{[p]:{questions:{a:{},b:{},obsolete:{}}}}};
assert.equal(completionState(keyRecord,{},checked).automatic,true);
assert.equal(completionState(keyRecord,{},checked).checked,2);
assert.equal(completionState({...keyRecord,questionKeys:['a','c'],signature:'v2'}, {},checked).done,false);
assert.equal(completionState({...keyRecord,slots:3}, {},checked).done,false);
assert.equal(completionState(keyRecord,{[p]:{mode:'pending',slots:2}},checked).done,false);
assert.equal(completionState({...keyRecord,signature:'v2'},{[p]:{slots:2,signature:'v1'}},{banks:{}}).changed,true);
assert.equal(completionState({...keyRecord,questionKeys:['a','a']},{},checked).done,false);
console.log('Automatic completion, exact current-question matching, manual override and changed-source tests passed.');

const {mockSummary,mockCountText,inventoryLabelParts,progressTagInfo}=require('./progress.js');
assert.deepEqual(mockSummary(data,data.chapters[0].records),{tests:1,questions:120,drafts:1,draftQuestions:10,otherQuestions:0});
assert.equal(mockCountText(mockSummary(data,data.chapters[0].records)),'1 mock test · 120 questions');
assert.deepEqual(inventoryLabelParts('Chapters/X/Mock-Tests/',data).map(x=>x.text),['1 mock test · 120 questions','1 draft section · 10 questions']);
assert.equal(mockCountText(mockSummary(data,[])),'0 mock tests · 0 questions');
assert.deepEqual(progressTagInfo({done:false,checked:1}),['In progress','active']);
assert.deepEqual(progressTagInfo({done:true}),['✓ Completed','done']);
console.log('Published mock test counts, separate draft counts, zero state and personal study labels passed.');

const {theoryRecords,theoryCountText}=require('./progress.js');
const theoryData={...data,resources:{...data.resources,'Chapters/X/Concepts/README.md':{type:'Resource index'},'Chapters/X/Concepts/Research-Audit.md':{type:'Research and evidence notes'},'Chapters/X/Concepts/Draft.md':{type:'Theory',draft:true},'Chapters/Y/Concepts/Topic.md':{type:'Theory',title:'Y'}}};
assert.equal(theoryRecords(theoryData).length,2);assert.equal(theoryRecords(theoryData,'Chapters/X/README.md').length,1);assert.equal(theoryRecords(theoryData,'Chapters/X/Concepts/').length,1);assert.equal(theoryRecords(theoryData,t).length,1);assert.equal(theoryRecords(theoryData,'Chapters/X/MCQs/').length,0);
assert.equal(theoryCountText(1),'1 theory topic');assert.equal(theoryCountText(0),'0 theory topics');assert.equal(inventoryLabelParts('Chapters/X/Concepts/',theoryData)[0].text,'1 theory topic');
console.log('Theory topic totals exclude drafts, indexes and research notes, and match chapter/folder scope.');
