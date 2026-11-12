import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "component-libraries",
  slug: "component-libraries",
  title: "Component Libraries",
  alternateNames: ["Pattern library", "UI library", "UI kit", "Component kit", "Headless component library"],
  summary:
    "The coded, versioned, documented set of reusable interface components a design system ships, and the decision about whether to build it, buy it or assemble it on top of headless primitives.",
  definition:
    "A component library is the **packaged, versioned implementation of a design system's components** — code that product teams install, plus documentation, a design-tool counterpart and a status for each component. Frost notes that pattern libraries are 'also known as front-end style guides, UI libraries, or component libraries' {{src:frost-2016}}. A library is one *layer* of a [[design-system]], not the whole system: it consumes tokens, encodes accessible behaviour and is governed by the system's release and contribution rules. Libraries range from **headless** (behaviour and accessibility, no styles) to **opinionated** (styled, ready to use).",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "components",
  tags: ["component library", "pattern library", "headless", "Radix", "React Aria", "Ark UI", "MUI", "Chakra", "Polaris", "Primer", "build vs buy", "versioning"],
  difficulty: "intermediate",
  disciplines: ["Design systems", "Front-end engineering", "Product management"],
  learningObjectives: [
    "Place the component library within a design system and say what it owns.",
    "Compare headless primitives with opinionated libraries and decide build, buy or wrap.",
    "Define ownership, component status and versioning for a shared library.",
    "Judge a library's accessibility, bundle and rendering costs before adopting it.",
  ],
  prerequisites: ["design-system", "atomic-design", "semantic-tokens"],

  levels: {
    beginner: {
      explanation: [
        "A library app has five teams. Each built its own button, date picker and dialog. Now there are five date pickers: two cannot be used with a keyboard, one shows dates in a different format, and a fix to one never reaches the others.",
        "A **component library** is the shared box of ready-made parts — buttons, inputs, dialogs, tabs — that every team installs instead of rebuilding. Each part is built once, tested once (including for keyboard and screen-reader use) and improved once for everyone.",
        "The library is not the whole design system. The system also includes the reasons, tokens, guidelines and the people who look after it. The library is where those decisions become code people can use.",
      ],
      analogy:
        "A set of standard electrical fittings: sockets, switches and plugs that every builder uses. Because they share one standard, any plug fits any socket, and a safety fix is made once at the factory rather than in every house.",
      everydayExamples: [
        "Every 'Save' button in an app looks and behaves the same.",
        "A date picker that works with the keyboard in every product of a company.",
        "A designer and a developer using components with the same names.",
      ],
      vocabulary: [
        { term: "Component library", meaning: "The shared, coded set of reusable interface parts a system publishes." },
        { term: "Headless", meaning: "A component that provides behaviour and accessibility but no visual styles." },
        { term: "Opinionated library", meaning: "A library whose components come fully styled and ready to use." },
        { term: "Version", meaning: "A numbered release of the library, so teams know what changed and when to upgrade." },
        { term: "Consumer", meaning: "A product team that installs and uses the library." },
      ],
    },
    intermediate: {
      explanation: [
        "**Build, buy or wrap.** Frost describes ready-made frameworks such as Bootstrap as fast — well-tested components, quicker launches — but warns that they push everyone towards the same look {{src:frost-2016}}. Opinionated libraries today work the same way: Material UI implements Google's Material Design and offers customisation to build a custom system on top {{src:mui-overview}}. Headless libraries take the opposite route: Radix ships unstyled components that follow WAI-ARIA patterns and handle roles, focus and keyboard behaviour {{src:radix-primitives}}; React Aria ships style-free components whose behaviour follows the ARIA Authoring Practices Guide {{src:react-aria}}; Ark UI offers the same headless approach across React, Solid, Vue and Svelte {{src:ark-ui}}. Many teams *wrap* a headless library with their own tokens and styles.",
        "**What the library owns.** Primer's React library deliberately contains presentational components and leaves data fetching to products, which wrap components when they need data {{src:primer-react-philosophy}}. It also sorts components into building blocks, pattern components and helpers, and allows controlled escape hatches: 'Assume that people will break the rules, provide safe ways for them to do so' {{src:primer-react-philosophy}}.",
        "**Status and versioning.** Primer marks components Experimental, Ready or Deprecated; breaking changes to Ready components raise the package's major version and come with a migration path {{src:primer-component-status}}, which follows semantic versioning {{src:semver-2}}. Libraries also change technology: Shopify now describes Polaris as a unified UI framework built on web components {{src:shopify-polaris}}, which shows that a library is a long-lived product, not a one-off build.",
        "**Ownership.** Frost separates the system's makers from its users and argues it must be 'made official' as a product, because a pattern library that stops reflecting live products 'becomes obsolete' {{src:frost-2016}}.",
      ],
      howItWorks: [
        "A library turns repeated decisions into a dependency: products install it, so a fix or an accessibility improvement ships to every consumer through one upgrade.",
        "Status labels and semantic versions make change predictable: consumers know which components are safe and how much work an upgrade will be.",
      ],
      implementation: [
        "Decide the layer you own: behaviour (build on headless primitives), styling (tokens and variants), or both.",
        "Give every component a status (experimental, ready, deprecated) and publish releases with semantic versions and migration notes.",
        "Name components by what they are, not where they are used ('carousel', not 'homepage carousel') {{src:frost-2016}}.",
        "Test every interactive component with keyboard and screen readers against the APG pattern it implements {{src:w3c-apg-keyboard}}; WCAG 2.2 requires keyboard operability [SC 2.1.1 Keyboard, A] and names, roles and values for custom controls [SC 4.1.2, A] {{src:w3c-wcag-22}}.",
        "Keep a design-tool library with the same component and property names as the code.",
      ],
      scenarios: [
        "**Illustrative.** The library app's teams agree on one library built on a headless primitive set. The date picker's keyboard support comes from the primitive; the team adds tokens, variants and documentation. The other four pickers are deprecated with a warning and a migration guide.",
        "**Illustrative.** A team adopts an opinionated library to launch quickly. A year later, the brand changes and every component needs overrides. The team moves the overrides into a theme and plans a gradual move to a wrapped headless base.",
        "**Design review protocol.** For a proposed component: does it exist already? Which layer (headless base, styled component, product wrapper) does it belong to? Does it implement an APG pattern? What status does it start with? Who owns it?",
      ],
    },
    advanced: {
      explanation: [
        "**Headless composition vs CSS encapsulation.** Headless libraries expose parts (`Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`) and leave styling to you; Radix gives granular access to each part and a fully typed API {{src:radix-primitives}}. Opinionated libraries encapsulate styles and expose a theme; they are faster to start but harder to restyle deeply. A wrapped headless base keeps accessibility behaviour shared while the visual layer belongs to the system's tokens.",
        "**Bundle and runtime cost.** Radix's package is tree-shakeable, so only imported components ship {{src:radix-primitives}}; per-component imports and side-effect-free modules matter more than the library's total size. Styling approach also costs: Chakra UI currently uses Emotion at runtime and states a long-term move to a zero-runtime model {{src:chakra-ui-installation}}. Measure the components a page actually uses, not the package.",
        "**React Server Components.** In RSC apps code is server-rendered by default; `'use client'` marks a module and all its dependencies as client code {{src:react-use-client}}. Interactive library components need the directive; purely presentational ones can stay server components. Libraries should mark the boundary in their own modules, so consumers do not pull a whole package to the client.",
        "**Accessibility contract.** Adopting a headless library moves much of the WAI-ARIA work — roles, states, keyboard interaction — to a tested dependency {{src:radix-primitives}} {{src:react-aria}}, but not all of it: labels, content, focus order across the page and colour contrast remain the consumer's job. Radix states that changing a part's element type makes you responsible for keeping it accessible {{src:radix-composition}}.",
      ],
      evidence: [
        "Component libraries are **documented practice**: Frost's book, Primer's philosophy and status model, and the headless libraries' documentation describe their purpose and trade-offs {{src:frost-2016}} {{src:primer-react-philosophy}} {{src:primer-component-status}} {{src:radix-primitives}} {{src:react-aria}}. Speed and consistency benefits are reported by practitioners; no controlled study was found comparing build, buy and headless strategies. Keyboard and name–role–value requirements are WCAG 2.2 success criteria {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Build or buy?** Building gives control and identity at high cost; buying is fast but couples the product to someone else's design and roadmap.",
        "**Headless or styled?** Headless keeps brand freedom and shared accessibility; styled libraries are faster to start but hard to restyle deeply.",
        "**How much flexibility?** Primer allows `className` overrides as a 'safe way' to break rules {{src:primer-react-philosophy}}; stricter libraries forbid overrides to keep consistency.",
      ],
      alternativeModels: [
        "**Copy-in components** — source code copied into each product instead of installed; full control, but fixes no longer propagate.",
        "**Web components** — framework-independent custom elements, the route Shopify describes for Polaris {{src:shopify-polaris}}; portable across frameworks, with their own styling and SSR trade-offs.",
      ],
    },
  },

  application: {
    summary: ["Component libraries apply wherever more than one product or team builds interfaces from shared parts."],
    web: ["Publish as a package with per-component entry points, `'use client'` only where needed, and token-based styles."],
    mobile: ["Native libraries per platform share names, tokens and status with the web library."],
    enterprise: ["A small core team owns the base; product teams contribute through a reviewed process and wrap components for domain needs."],
    services: ["Non-digital touchpoints reuse the system's language, not the code library."],
    steps: [
      "Inventory existing components and duplicates.",
      "Choose build, buy or wrap per layer (behaviour, styling).",
      "Define ownership, statuses and release process.",
      "Publish components with documentation, design-tool parity and accessibility tests.",
      "Deprecate duplicates with warnings and migration guides.",
    ],
  },

  whenToUse: [
    "Several teams or products build interfaces from the same parts.",
    "Accessibility behaviour must be implemented once and shared.",
  ],
  whenNotToUse: [
    "A single short-lived prototype where a shared, versioned package costs more than it saves.",
    "As a substitute for the design system's decisions: a library without tokens, guidelines and ownership drifts quickly.",
  ],
  advantages: [
    "Fixes and accessibility improvements reach every product through one upgrade.",
    "Teams build faster with tested parts.",
    "Shared names connect design and code.",
  ],
  limitations: [
    "Needs a long-term owner; unmaintained libraries become obsolete.",
    "Adopting a third-party library couples you to its design and release plans.",
    "Headless libraries do not cover content, labels, page focus order or contrast.",
  ],
  misconceptions: [
    {
      myth: "The component library is the design system.",
      reality:
        "It is one layer. Tokens, guidelines, governance and the people who maintain them are also part of the system {{src:frost-2016}}.",
    },
    {
      myth: "Using a headless accessible library makes the product accessible.",
      reality:
        "It handles roles, states and keyboard behaviour of each widget {{src:radix-primitives}}, but labels, content, contrast and page-level focus order remain the product team's responsibility {{src:radix-composition}}.",
    },
  ],

  relations: [
    { target: "design-system", type: "applied-in", note: "The library is the code layer of the system." },
    { target: "atomic-design", type: "related-to", note: "Libraries are often organised from atoms to organisms." },
    { target: "semantic-tokens", type: "applied-in", note: "Library components consume semantic tokens." },
    { target: "primitive-tokens", type: "related-to", note: "Tokens beneath the library's styles." },
    { target: "component-architecture", type: "complementary-to", note: "How each component in the library is structured." },
    { target: "design-system-versioning", type: "related-to", note: "Releases and breaking changes of the library." },
  ],

  practice: {
    dos: [
      { text: "Give every component a status and publish breaking changes as major versions with a migration path.", why: "Consumers can plan upgrades; Primer's status model works this way {{src:primer-component-status}}.", kind: "system" },
      { text: "Build interactive components on a tested headless base, then add your tokens and variants.", why: "Shared ARIA roles, focus and keyboard behaviour come from one tested place {{src:radix-primitives}} {{src:react-aria}}.", kind: "industry" },
      { text: "Name components by what they are, not where they appear.", why: "Context-agnostic names make components reusable across products {{src:frost-2016}}.", kind: "industry" },
    ],
    donts: [
      { text: "Don't let product data fetching into shared presentational components.", why: "It couples the library to one product's data; Primer leaves data to product wrappers {{src:primer-react-philosophy}}.", kind: "system" },
      { text: "Don't change a primitive's element type without re-checking keyboard and roles.", why: "The author becomes responsible for accessibility when the element changes {{src:radix-composition}}; WCAG 2.2 SC 2.1.1 and 4.1.2 apply {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't ship the whole library to the client in a Server Components app.", why: "'use client' marks a module and all its dependencies as client code {{src:react-use-client}}; mark boundaries per component.", kind: "platform" },
    ],
    examples: [
      {
        title: "Wrapping a headless primitive with system tokens (React, Radix, 'use client' boundary)",
        language: "ts",
        code: `// packages/ui/src/dialog.tsx
"use client"; // interactive: focus trap, Escape, open state
import { Dialog as Primitive } from "radix-ui";
import type { ReactNode } from "react";

type DialogProps = {
  title: string;               // required: becomes the accessible name
  description?: string;
  trigger: ReactNode;
  children: ReactNode;
};

export function Dialog({ title, description, trigger, children }: DialogProps) {
  return (
    <Primitive.Root>
      <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Overlay className="ui-overlay" />
        <Primitive.Content className="ui-dialog">
          <Primitive.Title className="ui-dialog-title">{title}</Primitive.Title>
          {description && <Primitive.Description>{description}</Primitive.Description>}
          {children}
          <Primitive.Close className="btn btn-secondary">Close</Primitive.Close>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}

/* package.json: "sideEffects": ["*.css"], per-component "exports" entries
   so products import "@library/ui/dialog" and ship only what they use. */`,
        caption: "Illustrative. Behaviour and ARIA come from the primitive; the system adds a required title, tokens via classes and a client boundary in its own module.",
      },
      {
        title: "Component status and release record",
        language: "json",
        code: `{
  "component": "DatePicker",
  "status": "ready",
  "since": "3.0.0",
  "apgPattern": "dialog (modal) + grid",
  "owner": "design-system-core",
  "replaces": ["LoanDatePicker", "EventDatePicker"],
  "deprecated": { "LoanDatePicker": { "removeIn": "4.0.0", "migration": "docs/migrate/date-picker.md" } }
}`,
        caption: "Illustrative metadata. Status, owner, the APG pattern tested against and a dated deprecation path.",
      },
    ],
  },

  exercises: [
    {
      id: "component-libraries-ex-inventory",
      kind: "assignment",
      level: "beginner",
      title: "Count the duplicates",
      prompt: ["Pick two products from the same organisation. List every button, input and dialog variant you can find and mark duplicates that do the same job."],
      deliverable: "A table of components with duplicates grouped.",
      criteria: ["Components listed", "Duplicates grouped", "Differences noted"],
    },
    {
      id: "component-libraries-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Repair a failing library rollout",
      prompt: [
        "Illustrative case. A library app's shared library has no statuses or changelog. A minor release renamed the Dialog `open` prop and broke three products. The custom Combobox replaced its `<input>` with a `<div>` and lost keyboard support. Every page imports the whole package.",
        "Work through the correction sequence.",
      ],
      deliverable: "A corrected release, accessibility and packaging plan.",
      criteria: ["Versioning fixed", "Accessibility requirement named", "Bundle fixed", "Ownership stated"],
      exampleSolution: [
        "1. Symptoms: broken products after a minor release; inaccessible combobox; large bundles.",
        "2. Impact: lost trust in the library; keyboard users cannot choose a branch; slow pages.",
        "3. Causes: no semantic versioning; element changed without re-testing; single entry point.",
        "4. Requirements: keyboard operable [WCAG 2.2 SC 2.1.1, A]; name, role, value [SC 4.1.2, A]; APG combobox pattern.",
        "5. Correction: restore `open`, deprecate the new name, ship the rename in the next major with a codemod; rebuild Combobox on a headless primitive; add per-component exports and statuses.",
        "6. Validation: changelog review; keyboard and screen-reader test; bundle analysis per page.",
        "7. Trade-off: slower releases; acceptable for predictable upgrades.",
      ],
    },
    {
      id: "component-libraries-ex-decide",
      kind: "reflection",
      level: "advanced",
      title: "Build, buy or wrap",
      prompt: ["For a 40-person product organisation with a strong brand, compare adopting an opinionated library, wrapping a headless library and building from scratch. Cover accessibility, brand fit, bundle, RSC support, maintenance and exit cost."],
      deliverable: "A one-page decision record with a recommendation.",
      criteria: ["All six factors covered", "Exit cost considered", "Recommendation justified"],
    },
  ],

  quiz: [
    {
      id: "component-libraries-q-what",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What is the main benefit of a shared component library?",
      options: [
        { text: "Parts are built and tested once, and fixes reach every product through an upgrade", correct: true, explanation: "That is the library's core value." },
        { text: "Every product can look completely different", correct: false, explanation: "Libraries aim for consistency." },
        { text: "It removes the need for designers", correct: false, explanation: "Designers define and evolve the components." },
        { text: "It makes the product accessible automatically", correct: false, explanation: "It helps, but content, labels and contrast remain product work." },
      ],
      explanation: "Libraries share tested parts.",
    },
    {
      id: "component-libraries-q-headless",
      kind: "scenario",
      level: "intermediate",
      prompt: "A team with a strong brand wants accessible menus and dialogs without fighting another system's styles. What fits best?",
      options: [
        { text: "Wrap a headless library (behaviour and ARIA) with the team's own tokens and styles", correct: true, explanation: "Headless libraries ship behaviour without styles." },
        { text: "Adopt an opinionated library and override every style", correct: false, explanation: "Possible, but deep overrides are costly." },
        { text: "Build every widget from div elements", correct: false, explanation: "Re-implementing ARIA behaviour is hard and risky." },
        { text: "Copy components from another site", correct: false, explanation: "Licensing and maintenance problems." },
      ],
      explanation: "Headless separates behaviour from brand.",
    },
    {
      id: "component-libraries-q-rsc",
      kind: "critique",
      level: "advanced",
      prompt: "A library's index file starts with 'use client' and re-exports every component. What is the consequence in a Server Components app?",
      options: [
        { text: "Importing anything from the index marks the module and its dependencies as client code, so presentational components lose server rendering benefits", correct: true, explanation: "'use client' marks the module and its transitive dependencies." },
        { text: "Nothing; the directive is ignored in libraries", correct: false, explanation: "Bundlers honour it at the module boundary." },
        { text: "Components can no longer receive props", correct: false, explanation: "They can, if props are serialisable." },
        { text: "The app will not build", correct: false, explanation: "It builds, but ships more client code." },
      ],
      explanation: "Put client boundaries in per-component modules.",
    },
  ],

  flashcards: [
    { id: "component-libraries-fc-define", front: "Component library", back: "The packaged, versioned, documented code layer of a design system's reusable components." },
    { id: "component-libraries-fc-headless", front: "Headless vs opinionated", back: "Headless: behaviour and accessibility, no styles (Radix, React Aria, Ark UI). Opinionated: styled and ready (MUI, Chakra)." },
    { id: "component-libraries-fc-status", front: "Primer component statuses", back: "Experimental, Ready, Deprecated; breaking changes to Ready components bump the major version with a migration path." },
    { id: "component-libraries-fc-wcag", front: "WCAG 2.2 criteria every library widget must meet", back: "2.1.1 Keyboard (A), 4.1.2 Name, Role, Value (A), plus the matching APG pattern's keyboard model." },
  ],

  references: [
    { source: "frost-2016", role: "primary", note: "Pattern/component libraries; frameworks' pros and cons; making the system official." },
    { source: "primer-react-philosophy", role: "primary", note: "Presentational scope; component types; safe flexibility." },
    { source: "primer-component-status", role: "primary", note: "Statuses and breaking-change policy." },
    { source: "radix-primitives", role: "explanatory", note: "Headless, WAI-ARIA, tree-shakeable." },
    { source: "radix-composition", role: "explanatory", note: "asChild and accessibility responsibility." },
    { source: "react-aria", role: "explanatory", note: "Style-free components following APG." },
    { source: "ark-ui", role: "explanatory", note: "Headless across frameworks; state machines." },
    { source: "mui-overview", role: "explanatory", note: "Opinionated Material Design library." },
    { source: "chakra-ui-installation", role: "explanatory", note: "Runtime styling and its planned change." },
    { source: "shopify-polaris", role: "explanatory", note: "Polaris built on web components." },
    { source: "react-use-client", role: "explanatory", note: "Client boundaries in RSC apps." },
    { source: "semver-2", role: "explanatory", note: "Semantic versioning." },
    { source: "w3c-apg-keyboard", role: "explanatory", note: "Keyboard interface practices." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 2.1.1, 4.1.2." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Documented practice from design-system and library documentation and Frost's book. Benefits are practitioner-reported; no controlled comparison of build, buy and headless strategies was found. Keyboard and name–role–value are WCAG 2.2 success criteria.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
