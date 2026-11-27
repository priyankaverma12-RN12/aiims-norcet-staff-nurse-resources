"""Run browser integration checks on a local static server, using live public sources."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path
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
        page.reload()
        ready(page)
        page.get_by_role("button", name="Resume saved attempt").click()
        expect(page.locator(".quiz-option input[value=B]")).to_be_checked()
        expect(page.locator("#content")).to_be_hidden()
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
        desktop.close()
        for width, height in [(390, 844), (320, 720)]:
            ctx = browser.new_context(viewport={"width": width, "height": height}, is_mobile=True, has_touch=True)
            mobile = ctx.new_page()
            mobile.goto(base)
            expect(mobile.locator("#chapters .chapter").first).to_be_visible(timeout=30000)
            no_overflow(mobile)
            mobile.goto(base + "?" + urlencode({"doc": sample}))
            ready(mobile)
            no_overflow(mobile)
            mobile.clock.install()
            mobile.locator(".quiz-config input[type=number]").fill("1")
            mobile.get_by_role("button", name="Start timed practice").click()
            no_overflow(mobile)
            mobile.clock.fast_forward(61000)
            expect(mobile.locator(".quiz-panel [role=status]")).to_contain_text("44 skipped")
            no_overflow(mobile)
            ctx.close()
        browser.close()
        print("Desktop/mobile integration, real diagram, hidden answers, score, bookmark reload, and timer expiry passed.", flush=True)
finally:
    server.shutdown()
    server.server_close()
