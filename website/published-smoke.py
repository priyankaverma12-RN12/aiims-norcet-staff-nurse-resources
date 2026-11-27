"""Verify the actual published UI and exact deployment inventory, not just a local fixture."""
import json
import os
import time
from pathlib import Path
from urllib.parse import urlencode, urljoin
from playwright.sync_api import sync_playwright, expect

site=Path(__file__).resolve().parent
base=os.environ["SITE_URL"].rstrip("/")+"/"
expected=json.loads((site/"study-metrics.json").read_text(encoding="utf-8"))
audit=json.loads((site/"source-audit.json").read_text(encoding="utf-8"))
commit=expected["sourceCommit"]
assert commit==os.environ["GITHUB_SHA"], "Inventory checkout differs from deployment commit"
chapter=next(c for c in expected["chapters"] if c["id"]=="Nursing-Foundations")
for c in expected["chapters"]:
    for key,total in c["totals"].items():
        assert total==sum(f["slots"] for f in c["records"] if f["category"]==key)
    print("LIVE INVENTORY CHAPTER:",c["id"],json.dumps(c["totals"],sort_keys=True),flush=True)

with sync_playwright() as p:
    api=p.request.new_context(timeout=30000)
    for filename,wanted in [("study-metrics.json",expected),("source-audit.json",audit)]:
        for attempt in range(8):
            try:
                response=api.get(urljoin(base,filename)+"?build="+commit,headers={"Cache-Control":"no-cache"})
                if response.ok and response.json()==wanted:
                    break
            except Exception:
                pass
            time.sleep(4)
        else:
            raise AssertionError("Published JSON does not exactly match deployment snapshot: "+filename)
        print("Published JSON exact readback:",filename,flush=True)
    api.dispose()
    browser=p.chromium.launch()
    for width,height in [(1440,900),(390,844)]:
        ctx=browser.new_context(viewport={"width":width,"height":height},is_mobile=width<600,has_touch=width<600,reduced_motion="reduce")
        page=ctx.new_page()
        def go(params):
            page.goto(base+"?"+urlencode({**params,"build":commit}),wait_until="domcontentloaded")
        def ready():
            expect(page.locator("#status")).to_have_text(__import__("re").compile(r"^Live source"),timeout=30000)
        def fit():
            assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth+2"),"Horizontal overflow"
        go({"metrics":"1","chapter":chapter["id"]})
        expect(page.locator("#metrics-totals .metric-tile")).to_have_count(5,timeout=30000)
        expect(page.locator("#metrics-chapter")).to_have_value(chapter["id"])
        expected_values=page.evaluate("(values)=>values.map(n=>n.toLocaleString('en-IN'))",[chapter["totals"][k] for k in ["mcq","mock","pyq","imported","embedded"]])
        assert page.locator(".metric-tile strong").all_text_contents()==expected_values
        assert page.locator(".metric-tile").first.evaluate("(e)=>getComputedStyle(e).animationName==='none'")
        fit()
        go({"doc":"Chapters/Nursing-Foundations/README.md"})
        ready()
        expect(page.locator(".compact-index")).to_be_visible()
        expect(page.locator("#original-index")).not_to_have_attribute("open","")
        if width<600:
            expect(page.locator(".outline-card")).not_to_have_attribute("open","")
            page.locator(".outline-card summary").click()
            expect(page.locator(".outline-card")).to_have_attribute("open","")
            page.locator(".outline-card summary").click()
        page.locator("#original-index > summary").click()
        expect(page.locator("#original-index")).to_have_attribute("open","")
        assert page.locator("#original-index a[href]").count()>0
        fit()
        go({"doc":"Chapters/Nursing-Foundations/Previous-Year-Questions/01-Nursing-Process-Reported-Evidence.md"})
        ready()
        card=page.locator(".pyq-card").first
        expect(card.locator(".pyq-options li")).to_have_count(4)
        expect(card.locator(".pyq-exam-source a")).to_be_visible()
        explanation=card.locator(".pyq-explanation")
        expect(explanation).not_to_have_attribute("open","")
        explanation.locator("summary").first.click()
        expect(explanation.locator(".video-link").first).to_be_visible()
        assert explanation.evaluate("""d=>[...d.querySelectorAll('.pyq-source-links a')].every(link=>[...d.querySelectorAll('a')].some(original=>!original.closest('.pyq-source-links')&&original.href===link.href))""")
        fit()
        print(f"Published V6 UI {width}x{height}: chapter metrics, compact index, original source links, PYQ answers, reduced motion and responsive layout passed.",flush=True)
        ctx.close()
    browser.close()
