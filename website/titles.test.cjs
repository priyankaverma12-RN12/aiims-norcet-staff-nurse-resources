'use strict';
const assert=require('node:assert/strict');
const {resourceMeta}=require('./titles.js');
let m=resourceMeta('Chapters/Respiratory-System/MCQs/Day-01-Complete-Respiratory-Anatomy-Physiology.md','📝 Day 1 — Respiratory Anatomy & Physiology: 44 Practice MCQ slots (including revision overlaps)',44);
assert.equal(m.title,'Day 1 — Respiratory Anatomy & Physiology');assert.equal(m.subtitle,'Topic MCQs · 44 question slots');
m=resourceMeta('Chapters/Nursing-Foundations/MCQs/01-Nursing-Process-and-Clinical-Judgment-20-MCQs.md','Nursing process and clinical judgment — 20 original MCQs',20);assert.equal(m.title,'Nursing process and clinical judgment');
m=resourceMeta('Chapters/Nursing-Foundations/Mock-Tests/Nursing-Foundations-Mock-01-120.md','Nursing Foundations — Mock Test 1 (120 questions)',120);assert.equal(m.title,'Nursing Foundations — Mock Test 1');assert.equal(m.type,'Mock test');
m=resourceMeta('Chapters/Eye-and-ENT-Nursing/Mock-Tests/Mock-02-Original-Only-Draft-Q001-Q010.md','Eye and ENT Mock 02 — original-only draft Q001–Q010',10);assert(m.draft);assert.equal(m.type,'Draft question set');assert(m.title.includes('Q001–Q010'));
m=resourceMeta('Chapters/Respiratory-System/Previous-Year-Questions/Day-03-Reported-Nursing-Exam-Questions.md','Day 3 — Reported Nursing Exam Questions',4);assert.equal(m.type,'Reported exam practice');
assert.equal(resourceMeta('Chapters/Respiratory-System/README.md','🫁 Respiratory System — Hamara Illustrated Complete Chapter').title,'Respiratory System');
assert.equal(resourceMeta('Chapters/Renal-and-Urinary-System/Concepts/').title,'Theory');
console.log('Consistent title, resource type, draft status and topic preservation tests passed.');

for(const [folder,title] of [['Concepts','Theory'],['MCQs','MCQs'],['Mock-Tests','Mock tests'],['Previous-Year-Questions','Previous year questions'],['Revision','Revision']]){
 assert.equal(resourceMeta('Chapters/Example/'+folder+'/').title,title);
 assert.equal(resourceMeta('Chapters/Example/'+folder+'/').type,'Resource collection');
}
assert.equal(resourceMeta('Chapters/Example/MCQs/Asthma-30-MCQs.md','MCQs',30).title,'Asthma');
assert.equal(resourceMeta('Chapters/NORCET-Full-Chapter-Index.md','NORCET Full Chapter Index').type,'Study index');
console.log('Folder names and generic heading fallbacks passed.');
