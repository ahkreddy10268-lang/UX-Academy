import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "spacing-scales",
  slug: "spacing-scales",
  title: "Spacing Scales",
  alternateNames: ["Spacing system", "Space tokens", "Spatial system", "4-point grid", "8-point grid"],
  summary:
    "A limited, named set of distances — built on a small base unit — that every gap, padding and margin in a product draws from, so that spacing communicates grouping and rhythm instead of accident.",
  definition:
    "A spacing scale is a **limited set of named distances** (for example 4, 8, 12, 16, 24, 32 px) derived from a **base unit** and published as tokens, which every padding, gap and margin in a product uses. Its job is to make spacing **meaningful** — smaller gaps bind related things, larger gaps separate groups — and **consistent** across teams. It is not a grid of columns (that is layout) and not a rule that every value must be a multiple of 8: systems choose different bases and add small steps where needed.",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "scales",
  tags: ["spacing", "space tokens", "rhythm", "8-point grid", "4-point grid", "padding", "gap", "density", "radius"],
  difficulty: "beginner",
  disciplines: ["Visual design", "Design systems", "Front-end engineering"],
  learningObjectives: [
    "Explain how spacing communicates grouping and why a limited scale helps.",
    "Choose a base unit and steps, and justify the choice against documented systems.",
    "Separate component-internal spacing from layout spacing, and nested radii from padding.",
    "Keep spacing accessible: target size and user text-spacing overrides.",
  ],
  prerequisites: ["gestalt-principles", "primitive-tokens"],

  levels: {
    beginner: {
      explanation: [
        "On a library app's book page, the gap between the title and the author is 7 px, between the author and the cover 13 px, and between the cover and the 'Renew' button 11 px. Nothing is wrong exactly, but the page feels loose and it is hard to tell which things belong together.",
        "A **spacing scale** replaces those one-off numbers with a short list of allowed distances, such as 4, 8, 12, 16, 24 and 32 pixels. Designers and developers pick from the list. Because there are only a few steps, the differences become meaningful: a small step says 'these belong together', a large step says 'this is a new group'.",
        "This is the Gestalt principle of proximity put into practice: people read closeness as relatedness. A scale makes sure the closeness is deliberate.",
      ],
      analogy:
        "A ruler with only a few marks. If every measurement must land on a mark, everything built with it lines up — and a bigger jump between marks is noticed as intentional.",
      everydayExamples: [
        "Buttons with the same inner padding everywhere in an app.",
        "Cards separated by the same gap in every list.",
        "A form where label-to-field gaps are small and field-to-field gaps are larger.",
      ],
      vocabulary: [
        { term: "Spacing scale", meaning: "The limited set of distances a product uses for gaps, padding and margins." },
        { term: "Base unit", meaning: "The unit the scale is built from, often 4 or 8 px." },
        { term: "Padding", meaning: "Space inside a component, between its edge and its content." },
        { term: "Gap", meaning: "Space between components or items in a layout." },
        { term: "Rhythm", meaning: "The repeating pattern of spacing that makes a layout feel ordered." },
      ],
    },
    intermediate: {
      explanation: [
        "Documented systems agree on the idea and differ on the numbers. Carbon's spacing tokens run from 2 px to 160 px, built on multiples of 2, 4 and 8, and it says deviation 'should be avoided whenever possible' {{src:carbon-spacing}}. Atlassian uses an 8 px base (`space.100`) with smaller 2, 4 and 6 px steps and groups the scale by use — small for icon gaps and input padding, medium for button padding and cards, large for page layout {{src:atlassian-spacing}}. USWDS works in multiples of 8 px with a 4 px half-step {{src:uswds-spacing-units}}; GOV.UK uses units 0–9 with a responsive scale that is smaller on screens up to 640 px wide {{src:govuk-spacing}}. The lesson is the reasoning, not any one base: a small unit with gaps that grow faster at the large end.",
        "Two kinds of spacing need separating. **Component-internal** spacing (padding inside a button, the gap between an icon and its label) belongs to the component and rarely changes with screen size. **Layout** spacing (gaps between cards, sections, page margins) belongs to the layout and may grow on larger screens. Mixing them makes components hard to reuse; Carbon's choice not to make spacing tokens responsive reflects this split {{src:carbon-spacing}}.",
        "Spacing also includes **shape**. When a rounded container holds a rounded child, the corners only look parallel if the outer radius equals the inner radius plus the padding between them (R_outer = R_inner + padding), because concentric arcs share a centre. A 12 px card with 8 px padding around a button therefore needs a 4 px button radius; using 12 px on both makes the gap look pinched at the corners.",
      ],
      howItWorks: [
        "A limited scale makes spacing decisions faster and visible: when only a few values exist, an odd gap stands out in review, and the hierarchy of groups follows from which step is used.",
        "Expressed as tokens (often in rem, so spacing can follow the user's text size), the same scale feeds design-tool variables and CSS, so designers and developers use identical values {{src:atlassian-spacing}}.",
      ],
      implementation: [
        "Choose a base (4 or 8 px are common) and a short series of steps; add a 2 px step only if small components need it.",
        "Name steps by size, not by use (`space.100`, `space.200`), and document typical uses for each range.",
        "Use separate tokens or rules for component padding and layout gaps.",
        "Keep interactive targets at least 24 × 24 CSS px, or space smaller targets so a 24 px circle centred on each does not overlap another [WCAG 2.2 SC 2.5.8 Target Size (Minimum), AA] {{src:w3c-wcag-22}}; 44 × 44 px is the enhanced target [SC 2.5.5, AAA].",
        "Let text spacing grow without breaking layout: content must survive line height 1.5×, paragraph spacing 2×, letter spacing 0.12× and word spacing 0.16× the font size [WCAG 2.2 SC 1.4.12 Text Spacing, AA] {{src:w3c-wcag-22}}.",
        "Derive nested radii from the scale: inner radius = outer radius − padding.",
      ],
      scenarios: [
        "**Illustrative.** A library app audit finds 23 different gap values. Mapping each to the nearest of seven scale steps, and fixing the two cases where the change broke grouping, makes reviews faster and the screens calmer.",
        "**Illustrative.** A compact table view needs tighter spacing. Instead of new one-off values, the team adds a density setting that switches the table's padding tokens to the next step down.",
        "**Critique protocol.** Measure gaps on one screen. For each, ask: is it on the scale? Is the gap between groups larger than the gap within groups? Does it survive text-spacing overrides? Are targets at least 24 px or spaced enough?",
      ],
    },
    advanced: {
      explanation: [
        "**Token architecture.** Spacing primitives (`space.100` = 8 px) sit under semantic roles (`space.inset.button`, `space.stack.section`, `space.gap.card`) that components consume. Density modes (comfortable, compact) are then theme-like remappings of those roles, not new values in components — the same mechanism as colour themes.",
        "**Units.** Defining spacing in rem lets layouts expand when people increase their default text size; Atlassian gives user resizing as its reason for rem in typography {{src:atlassian-typography}}. Pixel-based component padding with rem-based text can make text overflow its container at larger sizes, which is exactly what WCAG's text-spacing and resize criteria test.",
        "**Responsive layout spacing.** Layout gaps can step up at breakpoints (GOV.UK's responsive scale is one model {{src:govuk-spacing}}) or grow fluidly with `clamp()`. Component padding should usually stay fixed so components behave the same wherever they are placed.",
        "**Telemetry and linting.** Useful signals: the number of raw spacing values in code that bypass tokens, one-off overrides in design files, and layout bugs reported at large text sizes. Lint rules can block raw px values for spacing in component styles.",
      ],
      evidence: [
        "Spacing scales are **documented practice**: Carbon, Atlassian, USWDS and GOV.UK publish their scales and reasoning {{src:carbon-spacing}} {{src:atlassian-spacing}} {{src:uswds-spacing-units}} {{src:govuk-spacing}}. The perceptual basis — proximity read as grouping — is a well-established Gestalt finding. No controlled study was found comparing particular bases (4 vs 8 px) or step series; the choice is a trade-off of granularity against consistency. The target-size and text-spacing requirements are WCAG 2.2 success criteria {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**4 or 8?** An 8 px base gives fewer, clearer choices; a 4 px base (or 8 with half-steps) fits dense interfaces and small components. Most systems end up with both via half-steps.",
        "**Responsive spacing tokens or not?** Carbon keeps spacing tokens fixed {{src:carbon-spacing}}; GOV.UK has a responsive scale {{src:govuk-spacing}}. Fixed tokens are predictable; responsive ones adapt layouts automatically.",
        "**Exceptions.** Optical adjustments (for example nudging an icon by 1 px) break the scale for perception's sake; teams decide whether to allow them and how to record them.",
      ],
      alternativeModels: [
        "**Modular spacing** derives steps from a ratio (like a type scale), so spacing and type share proportions.",
        "**Content-based spacing** sets gaps in em relative to the text they surround, so spacing scales with type automatically.",
      ],
    },
  },

  application: {
    summary: [
      "Spacing scales apply to every padding, gap and margin. They are the most frequently used tokens in a system and the clearest test of whether a design language is being followed.",
    ],
    web: [
      "Publish spacing as CSS custom properties in rem; use `gap` for layout spacing and component tokens for padding.",
    ],
    mobile: [
      "Map the scale to platform units (pt, dp); keep the same step names; respect platform margins and safe areas.",
    ],
    enterprise: [
      "Offer density modes by remapping semantic spacing roles rather than editing components.",
    ],
    services: [
      "Printed forms and letters can use the same proportional spacing so the service feels consistent off screen.",
    ],
    steps: [
      "Audit current spacing values and cluster them.",
      "Choose a base and a step series; document ranges by use.",
      "Publish primitives and semantic spacing roles as tokens.",
      "Separate component padding from layout gaps; derive nested radii.",
      "Check target size and text-spacing overrides against WCAG 2.2.",
      "Lint for raw values and review drift.",
    ],
  },

  whenToUse: [
    "Any product with more than a few screens or more than one designer.",
    "Design systems, as one of the first foundations after colour and type.",
  ],
  whenNotToUse: [
    "As a reason to forbid optical adjustments that perception needs: allow documented exceptions rather than misaligned results.",
    "As a single scale for everything: separate component padding from layout spacing so components stay reusable.",
  ],
  advantages: [
    "Makes grouping deliberate and readable.",
    "Speeds up decisions and reviews.",
    "Gives designers and developers identical values through tokens.",
  ],
  limitations: [
    "The choice of base and steps is a trade-off with no single correct answer.",
    "Too few steps forces awkward compromises; too many reintroduces drift.",
    "A scale does not decide which step to use; layout judgement is still needed.",
  ],
  misconceptions: [
    {
      myth: "An 8-point grid is a universal standard.",
      reality:
        "It is one common choice. Carbon builds on 2, 4 and 8 {{src:carbon-spacing}}, Atlassian adds 2, 4 and 6 px steps to an 8 px base {{src:atlassian-spacing}}, and GOV.UK uses a responsive unit scale {{src:govuk-spacing}}.",
    },
    {
      myth: "If the padding is on the scale, nested rounded corners will look right.",
      reality:
        "Concentric corners need R_outer = R_inner + padding; equal radii on a container and its child make the gap look pinched at the corners.",
    },
  ],

  relations: [
    { target: "primitive-tokens", type: "applied-in", note: "Spacing steps are dimension primitives." },
    { target: "semantic-tokens", type: "applied-in", note: "Roles such as space.inset.button refer to spacing primitives." },
    { target: "gestalt-principles", type: "derived-from", note: "Proximity is the perceptual basis for using spacing to group." },
    { target: "theme-architecture", type: "related-to", note: "Density modes remap spacing roles like a theme." },
    { target: "typography-scales", type: "complementary-to", note: "Spacing and type scales together set vertical rhythm." },
    { target: "responsive-systems", type: "related-to", note: "Layout spacing may change at breakpoints; component padding usually does not." },
  ],

  practice: {
    dos: [
      { text: "Build spacing from a small base with a short, named series of steps, and document which ranges suit which uses.", why: "A limited scale makes grouping deliberate; ranges by use guide the choice {{src:atlassian-spacing}}.", kind: "industry" },
      { text: "Keep targets at least 24 × 24 CSS px or spaced so 24 px circles around them do not overlap.", why: "Required for pointer targets [WCAG 2.2 SC 2.5.8, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Derive nested radii from padding: inner radius = outer radius − padding.", why: "Concentric corners keep the gap visually even around the curve.", kind: "industry" },
    ],
    donts: [
      { text: "Don't use one-off spacing values in components.", why: "Each raw value is a decision outside the system; Carbon advises avoiding deviation from its scale {{src:carbon-spacing}}.", kind: "system" },
      { text: "Don't fix container heights or line heights so tightly that user text-spacing overrides clip content.", why: "Content must survive increased line, paragraph, letter and word spacing [WCAG 2.2 SC 1.4.12, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't make component padding responsive to the viewport.", why: "Components then behave differently wherever they are placed; let layout gaps adapt instead.", kind: "industry" },
    ],
    examples: [
      {
        title: "Spacing tokens: primitives, semantic roles and a compact density",
        language: "css",
        code: `:root {
  /* primitives (rem, so spacing follows the user's text size; 1rem = 16px by default) */
  --space-050: 0.25rem;  /*  4px */
  --space-100: 0.5rem;   /*  8px */
  --space-150: 0.75rem;  /* 12px */
  --space-200: 1rem;     /* 16px */
  --space-300: 1.5rem;   /* 24px */
  --space-400: 2rem;     /* 32px */
  --space-600: 3rem;     /* 48px */

  /* semantic roles */
  --space-inset-button: var(--space-150) var(--space-200);
  --space-gap-icon-label: var(--space-100);
  --space-gap-card: var(--space-300);
  --space-stack-section: var(--space-600);
}
[data-density="compact"] {
  --space-inset-button: var(--space-100) var(--space-150);
  --space-gap-card: var(--space-200);
}

/* nested radius: outer 12px, padding 8px → inner 4px */
.card   { --radius-outer: 12px; padding: var(--space-100); border-radius: var(--radius-outer); }
.card > .button { border-radius: calc(var(--radius-outer) - var(--space-100)); }`,
        caption: "Illustrative. Components use roles; density remaps roles; the inner radius is calculated from the outer radius and the padding.",
      },
      {
        title: "Tailwind CSS v4: exposing the scale",
        language: "css",
        code: `@theme {
  --spacing: 0.25rem;          /* Tailwind v4 multiplies this base: p-2 = 0.5rem, gap-6 = 1.5rem */
}
@theme inline {
  --spacing-inset-button: var(--space-inset-button);
  --spacing-card: var(--space-gap-card);   /* gap-card, p-card */
}`,
        caption: "Illustrative. Utilities either follow the base multiplier or expose named roles; named roles keep components tied to decisions rather than numbers.",
      },
    ],
  },

  exercises: [
    {
      id: "spacing-scales-ex-audit",
      kind: "assignment",
      level: "beginner",
      title: "Measure a screen",
      prompt: [
        "Measure every gap and padding on one screen of an app. List the distinct values and group the ones that differ by 1–2 px. Propose a scale of six to eight steps that covers them.",
      ],
      deliverable: "A table of measured values mapped to your proposed steps.",
      criteria: ["All gaps measured", "Near-duplicates merged", "Groups larger than within-group gaps"],
    },
    {
      id: "spacing-scales-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix a cramped card",
      prompt: [
        "Illustrative case. A library app's loan card has 12 px corners and a 12 px-radius button inside, 8 px from the card edge. Its icon buttons are 18 × 18 px, 4 px apart. With browser text spacing increased, the due date is clipped.",
        "Work through the correction sequence.",
      ],
      deliverable: "Corrected spacing, radius and target values with the reasoning.",
      criteria: ["Radius derived from padding", "Target-size criterion applied", "Text-spacing failure fixed", "Values on the scale"],
      exampleSolution: [
        "1. Symptoms: corners look pinched; icon buttons easy to miss; clipped text with spacing overrides.",
        "2. Impact: misplaced taps; lost information for people who adjust text spacing.",
        "3. Causes: equal radii on nested elements; targets below 24 px with little spacing; fixed card height.",
        "4. Requirements: targets 24 × 24 px or adequately spaced [WCAG 2.2 SC 2.5.8, AA]; content survives text-spacing overrides [SC 1.4.12, AA].",
        "5. Correction: inner radius 12 − 8 = 4 px; icon buttons enlarged to 24 px with 8 px gaps; remove the fixed height and use space-stack tokens.",
        "6. Validation: measure targets; apply a text-spacing bookmarklet or test stylesheet; check at 200% zoom.",
        "7. Trade-off: the card grows slightly taller; acceptable, and more robust.",
      ],
    },
    {
      id: "spacing-scales-ex-density",
      kind: "reflection",
      level: "advanced",
      title: "Design density modes",
      prompt: [
        "Propose comfortable and compact densities for a data-heavy admin tool: which semantic spacing roles change, which never do (such as minimum target size), and how designers and developers switch modes.",
      ],
      deliverable: "A role table for both modes and the rules for adding new roles.",
      criteria: ["Roles not raw values", "Accessibility floors kept", "Mechanism shared with themes"],
    },
  ],

  quiz: [
    {
      id: "spacing-scales-q-why",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Why use a small set of spacing values instead of any value that looks right?",
      options: [
        { text: "So that gaps signal grouping consistently and decisions are faster", correct: true, explanation: "A limited scale makes proximity deliberate." },
        { text: "Because browsers only support multiples of 8", correct: false, explanation: "Browsers support any value." },
        { text: "To make pages load faster", correct: false, explanation: "Spacing values do not affect load time meaningfully." },
        { text: "Because WCAG requires an 8-point grid", correct: false, explanation: "WCAG has no spacing-scale requirement." },
      ],
      explanation: "Spacing scales make grouping deliberate and consistent.",
    },
    {
      id: "spacing-scales-q-radius",
      kind: "scenario",
      level: "intermediate",
      prompt: "A card has a 16 px corner radius and 8 px padding around a button. What button radius keeps the corners concentric?",
      options: [
        { text: "8 px (16 − 8)", correct: true, explanation: "R_inner = R_outer − padding." },
        { text: "16 px", correct: false, explanation: "Equal radii make the gap look pinched at the corners." },
        { text: "24 px", correct: false, explanation: "Larger than the container's; the button would look bloated." },
        { text: "0 px", correct: false, explanation: "Square corners inside a rounded card clash." },
      ],
      explanation: "Concentric corners share a centre.",
    },
    {
      id: "spacing-scales-q-wcag",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "Icon buttons are 20 × 20 px with 2 px between them. What does WCAG 2.2 SC 2.5.8 require?",
      options: [
        { text: "Make them at least 24 × 24 px, or space them so 24 px circles centred on each do not overlap", correct: true, explanation: "That is the minimum target size or its spacing exception." },
        { text: "Make them 44 × 44 px", correct: false, explanation: "44 × 44 px is the enhanced AAA criterion (2.5.5)." },
        { text: "Nothing; icons are exempt", correct: false, explanation: "Icon buttons are targets." },
        { text: "Add a tooltip", correct: false, explanation: "A tooltip does not change target size." },
      ],
      explanation: "Target size is a spacing decision.",
    },
  ],

  flashcards: [
    { id: "spacing-scales-fc-define", front: "Spacing scale", back: "A limited, named set of distances from a base unit that every gap, padding and margin uses." },
    { id: "spacing-scales-fc-radius", front: "Concentric radius rule", back: "R_outer = R_inner + padding." },
    { id: "spacing-scales-fc-split", front: "Two kinds of spacing", back: "Component-internal (padding; usually fixed) and layout (gaps between components; may adapt to screen size)." },
    { id: "spacing-scales-fc-wcag", front: "WCAG 2.2 criteria that touch spacing", back: "2.5.8 Target Size (Minimum, AA, 24 px), 2.5.5 Target Size (Enhanced, AAA, 44 px), 1.4.12 Text Spacing (AA)." },
  ],

  references: [
    { source: "carbon-spacing", role: "primary", note: "2–160 px tokens on multiples of 2, 4 and 8; not responsive." },
    { source: "atlassian-spacing", role: "primary", note: "8 px base with small steps; ranges by use." },
    { source: "uswds-spacing-units", role: "explanatory", note: "Multiples of 8 px with a 4 px half-step." },
    { source: "govuk-spacing", role: "explanatory", note: "Responsive and static spacing scales." },
    { source: "atlassian-typography", role: "explanatory", note: "rem units for user resizing." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.12, 2.5.8 (AA) and 2.5.5 (AAA)." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Spacing scales are documented practice in major systems, built on the well-established perceptual effect of proximity. The choice of base and steps is a trade-off without experimental comparison. Target size and text spacing are WCAG 2.2 success criteria.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
