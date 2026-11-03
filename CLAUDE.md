# UX Academy — permanent project instructions

UX Academy is a personal, local-first, research-backed learning academy for the
whole UX/UI discipline. It is a knowledge ecosystem, not a blog: every entry is
classified, evidenced, connected and practised.

@AGENTS.md

## Start of every session

1. Read this file, then `docs/PROGRESS.md` (state + the precise next task).
2. Read the docs relevant to the task (`docs/ARCHITECTURE.md`, `docs/CONTENT_MODEL.md`, `docs/DESIGN_SYSTEM.md`, `docs/DECISION_LOG.md`).
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

## Content & research rules (non-negotiable)

- Accuracy over quantity. Explain, don't summarise. Beginner clarity without expert simplification.
- Classify by what a thing *is* (`primaryType`), not where it's convenient to navigate.
- **Never fabricate** citations, DOIs, authors, years, journals, coefficients or standard statuses. If unsure, leave it out or mark `verification: "awaiting-verification"`.
- Every DOI must pass `npm run sources:verify` (tests fail on DOI mismatch).
- Cite with `{{src:id}}`; any cited source must also be in the entry's `references`.
- Separate the original scientific concept from its popular UX interpretation; state evidence, assumptions, limitations and misreadings.
- Do not bypass paywalls, reproduce copyrighted standards, or bulk-copy articles. Write original explanations; link out.
- Only `status: "published"` with every quality-gate flag true counts as complete. Taxonomy items without entries are "planned" — never present them as content.
- Do not assign numeric confidence scores; use `evidence` classes and `evidenceNote`.

## Design rules (v2 — see docs/UI_UX_DESIGN_DIRECTION.md)

- Premium editorial + visual encyclopedia + interactive learning. Light-first; deliberately designed dark theme. Tokens live **only** in `app/globals.css` — never hard-code colours, sizes or radii in components.
- Typography roles: Newsreader for editorial display/reading (`.t-hero/.t-page/.t-section/.t-lede/.prose-read`), IBM Plex Sans for UI (`.t-sub/.label/.t-caption`), IBM Plex Mono for formulas and data (`.formula`).
- Colour = rubric red brand accent + eleven subject palettes (`lib/content/categories.ts`, `.cat-*` classes exposing `--c/--c-ink/--c-wash/--c-soft`). Subject colour is for identity and illustration only — **never** for evidence, status or body text.
- Illustrations are original **plates** (`components/illustrations/`, rules in docs/ILLUSTRATION_SYSTEM.md): explanatory diagrams of the mechanism, colour via CSS variables only, accessible title + description. Every published entry and subject must have one (tested). Never copy third-party artwork.
- Motion only to teach or confirm (docs/INTERACTION_AND_MOTION_GUIDELINES.md): CSS `anim-*` classes, off under `prefers-reduced-motion`, pausable, static first frame complete. No scroll effects, parallax or moving hit targets.
- Interactive explorers compute only with `lib/formulas`; label simulations vs experiments; state assumptions and what they cannot show.
- Still forbidden: gradients, glassmorphism, decorative animation, icon clutter, fake data, colour-only meaning.
- Accessibility floor: semantic HTML, visible focus, keyboard reachable, WCAG 2.2 AA contrast, text alternatives for every plate/chart/graph. Grids must use `minmax(0,1fr)` tracks (base rule exists) — verify phones at the real device width.

## Working conventions

- Work in verifiable increments; run `npm run check` (and `npm run build` for UI changes) before committing.
- After content changes run `npm run docs:generate`. Update `docs/PROGRESS.md` at each milestone, with the precise next task. Record decisions in `docs/DECISION_LOG.md`.
- Don't remove or weaken tests to get green. Don't fake data to make dashboards look populated.
- Never push, deploy or publish without explicit authorisation from the owner.
