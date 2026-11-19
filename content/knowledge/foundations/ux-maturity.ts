import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "ux-maturity",
  slug: "ux-maturity",
  title: "UX Maturity",
  alternateNames: ["UX maturity model", "User experience maturity", "Organisational UX maturity"],
  summary:
    "How fully an organisation wants and is able to do user-centred design, from ignoring UX to letting user research drive strategy. Maturity models describe stages and factors; they help diagnose, not prove.",
  definition:
    "**UX maturity** is an organisation's desire and ability to deliver user-centred design successfully: the quality and consistency of its research and design processes, resources and tools, and its leadership, workforce and culture's support for UX {{src:nng-ux-maturity-model}}. **UX maturity models** describe it as a series of stages. Nielsen Norman Group's model has six, from *absent* to *user-driven*, and four reinforcing factors: strategy, culture, process and outcomes {{src:nng-ux-maturity-model}}. Other models exist {{src:chapman-plewes-2014}}.",
  primaryType: "concept",
  secondaryTypes: [],
  domain: "foundations",
  subcategory: "core-concepts",
  tags: ["organisation", "UX strategy", "culture", "DesignOps", "maturity model", "change"],
  difficulty: "intermediate",
  disciplines: ["UX leadership", "Organisational change", "DesignOps", "Product management"],
  learningObjectives: [
    "Define UX maturity and name the six stages and four factors of the NN/g model.",
    "Place an organisation at a stage from evidence about its strategy, culture, process and outcomes, rather than from one team's practice.",
    "Recommend the next realistic step for an organisation at a given stage.",
    "Judge what a maturity assessment can and cannot show, including the limits of self-report and of unvalidated models.",
  ],
  prerequisites: ["user-centred-design"],

  levels: {
    beginner: {
      explanation: [
        "Two companies can employ equally good designers and get very different results. In one, research findings change what gets built; in the other, designers are brought in at the end to 'make it look nice'. **UX maturity** describes that difference: how much an organisation wants, and is able, to put users at the centre of its work.",
        "Nielsen Norman Group's model describes six stages {{src:nng-ux-maturity-model}}: **absent** (UX is ignored), **limited** (rare and haphazard), **emergent** (functional but inconsistent), **structured** (a semi-systematic method across the organisation), **integrated** (comprehensive, effective and pervasive) and **user-driven** (dedication to UX at every level drives strategy).",
        "Maturity is about the whole organisation, not one team. A single excellent team inside a company that ignores UX does not make the company mature {{src:nng-ux-maturity-model}}.",
      ],
      analogy:
        "A football club is more than its best player. Its maturity shows in the youth academy, the coaching, the medical team and whether the owners invest in them. One star cannot make the club mature on their own.",
      everydayExamples: [
        "A start-up where one founder insists on talking to customers, but no one else does (limited).",
        "A bank with a central design team and shared process, where UX still loses out when deadlines press (structured).",
        "A company whose leaders track user-centred outcome metrics alongside revenue (integrated).",
      ],
      vocabulary: [
        { term: "UX maturity", meaning: "An organisation's desire and ability to deliver user-centred design successfully." },
        { term: "Maturity model", meaning: "A description of stages an organisation passes through, used to assess where it is." },
        { term: "Strategy (factor)", meaning: "UX leadership, planning and how resources are prioritised." },
        { term: "Culture (factor)", meaning: "UX knowledge across the organisation and how UX careers are supported." },
        { term: "Outcomes (factor)", meaning: "Defining and measuring what UX work achieves." },
      ],
    },
    intermediate: {
      explanation: [
        "**Four factors reinforce each other** {{src:nng-ux-maturity-model}}. *Strategy* covers UX leadership, planning and resource priorities; *culture*, UX knowledge and the growth of practitioners; *process*, the systematic use of research and design methods; *outcomes*, defining and measuring the results of UX work. Knowing good methods does not create a strong UX practice if leaders do not prioritise UX, and belief in UX only becomes action when methods are in place.",
        "**Each stage has typical obstacles** {{src:nng-ux-maturity-model}}. At *absent*, the obstacle is a lack of education about what UX is. At *limited*, it is process: learning methods and building routines; progress comes from showcasing small wins. At *emergent*, teams risk thinking 'we do UX now' while UX is still the first thing cut in trade-offs. At *structured*, where many organisations stay, politics can misallocate effort. At *integrated*, the organisation's key success metrics focus on UX. *User-driven* is rare and hard to sustain.",
        "**Assessment needs several kinds of evidence.** NN/g recommends combining observation and interviews about work practices, analysis of processes, people and tools, review of deliverables and surveys across the organisation; its self-report quiz is only a first step {{src:nng-ux-maturity-model}}.",
      ],
      howItWorks: [
        "Decide the scope: the whole organisation, or one area as a contribution to it {{src:nng-ux-maturity-model}}.",
        "Gather evidence on strategy, culture, process and outcomes from observation, interviews, documents, deliverables and surveys {{src:nng-ux-maturity-model}}.",
        "Place the organisation at the stage the evidence best fits, noting variations between areas.",
        "Identify the obstacles of that stage and choose actions aimed at the next stage only {{src:nng-ux-maturity-model}}.",
        "Reassess periodically; maturity can rise slowly and fall when leadership or priorities change {{src:nng-ux-maturity-model}}.",
      ],
      implementation: [
        "Aim for the next stage, not the top: NN/g advises against expecting to skip a level and says moving up one level can take years {{src:nng-ux-maturity-model}}.",
        "At early stages, build awareness and show small, documented wins {{src:nng-ux-maturity-model}}.",
        "At middle stages, protect UX in trade-offs and establish shared, iterative processes.",
        "At later stages, put user-centred outcome metrics at the top of the organisation {{src:nng-ux-maturity-model}}.",
      ],
      scenarios: [
        "Illustrative scenario: a retailer's UX team is excellent, but marketing and IT run projects without research. An assessment places the organisation at emergent, not at the UX team's level, and the plan focuses on leadership support and shared process.",
        "Illustrative scenario: a public body scores itself as integrated on a quick self-report survey. Interviews show research rarely changes decisions. The team reports the gap between self-report and practice rather than the survey score.",
        "Illustrative scenario: after an acquisition, a once user-driven company replaces its research leads and starts prioritising short-term conversion metrics. Within two years its practice looks structured rather than user-driven.",
      ],
    },
    advanced: {
      explanation: [
        "NN/g's current model revises Jakob Nielsen's 2006 model, which had eight stages; NN/g says the revision reflects changes in the field and its observation of clients and students, and that it will keep refining the model {{src:nng-ux-maturity-model}}. It also merged 'developer-centred UX', a separate stage in the earlier model, into the first stage.",
        "Maturity models are useful for diagnosis and conversation, but they are descriptive frameworks. The sources read here report no validation study of the NN/g model, and other UX maturity models have been published with their own stages {{src:chapman-plewes-2014}}. Comparing scores across models, or treating a stage as a measured quantity, is unwarranted.",
        "NN/g notes a tension at the top of its own model: at the integrated stage UX serves business goals well, while at the user-driven stage it serves users themselves, which NN/g says is not always practical or sustainable {{src:nng-ux-maturity-model}}.",
      ],
      evidence: [
        "The six-stage model is a practitioner framework that NN/g bases on its experience with organisations; no validation study is reported {{src:nng-ux-maturity-model}}.",
        "At least one other UX maturity model has been published in the research literature {{src:chapman-plewes-2014}}. Bibliographic record only; its content was not read.",
      ],
      debates: [
        "**Is 'user-driven' the goal?** NN/g calls integrated the stage most organisations should aim for and says user-driven may not be practical or sustainable {{src:nng-ux-maturity-model}}.",
        "**Self-report or evidence?** Quick quizzes are easy to run but measure perception; NN/g recommends combining several methods for a complete evaluation {{src:nng-ux-maturity-model}}.",
      ],
      alternativeModels: [
        "Nielsen's earlier eight-stage model (2006), which the current NN/g model replaces {{src:nng-ux-maturity-model}}.",
        "Chapman and Plewes's UX maturity model, published in 2014 {{src:chapman-plewes-2014}}.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Kara Pernice", "Sarah Gibbons", "Kate Moran", "Kathryn Whitenton"],
    period: "Nielsen's eight-stage model, 2006; the six-stage NN/g model, 2021",
    problem:
      "Organisations needed a way to assess how well UX was established and what to do next, beyond the skills of individual designers {{src:nng-ux-maturity-model}}.",
    narrative: [
      "In 2006 Jakob Nielsen published one of the earliest UX maturity models, with eight stages {{src:nng-ux-maturity-model}}.",
      "In 2021 NN/g replaced it with six stages and four factors, reflecting changes in UX work, tools and leadership involvement {{src:nng-ux-maturity-model}}. Other models were published in the meantime {{src:chapman-plewes-2014}}.",
    ],
  },

  application: {
    summary: [
      "Use a maturity model to start a conversation about how UX works in an organisation and what to change next, with evidence from several methods.",
    ],
    web: [
      "Check whether research findings actually change the site's roadmap; that is a better sign of maturity than the number of designers.",
    ],
    mobile: [
      "Compare how app and web teams work; inconsistency between teams limits organisational maturity {{src:nng-ux-maturity-model}}.",
    ],
    enterprise: [
      "Look for UX in trade-offs: if UX is the first thing cut under deadline pressure, the organisation is not past emergent {{src:nng-ux-maturity-model}}.",
    ],
    services: [
      "Assess maturity across the whole service, including teams that deliver it offline.",
    ],
    steps: [
      "Agree the scope of the assessment.",
      "Collect evidence on strategy, culture, process and outcomes.",
      "Place the organisation at a stage and note variations.",
      "Choose actions for the next stage only.",
      "Reassess in a year.",
    ],
  },

  whenToUse: [
    "Starting or reviewing a UX strategy for an organisation.",
    "Explaining to leaders why good designers alone do not produce good outcomes.",
    "Choosing realistic next steps for growing a UX practice.",
  ],
  whenNotToUse: [
    "As a precise score to compare organisations or teams across different models.",
    "To judge a single team in isolation as if it were the organisation.",
  ],
  advantages: [
    "Gives a shared vocabulary for organisational UX.",
    "Points to stage-specific obstacles and next steps.",
    "Makes clear that maturity depends on leadership and culture, not only on skills.",
  ],
  limitations: [
    "Practitioner models without published validation in the sources read.",
    "Stage boundaries are judgements, and organisations vary internally.",
    "Self-report measures perception and can overstate maturity.",
  ],
  misconceptions: [
    {
      myth: "Hiring more designers makes an organisation UX-mature.",
      reality: "Maturity also depends on strategy, culture and outcomes; process knowledge does little if leaders do not prioritise UX {{src:nng-ux-maturity-model}}.",
    },
    {
      myth: "One great team means the company is mature.",
      reality: "Maturity is organisational; the highest stages need consistency across teams {{src:nng-ux-maturity-model}}.",
    },
    {
      myth: "Maturity only goes up.",
      reality: "Organisations can slip back when growth, acquisitions or leadership changes shift attention away from users {{src:nng-ux-maturity-model}}.",
    },
  ],

  relations: [
    { target: "user-centred-design", type: "related-to", note: "UX maturity describes how far an organisation is able and willing to practise user-centred design." },
    { target: "ux-lifecycle", type: "related-to", note: "How fully research runs through every lifecycle phase is one sign of maturity." },
    { target: "design-ops", type: "related-to", note: "DesignOps builds the processes, tools and operations that higher maturity depends on." },
    { target: "ux-strategy", type: "related-to", note: "UX strategy sets the leadership and planning that the strategy factor of maturity describes." },
    { target: "design-governance", type: "related-to", note: "Governing shared design decisions, such as a design system, is one structure that supports consistency across teams, a feature of higher maturity." },
  ],

  exercises: [
    {
      id: "ux-maturity-ex-place",
      kind: "critique",
      level: "beginner",
      title: "Place an organisation",
      prompt: [
        "Think of an organisation you know. For each of the four factors (strategy, culture, process, outcomes), write one piece of evidence you have seen.",
        "Place the organisation at one of the six stages and say which evidence decided it.",
      ],
      deliverable: "Four pieces of evidence and a justified stage.",
      criteria: ["Evidence is observable, not a feeling", "Covers all four factors", "Stage fits the evidence"],
    },
    {
      id: "ux-maturity-ex-next",
      kind: "scenario",
      level: "intermediate",
      title: "The next step",
      prompt: [
        "An organisation has a few designers in two departments, some research budgets, and leaders who praise UX but cut it first when deadlines slip.",
        "Place it, name the main obstacle, and propose three actions for the next twelve months aimed at the next stage only.",
      ],
      deliverable: "Stage, obstacle and three actions.",
      criteria: ["Places it at emergent with reasons", "Actions target culture and trade-offs", "Does not aim to jump several stages"],
    },
    {
      id: "ux-maturity-ex-assess",
      kind: "reflection",
      level: "advanced",
      title: "Design a credible assessment",
      prompt: [
        "Design a maturity assessment for a 2,000-person company that leadership will trust. Say which methods you will use, whom you will involve, how you will handle differences between teams, and what you will not claim from the result.",
      ],
      criteria: ["Combines several methods", "Covers the whole organisation", "States limits, including self-report and model validity"],
    },
  ],

  quiz: [
    {
      id: "ux-maturity-q-stages",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which list gives the six stages of NN/g's UX maturity model in order?",
      options: [
        { text: "Absent, limited, emergent, structured, integrated, user-driven", correct: true, explanation: "From UX being ignored to UX driving strategy." },
        { text: "Discovery, alpha, beta, live, retirement", correct: false, explanation: "These are lifecycle phases of a service, not maturity stages." },
        { text: "Empathise, define, ideate, prototype, test", correct: false, explanation: "These are design-thinking modes." },
        { text: "Novice, competent, proficient, expert", correct: false, explanation: "These describe individual skill, not organisational maturity." },
      ],
      explanation: "Maturity stages describe the organisation, not a project.",
    },
    {
      id: "ux-maturity-q-team",
      kind: "scenario",
      level: "beginner",
      prompt: "One product team does excellent research and design, but no other team does any. How mature is the organisation?",
      options: [
        { text: "Low: maturity is organisational, and the highest stages need consistency across teams", correct: true, explanation: "One team cannot carry the organisation." },
        { text: "User-driven, because of that team", correct: false, explanation: "A single team does not make the organisation mature." },
        { text: "It cannot be judged at all", correct: false, explanation: "It can be judged from evidence across the organisation." },
        { text: "Integrated, because the team's work is high quality", correct: false, explanation: "Integrated means UX is pervasive across almost all teams." },
      ],
      explanation: "Assess the organisation, not its best team.",
    },
    {
      id: "ux-maturity-q-factors",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Leaders say they value UX, but under deadline pressure UX work is always cut first. Which factor most needs attention?",
      options: [
        { text: "Strategy and culture: UX is not prioritised when trade-offs are made", correct: true, explanation: "The obstacle described at emergent stage is UX being the first to go." },
        { text: "Process: the team needs a new research method", correct: false, explanation: "Methods do not help if leaders do not protect UX in trade-offs." },
        { text: "Tools: better prototyping software", correct: false, explanation: "Tools do not change how trade-offs are decided." },
        { text: "None: this is normal at every stage", correct: false, explanation: "It is characteristic of lower stages and an obstacle to progress." },
      ],
      explanation: "Factors reinforce each other; process cannot compensate for strategy.",
    },
    {
      id: "ux-maturity-q-claim",
      kind: "critique",
      level: "advanced",
      prompt: "A consultancy's slide says: 'Our assessment proves you are at stage 4.3 and will reach stage 6 next year.' What is the best critique?",
      options: [
        { text: "Stages are judgements in a practitioner model without reported validation; decimals overstate precision, and NN/g says moving up even one level can take years", correct: true, explanation: "It addresses both the false precision and the unrealistic forecast." },
        { text: "The slide is fine if the survey was large", correct: false, explanation: "Sample size does not make a descriptive stage model a measurement scale." },
        { text: "Stage 6 is the minimum any company should accept", correct: false, explanation: "NN/g calls stage 6 rare and hard to sustain, and recommends integrated as the realistic aim." },
        { text: "Maturity cannot change, so the forecast is wrong", correct: false, explanation: "Maturity can change, slowly, and can also fall." },
      ],
      explanation: "Use maturity models for diagnosis and direction, not measurement.",
    },
  ],

  flashcards: [
    { id: "ux-maturity-fc-1", front: "Six NN/g UX maturity stages", back: "Absent, limited, emergent, structured, integrated, user-driven." },
    { id: "ux-maturity-fc-2", front: "Four maturity factors", back: "Strategy, culture, process, outcomes; they reinforce each other." },
    { id: "ux-maturity-fc-3", front: "Realistic goal", back: "The next stage. Moving up one level can take years; skipping levels is unrealistic (NN/g)." },
    { id: "ux-maturity-fc-4", front: "How to assess maturity", back: "Combine observation and interviews, analysis of processes, people and tools, deliverables and surveys; a quiz is only a first step." },
  ],

  references: [
    { source: "nng-ux-maturity-model", role: "primary", note: "Six stages, four factors, assessment, history; read in full." },
    { source: "chapman-plewes-2014", role: "further", note: "Another published UX maturity model; bibliographic only." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "UX maturity models are practitioner frameworks. The NN/g model, read in full, is based on the firm's experience with organisations and reports no validation study. Another model exists in the research literature but was available only as a bibliographic record. The entry therefore treats stages as judgements for diagnosis, not measurements, and makes no claim that higher maturity causes better products.",

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
