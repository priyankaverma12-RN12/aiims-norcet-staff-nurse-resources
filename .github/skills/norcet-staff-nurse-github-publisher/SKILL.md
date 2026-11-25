---
name: norcet-staff-nurse-github-publisher
description: >-
  Publish only actually studied AIIMS NORCET and Himachal Pradesh Staff Nurse
  nursing material to this GitHub repository when the user says "push this to
  GitHub", "publish today's notes", "upload today's chapter", or equivalent.
  Research trustworthy sources, produce thorough beginner-friendly Hinglish
  Concepts, original unchanged-English MCQs with difficulty labels and detailed
  Hinglish solutions, appropriately sourced Previous Year Questions, verified
  topic-wise YouTube learning and question-practice links, and original diagrams,
  with a simple chapter-first layout and verified navigation.
---

# Nursing study → GitHub publisher (canonical rules)

**Owner's repo:** https://github.com/priyankaverma12-RN12/aiims-norcet-staff-nurse-resources  
**Applies to:** AIIMS NORCET preparation + Himachal Pradesh HPRCA/older HPSSC Staff Nurse exam prep.  
**Rule version:** 1.0 (25 November 2026).  
**Priority:** These explicit user preferences govern publishing. If old \`README.md\` or \`CONTRIBUTING.md\` conflicts, update it to agree with this skill.

## 1. Trigger: "push this to GitHub"

When the user says **"push this to github"**, **"publish what I learned today"**, **"add today's nursing topics to GitHub"**, or similar:

1. Understand **what has ACTUALLY been covered** in today's conversation and relevant earlier study sessions. Use the conversation history, available past-chat context, current Project files, and existing GitHub material; never infer completed study from an exam syllabus alone.
2. Read **this skill**, the repository README, chapter README and existing related notes **before editing**.
3. Research the exact learned concepts to make them medically accurate and exam-appropriate. Research previous papers and instructional videos. **Do not invent sources or skip verification silently.**
4. Update or create the smallest coherent set of **long, useful notes + matching MCQ bank + checked visuals + Previous Year Questions evidence + video links + revision if warranted**.
5. **Actually commit to the connected GitHub repository** when write access is available. Don't just draft or say "done". After commit, fetch files/links and verify them; report any incomplete tasks clearly.
6. **If access/verification is missing:** do the work possible, explain exactly what was not published, do not claim a successful push, and do not fabricate question provenance.

**No repeated interrogation:** Don't ask the user to repeat already known topics. If exact earlier question wording is inaccessible, mark it unrecovered; do NOT recreate and pretend it is verbatim.

## 2. Permanent content boundaries

- **Only publish chapters/topics the learner has actually studied** in class or with ChatGPT. Don't add advanced, unrelated, merely scheduled, or upcoming material.
- Follow **theory → quick revision → MCQs → explain mistakes and weak areas**. The learner is building foundations and wants high-yield, gradually tougher NORCET/HP Staff Nurse questions, not excessive peripheral theory.
- Keep the progression **day-wise** when useful, but **days are names in files, NOT nested folder levels**.
- Chapter names are added when relevant and studied; **no pre-created empty chapters**.
- Do not publish identifiable private patient data, medical reports or the learner's personal performance scores to a public repo unless they explicitly request those disclosures.
- For a partially taught topic (e.g. Diagnostic Investigations only introduced), use a clear **INTRODUCTORY / NOT YET FINISHED** label, and don't silently teach unstudied advanced content.
- Re-read existing content and prevent duplicate concepts/MCQs before adding. Preserve existing original files or questions unless the user specifically instructs replacing them; use git history to recover old exact wording.

## 3. Keep navigation FLAT — group 2–4 related topics in meaningful files

**Public study structure:**

\`\`\`text
Chapters/
  <Nursing-Chapter>/
    README.md
    Concepts/
      Day-XX-TopicA-TopicB-TopicC.md
    MCQs/
      Day-XX-TopicA-TopicB-TopicC.md
      Day-XX-Final-Mock.md                # only after actually attempting/studying
    Previous-Year-Questions/
      README.md
      <Exam-Year-Source-Topic>.md         # only when source-backed evidence exists
    Revision/
      Day-XX-Quick-Revision.md
    Assets/
      topic-specific-original-diagram.svg
      optional-short-original-animation.gif
    References.md
\`\`\`

**Maximum navigation:** Repo home → Chapter home → one concept or MCQ file. **No subfolder per tiny topic**, no \`Day-XX/Topics/<topic>/Concepts/\` hierarchy. A chapter may have separate Concepts, MCQs, Previous-Year-Questions, Revision and Assets folders, no extra nesting.

**Grouping:** Usually combine **2, 3 or 4 related studied topics** into **one substantial Markdown file** with a **descriptive filename listing those topics**. Example:
\`Concepts/Day-03-Airway-Assessment-Breath-Sounds.md\` and
\`MCQs/Day-03-Airway-Assessment-Breath-Sounds.md\`.
Do not create artificial small files just to meet arbitrary quotas. If one topic is genuinely large, one long file can be better; if the whole study day naturally fits two high-value files, use those. The objective is **worth opening and reading**, not number of files.

**Chapter README** must be a **useful table of contents** (not 2–3 empty lines). Include a concise chapter introduction, studied-coverage/status table, **topic group → Concepts → English MCQs → Previous Year Questions → video teaching → video MCQ practice → revision** columns/links, embedded chapter overview diagram, and clear next-study navigation. Keep the root README navigable without duplicating the whole chapter's notes.

## 4. Language contract (non-negotiable)

| Content part | Required language |
|---|---|
| **Concept teaching, explanations, summaries, mnemonics** | **Easy Hinglish**: simple English + Roman Hindi, as if teaching a nursing fresher; medical terminology English |
| **MCQ stem + EVERY answer option (A/B/C/D)** | **English only**, original wording exactly as first authored or preserved in source |
| **Labels/metadata** | English: \`Easy\`, \`Medium\`, \`Difficult\`, Exam focus, source status |
| **Correct answer** | Original English answer text/letter |
| **Why correct, why A/B/C/D wrong, hints, memory tricks, numerical steps** | Detailed **Hinglish**, friendly and clear |
| **YouTube labels, study guidance** | Simple Hinglish with clear channel/video titles |

**Never translate or rewrite an existing MCQ's English stem/options**; for previously asked chat MCQs, recover the exact words if possible. If unrecoverable, write a **NEW ORIGINAL** question in English and label it accordingly. Preserve capitalization, units and options, correct factual errors by noting the correction and source rather than silently changing a previously used test question. Do not use invented official previous-paper wording.

Avoid overly formal pure-English textbook paragraphs and overly technical Hindi terms. Explain technical words at first appearance. Don't use the prohibited shorthand "PYMCQ": always spell out **Previous Year Questions** (full name in folder, labels and navigation).

## 5. Concepts page quality standard (substantial, not filler)

For every grouped concept file include:

1. Clear title and **studied topics**, learner level, **Covered / Introductory** status.
2. Top links: **Chapter | matching Concepts/MCQs | Previous Year Questions | Quick Revision | References**. Repeat useful cross-links at the bottom.
3. **Clickable table of contents** with Markdown anchor links; describe the 2–4 topics with helpful subheadings in a **single long file**.
4. Explain from **basic → understandable example → NORCET/HP Staff Nurse high-yield fact → clinical exam reasoning**; teach only what has been covered.
5. Meaningful definitions, comparison tables, scenarios, formulas, solved numericals with units, normal-value cautions, **common mistakes** and simple memory tricks.
6. **Original diagrams** adjacent to each appropriate concept, with descriptive alt text; explanatory callouts under diagrams, not image-only learning.
7. A table with columns **Studied Topic | Key concept | Best teaching YouTube video | Best YouTube MCQ-practice video | Difficulty / exam importance**. Specific working *video* URLs only, with creator, duration/date when verified. Link to recorded study videos where appropriate. Don't use a random channel URL as evidence for a specific lesson.
8. A short **What I should remember** recap and links directly to matching MCQs and authentic-source previous-paper material.
9. Citations/source reference lines for nontrivial clinical claims and any current exam pattern statements. Correctness matters more than length; don't repeat vague filler just to inflate Markdown size.

**Quality target:** Rich enough that opening the file is worth it—several complete explanations and examples per group. No rigid word count; prefer density and clarity.

## 6. MCQ question bank: original English, leveled, deeply explained

**Exam targets:** AIIMS NORCET Prelims/Mains and HP Staff Nurse. Where a user specifically asks for NEET-style biology practice, limit it to directly relevant nursing concepts **already learned** and label that scope. No unrelated NEET syllabus chapters.

For **every new/updated question**:

\`\`\`markdown
### Q17. [EXACT ORIGINAL ENGLISH QUESTION STEM]

**Difficulty:** Medium | **Exam focus:** NORCET / HP Staff Nurse | **Topic:** ...

- **A.** [Original English option]
- **B.** [Original English option]
- **C.** [Original English option]
- **D.** [Original English option]

<details><summary>💡 Answer-neutral hint (optional)</summary>

Easy Hinglish hint, answer reveal nahi hona chahiye.

</details>

<details><summary>✅ Correct answer and detailed explanation</summary>

**Correct answer: B. [Original English option]**

**Kyun sahi hai:** Mechanism + basic concept + relevant nursing exam reasoning.

**A kyun galat:** ...
**C kyun galat:** ...
**D kyun galat:** ...

**Numerical:** Formula → substitution → calculation → units, if relevant.

**NORCET/HP exam trick:** Easy Hinglish memory rule.

**Related:** [Concepts](../Concepts/Day-XX-TopicA-TopicB.md) · [Previous Year Questions](../Previous-Year-Questions/README.md)

</details>
\`\`\`

- **Difficulty tags on EVERY question** (including mock items and newly added exam-style questions): **Easy / Medium / Difficult**. Criteria: Easy = direct definition, value, one-step; Medium = 2-step calculation or applied concept; Difficult = multi-step clinical/numerical inference within already taught scope. Avoid claiming these official exam difficulty classifications.
- For a **new bank**, aim for a useful balance across levels with **meaningful Medium and Difficult** questions relevant to NORCET and HP Staff Nurse. Do not force difficult questions on topics the learner has not yet covered. Calibrate based on existing learning progress and source papers. **Never invent official weightage or guaranteed repeat topics.**
- Keep exact English stems/options unchanged for any previously published original bank, even if adding tags and explanations.
- **New original questions** are not actual previous-paper questions. Clearly state provenance at file top.
- Preserve original MCQs from actual teaching if exact wording is accessible. When only subject is known, add an explicitly **new original** question rather than pretending to recover a prior one.
- Use proper answer key, consistent options, no multiple plausible "best" answers. For open-ended short answers, clearly distinguish from 4-option MCQ format.
- Make **separate mock** only after it was actually covered/studied or when requested; restore past mock questions word-for-word if available.
- Include simple internal navigation within a long bank; embed relevant diagrams, but do not make the question answer visible in image or hint.
- In tutoring chat, if asked, practise **one MCQ at a time or batches of 10**, check the learner's choice, maintain **running score** and targeted weak-topic revision. Publishing the bank must not expose private scores by default.

## 7. Previous Year Questions — careful evidence hierarchy

**Folder exact name:** \`Previous-Year-Questions/\` (**never** \`PYMCQ\`).

Search for exact relevant respiratory/current studied-topic questions from:
1. **Official AIIMS / HPRCA / older HPSSC** question papers, answer keys, notices, archived exams.
2. **Scanned historic question booklets** from verifiable archives with **exam name/year, post code, booklet series, original question number/page**.
3. Third-party **exam/coaching sites**, memory-based reports, paper-analysis videos and credible educational collections. These may be leads, not proof of official question wording.

For each found item publish a provenance row:

\`Exam | Year/session | Post code/series (if any) | Original Q number | Topic | Source URL | Source status | Answer-key status | Link to relevant concepts and MCQs\`.

Source status must be precisely one of:
- **Official exact paper** (verified original and permission/copyright appropriate)
- **Scanned historical paper (third-party hosted)**
- **Unverified memory-based / reconstructed / coaching-reported**
- **Not located** (not a question; never invent)

**Exact English question wording:** If a trustworthy source explicitly publishes it and reproducing a *short excerpt* is lawful, use exact English stem/options as permissible and cite it. Otherwise **link to the exact original page and number** and keep the full wording there; don't translate or paraphrase while saying "exact". Preserve option order. If user-supplied original paper content is licensed/allowed, quoting may be possible according to applicable rules. Never bulk-copy copyrighted question papers, scan images, coaching PDFs, answer keys or YouTube transcripts without permission.

**Answer key:** Cite official answer key if available. If only medically inferred, label \`Answer: medically reasoned; official key not verified\`. Explain in Hinglish, and point out any ambiguous or potentially outdated item. **Never turn student recollection into "verified NORCET previous-year question".**

If no verifiable question from a studied topic was found, explicitly state **"No verified Previous Year Question located for this studied topic as of [date]"**. Do NOT fill the section with invented "previous-year" questions. Use ordinary original practice bank instead.

## 8. Deep research procedure — EVERY time, not just once

Research each **studied topic** before publishing, not just the chapter title. Search multiple variants (English clinical term, common exam keywords, year/post code, Hindi-English coaching terms).

**Priority research pipeline:**
1. **Official exam**: https://www.aiimsexams.ac.in/ (NORCET) and https://hprca.hp.gov.in/ (current HP notices / papers); identify official vs older HPSSC history. Don't assume an older exam pattern applies today.
2. **Authoritative content**: OpenStax, NCBI Bookshelf, Merck Manual, MedlinePlus, ATS/ERS or specialty guidelines as relevant; use contemporary editions; crosscheck contradictions.
3. **Previous papers**: Official PDFs first, then clearly attributed scanned historical archives, legitimate question-bank providers or memory-based question compilations; capture year, series, Q number, source confidence.
4. **Coaching sites**: Evaluate Arogyam / Nursing Wallah-PW and relevant reputable nursing academies or exam-prep sites for useful syllabus explanations, examples, and PYQ analyses. Coaching claims are **secondary evidence**; never pass them off as official exam notices or verified previous-paper text.
5. **YouTube**: Search **topic teaching videos AND topic MCQ-solving videos separately**. Candidate creators include Arogyam/Nursing Wallah and other credible nursing teachers; **choose by content fit and verified quality, not sponsorship or popularity alone**.

**For EACH suggested YouTube video**, verify if possible:
- Actual **watch URL** (not fabricated, and ideally not just channel homepage)
- Creator/channel and exact video title, checked date, spoken language (Hindi/Hinglish/English), approximate length, free/paid status if known
- Does this specific video **actually explain the studied concept** (not advanced/unrelated)?
- For MCQ video: is it **question-solving practice** (not just lecture)?
- Prefer beginner-friendly, understandable, accurate and clinically grounded videos; state if details could not be independently confirmed.
- Put **one teaching video + one practice video** per topic group when a suitable video truly exists; additional only if adding value. Verify links are reachable/legitimate, and avoid duplicate or wrong-topic links.
- If no verified relevant video exists, write \`No suitable video verified\` rather than fake a URL.
- Never claim to have watched or fully reviewed the video unless the tool genuinely accessed video contents/transcript.

**Research log:** Add/update \`References.md\` with date checked and source list: \`Topic | Clinical source | Exam/paper source | Teaching video | MCQ video | Verification notes\`. Preserve existing references without duplicate links.

## 9. Original diagrams, images and animations — useful, correct, accessible

- Aim for **multiple diagrams per studied concept cluster**, only when visually helpful: anatomy with labels, flow diagrams, phase comparisons, volume curves, nursing assessment positions, spirometry/ABG decision trees.
- Prefer **original SVG** in \`Assets/\` when it allows crisp GitHub rendering; original PNG/WebP if necessary. Add accurate labels and helpful alt text. Illustrations must **not** depict a physiologically incorrect pathway or give away the MCQ answer in a quiz question.
- For **breathing movements / phase sequences**, a short **original animated GIF** can help when tooling is available; include caption, readable labels, consistent motion and a static alternative for accessibility. Don't invent GIF paths or imply animations were produced when they were not.
- Do not rehost unlicensed textbook images, screenshots, coaching slides, or video frames. Link to permitted externally hosted material or generate original diagrams.
- **Embed illustrations inside the relevant concept/MCQ sections**; keep an optional asset gallery in the chapter README. Don't make readers open the assets directory just to understand the notes.
- Use medically accurate axes, units, percentages, respiratory directions and annotations. Check for misleading visual proportions.

## 10. Update and publish checklist (must pass)

**Pre-publish**
- [ ] GitHub repo connected; branch read; existing day/chapter files read; actual topics and learning state recovered from chat/history.
- [ ] No new unstudied topics or duplicate content. Appropriate 2–4 topic grouping and descriptive filenames.
- [ ] Deep research recorded: official exam info, clinical sources, relevant coaching sites, Previous Year Questions evidence, YouTube lecture + question-practice link attempts.
- [ ] Detailed **Hinglish Concepts** with sources, worked examples, diagrams, video tables.
- [ ] **English EXACT MCQ stems and options**, plus **Easy/Medium/Difficult** label **on every question**; well-calibrated nursing-exam difficulty.
- [ ] Correct answer key; detailed Hinglish **why right, why other options wrong**, hints, tricks and units.
- [ ] **Previous Year Questions** separate, evidence-labeled; exact English wording only where legitimately available, otherwise original source link.
- [ ] Top + bottom navigation on **every page**: Chapter, Concepts, MCQs, Previous Year Questions, revision and relevant YouTube.
- [ ] Any personal scores or private data not published without request.

**Post-publish**
- [ ] Commit to \`main\` (or current expected user branch) via connected GitHub. Never force push or delete original content unnecessarily.
- [ ] Re-fetch changed files and verify actual remote contents/commit SHA.
- [ ] Validate all relative paths, section anchors, image references and specific YouTube URLs as best available.
- [ ] Count questions, **exactly four English options**, difficulty labels, answer keys, hint/solution blocks and duplicate stems.
- [ ] Check diagrams/GIF files are real and readable; source links don't point to unrelated subjects.
- [ ] Report files changed, covered topics, counts by difficulty, added verified historical/memory-based questions separately, videos, diagrams, direct GitHub links and explicit gaps.

## 11. Current known repository baseline (do not re-publish unrelated material)

As of **25 November 2026**, \`Chapters/Respiratory-System/\` already contains:
- Day 1: respiratory anatomy and physiology, airway/lobes, alveoli/surfactant, pleura, breathing, pulmonary circulation, lung volumes/capacities, minute ventilation and normal values; **40 original MCQs + 15-question mock**.
- Day 2: inspection, palpation, percussion, auscultation, **ABG basics**, **spirometry basics** and **introductory only** diagnostic investigations; **36 original MCQs**.
- Original diagrams and separate **Previous Year Questions** (older scanned HP paper references + clearly labeled NORCET memory-based report).
- **Do not relabel those original 91 exam-style MCQs as verified past-exam items.**
- For an existing bank which has not been difficulty-tagged yet, first **backfill all questions with Easy/Medium/Difficult labels without changing their original English stems/options**, and keep their Hinglish rationales.
- Previous-year research already done is not a waiver for future topic-specific searches.

## 12. Cross-session use and limitations

This skill is stored in the GitHub repo and is intended to be **re-read on every future GitHub-publishing task**. GitHub Copilot/agents that support repository skill discovery may load it from \`.github/skills/\`. **ChatGPT does not automatically inject arbitrary repository SKILL.md files or change its personal Memory just because the file exists**: when a later ChatGPT session receives "push this to GitHub", locate this repo and fetch this file before writing. If unavailable, state the access limitation rather than pretending to have read it.

**Do not promise background or delayed publishing.** Execute GitHub operations in the current turn when tools are available, and transparently report the real result.
