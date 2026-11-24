import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "design-tokens",
  slug: "design-tokens",
  title: "Design Tokens",
  alternateNames: ["Tokens", "Design variables", "Style tokens"],
  summary:
    "Named, platform-agnostic records of design decisions — colours, sizes, spacing, type, motion — that are stored once and transformed for every platform and theme.",
  definition:
    "A design token is a **named value representing a design decision**, such as `color.text.primary = #1A1A1A` or `space.4 = 16px`. Tokens are stored in a technology-neutral format and transformed into platform code (CSS custom properties, iOS, Android, design-tool variables). Tokens may reference other tokens, producing layers — commonly **primitive**, **semantic** and **component** tokens — that make theming and change management systematic.",
  primaryType: "concept",
  secondaryTypes: ["technique", "pattern"],
  domain: "design-systems",
  subcategory: "foundations",
  tags: ["design systems", "theming", "variables", "dark mode", "multi-brand", "handoff", "DTCG"],
  difficulty: "intermediate",
  disciplines: ["Design systems", "Front-end engineering", "Visual design", "Design operations"],
  learningObjectives: [
    "Explain what design tokens are and the problem they solve.",
    "Distinguish primitive, semantic and component tokens, and design a naming scheme.",
    "Use token aliasing to implement themes (light/dark, brands, density).",
    "Describe the Design Tokens Community Group format and its actual standards status.",
    "Evaluate the costs of token systems: governance, over-abstraction and tooling.",
  ],
  prerequisites: ["design-language"],

  levels: {
    beginner: {
      explanation: [
        "Imagine your brand blue is written as `#2F6FDE` in two hundred places across a website, an iPhone app and an Android app. One day the brand changes. Someone has to find and update every single copy — and they will miss some.",
        "A **design token** gives that decision a name, like `color-brand-primary`, and stores its value in one place. Every product uses the name instead of the raw value. Change the value once, and every platform updates.",
        "Tokens can describe repeatable design decisions: colour, spacing, typography, shape, elevation and motion. They create a shared vocabulary, but a token is not simply the same thing as a variable in every tool. A token is the named design decision and its meaning; a variable is one way a particular tool or codebase stores and applies a value.",
      ],
      analogy:
        "Tokens are like the named swatches in a paint catalogue. A decorator orders 'Harbour Blue', not a chemical formula. If the manufacturer improves the formula, every order of 'Harbour Blue' gets the update.",
      everydayExamples: [
        "A website's dark mode that switches every colour at once.",
        "Figma variables and CSS custom properties that share the same names.",
        "A design system offering `space-2`, `space-4`, `space-8` instead of arbitrary pixel values.",
      ],
      vocabulary: [
        { term: "Token", meaning: "A name paired with a value representing a design decision." },
        { term: "Alias (reference)", meaning: "A token whose value points to another token, e.g. text.primary → grey.900." },
        { term: "Primitive token", meaning: "A raw option in the palette or scale, like blue.500 or space.4." },
        { term: "Semantic token", meaning: "A token named for its purpose, like color.text.danger or color.surface.raised." },
        { term: "Theme", meaning: "A set of values for the semantic tokens, e.g. light and dark." },
      ],
    },
    intermediate: {
      explanation: [
        "The power of tokens comes from **layers of indirection**. **Primitive** (or *global/core/reference*) tokens define the available options: the full colour palette, spacing scale and type sizes. **Semantic** (or *alias/system*) tokens map *purposes* to those options: `color.text.primary → grey.900`. **Component** tokens optionally scope decisions to one component: `button.primary.background → color.action.primary`.",
        "Components should consume **semantic or component tokens, never primitives**. Then a theme is simply a different mapping of semantic tokens to primitives: in dark mode `color.text.primary → grey.50`, and every component adapts without code changes. The same mechanism supports multiple brands, high-contrast modes and density settings.",
        "Naming is the hard part. Good names encode category, property, role and state in a predictable order (for example, color.background.button.primary.hover), are understandable by both designers and developers, and avoid describing the value (blue-button breaks when the button turns green). There is no single naming taxonomy mandated by DTCG: category-first, role-first and component-first approaches are design-system conventions that must be tested for clarity and scale.",
        "A token is the design decision; a variable is a tool-level representation. Figma variables can store reusable values and modes, and can be aliased to implement a token architecture, but Figma's variable model is not the DTCG file format. Its current documentation lists six variable types—color, number, string, boolean, timing and easing—and describes collections and modes for contexts such as light/dark, language and device size {{src:figma-learn}}. DTCG instead defines an interoperable JSON format, with its own token types, groups and references. A design system may map between the two, but the concepts are not interchangeable.",
      ],
      howItWorks: [
        "Tokens are authored in a source format (commonly JSON), validated, then **transformed** by build tools into platform outputs: CSS custom properties, Sass variables, Swift/Kotlin constants, and design-tool variables.",
        "The Design Tokens Community Group format represents each token as an object with a required `$value` and optional `$type`, `$description`, `$deprecated` and `$extensions`; aliases use curly-brace references such as `{color.grey.900}` {{src:dtcg-format-2025}}.",
        "Composite types (typography, shadow, border, transition, gradient) bundle several values—for example, a typography token may hold font family, size, weight, line height and letter spacing {{src:dtcg-format-2025}}.",
        "Treat delivery as a pipeline rather than a copy-and-paste handoff: author a source file; validate names, types, values and aliases; resolve the active theme/context; transform tokens for each platform; generate outputs; then test the outputs inside real components. A transform can change a token name, value or attributes for a target platform—for example, converting a shared dimension into the platform's expected unit {{src:style-dictionary-dtcg}}. The exact transforms and feature support depend on the tool and version; never assume every tool implements every part of the format.",
      ],
      implementation: [
        "Inventory existing values in code and design files; consolidate near-duplicates.",
        "Define primitives as scales (colour ramps, spacing and type scales).",
        "Define semantic tokens from real usage: text, surface, border, action, feedback (success/warning/danger/info), focus.",
        "Encode accessibility constraints: every text token paired with the surface tokens it may sit on must meet contrast requirements.",
      "Automate the pipeline: source → schema and alias validation → context resolution → platform transforms → generated outputs → integration tests. Version and document the outputs; keep source files and generated artifacts distinguishable.",
        "Document intent and usage for each semantic token; deprecate rather than delete.",
      ],
      scenarios: [
        "Illustrative scenario: a booking service adds dark mode, but its button and form components use palette primitives directly. First introduce purpose-named semantic tokens and migrate the components; then map those same semantic roles for the dark context and test every foreground/background pairing.",
        "A company with three brands sharing one component library — share semantic and component tokens, swap primitive mappings per brand.",
        "Designers and developers disagree on spacing — publish one spacing scale as tokens consumed by both Figma variables and CSS.",
      ],
    },
    advanced: {
      explanation: [
        "Tokens are best understood as an **architecture for design decisions**, not a file of variables. Each layer of aliasing trades flexibility for complexity: two layers (primitive → semantic) cover most needs; component tokens add precision for multi-brand or white-label systems but multiply the number of names to govern.",
        "Interoperability between tools has long been the weak point: each design tool and transformer used its own JSON dialect. The W3C **Design Tokens Community Group** addressed this with the *Design Tokens Format Module*. Its version 2025.10, published 28 October 2025, is a **Final Community Group Report** — the group's first stable version. It explicitly states that it is **not a W3C Standard nor on the W3C Standards Track**; Community Group reports are published under W3C's community process without the consensus and review of the Recommendation track {{src:dtcg-format-2025}}.",
        "The format specifies the media type application/design-tokens+json, file extensions .tokens and .tokens.json, simple types (color, dimension, fontFamily, fontWeight, duration, cubicBezier, number) and composite types. It also defines group inheritance and reference syntaxes including curly-brace aliases and JSON Pointer $ref {{src:dtcg-format-2025}}. The Color module represents a colour with a colour space and components, with an optional hex fallback {{src:dtcg-color-2025}}; the Resolver module models contexts such as light and dark through modifiers and an explicit resolution order {{src:dtcg-resolver-2025}}. The tier architecture is explored in [[primitive-tokens]] and [[semantic-tokens]].",
        "Important distinction: DTCG does not prescribe a primitive → semantic → component tier architecture. It specifies how tokens, groups, types, values and references are represented. Primitive, semantic and component tiers are an architectural convention used by some systems; others use two layers or different names. Teach the tiers as an option with a clear purpose, not a conformance requirement {{src:dtcg-format-2025}} {{src:material-3}}.",
      ],
      evidence: [
        "Evidence for design tokens is **practice-based**: adoption across major design systems (Material Design, Fluent, Carbon and others document token architectures) and the industry effort to standardise a format {{src:material-3}} {{src:fluent-2}} {{src:carbon-design-system}}. There is little controlled research on their effect on consistency or delivery speed; claims of specific efficiency gains are anecdotal.",
      ],
      debates: [
        "**How many layers?** Some teams adopt three or four tiers; others argue that component tokens create an explosion of names that few people use. Measure usage and prune.",
        "**Naming taxonomies.** Category-first (`color.text.primary`) vs component-first (`button.color.text`) naming affects discoverability and theming; there is no single standard.",
        "**Tokens vs variables and styles in tools.** Design tools increasingly support variables, aliases and modes natively. A team can author in a design tool, in code or in a dedicated token source. The decision is about source-of-truth ownership, validation, portability and release workflow—not about declaring one tool variable feature to be the token standard.",
        "**Interchange format vs platform-native output.** A shared source format improves exchange, but target platforms differ in units, colour capabilities, typography APIs and runtime theme behaviour. A valid interchange file does not guarantee identical rendering or complete support in every importer.",
      ],
      alternativeModels: [
        "**CSS custom properties alone** — simpler for web-only products, but without cross-platform transformation or a tool-neutral source.",
        "**Theme objects in code** (e.g. CSS-in-JS themes) — flexible but code-owned, which can exclude designers from the source of truth.",
      ],
    },
  },

  origin: {
    contributors: ["Jina Anne", "Jon Levine", "Salesforce design systems team", "Design Tokens Community Group"],
    period: "Mid-2010s at Salesforce; format standardisation 2019–2025",
    problem:
      "Large product suites across web and native platforms needed a way to keep visual decisions consistent and to change them at scale without hunting through every codebase.",
    narrative: [
      "The term 'design tokens' was coined at Salesforce by Jina Anne and Jon Levine; the Design Tokens Community Group credits them with the coinage {{src:dtcg-2026-thank-you-jina}}. The practice is associated with the Salesforce Lightning Design System.",
      "Tokens spread through design systems across the industry. Because tool vendors and open-source transformers used incompatible formats, the W3C Design Tokens Community Group formed to define a shared interchange format.",
      "The group published its first stable Final Community Group Report, the Design Tokens Format Module 2025.10, on 28 October 2025 {{src:dtcg-format-2025}}.",
    ],
    attributionNote:
      "The exact year of coinage at Salesforce is reported inconsistently in secondary sources (commonly 2014 or 2015) and was not confirmed from a primary source; it is therefore omitted.",
  },

  application: {
    summary: [
      "Tokens sit at the foundation of a design system: they feed the colour, type, spacing, elevation, radius and motion systems; components consume them; themes remap them. They are also the most concrete artefact of design–engineering handoff.",
    ],
    web: [
      "Compile semantic tokens to CSS custom properties scoped to `:root` and theme selectors (e.g. `[data-theme=dark]`).",
      "Use tokens for focus rings, motion durations and reduced-motion alternatives, not only colours.",
    ],
    mobile: [
      "Transform tokens into platform constants and assets (asset catalogues, Android resources) so native apps share decisions with web.",
      "Map type tokens to platform dynamic type styles to respect user settings.",
    ],
    enterprise: [
      "Multi-brand and white-label products swap primitive mappings per tenant while sharing component code.",
      "Density modes (compact/comfortable) can be expressed as alternative spacing token sets.",
    ],
    services: [
      "Use the same tokens for digital and print-facing outputs (PDF letters, kiosks) to keep service touchpoints consistent.",
    ],
    steps: [
      "Audit current values and usage.",
      "Define primitives (scales) and semantic roles; agree a naming convention.",
      "Choose a source format (e.g. the DTCG format) and a transformation tool.",
      "Migrate components to semantic tokens; add themes.",
      "Establish governance: proposals, review, versioning, deprecation and documentation.",
    ],
  },

  whenToUse: [
    "Products spanning several platforms or codebases.",
    "Any system that needs theming (dark mode, high contrast, brands, density).",
    "Teams where design and engineering need a shared, versioned source of truth.",
  ],
  whenNotToUse: [
    "Small, single-platform projects where a handful of CSS variables suffice — a full token pipeline is overhead.",
    "As a substitute for design decisions: tokenising inconsistent values just names the inconsistency.",
    "Creating component-level tokens for every property 'just in case'.",
  ],
  advantages: [
    "Single source of truth for design decisions across platforms.",
    "Theming and rebranding become configuration changes.",
    "Encodes accessibility and brand constraints systematically.",
  ],
  limitations: [
    "Requires governance; poorly named or proliferating tokens become their own maintenance burden.",
    "Tooling and format support still vary between design tools and transformers.",
    "Tokens capture values, not the judgement of when and how to use them — documentation is still needed.",
  ],
  practice: {
  "dos": [
    {
      "text": "Name tokens for their purpose or contract, not their current value (for example, color.action.primary, not blue-button).",
      "why": "A value can change while its role remains stable; purpose-based names make theme changes and maintenance intelligible.",
      "kind": "industry"
    },
    {
      "text": "Keep the source file, resolved theme values and generated platform outputs distinguishable.",
      "why": "A generated CSS variable or native constant is an implementation output, not automatically the authoritative design decision.",
      "kind": "industry"
    },
    {
      "text": "Validate token references, types, values, contrast pairings and output mappings before publishing.",
      "why": "A syntactically valid token file can still contain broken aliases, unsuitable values or inaccessible combinations.",
      "kind": "standard"
    },
    {
      "text": "Add descriptions and a deprecation path when tokens are intended for other teams to consume.",
      "why": "Consumers need intent, ownership and migration guidance; deleting a referenced token can break multiple products.",
      "kind": "industry"
    }
  ],
  "donts": [
    {
      "text": "Do not make every component depend directly on palette primitives by default.",
      "why": "It couples component behaviour to a particular palette and makes semantic remapping harder; use a documented exception only when there is a clear reason.",
      "kind": "industry"
    },
    {
      "text": "Do not create a component token for every property before a real need exists.",
      "why": "Extra layers increase naming, documentation, review and migration costs; the right number of tiers depends on the system.",
      "kind": "context"
    },
    {
      "text": "Do not assume a Figma variable collection is automatically a portable DTCG source file.",
      "why": "Figma variables and DTCG overlap but have different models and feature support; import/export mappings must be checked.",
      "kind": "platform"
    },
    {
      "text": "Do not treat a successful transform as proof that the rendered interface is correct.",
      "why": "Output still needs integration, accessibility, visual and platform testing.",
      "kind": "industry"
    }
  ],
  "examples": [
    {
      "title": "A small DTCG source: primitive value and semantic alias",
      "language": "json",
      "code": "{\n  \"color\": {\n    \"$type\": \"color\",\n    \"palette\": {\n      \"blue-700\": {\n        \"$value\": {\n          \"colorSpace\": \"srgb\",\n          \"components\": [0.122, 0.290, 0.620],\n          \"hex\": \"#1F4A9E\"\n        }\n      }\n    },\n    \"action\": {\n      \"primary\": {\n        \"$value\": \"{color.palette.blue-700}\",\n        \"$description\": \"Primary action surface\"\n      }\n    }\n  }\n}",
      "caption": "Illustrative DTCG 2025.10 fragment. The group-level $type is inherited by child tokens; the semantic token references the primitive. A real system must validate the value against every context and foreground pairing."
    },
    {
      "title": "Generated web output: one semantic contract, multiple theme values",
      "language": "css",
      "code": ":root {\n  --color-action-primary: #1f4a9e;\n}\n\n[data-theme=\"dark\"] {\n  --color-action-primary: #315b9d;\n}\n\n.button--primary {\n  background: var(--color-action-primary);\n}",
      "caption": "Illustrative resolved CSS output, not DTCG source syntax. The theme resolver/build configuration supplies each context value; the component consumes the semantic output rather than selecting a palette value. White foreground contrast is 8.30:1 for the light sample and 6.74:1 for the dark sample, computed with the WCAG contrast formula."
    },
    {
      {"title":"A real implementation pattern: UX Academy's CSS roles and Tailwind mapping","language":"css","code":":root {\n  --paper: #f4f3ef;\n  --surface: #fdfdfb;\n  --ink: #15161b;\n  --accent: #255a8c;\n}\n\n:root[data-theme=\"dark\"] {\n  --paper: #0f1013;\n  --surface: #16171c;\n  --ink: #ecebe5;\n  --accent: #8fb8e0;\n}\n\n@theme inline {\n  --color-paper: var(--paper);\n  --color-surface: var(--surface);\n  --color-ink: var(--ink);\n  --color-accent: var(--accent);\n}","caption":"Selected excerpt from this repository's app/globals.css. It uses CSS custom properties as the theme-level source for these roles, overrides values for dark theme, then maps them into Tailwind utilities with @theme inline. This is a real CSS/Tailwind implementation pattern; it is not a DTCG JSON source file."},
      "title": "A coupling mistake and its correction",
      "language": "css",
      "code": "/* Poor: a component knows the palette value */\n.button--primary {\n  background: #1f4a9e;\n}\n\n/* Better: a component consumes an intent */\n.button--primary {\n  background: var(--color-action-primary);\n}",
      "caption": "The second version creates a place where the system can change the action role per theme or brand. It still needs contrast and state checks after each mapping change."
    }
  ]
},

  misconceptions: [
    {
      myth: "Design tokens are a W3C standard.",
      reality:
        "The Design Tokens Format Module is a Final Community Group Report; it states it is not a W3C Standard nor on the Standards Track {{src:dtcg-format-2025}}.",
    },
    {
      myth: "Tokens are just variables.",
      reality:
        "Variables are an implementation. Tokens are a platform-neutral, layered system of named decisions with aliasing, typing and governance.",
    },
    {
      myth: "Components should use primitive tokens like blue.500.",
      reality:
        "Using primitives in components defeats theming. Components should consume semantic (purpose-named) tokens, unless a documented system constraint justifies a direct primitive reference.",
    },
    {
      myth: "DTCG requires every design system to use primitive, semantic and component token tiers.",
      reality:
        "DTCG defines an interchange format for token values, types, groups and references. The number and names of architectural tiers are decisions made by each design system, not a DTCG conformance requirement {{src:dtcg-format-2025}}.",
    },
    {
      myth: "A Figma variable collection is automatically a portable DTCG token source.",
      reality:
        "Figma variables are tool features with their own variable types, scopes and modes. DTCG is a separate interchange format; import/export mappings and unsupported properties must be checked {{src:figma-learn}}.",
    },
  ],

  relations: [
    { target: "primitive-tokens", type: "related-to", note: "Primitive tokens are the base layer of options that semantic tokens reference." },
    { target: "semantic-tokens", type: "related-to", note: "Semantic tokens map purposes to primitives and are what components should consume." },
    { target: "theme-architecture", type: "applied-in", note: "Themes are alternative mappings of semantic tokens, making tokens the core mechanism of theming." },
    { target: "atomic-design", type: "complementary-to", note: "Atomic design structures components; tokens structure the design decisions those components consume." },
    { target: "colour-contrast-ratio", type: "related-to", note: "Contrast requirements are enforced as rules over pairs of colour tokens." },
    { target: "modular-type-scale", type: "related-to", note: "Type scale steps are typically published as typography tokens." },
    { target: "design-to-development-handoff", type: "applied-in", note: "Tokens give designers and developers a shared, versioned vocabulary at handoff." },
  ],

  exercises: [
    {
      id: "design-tokens-ex-layers",
      kind: "assignment",
      level: "beginner",
      title: "From hard-coded values to tokens",
      prompt: [
        "Take one screen of a product and list every colour and spacing value used. Group duplicates and near-duplicates.",
        "Propose primitive tokens for the values and three to five semantic tokens for the roles you observe (e.g. text, surface, border, action).",
      ],
      deliverable: "A two-column table: primitive tokens, semantic tokens with their aliases.",
      criteria: ["Consolidates near-duplicates", "Semantic names describe purpose, not value", "Each semantic token aliases a primitive"],
    },
    {
      id: "design-tokens-ex-dark",
      kind: "assignment",
      level: "intermediate",
      title: "Design a dark theme by remapping",
      prompt: [
        "Using your semantic tokens, create a dark theme by changing only the aliases. Check every text/surface pair against WCAG contrast thresholds.",
        "Write the result in the DTCG format with `$value` and `{alias}` references.",
      ],
      deliverable: "Two token files (light, dark) and a contrast table.",
      criteria: ["Components need no changes", "All text pairs ≥ 4.5:1", "Valid DTCG-style JSON with aliases"],
      exampleSolution: [
        "light.tokens.json: { \"color\": { \"text\": { \"primary\": { \"$type\": \"color\", \"$value\": \"{color.grey.900}\" } } } } — dark.tokens.json maps the same name to {color.grey.50}; contrast checked for each surface pair.",
      ],
    },
    {
      id: "design-tokens-ex-governance",
      kind: "reflection",
      level: "advanced",
      title: "Write a token governance policy",
      prompt: [
        "Draft a one-page policy covering how a new token is proposed, named, reviewed, versioned and deprecated, and how you'll detect unused tokens.",
      ],
      criteria: ["Clear naming convention", "Versioning and deprecation path", "Usage measurement", "Ownership defined"],
    },
    {
      id: "design-tokens-ex-pipeline",
      kind: "assignment",
      level: "intermediate",
      title: "Trace a token from source to product",
      prompt: [
        "Use the illustrative Library Services Platform. Define one primitive and one semantic action token in a DTCG-style source file. Show the resolved light and dark values, one generated web output and where the same semantic role would be mapped for a native app.",
        "Mark which file is authoritative, which files are generated, and which checks must run before release. Do not assume the DTCG format alone defines the platform transform.",
      ],
      deliverable: "A short source fragment, a two-theme mapping table, one platform output and a validation checklist.",
      criteria: [
        "The primitive records a value and the semantic token records a purpose through an alias",
        "The same semantic name is used by the component in both themes",
        "The source, resolver and platform output are not conflated",
        "At least one contrast check and one platform-integration check are specified",
        "The learner identifies one limitation of the chosen tooling",
      ],
      exampleSolution: [
        "The source defines color.palette.blue-700 as the primitive and color.action.primary as an alias to it. The light context resolves action.primary to #1F4A9E; the dark context resolves the same role to #A9C4FF. The web build emits --color-action-primary under :root and a dark-context override under [data-theme=dark]. The button only consumes var(--color-action-primary).",
        "The source file is authoritative; theme resolution chooses context values; platform transforms create CSS/native outputs. Validation checks the alias graph, type and naming rules, contrast for each text/surface pairing, and the actual button in web and native builds. The team records which imported DTCG fields its design tool supports rather than assuming full format parity.",
      ],
    },
  ],

  quiz: [
    {
      id: "design-tokens-q-semantic",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which token name is the best choice for the colour of body text in a themeable system?",
      options: [
        { text: "color.text.primary", correct: true, explanation: "A semantic name describes purpose, so it can map to different values in each theme." },
        { text: "grey-900", correct: false, explanation: "That is a primitive; using it directly in components breaks dark mode." },
        { text: "dark-grey-text-16px", correct: false, explanation: "Mixes value description and unrelated properties; breaks when values change." },
        { text: "#1A1A1A", correct: false, explanation: "A raw value is not a token at all." },
      ],
      explanation: "Components consume semantic tokens; themes remap them to primitives.",
    },
    {
      id: "design-tokens-q-status",
      kind: "true-false",
      level: "intermediate",
      prompt: "The Design Tokens Format Module 2025.10 is a W3C Recommendation.",
      options: [
        { text: "True", correct: false, explanation: "It is a Final Community Group Report and states it is not a W3C Standard nor on the Standards Track." },
        { text: "False", correct: true, explanation: "Community Group reports are not W3C Recommendations, though they can be widely adopted." },
      ],
      explanation: "Distinguish W3C Recommendations (standards) from Community Group reports.",
    },
    {
      id: "design-tokens-q-theme",
      kind: "scenario",
      level: "intermediate",
      prompt: "A team wants to add dark mode. Their button component sets `background: var(--blue-500)`. What should they do first?",
      options: [
        { text: "Introduce a semantic token such as --color-action-primary, point components at it, then remap it per theme", correct: true, explanation: "Indirection through semantic tokens is what makes theming possible without editing components per theme." },
        { text: "Change --blue-500 to a darker blue in dark mode", correct: false, explanation: "Redefining a primitive breaks its meaning everywhere else it's used." },
        { text: "Duplicate every component for dark mode", correct: false, explanation: "This doubles maintenance and is exactly what tokens avoid." },
        { text: "Use CSS filter: invert() on the page", correct: false, explanation: "Inversion distorts images and brand colours and doesn't guarantee contrast." },
      ],
      explanation: "Primitive → semantic → component is the standard layering for theming.",
    },
    {
      id: "design-tokens-q-variable",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which statement best distinguishes a design token from a Figma variable?",
      options: [
        { text: "A token is a named design decision; a Figma variable is one tool feature that can store and apply reusable values", correct: true, explanation: "A tool variable can implement part of a token architecture, but the design decision and interoperable source model are broader." },
        { text: "They are exactly the same thing in every tool and file format", correct: false, explanation: "Tool variables and token interchange formats overlap but have different types, scopes and feature support." },
        { text: "A token is only a CSS custom property", correct: false, explanation: "CSS custom properties are one possible platform output." },
        { text: "A variable always contains more information than a token", correct: false, explanation: "The term does not guarantee a richer architecture; context and format matter." },
      ],
      explanation: "Distinguish the design decision and its naming contract from one implementation feature.",
    },
    {
      id: "design-tokens-q-layers",
      kind: "scenario",
      level: "advanced",
      prompt: "A two-person product team has one web app and no theming requirement. A proposal adds four token tiers and 600 component tokens. What is the strongest response?",
      options: [
        { text: "Start with the smallest useful architecture, such as CSS variables or primitive and semantic roles, and add a tier only when a real use case justifies its maintenance cost", correct: true, explanation: "Token layers are an architectural choice. Complexity should be justified by platform, theme, brand and ownership needs." },
        { text: "Adopt all four tiers because DTCG requires them", correct: false, explanation: "DTCG does not prescribe primitive, semantic or component tiers." },
        { text: "Reject tokens because a small team cannot use them", correct: false, explanation: "A lightweight token set may still solve a real consistency problem." },
        { text: "Create one token for every CSS declaration", correct: false, explanation: "This can tokenise incidental values and create a maintenance burden without clarifying reusable decisions." },
      ],
      explanation: "The design should fit the product's scale, needs and available ownership.",
    },
    {
      id: "design-tokens-q-alias",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "In the DTCG format, how does one token reference another token's value?",
      options: [
        { text: "With a curly-brace alias such as {color.grey.900} (or a JSON Pointer $ref)", correct: true, explanation: "Both reference mechanisms are defined in the 2025.10 format module." },
        { text: "With var(--color-grey-900)", correct: false, explanation: "That is CSS syntax produced by a transform, not the source format." },
        { text: "With @import", correct: false, explanation: "Not a token reference mechanism in the format." },
        { text: "References are not allowed", correct: false, explanation: "Aliasing is central to the format." },
      ],
      explanation: "Aliases let semantic tokens point to primitives in the source format.",
    },
  ],

  flashcards: [
    { id: "design-tokens-fc-layers", front: "Three common token layers", back: "Primitive (options) → semantic (purpose) → component (scoped)." },
    { id: "design-tokens-fc-dtcg", front: "DTCG format status", back: "Design Tokens Format Module 2025.10 — Final Community Group Report (28 Oct 2025); not a W3C Standard." },
    { id: "design-tokens-fc-origin", front: "Who coined 'design tokens'?", back: "Jina Anne with Jon Levine at Salesforce." },
    { id: "design-tokens-fc-variable", front: "Token versus tool variable", back: "A token expresses a named design decision; a Figma variable is one tool feature for storing and applying reusable values." },
    { id: "design-tokens-fc-pipeline", front: "Token delivery pipeline", back: "Author → validate → resolve context → transform per platform → generate outputs → test in product." },
    { id: "design-tokens-fc-tier-standard", front: "Does DTCG require primitive/semantic/component tiers?", back: "No. DTCG defines token file structure and references; tier architectures are conventions used by particular design systems." },
    { id: "design-tokens-fc-figma-types", front: "Figma's six variable types (checked 2026-11-24)", back: "Color, number, string, boolean, timing and easing. These are Figma capabilities, not DTCG's type list." },
  ],

  lab: "token-lab",

  references: [
    { source: "dtcg-format-2025", role: "primary", note: "Interchange format, types, aliasing, status." },
    { source: "dtcg-2026-thank-you-jina", role: "explanatory", note: "Attribution of the term to Jina Anne and Jon Levine." },
    { source: "dtcg-color-2025", role: "explanatory", note: "Colour value object and colour spaces." },
    { source: "dtcg-resolver-2025", role: "explanatory", note: "Themes as modifiers with contexts and a resolution order." },
    { source: "material-3", role: "explanatory", note: "Token architecture in Material Design 3." },
    { source: "fluent-2", role: "explanatory", note: "Token practice in Fluent 2." },
    { source: "carbon-design-system", role: "explanatory", note: "Token practice in Carbon." },
    { source: "figma-learn", role: "primary", note: "Official overview of variables, collections and modes; six variable types, aliases and contextual modes.", locator: "https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes" },
    { source: "style-dictionary-dtcg", role: "explanatory", note: "Platform transforms: changing token names, values and attributes for target outputs.", locator: "https://styledictionary.com/reference/hooks/transforms/" },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Design tokens are an industry practice with a stable community-group interchange format and broad adoption in major design systems. Benefits are supported by practitioner experience rather than controlled research; the format is not a W3C Standard.",

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
  lastVerifiedAt: "2026-11-24",
});
