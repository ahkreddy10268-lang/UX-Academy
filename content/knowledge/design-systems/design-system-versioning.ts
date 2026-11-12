import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "design-system-versioning",
  slug: "design-system-versioning",
  title: "Design System Versioning",
  alternateNames: ["Semantic versioning for design systems", "Release management", "Changelogs", "Deprecation policy"],
  summary:
    "Numbering and releasing a design system so consumers know what each upgrade will cost: Semantic Versioning applied to component APIs, tokens and visual behaviour, with changelogs, deprecations and migration tools.",
  definition:
    "Design system versioning applies **Semantic Versioning** — MAJOR for incompatible changes, MINOR for backward-compatible additions, PATCH for backward-compatible fixes, relative to a declared public API {{src:semver-2}} — to everything consumers depend on: **component props and behaviour**, **token names and values**, **layout and spacing contracts** and **accessibility semantics**. The hard part is deciding what counts as the public API of a visual system, and therefore what is breaking. Versioning is supported by **changelogs**, **deprecation releases**, **codemods** and, in large organisations, support for more than one major version at a time.",
  primaryType: "strategy",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "operations",
  tags: ["semver", "semantic versioning", "breaking change", "changelog", "Changesets", "codemod", "deprecation", "monorepo", "release"],
  difficulty: "advanced",
  disciplines: ["Front-end engineering", "Design systems", "Release management"],
  learningObjectives: [
    "Apply MAJOR.MINOR.PATCH to component, token and visual changes.",
    "Classify borderline changes (layout shifts, token value changes, ARIA changes).",
    "Run releases with changesets, changelogs and deprecation windows.",
    "Plan migrations with codemods, token aliases and parallel major versions.",
  ],
  prerequisites: ["component-libraries", "component-properties", "design-governance"],

  levels: {
    beginner: {
      explanation: [
        "The library app's catalogue team upgraded the design system from 3.4 to 3.5 on a Friday. Their 'Reserve' buttons lost their icons and the search field shrank. The release notes said only 'improvements'. The team rolled back and stopped upgrading for months.",
        "**Versioning** gives each release a number that tells consumers how risky it is. In Semantic Versioning the number has three parts: MAJOR.MINOR.PATCH. A *patch* (3.4.2 → 3.4.3) only fixes things; a *minor* (3.4 → 3.5) adds things without breaking anything; a *major* (3 → 4) may break things and needs work to adopt.",
        "The number is a promise. When a minor release breaks something, consumers stop trusting upgrades, fall behind, and the system splinters.",
      ],
      analogy:
        "Version labels on software you install: an update from 2.1.3 to 2.1.4 is a quick fix you accept without thinking; a move from 2 to 3 is something you read about first.",
      everydayExamples: [
        "An app store update note: 'Bug fixes'.",
        "A 'version 4.0 — what's changed' migration guide.",
        "A warning: 'This component is deprecated and will be removed in version 5'.",
      ],
      vocabulary: [
        { term: "Major version", meaning: "A release that may require consumers to change their code." },
        { term: "Minor version", meaning: "A release that adds features without breaking existing use." },
        { term: "Patch version", meaning: "A release that only fixes bugs without breaking anything." },
        { term: "Changelog", meaning: "The list of what changed in each release." },
        { term: "Migration", meaning: "The work consumers do to move to a new major version." },
      ],
    },
    intermediate: {
      explanation: [
        "**The public API of a design system.** SemVer requires a declared public API and increments the MAJOR version for incompatible changes {{src:semver-2}}. For a design system the API includes component names, props and their types, events, slots, default behaviour, token names, exported CSS custom properties and class names, keyboard behaviour and ARIA semantics. Version 0.y.z is for initial development, when anything may change {{src:semver-2}}; 1.0.0 is the point at which the system promises stability.",
        "**Classifying changes.** Removing or renaming a prop, token or class: MAJOR. Changing a default that alters layout or behaviour (a button becoming full width, a dialog no longer closing on Escape): MAJOR. Adding an optional prop, a new variant or a new token: MINOR. Fixing a bug so the component matches its documented behaviour, or a colour fix that keeps contrast: PATCH. Changing a token's *value* is the grey zone: a small visual refinement is usually a minor or patch with a visual-regression note; a value change that alters size, spacing or contrast enough to break layouts or WCAG conformance is MAJOR in practice.",
        "**Deprecation before removal.** SemVer's FAQ: update documentation and release a minor with the deprecation in place; there should be at least one such minor before removal in a major {{src:semver-2}}. Primer shows a warning to consumers of deprecated components and documents alternatives {{src:primer-component-status}}.",
        "**Release communication.** Changesets lets each contributor record a version type and changelog text with their change; the release step consumes them, bumps versions and writes the changelog {{src:changesets}}. A release note template — summary, breaking changes with migration steps, deprecations with removal version, new features, fixes, visual changes with screenshots — gives designers and engineers the same picture.",
      ],
      howItWorks: [
        "The version number compresses 'how much work is this upgrade?' into one comparable signal, so teams can upgrade patches and minors routinely and plan majors.",
        "Deprecation releases turn a breaking change into a staged migration: teams see warnings, move at their own pace within a window, and the removal arrives as expected.",
      ],
      implementation: [
        "Declare the public API in documentation: components, props, tokens, CSS variables, keyboard and ARIA behaviour.",
        "Classify every change with a matrix and record it in a changeset at the time of the change {{src:changesets}}.",
        "Deprecate in a minor (docs + console or lint warning) before removing in a major {{src:semver-2}}.",
        "Treat accessibility regressions as breaking: a change that drops contrast below WCAG 2.2 thresholds [SC 1.4.3, 1.4.11] or removes keyboard support [SC 2.1.1] must not ship in a minor or patch {{src:w3c-wcag-22}}.",
        "Publish release notes with migration steps and before/after screenshots for visual changes.",
        "Decide package strategy: one versioned package, or independently versioned packages in a monorepo.",
      ],
      scenarios: [
        "**Illustrative.** 3.5 removed the Button `icon` prop in favour of a `startIcon` slot. Correct handling: 3.5 adds `startIcon` and deprecates `icon` with a warning; 4.0 removes `icon` and ships a codemod. The catalogue team upgrades to 3.5 safely and migrates before 4.0.",
        "**Illustrative.** A token `space.inset.field` changes from 12 px to 8 px to tighten forms. Visual tests show the search field shrinks in three products; the team ships it as part of a major with a note and screenshots, instead of a 'refinement' minor.",
        "**Handoff ritual.** Before each release, designer and engineer review the changeset list together, confirm each classification against the matrix, and attach screenshots for every visual change.",
      ],
    },
    advanced: {
      explanation: [
        "**Monorepo strategies.** Independent versioning gives each package (tokens, icons, react, web components) its own version and lets consumers upgrade parts; fixed versioning releases all packages together at one number, which is easier to reason about. Changesets focuses on monorepos and keeps dependent packages up to date as versions change {{src:changesets}}. A release takes the largest bump among its changes: a patch and a minor make a minor release.",
        "**Codemods.** Mechanical migrations — renamed props, moved imports, replaced components — can be automated with AST transforms. jscodeshift runs a transform over many JavaScript or TypeScript files and uses recast to preserve the original code style {{src:jscodeshift}}. Ship codemods with the major, and keep them idempotent so they can run twice safely.",
        "**Token deprecation aliases.** Rename a token by keeping the old name as an alias of the new one and marking it deprecated; DTCG tokens can reference other tokens and carry `$deprecated` {{src:dtcg-format-2025}}. Build tooling can warn on use of deprecated names, and the alias is removed in the next major.",
        "**Parallel majors.** Large organisations often run two majors at once: the previous major receives security and accessibility fixes for a stated period while teams migrate. Publish the support window and track how many consumers remain on each major; the old line closes when adoption of the new one reaches an agreed threshold.",
      ],
      evidence: [
        "Versioning practice is grounded in the **Semantic Versioning 2.0.0 specification** (a community specification, not a standards-body standard) {{src:semver-2}}, Primer's status and deprecation policy {{src:primer-component-status}}, tool documentation for Changesets and jscodeshift {{src:changesets}} {{src:jscodeshift}} and the DTCG format's references and deprecation property {{src:dtcg-format-2025}}. How to classify visual changes is practitioner judgement; no controlled study was found.",
      ],
      debates: [
        "**Are visual changes breaking?** Strict teams treat any visible change as major; others reserve major for API and layout-breaking changes. The policy must be written down either way.",
        "**Independent or fixed versions?** Independent versions minimise churn; fixed versions avoid incompatible combinations.",
        "**Calendar or semantic versions?** Some systems release on a schedule; semantic numbers still communicate risk better.",
      ],
      alternativeModels: [
        "**Evergreen (no versions)** — consumers always load the latest from a CDN; no upgrade work, no control over timing.",
        "**Copy-in components** — consumers own copied source; no breaking upgrades, no automatic fixes.",
      ],
    },
  },

  application: {
    summary: ["Versioning applies to every package a design system publishes: tokens, icons, components and documentation."],
    web: ["Changesets in pull requests; release automation; deprecation warnings; codemods for majors; token aliases."],
    mobile: ["Platform packages follow the same classification; app-store release cycles lengthen migration windows."],
    enterprise: ["Published support windows for previous majors; adoption tracking per major."],
    services: ["Design-tool libraries publish versions in step with code, with the same notes."],
    steps: [
      "Declare the public API.",
      "Adopt a change-classification matrix.",
      "Record a changeset with every change.",
      "Deprecate in minors; remove in majors with codemods.",
      "Publish notes with migration steps and screenshots.",
      "Track adoption per major and close old lines on schedule.",
    ],
  },

  whenToUse: [
    "From the first release that another team consumes.",
    "Whenever tokens, components or design-tool libraries are distributed.",
  ],
  whenNotToUse: [
    "As a substitute for communication: a number without notes still surprises people.",
    "To hide breaking changes in minors because majors feel expensive.",
  ],
  advantages: [
    "Upgrade risk is visible at a glance.",
    "Staged deprecations make breaking changes manageable.",
    "Automated changelogs and codemods reduce migration cost.",
  ],
  limitations: [
    "Classifying visual changes requires judgement.",
    "Parallel majors double maintenance.",
    "Codemods cannot migrate every case; manual review remains.",
  ],
  misconceptions: [
    {
      myth: "Only code changes can be breaking.",
      reality:
        "Token value changes that alter layout, defaults that change behaviour, and accessibility regressions break consumers too, and should be treated as major.",
    },
  ],

  relations: [
    { target: "component-properties", type: "applied-in", note: "Prop changes are the most common breaking changes." },
    { target: "component-libraries", type: "applied-in", note: "Library packages are versioned and released." },
    { target: "design-governance", type: "complementary-to", note: "Governance decides; versioning communicates." },
    { target: "design-tokens", type: "applied-in", note: "Token names and values are part of the public API." },
    { target: "theme-architecture", type: "related-to", note: "Theme token changes need the same classification." },
    { target: "design-qa", type: "complementary-to", note: "Visual regression tests reveal unintended visual changes." },
  ],

  practice: {
    dos: [
      { text: "Declare the public API — props, tokens, CSS variables, keyboard and ARIA behaviour — and version against it.", why: "SemVer requires a declared public API {{src:semver-2}}.", kind: "industry" },
      { text: "Record a version type and changelog text with every change.", why: "Changesets consumes them to bump versions and write changelogs {{src:changesets}}.", kind: "industry" },
      { text: "Deprecate in a minor with warnings, remove in a major with a codemod.", why: "SemVer's deprecation guidance {{src:semver-2}}; jscodeshift automates mechanical migrations {{src:jscodeshift}}.", kind: "industry" },
    ],
    donts: [
      { text: "Don't ship layout-changing token values or default changes in a minor.", why: "Consumers' layouts break while the number promises compatibility.", kind: "system" },
      { text: "Don't treat accessibility regressions as patches.", why: "Losing contrast or keyboard support breaks WCAG 2.2 conformance (SC 1.4.3, 1.4.11, 2.1.1) for every consumer {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't rename tokens without an alias.", why: "Every consumer breaks at once; a deprecated alias referencing the new name gives a window {{src:dtcg-format-2025}}.", kind: "industry" },
    ],
    examples: [
      {
        title: "Breaking-change classification matrix",
        language: "text",
        code: `Change                                                   Bump    Notes
------------------------------------------------------   -----   ---------------------------------------
Remove or rename a prop, slot, event, token, class        MAJOR   deprecate in a minor first; ship codemod
Change a default that alters layout or behaviour           MAJOR   e.g. Dialog stops closing on Escape
Accessibility regression (contrast, keyboard, ARIA)        MAJOR*  *better: don't ship it at all
Token value change that alters size/spacing/contrast       MAJOR   attach before/after screenshots
Add optional prop, variant, token, component (trial)       MINOR
Deprecate prop/token/component (with warning + docs)       MINOR   removal version stated
Fix to match documented behaviour or spec                  PATCH
Small visual refinement, contrast kept, layout unchanged   PATCH   visual-regression baseline updated
Docs-only change                                           none    no changeset needed`,
        caption: "Illustrative policy. The judgement calls are written down so every release is classified the same way.",
      },
      {
        title: "A changeset, a token alias and a codemod",
        language: "ts",
        code: `// .changeset/brave-buttons.md
// ---
// "@library/ui": minor
// ---
// Button: add \`startIcon\` slot. Deprecate \`icon\` (removed in 5.0.0). Run \`npx @library/codemods button-icon\`.

// tokens: old name kept as a deprecated alias of the new one (DTCG reference)
// "space": { "inset": {
//   "field":  { "$value": "{space.150}", "$type": "dimension" },
//   "input":  { "$value": "{space.inset.field}", "$deprecated": "Use space.inset.field; removed in 5.0.0" } } }

// codemods/button-icon.ts — jscodeshift transform: <Button icon={X}> → <Button startIcon={X}>
import type { API, FileInfo } from "jscodeshift";
export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  return j(file.source)
    .findJSXElements("Button")
    .find(j.JSXAttribute, { name: { name: "icon" } })
    .forEach((p) => { p.node.name.name = "startIcon"; })
    .toSource();                                   // idempotent: a second run finds nothing
}`,
        caption: "Illustrative. The minor adds and deprecates; the major removes, with a codemod and an alias period for tokens.",
      },
    ],
  },

  exercises: [
    {
      id: "design-system-versioning-ex-classify",
      kind: "assignment",
      level: "beginner",
      title: "Classify the changes",
      prompt: ["Classify each as major, minor or patch: (a) add a 'size' prop with a default; (b) rename 'variant' to 'tone'; (c) fix a focus ring that was not showing; (d) remove the old Card component; (e) add a new Badge component."],
      deliverable: "Five classifications with one-line reasons.",
      criteria: ["Correct bumps", "Reasons reference compatibility"],
      exampleSolution: ["(a) minor — optional addition. (b) major — rename breaks consumers (deprecate first). (c) patch — fix to documented behaviour. (d) major — removal. (e) minor — addition."],
    },
    {
      id: "design-system-versioning-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Undo a breaking minor",
      prompt: [
        "Illustrative case. Release 3.5.0 removed Button's `icon` prop, reduced `space.inset.field` from 12 px to 8 px and changed the secondary button's text colour to a grey with 3.9:1 contrast. Notes said 'improvements'. Two products broke.",
        "Work through the correction sequence.",
      ],
      deliverable: "A corrected release plan: 3.5.1, 3.6.0 and 4.0.0 contents.",
      criteria: ["Breaking items moved to a major", "Deprecation path", "Accessibility regression reverted", "Notes rewritten"],
      exampleSolution: [
        "1. Symptoms: broken layouts, missing icons, low-contrast text, uninformative notes.",
        "2. Impact: products roll back and stop upgrading; users get unreadable secondary buttons.",
        "3. Causes: no classification policy; no deprecation; no visual or contrast checks before release.",
        "4. Requirements: SemVer — breaking changes only in majors, deprecate first; text contrast 4.5:1 [WCAG 2.2 SC 1.4.3, AA].",
        "5. Correction: 3.5.1 restores `icon`, the 12 px token and the passing text colour; 3.6.0 adds `startIcon`, deprecates `icon`, adds an alias for the new spacing token; 4.0.0 removes `icon`, applies the spacing change with screenshots and a codemod.",
        "6. Validation: visual regression and contrast checks in CI; changeset review against the matrix.",
        "7. Trade-off: the spacing improvement waits for 4.0; trust in minor upgrades is restored.",
      ],
    },
    {
      id: "design-system-versioning-ex-parallel",
      kind: "reflection",
      level: "advanced",
      title: "Plan a two-major support window",
      prompt: ["Design the support policy for running v4 and v5 in parallel: what v4 still receives, for how long, how adoption is tracked, and the criteria for closing v4."],
      deliverable: "A support policy with metrics and exit criteria.",
      criteria: ["Scope of fixes defined", "Window stated", "Adoption metric", "Exit criteria"],
    },
  ],

  quiz: [
    {
      id: "design-system-versioning-q-parts",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In version 3.4.2, which number changes when a release only fixes bugs without breaking anything?",
      options: [
        { text: "The last one: 3.4.3", correct: true, explanation: "PATCH." },
        { text: "The middle one: 3.5.0", correct: false, explanation: "That is MINOR, for additions." },
        { text: "The first one: 4.0.0", correct: false, explanation: "That is MAJOR, for breaking changes." },
        { text: "None", correct: false, explanation: "Every release gets a new number." },
      ],
      explanation: "MAJOR.MINOR.PATCH.",
    },
    {
      id: "design-system-versioning-q-token",
      kind: "scenario",
      level: "intermediate",
      prompt: "A spacing token's value changes from 12 px to 8 px and visual tests show three products' forms shrink. How should it ship?",
      options: [
        { text: "In a major, with screenshots and notes", correct: true, explanation: "Layout-breaking value changes are breaking in practice." },
        { text: "In a patch, since only a value changed", correct: false, explanation: "Consumers' layouts break." },
        { text: "Silently", correct: false, explanation: "Unannounced visual changes break trust." },
        { text: "In a minor, since the name is unchanged", correct: false, explanation: "Names are not the only contract." },
      ],
      explanation: "The public API includes layout contracts.",
    },
    {
      id: "design-system-versioning-q-release",
      kind: "formula",
      level: "advanced",
      prompt: "Version 3.4.2 ships three changesets: patch, minor, patch. What is the new version?",
      options: [
        { text: "3.5.0 — the release takes the largest bump and resets the patch", correct: true, explanation: "minor wins; PATCH resets to 0." },
        { text: "3.4.5", correct: false, explanation: "Bumps do not add up." },
        { text: "3.5.2", correct: false, explanation: "Lower parts reset." },
        { text: "4.0.0", correct: false, explanation: "No major change." },
      ],
      explanation: "Largest bump wins; lower parts reset.",
    },
  ],

  flashcards: [
    { id: "design-system-versioning-fc-semver", front: "SemVer increments", back: "MAJOR: incompatible API change. MINOR: backward-compatible addition. PATCH: backward-compatible fix." },
    { id: "design-system-versioning-fc-api", front: "A design system's public API", back: "Component names, props, slots, events, defaults, token names and values that affect layout, CSS variables, classes, keyboard and ARIA behaviour." },
    { id: "design-system-versioning-fc-deprecate", front: "SemVer deprecation rule", back: "Document and release a minor with the deprecation; at least one such minor before removal in a major." },
    { id: "design-system-versioning-fc-tools", front: "Migration tooling", back: "Changesets for version types and changelogs; jscodeshift codemods for prop renames; DTCG aliases with $deprecated for tokens." },
  ],

  references: [
    { source: "semver-2", role: "primary", note: "Increments, public API, deprecation, 0.y.z." },
    { source: "changesets", role: "primary", note: "Changesets workflow." },
    { source: "jscodeshift", role: "primary", note: "Codemods." },
    { source: "primer-component-status", role: "explanatory", note: "Deprecation warnings; majors with migration paths." },
    { source: "dtcg-format-2025", role: "explanatory", note: "References and $deprecated." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.3, 1.4.11, 2.1.1 as non-regression constraints." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Grounded in the SemVer 2.0.0 community specification and tool documentation; classification of visual changes is practitioner judgement without controlled study.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-12",
});
