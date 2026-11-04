# Page templates (v3)

Every page renders inside the single workspace frame (`app/layout.tsx`: sidebar · topbar · `main.workspace`). Pages never add a second outer frame.

## Family A — Workspace (sans titles, panels, grids)

| Template | Route(s) | Structure |
|---|---|---|
| **Home** | `/` | Gradient hero (headline with editorial accent, lede, hero search, Browse / Start CTAs, constellation figure, real stat strip) → learning panel (local data or honest empty state) → 10 subject tiles (real counts) → featured concept (Fitts, feature panel) → learning journeys (4 path cards) → evidence ledger as a research feature (4 example concepts with class, primary reference, limitation; counts per class) → labs → recommended first (3 cards) |
| **Library** | `/library` | Header with counts → filter panel: search + sort, subject chips (category overview), type chips, filter toolbar (subject, subcategory, type, level, evidence, includes, status; drawer below 1024px) → results bar (count, clear, Grid/List/A–Z) → container-query grid 4/3/2/1 with auto card variants, featured first, "Show 24 more" paging; planned topics in a labelled section |
| **Subject index / subject** | `/topics`, `/topics/[domain]` | Pastel subject hero (plate, coverage, subcategory chips) → cards per subcategory |
| **Paths index** | `/learn` | Header (natural lede; "Learning paths" and unique "Published lessons" counts) → light path cards: subject illustration, levels, title, 2-line description, one row of real counts, "More lessons in development" only if topics are planned, "Not started" or "N of M lessons". Objectives, entry requirements and curriculum live on the path page. Container-query grid: 1 / 2 / 3 columns, 4 only when the content area is ≥ 76rem |
| **Path** | `/learn/[id]` | Pastel hero (stats grid, progress, start) → curriculum level accordions → lesson rows + level test; side panel: audience, objectives, entry requirements, completion |
| **My Learning** | `/me` | Pastel stat tiles → study next / revise panels → paths, saved, recent, notes, calculations, collections, lab runs → data export/import |
| Practice, Glossary, Comparisons, Sources, Coverage, Method | — | `PageHeader` + panels |

## Family B — Editorial (Newsreader titles, reading column)

| Template | Route(s) | Structure |
|---|---|---|
| **Concept** | `/library/[slug]` | Breadcrumbs → pastel hero panel (type + subject pill, editorial title, serif lede, evidence/level/reading/verified grid, actions ‖ hero plate in a raised card with pause) → definition callout + objectives → visual explanation (explorer) → level tabs (analogy, example, application and research callouts) → formula → method/standard → lab feature panel → origin (attribution note) → application (numbered steps) → use / avoid + limitation and misconception callouts → illustrated connections (cards) → practice → evidence ledger panel + references → notes → prev/next; sticky TOC panel |
| **Lesson** | `/learn/[id]/lesson/[slug]` | Lesson rail → pastel hero → objectives panel → level-matched explanation with callouts → explorer → "watch out for" → knowledge check → exercise → prev/next |
| **Planned topic** | `/library/[slug]` (no entry) | Dashed soft hero (clearly not content), concept plate if drawn ahead (e.g. Human-Centred Design) or subject plate, captioned |

## Family C — Experimental (split workspaces)

| Template | Route(s) | Structure |
|---|---|---|
| **Formula Lab** | `/formulas` | Sticky category/search panel ‖ grouped formula cards |
| **Formula** | `/formulas/[id]` | Pastel hero → split: specification (expression, variables, assumptions, steps, worked-example callout, interpretation, errors, limits, alternatives) ‖ sticky calculator workspace (calculator + response curve) → references |
| **Lab** | `/labs/[id]` | Pastel hero (kind stated) → split: lab (instructions bar, Start/Restart, canvas, results table + chart, interpretation) ‖ side panel (kind of lab, assumptions, concepts) |
| **Graph** | `/graph` | Controls → force layout + focus panel |
| 404 | — | IA "you are here" plate |
