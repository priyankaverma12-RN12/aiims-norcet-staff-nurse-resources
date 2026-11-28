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


def expand_chapter(page, kind="metric"):
    card=page.locator(".metric-chapter" if kind=="metric" else ".completion-chapter").first
    expect(card).to_be_visible(timeout=30000)
    if card.get_attribute("open") is None:
        card.locator(":scope > summary").click()
    return card

def expand_folders(page, kind="metric", only=None):
    card=expand_chapter(page,kind)
    groups=card.locator(".metric-category" if kind=="metric" else ".completion-category")
    expect(groups.first).to_be_visible()
    for group in groups.all():
        if only is None or group.get_attribute("data-kind")==only:
            if group.get_attribute("open") is None:
                group.locator(":scope > summary").click()
    return card

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
    # Compare public versioned assets with the exact checked-out deployment bytes.
    asset_versions={"styles.css":"12.5","app.js":"12.5","progress.js":"12.2","routine.js":"12.4","study-ui.js":"12.4","quiz.js":"12.3","media.js":"11.9.2","favicon.svg":"1"}
    for filename,version in asset_versions.items():
        response=api.get(urljoin(base,filename)+"?v="+version+"&build="+commit,headers={"Cache-Control":"no-cache"})
        assert response.ok and response.body()==(site/filename).read_bytes(), f"Published asset differs: {filename}"
        print("Published versioned asset exact readback:",filename,flush=True)
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
        expect(page.locator("#library")).to_be_hidden()
        expect(page.locator("#home #library")).to_have_count(0)
        expect(page.locator("#chapters .chapter")).to_have_count(0)
        for panel_id in ("#library-overview","#daily-panel","#recent-panel","#saved-panel"):
            expect(page.locator(panel_id)).to_have_attribute("open","")
        expect(page.locator(".daily-help")).to_have_count(0)
        for filename,version in asset_versions.items():
            assert page.evaluate("""([name,version])=>[...document.querySelectorAll('script[src],link[rel=stylesheet],link[rel=icon]')].some(e=>{const u=new URL(e.src||e.href);return u.pathname.endsWith('/'+name)&&u.searchParams.get('v')===version})""",[filename,version]), f"Wrong live asset version: {filename}"
        expect(page.locator(".daily-progress-label strong")).to_have_text("0 / 50 MCQs")
        expect(page.locator(".study-day")).to_have_count(7)
        expect(page.locator(".study-day-date")).to_have_count(7)
        expect(page.locator("#welcome-date")).to_have_text(__import__("re").compile(r"\d{4}"))
        expect(page.locator(".topbar .github-link")).to_have_count(0)
        expect(page.locator(".daily-target strong")).to_have_text("50 MCQs")
        expect(page.locator(".daily-total strong")).to_have_text("0 MCQs")
        expect(page.locator(".daily-goal-select select")).to_have_count(0)
        expect(page.locator("#home-link")).to_have_attribute("aria-current","page")
        expect(page.locator("#library-overview")).to_have_attribute("open","")
        assert page.locator(".stats").bounding_box()["height"]<=(255 if width<600 else 110)
        assert page.locator(".hero").bounding_box()["height"]<=(300 if width<600 else 240)
        assert page.locator(".stats").bounding_box()["y"]<page.locator("#daily-study").bounding_box()["y"]
        expect(page.locator(".daily-week-details")).not_to_have_attribute("open","")
        page.locator(".daily-week-details>summary").click()
        expect(page.locator(".study-day.today")).to_be_visible()
        page.locator(".daily-week-details>summary").click()
        print(f"V11.7 compact live overview and weekly disclosure passed at {width}x{height}.",flush=True)
        expect(page.locator("#mcq-total")).to_have_text(page.evaluate("(n)=>n.toLocaleString('en-IN')",expected["totals"]["mcq"]))
        page.locator("#library-link").click()
        expect(page.locator("#library .library-toolbar h1")).to_have_text("Chapters")
        expect(page.locator("#chapters .chapter").first).to_be_visible(timeout=30000)
        expect(page.locator("#home")).to_be_hidden()
        expect(page.locator("#library-link")).to_have_attribute("aria-current","page")
        assert "?library=1" in page.url
        page.goto(base+"?build="+commit+"#library")
        expect(page.locator("#chapters .chapter").first).to_be_visible(timeout=30000)
        expect(page.locator("#home")).to_be_hidden()
        assert "library=1" in page.url and not page.url.endswith("#library")
        print(f"V12.5 live dedicated Library and expanded Home passed at {width}x{height}.",flush=True)
        if width<600:
            expect(page.locator("#library-filters")).to_be_hidden()
            assert page.locator(".library-toolbar").bounding_box()["height"]<=60
            page.locator("#library-panel-toggle").click()
            expect(page.locator("#library-results")).to_be_hidden()
            page.locator("#library-search-toggle").click()
            expect(page.locator("#library-results")).to_be_visible()
            expect(page.locator("#library-filters")).to_be_visible()
        page.locator("#search").fill("no matching chapter xyz")
        expect(page.locator("#chapters .empty-state")).to_be_visible()
        page.locator("#clear-library").click()
        expect(page.locator("#chapters .chapter").first).to_be_visible()
        fit()
        # Library entry point: counts and controls must be reachable without using Progress first.
        respiratory=page.locator(".chapter-card").filter(has=page.locator(".chapter strong",has_text="Respiratory System"))
        expect(respiratory.locator(".chapter .resource-question-count")).to_contain_text("MCQs")
        if respiratory.locator(".chapter-card-details").get_attribute("open") is None:
            respiratory.locator(".chapter-card-details > summary").click()
        expect(respiratory.locator(".chapter-card-progress")).to_be_visible()
        library_ids=page.locator(".chapter-card .chapter").evaluate_all("els=>els.map(e=>new URL(e.href).searchParams.get('doc').split('/')[1])")
        assert len(library_ids)==len(set(library_ids)) and set(library_ids)=={c["id"] for c in expected["chapters"]}
        expect(page.locator("#chapter-total")).to_have_text(str(len(library_ids)))
        assert page.locator(".hero-copy").evaluate("e=>getComputedStyle(e).animationName")=="none"
        assert page.locator("#welcome-date").evaluate("e=>e.dateTime===localDay()")
        print(f"V11.5 exact complete chapter inventory and reduced-motion welcome passed at {width}x{height}.",flush=True)
        theory_all=[p for p,m in expected["resources"].items() if m["type"]=="Theory" and not m["draft"]]
        expect(page.locator("#theory-total")).to_have_text(str(len(theory_all)))
        for c in page.locator(".chapter-card .chapter").evaluate_all("""els=>els.map(e=>({id:new URL(e.href).searchParams.get('doc').split('/')[1],text:e.querySelector('.study-tag[data-role=theory-count]')?.textContent}))"""):
            n=sum(p.startswith("Chapters/"+c["id"]+"/") for p in theory_all)
            assert c["text"]==f"{n} theory topic{'s' if n!=1 else ''} · 0 done",c
        expect(respiratory.locator(".chapter-links a[data-study-section=Concepts] .study-tag[data-kind=theory]")).to_be_visible()
        resp=next(c for c in expected["chapters"] if c["id"]=="Respiratory-System")
        resp_mocks=[f for f in resp["records"] if f["category"]=="mock" and expected["resources"][f["path"]]["type"]=="Mock test" and not expected["resources"][f["path"]]["draft"]]
        expect(respiratory.locator(".chapter .study-tag[data-kind=mock]")).to_have_text(f"{len(resp_mocks)} mock tests · {sum(f['slots'] for f in resp_mocks):,} questions")
        # Check every displayed Library chapter against the actual deployment inventory.
        actual=page.locator(".chapter-card .chapter").evaluate_all("""els=>els.map(e=>({id:new URL(e.href).searchParams.get('doc').split('/')[1],text:e.querySelector('.study-tag[data-kind=mock]')?.textContent||''}))""")
        for item in actual:
            c=next(c for c in expected["chapters"] if c["id"]==item["id"])
            m=[f for f in c["records"] if f["category"]=="mock" and expected["resources"][f["path"]]["type"]=="Mock test" and not expected["resources"][f["path"]]["draft"]]
            q=sum(f["slots"] for f in m)
            assert item["text"]==f"{len(m)} mock test{'s' if len(m)!=1 else ''} · {q:,} question{'s' if q!=1 else ''}",item
        respiratory.get_by_role("link",name="Respiratory System MCQs",exact=True).click()
        ready()
        sample="Chapters/Respiratory-System/MCQs/Day-01-Complete-Respiratory-Anatomy-Physiology.md"
        bank=page.locator(".tracked-resource-card").filter(has=page.locator(".file-card strong",has_text="Day 1 — Respiratory Anatomy & Physiology")).first
        expect(bank.locator(".file-count")).to_have_text("44 questions")
        expect(bank.locator(".study-tag[data-role=type]")).to_have_text("MCQ practice")
        expect(bank.locator(".study-tag[data-role=status]")).to_have_text("Not started")
        bank.locator("input[type=checkbox]").check()
        expect(bank.locator(".study-tag[data-role=status]")).to_have_text("Completed")
        expect(bank.locator(".tracked-resource-line strong")).to_have_text("100%")
        assert page.evaluate("(p)=>loadCompletion()[p].slots",sample)==44
        # Marks from any study list must count toward the daily home goal immediately.
        page.goto(base+"?build="+commit)
        expect(page.locator(".daily-progress-label strong")).to_have_text("44 / 50 MCQs",timeout=30000)
        expect(page.locator(".daily-count-breakdown")).to_contain_text("0 answered here")
        expect(page.locator(".daily-count-breakdown")).to_contain_text("44 more marked done")
        expect(page.locator(".study-day.today strong")).to_have_text("44")
        expect(page.locator("#daily-study h2")).to_have_text("Almost there!")
        expect(page.locator(".daily-progress-label")).to_contain_text("6 remaining")
        expect(page.locator(".daily-total strong")).to_have_text("44 MCQs")
        # Marked completion and an actual answer in the same bank do not count twice.
        go({"doc":sample})
        ready()
        expect(page.locator("#content .difficulty-label[data-level=easy]").first).to_be_visible()
        expect(page.get_by_role("button",name="Start timed practice")).to_have_attribute("data-ui-icon","timer")
        assert page.get_by_role("button",name="Start timed practice").bounding_box()["height"]>=44
        page.get_by_role("button",name="Learn with instant feedback").click()
        page.locator("input[name=learn-choice][value=B]").check()
        page.get_by_role("button",name="Check answer").click()
        page.once("dialog",lambda d:d.accept())
        page.get_by_role("button",name="Exit learning").click()
        page.goto(base+"?build="+commit)
        expect(page.locator(".daily-progress-label strong")).to_have_text("44 / 50 MCQs",timeout=30000)
        expect(page.locator(".daily-count-breakdown")).to_contain_text("1 answered here")
        expect(page.locator(".daily-count-breakdown")).to_contain_text("43 more marked done")
        # Mark/unmark from a recent card on the home screen must refresh the goal without navigation.
        if page.locator("#recent-panel").get_attribute("open") is None:
            page.locator("#recent-panel > summary").click()
        recent=page.locator("#recent .tracked-resource-card").filter(has=page.locator("a[href*='Day-01-Complete-Respiratory-Anatomy-Physiology.md']")).first
        expect(recent.locator("input[type=checkbox]")).to_be_checked()
        recent.locator("input[type=checkbox]").uncheck()
        expect(page.locator(".daily-progress-label strong")).to_have_text("1 / 50 MCQs")
        recent.locator("input[type=checkbox]").check()
        expect(page.locator(".daily-progress-label strong")).to_have_text("44 / 50 MCQs")
        # Verify unmark/reset without corrupting the subsequent existing regression.
        go({"doc":sample.rsplit("/",1)[0]+"/"})
        ready()
        expect(bank.locator("input[type=checkbox]")).to_be_checked()

        page.reload()
        ready()
        expect(bank.locator("input[type=checkbox]")).to_be_checked()
        go({"doc":sample})
        ready()
        expect(page.locator("#reader-completion input")).to_be_checked()
        expect(page.locator(".quiz-bank-progress-line strong").last).to_have_text("100%")
        go({"metrics":"1","chapter":"Respiratory-System"})
        expand_folders(page,only="mcq")
        metric=page.locator(".tracked-resource-card").filter(has=page.locator(".metric-record-title",has_text="Day 1 — Respiratory Anatomy & Physiology")).first
        expect(metric.locator("input[type=checkbox]")).to_be_checked()
        page.once("dialog",lambda d:d.accept())
        metric.locator(".completion-reset").click()
        expect(metric.locator(".tracked-resource-line strong")).to_have_text("0%")
        page.goto(base+"?build="+commit)
        expect(page.locator(".daily-progress-label strong")).to_have_text("1 / 50 MCQs",timeout=30000)
        expect(page.locator(".daily-count-breakdown")).to_contain_text("0 more marked done")
        print(f"Daily manual mark, existing answer deduplication and reset verified at {width}x{height}.",flush=True)
        go({"doc":"Chapters/Respiratory-System/README.md"})
        ready()
        expect(page.locator(".resource-subtitle .resource-question-count")).to_contain_text("MCQs")
        page.locator(".compact-index input[type=search]").fill("Respiratory Anatomy")
        expect(page.locator(".index-resource-group[open]")).to_have_count(0)
        page.locator(".index-resource-group[data-kind=mcq]>summary").click()
        index=page.locator('.compact-index .index-resource-group[data-kind=mcq] .tracked-resource-card').filter(has=page.locator(f'input[data-progress-path="{sample}"]'))
        expect(index).to_have_count(1)
        expect(index).to_be_visible()
        expect(index.locator(".resource-question-count")).to_contain_text("44 MCQs")
        index.locator("input[type=checkbox]").check()
        expect(index.locator(".tracked-resource-line strong")).to_have_text("100%")
        index.locator("input[type=checkbox]").uncheck()
        expect(index.locator(".tracked-resource-line strong")).to_have_text("0%")
        fit()
        print(f"Library, directory, compact index, reader and Metrics synchronized completion controls and inventory counts passed at {width}x{height}.",flush=True)
        go({"progress":"1","chapter":chapter["id"]})
        expect(page.locator(".completion-stat").first).to_be_visible(timeout=30000)
        if width<=600:
            expect(page.locator("#progress-filter-toggle")).to_have_attribute("aria-expanded","false")
            expect(page.locator("#progress-filter-panel")).to_be_hidden()
            page.locator("#progress-filter-toggle").click()
            expect(page.locator("#progress-chapter")).to_be_visible()
        expect(page.locator(".completion-stat").first.locator("strong")).to_have_text("0%")
        expect(page.locator(".completion-chapter").first).not_to_have_attribute("open","")
        expand_chapter(page,"progress")
        expect(page.locator(".completion-category[open]")).to_have_count(0)
        for section in ["theory","mcq","mock","pyq"]:
            expect(page.locator(f".completion-category[data-kind={section}]")).to_have_count(1)
        expect(page.locator(".completion-resource")).to_have_count(0)
        for kind in ("theory","mcq","mock","pyq"):
            group=page.locator(f".completion-category[data-kind={kind}]")
            summary=group.locator(":scope > summary")
            assert summary.bounding_box()["height"]>=44
            summary.click()
            expect(page.locator(".completion-category[open]")).to_have_count(1)
            expect(group.locator(".completion-resource").first).to_be_visible()
            assert group.locator(".completion-resource input").evaluate_all("(els,k)=>els.every(e=>studyFolderKind(progressCatalog.find(r=>r.path===e.dataset.progressPath)?.kind)===k)",kind)
            summary.click()
        page.locator("#progress-kind").select_option("mcq")
        expand_folders(page,"progress","mcq")
        expect(page.locator(".completion-category[data-kind=theory]")).to_have_count(0)
        first=page.locator(".completion-resource").first
        expect(first).to_be_visible()
        first.locator("input[type=checkbox]").check()
        expect(page.locator(".completion-resource").first.locator("input")).to_be_checked()
        expect(page.locator(".completion-resource").first.locator(".completion-question-label strong")).to_have_text("100% covered")
        page.reload()
        expect(page.locator(".completion-chapter").first).not_to_have_attribute("open","")
        expand_folders(page,"progress","mcq")
        expect(page.locator(".completion-resource input:checked").first).to_be_visible(timeout=30000)
        if width<=600:
            expect(page.locator("#progress-filter-toggle")).to_have_attribute("aria-expanded","false")
            expect(page.locator("#progress-filter-panel")).to_be_hidden()
            page.locator("#progress-filter-toggle").click()
            expect(page.locator("#progress-filter")).to_be_visible()
        page.locator("#progress-filter").select_option("done")
        expand_folders(page,"progress","mcq")
        expect(page.locator(".completion-resource")).to_have_count(1)
        page.once("dialog",lambda d:d.accept())
        page.locator(".completion-resource .completion-reset").click()
        expect(page.locator(".completion-resource")).to_have_count(0)
        expect(page.locator(".completion-stat").first.locator("strong")).to_have_text("0%")
        fit()
        page.locator("#progress-filter").select_option("")
        page.locator("#progress-kind").select_option("mock")
        expand_folders(page,"progress","mock")
        mock=page.locator(".completion-resource").first
        expect(mock).to_be_visible()
        mock.locator("input[type=checkbox]").check()
        expect(page.locator(".completion-resource input:checked").first).to_be_visible()
        page.once("dialog",lambda d:d.accept())
        page.get_by_role("button",name="Reset chapter progress",exact=True).click()
        expect(page.locator(".completion-resource input:checked")).to_have_count(0)
        print(f"Published completion tracker {width}x{height}: mark done, coverage, reload, filtering and reset passed.",flush=True)
        go({"metrics":"1","chapter":chapter["id"]})
        expect(page.locator("#metrics-totals .metric-tile")).to_have_count(6,timeout=30000)
        expect(page.locator("#metrics-chapter")).to_have_value(chapter["id"])
        expect(page.locator(".metric-chapter").first).not_to_have_attribute("open","")
        expand_chapter(page)
        expect(page.locator(".metric-category[open]")).to_have_count(0)
        for kind in ("theory","mcq","mock","pyq"):
            group=page.locator(f".metric-category[data-kind={kind}]")
            expect(group).to_have_count(1)
            summary=group.locator(":scope > summary")
            assert summary.bounding_box()["height"]>=44
            summary.click()
            expect(page.locator(".metric-category[open]")).to_have_count(1)
            expect(group.locator(".metric-record").first).to_be_visible()
            assert group.locator(".metric-record").evaluate_all("(els,k)=>els.every(e=>studyFolderKind(e.dataset.category)===k)",kind)
            summary.click()
        expand_folders(page)
        records=page.locator(".metric-records a.metric-record:not([data-category=theory])")
        expect(records).to_have_count(len(chapter["records"]))
        actual=records.evaluate_all("""els=>els.map(e=>({path:new URL(e.href).searchParams.get('doc'),slots:Number(e.querySelector('.metric-record-count strong').textContent.replace(/,/g,''))}))""")
        assert sorted((r["path"],r["slots"]) for r in actual)==sorted((r["path"],r["slots"]) for r in chapter["records"])
        assert records.first.evaluate("""e=>{const s=getComputedStyle(e.closest('.tracked-resource-card')||e);return parseFloat(s.borderTopWidth)>0&&parseFloat(s.borderRadius)>0&&e.getBoundingClientRect().height>=44&&getComputedStyle(e).textDecorationLine==='none'}""")
        assert page.locator(".metric-records").first.evaluate("e=>getComputedStyle(e).gridTemplateColumns.split(' ').length")==(1 if width<900 else 2)
        expect(records.first.locator(".metric-record-title")).to_be_visible()
        expect(records.first.locator(".metric-record-count")).to_be_visible()
        expect(page.locator("#metrics-filter-panel")).to_be_hidden()
        expect(page.locator("#metrics-filter-toggle")).to_have_attribute("aria-expanded","false")
        page.locator("#metrics-filter-toggle").click()
        expect(page.locator("#metrics-filter-panel")).to_be_visible()
        page.locator("#metrics-category").select_option("mock")
        expand_folders(page,only="mock")
        expect(records).to_have_count(sum(r["category"]=="mock" for r in chapter["records"]))
        page.locator("#metrics-category").select_option("")
        expand_folders(page)
        expect(records).to_have_count(len(chapter["records"]))
        print(f"Published metrics resource cards {width}x{height}: exact counts, full links, responsive grid and filtering passed.",flush=True)

        mocks=[f for f in chapter["records"] if f["category"]=="mock" and expected["resources"][f["path"]]["type"]=="Mock test" and not expected["resources"][f["path"]]["draft"]]
        theory=[p for p,m in expected["resources"].items() if p.startswith("Chapters/"+chapter["id"]+"/") and m["type"]=="Theory" and not m["draft"]]
        expected_values=page.evaluate("(values)=>values.map(n=>n.toLocaleString('en-IN'))",[len(theory),chapter["totals"]["mcq"],len(mocks),chapter["totals"]["pyq"],chapter["totals"]["imported"],chapter["totals"]["embedded"]])
        expect(page.locator(".mock-question-total")).to_have_text(f"{sum(f['slots'] for f in mocks):,} questions")
        assert page.locator(".metric-tile strong").all_text_contents()==expected_values
        assert page.locator("#study-history-year option").count()>=5
        page.locator("#metrics-category").select_option("theory")
        expand_folders(page,only="theory")
        theory_cards=page.locator(".metric-record[data-category=theory]")
        expect(theory_cards).to_have_count(len(theory))
        actual_theory=theory_cards.evaluate_all("els=>els.map(e=>new URL(e.href).searchParams.get('doc'))")
        assert set(actual_theory)==set(theory)
        if theory:
            first_theory=page.locator(".tracked-resource-card").filter(has=theory_cards.first).first
            first_theory.locator("input[type=checkbox]").check()
            expect(page.locator(".theory-metric-completed")).to_contain_text("1 completed")
            first_theory.locator("input[type=checkbox]").uncheck()
            expect(page.locator(".theory-metric-completed")).to_contain_text("0 completed")
        if theory:
            go({"doc":theory[0]})
            ready()
            if width<=600:
                page.locator("#reader-panel-toggle-0").click()
            expect(page.locator("#sections a[data-study-section=Concepts] [data-role=theory-count]")).to_be_visible()
            expect(page.locator("#resource-subtitle [data-role=theory-count]")).to_have_text("1 theory topic · 0 done")
            page.locator("#reader-completion input[type=checkbox]").check()
            expect(page.locator("#resource-subtitle [data-role=theory-count]")).to_have_text("1 theory topic · 1 done")
            page.locator("#reader-completion input[type=checkbox]").uncheck()
            go({"metrics":"1","chapter":chapter["id"]})
            expect(page.locator(".theory-metric-completed")).to_contain_text("0 completed")
        if page.locator("#metrics-filter-panel").get_attribute("open") is None:
            page.locator("#metrics-filter-toggle").click()
        page.locator("#metrics-category").select_option("")
        print(f"Theory inventory, exact topic destinations and live completion count passed at {width}x{height}.",flush=True)

        assert page.locator(".metric-tile").first.evaluate("(e)=>getComputedStyle(e).animationName==='none'")
        fit()
        go({"doc":"Chapters/Nursing-Foundations/README.md"})
        ready()
        expect(page.locator(".compact-index")).to_be_visible()
        expect(page.locator(".index-resource-group[open]")).to_have_count(0)
        expect(page.locator(".outline-card")).not_to_have_attribute("open","")
        expect(page.locator("#original-index")).not_to_have_attribute("open","")
        for kind in ("theory","mcq","mock","pyq"):
            group=page.locator(f".index-resource-group[data-kind={kind}]")
            expect(group).to_have_count(1)
            summary=group.locator(":scope > summary")
            assert summary.bounding_box()["height"]>=44
            summary.click()
            expect(page.locator(".index-resource-group[open]")).to_have_count(1)
            expect(group.locator(".index-link-list")).to_be_visible()
            summary.click()
        outline_control="#reader-panel-toggle-1" if width<=600 else ".outline-card > summary"
        for selector in ("#original-index > summary",outline_control):
            assert page.locator(selector).bounding_box()["height"]>=44
        print(f"Published V11.8 closed and isolated folders and 44px targets passed at {width}x{height}.",flush=True)
        if width<600:
            expect(page.locator(".outline-card")).not_to_have_attribute("open","")
            page.locator("#reader-panel-toggle-1").click()
            expect(page.locator(".outline-card")).to_have_attribute("open","")
            page.locator("#reader-panel-toggle-1").click()
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
        expect(page.locator(".daily-progress-label strong")).to_have_text("1 / 50 MCQs",timeout=30000)
        expect(page.locator(".daily-action.primary-daily")).to_be_visible()
        expect(page.locator(".study-day.today strong")).to_have_text("1")
        go({"metrics":"1","chapter":"Respiratory-System"})
        expand_folders(page,only="mcq")
        expect(page.locator(".metric-record").filter(has_text="Day 1 — Respiratory Anatomy & Physiology").filter(has_text="1 / 44 practised").first).to_be_visible(timeout=30000)
        fit()
        # Return to the real bank: existing coverage persists, opening alone does not increase it.
        sample="Chapters/Respiratory-System/MCQs/Day-01-Complete-Respiratory-Anatomy-Physiology.md"
        go({"doc":sample})
        ready()
        expect(page.locator(".quiz-bank-progress small")).to_contain_text("1 / 44 checked")
        expect(page.locator(".quiz-bank-progress-line strong").last).to_have_text("2.3%")
        expect(page.locator(".quiz-bank-progress-line strong").first).to_have_text("In progress")
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
        expect(page.locator(".quiz-bank-progress-line strong").first).to_have_text("Completed")
        page.get_by_role("button",name="Finish learning").click()
        page.get_by_role("button",name="Back to study material").click()
        expect(page.locator("#reader-completion input")).to_be_checked()
        page.reload()
        ready()
        expect(page.locator(".quiz-bank-progress-line strong").last).to_have_text("100%")
        go({"progress":"1","chapter":"Respiratory-System"})
        if width<=600:
            page.locator("#progress-filter-toggle").click()
        page.locator("#progress-filter").select_option("done")
        expand_folders(page,"progress","mcq")
        expect(page.locator(".completion-resource")).to_have_count(1)
        expect(page.locator(".completion-resource .completion-question-label")).to_contain_text("44 / 44 checked")
        page.once("dialog",lambda d:d.accept())
        page.locator(".completion-resource .completion-reset").click()
        expect(page.locator(".completion-resource")).to_have_count(0)
        go({"doc":sample})
        ready()
        expect(page.locator(".quiz-bank-progress-line strong").last).to_have_text("0%")
        expect(page.locator(".quiz-bank-progress-line strong").first).to_have_text("Not started")
        # Submitted timed answers count, but tentative selections do not.
        page.get_by_role("button",name="Start timed practice").click()
        page.locator(".quiz-option input[value=B]").check()
        expect(page.locator(".quiz-bank-progress-line strong").last).to_have_text("0%")
        page.get_by_role("button",name="Submit test").click()
        page.get_by_role("button",name="Submit and see results").click()
        expect(page.locator(".quiz-bank-progress small")).to_contain_text("1 / 44 checked")
        page.reload()
        expect(page.locator(".quiz-bank-progress small")).to_contain_text("1 / 44 checked",timeout=30000)
        # A wrong answer can be practised immediately, without waiting for the revision date.
        go({"doc":sample})
        ready()
        page.get_by_role("button",name="Learn with instant feedback").click()
        page.locator("input[name=learn-choice][value=A]").check()
        page.get_by_role("button",name="Check answer").click()
        page.once("dialog",lambda d:d.accept())
        page.get_by_role("button",name="Exit learning").click()
        page.get_by_role("button",name="Review mistakes (1)",exact=True).click()
        expect(page.locator(".question-meta h3")).to_have_text("Question 1 / 1")
        page.locator("input[name=learn-choice][value=B]").check()
        page.get_by_role("button",name="Check answer").click()
        page.get_by_role("button",name="Finish learning").click()
        expect(page.locator(".result-heading")).to_have_text("Mistake review complete!")
        page.get_by_role("button",name="Back to study material").click()
        expect(page.get_by_role("button",name="Review mistakes (1)",exact=True)).to_have_count(0)
        print("Immediate mistake review and removal after correct answer passed.",flush=True)
        # Real five-question practice: one correct, four wrong, then review the exact same set.
        page.get_by_role("button",name="Quick 5-question practice").click()
        chosen=page.evaluate("""async()=>{const p=new URLSearchParams(location.search).get('doc'),b=parseBank(await read(p));return quickItems(loadRoutine(),p,b.items,'quick').map(q=>q.key)}""")
        for i,key in enumerate(chosen):
            answer=key if i==0 else next(x for x in "ABCD" if x!=key)
            page.locator(f"input[name=learn-choice][value={answer}]").check()
            page.get_by_role("button",name="Check answer").click()
            page.get_by_role("button",name="Finish learning" if i==4 else "Next question").click()
        expect(page.locator(".learning-result .result-score strong")).to_have_text("1 / 5")
        expect(page.locator(".learning-result .result-score")).to_contain_text("20.0% correct")
        expect(page.locator(".learning-greeting")).to_contain_text("needs more practice")
        expect(page.locator(".learning-result")).to_have_attribute("data-performance","review")
        expect(page.locator(".learning-result.result-celebration")).to_have_count(0)
        expect(page.locator(".learning-result .study-celebration,.learning-result .study-confetti")).to_have_count(0)
        expect(page.locator(".learning-result-stats")).to_contain_text("Incorrect")
        page.locator(".learning-missed-review > summary").click()
        expect(page.locator(".learning-missed-review .review-card")).to_have_count(4)
        expect(page.locator(".learning-missed-review .original-explanation")).to_have_count(4)
        page.get_by_role("button",name="Practise mistakes (4)",exact=True).click()
        expect(page.locator(".question-meta h3")).to_have_text("Question 1 / 4")
        for i,key in enumerate(chosen[1:]):
            page.locator(f"input[name=learn-choice][value={key}]").check()
            page.get_by_role("button",name="Check answer").click()
            page.get_by_role("button",name="Finish learning" if i==3 else "Next question").click()
        expect(page.locator(".learning-result .result-score strong")).to_have_text("4 / 4")
        expect(page.locator(".learning-result .result-score")).to_contain_text("100.0% correct")
        expect(page.locator(".learning-greeting")).to_have_text("Hurrah! Perfect score!")
        expect(page.locator(".learning-result.result-celebration")).to_be_visible()
        expect(page.locator(".learning-result > .study-celebration")).to_have_attribute("aria-hidden","true")
        expect(page.locator(".learning-result > .study-confetti")).to_have_count(0)
        assert page.locator(".learning-result .result-check").evaluate("(e)=>getComputedStyle(e).animationName==='none'")
        fit()
        print(f"Performance-based learning score, low-score coaching, exact missed-answer retry and perfect-score reward passed at {width}x{height}.",flush=True)
        # Daily total includes multiple banks and keeps increasing after 50.
        go({"doc":"Chapters/Nursing-Foundations/MCQs/01-Nursing-Process-and-Clinical-Judgment-20-MCQs.md"})
        ready()
        page.locator("#reader-completion input[type=checkbox]").check()
        page.goto(base+"?build="+commit)
        expect(page.locator(".daily-target strong")).to_have_text("50 MCQs",timeout=30000)
        expect(page.locator(".daily-total strong")).to_have_text("64 MCQs")
        expect(page.locator(".daily-progress-label strong")).to_have_text("64 / 50 MCQs")
        expect(page.locator(".daily-progress-label")).to_contain_text("14 extra MCQs")
        expect(page.locator("#daily-study h2")).to_have_text("Hurrah! Goal exceeded!")
        expect(page.locator(".daily-congratulations .study-celebration")).to_be_visible()
        expect(page.locator(".daily-congratulations .study-confetti")).to_have_count(0)
        expect(page.locator(".daily-goal-status")).to_contain_text("128%")
        expect(page.locator(".study-day.today strong")).to_have_text("64")
        expect(page.locator(".daily-milestone[data-reached=true]")).to_have_count(4)
        fit()
        print(f"Fixed 50-MCQ goal, uncapped 64-question daily total, motivational milestones and mobile fit passed at {width}x{height}.",flush=True)
        # Page-wise polish: active navigation, filter reset, focus mode and reading preferences.
        go({"metrics":"1"})
        expect(page.locator("#metrics-link")).to_have_attribute("aria-current","page")
        expect(page.locator(".metric-chapter").first).to_be_visible(timeout=30000)
        expect(page.locator(".metric-record")).to_have_count(0)
        page.locator(".metric-chapter > summary").first.click()
        expect(page.locator(".metric-category[open]")).to_have_count(0)
        expect(page.locator(".metric-record")).to_have_count(0)
        expect(page.locator(".metric-category").first).to_be_visible(timeout=10000)
        assert page.locator(".metric-category").count()>=4
        expect(page.locator("#metrics-filter-panel")).to_be_hidden()
        page.locator("#metrics-filter-toggle").click()
        page.locator("#metrics-search").fill("no matching topic xyz")
        expect(page.locator("#metrics-list .empty-state")).to_be_visible()
        page.locator("#clear-metrics").click()
        expect(page.locator("#metrics-search")).to_have_value("")
        page.keyboard.press("Escape")
        expect(page.locator("#metrics-filter-panel")).to_be_hidden()
        expect(page.locator(".history-period")).to_have_count(3)
        print(f"V12.4 live Metrics filter and compact activity passed at {width}x{height}.",flush=True)
        fit()
        go({"progress":"1","chapter":"Respiratory-System"})
        expect(page.locator("#progress-link")).to_have_attribute("aria-current","page")
        if width<=600:
            filter_icon=page.locator("#progress-filter-toggle")
            expect(filter_icon).to_have_attribute("aria-expanded","false")
            expect(page.locator("#progress-filter-panel")).to_be_hidden()
            expect(page.locator("#progress-filter-panel>summary")).to_be_hidden()
            assert filter_icon.bounding_box()["width"]>=44
            assert filter_icon.bounding_box()["height"]>=44
            filter_icon.click()
            expect(page.locator("#progress-chapter")).to_have_value("Respiratory-System")
        for panel_id,inside in (("#progress-summary-panel","#progress-summary"),("#progress-filter-panel","#progress-search")):
            panel=page.locator(panel_id)
            summary=page.locator("#progress-filter-toggle") if panel_id=="#progress-filter-panel" and width<=600 else panel.locator(":scope > summary")
            assert summary.bounding_box()["height"]>=44
            summary.click()
            expect(page.locator(inside)).to_be_hidden()
            summary.click()
            expect(page.locator(inside)).to_be_visible()
            fit()
        page.locator("#progress-search").fill("no matching topic xyz")
        expect(page.locator("#progress-list .empty-state")).to_be_visible()
        if width<=600:
            filter_icon.click()
            expect(page.locator("#progress-filter-panel")).to_be_hidden()
            expect(page.locator("#progress-list .empty-state")).to_be_visible()
            filter_icon.click()
            expect(page.locator("#progress-search")).to_have_value("no matching topic xyz")
            print(f"V12.1 live compact progress filter and preserved selections passed at {width}x{height}.",flush=True)
        page.locator("#clear-progress").click()
        expect(page.locator("#progress-search")).to_have_value("")
        expect(page.locator("#progress-chapter")).to_have_value("")
        go({"doc":sample})
        ready()
        expect(page.locator("#library-link")).to_have_attribute("aria-current","page")
        if width<=600:
            for i,panel_id in enumerate(("#reader-sections-panel","#reader-outline-panel","#reading-tools-panel")):
                icon=page.locator(f"#reader-panel-toggle-{i}")
                expect(icon).to_have_attribute("aria-expanded","false")
                expect(page.locator(panel_id)).to_be_hidden()
                assert icon.bounding_box()["height"]>=44
                icon.click()
                expect(page.locator(panel_id)).to_be_visible()
                icon.click()
                expect(page.locator(panel_id)).to_be_hidden()
            expect(page.locator(".practice-intro")).to_be_hidden()
            expect(page.locator(".mobile-bank-context")).not_to_have_attribute("open","")
            assert page.locator(".mobile-bank-context + h3").bounding_box()["y"]<height
            page.locator("#reader-panel-toggle-2").click()
        else:
            for panel_id,inside in (("#reader-sections-panel","#sections"),("#reading-tools-panel","#reading-size")):
                panel=page.locator(panel_id)
                summary=panel.locator(":scope > summary")
                assert summary.bounding_box()["height"]>=44
                summary.click()
                expect(page.locator(inside)).to_be_hidden()
                summary.click()
                expect(page.locator(inside)).to_be_visible()
        page.locator("#reading-size").select_option("large")
        expect(page.locator("body")).to_have_attribute("data-reading-size","large")
        page.locator("#focus-study").click()
        expect(page.locator("#reader-aside")).not_to_be_visible()
        expect(page.locator("#focus-study")).to_have_attribute("aria-pressed","true")
        page.keyboard.press("Escape")
        expect(page.locator("#focus-study")).to_have_attribute("aria-pressed","false")
        if width>600:
            expect(page.locator("#reader-aside")).to_be_visible()
        else:
            expect(page.locator("#reader-panel-toggle-2")).to_be_visible()
        page.reload()
        ready()
        if width<=600:
            expect(page.locator("#reading-tools-panel")).to_be_hidden()
            page.locator("#reader-panel-toggle-2").click()
        expect(page.locator("#reading-size")).to_have_value("large")
        page.locator("#reading-size").select_option("normal")
        if width<=600:
            page.locator("#reader-panel-toggle-2").click()
            expect(page.locator(".study-mode-guide")).to_be_hidden()
        else:
            expect(page.locator(".study-mode-guide")).to_be_visible()
        fit()
        print(f"V11 home, library, chapter tabs, reader controls, practice, metrics and progress polish passed at {width}x{height}.",flush=True)
        # Cross-tab completion and saved question practice with real source.
        page.get_by_role("button",name="Quick 5-question practice").click()
        expect(page.locator(".question-meta h3")).to_have_text("Question 1 / 5")
        stem=page.locator(".question-stem").first.text_content()
        bookmark_stem=page.locator("button[data-bookmark-stem]").first.get_attribute("data-bookmark-stem")
        assert bookmark_stem
        page.locator("button[data-bookmark-stem]").first.click()
        expect(page.locator("button[data-bookmark-stem]").first).to_have_attribute("aria-pressed","true")
        other=ctx.new_page()
        other.goto(base+"?build="+commit+"#bookmarks")
        expect(other.locator("#marks .saved-practice-link").first).to_be_visible(timeout=30000)
        other.locator("#marks .saved-practice-link").first.click()
        expect(other.locator(".question-meta h3")).to_have_text("Question 1 / 1",timeout=30000)
        expect(other.locator(".question-stem").first).to_have_text(stem)
        assert other.locator(".question-stem").first.text_content()==stem
        assert other.locator(".question-stem").first.evaluate("""e=>!Array.from(e.textContent).some(c=>{const n=c.codePointAt(0);return n===0xfffd||(n>=0xd800&&n<=0xdfff)})""")
        expect(other.locator("button[data-bookmark-stem]").first).to_have_attribute("data-bookmark-stem",bookmark_stem)
        expect(other.get_by_role("button",name="Check answer")).to_be_disabled()
        other.locator("button[data-bookmark-stem]").first.click()
        expect(page.locator("button[data-bookmark-stem]").first).to_have_attribute("aria-pressed","false")
        other.close()
        go({"doc":sample})
        ready()
        second=ctx.new_page()
        second.goto(base+"?"+urlencode({"doc":sample,"build":commit}))
        expect(second.locator("#reader-completion input")).to_be_visible(timeout=30000)
        if second.locator("#reader-completion input").is_checked():
            second.locator("#reader-completion input").uncheck()
            expect(page.locator("#reader-completion input")).not_to_be_checked()
        second.locator("#reader-completion input").check()
        expect(page.locator("#reader-completion input")).to_be_checked()
        expect(page.locator(".quiz-bank-progress-line strong").last).to_have_text("100%")
        second.close()
        # Test genuine dark mode and reduced-motion CSS without changing study data.
        if page.locator("html").get_attribute("data-theme")!="dark":
            page.locator("#theme").click()
        expect(page.locator("html")).to_have_attribute("data-theme","dark")
        fit()
        assert page.locator(".reader-head").evaluate("e=>getComputedStyle(e).animationName")== "none"
        # Exercise named anchors with a real browser DOM; actual historical source aliases remain covered by PR8 tests.
        assert page.evaluate("""()=>{const root=document.createElement('div'),p=document.createElement('p'),a=document.createElement('a'),h=document.createElement('h2');a.name='old heading';p.append(a);root.append(p,h);return studyFragmentTarget(root,'#old%20heading')===h&&studyFragmentTarget(root,'#%zz')===null}""")
        print(f"V11.1 cross-tab completion, saved-question practice, fragment resolver and dark reduced-motion UI passed at {width}x{height}.",flush=True)




        print(f"Automatic bank completion, cumulative coverage, remaining questions, reload, chapter tracker and reset passed at {width}x{height}.",flush=True)
        print(f"Published V8 UI {width}x{height}: chapter metrics, compact index, original source links, PYQ answers, reduced motion and responsive layout passed.",flush=True)
        ctx.close()
    browser.close()
