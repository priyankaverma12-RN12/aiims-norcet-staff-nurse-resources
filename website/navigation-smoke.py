"""Check the checked-out chapter navigation, not a stale live-main snapshot."""
import json
import re
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.parse import unquote, urlencode, urlsplit
from playwright.sync_api import sync_playwright, expect

site = Path(__file__).resolve().parent
root = site.parent
repo = "priyankaverma12-RN12/aiims-norcet-staff-nurse-resources"
raw_prefix = "/" + repo + "/main/"
catalog = json.loads((site / "site-catalog.json").read_text(encoding="utf-8"))
index = (root / "Chapters/NORCET-Full-Chapter-Index.md").read_text(encoding="utf-8")
chapters = list(dict.fromkeys(re.findall(r"^\| \[[^\]]+\]\(([A-Za-z0-9-]+)/README\.md\)", index, re.M)))
assert len(chapters) >= 35
server = ThreadingHTTPServer(("127.0.0.1", 0), partial(SimpleHTTPRequestHandler, directory=str(site)))
Thread(target=server.serve_forever, daemon=True).start()
base = f"http://127.0.0.1:{server.server_port}/"

def route_raw(route):
    path = unquote(urlsplit(route.request.url).path)
    if not path.startswith(raw_prefix):
        return route.continue_()
    relative = path[len(raw_prefix):]
    candidate = (root / relative).resolve()
    if not candidate.is_relative_to(root) or not candidate.is_file():
        return route.fulfill(status=404, body="Snapshot file not found", headers={"access-control-allow-origin": "*"})
    return route.fulfill(path=str(candidate), headers={"access-control-allow-origin": "*"})

def ready(page):
    expect(page.locator("#status")).to_have_text(re.compile(r"^Live source"), timeout=30000)
    expect(page.locator("#content h1").first).to_be_visible()

def no_overflow(page):
    assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth + 2"), page.url

def visit(page, path, fragment=""):
    page.goto(base + "?" + urlencode({"doc": path}) + fragment)
    ready(page)
    no_overflow(page)

try:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for width, height in [(1440, 900), (390, 844), (320, 720)]:
            ctx = browser.new_context(viewport={"width": width, "height": height})
            ctx.route("https://raw.githubusercontent.com/**", route_raw)
            ctx.route("https://api.github.com/repos/**/contents/**", lambda route: route.abort())
            page = ctx.new_page()
            page.goto(base)
            expect(page.locator("#chapters .chapter").first).to_be_visible(timeout=30000)
            assert page.locator("#chapters .chapter").count() == len(chapters)
            no_overflow(page)
            for chapter in chapters:
                visit(page, f"Chapters/{chapter}/README.md")
            if (root / "Chapters/Nervous-System/README.md").is_file():
                visit(page, "Chapters/Nervous-System/README.md")
            # Exercise the actual DOM fragment resolver with named and normal anchors.
            assert page.evaluate("""() => {
                const doc = document.createElement('div');
                const h = document.createElement('h2'); h.id = 'normal-heading'; doc.append(h);
                const a = document.createElement('a'); a.name = 'old heading'; doc.append(a);
                return findStudyFragment(doc,'#normal-heading') === h &&
                       findStudyFragment(doc,'#old%20heading') === a &&
                       findStudyFragment(doc,'#%zz') === null &&
                       findStudyFragment(doc,'#missing') === null;
            }""")
            print(f"Snapshot {width}x{height}: {len(chapters)} curriculum homepages, legacy package and fragment resolver checked.", flush=True)
            ctx.close()
        browser.close()
finally:
    server.shutdown()
    server.server_close()
