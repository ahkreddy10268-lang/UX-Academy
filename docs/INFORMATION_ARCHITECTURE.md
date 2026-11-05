# Information architecture

## Navigation model

> **v3 (D-026, D-081):** navigation now lives in a persistent sidebar grouped by activity — **Overview** (Home) · **Learn** (Learn, Knowledge Library) · **Experiment** (Formula Lab, Labs, Practice) · **Explore** (Domains & Topics, Graph, Glossary) · **Personal** (My Learning) · **More** (Comparisons, Sources, Coverage, Method). The topbar carries search, theme and My Learning; below 1024px the same groups open in a drawer. The activity-first principle below is unchanged.

The spec proposed 15 primary items. That many top-level destinations would exceed what a header can show legibly and blur the distinction between *ways of studying* and *subjects*. Decision (see DECISION_LOG D-007): **primary navigation is organised by activity; subjects live inside the Library.**

| Primary (header) | Purpose | Spec items it absorbs |
|---|---|---|
| Learn | Structured paths | Learn |
| Library | Search, browse, subjects, entries | Knowledge Library, Theories & Laws, Methods & Frameworks, UI & Visual Design, HCI & Psychology, Design Systems, Accessibility, Research Lab (as subjects) |
| Formula Lab | Formulas & calculators | Formula Lab |
| Labs | Experiments & simulations | — |
| Practice | Quizzes, flashcards, workshops | Practice Lab, Case Studies (as workshops for now) |
| Graph | Relationship explorer | — |
| Glossary | Terms | Glossary |
| My learning (right) | Personal workspace | My Learning |

Secondary (footer / mobile "More"): Comparisons, Source registry, Coverage, Method & evidence, Domains & Topics.

Global search (⌘K, Ctrl K, /) is available on every page.

## Hierarchy

```
Domain  →  Subcategory  →  Topic  →  Entry (published content for a topic)
```

Defined in `content/taxonomy.ts`. A topic without an entry has an honest "planned" page at the same URL it will eventually have (`/library/<slug>`), so links never break when content is written.

Counts are never written here: they are computed from `content/taxonomy.ts` (taxonomy v1.0, frozen) and reported in the generated `docs/CONTENT_COVERAGE.md`.

## Three ways in: Learn, Library, Knowledge Atlas (D-081)

| Destination | Route | Question it answers | What it shows |
|---|---|---|---|
| Learn | `/learn` | "What should I study, in what order?" | Curated paths from beginner to advanced; lessons reuse entries |
| Knowledge Library | `/library` | "Which entry explains this, and what does it say?" | Full-text search and rich filters over entries (and planned topics), cards and A–Z; the reading experience |
| Domains & Topics — Knowledge Atlas | `/topics` | "What does the discipline cover, and where does this topic belong?" | The whole taxonomy as a directory: Domain → Subcategory → Topic, each topic with its type and status |

The Atlas is structural, not a second library: it searches only names (domains, descriptions, subcategories, topic titles and aliases) and filters only by topic status, knowledge type and domain. Rich filters (level, evidence, features) and full-text search stay in the Library. Each page links to the others.

**Atlas behaviour.** Domains are listed in canonical order, collapsed by default, each with its subcategory and topic counts, status counts, a published-share bar (with text) and links to its subject page (`/topics/<domain>`) and its entries in the Library (`/library?domain=`). Opening a domain shows its subcategories open; each subcategory can be collapsed. "Expand all domains" and "Collapse all" are offered when no filter is set. A search or filter reveals every matching branch, open, with its domain and subcategory as context: a matching domain or subcategory name shows all of its topics; otherwise only matching topics (titles or aliases; an alias match is shown as "also: …"). Matches are emphasised; a status region announces how many topics match. Controls are native buttons with `aria-expanded`/`aria-controls`, nested in headed lists (`h3` domain, `h4` subcategory). Parameters: `q` (text), `status` (`planned`, `research`, `drafted`, `reviewed`, `published`, `addressed`), `type` (a knowledge type), `domain` (a domain id); invalid values are ignored. Filter changes push a history entry (back and forward restore them); typing replaces the current one. Before hydration, and without JavaScript, the page shows a plain linked list of domains with their counts.

**Topic status and links.** Each topic has exactly one status, computed by `topicStatus()` (`lib/content/coverage.ts`) from the entry's own `status`, the research ledger (`content/topic-ledger.ts`) and the taxonomy's `coveredBy`; status is always shown as text with a shape, never by colour alone. Published, in-progress and planned topics link to `/library/<slug>` (an entry, or its honest planned-topic page). Topics *addressed within another entry* link to that canonical entry and name it ("Explained in …"); they never count as published.

**Why not in the sidebar.** The sidebar carries one entry point (Domains & Topics, under Explore, `grid` icon; active on `/topics` and `/topics/<domain>`). Listing twenty domains — let alone seventy-three subcategories — as permanent sidebar children would bury the activity-based navigation and repeat what the Atlas shows with search and status.

**Data flow.** `buildAtlas()` (`lib/content/atlas.ts`, server) derives a minimal serialisable tree from the content loader (`domains`, `itemsForSubcategory`, `topicStatus`); search, filters and counts are pure functions in `lib/content/atlas-filter.ts`, shared by the client explorer and `tests/atlas.test.ts`. The client receives topic metadata only (slug, title, type, status, link, aliases, covering entry), never full entries or sources.

## Every entry is reachable through

1. **Search** — titles, alternate names, tags, summary, definition, full text (all levels, origin, application, formulas, limitations, misconceptions).
2. **Browse** — `/library` filters (subject, type, level, evidence, includes calculator/lab) and A–Z index.
3. **Topic hierarchy** — the Knowledge Atlas (`/topics`, every topic in its canonical place) and `/topics/[domain]#subcategory`; breadcrumbs on every entry.
4. **Related concepts** — prerequisites, "leads on to", typed relations, backlinks, previous/next in subcategory, `/graph`.
5. **Learning paths** — `/learn/[id]`.

## Entry page anatomy (reading order)

Breadcrumb → type label → title → alternate names → summary → evidence / level / status / verified → actions (save, complete, flashcards, collections) → Definition & objectives & prerequisites → Explanation (Beginner | Intermediate | Advanced tabs) → Formula & calculator → Method / Standard details → Lab → Origin → Application → When to use / avoid / limitations / misconceptions → Connections → Practice (quiz, exercises) → Evidence & references → My notes → prev/next. A sticky "On this page" TOC mirrors the sections.

## Learning routes (v2)

`/learn/<path>` (curriculum) → `/learn/<path>/lesson/<slug>` (lesson view of an entry at the stage's level) → `/learn/<path>/level/<n>` (level test). Lessons reuse entry content — nothing is duplicated.

## URL scheme

`/library/<slug>` entries and planned topics · `/topics?q=&status=&type=&domain=` (Knowledge Atlas; all shareable) · `/topics/<domain>` · `/formulas/<formula-id>` · `/labs/<lab-id>` · `/learn/<path-id>` · `/compare/<id>` · `/practice/workshops/<id>` · `/glossary#<term>` · `/graph?focus=<slug>` · `/library?q=&domain=&sub=&type=&level=&evidence=&scope=&feature=&sort=&view=` (all filters and the view are shareable).
