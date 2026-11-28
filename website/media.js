'use strict';
// All navigation stays in the original repository. Only main-branch aliases are canonicalized.
const MEDIA_REPO='priyankaverma12-RN12/aiims-norcet-staff-nurse-resources';
const MEDIA_RAW='https://raw.githubusercontent.com/'+MEDIA_REPO+'/main/';
function encodeRepoPath(p){return p.split('/').map(encodeURIComponent).join('/')}
function resolveResource(input,base){
 const value=String(input||'').trim();if(!value)return null;
 const root=/^(?:\/?Chapters\/|\/Assets\/)/i.test(value);
 let u;try{u=new URL(root?MEDIA_RAW+value.replace(/^\//,''):value,MEDIA_RAW+encodeRepoPath(base))}catch{return null}
 if(!['https:','http:'].includes(u.protocol))return null;
 const rawPrefix='/'+MEDIA_REPO.toLowerCase()+'/';
 const pathname=u.pathname;
 let target=null,kind='';
 if(u.hostname==='raw.githubusercontent.com'&&pathname.toLowerCase().startsWith(rawPrefix)){
  const rest=pathname.slice(rawPrefix.length);const m=rest.match(/^(?:refs\/heads\/)?main\/(.*)$/);if(m)target=m[1];
 }
 if(u.hostname==='github.com'&&pathname.toLowerCase().startsWith(rawPrefix)){
  const rest=pathname.slice(rawPrefix.length);const m=rest.match(/^(blob|tree|raw)\/(?:refs\/heads\/)?main\/(.*)$/);if(m){kind=m[1];target=m[2]}
 }
 // GitHub root-relative URLs sometimes appear in HTML image/link tags.
 if(value.startsWith('/')&&!value.startsWith('//')&&u.hostname==='raw.githubusercontent.com'&&pathname.toLowerCase().startsWith(rawPrefix)){
  const rest=pathname.slice(rawPrefix.length);const m=rest.match(/^(blob|tree|raw)\/(?:refs\/heads\/)?main\/(.*)$/);if(m){kind=m[1];target=m[2]}
 }
 if(target!==null){try{target=decodeURIComponent(target)}catch{return null}
  if(!target||target.split('/').some(x=>x==='..'||x==='.')||/[\u0000-\u001f\\]/.test(target))return null;
  if(kind==='tree'&&!target.endsWith('/'))target+='/';
  return {path:target,raw:MEDIA_RAW+encodeRepoPath(target)+u.search,hash:u.hash,external:false};
 }
 return {url:u.href,external:true};
}
// Route both explicit directory links and extensionless chapter folders inside the study UI.
function studyDocumentPath(resource){
 if(!resource||resource.external||typeof resource.path!=='string')return null;
 const p=resource.path;
 if(!p.startsWith('Chapters/')||/[?#%\\\u0000-\u001f]/.test(p))return null;
 const parts=p.split('/');if(parts.slice(1).some((part,i)=>part==='.'||part==='..'||(!part&&i!==parts.length-2)))return null;
 if(/\.md$/i.test(p)||p.endsWith('/'))return p;
 return parts.at(-1).includes('.')?null:p+'/';
}
function sourceLink(target){return 'https://github.com/'+MEDIA_REPO+'/'+(target.endsWith('/')?'tree':'blob')+'/main/'+encodeRepoPath(target)}
function getCatalog(){if(!getCatalog.promise)getCatalog.promise=fetch('./site-catalog.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Catalog unavailable');return r.json()}).catch(()=>null);return getCatalog.promise}
function decorateImages(target,p){
 for(const img of target.querySelectorAll('img[src]')){
  const source=img.getAttribute('src'),r=resolveResource(source,p);
  img.removeAttribute('srcset');img.removeAttribute('sizes');img.loading='lazy';img.decoding='async';
  if(!r||r.external&&!r.url.startsWith('https:')){img.removeAttribute('src');img.alt=img.alt||'Unsupported image';continue}
  const primary=r.external?r.url:r.raw;const link=r.external?primary:sourceLink(r.path);
  const box=document.createElement('span');box.className='study-media';img.before(box);box.append(img);
  const controls=document.createElement('span');controls.className='media-actions';const open=document.createElement('a');open.href=primary;open.target='_blank';open.rel='noopener noreferrer';open.textContent='Open full-size image ↗';controls.append(open);box.append(controls);
  let retried=false;img.addEventListener('error',()=>{
   if(!retried&&!r.external){retried=true;img.src='./media-cache/'+encodeRepoPath(r.path);return}
   img.hidden=true;box.classList.add('media-unavailable');const notice=document.createElement('span');notice.className='media-notice';notice.textContent='Image unavailable: '+(img.alt||r.path||'external image');const original=document.createElement('a');original.href=link;original.target='_blank';original.rel='noopener noreferrer';original.textContent='Open original source ↗';controls.replaceChildren(notice,original);
  });
  img.addEventListener('load',()=>{if(retried)open.href=img.currentSrc||img.src});
  img.src=primary;
 }
}
let diagramEngine,diagramSequence=0,diagramQueue=Promise.resolve();
function loadDiagramEngine(){
 if(!diagramEngine)diagramEngine=import('https://cdn.jsdelivr.net/npm/mermaid@12.3.0/dist/mermaid.esm.min.mjs').then(m=>{const engine=m.default;engine.initialize({startOnLoad:false,securityLevel:'strict',htmlLabels:false,theme:'neutral',flowchart:{useMaxWidth:false,htmlLabels:false},suppressErrorRendering:true});return engine});
 return diagramEngine;
}
function diagramSource(text){
 // Preserve the original code in the UI; ignore author-provided initialization overrides.
 return text.replace(/%%\{[\s\S]*?\}%%/g,'').replace(/^\s*---\s*\n[\s\S]*?\n---\s*\n/,'').trim();
}
function decorateDiagrams(target,p){
 for(const code of target.querySelectorAll('pre > code.language-mermaid')){
  const pre=code.parentElement,source=code.textContent,figure=document.createElement('figure');figure.className='flowchart-card';figure.dataset.diagramState='waiting';
  const title=document.createElement('figcaption');title.textContent='Study flowchart';const view=document.createElement('div');view.className='flowchart-view';view.textContent='Preparing diagram…';
  const detail=document.createElement('details'),summary=document.createElement('summary');summary.textContent='View original flowchart code';detail.append(summary);pre.before(figure);detail.append(pre);figure.append(title,view,detail);
  function schedule(){if(figure.dataset.diagramState!=='waiting')return;figure.dataset.diagramState='loading';
   diagramQueue=diagramQueue.catch(()=>{}).then(async()=>{
    if(!figure.isConnected)return;
    try{const engine=await loadDiagramEngine();const {svg}=await engine.render('nursing-diagram-'+(++diagramSequence),diagramSource(source));if(!figure.isConnected)return;
     // SVG is displayed as an image, never injected into the interactive page DOM.
     const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const img=document.createElement('img');img.alt='Flowchart from '+p.split('/').at(-1);img.addEventListener('error',()=>{URL.revokeObjectURL(url);figure.dataset.diagramState='error';view.textContent='Diagram could not be displayed. Open the original code below.';detail.open=true},{once:true});
     img.addEventListener('load',()=>{if(!figure.isConnected){URL.revokeObjectURL(url);return}figure.dataset.diagramState='ready';img.style.width=Math.min(1400,Math.max(300,img.naturalWidth))+'px'},{once:true});
     img.src=url;const zoom=document.createElement('a');zoom.href=url;zoom.download='study-flowchart.svg';zoom.textContent='Save full-size SVG';zoom.className='diagram-zoom';view.replaceChildren(img);title.append(zoom);
    }catch{figure.dataset.diagramState='error';view.textContent='This diagram could not be rendered. The original flowchart code is available below.';detail.open=true}
   });
  }
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();schedule()}},{rootMargin:'250px'});observer.observe(figure)}else schedule();
 }
}
function findStudyFragment(root,hash){
 if(typeof hash!=='string'||!hash.startsWith('#')||hash.length<2)return null;
 let key;try{key=decodeURIComponent(hash.slice(1))}catch{return null}
 // Prefer exact heading IDs, then legacy Markdown anchors. Never resolve outside the document.
 const byId=Array.from(root.querySelectorAll('[id]')).find(el=>el.id===key);
 return byId||Array.from(root.querySelectorAll('a[name]')).find(el=>el.getAttribute('name')===key)||null;
}
// An empty named anchor may be wrapped in a paragraph by the Markdown renderer.
// Scroll to its adjacent visible heading, rather than a zero-height inline element.
function studyFragmentTarget(root,hash){
 const anchor=findStudyFragment(root,hash);
 if(!anchor||anchor.tagName!=='A'||!anchor.hasAttribute('name')||anchor.textContent.trim())return anchor;
 let next=anchor.nextElementSibling;
 if(!next&&anchor.parentElement?.tagName==='P'&&!anchor.parentElement.textContent.trim())next=anchor.parentElement.nextElementSibling;
 return next&&/^H[1-6]$/.test(next.tagName)?next:anchor;
}
function scrollStudyFragment(root,hash){
 const target=studyFragmentTarget(root,hash);
 if(!target)return false;
 target.scrollIntoView({block:'start',behavior:'instant'});
 const sticky=[...document.querySelectorAll('.topbar,.reading-location')].filter(el=>{const pos=getComputedStyle(el).position;return (pos==='sticky'||pos==='fixed')&&el.getBoundingClientRect().bottom>0});
 const clearance=Math.max(8,...sticky.map(el=>el.getBoundingClientRect().bottom+8));
 const top=target.getBoundingClientRect().top;
 if(top<clearance)window.scrollBy({top:top-clearance,behavior:'instant'});
 return true;
}
if(typeof module!=='undefined')module.exports={resolveResource,studyDocumentPath,encodeRepoPath,diagramSource,findStudyFragment,studyFragmentTarget,scrollStudyFragment};
