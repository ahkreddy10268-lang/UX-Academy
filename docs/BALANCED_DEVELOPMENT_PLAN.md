# Balanced academy development — plan

_Status: **proposal, awaiting owner approval** (2026-11-12). Nothing in this document has been applied to content, taxonomy or quality gates. On approval it supersedes the tier order in `docs/CONTENT_AUDIT.md` § 6 (kept as history)._

Baseline: `docs/CONTENT_COVERAGE.md` generated 2026-11-12 (authoritative). Dependency figures come from a read-only analysis of the published entries (inbound `[[links]]`, `relations`, `prerequisites`) and learning-path steps; they are reproducible and are not stored as content.

---

## 1. Reconciled coverage baseline

| Measure | Generated (authoritative) | Stale figure and where |
|---|---:|---|
| Topics / domains / subcategories | 561 / 20 / 73 | 558 — `PROGRESS.md` § State |
| Published entries | **88 (15.7 %)** | 52 (9.3 %) — `PROGRESS.md` § State |
| Addressed within another entry | 10 | — |
| Planned, no content | 463 | 496 — `PROGRESS.md` § State |
| Research in progress (ledger) | 0 | — |
| Domains with no published entry | 6 | 6 (still true) |
| Subcategories with no published entry | 42 of 73 | — |
| Labs / workshops / comparisons / paths | 18 / 11 / 10 / 16 | 15 labs — `PROGRESS.md` |
| Quiz / exercises / flashcards | 325 / 259 / 310 | 215 / 151 / 175 — `PROGRESS.md` |
| Sources | 414 | 293 — `PROGRESS.md` |

Other stale or inconsistent documentation found:

- `CONTENT_AUDIT.md` § 6 is a strictly sequential tier order (finish tier *n* before *n+1*), which contradicts balanced development; Tier 1 still lists `inclusive-design`, `design-thinking`, `human-centred-design` (unwritten, correct) but Tier 5 predates the completed Design Systems domain.
- § 6 Tier 10 names `human-ai-interaction-guidelines` and `calibrated-trust-in-ai`; neither slug exists. The taxonomy slugs are `human-ai-interaction` and `ai-trust`. Tier 2 names `feedback`; the slug is `feedback-principle`.
- `PROGRESS.md` "Next task" says publish `interaction-states` then follow § 6 — superseded by this plan (`interaction-states` is in Batch 1 below).

**On approval:** replace the `PROGRESS.md` § State table with a pointer to the generated figures, mark § 6 of `CONTENT_AUDIT.md` superseded with a link here, and record the strategy as a decision (D-129).

### Maturity, read correctly

The five dimensions are not equally attainable, and the plan should not chase "complete" where the rules make it structurally unreachable:

| Dimension | Complete / published | Why |
|---|---|---|
| Explanation | 88 / 88 | Level checks; a gate. |
| Editorial | 84 / 88 | 4 developing: `doherty-threshold`, `keystroke-level-model`, `shneiderman-golden-rules`, `system-usability-scale` (source verification or date). |
| Practice | 76 / 88 | 12 developing — cheap to fix (missing level coverage, exercise or flashcards). |
| Evidence | 50 / 88 | Rule needs ≥ 2 primary/standard sources and a debate. 28 Design Systems entries are practitioner topics with little primary literature — "developing" is honest there. 10 heuristic/principle entries *do* have primary literature (Nielsen, Norman, Shneiderman) and can reach complete. |
| Visual | 4 / 88 | Complete = plate + L2 diagram + L3 interactive. By design most topics should not have an L3 (D-075, D-078, D-082, D-095). |

---

## 2. Strategy: how balance is enforced

1. **Three topic tiers, applied in every domain.** *Foundational* (needed to understand the domain at all, or depended on by other domains), *core professional* (what a practitioner uses weekly), *specialist* (depth, niches, history). Phase 1 publishes foundational topics everywhere before Phase 2 opens core topics anywhere at scale.
2. **Portfolio slots per production cycle.** A cycle is three batches, one per slot:
   - **H — hub:** highest dependency demand (topics many published entries and paths already point to).
   - **G — gap:** an empty or < 10 % domain's foundations. Reserved capacity, because dependency demand is biased towards already-developed areas: nothing links to an empty domain yet, so demand alone would never reach it.
   - **R — rotation:** the next domain cluster not touched in the previous cycle, or a prerequisite chain another slot needs next.
3. **Caps.** No domain receives more than one batch per cycle (except a cross-domain batch); no domain > 40 % of a cycle's entries; every cluster (below) is touched at least once every two cycles.
4. **Improvement quota.** Every second cycle includes one improvement pass on existing entries (§ 7). Improvement does not count as coverage.
5. **Unchanged rules.** One fully researched entry at a time inside a batch, sources verified first (`sources:verify`), every gate and completeness check, a plate per entry, `docs:generate` after each entry. Design Systems content is not rewritten.

### Domain clusters (rotation units)

| Cluster | Domains |
|---|---|
| A. Human foundations | UX & UI Fundamentals, UX Laws & Cognitive Effects, Cognition/Behaviour/Human Factors, Principles & Heuristics |
| B. Interface craft | Interaction Design, UI & Visual Design, Typography & Colour, Design Systems |
| C. Structure & language | Information Architecture, UX Writing & Content Design, Accessibility & Inclusive Design, Design Practice & Technical Literacy |
| D. Evidence | UX Research, Metrics/Formulas/Statistics, Data Visualisation, Design Methods & Frameworks |
| E. Strategy & context | Product Design & Strategy, Service Design & Systems Thinking, Ethical & Responsible Design, Emerging & Specialised Disciplines |

---

## 3. Multi-phase roadmap

| Phase | Goal | Exit criteria (all measured from generated coverage) | Projection* |
|---|---|---|---|
| **1. Foundations everywhere** (cycles 1–8, 23 content batches + 4 improvement passes) | Every domain teachable at an introductory level; no empty domain; every learning path's first stage complete. | 0 empty domains (by end of cycle 5); every domain ≥ 3 published entries; all ~85 foundational topics published or explicitly `coveredBy`; first stage of all 16 paths complete; Practice and Editorial complete on 100 % of entries. | ~185–195 published (~33–35 %) |
| **2. Core professional practice** | Each domain usable for real work. | Every subcategory ≥ 1 published entry (42 empty today); every domain ≥ 30 %; every path ≥ 70 % complete; new paths for Content, Ethics, Data Visualisation, Design Practice exist. | ~330–360 published |
| **3. Depth & specialisation** | Specialist topics, guides, case studies, advanced labs. | Every domain ≥ 60 %; Evidence complete where the evidence class allows (§ 5); a guide per cluster. | — |

\*Projections assume ~4–5 entries per batch, the pace of recent batches. They are planning estimates, not commitments.

Phase 2 and 3 batches are planned at the end of the preceding phase, from the regenerated coverage and dependency analysis, not fixed now.

---

## 4. Prioritised topic backlog (all domains)

Notation: **F** foundational, **C** core professional, **S** specialist. ✓ already published (not repeated). *coveredBy candidates* (§ 7.3) are topics likely explained inside another entry; they are decided when that entry is written or reviewed, only if it genuinely explains them, with the reason logged in `CONTENT_AUDIT.md` (taxonomy governance unchanged).

| Domain (published / topics) | F — foundational (planned) | C — core professional | S — specialist | coveredBy candidates |
|---|---|---|---|---|
| UX & UI Fundamentals (6/21) | human-centred-design, design-thinking, history-of-hci | product-design, experience-design, ux-lifecycle, design-processes, ux-maturity, history-of-interface-design | evolution-of-digital-experiences | utility, usefulness, desirability → usability / user-experience; feasibility, viability → design-thinking |
| UX Laws & Cognitive Effects (13/46) | default-effect, loss-aversion, framing-effect | anchoring-effect, social-proof, goal-gradient-effect, zeigarnik-effect, postels-law, power-law-of-practice, webers-law, cognitive-ease, mere-exposure-effect, decision-fatigue, status-quo-bias, confirmation-bias, availability-heuristic | fechners-law, ikea-effect, endowment-effect, sunk-cost-effect, parkinsons-law, occams-razor, pareto-principle | endowment-effect → loss-aversion; status-quo-bias → default-effect |
| Cognition, Behaviour & Human Factors (7/59) | seven-stages-of-action, conceptual-models, preattentive-processing, selective-attention, visual-search | atkinson-shiffrin-model, dual-coding-theory, schema-theory, mental-workload, situation-awareness, human-factors-engineering, distributed-cognition, situated-action, activity-theory, self-determination-theory, flow-theory, emotional-design, habit-formation, motivation-theory, nudge-theory, figure-ground, change-blindness, inattentional-blindness, banner-blindness, colour-perception, paradox-of-the-active-user, technology-acceptance-model, learning-and-skill-acquisition, decision-making, bounded-rationality, persuasive-technology, fogg-behavior-model, com-b-model | information-processing-theory, sustained-attention, perceptual-load, cognitive-flexibility, classical-conditioning, operant-conditioning, reinforcement-theory, goal-setting-theory, social-learning-theory, behaviour-change-wheel, hook-model, emotion-and-affect-in-interaction, visual-saliency, depth-perception, pattern-recognition, embodied-interaction, ecological-psychology, cognitive-ergonomics, motor-control | behaviour-change-wheel → com-b-model; reinforcement-theory → operant-conditioning |
| Principles & Heuristics (7/12) | norman-design-principles | iso-9241-110, tognazzini-principles | gerhardt-powals-principles, bastien-scapin-criteria | — |
| UX Research (5/57) | think-aloud-protocol, contextual-inquiry, in-depth-interviews, tree-testing, surveys, research-questions, informed-consent, affinity-mapping, thematic-analysis | research-objectives, research-plans, participant-recruitment, screening-questionnaires, sampling, bias-reduction, research-ethics, research-privacy, personas, scenarios, insight-synthesis, research-readouts, qualitative-coding, data-triangulation, diary-studies, field-studies, observation, stakeholder-interviews, participatory-design, moderated-testing, unmoderated-testing, first-click-testing, concept-testing, comparative-testing, accessibility-testing, product-analytics, benchmark-studies, quantitative-usability-testing, mixed-methods-research, formative-evaluation, summative-evaluation | ethnographic-research, focus-groups, cohort-analysis, eye-tracking, controlled-experiments, guerrilla-testing, wizard-of-oz, research-repositories, evidence-based-decision-making, hypothesis-development, research-protocols, remote-testing | research-objectives → research-questions; qualitative-coding → thematic-analysis; remote-testing → moderated/unmoderated-testing; formative ↔ summative (one hosts the other) |
| Design Methods & Frameworks (2/12) | lean-ux | task-analysis, goms, agile-ux, design-sprint, empathy-mapping, ideation-techniques, workshop-facilitation | addie, kirkpatrick-model | — (goms stays distinct from keystroke-level-model: family vs member) |
| Information Architecture (1/19) | information-scent, information-foraging-theory, findability, navigation-patterns, taxonomies, labelling-systems | hierarchies, metadata, content-modelling, sitemaps, content-inventory, content-audit, search-architecture, faceted-navigation, breadcrumbs, global-navigation, local-navigation | ontologies | global-navigation, local-navigation → navigation-patterns; content-inventory → content-audit |
| Interaction Design (5/23) | feedback-principle, constraints, direct-manipulation, interaction-states, discoverability, form-design, touch-target-size, keyboard-interactions | state-transitions, interaction-cost, platform-design-guidelines, input-methods, touch-interactions, gesture-design, microinteractions, motion-design-principles | haptic-feedback-design, animation-principles | state-transitions → interaction-states; animation-principles → motion-design-principles |
| UI & Visual Design (1/25) | alignment, white-space, grid-systems, visual-contrast | balance, proportion, scale, repetition, information-density, visual-complexity, responsive-composition, iconography, visual-design-principles, graphic-design, information-design | rhythm, unity, variety, golden-ratio, rule-of-thirds, design-aesthetics, shape-language, brand-identity-design | golden-ratio, rule-of-thirds → proportion; emphasis → visual-hierarchy ✓ |
| Typography & Colour (2/27) | typographic-hierarchy, legibility, readability, line-length, colour-models, colour-vision-differences | line-height, font-anatomy, typeface-classification, font-pairing, variable-fonts, perceptual-colour-spaces, colour-theory, colour-harmony, colour-gamut | kerning, tracking, optical-sizing, colour-psychology | rgb, hsl, hsv, cmyk → colour-models; leading → line-height; cie-lab → perceptual-colour-spaces |
| Design Systems (29/29) | — | — | — | — (complete; not rewritten) |
| Accessibility & Inclusive Design (2/34) | pour, semantic-html, keyboard-accessibility, focus-management, aria, screen-readers, inclusive-design, accessible-forms | models-of-disability, universal-design, inclusive-design-principles, accessibility-principles, en-301-549, european-accessibility-act, section-508, non-colour-indicators, reduced-motion, accessibility-audits, captions-and-transcripts, assistive-technologies, cognitive-accessibility, visual-accessibility, motor-accessibility, hearing-accessibility, inclusive-research, inclusive-content | accessible-prototyping, neuroinclusive-design | iso-iec-40500, success-criteria, conformance-levels → wcag ✓; focus-order → focus-management |
| UX Writing & Content Design (0/18) | ux-writing, content-design, plain-language, microcopy, error-messages | form-instructions, onboarding-copy, tone-of-voice, content-design-principles, content-hierarchy, content-strategy, localization, internationalization, terminology-management, readability-formulas, content-governance | conversational-writing | empty-state-writing → empty-states ✓ |
| Product Design & Strategy (1/33) | product-discovery, problem-framing, ux-strategy, prioritisation | opportunity-solution-tree, kano-model, product-vision, product-strategy, okrs, product-roadmaps, user-story-mapping, user-stories, acceptance-criteria, product-requirements, feature-definition, product-experimentation, outcome-metrics, north-star-metric, user-value, business-value, stakeholder-management, competitive-analysis, opportunity-identification, product-market-fit, value-proposition-canvas | market-research, outcome-driven-innovation, product-positioning, business-model-canvas, design-leadership | rice, moscow → prioritisation |
| Service Design & Systems Thinking (0/16) | service-design, customer-journey-mapping, service-blueprints, touchpoints | customer-experience, experience-mapping, stakeholder-maps, systems-thinking, co-design, service-prototyping, service-evaluation, omnichannel-experience, service-ecosystems | ecosystem-maps, organisational-experience | frontstage-and-backstage → service-blueprints |
| Metrics, Formulas & Statistics (7/46) | time-on-task, error-rate, descriptive-statistics, statistical-significance, effect-size | statistical-power, correlation, single-ease-question, umux-lite, questionnaires, learnability, conversion-rate, retention-rate, csat, ces, funnel-conversion, drop-off-rate, aarrr, responsive-breakpoints, aspect-ratios, grid-calculations | regression, bayesian-reasoning, supr-q, user-experience-questionnaire, activation-rate, dau-mau, engagement, feature-adoption, bounce-rate, cohort-retention | margin-of-error → confidence-intervals ✓; p-value → statistical-significance; standard-deviation, variance → descriptive-statistics; churn-rate → retention-rate; effectiveness, efficiency, satisfaction → usability ✓ |
| Data Visualisation (0/17) | graphical-perception, visual-encoding, chart-selection, accessible-charts | data-ink-ratio, chart-integrity, dashboard-design, colour-in-data-visualisation, small-multiples, visualising-uncertainty, data-storytelling, explanatory-visualisation, exploratory-visualisation, data-hierarchy | statistical-graphics, cognitive-load-in-data-visualisation, interaction-in-data-visualisation | — |
| Ethical & Responsible Design (0/14) | ethical-design, deceptive-patterns, consent-design, privacy-by-design | value-sensitive-design, trust, transparency, user-autonomy, responsible-product-design, behaviour-change-design, security-ux, responsible-ai, algorithmic-fairness | sustainable-ux | — |
| Emerging & Specialised (0/31) | human-ai-interaction, ai-ux | explainable-ai, ai-trust, ai-transparency, generative-ai-interfaces, agentic-ai-interfaces, conversational-ux, voice-user-interfaces, chatbot-design, multimodal-interaction, enterprise-ux, b2b-saas-ux, ecommerce-ux, healthcare-ux, educational-ux, learning-experience-design, cross-cultural-ux | augmented-reality, virtual-reality, mixed-reality, spatial-computing, wearable-ux, smart-home-ux, iot-ux, ambient-computing, automotive-ux, fintech-ux, gaming-ux, cscw, design-futures | ai-transparency ↔ explainable-ai (watch) |
| Design Practice & Technical Literacy (0/22) | prototyping, design-critique, design-to-development-handoff | interaction-specifications, design-documentation, stakeholder-communication, design-collaboration, design-ops, research-operations, agile-product-workflows, html-for-designers, css-for-designers, responsive-development, web-performance-for-designers, frontend-accessibility, design-to-code-workflows, dom-and-event-fundamentals | ux-portfolio, javascript-for-designers, ux-engineering, browser-rendering, api-fundamentals | frontend-accessibility ↔ semantic-html (watch) |

Totals (planned topics only): **F ≈ 85** (every one is scheduled in B1–B23), C ≈ 250, S ≈ 90, coveredBy candidates ≈ 40 (each still needs confirmation).

Highest dependency demand among planned topics (top 12; score = links + 2×relations + 3×prerequisite uses + 3×paths + 2×linking domains): information-scent 25, feedback-principle 24, direct-manipulation 22, constraints 21, interaction-states 20, seven-stages-of-action 18, tree-testing 17, contextual-inquiry 16, default-effect 14, statistical-significance 13, service-design 13, think-aloud-protocol 13. 277 of 463 planned topics have no inbound demand yet — expected for empty domains, which is why the G slot exists.

---

## 5. Batch-by-batch execution plan (Phase 1)

Each batch: 3–6 related topics, researched together (shared sources), written one entry at a time. "Assets" are existing labs, workshops and comparisons the batch can attach to — reuse first, build only where noted.

| Cycle | Slot | Batch | Topics | Why now | Reuse / build |
|---|---|---|---|---|---|
| **1** | H | **B1 Interaction feedback & state** | feedback-principle, constraints, direct-manipulation, interaction-states, discoverability | 4 of the top 5 dependency scores; completes the Design Systems path (interaction-states is its last planned step) and most of the Interaction Design path | Reuse feedback-lab, async-state-lab; L2 state diagram for interaction-states |
| 1 | R | **B2 Testing and field research** | think-aloud-protocol, tree-testing, contextual-inquiry, in-depth-interviews | think-aloud completes UX Fundamentals (94 → 100 %) and Usability Engineering (92 → 100 %); tree-testing unlocks the IA path and pairs with card-sorting | Reuse workshop `research-plan`; new comparison: think-aloud concurrent vs retrospective; tree testing vs card sorting |
| 1 | G | **B3 UX writing foundations** | ux-writing, content-design, plain-language, microcopy, error-messages | Empty domain; error-messages is referenced by heuristic 9, error-recovery and error-states; resolves the ux-writing ↔ content-design boundary on the watch list | New comparison ux-writing vs content-design; readability calculator later (Phase 2) |
| *1* | — | *I1 Docs & coverage hygiene* | — | Reconcile docs (§ 1); confirm coveredBy candidates whose host is already published (wcag, confidence-intervals, usability, empty-states, visual-hierarchy) | — |
| **2** | G | **B4 Accessibility in code** | pour, semantic-html, keyboard-accessibility, focus-management, aria | Accessibility 6 %; strong official sources (W3C); Accessibility path stage 2 | Reuse workshop `accessible-component`; L2 annotated focus order |
| 2 | R | **B5 Decision biases** | default-effect, loss-aversion, framing-effect, anchoring-effect, social-proof | Prerequisite chain for Ethics (B7); default-effect scores 14; Cognitive Psychology path stage 3 | Evidence classes matter: replication status stated per effect |
| 2 | H | **B6 Findability** | information-scent, information-foraging-theory, findability, navigation-patterns | Top dependency score; IA 5 % | Reuse workshops `navigation-improvement`, `information-architecture`; Pirolli & Card in registry |
| *2* | — | *I2 Practice & editorial fixes* | 12 practice-developing + 4 editorial-developing entries (§ 7.1) | Cheapest maturity gain | — |
| **3** | G | **B7 Ethics foundations** | ethical-design, deceptive-patterns, consent-design, privacy-by-design | Empty domain; builds on B5 biases | New comparison persuasive vs deceptive design |
| 3 | G | **B8 Service design foundations** | service-design, touchpoints, customer-journey-mapping, service-blueprints | Empty domain; Service Design path is 8 % | Reuse workshop `journey-map`; build L2 template: blueprint swimlanes |
| 3 | H | **B9 Visual composition** | grid-systems, white-space, alignment, visual-contrast | UI & Visual 4 %; UI Fundamentals and Visual Design paths | Reuse responsive-lab (grid-systems); comparison `responsive-vs-adaptive-design` |
| **4** | G | **B10 Data visualisation foundations** | graphical-perception, visual-encoding, preattentive-processing, chart-selection, accessible-charts | Empty domain; preattentive-processing (psychology) is a shared prerequisite | Candidate experiment lab: encoding-accuracy judgement (Cleveland & McGill style) — build only if it measures something real |
| 4 | H | **B11 Measuring usability & inference** | descriptive-statistics, time-on-task, error-rate, statistical-significance, effect-size | Advanced Metrics path 31 %; formulas already in `lib/formulas` | Reuse workshop `usability-metrics-calculation`; extend formula calculators |
| 4 | G | **B12 Product discovery & strategy** | product-discovery, problem-framing, ux-strategy, prioritisation | Product 3 %; Product Design and Product Strategy paths | — |
| *4* | — | *I3 Evidence upgrade* | 10 heuristic/principle entries (§ 7.2) | Primary literature exists; reach Evidence complete honestly | — |
| **5** | G | **B13 Human–AI interaction** | human-ai-interaction, ai-ux, explainable-ai, ai-trust | Empty domain; the /ai pattern library (23 patterns) already exists to link to | AI UX path 17 % |
| 5 | G | **B14 Design practice & handoff** | prototyping, design-critique, design-to-development-handoff, interaction-specifications | Empty domain; connects to Design Systems governance and QA | Reuse workshop `interface-critique` |
| 5 | H | **B15 Design approaches** | human-centred-design, design-thinking, lean-ux, history-of-hci | Long-standing Tier 1 gaps; HCI Fundamentals path | Comparison `design-thinking-vs-lean-ux` already exists, both endpoints planned |
| **6** | H | **B16 Action, attention & Norman's principles** | seven-stages-of-action, conceptual-models, selective-attention, visual-search, norman-design-principles | Score 18 (seven stages); norman-design-principles is a hub over B1 and published entries | L2 cycle diagram |
| 6 | R | **B17 Type for reading** | typographic-hierarchy, legibility, readability, line-length | Type 7 %; UI Fundamentals path | Reuse type-scale-lab (line-length) |
| 6 | R | **B18 Colour models & vision** | colour-models (+ rgb/hsl/hsv/cmyk if confirmed), perceptual-colour-spaces, colour-vision-differences, colour-theory | Reuse colour-lab and cvd-lab, which already exist without entries | — |
| *6* | — | *I4 Visual targets* | Add L2 figures only where § 6 says they teach | — | — |
| **7** | H | **B19 Forms & input** | form-design, accessible-forms, touch-target-size, keyboard-interactions | Cross-domain (Interaction + Accessibility) | Reuse workshop `accessible-form-redesign`; touch-target formula + interactive (WCAG 2.5.8) |
| 7 | R | **B20 Research planning & ethics** | research-questions, informed-consent, research-ethics, surveys | UX Research path stage 1 | Reuse workshop `research-plan` |
| 7 | R | **B21 Research synthesis** | affinity-mapping, thematic-analysis, personas, insight-synthesis | UX Research path stage 3 | — |
| **8** | R | **B22 IA structures** | taxonomies, labelling-systems, hierarchies, content-modelling | IA path stage 1 | — |
| 8 | G | **B23 Inclusion & assistive technology** | inclusive-design, screen-readers, assistive-technologies, models-of-disability | Accessibility path stage 3 | Persona-spectrum exercise |
| *8* | — | *Phase 1 review* | — | § 9 full review; plan Phase 2 batches | New paths (§ 8) |

Empty domains are opened by: Content (cycle 1), Ethics and Service (cycle 3), Data Visualisation (cycle 4), Emerging and Design Practice (cycle 5).

---

## 6. Where learning assets materially help (and where they do not)

Rule: choose the format from what the knowledge is (D-089). Plates stay mandatory (tested); L2 and L3 only where they teach something prose cannot.

| Asset | Use when | Phase 1 candidates | Do not build |
|---|---|---|---|
| **Existing labs without entries** (highest value per effort) | A lab already computes the concept | line-length (type-scale-lab), grid-systems / responsive-composition / grid-calculations (responsive-lab), colour-vision-differences (cvd-lab), hsv / colour-models (colour-lab) | — |
| **New lab / experiment** | A real, computable relationship or a measurable human response | touch-target-size (WCAG 2.5.8 spacing rule); significance / effect size / power simulator on existing formulas; encoding-accuracy experiment for graphical-perception | Labs for frameworks, strategy, ethics or history topics |
| **Formula / calculator** | The topic is a formula | readability-formulas (with its limits stated), statistical-power, margin-of-error (inside confidence-intervals) | — |
| **L2 diagram** | Process, state, structure or comparison that prose struggles with | interaction-states (state diagram), seven-stages-of-action (cycle), service-blueprints (swimlanes, new template), information-foraging (patch model), focus order (annotated) | Decorative diagrams for definitional concepts |
| **Comparison** | Two topics are routinely confused | think-aloud concurrent vs retrospective; tree testing vs card sorting; ux-writing vs content-design; persuasive vs deceptive design; feedback vs visibility of system status | — |
| **Workshop** | Applied, multi-step practice | 6 existing workshops map to B2, B6, B8, B11, B14, B19 — link them | New workshops before their topics exist |
| **Guide / case study** | A framework best learned end to end | Phase 2: "Accessibility from WCAG to code" (after B4, B19, B23); "Usability testing end to end" (after B2, B11, B20) | Guides for single topics |

---

## 7. Existing content improvement backlog

### 7.1 Cheap maturity fixes (I2)
- **Practice → complete (12):** aesthetic-usability-effect, confidence-intervals, doherty-threshold, jakobs-law, mental-models, net-promoter-score, recognition-over-recall, sample-size-estimation, signifiers, steering-law, teslers-law, user-centred-design. Typically: a missing level in the quiz, a second exercise, flashcards.
- **Editorial → complete (4):** doherty-threshold, keystroke-level-model, shneiderman-golden-rules, system-usability-scale — resolve awaiting-verification sources or verification dates.

### 7.2 Evidence upgrade where the literature exists (I3)
aesthetic-and-minimalist-design, consistency-principle, error-prevention, error-recovery, flexibility-and-efficiency-of-use, help-and-documentation, user-control-and-freedom, visibility-of-system-status, mapping, heart-framework — add primary/standard sources already in the registry (Nielsen 1994, Norman 1983/1988/2013, Shneiderman, Rodden et al. 2010) and a stated debate. **Not** targeted: the 28 Design Systems entries rated developing (developing is the honest ceiling; constraint: no rewrite).

### 7.3 coveredBy decisions
- **Host already published — check in I1:** iso-iec-40500, success-criteria, conformance-levels → wcag; margin-of-error → confidence-intervals; effectiveness, efficiency, satisfaction → usability; empty-state-writing → empty-states; emphasis → visual-hierarchy. Apply only where the host entry already explains the topic; otherwise add the explanation to the host (an improvement), not a thin new entry.
- **Host written in Phase 1:** decided in the batch that writes the host (see § 4 column).

### 7.4 Integration of new entries into existing ones
After each batch, add `[[links]]` and `relations` from published entries to the new ones (e.g. visibility-of-system-status → feedback-principle; usability-testing → think-aloud-protocol; error-recovery → error-messages). Links are content edits to existing entries and are part of the batch, not a separate project.

---

## 8. Cross-domain dependencies and learning paths

**Dependency chains that set batch order**

| Upstream (must exist first, or be written in the same batch) | Downstream |
|---|---|
| feedback-principle, constraints, interaction-states (B1) | form-design (B19), error-messages (B3, soft), norman-design-principles (B16) |
| decision biases (B5) | deceptive-patterns, consent-design (B7) |
| preattentive-processing (B10) | graphical-perception, visual-encoding (B10), visual-search (B16) |
| semantic-html, keyboard-accessibility, focus-management (B4) | accessible-forms, keyboard-interactions (B19), accessible-charts (B10, soft) |
| plain-language (B3) | cognitive-accessibility, inclusive-content (Phase 2), readability (B17) |
| think-aloud, tree-testing (B2) | IA path research stage (B6, B22) |
| descriptive-statistics (B11) | statistical-power, correlation (Phase 2) |
| human-centred-design (B15) | co-design, participatory-design, inclusive-design (B23) |

**Path progress Phase 1 should deliver** (from today's generated figures): UX Design Fundamentals 94 → 100 % (B2); Usability Engineering 92 → 100 % (B2); Design Systems 97 → 100 % (B1); Interaction Design 70 → ~95 % (B1, B16); Accessibility 20 → ~75 % (B4, B19, B23); Information Architecture 14 → ~70 % (B2, B6, B22); UX Research 31 → ~90 % (B2, B20, B21); Service Design 8 → ~40 % (B8); AI UX 17 → ~50 % (B13). Figures are projections from the path step lists.

**New paths (created once a domain has ≥ 4 published entries, in the cycle that reaches it):** Content Design (after B3), Responsible Design (after B7), Data Visualisation (after B10), Design Practice & Handoff (after B14). Existing path steps stay planned topics where unwritten (never presented as lessons).

---

## 9. Domain scorecard and review criteria

### 9.1 Scorecard (today)

Stage rule: **Empty** 0 published · **Seeded** < 10 % · **Developing** 10–29 % · **Established** ≥ 30 % with all F published · **Complete** 100 %. Dimension columns are complete / published from the generated coverage.

| Domain | Pub / topics | % | F planned | Stage | Expl | Evid | Prac | Vis | Edit |
|---|---:|---:|---:|---|---|---|---|---|---|
| UX & UI Fundamentals | 6/21 | 29 | 3 | Developing | 6/6 | 6/6 | 5/6 | 1/6 | 6/6 |
| UX Laws & Cognitive Effects | 13/46 | 28 | 3 | Developing | 13/13 | 13/13 | 8/13 | 2/13 | 12/13 |
| Cognition, Behaviour & HF | 7/59 | 12 | 5 | Developing | 7/7 | 7/7 | 4/7 | 1/7 | 7/7 |
| Principles & Heuristics | 7/12 | 58 | 1 | Developing (F gap) | 7/7 | 2/7 | 7/7 | 0/7 | 6/7 |
| UX Research | 5/57 | 9 | 9 | Seeded | 5/5 | 5/5 | 5/5 | 0/5 | 5/5 |
| Design Methods & Frameworks | 2/12 | 17 | 1 | Developing | 2/2 | 2/2 | 2/2 | 0/2 | 1/2 |
| Information Architecture | 1/19 | 5 | 6 | Seeded | 1/1 | 1/1 | 1/1 | 0/1 | 1/1 |
| Interaction Design | 5/23 | 22 | 8 | Developing | 5/5 | 1/5 | 5/5 | 0/5 | 5/5 |
| UI & Visual Design | 1/25 | 4 | 4 | Seeded | 1/1 | 1/1 | 1/1 | 0/1 | 1/1 |
| Typography & Colour | 2/27 | 7 | 6 | Seeded | 2/2 | 2/2 | 2/2 | 0/2 | 2/2 |
| Design Systems | 29/29 | 100 | 0 | Complete | 29/29 | 1/29 | 29/29 | 0/29 | 29/29 |
| Accessibility & Inclusive | 2/34 | 6 | 8 | Seeded | 2/2 | 2/2 | 2/2 | 0/2 | 2/2 |
| UX Writing & Content | 0/18 | 0 | 5 | Empty | — | — | — | — | — |
| Product Design & Strategy | 1/33 | 3 | 4 | Seeded | 1/1 | 1/1 | 1/1 | 0/1 | 1/1 |
| Service Design & Systems | 0/16 | 0 | 4 | Empty | — | — | — | — | — |
| Metrics, Formulas & Stats | 7/46 | 15 | 5 | Developing | 7/7 | 6/7 | 4/7 | 0/7 | 6/7 |
| Data Visualisation | 0/17 | 0 | 4 | Empty | — | — | — | — | — |
| Ethical & Responsible | 0/14 | 0 | 4 | Empty | — | — | — | — | — |
| Emerging & Specialised | 0/31 | 0 | 2 | Empty | — | — | — | — | — |
| Design Practice & Tech Lit. | 0/22 | 0 | 3 | Empty | — | — | — | — | — |

Today: 1 Complete, 0 Established, 7 Developing, 6 Seeded, 6 Empty.

### 9.2 Type-adjusted targets (how the five dimensions are judged)

| Dimension | Target for every new entry | Notes |
|---|---|---|
| Explanation | complete | Already a gate. |
| Practice | complete | ≥ 3 quiz questions across all three levels, ≥ 2 exercises, ≥ 3 flashcards. |
| Editorial | complete | No source awaiting verification at publication. |
| Evidence | complete when the evidence class is original empirical research, peer-reviewed research, established theoretical model or official standard; developing accepted for practitioner recommendation, professional guideline without primary literature, or emerging concept — with an `evidenceNote` that says so | Prevents padding practitioner topics with irrelevant papers. |
| Visual | plate for all (tested); L2 for models, methods, frameworks, processes, standards and comparisons; L3 only for laws, formulas and measurable effects | "Meets its type target" is the measure, not "complete". |

### 9.3 Review checkpoints

**After every batch** (entry-level, blocking): `npm run check`, `test:taxonomy`, `sources:verify` for new sources, `docs:generate`; build plus keyboard/devices/axe suites when UI or figures change; links from existing entries added (§ 7.4); every new entry meets § 9.2 for Explanation, Practice and Editorial.

**After every cycle — balance review** (a short note in `PROGRESS.md`):
1. Domains touched ≥ 3; no domain > 40 % of the cycle's entries; every cluster touched within the last two cycles.
2. Movement: number of Empty and Seeded domains, and empty subcategories (42 today), must not increase and should fall.
3. Quality: zero gate regressions; 100 % of new entries meet their type targets; count of Evidence-developing entries whose class allows complete must not grow.
4. Paths: percentage complete per path; no path regresses.
5. Re-run the dependency analysis; re-rank the next cycle's H slot if demand moved.

**After every second cycle — quality audit:** pick three published entries at random (one older than 30 days) for an editorial re-read against `EDITORIAL_STYLE_GUIDE.md`; `sources:verify --all` for link rot; review coveredBy decisions taken.

**Stop rules:** if a cycle ends with any gate regression, or a batch's entries need more than one rework pass, the next cycle is an improvement cycle (no new topics) until resolved. If a G-slot domain lacks verifiable sources for a foundational topic, swap in the next foundational topic rather than publishing on weak evidence, and record why.

---

## 10. First three batches (cycle 1) — recommendation

### B1 · Interaction feedback & state — slot H (Interaction Design, 5 → 10 published)
- **Topics:** `feedback-principle`, `constraints`, `direct-manipulation`, `interaction-states`, `discoverability`.
- **Rationale:** four of the five highest dependency scores among all planned topics (24, 21, 22, 20); completes the Design Systems path; Interaction Design path 70 % → ~90 %; existing feedback-lab and async-state-lab attach directly.
- **Sources (in registry):** Norman 1988/2013 (`norman-1988`, …), Shneiderman 1983 (`shneiderman-1983`), Hutchins, Hollan & Norman 1985 (`hutchins-hollan-norman-1985`), Harel 1987 statecharts (`harel-1987`). To add and verify: WAI-ARIA 1.2 states, platform state guidance.
- **Boundaries to settle in the batch:** feedback-principle vs visibility-of-system-status (Norman's general principle vs Nielsen's heuristic); interaction-states vs component-state-management (concept vs the system's implementation); `state-transitions` coveredBy decision.

### B2 · Testing and field research — slot R (UX Research, 5 → 9)
- **Topics:** `think-aloud-protocol`, `tree-testing`, `contextual-inquiry`, `in-depth-interviews`.
- **Rationale:** think-aloud alone completes two paths (UX Fundamentals, Usability Engineering); contextual-inquiry is on 3 paths; tree-testing (score 17) is the missing half of the card-sorting / IA evaluation pair.
- **Sources:** in registry — Ericsson & Simon 1993 (`ericsson-simon-1993`), Boren & Ramey 2000 (`boren-ramey-2000`), Beyer & Holtzblatt 1998 (`beyer-holtzblatt-1998`), Spencer 2009 (`spencer-2009`). To find and verify: a primary or authoritative source for tree testing; an interviewing reference (e.g. Portigal, *Interviewing Users*, 2013).
- **Assets:** comparison think-aloud concurrent vs retrospective; link workshop `research-plan`.

### B3 · UX writing foundations — slot G (UX Writing & Content Design, 0 → 5)
- **Topics:** `ux-writing`, `content-design`, `plain-language`, `microcopy`, `error-messages`.
- **Rationale:** opens an empty domain whose topics are already needed by published entries (heuristic 9, error-recovery, error-states, empty-states); resolves the ux-writing ↔ content-design boundary on the watch list in one pass.
- **Sources:** in registry — NN/g error-message guidance (`nng-error-messages`). To add and verify: ISO 24495-1:2023 (plain language — cite, do not reproduce), GOV.UK content design guidance, Richards *Content Design* (2017), Podmajersky *Strategic Writing for UX* (2019).
- **Assets:** comparison ux-writing vs content-design; link to the Nielsen guide's heuristic 9 chapter.

**Alternative considered:** Accessibility in code (B4) instead of B2 in cycle 1. B2 is preferred because it closes two learning paths with one entry and unlocks the IA chain; B4 leads cycle 2 in the G slot.

**Expected after cycle 1 (projection):** 102 published (~18 %), 5 empty domains, three learning paths at 100 %.

---

## 11. Decisions requested

1. Approve balanced development (§ 2) as the primary strategy, superseding `CONTENT_AUDIT.md` § 6 order.
2. Approve the three-slot cycle (H / G / R) and the caps.
3. Approve the type-adjusted targets (§ 9.2) as the measure of maturity (no change to gates or tests).
4. Approve cycle 1 (B1–B3) and I1 (docs reconciliation and published-host coveredBy checks).
5. Optional: a small generator change so `CONTENT_COVERAGE.md` reports "meets type target" per dimension — no change to how entries are rated.
