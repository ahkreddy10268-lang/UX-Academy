import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "human-computer-interaction",
  slug: "human-computer-interaction",
  title: "Human-Computer Interaction (HCI)",
  alternateNames: ["HCI", "Human-machine interaction", "Computer-human interaction", "CHI"],
  summary:
    "The discipline that designs, evaluates and builds interactive computing systems for people to use, and studies the phenomena around them: how people perceive, think and act with technology, and what technology does to the way they work and live.",
  definition:
    "**Human-computer interaction (HCI)** is, in the ACM SIGCHI curriculum report's working definition (paraphrased here), a discipline concerned with the design, evaluation and implementation of interactive computing systems for human use, and with the study of the major phenomena surrounding them {{src:hewett-et-al-1992}}. It is both a body of knowledge about people and technology and a set of methods for improving how they fit together. [[user-experience|User experience]] design and [[usability|usability]] practice grew out of it, and many of the models and methods those fields use, from [[keystroke-level-model|task-time models]] to [[gulfs-of-execution-and-evaluation|Norman's gulfs]], originate in HCI research.",
  primaryType: "discipline",
  secondaryTypes: ["concept"],
  domain: "foundations",
  subcategory: "core-concepts",
  tags: ["HCI", "interaction", "human factors", "cognitive models", "paradigms", "history", "design and evaluation"],
  difficulty: "beginner",
  disciplines: ["Computer science", "Psychology", "Design", "Human factors and ergonomics", "Social sciences"],
  learningObjectives: [
    "Define HCI and state what it studies, designs and evaluates, without confusing it with UI design or UX as a job title.",
    "Describe the main shifts in what HCI has treated as its subject, from the individual operator to groups, then to wider contexts and meaning.",
    "Match a study or method to the tradition it comes from (human factors, cognitive modelling, work and participation, experience and meaning).",
    "Recognise that the 'waves' and 'paradigms' are historians' and theorists' framings, and say what they leave out.",
  ],
  prerequisites: ["usability"],

  levels: {
    beginner: {
      explanation: [
        "Human-computer interaction is the study and design of how people use computers, taking 'computer' to mean any interactive technology: a laptop, a phone, a ticket machine, a car dashboard, a smart speaker. HCI asks what makes these things workable, learnable and worthwhile for the people using them, and how to find out.",
        "It combines three questions. How do people perceive, think and act? What can technology do, and what does it cost to build? And what happens when the two meet in a real task, such as paying for shopping, booking a hospital appointment or editing a photo? Answering them takes psychology, computer science and design, and increasingly the social sciences.",
        "HCI is the older and broader field behind much of what is now called UX. A UX designer may run a usability test or reduce clicks in a checkout; those methods and the theories that explain them come from decades of HCI research. The reverse is also true: HCI researchers study questions, such as how a hospital team coordinates around a shared screen, that no single interface design settles.",
      ],
      analogy:
        "Architecture and building physics share a subject, the building, but ask different questions: what should this space feel like, and will it stay standing? HCI sits between the person and the machine in the same way: it covers the design question and the science of why people and technology fit or fail to fit.",
      everydayExamples: [
        "A self-service checkout that people avoid or struggle with raises HCI questions: what do shoppers expect to happen, where do they get stuck, and how would you find out?",
        "A pilot's cockpit display is an HCI problem where errors are costly, and where decades of research on attention and workload apply.",
        "A grandparent learning a video-calling app on a new phone: the learning curve, the vocabulary and the fear of pressing the wrong thing are all HCI subjects.",
      ],
      vocabulary: [
        { term: "Human-computer interaction (HCI)", meaning: "The discipline concerned with designing, evaluating and building interactive computing systems for human use, and studying the phenomena around them." },
        { term: "Interactive system", meaning: "Technology that responds to what a person does: a device, an app, a website, a physical control with software behind it." },
        { term: "Interaction", meaning: "The exchange between a person and a system while they try to get something done: actions, feedback, interpretation and the next action." },
        { term: "Task", meaning: "A goal a person is trying to achieve, such as paying a bill, which an interactive system supports through a series of actions." },
        { term: "Context of use", meaning: "The users, tasks, equipment and environment in which a system is used; the same interface can behave very differently across contexts." },
        { term: "Human factors", meaning: "The older engineering and psychology tradition of fitting equipment to human capabilities, which HCI inherited and extended." },
      ],
    },
    intermediate: {
      explanation: [
        "HCI work usually combines three activities. **Studying people**: perception, memory, attention, motor control and, increasingly, social and cultural context. **Designing technology**: input devices, interaction techniques, interface structures, software. **Evaluating the fit**: measuring or observing people using the technology to see whether it supports their goals. The SIGCHI definition's phrasing, design, evaluation and implementation plus the study of surrounding phenomena, names exactly those strands {{src:hewett-et-al-1992}}.",
        "The field has several distinctive traditions. The **cognitive modelling** tradition treats the user as an information processor and predicts performance: Card, Moran and Newell's book applied information-processing psychology to interface design and produced the Model Human Processor and the GOMS family of models, from which the [[keystroke-level-model|keystroke-level model]] descends, and in which [[fitts-law|Fitts's law]] serves as a model of pointing time {{src:card-moran-newell-1983}}. The **user-centred design** tradition, collected in Norman and Draper's edited volume, treats the person's goals and understanding as the starting point for system design {{src:norman-draper-1986}}. The **direct manipulation** work of Shneiderman describes interfaces where people act on visible objects with immediate feedback {{src:shneiderman-1983}}.",
        "Because HCI sits between disciplines, it is not one community. Grudin's history traces three research foci, computer operation, the management of information systems and discretionary use, that grew up in different fields and have never fully merged {{src:grudin-2005}}. When someone says 'HCI research shows', it helps to ask which of those traditions they mean, what method produced the finding and what kind of user and task it covers.",
      ],
      howItWorks: [
        "**Frame the interaction.** Describe the person, the task, the technology and the context of use, because HCI findings are always about a combination of these.",
        "**Draw on theory and prior evidence.** Perception, memory and motor models predict where a design will be slow or error-prone; field studies explain why a design will or will not be adopted.",
        "**Design and prototype.** Make the interaction concrete enough to try, from paper sketches to working software.",
        "**Evaluate with people.** Use methods that fit the question: controlled experiments and task-time models for performance, observation for how technology fits real work, interviews and diaries for experience over time.",
        "**Feed back.** Evaluation changes the design, and sometimes the theory.",
      ],
      implementation: [
        "Name the tradition behind a method before applying it: a task-time model answers 'how long would an expert take?', a field study answers 'how does this fit the way these people work?'. They are not interchangeable.",
        "Combine predictive and empirical evidence: a model can rule out a slow design cheaply, but only users can show whether people will adopt it.",
        "Read the study's population and task before using its result: many classic findings come from lab tasks with a narrow set of users.",
        "Use the standard vocabulary (task, context of use, feedback, mental model) so findings from different parts of the field can be connected.",
      ],
      scenarios: [
        "A hospital wants to replace a shared ward whiteboard with a display. Timing individual clicks would miss what matters: a field study of how nurses and doctors glance at, annotate and talk around the board is the HCI work that decides whether the display helps. This is a scenario written for illustration, not a reported study.",
        "A team designing a data-entry screen for experts uses a keystroke-level analysis of two layouts, finds one needs fewer operations, and then confirms with a small test with real operators that it also feels acceptable. Prediction narrows the options, observation confirms them.",
      ],
    },
    advanced: {
      explanation: [
        "HCI's subject has been redefined more than once, and historians and theorists describe the shifts in competing ways. Licklider's 1960 paper imagined a close, cooperative coupling between people and computers, a partnership rather than computers as batch processors, long before interactive systems were common {{src:licklider-1960}}. Cognitive HCI in the 1980s took the individual user as an information processor and aimed at predictive models {{src:card-moran-newell-1983}}.",
        "Bødker describes later developments as 'waves'. Second-wave HCI, in her account, is concerned with groups and work settings, with their own theories and methods; third-wave HCI faces broader and more varied use contexts and applications, with questions of experience and participation, and her paper argues that second-wave ideas can still contribute to those challenges rather than being obsolete {{src:bodker-2006}}. Harrison, Sengers and Tatar frame a similar shift in epistemological terms: they describe a third paradigm of HCI that already exists as a cluster of research cutting across topic areas, and argue it should reflect on the limits of its own ways of knowing {{src:harrison-sengers-tatar-2011}}.",
        "These accounts overlap but do not coincide, and neither is a complete history. Grudin's analysis suggests why any single timeline is partial: several communities were studying human-computer interaction with different foci (operating computers, managing information systems, discretionary use). {{src:grudin-2005}}. Vision papers such as Weiser's ubiquitous-computing article set agendas that shaped research long before the technology matched them, but they are agendas, not evidence {{src:weiser-1991}}.",
      ],
      evidence: [
        "The definition of HCI as design, evaluation and implementation plus the study of surrounding phenomena is a curriculum-level working definition from the ACM SIGCHI group, not an empirical finding {{src:hewett-et-al-1992}}.",
        "Cognitive-modelling claims rest on experiments and model validation in specific tasks; the original programme is documented in Card, Moran and Newell {{src:card-moran-newell-1983}}. Their predictions are for expert, error-free performance on routine tasks.",
        "The 'waves' and 'paradigms' are interpretive frameworks drawn from the authors' reading of the literature and practice {{src:bodker-2006}} {{src:harrison-sengers-tatar-2011}}. They organise the field's history; they are not hypotheses that a study can confirm or refute.",
      ],
      debates: [
        "**Science, engineering or design?** HCI borrows from all three. Which counts as its core shapes what counts as a contribution, and different communities answer differently.",
        "**Do the waves replace or accumulate?** Bødker argues that second-wave ideas keep contributing under third-wave conditions {{src:bodker-2006}}; the 'successor science' framing of Harrison and colleagues stresses a different relationship between paradigms {{src:harrison-sengers-tatar-2011}}. Practitioners often use methods from all of them in a single project.",
        "**One field or several?** Grudin's account suggests HCI has never fully consolidated {{src:grudin-2005}}; whether that is a weakness or the field's strength is an open argument.",
      ],
      alternativeModels: [
        "[[human-factors-engineering|Human factors and ergonomics]], the older tradition focused on fitting equipment and work to human capabilities, which HCI extended to interactive software.",
        "[[user-experience|User experience]] as the practice-oriented frame that adds non-instrumental qualities such as beauty and meaning to usability.",
        "[[distributed-cognition|Distributed cognition]] and [[activity-theory|activity theory]] as frameworks that treat the unit of analysis as a person with tools and others, not an individual in isolation.",
      ],
    },
  },

  origin: {
    contributors: ["J. C. R. Licklider", "Stuart K. Card", "Thomas P. Moran", "Allen Newell", "Donald A. Norman", "Stephen W. Draper", "Ben Shneiderman", "Mark Weiser", "Jonathan Grudin", "Susanne Bødker"],
    period: "Vision papers from 1960; cognitive HCI and user-centred design in the 1980s; waves and paradigms analysed from the mid-2000s",
    problem:
      "As computers moved from specialist operators to everyday users, designers needed knowledge about people (perception, memory, action) and methods to design and test interactive systems, which neither computer science nor psychology alone supplied.",
    narrative: [
      "In 1960 Licklider described a cooperative partnership between people and computers, an early statement of why interaction itself needed attention {{src:licklider-1960}}.",
      "Card, Moran and Newell's 1983 book offered a scientific base for interface design built on information-processing psychology, with models for predicting task performance {{src:card-moran-newell-1983}}. Shneiderman's work on direct manipulation {{src:shneiderman-1983}} and the user-centred design volume edited by Norman and Draper {{src:norman-draper-1986}} gave the field design-oriented counterparts.",
      "In 1991 Weiser set out an agenda for computing that fades into everyday life {{src:weiser-1991}}. From the mid-2000s, Grudin, Bødker and Harrison and colleagues wrote historical and theoretical accounts of the field's communities, waves and paradigms {{src:grudin-2005}} {{src:bodker-2006}} {{src:harrison-sengers-tatar-2011}}.",
    ],
    attributionNote:
      "HCI has no single founder and no agreed start date. The people and works listed here are landmarks cited in the sources, not a complete list of contributors; accounts that give one origin story tend to reflect one community's history.",
  },

  application: {
    summary: [
      "HCI is applied whenever a team treats the fit between people and technology as something to study rather than assume: choosing input methods, setting performance targets, testing prototypes, understanding the work a system must fit into. Its methods are the base on which most usability and UX research practice rests.",
    ],
    web: [
      "Use task-based evaluation and predictive models to compare navigation and form designs before building.",
      "Treat the context of use (device, attention, connectivity, expertise) as part of the requirement.",
    ],
    mobile: [
      "Apply motor and perceptual findings to touch targets and gesture design, and check them on real devices in real situations.",
      "Study interruption and one-handed use as normal conditions, not edge cases.",
    ],
    enterprise: [
      "Study the work before the screen: how tasks, people and existing tools fit together, as the second-wave tradition emphasises.",
      "Evaluate with real operators: expert, high-frequency tasks behave differently from walk-up use.",
    ],
    services: [
      "Look across devices, staff, documents and physical settings, because interaction continues beyond a single screen.",
    ],
    steps: [
      "Describe people, tasks, technology and context of use.",
      "Find what existing HCI research says about the perceptual, cognitive, motor and social aspects involved.",
      "Choose methods that fit the question: predictive models, experiments, field observation, interviews.",
      "Design and prototype the interaction.",
      "Evaluate with people in realistic conditions and note the limits of the sample and task.",
      "Revise the design, and record what you learned about the people and context, not only about the interface.",
    ],
  },

  whenToUse: [
    "Grounding design decisions in evidence about how people perceive, think and act, rather than preference.",
    "Choosing an evaluation method that matches the question: performance, fit with work, or experience.",
    "Reading research critically: knowing which tradition a finding comes from and what it covers.",
  ],
  whenNotToUse: [
    "As a synonym for interface styling or for the UX job title; HCI is a research and design discipline, and UX practice is one of its applications.",
    "As a source of universal rules: many classic findings come from lab tasks, specific devices and narrow user groups.",
    "As the only lens: questions of ethics, power and organisational context often need other disciplines alongside HCI.",
  ],
  advantages: [
    "Provides theories, models and methods that make design decisions testable.",
    "Connects knowledge about people with knowledge about technology.",
    "Offers a shared vocabulary across psychology, computing and design.",
  ],
  limitations: [
    "The field has several communities with different methods and standards of evidence, so 'HCI research' is not one body of agreed findings.",
    "Many foundational models describe expert, routine performance in controlled tasks and do not transfer directly to novel, social or emotional situations.",
    "The waves and paradigms are interpretive frameworks and simplify a history in which several traditions ran in parallel.",
    "Technology changes faster than studies are replicated, so findings about specific devices age quickly.",
  ],
  misconceptions: [
    {
      myth: "HCI is the same as UI design.",
      reality: "UI design shapes the interface; HCI also studies people, tasks and contexts, builds theory and evaluates systems, and covers technologies that have no screen.",
    },
    {
      myth: "HCI is only academic and UX is only practice.",
      reality: "Both have researchers and practitioners. UX practice draws heavily on HCI methods; the difference is emphasis, not a boundary.",
    },
    {
      myth: "Each wave of HCI replaced the one before.",
      reality: "Bødker argues that second-wave ideas still contribute to third-wave problems, and working teams routinely combine predictive models, field studies and experience research.",
    },
    {
      myth: "HCI is only about computers on desks.",
      reality: "Its subject is interactive technology of any kind, from phones and cars to shared displays and embedded devices, as early agendas for ubiquitous computing already anticipated.",
    },
  ],

  relations: [
    { target: "user-experience", type: "influences", note: "UX research and practice developed within and from HCI, extending usability toward emotion, meaning and experience over time." },
    { target: "usability", type: "related-to", note: "Usability is HCI's best-known evaluative concept: how well specified users achieve specified goals in a context." },
    { target: "user-centred-design", type: "related-to", note: "User-centred design is the design tradition in HCI that starts from users' goals, tasks and understanding." },
    { target: "keystroke-level-model", type: "derived-from", note: "The keystroke-level model descends from the cognitive-modelling programme of Card, Moran and Newell." },
    { target: "fitts-law", type: "applied-in", note: "Fitts's law became an HCI tool for predicting pointing time with input devices." },
    { target: "gulfs-of-execution-and-evaluation", type: "related-to", note: "Norman's gulfs describe the fit between a person's goals and a system, a core HCI framing of interaction." },
    { target: "direct-manipulation", type: "related-to", note: "Direct manipulation is an influential interaction style described in HCI research." },
    { target: "ui-design", type: "contrasts-with", note: "UI design shapes the interface; HCI studies and evaluates the whole interaction between people and technology." },
    { target: "human-factors-engineering", type: "developed-from", note: "HCI inherited the human-factors goal of fitting technology to human capabilities and extended it to interactive software." },
    { target: "distributed-cognition", type: "complementary-to", note: "Distributed cognition treats a person-with-tools-and-others as the unit of analysis, a perspective HCI adopted for work settings." },
  ],

  exercises: [
    {
      id: "human-computer-interaction-ex-everyday",
      kind: "assignment",
      level: "beginner",
      title: "Find the HCI in an everyday interaction",
      prompt: [
        "Pick a technology you used this week that is not a website: a ticket machine, a smart speaker, a car screen, a self-service checkout. Describe the person, the task, the technology and the context of use. Then write one design question and one human question about it that someone in HCI would ask.",
      ],
      deliverable: "A four-part description (person, task, technology, context) and two questions.",
      criteria: ["Identifies the task from the person's point of view", "Includes the context of use", "Asks both a design question and a human question"],
    },
    {
      id: "human-computer-interaction-ex-traditions",
      kind: "scenario",
      level: "intermediate",
      title: "Place three studies in their traditions",
      prompt: [
        "Three studies are described. A: a research group predicts how long an expert takes to complete a routine task on two interfaces using a task-time model. B: a researcher spends weeks observing how a hospital team coordinates around a shared display. C: a team interviews people over several months about what a wearable device means to them. For each, name the tradition it fits best (cognitive modelling, work and participation, or experience and meaning), say what kind of evidence it produces and name one thing it cannot tell you.",
      ],
      deliverable: "Three short entries: tradition, evidence produced, one limit.",
      criteria: ["Matches each study to a tradition and explains why", "States what each method can and cannot show", "Does not treat the traditions as a ranking"],
      exampleSolution: [
        "A is cognitive modelling: it produces a predicted time for expert, error-free performance, and cannot show whether people will adopt the design or how novices behave. B belongs to the work-and-participation tradition: it produces rich accounts of coordination in a setting, and cannot give a general performance number. C fits experience and meaning: it produces accounts of significance over time, and cannot tell you whether a specific control is quicker to use.",
      ],
    },
    {
      id: "human-computer-interaction-ex-waves",
      kind: "critique",
      level: "advanced",
      title: "Assess the claim that HCI moved on from its early models",
      prompt: [
        "A colleague says: 'Cognitive models like the keystroke-level model are obsolete because HCI has moved into its third wave.' Using the definition of HCI and the sources on waves and paradigms, write a short critique. Say what is right in the claim, what it overlooks and what evidence you would need before agreeing.",
      ],
      deliverable: "A critique of about 200 words that cites at least two of the sources.",
      criteria: ["Distinguishes a framing of history from an empirical finding", "Notes that waves overlap and that earlier methods keep contributing", "States what a decision about using the model should rest on: the question, the task and the users"],
    },
  ],

  quiz: [
    {
      id: "human-computer-interaction-q-definition",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which statement best describes human-computer interaction as a discipline?",
      options: [
        { text: "It is concerned with designing, evaluating and building interactive systems for people to use, and with studying the phenomena around them.", correct: true, explanation: "This paraphrases the ACM SIGCHI working definition: design, evaluation and implementation, plus the study of surrounding phenomena." },
        { text: "It is the visual styling of screens and the choice of colours and fonts.", correct: false, explanation: "Visual styling is part of UI design; HCI is broader and includes studying people and evaluating systems." },
        { text: "It is only the programming of user interfaces.", correct: false, explanation: "Implementation is one strand; design, evaluation and the study of human phenomena are equally part of HCI." },
        { text: "It is the measurement of how fast people click.", correct: false, explanation: "Performance measurement is one method; HCI also covers fit with work, experience and meaning." },
      ],
      explanation: "HCI covers designing, evaluating and implementing interactive systems, and studying the phenomena around them.",
    },
    {
      id: "human-computer-interaction-q-screens",
      kind: "true-false",
      level: "beginner",
      prompt: "HCI is only concerned with software that runs on desktop computers with screens.",
      options: [
        { text: "True", correct: false, explanation: "Its subject is interactive systems of any kind, including phones, vehicles, shared displays and devices embedded in everyday settings." },
        { text: "False", correct: true, explanation: "The field's definition refers to interactive computing systems for human use, and agendas such as ubiquitous computing extend it beyond the desktop." },
      ],
      explanation: "'Computer' in HCI means interactive technology in general, not a particular device.",
    },
    {
      id: "human-computer-interaction-q-model",
      kind: "scenario",
      level: "intermediate",
      prompt: "A team wants to compare two layouts for a routine data-entry task. Without recruiting users yet, they predict each layout's task time for an experienced operator from the sequence of actions it requires. Which HCI tradition does this approach come from?",
      options: [
        { text: "Cognitive modelling, as in the Model Human Processor and GOMS family", correct: true, explanation: "Card, Moran and Newell's programme uses information-processing models to predict performance on routine tasks." },
        { text: "Participatory design workshops", correct: false, explanation: "Participatory design involves users in design decisions; it does not predict task time from action sequences." },
        { text: "Ethnographic fieldwork", correct: false, explanation: "Fieldwork studies how people work in a setting; it does not produce predicted times from a model." },
        { text: "Experience sampling over several months", correct: false, explanation: "Experience sampling gathers reports from people in daily life; it is not a predictive model." },
      ],
      explanation: "Predicting expert task time from action sequences is the cognitive-modelling tradition.",
      revise: "keystroke-level-model",
    },
    {
      id: "human-computer-interaction-q-second-wave",
      kind: "scenario",
      level: "intermediate",
      prompt: "A researcher spends several weeks observing how a nursing team coordinates around a shared display, interested in the group's work practices rather than individuals' task times. In Bødker's account of HCI's waves, which concern does this match most closely?",
      options: [
        { text: "Second wave: groups and work settings", correct: true, explanation: "Bødker associates the second wave with groups in work settings and the theories developed for them." },
        { text: "Third wave: only consumer entertainment", correct: false, explanation: "The third wave concerns broader and more varied use contexts, not only entertainment." },
        { text: "Predicting expert keystroke times", correct: false, explanation: "That is the cognitive-modelling tradition, which takes the individual user as its unit." },
        { text: "Hardware engineering", correct: false, explanation: "The study is about work practice, not about building the device." },
      ],
      explanation: "Observation of group work practice in a setting is characteristic of second-wave concerns.",
    },
    {
      id: "human-computer-interaction-q-grudin",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "According to Grudin's history of HCI, why has the field not fully consolidated?",
      options: [
        { text: "Work on human-computer interaction grew up in several communities with different foci: computer operation, information systems management and discretionary use.", correct: true, explanation: "Grudin examines the origins and evolution of these three foci and the forces that have kept them apart." },
        { text: "Because it has no definition.", correct: false, explanation: "Working definitions exist, such as the SIGCHI curriculum report's; the difficulty is that different communities pursue different aims." },
        { text: "Because psychologists refused to work with computer scientists.", correct: false, explanation: "Grudin's account concerns different research foci and communities, not a refusal to cooperate." },
        { text: "Because all HCI research is done in industry.", correct: false, explanation: "HCI is studied across academia and industry; this does not explain the division Grudin describes." },
      ],
      explanation: "The division comes from separate communities with different subjects and aims.",
    },
    {
      id: "human-computer-interaction-q-waves",
      kind: "true-false",
      level: "advanced",
      prompt: "Bødker argues that third-wave challenges make second-wave ideas obsolete.",
      options: [
        { text: "True", correct: false, explanation: "Her paper argues the opposite: that second-wave ideas can still contribute to third-wave challenges." },
        { text: "False", correct: true, explanation: "She reviews second-wave theory against third-wave challenges and argues earlier ideas still contribute." },
      ],
      explanation: "The waves overlap and earlier ideas keep their use.",
    },
    {
      id: "human-computer-interaction-q-framework",
      kind: "critique",
      level: "advanced",
      prompt: "Which statement about 'waves' and 'paradigms' of HCI is the most defensible?",
      options: [
        { text: "They are interpretive frameworks for organising the field's history and theory, not findings that a study can confirm or refute.", correct: true, explanation: "They come from the authors' reading of the literature and practice, which is why accounts differ." },
        { text: "They are experimentally validated stages that every project must pass through.", correct: false, explanation: "No experiment validates them, and projects routinely combine methods from several traditions." },
        { text: "They prove that earlier models were wrong.", correct: false, explanation: "Later frameworks add questions; they do not by themselves show earlier models are incorrect for the tasks they describe." },
        { text: "They are identical in every account of HCI's history.", correct: false, explanation: "Bødker's waves and Harrison and colleagues' paradigms overlap but are not the same, and Grudin's account differs again." },
      ],
      explanation: "Treat waves and paradigms as lenses on history, and check which account a claim relies on.",
    },
  ],

  flashcards: [
    { id: "human-computer-interaction-fc-1", front: "HCI (SIGCHI working definition, paraphrased)", back: "A discipline concerned with the design, evaluation and implementation of interactive computing systems for human use, and with the study of the major phenomena surrounding them." },
    { id: "human-computer-interaction-fc-2", front: "Cognitive modelling in HCI", back: "Treats the user as an information processor and predicts performance (Card, Moran and Newell 1983): Model Human Processor, GOMS, keystroke-level model." },
    { id: "human-computer-interaction-fc-3", front: "Bødker's second and third waves", back: "Second wave: groups and work settings. Third wave: broader, more varied use contexts, with experience and participation. Second-wave ideas can still contribute." },
    { id: "human-computer-interaction-fc-4", front: "Why 'one HCI' is a simplification (Grudin 2005)", back: "Research on human-computer interaction grew in several communities with different foci: computer operation, information systems management, discretionary use." },
  ],

  references: [
    { source: "hewett-et-al-1992", role: "primary", note: "Working definition of HCI from the ACM SIGCHI curriculum report (paraphrased)." },
    { source: "card-moran-newell-1983", role: "primary", note: "Cognitive modelling tradition: Model Human Processor and GOMS." },
    { source: "norman-draper-1986", role: "primary", note: "User-centred system design perspectives." },
    { source: "licklider-1960", role: "primary", note: "Early vision of cooperative human-computer partnership." },
    { source: "grudin-2005", role: "primary", note: "History of HCI's three research foci and why the field has not fully consolidated." },
    { source: "bodker-2006", role: "primary", note: "Second-wave and third-wave HCI." },
    { source: "harrison-sengers-tatar-2011", role: "primary", note: "Third-paradigm HCI and its epistemology." },
    { source: "shneiderman-1983", role: "primary", note: "Direct manipulation interfaces." },
    { source: "weiser-1991", role: "explanatory", note: "Vision article for ubiquitous computing; an agenda, not a study." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "HCI is an established academic discipline with a working definition in its curriculum literature. Individual traditions rest on different kinds of evidence: cognitive models on experiments and validation in specific tasks, work-oriented studies on field observation, and the waves and paradigms on interpretive analysis of the field's history. The framings are useful for orientation, not testable claims, and accounts of the field's history differ between authors.",

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
  lastVerifiedAt: "2026-11-04",
});
