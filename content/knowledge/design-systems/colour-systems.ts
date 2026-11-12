import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "colour-systems",
  slug: "colour-systems",
  title: "Colour Systems",
  alternateNames: ["Color system", "Colour palette system", "Tonal palette", "Colour roles", "Colour tokens"],
  summary:
    "The structured way a design system organises colour: graded tonal ramps as raw material, roles that say what each colour is for, documented pairs that guarantee contrast, and themes that remap roles.",
  definition:
    "A colour system is the **structure that turns a palette into decisions**: (1) **tonal ramps** — each hue in graded steps from light to dark; (2) **roles** — semantic names such as `text.default`, `action.background` or `on-primary` that say what a colour is for; (3) **pairing rules** — which roles may sit on which, with contrast checked; and (4) **themes** — complete remappings of roles for light, dark or high-contrast. It is distinct from colour theory (harmony) and from the contrast formula itself ([[colour-contrast-ratio]]).",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "scales",
  tags: ["colour", "color", "palette", "tonal ramp", "colour roles", "contrast", "dark mode", "status colours", "oklch"],
  difficulty: "intermediate",
  disciplines: ["Visual design", "Design systems", "Accessibility", "Front-end engineering"],
  learningObjectives: [
    "Describe the four layers of a colour system: ramps, roles, pairs and themes.",
    "Use graded ramps to predict contrast and choose steps for each theme.",
    "Keep meaning independent of colour alone and status colours consistent.",
    "Specify colour tokens that survive theming and new brands.",
  ],
  prerequisites: ["colour-contrast-ratio", "primitive-tokens", "semantic-tokens"],

  levels: {
    beginner: {
      explanation: [
        "A library app uses blue for links, a slightly different blue for buttons, another for the selected tab, and red for both 'overdue' and the brand logo. Each choice looked fine alone; together, nobody can say what blue *means*, and an overdue warning looks like branding.",
        "A **colour system** fixes this in layers. First, each hue gets a **ramp** of graded steps from very light to very dark. Then colours get **roles** — 'text', 'surface', 'action', 'danger' — so a screen asks for 'danger text', not 'red 700'. Finally, the system lists which roles may sit on which, so text is always readable.",
        "Because of the roles, a dark theme is just another mapping: 'danger text' points to a lighter red on dark backgrounds, and no screen has to change.",
      ],
      analogy:
        "A paint store's colour cards (the ramps) and a house plan that says 'walls', 'trim', 'doors' (the roles). You can repaint the house by changing which card each role uses, without redrawing the plan.",
      everydayExamples: [
        "Every link in an app is the same blue.",
        "Errors are always red and always come with an icon and text.",
        "Switching to dark mode changes every screen consistently.",
      ],
      vocabulary: [
        { term: "Tonal ramp", meaning: "One hue in graded steps from light to dark (for example blue 100 to blue 900)." },
        { term: "Colour role", meaning: "A name for what a colour is for, such as text, surface or action." },
        { term: "Pair", meaning: "A foreground role and the background role it sits on; contrast belongs to the pair." },
        { term: "Theme", meaning: "A complete mapping of roles to colours, such as light or dark." },
        { term: "Status colour", meaning: "A colour reserved for a meaning such as error, warning or success." },
      ],
    },
    intermediate: {
      explanation: [
        "**Ramps make contrast predictable.** USWDS grades colours from 0 to 100 so that a grade difference of 50 or more gives WCAG AA contrast and 70 or more gives AAA — its 'magic numbers' {{src:uswds-color}}. Even without that guarantee, ordered steps let designers reason: in this course's library palette, blue 600 on white is 6.47:1, but the same blue on near-black is only 2.85:1, so the dark theme needs blue 400 (5.94:1).",
        "**Roles carry meaning.** Material Design 3 defines 26 standard roles in groups such as primary, secondary, error and surface, with 'on' roles for content placed on a fill and 'container' roles for fills; roles are meant to be used in their intended pairs, and improper pairings can break contrast {{src:m3-color-roles}}. Atlassian names tokens by property, role, emphasis and state (`color.background.danger.bold.hovered`) and keeps decorative accent colours separate because they carry no meaning {{src:atlassian-color}}.",
        "**Themes remap roles.** Carbon's four themes (White, Gray 10, Gray 90, Gray 100) keep role names such as `$text-primary` and change only their values {{src:carbon-themes}}. This is [[theme-architecture]] applied to colour.",
        "**Meaning never by colour alone.** A red border on an invalid field must be joined by text or an icon, because colour alone fails people who cannot distinguish it [WCAG 2.2 SC 1.4.1 Use of Color, A] {{src:w3c-wcag-22}}.",
      ],
      howItWorks: [
        "The ramp is the primitive layer, roles are the semantic layer, and pairs are the contract between them: checking every documented pair against WCAG thresholds turns accessibility into a property of the system rather than of each screen.",
        "Reserving status hues for status, and accent hues for decoration, keeps colour meaningful: once red means 'error', it cannot also mean 'brand'.",
      ],
      implementation: [
        "Build ramps with even perceptual steps; generate them in a perceptual space such as OKLCH, then check them with the WCAG formula.",
        "Define roles by property and purpose (surface, text, border, action, status) and document their pairs.",
        "Check text pairs at 4.5:1 [SC 1.4.3 Contrast (Minimum), AA] and component boundaries, focus indicators and meaningful graphics at 3:1 [SC 1.4.11 Non-text Contrast, AA] {{src:w3c-wcag-22}}.",
        "Pair every status colour with text or an icon [SC 1.4.1, A].",
        "Express each theme as a full role mapping; respond to `prefers-color-scheme` {{src:mdn-prefers-color-scheme}} and keep a user override.",
        "Lint for raw colour values in components.",
      ],
      scenarios: [
        "**Illustrative.** The library app's 'overdue' badge and its brand red were the same token. Separating `status.danger` from `brand.accent` lets the brand evolve without weakening the warning.",
        "**Illustrative.** A dark theme was built by inverting the light palette. Blue 600 links on near-black fell to 2.85:1. Remapping the link role to blue 400 restores 5.94:1 without touching components.",
        "**Critique protocol.** For each colour on screen: which role is it? Is its pair documented and above threshold? Does it carry meaning, and if so, is that meaning also in text or shape? Does it work in every theme?",
      ],
    },
    advanced: {
      explanation: [
        "**Perceptual colour spaces.** sRGB hex steps are not perceptually even; OKLCH (lightness, chroma, hue) makes ramps with consistent lightness steps across hues easier to build. The DTCG colour module lists 14 colour spaces including `srgb`, `oklch` and `display-p3`, with an optional hex fallback {{src:dtcg-color-2025}}. Wide-gamut colours need sRGB fallbacks and contrast checks in the space that will actually be displayed.",
        "**Contrast models.** WCAG 2 contrast is the conformance measure today; it rates some mid-tone and dark-mode pairs inconsistently with perception, which motivated proposed perceptual alternatives such as APCA for a future WCAG 3 (see [[colour-contrast-ratio]]). A system can document both but must conform to the current one.",
        "**Multi-brand.** When brands share components, brand colour usually changes only a few roles (primary action, accent); status, text and surface roles stay shared, so accessibility checks carry over. A brand whose primary hue cannot reach 4.5:1 with white text needs a darker action step or dark text on its fill.",
        "**Operations.** Useful measures: raw colour values in code, pairs used in production that are not documented, contrast regressions in visual tests, and the share of status messages that rely on colour alone.",
      ],
      evidence: [
        "Colour systems are **documented practice**: Material 3, Carbon, Atlassian and USWDS publish ramps, roles and themes {{src:m3-color-roles}} {{src:carbon-themes}} {{src:atlassian-color}} {{src:uswds-color}}. The contrast thresholds and the colour-alone rule are WCAG 2.2 success criteria {{src:w3c-wcag-22}}. Colour-vision differences and contrast sensitivity are established perceptual research; the specific ramp structures and role names are design conventions without experimental comparison.",
      ],
      debates: [
        "**Generated or hand-tuned ramps?** Generated ramps are consistent and extensible; hand-tuned ramps look better for specific hues. Many teams generate then adjust.",
        "**How many roles?** Material 3's 26 roles {{src:m3-color-roles}} cover most needs but are a lot to learn; small teams may start with fewer and grow.",
        "**WCAG 2 or perceptual contrast?** WCAG 2 is the requirement; perceptual models may predict legibility better. Documenting both is common; claiming conformance by the newer model alone is not valid.",
      ],
      alternativeModels: [
        "**Flat palette** — a list of named colours with usage notes; quick, but meaning and contrast are left to each screen.",
        "**Algorithmic theming** — roles generated from one seed colour (as in dynamic colour); consistent, but brand control and edge cases need review.",
      ],
    },
  },

  application: {
    summary: ["Colour systems apply to every surface, text and control; they are the layer users notice first when themes or brands change."],
    web: ["Publish roles as CSS custom properties; switch themes by attribute or `prefers-color-scheme`; keep a hex fallback for wide-gamut values."],
    mobile: ["Map roles to platform dynamic colours; test light, dark and increased-contrast settings."],
    enterprise: ["Data visualisation needs its own categorical and sequential ramps, separate from status colours."],
    services: ["Printed materials need CMYK equivalents of brand roles; status meaning must survive greyscale print."],
    steps: [
      "Audit colours in use and the meanings they carry.",
      "Build tonal ramps per hue; check lightness steps.",
      "Define roles and their documented pairs.",
      "Map roles per theme and check every pair against WCAG.",
      "Separate status, brand and decorative colours.",
      "Publish tokens; lint for raw values; review new pairs.",
    ],
  },

  whenToUse: [
    "Any product with more than one theme, brand or team.",
    "Whenever colour carries meaning (status, selection, links).",
  ],
  whenNotToUse: [
    "As a replacement for content: a colour system cannot make a status understandable without words or icons.",
    "As a reason to add roles for every one-off need: new roles need a documented pair and a real use.",
  ],
  advantages: [
    "Contrast is checked once per pair instead of per screen.",
    "Themes and brands change by remapping roles.",
    "Colour keeps consistent meaning across the product.",
  ],
  limitations: [
    "Ramp quality depends on the colour space and tuning.",
    "WCAG 2 contrast does not fully match perception, especially in dark themes.",
    "Too many roles are hard to learn and apply correctly.",
  ],
  misconceptions: [
    {
      myth: "Dark mode is the light palette inverted.",
      reality:
        "Inverting keeps the same steps on a dark surface, which often fails contrast — blue 600 drops from 6.47:1 on white to 2.85:1 on near-black in this course's palette. Dark themes remap roles to different steps.",
    },
    {
      myth: "If a colour passes contrast, it can carry meaning by itself.",
      reality:
        "Contrast and colour-alone are separate requirements: meaning must also be in text, shape or position [WCAG 2.2 SC 1.4.1] {{src:w3c-wcag-22}}.",
    },
  ],

  relations: [
    { target: "colour-contrast-ratio", type: "measured-by", note: "Every documented pair is checked with the contrast ratio." },
    { target: "primitive-tokens", type: "applied-in", note: "Ramp steps are colour primitives." },
    { target: "semantic-tokens", type: "applied-in", note: "Roles are semantic tokens." },
    { target: "theme-architecture", type: "applied-in", note: "Themes remap colour roles." },
    { target: "design-language", type: "derived-from", note: "Brand colour choices come from the design language." },
    { target: "elevation-systems", type: "related-to", note: "Tonal surfaces express elevation in dark themes." },
  ],

  practice: {
    dos: [
      { text: "Separate ramps (raw colours) from roles (purpose) and document which roles pair.", why: "Roles are designed to be used in pairs; improper pairings break contrast {{src:m3-color-roles}}.", kind: "system" },
      { text: "Check text pairs at 4.5:1 and non-text pairs (borders, focus, icons) at 3:1 in every theme.", why: "WCAG 2.2 SC 1.4.3 and 1.4.11 (AA) {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Reserve status colours for status and keep decorative accents meaningless.", why: "Atlassian keeps accent colours out of places where colour has meaning {{src:atlassian-color}}.", kind: "industry" },
    ],
    donts: [
      { text: "Don't convey status by colour alone.", why: "People who cannot tell the colours apart miss the meaning [WCAG 2.2 SC 1.4.1, A] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't create a dark theme by inverting the light palette.", why: "The same steps on a dark surface often fail contrast; remap roles instead {{src:carbon-themes}}.", kind: "system" },
      { text: "Don't use raw hex values in components.", why: "Raw values bypass roles, so themes and audits miss them.", kind: "system" },
    ],
    examples: [
      {
        title: "Ramps, roles and two themes (values from this course's library palette)",
        language: "css",
        code: `:root {
  /* ramp (primitives) */
  --blue-400: #5f92e8;  --blue-600: #2457c5;
  --red-400:  #f07a6e;  --red-700:  #b42318;
  --grey-0: #ffffff;    --grey-900: #1f1e1c;  --grey-950: #141413;

  /* roles: light theme */
  --color-surface-default: var(--grey-0);
  --color-text-default:    var(--grey-900);
  --color-text-danger:     var(--red-700);   /* 6.57:1 on white */
  --color-action-bg:       var(--blue-600);  /* 6.47:1 with white text */
}
[data-theme="dark"] {
  --color-surface-default: var(--grey-950);
  --color-text-default:    var(--grey-0);
  --color-text-danger:     var(--red-400);   /* 6.77:1 on grey-950; red-700 would be 2.80:1 */
  --color-action-bg:       var(--blue-400);  /* 5.94:1 with grey-950 text */
}
.field-error { color: var(--color-text-danger); }  /* always with an icon and message text */`,
        caption: "Ratios computed with this course's contrast formula. Components use roles only.",
      },
      {
        title: "Tailwind CSS v4: roles as utilities",
        language: "css",
        code: `@theme inline {
  --color-surface: var(--color-surface-default);
  --color-ink:     var(--color-text-default);
  --color-danger:  var(--color-text-danger);
  --color-action:  var(--color-action-bg);
}
/* bg-surface, text-ink, text-danger, bg-action follow the active theme */`,
        caption: "Illustrative. `@theme inline` keeps the utilities pointing at the role variables, so they switch with the theme.",
      },
    ],
  },

  exercises: [
    {
      id: "colour-systems-ex-roles",
      kind: "assignment",
      level: "beginner",
      title: "Find the meanings",
      prompt: ["List every colour on two screens of an app and write what each one means. Mark any colour used for two different meanings."],
      deliverable: "A colour-to-meaning table with conflicts highlighted.",
      criteria: ["Every colour listed", "Meanings stated", "Conflicts found"],
    },
    {
      id: "colour-systems-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Repair a dark theme",
      prompt: [
        "Illustrative case. A library app's dark theme reuses the light theme's steps: blue 600 links and red 700 overdue labels on a #141413 surface. Overdue items show only a red label; the focus ring is blue 600.",
        "Work through the correction sequence.",
      ],
      deliverable: "Remapped roles with computed ratios and the non-colour cue.",
      criteria: ["Ratios computed, not guessed", "Text and non-text thresholds applied", "Colour-alone fixed"],
      exampleSolution: [
        "1. Symptoms: dim links, unreadable overdue labels, faint focus ring.",
        "2. Impact: low-vision users cannot read links or warnings; keyboard users lose focus.",
        "3. Causes: steps chosen for white surfaces; status by colour only.",
        "4. Requirements: text 4.5:1 [SC 1.4.3, AA]; focus and controls 3:1 [SC 1.4.11, AA]; not colour alone [SC 1.4.1, A].",
        "5. Correction: links and action to blue 400 (5.94:1); danger text to red 400 (6.77:1, from 2.80:1); focus ring to blue 300; add an 'Overdue' word and icon.",
        "6. Validation: check every documented pair with the formula; review in greyscale.",
        "7. Trade-off: the brand blue looks lighter in dark mode; document it as intended.",
      ],
    },
    {
      id: "colour-systems-ex-brand",
      kind: "reflection",
      level: "advanced",
      title: "Add a second brand",
      prompt: ["A partner brand with a light orange primary joins the system. Which roles change, which stay shared, and how do you keep the primary action at 4.5:1?"],
      deliverable: "A role table for both brands and the rule for brand-specific roles.",
      criteria: ["Shared roles identified", "Contrast solved", "Status roles untouched"],
    },
  ],

  quiz: [
    {
      id: "colour-systems-q-role",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What does a colour role such as 'text.danger' add that 'red.700' does not?",
      options: [
        { text: "It says what the colour is for, so themes can change the value", correct: true, explanation: "Roles carry purpose; values can change per theme." },
        { text: "It makes the colour brighter", correct: false, explanation: "Names do not change colour." },
        { text: "It is required by WCAG", correct: false, explanation: "WCAG does not require token names." },
        { text: "Nothing", correct: false, explanation: "Roles are the layer themes rely on." },
      ],
      explanation: "Roles separate purpose from value.",
    },
    {
      id: "colour-systems-q-dark",
      kind: "scenario",
      level: "intermediate",
      prompt: "Red 700 is 6.57:1 on white but 2.80:1 on the dark surface. What should the dark theme do?",
      options: [
        { text: "Remap text.danger to a lighter step that passes 4.5:1 on the dark surface", correct: true, explanation: "Themes remap roles to suitable steps." },
        { text: "Keep red 700; it passed in light mode", correct: false, explanation: "Contrast belongs to the pair in each theme." },
        { text: "Make the text bold instead", correct: false, explanation: "Bold does not change the ratio requirement for normal text." },
        { text: "Remove the colour", correct: false, explanation: "The role still needs a passing value." },
      ],
      explanation: "Each theme maps roles to steps that pass.",
    },
    {
      id: "colour-systems-q-uswds",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "USWDS grades colours 0–100. What does a grade difference of 50 or more guarantee?",
      options: [
        { text: "WCAG AA contrast between the two colours", correct: true, explanation: "50+ gives AA; 70+ gives AAA." },
        { text: "That the colours are colour-blind safe", correct: false, explanation: "Grades concern lightness contrast, not hue confusion." },
        { text: "A perceptually uniform ramp", correct: false, explanation: "Grades are built for contrast prediction." },
        { text: "Brand compliance", correct: false, explanation: "Unrelated." },
      ],
      explanation: "Graded ramps make contrast predictable.",
    },
  ],

  flashcards: [
    { id: "colour-systems-fc-layers", front: "Four layers of a colour system", back: "Tonal ramps, roles, documented pairs, themes." },
    { id: "colour-systems-fc-pair", front: "Where does contrast belong?", back: "To a pair: a foreground role on a background role, in each theme." },
    { id: "colour-systems-fc-uswds", front: "USWDS magic numbers", back: "A grade difference of 50+ gives AA contrast; 70+ gives AAA." },
    { id: "colour-systems-fc-wcag", front: "WCAG 2.2 criteria for colour systems", back: "1.4.1 Use of Color (A), 1.4.3 Contrast Minimum (AA, 4.5:1), 1.4.11 Non-text Contrast (AA, 3:1)." },
  ],

  references: [
    { source: "m3-color-roles", role: "primary", note: "Roles, on/container pairs." },
    { source: "carbon-themes", role: "primary", note: "Four themes with stable role names." },
    { source: "atlassian-color", role: "explanatory", note: "Token naming; accent colours carry no meaning." },
    { source: "uswds-color", role: "explanatory", note: "Grades and magic numbers." },
    { source: "dtcg-color-2025", role: "explanatory", note: "Colour spaces in tokens." },
    { source: "mdn-prefers-color-scheme", role: "explanatory", note: "Theme preference media feature." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.1, 1.4.3, 1.4.11." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Documented design-system practice; contrast thresholds and the colour-alone rule are WCAG 2.2 success criteria; perceptual basis in established colour-vision research. Ramp structures and role sets are conventions without experimental comparison.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
