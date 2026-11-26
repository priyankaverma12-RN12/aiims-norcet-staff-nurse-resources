# ⚡ Endocrine one-look revision

[🏠 Chapter](../README.md) · [📖 Concepts](../Concepts/Endocrine-System-Master-Guide.md) · [📝 MCQs](../MCQs/Endocrine-Topic-Wise.md) · [🏥 Previous Year Questions](../Previous-Year-Questions/Endocrine-Previous-Year-Questions-Index.md) · [⚡ Revision](../Revision/Endocrine-Quick-Revision.md) · [References](../References.md)

## 14. 🎨 Gland-wise visual revision and priority

**Weightage note:** 🔴 Highest revision priority, 🟠 High priority, 🟡 Secondary revision, 🟢 Basic. Actual exam-wise percentage available nahi hai. Repeated question lead alag source table mein diya hai.

| Gland | 🔴 Pehle ye karo | 🟡 Baad mein revise |
|---|---|---|
| Pituitary | ADH origin/release, DI vs SIADH, post-operative monitoring | Prolactin, GH and other anterior hormones |
| Thyroid | Hypo vs hyper, thyroidectomy airway and calcium, thyroid emergencies | Nodules, thyroiditis, cancers |
| Parathyroid | PTH action, Chvostek/Trousseau, hypocalcemia | Other causes of calcium disorders |
| Adrenal | Addison vs Cushing, crisis, cortex layers, pheochromocytoma | CAH, Conn syndrome |
| Pancreas | Insulin, hypoglycemia, DKA/HHS, diagnostic values, foot care | Rare islet tumors |
| Other glands | Pineal, thymus, gonadal hormones | MEN and diffuse endocrine organs |

### Diagram — hormone map

```mermaid
flowchart TD
 H[Hypothalamus] --> P[Anterior pituitary]
 H --> PP[Posterior pituitary releases ADH and oxytocin]
 P -->|TSH| T[Thyroid: T3 T4]
 P -->|ACTH| A[Adrenal cortex: cortisol]
 P -->|FSH LH| G[Gonads]
 PP -->|ADH| K[Kidney saves water]
 classDef pink fill:#fce7f3,stroke:#be185d,color:#222
 classDef blue fill:#dbeafe,stroke:#2563eb,color:#222
 class P,PP pink
 class T,A,G,K blue
```

### Diagram — DI versus SIADH

```mermaid
flowchart TD
 A[ADH effect too low] --> B[Less water saved] --> C[More dilute urine] --> D[Dehydration risk]
 E[ADH effect too high] --> F[Extra water saved] --> G[Diluted blood sodium] --> H[Confusion or seizure risk]
 classDef low fill:#dbeafe,stroke:#2563eb,color:#222
 classDef high fill:#fee2e2,stroke:#dc2626,color:#222
 class A,B,C,D low
 class E,F,G,H high
```

### Diagram — calcium control

```mermaid
flowchart TD
 A[Blood calcium low] --> B[PTH increases]
 B --> C[Kidney saves calcium]
 B --> D[Vitamin D activation]
 B --> E[Bone calcium mobilization]
 D --> F[Gut absorbs more calcium]
 C --> G[Blood calcium rises]
 E --> G
 F --> G
```

### Diagram — glucose after a meal versus fasting

```mermaid
flowchart TD
 A[After eating] --> B[Glucose rises] --> C[Beta cells release insulin] --> D[Glucose uptake and storage]
 E[Fasting] --> F[Glucose falls] --> G[Alpha cells release glucagon] --> H[Liver releases glucose]
 classDef green fill:#dcfce7,stroke:#15803d,color:#222
 classDef orange fill:#ffedd5,stroke:#ea580c,color:#222
 class A,B,C,D green
 class E,F,G,H orange
```

### Diagram — adrenal cortex outside to inside

```mermaid
flowchart TD
 A[Zona glomerulosa: Salt / aldosterone] --> B[Zona fasciculata: Sugar / cortisol]
 B --> C[Zona reticularis: Sex / androgens]
 C --> D[Medulla: adrenaline and noradrenaline]
 classDef layer fill:#fef3c7,stroke:#b45309,color:#222
 class A,B,C layer
```


| 🔴 Emergency clue | First priority / concept |
|---|---|
| Thyroid surgery + stridor | Airway emergency, immediate escalation |
| Cold, slow breathing, altered consciousness | Myxedema emergency |
| High fever, marked tachycardia, agitation | Thyroid storm |
| Hypotension/vomiting in adrenal failure | Crisis; urgent escalation, prescribed steroid and fluids |
| DI | Dilute polyuria, sodium may rise |
| SIADH | Low sodium, concentrated urine, seizure risk |
| Awake hypoglycemia | 15 g rapid carb, recheck 15 min |
| Unsafe swallow | No oral intake; emergency glucose/glucagon protocol |
| DKA | Ketones/acidosis; potassium safety |
| HHS | Hyperosmolality, dehydration, mental status |

**Numbers:** Fasting plasma glucose ≥126 mg/dL, 2h 75g OGTT ≥200, A1c ≥6.5%, random ≥200 with classic symptoms/crisis; confirm if not unequivocal. Hypoglycemia <70. NP-NCD age ≥30; NIDDCP renamed 1992.

**Exam tricks:** GFR = Salt/Sugar/Sex; prolactin makes milk, oxytocin ejects; Cushing disease = pituitary; PTH raises Ca and lowers phosphate; central hypothyroidism may have normal TSH.
