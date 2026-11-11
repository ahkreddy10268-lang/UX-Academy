import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "typography-scales",
  slug: "typography-scales",
  title: "Typography Scales",
  alternateNames: ["Type scale (system)", "Type ramp", "Text styles", "Typography tokens"],
  summary:
    "The named set of text styles a design system publishes — size, line height, weight and letter spacing per role — so that every screen draws its hierarchy from the same few decisions.",
  definition:
    "A typography scale in a design system is a **small set of named text styles** (for example display, headline, title, body, label), each fixing **size, line height, weight and letter spacing**, published as tokens and used by every component. The sizes may come from a ratio ([[modular-type-scale]]) or be tuned by hand; what makes it a *system* is that styles are named by role, paired with line heights, adapted per platform or breakpoint, and allow users to enlarge text.",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "scales",
  tags: ["typography", "type scale", "type ramp", "text styles", "line height", "rem", "dynamic type", "fluid type", "clamp"],
  difficulty: "intermediate",
  disciplines: ["Visual design", "Design systems", "Front-end engineering"],
  learningObjectives: [
    "Explain the difference between a modular scale (a ratio) and a system type scale (named roles).",
    "Specify a text style completely: size, line height, weight, letter spacing and semantic use.",
    "Adapt a type scale across breakpoints and platforms without breaking hierarchy.",
    "Keep type accessible: resizing, text spacing and heading structure.",
  ],
  prerequisites: ["modular-type-scale", "visual-hierarchy", "primitive-tokens"],

  levels: {
    beginner: {
      explanation: [
        "A library app shows a book title, its author, a short description and a 'Due in 3 days' label. If each screen picks its own sizes — 19 px here, 21 px there — the app looks inconsistent and it is harder to tell what matters most.",
        "A **typography scale** gives the product a short list of text styles with names that describe their job: *headline* for page titles, *title* for card headings, *body* for reading, *label* for small interface text. Each style fixes the size, the line height (space between lines) and the weight. Everyone uses the names, not raw numbers.",
        "The sizes often come from a ratio, which the [[modular-type-scale]] entry explains. This entry is about turning sizes into a working system of named styles.",
      ],
      analogy:
        "Paragraph styles in a word processor: you choose 'Heading 2' rather than setting 18 pt bold each time, and changing the style updates every heading.",
      everydayExamples: [
        "The same page-title style on every screen of an app.",
        "Body text that stays the same size in every article.",
        "Small labels on buttons and tabs that all match.",
      ],
      vocabulary: [
        { term: "Type scale", meaning: "The set of text styles a product uses." },
        { term: "Text style", meaning: "A named combination of size, line height, weight and letter spacing, such as 'body' or 'title'." },
        { term: "Line height", meaning: "The vertical distance from one line of text to the next." },
        { term: "Role", meaning: "What a style is for (headline, body, label), as opposed to how big it is." },
        { term: "rem", meaning: "A CSS unit relative to the root font size, so text follows the user's browser setting." },
      ],
    },
    intermediate: {
      explanation: [
        "System type scales are organised by **role**. Material Design 3 defines one scale of 15 baseline styles (Display, Headline, Title, Body and Label, each Large, Medium and Small) plus 15 emphasized variants, each with its own token, and notes that no single product uses every style {{src:m3-type-scale}}. Atlassian's headings run from 32 px down to 12 px with body text at 16, 14 and 12 px, and it uses rem so text responds to users' size settings {{src:atlassian-typography}}.",
        "A style is more than a size. **Line height** must be set with it: GOV.UK keeps line heights in multiples of 5 px so text lines up with its spacing {{src:govuk-type-scale}}. Large display sizes need relatively tighter line height and often slightly negative letter spacing; small labels need looser spacing to stay legible.",
        "Scales also **adapt**. GOV.UK uses smaller sizes on small screens {{src:govuk-type-scale}}; Fluent 2 publishes separate ramps for web, Windows, macOS, iOS and Android with each platform's typeface {{src:fluent-2-typography}}; Apple's text styles support Dynamic Type, with 17 pt as the iOS default and 11 pt as the minimum {{src:apple-hig-typography}}. The role names stay the same; the values change.",
        "Ratio matters less than it appears. At a 16 px base, a 1.2 ratio gives 19.2, 23.04 and 27.65 px for the next steps; a 1.333 ratio gives 21.33, 28.43 and 37.9 px. A wide ratio produces dramatic headings but leaves few usable sizes for dense interfaces, which is why product systems often hand-tune their steps.",
      ],
      howItWorks: [
        "Named roles separate meaning from value: components ask for `title-medium`, and the scale decides what that is at each breakpoint, platform or density.",
        "Pairing size with line height in one token prevents the most common drift — correct size, wrong leading — and keeps vertical rhythm aligned with spacing.",
      ],
      implementation: [
        "Define roles first (display, headline, title, body, label), then sizes; keep the number of styles small.",
        "Publish each style as a composite token: font family, size, line height, weight, letter spacing.",
        "Use rem for size so text follows the user's default; never block zoom.",
        "Text must resize to 200% without loss of content or function [WCAG 2.2 SC 1.4.4 Resize Text, AA] {{src:w3c-wcag-22}}; with `clamp()`, keep the maximum a relative unit at least twice the minimum {{src:mdn-clamp}}.",
        "Let user text-spacing overrides work: line height 1.5×, paragraph spacing 2×, letter spacing 0.12×, word spacing 0.16× [SC 1.4.12, AA] {{src:w3c-wcag-22}}.",
        "Map visual styles to semantic headings separately: a style is not a heading level. Atlassian advises one h1 per page and no skipped levels {{src:atlassian-typography}}.",
      ],
      scenarios: [
        "**Illustrative.** A library app has 14 font sizes in use. Mapping them to nine roles shows that three 'sizes' were the same role with different line heights; the fix is one style with one line height.",
        "**Illustrative.** A designer styles a sidebar heading with the `headline-large` style and marks it up as `h1`, giving the page two h1 elements. The team separates the visual style from the heading level.",
        "**Critique protocol.** For each piece of text: which role is it? Is it on the scale? Is the line height from the style? Does it survive 200% zoom and text-spacing overrides? Is the heading level semantic, not visual?",
      ],
    },
    advanced: {
      explanation: [
        "**Composite tokens.** The DTCG format defines a typography composite type (font family, size, weight, letter spacing, line height) {{src:dtcg-format-2025}}. Systems often split it into primitives (`font.size.400`) and role tokens (`text.title.medium`) so breakpoints and platforms remap roles without touching components.",
        "**Fluid type.** `clamp(min, preferred, max)` lets a heading grow with the viewport between bounds. The risk is zoom: viewport units do not grow when users zoom text, so MDN advises keeping the maximum a relative unit at least twice the minimum so text can still reach 200% {{src:mdn-clamp}}. Body text is usually kept fixed in rem; fluid sizes suit display and headline roles.",
        "**Platform scaling.** On iOS, Dynamic Type scales text styles by user preference {{src:apple-hig-typography}}; a web scale in rem does the same with the browser's default size. Layouts must grow with text: fixed heights and truncation are the usual failures.",
        "**Measuring the scale.** Useful checks: the number of raw font sizes in code that bypass tokens, line-length (characters per line) at each breakpoint, and visual regression at 200% zoom. Type scales are also a performance decision: each weight of a web font is a download.",
      ],
      evidence: [
        "Type scales are **documented practice**: Material 3, Atlassian, GOV.UK, Fluent 2 and Apple publish their scales and reasons {{src:m3-type-scale}} {{src:atlassian-typography}} {{src:govuk-type-scale}} {{src:fluent-2-typography}} {{src:apple-hig-typography}}. Typographic convention on proportion and leading is long-standing craft knowledge {{src:bringhurst-2012}}. No controlled study was found showing that one ratio gives better comprehension; legibility research concerns size, spacing and line length, not ratios. Resize and text-spacing requirements are WCAG 2.2 success criteria {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Ratio or hand-tuned?** A ratio is easy to explain and extend; hand-tuned steps fit real interface needs. Many systems start from a ratio and adjust.",
        "**Fluid or stepped?** Fluid type avoids jumps between breakpoints but is harder to test and can interfere with zoom; stepped scales are predictable.",
        "**One scale or one per platform?** Fluent 2 chooses per platform {{src:fluent-2-typography}}; a single cross-platform scale is simpler but fights native conventions.",
      ],
      alternativeModels: [
        "**Modular scale only** — sizes from a ratio without role names; simple, but components then depend on numbers.",
        "**Semantic-only styles** — roles defined without a numeric system; flexible, but drift creeps in as roles multiply.",
      ],
    },
  },

  application: {
    summary: ["A type scale is used by every component that shows text; it sets hierarchy, density and much of a product's voice."],
    web: ["Publish composite styles as CSS custom properties and classes; size in rem; reserve `clamp()` for display roles."],
    mobile: ["Map roles to platform text styles (Dynamic Type on iOS, scalable sp on Android); test the largest sizes."],
    enterprise: ["Dense tools need more small styles (label, caption) and fewer display styles; document which roles may appear in tables."],
    services: ["Print and email templates reuse role names with print-appropriate values."],
    steps: [
      "Inventory text sizes and line heights in use.",
      "Define roles and the number of steps each needs.",
      "Choose sizes (ratio as a starting point) and pair each with line height, weight and tracking.",
      "Publish composite tokens; set breakpoint and platform remappings.",
      "Test 200% zoom, text-spacing overrides and heading structure.",
    ],
  },

  whenToUse: [
    "Any product with repeated text roles across screens or teams.",
    "Before building components, since nearly every component shows text.",
  ],
  whenNotToUse: [
    "As a substitute for semantic heading structure: a visual style does not set the heading level.",
    "As a reason to block optical adjustments in display type, such as tightening letter spacing for one large brand heading.",
  ],
  advantages: [
    "Consistent hierarchy across screens.",
    "One place to adapt text for breakpoints, platforms and user preferences.",
    "Designers and developers share named styles rather than numbers.",
  ],
  limitations: [
    "Choosing sizes and ratios remains a judgement with no experimental best answer.",
    "Too many styles reintroduce inconsistency; too few force misuse.",
    "Fluid sizes are harder to test and can conflict with zoom.",
  ],
  misconceptions: [
    {
      myth: "A modular scale is a type system.",
      reality:
        "A ratio produces sizes. A system adds roles, line heights, weights, platform and breakpoint values, and accessibility rules — see [[modular-type-scale]] for the ratio itself.",
    },
    {
      myth: "If text looks like a heading, it is one.",
      reality:
        "Heading level is semantic markup for assistive technology; the visual style is separate. Atlassian advises one h1 and no skipped levels {{src:atlassian-typography}}.",
    },
  ],

  relations: [
    { target: "modular-type-scale", type: "derived-from", note: "Sizes are often generated from a ratio." },
    { target: "visual-hierarchy", type: "applied-in", note: "The type scale is the main tool for hierarchy." },
    { target: "primitive-tokens", type: "applied-in", note: "Sizes, weights and line heights are primitives." },
    { target: "semantic-tokens", type: "applied-in", note: "Role styles such as text.title.medium are semantic." },
    { target: "spacing-scales", type: "complementary-to", note: "Line heights and spacing together set vertical rhythm." },
    { target: "responsive-systems", type: "related-to", note: "Type steps adapt at breakpoints or fluidly." },
  ],

  practice: {
    dos: [
      { text: "Name text styles by role (headline, title, body, label) and pair each size with its line height, weight and letter spacing.", why: "Roles let breakpoints and platforms change values without changing components {{src:m3-type-scale}}.", kind: "system" },
      { text: "Size text in rem and test at 200% zoom.", why: "Text must resize to 200% without loss of content or function [WCAG 2.2 SC 1.4.4, AA] {{src:w3c-wcag-22}}; rem follows the user's setting {{src:atlassian-typography}}.", kind: "standard" },
      { text: "Keep fluid headings within bounds whose maximum is at least twice the minimum, in relative units.", why: "Viewport units alone do not grow with zoom {{src:mdn-clamp}}.", kind: "platform" },
    ],
    donts: [
      { text: "Don't choose a heading level to get a visual size.", why: "Heading levels are structure for assistive technology; skipping levels confuses navigation {{src:atlassian-typography}}.", kind: "standard" },
      { text: "Don't fix line heights or container heights in px so tightly that text-spacing overrides clip text.", why: "Content must survive increased line, letter, word and paragraph spacing [WCAG 2.2 SC 1.4.12, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't add a new size for one screen.", why: "Each one-off size weakens the hierarchy the scale exists to protect.", kind: "system" },
    ],
    examples: [
      {
        title: "Role-based text styles with a fluid display role",
        language: "css",
        code: `:root {
  /* primitives (rem; 1rem = 16px default) */
  --font-size-100: 0.75rem;   /* 12px */
  --font-size-200: 0.875rem;  /* 14px */
  --font-size-300: 1rem;      /* 16px */
  --font-size-500: 1.25rem;   /* 20px */
  --font-size-700: 1.75rem;   /* 28px */

  /* roles: size / line height / weight */
  --text-body:     400 var(--font-size-300) / 1.5 var(--font-sans);
  --text-label:    500 var(--font-size-200) / 1.43 var(--font-sans);
  --text-title:    600 var(--font-size-500) / 1.4 var(--font-sans);
  --text-headline: 600 var(--font-size-700) / 1.25 var(--font-sans);
  /* display: fluid, max (3rem) is twice min (1.5rem) so zoom can still reach 200% */
  --text-display:  600 clamp(1.5rem, 1.1rem + 1.6vw, 3rem) / 1.15 var(--font-sans);
}
.title    { font: var(--text-title); }
h1.page   { font: var(--text-headline); }   /* level from structure, style from role */`,
        caption: "Illustrative. Components use roles via the font shorthand; heading levels stay semantic.",
      },
      {
        title: "Tailwind CSS v4: role utilities with paired line height",
        language: "css",
        code: `@theme {
  --text-body: 1rem;
  --text-body--line-height: 1.5;
  --text-title: 1.25rem;
  --text-title--line-height: 1.4;
  --text-title--font-weight: 600;
}
/* <h2 class="text-title"> sets size, line height and weight together */`,
        caption: "Illustrative. Tailwind v4 lets a text size carry its own line height and weight, matching a composite style.",
      },
    ],
  },

  exercises: [
    {
      id: "typography-scales-ex-inventory",
      kind: "assignment",
      level: "beginner",
      title: "Name the roles",
      prompt: ["Take three screens of an app. List every text size, line height and weight. Group them into five roles at most and give each a name."],
      deliverable: "A role table with one value set per role.",
      criteria: ["Every text item assigned", "Roles named by purpose", "Line height included"],
    },
    {
      id: "typography-scales-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix a broken heading system",
      prompt: [
        "Illustrative case. A library app's page title is an h3 styled at 32 px because h1 'looked too big'; book descriptions use a 15 px size found nowhere else, with a fixed 18 px line height. At 200% zoom the card titles are cut off with an ellipsis.",
        "Work through the correction sequence.",
      ],
      deliverable: "Corrected structure, styles and tests.",
      criteria: ["Heading level from structure", "Off-scale size removed", "Resize and spacing criteria applied"],
      exampleSolution: [
        "1. Symptoms: wrong heading level; an off-scale size; truncated titles at zoom.",
        "2. Impact: screen-reader users get a misleading outline; low-vision users lose titles.",
        "3. Causes: heading level chosen for size; fixed line height; single-line truncation.",
        "4. Requirements: text resizes to 200% without loss [WCAG 2.2 SC 1.4.4, AA]; text-spacing overrides work [SC 1.4.12, AA]; headings convey structure [SC 1.3.1, A].",
        "5. Correction: h1 with the headline style; descriptions on body (16 px, line height 1.5, unitless); titles wrap to two lines before truncating, with the full title available.",
        "6. Validation: heading outline check; 200% zoom; text-spacing stylesheet.",
        "7. Trade-off: cards grow taller at large sizes; layout must allow it.",
      ],
    },
    {
      id: "typography-scales-ex-platform",
      kind: "reflection",
      level: "advanced",
      title: "One scale, three platforms",
      prompt: ["Map one set of roles to web (rem), iOS (Dynamic Type styles) and Android. Which roles keep their values, which change, and how will you test the largest accessibility sizes?"],
      deliverable: "A role-to-platform table and a test plan.",
      criteria: ["Roles stable", "Platform conventions respected", "Largest sizes tested"],
    },
  ],

  quiz: [
    {
      id: "typography-scales-q-role",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Why name text styles by role (title, body) rather than by size (20 px, 16 px)?",
      options: [
        { text: "Values can change per breakpoint or platform while components keep using the same names", correct: true, explanation: "Roles separate meaning from value." },
        { text: "Browsers cannot read pixel values", correct: false, explanation: "They can." },
        { text: "Role names make text load faster", correct: false, explanation: "Naming has no performance effect." },
        { text: "WCAG requires role names", correct: false, explanation: "WCAG has no naming rule." },
      ],
      explanation: "Role names keep the system adaptable.",
    },
    {
      id: "typography-scales-q-clamp",
      kind: "scenario",
      level: "intermediate",
      prompt: "A heading uses font-size: clamp(1rem, 4vw, 1.25rem). What is the accessibility risk?",
      options: [
        { text: "The maximum is less than twice the minimum, so zoom may not enlarge the text to 200%", correct: true, explanation: "MDN advises a relative maximum of at least twice the minimum (WCAG 1.4.4)." },
        { text: "clamp() is not supported", correct: false, explanation: "It is widely supported." },
        { text: "Headings cannot use rem", correct: false, explanation: "They can and should." },
        { text: "There is no risk", correct: false, explanation: "The narrow bounds limit resizing." },
      ],
      explanation: "Fluid type must still allow resizing.",
    },
    {
      id: "typography-scales-q-ratio",
      kind: "formula",
      level: "advanced",
      prompt: "At a 16 px base, which ratio leaves more usable steps between 16 px and 32 px for a dense interface: 1.2 or 1.333?",
      options: [
        { text: "1.2 (19.2, 23.04, 27.65 px) — three steps before 32 px", correct: true, explanation: "1.333 gives only 21.33 and 28.43 px." },
        { text: "1.333 — larger ratios give more steps", correct: false, explanation: "Larger ratios give fewer steps in a range." },
        { text: "They give the same number", correct: false, explanation: "They do not." },
        { text: "Ratios do not affect the number of steps", correct: false, explanation: "The ratio sets the spacing between steps." },
      ],
      explanation: "Smaller ratios suit dense product interfaces.",
    },
  ],

  flashcards: [
    { id: "typography-scales-fc-define", front: "Typography scale (system)", back: "A small set of named text styles by role, each fixing size, line height, weight and letter spacing." },
    { id: "typography-scales-fc-vs", front: "Modular scale vs type system", back: "A modular scale produces sizes from a ratio; a type system adds roles, line heights, platform values and accessibility rules." },
    { id: "typography-scales-fc-clamp", front: "Fluid type and zoom", back: "With clamp(), keep the maximum a relative unit at least twice the minimum so text can reach 200% (WCAG 1.4.4)." },
    { id: "typography-scales-fc-wcag", front: "WCAG 2.2 criteria for type scales", back: "1.4.4 Resize Text (AA), 1.4.12 Text Spacing (AA), 1.3.1 Info and Relationships (A) for heading structure." },
  ],

  references: [
    { source: "m3-type-scale", role: "primary", note: "15 baseline + 15 emphasized role styles, each a token." },
    { source: "atlassian-typography", role: "primary", note: "Heading and body sizes; rem for resizing; heading structure." },
    { source: "govuk-type-scale", role: "explanatory", note: "Line heights in multiples of 5 px; smaller sizes on small screens." },
    { source: "fluent-2-typography", role: "explanatory", note: "Per-platform ramps." },
    { source: "apple-hig-typography", role: "explanatory", note: "Dynamic Type; iOS default and minimum sizes." },
    { source: "mdn-clamp", role: "explanatory", note: "clamp() and its zoom guidance." },
    { source: "dtcg-format-2025", role: "explanatory", note: "Typography composite token type." },
    { source: "bringhurst-2012", role: "further", note: "Typographic proportion and leading." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.3.1, 1.4.4, 1.4.12." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Documented design-system practice built on long-standing typographic craft. No experimental evidence favours one ratio; legibility research concerns size, spacing and line length. Resize, text spacing and heading structure are WCAG 2.2 success criteria.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
