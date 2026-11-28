# PR48 Group 10 — executable navigation handoff preparation

**Candidate-only. Not release approval, not published inventory.** Pinned current-main source snapshot `edd994fc5844f78d166961cb8658cbfe3e59ce7c` and unchanged PR48 content head `3341aebc68c8dddc2e4c9ff6510ccf6d7aca8da6`. PR46/48 and PR49/48 previously identified allocations are complete: PR46 `61bda03143541718363b201dffb8e21421214c98`, PR49 `e8cf94e4e3dae373581148df90af0aebd30fe99b`, with all prior Foundations questions retained. PR46 CI 46144841455 and PR49 CI 46144156131 passed. PR48 CI 46129125071/job 140930218936 passed candidate catalog, desktop/mobile integration and browser regression. That does not independently certify every SVG's visual quality, clinical content, video playback or future merged tree.

## Exact source guard manifest

Re-fetch each target from current main and verify the whole current blob before an eventual navigation write. Do not replace a concurrent change with this older snapshot. PR8 competing navigation paths require explicit handoff; no clearance inferred. The global index is already stale relative to the live chapter inventory. The following are the source blobs to reconcile, not permission to write.

| Current-main target | Pinned blob |
|---|---|
| `Chapters/Nursing-Foundations/README.md` | `2f896037ca3e684c37ca468698fb0c16457a5e1f` |
| `Chapters/Nursing-Foundations/MCQs/Nursing-Foundations-Topic-Wise-MCQ-Index.md` | `f43a1a205f00e6434a1d5284b7fa1b8ffb089f0c` |
| `Chapters/Nursing-Foundations/Concepts/Nursing-Foundations-Topic-Coverage-Map.md` | `2d8cae096843af2358f8b0d6540eaeb42c01c6c5` |
| `Chapters/Nursing-Foundations/Concepts/Individual-Topic-Coverage-Audit.md` | `e247eb5a526ae822756150342ded4234728a5e21` |
| `Chapters/Nursing-Foundations/Concepts/Nursing-Foundations-Video-and-Research-Guide.md` | `df85291b8e88f326c739ff5317672d2b348f419b` |
| `Chapters/Nursing-Foundations/Previous-Year-Questions/Nursing-Foundations-Past-Paper-Research-Register.md` | `33c434df339a70e406833a7922501f3de3009a88` |
| `Chapters/Nursing-Foundations/Previous-Year-Questions/Nursing-Foundations-Previous-Year-Questions-Index.md` | `97fcd30ed8361487f72c0f4058e4364f922fdf1a` |
| `Chapters/NORCET-Full-Chapter-Index.md` | `3f3f88cb590dea1ad8569e01851ccd40914b2e07` |

## Candidate content manifest

The four bank difficulty labels were counted directly from the pinned candidate files. The 16 package paths exist in the pinned tree. All previous question identities and content files remain unchanged in this preparation.

| Topic | Originals | Easy/Medium/Difficult | Concept | Bank | Diagram | Historical evidence |
|---|---:|---|---|---|---|---|
| 10A | 26 | 0/23/3 | [Concept](../../Chapters/Nursing-Foundations/Concepts/10A-Safe-Patient-Handling-and-Transfers.md) | [MCQs](../../Chapters/Nursing-Foundations/MCQs/10A-Safe-Patient-Handling-and-Transfers-26-MCQs.md) | [SVG](../../Chapters/Nursing-Foundations/Assets/10A-Safe-Transfer-Decision.svg) | [Evidence](../../Chapters/Nursing-Foundations/Previous-Year-Questions/10A-Safe-Handling-Reported-Evidence.md) |
| 10B | 22 | 0/12/10 | [Concept](../../Chapters/Nursing-Foundations/Concepts/10B-Therapeutic-Positioning-and-Alignment.md) | [MCQs](../../Chapters/Nursing-Foundations/MCQs/10B-Therapeutic-Positioning-and-Alignment-22-MCQs.md) | [SVG](../../Chapters/Nursing-Foundations/Assets/10B-Positioning-and-Alignment.svg) | [Evidence](../../Chapters/Nursing-Foundations/Previous-Year-Questions/10B-Positioning-Reported-Evidence.md) |
| 10C | 26 | 0/20/6 | [Concept](../../Chapters/Nursing-Foundations/Concepts/10C-Mobility-Aids-and-Weight-Bearing-Gait.md) | [MCQs](../../Chapters/Nursing-Foundations/MCQs/10C-Mobility-Aids-and-Weight-Bearing-Gait-26-MCQs.md) | [SVG](../../Chapters/Nursing-Foundations/Assets/10C-Mobility-Aid-Patterns.svg) | [Evidence](../../Chapters/Nursing-Foundations/Previous-Year-Questions/10C-Mobility-Aids-Evidence.md) |
| 10D | 26 | 0/17/9 | [Concept](../../Chapters/Nursing-Foundations/Concepts/10D-Exercise-and-Monitored-Mobilization.md) | [MCQs](../../Chapters/Nursing-Foundations/MCQs/10D-Exercise-and-Monitored-Mobilization-26-MCQs.md) | [SVG](../../Chapters/Nursing-Foundations/Assets/10D-Mobility-Readiness.svg) | [Evidence](../../Chapters/Nursing-Foundations/Previous-Year-Questions/10D-Exercise-and-Mobilization-Evidence.md) |
| Total | 100 | 0/72/28 | | | | |

Candidate bank blob guard:

- `undefined`: `ed20f7eeac772718a4eb0b9f5c32eae5c454556b`.
- `undefined`: `024701750e433481353ae720fae5416f1fe28eaa`.
- `undefined`: `43f5c671fe5a5872de07db1a51ac67f7d3296fb1`.
- `undefined`: `d4b714dc907bf71382f78822d510ad6cc4a0f3fa`.

## Prepared navigation payload — apply only after clearance

Live chapter baseline at pinned main: 1,350 original slots, 577 Medium and 773 Difficult, including 600 initial and 750 expansion. Prospective verified delta: +100 original slots, +72 Medium, +28 Difficult, +0 Easy. Only after successful integration and live readback, chapter total becomes **1,450** (600 initial + 850 expansion), 0 Easy, 649 Medium and 801 Difficult. Four older starter items remain separately preserved. Five legacy compiled mocks reuse 600 existing questions and remain unchanged. Historical counted total remains 34 reported adaptations. Do not count evidence leads or new diagrams as MCQs. PR67 requires genuinely distinct Easy/Medium supplements for deficits rather than silently changing defensible labels or reusing questions; the current bank has no Easy items and its deficit must remain visible.

For the chapter README append this group-local table, then reconcile existing summary counts and next-topic text after clearance. Do not erase any previous group paragraphs.

| Group | New originals | Concepts | Practice | Diagram | Reported evidence |
|---|---:|---|---|---|---|
| 10A | 26 | [Concept](Concepts/10A-Safe-Patient-Handling-and-Transfers.md) | [MCQs](MCQs/10A-Safe-Patient-Handling-and-Transfers-26-MCQs.md) | [Diagram](Assets/10A-Safe-Transfer-Decision.svg) | [Reported evidence](Previous-Year-Questions/10A-Safe-Handling-Reported-Evidence.md) |
| 10B | 22 | [Concept](Concepts/10B-Therapeutic-Positioning-and-Alignment.md) | [MCQs](MCQs/10B-Therapeutic-Positioning-and-Alignment-22-MCQs.md) | [Diagram](Assets/10B-Positioning-and-Alignment.svg) | [Reported evidence](Previous-Year-Questions/10B-Positioning-Reported-Evidence.md) |
| 10C | 26 | [Concept](Concepts/10C-Mobility-Aids-and-Weight-Bearing-Gait.md) | [MCQs](MCQs/10C-Mobility-Aids-and-Weight-Bearing-Gait-26-MCQs.md) | [Diagram](Assets/10C-Mobility-Aid-Patterns.svg) | [Reported evidence](Previous-Year-Questions/10C-Mobility-Aids-Evidence.md) |
| 10D | 26 | [Concept](Concepts/10D-Exercise-and-Monitored-Mobilization.md) | [MCQs](MCQs/10D-Exercise-and-Monitored-Mobilization-26-MCQs.md) | [Diagram](Assets/10D-Mobility-Readiness.svg) | [Reported evidence](Previous-Year-Questions/10D-Exercise-and-Mobilization-Evidence.md) |

- Chapter MCQ index: retain the original 20-slot Group 10 row and append four named Group 10A–D bank links (26, 22, 26, 26). Change the current inventory line from 1,350 to 1,450 and 577/773 to 649/801 Medium/Difficult only when the merged candidate tree is verified. Do not alter the original 600-question table or compiled mocks.
- Coverage map and individual-topic audit: proposed single allocation of 20 pre-existing Group 10 IDs, subject to final owner confirmation. 10A Q5,6,14,19 (4); 10B Q1,2,3,4,13,17,18,20 (8); 10C Q7,8,9,10 (4); 10D Q11,12,15,16 (4). Combined allocations would be 30 each, 120 slots total, but only 100 newly authored. No duplication credit. Keep status unstudied and independent review pending.
- Video guide: append direct links to the four concept pages and evidence registers above, using relative paths from its Concepts directory. Preserve specific-video verification gaps as recorded, do not invent timestamps.
- Past-paper register and Previous-Year-Questions index: link all four evidence registers as research records, retaining existing 34 reported count unless separately authenticated and de-duplicated. No new historical count claimed here.
- Global index: replace stale current Nursing Foundations row count 1,124 with 1,450 only after integration. Update current summary prose, preserve historical snapshots and all other chapter rows. Do not reconcile unrelated global counts without the respective owner.
- Final integration: explicit PR8 and applicable PR7 navigation handoffs, full remaining independent clinical/semantic and video verification, current ownership, latest-main reconciliation, exact-head CI and rendering, then guarded merge and exact post-merge readback. No learner history or automation changes.

This is a concrete pinned navigation payload, not an applied patch. Shared navigation files were deliberately not modified pending handoff. No clinical content changed in this run and no staged question was counted live.
