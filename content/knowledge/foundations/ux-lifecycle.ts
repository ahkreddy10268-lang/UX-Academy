import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "ux-lifecycle",
  slug: "ux-lifecycle",
  title: "UX Lifecycle",
  alternateNames: ["User experience lifecycle", "UX across the product lifecycle", "Service lifecycle"],
  summary:
    "How user-experience work fits the whole life of a product or service: research before anything is built, prototypes to test options, building and testing with real users, measuring and improving while live, and retirement.",
  definition:
    "The **UX lifecycle** is the sequence of user-experience activities across the whole life of a product or service, not only while it is being designed. The UK government's service manual describes that life as five phases: **discovery** (understand the problem before committing to build), **alpha** (try different solutions with prototypes), **beta** (build the best idea for real and test it with real users), **live** (support and keep improving) and **retirement** (meet the need another way when the service ends) {{src:govuk-agile-phases}}. User research continues in every phase {{src:govuk-learning-user-needs}}.",
  primaryType: "concept",
  secondaryTypes: [],
  domain: "foundations",
  subcategory: "approaches",
  tags: ["product lifecycle", "discovery", "alpha", "beta", "live", "agile", "continuous improvement"],
  difficulty: "intermediate",
  disciplines: ["User experience", "Service design", "Product management", "Agile delivery"],
  learningObjectives: [
    "Name the phases of a product or service's life and the main UX activity and question in each.",
    "Explain why UX work does not stop at release, and what changes in research and measurement once a service is live.",
    "Place design-process activities inside an agile delivery lifecycle and identify where integration commonly struggles.",
    "Judge whether a team is ready to move to the next phase from the evidence it has.",
  ],
  prerequisites: ["user-centred-design", "design-processes"],

  levels: {
    beginner: {
      explanation: [
        "A product's life is longer than its design. It starts with someone noticing a problem, goes through trying out ideas, building, releasing and running, and eventually ends. The **UX lifecycle** is the set of UX activities across all of that time.",
        "The UK government's service manual gives clear names to the phases {{src:govuk-agile-phases}}. In **discovery**, the team learns about users and the problem and does not build anything. In **alpha**, it tries out different solutions with prototypes and expects to throw most of them away. In **beta**, it builds the best idea for real and tests it with a limited and then a wider group of real users. In **live**, it supports the service and keeps improving it. In **retirement**, it makes sure people's needs are still met when the service ends.",
        "The key idea is that research with users happens in every phase, not just at the start: you keep learning about users and their needs, testing new ideas and checking that the service still works for them {{src:govuk-learning-user-needs}}.",
      ],
      analogy:
        "A bridge has a lifecycle too. Engineers survey the river before designing (discovery), test models (alpha), build and open one lane first (beta), inspect and repair it for decades (live) and plan a replacement crossing before it is closed (retirement). The bridge's users matter in every phase.",
      everydayExamples: [
        "A banking app that releases a new feature to 5 % of customers first and watches how they use it.",
        "A council that asks residents how they will pay for parking before removing the old meters.",
        "A team that keeps a research budget for a product that has been live for years.",
      ],
      vocabulary: [
        { term: "Discovery", meaning: "Learning about users, the problem and the constraints before deciding to build anything." },
        { term: "Alpha", meaning: "Trying different solutions with prototypes to test the riskiest assumptions." },
        { term: "Beta", meaning: "Building the chosen solution for real and testing it with real users, first a limited group, then anyone." },
        { term: "Live", meaning: "Running the service sustainably and improving it based on research and data." },
        { term: "Retirement", meaning: "Ending a service while making sure the need is met another way." },
      ],
    },
    intermediate: {
      explanation: [
        "**Each phase asks a different UX question** {{src:govuk-agile-phases}}. Discovery: what problem should we solve, for whom, under what constraints? Teams are told to reframe a pre-defined solution as a problem and not to build. Alpha: which solution works? Teams build only what they need to test their riskiest assumptions, and expect to discard code and ideas. Beta: does the chosen solution work for real users at scale? Teams keep researching and start gathering data against success metrics. Live: is it still working, and how can it improve? Changes are based on user research and tested for browsers, devices and accessibility. Retirement: how will the need be met afterwards?",
        "**Deciding to stop is part of the lifecycle.** The service manual says it is fine to decide at the end of discovery that an alpha is not worth running {{src:govuk-agile-phases}}. A lifecycle with honest gates saves the cost of building the wrong thing.",
        "**The design process repeats inside the lifecycle.** The activities of a [[design-processes|design process]] (understand, frame, create, test) happen again at different scales in each phase: broad in discovery, focused on options in alpha, on details and performance in beta and live.",
        "**Agile delivery changes the rhythm.** When development works in short iterations, UX activities must fit them. A systematic review of agile and user-centred design integration found enough literature to build a taxonomy of the challenges that restrict integration and of the practices and success factors proposed to deal with them {{src:salah-2014}}.",
      ],
      howItWorks: [
        "**Discovery**: research users, their needs and the constraints; reframe the brief as a problem; decide whether to continue {{src:govuk-agile-phases}}.",
        "**Alpha**: prototype several solutions and test the riskiest assumptions with users {{src:govuk-agile-phases}}.",
        "**Beta**: build the chosen solution; test with real users in private, then public, beta; measure against success metrics {{src:govuk-agile-phases}}.",
        "**Live**: keep researching, measuring and improving; test changes for accessibility and across devices {{src:govuk-agile-phases}}.",
        "**Retirement**: research how people will meet the need afterwards and support the move {{src:govuk-agile-phases}}.",
      ],
      implementation: [
        "Keep user research in every phase's plan and budget, including live {{src:govuk-learning-user-needs}}.",
        "Define success metrics in alpha so that beta and live can measure against them {{src:govuk-agile-phases}}.",
        "Make each phase end in a decision: continue, change direction or stop.",
        "Prepare support staff before beta: they will meet users who struggle in ways the team did not foresee {{src:govuk-agile-phases}}.",
      ],
      scenarios: [
        "Illustrative scenario: a team is asked to 'build an app for tenants to report repairs'. In discovery they learn that most tenants report by phone and want updates, not a new app. They reframe the problem as keeping tenants informed, and test text-message updates in alpha.",
        "Illustrative scenario: a service passes its beta assessment and the team is cut to one developer. Within a year, accessibility regressions and a confusing new form appear because no one is researching or testing changes in live.",
        "Illustrative scenario: a team retires an old online form and links to the new service, but research shows that some users relied on a paper version. They keep an assisted route until those users are supported.",
      ],
    },
    advanced: {
      explanation: [
        "The phase model is a governance structure as well as a design one: in the UK government, services are assessed before moving between phases {{src:govuk-agile-phases}}. That makes UX evidence (research findings, test results, metrics) part of the decision to fund the next phase.",
        "Integrating UX into agile development has its own research literature; Salah, Paige and Cairns reviewed 71 papers published between 2000 and 2012 and organised the challenges, practices and success factors they report {{src:salah-2014}}. The details of that taxonomy were not read for this entry.",
        "Different organisations name the phases differently, and many products never formally retire. The useful idea is not the five names but the commitments behind them: research before building, test options cheaply, keep learning after release, and plan the end.",
      ],
      evidence: [
        "UK government guidance defines five phases, what each is for, typical durations for discovery (around 4 to 8 weeks) and alpha (6 to 8 weeks), and what must be in place before moving on {{src:govuk-agile-phases}}.",
        "A systematic review of 71 papers organised the challenges of integrating agile development and user-centred design and the practices proposed to address them {{src:salah-2014}}. Abstract only.",
      ],
      debates: [
        "**Up-front research or continuous discovery?** The phase model puts deep research early; agile teams often prefer smaller, continuous research. The service manual itself keeps research going through every phase {{src:govuk-learning-user-needs}}.",
        "**Whose lifecycle?** A product team's lifecycle may not match the user's journey, which can span several services; the live-phase guidance asks teams to work with other organisations in the same journey {{src:govuk-agile-phases}}.",
      ],
      alternativeModels: [
        "[[user-centred-design|User-centred design]]: the iterative design cycle that runs inside each phase.",
        "[[design-processes|Design process models]] such as the Double Diamond, which describe how a design is made rather than a product's whole life.",
        "[[agile-ux|Agile UX]]: fitting UX work to short development iterations.",
      ],
    },
  },

  origin: {
    contributors: ["Government Digital Service (UK)"],
    period: "Phase-based delivery in UK government digital services; research on agile and UCD integration 2000–2012",
    problem:
      "A design stage on its own does not cover the questions a product raises before anything is built, or after it is released and while it is running.",
    narrative: [
      "The UK government's service manual set out phases from discovery to retirement, with research in every phase and assessments between them {{src:govuk-agile-phases}} {{src:govuk-learning-user-needs}}.",
      "As agile development spread, researchers and practitioners documented how to fit user-centred design into short iterations; a 2014 systematic review organised that literature {{src:salah-2014}}.",
    ],
    attributionNote:
      "Earlier book-length accounts of a usability or UX lifecycle exist but were not read for this entry; the account here rests on government guidance read in full and one review read as an abstract.",
  },

  application: {
    summary: [
      "Use the lifecycle to make sure UX work starts before building and continues after release, with a clear question and a decision at the end of each phase.",
    ],
    web: [
      "Plan research and analytics review for the live site, not only for the redesign project.",
    ],
    mobile: [
      "Use staged releases as a beta: release to a small share of users first and watch how they use it.",
    ],
    enterprise: [
      "Keep research going after roll-out; internal users' workarounds show where the next improvements are.",
    ],
    services: [
      "Plan retirement: find out how people will meet the need when an old channel or service closes {{src:govuk-agile-phases}}.",
    ],
    steps: [
      "Identify the phase the product is in.",
      "Write the UX question for that phase.",
      "Plan research and testing that answer it.",
      "Define the evidence needed to move on, change course or stop.",
      "Repeat in the next phase; keep a research budget in live.",
    ],
  },

  whenToUse: [
    "Planning UX work for a new product or service from the start.",
    "Arguing for research after release and for proper retirement.",
    "Deciding whether a team is ready to move to the next phase.",
  ],
  whenNotToUse: [
    "As a rigid sequence for every small change; changes to a live product can go through quick cycles.",
    "As proof that a service is good because it passed through all the phases.",
  ],
  advantages: [
    "Puts learning before building and keeps learning after release.",
    "Gives each phase a clear question and a decision point.",
    "Makes retirement a designed event rather than an afterthought.",
  ],
  limitations: [
    "Phase names and boundaries differ between organisations.",
    "Heavy phase gates can slow small teams.",
    "The account here rests mainly on one government's guidance; other sectors work differently.",
  ],
  misconceptions: [
    {
      myth: "UX is done once the design is handed to developers.",
      reality: "Research continues through beta and live, and changes in live should be based on user research and tested {{src:govuk-agile-phases}}.",
    },
    {
      myth: "Discovery is where you start building the minimum viable product.",
      reality: "Discovery is for understanding the problem; the guidance says not to start building in discovery {{src:govuk-agile-phases}}.",
    },
    {
      myth: "Alpha code should be reused in beta.",
      reality: "Alpha builds only enough to test ideas; teams should expect to throw away code and many ideas {{src:govuk-agile-phases}}.",
    },
  ],

  relations: [
    { target: "user-centred-design", type: "complementary-to", note: "The user-centred design cycle runs inside each lifecycle phase." },
    { target: "design-processes", type: "complementary-to", note: "Design process models describe how a design is made; the lifecycle places that work across a product's whole life." },
    { target: "usefulness", type: "related-to", note: "Discovery and alpha establish what people need, the basis of utility, before anything is built." },
    { target: "agile-ux", type: "related-to", note: "Agile UX deals with fitting UX work into short development iterations within the lifecycle." },
    { target: "ux-maturity", type: "related-to", note: "How fully UX runs through the lifecycle is one sign of an organisation's UX maturity." },
  ],

  exercises: [
    {
      id: "ux-lifecycle-ex-phase",
      kind: "critique",
      level: "beginner",
      title: "Which phase are we in?",
      prompt: [
        "Pick a product you use. Decide which phase it is in (discovery, alpha, beta, live, retirement) and list the UX question the team should be asking now.",
        "Name one research or measurement activity that would answer it.",
      ],
      deliverable: "Phase, question and activity, with a sentence of reasoning.",
      criteria: ["Phase is justified from observable signs", "Question fits the phase", "Activity would answer the question"],
    },
    {
      id: "ux-lifecycle-ex-plan",
      kind: "assignment",
      level: "intermediate",
      title: "Plan UX across the phases",
      prompt: [
        "A city wants an online service for booking sports courts. Write a one-page plan with, for each phase, the UX question, two activities, the evidence needed to move on, and a reason the team might stop.",
      ],
      deliverable: "A five-row plan.",
      criteria: ["Research appears in every phase", "Each phase ends in a decision", "Retirement of the current booking method is considered"],
    },
    {
      id: "ux-lifecycle-ex-live",
      kind: "reflection",
      level: "advanced",
      title: "Making the case for live research",
      prompt: [
        "Leadership wants to cut the team to maintenance once a service goes live. Argue for or against keeping UX research in live, using what the lifecycle says each phase is for, and propose the smallest research and measurement routine that would protect users.",
      ],
      criteria: ["Grounds the argument in the live phase's purpose", "Proposes a concrete, minimal routine", "Acknowledges cost"],
    },
  ],

  quiz: [
    {
      id: "ux-lifecycle-q-discovery",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What is the discovery phase for?",
      options: [
        { text: "Understanding users, the problem and the constraints before deciding to build anything", correct: true, explanation: "The guidance says not to start building in discovery." },
        { text: "Building a first version to release quickly", correct: false, explanation: "That would be building before the problem is understood." },
        { text: "Testing the finished service for accessibility", correct: false, explanation: "Accessibility testing of changes belongs mainly in beta and live." },
        { text: "Retiring the old service", correct: false, explanation: "Retirement is the last phase." },
      ],
      explanation: "Discovery answers 'what problem, for whom, under what constraints?'",
    },
    {
      id: "ux-lifecycle-q-alpha",
      kind: "scenario",
      level: "intermediate",
      prompt: "At the end of alpha, a team proposes to launch its prototype code publicly to save time. What does the lifecycle guidance suggest?",
      options: [
        { text: "Alpha code is built only to test ideas and should be expected to be thrown away; build properly in beta", correct: true, explanation: "Alpha tests the riskiest assumptions with just enough build." },
        { text: "Launch it: alpha is the public release phase", correct: false, explanation: "Alpha services should not be available to the public." },
        { text: "Skip beta entirely if users liked the prototype", correct: false, explanation: "Beta tests the real build with real users at scale." },
        { text: "Return to discovery and stop all prototyping", correct: false, explanation: "Nothing in the scenario says the problem is misunderstood." },
      ],
      explanation: "Prototypes are for learning; production code comes later.",
    },
    {
      id: "ux-lifecycle-q-live",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which statement about the live phase is supported by the guidance?",
      options: [
        { text: "Improvements should be based on user research and tested for browsers, devices and accessibility", correct: true, explanation: "Live continues the learning and testing of beta." },
        { text: "No further research is needed once a service is live", correct: false, explanation: "Research continues through every phase." },
        { text: "Live means the design is frozen", correct: false, explanation: "Live is about sustained improvement." },
        { text: "Accessibility only needs testing before launch", correct: false, explanation: "Changes in live must also be tested for accessibility." },
      ],
      explanation: "UX does not end at release.",
    },
    {
      id: "ux-lifecycle-q-gates",
      kind: "critique",
      level: "advanced",
      prompt: "A team says: 'We have passed through discovery, alpha and beta, so the service is proven.' What is the best response?",
      options: [
        { text: "Passing phases shows a process was followed; whether the service works is shown by the evidence gathered, and live research and metrics must keep checking it", correct: true, explanation: "Phases are decision points, not guarantees." },
        { text: "Agree: completing the phases guarantees quality", correct: false, explanation: "A process does not guarantee outcomes." },
        { text: "Disagree: only the discovery phase matters", correct: false, explanation: "Each phase answers a different question." },
        { text: "Agree, as long as the team was agile", correct: false, explanation: "Working method is not evidence of outcomes." },
      ],
      explanation: "Evidence, not phase completion, shows that a service works.",
    },
  ],

  flashcards: [
    { id: "ux-lifecycle-fc-1", front: "Five lifecycle phases (GOV.UK)", back: "Discovery, alpha, beta, live, retirement." },
    { id: "ux-lifecycle-fc-2", front: "Alpha", back: "Try different solutions with prototypes to test the riskiest assumptions; expect to throw code and ideas away." },
    { id: "ux-lifecycle-fc-3", front: "Live phase UX", back: "Keep researching and measuring; base improvements on research and test them, including for accessibility." },
    { id: "ux-lifecycle-fc-4", front: "Why plan retirement?", back: "So people's needs are still met when the service ends." },
  ],

  references: [
    { source: "govuk-agile-phases", role: "primary", note: "Five phases, their purposes and what moves a service on; read in full." },
    { source: "govuk-learning-user-needs", role: "explanatory", note: "Research in every phase; read in full." },
    { source: "salah-2014", role: "primary", note: "Systematic review of agile and UCD integration; abstract read." },
    { source: "govuk-service-standard", role: "further", note: "The 14 points a UK government service is expected to meet throughout its life. Read them against the phases above: several, such as iterating frequently and publishing performance data, only make sense if research and design continue after launch." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "The phase model and its UX activities come from UK government guidance, read in full, which describes practice and governance rather than tested outcomes. Research on fitting UX into agile delivery is represented by one systematic review read as an abstract. Book-length lifecycle accounts were not read. The entry makes no claim that following the phases improves outcomes; it says what each phase is for.",

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
  lastVerifiedAt: "2026-11-19",
});
