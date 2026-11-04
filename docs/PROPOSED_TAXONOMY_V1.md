# UX Academy — Final Domain-Wise Knowledge Taxonomy Blueprint

**Status:** Proposed taxonomy v1.0 for review and controlled implementation  
**Repository:** https://github.com/ahkreddy10268-lang/UX-Academy  
**Source inventory reviewed:** `content/taxonomy.ts`, `docs/KNOWLEDGE_TAXONOMY.md`, `docs/CONTENT_AUDIT.md`, `docs/CONTENT_COVERAGE.md`, `docs/PRODUCT_VISION.md`, and `lib/content/schema.ts`  
**Current inventory:** 20 domains, 62 subcategories, 540 topics; 48 published, 10 addressed within another entry, 482 planned (coverage snapshot dated 2026-11-04).

---

## 1. Taxonomy decisions

1. Retain the existing **20 top-level domains**. They are broad enough for the current UX/UI/HCI learning scope. Do not create a 21st domain just to house each newly discovered topic.
2. Keep all existing domain IDs, subcategory IDs, published entry IDs and canonical slugs unless a migration is explicitly planned and validated. Display-title changes must not break routes or stored progress.
3. Rename the visible title of Domain 3 from **HCI & Psychology** to **Cognition, Behaviour & Human Factors** while preserving its existing ID `psychology`. HCI itself remains a discipline under Domain 1.
4. Preserve one canonical taxonomy home for each topic. Use typed relationships, tags and cross-links for legitimate connections to other domains; never duplicate the same topic under multiple parents just to make it discoverable.
5. Keep research methods in Domain 5, cross-disciplinary design processes/frameworks in Domain 6, product-specific strategy in Domain 14, service design methods in Domain 15, and measurement/statistics in Domain 16.
6. Treat the taxonomy as an expandable, quality-controlled map of the discipline—not a promise to list every possible term, tool, technique, interface pattern or job title.
7. A taxonomy item is not a published lesson. Coverage status must continue to be derived from real content and the existing publication gates.

## 2. Current domain inventory and coverage

Counts below describe the current repository snapshot, before any proposed additions in this document.

| # | Current domain | Topics | Published |
|---:|---|---:|---:|
| 1 | UX & UI Fundamentals | 25 | 4 |
| 2 | UX Laws & Cognitive Effects | 46 | 13 |
| 3 | HCI & Psychology | 59 | 7 |
| 4 | Principles & Heuristics | 13 | 2 |
| 5 | UX Research | 57 | 5 |
| 6 | Methods & Frameworks | 23 | 4 |
| 7 | Information Architecture | 19 | 1 |
| 8 | Interaction Design | 18 | 1 |
| 9 | UI & Visual Design | 24 | 1 |
| 10 | Typography & Colour Science | 25 | 2 |
| 11 | Design Systems | 31 | 1 |
| 12 | Accessibility & Inclusive Design | 29 | 1 |
| 13 | UX Writing & Content Design | 16 | 0 |
| 14 | Product Design & Strategy | 25 | 0 |
| 15 | Service Design & Systems Thinking | 13 | 0 |
| 16 | Metrics, Formulas & Statistics | 43 | 6 |
| 17 | Data Visualisation | 15 | 0 |
| 18 | Ethical & Responsible Design | 14 | 0 |
| 19 | Emerging & Specialised Disciplines | 29 | 0 |
| 20 | Design Practice & Technical Literacy | 16 | 0 |
|  | **Total** | **540** | **48** |

The generated `docs/CONTENT_COVERAGE.md` is the authoritative coverage report. Other documents currently contain some historical/stale counts and should be reconciled through the repository's generation workflow, not edited manually.

---

# 3. Proposed final domain-wise structure

The subcategory headings below describe the intended long-term organisation. Existing subcategories should be retained where they already fit; additions are identified as **[ADD]**. Some existing topics may be re-homed to the most semantically appropriate canonical domain, but that requires slug, route, relation and coverage validation before implementation.

## Domain 1 — UX & UI Fundamentals (`foundations`)

**Purpose:** Core disciplines, definitions, experience qualities and foundational design approaches.

Recommended subcategories:
- Core concepts and disciplines (existing)
- Experience qualities and product value (existing)
- Human-centred and user-centred approaches (existing)
- UX lifecycle and design process foundations (existing)
- History and responsibility (existing)

Canonical topics already include UX, UI Design, Product Design, Interaction Design, Experience Design, usability, utility, usefulness, desirability, feasibility, viability, UX maturity, HCI, UCD, HCD and Design Thinking.

**Boundary:** This is the introductory map of disciplines and foundational concepts. Detailed UI craft belongs in Domain 9; detailed interaction behaviour in Domain 8; product strategy in Domain 14.

## Domain 2 — UX Laws & Cognitive Effects (`laws-effects`)

**Purpose:** Evidence-led human performance laws, perceptual effects, cognitive biases and practitioner maxims.

Recommended subcategories:
- Human performance laws and quantitative models (existing)
- Popular UX principles and rules of thumb (existing)
- Memory and attention effects (existing)
- Gestalt grouping and perceptual organisation (existing)
- Decision-making biases and judgement effects (existing)

Keep the distinction between empirical laws, effects, heuristics, principles and rules of thumb explicit. Do not classify a popular practitioner maxim as a scientific law simply because its name says “law”.

## Domain 3 — Cognition, Behaviour & Human Factors (`psychology`)

**Purpose:** The human capabilities, limitations, motivations and contexts that influence interaction.

Recommended subcategories:
- Cognitive psychology and information processing (existing)
- Memory, attention and learning (expanded)
- Visual perception and cognition (existing)
- Behavioural science and motivation (existing)
- Emotion, affect and experience (expanded)
- Human factors, ergonomics and motor behaviour (existing/expanded)
- Social, situated and distributed cognition (existing/expanded)

**[ADD] High-value gaps:** Emotion and Affect in Interaction; Learning and Skill Acquisition; Motor Control and Human Performance; Social Computing and Collaborative Cognition (or cross-link to the relevant HCI topic if a dedicated entry is not justified).

**Display-title correction:** Rename from “HCI & Psychology” to “Cognition, Behaviour & Human Factors”. Preserve the `psychology` ID. HCI is interdisciplinary and remains a discipline in Domain 1; this domain contains its human-science foundations.

## Domain 4 — Principles & Heuristics (`heuristics`)

**Purpose:** Cross-cutting principles and established heuristic sets used to evaluate and guide design.

Recommended subcategories:
- Usability heuristic sets (existing)
- Cross-cutting interaction and usability principles (existing/expanded)
- General design principles and decision criteria (existing)
- Standards-based interaction principles (existing)

**Boundary correction:** Keep general heuristic sets here. A specific visual-design principle should have its canonical home in Domain 9; an accessibility principle in Domain 12; a content principle in Domain 13; and a specific interaction principle in Domain 8. Link them rather than creating duplicate taxonomy entries.

## Domain 5 — UX Research (`research`)

**Purpose:** Research planning, participant research, empirical methods, synthesis and evaluation.

Recommended subcategories:
- Research foundations, planning and protocols (existing)
- Qualitative research methods (existing)
- Quantitative research methods and instruments (existing)
- Research analysis and synthesis (existing)
- Usability and experience evaluation (existing)
- Research ethics, privacy and participant care (existing)
- Research operations and repository practice (cross-link to Domain 20)

Keep interviews, contextual inquiry, field studies, diary studies, surveys, experiments, participant recruitment, sampling, thematic analysis, affinity mapping, usability tests, card sorting and tree testing here.

## Domain 6 — Design Methods & Frameworks (`frameworks`)

**Purpose:** Cross-disciplinary design processes, facilitation approaches and analytical frameworks that do not belong exclusively to research, product management or service design.

Recommended subcategories:
- Design process frameworks (existing)
- Ideation, facilitation and workshop methods (expanded)
- Cross-disciplinary discovery and problem-framing frameworks (existing)
- Analytical models of interaction and task analysis (existing)
- Mapping and synthesis frameworks (review ownership)
- Measurement and learning frameworks (cross-link to Domain 16 where primarily quantitative)

**Boundary correction:** Product-specific tools such as product roadmaps, product prioritisation, OKRs and product-market fit belong in Domain 14. UX research methods belong in Domain 5. Service blueprints and service journey methods belong in Domain 15. Do not delete existing topics during a move; first validate canonical slugs and references.

## Domain 7 — Information Architecture (`ia`)

**Purpose:** Organising, labelling, structuring, navigating and retrieving information.

Recommended subcategories:
- Information architecture foundations (existing)
- Content structures, taxonomies, ontologies and metadata (existing)
- Navigation systems and wayfinding (existing)
- Search, information scent and findability (existing/expanded)
- Content modelling and governance (cross-link to Domain 13)

**[ADD] Optional gap:** Search Experience Design / Search UX as a dedicated topic only if it can be clearly distinguished from Search Architecture and Information Scent.

## Domain 8 — Interaction Design (`interaction`)

**Purpose:** Designing the behaviour of interactive systems: actions, feedback, state, controls and modalities.

Recommended subcategories:
- Interaction foundations and principles (existing)
- Interaction patterns, controls and forms (expanded)
- Feedback, system status and state transitions (existing)
- Input and output modalities (existing/expanded)
- Motion, animation and microinteractions (existing)
- Haptic and tangible interaction (expanded; cross-link to Domain 19)

**[ADD] High-value gaps:** Form Design; Haptic Feedback Design. Tangible Interaction may be owned here or Domain 19, but must have one canonical home only.

## Domain 9 — UI & Visual Design (`visual`)

**Purpose:** The visual communication, composition and interface presentation of digital products.

Recommended subcategories:
- Visual communication and graphic-design foundations (expanded)
- Composition, hierarchy and Gestalt application (existing)
- Layout, grids, proportion and responsive composition (existing)
- Interface elements, imagery, illustration and iconography (expanded)
- Brand and visual identity systems (expanded)
- Visual aesthetics and art direction (existing/expanded)

**[ADD] High-value gaps:** Graphic Design / Visual Communication; Information Design; Brand Identity Design; Illustration and Art Direction for Interfaces.

**Boundary:** General visual communication belongs here. Quantitative chart construction and statistical visualisation belong in Domain 17. Typography mechanics and colour science belong in Domain 10.

## Domain 10 — Typography & Colour Science (`type-colour`)

**Purpose:** Typography as a reading system and colour as a perceptual, physical and computational system.

Recommended subcategories:
- Typography foundations and anatomy (existing)
- Typographic hierarchy, legibility and readability (existing)
- Type systems, scales and variable typography (existing)
- Colour perception and colour science (existing)
- Colour models and perceptual spaces (existing)
- Colour accessibility, contrast and gamut (existing)

The existing structure is adequate. Avoid expanding it with every font family or colour-picker tool. Those are resources or examples, not necessarily standalone knowledge topics.

## Domain 11 — Design Systems (`design-systems`)

**Purpose:** Reusable design foundations, tokens, components, patterns, governance and adoption.

Recommended subcategories:
- Design-system foundations and architecture (existing)
- Tokens, variables, themes and multi-brand systems (existing)
- Scales and visual foundations (existing)
- Components, variants, states and pattern libraries (existing)
- Documentation, governance and contribution workflows (expanded)
- Adoption, quality assurance and system operations (existing/expanded)

**[ADD] Optional gap:** Design System Adoption and Contribution Model if not already sufficiently covered by governance and operations entries.

## Domain 12 — Accessibility & Inclusive Design (`accessibility`)

**Purpose:** Designing, building, researching and evaluating products for people with varied abilities, needs and contexts.

Recommended subcategories:
- Accessibility foundations and disability models (expanded)
- Standards, legislation and conformance (existing)
- Accessible interaction and implementation techniques (existing)
- Assistive technologies and adaptive interaction (existing)
- Cognitive, visual, auditory and motor accessibility (existing)
- Inclusive design and inclusive research (existing)
- Neuroinclusion and ageing-related access needs (expanded)

**[ADD] High-value gap:** Neuroinclusive Design. Keep it distinct from general cognitive accessibility, and research it carefully rather than treating neurodivergent people as one homogeneous group.

W3C's cognitive-accessibility work demonstrates why accessibility should include readability, predictability, navigability, adaptable presentation and sufficient time—not only assistive devices or physical access. See https://www.w3.org/WAI/cognitive/.

## Domain 13 — UX Writing & Content Design (`content`)

**Purpose:** Designing the words, structure, content behaviour and governance that help people understand and use products.

Recommended subcategories:
- UX writing and interface microcopy (existing)
- Content design and content strategy (expanded)
- Voice, tone, terminology and conversational content (existing/expanded)
- Content structure, models and structured content (cross-link to Domain 7)
- Localization and internationalization (existing)
- Content governance and content operations (existing/expanded)
- Accessible and plain-language content (existing/expanded)

**[ADD] High-value gap:** Content Strategy as a canonical topic, clearly separated from UX Writing and Content Design.

## Domain 14 — Product Design & Strategy (`product`)

**Purpose:** Discovering, defining, prioritising, delivering and improving digital products in relation to user and business outcomes.

Recommended subcategories:
- Product discovery and problem framing (existing)
- Product vision, strategy and positioning (existing)
- Product planning, roadmaps and prioritisation (existing)
- Requirements, stories and acceptance criteria (existing)
- Product experimentation and validation (existing)
- Product outcomes, value and metrics (existing)
- Product operations and stakeholder practice (expanded)

Move or canonically place product-specific frameworks here where appropriate: Jobs To Be Done, Kano, Opportunity Solution Tree, RICE, MoSCoW, OKRs and product-market fit. Keep cross-links from Domain 6.

## Domain 15 — Service Design & Systems Thinking (`service`)

**Purpose:** Designing end-to-end services, ecosystems and experiences across people, channels, organisations and time.

Recommended subcategories:
- Service design foundations and customer experience (expanded)
- Customer journeys and experience maps (existing/expanded)
- Service blueprints and frontstage/backstage systems (existing)
- Stakeholder and ecosystem mapping (existing)
- Omnichannel and cross-channel experiences (existing)
- Systems thinking and system dynamics (expanded)
- Co-design and participatory service design (existing)
- Service prototyping, delivery and evaluation (existing)

**[ADD] High-value gap:** Customer Experience (CX) as a discipline/concept with a clear distinction from UX and Service Design.

## Domain 16 — Metrics, Formulas & Statistics (`metrics`)

**Purpose:** Measuring usability, experience and product outcomes, and interpreting quantitative evidence correctly.

Recommended subcategories:
- UX and usability metrics (existing)
- Research instruments and questionnaires (existing)
- Product and customer metrics (existing)
- Descriptive and inferential statistics (existing)
- Experimental design, statistical power and effect estimation (expanded)
- UX formulas and design calculations (existing)

Keep instrument, metric, formula, statistical concept and method types distinct. A questionnaire is not itself a metric; a p-value is not an effect size; a conversion rate is not proof of causation.

## Domain 17 — Data Visualisation (`dataviz`)

**Purpose:** Representing data accurately and effectively for exploration, communication and decision-making.

Recommended subcategories:
- Perception and graphical encoding (existing)
- Chart forms and visual variables (expanded)
- Dashboard and analytical interface design (existing)
- Interactive and exploratory visualisation (existing)
- Explanatory visualisation and data storytelling (expanded)
- Uncertainty, integrity and ethical visualisation (expanded)
- Accessible data visualisation (existing)

**[ADD] High-value gaps:** Data Storytelling; Visualising Uncertainty. These should be clearly differentiated from general chart selection and chart integrity.

## Domain 18 — Ethical & Responsible Design (`ethics`)

**Purpose:** The ethical, social and environmental responsibilities involved in designing digital systems.

Recommended subcategories:
- Design ethics and professional responsibility (existing)
- Value-sensitive and responsible design frameworks (existing)
- Privacy, consent and data protection (existing)
- Usable security and trust (existing/expanded)
- Persuasion, behaviour change and deceptive patterns (existing)
- Fairness, accountability and responsible AI (existing)
- Autonomy, well-being and humane technology (expanded)
- Sustainability and environmental impact (existing/expanded)

**[ADD] Optional gap:** Digital Well-being / Humane Technology if it is not adequately covered by User Autonomy and Responsible Product Design.

## Domain 19 — Emerging & Specialised Disciplines (`emerging`)

**Purpose:** New interaction paradigms and application specialisms that evolve with technology and society.

Recommended subcategories:
- Human-AI interaction and intelligent systems (existing)
- Conversational UX, dialogue and voice interfaces (existing/expanded)
- Multimodal interaction (existing)
- Spatial computing, AR, VR and MR (existing)
- Tangible, physical and haptic interaction (expanded)
- Wearables, IoT and ambient computing (existing)
- Collaborative computing and CSCW (expanded)
- Domain specialisms: automotive, healthcare, fintech, enterprise, ecommerce, gaming, education and cross-cultural UX (existing)
- Design futures, critical design and speculative design (expanded)

**[ADD] High-value gaps:** Conversation Design; Tangible Interaction (if not canonically owned by Domain 8); Computer-Supported Cooperative Work (CSCW); Speculative Design / Design Futures.

**Optional future topics:** brain-computer interaction, robotics interaction, autonomous systems and other specialised domains. Add only when there is a defensible learning need and reliable source base.

## Domain 20 — Design Practice & Technical Literacy (`practice`)

**Purpose:** Professional design work, collaboration, communication, delivery and the technical knowledge needed to work effectively with engineering.

Recommended subcategories:
- Professional practice, critique and portfolio (existing)
- Collaboration, facilitation and stakeholder communication (existing)
- Design documentation, specifications and handoff (existing)
- Prototyping and design validation practice (existing)
- DesignOps and research operations (existing/expanded)
- Web foundations: HTML, CSS, JavaScript and the DOM (expanded)
- Front-end architecture, browser rendering and web performance (expanded)
- APIs, data and integration fundamentals (existing/expanded)
- Accessibility implementation and design-to-code workflows (existing)

**[ADD] High-value gaps:** JavaScript for Designers; DOM and Event Fundamentals; Web Performance for Designers; UX Engineering / Design Engineering as a practice area.

Do not turn this domain into a catalogue of software products, frameworks or tutorials. Teach transferable technical concepts; tools can be linked as resources.

---

# 4. Priority additions to complete the first taxonomy version

These are the proposed additions with the strongest value for a broad UX Academy. They are not yet present as approved taxonomy changes. Before adding, search for synonyms or existing coverage and avoid duplicates.

| Priority | Proposed topic | Canonical domain | Suggested type |
|---|---|---|---|
| P1 | Customer Experience (CX) | 15 — Service Design | discipline |
| P1 | Graphic Design / Visual Communication | 9 — UI & Visual Design | discipline |
| P1 | Information Design | 9 — UI & Visual Design | discipline |
| P1 | Brand Identity Design | 9 — UI & Visual Design | discipline |
| P1 | Content Strategy | 13 — UX Writing & Content Design | discipline or strategy |
| P1 | Neuroinclusive Design | 12 — Accessibility | concept or framework (research first) |
| P1 | Form Design | 8 — Interaction Design | method or pattern |
| P1 | Haptic Feedback Design | 8 — Interaction Design | concept or technique |
| P1 | Emotion and Affect in Interaction | 3 — Cognition, Behaviour & Human Factors | concept |
| P1 | Learning and Skill Acquisition | 3 — Cognition, Behaviour & Human Factors | theory / concept (split only if justified) |
| P1 | Data Storytelling | 17 — Data Visualisation | technique or concept |
| P1 | Visualising Uncertainty | 17 — Data Visualisation | concept / technique |
| P1 | Conversation Design | 19 — Emerging & Specialised Disciplines | discipline or method |
| P1 | Computer-Supported Cooperative Work (CSCW) | 19 — Emerging & Specialised Disciplines | discipline |
| P1 | Design Futures / Speculative Design | 19 — Emerging & Specialised Disciplines | discipline / methodology |
| P1 | JavaScript for Designers | 20 — Design Practice | concept |
| P1 | DOM and Event Fundamentals | 20 — Design Practice | concept |
| P1 | Web Performance for Designers | 20 — Design Practice | concept |

**P2 / specialist backlog:** Tangible Interaction (unless assigned to Domain 8); gamification and gameful design; mobile UX, web UX and desktop UX as specialisms; digital well-being; design for ageing; collaborative and social computing; BCI and robotics interaction. These should not automatically be added until overlap and educational value are checked.

---

# 5. Ownership rules to prevent overlap

| Subject | Canonical owner | Related domains |
|---|---|---|
| HCI as a discipline | Domain 1 | 3, 5, 8, 19 |
| Cognitive theories and human behaviour | Domain 3 | 2, 8, 12 |
| UX laws and empirical effects | Domain 2 | 3, 8, 9 |
| General usability heuristics | Domain 4 | 8, 9, 12, 13 |
| Research methods | Domain 5 | 6, 15, 16 |
| Cross-disciplinary design process | Domain 6 | 5, 14, 15 |
| Product strategy and prioritisation | Domain 14 | 6, 16 |
| Information organisation and findability | Domain 7 | 13, 8 |
| Interaction behaviour and control patterns | Domain 8 | 3, 9, 12, 19 |
| Visual communication and interface composition | Domain 9 | 10, 17 |
| Typography and colour science | Domain 10 | 9, 12, 17 |
| Design-system architecture | Domain 11 | 9, 10, 20 |
| Accessibility and inclusive practice | Domain 12 | all domains |
| UX writing and content design | Domain 13 | 7, 8, 12 |
| Service and customer experience | Domain 15 | 1, 5, 14 |
| Metrics, formulas and statistics | Domain 16 | 5, 14, 17 |
| Data charts and visual analytics | Domain 17 | 9, 16 |
| Ethical and responsible design | Domain 18 | 12, 14, 19 |
| Emerging modalities and specialisms | Domain 19 | 8, 12, 18 |
| Professional/technical delivery practice | Domain 20 | 8, 11, 12, 14 |

Every topic has one canonical home. Relationships should explain why another domain is relevant; they should not create duplicate taxonomy items.

---

# 6. Classification rules

Use the existing `KnowledgeType` vocabulary in `lib/content/schema.ts`.

- **Discipline:** a field of study or professional practice (e.g. HCI, UX Research, Service Design).
- **Theory:** an explanatory account of phenomena (e.g. Cognitive Load Theory, Activity Theory).
- **Law:** an empirical quantitative regularity with a defined model and conditions (e.g. Fitts's Law).
- **Model:** a structured representation used to explain, analyse or predict (e.g. Working Memory Model, GOMS).
- **Principle:** a general design proposition or value (e.g. Recognition over Recall, Progressive Disclosure).
- **Heuristic:** a practical evaluation rule or checklist (e.g. Nielsen's heuristics).
- **Rule of thumb:** a simplified practitioner maxim that is not a scientific law.
- **Framework:** an organised structure for analysis or action (e.g. Double Diamond).
- **Method / Methodology / Technique:** a research or design procedure, its overall approach, or a specific practical action; choose carefully.
- **Standard / Guideline:** normative requirements or recommendations from an issuing body or platform.
- **Pattern:** a recurring reusable solution to a design problem.
- **Concept:** a distinct idea or construct that does not fit a more specific type.
- **Metric / Formula / Research instrument:** keep measurement constructs, mathematical expressions and instruments distinct.
- **Emerging concept:** use only when the area is genuinely developing and its evidence is not yet settled.

Do not classify software tools, platforms, job titles or course names as knowledge concepts unless there is a clear educational reason.

---

# 7. Governance and completion rules

1. Freeze the 20-domain structure for taxonomy v1.0 after the approved corrections and high-value additions are reviewed.
2. Before adding any topic, search by title, alternate name, synonym and meaning—not just exact slug.
3. Decide whether the subject needs a standalone entry, belongs inside a larger entry, or is simply a glossary term/resource.
4. Use `coveredBy` only when the larger published entry genuinely explains the smaller topic sufficiently. Never use it as a shortcut for an unexplained topic.
5. Use stable slugs. Do not rename a published slug without redirects and relationship migration.
6. Every topic must have a primary type and one canonical domain/subcategory.
7. Add cross-domain relationships only when there is a meaningful conceptual connection.
8. Add a topic to the research roadmap only after identifying credible primary/authoritative sources.
9. Keep emerging topics marked as emerging and revisit them periodically.
10. Update `content/taxonomy.ts`, regenerate `docs/KNOWLEDGE_TAXONOMY.md` and `docs/CONTENT_COVERAGE.md` using project scripts, and run all taxonomy/content tests.
11. Reconcile stale counts in `README.md`, `docs/ROADMAP.md` and `docs/PROGRESS.md` against generated reports.
12. Do not lower content gates to increase the published percentage.

---

# 8. Recommended implementation order

1. **Taxonomy integrity pass:** domain 3 title clarification; domain 4 and 6 ownership boundaries; product/service/measurement framework ownership; duplicate and ambiguous topic audit.
2. **Approve P1 additions:** add only after synonym search and type validation; update the 540 baseline transparently.
3. **Update all generated taxonomy and coverage reports.**
4. **Freeze taxonomy v1.0:** no new top-level domains during the next content expansion cycle unless a real structural gap is proven.
5. **Content expansion:** follow `docs/CONTENT_AUDIT.md` Tier 1 onward, one entry at a time, with verified sources, three learning levels, practice and visuals appropriate to the topic.

The next content priorities already identified in the project roadmap remain: UI Design, Interaction Design, Accessibility and Inclusive Design, Design Thinking and Human-Centred Design. Taxonomy additions should not interrupt that sequence unless the integrity audit discovers a blocking classification issue.

---

# 9. Research basis and external reference points

These references were used to pressure-test the scope, not to copy another organisation's taxonomy:

- ACM/IEEE Computer Science Curricula HCI knowledge areas include HCI foundations, interaction design, interactive-system programming, user-centred design and testing, new interactive technologies, collaboration and communication, statistical methods, human factors and security, and mixed/augmented/virtual reality: https://csed.acm.org/knowledge-areas-human-computer-interaction-hci-cs2013-version/
- Nielsen Norman Group's UX disciplines overview distinguishes UX, UI, visual design, interaction design, service design, research and DesignOps, while noting that boundaries and job titles vary across organisations: https://www.nngroup.com/articles/ux-disciplines-glossary/
- Yale's UX Field Guide groups practice around discovery, planning, building and validation, supporting the inclusion of research, IA, prototyping and validation as connected areas: https://usability.yale.edu/ux/ux-field-guide
- W3C WAI cognitive accessibility resources identify requirements relevant to adaptable presentation, distinguishability, time, navigation, readability and predictability: https://www.w3.org/WAI/cognitive/

These external sources inform coverage decisions. They do not replace primary research for individual knowledge entries.
