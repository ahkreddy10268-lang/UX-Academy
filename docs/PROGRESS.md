# Progress register

_Last updated: 2026-11-04 (session 15 — Tier 1 entry: User Interface Design)_

## State

Figures are generated from the content; the live source is `docs/CONTENT_COVERAGE.md` (and `docs/RESEARCH_SOURCES.md`). Snapshot after session 15 (previous snapshot: 48 published, 8.6%):

| Area | Count |
|---|---|
| Taxonomy topics (domains / subcategories) | 558 (20 / 73), taxonomy v1.0 frozen |
| Published entries (all gates pass) | 49 (8.8% of topics) |
| Addressed within another entry / planned with no content | 10 / 499 |
| Domains with no published entry | 6 |
| Explained graph relationships | 392 |
| Formulas with unit-tested calculators | 25 |
| Interactive labs | 15 |
| Quiz questions / exercises / flashcards | 188 / 140 / 149 |
| Sources (DOI-verified / URL-reachable) | 280 (165 / 74) |

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

## Session 9 — content first (owner priority update)

**Priority change recorded:** knowledge completeness and educational quality are the primary objective; visual work continues only where it solves a usability, accessibility or educational-communication problem.

**Published: `human-computer-interaction`** (Tier 1, discipline; domain Fundamentals / Core concepts)
- Six new sources, each resolved against Crossref (`npm run sources:verify`): Hewett et al. 1992 (SIGCHI curriculum definition), Licklider 1960, Weiser 1991, Grudin 2005, Bødker 2006, Harrison/Sengers/Tatar 2011. Registry sources reused: Card/Moran/Newell 1983, Norman & Draper 1986, Shneiderman 1983. Claims about each source are restricted to what its abstract/bibliographic record supports; nothing about first-wave human factors is attributed to a source that does not state it.
- All three levels, origin, application in four contexts, 4 misconceptions, 10 relations, 3 exercises (one per level), 7 quiz questions (2 / 2 / 3 per level, so lessons have level-matched practice), 4 flashcards.
- Visuals: original plate (L1, `human-computer-interaction`) and one L2 conceptual figure, "Three lenses on the same interaction", built from existing primitives. No explorer: nothing here is genuinely interactive.
- Added to `hci-fundamentals` as a new first stage ("What HCI is": HCI, usability); path completeness is reported in docs/CONTENT_COVERAGE.md.
- Not claimed: `history-of-hci` stays **planned** (the entry gives an orientation, not a history); the first-wave/second-wave attributions are the cited authors' framings, labelled as such.

**Status model and completion reports (D-056, D-057)**
- Every topic has exactly one of six statuses (planned · research in progress · drafted · quality reviewed · published · addressed within another entry), derived from the entry status, `content/topic-ledger.ts` (research without an entry yet) or taxonomy `coveredBy`. Shown on `/coverage` and in docs/CONTENT_COVERAGE.md by domain and subcategory.
- Completion by dimension (research done, explanation, evidence, practice, visual, editorial) by domain and subcategory, empty subcategories and domains, and learning-path completeness (published lessons vs planned steps) — all computed, none typed.

**Verified:** 166 unit tests, lint and typecheck clean, `npm run build`, e2e / e2e-redesign / keyboard / devices suites (see docs/VISUAL_QA.md Session 9), source verification for the six new DOIs.

**Honest status of the ten-tier programme:** Tier 1 now has `user-experience` and `human-computer-interaction` (2 of 8). 482 topics are still planned; this session added one entry. The pace is set by research and verification per entry, not by tooling.

## Next task (precise)

1. Write `ui-design` (Tier 1, docs/CONTENT_AUDIT.md §6): sources Norman 2013 and Shneiderman 2016 (both in the registry), plus any bibliographic source verified first; L2 *annotated interface*; critique exercise on a real screen. Record it in `content/topic-ledger.ts` as `research-pending` the moment sources are gathered.
2. Then `interaction-design-discipline`, `accessibility-concept`, `inclusive-design`, `design-thinking`, `human-centred-design` (rest of Tier 1), and the level-matched practice gaps listed under Session 8.
3. Remaining Tier-1 paths: add each new lesson to its path as it is published; identify prerequisites that are still planned.

## Session 10 — Human-Computer Interaction audit and extension (uncommitted until authorised)

**Audit finding.** The first version defined HCI correctly and cited it carefully, but it was thin on history, contributing disciplines, the human and technology sides, research methods and contemporary issues; carried an unnecessary `usability` prerequisite that contradicted the path order; labelled a discipline `established-theory`; had one L2 figure; and its path leaned on performance models.

**Changed (D-059…D-062).** Entry deepened in place at all three levels (history separated into events and interpretations, nine contributing disciplines, human and technology sides, eight method families, contemporary human-AI questions), 13 quiz questions across all levels (4 / 4 / 5 beginner / intermediate / advanced) and 7 exercises, 8 flashcards, 33 references, 28 explained relations to canonical slugs. 17 new sources: 11 DOI-verified or URL-reachable; 6 books are bibliographic (ISBN) and are flagged as such. `hci-fundamentals` rebuilt in four stages (same id). Six L2 figures + one L3 method selector. `tests/hci.test.ts` added.

**Not done / honest limits.** `history-of-hci`, `goms`, `seven-stages-of-action`, `human-centred-design`, `contextual-inquiry`, `participatory-design`, `distributed-cognition`, `activity-theory`, `situated-action`, `human-ai-interaction`, `prototyping` and the other path steps remain **planned**: the path shows them as in development, so the path is not yet a complete course (see path completeness in docs/CONTENT_COVERAGE.md). The CMU HCII page and Carroll's overview were read through a summarising tool, so statements attributed to them are limited to what that summary reported and are marked as one source's account. Engelbart 1962 was checked only as a reachable URL; its content is not described beyond its title. Books were not machine-verifiable. The paradigm and system explorers were not built (D-062). Axe, real devices and screen readers were not run.

## Next task (precise)
`ui-design` (Tier 1), then the dependent planned steps of `hci-fundamentals` in path order: `history-of-hci`, `seven-stages-of-action`, `human-centred-design`, `contextual-inquiry`, `goms`.

## Session 11 — illustration system v5 (learning-path artwork)

Done: audit of the old path art; illustration system documented (docs/ILLUSTRATION_SYSTEM.md § Editorial technical system: canvas, fit, projection, strokes, surfaces, colour roles, composition, figures, annotation, motion, accessibility, 16 path briefs, recorded exploration); shared kit `components/illustrations/system/kit.tsx`; `--ill-*` roles in `app/globals.css`; 16 new path scenes (`components/learn/art/`), measured fit (`scripts/render-path-art.tsx --measure`); family C layer explorer on two path pages; test that every path has a scene and a fit. Decisions D-063…D-065.

Not done / limits: the Designer Skills plugins (owl-listener/designer-skills) are **not installed** in this environment and `/plugin` commands cannot be run from here, so they were not used (the installed `visual-critique`-style review was done by hand against the brief's ten criteria). Hairline was studied, not installed. Concept plates (family B) were not redrawn in the new style; the kit is ready for that. Human figures are simplified editorial figures, not detailed portraits. Axe, real devices and screen readers not run.

Next: redraw the highest-traffic concept plates (Fitts's law, HCI, User Experience) with the kit where it improves explanation; then return to content (`ui-design`, docs/CONTENT_AUDIT.md §6).

## Session 12 — illustration v5.1 and the knowledge-plate pilot (uncommitted until authorised)

Done: eight path scenes recomposed (UX Fundamentals close-up loop, Accessibility with four access routes and assistive technology, Usability Engineering evidence close-up, Product Strategy and Advanced UX Metrics object studies, Cognitive Psychology network with top-down links, Design Systems traced lineage, Interaction Design closed loop); rooms reduced to two; fits re-measured. Five concept plates redrawn in the kit (HCI, CLT, Fitts, Mental Models, Usability Testing) and swapped in place. Rules, pilot table and rollout strategy in docs/ILLUSTRATION_SYSTEM.md; D-066…D-068.

Verified: axe (WCAG 2.0/2.1/2.2 A and AA tags) on 13 routes × light/dark = 26 audits, 0 violations; unit 177; e2e 42/42; e2e-redesign 66/66; keyboard 45/45; devices 155/155; build clean; screenshots of /learn at 1440, 820 and 390 px in both themes and the five plates at real size.

Not done: real devices and screen readers (not available here); Designer Skills plugins still not installed (needs the owner to run `/plugin` in Claude Code); Hairline studied, not installed; the other 66 plates remain in the earlier style; Vercel still blocked (api.vercel.com 403 from this container; no token).

Next: migrate the plates on HCI and UX Fundamentals stage 1 (usability, user-experience, user-centred-design, double-diamond) following the rollout gate; then return to content (`ui-design`).

## Session 13 — logo kit v0.1 (draft) adopted

Done: kit added at `brand/uxa-logo-kit-v0.1-draft/`; `components/brand/uxa-logo.tsx` (from the kit; one lint fix, `prefer-const`; default title "UX Academy"); sidebar and mobile top bar use the symbol; `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `app/manifest.webmanifest`, `public/icons/*`; brand section in docs/DESIGN_SYSTEM.md; CLAUDE.md logo rule; D-069.

Open: the kit is a draft pending approval (geometry, X diagonals, wordmark typeface, hyphenated "UX-Academy" vs product name "UX Academy").

## Session 14 — taxonomy v1.0 finalised and frozen

Source: the owner's blueprint (`docs/PROPOSED_TAXONOMY_V1.md`), reviewed against the repository. Full decisions in docs/CONTENT_AUDIT.md § 7; backlog in docs/TAXONOMY_BACKLOG.md; governance in docs/CONTENT_MODEL.md; D-071…D-074.

- **Structure:** 20 domains (ids unchanged), 62 → 73 subcategories, 540 → 558 topics (+23 added, −5 merged duplicates). Domain 3 retitled "Cognition, Behaviour & Human Factors", Domain 6 "Design Methods & Frameworks".
- **P1 candidates:** 17 added, Conversation Design kept as an alias of `conversational-ux`. Six more gap additions (models of disability, motor control, controlled experiments, ideation techniques, workshop facilitation, UX engineering).
- **Ownership:** product frameworks → 14, journeys and blueprints → 15, HEART/AARRR/instruments → 16, accessibility foundations → 12, interaction principles → 8, colour theory → 10, DesignOps → 20. Six published entries re-homed (slugs and routes unchanged, metadata matches).
- **Code:** `content/taxonomy.ts` regenerated in its original notation with `aliases`; `aliases` added to the taxonomy schema, search and the generated taxonomy doc; `tests/taxonomy.test.ts` (9 tests).
- **Coverage:** 48 of 558 topics published (8.6%; the share fell only because 18 net topics were added), 10 addressed within, 500 planned, 6 domains without a published entry (Product gained one).

Not done: no new entries were written (by design); real devices/screen readers n/a; Vercel still blocked.

## Next task (precise)
Resume Tier 1 content with `ui-design`; then the dependent HCI Fundamentals steps (`history-of-hci`, `seven-stages-of-action`, `human-centred-design`, `contextual-inquiry`, `goms`). Any structural change now goes through the taxonomy governance rules.

## Session 15 — Tier 1: User Interface Design (uncommitted; awaiting owner review)

Done: `content/knowledge/foundations/ui-design.ts` published (discipline, foundations/core-concepts, beginner). Three levels; history from Sketchpad and NLS to direct manipulation, the GUI, the web, touch and conversational interfaces; boundaries with UX, HCI, interaction design, visual design, IA and design systems; web, mobile, enterprise and services contexts; 7 misconceptions; 16 relations; 9 quiz questions (3 per level), 3 exercises (one a ten-point critique of a real screen with an Observation / Impact / Reasoning / Improvement / Trade-off template), 7 flashcards; 15 references. Source added: `galitz-2007` (bibliographic, ISBN 978-0-470-05342-3; publisher URL reachable), cited only for the scope of UI design. `norman-2013` and `shneiderman-2016` reused at their existing status (not upgraded).

Visuals: Level-1 plate `uiDesignPlate` (editorial-plates.tsx: user, task bubble, interface panel, layered system with input and feedback arrows, context boundary), checked in light and dark at card and hero size. Level-2 annotated interface `ui-design.annotated` (fictional study-room booking screen; hierarchy, location, controls and signifiers, content presentation, states not carried by colour alone, feedback, focus/labels/targets, each with "If broken"). No Level 3 (D-075): visual maturity is therefore "developing".

Paths: `ui-design` added to UX Fundamentals stage 1 after `user-experience`; UI Fundamentals gains a first beginner stage "Interface foundations" (ui-design, signifiers, feedback-principle, affordances) and one objective. Research ledger row added then removed once the entry existed.

Verified: content:index; sources:verify galitz-2007 (url-reachable); check (186 tests, typecheck, lint); docs:generate; build; e2e 42/42; e2e-redesign 66/66 (diagram-filter count updated 8 → 9); keyboard 45/45; devices 155/155; axe on /library/ui-design, /paths/ux-fundamentals, /paths/ui-fundamentals, /library: 0 violations; crawl: 0 problem pages.

Maturity (ui-design): explanation complete · evidence complete · practice complete · visual developing · editorial complete.

## Next task (precise)
Tier 1: `interaction-design-discipline` — add and verify Cooper et al. *About Face* and Preece, Sharp & Rogers *Interaction Design* (bibliographic, ISBN) first; L2 *system* (user ⇄ system loop).
