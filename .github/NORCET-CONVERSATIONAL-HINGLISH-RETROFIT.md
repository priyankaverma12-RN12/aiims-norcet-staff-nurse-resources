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
- Nursing Foundations MCQs/01-Nursing-Process-and-Clinical-Judgment-20-MCQs.md: Q1–Q3 correct-answer explanations and 12 option rationales expanded. All original stems, options, keys, hidden block markers, metadata and links preserved. Q4–Q20 unchanged. No new questions counted.
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
| Nursing-Foundations | 29 | 58 | 6 | 29 | 0 | 1 | Draft partial: two concepts, Q1–3 |
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

Nursing Foundations original bank 01 Q4 onward, then 01A and 01B MCQ banks, other concept guides and learner-facing indexes in sequence. Coordinate with Jobs 1–5 and manual scopes. Do not overwrite their live changes. Validate exact remote readback, unchanged questions and all four rationales. Compare latest main before merging PR #12. Review the rest of each package, including mocks, PYQs, revision, indexes and any embedded questions. Apply the existing complete clinical audit protocol when a clinical defect is found. All counts and statuses must reflect actual reviews, not estimates.
