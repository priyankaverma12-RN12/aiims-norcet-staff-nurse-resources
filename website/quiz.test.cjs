'use strict';
const assert=require('node:assert/strict');
const {parseBank,scoreBank,bankSignature,validateAttempt}=require('./quiz.js');
const q=(n,key,opts='A. alpha\nB. beta\nC. gamma\nD. delta',hint='')=>`### Q${n}. Example ${n}?\n${opts}\n${hint}<details><summary>Answer</summary>\n\n**Correct answer: ${key}. Explanation**\n\nOriginal rationale.\n</details>\n`;
const md=q(1,'A')+q(2,'B','- **A.** alpha\n- **B.** beta\n- **C.** gamma\n- **D.** delta','<details><summary>Hint</summary>Only a hint.</details>\n')+q(3,'D');
const bank=parseBank(md);
assert.equal(bank.items.length,3);
assert.equal(bank.items[1].key,'B');
assert(!bank.items[1].explanation.includes('Only a hint'));
assert.deepEqual(scoreBank(bank.items,{'1-0':'A','2-1':'D'},0),{correct:1,wrong:1,skipped:1,score:1,total:3});
assert(Math.abs(scoreBank(bank.items,{'1-0':'A','2-1':'D'},1/3).score-2/3)<1e-10);
assert.equal(parseBank(q(1,'A','A. alpha\nB. beta\nD. delta')).items.length,0);
assert.equal(parseBank(q(1,'A','A. alpha\ncontinued option\nB. beta\nC. gamma\nD. delta')).items.length,0);
assert.equal(parseBank(q(1,'A').replace('Original rationale.','**Correct answer: C. Contradiction**')).items.length,0);
console.log('All quiz parser and scoring regression tests passed.');

const saved={signature:bankSignature(bank.items),deadline:Date.now()+60000,penalty:1/3,at:1,finished:false,selected:{'1-0':'A','2-1':'D'}};
assert.deepEqual(validateAttempt(saved,bank.items),saved);
assert.equal(validateAttempt({...saved,selected:{'1-0':'E'}},bank.items),null);
assert.equal(validateAttempt({...saved,selected:{'missing':'A'}},bank.items),null);
assert.equal(validateAttempt({...saved,at:3},bank.items),null);
assert.equal(validateAttempt({...saved,deadline:NaN},bank.items),null);
assert.equal(validateAttempt({...saved,penalty:1},bank.items),null);
assert.equal(validateAttempt(saved,parseBank(md.replace('Example 1?','Updated question?')).items),null);
assert.deepEqual(validateAttempt({...saved,finished:true},bank.items),{...saved,finished:true});
console.log('Saved-attempt validation tests passed.');

const {resultMetrics,answerStatus}=require('./quiz.js');
const result=resultMetrics(bank.items,{'1-0':'A','2-1':'D'},1/3);
assert.equal(result.answered,2);assert.equal(result.accuracy,50);assert(Math.abs(result.percentage-100*result.score/3)<1e-10);
assert.equal(resultMetrics(bank.items,{},1/3).accuracy,null);
assert.equal(resultMetrics(bank.items,{'1-0':'B'},1/3).percentage<0,true);
assert.equal(answerStatus(bank.items[0],{'1-0':'A'}),'correct');
assert.equal(answerStatus(bank.items[0],{'1-0':'B'}),'incorrect');
assert.equal(answerStatus(bank.items[0],{}),'skipped');
assert.equal(bank.items[0].explanation,'**Correct answer: A. Explanation**\n\nOriginal rationale.');
console.log('Results, classification and original rationale preservation tests passed.');

const {performanceFeedback}=require('./quiz.js');
for(const [score,level,celebrate] of [[100,'perfect',true],[80,'strong',true],[79.9,'good',false],[60,'good',false],[59.9,'developing',false],[40,'developing',false],[39.9,'review',false],[20,'review',false],[0,'review',false],[-5,'review',false]]){const f=performanceFeedback(score);assert.equal(f.level,level);assert.equal(f.celebrate,celebrate);assert(f.greeting&&f.advice)}
console.log('Score-based learning and exam feedback boundaries passed.');
