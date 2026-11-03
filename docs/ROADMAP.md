# Roadmap

## Stage status

| Stage | Status |
|---|---|
| 0 Environment & preparation | ✅ done |
| 1 Product & technical architecture | ✅ done (docs/) |
| 2 Design system & frontend foundation | ✅ done |
| 3 Taxonomy & database | ✅ 20 domains, ≈515 topics, coverage register |
| 4 Initial research & content | ✅ 45 published entries (target was 25–40) · 250 sources · 147 DOIs verified |
| 5 Interactive features | ✅ search, filters, graph, Formula Lab (25), labs (10), quizzes, flashcards, workshops, comparisons, glossary, paths, My learning |
| 6 Testing & verification | ✅ unit + content tests, browser crawl, e2e, axe audit |
| 7 Long-term expansion | ▶ ongoing — below |

## Next content (priority order — fill subjects with the lowest coverage first, foundational topics first)

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

- Interactive labs still to build from the spec: responsive layout simulator (viewport-driven grid), Steering law tunnel experiment, colour-vision-deficiency simulation in the contrast lab.
- Case studies as a content type (schema exists in the knowledge type list; needs a template).
- Learning-path completion certificates/progress export; streak-free revision reminders (calendar export of due cards).
- Graph: keyboard navigation between nodes; clustering by subject.
- "Compare any two entries" generic view.
- Source discovery workflow: per-domain research checklist pages driven by the registry.
- Offline support (PWA) for a fully local academy.

## Known issues

- Unknown `/library/<slug>` URLs render the not-found page with HTTP 200 (Cache Components + streaming; `dynamicParams` is not allowed). Harmless for a personal static app.
- Eight URLs block automated verification (ISO, ACM DL, some publisher pages); records are bibliographic and labelled so.
- `brooke-2013`, `doherty-thadani-1982`, `kieras-2001-klm`, `shneiderman-golden-rules-page` are marked awaiting verification.
- Charts were reviewed for colour-only encoding and alt text, but the dataviz skill's full review was not run.
