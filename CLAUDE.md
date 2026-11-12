# UX Academy — permanent project instructions

UX Academy is a personal, local-first, research-backed learning academy for the
whole UX/UI discipline. It is a knowledge ecosystem, not a blog: every entry is
classified, evidenced, connected and practised.

@AGENTS.md

## Start of every session

1. Read this file, then `docs/PROGRESS.md` (state + the precise next task).
2. Read the docs relevant to the task (`docs/CONTENT_AUDIT.md` for what to write next, `docs/ARCHITECTURE.md`, `docs/CONTENT_MODEL.md`, `docs/DESIGN_SYSTEM.md`, `docs/VISUAL_KNOWLEDGE_SYSTEM.md`, `docs/DIAGRAM_DESIGN_GUIDELINES.md`, `docs/EDITORIAL_STYLE_GUIDE.md`, `docs/DECISION_LOG.md`).
3. `git status && git log --oneline -15`
4. `npm run check` (index → typecheck → tests → lint). Fix red before adding anything.
5. Continue from the actual state of the code — never from memory of earlier conversations.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (prerenders every page; also validates content) |
| `npm run content:index` | Regenerate `content/*/_index.ts` after adding/removing content files |
| `npm run sources:verify [-- --all \| id…]` | Verify DOIs against Crossref and URLs by HTTP; writes `content/sources/verification.json` |
| `npm test` | Content integrity + formula unit tests (Vitest) |
| `npm run test:taxonomy` | Terminal report: slug/type integrity, link resolution, three-depth checks for published entries, coverage by domain (exits 1 on failure) |
| `npm run docs:generate` | Regenerate docs/KNOWLEDGE_TAXONOMY.md, RESEARCH_SOURCES.md, CONTENT_COVERAGE.md from content |
| `npm run check` | Index → typecheck → tests → lint (everything except build) |
| `tests/browser/*.cjs` | Crawl, e2e (`e2e.cjs`, `e2e-redesign.cjs`) and axe audits against `next start` — see tests/browser/README.md |
| `NODE_PATH=$(npm root -g) npx tsx scripts/render-plates.tsx [slug…]` | Render plates (card + hero, light + dark) to `.plates/` for visual QA |

## Architecture rules

- Next.js 16 App Router (Cache Components on), TypeScript strict, Tailwind v4. **This Next.js differs from training data** — read `node_modules/next/dist/docs/` before using an API. `params` is a Promise; client hooks reading the URL need `<Suspense>`.
- Content is data, separate from presentation. Content lives in `/content` as typed TS validated by zod schemas in `lib/content/schema.ts`. Never duplicate a record to show it twice — reference it by slug/id.
- One loader: `lib/content/index.ts`. Pages import from `@/lib/content`; client components receive plain serialisable props.
- Formulas are pure functions in `lib/formulas/` with unit tests in `lib/formulas/*.test.ts`. UI calculators in `components/formula/` call them; never compute in JSX.
- Personal data (bookmarks, notes, progress, flashcards, history) is local-first in `localStorage` via `lib/store/`. Versioned schema, export/import JSON. No accounts, no backend, no API keys.
- Keep dependencies minimal: next, react, zod, minisearch. Ask before adding more.

## Editorial voice (docs/EDITORIAL_STYLE_GUIDE.md)

- Clear, precise, natural, approachable, academically responsible. Lead with the idea; show the mechanism with a concrete case; prefer precise words; say what is uncertain.
- Banned stock phrases and repeated templates are enforced by `tests/editorial.test.ts` — do not replace one cliché with another.
- Three voices: interface (short, literal, action first), educational (define → mechanism → example → limits), editorial (specific, restrained). Label illustrative scenarios. Never invent sources, quotes, statistics or outcomes.

## Content & research rules (non-negotiable)

- Accuracy over quantity. Explain, don't summarise. Beginner clarity without expert simplification.
- Classify by what a thing *is* (`primaryType`), not where it's convenient to navigate.
- **Never fabricate** citations, DOIs, authors, years, journals, coefficients or standard statuses. If unsure, leave it out or mark `verification: "awaiting-verification"`.
- Every DOI must pass `npm run sources:verify` (tests fail on DOI mismatch).
- Cite with `{{src:id}}`; any cited source must also be in the entry's `references`.
- Separate the original scientific concept from its popular UX interpretation; state evidence, assumptions, limitations and misreadings.
- Do not bypass paywalls, reproduce copyrighted standards, or bulk-copy articles. Write original explanations; link out.
- Only `status: "published"` with every quality-gate flag true **and** the type-specific completeness gates (`lib/content/completeness.ts`) counts as complete. Taxonomy items without entries are "planned"; never present them as content. `coveredBy` topics are "addressed within" another entry and never count as published.
- Expand content in the order of `docs/CONTENT_AUDIT.md` §6, one fully researched entry at a time, with sources verified first. Never generate shallow entries to raise coverage; coverage figures come only from the generated `docs/CONTENT_COVERAGE.md`.
- Taxonomy changes (add, merge, split, reclassify) go in `content/taxonomy.ts` with a reason in `docs/CONTENT_AUDIT.md`; retarget links before removing a slug.
- Every taxonomy topic has one of six statuses derived from the content (see `docs/CONTENT_MODEL.md` § Topic status); add a topic to `content/topic-ledger.ts` only when its sources have actually been gathered. Priority is knowledge completeness; do visual redesign only to solve a usability, accessibility or educational problem.
- **Taxonomy v1.0 is frozen** (20 domains, ids stable; `docs/CONTENT_AUDIT.md` § 7, governance in `docs/CONTENT_MODEL.md`): one canonical home per topic, synonyms as `aliases`, no new top-level domains, moved published topics keep their slug and get matching `domain`/`subcategory`. `tests/taxonomy.test.ts` enforces it.
- Do not assign numeric confidence scores; use `evidence` classes and `evidenceNote`.

## Design rules (v4 — see docs/DESIGN_SYSTEM.md, the live docs at /system, docs/UI_UX_DESIGN_DIRECTION.md)

- Monochrome Editorial Workspace (v4, D-097; was v3 Pastel): persistent sidebar + topbar + ONE rounded workspace frame (`app/layout.tsx`, `components/shell/`). Pages never draw their own outer frame. Light-first; designed dark theme. Tokens live **only** in `app/globals.css` — never hard-code colours, sizes or radii in components. `tests/tokens.test.ts` gates contrast: change a token, run it.
- Colour roles: near-black ink on a warm off-white paper for almost everything; blue `accent` only for links, focus and selection; `rubric` red only for editorial heritage (type labels, A–Z letters); eleven subject palettes (`lib/content/categories.ts`, `.cat-*` → `--c/--c-ink/--c-wash/--c-soft`) for identity only — as a dot (`.subject-tag`), a thin rule on headers and callouts, and in illustrations — **never** for evidence, status or body text, and no longer as whole pastel panels. Buttons: only the `.btn` family (`btn-primary` ink, `btn-secondary`, `btn-tertiary`, `btn-text`, `btn-icon`; `btn-sm`/`btn-lg`); inputs: `.field`, `.field-label`, `.field-hint`. Never style a button or input from raw utilities.
- Typography: Plex Sans 600 for every title (`.t-hero/.t-page/.t-section/.t-sub/.t-editorial/.display`); Plex Mono for labels and metadata (`.label`, uppercase) and formulas (`.formula`); Newsreader only for long reading (`.prose-read`, max 70ch) and quotes (`.t-quote`). Display sizes follow a perfect fourth.
- Shape: radii xs 4 · sm 6 · md 8 · lg 12 · xl 14 · 2xl 18; restrained shadows (`shadow-card/hover/raise/dialog`); hover darkens the border (`.card`), never transform. No decorative gradients; `.bg-hero` is a quiet neutral fade.
- Documentation layout for reference pages: `DocLayout`, `DocSection`, `DoDont`, `DefinitionTable`, `Checklist`, `PrevNext` (`components/ui/doc-layout.tsx`). Reference sections: `/system` (this site's design system, D-099), `/ai` (AI UX pattern library, D-098), `/guides` (long-form guides that compose entries by slug, D-127), `/sources` (resource library), `/learn` (12 learning areas mapped onto the frozen taxonomy, D-100; never a second taxonomy).
- Three page families (docs/PAGE_TEMPLATES.md): Workspace, Editorial, Experimental. Cards pick their variant from classification (`variantFor`). Callouts (`components/ui/callout.tsx`) mark moments, not every paragraph.
- Logo: the **gradient app icon only** (`components/brand/uxa-app-icon.tsx`, light tile in light theme, dark tile in dark theme), from `brand/uxa-logo-kit-v0.1-draft/` (the source of truth). No flat black/white versions in the product. Never stretch, recolour or redraw; respect the kit's clear space and minimum sizes. The kit is a **draft v0.1** pending approval.
- Icons: only `components/shell/icons.tsx` (one family, 20px grid, 1.5 stroke); always beside a text label or with an accessible name.
- Illustrations are original **plates** (`components/illustrations/`, rules in docs/ILLUSTRATION_SYSTEM.md): explanatory diagrams of the mechanism, colour via CSS variables only, accessible title + description. Every published entry and subject must have one (tested). Never copy third-party artwork.
- **Visual Learning System (D-089, governs all knowledge figures):** three independent dimensions — **category** (12 illustration categories, `components/illustrations/visual-taxonomy.ts`; never the knowledge taxonomy), **method** (5: conceptual, process, relationship, comparison, hierarchy) and **language** (`canvas`: `sheet` = instructional, theme-aware, `system/sheet.tsx`; `viz` = dark technical, `--viz-*`, `system/viz.tsx`). Every plate has a record in `components/illustrations/visual-register.ts` (category, method, audit verdict; tested). Choose the method from the knowledge, then the canvas; do not force every topic into a dark or isometric figure. No stick figures or `Figure` in current-system plates; believable interfaces, real or computed measurements, meaning never by colour alone, colour only from tokens. Hairline drawing rules (constant hairline strokes, silhouette vs crease, filled plate) are adopted; its package is not installed. Rules, reference catalogue, anti-patterns and the per-figure migration/QA procedure: docs/ILLUSTRATION_SYSTEM.md § Visual Learning System; progress only from the generated docs/ILLUSTRATION_COVERAGE.md. Migrate one figure at a time, never by a blanket restyle.
- **Figure text standard (D-101–D-104):** plate text ≥ `T.min` (13 units ≈ 10 px on a 390 px phone) for interface copy; primary labels and marker numerals `T.strong`/`T.marker` (16 ≈ 12.6 px). Explanations go in the plate's HTML figure **key** (`IllustrationEntry.key`, rendered by `PlateKey`), never as microtext in the drawing; the sheet kit has no `Note`; no shrinking `scale()`; no text on isometric planes in heroes (`VizMarker` + key). `tests/plate-text.test.ts` gates it. Level-2 figures declare `language` (`sheet` for anatomy/measurement/comparison, `viz` for process/system) and keep labels and markers ≥ 12 px at every width. Verify by measuring rendered px at 390 and 1440, not by compiling.
- **Visual system state (session 25, D-105–D-109):** 73 of 75 plates are on the current canvases (learning-sheets.tsx for entries, subject-sheets.tsx for subjects and planned topics); two earlier-style plates are retained by decision; every Level-2 figure declares `language` (tested). Numbers drawn in a plate come from `lib/formulas`; measured colours use the theme-independent `--sample-*` tokens; planned-topic plates say "planned". Do not add a plate for a category that has no published entry.
- Motion only to teach or confirm (docs/INTERACTION_AND_MOTION_GUIDELINES.md): CSS `anim-*` classes, off under `prefers-reduced-motion`, pausable, static first frame complete. No scroll effects, parallax or moving hit targets.
- Interactive explorers and labs compute only with `lib/formulas`; label simulations vs experiments; state assumptions and what they cannot show.
- **Visual Knowledge Engine (v4):** Level-2 explanations live in `components/visual-explanations/` (templates in `diagrams/`, compositions in `concepts/`, `registry.tsx`). Choose the visual strategy by what the knowledge is; build with HTML/CSS text + token-coloured SVG shapes; every figure has objective, takeaway, ordered text version, verification kind (`content-checked` / `illustrative`) and sources from the entry's own references (`tests/visuals.test.ts`). Rules: docs/DIAGRAM_DESIGN_GUIDELINES.md.
- Status/evidence colours are semantic tokens (`ok warn info error evidence planned published`) — never subject colours.
- Still forbidden: glassmorphism, decorative animation, icon clutter, fake data/avatars/achievements, colour-only meaning, nested page frames.
- Accessibility floor: semantic HTML, visible focus, keyboard reachable, WCAG 2.2 AA contrast and 24px targets (`.tap`, SC 2.5.8), text alternatives for every plate/chart/graph. Run `tests/browser/keyboard.cjs` and `devices.cjs` for UI changes. Grids must use `minmax(0,1fr)` tracks (base rule exists) — verify phones at the real device width.

## Working conventions

- Work in verifiable increments; run `npm run check` (and `npm run build` for UI changes) before committing.
- After content changes run `npm run docs:generate`. Update `docs/PROGRESS.md` at each milestone, with the precise next task. Record decisions in `docs/DECISION_LOG.md`.
- Don't remove or weaken tests to get green. Don't fake data to make dashboards look populated.
- Never push, deploy or publish without explicit authorisation from the owner.
