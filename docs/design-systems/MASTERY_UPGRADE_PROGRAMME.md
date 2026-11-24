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
| Pilot 1: Design Tokens | In progress |
| Pilot 2: Component Architecture | Planned |
| Pilot 3: Design Governance | Planned |
| 26-topic rollout | Planned |
| Final branch tests | Pending |
