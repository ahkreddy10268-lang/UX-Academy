import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "jobs-to-be-done",
  slug: "jobs-to-be-done",
  title: "Jobs To Be Done",
  alternateNames: ["JTBD", "Jobs theory", "Jobs-to-be-Done framework"],
  summary:
    "A framework for understanding demand by asking what progress people are trying to make in a given circumstance — the 'job' they hire a product to do — rather than who they are or what features they ask for.",
  definition:
    "**Jobs To Be Done (JTBD)** is a family of innovation and product-strategy frameworks built on the premise that people 'hire' products and services to make progress in particular circumstances. A **job** is that desired progress, with functional, social and emotional dimensions. JTBD shifts analysis from customer attributes and product features to the situation, the struggle and the outcome the customer is pursuing. Two main schools exist: Christensen's demand-side, circumstance-based theory and Ulwick's Outcome-Driven Innovation, which quantifies desired outcomes.",
  primaryType: "framework",
  secondaryTypes: ["theory", "strategy"],
  domain: "frameworks",
  subcategory: "strategy",
  tags: ["JTBD", "product discovery", "innovation", "demand", "outcomes", "switch interview", "ODI"],
  difficulty: "intermediate",
  disciplines: ["Product strategy", "Innovation", "UX research", "Marketing"],
  learningObjectives: [
    "Explain what a 'job' is and why it is more stable than a product or a demographic segment.",
    "Write well-formed job and outcome statements that contain no solution.",
    "Compare the Christensen 'progress' school with Ulwick's Outcome-Driven Innovation.",
    "Assess the evidence base and the risks of JTBD as a research lens.",
  ],
  prerequisites: ["user-centred-design"],

  levels: {
    beginner: {
      explanation: [
        "Jobs To Be Done asks a simple question: **what is this person really trying to get done?** People do not want a drill for its own sake; they want a hole — and really, they want a shelf on the wall and a tidier room. The product is just the thing they 'hire' to make that progress.",
        "This changes how you look at competition and design. If the job is 'keep me entertained on a boring commute', then a podcast app competes with games, books and staring out of the window — not just with other podcast apps.",
        "Jobs stay the same for a long time even as products change. People have needed to 'share news with distant family' for centuries — via letters, phone calls, then messaging apps. Designing around the job, rather than the current product, helps you see better solutions.",
      ],
      analogy:
        "Hiring a person. You do not hire an accountant because of their age or hobbies — you hire them because you need your taxes done correctly, without stress, before the deadline. JTBD treats every product purchase like that kind of hiring decision.",
      everydayExamples: [
        "Someone buys a meal kit not for 'ingredients' but to feel like a capable cook on weeknights without planning.",
        "A small-business owner 'hires' a spreadsheet to track invoices — and 'fires' it when late payments start to hurt.",
        "A parent downloads a learning app to feel less guilty about screen time.",
      ],
      vocabulary: [
        { term: "Job", meaning: "The progress a person is trying to make in a particular situation." },
        { term: "Hire / fire", meaning: "Choosing a product to do a job, or abandoning it for something better." },
        { term: "Circumstance", meaning: "The situation — when, where, with whom, under what pressure — that gives rise to the job." },
        { term: "Functional, social, emotional", meaning: "The practical task, how the person wants to be seen, and how they want to feel." },
        { term: "Desired outcome", meaning: "A measurable way the person judges whether the job was done well." },
      ],
    },
    intermediate: {
      explanation: [
        "Christensen and Raynor introduced the 'job' as a unit of analysis for innovation in *The Innovator's Solution* {{src:christensen-raynor-2003}}. Christensen, Hall, Dillon and Duncan later defined a job as **the progress a person is trying to make in a particular circumstance**, emphasising that circumstance — not customer characteristics — explains choice, and that jobs have functional, social and emotional dimensions {{src:christensen-et-al-2016}}.",
        "A good **job statement** describes progress without naming a solution: 'help me get my family fed with a healthy meal on a busy weeknight' rather than 'order from a recipe app'. Teams often capture situational detail in **job stories** — *When [situation], I want to [motivation], so I can [outcome]* — an alternative to persona-based user stories.",
        "Ulwick's **Outcome-Driven Innovation (ODI)** operationalises jobs quantitatively. The core functional job is broken into steps (a job map), and each step into **desired outcome statements** — typically phrased as a direction, a metric and an object, such as 'minimise the time it takes to confirm a payment has been received'. Customers rate each outcome's importance and current satisfaction, and outcomes that are important but poorly satisfied are prioritised as opportunities {{src:ulwick-2005}}.",
      ],
      howItWorks: [
        "**Qualitative JTBD research** often uses retrospective 'switch' interviews: talk to people who recently started or stopped using a solution and reconstruct the timeline — first thought, passive looking, active looking, deciding, using. Practitioners describe the 'forces of progress': the push of the current situation and pull of the new solution, against anxiety about the new and the habit of the present.",
        "**Quantitative ODI** surveys many customers on dozens of outcome statements. Ulwick's opportunity algorithm is commonly presented as importance plus the amount by which importance exceeds satisfaction, highlighting under-served outcomes; over-served outcomes suggest room for simpler, cheaper offerings.",
      ],
      implementation: [
        "Recruit by recent behaviour (switched in the last 90 days), not demographics.",
        "In interviews, ask for concrete stories ('walk me through the day you decided…'), not opinions about features.",
        "Write job statements free of solutions and technologies; test them by asking 'could this have been true 50 years ago?'",
        "Map competing solutions, including non-consumption and workarounds, for each job.",
        "Translate jobs into design criteria and success metrics, not directly into features.",
      ],
      scenarios: [
        "An accounting SaaS discovers that small firms 'hire' it mainly to avoid embarrassment in front of clients when invoices are wrong — shifting the roadmap towards error prevention over new reports.",
        "A university finds adult learners hire online degrees to change careers without quitting their jobs; competitors include bootcamps and internal promotion, not just other universities.",
      ],
    },
    advanced: {
      explanation: [
        "JTBD is best understood as a **lens on demand**. Its explanatory claim is causal: circumstance and desired progress cause purchase and switching, so understanding them predicts adoption better than correlations with customer attributes. This is a theoretical claim, supported mainly by case studies.",
        "The two major schools differ in ontology and method. **Christensen/Moesta-style JTBD** treats the job as progress in a life context, emphasises emotional and social dimensions, and relies on qualitative narrative interviews. **Ulwick's ODI** treats the job as a stable functional process, decomposes it into measurable outcomes, and uses large-sample surveys and market segmentation by unmet outcomes {{src:ulwick-2005}}. Some practitioners treat them as complementary — qualitative discovery, then quantitative prioritisation.",
        "Methodological risks include retrospective-recall bias in switch interviews, survey fatigue and construct validity issues in long outcome questionnaires, and the interpretive leap from jobs to solutions, which JTBD does not itself provide.",
      ],
      evidence: [
        "Evidence is predominantly case-based and practitioner-reported: published examples from consultancies and companies, plus the authors' own accounts. There is little independent controlled research comparing JTBD-led development with alternatives.",
        "The HBR article and books cited here are tier 2–3 sources that present the framework and illustrative cases; they are not empirical tests of it {{src:christensen-et-al-2016}}.",
      ],
      debates: [
        "**Which JTBD?** The schools disagree on whether a job is primarily functional and measurable (ODI) or contextual progress with emotional and social drivers (Christensen/Moesta). Practitioners frequently talk past each other.",
        "**Attribution.** Ulwick has stated that his outcome-driven work in the 1990s informed the jobs concept; Christensen's writing credits several collaborators. This entry does not adjudicate the history.",
        "**Novelty.** Critics note overlap with older ideas — Levitt's marketing myopia, means–end chains and goal-directed design — and argue JTBD is a reframing rather than a new theory.",
      ],
      alternativeModels: [
        "Persona-based segmentation describes *who* users are; JTBD describes *what situations* drive choice. Many teams combine them.",
        "The [[kano-model|Kano model]] classifies features by satisfaction effect — useful after JTBD has identified the outcomes that matter.",
        "[[opportunity-solution-tree|Opportunity solution trees]] structure discovery from outcomes through opportunities to solution experiments, and can use jobs as opportunities.",
      ],
    },
  },

  origin: {
    contributors: ["Clayton M. Christensen", "Michael E. Raynor", "Anthony W. Ulwick", "Bob Moesta", "Taddy Hall", "Karen Dillon", "David S. Duncan"],
    period: "1990s practice; named in innovation literature from 2003; widely popularised 2016",
    problem:
      "Most new products fail despite extensive customer data. Christensen and colleagues argued that firms segment by the wrong variables — demographics and product categories — instead of the circumstances that cause purchase.",
    narrative: [
      "Christensen and Raynor's 2003 book introduced 'jobs' as the unit of analysis for creating products customers will buy {{src:christensen-raynor-2003}}.",
      "Ulwick published *What Customers Want* in 2005, presenting Outcome-Driven Innovation as a quantitative method for uncovering unmet outcomes {{src:ulwick-2005}}.",
      "In 2016, Christensen, Hall, Dillon and Duncan's HBR article and companion book brought the 'progress in a circumstance' definition to a wide audience {{src:christensen-et-al-2016}}.",
    ],
    attributionNote:
      "Who originated JTBD is disputed between camps. Ulwick, Christensen, Moesta and others have each described contributions. This entry cites only the publications verified in this research session.",
  },

  application: {
    summary: [
      "JTBD is used in discovery to define problems, in strategy to identify competitors and markets, in design to set criteria that are independent of solutions, and in research recruitment to find people at moments of decision.",
    ],
    web: ["Rewrite landing-page messaging around the progress customers seek rather than feature lists."],
    mobile: ["Design onboarding around the job that brought the user to install the app today."],
    enterprise: [
      "Separate the buyer's job (reduce risk and cost) from the user's job (finish the task without errors); both drive adoption.",
    ],
    services: [
      "Map jobs across service touchpoints to find where people 'fire' the service and switch to workarounds.",
    ],
    steps: [
      "Choose a job executor and a focal job.",
      "Interview recent switchers to reconstruct their decision timeline.",
      "Write solution-free job statements with functional, social and emotional dimensions.",
      "For ODI, map the job steps, write outcome statements and survey importance and satisfaction.",
      "Prioritise under-served jobs or outcomes and translate them into design criteria and metrics.",
    ],
  },

  whenToUse: [
    "Early discovery, when the problem and market are not yet well defined.",
    "When a product is losing to unexpected competitors or workarounds.",
    "To reframe feature requests into underlying needs.",
  ],
  whenNotToUse: [
    "As a substitute for usability evaluation of a specific design — JTBD says what to solve, not whether the interface works.",
    "When the team will adopt the vocabulary but skip the research, producing invented jobs.",
    "For highly regulated or mandatory interactions where people cannot choose solutions; 'hiring' is a weaker metaphor there.",
  ],
  advantages: [
    "Stable, solution-free framing that survives technology change.",
    "Reveals non-obvious competitors and non-consumption.",
    "Brings emotional and social motivation into product decisions.",
  ],
  limitations: [
    "Mainly case-based evidence; limited independent validation.",
    "Competing schools and inconsistent terminology cause confusion.",
    "Retrospective interviews are prone to recall and rationalisation bias.",
    "Jobs do not dictate solutions; design and testing are still required.",
  ],
  misconceptions: [
    {
      myth: "JTBD replaces personas and user research.",
      reality:
        "JTBD is a research lens and framing. It still depends on interviews, observation and surveys, and it can coexist with personas that describe who has which jobs.",
    },
    {
      myth: "A job is a task the user performs in your product.",
      reality:
        "A job is the progress the person seeks in their life or work. Tasks in your product are one way of doing it — possibly not the best one.",
    },
    {
      myth: "There is one agreed JTBD method.",
      reality:
        "At least two major schools — Christensen/Moesta's progress-based approach and Ulwick's ODI — differ in definitions and methods.",
    },
  ],

  relations: [
    { target: "outcome-driven-innovation", type: "related-to", note: "ODI is Ulwick's quantitative methodology built on the jobs concept." },
    { target: "product-discovery", type: "applied-in", note: "JTBD is a primary lens for defining problems and opportunities during discovery." },
    { target: "in-depth-interviews", type: "applied-in", note: "Switch interviews are a specialised form of in-depth interview." },
    { target: "user-stories", type: "contrasts-with", note: "Job stories frame requirements by situation and motivation instead of by user role." },
    { target: "kano-model", type: "complementary-to", note: "Kano classifies how features affect satisfaction once JTBD has identified the outcomes that matter." },
    { target: "opportunity-solution-tree", type: "complementary-to", note: "Jobs and unmet outcomes can populate the opportunity layer of an opportunity solution tree." },
    { target: "market-research", type: "contrasts-with", note: "JTBD segments by circumstance and desired progress rather than demographics or product categories." },
  ],

  exercises: [
    {
      id: "jobs-to-be-done-ex-statement",
      kind: "assignment",
      level: "beginner",
      title: "Write solution-free job statements",
      prompt: [
        "Pick three products you bought recently. For each, write a job statement covering the functional, social and emotional dimensions.",
        "Check each statement: does it mention the product or a technology? If so, rewrite it.",
      ],
      criteria: ["No solution named", "All three dimensions present", "Circumstance stated"],
      exampleSolution: [
        "Running shoes — functional: get fit enough to run 5 km before the charity race; social: be seen as someone who keeps commitments; emotional: feel in control of my health again.",
      ],
    },
    {
      id: "jobs-to-be-done-ex-interview",
      kind: "assignment",
      level: "intermediate",
      title: "Run a switch interview",
      prompt: [
        "Interview someone who switched a tool or service, such as a bank or a note-taking app, in the last three months.",
        "Reconstruct the timeline from first thought to first use, and identify push, pull, anxiety and habit forces.",
      ],
      deliverable: "A one-page timeline and forces diagram with direct quotes.",
      criteria: ["Concrete events, not opinions", "All four forces identified", "Ends with a job statement"],
    },
    {
      id: "jobs-to-be-done-ex-compare",
      kind: "critique",
      level: "advanced",
      title: "Compare the two schools",
      prompt: [
        "For a food-delivery service, sketch how a Christensen/Moesta-style team and an ODI team would each run discovery.",
        "Compare their outputs, costs and risks, and recommend a combined approach.",
      ],
      criteria: ["Accurately characterises both schools", "Discusses evidence and bias risks", "Recommendation is justified"],
    },
  ],

  quiz: [
    {
      id: "jobs-to-be-done-q-definition",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In Christensen and colleagues' definition, what is a 'job'?",
      options: [
        { text: "The progress a person is trying to make in a particular circumstance", correct: true, explanation: "This is the 2016 HBR definition; circumstance is central." },
        { text: "A feature a customer requests", correct: false, explanation: "Features are possible solutions, not jobs." },
        { text: "A demographic segment", correct: false, explanation: "JTBD explicitly moves away from demographic segmentation." },
        { text: "A task performed inside the product", correct: false, explanation: "Product tasks are one way to make progress; the job exists independently of the product." },
      ],
      explanation: "A job is desired progress in context, with functional, social and emotional dimensions.",
    },
    {
      id: "jobs-to-be-done-q-statement",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which is the best-formed job statement?",
      options: [
        { text: "Help me keep track of what my team owes clients so nothing slips through before month-end.", correct: true, explanation: "It describes progress and circumstance without naming a solution." },
        { text: "Use a Kanban board to manage invoices.", correct: false, explanation: "This names a solution." },
        { text: "Freelancers aged 25–35 who use Macs.", correct: false, explanation: "This is a demographic description, not a job." },
        { text: "Add a reminders feature to the app.", correct: false, explanation: "This is a feature request." },
      ],
      explanation: "Good job statements are solution-free and situated.",
    },
    {
      id: "jobs-to-be-done-q-odi",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "In Outcome-Driven Innovation, which outcomes are prioritised as the biggest opportunities?",
      options: [
        { text: "Outcomes rated highly important but poorly satisfied by current solutions", correct: true, explanation: "ODI's opportunity algorithm emphasises the gap between importance and satisfaction." },
        { text: "Outcomes with the highest satisfaction", correct: false, explanation: "Highly satisfied outcomes are already well served." },
        { text: "Outcomes most often mentioned in app-store reviews", correct: false, explanation: "Mention frequency is not ODI's prioritisation method." },
        { text: "Outcomes the engineering team finds easiest to build", correct: false, explanation: "Feasibility matters later, but it is not how ODI defines opportunity." },
      ],
      explanation: "ODI looks for under-served outcomes: important and unsatisfied.",
    },
    {
      id: "jobs-to-be-done-q-evidence",
      kind: "true-false",
      level: "advanced",
      prompt: "JTBD has been validated by numerous independent controlled experiments showing it outperforms other discovery approaches.",
      options: [
        { text: "True", correct: false, explanation: "Evidence is largely case studies and practitioner reports; independent controlled comparisons are scarce." },
        { text: "False", correct: true, explanation: "JTBD is best classified as a practitioner framework with case-based support." },
      ],
      explanation: "Classify JTBD's evidence honestly: practitioner recommendation supported by cases.",
    },
  ],

  flashcards: [
    { id: "jobs-to-be-done-fc-job", front: "Job (Christensen et al., 2016)", back: "The progress a person is trying to make in a particular circumstance — functional, social and emotional." },
    { id: "jobs-to-be-done-fc-schools", front: "Two main JTBD schools", back: "Christensen/Moesta (progress, qualitative switch interviews) vs. Ulwick's ODI (job maps, outcome statements, surveys)." },
    { id: "jobs-to-be-done-fc-forces", front: "Forces of progress", back: "Push of the situation + pull of the new solution vs. anxiety about the new + habit of the present." },
  ],

  references: [
    { source: "christensen-raynor-2003", role: "primary", note: "Introduces the job as a unit of analysis." },
    { source: "christensen-et-al-2016", role: "primary", note: "Definition of a job as progress in a circumstance." },
    { source: "ulwick-2005", role: "primary", note: "Outcome-Driven Innovation: job maps, outcome statements, opportunity prioritisation." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "A widely used practitioner framework with theoretical grounding in innovation research and support mainly from case studies by its proponents. It is useful as a discovery lens; claims of superior outcomes are not established by independent controlled research. Details of switch interviews and the forces of progress come from practitioner literature not cited individually here.",

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
