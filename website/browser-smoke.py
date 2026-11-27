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
        catalog_at_start=json.loads((site/"site-catalog.json").read_text(encoding="utf-8"))
        from urllib.parse import parse_qs, urlsplit
        shortcuts=page.locator(".chapter-links a").evaluate_all("(links) => links.map(a => a.href)")
        for href in shortcuts:
            target=parse_qs(urlsplit(href).query)["doc"][0].rstrip("/")
            assert target in catalog_at_start["directories"], f"Missing navigation target: {target}"
        print(f"All {len(shortcuts)} chapter resource shortcuts match real repository folders.",flush=True)
        no_overflow(page)
        for href in hrefs:
            page.goto(href)
            ready(page)
        print(f"All {count} chapter pages loaded in Chromium", flush=True)
        page.goto(base+"?metrics=1&chapter=Nursing-Foundations")
        expect(page.locator("#metrics-totals .metric-tile")).to_have_count(5,timeout=30000)
        expect(page.locator("#metrics-chapter")).to_have_value("Nursing-Foundations")
        expect(page.locator(".metric-record").first).to_be_visible()
        page.locator("#metrics-category").select_option("mock")
        expect(page.locator(".metric-record small").first).to_have_text("Mock question slots")
        no_overflow(page)
        page.goto(base+"?"+urlencode({"doc":"Chapters/Nursing-Foundations/Previous-Year-Questions/01-Nursing-Process-Reported-Evidence.md"}))
        ready(page)
        expect(page.locator(".pyq-card").first).to_be_visible()
        expect(page.locator(".pyq-card").first.locator(".pyq-options li")).to_have_count(4)
        expect(page.locator(".pyq-card").first.locator(".pyq-exam-source a")).to_be_visible()
        expect(page.locator(".pyq-card").first.locator(".pyq-explanation")).not_to_have_attribute("open","")
        page.locator(".pyq-card").first.locator(".pyq-explanation summary").click()
        expect(page.locator(".pyq-card").first.locator(".pyq-source-links a.video-link").first).to_be_visible()
        no_overflow(page)
        print("Metrics totals, topic filter, PYQ cards, original explanation and source video links passed.",flush=True)
        # A chapter overview uses Assets/... relative to its own directory.
        page.goto(base + "?" + urlencode({"doc":"Chapters/Respiratory-System/README.md"}))
        ready(page)
        original_index=page.locator("#original-index")
        if original_index.count():
            original_index.locator("summary").first.click()
        overview_img=page.locator('#content img[src*="respiratory-tract.svg"]').first
        overview_img.scroll_into_view_if_needed()
        page.wait_for_function("Array.from(document.querySelectorAll('#content img')).some(i => i.src.includes('/Chapters/Respiratory-System/Assets/respiratory-tract.svg') && i.complete && i.naturalWidth > 0)",timeout=30000)
        print("Chapter-relative README image resolved and decoded.",flush=True)
        page.goto(base + "?" + urlencode({"doc": sample}))
        ready(page)
        assert page.locator("#content details").count() >= 44
        assert page.locator("#content details[open]").count() == 0
        image = page.locator('#content img[src*="airway-zones.svg"]').first
        image.scroll_into_view_if_needed()
        page.wait_for_function("Array.from(document.querySelectorAll('#content img')).some(i => i.src.includes('airway-zones.svg') && i.complete && i.naturalWidth > 0)", timeout=30000)
        expect(page.locator(".quiz-panel")).to_contain_text("44 scoreable questions")
        expect(page.locator("#content h1").first).to_have_text("Day 1 — Respiratory Anatomy & Physiology")
        page.get_by_role("button",name="Learn with instant feedback").click()
        expect(page.locator(".original-explanation")).to_have_count(0)
        page.locator("input[name=learn-choice][value=B]").check()
        expect(page.locator(".learn-feedback")).to_have_count(0)
        page.get_by_role("button",name="Check answer").click()
        expect(page.locator(".learn-feedback")).to_contain_text("Nice work")
        expect(page.locator(".original-explanation")).to_be_visible()
        expect(page.locator(".quiz-option.correct-choice")).to_contain_text("Correct answer")
        page.get_by_role("button",name="Next question").click()
        expect(page.locator(".original-explanation")).to_have_count(0)
        key=page.evaluate("""async()=>parseBank(await read(new URLSearchParams(location.search).get('doc'))).items[1].key""")
        wrong=next(letter for letter in "ABCD" if letter!=key)
        page.locator(f"input[name=learn-choice][value={wrong}]").check()
        page.get_by_role("button",name="Check answer").click()
        expect(page.locator(".learn-feedback")).to_contain_text("Good effort")
        page.once("dialog",lambda dialog:dialog.accept())
        page.get_by_role("button",name="Exit learning").click()
        expect(page.locator("#content")).to_be_visible()
        print("V7 untimed feedback, original explanations, correct/incorrect choice and topic title passed.",flush=True)
        page.get_by_role("button", name="Start timed practice").click()
        expect(page.locator("#content")).to_be_hidden()
        expect(page.locator(".original-explanation")).to_have_count(0)
        page.locator(".quiz-option input[value=B]").check()
        page.get_by_role("button", name="Bookmark").click()
        page.get_by_role("button", name="Submit test").click()
        expect(page.get_by_role("dialog")).to_be_visible()
        page.get_by_role("button", name="Keep practising").click()
        expect(page.locator(".quiz-option input[value=B]")).to_be_checked()
        page.get_by_role("button", name="Submit test").click()
        page.get_by_role("button", name="Submit and see results").click()
        expect(page.locator(".quiz-panel [role=status]")).to_contain_text("1 correct")
        expect(page.locator(".quiz-panel [role=status]")).to_contain_text("43 skipped")
        expect(page.locator(".result-heading")).to_be_visible()
        expect(page.locator(".result-score")).to_contain_text("1.00 / 44")
        expect(page.locator(".result-score")).to_contain_text("2.3%")
        expect(page.locator(".review-card").first.locator(".original-explanation")).to_be_visible()
        expect(page.locator(".review-card").first.locator(".answer-comparison")).to_contain_text("Your answer: B")
        expect(page.locator(".review-card").first.locator(".answer-comparison")).to_contain_text("Correct answer: B")
        expect(page.locator(".review-card").first.locator(".review-option.correct-choice")).to_contain_text("Your answer")
        # Compare the review's explanation with the exact parsed GitHub source block.
        original = page.evaluate("""async () => {
            const md = await read(new URLSearchParams(location.search).get('doc'));
            const q = parseBank(md).items[0], holder = document.createElement('div');
            holder.innerHTML=DOMPurify.sanitize(marked.parse(q.explanation,{gfm:true}),{ADD_TAGS:['details','summary'],FORBID_TAGS:['style','iframe','form'],FORBID_ATTR:['style','srcset']});
            return holder.textContent.trim();
        }""")
        assert page.locator(".review-card").first.locator(".explanation-body").text_content().strip()==original
        page.get_by_role("button",name="Incorrect (0)").click()
        expect(page.locator(".review-range")).to_have_text("No questions in this category.")
        page.get_by_role("button",name="Unanswered (43)").click()
        expect(page.locator(".review-card").first.locator(".answer-comparison")).to_contain_text("Not answered")
        page.get_by_role("button",name="All (44)").click()
        page.get_by_role("button",name="Next review page").click()
        expect(page.locator(".review-card").first).to_contain_text("Question 9 of 44")
        page.reload()
        expect(page.locator(".result-heading")).to_be_visible(timeout=30000)
        expect(page.locator(".result-score")).to_contain_text("1.00 / 44")
        page.get_by_role("button",name="Back to study material").click()
        expect(page.locator("#content")).to_be_visible()
        expect(page.get_by_role("button",name="Review saved result")).to_be_visible()
        print("Submit dialog, score percentage, source-exact answer review, review filters, pagination and saved result reload passed.",flush=True)
        # A second attempt checks the incorrect-answer review and negative net score.
        page.locator(".quiz-config input[type=checkbox]").check()
        page.once("dialog", lambda dialog: dialog.accept())
        page.get_by_role("button",name="Start timed practice").click()
        page.locator(".quiz-option input[value=A]").check()
        page.get_by_role("button",name="Save & exit").click()
        page.get_by_role("button",name="Resume saved attempt").click()
        expect(page.locator(".quiz-option input[value=A]")).to_be_checked()
        page.get_by_role("button",name="Submit test").click()
        page.get_by_role("button",name="Submit and see results").click()
        expect(page.locator(".result-score")).to_contain_text("-0.33 / 44")
        page.get_by_role("button",name="Incorrect (1)").click()
        expect(page.locator(".review-card")).to_have_count(1)
        expect(page.locator(".review-option.wrong-choice")).to_contain_text("Your answer")
        expect(page.locator(".review-option.correct-choice")).to_contain_text("Correct answer")
        expect(page.locator(".answer-comparison")).to_contain_text("Your answer: A")
        expect(page.locator(".answer-comparison")).to_contain_text("Correct answer: B")
        print("Incorrect answer highlighting, negative marking and saved attempt resume passed.",flush=True)

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
        page.route("https://api.github.com/repos/**/contents/**", lambda route: route.abort())
        page.goto(base + "?" + urlencode({"doc":"Chapters/Nursing-Foundations/Concepts/"}))
        ready(page)
        expect(page.locator(".file-card").first).to_be_visible()
        expect(page.locator("#sections [aria-current=page]")).to_have_text("Theory")
        page.unroute("https://api.github.com/repos/**/contents/**")
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
            if width<=600:
                expect(mobile.locator(".outline-card")).not_to_have_attribute("open","")
                mobile.locator(".outline-card summary").tap()
                expect(mobile.locator(".outline-card")).to_have_attribute("open","")
                mobile.locator(".outline-card summary").tap()
            expect(mobile.locator("#toggle")).to_be_visible()
            assert mobile.locator("#toggle").bounding_box()["height"] >= 43
            mobile.clock.install()
            mobile.locator(".quiz-config input[type=number]").fill("1")
            mobile.get_by_role("button", name="Start timed practice").tap()
            assert mobile.locator(".quiz-option").first.bounding_box()["height"] >= 51
            no_overflow(mobile)
            mobile.clock.fast_forward(61000)
            expect(mobile.locator(".quiz-panel [role=status]")).to_contain_text("44 skipped")
            expect(mobile.locator(".result-heading")).to_be_visible()
            expect(mobile.locator(".result-score")).to_contain_text("0.0%")
            expect(mobile.locator(".review-card").first.locator(".original-explanation")).to_be_visible()
            no_overflow(mobile)
            if width == 320:
                mobile.goto(base+"?metrics=1&chapter=Nursing-Foundations")
                expect(mobile.locator(".metric-record").first).to_be_visible(timeout=30000)
                no_overflow(mobile)
                mobile.goto(base+"?"+urlencode({"doc":"Chapters/Nursing-Foundations/Previous-Year-Questions/01-Nursing-Process-Reported-Evidence.md"}))
                ready(mobile)
                expect(mobile.locator(".pyq-card").first).to_be_visible()
                no_overflow(mobile)
                mobile.goto(base + "?" + urlencode({"doc": flow}))
                ready(mobile)
                small_chart=mobile.locator(".flowchart-card").first
                small_chart.scroll_into_view_if_needed()
                expect(small_chart).to_have_attribute("data-diagram-state", "ready", timeout=90000)
                no_overflow(mobile)
                assert mobile.locator(".reading-location").evaluate("(e) => getComputedStyle(e).position === 'sticky'")
            print(f'Touch layout {width}x{height}: search, theme persistence, reader controls, quiz targets and timer passed.', flush=True)
            ctx.close()
        browser.close()
        print("Desktop/mobile integration, real diagram, hidden answers, score, bookmark reload, and timer expiry passed.", flush=True)
finally:
    server.shutdown()
    server.server_close()
