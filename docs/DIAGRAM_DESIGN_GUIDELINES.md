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

## Interactive parts

- Every control in a figure or explorer is a native element (button, input, select, summary, link) reachable by Tab and operable by keyboard; live readouts are `aria-live="polite"`.
- Targets are at least 24 × 24 CSS px (WCAG 2.2 SC 2.5.8): use the `.tap` utility for standalone links and toggles, `min-h-6` on checkbox labels; range inputs and `<summary>` get it from the base styles. Inline links in sentences are exempt.
- A row of tiny segments that would be too narrow to tap on a phone (for example a 15-lesson progress rail) becomes a static indicator there, with Previous/Next links doing the navigation.
- Tested by `tests/browser/keyboard.cjs` (keyboard paths, accessibility tree) and `tests/browser/devices.cjs` (device emulation, target size).

## Theming

Diagrams use only token colours, so dark mode is automatic. Check both themes, especially pastel fields (`c-wash`), hatch textures and SVG strokes against `surface`.

## Dark technical editorial diagrams (v6, D-086)

Level-2 figures that explain a system, an architecture or a process (see § Level 2 standard below for choosing the language) sit on a dark `.viz-panel` (`bg-viz-bg`, engineering grid) inside the usual figure frame, which keeps its title, objective, takeaway, text version and sources. Inside the panel: graphite module cards (`bg-viz-surface-1/2`, `border-viz-edge`), white primary text and grey secondary text, small monospace section labels, bracket corners for annotations, one amber element for the main idea, positive green and warning coral only where they carry meaning and always with a second cue (dashed line, cross, label). Connectors are SVG and hidden when the layout stacks; miniature visuals are `aria-hidden` because the adjacent text states the same thing. Reference implementations: `components/visual-explanations/concepts/accessibility-concept.tsx` (comparison) and `concepts/design-system.tsx` (layered architecture and a process with stop and return paths). Full art direction: docs/ILLUSTRATION_SYSTEM.md § Dark technical editorial.

## Level 2 standard (v6.1, D-089)

Every Level-2 figure has: a figure type and method; a clear title; a one-sentence objective; one dominant visual idea; parts and relationships drawn with real HTML text and token-coloured SVG; a key or legend whenever line styles or colours carry meaning; a takeaway; an ordered text version; sources from the entry's references; a verification kind. Use the instructional sheet language (light, theme-aware, app tokens) for anatomy, measurement and correction figures and the dark `.viz-panel` for systems and routed relationships; plain cards of paragraphs are not a Level-2 figure.

