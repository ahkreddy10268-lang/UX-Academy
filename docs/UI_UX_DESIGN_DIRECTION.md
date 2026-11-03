# UI/UX design direction (v3 — Pastel Editorial Workspace)

**Direction (v3, 2026-11-03):** a premium pastel workspace (persistent sidebar, toolbar, one rounded white frame, soft panels) + a visual knowledge encyclopedia (pastel subject fields, explanatory plates) + interactive learning (explorers, labs) + an editorial reading voice. v3 evolves v2 and does not replace it: plates, evidence model, content and IA are unchanged. Detailed tokens: DESIGN_SYSTEM.md. Decisions: DECISION_LOG D-026…D-033.

## v3 reference translation

The owner's five productivity-dashboard reference images were **not accessible in this session** (no files in the repository or uploads), so the translation below works from the brief's description of them, not from the images. Patterns taken: grouped left navigation with section labels, a quiet toolbar with search, a single white workspace on a cool canvas, pastel summary tiles, rounded soft cards, light shadows. Patterns deliberately **not** taken (per the brief): Kanban columns, task cards, avatars and team activity, task-management functionality. Their learning-specific equivalents:

| Dashboard pattern | UX Academy equivalent |
|---|---|
| Project/status tiles | Subject tiles (published / planned counts), My Learning stat tiles (real local counts) |
| "Continue where you left off" | Learning panel: last concept, levels read, path progress, next lesson — empty state when there is no history |
| Filter toolbar over a board | Library filter toolbar + subject/type chips over a 4/3/2/1 card grid |
| Detail side panel | Concept TOC panel, Formula Lab calculator workspace, lab "about this lab" panel |
| Activity feed | Not used — no social or fabricated activity |

## Research summary (2026-11-03)

Both references were studied in a real browser (homepage, concept pages, course syllabus).

| | Laws of UX | Uxcel (Design Foundations) | What UX Academy takes — and refuses |
|---|---|---|---|
| Visual language | Saturated full-bleed colour field per concept; one bold abstract glyph (Fitts = concentric target) | Clean SaaS, purple accent, iconography, instructor photo | Takes: concept-specific art, strong recognition, controlled colour. Refuses: abstract metaphors that don't explain; generic SaaS chrome |
| Organisation | Flat grid of concepts → concept page (definition, takeaways, origins) | Course → Levels → Lessons with exercise counts → Level Test; sticky section tabs | Takes: Levels → Lessons → Level test, exercise counts, clear progression. Refuses: certificates, gamification, paywalled-feeling locks |
| Content | Concise definitions | Short lessons, exercises | Keeps our depth: three levels, evidence, references |

Neither site's artwork, layouts or copy were reused. Laws of UX artwork is CC BY-NC-ND; every plate here is original.

## The ownable idea: diagrammatic plates

Laws of UX illustrates *metaphorically*. UX Academy illustrates *explanatorily*: each concept is a **plate** — like the plates of a scientific atlas — drawn on a tinted graph-paper field with ink line-work, solid category shapes and measurement annotations (dimension lines, labels in Plex Mono). The Fitts plate shows the start point, D, W and the corrective sub-movements; it is a diagram you can learn from, not a logo. Plates are numbered ("Pl. 01") in figure captions, reinforcing the academic voice.

## Colour (v3)

- **Action indigo** (`accent` #4c5ead) carries interaction: primary buttons, the active nav item, selected chips, links and focus. It is calm, it is distinct from every subject wash, and it passes ≥4.8:1 everywhere.
- **Rubric red** is kept as the *heritage editorial* accent: the § wordmark, knowledge-type labels, the A–Z index letters. It is no longer the interaction colour (supersedes D-014/D-017 on that point; see D-027).
- **Eleven pastel subject washes** identify *where you are*. They appear in subject tiles, card subject pills, concept/lesson/path heroes, plates and explorer canvases. They never appear in evidence, status or body text. Evidence keeps its neutral three-bar glyph + label.
- **Callout roles** reuse the washes as *content-role* identity (definition, analogy, example, application, research, limitation, misconception…), always with a written label (D-030).
- **One gradient:** the homepage hero (violet → blue → teal washes). Featured panels may use a wash → surface fade. No other gradients.

## Typography (v3)

Plex Sans 600 for UI, navigation and workspace headings; Newsreader for the editorial moments (concept, lesson and planned-topic titles, the featured concept, the evidence ledger title, the hero accent, analogies and quotes) and for long-form reading; Plex Mono for formulas and data.

## Layout (v3)

- **Shell:** sidebar 248px expanded / 76px collapsed (tooltips), topbar 68px, one 24px-radius workspace frame on ≥1024px; a modal drawer below 1024px. No page draws its own outer frame.
- **Three page families:** A Workspace (home, library, subjects, learn, My Learning, reference pages) — sans titles, panels, grids. B Editorial (concepts, lessons, planned topics) — pastel hero with an editorial title, 70ch reading column, sticky TOC, differentiated callouts. C Experimental (Formula Lab, labs, graph) — split workspaces: specification/canvas and controls/results side by side.
- **Bounded pages:** the homepage was cut from nine sections to seven and the v2 "connections" section moved to the graph, so the page has a clear end.
- Grids keep `minmax(0,1fr)` tracks; the library grid uses container queries (`@container`) so column count follows the space beside the sidebar, not the viewport.
