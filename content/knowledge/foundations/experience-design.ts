import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "experience-design",
  slug: "experience-design",
  title: "Experience Design",
  alternateNames: ["XD", "Designing for experience", "Experience-centred design"],
  summary:
    "Designing from the experience a product should create: start with why people do something (their needs, emotions and meaning), then decide what the product does and how it is operated. The product is the means; the experience is the aim.",
  definition:
    "**Experience design** is an approach that starts from the experience a product or service should create and only then decides its functions and form. In Hassenzahl's account, experiences are meaningful, personally encountered events remembered as stories of use, and the fulfilment of psychological needs is what makes them pleasurable. Experience design begins with the **Why** of an activity (the needs, emotions and meaning involved), then determines the **What** (the functionality) and the **How** (the way it is operated) {{src:hassenzahl-ux-experience-design}}.",
  primaryType: "discipline",
  secondaryTypes: [],
  domain: "foundations",
  subcategory: "core-concepts",
  tags: ["experience", "psychological needs", "emotion", "meaning", "why-what-how", "post-materialism"],
  difficulty: "intermediate",
  disciplines: ["Experience design", "Interaction design", "Product design", "Service design"],
  learningObjectives: [
    "Explain experience design as starting from the Why, then the What and the How, and contrast it with designing features first.",
    "Distinguish an experience as a remembered story of use from the moment-by-moment feel of interaction.",
    "Connect experiences to psychological needs such as autonomy, competence and relatedness, citing the evidence for those needs.",
    "Locate experience design relative to user experience, interaction design and product design, without treating the terms as interchangeable.",
  ],
  prerequisites: ["user-experience"],

  levels: {
    beginner: {
      explanation: [
        "Most products are designed from what they do: a phone makes calls and sends messages. Experience design starts somewhere else: from what the person is really trying to live through. A message from a partner far away is not just a text; it is a way of feeling close. Designing for that experience may lead to a different product than designing a better text-message screen {{src:hassenzahl-ux-experience-design}}.",
        "Hassenzahl describes three levels {{src:hassenzahl-ux-experience-design}}. The **Why** is the reason someone does something: the needs, emotions and meaning involved. The **What** is what the product lets them do, its functionality. The **How** is the way they operate it: buttons, menus, touch. Experience design starts with the Why and lets it set the tone for the What and the How.",
        "His example is a wake-up light that brightens gradually before the alarm and then plays birdsong. It is still an alarm clock, but it is designed around how waking up should feel rather than around the alarm function {{src:hassenzahl-ux-experience-design}}.",
      ],
      analogy:
        "A good host plans a dinner party around how the evening should feel (relaxed, generous, full of conversation) and only then chooses the menu and the seating. Planning the menu first and hoping the evening works out is designing the What before the Why.",
      everydayExamples: [
        "A photo app that builds a shared album after a holiday, designed around remembering together rather than storing files.",
        "A fitness tracker that celebrates progress with friends, designed around competence and relatedness rather than step counts.",
        "A banking app that makes saving for a goal feel like progress toward something you care about.",
      ],
      vocabulary: [
        { term: "Experience", meaning: "A meaningful, personally encountered event, remembered as a story of use." },
        { term: "Why, What, How", meaning: "Needs and meaning; functionality; operation. Experience design starts with the Why." },
        { term: "Psychological needs", meaning: "Universal needs, such as autonomy, competence and relatedness, whose fulfilment makes experiences pleasurable." },
        { term: "Moment-by-moment experience", meaning: "How an interaction feels as it happens, as opposed to the remembered story." },
      ],
    },
    intermediate: {
      explanation: [
        "**Experience as story.** Hassenzahl focuses on experiences as meaningful events people live through and remember as stories of use and consumption, distinct from the moment-by-moment feel of an interaction; he notes that remembered experiences tend to improve over time, as small annoyances are forgotten {{src:hassenzahl-ux-experience-design}}. Forlizzi and Battarbee also describe several disciplines' approaches to experience and propose a framework for designing it in interactive systems {{src:forlizzi-battarbee-2004}}.",
        "**Needs make experiences positive.** In Hassenzahl's account, emotions and the fulfilment of universal psychological needs have a central role: need fulfilment is what makes an experience pleasurable {{src:hassenzahl-ux-experience-design}}. Sheldon and colleagues asked people to describe their most satisfying events and rate ten candidate needs; autonomy, competence and relatedness were consistently among the top four, with self-esteem also important, across three studies and in US and South Korean samples {{src:sheldon-2001}}.",
        "**Where it sits.** Hassenzahl calls the How the typical realm of the interaction designer, making given functionality accessible in a pleasing way {{src:hassenzahl-ux-experience-design}}. Experience design adds the Why and lets it shape the What. Seen this way, [[interaction-design-discipline|interaction design]] and [[ui-design|UI design]] work mainly on the How, while experience design asks which experience the product should create in the first place.",
      ],
      howItWorks: [
        "**Study the Why.** Find the needs, emotions and meanings in the activity, for example through interviews about memorable episodes {{src:hassenzahl-ux-experience-design}}.",
        "**Name the experience.** Describe the intended experience as a short story, including the needs it should fulfil.",
        "**Derive the What.** Decide which functions can create that experience, rather than starting from the technology {{src:hassenzahl-ux-experience-design}}.",
        "**Shape the How.** Design how people operate those functions so that the operation supports the story, not only efficiency.",
        "**Check the story.** Ask people afterwards how the experience felt and what it meant, not only whether tasks succeeded.",
      ],
      implementation: [
        "Write the intended experience before the feature list, and test features against it.",
        "Use psychological needs as a checklist of possible Whys: does the product support autonomy, competence or relatedness?",
        "Collect stories of use in research, not only task metrics.",
        "Keep usability work: a meaningful experience still needs functions people can operate.",
      ],
      scenarios: [
        "Illustrative scenario: a team designing a messaging feature for grandparents and grandchildren starts from the need to feel close. They add a daily shared photo prompt instead of more chat features.",
        "Illustrative scenario: a bank finds that customers' memorable savings stories are about reaching a goal together with family. It designs shared goals with celebration moments, and measures how people describe the experience as well as how much they save.",
        "Illustrative scenario: a product team adds 'delight' animations to an expense app. Interviews show the real need is feeling in control at month end, so they redesign the summary first.",
      ],
    },
    advanced: {
      explanation: [
        "Hassenzahl frames experience design against a cultural shift from the material to the experiential. He cites studies by van Boven and colleagues finding that experiential purchases make people happier than material ones, and books such as *The Experience Economy* as signs that business recognised the shift while struggling to act on it {{src:hassenzahl-ux-experience-design}}. These are claims he makes with citations; the underlying studies were not read here.",
        "The approach reached HCI as part of the wider move that Hassenzahl and Tractinsky describe, away from a narrow view of interactive products as tools toward user experience {{src:hassenzahl-tractinsky-2006}}. Experience design is one way of acting on that move in design practice; [[user-experience]] is the broader field and quality.",
      ],
      evidence: [
        "In three studies, autonomy, competence and relatedness were consistently among the top four needs associated with people's most satisfying events {{src:sheldon-2001}}. Abstract only.",
        "A design-research framework for understanding experience in interactive systems was proposed for multidisciplinary teams {{src:forlizzi-battarbee-2004}}. Abstract only.",
        "Hassenzahl's Why-What-How model is a conceptual model for design, illustrated with examples rather than tested as a predictive theory {{src:hassenzahl-ux-experience-design}}.",
      ],
      debates: [
        "**Moment or story?** Some designers treat experience as how an action feels as it happens; Hassenzahl argues that this narrow view does not do justice to experience as a meaningful story {{src:hassenzahl-ux-experience-design}}.",
        "**Too open or too practical?** Hassenzahl argues that most interactive devices are either too practical, producing uninspiring stories, or too open-ended, leaving people to invent meaning from bare functions {{src:hassenzahl-ux-experience-design}}. Others see clear functionality as a virtue; the tension is real and context-dependent.",
        "**Can experiences be designed?** Experiences happen in people, not in products, so a designer can shape and invite an experience but not guarantee it.",
      ],
      alternativeModels: [
        "[[user-experience|User experience]] as the broader field and quality, including pragmatic and hedonic qualities.",
        "[[interaction-design-discipline|Interaction design]], which Hassenzahl places mainly at the How.",
        "Forlizzi and Battarbee's framework for designing experience in interactive systems {{src:forlizzi-battarbee-2004}}.",
      ],
    },
  },

  origin: {
    contributors: ["Marc Hassenzahl", "Jodi Forlizzi", "Katja Battarbee", "Noam Tractinsky"],
    period: "Research on experience in interactive systems from the early 2000s; Hassenzahl's book, 2010",
    problem:
      "Designing products from their functions and technology left the experiences they created, and the needs behind them, to chance {{src:hassenzahl-ux-experience-design}}.",
    narrative: [
      "In 2004 Forlizzi and Battarbee characterised approaches to experience across disciplines and proposed a framework for designing it {{src:forlizzi-battarbee-2004}}.",
      "In 2006 Hassenzahl and Tractinsky set out a research agenda for user experience beyond the product as a tool {{src:hassenzahl-tractinsky-2006}}.",
      "Hassenzahl published a book on experience design in 2010 {{src:hassenzahl-2010}}, and set out his needs-based view, with the Why-What-How model, in an encyclopedia chapter {{src:hassenzahl-ux-experience-design}}.",
    ],
    attributionNote:
      "Hassenzahl's 2010 book was available only as a bibliographic record; the account here comes from his encyclopedia chapter, read in full.",
  },

  application: {
    summary: [
      "Use experience design to decide what a product is for before deciding what it does, and keep usability and accessibility work to make the How work.",
    ],
    web: [
      "Design a donation journey around the feeling of making a difference, not only around payment steps.",
    ],
    mobile: [
      "Design notifications around the experience they create, for example reassurance or connection, not only around engagement.",
    ],
    enterprise: [
      "Find the needs behind work tasks, such as competence and autonomy, and design tools that support them.",
    ],
    services: [
      "Design service moments, such as waiting or arriving, around how they should feel, with staff and products working together.",
    ],
    steps: [
      "Research the Why: needs, emotions, meanings.",
      "Write the intended experience as a story.",
      "Derive the functions that can create it.",
      "Design how they are operated.",
      "Evaluate stories of use as well as task success.",
    ],
  },

  whenToUse: [
    "Designing new products or services where the reason people use them matters as much as the task.",
    "Rethinking a product that works well but feels uninspiring or meaningless.",
    "Aligning a team on what experience a product should create.",
  ],
  whenNotToUse: [
    "As an excuse to skip usability, accessibility or task performance work.",
    "Where people only need a task done quickly and reliably, such as some safety-critical or administrative tasks.",
  ],
  advantages: [
    "Grounds design in people's needs and meanings, not technology.",
    "Gives a clear order of decisions: Why, then What, then How.",
    "Links design to research on psychological needs.",
  ],
  limitations: [
    "Experiences are personal and cannot be guaranteed by design.",
    "The Why-What-How model is conceptual and not a tested predictive theory.",
    "Needs-based claims rest on general research, not on studies of particular products.",
  ],
  misconceptions: [
    {
      myth: "Experience design means adding delight and animation.",
      reality: "It starts from the Why, the needs and meaning of an activity; animation is a How decision that may or may not serve it {{src:hassenzahl-ux-experience-design}}.",
    },
    {
      myth: "Experience design and user experience are the same thing.",
      reality: "User experience is the broader field and the quality of experiences with a product; experience design is an approach to designing that starts from the intended experience {{src:hassenzahl-tractinsky-2006}} {{src:hassenzahl-ux-experience-design}}.",
    },
    {
      myth: "An experience is how an interaction feels at the moment of use.",
      reality: "Hassenzahl distinguishes the moment-by-moment feel from the remembered story of use, and treats the story as what experience design aims at {{src:hassenzahl-ux-experience-design}}.",
    },
  ],

  relations: [
    { target: "user-experience", type: "related-to", note: "User experience is the broader field and quality; experience design is an approach that designs from the intended experience." },
    { target: "interaction-design-discipline", type: "complementary-to", note: "Hassenzahl places interaction design mainly at the How; experience design adds the Why that shapes it." },
    { target: "desirability", type: "related-to", note: "Experiences that fulfil psychological needs are one source of why people want a product." },
    { target: "product-design", type: "related-to", note: "Product design decides what a product is and does; experience design asks first what experience it should create." },
    { target: "self-determination-theory", type: "derived-from", note: "The needs most often used in experience design, autonomy, competence and relatedness, come from self-determination theory." },
  ],

  exercises: [
    {
      id: "experience-design-ex-why",
      kind: "critique",
      level: "beginner",
      title: "Find the Why",
      prompt: [
        "Pick a product you use every day. Describe one memorable episode of using it as a short story.",
        "Name the Why (the need or feeling involved), the What (the function you used) and the How (how you operated it).",
      ],
      deliverable: "A short story and three labelled lines.",
      criteria: ["The Why is a need or meaning, not a function", "What and How are kept separate"],
    },
    {
      id: "experience-design-ex-redesign",
      kind: "assignment",
      level: "intermediate",
      title: "Design from the Why",
      prompt: [
        "Choose a routine activity such as paying a bill or booking a doctor. Interview two people about a memorable time they did it.",
        "Write the intended experience as a three-sentence story, name the need it should fulfil, and propose one change to the What and one to the How.",
      ],
      deliverable: "Interview notes, an experience story and two proposed changes.",
      criteria: ["Story comes from research, not assumption", "Changes follow from the named need", "Usability is not sacrificed"],
    },
    {
      id: "experience-design-ex-claims",
      kind: "reflection",
      level: "advanced",
      title: "What can be claimed?",
      prompt: [
        "A pitch claims that designing for relatedness will 'guarantee' users love a new app.",
        "Explain what the needs research supports, what Hassenzahl's model is and is not, and how you would evaluate the experience the app actually creates.",
      ],
      criteria: ["States the needs evidence accurately", "Treats the model as conceptual", "Proposes evaluation of stories as well as metrics"],
    },
  ],

  quiz: [
    {
      id: "experience-design-q-order",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In Hassenzahl's model, where does experience design start?",
      options: [
        { text: "With the Why: the needs, emotions and meaning of the activity", correct: true, explanation: "The Why then shapes the What and the How." },
        { text: "With the How: buttons, menus and touch", correct: false, explanation: "That is mainly the realm of interaction design." },
        { text: "With the What: the list of features", correct: false, explanation: "Starting from features is what experience design tries to avoid." },
        { text: "With the technology that is available", correct: false, explanation: "Technology is treated as material for the designer, not the starting point." },
      ],
      explanation: "Why, then What, then How.",
    },
    {
      id: "experience-design-q-story",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What does Hassenzahl mean by an experience?",
      options: [
        { text: "A meaningful, personally encountered event remembered as a story of use", correct: true, explanation: "He distinguishes this from the moment-by-moment feel of interaction." },
        { text: "The time it takes to complete a task", correct: false, explanation: "That is an efficiency measure." },
        { text: "The visual style of the interface", correct: false, explanation: "Style is part of the How, not the experience itself." },
        { text: "The number of features a product has", correct: false, explanation: "Features are the What." },
      ],
      explanation: "Experiences are stories, shaped by needs and emotions.",
    },
    {
      id: "experience-design-q-needs",
      kind: "scenario",
      level: "intermediate",
      prompt: "A team wants to know which needs to design for in a new app for families. Which statement is supported by Sheldon and colleagues' studies?",
      options: [
        { text: "Autonomy, competence and relatedness were consistently among the top needs in people's most satisfying events", correct: true, explanation: "Self-esteem was also important; money-luxury and popularity were less so." },
        { text: "Money and luxury were the most satisfying needs", correct: false, explanation: "These were among the less important needs." },
        { text: "Needs differ completely between the US and South Korea", correct: false, explanation: "The basic pattern held in both samples." },
        { text: "Only self-actualisation matters for satisfaction", correct: false, explanation: "Self-actualisation or meaning was among the less important candidates." },
      ],
      explanation: "The research gives a starting list of needs, not a product-specific guarantee.",
    },
    {
      id: "experience-design-q-boundary",
      kind: "critique",
      level: "advanced",
      prompt: "A job advert says: 'Experience designer: you will design buttons, menus and screens.' What is the best critique, using Hassenzahl's model?",
      options: [
        { text: "That describes the How, the typical realm of interaction design; experience design also decides the Why and shapes the What", correct: true, explanation: "The advert collapses experience design into interface work." },
        { text: "The advert is exactly right: experience design is interface design", correct: false, explanation: "Interface work is one level of three." },
        { text: "Experience designers should not touch screens at all", correct: false, explanation: "They shape the How too, in service of the Why." },
        { text: "Experience design only applies to physical products", correct: false, explanation: "The model applies to interactive and physical products alike." },
      ],
      explanation: "Titles vary; the Why-What-How model clarifies what work is actually being asked for.",
    },
  ],

  flashcards: [
    { id: "experience-design-fc-1", front: "Why, What, How (Hassenzahl)", back: "Why: needs, emotions, meaning. What: functionality. How: operation. Experience design starts with the Why." },
    { id: "experience-design-fc-2", front: "Experience (Hassenzahl)", back: "A meaningful, personally encountered event remembered as a story of use." },
    { id: "experience-design-fc-3", front: "Top needs in satisfying events (Sheldon et al. 2001)", back: "Autonomy, competence, relatedness, with self-esteem also important." },
    { id: "experience-design-fc-4", front: "Interaction design in Hassenzahl's model", back: "Mainly the How: making given functionality accessible in a pleasing way." },
  ],

  references: [
    { source: "hassenzahl-ux-experience-design", role: "primary", note: "Experience as story, needs, Why-What-How; read in full." },
    { source: "sheldon-2001", role: "primary", note: "Ten candidate psychological needs; abstract read." },
    { source: "forlizzi-battarbee-2004", role: "primary", note: "Framework for experience in interactive systems; abstract read." },
    { source: "hassenzahl-tractinsky-2006", role: "explanatory", note: "UX beyond the product as a tool; abstract read." },
    { source: "hassenzahl-2010", role: "further", note: "Book-length treatment; bibliographic only." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "The design approach is set out in Hassenzahl's encyclopedia chapter, read in full; its Why-What-How model is conceptual. The empirical support is for its premise that psychological needs make experiences satisfying (Sheldon and colleagues, abstract) and for experience as a subject of design research (Forlizzi and Battarbee; Hassenzahl and Tractinsky, abstracts). The studies Hassenzahl cites on experiential purchases were not read. No study read here shows that designing from the Why produces better products.",

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
