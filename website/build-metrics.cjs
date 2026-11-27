'use strict';
// Inventory of detected question occurrences, not a deduplicated or authenticated exam count.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {parseBank}=require('./quiz.js');
const root=path.resolve(__dirname,'..');
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
function category(rel){
 const parts=rel.split('/'),folder=parts[2]||'',file=parts.at(-1);
 if(folder==='Previous-Year-Questions')return 'pyq';
 if(folder==='Mock-Tests'||folder==='MCQs'&&/(?:^|[-_ ])mock(?:[-_ .]|\d)/i.test(file))return 'mock';
 if(folder==='MCQs'&&/imported|uploaded/i.test(file))return 'imported';
 if(folder==='MCQs')return 'mcq';
 return 'embedded';
}
assert.equal(countSlots('### Reported exam\nQuestion?\n- **A.** a\n- **B.** b\n- **C.** c\n- **D.** d\n<details><summary>Answer</summary>\n- A. rationale\n- B. rationale\n- C. rationale\n- D. rationale\n</details>'),1);
assert.equal(countSlots('A. a\nB. b\nD. d'),0);
assert.equal(countSlots('A. a\nB. b\nC. c\nD. d\nA. e\nB. f\nC. g\nD. h'),2);
assert.equal(category('Chapters/X/MCQs/Day-01-Final-Mock-15.md'),'mock');
assert.equal(category('Chapters/X/Previous-Year-Questions/Reported-Evidence.md'),'pyq');
const cats=['mcq','mock','pyq','imported','embedded'];
function blank(){return Object.fromEntries(cats.map(k=>[k,0]))}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):e.isFile()&&e.name.endsWith('.md')?[path.join(dir,e.name)]:[])}
const chapterRoot=path.join(root,'Chapters'),chapters=[];
for(const ent of fs.readdirSync(chapterRoot,{withFileTypes:true})){
 if(!ent.isDirectory()||!fs.existsSync(path.join(chapterRoot,ent.name,'README.md')))continue;
 const records=[],totals=blank(),banks=blank();let evidenceFiles=0;const evidencePaths=[];
 for(const f of walk(path.join(chapterRoot,ent.name))){
  const rel=path.relative(root,f).split(path.sep).join('/'),md=fs.readFileSync(f,'utf8'),kind=category(rel),slots=countSlots(md);
  if(!slots){if(kind==='pyq'){evidenceFiles++;evidencePaths.push(rel)}continue}
  const scoreable=parseBank(md).items.length;
  const heading=md.match(/^#\s+(.+)$/m)?.[1]||path.basename(f,'.md').replace(/-/g,' ');
  records.push({path:rel,title:heading,category:kind,slots,scoreable});totals[kind]+=slots;banks[kind]++;
 }
 records.sort((a,b)=>a.path.localeCompare(b.path,undefined,{numeric:true}));
 chapters.push({id:ent.name,name:ent.name.replace(/-/g,' '),totals,banks,evidenceFiles,evidencePaths,records});
}
const totals=blank(),banks=blank();for(const c of chapters)for(const k of cats){totals[k]+=c.totals[k];banks[k]+=c.banks[k];assert.equal(c.totals[k],c.records.filter(x=>x.category===k).reduce((s,x)=>s+x.slots,0))}
const output={schema:1,generatedAt:new Date().toISOString(),sourceCommit:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),method:'Detected A–D option sequences outside answer details, grouped by source file. These are published question occurrences, not unique original questions or authenticated PYQs. Mock slots may reuse bank questions. Unsupported formats and evidence-only entries are not counted.',chapters,totals,banks};
fs.writeFileSync(path.join(__dirname,'study-metrics.json'),JSON.stringify(output));
console.log('STUDY METRICS:',JSON.stringify({chapters:chapters.length,totals,banks}), 'all per-file sums verified.');
