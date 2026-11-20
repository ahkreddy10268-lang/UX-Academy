# Progress register

_Last updated: 2026-11-17 (session 50 — Batch 3 review: PASS WITH MINOR FOLLOW-UPS; Cycle 1 balance review: IMPROVEMENT REQUIRED; awaiting owner decision)_

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
- Final review (2026-11-13): every cited sentence re-checked against its source. Fixes: the principles list (with signifiers) now cites only Norman 2013; NN/g slips is cited for its four techniques (constraints, suggestions, defaults, forgiving formats) and confirmations are attributed to Nielsen's error-prevention heuristic (`nielsen-ten-heuristics-article`, reused); Norman 1983 is cited for deriving design procedures from slips, not as the origin of constraints. `affordances` and `mapping` relations aligned to `complementary-to` on both sides. The worked example's `addMonths`/`returnLimits` is now executed by `tests/constraints-example.test.ts` (month ends, leap years incl. 2000/2100, year boundaries both ways, four time zones, bad input). Plate markers moved inside the viewBox (r = 11 at (8, 8) was clipped by `overflow: hidden`). Rendered at 1440/768/390 light+dark: axe 0, no overflow, plate text ≥ 10.2 px; links, quiz, exercise and flashcards work by keyboard.
- Known, not fixed here: 43 marker placements in other plates sit at x or y = 8 and are clipped the same way; `interaction-design-discipline` uses `applied-in` for 12 principles (a site-wide relation convention to decide separately).

## Session 43 — `direct-manipulation` published (Cycle 1, Batch 1, entry 3 of 5)

- **Published `direct-manipulation`** (principle, established theory): Shneiderman's term and four principles (the 1983 paper's integrated portrait has four, not the three usually quoted), Hutchins, Hollan & Norman's two aspects of directness (distance and engagement), the limits both papers state (repetition, generality, precision, directness ≠ ease of use), the debate with language and agents, and accessibility of dragging (WCAG 2.2 SC 2.5.7, 2.1.1, 2.5.1, 2.5.8). Explanation, Evidence, Practice, Editorial complete; meets its Visual and Evidence targets.
- **Sources.** Read first-hand 2026-11-13: Shneiderman 1983 (author-hosted scan) and Hutchins, Hollan & Norman 1985 (course-reading copy of the published article); notes added to both records. WCAG 2.2 SC text read from w3.org. New source `w3c-understanding-dragging-movements` (URL-verified). Reused `frohlich-1993` (abstract) and `shneiderman-maes-1997` (metadata only; cited as a record of the debate). `sources:verify` passes for all five.
- **Visuals.** Plate `direct-manipulation` (one move as command, drag, result with Undo, and a 'Move to…' menu) in `interaction-sheets.tsx`, markers inside the viewBox; Level-2 figure `direct-manipulation.space` (distance × engagement, original layout, examples from the entry). Plate text ≥ 10.2 px at 390.
- **Practice.** Worked example `move()` / `moveMessage()` executed by `tests/direct-manipulation-example.test.ts` (6 tests). Reciprocal relations added on `feedback-principle`, `user-control-and-freedom`, `signifiers`, `recognition-over-recall`; topic removed from the research ledger.

## Session 44 — `interaction-states` published (Cycle 1, Batch 1, entry 4 of 5)

- **Published `interaction-states`** (concept, official standard): what a state is (WCAG 2.2 glossary), three kinds by source — momentary (hover, focus, pressed), value states the person sets (selected, checked, expanded, on), conditions the system sets (disabled, busy, invalid); visual, behavioural and semantic expression; focus vs focus-visible; the two meanings of 'pressed'; selected vs current vs checked vs pressed; legible and forbidden combinations; WCAG 2.2 SC 1.4.1, 1.4.11, 1.4.13, 2.4.7, 2.4.11, 2.4.13, 2.5.2, 4.1.2. Explanation, Evidence, Practice, Editorial complete; meets its Visual and Evidence targets. Boundary kept: `component-state-management` owns modelling, transitions and ownership; loading, empty and error views stay in their pattern entries.
- **Sources** (all read first-hand 2026-11-13; all URL-verified): new `w3c-selectors-3` (Recommendation 2018, for :hover, :active, :focus, UI element states) and `w3c-understanding-non-text-contrast`; reused WCAG 2.2, WAI-ARIA 1.2 (state definitions added to its notes), WHATWG HTML (pseudo-class matching added to its notes), `w3c-selectors-4` (Working Draft — cited only as a draft, for :focus-visible and its heuristics), `m3-states` (re-read), `w3c-apg-button`.
- **Visuals.** Plate `interaction-states` (one control in eight states grouped by source, each with a non-colour cue; markers inside the viewBox) and the D-129 Level-2 state diagram `interaction-states.dimensions` (viz): pointer, focus, value and availability lanes with their events, what is exposed, and legible versus forbidden combinations.
- **Integration.** Reciprocal relations added on `constraints`, `loading-states`, `error-states` (five entries already pointed here). Topic removed from the research ledger. Paths: Design Systems 97 % → 100 % (its last planned step); Interaction Design 83 % → 87 %. e2e-redesign's detailed-diagram count is now 14.

- **Review corrections (2026-11-16).** Classification restated as transient interaction and navigation states (focus by keyboard, pointer or script), persistent value and selection states (usually the person's, but the application can set or update them) and system-controlled conditions — not a strict rule by source — consistently in the definition, explanations, flashcard, plate key and Level-2 lanes. Added the disabled vs read-only distinction from the HTML standard (focus, click events, editing, submission, validation, which controls `readonly` applies to) with vocabulary, an HTML example, a quiz question and a flashcard. `aria-disabled` and `aria-readonly` described as exposing state, not implementing it, with role support and the deprecation of global `aria-disabled`; neither gives a reason. `:focus-visible` described as browser heuristics (pointer clicks often, not always, hide the ring; user preference and programmatic focus), and the diagram's click transition qualified. WCAG wording tightened: 1.4.11 scoped with its two exceptions and kept separate from 1.4.1; supplemental hover; 1.4.13's dismissible exceptions and user-agent exception; 2.4.13 marked AAA. 'Never show' combinations replaced by misleading combinations that keep discoverability apart from running an action, including busy submit versus an offered Cancel.

## Session 45 — `discoverability` published (Cycle 1, Batch 1, entry 5 of 5 — batch complete)

- **Published `discoverability`** (principle, professional guideline): discovery as a chain — notice (salience), recognise (signifiers), predict (information scent), decide (interaction cost) — shaped by expectations and mental models; boundaries with signifiers, findability, visibility of system status and learnability; the NN/g hidden-navigation study with its scope kept (179 participants, six sites, desktop and phone, simple tasks; visible-only not tested on phones; time-to-navigation only marginally significant); NN/g recommendations labelled as recommendations; visibility versus clutter; when progressive disclosure helps; gestures, shortcuts and hover as accelerators that need a visible route; evaluation with tasks that do not point to the feature. Explanation, Evidence, Practice, Editorial complete; meets its Visual and Evidence targets.
- **Sources.** NN/g articles re-read first-hand 2026-11-16 (URL-verified); Grossman et al. 2009 abstract re-read via OpenAlex (DOI-verified), cited for the abstract only; Norman 2013 cited from its bibliographic record (not read in full; no quotation used). No new sources.
- **Visuals.** Plate `discoverability` (hidden vs visible navigation on desktop, hidden vs combination on a phone, each with a tick or cross). No Level-2 figure: the plate and the prose carry the mechanism, and the five reasons NN/g gives read clearly as a list.
- **Integration.** Reciprocal relations added on `visual-hierarchy`, `mental-models`, `information-architecture`, `visibility-of-system-status`, `jakobs-law`, `flexibility-and-efficiency-of-use` (signifiers, affordances, progressive-disclosure and recognition-over-recall already pointed here). Planned topics (`findability`, `information-scent`, `learnability`, `navigation-patterns`) stay planned. Research ledger now empty. Discoverability is not a step in any learning path; no path changed.

- **Batch 1 correction pass (2026-11-16).** (1) Norman: the book's text still could not be read from an accessible, authorised source, so the entry no longer attributes any specific wording or ranking to it; what is verified is kept separate — the bibliographic record (`norman-2013`) and, from Norman's own site, that the revised edition has a chapter titled 'Knowing What to Do: Constraints, Discoverability, and Feedback' (new source `norman-dote-2013-contents`, URL-verified). (2) Grossman et al. 2009: every claim checked against the abstract; one unsupported claim (learnability 'measured over repeated use') removed and the access limit stated where cited. (3) Interaction Design overview: its 12 `applied-in` relations ran the wrong way (they read 'the discipline is applied in constraints'); changed to `related-to`, and the 10 published principles now carry `applied-in → interaction-design-discipline`; the two planned targets keep only the `related-to` edge. (4) Marker clipping measured on the build: 152 markers in 78 plates extend past the viewBox (not 43); recorded in docs/VISUAL_QA.md and docs/ROADMAP.md, not fixed.

## Session 46 — formal Cycle 1, Batch 1 review (D-129)

- Report: docs/BATCH_1_REVIEW.md. Reviewed from `36290b2`; corrections in `fd86db0`, on which every check was run.
- **Decision: PASS WITH MINOR FOLLOW-UPS.** Findings: 0 critical; 2 major (Norman claims in feedback-principle and constraints rested on bibliographic records, and two contradicted the author's table of contents); 3 moderate (Myers 1985 overstated; Norman 1999 argument attributed without being read; `aria-busy` in feedback's example contradicted interaction-states); 11 minor. All major and moderate findings, plus 3 minor ones, were corrected in `fd86db0`; 8 minor items are open.
- Open: learning-path placement of discoverability and the evidence class of interaction-states (owner decisions); optional reciprocal relations; Hutchins, Hollan & Norman re-check against a published copy; `w3c-wcag-22` record note. The site-wide marker issue (152 in 78 plates) does not affect Batch 1; fixing it is a separate task awaiting approval.
- QA on `fd86db0`: check 22 files / 568 tests; taxonomy pass; build 986/986; e2e 44/44, e2e-redesign 66/66, atlas 36/36, keyboard 45/45, devices 155/155, colour-studio 46/46, axe 0, crawl 0; five-entry review 40/40; page reviews 15, 22, 32 and 33, all passing.
- Batch 2 is ready to begin once the owner approves; not started.

## Session 47 — Cycle 1, Batch 2: UX research foundations (D-129)

- **Published four entries**, one at a time (research → entry → plate → practice → relations → tests → rendered check): `think-aloud-protocol` (method, qualitative, peer-reviewed), `tree-testing` (method, evaluation, practitioner recommendation), `contextual-inquiry` (method, qualitative, practitioner recommendation), `in-depth-interviews` (method, qualitative, peer-reviewed). Report: docs/BATCH_2_REPORT.md.
- **Sources.** 21 new records in `content/sources/research-methods.ts` (14 DOI-verified via Crossref, 7 URL-reachable); each note says what was read — 1 research paper, 6 practitioner articles and the originators' encyclopedia chapter read in full, the rest abstracts only. `boren-ramey-2000` note added (abstract read). No claim rests on a source that was not read; unread books are cited as records only.
- **Visuals.** Four plates in `components/illustrations/concepts/research-sheets.tsx` (registered; plate text ≥ 10.2 px at 390, markers inside the viewBox) and four Level-2 figures (`think-aloud-protocol.protocols`, `tree-testing.readings`, `contextual-inquiry.process`, `in-depth-interviews.claims`). The tree-testing plate computes its success interval with `lib/formulas` `taskSuccess`. e2e-redesign's detailed-diagram count is now 18; its locator was narrowed to the library's results line because the think-aloud plate draws "412 results".
- **Relation fixes (minimal, reversed directions affecting these topics):** removed `usability-testing → applied-in → think-aloud-protocol` and `user-centred-design → applied-in → contextual-inquiry` (each re-added in the correct direction on the new entry); `human-computer-interaction → contextual-inquiry` changed from `applied-in` to `related-to`, note unchanged.
- Learning paths and D-129 unchanged. Coverage 97/561 (17.3 %); D-129 targets Visual 87/97, Evidence 95/97; the four new entries meet both.
- QA (one final build): check 22 files / 576 tests; taxonomy pass; build 994/994; e2e 44/44, e2e-redesign 66/66, atlas 36/36, keyboard 45/45, devices 155/155, colour-studio 46/46, axe 0, crawl 0; per-entry review (6 viewports, axe, plate text, markers, links, keyboard flashcards) 56/56 on the four new entries and the three entries whose relations changed. `card-sorting`, checked as a neighbour, fails only on its two pre-existing out-of-viewBox markers (the logged 78-plate backlog, not touched).
- Committed locally on `claude/batch1-constraints`; not pushed.

## Session 48 — formal Cycle 1, Batch 2 review (D-129)

- Report: docs/BATCH_2_REVIEW.md. Reviewed `bf39a79`; corrections in a separate review commit, on which every check below was run.
- **Decision: PASS WITH MINOR FOLLOW-UPS.** 0 critical, 0 major, 7 moderate (all fixed), 10 minor fixed, 4 minor open. Moderate: Olmsted-Hawala satisfaction overstated; a Nielsen citation for practice tasks (he recommends a demo video); a "studies agree" on retrospective cost that only one study reports; contextual-inquiry definition cited texts that were not read for those points; Flanagan 1954 cited for claims its abstract does not make; saturation edging towards a UX rule; the plan § 7.4 link usability-testing → think-aloud-protocol missing (added).
- Checked: the five required distinctions hold; Card Sorting's markers 3 and 4 (x = 392) are in the logged 78-plate backlog, numerals legible, not fixed; the e2e-redesign locator change is correct (the old locator would throw in strict mode because the think-aloud plate draws "412 results" on the library card), still asserts the exact count, not weakened.
- QA on the corrected tree: check 22 files / 576 tests; taxonomy pass; build 994/994; e2e-redesign 66/66, keyboard 45/45, devices 155/155, axe 0, crawl 0; per-page review 56/56; integrity script clean. Inherited from `bf39a79`: e2e 44/44, atlas 36/36, colour-studio 46/46.
- Open (minor): retarget usability-testing's citation of the unread 1993 book; validation-study searches not systematic; optional mental-models link; optional `role="status"` for the e2e locator.
- Not pushed. Batch 3 not started.

## Session 49 — Cycle 1, Batch 3: UX writing foundations (D-129)

- **Published five entries**, one at a time, in a new folder `content/knowledge/content/`: `ux-writing` (discipline), `content-design` (discipline), `plain-language` (principle), `microcopy` (pattern), `error-messages` (pattern). All are professional-guideline evidence class, and all meet their D-129 Visual and Evidence targets. Report: docs/BATCH_3_REPORT.md.
- **Assets.**
  - New comparison `/compare/ux-writing-vs-content-design`.
  - `error-messages` links to the Nielsen guide's heuristic 9 chapter (`guide` field, anchor `h9`).
  - Five plates in `components/illustrations/concepts/content-sheets.tsx` (registered; text ≥ 10.2 px at 390; 30 markers, all inside the viewBox).
- **Sources.** 43 records in `content/sources/ux-writing.ts` (6 DOI-verified, 32 URL-reachable, ISO 24495-1 refused by its site, 4 book records not read). Every note says what was read. `iplfederation.org` was not used: it served unrelated content.
- **Integration (plan § 7.4).** Four one-phrase links in error-recovery, nielsen-usability-heuristics, error-prevention and aesthetic-and-minimalist-design. The research-ledger comment was updated.
- **Coverage.** 97 → 102 of 561 (18.2 %); empty domains 6 → 5; UX Writing & Content Design 0 → 5 of 18; D-129 targets Visual 92/102, Evidence 100/102; learning paths unchanged.
- **QA on the final tree.** Results by check:
  - `npm run check`: 22 files, 586 tests.
  - Taxonomy check: pass.
  - Build: 995/995 pages.
  - e2e 44/44, e2e-redesign 66/66, atlas 36/36, keyboard 45/45, devices 155/155, colour-studio 46/46.
  - axe: 0 violations. Crawl: 0 problems.
  - Per-page review: 40/40 on the new entries. Three linked existing entries fail only on their logged backlog markers (error-recovery 3, error-prevention 1, nielsen-usability-heuristics 1).
- **Cycle 1 complete:** 14 topics (the plan defines 14, not 15); 88 → 102 published; three paths at 100 %; balance-review data in BATCH_3_REPORT § 11.
- D-129, the learning paths, gate code and tests are unchanged. Committed locally; not pushed.

## Session 50 — Batch 3 review and Cycle 1 balance review (D-129)

- Report: docs/CYCLE_1_BALANCE_REVIEW.md. Reviewed `80f8058`; corrections in the review commit on top of it.
- **Batch 3: PASS WITH MINOR FOLLOW-UPS.** Findings: 0 critical, 0 major, 6 moderate (all fixed), 8 minor fixed, 3 minor open. The moderate findings:
  - Seckler 2014 guideline content was attributed although only the abstract was read.
  - Porter was said to have popularised "microcopy", which no source read supports.
  - Four relations were misstated: two `applied-in` relations were reversed, one `measured-by` contradicted its own entry, and one `derived-from` was unsupported.
  - The content-design origin was dated "early 2010s" against its own note, and a citation did not support its sentence.
  - The error-messages plate showed a visible "Error:" prefix, against the key and the GOV.UK source.
  - A tooltip claim was cited to an article about placeholders.
- **Cycle 1 balance: coverage and caps met.**
  - 14/14 topics published; 88 (at `3177819^`) → 102.
  - Maximum domain share 5/14 = 35.71 %.
  - Empty + Seeded domains 12 → 10; empty subcategories 42 → 39.
  - Three paths at 100 % (verified step by step); no path regressed.
  - Developing counts unchanged; no Cycle 1 entry below target.
- **Cycle 1 decision: IMPROVEMENT REQUIRED.**
  - The § 9.3 stop rule was triggered by Batch 1: constraints 5 rework commits, feedback-principle 2, interaction-states 2.
  - I1's coveredBy checks were not done.
  - Clusters A and E must be touched in Cycle 2.
- QA on the corrected tree: check 586; taxonomy pass; build 995/995; e2e-redesign 66/66; axe 0; Batch 3 page review 40/40; integrity clean. Other suites inherited from `80f8058`. Screen readers, devices and expert review untested.
- Not pushed. No Cycle 2 topics selected.

## Session 51 — push, I1 coveredBy checks, improvement-cycle proposal (D-129)
- Owner decisions: Cycle 2 begins with an improvement-only batch (§ 9.3); I1 authorised; push of `80f8058`, `8c7408e`, `a7c4937` approved.
- Pushed to `claude/batch1-constraints`: remote HEAD `a7c4937`, main `b788511` unchanged, PR #2 open and unmerged at `a1f6373`. Vercel preview `dpl_G9B261VEd9eSqztEpDJpfuhJqShK` READY.
- I1: 13 candidates (reconciled; first report said 10, plan marks 9, owner's 11 matches no list). 8 applied (`coveredBy`), 5 deferred and left planned (`empty-state-writing`, `state-transitions`, `utility`, `usefulness`, `desirability`). Addressed within 10 → 18; published unchanged (102). Table and reasons: docs/CONTENT_AUDIT.md session 51.
- Proposal: docs/CYCLE_2_IMPROVEMENT_PROPOSAL.md (priorities, 5 items; nothing started).
- QA: check 586, taxonomy pass, build 995/995 (rerun after the CLI notice), Atlas 36/36; other suites inherited.
- I1 commit is local only.

## Session 52 — push of the I1 commit, coveredBy reconciliation, Improvement Batch 1 scope (D-129)
- Pushed `9931f1a` (owner-approved): remote HEAD = local HEAD; Vercel preview `dpl_E8tGMEEDuf7MG5ec9FMhGV2WkLUU` READY; `main` `b788511` and PR #2 (`a1f6373`, open) unchanged.
- coveredBy reconciled: 13 candidates, 8 applied, 5 deferred (table in docs/CONTENT_AUDIT.md session 51). No taxonomy change in this session.
- Prepared docs/CYCLE_2_IMPROVEMENT_BATCH_1_SCOPE.md: five items, acceptance criteria and verification plan. Deferred items recorded as DEF-1…3 in docs/OPEN_ISSUES.md. Nothing implemented.

## Session 53 — Cycle 2, Improvement Batch 1 implemented (D-129)
- Pushed `7c34436` on approval (remote HEAD = local; preview `dpl_DetaPwZHJtB6Kgxn6wEiLNaD5Ktv` READY; `main` `b788511` and PR #2 `a1f6373` unchanged).
- Implementation commit `3d5aa38` (local, not pushed): `mapping` evidence points separated (closed); `usability-testing` citation retargeted to the DOI-verified 1980 paper (closed); `plain-language` Easy Read sourced from the Inclusion Europe standards (closed); Editorial: `shneiderman-golden-rules-page`, `kieras-2001-klm`, `doherty-thadani-1982` read and verified with limits (3 entries closed); `brooke-2013` unreadable (SUS stays developing); `heart-framework` has no second primary source (reported, not forced).
- Measured: evidence target 100 → 101 of 102; Editorial complete 98 → 101.
- New findings N-1…N-3 in docs/OPEN_ISSUES.md. Report: docs/CYCLE_2_IMPROVEMENT_BATCH_1_REPORT.md. The formal review is not yet written.

## Session 54 — Improvement Batch 1 accepted with corrections (D-129)
- Owner review (2026-11-17): batch accepted; five limited corrections made in `35cf36b`: HEART (two independent sources read and added as explanatory; target still unmet, gap documented, class unchanged); SUS (unsupported Brooke 2013 attribution removed); Doherty lead (400 ms presented as a commonly repeated interpretation); Ericsson–Simon follow-up kept as N-2; report and records updated.
- Measured: evidence target 101 of 102; Editorial complete 101. Published 102; sources 495.
- Commits (all on `claude/batch1-constraints`): `3d5aa38` implementation, `5d9e804` progress records, `35cf36b` corrections, plus the records commit that follows this entry. Pushed on the owner's authorisation: remote `d01dcc2`, preview `dpl_E2nXhv9rgnPWiMkwtTkVfkBu9LCt` READY, `main` `b788511` and PR #2 `a1f6373` unchanged.
- Not started: any further improvement batch or Cycle 2 topic.

## Session 55 — Improvement Batch 1 closed; consolidated improvement plan prepared (D-129)
- Pushed `47f4fbe` (owner-approved): remote HEAD = local; `main` `b788511` and PR #2 `a1f6373` unchanged.
- Improvement Batch 1 formally closed: accepted with documented limitations (HEART target unmet, Brooke 2013 unverified, Doherty details unconfirmed, plate markers untouched, no screen-reader/device/expert testing). All remain in docs/OPEN_ISSUES.md.
- Prepared docs/CYCLE_2_IMPROVEMENT_PLAN.md (IB2–IB4, working protocol to avoid review loops) for a single approval. Nothing started.

## Session 56 — Cycle 2, IB2 implemented and reviewed (D-129)
- Plan `docs/CYCLE_2_IMPROVEMENT_PLAN.md` approved; `9d41b83` pushed (remote HEAD = local; `main` and PR #2 unchanged).
- IB2 `2216116`: Practice 102/102 complete; Ericsson–Simon 1993 citations retargeted; Brooke 1996 and Shneiderman 1982 read; access attempts recorded for five abstract-only sources; five reciprocal relations; WCAG record note. Review: docs/CYCLE_2_IB2_REVIEW.md — PASS WITH DOCUMENTED LIMITATIONS.
- Next: IB3 (five detailed diagrams, methods).

## Session 57 — Cycle 2, IB3 implemented and reviewed (D-129)
- IB2 pushed (`6c6fefb`). IB3 `8863945`: five Level-2 figures (usability-testing, cognitive-walkthrough, card-sorting, ab-testing, keystroke-level-model); visual target 92 → 97 of 102. Review: docs/CYCLE_2_IB3_REVIEW.md — PASS WITH DOCUMENTED LIMITATIONS.
- Next: IB4 (five figures: atomic-design, jobs-to-be-done, gulfs-of-execution-and-evaluation, working-memory-model, heart-framework), then one consolidated Cycle 2 improvement report.

## Session 58 — Cycle 2 improvement phase complete (IB2–IB4) (D-129)
- IB3 pushed (`c31dc36`). IB4 `4f844f5`: five Level-2 figures (atomic-design, jobs-to-be-done, gulfs-of-execution-and-evaluation, working-memory-model, heart-framework); D-129 visual target 102/102. Review: docs/CYCLE_2_IB4_REVIEW.md — PASS WITH DOCUMENTED LIMITATIONS.
- Consolidated report: docs/CYCLE_2_IMPROVEMENT_REPORT.md (visual 102/102, Practice 102/102, evidence 101/102, Editorial 101/102).
- The stop rule's improvement-only phase is done. No new topics selected.

## Session 59 — error-fix pass (owner request 2026-11-18)
- Ran the project workflow skill; no GitHub Actions workflows exist, so there was no failing CI. Errors found by audit and a site-wide plate sweep, fixed in `732077a`: Next.js security advisory (16.4.6), 152 clipped plate markers (fixed at the marker primitives), two plates with text under 10 px, one clipped label, duplicated numbering in Level-2 text versions, and a stale e2e expectation.
- All suites rerun (dependency change): check 588, build 995/995 first time, e2e 44, e2e-redesign 66, atlas 36, keyboard 45, devices 155, colour-studio 46, crawl 0, axe 0; npm audit 0.

## Session 60 — explorer labels fixed; Claude Design brief
- TD-5 fixed: explorer and dimension labels at `T.min`; Fitts labels stay inside the canvas at every slider value. Suites rerun (see ledger); site-wide plate sweep clean.
- Added docs/UX_ACADEMY_FOR_CLAUDE_DESIGN.md: one-file brief of the product, IA, tokens (light, dark, subject palettes), type, components, templates, illustration system, accessibility and content model, for designing live in Claude Design. Keep it in step with app/globals.css.

## Session 61 — Cycle 3 production, B6 topic 1: information foraging theory
- D-131 recorded (`7019450`); Cycle 3 pre-production checks recorded (`2225d1c`); owner authorised B6, first topic only.
- Published `information-foraging-theory` (103 published): entry, 6 sources (2 read in full, 4 abstracts), plate, Level-2 figure, practice (5 quiz, 3 exercises, 4 flashcards), relations to IA, tree testing, discoverability, plain language and information scent; back-link from `information-architecture`. Long-DOI wrap fix in `components/entry/references.tsx`. All suites rerun (ledger).

## Session 62 — Domain 1, UX & UI Fundamentals, completed (owner request 2026-11-19, D-132)
- Five batches, one commit each: `aa1311c` (usefulness, desirability; utility within usefulness), `218bb3d` (design thinking; feasibility and viability within it; human-centred design within user-centred design), `5a2678c` (design processes, UX lifecycle, UX maturity), `9eb3675` (product design, experience design), `55dc927` (history of interface design, evolution of digital experiences; history of HCI within HCI).
- Domain 1: 16 published, 5 addressed within, 0 planned (21/21). Site: 113 published, 23 addressed within. Ten plates, one Level-2 figure (`design-thinking.lenses`), 28 new sources in `content/sources/fundamentals.ts`.
- Each batch: sources verified, targeted checks, one focused review, one correction pass; no critical or major findings left open. Minors D1-2 to D1-5 in OPEN_ISSUES.

## Session 63 — Cycle 3, B6 topic 2: information scent
- Published `information-scent` (114 published): concept entry centred on scent as a pre-click estimate relative to a need; components (label, accompanying text and image, context, prior knowledge, social traces); expert/newcomer difference; mobile context; click bait; evaluation by task success and expectation match rather than click-through. Plate, register record, quick takeaway. All sources reused; Furnas et al. 1987 abstract read.

## Session 64 — B5 topic 1: default effect
- Published `default-effect` (115 published): defaults as decisions on inaction; opt-in, opt-out and active choice; effort, endorsement and reference dependence; distinction from status quo bias; the retirement, organ-donation and meta-analytic evidence with their limits; digital harms and remedies; an academy classification (beneficial, operational, commercial, manipulative) and seven review questions; evaluation beyond the keep rate. Plate in new `decision-sheets.tsx`; six sources.

## Session 65 — deployment and status reconciliation
- Found why production shows 6 of 21 for Domain 1: Vercel's production deployments come from the old `claude/pensive-cannon-t1o6sy` branch, never from `main`, and `main` lacks PR #3 (DEP-1).
- Domain page, coverage bar and coverage table now separate published, addressed within and planned; the taxonomy-doc generator marks addressed-within topics with their host (D1-3 closed).

## Session 66 — production release verified
- PR #3 merged into `main` (`9a51aa6`); the owner set Vercel's Production Branch to `main`. Production deployment `dpl_77Bpw7KyrCPPEEeHf5mMLcVYLwT7` built from `main` at `9a51aa6`, READY, serving ux-academy-eight.vercel.app.
- Live checks (Playwright, 390 and 1440 px): four routes 200, no overflow, axe 0, no page errors. Domain 1 on production: 16 published, 5 addressed within, 0 planned, 21/21 accounted for; subcategories 10/3, 4/1, 2/1; five host links resolve to the right entries. DEP-1 closed.

## Session 67 — Domain 1 audit and targeted improvements
- Inspected all 16 entries, the five addressed-within concepts, the glossary and the three fundamentals paths. Gates and D-129 targets were already met; fixes made only where a defect was found: D1-2 (ISO 9241-11 cited in HCI); 'Illustrative scenario' labels in HCI, Usability, UX and UCD; human-centred design taught and quizzed in UCD; seven relations (UX → experience design and product design; HCI → interaction design and evolution of digital experiences; usability → usefulness; design thinking → design processes; UCD → UX maturity); 13 glossary terms.
- Path findings for the owner (no path changed): D1-7, the HCI path shows History of HCI and Human-Centred Design as 'in development'; D1-8, the UX path uses only 4 Domain 1 entries, the UI path omits interaction design, the HCI path omits the two history entries.

## Session 68 — D1-7: addressed-within concepts on learning paths
- Path pages, cards and the curriculum map now classify each step from the taxonomy's `coveredBy`: lessons, concepts explained within other lessons ('Explained within {host} →', linking to the host's lesson in the same path), and steps in development. Three steps in two paths were affected. Lesson numbering, progress, completion and path data unchanged.
- QA: check, build, e2e, e2e-redesign (glossary count updated for the 13 new terms), keyboard, devices, direct checks at 390 and 1440. Pre-existing axe landmark finding on the desktop sidebar logged as A11Y-1.

## Next task (precise)
Owner: review the D1-7 commit; decide D1-8 (path recommendations) and A11Y-1. Content candidates awaiting approval: `loss-aversion`, `findability`.
