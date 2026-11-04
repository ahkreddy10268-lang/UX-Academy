# Progress register

_Last updated: 2026-11-04 (session 5 — second visual set, colour and Jakob models, keyboard and device testing)_

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

## Session 2 — visual & product redesign (v2)

**Implemented**
- Design language v2: brand accent + 11 subject palettes (light/dark, contrast-checked), type roles, motion tokens, base grid rule. Docs: UI_UX_DESIGN_DIRECTION, ILLUSTRATION_SYSTEM, INTERACTION_AND_MOTION_GUIDELINES, PAGE_TEMPLATES, VISUAL_QA; CLAUDE.md design rules revised.
- Illustration system: primitives, plate frame, registry, 67 original plates — all 45 published entries, all 20 subjects, plus design-thinking and atomic-design (planned topics, labelled). 12 animated (pausable), 7 interactive explorers (Fitts, Hick-Hyman, peak-end, chunking, grouping, information density, signifiers).
- Flagship pages: homepage (hero search, constellation, disciplines, featured concept, evidence ledger, paths, labs, connections), Library (grid/list/A–Z, card variants, type strip, full URL state, mobile drawer), concept page (illustrated hero, visual explanation, evidence-ledger panel, illustrated relations).
- Platform: illustrated subject pages; Learning Academy with levels, lesson template and level tests (`/learn/[id]/lesson/[slug]`, `/learn/[id]/level/[n]`); Formula Lab search + category nav + response curves with data tables; illustrated labs grouped by kind + new responsive layout simulator; subject-coloured graph; illustrated workshops; searchable glossary; comparison plates; illustrated planned-topic and 404 pages; footer subject key.
- New tested functions: `peakEnd`, `chunk` (lib/formulas/experience.ts). Illustration integrity tests.

**Verified (actually run, after the final build)** — see the table below and docs/VISUAL_QA.md.

**Known limitations**
- No screen-reader or real-device testing; axe and scripted keyboard paths only.
- Steering-law experiment and colour-vision-deficiency simulation labs remain unbuilt.
- Plates for most planned topics do not exist; planned pages show the subject plate, captioned as such.
- Explorers exist for 7 concepts; others show the static hero plate.

## Session 5 — completed

1. **Level-2 visual explanations** for User-Centred Design (iterative cycle), Gestalt Principles (annotated interface + spacing comparison) and Heuristic Evaluation (parallel flow + decision tree). These use four new templates; the existing ones are unchanged. 7 concepts now have Level-2 explanations, 12 figures in all.
2. **Colour explorer** (HSV sliders, live previews, white/black text contrast, a hue–luminance strip; tested `hsvToRgb`/`rgbToHsv`). It sits on the Colour Contrast Ratio page and at `/labs/colour-lab`.
3. **Jakob's law experiment** (`/labs/jakob-lab`): position-only comparison, 2 practice + 16 scored trials, median, mean and errors, first-vs-last learning, interpretation. Linked from the Jakob's Law entry.
4. **Review** of all Level-2 figures and Level-3 explorers for accuracy, consistency and responsiveness. Two accuracy fixes and several layout fixes (docs/VISUAL_KNOWLEDGE_SYSTEM.md review log).
5. **Keyboard and accessibility-tree testing** (`tests/browser/keyboard.cjs`) and **device emulation** (`tests/browser/devices.cjs`). These found and fixed a doubled accessible name and WCAG 2.5.8 target-size failures across the app.

**Not testable here:** screen readers and physical devices (docs/VISUAL_QA.md, "Could not be tested").

## Next task (precise)

1. Owner-run checks that cannot be done in the cloud container: VoiceOver (macOS Safari, iOS Safari) and NVDA (Windows Firefox) on `/`, `/library`, `/library/double-diamond`, `/labs/jakob-lab` and the mobile drawer; one real iPhone and one Android phone for touch, the steering lab and the Jakob lab. Record findings in docs/VISUAL_QA.md.
2. Add a WebKit pass to `tests/browser/devices.cjs` if a WebKit build becomes available (`playwright.webkit`).
3. Next Level-2 explanations, by strategy: `cognitive-walkthrough` (per-step question flow), `peak-end-rule` (experience curve with annotations), `wcag` (hierarchy of principles → guidelines → criteria → levels).

## Session 3 — v3 Pastel Editorial Workspace (not committed; awaiting owner authorisation)

**Implemented**
- Design system v3: cool neutral canvas, action indigo, rubric heritage accent, explicit pastel washes (dark computed), radii 6–24, four soft shadows, selective gradients, Plex Sans headings + Newsreader editorial roles, surface recipes; `tests/tokens.test.ts` gates contrast in both themes.
- App shell: grouped collapsible sidebar (248/76px, persisted, tooltips), 68px topbar (search, theme, My Learning), single rounded workspace frame, modal drawer below 1024px, a custom 30-glyph icon set; footer reduced to a colophon.
- Flagship pages: homepage dashboard (gradient hero with stats; learning panel from real local data; subject tiles; featured concept; journeys; evidence ledger research feature; labs; recommendations). Library: toolbar filters with subcategory, sort, subject/type chips, 4/3/2/1 container grid, 8 auto card variants, paging, URL state. Concept page: pastel hero, 9 callout roles, Fitts explorer with approach direction and an easy/difficult comparison, TOC panel, evidence panel.
- Platform: path cards with objectives and entry requirements; path, lesson, planned-topic heroes; Formula Lab split workspace; lab workspace with side panel; pastel My Learning tiles; practice stats; every route restyled through shared primitives.
- New labs: **steering-law tunnel experiment** and **colour-vision-deficiency simulator** (Machado et al. 2009, DOI verified; ΔE*ab). New tested functions: `widthAlongApproach`, `simulateCvd`, `srgbToLab`, `deltaE76`. New verified sources: `mackenzie-buxton-1992`, `machado-oliveira-fernandes-2009`.
- New plate: Human-Centred Design (68 plates).

**Verified** — see docs/VISUAL_QA.md (129 unit tests, 42 + 45 e2e, 152 axe audits with 0 violations, 120 responsive overflow checks, 60 screenshots reviewed).

## Next task (precise)

1. Get the owner's review of the v3 screenshots, then commit (authorisation required).
2. Write the `colour-vision-differences` entry (planned taxonomy slug, domain `visual`): cite `machado-oliveira-fernandes-2009`, link `cvd-lab` and `colour-contrast-ratio`, draw its plate. Then `npm run content:index && npm run sources:verify -- <new ids> && npm run check && npm run docs:generate`.

## Earlier next task (session 2) — still open


Write the **Foundations gap** entries (see docs/ROADMAP.md), starting with `user-experience`, and draw its plate in `components/illustrations/concepts/frameworks-visual.tsx`; then `npm run content:index && npm run check && npm run docs:generate` and re-run `tests/browser/e2e-redesign.cjs`.

## Previous next task (session 1)

Write the **Foundations gap** entries listed first in `docs/ROADMAP.md` — start with `user-experience` (domain `foundations`, subcategory `core-concepts`, primaryType `discipline`): follow `docs/CONTENT_MODEL.md`, reuse `norman-nielsen-ux-definition`, `iso-9241-210-2019` and `hassenzahl-tractinsky-2006` from the registry, add the ISO 9241-210 definition of user experience (paraphrased), link `usability`, `user-centred-design`, `ui-design`, then `npm run content:index && npm run sources:verify -- <new ids> && npm run check && npm run docs:generate`.
