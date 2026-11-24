# Design Systems Mastery Upgrade Programme

> Phase 2 — curriculum depth and professional practice. Started 2026-11-24 on codex/design-systems-mastery-build, based on main at 777640d3f248743cbae2e60a145f8d942c26f240.
>
> This upgrades the existing published 29-topic curriculum. It is not a taxonomy expansion, a page redesign or a rewrite for word count.

## 1. The ambition

Turn Design Systems from a complete topic inventory into a connected learning and professional reference resource. A learner should be able to understand an idea, recognise it in real interfaces, select among alternatives, design and implement it, evaluate quality and maintain it over time.

The target is 29 complete topic dossiers, one for each canonical lesson. Each dossier uses the existing knowledge-entry model and /library/[slug] page family. The five-stage /learn/design-systems path is the guided route; /system is UX Academy's own living implementation and a case study, not the definition of the discipline.

## 2. What stays fixed

- The 29 published topic IDs, slugs, taxonomy placement and four subcategories.
- Existing entry URLs, three visible learning levels, page template, typography, visual language and navigation.
- Existing learner progress identity and stored data.
- The five-stage learning path and its order, unless a separate tested curriculum decision is approved.
- Strong material already present in lessons, research, labs, exercises and the reference audit.

No global redesign, taxonomy renaming or new dependency is needed to begin. Any shared UI or schema change must be justified by the three pilots and a separate impact review.

## 3. The learning promise

The three levels must teach different capabilities, not simply provide three longer explanations.

| Level | Learner question | Expected capability |
|---|---|---|
| Beginner — Understand | What is this, why does it exist, and where might I see it? | Explain it plainly, recognise it, describe its anatomy and distinguish it from nearby concepts. |
| Practitioner — Apply | How do I use, design, specify, build and test it? | Apply it to a real task, choose options, correct a poor example and produce a usable artefact. |
| Systems Architect — Analyse & evaluate | What should an organisation adopt, and what are the long-term consequences? | Compare models, evaluate evidence and constraints, set decision rules, govern change and defend trade-offs. |

Advanced material must remain meaningful to experts; it is not a larger beginner summary.

## 4. The topic dossier

Each lesson covers the dimensions that genuinely apply. A section may be omitted only when the author records why it does not apply. Do not fill sections with generic or repeated text.

1. Orientation: definition, what it is not, purpose, problem solved, place in a system and prerequisites.
2. History and evolution: origin, earlier approaches, milestones, what changed, what remains useful and what is now obsolete. Separate documented history from interpretation.
3. Mental model and anatomy: layers, parts, relationships, vocabulary, lifecycle or state model.
4. Principles and rules: why a practice works and what decision it guides. Label every rule as standard, platform, system, industry, context or team. A vendor value is never a universal rule.
5. How it works: step-by-step mechanism or workflow, worked through one coherent example.
6. Good, poor and corrected practice: a paired comparison based on the same task; explain the defect, likely user consequence, cause, correction and validation.
7. Variations and alternatives: recognised approaches, variants, implementation models and trade-offs. Explain when each fits; do not declare a universal winner.
8. Application: web, mobile, enterprise, multi-brand and service contexts where relevant. Explain design-tool, code and handoff implications.
9. Use and avoid: decision criteria, when not to use it, what to use instead, exceptions and costs.
10. Real-world cases: compare reference systems fairly. Separate documented fact, system-owner claim, independent evaluation and Academy interpretation.
11. Quality, accessibility and maintenance: evaluation checklist, standards at criterion level, responsive/localised edge cases, versioning, ownership, telemetry and known limits.
12. Practice and assessment: recognition, understanding, application and judgement. Use a quiz, correction exercise and professional deliverable appropriate to the topic.

### Use the existing schema

| Learning material | Existing field or surface |
|---|---|
| Definition, scope and orientation | definition, summary, beginner explanation |
| Mental model and history | beginner analogy, everydayExamples, origin |
| Mechanism and workflow | intermediate explanation, howItWorks, implementation, scenarios, application.steps |
| Evidence, debates and alternatives | advanced evidence, debates, alternativeModels |
| Good/poor examples and implementation snippets | practice block, existing L2 comparison figures, labelled scenarios |
| Platform and organisational applications | application.web, mobile, enterprise, services |
| When to use/avoid and trade-offs | whenToUse, whenNotToUse, advantages, limitations, misconceptions |
| Connections | prerequisites and typed relations with explanatory notes |
| Practice and feedback | exercises, quiz, flashcards, relevant existing labs/workshops |
| Claims and references | references, inline source markers, evidenceNote, lastVerifiedAt |

The schema already supports structured recommendations and code examples through the optional practice block (D-113). Prefer it over free-form checklists. Do not add a new field or UI section unless the pilots demonstrate a material teaching gap existing fields and figures cannot handle.

## 5. Good/poor comparisons and examples

A good/poor pair must use the same task and context. Colour or decoration alone is never the difference.

Comparison sequence: context and user goal → poor implementation → observable problem → why it fails → improved implementation → why it is better → remaining trade-off → validation method.

Correction exercise: identify the symptom; explain user impact; trace the underlying cause; state the governing principle or requirement; show the correction; test it; explain the trade-off introduced.

Label examples as one of:
- Documented fact: supported by a cited public source.
- Reported outcome: explicitly attributed to the organisation reporting it.
- Independent evaluation: supported by a cited third-party assessment.
- Academy interpretation: our analysis, clearly signalled.
- Illustrative scenario: invented for teaching and labelled as such.

Never invent adoption, efficiency, conversion or productivity figures. Never use a real organisation's name for an invented case. Teach what transfers and what is specific to a platform, brand or audience.

## 6. Evidence and currentness

Use the hierarchy in SOURCE_AND_EVIDENCE_PLAN.md and REFERENCE_AUDIT.md:
1. Normative standards and specifications, such as WCAG 2.2 and Semantic Versioning 2.0.0.
2. Community specifications, such as DTCG 2025.10; explicitly not a W3C Standard.
3. Informative guidance, such as WAI-ARIA APG; not normative.
4. Official design-system documentation: GOV.UK, Carbon, Material, Fluent, Spectrum, USWDS, Apple HIG and UX4G.
5. Primary research where it exists.
6. Practitioner books and documented experience.

For changeable tools and specifications, record the exact page, version/status, date checked and access limitations. Re-check before release. Put current practice and emerging trends in dated callouts instead of silently baking them into timeless definitions.

Research check on 2026-11-24:
- DTCG 2025.10 is the stable Final Community Group Report published 2025-10-28. It is not a W3C Standard or on the W3C Standards Track. The 2026 technical-report preview says not to implement or cite it as authoritative.
- Figma's official variables overview lists six variable types: color, number, string, boolean, timing and easing. These are Figma product capabilities, not types prescribed by DTCG.
- Current practice includes token interoperability, multi-context theming, responsive/container-aware patterns, platform-native accessibility, design-system analytics and careful AI-assisted documentation/automation. AI outputs remain proposals requiring human design, code and accessibility review.

## 7. Case-study method

Use the existing audited references instead of copying screens or presenting one system as universal.

| Reference | Teaching value |
|---|---|
| GOV.UK Design System | Public-service tasks, research, contribution criteria and lifecycle |
| IBM Carbon | Enterprise components, design/code parity, contribution and accessibility |
| Material Design 3 | Design language, role-based colour, token layers, surfaces and states |
| Microsoft Fluent 2 | Global/alias tokens, themes and cross-platform differences |
| Adobe Spectrum 2 | Anatomy, variants versus states, usage, content, internationalisation and accessibility |
| USWDS | Public-sector adoption, principles and maturity without a universal score |
| Apple HIG | Native platform conventions, responsive behaviour, dynamic type, symbols and interaction |
| UX4G | Indian government context, multilingual and public-service considerations |

Every case study answers: who it serves, its constraints, how it is structured, what is strong, where it differs, what its public documentation does not establish, what transfers and what should not be copied blindly. UX Academy's /system is the internal practical case alongside public references.

## 8. Integrated practical programme

Keep the existing five stages. Build one clearly illustrative Library Services Platform cumulatively instead of disconnected toy exercises.

| Stage | Learner artefacts |
|---|---|
| 1. Understand the system | Product/system brief, users, three principles, design language and architecture map |
| 2. Tokens and themes | Primitive and semantic tokens, one theme, token export and contrast validation |
| 3. Scales and visual systems | Colour, type, spacing, elevation, icon and responsive specifications |
| 4. Components and patterns | Three component contracts, states, accessibility, two task patterns and corrected examples |
| 5. Governance and operations | Contribution process, decision rights, lifecycle/version policy, QA checklist, audit and capstone review |

Reuse Token Lab, Async State Lab, Type Scale Lab, Contrast Lab, Accessible Component Workshop and /system examples. New interactive tools are justified only when learner action reveals a relationship, state, calculation or decision that prose and static figures cannot teach.

## 9. Upgrade sequence

### Pilot 1 — Design Tokens
Prove the dossier using a technical foundation with a live lab. Deliver a clear token-versus-variable distinction, worked DTCG example, source-to-output pipeline, primitive/semantic/component choices, good/poor mappings, theme comparison, Figma variables versus DTCG, accessible token-pair validation and a correction exercise.

### Pilot 2 — Component Architecture
Prove the format on a design/build subject. Deliver anatomy and contract, composition models, slots/compound/headless/styled/native alternatives, good/poor APIs, variants versus states, accessibility, responsive behaviour, design-tool/code mapping and a specification exercise.

### Pilot 3 — Design Governance
Prove the format on an organisational subject. Deliver centralised/federated/hybrid models, decision rights, contribution workflow, RFC and review criteria, exceptions, lifecycle status, incentives and operating costs, real-system comparison and a governance proposal.

### Rollout — remaining 26 topics
Apply the validated dossier in dependency order: foundations; visual scales; component and state concepts; task patterns; governance/operations. Review coherent small batches, run impact-relevant tests and update the matrix. Do not cosmetically reopen lessons that already satisfy the new standard.

## 10. Acceptance criteria for an upgraded topic

- Existing quality and type-specific gates remain green.
- Three levels teach different capabilities.
- Relevant dossier dimensions are covered or explicitly marked not applicable.
- At least one substantial worked example and one same-task good/poor comparison exist, using a figure, structured practice example or suitable exercise.
- A correction path explains diagnosis, repair and validation.
- Relevant alternatives, variations, use/non-use and trade-offs are explicit.
- Case-study claims are accurately attributed; normative rules cite exact standard/criterion/version.
- Quizzes, exercises and flashcards reinforce outcomes rather than pad counts.
- Page works within existing design and accessible interaction patterns.
- Source access, evidence limits and verification date are honest.
- A reviewer can point to learner artefacts and say what the learner can now do.

No arbitrary word counts. More words are justified only when they add a new explanation, comparison, example, decision or practice opportunity.

## 11. Work discipline

- Work on codex/design-systems-mastery-build; do not write to main.
- Keep PR #4 (separate Domain 1 work) independent.
- No production deployment, domain setting, merge or PR release without separate explicit approval.
- Read and preserve strong existing material; do not replace it with templated filler.
- Verify every new source ID. Run integrity, source verification, typecheck/tests, generated docs, build and relevant browser suites before proposing merge.
- Record real test results only. Source-branch results are not final-branch results.

## 12. Current build status

| Deliverable | Status |
|---|---|
| Baseline and Phase 1 research reviewed | Complete |
| Master upgrade programme | Added in this branch |
| Topic-by-topic upgrade matrix | Added in this branch |
| Pilot 1: Design Tokens | Content, lab integration and page QA complete; accepted as the first format pilot |
| Pilot 2: Component Architecture | Targeted enrichment complete; shared browser QA passed |
| Pilot 3: Design Governance | Targeted enrichment complete; shared browser QA passed |
| Remaining topic rollout | Nine lessons accepted; Spacing Scales content enriched and awaiting targeted visual/keyboard QA; 19 other topics remain. |
| Final branch tests | Nine accepted lessons retain their recorded checks. Spacing Scales: npm ci, npm run check (23 files / 626 tests), taxonomy (1,046 links), 8 source checks, docs generation and build (998 pages) pass; preview route returns HTTP 200 with updated content and citations. Six-context axe/keyboard review remains pending. |

## Pilot 1 — current implementation record (2026-11-24)

The `design-tokens` entry now includes:
- A clearer token-versus-variable explanation and a warning that tool variables are not the DTCG file format.
- A token delivery pipeline from authoring through validation, context resolution, platform transforms, generated outputs and integration tests.
- An explicit statement that DTCG does not mandate primitive/semantic/component tiers.
- Structured practice guidance and examples: DTCG source fragment, resolved CSS for light/dark contexts, and a poor-versus-better component mapping.
- A pipeline assignment, questions about variable/token distinction and tier choice, additional flashcards and common misconceptions.
- A direct link to the existing `token-lab` on the lesson page.

**Scope and QA:** the current Token Lab is a colour-only simulation; it does not teach typography, spacing or motion token mapping. The CSS shown in the lesson is an illustrative resolved output, not a claim that the DTCG file directly defines CSS selectors. `npm run check` passes (23 files, 626 tests, typecheck and lint); `npm run test:taxonomy` passes (1,046 links, 119 published entries at three depths); both changed source records pass `sources:verify`; `npm run build` passes (998 pages generated); and the three pilot entries pass 24/24 entry-browser checks at 1440, 768 and 390 px in light/dark themes, with zero axe violations, overflow or console errors. See `docs/PROGRESS.md` Session 77 for the exact test record.

## Pilot 2 and Pilot 3 — targeted enrichments (2026-11-24)

The initial inspection found that both lessons already contained substantive material; they did not need wholesale rewrites.

- **Component Architecture:** retained the existing compound Tabs example, presentational component/product wrapper, anatomy exercise, 23-prop correction exercise, APG keyboard guidance and alternatives. Added a same-task poor-versus-better code example that contrasts a flag-heavy/data-owning BookCard with a composable presentational card and product wrapper.
- **Design Governance:** retained the existing centralised/federated/hybrid discussion, GOV.UK's five contribution criteria, lifecycle statuses, RFC template, CI status metadata, correction exercise and governance-model assignment. Added a same-request comparison showing ad hoc chat approval versus an evidence- and criteria-led date-range-picker proposal.
- These are focused pilot additions, not proof of final completeness. The two lessons still need the same content integrity, build and browser QA as the Design Tokens pilot.


## Pilot acceptance record — three topics (2026-11-24)

The first three pilots validate the same dossier principle across a technical foundation, component design/build and organisational governance:

- **Design Tokens:** token-versus-variable and DTCG distinction; source-to-output pipeline; structured do/don't guidance; DTCG source, resolved CSS and real UX Academy CSS/Tailwind examples; same-role light/dark contrast calculation; migration exercise; assessment; direct Token Lab card on the lesson page.
- **Component Architecture:** retains the existing compound Tabs and presentational wrapper examples; adds the same-task poor/strong BookCard API/composition example. The comparison is explicitly labelled illustrative and notes when composition is not worth the added abstraction.
- **Design Governance:** retains operating models, GOV.UK criteria, RFC and lifecycle material; adds a same-request comparison of ad hoc chat approval with an evidence- and criteria-led proposal. The example is explicitly illustrative.

Small shared presentation fixes were necessary: reference-list source locators now wrap safely on narrow screens, and the existing optional `lab` field now displays an “Interactive lab” card on the lesson page. These are additive and preserve the existing editorial page design; no taxonomy, schema or learner-progress changes were made.

### Verified checks

- `npm run check`: PASS — content index, TypeScript, 23 test files / 626 tests and ESLint.
- `npm run test:taxonomy`: PASS — 20 domains, 73 subcategories, 561 topics, 1,046 links checked, 119 published entries checked at three depths; Design Systems 29/29 published.
- `npm run sources:verify -- style-dictionary-dtcg figma-learn`: PASS — both URLs reachable.
- `npm run docs:generate`: PASS — generated taxonomy, research sources, content coverage and illustration coverage; reviewed the generated count/date diff.
- `npm run build`: PASS — Next.js production build; all 998 static pages generated.
- `entry-review.cjs design-tokens component-architecture design-governance`: PASS 24/24. All three entries reviewed at 1440, 768 and 390 px in light/dark; axe 0, overflow 0, errors 0, plate text >=10.2 px at 390 px, no clipped text or out-of-viewBox markers; all internal links resolve with no raw citation/link markup; keyboard flashcards pass (7/7, 4/4 and the Governance count in the test output).

The full 29-topic rollout and its full impacted-browser suite are not complete. This is a three-topic pilot acceptance, not a declaration that every Design Systems lesson has already met the upgraded dossier standard.

## Token architecture batch — three connected lessons (2026-11-24)

The next dependency group extends the Design Tokens pilot without repeating its core explanation:

- **Primitive Tokens:** clarified Figma number variables versus DTCG dimension values/units; added a same-task CSS comparison of drifting spacing values versus a deliberate primitive scale. The comparison explicitly states that a 4 px base is not a universal rule and that optical exceptions can be justified.
- **Semantic Tokens:** added Figma's DTCG mode-import constraints, including common-token and supported-type requirements; added a same-task error-message comparison showing raw colour duplicated across themes versus one semantic role remapped per theme.
- **Theme Architecture:** explained Figma's explicit and Auto-inherited variable modes and its collection default, carefully distinguishing Figma inheritance from the DTCG Resolver's resolution-order document; added a same-task comparison of duplicated component theme patches versus shared semantic role mappings.

Existing DTCG JSON samples, contrast calculations, alternatives, exercises and source analysis were preserved. Figma details are clearly marked as tool-specific, not universal design-system rules.

### Token architecture batch verification

- `npm run check`: PASS — 23 test files, 626 tests; content index, TypeScript and ESLint.
- `npm run test:taxonomy`: PASS — 20 domains, 73 subcategories, 561 topics, 1,046 links checked, 119 published entries at three depths; Design Systems 29/29.
- `npm run sources:verify -- style-dictionary-dtcg figma-learn`: PASS — both source roots URL-reachable.
- `npm run docs:generate`: PASS — coverage and illustration documents regenerated and substantive differences reviewed.
- `npm run build`: PASS — Next.js production build; all 998 static pages generated.
- `entry-review.cjs primitive-tokens semantic-tokens theme-architecture`: PASS 24/24; 1440/768/390 px, light/dark, axe 0, overflow 0, console/page errors 0, figure text >=10.2 px at 390 px, no clipping/out-of-viewBox markers, internal links resolve and no raw markup, keyboard flashcards pass.

This validates the three additional lessons only. The full 29-topic programme and full site-wide browser/change-impact suite are still outstanding.


## Foundations batch — Design Language, Atomic Design and Multi-Brand Systems (2026-11-24)

- **Design Language:** adds a sourced historical strand from IBM's 1956 corporate design programme through later software theming and modular digital interfaces. It clearly distinguishes a lasting design language (principles, hierarchy, interaction/content grammar and accessibility) from a temporary visual style or fashion. The historical account labels Brad Frost's 2025 timeline as an attributed practitioner retrospective, not an exhaustive academic history or a single-origin claim.
- **Atomic Design:** adds a same-search-task example showing how to use atoms/molecules/organisms as a mental model while organising implementation by feature ownership. It explicitly rejects a mandatory atoms/molecules/organisms folder structure and keeps the accessible combobox as one coordinated interaction.
- **Multi-Brand Systems:** adds a same-request comparison of copied component-library forks versus one shared component/accessibility contract with per-brand token maps and brand-by-mode validation. It also turns the annotated multi-file token illustration into a clearly labelled text file map rather than implying the notes are one JSON document. Its existing illustration's “0 px · serif” label was right-aligned inside the canvas after the browser review identified clipping.

### Verified source and generated records

- Added two source records: `ibm-design-program-history` and `frost-themeable-ui-history`; both verified URL-reachable on 2026-11-24 and recorded in `content/sources/verification.json`.
- Generated source registry: 595 → 597 total; URL-reachable 277 → 279.
- Generated entry references: Atomic Design 4 → 5; Design Language 7 → 9; Multi-Brand Systems 5 → 6.
- The source-history claims are explicitly attributed. IBM is a corporate-design precedent, not the origin of all design languages; Frost's timeline is a practitioner's retrospective.

### Foundations batch verification

- `npm run check`: PASS — 23 test files / 626 tests, content index, TypeScript and ESLint.
- `npm run test:taxonomy`: PASS — 20 domains, 73 subcategories, 561 topics, 1,046 links checked, 119 published entries at three depths; Design Systems 29/29.
- `npm run sources:verify -- ibm-design-program-history frost-themeable-ui-history`: PASS — both URLs reachable.
- `npm run docs:generate`: PASS — 597 source records; coverage and research rows regenerated and changes reviewed.
- `npm run build`: PASS — Next.js production build; 998 static pages generated.
- `entry-review.cjs design-language atomic-design multi-brand-systems`: PASS 24/24 across 1440/768/390 px in light/dark. Axe 0, overflow 0, page/console errors 0, figure text minimum 10.2 px, no clipped text or out-of-viewBox markers, internal links resolve and no raw citation/link markup; keyboard flashcards pass (4/4 per topic).

Three batches now cover 9/29 lessons. The remaining 20 topics and full site-wide change-impact suite are still outstanding. No taxonomy/schema/progress model changes, merge or production deployment.

## Scales & visual systems — Spacing Scales (2026-11-24)

The existing lesson was selectively enriched in place; its slug, taxonomy, three learning levels, existing examples and exercises remain. The additions address the upgrade matrix without turning the spacing scale into a universal grid rule:

- Clarifies that a spacing scale and a column/layout grid are related but distinct systems, using Carbon's documented 2x Grid and spacing tokens as the comparison.
- Adds platform mapping: CSS px/rem on web, dp for Android layout and sp for Android text, and points in Apple HIG layout guidance. Android's 4/8 baseline-grid language is labelled as Android guidance, not a universal web requirement.
- Adds density as semantic-role remapping, with accessibility floors preserved; distinguishes discrete breakpoint mapping from bounded fluid spacing (clamp()) and container-based adaptation.
- Adds content-driven sizing and explicit exceptions for translated, long or user-adjusted content; explains when a small optical correction is justified and how to document it.
- Adds a same-task poor/better responsive catalogue CSS comparison, an advanced responsive repair assignment and two flashcards.
- Added the official Android grids-and-units source; refreshed the relevant Carbon, Atlassian, GOV.UK, Apple and MDN source checks. Current Atlassian scale ranges and Android unit/grid guidance were checked against their official pages.

### Verification for the Spacing Scales content update

- npm ci: PASS; audit reported 0 vulnerabilities.
- npm run check: PASS — content index, typecheck, 23 test files / 626 tests and ESLint.
- npm run test:taxonomy: PASS — 20 domains, 73 subcategories, 561 topics, 1,046 links; Design Systems remains 29/29 published.
- npm run sources:verify for android-grids-and-units, carbon-spacing, carbon-2x-grid, atlassian-spacing, govuk-spacing, apple-hig-layout, mdn-clamp and mdn-container-queries: PASS — 8/8 URL-reachable.
- npm run docs:generate: PASS — generated source registry now reports 598 sources (280 URL-reachable); Spacing Scales reference count increases from 6 to 11, exercise count from 362 to 363 and flashcards from 476 to 478.
- npm run build: PASS — Next.js production build; all 998 static pages generated.
- Vercel Preview /library/spacing-scales: HTTP 200. Server-rendered HTML includes the new comparison, assignment and cited material; no raw citation markup was found.
- Not yet verified: the reusable six-context Playwright/axe/keyboard entry review. The QA sandbox checkout did not include Playwright or a browser binary, so do not record a visual/accessibility browser pass for this lesson yet.

This is a content update on the existing draft PR branch, not a production release. The PR remains draft; do not merge until the remaining curriculum rollout, final branch integration and full impacted-browser review are complete.