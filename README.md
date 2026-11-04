# § UX Academy

A personal, research-backed academy for the whole UX/UI discipline: theories, laws, methods, metrics and standards, each explained at three depths, classified by what it actually is, labelled by its strength of evidence, connected to its prerequisites and relations, and practised through calculators, labs, quizzes, flashcards and workshops.

Local-first: no accounts, no backend, no API keys. Notes and progress live in your browser and export to JSON/Markdown.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build (prerenders ~630 static pages and validates all content):

```bash
npm run build && npm start
```

## What's inside

| Area | Route | What it does |
|---|---|---|
| Library | `/library`, `/library/[slug]` | 47 published entries of 540 taxonomy topics (10 more addressed within other entries, 483 planned); full-text search, filters, A–Z. Live figures: `docs/CONTENT_COVERAGE.md` |
| Subjects | `/topics`, `/topics/[domain]` | 20-domain taxonomy with coverage |
| Learn | `/learn`, `/learn/[id]` | 16 learning paths, beginner → advanced |
| Formula Lab | `/formulas`, `/formulas/[id]` | 25 documented formulas with unit-tested calculators |
| Labs | `/labs/[id]` | 10 experiments and simulations (Fitts, Hick-Hyman, Gestalt, contrast…) |
| Practice | `/practice` | Mixed quizzes, Leitner flashcards, 11 design workshops |
| Graph | `/graph` | Knowledge graph of 331 explained relationships + list alternative |
| Compare | `/compare` | 10 side-by-side concept comparisons |
| Glossary | `/glossary` | 114 terms |
| Sources | `/sources` | 250-source registry with Crossref/URL verification status |
| Coverage | `/coverage` | What's written vs planned, computed from content |
| My learning | `/me` | Progress, notes, bookmarks, collections, saved calculations, export/import |

Search anywhere with **⌘K** / **Ctrl K** or **/**.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` / `build` / `start` | Next.js |
| `npm test` | Content integrity (quality gate) + formula + store unit tests |
| `npm run check` | Regenerate indexes, typecheck, test, lint |
| `npm run content:index` | Regenerate `content/*/_index.ts` after adding content files |
| `npm run sources:verify [-- --all \| ids…]` | Verify DOIs (Crossref) and URLs; writes `content/sources/verification.json` |
| `npm run docs:generate` | Regenerate taxonomy, source registry and coverage docs from content |

Browser tests (crawl, 42-step e2e, axe-core WCAG audit): see `tests/browser/README.md`.

## Adding content

Read `docs/CONTENT_MODEL.md`, copy the structure of `content/knowledge/laws-effects/fitts-law.ts`, add sources to `content/sources/`, then:

```bash
npm run content:index && npm run sources:verify -- <new-source-ids> && npm test
```

## Documentation

`CLAUDE.md` (permanent instructions) · `docs/PROGRESS.md` (state & next task) · `docs/PRODUCT_VISION.md` · `docs/ARCHITECTURE.md` · `docs/DESIGN_SYSTEM.md` · `docs/INFORMATION_ARCHITECTURE.md` · `docs/CONTENT_MODEL.md` · `docs/KNOWLEDGE_TAXONOMY.md` · `docs/RESEARCH_SOURCES.md` · `docs/CONTENT_COVERAGE.md` · `docs/DECISION_LOG.md` · `docs/ROADMAP.md`
