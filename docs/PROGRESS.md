# Progress register

_Last updated: 2026-11-03 (session 1)_

## State

First meaningful release is complete and verified. All Definition-of-Done items (spec Part 22) are implemented; see "Verified" for evidence.

| Area | Count |
|---|---|
| Published knowledge entries (all quality gates pass) | 45 |
| Taxonomy topics (domains / subcategories) | ≈515 (20 / ≈70) |
| Explained graph relationships | 331 |
| Formulas with unit-tested calculators | 25 |
| Interactive labs | 10 |
| Quiz questions / exercises / flashcards | 158 / 124 / 128 |
| Workshops / comparisons / learning paths / glossary | 11 / 10 / 16 / 114 |
| Sources (DOI-verified / URL-reachable) | 250 (147 / 69) |
| Prerendered pages | 633 |

## Completed this session

- Scaffold: Next.js 16.4 (Cache Components), TypeScript strict, Tailwind v4, Vitest, MiniSearch, zod.
- Content schema, taxonomy, source registry + Crossref verification script, content loader, rich-text tokenizer, graph derivation, coverage register.
- Design system ("rubric" editorial language) with light/dark tokens; app shell, header/mobile menu, footer, ⌘K search dialog, theme toggle.
- Pages: home, library (search/filters/A–Z), entry (3-level tabs, formula, method, standard, origin, application, use/limits, connections, practice, evidence, notes), planned-topic, topics, Formula Lab, labs, practice (quiz builder, flashcards, workshops), compare, graph, glossary, sources, coverage, learn, my learning, method, 404.
- Personal workspace: bookmarks, completion, per-level reading progress, notes (autosave, Markdown export), quiz history, Leitner flashcards, saved calculations, research collections, workshop responses, lab results, recommendations & revision list, JSON export/import, reset.
- Content: 45 entries by 9 discipline-scoped agents + gold-standard Fitts's Law; all sources re-verified centrally after integration.
- Docs: CLAUDE.md, README and all docs/ files; three generated from content (`npm run docs:generate`).

## Verified (actually run)

- `npm test`: 74/74 (26 content-gate tests, 43 formula tests vs statistical tables & published examples, 5 store tests).
- `npm run typecheck`, `npm run lint`: clean.
- `npm run build`: success, 633 static pages.
- `npm run sources:verify -- --all`: 147 DOIs verified, 0 mismatches; 69 URLs reachable; 8 URLs block bots (labelled).
- Browser crawl of 36 routes: all 200, 0 console errors, 0 failed requests.
- e2e (`tests/browser/e2e.cjs`): 42/42 — keyboard skip link, search (title + full text), level tabs incl. arrow keys and persistence, bookmark/complete/notes persistence across reload, calculator results + validation + reset + save, quiz right/wrong feedback and revision link, flashcard review, SUS = 80, contrast 8.70:1, library filters, dashboard, JSON + Markdown export, import into a fresh browser, theme toggle + persistence, graph focus, Fitts lab trials, mobile menu + Escape, no horizontal scroll on 7 mobile pages, no uncaught errors.
- axe-core (WCAG 2.0/2.1/2.2 A & AA) on 76 pages × light/dark: 0 violations.
- Visual review by screenshot: home, entry (light/dark), library, graph.

## Not done / limitations

- 4 sources awaiting verification; 8 URL-only sources unreachable by automated checks (ISO, ACM DL and similar) — see ROADMAP known issues.
- Some claims in entries are deliberately hedged where a primary source could not be read (each fork's notes are reflected in the entries' wording and evidence notes).
- Screen-reader testing with real assistive technology (VoiceOver/NVDA) has not been done — only automated checks and semantic review.
- Responsive layout simulator, steering-law experiment and colour-vision simulation labs are not yet built.
- Unknown slugs return the 404 page with HTTP status 200.

## Next task (precise)

Write the **Foundations gap** entries listed first in `docs/ROADMAP.md` — start with `user-experience` (domain `foundations`, subcategory `core-concepts`, primaryType `discipline`): follow `docs/CONTENT_MODEL.md`, reuse `norman-nielsen-ux-definition`, `iso-9241-210-2019` and `hassenzahl-tractinsky-2006` from the registry, add the ISO 9241-210 definition of user experience (paraphrased), link `usability`, `user-centred-design`, `ui-design`, then `npm run content:index && npm run sources:verify -- <new ids> && npm run check && npm run docs:generate`.
