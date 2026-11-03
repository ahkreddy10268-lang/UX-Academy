import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "hick-hyman-law",
  slug: "hick-hyman-law",
  title: "Hick-Hyman Law",
  alternateNames: ["Hick's law", "Hick's law of choice reaction time", "Rate of gain of information"],
  summary:
    "An empirical law of choice reaction time: the time to respond to one of several known stimuli grows linearly with the information, in bits, carried by the choice.",
  definition:
    "The Hick-Hyman law states that choice reaction time is a linear function of the **stimulus information** H transmitted by the choice: `RT = a + b · H`. For n equally likely alternatives `H = log₂(n)`; for unequal probabilities `H = Σ pᵢ · log₂(1/pᵢ)`. The constants *a* and *b* are fitted to measured data. It describes decision time when stimulus–response mappings are known — not the time to search an unfamiliar list.",
  primaryType: "law",
  secondaryTypes: ["model", "formula"],
  domain: "laws-effects",
  subcategory: "performance-laws",
  tags: ["decision time", "choice reaction time", "information theory", "menus", "choice architecture"],
  difficulty: "beginner",
  disciplines: ["Experimental psychology", "Human-computer interaction", "Human factors"],
  learningObjectives: [
    "Explain why decision time grows logarithmically, not linearly, with the number of equally likely choices.",
    "Calculate stimulus information for equal and unequal choice probabilities.",
    "Distinguish choice reaction (what the law models) from visual search of unfamiliar options (what it does not).",
    "Critique common UX claims that 'fewer options are always faster' using the law's assumptions.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "When you know exactly what each option means and where it is, choosing between more options still takes a little longer. The Hick-Hyman law describes *how much* longer.",
        "The key idea is that time grows with the **uncertainty** of the choice, not simply the count. Going from 2 options to 4 adds the same amount of decision time as going from 4 to 8 — each doubling adds roughly one fixed step. That is a logarithmic pattern.",
        "Options that are much more likely than others are faster to choose, because a predictable choice carries less uncertainty. A familiar, frequently used option behaves almost like no choice at all.",
      ],
      analogy:
        "In a game of 'twenty questions', to find one item among 8 you need about 3 yes/no questions; among 16, about 4. Your brain behaves as though it is narrowing down the possibilities in halves — each doubling of options costs one more 'question'.",
      everydayExamples: [
        "A traffic light has three possible signals you know by heart, so you react to it very fast.",
        "Picking a lift button for a familiar floor is quick, even though the panel has many buttons — your choice is predictable.",
        "A TV remote you use daily feels fast; a hotel remote with the same number of buttons feels slow because you must search it — that extra time is search, not Hick-Hyman decision time.",
      ],
      vocabulary: [
        { term: "Choice reaction time", meaning: "Time from a signal appearing to the person making the correct response, when several responses are possible." },
        { term: "Alternatives (n)", meaning: "The number of possible signals or responses." },
        { term: "Bit", meaning: "A unit of information: the uncertainty removed by one yes/no answer between two equally likely options." },
        { term: "Stimulus information (H)", meaning: "How much uncertainty the choice removes, in bits. log₂(n) when all options are equally likely." },
      ],
    },
    intermediate: {
      explanation: [
        "In design work the law is a reminder that **decision cost is real but grows slowly**. Halving a menu of 16 known items saves one 'bit' of decision time — useful, but small. Removing options to cut decision time usually matters less than making the likely option obvious.",
        "The law is valid when users already know the options and their mapping to responses: experienced users of a toolbar, keyboard shortcuts, a familiar navigation bar, a game controller. For novices scanning unfamiliar labels, the dominant cost is **visual search**, which grows roughly linearly with the number of items read — a very different curve.",
        "Probability matters as much as count. Because H depends on how predictable the choice is, sensible defaults, recency-ordered lists and prominent frequent actions reduce the effective information of a decision even when the total number of options is unchanged.",
      ],
      howItWorks: [
        "With n equally likely alternatives, H = log₂(n). Hick (1952) found his data fitted log₂(n + 1) better, interpreting the extra alternative as the uncertainty of whether a signal would occur at all.",
        "Hyman (1953) varied information in three ways — number of alternatives, unequal probabilities, and sequential dependencies between trials — and found reaction time stayed linear in the information transmitted, whichever way it was manipulated.",
        "a captures the time for perception and motor response that does not depend on the choice; b is the time per bit, which falls sharply with practice and with highly compatible stimulus–response mappings.",
      ],
      implementation: [
        "Use the law for *expert, repeated* decisions: toolbars, shortcut sets, game inputs, operational consoles.",
        "For novice-facing menus, design for search first: meaningful grouping, ordering (alphabetical, frequency or logical), clear labels and scannable layouts.",
        "Reduce effective information with defaults and prediction: highlight the most likely option, preserve last-used values, order by frequency where appropriate.",
        "Prefer broad, well-organised menus to deep hierarchies when items are ordered — each extra level adds fixed costs that outweigh the log-growth of breadth.",
        "Do not remove genuinely needed options to 'satisfy Hick's law'; hidden options shift cost to search, recall and navigation.",
      ],
      scenarios: [
        "A point-of-sale screen used all day by trained staff — fixed button positions and stable layouts let decision time follow the logarithmic curve and fall with practice.",
        "A settings page with 40 unlabelled icons — the cost is search and recognition, so grouping and text labels help far more than trimming to 30 icons.",
        "A checkout with one shipping option pre-selected because 90% of customers choose it — the decision's information is low even though five options exist.",
      ],
    },
    advanced: {
      explanation: [
        "The law emerged from applying Shannon's information theory to human performance. Hick (1952) proposed that people gain information at a constant rate, so reaction time should be proportional to the information in the stimulus set {{src:hick-1952}}. Hyman (1953) provided the decisive test: by manipulating probability and sequential dependency as well as set size, he showed RT tracks *information*, not merely the number of alternatives {{src:hyman-1953}}.",
        "Interpretations of the mechanism differ: early accounts proposed a hierarchical, binary-split classification process; later accounts favour parallel evidence accumulation in which a logarithmic relationship emerges from competition between response alternatives. The law is therefore best treated as a robust **descriptive** regularity rather than proof of a particular mental algorithm.",
        "In HCI, Seow (2005) reviewed why the Hick-Hyman law has been far less productive than [[fitts-law|Fitts's law]]: real interfaces rarely provide the controlled, equiprobable, well-practised stimulus–response mappings the law assumes, and decision time is hard to separate from search, reading and pointing {{src:seow-2005}}.",
      ],
      evidence: [
        "The logarithmic relationship between choice reaction time and stimulus information has been widely replicated in controlled laboratory choice-reaction tasks {{src:hyman-1953}}.",
        "Landauer & Nachbar (1985) found that for menus ordered alphabetically or numerically, selection time per level grew roughly logarithmically with breadth, favouring broader, shallower trees {{src:landauer-nachbar-1985}}.",
        "Cockburn, Gutwin & Greenberg (2007) modelled menu performance as a transition from linear visual search (novices) to Hick-Hyman decision time (experts who know item locations), showing why the law only applies once users have learnt the layout {{src:cockburn-gutwin-greenberg-2007}}.",
      ],
      debates: [
        "**Hick's n + 1 vs Hyman's n.** The +1 term models uncertainty about whether any signal appears; in most interface contexts the information-based formulation `H = Σ pᵢ log₂(1/pᵢ)` is more general and preferred.",
        "**Does practice break the law?** With extensive practice, highly compatible mappings (e.g. responding to a light by pressing the key directly under it) show slopes close to zero, so the law's *b* is not a fixed property of humans.",
        "**Popular misuse.** Practitioner summaries often state that 'more choices increase decision time', then apply it to content-heavy pages, product catalogues or long forms. Those situations are dominated by reading, search and preference formation — and the related consumer finding of [[choice-overload|choice overload]] has mixed evidence of its own.",
      ],
      alternativeModels: [
        "**Visual search** models (linear in the number of items inspected) describe novice behaviour with unfamiliar menus better than Hick-Hyman — see [[visual-search|visual search]].",
        "The **[[fitts-law|Fitts's law]]** models the movement that follows a decision; menu-selection models often combine decision, search and pointing terms.",
        "The **[[keystroke-level-model|Keystroke-Level Model]]** represents decision and preparation coarsely with a single mental operator (M ≈ 1.35 s).",
      ],
    },
  },

  origin: {
    contributors: ["William Edmund Hick", "Ray Hyman"],
    period: "1952–1953, information-theoretic experimental psychology",
    problem:
      "After Shannon's 1948 theory of communication, psychologists asked whether the human could be measured as an information channel — and whether reaction time reflects the amount of information a person must process.",
    narrative: [
      "Hick (1952) presented one of up to ten lamps and asked participants to press the matching key. Reaction time increased with a logarithm of the number of alternatives (plus one), consistent with a constant rate of gain of information {{src:hick-1952}}.",
      "Hyman (1953) independently varied the information in the stimulus set by changing the number of alternatives, their probabilities and their sequential dependencies. Reaction time was linear in information in all three cases — the result that gives the law its double name {{src:hyman-1953}}.",
      "The law reached interface design through human-factors handbooks and later the menu-design literature of the 1980s; popular UX collections now present it as 'Hick's law', often without Hyman's probability insight.",
    ],
    attributionNote:
      "Commonly called 'Hick's law'. The probability-weighted form that matters most for design comes from Hyman (1953), so 'Hick-Hyman law' is the more accurate name.",
  },

  application: {
    summary: [
      "Use the Hick-Hyman law to reason about **expert decision speed** and **choice architecture**: make likely options predictable and prominent, keep stable layouts so users can move from search to decision, and avoid adding decision steps to high-frequency tasks.",
    ],
    web: [
      "Primary navigation with a small, stable set of well-labelled destinations lets returning users decide quickly.",
      "Pre-select the most common option in a form when it is safe and transparent to do so.",
    ],
    mobile: [
      "Bottom navigation with a few stable destinations supports fast, practised decisions.",
      "Action sheets should order options by likelihood and put the safe, common choice first.",
    ],
    enterprise: [
      "Keep toolbar and ribbon positions stable across versions — relocating commands resets users from decision back to search.",
      "Provide keyboard shortcuts for frequent commands; they turn a menu search into a practised stimulus–response mapping.",
    ],
    services: [
      "Self-service kiosks benefit from a short first decision (e.g. 'Buy', 'Collect', 'Help') before detailed options.",
    ],
    steps: [
      "Identify whether users are novices (search-dominated) or experts (decision-dominated) for the choice.",
      "For experts: estimate H from option frequencies, not just counts; find where predictability can be increased.",
      "For novices: improve grouping, ordering and labels first.",
      "Avoid deepening hierarchies to reduce breadth unless items are unordered or unrelated.",
      "Measure with real users — time-to-first-click and task time separate search from decision only partially.",
    ],
  },

  whenToUse: [
    "Reasoning about decision speed in practised, repeated choices with known options.",
    "Explaining why defaults and frequency ordering speed up decisions.",
    "Comparing broad versus deep menu structures when items are ordered.",
  ],
  whenNotToUse: [
    "Predicting how long novices take to scan unfamiliar menus or pages (search dominates).",
    "Justifying removal of options users genuinely need.",
    "Modelling preference-based or high-stakes decisions such as choosing a pension or product — the law models reaction to known stimuli, not deliberation.",
  ],
  advantages: [
    "Quantitative and well replicated in laboratory tasks.",
    "Highlights probability and predictability, not just option count.",
    "Pairs naturally with Fitts's law in models of selection.",
  ],
  limitations: [
    "Assumes known, well-learnt stimulus–response mappings.",
    "Slope b depends heavily on practice and stimulus–response compatibility.",
    "Hard to isolate decision time from search, reading and pointing in real interfaces.",
    "Says nothing about decision quality, regret or satisfaction.",
  ],
  misconceptions: [
    {
      myth: "Hick's law means every extra option adds the same delay.",
      reality: "Time grows with log₂ of the options: each *doubling* adds a constant amount. Going from 10 to 11 options adds very little.",
    },
    {
      myth: "Hick's law proves menus should have as few items as possible.",
      reality:
        "Fewer items per menu usually means more levels, and each level adds fixed costs. For ordered items, broad and shallow menus tend to be faster (Landauer & Nachbar, 1985).",
    },
    {
      myth: "Hick's law explains why people can't decide what to buy.",
      reality:
        "That is preference construction and possibly [[choice-overload|choice overload]] — a separate, contested consumer-psychology effect. Hick-Hyman models reaction to known stimuli.",
    },
  ],

  relations: [
    { target: "fitts-law", type: "complementary-to", note: "Hick-Hyman models the decision before a selection; Fitts's law models the movement after it — menu models often combine both." },
    { target: "visual-search", type: "contrasts-with", note: "Novice menu use is dominated by visual search, which grows roughly linearly with items, unlike the logarithmic decision time of the Hick-Hyman law." },
    { target: "choice-overload", type: "contrasts-with", note: "Both concern 'many options', but choice overload is about preference, regret and deferral; Hick-Hyman is about reaction time to known stimuli." },
    { target: "keystroke-level-model", type: "related-to", note: "KLM collapses decision and preparation into a single mental operator, where Hick-Hyman would predict a choice-dependent time." },
    { target: "progressive-disclosure", type: "related-to", note: "Staging options reduces the information of each decision, but the law also warns that extra levels add fixed costs." },
    { target: "default-effect", type: "related-to", note: "Defaults reduce the effective information of a choice by making one option highly probable." },
    { target: "information-processing-theory", type: "developed-from", note: "The law is a product of the information-processing view of the mind that applied Shannon's theory to human performance." },
  ],

  formulas: [
    {
      id: "hick-hyman-information",
      name: "Hick-Hyman law",
      expression: "RT = a + b · H,  H = Σ pᵢ · log₂(1 / pᵢ)",
      contributor: "Hick (1952); Hyman (1953)",
      source: "hyman-1953",
      variables: [
        { symbol: "RT", name: "Reaction time", unit: "s or ms", description: "Time from stimulus onset to the correct response." },
        { symbol: "H", name: "Stimulus information", unit: "bits", description: "Uncertainty resolved by the choice. Equals log₂(n) when all n alternatives are equally likely." },
        { symbol: "pᵢ", name: "Probability of alternative i", unit: "0–1", description: "How often alternative i occurs; probabilities must sum to 1." },
        { symbol: "n", name: "Number of alternatives", unit: "count", description: "Number of possible stimuli/responses." },
        { symbol: "a", name: "Intercept", unit: "s", description: "Fitted time not dependent on the choice: perception and motor response." },
        { symbol: "b", name: "Slope", unit: "s/bit", description: "Fitted time per bit of information; falls with practice and S–R compatibility." },
      ],
      resultUnit: "bits (H) and seconds (RT)",
      assumptions: [
        "Stimuli and their correct responses are known to the person in advance.",
        "Probabilities reflect what the person has experienced, so their expectations match them.",
        "a and b were estimated by regression for this population, task and level of practice.",
      ],
      conditions: [
        "Use for practised, repeated choices with stable mappings.",
        "Use H with probabilities when options differ in frequency; use log₂(n) only for equally likely options.",
      ],
      steps: [
        "List the alternatives and estimate each probability pᵢ (they must sum to 1).",
        "For each alternative compute pᵢ × log₂(1/pᵢ).",
        "Sum these terms to obtain H in bits (equals log₂(n) if all pᵢ = 1/n).",
        "If you have locally fitted constants, compute RT = a + b × H.",
      ],
      workedExample: {
        given: [
          "A toolbar of 4 commands used with probabilities 0.5, 0.25, 0.125, 0.125.",
          "Hypothetical fitted constants for practised users: a = 0.20 s, b = 0.15 s/bit (illustrative only).",
        ],
        steps: [
          "Equal-probability information would be log₂(4) = 2 bits.",
          "With the real probabilities: H = 0.5·1 + 0.25·2 + 0.125·3 + 0.125·3 = 1.75 bits.",
          "RT = 0.20 + 0.15 × 1.75 ≈ 0.46 s (versus 0.50 s if all four were equally likely).",
        ],
        result: "H ≈ 1.75 bits; predicted RT ≈ 0.46 s with the illustrative constants.",
      },
      interpretation: [
        "Information, not count, drives decision time: predictable choices are cheap even among many options.",
        "Differences of a fraction of a bit translate into tens of milliseconds — rarely the bottleneck compared with search or reading.",
      ],
      commonErrors: [
        "Using log₂(n) when options are not equally likely.",
        "Applying the formula to unfamiliar options, where search time dominates.",
        "Using constants from a laboratory study to predict a product's real decision times.",
        "Probabilities that do not sum to 1.",
      ],
      limitations: [
        "Does not model visual search, reading, deliberation or errors.",
        "Constants change dramatically with practice and stimulus–response compatibility.",
      ],
      alternatives: [
        { name: "Hick (1952)", expression: "RT = a + b · log₂(n + 1)", note: "The +1 represents uncertainty about whether a signal occurs; common in practitioner sources." },
        { name: "Equal probability", expression: "RT = a + b · log₂(n)", note: "Special case of the information form when all pᵢ = 1/n." },
      ],
      calculator: "hick-hyman",
    },
  ],
  lab: "hick-lab",

  exercises: [
    {
      id: "hick-hyman-ex-information",
      kind: "calculation",
      level: "beginner",
      title: "Information in a navigation bar",
      prompt: [
        "A mobile app's bottom navigation has 5 tabs. Analytics show they are used 60%, 20%, 10%, 5% and 5% of the time.",
        "Calculate H assuming equal probabilities and then using the real probabilities. What does the difference tell you?",
      ],
      deliverable: "Two H values in bits and one sentence of interpretation.",
      criteria: ["Uses log₂", "Probabilities sum to 1", "Interprets predictability, not just count"],
      exampleSolution: [
        "Equal: log₂(5) ≈ 2.32 bits. Real: 0.6·0.737 + 0.2·2.322 + 0.1·3.322 + 2 × 0.05·4.322 ≈ 0.442 + 0.464 + 0.332 + 0.432 ≈ 1.67 bits.",
        "The real decision carries about 0.65 bits less information because one tab dominates. Making that tab the default landing view reduces decision cost further.",
      ],
    },
    {
      id: "hick-hyman-ex-menu-critique",
      kind: "critique",
      level: "intermediate",
      title: "Is it Hick's law or search?",
      prompt: [
        "A stakeholder proposes splitting a 24-item alphabetical settings menu into 4 sub-menus of 6 items 'because of Hick's law'.",
        "Write a short response that separates decision time, search time and the cost of extra levels, and propose how you would test the change.",
      ],
      deliverable: "A 150–250 word recommendation with a test plan.",
      criteria: [
        "Distinguishes novice search from expert decision",
        "Mentions the cost of additional navigation levels",
        "Proposes a measurable comparison (e.g. task time and success for both versions)",
      ],
    },
    {
      id: "hick-hyman-ex-lab",
      kind: "assignment",
      level: "advanced",
      title: "Measure your own slope",
      prompt: [
        "Complete the Hick-Hyman lab for 1, 2, 4 and 8 alternatives. Record the fitted slope b and intercept a.",
        "Repeat the 8-alternative block three more times. How does b change with practice, and what does this imply for applying published constants?",
      ],
      deliverable: "Regression results before and after practice, with a paragraph on practice effects.",
      criteria: ["Reports a, b and R²", "Compares before and after practice", "Discusses stimulus–response compatibility"],
    },
  ],

  quiz: [
    {
      id: "hick-hyman-q-doubling",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "With equally likely options, how does decision time change when the number of options doubles from 4 to 8?",
      options: [
        { text: "It doubles", correct: false, explanation: "That would be a linear relationship. The law is logarithmic." },
        { text: "It increases by about one constant step (one bit's worth of time)", correct: true, explanation: "log₂(8) − log₂(4) = 3 − 2 = 1 bit, so time increases by b seconds." },
        { text: "It stays the same", correct: false, explanation: "More equally likely options always add some information, so time increases." },
        { text: "It quadruples", correct: false, explanation: "No standard formulation predicts this." },
      ],
      explanation: "Each doubling of equally likely alternatives adds one bit of information, and therefore a constant increment b of reaction time.",
    },
    {
      id: "hick-hyman-q-probability",
      kind: "true-false",
      level: "intermediate",
      prompt: "According to Hyman (1953), a choice among 8 options can be faster than a choice among 4 if one of the 8 options is far more likely than the rest.",
      options: [
        { text: "True", correct: true, explanation: "Reaction time tracks information H, which depends on probabilities. A skewed 8-option set can carry less than 2 bits." },
        { text: "False", correct: false, explanation: "Hyman's key finding was that information, not the number of options, predicts reaction time." },
      ],
      explanation: "H = Σ pᵢ log₂(1/pᵢ). A highly predictable distribution of 8 options can have lower H than 4 equally likely options.",
    },
    {
      id: "hick-hyman-q-scope",
      kind: "scenario",
      level: "intermediate",
      prompt: "First-time visitors take a long time to find 'Change password' in a 30-item settings list. Which explanation is most consistent with the research?",
      options: [
        { text: "Mostly visual search and label comprehension, which grow roughly linearly with items read; Hick-Hyman applies only once users know where items are.", correct: true, explanation: "Cockburn et al. (2007) model exactly this novice-to-expert transition from search to decision." },
        { text: "Pure Hick-Hyman decision time: log₂(30) ≈ 4.9 bits explains the delay.", correct: false, explanation: "Hick-Hyman assumes known stimulus–response mappings; novices do not yet have them." },
        { text: "Fitts's law: the item is too far away.", correct: false, explanation: "Movement is a small part of this delay compared with search." },
        { text: "Choice overload: there are too many options to choose from.", correct: false, explanation: "The user has a specific goal; this is a findability problem, not preference overload." },
      ],
      explanation: "Hick-Hyman models decisions among known options. Novice delays are dominated by search, so grouping and labelling are the right fixes.",
      revise: "hick-hyman-law",
    },
    {
      id: "hick-hyman-q-menus",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "For alphabetically ordered menu items, what did Landauer & Nachbar (1985) find about breadth versus depth?",
      options: [
        { text: "Broader, shallower menus were faster because time per level grew only logarithmically with breadth.", correct: true, explanation: "Fixed costs per level outweighed the slow log growth of breadth." },
        { text: "Deep menus with 2–3 items per level were fastest.", correct: false, explanation: "Narrow menus add many levels, each with its own fixed cost." },
        { text: "Breadth had no measurable effect.", correct: false, explanation: "Time per level increased with breadth, but logarithmically." },
        { text: "The 7 ± 2 rule set the optimum at seven items.", correct: false, explanation: "Miller's span of memory is unrelated to menu breadth where items are visible." },
      ],
      explanation: "When items are ordered, the logarithmic cost of breadth is smaller than the cost of extra levels, favouring broad and shallow structures.",
      revise: "hick-hyman-law",
    },
  ],

  flashcards: [
    { id: "hick-hyman-fc-1", front: "Hick-Hyman law", back: "RT = a + b·H, where H = Σ pᵢ log₂(1/pᵢ); H = log₂(n) for equally likely options." },
    { id: "hick-hyman-fc-2", front: "Hyman's (1953) key insight", back: "Reaction time tracks information — probabilities and sequential dependencies, not just the number of options." },
    { id: "hick-hyman-fc-3", front: "When does Hick-Hyman NOT apply?", back: "Novices searching unfamiliar options (visual search dominates) and deliberative preference choices." },
  ],

  references: [
    { source: "hick-1952", role: "primary", note: "Original choice-reaction experiments and logarithmic fit." },
    { source: "hyman-1953", role: "primary", note: "Demonstrates reaction time is linear in stimulus information." },
    { source: "seow-2005", role: "primary", note: "Review of the law's use and limits in HCI." },
    { source: "landauer-nachbar-1985", role: "primary", note: "Menu breadth/depth evidence." },
    { source: "cockburn-gutwin-greenberg-2007", role: "primary", note: "Search-to-decision transition in menu performance." },
    { source: "laws-of-ux", role: "further", note: "Popular practitioner interpretation ('Hick's Law')." },
  ],
  evidence: "original-empirical",
  evidenceNote:
    "The relationship between choice reaction time and stimulus information is robust in controlled choice-reaction experiments. Evidence for direct application to interface design is weaker and conditional: it holds for practised users with stable layouts, while novice behaviour is better explained by visual search.",

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
