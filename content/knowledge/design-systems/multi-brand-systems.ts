import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "multi-brand-systems",
  slug: "multi-brand-systems",
  title: "Multi-Brand Systems",
  alternateNames: ["Multi-brand design system", "White-label design system", "Brand theming", "Sub-brand systems"],
  summary:
    "One design system, one set of components, many brands: each brand is a token mapping over a shared semantic contract, so identity changes without forking components — and accessibility holds for every brand.",
  definition:
    "A multi-brand system serves **several brand identities from one component library** by treating each brand as a **mapping of semantic tokens to that brand's primitives** — colour, type, shape and motion — over a **shared token contract** that every component consumes. It is [[theme-architecture]] with brand as an additional axis: the DTCG resolver describes tokens in multiple contexts through sets, modifiers and a resolution order in which later entries override earlier ones {{src:dtcg-resolver-2025}}, and systems such as Fluent 2 support branded themes alongside light, dark and high-contrast {{src:fluent-2-design-tokens}}. The hard constraints are invariants: **components never reference brand primitives**, and **every brand must pass the same contrast and layout checks**.",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "foundations",
  tags: ["multi-brand", "white label", "brand theming", "semantic tokens", "DTCG resolver", "modifiers", "token contract", "contrast invariance"],
  difficulty: "advanced",
  disciplines: ["Design systems", "Brand design", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Explain how semantic tokens let one component library serve several brands.",
    "Design a token contract and brand mappings, including non-colour attributes.",
    "Keep contrast and layout invariant across brands.",
    "Govern which brand differences are allowed and which are not.",
  ],
  prerequisites: ["primitive-tokens", "semantic-tokens", "theme-architecture", "design-governance"],

  levels: {
    beginner: {
      explanation: [
        "The library service also runs a children's library and a museum shop. Each has its own colours, typeface and personality. At first each got its own copy of the component library; within a year, a fix to the date picker had to be made three times, and one copy was forgotten.",
        "A **multi-brand system** keeps one set of components and gives each brand its own **token values**. A button asks for 'the action colour', 'the button corner radius', 'the body typeface'. The library brand answers blue, 6 px and one font; the museum brand answers orange, 0 px and another. The button's code never changes.",
        "This only works if every brand plays by the same rules: the same token names, and the same accessibility checks. A brand colour that cannot be read on a button is not allowed, however on-brand it is.",
      ],
      analogy:
        "One building plan, several fit-outs: the walls, doors and wiring are identical, while each tenant chooses paint, furniture and signage — within the building code.",
      everydayExamples: [
        "A bank's main app and its youth app using the same components in different colours.",
        "A white-label booking product that each customer brands with their own logo and colours.",
        "Sub-brands of one company sharing forms and navigation.",
      ],
      vocabulary: [
        { term: "Brand theme", meaning: "One brand's set of token values for the shared token names." },
        { term: "Token contract", meaning: "The fixed list of semantic token names every brand must provide and every component uses." },
        { term: "White label", meaning: "A product sold to other organisations to brand as their own." },
        { term: "Sub-brand", meaning: "A related brand inside the same organisation." },
        { term: "Invariant", meaning: "A rule that must hold for every brand, such as minimum contrast." },
      ],
    },
    intermediate: {
      explanation: [
        "**Layers.** Brand primitives (each brand's palettes, typefaces, radii, durations) sit at the bottom ([[primitive-tokens]]); the shared semantic contract (`color.action.background`, `radius.control`, `font.body`, `motion.duration.short`) sits in the middle ([[semantic-tokens]]); components consume only the contract. A brand is a complete mapping from contract to its primitives; modes such as light and dark are a second axis, resolved in a stated order {{src:dtcg-resolver-2025}}.",
        "**What brands may change.** Colour roles, typeface and type scale, corner geometry, elevation style, icon style, motion curves and illustration. **What they may not:** token names, component structure and behaviour, minimum target sizes, focus visibility, content rules. Carbon's themes show the principle for modes: role names stay the same and only values change {{src:carbon-themes}}.",
        "**Contrast belongs to each brand.** Brand primary colours often fail as button backgrounds. In this course's palette, the library brand's blue `#2457c5` with white text is 6.47:1, but the museum brand's orange `#e8742a` with white text is only 3.02:1 — below the 4.5:1 needed for text [WCAG 2.2 SC 1.4.3, AA] {{src:w3c-wcag-22}}. The museum brand can keep orange as its identity colour and either map the action role to a darker orange (`#c2410c`, 5.18:1 with white) or use dark text on the orange (5.52:1 with `#1f1e1c`).",
        "**Brand onboarding checklist.** Provide every contract token; pass every documented contrast pair in every mode; check type metrics (line height, x-height) against layout budgets; run visual regression for the new brand ([[design-qa]]); document brand-specific guidance (imagery, voice) outside the component library.",
      ],
      howItWorks: [
        "Because components depend only on semantic names, a brand switch is a change of values at the root — the same mechanism as a theme switch — so fixes and features ship once for every brand.",
        "Running the same contrast and layout checks per brand turns accessibility into an invariant of the system rather than a per-brand hope.",
      ],
      implementation: [
        "Define the semantic contract and publish it as a schema; refuse brand files that omit or add contract tokens.",
        "Map each brand to its primitives; keep brand primitives private to the token build.",
        "Check every documented colour pair for every brand × mode: 4.5:1 for text, 3:1 for non-text [WCAG 2.2 SC 1.4.3, 1.4.11, AA] {{src:w3c-wcag-22}}.",
        "Set layout budgets for non-colour tokens: control heights, minimum targets (24 × 24 CSS px, SC 2.5.8), line heights; brand fonts must fit them.",
        "Resolve brand and mode with an explicit order (for example base → brand → mode) {{src:dtcg-resolver-2025}}.",
        "Govern brand requests through the normal proposal path ([[design-governance]]): a brand need that requires a new component is a system decision, not a brand override.",
      ],
      scenarios: [
        "**Illustrative.** The museum shop's orange buttons failed contrast with white labels. The brand mapping now sets `color.action.background` to orange 700 and keeps orange 500 for illustrations and the logo; buttons pass, and the brand still reads as orange.",
        "**Illustrative.** The children's library wanted a rounded display font. Its larger x-height made buttons grow 4 px and broke table rows. The brand mapping now pairs the font with a smaller size step and a fixed line height so control heights stay within budget.",
        "**Brand review ritual.** Before a brand ships, design and engineering review its token file against the contract schema, the contrast report for every pair, and visual regression screenshots of the reference pages.",
      ],
    },
    advanced: {
      explanation: [
        "**Token contract schema.** Validate brand files in CI: every contract token present, each with the right `$type`, references resolving to existing primitives, no extra names. DTCG token files carry types and references, so a contract is checkable data {{src:dtcg-format-2025}}. Resolution follows the resolver's sets and modifiers, with later entries in the resolution order overriding earlier ones {{src:dtcg-resolver-2025}}.",
        "**Non-colour shifts.** Typography changes metrics (cap height, x-height, advance widths), not just looks: budget control heights and line lengths in tokens and test them. Radius changes should keep the concentric rule for nested shapes ([[spacing-scales]]). Motion curves can differ by brand, but durations stay within the system's ranges and every brand honours reduced motion.",
        "**Contrast invariance.** Generate the full matrix brand × mode × documented pair and fail the build on any pair below threshold — the same check the [[theme-architecture]] entry applies to modes, multiplied by brands. High-contrast modes apply per brand too.",
        "**Delivery.** Build one stylesheet (or token bundle) per brand and mode; switch by a root attribute. Components stay brand-agnostic and can be server-rendered once per brand. White-label customers receive a constrained brand file (a few primitives) from which the system generates a full mapping, with contrast correction applied automatically.",
      ],
      evidence: [
        "Multi-brand architecture is **documented practice**: the DTCG resolver module describes tokens across contexts with sets, modifiers and a resolution order {{src:dtcg-resolver-2025}}; Fluent 2 describes branded themes {{src:fluent-2-design-tokens}}; Carbon keeps role names stable while values change {{src:carbon-themes}}. The DTCG reports are W3C Community Group reports, not W3C Standards {{src:dtcg-format-2025}}. Contrast thresholds are WCAG 2.2 criteria {{src:w3c-wcag-22}}; the ratios quoted are computed with this course's formula. No controlled study of multi-brand architectures was found.",
      ],
      debates: [
        "**How much may brands differ?** Wide freedom keeps brands distinct but multiplies testing; narrow freedom keeps quality but brands look alike.",
        "**Brand-specific components?** Allowing them restores flexibility but recreates forks; most systems route them through governance as shared components.",
        "**Generated or hand-made brand palettes?** Generation from a few inputs scales to white-label customers; hand-made palettes give flagship brands more control.",
      ],
      alternativeModels: [
        "**Forked libraries per brand** — full freedom, duplicated maintenance.",
        "**Shared behaviour, separate styling** — a headless component layer with per-brand styled layers.",
      ],
    },
  },

  application: {
    summary: ["Multi-brand systems apply to companies with sub-brands, products sold under customers' brands, and public services with several identities."],
    web: ["One component library; per-brand and per-mode token bundles; root attribute switching; CI contract and contrast checks."],
    mobile: ["Brand token sets compiled into platform resources; one native component set."],
    enterprise: ["A brand onboarding process with contract validation, contrast reports and visual regression."],
    services: ["Printed and email templates read the same brand tokens."],
    steps: [
      "Define and publish the semantic token contract.",
      "Map each brand's primitives to the contract.",
      "Validate contract completeness and references in CI.",
      "Check every pair for every brand × mode against WCAG 2.2.",
      "Set and test layout budgets for typography and shape.",
      "Route brand-specific component requests through governance.",
    ],
  },

  whenToUse: [
    "When two or more brands or customers need the same interface patterns.",
    "When fixes and accessibility improvements must reach every brand at once.",
  ],
  whenNotToUse: [
    "When brands genuinely need different interaction patterns, not just different identity.",
    "As a way to give each brand arbitrary overrides: that recreates forks inside one library.",
  ],
  advantages: [
    "One fix or feature reaches every brand.",
    "Accessibility checks apply uniformly.",
    "New brands are added by data, not code.",
  ],
  limitations: [
    "Brand freedom is limited to what tokens express.",
    "Testing grows with brands × modes.",
    "Typefaces with very different metrics strain layout budgets.",
  ],
  misconceptions: [
    {
      myth: "A brand theme is just a different primary colour.",
      reality:
        "Brands also differ in type, shape, elevation and motion; each needs tokens and layout budgets, and colour roles must be re-checked for contrast.",
    },
    {
      myth: "If the brand colour is approved, it can be used for buttons.",
      reality:
        "Brand approval is not contrast: the museum orange with white text is 3.02:1, below WCAG 2.2's 4.5:1 for text {{src:w3c-wcag-22}}; map the action role to a passing step.",
    },
  ],

  relations: [
    { target: "theme-architecture", type: "derived-from", note: "Brand is a theme axis resolved with modes." },
    { target: "semantic-tokens", type: "applied-in", note: "The shared contract is the semantic tier." },
    { target: "primitive-tokens", type: "applied-in", note: "Each brand supplies its own primitives." },
    { target: "design-language", type: "related-to", note: "Each brand expresses its own language through tokens." },
    { target: "component-libraries", type: "applied-in", note: "One library serves all brands." },
    { target: "colour-systems", type: "measured-by", note: "Brand colour roles are checked pair by pair." },
  ],

  practice: {
    dos: [
      { text: "Publish the semantic token contract as a schema and validate every brand file against it in CI.", why: "Components depend only on the contract; DTCG files are typed, referenceable data {{src:dtcg-format-2025}}.", kind: "system" },
      { text: "Check every documented pair for every brand × mode.", why: "Contrast belongs to each pair in each context [WCAG 2.2 SC 1.4.3, 1.4.11] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Budget layout-affecting tokens (control height, line height, target size) and test brand fonts against them.", why: "Typefaces change metrics; targets must stay ≥ 24 px [SC 2.5.8] {{src:w3c-wcag-22}}.", kind: "system" },
    ],
    donts: [
      { text: "Don't let components reference brand primitives.", why: "Brand switches then require component changes; the contract breaks.", kind: "system" },
      { text: "Don't fork the library per brand.", why: "Fixes must be repeated per fork and drift is inevitable.", kind: "industry" },
      { text: "Don't use a brand colour as a text background without checking contrast.", why: "Orange #e8742a with white text is 3.02:1, failing SC 1.4.3 {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "Multi-brand DTCG override map with a resolver",
        language: "json",
        code: `// tokens/contract.tokens.json — names every brand must provide (values via references)
{ "color": { "$type": "color",
    "action": { "background": { "$value": "{brand.action}" }, "text": { "$value": "{brand.on-action}" } } },
  "radius": { "$type": "dimension", "control": { "$value": "{brand.radius}" } },
  "font":   { "body": { "$type": "fontFamily", "$value": "{brand.font-body}" } } }

// tokens/brand-library.tokens.json
{ "brand": {
    "action":    { "$type": "color", "$value": { "colorSpace": "srgb", "components": [0.1412, 0.3412, 0.7725], "hex": "#2457c5" } },
    "on-action": { "$type": "color", "$value": { "colorSpace": "srgb", "components": [1, 1, 1], "hex": "#ffffff" } },
    "radius":    { "$type": "dimension", "$value": { "value": 6, "unit": "px" } },
    "font-body": { "$type": "fontFamily", "$value": ["IBM Plex Sans", "sans-serif"] } } }

// tokens/brand-museum.tokens.json — action mapped to orange 700 (5.18:1 with white), not orange 500 (3.02:1)
{ "brand": {
    "action":    { "$type": "color", "$value": { "colorSpace": "srgb", "components": [0.7608, 0.2549, 0.0471], "hex": "#c2410c" } },
    "on-action": { "$type": "color", "$value": { "colorSpace": "srgb", "components": [1, 1, 1], "hex": "#ffffff" } },
    "radius":    { "$type": "dimension", "$value": { "value": 0, "unit": "px" } },
    "font-body": { "$type": "fontFamily", "$value": ["Source Serif 4", "serif"] } } }

// tokens.resolver.json — later entries in resolutionOrder override earlier ones
{ "version": "2025.10",
  "sets": { "contract": { "sources": [{ "$ref": "contract.tokens.json" }] } },
  "modifiers": {
    "brand": { "contexts": { "library": [{ "$ref": "brand-library.tokens.json" }],
                             "museum":  [{ "$ref": "brand-museum.tokens.json" }] }, "default": "library" },
    "mode":  { "contexts": { "light": [{ "$ref": "mode/light.tokens.json" }],
                             "dark":  [{ "$ref": "mode/dark.tokens.json" }] }, "default": "light" } },
  "resolutionOrder": [{ "$ref": "#/modifiers/brand" }, { "$ref": "#/sets/contract" }, { "$ref": "#/modifiers/mode" }] }`,
        caption: "Illustrative, following the DTCG 2025.10 format and resolver as read; contrast ratios computed with this course's formula. Comments are annotations, not part of the JSON.",
      },
      {
        title: "CI contrast matrix across brands and modes",
        language: "ts",
        code: `import { contrastRatio } from "@/lib/formulas/visual";
import { resolve } from "./resolve";                     // resolves contract for (brand, mode)

const PAIRS = [
  { fg: "color.action.text", bg: "color.action.background", min: 4.5 },
  { fg: "color.text.default", bg: "color.surface.default", min: 4.5 },
  { fg: "color.border.control", bg: "color.surface.default", min: 3 },
];
for (const brand of ["library", "museum"]) for (const mode of ["light", "dark"]) {
  const t = resolve({ brand, mode });
  for (const p of PAIRS) {
    const r = contrastRatio(t[p.fg], t[p.bg]);
    if (r < p.min) throw new Error(\`\${brand}/\${mode}: \${p.fg} on \${p.bg} = \${r.toFixed(2)}:1 < \${p.min}:1\`);
  }
}`,
        caption: "Illustrative. The build fails if any brand × mode × pair falls below its WCAG threshold.",
      },
    ],
  },

  exercises: [
    {
      id: "multi-brand-systems-ex-split",
      kind: "assignment",
      level: "beginner",
      title: "Same parts, different brands",
      prompt: ["Find two apps from the same company (or two white-label products). List what looks different (colour, type, shape) and what is the same (layout, components, behaviour)."],
      deliverable: "A two-column comparison.",
      criteria: ["Identity differences listed", "Shared structure listed"],
    },
    {
      id: "multi-brand-systems-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Onboard the museum brand",
      prompt: [
        "Illustrative case. The museum brand's file maps `color.action.background` to orange #e8742a with white text (3.02:1), adds a new token `museum.button.padding` that the Button reads directly, and uses a display font that makes buttons 4 px taller than the 40 px control budget.",
        "Work through the correction sequence.",
      ],
      deliverable: "A corrected brand file and onboarding checks.",
      criteria: ["Contrast fixed with computed ratio", "Contract respected", "Layout budget kept"],
      exampleSolution: [
        "1. Symptoms: unreadable button labels, a component reading a brand-only token, taller controls.",
        "2. Impact: WCAG failure for every museum page; Button now depends on one brand; tables and toolbars misalign.",
        "3. Causes: brand colour used for a text pair unchecked; contract bypassed; font metrics not budgeted.",
        "4. Requirements: text contrast 4.5:1 [WCAG 2.2 SC 1.4.3, AA]; components consume only contract tokens; control height within budget.",
        "5. Correction: action background → orange 700 (#c2410c, 5.18:1 with white), keep orange 500 for identity; remove the brand-only token and use the contract's `space.inset.button`; pair the font with a smaller size step and fixed line height.",
        "6. Validation: contract schema check; brand × mode contrast matrix; visual regression of reference pages.",
        "7. Trade-off: the action colour is darker than the logo orange; document it as the accessible action shade.",
      ],
    },
    {
      id: "multi-brand-systems-ex-whitelabel",
      kind: "reflection",
      level: "advanced",
      title: "Design a white-label input",
      prompt: ["White-label customers may supply only a primary colour, a logo and a font. Design how the system generates a full brand mapping from these inputs, corrects contrast automatically, and rejects fonts that break layout budgets."],
      deliverable: "A generation algorithm and validation rules.",
      criteria: ["Few inputs, full mapping", "Contrast correction defined", "Font budget check"],
    },
  ],

  quiz: [
    {
      id: "multi-brand-systems-q-what",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "How does a multi-brand system change a button's look for each brand?",
      options: [
        { text: "Each brand provides different values for the same token names the button uses", correct: true, explanation: "One component, many token mappings." },
        { text: "Each brand gets its own copy of the button code", correct: false, explanation: "That is a fork." },
        { text: "The button checks which brand it is in and branches", correct: false, explanation: "Components stay brand-agnostic." },
        { text: "Brands cannot change buttons", correct: false, explanation: "They change values through tokens." },
      ],
      explanation: "Brands are token mappings.",
    },
    {
      id: "multi-brand-systems-q-contrast",
      kind: "formula",
      level: "intermediate",
      prompt: "The museum orange #e8742a with white text measures 3.02:1. What fixes the button while keeping the brand?",
      options: [
        { text: "Map the action background to a darker orange (#c2410c, 5.18:1 with white) or use dark text (5.52:1)", correct: true, explanation: "Both pass 4.5:1." },
        { text: "Make the text bold", correct: false, explanation: "Normal-size text still needs 4.5:1." },
        { text: "Keep it; the brand is approved", correct: false, explanation: "Brand approval is not contrast." },
        { text: "Use a lighter orange", correct: false, explanation: "Lighter lowers contrast with white." },
      ],
      explanation: "Remap the role, not the rule.",
    },
    {
      id: "multi-brand-systems-q-order",
      kind: "critique",
      level: "advanced",
      prompt: "A resolver orders mode before brand (brand last). The brand file sets action colours for light mode only. What problem can occur?",
      options: [
        { text: "Brand values resolve after mode, so a brand's light values can override dark-mode adjustments", correct: true, explanation: "Later entries override earlier ones; order must match intent." },
        { text: "None; order does not matter", correct: false, explanation: "The resolver applies a defined order." },
        { text: "The resolver will reject the file", correct: false, explanation: "The order is valid but probably wrong." },
        { text: "Components will re-render twice", correct: false, explanation: "Resolution happens at build time." },
      ],
      explanation: "Order the axes deliberately.",
    },
  ],

  flashcards: [
    { id: "multi-brand-systems-fc-define", front: "Multi-brand system", back: "One component library; each brand is a mapping of the shared semantic token contract to its own primitives." },
    { id: "multi-brand-systems-fc-invariants", front: "Multi-brand invariants", back: "Same token names; components never use brand primitives; every brand × mode pair passes WCAG contrast; layout budgets hold." },
    { id: "multi-brand-systems-fc-resolver", front: "DTCG resolver for brands", back: "Sets plus modifiers (brand, mode) with a resolutionOrder; later entries override earlier ones." },
    { id: "multi-brand-systems-fc-shift", front: "Non-colour brand shifts", back: "Type (metrics), radius (keep nested shapes concentric), elevation, motion curves — all within budgets and reduced-motion rules." },
  ],

  references: [
    { source: "dtcg-resolver-2025", role: "primary", note: "Sets, modifiers, resolution order." },
    { source: "dtcg-format-2025", role: "primary", note: "Typed tokens and references." },
    { source: "fluent-2-design-tokens", role: "explanatory", note: "Branded themes." },
    { source: "carbon-themes", role: "explanatory", note: "Stable role names, changing values." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.3, 1.4.11, 2.5.8." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Documented practice (DTCG Community Group reports, Fluent 2, Carbon) with WCAG 2.2 thresholds; ratios computed with this course's formula. No controlled study of multi-brand architectures was found.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-12",
});
