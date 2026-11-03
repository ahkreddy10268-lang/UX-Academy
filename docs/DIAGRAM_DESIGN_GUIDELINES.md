# Diagram design guidelines

These rules cover Level-2 visual explanations (`components/visual-explanations/`) and the drawn parts of plates. Plate-specific rules are in `docs/ILLUSTRATION_SYSTEM.md`.

## Every diagram answers five questions

1. **What am I looking at?** A kind label (e.g. "Process diagram"), the level, a title and a one-sentence objective, all in the figure header.
2. **What is the main idea?** The diagram's most prominent element carries it; the takeaway restates it underneath.
3. **What are its parts?** Numbered markers in the drawing, repeated in a key or legend.
4. **How do they connect?** Arrows with a direction and, where needed, a label. Every connector means something; there are no decorative lines.
5. **What should I understand?** The "Take away" line in the caption.

## Build with real text

- Lay out diagrams in **HTML/CSS** (grid, flex, lists). Labels are then real text: searchable, translatable, scalable with the reader's font size, and read in order by assistive technology.
- Use **SVG** only for shapes and connectors (diamonds, wedges, arrows, Venn circles, geometry), coloured through CSS variables (`var(--c)`, `var(--c-ink)`, `var(--ink)`, `var(--accent)`, …). Never use hex values in components.
- Never flatten an interactive or quantitative diagram into an image. Don't use generated images for anything carrying quantitative meaning.
- Put numbers in diagrams only when they come from `lib/formulas`, the entry, or a stated illustrative input (and the figure is badged **Illustrative example**).

## Hierarchy and labels

- One dominant element per diagram: the decision gate, the working-memory box, the target. Supporting parts are quieter, either `surface` cards with hairlines or soft fields.
- Labels: Plex Sans 14px for node titles, 13–14px for body text, 11px minimum for tags. Avoid labels inside SVG where an HTML label can sit beside the shape.
- Use a consistent marker style: accent circles (`Marker`) for parts and system numbers; category ink for phase numbers.
- Meaning never rests on colour alone: modes have a wedge glyph **and** a tag ("open up / narrow down"); load types have a fill **and** a hatch texture (`.hatch-extraneous`) **and** a number; paths and targets are tinted **and** carry screen-reader text.

## Responsive behaviour

- Diagrams respond to the width of their own container (`@container` on the figure body; variants `@xl/@2xl/@3xl/@4xl/@6xl`), not to the viewport, because the sidebar and frame change the space available.
- Horizontal sequences become vertical, and `FlowArrow` rotates from pointing down to pointing right at the given container width (`turn`).
- Comparisons stack; trees stay trees (indentation, not a wide canvas); system diagrams place the drawing above its explanation.
- Never crop essential information to keep an aspect ratio. Every diagram also has a text version.

## Honesty

- Mark scenario-based figures (example interfaces, sites, charts) with `verification: "illustrative"`; the figure shows an "Illustrative example" badge.
- Comparisons state the kind of effect: **computed** with the tested formula, **illustrative**, or **measured** (cite the source).
- Conceptual models of the mind say so ("a conceptual model, not a diagram of the brain"), and illustrative proportions are labelled as such.
- Sources listed under a figure must be the entry's own references (tested).

## Theming

Diagrams use only token colours, so dark mode is automatic. Check both themes, especially pastel fields (`c-wash`), hatch textures and SVG strokes against `surface`.
