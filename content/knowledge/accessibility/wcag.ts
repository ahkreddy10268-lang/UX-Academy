import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "wcag",
  slug: "wcag",
  title: "Web Content Accessibility Guidelines (WCAG)",
  alternateNames: ["WCAG 2.2", "WCAG 2.1", "WCAG 2", "ISO/IEC 40500"],
  summary:
    "The W3C's international standard for making web content accessible to people with disabilities, organised under four principles and testable success criteria at levels A, AA and AAA.",
  definition:
    "WCAG is a W3C Recommendation that defines how to make web content more accessible to people with disabilities. Its normative core is a set of **testable success criteria**, grouped under guidelines and four principles — *perceivable, operable, understandable, robust* — and assigned to conformance levels **A**, **AA** and **AAA**. The current version is **WCAG 2.2**; WCAG 3 exists only as a Working Draft.",
  primaryType: "standard",
  secondaryTypes: ["guideline", "principle"],
  domain: "accessibility",
  subcategory: "standards",
  tags: ["accessibility", "W3C", "conformance", "success criteria", "POUR", "legal compliance", "audit"],
  difficulty: "beginner",
  disciplines: ["Accessibility", "Front-end engineering", "Interaction design", "Content design", "Law & policy"],
  learningObjectives: [
    "Explain what WCAG is, who publishes it and why it exists.",
    "Describe the layered structure: principles, guidelines, success criteria and sufficient techniques.",
    "Distinguish levels A, AA and AAA and state what a conformance claim requires.",
    "Identify what changed in WCAG 2.2, including the removal of 4.1.1 Parsing.",
    "Evaluate what WCAG conformance does and does not guarantee about real accessibility.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Many people use the web differently from the way designers imagine: some cannot see the screen and listen to it with a **screen reader**; some cannot use a mouse and navigate with a keyboard or switch; some see colours differently, need larger text, or find complex pages hard to follow. WCAG is the agreed rulebook for making web content work for them.",
        "It is published by the **World Wide Web Consortium (W3C)**, the organisation that also maintains HTML and CSS standards. Governments and companies around the world use it as the measure of whether a website or app is accessible — often because laws require it.",
        "WCAG does not tell you exactly how your page must look. Instead it states outcomes that can be tested: for example, 'text has enough contrast against its background', or 'everything you can do with a mouse you can also do with a keyboard'. Each of these testable statements is called a **success criterion**.",
      ],
      analogy:
        "WCAG is like a building code for ramps, doorways and lifts — but for digital spaces. A building code doesn't dictate the architecture's style; it sets measurable requirements (a door this wide, a ramp no steeper than this) so that people with different bodies can get in and move around.",
      everydayExamples: [
        "Images having a text description so a screen reader can say what they show.",
        "Videos with captions so people who are deaf or hard of hearing can follow them.",
        "A visible outline showing which button has keyboard focus.",
        "Form errors that explain what went wrong in words, not only by turning a field red.",
      ],
      vocabulary: [
        { term: "Success criterion", meaning: "A single testable requirement, such as 1.4.3 Contrast (Minimum)." },
        { term: "Conformance level", meaning: "A (minimum), AA (the usual legal and policy target) or AAA (enhanced)." },
        { term: "POUR", meaning: "The four principles: Perceivable, Operable, Understandable, Robust." },
        { term: "Assistive technology", meaning: "Software or hardware people use to access content, such as screen readers, magnifiers or switch devices." },
        { term: "Conformance claim", meaning: "A formal statement that specific pages meet a stated WCAG version and level." },
      ],
    },
    intermediate: {
      explanation: [
        "WCAG 2 is organised in layers. **Four principles** (perceivable, operable, understandable, robust) contain **13 guidelines** in WCAG 2.2, such as 1.4 Distinguishable or 2.1 Keyboard Accessible. Guidelines are not testable themselves; under them sit the **success criteria**, each assigned a level. Separate, non-normative documents — *Understanding WCAG 2.2* and *Techniques* — explain the intent of each criterion and list known ways to meet it {{src:w3c-understanding-wcag-22}}.",
        "Most organisations target **Level AA**, which means meeting every A and AA criterion. The W3C itself notes that requiring AAA as a general policy for whole sites is not recommended, because some AAA criteria cannot be met for some content {{src:w3c-wcag-22}}.",
        "A conformance claim has five requirements: the level must be met in full; conformance applies to **full pages** (including every responsive variation); every page in a **complete process** such as a checkout must conform; only **accessibility-supported** uses of technologies can be relied on; and non-conforming technology must not **interfere** with the rest of the page {{src:w3c-wcag-22}}.",
        "WCAG 2.2 added nine success criteria to 2.1 and removed one. The additions focus on focus visibility, pointer input and cognitive load: 2.4.11 Focus Not Obscured (Minimum, AA), 2.4.12 Focus Not Obscured (Enhanced, AAA), 2.4.13 Focus Appearance (AAA), 2.5.7 Dragging Movements (AA), 2.5.8 Target Size (Minimum, AA), 3.2.6 Consistent Help (A), 3.3.7 Redundant Entry (A), 3.3.8 Accessible Authentication (Minimum, AA) and 3.3.9 Accessible Authentication (Enhanced, AAA). **4.1.1 Parsing** is marked obsolete and removed, because modern browsers and assistive technologies no longer depend on the strict markup it required.",
      ],
      howItWorks: [
        "**Versions are backwards compatible.** Criteria are added, not changed (4.1.1 is the stated exception), so content that conforms to 2.2 also conforms to 2.1 and 2.0. The W3C encourages using the latest version {{src:w3c-wcag-overview}}.",
        "**Sufficient techniques are not the only way.** A technique documents one known way to pass a criterion. You may meet a criterion by other means, as long as the outcome is achieved and accessibility-supported.",
        "**Testing mixes tools and people.** Automated checkers reliably catch a subset of issues (missing alternative text, low contrast, missing labels). Many criteria — meaningful sequence, useful error suggestions, logical focus order — need human judgement and assistive-technology testing.",
      ],
      implementation: [
        "Set AA of the current version (2.2) as the design-system baseline, then document where legal obligations reference older versions.",
        "Translate criteria into component rules: contrast tokens, visible focus styles, minimum target sizes, labelled inputs, error patterns.",
        "Build accessibility into definition of done: design review (contrast, focus, structure), code review (semantics, names, roles), and manual keyboard and screen-reader checks.",
        "Audit complete journeys, not individual screens, because conformance requires complete processes to conform.",
        "Record known exceptions and remediation plans honestly rather than claiming conformance prematurely.",
      ],
      scenarios: [
        "A sticky cookie banner covers the focused element when a keyboard user tabs down the page — a failure of 2.4.11 Focus Not Obscured (Minimum).",
        "A kanban board only supports drag-and-drop to move cards — 2.5.7 Dragging Movements requires a single-pointer alternative, such as a 'Move to…' menu.",
        "A login form blocks password managers and paste, forcing users to transcribe a code — a likely failure of 3.3.8 Accessible Authentication (Minimum).",
      ],
    },
    advanced: {
      explanation: [
        "WCAG 2 is deliberately **technology-neutral and outcome-based**. This is its strength — the same criteria have been applied to HTML, PDF, native apps (via W3C's WCAG2ICT guidance) and documents — and its weakness: criteria are written in normative language that can be ambiguous, and binary pass/fail testing does not capture severity or the user's overall experience.",
        "WCAG has become embedded in law and procurement. The W3C reports that WCAG 2.2 was approved as **ISO/IEC 40500:2025**, matching the October 2023 version of WCAG 2.2 (the 2012 edition of ISO/IEC 40500 was WCAG 2.0) {{src:w3c-wcag-overview}}. In Europe, the harmonised standard **EN 301 549** incorporates WCAG into its web, document and software clauses; version 3.2.1 (2021) reflects WCAG 2.1 {{src:etsi-en-301-549-v321}}, and the W3C states that the 2026 version uses WCAG 2.2 {{src:w3c-wcag-overview}}.",
        "**WCAG 3** (W3C Accessibility Guidelines 3.0) is a W3C **Working Draft**, not a standard. The September 2026 draft explicitly states it may be updated, replaced or obsoleted, that requirements will be added, combined and removed, and — notably — that the contrast measure is still to be determined {{src:w3c-wcag-3-wd}}. Do not design to WCAG 3 requirements as if they were normative.",
      ],
      evidence: [
        "Many thresholds have explicit research or standards lineage. For example, the 4.5:1 text contrast ratio is derived from a 3:1 recommendation in earlier ergonomic standards, raised by a factor of roughly 1.5 to compensate for the contrast-sensitivity loss associated with about 20/40 visual acuity {{src:w3c-understanding-wcag-22}}.",
        "Other criteria encode professional consensus about barriers documented through user research with disabled people rather than a single experiment. WCAG is best classified as a **normative standard built on mixed evidence** — some psychophysical, much practice-based.",
      ],
      debates: [
        "**Conformance vs. usability for disabled people.** A page can meet every AA criterion and still be confusing or slow to use with a screen reader. WCAG is a floor, not a measure of a good experience — usability testing with disabled participants remains necessary.",
        "**Cognitive and learning disabilities.** Critics argue WCAG 2 under-serves cognitive accessibility because such needs are hard to express as binary testable criteria. WCAG 2.2's additions (consistent help, redundant entry, accessible authentication) respond partly to this.",
        "**The contrast algorithm.** The WCAG 2 luminance-ratio formula is criticised for treating light-on-dark and dark-on-light symmetrically and ignoring font weight and size beyond a single 'large text' cut-off. Alternatives such as APCA have been discussed for WCAG 3, but no algorithm has been adopted. See [[colour-contrast-ratio]].",
      ],
      alternativeModels: [
        "**Inclusive design** frameworks such as the [[inclusive-design-principles|Inclusive Design Principles]] describe qualities of an experience rather than testable thresholds; they complement WCAG rather than replace it.",
        "**EN 301 549** extends beyond the web to hardware, telecommunications, software and support services — useful for organisations that procure or build non-web ICT.",
      ],
    },
  },

  origin: {
    contributors: ["W3C Web Accessibility Initiative (WAI)", "Accessibility Guidelines Working Group (AG WG)"],
    period: "WCAG 1.0 (1999); WCAG 2.0 (2008); 2.1 (2018); 2.2 (2023, updated 2024)",
    problem:
      "As the web became essential to education, work and government services, people with disabilities faced barriers that individual organisations addressed inconsistently. A shared, testable international standard was needed.",
    narrative: [
      "WCAG 1.0 (1999) was a set of checkpoints closely tied to the HTML of its era. WCAG 2.0, published on 11 December 2008, reframed the guidelines as technology-neutral, testable success criteria under four principles {{src:w3c-wcag-overview}}.",
      "WCAG 2.1 (5 June 2018) added criteria for mobile, low vision and cognitive accessibility {{src:w3c-wcag-21}}. WCAG 2.2 (5 October 2023, updated 12 December 2024) added nine more and removed 4.1.1 Parsing {{src:w3c-wcag-22}}.",
      "Work on WCAG 3 — originally code-named 'Silver' — continues as a Working Draft with a different structure based on outcomes and assertions {{src:w3c-wcag-3-wd}}.",
    ],
    attributionNote:
      "WCAG is the product of a W3C working group process with public review; it should not be attributed to individual authors. Version dates here were checked on the W3C WAI overview page on 2026-11-03.",
  },

  application: {
    summary: [
      "WCAG shapes every layer of a product: the design system (tokens, components and their states), content (alternative text, headings, link text, error messages), engineering (semantics, names and roles, keyboard behaviour) and process (audits, conformance statements, procurement).",
    ],
    web: [
      "Use semantic HTML first; add ARIA only where native elements cannot express the role (see the W3C ARIA Authoring Practices Guide).",
      "Ensure every interactive element is reachable and operable by keyboard with a visible focus indicator that is not obscured.",
      "Provide text alternatives, captions and transcripts; ensure 1.4.3 contrast and 1.4.11 non-text contrast.",
    ],
    mobile: [
      "Apply WCAG to native apps through W3C's WCAG2ICT guidance and platform accessibility APIs (VoiceOver, TalkBack).",
      "Respect orientation (1.3.4), reflow (1.4.10) and target size (2.5.8), and provide alternatives to complex gestures and dragging (2.5.1, 2.5.7).",
    ],
    enterprise: [
      "Dense data tables, drag-heavy tools and custom widgets are the most common failure points; budget for accessible patterns early.",
      "Procurement in the public sector frequently requires EN 301 549 or Section 508 conformance reports for purchased software.",
    ],
    services: [
      "Conformance applies to complete processes: an accessible form followed by an inaccessible document upload or CAPTCHA fails the whole journey.",
      "Provide equivalent non-digital channels where a digital service cannot yet be made accessible, and say so clearly.",
    ],
    steps: [
      "Identify the version and level your obligations require; default to WCAG 2.2 AA.",
      "Map each success criterion to the components and content types it affects.",
      "Bake requirements into the design system and content guidelines.",
      "Test continuously: automated checks in CI, manual keyboard and screen-reader testing, and periodic expert audits.",
      "Include disabled participants in usability research.",
      "Publish an honest accessibility statement with known issues and contact routes.",
    ],
  },

  whenToUse: [
    "As the baseline requirement for any public-facing web or app product.",
    "As shared vocabulary between design, content, engineering and legal teams.",
    "As the structure for an accessibility audit or conformance report.",
  ],
  whenNotToUse: [
    "As the only measure of whether disabled people can actually use the product — pair it with usability research.",
    "As a design checklist applied at the end; retrofitting is far more expensive than designing in.",
    "Using WCAG 3 draft requirements as if they were normative.",
  ],
  advantages: [
    "International, consensus-based and freely available.",
    "Testable criteria enable audits, procurement and legal clarity.",
    "Technology-neutral, so it outlives specific frameworks.",
  ],
  limitations: [
    "Pass/fail criteria do not capture severity or overall user experience.",
    "Coverage of cognitive and learning disabilities is limited.",
    "Normative language can be ambiguous; interpretation varies between auditors.",
    "Automated tools detect only a portion of failures; manual testing is unavoidable.",
  ],
  misconceptions: [
    {
      myth: "If an automated checker passes the page, it conforms to WCAG.",
      reality:
        "Automated tools test only the criteria that can be machine-checked. Focus order, meaningful alternative text, logical reading order and understandable error messages require human evaluation.",
    },
    {
      myth: "WCAG 2.2 replaces WCAG 2.1, so 2.1 no longer matters.",
      reality:
        "Versions are backwards compatible and none deprecates the earlier ones. Many laws still reference 2.1, so teams often must report against 2.1 while building to 2.2 {{src:w3c-wcag-overview}}.",
    },
    {
      myth: "Accessibility means AAA everywhere.",
      reality:
        "AA is the usual target. The W3C itself advises against requiring AAA as a blanket policy, though individual AAA criteria are often worth adopting {{src:w3c-wcag-22}}.",
    },
    {
      myth: "WCAG 3 will use APCA for contrast.",
      reality:
        "As of the September 2026 Working Draft the contrast measure is explicitly undetermined {{src:w3c-wcag-3-wd}}.",
    },
  ],

  relations: [
    { target: "pour", type: "derived-from", note: "WCAG's success criteria are organised under the four POUR principles." },
    { target: "colour-contrast-ratio", type: "applied-in", note: "WCAG 1.4.3, 1.4.6 and 1.4.11 define contrast thresholds using the relative-luminance contrast-ratio formula." },
    { target: "fitts-law", type: "related-to", note: "2.5.8 Target Size (Minimum) and 2.5.5 Target Size (Enhanced) set pointer target sizes, a concern also modelled by Fitts's law." },
    { target: "keyboard-accessibility", type: "applied-in", note: "Guideline 2.1 Keyboard Accessible and 2.4.7 Focus Visible define keyboard operability requirements." },
    { target: "en-301-549", type: "influences", note: "EN 301 549 incorporates WCAG success criteria into its web, document and software clauses." },
    { target: "accessibility-audits", type: "measured-by", note: "Accessibility audits evaluate content against WCAG success criteria." },
    { target: "usability-testing", type: "complementary-to", note: "Usability testing with disabled participants reveals barriers that WCAG conformance alone does not." },
    { target: "inclusive-design", type: "complementary-to", note: "Inclusive design shapes experiences for diverse needs from the outset; WCAG sets the measurable floor." },
  ],

  standard: {
    issuer: "World Wide Web Consortium (W3C)",
    version: "2.2",
    published: "2023-10-05 (updated Recommendation 2024-12-12)",
    status: "W3C Recommendation",
    url: "https://www.w3.org/TR/WCAG22/",
  },

  exercises: [
    {
      id: "wcag-ex-map",
      kind: "assignment",
      level: "beginner",
      title: "Map a sign-up form to POUR",
      prompt: [
        "Take any sign-up form you use. For each of the four principles, find one thing the form does well and one possible barrier.",
        "For each barrier, name the success criterion you think it relates to, using the W3C 'How to Meet WCAG' quick reference.",
      ],
      deliverable: "A four-row table: principle, strength, barrier, criterion number.",
      criteria: ["Covers all four principles", "Each barrier tied to a specific criterion", "Barriers described from a user's point of view"],
    },
    {
      id: "wcag-ex-22-audit",
      kind: "critique",
      level: "intermediate",
      title: "Audit for what's new in 2.2",
      prompt: [
        "Pick a web app with login, drag-and-drop or a sticky header. Test it against 2.4.11, 2.5.7, 2.5.8, 3.2.6, 3.3.7 and 3.3.8 using only a keyboard and a ruler tool in browser devtools.",
        "Record pass/fail with evidence and propose fixes.",
      ],
      deliverable: "A short audit log with screenshots and a fix per failure.",
      criteria: ["Tests each of the six criteria", "Evidence for every judgement", "Fixes that meet the criterion's intent, not just its letter"],
      exampleSolution: [
        "Example finding: '2.4.11 — fail. Tabbing to the 'Terms' link places it beneath the sticky footer; the element is entirely hidden. Fix: add `scroll-padding-bottom` equal to the footer height so focused elements scroll into view.'",
      ],
    },
    {
      id: "wcag-ex-claim",
      kind: "reflection",
      level: "advanced",
      title: "What does a conformance claim really promise?",
      prompt: [
        "Write a one-page memo for a product leader explaining what a 'WCAG 2.2 AA conformant' claim guarantees, what it does not, and what additional evidence the organisation should gather before calling the product accessible.",
      ],
      criteria: ["Explains the five conformance requirements", "Identifies limits (severity, cognitive coverage, usability)", "Recommends research with disabled users"],
    },
  ],

  quiz: [
    {
      id: "wcag-q-levels",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A team says its site meets 'WCAG 2.2 Level AA'. What must be true?",
      options: [
        { text: "All Level A and Level AA success criteria are met for the pages in scope", correct: true, explanation: "AA conformance requires meeting every A and AA criterion (or providing a conforming alternate version)." },
        { text: "Only the Level AA success criteria are met", correct: false, explanation: "Levels are cumulative; AA includes all of Level A." },
        { text: "At least 80% of criteria are met", correct: false, explanation: "Conformance is not a percentage; every criterion at the level must be satisfied." },
        { text: "An automated accessibility checker reports no errors", correct: false, explanation: "Automated tools cannot evaluate many criteria; a clean scan is not a conformance claim." },
      ],
      explanation: "Conformance levels are cumulative and all-or-nothing at the claimed level, applied to full pages and complete processes.",
    },
    {
      id: "wcag-q-parsing",
      kind: "true-false",
      level: "intermediate",
      prompt: "WCAG 2.2 still includes success criterion 4.1.1 Parsing as a Level A requirement.",
      options: [
        { text: "True", correct: false, explanation: "4.1.1 Parsing is marked obsolete and removed in WCAG 2.2." },
        { text: "False", correct: true, explanation: "It was removed because browsers and assistive technologies no longer rely on the strict parsing it required. Teams obliged to report against 2.0/2.1 may still need to test it." },
      ],
      explanation: "WCAG 2.2 added nine criteria and removed 4.1.1 Parsing — the one exception to 'criteria are only added'.",
    },
    {
      id: "wcag-q-drag",
      kind: "scenario",
      level: "intermediate",
      prompt: "A project board lets users reorder tasks only by dragging cards. Which WCAG 2.2 criterion is most directly at risk?",
      options: [
        { text: "2.5.7 Dragging Movements", correct: true, explanation: "It requires that functionality using dragging can be achieved with a single pointer without dragging, unless dragging is essential." },
        { text: "1.4.3 Contrast (Minimum)", correct: false, explanation: "Contrast concerns text legibility, not the input method." },
        { text: "3.3.7 Redundant Entry", correct: false, explanation: "That criterion concerns re-entering previously provided information within a process." },
        { text: "2.4.13 Focus Appearance", correct: false, explanation: "Focus appearance concerns the visibility of focus indicators; it doesn't require alternatives to dragging." },
      ],
      explanation: "Provide a single-pointer alternative such as 'Move up/down' buttons or a 'Move to column' menu. Keyboard support is required separately by 2.1.1.",
    },
    {
      id: "wcag-q-wcag3",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "Which statement about WCAG 3 is accurate as of late 2026?",
      options: [
        { text: "It is a W3C Working Draft whose requirements may still be added, combined or removed", correct: true, explanation: "The September 2026 draft states it is a draft that may be updated, replaced or obsoleted." },
        { text: "It replaced WCAG 2.2 as a Recommendation in 2025", correct: false, explanation: "WCAG 3 is not a Recommendation; WCAG 2.2 is the current standard." },
        { text: "It mandates the APCA contrast algorithm", correct: false, explanation: "The draft says the contrast measure is yet to be determined." },
        { text: "It is identical to ISO/IEC 40500:2025", correct: false, explanation: "ISO/IEC 40500:2025 corresponds to WCAG 2.2 (October 2023 version)." },
      ],
      explanation: "Treat WCAG 3 as research direction, not as requirements. Build to WCAG 2.2.",
    },
  ],

  flashcards: [
    { id: "wcag-fc-pour", front: "POUR", back: "Perceivable, Operable, Understandable, Robust — WCAG's four principles." },
    { id: "wcag-fc-22", front: "What did WCAG 2.2 remove?", back: "4.1.1 Parsing (obsolete). It also added nine success criteria." },
    { id: "wcag-fc-target", front: "SC 2.5.8 Target Size (Minimum)", back: "Level AA: pointer targets at least 24×24 CSS px, with exceptions (spacing, equivalent, inline, user-agent control, essential)." },
    { id: "wcag-fc-conf", front: "Five conformance requirements", back: "Conformance level; full pages; complete processes; accessibility-supported uses; non-interference." },
  ],

  references: [
    { source: "w3c-wcag-22", role: "standard", note: "Normative text: principles, guidelines, success criteria, conformance requirements." },
    { source: "w3c-wcag-21", role: "standard", note: "Previous version, still referenced by many laws." },
    { source: "w3c-wcag-overview", role: "primary", note: "Version history, backwards compatibility, ISO/IEC 40500 and EN 301 549 status." },
    { source: "w3c-understanding-wcag-22", role: "explanatory", note: "Intent and rationale for each criterion, including contrast threshold derivation." },
    { source: "w3c-wcag-3-wd", role: "further", note: "Working Draft of the next generation; not normative." },
    { source: "etsi-en-301-549-v321", role: "standard", note: "European harmonised standard incorporating WCAG 2.1." },
    { source: "w3c-aria-apg", role: "further", note: "Patterns for accessible custom widgets." },
    { source: "webaim", role: "further", note: "Practical training material and tools." },
  ],
  evidence: "official-standard",
  evidenceNote:
    "WCAG is a normative W3C Recommendation produced by consensus. Individual thresholds draw on psychophysical research, earlier ergonomics standards and practice with disabled users, but conformance itself is not evidence that a product is usable by disabled people — that requires testing with them.",

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
  lastVerifiedAt: "2026-11-03",
});
