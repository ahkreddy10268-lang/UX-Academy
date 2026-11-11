# Progress register

_Last updated: 2026-11-11 (session 35 — Design Systems Batch 5, component foundations)_

## State

Figures are generated from the content; the live source is `docs/CONTENT_COVERAGE.md` (and `docs/RESEARCH_SOURCES.md`). Snapshot after session 22 (previous snapshot, session 18: 51 published, 9.1%):

| Area | Count |
|---|---|
| Taxonomy topics (domains / subcategories) | 558 (20 / 73), taxonomy v1.0 frozen |
| Published entries (all gates pass) | 52 (9.3% of topics) |
| Addressed within another entry / planned with no content | 10 / 496 |
| Domains with no published entry | 6 |
| Explained graph relationships | 440 |
| Formulas with unit-tested calculators | 25 |
| Interactive labs | 15 |
| Quiz questions / exercises / flashcards | 215 / 151 / 175 |
| Sources (DOI-verified / URL-reachable) | 293 (166 / 86) |

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

## Session 34 — Five-stage path applied; Design Systems Batch 4 (D-122)

- Owner approved the restructure: `content/learning-paths.ts` now has five stages (Understand the system; Tokens and themes; Scales and visual systems; Components and patterns; Governance and operations). `tests/learning.test.ts` asserts that all 29 Design Systems topics appear exactly once with no duplicate steps. No slug, route or stored key changed (progress is keyed by entry slug, quiz question id and card id).
- Published Stage 3 in full: `spacing-scales`, `typography-scales`, `colour-systems`, `elevation-systems`, `icon-systems`, `responsive-systems`. Each has three depths with CSS custom properties and Tailwind v4 tokens, a practice block with exactly three dos and three don'ts plus code, a correction exercise, quizzes at three levels, four flashcards, explicit WCAG 2.2 criteria, a sheet plate with figure key and a register record. Radius is taught inside spacing (concentric rule R_outer = R_inner + padding) and elevation; motion scales stay in `design-language`.
- 17 page-level sources added and URL-checked (Carbon spacing, 2x Grid, icons; Atlassian spacing and typography; USWDS spacing units; GOV.UK spacing and type scale; Material 3 type scale and elevation; Fluent 2 typography and elevation; Apple HIG typography, layout, SF Symbols; MDN clamp() and container queries). DTCG shadow and typography composite types confirmed against the 2025.10 format.
- Every ratio, scale step and column width quoted in the entries and plates is computed with `lib/formulas` (contrastRatio, modularScale, gridColumns).
- `responsive-systems` is the first Responsive & Adaptive plate, closing the D-109 gap.
- Stage 3 of the path is now fully published; Stages 1–3 (16 steps) can be completed today.

## Session 35 — Design Systems Batch 5: component foundations (D-123)

- Owner approved splitting Stage 4: concepts first (Batch 5), state patterns next (Batch 6).
- Published `component-libraries`, `component-architecture`, `variants`, `component-properties`, `component-state-management`. Each has three depths (Beginner analogies; Practitioner naming, prop sprawl, design reviews, Figma ↔ code parity; Systems Architect typed contracts, headless vs encapsulated styling, state machines, bundle and React Server Components boundaries, WAI-ARIA/APG keyboard models), a practice block with exactly three dos and three don'ts plus production-style code (headless wrapper with a client boundary, compound Tabs with context and roving tabindex, cva variants, a discriminated-union button contract, a typed async state machine), a correction exercise, quizzes at three levels, four flashcards, a sheet plate with figure key and a register record.
- 24 sources added and checked: Radix (introduction, composition), React Aria, Ark UI, Material UI, Chakra UI, Shopify Polaris (now web components at shopify.dev), Primer (philosophy, component status), Open UI (W3C Community Group), cva variants, TypeScript narrowing, React (sharing state, reacting to input, context, props, 'use client'), Figma (variants, component properties), WAI-ARIA 1.2 (Recommendation), APG (keyboard interface, tabs, button), and Harel 1987 (DOI-verified; full text not readable, cited bibliographically for nested and concurrent states). Frost 2016 notes extended with chapters 1 and 5.
- New tested formulas `lib/formulas/components.ts`: `variantCount` (reproduces Figma's documented 24-variant button) and `booleanVsEnum`; the variants entry and plate use them.
- Stage 4 now has 5 of 12 steps published.

## Next task (precise)
Design Systems Batch 6 (Stage 4 patterns): `empty-states`, `loading-states`, `skeleton-screens`, `progressive-loading`, `error-states`, `data-tables` — sources verified first; reuse the state-machine model from `component-state-management` and the async status example.
