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
