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
