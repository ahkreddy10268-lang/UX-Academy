# Roadmap

## Stage status

| Stage | Status |
|---|---|
| 0 Environment & preparation | ✅ done |
| 1 Product & technical architecture | ✅ done (docs/) |
| 2 Design system & frontend foundation | ✅ done |
| 3 Taxonomy & database | ✅ Taxonomy v1.0 frozen: 20 domains, 73 subcategories, 558 topics (docs/CONTENT_AUDIT.md § 7) |
| 4 Initial research & content | ✅ 50 published entries · figures from the generated docs/CONTENT_COVERAGE.md and RESEARCH_SOURCES.md; not repeated here |
| 5 Interactive features | ✅ search, filters, graph, Formula Lab (25), labs (10), quizzes, flashcards, workshops, comparisons, glossary, paths, My learning |
| 6 Testing & verification | ✅ unit + content tests, browser crawl, e2e, axe audit |
| 7 Long-term expansion | ▶ ongoing — below |
| v3 Pastel Editorial Workspace | ✅ implemented and verified, uncommitted pending authorisation |

## Next content

**The authoritative, entry-by-entry expansion plan is `docs/CONTENT_AUDIT.md` §6** (ten tiers: foundations → UI/interaction → research → IA → design systems → accessibility → product & service → data visualisation → ethics → emerging), with source requirements, relations, activities and visual type for each entry. Coverage is 50 of 558 topics (9.0%) after `interaction-design-discipline`; six domains have no published entry. Owner priority (session 9): knowledge completeness and educational quality come first; visual work only where it solves a usability, accessibility or educational problem. The list below is the earlier, superseded ordering, kept for history.

### Earlier ordering (superseded)

1. **Foundations gaps**: user-experience, ui-design, design-thinking, accessibility-concept, inclusive-design, history-of-hci.
2. **Interaction**: feedback-principle, visibility-of-system-status, error-prevention, direct-manipulation, constraints, mapping, microinteractions.
3. **Research methods**: think-aloud-protocol, contextual-inquiry, in-depth-interviews, surveys, tree-testing, diary-studies, thematic-analysis, affinity-mapping, research-ethics.
4. **Accessibility techniques**: pour, keyboard-accessibility, focus-management, semantic-html, aria, screen-readers, accessible-forms, en-301-549, iso-iec-40500.
5. **IA**: information-scent, taxonomies, navigation-patterns, findability, labelling-systems.
6. **Metrics as full entries** (formula specs exist): umux-lite, time-on-task, error-rate, conversion-rate, retention-rate, effect-size, statistical-significance, p-value.
7. **Decision biases**: default-effect, loss-aversion, anchoring-effect, framing-effect, social-proof — each with replication status.
8. **Ethics**: deceptive-patterns, persuasive-technology, privacy-by-design (persuasion vs manipulation).
9. **Design systems**: atomic-design, semantic-tokens, component-architecture, design-governance (comparative study of Material, Fluent, Carbon, Atlassian, GOV.UK, Apple HIG).
10. **AI UX**: human-ai-interaction (Amershi et al. 2019, PAIR), explainable-ai, ai-trust, agentic-ai-interfaces.
11. **Service design & product strategy** clusters.

## Features

- ✅ Session 5 shipped the colour (HSV) explorer and the Jakob's law position experiment, plus Level-2 visuals for UCD, Gestalt and Heuristic Evaluation (7 concepts with detailed diagrams).
- ✅ v3 shipped the steering-law tunnel experiment and the colour-vision-deficiency simulator (Machado et al. 2009). Next lab ideas: anomalous-trichromacy severities (needs the paper's tabulated matrices — do not interpolate), curved-tunnel steering, an ISO 9241-411 throughput task.
- Explorers for more concepts (progressive disclosure inline, typography hierarchy). Jakob's law and colour HSV are done.
- Level-2 explanations next: cognitive walkthrough, peak-end rule, WCAG structure, then one per remaining published entry where a diagram explains something words do not.
- Testing: real screen readers (VoiceOver, NVDA) and physical devices; a WebKit emulation pass.
- Plates for planned topics as their entries are written (tests require a plate for every published entry).
- Case studies as a content type (schema exists in the knowledge type list; needs a template).
- Learning-path completion certificates/progress export; streak-free revision reminders (calendar export of due cards).
- Graph: keyboard navigation between nodes; clustering by subject.
- "Compare any two entries" generic view.
- Source discovery workflow: per-domain research checklist pages driven by the registry.
- Offline support (PWA) for a fully local academy.

## Known issues

- Screen-reader and physical-device testing not yet done (cloud container has neither); keyboard, accessibility-tree and device-emulation suites pass.
- On phones the lesson progress rail is a static indicator (segments too narrow to tap); navigation is by Previous/Next.

- v3: the owner's dashboard reference images were not available; the v3 look follows the written brief and should be checked against the images.
- v3: the library subject/type chip rows scroll horizontally on narrow widths — fine for touch, less discoverable with a mouse (consider wrapping at ≥1280px).
- v3: the steering lab has no keyboard equivalent (inherent to a steering task); the lab says so.
- v3: the coverage and sources stat strips still use the v2 inline-stat style (functional, less pastel).

- Unknown slugs under dynamic routes (`/library/x`, `/labs/x`, `/learn/x`, …) render the not-found page but with HTTP 200 (Cache Components + streaming; `dynamicParams` is not allowed). Paths matching no route return 404. Verified 2026-11-03; harmless for a personal static app.
- Eight URLs block automated verification (ISO, ACM DL, some publisher pages); records are bibliographic and labelled so.
- `brooke-2013`, `doherty-thadani-1982`, `kieras-2001-klm`, `shneiderman-golden-rules-page` are marked awaiting verification.
- Charts and plates were reviewed for colour-only encoding and text alternatives manually and with axe; no assistive-technology testing yet.
