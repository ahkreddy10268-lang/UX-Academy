import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "design-governance",
  slug: "design-governance",
  title: "Design Governance",
  alternateNames: ["Design system governance", "Contribution model", "Design system operating model", "Component lifecycle"],
  summary:
    "The agreed rules for how a design system changes: who can propose, who decides, what evidence a contribution needs, how components move from trial to stable to deprecated, and how long teams get to migrate.",
  definition:
    "Design governance is the **decision-making and contribution process of a design system**: who owns it, who may propose changes, what criteria a contribution must meet, how components move through **lifecycle statuses**, and how breaking changes are announced and retired. It turns a library into a maintained product. GOV.UK, for example, lets anyone propose a component through a public discussion, judges it against five contribution criteria, develops it with the community and publishes it with a Trial status before it becomes Stable {{src:govuk-propose-component}} {{src:govuk-contribution-criteria}} {{src:govuk-develop-component}} {{src:govuk-component-lifecycle}}.",
  primaryType: "strategy",
  secondaryTypes: ["methodology"],
  domain: "design-systems",
  subcategory: "operations",
  tags: ["governance", "contribution", "RFC", "proposal", "lifecycle", "trial", "stable", "deprecated", "centralised", "federated", "hybrid", "decision rights"],
  difficulty: "advanced",
  disciplines: ["Design systems", "Design operations", "Product management", "Front-end engineering"],
  learningObjectives: [
    "Compare centralised, federated and hybrid ownership models.",
    "Run a proposal workflow with explicit contribution criteria.",
    "Define lifecycle statuses and the promises each makes to consumers.",
    "Measure governance health without claiming unverified returns.",
  ],
  prerequisites: ["design-system", "component-libraries", "design-language"],

  levels: {
    beginner: {
      explanation: [
        "The library app's design system started with one designer and one developer. Two years later, six teams use it. One team added a 'quick renew' button that looks like the primary button but behaves differently; another copied the date picker and changed it. Nobody knew who was allowed to say yes or no.",
        "**Design governance** is the set of rules for how the system changes: how someone suggests a new component, who decides, what evidence is needed, and how old components are retired. Without it, a system slowly fills with near-duplicates and one-off exceptions until teams stop trusting it.",
        "Good governance is not a gate that says 'no'. It is a clear, published path that tells anyone how to get their need into the system — and how long it will take.",
      ],
      analogy:
        "City planning and building codes: anyone can apply to build, the rules are public, an office decides, and the codes are updated when they stop serving people. Without them, every street would be built differently.",
      everydayExamples: [
        "A public 'propose a component' page with a checklist.",
        "A 'beta' label on a new component that might still change.",
        "A notice that an old component will be removed in the next major release.",
      ],
      vocabulary: [
        { term: "Governance", meaning: "The agreed rules and roles for changing the design system." },
        { term: "Contribution", meaning: "A change proposed or built by someone outside the core team." },
        { term: "Proposal (RFC)", meaning: "A written request for comments describing a need and a solution, discussed before building." },
        { term: "Lifecycle status", meaning: "A label such as trial, stable or deprecated that tells consumers how much they can rely on a component." },
        { term: "Deprecation", meaning: "Marking something as going away, with time and guidance to move off it." },
      ],
    },
    intermediate: {
      explanation: [
        "**Ownership models.** In a *centralised* model a core team builds and decides; consistency is high but the team becomes a bottleneck. In a *federated* model product teams contribute and a shared group decides; coverage grows but quality varies. Most mature systems are *hybrid*: a small core team owns foundations, standards and review, and the community contributes. GOV.UK is an example of a hybrid: the Design System team prioritises and supports, while anyone can propose or develop a component with the team's help {{src:govuk-propose-component}} {{src:govuk-develop-component}}.",
        "**Proposal workflow.** GOV.UK's path is: check existing discussions and upvote instead of duplicating; start a discussion with the idea and evidence of user needs; if taken forward, hold a kick-off to agree scope, design, content, code, guidance, timings and a contact; then weekly check-ins while the contribution is researched and built {{src:govuk-propose-component}} {{src:govuk-develop-component}}. An RFC document in a repository serves the same purpose for engineering-led systems.",
        "**Contribution criteria.** Explicit criteria make decisions predictable. GOV.UK's five: *useful* (evidence many teams need it), *unique* (not replicating something existing), *usable* (tested with a representative sample including disabled users), *consistent* (reuses existing styles and components and follows standards) and *versatile* (works across a range of services) {{src:govuk-contribution-criteria}}.",
        "**Lifecycle statuses.** Statuses tell consumers how much to rely on a component. Primer uses Experimental, Ready and Deprecated, with breaking changes to Ready components only in a major version and with a migration path {{src:primer-component-status}}. GOV.UK shows Trial and Stable; trial components may change substantially or be deprecated, and move to stable after six months without negative feedback {{src:govuk-component-lifecycle}}.",
      ],
      howItWorks: [
        "Public criteria and a published path turn 'can we add this?' from a negotiation into a checklist, which speeds decisions and makes refusals explainable.",
        "Statuses separate *available* from *dependable*, so teams can try new components without the system promising stability it cannot yet give.",
      ],
      implementation: [
        "Write down decision rights: who approves foundations, components, patterns and breaking changes.",
        "Publish a proposal template (problem, evidence, existing alternatives, accessibility testing, owners) and a single place to submit it.",
        "Adopt explicit contribution criteria and use them in every review.",
        "Define lifecycle statuses and what each promises; label every component.",
        "Set deprecation rules: announce in a minor release, keep at least one minor release with the deprecation, remove only in a major {{src:semver-2}}.",
        "Require accessibility evidence for promotion to stable: WCAG 2.2 AA checks plus testing with disabled users, as GOV.UK's 'usable' criterion asks {{src:govuk-contribution-criteria}} {{src:w3c-wcag-22}}.",
      ],
      scenarios: [
        "**Illustrative.** The library app's 'quick renew' request becomes a proposal. Review finds the existing Button with a `loading` state covers it (not *unique*), so the decision is to document the pattern rather than add a component — explained against the criteria.",
        "**Illustrative.** A team's accessible date picker is accepted as *Trial*; two other teams adopt it and report findings; after six months without blocking issues it becomes *Stable*, and the copied date picker is deprecated with a migration guide.",
        "**Review ritual.** A fortnightly review where designers and engineers walk each proposal against the criteria, record the decision and reasons publicly, and assign an owner and status.",
      ],
    },
    advanced: {
      explanation: [
        "**Contribution pipeline as code.** Proposals live as issues or RFC files with required fields; a component cannot be published as Stable unless its status metadata, owner, documentation page, visual tests and accessibility checks exist — enforced in CI. Status is data (in package metadata or docs front matter) so tooling can warn when a deprecated component is imported, as Primer does with a consumer warning {{src:primer-component-status}}.",
        "**Breaking-change windows.** SemVer advises at least one minor release containing a deprecation before removal in a major {{src:semver-2}}. Mature systems add calendar time (for example, a stated number of releases or months) so product teams can plan; the policy matters more than the number, which each organisation sets.",
        "**Governance telemetry.** Useful signals: proposals opened, decided and published per quarter; median time from proposal to decision and to release; share of proposals rejected as duplicates (a discoverability problem); adoption of new components across products; number of consumers on deprecated components and on old major versions. These measure throughput and bottlenecks. Return-on-investment figures for design systems are often quoted, but no controlled evidence was found here; teams should measure their own outcomes rather than cite generic numbers.",
        "**Accessibility as a gate.** Automated checks run on every component, but WCAG conformance needs manual evaluation; the W3C's WCAG-EM describes scoping, sampling, evaluating and reporting {{src:w3c-wcag-em-2}}. Governance decides who signs off and on what evidence.",
      ],
      evidence: [
        "Governance practices are **documented by the systems that use them**: GOV.UK's proposal, contribution and lifecycle pages and Primer's status model {{src:govuk-propose-component}} {{src:govuk-contribution-criteria}} {{src:govuk-develop-component}} {{src:govuk-component-lifecycle}} {{src:primer-component-status}}, with deprecation guidance from SemVer {{src:semver-2}}. The centralised/federated/hybrid distinction is widely used practitioner vocabulary; no controlled comparison of models was found, and no ROI figure is cited.",
      ],
      debates: [
        "**Central control or open contribution?** Central teams protect quality; open contribution scales coverage and ownership. Hybrids try to get both, at the cost of review effort.",
        "**How strict are the criteria?** Strict criteria keep the system coherent but push teams to build locally; loose criteria grow the system with near-duplicates.",
        "**Trial components in production?** Trial status lets teams solve real problems early, but they may need rework when the component changes.",
      ],
      alternativeModels: [
        "**Inner-source** — the system is run like an open-source project inside the organisation, with maintainers and pull requests.",
        "**Product-team ownership of patterns** — the core team owns only foundations; patterns live with the teams that use them.",
      ],
    },
  },

  application: {
    summary: ["Governance applies once more than one team uses the system — usually far earlier than teams expect."],
    web: ["Proposals as issues or RFCs; status metadata in packages; CI gates for docs, tests and accessibility before Stable."],
    mobile: ["Platform libraries share the proposal process and statuses; platform-specific owners decide platform details."],
    enterprise: ["A governance board with design, engineering, accessibility and product representation; published decision records."],
    services: ["Content and service patterns follow the same proposal and lifecycle rules as components."],
    steps: [
      "Name owners and decision rights.",
      "Publish the proposal path and contribution criteria.",
      "Define lifecycle statuses and label every component.",
      "Set deprecation and breaking-change rules.",
      "Run a regular review ritual and publish decisions.",
      "Track proposal throughput, adoption and deprecated usage.",
    ],
  },

  whenToUse: [
    "As soon as more than one team consumes or contributes to the system.",
    "When duplicates, forks or disputed decisions start to appear.",
  ],
  whenNotToUse: [
    "As heavy process for a two-person system: a written decision log may be enough at first.",
    "As a way to refuse requests without reasons: every decision should cite the criteria.",
  ],
  advantages: [
    "Predictable, explainable decisions.",
    "Statuses that tell teams what they can rely on.",
    "A path for everyone's needs into the system.",
  ],
  limitations: [
    "Review takes time and can become a bottleneck.",
    "Criteria need judgement; they do not decide automatically.",
    "Governance cannot fix a system no one has time to maintain.",
  ],
  misconceptions: [
    {
      myth: "Governance means a central team saying no.",
      reality:
        "Good governance is a published path for contributions; GOV.UK invites anyone to propose and develop components with the team's support {{src:govuk-propose-component}} {{src:govuk-develop-component}}.",
    },
  ],

  relations: [
    { target: "design-system", type: "applied-in", note: "Governance is how the system is run." },
    { target: "component-libraries", type: "applied-in", note: "Library components carry lifecycle statuses." },
    { target: "design-system-versioning", type: "complementary-to", note: "Breaking changes and deprecations follow versioning rules." },
    { target: "design-language", type: "derived-from", note: "Criteria test proposals against the design language." },
    { target: "design-system-audits", type: "complementary-to", note: "Audits feed evidence into governance decisions." },
    { target: "component-properties", type: "related-to", note: "API changes are the most common governance decisions." },
  ],

  practice: {
    dos: [
      { text: "Publish one proposal path and explicit contribution criteria, and cite them in every decision.", why: "Predictable, explainable decisions; GOV.UK uses useful, unique, usable, consistent, versatile {{src:govuk-contribution-criteria}}.", kind: "industry" },
      { text: "Label every component with a lifecycle status and state what each status promises.", why: "Separates available from dependable; Primer and GOV.UK publish their statuses {{src:primer-component-status}} {{src:govuk-component-lifecycle}}.", kind: "system" },
      { text: "Require accessibility evidence, including testing with disabled users, before a component becomes stable.", why: "GOV.UK's 'usable' criterion; WCAG 2.2 conformance needs manual evaluation {{src:govuk-contribution-criteria}} {{src:w3c-wcag-em-2}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't remove anything without a deprecation release first.", why: "SemVer: at least one minor release with the deprecation before removal in a major {{src:semver-2}}.", kind: "industry" },
      { text: "Don't accept near-duplicates to avoid saying no.", why: "Duplicates erode trust and multiply maintenance; 'unique' is a criterion for a reason {{src:govuk-contribution-criteria}}.", kind: "system" },
      { text: "Don't justify the system with borrowed ROI figures.", why: "No controlled evidence supports generic numbers; measure your own throughput and adoption.", kind: "context" },
    ],
    examples: [
      {
        title: "Proposal (RFC) template and status metadata",
        language: "text",
        code: `RFC: Date range picker
Status: proposed → trial → stable | rejected
Owner: Events team (contributor) · Reviewer: Design system core

1. Problem and users        Members booking rooms choose start and end dates.
2. Evidence                 3 services use custom versions (links, screenshots).
3. Existing alternatives    Two DateInputs — rejected in research: errors at range boundaries.
4. Criteria                 useful ✔ unique ✔ usable (research with 8 people incl. 2 screen-reader users) ✔
                            consistent (reuses DateInput, Button, tokens) ✔ versatile (single date, range) ✔
5. Accessibility            APG dialog + grid patterns; WCAG 2.2 AA checks; keyboard and screen-reader test plan
6. API sketch               value, defaultValue, onValueChange, min, max, label (required)
7. Migration                Replaces EventsRangePicker; deprecate in 4.3, remove in 5.0
Decision (date, reasons, against criteria): …`,
        caption: "Illustrative. The template forces evidence and criteria before any build starts.",
      },
      {
        title: "Lifecycle status as data, checked in CI",
        language: "json",
        code: `{
  "component": "RangePicker",
  "status": "trial",
  "since": "4.3.0",
  "owner": "events-team",
  "promotion": { "requires": ["docs", "visual-tests", "axe-clean", "manual-a11y-review", "2-consumers"] },
  "deprecates": { "EventsRangePicker": { "removeIn": "5.0.0", "migration": "docs/migrate/range-picker.md" } }
}`,
        caption: "Illustrative. CI blocks promotion to stable until every listed requirement is present.",
      },
    ],
  },

  exercises: [
    {
      id: "design-governance-ex-map",
      kind: "assignment",
      level: "beginner",
      title: "Find the rules",
      prompt: ["Pick a public design system (GOV.UK, Primer, Carbon). Find how to propose a change, who decides and what statuses components have. Summarise in five bullet points."],
      deliverable: "A five-point summary with links.",
      criteria: ["Proposal path found", "Decision-makers named", "Statuses listed"],
    },
    {
      id: "design-governance-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Repair a governance breakdown",
      prompt: [
        "Illustrative case. The library app's system has no proposal process; requests arrive in chat and are decided by whoever answers. Three date pickers exist. A component was removed in a minor release and broke two products. New components ship without accessibility review.",
        "Work through the correction sequence.",
      ],
      deliverable: "A governance charter: roles, proposal path, criteria, statuses and deprecation rules.",
      criteria: ["Decision rights explicit", "Criteria adopted", "Statuses defined", "Deprecation rule matches SemVer", "Accessibility gate"],
      exampleSolution: [
        "1. Symptoms: ad hoc decisions, duplicates, broken products, inaccessible components.",
        "2. Impact: teams stop trusting the system and build locally; users meet inconsistent and inaccessible interfaces.",
        "3. Causes: no owner, no criteria, no statuses, no deprecation policy, no accessibility gate.",
        "4. Requirements: deprecate in a minor before removal in a major (SemVer); WCAG 2.2 AA evidence and manual evaluation before stable.",
        "5. Correction: hybrid model with a core team and named reviewers; proposal template and five criteria; Trial/Stable/Deprecated statuses; date pickers consolidated through one trial component.",
        "6. Validation: track proposal lead time and deprecated usage each quarter; review decisions for consistency with criteria.",
        "7. Trade-off: slower additions; fewer, more reliable components.",
      ],
    },
    {
      id: "design-governance-ex-model",
      kind: "reflection",
      level: "advanced",
      title: "Choose an operating model",
      prompt: ["For an organisation with 3 product lines, 12 squads and one 4-person system team, choose centralised, federated or hybrid governance. Define decision rights, review cadence, CI gates and the five metrics you would report."],
      deliverable: "A one-page operating model.",
      criteria: ["Model justified", "Gates enforceable", "Metrics measure throughput and adoption, not ROI claims"],
    },
  ],

  quiz: [
    {
      id: "design-governance-q-why",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What problem does design governance mainly solve?",
      options: [
        { text: "Unclear decisions that let duplicates and inconsistent changes accumulate", correct: true, explanation: "Governance makes change predictable." },
        { text: "Slow page loading", correct: false, explanation: "That is performance." },
        { text: "Choosing brand colours", correct: false, explanation: "That is design language." },
        { text: "Writing code faster", correct: false, explanation: "Not its purpose." },
      ],
      explanation: "Clear rules for change.",
    },
    {
      id: "design-governance-q-criteria",
      kind: "scenario",
      level: "intermediate",
      prompt: "A team proposes a new 'QuickButton' that duplicates Button with a loading state. Under GOV.UK-style criteria, what is the likely outcome?",
      options: [
        { text: "Not accepted as a new component because it is not unique; document the existing pattern instead", correct: true, explanation: "'Unique' rules out duplicates." },
        { text: "Accepted because the team wants it", correct: false, explanation: "Wanting is not evidence." },
        { text: "Accepted as stable immediately", correct: false, explanation: "Even new components start as trial." },
        { text: "Rejected without explanation", correct: false, explanation: "Decisions should cite criteria." },
      ],
      explanation: "Criteria make decisions explainable.",
    },
    {
      id: "design-governance-q-deprecate",
      kind: "critique",
      level: "advanced",
      prompt: "A component is removed in version 4.6.0 without prior notice. What does SemVer's deprecation guidance say?",
      options: [
        { text: "Deprecate it in a minor release with documentation, keep at least one such release, then remove it in a major", correct: true, explanation: "SemVer FAQ on deprecation." },
        { text: "Removal in a minor is fine if announced", correct: false, explanation: "Removal is a breaking change: major." },
        { text: "Remove it in a patch", correct: false, explanation: "Patches are for backward-compatible fixes." },
        { text: "Never remove anything", correct: false, explanation: "Deprecation is normal; it needs a path." },
      ],
      explanation: "Deprecate first, remove in a major.",
    },
  ],

  flashcards: [
    { id: "design-governance-fc-models", front: "Three governance models", back: "Centralised (core team builds and decides), federated (teams contribute, shared group decides), hybrid (core owns foundations and review; community contributes)." },
    { id: "design-governance-fc-criteria", front: "GOV.UK contribution criteria", back: "Useful, unique, usable, consistent, versatile." },
    { id: "design-governance-fc-status", front: "Lifecycle statuses (examples)", back: "Primer: Experimental, Ready, Deprecated. GOV.UK: Trial, Stable (trial → stable after 6 months without negative feedback)." },
    { id: "design-governance-fc-metrics", front: "Governance telemetry", back: "Proposal lead time, decisions per quarter, duplicate-rejection share, adoption of new components, consumers on deprecated components." },
  ],

  references: [
    { source: "govuk-propose-component", role: "primary", note: "Proposal path." },
    { source: "govuk-contribution-criteria", role: "primary", note: "Five criteria." },
    { source: "govuk-develop-component", role: "primary", note: "Community development with team support." },
    { source: "govuk-component-lifecycle", role: "primary", note: "Trial and Stable statuses." },
    { source: "primer-component-status", role: "primary", note: "Experimental, Ready, Deprecated." },
    { source: "semver-2", role: "explanatory", note: "Deprecation FAQ." },
    { source: "w3c-wcag-em-2", role: "explanatory", note: "Conformance evaluation steps." },
    { source: "w3c-wcag-22", role: "standard", note: "AA conformance target for stable components." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Documented practice from GOV.UK and Primer and the SemVer specification. Ownership-model vocabulary is practitioner consensus without controlled comparison; no ROI figures are cited.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-12",
});
