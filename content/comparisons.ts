import type { Comparison } from "../lib/content/schema";

/**
 * Side-by-side concept comparisons (spec 10.7). Each comparison explains the
 * difference, when to choose each, and how they work together — the last is
 * usually the most important lesson: most pairs are complements, not rivals.
 */
export const comparisons: Comparison[] = [
  {
    id: "ux-vs-ui",
    title: "UX vs UI",
    a: { label: "User experience (UX)", slug: "user-experience" },
    b: { label: "User interface (UI) design", slug: "ui-design" },
    summary:
      "**UX** is the whole of a person's experience with a product, service or organisation — before, during and after use. **UI** is the part of that experience that lives on the screen: the controls, layout, type, colour and feedback a person directly perceives and operates. UI is one of many contributors to UX, alongside content, performance, pricing, support and the service behind the screen.",
    dimensions: [
      { dimension: "Scope", a: "The entire experience, including offline touchpoints, support, delivery and expectations formed before use.", b: "The perceivable and operable surface of a digital product: screens, components, states and interactions." },
      { dimension: "Core question", a: "Does this product solve the right problem, in a way that fits people's goals, context and abilities?", b: "Can people see, understand and operate this screen efficiently, accurately and with confidence?" },
      { dimension: "Typical outputs", a: "Research findings, journey maps, information architecture, flows, prototypes, success metrics.", b: "Visual and interaction specifications, component designs, design-system tokens, high-fidelity mock-ups." },
      { dimension: "Evidence used", a: "User research, analytics, usability testing, service and business data.", b: "Usability testing, perception and readability principles, accessibility standards, platform conventions." },
      { dimension: "Failure looks like", a: "A polished product nobody needs, or one that breaks down at a non-screen touchpoint (delivery, billing, support).", b: "The right product that people misread, mis-tap or cannot operate with a keyboard or screen reader." },
      { dimension: "Relationship to the other", a: "Sets the goals and structure that UI must express.", b: "Is the main channel through which digital UX is delivered — and can ruin a sound UX strategy." },
    ],
    chooseA: [
      "When the problem, audience or value of the product is still uncertain.",
      "When a journey crosses channels — app, email, call centre, physical delivery.",
      "When metrics like adoption or retention are poor and the cause is unknown.",
    ],
    chooseB: [
      "When the flow is validated but people struggle to perceive, read or operate it.",
      "When building or extending a design system or component library.",
      "When accessibility, visual hierarchy or interaction states need resolving.",
    ],
    together:
      "Treat them as levels of the same work rather than separate jobs. UX decisions about goals, flows and [[information-scent|information scent]] are only real once a UI expresses them; UI quality is wasted on the wrong flow. In small teams one designer does both — the skill is knowing which level a problem lives at before choosing tools.",
    references: [
      { source: "norman-nielsen-ux-definition", role: "explanatory", note: "Distinguishes UX from UI and usability." },
      { source: "iso-9241-210-2019", role: "standard", note: "Defines user experience and human-centred design activities." },
    ],
  },
  {
    id: "ux-research-vs-market-research",
    title: "UX Research vs Market Research",
    a: { label: "UX research" },
    b: { label: "Market research", slug: "market-research" },
    summary:
      "Both study people to reduce business risk, but they ask different questions. **Market research** asks who buys, how many, at what price and why they choose one offer over another. **UX research** asks how people actually behave, think and struggle when pursuing a goal, and how a product or service fits — or fails to fit — that behaviour.",
    dimensions: [
      { dimension: "Primary question", a: "How do people behave and reason when trying to achieve a goal, and what gets in their way?", b: "What is the size, segmentation, willingness to pay and purchase motivation of a market?" },
      { dimension: "Unit of analysis", a: "Tasks, behaviours, mental models, contexts of use.", b: "Segments, preferences, attitudes, purchase decisions, brand perception." },
      { dimension: "Typical methods", a: "Contextual inquiry, interviews, usability testing, diary studies, card sorting, behavioural analytics.", b: "Large surveys, conjoint analysis, focus groups, sales and panel data, competitor analysis." },
      { dimension: "Behaviour vs attitude", a: "Weighted towards observed behaviour — what people do.", b: "Weighted towards stated attitudes and intentions — what people say they prefer or would buy." },
      { dimension: "Sample", a: "Often small and purposive for qualitative work; larger for benchmarks and analytics.", b: "Often large and statistically representative of a market segment." },
      { dimension: "Decisions informed", a: "What to design and how: flows, features, content, IA, interaction.", b: "Whether and where to compete: positioning, pricing, segment focus, go-to-market." },
    ],
    chooseA: [
      "To understand why people abandon a task or misuse a feature.",
      "To evaluate whether a design works before or after launch.",
      "To discover unmet needs in the context where work actually happens.",
    ],
    chooseB: [
      "To size an opportunity or choose a target segment.",
      "To test pricing, packaging or brand positioning.",
      "To track awareness and preference over time.",
    ],
    together:
      "The strongest discovery combines both: market research shows where demand and value are; UX research explains the behaviour behind the numbers and turns it into design decisions. Be wary of using stated preference from surveys to predict behaviour — triangulate it with observation (see [[data-triangulation]]).",
    references: [
      { source: "rohrer-ux-research-methods", role: "explanatory", note: "Behavioural vs attitudinal and qualitative vs quantitative dimensions of research methods." },
      { source: "govuk-user-research", role: "explanatory", note: "Professional guidance on the purpose and practice of user research in service delivery." },
    ],
  },
  {
    id: "usability-vs-user-experience",
    title: "Usability vs User Experience",
    a: { label: "Usability", slug: "usability" },
    b: { label: "User experience", slug: "user-experience" },
    summary:
      "**Usability** is a measurable quality of use: how effectively, efficiently and satisfyingly specified users can achieve specified goals in a specified context (ISO 9241-11). **User experience** is broader — the person's perceptions and responses resulting from use *and anticipated use*, including emotion, meaning, trust and everything around the interaction. A product can be highly usable and still deliver a poor experience, for example if it solves an unimportant problem or feels untrustworthy.",
    dimensions: [
      { dimension: "Definition source", a: "ISO 9241-11:2018 — effectiveness, efficiency and satisfaction in a context of use.", b: "ISO 9241-210 — perceptions and responses resulting from use and/or anticipated use." },
      { dimension: "Time frame", a: "During use of the system for a task.", b: "Before (expectations), during, and after use (memory, recommendation, loyalty)." },
      { dimension: "Measurability", a: "Highly measurable: task success, time on task, errors, standard questionnaires such as SUS.", b: "Partly measurable; also involves emotion, meaning and value, often studied qualitatively." },
      { dimension: "Dependence on context", a: "Always defined relative to specified users, goals and context — there is no context-free usability.", b: "Also contextual, and additionally shaped by brand, prior experiences and social context." },
      { dimension: "Typical improvement", a: "Remove friction, errors and confusion from defined tasks.", b: "Align the product with needs and values; design the whole journey, including non-digital touchpoints." },
    ],
    chooseA: [
      "When defining measurable acceptance criteria for a design.",
      "When benchmarking a product against a previous version or competitor.",
      "When diagnosing why people fail a specific task.",
    ],
    chooseB: [
      "When deciding what to build and why it matters to people.",
      "When retention, trust or recommendation are the problem, not task failure.",
      "When the journey spans many touchpoints and channels.",
    ],
    together:
      "Usability is a necessary component of good UX, not a synonym for it. Use usability metrics — [[task-success-rate|task success]], [[time-on-task|time on task]], [[system-usability-scale|SUS]] — as the measurable floor, and broader UX research to judge whether the product is worth using at all.",
    references: [
      { source: "iso-9241-11-2018", role: "standard", note: "Definition of usability." },
      { source: "iso-9241-210-2019", role: "standard", note: "Definition of user experience." },
      { source: "nielsen-usability-101", role: "explanatory", note: "Practitioner definition of usability via five quality components." },
      { source: "norman-nielsen-ux-definition", role: "explanatory", note: "UX as broader than usability." },
    ],
  },
  {
    id: "affordances-vs-signifiers",
    title: "Affordances vs Signifiers",
    a: { label: "Affordance", slug: "affordances" },
    b: { label: "Signifier", slug: "signifiers" },
    summary:
      "An **affordance** is a relationship between the properties of an object and the capabilities of an agent — what actions are *possible* (a chair affords sitting for an adult; a flat glass screen affords touching). A **signifier** is any perceivable cue that communicates *where and how* to act — a label, an underline, a shadow, a handle's shape. Norman introduced the distinction in the 2013 edition of *The Design of Everyday Things* because designers had been using 'affordance' to mean 'visual cue'.",
    dimensions: [
      { dimension: "What it is", a: "A possibility for action that exists between object and agent, whether noticed or not.", b: "A perceivable signal that indicates an action, its location or its result." },
      { dimension: "Origin", a: "James J. Gibson's ecological psychology; brought into design by Donald Norman (1988).", b: "Introduced by Norman (2013) to separate communication from possibility." },
      { dimension: "Can it be invisible?", a: "Yes — a hidden swipe gesture still affords swiping; it is just undiscoverable.", b: "No — a signifier that cannot be perceived is not functioning as a signifier." },
      { dimension: "Designer's lever", a: "Change what is physically or technically possible: hit areas, gestures, permissions, constraints.", b: "Change what is communicated: labels, iconography, visual styling, placement, microcopy." },
      { dimension: "Typical failure", a: "An action people need is impossible, or a dangerous one is too easy.", b: "A possible action is not discovered, or a false signifier suggests an action that does not exist." },
      { dimension: "On screens", a: "Most screen affordances are the same (pointing, tapping, typing); differences lie in what the software permits.", b: "Almost all of the design work: making the right actions noticeable and correctly interpreted." },
    ],
    chooseA: [
      "When analysing what actions an interface or device actually permits for different users (e.g. with motor impairments).",
      "When deciding constraints — what should be impossible or harder to do.",
    ],
    chooseB: [
      "When people fail to discover a feature that already exists.",
      "When styling interactive vs non-interactive elements, such as links and buttons vs static text.",
      "When reviewing flat or minimal UI for missing cues.",
    ],
    together:
      "Good design aligns the two: every important affordance has a clear signifier, and no signifier promises an affordance that does not exist. In digital interfaces, discoverability problems are usually signifier problems — see [[discoverability]] and [[mental-models]].",
    references: [
      { source: "norman-2013", role: "primary", note: "Defines affordances and signifiers and explains why the distinction was introduced." },
      { source: "gibson-1979", role: "primary", note: "Origin of the concept of affordance in ecological psychology." },
      { source: "norman-1999", role: "explanatory", note: "Norman distinguishes real from perceived affordances and conventions." },
    ],
  },
  {
    id: "design-thinking-vs-lean-ux",
    title: "Design Thinking vs Lean UX",
    a: { label: "Design thinking", slug: "design-thinking" },
    b: { label: "Lean UX", slug: "lean-ux" },
    summary:
      "**Design thinking** is a human-centred approach to framing and solving problems — commonly taught as empathise, define, ideate, prototype, test — popularised by IDEO and the Stanford d.school and aimed largely at innovation and problem framing. **Lean UX** (Gothelf & Seiden) brings design into agile, cross-functional product teams, treating design decisions as hypotheses tested quickly with minimal artefacts and judged by outcomes rather than deliverables.",
    dimensions: [
      { dimension: "Primary aim", a: "Understand people and reframe the problem before committing to solutions.", b: "Reduce waste in product delivery by validating assumptions continuously." },
      { dimension: "Intellectual roots", a: "Design methods research, IDEO and d.school practice, human-centred design.", b: "Lean Startup, agile software development and design thinking." },
      { dimension: "Unit of work", a: "Problem statements, insights, concepts, prototypes.", b: "Hypotheses, MVPs and experiments tied to measurable outcomes." },
      { dimension: "Where it sits", a: "Often upstream: early discovery, innovation programmes, strategy workshops.", b: "Inside the delivery cadence of a product team, sprint by sprint." },
      { dimension: "Documentation", a: "Can be workshop- and artefact-heavy (personas, journey maps, concept boards).", b: "Deliberately light; shared understanding over detailed specifications." },
      { dimension: "Main criticism", a: "Can become 'innovation theatre' — workshops without follow-through or rigorous research.", b: "Can optimise locally for measurable metrics and neglect deeper discovery or ethics." },
    ],
    chooseA: [
      "When the problem itself is ambiguous or contested.",
      "When stakeholders need to align on who the users are and what matters to them.",
      "When exploring new products or services before a team exists.",
    ],
    chooseB: [
      "When a cross-functional team is shipping continuously and needs design to keep pace.",
      "When the riskiest assumptions can be tested with real behaviour.",
      "When the organisation measures success by outcomes rather than outputs.",
    ],
    together:
      "They are complementary stages more than competing methods: design thinking (and the [[double-diamond]]) helps a team choose the right problem; Lean UX keeps validating the solution once delivery begins. Both depend on genuine user research — neither works if the 'empathise' or 'learn' step is skipped.",
    references: [
      { source: "brown-2008", role: "primary", note: "Popular statement of design thinking from IDEO." },
      { source: "gothelf-seiden-2013", role: "primary", note: "Defines Lean UX principles and process." },
    ],
  },
  {
    id: "qualitative-vs-quantitative-research",
    title: "Qualitative vs Quantitative Research",
    a: { label: "Qualitative research" },
    b: { label: "Quantitative research" },
    summary:
      "**Qualitative research** collects rich, non-numerical data — observations, quotes, behaviours — to understand *why* and *how*. **Quantitative research** collects numerical data from larger samples to measure *how many*, *how much* and *how often*, and to estimate effects with known uncertainty. The choice is about the question being asked, not about which is more rigorous: each has its own standards of rigour.",
    dimensions: [
      { dimension: "Questions answered", a: "Why do people do this? How do they think about it? What problems exist?", b: "How many people do this? How big is the difference? Did the change work?" },
      { dimension: "Data", a: "Words, observations, artefacts, video.", b: "Counts, times, rates, ratings, logged events." },
      { dimension: "Sample size", a: "Small and purposive; continues until themes stop emerging.", b: "Large enough for the required precision or statistical power." },
      { dimension: "Analysis", a: "Coding, thematic analysis, affinity mapping, synthesis.", b: "Descriptive and inferential statistics, confidence intervals, significance tests." },
      { dimension: "Rigour means", a: "Credible sampling, transparent analysis, reflexivity about bias, triangulation.", b: "Valid measures, adequate samples, correct statistics, honest uncertainty." },
      { dimension: "Main risk", a: "Over-generalising from a few vivid participants.", b: "Precisely measuring the wrong thing, or knowing *that* without knowing *why*." },
    ],
    chooseA: [
      "Early discovery, when you do not yet know what to measure.",
      "Diagnosing the cause of a problem shown in analytics.",
      "Formative usability testing during design iterations.",
    ],
    chooseB: [
      "Benchmarking usability or tracking change over time.",
      "Sizing how widespread a problem is.",
      "Comparing designs with [[ab-testing|A/B tests]] or summative studies.",
    ],
    together:
      "Mixed-methods research is the norm in mature teams: qualitative work generates hypotheses and explains mechanisms; quantitative work checks how far they generalise. A common loop is analytics → interviews or [[usability-testing|usability tests]] to explain → experiment to confirm. Report numbers with [[confidence-intervals]] and quotes with how many participants said them.",
    references: [
      { source: "rohrer-ux-research-methods", role: "explanatory", note: "Places methods on qualitative/quantitative and attitudinal/behavioural axes." },
      { source: "sauro-lewis-2016", role: "explanatory", note: "Quantitative methods and statistics for UX research." },
    ],
  },
  {
    id: "ab-testing-vs-usability-testing",
    title: "A/B Testing vs Usability Testing",
    a: { label: "A/B testing", slug: "ab-testing" },
    b: { label: "Usability testing", slug: "usability-testing" },
    summary:
      "An **A/B test** is a randomised controlled experiment on live traffic: users are randomly assigned to variants and a pre-defined metric is compared statistically. It tells you *which* variant performed better and by how much. A **usability test** observes a small number of representative people attempting realistic tasks; it tells you *why* people struggle and *what* to change. One measures outcomes at scale; the other explains behaviour in depth.",
    dimensions: [
      { dimension: "Answers", a: "Did variant B change the metric, and by how much, with what uncertainty?", b: "What problems do people encounter, and what causes them?" },
      { dimension: "Participants", a: "Thousands to millions of real users, usually unaware they are in a test.", b: "Typically 5–12 per round for formative studies; more for quantitative benchmarks." },
      { dimension: "Requires", a: "A live product, enough traffic, randomisation infrastructure and a metric defined in advance.", b: "Representative participants, realistic tasks, a facilitator or unmoderated platform; works on prototypes." },
      { dimension: "Causality", a: "Supports causal claims about the tested change (with valid randomisation).", b: "Does not establish causal effects at population level; identifies likely problems and their mechanisms." },
      { dimension: "Speed & stage", a: "Days to weeks of traffic; only after building both variants.", b: "Can run in days, at any stage from paper prototype to live product." },
      { dimension: "Blind spots", a: "Explains nothing about why; can optimise short-term metrics at the expense of long-term trust.", b: "Small samples cannot measure prevalence or small effects; lab context differs from real use." },
    ],
    chooseA: [
      "Choosing between well-formed alternatives on a live product with enough traffic.",
      "Measuring the size of an effect on a key metric before rolling out.",
    ],
    chooseB: [
      "Finding problems in a design before building it.",
      "Understanding the cause behind a poor metric or a failed A/B test.",
      "Low-traffic products where experiments cannot reach adequate power.",
    ],
    together:
      "Use usability testing to generate and refine variants worth testing, then A/B testing to measure their effect. When an A/B test produces a surprising result, return to qualitative research to understand it. Plan the A/B sample with [[sample-size-estimation]] and interpret results with [[confidence-intervals]], not just p-values.",
    references: [
      { source: "kohavi-tang-xu-2020", role: "primary", note: "Standard reference for online controlled experiments." },
      { source: "nielsen-1993", role: "explanatory", note: "Usability testing as a core usability-engineering method." },
      { source: "sauro-lewis-2016", role: "explanatory", note: "Sample sizes and statistics for both approaches." },
    ],
  },
  {
    id: "heuristic-evaluation-vs-cognitive-walkthrough",
    title: "Heuristic Evaluation vs Cognitive Walkthrough",
    a: { label: "Heuristic evaluation", slug: "heuristic-evaluation" },
    b: { label: "Cognitive walkthrough", slug: "cognitive-walkthrough" },
    summary:
      "Both are expert **inspection methods** — no users required. In a **heuristic evaluation**, several evaluators independently examine an interface against a set of broad principles (most often Nielsen's ten heuristics) and pool the problems they find. In a **cognitive walkthrough**, evaluators step through a specific task action by action, asking at each step whether a new user would know what to do, notice how to do it and understand the feedback. Heuristic evaluation is broad; cognitive walkthrough is deep and focused on learnability.",
    dimensions: [
      { dimension: "Focus", a: "Whole interface or flow, against general usability principles.", b: "A specific task sequence, from the viewpoint of a first-time or infrequent user." },
      { dimension: "Theory behind it", a: "Principles distilled from analysing many usability problems.", b: "A model of exploratory learning: people pick actions whose labels match their goals." },
      { dimension: "Procedure", a: "Evaluators inspect independently (often 3–5), then consolidate and rate severity.", b: "Define user, task and correct action sequence; answer the walkthrough questions at every step." },
      { dimension: "Strengths", a: "Fast, cheap, catches a wide range of issues, including consistency and visual problems.", b: "Systematic; good at revealing discoverability and labelling problems on critical tasks." },
      { dimension: "Weaknesses", a: "Depends on evaluator expertise; can produce false positives and miss domain-specific problems.", b: "Slow and narrow; ignores issues outside the chosen tasks; less suited to expert-use efficiency." },
      { dimension: "Best stage", a: "Any stage, including early prototypes and competitor reviews.", b: "When a task's correct action sequence is defined — prototypes or live products." },
    ],
    chooseA: [
      "A quick, broad health check before user testing.",
      "Auditing a whole product or a competitor's product.",
      "When evaluator time is limited and many screens need review.",
    ],
    chooseB: [
      "Products that must be learnable without training (public services, kiosks, onboarding).",
      "Critical flows where every step must be discoverable.",
      "When heuristic reviews keep missing problems that users hit in testing.",
    ],
    together:
      "Run a cognitive walkthrough on the two or three most critical tasks and a heuristic evaluation across the rest of the interface, then validate the highest-severity findings with [[usability-testing]]. Neither method replaces observing real users.",
    references: [
      { source: "nielsen-molich-1990", role: "primary", note: "Original description of heuristic evaluation." },
      { source: "polson-et-al-1992", role: "primary", note: "Cognitive walkthrough method and its theory of exploratory learning." },
      { source: "wharton-et-al-1994", role: "explanatory", note: "Practitioner's guide to running a cognitive walkthrough." },
      { source: "nielsen-1993", role: "explanatory", note: "Heuristic evaluation within discount usability engineering." },
      { source: "nngroup-articles", role: "further", note: "Practitioner guidance on running inspections." },
    ],
  },
  {
    id: "atomic-design-vs-component-based-design",
    title: "Atomic Design vs Component-Based Design",
    a: { label: "Atomic design", slug: "atomic-design" },
    b: { label: "Component-based design", slug: "component-architecture" },
    summary:
      "**Component-based design** is the general practice of building interfaces from reusable, encapsulated parts with defined properties and states — the same idea that underpins component frameworks in code. **Atomic design** (Brad Frost) is one specific *mental model and methodology* for organising such components into a hierarchy — atoms, molecules, organisms, templates and pages — to make the relationships between parts explicit. Atomic design is a way of doing component-based design, not an alternative to it.",
    dimensions: [
      { dimension: "What it is", a: "A methodology and vocabulary for structuring a design system in five levels.", b: "An architectural approach: interfaces composed from reusable, encapsulated components." },
      { dimension: "Organising principle", a: "Composition by increasing complexity, borrowed from a chemistry metaphor.", b: "Any taxonomy that suits the product — by function, domain, platform or ownership." },
      { dimension: "Strength", a: "Shared language; makes dependencies visible; encourages building from small, consistent parts.", b: "Flexible; maps directly to code; scales to any structure the team needs." },
      { dimension: "Common difficulty", a: "Teams argue about whether something is a molecule or an organism; the metaphor can become bureaucracy.", b: "Without a guiding model, libraries sprawl with near-duplicate components." },
      { dimension: "Relation to code", a: "Not tied to any technology; levels often do not map one-to-one onto code folders.", b: "Directly mirrored by component frameworks and their props, slots and states." },
    ],
    chooseA: [
      "Starting a design system and needing a shared vocabulary quickly.",
      "Teaching designers and stakeholders how parts compose into pages.",
    ],
    chooseB: [
      "When the product's structure or the engineering architecture suggests a different grouping.",
      "Mature systems that organise by domain or ownership rather than complexity.",
    ],
    together:
      "Use atomic design as a thinking tool — especially the distinction between reusable components and the templates and pages that use them — without forcing every component into a level. Pair either approach with [[design-tokens]] so visual decisions live below the component layer.",
    references: [
      { source: "frost-2016", role: "primary", note: "Defines the atomic design methodology." },
    ],
  },
  {
    id: "responsive-vs-adaptive-design",
    title: "Responsive vs Adaptive Design",
    a: { label: "Responsive design", slug: "responsive-development" },
    b: { label: "Adaptive design" },
    summary:
      "**Responsive design** (named by Ethan Marcotte in 2010) uses one fluid layout that continuously reflows to the available space with flexible grids, flexible media and CSS media queries. **Adaptive design**, as the term is usually used in industry, serves a set of distinct, fixed layouts chosen for particular screen classes or devices. Both differ from **native** design, which builds separate apps on each platform's own components and conventions (for example Apple's HIG or Material). Note that 'adaptive' is used inconsistently — some authors use it for progressive enhancement in general — so define it when you use it.",
    dimensions: [
      { dimension: "Layout model", a: "One fluid layout that changes continuously, with breakpoints where the content needs them.", b: "Several fixed layouts, each designed for a target width or device class." },
      { dimension: "Design effort", a: "Design systems of rules and components rather than fixed screens.", b: "Design each layout explicitly; more artboards to maintain." },
      { dimension: "Handling unknown devices", a: "Handles in-between and future sizes gracefully by design.", b: "Sizes between targets fall back to the nearest layout and may look awkward." },
      { dimension: "Control", a: "Less pixel-level control at any given width.", b: "High control over each target layout; can tailor content and features per context." },
      { dimension: "Performance", a: "Can ship assets every layout needs unless responsive images and loading are handled carefully.", b: "Can serve only what the target layout needs, at the cost of detection logic." },
      { dimension: "Maintenance", a: "One codebase and one set of components.", b: "Multiple layouts to keep consistent; content changes must be applied in each." },
    ],
    chooseA: [
      "Content-led websites and services that must work on any device, including ones that do not exist yet.",
      "Teams with a component-based design system and one codebase.",
    ],
    chooseB: [
      "When a few device classes dominate and need substantially different tasks or layouts (e.g. a kiosk and a phone).",
      "Retrofitting an existing fixed-width site where a full responsive rebuild is not yet feasible.",
    ],
    together:
      "Most modern products are responsive at their core with adaptive decisions where context genuinely differs — for example, a different navigation pattern on small screens, or a separate layout for a large-format display. Choose breakpoints from where the content breaks, not from a list of device sizes.",
    references: [
      { source: "marcotte-2010", role: "primary", note: "Coined and defined responsive web design." },
      { source: "apple-hig", role: "explanatory", note: "Native platform conventions and layout guidance." },
      { source: "material-3", role: "explanatory", note: "Window size classes and adaptive layout guidance." },
    ],
  },
];
