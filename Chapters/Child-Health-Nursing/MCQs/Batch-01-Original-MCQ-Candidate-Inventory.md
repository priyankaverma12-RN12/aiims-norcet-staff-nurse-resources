# Batch 01 — isolated original MCQ candidate inventory

Status: draft only. Do not add to live learner inventory until mandatory independent review and safe integration pass. All items unattempted. Existing four starter originals and one reported adaptation unchanged.

| Bank | Original questions | Individual rationales | Easy | Medium | Difficult | Verified blob |
|---|---:|---:|---:|---:|---:|---|
| [01A Injury prevention](01A-Preventive-Pediatrics-and-Injury-Prevention-20-MCQs.md) | 20 | 80 | 10 | 10 | 0 | fe866b64917b86128aa24145f1d52dc41f6fe14a |
| [01B Developmental surveillance](01B-Developmental-Surveillance-and-Milestones-20-MCQs.md) | 20 | 80 | 8 | 12 | 0 | aeeda1992a8ef833958ff9e7172905c33d0e93d3 |
| [01C Theories and play](01C-Developmental-Theories-and-Play-20-MCQs.md) | 20 | 80 | 9 | 11 | 0 | 76a8025808900c70550c6b3b2727f96d06bf3b0e |
| [01D Hospital and family-centered care](01D-Hospitalized-Child-and-Family-Centered-Care-20-MCQs.md) | 20 | 80 | 1 | 19 | 0 | 5f019a271659cbbb546b8bed33e17af286808adf |
| [01E Pediatric pain](01E-Pediatric-Pain-Assessment-and-Reassessment-20-MCQs.md) | 20 | 80 | 0 | 8 | 12 | 743eb7dc7f439b475b066bfd2819d0336f29a641 |
| Total | 100 | 400 | 28 | 60 | 12 | Candidate only |

Remote structural audit: 100/100 distinct normalized stems within candidate, sequential question numbers per bank, 4 English choices and 4 labeled Roman Hinglish option explanations per item, matching answer text and letter, closed details blocks, difficulty/priority/type/source fields. Zero structural exceptions found. Correct option totals A=25, B=25, C=25, D=25. This does not establish clinical accuracy, calibrated difficulty, or exhaustive semantic uniqueness.

Targeted comparison included existing Child Health starter bank and reported dehydration adaptation, relevant Nursing Foundations communication, discharge, pain and safety files, sibling chapter starter banks, selected Mental Health and Renal banks, and active Nutrition draft 03C and 02E. Child Health has a mock plan but no authored mock identified. Full repository-wide original/mock/PYQ semantic audit remains open.

## Corrective history

- Initial 01A anthropometry commit ae796a8 retired from candidate because Nutrition PR35 contains substantially overlapping learning tasks. Replacement 01A injury prevention commit a54ca04. Removal of own unpublished duplicate file commit 92ea7d7. No existing main bank removed.
- 01D Q4 and Q10 changed to distinct pediatric interview and school action plan tasks, commit dc89584.
- 01E Q4, Q9, Q10, Q17 changed to numeric comprehension, individualized pain cues, care-associated pain and localization tasks, commit 7e47900.
- Net Batch 01 candidate count stays 100, not 120.
- Batch 02 preflight addressed PR45 review comment 7235872853: 01A Q1–3 now have 12 expanded conversational explanations and exam clues; difficulty changed to Easy, priorities retained. Original English stems, options and answer keys preserved; Q4–20 byte-identical. Commit ccf7dedceef660792ec060625b73170de54db7ca. Source checks performed by author; not independent approval.
- Batch 03 addressed independent review comment 7235978547: 01A Q4–20 reviewed, 68 expanded rationales, exam clues, source updates and calibrated difficulty in a54e55aedf4379e97749abdbd43462b4ae8530e0. Q1–3 unchanged. 01B Q1–20 reviewed, 80 expanded rationales, exam clues, calibrated labels, corrected-age source and one precise correct-option phrase at Q8 (D unchanged) in 343350ff660596bb0f2a4851508066a9ffd18efb. No new question slots. Author corrective review, independent follow-up remains pending.
- Batch 04: 01C and 01D Q1–20 reviewed and 160 separately labeled rationales expanded, 40 exam clues added, difficulty recalibrated, specific references added. All English stems/options, correct keys and priorities unchanged. Commits 42841bdb23f946d5a36d9989220392c18b0f90dd and 88e7d61d7ab006b452aa1afb10232c4536e54003. Independent re-review and distractor-strength improvements remain pending. Next 01E Q1–20.
- See [Batch 02 cumulative inventory](Batch-02-Original-MCQ-Candidate-Inventory.md).

## Companion files

[Roman Hinglish concept notes](../Concepts/Batch-01-Healthy-Child-and-Hospital-Care.md) and [source and video ledger](../Concepts/Batch-01-Research-and-Video-Evidence.md). Three original SVGs: developmental domains, injury prevention layers and pediatric pain loop. All written to isolated branch with exact readback.

## Pending integration gates

Full fresh line-by-line skills and audit-log review not certified. Independent clinical/source passage verification, option plausibility and difficulty calibration, conversational language review, repository-wide semantic review including mocks/PYQs and in-flight PRs, complete INC topic reconciliation, video playback and item mapping, link and website rendering verification (six SVG source renders completed in Batch 03), candidate CI, current main comparison and explicit PR7/8/12 and Nutrition PR35 coordination remain open. PDF screenshot retrieval failed. Do not merge until all applicable gates pass. Do not change shared progress files, learner history or automations.

Next: resume this candidate, resolve gates, reconcile remaining Child Health topics against INC and sibling owners, then extend phase 1. No mock or new PYQ count claimed. Begin two original-only 120-question mocks per run only after verified topic coverage, toward ten mocks.
