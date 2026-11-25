# Contributing — keep nursing notes easy to navigate

## Simple chapter structure

Each **studied nursing chapter** belongs in `Chapters/<Chapter-Name>/`:

```text
Chapters/<Chapter-Name>/
  README.md             # Table of contents
  Concepts/
    Day-XX-Meaningful-Topic-Names.md
  MCQs/
    Day-XX-Meaningful-Topic-Names.md
  Revision/
  Assets/
  References.md
```

### Adding a topic after studying it

1. **Group related concepts** into one readable topic file. Avoid dozens of tiny topic folders.
2. Give the Markdown file a **descriptive topic-based name**. Prefix Day-01/Day-02 when useful.
3. Add a matching file with the **same name** under `MCQs/`. Place explanations under expandable `<details>`.
4. Update just the chapter `README.md` table. The root README should link to chapters, not every small topic.
5. Include only content actually studied. Clearly mark introductory or incomplete areas.
6. Validate math, medical facts, answer keys, and normal-range assumptions (age/altitude/clinical context).
7. Illustrations must be original or appropriately licensed and attributed.
8. Never label a question **PYQ** unless its exact previous-year exam provenance was verified.
9. Protect patient data and private information.

**Principle:** Few clicks, clear filenames, content before questions.
