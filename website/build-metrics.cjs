'use strict';
// Inventory of detected question occurrences, not a deduplicated or authenticated exam count.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {parseBank,bankSignature}=require('./quiz.js');
const {resourceMeta}=require('./titles.js');
const root=path.resolve(__dirname,'..');
const {countSlots}=require('./progress.js');
const {practiceKey}=require('./routine.js');
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
const chapterRoot=path.join(root,'Chapters'),chapters=[],resources={};
for(const ent of fs.readdirSync(chapterRoot,{withFileTypes:true})){
 if(!ent.isDirectory()||!fs.existsSync(path.join(chapterRoot,ent.name,'README.md')))continue;
 const records=[],totals=blank(),banks=blank();let evidenceFiles=0;const evidencePaths=[];
 for(const f of walk(path.join(chapterRoot,ent.name))){
  const rel=path.relative(root,f).split(path.sep).join('/'),md=fs.readFileSync(f,'utf8'),kind=category(rel),slots=countSlots(md);
  const sourceHeading=md.match(/^#\s+(.+)$/m)?.[1]||'';const meta=resourceMeta(rel,sourceHeading,slots);const anchors={};const used=new Map();let named='';for(const line of md.split(/\r?\n/)){const explicit=line.match(/<a\s+[^>]*name=["']([^"']+)["']/i);if(explicit)named=explicit[1];const h=line.match(/^#{1,6}\s+(.+)$/);if(!h)continue;if(/^Q(?:uestion)?\s*\d+[.):]/i.test(h[1])){named='';continue}const label=h[1].trim().replace(/[*_\x60]/g,'');const slug=label.toLowerCase().replace(/[^\p{L}\p{N}_ -]/gu,'').replace(/ /g,'-');const n=used.get(slug)||0;used.set(slug,n+1);if(slug)anchors[slug+(n?'-'+n:'')]=label;if(named){anchors[named]=label;named=''}}meta.anchors=anchors;resources[rel]=meta;assert(meta.title&&meta.type&&meta.subtitle,'Missing display metadata: '+rel);
  if(!slots){if(kind==='pyq'){evidenceFiles++;evidencePaths.push(rel)}continue}
  const items=parseBank(md).items,scoreable=items.length,questionKeys=items.map(practiceKey),signature=bankSignature(items);
  const heading=md.match(/^#\s+(.+)$/m)?.[1]||path.basename(f,'.md').replace(/-/g,' ');
  records.push({path:rel,title:meta.title,category:kind,slots,scoreable,questionKeys,signature});totals[kind]+=slots;banks[kind]++;
 }
 records.sort((a,b)=>a.path.localeCompare(b.path,undefined,{numeric:true}));
 chapters.push({id:ent.name,name:ent.name.replace(/-/g,' '),totals,banks,evidenceFiles,evidencePaths,records});
}
for(const ent of fs.readdirSync(chapterRoot,{withFileTypes:true})){if(!ent.isFile()||!ent.name.endsWith('.md'))continue;const rel='Chapters/'+ent.name,md=fs.readFileSync(path.join(chapterRoot,ent.name),'utf8');resources[rel]=resourceMeta(rel,md.match(/^#\s+(.+)$/m)?.[1]||'',0)}
const totals=blank(),banks=blank();for(const c of chapters)for(const k of cats){totals[k]+=c.totals[k];banks[k]+=c.banks[k];assert.equal(c.totals[k],c.records.filter(x=>x.category===k).reduce((s,x)=>s+x.slots,0))}
const output={schema:1,generatedAt:new Date().toISOString(),sourceCommit:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),method:'Detected A–D option sequences outside answer details, grouped by source file. These are published question occurrences, not unique original questions or authenticated PYQs. Mock slots may reuse bank questions. Unsupported formats and evidence-only entries are not counted.',chapters,totals,banks,resources};
fs.writeFileSync(path.join(__dirname,'study-metrics.json'),JSON.stringify(output));
console.log('STUDY METRICS:',JSON.stringify({chapters:chapters.length,totals,banks}), 'all per-file sums verified.');
console.log('RESOURCE TITLES:',Object.keys(resources).length,'Markdown documents indexed with consistent display metadata.');

const issues=[],typeCounts={},sameTitles=new Map();
for(const [file,m] of Object.entries(resources)){
 typeCounts[m.type]=(typeCounts[m.type]||0)+1;
 const flags=[];
 if(!m.title||!m.subtitle||!m.type)flags.push('missing-display-field');
 if(/^(?:README|MCQs?|Theory|Notes|Questions|Index|Practice|Mock test|Study resource|Day\s*\d+)$/i.test(m.title))flags.push('generic-title');
 if(!m.sourceTitle)flags.push('no-source-h1');
 if(/(?:\.md$|[*_\x60]|<[^>]+>)/i.test(m.title))flags.push('markup-or-filename-residue');
 if(m.title.length>145)flags.push('long-title');
 if(m.draft&&m.type!=='Draft question set')flags.push('draft-type-mismatch');
 const group=m.chapter+'\u0000'+m.type+'\u0000'+m.title.toLowerCase();
 if(!sameTitles.has(group))sameTitles.set(group,[]);sameTitles.get(group).push(file);
 if(flags.length)issues.push({file,title:m.title,sourceTitle:m.sourceTitle,type:m.type,flags});
 assert(m.title&&m.subtitle&&m.type,'Missing title metadata: '+file);
}
for(const files of sameTitles.values())if(files.length>1)issues.push({files,title:resources[files[0]].title,type:resources[files[0]].type,flags:['same-display-title-in-chapter']});
const titleAudit={sourceCommit:output.sourceCommit,documents:Object.keys(resources).length,typeCounts,issues,method:'Every display metadata entry checked for required fields, generic headings, missing source H1, residual markup, length, draft status and duplicate titles. Semantic accuracy requires review of flagged source documents.'};
fs.writeFileSync(path.join(__dirname,'title-audit.json'),JSON.stringify(titleAudit));
console.log('TITLE AUDIT:',JSON.stringify({documents:titleAudit.documents,typeCounts,issues:issues.length}));
for(const item of issues)console.log('TITLE REVIEW:',JSON.stringify(item));
