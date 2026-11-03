# Page templates

| Template | Route(s) | Structure |
|---|---|---|
| **Home** | `/` | Hero (headline, lede, hero search, CTAs, constellation figure) → continue learning (real local data) → disciplines (10 subject tiles, real counts) → featured concept (Fitts, on its wash) → evidence ledger (all published entries placed by evidence class) → learning paths (4 path cards) → labs preview → connected knowledge (relation pairs with plates and notes) → start here (3 cards) |
| **Library** | `/library` | Editorial header with counts → search + knowledge-type strip → filter sidebar (drawer on mobile) → toolbar (count, Grid/List/A–Z) → results: featured + formula + standard cards; planned topics in a separate, labelled section |
| **Concept** | `/library/[slug]` | Subject rule → breadcrumbs → hero (type + subject, title, alternate names, summary, evidence/level/reading/verified, actions) ‖ hero plate (animated + pause, Pl. caption) → definition & objectives → visual explanation (explorer) → three-level explanation tabs → formula & calculator & curve → method / standard → lab callout → origin → application → use/avoid/limits/misconceptions → illustrated connections → practice → evidence ledger panel + references → notes → prev/next; sticky TOC |
| **Planned topic** | `/library/[slug]` (no entry) | Same URL as the future entry; dashed-framed subject plate captioned "not yet researched"; glossary definition; existing connections |
| **Subject index** | `/topics` | Families (colour key) → subject tiles |
| **Subject** | `/topics/[domain]` | Subject rule, hero with subject plate, coverage, subcategory jump links → per subcategory: published cards + planned chips → related paths → prev/next subject |
| **Paths index** | `/learn` | Path cards (plate, level ladder, lessons/exercises/minutes, progress) |
| **Path** | `/learn/[id]` | Hero (stats, progress, start lesson 1) → curriculum: Level accordions → lesson rows (thumb, type, exercise count, minutes, state) → level test row → practice links; sidebar: audience, objectives, prerequisites, completion |
| **Lesson** | `/learn/[id]/lesson/[slug]` | Lesson rail → header ‖ plate → objectives → level-matched explanation (+ analogy / practice / open questions) → explorer → "watch out for" misconception → knowledge check (level questions) → exercise → complete/save → prev/next lesson or level test |
| **Level test** | `/learn/[id]/level/[n]` | All quiz questions from the level's lessons, explained answers, revision links |
| **Formula Lab** | `/formulas` | Search + category nav → grouped formula cards with plates and expressions |
| **Formula** | `/formulas/[id]` | Hero ‖ plate → expression, variables, calculator, response curve (+ data table), assumptions, steps, worked example, interpretation, errors, limits, alternatives → references |
| **Labs** | `/labs`, `/labs/[id]` | Grouped by kind (experiment / simulation / tool) with plates; lab page labels kind explicitly ("measures you" vs "nothing is measured"), assumptions, concepts |
| **Graph** | `/graph` | Controls → subject-coloured force layout + selected-concept panel → list alternative |
| **Glossary** | `/glossary` | Sticky filter + letters → definitions with related links, "entry" markers |
| **Practice** | `/practice/*` | Stats → quiz / flashcards / workshops (illustrated) |
| Comparison, Sources, Coverage, Method, My learning, 404 | — | Shared PageHeader; comparison shows both plates; 404 uses the IA "you are here" plate |
