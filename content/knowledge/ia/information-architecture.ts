import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "information-architecture",
  slug: "information-architecture",
  title: "Information Architecture",
  alternateNames: ["IA", "Structural design of information"],
  summary:
    "The structural design of shared information environments: how content is organised, what things are called, how people move through it and how they search it, so that people can find and understand what they need.",
  definition:
    "**Information architecture (IA)** is the practice of structuring shared information environments so that people can find, understand and use what is in them. Rosenfeld, Morville and Arango describe it as the combination of four interdependent systems: **organisation** (how content is grouped), **labelling** (what groups and items are called), **navigation** (how people move between them) and **search** (how people query them). They shape these systems around three things: the **users**, the **content** and the **context** of the organisation and its constraints {{src:rosenfeld-morville-arango-2015}}.",
  primaryType: "discipline",
  secondaryTypes: ["framework"],
  domain: "ia",
  subcategory: "discipline",
  tags: ["findability", "navigation", "labelling", "taxonomy", "search", "information scent", "structure"],
  difficulty: "beginner",
  disciplines: ["Information architecture", "UX design", "Library and information science", "Content strategy"],
  learningObjectives: [
    "Name the four IA systems and give an example of each in a product you use.",
    "Explain why labels are hard to get right, using the vocabulary problem.",
    "Use information scent to diagnose why people fail to find content in a working navigation.",
    "Choose research methods (card sorting, tree testing, search-log analysis) for an IA decision.",
  ],
  prerequisites: ["mental-models"],

  levels: {
    beginner: {
      explanation: [
        "A site with 40 pages can get away with a list. A site with 4,000 cannot: someone has to decide what goes together, what each group is called, how people move between groups and what happens when they search. Those decisions are the information architecture, whether anyone made them deliberately or not.",
        "IA is mostly invisible when it works. You notice it when it fails: when 'Renew a loan' is hidden under 'My services' on one library site and 'Account' on another, or when the search box returns press releases instead of opening hours.",
        "The structure has to fit three things at once: **the people** using it and the words they use, **the content** that actually exists, and **the context**, meaning the organisation's goals, budget and constraints. A structure copied from the org chart usually fits only the last of these.",
      ],
      analogy:
        "A supermarket shows all four systems in one building. Products are grouped into aisles (organisation); signs above the aisles name the groups (labelling); the layout and end-of-aisle displays move you between them (navigation); and asking a staff member where the paprika is works like search. When the paprika is under 'World foods' instead of 'Spices', the signs have failed even though the shelf exists.",
      everydayExamples: [
        "A council website reorganised around tasks residents come to do ('Pay council tax', 'Report a pothole') instead of around departments.",
        "A settings screen that groups options by what people want to change (notifications, privacy, account) rather than by which team built them.",
        "An online shop with filters for size and colour (faceted navigation) as well as a browsing hierarchy of categories.",
      ],
      vocabulary: [
        { term: "Organisation system", meaning: "How content is grouped and ordered: by topic, task, audience, date, alphabet or place." },
        { term: "Labelling system", meaning: "The names given to groups, links, headings and controls." },
        { term: "Navigation system", meaning: "The menus, links, breadcrumbs and paths that move people through the structure." },
        { term: "Search system", meaning: "How people query the content and how results are presented." },
        { term: "Information scent", meaning: "The cues (labels, snippets, images) people use to judge whether a path leads to what they want." },
        { term: "Findability", meaning: "How easily people can locate a specific item, by browsing or by searching." },
      ],
    },
    intermediate: {
      explanation: [
        "**Organisation schemes** come in two kinds. *Exact* schemes (alphabetical, chronological, geographical) divide content into well-defined, mutually exclusive sections and work when people know the exact name of what they want. *Ambiguous* schemes (by topic, task, audience or metaphor) group things by meaning; they are harder to design and maintain but support people who are browsing or do not know the right term {{src:rosenfeld-morville-arango-2015}}.",
        "**Labels are the hardest part**, and there is evidence why. Furnas and colleagues asked people to name objects and commands and found that two people rarely chose the same word; in their studies, a single designer-chosen term would match what another person tried only a small fraction of the time. They called this the *vocabulary problem* and argued for many aliases rather than one 'correct' name {{src:furnas-et-al-1987}}. For IA, that means labels should come from users' language, and search needs synonyms.",
        "**Navigation follows information scent.** Pirolli and Card's information foraging theory models people as choosing among paths by the cues they offer, staying with a path while the cues look promising and abandoning it when they weaken {{src:pirolli-card-1999}}. A menu label is a scent cue. When people click into the wrong section and back out, the label promised something the section did not deliver.",
      ],
      howItWorks: [
        "The four systems depend on each other. A good grouping with poor labels still fails; good labels on an incoherent grouping mislead. Navigation exposes the organisation; search must use the same vocabulary as the labels, or it becomes a second, contradictory structure.",
        "Depth and breadth trade off. A shallow, broad hierarchy shows more choices at once, while a deep, narrow one hides them behind more clicks. Which is better depends on how distinct the labels are and how much scent each one carries, not on a fixed rule such as 'three clicks'.",
        "Most products need more than one way in: a browsing hierarchy for people exploring, faceted filters for people comparing, and search for people who know what they want.",
      ],
      implementation: [
        "Inventory the content before structuring it; you cannot organise what you have not counted.",
        "Collect users' vocabulary from interviews, support tickets and search logs before naming anything.",
        "Use card sorting to see how people group the content, then tree testing to check they can find items in your proposed hierarchy.",
        "Write labels that predict their contents; avoid internal jargon, clever names and catch-alls such as 'Resources' or 'More'.",
        "Give search the synonyms people use, and review zero-result queries regularly.",
        "Plan for growth: decide who owns each category and how new content gets placed.",
      ],
      scenarios: [
        "A university site has separate 'Students', 'Study' and 'Courses' sections. Tree testing shows prospective students split across all three looking for fees; the team merges them under a task label, 'Apply and pay'.",
        "Search logs on an intranet show staff typing 'holiday', 'leave' and 'annual leave' for the same policy; the team adds synonyms and renames the page to the most frequent term.",
      ],
    },
    advanced: {
      explanation: [
        "IA has roots in library and information science (classification, controlled vocabularies, cataloguing) and was shaped for the web by Rosenfeld and Morville's book, first published in 1998 and now in its fourth edition. The fourth edition broadens the scope from websites to cross-channel information environments, such as an app, a website and a physical branch that must share one structure {{src:rosenfeld-morville-arango-2015}}.",
        "Two research strands give the practice its theoretical footing. The **vocabulary problem** explains why naming cannot be left to one person's intuition and why search needs aliases {{src:furnas-et-al-1987}}. **Information foraging theory** explains navigation as cost–benefit decisions guided by scent and gives a vocabulary ('scent', 'patches', 'diet') for analysing why people abandon paths {{src:pirolli-card-1999}}.",
        "The practice itself (the four systems, organisation schemes, the users/content/context model) is a professional framework drawn from experience, not an empirically validated theory. Its methods are what make it testable: card sorting, tree testing, first-click tests and search analytics produce evidence about a particular structure, even though no study validates 'IA' as a whole.",
      ],
      evidence: [
        "Furnas et al. reported low agreement between people's spontaneous terms for the same objects across several naming studies, and showed that allowing many aliases raised the success rate of finding the intended item {{src:furnas-et-al-1987}}.",
        "Information foraging theory is supported by models and studies of how people navigate and allocate effort among information sources {{src:pirolli-card-1999}}; its application to menus and labels in everyday products is mostly practitioner work built on that foundation.",
        "Claims about ideal menu depth, item counts or a 'three-click rule' are not well supported as general rules; findability depends on label quality and scent more than on counts.",
      ],
      debates: [
        "**Browse or search?** Some argue good search makes structure unimportant. In practice, search depends on a labelled, organised content base, and many people browse when they do not know the right term.",
        "**IA as a role or a skill?** Fewer teams hire dedicated information architects; the work is often spread across UX designers, content designers and product managers, which risks nobody owning the structure.",
        "**Static hierarchies versus algorithmic feeds.** Personalised and ranked content reduces the role of fixed navigation in some products, but raises new questions about findability, predictability and transparency.",
      ],
      alternativeModels: [
        "[[card-sorting|Card sorting]] and [[tree-testing|tree testing]] are the research methods most closely tied to IA decisions.",
        "[[information-scent|Information scent]] as a design lens focuses on cue quality along paths rather than on the whole structure.",
        "Content strategy addresses what content should exist and how it is governed, which IA then structures.",
      ],
    },
  },

  origin: {
    contributors: ["Louis Rosenfeld", "Peter Morville", "Jorge Arango", "Peter Pirolli", "Stuart Card", "George Furnas"],
    period: "Library and information science foundations; web IA from the late 1990s; cross-channel IA in the 2010s",
    problem:
      "As websites and intranets grew to thousands of pages, organisations needed a deliberate way to structure and name content so that people could find it, rather than mirroring internal structures.",
    narrative: [
      "Rosenfeld and Morville's book (first edition 1998) codified web information architecture around organisation, labelling, navigation and search systems; the fourth edition, with Arango, extends it to information environments across channels {{src:rosenfeld-morville-arango-2015}}.",
      "Research in HCI supplied explanations for practitioners' observations: the vocabulary problem for labelling {{src:furnas-et-al-1987}} and information foraging for navigation behaviour {{src:pirolli-card-1999}}.",
    ],
    attributionNote:
      "The term 'information architect' is often credited to the architect and designer Richard Saul Wurman in the 1970s; that attribution is not used as evidence here. The web discipline described in this entry follows Rosenfeld, Morville and Arango.",
  },

  application: {
    summary: [
      "IA decisions come first in content-heavy products and redesigns: before visual design, decide what exists, how it is grouped, what it is called and how people will reach it, and test those decisions with users.",
    ],
    web: [
      "Design top-level navigation from users' tasks and words; validate with tree testing.",
      "Keep search vocabulary and navigation labels consistent; add synonyms for common alternative terms.",
    ],
    mobile: [
      "Limit primary navigation to the few destinations people use most; move the rest into clearly labelled secondary structures.",
      "Use search and recent items to shorten deep paths on small screens.",
    ],
    enterprise: [
      "Structure intranets and document stores around work tasks; assign an owner to each category.",
      "Use controlled vocabularies and metadata so documents can be filtered as well as browsed.",
    ],
    services: [
      "Organise public-service information around life events and tasks rather than departments.",
    ],
    steps: [
      "Inventory and audit the content.",
      "Gather users' vocabulary and tasks.",
      "Run open card sorts to explore groupings.",
      "Draft one or more hierarchies and labels.",
      "Tree-test the candidates; revise labels with low success.",
      "Specify navigation and search behaviour together.",
      "Monitor search logs and analytics after launch.",
    ],
  },

  whenToUse: [
    "Designing or restructuring a content-heavy site, app, intranet or help centre.",
    "When people report they 'cannot find' things, or search logs show many failed queries.",
    "Before merging products, websites or channels that each have their own structure.",
  ],
  whenNotToUse: [
    "As a substitute for content strategy: structuring content that should not exist only makes it easier to find the wrong thing.",
    "Expecting a single 'correct' hierarchy for everyone; different audiences may need different entry points.",
    "For decisions about task flows within a single screen; that is interaction design.",
  ],
  advantages: [
    "Makes findability problems diagnosable: grouping, label, navigation or search.",
    "Brings users' language into the product.",
    "Gives teams a shared vocabulary for structural decisions.",
    "Connects to testable methods (card sorting, tree testing, search analytics).",
  ],
  limitations: [
    "The core framework is professional practice rather than an empirically validated theory.",
    "Structures decay as content grows unless someone owns and maintains them.",
    "Card sorts and tree tests evaluate structure out of context, without visual design or real tasks.",
    "One structure rarely suits every audience equally well.",
  ],
  misconceptions: [
    {
      myth: "Information architecture is the sitemap.",
      reality: "A sitemap is one artefact. IA also covers labels, navigation behaviour, search, metadata and how the structure will be maintained.",
    },
    {
      myth: "Everything should be reachable within three clicks.",
      reality: "There is no good evidence for a fixed click limit. People keep clicking while the labels give strong scent; they give up when the cues stop predicting the content.",
    },
    {
      myth: "Good search makes navigation unnecessary.",
      reality: "Search relies on the same vocabulary and organised content, and many people browse when they do not know what to type.",
    },
  ],

  relations: [
    { target: "card-sorting", type: "measured-by", note: "Card sorting reveals how people group content and what they call the groups, informing the organisation and labelling systems." },
    { target: "tree-testing", type: "measured-by", note: "Tree testing measures whether people can find items in a proposed hierarchy, without visual design." },
    { target: "information-scent", type: "related-to", note: "Navigation works when labels carry strong scent toward the content people want." },
    { target: "labelling-systems", type: "related-to", note: "Labelling is one of IA's four systems." },
    { target: "navigation-patterns", type: "applied-in", note: "IA decisions are expressed through global, local and contextual navigation patterns." },
    { target: "taxonomies", type: "related-to", note: "Taxonomies and controlled vocabularies are the organisation system made explicit." },
    { target: "mental-models", type: "derived-from", note: "Structures succeed when they match how users think the content is organised." },
    { target: "recognition-over-recall", type: "complementary-to", note: "Visible, well-labelled navigation lets people recognise their path rather than recall where things are." },
  ],

  exercises: [
    {
      id: "information-architecture-ex-systems",
      kind: "assignment",
      level: "beginner",
      title: "Find the four systems",
      prompt: [
        "Choose a website you use often (a supermarket, bank or university). Identify one example each of its organisation, labelling, navigation and search systems, and note one place where they disagree, for example a menu label that does not match the page title or a search that misses an obvious synonym.",
      ],
      deliverable: "Four annotated screenshots or notes plus one inconsistency.",
      criteria: ["Each system correctly identified", "The inconsistency explains which system fails", "A concrete fix is proposed"],
    },
    {
      id: "information-architecture-ex-scent",
      kind: "scenario",
      level: "intermediate",
      title: "Diagnose a scent failure",
      prompt: [
        "Analytics show that 40% of visitors looking for 'Opening hours' on a library site first click 'Visit', then 'About us', before using search. Explain the likely scent problem, propose two label or structure changes, and describe how you would test them before launch.",
      ],
      deliverable: "A diagnosis, two changes and a test plan.",
      criteria: ["Links behaviour to label cues", "Changes address scent, not just layout", "Proposes tree testing or first-click testing"],
      exampleSolution: [
        "'Visit' and 'About us' both promise practical information, so neither carries clear scent for opening hours. Options: show opening hours on the home page and in the footer, and rename 'Visit' to 'Visit: hours, locations, accessibility'. Tree-test the new labels with the task 'When does the central library close on Saturday?' and compare success and directness with the current tree.",
      ],
    },
    {
      id: "information-architecture-ex-merge",
      kind: "critique",
      level: "advanced",
      title: "Merge two structures",
      prompt: [
        "Two organisations merge, each with a website organised by its own departments. Critique the proposal to keep both department menus side by side, and outline a research plan for a single structure that serves both audiences.",
      ],
      deliverable: "A one-page critique and plan.",
      criteria: ["Explains why department-based structures fail users", "Separates audiences in research", "Includes content inventory, card sorting and tree testing"],
    },
  ],

  quiz: [
    {
      id: "information-architecture-q-systems",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A menu item reads 'Resources' and users cannot guess what is inside. Which IA system is failing most directly?",
      options: [
        { text: "Labelling", correct: true, explanation: "The name does not predict the contents, which is a labelling problem." },
        { text: "Search", correct: false, explanation: "The problem appears while browsing, before any query is typed." },
        { text: "Organisation", correct: false, explanation: "The grouping may be fine; it is the name that gives no scent." },
        { text: "None, because catch-all labels are recommended", correct: false, explanation: "Catch-all labels such as 'Resources' or 'More' usually carry weak scent." },
      ],
      explanation: "Labels are scent cues; vague names make people guess.",
    },
    {
      id: "information-architecture-q-vocabulary",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "What does the vocabulary problem (Furnas et al., 1987) imply for search?",
      options: [
        { text: "Search should recognise many alternative terms for the same item", correct: true, explanation: "Because people rarely pick the same word, aliases raise the chance a query matches." },
        { text: "Designers should choose the single most precise technical term", correct: false, explanation: "One term, however precise, matches only a small share of what people type." },
        { text: "Search is unnecessary if labels are good", correct: false, explanation: "The finding argues the opposite: no single label works for everyone." },
        { text: "Users should be trained to use the official vocabulary", correct: false, explanation: "The aim is to adapt the system to people's words, not the reverse." },
      ],
      explanation: "Low agreement on terms is why synonyms and user vocabulary matter.",
    },
    {
      id: "information-architecture-q-scent",
      kind: "scenario",
      level: "intermediate",
      prompt: "People repeatedly open a section, scan it, and go back. According to information foraging theory, what is most likely happening?",
      options: [
        { text: "The label promised content the section does not deliver, so scent weakens and they abandon the path", correct: true, explanation: "Foraging models people following cues and leaving when the expected gain drops." },
        { text: "The section has too many pages", correct: false, explanation: "Size alone does not explain the backtracking; misleading cues do." },
        { text: "The site is too deep", correct: false, explanation: "Depth matters less than whether each step's cues predict the target." },
        { text: "Users are browsing for fun", correct: false, explanation: "Repeated backtracking on a task usually signals failed cues." },
      ],
      explanation: "Backtracking is the behavioural signature of weak or misleading scent.",
      revise: "information-scent",
    },
    {
      id: "information-architecture-q-three-clicks",
      kind: "true-false",
      level: "advanced",
      prompt: "Well-supported research shows that content must be reachable within three clicks.",
      options: [
        { text: "True", correct: false, explanation: "There is no good evidence for a fixed click limit." },
        { text: "False", correct: true, explanation: "People tolerate more clicks when each label gives strong scent; weak cues fail at any depth." },
      ],
      explanation: "Findability depends on cue quality more than on click counts.",
    },
  ],

  flashcards: [
    { id: "information-architecture-fc-1", front: "IA's four systems (Rosenfeld, Morville & Arango)", back: "Organisation, labelling, navigation, search, designed around users, content and context." },
    { id: "information-architecture-fc-2", front: "The vocabulary problem", back: "People rarely choose the same word for the same thing (Furnas et al., 1987), so labels should come from users and search needs aliases." },
    { id: "information-architecture-fc-3", front: "Information scent", back: "Cues that signal whether a path leads to the target; people follow strong scent and abandon paths when it weakens (Pirolli & Card, 1999)." },
  ],

  references: [
    { source: "rosenfeld-morville-arango-2015", role: "primary", note: "The four systems, organisation schemes and the users/content/context model." },
    { source: "furnas-et-al-1987", role: "primary", note: "The vocabulary problem: low agreement in people's spontaneous terms; aliases improve retrieval." },
    { source: "pirolli-card-1999", role: "primary", note: "Information foraging theory and information scent." },
    { source: "spencer-2009", role: "further", note: "Card sorting as an IA research method." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "The IA framework (four systems; users, content and context) is professional practice codified by Rosenfeld, Morville and Arango, not a validated theory. Two research strands support key parts of it: the vocabulary problem for labelling and search, and information foraging for navigation. Specific structures are made testable through card sorting, tree testing and search analytics; general rules about depth or click counts are not well supported.",

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
