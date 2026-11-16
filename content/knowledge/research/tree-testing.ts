import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "tree-testing",
  slug: "tree-testing",
  title: "Tree Testing",
  alternateNames: ["Tree test", "Reverse card sorting", "Card-based classification evaluation", "Navigation hierarchy test"],
  summary:
    "Checks whether people can find things in a proposed navigation hierarchy by asking them to locate items in a text-only version of it — before any visual design, content or search exists.",
  definition:
    "Tree testing is a **research method** for evaluating an information hierarchy (the tree): participants receive find-it tasks and click down a bare, text-only list of categories until they reach the place where they would expect the answer, then choose it. Because layout, visual design, search and content are absent, the results isolate two things — the **organisation** of the tree and its **labels** {{src:nng-tree-testing}}. The researcher marks the correct location(s) for each task in advance, so the test yields success rates, directness, first clicks and paths per task {{src:nng-tree-testing-results}}. It grew out of Donna Spencer's paper technique, card-based classification evaluation {{src:spencer-2003-card-based-classification}}.",
  primaryType: "method",
  secondaryTypes: ["technique"],
  domain: "research",
  subcategory: "evaluation",
  tags: ["information architecture", "navigation", "labelling", "findability", "first click", "directness", "unmoderated"],
  difficulty: "intermediate",
  disciplines: ["Information architecture", "UX research", "Content design"],
  learningObjectives: [
    "Explain what a tree test isolates, and what it deliberately leaves out.",
    "Write find-it tasks that do not give away the answer through shared wording.",
    "Read success, directness and first-click results together to locate the cause of a navigation problem.",
    "Decide on a qualitative or quantitative design, and on the sample a comparison between trees needs.",
  ],
  prerequisites: ["card-sorting", "information-architecture"],

  levels: {
    beginner: {
      explanation: [
        "A website's menu is a tree: a few top categories, each opening into smaller ones. Before anyone designs pages, you can test whether that tree makes sense. Give people a goal — 'Your rubbish wasn't collected this week; find out which day it should be picked up' — and show them only the category names. They click down until they reach the place they think the answer would be.",
        "Because there is nothing but the words, any difficulty must come from how things are grouped and what they are called. If most people go into 'Environment' instead of 'Home & property', you have learned something about your labels — without building a single page.",
        "A tree test answers 'can people find it in this structure?'. It is the counterpart of [[card-sorting|card sorting]], which asks people how they would group things. Card sorting suggests a structure; tree testing checks it.",
      ],
      analogy:
        "Before a new hospital's walls are painted, you could hand visitors a floor plan showing nothing but the signposts and ask where they would go for an X-ray. If they head for the wrong wing, the signs or the layout are wrong, not the decoration.",
      everydayExamples: [
        "A council checks whether residents look for bin collection days under 'Home & property' or 'Environment'.",
        "A shop tests whether people look for socks under 'Accessories' as well as 'Footwear', to decide whether to list them in both.",
        "A university compares two versions of its top menu with different words for the same section.",
      ],
      vocabulary: [
        { term: "Tree", meaning: "The category hierarchy being tested, shown as text only." },
        { term: "Success rate", meaning: "The share of participants who ended at a correct location for a task." },
        { term: "Directness", meaning: "The share who went to the right place without backtracking or trying other categories." },
        { term: "First click", meaning: "The top-level category a participant chose first — a strong clue to where they expected the answer." },
        { term: "Polyhierarchy", meaning: "Listing the same item in more than one place in the tree." },
      ],
    },
    intermediate: {
      explanation: [
        "**Build the tree from content, not pages.** Write it down to the level that holds the items your tasks ask for. Content implied inside pages should become explicit topics, and helper routes such as Search, Help or Contact Us are usually left out so participants cannot skip the tree {{src:obrien-2009-tree-testing}}.",
        "**Tasks carry the test.** Each task tests a label by asking for something inside it, without repeating the label's words. NN/g's example: 'Find information about starting a business' gives away the category 'Starting a Business', while a brief scenario about opening a lawn-care service does not {{src:nng-tree-testing}}. Mark one or more correct answers per task before the study. Because participants learn the tree as they go, O'Brien recommends about ten tasks in random order {{src:obrien-2009-tree-testing}}.",
        "**Read the metrics together.** Success says whether people ended in the right place. Directness and time say how much they struggled. First clicks say where they *expected* the answer, and destinations say where they settled {{src:nng-tree-testing-results}}. A task with high success but low directness still costs people effort. A correct first click followed by low success points to overlapping sub-labels. First clicks spread across several top categories point to the top level itself {{src:nng-tree-testing-results}}.",
      ],
      howItWorks: [
        "The tool shows a task, then the top level of the tree; each click reveals the level below, and participants can go back up, choose a location ('I'd find it here') or skip the task.",
        "Every click is logged, so for each task you get the full path, the first click, the final destination and whether it matched a correct answer.",
        "Success is reported per task, with a confidence interval for the proportion; directness separates direct from indirect success and failure; time on task adds effort.",
        "For comparisons, each participant sees only one tree (between-subjects), and the same tasks are used on every tree {{src:nng-tree-testing}}.",
      ],
      implementation: [
        "Write the tree in a spreadsheet, one category per row with levels in columns, and import it into the tool.",
        "Write about ten tasks covering key and doubtful areas; add an easy warm-up task, which also helps screen out inattentive participants in unmoderated runs {{src:nng-tree-testing}}.",
        "Pilot with a few moderated sessions, asking people to think aloud, to catch confusing tasks and reasons the numbers will not show.",
        "Run the main study unmoderated; add a short questionnaire listing the labels and asking which were hard to understand.",
        "Analyse task by task: success, directness, first clicks, destinations; then revise labels or structure and test again.",
      ],
      scenarios: [
        "Success is 74 % on a tuition-fees task, but only half of the successful participants went there directly — the answer is findable, but people wander first (an example reported by NN/g) {{src:nng-tree-testing-results}}.",
        "Everyone's first click on an arts-festival task is correct, yet participants split between three sibling sub-categories: the siblings overlap and need clearer, more distinct labels {{src:nng-tree-testing-results}}.",
        "A pilot shows participants avoiding a category whose label is so broad they expect to wade through content — invisible in the numbers, obvious in the sessions {{src:nng-tree-testing}}.",
      ],
    },
    advanced: {
      explanation: [
        "**What a 'good' score is.** As reported by NN/g, Albert and Tullis's review of 98 tree-testing studies found a median task success of 62 %, with half of tasks between 37 % and 83 % {{src:nng-tree-testing-results}}. Tree tests strip away search, cross-links, page content and visual cues, so success is usually lower than in the finished design. Bad menus or search can also push it lower {{src:nng-tree-testing-results}}. The most useful benchmark is your own previous tree on the same tasks, and the target should follow the task's importance.",
        "**Qualitative or quantitative.** With a few moderated participants, a tree test is a quick formative check of labels, not a source of statistics {{src:nng-tree-testing}}. Quantitative use needs larger samples. O'Brien recommended at least 30 participants for reasonable results {{src:obrien-2009-tree-testing}}, and NN/g suggests 50 or more *per tree* when comparing trees, with the significance test computed by the researcher {{src:nng-tree-testing-results}}. The arithmetic shows why: 6 of 8 successes is 75 %, but its 95 % adjusted-Wald interval runs from about 40 % to 94 %.",
        "**What the method assumes.** A tree test models browsing from the top down. Real visitors also search, follow links within pages and use visual cues, so a tree test predicts the part of findability that depends on organisation and labels. Spencer framed the original technique as separating classification problems from interface problems, so that later usability testing could focus on the interface {{src:spencer-2003-card-based-classification}}. Tools also accept only leaves as answers, although real category pages often have content of their own {{src:nng-tree-testing}}.",
      ],
      evidence: [
        "Across 98 tree-testing studies (Albert and Tullis, as reported by NN/g; the book was not read here), median task success was 62 % (interquartile range 37–83 %) {{src:nng-tree-testing-results}}.",
        "In one reported client project, the existing tree scored 31 % success and the redesigned tree 67 % on the same tasks — a vendor case report by a developer of a tree-testing tool, not a controlled study {{src:obrien-2009-tree-testing}}.",
        "No peer-reviewed validation study was found that compares tree-test results with findability in the finished product; the method's support is practitioner experience and its face validity as a top-down browsing task.",
      ],
      debates: [
        "**Isolation is the strength and the weakness.** Removing design and search makes problems attributable to the tree; it also means a tree test cannot show how mega menus, search or in-page links will change behaviour. Mega menus, for example, can raise success well above tree-test levels — but only after a correct first click {{src:nng-tree-testing-results}}.",
        "**Closed card sort or tree test?** Closed card sorting asks where people would *file* an item; tree testing asks where they would *look* for it starting from a task — which is closer to how people use navigation {{src:obrien-2009-tree-testing}}.",
        "**Single correct answers.** Marking one leaf as correct can understate success where content sensibly lives in two places; marking several hides which location people use. Destination data, not the aggregate score, shows whether cross-listing is earned {{src:nng-tree-testing-results}}.",
      ],
      alternativeModels: [
        "[[card-sorting|Card sorting]] — generative: how people would group and name items; does not test findability.",
        "[[first-click-testing|First-click testing]] — tests the first choice on a designed screen, with layout and visual cues present.",
        "[[usability-testing|Usability testing]] with findability tasks — tests the whole interface, so problems are harder to attribute to the tree.",
        "Search-log and analytics analysis — shows the words and routes people actually use on a live site.",
      ],
    },
  },

  origin: {
    contributors: ["Donna Spencer", "Dave O'Brien"],
    period: "Paper technique described in 2003; online tools and the name 'tree testing' from the late 2000s",
    problem:
      "Information architects could generate structures with card sorting but had no simple way to test whether people could find things in them before pages were built; closed card sorting models filing, not finding.",
    narrative: [
      "Working at the Australian Bureau of Statistics, Donna Spencer wrote a proposed classification on index cards, one level per card, and asked participants to move down the cards to where they would look for each scenario — a 'card-based classification evaluation' that took about ten minutes per person {{src:spencer-2003-card-based-classification}}.",
      "O'Brien describes adopting Spencer's technique on a New Zealand government project, the name 'tree testing' sticking during paper sessions, and the building of an online tool (Treejack) to automate recording and analysis {{src:obrien-2009-tree-testing}}.",
      "Online tools made large unmoderated samples practical, and practitioner guidance on metrics such as directness and first clicks followed {{src:nng-tree-testing-results}}.",
    ],
    attributionNote:
      "Spencer is credited as the originator of the technique by O'Brien, who also has a commercial interest in a tree-testing tool. It is sometimes called 'reverse card sorting'; that is another name, not a separate method.",
  },

  application: {
    summary: [
      "Use tree testing to check a proposed navigation hierarchy — after card sorting and before page design — and to benchmark an existing one at the start of a redesign.",
    ],
    web: [
      "Test the global navigation of content-heavy sites: councils, universities, retailers, intranets.",
      "Compare alternative labels for the same section between groups of participants.",
    ],
    mobile: [
      "Test the hierarchy behind tab bars and nested settings screens, where only one level is visible at a time — much as in a tree test.",
    ],
    enterprise: [
      "Check that occasional users of admin consoles and document repositories can find functions, not only daily experts.",
    ],
    services: [
      "Test service catalogues and help centres organised by need rather than by department.",
    ],
    steps: [
      "Write the tree down to the levels your tasks need; omit helper routes such as Search.",
      "Write about ten find-it tasks that avoid the labels' words, and mark correct answers.",
      "Pilot with a few moderated, think-aloud sessions.",
      "Run unmoderated with enough participants for your purpose; one tree per participant when comparing.",
      "Analyse success, directness, first clicks and destinations per task.",
      "Revise labels or structure and test again.",
    ],
  },

  method: {
    procedure: [
      "Define the scope and write the tree as text, down to the levels the tasks need.",
      "Write find-it tasks that avoid the labels' wording; mark one or more correct answers for each.",
      "Pilot moderated sessions with think-aloud to check task wording and hear reasons.",
      "Run the study, usually unmoderated and online, with tasks in random order and one tree per participant.",
      "Analyse per task: success with its confidence interval, directness, time, first clicks and destinations.",
      "Revise the tree and retest; compare against the previous tree on the same tasks.",
    ],
    participants:
      "A few moderated participants for a formative check; for quantitative results at least about 30 (O'Brien), and 50 or more per tree when comparing trees (NN/g).",
    duration: "About 5–10 minutes per participant for ten tasks on a medium tree (O'Brien); a few days from tree to analysis.",
    inputs: ["Proposed tree (spreadsheet)", "Find-it tasks with correct answers", "Tree-testing tool or paper cards", "Participant recruitment"],
    outputs: ["Success, directness and time per task", "First-click and destination distributions", "Paths through the tree", "Problem labels and sections", "Comparison between trees"],
    purpose: "evaluative",
    data: "mixed",
  },

  whenToUse: [
    "To validate a hierarchy proposed after card sorting, before designing pages.",
    "To benchmark an existing navigation structure at the start of a redesign.",
    "To compare alternative structures or labels with the same tasks.",
    "To decide whether an item needs to be listed in more than one place.",
  ],
  whenNotToUse: [
    "To discover how people would group content when no structure exists yet — use card sorting.",
    "To evaluate search, page layout, menus' visual design or in-page links — use usability testing.",
    "When people mainly reach content by search or links rather than by browsing a hierarchy.",
    "To ask why people chose a path, in an unmoderated run — add moderated sessions or follow-up questions.",
  ],
  advantages: [
    "Tests organisation and labels before any design or content exists.",
    "Fast for participants and cheap to run at scale online.",
    "Produces per-task metrics that locate problems precisely and allow benchmarking.",
    "Makes structural debates decidable with data from users.",
  ],
  limitations: [
    "Removes search, visual design, content and cross-links, so scores understate or misstate real findability.",
    "Results depend heavily on task wording; shared words between task and label inflate success.",
    "Unmoderated runs record clicks but not reasons.",
    "Participants learn the tree across tasks, which can inflate later tasks.",
    "Tools typically accept only leaves as answers, unlike sites whose category pages have content.",
  ],
  misconceptions: [
    {
      myth: "A tree test and a closed card sort answer the same question.",
      reality:
        "A closed sort asks where people would file an item; a tree test starts from a task and asks where they would look, which is how navigation is used {{src:obrien-2009-tree-testing}}.",
    },
    {
      myth: "A 65 % success rate means the navigation fails a third of visitors.",
      reality:
        "Tree tests remove search, content and visual cues, so the finished design may score higher (or lower, if menus or search are poor). Compare with your previous tree and the task's importance {{src:nng-tree-testing-results}}.",
    },
    {
      myth: "Success rate is the only number that matters.",
      reality:
        "Success with low directness still costs effort, and confident wrong answers ('direct failures') are worse than wandering. First clicks show where people expected the answer {{src:nng-tree-testing-results}}.",
    },
  ],

  relations: [
    { target: "task-success-rate", type: "measured-by", note: "Each tree-test task is scored chiefly by the proportion of participants who end at a correct location." },
    { target: "first-click-testing", type: "related-to", note: "First-click tests examine the first choice on a designed screen; tree tests examine first clicks in a bare hierarchy." },
    { target: "usability-testing", type: "contrasts-with", note: "Usability testing evaluates the whole interface; a tree test isolates the hierarchy so problems can be attributed to it." },
    { target: "information-scent", type: "related-to", note: "Tree tests measure how well labels signal what lies beneath them — their information scent." },
    { target: "unmoderated-testing", type: "related-to", note: "Quantitative tree tests are usually run as unmoderated online studies." },
  ],

  practice: {
    dos: [
      { text: "Write tasks as goals that avoid the words used in the tree.", why: "A task that repeats a label invites matching words instead of understanding; NN/g shows a scenario-based alternative {{src:nng-tree-testing}}.", kind: "industry" },
      { text: "Leave Search, Help and Contact out of the tree.", why: "They let participants escape the hierarchy you are trying to test {{src:obrien-2009-tree-testing}}.", kind: "industry" },
      { text: "Read first clicks and destinations before rewriting labels.", why: "Correct first clicks with low success point to sibling labels; scattered first clicks point to the top level {{src:nng-tree-testing-results}}.", kind: "industry" },
      { text: "Show each participant only one tree when comparing alternatives.", why: "Experience with the first tree changes behaviour on the second {{src:nng-tree-testing}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't report a success rate without its confidence interval.", why: "With small samples the interval is wide: 6 of 8 is 75 %, but plausibly anywhere from about 40 % to 94 %.", kind: "standard" },
      { text: "Don't treat tree-test scores as final findability.", why: "Search, page content and visual design are missing on purpose; the finished design can score higher or lower {{src:nng-tree-testing-results}}.", kind: "context" },
      { text: "Don't list an item in two places unless people look in both.", why: "Cross-listing dilutes a structure; destination data shows whether a second location is used {{src:nng-tree-testing-results}}.", kind: "industry" },
    ],
    examples: [
      {
        title: "A tree and three tasks, written for import",
        language: "text",
        code: `TREE (one category per row; each level one column to the right)
Home & property
    Waste & recycling
        Bin days
        Bulky items
    Council tax
Environment
    Parks
    Pollution
Your council
    Contact us        <- leave out: a helper route

TASKS (wording avoids the labels; correct answers marked)
T1  Your rubbish wasn't taken this week. Find out which day
    it should be picked up.        -> Home & property > Waste & recycling > Bin days
T2  You are replacing an old sofa. Find out how to get rid
    of the old one.                -> Home & property > Waste & recycling > Bulky items
T3  (warm-up) Find when the park near you closes.
                                   -> Environment > Parks`,
        caption:
          "Illustrative tree. T1 avoids 'bin', 'collection' and 'waste'; 'Contact us' is a helper route to remove before testing; the warm-up task is easy on purpose.",
      },
    ],
  },

  exercises: [
    {
      id: "tree-testing-ex-tasks",
      kind: "critique",
      level: "beginner",
      title: "Correct the task wording",
      prompt: [
        "Each task below is meant to test the label in brackets. Say what is wrong and rewrite it.",
        "(a) 'Find the opening hours for the library.' [Libraries]",
        "(b) 'You recently moved from Leeds to Bristol, your partner has started a new job and you have two children, one of whom will start school next September. Find out how to apply for a school place.' [School admissions]",
        "(c) 'Where would you report a pothole?' [Roads & pavements]",
      ],
      deliverable: "For each task: the problem, and a rewritten task.",
      criteria: [
        "Spots the shared word in (a)",
        "Spots the extraneous story in (b) that buries the goal",
        "Accepts (c) as essentially sound, or improves it only slightly",
        "Rewrites state a goal without the label's words",
      ],
      exampleSolution: [
        "(a) Repeats 'library'. Rewrite: 'You want to borrow a book on Saturday afternoon. Find out whether you can.'",
        "(b) The goal is buried in detail people will skim. Rewrite: 'Your child starts primary school next September. Find out how to get them a place.' (This still says 'school', which may be unavoidable; check that other labels cannot match it.)",
        "(c) Sound: it states a goal and does not use 'roads' or 'pavements'. 'You've noticed a deep hole in your street. Find out how to get it fixed' removes any doubt.",
      ],
    },
    {
      id: "tree-testing-ex-diagnose",
      kind: "scenario",
      level: "intermediate",
      title: "Diagnose from the metrics",
      prompt: [
        "Task: 'Find out how to get rid of an old sofa.' Correct answer: Home & property > Waste & recycling > Bulky items. Results (n = 60): success 45 %, directness 30 %.",
        "First clicks: Home & property 85 %, Environment 10 %, Your council 5 %. Destinations among those who started in Home & property: Bulky items 53 %, Bin days 27 %, Council tax 4 %, other 16 %.",
        "What is the most likely problem, and what would you change and retest?",
      ],
      deliverable: "A diagnosis, one proposed change and how you would test it.",
      criteria: [
        "Notes the top level works (first clicks mostly correct)",
        "Locates the problem in the sub-labels under Waste & recycling",
        "Proposes a clearer, more distinct label or cross-link, not a top-level change",
        "Proposes retesting the same task with a new group",
      ],
      exampleSolution: [
        "The top level works: 85 % started in the right place. People then split between 'Bulky items' and 'Bin days', so the sibling labels do not distinguish 'large things you throw away' from routine collection.",
        "Try a more concrete label such as 'Large items: sofas, fridges, beds' and test the same task with new participants; compare success and directness with this run.",
      ],
    },
    {
      id: "tree-testing-ex-calc",
      kind: "calculation",
      level: "advanced",
      title: "How sure is a success rate?",
      prompt: [
        "A pilot found 6 of 8 participants successful on a task. The main study found 34 of 50. A second tree, tested on a separate group, scored 24 of 50 on the same task.",
        "Using the adjusted-Wald interval, give 95 % intervals for 6/8 and 34/50. Then say whether the difference between 34/50 and 24/50 is likely to be real, using a two-proportion test.",
      ],
      deliverable: "Two intervals, a test result and a one-sentence conclusion.",
      criteria: [
        "6/8: about 40 %–94 %",
        "34/50: about 54 %–79 %",
        "Difference 20 points, p ≈ 0.04, interval of the difference roughly 1 to 39 points",
        "Concludes the second tree is probably worse, but the size of the difference is uncertain",
      ],
      exampleSolution: [
        "6/8 = 75 %; adjusted-Wald 95 % interval ≈ 40 % to 94 % — almost no information about the true rate.",
        "34/50 = 68 %; interval ≈ 54 % to 79 %.",
        "24/50 (48 %) vs 34/50 (68 %): difference 20 points, z ≈ 2.03, p ≈ 0.04; 95 % interval of the difference ≈ 1 to 39 points. The first tree is probably better, but the advantage could be small.",
      ],
    },
  ],

  quiz: [
    {
      id: "tree-testing-q-purpose",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What does a tree test isolate?",
      options: [
        { text: "The organisation and labels of a navigation hierarchy", correct: true, explanation: "Layout, visual design, search and content are removed, so results reflect the tree itself." },
        { text: "The visual design of the menu", correct: false, explanation: "The tree is shown as plain text; visual design is deliberately absent." },
        { text: "How people would group content themselves", correct: false, explanation: "That is card sorting, which is generative." },
        { text: "The quality of the site search", correct: false, explanation: "Search is usually excluded from the tree." },
      ],
      explanation: "A tree test checks findability in a hierarchy by its words and structure alone.",
    },
    {
      id: "tree-testing-q-firstclick",
      kind: "scenario",
      level: "intermediate",
      prompt:
        "For a task, 90 % of participants make the correct first click, but success is only 40 %. Where is the problem most likely to be?",
      options: [
        { text: "In the sub-categories below the correct top level — they overlap or are unclear", correct: true, explanation: "People start in the right place and then choose among siblings that do not distinguish themselves." },
        { text: "In the top-level labels", correct: false, explanation: "The first click is mostly correct, so the top level is working for this task." },
        { text: "In the visual design", correct: false, explanation: "A tree test has no visual design." },
        { text: "In the sample size", correct: false, explanation: "A 90 % to 40 % pattern is a structural signal, not noise." },
      ],
      explanation: "Correct first clicks with low success point to sub-labels; scattered first clicks point to the top level.",
    },
    {
      id: "tree-testing-q-wording",
      kind: "critique",
      level: "intermediate",
      prompt: "A task reads: 'Find information about council tax discounts.' The tree contains 'Council tax > Discounts'. Success is 96 %. What is the best interpretation?",
      options: [
        { text: "The result is unreliable: participants could match the words without understanding the structure.", correct: true, explanation: "Shared words between task and label inflate success; rewrite the task as a goal." },
        { text: "The section is excellent and needs no change.", correct: false, explanation: "The task gave away the answer, so the score says little about the labels." },
        { text: "96 % is suspiciously high, so the tool is faulty.", correct: false, explanation: "The tool is fine; the wording caused it." },
        { text: "The section should be moved to the top level.", correct: false, explanation: "Nothing in the result supports a move." },
      ],
      explanation: "Write tasks that avoid the labels' words, for example: 'You live alone. Find out whether you can pay less.'",
      revise: "card-sorting",
    },
    {
      id: "tree-testing-q-sample",
      kind: "true-false",
      level: "advanced",
      prompt: "Eight participants are enough to decide which of two trees has the higher success rate.",
      options: [
        { text: "True", correct: false, explanation: "With eight participants a single success rate has an interval tens of points wide; comparing two trees needs much larger groups." },
        { text: "False", correct: true, explanation: "Small groups suit qualitative checks; NN/g suggests 50 or more per tree for comparisons." },
      ],
      explanation: "Use small moderated tree tests to find label problems, and larger unmoderated groups to compare trees.",
    },
  ],

  flashcards: [
    { id: "tree-testing-fc-1", front: "Tree testing vs card sorting", back: "Card sorting (generative): how people group and name items. Tree testing (evaluative): whether they can find items in a given hierarchy." },
    { id: "tree-testing-fc-2", front: "Directness", back: "The share of participants who reached the answer without backtracking or trying other categories — a measure of effort." },
    { id: "tree-testing-fc-3", front: "Correct first click, low success means…", back: "Sibling sub-categories overlap or are unclear; the top level works." },
    { id: "tree-testing-fc-4", front: "Typical tree-test success (Albert & Tullis, via NN/g)", back: "Median 62 % across 98 studies; interquartile range 37–83 %." },
    { id: "tree-testing-fc-5", front: "Who originated tree testing?", back: "Donna Spencer, as 'card-based classification evaluation' on index cards (2003); the name and online tools followed." },
  ],

  references: [
    { source: "spencer-2003-card-based-classification", role: "primary", note: "Read: Spencer's original paper technique." },
    { source: "obrien-2009-tree-testing", role: "primary", note: "Read: origin of the name and online method; author has a commercial interest in a tool." },
    { source: "nng-tree-testing", role: "explanatory", note: "Read: method, task wording, qualitative vs quantitative use, limits." },
    { source: "nng-tree-testing-results", role: "explanatory", note: "Read: metrics, benchmarks reported from Albert & Tullis, first-click and destination analysis, sample sizes." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Tree testing is supported by practitioner experience and published practice guidance; its originating description and later accounts are practitioner articles, one by a tool developer. No peer-reviewed study was found that validates tree-test scores against findability in finished products. The benchmark figures come from a review of 98 studies cited through NN/g, not read here.",

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
  lastVerifiedAt: "2026-11-16",
});
