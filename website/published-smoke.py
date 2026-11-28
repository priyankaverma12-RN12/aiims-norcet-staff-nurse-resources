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
        # Library entry point: counts and controls must be reachable without using Progress first.
        respiratory=page.locator(".chapter-card").filter(has=page.locator(".chapter strong",has_text="Respiratory System"))
        expect(respiratory.locator(".chapter .resource-question-count")).to_contain_text("MCQs")
        expect(respiratory.locator(".chapter-card-progress")).to_be_visible()
        respiratory.get_by_role("link",name="Respiratory System MCQs",exact=True).click()
        ready()
        sample="Chapters/Respiratory-System/MCQs/Day-01-Complete-Respiratory-Anatomy-Physiology.md"
        bank=page.locator(".tracked-resource-card").filter(has=page.locator(".file-card strong",has_text="Day 1 — Respiratory Anatomy & Physiology")).first
        expect(bank.locator(".file-count")).to_have_text("44 questions")
        bank.locator("input[type=checkbox]").check()
        expect(bank.locator(".tracked-resource-line strong")).to_have_text("100%")
        assert page.evaluate("(p)=>loadCompletion()[p].slots",sample)==44
        page.reload()
        ready()
        expect(bank.locator("input[type=checkbox]")).to_be_checked()
        go({"doc":sample})
        ready()
        expect(page.locator("#reader-completion input")).to_be_checked()
        expect(page.locator(".quiz-bank-progress-line strong").last).to_have_text("100%")
        go({"metrics":"1","chapter":"Respiratory-System"})
        metric=page.locator(".tracked-resource-card").filter(has=page.locator(".metric-record-title",has_text="Day 1 — Respiratory Anatomy & Physiology")).first
        expect(metric.locator("input[type=checkbox]")).to_be_checked()
        page.once("dialog",lambda d:d.accept())
        metric.locator(".completion-reset").click()
        expect(metric.locator(".tracked-resource-line strong")).to_have_text("0%")
        go({"doc":"Chapters/Respiratory-System/README.md"})
        ready()
        expect(page.locator(".resource-subtitle .resource-question-count")).to_contain_text("MCQs")
        page.locator(".compact-index input").fill("Respiratory Anatomy")
        index=page.locator(".compact-index .tracked-resource-card").filter(has=page.locator("a[href*='Day-01-Complete-Respiratory-Anatomy-Physiology.md']")).first
        expect(index.locator(".resource-question-count")).to_contain_text("44 MCQs")
        index.locator("input[type=checkbox]").check()
        expect(index.locator(".tracked-resource-line strong")).to_have_text("100%")
        index.locator("input[type=checkbox]").uncheck()
        expect(index.locator(".tracked-resource-line strong")).to_have_text("0%")
        fit()
        print(f"Library, directory, compact index, reader and Metrics synchronized completion controls and inventory counts passed at {width}x{height}.",flush=True)
        go({"progress":"1","chapter":chapter["id"]})
        expect(page.locator(".completion-stat").first).to_be_visible(timeout=30000)
        expect(page.locator(".completion-stat").first.locator("strong")).to_have_text("0%")
        page.locator("#progress-kind").select_option("mcq")
        first=page.locator(".completion-resource").first
        expect(first).to_be_visible()
        first.locator("input[type=checkbox]").check()
        expect(page.locator(".completion-resource").first.locator("input")).to_be_checked()
        expect(page.locator(".completion-resource").first.locator(".completion-question-label strong")).to_have_text("100% covered")
        page.reload()
        expect(page.locator(".completion-resource input:checked").first).to_be_visible(timeout=30000)
        page.locator("#progress-filter").select_option("done")
        expect(page.locator(".completion-resource")).to_have_count(1)
        page.once("dialog",lambda d:d.accept())
        page.locator(".completion-resource .completion-reset").click()
        expect(page.locator(".completion-resource")).to_have_count(0)
        expect(page.locator(".completion-stat").first.locator("strong")).to_have_text("0%")
        fit()
        page.locator("#progress-filter").select_option("")
        page.locator("#progress-kind").select_option("mock")
        mock=page.locator(".completion-resource").first
        expect(mock).to_be_visible()
        mock.locator("input[type=checkbox]").check()
        expect(page.locator(".completion-resource input:checked").first).to_be_visible()
        page.once("dialog",lambda d:d.accept())
        page.get_by_role("button",name="Reset chapter progress",exact=True).click()
        expect(page.locator(".completion-resource input:checked")).to_have_count(0)
        print(f"Published completion tracker {width}x{height}: mark done, coverage, reload, filtering and reset passed.",flush=True)
        go({"metrics":"1","chapter":chapter["id"]})
        expect(page.locator("#metrics-totals .metric-tile")).to_have_count(5,timeout=30000)
        expect(page.locator("#metrics-chapter")).to_have_value(chapter["id"])
        records=page.locator(".metric-records a.metric-record")
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
        expect(page.locator(".study-day.today strong")).to_have_text("1")
        go({"metrics":"1","chapter":"Respiratory-System"})
        expect(page.locator(".metric-record").filter(has_text="Day 1 — Respiratory Anatomy & Physiology").filter(has_text="1 / 44 practised").first).to_be_visible(timeout=30000)
        fit()
        # Return to the real bank: existing coverage persists, opening alone does not increase it.
        sample="Chapters/Respiratory-System/MCQs/Day-01-Complete-Respiratory-Anatomy-Physiology.md"
        go({"doc":sample})
        ready()
        expect(page.locator(".quiz-bank-progress small")).to_contain_text("1 / 44 checked")
        expect(page.locator(".quiz-bank-progress-line strong").last).to_have_text("2.3%")
        page.get_by_role("button",name="Continue remaining 43 questions").click()
        expect(page.locator(".question-meta h3")).to_have_text("Question 1 / 43")
        for j in range(43):
            page.locator("input[name=learn-choice][value=B]").check()
            page.get_by_role("button",name="Check answer").click()
            if j<42:
                page.get_by_role("button",name="Next question").click()
        expect(page.locator(".quiz-bank-progress-line strong").last).to_have_text("100%")
        expect(page.locator(".quiz-bank-progress small")).to_contain_text("44 / 44 checked")
        expect(page.locator(".quiz-bank-progress")).to_have_class(__import__("re").compile("is-completed"))
        page.get_by_role("button",name="Finish learning").click()
        page.get_by_role("button",name="Back to study material").click()
        expect(page.locator("#reader-completion input")).to_be_checked()
        page.reload()
        ready()
        expect(page.locator(".quiz-bank-progress-line strong").last).to_have_text("100%")
        go({"progress":"1","chapter":"Respiratory-System"})
        page.locator("#progress-filter").select_option("done")
        expect(page.locator(".completion-resource")).to_have_count(1)
        expect(page.locator(".completion-resource .completion-question-label")).to_contain_text("44 / 44 checked")
        page.once("dialog",lambda d:d.accept())
        page.locator(".completion-resource .completion-reset").click()
        expect(page.locator(".completion-resource")).to_have_count(0)
        go({"doc":sample})
        ready()
        expect(page.locator(".quiz-bank-progress-line strong").last).to_have_text("0%")
        # Submitted timed answers count, but tentative selections do not.
        page.get_by_role("button",name="Start timed practice").click()
        page.locator(".quiz-option input[value=B]").check()
        expect(page.locator(".quiz-bank-progress-line strong").last).to_have_text("0%")
        page.get_by_role("button",name="Submit test").click()
        page.get_by_role("button",name="Submit and see results").click()
        expect(page.locator(".quiz-bank-progress small")).to_contain_text("1 / 44 checked")
        page.reload()
        expect(page.locator(".quiz-bank-progress small")).to_contain_text("1 / 44 checked",timeout=30000)
        print(f"Automatic bank completion, cumulative coverage, remaining questions, reload, chapter tracker and reset passed at {width}x{height}.",flush=True)
        print(f"Published V8 UI {width}x{height}: chapter metrics, compact index, original source links, PYQ answers, reduced motion and responsive layout passed.",flush=True)
        ctx.close()
    browser.close()
