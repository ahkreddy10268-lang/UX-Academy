import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "double-diamond",
  slug: "double-diamond",
  title: "Double Diamond",
  alternateNames: ["Design Council Double Diamond", "Discover–Define–Develop–Deliver", "Framework for Innovation (expanded form)"],
  summary:
    "The UK Design Council's visual model of the design process: two diamonds of divergent and convergent thinking, first to understand the right problem, then to find the right solution.",
  definition:
    "The **Double Diamond** is a design process framework published by the UK Design Council (launched in 2004) that represents design as two consecutive cycles of **divergence** (opening up possibilities) and **convergence** (narrowing to decisions). The first diamond — *Discover* and *Define* — explores and frames the problem; the second — *Develop* and *Deliver* — explores and refines solutions. The Design Council describes the process as non-linear: teams loop back as they learn.",
  primaryType: "framework",
  secondaryTypes: ["model"],
  domain: "frameworks",
  subcategory: "process",
  tags: ["design process", "divergence", "convergence", "Design Council", "problem framing", "innovation"],
  difficulty: "beginner",
  disciplines: ["Service design", "Product design", "Design management", "Innovation"],
  learningObjectives: [
    "Name and explain the four phases and the diverge–converge pattern.",
    "Explain why the model separates the problem space from the solution space.",
    "Use the Double Diamond to plan methods and decision points for a project.",
    "Critique common misreadings — linearity, 'research then design', and false completeness.",
  ],
  prerequisites: ["user-centred-design"],

  levels: {
    beginner: {
      explanation: [
        "The Double Diamond is a picture of how design work usually flows. It looks like two diamonds side by side. Each diamond starts narrow, widens out, then narrows again.",
        "**Widening** means exploring: gathering lots of information or lots of ideas without judging too early. **Narrowing** means deciding: picking what matters most, or the idea that works best.",
        "The first diamond is about **the problem**: *Discover* what is really going on, then *Define* the problem worth solving. The second is about **the solution**: *Develop* many possible answers, then *Deliver* the one that works, testing and refining it. The key lesson is simple: make sure you are solving the right problem before you solve it well.",
      ],
      analogy:
        "Planning a holiday. First you open up — browse destinations, ask friends, read about places (Discover) — then decide what kind of trip you actually need: rest, adventure or culture (Define). Next you open up again — compare hotels, routes and activities (Develop) — and finally book and adjust the plan as you go (Deliver).",
      everydayExamples: [
        "A café owner notices falling sales, talks to customers (Discover), realises the real problem is a slow morning queue (Define), tries several queue ideas (Develop) and keeps the pre-order system that works (Deliver).",
        "A school redesigning its parents' newsletter first learns what parents actually read before trying new formats.",
      ],
      vocabulary: [
        { term: "Divergence", meaning: "Opening up: exploring widely and generating many options." },
        { term: "Convergence", meaning: "Narrowing down: synthesising, prioritising and choosing." },
        { term: "Problem space", meaning: "Everything about the situation, needs and causes — before choosing a solution." },
        { term: "Solution space", meaning: "The range of possible answers to a defined problem." },
        { term: "Brief", meaning: "A statement of the problem or opportunity the team commits to tackling." },
      ],
    },
    intermediate: {
      explanation: [
        "**Discover** — research to understand the situation rather than assume it: user research, stakeholder interviews, data review, desk research. **Define** — synthesise findings into a clear problem statement, design challenge or set of opportunities. **Develop** — generate, prototype and test multiple solutions, often co-designed with users. **Deliver** — test at increasing fidelity, reject what fails, refine and launch what works {{src:design-council-double-diamond}}.",
        "The most valuable idea in the model is the **midpoint between the diamonds**: a deliberate decision about what problem to solve. Many failed projects skipped the first diamond, treating the initial brief as the problem.",
        "The Design Council later embedded the diamond in a broader **Framework for Innovation** that adds design principles (put people first; communicate visually and inclusively; collaborate and co-create; iterate, iterate, iterate), a methods bank grouped as Explore, Shape and Build, and the organisational conditions of leadership and engagement {{src:design-council-framework-for-innovation}}.",
      ],
      howItWorks: [
        "Divergent phases reward quantity and deferral of judgement; convergent phases need explicit criteria (evidence strength, impact, feasibility, user value). Naming the mode helps teams avoid arguing at cross purposes — one person brainstorming while another critiques.",
        "The arrows in the updated diagram show iteration: testing in Develop can reveal that the problem was framed wrongly, sending the team back to Discover. Early prototypes can themselves be discovery tools {{src:design-council-framework-for-innovation}}.",
      ],
      implementation: [
        "Map your planned methods onto the four phases to see whether any phase is missing or underfunded.",
        "Hold an explicit 'define' review where stakeholders agree the problem statement and success criteria before solution work begins.",
        "Time-box divergence and agree convergence criteria in advance.",
        "Plan for loops: reserve time and budget to revisit the problem when evidence demands it.",
      ],
      scenarios: [
        "A product team receives a brief to 'add a chatbot'. A short Discover phase reveals that support tickets come from one confusing billing page; the defined problem becomes billing clarity, and the solution is a redesigned page, not a chatbot.",
        "A public-sector team uses the diamonds to structure discovery and alpha phases, with a define review as a gate.",
      ],
    },
    advanced: {
      explanation: [
        "The Double Diamond codifies the diverge–converge rhythm that design researchers had long described, giving organisations a shared, memorable language. According to the Design Council, it originated in its work from 2003 to describe the design process to organisations, and it has since become one of the most widely reproduced process diagrams in design {{src:design-council-double-diamond}}.",
        "Its strength is **communicative**, not prescriptive: it legitimises time spent on problem framing and makes the shape of a project visible to non-designers. It specifies no methods, roles, durations or decision criteria — teams must supply those.",
        "Critics argue that the tidy symmetry hides the messiness of practice: real projects contain many small diamonds, run phases in parallel, and keep discovering after launch. The Design Council's own later framing, with looping arrows and an emphasis on continual refinement, responds to these critiques {{src:design-council-framework-for-innovation}}.",
      ],
      evidence: [
        "The Double Diamond is a professional framework derived from observing and codifying design practice. There is no controlled evidence that projects following it outperform others; claims of effectiveness rest on practitioner experience and case studies.",
        "Its underlying ideas — that problem framing strongly shapes outcomes, and that generating multiple alternatives before choosing improves results — are consistent with broader design research, but those findings are not evidence for the diagram itself.",
      ],
      debates: [
        "**Linear or not?** Widely misread as a waterfall; the Design Council stresses that it is not linear.",
        "**Fit with agile and continuous delivery.** Some teams find the 'Deliver' endpoint misleading when products are never finished; others nest small double diamonds inside each iteration.",
        "**Too simple for systems?** For complex social and organisational challenges, the Design Council has also published a Systemic Design Framework; whether the original diamond is sufficient for such work is debated.",
      ],
      alternativeModels: [
        "[[design-thinking|Design thinking]] (empathise, define, ideate, prototype, test) covers similar ground with five stages.",
        "[[lean-ux|Lean UX]] frames work as hypotheses and experiments rather than phases.",
        "[[user-centred-design|ISO 9241-210 human-centred design]] gives a standardised, iterative activity model with explicit requirements and evaluation.",
      ],
    },
  },

  origin: {
    contributors: ["Design Council (UK)", "Richard Eisermann (then Director of Design and Innovation)", "Jonathan Ball"],
    period: "Work began 2003; launched 2004; later expanded into the Framework for Innovation",
    problem:
      "The Design Council was promoting strategic design to businesses and the public sector but had no simple, standard way to describe what designers actually do.",
    narrative: [
      "According to the Design Council, in 2003 its Director of Design and Innovation, Richard Eisermann, asked his team how to describe the design process; the team codified and named the phases, and Jonathan Ball is credited among its originators {{src:design-council-double-diamond}}.",
      "The Design Council dates the launch to 2004 {{src:design-council-framework-for-innovation}}. Some secondary sources give 2005.",
      "The diamond was later placed at the centre of the Framework for Innovation, which added principles, a methods bank and organisational conditions. Secondary sources commonly date this to 2019; the Design Council's page does not state a date.",
    ],
    attributionNote:
      "The diverge–converge idea predates the diagram. The Double Diamond is the Design Council's codification and naming of it, not the invention of divergent and convergent thinking.",
  },

  application: {
    summary: [
      "Teams use the Double Diamond to plan projects, explain design work to stakeholders, check that problem framing is not skipped, and locate where they are in a process.",
    ],
    web: ["Structure a website redesign so content and user research precede IA and visual redesign."],
    mobile: ["Use the first diamond to decide whether an app is the right solution at all before designing screens."],
    enterprise: [
      "Use a define review to reconcile conflicting stakeholder views of the problem with research evidence.",
    ],
    services: [
      "Service design teams commonly use the diamonds to structure discovery, prototyping and piloting across channels.",
    ],
    steps: [
      "Discover: plan research to understand users, context and causes.",
      "Define: synthesise into a problem statement and success criteria; agree them with stakeholders.",
      "Develop: generate and prototype multiple solutions; test with users.",
      "Deliver: refine the strongest option, test at higher fidelity, launch and measure.",
      "Loop back whenever evidence shows the problem or solution was mis-specified.",
    ],
  },

  whenToUse: [
    "When a brief may not describe the real problem.",
    "To communicate the shape of design work to non-designers.",
    "To plan which methods happen when and where decision gates sit.",
  ],
  whenNotToUse: [
    "As a rigid stage-gate process with no loops.",
    "As a substitute for choosing concrete methods, roles and criteria.",
    "For tiny, well-understood fixes where extended discovery wastes effort.",
  ],
  advantages: [
    "Simple, memorable and widely understood.",
    "Legitimises problem framing as real work.",
    "Makes divergent and convergent modes explicit, reducing team friction.",
  ],
  limitations: [
    "Communicative rather than prescriptive: no methods, durations or criteria.",
    "Symmetrical shape misrepresents messy, parallel and continuous real-world work.",
    "No direct empirical evidence of superiority over other process models.",
    "'Deliver' can imply an end point, which does not fit continuously evolving digital products.",
  ],
  misconceptions: [
    {
      myth: "The Double Diamond is a linear, waterfall process.",
      reality:
        "The Design Council states it is not linear; arrows in its diagram show teams looping back as they learn {{src:design-council-framework-for-innovation}}.",
    },
    {
      myth: "The first diamond is research and the second is design.",
      reality:
        "Both diamonds involve research and design. Prototypes can be discovery tools, and solution work needs testing with users.",
    },
    {
      myth: "The Double Diamond invented divergent and convergent thinking.",
      reality: "It codified and named a long-observed pattern for a broad audience.",
    },
  ],

  relations: [
    { target: "user-centred-design", type: "related-to", note: "The diamonds visualise the rhythm of a human-centred process; ISO 9241-210 specifies its activities." },
    { target: "design-thinking", type: "complementary-to", note: "Both describe overlapping process phases for problem framing and solution development." },
    { target: "problem-framing", type: "applied-in", note: "The Define phase is where problem framing becomes an explicit, agreed output." },
    { target: "lean-ux", type: "contrasts-with", note: "Lean UX organises work around hypotheses and experiments rather than phases." },
    { target: "service-design", type: "applied-in", note: "Service design practice frequently uses the Double Diamond to structure projects." },
    { target: "affinity-mapping", type: "applied-in", note: "Affinity mapping is a common convergence technique at the end of Discover." },
  ],

  exercises: [
    {
      id: "double-diamond-ex-map",
      kind: "assignment",
      level: "beginner",
      title: "Map a project onto the diamonds",
      prompt: [
        "Take a recent project, from work, study or personal life. Place each activity you did into Discover, Define, Develop or Deliver.",
        "Which phase was thinnest? What did that cost you?",
      ],
      deliverable: "A sketch of the two diamonds with your activities placed on them, plus two sentences of reflection.",
      criteria: ["Activities are placed accurately", "Identifies a missing or rushed phase", "Links the gap to a consequence"],
    },
    {
      id: "double-diamond-ex-reframe",
      kind: "scenario",
      level: "intermediate",
      title: "Reframe a solution-shaped brief",
      prompt: [
        "Brief: 'Build a mobile app so patients can book appointments.'",
        "Write three Discover research questions and two alternative problem statements that might emerge from Define.",
      ],
      criteria: [
        "Questions explore needs and causes, not app features",
        "Problem statements are not solutions in disguise",
        "At least one statement could lead to a non-app solution",
      ],
      exampleSolution: [
        "Questions: How do patients currently book, and where does it fail? Who cannot use digital channels? What causes missed appointments?",
        "Problem statements: 'Patients with irregular work hours cannot reach the surgery during phone hours.' 'Missed appointments come mostly from patients who forget, not from booking friction.'",
      ],
    },
    {
      id: "double-diamond-ex-critique",
      kind: "critique",
      level: "advanced",
      title: "Evaluate the model for continuous products",
      prompt: [
        "Argue for and against using the Double Diamond to structure work on a mature SaaS product that ships weekly.",
        "Propose an adaptation and say what it gains and loses.",
      ],
      criteria: ["Balanced argument", "Addresses linearity and 'Deliver' as an endpoint", "Proposes a concrete adaptation"],
    },
  ],

  quiz: [
    {
      id: "double-diamond-q-phases",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What are the four phases of the Double Diamond, in order?",
      options: [
        { text: "Discover, Define, Develop, Deliver", correct: true, explanation: "These are the Design Council's four phases." },
        { text: "Empathise, Define, Ideate, Test", correct: false, explanation: "These are design-thinking stages (with Prototype missing)." },
        { text: "Research, Design, Build, Launch", correct: false, explanation: "This is a generic linear project lifecycle." },
        { text: "Explore, Shape, Build, Ship", correct: false, explanation: "Explore, Shape and Build are the Framework for Innovation's method groups, not phases." },
      ],
      explanation: "The first diamond (Discover, Define) concerns the problem; the second (Develop, Deliver) concerns the solution.",
    },
    {
      id: "double-diamond-q-midpoint",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "What is the main purpose of the point where the two diamonds meet?",
      options: [
        { text: "To commit to a clearly defined problem or opportunity before exploring solutions", correct: true, explanation: "The midpoint is the output of Define — the problem worth solving." },
        { text: "To launch a minimum viable product", correct: false, explanation: "Launch belongs to Deliver." },
        { text: "To finish all user research", correct: false, explanation: "Research continues in the second diamond through testing." },
        { text: "To choose the visual style", correct: false, explanation: "Visual decisions are part of solution work and are not the purpose of the midpoint." },
      ],
      explanation: "The model's key lesson is to solve the right problem: the midpoint makes that decision explicit.",
    },
    {
      id: "double-diamond-q-linear",
      kind: "true-false",
      level: "intermediate",
      prompt: "According to the Design Council, the Double Diamond should be followed strictly in sequence, without returning to earlier phases.",
      options: [
        { text: "True", correct: false, explanation: "The Design Council explicitly says the process is not linear and shows looping arrows." },
        { text: "False", correct: true, explanation: "Learning in later phases often sends teams back, for example when testing reveals the problem was misframed." },
      ],
      explanation: "The diamonds describe modes of thinking, not a one-way sequence.",
    },
    {
      id: "double-diamond-q-evidence",
      kind: "scenario",
      level: "advanced",
      prompt: "A consultant claims 'research proves the Double Diamond produces better outcomes'. What is the most accurate response?",
      options: [
        { text: "It is a professional framework codified from practice; there is no controlled evidence it outperforms alternatives, though its underlying ideas are consistent with design research.", correct: true, explanation: "This classifies the evidence honestly as professional guideline and case-based." },
        { text: "Correct — it was validated in a randomised controlled trial.", correct: false, explanation: "No such trial is known; do not invent evidence." },
        { text: "It has been disproven and should not be used.", correct: false, explanation: "Lack of controlled evidence is not disproof; it remains a useful communication tool." },
        { text: "It is an ISO standard, so it is proven.", correct: false, explanation: "It is not an ISO standard, and standards are not proof of effectiveness." },
      ],
      explanation: "Match claims to the evidence class: frameworks codified from practice are useful without being experimentally proven.",
    },
  ],

  flashcards: [
    { id: "double-diamond-fc-phases", front: "Double Diamond phases", back: "Discover → Define (problem) | Develop → Deliver (solution); each diamond diverges then converges." },
    { id: "double-diamond-fc-origin", front: "Who published the Double Diamond, and when?", back: "The UK Design Council; it dates the launch to 2004." },
    { id: "double-diamond-fc-fi", front: "Framework for Innovation adds…", back: "Design principles, a methods bank (Explore, Shape, Build), and leadership and engagement." },
  ],

  references: [
    { source: "design-council-double-diamond", role: "primary", note: "The originating organisation's account of the phases and history." },
    { source: "design-council-framework-for-innovation", role: "primary", note: "Expanded framework, principles, methods bank, launch date and non-linearity." },
    { source: "iso-9241-210-2019", role: "further", note: "Standardised human-centred process for comparison." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "A professional framework from a recognised design body, codified from practice. It is valuable for communication and planning; no controlled evidence shows it produces better outcomes than other process models. History is taken from the Design Council's own pages (checked 2026-11-03).",

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
