# UI/UX design direction (v2)

**Direction:** premium editorial + visual encyclopedia + interactive learning + modern academic. An evolution of the v1 "Rubric" system, not a replacement.

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

## Colour: brand accent + subject palettes

- **Rubric red** remains the brand and interaction accent (links, focus, active states, primary rules).
- **Eleven subject families** (rose, violet, teal, blue, amber, green, peach, cyan, indigo, slate, core) identify *where you are* in the discipline. Twenty domains map onto them (`lib/content/categories.ts`).
- Colour **never** encodes evidence. Evidence keeps its neutral three-bar glyph + text label everywhere; the home ledger states this explicitly.
- Category colour appears in: plates, the 4px subject rule atop headers, small identity dots, explorer canvases, path ladders, graph nodes. Not in body text or large UI chrome.

## Typography roles

Newsreader for editorial display and long-form reading (`.t-hero`, `.t-page`, `.t-section`, `.t-lede`, `.prose-read`); IBM Plex Sans for interface and sub-headings (`.t-sub`, `.label`, `.t-caption`); IBM Plex Mono for formulas, numbers and plate annotations (`.formula`). The display serif is no longer used for every heading — UI-level headings (filters, card meta, curriculum rows) use Plex Sans 600.

## Layout principles

- Editorial grids, not card-everything: hero splits text | plate; ledgers use ruled cells; curricula use ruled rows.
- Cards exist where browsing needs them (library, subjects, paths, labs) and come in distinct variants (standard, featured, formula, compact, planned).
- Grids default to `minmax(0,1fr)` tracks so long content can never widen a phone layout.

## Hard rules kept from v1

Borders over shadows; near-square radii; no gradients or glassmorphism; one brand accent; planned topics always labelled; no fabricated numbers — every count is derived from content.
