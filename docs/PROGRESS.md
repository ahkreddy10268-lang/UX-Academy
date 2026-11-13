# Progress register

_Last updated: 2026-11-13 (session 42 — `constraints` published; Cycle 1, Batch 1: 2 of 5)_

## State

**Do not copy figures here** — they go stale. The live figures are generated from the content: `docs/CONTENT_COVERAGE.md` (coverage, maturity, targets by type and evidence class, path completeness) and `docs/RESEARCH_SOURCES.md`. At D-129 (2026-11-12): 88 of 561 topics published (15.7 %), 10 addressed within another entry, 6 empty domains. Content strategy: balanced academy development (D-129, `docs/BALANCED_DEVELOPMENT_PLAN.md`).

_The session sections below keep the figures that were true at the time._

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

## Session 36 — Design Systems Batch 6: state patterns (D-124)

- Owner approved unifying the six patterns under the async state model of `component-state-management` (idle → loading → success | error; success → populated | empty).
- Published `empty-states`, `loading-states`, `skeleton-screens`, `progressive-loading`, `error-states`, `data-tables` (all `pattern`, Design Systems › components). Each has three depths, a practice block with exactly three dos and three don'ts and production-style code (async result with an empty branch; delayed indicator with ignored repeat presses; dimension-locked skeleton with composited shimmer; streamed page with Suspense, LCP priority and lazy media; typed error payload with backoff, jitter and an idempotency key; accessible sortable table with all async states), a correction exercise, quizzes at three levels, four flashcards, telemetry signals, explicit WCAG 2.2 criteria, a sheet plate with figure key and a register record.
- 23 sources added and checked: NN/g (empty states, skeleton screens, progress indicators, mobile tables), Wroblewski 2013, web.dev (CLS, LCP, INP, image lazy loading), W3C Resource Timing (CRD), MDN (lazy loading, prefers-reduced-motion), WCAG Understanding 4.1.3 and 2.2.2, APG table and grid, WAI tables tutorial, TanStack Virtual, React (Suspense, useOptimistic, error boundaries), AWS backoff with jitter, RFC 9110. Existing records reused: Miller 1968, Card et al. 1991, Nielsen 1993, Myers 1985, Reason 1990, NN/g error messages and help.
- New tested formula `waitFeedback` in `lib/formulas/components.ts`; the loading entry and plate use it.
- Stage 4 of the Design Systems path is fully published (12 of 12); Stages 1–4 are complete.

## Session 37 — Design Systems Batch 7: governance and operations (D-125)

- Published `design-governance`, `design-system-versioning`, `design-qa`, `design-system-audits` (strategy, Design Systems › operations) and `multi-brand-systems` (concept, Design Systems › foundations). Each has three depths, a practice block with exactly three dos and three don'ts and worked examples (RFC template and lifecycle metadata; SemVer classification matrix, changeset, token alias and jscodeshift codemod; Stylelint token rules and a Playwright visual-plus-axe gate; audit spreadsheet and adoption scan; multi-brand DTCG override map with a resolver and a CI contrast matrix), a correction exercise, quizzes at three levels, four flashcards, a sheet plate with figure key and a register record.
- 15 sources added and checked: GOV.UK (propose, contribution criteria, develop, component lifecycle statuses), Changesets, jscodeshift, react-scanner, Playwright visual comparisons, Chromatic, Storybook interaction tests, Stylelint `color-no-hex` and `declaration-property-unit-disallowed-list`, axe-core, W3C WCAG-EM 2.0 (Group Note, July 2026), Figma library analytics. Semantic Versioning notes extended with its deprecation FAQ and 0.y.z rule. Reused: Primer component status, Frost 2016, DTCG format and resolver, Fluent 2 tokens, Carbon themes.
- New tested formulas in `lib/formulas/components.ts`: `bumpVersion`, `releaseBump`, `adoptionRate`. New theme-independent sample colours `--sample-token-orange-500/700` (`BRAND_SAMPLES`, tested against globals.css) for the multi-brand contrast example (3.02:1 fails, 5.18:1 passes).
- **The Design Systems domain is complete: 29 of 29 topics published (100%)**, per the generated docs/CONTENT_COVERAGE.md and `npm run test:taxonomy`. Overall coverage: 88 of 561 topics (15.7%).

## Session 38 — Async State Lab (D-126)

- New simulation `async-state-lab` (`components/labs/async-state-lab.tsx`), registered in `content/labs.ts` and the lab registry, linked from `component-state-management`, `loading-states`, `skeleton-screens` and `data-tables` (`lab` field) and added to Stage 4's practice slot of the Design Systems path.
- Model in `lib/formulas/async-state.ts` (20 unit tests): the unified async machine (idle → loading → populated | empty | error, retry, reset) with ignored events and the user's query kept in every state; `indicatorPlan` (≤ 100 ms nothing; ≤ 1000 ms busy state only; > 1000 ms the chosen indicator from 1000 ms, visible at least 400 ms; anti-pattern shows it at 0 ms); `announcement` text for a polite status region.
- Lab features: latency slider 50–3000 ms with a timeline of what people see; skeleton, spinner and progressive modes; network-error switch with kept input and retry; loans table and card list with reserved height; live announcement log; measured layout shift (Layout Instability API, Chromium); reduced-motion switch (defaults to the OS preference); broken preset (fetch per keystroke, indicator at 0 ms, no reserved height, wiped input, error shown as "No loans", vague announcements) with a five-step correction walkthrough citing WCAG 2.2 SC 3.3.1, 3.3.7 and 4.1.3.
- e2e suite gains two lab checks (input kept on error; retry resolves and announces the count): 44/44.

## Session 39 — Nielsen heuristics guide (D-127)

- New content type **guide** (`lib/content/guide.ts`, `content/guides/`, loader `guides`/`guideById`) and routes `/guides` and `/guides/nielsen-heuristics`. The guide composes the ten heuristic entries by slug (no copied content): Chapter 1 problem story with a live double-transfer demo; Chapter 2 framework, 1990–1994 timeline and the original nine principles; overview grid; ten chapters (everyday meaning, analogy, why, psychology, behaviour, poor/better mockups, demo where useful, consequences, scenario, do/don't, implementation, web/mobile/enterprise, accessibility, misreadings, relations, checklist, knowledge check, exercise, link to the entry); seven comparisons; a 7-stage evaluation process; the 0–4 severity scale; a fictional 12-finding e-commerce case study with before/after mocks; report fields; ten advanced topics; six common mistakes; collected exercises; a 15-question final assessment; 21 sources.
- Mock DSL renderer `components/guide/mock-screen.tsx`; demos `components/guide/demos.tsx` (transfer, save, undo, date); chapter renderer `components/guide/heuristic-chapter.tsx`.
- **Heuristic Evaluation Report lab** (`heuristic-report-lab`, kind tool): finding form with validation and focus on errors, priority table (severity, then effort), severity counts, load the case-study report, Markdown/CSV export. Rules in `lib/formulas/heuristic-report.ts` (5 tests).
- Entries link back (`guide` field) — nine heuristic entries to their chapter, `nielsen-usability-heuristics` and `heuristic-evaluation` to the guide and its process section; "Evaluate a design" and "Inspection" path stages link the guide and lab.
- Tests: `tests/guide.test.ts` (entries, questions, exercises, citations, links, heuristic numbers, mock alt text and notes), guide strings added to the editorial gate, path links may target `/guides/` and `/labs/`.
- Sidebar: "Guides" added to the Learn group (new `guide` signpost icon). Shared fixes found by QA: `DocLayout`'s TOC wrapper is no longer an unlabelled `aside` (duplicated the sidebar landmark on every doc page); `Callout` takes `landmark={false}` to render a note where a page repeats a role; scroll containers holding tables with `sr-only` cells are `relative` so the hidden cells cannot widen the page at 390 px.
- Verified: `npm run check` (510 tests), `test:taxonomy`, build (978 pages); guide QA script 40/40 (axe with every disclosure open at 1440 light / 390 dark / 390 light, no overflow, no console errors, mock text ≥ 11 px at 390, demos and lab flows); e2e 44/44, e2e-redesign 66/66, atlas 36/36, keyboard 45/45, devices 155/155, a11y 0 violations, crawl 0 problems.

## Session 39b — guide and method page usability pass (D-128)

- Audited /guides/nielsen-heuristics and /library/heuristic-evaluation at 1440/1280/1024/834/390 (headings, ids, anchors, target sizes, rendered text sizes, overflow, landmarks, links). Fixed: disclosures without an expand cue (new `Disclosure`), anchored headings hidden under the topbar, the cramped 1024 guide column (`DocLayout tocFrom`), current-section marking in on-page lists (`TocSpy`), sticky list taller than the viewport, hero plates below the text floor at 1024 (side by side from xl), citation markers at 7 px, mock numerals at 10 px; added chapter navigation and guide ↔ entry ↔ lab links.
- Verified: check (510), build; targeted script 30/30 (current-section marking, layout per width, disclosure cue, keyboard toggle, focus outline, badge alignment, contextual links, 377 links on the three pages); guide QA 40/40 (axe with disclosures open, 1440 light / 390 dark / 390 light); e2e 44, e2e-redesign 66, atlas 36, keyboard 45, devices 155; a11y 0 violations on 9 pages; crawl clean.

## Session 40 — balanced development (D-129); Cycle 1, Batch 1 started

- Plan approved with refinements: visual targets by type family, evidence targets by evidence class, G-slot quality rule (plan § 9.2). Reporting view `lib/content/targets.ts` (9 tests) and a "Targets by type and evidence class" section in CONTENT_COVERAGE.md; `maturity()` and every gate unchanged.
- CONTENT_AUDIT § 6 marked superseded (slug errors noted); this register's State table now points to the generated figures.
- Batch 1 (Interaction feedback & state): 9 new sources added and verified first (5 DOIs via Crossref, 4 URLs; `content/sources/interaction-principles.ts`); Material 3 states read from the rendered page; the Shneiderman & Maes 1997 debate recorded from Crossref metadata only (full text blocked to automated access — cited for nothing beyond the record). All five topics entered the research ledger.
- **Published `feedback-principle`** (concept, established theory): Explanation, Evidence, Practice, Editorial complete; meets its visual target (plate; plus feedback-lab); plate `components/illustrations/concepts/interaction-sheets.tsx` (act → system → feedback → evaluate loop; immediate / informative / proportionate pairs), plate text ≥ 10.2 px at 390, axe 0 violations. Links added from `signifiers` and `error-recovery`; four entries already pointed to it. Interaction Design path 70 % → 74 %.

## Session 41 — Colour Studio lab (D-130; outside the content batches)

- New tool lab `/labs/colour-studio`: Palette Studio (HSL wheel, six harmonies, editable swatches, colour-vision preview, role-based interface preview with WCAG checks of the pairs it renders, CSS/JSON export, import, save in this browser), Colour Contrast (WCAG 2.2 text / large text / non-text on the unrounded ratio, every palette pair), Image Extraction (local median cut), Gradient Studio. Maths in `lib/formulas/colour.ts` (25 tests) reusing the WCAG and colour-vision code; browser checks in `tests/browser/colour-studio.cjs` (46). No content, taxonomy or batch changes; generated docs now count 19 labs.
- Reviewed in PR #2 against main; not merged.

## Session 42 — `constraints` published (Cycle 1, Batch 1, entry 2 of 5)

- **Published `constraints`** (concept, established theory): physical, cultural, semantic and logical constraints as an overlapping lens (not an exhaustive taxonomy); forcing functions (interlocks, lock-ins, lockouts) and when they are worth their friction; digital examples throughout; boundaries with affordances, signifiers, feedback, conventions and error prevention; accessibility of disabled controls and over-constraint. Explanation, Evidence, Practice, Editorial complete; meets its visual target (plate). No new sources: reused Norman 1988/2013 (bibliographic), Norman 1983 and 1999 (DOI-verified), NN/g slips, WCAG 2.2 SC 1.4.3 and 3.3.4 and WAI-ARIA 1.2 `aria-disabled` (wording read first-hand 2026-11-13), Material 3 states.
- Plate `constraints` in `components/illustrations/concepts/interaction-sheets.tsx` (four interface panels, one per kind; plate text ≥ 10.2 px at 390). Reciprocal relations from `signifiers` and `feedback-principle`; `error-prevention` now links its "helpful constraints". Interaction Design path 74 % → 78 %.
- Review corrections: `error-prevention` → `constraints` relation changed from `applied-in` (reversed) to `related-to`; the worked example's date arithmetic is date-only with month-end clamping and no time-zone dependence (the earlier `setMonth` version turned 31 January + 1 month into 3 March); the template-literal regex escape was fixed so the rendered code is valid (verified by executing the rendered snippet); the accessibility text distinguishes native `disabled` (not focusable, no click events — WHATWG HTML, new source `whatwg-html`, URL-verified) from `aria-disabled` (state exposed, can stay focusable, script blocks activation) and requires a separate visible, associated reason.
- Branch `claude/batch1-constraints`, kept separate from PR #2.

## Next task (precise)
Continue Batch 1, one entry at a time, sources already verified (content/topic-ledger.ts): `direct-manipulation`, `interaction-states`, `discoverability` — each complete on Explanation, Practice and Editorial, meeting its Visual and Evidence targets, with a plate, links from existing entries (plan § 7.4), `docs:generate` after each. Then Batch 2 (think-aloud-protocol, tree-testing, contextual-inquiry, in-depth-interviews) and Batch 3 (UX writing foundations), then the cycle-1 balance review (plan § 9.3).
