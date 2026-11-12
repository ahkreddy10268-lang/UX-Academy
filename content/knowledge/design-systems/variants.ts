import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "variants",
  slug: "variants",
  title: "Variants",
  alternateNames: ["Component variants", "Variant properties", "Component modifiers", "Variant axes"],
  summary:
    "The named, independent dimensions along which one component can change — such as intent, size and emphasis — each with a closed set of values, kept small enough that every combination is designed, built and tested.",
  definition:
    "A variant is **one value on a named dimension of a component** — `size=small`, `intent=danger`, `emphasis=secondary`. A component's variant space is the set of all combinations of its dimensions; its size is the **product** of the number of values on each dimension. Variants describe **designed differences that the consumer chooses**. They are different from **interaction states** (hover, pressed, focus), which the user causes at run time, and from **content** (label, icon), which is passed in. In Figma, variant properties group a component's versions in one component set {{src:figma-variants}}; in code, libraries such as cva map variant props to classes {{src:cva-variants}}.",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "components",
  tags: ["variants", "variant properties", "component set", "cva", "compound variants", "boolean props", "enum props", "combinatorial explosion", "Figma"],
  difficulty: "intermediate",
  disciplines: ["Design systems", "Visual design", "Front-end engineering"],
  learningObjectives: [
    "Separate variants (chosen) from states (caused by interaction) and content (passed in).",
    "Calculate a component's variant space and keep it manageable.",
    "Choose enums over booleans for mutually exclusive options.",
    "Map Figma variant properties one-to-one to code props and tokens.",
  ],
  prerequisites: ["semantic-tokens", "component-architecture"],

  levels: {
    beginner: {
      explanation: [
        "The library app's button exists in a blue primary version, a white secondary version, a red version for 'Cancel reservation', a small version for tables and a large one for the home page. Designers keep drawing new versions — a small red one with an icon, a large white one without — and developers keep adding special cases.",
        "**Variants** organise these versions into a few named choices. A button might have *intent* (primary, secondary, danger) and *size* (small, medium, large). Any button is one value from each list. Instead of 'the red small button', the team says `intent=danger, size=small`, and both designers and developers know exactly what that means.",
        "Each new choice multiplies the number of versions. Three intents and three sizes already make nine buttons; that is why teams keep the lists short.",
      ],
      analogy:
        "An audio mixer: each channel has a few independent controls — volume, tone, balance. Any sound is one setting of each control. Adding a control multiplies the possible sounds, so a good mixer has only the controls people actually need.",
      everydayExamples: [
        "Primary and secondary buttons on a form.",
        "Small and large versions of the same input.",
        "A red 'danger' button for deleting things.",
      ],
      vocabulary: [
        { term: "Variant", meaning: "One version of a component, defined by a value on each of its dimensions." },
        { term: "Dimension", meaning: "A named way a component can change, such as size or intent." },
        { term: "Value", meaning: "One option on a dimension, such as 'small'." },
        { term: "Interaction state", meaning: "A temporary look caused by the user, such as hover or pressed — not a variant you choose." },
        { term: "Variant space", meaning: "All possible combinations of a component's variant values." },
      ],
    },
    intermediate: {
      explanation: [
        "**Count the space.** The number of combinations is the product of the value counts. Figma's own example is a button with type (2), size (2), state (3) and icon (2) — 24 variants in one component set {{src:figma-variants}}. A button with intent (3), size (3), icon (yes/no) and full width (yes/no) has 36 combinations; adding five interaction states as Figma variants makes 180. Figma notes that a component is not needed for every possible combination {{src:figma-variants}}, but every combination a consumer *can* choose must still look right.",
        "**States are not variants in code.** Designers often model hover, pressed and disabled as variants so prototypes can show them. In code, hover, focus and pressed come from the browser (`:hover`, `:focus-visible`, `:active`) and should not be props; only states the product controls, such as `disabled` or `loading`, become props. Keeping states out of the variant props shrinks the space a consumer can choose from.",
        "**Booleans vs enums.** Figma offers boolean properties for things like showing an icon instead of creating extra variants {{src:figma-component-properties}}. Booleans suit independent on/off choices. For options that exclude each other, booleans multiply invalid states: three flags `isPrimary`, `isSecondary`, `isDanger` allow 8 combinations of which only 4 make sense; one enum `intent` with the same options allows exactly those 4.",
        "**One name in design and code.** Figma variant properties can be mapped to code components {{src:figma-variants}}; cva maps the same names to classes, supports boolean variants, `compoundVariants` for combinations, and `defaultVariants` {{src:cva-variants}}. Matching names make design reviews and handoff checkable.",
      ],
      howItWorks: [
        "Variants turn visual differences into a small vocabulary of independent choices. Because each dimension maps to its own tokens or classes, n values on a dimension need n style rules, not one rule per combination.",
        "Compound variants handle the few combinations that genuinely interact (for example a danger button's hover colour), so most of the space stays automatic.",
      ],
      implementation: [
        "Name dimensions by purpose (intent, emphasis, size), not by appearance (red, blue).",
        "Calculate the variant space before adding a dimension; question any dimension that doubles it for a single use.",
        "Use enums for exclusive options and booleans only for independent on/off choices.",
        "Keep browser states (hover, focus, pressed) as CSS states, not props; expose only product states such as `disabled` and `loading`.",
        "Check every variant against contrast and target size: text 4.5:1 [WCAG 2.2 SC 1.4.3, AA], focus indicators and boundaries 3:1 [SC 1.4.11, AA], targets 24 × 24 CSS px in the smallest size [SC 2.5.8, AA] {{src:w3c-wcag-22}}.",
        "Keep Figma property names and values identical to code prop names and values.",
      ],
      scenarios: [
        "**Illustrative.** The library app's Figma button has 180 variants because hover, pressed, focus and disabled were drawn for every intent and size. In code, the component has four props; a review agrees to show states on a separate documentation frame and keep 36 combinations in the component set.",
        "**Illustrative.** A developer adds `isGhost` beside `isPrimary`. A product sets both, and the button renders transparent with white text. Replacing both with `emphasis: \"primary\" | \"secondary\" | \"ghost\"` removes the impossible state.",
        "**Design review protocol.** For each proposed variant: is it chosen by the consumer or caused by interaction? Is it a new value on an existing dimension or a new dimension? How much does it multiply the space? Does every new combination pass contrast and target size? Is the name the same in Figma and code?",
      ],
    },
    advanced: {
      explanation: [
        "**Make invalid combinations unrepresentable.** TypeScript treats a union whose members share a literal-typed property as a discriminated union and narrows on it {{src:typescript-narrowing}}. A button whose `intent: \"danger\"` requires a `confirmLabel`, or whose `size: \"icon\"` requires an accessible `label` and forbids visible text, can be typed as a union so the invalid combination does not compile.",
        "**Variants as token routing.** Each variant value should select semantic tokens (`intent=danger` → `color.action.danger.*`), not raw values, so themes and brands apply automatically. cva's variant objects are a direct way to express this mapping, and its `compoundVariants` handle the few interacting cases {{src:cva-variants}}.",
        "**Runtime and bundle.** cva itself is small (596 B compressed) and its docs recommend server-side rendering or static generation, since the user often does not need this JavaScript for static components {{src:cva-variants}}. Variant resolution in a Server Component runs on the server and sends only the class string.",
        "**Testing the space.** Visual regression should cover each value of each dimension and every declared compound variant, not the full product of combinations; pairwise testing (every pair of values appears at least once) gives broad coverage at a fraction of the cost.",
      ],
      evidence: [
        "Variants are **documented practice** in design tools and code libraries: Figma's variant and component property documentation and cva's documentation {{src:figma-variants}} {{src:figma-component-properties}} {{src:cva-variants}}. The combination count is arithmetic, computed in this course's formulas. No controlled study of variant-space size and usability was found. Contrast and target size are WCAG 2.2 success criteria {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**States in the component set?** Drawing states as variants helps prototyping but bloats the set; documenting them separately keeps the set small.",
        "**Many small components or one with many variants?** `DangerButton` and `Button intent=danger` express the same thing; separate components make dangerous actions explicit, variants keep one API.",
        "**Open or closed values?** Closed enums keep consistency; allowing arbitrary class names (as an escape hatch) trades consistency for flexibility.",
      ],
      alternativeModels: [
        "**Modifier classes (BEM)** — `.button--danger.button--small`; the same dimensions expressed as CSS conventions without a type system.",
        "**Style props** — passing tokens directly (`bg=\"danger\"`); flexible but blurs the line between variants and one-off styling.",
      ],
    },
  },

  application: {
    summary: ["Variants apply to every component that has designed versions: buttons, badges, inputs, alerts, cards and layout primitives."],
    web: ["Express variants as typed props mapped to classes (cva or similar) that select semantic tokens; leave hover and focus to CSS."],
    mobile: ["Native component styles use the same dimension names; platform states remain native."],
    enterprise: ["Dense products add size or density values carefully; each value multiplies testing."],
    services: ["Documentation lists every dimension, value and the combinations that are not allowed."],
    steps: [
      "List the visual differences in use and group them into dimensions.",
      "Separate chosen variants from interaction states and content.",
      "Count the variant space; remove or merge dimensions that add little.",
      "Map each value to semantic tokens; add compound variants only where needed.",
      "Align Figma properties and code props; test each value and compound case.",
    ],
  },

  whenToUse: [
    "When a component needs a few designed versions chosen by consumers.",
    "When design and code must agree on the names of those versions.",
  ],
  whenNotToUse: [
    "For interaction states the browser handles (hover, focus, pressed).",
    "For one-off visual differences that belong to a specific page: compose or wrap instead of adding a system-wide dimension.",
  ],
  advantages: [
    "A shared vocabulary for design and code.",
    "Predictable styling: one rule per value, not per combination.",
    "Type-checked choices when variants are enums.",
  ],
  limitations: [
    "Each dimension multiplies the space to design, document and test.",
    "Booleans for exclusive options create impossible states.",
    "Design-tool component sets and code can drift without naming discipline.",
  ],
  misconceptions: [
    {
      myth: "Every combination needs its own component in Figma.",
      reality:
        "Figma notes that you don't need a component for every possible combination {{src:figma-variants}}; but every combination consumers can select in code must render correctly.",
    },
    {
      myth: "Hover, focus and pressed are variants.",
      reality:
        "They are interaction states caused at run time. In code they belong to CSS pseudo-classes; only product-controlled states such as disabled or loading become props.",
    },
  ],

  relations: [
    { target: "semantic-tokens", type: "applied-in", note: "Each variant value selects semantic tokens." },
    { target: "primitive-tokens", type: "related-to", note: "Tokens beneath variant styles." },
    { target: "component-properties", type: "complementary-to", note: "Variants are one kind of component property." },
    { target: "interaction-states", type: "contrasts-with", note: "States are caused by interaction; variants are chosen." },
    { target: "component-architecture", type: "related-to", note: "Composition can replace variant dimensions for layout differences." },
    { target: "atomic-design", type: "related-to", note: "Atoms typically carry the most variants." },
  ],

  practice: {
    dos: [
      { text: "Name dimensions by purpose and give each a closed set of values that match Figma and code exactly.", why: "Shared names make handoff checkable; Figma variant properties can be mapped to code components {{src:figma-variants}}.", kind: "system" },
      { text: "Use one enum for mutually exclusive options.", why: "Three exclusive booleans allow 8 combinations with only 4 valid; an enum allows exactly the valid ones.", kind: "industry" },
      { text: "Check every value in its smallest and lowest-contrast form against WCAG 2.2.", why: "Text 4.5:1 [SC 1.4.3], boundaries and focus 3:1 [SC 1.4.11], targets 24 px [SC 2.5.8] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't expose hover, focus or pressed as props.", why: "They are browser states; props for them create combinations that can contradict real interaction.", kind: "platform" },
      { text: "Don't add a dimension for a single use case.", why: "Every dimension multiplies the space: 3 × 3 × 2 × 2 = 36 combinations, ×5 states = 180 frames.", kind: "system" },
      { text: "Don't name values by colour or appearance (red, blue).", why: "Appearance changes with themes and brands; purpose names (danger, primary) survive.", kind: "industry" },
    ],
    examples: [
      {
        title: "cva button: variants routed to semantic tokens, typed props, browser states in CSS",
        language: "ts",
        code: `import { cva, type VariantProps } from "class-variance-authority";

export const button = cva("btn", {
  variants: {
    intent:   { primary: "btn-primary", secondary: "btn-secondary", danger: "btn-danger" },
    size:     { sm: "btn-sm", md: "", lg: "btn-lg" },          // btn-sm keeps a 24px minimum target
    fullWidth: { true: "w-full", false: "" },
  },
  compoundVariants: [
    { intent: "danger", size: "sm", class: "font-semibold" },   // only the case that really interacts
  ],
  defaultVariants: { intent: "primary", size: "md", fullWidth: false },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & { loading?: boolean };       // product state as a prop

export function Button({ intent, size, fullWidth, loading, disabled, className, children, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={button({ intent, size, fullWidth, className })}
      disabled={disabled || loading} aria-busy={loading || undefined}>
      {children}
    </button>
  );
}

/* globals.css — hover, focus and pressed are CSS states, colours are semantic tokens
.btn-danger { background: var(--color-action-danger); color: var(--color-on-action-danger); }
.btn-danger:hover { background: var(--color-action-danger-hover); }
.btn:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; } */`,
        caption: "Illustrative. Ten class declarations (3 + 3 + 2 + one compound + base) cover 36 combinations; hover and focus never become props.",
      },
      {
        title: "Tailwind CSS v4: variant tokens exposed as utilities",
        language: "css",
        code: `@theme inline {
  --color-action-danger: var(--color-action-danger);
  --color-action-danger-hover: var(--color-action-danger-hover);
}
/* cva values can then use bg-action-danger hover:bg-action-danger-hover,
   keeping each variant value tied to a semantic token */`,
        caption: "Illustrative. Variant values select semantic tokens, so themes change every variant at once.",
      },
    ],
  },

  exercises: [
    {
      id: "variants-ex-sort",
      kind: "assignment",
      level: "beginner",
      title: "Sort the differences",
      prompt: ["Collect every version of the button in an app. Sort each difference into: a variant chosen by the designer, an interaction state, or content (label, icon)."],
      deliverable: "A three-column table of differences.",
      criteria: ["All versions collected", "States separated", "Dimensions named by purpose"],
    },
    {
      id: "variants-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Shrink an exploding button",
      prompt: [
        "Illustrative case. The library app's Button has props isPrimary, isSecondary, isDanger, isGhost, isSmall, isLarge, isHovered and hasIcon. The Figma set has 180 frames. The small ghost button's text is 3.1:1 and its target is 20 × 20 px.",
        "Work through the correction sequence.",
      ],
      deliverable: "A new dimension model, its variant count and accessibility fixes.",
      criteria: ["Enums replace exclusive flags", "States removed from props", "Count computed", "WCAG criteria applied"],
      exampleSolution: [
        "1. Symptoms: impossible combinations, a bloated Figma set, a low-contrast tiny ghost button.",
        "2. Impact: inconsistent screens; review overhead; ghost buttons hard to see and hit.",
        "3. Causes: booleans for exclusive options; hover as a prop; small size not checked.",
        "4. Requirements: text 4.5:1 [WCAG 2.2 SC 1.4.3, AA]; target 24 × 24 px or spacing [SC 2.5.8, AA].",
        "5. Correction: replace eight flags (2⁸ = 256 combinations) with emphasis (primary, secondary, ghost) × tone (default, danger) × size (sm, md, lg) × icon (yes/no) = 36, and type out ghost + danger, leaving 30; move hover to CSS; darken the ghost text token to pass 4.5:1; give sm a 24 px minimum target.",
        "6. Validation: compute the space; contrast check per value; target measurement; pairwise visual tests.",
        "7. Trade-off: fewer options for designers; exceptions go through review.",
      ],
    },
    {
      id: "variants-ex-types",
      kind: "reflection",
      level: "advanced",
      title: "Type away the impossible",
      prompt: ["Write a TypeScript type for an IconButton whose size 'icon' forbids visible text and requires an accessible label, while other sizes require visible text. Explain which invalid combinations it rejects."],
      deliverable: "A discriminated union and three rejected examples.",
      criteria: ["Discriminant chosen", "Label rule enforced", "Rejected cases explained"],
    },
  ],

  quiz: [
    {
      id: "variants-q-what",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which of these is a variant rather than an interaction state?",
      options: [
        { text: "size = small", correct: true, explanation: "Chosen by the designer or developer." },
        { text: "hover", correct: false, explanation: "Caused by the pointer." },
        { text: "pressed", correct: false, explanation: "Caused by activation." },
        { text: "focus", correct: false, explanation: "Caused by keyboard or pointer focus." },
      ],
      explanation: "Variants are chosen; states happen.",
    },
    {
      id: "variants-q-count",
      kind: "formula",
      level: "intermediate",
      prompt: "A button has intent (3 values), size (3), icon (yes/no) and full width (yes/no). How many combinations, and how many if five interaction states are drawn as variants too?",
      options: [
        { text: "36, and 180 with states", correct: true, explanation: "3 × 3 × 2 × 2 = 36; × 5 = 180." },
        { text: "10, and 15 with states", correct: false, explanation: "That adds values instead of multiplying them." },
        { text: "12, and 60 with states", correct: false, explanation: "Missing one dimension." },
        { text: "36, and 41 with states", correct: false, explanation: "States multiply, they do not add." },
      ],
      explanation: "The variant space is the product of value counts.",
    },
    {
      id: "variants-q-enum",
      kind: "critique",
      level: "advanced",
      prompt: "A Button has isPrimary, isSecondary and isDanger booleans. What is the problem and the fix?",
      options: [
        { text: "8 combinations, only 4 meaningful; replace them with one enum so invalid states cannot be expressed", correct: true, explanation: "Exclusive options belong in one enum." },
        { text: "No problem; booleans are simpler", correct: false, explanation: "They allow contradictory states." },
        { text: "Add a fourth boolean, isDefault", correct: false, explanation: "That makes 16 combinations." },
        { text: "Document that only one may be true", correct: false, explanation: "Types can enforce what documentation only asks." },
      ],
      explanation: "Make invalid combinations unrepresentable.",
    },
  ],

  flashcards: [
    { id: "variants-fc-define", front: "Variant", back: "One value on each named dimension of a component (intent, size, emphasis), chosen by the consumer." },
    { id: "variants-fc-count", front: "Variant space", back: "The product of the value counts of all dimensions; Figma's example: 2 × 2 × 3 × 2 = 24." },
    { id: "variants-fc-enum", front: "Booleans vs enum", back: "n exclusive booleans allow 2ⁿ combinations, n + 1 meaningful; one enum allows exactly the meaningful ones." },
    { id: "variants-fc-states", front: "Variant vs interaction state", back: "Variants are chosen (size, intent); states are caused at run time (hover, focus, pressed) and belong to CSS." },
  ],

  references: [
    { source: "figma-variants", role: "primary", note: "Variant properties, values, component sets, 24-variant example." },
    { source: "figma-component-properties", role: "primary", note: "Boolean, instance swap, text and variant properties." },
    { source: "cva-variants", role: "primary", note: "Variants, boolean variants, compound and default variants." },
    { source: "typescript-narrowing", role: "explanatory", note: "Discriminated unions." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.3, 1.4.11, 2.5.8." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Documented practice in design tools and code libraries; the combination count is arithmetic (lib/formulas/components). No controlled study of variant-space size was found. Contrast and target size are WCAG 2.2 success criteria.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
