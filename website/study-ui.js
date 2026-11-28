'use strict';
const metricLabels={mcq:'Topic MCQs',mock:'Mock questions',pyq:'PYQ / reported practice',imported:'Imported practice',embedded:'Embedded questions'};
let metricsPromise,resourceCatalog={};
function getResourceMeta(p,heading='',slots=null){return heading?resourceMeta(p,heading,slots??resourceCatalog[p]?.slots??null):(resourceCatalog[p]||resourceMeta(p,'',slots))}
function knownTitle(p){return getResourceMeta(p).title}
function linkTitle(target,href,original){try{const hash=new URL(href).hash;if(hash){const label=cleanTitle(original),section=resourceCatalog[target]?.anchors?.[decodeURIComponent(hash.slice(1))];return /^(?:open|read|view|click|go to)(?:\s|$)|^(?:theory|MCQs?|notes|revision|details|source|here)$/i.test(label)?cleanTitle(section)||knownTitle(target):label||knownTitle(target)}}catch{}return knownTitle(target)}
function getMetrics(){if(!metricsPromise)metricsPromise=fetch('./study-metrics.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Inventory is unavailable');return r.json()}).then(data=>{resourceCatalog=data.resources||{};studyInventory=data;return data}).catch(()=>null);return metricsPromise}
function displayTitle(s){return String(s||'').replace(/[*_\x60]/g,'').trim()}
function studyLink(label,p){const a=node('a',label);a.href=route(p);return a}
function metricCard(label,value){const c=node('div',undefined,'metric-tile');c.append(node('span',label),node('strong',Number(value||0).toLocaleString('en-IN')));return c}
function mountStudyHistory(){
 const host=$('metrics-personal');if(!host)return;
 const title=node('div',undefined,'history-heading'),copy=node('div');copy.append(node('p','YOUR PERSONAL ACTIVITY','kicker'),node('h2','Questions solved'),node('p','Track your practice by calendar day, week and month.','muted'));
 const yearLabel=node('label','History year'),year=node('select');year.id='study-history-year';yearLabel.htmlFor=year.id;yearLabel.append(year);title.append(copy,yearLabel);
 const periods=node('div',undefined,'history-periods'),history=node('div',undefined,'history-months');history.id='study-month-history';history.setAttribute('aria-label','Monthly study history');const legend=node('p','Solved = questions answered in practice or submitted tests. Marked done = additional self-reported questions. Repeated answers to the same question in one bank on the same day count once.','muted history-note');
 const limits=node('p','Only saved browser history is shown. Older daily records removed by previous versions cannot be recovered. Future months are shown as a dash.','muted history-note');
 host.replaceChildren(title,periods,node('h3','Month-by-month history'),history,legend,limits);
 let selected=localDay().slice(0,4);
 const fmt=n=>n.toLocaleString('en-IN');
 function render(){
  const data=calendarStudyStats(loadRoutine(),currentStudyMarks()),now=data.today.slice(0,4);
  const years=[...new Set([String(Number(now)+1),now,String(Number(now)-1),String(Number(now)-2),String(Number(now)-3),...Object.keys(data.months).map(m=>m.slice(0,4))])].sort().reverse();
  if(!years.includes(selected))selected=now;
  if([...year.options].map(o=>o.value).join()!==years.join()){year.replaceChildren();for(const y of years){const o=node('option',y);o.value=y;year.append(o)}}
  year.value=selected;
  periods.replaceChildren();
  for(const [key,label,value,range] of [['today','Today',data.daily,data.today],['week','This week',data.weekly,data.monday+' to '+data.today],['month','This month',data.monthly,data.today.slice(0,7)]]){
   const card=node('div',undefined,'history-period');card.dataset.period=key;
   card.append(node('span',label),node('strong',fmt(value.answered),'history-solved'),node('small','solved MCQs'),node('small',fmt(value.total)+' studied incl. '+fmt(value.extra)+' marked done'),node('small',range,'history-range'));periods.append(card);
  }
  history.replaceChildren();
  const max=Math.max(1,...Object.entries(data.months).filter(([m])=>m.startsWith(selected+'-')).map(([,v])=>v.answered));
  for(let i=1;i<=12;i++){
   const key=selected+'-'+String(i).padStart(2,'0'),stats=data.months[key],future=key>data.today.slice(0,7),row=node('div',undefined,'history-month');row.dataset.month=key;
   const name=new Date(Number(selected),i-1,1).toLocaleDateString('en-IN',{month:'short'});
   const label=node('span',name,'history-month-name'),bar=node('div',undefined,'history-month-bar'),fill=node('span');bar.setAttribute('aria-hidden','true');fill.style.width=((stats?.answered||0)*100/max)+'%';bar.append(fill);
   const value=node('strong',future?'—':fmt(stats?.answered||0),'history-month-solved');
   const detail=node('small',future?'Upcoming':stats?fmt(stats.activeDays)+(stats.activeDays===1?' active day · ':' active days · ')+fmt(stats.total)+' studied':'No saved activity','history-month-detail');
   if(key===data.today.slice(0,7))row.dataset.current='true';
   row.append(label,bar,value,detail);history.append(row);
  }
 }
 year.onchange=()=>{selected=year.value;render()};
 liveProgressRefresh(render,host);
 window.addEventListener('storage',e=>{if(e.key===routineKey||e.key===completionKey||e.key===null)render()});
 window.addEventListener('focus',render);
}
async function showMetrics(){
 $('home').hidden=true;$('reader').hidden=true;$('metrics').hidden=false;document.title='Study metrics | Nursing Study Hub';mountStudyHistory();
 const data=await getMetrics();if(!data){$('metrics-status').textContent='Question counts could not load. Your study progress is safe.';const retry=node('button','Try again');retry.type='button';retry.onclick=()=>location.reload();$('metrics-status').after(retry);return}
 progressCatalog=completionRecords(data);const requested=params.get('chapter'),select=$('metrics-chapter'),category=$('metrics-category'),search=$('metrics-search'),grid=$('metrics-totals'),list=$('metrics-list');
 for(const c of data.chapters){const o=node('option',c.name);o.value=c.id;select.append(o)}if(data.chapters.some(c=>c.id===requested))select.value=requested;
 $('metrics-status').textContent='Counts updated · '+new Date(data.generatedAt).toLocaleDateString('en-IN',{dateStyle:'medium'})+' · '+data.sourceCommit.slice(0,8);
 $('metrics-method').textContent=data.method;
 const opened=new Set();
 function draw(){
  const chapters=select.value?data.chapters.filter(c=>c.id===select.value):data.chapters,k=category.value,q=search.value.trim().toLowerCase();grid.replaceChildren();list.replaceChildren();let visible=0;
  const theory=chapters.flatMap(c=>theoryRecords(data,'Chapters/'+c.id+'/README.md')),theoryTile=metricCard('Theory topics',theory.length);theoryTile.dataset.category='theory';theoryTile.append(node('small','Published notes · one document per count','theory-count-note'));const theoryDone=node('small',undefined,'theory-metric-completed');theoryTile.append(theoryDone);grid.append(theoryTile);liveProgressRefresh(()=>{const ids=new Set(theory.map(r=>r.path)),s=completionSummary(progressCatalog.filter(r=>r.kind==='theory'&&ids.has(r.path)),loadCompletion(),loadRoutine());theoryDone.textContent=s.done+' completed · '+s.percent+'%'},theoryTile);
  const totals={};for(const key of Object.keys(metricLabels)){totals[key]=chapters.reduce((sum,c)=>sum+(c.totals[key]||0),0);const mock=key==='mock'?mockSummary(data,chapters.flatMap(c=>c.records)):null;const tile=metricCard(mock?'Mock tests':metricLabels[key],mock?mock.tests:totals[key]);if(mock){tile.append(node('small',countPhrase(mock.questions,'question'),'mock-question-total'));if(mock.drafts)tile.append(node('small',countPhrase(mock.drafts,'unfinished mock section')+' · '+countPhrase(mock.draftQuestions,'question'),'mock-draft-total'));if(mock.otherQuestions)tile.append(node('small',countPhrase(mock.otherQuestions,'other mock question')))}grid.append(tile)}
  for(const c of chapters){
   const topics=theoryRecords(data,'Chapters/'+c.id+'/README.md'),questionPaths=new Set(c.records.map(f=>f.path)),available=k==='theory'?topics:k?c.records:[...c.records,...topics.filter(t=>!questionPaths.has(t.path))];const matches=available.filter(f=>(!k||f.category===k)&&(!q||(f.title+' '+f.path+' '+c.name).toLowerCase().includes(q)));
   if((q||k)&&!matches.length&&!(k==='theory'&&select.value===c.id&&!q))continue;visible+=matches.length;
   const card=node('details',undefined,'metric-chapter'),summary=node('summary'),title=node('span',c.name,'metric-chapter-title'),chips=node('span',undefined,'metric-chips');
   const mock=mockSummary(data,c.records);chips.append(theoryProgressTag(data,'Chapters/'+c.id+'/README.md'),studyTag(countPhrase(c.totals.mcq,'MCQ','MCQs'),'mcq'),studyTag(mockCountText(mock),'mock'),studyTag(countPhrase(c.totals.pyq,'PYQ question'),'pyq'));if(mock.drafts)chips.append(studyTag(countPhrase(mock.drafts,'unfinished mock section'),'draft'));
   summary.append(title,chips);card.append(summary);card.open=!!select.value||!!q||opened.has(c.id);
   const tools=node('div',undefined,'metric-chapter-tools');const progressLink=node('a','My chapter progress →');progressLink.href='./?progress=1&chapter='+encodeURIComponent(c.id);tools.append(studyLink('Open chapter →','Chapters/'+c.id+'/README.md'),progressLink,node('span',countPhrase(c.evidenceFiles,'exam note or source list','exam notes and source lists')));card.append(tools);
   const rows=node('div',undefined,'metric-records');card.append(rows);function populate(){if(rows.children.length)return;for(const f of matches){
    const row=node('a',undefined,'metric-record'),left=node('div',undefined,'metric-record-copy');
    row.href=route(f.path);row.dataset.category=f.category;
    const glyph=node('span',({theory:'▱',mcq:'▤',mock:'◷',pyq:'◴',imported:'↓',embedded:'▧'}[f.category]||'▤'),'metric-record-icon');glyph.setAttribute('aria-hidden','true');
    const type=resourceTypeTag(f.path);type.dataset.role='type';left.append(node('span',knownTitle(f.path),'metric-record-title'),type);const personal=studyLabel(f.path);if(personal)left.append(personal);
    const count=node('div',undefined,'metric-record-count');if(f.category==='theory')count.append(node('strong','1'),node('span','topic'));else count.append(node('strong',f.slots.toLocaleString('en-IN')),node('span',f.slots===1?'question':'questions'));
    const arrow=node('span','›','metric-record-arrow');arrow.setAttribute('aria-hidden','true');
    row.append(glyph,left,count,arrow);rows.append(resourceCardWithProgress(row,f.path,{count:false}))
   }if(!matches.length)rows.append(node('p',k==='theory'?'No published theory notes yet. Coverage maps and research indexes are not counted as theory.':'No study topics found in this category.','muted'))}if(card.open)populate();card.ontoggle=()=>{if(card.open){opened.add(c.id);populate()}else opened.delete(c.id)};list.append(card);
  }
  if(!list.children.length)list.append(node('p','No matching topics. Try another search or clear the filters.','empty-state'));$('metrics-match-count').textContent=countPhrase(visible,'matching study item');$('clear-metrics').hidden=!select.value&&!category.value&&!q;
 }
 select.onchange=()=>{const u=new URL(location.href);if(select.value)u.searchParams.set('chapter',select.value);else u.searchParams.delete('chapter');history.replaceState(history.state,'',u.href);draw()};category.onchange=draw;search.oninput=draw;$('clear-metrics').onclick=()=>{select.value='';category.value='';search.value='';opened.clear();select.onchange();search.focus()};draw();
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
  seen.add(a.href);if(!groups.has(label))groups.set(label,[]);groups.get(label).push({text:linkTitle(target,a.href,a.textContent.trim()),href:a.href,path:target});
 }
 if(!groups.size)return;
 const panel=node('section',undefined,'compact-index'),hint=node('p','Choose a topic to study. Mark it done when you finish.','muted');panel.append(hint);
 const filter=node('input');filter.type='search';filter.placeholder='Find a topic or study resource…';filter.setAttribute('aria-label','Find a topic in this index');panel.append(filter);const groupList=node('div',undefined,'index-resource-groups');panel.append(groupList);
 function draw(){groupList.replaceChildren();const query=filter.value.trim().toLowerCase();for(const [label,links] of groups){const matches=links.filter(l=>!query||(l.text+' '+label).toLowerCase().includes(query));if(!matches.length)continue;const section=node('details',undefined,'index-resource-group');section.open=!!query||groups.size<=2||!groupList.children.length;const summary=node('summary');summary.append(node('strong',label));if(label==='Theory'){const unique=new Set(matches.map(l=>l.path).filter(path=>getResourceMeta(path).type==='Theory'&&!getResourceMeta(path).draft));summary.append(node('span',theoryCountText(unique.size)+' linked here'))}else summary.append(node('span',countPhrase(matches.length,'study item')));section.append(summary);const list=node('div',undefined,'index-link-list');for(const l of matches){const a=node('a',l.text);a.href=l.href;list.append(resourceCardWithProgress(a,l.path))}section.append(list);groupList.append(section)}if(!groupList.children.length)groupList.append(node('p','No matching resources.','muted'))}
 filter.oninput=draw;draw();
 const original=node('details',undefined,'original-index');original.id='original-index';original.append(node('summary','Full original index and study notes'));const nodes=[...content.childNodes];for(const n of nodes)if(n!==title)original.append(n);content.append(panel,original);
}
function openAnchor(hash){
 if(!hash)return;
 const content=$('content'),target=studyFragmentTarget(content,hash);if(!target)return;
 for(let n=target.parentElement;n&&n!==content;n=n.parentElement)if(n.tagName==='DETAILS')n.open=true;
 requestAnimationFrame(()=>scrollStudyFragment(content,hash));
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
 const groups=[[],[],[]],list=links[0].closest('.tracked-resource-card')?.parentElement||links[0].parentElement;
 for(const link of links){
  link.querySelector('.file-count')?.remove();link.querySelector('.resource-question-count')?.remove();
  const target=new URL(link.href).searchParams.get('doc'),f=byPath.get(target),card=link.closest('.tracked-resource-card')||link;
  if(f){link.append(node('span',f.slots+' questions','file-count'));groups[0].push(card)}
  else if(pyq&&target?.endsWith('.md')){link.append(node('span',evidence.has(target)?'Exam notes and sources':'Question count unavailable','file-count evidence-file'));groups[evidence.has(target)?1:2].push(card)}
  else {addInventoryCount(link,target);groups[2].push(card)}
 }
 if(pyq){list.replaceChildren();for(const [i,title] of ['Question banks','Research and evidence notes','Other resources'].entries()){if(!groups[i].length)continue;list.append(node('h2',title,'pyq-directory-heading'),...groups[i])}}
}
