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
- Do not assign numeric confidence scores; use `evidence` classes and `evidenceNote`.

## Design rules (v3 — see docs/DESIGN_SYSTEM.md, docs/UI_UX_DESIGN_DIRECTION.md)

- Pastel Editorial Workspace: persistent sidebar + topbar + ONE rounded workspace frame (`app/layout.tsx`, `components/shell/`). Pages never draw their own outer frame. Light-first; designed dark theme. Tokens live **only** in `app/globals.css` — never hard-code colours, sizes or radii in components. `tests/tokens.test.ts` gates contrast: change a token, run it.
- Colour roles: action indigo (`accent`) for interaction; `rubric` red only for editorial heritage (type labels, A–Z letters); eleven pastel subject washes (`lib/content/categories.ts`, `.cat-*` → `--c/--c-ink/--c-wash/--c-soft`) for identity, illustration and labelled callout roles — **never** for evidence, status or body text. Primary buttons: `bg-accent text-surface hover:bg-accent-ink`.
- Typography: Plex Sans 600 for UI and workspace headings (`.t-hero/.t-page/.t-section/.t-sub`); Newsreader for editorial titles (`.t-editorial`), quotes (`.t-quote`) and reading (`.prose-read`, max 70ch); Plex Mono for formulas (`.formula`).
- Shape: radii xs 6 · sm 10 · md 12 · lg 16 · xl 20 · 2xl 24; soft shadows (`shadow-card/hover/raise/dialog`); hover = border + shadow, never transform. Gradients only on the home hero (`.bg-hero`) and featured panels (`.bg-feature`).
- Three page families (docs/PAGE_TEMPLATES.md): Workspace, Editorial, Experimental. Cards pick their variant from classification (`variantFor`). Callouts (`components/ui/callout.tsx`) mark moments, not every paragraph.
- Logo: only `components/brand/uxa-logo.tsx` (from `brand/uxa-logo-kit-v0.1-draft/`, the source of truth). Black, white and greys only; in the UI use `tone="current"` with `text-ink`. Never stretch, recolour or redraw; respect the kit's clear space and minimum sizes. The kit is a **draft v0.1** pending approval.
- Icons: only `components/shell/icons.tsx` (one family, 20px grid, 1.5 stroke); always beside a text label or with an accessible name.
- Illustrations are original **plates** (`components/illustrations/`, rules in docs/ILLUSTRATION_SYSTEM.md): explanatory diagrams of the mechanism, colour via CSS variables only, accessible title + description. Every published entry and subject must have one (tested). Never copy third-party artwork.
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
