"""Build a deployment snapshot of public image assets and audit local Markdown references."""
import json, re, shutil, posixpath, collections
from pathlib import Path
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree as ET
from html import unescape
root=Path(__file__).resolve().parent.parent
site=root/"website"
repo="priyankaverma12-RN12/aiims-norcet-staff-nurse-resources"
extensions={".svg",".png",".jpg",".jpeg",".gif",".webp",".avif",".bmp"}
files={p.relative_to(root).as_posix():p for p in (root/"Chapters").rglob("*") if p.is_file()}
files.update({p.relative_to(root).as_posix():p for p in (root/"Assets").rglob("*") if p.is_file()})
directories=collections.defaultdict(dict)
assets=[]
for name,p in sorted(files.items()):
    parts=name.split("/")
    for i in range(1,len(parts)):
        parent="/".join(parts[:i]); child="/".join(parts[:i+1]); kind="file" if i==len(parts)-1 else "dir"
        if kind=="dir" or p.suffix.lower()==".md":
            directories[parent][child]={"name":parts[i],"path":child,"type":kind}
    if p.suffix.lower() in extensions:
        assets.append(name); dest=site/"media-cache"/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(p,dest)
def local_target(raw,doc):
    raw=unescape(raw).strip().strip("<>")
    if not raw or raw.startswith("#"): return None
    u=urlsplit(raw); path=unquote(u.path)
    if u.netloc:
        pre="/"+repo.lower()+"/"
        if u.hostname not in ("github.com","raw.githubusercontent.com") or not path.lower().startswith(pre): return None
        rest=path[len(pre):]
        m=re.match(r"(?:(?:blob|raw|tree)/)?(?:refs/heads/)?main/(.*)",rest)
        return posixpath.normpath(m.group(1)) if m else None
    if u.scheme: return None
    if path.lstrip("/").startswith(("Chapters/","Assets/")): return posixpath.normpath(path.lstrip("/"))
    return posixpath.normpath(posixpath.join(posixpath.dirname(doc),path))
missing=[];invalid_svg=[];chart_count=0;image_refs=0;link_refs=0;md_count=0;chart_samples=[]
for name,p in sorted(files.items()):
    if p.suffix.lower()==".svg":
        try: ET.parse(p)
        except ET.ParseError as e: invalid_svg.append({"path":name,"error":str(e)})
    if p.suffix.lower()!=".md":continue
    md_count+=1;s=p.read_text(encoding="utf-8",errors="replace")
    for m in re.finditer(r"(?m)^ *\x60\x60\x60mermaid[^\n]*\n([\s\S]*?)^ *\x60\x60\x60",s):
        chart_count+=1
        if len(chart_samples)<6: chart_samples.append(name)
    # Inline Markdown and HTML attributes; external sites and fragment anchors are not certified by this scan.
    refs=[(m.group(1)=="!",m.group(2)) for m in re.finditer(r"(!?)\[[^\]\n]*\]\(\s*(<[^>\n]+>|[^\s)\n]+)",s)]
    refs += [(True,m.group(1)) for m in re.finditer(r"<img\b[^>]*\bsrc\s*=\s*[\"']([^\"']+)",s,re.I)]
    for image,ref in refs:
        if image:image_refs+=1
        else:link_refs+=1
        try: dest=local_target(ref,name)
        except ValueError:continue
        if dest is None:continue
        if dest not in files and dest not in directories and not (root/dest).is_file() and not (root/dest).is_dir():
            missing.append({"document":name,"reference":ref,"target":dest,"type":"image" if image else "link"})
catalog={"directories":{k:list(v.values()) for k,v in directories.items()},"asset_count":len(assets)}
(site/"site-catalog.json").write_text(json.dumps(catalog,ensure_ascii=False,separators=(",",":")),encoding="utf-8")
report={"markdown_documents":md_count,"assets_copied":len(assets),"image_references":image_refs,"link_references":link_refs,"mermaid_blocks":chart_count,"missing_references":missing,"invalid_svg":invalid_svg,"mermaid_examples":chart_samples}
(site/"source-audit.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
print("SITE AUDIT:",json.dumps({k:v for k,v in report.items() if k not in ("missing_references","invalid_svg","mermaid_examples")}),"missing references:",len(missing),"invalid SVG:",len(invalid_svg),flush=True)
for item in (missing+invalid_svg)[:30]:print("SOURCE ISSUE:",json.dumps(item,ensure_ascii=False),flush=True)
