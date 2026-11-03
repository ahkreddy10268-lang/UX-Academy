import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "user-centred-design",
  slug: "user-centred-design",
  title: "User-Centred Design",
  alternateNames: ["User-centered design", "UCD", "Human-centred design (HCD, ISO term)"],
  summary:
    "A design approach that grounds decisions in an explicit understanding of users, their tasks and context, involves them throughout, and iterates on designs through evaluation with real people.",
  definition:
    "**User-centred design (UCD)** is an approach to designing interactive systems in which an explicit understanding of users, tasks and environments drives requirements and design, users are involved throughout, and design solutions are refined iteratively through user-centred evaluation. ISO 9241-210 standardises the closely related **human-centred design** process: understand and specify the context of use, specify user requirements, produce design solutions, and evaluate them against requirements — repeating until requirements are met.",
  primaryType: "framework",
  secondaryTypes: ["methodology", "standard"],
  domain: "foundations",
  subcategory: "approaches",
  tags: ["UCD", "HCD", "ISO 9241-210", "iteration", "user involvement", "design process", "context of use"],
  difficulty: "beginner",
  disciplines: ["Human-computer interaction", "Product design", "UX research", "Service design", "Human factors"],
  learningObjectives: [
    "Explain the core idea of UCD and why it replaced designing from assumptions.",
    "Describe Gould and Lewis's three principles and the four ISO 9241-210 activities.",
    "Plan a UCD cycle for a real project, choosing methods for each activity.",
    "Critically evaluate UCD's limits — from user involvement theatre to its blind spots for non-users and society.",
  ],
  prerequisites: ["usability"],

  levels: {
    beginner: {
      explanation: [
        "User-centred design means **finding out about the people you are designing for before and while you design — and checking your ideas with them, again and again.** Instead of a team guessing what users need, the team learns it, tries something, watches real people use it, and improves it.",
        "It rests on a humbling observation: designers are not typical users. They know the product too well, use different words, and have different skills. Without real users in the loop, even talented teams build things that make sense only to themselves.",
        "UCD is not a single technique. It is a way of working that uses many methods — interviews, observation, prototypes, usability tests — arranged in a loop of *understand → define → design → evaluate*.",
      ],
      analogy:
        "A tailor making a suit does not guess your size from a photo. They measure you, make a first fitting, ask you to move around in it, adjust, and fit again. UCD is the tailor's approach applied to software and services.",
      everydayExamples: [
        "A council redesigns its bin-collection website after watching residents struggle to find their collection day.",
        "A medical-device team observes nurses on night shifts before designing an infusion-pump interface.",
        "An app team tests paper sketches with five customers before writing any code.",
      ],
      vocabulary: [
        { term: "Context of use", meaning: "Who the users are, what they are trying to do, and the situation they do it in." },
        { term: "User requirements", meaning: "What the system must let users achieve, and how well, stated in testable terms." },
        { term: "Iteration", meaning: "Repeating the design-and-evaluate cycle, improving the design each time." },
        { term: "Evaluation", meaning: "Checking a design with users (or against criteria) to see if it meets requirements." },
      ],
    },
    intermediate: {
      explanation: [
        "Gould and Lewis (1985) distilled UCD into three principles: **early focus on users and tasks** (study who will use the system and what they do, directly), **empirical measurement** (observe and measure real people using simulations and prototypes early on), and **iterative design** (fix problems found in testing, then test again) {{src:gould-lewis-1985}}. Their survey of designers found that these seemingly obvious principles were rarely named or followed — which is still a useful warning.",
        "ISO 9241-210 turns the idea into a process with four linked activities, preceded by planning: **understand and specify the context of use**; **specify the user requirements**; **produce design solutions**; and **evaluate the designs against requirements**. If evaluation shows requirements are not met, the team iterates back to whichever activity needs revisiting {{src:iso-9241-210-2019}}.",
        "The standard also lists principles: designs grounded in explicit understanding of users, tasks and environments; users involved throughout; design driven and refined by user-centred evaluation; an iterative process; attention to the whole user experience; and multidisciplinary teams. These are paraphrased here because the standard's text is paywalled.",
      ],
      howItWorks: [
        "Each activity has typical methods. Context of use: [[contextual-inquiry|contextual inquiry]], [[in-depth-interviews|interviews]], [[field-studies|field studies]], analytics. Requirements: personas, scenarios, task analysis, measurable [[usability|usability]] goals. Design: sketches, prototypes, content and IA work. Evaluation: [[usability-testing|usability testing]], [[heuristic-evaluation|heuristic evaluation]], [[cognitive-walkthrough|cognitive walkthroughs]].",
        "Iteration is what makes UCD work. Early, cheap prototypes let teams discover mistakes while change is inexpensive; later, higher-fidelity tests confirm that requirements are met.",
      ],
      implementation: [
        "Plan UCD activities into the project schedule and budget — they fail when bolted on after build.",
        "Write a context-of-use description and share it; refer to it when making decisions.",
        "Set measurable usability requirements so evaluation has a target, not just opinions.",
        "Involve users at every stage, but choose the form of involvement deliberately: informants, testers, or co-designers.",
        "Close the loop: every evaluation produces prioritised changes, and the next iteration checks whether they worked.",
      ],
      scenarios: [
        "An agile team runs a short research spike each sprint and tests the previous sprint's work with three to five users.",
        "A government service team follows a discovery–alpha–beta–live lifecycle in which each phase includes user research and is assessed against standards (see the GOV.UK Service Manual).",
      ],
    },
    advanced: {
      explanation: [
        "The phrase 'user centered system design' was popularised by Norman and Draper's 1986 edited volume, which argued that system design should start from the needs and cognition of users rather than the capabilities of technology {{src:norman-draper-1986}}. Gould and Lewis's paper supplied the operational principles; ISO 13407 (1999) standardised the process, later replaced by ISO 9241-210 (2010, revised 2019).",
        "ISO prefers 'human-centred' over 'user-centred' to acknowledge effects on stakeholders who are not direct users — operators, people affected by decisions, wider society. In practice most teams use the terms interchangeably, but the distinction matters when designing systems with significant indirect effects, such as algorithmic decision-making.",
        "UCD has well-known tensions. **User involvement** ranges from token consultation to genuine partnership (see [[participatory-design|participatory design]]). **Users' stated preferences** can conflict with observed behaviour, so UCD privileges observation. And **innovation** debates persist: critics argue user research yields incremental improvements, while proponents reply that deep understanding of needs is what makes radical solutions viable.",
      ],
      evidence: [
        "UCD is an established framework and a standard, not an experimentally proven intervention. Evidence for its value comes largely from case studies and cost-justification analyses showing that problems found early cost less to fix — supportive but not controlled evidence.",
        "The empirical core — that designers mispredict user behaviour, and that testing with users reveals problems designers miss — is well supported by decades of usability research {{src:nielsen-1993}}.",
      ],
      debates: [
        "**UCD vs. activity-centred design.** Norman has argued that focusing on activities rather than individual users can produce more coherent tools. The positions are complementary more than opposed.",
        "**UCD vs. design-led innovation.** Some argue breakthrough products came from vision, not research. Counter-evidence: many successful 'visionary' products went through intensive internal iteration and testing.",
        "**Who counts as the user?** Centring the direct user can neglect non-users, affected communities and the environment — a critique driving interest in human-centred, value-sensitive and systemic design.",
      ],
      alternativeModels: [
        "[[design-thinking|Design thinking]] packages similar activities (empathise, define, ideate, prototype, test) with more emphasis on ideation and business innovation.",
        "[[double-diamond|The Double Diamond]] visualises divergence and convergence across problem and solution spaces.",
        "[[lean-ux|Lean UX]] reframes the loop as hypotheses tested with minimum viable experiments.",
      ],
    },
  },

  origin: {
    contributors: ["John D. Gould", "Clayton Lewis", "Donald A. Norman", "Stephen W. Draper", "ISO TC 159/SC 4"],
    period: "1980s; standardised as ISO 13407 (1999), ISO 9241-210 (2010, revised 2019)",
    problem:
      "Systems designed by engineers for engineers were failing ordinary users. Teams needed principles and a process to make usability a planned outcome rather than a hope.",
    narrative: [
      "In 1985, Gould and Lewis at IBM published three principles of designing for usability and reported that designers rarely identified them {{src:gould-lewis-1985}}.",
      "In 1986, Norman and Draper's *User Centered System Design* gave the movement its name and a cognitive-science foundation {{src:norman-draper-1986}}.",
      "International standardisation followed: ISO 13407 in 1999, then ISO 9241-210, which the 2019 revision maintains as the reference description of the human-centred design process {{src:iso-9241-210-2019}}.",
    ],
  },

  application: {
    summary: [
      "UCD is the organising frame for most UX work: it decides *when* research and testing happen and *what* they feed. It applies to any interactive product or service, from apps to medical devices to public services.",
    ],
    web: [
      "Run discovery research before redesigning information architecture; validate structure with card sorting and tree testing.",
      "Test key journeys at every major release with representative users.",
    ],
    mobile: [
      "Observe use in real contexts — on the move, interrupted, one-handed — not only in a lab.",
    ],
    enterprise: [
      "Include all user roles (operators, supervisors, administrators) and observe real workflows; workarounds reveal unmet requirements.",
      "Negotiate access to users early: in enterprise, the buyer is often not the user.",
    ],
    services: [
      "Extend UCD across channels and staff touchpoints; service users include front-line staff as well as customers.",
    ],
    steps: [
      "Plan the human-centred activities, roles and budget.",
      "Understand and specify the context of use through research.",
      "Specify user requirements, including measurable usability goals.",
      "Produce design solutions, starting with low-fidelity prototypes.",
      "Evaluate designs with users against the requirements.",
      "Iterate until the requirements are met, then keep evaluating after release.",
    ],
  },

  whenToUse: [
    "Almost any interactive product or service where users' success matters.",
    "Safety-critical or regulated domains, where ISO 9241-210 alignment may be expected.",
    "Projects with uncertain user needs, where early learning reduces risk.",
  ],
  whenNotToUse: [
    "As a rigid waterfall with fixed phases — the standard itself describes an iterative, interdependent process.",
    "As a justification for doing whatever users say they want; UCD privileges observed needs and outcomes over stated preferences.",
    "As the sole frame for systems whose main impacts fall on non-users or society; widen to human-centred or systemic approaches.",
  ],
  advantages: [
    "Reduces the risk of building the wrong thing or building it unusably.",
    "Provides a common, standardised process vocabulary across disciplines.",
    "Finds problems early, when they are cheapest to fix.",
  ],
  limitations: [
    "Requires time, budget and access to users, which organisations often underestimate.",
    "Can be performed ritualistically, with research that does not influence decisions.",
    "Strong at improving fit to existing needs; less prescriptive about generating radically new concepts.",
    "Centring individual users can overlook collective, organisational and societal effects.",
  ],
  misconceptions: [
    {
      myth: "User-centred design means asking users what they want and building it.",
      reality:
        "UCD relies on understanding users' goals and observing behaviour. Users are experts in their own lives, not in design; their suggestions are data to interpret, not specifications.",
    },
    {
      myth: "UCD is a linear sequence of research, then design, then testing.",
      reality:
        "Both Gould and Lewis and ISO 9241-210 describe an iterative loop. Evaluation results send the team back to whichever activity needs revisiting.",
    },
    {
      myth: "UCD and human-centred design are completely different methodologies.",
      reality:
        "They share principles and activities. ISO uses 'human-centred' to include stakeholders beyond direct users; many practitioners use the terms interchangeably.",
    },
  ],

  relations: [
    { target: "usability", type: "related-to", note: "UCD exists to make usability, and broader UX quality, a planned and measured outcome." },
    { target: "human-centred-design", type: "related-to", note: "ISO's human-centred design shares UCD's process while widening attention to stakeholders beyond direct users." },
    { target: "design-thinking", type: "complementary-to", note: "Design thinking repackages UCD-like activities with greater emphasis on ideation and innovation strategy." },
    { target: "double-diamond", type: "related-to", note: "The Double Diamond visualises the diverge–converge rhythm of a human-centred process." },
    { target: "usability-testing", type: "applied-in", note: "Usability testing is the canonical evaluation activity in a UCD cycle." },
    { target: "contextual-inquiry", type: "applied-in", note: "Contextual inquiry is a core method for understanding the context of use." },
    { target: "participatory-design", type: "contrasts-with", note: "Participatory design gives users a decision-making role, whereas classic UCD often treats them as informants and testers." },
  ],

  method: {
    procedure: [
      "Plan the human-centred design activities and integrate them into the project plan.",
      "Understand and specify the context of use.",
      "Specify the user requirements.",
      "Produce design solutions to meet the requirements.",
      "Evaluate the designs against the requirements; iterate as needed.",
    ],
    participants: "Representative users from each user group, plus stakeholders; involvement continues throughout.",
    duration: "Ongoing for the life of the product; individual cycles range from days (agile) to months.",
    inputs: ["Business goals", "Existing research and data", "Access to representative users"],
    outputs: ["Context-of-use description", "User requirements", "Prototypes and designs", "Evaluation reports"],
    purpose: "both",
    data: "mixed",
  },

  exercises: [
    {
      id: "user-centred-design-ex-plan",
      kind: "assignment",
      level: "intermediate",
      title: "Plan a UCD cycle",
      prompt: [
        "You are redesigning a library's online renewal system used by students, older residents and staff.",
        "For each of the four ISO 9241-210 activities, choose one method, say who is involved, and name its output.",
      ],
      deliverable: "A four-row plan: activity, method, participants, output.",
      criteria: [
        "Covers all three user groups",
        "Methods suit the activity",
        "Evaluation is tied to explicit requirements",
        "Shows where iteration loops back",
      ],
      exampleSolution: [
        "Context: observation at the desk and remote interviews with each group → context-of-use description. Requirements: task analysis workshop → measurable goals such as '90% renew without help'. Design: paper prototypes with staff and students → clickable prototype. Evaluation: moderated usability tests with five people per group against the goals → findings that loop back to design, or to context if a group's needs were misunderstood.",
      ],
    },
    {
      id: "user-centred-design-ex-reflect",
      kind: "reflection",
      level: "beginner",
      title: "You are not the user",
      prompt: [
        "Recall a time a product confused you but probably made perfect sense to the people who built it.",
        "What did the team know that you did not? What UCD activity would have revealed the gap?",
      ],
      criteria: ["Identifies a specific knowledge gap", "Links it to an activity such as testing or contextual research"],
    },
    {
      id: "user-centred-design-ex-critique",
      kind: "critique",
      level: "advanced",
      title: "Audit a 'user-centred' process",
      prompt: [
        "A company says it is user-centred because it runs one survey a year and a usability test before launch.",
        "Assess this against Gould and Lewis's three principles and the ISO principles. Recommend three changes.",
      ],
      criteria: [
        "Notes missing early focus and iteration",
        "Distinguishes surveys from observation",
        "Recommendations are concrete and feasible",
      ],
    },
  ],

  quiz: [
    {
      id: "user-centred-design-q-principles",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which set matches Gould and Lewis's (1985) three principles of designing for usability?",
      options: [
        { text: "Early focus on users and tasks; empirical measurement; iterative design", correct: true, explanation: "These are the three principles from their Communications of the ACM paper." },
        { text: "Empathise; ideate; prototype", correct: false, explanation: "These are design-thinking stages, popularised much later." },
        { text: "Discover; define; develop", correct: false, explanation: "These are three of the four Double Diamond phases." },
        { text: "Consistency; feedback; error prevention", correct: false, explanation: "These are interface design heuristics, not process principles." },
      ],
      explanation: "Gould and Lewis's principles describe a process: learn about users early, measure with real people, and iterate.",
    },
    {
      id: "user-centred-design-q-iso",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "In ISO 9241-210, what happens when evaluation shows that user requirements are not met?",
      options: [
        { text: "The team iterates back to the appropriate activity — design, requirements or context of use.", correct: true, explanation: "The process is iterative; evaluation results can reveal that requirements or the understanding of context were wrong, not just the design." },
        { text: "The project is cancelled.", correct: false, explanation: "Failed evaluation is expected and drives improvement." },
        { text: "The requirements are lowered until they are met.", correct: false, explanation: "Requirements can be revised if understanding changes, but lowering them to pass defeats the purpose." },
        { text: "The design ships and is fixed after launch.", correct: false, explanation: "Post-launch evaluation is valuable, but the process calls for iteration before requirements are considered met." },
      ],
      explanation: "Iteration — returning to earlier activities on the basis of evaluation — is the defining feature of the human-centred process.",
    },
    {
      id: "user-centred-design-q-ask",
      kind: "scenario",
      level: "intermediate",
      prompt:
        "In interviews, most users ask for 'more filters' on a search page. Observation shows they rarely use the existing filters and mostly retype queries. What would a user-centred designer do?",
      options: [
        { text: "Investigate the underlying need (finding relevant results quickly) and test alternatives such as better query suggestions, rather than just adding filters.", correct: true, explanation: "UCD treats requests as evidence of needs and privileges observed behaviour when they conflict." },
        { text: "Add the requested filters, because users asked for them.", correct: false, explanation: "Stated preferences conflict with observed behaviour; building to requests alone is not UCD." },
        { text: "Ignore the interviews, because interviews are unreliable.", correct: false, explanation: "Interviews revealed a real frustration; the point is to interpret them alongside observation." },
        { text: "Run a survey to count how many users want filters.", correct: false, explanation: "Counting a stated preference does not resolve the conflict with behaviour." },
      ],
      explanation: "Triangulate what people say with what they do, then design and test against the underlying goal.",
    },
  ],

  flashcards: [
    { id: "user-centred-design-fc-iso", front: "ISO 9241-210 activities", back: "Understand and specify context of use → specify user requirements → produce design solutions → evaluate against requirements (iterate)." },
    { id: "user-centred-design-fc-gl", front: "Gould & Lewis (1985) principles", back: "Early focus on users and tasks; empirical measurement; iterative design." },
    { id: "user-centred-design-fc-hcd", front: "Why does ISO say 'human-centred'?", back: "To include stakeholders affected by a system who are not its direct users." },
  ],

  references: [
    { source: "gould-lewis-1985", role: "primary", note: "Three principles of designing for usability." },
    { source: "norman-draper-1986", role: "primary", note: "Named and framed user-centred system design." },
    { source: "iso-9241-210-2019", role: "standard", note: "Human-centred design process and principles (paraphrased from public descriptions; paywalled)." },
    { source: "nielsen-1993", role: "explanatory", note: "Evidence that testing with users reveals problems designers miss." },
    { source: "govuk-service-manual", role: "further", note: "A public-sector implementation of human-centred delivery phases." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "UCD is an established framework codified in an international standard. Its components, especially testing with real users, rest on strong empirical evidence that designers mispredict use. Its overall business benefit is supported mainly by case studies and cost-justification arguments rather than controlled comparisons.",

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
