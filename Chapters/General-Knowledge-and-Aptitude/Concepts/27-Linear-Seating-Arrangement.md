# 📚 Linear Seating Arrangement

**Study-ready, not yet studied.** [Chapter](../README.md) · [30 MCQs](../MCQs/27-Linear-Seating-Arrangement-30-MCQs.md) · [Previous Year Questions and research](../Previous-Year-Questions/27-Linear-Seating-Arrangement-Reported-Evidence.md)

[Single row](#single-row) · [Facing directions](#facing-directions) · [Vacancies and ambiguity](#vacancies-and-ambiguity) · [Parallel rows](#parallel-rows)

## Single row

**Priority:** 🔴 MOST IMPORTANT

Linear seating mein people ek straight line mein baithte hain. Sabse pehle paper ke left se right tak seats number karo. Agar six seats hain toh number 1 se 6 tak likho. Numbering ko beech mein change mat karo. Agar kisi person ka seat number directly diya hai, toh pehle usko fix kar do. Baaki clues se remaining seats fill karo.

Original schematic, sabhi north face kar rahe hain:

```text
North ↑
Seat     1    2    3    4    5    6
        [P]  [ ]  [R]  [S]  [ ]  [Q]
Facing   ↑    ↑    ↑    ↑    ↑    ↑
Page left                          Page right
```

Agar R, P se second right par hai, toh R seat 3 par hai. Immediate right ka matlab sirf ek seat aage hai. Second right ka matlab do seats move karna hai. Second right aur two people between same baat nahi hain. Agar R seat 3 aur Q seat 6 par hain, toh unke strictly beech seats 4 aur 5 hain. Gap 6 − 3 − 1 = 2 hai.

| Wording | Meaning |
|---|---|
| Immediate neighbour | Usi row mein exactly one seat door |
| Second to the right | Reference ke personal right mein two seat steps |
| Two people between | Fully occupied row mein position difference three |
| Extreme left | Page ki leftmost seat, unless question defines otherwise |
| Not adjacent | Usi row ke consecutive seats par nahi |

Example: Six people P, Q, R, S, T, U hain. P seat 1, Q seat 6, R seat 3 aur S immediately right of R hai. T seat 5 hai. U ke liye sirf seat 2 bachi hai. Final order P U R S T Q hai. Yeh example dikhata hai ki remaining person ko fill karne se pehle saare directly fixed clues use karne chahiye.

**Practice:** Puzzle 1, Q1–3.

## Facing directions

**Priority:** 🔴 MOST IMPORTANT

Paper ka left aur person ka personal left alag ho sakte hain. North face karne wale ka right page-right hai. South face karne wale ka right page-left hai. Isliye jab question bole ki A is right of B, B ki facing check karo. A ki facing us relation ko decide nahi karti.

```text
North-facing:   personal left ← [ ↑ ] → personal right
South-facing:  personal right ← [ ↓ ] → personal left
```

Example: B seat 4 par south face karta hai. A B ke second right par hai. South-facing B ka right page-left hai. Seat 4 se do seats kam karne par A seat 2 par hoga. Agar B north face karta, answer seat 6 hota. Mixed facing puzzle mein har person ya seat ka arrow separate mark karo.

**Practice:** Q4–9 and Q28–30.

## Vacancies and ambiguity

**Priority:** 🟠 HIGH YIELD

Vacant seat bhi ek position hoti hai, lekin person nahi. Agar question mein two seats between poochha hai toh vacant seat count ho sakti hai. Agar two people between poochha hai toh khaali seat count nahi hogi. Wording carefully padho.

Kabhi saare clues se ek hi arrangement nahi banta. Agar P seat 1 aur Q seat 4 par fixed hain aur R, S seats 2 aur 3 par kisi bhi order mein ho sakte hain, toh do valid layouts P R S Q aur P S R Q hain. Q ke immediate left par kaun hai, iska unique answer nahi. Lekin P aur Q ke beech two seats hain, ye dono layouts mein true hai.

Possible conclusion ke liye ek valid arrangement sufficient hai. Must be true ke liye har valid arrangement mein relation hold karna chahiye. Count question mein repeated layout double count mat karo.

**Practice:** Q10–18 and Q25–27.

## Parallel rows

**Priority:** 🟠 HIGH YIELD

Do parallel rows mein people usually opposite directions face karte hain. Top row south aur bottom row north face kare toh same column ke people ek doosre ke saamne hain. Column relation ko personal right se confuse mat karo.

Original schematic:

```text
Column       1     2     3     4
Top seats   [1]   [2]   [3]   [4]
              ↓     ↓     ↓     ↓
              ↑     ↑     ↑     ↑
Bottom      [5]   [6]   [7]   [8]
```

Seat 2 directly opposite seat 6 hai. Top seat 2 wale person ka immediate right seat 1 hai. Bottom seat 6 wale person ka immediate right seat 7 hai. Row cross karne ko right ya left step mat samjho. Opposite relation sirf matching column mein hai.

**Practice:** Q19–27.

## ▶️ Teaching and question practice

| Subtopic | Teaching | Dedicated question practice |
|---|---|---|
| Single row and facing | [Parcham Classes, seating reasoning, Ankit Garg](https://www.youtube.com/watch?v=6Dek9sO2vag), indexed description | [Parcham Classes, Linear and Two Parallel Row Questions](https://www.youtube.com/watch?v=-IFktD_-CwE), indexed description lists solved linear questions |
| Parallel rows | Same linear and parallel video describes both formats | Same video, indexed solved practice |
| Vacant seats and ambiguity | [SATHEE analytical reasoning](https://sathee.iitk.ac.in/sathee-railway-exams/student-corner/topic-wise-practice/reasoning/analytical-reasoning/) | Specific practice video verification pending |

Checked 27 November 2026. Video description only, no exact item, language, duration, timestamps or playback authenticated. [SATHEE seating overview](https://sathee.iitk.ac.in/sathee-railway-exams/student-corner/quick-revision/reasoning/seating-arrangement/) indexed reference. Its left/right conventions should always be cross-checked using arrows. [Historical research](../Previous-Year-Questions/27-Linear-Seating-Arrangement-Reported-Evidence.md) distinguishes reported collections from authenticated exam questions.

## Quick revision

Fixed seats pehle fill karo. Personal right ke liye reference person ki facing check karo. Vacant seat aur person alag hain. Parallel rows mein opposite ka matlab same column hai. Har remaining arrangement ko verify karo, especially jab question possible ya necessary relation poochhe.

[Chapter](../README.md) · [MCQs](../MCQs/27-Linear-Seating-Arrangement-30-MCQs.md) · [Previous Year Questions](../Previous-Year-Questions/27-Linear-Seating-Arrangement-Reported-Evidence.md)
