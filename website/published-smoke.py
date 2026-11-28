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
    for filename,wanted in [("study-metrics.json",expected),("source-audit.json",audit),("title-audit.json",json.loads((site/"title-audit.json").read_text(encoding="utf-8")))]:
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
        page.goto(base+"?build="+commit)
        expect(page.locator("#daily-study .daily-action").first).to_be_visible(timeout=30000)
        expect(page.locator(".daily-progress-label strong")).to_have_text("0 / 10 questions")
        expect(page.locator(".study-day")).to_have_count(7)
        page.locator(".daily-goal-select select").select_option("5")
        expect(page.locator(".daily-progress-label strong")).to_have_text("0 / 5 questions")
        fit()
        go({"metrics":"1","chapter":chapter["id"]})
        expect(page.locator("#metrics-totals .metric-tile")).to_have_count(5,timeout=30000)
        expect(page.locator("#metrics-chapter")).to_have_value(chapter["id"])
        records=page.locator(".metric-records > a.metric-record")
        expect(records).to_have_count(len(chapter["records"]))
        actual=records.evaluate_all("""els=>els.map(e=>({path:new URL(e.href).searchParams.get('doc'),slots:Number(e.querySelector('.metric-record-count strong').textContent.replace(/,/g,''))}))""")
        assert actual==[{"path":r["path"],"slots":r["slots"]} for r in chapter["records"]]
        assert records.first.evaluate("""e=>{const s=getComputedStyle(e);return parseFloat(s.borderTopWidth)>0&&parseFloat(s.borderRadius)>0&&e.getBoundingClientRect().height>=44&&s.textDecorationLine==='none'}""")
        assert page.locator(".metric-records").first.evaluate("e=>getComputedStyle(e).gridTemplateColumns.split(' ').length")==(1 if width<900 else 2)
        expect(records.first.locator(".metric-record-title")).to_be_visible()
        expect(records.first.locator(".metric-record-count")).to_be_visible()
        page.locator("#metrics-category").select_option("mock")
        expect(records).to_have_count(sum(r["category"]=="mock" for r in chapter["records"]))
        page.locator("#metrics-category").select_option("")
        expect(records).to_have_count(len(chapter["records"]))
        print(f"Published metrics resource cards {width}x{height}: exact counts, full links, responsive grid and filtering passed.",flush=True)

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
        go({"doc":"Chapters/Respiratory-System/MCQs/Day-01-Complete-Respiratory-Anatomy-Physiology.md"})
        ready()
        expect(page.locator("#content h1").first).to_have_text("Day 1 — Respiratory Anatomy & Physiology")
        expect(page.locator(".practice-topic")).to_have_text("Day 1 — Respiratory Anatomy & Physiology")
        page.get_by_role("button",name="Learn with instant feedback").click()
        page.locator("input[name=learn-choice][value=B]").check()
        page.get_by_role("button",name="Check answer").click()
        expect(page.locator(".learn-feedback")).to_contain_text("Nice work")
        assert page.locator(".learn-feedback").evaluate("(e)=>getComputedStyle(e).animationName==='none'")
        expect(page.locator(".original-explanation")).to_be_visible()
        assert page.locator(".explanation-body").text_content().strip()==page.evaluate("""async()=>{const q=parseBank(await read(new URLSearchParams(location.search).get('doc'))).items[0];const h=document.createElement('div');h.innerHTML=DOMPurify.sanitize(marked.parse(q.explanation,{gfm:true}),{ADD_TAGS:['details','summary'],FORBID_TAGS:['style','iframe','form'],FORBID_ATTR:['style','srcset']});return h.textContent.trim()}""")
        fit()
        assert page.evaluate("routineCount(loadRoutine())")==1
        page.goto(base+"?build="+commit)
        expect(page.locator(".daily-progress-label strong")).to_have_text("1 / 5 questions",timeout=30000)
        expect(page.locator(".daily-action.primary-daily")).to_be_visible()
        fit()
        print(f"Published V8 UI {width}x{height}: chapter metrics, compact index, original source links, PYQ answers, reduced motion and responsive layout passed.",flush=True)
        ctx.close()
    browser.close()
