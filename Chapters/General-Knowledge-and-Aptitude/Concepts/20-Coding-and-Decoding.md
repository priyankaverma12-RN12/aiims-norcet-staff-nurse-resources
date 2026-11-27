# 📚 Coding and decoding — logical reasoning

**Study-ready, not yet studied.** [Chapter](../README.md) · [30 original MCQs](../MCQs/20-Coding-and-Decoding-30-MCQs.md) · [Previous Year Questions](../Previous-Year-Questions/20-Coding-and-Decoding-Reported-Evidence.md)

[Letter transformation](#letter-transformation) · [Numeric and symbol codes](#numeric-and-symbol-codes) · [Coded language](#coded-language) · [Combined logic](#combined-logic)

## Letter transformation

**Priority:** 🔴 MOST IMPORTANT

Coding ka matlab kisi word ya number ko ek rule ke according doosri form mein badalna hai. Decoding ka matlab us badli hui form se original value recover karna hai. Socho tum ek puzzle mein har letter ko ek position aage kar dete ho. CAT ka code DBU banega. Agar DBU ko decode karna hai toh har letter ko ek position peeche jaana hoga. Yeh reasoning puzzle hai, medical abbreviation ya real information security system nahi hai.

Alphabet positions yaad rakho. A=1, E=5, J=10, O=15, T=20 aur Z=26 useful reference points hain. [Full alphabet position table](19-Number-and-Alphabet-Series.md#alphabet-and-mixed-series).

```text
Original:    C     A     T
             |     |     |
            +2    +2    +2
             v     v     v
Code:        E     C     V
```

Agar code +2 se bana hai, toh decoding −2 se hogi. Question mein wraparound diya ho toh Z ke baad A aata hai aur A ke pehle Z aata hai.

### Common transformations

| Rule | Original | Encoded form |
|---|---|---|
| Forward +1 | DOG | EPH |
| Backward −1 with wrap | BAT | AZS |
| Reverse order | CARD | DRAC |
| Mirror alphabet | ABC | ZYX |
| Swap adjacent pairs | ABCD | BADC |
| Odd positions then even | ABCDEF | ACEBDF |

Mirror alphabet mein p ki opposite position 27−p hoti hai. Word reverse karna aur alphabet mirror karna alag operations hain. Example: CAT ka word reverse TAC hai, lekin mirror XZG hai.

Alternating shifts mein rule position ke according badalta hai. Example: LAMP par +1, −1, +1, −1 lagane par MZNO milta hai. Position-based shift mein first letter +1, second +2, third +3 ho sakta hai. Rule ko har position par check karo.

Agar code mein multiple operations hain toh encoding given order mein karo. Decode karte waqt inverse operations reverse order mein apply karo. Example: pehle reverse aur phir +2 kiya gaya hai, toh decoding mein pehle −2 aur phir reverse karna hai.

**Practice:** Original Q1–9. **Teaching and ▶️ [MCQ practice — RWA SSC EXAMS, Shobhit Bhardwaj Sir, Part 06](https://www.youtube.com/watch?v=nXeYIXsy9XM)**. Published description lists letter, reverse, mixed coding and a worked practice set. Exact item, timestamps and playback not verified.

## Numeric and symbol codes

**Priority:** 🟠 HIGH YIELD

Numeric coding mein letters ki positions ko numbers mein likh sakte hain. Kabhi un positions ko add, multiply ya subtract karte hain. Pehle question ke examples check karo. A=1 system aur reverse A=26 system ko mix mat karo.

Example: BAG ke positions 2,1,7 hain. Sum rule mein code 10 hai. Product rule mein 14 hai. Fixed two-digit concatenation rule mein 020107 hai. Same word ka different code possible hai, kyunki rule different hai.

Agar digit ya symbol substitution table diya hai, toh har input ko uski corresponding output value se replace karo. Leading zero bhi code ka part ho sakta hai, isliye bina instruction zero remove mat karo. Decode karne ke liye reverse mapping use karo. One-to-one mapping mein har code ka ek original hota hai.

Example: 1→5, 2→8, 3→0. Encode 321 ka result 085 hai. Decode 508 ka result 132 hai. Code arithmetic number ki tarah treat karne ki zaroorat nahi hai.

Kabhi code number ko quotient aur remainder mein divide karta hai. 23 ko 4 se divide karne par quotient 5 aur remainder 3 hai. Agar code remainder pehle likhta hai, toh 3-5 hoga. Agar sum aur difference dono diye hain, equations bana kar original values recover karo. Example: a+b=18, a−b=4, toh a=11 aur b=7.

**Practice:** Q10–20. [🔵 SGPGI Staff Nurse, 28 February 2024 shift 1 — reported alphabet-position sum](../Previous-Year-Questions/20-Coding-and-Decoding-Reported-Evidence.md#q1-using-the-same-alphabet-position-sum-rule-that-gives-read-a-code-of-28-what-code-is-assigned-to-hear).

**Teaching and ▶️ [MCQ practice — RWA SSC EXAMS, Part 05](https://www.youtube.com/watch?v=eszUPBP_02c)**. Description identifies number, mixed and symbol coding examples and a practice set. Exact subskills, item mapping and playback remain pending.

## Coded language

**Priority:** 🟠 HIGH YIELD

Coded statements mein word order unknown ho sakta hai. Har word ka unique code assume karna tabhi sahi hai jab question aisa kehta hai ya consistent substitution rule established hai. Common words aur common coded tokens compare karo.

Original reasoning diagram:

```text
 blue bag  -> ra ko
 blue book -> ra mi
      common word = blue
      common code = ra
      bag = ko, book = mi
```

Agar sirf ek statement diya hai aur code order unknown hai, toh mapping confirm nahi ho sakti. Example: small red box → la na pa. Agar second statement red ball → na sa hai, red=na confirm hai. Small aur box ke liye la aur pa bache hain, par kaunsa kis word ka hai, yeh additional clue ke bina decide nahi ho sakta.

Renaming puzzles mein actual object aur uske naye label ko alag rakho. Agar green ko yellow kaha jaata hai, toh actual green ka coded naam yellow hai. Iska matlab actual colour change nahi hua.

**Practice:** Q21–25. **Teaching and dedicated question-practice video verification pending** for these exact coded-statement and renamed-label subskills. Generic coding lecture ko confirmed match nahi maana gaya.

## Combined logic

**Priority:** 🟡 IMPORTANT

Operator substitution mein pehle har mathematical sign ko question ke rule se replace karo. Phir stated precedence follow karo. Agar + ka matlab × hai, toh 3+4 actual 3×4 hai. Bina substitute kiye normal addition mat karo.

Word length, vowel count aur consonant count par based codes bhi milte hain. Agar code length ka square hai, toh 5 letters ka code 25 hoga. Letter positions add karna alag rule hai. [🔵 DSSSB Nursing Officer, 27 August 2019 shift 3 — reported word-length square](../Previous-Year-Questions/20-Coding-and-Decoding-Reported-Evidence.md).

Validation ke liye given example par rule check karo. Agar options mein incorrect code poocha hai, toh har pair ko independently calculate karo. Kuch codes original order lose kar dete hain, jaise sum aur absolute difference. Aise case mein decoding unique nahi bhi ho sakti.

**Practice:** Q26–30. **▶️ [MCQ practice — RWA SSC EXAMS Part 06](https://www.youtube.com/watch?v=nXeYIXsy9XM)** is a broad description-level lead for mixed coding Q27 and Q29. Dedicated operator, vowel classification and non-unique code practice remains pending for Q26, Q28 and Q30.

## Quick revision

- Encoding aur decoding ki direction check karo.
- Alphabet positions aur letter order alag rakho.
- Rule ko saare examples par verify karo.
- Fixed-width digit code ko intact rakho.
- Common word common code method mein uniqueness aur available clues check karo.
- Operator substitute karne ke baad hi calculation karo.

General aptitude scope is editorial, not a claim about exact current NORCET topic weight. The new bank records 22 broad video leads and 8 explicit gaps, zero exact item matches.

[Chapter](../README.md) · [MCQs](../MCQs/20-Coding-and-Decoding-30-MCQs.md) · [Previous Year Questions](../Previous-Year-Questions/20-Coding-and-Decoding-Reported-Evidence.md)
