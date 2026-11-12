import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "theme-architecture",
  slug: "theme-architecture",
  title: "Theme Architecture",
  alternateNames: ["Theming", "Theme system", "Dark mode architecture", "Modes"],
  summary:
    "The structure that lets one set of components appear in several themes — light, dark, high contrast, other brands — by keeping a fixed set of semantic roles and changing only what they resolve to.",
  definition:
    "Theme architecture is the way a design system separates **what an interface means** from **how it looks in a particular theme**. Components use semantic roles (`color.text.default`, `color.action.background`); a theme is one complete mapping of those roles to primitive values; switching theme swaps the mapping, never the components. It is not a second stylesheet written by hand, not colour inversion, and not limited to dark mode: brand, contrast and density are themes along other axes.",
  primaryType: "concept",
  secondaryTypes: ["pattern"],
  domain: "design-systems",
  subcategory: "foundations",
  tags: ["theming", "dark mode", "high contrast", "multi-brand", "design tokens", "CSS custom properties", "DTCG", "Tailwind", "SSR"],
  difficulty: "intermediate",
  disciplines: ["Design systems", "Front-end engineering", "Accessibility", "Visual design"],
  learningObjectives: [
    "Explain why themes must remap semantic roles rather than restyle components.",
    "Model several theme axes (mode, contrast, brand) and express them with the DTCG Resolver module.",
    "Prove contrast for every documented pair in every theme.",
    "Choose a delivery strategy — runtime custom properties or compile-time classes — and prevent the wrong theme from flashing on server-rendered pages.",
  ],
  prerequisites: ["semantic-tokens", "primitive-tokens"],

  levels: {
    beginner: {
      explanation: [
        "A library app adds dark mode the quick way: someone copies the stylesheet and changes the colours. Six months later a new 'Reserve' button looks fine in light mode and is invisible in dark, because nobody remembered to add it to the second stylesheet. Every new component now has to be designed twice.",
        "Theme architecture avoids this with layers. **Primitives** are the palette (every grey, blue and red that exists). **Semantic roles** say what a colour is for ('text', 'surface', 'action', 'danger'). A **theme** connects the two: in light, 'text' is near-black; in dark, it is near-white. **Components** only ever ask for roles, so they look right in every theme without knowing which one is active.",
        "The same idea covers more than dark mode: a high-contrast theme, a second brand, a compact density. Each is a different mapping behind the same role names.",
      ],
      analogy:
        "Stage lighting. The actors and the set stay the same for every performance; the lighting designer can switch to a night plot or a storm plot without rebuilding the set. Components are the set; a theme is a lighting plot.",
      everydayExamples: [
        "Switching your phone to dark mode and every app that supports it following at once.",
        "A bank's app with the same screens for its main brand and its budget brand, in different colours.",
        "An operating system's high-contrast setting making borders and text stronger everywhere.",
      ],
      vocabulary: [
        { term: "Theme", meaning: "One complete mapping of semantic roles to values, such as light or dark." },
        { term: "Semantic role", meaning: "A token named for its purpose, such as color.text.default." },
        { term: "Primitive", meaning: "A named value in the palette, such as grey.900." },
        { term: "Theme axis", meaning: "An independent way themes vary: mode, contrast, brand, density." },
        { term: "Flash of the wrong theme", meaning: "A page briefly shown in one theme before switching to the one the person chose." },
      ],
    },
    intermediate: {
      explanation: [
        "A theme architecture has three tiers — primitives, semantic roles, optional component tokens — and one or more **theme axes**. Mode (light, dark), contrast (standard, high) and brand are independent axes; a product with two modes, two contrast levels and two brands has eight combinations, so each axis should change as few roles as possible. The DTCG Resolver module models exactly this: each axis is a **modifier** with named **contexts**, combined with shared **sets** in a stated **resolution order**, where later entries override earlier ones {{src:dtcg-resolver-2025}}.",
        "Every theme must keep every documented **pair** accessible: text on its surfaces at least 4.5:1, control boundaries and focus indicators at least 3:1 [WCAG 2.2 SC 1.4.3 and 1.4.11, AA] {{src:w3c-wcag-22}}. A high-contrast theme commonly aims higher; the Design Token Lab's high-contrast preset targets 7:1 for text, the AAA level [SC 1.4.6]. Because pairs change when mappings change, contrast is checked per theme, not once.",
        "Systems differ in how many themes they ship, but the principle holds across them: Carbon keeps role names fixed across four themes and changes only values {{src:carbon-themes}}; Fluent 2 builds light, dark, high-contrast and branded themes on alias tokens {{src:fluent-2-design-tokens}}.",
      ],
      howItWorks: [
        "On the web, themes are usually delivered as CSS custom properties. Custom properties cascade and inherit from their parent {{src:mdn-custom-properties}}, so defining role variables under `:root` and overriding them under `[data-theme=\"dark\"]` re-themes everything below that element — including a single dark section inside a light page.",
        "The browser can follow the person's system setting through the `prefers-color-scheme` media feature {{src:mdn-prefers-color-scheme}}, and the `color-scheme` property tells it to draw scrollbars, form controls and other browser UI in the matching scheme {{src:mdn-color-scheme}}.",
      ],
      implementation: [
        "Make every component consume semantic or component tokens only; lint against primitives and raw values in component code.",
        "Define each theme as a complete mapping of every role, so no role silently falls back to another theme's value.",
        "Model independent axes (mode, contrast, brand) separately and limit how many roles each axis changes.",
        "Compute contrast for every documented pair in every theme and fail the build on a regression [WCAG 2.2 SC 1.4.3, 1.4.11, AA] {{src:w3c-wcag-22}}.",
        "Default to the system preference with `prefers-color-scheme`, store an explicit choice, and set `color-scheme` so browser UI matches {{src:mdn-prefers-color-scheme}} {{src:mdn-color-scheme}}.",
        "Never use the same colour as the only signal in one theme and a different one in another; meaning must survive every theme [WCAG 2.2 SC 1.4.1, A] {{src:w3c-wcag-22}}.",
      ],
      scenarios: [
        "**Illustrative.** A library app's dark mode was a copied stylesheet; new components keep missing from it. Moving components to role variables and defining dark as a mapping means new components work in both modes on the first day.",
        "**Illustrative.** A council licenses the library app with its own brand colours. A brand axis that changes only the action and accent roles, layered under the mode axis, gives four combinations to test instead of a forked product.",
        "**Illustrative.** People report a white flash when opening the app at night. The theme was applied by JavaScript after the page rendered; applying it before first paint removes the flash.",
      ],
    },
    advanced: {
      explanation: [
        "**Runtime custom properties or compile-time classes?** Runtime theming changes a few variables on one element and lets the cascade do the rest: themes can switch without reloading, be scoped to part of a page, and add no per-theme copies of component CSS. Compile-time approaches generate separate class names or utility variants per theme (for example dark-mode variants of every utility); they work without custom properties and make each state explicit in the markup, but multiply CSS and couple components to the list of themes. Most current systems use runtime variables for colour and keep compile-time variants for rare structural differences.",
        "**Avoiding the flash of the wrong theme on server-rendered pages.** The server does not know a stored client preference, so three approaches are common. (1) **CSS only**: follow `prefers-color-scheme`, with no stored choice — no flash, but no override {{src:mdn-prefers-color-scheme}}. (2) **Cookie**: store the choice in a cookie and render the right `data-theme` on the server — no flash, but every page becomes dependent on the request, which conflicts with static caching. (3) **Inline blocking script**: a tiny script in `<head>` reads the stored choice and sets the attribute before first paint. Because the server rendered `<html>` without that attribute, React reports a hydration mismatch on that one element; `suppressHydrationWarning` silences it, and React documents that it applies one level deep and is an escape hatch {{src:react-hydrateroot}}. UX Academy itself uses approach 3: an inline script in its root layout sets `data-theme` from local storage before paint.",
        "**Token pipelines.** Tokens are authored once and compiled to each platform. Style Dictionary has supported the DTCG format since version 4, though its documentation notes that the 2025.10 format is not yet fully supported {{src:style-dictionary-dtcg}}; Tokens Studio can store tokens in the W3C DTCG format from Figma {{src:tokens-studio-docs}}; Tailwind CSS v4 exposes variables as utilities through `@theme`, using `@theme inline` when theme variables reference other variables {{src:tailwind-theme}}. The pipeline should output role variables per theme, not one variable per primitive per theme.",
        "**Cost.** Each role is a custom property defined once per theme selector, so the CSS grows with roles × themes, not with components. A theme switch changes many variables at once and the browser must restyle every element that uses them; this is normally quick but should be measured on large pages rather than assumed. Telemetry worth keeping: the share of people choosing each theme, overrides of the system setting, and contrast-check failures caught in CI.",
      ],
      evidence: [
        "Theme architecture is **documented engineering and design-system practice**, not experimental research. Its mechanisms are specified by standards and documentation — CSS custom properties, media features and `color-scheme` {{src:mdn-custom-properties}} {{src:mdn-prefers-color-scheme}} {{src:mdn-color-scheme}}, the DTCG Resolver module (a Community Group report, not a W3C Standard) {{src:dtcg-resolver-2025}} — and practised by systems such as Carbon and Fluent {{src:carbon-themes}} {{src:fluent-2-design-tokens}}. No controlled study was found on the effect of a particular theme architecture on consistency or defects. What can be verified exactly is contrast: every pair in every theme against WCAG 2.2 {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Is dark mode just another theme?** Architecturally yes, but visually a dark theme needs its own decisions (elevation, saturation, which surfaces get lighter), not a mechanical inversion.",
        "**How many axes?** Each axis multiplies the combinations to test. Some teams cap themes deliberately; others generate them and test automatically.",
        "**Cookie or script?** Cookies avoid the hydration warning but make pages dynamic; scripts keep pages static but run before paint. The choice depends on caching and on how much of the page is personalised anyway.",
      ],
      alternativeModels: [
        "**Computed themes**: derive a palette from one or a few source colours with contrast constraints, instead of hand-mapping each theme.",
        "**Per-component theming** (each component carries its own light and dark values): workable for very small products, but every component must be updated for every new theme.",
      ],
    },
  },

  application: {
    summary: [
      "Theme architecture applies to any product with more than one mode, brand or contrast level — and to any that expects to gain one. It sits between the token layers and the components, and is tested by contrast checks in every theme.",
    ],
    web: [
      "Define role variables under `:root` and theme selectors; set `color-scheme`; apply the stored theme before first paint.",
      "Scope a theme to part of a page by setting the theme attribute on a container.",
    ],
    mobile: [
      "Map roles onto the platform's light and dark resources so apps follow the system setting; keep the same role names as web.",
    ],
    enterprise: [
      "White-label and multi-brand products add a brand axis that changes a small, fixed set of roles; components and behaviour stay shared.",
    ],
    services: [
      "Printed and on-screen service touchpoints can share role names, with print as a further theme.",
    ],
    steps: [
      "List the roles components need and the pairs they form.",
      "Define each theme as a complete mapping; separate independent axes.",
      "Check contrast for every pair in every theme in CI.",
      "Choose delivery: runtime variables (most cases) or compile-time variants.",
      "Prevent the wrong theme from flashing: CSS-only, cookie, or an inline script before paint.",
      "Compile tokens with a pipeline that outputs role variables per theme.",
    ],
  },

  whenToUse: [
    "Any product with dark mode, high contrast, several brands or densities — or one likely to need them.",
    "Design systems shared by several products.",
  ],
  whenNotToUse: [
    "A single-theme prototype: a handful of CSS variables is enough; introduce theme layers when a second theme becomes real.",
    "As a way to give different products different behaviour: themes change appearance; behavioural differences belong in components or configuration.",
  ],
  advantages: [
    "New components work in every theme without extra design work.",
    "Themes and brands are added as mappings, not forks.",
    "Contrast can be proved per pair per theme automatically.",
  ],
  limitations: [
    "Each theme axis multiplies the combinations to design and test.",
    "Server-rendered pages need deliberate handling to avoid showing the wrong theme first.",
    "Tooling support for the newest DTCG formats is still catching up.",
    "Good dark and high-contrast themes need design decisions, not just mappings that pass contrast.",
  ],
  misconceptions: [
    {
      myth: "Dark mode is a colour inversion of light mode.",
      reality:
        "Inversion breaks images, brand colours and contrast pairs. A dark theme is its own mapping of roles, checked pair by pair; in the illustrative palette, the light theme's danger red reads 6.57:1 on white but only 2.80:1 on near-black.",
    },
    {
      myth: "Theming means editing the palette for each theme.",
      reality:
        "Primitives should keep one value everywhere; themes change which primitive each semantic role points to. Editing a primitive for one theme changes every other use of it.",
    },
    {
      myth: "The DTCG Resolver module is a W3C Standard for theming.",
      reality:
        "It is a Final Community Group Report, not a W3C Standard {{src:dtcg-resolver-2025}}.",
    },
  ],

  relations: [
    { target: "semantic-tokens", type: "derived-from", note: "A theme is one complete mapping of semantic tokens to primitives." },
    { target: "primitive-tokens", type: "related-to", note: "Themes choose among the same primitives rather than changing them." },
    { target: "design-tokens", type: "derived-from", note: "Theme architecture is the token system applied to several modes and brands." },
    { target: "colour-contrast-ratio", type: "measured-by", note: "Every documented pair is checked with the contrast ratio in every theme." },
    { target: "multi-brand-systems", type: "applied-in", note: "Brands are a theme axis that changes a fixed set of roles." },
    { target: "wcag", type: "related-to", note: "WCAG 2.2 contrast and use-of-colour criteria must hold in every theme." },
  ],

  lab: "token-lab",

  practice: {
    dos: [
      { text: "Make every component consume semantic roles only, and define each theme as a complete mapping of those roles.", why: "Components then work in every theme without change; a theme cannot be half-applied.", kind: "industry" },
      { text: "Scope theme variables to an element with a theme attribute, and set `color-scheme` to match.", why: "Custom properties inherit, so one attribute re-themes a whole subtree; `color-scheme` keeps browser-drawn controls consistent {{src:mdn-custom-properties}} {{src:mdn-color-scheme}}.", kind: "platform" },
      { text: "Check contrast for every documented pair in every theme, automatically.", why: "Pairs change when mappings change; text needs 4.5:1 and non-text 3:1 in each theme [WCAG 2.2 SC 1.4.3, 1.4.11, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't name semantic tokens after hues (`--color-blue-500` used as 'primary').", why: "The name lies as soon as a theme or brand maps the role to another colour.", kind: "industry" },
      { text: "Don't build themes from hard-coded inverted hex values or CSS filters.", why: "Inversion distorts images and brand colours and does not guarantee contrast for any pair.", kind: "industry" },
      { text: "Don't apply the stored theme only after the page has hydrated.", why: "People see the wrong theme flash first; apply it with CSS, a cookie on the server, or an inline script before paint {{src:react-hydrateroot}}.", kind: "context" },
    ],
    examples: [
      {
        title: "tokens.resolver.json — mode and contrast as separate axes (DTCG 2025.10)",
        language: "json",
        code: `{
  "version": "2025.10",
  "name": "Library app themes",
  "sets": {
    "primitives": { "sources": [{ "$ref": "primitives.tokens.json" }] },
    "components": { "sources": [{ "$ref": "components.tokens.json" }] }
  },
  "modifiers": {
    "mode": {
      "contexts": {
        "light": [{ "$ref": "mode/light.tokens.json" }],
        "dark": [{ "$ref": "mode/dark.tokens.json" }]
      },
      "default": "light"
    },
    "contrast": {
      "contexts": {
        "standard": [{ "$ref": "contrast/standard.tokens.json" }],
        "high": [{ "$ref": "contrast/high.tokens.json" }]
      },
      "default": "standard"
    }
  },
  "resolutionOrder": [
    { "$ref": "#/sets/primitives" },
    { "$ref": "#/modifiers/mode" },
    { "$ref": "#/modifiers/contrast" },
    { "$ref": "#/sets/components" }
  ]
}`,
        caption:
          "Later entries in resolutionOrder override earlier ones, so the high-contrast context only needs the roles it changes {{src:dtcg-resolver-2025}}. File names are illustrative; the standard-contrast file can be empty of overrides.",
      },
      {
        title: "Next.js + Tailwind v4: role variables, utilities and no flash",
        language: "ts",
        code: `/* app/globals.css */
@import "tailwindcss";

:root, [data-theme="light"] {
  color-scheme: light;
  --surface-default: #ffffff;  --text-default: #1f1e1c;
  --action-background: #2457c5; --action-text: #ffffff;
}
[data-theme="dark"] {
  color-scheme: dark;
  --surface-default: #141413;  --text-default: #f6f6f4;
  --action-background: #5f92e8; --action-text: #141413;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) { color-scheme: dark; /* same values as [data-theme="dark"] */ }
}
@theme inline {               /* utilities: bg-surface, text-ink, bg-action, text-on-action */
  --color-surface: var(--surface-default);
  --color-ink: var(--text-default);
  --color-action: var(--action-background);
  --color-on-action: var(--action-text);
}

// app/layout.tsx — apply a stored choice before first paint
const themeScript = \`(function(){try{var t=localStorage.getItem("theme");
  if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()\`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>   {/* the script changes this one element */}
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="bg-surface text-ink">{children}</body>
    </html>
  );
}`,
        caption:
          "Illustrative and shortened. Components use bg-surface, text-ink and bg-action, never hex values. `@theme inline` is Tailwind v4's way to expose variables that reference other variables {{src:tailwind-theme}}; `suppressHydrationWarning` covers only the attribute the script sets {{src:react-hydrateroot}}. UX Academy's own root layout follows the same pattern.",
      },
    ],
  },

  exercises: [
    {
      id: "theme-architecture-ex-layers",
      kind: "assignment",
      level: "beginner",
      title: "Draw the layers",
      prompt: [
        "For one screen of an app with dark mode, list five colours you can see. For each, name the role it plays and the primitive it uses in light and in dark.",
      ],
      deliverable: "A table: element, role, light primitive, dark primitive.",
      criteria: ["Roles named by purpose", "Both themes mapped", "No hue names in roles"],
    },
    {
      id: "theme-architecture-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix a flashing, half-themed dark mode",
      prompt: [
        "Illustrative case. A library app's dark mode is a second stylesheet applied by JavaScript after the page loads. People see a white flash at night, the new 'Reserve' button is light grey on near-black in dark mode, and captions use #4f4e49 on #141413.",
        "Work through the correction sequence.",
      ],
      deliverable: "A corrected architecture: roles, mappings, contrast results and how the theme is applied before paint.",
      criteria: ["Cause found in the architecture", "Contrast recalculated per pair", "Flash prevention chosen and justified", "Trade-off named"],
      exampleSolution: [
        "1. Symptoms: white flash on load; a button and captions hard to see in dark mode.",
        "2. Impact: glare at night; low-vision readers cannot read captions or find the button.",
        "3. Causes: components hold colours, so new ones miss the dark stylesheet; the theme is applied after hydration.",
        "4. Requirements: text 4.5:1 and control boundaries 3:1 in each theme [WCAG 2.2 SC 1.4.3, 1.4.11, AA]; the captions measure 2.21:1.",
        "5. Correction: components use roles; dark maps text.subtle → grey.300 (11.00:1 on grey.950) and action.background → blue.400 (5.94:1); apply the stored theme with an inline script before paint and set color-scheme.",
        "6. Validation: run the pair checks for both themes in CI; reload with a stored dark preference and confirm no flash; try it in the Design Token Lab.",
        "7. Trade-off: the inline script needs suppressHydrationWarning on <html>; a cookie-based approach avoids that but makes pages dynamic.",
      ],
    },
    {
      id: "theme-architecture-ex-axes",
      kind: "reflection",
      level: "advanced",
      title: "Plan a multi-axis theme system",
      prompt: [
        "A product needs light and dark, standard and high contrast, and two brands. Design the axes, which roles each may change, the resolution order, the test matrix and the delivery strategy for a statically cached marketing site and a dynamic app.",
      ],
      deliverable: "A one-page architecture with a resolver outline and a test plan.",
      criteria: ["Axes independent and minimal", "Test matrix covers all combinations", "Delivery chosen per site with reasons", "Contrast targets stated per theme"],
    },
  ],

  quiz: [
    {
      id: "theme-architecture-q-layers",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In a well-built theme system, what changes when a person switches to dark mode?",
      options: [
        { text: "Which primitive each semantic role points to", correct: true, explanation: "A theme is a mapping; components and primitives stay the same." },
        { text: "Every component's CSS", correct: false, explanation: "That is the copied-stylesheet approach the architecture avoids." },
        { text: "The values of the primitives", correct: false, explanation: "Primitives keep one value; editing them changes every use." },
        { text: "Nothing; the browser inverts colours", correct: false, explanation: "Inversion breaks images and contrast." },
      ],
      explanation: "Themes remap roles to primitives.",
    },
    {
      id: "theme-architecture-q-contrast",
      kind: "scenario",
      level: "intermediate",
      prompt: "A danger red passes 4.5:1 on white. Can the dark theme reuse it on a near-black surface?",
      options: [
        { text: "Only after calculating that pair; in the illustrative palette it falls to 2.80:1, so dark needs a lighter red", correct: true, explanation: "Contrast belongs to pairs in each theme." },
        { text: "Yes; a colour that passes once passes everywhere", correct: false, explanation: "Contrast depends on the background." },
        { text: "Yes, if it is bold", correct: false, explanation: "Weight helps legibility but does not change the ratio requirement for normal text." },
        { text: "No; red cannot be used in dark themes", correct: false, explanation: "A lighter red can pass; it must be checked." },
      ],
      explanation: "Check every documented pair in every theme.",
    },
    {
      id: "theme-architecture-q-flash",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "A statically cached Next.js site stores the person's theme in localStorage. How can it avoid showing the wrong theme first?",
      options: [
        { text: "An inline script in <head> sets the theme attribute before paint, with suppressHydrationWarning on <html>", correct: true, explanation: "It runs before first paint and keeps pages static; the warning is silenced for that one element." },
        { text: "Set the theme in a useEffect after hydration", correct: false, explanation: "That runs after paint, so the wrong theme shows first." },
        { text: "Read localStorage on the server", correct: false, explanation: "The server cannot read the browser's local storage." },
        { text: "Disable server rendering for the whole app", correct: false, explanation: "That costs performance and is not needed." },
      ],
      explanation: "CSS only, cookie, or inline script before paint — choose by caching needs.",
    },
  ],

  flashcards: [
    { id: "theme-architecture-fc-define", front: "Theme (in token terms)", back: "One complete mapping of semantic roles to primitives; components never change between themes." },
    { id: "theme-architecture-fc-axes", front: "Common theme axes", back: "Mode (light/dark), contrast (standard/high), brand, density — modelled as DTCG resolver modifiers." },
    { id: "theme-architecture-fc-flash", front: "Three ways to avoid a theme flash on SSR", back: "CSS-only prefers-color-scheme · cookie read on the server · inline script before paint (+ suppressHydrationWarning)." },
    { id: "theme-architecture-fc-runtime", front: "Runtime variables vs compile-time classes", back: "Runtime: switch and scope without reload, CSS grows with roles × themes. Compile-time: explicit per-theme classes, more CSS, components tied to the theme list." },
  ],

  references: [
    { source: "dtcg-resolver-2025", role: "primary", note: "Sets, modifiers, contexts and resolution order." },
    { source: "dtcg-format-2025", role: "primary", note: "Token format and references." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.1 (A), 1.4.3, 1.4.11 (AA), 1.4.6 (AAA)." },
    { source: "mdn-custom-properties", role: "explanatory", note: "Custom properties cascade and inherit." },
    { source: "mdn-prefers-color-scheme", role: "explanatory", note: "Detecting the system light or dark preference." },
    { source: "mdn-color-scheme", role: "explanatory", note: "Browser UI follows the declared colour scheme." },
    { source: "react-hydrateroot", role: "explanatory", note: "suppressHydrationWarning: one level deep, an escape hatch." },
    { source: "style-dictionary-dtcg", role: "explanatory", note: "DTCG support since v4; 2025.10 support in progress." },
    { source: "tokens-studio-docs", role: "explanatory", note: "W3C DTCG token format option in Figma." },
    { source: "tailwind-theme", role: "explanatory", note: "Tailwind v4 @theme and @theme inline." },
    { source: "carbon-themes", role: "explanatory", note: "Role names fixed across four themes." },
    { source: "fluent-2-design-tokens", role: "explanatory", note: "Light, dark, high-contrast and branded themes on alias tokens." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Theme architecture is documented engineering and design-system practice built on web platform features and the DTCG Community Group reports (not W3C Standards). Its benefits are reported by practitioners rather than measured in controlled studies; contrast in each theme can be verified exactly against WCAG 2.2.",

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
