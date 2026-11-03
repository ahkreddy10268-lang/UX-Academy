# Information architecture

## Navigation model

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

Secondary (footer / mobile "More"): Comparisons, Source registry, Coverage, Method & evidence, All subjects.

Global search (⌘K, Ctrl K, /) is available on every page.

## Hierarchy

```
Domain (20)  →  Subcategory (≈70)  →  Topic (≈515)  →  Entry (published content for a topic)
```

Defined in `content/taxonomy.ts`. A topic without an entry has an honest "planned" page at the same URL it will eventually have (`/library/<slug>`), so links never break when content is written.

## Every entry is reachable through

1. **Search** — titles, alternate names, tags, summary, definition, full text (all levels, origin, application, formulas, limitations, misconceptions).
2. **Browse** — `/library` filters (subject, type, level, evidence, includes calculator/lab) and A–Z index.
3. **Topic hierarchy** — `/topics/[domain]#subcategory`, breadcrumbs on every entry.
4. **Related concepts** — prerequisites, "leads on to", typed relations, backlinks, previous/next in subcategory, `/graph`.
5. **Learning paths** — `/learn/[id]`.

## Entry page anatomy (reading order)

Breadcrumb → type label → title → alternate names → summary → evidence / level / status / verified → actions (save, complete, flashcards, collections) → Definition & objectives & prerequisites → Explanation (Beginner | Intermediate | Advanced tabs) → Formula & calculator → Method / Standard details → Lab → Origin → Application → When to use / avoid / limitations / misconceptions → Connections → Practice (quiz, exercises) → Evidence & references → My notes → prev/next. A sticky "On this page" TOC mirrors the sections.

## Learning routes (v2)

`/learn/<path>` (curriculum) → `/learn/<path>/lesson/<slug>` (lesson view of an entry at the stage's level) → `/learn/<path>/level/<n>` (level test). Lessons reuse entry content — nothing is duplicated.

## URL scheme

`/library/<slug>` entries and planned topics · `/topics/<domain>` · `/formulas/<formula-id>` · `/labs/<lab-id>` · `/learn/<path-id>` · `/compare/<id>` · `/practice/workshops/<id>` · `/glossary#<term>` · `/graph?focus=<slug>` · `/library?q=&domain=&type=&level=&evidence=&scope=&feature=&view=` (all filters and the view are shareable).
