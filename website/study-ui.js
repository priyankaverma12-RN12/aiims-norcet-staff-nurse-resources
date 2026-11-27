'use strict';
const metricLabels={mcq:'Topic MCQs',mock:'Mock question slots',pyq:'PYQ / reported practice',imported:'Imported practice',embedded:'Embedded questions'};
let metricsPromise,resourceCatalog={};
function getResourceMeta(p,heading='',slots=null){return heading?resourceMeta(p,heading,slots??resourceCatalog[p]?.slots??null):(resourceCatalog[p]||resourceMeta(p,'',slots))}
function knownTitle(p){return getResourceMeta(p).title}
function linkTitle(target,href,original){try{if(new URL(href).hash)return cleanTitle(original)||knownTitle(target)}catch{}return knownTitle(target)}
function getMetrics(){if(!metricsPromise)metricsPromise=fetch('./study-metrics.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Inventory is unavailable');return r.json()}).then(data=>{resourceCatalog=data.resources||{};return data}).catch(()=>null);return metricsPromise}
function displayTitle(s){return String(s||'').replace(/[*_\x60]/g,'').trim()}
function studyLink(label,p){const a=node('a',label);a.href=route(p);return a}
function metricCard(label,value){const c=node('div',undefined,'metric-tile');c.append(node('span',label),node('strong',Number(value||0).toLocaleString('en-IN')));return c}
async function showMetrics(){
 $('home').hidden=true;$('reader').hidden=true;$('metrics').hidden=false;document.title='Study metrics | Nursing Study Hub';
 const data=await getMetrics();if(!data){$('metrics-status').textContent='Metrics snapshot unavailable. Browse the chapter library for live study material.';return}
 const requested=params.get('chapter'),select=$('metrics-chapter'),category=$('metrics-category'),search=$('metrics-search'),grid=$('metrics-totals'),list=$('metrics-list');
 for(const c of data.chapters){const o=node('option',c.name);o.value=c.id;select.append(o)}if(data.chapters.some(c=>c.id===requested))select.value=requested;
 $('metrics-status').textContent='Repository snapshot · '+new Date(data.generatedAt).toLocaleDateString('en-IN',{dateStyle:'medium'})+' · '+data.sourceCommit.slice(0,8);
 $('metrics-method').textContent=data.method;
 function draw(){
  const chapters=select.value?data.chapters.filter(c=>c.id===select.value):data.chapters,k=category.value,q=search.value.trim().toLowerCase();grid.replaceChildren();list.replaceChildren();
  const totals={};for(const key of Object.keys(metricLabels)){totals[key]=chapters.reduce((sum,c)=>sum+(c.totals[key]||0),0);const tile=metricCard(metricLabels[key],totals[key]);if(key==='mock')tile.append(node('small',chapters.reduce((n,c)=>n+c.banks.mock,0)+' mock files'));grid.append(tile)}
  for(const c of chapters){
   const matches=c.records.filter(f=>(!k||f.category===k)&&(!q||(f.title+' '+f.path+' '+c.name).toLowerCase().includes(q)));
   if(q&&!matches.length)continue;
   const card=node('details',undefined,'metric-chapter'),summary=node('summary'),title=node('span',c.name,'metric-chapter-title'),chips=node('span',undefined,'metric-chips');
   for(const key of ['mcq','mock','pyq'])chips.append(node('span',c.totals[key]+' '+({mcq:'MCQs',mock:'mock slots',pyq:'PYQ slots'}[key])));
   summary.append(title,chips);card.append(summary);card.open=!!select.value||!!q;
   const tools=node('div',undefined,'metric-chapter-tools');tools.append(studyLink('Open chapter →','Chapters/'+c.id+'/README.md'),node('span',c.banks.mock+' mock files · '+c.evidenceFiles+' PYQ notes/registers without detected four-option questions'));card.append(tools);
   const rows=node('div',undefined,'metric-records');for(const f of matches){const row=node('div',undefined,'metric-record'),left=node('div');left.append(studyLink(knownTitle(f.path),f.path),node('small',getResourceMeta(f.path).type==='Draft question set'?'Draft question set':metricLabels[f.category]));row.append(left,node('strong',String(f.slots)));rows.append(row)}if(!matches.length)rows.append(node('p','No detected question slots in this category.','muted'));card.append(rows);list.append(card);
  }
  if(!list.children.length)list.append(node('p','No matching topics.','empty-state'));
 }
 select.onchange=()=>{const u=new URL(location.href);if(select.value)u.searchParams.set('chapter',select.value);else u.searchParams.delete('chapter');history.replaceState(history.state,'',u.href);draw()};category.onchange=draw;search.oninput=draw;draw();
}
function isIndexDocument(p){return /\/(?:README|[^/]*[- ]Index|[^/]*-Topic-Coverage-Map|[^/]*-Mock-Test-Plan)\.md$/i.test(p)&&!p.includes('/Mock-Tests/Original-Only-')}
function compactIndex(content,p,catalog){
 if(!isIndexDocument(p)||!catalog)return;
 // Preserve the existing rendered DOM and named anchors; put long index notes behind a disclosure.
 const title=content.querySelector('h1');if(!title||title.parentElement!==content)return;
 const groups=new Map(),seen=new Set();
 for(const a of content.querySelectorAll('a[href]')){
  let target;try{const u=new URL(a.href);if(u.origin!==location.origin||!u.searchParams.has('doc'))continue;target=u.searchParams.get('doc')}catch{continue}
  if(!safe(target)||target===p||seen.has(a.href)||!a.textContent.trim())continue;
  const folder=target.split('/')[2]||'Overview',meta=getResourceMeta(target),label=meta.type==='Mock test'?'Mock tests':meta.type==='Draft question set'?'Draft question sets':({'Concepts':'Theory','MCQs':'MCQs','Mock-Tests':'Mock tests','Previous-Year-Questions':'Previous year questions','Revision':'Revision'}[folder]||'Other study resources');
  seen.add(a.href);if(!groups.has(label))groups.set(label,[]);groups.get(label).push({text:linkTitle(target,a.href,a.textContent.trim()),href:a.href});
 }
 if(!groups.size)return;
 const panel=node('section',undefined,'compact-index'),hint=node('p','Choose a resource below. Study status, provenance notes and the complete original index remain available below.','muted');panel.append(hint);
 const filter=node('input');filter.type='search';filter.placeholder='Find a topic or study resource…';filter.setAttribute('aria-label','Find a topic in this index');panel.append(filter);const groupList=node('div',undefined,'index-resource-groups');panel.append(groupList);
 function draw(){groupList.replaceChildren();const query=filter.value.trim().toLowerCase();for(const [label,links] of groups){const matches=links.filter(l=>!query||(l.text+' '+label).toLowerCase().includes(query));if(!matches.length)continue;const section=node('details',undefined,'index-resource-group');section.open=!!query||groups.size<=2||!groupList.children.length;const summary=node('summary');summary.append(node('strong',label),node('span',matches.length+' links'));section.append(summary);const list=node('div',undefined,'index-link-list');for(const l of matches){const a=node('a',l.text);a.href=l.href;list.append(a)}section.append(list);groupList.append(section)}if(!groupList.children.length)groupList.append(node('p','No matching resources.','muted'))}
 filter.oninput=draw;draw();
 const original=node('details',undefined,'original-index');original.id='original-index';original.append(node('summary','Full original index and study notes'));const nodes=[...content.childNodes];for(const n of nodes)if(n!==title)original.append(n);content.append(panel,original);
}
function openAnchor(hash){
 if(!hash)return;let id;try{id=decodeURIComponent(hash.replace(/^#/,''))}catch{return}
 const target=document.getElementById(id)||[...document.querySelectorAll('#content a[name]')].find(a=>a.getAttribute('name')===id);if(!target)return;
 for(let n=target.parentElement;n;n=n.parentElement)if(n.tagName==='DETAILS')n.open=true;
 requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));
}
function decoratePyq(content,p){
 if(!p.includes('/Previous-Year-Questions/'))return;
 let count=0;
 for(const answer of [...content.querySelectorAll('details')]){
  if(answer.parentElement!==content||!/(answer|explanation|उत्तर|रationale)/i.test(answer.querySelector('summary')?.textContent||''))continue;
  const previous=[];let cursor=answer.previousElementSibling;
  while(cursor&&previous.length<16&&!cursor.matches('details,.pyq-card,h1,h2,h3,h4,h5,h6')){previous.unshift(cursor);cursor=cursor.previousElementSibling}
  const opts=previous.flatMap(n=>n.tagName==='UL'||n.tagName==='OL'?[...n.querySelectorAll(':scope > li')]:[]).map(li=>li.textContent.trim());
  if(!['A','B','C','D'].every(letter=>opts.some(t=>new RegExp('^'+letter+'[.)]','i').test(t))))continue;
  const first=cursor&&/^H[3-6]$/.test(cursor.tagName)?cursor:previous[0];if(!first)continue;
  const card=node('section',undefined,'pyq-card');first.before(card);
  const label=node('div',undefined,'pyq-card-label');label.append(node('span','QUESTION '+String(++count).padStart(2,'0'),'pyq-number'),node('span','Published source record','muted'));card.append(label);
  if(cursor===first){card.append(cursor);const parent=card.previousElementSibling;let heading=parent;while(heading&&!heading.matches('h2,h3'))heading=heading.previousElementSibling;if(heading&&/20\d{2}|19\d{2}|reported|memory-based/i.test(heading.textContent)){const context=node('p',heading.textContent,'pyq-context');label.after(context)}}
  previous.forEach(n=>{if(n.parentElement===content){if(n.tagName==='UL'||n.tagName==='OL'){const options=[...n.children];if(options.length===4&&options.every((x,i)=>new RegExp('^'+'ABCD'[i]+'[.)]','i').test(x.textContent.trim())))n.classList.add('pyq-options')}card.append(n)}});
  const examLinks=[...answer.querySelectorAll('a[href]')].filter(a=>/^https?:/.test(a.href)&&/(retrieved|question report|reported question|official (?:paper|booklet)|exam paper|memory.based|historical source)/i.test(a.textContent));if(examLinks.length){const evidence=node('div',undefined,'pyq-exam-source');evidence.append(node('span','Published exam source: '));const l=node('a',examLinks[0].textContent.trim());l.href=examLinks[0].href;l.target='_blank';l.rel='noopener noreferrer';evidence.append(l);card.append(evidence)}card.append(answer);answer.classList.add('pyq-explanation');answer.open=false;
  const references=[...answer.querySelectorAll('a[href]')].filter(a=>/^https?:/.test(a.href)&&a.origin!==location.origin);if(references.length){const links=node('div',undefined,'pyq-source-links');links.append(node('strong','Sources and videos from this explanation'));const used=new Set();for(const source of references){if(used.has(source.href))continue;used.add(source.href);const l=node('a',source.textContent.trim()||'Open source');l.href=source.href;l.target='_blank';l.rel='noopener noreferrer';try{if(/(^|\.)youtube\.com$|^youtu\.be$/.test(new URL(l.href).hostname))l.classList.add('video-link')}catch{}links.append(l)}answer.append(links)}
 }
 if(count){const note=node('p',count+' question cards · Exam dates, provenance, options and explanations are taken from the original file. Open an explanation to reveal its answer and available links.','pyq-intro');const h=content.querySelector('h1');if(h)h.after(note);else content.prepend(note)}
}
function mobileOutline(){
 const outline=document.querySelector('.outline-card');if(!outline)return;
 if(matchMedia('(max-width: 600px)').matches)outline.open=false;
 $('outline').addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;e.preventDefault();if(location.hash!==a.hash)history.pushState(history.state,'',a.hash);openAnchor(a.hash);if(matchMedia('(max-width:600px)').matches)outline.open=false});
 window.addEventListener('hashchange',()=>openAnchor(location.hash));
}
async function enrichDirectory(p,content){
 const data=await getMetrics(),chapter=data?.chapters.find(c=>c.id===p.split('/')[1]);if(!chapter)return;
 const byPath=new Map(chapter.records.map(x=>[x.path,x])),evidence=new Set(chapter.evidencePaths||[]),links=[...content.querySelectorAll('.file-card')],pyq=p.includes('/Previous-Year-Questions/');
 if(!links.length)return;
 const groups=[[],[],[]];for(const link of links){link.querySelector('.file-count')?.remove();const target=new URL(link.href).searchParams.get('doc'),f=byPath.get(target);if(f){link.append(node('span',f.slots+' questions','file-count'));groups[0].push(link)}else if(pyq&&target?.endsWith('.md')){link.append(node('span',evidence.has(target)?'Source notes / index':'Not counted in snapshot','file-count evidence-file'));groups[evidence.has(target)?1:2].push(link)}else groups[2].push(link)}
 if(pyq){const list=links[0].parentElement;list.replaceChildren();for(const [i,title] of ['Question banks','Research and evidence notes','Other resources'].entries()){if(!groups[i].length)continue;list.append(node('h2',title,'pyq-directory-heading'),...groups[i])}}
}
