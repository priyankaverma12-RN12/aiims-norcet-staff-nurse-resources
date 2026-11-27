# Nursing Study Hub — website preview

This website reads the public main branch at runtime. No original Markdown, claims, checkpoints or study folders are edited.

## Practice features

Select answers, clear, jump, submit or let the countdown expire. A suggested source time is used where recognizable (135 minutes for the tested 120-question mock). Customize 1–300 minutes and opt in or out of one-third negative marking. Scores follow the published source keys, not an independent medical validation. Only unambiguous numbered four-option questions with a single explicit key are eligible. Unsupported items remain readable. Shared diagrams and introductory material remain available in original reading mode. Bookmarks are local to the browser. Attempts reset on reload and are not synchronized. Answers and original rationales are available after submission.

## Preview and regression tests

From the repository root on the preview branch, run `python -m http.server 8000` and open http://localhost:8000/website/. Internet is required for live Markdown, directory API and pinned CDN renderer and sanitizer. Anonymous API requests may be rate limited. Run `node --check website/app.js`, `node --check website/quiz.js` and `node website/quiz.test.cjs`.

## GitHub Pages deployment checklist

The manual-only workflow `.github/workflows/nursing-study-pages.yml` deploys only website/ and only from main. Review and merge the PR, then select GitHub Actions under repository Settings → Pages → Build and deployment. Run the workflow manually from Actions on main. Verify its actual deployment URL and browser smoke tests before adding a link to the root README. No Pages settings changed or deployment run yet.

Expected default URL (not verified live): https://priyankaverma12-rn12.github.io/aiims-norcet-staff-nurse-resources/

Proposed root README line (insert once after verifying deployment, with fresh blob SHA and coordination with shared jobs):

```md
**[🚀 Launch Nursing Study Hub](https://priyankaverma12-rn12.github.io/aiims-norcet-staff-nurse-resources/)**
```

## Verification — 27 November 2026

- All 35 current chapter README targets retrieved from main. This verifies source paths, not browser navigation or every child link.
- Final parser matched 221/221 numbered headings across five current source files: Respiratory Day 1 (44), Nursing Foundations Mock 01 (120), incident reporting (26), Eye anatomy (30), and medication-monitoring reported adaptation (1). Separate hint and answer blocks are supported.
- Exact remote quiz.js and styles.css were copied to local Chromium component fixtures and Git blob hashes matched. At 1440×900, 390×844 and 320×720, score, wrong/correct classes, answer dropdown, synthetic SVG, mocked bookmark state and no horizontal overflow passed. Clock fast-forward auto-submission passed. The original GitHub airway-zones.svg source was retrieved.
- Live browser navigation and external network requests were blocked. Real CDN integration, actual diagram rendering, browser storage persistence across reload and all child-link rendering remain pending. Do not describe the site as production-tested.
