import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "modular-type-scale",
  slug: "modular-type-scale",
  title: "Modular Type Scale",
  alternateNames: ["Modular scale", "Typographic scale", "Ratio-based type scale"],
  summary:
    "A technique for choosing type sizes (and often spacing) as a geometric sequence — a base size repeatedly multiplied by a fixed ratio — to produce consistent, proportional steps.",
  definition:
    "A modular type scale is a set of sizes generated as `sizeᵢ = base × ratioⁱ`, where *i* is an integer step (negative for smaller sizes). The ratio is usually borrowed from musical intervals (e.g. 5:4 major third, 4:3 perfect fourth) or the golden ratio. It is a **design convention** for systematising typographic hierarchy, not an empirically derived law of readability.",
  primaryType: "technique",
  secondaryTypes: ["formula"],
  domain: "type-colour",
  subcategory: "typography",
  tags: ["typography", "type scale", "hierarchy", "design tokens", "responsive type", "clamp"],
  difficulty: "beginner",
  disciplines: ["Typography", "Visual design", "Design systems", "Front-end engineering"],
  learningObjectives: [
    "Generate a type scale from a base size and a ratio.",
    "Choose a ratio appropriate to the content density and viewport.",
    "Implement the scale as design tokens, including fluid responsive sizes with CSS clamp().",
    "Evaluate the claims made for modular scales and when to deviate from them.",
  ],
  prerequisites: ["typographic-hierarchy"],

  levels: {
    beginner: {
      explanation: [
        "Every interface needs several text sizes — for page titles, headings, body text and small captions. If you pick each size by eye, you often end up with too many sizes that are almost the same (15, 16, 17 px…), and the page looks unsettled.",
        "A modular scale solves this with simple maths. You choose a **base size** (usually your body text, like 16 px) and a **ratio** (like 1.25). Each step up multiplies by the ratio; each step down divides by it: 16 → 20 → 25 → 31.25 → 39 px, and 16 → 12.8 px.",
        "Because every size is related by the same ratio, the steps feel even, and there are fewer arbitrary choices to make. It also gives a team a shared list of sizes to use.",
      ],
      analogy:
        "A musician does not play any random pitch but picks from notes related by fixed intervals, so whatever is played fits together. A modular scale does the same for type sizes. The common ratio names even come from music — 'major third', 'perfect fourth'.",
      everydayExamples: [
        "A blog with body text at 18 px and headings at 22.5, 28 and 35 px (ratio 1.25).",
        "A design system that offers 'text-sm, text-base, text-lg, text-xl…' tokens rather than any pixel value.",
      ],
      vocabulary: [
        { term: "Base size", meaning: "The starting value of the scale, usually body text size." },
        { term: "Ratio", meaning: "The multiplier between neighbouring steps, e.g. 1.25." },
        { term: "Step", meaning: "A position in the scale; step 0 is the base, step 2 is base × ratio²." },
        { term: "Fluid type", meaning: "Sizes that grow smoothly between a minimum and maximum as the viewport widens." },
      ],
    },
    intermediate: {
      explanation: [
        "The ratio determines the **contrast between levels**. Small ratios (minor second 16:15 ≈ 1.067, major second 9:8 = 1.125) give subtle steps suited to dense interfaces where many levels must coexist. Medium ratios (minor third 6:5 = 1.2, major third 5:4 = 1.25, perfect fourth 4:3 ≈ 1.333) suit most products and editorial pages. Large ratios (perfect fifth 3:2 = 1.5, golden ratio ≈ 1.618) create dramatic display hierarchy but run out of usable sizes quickly — four steps above a 16 px base, a golden scale already reaches ≈ 110 px.",
        "A common responsive approach uses a **smaller ratio on small screens and a larger one on wide screens**, because headings that are 3–4× body size overwhelm a phone. With CSS `clamp()`, each step can interpolate fluidly between a mobile and a desktop value.",
        "The output is rarely used raw: designers round to whole pixels or to the baseline grid, drop steps they don't need, and pair each size with a line height and weight. The result becomes a set of semantic **typography tokens** (display, heading-1…, body, caption).",
      ],
      howItWorks: [
        "Size at step i: `base × ratioⁱ`. With base 16 and ratio 4/3: step −1 = 12, step 1 ≈ 21.33, step 2 ≈ 28.44, step 3 ≈ 37.93, step 4 ≈ 50.57.",
        "A **double-stranded** scale interleaves two sequences with the same ratio from two bases (for example body size and a key headline size), giving more intermediate values {{src:brown-2011}}.",
        "Fluid step: `font-size: clamp(min, preferred, max)` where the preferred value is a linear function of viewport width (e.g. `1.2rem + 1.5vw`); setting min/max in rem preserves user zoom.",
      ],
      implementation: [
        "Pick the base from the body text size that reads well in your chosen typeface — not from the scale.",
        "Choose a ratio by the number of levels you need and the space available; test with real content.",
        "Generate 3–4 steps above and 1–2 below; discard unused steps.",
        "Round values and pair each with line height (tighter for large sizes, looser for body) and weight.",
        "Express sizes in rem so that user font-size preferences and zoom scale everything (WCAG 1.4.4 Resize Text).",
        "Publish as design tokens and reference them semantically, never as raw numbers in components.",
      ],
      scenarios: [
        "A dashboard needs six text levels in a compact space — a major second (1.125) keeps steps distinguishable without huge headings.",
        "A marketing site needs a dramatic hero — use a perfect fifth on desktop, falling back to a major third on mobile via clamp().",
      ],
    },
    advanced: {
      explanation: [
        "Proportional scales have a long history in typography. Bringhurst describes a modular scale as a prearranged set of harmonious proportions, comparable to a musical scale, and advocates choosing type sizes and page measures from such sequences {{src:bringhurst-2012}}. Tim Brown's 2011 article brought the idea to web design and introduced a calculator for generating scales {{src:brown-2011}}.",
        "The mathematical claim is modest: a geometric sequence produces *equal ratios* between steps, and perceived size differences are roughly proportional rather than absolute (consistent with Weber–Fechner-type psychophysics). So equal ratios plausibly give perceptually even steps. That is a reasonable rationale, but there is **little direct empirical evidence** that any particular ratio — musical or golden — improves readability, comprehension or aesthetics compared with a carefully hand-tuned set of sizes.",
        "Practical systems therefore treat the scale as a **generator** for a starting set of values that is then adjusted for typeface metrics (x-height differs between fonts), optical sizing, platform rendering and content.",
      ],
      evidence: [
        "Support is primarily from typographic practice and expert authority {{src:bringhurst-2012}} {{src:brown-2011}}. Claims that the golden ratio is inherently more beautiful are not well supported by experimental aesthetics and should not be used as justification.",
        "Accessibility evidence concerns *absolute* sizes and user control (resizing to 200% without loss), not scale ratios {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Golden-ratio mysticism.** The golden ratio is often presented as a law of beauty; this is folklore rather than established science. Use it as one ratio among many.",
        "**Fixed ratio vs fluid scales.** Some systems vary the ratio by viewport; others keep one ratio and change the base. Both are defensible; consistency within the system matters more.",
        "**Scale vs tokens.** Mature design systems (Material, Carbon) publish curated named type tokens rather than exposing the raw scale — prioritising semantic roles over mathematical purity {{src:material-3}} {{src:carbon-design-system}}.",
      ],
      alternativeModels: [
        "**Hand-tuned scales** chosen per role and typeface.",
        "**Linear (additive) scales** — e.g. steps of 4 px — common for spacing, less suitable for large type ranges.",
        "**Fluid type** with `clamp()` interpolation between viewport-specific scales.",
      ],
    },
  },

  origin: {
    contributors: ["Robert Bringhurst", "Tim Brown"],
    period: "Traditional book typography; web adoption from 2011",
    problem:
      "Choosing type sizes ad hoc produces inconsistent hierarchies and too many near-identical sizes. Designers wanted a principled way to pick a small, coherent set.",
    narrative: [
      "Print typographers historically worked with a fixed series of type sizes. Bringhurst's *Elements of Typographic Style* framed proportional scales as a tool for harmonious page design {{src:bringhurst-2012}}.",
      "In 2011, Tim Brown's 'More Meaningful Typography' in *A List Apart* showed how to derive web type sizes and measures from a modular scale and released modularscale.com {{src:brown-2011}}.",
      "Design systems later absorbed the idea into typography tokens, often combined with fluid sizing via CSS clamp().",
    ],
    attributionNote:
      "Modular scales have no single inventor. Musical-interval ratio names are a naming convention; their link to typography is analogical.",
  },

  application: {
    summary: [
      "Modular scales generate the size steps of a typography system and, often, its spacing system. They shape headings, body text, captions and the rhythm between sections.",
    ],
    web: [
      "Implement steps as CSS custom properties (e.g. `--step-0` … `--step-4`) with clamp() for fluid behaviour.",
      "Use rem units so browser font-size settings scale the system.",
    ],
    mobile: [
      "Use a smaller ratio on small screens to avoid oversized headings; respect platform dynamic type settings (iOS Dynamic Type, Android font scale).",
    ],
    enterprise: [
      "Dense applications benefit from small ratios and more emphasis via weight and colour than via size.",
    ],
    services: [
      "Keep printed and digital materials on related scales for brand coherence.",
    ],
    steps: [
      "Set the base size from body-text legibility in the chosen typeface.",
      "List the hierarchy levels needed; choose a ratio that separates them in the available space.",
      "Generate, round and prune the scale.",
      "Assign line heights, weights and semantic names.",
      "Add fluid behaviour and test at 200% zoom and with large OS font settings.",
    ],
  },

  whenToUse: [
    "Defining or refactoring the typography tokens of a design system.",
    "Bringing order to a product with too many ad hoc font sizes.",
    "Creating a consistent relationship between type and spacing.",
  ],
  whenNotToUse: [
    "As a justification on its own ('it's the golden ratio') — test with real content.",
    "When a platform or brand already defines a type ramp you must follow.",
    "Forcing every size to the scale when a typeface's metrics need optical adjustment.",
  ],
  advantages: [
    "Fewer, more consistent sizes and faster decisions.",
    "Easy to express as tokens and implement in code.",
    "Scales cleanly with fluid typography.",
  ],
  limitations: [
    "Little empirical evidence that specific ratios improve reading.",
    "Large ratios produce unusable extremes quickly.",
    "Ignores typeface metrics; identical sizes look different across fonts.",
  ],
  misconceptions: [
    {
      myth: "The golden ratio produces the most readable or beautiful type scale.",
      reality: "There is no robust evidence for this; it is a large ratio that suits some display-led designs and overwhelms others.",
    },
    {
      myth: "A modular scale must be followed exactly.",
      reality: "Practitioners, including the technique's popularisers, treat it as a guide to be rounded and adjusted {{src:brown-2011}}.",
    },
    {
      myth: "Using a type scale makes text accessible.",
      reality: "Accessibility depends on absolute sizes, contrast, spacing and user control such as resizing — not on the ratio.",
    },
  ],

  relations: [
    { target: "typographic-hierarchy", type: "applied-in", note: "The scale supplies consistent size steps for the levels of typographic hierarchy." },
    { target: "visual-hierarchy", type: "applied-in", note: "Size is a primary lever of visual hierarchy; a scale makes it systematic." },
    { target: "design-tokens", type: "applied-in", note: "Scale steps are typically published as typography tokens." },
    { target: "typography-scales", type: "related-to", note: "Design-system typography scales often originate from a modular scale and are then curated." },
    { target: "golden-ratio", type: "related-to", note: "The golden ratio is one of the ratios used to generate scales; its aesthetic claims are contested." },
    { target: "webers-law", type: "related-to", note: "Proportional (ratio) steps are motivated by the observation that perceived differences scale with magnitude." },
    { target: "line-height", type: "complementary-to", note: "Each step needs an appropriate line height; large sizes usually need tighter leading." },
  ],

  formulas: [
    {
      id: "modular-scale-step",
      name: "Modular scale step",
      expression: "sizeᵢ = base × ratioⁱ",
      contributor: "Typographic convention; popularised for the web by Brown (2011)",
      source: "brown-2011",
      variables: [
        { symbol: "sizeᵢ", name: "Size at step i", unit: "px, rem, pt", description: "The generated size." },
        { symbol: "base", name: "Base size", unit: "px, rem, pt", description: "The step-0 value, usually body text size." },
        { symbol: "ratio", name: "Scale ratio", unit: "—", description: "Multiplier between adjacent steps, e.g. 1.25 (major third)." },
        { symbol: "i", name: "Step", unit: "integer", description: "Position in the scale; negative values give smaller sizes." },
      ],
      resultUnit: "same unit as base",
      assumptions: [
        "Perceptually even steps are approximated by equal ratios.",
        "The base size has already been chosen for legibility in the chosen typeface.",
      ],
      conditions: [
        "Use to generate candidate sizes; round and prune afterwards.",
        "For fluid type, compute separate scales for minimum and maximum viewports and interpolate with clamp().",
      ],
      steps: [
        "Choose a base size (e.g. 16 px).",
        "Choose a ratio (e.g. 1.25).",
        "For each step i, compute base × ratioⁱ.",
        "Round to whole pixels or rem values as required.",
        "Assign semantic names and line heights to the steps you keep.",
      ],
      workedExample: {
        given: ["Base 16 px", "Ratio 1.25 (major third)", "Steps −1 to 4"],
        steps: [
          "Step −1: 16 × 1.25⁻¹ = 12.8 px",
          "Step 1: 16 × 1.25 = 20 px",
          "Step 2: 16 × 1.25² = 25 px",
          "Step 3: 16 × 1.25³ = 31.25 px",
          "Step 4: 16 × 1.25⁴ ≈ 39.06 px",
        ],
        result: "12.8, 16, 20, 25, 31.25, 39.06 px — commonly rounded to 13, 16, 20, 25, 31, 39 px (0.8, 1, 1.25, 1.5625, 1.953, 2.441 rem).",
      },
      interpretation: [
        "Compare the largest step with your viewport: if the top heading exceeds about a third of a phone's width per word, the ratio is probably too large for mobile.",
        "Use the number of distinct levels as a guide: more levels need a smaller ratio.",
      ],
      commonErrors: [
        "Adding the ratio instead of multiplying (producing a linear scale).",
        "Choosing the base from the scale instead of from body-text legibility.",
        "Using px units that ignore user font-size preferences.",
        "Keeping every generated step, creating unused sizes.",
      ],
      limitations: [
        "Does not account for typeface x-height or optical sizes.",
        "Ratio choice is a matter of judgement, not evidence.",
      ],
      alternatives: [
        { name: "Linear scale", expression: "sizeᵢ = base + i × increment", note: "Even absolute steps; common for spacing systems." },
        { name: "Fluid step", expression: "clamp(minᵢ, a + b·vw, maxᵢ)", note: "Interpolates each step between viewport-specific scales." },
        { name: "Double-stranded scale", expression: "base₁ × ratioⁱ ∪ base₂ × ratioⁱ", note: "Two interleaved sequences for more intermediate sizes." },
      ],
      calculator: "modular-scale",
    },
  ],
  lab: "type-scale-lab",

  exercises: [
    {
      id: "modular-type-scale-ex-generate",
      kind: "calculation",
      level: "beginner",
      title: "Generate a scale",
      prompt: [
        "Using base 16 px and the perfect fourth (4:3), calculate steps −1 to 4. Round each to the nearest pixel.",
      ],
      deliverable: "Six sizes.",
      criteria: ["Multiplies, not adds", "Includes the step below the base", "Rounds sensibly"],
      exampleSolution: [
        "12, 16, 21.33 → 21, 28.44 → 28, 37.93 → 38, 50.57 → 51 px.",
      ],
    },
    {
      id: "modular-type-scale-ex-audit",
      kind: "assignment",
      level: "intermediate",
      title: "Rationalise an existing product's type",
      prompt: [
        "Inspect a website or app and list every distinct font size in use. Map each to the nearest step of a candidate scale.",
        "Propose a reduced token set and a migration plan for sizes that don't fit.",
      ],
      deliverable: "Before/after size inventory and a token table.",
      criteria: ["Complete inventory", "Justified ratio choice", "Semantic token names", "Considers line height and weight"],
    },
    {
      id: "modular-type-scale-ex-fluid",
      kind: "assignment",
      level: "advanced",
      title: "Build a fluid scale",
      prompt: [
        "Create a five-step fluid scale: major second at 360 px viewport and perfect fourth at 1280 px, base 16→18 px. Write the clamp() expressions and test at 200% browser zoom.",
      ],
      criteria: ["Correct linear interpolation", "Units preserve zoom", "Largest step remains readable on mobile"],
    },
  ],

  quiz: [
    {
      id: "modular-type-scale-q-calc",
      kind: "formula",
      level: "beginner",
      prompt: "With a base of 16 px and a ratio of 1.5, what is step 2?",
      options: [
        { text: "36 px", correct: true, explanation: "16 × 1.5² = 16 × 2.25 = 36." },
        { text: "24 px", correct: false, explanation: "That is step 1 (16 × 1.5)." },
        { text: "19 px", correct: false, explanation: "This adds 1.5 twice instead of multiplying." },
        { text: "48 px", correct: false, explanation: "This multiplies 16 by 3 (1.5 × 2) instead of 1.5²." },
      ],
      explanation: "sizeᵢ = base × ratioⁱ — exponents, not multiplication by i.",
    },
    {
      id: "modular-type-scale-q-ratio",
      kind: "scenario",
      level: "intermediate",
      prompt: "An analytics dashboard needs seven distinct text levels on a compact layout. Which ratio is most suitable?",
      options: [
        { text: "Major second (1.125)", correct: true, explanation: "Small steps allow many levels without extreme sizes." },
        { text: "Golden ratio (1.618)", correct: false, explanation: "Seven golden steps from 12 px would exceed 200 px." },
        { text: "Perfect fifth (1.5)", correct: false, explanation: "Still produces very large top steps for seven levels." },
        { text: "Any ratio — it doesn't matter", correct: false, explanation: "The ratio determines how many usable levels fit." },
      ],
      explanation: "Choose the ratio from the number of levels and available space.",
    },
    {
      id: "modular-type-scale-q-evidence",
      kind: "true-false",
      level: "advanced",
      prompt: "Controlled studies have shown the golden ratio produces the most readable type scale.",
      options: [
        { text: "True", correct: false, explanation: "There is no robust empirical evidence for this claim." },
        { text: "False", correct: true, explanation: "Modular scales are a design convention; ratio choice is a judgement tested with real content." },
      ],
      explanation: "Separate typographic tradition from empirical findings.",
    },
  ],

  flashcards: [
    { id: "modular-type-scale-fc-formula", front: "Modular scale formula", back: "sizeᵢ = base × ratioⁱ" },
    { id: "modular-type-scale-fc-ratios", front: "Common ratios", back: "Major second 1.125, minor third 1.2, major third 1.25, perfect fourth 1.333, perfect fifth 1.5, golden ≈1.618." },
    { id: "modular-type-scale-fc-units", front: "Why rem for type tokens?", back: "rem respects users' browser font-size settings and zoom." },
  ],

  references: [
    { source: "bringhurst-2012", role: "primary", note: "Typographic tradition of proportional scales." },
    { source: "brown-2011", role: "primary", note: "Modular scales for the web; double-stranded scales; calculator." },
    { source: "w3c-wcag-22", role: "standard", locator: "SC 1.4.4 Resize Text; SC 1.4.12 Text Spacing", note: "Accessibility constraints on type implementation." },
    { source: "material-3", role: "explanatory", note: "Example of curated type tokens in a design system." },
    { source: "carbon-design-system", role: "explanatory", note: "Example of productive vs expressive type sets." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Modular scales are an established typographic convention backed by expert practice and a plausible psychophysical rationale (equal ratios). There is no strong empirical evidence that particular ratios improve readability or aesthetics; treat the scale as a generator for decisions that are then tested.",

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
  lastVerifiedAt: "2026-11-03",
});
