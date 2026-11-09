# Progress register

_Last updated: 2026-11-09 (session 23 — site-wide redesign v4, AI UX pattern library, design-system docs, resources, learning areas)_

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

## Session 16 — Tier 1: Interaction Design (uncommitted; awaiting owner review)

Done: `content/knowledge/foundations/interaction-design-discipline.ts` published (discipline, foundations/core-concepts, beginner). Built around the interaction loop (goal → intention → action → processing and state change → feedback → perception → evaluation → next action), labelled as a conceptual model. Beginner: interaction, the loop, signifiers/feedback/mapping/constraints, five everyday examples, ten vocabulary terms. Intermediate: goals and tasks, states and transitions, feedback and timing, execution cues, direct manipulation and its limits, sequence and recovery, input modalities, prototyping and evaluation; seven how-it-works steps, six implementation points, two illustrative scenarios. Advanced: relation to HCI, plural foundations (human factors, cognitive HCI, action cycle, situated action), conceptual models, evidence classes, four trade-offs, limits of patterns, contemporary systems; six evidence items, four debates, three alternative models. Origin with attribution note (no single founder; the date the term came into use is given only as a period). Web, mobile, enterprise, physical/service and emerging contexts; a ten-step workflow with outputs; 6 when-to-use, 4 when-not-to-use, 5 limitations, 8 misconceptions; 24 explained relations (including direct-manipulation, feedback-principle, mapping, constraints). Practice: 9 quiz questions (3 per level), 3 exercises (beginner loop mapping; intermediate **design a feedback loop for a payment** with criteria and a model answer covering success, timeout and decline; advanced comparison of direct manipulation and scanning for a ward medication round), 8 flashcards. 28 references.

Sources: `cooper-reimann-cronin-noessel-2014` (About Face, 4th ed., Wiley 2014, ISBN 978-1-118-76657-6; Csizmadi and LeMoine recorded as contributors in the notes, not as authors) and `rogers-sharp-preece-2023` (Interaction Design: Beyond Human-Computer Interaction, 6th ed., Wiley 2023, ISBN 978-1-119-90109-9; the publisher page titles it the 6th edition, so the 6th-edition URL is recorded rather than the '7th-edition' slug). Both `verification: "bibliographic"`; `sources:verify` result for both: url-reachable. Neither was read in full; they are used for the scope of the discipline only. Reused existing records at their existing status. Moggridge's *Designing Interactions* was considered for the origin of the term but not added: the publisher page could not be fetched (HTTP 403), so the claim stays unsourced and is not made.

Visuals: Level-1 plate `interactionDesignPlate` (person and machine on two platforms joined by an action arc and a feedback arc; visible state lights; goal bubble), checked in light and dark at card and hero size. Level-2 system diagram `interaction-design-discipline.loop` (person and system columns, input and output channels, "hidden from the person" note, annotated timeout failure point, 9 → 2 return), content-checked, reviewed at 1440, 820 and 390 px and in dark theme. No Level 3 (D-078).

Path: the existing `interaction-design` path (id unchanged) now has four stages: Foundations of interaction design (new; this entry first), Principles and behaviour (adds mapping, constraints, direct-manipulation), Performance models (unchanged), Complexity, states and recovery (adds state-transitions, error-recovery). Summary and objectives updated. Research ledger row added once the sources were gathered, then removed when the entry existed.

Verified: content:index; sources:verify for both new ids (url-reachable); check (186 tests, typecheck, lint); docs:generate; build (876 pages); e2e 42/42; e2e-redesign 66/66 (diagram-filter count updated 9 → 10); keyboard 45/45; devices 155/155; crawl 0 problem pages; axe on /library/interaction-design-discipline, /paths/interaction-design, /library, /learn: 0 violations. Not done: real devices and screen readers (not available here).

Maturity (interaction-design-discipline): explanation complete · evidence complete · practice complete · visual developing · editorial complete.

## Next task (precise)
Tier 1: `accessibility-concept` — add and verify the WHO *World Report on Disability* and a source for the social model of disability first (WCAG 2.2 is already in the registry); L2 *comparison*; exercise: audit a screen against five criteria.

## Session 17 — Knowledge Atlas and Domains & Topics navigation (uncommitted; awaiting owner review)

Done (D-081): `/topics` rebuilt as the Knowledge Atlas — computed overview figures (domains, subcategories, topics, published, addressed within, planned) with a reconciliation line; "three ways in" links to Learn and the Library; an expandable directory of all domains → subcategories → topics with type, status (text + shape) and destination; addressed-within topics link to and name their covering entry; search over domain names and descriptions, subcategory names, topic titles and aliases, with emphasised matches and a status region; status, knowledge-type and domain filters; URL state `?q=&status=&type=&domain=` with back/forward; expand all / collapse all; a server-rendered domain list before hydration. Sidebar: **Domains & Topics** added first in Explore (`grid` icon, `/topics`, active on domain pages); Knowledge Library now matches `/library` only; collapse button no longer shrinks when the sidebar overflows (found by devices.cjs on iPad landscape). Domain pages: breadcrumb "Knowledge Atlas", per-topic status and covering-entry link for unpublished topics, link back to the atlas filtered to the domain. Footer, search "no results" and 404 links renamed to Domains & Topics / Knowledge Atlas. Taxonomy unchanged.

Files: new `lib/content/atlas.ts`, `lib/content/atlas-filter.ts`, `lib/content/topic-status.ts`, `components/topics/atlas-explorer.tsx`, `components/topics/status-tag.tsx`, `tests/atlas.test.ts`, `tests/browser/atlas.cjs`; changed `app/topics/page.tsx`, `app/topics/[domain]/page.tsx`, `components/shell/nav.ts`, `components/shell/sidebar.tsx`, `components/shell/site-footer.tsx`, `components/search/search-trigger.tsx`, `app/not-found.tsx`, `lib/content/coverage.ts` (status constants moved to `topic-status.ts`, re-exported), docs.

Verified: check (203 tests, including 17 new atlas tests: integrity, counts against the coverage register, status and links, aliases, search, filters, URL parameters, highlighting, navigation); docs:generate (generated reports unchanged: no content changed); build (876 pages; `/topics` static); new browser suite atlas.cjs 36/36 (navigation and active state, collapsed tooltip, mobile drawer, 20/73/558 rendered after expand all, Enter/Space disclosure, search reveal, alias, filters, back/forward, clear, shared URL with invalid parameter, addressed-within link, domain breadcrumb, 390px overflow and 24px targets); e2e 42/42; e2e-redesign 66/66; keyboard 45/45; devices 155/155; crawl 0 problem pages; axe on /topics (plain, searched, addressed filter), two domain pages, /library and / in light and dark: 0 violations. Screenshots reviewed at 1440 (light, dark), 820 and 390 px. Not done: real devices and screen readers.

## Next task (precise)
Tier 1: `accessibility-concept` — add and verify the WHO *World Report on Disability* and a source for the social model of disability first (WCAG 2.2 is already in the registry); L2 *comparison*; exercise: audit a screen against five criteria.

## Session 18 — Tier 1: Accessibility (uncommitted; awaiting owner review)

Done: `content/knowledge/accessibility/accessibility-concept.ts` published (concept, accessibility/foundations, beginner; secondary type principle; evidence class `official-standard` with an evidence note separating normative instruments, conceptual frameworks, official reports and professional guidance, and stating that replication does not apply to treaties, standards or definitions). Beginner: barriers, who meets them, digital and non-digital access, permanent/temporary/situational as a design prompt (not a classification), six examples, a doorway analogy, eight terms. Intermediate: access as an interaction (ICF), five kinds of barrier, POUR as kinds of access, diversity of needs and terminology, assistive technology, universal design vs inclusive design vs reasonable accommodation (CRPD Art. 2), standards and conformance (WCAG 3 labelled a Working Draft), prevention vs retrofit, evaluation methods; two illustrative scenarios. Advanced: medical model; social model from UPIAS and the Disability Alliance (quoted from the 1976 document, with its scope — physical impairment, no "social model" label — and Oliver's role stated as development and naming, not origin); debates about the social model; the ICF and its critiques; the CRPD as a treaty, not a model (Arts 1, 3, 9, 21); how standards, frameworks and rights connect; evaluation limits; trade-offs and prioritisation without making access optional; health inequities (WHO 2022); emerging modalities. Ten-step-plus workflow with purpose, output and common mistakes; application to web, mobile, workplace systems and physical/information/service settings; 10 misconceptions; 5 limitations; 24 relations.

Practice: 9 quiz questions (3 per level), 4 exercises (beginner barrier journey; intermediate **five-criteria screen audit** against WCAG 1.1.1, 1.4.3/1.4.1, 2.1.1, 2.4.7, 3.3.2/3.3.1 with pass / fail / not tested / not applicable, evidence, impact, improvement and limitations, plus a model answer on an original fictional booking page and an explanation of what a screenshot cannot show; intermediate one task, different barriers; advanced analysis through social, ICF and CRPD perspectives), 8 flashcards.

Sources added (`content/sources/disability.ts`): `upias-disability-alliance-1976` (read first-hand in the Leeds Disability Archive PDF: discussion of 22 November 1975, introduction dated November 1976, 1997 reformatted edition by Mark Priestley; definitions on original p. 14) — url-reachable; `oliver-1983` (Macmillan, ISBN 978-0-333-32707-4) — doi-verified by Crossref; `who-icf-2001` (endorsed 22 May 2001, WHA54.21) — url-reachable; `un-crpd-2006` (Articles 1, 2, 3, 9, 21 read first-hand in the UN PDF; the OHCHR and UN DESA pages returned 403 to automated fetches) — url-reachable; `who-world-report-disability-2011` (WHO and World Bank, ISBN 978-92-4-156418-2; 'more than a billion' as a 2011 estimate) — url-reachable; `who-global-report-health-equity-disability-2022` (ISBN 978-92-4-006360-0; 1.3 billion / 16% as the report's estimate) — url-reachable. Reused: `w3c-wcag-22`, `w3c-understanding-wcag-22`, `w3c-wcag-overview`, `w3c-wcag-3-wd`, `iso-9241-11-2018`.

Visuals: Level-1 plate `accessibilityPlate` (shared platform for participation; steps labelled "barrier for some"; ramp and landing labelled "support for all"; two people meeting; a person using a kiosk with captions; badges for captions, speech, braille and keys), checked light/dark, card/hero. Level-2 comparison `accessibility-concept.perspectives` (medical, social and ICF on five questions; the CRPD as a separately styled rights lens marked "Not a fourth model"; an illustrative captions case read through each lens), content-checked, reviewed at 1440 (light/dark), 820 and 390 px; accessibility tree reads in order (region per perspective, term/definition pairs). The generic label for `comparison` figures changed from "Before and after" to "Comparison" (it mislabelled this figure; still accurate for the existing three). No Level 3 (D-082).

Path: the existing `accessibility` path (id unchanged) now begins with this entry: Accessibility foundations (accessibility-concept, wcag, pour, conformance-levels, colour-contrast-ratio), Accessible implementation, Disability, inclusion and evaluation; summary and objectives rewritten. Research-ledger row added once sources were gathered, then removed.

Verified: content:index; sources:verify for the six new ids (results above); check (203 tests, typecheck, lint); docs:generate; build (877 pages); atlas 36/36; e2e 42/42; e2e-redesign 66/66 (diagram-filter count updated 10 → 11); keyboard 45/45; devices 155/155; crawl 0 problem pages; axe on /library/accessibility-concept, /learn/accessibility, /topics/accessibility (light and dark): 0 violations. Not done: real devices and screen readers.

Maturity (accessibility-concept): explanation complete · evidence complete · practice complete · visual developing · editorial complete.

## Next task (precise)
Tier 1: `inclusive-design` — add and verify the Microsoft Inclusive Design toolkit (professional) and Clarkson et al. *Inclusive Design* first; L2 *conceptual* (permanent / temporary / situational, labelled as a design prompt); persona-spectrum exercise.

## Session 19 — illustration v6: dark technical editorial system (uncommitted; awaiting owner review)

References: five of the six supplied images were available (01 isometric architecture, 02 product-swap flow, 03 retention decision flow, 04 agent-runtime hero, 05 editorial problem section) and are kept git-ignored in `.local/visual-style-references/`; 06 (analytics dashboard) was not supplied, so its direction comes from the written brief only.

Done (D-086…D-088): `--viz-*` token namespace (dark in both themes, contrast-gated in tests/tokens.test.ts; `.viz` remaps the v5 `--ill-*` roles; glow and route classes; `.viz-panel`); `components/illustrations/system/viz.tsx` kit (VizDefs/VizCanvas, Slab with base/lit/glass/dim states and plane labels, ContactShadow, Bloom, Guides, Route/isoRoute/roundedPath with accent/positive/blocked/neutral kinds and dot/cross/arrow terminals, Junction, ModuleCard, Tag, Brackets, Callout); `IllustrationEntry.canvas` and `ArtProps.uid`; `Plate` renders the viz canvas. Pilot: accessibility L1 rebuilt in `concepts/viz-plates.tsx` (exploded service with lit accessibility tree, five access-channel routes, one blocked switch route, announced-status callout; the old platform/ramp/figures plate removed); accessibility L2 rebuilt as a dark scenario-branching comparison with a separate rights band and legend (content unchanged). New tests: v6 files contain no colour literals; v6 plates do not use `Figure`; the pilot plate uses the viz canvas; viz tokens pass contrast and are theme-independent. `docs/ILLUSTRATION_COVERAGE.md` now records each plate's style (1 of 74 in v6). Docs: ILLUSTRATION_SYSTEM § Dark technical editorial (art direction, tokens, kit, families, rules, quality gate, migration order), DIAGRAM_DESIGN_GUIDELINES, VISUAL_KNOWLEDGE_SYSTEM, CLAUDE.md.

Verified: check (214 tests, typecheck, lint); docs:generate; build (877 pages); atlas 36/36; e2e 42/42; e2e-redesign 66/66; keyboard 45/45; devices 155/155; crawl 0 problem pages; axe on /library/accessibility-concept, /library, /learn/accessibility, /topics/accessibility and / in light and dark: 0 violations. Rendered and inspected: the plate at card and hero size on light and dark page themes (render-plates sheet and 2× crops), and the plate inside a light-theme card grid; the L2 figure at 1440 px (light and dark page themes), 820 px and 390 px; accessibility-tree snapshot of the L2 figure (regions per lens, term/definition pairs in visual order).

Not done: migration of the other 73 plates and their Level-2 figures (ordered list in docs/ILLUSTRATION_SYSTEM.md § Migration); real devices and screen readers.

## Next task (precise)
Migrate the UX Fundamentals stage-1 plates to v6 one at a time, starting with `usability` and `user-experience` (family 3 infographics) and `ui-design` (family 1 exploded interface layers), each with its Level-2 figure; then resume Tier 1 content with `inclusive-design`.

## Session 20 — Visual Learning System (committed ee95a29)

Inspected: all 16 supplied references (extracted to `.local/visual-style-references/`, git-ignored; the five copies made in session 19 were replaced by the archive's originals), the Hairline README/site/docs/skills pages, NN/g's F-pattern article, component.gallery, Mobbin and Refero Styles (Apple HIG and refero.design returned no readable content). Rendered and reviewed all 74 registered plates as contact sheets; inventoried 21 Level-2 figures, 9 plate explorers and 14 entry labs.

Done (D-089…D-092): three-dimension architecture — `components/illustrations/visual-taxonomy.ts` (12 categories, 5 methods, `METHOD_FOR_TYPE`, techniques, canvases) and `visual-register.ts` (one audited record per plate: category, secondaries, method, verdict retain/refine/replace with a reason); `VisualExplanation.method` (optional). New instructional `sheet` canvas (`.sheet` maps the Hairline tone roles onto app tokens; `system/sheet.tsx` kit: SheetCanvas, UiFrame, UiText, UiButton, UiField, UiChip, Measure, Marker, Verdict, Note, Pointer). `Slab` refined to Hairline construction (unstroked faces, one silhouette, quieter creases). Six pilots migrated individually, legacy definitions removed: Fitts's law (sheet; ID computed by lib/formulas; explorer kept; hero animation kept along the measured path), UI design (sheet), Double Diamond (sheet), information architecture (viz), interaction design (viz), accessibility (viz, refined). `docs/ILLUSTRATION_COVERAGE.md` now generates the per-category table with maturity, the method table, the full plate audit and the Level-2 list. Tests: 12 categories / 5 methods, one register record per plate and none extra, valid categories and methods, a method for every Level-2 figure, "retain" in the earlier style only where the audit says so. Docs: ILLUSTRATION_SYSTEM § Visual Learning System (dimensions, canvases, Hairline adopted/adapted/not used, reference catalogue with gaps, rules, anti-patterns, migration/QA procedure, pilots), DIAGRAM_DESIGN_GUIDELINES (Level-2 standard), VISUAL_KNOWLEDGE_SYSTEM, DESIGN_SYSTEM, CLAUDE.md.

Audit result (generated): 74 plates — 6 in the current system, 68 in the earlier pastel style; verdicts 8 retain (6 pilots, confidence-intervals, serial-position-effect), 58 refine, 8 replace (mental-models, affordances, signifiers, usability-testing, usability, user-experience, human-computer-interaction, wcag). Category gaps: Responsive & Adaptive has no figure; Wireframe & Prototyping, User Research, Visual Design, Design Systems and Evaluation are weak.

Verified: check (219 tests, typecheck, lint); docs:generate; build (877 pages); atlas 36/36; e2e 42/42; e2e-redesign 66/66 (after restoring the Fitts hero animation it had caught missing); keyboard 45/45; devices 155/155; crawl 0 problem pages; axe on the six pilot entries, /library and / in light and dark: 0 violations. Rendered: the six pilots at card and hero size in both page themes, and their hero plates inside the app at 1440, 1024, 820 and 390 px in both themes. Not done: real devices and screen readers; Level-2 restyling beyond accessibility; migration of the other 68 plates.

## Session 21 — the eight "replace" plates (committed c35177d)

Done (D-093): mental-models, affordances, signifiers, usability-testing, usability, user-experience, human-computer-interaction and wcag redrawn one at a time on the `sheet` canvas (`components/illustrations/concepts/foundation-sheets.tsx`), each read against its entry first, then rendered and corrected (label collisions, leader routing, a step count that did not match its drawn route, text overflowing a box). Swapped in place with slugs, order and explorers (`signifiers`, `hci-methods`) unchanged; the legacy definitions and their unused imports removed from `core-plates.tsx`, `editorial-plates.tsx` and `frameworks-visual.tsx`. Register records updated to `retain` with category, method and techniques; ILLUSTRATION_SYSTEM § Replacements accepted documents each composition and its accuracy check.

Generated result: 74 plates — 14 in the current system, 60 in the earlier pastel style; verdicts 16 retain, 58 refine, 0 replace.

Verified: check (219 tests, typecheck, lint); docs:generate; build; atlas 36/36; e2e 42/42; e2e-redesign 66/66; keyboard 45/45; devices 155/155; crawl 0 problem pages; axe on the eight entry pages and /library: 0 violations. Rendered: each plate at card and hero size in both page themes, and the hero inside the app at 1440, 1024, 820 and 390 px in both themes. Known limit: on a 390 px phone the smallest plate text renders at about 4–4.5 CSS px (also true of the pilots); see ILLUSTRATION_SYSTEM § Replacements accepted. Not done: real devices and screen readers; Level-2 restyling.

## Session 22 — Design System entry (committed 52408f4)

Inspected first: git state (clean, in sync with origin at c35177d), the schema and completeness gates, the Design Tokens and Fitts entries, the source registry, the visual registry and Level-2 API, and the tests. Confirmed from the live repository: slug `design-system`, type `concept`, domain `design-systems`, subcategory `foundations`; `design-tokens` published; path id `design-systems`; visual category `design-systems`; taxonomy frozen and unchanged.

Researched (pages read first-hand on 2026-11-06): GOV.UK Design System (home; propose, develop and contribution-criteria pages), USWDS (about, design tokens, maturity model), Carbon (What is Carbon: Core and extensions), Adobe Spectrum (introduction), Semantic Versioning 2.0.0, Frost's *Atomic Design* chapters 1, 2 and 5, and the publisher pages for Kholmatova (2017) and Curtis (2009). Crossref and a web search found no peer-reviewed evaluations of design systems; Churchill (2019, DOI confirmed) was not cited because its text could not be read. Open Library and Google Books refused or rate-limited requests; book details come from the publishers' pages.

Done (D-094…D-096): `content/knowledge/design-systems/design-system.ts` (three levels; architecture, foundations, components as contracts, patterns and templates, documentation, governance and contribution, lifecycle and versioning, tooling, multi-brand and cross-platform, adoption and measurement, when not to build one; Harbourline illustrative worked example; quiz ×9, 3 per level; exercises ×4 with criteria and model answers; flashcards ×10; 19 relations; evidence `practitioner-recommendation`). Sources fragment `content/sources/design-systems.ts` (5 added, URLs verified). Plate `design-system` (viz) and Level-2 figures `design-system.architecture` and `design-system.contribution` (viz); no Level 3. Path `design-systems` reordered with the entry first (id, earlier steps and practice kept). Visual documentation reconciled with D-089.

Generated result: 52 published entries (9.3%); 75 plates, 15 in the current system; 23 Level-2 figures; Design Systems illustration category moved from weak to developing; the entry's maturity is complete in explanation, evidence, practice and editorial, developing in visual (no Level 3, by decision).

## Session 23 — site-wide redesign v4 and new reference sections (uncommitted; awaiting owner review)

Inspected once: routes, shell, tokens, button and field usage (28 ad-hoc controls), concept template; Laws of UX's stylesheet (IBM Plex Sans + Mono, perfect-fourth scale, off-white/ink palette, quiet borders) and the structure of AX Patterns, UX4G and Uxcel. Research read first-hand for the AI library: Microsoft HAX Toolkit, Apple HIG generative AI (Markdown version), Carbon for AI, Cloudscape generative-AI loading states and follow-up questions, AX Patterns home.

Done (D-097…D-100):
- **Design system v4** in app/globals.css (palette both themes, type scale, radii, shadows, mono labels, sans titles, `.btn`/`.field`/`.subject-tag`), shared components restyled at the source (PageHeader, concept and lesson headers, callouts, cards, tags, My Learning tiles), 28 controls converted to the shared classes. Token contrast gate passes.
- **Navigation** regrouped (Learn · Practise · Reference · Explore · Personal · About) with two new icons in the existing family.
- **AI UX pattern library** `/ai` + `/ai/[id]`: 7 moments, 23 patterns, 7 interactive demos (`components/ai/demos.tsx`), 6 sources added and verified (`content/sources/ai-ux.ts`); `ai-ux` path stages link to patterns.
- **Design-system documentation** `/system` + `/system/[section]/[id]`: 24 documents with live examples; shared `DocLayout` and documentation blocks (`components/ui/doc-layout.tsx`).
- **Resources** `/sources` grouped by kind with jump links.
- **Learning areas** (A–L) and the core curriculum sequence on `/learn` (`content/learning-areas.ts`); path stages can carry reference links (schema `links`, tested).
- **Concept template**: Practical checklist section and On this page entries.
- Tests: `tests/ai.test.ts` (library integrity, path links, learning areas); `tests/atlas.test.ts` nav expectation updated for the regrouped Explore group.

Verified: npm run check (all tests, typecheck, lint); build (934 pages); atlas, e2e, e2e-redesign, keyboard, devices, crawl all passing; axe 0 violations on 15 routes in both themes; 22/22 scripted demo interactions; screenshots of all route types at 1440 and 390 px in both themes without overflow or page errors. Not done: real devices and screen readers; the remaining pastel-era illustrations keep their own washes (by design, migrated per figure).

## Next task (precise)
Write `atomic-design` (methodology; Frost 2016 is in the registry) or `semantic-tokens`, the next Tier 5 entries, so the path's second and third stages gain published lessons; separately, the illustration work still open from session 21: decide the sheet kit's minimum phone text size (recompose, do not scale) and apply it to the current plates; restyle the pilots' Level-2 figures; migrate the "refine" plates one at a time in learning-path order.
