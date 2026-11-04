# Progress register

_Last updated: 2026-11-04 (session 5 — second visual set, colour and Jakob models, keyboard and device testing)_

## State

Figures are generated from the content; the live source is `docs/CONTENT_COVERAGE.md` (and `docs/RESEARCH_SOURCES.md`). Snapshot after session 6:

| Area | Count |
|---|---|
| Taxonomy topics (domains / subcategories) | 540 (20 / 62) |
| Published entries (all gates pass) | 47 (8.7% of topics) |
| Addressed within another entry / planned with no content | 10 / 483 |
| Domains with no published entry | 7 |
| Explained graph relationships | 348 |
| Formulas with unit-tested calculators | 25 |
| Interactive labs | 15 |
| Quiz questions / exercises / flashcards | 166 / 130 / 134 |
| Sources (DOI-verified / URL-reachable) | 256 (152 / 69) |

**The earlier session sections below keep the figures that were true at the time.**

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

## Session 6 — content coverage and depth audit

**Done**
- **Audit:** `docs/CONTENT_AUDIT.md` reviews 20 domains and 62 subcategories.
- **Taxonomy changes:**
  - **Additions:** 33 important missing topics, including HCI as a discipline, Design System, Information Foraging Theory, Task Analysis, Eye Tracking, Personas, Touch Target Size, SEQ/SUPR-Q/UEQ, the European Accessibility Act and Value Sensitive Design.
  - **Merges:** 8 duplicates.
  - **Reclassifications:** 2, plus 1 rename.
  - **Splits:** 2 single-bucket domains.
  - **New field:** `coveredBy` (10 topics addressed within existing entries, never counted as published).
- **Quality gates:** type-specific completeness gates and per-level depth checks (`lib/content/completeness.ts`, enforced in `tests/content.test.ts`; no word counts).
- **Maturity:** five-dimension maturity (explanation, evidence, practice, visual, editorial) generated into `docs/CONTENT_COVERAGE.md`.
- **First Tier-1 entry:** `user-experience` (sources: ISO 9241-210:2019; Hassenzahl & Tractinsky 2006; Law et al. 2009, DOI verified; Hassenzahl 2004), with its plate.
- **Counts reconciled:** README, PROGRESS and ROADMAP now match the generated docs.

**Next task (precise):** write `human-computer-interaction` (Tier 1, docs/CONTENT_AUDIT.md §6).
1. Add and verify the missing sources first.
2. Reuse `card-moran-newell-1983` and `norman-draper-1986`.
3. Relate the entry to `user-experience`, `gulfs-of-execution-and-evaluation`, `keystroke-level-model` and `fitts-law`.
4. Draw its plate.
5. Run `npm run content:index && npm run sources:verify -- <new ids> && npm run check && npm run docs:generate`.

After that: `ui-design`, `interaction-design-discipline`, `accessibility-concept`, `inclusive-design`, `design-thinking`, `human-centred-design`.

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

## Session 7 — `/learn` refinement and Vercel (not committed)

- **Vercel deploy: blocked, not done.** The container's network policy denies api.vercel.com (HTTP 403) and no Vercel CLI/token exists. Needs: Network access widened (cloud environment settings) plus Vercel login/token, or import `ahkreddy10268-lang/UX-Academy` in Vercel directly. The app is a plain `next build`, no env vars.
- **`/learn` refined** (D-046…D-050): lighter path cards, per-path artwork (`components/learn/path-art.tsx`), new header copy and counts, quiet "Not started" / "More lessons in development", container-query columns. `PathCard` API slimmed (also used on home and topic hubs, which inherit the new card). Data, stats calculations, store and routes unchanged.
- Next: owner review of the new `/learn`, authorise commit/push; then continue with `human-computer-interaction` (docs/CONTENT_AUDIT.md §6).

## Session 8 — learning experience refinement (uncommitted until authorised)

Done: path artwork shared by card and path hero; card metadata ("practice items", "Est. reading time", planned count); progression-only curriculum map; the primary Level-2 figure on lesson pages; level-matched quiz/exercise selection with explicit mixed-level revision (D-051…D-055); `tests/learning.test.ts`.
Data finding: 8 lesson-levels have no matching-level exercise or question (e.g. `mental-models` at beginner has no beginner exercise; `sample-size-estimation` at advanced has no advanced question), and 12 of 48 stages have no matching-level test questions at all (ux-research L1, information-architecture L3, design-systems L2–3, accessibility L2–3, product-strategy L2, ai-ux L2–3, service-design L2–3). They now show labelled revision. Writing matching-level questions for those is future content work.
Next: owner review, authorise commit/push; Vercel still blocked (see Session 7); then `human-computer-interaction` (docs/CONTENT_AUDIT.md §6).
