# 📝 Repository rules — hamare future nursing chapters ke liye

**Simple navigation + detailed Hinglish concepts + exact English MCQs + verified sources** hi standard rahega.

**Canonical complete skill:** [.github/skills/norcet-staff-nurse-github-publisher/SKILL.md](.github/skills/norcet-staff-nurse-github-publisher/SKILL.md). Is file mein future publishing workflow, difficulty tags, YouTube search and verification detail se documented hain.

~~~text
Chapters/<Chapter-Name>/
  README.md
  Concepts/Day-XX-Complete-Studied-Topics.md
  MCQs/Day-XX-Complete-Studied-Topics.md
  Previous-Year-Questions/               # ONLY sourced prior-paper / recall reports
  Revision/
  Assets/
  References.md
~~~

## 1. Language aur coverage
- Medical terms English. **Concept explanations, MCQ reasoning, hints Hinglish** mein; **questions + all A/B/C/D options original English wording, unchanged**.
- **Sirf actually studied topics** add karo; advanced unstudied areas include mat karo.
- Ek day ke multiple related topics ko **ek long meaningful Markdown guide** mein club karo.
- Concept, MCQ aur paper-source navigation ek-ek page par clickable honi chahiye.

## 2. Questions & answers
- Har question par **Difficulty: Easy / Medium / Difficult** label zaroor do; correct answer and other options ka detailed Hinglish reasoning likho.
- Har MCQ mein unambiguous best answer aur plausible options hone chahiye.
- **Why correct + other options kyun wrong + exam memory trick** likho.
- Numerical values, formulas, unit conversions aur answer keys check karo.
- Original new practice questions ko clearly **NORCET-style**, not actual Previous Year Question label karo.

## 3. Previous-year paper/source labeling
- Historical paper scan hai toh **exam, year, post code, booklet series, original question number, source URL** likho.
- Agar scan govt website se nahi mila toh **third-party hosted** bolo, government-verified source nahi.
- NORCET memory-based paper ko **unofficial memory-based** bolo; actual CBT ka verified wording/answer claim nahi.
- Agar exact source nahi mila, toh Previous Year Question guess karke mat add karo.

## 4. Images, videos and sources
- Har studied topic ke liye **YouTube teaching video + MCQ practice video** dono ko research karke concept topic table mein link karo; specific real URLs only, fabricated nahi.
- Har important taught concept ke saath accurate, useful **original SVG diagram** use karo.
- Images ko usi notes/MCQ section mein embed karo, separate gallery link optional hai.
- Medical concepts ko OpenStax, Merck, MedlinePlus aur ATS/ERS jaisi sources se validate karo.
- Reference ranges (SpO₂, PaO₂, TV etc.) ke context/altitude caveats clear rakho.
- Copyrighted textbook illustrations ya third-party scan repo mein copy mat karo; **source link** do.
- Personal/patient details kabhi publish mat karo.

[🏠 Repo home](README.md) · [🫁 Respiratory chapter](Chapters/Respiratory-System/README.md) · [🏥 Previous Year Question index](Chapters/Respiratory-System/Previous-Year-Questions/README.md)


## MCQ ki language — dhyan de

- **Har mock aur practice question:** Question aur A/B/C/D options original English mein rakho. Unka wording change mat karo.
- **Answers, hints aur exam tricks** easy Roman Hinglish mein samjhao.
- **Previous Year Questions:** Original English paper aur question number ka link do. Paraphrase ko original question mat bolna. Memory-based ko clearly label karo.
- Headings aur links mein **Previous Year Questions** poora likho.


## Roman Hinglish ka rule

- Har student page par **easy Roman Hinglish** likho. Example: `Dhyan de`, `Yaad rakho`, `Kyun sahi?`.
- **Hindi letters mat likho.** MCQ question aur options original English mein hi rakho.
- Answer, wrong options ki explanation aur exam tricks simple Hinglish mein likho. Generic repeated lines avoid karo.

## Extra high-yield file ka rule (existing studied topics)

- Jab bhi **"push this to GitHub"** bolein, pehle existing studied chapter check karo: koi important NORCET / HP Staff Nurse concept ya MCQ miss toh nahi hua?
- Agar real gaps milen, toh **sirf ek extra combined Markdown file** banao: `Chapters/<Chapter>/Concepts/Extra-High-Yield-Concepts-and-MCQs.md`. Usmein **concepts aur 30+ NEW unique MCQs** dono rahenge. Tiny multiple files nahi.
- **Exact aur similar/reworded duplicate MCQs mat add karo**: previous question banks, mocks aur Previous Year Questions sabse compare karo. Har question ki alag learning value honi chahiye.
- **Questions/4 options original English**, har question ka **Easy/Medium/Difficult** label. **Correct answer hidden `<details>` dropdown** mein, with detailed easy Roman Hinglish explanation for all options aur unique exam trick.
- Diagrams/photos useful hon toh original SVG/assets ke saath embed karo; chapter README se direct link do. Related concepts se zyada advanced/unstudied chapters mat add karo.
- Agar 30 genuinely different questions nahi ban sakte, filler mat likho; extra file skip karke reason batao. Agar gaps hi nahi, extra file zaroori nahi.

[Detailed rules yahan padho](.github/skills/norcet-staff-nurse-github-publisher/SKILL.md).

## Kabhi bhi purane topic par wapas aa sakte ho

- Pehle topic padhoge, doubts clear karoge, MCQs solve karoge; **push** kehne par unhi notes/questions ko sahi existing Day aur Chapter mein add karenge.
- Ek hi din do pushes ya later Day 1 par wapas aane par **existing Concepts aur MCQs file update/concatenate** hogi, duplicate Day folder/file nahi banegi.
- Missed points aur 30+ unique tough practice MCQs ki **sirf ONE combined extra file chapter ke `Concepts/` folder** mein banegi; later discoveries bhi isi file mein judengi. Filler ya repeated MCQs nahi.
- Exam sources sirf HP nahi: **NORCET, PGIMER, SGPGI, ESIC, RRB, JIPMER, DSSSB, KGMU aur other State Staff Nurse** bhi research karenge, source authenticity ke saath.
- Har actually studied topic ke liye **concept YouTube** aur **MCQ practice YouTube** alag search karenge; video available ho aur exact topic match ho tabhi real URL denge.

## Chat wali teaching ko GitHub mein same rakho

- Chat mein jo wording, Roman Hinglish, explanation, example, analogy, memory trick, numerical steps aur diagram use kiya tha, GitHub notes mein **maximum possible SAME** rakho.
- Sirf thodi useful extra detail add karo: `kya → kaise/kyun → same example → exam application → common trap`. Completely alag tone mein rewrite mat karo.
- Chat ka asli image/diagram accessible aur reuse allowed ho toh wahi use karo; warna accurate naya SVG banao, lekin use **original same image** mat bolo.
- Purane Day par wapas padhne se existing notes mein wahi chat wali additional detail jodo; duplicate files nahi.
- Sirf definitions ya tables mat rakho: topic ke hisaab se step-by-step explanation aur at least ek meaningful worked example/analogy do.

## Latest learner rule — repository-wide Easy/Medium balancing (28 November 2026)

This rule applies to all chapters, manual sessions and publishing lanes and supersedes earlier preferences for predominantly Medium/Difficult or harder new practice. Existing clinical, ownership, provenance, original-only mock, learner-history and safe-release rules remain binding. Preserve all five hourly automations and separate audit responsibilities.

- Target approximately one-third each Easy, Medium and Difficult among completed topic-bank originals. Easy means foundational recall or routine nursing knowledge, Medium means straightforward nursing application, common clinical scenarios or calculations, and Difficult means syllabus-relevant multi-step clinical reasoning. Never use obscurity or specialist-level material merely to raise difficulty. The distribution is a learner-selected practice target, not an official examination quota. Research against INC curriculum and AIIMS NORCET, HPRCA/HPSSC HP staff nurse and other Indian state/central staff nurse exam scope.
- For the dedicated balancing lane, begin at the first chapter in the existing curriculum index (Nursing Foundations), work topic by topic in order, temporarily defer claimed or overlapping scopes and revisit them before declaring completion. Count existing labels per meaningful topic as a brief incremental check, not a retrospective audit. Add only genuinely new Easy and Medium questions during the balancing phase, ordinarily 5–6 per deficient topic per pass and up to 100 per run. Allocate by actual deficits, not a fixed 50/50 split. Aim for 15–20 distinct originals per topic where appropriate (15 = 5/5/5, 18 = 6/6/6, 20 = 7/7/6). Seven of each is 21. Preserve larger existing banks and higher established targets, and add beyond the initial target where needed to correct imbalance. Do not delete, relabel without evidence, or duplicate existing questions to force ratios. Record outstanding deficits honestly, including topics needing Difficult items later.
- All new complete 120-question chapter mocks must contain exactly 40 Easy, 40 Medium and 40 Difficult independently authored mock-exclusive questions. During Easy/Medium balancing, author only the deficient Easy/Medium portions and keep incomplete mocks staged, unless sufficient distinct Difficult mock-exclusive questions are already available for that same test. Never reuse topic-bank questions or other mocks. Preserve published mock identities, scoring, attempts and history. Balance legacy mocks through safe separately coordinated additions or successor tests rather than silently changing completed attempts.
- Keep English stems and four English options, visible difficulty and priority, honest original-practice provenance, hidden correct answer, four individual full-sentence conversational Roman Hinglish rationales, exam clue and specific verified authoritative references. Retain dedicated MCQ-practice video evidence or explicitly record gaps. Compare new stems and substantive learning objectives against existing banks, concepts, mocks, PYQs and overlapping staged PRs. Check current claims and reserve exclusive scope before writing. Do not repeat historical audits in the content lane. Commit actual validated content in chapter-local packages, verify exact remote readbacks, distinguish staged from live, record counts by difficulty and next unfinished topic, and release only your own claim. Independent review and mandatory publication gates still apply.

## Latest learner rule — balanced new batches and evidence-weighted exam coverage (28 November 2026)

This supplements PR67 and the content-first workflow. It applies to all publishing lanes and manual sessions without changing their assignments or hourly schedules.

- For a normal new-topic batch, aim for 100 genuinely distinct originals across five meaningful 20-question topic banks. Use 7/7/6 per bank, rotating the category receiving six, so the full batch has 33/33/34 Easy, Medium and Difficult in some order. Rotate the extra category over batches. The dedicated deficit-balancing lane remains governed by PR67 and must allocate Easy/Medium additions according to the actual existing deficit, not a rigid batch quota. At chapter and topic level work toward approximately one-third each without deleting, arbitrarily relabeling or duplicating prior items. Every new full 120-question original-only mock has exactly 40 of each difficulty. Target two full mocks per run only after genuine topic coverage is complete.
- Twenty distinct originals per meaningful topic is a floor for the priority-thirteen initiative, not a ceiling. Preserve higher established targets. Allocate additional distinct questions to high-yield nursing objectives supported by actual past-paper evidence, without neglecting curriculum coverage. Review AIIMS NORCET and other AIIMS, PGIMER, HPRCA/HPSSC and HP Staff Nurse, military nursing/staff nurse, and other central and state staff nurse examinations. Record paper authority, exam/year/shift where evidenced, source URL, question/page locator or verified timestamp, topic and count of unique observed items. Deduplicate mirrors and recalls of the same item. State the number and limitations of papers actually inspected. Do not infer an exam-wide frequency ranking from inaccessible papers, sample questions or isolated recalled items. Where historical evidence is insufficient, label priority as editorial and use curriculum relevance and clinical importance instead.
- Research accessible online nursing textbooks, PDFs, coaching question discussions and relevant teaching and MCQ-solving YouTube resources alongside authoritative current clinical guidance. Independently author distinct English stems and plausible options from the tested concepts. Do not bulk copy protected question banks or label original practice as an actual exam appearance. Keep authenticated lawful PYQs, source-traced adaptations, reported recalls and sample practice separately identified. Include four individual conversational Roman Hinglish rationales, exam clues, clinical references, and verified video mapping or explicit evidence gaps. Preserve all ownership, learner identity, independent review and publication requirements.
