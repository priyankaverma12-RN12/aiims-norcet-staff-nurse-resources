"""Inventory Markdown navigation and flag possible anchor and URL issues.

No external network requests: reachability, source relevance and clinical
accuracy are separate review tasks. GitHub slug matching is approximate.
"""
import collections
import json
import re
import unicodedata
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from markdown_it import MarkdownIt

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "website"
REPO = "priyankaverma12-RN12/aiims-norcet-staff-nurse-resources"
PARSER = MarkdownIt("commonmark", {"html": True}).enable("table")
NAVIGATION = re.compile(
    r"readme|index|overview|master.guide|coverage.map|mock.test.plan|references|research.guide|research.register",
    re.I,
)
documents = sorted(ROOT.glob("*.md")) + sorted((ROOT / "Chapters").rglob("*.md"))
documents = [p for p in documents if p.is_file()]
anchors = {}
references = []
inventory = []
malformed = []
external = collections.defaultdict(list)
missing_paths = []
possible_missing_fragments = []
unchecked_fragments = []
counts = collections.Counter()

class HTMLLinks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "a" and attrs.get("name"):
            self.ids.add(attrs["name"])
        if tag in ("a", "img"):
            url = attrs.get("href" if tag == "a" else "src")
            if url:
                self.links.append(url)
    handle_startendtag = handle_starttag

def slug(text, marks=False):
    text = text.strip().lower()
    return "".join(
        "-" if char == " " else char
        for char in text
        if char in " _-" or unicodedata.category(char)[0] in ("L", "N")
        or (marks and unicodedata.category(char)[0] == "M")
    )

def text_of(tokens):
    return "".join(t.content for t in tokens
                   if t.type in ("text", "code_inline", "image"))

def token_tree(tokens):
    for t in tokens:
        yield t
        if t.children:
            yield from token_tree(t.children)

for p in documents:
    rel = p.relative_to(ROOT).as_posix()
    tokens = PARSER.parse(p.read_text(encoding="utf-8"))
    nav = bool(NAVIGATION.search(p.stem))
    if nav:
        inventory.append(rel)
    ids, seen = set(), [set(), set()]
    for i, t in enumerate(tokens):
        if t.type == "heading_open" and i + 1 < len(tokens):
            heading = text_of(tokens[i + 1].children or [])
            for j, marks in enumerate((False, True)):
                base = slug(heading, marks)
                ident, suffix = base, 0
                while ident in seen[j]:
                    suffix += 1
                    ident = f"{base}-{suffix}"
                seen[j].add(ident)
                ids.add(ident)
    for t in token_tree(tokens):
        if t.type in ("link_open", "image"):
            url = t.attrGet("href" if t.type == "link_open" else "src")
            if url:
                references.append((rel, url, nav))
        elif t.type in ("html_inline", "html_block"):
            h = HTMLLinks()
            h.feed(t.content)
            ids.update(h.ids)
            references.extend((rel, url, nav) for url in h.links)
    anchors[rel] = ids

def resolve(rel, url):
    parts = urlsplit(url)
    path = unquote(parts.path)
    fragment = unquote(parts.fragment)
    if parts.scheme or parts.netloc:
        if parts.scheme not in ("http", "https") and parts.scheme:
            return "other", url, fragment
        host = (parts.hostname or "").lower()
        if host in ("github.com", "raw.githubusercontent.com"):
            match = re.match(
                rf"^/{re.escape(REPO)}/(?:blob/|raw/|tree/)?(?:refs/heads/)?main/(.*)$",
                path, re.I,
            )
            if match:
                return "local", match.group(1), fragment
        return "external", url, fragment
    if not path:
        return "local", rel, fragment
    if path.startswith("/"):
        target = ROOT / path.lstrip("/")
    else:
        target = ROOT / Path(rel).parent / path
    try:
        return "local", target.resolve().relative_to(ROOT).as_posix(), fragment
    except ValueError:
        return "outside", url, fragment

for rel, url, nav in references:
    counts["reference_occurrences"] += 1
    if nav:
        counts["navigation_reference_occurrences"] += 1
    try:
        kind, target, fragment = resolve(rel, url)
    except ValueError:
        malformed.append({"document": rel, "url": url})
        continue
    if kind == "external":
        external[target].append(rel)
        counts["external_occurrences"] += 1
        continue
    if kind != "local":
        counts["other_or_outside_occurrences"] += 1
        continue
    counts["local_occurrences"] += 1
    item = {"document": rel, "url": url, "target": target}
    resolved = ROOT / target
    if not resolved.exists():
        missing_paths.append(item)
        continue
    if not fragment:
        continue
    counts["local_fragment_occurrences"] += 1
    if resolved.is_dir():
        candidate = resolved / "README.md"
        if candidate.is_file():
            target = candidate.relative_to(ROOT).as_posix()
    if target not in anchors:
        unchecked_fragments.append(item)
    elif fragment not in anchors[target]:
        possible_missing_fragments.append(item)
    else:
        counts["candidate_fragment_matches"] += 1

report = {
    "method": "Markdown-it CommonMark and GFM tables, HTML href/src/id/name, approximate heading slug matching. External URLs are inventoried, not fetched. Findings require review.",
    "markdown_documents": len(documents),
    "navigation_documents": len(inventory),
    "navigation_inventory": inventory,
    **counts,
    "unique_external_urls": len(external),
    "external_inventory": [
        {"url": url, "occurrences": len(paths), "documents": sorted(set(paths))}
        for url, paths in sorted(external.items())
    ],
    "missing_local_paths": missing_paths,
    "possible_missing_fragments": possible_missing_fragments,
    "unchecked_fragments": unchecked_fragments,
    "malformed_urls": malformed,
}
(SITE / "navigation-audit.json").write_text(
    json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)
summary = {
    k: v for k, v in report.items()
    if isinstance(v, int)
}
summary.update({
    "missing_local_paths": len(missing_paths),
    "possible_missing_fragments": len(possible_missing_fragments),
    "unchecked_fragments": len(unchecked_fragments),
    "malformed_urls": len(malformed),
})
print("NAVIGATION AUDIT:", json.dumps(summary), flush=True)
for key in ("missing_local_paths", "possible_missing_fragments", "malformed_urls"):
    for item in report[key][:10]:
        print(key, json.dumps(item, ensure_ascii=False), flush=True)
