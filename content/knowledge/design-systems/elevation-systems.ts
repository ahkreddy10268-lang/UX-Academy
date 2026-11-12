import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "elevation-systems",
  slug: "elevation-systems",
  title: "Elevation Systems",
  alternateNames: ["Elevation", "Shadow scale", "Depth system", "Z-index scale", "Layering"],
  summary:
    "A small set of named depth levels — each with a defined shadow, surface tone or outline, and a stacking order — that tells people which surface is on top and what will move or close.",
  definition:
    "An elevation system defines **how many layers a product has, how each is drawn and how they stack**. Each level is a token with (1) a **visual treatment** — a shadow, a lighter tonal surface, an outline, or a combination — and (2) a **stacking order** (z-index) for overlays such as menus, dialogs and toasts. Elevation communicates **hierarchy and temporariness**: raised surfaces are interactive or in front; the highest are temporary and often block what is behind.",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "scales",
  tags: ["elevation", "shadow", "depth", "z-index", "layering", "tonal surface", "dark mode", "overlay", "dialog"],
  difficulty: "intermediate",
  disciplines: ["Visual design", "Design systems", "Front-end engineering"],
  learningObjectives: [
    "Explain what elevation communicates and why few levels work better than many.",
    "Render elevation with shadows, tonal surfaces or outlines, and choose by theme and platform.",
    "Tie visual levels to a stacking order so overlays never collide.",
    "Keep elevation accessible: boundaries, focus visibility and motion.",
  ],
  prerequisites: ["visual-hierarchy", "primitive-tokens", "colour-systems"],

  levels: {
    beginner: {
      explanation: [
        "In a library app, a book card, a 'Sort by' menu and a 'Return this book?' dialog all appear on the same page. If each has a different made-up shadow, it is hard to tell which one is on top or which will close when you tap elsewhere.",
        "An **elevation system** gives the product a few depth levels — for example flat page, raised card, floating menu and dialog — and draws each the same way everywhere. Higher levels sit in front, cast stronger shadows and are usually temporary.",
        "People read depth quickly: something that looks lifted seems separate and in front. The system makes that impression consistent, so a menu always looks like a menu.",
      ],
      analogy:
        "Sheets of paper on a desk: the higher a sheet, the larger and softer its shadow, and the more it covers what is underneath.",
      everydayExamples: [
        "A dropdown menu casting a shadow over the page.",
        "A dialog dimming the page behind it.",
        "A card that lifts slightly when hovered.",
      ],
      vocabulary: [
        { term: "Elevation", meaning: "How far a surface appears to sit above the one behind it." },
        { term: "Level", meaning: "One named step of elevation, such as card or dialog." },
        { term: "Shadow", meaning: "A drawn shade that suggests a surface is raised." },
        { term: "Tonal surface", meaning: "Showing height with a lighter or tinted surface colour instead of, or as well as, a shadow." },
        { term: "Stacking order", meaning: "Which layer is drawn on top when layers overlap (z-index on the web)." },
      ],
    },
    intermediate: {
      explanation: [
        "**Few levels.** Material Design 3 treats elevation as distance on the z-axis, measured in dp, and recommends a small number of levels; its tokens record the distance, not a shadow or colour, and each platform decides how to draw it — as a tonal surface colour or a shadow — using shadows only where extra separation or interaction needs them {{src:m3-elevation}}. Fluent 2 publishes a shadow ramp of 2, 4, 8, 16, 28 and 64, each with light and dark versions {{src:fluent-2-elevation}}.",
        "**Rendering depends on theme and platform.** Shadows are weak on dark surfaces, so dark themes often show height by making higher surfaces lighter, which Material 3 calls tonal elevation {{src:m3-elevation}}. Fluent 2 notes that Windows uses strokes instead of key shadows and that shadows on coloured surfaces need a different calculation {{src:fluent-2-elevation}}.",
        "**Elevation is also a stacking contract.** Each level needs a z-index band (base, sticky, dropdown, overlay, dialog, toast) so that a sticky header never covers an open menu and a toast is never trapped under a dialog's backdrop.",
        "**Interaction.** Components change elevation consistently on interaction — Material 3's example is a button raised one level on hover {{src:m3-elevation}}. A shape rule travels with depth: nested surfaces keep concentric corners (R_outer = R_inner + padding), as in [[spacing-scales]].",
      ],
      howItWorks: [
        "Shadows and tonal shifts use the visual system's tendency to read occlusion and shading as depth, so a raised surface is seen as separate and in front.",
        "Linking each visual level to a z-index band makes the drawing and the behaviour agree: whatever looks highest is drawn on top and is the one that closes first.",
      ],
      implementation: [
        "Define four to six levels and name them by use (surface, raised, overlay, dialog), not by shadow size.",
        "Publish each as a token with light and dark treatments, plus a z-index band.",
        "Do not rely on a shadow alone to show where a control is: its boundary needs 3:1 contrast with adjacent colours where it identifies the control [WCAG 2.2 SC 1.4.11 Non-text Contrast, AA] {{src:w3c-wcag-22}}.",
        "Keep focused elements visible: sticky headers, banners and other raised layers must not entirely hide the focused item [SC 2.4.11 Focus Not Obscured (Minimum), AA] {{src:w3c-wcag-22}}.",
        "Let users turn off non-essential motion triggered by interaction, such as lift animations [SC 2.3.3 Animation from Interactions, AAA] {{src:w3c-wcag-22}}; honour `prefers-reduced-motion`.",
      ],
      scenarios: [
        "**Illustrative.** The library app has eleven shadow values and z-index numbers up to 99999. Mapping them to five levels and five z-index bands removes the case where the 'Renew' toast appeared under the dialog backdrop.",
        "**Illustrative.** In dark mode, cards and page look identical because the shadow disappears on near-black. Making raised surfaces one tonal step lighter restores the separation.",
        "**Critique protocol.** For each raised surface: which level is it? Is its stacking band right? Is it visible in dark mode? Does its control boundary pass 3:1? Can it hide the focused element?",
      ],
    },
    advanced: {
      explanation: [
        "**Composite shadow tokens.** The DTCG format defines a shadow composite type (colour, offsets, blur, spread, inset) and allows a shadow token to hold a list of layers {{src:dtcg-format-2025}}. Two layers — a tight 'key' shadow and a soft 'ambient' one — look more natural than one large blur, which is how many ramps are built.",
        "**Semantic levels.** Primitive shadows (`shadow.8`) sit beneath semantic levels (`elevation.overlay`) that components use; a theme remaps levels to shadows in light mode and to tonal surfaces plus faint shadows in dark mode. High-contrast themes often replace both with an outline.",
        "**Stacking contexts.** On the web, `transform`, `opacity` below 1 and other properties create new stacking contexts, so a z-index token cannot rescue an overlay rendered inside one. Overlays should be rendered at the top level (a portal, or the native `<dialog>` and popover top layer).",
        "**Measuring.** Useful signals: raw z-index and box-shadow values in code, overlay-collision bugs, and focus-obscured findings in accessibility audits.",
      ],
      evidence: [
        "Elevation systems are **documented practice**: Material 3 and Fluent 2 publish levels, tokens and theme behaviour {{src:m3-elevation}} {{src:fluent-2-elevation}}. Shading and occlusion as depth cues are well established in perception research; specific level counts and shadow values are design conventions without experimental comparison. Non-text contrast, focus visibility and animation from interactions are WCAG 2.2 success criteria {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Shadow or tone?** Shadows read well on light surfaces; tonal elevation works better in dark themes but can be confused with selection or status tints.",
        "**Flat design.** Removing depth simplifies visuals but can hide which elements are interactive or temporary; many systems keep a minimal set of levels.",
        "**How many levels?** More levels allow finer hierarchy, but people cannot reliably distinguish many shadow steps.",
      ],
      alternativeModels: [
        "**Outline-only layering** — borders and backdrops instead of shadows; robust in high contrast and print.",
        "**Material metaphors** — translucent or blurred layers (as in some platform materials); expressive, but contrast varies with what is behind.",
      ],
    },
  },

  application: {
    summary: ["Elevation applies to cards, menus, popovers, sheets, dialogs, toasts and sticky elements — every surface that overlaps another."],
    web: ["Publish shadow and z-index tokens; render overlays in the top layer; switch to tonal surfaces in dark themes."],
    mobile: ["Use platform elevation APIs and materials; map levels to native components (sheets, alerts)."],
    enterprise: ["Dense tools need clear overlay order: inline editors, popovers and side panels must not collide."],
    services: ["In printed material, depth becomes borders and spacing."],
    steps: [
      "Inventory shadows and z-index values.",
      "Define four to six levels by use with a z-index band each.",
      "Specify light, dark and high-contrast treatments.",
      "Publish composite tokens; render overlays in the top layer.",
      "Check boundaries, focus visibility and reduced motion.",
    ],
  },

  whenToUse: [
    "Any interface with overlapping surfaces: menus, dialogs, sheets, toasts, sticky bars.",
    "When dark mode or multiple platforms must express the same hierarchy.",
  ],
  whenNotToUse: [
    "As decoration: shadows on surfaces that are not raised blur the hierarchy.",
    "As the only cue that something is interactive or bounded: pair it with a border, label or shape.",
  ],
  advantages: [
    "Makes layer order and temporariness clear.",
    "Prevents overlay collisions through shared stacking bands.",
    "Lets themes and platforms render depth natively.",
  ],
  limitations: [
    "Shadows lose strength on dark and coloured surfaces.",
    "Subtle steps are hard to tell apart.",
    "Stacking tokens cannot fix stacking contexts created elsewhere in CSS.",
  ],
  misconceptions: [
    {
      myth: "Elevation means shadows.",
      reality:
        "Elevation is distance; shadows are one rendering. Material 3 tokens carry no shadow or colour and can be shown as tonal surface colour instead {{src:m3-elevation}}.",
    },
    {
      myth: "A higher z-index always puts an element on top.",
      reality:
        "z-index only compares elements within the same stacking context; an overlay inside a transformed parent can stay below others whatever its z-index.",
    },
  ],

  relations: [
    { target: "colour-systems", type: "related-to", note: "Tonal elevation uses surface colour roles." },
    { target: "primitive-tokens", type: "applied-in", note: "Shadow values are composite primitives." },
    { target: "semantic-tokens", type: "applied-in", note: "Levels such as elevation.overlay are semantic." },
    { target: "theme-architecture", type: "applied-in", note: "Themes remap levels to shadows, tones or outlines." },
    { target: "visual-hierarchy", type: "derived-from", note: "Depth is one way to show what comes first." },
    { target: "spacing-scales", type: "complementary-to", note: "Nested raised surfaces follow the concentric radius rule." },
  ],

  practice: {
    dos: [
      { text: "Define a few named levels by use, each with a z-index band.", why: "A small number of levels keeps depth readable {{src:m3-elevation}}; bands prevent overlay collisions.", kind: "system" },
      { text: "Give each level light and dark treatments; use tonal surfaces where shadows fade.", why: "Shadows are weak on dark surfaces; Fluent 2 ships light and dark ramps {{src:fluent-2-elevation}}.", kind: "industry" },
      { text: "Keep focused items visible under sticky and overlay layers.", why: "The focused item must not be entirely hidden [WCAG 2.2 SC 2.4.11, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't rely on a shadow alone to show a control's boundary.", why: "Boundaries needed to identify controls need 3:1 contrast [WCAG 2.2 SC 1.4.11, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't use raw z-index numbers or one-off shadows.", why: "They escape the system and cause stacking bugs.", kind: "system" },
      { text: "Don't animate elevation changes without a reduced-motion alternative.", why: "Users can disable non-essential interaction animation [SC 2.3.3, AAA] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "Elevation levels: shadows, tonal dark mode and z-index bands",
        language: "css",
        code: `:root {
  /* two-layer shadows: key + ambient */
  --shadow-raised:  0 1px 2px rgb(0 0 0 / .12), 0 1px 3px rgb(0 0 0 / .08);
  --shadow-overlay: 0 4px 8px rgb(0 0 0 / .14), 0 8px 24px rgb(0 0 0 / .10);
  --shadow-dialog:  0 8px 16px rgb(0 0 0 / .16), 0 24px 48px rgb(0 0 0 / .14);

  --surface-raised:  var(--color-surface-default);
  --surface-overlay: var(--color-surface-default);

  /* stacking bands */
  --z-sticky: 100;  --z-dropdown: 200;  --z-overlay: 300;  --z-dialog: 400;  --z-toast: 500;
}
[data-theme="dark"] {
  /* height as a lighter surface; shadows kept faint */
  --surface-raised:  #1f1e1c;
  --surface-overlay: #2a2926;
}
.menu { background: var(--surface-overlay); box-shadow: var(--shadow-overlay);
        border: 1px solid var(--color-border-control); z-index: var(--z-dropdown); }
@media (prefers-reduced-motion: no-preference) {
  .card { transition: box-shadow 150ms ease-out; }
}`,
        caption: "Illustrative values. Menus keep a border so their boundary does not depend on the shadow.",
      },
      {
        title: "DTCG shadow token and Tailwind CSS v4 exposure",
        language: "json",
        code: `{
  "elevation": {
    "$type": "shadow",
    "overlay": {
      "$value": [
        { "color": { "colorSpace": "srgb", "components": [0, 0, 0], "alpha": 0.14 }, "offsetX": "0px", "offsetY": "4px", "blur": "8px", "spread": "0px" },
        { "color": { "colorSpace": "srgb", "components": [0, 0, 0], "alpha": 0.1 }, "offsetX": "0px", "offsetY": "8px", "blur": "24px", "spread": "0px" }
      ]
    }
  }
}`,
        caption: "Illustrative. A shadow token may hold several layers; colours use the DTCG 2025.10 colour object. In Tailwind CSS v4, `@theme inline { --shadow-overlay: var(--shadow-overlay); }` exposes it as the `shadow-overlay` utility.",
      },
    ],
  },

  exercises: [
    {
      id: "elevation-systems-ex-levels",
      kind: "assignment",
      level: "beginner",
      title: "Sort the layers",
      prompt: ["Open an app and list every surface that sits above another (cards, menus, sheets, dialogs, toasts). Order them from lowest to highest and note how each shows its height."],
      deliverable: "An ordered list with the visual cue for each level.",
      criteria: ["All layers found", "Order justified", "Cues described"],
    },
    {
      id: "elevation-systems-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix colliding overlays",
      prompt: [
        "Illustrative case. In the library app, the 'Renewed' toast (z-index 50) appears behind the dialog backdrop (z-index 1000). In dark mode, cards disappear into the page. The sticky header covers the focused 'Renew' link when users tab down.",
        "Work through the correction sequence.",
      ],
      deliverable: "Levels, bands and theme treatments with checks.",
      criteria: ["Bands defined", "Dark treatment fixed", "Focus visibility fixed"],
      exampleSolution: [
        "1. Symptoms: hidden toast; flat dark cards; obscured focus.",
        "2. Impact: missed confirmation; lost structure; keyboard users lose their place.",
        "3. Causes: ad hoc z-index; shadow-only elevation; no scroll padding under the sticky header.",
        "4. Requirements: focus not entirely hidden [WCAG 2.2 SC 2.4.11, AA]; boundaries 3:1 where they identify controls [SC 1.4.11, AA].",
        "5. Correction: z-index bands (toast above dialog); tonal raised surfaces in dark mode; `scroll-padding-top` equal to the header height.",
        "6. Validation: open dialog then trigger toast; dark-mode review; tab through the page.",
        "7. Trade-off: toasts above dialogs can distract; keep them brief and announced politely.",
      ],
    },
    {
      id: "elevation-systems-ex-theme",
      kind: "reflection",
      level: "advanced",
      title: "Elevation in high contrast",
      prompt: ["Design the high-contrast treatment for five levels. What replaces shadows and tonal surfaces, and how do people still tell a dialog from a menu?"],
      deliverable: "A level table for light, dark and high contrast.",
      criteria: ["Non-shadow cues", "Order preserved", "Contrast checked"],
    },
  ],

  quiz: [
    {
      id: "elevation-systems-q-meaning",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What does a higher elevation usually tell people about a surface?",
      options: [
        { text: "It is in front and often temporary, like a menu or dialog", correct: true, explanation: "Higher levels sit on top and are often dismissible." },
        { text: "It is more important than everything else permanently", correct: false, explanation: "Elevation is about layering, not permanent importance." },
        { text: "It is disabled", correct: false, explanation: "Disabled states are not shown by elevation." },
        { text: "It is a link", correct: false, explanation: "Links are not shown by elevation." },
      ],
      explanation: "Elevation communicates layering.",
    },
    {
      id: "elevation-systems-q-dark",
      kind: "scenario",
      level: "intermediate",
      prompt: "In dark mode, raised cards cannot be told apart from the page. What is the usual fix?",
      options: [
        { text: "Show height with a slightly lighter surface (tonal elevation), keeping faint shadows", correct: true, explanation: "Tonal surfaces work where shadows fade." },
        { text: "Make the shadows black and larger", correct: false, explanation: "Black shadows on near-black surfaces stay invisible." },
        { text: "Remove cards in dark mode", correct: false, explanation: "Structure should not change by theme." },
        { text: "Increase z-index", correct: false, explanation: "Stacking order does not change appearance." },
      ],
      explanation: "Dark themes render elevation with tone.",
    },
    {
      id: "elevation-systems-q-context",
      kind: "critique",
      level: "advanced",
      prompt: "A menu has z-index: 9999 but still renders under a sibling panel. Its parent has transform: translateZ(0). Why?",
      options: [
        { text: "The transform creates a stacking context, so the menu's z-index only competes inside its parent", correct: true, explanation: "Render overlays in the top layer or a portal." },
        { text: "z-index has a maximum of 999", correct: false, explanation: "There is no such limit." },
        { text: "Menus cannot use z-index", correct: false, explanation: "They can." },
        { text: "The sibling has a larger shadow", correct: false, explanation: "Shadows do not affect stacking." },
      ],
      explanation: "Stacking contexts bound z-index.",
    },
  ],

  flashcards: [
    { id: "elevation-systems-fc-define", front: "Elevation system", back: "A few named depth levels, each with a visual treatment and a stacking band." },
    { id: "elevation-systems-fc-tonal", front: "Tonal elevation", back: "Showing height with a lighter or tinted surface instead of, or with, a shadow; useful in dark themes." },
    { id: "elevation-systems-fc-fluent", front: "Fluent 2 shadow ramp", back: "2, 4, 8, 16, 28, 64 — each with light and dark versions." },
    { id: "elevation-systems-fc-wcag", front: "WCAG 2.2 criteria that touch elevation", back: "1.4.11 Non-text Contrast (AA), 2.4.11 Focus Not Obscured (Minimum) (AA), 2.3.3 Animation from Interactions (AAA)." },
  ],

  references: [
    { source: "m3-elevation", role: "primary", note: "Levels as z-distance; tonal or shadow rendering." },
    { source: "fluent-2-elevation", role: "primary", note: "Shadow ramp; light, dark and Windows strokes." },
    { source: "dtcg-format-2025", role: "explanatory", note: "Shadow composite token type." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.11, 2.4.11, 2.3.3." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Documented design-system practice built on well-established depth cues (shading, occlusion). Level counts and values are conventions. Non-text contrast, focus visibility and animation from interactions are WCAG 2.2 success criteria.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
