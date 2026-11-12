# Topic lesson specification — the reusable teaching blueprint

> Phase 1, 2026-11-10. Every future Design Systems entry follows this specification. It maps each teaching dimension onto the **existing** knowledge-entry schema (`lib/content/schema.ts`) and completeness gates (`lib/content/completeness.ts`), so entries can be written without code changes. Where the schema has no natural home, the gap is named and a decision is requested (§6).

## 1. The questions every lesson must answer

1. What is it, and what is it not?
2. Why does it exist, and what problem does it solve?
3. What principles guide it, and why?
4. What are the rules, and of what kind (standard, platform, system-specific, industry, context, team)?
5. How does it work?
6. What does good look like, what does poor look like, and why?
7. How do I correct a poor implementation?
8. When and where should I use it, and when and where should I not?
9. What alternatives exist, and what are the trade-offs?
10. How do established systems approach it, and why do they differ?
11. How does it work in a design tool and in code?
12. How do I evaluate its quality and defend my decision?

A section that genuinely does not apply is omitted **with a stated reason** in the entry's notes (e.g. "No platform differences: this is a governance practice").

## 2. Mapping the 30 dimensions onto the schema

| # | Dimension | Where it lives |
|---|---|---|
| 1 | Definition | `definition` (rich), `summary` |
| 2 | Context and purpose | `levels.beginner.explanation` (first paragraph) |
| 3 | Problem solved | `origin.problem` where an origin exists; else beginner explanation |
| 4 | Mental model | `levels.beginner.analogy`; L1 plate and figure key |
| 5 | Principles | `levels.intermediate.howItWorks` — one item per principle: statement, why, what decision it guides, example, limit |
| 6 | Rules and requirements | `application.steps` for procedural rules; normative rules in `levels.intermediate.implementation` with the rule kind in brackets, e.g. "[WCAG 1.4.3, AA]" |
| 7 | Good and poor examples | Level-2 figure of type `comparison` (good/poor, same task) + `levels.intermediate.scenarios` |
| 8 | Why each example succeeds or fails | the comparison figure's points (`Problem`, `Why`, `Intervention`, `Why it helps`) |
| 9 | Step-by-step correction | `exercises` with `exampleSolution` (correction sequence, §4) |
| 10 | When to use | `whenToUse` |
| 11 | Where to use | `application.web` / `mobile` / `enterprise` / `services` |
| 12 | When not to use | `whenNotToUse` (each item names the alternative) |
| 13 | Where not to use | `whenNotToUse` (context-specific items) |
| 14 | Alternatives | `levels.advanced.alternativeModels` |
| 15 | Real-world applications | `application.summary` + context arrays |
| 16 | Reference-system comparisons | `levels.advanced.debates` (how and why systems differ), each cited |
| 17 | Trade-offs | `advantages` + `limitations` |
| 18 | Accessibility | intermediate `implementation` items tagged [WCAG x.y.z]; Level-2 annotated figure where useful |
| 19 | Responsive behaviour | `application.mobile` + implementation items |
| 20 | Design workflow | `application.steps` |
| 21 | Developer and implementation considerations | `levels.intermediate.implementation` |
| 22 | Common mistakes | `misconceptions` (myth → reality) and comparison figure |
| 23 | Misconceptions | `misconceptions` |
| 24 | Vocabulary | `levels.beginner.vocabulary` |
| 25 | Limitations | `limitations` (gate: at least 2) |
| 26 | Research and evidence | `levels.advanced.evidence`, `evidence`, `evidenceNote`, `references` |
| 27 | Related topics | `relations` (typed, each with a note) and `prerequisites` |
| 28 | Exercises | `exercises` (at least one correction exercise) |
| 29 | Assessment | `quiz` at three levels |
| 30 | Practical deliverable | an `exercises` item of kind "deliverable" referencing the capstone part it feeds |

## 3. Level content

### Beginner — understand
- Plain-language definition first, professional term second.
- Why it matters: the problem in one concrete product situation.
- A step-by-step conceptual explanation, an analogy only where it clarifies.
- One real interface example (UX Academy's `/system` where it fits).
- Vocabulary (4–8 terms), basic principles, two beginner mistakes, one good/poor pair, quiz questions at beginner level.
- No unexplained jargon; no code.

### Intermediate — apply
- How it works and the practical workflow (design tool and code).
- Principles with their limits; rules labelled by kind.
- Detailed do/don't comparison on the same task, with user impact.
- Use and non-use, accessibility requirements cited to WCAG success criteria, responsive behaviour.
- A realistic scenario, a correction exercise and an evaluation checklist.

### Advanced — evaluate and lead
- System-level architecture, alternatives and why reference systems differ.
- Enterprise and multi-product concerns, governance and maintenance cost.
- Evidence and its limits (most design-system practice is documented practice, not experimental research — say so).
- A decision framework (criteria, weighting, who decides) and an advanced assignment.
- Not a longer beginner lesson: it must ask the learner to judge, choose and justify.

## 4. The good / poor / correction structure

Every topic has at least one comparison built on **the same user task** in both versions. Colour alone is never the difference.

**Comparison card (Level-2 `comparison` figure):**
1. Task and context (one sentence; labelled *illustrative* unless it is a documented real case).
2. Poor implementation — what it looks like.
3. Why it fails — the principle or rule it breaks (cited), and the likely user impact.
4. Good implementation — what changes.
5. Why it works — the principle applied.
6. Effect — stated as expected direction, never as an invented number.

**Correction sequence (exercise `exampleSolution`):**
1. Identify the problem (observable symptom).
2. Explain why it is a problem (user impact).
3. Find the underlying cause (e.g. a token mapped to the wrong primitive, not "the colour is wrong").
4. State the principle or requirement that guides the fix (cited).
5. Show the corrected version.
6. Validate (how you would check: contrast calculation, keyboard walk-through, screen reader, test at 320 px, user test).
7. Name the trade-off the correction introduces.

**Context variation (optional fourth example):** the same approach in a different context where it should be adapted or replaced (e.g. a skeleton screen that helps a feed but misleads in a form submit).

## 5. Rules for honesty and classification

- **Rule kinds are always labelled.** Never present a vendor value (4 px, 8 px, five toolbar actions) as universal. Teach the reasoning, the trade-off and the range of documented choices.
- **Standards are cited at criterion level** (e.g. WCAG 2.2 SC 2.5.8, Level AA), with the version.
- **DTCG** is a Community Group report, not a W3C Standard. **APG** is informative guidance, not a standard.
- **Evidence classes:** most of this domain is `practitioner-recommendation` or `official-standard` (for WCAG-led topics). Use `evidenceNote` to say what is documented practice and what is research.
- **Completeness gate fit:** most topics are typed `concept` in the frozen taxonomy, whose gate asks for "evidence for the effect, including replication status". For design-system concepts, the advanced evidence item must state plainly that the practice is documented by systems and practitioners and has not been tested experimentally (as `design-system` and `design-tokens` already do), rather than inventing studies. `atomic-design` is a `methodology` and needs `method` detail; the interface inventory is its procedure. Pattern and strategy topics need at least three `application.steps`.
- **Illustrative examples** are labelled; no invented statistics, company names presented as real, or screenshots of proprietary systems.

## 6. Decisions requested (not implemented)

1. **Structured comparison and correction fields.** The schema has no dedicated field for paired good/poor examples or correction sequences; this specification places them in Level-2 comparison figures and exercises. An optional `practice` block on entries (`comparisons[]`, `corrections[]`, `rules[]` with a `kind`) would make them testable. Recommended, but it is a schema change for the owner to approve.
2. **A "practice concept" completeness family.** Treating design-system concepts as `phenomenon` asks for replication evidence that does not exist. A family between `practice` and `phenomenon` would be more honest. This touches the frozen-taxonomy governance only through `TYPE_FAMILY`, not the taxonomy itself.
3. **Rule-kind labels in the UI.** Showing [standard] / [system] / [industry] as visible tags would teach the distinction on every page; it needs a small component.

## 7. Entry checklist (author's gate)

- [ ] Definition says what it is not.
- [ ] Every principle has a limit; every rule has a kind and a citation.
- [ ] At least one good/poor comparison on the same task, with a correction exercise.
- [ ] `whenNotToUse` items each name the alternative.
- [ ] Accessibility items cite WCAG 2.2 success criteria and levels.
- [ ] Reference-system differences explained, not ranked.
- [ ] Links to `/system` as a case, never as the definition.
- [ ] Sources already in the registry reused; new sources verified first.
- [ ] Quiz at three levels; at least two exercises; flashcards.
- [ ] L1 plate with figure key; L2 figure declares `language`.
