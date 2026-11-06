import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "design-system",
  slug: "design-system",
  title: "Design System",
  alternateNames: ["Design systems", "Product design system", "UI design system"],
  summary:
    "A maintained set of shared design decisions, reusable components and patterns, guidance, code and working practices that teams use to build coherent products, kept current by the people who own, change and support it.",
  definition:
    "A **design system** is the shared, maintained infrastructure an organisation uses to design and build its interfaces: agreed decisions about colour, type, spacing and behaviour (often published as [[design-tokens|design tokens]]); reusable **components** in design files and code; **patterns** for recurring tasks; the **guidance** that says when and how to use them; and the **operating practices** (ownership, contribution, review, release and support) that keep all of it current. This is a working synthesis rather than a standard definition: no standards body defines the term, organisations draw its boundaries differently, and the same words (style guide, pattern library, component library) are used for overlapping things {{src:frost-2016}} {{src:kholmatova-2017}}. What separates a design system from a collection of assets is that it is used, owned and changed over time: Frost quotes Nathan Curtis's distinction between a style guide as an artefact of the design process and a design system as a living, funded product with a roadmap and backlog, serving an ecosystem {{src:frost-2016}}.",
  primaryType: "concept",
  secondaryTypes: [],
  domain: "design-systems",
  subcategory: "foundations",
  tags: ["design systems", "components", "patterns", "design tokens", "governance", "contribution", "versioning", "documentation", "design-code parity", "multi-brand"],
  difficulty: "beginner",
  disciplines: ["Design systems", "Interaction design", "Visual design", "Front-end engineering", "Accessibility", "Design operations", "Product management"],
  learningObjectives: [
    "Define a design system and explain why it is more than a style guide, UI kit or component library.",
    "Describe how principles, foundations, tokens, components, patterns, templates and products depend on each other, and how a decision travels through them.",
    "Specify a component as a contract: anatomy, properties, variants, states, accessibility, responsive behaviour and usage guidance.",
    "Explain how contribution, review, versioning, migration and deprecation keep a system usable over time.",
    "Judge when a formal design system is worth its cost, and evaluate one without relying on adoption counts alone.",
  ],
  prerequisites: ["ui-design"],

  levels: {
    beginner: {
      explanation: [
        "Picture three online services run by one organisation (an illustrative case). Each team chose its own button colour, its own way of asking for a date and its own error messages. People who use two of the services meet two different date fields, and when one team fixes an accessibility problem in its date field, the other two keep the bug.",
        "A **design system** gives those teams one shared place for such decisions. It records the basic choices (colours, type sizes, spacing), turns them into reusable **components** such as a button or a date input, combines components into **patterns** for common tasks such as asking for a date of birth, and explains when and how to use each one. Designers find the parts in their design tool; developers install the same parts as code.",
        "The difference between a design system and a folder of reusable parts is that someone looks after it. The GOV.UK Design System, for example, publishes styles, components and patterns for government services and is maintained by a team at the Government Digital Service, with proposals and contributions from teams across government {{src:govuk-design-system}}. Parts are added when there is evidence they are needed, fixed when problems are reported and released as new versions.",
        "The parts depend on each other in one direction. A decision such as \"the main action colour\" is stored once as a token; the button component uses that token; a sign-up pattern uses the button; and dozens of product screens use the pattern. Change the decision once and the change travels up through every layer that uses it.",
        "Several related things are often confused with a design system. A **style guide** sets rules and examples for how things should look and read. A **UI kit** is a set of ready-made interface pieces in a design tool. A **component library** is reusable components, usually in code. A design system usually contains some of these and connects them with guidance and ownership, but organisations use the words differently, so ask what a team means before you compare.",
      ],
      analogy:
        "A railway network does not get consistent signs by building identical stations. It shares a signage standard, a catalogue of manufactured sign parts, rules for where signs go, and an office that updates the standard when stations report problems. Stations still look different, yet travellers find their platform in each one. A design system plays all four roles for digital products: the standard, the parts, the placement rules and the people who keep them current.",
      everydayExamples: [
        "Government services built with the GOV.UK Design System ask for dates, names and addresses in the same way, because they reuse its components and patterns.",
        "Illustrative: a bank changes the colour of its main action once in the system, and the web app, the mobile app and the staff tool pick up the new colour in their next release.",
        "Illustrative: a product team needs a file-upload control, finds one in the system with its error states and screen-reader behaviour already documented, and spends its time on the part of the screen that is specific to its service.",
      ],
      vocabulary: [
        { term: "Design system", meaning: "Shared, maintained decisions, components, patterns, guidance, code and practices that teams use to build coherent products." },
        { term: "Foundations", meaning: "The basic visual and interaction decisions every component relies on: colour, typography, spacing, layout, shape, elevation, iconography, motion and accessibility rules." },
        { term: "Design token", meaning: "A named record of one design decision, such as the colour of primary text, stored once and used by design files and code." },
        { term: "Component", meaning: "A reusable interface element with defined parts, options, states and behaviour, such as a button, text input or table." },
        { term: "Pattern", meaning: "A documented, reusable way of handling a recurring task or problem, usually combining several components and content, such as asking for an address." },
        { term: "Governance", meaning: "Who owns the system, who decides what goes into it, and how changes are proposed, reviewed and released." },
      ],
    },

    intermediate: {
      explanation: [
        "Treat a design system as layers of decisions, each built on the ones beneath. **Product and user needs** and **principles** state what the system is for. A **design language** gives products a shared visual and interaction vocabulary. **Foundations** turn that language into concrete scales and rules. **Tokens** record those decisions by name. **Components** use tokens. **Patterns** and **templates** arrange components for tasks and pages. **Product interfaces** use all of it. Alongside every layer run **documentation**, the **design and code libraries**, and **governance**: who may change what, and how. This is a teaching model, not an order of construction. Real systems start wherever the pain is, often with an inventory of existing components, and fill in foundations as they go.",
        "**Foundations** need shared and *semantic* decisions because a raw value carries no intent. A colour named for its role, such as text on a danger message, can change in a dark theme or for a second brand without anyone editing the components that use it, as long as every text and surface pairing still meets contrast requirements. The same holds for spacing scales, type scales, elevation, corner radius, motion durations, breakpoints and density settings. Token layering (primitive, semantic and component tokens), aliasing, modes and platform transformation are covered in [[design-tokens|Design Tokens]]. This entry treats tokens as one layer of the larger system.",
        "A **component** is a contract between design intent and implementation. Its **anatomy** names the parts (for a text input: label, hint, field, error message, character count). Its **properties** are the inputs a product team may set (label text, width, whether it is required). **Variants** are deliberate alternatives with different purposes (primary or secondary button). **States** are conditions the component passes through (default, hover, focus, disabled, error, loading). The contract also covers accessibility behaviour (accessible name, focus order, keyboard interaction, announcements) and responsive behaviour. When the design file and the code disagree about any of these, product teams build from whichever they happen to open, and the products drift apart.",
        "**Patterns** sit above components. A component is a single control. A pattern is a recurring task solved with several components, content and rules: GOV.UK, for example, documents patterns that help users enter names and addresses, fill in forms and create accounts {{src:govuk-design-system}}. Templates go one step further, setting out the structure of a whole page. In Frost's atomic design, templates show a page's underlying content structure, and pages are instances of templates with real representative content in place, which shows whether the system holds up {{src:frost-2016}}. Patterns earn their place when the task recurs across services. Domain-specific patterns (a claims form, a clinical chart) may belong in a product's own extension rather than the shared core.",
        "**Documentation** turns parts into decisions people can reuse. Useful documentation for a component states what it is for and when not to use it, shows good and poor uses, gives the anatomy, the states and the accessibility requirements, includes content guidance and responsive behaviour, links the design file and code example, and lists version compatibility and known limitations. Documentation cannot replace research with users, judgement about a particular service, or testing a product in its real context.",
        "**Governance** decides how the system changes. In GOV.UK's model anyone can propose a component or pattern. A proposal must show it would be *useful* (evidence that many teams or services need it) and *unique* (it does not duplicate something already in the system). Before publication it must be *usable* (tested in user research with a representative sample, including disabled people), *consistent* (it reuses existing styles and components and follows the style guide and coding standards) and *versatile* (it works across the range of services that need it, browsers, assistive technologies and devices). The design system team then reviews it and decides whether it can be published as it is or only after recommended changes {{src:govuk-design-system}}.",
      ],
      howItWorks: [
        "**A decision travels upward.** A principle (\"make the main action unmistakable\") becomes a foundation (an action colour with sufficient contrast), a token records it, the button component uses the token, sign-up and payment patterns use the button, and products use those patterns. Because each layer refers to the one below rather than copying it, one change reaches every product that updates to the new version.",
        "**Feedback travels downward.** Product teams find gaps and defects, report them or propose additions, and the system team or contributors evaluate, build, test, document and release a change. Without that return path the system falls behind its products, and teams build local copies.",
        "**Design and code are two views of one component.** A design library (components and variables in a design tool) and a code library (packages for each platform) express the same anatomy, properties, variants, states and tokens. Parity checks compare them; documentation links them.",
        "**Core and extensions.** Large organisations often separate a shared core from specialised layers. IBM describes Carbon as a foundation that several systems extend: Carbon Core provides foundations, components, patterns, guidance and code, and Carbon for Products builds on it with components and guidance for software products, as a specialised layer rather than a replacement {{src:carbon-design-system}}.",
        "**Adoption can be incremental.** The U.S. Web Design System's maturity model describes adopting the system in stages, from its design principles, through its guidance, to its code. It also states that consistency is not necessarily conformity: agencies with different audiences may implement differently while starting from shared solutions and values {{src:uswds}}.",
      ],
      implementation: [
        "Start with an audit: collect screenshots and code of every button, field, table and message across products; group duplicates and near-duplicates; note accessibility defects and inconsistent behaviour.",
        "Agree purpose, scope and decision rights before building: which products the system serves, who owns it, who approves additions, and how product teams ask for help.",
        "Define foundations and their semantic names from real usage, then build only the components that recur across products and cost the most to keep re-building.",
        "Specify each component as a contract (anatomy, properties, variants, states, accessibility and responsive behaviour, usage guidance) and keep the design and code versions in step.",
        "Test components and patterns in real product contexts with users, including disabled people and assistive technologies, not only in an isolated gallery.",
        "Publish documentation, a contribution process, release notes and migration guidance from the first release, because the first product team to adopt the system needs them.",
        "Version releases according to an explicit compatibility policy, and deprecate with a migration path and a notice period rather than deleting.",
      ],
      scenarios: [
        "Illustrative worked example. *Harbourline* is a fictional ferry operator with three products: a public booking website, a mobile app and a staff ticketing tool. An audit finds eleven button styles, four date pickers and three error-message formats. The team agrees two principles (\"tell people what happened and what to do next\" and \"work one-handed on a moving deck\"), defines action, text, surface, danger and focus colours as semantic tokens, and builds a button, a text input, a date input and an error summary first, because those appear on every booking step. The staff tool needs a dense data table that the public products do not, so it goes into the staff tool's own extension, built from the shared tokens, and moves into the core only if another product needs it.",
        "A product team asks for a \"card with optional image, tag, rating, price, button and badge\". Rather than adding six boolean properties to one component, the system team documents a small card container with slots and two task-specific patterns, because one component asked to fit every case becomes hard to understand, test and change.",
        "The design library shows a loading state for the button, but the code package has none, so teams hand-roll spinners. The system team adds the state to the code, documents how it is announced to screen-reader users, and adds a parity check to its release review.",
      ],
    },

    advanced: {
      explanation: [
        "**Governance models trade control against reach.** A small central team gives consistent quality and a clear owner, but it becomes a bottleneck and can lose touch with product needs. A federated or community model lets product teams contribute, which spreads knowledge and adds capacity, but it needs explicit criteria, review and support so that contributions stay coherent. Carbon describes itself as a distributed effort run on open-source principles, with named maintainers for contributed components and inner-source use inside IBM {{src:carbon-design-system}}. GOV.UK pairs open proposals with an annual community prioritisation and team review against published criteria {{src:govuk-design-system}}. Neither is a universal best model: the right balance depends on the number of teams, their skills, the risk of inconsistency and the funding available.",
        "**Decision rights matter more than the org chart.** For each kind of change (a new token, a new variant, a new component, a breaking change), state who may propose it, who reviews it, what evidence is required and who can approve an exception. Product-specific extensions need a documented boundary: what they may override, what they must reuse (typically tokens and accessibility behaviour), and when a local pattern is promoted into the shared core. Recording decisions and their reasons prevents the same debate recurring every year.",
        "**Versioning is a promise about compatibility.** A system that publishes code packages needs a policy saying what counts as a breaking change. Semantic Versioning, a widely used convention, increments the major version for incompatible changes to a declared public API, the minor version for backward-compatible additions and the patch version for backward-compatible fixes {{src:semver-2}}. For a design system the \"public API\" includes component properties, token names, emitted markup and documented behaviour, so renaming a property or a token is breaking even if nothing looks different. Not every system follows Semantic Versioning, and design files and documentation also need a release policy. Whatever the convention, pair breaking changes with release notes, migration guidance, a deprecation period and, where possible, automated codemods.",
        "**Multi-brand and cross-platform systems separate what must be shared from what may differ.** A common arrangement shares behaviour, accessibility, semantic token names and component APIs, and lets brands or platforms supply different primitive values, typography or density through themes. Platforms impose their own conventions, input methods and accessibility APIs, so a component may need a platform-specific implementation that honours the same contract rather than an identical rendering. Adobe describes Spectrum as one shared foundation across products and platforms that must stay flexible for the distinct needs of each product, and frames Spectrum 2 as a move from the web to native mobile and desktop {{src:adobe-spectrum}}. Internationalisation adds text expansion, right-to-left layout, locale formats and font coverage, which a component contract has to state rather than assume.",
        "**Measure quality, not only spread.** Adoption counts (how many products install the package) show reach, not whether the system helps. A more honest picture combines several signals: depth of use (which components products use, and how often they override or detach them), defects and accessibility issues per component, design-code parity, time to answer support requests and review contributions, contribution activity, documentation search failures, and what designers and developers report in interviews or surveys. Each signal can be gamed or misread. High adoption can reflect a mandate rather than usefulness, and low override rates can hide teams that quietly built their own parts. Treat any maturity model, including USWDS's principles–guidance–code levels, as a guide to conversation rather than a research-backed scale {{src:uswds}}.",
        "**Consistency is a means, not the goal.** A system that forces every product into the same layout can make a specialised task worse. The aim is coherence where users benefit (the same date input behaves the same everywhere) and freedom where the task differs. When a component serves almost no one, has been forked by every product or blocks a needed change, the right move may be to extend it, simplify it, or deprecate it.",
      ],
      evidence: [
        "The evidence base for design systems is **practice-based**. What is well documented is how specific organisations structure and run their systems: published architectures, contribution criteria and processes, maturity models and release practices {{src:govuk-design-system}} {{src:uswds}} {{src:carbon-design-system}} {{src:adobe-spectrum}}, and practitioner books that synthesise experience {{src:frost-2016}} {{src:kholmatova-2017}} {{src:curtis-2009}}. No peer-reviewed controlled studies or replications of design systems' effects on productivity, consistency, cost or conversion were found in the research for this entry. Claims of specific efficiency gains are organisation-specific reports, not generalisable findings.",
        "Organisations' own documentation states their intent and process, not tested outcomes. When Carbon says its core assets let teams build consistent experiences faster, that is a description of purpose by the system's owner {{src:carbon-design-system}}. GOV.UK's requirement that components are tested with users, including disabled people, before publication is a quality gate on each component, not a study of the system's overall effect {{src:govuk-design-system}}.",
      ],
      debates: [
        "**How much should a system standardise?** Some teams push for one way of doing everything, to maximise consistency and reuse; others argue that excessive standardisation slows products and produces generic interfaces. USWDS's phrase that consistency is not necessarily conformity marks one position in this debate {{src:uswds}}.",
        "**Central team or community?** Central ownership gives coherence and accountability; community contribution gives scale and relevance. Most mature public systems combine them (an owning team plus open proposals and contributions), but the mix is a choice, not a rule.",
        "**Which source of truth?** Teams disagree on whether code, design files or tokens should be authoritative when they diverge. Treating the component contract and token definitions as the shared source, with design and code as two implementations checked for parity, is one answer; code-first teams prefer the shipped package as the reference.",
        "**Generic components or specific ones?** Highly configurable components promise reuse but accumulate options that interact unpredictably; small, composable components and documented patterns are easier to test but require more assembly by product teams.",
      ],
      alternativeModels: [
        "**Atomic design** (atoms, molecules, organisms, templates, pages) is one well-known way to think about component hierarchy. Frost presents it as a mental model rather than a linear process {{src:frost-2016}}. It structures components; it says less about governance, release and adoption, which this entry treats as part of the system.",
        "**Foundations, components and patterns** (the organisation used by GOV.UK, Carbon and others) groups content by kind rather than by size, which maps more directly to how teams look things up {{src:govuk-design-system}} {{src:carbon-design-system}}.",
        "**Core plus extensions** treats the system as a shared base with specialised layers for product families, as in Carbon Core and Carbon for Products {{src:carbon-design-system}}; it suits large organisations where one library cannot serve every context.",
        "**No formal system**: a small team with one product may do better with a short style guide, a handful of shared CSS variables and code review than with a separately governed system.",
      ],
    },
  },

  origin: {
    contributors: ["Nathan Curtis", "Brad Frost", "Alla Kholmatova", "18F and the U.S. Digital Service", "Government Digital Service (UK)"],
    period: "Reusable UI components and pattern libraries in the 2000s; design systems as maintained products through the 2010s",
    problem:
      "As organisations built many products and platforms with many teams, the same interface decisions were made, built and fixed repeatedly, and products drifted apart in appearance, behaviour and accessibility.",
    narrative: [
      "Practitioners documented reusable interface components well before the term became common: Curtis's *Modular Web Design* (2009) addressed reusable components for UX design and documentation {{src:curtis-2009}}. Frost's *Atomic Design* (2016) described style guides and pattern libraries as cornerstones of systematic interface design and argued that a design system needs ongoing maintenance and support to last {{src:frost-2016}}. Kholmatova's *Design Systems* (2017) treats patterns and the practices around them as the foundations of a design system, written from her practice as an interaction and visual designer {{src:kholmatova-2017}}.",
      "Public-sector systems made the operating model visible. USWDS was created in 2015 by 18F and the U.S. Digital Service with an advisory board from several federal agencies, and is maintained within the General Services Administration {{src:uswds}}. The GOV.UK Design System publishes its contribution criteria and process alongside its styles, components and patterns {{src:govuk-design-system}}.",
    ],
    attributionNote:
      "No single person or organisation originated design systems, and the term has no agreed first use; claims that one company 'invented' them are not supported here. Curtis's book is often cited as 2010 (its copyright date); the publisher gives 24 June 2009 as the publication date.",
  },

  application: {
    summary: [
      "A design system applies wherever several teams, products or platforms must stay coherent while changing. It looks different at each scale: a few shared components for one product, a governed core with extensions for a large organisation.",
    ],
    web: [
      "Publish components as versioned packages, with tokens compiled to CSS custom properties, and document emitted markup so product teams can test accessibility.",
      "Keep a public or internal documentation site with live examples, usage guidance, accessibility notes and release notes for each version.",
    ],
    mobile: [
      "Share semantic tokens and component contracts across iOS, Android and web, but implement components natively where platform conventions, gestures and accessibility APIs differ.",
      "Respect platform text-size settings and touch-target conventions in the component contract rather than copying web dimensions.",
    ],
    enterprise: [
      "Separate a shared core from product-family extensions (dense data tables, complex filters) with a documented rule for promoting local components into the core.",
      "Support several brands or tenants through themes that change primitive values while keeping behaviour and accessibility shared.",
    ],
    services: [
      "Document patterns for whole tasks across channels (asking for an address, confirming a payment, recovering from an error), not only screen components.",
      "Apply the same content and accessibility guidance to letters, emails and kiosks that belong to the same service.",
    ],
    steps: [
      "Audit: inventory products and interfaces, group repeated components, record inconsistencies and accessibility and usability problems, and review existing code.",
      "Define: agree the system's purpose, scope, users and stakeholders, design principles, ownership and decision rights.",
      "Foundations: define colour, type, spacing, layout, shape, elevation, iconography, motion and accessibility rules with semantic names, and set up the token architecture.",
      "Components: choose the highest-value recurring components and specify anatomy, properties, variants, states, accessibility and responsive behaviour.",
      "Patterns: combine components into task-oriented patterns, document when to use them and where products may adapt them.",
      "Documentation: write usage guidance, specifications and accessibility requirements; link design files and code examples; state limitations.",
      "Implementation: build and test, check design-code parity, and validate components inside real products with users.",
      "Governance: publish contribution guidance and review criteria, manage exceptions and extensions, and keep decision records.",
      "Release and maintenance: version releases, communicate changes, provide migration guidance, and deprecate obsolete parts with notice. Feedback from products returns to any earlier stage; the sequence repeats rather than ending.",
    ],
  },

  whenToUse: [
    "Several products, teams or platforms repeat the same interface elements and need to stay coherent for users.",
    "Accessibility, brand or regulatory requirements must be met consistently, and fixes should reach every product.",
    "There is, or can be, an owner with time and funding to maintain, support and release the system.",
    "Products need themes, several brands or density modes that are expensive to implement one product at a time.",
  ],
  whenNotToUse: [
    "A single small product with one team, where a short style guide, shared variables and code review cost less than a separately governed system.",
    "An early product still searching for its purpose, where freezing components now would lock in decisions that research will change.",
    "When no one can own it: an unmaintained library that falls behind its products becomes something teams work around.",
    "As a substitute for user research or design judgement: reusing a component does not make it right for a task it was not designed for.",
  ],
  advantages: [
    "Decisions and fixes made once can reach every product that adopts the change, including accessibility fixes.",
    "People meet the same behaviour for the same task across products, which can reduce relearning where tasks really are the same.",
    "Teams spend less time rebuilding common parts and more on product-specific problems, as owners of public systems describe their intent; the size of any saving depends on the organisation and is not established by controlled research.",
    "A shared vocabulary of named components, patterns and tokens makes design and engineering conversations more precise.",
  ],
  limitations: [
    "It costs continuing effort: documentation, support, review, releases and migrations need funded people, not a one-off project.",
    "Central control can become a bottleneck, and a system that cannot change quickly enough pushes teams into local copies.",
    "Consistency can be over-applied, forcing specialised tasks into components that do not fit them.",
    "Highly configurable components and deep token layers add complexity that few people understand.",
    "Adoption figures and maturity models are easy to report and easy to misread; they do not show that products became more usable or accessible.",
    "Evidence for benefits is practice-based and organisation-specific; there are few controlled studies.",
  ],
  misconceptions: [
    {
      myth: "A design system is a component library (or a UI kit in a design tool).",
      reality:
        "A component library is usually one part. A design system also includes foundations, patterns, guidance, the link between design files and code, and the people and processes that maintain it; Frost, quoting Curtis, contrasts a style guide as an artefact with a design system as a living, funded product {{src:frost-2016}}.",
    },
    {
      myth: "Once built, a design system is finished.",
      reality:
        "Systems change with their products: proposals, research, review, releases and deprecation continue for as long as the system is used, as the published processes of GOV.UK show {{src:govuk-design-system}}.",
    },
    {
      myth: "A design system guarantees consistency, speed and lower costs.",
      reality:
        "Those are intended outcomes that depend on adoption, quality, governance and fit; they are not established by controlled research, and a neglected system can make products less consistent as teams work around it.",
    },
    {
      myth: "Consistency means every product must look and work the same.",
      reality:
        "Coherence matters where tasks are the same; products with different audiences may implement differently from shared foundations. USWDS states that consistency is not necessarily conformity {{src:uswds}}.",
    },
    {
      myth: "Atomic design is how design systems must be structured.",
      reality:
        "Atomic design is one mental model for component hierarchy {{src:frost-2016}}; many systems organise themselves as foundations, components and patterns, or as a core with extensions {{src:carbon-design-system}}.",
    },
  ],

  relations: [
    { target: "design-tokens", type: "complementary-to", note: "Tokens are the layer of named decisions a design system's components consume; the Design Tokens entry explains layering, aliasing, themes and the DTCG format that this entry only summarises." },
    { target: "ui-design", type: "applied-in", note: "A design system packages UI design decisions (hierarchy, controls, states, feedback) so they can be reused across many screens and products." },
    { target: "interaction-design-discipline", type: "related-to", note: "Component states, feedback and patterns encode interaction-design decisions about how a system responds over time." },
    { target: "accessibility-concept", type: "applied-in", note: "Accessibility built into shared components and patterns, and tested with disabled people, reaches every product that uses them; a defect in a shared component spreads just as far." },
    { target: "wcag", type: "measured-by", note: "Component and pattern accessibility requirements are commonly written and tested against WCAG success criteria." },
    { target: "atomic-design", type: "contrasts-with", note: "Atomic design is one model of component hierarchy inside a system; it does not cover governance, release and adoption." },
    { target: "design-language", type: "derived-from", note: "A system's foundations and components express a design language: the shared visual and interaction vocabulary of a brand or product family." },
    { target: "component-architecture", type: "related-to", note: "How components are structured, composed and given APIs is the engineering core of a design system." },
    { target: "variants", type: "related-to", note: "Variants are deliberate alternatives within a component's contract, distinct from states and properties." },
    { target: "component-properties", type: "related-to", note: "Properties are the public inputs of a component; changing them is a compatibility decision for the whole system." },
    { target: "component-libraries", type: "related-to", note: "A component library is the reusable code or design implementation of the system's components; the system adds foundations, patterns, guidance and governance." },
    { target: "theme-architecture", type: "applied-in", note: "Themes for brands, modes and density are implemented system-wide through semantic tokens and component contracts." },
    { target: "multi-brand-systems", type: "applied-in", note: "Multi-brand systems share behaviour and component APIs while letting brands supply different foundations." },
    { target: "design-governance", type: "related-to", note: "Governance decides who owns the system and how proposals, reviews, exceptions and releases work." },
    { target: "design-system-versioning", type: "related-to", note: "Versioning and migration policy define which changes are breaking and how product teams move between releases." },
    { target: "design-qa", type: "measured-by", note: "Design QA checks that implementations match the component contract, including design-code parity and states." },
    { target: "design-system-audits", type: "related-to", note: "An interface audit is the usual starting point for a system and a recurring check on adoption and drift." },
    { target: "consistency-principle", type: "applied-in", note: "Design systems are one way organisations apply the heuristic of consistency and standards across many products." },
    { target: "design-to-development-handoff", type: "related-to", note: "Shared components and tokens change handoff from describing every detail to referring to agreed, versioned parts." },
  ],

  exercises: [
    {
      id: "design-system-ex-audit",
      kind: "assignment",
      level: "beginner",
      title: "Audit three screens for shared decisions",
      prompt: [
        "Illustrative brief: a library's website has a catalogue search page, a book-renewal form and an account page. The search button is solid blue with 4 px corners; the renewal form's submit button is solid teal with 12 px corners; the account page uses a blue outlined button with 8 px corners for its main action. Dates are typed free-hand on the renewal form and chosen from a calendar on the account page. Errors appear as red text under the field on one page and as a pop-up alert on another.",
        "List the decisions that repeat, the inconsistencies, the foundations you would share, and the components that genuinely warrant reuse. Say which differences you would keep, and why.",
      ],
      deliverable: "A four-column table (repeated decision · inconsistency · shared foundation or token · component to build) and two sentences on what you would not standardise.",
      criteria: [
        "Separates foundations (colour, corner radius, spacing) from components (button, date input, error message)",
        "Names the main action colour and corner radius as one decision each, not one per page",
        "Treats error presentation as a pattern with accessibility consequences (an alert that interrupts versus a message linked to the field)",
        "Builds only components that recur, and justifies at least one difference to keep",
      ],
      exampleSolution: [
        "Repeated decisions: a main action button on every page; a date entry; error messages. Inconsistencies: three button colours and three radii for the same role; two date-entry methods; two error presentations.",
        "Shared foundations: one action colour and one corner-radius step as semantic tokens; one error colour paired with text that meets contrast. Components: a button with primary and secondary variants; one date input chosen after testing which method suits renewals; an error message linked to its field, plus an error summary pattern for forms.",
        "Keep: the calendar may be right where the task is to pick a nearby date, so test both methods before choosing; standardise the behaviour and the error pattern, not the existence of one widget for every date task.",
      ],
    },
    {
      id: "design-system-ex-architecture",
      kind: "assignment",
      level: "intermediate",
      title: "Map a decision through the architecture",
      prompt: [
        "Choose one principle for an illustrative product (for example, \"show people what happened and what to do next\").",
        "Map it through design principle → foundation → token → component → pattern → product interface, writing one concrete item at each layer. Then explain three dependencies: what breaks, or must change, in the layer above if you change the layer below.",
      ],
      deliverable: "A six-row chain with one concrete item per layer and three short dependency explanations.",
      criteria: [
        "Each layer holds one concrete item, not a generic label",
        "The token is named for its purpose, not its value",
        "At least one dependency explains how a change propagates and at least one explains a compatibility risk",
        "Shows where documentation and governance touch the chain",
      ],
      exampleSolution: [
        "Principle: show what happened and what to do next. Foundation: an error colour and an error icon that meets non-text contrast, plus a rule that errors are written as what to do. Token: color.feedback.danger.text. Component: error message (text input error state, linked to the field). Pattern: error summary at the top of a form listing each problem as a link to its field. Product: the renewal form shows \"Enter a renewal date in the future\" above the form and next to the field.",
        "Dependencies: changing the danger token's value changes every error message, so contrast must be rechecked against every surface it sits on; renaming the token is a breaking change for every component that references it; changing the error message's markup changes how the error summary links to fields, so the pattern's documentation and tests must change in the same release.",
      ],
    },
    {
      id: "design-system-ex-contract",
      kind: "assignment",
      level: "intermediate",
      title: "Write a component contract",
      prompt: [
        "Illustrative scenario: three products each need a text input for short answers (names, reference numbers, email addresses). Write its contract.",
        "Cover anatomy, properties, variants, states, accessibility behaviour, responsive behaviour and usage guidance (including when not to use it).",
      ],
      deliverable: "A one-page specification a designer and a developer could both build from.",
      criteria: [
        "Anatomy names every part, including label, hint and error message",
        "Distinguishes properties, variants and states",
        "Accessibility covers accessible name, hint and error association, focus, keyboard behaviour and announcement of errors",
        "Responsive behaviour states width rules and touch-target size",
        "Usage guidance says when to use a different component (long text, choosing from options, dates)",
      ],
      exampleSolution: [
        "Anatomy: label (always visible), optional hint, field, error message, optional prefix or suffix. Properties: label, hint, name, value, width (fixed character widths or full), autocomplete, input mode, required. Variants: none beyond width; avoid visual variants without a different purpose. States: default, hover, focus (visible indicator), filled, disabled (discouraged; explain why), read-only, error.",
        "Accessibility: the label is the accessible name; the hint and error are programmatically associated with the field; the error is announced when the form is validated; focus is visible and not obscured; works with keyboard alone and with zoom. Responsive: full width on narrow screens, width matched to expected input length elsewhere; field height meets the system's touch-target rule.",
        "Usage: use for single-line answers. Do not use for long answers (use a textarea), for choosing among a few options (use radios), or for dates (use the date input). Content: labels say what to enter; error messages say what to do.",
      ],
    },
    {
      id: "design-system-ex-governance",
      kind: "scenario",
      level: "advanced",
      title: "Decide between conflicting requests",
      prompt: [
        "Illustrative scenario: an organisation has one design system team and six product teams. The payments team wants the button's primary colour changed to its campaign colour. The internal tools team wants a dense table component. The mobile team wants the button's `kind` property renamed to `variant` to match its platform code. Two teams have built their own date pickers.",
        "Propose ownership, a contribution process, decision rights, review criteria, a release strategy and how you would handle exceptions. Explain the trade-offs.",
      ],
      deliverable: "A one-page governance proposal with a decision for each of the four requests.",
      criteria: [
        "Assigns clear ownership and decision rights for tokens, components and breaking changes",
        "Uses evidence-based criteria (need across teams, uniqueness, usability, accessibility, consistency, versatility) rather than seniority",
        "Treats the rename as a breaking change with versioning, migration and deprecation",
        "Uses an extension or exception path where a need is local",
        "Names at least two trade-offs of the chosen model",
      ],
      exampleSolution: [
        "Ownership: the system team owns the core and approves breaking changes; product teams own extensions. Process: propose with evidence of need across teams, check for duplicates, develop with the system team, test with users including disabled people, review against criteria, release.",
        "Requests: (1) Campaign colour: decline for the core action token because it would change every product; offer a documented campaign theme or a promotional component scoped to the payments product. (2) Dense table: build in the internal tools extension from shared tokens; promote to the core if a second product needs it. (3) Rename: accept only as a major release, with the old name deprecated for a stated period, a codemod and migration notes; or decline if the cost to six teams exceeds the benefit. (4) Two date pickers: research both, choose or merge, and deprecate the other with a migration path.",
        "Trade-offs: central approval protects coherence but slows teams; extensions keep the core small but risk drift; deprecation periods protect products but keep old code alive longer.",
      ],
    },
  ],

  quiz: [
    {
      id: "design-system-q-what",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What most clearly separates a design system from a UI kit?",
      options: [
        { text: "It connects foundations, components, patterns, guidance and code, and is owned and maintained over time", correct: true, explanation: "A UI kit is a set of ready-made pieces in a design tool; a design system connects such pieces to code and guidance and has people and processes that keep them current." },
        { text: "It contains more components", correct: false, explanation: "Size is not the difference; a small, maintained system is still a system, and a huge kit with no owner is not." },
        { text: "It is made in a particular design tool", correct: false, explanation: "Tools implement a system; they are not what makes it one." },
        { text: "It only contains colours and fonts", correct: false, explanation: "Colours and fonts are foundations, one layer among several." },
      ],
      explanation: "Ownership, guidance and the link between design and code are what turn a set of parts into a system.",
    },
    {
      id: "design-system-q-pattern",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "\"Asking for a date of birth\", with a date input, a label, a hint, an error message and advice on when to ask, is best described as:",
      options: [
        { text: "A pattern", correct: true, explanation: "It solves a recurring task by combining components, content and guidance." },
        { text: "A component", correct: false, explanation: "The date input is a component; the task-level solution around it is a pattern." },
        { text: "A design token", correct: false, explanation: "Tokens are named design decisions such as colours or spacing values." },
        { text: "A template", correct: false, explanation: "A template sets out the structure of a whole page, not one task within it." },
      ],
      explanation: "Components are single controls; patterns combine them to handle a recurring task.",
    },
    {
      id: "design-system-q-propagation",
      kind: "scenario",
      level: "beginner",
      prompt: "A team updates the main action colour in its design file, but the live products still show the old colour weeks later. What is the most likely gap?",
      options: [
        { text: "The decision lives separately in the design file and the code, instead of in one shared token that both use and that products receive through a release", correct: true, explanation: "When a decision is stored once and consumed by both design and code, a change can travel to products through the next release." },
        { text: "The new colour fails contrast", correct: false, explanation: "That would be a different problem; it does not explain why the old colour is still shown." },
        { text: "The products use too many components", correct: false, explanation: "The number of components does not stop a shared value from updating." },
        { text: "Design files cannot store colours", correct: false, explanation: "They can; the problem is that nothing connects that value to the code." },
      ],
      explanation: "A design system's layers refer to each other; copies of a value in two places break the chain.",
      revise: "design-tokens",
    },
    {
      id: "design-system-q-generic",
      kind: "scenario",
      level: "intermediate",
      prompt: "A card component has grown fourteen optional properties so that every team can use it. Bugs appear whenever two options are combined. What is the strongest response?",
      options: [
        { text: "Split it into a small composable container and a few task-specific patterns with documented uses", correct: true, explanation: "Fewer, clearer contracts are easier to test and change; patterns cover the common tasks without one component trying to fit every case." },
        { text: "Add a fifteenth property to fix the conflicts", correct: false, explanation: "More options add more combinations to test and more chances to conflict." },
        { text: "Let each product team fork the card", correct: false, explanation: "Forks remove the bugs from the system but multiply copies that drift apart." },
        { text: "Freeze the component so no one can change it", correct: false, explanation: "Freezing does not fix the existing interactions between options and stops legitimate improvements." },
      ],
      explanation: "Reuse is a means; making a component artificially generic raises its cost of change.",
      revise: "component-architecture",
    },
    {
      id: "design-system-q-criteria",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "In the GOV.UK Design System's contribution criteria, what must a new proposal show before it moves on to development?",
      options: [
        { text: "That it would be useful to many teams or services and is unique: it does not replicate something already in the system", correct: true, explanation: "These are the published criteria for new proposals; usable, consistent and versatile are checked before publication." },
        { text: "That it has been fully coded and passed visual regression tests", correct: false, explanation: "GOV.UK advises not to spend time on specific designs or code at the proposal stage." },
        { text: "That a senior designer has approved it", correct: false, explanation: "The criteria are evidence-based, not based on seniority." },
        { text: "That it increases conversion", correct: false, explanation: "Conversion is not one of the published criteria." },
      ],
      explanation: "Proposals are judged on evidence of need and uniqueness; implementations are judged on usability, consistency and versatility.",
    },
    {
      id: "design-system-q-parity",
      kind: "scenario",
      level: "intermediate",
      prompt: "The design library's button has a loading state; the code package does not. What does this mismatch cause, and what is the fix?",
      options: [
        { text: "Teams build their own loading spinners, so behaviour and accessibility drift; add the state to the code with its announcement behaviour and check parity at each release", correct: true, explanation: "A component is a contract shared by design and code; gaps between the two invite local workarounds." },
        { text: "Nothing, because designers and developers use different tools", correct: false, explanation: "Different tools are fine; different contracts are the problem." },
        { text: "Remove the loading state from the design file", correct: false, explanation: "That hides the need rather than meeting it, if products really need the state." },
        { text: "Ask each team to document its own spinner", correct: false, explanation: "That formalises the drift instead of removing it." },
      ],
      explanation: "Design-code parity keeps the two views of a component describing the same anatomy, properties, variants and states.",
      revise: "design-qa",
    },
    {
      id: "design-system-q-semver",
      kind: "scenario",
      level: "advanced",
      prompt: "A code package that follows Semantic Versioning renames a component property from `kind` to `variant`. Nothing looks different. Which release is appropriate?",
      options: [
        { text: "A major release, with the old name deprecated, release notes and a migration guide", correct: true, explanation: "Renaming part of the public API is an incompatible change; under SemVer that increments the major version." },
        { text: "A patch release, because nothing visual changed", correct: false, explanation: "Patch releases are for backward-compatible fixes; code using `kind` would break." },
        { text: "A minor release, because it adds a new property name", correct: false, explanation: "It also removes the old one, which is incompatible, unless the old name is kept working as a deprecated alias." },
        { text: "No release; tell teams in a chat channel", correct: false, explanation: "Unversioned changes break products without warning." },
      ],
      explanation: "In a design system the public API includes property names, token names, markup and documented behaviour. Keeping the old name as a deprecated alias would make the addition a minor release, with removal in a later major one.",
      revise: "design-system-versioning",
    },
    {
      id: "design-system-q-metrics",
      kind: "critique",
      level: "advanced",
      prompt: "A report says \"90% of our products have adopted the design system\" because 90% install its package. What does this show?",
      options: [
        { text: "Reach only; it says nothing about how much is used, how often it is overridden, its defects or whether products became more usable or accessible", correct: true, explanation: "Installation is a weak proxy; quality needs several signals, including depth of use, overrides, defects, parity and team experience." },
        { text: "That the system is high quality", correct: false, explanation: "Adoption can be mandated, so it does not demonstrate quality." },
        { text: "That users find products easier", correct: false, explanation: "That would require evaluating products with users." },
        { text: "That the system is mature", correct: false, explanation: "Maturity models are instructional guides, not measurements of quality." },
      ],
      explanation: "Measure what the system changes, from several angles, and expect each metric to be misread on its own.",
    },
    {
      id: "design-system-q-brand",
      kind: "scenario",
      level: "advanced",
      prompt: "A second brand needs different colours and typography but the same behaviour and accessibility. What architecture fits best?",
      options: [
        { text: "Share components, their APIs and semantic token names; give each brand its own theme of foundation values", correct: true, explanation: "Behaviour and accessibility stay shared, while brands supply different values through the token layer." },
        { text: "Fork the component library for the second brand", correct: false, explanation: "Forks double maintenance and let behaviour and accessibility drift apart." },
        { text: "Add brand-specific properties to every component", correct: false, explanation: "That spreads brand logic through every component and every product's code." },
        { text: "Hard-code the second brand's colours in its products", correct: false, explanation: "That bypasses the system and breaks theming." },
      ],
      explanation: "Separate what must be shared (behaviour, accessibility, APIs) from what may differ (foundation values) and implement the difference through themes.",
      revise: "multi-brand-systems",
    },
  ],

  flashcards: [
    { id: "design-system-fc-definition", front: "Design system (working definition)", back: "Shared, maintained decisions, components, patterns, guidance, code and practices that teams use to build coherent products; kept current by people who own and change it." },
    { id: "design-system-fc-artefact", front: "Style guide versus design system (Curtis, quoted by Frost)", back: "A style guide is an artefact of the design process; a design system is a living, funded product with a roadmap and backlog, serving an ecosystem." },
    { id: "design-system-fc-layers", front: "The layers a decision travels through", back: "Principles → design language and foundations → tokens → components → patterns and templates → products, with documentation and governance alongside every layer." },
    { id: "design-system-fc-tokens", front: "What tokens are to a design system", back: "The layer of named design decisions that components consume; changing a token changes every component and product that uses it. Details: Design Tokens entry." },
    { id: "design-system-fc-contract", front: "A component contract covers…", back: "Anatomy, properties, variants, states, accessibility behaviour, responsive behaviour and usage guidance, the same in design files and code." },
    { id: "design-system-fc-pattern", front: "Component versus pattern", back: "A component is one reusable control; a pattern is a reusable solution to a recurring task that combines components, content and rules." },
    { id: "design-system-fc-govuk", front: "GOV.UK contribution criteria", back: "Proposal: useful and unique. Before publication: usable (tested with users, including disabled people), consistent, versatile." },
    { id: "design-system-fc-semver", front: "Semantic Versioning in one line", back: "MAJOR for incompatible API changes, MINOR for backward-compatible additions, PATCH for backward-compatible fixes; renaming a property or token is breaking." },
    { id: "design-system-fc-adoption", front: "Why adoption counts mislead", back: "Installing a package shows reach, not quality; combine depth of use, overrides, defects, parity, support time and team experience." },
    { id: "design-system-fc-when-not", front: "When a formal design system may not pay", back: "One small product and team, an early product still changing fast, or no one able to own and maintain it." },
  ],

  references: [
    { source: "govuk-design-system", role: "primary", note: "Styles, components and patterns; maintenance by GDS; proposal and development process; contribution criteria (useful, unique, usable, consistent, versatile).", locator: "Home; Community: propose, develop, contribution criteria" },
    { source: "carbon-design-system", role: "primary", note: "Carbon Core and extensions (Carbon for Products); open-source and inner-source model; named maintainers.", locator: "All about Carbon: What is Carbon" },
    { source: "uswds", role: "primary", note: "History (2015, 18F and USDS); design tokens as limited discrete values; maturity model; 'consistency is not necessarily conformity'.", locator: "About; Design tokens; Maturity model" },
    { source: "adobe-spectrum", role: "explanatory", note: "Shared foundation across products and platforms; flexibility for distinct product needs; Spectrum 2's move across platforms.", locator: "Getting started: Introduction" },
    { source: "frost-2016", role: "explanatory", note: "Style guides and pattern libraries; atomic design as a mental model; Curtis's artefact-versus-product distinction; templates and pages.", locator: "Chapters 1, 2 and 5" },
    { source: "kholmatova-2017", role: "explanatory", note: "Scope only: patterns and practices as foundations of a design system; establishing and maintaining one." },
    { source: "curtis-2009", role: "further", note: "Scope only: reusable components for UX design and documentation." },
    { source: "semver-2", role: "explanatory", note: "Major, minor and patch increments relative to a declared public API." },
    { source: "dtcg-format-2025", role: "further", note: "Token interchange format (Final Community Group Report, not a W3C Standard); see the Design Tokens entry." },
    { source: "material-3", role: "further", note: "Another documented system of foundations, tokens and components." },
    { source: "fluent-2", role: "further", note: "Another documented system of foundations, tokens and components." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "The structure and practices described here come from the official documentation of public and enterprise design systems (GOV.UK, USWDS, Carbon, Spectrum) and from practitioner books (Frost, Kholmatova, Curtis). These sources describe how organisations build and run their systems and what they intend them to achieve; they are not controlled studies. No peer-reviewed evaluations of design systems' effects on productivity, consistency, cost or conversion were found, so such benefits are stated as intended or reported outcomes that depend on the organisation, not as findings.",

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
  lastVerifiedAt: "2026-11-06",
});
