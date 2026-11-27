'use strict';
// Stable display metadata only. Never change original file names, Markdown, or question anchors.
function cleanTitle(s){
 return String(s||'').replace(/!\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/<[^>]+>/g,'').replace(/[\uFE0E\uFE0F\u200D]/g,'').replace(/\p{Extended_Pictographic}/gu,'').replace(/[*_\x60]/g,'').replace(/\s+/g,' ').trim().replace(/^[\s:—–|]+|[\s:—–|]+$/g,'');
}
function words(s){return String(s||'').replace(/\.md$/i,'').replace(/-/g,' ').replace(/\s+/g,' ').trim()}
function titleCaseFirst(s){return s?s[0].toUpperCase()+s.slice(1):s}
function resourceMeta(p,sourceHeading='',slots=null){
 const parts=p.split('/').filter(Boolean),chapter=words(parts[1]||'Study library'),name=parts.at(-1)||'',folder=parts[2]||'',isFolder=p.endsWith('/'),filename=words(name);
 const sectionNames={'Concepts':'Theory','MCQs':'MCQs','Mock-Tests':'Mock tests','Previous-Year-Questions':'Previous year questions','Revision':'Revision','Assets':'Illustrations'};
 let type=sectionNames[folder]||'Study resource',title=cleanTitle(sourceHeading)||filename;
 const draft=/(?:^|[-_ ])draft(?:[-_ .]|$)/i.test(name);
 if(isFolder){title=sectionNames[name]||words(name);type='Resource collection'}
 else if(parts.length===2){title=cleanTitle(sourceHeading)||filename;type='Study index'}
 else if(parts.length===3&&name==='README.md'){title=chapter;type='Chapter overview'}
 else if(name==='README.md'){title=(sectionNames[folder]||words(folder))+' index';type='Resource index'}
 else if(/(?:[- ]Index|[- ]Plan|[- ]Map|[- ]Register|[- ]Audit|[- ]Guide|[- ]Gaps|References)\.md$/i.test(name)){type=/Audit|Register|Gaps/i.test(name)?'Research and evidence notes':'Study guide'}
 else if(draft){type='Draft question set'}
 else if(folder==='Mock-Tests'||folder==='MCQs'&&/(?:^|[-_ ])mock(?:[-_ .]|\d)/i.test(name)){type='Mock test'}
 else if(folder==='MCQs'&&/imported|uploaded/i.test(name)){type='Imported practice'}
 else if(folder==='MCQs'){type='Topic MCQs'}
 else if(folder==='Previous-Year-Questions'){type='Previous year questions';if(/Reported|Memory-Based|Adaptation/i.test(name+' '+sourceHeading))type='Reported exam practice'}
 else if(folder==='Concepts'){type='Theory'}
 // Remove only mechanical trailing counts, not clinical concepts, exam dates, mock number or status.
 if(!isFolder&&type!=='Chapter overview'&&name!=='README.md'){
  title=title.replace(/(?:\s*[:—–-]\s*|\s+)\d[\d,]*\s+(?:(?:new|original|practice|topic-wise|clinical)\s+)*(?:MCQs?|questions?|slots?)(?:\s+slots?)?(?:\s*\([^)]*\))?$/i,'').replace(/\s*\(\d[\d,]*\s+(?:questions?|MCQs?)\)$/i,'').trim();
  title=title.replace(/\s*[:—–-]\s*(?:Hamara illustrated complete chapter|complete chapter|easy Roman Hinglish notes)\s*$/i,'').trim();
 }
 if(!isFolder&&(!title||/^(?:README|MCQs?|Theory|Notes|Questions|Index|Practice|Mock test|Study resource|Day\s*\d+|(?:Topic[- ]wise )?(?:Practice )?(?:MCQs|Questions))$/i.test(title)))title=filename.replace(/\s+\d[\d,]*\s+(?:MCQs?|questions?|slots?)$/i,'').trim()||chapter;
 // Preserve day labels, question ranges and evidence distinctions; no invented topic names.
 title=titleCaseFirst(title);
 const subtitle=[type,Number.isInteger(slots)&&slots>0?slots.toLocaleString('en-IN')+' question slots':''].filter(Boolean).join(' · ');
 return {title,chapter,type,subtitle,sourceTitle:cleanTitle(sourceHeading),draft,slots:Number.isInteger(slots)?slots:null};
}
if(typeof module!=='undefined')module.exports={cleanTitle,resourceMeta};
