import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "choice-overload",
  slug: "choice-overload",
  title: "Choice Overload",
  alternateNames: ["Too-much-choice effect", "Overchoice", "The paradox of choice", "Choice paralysis"],
  summary:
    "The hypothesis that offering more options can reduce people's motivation to choose or their satisfaction with the choice. Famous from the 'jam study', but meta-analyses show the average effect is near zero and highly dependent on conditions.",
  definition:
    "Choice overload is the hypothesised effect whereby increasing the number of options in a choice set **decreases** the likelihood of making a choice, the satisfaction with the option chosen, or confidence in it. Meta-analytic evidence indicates it is **not a general effect**: across studies the mean effect is close to zero, but it can appear reliably under specific conditions — complex choice sets, difficult decision tasks, uncertain preferences, and goals focused on choosing rather than browsing.",
  primaryType: "concept",
  secondaryTypes: [],
  domain: "laws-effects",
  subcategory: "decision-biases",
  tags: ["decision-making", "choice architecture", "assortment size", "satisfaction", "replication", "filtering"],
  difficulty: "intermediate",
  disciplines: ["Consumer psychology", "Behavioural economics", "Interaction design", "Product strategy"],
  learningObjectives: [
    "Describe the jam study accurately and explain why it became famous.",
    "Explain what the meta-analyses found and why 'more choice is bad' is not a valid general rule.",
    "Identify the conditions (moderators) under which choice overload is more likely.",
    "Design choice experiences that reduce decision difficulty without removing useful options — and test the result.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Have you ever stood in front of a huge menu and struggled to decide, or scrolled a streaming catalogue for twenty minutes and watched nothing? The idea that **too many options can make choosing harder** is called *choice overload*.",
        "The idea became famous through an experiment with jam in a supermarket: a tasting stand with 24 flavours attracted more visitors than one with 6, but far fewer of those visitors went on to buy.",
        "Here is the important twist: when researchers later combined dozens of similar studies, they found that **on average, more choice did not reduce choosing**. Sometimes it did, sometimes it helped, and often it made no difference. So the useful question is not *how many* options, but *when* do many options become a burden?",
      ],
      analogy:
        "A huge bookshop is wonderful if you know what you like or enjoy browsing — and overwhelming if you need a gift for someone you barely know by closing time. The number of books is the same; your situation is different.",
      everydayExamples: [
        "Picking a phone plan from dozens of similar-looking tariffs with different small print.",
        "Choosing a streaming film when you're tired and have no particular mood in mind.",
        "Enjoying a large ice-cream counter when you already know your favourite flavour.",
      ],
      vocabulary: [
        { term: "Choice set", meaning: "The group of options someone is choosing between." },
        { term: "Assortment size", meaning: "How many options are offered." },
        { term: "Meta-analysis", meaning: "A study that statistically combines the results of many earlier studies to estimate an overall effect." },
        { term: "Moderator", meaning: "A condition that changes whether, or how strongly, an effect appears." },
      ],
    },
    intermediate: {
      explanation: [
        "In Iyengar and Lepper's (2000) field study, a tasting display at an upmarket grocery offered either 6 or 24 jams. The larger display drew more passers-by to stop, but only about 3% of those who stopped at the 24-jam display later bought jam, compared with about 30% at the 6-jam display {{src:iyengar-lepper-2000}}. Two lab studies (essay topics and chocolates) showed related effects on motivation and satisfaction.",
        "Scheibehenne, Greifeneder and Todd (2010) meta-analysed 63 conditions from 50 experiments and found a **mean effect size of virtually zero**, with large variation between studies {{src:scheibehenne-greifeneder-todd-2010}}. Some studies found overload, some found that more choice increased choosing and satisfaction, and many found nothing.",
        "Chernev, Böckenholt and Goodman (2015) identified **four moderators** that make overload more likely: high **choice-set complexity** (options hard to compare, no clear best option), high **decision-task difficulty** (time pressure, many attributes, poor presentation), high **preference uncertainty** (people don't know what they want), and a **decision goal** of choosing rather than browsing {{src:chernev-bockenholt-goodman-2015}}.",
        "For designers, this turns a crude rule ('show fewer options') into a diagnostic one: **reduce decision difficulty**. Often that means better comparison, filtering, defaults and recommendations — not fewer products.",
      ],
      howItWorks: [
        "Large sets increase the effort of comparing options and the anticipated regret of choosing wrongly; when effort exceeds motivation, people defer or abandon.",
        "Structure lowers effort: categories, filters and sorting turn one large choice into a few small ones.",
        "A clear dominant option, a sensible default, or expertise can neutralise the burden of a large set.",
      ],
      implementation: [
        "Before cutting options, check the moderators: are options hard to compare? Are users uncertain what they need? Are they trying to decide now?",
        "Offer structure — categories, [[faceted-navigation|faceted filters]], sorting by meaningful criteria — so users can narrow the set themselves.",
        "Provide comparison views that align attributes across options.",
        "Use honest recommendations or a well-chosen [[default-effect|default]] when most users have similar needs, while keeping alternatives available.",
        "Use [[progressive-disclosure|progressive disclosure]] for advanced variants.",
        "Treat assortment changes as hypotheses and measure them with [[ab-testing|A/B tests]] on conversion and satisfaction.",
      ],
      scenarios: [
        "A SaaS pricing page with six plans and 40 feature rows: grouping features, highlighting differences and recommending a plan by team size reduces difficulty without removing plans.",
        "An online shop with 2,000 sofas: filters for size, material and price, plus sorting by relevance, let users who know their constraints narrow quickly — cutting the range would hurt them.",
        "A benefits-enrolment portal where employees face dozens of complex options under a deadline: all four moderators are present; strong defaults and decision aids are justified.",
      ],
    },
    advanced: {
      explanation: [
        "The jam study is a field experiment with important limitations: assignment was by time block rather than individual randomisation, the outcome was measured among those who stopped, and the context (an upmarket shop with a tasting booth) is specific. It demonstrated that overload *can* occur, not that it generally does {{src:iyengar-lepper-2000}}.",
        "Scheibehenne et al. (2010) reported considerable heterogeneity and examined possible preconditions; their conclusion was that overload is real in some circumstances but that the conditions were not yet well understood {{src:scheibehenne-greifeneder-todd-2010}}. Chernev et al. (2015) addressed this by coding studies on theoretically motivated moderators and found reliable overload effects when those moderators were present {{src:chernev-bockenholt-goodman-2015}}.",
        "Choice overload concerns **preferential choice** — choosing what you like — and outcomes such as deferral, satisfaction and regret. It is a different phenomenon from the [[hick-hyman-law|Hick-Hyman law]], which models **speeded reaction time** among stimulus–response alternatives in perceptual tasks. Citing Hick's law as evidence for choice overload (or vice versa) conflates two different literatures.",
      ],
      evidence: [
        "Original demonstration of overload in field and lab studies {{src:iyengar-lepper-2000}}.",
        "Meta-analysis: mean effect ≈ 0, high heterogeneity {{src:scheibehenne-greifeneder-todd-2010}}.",
        "Meta-analysis of moderators: overload more likely under complexity, task difficulty, preference uncertainty and choosing goals {{src:chernev-bockenholt-goodman-2015}}.",
      ],
      debates: [
        "**Publication and replication.** The famous early results were followed by failed replications; how much the literature was shaped by selective publication remains a concern.",
        "**What is the outcome?** Studies measure different things — whether a choice is made, satisfaction, regret, confidence — which may respond differently to assortment size.",
        "**More choice can help.** Larger sets improve the chance that a good match exists for people with clear preferences; the net effect depends on who the users are.",
      ],
      alternativeModels: [
        "**[[decision-fatigue|Decision fatigue]]** accounts emphasise cumulative effort across many decisions; this literature also has replication debates.",
        "**Choice architecture** (defaults, ordering, partitioning) frames the issue as how options are presented rather than how many exist — see the [[default-effect|default effect]] and [[nudge-theory|nudge theory]].",
      ],
    },
  },

  origin: {
    contributors: ["Sheena S. Iyengar", "Mark R. Lepper", "Benjamin Scheibehenne", "Alexander Chernev"],
    period: "2000 (jam study) to 2015 (moderator meta-analysis)",
    problem: "Classical economics assumes more options can only make people better off. Psychologists asked whether, in practice, extensive choice could demotivate people.",
    narrative: [
      "Iyengar and Lepper published three studies in 2000 under the title 'When choice is demotivating' {{src:iyengar-lepper-2000}}. The jam study became one of the most cited findings in popular psychology and design writing, and inspired popular books arguing for a 'paradox of choice'.",
      "A decade later, Scheibehenne, Greifeneder and Todd's meta-analysis found the average effect to be near zero {{src:scheibehenne-greifeneder-todd-2010}}, prompting a search for the conditions under which overload occurs.",
      "Chernev, Böckenholt and Goodman's 2015 review synthesised those conditions into four moderators {{src:chernev-bockenholt-goodman-2015}}.",
    ],
  },

  application: {
    summary: [
      "Design to **reduce decision difficulty**, not to minimise option count. Diagnose the moderators, add structure, and test assortment changes empirically.",
    ],
    web: [
      "Pricing pages: align comparable attributes, highlight genuine differences, and recommend based on stated needs.",
      "Large catalogues: filters, sorting and categories rather than arbitrary cuts.",
      "Onboarding choices (themes, templates): start from a recommended option with others available.",
    ],
    mobile: [
      "Limited screen space makes comparison harder; use step-by-step narrowing (category → filter → compare) rather than long undifferentiated lists.",
    ],
    enterprise: [
      "Configuration screens: sensible defaults with advanced options disclosed progressively; templates for common setups.",
      "Procurement or vendor selection tools: comparison matrices and weighting aids for complex, multi-attribute decisions.",
    ],
    services: [
      "Public services (benefits, pensions, health plans): where options are complex and stakes high, provide decision aids, plain-language comparisons and well-justified defaults.",
    ],
    steps: [
      "Describe the choice: how many options, how comparable, what users know, what goal they have.",
      "Score the four moderators — complexity, task difficulty, preference uncertainty, decision goal.",
      "If several are high, add structure: filters, comparisons, recommendations, defaults.",
      "Only then consider reducing the set, and do so on evidence of low use or redundancy.",
      "Measure: conversion, time to decide, deferral, satisfaction and returns.",
    ],
  },

  whenToUse: [
    "Diagnosing why users abandon at a selection step (plans, products, templates, settings).",
    "Designing decision support for complex, high-stakes choices.",
    "Challenging assumptions in assortment and pricing decisions.",
  ],
  whenNotToUse: [
    "As a universal rule that fewer options are always better.",
    "As evidence for reducing visible navigation items or menu length — that is a different problem.",
    "To justify hiding options in ways that steer users toward choices that benefit the business at their expense.",
  ],
  advantages: [
    "Reframes option design around decision difficulty, which is actionable.",
    "Highlights the value of comparison, filtering and defaults.",
  ],
  limitations: [
    "Average effect across studies is near zero; effects are conditional.",
    "Studies differ in outcomes measured, populations and contexts.",
    "Most research concerns consumer products, not software interfaces.",
  ],
  misconceptions: [
    {
      myth: "The jam study proved that more choice always reduces sales.",
      reality:
        "It showed overload *can* happen in a specific context. Meta-analyses found the average effect across studies is close to zero {{src:scheibehenne-greifeneder-todd-2010}}.",
    },
    {
      myth: "Choice overload is Hick's law applied to shopping.",
      reality:
        "Hick-Hyman models reaction time in speeded perceptual choice; choice overload concerns motivation and satisfaction in preferential choice. They are different phenomena.",
    },
    {
      myth: "The fix for choice overload is always to remove options.",
      reality: "Often the better fix is structure — filters, comparisons, recommendations and defaults — which keeps useful options for people with clear preferences.",
    },
  ],

  relations: [
    { target: "hick-hyman-law", type: "contrasts-with", note: "Hick-Hyman models speeded reaction time among alternatives; choice overload concerns preferential decisions and satisfaction." },
    { target: "default-effect", type: "complementary-to", note: "Well-chosen defaults reduce the effort of large choice sets without removing options." },
    { target: "decision-fatigue", type: "related-to", note: "Both concern the cost of decision effort; decision fatigue focuses on accumulated decisions over time." },
    { target: "progressive-disclosure", type: "applied-in", note: "Disclosing advanced variants later reduces the apparent size and complexity of a choice." },
    { target: "faceted-navigation", type: "applied-in", note: "Faceted filters let users narrow large sets according to their own criteria." },
    { target: "ab-testing", type: "measured-by", note: "Whether changing assortment size helps or hurts should be tested, given the conditional evidence." },
  ],

  exercises: [
    {
      id: "choice-overload-ex-moderators",
      kind: "scenario",
      level: "intermediate",
      title: "Diagnose with the four moderators",
      prompt: [
        "A meal-kit service offers 45 recipes per week. Analytics show many new subscribers skip the week rather than choose, while long-term subscribers choose quickly.",
        "Assess each of the four moderators for new and for long-term subscribers, then propose design changes for new subscribers.",
      ],
      deliverable: "A two-column moderator assessment and three design changes.",
      criteria: [
        "Assesses complexity, task difficulty, preference uncertainty and decision goal",
        "Recognises that preference uncertainty differs between groups",
        "Proposes structure or defaults rather than only cutting recipes",
      ],
      exampleSolution: [
        "New subscribers: high preference uncertainty (don't know what they like yet), moderate complexity (many similar recipes), goal is choosing under a weekly deadline. Long-term subscribers: low uncertainty. Changes: pre-fill a recommended box based on onboarding answers (editable default); offer filters such as '30 minutes or less' and 'vegetarian'; show a short 'most popular this week' set first with the full list one tap away.",
      ],
    },
    {
      id: "choice-overload-ex-claim",
      kind: "critique",
      level: "beginner",
      title: "Fact-check a design article",
      prompt: [
        "Find an article or presentation that cites the jam study to argue for showing fewer options.",
        "Write a short correction note: what the study found, what later meta-analyses found, and how the article's advice could be made accurate.",
      ],
      deliverable: "A correction note of about 150 words.",
      criteria: ["Describes the study accurately", "Mentions the near-zero mean effect", "Reframes advice in terms of decision difficulty"],
    },
    {
      id: "choice-overload-ex-experiment",
      kind: "assignment",
      level: "advanced",
      title: "Design an experiment",
      prompt: [
        "Design an A/B test for a pricing page that currently shows five plans. Hypothesise whether a three-plan version or a five-plan version with a recommendation and comparison table will perform better.",
        "Specify primary and secondary metrics, sample considerations, and what result would lead you to keep all five plans.",
      ],
      deliverable: "A one-page experiment plan.",
      criteria: ["States a falsifiable hypothesis", "Includes satisfaction or refunds, not only conversion", "Considers segment differences"],
    },
  ],

  quiz: [
    {
      id: "choice-overload-q-meta",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "What did Scheibehenne, Greifeneder and Todd's (2010) meta-analysis find about choice overload?",
      options: [
        { text: "The mean effect across studies was virtually zero, with large differences between studies.", correct: true, explanation: "Some studies show overload, others the opposite, many none." },
        { text: "Every study replicated the jam result.", correct: false, explanation: "Results varied widely; many did not find overload." },
        { text: "More choice always increases sales.", correct: false, explanation: "That is not a general finding either; effects depend on conditions." },
        { text: "Choice overload only occurs with exactly 24 options.", correct: false, explanation: "There is no magic number." },
      ],
      explanation: "Overload is conditional, not general.",
    },
    {
      id: "choice-overload-q-moderator",
      kind: "scenario",
      level: "intermediate",
      prompt: "Which situation is MOST likely to produce choice overload according to Chernev et al. (2015)?",
      options: [
        { text: "First-time buyers choosing between many similar insurance policies with complex terms, needing to decide today.", correct: true, explanation: "High complexity, high task difficulty, high preference uncertainty and a choosing goal — all four moderators." },
        { text: "An expert photographer browsing a large lens catalogue for fun.", correct: false, explanation: "Low preference uncertainty and a browsing goal make overload unlikely." },
        { text: "A customer reordering their usual coffee from a large menu.", correct: false, explanation: "They already know what they want." },
        { text: "Choosing between two clearly different options.", correct: false, explanation: "A small set with a clear difference creates little difficulty." },
      ],
      explanation: "Look for complexity, difficulty, uncertainty and a goal of deciding now.",
    },
    {
      id: "choice-overload-q-hick",
      kind: "true-false",
      level: "advanced",
      prompt: "The Hick-Hyman law provides direct evidence for choice overload in online shopping.",
      options: [
        { text: "True", correct: false, explanation: "Hick-Hyman concerns speeded reaction time to stimuli, not preferential choice, motivation or satisfaction." },
        { text: "False", correct: true, explanation: "They are different phenomena from different research traditions; neither is evidence for the other." },
      ],
      explanation: "Avoid conflating decision time in perceptual tasks with the psychology of preference.",
    },
    {
      id: "choice-overload-q-fix",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Users abandon a page that lists 60 templates. Which response is best supported by the evidence?",
      options: [
        { text: "Add categories, filters and a recommended starting template, then test the change.", correct: true, explanation: "Reduces decision difficulty while keeping useful options; testing confirms the effect." },
        { text: "Delete 53 templates so exactly seven remain.", correct: false, explanation: "Arbitrary cuts harm users with clear preferences, and 'seven' is not evidence-based here." },
        { text: "Do nothing — choice overload is a myth.", correct: false, explanation: "It is conditional, not a myth; abandonment deserves investigation." },
        { text: "Show all 60 templates at a smaller size.", correct: false, explanation: "This increases comparison difficulty." },
      ],
      explanation: "Structure first, cuts only on evidence.",
    },
  ],

  flashcards: [
    { id: "choice-overload-fc-1", front: "Jam study result (Iyengar & Lepper, 2000)", back: "24 jams drew more visitors, but ≈3% bought vs ≈30% with 6 jams." },
    { id: "choice-overload-fc-2", front: "Meta-analytic mean effect of choice overload", back: "Approximately zero, with high heterogeneity (Scheibehenne et al., 2010)." },
    { id: "choice-overload-fc-3", front: "Four moderators (Chernev et al., 2015)", back: "Choice-set complexity, decision-task difficulty, preference uncertainty, decision goal." },
  ],

  references: [
    { source: "iyengar-lepper-2000", role: "primary", note: "Jam, essay and chocolate studies." },
    { source: "scheibehenne-greifeneder-todd-2010", role: "primary", note: "Meta-analysis: mean effect ≈ 0." },
    { source: "chernev-bockenholt-goodman-2015", role: "primary", note: "Meta-analysis of moderators." },
  ],
  evidence: "contested",
  evidenceNote:
    "The original demonstrations are real but the general claim does not hold: meta-analysis finds an average effect near zero with high heterogeneity. Overload is better supported as a **conditional** effect under complexity, task difficulty, preference uncertainty and choosing goals. Evidence from software interfaces specifically is limited.",

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
