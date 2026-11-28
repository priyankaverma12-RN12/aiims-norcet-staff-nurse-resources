# Endocrine Batch 02 candidate checkpoint — 2026-11-28

Status: STAGED, NOT LIVE. Continue existing draft PR #54 only.

Verified Batch 01 base: 72907148a40851cff07a76fbd8fa538f2645117e. All original 100 questions, 400 rationales, five concepts, five SVGs and five evidence files remain unchanged. Batch 02 authoring/correction head: bcee56a82908637e22c1818b1b68155c98815d07. Remote compare against Batch 01: six commits, 20 added content files, no preexisting files changed.

| Bank | Questions | Rationales | Topic commit |
|---|---:|---:|---|
| [10A Thyroid nodules/FNA](MCQs/10A-Thyroid-Nodules-and-FNA-20-MCQs.md) | 20 | 80 | 700170ebb62cb4f4683d83a4c4f9e802658681cf |
| [10B Primary aldosteronism](MCQs/10B-Primary-Aldosteronism-20-MCQs.md) | 20 | 80 | c8b2721202a72cb3b763c9aafdac43f6230097e4 |
| [10C Chronic hypoparathyroidism](MCQs/10C-Chronic-Hypoparathyroidism-20-MCQs.md) | 20 | 80 | 791b1fc5782e3527746687b2031075e64bd6a2dd |
| [10D Thyroiditis and amiodarone](MCQs/10D-Thyroiditis-and-Amiodarone-20-MCQs.md) | 20 | 80 | 084c3f2c23a449fe2048b0ea18ca074ce97c5b0c |
| [10E Diabetes technology/pump safety](MCQs/10E-Diabetes-Technology-and-Pump-Safety-20-MCQs.md) | 20 | 80 | afd3f58c9626589d474e99f89dd0fd147e6b6b39 |

Batch 02: 100 new candidate originals, 400 separate Roman Hinglish rationales, 100 exam clues, five concept guides, five SVG diagrams, five evidence registers. Cumulative: 200 candidate originals, 800 rationales, 200 clues, ten banks, ten concepts, ten diagrams, ten evidence registers. No new PYQ, mock, or live inventory credit. Initial topic files remotely retrieved, 19 programmatically exact compared and one (10D evidence) separately read back with visible content after per-call tool limit. Subsequent corrective files exact compared.

Targeted semantic corrections at bcee56a82908637e22c1818b1b68155c98815d07: 10A Q20 replaced generic access-barrier scenario overlapping 09E Q18 with euthyroid nodule hormone-treatment recommendation. 10B Q01 replaced potentially overlapping normokalemic screening task with suppression-test decision under 2025 guideline, Q12 replaced repeated hypokalemia preparation with AVS selectivity. All three answer positions retained. Final remote bank blobs in order 10A–E: ee837ef09d457aa4dd94caba6af7d0366ffc29b4, 3b757ea0a27895c2ce855614dcb7f4077c44f691, bd0bf014df6713d44337d24e0a7258cdf491c0bf, 39ca6233405eaa444a9c22f6f85cb4bdd13b936a, 87fc3b3ab9942ff8141042c5c2019bf5e0600f15.

Final structural/readback audit: 200 distinct normalized candidate stems, zero exact collisions across candidate banks and 336 legacy question slots (216 distinct legacy normalized stems). 20 questions, 80 rationale entries, 20 exam clues and 20 closed details per bank. All keys match correct option text and corresponding rationale. Each bank has five of each correct-answer letter. This is not an exhaustive semantic or independent clinical audit.

Preflight: both skills, AGENTS, Copilot and audit learnings fetched, applicable excerpts reviewed. Full fresh line-by-line reread and full manual claim inventory not certified. Recent commits, open PRs, 12 major claims inspected; observed Child Health scope disjoint. Exclusive Endocrine claim acquired and exact readback at 5cf46d5f5db9c6442ad03c815e40900224967a70. Rechecked before each candidate write. No other content/automation changed.

Evidence: ATA and Endotext thyroid resources, 2025 Endocrine Society PA and revised ESE hypoparathyroidism guideline, thyroiditis resources and FDA/ADCES/UCSF pump safety material reviewed. Some journal guidelines only indexed where direct access failed. Evidence files distinguish retrieval level. Video leads not equivalent to verified item coverage. All 100 new item-specific practice mappings pending. No PYQ attribution claimed. Confirmed targeted overlap corrections are not exhaustive.

Remaining release gates: complete bounded preflight, full repository and active-draft semantic screening including 10A Q09/Q10 and other overlapping mechanisms, independent clinical and difficulty/distractor/language review, INC curriculum depth and topic inventory reconciliation, item-specific source/video verification, SVG rendering, PR7/8 navigation clearance, current main reconciliation and CI. Do not integrate, update live counts, regenerate prior questions or change other claims/history/automations until applicable gates pass. Next authoring targets only after inventory screening and relevant gates: thyroid cancer nursing, adrenal insufficiency, pheochromocytoma, calcium/hyperparathyroid clinical management, and diabetes complication or treatment gaps. Retain original-only chapter-first workflow.
