import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "evolution-of-digital-experiences",
  slug: "evolution-of-digital-experiences",
  title: "Evolution of Digital Experiences",
  alternateNames: ["History of digital experiences", "From computer use to everyday life", "Changing contexts of use"],
  summary:
    "How the people, places and purposes of computer use changed: from specialists doing calculations at work to everybody, at home and on the move, choosing technology for entertainment, connection and meaning as well as productivity.",
  definition:
    "The **evolution of digital experiences** describes how the users, settings and purposes of interactive technology changed over time, rather than how interfaces are operated. Nielsen's generations trace users from experts and technocrats to specialised groups without computer knowledge, to business professionals, and then to 'everybody' {{src:nielsen-1993-noncommand}}. Bødker describes technology spreading from the workplace into homes, everyday life and culture {{src:bodker-2006}}, and Hassenzahl and Tractinsky describe products becoming not only useful and usable but things people desire {{src:hassenzahl-tractinsky-2006}}.",
  primaryType: "historical-contribution",
  secondaryTypes: [],
  domain: "foundations",
  subcategory: "history-ethics",
  tags: ["history", "context of use", "discretionary use", "third wave", "everyday life", "experience"],
  difficulty: "intermediate",
  disciplines: ["Human-computer interaction", "User experience", "History of computing"],
  learningObjectives: [
    "Describe how the users of computers changed from specialists to everybody, and what each group used computers for.",
    "Explain the shift from work tools to discretionary, everyday use, using Grudin's and Bødker's accounts.",
    "Connect that shift to the rise of user experience and experience design.",
    "Explain why design priorities differ when use is mandated at work versus chosen freely, and apply that to a current product.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Computers were once used by a few specialists in computer centres. Today almost everyone carries one in a pocket. That change is not only about technology; it changed **who** uses computers, **where**, and **why**, and so what designers have to care about.",
        "Nielsen's table of generations shows the users changing: experts and pioneers; then technocrats and professional programmers; then specialised groups without computer knowledge, such as bank tellers; then business professionals and hobbyists with personal computers; and, he predicted in 1993, everybody {{src:nielsen-1993-noncommand}}. The image of the computer changed too: from calculator to information processor, to a tool for personal productivity, to entertainment {{src:nielsen-1993-noncommand}}.",
        "As technology moved from the workplace into homes, everyday life and culture {{src:bodker-2006}}, people started choosing products for how they felt and what they said about them, not only for what they did {{src:hassenzahl-tractinsky-2006}}.",
      ],
      analogy:
        "Cars began as machines for enthusiasts and professional drivers. When everybody drove, comfort, safety, style and what a car said about its owner started to matter as much as the engine. Computers went through a similar change.",
      everydayExamples: [
        "A 1970s bank teller using a mandatory terminal, versus a customer choosing a banking app today.",
        "A photo-sharing app chosen for staying in touch with family rather than for any work task.",
        "A game, a streaming service or a fitness tracker, all forms of computer use that no employer requires.",
      ],
      vocabulary: [
        { term: "Context of use", meaning: "Who is using a product, for what, and in what setting." },
        { term: "Discretionary use", meaning: "Use that people choose freely, rather than use their job requires." },
        { term: "Third wave", meaning: "Bødker's term for HCI's turn to homes, everyday life and culture after a focus on work." },
        { term: "Experiential", meaning: "Concerned with what people live through and feel, not only with what they get done." },
      ],
    },
    intermediate: {
      explanation: [
        "**From mandated to chosen use.** Grudin traces three HCI research foci: computer operation, the management of information systems, and discretionary use {{src:grudin-2005}}. When people choose whether to use a product, ease of learning, appeal and fit with their lives matter in ways they do not for a system an employer requires.",
        "**From work to everyday life.** Bødker describes a third wave of HCI in which use contexts and application types broaden and mix, and technology spreads from the workplace to homes, everyday life and culture; she names multiplicity, context, boundaries, experience and participation as the challenges this raises {{src:bodker-2006}}.",
        "**From tools to experiences.** Hassenzahl and Tractinsky write that as technology matured, interactive products became fashionable things to desire as well as useful and usable, and that a view of products as tools no longer captured how they were used {{src:hassenzahl-tractinsky-2006}}. Hassenzahl relates this to a wider shift from the material to the experiential, citing research that experiential purchases make people happier than material ones {{src:hassenzahl-ux-experience-design}}. This is the background to [[user-experience]] and [[experience-design]].",
        "**From desk to pocket.** Most people met multi-touch only with the 2007 launches of the iPhone and Microsoft Surface {{src:buxton-multitouch}}, which put computing into everyday situations away from a desk.",
      ],
      howItWorks: [
        "**Specialists** used computers for calculation and data processing in computer centres {{src:nielsen-1993-noncommand}}.",
        "**Workers without computer knowledge** used terminals in organisations, for example in banks {{src:nielsen-1993-noncommand}}.",
        "**Individuals** used personal computers as productivity tools {{src:nielsen-1993-noncommand}}.",
        "**Everybody**, at home and in everyday life, uses technology by choice, for entertainment, connection and meaning as well as work {{src:nielsen-1993-noncommand}} {{src:bodker-2006}}.",
      ],
      implementation: [
        "Ask whether your users must use the product or choose to; chosen use raises the importance of learnability and appeal.",
        "Design for the setting, not only the task: home, street and workplace make different demands {{src:bodker-2006}}.",
        "Include experience and meaning in research, not only task success {{src:hassenzahl-tractinsky-2006}}.",
      ],
      scenarios: [
        "Illustrative scenario: an internal expenses tool, which staff must use, is redesigned as a consumer-style app. Adoption is not the problem, since use is mandatory; speed for frequent users is. The team prioritises efficiency over delight.",
        "Illustrative scenario: a public service moves online. Unlike staff, citizens use it rarely, by choice and on phones; the team designs for first-time, occasional use.",
      ],
    },
    advanced: {
      explanation: [
        "The accounts used here are interpretive. Grudin's three faces are research communities, not periods {{src:grudin-2005}}; Bødker's waves are a framing of theory against new challenges {{src:bodker-2006}}; Nielsen's generations are approximate and his fifth was a 1993 forecast {{src:nielsen-1993-noncommand}}. Together they describe a broad direction, not a sequence in which each stage replaced the last: work systems, mandatory use and specialist tools still exist alongside everyday consumer technology.",
        "The shift matters for design because it changes what counts as success. When use is mandated, efficiency and error rates dominate; when use is chosen and personal, learnability, appeal, meaning and fit with everyday life matter as well, which is why [[usefulness]], [[desirability]] and [[user-experience]] became central concerns.",
      ],
      evidence: [
        "A historical analysis identifies three HCI research foci, ending with discretionary use, and the forces that kept them apart {{src:grudin-2005}}. Abstract only.",
        "A survey of HCI theory describes the third wave's broadening of use contexts from work to homes, everyday life and culture {{src:bodker-2006}}. Abstract only.",
        "A table of generations records the change in user types from experts to everybody, with the dates approximate {{src:nielsen-1993-noncommand}}.",
      ],
      debates: [
        "**Waves or coexistence?** Framing history as waves can suggest that earlier concerns were left behind; Bødker herself discusses where second-wave theory can still contribute {{src:bodker-2006}}.",
        "**Whose evolution?** These accounts come mostly from Western research and industry; access to and use of technology have spread unevenly, so 'everybody' describes a direction, not a fact about every country or group.",
      ],
      alternativeModels: [
        "[[history-of-interface-design|The history of interface design]], which follows how people operate computers.",
        "[[human-computer-interaction|The history of HCI as a field]], with its waves and paradigms.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Jonathan Grudin", "Susanne Bødker", "Marc Hassenzahl", "Noam Tractinsky"],
    period: "From computer centres in the 1950s to everyday and mobile use after 2007",
    problem:
      "Design methods developed for specialists and work systems did not cover people who choose technology freely, in their homes and everyday lives {{src:bodker-2006}}.",
    narrative: [
      "In 1993 Nielsen tabulated generations of computers, users and interfaces, ending with a forecast that 'everybody' would be a user {{src:nielsen-1993-noncommand}}.",
      "In 2005 Grudin traced HCI's three research foci, including discretionary use {{src:grudin-2005}}; in 2006 Bødker described the third wave {{src:bodker-2006}} and Hassenzahl and Tractinsky the move to user experience {{src:hassenzahl-tractinsky-2006}}.",
    ],
    attributionNote:
      "Grudin's, Bødker's and Hassenzahl and Tractinsky's papers were read as abstracts; Nielsen's table and Hassenzahl's chapter were read. The direction described is broad, and the sources are mainly Western.",
  },

  application: {
    summary: [
      "Use the history to place a product: who uses it, whether by choice, and in what setting. Each answer changes the design priorities.",
    ],
    web: [
      "Public websites serve occasional, voluntary visitors; design for first-time use.",
    ],
    mobile: [
      "Design for use in the street, at home and in short moments, not only at a desk {{src:buxton-multitouch}}.",
    ],
    enterprise: [
      "Mandatory work systems still exist; prioritise efficiency for frequent users while borrowing what helps from consumer design.",
    ],
    services: [
      "A service may span mandated and chosen use, for example staff tools and a public app; design each for its context.",
    ],
    steps: [
      "Identify the users and whether use is mandated or chosen.",
      "Identify the settings of use.",
      "Decide which qualities matter most: efficiency, learnability, appeal, meaning.",
      "Research and evaluate those qualities.",
    ],
  },

  whenToUse: [
    "Explaining why user experience became a central concern.",
    "Deciding design priorities for mandated versus chosen use.",
    "Placing a product in its context of use.",
  ],
  whenNotToUse: [
    "As proof that work systems no longer matter, or that every product must entertain.",
    "As a precise chronology; the accounts are interpretive and approximate.",
  ],
  advantages: [
    "Explains the rise of UX, usefulness and desirability as design concerns.",
    "Separates who and why from how, complementing interface history.",
    "Gives a practical question for every project: is use chosen or mandated?",
  ],
  limitations: [
    "Rests on interpretive accounts, three of them read as abstracts.",
    "Sources are mainly Western; global access to technology is uneven.",
    "Developments after 2007 are only outlined.",
  ],
  misconceptions: [
    {
      myth: "Each stage replaced the one before it.",
      reality: "Work systems and mandatory use still exist; Bødker discusses where earlier theory still contributes {{src:bodker-2006}}.",
    },
    {
      myth: "This is the same as the history of interfaces.",
      reality: "Interface history follows how people operate computers; this follows who uses them, where and why.",
    },
    {
      myth: "'Everybody' became a user at once.",
      reality: "Nielsen's 'everybody' was a 1993 forecast for the next generation, and his dates are approximate {{src:nielsen-1993-noncommand}}.",
    },
  ],

  relations: [
    { target: "history-of-interface-design", type: "complementary-to", note: "Interface history follows how people operate computers; this entry follows who uses them, where and why." },
    { target: "human-computer-interaction", type: "related-to", note: "HCI's research communities and waves followed the spread of use from work to everyday life." },
    { target: "user-experience", type: "related-to", note: "The move from tools to everyday, chosen use is the background to user experience as a concern." },
    { target: "experience-design", type: "related-to", note: "Experience design responds to the shift from the material to the experiential." },
    { target: "desirability", type: "related-to", note: "When use is chosen, whether people want a product matters as well as whether it works." },
  ],

  exercises: [
    {
      id: "evolution-of-digital-experiences-ex-place",
      kind: "critique",
      level: "beginner",
      title: "Place three products",
      prompt: [
        "Choose a work system, a public service and a consumer app. For each, say who uses it, whether by choice, and where.",
        "Say which design quality matters most for each and why.",
      ],
      deliverable: "Three short profiles.",
      criteria: ["Distinguishes mandated from chosen use", "Links priorities to context"],
    },
    {
      id: "evolution-of-digital-experiences-ex-then-now",
      kind: "assignment",
      level: "intermediate",
      title: "Then and now",
      prompt: [
        "Compare a 1975 bank teller's terminal with a banking app today: who uses each, where, why, and what success means.",
        "Use Nielsen's generations and Bødker's third wave in your answer.",
      ],
      deliverable: "A one-page comparison.",
      criteria: ["Uses both sources accurately", "Explains changes in priorities"],
    },
    {
      id: "evolution-of-digital-experiences-ex-critique",
      kind: "reflection",
      level: "advanced",
      title: "Whose evolution?",
      prompt: [
        "The accounts used here describe a shift to 'everybody'. Discuss who is still left out, how that would change design priorities, and what sources you would want to read to tell a fuller story.",
      ],
      criteria: ["Identifies limits of the sources", "Connects inclusion to design priorities", "Proposes concrete further sources or research"],
    },
  ],

  quiz: [
    {
      id: "evolution-of-digital-experiences-q-users",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In Nielsen's table, which group were the typical users of the 1965-1980 generation?",
      options: [
        { text: "Specialised groups without computer knowledge, such as bank tellers", correct: true, explanation: "Timesharing terminals brought computers to such workers." },
        { text: "Everybody", correct: false, explanation: "That was his forecast for the generation after 1996." },
        { text: "The inventors themselves", correct: false, explanation: "That describes pre-history, before 1945." },
        { text: "Teenage gamers", correct: false, explanation: "Entertainment was the image of his forecast fifth generation." },
      ],
      explanation: "The users widened generation by generation.",
    },
    {
      id: "evolution-of-digital-experiences-q-discretionary",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What does 'discretionary use' mean?",
      options: [
        { text: "Use that people choose freely rather than use their job requires", correct: true, explanation: "One of Grudin's three HCI research foci." },
        { text: "Use that is kept secret", correct: false, explanation: "Discretion here means choice, not secrecy." },
        { text: "Use by computer specialists only", correct: false, explanation: "That describes computer operation, another focus." },
        { text: "Use that is free of charge", correct: false, explanation: "It concerns choice, not price." },
      ],
      explanation: "Chosen use changes what designers must care about.",
    },
    {
      id: "evolution-of-digital-experiences-q-third-wave",
      kind: "scenario",
      level: "intermediate",
      prompt: "A team designs a smart-home app that several family members share. Which concern from Bødker's third wave is most relevant?",
      options: [
        { text: "Multiplicity and context: many users, settings and purposes mixed in everyday life", correct: true, explanation: "The third wave broadens and mixes use contexts beyond work." },
        { text: "Batch processing of punched cards", correct: false, explanation: "That belongs to early computing." },
        { text: "Mechanising white-collar labour", correct: false, explanation: "That was the image of 1965-1980 work systems." },
        { text: "Computer operation by specialists", correct: false, explanation: "Family members are not specialists." },
      ],
      explanation: "Everyday technology is shared, situated and mixed.",
    },
    {
      id: "evolution-of-digital-experiences-q-claim",
      kind: "critique",
      level: "advanced",
      prompt: "Someone claims: 'Today everyone uses technology by choice, so efficiency no longer matters.' Which response is best supported?",
      options: [
        { text: "Mandated work systems still exist and need efficiency; the shift to chosen use added concerns rather than replacing old ones", correct: true, explanation: "The accounts describe a broadening, not a replacement." },
        { text: "Correct: efficiency is obsolete", correct: false, explanation: "Frequent work tasks still depend on efficiency." },
        { text: "Wrong: nobody uses technology by choice", correct: false, explanation: "Discretionary use is well documented." },
        { text: "Correct, because Nielsen predicted it in 1993", correct: false, explanation: "A forecast is not evidence that efficiency stopped mattering." },
      ],
      explanation: "Add concerns; do not discard old ones.",
    },
  ],

  flashcards: [
    { id: "evolution-of-digital-experiences-fc-1", front: "Nielsen's user types by generation", back: "Experts and pioneers; technocrats; specialised groups without computer knowledge; business professionals and hobbyists; everybody (forecast)." },
    { id: "evolution-of-digital-experiences-fc-2", front: "Grudin's three faces of HCI", back: "Computer operation, information systems management, discretionary use." },
    { id: "evolution-of-digital-experiences-fc-3", front: "Bødker's third wave", back: "Use contexts broaden and mix; technology spreads from work to homes, everyday life and culture." },
    { id: "evolution-of-digital-experiences-fc-4", front: "Mandated versus chosen use", back: "Mandated use puts efficiency first; chosen use adds learnability, appeal and meaning." },
  ],

  references: [
    { source: "nielsen-1993-noncommand", role: "primary", note: "User types and images of the computer by generation; table read." },
    { source: "grudin-2005", role: "primary", note: "Three faces of HCI, including discretionary use; abstract read." },
    { source: "bodker-2006", role: "primary", note: "The third wave; abstract read." },
    { source: "hassenzahl-tractinsky-2006", role: "primary", note: "From tools to things to desire; abstract read." },
    { source: "hassenzahl-ux-experience-design", role: "explanatory", note: "The material-to-experiential shift; read in full." },
    { source: "buxton-multitouch", role: "explanatory", note: "Multi-touch reaching the public in 2007; preamble read." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "This is a history entry built on interpretive accounts: Grudin's three faces of HCI, Bødker's third wave and Hassenzahl and Tractinsky's research agenda (abstracts), and Nielsen's table of generations and Hassenzahl's chapter (read). The accounts describe a broad direction from specialist, mandated use to chosen, everyday use; they are mainly Western and approximate, and the entry does not claim that later stages replaced earlier ones.",

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
