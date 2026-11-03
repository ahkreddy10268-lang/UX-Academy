import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "card-sorting",
  slug: "card-sorting",
  title: "Card Sorting",
  alternateNames: ["Open card sort", "Closed card sort", "Hybrid card sort", "Sorting study"],
  summary:
    "A research method in which participants group content items written on cards into categories, revealing how they expect information to be organised and labelled.",
  definition:
    "Card sorting is a **research method** for information architecture in which participants sort items of content or functionality — each on a card — into groups that make sense to them. In an **open sort** participants create and name their own groups; in a **closed sort** they place cards into predefined categories; a **hybrid sort** allows both. Aggregated results show which items people consistently group together and what they call those groups, informing navigation structures and labels.",
  primaryType: "method",
  secondaryTypes: ["technique"],
  domain: "research",
  subcategory: "evaluation",
  tags: ["information architecture", "navigation", "labelling", "mental models", "cluster analysis", "taxonomy"],
  difficulty: "beginner",
  disciplines: ["Information architecture", "UX research", "Cognitive psychology"],
  learningObjectives: [
    "Choose between open, closed and hybrid card sorts for a given research question.",
    "Prepare a card set and run a moderated or unmoderated sort.",
    "Interpret a similarity matrix and dendrogram without over-reading them.",
    "Explain why card sorting should be paired with tree testing before committing to a structure.",
  ],
  prerequisites: ["mental-models"],

  levels: {
    beginner: {
      explanation: [
        "Every website or app has to decide where things go: which pages sit under which menu, and what each menu is called. Designers often organise content the way their organisation is structured — but users do not think in org charts. Card sorting asks users directly.",
        "You write each piece of content on a card — 'Change my address', 'Opening hours', 'Return an item' — and ask people to put the cards into piles that make sense to them. In an **open** sort they also name each pile. After a number of people have done it, you look for patterns: which cards keep ending up together, and what words people use for the piles.",
        "Card sorting tells you how people *expect* things to be grouped. It does not prove that people can *find* things in the structure you build — that is checked with a different method called tree testing.",
      ],
      analogy:
        "Ask several friends to organise your kitchen cupboards. If most of them put the spices next to the oils, that is a strong hint about where a guest would look for the paprika.",
      everydayExamples: [
        "A university asks prospective students to sort 40 topics (fees, accommodation, courses, open days) to design its website menu.",
        "An intranet team runs a closed sort to see whether staff can place documents into existing department categories.",
        "A banking app tests whether 'Statements' belongs with 'Accounts' or 'Documents'.",
      ],
      vocabulary: [
        { term: "Open sort", meaning: "Participants make their own groups and name them." },
        { term: "Closed sort", meaning: "Participants put cards into categories the researcher provides." },
        { term: "Hybrid sort", meaning: "Participants use provided categories but may add their own." },
        { term: "Similarity matrix", meaning: "A table showing how often each pair of cards was placed in the same group." },
        { term: "Dendrogram", meaning: "A tree diagram from cluster analysis showing which cards group together and how strongly." },
      ],
    },
    intermediate: {
      explanation: [
        "**Choose the type by your question.** Open sorts are generative: use them early to discover how people conceptualise a domain and what language they use. Closed sorts are evaluative: use them to test whether an existing or proposed set of categories is understood and used consistently. Hybrid sorts suit redesigns where some categories are fixed.",
        "**Card selection drives results.** Cards should represent real content at a consistent level of detail, be worded neutrally (avoid repeating words that will cause grouping by keyword match), and be few enough to sort thoughtfully — practitioner guides commonly suggest a few dozen {{src:spencer-2009}}. Similar words on cards ('Account settings', 'Account balance') make people group by surface wording rather than meaning.",
        "**Analysis combines numbers and judgment.** A similarity matrix shows the percentage of participants who put each pair together; hierarchical cluster analysis turns it into a dendrogram. For open sorts, standardising participants' group names reveals vocabulary. For closed sorts, the proportion of participants placing each card in each category shows agreement and ambiguity.",
      ],
      howItWorks: [
        "Each participant's sort is converted into pairwise co-occurrences: cards A and B score 1 if placed in the same group, 0 otherwise. Averaging across participants gives similarity scores from 0 to 1.",
        "Cluster analysis repeatedly merges the most similar cards or clusters; the height at which branches join in the dendrogram reflects how weakly they are related. Where to 'cut' the tree is a judgment, not a statistical given.",
        "Qualitative data — participants' comments, hesitations and cards they could not place — often explains the numbers and is easiest to collect in moderated sessions.",
      ],
      implementation: [
        "Define the research question and scope (whole site, one section, a feature menu).",
        "Build a card set from a content inventory; pilot it to remove ambiguous wording.",
        "Recruit participants representative of each major user group; analyse groups separately if they differ.",
        "Run moderated sorts for depth or unmoderated online sorts for scale; consider both.",
        "Analyse similarity matrices, dendrograms, labels and comments; propose one or more candidate structures.",
        "Validate candidate structures with tree testing before implementing navigation.",
      ],
      scenarios: [
        "An open sort reveals that customers group 'Insurance' with 'Travel' rather than 'Banking', prompting a new navigation section.",
        "A closed sort shows that 40% of participants place 'Invoices' under 'Billing' and 40% under 'Documents' — a sign the item needs cross-linking or relabelling.",
        "An enterprise tool's admin menu is re-sorted by power users and occasional users separately, revealing two different mental models.",
      ],
    },
    advanced: {
      explanation: [
        "Card sorting descends from **sorting tasks in psychology and knowledge elicitation**. Miller (1969) used free sorting with clustering to study how people organise word meanings {{src:miller-1969}}, and Rugg and McGeorge's tutorial describes card, picture and item sorts as elicitation techniques, including how to analyse the criteria people use {{src:rugg-mcgeorge-1997}}. Design practice adapted these techniques to information architecture.",
        "Its theoretical premise is that participants' groupings externalise aspects of their **mental models** of a domain. That premise holds only partly: sorting is shaped by card wording, by the task framing, and by participants' attempt to produce a 'tidy' result. Card sorting therefore shows plausible groupings and vocabulary, not a direct readout of how people search.",
        "**Sample size** depends on whether you need stable quantitative patterns. In a resampling study of 168 participants presented at the UPA 2004 conference, Tullis and Wood reported that subsamples of 20–30 produced similarity results very close to the full data set (as reported by Nielsen) {{src:nielsen-2004-card-sorting}}. Nielsen's re-analysis of the same data reported correlations with the full results of about 0.75 for 5 participants, 0.90 for 15, 0.95 for 30 and 0.98 for 60, and recommended about 15 for most projects {{src:nielsen-2004-card-sorting}}. Card sorts need more participants than formative usability tests because the goal is to estimate *patterns of agreement*, not to spot problems.",
      ],
      evidence: [
        "The sample-size evidence comes mainly from one large data set analysed by Tullis and Wood and re-analysed by Nielsen; the original paper is a practitioner-conference paper without a DOI that was not available for direct checking here, so these figures are cited through Nielsen's report and should be treated as indicative {{src:nielsen-2004-card-sorting}}.",
        "There is limited experimental evidence that structures derived from card sorts outperform other structures in findability; the method's value is better supported as an input to design, validated by tree testing and usability testing.",
      ],
      debates: [
        "**Open versus closed.** Open sorts generate ideas but produce messy, hard-to-compare labels; closed sorts are easy to analyse but cannot reveal categories you did not think of.",
        "**Online versus moderated.** Unmoderated online sorts provide numbers cheaply but lose the reasons behind choices; low-effort participation can distort similarity data.",
        "**Average structures.** An aggregate dendrogram can represent a structure no individual participant would create, especially when user groups have different mental models. Segmenting the analysis may be more truthful than averaging.",
      ],
      alternativeModels: [
        "[[tree-testing|Tree testing]] (reverse card sorting) — evaluates whether people can find items in a proposed hierarchy, without visual design.",
        "[[content-inventory|Content inventories]] and [[content-audit|audits]] — establish what content exists before sorting.",
        "Search-log and analytics analysis — show the words and paths people actually use.",
      ],
    },
  },

  origin: {
    contributors: ["George A. Miller", "Gordon Rugg", "Peter McGeorge", "Donna Spencer", "Tom Tullis", "Larry Wood"],
    period: "Psychological sorting tasks from the 1960s; adopted for information architecture from the 1990s",
    problem:
      "Designers needed evidence about how users conceptualise content in order to structure navigation that matches users' expectations rather than organisational structure.",
    narrative: [
      "Sorting tasks were used in psychology to study conceptual structure, for example Miller's 1969 work on verbal concepts {{src:miller-1969}}.",
      "Knowledge-elicitation research formalised sorting techniques and their analysis {{src:rugg-mcgeorge-1997}}.",
      "With the growth of websites and intranets, card sorting became a core information-architecture method, codified for practitioners in books such as Spencer's {{src:spencer-2009}}, and online sorting tools made large samples practical.",
    ],
    attributionNote:
      "Card sorting has no single inventor; it evolved from psychological sorting tasks and knowledge-elicitation techniques.",
  },

  application: {
    summary: [
      "Use card sorting when creating or reorganising navigation, menus, settings, help centres or any categorisation users must understand — and follow it with tree testing to validate the resulting structure.",
    ],
    web: [
      "Inform top-level navigation and section structure for content-heavy sites.",
      "Discover users' vocabulary for labels and headings.",
    ],
    mobile: [
      "Organise settings screens and tab-bar categories, where space limits the number of groups.",
    ],
    enterprise: [
      "Restructure intranets and document repositories; run separate sorts for different roles.",
      "Group features in admin consoles for occasional administrators.",
    ],
    services: [
      "Organise service information (benefits, licences, appointments) around user needs rather than departments.",
    ],
    steps: [
      "Inventory content and define scope.",
      "Choose open, closed or hybrid sort.",
      "Write and pilot cards.",
      "Recruit representative participants (about 15 or more for stable patterns per user group).",
      "Run the sort (moderated or unmoderated).",
      "Analyse similarity, clusters, labels and comments.",
      "Draft structures and validate them with tree testing.",
    ],
  },

  method: {
    procedure: [
      "Define the research question and content scope.",
      "Create a card set from real content, with neutral and consistent wording; pilot it.",
      "Choose open, closed or hybrid format and moderated or unmoderated delivery.",
      "Ask participants to sort cards into groups (and name groups in open sorts), and to think aloud if moderated.",
      "Aggregate sorts into a similarity matrix; run cluster analysis; standardise group labels.",
      "Interpret patterns, draft candidate structures and validate them with tree testing.",
    ],
    participants: "Roughly 15–30 participants per user group for stable quantitative patterns; fewer for exploratory moderated sorts.",
    duration: "Sessions of about 20–60 minutes depending on card count; one to two weeks including analysis.",
    inputs: ["Content inventory", "Card set", "Categories (for closed or hybrid sorts)", "Participant screener", "Sorting tool or physical cards"],
    outputs: ["Similarity matrix", "Dendrogram / clusters", "Participant category labels", "Candidate information architecture", "Problem cards (ambiguous items)"],
    purpose: "both",
    data: "mixed",
  },

  whenToUse: [
    "Designing or restructuring navigation and content categories.",
    "Discovering users' vocabulary for labels.",
    "Testing whether existing categories are understood consistently (closed sort).",
  ],
  whenNotToUse: [
    "To test whether people can find content in a structure — use tree testing or usability testing.",
    "When content is not yet known, or cards cannot be written at a consistent level.",
    "For task flows or processes — sorting addresses grouping, not sequences.",
    "With very large card sets that exhaust participants and degrade data quality.",
  ],
  advantages: [
    "Cheap, fast and easy for participants to understand.",
    "Reveals users' groupings and language directly.",
    "Works remotely at scale or in depth in person.",
    "Produces data that can be analysed both quantitatively and qualitatively.",
  ],
  limitations: [
    "Results are sensitive to card wording and selection.",
    "Groupings are made out of context, without the visual cues of a real interface.",
    "Aggregated structures can mask different mental models between user groups.",
    "Does not measure findability or task success.",
    "Cluster-analysis output needs careful interpretation; cut-off points are judgment calls.",
  ],
  misconceptions: [
    {
      myth: "The dendrogram is the navigation structure.",
      reality:
        "A dendrogram is evidence for design decisions, not the design. Structures also need to fit business needs, content volume and labels — and must be validated with tree testing.",
    },
    {
      myth: "Five participants are enough, as in usability testing.",
      reality:
        "Card sorting estimates patterns of agreement across people, which need larger samples; re-analyses of a 168-participant study suggest around 15 participants for reasonably stable results and 20–30 for higher stability.",
    },
    {
      myth: "Card sorting shows how users search for information.",
      reality:
        "It shows how people group items when asked to sort them. Searching and browsing in a real interface involve different cues and strategies.",
    },
  ],

  relations: [
    { target: "tree-testing", type: "complementary-to", note: "Card sorting suggests groupings; tree testing checks whether people can find items in the resulting hierarchy." },
    { target: "mental-models", type: "derived-from", note: "Card sorting rests on the premise that groupings externalise users' mental models of a domain." },
    { target: "taxonomies", type: "applied-in", note: "Card-sort results inform the design of taxonomies and category schemes." },
    { target: "labelling-systems", type: "applied-in", note: "Open sorts reveal the vocabulary users apply to groups, informing labels." },
    { target: "navigation-patterns", type: "influences", note: "Card-sort findings shape global and local navigation structures." },
    { target: "usability-testing", type: "complementary-to", note: "Usability testing evaluates the implemented navigation in realistic tasks." },
    { target: "information-scent", type: "related-to", note: "Labels derived from users' language strengthen information scent in navigation." },
  ],

  exercises: [
    {
      id: "card-sorting-ex-cards",
      kind: "assignment",
      level: "beginner",
      title: "Build and pilot a card set",
      prompt: [
        "Choose a website you use (a gym, library or council site). Write 25 cards representing its content. Then review your cards: remove duplicate keywords, make the level of detail consistent, and replace internal jargon with users' words.",
        "Pilot your set with one person in an open sort and note any cards they could not place.",
      ],
      deliverable: "Original and revised card lists, plus pilot notes.",
      criteria: ["Cards represent real content", "Wording avoids keyword-matching cues", "Pilot findings lead to changes"],
    },
    {
      id: "card-sorting-ex-matrix",
      kind: "calculation",
      level: "intermediate",
      title: "Read a similarity matrix",
      prompt: [
        "In a sort with 20 participants: 'Opening hours' and 'Find us' were grouped together by 17 participants; 'Opening hours' and 'Membership prices' by 6; 'Membership prices' and 'Join online' by 15; 'Find us' and 'Join online' by 2.",
        "Calculate the similarity scores, propose two groups, and identify what further evidence you would want before labelling them.",
      ],
      deliverable: "Four similarity scores, two proposed groups and an evidence plan.",
      criteria: ["Scores computed as proportions (e.g. 17/20 = 0.85)", "Groups follow the strongest similarities", "Plans label analysis and tree testing"],
      exampleSolution: [
        "Scores: Opening hours–Find us 0.85; Opening hours–Membership prices 0.30; Membership prices–Join online 0.75; Find us–Join online 0.10.",
        "Groups: {Opening hours, Find us} (visiting) and {Membership prices, Join online} (joining). Before labelling, review participants' own group names, then tree-test candidate labels such as 'Visit us' and 'Membership'.",
      ],
    },
    {
      id: "card-sorting-ex-design",
      kind: "scenario",
      level: "advanced",
      title: "Plan a sort for two audiences",
      prompt: [
        "A hospital website serves patients and clinicians who refer patients. Design a card-sorting study that can reveal whether the two groups have different mental models, specify sample sizes and analysis, and explain how you will decide between one shared structure and audience-specific entry points.",
      ],
      deliverable: "A one-page study plan.",
      criteria: ["Separate recruitment and analysis per audience", "Justified sample sizes", "Decision criteria and follow-up tree test"],
    },
  ],

  quiz: [
    {
      id: "card-sorting-q-type",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "You are designing a brand-new site and want to learn how users would group the content and what they would call the groups. Which sort fits best?",
      options: [
        { text: "Open card sort", correct: true, explanation: "Participants create and name their own groups, revealing both structure and vocabulary." },
        { text: "Closed card sort", correct: false, explanation: "Closed sorts test predefined categories, so they cannot reveal users' own groupings or names." },
        { text: "Tree test", correct: false, explanation: "Tree testing evaluates findability in an existing hierarchy; there is none yet." },
        { text: "A/B test", correct: false, explanation: "A/B tests compare live variants' behaviour, not conceptual groupings." },
      ],
      explanation: "Open sorts are generative; closed sorts and tree tests are evaluative.",
    },
    {
      id: "card-sorting-q-validate",
      kind: "true-false",
      level: "intermediate",
      prompt: "If a card sort produces clear clusters, you can implement the navigation without further testing.",
      options: [
        { text: "True", correct: false, explanation: "Clusters show how people group items, not whether they can find them in the final structure with its labels." },
        { text: "False", correct: true, explanation: "Validate candidate structures with tree testing (and later usability testing) before committing." },
      ],
      explanation: "Card sorting is an input to IA design; tree testing evaluates the result.",
      revise: "tree-testing",
    },
    {
      id: "card-sorting-q-wording",
      kind: "scenario",
      level: "intermediate",
      prompt:
        "Your cards include 'Account settings', 'Account balance', 'Account statements' and 'Account closure'. Almost everyone groups them together. What is the most likely problem?",
      options: [
        { text: "Participants are grouping by the shared word 'Account' rather than by meaning.", correct: true, explanation: "Repeated keywords cue superficial grouping; reword cards to describe the content without the shared term." },
        { text: "The sample is too large.", correct: false, explanation: "A larger sample cannot create this pattern; wording does." },
        { text: "This proves 'Account' must be a top-level menu.", correct: false, explanation: "The result is confounded by wording, so it proves little." },
        { text: "Closed sorts always produce this pattern.", correct: false, explanation: "The problem is the card text, not the sort type." },
      ],
      explanation: "Card wording strongly influences results; avoid shared keywords that invite matching.",
    },
    {
      id: "card-sorting-q-sample",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "Why does card sorting typically need more participants than formative usability testing?",
      options: [
        { text: "Because it estimates patterns of agreement across people, which become stable only with larger samples", correct: true, explanation: "Similarity scores are averages; Nielsen's re-analysis reported correlations of ≈0.75 with 5 participants and ≈0.90 with 15." },
        { text: "Because card sorts are always run unmoderated", correct: false, explanation: "They can be moderated or unmoderated; delivery mode is not the reason." },
        { text: "Because card sorting finds more usability problems", correct: false, explanation: "Card sorting does not aim to find usability problems." },
        { text: "Because statistical significance must be reached for every card pair", correct: false, explanation: "Analysis is typically descriptive; significance testing per pair is not standard practice." },
      ],
      explanation: "Different goals — spotting problems versus estimating shared patterns — imply different sample sizes.",
    },
  ],

  flashcards: [
    { id: "card-sorting-fc-1", front: "Open vs closed vs hybrid card sort", back: "Open: participants create and name groups. Closed: predefined categories. Hybrid: predefined plus participant-added." },
    { id: "card-sorting-fc-2", front: "Card-sorting sample size (Tullis & Wood data)", back: "≈15 participants → r ≈ 0.90 with full results (Nielsen's re-analysis); 20–30 recommended by Tullis & Wood." },
    { id: "card-sorting-fc-3", front: "What validates a card-sort-derived structure?", back: "Tree testing (then usability testing) — card sorting does not measure findability." },
  ],

  references: [
    { source: "rugg-mcgeorge-1997", role: "primary", note: "Sorting techniques and their analysis." },
    { source: "miller-1969", role: "primary", note: "Early psychological sorting method with clustering." },
    { source: "nielsen-2004-card-sorting", role: "explanatory", note: "Reports Tullis & Wood (UPA 2004) and re-analyses sample-size correlations." },
    { source: "spencer-2009", role: "explanatory", note: "Practitioner guide to planning, running and analysing card sorts." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "A long-established method with roots in psychological sorting research. Evidence supports its use for eliciting groupings and vocabulary, and indicative evidence informs sample sizes. There is little experimental evidence that card-sort-derived structures improve findability by themselves — validation with tree testing and usability testing is the accepted practice.",

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
