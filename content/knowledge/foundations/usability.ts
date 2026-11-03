import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "usability",
  slug: "usability",
  title: "Usability",
  alternateNames: ["Ease of use", "Quality in use (related ISO term)"],
  summary:
    "The extent to which specific people can use a product, system or service to achieve specific goals effectively, efficiently and with satisfaction in a specific context of use.",
  definition:
    "**Usability** is a quality of the *interaction* between particular users, a product and a context — not a property of the product alone. ISO 9241-11:2018 frames it through three measurable components: **effectiveness** (accuracy and completeness of goal achievement), **efficiency** (resources such as time and effort spent in relation to the result) and **satisfaction** (the user's physical, cognitive and emotional responses), all relative to *specified users, goals and context of use*.",
  primaryType: "concept",
  secondaryTypes: ["standard"],
  domain: "foundations",
  subcategory: "core-concepts",
  tags: ["usability", "ISO 9241-11", "effectiveness", "efficiency", "satisfaction", "context of use", "learnability"],
  difficulty: "beginner",
  disciplines: ["Human-computer interaction", "Human factors", "UX research", "Product design"],
  learningObjectives: [
    "Define usability in plain language and in the ISO 9241-11 terms of effectiveness, efficiency and satisfaction.",
    "Explain why usability is always relative to users, goals and context of use.",
    "Distinguish usability from utility, usefulness, accessibility and user experience.",
    "Choose appropriate measures for each usability component and recognise the limits of single-number usability scores.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Usability is about whether people can actually get done what they came to do — and how much struggle it takes. A usable product lets someone reach their goal without mistakes, without wasted effort, and without leaving annoyed.",
        "The crucial word is *who*. A professional video editor and a first-time phone user can look at the same app and have completely different experiences. So usability is never 'this app is usable', full stop. It is always 'usable **for these people, doing this task, in this situation**'.",
        "Usability is also only one part of a good product. A perfectly easy app that does nothing you need is useless. Designers often say a product must be both **useful** (it does the right things) and **usable** (people can do those things easily).",
      ],
      analogy:
        "Think of a ticket machine at a train station. It is usable if a tourist in a hurry, carrying luggage, can buy the right ticket first time, quickly, and walk away calm. The same machine may be fine for a daily commuter but fail the tourist — same machine, different users and context.",
      everydayExamples: [
        "A microwave where you can heat food in one press versus one that requires reading the manual to set the time.",
        "A form that tells you exactly which field has a problem, compared with one that just says 'Error'.",
        "A self-checkout that works smoothly with a full basket but becomes frustrating when an item has no barcode.",
      ],
      vocabulary: [
        { term: "Effectiveness", meaning: "Did the person achieve their goal, completely and correctly?" },
        { term: "Efficiency", meaning: "How much time, effort or other resources did it take to get there?" },
        { term: "Satisfaction", meaning: "How the person felt about the experience — comfort, confidence, frustration." },
        { term: "Context of use", meaning: "The users, their goals and tasks, and the physical, social and technical environment they are in." },
        { term: "Utility", meaning: "Whether the product provides the features people need at all." },
      ],
    },
    intermediate: {
      explanation: [
        "In practice, usability is made measurable by defining the context first: **who** the users are, **what** goals they pursue, and **where** and **with what** they work. Only then can you choose measures, because a 90-second checkout may be efficient for a one-off purchase and unacceptable for a cashier processing hundreds a day.",
        "Each component has standard measures. **Effectiveness** is typically [[task-success-rate|task success rate]] and error counts. **Efficiency** is usually [[time-on-task|time on task]], number of steps or perceived effort. **Satisfaction** is captured with standardised questionnaires such as the [[system-usability-scale|System Usability Scale]], or single post-task ratings.",
        "Nielsen (1993) offered a complementary, more design-oriented breakdown into five attributes: **learnability** (how easily first-time users accomplish basic tasks), **efficiency** (performance once learned), **memorability** (how easily returning users re-establish proficiency), **errors** (how many, how severe, how recoverable) and **satisfaction** {{src:nielsen-1993}}. The two framings overlap; Nielsen's is useful for setting design goals, ISO's for specifying and measuring them.",
      ],
      howItWorks: [
        "Usability problems arise where the design's assumptions diverge from the user's — their [[mental-models|mental model]], vocabulary, skill or environment. Methods such as [[usability-testing|usability testing]] expose these mismatches by observing real people attempting real tasks.",
        "The three components do not always move together. Adding confirmation dialogs can raise effectiveness (fewer destructive errors) while lowering efficiency; a beautiful interface can raise satisfaction without improving success. ISO deliberately keeps them separate so trade-offs remain visible.",
      ],
      implementation: [
        "Write usability goals as testable statements: '90% of first-time customers complete checkout without help in under 3 minutes on a mid-range phone'.",
        "Specify the context of use explicitly — user groups, key tasks, devices, environment — before designing or testing.",
        "Measure all three components; do not let one satisfaction score stand in for usability.",
        "Track usability over time with a benchmark set of tasks so you can see whether releases improve or regress.",
      ],
      scenarios: [
        "A banking app redesign is judged 'more usable' because its SUS score rose — but task success for bill payment fell. The ISO framing makes the regression visible.",
        "An internal enterprise tool is very efficient for trained staff but has poor learnability, so onboarding new hires takes weeks. Whether that is acceptable depends on staff turnover — a context-of-use question.",
      ],
    },
    advanced: {
      explanation: [
        "ISO 9241-11 was first published in 1998 and revised in 2018. According to members of the drafting group, the revision broadened the scope from 'products' to systems, products and services, clarified that usability is an outcome of use rather than an attribute of the artefact, and extended satisfaction to cover physical, cognitive and emotional responses — bringing it closer to concepts of user experience {{src:bevan-carter-harker-2015}} {{src:iso-9241-11-2018}}.",
        "Conceptually, usability sits within a family of terms. **Utility** asks whether the system does what is needed; **usefulness** combines utility and usability; **accessibility** is often framed as usability for the widest range of people, including those with disabilities; **user experience** extends beyond task performance to anticipation, meaning, emotion and aesthetics over time {{src:hassenzahl-tractinsky-2006}}.",
        "Methodologically, usability measures depend heavily on task selection and context fidelity. A lab study with scripted tasks measures *potential* usability for those tasks; field data and analytics measure *realised* use but rarely reveal intent. Robust programmes triangulate both.",
      ],
      evidence: [
        "The effectiveness–efficiency–satisfaction structure is a consensus definition developed through international standardisation, not an empirical law. Its value lies in making usability specifiable and measurable.",
        "A meta-analysis of correlations among usability measures found that effectiveness, efficiency and satisfaction are generally only weakly correlated, which supports measuring them separately rather than assuming one predicts the others {{src:hornbaek-law-2007}}. Practical measurement guidance for each component is given in {{src:sauro-lewis-2016}}.",
      ],
      debates: [
        "**Usability vs. UX.** Some researchers treat UX as a superset of usability; others argue usability is a pragmatic, task-focused quality distinct from hedonic, experiential qualities. The 2018 ISO revision's broader satisfaction concept narrows the gap without settling it.",
        "**Objective vs. subjective.** Satisfaction is subjective by definition, but effectiveness and efficiency also embed judgements: what counts as 'success', and which resources matter. Measures are only as valid as those definitions.",
        "**Single scores.** Combining components into one usability index is convenient for dashboards but can hide trade-offs; standards bodies and many researchers caution against it.",
      ],
      alternativeModels: [
        "**Nielsen's five attributes** (learnability, efficiency, memorability, errors, satisfaction) — a design-goal framing rather than a measurement specification {{src:nielsen-1993}}.",
        "**Quality in use** (ISO/IEC 25010, software product quality) — a software-quality model that places effectiveness, efficiency and satisfaction alongside further characteristics such as freedom from risk. Check the current edition before citing its exact structure.",
      ],
    },
  },

  origin: {
    contributors: ["ISO TC 159/SC 4 working group", "Jakob Nielsen", "Brian Shackel", "Nigel Bevan"],
    period: "1980s–1990s; ISO 9241-11 published 1998, revised 2018",
    problem:
      "As computers moved from specialists to everyday workers, organisations needed a way to specify and test whether systems could be used well — 'user-friendly' was too vague to design or contract against.",
    narrative: [
      "Through the 1980s, human factors researchers proposed operational definitions of usability built around measurable performance and attitudes. These ideas converged in international standardisation work that produced ISO 9241-11 in 1998.",
      "In parallel, Nielsen's *Usability Engineering* (1993) gave practitioners a design-oriented vocabulary and a toolkit of 'discount' methods that made usability evaluation affordable for ordinary teams {{src:nielsen-1993}}.",
      "The 2018 revision of ISO 9241-11 reframed usability as an outcome of use applicable to services as well as products, and broadened satisfaction to cover emotional responses {{src:bevan-carter-harker-2015}}.",
    ],
    attributionNote:
      "Usability has no single inventor. Early operational definitions are often credited to Brian Shackel's work in the 1980s; this entry does not cite those publications because they were not verified in this research session.",
  },

  application: {
    summary: [
      "Usability is the backbone of evaluative UX work: it gives teams a shared definition of 'works well', a way to set goals, and a set of measures to check whether designs meet them.",
    ],
    web: [
      "Define key tasks (search, compare, buy, contact) and measure success rate and time for each.",
      "Use analytics to find where effectiveness breaks down (drop-off points), then usability testing to learn why.",
    ],
    mobile: [
      "Include context of use in tests: one-handed use, poor connectivity, interruptions and glare change usability dramatically.",
    ],
    enterprise: [
      "Separate learnability from expert efficiency — enterprise tools often trade one for the other, and the right balance depends on training budgets and turnover.",
      "Measure error severity, not just frequency: one data-loss error can outweigh many minor slips.",
    ],
    services: [
      "Evaluate usability across the whole service journey (letters, phone, web, counter), since a usable website can still sit inside an unusable service.",
    ],
    steps: [
      "Specify the context of use: user groups, goals, tasks, environment and equipment.",
      "Set measurable usability requirements for effectiveness, efficiency and satisfaction.",
      "Design and prototype against those requirements.",
      "Evaluate with representative users on representative tasks.",
      "Compare results to requirements, iterate, and benchmark over releases.",
    ],
  },

  whenToUse: [
    "Defining what 'good' means for a design before arguing about solutions.",
    "Writing measurable requirements for procurement, contracts or acceptance testing.",
    "Comparing design alternatives or releases on a consistent basis.",
  ],
  whenNotToUse: [
    "As the sole lens for products whose value is primarily emotional, social or exploratory (games, art, social media) — broader UX qualities matter too.",
    "As a single score that replaces looking at what users actually did.",
    "When the real question is utility — whether the product should exist or offers the right features at all.",
  ],
  advantages: [
    "Widely agreed, standardised definition that crosses disciplines and organisations.",
    "Directly measurable and therefore testable.",
    "Forces explicit thinking about who the users are and what they are trying to do.",
  ],
  limitations: [
    "Results depend on how the context of use, tasks and success criteria are defined.",
    "Task-focused; may undervalue enjoyment, meaning, trust or long-term relationships with a product.",
    "High usability for one user group can coexist with exclusion of another unless groups are specified deliberately.",
  ],
  misconceptions: [
    {
      myth: "Usability is a property of the product.",
      reality:
        "Usability is a property of use: the same product can be highly usable for one group in one context and unusable for another. Always state the users, goals and context.",
    },
    {
      myth: "Usability means making things simple or minimal.",
      reality:
        "Expert tools can be highly usable while being complex. Usability is about fit to users' goals and skills; removing needed functionality reduces utility without necessarily improving usability.",
    },
    {
      myth: "A high satisfaction score proves a product is usable.",
      reality:
        "Satisfaction is one of three components. People sometimes rate interfaces positively while failing tasks; measure effectiveness and efficiency too.",
    },
    {
      myth: "Usability and UX are the same thing.",
      reality:
        "They overlap, but UX also covers anticipation, emotion, meaning and aesthetics before, during and after use. Usability is the pragmatic, goal-achievement core.",
    },
  ],

  relations: [
    { target: "user-experience", type: "related-to", note: "User experience extends usability's task focus to emotion, meaning and the whole lifecycle of use." },
    { target: "utility", type: "complementary-to", note: "Utility asks whether the product does the right things; usability asks whether people can do them well. Usefulness needs both." },
    { target: "system-usability-scale", type: "measured-by", note: "SUS is a standardised questionnaire for the perceived-usability (satisfaction) component." },
    { target: "task-success-rate", type: "measured-by", note: "Task success is the most common measure of effectiveness." },
    { target: "time-on-task", type: "measured-by", note: "Time on task is the most common measure of efficiency." },
    { target: "usability-testing", type: "measured-by", note: "Usability testing observes representative users on representative tasks to evaluate usability." },
    { target: "user-centred-design", type: "applied-in", note: "UCD processes set usability requirements and iterate until evaluation shows they are met." },
    { target: "accessibility-concept", type: "related-to", note: "Accessibility can be framed as usability for the widest range of people, including those with disabilities." },
  ],

  exercises: [
    {
      id: "usability-ex-requirements",
      kind: "assignment",
      level: "beginner",
      title: "Write three usability requirements",
      prompt: [
        "Pick a product you use, such as a food-delivery app. Describe one user group, one goal and one context of use.",
        "Write one measurable requirement each for effectiveness, efficiency and satisfaction.",
      ],
      deliverable: "A short context-of-use statement and three measurable requirements.",
      criteria: [
        "Context names a specific user group, goal and environment",
        "Each requirement has a measure and a target",
        "The three requirements map clearly to effectiveness, efficiency and satisfaction",
      ],
      exampleSolution: [
        "Context: commuters ordering lunch one-handed on a crowded train with intermittent signal.",
        "Effectiveness: 95% place a correct order with no help. Efficiency: median time from opening the app to confirmed order under 90 s. Satisfaction: mean post-task ease rating of at least 6 on a 7-point scale.",
      ],
    },
    {
      id: "usability-ex-tradeoff",
      kind: "scenario",
      level: "intermediate",
      title: "Diagnose a trade-off",
      prompt: [
        "After a redesign, SUS rose from 64 to 75, median time on task fell by 20%, but task success for 'change delivery address' fell from 92% to 78%.",
        "Explain what this pattern means in ISO terms, give two plausible causes, and say what you would investigate next.",
      ],
      deliverable: "A one-paragraph diagnosis and a next-step plan.",
      criteria: [
        "Recognises satisfaction and efficiency improved while effectiveness regressed for one task",
        "Proposes causes linked to the design change, such as a feature hidden in a menu",
        "Recommends observational follow-up rather than relying on the aggregate score",
      ],
    },
    {
      id: "usability-ex-critique",
      kind: "critique",
      level: "advanced",
      title: "Critique a usability index",
      prompt: [
        "Your organisation wants to report one 'usability index' per product: the average of task success (%), SUS and an efficiency score scaled to 0–100.",
        "Write a critique covering validity, hidden trade-offs and an alternative reporting approach.",
      ],
      criteria: [
        "Identifies that averaging hides opposing movements",
        "Notes that the components have different scales and meanings",
        "Proposes reporting components separately with context",
      ],
    },
  ],

  quiz: [
    {
      id: "usability-q-components",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which three components does ISO 9241-11 use to describe usability?",
      options: [
        { text: "Effectiveness, efficiency and satisfaction", correct: true, explanation: "These are the three ISO components, each assessed for specified users, goals and context." },
        { text: "Learnability, memorability and errors", correct: false, explanation: "These are three of Nielsen's five attributes, not the ISO components." },
        { text: "Utility, desirability and accessibility", correct: false, explanation: "These are related qualities, but not the ISO definition of usability." },
        { text: "Speed, beauty and simplicity", correct: false, explanation: "Beauty and simplicity are not usability components; speed is only part of efficiency." },
      ],
      explanation: "ISO 9241-11 defines usability through effectiveness, efficiency and satisfaction in a specified context of use.",
    },
    {
      id: "usability-q-context",
      kind: "true-false",
      level: "beginner",
      prompt: "A product that tested as highly usable with office workers can be assumed usable for older adults using it at home.",
      options: [
        { text: "True", correct: false, explanation: "Usability is relative to users and context. A different user group in a different environment can face very different problems." },
        { text: "False", correct: true, explanation: "Usability must be evaluated for each specified user group and context of use." },
      ],
      explanation: "The 'specified users, goals and context' clause is central: usability does not transfer automatically.",
    },
    {
      id: "usability-q-measure",
      kind: "scenario",
      level: "intermediate",
      prompt:
        "A team wants to know whether a new claims form lets people submit claims correctly. Which measure best addresses this question?",
      options: [
        { text: "Percentage of participants who submit a complete, correct claim", correct: true, explanation: "This is a task success measure — the core of effectiveness, which is the question being asked." },
        { text: "Average SUS score", correct: false, explanation: "SUS measures perceived usability (satisfaction), not whether claims were submitted correctly." },
        { text: "Average time to submit", correct: false, explanation: "Time measures efficiency; fast submissions could still be wrong." },
        { text: "Number of page views on the form", correct: false, explanation: "Page views indicate traffic, not successful goal completion." },
      ],
      explanation: "Match the measure to the component: correctness and completeness of goal achievement is effectiveness.",
    },
    {
      id: "usability-q-ux",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "Which statement best describes the relationship between usability and user experience?",
      options: [
        { text: "UX broadens beyond task performance to include emotion, meaning, anticipation and aesthetics; usability is its pragmatic, goal-focused core.", correct: true, explanation: "This reflects the common research framing, though the boundary is debated." },
        { text: "They are synonyms used by different industries.", correct: false, explanation: "They overlap but are conceptually distinct." },
        { text: "Usability is broader than UX because it covers all products.", correct: false, explanation: "UX is usually considered the broader concept." },
        { text: "UX only concerns visual design, while usability concerns function.", correct: false, explanation: "UX is not limited to visuals; it concerns the whole experience." },
      ],
      explanation: "UX includes hedonic and experiential qualities; usability focuses on achieving goals effectively, efficiently and satisfactorily.",
      revise: "user-experience",
    },
  ],

  flashcards: [
    { id: "usability-fc-iso", front: "ISO 9241-11 usability components", back: "Effectiveness, efficiency and satisfaction — for specified users, goals and context of use." },
    { id: "usability-fc-nielsen", front: "Nielsen's five usability attributes", back: "Learnability, efficiency, memorability, errors, satisfaction." },
    { id: "usability-fc-useful", front: "Usefulness = ?", back: "Utility (does what is needed) + usability (people can do it well)." },
  ],

  references: [
    { source: "iso-9241-11-2018", role: "standard", note: "Normative definition of usability and its components (paywalled; paraphrased from public descriptions)." },
    { source: "bevan-carter-harker-2015", role: "primary", note: "Rationale for the 2018 revision by members of the drafting group." },
    { source: "nielsen-1993", role: "primary", note: "Five usability attributes and discount usability engineering." },
    { source: "hassenzahl-tractinsky-2006", role: "explanatory", note: "Positions UX relative to usability." },
    { source: "hornbaek-law-2007", role: "primary", note: "Meta-analysis showing usability components correlate weakly." },
    { source: "sauro-lewis-2016", role: "further", note: "Practical measurement of usability components." },
  ],
  evidence: "official-standard",
  evidenceNote:
    "The definition is a consensus standard, not an empirical finding. What the evidence supports is that its components can be measured reliably and that they diverge in practice, so they should be measured separately. Claims attributed to the standard here are paraphrased from public descriptions because the text is paywalled.",

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
