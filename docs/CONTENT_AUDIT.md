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

## 2. Domain-by-domain review (20 domains, 62 subcategories)

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
| ✅ `human-computer-interaction` | discipline | Card, Moran & Newell 1983 (in registry); Norman & Draper 1986 (in registry); Hewett et al. 1992 ACM SIGCHI Curricula (DOI-verified); Licklider 1960, Grudin 2005, Bødker 2006, Harrison et al. 2011 (DOI-verified) | user-experience, gulfs-of-execution-and-evaluation, keystroke-level-model, fitts-law | Quiz, exercise: place three studies on HCI's history | L2 *process/timeline* of HCI's waves |
| `ui-design` | discipline | Norman 2013 (registry); Shneiderman 2016 (registry); Galitz† (book, bibliographic) | user-experience, visual-hierarchy, design-system, signifiers | Critique exercise of a real screen | L2 *annotated interface* |
| `interaction-design-discipline` | discipline | Cooper et al. *About Face*† ; Preece, Sharp & Rogers *Interaction Design*† | direct-manipulation, feedback, mapping, constraints | Design a feedback loop for an action | L2 *system* (user ⇄ system loop) |
| `accessibility-concept` | concept | W3C WCAG 2.2 (registry); WHO World Report on Disability† ; social model of disability† | wcag, inclusive-design, pour | Audit a screen against 5 criteria | L2 *comparison* |
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
`design-system` (Frost *Atomic Design*†; Curtis 2010†), `atomic-design` (Frost†), `semantic-tokens` (W3C DTCG format, registry), `component-architecture`, `design-governance`. L2: hierarchy (token → component → pattern) and process (contribution model).

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
