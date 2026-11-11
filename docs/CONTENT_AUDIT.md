# Content coverage and depth audit

_2026-11-04. Inventory sources: `docs/CONTENT_COVERAGE.md` and `docs/KNOWLEDGE_TAXONOMY.md` (both generated from `/content` by `npm run docs:generate`). Numbers below are the generated ones._

## 1. Inventory — before and after this audit

| Measure | Before | After |
|---|---:|---:|
| Domains | 20 | 20 |
| Subcategories | 60 | 62 (Data Visualisation and Ethics each split in two) |
| Topics in taxonomy | 515 | 540 (+33 added, −8 merged duplicates) |
| Published entries | 46 | 47 (User Experience written in this audit, see §8) |
| Addressed within another entry (new field `coveredBy`) | — | 10 |
| Planned, no content | 469 | 483 |
| Domains with no published entry | 7 | 7 |
| Coverage (own published entry) | 8.9% | 8.7% |

**Coverage fell slightly.** The audit added important missing topics, and one new entry cannot offset 33 additions. Coverage of the taxonomy is a map of the discipline, not a measure of how much of it is taught.

**Domains with no published entry:** UX Writing & Content Design; Product Design & Strategy; Service Design & Systems Thinking; Data Visualisation; Ethical & Responsible Design; Emerging & Specialised Disciplines; Design Practice & Technical Literacy. No *domain* of the discipline is missing from the taxonomy. These seven are missing *content*.

### Reconciled counts
README.md said "45 published entries + ~470 planned topics". PROGRESS.md and ROADMAP.md carried session-1 figures (45 entries, ≈515 topics, ≈70 subcategories, 633 pages, 250 sources). All three now point to the generated `docs/CONTENT_COVERAGE.md` and state the current figures.

## 2. Domain-by-domain review (20 domains, 62 subcategories — as audited before v1.0; the final structure is § 7)

| Domain | Topics | Published | Assessment |
|---|---:|---:|---|
| UX & UI Fundamentals | 25 | 2 → 3 | The most important gap: UX, UI design, interaction design, HCI, accessibility and design thinking had no entries, although every path starts here. HCI as a discipline was missing (added). |
| UX Laws & Cognitive Effects | 46 | 13 | Best covered. Primacy/recency and the Gestalt sub-laws are explained inside their parent entries (now `coveredBy`); decision biases (0 of 14) need replication-aware entries. |
| HCI & Psychology | 60 | 7 | Strong theory list. Added: Situation Awareness, Technology Acceptance Model, Emotional Design, Paradox of the Active User, Bounded Rationality, Banner Blindness. "Ergonomics" merged into "Human Factors and Ergonomics" (the terms are used synonymously). |
| Principles & Heuristics | 13 | 2 | "Feedback Principles" duplicated psychology's "Feedback" (merged). |
| UX Research | 58 | 5 | The second biggest gap after foundations: interviews, contextual inquiry, think-aloud, surveys, tree testing and synthesis have no entries. Added: Eye Tracking, Mixed-Methods Research, Personas, Scenarios, Wizard of Oz. Merged: Co-design Workshops (→ Participatory Design), Behavioural Analytics (→ Product Analytics). |
| Methods & Frameworks | 23 | 4 | Added Hierarchical Task Analysis, which GOMS and KLM depend on. |
| Information Architecture | 19 | 1 | Information Scent was typed *theory*; the theory is Information Foraging (added); scent is its central *concept* (reclassified). |
| Interaction Design | 18 | 1 | Added Touch Target Size (WCAG 2.5.8 and Fitts) and Platform Design Guidelines. |
| UI & Visual Design | 24 | 1 | "Proximity" duplicated the Gestalt Law of Proximity (merged). |
| Typography & Colour Science | 25 | 2 | Complete as a map; nearly empty of content. |
| Design Systems | 32 | 1 | "Design System" itself was missing (added); "Dashboards" duplicated Data Visualisation's "Dashboard Design" (merged). |
| Accessibility & Inclusive Design | 29 | 1 | Added Section 508, the European Accessibility Act and Captions and Transcripts. |
| UX Writing & Content Design | 16 | 0 | Added Readability Formulas (a formula family with known limits). |
| Product Design & Strategy | 26 | 0 | Added UX Strategy, User Story Mapping, OKRs. |
| Service Design & Systems Thinking | 13 | 0 | Unchanged; content needed. |
| Metrics, Formulas & Statistics | 42 | 6 | Added SEQ, SUPR-Q, UEQ. "Spacing Systems" duplicated Design Systems' "Spacing Scales" (merged); "Responsive Breakpoints" was typed *formula* (reclassified *technique*). |
| Data Visualisation | 15 | 0 | One 13-topic bucket split into *Perception & encoding* and *Chart design & practice*; added Data-Ink Ratio and Small Multiples. |
| Ethical & Responsible Design | 15 | 0 | Split into *Ethical frameworks* and *Privacy, consent & manipulation*; added Value Sensitive Design; "Dark Patterns" renamed "Deceptive Patterns (Dark Patterns)" to match current usage (slug unchanged). |
| Emerging & Specialised | 29 | 0 | Added Learning Experience Design. |
| Design Practice & Technical Literacy | 16 | 0 | "Design Handoff" duplicated Design Systems' "Design-to-Development Handoff" (merged; glossary link retargeted). |

### Overlaps deliberately kept (and why)
- Moderated / unmoderated / remote testing vs Usability Testing are variants with different trade-offs.
- Accessibility Testing (with users) vs Accessibility Audits (expert conformance review) are different methods.
- Typography Scales vs Modular Type Scale are a system-level token set vs a technique.
- Semantic Colour Systems vs Colour Systems: the first is roles (success, warning…), the second palettes. Kept, because a learning path and an entry link to the first.
- Inclusive Design (foundations) vs Inclusive Design Principles: an approach vs a named principle set that WCAG's entry links to.

### Addressed within another entry (10)
Primacy and recency effects → Serial Position Effect. Law of Prägnanz, Proximity, Similarity, Closure, Continuity, Common Region, Common Fate and Uniform Connectedness → Gestalt Principles. The Gestalt entry explicitly argues that the sub-laws are aspects of one process and should not be taught as independent rules, so separate shallow entries would contradict it. They stay in the taxonomy for search and links, count as "addressed within", and never count as published.

## 3. Depth by level (all 46 entries)

The new level checks (`lib/content/completeness.ts`) are met by every entry:
- **beginner:** a stepwise explanation, an analogy or examples, and vocabulary;
- **intermediate:** the mechanism, implementation guidance and a scenario;
- **advanced:** evidence, debates or competing models, and an expert explanation.

These checks are structural; they cannot judge whether an explanation is good. The weaker signals are elsewhere:
- **Practice depth:** 12 entries have no questions at one of the three levels, or fewer than 2 exercises or 3 flashcards (practice maturity "developing").
- **Visual depth:**
  - Level-2 diagrams exist for 7 entries.
  - 16 entries have only a plate: no diagram, explorer, lab or calculator.
  - Only 3 entries (Fitts, Gestalt, Cognitive Load) have all three visual levels.
- **Evidence depth:** 2 entries (Design Tokens, HEART) lack a machine-verified primary source or a second evidence point; both rest on professional or vendor documentation by nature.
- **Editorial:** 4 entries cite a source still marked *awaiting verification* (SUS, KLM, Doherty threshold, Shneiderman's rules).

## 4. Quality gates strengthened

`tests/content.test.ts` now also enforces, for every published entry:
- **Level depth** (nine checks above).
- **A type-specific gate** by knowledge family:

| Family (types) | Must have |
|---|---|
| Quantitative (law, formula, metric, research instrument) | A formula with variables and a worked example |
| Procedural (method, methodology) | Method detail (procedure, participants, duration, outputs) and practical steps |
| Practice (technique, pattern, strategy, tool) | Practical steps |
| Explanatory (theory, model, framework) | Origin and contributors; competing or alternative models |
| Normative (principle, heuristic, guideline, rule of thumb) | Misreadings corrected; origin (who proposed it, on what basis) |
| Standard | Issuer, version, status and official link |
| Phenomenon (concept, bias, emerging concept) | Evidence including replication status; misreadings corrected |
| Discipline | History; scope across at least three contexts |
| All types | A primary or standard source; ≥ 2 limitations; when not to use it; ≥ 3 connections; quiz at ≥ 2 levels |

Plus: every `coveredBy` must point at a published entry. **No word counts anywhere.**

## 5. Maturity (five separate dimensions)
Generated per entry in `docs/CONTENT_COVERAGE.md` as basic / developing / complete for explanation, evidence, practice, visual and editorial (definitions there). These are categorical completeness ratings, not confidence scores.

## 6. Content expansion roadmap

Write in this order. Each entry must pass the gates above, cite only sources that pass `npm run sources:verify` (or are clearly marked bibliographic/awaiting verification), and add a plate. "Source requirements" names the primary literature each entry must rest on; sources marked † are not yet in the registry and must be added and verified first.

### Tier 1 — Foundations (every learning path starts here)
| Entry (slug) | Type | Source requirements | Key relations | Activities | Visual |
|---|---|---|---|---|---|
| ✅ `user-experience` | discipline | ISO 9241-210:2019; Hassenzahl & Tractinsky 2006; Law et al. 2009; Hassenzahl 2004 | usability, ui-design, user-centred-design, aesthetic-usability-effect, peak-end-rule | Quiz ×4 (3 levels), exercises ×3, flashcards ×3 | Plate (written); L2 *system*: before / during / after use around pragmatic and hedonic qualities |
| ✅ `human-computer-interaction` (revised session 9: history, disciplines, human and technology sides, methods, contemporary issues; evidence class `professional-guideline`; no prerequisite) | discipline | Card, Moran & Newell 1983 (in registry); Norman & Draper 1986 (in registry); Hewett et al. 1992 ACM SIGCHI Curricula (DOI-verified); Licklider 1960, Grudin 2005, Bødker 2006, Harrison et al. 2011 (DOI-verified) | user-experience, gulfs-of-execution-and-evaluation, keystroke-level-model, fitts-law | Quiz, exercise: place three studies on HCI's history | L2 *process/timeline* of HCI's waves |
| ✅ `ui-design` (session 15) | discipline | Norman 2013 (registry); Shneiderman 2016 (registry); Galitz 2007 (added: bibliographic, ISBN, publisher URL reachable) | user-experience, visual-hierarchy, design-system, signifiers (+12 more) | Quiz ×9 (3 per level), exercises ×3 incl. a real-screen critique, flashcards ×7 | Plate (user, task, interface, system, context); L2 *annotated interface* (fictional study-room booking screen, 7 decisions); no L3 (D-075) |
| ✅ `interaction-design-discipline` (session 16) | discipline | Cooper, Reimann, Cronin & Noessel 2014 *About Face* 4th ed. (added); Rogers, Sharp & Preece 2023 *Interaction Design* 6th ed. (added); both bibliographic, ISBN, publisher URL reachable | direct-manipulation, feedback-principle, mapping, constraints (+20 more) | Quiz ×9 (3 per level), exercises ×3 incl. the payment feedback-loop exercise, flashcards ×8 | Plate (person ⇄ system loop); L2 *system* (user ⇄ system loop, failure point); no L3 (D-078) |
| ✅ `accessibility-concept` (session 18) | concept | WCAG 2.2 and companions (registry); WHO World Report on Disability 2011, UPIAS & Disability Alliance 1976 (read first-hand), Oliver 1983 (DOI-verified), WHO ICF 2001, UN CRPD 2006 (text read first-hand), WHO Global Report on Health Equity 2022 (all added) | wcag, inclusive-design, pour (+21 more) | Quiz ×9 (3 per level), exercises ×4 incl. the five-criteria screen audit, flashcards ×8 | Plate (barriers, supports, participation); L2 *comparison* (medical, social, ICF + separate CRPD rights lens); no L3 (D-082) |
| `inclusive-design` | concept | Microsoft Inclusive Design toolkit† (professional); Clarkson et al. *Inclusive Design*† | accessibility-concept, universal-design, personas | Persona-spectrum exercise | L2 *conceptual* (permanent / temporary / situational) |
| `design-thinking` | framework | Brown 2008 HBR† ; Buchanan 1992 "Wicked problems"† (DOI to verify) | double-diamond, user-centred-design, lean-ux | Compare with Double Diamond | L2 *process cycle* |
| `human-centred-design` | framework | ISO 9241-210:2019 (registry) | user-centred-design (contrast: stakeholders beyond users) | Stakeholder exercise | Plate exists; L2 *system* |

### Tier 2 — UI and interaction design
`feedback` and `visibility-of-system-status` (Norman 2013; Nielsen 1994): L2 annotated interface. `constraints` and `mapping` (Norman 2013): comparison. `direct-manipulation` (Shneiderman 1983, in registry): comparison. `error-prevention` (Norman 1983 "Design rules based on analyses of human error"†): decision tree. `touch-target-size` (WCAG 2.5.5/2.5.8; Parhi, Karlson & Bederson 2006†): formula + interactive. `grid-systems` (Müller-Brockmann†, bibliographic): annotated interface. `typographic-hierarchy` and `legibility` (Beier†; Dyson 2004†): comparison.

### Tier 3 — UX research
`in-depth-interviews` and `contextual-inquiry` (Beyer & Holtzblatt 1998†): process. `think-aloud-protocol` (Ericsson & Simon 1993, registry; Boren & Ramey 2000, registry): comparison of concurrent vs retrospective. `surveys` (Krosnick 1999†): decision tree. `tree-testing` (relation to card sorting): process. `thematic-analysis` (Braun & Clarke 2006†, DOI to verify): process. `affinity-mapping`: process. `research-ethics` and `informed-consent` (Belmont Report†; BPS/ESOMAR codes†): decision tree. `personas` (Cooper 1999†; Pruitt & Grudin 2003†; critique by Chapman & Milham 2006†): annotated + limitations.

### Tier 4 — Information architecture
`information-foraging-theory` (Pirolli & Card 1999, registry): conceptual. `information-scent` (Chi, Pirolli et al. 2001†): annotated interface. `taxonomies` and `labelling-systems` (Rosenfeld et al. 2015, registry; Furnas et al. 1987, registry): hierarchy. `navigation-patterns` and `faceted-navigation` (Hearst 2006†): annotated interface.

### Tier 5 — Design systems
✅ `design-system` (session 22: GOV.UK Design System, Carbon, USWDS (added), Adobe Spectrum (added), Frost 2016 (registry), Kholmatova 2017 and Curtis 2009 (added, scope only), Semantic Versioning 2.0.0 (added); quiz ×9, exercises ×4, flashcards ×10; plate + two L2 figures; no L3, D-095), `atomic-design` (Frost, registry), ✅ `semantic-tokens` and ✅ `primitive-tokens` (session 28, Batch 1: DTCG Format, Color and Resolver 2025.10 (Color and Resolver added), WCAG 2.2 SC 1.4.1/1.4.3/1.4.11, Fluent 2, Material 3, Carbon, Atlassian, USWDS page records (added); practice block with DTCG JSON tier and resolver examples; plates; D-113–D-114), `component-architecture`, `design-governance`. L2: hierarchy (token → component → pattern) and process (contribution model).

### Tier 6 — Accessibility
`pour`, `keyboard-accessibility`, `focus-management`, `semantic-html`, `aria` (W3C WAI-ARIA 1.2†, APG†), `screen-readers` (WebAIM screen reader survey†), `accessible-forms`, `en-301-549` (ETSI†), `european-accessibility-act` (Directive (EU) 2019/882†, EUR-Lex). L2: hierarchy (WCAG structure), annotated interface (focus order).

### Tier 7 — Product and service design
`service-design` and `service-blueprints` (Shostack 1984 HBR†; Bitner et al. 2008†, DOI to verify), `customer-journey-mapping`, `product-discovery`, `kano-model` (Kano et al. 1984†), `okrs`, `ux-strategy`. L2: journey/swimlane template (to build: service blueprint lanes).

### Tier 8 — Data visualisation
`graphical-perception` (Cleveland & McGill 1984†, DOI to verify), `visual-encoding` (Mackinlay 1986†; Munzner 2014†), `chart-integrity` (Tufte 1983†), `data-ink-ratio` (Tufte 1983†, with the critique by Inbar et al. 2007†), `accessible-charts`. L2: comparison, formula (ranking of encodings) and interactive.

### Tier 9 — Ethics
`deceptive-patterns` (Brignull†; Mathur et al. 2019 CSCW†; Gray et al. 2018 CHI†), `value-sensitive-design` (Friedman & Hendry 2019†), `privacy-by-design` (Cavoukian 2009†), `consent-design`. L2: comparison (manipulative vs persuasive) and decision tree.

### Tier 10 — Emerging disciplines
`human-ai-interaction-guidelines` (Amershi et al. 2019 CHI†, DOI to verify), `explainable-ai`, `calibrated-trust-in-ai` (Lee & See 2004†), `conversational-ux`, `learning-experience-design`. L2: system diagrams.

### Rules for expansion
- One entry at a time, with sources verified first. No placeholder or partially filled entries.
- Never publish an entry that fails a gate. Never mark a planned topic as published.
- Prefer deepening thin dimensions of existing entries (practice at all three levels, verified primary sources) over adding breadth when both compete for time.
- Re-run `npm run docs:generate` after each entry; the coverage and maturity tables are the progress report.

## 7. Taxonomy v1.0 — frozen structure (session 14)

Source proposal: `docs/PROPOSED_TAXONOMY_V1.md` (the owner's blueprint, kept verbatim). This section records what was adopted, changed or rejected after checking it against the repository; the full topic lists are generated in `docs/KNOWLEDGE_TAXONOMY.md` and the counts in `docs/CONTENT_COVERAGE.md`.

### 7.1 Audit of the starting state (recalculated, not assumed)

20 domains, 62 subcategories, 540 topics (540 unique slugs, no duplicate slugs), 48 published entries, 10 addressed-within, 482 planned, 7 domains without a published entry. Metadata between taxonomy and the 48 entries was consistent. Problems found:

- **Ownership violations.** Product frameworks sat in Design Methods (JTBD, Kano, OST, RICE, MoSCoW, business model and value proposition canvases); journey maps sat there too; HEART and AARRR were measurement frameworks outside Metrics; accessibility and inclusive design were introduced under Foundations; ethics foundations under Foundations; Norman's feedback, constraints and mapping under Psychology; error prevention and content/visual/accessibility principle "families" under Principles; colour theory under Visual Design; questionnaires and SUS/NASA-TLX mixed with metrics.
- **Semantic duplicates (planned topics, no content).** Form architecture / form design; voice interactions / voice user interfaces; semantic colour systems / colour systems; design ethics foundations / ethical design; design responsibilities / responsible product design.
- **Misclassification.** Research repositories, screen readers and assistive technologies were typed `tool`.
- **Structure.** Domain 3's title put HCI inside Psychology; Design Methods was a catch-all with five subcategories of which two were product and measurement; several domains lacked the subcategories needed for emotion, learning, forms, search, requirements, instruments, experimental design, storytelling and web engineering.

### 7.2 Result

| # | Domain (id) | Subcategories | Topics | Published |
|---:|---|---:|---:|---:|
| 1 | UX & UI Fundamentals (`foundations`) | 3 → 3 | 25 → 21 | 4 |
| 2 | UX Laws & Cognitive Effects (`laws-effects`) | 5 → 5 | 46 → 46 | 13 |
| 3 | Cognition, Behaviour & Human Factors (`psychology`) | 4 → 4 | 59 → 59 | 7 |
| 4 | Principles & Heuristics (`heuristics`) | 2 → 1 | 13 → 9 | 2 |
| 5 | UX Research (`research`) | 5 → 6 | 57 → 57 | 5 |
| 6 | Design Methods & Frameworks (`frameworks`) | 5 → 3 | 23 → 12 | 2 |
| 7 | Information Architecture (`ia`) | 3 → 4 | 19 → 19 | 1 |
| 8 | Interaction Design (`interaction`) | 3 → 4 | 18 → 23 | 1 |
| 9 | UI & Visual Design (`visual`) | 3 → 4 | 24 → 25 | 1 |
| 10 | Typography & Colour Science (`type-colour`) | 2 → 3 | 25 → 27 | 2 |
| 11 | Design Systems (`design-systems`) | 4 → 4 | 31 → 29 | 1 |
| 12 | Accessibility & Inclusive Design (`accessibility`) | 3 → 4 | 29 → 34 | 1 |
| 13 | UX Writing & Content Design (`content`) | 2 → 2 | 16 → 18 | 0 |
| 14 | Product Design & Strategy (`product`) | 3 → 5 | 25 → 33 | 1 |
| 15 | Service Design & Systems Thinking (`service`) | 2 → 3 | 13 → 16 | 0 |
| 16 | Metrics, Formulas & Statistics (`metrics`) | 4 → 6 | 43 → 46 | 7 |
| 17 | Data Visualisation (`dataviz`) | 2 → 3 | 15 → 17 | 0 |
| 18 | Ethical & Responsible Design (`ethics`) | 2 → 2 | 14 → 14 | 0 |
| 19 | Emerging & Specialised Disciplines (`emerging`) | 3 → 3 | 29 → 31 | 0 |
| 20 | Design Practice & Technical Literacy (`practice`) | 2 → 4 | 16 → 22 | 0 |

Totals: **20 domains, 73 subcategories, 558 topics** (540 + 23 added − 5 merged away). 48 published, 10 addressed within, 500 planned. Published share fell from 8.9% to 8.6% only because the denominator grew; no published entry was lost, and Product & Strategy gained its first published entry (JTBD) by an ownership move.

Domain 4 is deliberately compact (9 topics, one subcategory): the blueprint's own boundary rule moves subject-specific principles to their owning domains, and the two cross-cutting principles that remain fit the heuristic-set subcategory.

### 7.3 Display titles (IDs unchanged)

- Domain 3 (`psychology`): **Cognition, Behaviour & Human Factors**, short title "Cognition". HCI remains a Domain 1 discipline.
- Domain 6 (`frameworks`): **Design Methods & Frameworks**, short title "Design methods" — adopted: the old title invited research methods, product frameworks and service methods, which now live in Domains 5, 14 and 15.

### 7.4 The 18 priority candidates

| Candidate | Decision | Canonical slug · type · home | Reason |
|---|---|---|---|
| Customer Experience (CX) | Add | `customer-experience` · discipline · 15 / service design foundations | Not covered by service design or UX; distinct unit (the customer's cumulative relationship) |
| Graphic Design / Visual Communication | Add | `graphic-design` · discipline · 9 / foundations | The parent discipline of visual design |
| Information Design | Add | `information-design` · discipline · 9 / foundations | Distinct from IA (Domain 7) and data visualisation (Domain 17) |
| Brand Identity Design | Add | `brand-identity-design` · discipline · 9 / foundations | Missing; needed for visual systems and logo work |
| Content Strategy | Add | `content-strategy` · discipline · 13 / content systems | Separate from content design (practice) and governance (rules) |
| Neuroinclusive Design | Add (research first) | `neuroinclusive-design` · concept · 12 / access needs | Distinct from cognitive accessibility; must not treat neurodivergent people as one group |
| Form Design | Add, merging `form-architecture` | `form-design` · technique · 8 / patterns | One canonical home for form design; `accessible-forms` (12) and `form-instructions` (13) stay separate |
| Haptic Feedback Design | Add | `haptic-feedback-design` · technique · 8 / modalities | Feedback modality; tangible interaction stays in the P2 backlog (one home, Domain 19) |
| Emotion and Affect in Interaction | Add | `emotion-and-affect-in-interaction` · concept · 3 / behavioural | Broader than `emotional-design` (Norman's model), which is related, not duplicated |
| Learning and Skill Acquisition | Add (not split) | `learning-and-skill-acquisition` · concept · 3 / cognitive | `power-law-of-practice` stays a law in Domain 2 |
| Data Storytelling | Add | `data-storytelling` · technique · 17 / integrity | Distinct from chart selection |
| Visualising Uncertainty | Add | `visualising-uncertainty` · technique · 17 / integrity | Distinct from chart integrity and statistics |
| Conversation Design | **Alias, not added** | alias of `conversational-ux` (also "Dialogue Design") | The two names denote the same discipline; a second topic would fragment it |
| CSCW | Add | `cscw` · discipline · 19 / specialist disciplines | Recognised field; social computing deferred to the backlog |
| Design Futures / Speculative Design | Add | `design-futures` · discipline · 19 / specialist disciplines | Recognised practice area with its own literature |
| JavaScript for Designers | Add | `javascript-for-designers` · concept · 20 / web foundations | Transferable concept, not a tutorial |
| DOM and Event Fundamentals | Add | `dom-and-event-fundamentals` · concept · 20 / web foundations | As above |
| Web Performance for Designers | Add | `web-performance-for-designers` · concept · 20 / engineering | As above |

17 added, 1 alias. Types were chosen from the existing schema only; the blueprint's suggestions were revised where they were too coarse (Form Design: technique, not "method or pattern"; Conversation Design: no new type needed).

### 7.5 Further gap analysis (six additions beyond the 18)

`models-of-disability` (concept, 12): the social and medical models are the base of the accessibility entry and were missing. `motor-control` (concept, 3): speed–accuracy and motor behaviour underlie Fitts's law and input design. `controlled-experiments` (method, 5): HCI and UX research's core quantitative method had no topic. `ideation-techniques` and `workshop-facilitation` (technique, 6): the repaired Design Methods domain needed ideation and facilitation, which `content/workshops.ts` already teaches. `ux-engineering` (discipline, 20; alias "Design Engineering"): a named practice area in the blueprint's own Domain 20 text.

### 7.6 Merges, moves and reclassifications

- **Merged (slug removed, alias kept, no content or links lost):** `form-architecture` → `form-design`; `voice-interactions` → `voice-user-interfaces`; `semantic-colour-systems` → `colour-systems` (one relation and one learning-path step retargeted); `design-ethics-foundations` → `ethical-design`; `design-responsibilities` → `responsible-product-design`.
- **Re-homed (slug and route unchanged), published:** `jobs-to-be-done` (6→14), `heart-framework` (6→16), `colour-contrast-ratio` (10, colour → colour in design), `system-usability-scale` and `nasa-tlx` (16, metrics → instruments), `sample-size-estimation` (16, statistics → experimental design). Each entry's `domain` and `subcategory` fields were updated to match; the existing consistency tests pass. Their subject colour follows the new domain.
- **Re-homed, planned:** accessibility and inclusion topics to 12; interaction principles and states to 8; product frameworks and prioritisation to 14; journey and blueprint mapping to 15; questionnaires and instruments to 16; colour theory topics to 10; DesignOps and operations to 20; IA search topics to a findability subcategory; storytelling, uncertainty and integrity to one subcategory in 17.
- **Reclassified:** `research-repositories`, `screen-readers`, `assistive-technologies`: `tool` → `concept`. No `tool` topics remain (tested).
- **Subcategories:** 14 added, 3 removed (`frameworks/strategy`, `frameworks/measurement`, `heuristics/principle-families`), none holding published entries after the moves. Every subcategory has at least two topics (tested).

### 7.7 Kept distinct, watched (resolve when the entries are written)

`typography-scales` / `modular-type-scale`; `icon-systems` / `iconography`; `accessibility-testing` / `accessibility-audits`; `participatory-design` / `co-design`; `ai-ux` / `human-ai-interaction`; `enterprise-ux` / `b2b-saas-ux`; `educational-ux` / `learning-experience-design`; `design-to-development-handoff` / `design-to-code-workflows`; `inclusive-design` / `inclusive-design-principles` / `universal-design`; `colour-perception` / `colour-theory`; `ethical-design` / `responsible-product-design` / `value-sensitive-design`; `frontend-accessibility` / ARIA and semantic HTML. Each pair has a different scope today; if a researched entry cannot keep them apart, merge by alias.

### 7.8 Ownership rules (final)

One canonical home per topic; other domains link with typed relations. Owners: HCI discipline → 1; human capability and behaviour theory → 3; empirical laws and effects → 2; general heuristic sets → 4; research methods, instruments of method and ethics → 5; cross-disciplinary design process, ideation and analytical models → 6; information organisation and findability → 7; interaction behaviour, controls, forms and feedback → 8; visual communication and composition → 9; typography and colour science → 10; design-system architecture → 11; accessibility and inclusive practice → 12; UX writing and content → 13; product strategy, discovery, prioritisation, requirements → 14; service and customer experience, journeys, blueprints → 15; metrics, questionnaires, formulas, statistics → 16; charts and analytical visualisation → 17; ethical and responsible design → 18; emerging modalities and specialisms → 19; professional and technical delivery, DesignOps → 20.

### 7.9 Deferred and rejected

See `docs/TAXONOMY_BACKLOG.md` (P2 specialist backlog, optional topics, rejected candidates and their reasons).

### 7.10 Freeze

Taxonomy v1.0 is frozen: no new top-level domains during the next content cycle; changes follow `docs/CONTENT_MODEL.md` § Taxonomy governance and are recorded here.
