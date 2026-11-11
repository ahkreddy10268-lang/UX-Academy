import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "responsive-systems",
  slug: "responsive-systems",
  title: "Responsive Systems",
  alternateNames: ["Responsive design system", "Breakpoint system", "Layout grid system", "Adaptive layout system"],
  summary:
    "The shared rules a design system uses to adapt layouts to any space: named breakpoints, a column grid, fluid and stepped values, container-aware components and accessibility floors such as reflow at 320 CSS px.",
  definition:
    "A responsive system is the **set of layout decisions a design system publishes so every product adapts the same way**: (1) **breakpoints** — named width ranges; (2) a **grid** — columns, gutters and margins per breakpoint; (3) **adaptation rules** — which tokens change (layout spacing, type steps) and which stay fixed (component padding, target size); and (4) **component responsiveness** — components that respond to the space they are given (container queries), not only to the screen. It is distinct from responsive *composition* (how one page is arranged) and from single-page breakpoint technique.",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "scales",
  tags: ["responsive", "breakpoints", "grid", "columns", "gutters", "container queries", "fluid", "reflow", "size classes"],
  difficulty: "intermediate",
  disciplines: ["Visual design", "Design systems", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Define breakpoints and a column grid, and compute column widths.",
    "Decide which tokens adapt across breakpoints and which stay fixed.",
    "Use container queries so components adapt to their slot, not the viewport.",
    "Meet reflow, orientation and resize requirements.",
  ],
  prerequisites: ["spacing-scales", "typography-scales"],

  levels: {
    beginner: {
      explanation: [
        "A library app works on a phone, a tablet in a reading nook and a desktop at the front desk. If each team decides separately when the layout changes and how wide columns are, the same book list looks different everywhere and breaks at sizes nobody tried.",
        "A **responsive system** sets shared rules. It names a few **breakpoints** — width ranges such as small, medium and large — and gives each a **grid** of columns with fixed gaps between them. Layouts are built on the grid, so they line up and change at the same points across the product.",
        "It also says what may change. Page margins and gaps between cards can grow on bigger screens; the size of a button's tap area and the padding inside components stay the same.",
      ],
      analogy:
        "A bookcase with adjustable shelves: the frame (grid) is fixed, the shelves (breakpoints) move to fit what you store, and every book (component) keeps its own size.",
      everydayExamples: [
        "A list that shows one column on a phone and three on a desktop.",
        "Navigation that collapses into a menu on small screens.",
        "A card that shows its image beside the text when it has room, and above it when narrow.",
      ],
      vocabulary: [
        { term: "Breakpoint", meaning: "A width at which the layout changes." },
        { term: "Grid", meaning: "Columns separated by gutters, inside margins, that layouts align to." },
        { term: "Gutter", meaning: "The fixed gap between grid columns." },
        { term: "Container query", meaning: "A rule that adapts a component to the width of its container instead of the screen." },
        { term: "Reflow", meaning: "Content rearranging into one column so it can be read without scrolling sideways." },
      ],
    },
    intermediate: {
      explanation: [
        "**Breakpoints and grid.** Carbon's 2x Grid uses an 8 px mini unit and five breakpoints: Small 320 px (4 columns), Medium 672 (8), Large 1056 (16), X-Large 1312 (16) and Max 1584 (16), with gutterless or 32 px gutters; columns are fluid between breakpoints, and teams should test at each one {{src:carbon-2x-grid}}. Apple describes layout with size classes rather than device types, plus safe areas and system margins {{src:apple-hig-layout}}.",
        "**Column maths.** Column width = (container − 2 × margin − (columns − 1) × gutter) ÷ columns. With 32 px gutters and 16 px margins, a 1056 px container gives 16 columns of 34 px; a 672 px container gives 8 columns of 52 px. A 320 px container with no outer margin gives 4 columns of 56 px. Grids also make spans predictable: a component spanning 8 of 16 columns stays half the content width.",
        "**What adapts.** Layout spacing and type can step at breakpoints — GOV.UK has a responsive spacing scale and smaller type on small screens {{src:govuk-spacing}} {{src:govuk-type-scale}} — or grow fluidly with `clamp()` {{src:mdn-clamp}}. Component padding and target sizes stay fixed, so components behave the same wherever they are placed (see [[spacing-scales]]).",
        "**Components respond to their slot.** Container queries apply styles based on a container's size rather than the viewport {{src:mdn-container-queries}}. A book card in a narrow sidebar and the same card in a wide main column can then choose their own layout, which media queries alone cannot do.",
      ],
      howItWorks: [
        "Named breakpoints and a fixed column system give every team the same coordinates, so layouts align and change together.",
        "Splitting adaptive tokens (layout gaps, display type) from fixed ones (component padding, targets) keeps components portable while pages adapt.",
      ],
      implementation: [
        "Define a few breakpoints from content needs and common widths; name them by size (sm, md, lg), not device.",
        "Publish columns, gutters and margins per breakpoint as tokens; compute column widths rather than eyeballing.",
        "Build mobile-first: start with the narrowest layout and add columns as space allows.",
        "Content must reflow at 320 CSS px wide without two-dimensional scrolling, except for content that needs it such as data tables and maps [WCAG 2.2 SC 1.4.10 Reflow, AA] {{src:w3c-wcag-22}}.",
        "Do not lock orientation unless essential [SC 1.3.4 Orientation, AA]; text must resize to 200% [SC 1.4.4, AA] {{src:w3c-wcag-22}}.",
        "Use container queries for components that appear in slots of different widths {{src:mdn-container-queries}}.",
      ],
      scenarios: [
        "**Illustrative.** The library app's catalogue uses 1, 2 and 4 columns at sm, md and lg. A 'Recommended' rail in the sidebar reuses the card; with a container query the card stacks image above text when its container is under 360 px, whatever the screen size.",
        "**Illustrative.** At 400% zoom on a 1280 px screen (equivalent to 320 CSS px), the loan table scrolls sideways but every other region reflows to one column — the table is an allowed exception; the filter bar is not.",
        "**Critique protocol.** For each layout: which breakpoints change it? Is it on the grid? Do component paddings stay fixed? Does it reflow at 320 CSS px? Are components that move between slots container-aware?",
      ],
    },
    advanced: {
      explanation: [
        "**Fluid between steps.** Carbon fixes a master grid at breakpoints but lets columns grow fluidly between them {{src:carbon-2x-grid}}. Fluid type and spacing with `clamp()` remove jumps but need bounds that still allow zoom: MDN advises a relative maximum at least twice the minimum for text {{src:mdn-clamp}}.",
        "**Viewport vs container.** Media queries respond to the viewport; container queries respond to the component's container {{src:mdn-container-queries}}. A system usually uses media queries for page templates and navigation, and container queries inside components. Container query units (`cqi`) let type inside a component scale with its container.",
        "**Platform layouts.** Native platforms think in size classes, safe areas and margins {{src:apple-hig-layout}}. Cross-platform systems map their breakpoints to these concepts rather than to device models, since window sizes vary with split views and foldables.",
        "**Testing.** Test at each breakpoint and just below it, at 320 CSS px for reflow, at 200% text size and 400% zoom, and in both orientations. Visual regression across a breakpoint matrix catches most layout drift.",
      ],
      evidence: [
        "Responsive systems are **documented practice**: Carbon, Apple and GOV.UK publish breakpoints, grids and adaptive scales {{src:carbon-2x-grid}} {{src:apple-hig-layout}} {{src:govuk-spacing}} {{src:govuk-type-scale}}; container queries and `clamp()` are documented web platform features {{src:mdn-container-queries}} {{src:mdn-clamp}}. Specific breakpoint values are conventions without experimental comparison. Reflow, orientation and resize are WCAG 2.2 success criteria {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Device breakpoints or content breakpoints?** Device-based values age as devices change; content-based breakpoints (where the layout breaks) last longer but vary by page.",
        "**Fluid or adaptive?** Fluid layouts use every width; stepped layouts are easier to design and test. Most systems combine a stepped grid with fluid columns.",
        "**Container queries everywhere?** They make components portable, but too many container contexts can make layout harder to reason about.",
      ],
      alternativeModels: [
        "**Intrinsic layout** — CSS grid `auto-fit`/`minmax()` and flex-wrap let content decide columns without named breakpoints.",
        "**Separate mobile and desktop designs** — adaptive rather than responsive; full control per size but double the maintenance.",
      ],
    },
  },

  application: {
    summary: ["Responsive systems apply to page templates, navigation, grids, data tables, media and every component that appears in slots of different sizes."],
    web: ["Publish breakpoint and grid tokens; media queries for templates; container queries for components; `clamp()` for display type and layout gaps."],
    mobile: ["Map breakpoints to size classes and window sizes; respect safe areas; support split views and rotation."],
    enterprise: ["Data-heavy screens need explicit rules for tables (scroll, priority columns, card view) at small widths."],
    services: ["Kiosks, TVs and printed outputs are further size classes with their own margins and type steps."],
    steps: [
      "Collect the widths and layouts in use; find where layouts break.",
      "Choose breakpoints and a grid; compute columns.",
      "Classify tokens as adaptive or fixed.",
      "Make slot-dependent components container-aware.",
      "Test breakpoints, 320 CSS px reflow, 200% text, 400% zoom and orientation.",
    ],
  },

  whenToUse: [
    "Any product used on more than one screen size or window size.",
    "When components are reused in slots of different widths.",
  ],
  whenNotToUse: [
    "As a reason to hide content on small screens that users still need; adapt it instead.",
    "As a fixed device list: breakpoints should follow content and window sizes, not specific devices.",
  ],
  advantages: [
    "Layouts align and adapt consistently across products.",
    "Components stay portable between slots.",
    "Accessibility floors (reflow, resize, orientation) are designed in once.",
  ],
  limitations: [
    "Breakpoint values are conventions; content may break between them.",
    "Fluid and container-based rules are harder to test exhaustively.",
    "Some content (tables, maps) cannot reflow fully and needs dedicated patterns.",
  ],
  misconceptions: [
    {
      myth: "Responsive means designing for phone, tablet and desktop.",
      reality:
        "Windows come in every width, including split views and zoomed desktops. Apple describes layout by size classes rather than devices {{src:apple-hig-layout}}; systems test ranges and the points where content breaks.",
    },
    {
      myth: "Media queries are enough for responsive components.",
      reality:
        "Media queries see the viewport, not the component's slot. Container queries let a component adapt to the space it is given {{src:mdn-container-queries}}.",
    },
  ],

  relations: [
    { target: "spacing-scales", type: "applied-in", note: "Layout gaps adapt; component padding stays fixed." },
    { target: "typography-scales", type: "applied-in", note: "Type steps adapt at breakpoints or fluidly." },
    { target: "semantic-tokens", type: "applied-in", note: "Breakpoint and grid tokens." },
    { target: "theme-architecture", type: "related-to", note: "Breakpoints remap tokens like a theme dimension." },
    { target: "visual-hierarchy", type: "related-to", note: "Hierarchy must survive at every width." },
    { target: "design-system", type: "applied-in", note: "Breakpoints and the grid are system foundations." },
  ],

  practice: {
    dos: [
      { text: "Publish named breakpoints and a computed column grid as tokens.", why: "Shared coordinates keep layouts aligned; Carbon defines columns and gutters per breakpoint {{src:carbon-2x-grid}}.", kind: "system" },
      { text: "Make components that move between slots respond to their container.", why: "Container queries adapt to the container rather than the viewport {{src:mdn-container-queries}}.", kind: "platform" },
      { text: "Test reflow at 320 CSS px, 200% text and both orientations.", why: "WCAG 2.2 SC 1.4.10, 1.4.4 and 1.3.4 (AA) {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't name breakpoints after devices.", why: "Window sizes vary with split views and zoom; Apple uses size classes, not device types {{src:apple-hig-layout}}.", kind: "platform" },
      { text: "Don't make component padding or target size shrink on small screens.", why: "Targets must stay at least 24 px [SC 2.5.8, AA] {{src:w3c-wcag-22}}; fixed component spacing keeps components portable.", kind: "standard" },
      { text: "Don't lock the layout to one orientation.", why: "Orientation must not be restricted unless essential [SC 1.3.4, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "Breakpoints, grid tokens and a container-aware card",
        language: "css",
        code: `:root {
  /* grid: column = (container − 2×margin − (n−1)×gutter) / n */
  --grid-columns: 4;  --grid-gutter: 2rem;  --grid-margin: 0;
}
@media (min-width: 42rem)  { :root { --grid-columns: 8;  --grid-margin: 1rem; } }   /* md 672px: 52px cols */
@media (min-width: 66rem)  { :root { --grid-columns: 16; } }                         /* lg 1056px: 34px cols */

.page-grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
  gap: var(--grid-gutter);
  padding-inline: var(--grid-margin);
}

/* the card adapts to its slot, not the screen */
.book-card-slot { container-type: inline-size; }
.book-card      { display: grid; gap: var(--space-150); }
@container (min-width: 22.5rem) {          /* 360px */
  .book-card    { grid-template-columns: 6rem minmax(0, 1fr); }
}`,
        caption: "Illustrative, using Carbon's breakpoint widths (expressed in rem) with 32 px gutters. Column widths computed with this course's grid formula.",
      },
      {
        title: "Tailwind CSS v4: named breakpoints and container queries",
        language: "css",
        code: `@theme {
  --breakpoint-md: 42rem;   /* 672px */
  --breakpoint-lg: 66rem;   /* 1056px */
}
/* <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">        page layout (viewport)
   <div class="@container"><article class="grid @sm:grid-cols-[6rem_1fr]">  card (container) */`,
        caption: "Illustrative. Tailwind v4 reads breakpoints from theme variables and supports container-query variants with `@container`.",
      },
    ],
  },

  exercises: [
    {
      id: "responsive-systems-ex-grid",
      kind: "calculation",
      level: "beginner",
      title: "Compute the columns",
      prompt: ["A container is 672 px wide with 16 px outer margins, 8 columns and 32 px gutters. Compute the column width, then the width of a component spanning 4 columns."],
      deliverable: "Both widths with the working shown.",
      criteria: ["Formula applied", "Gutters inside the span counted", "Units stated"],
      exampleSolution: [
        "Column = (672 − 2 × 16 − 7 × 32) ÷ 8 = (672 − 32 − 224) ÷ 8 = 416 ÷ 8 = 52 px.",
        "Span of 4 = 4 × 52 + 3 × 32 = 208 + 96 = 304 px.",
      ],
    },
    {
      id: "responsive-systems-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix a layout that breaks at zoom",
      prompt: [
        "Illustrative case. The library app's search page has a fixed 1100 px wide filter bar, breakpoints named 'iphone' and 'ipad', and a book card that uses a media query, so in the 300 px sidebar it tries to lay out side by side. The app forces portrait orientation on tablets.",
        "Work through the correction sequence.",
      ],
      deliverable: "Corrected breakpoints, grid, card and orientation rules with tests.",
      criteria: ["Reflow fixed", "Breakpoints renamed by size", "Card container-aware", "Orientation unlocked"],
      exampleSolution: [
        "1. Symptoms: horizontal scrolling at zoom; cramped sidebar cards; locked orientation.",
        "2. Impact: low-vision users zooming to 400% must scroll in two directions; tablet users on stands cannot rotate.",
        "3. Causes: fixed widths; device-named breakpoints; viewport queries inside a component; orientation lock.",
        "4. Requirements: reflow at 320 CSS px [WCAG 2.2 SC 1.4.10, AA]; orientation not restricted [SC 1.3.4, AA].",
        "5. Correction: filter bar wraps on the grid; breakpoints sm/md/lg; card uses a container query at 360 px; remove the orientation lock.",
        "6. Validation: 400% zoom at 1280 px; sidebar and main column card checks; rotation test.",
        "7. Trade-off: filters take two rows on narrow widths; collapse rarely used filters behind a 'More filters' button.",
      ],
    },
    {
      id: "responsive-systems-ex-tokens",
      kind: "reflection",
      level: "advanced",
      title: "Adaptive or fixed?",
      prompt: ["Classify twenty tokens from a system (spacing, type, radius, elevation, targets) as adaptive or fixed across breakpoints, and justify each choice."],
      deliverable: "A classified token table with reasons.",
      criteria: ["Component vs layout distinction", "Accessibility floors fixed", "Reasons stated"],
    },
  ],

  quiz: [
    {
      id: "responsive-systems-q-breakpoint",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What is a breakpoint?",
      options: [
        { text: "A width at which the layout changes", correct: true, explanation: "Breakpoints mark layout changes." },
        { text: "A bug that breaks the page", correct: false, explanation: "Not in this sense." },
        { text: "A device model", correct: false, explanation: "Breakpoints are widths, not devices." },
        { text: "A point where text stops wrapping", correct: false, explanation: "That is not a breakpoint." },
      ],
      explanation: "Breakpoints are width thresholds.",
    },
    {
      id: "responsive-systems-q-container",
      kind: "scenario",
      level: "intermediate",
      prompt: "The same card appears in a 300 px sidebar and a 900 px main column on a wide screen. Which technique lets it lay out correctly in both?",
      options: [
        { text: "A container query on the card's slot", correct: true, explanation: "It responds to the container's width." },
        { text: "A media query on the viewport", correct: false, explanation: "The viewport is the same for both slots." },
        { text: "A larger breakpoint", correct: false, explanation: "Breakpoints still read the viewport." },
        { text: "Hiding the sidebar card", correct: false, explanation: "That removes content." },
      ],
      explanation: "Components adapt to their slot.",
    },
    {
      id: "responsive-systems-q-grid",
      kind: "formula",
      level: "advanced",
      prompt: "A 1056 px container has 16 columns, 32 px gutters and 16 px margins. What is the column width?",
      options: [
        { text: "34 px", correct: true, explanation: "(1056 − 32 − 15 × 32) ÷ 16 = 544 ÷ 16 = 34." },
        { text: "66 px", correct: false, explanation: "That is 1056 ÷ 16, ignoring gutters and margins." },
        { text: "32 px", correct: false, explanation: "That is the gutter." },
        { text: "64 px", correct: false, explanation: "That subtracts only margins." },
      ],
      explanation: "Subtract margins and gutters before dividing.",
    },
  ],

  flashcards: [
    { id: "responsive-systems-fc-define", front: "Responsive system", back: "Shared breakpoints, grid, adaptation rules and container-aware components." },
    { id: "responsive-systems-fc-formula", front: "Column width", back: "(container − 2 × margin − (columns − 1) × gutter) ÷ columns." },
    { id: "responsive-systems-fc-carbon", front: "Carbon 2x Grid breakpoints", back: "Small 320 (4 cols), Medium 672 (8), Large 1056 (16), X-Large 1312 (16), Max 1584 (16); 8 px mini unit." },
    { id: "responsive-systems-fc-wcag", front: "WCAG 2.2 criteria for responsive systems", back: "1.4.10 Reflow (AA, 320 CSS px), 1.3.4 Orientation (AA), 1.4.4 Resize Text (AA), 2.5.8 Target Size (AA)." },
  ],

  references: [
    { source: "carbon-2x-grid", role: "primary", note: "Breakpoints, columns, gutters, fluid columns." },
    { source: "apple-hig-layout", role: "primary", note: "Size classes, safe areas, margins." },
    { source: "mdn-container-queries", role: "explanatory", note: "Container queries." },
    { source: "mdn-clamp", role: "explanatory", note: "Fluid values and zoom." },
    { source: "govuk-spacing", role: "explanatory", note: "Responsive spacing scale." },
    { source: "govuk-type-scale", role: "explanatory", note: "Smaller type on small screens." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.3.4, 1.4.4, 1.4.10, 2.5.8." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Documented design-system practice and documented web platform features. Breakpoint values are conventions. Reflow, orientation and resize are WCAG 2.2 success criteria.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
