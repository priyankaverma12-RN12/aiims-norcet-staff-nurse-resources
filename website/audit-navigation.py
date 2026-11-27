"""Read-only Markdown navigation audit. No clinical or learner data is modified."""
import argparse
import collections
import html
import json
import posixpath
import re
import tempfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

REPO = 'priyankaverma12-RN12/aiims-norcet-staff-nurse-resources'
NAV = re.compile(r'(?:^README\.md$|(?:Index|Overview|References|Mock-Test-Plan|Topic-Coverage-Map)\.md$)', re.I)


def without_fences(text):
    result, fence = [], None
    for line in text.splitlines():
        m = re.match(r'^ {0,3}(`{3,}|~{3,})(.*)$', line)
        if fence:
            if m and m[1][0] == fence[0] and len(m[1]) >= len(fence) and not m[2].strip():
                fence = None
            result.append('')
        elif m:
            fence = m[1]
            result.append('')
        else:
            result.append(line)
    return '\n'.join(result)


class Markup(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.links = set(), []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ('id', 'name'):
            if attrs.get(key):
                self.ids.add(attrs[key])
        key = 'src' if tag == 'img' else 'href' if tag == 'a' else None
        if key and attrs.get(key):
            self.links.append((attrs[key], 'image' if tag == 'img' else 'link', self.getpos()[0]))


def read_target(rest):
    rest = rest.lstrip()
    if rest.startswith('<'):
        return rest[1:].split('>', 1)[0] if '>' in rest else ''
    result, depth, escaped = [], 0, False
    for ch in rest:
        if escaped:
            result.append(ch)
            escaped = False
        elif ch == '\\':
            escaped = True
        elif ch == '(':
            depth += 1
            result.append(ch)
        elif ch == ')':
            if depth == 0:
                break
            depth -= 1
            result.append(ch)
        elif ch.isspace():
            break
        else:
            result.append(ch)
    return ''.join(result)


def parse_document(text):
    clean = without_fences(text)
    markup = Markup()
    markup.feed(clean)
    references = list(markup.links)
    github, website = set(markup.ids), set(markup.ids)
    used, counts = set(), collections.Counter()
    for number, line in enumerate(clean.splitlines(), 1):
        h = re.match(r'^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$', line)
        if h:
            label = re.sub(r'!?\[([^\]]+)\]\([^)]*\)', r'\1', h[1])
            label = html.unescape(re.sub(r'<[^>]+>', '', label)).strip().lower()
            base = ''.join(c for c in label if c.isalnum() or c in '_ -').replace(' ', '-')
            if base:
                n, slug = 0, base
                while slug in used:
                    n += 1
                    slug = f'{base}-{n}'
                used.add(slug)
                github.add(slug)
                n = counts[base]
                counts[base] += 1
                website.add(base + (f'-{n}' if n else ''))
        line = re.sub(r'(`+).*?\1', '', line)
        for m in re.finditer(r'(?<!\\)(!?)\[[^\]\n]*\]\(\s*', line):
            target = read_target(line[m.end():])
            if target:
                references.append((target, 'image' if m[1] else 'link', number))
        definition = re.match(r'^ {0,3}\[[^\]]+\]:\s*(.+)$', line)
        if definition:
            references.append((read_target(definition[1]), 'link', number))
        for m in re.finditer(r'https?://[^\s<>"\'`]+', line):
            target = m[0].rstrip('.,:;]')
            while target.endswith(')') and target.count(')') > target.count('('):
                target = target[:-1]
            references.append((target, 'link', number))
    # Repeated references within one document are counted once per kind and target.
    unique = {}
    for target, kind, line in references:
        target = html.unescape(target).strip()
        if target:
            unique.setdefault((target, kind), line)
    return {'github': github, 'website': website,
            'links': [(target, kind, line) for (target, kind), line in unique.items()]}


def resolve(raw, doc):
    try:
        u = urlsplit(raw)
    except ValueError:
        return 'unparsed', raw, '', None
    path, fragment = unquote(u.path), unquote(u.fragment)
    if u.netloc:
        prefix = '/' + REPO.lower() + '/'
        if u.hostname in ('github.com', 'raw.githubusercontent.com') and path.lower().startswith(prefix):
            rest = path[len(prefix):]
            m = re.match(r'(?:(?:blob|raw|tree)/)?(?:refs/heads/)?main/(.*)', rest)
            if m:
                return 'local', posixpath.normpath(m[1]), fragment, None
        return 'external', raw, '', None
    if u.scheme:
        return 'other', raw, '', None
    if not path:
        return 'local', doc, fragment, None
    native = posixpath.normpath(posixpath.join(posixpath.dirname(doc), path))
    if path.startswith('/'):
        return 'local', posixpath.normpath(path.lstrip('/')), fragment, None
    if path.startswith('Chapters/'):
        return 'local', posixpath.normpath(path), fragment, native
    return 'local', native, fragment, None


def audit(root):
    files = {p.relative_to(root).as_posix(): p for p in (root / 'Chapters').rglob('*.md') if p.is_file()}
    files.update({p.name: p for p in root.glob('*.md') if p.is_file() and not p.name.startswith('README-History-')})
    if (root / 'website/README.md').is_file():
        files['website/README.md'] = root / 'website/README.md'
    docs = {name: parse_document(p.read_text(encoding='utf-8', errors='replace')) for name, p in sorted(files.items())}
    missing, fragments, mismatches, external, unparsed = [], [], [], {}, []
    checked = 0
    for doc, parsed in docs.items():
        for raw, kind, line in parsed['links']:
            typ, target, fragment, native = resolve(raw, doc)
            item = {'document': doc, 'line': line, 'reference': raw, 'target': target, 'type': kind}
            if typ == 'external':
                record = external.setdefault(target, {'count': 0, 'examples': [], 'status': 'HTTP verification pending'})
                record['count'] += 1
                if len(record['examples']) < 5:
                    record['examples'].append({'document': doc, 'line': line})
                continue
            if typ == 'unparsed':
                unparsed.append(item)
            if typ != 'local':
                continue
            checked += 1
            resolved = (root / target).resolve()
            if not resolved.is_relative_to(root) or not resolved.exists():
                missing.append(item)
                continue
            if native and native != target and not (root / native).exists():
                mismatches.append({**item, 'github_relative_target': native})
            if fragment and target in docs and not re.fullmatch(r'L\d+(?:-L\d+)?', fragment):
                absent = [renderer for renderer in ('github', 'website') if fragment not in docs[target][renderer]]
                if absent:
                    fragments.append({**item, 'fragment': fragment, 'candidate_missing_in': absent})
    return {'markdown_documents': len(docs), 'navigation_candidates': sum(bool(NAV.search(Path(p).name)) for p in docs),
            'chapter_readmes': sorted(p for p in docs if re.fullmatch(r'Chapters/[^/]+/README\.md', p)),
            'unique_local_document_references': checked, 'missing_targets': missing,
            'fragment_candidates': fragments, 'github_relative_mismatches': mismatches,
            'unparsed_references': unparsed, 'external_urls': external,
            'limitations': ['Static inline Markdown, HTML and reference-definition scan. Some complex Markdown forms may be missed.',
                            'Heading slugs are approximations. Fragment candidates require actual renderer confirmation.',
                            'External URLs are inventoried only, not HTTP or source-content verified.',
                            'Historical README archive is preserved but excluded from current navigation counts.']}


def self_test():
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        d = root / 'Chapters/Demo'
        d.mkdir(parents=True)
        (root / 'README.md').write_text('# Home\n[Demo](Chapters/Demo/README.md)\n')
        (d / 'README.md').write_text('# Demo\n## Same heading\n## Same heading\n[valid](#same-heading-1)\n[missing fragment](#unknown)\n[missing file](absent.md)\n[home](../../README.md)\n[example](https://example.org/path)\n```text\n[ignored](missing-code.md)\n```\n')
        result = audit(root)
        assert len(result['missing_targets']) == 1, result
        assert len(result['fragment_candidates']) == 1, result
        assert len(result['external_urls']) == 1, result
        assert len(result['chapter_readmes']) == 1, result
        assert resolve('../Assets/a%20b.svg', 'Chapters/Demo/Concepts/file.md')[1] == 'Chapters/Demo/Assets/a b.svg'
        assert read_target('https://example.org/a_(b))') == 'https://example.org/a_(b)'
    print('Navigation audit fixture tests passed.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parent.parent)
    parser.add_argument('--output', type=Path, default=Path('website/navigation-audit.json'))
    parser.add_argument('--self-test', action='store_true')
    parser.add_argument('--strict', action='store_true', help='Fail when missing internal targets are found.')
    args = parser.parse_args()
    if args.self_test:
        self_test()
    else:
        result = audit(args.root.resolve())
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
        summary = {key: len(value) if isinstance(value, (list, dict)) else value for key, value in result.items() if key != 'limitations'}
        print('NAVIGATION AUDIT:', json.dumps(summary, ensure_ascii=False))
        if args.strict and result['missing_targets']:
            raise SystemExit(1)
