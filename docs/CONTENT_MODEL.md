# Content model & authoring guide

The schema is the source of truth: `lib/content/schema.ts`. This document
explains how to use it well. The gold-standard example entry is
`content/knowledge/laws-effects/fitts-law.ts` — match its depth.

## Files

```
content/
  taxonomy.ts                 20 domains → subcategories → items (the subject inventory)
  knowledge/<domain>/<slug>.ts one knowledge entry per file (default export via defineEntry)
  knowledge/_index.ts         AUTO-GENERATED (npm run content:index)
  sources/<group>.ts          source registry fragments (default export via defineSources)
  sources/_index.ts           AUTO-GENERATED
  sources/verification.json   AUTO-GENERATED machine verification results
  formulas.ts                 Formula Library specs for metrics without a full entry
  labs.ts                     interactive labs metadata (components/labs)
  learning-paths.ts, comparisons.ts, glossary.ts, workshops.ts
```

## Knowledge entry anatomy (spec Part 8 → schema fields)

| Spec section | Fields |
|---|---|
| 8.1 Identity | `id`, `slug`, `title`, `alternateNames`, `primaryType`, `secondaryTypes`, `domain`, `subcategory`, `difficulty`, `disciplines`, `tags`, `prerequisites`, `learningObjectives` |
| 8.2 Beginner | `levels.beginner` — explanation, analogy, everydayExamples, vocabulary |
| 8.3 Intermediate | `levels.intermediate` — explanation, howItWorks, implementation, scenarios |
| 8.4 Advanced | `levels.advanced` — explanation, evidence, debates, alternativeModels |
| 8.5 Origin | `origin` — contributors, period, problem, narrative, attributionNote |
| 8.6 Application | `application` — summary, web, mobile, enterprise, services, steps |
| 8.7 Use & limits | `whenToUse`, `whenNotToUse`, `advantages`, `limitations`, `misconceptions` |
| 8.8 Connections | `prerequisites`, `relations[]` (typed + explained) |
| 8.9 Practice | `exercises`, `quiz`, `flashcards`, `lab` |
| 8.10 References | `references[]` (role: primary / standard / explanatory / further) |
| 17 Evidence | `evidence`, `evidenceNote`, `status`, `quality`, `lastVerifiedAt` |
| Type-specific | `formulas[]` (formula/metric), `method` (methods), `standard` (standards) |

### Rich text markup

Strings in explanation arrays support: `**bold**`, `*emphasis*`, `` `code` ``,
`[[slug]]` / `[[slug|label]]` (entry or planned-topic link — validated),
`{{src:source-id}}` (inline citation — must also be listed in `references`).
Each array item is one paragraph. Keep paragraphs to 2–4 sentences.

### Classification rules

- `primaryType` is what the thing *is*: Fitts's Law → `law`; HEART → `framework`;
  SUS → `research-instrument`; Nielsen's heuristics → `heuristic`; WCAG → `standard`;
  Miller's "law" → `concept` (popular "law", actually a finding about memory span).
- Popular "UX laws" that are not laws scientifically keep their common name in
  `title` but are classified honestly and the gap is explained.

### Evidence classes

| Class | Meaning |
|---|---|
| `original-empirical` | Directly established by controlled experiments, replicated |
| `peer-reviewed` | Supported by peer-reviewed research, but less replicated or more conditional |
| `established-theory` | A theoretical model widely accepted in its field |
| `official-standard` | Normative text from a standards body |
| `professional-guideline` | Guidance from recognised professional/official sources |
| `practitioner-recommendation` | Practitioner wisdom; limited direct evidence |
| `emerging-hypothesis` | New, promising, under-tested |
| `contested` | Evidence is mixed, failed replications or active dispute |

### Relations

Types: `related-to`, `derived-from`, `applied-in`, `contrasts-with`,
`measured-by`, `developed-from`, `influences`, `complementary-to`. Prerequisites
are expressed with `prerequisites`, which the graph renders as `prerequisite-of`.
Every relation needs a `note` explaining *why* the connection exists. Targets can
be full entries or planned taxonomy slugs.

### Quality gate (status `published`)

All 10 `quality` flags true; ≥3 activities (quiz + exercises); ≥3 connections;
≥1 misconception; ≥1 primary or standard reference. Enforced by `tests/content.test.ts`.

### Sources

- IDs: `surname-year` (`fitts-1954`), `surname-surname-year`, or org-short names for standards.
- Search `content/sources/*.ts` before adding; duplicates fail tests.
- Run `npm run sources:verify -- <new-ids>` after adding DOIs. Mismatches fail tests.
- `verification` is the *authoring* claim; the machine result in
  `verification.json` is shown in the UI and takes precedence.
- Tiers: 1 original evidence & standards; 2 authoritative professional; 3 established educational; 4 discovery only.

### Quizzes

Exactly one correct option. Every option has its own explanation of why it is
right or *specifically* why it is wrong. `revise` points to the topic to study
if answered wrongly. IDs are globally unique (`<entry>-q-<name>`).
