import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "design-processes",
  slug: "design-processes",
  title: "Design Process",
  alternateNames: ["Design processes", "Design process models", "Design methodology"],
  summary:
    "The sequence of activities by which a team moves from understanding a situation to a designed and tested outcome, and the models that describe it. Many models exist; most share understanding, framing, making and testing, with iteration.",
  definition:
    "A **design process** is the sequence of activities by which a person or team moves from understanding a situation to a designed outcome. **Process models** describe or prescribe that sequence for different purposes and from different points of view {{src:wynn-clarkson-2018}}; Dubberly's compendium collects over a hundred of them, from four-word mnemonics to a 229-step method {{src:dubberly-how-do-you-design}}. Models used in user-experience work, such as the Double Diamond, the human-centred design process and design-thinking phases, share a common shape: understand, frame, create and test, with iteration {{src:design-council-framework-for-innovation}} {{src:ideo-design-thinking-process}}.",
  primaryType: "concept",
  secondaryTypes: [],
  domain: "foundations",
  subcategory: "approaches",
  tags: ["process models", "iteration", "divergent and convergent thinking", "Double Diamond", "design methods"],
  difficulty: "beginner",
  disciplines: ["Design", "User experience", "Engineering design", "Service design"],
  learningObjectives: [
    "Explain what a design process and a process model are, and why many different models exist.",
    "Identify the activities that the common UX process models share and where they differ.",
    "Choose and adapt a process for a project by weighing risk, team size and how well the problem is understood.",
    "Distinguish a process model from what designers actually do, and judge claims that a model guarantees good outcomes.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Every design project follows some sequence: find out what is going on, decide what the problem is, come up with ideas, make something and check whether it works. A **design process** is that sequence. A **process model** is a description of it, often drawn as a diagram, that a team can learn and share.",
        "There is no single correct model. Dubberly collected over one hundred of them from architecture, industrial design, engineering, quality management and software, some very short, such as 'define, design, develop, deploy', and some very long {{src:dubberly-how-do-you-design}}. Some are different names for the same process; others reflect different approaches.",
        "The models most used in user-experience work look alike. The Design Council's Double Diamond moves through discover, define, develop and deliver, widening then narrowing twice {{src:design-council-framework-for-innovation}}; IDEO's design-thinking phases run from framing the question to testing and sharing {{src:ideo-design-thinking-process}}. Both say the work is not linear.",
      ],
      analogy:
        "A recipe and cooking are different things. A recipe (the process model) helps beginners and lets a kitchen team coordinate, but an experienced cook adjusts it to the ingredients on the day, and sometimes goes back a step.",
      everydayExamples: [
        "A team's wall chart showing the stages a feature passes through, from research to release.",
        "A designer working alone on a poster who sketches, looks, and redraws without naming any stages.",
        "An agency that promises clients the same four phases on every project.",
      ],
      vocabulary: [
        { term: "Design process", meaning: "The sequence of activities from understanding a situation to a designed outcome." },
        { term: "Process model", meaning: "A description of a design process, used to teach, plan or coordinate it." },
        { term: "Iteration", meaning: "Going back to an earlier activity because of what was learned, then forward again." },
        { term: "Divergent and convergent", meaning: "Widening the options or the understanding, then narrowing to a decision." },
      ],
    },
    intermediate: {
      explanation: [
        "**Why use a process at all?** Dubberly gives three practical goals: reducing risk, setting expectations and increasing repeatability. He also notes that ad hoc processes are hard to improve because they must be reinvented each time, while focusing on process may hinder more than it helps a designer working alone on a small piece {{src:dubberly-how-do-you-design}}.",
        "**What the UX models share.** The Double Diamond starts by understanding rather than assuming what the problem is, then defines it, develops answers and delivers by testing at small scale; it is explicitly not linear, and testing can send a team back to the beginning {{src:design-council-framework-for-innovation}}. IDEO describes the same rhythm as creating and making choices across seven phases {{src:ideo-design-thinking-process}}. The ISO human-centred design process, covered in [[user-centred-design]], cycles through understanding the context, specifying requirements, producing solutions and evaluating them.",
        "**Where they differ.** They differ in what they emphasise and where they come from: the Double Diamond separates finding the right problem from finding a right solution; design thinking adds business lenses; the ISO process is written for interactive systems and their users. Choosing among them is less important than doing the shared activities well and knowing why you go back.",
        "**Heavy or light?** Dubberly asks when a heavy-weight process is needed and when a light-weight one will do {{src:dubberly-how-do-you-design}}. In this academy's reading, the answer depends on risk, on how many people must coordinate, and on how well the problem is already understood.",
      ],
      howItWorks: [
        "**Understand** the people and the situation before deciding what to make {{src:design-council-framework-for-innovation}}.",
        "**Frame** the problem: what exactly is to be solved, for whom, and how you will know.",
        "**Create** options: generate several, then narrow {{src:ideo-design-thinking-process}}.",
        "**Make and test** something tangible with the people it is for, at small scale first {{src:design-council-framework-for-innovation}}.",
        "**Iterate**: go back to whichever activity the evidence points to, then forward again.",
      ],
      implementation: [
        "Write down the process the team will follow, with what each activity must produce, before a large project starts.",
        "Agree what evidence will send the team back a step, so iteration is planned rather than a surprise.",
        "Use a lighter process for small, well-understood changes and a heavier one where risk or team size is high.",
        "Record what you actually did, then compare it with the plan to improve the process next time {{src:dubberly-how-do-you-design}}.",
      ],
      scenarios: [
        "Illustrative scenario: a two-person team adds a filter to an existing search page. They sketch, test with three people and ship within a week, with no formal phases. A light process fits the risk.",
        "Illustrative scenario: a public body redesigns its benefits application. Many teams, legal constraints and vulnerable users make a defined process with research before any building, and agreed points for going back, worth its overhead.",
        "Illustrative scenario: an agency presents the same four-phase diagram to every client but skips research when budgets are tight. The model on the slide no longer describes the process followed.",
      ],
    },
    advanced: {
      explanation: [
        "The research literature treats process models as representations built for different purposes and from different points of view, which is why so many coexist; Wynn and Clarkson propose an organising framework that relates the main categories and discusses their advantages and limitations {{src:wynn-clarkson-2018}}.",
        "A model is not the practice it describes. Kimbell's critique of design thinking applies to process models generally: generalised accounts can ignore the diversity of designers' situated practices {{src:kimbell-2011}}. A diagram helps a team coordinate, but it does not show the judgement that happens inside each box.",
      ],
      evidence: [
        "Over one hundred design and development process models have been collected from several disciplines, some synonyms for the same process and some differing approaches {{src:dubberly-how-do-you-design}}.",
        "A review in an engineering-design journal treats the many published models as representations made for different purposes and proposes a framework for relating them {{src:wynn-clarkson-2018}}. Abstract only.",
        "No study read for this entry compares the outcomes of different UX process models; claims that one model produces better results are unsupported here.",
      ],
      debates: [
        "**Prescription or description?** A model can say what a team should do or describe what designers actually do. Reading a prescriptive model as a description of practice, or the reverse, leads to false expectations.",
        "**Process or judgement?** Dubberly asks how to minimise risk while maximising creativity {{src:dubberly-how-do-you-design}}. More process can make work repeatable, and can also make it rigid.",
      ],
      alternativeModels: [
        "[[double-diamond|The Double Diamond]]: two diverge-converge cycles, for the problem and for the solution.",
        "[[user-centred-design|The ISO human-centred design process]]: an iterative cycle centred on users, tasks and environments.",
        "[[design-thinking|Design thinking]]: phases or modes plus three lenses for judging ideas.",
        "[[ux-lifecycle|The UX lifecycle]]: how UX activities map onto a product's phases from discovery to retirement.",
      ],
    },
  },

  origin: {
    contributors: ["Hugh Dubberly", "Design Council", "IDEO"],
    period: "Models from engineering and architecture through to UX; the Double Diamond launched in 2004",
    problem:
      "Teams need a shared way to plan and coordinate design work and to improve it over time; ad hoc processes cannot be repeated or improved {{src:dubberly-how-do-you-design}}.",
    narrative: [
      "Process models come from many disciplines, including architecture, industrial design, mechanical engineering, quality management and software development {{src:dubberly-how-do-you-design}}.",
      "In UX and service design, the Design Council's Double Diamond, launched in 2004, became a widely used description of the design process {{src:design-council-framework-for-innovation}}, and IDEO's teaching popularised the phases of design thinking {{src:ideo-design-thinking-process}}.",
    ],
  },

  application: {
    summary: [
      "Use a process model to plan, coordinate and teach, sized to the risk of the work; keep the iteration that every model calls for, and record what you actually did.",
    ],
    web: [
      "Add research and testing steps to a site redesign before visual design starts.",
    ],
    mobile: [
      "Plan at least one round of testing on real devices before release, inside the process rather than after it.",
    ],
    enterprise: [
      "Agree with engineering and product where design activities sit in the delivery process; see [[ux-lifecycle]].",
    ],
    services: [
      "Use the Double Diamond's principles: put people first, communicate visually, collaborate and co-create, iterate {{src:design-council-framework-for-innovation}}.",
    ],
    steps: [
      "Judge the project's risk, team size and how well the problem is understood.",
      "Choose a model and say why.",
      "Define what each activity must produce.",
      "Agree what evidence sends the team back.",
      "Record what you did and review the process afterwards.",
    ],
  },

  whenToUse: [
    "Planning and coordinating work across a team.",
    "Teaching newcomers how design work is organised.",
    "Reviewing and improving how a team works.",
  ],
  whenNotToUse: [
    "As a guarantee of good outcomes: a model describes activities, not the quality of the judgement within them.",
    "Imposed in full on small, well-understood changes, where it adds delay without reducing risk.",
  ],
  advantages: [
    "Makes plans, roles and expectations visible.",
    "Lets a team improve its way of working over time.",
    "Gives newcomers a structure to learn from.",
  ],
  limitations: [
    "Diagrams simplify; the real work loops back and overlaps.",
    "Different models describe similar activities with different words, which can confuse teams.",
    "No outcome comparison between UX process models was found in the sources read.",
  ],
  misconceptions: [
    {
      myth: "There is one correct design process.",
      reality: "Over a hundred models exist, some synonyms and some different approaches {{src:dubberly-how-do-you-design}}; they serve different purposes {{src:wynn-clarkson-2018}}.",
    },
    {
      myth: "A design process runs once from start to finish.",
      reality: "The common UX models are explicitly not linear: testing can send a team back to the start {{src:design-council-framework-for-innovation}}.",
    },
    {
      myth: "Following a process guarantees a good design.",
      reality: "A model organises activities; the quality comes from the research, framing and judgement inside them.",
    },
  ],

  relations: [
    { target: "double-diamond", type: "related-to", note: "The Double Diamond is one widely used model of the design process." },
    { target: "user-centred-design", type: "related-to", note: "The ISO human-centred design process is a design process written for interactive systems." },
    { target: "design-thinking", type: "related-to", note: "Design-thinking phases and modes are another model of the same rhythm of widening and narrowing." },
    { target: "ux-lifecycle", type: "complementary-to", note: "The design process describes how a design is made; the UX lifecycle places that work in the phases of a product's life." },
    { target: "lean-ux", type: "related-to", note: "Lean UX describes the process as short hypothesis-testing cycles." },
  ],

  exercises: [
    {
      id: "design-processes-ex-map",
      kind: "critique",
      level: "beginner",
      title: "Map a real project to a model",
      prompt: [
        "Describe the steps of a project you took part in, in the order they actually happened.",
        "Map them to the Double Diamond's four phases. Mark any step that went back, and any phase that was skipped.",
      ],
      deliverable: "A timeline with the four phases marked and the loops drawn.",
      criteria: ["Describes what happened, not what was planned", "Marks loops and gaps honestly"],
    },
    {
      id: "design-processes-ex-choose",
      kind: "scenario",
      level: "intermediate",
      title: "Heavy or light?",
      prompt: [
        "For each project, choose a light or heavy process and justify it with risk, team size and how well the problem is understood: (a) adding a dark mode to an app; (b) redesigning how patients book hospital appointments; (c) a new internal expenses tool for 30 people.",
      ],
      deliverable: "Three short justified choices.",
      criteria: ["Uses all three factors", "Plans testing in every case", "Avoids one-size-fits-all"],
    },
    {
      id: "design-processes-ex-claim",
      kind: "reflection",
      level: "advanced",
      title: "Model or practice?",
      prompt: [
        "Your manager wants to adopt a new process model because 'it produces better designs'. Explain what a process model can and cannot do, and propose how you would know after six months whether the change helped.",
      ],
      criteria: ["Distinguishes model from practice", "Proposes measurable indicators", "Does not claim outcomes the sources do not support"],
    },
  ],

  quiz: [
    {
      id: "design-processes-q-shared",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which activities do the common UX process models share?",
      options: [
        { text: "Understanding the situation, framing the problem, creating options, making and testing, with iteration", correct: true, explanation: "The Double Diamond, design thinking and the ISO process all include these, in different words." },
        { text: "Only building and releasing", correct: false, explanation: "All the models start by understanding people and the problem." },
        { text: "Writing a specification, then coding, then testing once at the end", correct: false, explanation: "That is a linear sequence; the UX models are explicitly iterative." },
        { text: "Choosing colours, fonts and layout", correct: false, explanation: "These are visual design decisions, not the stages of a process." },
      ],
      explanation: "Different names, shared shape.",
    },
    {
      id: "design-processes-q-linear",
      kind: "true-false",
      level: "beginner",
      prompt: "True or false: the Double Diamond is meant to be followed once, from left to right.",
      options: [
        { text: "False", correct: true, explanation: "The Design Council says it is not linear; learning can send teams back to the start." },
        { text: "True", correct: false, explanation: "The diagram's arrows and the Design Council's text both describe going back." },
      ],
      explanation: "Iteration is part of every common UX process model.",
    },
    {
      id: "design-processes-q-weight",
      kind: "scenario",
      level: "intermediate",
      prompt: "A small team is changing the wording of one error message in a mature product. What process fits best?",
      options: [
        { text: "A light process: draft, check with a few people, release and monitor", correct: true, explanation: "Low risk and a well-understood problem do not justify heavy process." },
        { text: "A full discovery phase of several weeks", correct: false, explanation: "The problem is well understood; discovery would add delay without reducing much risk." },
        { text: "No checking at all, because it is only words", correct: false, explanation: "Words matter; a quick check with users is cheap." },
        { text: "Whatever process the agency's slide shows", correct: false, explanation: "Process should fit the work, not the template." },
      ],
      explanation: "Size the process to risk, team size and understanding.",
    },
    {
      id: "design-processes-q-evidence",
      kind: "critique",
      level: "advanced",
      prompt: "A blog post claims that teams using the Double Diamond produce better products than teams using design thinking. What is the most accurate response, given the sources?",
      options: [
        { text: "No outcome comparison between these models was found; the claim needs evidence from comparable projects", correct: true, explanation: "The sources describe models and their purposes, not comparative outcomes." },
        { text: "It is true because the Double Diamond is older", correct: false, explanation: "Age is not evidence of better outcomes." },
        { text: "It is false because design thinking has three lenses", correct: false, explanation: "Having lenses is not evidence of better outcomes either." },
        { text: "It is true because the Design Council says so", correct: false, explanation: "The Design Council's page describes its framework; it does not report a comparison." },
      ],
      explanation: "Treat model-versus-model claims as hypotheses.",
    },
  ],

  flashcards: [
    { id: "design-processes-fc-1", front: "Design process versus process model", back: "The process is what a team does; the model is a description of it, used to teach, plan and coordinate." },
    { id: "design-processes-fc-2", front: "Why use a process (Dubberly)", back: "To reduce risk, set expectations and increase repeatability." },
    { id: "design-processes-fc-3", front: "Shared shape of UX process models", back: "Understand, frame, create, make and test, with iteration." },
    { id: "design-processes-fc-4", front: "Heavy or light process?", back: "Depends on risk, the number of people who must coordinate, and how well the problem is understood." },
  ],

  references: [
    { source: "dubberly-how-do-you-design", role: "primary", note: "Over a hundred process models; why study process; introduction read." },
    { source: "design-council-framework-for-innovation", role: "primary", note: "The Double Diamond, its principles and non-linearity; read." },
    { source: "ideo-design-thinking-process", role: "explanatory", note: "Creating and making choices; seven phases; read in full." },
    { source: "wynn-clarkson-2018", role: "primary", note: "Review of process models in design and development; abstract read." },
    { source: "kimbell-2011", role: "further", note: "Critique of generalised accounts of design; abstract read." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Design process models are professional frameworks. The entry rests on the introduction to Dubberly's compendium and on the Design Council's and IDEO's own descriptions, all read, and on the abstract of an engineering-design review of process models. No study comparing the outcomes of UX process models was read, so the entry makes no claim that any model works better than another.",

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
