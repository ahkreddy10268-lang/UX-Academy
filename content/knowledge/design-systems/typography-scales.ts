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
    "Choose fixed, modular, stepped-responsive and fluid ramps for the roles that benefit from each.",
    "Use variable-font axes and script-aware font fallback without assuming one family or spacing rule fits every language.",
    "Design editorial and dashboard typography that preserves hierarchy at narrow widths and enlarged text settings.",
  ],
  prerequisites: ["modular-type-scale", "visual-hierarchy", "primitive-tokens"],

  levels: {
    beginner: {
      explanation: [
        "A library app shows a book title, its author, a short description and a 'Due in 3 days' label. If each screen picks its own sizes — 19 px here, 21 px there — the app looks inconsistent and it is harder to tell what matters most.",
        "A **typography scale** gives the product a short list of text styles with names that describe their job: *headline* for page titles, *title* for card headings, *body* for reading, *label* for small interface text. Each style fixes the size, the line height (space between lines) and the weight. Everyone uses the names, not raw numbers.",
        "The sizes often come from a ratio, which the [[modular-type-scale]] entry explains. This entry is about turning sizes into a working system of named styles.",
        "There are three related construction choices. A **fixed or stepped scale** assigns discrete values to roles; the values can stay constant or switch at named breakpoints. A **modular scale** generates a sequence from a ratio, giving a consistent proportional relationship but not, by itself, naming the roles. A **fluid scale** interpolates between bounds as the available space changes. A real system can combine them: use a ratio as a starting point, tune semantic roles by hand, and make only selected display roles fluid.",
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
        "Scales also **adapt**. GOV.UK changes selected type sizes at small breakpoints {{src:govuk-type-scale}}; Fluent 2 documents separate ramps for web, Windows, macOS, iOS and Android {{src:fluent-2-typography}}. Apple publishes platform-specific default and minimum sizes rather than one cross-platform value. Dynamic Type is available on iOS, iPadOS, tvOS, visionOS and watchOS, but not macOS; custom fonts need equivalent scaling behaviour {{src:apple-hig-typography}}. Keep semantic roles stable where useful, but allow values, font families and line metrics to follow the platform.",
        "Ratio matters less than it appears. At a 16 px base, a 1.2 ratio gives 19.2, 23.04 and 27.65 px for the next steps; a 1.333 ratio gives 21.33, 28.43 and 37.9 px. A wide ratio produces dramatic headings but leaves few usable sizes for dense interfaces, which is why product systems often hand-tune their steps.",
        "**Variable fonts** can hold multiple design variations in one font file. Common registered axes include weight (wght), width (wdth), slant (slnt), italic (ital) and optical size (opsz), but a particular font may expose only some of them. Prefer the corresponding CSS properties — font-weight, font-stretch, font-style and font-optical-sizing — for registered axes; reserve the lower-level font-variation-settings property for custom axes or cases those properties cannot express {{src:mdn-variable-fonts}}. Optical sizing can adjust details for small text versus display text when the font includes an opsz axis {{src:mdn-variable-fonts}}.

        "**One script is not every script.** A family that covers Latin may not contain the glyphs or shaping behaviour needed for Devanagari, Telugu, Arabic, Thai or CJK text. Audit glyph coverage and shaping, provide suitable licensed fallback families, and mark the language and direction of each text run. Allow line boxes and components to grow for taller marks and translated strings; do not apply Latin tracking or fixed line breaks blindly. W3C's 2026 Internationalization Group Note describes script-specific line breaking (including CJK, Thai, Tibetan and Indic examples) and warns that text boxes and line heights must accommodate translation and taller characters. It is informative guidance, not a normative typography standard {{src:w3c-international-specs}}.

        "**Reading measure is a separate decision from font size.** Editorial pages need a deliberate line length for sustained reading; a relative width such as ch can be a useful starting point, but it measures the width of the current font's zero glyph, not a guaranteed count of average characters. The ic unit measures an ideographic glyph and can be more useful as a starting point for CJK text. Inspect real copy in each script and font {{src:mdn-css-length-units}}. A dashboard has different needs: compact labels and numeric columns may be appropriate, but data labels must remain legible and must not be mistaken for body text. WCAG 2.2 SC 1.4.8 (AAA) describes a user-adjustable presentation that includes a maximum of 80 characters or glyphs per line (40 for CJK); it requires a mechanism for users to reach those presentation settings, not that every page hard-code one universal line length {{src:w3c-wcag-148}}.",
      ],
      howItWorks: [
        "Named roles separate meaning from value: components ask for `title-medium`, and the scale decides what that is at each breakpoint, platform or density.",
        "Pairing size with line height in one token prevents the most common drift — correct size, wrong leading — and keeps vertical rhythm aligned with spacing.",
        "Separate the **type role** from the **reading context**. An editorial article can use a larger body role, generous leading and a bounded measure; a staff dashboard can use denser supporting roles and tabular numerals. Both should share the same semantic vocabulary and remain reflowable when text grows.",
      ],
      implementation: [
        "Define roles first (display, headline, title, body, label), then sizes; keep the number of styles small.",
        "Publish each style as a composite token: font family, size, line height, weight, letter spacing.",
        "Use rem for size so text follows the user's default; never block zoom.",
        "Text must resize to 200% without loss of content or function [WCAG 2.2 SC 1.4.4 Resize Text, AA] {{src:w3c-wcag-22}}; with `clamp()`, keep the maximum a relative unit at least twice the minimum {{src:mdn-clamp}}.",
        "Let user text-spacing overrides work: line height 1.5×, paragraph spacing 2×, letter spacing 0.12×, word spacing 0.16× [SC 1.4.12, AA] {{src:w3c-wcag-22}}.",
        "Map visual styles to semantic headings separately: a style is not a heading level. Atlassian advises one h1 per page and no skipped levels {{src:atlassian-typography}}.",
        "Use a responsive measure as well as a responsive size. Constrain long-form text with a font-relative measure and let the block become narrower on small screens; use container or breakpoint changes only when the reading context actually changes.",
        "Use variable-font registered axes through their standard CSS properties where supported. Confirm the chosen font's declared axis ranges before using intermediate weights or widths; a variable-font file does not guarantee every axis exists {{src:mdn-variable-fonts}}.",
        "For multilingual content, test actual strings in every supported script and direction. Let line-height accommodate combining marks and taller glyphs; let translated strings wrap and expand; keep script-appropriate font fallbacks and do not impose Latin letter-spacing rules globally {{src:w3c-international-specs}}.",
        "On Android, use sp for both text size and line height. Android 14 supports nonlinear font scaling up to 200%; use dp for layout geometry and test at the maximum user font setting in portrait and landscape {{src:android-font-scaling-200}}. On Apple platforms, use system text styles or implement equivalent Dynamic Type scaling for custom fonts {{src:apple-hig-typography}}.",
      ],
      scenarios: [
        "**Illustrative.** A library app has 14 font sizes in use. Mapping them to nine roles shows that three 'sizes' were the same role with different line heights; the fix is one style with one line height.",
        "**Illustrative.** A designer styles a sidebar heading with the `headline-large` style and marks it up as `h1`, giving the page two h1 elements. The team separates the visual style from the heading level.",
        "**Critique protocol.** For each piece of text: which role is it? Is it on the scale? Is the line height from the style? Does it survive 200% zoom and text-spacing overrides? Is the heading level semantic, not visual?",
        "**Critique protocol.** For each piece of text: which role is it? Is it on the scale? Is the line height from the style? Does the line measure fit the reading context? Does the actual locale copy wrap without clipped marks or forced breaks? Does it survive 200% zoom and text-spacing overrides? Is the heading level semantic, not visual?",
      ],
    },
    advanced: {
      explanation: [
        "**Composite tokens.** The DTCG format defines a typography composite type (font family, size, weight, letter spacing, line height) {{src:dtcg-format-2025}}. Systems often split it into primitives (`font.size.400`) and role tokens (`text.title.medium`) so breakpoints and platforms remap roles without touching components.",
        "**Fluid type.** `clamp(min, preferred, max)` lets a heading grow with the viewport between bounds. The risk is zoom: viewport units do not grow when users zoom text, so MDN advises keeping the maximum a relative unit at least twice the minimum so text can still reach 200% {{src:mdn-clamp}}. Body text is usually kept fixed in rem; fluid sizes suit display and headline roles.",
        "**Platform scaling.** On iOS, Dynamic Type scales text styles by user preference {{src:apple-hig-typography}}; a web scale in rem does the same with the browser's default size. Layouts must grow with text: fixed heights and truncation are the usual failures.",
        "**Measuring the scale.** Useful checks: the number of raw font sizes in code that bypass tokens, line-length (characters per line) at each breakpoint, and visual regression at 200% zoom. Type scales are also a performance decision: each weight of a web font is a download.",
        "**Variable-font strategy.** Define the supported axis range in the font-face declaration, then expose only the roles the product needs. A weight axis can replace several static weights, while optical sizing can improve small text when the font supports it. Do not assume one variable file is a complete multilingual font; test script coverage, fallback metrics and loading cost {{src:mdn-variable-fonts}}.

        "**Locale-aware typography.** A font fallback chain is part of the type system, not an afterthought. For every supported locale, check glyph coverage, combining marks, diacritics, shaping, punctuation, direction, line-breaking and text expansion. Use language and direction metadata on the content. Avoid fixed line-height and height constraints that clip marks or translated phrases {{src:w3c-international-specs}}.

        "**Editorial versus dashboard.** A publication or book-detail page should optimise for continuous reading: a stable body role, generous unitless leading and a line measure tested with real paragraphs. A data dashboard should distinguish hierarchy from density: headings, table body, labels and numeric values get explicit roles; tabular figures can align columns, but compact presentation must not make information unreadable. Use the same role contract with context-specific mappings rather than inventing unrelated sizes for every screen.

        "**Accessibility is a layout test.** WCAG 2.2 SC 1.4.4 (AA) requires text resize to 200% without loss of content or function; SC 1.4.12 (AA) tests increased line, paragraph, letter and word spacing. SC 1.4.8 (AAA) is a separate user-adjustable visual-presentation criterion and includes line-width guidance of 80 characters or glyphs (40 CJK). Do not misstate the AAA line-width guidance as an AA requirement or a mandatory default for every language {{src:w3c-wcag-22}} {{src:w3c-wcag-148}}.",
      ],
      evidence: [
        "Type scales are **documented practice**: Material 3, Atlassian, GOV.UK, Fluent 2 and Apple publish their scales and reasons {{src:m3-type-scale}} {{src:atlassian-typography}} {{src:govuk-type-scale}} {{src:fluent-2-typography}} {{src:apple-hig-typography}}. Typographic convention on proportion and leading is long-standing craft knowledge {{src:bringhurst-2012}}. No controlled study was found showing that one ratio gives better comprehension; legibility research concerns size, spacing and line length, not ratios. Resize and text-spacing requirements are WCAG 2.2 success criteria {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Ratio or hand-tuned?** A ratio is easy to explain and extend; hand-tuned steps fit real interface needs. Many systems start from a ratio and adjust.",
        "**Fluid or stepped?** Fluid type avoids jumps between breakpoints but is harder to test and can interfere with zoom; stepped scales are predictable.",
        "**Variable or static fonts?** Variable fonts can reduce the need to ship separate files for every weight or width and can provide optical sizing, but only for axes and scripts the file actually contains. Static families can be simpler to subset, license and art-direct.",
        "**One measure for every script?** No. Latin character counts, CJK glyph widths and the wrapping behaviour of Thai or Indic text differ. Treat character counts as an approximation and inspect rendered lines in actual locale content {{src:w3c-international-specs}} {{src:mdn-css-length-units}}.",
        "**One scale or one per platform?** Fluent 2 chooses per platform {{src:fluent-2-typography}}; a single cross-platform scale is simpler but fights native conventions.",
      ],
      alternativeModels: [
        "**Modular scale only** — sizes from a ratio without role names; simple, but components then depend on numbers.",
        "**Semantic-only styles** — roles defined without a numeric system; flexible, but drift creeps in as roles multiply.",
        "**Context-mapped roles** — one semantic vocabulary with different mappings for editorial reading, dense data views and platform-native text. This preserves meaning while allowing line height, measure and size to fit the task.",
      ],
    },
  },

  application: {
    summary: ["A type scale is used by every component that shows text; it sets hierarchy, density and much of a product's voice."],
    web: ["Publish composite styles as CSS custom properties and classes; size in rem; reserve `clamp()` for display roles."],
    mobile: ["Map roles to platform text styles (Dynamic Type on iOS, scalable sp on Android); test the largest sizes."],
    mobile: ["Map roles to native text styles. Dynamic Type is available on iOS, iPadOS, tvOS, visionOS and watchOS; on Android use sp for text and line height, dp for layout. Test the maximum accessibility size rather than assuming the default scale."],
    enterprise: ["Dense tools need more small styles (label, caption) and fewer display styles; document which roles may appear in tables."],
    enterprise: ["Dense tools need explicit table-body, numeric and label roles, but must preserve legibility at the user's largest text setting. Keep long-form reading areas separate from dense data regions."],
    services: ["Print and email templates reuse role names with print-appropriate values."],
    steps: [
      "Inventory text sizes and line heights in use.",
      "Define roles and the number of steps each needs.",
      "Choose sizes (ratio as a starting point) and pair each with line height, weight and tracking.",
      "Publish composite tokens; set breakpoint and platform remappings.",
      "Test 200% zoom, text-spacing overrides and heading structure.",
    "Test 200% browser zoom and text-spacing overrides; separately test Android's maximum 200% nonlinear font scale and Apple Dynamic Type sizes where available.",
    "Review editorial measures with real paragraph text; review dashboard rows, numeric alignment, truncation and narrow-container behaviour.",
    "Repeat the review with translated strings and the supported scripts, checking font coverage, line height, shaping, direction and natural wrapping.",
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
      { text: "Use the CSS properties for registered variable-font axes and keep a tested fallback family for each supported script.", why: "Registered axes map to font-weight, font-stretch, font-style and font-optical-sizing; a font may not contain every axis or every script {{src:mdn-variable-fonts}} {{src:w3c-international-specs}}.", kind: "industry" },
      { text: "Use a font-relative reading measure and test actual text in each language.", why: "ch and ic are based on particular glyph advances, not fixed character counts; WCAG 2.2 SC 1.4.8 describes user-adjustable line-width settings at AAA {{src:mdn-css-length-units}} {{src:w3c-wcag-148}}.", kind: "system" },
      { text: "Use sp for Android text size and line height; leave padding and layout dimensions in dp.", why: "Android 14 supports nonlinear font scaling up to 200%, so text and layout dimensions must not be treated as the same unit {{src:android-font-scaling-200}}.", kind: "platform" },
    ],
    donts: [
      { text: "Don't choose a heading level to get a visual size.", why: "Heading levels are structure for assistive technology; skipping levels confuses navigation {{src:atlassian-typography}}.", kind: "standard" },
      { text: "Don't fix line heights or container heights in px so tightly that text-spacing overrides clip text.", why: "Content must survive increased line, letter, word and paragraph spacing [WCAG 2.2 SC 1.4.12, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't add a new size for one screen.", why: "Each one-off size weakens the hierarchy the scale exists to protect.", kind: "system" },
      { text: "Don't apply Latin tracking, line breaks or a single fallback font to every script.", why: "Scripts have different shaping, line-breaking and vertical metric needs; test real locale copy {{src:w3c-international-specs}}.", kind: "standard" },
      { text: "Don't set every role to fluid viewport sizing or fix its container height.", why: "Fluid scaling does not replace user text enlargement; fixed boxes can clip translated or enlarged text {{src:mdn-clamp}} {{src:w3c-wcag-22}}.", kind: "system" },
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
        caption: "Illustrative. Tailwind v4 lets a text size carry its own line height and weight, matching a composite style.",
      },
      {
        title: "Same library service: editorial reading and staff dashboard",
        language: "css",
        code: String.raw`/* A variable font may expose these ranges; check the actual file. */
@font-face {
  font-family: "Academy Sans VF";
  src: url("/fonts/academy-sans-variable.woff2") format("woff2");
  font-weight: 300 900;
  font-stretch: 85% 125%;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-ui: "Academy Sans VF", "Noto Sans", sans-serif;
  --text-editorial-body: 400 1.0625rem / 1.65 var(--font-ui);
  --text-dashboard-body: 400 0.875rem / 1.45 var(--font-ui);
  --text-dashboard-label: 500 0.75rem / 1.35 var(--font-ui);
  --text-display-size: clamp(2rem, 1.25rem + 3vw, 4rem);
}

/* POOR: one fluid rule for every context, fixed line boxes */
.bad-type h1,
.bad-type p,
.bad-type td,
.bad-type .label {
  font-size: clamp(0.7rem, 2vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
}
.bad-type .card-title {
  height: 2.2rem;
  overflow: hidden;
}

/* BETTER: semantic roles, context mappings and content-sized boxes */
.editorial-title {
  font-size: var(--text-display-size);
  font-weight: 650;
  line-height: 1.1;
  font-optical-sizing: auto;
}
.editorial-copy {
  font: var(--text-editorial-body);
  max-inline-size: 68ch;
}
.staff-dashboard {
  font: var(--text-dashboard-body);
}
.staff-dashboard .field-label {
  font: var(--text-dashboard-label);
  letter-spacing: normal;
}
.staff-dashboard .numeric {
  font-variant-numeric: tabular-nums;
}
.staff-dashboard .book-title {
  min-block-size: min-content;
  overflow-wrap: anywhere;
}

/* Use a measured family chain for each script; names are illustrative. */
:lang(hi) {
  font-family: "Noto Sans Devanagari", var(--font-ui);
}
:lang(te) {
  font-family: "Noto Sans Telugu", var(--font-ui);
}
:lang(ar) {
  font-family: "Noto Sans Arabic", var(--font-ui);
}

/* The page reflows; the article measure remains relative to its font. */
@media (max-width: 40rem) {
  .editorial-copy {
    max-inline-size: 100%;
  }
}`,
        caption: "Same public-library task, two content contexts. The poor version makes every role fluid, applies Latin tracking everywhere and clips card titles. The improved version keeps semantic roles, gives editorial copy a relative reading measure, gives the dashboard denser but separate text roles, uses tabular numerals for data, and provides script-specific fallback examples. Replace the illustrative font files with licensed families whose glyph coverage and shaping have been checked. Test with actual translations, 200% browser zoom, Android's maximum font scale and Apple Dynamic Type where available.",
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
    {
      id: "typography-scales-ex-editorial-dashboard",
      kind: "assignment",
      level: "intermediate",
      title: "Build editorial and dashboard typography",
      prompt: [
        "Use one public-library product brief to design two contexts: a long-form book/article page for readers and a staff dashboard for searching, sorting and updating catalogue records.",
        "Define a shared semantic role vocabulary, then map it to both contexts. Include display, page title, body, supporting text, label, table body and numeric roles. Choose which roles are fixed, modular, stepped at a breakpoint or fluid, and justify each choice.",
        "Specify family, size, line height, weight and tracking. If using a variable font, document the axes it actually supports and use the standard CSS properties for registered axes. Give Hindi, Telugu, Arabic or another required locale a tested font fallback and layout strategy.",
        "Test the editorial measure and dashboard density at 320, 390, 768 and 1440 CSS px; repeat at 200% browser zoom and with WCAG text-spacing overrides. On Android test the maximum 200% font scale in portrait and landscape; on Apple platforms test the available Dynamic Type sizes.",
      ],
      deliverable: "A role/token table, editorial and dashboard CSS mappings, a locale/fallback table, and a responsive/enlarged-text test record.",
      criteria: ["One semantic role vocabulary", "Editorial measure fits real paragraphs", "Dashboard remains readable and reflows", "Variable-font axes verified", "Locale fallback and line metrics tested", "200% text enlargement does not remove content or function"],
    },
    {
      id: "typography-scales-ex-multiscript",
      kind: "reflection",
      level: "advanced",
      title: "Review a multilingual type system",
      prompt: [
        "Audit a product that renders Latin, Devanagari, Arabic and CJK text. Identify where font coverage, line height, shaping, direction, line breaking, punctuation, tracking or translation expansion could fail.",
        "Separate normative web requirements from platform guidance and the W3C Internationalization Group Note. Decide which font families, variable axes and responsive measures should be shared and which require script-specific treatment.",
      ],
      deliverable: "A risk-ranked locale matrix, a font coverage decision and an evidence-labelled typography QA checklist.",
      criteria: ["Script-specific risks identified", "Sources classified correctly", "No universal Latin-only assumptions", "Exceptions documented with test evidence"],
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
    {
      id: "typography-scales-q-variable",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "A variable font exposes the registered weight and optical-size axes. Which CSS approach should be preferred for those axes?",
      options: [
        { text: "Use font-weight and font-optical-sizing where supported", correct: true, explanation: "MDN maps registered axes to standard CSS properties; font-variation-settings is mainly for custom axes or unsupported controls." },
        { text: "Always use font-variation-settings for every axis", correct: false, explanation: "Standard properties are preferred for registered axes." },
        { text: "Use letter-spacing to simulate weight and optical size", correct: false, explanation: "Tracking does not change the font's weight or optical design." },
        { text: "Use a separate font file for every possible weight", correct: false, explanation: "A variable font can interpolate supported axes within one file." },
      ],
      explanation: "Check the font's actual axis ranges; not every variable font exposes every axis.",
    },
    {
      id: "typography-scales-q-localisation",
      kind: "scenario",
      level: "advanced",
      prompt: "An English article fits, but a translated Hindi version clips vowel marks and the Arabic version wraps in the wrong direction. What should be reviewed first?",
      options: [
        { text: "Font coverage and shaping, language/direction metadata, line metrics and natural wrapping", correct: true, explanation: "These are script and locale requirements, not simply a scale-ratio issue." },
        { text: "Reduce every font size by 2 px", correct: false, explanation: "Smaller type does not repair missing glyphs, direction or shaping." },
        { text: "Add manual line breaks to each translation", correct: false, explanation: "Manual breaks are brittle and can fail as content changes." },
        { text: "Increase letter spacing for every script", correct: false, explanation: "A global Latin tracking rule can harm other scripts." },
      ],
      explanation: "The correct font, shaping, direction and line-breaking behaviour must be tested with real localized text.",
    },
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
    { id: "typography-scales-fc-variable", front: "Variable-font registered axes", back: "Weight maps to font-weight, width to font-stretch, slant/italic to font-style and optical size to font-optical-sizing. Check which axes the font actually exposes." },
    { id: "typography-scales-fc-multiscript", front: "Multilingual typography checks", back: "Verify glyph coverage, shaping, language/direction, line height, line breaking, punctuation and text expansion in real localized strings." },
    { id: "typography-scales-fc-measure", front: "ch and ic reading measures", back: "ch measures the advance of the zero glyph; ic measures the CJK water ideograph. They are font-relative starting points, not guaranteed character counts." },
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
    { source: "mdn-variable-fonts", role: "explanatory", note: "Variable-font axes and standard CSS properties." },
    { source: "w3c-international-specs", role: "explanatory", note: "2026 W3C Group Note: script-aware line breaking, line-height and translated text expansion; informative, not normative." },
    { source: "android-font-scaling-200", role: "primary", note: "Android 14 nonlinear text scaling to 200%; use sp for text and line height, dp for layout." },
    { source: "mdn-css-length-units", role: "explanatory", note: "ch and ic measure specific glyph advances; they are not character counts." },
    { source: "w3c-wcag-148", role: "explanatory", note: "Understanding SC 1.4.8, AAA; user-adjustable line width, leading, alignment and resize." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Typography scales, variable-font axes and platform text scaling are documented in official design-system and platform guidance. The W3C Internationalization Group Note is informative and explicitly early draft, not a normative standard. WCAG 2.2 SC 1.4.4 and 1.4.12 are AA requirements for applicable web content; SC 1.4.8 is a separate AAA user-adjustable visual-presentation criterion. No controlled evidence establishes one universally superior type ratio or one reading measure for every script and interface.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-24",
});
