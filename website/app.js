'use strict';
const repo='priyankaverma12-RN12/aiims-norcet-staff-nurse-resources',raw='https://raw.githubusercontent.com/'+repo+'/main/',git='https://github.com/'+repo+'/blob/main/',index='Chapters/NORCET-Full-Chapter-Index.md';
const $=id=>document.getElementById(id), params=new URLSearchParams(location.search), path=params.get('doc');
function safe(p){return typeof p==='string'&&p.startsWith('Chapters/')&&!/[?#%\\\u0000-\u001f]/.test(p)&&!p.split('/').some(x=>x==='..'||x==='.')}
function route(p,hash=''){return '?doc='+encodeURIComponent(p)+hash;}
async function read(p){const res=await fetch(raw+encodeRepoPath(p),{cache:'no-cache'});if(!res.ok)throw Error('Source unavailable ('+res.status+')');return res.text();}
function storage(key,value){try{if(value!==undefined)localStorage.setItem(key,value);return localStorage.getItem(key)}catch{return null}}

function node(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n}
function getList(key){try{const v=JSON.parse(storage(key)||'[]');return Array.isArray(v)?v:[]}catch{return []}}
function pretty(s){return s.replace(/\.md$/i,'').replace(/-/g,' ')}
function getMarks(){return getList('nursing-marks-v1').filter(m=>m&&typeof m.path==='string'&&safe(m.path)&&typeof m.stem==='string')}
function getRecent(){return getList('nursing-recent-v1').filter(m=>m&&typeof m.path==='string'&&safe(m.path)).slice(0,6)}
function remember(p){storage('nursing-last',p);storage('nursing-recent-v1',JSON.stringify([{path:p},...getRecent().filter(m=>m.path!==p)].slice(0,6)))}
function themeUI(t){document.documentElement.dataset.theme=t;$('theme').textContent=t==='dark'?'☀ Light':'◐ Dark';$('theme').setAttribute('aria-label',t==='dark'?'Switch to light theme':'Switch to dark theme')}
themeUI(storage('nursing-theme')==='dark'||(!storage('nursing-theme')&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');
$('theme').onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';themeUI(t);storage('nursing-theme',t)};
function updateNavigation(){
 const active=params.get('progress')==='1'?'progress-link':params.get('metrics')==='1'?'metrics-link':path||location.hash==='#library'?'library-link':location.hash==='#bookmarks'?'saved-link':'home-link';
 for(const a of document.querySelectorAll('.topbar nav a')){if(a.id===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')}
}
updateNavigation();addEventListener('hashchange',updateNavigation);
function initReadingTools(){
 const focus=$('focus-study'),size=$('reading-size'),body=document.body;
 const apply=value=>{body.classList.toggle('focus-study',value);focus.setAttribute('aria-pressed',String(value));focus.textContent=value?'Exit focus mode':'Focus mode';focus.setAttribute('aria-label',focus.textContent);focus.title=focus.textContent};
 apply(false);focus.onclick=()=>apply(focus.getAttribute('aria-pressed')!=='true');
 const saved=storage('nursing-reading-size');size.value=['normal','large','extra'].includes(saved)?saved:'normal';
 const resize=()=>{body.dataset.readingSize=size.value;storage('nursing-reading-size',size.value)};resize();size.onchange=resize;
 addEventListener('keydown',e=>{if(e.key==='Escape'&&body.classList.contains('focus-study')){apply(false);focus.focus()}});
}
initReadingTools();
window.addEventListener('storage',e=>{if(e.key===completionKey||e.key===routineKey||e.key===null)document.dispatchEvent(new CustomEvent('study-progress-change'));if(e.key==='nursing-marks-v1'||e.key===null){if(!$('home').hidden)drawMarks();document.dispatchEvent(new CustomEvent('study-bookmarks-change'))}if(e.key==='nursing-theme'&&['light','dark'].includes(e.newValue))themeUI(e.newValue)});
window.addEventListener('pageshow',e=>{if(e.persisted){document.dispatchEvent(new CustomEvent('study-progress-change'));if(!$('home').hidden)drawMarks();document.dispatchEvent(new CustomEvent('study-bookmarks-change'))}});
const last=storage('nursing-last');if(last&&safe(last)){$('resume').href=route(last);$('resume').hidden=false}
function drawMarks(){const box=$('marks'),marks=getMarks(),search=$('saved-search'),q=search.value.trim().toLowerCase(),matches=marks.filter(m=>(m.stem+' '+knownTitle(m.path)).toLowerCase().includes(q));$('mark-total').textContent=marks.length;$('saved-tools').hidden=!marks.length;$('saved-count').textContent=matches.length+' of '+marks.length+' saved questions';box.replaceChildren();if(!matches.length){box.append(node('div',marks.length?'No saved questions match your search.':'No bookmarks yet. Save important questions during practice.','empty-state'));return}for(const m of matches){const row=node('div',undefined,'mark-row'),wrap=node('div',undefined,'saved-question-copy'),a=node('a',m.stem),b=node('button','Remove');a.href=route(m.path)+'&question='+encodeURIComponent(m.stem);const practice=node('a','Practise saved question →','saved-practice-link');practice.href=a.href+'&session=saved';wrap.append(node('small',knownTitle(m.path),'muted'),a,practice);b.type='button';b.setAttribute('aria-label','Remove saved question: '+m.stem);b.onclick=()=>{try{localStorage.setItem('nursing-marks-v1',JSON.stringify(marks.filter(x=>x.path!==m.path||x.stem!==m.stem)));drawMarks()}catch{b.textContent='Could not save'}};row.append(wrap,b);box.append(row)}}
$('saved-search').oninput=drawMarks;
function mountResponsiveDisclosures(){
 const narrow=matchMedia('(max-width:600px)'),more=$('nav-more'),overview=$('library-overview');
 const adapt=()=>{if(more)more.open=false;if(overview)overview.open=false};
 adapt();narrow.addEventListener('change',adapt);
 if(more){
  more.addEventListener('click',e=>{if(e.target.closest('a'))more.open=false});
  document.addEventListener('pointerdown',e=>{if(more.open&&!more.contains(e.target))more.open=false});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&more.open){more.open=false;more.querySelector('summary').focus()}});
 }
}
// Presentation-only disclosures preserve keyboard access and nested state.
function mountCompactPanels(){
 const mobile=matchMedia('(max-width:600px)'),searchButton=$('library-search-toggle'),libraryButton=$('library-panel-toggle'),filters=$('library-filters'),results=$('library-results');
 function setPanel(button,region,open,show,hide){region.hidden=!open;button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?hide:show)}
 function setSearch(open,focus=false){setPanel(searchButton,filters,open,'Show chapter search and filters','Hide chapter search and filters');if(open){setLibrary(true);if(focus)$('search').focus()}}
 function setLibrary(open){setPanel(libraryButton,results,open,'Expand chapter library','Collapse chapter library');if(!open)setPanel(searchButton,filters,false,'Show chapter search and filters','Hide chapter search and filters')}
 function revealAnchor(){if(location.hash==='#bookmarks')$('saved-panel').open=true;if(location.hash==='#daily-study')$('daily-panel').open=true;if(location.hash==='#library')setLibrary(true)}
 if(mobile.matches){setSearch(false);for(const el of document.querySelectorAll('.mobile-optional'))el.open=false}
 searchButton.addEventListener('click',()=>setSearch(filters.hidden,true));
 libraryButton.addEventListener('click',()=>setLibrary(results.hidden));
 filters.addEventListener('keydown',e=>{if(e.key==='Escape'){setSearch(false);searchButton.focus()}});
 addEventListener('hashchange',revealAnchor);document.addEventListener('click',e=>{const a=e.target.closest('a[href="#bookmarks"],a[href="#daily-study"],a[href="#library"]');if(a){if(a.hash==='#bookmarks')$('saved-panel').open=true;if(a.hash==='#daily-study')$('daily-panel').open=true;if(a.hash==='#library')setLibrary(true)}});
 revealAnchor();
}
// Keep progress filters out of the mobile reading flow until requested.
function mountProgressFilterIcon(){
 const mobile=matchMedia('(max-width:600px)'),button=$('progress-filter-toggle'),panel=$('progress-filter-panel');
 if(!button||!panel)return;
 const sync=()=>{button.setAttribute('aria-expanded',String(panel.open));button.setAttribute('aria-label',panel.open?'Hide progress filters':'Show progress filters')};
 const adapt=()=>{panel.open=!mobile.matches;sync()};
 adapt();mobile.addEventListener('change',adapt);panel.addEventListener('toggle',sync);
 button.addEventListener('click',()=>{panel.open=!panel.open;sync()});
 panel.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobile.matches&&panel.open){e.preventDefault();panel.open=false;sync();button.focus()}});
 $('progress-page').addEventListener('click',e=>{if(e.target.closest('#clear-progress')&&mobile.matches&&!panel.open)button.focus()});
}
// The Metrics filter uses the same icon interaction as Progress at every width.
function mountMetricsFilterIcon(){
 const button=$('metrics-filter-toggle'),panel=$('metrics-filter-panel');if(!button||!panel)return;
 const sync=()=>{button.setAttribute('aria-expanded',String(panel.open));button.setAttribute('aria-label',panel.open?'Hide resource filters':'Show resource filters')};
 const set=open=>{panel.open=open;sync()};set(false);
 button.addEventListener('click',()=>set(!panel.open));panel.addEventListener('toggle',sync);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.open&&!$('metrics').hidden){e.preventDefault();set(false);button.focus()}});
 window.addEventListener('pageshow',e=>{if(e.persisted)set(false)});
}
 // Mobile reader chrome: move the existing controls, never clone stateful inputs.
function mountMobileReader(){
 if(!path)return;
 const mobile=matchMedia('(max-width:600px)'),head=document.querySelector('.reader-head'),aside=$('reader-aside'),sections=$('reader-sections-panel'),outline=aside.querySelector('.outline-card'),tools=$('reading-tools-panel'),focus=$('focus-study'),locationBar=document.querySelector('.reading-location'),toolbar=document.querySelector('#reader > .toolbar');
 outline.id='reader-outline-panel';
 const controls=node('div',undefined,'mobile-reader-controls');controls.setAttribute('role','group');controls.setAttribute('aria-label','Reader controls');head.insertBefore(controls,$('reader-title'));
 const panels=[sections,outline,tools],icons=['M3 5h18v14H3zM3 10h18M10 10v9','M4 6h2m3 0h11M4 12h2m3 0h11M4 18h2m3 0h11','M4 6h16M7 12h10M10 18h4'],names=['Chapter sections','On this page','Reading tools'];
 const buttons=panels.map((panel,i)=>{
  const b=node('button',undefined,'panel-icon reader-panel-toggle');b.type='button';b.id='reader-panel-toggle-'+i;b.setAttribute('aria-controls',panel.id);b.title=names[i];
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg'),line=document.createElementNS(svg.namespaceURI,'path');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','2');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');line.setAttribute('d',icons[i]);svg.append(line);b.append(svg);controls.append(b);return b;
 });
 const originals=new Map();for(const n of [focus,locationBar,toolbar,outline,tools]){const marker=document.createComment('desktop reader position');n.before(marker);originals.set(n,marker)}
 const sync=()=>panels.forEach((p,i)=>{buttons[i].setAttribute('aria-expanded',String(p.open));buttons[i].setAttribute('aria-label',(p.open?'Hide ':'Show ')+names[i].toLowerCase())});
 const close=()=>{panels.forEach(p=>p.open=false);sync()};
 function adapt(){
  if(mobile.matches){
   controls.prepend(focus);focus.classList.add('panel-icon');head.append(outline,tools);sections.querySelector('.study-panel-body').prepend(toolbar,locationBar);close();
  }else{
   for(const [n,marker] of originals)marker.after(n);
   focus.classList.remove('panel-icon');sections.open=true;tools.open=true;outline.open=false;sync();
  }
 }
 buttons.forEach((b,i)=>{b.addEventListener('click',()=>{const open=!panels[i].open;close();panels[i].open=open;sync()});panels[i].addEventListener('toggle',sync)});
 focus.addEventListener('click',()=>{if(mobile.matches)close()});
 document.addEventListener('pointerdown',e=>{if(mobile.matches&&!controls.contains(e.target)&&!panels.some(p=>p.contains(e.target)))close()});
 document.addEventListener('keydown',e=>{if(e.key!=='Escape'||!mobile.matches)return;const i=panels.findIndex(p=>p.open);if(i!==-1){close();buttons[i].focus()}});
 mobile.addEventListener('change',adapt);adapt();
 window.addEventListener('pageshow',e=>{if(e.persisted&&mobile.matches)close()});
}
// Collapse only the original pre-question material, retaining its exact nodes and anchors.
function compactMobileBank(content,p){
 if(!/\/(MCQs|Mock-Tests)\//.test(p)||!document.querySelector('.quiz-panel[data-scoreable=true]'))return;
 const first=[...content.children].find(e=>/^H[2-6]$/.test(e.tagName)&&/^(?:Q(?:uestion)?\s*)?\d+[.):]\s+/i.test(e.textContent.trim()));
 if(!first)return;
 const prefix=[...content.children].slice(0,[...content.children].indexOf(first));if(!prefix.length)return;
 const mobile=matchMedia('(max-width:600px)'),details=node('details',undefined,'mobile-bank-context');details.append(node('summary','Source notes, videos and topic context'));
 function adapt(){if(mobile.matches){first.before(details);details.append(...prefix);details.open=false;content.classList.add('compact-mobile-bank')}else{for(const n of prefix)first.before(n);details.remove();content.classList.remove('compact-mobile-bank')}}
 mobile.addEventListener('change',adapt);adapt();
}
function mountPageWelcome(){
 const header=document.querySelector('.topbar'),locationBar=$('reading-position')?.closest('.reading-location');
 const measure=()=>{document.documentElement.style.setProperty('--header-offset',Math.ceil(header?.getBoundingClientRect().height||0)+'px');document.documentElement.style.setProperty('--location-offset',Math.ceil(locationBar?.closest('.reader-head')?0:(locationBar?.getBoundingClientRect().height||0))+'px')};
 measure();if(typeof ResizeObserver!=='undefined'){const observer=new ResizeObserver(measure);if(header)observer.observe(header);if(locationBar)observer.observe(locationBar)}
 function welcome(){const now=new Date(),hour=now.getHours(),greeting=hour<12?'Good morning':hour<17?'Good afternoon':'Good evening';const date=now.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});if($('welcome-greeting'))$('welcome-greeting').textContent=greeting+'! Ready to learn?';if($('welcome-date')){$('welcome-date').textContent=date;$('welcome-date').dateTime=localDay(now)}}
 welcome();window.addEventListener('focus',welcome);document.addEventListener('visibilitychange',()=>{if(!document.hidden)welcome()});
}
function drawRecent(){const box=$('recent'),recent=getRecent();$('recent-total').textContent=recent.length;box.replaceChildren();if(!recent.length){box.append(node('div','Your recently opened study resources will appear here. Start by exploring a chapter.','empty-state'));return}for(const m of recent.slice(0,3)){const parts=m.path.split('/').filter(Boolean),a=node('a',undefined,'recent-card');a.href=route(m.path);a.append(node('small',pretty(parts[1]||'Library'),'recent-chapter'),node('strong',knownTitle(m.path),'recent-title'));const personal=studyLabel(m.path);if(personal&&!progressCatalog?.some(r=>r.path===m.path))a.append(personal);const card=resourceCardWithProgress(a,m.path);card.classList.add('recent-entry');a.append(node('span','Resume study →','recent-continue'));box.append(card)}}
// Keep the curated ordering; surface every additional published chapter by its original ID.
function completeLibrary(md,metrics){
 const chapters=parseLibrary(md),seen=new Set(chapters.map(c=>c.id));
 const neuroGroup=chapters.find(c=>c.id==='Neurological-System')?.group||'Other study areas';
 for(const c of metrics?.chapters||[]){
  if(!/^[A-Za-z0-9-]+$/.test(c.id)||seen.has(c.id))continue;
  chapters.push({id:c.id,name:c.id==='Nervous-System'?'Nervous System (legacy)':c.name||pretty(c.id),group:c.id==='Nervous-System'?neuroGroup:'Additional study resources'});
  seen.add(c.id);
 }
 return chapters;
}
function parseLibrary(md){const out=[],seen=new Set();let group='Other study areas';for(const line of md.split('\n')){const heading=line.match(/^## Workstream\s+\d+\s+[—–-]\s+(.+)$/);if(heading){group=heading[1].trim();continue}const m=line.match(/^\| \[([^\]]+)\]\(([A-Za-z0-9-]+)\/README\.md\)/);if(m&&!seen.has(m[2])){seen.add(m[2]);out.push({id:m[2],name:m[1],group})}}return out}
const groupIcons=['✚','♡','⚕','✳','♧','◎','◇','▤'];
const sectionLinks=[['Overview','README.md'],['Theory','Concepts/'],['MCQs','MCQs/'],['Mock tests','Mock-Tests/'],['PYQs','Previous-Year-Questions/'],['Revision','Revision/']];
function availableSections(catalog,id){return sectionLinks.filter(([label,folder])=>!catalog||!folder.endsWith('/')||Object.hasOwn(catalog.directories||{},'Chapters/'+id+'/'+folder.slice(0,-1)))}
async function home(){drawMarks();const [md,catalog,metrics]=await Promise.all([read(index),getCatalog(),getMetrics()]);progressCatalog=completionRecords(metrics);drawRecent();drawRoutine(metrics);drawMarks();if(metrics){$('mcq-total').textContent=metrics.totals.mcq.toLocaleString('en-IN');const mock=mockSummary(metrics,metrics.chapters.flatMap(c=>c.records));$('mock-total').textContent=mock.tests.toLocaleString('en-IN');$('mock-total-questions').textContent=countPhrase(mock.questions,'question')}document.addEventListener('study-progress-change',()=>drawRoutine(metrics));document.addEventListener('visibilitychange',()=>{if(!document.hidden)drawRoutine(metrics)});const chapters=completeLibrary(md,metrics),groups=[...new Set(chapters.map(c=>c.group))];$('chapter-total').textContent=chapters.length;const theory=theoryRecords(metrics);$('theory-total').textContent=metrics?theory.length.toLocaleString('en-IN'):'—';const theoryDone=$('theory-done');liveProgressRefresh(()=>{const s=completionSummary((progressCatalog||[]).filter(r=>r.kind==='theory'),loadCompletion(),loadRoutine());theoryDone.textContent=s.done+' completed'},theoryDone);$('group-total').textContent=groups.length;for(const g of groups){const o=node('option',g);o.value=g;$('group-filter').append(o)}
 const groupStates=new Map(),cardStates=new Map();
 function draw(){const q=$('search').value.trim().toLowerCase(),g=$('group-filter').value;const filtered=chapters.filter(c=>(!g||c.group===g)&&(c.id+' '+c.name+' '+c.group).toLowerCase().includes(q));$('chapters').replaceChildren();$('count').textContent=filtered.length+' of '+chapters.length+' chapters';$('clear-library').hidden=!q&&!g;if(!filtered.length){$('chapters').append(node('div','No matching chapters. Try a different search or study area.','empty-state'));return}
 for(const group of groups){const list=filtered.filter(c=>c.group===group);if(!list.length)continue;const area=node('details',undefined,'chapter-group study-panel study-area-panel'),h=node('summary');area.open=Boolean(q||g)||(groupStates.get(group)??true);area.addEventListener('toggle',()=>{if(!q&&!g)groupStates.set(group,area.open)});h.append(node('span',String(groups.indexOf(group)+1).padStart(2,'0'),'group-number'),node('span',group),node('span',list.length+' chapters','group-count'));area.append(h);const grid=node('div',undefined,'chapter-grid');for(const c of list){const card=node('div',undefined,'chapter-card'),a=node('a',undefined,'chapter');a.href=route('Chapters/'+c.id+'/README.md');const icon=node('span',groupIcons[groups.indexOf(group)%groupIcons.length],'chapter-icon');icon.setAttribute('aria-hidden','true');const title=node('div');title.append(node('strong',c.name));if(c.id==='Nervous-System')title.append(node('small','Separate legacy study resources','chapter-legacy-note'));addInventoryCount(title,'Chapters/'+c.id+'/README.md');a.append(icon,title,node('span','↗','chapter-arrow'));const links=node('div',undefined,'chapter-links');for(const [label,folder] of availableSections(catalog,c.id).slice(1)){const l=node('a',label);l.href=route('Chapters/'+c.id+'/'+folder);l.setAttribute('aria-label',c.name+' '+label);l.dataset.studySection=folder.split('/')[0];addInventoryCount(l,'Chapters/'+c.id+'/'+folder);links.append(l)}const extras=node('details',undefined,'chapter-card-details study-panel');extras.open=Boolean(q||g)||(cardStates.get(c.id)??!matchMedia('(max-width:600px)').matches);extras.addEventListener('toggle',()=>{if(!q&&!g)cardStates.set(c.id,extras.open)});const extraSummary=node('summary','Study resources');extraSummary.setAttribute('aria-label','Study resources for '+c.name);extras.append(extraSummary,links);const tracker=chapterCardProgress(c.id);if(tracker)extras.append(tracker);card.append(a,extras);grid.append(card)}area.append(grid);$('chapters').append(area)}}
 $('search').oninput=draw;$('group-filter').onchange=draw;$('clear-library').onclick=()=>{$('search').value='';$('group-filter').value='';draw();$('search').focus()};draw()}
// Style explicit difficulty metadata only; preserve clinical content and question identity.
function decorateQuestionDifficulty(target){
 for(const p of target.querySelectorAll('p')){
  if(p.closest('details,.explanation-body,pre,code')||!/^Difficulty\s*:/i.test(p.textContent.trim()))continue;
  const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT);
  let text;
  while((text=walker.nextNode())){
   if(text.parentElement.closest('a,code,.difficulty-label'))continue;
   const match=/(?:[🟢🟡🔴]\s*)?\b(Easy|Medium|Difficult|Hard)\b/iu.exec(text.nodeValue);
   if(!match)continue;
   const level=match[1].toLowerCase(),badge=node('span',undefined,'difficulty-label');
   badge.dataset.level=level==='hard'?'difficult':level;
   const icon=node('span',undefined,'difficulty-icon');icon.setAttribute('aria-hidden','true');
   for(let i=0;i<3;i++)icon.append(node('i'));
   badge.append(icon,document.createTextNode(match[1]));
   text.replaceWith(document.createTextNode(text.nodeValue.slice(0,match.index)),badge,document.createTextNode(text.nodeValue.slice(match.index+match[0].length)));break;
  }
 }
}
function renderQuiz(target,md,p){
 target.innerHTML=DOMPurify.sanitize(marked.parse(md,{gfm:true}),{ADD_TAGS:['details','summary'],FORBID_TAGS:['style','iframe','form'],FORBID_ATTR:['style','srcset']});
 for(const a of target.querySelectorAll('a[href]')){const href=a.getAttribute('href');if(href.startsWith('#'))continue;const r=resolveResource(href,p);if(!r){a.removeAttribute('href');continue}if(!r.external){const t=r.path;const destination=studyDocumentPath(r);if(destination&&safe(destination))a.href=route(destination,r.hash);else a.href=sourceLink(t)+r.hash}else{a.href=r.url;a.target='_blank';a.rel='noopener noreferrer'}}
 decorateQuestionDifficulty(target);decorateImages(target,p);decorateDiagrams(target,p);
}
function makeBreadcrumb(p){
 const parts=p.split('/').filter(Boolean),nav=$('breadcrumbs');nav.replaceChildren();const list=node('ol');nav.append(list);
 function crumb(label,url){const li=node('li');if(url){const a=node('a',label);a.href=url;li.append(a)}else{const current=node('span',label);current.setAttribute('aria-current','page');li.append(current)}list.append(li)}
 crumb('Library','./#library');if(parts.length<3){crumb(pretty(parts.at(-1)),null);return}
 const chapter='Chapters/'+parts[1]+'/';const overview=parts.length===3&&parts[2]==='README.md';
 crumb(pretty(parts[1]),overview?null:route(chapter+'README.md'));
 if(!overview){for(let i=2;i<parts.length;i++){const last=i===parts.length-1;const label=last&&!p.endsWith('/')?knownTitle(p):parts[i]==='README.md'?'Overview':(sectionLinks.find(x=>x[1]===parts[i]+'/')?.[0]||pretty(parts[i]));crumb(label,last?null:route(parts.slice(0,i+1).join('/')+'/'))}}
}
function siblingNavigation(p,catalog){const parts=p.split('/');if(parts.length<4||p.endsWith('/')||!catalog)return;const parent=parts.slice(0,-1).join('/'),files=(catalog.directories?.[parent]||[]).filter(f=>f.type==='file'&&/\.md$/i.test(f.name)&&f.name!=='README.md').sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}));const i=files.findIndex(f=>f.path===p);if(i<0)return;const bar=$('sibling-nav');bar.replaceChildren();const parentLink=node('a','← Back to '+pretty(parts.at(-2)));parentLink.href=route(parent+'/');bar.append(parentLink);for(const [label,file] of [['Previous',files[i-1]],['Next',files[i+1]]])if(file){const link=node('a',label+' · '+knownTitle(file.path));link.href=route(file.path);bar.append(link)}bar.hidden=false}
function initOutline(){
 const links=[...$('outline').querySelectorAll('a[href^="#"]')];if(!links.length)return;
 const headings=links.map(a=>{try{return document.getElementById(decodeURIComponent(a.hash.slice(1)))}catch{return null}});
 let queued=false;function update(){queued=false;let active=-1;const content=$('content'),isPractice=content.hidden;const threshold=(matchMedia('(max-width:600px)').matches?document.querySelector('.topbar')?.getBoundingClientRect().bottom||0:document.querySelector('.reading-location')?.getBoundingClientRect().bottom||120)+24;if(!isPractice)for(let i=0;i<headings.length;i++)if(headings[i]&&headings[i].getClientRects().length&&headings[i].getBoundingClientRect().top<=threshold)active=i;links.forEach((a,i)=>{if(i===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});$('reading-position').textContent=isPractice?(document.querySelector('.quiz-panel')?.dataset.view==='results'?'Test results & answer review':document.querySelector('.quiz-panel')?.dataset.learning==='true'?'Learning mode':'Interactive practice'):(links[active]?.textContent||'Document introduction')}
 addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});new MutationObserver(update).observe($('content'),{attributes:true,attributeFilter:['hidden']});update();
}
async function listResources(p){
 const clean=p.replace(/\/$/,'');const catalog=await getCatalog();
 try{const res=await fetch('https://api.github.com/repos/'+repo+'/contents/'+encodeRepoPath(clean)+'?ref=main');if(res.ok){const files=await res.json();if(Array.isArray(files))return files}}catch{}
 if(catalog&&Array.isArray(catalog.directories?.[clean]))return catalog.directories[clean];
 throw Error('This resource folder is unavailable. Open its chapter overview or the original on GitHub.');
}
async function directory(p){const files=await listResources(p);const content=$('content');content.append(node('h1',knownTitle(p)));const search=node('input');search.type='search';search.placeholder='Filter resources in this folder…';search.setAttribute('aria-label','Filter resources');search.style.width='100%';content.append(search);const summary=node('p',undefined,'folder-summary muted');summary.setAttribute('role','status');content.append(summary);const list=node('div');content.append(list);const resources=files.filter(f=>f.type==='dir'||f.name.endsWith('.md')).sort((a,b)=>Number(b.type==='dir')-Number(a.type==='dir')||a.name.localeCompare(b.name,undefined,{numeric:true}));function draw(){list.replaceChildren();const matches=resources.filter(f=>(f.name+' '+knownTitle(f.path+(f.type==='dir'?'/':''))).toLowerCase().includes(search.value.trim().toLowerCase()));summary.textContent=matches.length+' of '+resources.length+' study items';for(const f of matches){const a=node('a',undefined,'file-card');a.href=route(f.path+(f.type==='dir'?'/':''));const label=node('div');const meta=getResourceMeta(f.path+(f.type==='dir'?'/':''));const tag=resourceTypeTag(f.path+(f.type==='dir'?'/':''));tag.dataset.role='type';label.append(node('strong',meta.title),tag);a.append(node('span',f.type==='dir'?'▱':'▤','file-icon'),label);list.append(resourceCardWithProgress(a,f.path+(f.type==='dir'?'/':''),{count:false}))}if(!matches.length)list.append(node('p','No matching resources.','muted'))}search.oninput=draw;draw();await enrichDirectory(p,content);search.addEventListener('input',()=>enrichDirectory(p,content))}
async function reader(p){$('home').hidden=true;$('reader').hidden=false;if(!safe(p))throw Error('Invalid chapter path');document.body.classList.add('reader-page');$('source').href=p.endsWith('/')?'https://github.com/'+repo+'/tree/main/'+p:git+p;const metrics=await getMetrics();progressCatalog=completionRecords(metrics);makeBreadcrumb(p);remember(p);const parts=p.split('/').filter(Boolean),chapter=pretty(parts[1]||'Library');$('reader-title').textContent=chapter;$('reader-context').textContent=parts.length>2?parts.slice(2).map(pretty).join(' / '):'Curriculum index';$('reader-kind').textContent=parts.length>2&&parts[2]!=='README.md'?pretty(parts[2]).toUpperCase():'CHAPTER WORKSPACE';document.title=knownTitle(p)+' | Nursing Study Hub';$('reader-title').textContent=knownTitle(p);$('reader-kind').textContent=getResourceMeta(p).type.toUpperCase();$('resource-subtitle').textContent=getResourceMeta(p).subtitle;const catalog=await getCatalog();$('chapter-metrics').href='./?metrics=1&chapter='+encodeURIComponent(parts[1]||'');$('reading-chapter').textContent=chapter;$('reading-position').textContent=parts.length>2&&parts[2]!=='README.md'?(sectionLinks.find(x=>x[1]===parts[2]+'/')?.[0]||pretty(parts[2])):'Chapter overview';if(parts.length>2){for(const [label,folder] of availableSections(catalog,parts[1])){const a=node('a',label);a.href=route('Chapters/'+parts[1]+'/'+folder);a.dataset.studySection=folder.split('/')[0];if(folder.endsWith('/')&&metrics)addInventoryCount(a,'Chapters/'+parts[1]+'/'+folder);if(p==='Chapters/'+parts[1]+'/'+folder||folder.endsWith('/')&&p.startsWith('Chapters/'+parts[1]+'/'+folder))a.setAttribute('aria-current','page');$('sections').append(a)}}$('status').textContent='Loading source…';if(p.endsWith('/')){await directory(p);$('outline').append(node('p','Browse the resource list.','muted'));mobileOutline();}else{const md=await read(p);if(!window.marked||!window.DOMPurify)throw Error('Markdown renderer unavailable. Open the original on GitHub.');const content=$('content');renderQuiz(content,md,p);const ids=new Map(),outline=$('outline');for(const h of content.querySelectorAll('h1,h2,h3,h4,h5,h6')){const label=h.textContent.trim();const base=label.toLowerCase().replace(/[^\p{L}\p{N}_ -]/gu,'').replace(/ /g,'-');const n=ids.get(base)||0;ids.set(base,n+1);h.id=base+(n?'-'+n:'');if(label.startsWith('🟢'))h.classList.add('exam-exact');if(label.startsWith('🔵'))h.classList.add('exam-reported');if(label.startsWith('🟣'))h.classList.add('exam-related');if(!h.closest('details')&&['H2','H3'].includes(h.tagName)&&!/^Q\d+[.):]/i.test(label)&&outline.children.length<160){const a=node('a',label);a.href='#'+encodeURIComponent(h.id);outline.append(a)}}const sourceHeading=content.querySelector('h1');if(sourceHeading){const actual=getResourceMeta(p,sourceHeading.textContent);if(!sourceHeading.querySelector('a'))sourceHeading.textContent=actual.title;sourceHeading.title=actual.sourceTitle;$('reader-title').textContent=actual.title;resourceCatalog[p]={...resourceCatalog[p],...actual};$('reader-kind').textContent=actual.type.toUpperCase();document.title=actual.title+' | Nursing Study Hub';$('resource-subtitle').textContent=actual.subtitle;const crumb=$('breadcrumbs').querySelector('[aria-current=page]');if(crumb&&p.split('/').length>3)crumb.textContent=actual.title;}if(!outline.children.length)outline.append(node('p','Read or practise below.','muted'));for(const d of content.querySelectorAll('details'))d.open=false;if(p.includes('/Previous-Year-Questions/'))decoratePyq(content,p);if(isIndexDocument(p)&&!parseBank(md).items.length&&!content.querySelector('.pyq-card'))compactIndex(content,p,catalog);mobileOutline();initOutline();registerLiveBank(p,md,parseBank(md).items);if(typeof mountQuiz==='function')mountQuiz(md,p,content,renderQuiz,route);compactMobileBank(content,p);const bookmarked=params.get('question');if(bookmarked&&!content.hidden){const normalize=s=>s.replace(/\s+/g,' ').trim().toLowerCase(),needle=normalize(bookmarked),target=[...content.querySelectorAll('h2,h3,h4,h5,h6,p')].find(h=>normalize(h.textContent).includes(needle));if(target){for(let n=target.parentElement;n&&n!==content;n=n.parentElement)if(n.tagName==='DETAILS')n.open=true;target.classList.add('saved-question-target');requestAnimationFrame(()=>{target.scrollIntoView({block:'center',behavior:'instant'})})}}}const kindLabel=$('reader-kind'),[kindText,kindStyle]=typeTagInfo(p);kindLabel.textContent=kindText;kindLabel.classList.add('study-tag');kindLabel.dataset.kind=kindStyle;readerCompletion(p);if(getResourceMeta(p).type==='Theory')addInventoryCount($('resource-subtitle'),p);if(p.endsWith('/')||p.endsWith('/README.md')){const title=$('resource-subtitle');addInventoryCount(title,p);const progressLink=node('a','My chapter progress →','reader-progress-link');progressLink.href='./?progress=1&chapter='+encodeURIComponent(parts[1]);title.after(progressLink)}siblingNavigation(p,catalog);$('status').textContent='Live source · '+p;document.body.classList.add('reader-ready');if(location.hash&&!params.get('question')&&!$('content').hidden)openAnchor(location.hash);}
$('toggle').onclick=()=>document.querySelectorAll('#content details:not(.original-index):not(.index-resource-group):not(.mobile-bank-context)').forEach(d=>d.open=false);
$('back-top').onclick=()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
mountResponsiveDisclosures();
mountCompactPanels();
mountProgressFilterIcon();
mountMetricsFilterIcon();
mountMobileReader();
mountPageWelcome();
(params.get('progress')==='1'?showProgress():params.get('metrics')==='1'?showMetrics():path?reader(path):home()).catch(e=>{const target=params.get('progress')==='1'?$('progress-status'):params.get('metrics')==='1'?$('metrics-status'):path?$('status'):$('count');target.textContent='This study page could not load. Your saved progress is safe.';target.classList.add('load-error');const actions=node('div',undefined,'load-recovery'),retry=node('button','Try again'),library=node('a','Back to Library');retry.type='button';retry.onclick=()=>location.reload();library.href='./#library';actions.append(retry,library);if(path&&safe(path)){const original=node('a','Open original study material');original.href=path.endsWith('/')?'https://github.com/'+repo+'/tree/main/'+encodeRepoPath(path):git+encodeRepoPath(path);original.target='_blank';original.rel='noopener noreferrer';actions.append(original)}target.after(actions)});
