# Nursing Study Hub — premium study workspace

Live website: https://priyankaverma12-rn12.github.io/aiims-norcet-staff-nurse-resources/

The website reads the public repository's main branch at runtime. The 35 chapter packages and their original Markdown, evidence labels, diagrams, answer keys and study status remain the single source of truth.

## Interface
A responsive dashboard organizes chapter cards by the eight curriculum workstreams discovered in the original index. Search and filter by study area, jump straight to theory, MCQs, mocks, PYQs and revision, or continue recent documents. Reader pages have section tabs, an outline on wider screens, and searchable resource folders. Dark/light preference, bookmarks, saved attempts and recent reading are device-local. The dashboard counts library entries and device-local activity only, not syllabus completion. Unsupported quiz formats remain in reading mode.

## Practice
The source-key parser, negative marking, countdown, expiry, saved-attempt validation and original rationale review remain in place. Question progress reflects answered questions, not score before submission. No clinical or exam provenance edits.

## Preview and verification
Serve the repository locally with `python -m http.server 8000` and open http://localhost:8000/website/. Internet access is required for live Markdown and the pinned Markdown/sanitizer libraries. Anonymous GitHub directory API requests may be rate limited. Run `node --check website/app.js`, `node --check website/quiz.js`, `node website/quiz.test.cjs`, and `python website/browser-smoke.py` after installing Playwright Chromium.

The existing Pages workflow runs the browser gate before deploying website/ from main. It checks actual source navigation, real diagram loading, scoring, hidden answers, bookmarks, timer expiry and responsive layouts. The premium UI adds search, group filtering and recent-reading checks. The previous production build passed all 35 chapter pages and the live homepage check in run 46013632909. Verify a new run before claiming the premium build is live. No other jobs or study files should change.

## Mobile-first refinement

Phone and touch layouts use 44px minimum key control targets, 52px answer rows, 16px form text, responsive resource shortcuts, and horizontally scrollable study tables. The deployment gate now checks five emulated touch viewports (320, 390, 430, 768 and 844px wide), including phone landscape and tablet, along with search, persisted theme, answer controls and timer expiry. These are emulation tests, not physical-device certification.

## Navigation and media reliability
The reader now has clickable breadcrumbs, highlighted resource tabs and an active section indicator, a collapsible page outline and a back-to-top control. Mermaid diagrams are rendered on demand using a pinned Mermaid version in strict mode and displayed as SVG images; original code remains available if a diagram fails. Same-repository GitHub/raw/root-relative image references are normalized, and local source images are copied to a static fallback cache by the deployment job. A missing source image is clearly labeled with its source link; no clinical diagram is invented. Directory browsing can fall back to a deployment-time catalog if the live anonymous API is unavailable. The catalog is a snapshot, not a replacement for live source updates.

The build scans every chapter Markdown file for inline image/link references and Mermaid fences and validates SVG XML; its `source-audit.json` lists detected missing references. This is a static scan, not a certification of every link, anchor, external URL or rendered chart. Browser tests cover a representative actual Mermaid flowchart, fallback image loading, breadcrumbs, active tabs and the existing five touch viewports. Run `python website/build-site-data.py` before local browser testing. Previous premium and touch-first deployment runs 46014579995 and 46014810067 passed. Verify the new release independently.

Catalog-aware navigation omits missing resource folders from shortcut lists. A sticky reading-location strip identifies the chapter and currently visible section; adjacent documents and parent folders are linked where catalog data is available. The browser audit additionally attempts to parse every Mermaid block and decode every staged image asset, reporting exceptions in source-audit.json without changing source content. Syntax parsing is not the same as fully rendering every flowchart.

## Dedicated results and review

Submitting manually opens an accessible confirmation dialog, then a dedicated results screen. Timer expiry submits automatically. Results show net marks and percentage (net marks divided by scoreable questions), correct/incorrect/unanswered counts and accuracy among attempted questions. Review filters and eight-question pagination display each original question, the learner's selected option, correct answer and original extracted GitHub explanation without rewriting it. Finished results and in-progress attempts remain device-local and use source-signature validation. Returning to reading retains the saved result; replacing it requires confirmation. The results URL can reopen a saved result on the same browser. Automated tests check the source explanation text, score, filters, pagination, reload and responsive timer-expiry results. Unsupported source formats remain in original reading mode.

## V6 — Simpler study workspace and metrics

Metrics are generated from the deployed Git checkout by `build-metrics.cjs` (called by `build-site-data.py`). Counts are detected A–D question occurrences by file, not certified unique originals; topic banks, mock slots, PYQ/reported adaptations, imported and embedded practice are separate. Evidence-only research files are not counted as question slots. The dashboard shows the snapshot date/commit, chapter filters, category filters and clickable topic-bank counts. Original indexes remain accessible via a disclosure, with direct resource links and search. PYQ records with recognizable four-option lists are styled as cards without rewriting questions, evidence, answers or references. Unrecognized records remain readable in original format. The phone outline is collapsed by default and expands on demand. Animation is minimal and disabled under reduced-motion preferences. No source study material changed.

## V7 — Learning feedback and consistent resource titles

The website builds a display-title catalog from each chapter document's source heading and stable path. Topic names, mock numbers, dates, and draft labels remain meaningful; counts and resource types appear as subtitles rather than filename clutter. Original file paths and Markdown are unchanged. Source headings remain available on GitHub and original heading IDs are assigned before display-title formatting. Untimed learning gives supportive feedback and original explanations only after an explicit check; timed practice still conceals answer correctness until submission. Untimed sessions do not overwrite saved timed attempts. Correct-answer feedback and high-score result animations are brief, silent, and reduced-motion-aware. Design principles: W3C WCAG headings/labels and animation from interactions; Shute (2008), Focus on Formative Feedback, DOI 10.3102/0034654307313795. Automated checks cover representative real titles, correct/incorrect feedback, original rationale access, and reduced-motion public layout.

### V7 verification repair
Fixed the collection-label fallback so valid Theory and MCQs labels survive generic-title handling. Title audit now checks every catalog record and produces title-audit.json with explicit review flags. Public verification compares that JSON to the deployment checkout. Timed milestones, one-time celebration, exact learning explanation and saved-attempt isolation have dedicated browser regression tests. Original clinical files are unchanged.

## V8 — Personal daily study routine

Daily progress, a configurable 5/10/20/30-question goal, seven-day activity, quick five-question practice and due-revision suggestions are device-local. Only checked learning questions and submitted timed answers count. Same-bank repeats count once per local calendar day, not as unique clinical questions across banks. Revision suggestions use a simple next-day interval for incorrect answers and three days for correct answers. These are pragmatic defaults, not a validated individualized spaced-repetition algorithm or mastery certification. No telemetry, public score publishing or account is introduced. Source headings, questions, answers and timed attempts are preserved. Progress labels are factual local activity, not invented priority labels. Evidence: health-professions retrieval/spacing review https://doi.org/10.1007/s10459-023-10274-3, habit formation https://doi.org/10.1080/17437199.2011.603640, progressive disclosure https://www.nngroup.com/articles/progressive-disclosure/, WCAG interaction motion https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.

## V9 — My progress

A separate device-local completion checklist tracks actual published theory resources, MCQ banks, mocks, reported PYQ practice and revision resources by chapter. Manual completion is explicit and independent of accuracy. Percent complete is completed resources divided by eligible resources. Question-slot coverage combines the checked-question count with all slots in a manually marked bank. Drafts and evidence-only indexes do not count. A bank count change requires reconfirmation. Reset per resource, chapter or all tracked chapters clears completion and question/revision coverage, while retaining daily activity history, saved attempts and bookmarks. No clinical source content is modified. Resource-level tracking does not imply completion of every subsection of a combined topic file.

### V9.1 — automatic question-bank completion

Opening a bank shows cumulative saved coverage but does not count as practice. Each checked interactive answer and submitted timed answer updates the bank's distinct question coverage. Fully supported banks automatically count as completed when every current question is checked, irrespective of score. Remaining-question practice resumes only unreviewed questions. Current question fingerprints prevent stale questions from inflating coverage after source changes. Manual completion remains available for reading-only or unsupported formats. An explicit unmark can override auto-completion; reset clears both marks and tracked answers. The global inventory is a deployed snapshot, while a loaded bank reconciles its own current source counts. Original content and saved timed results are unchanged.

### V9.2 — progress from every study route

Library chapter cards show separate inventory counts and completion bars; resource listings, recent resources, compact indexes and Metrics cards share mark-done and reset controls with the reader and Progress page. Navigation anchors and completion controls are separate. Counts use the same deployment snapshot and remain separate by category; uncounted resources do not get invented question totals. Chapter totals are not unique-question counts. Drafts and evidence-only documents retain navigation but not completion controls.

### V10 — Simple study language and immediate mistake review

All website-generated question-count labels use questions or MCQs; internal schema field names remain compatible. The original study notes are unchanged. Review mistakes offers up to five currently incorrect answers from the same bank, even before a scheduled review. A correct recheck removes the question from the mistakes list; repeated checks do not inflate daily counts. The home dashboard offers a remaining-question shortcut for the recent partly studied bank and a mistake-review shortcut when available. Weekly feedback acknowledges study days without a streak penalty. Existing progress, saved results and revision dates remain intact. Fixed the public test selector to target the search box rather than the completion checkboxes.

### V10.1 — mock counts and study labels

Mock test totals count published question-containing documents classified as Mock test (including short topic mocks). Draft fragments and plans are not additional tests. Draft sections and their question totals are shown separately. Existing inventory counts and stored progress are unchanged. Shared readable type, count and personal-status labels appear on chapter, topic, Metrics and Progress cards. No invented difficulty or priority badges; colour is supplementary to text. The existing tests verify actual counts and status changes.

### V10.2 — Today’s progress includes Mark done

The daily goal combines actual checked answers with self-reported question totals from existing dated completion marks. Per bank and local day, use the larger count instead of adding both. The home screen separately displays answers checked here and additional questions marked done. Theory-only marks count as study topics but not questions. Existing marks made today are recognized without migration; older marks do not add to today's goal. Undoing/resetting a mark removes manual credit from its dated day; real answered-question history and test results are unchanged. Home refreshes on progress events, tab visibility and returning from browser history. Internal progress keys and original study content stay intact.
