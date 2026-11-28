# Endocrine Batch 01 candidate checkpoint — 28 November 2026

**State: DRAFT CANDIDATE. Not merged, not live inventory credit, not independently certified.**

Content checkpoint: `fd3392acd8046402af9bce0612f0ed406483fca2`. Claim owner: `endocrine-b01-20261128-0834Z`.

## Authoring inventory

| Topic | Original questions | Individual option rationales | Concept guide | Diagram | Evidence register |
|---|---:|---:|---:|---:|---:|
| [Acromegaly](MCQs/09A-Acromegaly-Clinical-Care-20-MCQs.md) | 20 | 80 | 1 | 1 | 1 |
| [Prolactinoma](MCQs/09B-Prolactinoma-and-Hyperprolactinemia-20-MCQs.md) | 20 | 80 | 1 | 1 | 1 |
| [Hypopituitarism](MCQs/09C-Hypopituitarism-Hormone-Replacement-20-MCQs.md) | 20 | 80 | 1 | 1 | 1 |
| [Pituitary Cushing disease](MCQs/09D-Pituitary-Cushing-Disease-20-MCQs.md) | 20 | 80 | 1 | 1 | 1 |
| [Nonfunctioning pituitary adenomas](MCQs/09E-Nonfunctioning-Pituitary-Adenomas-20-MCQs.md) | 20 | 80 | 1 | 1 | 1 |
| **Total** | **100** | **400** | **5** | **5** | **5** |

Five initial commits were read back with exact file-content equality for all 20 files. At corrected checkpoint all five banks were retrieved from GitHub and parsed: 100 distinct normalized stems, 400 options, 400 labeled individual rationales, 100 matching answer key entries, 100 closed details blocks, 100 exam clues, no semicolons in question sections, and five of each answer letter per bank. No exact normalized matches against 310 existing endocrine practice/mock stems and 26 reported-question stems. No repository-wide semantic uniqueness certification. Original questions are not claimed as historical exam questions.

## Candidate-only correction

Replaced C17, D01, D10, D13, E06, E11, E14, E17 to reduce identified overlap or generic duplication risk. Reordered A01–A20 answer positions while retaining answer content. Current five bank blob SHAs in order A–E:

- db9590e04b84623289d8b5579d61888bb9edc58f
- b434313bf394eb5961f962b6f342f06378c7a2fc
- db50f6a3b15ae786118661cc3392e48637966755
- 833cb68a43714ab0532e3e03d0f1b1bb97fff74d
- bf222c9982f1d64f14143ebd024655f571395639

Additional replacement evidence: C17 [adult adrenal insufficiency guidance, rifampicin interaction](https://doi.org/10.7861/clinmed.2019-0324), indexed article excerpt retrieved. D13 [DailyMed osilodrostat label, QT prolongation and interaction precautions](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f3a5ec24-63c3-4d83-b1c0-6c550fbe7ae2), indexed prescribing information retrieved. D01 and D10 require item-level diagnostic and clinical verification. E06/E11/E14/E17 draw on Endotext and incidentaloma sources in the E evidence register. Earlier evidence registers describe first authoring checkpoint and this record supersedes their item-specific statements where changed.

## Preflight and blockers

Fresh GitHub tree returned 1,523 entries and 36 physical chapter directories. Earlier 35-chapter index is stale. Both skills and audit-learnings retrieved and relevant instructions checked but complete fresh line-by-line bounded reread not certified. Open PR and known chapter claim checks performed. No overlap identified for Endocrine in inspected active clinical scopes. Hepatobiliary deferred because no explicit PR29 clearance. Scope remains isolated pituitary topics; shared navigation untouched.

Remaining before merge: full mandatory preflight including applicable historical audit and skills, exhaustive repository and active draft semantic comparison, independent clinical and pharmacological review of every option and rationale, difficulty/distractor assessment, INC topic map, question-specific video evidence, original SVG rendering, latest-main reconciliation, explicit applicable navigation approvals and CI. Teaching-video descriptions and timestamps are indexed references only, not confirmation of exact question coverage. Do not credit 100 live questions or modify previous learner attempt history before successful integration. No new mock or PYQ count.

## Resume

Reacquire only Endocrine claim after checking current state and open PR. Do not regenerate these 100 originals. Complete blockers and repair any confirmed overlaps in-place on the existing draft. Then continue uncovered thyroid, adrenal, calcium and diabetes topics as appropriate after curriculum/ownership and inventory comparison, toward ten 120-question original-only chapter mocks and source-traced India-wide PYQs. Preserve the five existing hourly automations and other owners.
