# Conversational Hinglish retrofit — research and progress ledger

## Scope and evidence

Learner mandate: complete, conversational Roman Hinglish for all explanatory study text, English MCQ questions and four English options. Preserve answers, metadata, source provenance, clinical accuracy, links, anchors, diagrams and learner attempts. See both SKILL.md files. This is a style-only draft, not an independent clinical re-certification.

Research reviewed on 28 November 2026:
- [Cognitive load theory in health professional education: design principles and strategies](https://pubmed.ncbi.nlm.nih.gov/20078759/). Introduce foundational concepts first, use worked examples and reduce extraneous complexity. Search abstract reviewed.
- [The evolution of cognitive load theory and its application to medical education](https://pmc.ncbi.nlm.nih.gov/articles/PMC4456454/). Pair anatomy illustrations with relevant explanation and progressively reduce scaffolding. Search excerpt reviewed.
- [Beyond right or wrong: More effective feedback for formative multiple-choice tests](https://link.springer.com/article/10.1007/s40037-020-00606-z). Full-text results inspected. Explanatory feedback improved transfer relative to right/wrong alone in an exploratory medical-student study. More detailed concept-focused feedback was not statistically superior to option-oriented feedback. Avoid filler and explain each option meaningfully.
- [Post-exam feedback with question rationales improves re-test performance](https://pubmed.ncbi.nlm.nih.gov/30043313/). Search abstract indicates modest benefit from elaborative feedback.
- [CDC plain language materials](https://www.cdc.gov/health-literacy/php/develop-materials/plain-language.html) and [everyday words](https://www.cdc.gov/ccindex/everydaywords/about.html). Apply familiar words and active voice, without removing exam terminology. Search excerpts reviewed.
- [OpenStax clinical judgment](https://openstax.org/books/fundamentals-nursing/pages/43-1-clinical-judgment-measure-model) and [assessment data](https://openstax.org/books/fundamentals-nursing/pages/12-3-collection-of-assessment-data). Search excerpts support nursing judgment and subjective/objective assessment distinctions. These are clinical learning references, not evidence of exact NORCET questions.

Roman Hinglish is the learner's preference. These sources do not establish a universal advantage of Roman Hinglish over other languages. No learner-outcome testing has been conducted in this repository.

## Verified draft review ranges

- Nursing Foundations Concepts/01A-Nursing-Process-and-Care-Planning.md: four teaching sections and five explanatory table rows expanded, previous draft commit 0e2fc1356f040f50621e0743ab59f20b04a66d64.
- Nursing Foundations Concepts/01B-Clinical-Judgment-and-Reasoning.md: four substantive prose blocks and six table rows expanded. Existing links, metadata, anchors and Mermaid code preserved.
- Nursing Foundations MCQs/01-Nursing-Process-and-Clinical-Judgment-20-MCQs.md: Q1–Q20 correct-answer explanations and 80 option rationales expanded in two sequential draft batches. All original stems, options, keys, hidden block markers, metadata and links preserved. No new questions counted.
- Remaining file-level and question-level reviews pending. All draft changes require safe scope coordination, fresh main comparison and validation before merge. No chapter certified.

## Package inventory snapshot

Source main commit 12daf0cd9527dfea5e7988154bb0c06d37550446. Counts are Markdown files, including indexes, plans and source registers, not questions or completed lessons. Snapshot is a discovery aid, not a content audit. There are 36 chapter directories including the separate Nervous-System directory. Follow the official repository curriculum index order, reconciling the separate directory explicitly. Recheck latest inventory before each batch. No other package has been audited in this retrofit.

| Directory | Concepts | MCQs | Mocks | PYQs | Revision | Other | Retrofit |
|---|---:|---:|---:|---:|---:|---:|---|
| Anatomy-and-Physiology | 1 | 32 | 6 | 7 | 0 | 2 | Pending |
| Biochemistry-and-Pathology | 1 | 1 | 1 | 2 | 0 | 1 | Pending |
| Cardiovascular-System | 4 | 6 | 3 | 1 | 2 | 2 | Pending |
| Child-Health-Nursing | 1 | 1 | 1 | 2 | 0 | 1 | Pending |
| Communicable-and-Tropical-Diseases | 1 | 1 | 1 | 1 | 0 | 1 | Pending |
| Community-Health-Nursing | 1 | 1 | 1 | 3 | 0 | 1 | Pending |
| Emergency-and-Critical-Care-Nursing | 1 | 1 | 1 | 2 | 0 | 1 | Pending |
| Endocrine-System | 9 | 4 | 2 | 6 | 1 | 3 | Pending |
| Eye-and-ENT-Nursing | 32 | 38 | 20 | 33 | 0 | 1 | Pending |
| Fluids-Electrolytes-and-Acid-Base | 1 | 1 | 1 | 1 | 0 | 1 | Pending |
| Gastrointestinal-System | 1 | 1 | 1 | 3 | 0 | 1 | Pending |
| General-Knowledge-and-Aptitude | 29 | 30 | 1 | 29 | 0 | 1 | Pending |
| Geriatric-Nursing | 1 | 1 | 1 | 1 | 0 | 1 | Pending |
| Gynecological-and-Reproductive-Nursing | 1 | 24 | 1 | 6 | 0 | 1 | Pending |
| Hematology-and-Blood-Disorders | 1 | 1 | 1 | 1 | 0 | 1 | Pending |
| Hepatobiliary-and-Pancreatic-System | 1 | 1 | 1 | 2 | 0 | 1 | Pending |
| Immunology-Allergy-and-Rheumatology | 1 | 1 | 1 | 1 | 0 | 1 | Pending |
| Infection-Control-and-Microbiology | 41 | 46 | 1 | 31 | 0 | 1 | Pending |
| Integumentary-System-and-Burns | 1 | 1 | 1 | 2 | 0 | 1 | Pending |
| Mental-Health-Nursing | 1 | 1 | 1 | 3 | 0 | 1 | Pending |
| Musculoskeletal-System | 1 | 1 | 1 | 2 | 0 | 1 | Pending |
| Neonatal-Nursing | 1 | 1 | 1 | 2 | 0 | 1 | Pending |
| Nervous-System | 8 | 8 | 2 | 6 | 1 | 2 | Pending |
| Neurological-System | 1 | 3 | 2 | 2 | 0 | 1 | Pending |
| Nursing-Foundations | 29 | 58 | 6 | 29 | 0 | 1 | Draft partial: two concepts, banks 01 Q1–20, 01A Q1–13, 01B Q1–27 |
| Nursing-Management-and-Education | 1 | 1 | 1 | 2 | 0 | 1 | Pending |
| Nursing-Research-and-Statistics | 1 | 1 | 1 | 3 | 0 | 1 | Pending |
| Nutrition-and-Dietetics | 1 | 1 | 1 | 2 | 0 | 1 | Pending |
| Obstetric-and-Midwifery-Nursing | 1 | 3 | 1 | 4 | 0 | 1 | Pending |
| Oncology-and-Palliative-Care | 1 | 1 | 1 | 1 | 0 | 1 | Pending |
| Perioperative-Nursing | 1 | 1 | 1 | 1 | 0 | 1 | Pending |
| Pharmacology | 1 | 1 | 1 | 2 | 0 | 1 | Pending |
| Professional-Ethics-Law-and-Informatics | 1 | 1 | 1 | 1 | 0 | 1 | Pending |
| Psychology-and-Sociology | 1 | 1 | 1 | 1 | 0 | 1 | Pending |
| Renal-and-Urinary-System | 17 | 17 | 1 | 18 | 0 | 1 | Pending |
| Respiratory-System | 9 | 17 | 4 | 5 | 4 | 2 | Pending |

## Resume

Nursing Foundations Group 01 learner-facing navigation and reported adaptations, then Group 02 in chapter order. Revisit all legacy mock mappings and revision content in coordinated scopes. Coordinate with Jobs 1–5 and manual scopes. Do not overwrite their live changes. Validate exact remote readback, unchanged questions and all four rationales. Compare latest main before merging PR #12. Review the rest of each package, including mocks, PYQs, revision, indexes and any embedded questions. Apply the existing complete clinical audit protocol when a clinical defect is found. All counts and statuses must reflect actual reviews, not estimates.

## Run 2 — Q4–Q20 language retrofit

All 17 remaining answer blocks in original bank 01 now have complete conversational explanations and four individual option rationales each (68 in this batch, 80 cumulatively). Preserved all text outside the existing job5 rationale markers byte-for-byte, including English stems, options, keys, all metadata, hidden answers and original links. Preserved supporting references inside markers. No new MCQs, no key changes and no new PYQ/video claims. Cross-checked nursing process and evaluation against OpenStax indexed pages https://openstax.org/books/clinical-nursing-skills/pages/1-3-nursing-process and https://openstax.org/books/fundamentals-nursing/pages/14-3-the-nurses-role-in-evaluation, ABCDE and anaphylaxis against Resuscitation Council UK indexed guidance https://www.resus.org.uk/library/abcde-approach and https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/special-circumstances-guidelines, and interpreter plus teach-back against AHRQ https://www.ahrq.gov/health-literacy/professional-training/lepguide/chapter2.html. Style-focused review, not a comprehensive independent clinical, syllabus, historical, video or rendered UI audit. Both skills reviewed in bounded ranges with common tail confirmed identical, AGENTS/Copilot and prior ledger read, latest audit-learning excerpts reviewed (not full historical log). All five formal claim headers and manual claim headers checked, Eye/ENT and Renal README scope checked. Draft-only branch avoids interfering with live jobs. Main comparison of the three target paths at 1045871166afa0bff63c3f5c9f57f44be4845476 shows original blobs unchanged. PR #8 remains open; verify overlap and latest claims/CI before any merge. Next: original bank 01A Q1 onward. No chapter complete.

Draft reconciliation: based on exact main snapshot 9dd4640c92178135c6a8e8c985ecd558464eb994. All three original study blobs matched the pre-retrofit originals, and draft comparison contained only four intended paths. PR #8 changed-file list checked at prior read, zero overlap. Merge commit on draft branch incorporates main as a parent without changing main or any other job claim. CI, rendered UI, full historical audit and final merge approval/checks remain pending. Prior verified language batch commit 9ca94f51f8af990d2b5fe634c6330fb0b31ebaaa.

## Run 3 — Group 01A Q1–Q13

All 13 existing Group 01A answers and 52 option-specific explanations rewritten into full natural Roman Hinglish. Cumulative draft language retrofit: 33 existing MCQs, 132 individual option rationales and two concept guides. Exact preservation check of every character outside the existing job5 rationale markers, all source links (including supporting references), English stems/options, keys and hidden details. No new questions or historical/video evidence claims. Existing OpenStax clinical judgment, assessment and evaluation references retained. Style-only review, not comprehensive independent clinical or source authentication. Both complete skills and AGENTS/Copilot retrieved at unchanged hashes from the previous full reading, previous instructions applied; fresh full line-by-line reread not certified. Audit learnings unchanged; prior latest excerpts and current tail reviewed, not entire historical log. All five formal claim headers and manual claim headers checked at main 952646b01631457d0e4537fc3d6d391662286749. Job 5 has disjoint Group08B/08C/25 scope; no main claims changed. Draft-only. Next Group 01B Q1 onward. No chapter certified.

## Run 3 continuation — Group 01B Q1–Q18

Rewrote 18 answer blocks and 72 individual option rationales. Cumulative draft 51 existing MCQs, 204 individual option rationales and two concept guides. Preserved English stems/options/keys, metadata, evidence, original supporting references, all link occurrences and all characters outside job5 rationale markers. Q19–Q27 unchanged. Existing OpenStax and AHRQ references retained; no new clinical certification or historical/video claims. Next: Group 01B Q19–Q27. Draft only, pending fresh reconciliation and final merge gates.

## Run 3 continuation — Group 01B Q19–Q27

Rewrote final nine answer blocks and 36 individual option rationales, preserving Q1–Q18 exactly. All 27 Group 01B MCQs have now received the language retrofit (108 option rationales). Run 3 adds 40 existing MCQ explanations and 160 option rationales. Cumulative draft: 60 existing MCQs, 240 individual option rationales and two concept guides. English stems/options/keys, metadata, supporting references, 108 link occurrences in Group 01B, hidden answers and all text outside rationale markers preserved. No new questions, source claims or answer changes. Next: Group 01 learner-facing index/navigation prose and reported adaptations, then Group 02 (sequential concepts and MCQs), plus legacy mock and revision coverage after scope coordination. No full chapter or clinical certification. Draft-only pending reconciliation and merge gates.

Run 3 reconciliation: exact main snapshot 3174fd2d26a407006c208e7f79b2528a216d1d0e; all five original study blobs unchanged, PR #8 changed-path overlap 0, draft tree differs from main only on six intended paths including ledger. Five formal claim headers refreshed at snapshot. No main or claim write, no force push. All three banks now complete for explanation-language retrofit only, 60 MCQs and 240 individual rationales. Verified batch checkpoint 17e92bb76e33615eef5340e383566725b736bef7. Full independent clinical audit, exact video and historical authentication, rendered UI and CI/merge gates pending. Preserve other jobs. Next Group 01 reported adaptations and learner-facing navigation, then Group 02 in order.

## Run 4 — Group 01 reported evidence and Group 02 concepts

Two existing independently adapted Group 01 reported practice answers (GMCH 2025 and AIIMS Jodhpur 2019) and eight option-specific rationales expanded, with source-status introduction in conversational Roman Hinglish. No new counted PYQs, official keys, sources or video claims. Existing English stems/options/keys, evidence blocks, links and historical limitations retained. Three Group 02 concept guides (02A therapeutic communication, 02B documentation, 02C handover) have their substantive teaching paragraphs, explanatory bullets and teaching tables rewritten in complete natural Roman Hinglish. All preexisting headings, explicit anchors, metadata, links and Mermaid diagrams preserved. Cumulative draft: five concept guides, 60 original MCQ explanations/240 option rationales, two reported adaptations/eight option rationales. No inventory increases. Shared README and navigation indexes deferred: PR #8 changes the chapter README, topic map, video guide, MCQ and PYQ indexes, research register and mock plan. Revisit after coordination; no overwrite. Five formal claim headers and eight Gynecology plus OBG manual claim headers inspected at main 00fa5cdc13df8764596cd164eb2f796e3ce190e0; Job 4 Group08C/22–25 and OBG scope disjoint. Both complete skills, AGENTS, Copilot and audit log fetched at identical hashes to preceding run; prior full skill reading and applicable rules used, fresh exhaustive line-by-line reread and complete historical audit-log review not certified. Existing clinical references preserved; no independent clinical recertification, source reauthentication or rendered UI check claimed. Next: Group 02 original 20-MCQ bank Q1 onward, then 02A/02B/02C banks in sequence, reported evidence and legacy mock scopes when safe. Draft-only, main not modified.

Run 4 continuation: Group 02 original 20-MCQ bank Q1–Q10 answer paragraphs, 40 individual option explanations and exam clues rewritten. Exact preservation outside targeted answer prose, all 20 stems/options/keys, metadata, links, hidden blocks and Q11–Q20 untouched. Cumulative draft 70 original MCQs/280 individual rationales, two reported adaptations/eight rationales, five concept guides. Next Group 02 Q11–Q20. No new question or source counts.

## Run 5 — Group 02 Q11–Q20

All ten remaining answer explanations, 40 individual option rationales and exam clues rewritten in complete conversational Roman Hinglish. Group 02 original bank now 20/20 language-retrofitted. Exact text outside targeted answer prose unchanged, Q1–Q10 byte-identical, all English stems/options/keys, hidden blocks, metadata, links and original clinical evidence preserved. Cumulative draft: five concept guides, 80 original MCQs/320 individual option rationales, two reported adaptations/eight option rationales. No inventory increases. All 15 formal and manual claim headers listed in main tree inspected at e94e4f3f2b333cec81d9eab0ed65f02efa254434, all FREE at snapshot. Both full skill files, AGENTS, Copilot and audit log retrieved at unchanged hashes, prior complete skill review and current rule tails applied. Fresh exhaustive line-by-line reread and entire historical log review not certified. PR #8 still overlaps shared navigation files; deferred. Draft only, no main claim changed. No new clinical or historical source certification. Next Group 02A Q1 onward, 02B, 02C, reported evidence, and legacy mock/navigation coordination.

Run 5 continuation — Group 02A Q1–Q11: 11 existing answer explanations, 44 individual option rationales and exam clues rewritten in natural complete Roman Hinglish. All text outside targeted answer prose, English question stems/options/keys, metadata, links and hidden blocks preserved exactly. Q12–Q21 unchanged. Cumulative draft: five concept guides, 91 original MCQ explanations/364 individual option rationales, two reported adaptations/eight individual option rationales. No new inventory or evidence claims. Next Group 02A Q12–Q21, then 02B/02C. Draft only.
