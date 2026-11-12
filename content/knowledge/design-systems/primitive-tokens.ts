import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "primitive-tokens",
  slug: "primitive-tokens",
  title: "Primitive Tokens",
  alternateNames: ["Global tokens", "Base tokens", "Core tokens", "Reference tokens", "Option tokens"],
  summary:
    "Tokens that name each value a design system allows — every colour in a ramp, every step of a spacing or type scale — without saying where it is used; the inventory that semantic tokens choose from.",
  definition:
    "A primitive token names **one available value** in a palette or scale — `color.blue.600`, `space.400`, a duration — and says nothing about where it is used. Together, the primitives are the **set of options** a design system permits. Semantic tokens choose among them for a purpose (`color.action.background → color.blue.600`). A primitive is not a usage decision, and component code should not reference it directly.",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "foundations",
  tags: ["design tokens", "palette", "colour ramps", "scales", "naming", "DTCG"],
  difficulty: "intermediate",
  disciplines: ["Design systems", "Visual design", "Front-end engineering"],
  learningObjectives: [
    "Explain what a primitive token is and how it differs from a semantic token.",
    "Turn an inventory of ad-hoc values into consolidated scales.",
    "Choose and defend a naming strategy for primitives.",
    "Write primitives in the DTCG 2025.10 format, with typed groups, colour objects and dimensions.",
    "Explain why primitives must not change per theme or be used directly by components.",
  ],
  prerequisites: ["design-tokens"],

  levels: {
    beginner: {
      explanation: [
        "Open the code of a product that has grown for a few years and search for colours. It is common to find dozens of greys that differ by a shade nobody chose on purpose. Each was typed by someone who needed 'a grey' that day.",
        "**Primitive tokens** replace that drift with a deliberate set of options. The team chooses, say, eight greys from light to dark, gives each a name such as `grey.50` or `grey.900`, and from then on those are the greys that exist. The same goes for spacing (`space.100`, `space.200`…), type sizes and durations.",
        "A primitive only says *what the value is*, not *what it is for*. `grey.900` is a very dark grey; whether it is used for body text is decided one layer up, by a **semantic token** such as `color.text.default`. That separation is what lets a dark theme pick a different grey for text without changing what `grey.900` means.",
      ],
      analogy:
        "A paint box. The box decides which colours you can paint with; it does not decide what you paint. A primitive token is one pan in the box; the painting decisions are made elsewhere.",
      everydayExamples: [
        "A spacing scale of 4, 8, 12, 16, 24 and 32 pixels that every screen draws from, instead of 13 px here and 15 px there.",
        "A colour ramp from very light to very dark blue, where each step has a number and a fixed value.",
        "A shared type scale in a design tool's variables and in CSS, with the same step names in both.",
      ],
      vocabulary: [
        { term: "Primitive token", meaning: "A named value in a palette or scale, such as blue.600 or space.400, with no stated purpose." },
        { term: "Ramp", meaning: "An ordered set of colours of one hue, from light to dark." },
        { term: "Scale", meaning: "An ordered set of sizes or values, such as spacing or type steps." },
        { term: "Semantic token", meaning: "A token named for its purpose that refers to a primitive for its value." },
        { term: "Group", meaning: "In the DTCG format, an object that holds tokens and can declare a $type they inherit." },
        { term: "Deprecation", meaning: "Marking a token as retired, with a pointer to its replacement, before removing it." },
      ],
    },
    intermediate: {
      explanation: [
        "Primitives are designed as **scales**, not collected as a list. A colour ramp needs enough steps for surfaces, borders, secondary and primary text in both light and dark themes; a spacing scale needs the small steps used inside components and the large steps used between sections. Values between steps are not tokens: that constraint is the point.",
        "The **naming strategy** decides how usable the scale is. The DTCG Color module's non-normative guidance describes descriptive names (`grass`, `watermelon`), ordered numerical scales (`blue.100` to `blue.900`), bounded scales whose number reflects a property of the colour such as its lightness, and tool-generated scales. It recommends leaving gaps — increments of 100 rather than 1, 2, 3 — so a step can be inserted later {{src:dtcg-color-2025}}.",
        "A bounded scale can carry real information. The U.S. Web Design System grades its colours from 0 to 100 so that a grade difference of 50 or more between two colours gives WCAG AA contrast and 70 or more gives AAA {{src:uswds-color}}. The name then predicts the contrast of a pair. That only holds because the system built its palette to guarantee it; an ordinary ramp's numbers make no such promise, and pairs must still be calculated.",
      ],
      howItWorks: [
        "In the DTCG 2025.10 format, primitives are tokens with literal values inside groups. A group can declare `$type`, and tokens without their own type inherit it from the closest parent group that has one {{src:dtcg-format-2025}}.",
        "A colour's `$value` is an object: a required `colorSpace` (such as `srgb`, `oklch` or `display-p3`) and `components`, an optional `alpha` (1 when omitted) and an optional six-digit `hex` fallback {{src:dtcg-color-2025}}.",
        "A dimension's `$value` is an object with a numeric `value` and a `unit` of `px` or `rem` {{src:dtcg-format-2025}}. Semantic tokens then refer to primitives with curly-brace references such as `{color.blue.600}` or `{space.400}`.",
      ],
      implementation: [
        "Inventory every value in code and design files; cluster near-duplicates and decide which one survives before naming anything.",
        "Design each ramp and scale as a whole: even steps, enough range for every theme, and named gaps for later insertion.",
        "Pick one naming strategy per family (colour, space, type) and write it down; mixing strategies inside a family makes order unreadable.",
        "Store primitives in a source format with types (for example DTCG JSON), with a hex fallback when authoring colours in a wide-gamut or other colour space.",
        "Keep primitives out of component code: export them to the build, but lint components so they reference semantic or component tokens only.",
        "Never change a primitive's value per theme. Retire a primitive with `$deprecated` and an explanation before deleting it {{src:dtcg-format-2025}}.",
      ],
      scenarios: [
        "**Illustrative.** An audit of a library app finds many slightly different greys in the stylesheet. The team maps each to the nearest of eight ramp steps, checks the screens where the change is visible, and replaces the raw values with semantic tokens that point to those steps.",
        "**Illustrative.** To build dark mode, a developer makes `blue.600` lighter inside `[data-theme=dark]`. Charts that used `blue.600` for a data series change colour too, and the brand blue in the logo lock-up no longer matches. Remapping `color.action.background` to `blue.400` instead changes only the action.",
        "**Illustrative.** A designer needs a spacing value between 12 and 16 px. Because the scale is numbered in hundreds (`space.300`, `space.400`), a `space.350` can be added if the system agrees it is needed, without renaming anything.",
      ],
    },
    advanced: {
      explanation: [
        "Systems name this tier differently — **global** tokens in Fluent 2, which describes them as context-agnostic raw values {{src:fluent-2-design-tokens}}; **reference** tokens in Material 3, such as `md.ref.palette.secondary90` {{src:m3-design-tokens}}; **base** tokens in the DTCG Color module's non-normative naming section {{src:dtcg-color-2025}}. The DTCG Format module itself defines types and references but no tiers {{src:dtcg-format-2025}}. The common idea is a layer that defines *what exists* and is free of meaning.",
        "The size of the primitive set is a trade-off. Too few steps and the semantic layer cannot satisfy contrast in every theme, or hover and pressed states have nowhere to go; too many and designers pick freely among near-identical values, which reintroduces the drift primitives were meant to remove. A useful test is whether every primitive is referenced by at least one semantic token in at least one theme; unreferenced primitives are candidates for deprecation.",
        "Colour space is now an authoring choice. The Color module allows fourteen colour spaces, including `oklch` and `display-p3`, with an optional sRGB `hex` fallback {{src:dtcg-color-2025}}. Wide-gamut primitives can exceed sRGB on capable screens, but contrast calculations for WCAG 2.2 use sRGB relative luminance {{src:w3c-wcag-22}}, so contrast should be checked on the colours that will actually be rendered.",
      ],
      evidence: [
        "Evidence for primitive tokens is **documented practice**. Fluent 2, Material 3 and USWDS publish primitive tiers and explain them {{src:fluent-2-design-tokens}} {{src:m3-design-tokens}} {{src:uswds-color}}, and the DTCG reports define how they are written {{src:dtcg-format-2025}} {{src:dtcg-color-2025}}. No controlled study was found on how scale size or naming strategy affects consistency or speed; the trade-offs above are reasoning from practice, not measured effects. USWDS's grade-to-contrast rule is a property its palette is built to satisfy, not a general law of colour.",
      ],
      debates: [
        "**Should product teams see primitives at all?** Some systems publish their reference palettes openly; others hide primitives so that only semantic tokens appear in design tools and code completion. Hiding them reduces misuse but makes it harder to propose new roles.",
        "**Descriptive or numerical names?** The DTCG Color module lists the trade-off: descriptive names are memorable and can separate brand colours, but do not show order and may not translate; numerical names show order and support contrast pairing but are less memorable {{src:dtcg-color-2025}}.",
        "**Hand-tuned or generated ramps?** Generated ramps are consistent and easy to extend; hand-tuned ramps can fix steps that look wrong at a particular hue. Many teams generate, then adjust and document the exceptions.",
      ],
      alternativeModels: [
        "**No primitive tier.** In a single-theme product, semantic tokens can hold raw values directly. This is simpler, but adding a second theme later means introducing the primitive layer and migrating every value.",
        "**Algorithmic palettes.** Some systems store only a few source colours and generate every step at build time; the 'primitives' then exist as generated output rather than authored tokens.",
      ],
    },
  },

  application: {
    summary: [
      "Primitive tokens define the raw material of a design system: the colours, sizes, type steps and durations that exist. They are where consolidation happens and where the system's visual range is set; every semantic token and theme draws from them.",
    ],
    web: [
      "Emit primitives to the build but not to component authors: the CSS that components use should contain semantic custom properties only.",
      "Author spacing and type primitives in `rem` where they should respect user font-size settings.",
    ],
    mobile: [
      "Transform primitives into platform constants (asset catalogues, Android resources) from the same source as web so ramps match across platforms.",
    ],
    enterprise: [
      "Multi-brand systems usually keep one primitive set per brand and one shared semantic vocabulary; the brand difference lives entirely in primitives and mappings.",
    ],
    services: [
      "Keep print and signage colour specifications as additional outputs of the same primitives, with their own conversions, so a service's colours stay recognisable off screen.",
    ],
    steps: [
      "Inventory existing values and cluster near-duplicates.",
      "Design complete ramps and scales with gaps for later steps.",
      "Choose a naming strategy per family and document it.",
      "Write primitives in a typed source format with fallbacks where needed.",
      "Map semantic tokens to primitives and verify contrast for every pair.",
      "Remove primitives from component code; deprecate unused steps with an explanation.",
    ],
  },

  whenToUse: [
    "Any design system that will have more than one theme, brand or platform.",
    "When an audit shows drifting values: primitives give the consolidated set a name.",
    "When design tools and code must share exactly the same set of values.",
  ],
  whenNotToUse: [
    "A small single-theme product: semantic tokens with raw values may be enough; add primitives when a second theme or brand arrives.",
    "As something components consume directly: reference semantic or component tokens instead.",
    "As a way to make themes: changing a primitive's value per theme corrupts its meaning; remap semantic tokens instead.",
  ],
  advantages: [
    "Ends value drift by naming the only values that exist.",
    "Gives semantic tokens and themes a stable palette to choose from.",
    "Makes ramps and scales reviewable as wholes, including contrast between steps.",
  ],
  limitations: [
    "Primitives carry no meaning; without a semantic layer they are easily misused in components.",
    "Scale size is a judgement: too few steps block themes, too many invite drift.",
    "Numbered names show order but not use, and only some scales are built so that names predict contrast.",
  ],
  misconceptions: [
    {
      myth: "The step number tells you whether two colours have enough contrast.",
      reality:
        "Only when the palette is built for it, as USWDS's grades are {{src:uswds-color}}. In an ordinary ramp, the numbers show order only; calculate the ratio of each pair.",
    },
    {
      myth: "Dark mode means redefining the primitives.",
      reality:
        "A primitive should mean one value everywhere. Themes change which primitive each semantic token refers to; the palette stays the same.",
    },
    {
      myth: "Primitive tokens are required by the DTCG format.",
      reality:
        "The Format module defines types and references but no tiers; base, alias and component categories appear only in the Color module's non-normative naming section {{src:dtcg-format-2025}} {{src:dtcg-color-2025}}.",
    },
  ],

  relations: [
    { target: "design-tokens", type: "derived-from", note: "Primitive tokens are the value tier of a token system." },
    { target: "semantic-tokens", type: "complementary-to", note: "Semantic tokens choose among primitives for a purpose; primitives stay free of meaning." },
    { target: "colour-systems", type: "applied-in", note: "Colour ramps are published as primitive tokens." },
    { target: "spacing-scales", type: "applied-in", note: "A spacing scale becomes a family of dimension primitives." },
    { target: "modular-type-scale", type: "related-to", note: "Type scale steps are typically published as primitives." },
    { target: "colour-contrast-ratio", type: "measured-by", note: "Ramps are checked by calculating the contrast between the steps that semantic roles pair." },
    { target: "theme-architecture", type: "related-to", note: "Themes remap semantic tokens onto the same primitives rather than changing them." },
  ],

  practice: {
    dos: [
      { text: "Consolidate before you name: cluster near-duplicate values and choose the survivors.", why: "Naming every drifting grey preserves the inconsistency under new names.", kind: "industry" },
      { text: "Design ramps and scales as wholes, with gaps (100, 200, 300…) for later steps.", why: "A step can be inserted without renaming; the DTCG Color module's naming guidance advises against sequential numbers {{src:dtcg-color-2025}}.", kind: "industry" },
      { text: "Declare `$type` once on each group and store colours as typed objects with a hex fallback.", why: "Tokens inherit the group's type, and tools that cannot read a colour space can use the fallback {{src:dtcg-format-2025}} {{src:dtcg-color-2025}}.", kind: "industry" },
      { text: "Retire primitives with `$deprecated` and a pointer to the replacement.", why: "Consumers see the warning before the token disappears {{src:dtcg-format-2025}}.", kind: "industry" },
      { text: "Calculate the contrast of every step pair a semantic role will use.", why: "Text needs 4.5:1 and non-text boundaries 3:1 [WCAG 2.2 SC 1.4.3 and 1.4.11, AA] {{src:w3c-wcag-22}}; a ramp is only useful if the pairs the roles need exist.", kind: "standard" },
    ],
    donts: [
      { text: "Don't reference primitives in component code.", why: "A component that uses `blue.600` cannot follow a theme; it must be edited for every theme.", kind: "industry" },
      { text: "Don't change a primitive's value per theme.", why: "Everything else that used it changes too: data-vis series, illustrations, brand lock-ups. Remap semantic tokens instead.", kind: "industry" },
      { text: "Don't put usage in a primitive's name (`blue.button`).", why: "That is a semantic decision hidden in the palette; when the button changes, the name is wrong.", kind: "industry" },
      { text: "Don't number steps 1, 2, 3.", why: "There is no room to insert a step later without renaming {{src:dtcg-color-2025}}.", kind: "industry" },
      { text: "Don't assume step numbers predict contrast.", why: "That only holds for palettes built to guarantee it, such as USWDS grades {{src:uswds-color}}; otherwise calculate.", kind: "system" },
    ],
    examples: [
      {
        title: "primitives.tokens.json — colour ramps and a spacing scale",
        language: "json",
        code: `{
  "color": {
    "$type": "color",
    "grey": {
      "0": {
        "$value": { "colorSpace": "srgb", "components": [1, 1, 1], "hex": "#ffffff" }
      },
      "50": {
        "$value": { "colorSpace": "srgb", "components": [0.9647, 0.9647, 0.9569], "hex": "#f6f6f4" }
      },
      "300": {
        "$value": { "colorSpace": "srgb", "components": [0.7882, 0.7843, 0.7647], "hex": "#c9c8c3" }
      },
      "500": {
        "$value": { "colorSpace": "srgb", "components": [0.5412, 0.5373, 0.5137], "hex": "#8a8983" }
      },
      "600": {
        "$value": { "colorSpace": "srgb", "components": [0.4196, 0.4157, 0.3922], "hex": "#6b6a64" }
      },
      "700": {
        "$value": { "colorSpace": "srgb", "components": [0.3098, 0.3059, 0.2863], "hex": "#4f4e49" }
      },
      "900": {
        "$value": { "colorSpace": "srgb", "components": [0.1216, 0.1176, 0.1098], "hex": "#1f1e1c" }
      },
      "950": {
        "$value": { "colorSpace": "srgb", "components": [0.0784, 0.0784, 0.0745], "hex": "#141413" }
      }
    },
    "blue": {
      "300": {
        "$value": { "colorSpace": "srgb", "components": [0.5608, 0.702, 0.9412], "hex": "#8fb3f0" }
      },
      "400": {
        "$value": { "colorSpace": "srgb", "components": [0.3725, 0.5725, 0.9098], "hex": "#5f92e8" }
      },
      "600": {
        "$value": { "colorSpace": "srgb", "components": [0.1412, 0.3412, 0.7725], "hex": "#2457c5" }
      }
    },
    "red": {
      "400": {
        "$value": { "colorSpace": "srgb", "components": [0.9412, 0.4784, 0.4314], "hex": "#f07a6e" }
      },
      "700": {
        "$value": { "colorSpace": "srgb", "components": [0.7059, 0.1373, 0.0941], "hex": "#b42318" }
      }
    }
  },
  "space": {
    "$type": "dimension",
    "100": {
      "$value": { "value": 4, "unit": "px" }
    },
    "200": {
      "$value": { "value": 8, "unit": "px" }
    },
    "300": {
      "$value": { "value": 12, "unit": "px" }
    },
    "400": {
      "$value": { "value": 16, "unit": "px" }
    },
    "600": {
      "$value": { "value": 24, "unit": "px" }
    },
    "800": {
      "$value": { "value": 32, "unit": "px" }
    }
  }
}`,
        caption:
          "The `color` and `space` groups declare `$type`, which every token inside inherits {{src:dtcg-format-2025}}. Colours are `srgb` objects with a six-digit hex fallback {{src:dtcg-color-2025}}. Values are illustrative (a library services app); the grey ramp was chosen so that the pairs the semantic layer needs pass in both themes, for example grey.900 on grey.0 at 16.66:1 and grey.300 on grey.950 at 11.00:1.",
      },
      {
        title: "Deprecating a primitive",
        language: "json",
        code: `{
  "color": {
    "$type": "color",
    "grey": {
      "800": {
        "$value": { "colorSpace": "srgb", "components": [0.2, 0.1961, 0.1843], "hex": "#33322f" },
        "$deprecated": "Merged into grey.900 in v3.0; map semantic tokens to color.grey.900 instead."
      }
    }
  }
}`,
        caption: "A string value of `$deprecated` marks the token as deprecated and explains why {{src:dtcg-format-2025}}.",
      },
      {
        title: "The correction in one line of CSS",
        language: "css",
        code: `/* Before: the component names a primitive, so dark mode had to redefine it */
.renew-button { background: var(--color-blue-600); }
[data-theme="dark"] { --color-blue-600: #5f92e8; } /* also recolours charts and the logo */

/* After: the component names a role; only the role is remapped */
.renew-button { background: var(--color-action-background); }
[data-theme="dark"] { --color-action-background: var(--color-blue-400); }`,
        caption: "Illustrative. The primitive keeps one meaning; the theme changes the semantic token.",
      },
    ],
  },

  exercises: [
    {
      id: "primitive-tokens-ex-inventory",
      kind: "assignment",
      level: "beginner",
      title: "From drifting values to a ramp",
      prompt: [
        "Collect every grey (or every spacing value) used in one product area. Plot them from light to dark (or small to large) and circle the clusters.",
        "Propose one ramp or scale of six to ten steps, name the steps with gaps, and map each original value to its new step.",
      ],
      deliverable: "A before/after table and the named scale.",
      criteria: ["Near-duplicates merged", "Names show order and leave gaps", "Every original value mapped"],
    },
    {
      id: "primitive-tokens-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Correct a theme that rewrites the palette",
      prompt: [
        "Illustrative case. To make dark mode, a team redefined `--color-blue-600` from #2457c5 to #5f92e8 under `[data-theme=dark]`. The Renew button now reads well, but a chart series and the logo also changed colour. Before the change, the button was #2457c5 on a #141413 card.",
        "Work through the correction sequence and propose the corrected token structure.",
      ],
      deliverable: "A corrected mapping and a short note on what changes for designers and developers.",
      criteria: ["Cause located in the tier structure", "Requirement cited", "Contrast recalculated", "Side effects of the old fix named"],
      exampleSolution: [
        "1. Symptom: fixing the button changed unrelated chart and logo colours.",
        "2. Impact: the chart's series colours no longer match its legend in other views, and the brand mark is off-brand in dark mode.",
        "3. Cause: components reference a primitive, so the only way to theme was to change the primitive's value, which every user of that primitive shares.",
        "4. Requirement: the button's boundary needs 3:1 against the card if it identifies the control [WCAG 2.2 SC 1.4.11, AA]; #2457c5 on #141413 is 2.85:1.",
        "5. Correction: introduce `color.action.background`; light → blue.600, dark → blue.400; restore blue.600 to one value everywhere.",
        "6. Validation: blue.400 on grey.950 is 5.94:1; check that the chart and logo now render the original blue; add a lint rule against primitives in components.",
        "7. Trade-off: one more token to document, and the dark button needs a dark label (action.text → grey.950) to keep 5.94:1.",
      ],
    },
    {
      id: "primitive-tokens-ex-strategy",
      kind: "reflection",
      level: "advanced",
      title: "Choose a naming strategy",
      prompt: [
        "Your organisation has two brands and plans a high-contrast theme. Compare an ordered numerical scale, a bounded scale tied to lightness, and descriptive names for your colour primitives. Choose one and justify it.",
      ],
      deliverable: "A one-page decision record with the option chosen, the rejected options and the reasons.",
      criteria: ["Considers contrast pairing across themes", "Considers insertion of future steps", "Considers multilingual teams", "States what would make you change the decision"],
    },
  ],

  quiz: [
    {
      id: "primitive-tokens-q-what",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which of these is a primitive token?",
      options: [
        { text: "color.blue.600", correct: true, explanation: "It names one value in a ramp and says nothing about where it is used." },
        { text: "color.action.background", correct: false, explanation: "That names a purpose: it is a semantic token." },
        { text: "button.primary.background", correct: false, explanation: "That is a component token." },
        { text: "#2457c5", correct: false, explanation: "A raw value has no name, so it is not a token." },
      ],
      explanation: "Primitives name the options; semantic and component tokens name decisions.",
    },
    {
      id: "primitive-tokens-q-theme",
      kind: "scenario",
      level: "intermediate",
      prompt: "A developer proposes making blue.600 lighter in dark mode so the primary button is readable. What is the problem?",
      options: [
        { text: "Every other use of blue.600 changes too; remap the semantic token the button uses instead", correct: true, explanation: "A primitive should mean one value everywhere; themes change semantic mappings." },
        { text: "There is no problem; that is how themes work", correct: false, explanation: "Changing primitives per theme couples unrelated uses." },
        { text: "Primitives cannot be used in CSS", correct: false, explanation: "They can; the issue is components using them directly." },
        { text: "Dark mode should invert all colours", correct: false, explanation: "Inversion ignores contrast pairs and brand colours." },
      ],
      explanation: "Keep primitives stable; theme the semantic layer.",
    },
    {
      id: "primitive-tokens-q-format",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "In the DTCG 2025.10 format, what is the $value of a colour token?",
      options: [
        { text: "An object with colorSpace and components, optionally alpha and a hex fallback", correct: true, explanation: "The Color module defines the value as an object; hex is an optional fallback." },
        { text: "A hex string such as \"#2457c5\"", correct: false, explanation: "The 2025.10 Color module uses an object, not a bare hex string." },
        { text: "A CSS function such as rgb(36 87 197)", correct: false, explanation: "CSS syntax is a build output, not the source format." },
        { text: "Any string the tool understands", correct: false, explanation: "The type defines a specific structure." },
      ],
      explanation: "Colour values are typed objects so that colour spaces other than sRGB can be expressed.",
    },
    {
      id: "primitive-tokens-q-names",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "Why does the USWDS grade number predict contrast when an ordinary ramp's step number does not?",
      options: [
        { text: "The palette is built so that grade differences correspond to contrast thresholds", correct: true, explanation: "USWDS documents that a grade difference of 50+ gives AA and 70+ gives AAA for its colours." },
        { text: "All numbered ramps follow WCAG", correct: false, explanation: "Numbers in most ramps only show order." },
        { text: "Because DTCG requires it", correct: false, explanation: "The DTCG reports do not define naming rules." },
        { text: "Because 50 is half of 100", correct: false, explanation: "The relationship is engineered into the palette, not arithmetic." },
      ],
      explanation: "A bounded scale carries information only when the values are built to match the names.",
    },
  ],

  flashcards: [
    { id: "primitive-tokens-fc-what", front: "Primitive token", back: "A named value in a palette or scale (blue.600, space.400) with no stated purpose." },
    { id: "primitive-tokens-fc-rule", front: "Two rules for primitives", back: "Components never reference them; themes never change them." },
    { id: "primitive-tokens-fc-names", front: "Other names for primitive tokens", back: "Global tokens (Fluent 2), reference tokens (Material 3), base tokens (DTCG Color module, non-normative)." },
    { id: "primitive-tokens-fc-colour", front: "DTCG 2025.10 colour value", back: "{ colorSpace, components, alpha?, hex? } — an object, with hex as an optional six-digit fallback." },
  ],

  references: [
    { source: "dtcg-format-2025", role: "primary", note: "Groups and $type inheritance, dimension values, references, $deprecated." },
    { source: "dtcg-color-2025", role: "primary", note: "Colour value object, colour spaces, non-normative naming strategies." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.3 and 1.4.11 thresholds for the pairs a ramp must support." },
    { source: "fluent-2-design-tokens", role: "explanatory", note: "Global tokens as context-agnostic raw values." },
    { source: "m3-design-tokens", role: "explanatory", note: "Reference tokens such as md.ref.palette.secondary90." },
    { source: "uswds-color", role: "explanatory", note: "Colour grades whose differences predict contrast." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Primitive tokens are documented practice in major design systems and are written in the DTCG formats (Community Group reports, not W3C Standards). Effects of scale size or naming strategy have not been measured in controlled studies. The contrast of any pair of primitives can be calculated exactly against WCAG 2.2.",

  status: "published",
  quality: {
    classification: true,
    explanation: true,
    research: true,
    beginner: true,
    professional: true,
    examples: true,
    limitations: true,
    relationships: true,
    sources: true,
    activities: true,
  },
  lastVerifiedAt: "2026-11-11",
});
