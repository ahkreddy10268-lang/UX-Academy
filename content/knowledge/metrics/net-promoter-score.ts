import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "net-promoter-score",
  slug: "net-promoter-score",
  title: "Net Promoter Score (NPS)",
  alternateNames: ["NPS", "Likelihood to recommend (LTR)", "Net Promoter"],
  summary:
    "A loyalty metric from one 0–10 'likelihood to recommend' question: the percentage of promoters (9–10) minus the percentage of detractors (0–6). It is widely used, but its claimed link to growth is contested.",
  definition:
    "The Net Promoter Score is a customer-loyalty metric derived from a single question, 'How likely are you to recommend [X] to a friend or colleague?', answered from 0 to 10. Respondents scoring 9–10 are classed as **promoters**, 7–8 as **passives** and 0–6 as **detractors**. NPS = % promoters − % detractors, giving a range from −100 to +100 {{src:reichheld-2003}}.",
  primaryType: "metric",
  secondaryTypes: ["research-instrument"],
  domain: "metrics",
  subcategory: "product-metrics",
  tags: ["loyalty", "customer experience", "survey", "recommendation", "business metric"],
  difficulty: "beginner",
  disciplines: ["Customer experience", "Marketing research", "Product management", "UX research"],
  learningObjectives: [
    "Calculate NPS and its margin of error from raw responses.",
    "Explain what NPS measures (stated recommendation intent) and what it does not (usability, actual behaviour).",
    "Critically evaluate claims that NPS predicts business growth.",
    "Decide when NPS is useful and how to report it responsibly.",
  ],
  prerequisites: ["surveys"],

  levels: {
    beginner: {
      explanation: [
        "NPS asks people one question: on a scale from 0 to 10, how likely are they to recommend a product to a friend or colleague? Answers are sorted into three groups: **promoters** (9 or 10), **passives** (7 or 8) and **detractors** (0 to 6).",
        "The score is the percentage of promoters minus the percentage of detractors. If 50% are promoters and 20% are detractors, the NPS is +30. Passives count in the total but do not change the score directly.",
        "NPS is popular because it is simple and easy to track over time. It measures what people **say** they would do, not what they actually do, and not whether the product is easy to use.",
      ],
      analogy:
        "NPS is like asking dinner guests whether they would recommend the restaurant: a quick signal of goodwill, but it will not tell you whether the problem was the food, the service or the bill.",
      everydayExamples: [
        "The 'How likely are you to recommend us?' email after a delivery or support call.",
        "A quarterly NPS figure reported to a company's leadership team.",
        "An in-app pop-up asking for a 0–10 rating, followed by 'What is the main reason for your score?'.",
      ],
      vocabulary: [
        { term: "Promoter", meaning: "Someone who answers 9 or 10." },
        { term: "Passive", meaning: "Someone who answers 7 or 8; included in the total, excluded from the subtraction." },
        { term: "Detractor", meaning: "Someone who answers 0 to 6." },
        { term: "Margin of error", meaning: "How much the score could plausibly differ from the true value because only a sample was surveyed." },
      ],
    },
    intermediate: {
      explanation: [
        "Treat each response as +1 (promoter), 0 (passive) or −1 (detractor). NPS is the mean of these values × 100. Thinking of it this way makes uncertainty easy to calculate: the variance of a single response is p_P + p_D − (p_P − p_D)², so the standard error of NPS is 100 × √(variance / n).",
        "Because it collapses an 11-point scale into three categories and then subtracts two proportions, **NPS is noisy**. Small samples produce wide margins of error: ±10 points or more at n = 200 is typical. Many reported changes of a few points are not distinguishable from noise.",
        "NPS is most useful as a **relationship-level tracking metric** combined with an open follow-up question ('why?'). The verbatim reasons, coded thematically, usually carry more design insight than the number.",
      ],
      howItWorks: [
        "The thresholds (9–10, 7–8, 0–6) were set by Reichheld's original research and are conventions; they are not empirically optimal for every culture or category {{src:reichheld-2003}}.",
        "Response styles (for example, reluctance to use the top of a scale) differ between cultures and groups, so cross-country comparisons of NPS can mislead.",
        "Transactional NPS (after a specific interaction) and relationship NPS (overall brand view) answer different questions and should not be mixed.",
      ],
      implementation: [
        "Ask the standard question, then an open 'what is the main reason for your score?' follow-up.",
        "Report n, the margin of error and the distribution (% promoters, passives, detractors), not just the net number.",
        "Segment by customer type and journey stage before acting.",
        "Do not tie individual staff incentives to NPS; this invites gaming (for example, asking customers for a 10).",
        "Pair with behavioural data such as retention, referrals and repeat purchase to check whether stated intent matches behaviour.",
      ],
      scenarios: [
        "NPS moves from +32 to +35 with n = 300 per wave. The margin of error is roughly ±9, so this is not a meaningful change.",
        "Two products both score +20: one has 40% promoters and 20% detractors, the other 25% and 5%. The distributions describe very different customer bases.",
      ],
    },
    advanced: {
      explanation: [
        "Reichheld (2003) claimed in *Harvard Business Review* that this single question predicted company growth better than other satisfaction measures across many industries {{src:reichheld-2003}}. The article was a practitioner publication and its underlying data were not published for independent peer review.",
        "Keiningham, Cooil, Andreassen and Aksoy (2007) tested the growth claim longitudinally with Norwegian customer data and found that NPS did **not** predict revenue growth better than other measures such as the ACSI satisfaction index {{src:keiningham-et-al-2007}}. This is the core of the academic critique: NPS is a reasonable loyalty indicator, but no better than alternatives, and not 'the one number'.",
        "Statistically, NPS discards information. Analysing the full 0–10 distribution (mean and confidence interval) is more powerful for detecting differences, so NPS needs larger samples than the mean of the same item {{src:sauro-lewis-2016}}.",
      ],
      evidence: [
        "The original claim of superior growth prediction rests on proprietary analyses described in a practitioner article {{src:reichheld-2003}}.",
        "Peer-reviewed longitudinal analysis did not replicate NPS's claimed superiority as a predictor of growth {{src:keiningham-et-al-2007}}.",
        "Like any correlation between an attitude and a business outcome, an association between NPS and growth would not show that raising NPS *causes* growth. Both may reflect underlying product quality.",
      ],
      debates: [
        "**Single-item validity.** Single questions are fast but less reliable than multi-item scales; NPS's reliability depends heavily on sample size.",
        "**Thresholds.** Why 0–6 as detractors? The cut-points are conventions, and alternative codings change conclusions.",
        "**Use in UX.** Some teams use NPS as a usability proxy. It correlates with perceived usability, but it measures a broader attitude influenced by price, brand and support.",
      ],
      alternativeModels: [
        "**[[csat|CSAT]]**: satisfaction with a specific interaction; more transactional.",
        "**[[ces|Customer Effort Score]]**: how easy it was to get something done; closer to usability.",
        "**[[system-usability-scale|SUS]]**: perceived usability with a validated multi-item scale.",
        "**Mean likelihood-to-recommend with a CI**: same question, more statistical power.",
      ],
    },
  },

  origin: {
    contributors: ["Frederick F. Reichheld", "Bain & Company", "Satmetrix"],
    period: "2003",
    problem:
      "Executives wanted a simple, actionable loyalty measure that could replace long satisfaction surveys and connect customer attitudes to growth.",
    narrative: [
      "Reichheld introduced NPS in his December 2003 *Harvard Business Review* article, presenting it as the single most useful predictor of growth {{src:reichheld-2003}}.",
      "NPS spread rapidly in corporate reporting. Academic researchers then tested its predictive claims, with critical results {{src:keiningham-et-al-2007}}.",
    ],
    attributionNote:
      "'Net Promoter' and 'NPS' are registered trademarks of their owners (associated with Bain & Company, Satmetrix and Fred Reichheld). The calculation is widely used regardless.",
  },

  application: {
    summary: [
      "For designers, NPS is mainly a **business context signal**. Its open-text reasons are useful input for research, but it is a poor instrument for evaluating a specific design change.",
    ],
    web: [
      "Run relationship NPS by email to established customers; route verbatim reasons into thematic analysis.",
    ],
    mobile: [
      "Avoid interrupting key tasks with NPS prompts. Ask after a natural endpoint, and throttle frequency.",
    ],
    enterprise: [
      "Segment by role: the buyer's NPS and the daily user's NPS can diverge sharply.",
    ],
    services: [
      "Use transactional NPS after service moments only if the question is about that moment; CES or CSAT is often more precise.",
    ],
    steps: [
      "Define relationship versus transactional NPS and the sampling frame.",
      "Ask the 0–10 question plus an open 'why?'.",
      "Compute % promoters, % detractors, NPS and the margin of error.",
      "Segment and code the verbatim reasons into themes.",
      "Track trends with uncertainty; validate against behavioural outcomes.",
    ],
  },

  whenToUse: [
    "Tracking broad customer sentiment over time at relationship level, with large samples.",
    "Collecting open-text reasons that point to experience problems worth researching.",
    "Communicating with stakeholders who already use NPS, alongside more precise measures.",
  ],
  whenNotToUse: [
    "Evaluating a specific UI change or comparing prototypes. Use task metrics, SUS or A/B tests.",
    "With small samples, where the margin of error swamps any change.",
    "As an individual performance target, which invites gaming.",
    "As evidence of causation between experience and growth.",
  ],
  advantages: [
    "Extremely quick for respondents.",
    "Widely understood by business stakeholders.",
    "The open follow-up question yields rich qualitative data.",
  ],
  limitations: [
    "A single item with arbitrary thresholds; discards information.",
    "High sampling variability.",
    "Measures stated intent, not behaviour.",
    "Claims of superior growth prediction are not supported by peer-reviewed tests.",
    "Sensitive to cultural response styles and to survey timing.",
  ],
  misconceptions: [
    {
      myth: "NPS is a percentage, so +40 means 40% of customers are happy.",
      reality: "NPS is a *difference* between two percentages, ranging from −100 to +100. +40 could be 40% promoters and 0% detractors, or 70% and 30%.",
    },
    {
      myth: "Research has proven that NPS predicts growth better than any other metric.",
      reality: "That claim came from a practitioner article; peer-reviewed longitudinal research did not find NPS superior to other satisfaction measures.",
    },
    {
      myth: "An increase from +30 to +34 shows the redesign worked.",
      reality: "Typical NPS margins of error are wider than 4 points, and many other factors influence NPS. Use designed experiments for causal questions.",
    },
  ],

  relations: [
    { target: "csat", type: "related-to", note: "CSAT measures satisfaction with a specific interaction; NPS measures broader recommendation intent." },
    { target: "ces", type: "contrasts-with", note: "Customer Effort Score focuses on ease of getting something done, closer to usability than NPS." },
    { target: "system-usability-scale", type: "contrasts-with", note: "SUS is a validated multi-item usability measure; NPS is a single-item loyalty measure." },
    { target: "confidence-intervals", type: "complementary-to", note: "NPS should be reported with its margin of error, derived from the trinomial variance." },
    { target: "surveys", type: "applied-in", note: "NPS is collected through survey instruments and inherits their sampling biases." },
    { target: "heart-framework", type: "related-to", note: "In HEART, attitudinal 'Happiness' signals may include NPS, but HEART pairs them with behavioural metrics." },
  ],

  formulas: [
    {
      id: "nps-score",
      name: "Net Promoter Score with margin of error",
      expression: "NPS = 100 × (P − D) / n      SE = 100 × √[ (p_P + p_D − (p_P − p_D)²) / n ]",
      contributor: "Reichheld (2003); standard error from the variance of a +1/0/−1 coding",
      source: "reichheld-2003",
      variables: [
        { symbol: "P", name: "Promoters", unit: "count", description: "Responses of 9 or 10." },
        { symbol: "D", name: "Detractors", unit: "count", description: "Responses of 0 to 6." },
        { symbol: "n", name: "Total responses", unit: "count", description: "All valid responses, including passives (7–8)." },
        { symbol: "p_P, p_D", name: "Proportions", unit: "0–1", description: "P/n and D/n." },
        { symbol: "SE", name: "Standard error", unit: "NPS points", description: "Margin of error at 95% ≈ 1.96 × SE." },
      ],
      resultUnit: "NPS points (−100 to +100)",
      assumptions: [
        "Respondents are a random or representative sample of the population of interest.",
        "Responses are independent.",
        "n is large enough for a normal approximation (roughly n ≥ 30 in each comparison group, more for extreme proportions).",
      ],
      conditions: [
        "Compare NPS only between samples collected with the same question, timing and population definition.",
        "Report the distribution as well as the net score.",
      ],
      steps: [
        "Count promoters (9–10), passives (7–8) and detractors (0–6).",
        "Compute p_P = P/n and p_D = D/n.",
        "NPS = 100 × (p_P − p_D).",
        "Variance per response = p_P + p_D − (p_P − p_D)².",
        "SE = 100 × √(variance / n); 95% margin ≈ 1.96 × SE.",
      ],
      workedExample: {
        given: ["n = 200 responses: 90 promoters, 70 passives, 40 detractors."],
        steps: [
          "p_P = 0.45, p_D = 0.20 → NPS = 100 × (0.45 − 0.20) = +25",
          "Variance = 0.45 + 0.20 − 0.25² = 0.65 − 0.0625 = 0.5875",
          "SE = 100 × √(0.5875 / 200) ≈ 5.42",
          "95% margin ≈ 1.96 × 5.42 ≈ 10.6 → interval ≈ +14.4 to +35.6",
        ],
        result: "NPS = +25 (95% CI ≈ +14 to +36). A single wave of 200 responses cannot distinguish +25 from +20 or +30.",
      },
      interpretation: [
        "Interpret NPS as a range, not a point. Trends need consistent methods and enough data.",
        "Benchmarks vary greatly by industry and region; compare like with like.",
      ],
      commonErrors: [
        "Excluding passives from n.",
        "Reporting NPS as a percentage.",
        "Ignoring the margin of error when comparing waves.",
        "Treating NPS changes as caused by a specific design change without an experiment.",
      ],
      limitations: [
        "Coarse categorisation loses information.",
        "The normal approximation is poor for small n or extreme proportions.",
        "Measures intent, not behaviour.",
      ],
      alternatives: [
        { name: "Mean likelihood to recommend", expression: "x̄ of the 0–10 responses ± t·s/√n", note: "Uses all the information; more statistically powerful." },
      ],
      calculator: "nps",
    },
  ],

  exercises: [
    {
      id: "net-promoter-score-ex-calc",
      kind: "calculation",
      level: "beginner",
      title: "Calculate an NPS",
      prompt: [
        "In a survey of 80 customers, 32 answered 9–10, 28 answered 7–8, and 20 answered 0–6. Calculate the NPS.",
      ],
      deliverable: "The NPS and the three percentages.",
      criteria: ["Uses all 80 as the denominator", "Reports a net score between −100 and +100"],
      exampleSolution: [
        "Promoters 32/80 = 40%; passives 28/80 = 35%; detractors 20/80 = 25%. NPS = 40 − 25 = +15.",
      ],
    },
    {
      id: "net-promoter-score-ex-critique",
      kind: "critique",
      level: "advanced",
      title: "Challenge an NPS claim",
      prompt: [
        "A slide says: 'Our redesign raised NPS from +18 to +24 (n = 150 per wave), proving it will drive growth.' Write a three-point critique covering uncertainty, causality and construct validity, and propose a better way to evaluate the redesign.",
      ],
      criteria: [
        "Estimates the margin of error",
        "Separates association from causation",
        "Notes that NPS is not a usability measure",
        "Proposes task metrics, SUS or an A/B test",
      ],
    },
  ],

  quiz: [
    {
      id: "net-promoter-score-q-calc",
      kind: "formula",
      level: "beginner",
      prompt: "100 responses: 60 promoters, 25 passives, 15 detractors. What is the NPS?",
      options: [
        { text: "+45", correct: true, explanation: "60% − 15% = +45." },
        { text: "+60", correct: false, explanation: "This reports promoters only." },
        { text: "−45", correct: false, explanation: "This subtracts promoters from detractors; NPS is promoters minus detractors." },
        { text: "85%", correct: false, explanation: "NPS is not the share of non-detractors, and it is not a percentage." },
      ],
      explanation: "NPS = % promoters − % detractors, with passives in the denominator.",
    },
    {
      id: "net-promoter-score-q-evidence",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "What did Keiningham et al. (2007) find about NPS?",
      options: [
        { text: "NPS predicted revenue growth better than all other measures.", correct: false, explanation: "This was Reichheld's claim, which the study did not support." },
        { text: "NPS did not outperform other satisfaction measures in predicting growth.", correct: true, explanation: "Their longitudinal analysis found no evidence of NPS's claimed superiority." },
        { text: "NPS is a validated measure of usability.", correct: false, explanation: "The study was about growth prediction, and NPS does not measure usability." },
        { text: "NPS thresholds should be 8–10 for promoters.", correct: false, explanation: "The study did not propose new thresholds." },
      ],
      explanation: "The peer-reviewed evidence treats NPS as an ordinary loyalty indicator, not a uniquely predictive one.",
      revise: "net-promoter-score",
    },
    {
      id: "net-promoter-score-q-usability",
      kind: "scenario",
      level: "intermediate",
      prompt: "You need to know whether a new onboarding flow is easier to complete. Which measure is LEAST appropriate on its own?",
      options: [
        { text: "Task success rate in a usability test", correct: false, explanation: "Directly measures whether people can complete onboarding." },
        { text: "Net Promoter Score from all customers", correct: true, explanation: "NPS reflects broad recommendation intent influenced by many factors beyond onboarding ease." },
        { text: "Time on task", correct: false, explanation: "Directly measures efficiency of the flow." },
        { text: "A post-task ease rating", correct: false, explanation: "Directly measures perceived ease of the specific task." },
      ],
      explanation: "Match the metric to the question: NPS is too broad to evaluate a specific flow.",
    },
  ],

  flashcards: [
    { id: "net-promoter-score-fc-def", front: "NPS formula", back: "% promoters (9–10) − % detractors (0–6); range −100 to +100." },
    { id: "net-promoter-score-fc-critique", front: "Main academic critique of NPS", back: "No evidence it predicts growth better than other satisfaction metrics (Keiningham et al., 2007)." },
  ],

  references: [
    { source: "reichheld-2003", role: "primary", note: "Introduced NPS and its growth claim (practitioner article)." },
    { source: "keiningham-et-al-2007", role: "primary", note: "Peer-reviewed test of the growth claim." },
    { source: "sauro-lewis-2016", role: "explanatory", note: "Statistical treatment of NPS and likelihood-to-recommend." },
  ],
  evidence: "contested",
  evidenceNote:
    "NPS is a widely adopted business convention. The central claim that it predicts growth better than other measures comes from a practitioner publication and was not supported in peer-reviewed tests. It is defensible as a coarse loyalty indicator with large samples, but not as a usability measure or as causal evidence.",

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
