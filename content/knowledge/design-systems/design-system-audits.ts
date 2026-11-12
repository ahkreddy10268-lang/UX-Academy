import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "design-system-audits",
  slug: "design-system-audits",
  title: "Design System Audits",
  alternateNames: ["Interface inventory", "UI audit", "Design system adoption audit", "Component inventory"],
  summary:
    "A systematic inventory of what is actually in production — components, styles, duplicates, detached instances, overrides and accessibility gaps — turned into evidence for a prioritised design-system roadmap.",
  definition:
    "A design system audit is a **systematic inventory and assessment of the interface as shipped**, compared with the system as documented. It combines Brad Frost's **interface inventory** — screenshot and categorise every instance of each pattern, with all disciplines in the room {{src:frost-2016}} — with **measured adoption** (system components vs custom code, detached design-tool instances) and **accessibility sampling**. Its output is not a list of complaints but a **prioritised roadmap**: what to consolidate, fix, add or deprecate, ranked by severity and reach.",
  primaryType: "strategy",
  secondaryTypes: ["method"],
  domain: "design-systems",
  subcategory: "operations",
  tags: ["audit", "interface inventory", "UI inventory", "adoption", "detached instances", "duplicates", "accessibility audit", "roadmap", "prioritisation"],
  difficulty: "intermediate",
  disciplines: ["Design systems", "Design operations", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Run an interface inventory and categorise what is found.",
    "Measure adoption in code and design tools.",
    "Sample accessibility gaps with a recognised evaluation method.",
    "Turn findings into a prioritised, owned roadmap.",
  ],
  prerequisites: ["design-system", "atomic-design", "component-libraries"],

  levels: {
    beginner: {
      explanation: [
        "The library app's team believed it had 'one button'. When they took screenshots of every button in the website, the staff tool and the kiosk, they found 23 different ones — different heights, colours, corner shapes and labels — and four that a keyboard could not reach.",
        "A **design system audit** looks at what is really in use, not at what the documentation says. You collect every example of each kind of element, group them, count the differences, and check them against the system's rules and accessibility requirements.",
        "Seeing all 23 buttons on one wall makes the problem obvious to everyone, and gives the evidence to decide what to fix first.",
      ],
      analogy:
        "Taking everything out of a cupboard and laying it on the floor: only then do you see you own four tin openers and no working scissors.",
      everydayExamples: [
        "A slide showing every button style used across a company's products.",
        "A spreadsheet of which pages still use an old date picker.",
        "A report of how often designers detach library components.",
      ],
      vocabulary: [
        { term: "Interface inventory", meaning: "A collection of screenshots of every instance of each interface element, grouped by type." },
        { term: "Adoption", meaning: "How much of the product is built from the design system rather than custom code." },
        { term: "Detached instance", meaning: "A design-tool copy of a component whose link to the library was broken." },
        { term: "Duplicate pattern", meaning: "Two or more components that do the same job differently." },
        { term: "Roadmap", meaning: "The ordered plan of what to fix, build or retire next." },
      ],
    },
    intermediate: {
      explanation: [
        "**Interface inventory.** Frost's method: get people from every discipline in a room, screenshot every instance of each pattern (buttons, forms, navigation, typography, images, icons…) into a shared template, then categorise, present and regroup; a first screenshot pass takes roughly 30–90 minutes {{src:frost-2016}}. The visible pile of near-duplicates builds agreement faster than any argument.",
        "**Audit spreadsheet.** One row per instance: product, page or screen, pattern category, matching system component (or 'custom'), deviation (size, colour, behaviour, copy), accessibility issues with WCAG criterion, screenshot link, frequency (pages or sessions affected) and owner. Grouping rows by pattern shows duplicates; grouping by product shows adoption.",
        "**Design-tool adoption.** Figma's library analytics show component usage and detaches — logged whenever someone uses Detach instance — over the last 30 days, on Organization and Enterprise plans {{src:figma-library-analytics}}. Frequent detaches of one component usually mean its properties do not cover a real need ([[component-properties]]).",
        "**Accessibility sampling.** Rather than testing everything, follow the W3C's WCAG-EM steps — define scope, explore, select a representative sample, evaluate, report {{src:w3c-wcag-em-2}} — and record which system components cause each finding, so one fix improves every product.",
      ],
      howItWorks: [
        "Inventories make variation visible and countable, which turns opinions about inconsistency into shared evidence.",
        "Linking findings to system components shows where a single system change will fix many screens, which drives prioritisation.",
      ],
      implementation: [
        "Define scope: products, platforms, flows and the date of the snapshot.",
        "Run an interface inventory workshop with design, engineering, content and product {{src:frost-2016}}.",
        "Fill the audit spreadsheet; link each instance to a system component or mark it custom.",
        "Measure code adoption with a static scanner and design adoption with library analytics {{src:react-scanner}} {{src:figma-library-analytics}}.",
        "Sample accessibility with WCAG-EM and record WCAG 2.2 criteria per finding {{src:w3c-wcag-em-2}} {{src:w3c-wcag-22}}.",
        "Prioritise by severity × reach and turn the top items into owned roadmap entries.",
      ],
      scenarios: [
        "**Illustrative.** The 23 buttons group into 4 intents and 3 sizes already in the system plus 2 genuine needs (an icon-only toolbar button and a full-width mobile button). The roadmap: migrate 17 custom buttons, add 2 variants through governance, fix 4 keyboard failures first.",
        "**Illustrative.** Library analytics show the DatePicker detached many times a month; interviews reveal designers need a date range. A RangePicker proposal follows ([[design-governance]]).",
        "**Presentation ritual.** Present the audit wall to product leads: one slide per pattern with all variants, a count, the cost of each duplicate, accessibility failures in red with their criteria, and the proposed fix.",
      ],
    },
    advanced: {
      explanation: [
        "**Static adoption scanning.** react-scanner statically analyses code (TypeScript supported) and extracts rendered React components and their props into a JSON report {{src:react-scanner}}. From it you can compute adoption — system instances ÷ (system + custom) — per product, the props used most (and never), and instances that spread arbitrary props or pass `className` overrides, which are candidates for missing variants.",
        "**CSS duplication.** Bundle analysis of compiled CSS shows repeated declarations and raw values that bypass tokens; lint violations over time ([[design-qa]]) show whether drift is shrinking.",
        "**Prioritisation matrix.** Score each finding on *severity* (blocks a task or fails WCAG A/AA → high; inconsistent but usable → low) and *reach* (how many screens, sessions or products). High-severity items are fixed regardless of reach; among the rest, reach decides. Record the scoring so the next audit is comparable.",
        "**Cadence.** Audits are snapshots; repeat them (for example yearly, or before a major version) with the same scope and instrumentation so trends — adoption up, detaches down, accessibility findings down — are visible.",
      ],
      evidence: [
        "The interface inventory is a **documented practitioner method** (Frost 2016, chapter 4, read online) {{src:frost-2016}}. Adoption measurement relies on tool documentation {{src:react-scanner}} {{src:figma-library-analytics}}; accessibility sampling follows the W3C's WCAG-EM Group Note {{src:w3c-wcag-em-2}}. No controlled study comparing audit methods was found; the prioritisation matrix is a common practice, not a validated instrument.",
      ],
      debates: [
        "**Manual inventory or automated scan?** Screenshots show what users see, including non-system code; scans are repeatable but miss visual drift inside system components.",
        "**Audit everything or sample?** Full inventories are persuasive but expensive; sampling scales and suits accessibility evaluation.",
        "**Adoption as a target?** High adoption can hide misuse; pair it with quality findings.",
      ],
      alternativeModels: [
        "**Heuristic evaluation** — experts review screens against principles ([[heuristic-evaluation]]).",
        "**Continuous telemetry** — adoption and detach dashboards instead of periodic audits.",
      ],
    },
  },

  application: {
    summary: ["Audits apply before starting a system, before a major version, and periodically to measure adoption and drift."],
    web: ["Static component scans, CSS duplication analysis, axe-core sweeps plus WCAG-EM samples."],
    mobile: ["Screenshot inventories per platform; component usage from platform code scans."],
    enterprise: ["Audits across product lines feed the governance roadmap and the business case."],
    services: ["Inventories of letters, emails and signage reveal off-screen inconsistency."],
    steps: [
      "Define scope and snapshot date.",
      "Run the interface inventory workshop.",
      "Fill the audit spreadsheet and link instances to system components.",
      "Measure adoption in code and design tools.",
      "Sample accessibility with WCAG-EM.",
      "Prioritise by severity and reach; assign owners on the roadmap.",
    ],
  },

  whenToUse: [
    "Before creating a design system, to scope it.",
    "Before a major version or rebrand, and periodically to track adoption and drift.",
  ],
  whenNotToUse: [
    "As a blame exercise: findings are about the system's gaps as much as teams' choices.",
    "As a one-off with no owners: an audit without a roadmap changes nothing.",
  ],
  advantages: [
    "Turns opinions into shared, visible evidence.",
    "Finds system gaps behind repeated overrides and detaches.",
    "Prioritises fixes that improve many screens at once.",
  ],
  limitations: [
    "Snapshots age quickly.",
    "Manual inventories are labour-intensive.",
    "Adoption numbers can hide misuse.",
  ],
  misconceptions: [
    {
      myth: "High adoption means the system is working.",
      reality:
        "Components can be adopted and still overridden, detached or misused; adoption must be read with quality and accessibility findings.",
    },
  ],

  relations: [
    { target: "atomic-design", type: "derived-from", note: "The interface inventory comes from Frost's atomic design workflow." },
    { target: "design-governance", type: "applied-in", note: "Audit findings feed proposals and deprecations." },
    { target: "design-qa", type: "complementary-to", note: "QA prevents drift; audits measure it." },
    { target: "component-libraries", type: "measured-by", note: "Adoption of library components is measured." },
    { target: "component-properties", type: "related-to", note: "Detaches and overrides reveal missing properties." },
    { target: "heuristic-evaluation", type: "related-to", note: "Expert review complements inventory." },
  ],

  practice: {
    dos: [
      { text: "Run the inventory with every discipline in the room and show all variants side by side.", why: "Visible variation builds agreement; Frost's interface inventory works this way {{src:frost-2016}}.", kind: "industry" },
      { text: "Link every finding to the system component that should cover it.", why: "One system fix then improves many screens, which drives prioritisation.", kind: "system" },
      { text: "Sample accessibility with WCAG-EM and record the WCAG 2.2 criterion for each finding.", why: "A recognised method makes findings comparable and defensible {{src:w3c-wcag-em-2}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't report adoption without quality.", why: "Adopted components can still be overridden or misused.", kind: "context" },
      { text: "Don't end with a list of problems.", why: "Without severity, reach and owners, nothing changes.", kind: "team" },
      { text: "Don't change scope between audits.", why: "Trends are only meaningful when the method and scope stay the same.", kind: "industry" },
    ],
    examples: [
      {
        title: "Audit spreadsheet columns and a prioritisation rule",
        language: "text",
        code: `product | screen | category | system match | deviation | a11y issue (WCAG) | severity | reach | owner | screenshot
--------+--------+----------+--------------+-----------+-------------------+----------+-------+-------+-----------
staff   | loans  | button   | custom       | 30px high, #949494 label | 1.4.3 (3.03:1) | high | 14 screens | core | link
web     | search | datepick | DatePicker (detached) | range needed | –   | medium | 3 flows | events | link
kiosk   | home   | button   | Button md    | radius 2px | 2.4.7 focus not visible | high | 1 screen | kiosk | link

Priority:
1. any WCAG A/AA failure → fix first, in the system component if one exists
2. then by reach (screens × sessions), highest first
3. repeated detaches or overrides of one component → governance proposal`,
        caption: "Illustrative. The same columns each audit make trends comparable.",
      },
      {
        title: "Adoption from a static scan",
        language: "ts",
        code: `// react-scanner config (sketch): crawl apps, report rendered components and props
// module.exports = { crawlFrom: "./apps", includeSubComponents: true,
//   importedFrom: /@library\\/ui|\\.\\/components/, processors: ["count-components-and-props"] };

import report from "./scan-report.json";           // { [component]: { instances, props, importedFrom } }
const isSystem = (from: string) => from.startsWith("@library/ui");
let system = 0, custom = 0;
for (const c of Object.values(report)) {
  if (isSystem(c.importedFrom)) system += c.instances; else custom += c.instances;
}
const adoption = system / (system + custom);       // e.g. 312 / (312 + 88) = 0.78
const overrides = Object.entries(report).filter(([, c]) => isSystem(c.importedFrom) && c.props.className > 0);`,
        caption: "Illustrative. Adoption plus override counts point to missing variants and properties.",
      },
    ],
  },

  exercises: [
    {
      id: "design-system-audits-ex-inventory",
      kind: "assignment",
      level: "beginner",
      title: "Inventory one pattern",
      prompt: ["Screenshot every button (or every form field) in one product. Put them on one page, group the near-duplicates and count the distinct versions."],
      deliverable: "A one-page inventory with groups and counts.",
      criteria: ["All instances captured", "Groups clear", "Counts stated"],
    },
    {
      id: "design-system-audits-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Rescue an audit that changed nothing",
      prompt: [
        "Illustrative case. Last year's audit produced a 300-row spreadsheet with no severity, no owners, no link to system components and no accessibility criteria. This year the team scanned different products, so numbers cannot be compared.",
        "Work through the correction sequence.",
      ],
      deliverable: "A repeatable audit method and a top-10 roadmap.",
      criteria: ["Fixed scope", "Severity and reach", "System links", "WCAG criteria", "Owners"],
      exampleSolution: [
        "1. Symptoms: unused findings; incomparable numbers.",
        "2. Impact: no improvements; lost credibility for the system team.",
        "3. Causes: no prioritisation, no ownership, changing scope.",
        "4. Requirements: a consistent method (fixed scope and columns); accessibility findings recorded against WCAG 2.2 criteria and sampled with WCAG-EM.",
        "5. Correction: fixed product scope; spreadsheet columns as in the example; severity × reach rule; each top finding linked to a system component and an owner; roadmap of 10 items.",
        "6. Validation: repeat in six months with the same scope; compare adoption, detaches and accessibility findings.",
        "7. Trade-off: fewer products audited per cycle; numbers that mean something.",
      ],
    },
    {
      id: "design-system-audits-ex-metrics",
      kind: "reflection",
      level: "advanced",
      title: "Design an adoption dashboard",
      prompt: ["Specify a dashboard combining code adoption (static scan), design adoption and detaches (library analytics), className overrides and accessibility findings. Define each metric, its source and a decision it should trigger."],
      deliverable: "A metric table with sources and triggers.",
      criteria: ["Sources named", "Quality paired with adoption", "Triggers actionable"],
    },
  ],

  quiz: [
    {
      id: "design-system-audits-q-what",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What does an interface inventory involve?",
      options: [
        { text: "Collecting and grouping screenshots of every instance of each interface element", correct: true, explanation: "Frost's method." },
        { text: "Reading the documentation", correct: false, explanation: "Audits look at what shipped." },
        { text: "Surveying users about colours", correct: false, explanation: "Not an inventory." },
        { text: "Writing new components", correct: false, explanation: "That comes after." },
      ],
      explanation: "See everything in one place.",
    },
    {
      id: "design-system-audits-q-detach",
      kind: "scenario",
      level: "intermediate",
      prompt: "Library analytics show one component is detached far more than others. What is the most useful next step?",
      options: [
        { text: "Find out what designers needed that its properties did not offer", correct: true, explanation: "Detaches often reveal missing properties." },
        { text: "Forbid detaching", correct: false, explanation: "Hides the need." },
        { text: "Delete the component", correct: false, explanation: "Others depend on it." },
        { text: "Ignore it", correct: false, explanation: "It is a signal." },
      ],
      explanation: "Detaches are evidence of gaps.",
    },
    {
      id: "design-system-audits-q-adoption",
      kind: "formula",
      level: "advanced",
      prompt: "A scan finds 312 system button instances and 88 custom ones. What is button adoption, and what else should you check?",
      options: [
        { text: "78%; also check overrides (className) and accessibility findings on the system instances", correct: true, explanation: "312 / 400 = 0.78; adoption needs quality context." },
        { text: "28%", correct: false, explanation: "That is custom / system." },
        { text: "100%, since the system exists", correct: false, explanation: "Custom instances count." },
        { text: "78%, and nothing else matters", correct: false, explanation: "Adoption can hide misuse." },
      ],
      explanation: "Adoption plus quality.",
    },
  ],

  flashcards: [
    { id: "design-system-audits-fc-inventory", front: "Interface inventory (Frost)", back: "All disciplines screenshot every instance of each pattern, categorise, present and regroup; first pass ≈ 30–90 minutes." },
    { id: "design-system-audits-fc-adoption", front: "Adoption rate", back: "System instances ÷ (system + custom), per product; read with overrides and quality findings." },
    { id: "design-system-audits-fc-wcagem", front: "WCAG-EM steps", back: "Define scope, explore, select a representative sample, evaluate, report." },
    { id: "design-system-audits-fc-priority", front: "Prioritising audit findings", back: "WCAG A/AA failures first; then by reach; repeated overrides or detaches become governance proposals." },
  ],

  references: [
    { source: "frost-2016", role: "primary", note: "Interface inventory (chapter 4)." },
    { source: "figma-library-analytics", role: "primary", note: "Usage and detaches." },
    { source: "react-scanner", role: "primary", note: "Static component and prop extraction." },
    { source: "w3c-wcag-em-2", role: "standard", note: "Evaluation methodology (Group Note)." },
    { source: "w3c-wcag-22", role: "standard", note: "Criteria recorded per finding." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Documented practitioner method (Frost 2016) with tool documentation for measurement and the W3C's WCAG-EM for accessibility sampling. The prioritisation matrix is common practice, not a validated instrument.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-12",
});
