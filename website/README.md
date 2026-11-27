# Nursing Study Hub — website preview

This separate website reads the public repository's main branch at runtime. The chapter Markdown remains the single source of truth. No study files are copied or edited.

## Preview locally

From the repository root on the website-preview branch, run `python -m http.server 8000` and open http://localhost:8000/website/. Internet access is required for live Markdown, directory listings and the pinned Markdown/sanitizer libraries. The browser uses anonymous GitHub API requests for directory browsing, which can be rate limited.

## Deployment

Use a static host serving this folder, or configure GitHub Pages with an approved deployment workflow after review. Do not change repository visibility or Pages settings automatically. The main README can link to the final hosted URL once deployment is verified.

## Scope

Chapter search, original Markdown rendering, relative navigation, diagrams, answer dropdowns, dark/light mode and local reading history. MCQs and mocks remain in reading/practice mode; automatic scoring, timers and account sync are not implemented. No clinical or provenance edits. Browser and deployment testing are required before production use.
