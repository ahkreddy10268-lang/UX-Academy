import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "semantic-tokens",
  slug: "semantic-tokens",
  title: "Semantic Tokens",
  alternateNames: ["Alias tokens", "System tokens", "Role tokens", "Decision tokens"],
  summary:
    "Tokens named for the job a value does in the interface — text, surface, action, danger, focus — that point to primitive tokens for their value, so themes and brands can change values without changing meaning.",
  definition:
    "A semantic token names a design decision by its **purpose**: the role a value plays in the interface, such as `color.text.danger` or `color.surface.raised`. It holds no value of its own; it **refers to a primitive token** (`color.text.danger → color.red.700`), and a theme can point the same name at a different primitive. A semantic token is not a value (that is a primitive token) and not a component setting (that is a component token): it is the layer where meaning lives.",
  primaryType: "concept",
  secondaryTypes: ["pattern"],
  domain: "design-systems",
  subcategory: "foundations",
  tags: ["design tokens", "theming", "dark mode", "colour roles", "naming", "DTCG", "contrast"],
  difficulty: "intermediate",
  disciplines: ["Design systems", "Front-end engineering", "Visual design", "Accessibility"],
  learningObjectives: [
    "Explain the difference between a value, a primitive token and a semantic token.",
    "Name semantic tokens by role and relationship, in a consistent order.",
    "Build light and dark themes by remapping semantic tokens, and prove contrast for every pair.",
    "Express tiers and themes in the DTCG 2025.10 format, including a resolver document.",
    "Judge the size of a role vocabulary and defend where a new token belongs.",
  ],
  prerequisites: ["design-tokens", "primitive-tokens"],

  levels: {
    beginner: {
      explanation: [
        "A library app shows an error when a card has expired. The designer chose a red for that message, and the developer wrote `#b42318` into the code. Later the team adds dark mode. That red is too dark to read on a near-black background, and it has been copied into forty places.",
        "A **semantic token** fixes this by naming the decision rather than the colour: `color.text.danger` means *the colour for error text*. The code uses the name. Behind the name, the light theme points to a dark red and the dark theme points to a lighter red. The meaning stays the same; the value changes with the theme.",
        "So there are two kinds of names. **Primitive tokens** say *what colours exist* (`red.700`, `red.400`). **Semantic tokens** say *what a colour is for* (`text.danger`, `surface.raised`, `action.background`). Interfaces should be built from the second kind.",
      ],
      analogy:
        "Job titles and the people who hold them. 'Head librarian' is a role; who fills it can change without rewriting every rule that mentions the head librarian. A semantic token is the role; the primitive it points to is the person currently doing the job.",
      everydayExamples: [
        "Switching a reading app to dark mode changes every text and background colour at once, while links still look like links.",
        "A bank's 'danger' red on a delete button and on an error message stays consistent across its website and its phone app.",
        "A focus ring that is always visible, in every theme, because it has its own token rather than borrowing a brand colour.",
      ],
      vocabulary: [
        { term: "Semantic token", meaning: "A token named for its purpose, such as color.text.danger, that refers to a primitive for its value." },
        { term: "Primitive token", meaning: "A token naming one available value in a palette or scale, such as red.700." },
        { term: "Alias (reference)", meaning: "A token whose value points to another token instead of holding a value." },
        { term: "Role", meaning: "The job a value does: text, surface, border, action, feedback, focus." },
        { term: "Pair", meaning: "Two roles meant to be used together, such as text on a surface, whose contrast must be checked." },
        { term: "Theme", meaning: "One complete mapping of semantic tokens to primitives, such as light or dark." },
      ],
    },
    intermediate: {
      explanation: [
        "Semantic tokens sit between the palette and the components. Primitives are the options; semantic tokens choose among them for a purpose; components consume semantic tokens, directly or through a component token such as `button.primary.background → color.action.background`. Because nothing below the semantic layer knows which primitive was chosen, a theme is just a second mapping.",
        "Good names describe **role and relationship, not appearance**. `color.text.danger` survives a rebrand; `color.red-text` does not. Most systems order the segments from general to specific — category, property, role, then modifiers such as emphasis and state. Atlassian's `color.background.danger.bold.hovered` reads as a sentence in that order {{src:atlassian-color}}, and the DTCG Color module's non-normative naming guidance recommends putting category and property first and avoiding abbreviations ('background', not 'bg') {{src:dtcg-color-2025}}.",
        "The most useful insight is that **contrast belongs to pairs, not to tokens**. `color.text.subtle` cannot be 'accessible' by itself; it is accessible on `color.surface.default` in a given theme. Material 3 designs its colour roles as pairs — 'on' roles for content placed on a fill — and warns that improper pairings can break contrast {{src:m3-color-roles}}. A semantic layer is therefore documented as roles *and* the pairs they may form, and every pair is tested in every theme.",
      ],
      howItWorks: [
        "In the DTCG 2025.10 format a semantic token is a token whose `$value` is a curly-brace reference to another token, such as `\"$value\": \"{color.red.700}\"`. It may omit `$type`: when a value is a reference, its type is the resolved type of the token it points to {{src:dtcg-format-2025}}. The Color module illustrates exactly this pattern — `color.text.base` referring to `color.palette.black` — in its non-normative section on token categories {{src:dtcg-color-2025}}.",
        "Themes are separate files that map the same semantic names to different primitives. The DTCG Resolver module describes how to combine them: a resolver document lists **sets** of token files, **modifiers** whose **contexts** (for example `light` and `dark`) each point to their own files, a **default** context, and a **resolutionOrder** in which later entries override earlier ones {{src:dtcg-resolver-2025}}.",
        "Build tools then turn the resolved tokens into platform code — for the web, typically CSS custom properties scoped to a theme selector — so components reference `var(--color-text-danger)` and never a raw value.",
      ],
      implementation: [
        "Start from real usage: list the roles the interface actually needs (surfaces, text levels, borders, actions, feedback, focus, disabled) before naming anything.",
        "Name each token by role and relationship, in one fixed segment order; write a one-line purpose and the pairs it may form in `$description` or the documentation.",
        "Map every token in every theme, then compute the contrast of every documented pair: text and images of text at least 4.5:1 [WCAG 2.2 SC 1.4.3 Contrast (Minimum), AA]; visual information needed to identify controls and their states, including focus indicators, at least 3:1 against adjacent colours [WCAG 2.2 SC 1.4.11 Non-text Contrast, AA] {{src:w3c-wcag-22}}.",
        "Never let colour be the only signal: a danger token colours an error message, but the message still needs text or an icon [WCAG 2.2 SC 1.4.1 Use of Color, A] {{src:w3c-wcag-22}}.",
        "Lint component code so it may reference semantic or component tokens only, never primitives or raw values.",
        "Treat renaming or removing a semantic token as a breaking change: mark it with `$deprecated` and a pointer to its replacement before removal {{src:dtcg-format-2025}}.",
      ],
      scenarios: [
        "**Illustrative.** A library app's dark mode was built by overriding each component. The 'renewal due' caption kept `#4f4e49` from the light theme and now sits on `#141413`: 2.21:1, below the 4.5:1 text minimum. Moving the caption to `color.text.subtle` and mapping that role to `grey.300` in dark gives 11.00:1, and every other subtle caption is fixed at the same time.",
        "**Illustrative.** Marketing asks for a red 'Sale' label. The colour matches `color.text.danger`, but a sale is not an error. Reusing the role would teach users that red sometimes means 'good news'; a separate role, or a component token on the label, keeps danger meaningful.",
        "**Illustrative.** A team adds a high-contrast theme. Because components use semantic tokens, the work is a third mapping plus a contrast table, not a change to any component.",
      ],
    },
    advanced: {
      explanation: [
        "Every established system has a semantic layer, but none calls it the same thing: Fluent 2 speaks of **alias** tokens over **global** tokens {{src:fluent-2-design-tokens}}; Material 3 of **system** tokens between **reference** and **component** tokens {{src:m3-design-tokens}}; Carbon of **role-based** tokens whose names stay fixed while each of its four themes changes the values {{src:carbon-themes}}. The DTCG Format module prescribes no tiers at all — the categories appear only in the Color module's non-normative naming section {{src:dtcg-format-2025}} {{src:dtcg-color-2025}}. 'Primitive → semantic → component' is an industry convention, not a requirement of any standard.",
        "The design question at this level is the **size and grain of the role vocabulary**. Too coarse (`color.text`, `color.background`) and teams invent local exceptions; too fine (`color.text.checkout-banner-heading`) and the semantic layer becomes a component layer with worse names. Material 3 settles on 26 standard colour roles in six groups {{src:m3-color-roles}}; Atlassian multiplies a smaller set of roles by emphasis and state {{src:atlassian-color}}. Both are defensible; the test is whether a designer can choose the right token for a new screen without asking.",
        "Semantic tokens also carry **governance cost**. Each name is a public API: adding one is cheap, renaming one breaks every consumer, and two tokens with overlapping meanings ('subtle' and 'secondary') force people to guess. A semantic layer needs an owner, a contribution rule for new roles, a deprecation path and usage measurement, which links it to versioning and governance as much as to colour.",
      ],
      evidence: [
        "The evidence for semantic tokens is **documented practice**, not experimental research. Major systems publish semantic layers and explain their reasoning {{src:fluent-2-design-tokens}} {{src:m3-design-tokens}} {{src:carbon-themes}} {{src:atlassian-color}}, and the DTCG reports specify the reference and resolver mechanisms that implement them {{src:dtcg-format-2025}} {{src:dtcg-resolver-2025}}. No controlled study was found that measures their effect on consistency, defect rates or delivery speed; claims of such gains are practitioner reports. What *can* be verified is mechanical: whether every documented pair meets WCAG thresholds in every theme {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Two tiers or three?** Fluent 2 documents two (global, alias) {{src:fluent-2-design-tokens}}; Material 3 adds a component class {{src:m3-design-tokens}}. Component tokens help white-label products override one component without forking a role, but they multiply names. A reasonable default is two tiers, adding component tokens only where a component genuinely departs from the role.",
        "**Role-first or component-first names?** `color.background.button.primary` groups by property; `button.primary.background` groups by component. Role-first keeps the semantic layer independent of components; component-first is easier to find from a component. Many systems use role-first for semantic tokens and component-first for component tokens.",
        "**Should semantic tokens encode emphasis and state?** Atlassian puts emphasis and state into the name {{src:atlassian-color}}; other systems leave states to the component. Encoding state centralises hover and pressed colours but makes the vocabulary much larger.",
      ],
      alternativeModels: [
        "**Computed roles.** Instead of hand-mapping each theme, some systems derive role values from a source colour with an algorithm and contrast targets; the role names stay, but the mapping is generated rather than authored.",
        "**Direct theming of components.** Small products sometimes theme components directly with a few CSS custom properties. It is faster to start, but each component re-decides colour, and contrast must be re-checked per component.",
      ],
    },
  },

  application: {
    summary: [
      "Semantic tokens are where a design system records meaning: what is text, what is a surface, what is an action, what signals danger. Components consume them; themes, brands and accessibility modes remap them. Their quality shows up most clearly in dark mode and in contrast audits.",
    ],
    web: [
      "Emit semantic tokens as CSS custom properties per theme (`:root` and `[data-theme=\"dark\"]`), and respect `prefers-color-scheme` as the default choice.",
      "Give focus indicators their own role so they keep 3:1 against adjacent colours in every theme [WCAG 2.2 SC 1.4.11, AA].",
    ],
    mobile: [
      "Map semantic roles onto platform colour systems (asset-catalogue colours with light and dark appearances, Android colour resources per night mode) so native apps follow the system setting.",
    ],
    enterprise: [
      "In multi-brand products, keep the semantic names shared and swap primitive mappings per brand; review any brand that wants a new role, because it changes the API for everyone.",
    ],
    services: [
      "Use the same roles in service artefacts that are not screens — PDF letters, kiosks, signage — so 'danger' and 'action' mean the same thing across a service.",
    ],
    steps: [
      "Inventory the roles the interface uses today and the pairs they form.",
      "Agree a naming order (category, property, role, modifiers) and a short role vocabulary.",
      "Map each role to a primitive in every theme; compute contrast for every pair.",
      "Migrate components from primitives and raw values to semantic or component tokens; add a lint rule.",
      "Publish the vocabulary with purpose, allowed pairs and examples; set a rule for proposing new roles.",
      "Version changes; deprecate before removing.",
    ],
  },

  whenToUse: [
    "Any product with more than one theme, mode or brand — or one that expects to have one.",
    "Systems shared by several teams, where a name must tell a designer which colour to use without asking.",
    "Whenever accessibility needs to be enforced systematically: pairs of roles can be tested automatically.",
  ],
  whenNotToUse: [
    "A one-off prototype or a single-page site with one theme: a handful of CSS custom properties is enough; add a semantic layer when a second theme or consumer appears.",
    "As a place for one-off exceptions: a value used by one component belongs in a component token, not a new role.",
    "As a way to rename primitives (`color.primary-blue`): if the name describes the value, it is still a primitive; name the purpose instead.",
  ],
  advantages: [
    "Themes, brands and accessibility modes become new mappings rather than component changes.",
    "Names carry intent, so designers and developers choose by purpose.",
    "Contrast can be checked once per pair per theme instead of per component.",
  ],
  limitations: [
    "A semantic layer is an API with governance cost: names must be owned, reviewed, versioned and deprecated.",
    "Role vocabularies drift: overlapping names ('subtle', 'secondary', 'muted') make people guess.",
    "Tokens guarantee consistent values, not correct use: a valid token in the wrong pair can still fail contrast.",
    "There is no standard role vocabulary or tier model; each system's names are its own choice.",
  ],
  misconceptions: [
    {
      myth: "Semantic tokens are part of the DTCG standard.",
      reality:
        "The DTCG Format module prescribes no tiers or names; categories such as base, alias and component appear only in the Color module's non-normative naming section, and the reports are Community Group reports, not W3C Standards {{src:dtcg-format-2025}} {{src:dtcg-color-2025}}.",
    },
    {
      myth: "If every semantic colour is accessible, the interface is accessible.",
      reality:
        "Contrast is a property of pairs in a theme. A token is only 'accessible' on the surfaces it was tested against, and colour must never be the only signal [WCAG 2.2 SC 1.4.1] {{src:w3c-wcag-22}}.",
    },
    {
      myth: "Dark mode means inverting the light theme.",
      reality:
        "Dark themes need their own mapping: the illustrative danger red that reads at 6.57:1 on white falls to 2.80:1 on near-black, so dark needs its own, lighter red (6.77:1). Each role is mapped and checked again, not flipped.",
    },
  ],

  relations: [
    { target: "design-tokens", type: "derived-from", note: "Semantic tokens are the purpose-named tier of a token system." },
    { target: "primitive-tokens", type: "complementary-to", note: "Semantic tokens refer to primitives for their values; primitives give them a palette to choose from." },
    { target: "theme-architecture", type: "applied-in", note: "A theme is one complete mapping of semantic tokens to primitives." },
    { target: "colour-contrast-ratio", type: "measured-by", note: "Every documented pair of semantic roles is checked with the contrast ratio in every theme." },
    { target: "colour-systems", type: "related-to", note: "A colour system defines the roles and pairs that the semantic layer names." },
    { target: "multi-brand-systems", type: "applied-in", note: "Brands share semantic names and swap the primitives behind them." },
    { target: "design-system-versioning", type: "related-to", note: "Renaming or removing a semantic token is a breaking change for every consumer." },
  ],

  lab: "token-lab",

  practice: {
    dos: [
      { text: "Name tokens by role and relationship: `color.text.danger`, `color.surface.raised`.", why: "The name survives a rebrand or a new theme because it never described the value.", kind: "industry" },
      { text: "Document the pairs each role may form, and test every pair in every theme.", why: "Text needs at least 4.5:1 [WCAG 2.2 SC 1.4.3, AA]; control boundaries and focus indicators need at least 3:1 against adjacent colours [SC 1.4.11, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Keep one segment order everywhere: category, property, role, then emphasis and state.", why: "Predictable names can be guessed and searched; the DTCG Color module's naming guidance puts category and property first {{src:dtcg-color-2025}}.", kind: "industry" },
      { text: "Build themes by remapping semantic tokens, for example as resolver contexts.", why: "Components never change between themes, so a theme cannot be half-applied {{src:dtcg-resolver-2025}}.", kind: "industry" },
      { text: "Give focus its own role.", why: "A focus ring that borrows the brand colour can disappear on a brand-coloured surface; its own role can be tuned per theme.", kind: "industry" },
    ],
    donts: [
      { text: "Don't build dark mode by overriding component styles one by one.", why: "Each component re-decides colour and some are missed: an illustrative caption left at #4f4e49 on #141413 falls to 2.21:1.", kind: "industry" },
      { text: "Don't describe the value in a semantic name (`color.action.blue`).", why: "When the action becomes green, the name lies, and renaming it breaks every consumer.", kind: "industry" },
      { text: "Don't reuse a role because the colour happens to match (danger red for a 'Sale' label).", why: "Colour stops carrying meaning. Atlassian, for example, gives its accent colours no meaning and says not to use them where colour carries meaning {{src:atlassian-color}}.", kind: "system" },
      { text: "Don't create a role for one screen or component (`color.text.checkout-promo`).", why: "The vocabulary inflates and stops guiding choices; one-off values belong in component tokens, if anywhere.", kind: "team" },
      { text: "Don't let a semantic colour be the only signal.", why: "An error must also be stated in text or with an icon [WCAG 2.2 SC 1.4.1 Use of Color, A] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "theme/light.tokens.json — the semantic layer, light",
        language: "json",
        code: `{
  "color": {
    "surface": {
      "default": {
        "$value": "{color.grey.0}"
      },
      "raised": {
        "$value": "{color.grey.50}"
      }
    },
    "text": {
      "default": {
        "$value": "{color.grey.900}"
      },
      "subtle": {
        "$value": "{color.grey.700}"
      },
      "danger": {
        "$value": "{color.red.700}",
        "$description": "Error messages and destructive-action text. Pair only with color.surface.*."
      }
    },
    "border": {
      "control": {
        "$value": "{color.grey.600}"
      }
    },
    "action": {
      "background": {
        "$value": "{color.blue.600}"
      },
      "text": {
        "$value": "{color.grey.0}"
      }
    },
    "focus": {
      "ring": {
        "$value": "{color.blue.600}"
      }
    }
  }
}`,
        caption:
          "Every value is a reference to a primitive; none carries `$type`, because a reference takes the type of the token it points to {{src:dtcg-format-2025}}. Computed pairs (illustrative palette): text.default on surface.default 16.66:1, text.subtle on surface.raised 7.71:1, text.danger on surface.default 6.57:1, action.text on action.background 6.47:1, border.control on surface.default 5.43:1.",
      },
      {
        title: "theme/dark.tokens.json — the same names, remapped",
        language: "json",
        code: `{
  "color": {
    "surface": {
      "default": {
        "$value": "{color.grey.950}"
      },
      "raised": {
        "$value": "{color.grey.900}"
      }
    },
    "text": {
      "default": {
        "$value": "{color.grey.50}"
      },
      "subtle": {
        "$value": "{color.grey.300}"
      },
      "danger": {
        "$value": "{color.red.400}",
        "$description": "Error messages and destructive-action text. Pair only with color.surface.*."
      }
    },
    "border": {
      "control": {
        "$value": "{color.grey.500}"
      }
    },
    "action": {
      "background": {
        "$value": "{color.blue.400}"
      },
      "text": {
        "$value": "{color.grey.950}"
      }
    },
    "focus": {
      "ring": {
        "$value": "{color.blue.300}"
      }
    }
  }
}`,
        caption:
          "Only the references change. Computed pairs: text.default on surface.default 17.04:1, text.subtle on surface.raised 9.94:1, text.danger on surface.default 6.77:1, action.text on action.background 5.94:1, border.control on surface.raised 4.75:1, focus.ring on surface.raised 7.83:1.",
      },
      {
        title: "components.tokens.json — component tokens consume roles",
        language: "json",
        code: `{
  "button": {
    "primary": {
      "background": {
        "$value": "{color.action.background}"
      },
      "label": {
        "$value": "{color.action.text}"
      },
      "padding-inline": {
        "$value": "{space.400}"
      }
    }
  }
}`,
        caption: "The button never names a primitive, so it follows every theme.",
      },
      {
        title: "tokens.resolver.json — theme switching with the DTCG Resolver module",
        language: "json",
        code: `{
  "version": "2025.10",
  "name": "Library app tokens",
  "sets": {
    "primitives": {
      "sources": [
        {
          "$ref": "primitives.tokens.json"
        }
      ]
    },
    "components": {
      "sources": [
        {
          "$ref": "components.tokens.json"
        }
      ]
    }
  },
  "modifiers": {
    "theme": {
      "contexts": {
        "light": [
          {
            "$ref": "theme/light.tokens.json"
          }
        ],
        "dark": [
          {
            "$ref": "theme/dark.tokens.json"
          }
        ]
      },
      "default": "light"
    }
  },
  "resolutionOrder": [
    {
      "$ref": "#/sets/primitives"
    },
    {
      "$ref": "#/modifiers/theme"
    },
    {
      "$ref": "#/sets/components"
    }
  ]
}`,
        caption:
          "Sets hold files that apply in every context; the `theme` modifier selects one context; in `resolutionOrder` later entries override earlier ones {{src:dtcg-resolver-2025}}. File names are illustrative.",
      },
      {
        title: "One possible CSS output",
        language: "css",
        code: `:root,
[data-theme="light"] {
  --color-surface-default: #ffffff;
  --color-text-default: #1f1e1c;
  --color-text-danger: #b42318;
  --color-action-background: #2457c5;
  --color-action-text: #ffffff;
  --color-focus-ring: #2457c5;
}

[data-theme="dark"] {
  --color-surface-default: #141413;
  --color-text-default: #f6f6f4;
  --color-text-danger: #f07a6e;
  --color-action-background: #5f92e8;
  --color-action-text: #141413;
  --color-focus-ring: #8fb3f0;
}

.button-primary {
  background: var(--color-action-background);
  color: var(--color-action-text);
}

.button-primary:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}`,
        caption: "Build tools differ in naming and structure; this shows the shape of the result, not one tool's exact output.",
      },
    ],
  },

  exercises: [
    {
      id: "semantic-tokens-ex-roles",
      kind: "assignment",
      level: "beginner",
      title: "Find the roles on one screen",
      prompt: [
        "Take one screen of a product you know. Circle every colour and write down what job it does: text, secondary text, a surface, a border, a primary action, an error, a focus ring.",
        "Give each job a semantic name in the form `color.<property>.<role>`. Merge jobs that are really the same.",
      ],
      deliverable: "A table: element, job, semantic token name.",
      criteria: ["Names describe purpose, not colour", "One segment order throughout", "Duplicate jobs merged"],
    },
    {
      id: "semantic-tokens-ex-correct-dark",
      kind: "critique",
      level: "intermediate",
      title: "Correct a broken dark theme",
      prompt: [
        "Illustrative case. In a library app's dark theme, the 'renewal due' caption is #4f4e49 on a #141413 card, and the 'Renew' button is #2457c5 on the same card. Both were kept from the light theme by overriding component styles.",
        "Work through the correction sequence: symptom, user impact, underlying cause, requirement, corrected mapping, validation and trade-off.",
      ],
      deliverable: "A corrected dark mapping for the roles involved, with the contrast ratio of each pair.",
      criteria: ["Cause found in the token layer, not 'the colour is wrong'", "WCAG criteria cited with level", "Every pair recalculated", "Trade-off named"],
      exampleSolution: [
        "1. Symptom: the caption is hard to read and the button edge blurs into the card in dark mode.",
        "2. Impact: people with low vision or in bright light cannot read the due date and may miss the action.",
        "3. Cause: the components hold light-theme values; there is no semantic layer, so dark mode never remapped them.",
        "4. Requirement: text at least 4.5:1 [WCAG 2.2 SC 1.4.3, AA]; the button's boundary needs 3:1 against the card if it identifies the control [SC 1.4.11, AA]. Measured: caption 2.21:1, button 2.85:1.",
        "5. Correction: point the caption at `color.text.subtle` and the button at `color.action.background`; in dark, map text.subtle → grey.300 and action.background → blue.400, with action.text → grey.950.",
        "6. Validation: caption 11.00:1 on surface.default and 9.94:1 on surface.raised; button 5.94:1 against the surface; label 5.94:1 on the button. Check the other components that used the same values.",
        "7. Trade-off: the dark button has dark text, unlike the light theme's white label; document the pair so nobody 'fixes' it back.",
      ],
    },
    {
      id: "semantic-tokens-ex-vocabulary",
      kind: "reflection",
      level: "advanced",
      title: "Defend a role vocabulary",
      prompt: [
        "Three teams ask for new roles: `color.text.promo`, `color.background.selected-row` and `color.text.placeholder`. Decide for each whether it becomes a semantic role, a component token, or is refused, and write the rule you used.",
      ],
      deliverable: "A decision per request and a one-paragraph contribution rule for new roles.",
      criteria: ["Distinguishes role from component need", "Considers every theme and contrast pair", "Names the governance and versioning cost"],
    },
  ],

  quiz: [
    {
      id: "semantic-tokens-q-name",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which name is a semantic token?",
      options: [
        { text: "color.text.danger", correct: true, explanation: "It names the purpose — the colour for error text — not the value." },
        { text: "color.red.700", correct: false, explanation: "That is a primitive: one red in a palette, with no stated purpose." },
        { text: "#b42318", correct: false, explanation: "A raw value is not a token." },
        { text: "color.dark-red-text", correct: false, explanation: "It describes the value, so it breaks when the colour changes." },
      ],
      explanation: "Semantic tokens name roles; primitives name values.",
    },
    {
      id: "semantic-tokens-q-pairs",
      kind: "true-false",
      level: "intermediate",
      prompt: "If color.text.subtle meets 4.5:1 on white, it meets the WCAG text minimum everywhere it is used.",
      options: [
        { text: "True", correct: false, explanation: "Contrast depends on the surface it sits on, and on the theme." },
        { text: "False", correct: true, explanation: "Contrast is a property of a pair in a theme; every documented pair must be tested." },
      ],
      explanation: "Document the allowed pairs of roles and test each pair in every theme [WCAG 2.2 SC 1.4.3].",
    },
    {
      id: "semantic-tokens-q-resolver",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "In a DTCG 2025.10 resolver document, how are light and dark themes expressed?",
      options: [
        { text: "As contexts of a modifier, each pointing to its own token files, with a default context", correct: true, explanation: "Modifiers declare a contexts map and a default; resolutionOrder decides which files override which." },
        { text: "As a $theme property on every token", correct: false, explanation: "There is no such property in the format." },
        { text: "By duplicating every component file", correct: false, explanation: "That is what a semantic layer avoids." },
        { text: "Themes cannot be expressed in the DTCG reports", correct: false, explanation: "The Resolver module exists for exactly this." },
      ],
      explanation: "Sets, modifiers with contexts, and a resolution order model themes in the Resolver module.",
    },
    {
      id: "semantic-tokens-q-sale",
      kind: "scenario",
      level: "advanced",
      prompt: "Marketing wants the 'Sale' price in the same red as error messages and suggests using color.text.danger. What is the best response?",
      options: [
        { text: "Keep danger for errors; if a sale colour is needed, give it its own role or a component token and check its contrast", correct: true, explanation: "Reusing the role weakens what red means to users and couples two unrelated decisions." },
        { text: "Use color.text.danger — the colour is identical", correct: false, explanation: "Matching values is not matching meaning; the roles will diverge later." },
        { text: "Hard-code the red in the price component", correct: false, explanation: "That bypasses the token system and every theme." },
        { text: "Rename color.text.danger to color.text.red", correct: false, explanation: "That turns a role back into a value name and breaks consumers." },
      ],
      explanation: "Semantic tokens protect meaning; same value does not mean same role.",
    },
  ],

  flashcards: [
    { id: "semantic-tokens-fc-what", front: "Semantic token", back: "A token named for its purpose (color.text.danger) that refers to a primitive for its value." },
    { id: "semantic-tokens-fc-pairs", front: "Where does contrast live?", back: "In pairs of roles within a theme — text on a surface, a label on an action — never in one token alone." },
    { id: "semantic-tokens-fc-theme", front: "What is a theme, in token terms?", back: "One complete mapping of semantic tokens to primitives; components do not change." },
    { id: "semantic-tokens-fc-names", front: "Other names for semantic tokens", back: "Alias tokens (Fluent 2), system tokens (Material 3), role-based tokens (Carbon)." },
  ],

  references: [
    { source: "dtcg-format-2025", role: "primary", note: "References, type resolution for aliases, $description and $deprecated." },
    { source: "dtcg-color-2025", role: "primary", note: "Colour values; non-normative token categories and naming guidance." },
    { source: "dtcg-resolver-2025", role: "primary", note: "Sets, modifiers, contexts and resolution order for themes." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.1 Use of Color (A), 1.4.3 Contrast (Minimum) (AA), 1.4.11 Non-text Contrast (AA)." },
    { source: "m3-color-roles", role: "explanatory", note: "Colour roles designed as pairs." },
    { source: "m3-design-tokens", role: "explanatory", note: "Reference, system and component token classes." },
    { source: "fluent-2-design-tokens", role: "explanatory", note: "Global and alias tiers." },
    { source: "carbon-themes", role: "explanatory", note: "Role names fixed across four themes." },
    { source: "atlassian-color", role: "explanatory", note: "Name grammar with role, emphasis and state; accent colours carry no meaning." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Semantic tokens are documented practice in major design systems, implemented through the DTCG reference and resolver mechanisms (Community Group reports, not W3C Standards). Their benefits are reported by practitioners, not measured in controlled studies. The contrast of each pair can be verified exactly against WCAG 2.2, which is a W3C Recommendation.",

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
