# Statistical Packages and Correlation Applications — 20 Original MCQs

**Candidate, unattempted.** INC Unit VII mein statistical packages aur correlation ki practical applications. Original recruitment exam-style questions, actual PYQs nahi.

### Q1. A nursing researcher imports a CSV file into a statistical package. Which check is essential before analysis?

**Difficulty:** 🟡 Medium · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Run every available significance test first
- **B.** Confirm row count, variable names, types and representative values against the source file
- **C.** Assume that every imported numeric code is a continuous measure
- **D.** Delete the source file immediately

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: B. Confirm row count, variable names, types and representative values against the source file**

**B.** Import ke time delimiter, decimal ya type conversion error ho sakta hai. Source ke against basic checks se unnoticed data loss detect ho sakta hai.

**Baaki options kyun galat hain?**

- **A.** Tests invalid import ko correct nahi karte. Analysis se pehle dataset verification essential hai.
- **C.** Numeric code nominal ya ordinal category represent kar sakta hai. Correct measurement level specify karo.
- **D.** Original source verification aur traceability ke liye preserve karo. Data retention policy follow karo.

**YouTube MCQ practice:** verification pending.

</details>

### Q2. A statistical package reads a column of decimal measurements such as 2,5 and 3,7 as text because the import locale expects a decimal point. What is the appropriate correction?

**Difficulty:** 🟡 Medium · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Round the original values to whole numbers
- **B.** Remove the decimal column from the dataset
- **C.** Configure the appropriate decimal locale and verify the imported numeric values against the source
- **D.** Interpret each text value as a separate nominal category

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: C. Configure the appropriate decimal locale and verify the imported numeric values against the source**

**C.** Decimal separators locale ke according differ karte hain. Suitable import settings apply karo and sample values source ke against compare karo.

**Baaki options kyun galat hain?**

- **A.** Rounding measurement precision lose kar sakti hai and actual import problem solve nahi karti. Original decimals retain karo.
- **B.** Column removal useful observations discard kar dega. Parsing setting correct karke values verify kar sakte hain.
- **D.** Text storage import error ki wajah se hui hai. Actual variable quantitative hai and category treatment scientific meaning change kar dega.

**YouTube MCQ practice:** verification pending.

</details>

### Q3. An analyst imports an identifier column containing values such as 0007 and 0012. The software converts them to 7 and 12. Which action is most appropriate?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Import identifiers as text and reconcile them with the original records
- **B.** Calculate the arithmetic mean of the identifiers
- **C.** Assign random new identifiers without a mapping
- **D.** Assume that truncation cannot affect any data join

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: A. Import identifiers as text and reconcile them with the original records**

**A.** Leading zeros identifier ka meaningful part ho sakte hain. Text format exact record linkage preserve karta hai.

**Baaki options kyun galat hain?**

- **B.** Identifier numbers quantity measure nahi karte. Mean record linkage issue solve nahi karta.
- **C.** Original aur linked datasets ka relationship lose ho sakta hai. Any recoding needs documented crosswalk.
- **D.** Different identifier formats joins fail ya incorrect match kar sakte hain. Source and linkage verify karo.

**YouTube MCQ practice:** verification pending.

</details>

### Q4. A software package reports missing values coded as 999 as the highest observed score. What should the analyst do?

**Difficulty:** 🟡 Medium · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Retain 999 as a genuine extreme response
- **B.** Replace every 999 with the sample maximum without justification
- **C.** Remove every variable containing any missing value
- **D.** Define 999 as a missing-value code according to the codebook and rerun the analysis

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: D. Define 999 as a missing-value code according to the codebook and rerun the analysis**

**D.** 999 valid score nahi hai if codebook missing define karta hai. Software ko explicitly missing convention batana zaroori hai.

**Baaki options kyun galat hain?**

- **A.** Missing code ko actual score treat karne se mean and distribution distort honge. Codebook follow karo.
- **B.** Arbitrary substitution bias introduce kar sakti hai. Missing-data handling planned method ke according karo.
- **C.** Complete variable deletion unnecessary information loss kar sakti hai. Missingness mechanism and analysis need assess karo.

**YouTube MCQ practice:** verification pending.

</details>

### Q5. A nurse wants to examine only eligible participants aged 18 years or older while retaining the complete master dataset. Which statistical-package operation is suitable?

**Difficulty:** 🟡 Medium · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Apply a documented analysis filter
- **B.** Overwrite the master dataset by permanently deleting all other rows
- **C.** Recode every age below 18 as 18
- **D.** Sort by age and assume only eligible records remain

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: A. Apply a documented analysis filter**

**A.** Filter specified eligible rows ko analysis mein include karta hai without permanently deleting original records. Eligibility criterion save karo.

**Baaki options kyun galat hain?**

- **B.** Deletion original record preservation harm kar sakti hai. Non-destructive filter preferable hai.
- **C.** Original measurement artificially change hoga. Eligibility filtering data falsification se different hai.
- **D.** Sorting order change karta hai, selection nahi. Explicit filter apply karna hoga.

**YouTube MCQ practice:** verification pending.

</details>

### Q6. Five correctly keyed binary items assess knowledge, and the investigator wants each respondent's total score. What software operation is most suitable?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Overwrite the original item columns with the total
- **B.** Use the total number of respondents as each individual's score
- **C.** Randomly select one item as the entire scale
- **D.** Create a computed variable from the prespecified item-scoring rule

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: D. Create a computed variable from the prespecified item-scoring rule**

**D.** Computed variable existing item values se reproducible total generate karta hai. Missing responses ka handling scoring manual ke according define karo.

**Baaki options kyun galat hain?**

- **A.** Original item-level evidence lose ho jayega. Derived score separate variable mein preserve karo.
- **B.** Respondent count individual knowledge score nahi hai. Item-level scoring apply karo.
- **C.** Single random item total construct cover nahi karta. Prespecified scoring method use karo.

**YouTube MCQ practice:** verification pending.

</details>

### Q7. A researcher creates a new categorical variable from exact age values for a secondary analysis. What is best practice?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Replace original ages with group labels permanently
- **B.** Keep the original age variable and document the derivation of the grouped variable
- **C.** Choose age boundaries after inspecting which ones yield the smallest p-value
- **D.** Change all participants' ages to their group midpoint

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: B. Keep the original age variable and document the derivation of the grouped variable**

**B.** Original continuous information preserve karne se alternate justified analyses possible hain. Group boundaries and rationale document karo.

**Baaki options kyun galat hain?**

- **A.** Precise age values irreversibly lose ho sakti hain. Derived variable separate rakho.
- **C.** Data-driven cutpoints false positive risk increase karte hain. Justified prespecified grouping preferable hai.
- **D.** Group approximation individual observed age replace nahi karni chahiye. Original values retain karo.

**YouTube MCQ practice:** verification pending.

</details>

### Q8. An analysis requires joining a participant-level demographics table to a visit-level table. What should the analyst verify before using the merged file?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Assume that any shared column name guarantees a correct join
- **B.** Join using row position after sorting each table differently
- **C.** Check uniqueness of the participant key in demographics, intended one-to-many linkage, and unmatched records
- **D.** Remove participant identifiers before matching the tables

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: C. Check uniqueness of the participant key in demographics, intended one-to-many linkage, and unmatched records**

**C.** One participant ke multiple visits legitimate hain. Key cardinality aur unmatched rows check karne se unintended multiplication detect hoti hai.

**Baaki options kyun galat hain?**

- **A.** Same name values or identity uniqueness guarantee nahi karta. Linkage rule verify karo.
- **B.** Different sort orders unrelated records link kar sakte hain. Stable key use karo.
- **D.** Without reliable key records correctly match karna difficult hoga. Protected linkage workflow use karo.

**YouTube MCQ practice:** verification pending.

</details>

### Q9. A researcher wants the count of every response category in an imported dataset. Which operation is appropriate in a statistical package?

**Difficulty:** 🟡 Medium · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Linear regression
- **B.** Factor analysis
- **C.** Random-number generation
- **D.** Frequency analysis

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: D. Frequency analysis**

**D.** Frequency procedure each distinct response category ki count and often percentage report karti hai. Missing denominator setting check karo.

**Baaki options kyun galat hain?**

- **A.** Regression outcome and predictors ke relationship model karta hai. Simple category counts ke liye unnecessary hai.
- **B.** Factor analysis latent dimensions explore karti hai. Basic response distribution ke liye frequency analysis suited hai.
- **C.** Random-number generation simulated values create karti hai. Actual observed counts calculate nahi karti.

**YouTube MCQ practice:** verification pending.

</details>

### Q10. Two analysts obtain different sample sizes from the same dataset using different procedures. What should they compare first?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** The screen resolution of their computers
- **B.** Active filters, missing-data handling, weights and procedure-specific inclusion rules
- **C.** The font used in the results table
- **D.** Which analyst has more years of employment

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: B. Active filters, missing-data handling, weights and procedure-specific inclusion rules**

**B.** Different software settings analysis sample change kar sakti hain. Same intended population and missingness rules reconcile karo.

**Baaki options kyun galat hain?**

- **A.** Display resolution sample inclusion define nahi karta. Data processing settings investigate karo.
- **C.** Font visual presentation change karta hai, analytic denominator nahi. Procedure configuration check karo.
- **D.** Seniority reproducibility difference resolve nahi karti. Actual data and settings compare karo.

**YouTube MCQ practice:** verification pending.

</details>

### Q11. A software output displays a p-value as 0.000 because it rounds to three decimals. How should a researcher ordinarily report it?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Report p = 0 with absolute certainty
- **B.** Report p = 1 because rounding is unreliable
- **C.** Report p < 0.001 if the display and underlying precision justify that threshold
- **D.** Report that the effect size must equal zero

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: C. Report p < 0.001 if the display and underlying precision justify that threshold**

**C.** Rounded 0.000 exact zero probability claim nahi hai. Available precision ke according threshold report karo.

**Baaki options kyun galat hain?**

- **A.** Rounded display exact mathematical zero establish nahi karti. Incorrect precision avoid karo.
- **B.** Displayed small p ko one assign karna unsupported hai. Exact or suitably bounded value retrieve karo.
- **D.** P-value effect magnitude nahi hai. Separate estimate and uncertainty report karo.

**YouTube MCQ practice:** verification pending.

</details>

### Q12. A software confidence interval for a risk ratio is 0.74 to 1.21. What should the analyst check when assessing statistical compatibility with no relative effect?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Whether the interval includes the ratio null value of 1
- **B.** Whether the interval includes zero
- **C.** Whether the upper limit exceeds 100
- **D.** Whether the lower limit equals the point estimate

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: A. Whether the interval includes the ratio null value of 1**

**A.** Risk ratio ka no-effect value one hai. Interval 1 include karti hai, so stated confidence level par null compatible hai.

**Baaki options kyun galat hain?**

- **B.** Zero difference measures ka null ho sakta hai. Risk ratio ke liye null 1 hai.
- **C.** Risk ratio percentage scale necessarily nahi hai. Relevant comparison null value 1 se hai.
- **D.** Confidence limits point estimate se generally differ karte hain. Null compatibility interval coverage se assess hoti hai.

**YouTube MCQ practice:** verification pending.

</details>

### Q13. An analyst finds an approximately monotonic but clearly curved relationship between two ordinal nursing assessment scores. Which correlation measure is usually suitable?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Pearson correlation only because the scores have numeric codes
- **B.** A paired t test of score means
- **C.** Spearman rank correlation
- **D.** Cohen's kappa for unrelated ordinal constructs

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: C. Spearman rank correlation**

**C.** Spearman ranks ke association ko measure karta hai. Ordinal data aur monotonic nonlinear pattern ke liye useful hai, though assumptions and ties matter.

**Baaki options kyun galat hain?**

- **A.** Pearson linear association assess karta hai. Numeric codes alone continuous linear relationship justify nahi karte.
- **B.** Paired t mean difference assess karta hai, monotonic association nahi. Question relationship pooch raha hai.
- **D.** Kappa raters or classifications ki agreement measure karta hai. Different scores ka rank association separate task hai.

**YouTube MCQ practice:** verification pending.

</details>

### Q14. Two sets of five observations have ranks with squared rank differences summing to 4, with no ties. What is Spearman's rank correlation using the standard shortcut formula?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** 0.80
- **B.** 0.20
- **C.** −0.80
- **D.** 1.20

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: A. 0.80**

**A.** rho = 1 − 6×4/[5×(25−1)] = 1 − 24/120 = 0.80. No ties condition shortcut formula ke liye important hai.

**Baaki options kyun galat hain?**

- **B.** 0.20 formula ka subtracted fraction hai. One minus fraction karna zaroori hai.
- **C.** Given rank differences se positive value milti hai. Negative sign without calculation unjustified hai.
- **D.** Correlation −1 se +1 ke beech hota hai. 1.20 allowable range ke outside hai.

**YouTube MCQ practice:** verification pending.

</details>

### Q15. An analyst wants to correlate two ordinal variables containing several tied ranks. What is the sound implementation of Spearman correlation?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Assign arbitrary distinct ranks to tied observations without documentation
- **B.** Remove all tied observations regardless of study design
- **C.** Convert all tied ranks to zero and use the no-tie formula
- **D.** Use average ranks for ties and calculate the correlation of those ranks with appropriate inference

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: D. Use average ranks for ties and calculate the correlation of those ranks with appropriate inference**

**D.** Tied values same average rank receive karte hain. Software tie-aware rank correlation calculate kar sakta hai. No-tie shortcut blindly apply mat karo.

**Baaki options kyun galat hain?**

- **A.** Arbitrary ranks association change kar sakte hain. Ties ko appropriate consistent method se handle karo.
- **B.** Ties legitimate ordinal values ho sakte hain. Deleting them information and representativeness harm kar sakta hai.
- **C.** Zero recoding rank structure distort karti hai. Correct tied-rank procedure use karo.

**YouTube MCQ practice:** verification pending.

</details>

### Q16. In a scatter plot, the points follow a symmetric U-shaped pattern and Pearson r is near zero. Which interpretation is most appropriate?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** There is definitely no relationship of any kind
- **B.** There may be a strong nonlinear relationship despite little linear correlation
- **C.** The variables must be perfectly positively related
- **D.** The software must be malfunctioning

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: B. There may be a strong nonlinear relationship despite little linear correlation**

**B.** Pearson r linear pattern summarize karta hai. U-shaped relationship mein opposing slopes cancel ho sakti hain, so scatter plot examine karo.

**Baaki options kyun galat hain?**

- **A.** Near-zero Pearson r nonlinear association rule out nahi karta. Pattern visually inspect karna important hai.
- **C.** Perfect positive Pearson correlation straight increasing linear relation require karta hai. U-shape different hai.
- **D.** Near-zero r curved pattern mein mathematically possible hai. Model suitability check karo.

**YouTube MCQ practice:** verification pending.

</details>

### Q17. In a simple regression output, a participant's observed score is 72 and fitted score is 68. What is the residual using observed minus fitted?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** +4
- **B.** −4
- **C.** 140
- **D.** 1.06

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: A. +4**

**A.** Residual = observed − fitted = 72 − 68 = +4. Positive residual means observed score fitted value se higher hai.

**Baaki options kyun galat hain?**

- **B.** Negative four fitted minus observed hoga. Given convention observed minus fitted hai.
- **C.** Adding observed and fitted residual define nahi karta. Difference calculate karo.
- **D.** 72/68 approximately ratio hai, residual nahi. Residual original outcome units mein difference hai.

**YouTube MCQ practice:** verification pending.

</details>

### Q18. A study uses a complex survey with unequal sampling weights and clustered observations. Why is a standard unweighted significance test potentially inappropriate?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Weights always remove every source of bias
- **B.** Clusters turn all continuous outcomes into nominal variables
- **C.** The software will automatically detect all survey design variables without input
- **D.** It may ignore unequal selection probabilities and within-cluster dependence

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: D. It may ignore unequal selection probabilities and within-cluster dependence**

**D.** Survey design point estimates and standard errors affect kar sakta hai. Appropriate survey analysis weights, clusters and relevant strata account karti hai.

**Baaki options kyun galat hain?**

- **A.** Weights measured selection differences address kar sakti hain, all biases guarantee nahi. Design assumptions still matter.
- **B.** Cluster membership dependence structure change karta hai, measurement scale nahi. Appropriate design-based inference needed hai.
- **C.** Analyst ko correct design specification provide karni hoti hai. Default analysis assumptions verify karo.

**YouTube MCQ practice:** verification pending.

</details>

### Q19. A statistical package shows an estimated mean of 3.48 on screen but exports it with one decimal place as 3.5. The researcher must use that estimate in another prespecified calculation. What should be retained for calculation?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** The rounded display value only
- **B.** The highest available decimal precision from the underlying output
- **C.** A randomly selected value between 3 and 4
- **D.** A value rounded to the nearest integer before every operation

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: B. The highest available decimal precision from the underlying output**

**B.** Available unrounded estimate retain karne se repeated calculation mein rounding error kam hota hai. Final result ko justified reporting precision par round karo.

**Baaki options kyun galat hain?**

- **A.** Displayed 3.5 reporting ke liye suitable ho sakta hai but intermediate calculation mein avoidable rounding error aa sakta hai. Underlying precision use karo.
- **C.** Random replacement actual estimate represent nahi karega. Verified numeric output use karo.
- **D.** Har intermediate step par integer rounding error accumulate kar sakti hai. Round final reported value appropriately, not every step.

**YouTube MCQ practice:** verification pending.

</details>

### Q20. A software package produces an implausibly large effect estimate after a category is automatically chosen as the reference group. What should the analyst inspect before reporting the result?

**Difficulty:** 🔴 Difficult · **Priority:** 🟠 HIGH YIELD · Original exam-style practice

- **A.** Whether the estimate has enough decimal places
- **B.** Outcome coding, reference category, model assumptions, cell counts and data quality
- **C.** Whether the result is favorable to the preferred intervention
- **D.** Whether the table can be removed from the report without explanation

<details><summary>Answer aur easy explanation dekho</summary>

**Correct: B. Outcome coding, reference category, model assumptions, cell counts and data quality**

**B.** Software output interpretation coding direction aur model fit par depend karti hai. Sparse cells or errors extreme estimates create kar sakte hain.

**Baaki options kyun galat hain?**

- **A.** Decimal precision implausible model interpretation resolve nahi karti. Coding and data check karo.
- **C.** Favorability scientific validity ka criterion nahi hai. Objective model and data checks required hain.
- **D.** Selective omission bias create kar sakti hai. Issue investigate and transparently report karo.

**YouTube MCQ practice:** verification pending.

</details>

## Sources

- [CDC data collection and management](https://www.cdc.gov/field-epi-manual/php/chapters/data-collection-management.html), direct HTML retrieved.
- [jamovi data tools](https://docs.jamovi.org/data/data_overview.html), indexed description of computed variables, transformations and filters.
- [Penn State correlation methods](https://online.stat.psu.edu/stat509/Lesson07), indexed text.
- [OpenStax regression](https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation), indexed text.
- INC Gazette printed page 407 Unit VII, extracted text. Independent item-level review and dedicated video mapping pending.
