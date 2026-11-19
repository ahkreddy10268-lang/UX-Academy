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
  guides/<id>/                long-form guides (schema lib/content/guide.ts, D-127)
```

### Guides (D-127)

A guide is a documentation record, not a knowledge entry: it adds narrative, mockups (typed mock DSL), comparisons, a method, a case study and an assessment, and **reads** per-topic depth (analogy, scenario, practice, implementation, platform notes, misconceptions, quiz question and exercise by id) from published entries by slug. Never copy entry text into a guide. A topic without an entry may carry an `own` block with `addressedIn` pointing at the entry that covers it. Guides do not count towards coverage. Entries can link back with the optional `guide: { id, anchor, label }` field. `tests/guide.test.ts` checks that every slug, question, exercise, citation and heuristic number resolves.

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

### Taxonomy governance (v1.0, frozen)

1. The 20-domain structure and every domain, subcategory and topic id are frozen. Display titles may change; ids do not.
2. Before adding a topic, search title, alias, synonym and meaning, not only the slug.
3. Decide whether it needs a standalone entry, belongs inside a larger entry (`coveredBy`, only when that entry really explains it) or is a glossary term or alias.
4. Every topic has one primary type from the existing vocabulary, one domain and one subcategory (canonical home); other domains connect through typed relations. Never duplicate a topic to make it discoverable.
5. Merge synonyms into one canonical slug with `aliases` in `content/taxonomy.ts` (searchable, never separate items). Removing a published slug requires redirects and relation migration; removing a planned slug requires retargeting every reference first.
6. Moving a published topic to another domain keeps its slug and route and updates the entry's `domain` and `subcategory` in the same change (`tests/content.test.ts` checks the match).
7. Subcategories hold at least two topics. No software tools, platforms, job titles or course names as topics.
8. Add a topic to the research roadmap only when credible primary or authoritative sources are identified; emerging topics stay `emerging-concept` and are revisited.
9. After any taxonomy change: `npm run docs:generate`, reconcile counts in README, ROADMAP and PROGRESS against the generated reports, run `npm run check`. Never lower content gates to raise the published share.
10. `tests/taxonomy.test.ts` enforces the structure (20 domains, ids, titles, canonical homes, aliases, no tools, P1 placements).

### Topic status (six states, one per taxonomy topic)

Planned · Research in progress · Drafted · Quality reviewed · Published · Addressed within another entry. Derived, never hand-set per topic: an entry's own `status` (`research-pending`/`research-completed` → research in progress), `content/topic-ledger.ts` for research that has no entry file yet (add a row only when sources have actually been gathered), and taxonomy `coveredBy` for "addressed within". Only **Published** counts as covered. Reports: `docs/CONTENT_COVERAGE.md` and `/coverage` give the six statuses and the completion dimensions (research done, explanation, evidence, practice, visual, editorial) per domain and subcategory, plus empty subcategories and learning-path completeness.

### Completeness gates (type-specific, `lib/content/completeness.ts`)

Structural checks that the parts a learner needs for this *kind* of knowledge exist. They never use word counts.

**Level depth (every entry):**
- **beginner:** a stepwise plain explanation (≥ 2 paragraphs), an analogy or ≥ 2 everyday examples, and ≥ 3 vocabulary terms;
- **intermediate:** the mechanism (`howItWorks`), ≥ 2 implementation points and a scenario;
- **advanced:** ≥ 1 evidence point, debates or competing models, and ≥ 2 expert paragraphs.

**All types:**
- a primary or standard source;
- ≥ 2 limitations;
- ≥ 1 "when not to use";
- ≥ 3 connections;
- quiz questions at ≥ 2 levels.

**By family:**
- **Quantitative** (law, formula, metric, research instrument): a formula with variables and a worked example.
- **Procedural** (method, methodology): `method` detail and ≥ 3 practical steps.
- **Practice** (technique, pattern, strategy, tool): ≥ 3 practical steps.
- **Explanatory** (theory, model, framework): origin, plus competing or alternative models.
- **Normative** (principle, heuristic, guideline, rule of thumb): misreadings corrected and origin.
- **Standard:** `standard` detail.
- **Phenomenon** (concept, cognitive bias, emerging concept): evidence including replication status, and misreadings corrected.
- **Discipline:** history, and scope across ≥ 3 of web / mobile / enterprise / services.

### Maturity (reported, not gating)

Five separate dimensions per published entry, rated basic / developing / complete and generated into `docs/CONTENT_COVERAGE.md`: **explanation** (the nine level checks), **evidence** (sources, verification, evidence points, debate), **practice** (quiz at all levels, exercises, flashcards), **visual** (plate L1, diagram L2, interactive L3) and **editorial** (gates, verification state, date). They are categorical completeness ratings, not confidence scores. The explanation rating measures structure, not prose quality; editorial review remains necessary.

### Topics addressed within another entry (`coveredBy`)

A taxonomy item may declare `coveredBy: <published slug>` when a published entry already explains it as part of a larger whole (primacy effect → serial-position effect; the Gestalt sub-laws → gestalt-principles). It keeps its URL and search presence, is reported as "addressed within", and is **never** counted as published. Writing a dedicated entry later overrides it. Tested: the target must be published.

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

## Excellence standard (D-131)

Approved 2026-11-19. **Subordinate to D-129** (`docs/BALANCED_DEVELOPMENT_PLAN.md`): it defines what a new entry must teach; D-129 decides what is written and when. It adds no gate and relaxes none. The quality gate, the completeness gates and the D-129 § 9.2 targets above stay exactly as they are; this standard is checked once per batch in review (`.claude/skills/ux-academy-workflow/SKILL.md` § 2a) and needs no schema or code change. It applies to entries written from Cycle 3 on; the published entries reach it through the improvement pass every second cycle, essential path steps first. The operational checklists live in the workflow skill; this section is the rule.

> An entry is excellent when a capable beginner can explain the idea, apply it to a real interface, recognise when it does not apply, and judge it against alternatives. Every substantive claim traces to evidence that is stated honestly.

### Completion has three layers

| Layer | What | Checked by |
|---|---|---|
| 1. Gates | Quality gate and `lib/content/completeness.ts` | Tests (unchanged) |
| 2. Targets | D-129 § 9.2 evidence and visual targets by type family (`lib/content/targets.ts`) | Tests and generated report (unchanged) |
| 3. Standard | This section: teaching structure, evidence precision, outcomes and practice coverage, connections, visual justification | One batch review, recorded in `docs/QA_VERIFICATION_LEDGER.md` |

An entry counts as complete only when all three hold. No new status value is introduced.

### Teaching structure: mandatory, conditional, optional

**Mandatory** sections are always present. **Conditional** sections are present when their trigger is true, and only then. **Optional** sections are the author's judgement. A section written without its trigger is removed in review rather than padded; a simple topic stays short. Where a gate already requires a part (for example `whenNotToUse`, `limitations`, origin, misreadings for normative and phenomenon types), the gate stays the authority and the standard does not restate it as a second requirement.

**Every type**

- Mandatory: definition or claim; 2–4 observable learning outcomes; mechanism (how or why it works); a labelled example; limits and when not to apply; sources for substantive claims; meaningful connections (below).
- Conditional:
  - *misconceptions* — a documented or common misreading exists;
  - *conceptual distinction* — a neighbouring topic is routinely confused with it;
  - *original finding vs popular UX reading* — the popular reading departs from the source;
  - *replication status* — a replication literature exists;
  - *ethics* — the topic can be used to manipulate, or involves participants or personal data;
  - *accessibility* — the topic shapes an interface people operate.

**By type family** (`TYPE_FAMILY`; no second classification)

| Group | Mandatory | Conditional (trigger) | Optional |
|---|---|---|---|
| Theories, principles, psychological concepts (explanatory, normative, phenomenon) | Original source and its conditions; boundary conditions | Trade-offs with other principles (normative types); ethical use vs manipulation (biases, persuasion) | History; demonstration |
| UX methods and frameworks (procedural; frameworks are explanatory) | Problem it solves; steps with decision points; outputs | Worked example from input to output (steps need judgement); variants (recognised variants exist); comparison (an alternative is commonly chosen instead) | Templates; history |
| Research methods | Research question it answers; type of data; protocol; analysis; threats to validity | Ethics and consent (human participants); sampling detail (inferential use); worked mini-study (analysis needs judgement) | Cost and time; tooling |
| Design patterns and techniques (practice) | Problem and context; anatomy of the solution; anti-pattern or misuse | States and variants (interactive pattern); evaluation criteria (quality is judged, not binary) | Real-world examples; implementation notes |
| Metrics, formulas, statistics (quantitative) | Construct measured; formula with every variable defined; worked calculation computed by `lib/formulas`; interpretation; assumptions | Benchmarks (a sourced benchmark exists); uncertainty and sample size (inferential use); typical misuse (documented) | A calculator beyond the D-129 target |
| Professional disciplines | Scope and boundaries (what it is not); core questions; methods and artefacts it owns; neighbouring disciplines | Dated history (history explains current practice) | Roles and career |
| Tools, labs, practical techniques | Learning objective; what the learner changes; what is computed and its source; what it cannot show; simulation / demonstration / experiment label | Guided tasks (the parameter space is not self-evident) | Interpretation challenge |

### Evidence precision

- **Traceability.** Every substantive factual, empirical, statistical or theoretical claim traces through `{{src:id}}` to a source in the entry's `references`. Definitions in common use and the academy's own reasoning need no citation, but must not read as findings. Numbers, thresholds and effect sizes cite the study that measured them.
- **Four kinds of statement, kept distinct in the wording:**

| Kind | How it is written |
|---|---|
| Research finding | Cites the study that measured it, with the conditions that limit it |
| Professional guidance | Attributed to the guideline, standard or framework that issued it; stated as guidance, not as a finding |
| Academy interpretation | Signalled in the wording, reasoning visible; never given a citation that does not support it |
| Illustrative example | Labelled as illustrative; invented details are never presented as observed |

- The D-129 § 9.2 evidence groups are unchanged. Sources for a batch pass `npm run sources:verify` before its first entry is drafted; a foundational topic without verifiable sources is replaced under D-129 § 9.3, never written thinly.

### Case-study integrity

Applies to case-study entries, guides, worked examples and scenario questions.

| Label | Rule |
|---|---|
| Documented fact | Verifiable from a cited public source |
| Reported outcome | Attributed to whoever reported it ("the company reported…"); never restated as a verified result |
| Independent evaluation | A cited third-party assessment, with its method where known |
| Academy interpretation | Our analysis, marked and kept apart from the facts it draws on |
| Hypothetical teaching scenario | Labelled "Illustrative scenario"; never uses a real organisation's name; never presents invented figures as outcomes |

### Learning outcomes, misconceptions and practice coverage

- **Outcomes:** 2–4 per entry in `learningObjectives`, each with an observable verb (explain, distinguish, identify, apply, calculate, choose, critique). Each outcome is exercised by at least one practice item, or by a named path checkpoint or comparison.
- **Misconceptions and distinctions:** in `misconceptions` and comparisons when the trigger above is true. They supply the wrong options of understanding-level questions. They are never invented to fill a section.
- **Four cognitive levels — recall, understanding, application, judgement — describe coverage, not a question count.** The existing practice gates are unchanged and no extra items are required; the standard says what those items should aim at. One item may serve two levels.

| Level | Where it must be covered | Feedback |
|---|---|---|
| Recall | In the entry (flashcards) | Answer and a link back |
| Understanding | In the entry | Each wrong option names the misconception it represents |
| Application | In the entry for applied types (methods, research methods, patterns, metrics); otherwise in the entry or a related one | Model answer; calculations from `lib/formulas` |
| Judgement | In the entry, or in a comparison, related entry or path checkpoint that names the topic, where that is educationally better | Names the trade-off; accepts the best answer under the stated constraints |

The batch review records where each level is covered; a level covered elsewhere is a pointer, not a gap. Assignments, professional challenges and final projects belong to learning paths, not entries.

### Connections

Part of completion, using the existing fields only:

- `prerequisites`: list a real prerequisite when one exists; never invent one.
- `relations`: at least one typed relation, with its note, to a published entry, and at least one to another domain where a meaningful one exists (already required of G-slot batches by D-129).
- Links from existing entries to the new ones (D-129 § 7.4) are part of the batch.

No new graph feature or schema.

### Visuals and interactive tools

Anything beyond the required plate answers *what does this show that prose cannot?* — a process or state change, a structure, a comparison, a computed relationship, or a measurable human response — in the figure's existing `objective` and `takeaway`. Demonstrations of a bias on the learner are labelled demonstrations, never experiments. Product experience (discovery, reading, continuity, responsive layout, accessibility, consistency, local-first data) is preserved and checked with the existing browser suites.

### Batch QA

- **One targeted review** per batch against all three layers, with QA chosen by change impact and ledger results reused where the skill's rules allow.
- **One correction pass** fixes critical and major findings (the skill's severity scale). Moderate findings, which the skill already requires fixed before a PASS, are fixed in the same pass, not a second one.
- Minor findings (wording, style, optional additions) are logged in `docs/OPEN_ISSUES.md` for the next improvement pass, not fixed in the batch.
- **No reopening a completed topic for cosmetic preference.** A closed topic reopens only for a factual or source error, a broken gate, an accessibility defect, or new verified evidence.
- Needing a second correction pass is the D-129 § 9.3 rework signal.

### Outside this standard

New tests, revision-system integration (missed quiz questions feeding the Leitner queue) and learning-path programme fields (essential and optional steps, checkpoints, final projects) each need a separate owner approval. They are not part of D-131.
