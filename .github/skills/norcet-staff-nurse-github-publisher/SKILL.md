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
**Priority:** These explicit user preferences govern publishing. If old `README.md` or `CONTRIBUTING.md` conflicts, update it to agree with this skill.

## 1. Trigger: "push this to GitHub"

When the user says **"push this to github"**, **"publish what I learned today"**, **"add today's nursing topics to GitHub"**, or similar:

1. Understand **what has ACTUALLY been covered** in today's conversation and relevant earlier study sessions. Use the conversation history, available past-chat context, current Project files, and existing GitHub material; never infer completed study from an exam syllabus alone.
2. Read **this skill**, the repository README, chapter README and existing related notes **before editing**.
3. Research the exact learned concepts to make them medically accurate and exam-appropriate. Research previous papers and instructional videos. **Do not invent sources or skip verification silently.**
4. Update or create the smallest coherent set of **long, useful notes + matching MCQ bank + checked visuals + Previous Year Questions evidence + video links + revision if warranted**.
5. **Actually commit to the connected GitHub repository** when write access is available. Don't just draft or say "done". After commit, fetch files/links and verify them; report any incomplete tasks clearly.
6. **If access/verification is missing:** do the work possible, explain exactly what was not published, do not claim a successful push, and do not fabricate question provenance.

**No repeated interrogation:** Don't ask the user to repeat already known topics. If exact earlier question wording is inaccessible, mark it unrecovered; do NOT recreate and pretend it is verbatim.

## 1A. Session workflow, resumed topics and correct chapter placement

The learner's normal workflow is **study a topic → understand it → ask doubts → solve MCQs/mock with feedback → say "push this to GitHub."** Publish what was actually covered AND the exact solved MCQ questions/options recoverable from conversation, with correct keys and detailed Hinglish rationales. Do not publish drafts of a not-yet-studied topic as completed.

**Chapter/topic identity wins over dates or message order.** Keep `Chapters/Respiratory-System/` active for ALL ongoing respiratory study, even if learner jumps to another chapter for a while or returns to Day 1 after Day 5. The existing study session's original Day-XX concept and MCQ files own that subject: **append/update the existing matching file instead of creating Day-XX copy or a new folder based on today's calendar date**. Preserve already solved English question stems and options verbatim; append only distinct later questions, renumber safely when needed, and update counts, links, revision and chapter README. If a topic is genuinely new within this chapter, add the next logical Day-XX file using substantial groupings of 2–4 studied subtopics; don't assume the day number from current date.

**Out-of-order or multiple chapters:** Map every studied subtopic to the correct `Chapters/<Chapter>/` using topic meaning, not chronological order. If the student returns to an earlier chapter after studying another, continue the existing chapter files. A new chapter is created/activated **only after actual study begins there**. An empty `Cardiovascular-System/` placeholder is not permission to publish that chapter yet. GK/current affairs goes in its OWN chapter only after those subjects are studied; include relevant videos and question-practice resources there as well.

**Each push, in order:** 1) retrieve current-session/past study and GitHub existing notes; 2) reconcile what was new and all answered doubts; 3) publish newly learned concepts to matching existing Concepts file; 4) publish all solved/actually practised questions to corresponding MCQs/mock, exact English wording where available; 5) research missing high-yield angles and maintain optional ONE consolidated supplement in `Concepts/`; 6) add source-linked Previous Year Questions from India-wide exams and topic-specific teaching/MCQ videos; 7) validate uniqueness, anchors, visuals, answer keys and remote commit. **A second push on the same day should UPDATE or CONCATENATE, not overwrite or duplicate.** If user studied no new MCQs, don't invent that they solved any.

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

```text
Chapters/
  <Nursing-Chapter>/
    README.md
    Concepts/
      Day-XX-TopicA-TopicB-TopicC.md
      Extra-High-Yield-Concepts-and-MCQs.md  # only if high-value missed points justify 30+ unique MCQs
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
```

**Maximum navigation:** Repo home → Chapter home → one concept or MCQ file. **No subfolder per tiny topic**, no `Day-XX/Topics/<topic>/Concepts/` hierarchy. A chapter may have separate Concepts, MCQs, Previous-Year-Questions, Revision and Assets folders, no extra nesting.

**Grouping:** Usually combine **2, 3 or 4 related studied topics** into **one substantial Markdown file** with a **descriptive filename listing those topics**. Example:
`Concepts/Day-03-Airway-Assessment-Breath-Sounds.md` and
`MCQs/Day-03-Airway-Assessment-Breath-Sounds.md`.
Do not create artificial small files just to meet arbitrary quotas. If one topic is genuinely large, one long file can be better; if the whole study day naturally fits two high-value files, use those. The objective is **worth opening and reading**, not number of files.

**Chapter README** must be a **useful table of contents** (not 2–3 empty lines). Include a concise chapter introduction, studied-coverage/status table, **topic group → Concepts → English MCQs → Previous Year Questions → video teaching → video MCQ practice → revision** columns/links, embedded chapter overview diagram, and clear next-study navigation. Keep the root README navigable without duplicating the whole chapter's notes.

## 3A. One combined extra file for missed high-yield material

On EVERY `push this to GitHub`, after publishing what the learner actually studied, research any **important missing angle within that already studied parent topic**. If genuinely worthwhile, use **ONE cumulative extra Markdown file inside this chapter's `Concepts/` folder**:
`Chapters/<Chapter>/Concepts/Extra-High-Yield-Concepts-and-MCQs.md`.

**ONE reusable file per chapter, not one extra file each day.** On later pushes, return to this SAME file, add only truly new missed points/MCQs and update existing links. Do not create a separate tiny `MCQs/` supplement, an extra chapter-root Markdown file, or multiple missed-topic documents. Keep this file substantial and worth reading. It may contain sections grouped by the original studied days/topics.

Inside that single file, include:
- **Only NORCET / India-wide Staff Nurse high-yield missed points related to already studied material**, carefully explained in beginner-friendly Roman Hinglish, with original diagrams, mini clinical situations, formulas, sources, high-quality teaching and MCQ practice YouTube links.
- **30+ meaningful, genuinely UNIQUE NEW English four-option MCQs** if the studied scope can support that many. Aim mainly **Medium and Difficult**, especially case-based/numerical/application questions following NORCET level, with a few Easy checks only when helpful. Each MCQ requires `**Difficulty:** Medium | **Exam focus:** NORCET / PGIMER / SGPGI / ESIC / RRB / State Staff Nurse` (choose truly relevant exam focus; NOT claim it actually appeared).
- **Hidden answers per question** using native GitHub Markdown HTML `<details><summary>✅ Sahi answer aur explanation dekho</summary> ... </details>`. The closed block must hide the answer and detailed Hinglish explanation until clicked. Explain EACH wrong option separately, a relevant exam trick, calculations/units where useful. Hints, when present, stay answer-neutral in a separate closed dropdown.
- **Uniqueness audit** against every existing Concepts, MCQs, mocks, previous supplement and Previous Year Questions item in this chapter, checking BOTH exact and substantive/semantic duplicates. A meaningful different application is fine; merely changing patient name or numbers is not a new learning point.
- **Cross-links**: chapter README, original day Concepts and MCQs, Previous Year Questions, video sections and revision must point to the extra file; the file links back to all. Original SVG diagrams can live in `Assets/` but the learner-facing supplement itself is one single Markdown file.

If **fewer than 30 defensible distinct high-yield questions** are available at that point or no important gaps exist, **don't pad with repeated questions or force a low-quality file**. Improve existing content where appropriate and report that the supplement was not added yet. More than 30 is welcome when every question adds real exam value. Do not label this supplementary original question bank as authentic past-exam questions.

**Quality check:** Count the extra file's distinct MCQs, four unchanged English options each, `Easy/Medium/Difficult` label on each, a matching initially closed `<details>` answer for EVERY MCQ, detailed Hinglish reasoning and trustworthy images, plus verified internal links. On future revisits, append/update the SAME file instead of regenerating.

---

## 4. Language and consistent learner-page formatting (non-negotiable)

| Content part | Required language |
|---|---|
| **Concept teaching, explanations, summaries, mnemonics** | **Easy Hinglish**: simple English + Roman Hindi, as if teaching a nursing fresher; medical terminology English. Use Roman script only (e.g., `Dhyan de`, not Hindi/Devanagari letters), unless the user explicitly changes this preference. |
| **MCQ stem + EVERY answer option (A/B/C/D)** | **English only**, original wording exactly as first authored or preserved in source |
| **Labels/metadata** | English: `Easy`, `Medium`, `Difficult`, Exam focus, source status |
| **Correct answer** | Original English answer text/letter |
| **Why correct, why A/B/C/D wrong, hints, memory tricks, numerical steps** | Detailed **Hinglish**, friendly and clear |
| **YouTube labels, study guidance** | Simple Hinglish with clear channel/video titles |

**Never translate or rewrite an existing MCQ's English stem/options**; for previously asked chat MCQs, recover the exact words if possible. If unrecoverable, write a **NEW ORIGINAL** question in English and label it accordingly. Preserve capitalization, units and options, correct factual errors by noting the correction and source rather than silently changing a previously used test question. Do not use invented official previous-paper wording.

Avoid overly formal pure-English textbook paragraphs and overly technical Hindi terms. Explain technical words at first appearance. Don't use the prohibited shorthand "PYMCQ": always spell out **Previous Year Questions** (full name in folder, labels and navigation).


### Same simple Hinglish format across ALL study pages

- **Roman script only** for learner-facing text. Example: `Dhyan de`, `Kyun sahi?`, `Baaki options kyun nahi?`, `Exam trick`. No Hindi-script/Devanagari letters; avoid long English-only notes.
- **MCQ question stems and A/B/C/D options stay in ORIGINAL English word-for-word**. Never translate, reorder or rewrite. Correct answer term also stays English. Answer explanations, wrong-options reasoning, hints and question-specific exam tricks use **easy Roman Hinglish**.
- **One consistent short note style:** `> **Dhyan de:** ...` (max 1–2 lines). Avoid repeated disclaimers and generic advice. Previous-paper instructions in Hinglish; original exam source wording remains English on source page.
- Keep each page's navigation **Chapter | Concepts | MCQs | Previous Year Questions | Revision**, with short accessible labels.
- Every MCQ (including mock) has **Difficulty: Easy / Medium / Difficult**, original English options, expandable detailed Hinglish explanation, and a relevant exam trick.
- Every new push includes an **all-pages consistency audit** for Devanagari, overly complex English notices, broken links, original MCQ wording, difficulty labels, explanation blocks and repeated generic tricks.
- Agent-instruction files may stay technical English; these student-facing rules apply to READMEs, Concepts, MCQs, mocks, Previous Year Questions and Revision.

## 4A. Chat-to-GitHub teaching fidelity — preserve SAME wording and visuals

**The actual teaching conversation is the source of truth for how this learner understood the topic.** The user studies in chat (theory → doubts → solved MCQs), then asks to push. **GitHub should read like a slightly more complete version of THAT SAME lesson**, not a separately rewritten textbook in an unfamiliar voice.

1. **Retrieve the exact relevant study-chat material when available** (same chapter/Day/topic, including older sessions and revisits). Recover the teacher's ORIGINAL Roman Hinglish definitions, simple phrasing, explanations, solved examples, analogies, worked numericals, mnemonics, diagram labels and links. Use the conversation text as the starting draft, not a generic replacement generated from headings. Preserve their **original order and wording wherever still accurate and helpful**.
2. **Stay almost word-for-word consistent:** Keep familiar phrases such as `N → P → L → T → B → B → A`, `C3, 4, 5 keep the diaphragm alive`, `Bigger chest volume → lower pressure → air enters`, and `Type I = gas exchange / Type II = surfactant` where they were actually taught. Never pretend a phrase was taught in chat unless traceable. Keep Roman Hinglish (e.g., `Dhyan de`, `Kyun sahi hai`) in BOTH chat and GitHub; medical names and English MCQ options unchanged.
3. **Same real-life analogy/example:** If chat explained using a syringe, wet balloon, school corridor, delivery truck, water bottle or another analogy, retain THAT analogy, not a different analogy that makes the GitHub content feel unfamiliar. If an original analogy was inaccurate, flag and gently correct it with medical source verification rather than silently changing the user's learning context.
4. **Same visual reference when accessible:** Reuse the exact **chat-presented diagram/image**, its teaching labels, placement, caption, arrows and explanation when the original asset is available and its reuse is permitted. If only a description is recoverable or original image bytes cannot be accessed, create a medically accurate original SVG/illustration **clearly as a reconstruction**; NEVER claim the reconstructed graphic is the exact chat image. Keep images near the corresponding explanation and add alt text.
5. **Expand, don't replace:** Add just enough extra detail for a complete nurse-exam note: `kya hai → kaise/kyun → same analogy → same solved example → 1 extra application if useful → NORCET / all-India Staff Nurse exam trap → diagram/MCQ/video links`. Preserve the taught simple language; extra depth must not be filler or unstudied advanced content. For numericals preserve original chat question values, units, steps and final answer when recoverable. For practiced MCQs use EXACT English stems/options as originally solved.
6. **Revisits:** If the learner studies another piece of Day 1 after Day 3, integrate their new teaching wording, images and solved MCQs into the EXISTING Day 1 files. Avoid rewriting an earlier explanation or losing its familiar example.
7. **Mandatory pre-push comparison:** Compare the proposed GitHub page against the relevant available conversation for `language/wording | analogy | worked examples and numbers | mnemonics | images/diagrams | question stems/options`. If conversation/images are not retrievable, be honest: use verified material as a best-effort supplement and say exact visual/text fidelity could not be checked. Don't claim identical content or invented prior coverage.

**Priority:** A correct original teaching explanation that the learner recognizes is more valuable than a polished but disconnected rewrite. Keep clear headings, readable spacing, tables and substantial explanatory paragraphs while preserving those explanations.

---

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

### Detailed teaching standard — not just short definitions

**Whole-theory language rule (learner clarified 26 Nov 2026):** The entire theory explanation should read like the Respiratory lessons: natural spoken Hindi written in Roman script, with necessary English medical terms and their simple meanings. Do not merely add a Hinglish introduction above dense English paragraphs. Rewrite the actual explanatory paragraphs and table descriptions in Hindi-English while retaining details, diagrams, numerical values, references, and exact English MCQ stems/options. Keep standard exam terminology in English.

**Learner-confirmed language benchmark (26 Nov 2026):** Use [Respiratory Day 1](../../../Chapters/Respiratory-System/Concepts/Day-01-Complete-Respiratory-Anatomy-Physiology.md) and [Respiratory Day 2](../../../Chapters/Respiratory-System/Concepts/Day-02-Complete-Respiratory-Assessment-Diagnostics.md) as the style reference for Cardiovascular and future chapters. Write conversational Roman Hinglish as if teaching the learner in chat: explain 'kya hai, kyun hota hai, kaise hota hai' in complete easy sentences, then clinical examples, analogies, step-by-step mechanisms and exam clues. Avoid dense textbook-style fragments and unnecessary difficult English; define unfamiliar terms in easy Hinglish. Retain medical terms, facts, values, diagrams, references, existing question text/options and detail. Do not shorten notes or claim new material has been studied. MCQ stems and options remain English; rationales use the same natural Hinglish.

GitHub Concepts pages must teach each actually studied topic in the **same familiar Roman Hinglish style as the chat**, with genuine depth, not a one-line summary:
- **Kya hai?** Define the term simply and explain unfamiliar English medical words.
- **Kyun/kaise?** Explain cause-and-effect and mechanisms step by step, not merely memorised facts.
- **Analogy:** Preserve the chat's original real-life analogy when recoverable; if adding a fresh analogy, don't falsely claim it was taught verbatim.
- **Example:** At least one relevant clinical scenario, before/after comparison or fully worked numerical, including values and units when suitable.
- **Exam reasoning:** Explain NORCET / India-wide Staff Nurse question angles, common confusions and meaningful medium/difficult application.
- **Visuals:** Reuse any accessible original chat images (with rights to reuse), otherwise make accurate clearly identified new diagrams near the relevant explanation.
- **Prior chat fidelity:** Keep the wording, mnemonics, examples and question text from past lessons largely unchanged; **add** a little useful depth rather than rewriting everything in a different voice.
- **No filler:** Complex topics like ABG interpretation and lung volumes need more than one worked example; simple topics can be shorter. Never extend into unstudied advanced chapters just to add length.

## 6. MCQ question bank: original English, leveled, deeply explained

**Exam targets:** AIIMS NORCET Prelims/Mains and India-wide Staff Nurse / Nursing Officer exams (PGIMER, SGPGI, ESIC, RRB, JIPMER where relevant, DSSSB, HPRCA/HPSSC, and other state recruitments). Where a user specifically asks for NEET-style biology practice, limit it to directly relevant nursing concepts **already learned** and label that scope. No unrelated NEET syllabus chapters.

For **every new/updated question**:

```markdown
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

**Related:** add a real relative link to the matching Concepts file and to the Previous Year Questions index (verify both).

</details>
```

- **Difficulty targets:** For future new NORCET-focused MCQs, emphasize **Medium and Difficult**, with clinical application, prioritisation, interpretation and multistep numericals from the studied scope; avoid filling the bank with Easy-only definition questions. Do not mislabel trivial questions Difficult or change original English stems/options just to increase difficulty. Preserve the earlier 91 practice/mock questions as the first foundation bank; strengthen by adding genuinely different tougher questions in future pushes.
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

**Folder exact name:** `Previous-Year-Questions/` (**never** `PYMCQ`).

Search for exact relevant respiratory/current studied-topic questions from:
1. **Official AIIMS / HPRCA / older HPSSC PLUS all-India Nursing Officer/Staff Nurse bodies:** PGIMER Chandigarh, SGPGI Lucknow, JIPMER, ESIC, RRB Nursing Superintendent, DSSSB, KGMU, AIIMS CRE, central/state health departments, and other state recruitment boards where relevant; query question papers, answer keys, notices and credible archives. Don't confuse one body's notice or official answer key with another's.
2. **Scanned historic question booklets** from verifiable archives with **exam name/year, post code, booklet series, original question number/page**.
3. Third-party **exam/coaching sites**, memory-based reports, paper-analysis videos and credible educational collections. These may be leads, not proof of official question wording.

For each found item publish a provenance row:

`Exam | Year/session | Post code/series (if any) | Original Q number | Topic | Source URL | Source status | Answer-key status | Link to relevant concepts and MCQs`.

Source status must be precisely one of:
- **Official exact paper** (verified original and permission/copyright appropriate)
- **Scanned historical paper (third-party hosted)**
- **Unverified memory-based / reconstructed / coaching-reported**
- **Not located** (not a question; never invent)

**Exact English question wording:** If a trustworthy source explicitly publishes it and reproducing a *short excerpt* is lawful, use exact English stem/options as permissible and cite it. Otherwise **link to the exact original page and number** and keep the full wording there; don't translate or paraphrase while saying "exact". Preserve option order. If user-supplied original paper content is licensed/allowed, quoting may be possible according to applicable rules. Never bulk-copy copyrighted question papers, scan images, coaching PDFs, answer keys or YouTube transcripts without permission.

**Answer key:** Cite official answer key if available. If only medically inferred, label `Answer: medically reasoned; official key not verified`. Explain in Hinglish, and point out any ambiguous or potentially outdated item. **Never turn student recollection into "verified NORCET previous-year question".**

If no verifiable question from a studied topic was found, explicitly state **"No verified Previous Year Question located for this studied topic as of [date]"**. Do NOT fill the section with invented "previous-year" questions. Use ordinary original practice bank instead.

## 8. Deep research procedure — EVERY time, not just once

Research each **studied topic** before publishing, not just the chapter title. Search multiple variants (English clinical term, common exam keywords, year/post code, Hindi-English coaching terms).

**Priority research pipeline:**
1. **Official exam**: https://www.aiimsexams.ac.in/ (NORCET), https://hprca.hp.gov.in/ (current HP), and relevant all-India boards (PGIMER, SGPGI, JIPMER, ESIC, RRB, DSSSB, KGMU, AIIMS CRE etc.); use primary notifications/keys when available, distinguish official vs recalled/reconstructed historic papers. Don't assume an older exam pattern applies today.
2. **Authoritative content**: OpenStax, NCBI Bookshelf, Merck Manual, MedlinePlus, ATS/ERS or specialty guidelines as relevant; use contemporary editions; crosscheck contradictions.
3. **Previous papers**: Official PDFs first, then clearly attributed scanned historical archives, legitimate question-bank providers or memory-based question compilations; capture year, series, Q number, source confidence.
4. **Coaching sites**: Evaluate Arogyam / Nursing Wallah-PW and relevant reputable nursing academies or exam-prep sites for useful syllabus explanations, examples, and PYQ analyses. Coaching claims are **secondary evidence**; never pass them off as official exam notices or verified previous-paper text.
5. **YouTube**: Search **EVERY actually studied subtopic individually** for BOTH a beginner teaching video and a relevant MCQ-solving/practice video; do not assume the earlier chapter-level videos cover every detail. Search each topic's main terms and coaching channel variants. The same suitable full-chapter video can be reused in multiple rows when its covered sections are explicitly verified; otherwise mark `Not separately verified`. For a future GK topic, search GK concept/current-affairs and GK MCQ practice videos as two separate resources. Candidate creators include Arogyam/Nursing Wallah and other credible nursing teachers; **choose by content fit and verified quality, not sponsorship or popularity alone**.

**For EACH suggested YouTube video**, verify if possible:
- Actual **watch URL** (not fabricated, and ideally not just channel homepage)
- Creator/channel and exact video title, checked date, spoken language (Hindi/Hinglish/English), approximate length, free/paid status if known
- Does this specific video **actually explain the studied concept** (not advanced/unrelated)?
- For MCQ video: is it **question-solving practice** (not just lecture)?
- Prefer beginner-friendly, understandable, accurate and clinically grounded videos; state if details could not be independently confirmed.
- Put **one teaching video + one practice video** per topic group when a suitable video truly exists; additional only if adding value. Verify links are reachable/legitimate, and avoid duplicate or wrong-topic links.
- If no verified relevant video exists, write `No suitable video verified` rather than fake a URL.
- Never claim to have watched or fully reviewed the video unless the tool genuinely accessed video contents/transcript.

**Research log:** Add/update `References.md` with date checked and source list: `Topic | Clinical source | Exam/paper source | Teaching video | MCQ video | Verification notes`. Preserve existing references without duplicate links.

## 9. Original diagrams, images and animations — useful, correct, accessible

- Aim for **multiple diagrams per studied concept cluster**, only when visually helpful: anatomy with labels, flow diagrams, phase comparisons, volume curves, nursing assessment positions, spirometry/ABG decision trees.
- Prefer **original SVG** in `Assets/` when it allows crisp GitHub rendering; original PNG/WebP if necessary. Add accurate labels and helpful alt text. Illustrations must **not** depict a physiologically incorrect pathway or give away the MCQ answer in a quiz question.
- For **breathing movements / phase sequences**, a short **original animated GIF** can help when tooling is available; include caption, readable labels, consistent motion and a static alternative for accessibility. Don't invent GIF paths or imply animations were produced when they were not.
- Do not rehost unlicensed textbook images, screenshots, coaching slides, or video frames. Link to permitted externally hosted material or generate original diagrams.
- **Embed illustrations inside the relevant concept/MCQ sections**; keep an optional asset gallery in the chapter README. Don't make readers open the assets directory just to understand the notes.
- Use medically accurate axes, units, percentages, respiratory directions and annotations. Check for misleading visual proportions.

## 10. Update and publish checklist (must pass)

**Pre-publish**
- [ ] GitHub repo connected; branch read; existing day/chapter files read; actual topics and learning state recovered from chat/history.
- [ ] Chapter/topic mapping and original DayXX ownership recovered even for out-of-order study, revisits, later same-day pushes; no duplicate folders/files. Appropriate 2–4 topic grouping, and Concepts-folder-only cumulative optional supplement.
- [ ] Deep research recorded: official exam info, clinical sources, India-wide Nursing Officer/Staff Nurse past-paper leads (not just HP), coaching sites, Previous Year Questions evidence, and teaching + MCQ YouTube links attempted for EACH taught subtopic.
- [ ] Detailed **Hinglish Concepts** with sources, worked examples, diagrams, video tables.
- [ ] **English EXACT MCQ stems and options**, plus **Easy/Medium/Difficult** label **on every question**; well-calibrated nursing-exam difficulty.
- [ ] Correct answer key; detailed Hinglish **why right, why other options wrong**, hints, tricks and units.
- [ ] **Previous Year Questions** separate, evidence-labeled; exact English wording only where legitimately available, otherwise original source link.
- [ ] Top + bottom navigation on **every page**: Chapter, Concepts, MCQs, Previous Year Questions, revision and relevant YouTube.
- [ ] Any personal scores or private data not published without request.

**Post-publish**
- [ ] Commit to `main` (or current expected user branch) via connected GitHub. Never force push or delete original content unnecessarily.
- [ ] Re-fetch changed files and verify actual remote contents/commit SHA.
- [ ] Validate all relative paths, section anchors, image references and specific YouTube URLs as best available.
- [ ] Count solved and supplementary questions, **exactly four English options**, unchanged original wordings, difficulty labels (mainly Medium/Difficult for new challenging practice), answer keys, closed answer/solution dropdowns, exact/semantic duplicate stems; if extra file, verify it is ONE cumulative file within `Concepts/` with 30+ truly unique questions.
- [ ] Check diagrams/GIF files are real and readable; source links don't point to unrelated subjects.
- [ ] Report files changed, covered topics, counts by difficulty, added verified historical/memory-based questions separately, videos, diagrams, direct GitHub links and explicit gaps.

## 11. Current known repository baseline (do not re-publish unrelated material)

As of **25 November 2026**, `Chapters/Respiratory-System/` already contains (active chapter; append upon revisits):
- Day 1: respiratory anatomy and physiology, airway/lobes, alveoli/surfactant, pleura, breathing, pulmonary circulation, lung volumes/capacities, minute ventilation and normal values; **40 original MCQs + 15-question mock**.
- Day 2: inspection, palpation, percussion, auscultation, **ABG basics**, **spirometry basics** and **introductory only** diagnostic investigations; **36 original MCQs**.
- Original diagrams and separate **Previous Year Questions** (older scanned HP paper references + clearly labeled NORCET memory-based report).
- **Do not relabel those original 91 exam-style MCQs as verified past-exam items.**
- Existing 91 bank/mock items already have difficulty tags. Preserve their exact English wording and Hinglish explanations; future unique case-based extensions should be harder. Do not claim original practice MCQs appeared in previous exams.
- Previous-year research already done is not a waiver for future topic-specific searches.

**Separate planned placeholder:** `Chapters/Cardiovascular-System/` may contain only `.gitkeep` placeholders for Concepts/MCQs/Previous-Year-Questions/Revision/Assets. Do not add actual notes or activate Day numbering there until the learner studies cardiovascular content. Cardiovascular is a high-priority *candidate* from third-party past-paper analysis, not an officially mandated next subject.

## 12. Cross-session use and limitations

This skill is stored in the GitHub repo and is intended to be **re-read on every future GitHub-publishing task**. GitHub Copilot/agents that support repository skill discovery may load it from `.github/skills/`. **ChatGPT does not automatically inject arbitrary repository SKILL.md files or change its personal Memory just because the file exists**: when a later ChatGPT session receives "push this to GitHub", locate this repo and fetch this file before writing. If unavailable, state the access limitation rather than pretending to have read it.

**Do not promise background or delayed publishing.** Execute GitHub operations in the current turn when tools are available, and transparently report the real result.


### Learner-confirmed long notes format (26 November 2026)
- When explicitly requested, publish an entire chapter as several substantial files with 3–4 related topics per file and a master index, including not-yet-studied material clearly marked study-ready, not completed. This is an exception to the studied-only rule, not permission to mark progress.
- Match Respiratory Day 1/2 language: teach from zero in natural Roman Hindi, with English medical terms defined on first use. No dense textbook paragraphs, clipped English fragments, or forced analogies. Long means thorough coverage, not long paragraphs: use short explanatory bullets, numbered mechanisms, tables, examples and concise sections.
- Use consistent visible color markers in GitHub Markdown: 🔴 MOST IMPORTANT within a topic, 🟠 HIGH YIELD topic, 🟡 IMPORTANT, 🟢 FOUNDATION. Add source status beside repeated-question claims; distinguish documented memory-based recurrence from verified official exam frequency. Do not invent counts. Keep topic-wise original English MCQs with hidden detailed Hinglish rationales in MCQs and source-linked Previous Year Questions in descriptive files in Previous-Year-Questions. Maintain navigable chapter README and verify remote push.


**Descriptive study filenames (learner rule, 26 Nov 2026):** Never store actual notes, MCQs, mocks or Previous Year Questions banks only in `README.md` (or `read.md`). Use meaningful topic/exam/year filenames, e.g. `NORCET-2022-2026-Endocrine-Reported-Questions.md`. README is navigation only; link directly to named question files/index from chapter, concept and MCQ pages. Add source-checked topic-wise teaching and MCQ-solving video links in each relevant concept file; clearly label unavailable or mixed-topic videos and recall-based questions.


## Learner's plain-language rule — 26 November 2026

- Teach a beginner who has never heard the medical word before. Use everyday Roman Hindi with common English words. Explain the word immediately, then explain what happens in the body, why it happens, what the nurse sees and what the nurse does. For example: "Insulin ko ek chaabi samjho. Ye glucose ko blood se muscle aur fat cells ke andar jaane mein madad karta hai. Jab insulin kam ho ya kaam na kare, blood mein glucose badh jaata hai."
- Use short complete sentences. One idea per sentence. Use simple headings, numbered steps, comparisons and practical examples. Avoid clipped textbook English, unexplained abbreviations and unnecessarily complex vocabulary. Keep necessary English medical terms for the exam.
- Never type semicolon punctuation in learner-facing notes, answers, explanations, navigation or new question stems/options. Use a full stop or a new bullet instead. Do not damage existing exact English exam questions, URLs, code, HTML entities or SVG syntax. Preserve old question wording.
- Group 3–4 related topics in descriptive concept filenames. README is a navigation and rules page, not the actual study bank. Keep actual MCQs and mocks in MCQs, exam-source questions in Previous-Year-Questions, and relevant video links in concept pages.
- For requested extra practice, add 50+ per requested chapter when enough distinct learning points exist, mainly NORCET-level clinical and numerical Medium/Difficult questions, with a separate named mock. Do not inflate counts with duplicates. Four English options, hidden answers, everyday Hinglish reasoning for each distractor, and a useful exam clue. Mark unattempted. Original practice is not an official Previous Year Question.
- When a learner requests full chapter preparation, clearly label it study-ready and not yet studied. Re-fetch the rules before future GitHub changes.


## Learner rule — complete sentences and conversational teaching

- Write explanations the way a friendly nursing teacher would actually speak to the learner in a one-to-one conversation. Use natural, everyday Roman Hinglish with complete grammatical sentences, including the subject, verb and necessary connecting words. Do not write telegraphic notes, half sentences or strings of disconnected facts.
- Explain every medical term in simple words when first introduced. Then connect the cause, what happens inside the body, the signs the patient develops, and what the nurse should do. Use words such as "kyunki", "isliye", "jab", "toh" and "iska matlab hai" naturally so the reasoning flows.
- Use short, connected paragraphs by default for teaching. Bullets or numbered steps are allowed when they help organize information, but each explanatory bullet must still contain complete sentences. Tables, diagram labels, formulas, headings and very short revision mnemonics may remain compact. Never use those as a substitute for the full explanation.
- Apply this style to all three existing systems, all future chapters, chat teaching, clinical examples, nursing management, MCQ answer rationales, wrong-option explanations and mock-test solutions. Keep English question stems and options intact. Retain detailed NORCET-level medical content, priority labels, diagrams, video links and source evidence. Do not simplify by removing important concepts.
- Do not use semicolon punctuation in newly authored learner-facing prose. Use full stops and natural transitions instead. Preserve exact sourced question wording and technical syntax when required.
- Before publishing, read the explanations as if speaking them aloud. If any sentence sounds unfinished, overly compressed or difficult for a beginner, rewrite it. A quick beginner introduction alone does not satisfy this rule. The detailed body of each explanation must also be conversational.

**Example of what to avoid:** "Prolactin milk banata, oxytocin milk let-down. Dopamine normally prolactin inhibit karta hai."

**Required style:** "Dekho, prolactin ek hormone hai jo delivery ke baad breast mein doodh banne mein madad karta hai. Jab baby doodh peeta hai, tab oxytocin hormone breast ki chhoti muscles ko contract karne ka signal deta hai. Isse bana hua doodh breast se bahar aata hai. Isi process ko milk let-down reflex kehte hain. Ab dopamine ka role samjho. Brain ka hypothalamus dopamine release karta hai, jo normally pituitary gland ko prolactin kam release karne ka signal deta hai. Jab baby breastfeed karta hai, tab dopamine ka ye rokne wala signal kam ho jaata hai. Is wajah se prolactin ka level badh sakta hai aur doodh banne mein madad milti hai. Exam ke liye yaad rakho ki prolactin doodh banane mein madad karta hai aur oxytocin doodh bahar nikalne mein madad karta hai."

This rule strengthens all earlier plain-language and formatting rules. It does not replace them.


## Learner-approved full NORCET repository expansion

The learner explicitly requests all curriculum chapters prepared in advance. This overrides the earlier studied-only restriction for this expansion. Mark prepared material as study-ready or starter-stage and never as already studied. Organize adult systems and nursing subjects using a curriculum map, not an invented official chapter count. Keep Concepts, MCQs, Mock-Tests and Previous-Year-Questions as sibling directories. Create descriptive named study files. For each actual topic aim for 10–30 or more distinct original exam-style questions, primarily Medium/Difficult, with four English options and full conversational Roman Hinglish explanations of correct and incorrect choices. No semicolons in new prose. For every chapter aim for 5–6 separate 120-question chapter-only mocks with no internal duplicates. The 120-question length is learner-defined practice, not the official NORCET pattern. Preserve older mocks. Research India-wide exams and record question-level source links and evidence status. List actual independently worded question practice with each reference, not just archive links. Never invent exact questions, official years or keys. Add checked teaching and question-solving video links. Verify every published file and report remaining work, not completion claims for an empty directory.


## Learner rule — chapter folder ownership (26 Nov 2026)

For every full chapter request, re-read this skill and the Respiratory System benchmark before publishing. Keep regular theory and inline diagram/video references in Concepts, original topic-wise practice in MCQs, full chapter mocks in Mock-Tests, source-traced exam material in Previous-Year-Questions, revision in Revision and original images in Assets. Do not scatter routine MCQs across unrelated files. The earlier optional studied-topic supplement is an exception only when specifically applicable. Use simple Roman Hinglish complete sentences throughout, English stems/options, hidden detailed answers, Easy/Medium/Difficult and honest editorial priority tags. Cover NORCET, staff nurse and CHO/community-relevant topics without inventing authentic exam questions. Report actual completion counts and remaining gaps.


## Learner rule — topic-first chapter-by-chapter preparation

Start with Applied Anatomy and Physiology and proceed chapter by chapter. Do not scatter small starter sets across unrelated chapters in place of completing a chapter. Map the complete nursing-level syllabus using INC curriculum and staff nurse exam scope. Publish 20–30 or more distinct original English MCQs for every meaningful topic before assembling its five to six 120-question chapter-only mocks. Include Medium and Difficult clinical/application questions and relevant factual questions. Use complete everyday Roman Hinglish answer reasoning and explanations of incorrect options, with no semicolon punctuation. Use descriptive filenames. Keep mock stems distinct between the chapter's five tests where feasible and label topic-bank revision reuse rather than double-counting it. Research question-level NORCET, PGIMER, AIIMS, HPRCA/HPSSC, ESIC, RRB, DSSSB, SGPGI and other Indian staff nurse/CHO papers and coaching/video sources. List questions with answers and references, not just links. Distinguish official evidence, third-party transcripts and recall leads. Report incomplete authentication and theory honestly. Verify published counts before moving to another chapter.


## Updated learner target — 27 November 2026

This supersedes earlier numerical targets. For every curriculum chapter, publish 30–40 distinct original MCQs per meaningful topic, targeting 40 where possible, before building ten chapter-only mocks of 120 questions each. Aim for 1,200 distinct mock stems per chapter. If topic banks contain fewer than 1,200, author and validate additional chapter-specific questions rather than silently repeating stems or padding with trivial variants. Keep earlier questions and mocks and audit them for quality and coverage. Use plausible distractors, realistic NORCET-style clinical reasoning and medium/difficult questions, plus relevant Indian staff nurse factual concepts. Difficulty and priority are editorial labels. English stems and options, complete natural Roman Hinglish explanations of correct and incorrect options, no semicolon punctuation in newly authored study prose. Deeply research INC curriculum, current clinical guidelines, NORCET, AIIMS, PGIMER, SGPGI, JIPMER, ESIC, RRB, DSSSB, HPSSC/HPRCA, state nursing and CHO exams, coaching and YouTube. List individual source-linked PYQ practice questions with four options and detailed rationales, exam/year/shift where evidenced, and evidence status. Use exact wording only when lawful and supported by the source. Label adaptations, recall and provisional leads honestly. Keep Concepts, MCQs, Mock-Tests and Previous-Year-Questions separate with descriptive filenames. Include detailed plain-language concepts, relevant diagrams and checked video resources. Resume from verified repository progress on every continuation. Commit manageable validated batches to main without force, read back the files, update chapter and global progress, and record the next unfinished task. Do not count incomplete files or claim that exhaustive historical official papers were authenticated. Continue chapter by chapter until all tracked chapters satisfy the achievable targets and document any remaining evidence gaps.


## Learner rule — maximum safe throughput, finish before moving on (27 November 2026)

This supplements and strengthens the 30–40 MCQ and ten-mock targets. Complete the current meaningful topic before starting another. Complete the current chapter before advancing to another chapter. Do not create scattered starter batches or jump ahead while earlier required content is unfinished. Each topic requires detailed beginner-friendly Roman Hinglish concepts, illustrations where useful, 30–40 distinct original English four-option MCQs (aim 40), hidden detailed right and wrong option reasoning, source-traced previous exam practice with evidence labels, and specific YouTube MCQ-practice links separate from concept lectures. Where genuine historical evidence or suitable videos cannot be found, explicitly document the search, gaps and follow-up rather than inventing material. Do not let unavailable historical evidence indefinitely block all achievable work.

Maximize meaningful throughput per run. Do not impose a one-topic or 40-question cap on a run. Prefer multiple complete sequential topic packages (80–160 or more questions when capacity and clinical quality permit) or an entire remaining chapter where feasible. Continue within the same run after each safe commit if capacity remains. A 40-question target is per topic, not per run. Commit validated batches safely and preserve previously published work. If tool or time limits prevent a full chapter, publish the largest safely validated completed batch, state the actual blocker, and resume the same unfinished chapter from the verified checkpoint. Do not move to another chapter simply because the run ended.

After finishing all topic packages, complete ten 120-question chapter-only mocks with distinct questions across all ten tests. This is the learner's custom practice length, not a claim about the official NORCET format. Keep mock and topic-bank reuse transparently labelled. Do not count reused material twice as original authorship. Check normalized stems and semantic duplication against existing topic banks and mocks, including parallel or renamed chapter folders. Reject superficial paraphrases of the same question. Audit four options, answer mappings, difficulty, clinical accuracy, source and video link evidence, coverage and cross-mock uniqueness. Reconcile duplicate chapter directories without deleting learner material. Maintain actual verified chapter and global counts, remaining evidence gaps and exact next checkpoint. Only mark the chapter complete after audit. Use current clinical guidelines, curriculum and India-wide NORCET, staff nurse, HPRCA/HPSSC, PGIMER, SGPGI, JIPMER, ESIC, RRB, DSSSB, CHO and state examination research. Continue the hourly job until all achievable goals are verified. Never invent official papers, answer keys, videos or completion counts.


## Mandatory multi-session coordination — 27 November 2026

The learner confirms another session is doing the same repository work. Avoid duplicate research, drafting and publishing. All manual and automated runs must read [the shared work claim](https://github.com/priyankaverma12-RN12/aiims-norcet-staff-nurse-resources/blob/main/.github/NORCET-WORK-CLAIM.md), the latest remote checkpoint, recent commits and intended target files before starting. Use a single writer for the current chapter. If another run holds an unexpired claim or recent activity indicates an older session is still working on the same scope, defer the overlapping work rather than jumping ahead. Do not restart a bank merely because its tracker has not caught up.

Acquire the claim by fetching the claim file and updating with its exact current blob SHA to State: CLAIMED, a unique owner/run token, precise scope and planned files, claimed UTC and expiry UTC (30 minutes initially). Confirm ownership by read-back before research or writing. A rejected SHA or commit conflict requires re-fetching, never overwriting another owner's claim. Renew before expiry only while still owner. Before each content or tracker write confirm ownership and fetch the latest target version. Stop if ownership changes. If a claim expires, inspect recent commits and unfinished files before reclaiming, and defer if activity is ambiguous. On completion or controlled stop record the verified checkpoint and release the claim using the latest SHA only if still owner. Preserve partial work. No force pushes. Re-read these rules every run. The claim is cooperative, so a legacy session already in progress may not yet follow it. FREE alone does not establish that it is safe to start while that session is active.


## Two-lane coordination override — corrected learner instruction, 27 November 2026

This manual session and the existing hourly task are the FORWARD lane. Start at Nursing Foundations, the first chapter in Chapters/NORCET-Full-Chapter-Index.md, and proceed top to bottom in that index order (not alphabetical folder order). This supersedes the earlier manual reverse assignment and earlier Infection Control first priority. Complete Nursing Foundations, then resume Infection Control and Microbiology at its verified unfinished checkpoint, then Respiratory, Cardiovascular, Endocrine and subsequent chapters in index order. The other session is the REVERSE lane, from General Knowledge and Aptitude backwards. Both lanes read both claims and inventories before research, acquire only their own claim atomically, never work the same chapter, and stop before frontiers meet. Forward claim: .github/NORCET-WORK-CLAIM.md. Reverse claim and checkpoint: .github/NORCET-REVERSE-WORK-CLAIM.md and .github/NORCET-REVERSE-CHECKPOINT.md. Preserve active claims and all prior work. Fresh head verification and non-force commits required for shared trackers. All previous lease, quality, individual-topic 30–40 MCQ, detailed theory, sourced PYQ/video and ten distinct 120-question mock requirements remain. Existing hourly task remains forward-only. No new task. A legacy session may not yet have read this correction.

Forward initial audit: Nursing Foundations README and MCQ/mock indexes report 600 original questions across 30 groups of 20, five compiled mocks reusing those questions, and 34 reported adaptations. Next: audit and expand Nursing Process and Clinical Judgment, then remaining individual topics, concepts, PYQs/videos and mocks. Infection Control prior historical checkpoint c6f4a3d7ee2bfbdc381e2b539d4bc07f38040e88 (1,505 indexed MCQs, next group 06) preserved for later fresh verification.


## Mandatory quality audit and question-level source extraction — 27 November 2026

Applies equally to forward Job 2 and reverse Job 1, including existing published content. Re-read both skills each run. All MCQs, mocks and PYQ practice must have English stems and four English options, difficulty and editorial priority, hidden answer in Markdown details, detailed natural beginner-friendly Roman Hinglish reasoning explaining the correct answer and every incorrect option, no semicolons in newly authored study prose. Audit clinical accuracy, answer mapping, normalized and semantic duplicates, counts and chapter fit. Keep 30–40 unique originals per individual topic and ten distinct 120-question chapter mocks. For every MCQ, mock and PYQ file include relevant verified specific YouTube question-solving links with title/channel, coverage and question or topic mapping; use question-level timestamps where verifiable. Shared links can cover multiple questions when explicitly mapped. Do not invent links or timestamps. Record missing video evidence as pending, not complete.

Previous-Year-Questions must contain actual usable question-level study material, not merely paper or video links. Inspect accessible official papers, third-party scans, sample papers, coaching discussions and YouTube transcripts or visible questions. Identify chapter-relevant items and provide English stem, four options, hidden answer, full Hinglish rationale for each option, exam/year/shift only when evidenced, question/page or timestamp when available, direct source URL and evidence classification. Reproduce exact wording only when verified and lawful, otherwise independently adapt and label honestly. Distinguish official PYQ, reported recall, source-based adaptation and sample-paper practice. Never fabricate historical provenance or claim inaccessible transcripts were inspected. Keep separately named files by topic or exam/evidence type, a source index and evidence-gap ledger. Link-only leads do not count as questions. Audit existing files and repair deficiencies without double counting. Auditor is read-only on claimed chapter scopes, reports exact file/question defects and verified commit, and leaves repairs to owning lane unless separately authorized and safely coordinated. Both publishing lanes must read audit findings and fix confirmed issues before marking completion. Preserve claims and checkpoints. This quality rule supersedes weaker link-only or abbreviated-rationale practices.


## Mandatory Job 4 — metadata-only labels and exam provenance (27 November 2026)

Applies to every concept subsection and every question in Concepts (including embedded MCQs), MCQs, Mock-Tests (including legacy mocks under MCQs), Previous-Year-Questions and all chapter packages. Existing content must remain unchanged by Job 4: do not rewrite stems, options, answers, rationales, concepts, numbering or attempt status. Add only metadata, links, and navigation anchors. Other jobs must apply these labels to newly authored material. Preserve existing priority convention: 🔴 MOST IMPORTANT (must revise), 🟠 HIGH YIELD (very important), 🟡 IMPORTANT, 🟢 FOUNDATION. Assess difficulty separately: 🟢 Easy, 🟡 Medium, 🔴 Difficult. Retain existing defensible labels, avoid duplicates, and distinguish editorial importance from documented recurrence. Use visible emoji and bold Markdown that renders on GitHub without external badge services. Add applicable clinical scenario, calculation, prioritization, repeated concept and safety tags without giving away answers. Place answer-revealing tags/references inside existing hidden answer blocks, especially in mocks.

Research actual historical question matches across NORCET/AIIMS, PGIMER, SGPGI, ESIC, RRB, DSSSB, JIPMER, HPRCA/HPSSC, CHO and state staff nurse recruitment exams. Record exam, year, shift, question/page number or timestamp only where evidence supports them, direct working question-source URL and evidence type. Distinguish official verified exact match, third-party reported match, source-based adaptation, same tested concept only, original practice and verification pending. Never infer an exam appearance from thematic similarity or an unsupported claim. If no link can be verified, record evidence pending rather than asserting an exam/year. Prefer official papers and keys, then accessible scans, credible transcripts and coaching recall with clear limitations. Verify source contents, not just search snippets. Link every question to its relevant internal concept heading and appropriate external learning reference where available. Link every concept subsection to question-level internal MCQ/mock/PYQ anchors and documented exam evidence for that concept, with verified relevant video URLs and timestamps where possible. Do not fabricate URLs, timestamps, citations, recurrence counts, answer keys or provenance. Missing evidence must be logged as pending, not invented. Clinical or explanation defects go to Job 3 rather than being edited by Job 4.

Job 4 starts at Nursing Foundations and proceeds in Chapters/NORCET-Full-Chapter-Index.md order, chapter by chapter, using .github/NORCET-LABELS-CHECKPOINT.md. Re-read canonical skill, root skill, both publishing work claims, recent commits, and review-job activity before each batch. Coordinate with all jobs: never modify actively claimed files or chapters, defer overlapping scope and record it for revisit. Acquire cooperative scope claim in labels checkpoint with current blob SHA and unique owner, expiry, and target files. Recheck both writer claims and current file SHA before each write. Stop on conflict or changed ownership; do not overwrite. Prefer small safe commits and verify read-back. Check that stripping only added metadata restores original content exactly, and that hidden answer blocks remain closed. Track files, question/concept counts, matched exams, pending sources, next file and commit. Resume the exact unfinished chapter, re-audit newly published files and release own claim. Never report a chapter complete with omitted items. Continue within each run as capacity permits; no automatic five-minute or immediate post-run scheduling is assumed. All jobs must read this rule before new publishing.


## Job 3 — mandatory deep corrective audit and feedback loop (27 November 2026)

The learner authorizes Job 3 to correct defects and add missing high-yield content, not merely report them. Prioritize substantially populated chapters with concepts, MCQs, mocks and PYQs, irrespective of chapter-index order. Start Respiratory, then rank other eligible chapters by readiness and unreviewed changes. Do not assume the benchmark itself passes. Audit every individual question, not a sample: record path, blob SHA, question ID, pass/fail/pending, syllabus unit, nursing-level relevance, difficulty based on actual reasoning (not labels), answer and every distractor, clinical source, language, hidden answers, semantic duplication, topic coverage and provenance. Verify current INC GNM/BSc/PB BSc nursing curriculum and AIIMS NORCET official notices, plus actual exam evidence from HPSSC/HPRCA, PGIMER, SGPGI, AIIMS/CRE, ESIC, RRB, JIPMER, DSSSB, CHO and state staff nurse exams. Distinguish syllabus core, relevant nursing application, and unsupported specialist detail. Flag or relocate out-of-scope questions, do not silently discard solved material. Distinguish documented exam appearances from exam-style judgments. Verify calculations, units, patient safety and current clinical guidance, especially ambiguous stems. Check each concept subsection for missing high-yield nursing knowledge, diagrams, teaching videos and question-solving videos. For each MCQ, mock and PYQ file map specific video links to covered questions/topics and document unavailable transcripts or timestamps. A video title alone cannot establish PYQ evidence.

PYQs must be self-contained: English question, four English options, difficulty/priority, hidden correct answer and substantial natural Roman Hinglish explanations of all four choices, exam/year/shift and page/question number or timestamp if verified, direct source and evidence label. No answer-revealing index. Inspect all accessible chapter-relevant items in each source, not just a few examples. Preserve exact wording where lawful and authenticated, otherwise independently word adaptations and clearly state that options/order may differ. Sample papers and recalls remain separately labeled. No fabricated exact questions, years or answer keys. Record unresolved source access and completeness gaps. Links alone count as research leads, not questions.

Before any repair, read both publishing claims and Job 4 labels checkpoint and audit checkpoint. Do not edit active scopes. Acquire own audit claim using exact current SHA, record scope and expiry, confirm read-back, recheck all other claims and target SHA before each write, release only own claim. Never overwrite others' work. If coordination is unavailable, record defects and defer edits. Correct safe unclaimed scopes, add genuinely missing syllabus-relevant material without duplicating other banks or counting adaptations as originals. Keep existing solved status and question identity. Audit mock uniqueness, counts and target of ten distinct 120-question custom mocks, and 30–40 original MCQs per individual topic. Record each correction, lesson and reusable prevention rule in .github/NORCET-AUDIT-LEARNINGS.md, including before/after evidence, source, actual commit and precise next question/file. All jobs read audit learnings every run and incorporate fixes before publishing. Keep per-file audit checkpoint and revisit changed blobs. Never claim a full audit from structural checks or sampling. Scheduled cadence is limited by platform; five-minute automation is not supported. Preserve existing schedules unless explicitly changed to a supported cadence.


## Mandatory UI polish and label deduplication — learner correction (27 November 2026)

Applies to Jobs 1–4 and every existing or future concept, MCQ, mock and Previous-Year-Questions package. Inspect existing labels, badges, headings, links and metadata before adding anything. Reuse and color-format the existing difficulty, priority/importance, exam and evidence labels in place. Never display two rows for the same category, even when one is plain text and another is colored. Use one compact readable metadata line per question, with one difficulty, one editorial priority and only genuinely distinct useful tags. Example: **Difficulty:** 🟡 Medium · **Priority:** 🟠 HIGH YIELD · Clinical application. Keep original difficulty and priority meaning unless a documented audit justifies changing it. Map existing Low/Foundation, Medium/Important and High/High Yield to the existing priority legend, with 🔴 MOST IMPORTANT reserved for justified top-priority items. Keep existing exam provenance and distinct valid sources, consolidate duplicate exam/status labels and duplicate links without removing evidence. Do not add a second label merely to colorize the first. Use GitHub-compatible Markdown, bold text, restrained emoji, consistent spacing, clear navigation, readable mobile layouts and accessible labels. Do not introduce external badge dependencies, unsupported CSS or visual clutter. Preserve hidden answer blocks and keep answer-revealing tags and references inside them. Do not rewrite questions, options, answers, rationales or concepts during UI polish. This explicitly authorizes replacing redundant metadata lines and normalizing their formatting only. Validate that the non-metadata study text remains byte-for-byte identical and that no unique evidence was lost. Inspect rendered layout when available and disclose when only Markdown source was validated. Job 4 must revisit its previous batches (Nursing Foundations groups 01–02, existing tagged mock entries, concepts and reported adaptations), consolidate duplicated difficulty/priority labels before expanding, record verified counts separately from newly tagged questions, and make the process idempotent. Maintain all existing coordination and evidence requirements. This rule supersedes any earlier additive labeling instruction that would cause duplicates.


## Mandatory highlighted exam labels and question-mapped video references — learner refinement (27 November 2026)

Applies to every chapter and all Concepts (including embedded questions), MCQs, mocks, PYQs and revision packages, and to Jobs 1–4. Make actual examination names visually prominent wherever historical provenance is mentioned. Use one existing exam evidence row, with a bold colored-emoji exam label, e.g. **🟢 NORCET 11 — Verified exact PYQ**, **🔵 NORCET 11 — Reported recall**, or **🟣 NORCET 11 — Related tested concept only**. These are formatting examples, not factual claims about any question. Green is reserved for authenticated exact appearances; blue for retrieved third-party reported questions; purple for concept-only matches; neutral/pending for unverified leads. Highlight the actual exam name and number/year/shift wherever evidenced, not just a generic PYQ heading. Make the bold exam label itself a direct Markdown link to the verified source when this does not duplicate an existing link; otherwise color-format the existing source link in place. If several distinct exams are documented, list each once in the same evidence row. Do not use NORCET-style or video title as proof of exam appearance. Never guess edition, year, shift, paper number, timestamp or exact wording. Prefer official question paper and key, direct question/page anchor, or verified recall with caveat. If inaccessible, explicitly mark verification pending; do not promote a lead into a verified exam label. Use GitHub-safe bold/emoji/link formatting, no arbitrary CSS/HTML background colors or external badge services. Keep single difficulty and priority row; no duplicate exam/source/video rows.

Deep research for question-level YouTube support is mandatory: map each existing MCQ, mock slot, reported adaptation and embedded concept question to a relevant direct YouTube video, ideally the precise question-solving timestamp; for conceptual material map each subsection to a teaching video and relevant practice video or question anchor. Prefer actual question discussion, then close concept-specific MCQ practice, then a clearly labeled topic teaching video. Verify title, channel and relevance by accessible description/chapters/transcript/playback; record exactly which level was inspected. A published chapter timestamp is topic evidence only, not exact question verification. Use **▶️ [Watch question explanation — mm:ss](direct URL)** only when the specific question and timestamp were checked. Otherwise use **▶️ [Topic-wise MCQ practice](direct URL)** with coverage limitation, or **Video verification pending** when no defensible source exists. No invented video URLs/timestamps, no generic search links represented as verified videos, and no linking unrelated videos simply to fill slots. Preserve all existing distinct valid references. Reuse verified mappings for identical stems in mocks after exact stem and source check. Keep answer-revealing links and labels inside existing hidden answer blocks. Concept-only tags must not imply an exact question appeared. Record per-file counts of exact video-question mappings, topic-level links, missing videos, and historical evidence levels separately. Improve Markdown with clean consistent headings, restrained colors, compact metadata, whitespace and direct navigation; preserve all original questions/options/answers/Hinglish explanations/concepts and attempt history. Verify non-metadata text, unique links, hidden answers and idempotence; inspect rendered GitHub UI when possible and disclose when only Markdown source is checked. Job 4 resumes pending cleanup then retrofits previously processed entries to this refined visual/reference standard without duplicating tags, and continues sequentially under existing claim rules. All new publishing must use this standard.


## Mandatory dedicated YouTube MCQ practice and all-India exam label coverage — learner clarification (27 November 2026)

All Jobs 1–4 must apply this across every chapter and all Concepts, topic MCQs, embedded questions, Mock-Tests, Previous-Year-Questions, revision packages and legacy files. The learner specifically reports missing YouTube practice-question links. A concept lecture, general learning article, or PYQ source link alone does NOT satisfy the question-practice video requirement. Research a direct YouTube question-solving/MCQ practice video for every question, mapped to the exact item where verifiable, otherwise to the specific tested concept with honest topic-level qualification. For each concept subsection provide both teaching and MCQ practice links where defensible sources exist; clearly separate them. Do not count a teaching-only video as question practice. Reuse a valid video across related questions if its coverage is established; a unique video per question is not required. Prefer direct video links with verified question timestamps, named channel and topic; otherwise state description/chapters-only verification and exact-item/playback pending. Keep the practice link in the existing hidden answer area if revealing, and make it conspicuous: **▶️ [YouTube MCQ practice — topic/channel](direct video URL)**. Where no defensible practice video is found, show **YouTube MCQ practice: verification pending** and maintain a question-level gap queue; revisit rather than treating the item complete. Never substitute a generic YouTube search, fabricated timestamp, unrelated lecture or title-only exam claim. Record exact-question practice, topic-level practice, teaching-only and missing counts separately; do not double-count repeated mock stems as new original questions. Audit previously published material for missing practice links before declaring any package complete.

Highlight all documented Indian nursing recruitment examinations, not just NORCET. Maintain an open-ended evidence-based label vocabulary: AIIMS NORCET (edition, prelims/mains), AIIMS institution-specific Nursing Officer/Staff Nurse and CRE, PGIMER Chandigarh (PGI), SGPGI, JIPMER, ESIC, RRB Staff Nurse/Nursing Superintendent, DSSSB, NVS, KVS where applicable, GMCH, RMLIMS, UPPSC/UP Staff Nurse, HPRCA, HPSSC/HPSSSB, HP Staff Nurse and other Himachal Pradesh recruitment, and every other verified state/UT recruitment (e.g. Rajasthan, Bihar, Haryana, Punjab, Uttarakhand, Delhi, Maharashtra, Gujarat, Madhya Pradesh, Chhattisgarh, Odisha, West Bengal, Assam and other northeastern states, Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, Telangana, Jharkhand, Goa, Jammu & Kashmir, Ladakh and other UTs), NHM and CHO where relevant to nursing syllabus. Use the actual recruiting authority and exam designation from evidence; these names are search scopes, not a claim that any particular question appeared or that every body administers such exams. Include edition/year/shift/post code/question number only if evidenced. Format each actual exam label in bold with evidence-status color: **🟢 EXAM — authenticated exact question**, **🔵 EXAM — reported/memory-based question**, **🟣 EXAM — related tested concept only**. Retain the direct source as a clickable highlighted label where possible, otherwise use the existing source link once and clearly identify it. Color signifies evidence strength, not exam importance. Multiple distinct documented appearances may be listed once each; never attach speculative exam names or blanket all-exam tags to every question. Use restrained GitHub-compatible bold and colored emoji, no unsupported CSS or external badge dependency. Keep existing unique references and original questions/options/answers/Hinglish explanations/concepts/attempt history untouched. All earlier deduplication, claim, readback and metadata-only preservation rules remain binding. Job 4 must retrofit missing practice references and highlighted labels, with per-file gap tracking, while continuing its existing checkpoint; Job 3 checks coverage and evidence; Jobs 1–2 apply at authoring. No chapter may be called fully verified with unreported video gaps.


## Mandatory visible exam heading tags and repository-wide visual design — 27 November 2026

Learner correction: exam tags must be visible immediately without opening the answer. In an existing exam-based heading such as “NVS Staff Nurse, September 2019 — retrieved report”, integrate the evidence color into the heading itself: `### 🔵 NVS Staff Nurse, September 2019 — retrieved report`. Use 🟢 for authenticated exact, 🔵 for retrieved reported/memory-based, 🟣 for same tested concept only, and ⚪ for pending/unverified. The colored heading itself is the exam tag; do not add a duplicate exam-name badge/row. If a question heading is a stem, place the evidenced exam label once in its existing compact visible metadata row instead of rewriting the stem. Only answer-revealing provenance, source detail or links stay in hidden answers; generic exam name/year/status should be visible unless it would reveal the answer or compromise a mock. Keep the evidence rationale, original direct source, and dedicated question-level YouTube MCQ practice link inside the appropriate existing reference/answer section. No fabricated provenance, no blanket tags, and no teaching-only substitutions. Preserve original study content, evidence qualifiers, attempts, headings' wording and hierarchy, and existing fragment navigation (add backwards-compatible anchors where heading decorations alter slugs). Avoid duplicate labels and links; keep unique source evidence. Use consistent, accessible GitHub-compatible colored emoji section headings (e.g. 📚 Concepts, 📝 MCQs, 🧪 Mock Tests, 📜 Previous Year Questions, ▶️ YouTube Practice), clean spacing, compact metadata, readable tables and navigation, light/dark-friendly layout. Do not add emoji to every sentence or long question stem. Actual CSS heading colors and filled badges are possible only in a compatible website/renderer: GitHub's native Markdown sanitizer removes custom CSS. Shared stylesheet: `Assets/study-ui.css` is a reusable style asset for compatible renderers, not proof of deployment or a change to github.com rendering. If a real site is present, integrate via its supported stylesheet mechanism after checking configuration, render-test mobile and desktop, and preserve existing access and URLs. Do not silently enable Pages or change deployment/access settings. Native GitHub fallback always uses readable colored emoji plus text, and actual heading-level tags. Job 4 must inspect the rendered view when available; otherwise disclose Markdown-only verification. Check all claims before editing, validate heading/anchor mapping, unchanged study text and hidden answers, and record progress separately. This applies repository-wide to all four jobs, all chapters and old/new Concepts, MCQs, mocks, PYQs and Revision. Job 4 must fix previously hidden-only labels and remaining video gaps before declaring completion.


## Mandatory original-only mock questions — learner correction (27 November 2026)

All new mock tests in every chapter and all publishing jobs must contain newly authored mock-exclusive questions. Never copy, select, assemble, translate, or superficially paraphrase questions from existing MCQ banks, concept practice, previous-year questions, revision sets, or any other mock. The same syllabus concepts may be assessed through genuinely different clinical situations, decisions, or reasoning. Changing names, numbers, wording, or option order alone does not make a question new. Before publication compare normalized stems and substantive learning tasks against all existing question banks and mocks, including newly drafted questions. Each of the ten chapter mocks must have 120 distinct mock-exclusive questions, for 1,200 unique mock questions per chapter. Maintain a separate mock-exclusive inventory, without double-counting topic-bank originals or historical adaptations. Retain four English options, accurate verified answers, hidden detailed Roman Hinglish rationales for each option, difficulty and priority labels, clinical references and dedicated YouTube MCQ practice evidence or explicit gaps. Preserve existing legacy mocks and learner attempt history, label historical reuse honestly, and audit or replace reused questions only under separately authorized safe coordination. Never count reused questions toward the original-only mock target. This correction supersedes earlier permissions to reuse topic-bank questions in mocks. Existing topic-first rules remain except the explicitly authorized parallel Eye and ENT mock-only scope, which must not interfere with ongoing topic authorship.


## Mandatory repository-wide conversational Roman Hinglish and complete-sentence retrofit — learner instruction, 28 November 2026

This is a binding language and teaching-quality gate for ALL existing and new chapters, all publishing, audit, explanation, metadata and website jobs, and all manual sessions. Use the Respiratory System concept notes as the learner-approved style benchmark, particularly `Chapters/Respiratory-System/Concepts/Day-01-Complete-Respiratory-Anatomy-Physiology.md`. Do not copy its medical content into unrelated chapters.

- Teach as if a friendly nursing teacher is explaining to a fresher in a real one-to-one conversation. Use simple everyday Roman Hindi mixed naturally with familiar English words, not Devanagari, stiff textbook English, literal translations or unexplained jargon. Retain necessary English medical terms and explain their meaning in ordinary words when first introduced. Explain the actual concept, not merely its definition.
- Use full, natural, grammatically complete sentences in every explanatory paragraph, bullet, numbered step and explanatory table cell. Include the subject, action and necessary reasoning. Prefer short connected paragraphs, one clear thought at a time. Use natural transitions such as "jab", "toh", "kyunki", "isliye" and "iska matlab hai". No disconnected pointers, sentence fragments, lists of keywords, arrow-only explanations or telegraphic notes as a substitute for teaching. Headings, navigation link labels, formulas, diagram labels, source titles, data values and brief memory aids may remain compact when supported by a full explanation elsewhere.
- For concepts, explain what it means, how normal physiology works, what changes and why, what the patient may experience, how assessment findings relate to the mechanism, what the nurse should do and why, and relevant precautions or escalation. Use practical examples and simple analogies where useful without distorting clinical facts. Do not remove medical depth, clinical distinctions, safety context or exam-level reasoning simply to make language easier.
- Apply this throughout Concepts, chapter README and every learner-facing index, topic introductions, revision, clinical examples, nursing management, embedded question explanations, MCQs, mock tests, PYQs, imported practice and website-rendered study explanations. Navigation prose and learner instructions must also be natural complete Hinglish sentences. Keep standard English medical headings, source titles and functional link labels where useful. Do not translate or rewrite English MCQ stems or any A/B/C/D options, exact historical question wording, answer keys, identifiers or evidence metadata merely for style.
- Every MCQ answer must remain hidden in its existing Markdown details block, with the correct option and a detailed natural Roman Hinglish explanation of why it is correct, plus a separate detailed explanation for EACH of the three incorrect options. Explain the relevant mechanism or decision and why the distractor does not fit the question. Where helpful, explain when the distractor would be appropriate and how to distinguish it in an exam. One-word verdicts, "wrong because incorrect", restating an option, shorthand and fragments do not pass. Add a useful exam clue in a complete sentence where appropriate. Keep difficulty, priority, provenance, verified clinical references and dedicated MCQ video evidence or explicit gaps.
- Example of unacceptable prose: "Alveolar inflammation. Fluid accumulation. Impaired gas exchange. Hypoxia." Required style: "Hamare lungs ke andar chhoti-chhoti hawa ki thailiyan hoti hain, jinhe alveoli kehte hain. Jab pneumonia ki wajah se inmein inflammation hota hai, toh fluid jama ho sakta hai. Is wajah se oxygen ko blood tak pahunchne mein dikkat ho sakti hai. Isliye nurse patient ki breathing aur oxygen saturation check karti hai." The example illustrates style, not a complete disease lesson.
- Retrospective correction is mandatory, not only a rule for new files. Work chapter by chapter in the existing curriculum order, resume from a verified file-level checkpoint and coordinate with the responsible owner before editing claimed scopes. Each owner should apply the standard to its existing and new content within its authorized scope. Audit all learner-facing Markdown files and record separately which concept/index/revision files and which numbered question explanations have been actually reviewed and repaired. Read explanations as if teaching aloud. A sample check, language detector, introductory paragraph or rule-file update alone does not certify a file or chapter. Retain existing audit requirements and record outstanding gaps honestly.
- Style-only corrections must preserve English stems/options, correct answers, question numbers, anchors, attempt history, counts, links, images, diagrams, hidden blocks, source evidence and other jobs' changes. If a clinical defect is found, verify it independently and use the existing corrective audit procedure. Never bulk-translate questions, inflate inventories, regenerate entire banks, force-push, or overwrite another owner's work. Follow all claim, checkpoint and safe publication rules, verify exact remote readback, and continue from the first incomplete file. Never mark the whole repository complete until every chapter's applicable material has actually passed the audit. Do not use semicolon punctuation in newly authored learner-facing prose, while preserving original questions, URLs and technical syntax.


## Priority-thirteen dedicated chapter lane — learner throughput correction, 28 November 2026

The learner authorizes a separate manual chapter-completion lane for the thirteen minimal-coverage chapters: Pharmacology, Child Health Nursing, Emergency and Critical Care Nursing, Community Health Nursing, Neonatal Nursing, Gastrointestinal System, Musculoskeletal System, Nutrition and Dietetics, Hepatobiliary and Pancreatic System, Integumentary System and Burns, Biochemistry and Pathology, Nursing Management and Education, and Nursing Research and Statistics. Begin with an actually unclaimed chapter, Nutrition and Dietetics, and complete it before selecting the next available chapter. Coordinate overlapping planned or active workstreams, including drafts and PRs, rather than duplicating them. This lane-specific batch target does not reduce other existing jobs' 30–40-question objectives, change their ownership, or modify any hourly automation.

- Read both full skills, AGENTS, Copilot instructions, audit learnings, current job and manual claims, recent commits, active PRs, and chapter inventories before starting every run. Use the dedicated chapter claim with a unique owner, precise scope and 30-minute lease, verify the exact readback, recheck before each write, and release only that claim when stopping. A FREE header alone is insufficient if recent activity or a PR indicates ongoing work. Preserve other owners' files, learner attempt identities and existing questions. No force pushes or unsafe shared navigation rewrites.
- Phase 1: complete topic-wise original MCQs before starting mocks. Author 20 genuinely distinct, exam-standard original questions per meaningful individual topic. Aim for five completed topics and 100 original MCQs with 400 separate detailed Roman Hinglish option rationales in one run. Continue additional complete topics when safe. Do not pad with superficial paraphrases or sacrifice clinical, semantic, curriculum, source or rendering review. If a topic needs expansion to cover real curriculum gaps, add distinct items. Keep originals and previously reported adaptations separate, preserve legacy starters and record exact actual counts. Include detailed beginner-friendly conversational Roman Hinglish concepts, original diagrams where useful, correct English stems and four plausible English options, a hidden answer block, Easy/Medium/Difficult and editorial priority tags, full reasoning for each option, useful exam clues and specific clinical references. Original practice may be designed at NORCET, AIIMS, PGIMER and staff nurse difficulty but must never be labeled as a historical exam appearance without evidence.
- Phase 2: after completing topic coverage, author ten chapter-exclusive mock tests of 120 questions each (1,200 unique mock-exclusive items). Aim for two entire mocks or 240 new mock-exclusive questions with 960 individual option rationales in one run. Do not reuse, assemble or superficially rewrite topic-bank, legacy mock, revision or PYQ questions. Use current mock timing/scoring and navigation rules and preserve past attempts. Validate coverage, clinical answers, distinct scenarios, difficulty and all four rationales.
- Phase 3: systematically extract and map chapter-relevant previous-year questions across AIIMS NORCET and other AIIMS, PGIMER, SGPGI, JIPMER, ESIC, RRB, DSSSB, KGMU, HPRCA/HPSSC/HP state recruitment, military/Army and other defence nursing recruitment where publicly available, state staff nurse, PSC/SSB, CHO and NHM examinations. Research in earlier phases is allowed, but maintain separate historical inventories. Authenticate actual paper and key when accessible, label retrieved recalls, independently worded source-based adaptations, sample practice and related concepts honestly, record exam/year/shift/item/page/timestamp only when supported, and never fabricate exam history or bulk-copy protected papers. Record topic-level and question-level source evidence, exact gaps and dedicated verified YouTube MCQ-practice references distinct from lectures. Archive links alone do not count as PYQs.
- Commit validated batches to GitHub with exact remote readbacks, a chapter-local inventory and next checkpoint. When prerequisites or independent review are incomplete, use an isolated draft candidate with exact staged counts and no live inventory credit. Reconcile latest main and overlapping PRs without force, obtain explicit coordination where needed, validate and verify live readback before counting publication. Do not skip safety gates merely to reach 100 or 240 items. Resume the same unfinished chapter on the next run. Preserve the five existing hourly automations.

## Batch-policy reconciliation (PR36)

The priority-thirteen lane's 20-original minimum per meaningful topic and five-topic/100-original target are execution targets, not limits or permission to weaken validation. Keep expressly assigned higher targets in other lanes. Record partial validated batches and the next unfinished topic rather than padding. Check open and draft PRs as well as current claims before reserving scope. In the historical-question phase include relevant publicly evidenced Military Nursing Service and military staff nurse examinations within the existing India-wide research scope. Preserve all earlier quality, evidence, ownership, learner-history and automation requirements.

## Latest learner correction — content-first creation, 28 November 2026

For forward content-creation sessions, prioritize actual new question authorship and commits rather than repeated retrospective audits. Select the lowest actual MCQ, mock and PYQ coverage among unclaimed priority chapters after checking current claims, chapter files, recent activity and open/draft PRs, including planned workstreams. Never interrupt another owner or regenerate a staged bank. Finish one selected chapter before advancing. Preserve all five hourly automations and the separate audit jobs. This correction changes sequencing, not clinical accuracy, evidence integrity or safe publication requirements.

- Author 20 genuinely distinct original questions per meaningful topic, targeting five topics and 100 originals per run. A finished 20-question bank should not wait merely for an earlier 30–40 target. Preserve higher established totals. Prioritize HP staff nurse/HPRCA/HPSSC and NORCET/AIIMS/PGIMER exam-standard questions, with a useful mix of explicit Easy, Medium and Difficult labels and realistic clinical application. Keep four plausible English options, hidden answers, four individual detailed conversational Roman Hinglish rationales, exam clues, priority and honest source metadata. Research authoritative clinical sources while writing.
- Complete topic-wise MCQ banks first, then ten chapter-only original-exclusive mocks of 120 questions each, targeting two complete tests per run, then source-traced previous-year practice mapped to its actual topic. Include AIIMS NORCET, PGIMER, HPRCA/HPSSC, military and other state/central staff nurse exams. Keep verified historical evidence separate from original practice and label adaptations and recalls honestly.
- Perform concise incremental checks of the NEW content for clinical correctness, distinct objectives, four-option/key alignment, format and sources while authoring. Do not repeat unchanged historical audits, run audit-only content sessions or block creation on retrospective review. Dedicated audit jobs retain their responsibilities. If an independent review or shared navigation release gate is outstanding, record it once and continue isolated new content commits where ownership allows. Do not bypass mandatory integration checks or count drafts as live.
- Put content in descriptive chapter-local MCQs, Mock-Tests and Previous-Year-Questions files, preserving existing IDs, learner history, claims and current chapter structure. Commit finished batches safely, verify exact remote readbacks, report new committed and live counts separately and record the next unfinished topic. Release only your own claim. Continue the same chapter next run. No force pushes, invented sources, duplicate questions or unsupported completion claims.
