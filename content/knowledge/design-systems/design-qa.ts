import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "design-qa",
  slug: "design-qa",
  title: "Design QA",
  alternateNames: ["Design quality assurance", "Design review", "Design-to-code parity", "Visual QA", "UI acceptance"],
  summary:
    "Checking, before release, that what was built matches what was designed and meets the system's rules — tokens, type, spacing, breakpoints, states and accessibility — using a mix of human review and automated gates.",
  definition:
    "Design QA is the **pre-release verification that an implementation matches its design and the design system's rules**. It covers **parity** (spacing, type, colour and layout match the spec and use tokens), **states** (hover, focus, disabled, loading, empty, error), **responsive behaviour** at each breakpoint and **accessibility** (WCAG 2.2 AA). It combines human review with automated gates: lint rules that block hard-coded values, visual regression tests {{src:playwright-snapshots}}, interaction tests {{src:storybook-interaction-tests}} and automated accessibility checks {{src:axe-core}}. Automation catches regressions; people judge intent, content and the parts of accessibility tools cannot test {{src:w3c-wcag-em-2}}.",
  primaryType: "strategy",
  secondaryTypes: ["method"],
  domain: "design-systems",
  subcategory: "operations",
  tags: ["design QA", "design review", "visual regression", "Playwright", "Chromatic", "Storybook", "stylelint", "axe-core", "accessibility testing", "parity"],
  difficulty: "intermediate",
  disciplines: ["Design systems", "Front-end engineering", "Accessibility", "Quality assurance"],
  learningObjectives: [
    "Run a structured design-QA review covering parity, states, breakpoints and accessibility.",
    "Decide what to automate and what needs human judgement.",
    "Set up lint rules, visual regression and interaction tests as CI gates.",
    "Combine automated accessibility checks with manual evaluation.",
  ],
  prerequisites: ["design-tokens", "component-properties", "spacing-scales"],

  levels: {
    beginner: {
      explanation: [
        "The library app's new 'Holds' page shipped with a button 2 px taller than every other button, a grey label that was hard to read, and no visible focus ring. Each was small; together they made the page feel unfinished, and the focus problem made it unusable for keyboard users.",
        "**Design QA** is checking the built thing against the design and the system's rules before release. A designer and a developer look at it together on real devices, in every state (hover, focus, error, empty), at phone and desktop sizes, and with a keyboard and screen reader.",
        "Machines can check some things — a colour that is not a token, a screenshot that changed, an image without alt text — every time code changes. People check the rest: does it look and behave as intended, and does it make sense?",
      ],
      analogy:
        "A building inspection before people move in: some checks are measurements with instruments, others are an inspector walking through the rooms. Both are needed, and both happen before the keys are handed over.",
      everydayExamples: [
        "A designer reviewing a page on a phone before launch.",
        "A test that fails because a screenshot changed unexpectedly.",
        "A pull request blocked because it used a colour that is not a design token.",
      ],
      vocabulary: [
        { term: "Design QA", meaning: "Checking the built interface against the design and system rules before release." },
        { term: "Parity", meaning: "The build matching the design in spacing, type, colour and behaviour." },
        { term: "Visual regression test", meaning: "An automated comparison of new screenshots against approved ones." },
        { term: "Lint rule", meaning: "An automatic check on code, such as 'no hard-coded colours'." },
        { term: "Accessibility check", meaning: "Testing against WCAG, partly automated and partly by hand." },
      ],
    },
    intermediate: {
      explanation: [
        "**A review checklist.** (1) Tokens: every colour, space, radius, shadow and type style comes from tokens. (2) Layout and spacing at each breakpoint and at 320 CSS px. (3) States: default, hover, focus-visible, active, disabled, loading, empty, error. (4) Content: real text lengths, translations, truncation. (5) Accessibility: keyboard path, focus visibility, names, contrast, zoom to 200%, reduced motion. (6) Behaviour against the spec and the APG pattern. Record findings with severity and a screenshot.",
        "**Pair review ritual.** The designer and the engineer review together on the deployed preview, not in the design file: the designer brings the spec and intent, the engineer explains constraints. Findings go into the pull request, so fixes happen before merge rather than after release.",
        "**What tools catch.** axe-core includes rules for WCAG 2.0–2.2 at A, AA and AAA and, by Deque's own figure, finds on average 57% of WCAG issues automatically; it marks uncertain results 'incomplete' for manual review {{src:axe-core}}. The W3C's WCAG-EM notes that most accessibility checks are not fully automatable, though tools help evaluators {{src:w3c-wcag-em-2}}. Automated checks therefore gate regressions; they do not establish conformance.",
        "**Treat findings as system feedback.** Repeated parity issues of the same kind (a missing token, an awkward component API) are signals for the system team, not just for the product team.",
      ],
      howItWorks: [
        "Automated gates run on every change, so known classes of error (hard-coded values, visual drift, missing names) cannot reach production silently.",
        "Human review covers intent, content and context, and the accessibility checks that require judgement, where most real problems are found.",
      ],
      implementation: [
        "Adopt a written QA checklist and severity scale; attach it to every pull request with UI changes.",
        "Lint styles: Stylelint's built-in `color-no-hex` disallows hex colours {{src:stylelint-color-no-hex}} and `declaration-property-unit-disallowed-list` can forbid px for font-size so text follows user settings {{src:stylelint-unit-disallowed-list}}.",
        "Visual regression: compare screenshots of components and key pages in every theme and breakpoint; Playwright's `toHaveScreenshot()` creates references on first run and compares later runs, and baselines must be generated in the same environment the tests run in {{src:playwright-snapshots}}.",
        "Interaction tests: Storybook play functions simulate clicks and typing and assert on results, and can run in CI {{src:storybook-interaction-tests}}.",
        "Accessibility: run axe-core on every story and page as a gate {{src:axe-core}}, then manual keyboard, screen-reader, zoom and reduced-motion checks against WCAG 2.2 AA (for example SC 2.4.7 Focus Visible, 1.4.3 Contrast, 2.5.8 Target Size) {{src:w3c-wcag-22}}.",
      ],
      scenarios: [
        "**Illustrative.** The Holds page review finds: button height off by 2 px (padding not from tokens), label at 3.1:1 (raw grey), no focus ring (outline removed). A lint rule now blocks raw colours and px font sizes; the button uses the shared component; a visual baseline is added for the page in both themes.",
        "**Illustrative.** A refactor changes every secondary button's border colour. Visual regression flags 40 screenshots; the reviewer approves the intended change in one place and updates baselines, instead of discovering it in production.",
        "**Handoff ritual.** Designer and engineer walk the preview together at 1440 px and 390 px, light and dark, by keyboard first, then mouse; each finding is logged with severity, screenshot and owner.",
      ],
    },
    advanced: {
      explanation: [
        "**CI pipeline.** On each pull request: type check → lint (styles and scripts, including bans on raw values and on deprecated components) → unit and interaction tests → visual regression across themes and breakpoints → axe-core on every story and key route → build. Failures block merge; visual diffs require an explicit approval. Chromatic, from the Storybook team, offers hosted snapshotting of UI states on each commit with reviewer sign-off {{src:chromatic-docs}}; Playwright snapshots are the self-hosted alternative {{src:playwright-snapshots}}.",
        "**Flake control.** Visual tests fail on font loading, animation and environment differences. Playwright warns that rendering varies by OS, browser version, hardware and headless mode {{src:playwright-snapshots}}: pin the environment, disable animations (`prefers-reduced-motion`), wait for fonts and use small, explicit tolerances.",
        "**Lint as contract.** Script rules (for example ESLint's `no-restricted-imports` against deprecated components, or restricted syntax against inline style colours) and style rules enforce the token contract in code; together with design-tool library analytics they show where the system is bypassed ([[design-system-audits]]).",
        "**Telemetry.** Signals to track: escaped defects found after release by category; share of PRs with visual diffs approved vs rejected; lint-rule violations over time; axe violations per release; manual accessibility findings per release by WCAG criterion.",
      ],
      evidence: [
        "Design QA is **practitioner consensus** supported by tool documentation (Playwright, Storybook, Chromatic, Stylelint, axe-core) {{src:playwright-snapshots}} {{src:storybook-interaction-tests}} {{src:chromatic-docs}} {{src:stylelint-color-no-hex}} {{src:axe-core}} and W3C guidance on conformance evaluation {{src:w3c-wcag-em-2}}. The 57% figure is Deque's own claim for axe-core, not an independent measurement. No controlled study of design-QA processes was found.",
      ],
      debates: [
        "**Pixel parity or intent parity?** Insisting on pixel-perfect matches wastes time where the design was approximate; checking intent (tokens, hierarchy, behaviour) catches what matters.",
        "**Who owns QA?** Designers, engineers or a QA role; shared ownership in the pull request works best when the checklist is explicit.",
        "**How strict are visual tests?** Zero-tolerance diffs are noisy; loose tolerances miss real regressions.",
      ],
      alternativeModels: [
        "**Usability testing** — checks whether people can use it, which design QA does not ([[usability-testing]]).",
        "**Heuristic evaluation** — expert review against principles rather than against a spec ([[heuristic-evaluation]]).",
      ],
    },
  },

  application: {
    summary: ["Design QA applies to every UI change before release, and to the design system's own components most of all."],
    web: ["Stylelint and ESLint token rules, Playwright or Chromatic visual tests, Storybook interaction tests, axe-core gates, manual keyboard and screen-reader passes."],
    mobile: ["Device-farm screenshots, platform accessibility inspectors, real-device reviews."],
    enterprise: ["Shared checklist and severity scale across teams; system team reviews recurring findings."],
    services: ["QA of printed and email outputs against the same tokens and content rules."],
    steps: [
      "Write the QA checklist and severity scale.",
      "Add lint rules for raw values and deprecated components.",
      "Add visual regression for components and key pages in every theme and breakpoint.",
      "Add interaction tests and axe-core gates in CI.",
      "Hold a pair review on the preview before merge, including manual accessibility checks.",
      "Feed recurring findings back to the system team.",
    ],
  },

  whenToUse: [
    "Before every release that changes UI.",
    "When the design system itself changes, across all consuming surfaces.",
  ],
  whenNotToUse: [
    "As a substitute for usability testing: matching the spec does not prove the design works for people.",
    "As a claim of WCAG conformance based on automated results alone.",
  ],
  advantages: [
    "Catches drift and regressions before users do.",
    "Makes token and component use enforceable.",
    "Gives designers and engineers a shared quality bar.",
  ],
  limitations: [
    "Automated tools catch only part of accessibility problems.",
    "Visual tests need stable environments and maintenance.",
    "Human review takes time and depends on the checklist's quality.",
  ],
  misconceptions: [
    {
      myth: "If axe-core passes, the page is accessible.",
      reality:
        "Automated checks find part of the issues (Deque states about 57% on average) and flag uncertain cases for manual review {{src:axe-core}}; WCAG-EM notes most checks are not fully automatable {{src:w3c-wcag-em-2}}.",
    },
  ],

  relations: [
    { target: "design-tokens", type: "measured-by", note: "Lint rules check token use." },
    { target: "component-libraries", type: "applied-in", note: "Library components carry the strictest QA gates." },
    { target: "design-system-audits", type: "complementary-to", note: "QA prevents drift; audits measure what drift exists." },
    { target: "design-system-versioning", type: "complementary-to", note: "Visual diffs inform release classification." },
    { target: "wcag", type: "measured-by", note: "Accessibility checks against WCAG 2.2." },
    { target: "design-language", type: "derived-from", note: "QA checks intent as well as values." },
  ],

  practice: {
    dos: [
      { text: "Block raw colours and px font sizes in style lint.", why: "Stylelint's built-in rules enforce the token contract {{src:stylelint-color-no-hex}} {{src:stylelint-unit-disallowed-list}}.", kind: "industry" },
      { text: "Run visual regression in every theme and at least two breakpoints, in a pinned environment.", why: "Rendering varies by environment; baselines must match it {{src:playwright-snapshots}}.", kind: "platform" },
      { text: "Gate on axe-core and then test manually with keyboard, screen reader, 200% zoom and reduced motion.", why: "Automated checks find part of the issues {{src:axe-core}}; conformance needs manual evaluation {{src:w3c-wcag-em-2}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't approve visual diffs in bulk without looking.", why: "Unintended changes slip through as 'expected'.", kind: "team" },
      { text: "Don't review only in the design tool.", why: "Real content, states, breakpoints and assistive technology only show up in the build.", kind: "industry" },
      { text: "Don't claim WCAG conformance from automated results.", why: "Most checks are not fully automatable {{src:w3c-wcag-em-2}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "Stylelint rules that enforce tokens",
        language: "json",
        code: `{
  "rules": {
    "color-no-hex": true,
    "color-named": "never",
    "declaration-property-unit-disallowed-list": {
      "font-size": ["px"],
      "/^(margin|padding|gap)/": ["px"]
    },
    "function-disallowed-list": ["rgb", "rgba", "hsl", "hsla"]
  },
  "ignoreFiles": ["app/globals.css"]
}`,
        caption: "Illustrative. Raw colours and px sizes are allowed only in the token file; everywhere else must use var(--token).",
      },
      {
        title: "Playwright: visual regression and axe gate per component state",
        language: "ts",
        code: `import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const states = ["default", "focus", "disabled", "loading", "error"] as const;
for (const theme of ["light", "dark"] as const) {
  for (const state of states) {
    test(\`button \${state} \${theme}\`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });  // no animation flake
      await page.goto(\`/iframe.html?id=button--\${state}\`);
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(\`button-\${state}-\${theme}.png\`, { maxDiffPixelRatio: 0.001 });
      const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
      expect(violations).toEqual([]);                 // gate; manual review still required
    });
  }
}`,
        caption: "Illustrative. Baselines are generated in the same CI image the tests run in.",
      },
    ],
  },

  exercises: [
    {
      id: "design-qa-ex-checklist",
      kind: "assignment",
      level: "beginner",
      title: "Review one screen",
      prompt: ["Pick one screen of an app. Check it against the six-part checklist (tokens, layout, states, content, accessibility, behaviour) on a phone and a desktop. Log each finding with severity and a screenshot."],
      deliverable: "A findings log.",
      criteria: ["All six parts covered", "Severity assigned", "Keyboard check included"],
    },
    {
      id: "design-qa-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix the Holds page escape",
      prompt: [
        "Illustrative case. The Holds page shipped with a 2 px taller button, a #949494 label (3.03:1 on white), no focus ring and a layout that overflows at 320 px. The team had a passing axe run and a design-file review only.",
        "Work through the correction sequence.",
      ],
      deliverable: "Fixes plus process changes that would have caught each issue.",
      criteria: ["Each defect fixed", "Gate added per defect class", "Manual checks scheduled"],
      exampleSolution: [
        "1. Symptoms: inconsistent button, low-contrast label, invisible focus, horizontal scroll on phones.",
        "2. Impact: unfinished look; label hard to read; keyboard users lost; phone users scroll sideways.",
        "3. Causes: custom padding; raw grey; outline removed; no 320 px check; review in the design tool only.",
        "4. Requirements: text 4.5:1 [WCAG 2.2 SC 1.4.3, AA]; focus visible [SC 2.4.7, AA]; reflow at 320 CSS px [SC 1.4.10, AA].",
        "5. Correction: shared Button; label uses text.subtle (#6b6a64, 5.43:1); restore focus ring token; fix layout. Process: color-no-hex lint; visual tests at 390 and 1440 in both themes; manual keyboard and 320 px pass in the PR checklist.",
        "6. Validation: CI gates fail on reintroduced defects; next release has a pair review on the preview.",
        "7. Trade-off: slower PRs at first; fewer escaped defects.",
      ],
    },
    {
      id: "design-qa-ex-pipeline",
      kind: "reflection",
      level: "advanced",
      title: "Design the QA pipeline",
      prompt: ["Design a CI pipeline for a design system used by 10 products: which checks run on every PR, which nightly, which before release, and how visual-diff approvals and manual accessibility sign-off are recorded."],
      deliverable: "A pipeline diagram and an approval policy.",
      criteria: ["Fast checks first", "Visual approvals explicit", "Manual accessibility sign-off defined"],
    },
  ],

  quiz: [
    {
      id: "design-qa-q-what",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "When should design QA happen?",
      options: [
        { text: "Before release, on the built interface", correct: true, explanation: "Catch issues before users do." },
        { text: "Only in the design file", correct: false, explanation: "The build is what users get." },
        { text: "After users complain", correct: false, explanation: "Too late." },
        { text: "Never; developers follow the design", correct: false, explanation: "Drift happens without checks." },
      ],
      explanation: "Review the build before release.",
    },
    {
      id: "design-qa-q-automate",
      kind: "scenario",
      level: "intermediate",
      prompt: "Which check is best automated in CI?",
      options: [
        { text: "Blocking hard-coded hex colours in stylesheets", correct: true, explanation: "A lint rule does this reliably." },
        { text: "Whether the copy is clear", correct: false, explanation: "Needs human judgement." },
        { text: "Whether the screen-reader experience makes sense", correct: false, explanation: "Needs manual testing." },
        { text: "Whether the design solves the user's problem", correct: false, explanation: "Needs research." },
      ],
      explanation: "Automate mechanical checks; review the rest.",
    },
    {
      id: "design-qa-q-axe",
      kind: "critique",
      level: "advanced",
      prompt: "A team reports 'WCAG 2.2 AA conformant' because axe-core found no violations. What is wrong?",
      options: [
        { text: "Automated tools cover only part of WCAG; conformance needs manual evaluation of a representative sample", correct: true, explanation: "axe flags incomplete items; WCAG-EM describes the full process." },
        { text: "Nothing; axe covers all of WCAG", correct: false, explanation: "It does not." },
        { text: "They should have used a different tool", correct: false, explanation: "Every tool has the same limit." },
        { text: "Conformance is only for government sites", correct: false, explanation: "Irrelevant." },
      ],
      explanation: "Automated passes are not conformance.",
    },
  ],

  flashcards: [
    { id: "design-qa-fc-define", front: "Design QA", back: "Pre-release verification that the build matches the design and system rules: tokens, layout, states, content, accessibility, behaviour." },
    { id: "design-qa-fc-gates", front: "Automated QA gates", back: "Style and script lint (no raw values), visual regression, interaction tests, axe-core." },
    { id: "design-qa-fc-axe", front: "Limits of automated accessibility testing", back: "axe-core reports finding about 57% of WCAG issues on average (vendor figure) and marks uncertain items incomplete; manual evaluation is required." },
    { id: "design-qa-fc-flake", front: "Visual test stability", back: "Generate baselines in the same environment; disable animation; wait for fonts; small explicit tolerances." },
  ],

  references: [
    { source: "playwright-snapshots", role: "primary", note: "toHaveScreenshot and environment caveats." },
    { source: "storybook-interaction-tests", role: "primary", note: "Play functions." },
    { source: "axe-core", role: "primary", note: "Automated WCAG checks and limits." },
    { source: "w3c-wcag-em-2", role: "standard", note: "Conformance evaluation methodology (Group Note)." },
    { source: "stylelint-color-no-hex", role: "explanatory", note: "Disallow hex colours." },
    { source: "stylelint-unit-disallowed-list", role: "explanatory", note: "Disallow px for font-size." },
    { source: "chromatic-docs", role: "explanatory", note: "Hosted visual testing (vendor)." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.3, 1.4.10, 2.4.7, 2.5.8 examples." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Practitioner consensus supported by tool documentation and W3C evaluation guidance; the axe-core coverage figure is the vendor's own. No controlled study of design-QA processes was found.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-12",
});
