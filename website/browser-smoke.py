"""Run browser integration checks on a local static server, using live public sources."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path
import json, tempfile
from threading import Thread
from urllib.parse import urljoin, urlencode
from playwright.sync_api import sync_playwright, expect

site = Path(__file__).resolve().parent
server = ThreadingHTTPServer(("127.0.0.1", 0), partial(SimpleHTTPRequestHandler, directory=str(site)))
Thread(target=server.serve_forever, daemon=True).start()
base = f"http://127.0.0.1:{server.server_port}/"
sample = "Chapters/Respiratory-System/MCQs/Day-01-Complete-Respiratory-Anatomy-Physiology.md"

def ready(page):
    expect(page.locator("#status")).to_have_text(__import__("re").compile(r"^Live source"), timeout=30000)
    expect(page.locator("#content h1").first).to_be_visible(timeout=10000)

def no_overflow(page):
    assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth + 2"), "Horizontal overflow"

try:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        desktop = browser.new_context(viewport={"width": 1440, "height": 900})
        page = desktop.new_page()
        page.goto(base)
        cards = page.locator("#chapters .chapter")
        expect(cards.first).to_be_visible(timeout=30000)
        count = cards.count()
        assert count >= 35, f"Expected at least 35 chapters, found {count}"
        expect(page.locator("#chapter-total")).to_have_text(str(count))
        assert page.locator(".chapter-group").count() >= 8
        assert page.locator('.chapter-card').filter(has_text='Nursing Foundations').get_by_text('Revision',exact=True).count()==0
        page.locator("#search").fill("Respiratory")
        expect(cards).to_have_count(1)
        page.locator("#search").fill("")
        page.locator("#group-filter").select_option(index=1)
        assert 0 < cards.count() < count
        page.locator("#group-filter").select_option("")
        expect(cards).to_have_count(count)
        page.locator("#theme").click()
        assert page.locator("html").get_attribute("data-theme") in ("dark", "light")
        hrefs = cards.evaluate_all("(items) => items.map(a => a.href)")
        assert len(set(hrefs)) == count
        no_overflow(page)
        for href in hrefs:
            page.goto(href)
            ready(page)
        print(f"All {count} chapter pages loaded in Chromium", flush=True)
        page.goto(base + "?" + urlencode({"doc": sample}))
        ready(page)
        assert page.locator("#content details").count() >= 44
        assert page.locator("#content details[open]").count() == 0
        image = page.locator('#content img[src*="airway-zones.svg"]').first
        image.scroll_into_view_if_needed()
        page.wait_for_function("Array.from(document.querySelectorAll('#content img')).some(i => i.src.includes('airway-zones.svg') && i.complete && i.naturalWidth > 0)", timeout=30000)
        expect(page.locator(".quiz-panel")).to_contain_text("44 scoreable questions")
        page.get_by_role("button", name="Start timed practice").click()
        expect(page.locator("#content")).to_be_hidden()
        expect(page.locator(".quiz-panel details")).to_have_count(0)
        page.locator(".quiz-option input[value=B]").check()
        page.get_by_role("button", name="Bookmark").click()
        page.once("dialog", lambda dialog: dialog.accept())
        page.get_by_role("button", name="Submit test").click()
        expect(page.locator(".quiz-panel [role=status]")).to_contain_text("1 correct")
        expect(page.locator(".quiz-panel [role=status]")).to_contain_text("43 skipped")
        expect(page.locator(".quiz-panel details")).to_be_visible()
        page.goto(base)
        page.reload()
        expect(page.locator("#marks a")).to_contain_text("voice box")
        page.locator("#marks a").click()
        ready(page)
        page.goto(base)
        expect(page.locator("#recent .recent-card").first).to_be_visible()
        # Actual Mermaid source, breadcrumb and source image fallback.
        flow = "Chapters/Nursing-Foundations/Concepts/01A-Nursing-Process-and-Care-Planning.md"
        page.goto(base + "?" + urlencode({"doc": flow}))
        ready(page)
        expect(page.locator("#breadcrumbs [aria-current=page]")).to_contain_text("Nursing Process")
        expect(page.locator("#sections [aria-current=page]")).to_have_text("Theory")
        expect(page.locator("#breadcrumbs a").first).to_have_text("Library")
        expect(page.locator("#reading-chapter")).to_contain_text("Nursing Foundations")
        expect(page.locator("#sibling-nav")).to_be_visible()
        chart = page.locator(".flowchart-card").first
        chart.scroll_into_view_if_needed()
        expect(chart).to_have_attribute("data-diagram-state", "ready", timeout=90000)
        assert chart.locator(".flowchart-view img").evaluate("(i) => i.complete && i.naturalWidth > 0")
        no_overflow(page)
        # Validate all source Mermaid blocks and all staged image files, not just the sample.
        charts = json.loads((Path(tempfile.gettempdir())/"nursing-mermaid-audit.json").read_text(encoding="utf-8"))
        chart_errors = page.evaluate("""async (charts) => {
            const engine = await loadDiagramEngine(), failures = [];
            for (const item of charts) {
              try { await engine.parse(diagramSource(item.source)); }
              catch (e) { failures.push({document:item.document,error:String(e).slice(0,250)}); }
            }
            return failures;
        }""", charts)
        catalog = json.loads((site/"site-catalog.json").read_text(encoding="utf-8"))
        image_errors = page.evaluate("""async (assets) => {
            const failed = [];
            for (let i=0;i<assets.length;i+=12) {
              await Promise.all(assets.slice(i,i+12).map(path => new Promise(resolve => {
                const img = new Image();img.onload=()=>resolve();img.onerror=()=>{failed.push(path);resolve()};
                img.src='./media-cache/'+encodeRepoPath(path);
              })));
            }
            return failed;
        }""", catalog["assets"])
        report_path=site/"source-audit.json"
        report=json.loads(report_path.read_text(encoding="utf-8"))
        report.update({"mermaid_parse_failures":chart_errors,"image_decode_failures":image_errors,"mermaid_blocks_parsed":len(charts),"image_assets_decoded":len(catalog["assets"])})
        report_path.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
        print(f"VISUAL AUDIT: {len(charts)} Mermaid blocks parsed ({len(chart_errors)} failed), {len(catalog['assets'])} image assets decoded ({len(image_errors)} failed).",flush=True)
        for issue in (chart_errors+image_errors)[:15]: print("VISUAL SOURCE ISSUE:",issue,flush=True)
        page.route("https://raw.githubusercontent.com/**/airway-zones.svg", lambda route: route.abort())
        page.goto(base + "?" + urlencode({"doc": sample}))
        ready(page)
        fallback = page.locator('img[src*="airway-zones.svg"]').first
        fallback.scroll_into_view_if_needed()
        page.wait_for_function("Array.from(document.querySelectorAll('#content img')).some(i => i.src.includes('media-cache') && i.src.includes('airway-zones.svg') && i.complete && i.naturalWidth > 0)", timeout=30000)
        page.unroute("https://raw.githubusercontent.com/**/airway-zones.svg")
        print("Breadcrumb, active section, real Mermaid flowchart and image fallback passed.", flush=True)
        desktop.close()
        for width, height in [(320, 720), (390, 844), (430, 932), (768, 1024), (844, 390)]:
            ctx = browser.new_context(viewport={"width": width, "height": height}, is_mobile=True, has_touch=True)
            mobile = ctx.new_page()
            mobile.goto(base)
            expect(mobile.locator("#chapters .chapter").first).to_be_visible(timeout=30000)
            no_overflow(mobile)
            mobile.locator("#search").fill("Respiratory")
            expect(mobile.locator("#chapters .chapter")).to_have_count(1)
            assert mobile.locator(".chapter-links a").first.bounding_box()["height"] >= 43
            mobile.locator("#theme").tap()
            theme = mobile.locator("html").get_attribute("data-theme")
            mobile.reload()
            expect(mobile.locator("#chapters .chapter").first).to_be_visible(timeout=30000)
            assert mobile.locator("html").get_attribute("data-theme") == theme
            no_overflow(mobile)
            mobile.goto(base + "?" + urlencode({"doc": sample}))
            ready(mobile)
            no_overflow(mobile)
            expect(mobile.locator("#breadcrumbs [aria-current=page]")).to_be_visible()
            expect(mobile.locator("#sections [aria-current=page]")).to_have_text("MCQs")
            expect(mobile.locator("#toggle")).to_be_visible()
            assert mobile.locator("#toggle").bounding_box()["height"] >= 43
            mobile.clock.install()
            mobile.locator(".quiz-config input[type=number]").fill("1")
            mobile.get_by_role("button", name="Start timed practice").tap()
            assert mobile.locator(".quiz-option").first.bounding_box()["height"] >= 51
            no_overflow(mobile)
            mobile.clock.fast_forward(61000)
            expect(mobile.locator(".quiz-panel [role=status]")).to_contain_text("44 skipped")
            no_overflow(mobile)
            print(f'Touch layout {width}x{height}: search, theme persistence, reader controls, quiz targets and timer passed.', flush=True)
            ctx.close()
        browser.close()
        print("Desktop/mobile integration, real diagram, hidden answers, score, bookmark reload, and timer expiry passed.", flush=True)
finally:
    server.shutdown()
    server.server_close()
