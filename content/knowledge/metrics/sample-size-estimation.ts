import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "sample-size-estimation",
  slug: "sample-size-estimation",
  title: "Sample Size Estimation",
  alternateNames: ["Power analysis", "Sample size calculation", "How many participants?"],
  summary:
    "Deciding before a study how many participants or users you need, from the precision you want or the smallest effect you need to detect. The answer depends on the question, and '5 users' and '10,000 per arm' answer different questions.",
  definition:
    "Sample size estimation is the technique of determining, before data collection, the number of observations needed to achieve a stated **precision** (margin of error) for an estimate, or a stated **statistical power** to detect a minimum effect at a chosen significance level. It formalises the trade-off between cost and the risk of misleading results {{src:cohen-1992}}.",
  primaryType: "technique",
  secondaryTypes: ["formula"],
  domain: "metrics",
  subcategory: "experimental-design",
  tags: ["power", "precision", "margin of error", "research planning", "A/B testing", "statistics"],
  difficulty: "intermediate",
  disciplines: ["Statistics", "UX research", "Experimentation"],
  learningObjectives: [
    "Distinguish the three kinds of sample-size question: precision, comparison (power) and problem discovery.",
    "Calculate sample sizes for a proportion, a mean and a two-proportion A/B test.",
    "Explain how baseline rate, effect size, α and power drive the result.",
    "Avoid the 'five users is always enough' and 'more is always better' fallacies.",
  ],
  prerequisites: ["confidence-intervals", "statistical-power"],

  levels: {
    beginner: {
      explanation: [
        "How many people do you need for a study? The honest answer is: **it depends on what you want to know.** Finding the main problems in a design, estimating a number precisely, and proving that one design beats another are three different goals, and they need very different numbers of people.",
        "If you want a precise estimate, such as 'what percentage of customers use dark mode?', you need enough people for the margin of error to be small. About 385 people gives roughly ±5 percentage points for a percentage near 50%.",
        "If you want to show a **difference** between designs, the size you need depends on how big the difference is. Big differences show up with modest samples. Small differences, such as conversion moving from 5% to 6%, need thousands of users in each group.",
      ],
      analogy:
        "Choosing a sample size resembles choosing a camera lens: to photograph a mountain (a big effect) any lens works; to photograph a distant bird (a small effect) you need a powerful zoom (a large sample).",
      everydayExamples: [
        "A survey team plans 400 responses to estimate a percentage within about ±5 points.",
        "A product team learns its A/B test needs about 8,000 users per variant to detect a 5% → 6% change, and decides to test a bolder idea instead.",
        "A researcher runs five participants per round of formative usability testing to find major problems, not to estimate rates.",
      ],
      vocabulary: [
        { term: "Margin of error (E)", meaning: "The half-width of the confidence interval you are willing to accept." },
        { term: "Effect size", meaning: "How large the difference you want to detect is." },
        { term: "Significance level (α)", meaning: "The false-positive rate you accept, usually 5%." },
        { term: "Power (1 − β)", meaning: "The chance of detecting a real effect of the planned size, usually 80%." },
      ],
    },
    intermediate: {
      explanation: [
        "**Precision planning** (estimating one value): for a proportion, n = z²·p(1 − p)/E². Use p = 0.5 when unknown, because it gives the largest n. For a mean, n = (z·σ/E)², with σ from a pilot or earlier study. Round up.",
        "**Comparison planning** (detecting a difference): for two proportions with equal groups, n per group = (z₁₋α/₂·√(2p̄q̄) + z₁₋β·√(p₁q₁ + p₂q₂))² / (p₁ − p₂)², where p̄ is the average of p₁ and p₂ and q = 1 − p. Sample size grows with the inverse **square** of the effect: halving the detectable difference roughly quadruples n {{src:cohen-1988}}.",
        "**Problem-discovery planning** (formative usability testing) answers a different question: how many participants to observe problems that affect a given proportion of users. It uses the model 1 − (1 − p)ⁿ (see [[usability-testing]]), which applies to discovering problems, not to estimating rates or comparing designs.",
      ],
      howItWorks: [
        "z-values come from the standard normal distribution: 1.96 for two-sided α = 0.05, 0.84 for 80% power, 1.28 for 90% power.",
        "Smaller α or higher power both increase n. Choosing 90% power instead of 80% increases n by roughly a third.",
        "For means with small samples, the normal formula slightly underestimates n. Iterate with t-values, or add a few participants.",
      ],
      implementation: [
        "State the question type first: estimate, compare, or discover.",
        "Choose the minimum effect or margin that would change a decision, not the effect you hope for.",
        "Get the baseline (conversion rate, SD) from analytics or a pilot.",
        "Compute n, round up, and inflate for expected drop-out or exclusions.",
        "If n is infeasible, change the question (bigger effect, different metric, qualitative method), not the arithmetic.",
      ],
      scenarios: [
        "A benchmark wants SUS within ±5 points; with σ ≈ 15, n ≈ 35 participants.",
        "A B2B tool has 600 weekly users, and detecting a 1-point conversion change would take months. The team uses a within-subjects usability study plus qualitative research instead.",
        "Formative testing: three rounds of five participants with design changes between rounds rather than one round of fifteen.",
      ],
    },
    advanced: {
      explanation: [
        "Cohen's power primer framed the problem in terms of four interdependent quantities: α, power, effect size and n. Fixing any three determines the fourth. He proposed conventional small, medium and large effect sizes as a fallback when no field-specific basis exists {{src:cohen-1992}} {{src:cohen-1988}}.",
        "Underpowered studies do more than miss effects. Conditional on reaching significance, their estimated effects are exaggerated, because only the luckiest samples cross the threshold. Planning for adequate power and reporting intervals reduces this problem {{src:greenland-et-al-2016}}.",
        "Online experiments add complications: metric variance can be reduced with pre-experiment covariates, unequal allocations change n, and continuous metrics need variance estimates from historical data {{src:kohavi-tang-xu-2020}}. Post-hoc 'observed power' calculated after a non-significant result adds no information beyond the p-value and should be avoided.",
      ],
      evidence: [
        "The power framework and conventional effect sizes are set out by Cohen {{src:cohen-1988}} {{src:cohen-1992}}.",
        "Large-scale experimentation practice relies on pre-computed sample sizes and minimum detectable effects {{src:kohavi-tang-xu-2020}}.",
      ],
      debates: [
        "**Cohen's conventions.** Using 'medium effect' by default is criticised; the minimum effect should come from the decision context.",
        "**Five users.** Problem-discovery models suggest small samples find most frequent problems, but assumptions about problem probability (p) and participant homogeneity are often violated. The debate concerns formative testing only.",
        "**Precision vs. power planning.** Some statisticians advocate planning for interval width rather than power, consistent with estimation thinking.",
      ],
      alternativeModels: [
        "**Sequential designs** adjust the sample as data arrive, with valid stopping rules.",
        "**Bayesian sample-size planning** targets posterior precision or decision value.",
        "**Simulation-based power analysis**: for complex designs, simulate data under assumed effects to estimate power.",
      ],
    },
  },

  origin: {
    contributors: ["Jacob Cohen (power analysis in the behavioural sciences)"],
    period: "Statistical power formalised in the 1930s; popularised for behavioural research by Cohen (1960s–1992)",
    problem:
      "Many studies were too small to detect the effects they sought, wasting effort and producing unreliable conclusions. Researchers needed a practical way to plan sample sizes.",
    narrative: [
      "Cohen's *Statistical Power Analysis for the Behavioral Sciences* (2nd ed., 1988) and his short 1992 primer made power analysis accessible to applied researchers {{src:cohen-1988}} {{src:cohen-1992}}.",
      "In UX, the field developed separate sample-size thinking for formative (problem discovery) and summative (estimation and comparison) studies {{src:sauro-lewis-2016}}.",
    ],
  },

  application: {
    summary: [
      "Sample size planning turns 'How many users should we test?' into a reasoned decision tied to the research question and the decision at stake.",
    ],
    web: [
      "Before launching an A/B test, compute per-arm n and duration from current traffic; if it exceeds a few weeks, rethink the test.",
    ],
    mobile: [
      "For in-app surveys, compute n for the margin you need per segment (iOS vs. Android), not just overall.",
    ],
    enterprise: [
      "With small populations, apply a finite population correction, and prefer within-subjects designs, which need fewer participants.",
    ],
    services: [
      "Plan survey samples per channel or region if decisions will be made per channel.",
    ],
    steps: [
      "Classify the question: estimate, compare or discover.",
      "Set α, power or margin, and the minimum effect that matters.",
      "Obtain baselines (rates, SDs) from data or a pilot.",
      "Compute n with the matching formula; round up.",
      "Adjust for drop-out, exclusions and segments; check feasibility and revise the question if needed.",
    ],
  },

  whenToUse: [
    "Before any summative study, survey or A/B test.",
    "When negotiating research scope and budget with stakeholders.",
    "When deciding whether an experiment is feasible at current traffic.",
  ],
  whenNotToUse: [
    "Formative qualitative research aimed at understanding, where saturation and iteration matter more than statistical power.",
    "After the fact, to justify a non-significant result with 'observed power'.",
  ],
  advantages: [
    "Prevents underpowered studies and wasted effort.",
    "Makes trade-offs explicit and defensible.",
    "Forces a clear statement of the minimum effect that matters.",
  ],
  limitations: [
    "Depends on assumed baselines and variances, which may be wrong.",
    "Normal-approximation formulas are less accurate for small n or rates near 0 or 1.",
    "Does not address bias, sample representativeness or measurement validity.",
  ],
  misconceptions: [
    {
      myth: "Five users are enough for any usability study.",
      reality: "Small samples can surface frequent problems in formative tests. Estimating a success rate or comparing designs needs far larger samples.",
    },
    {
      myth: "A bigger sample is always better.",
      reality: "Beyond the needed precision, extra participants cost money and time and can make trivial effects 'significant'. Plan for the effect that matters.",
    },
    {
      myth: "If my test wasn't significant, I can compute its power to show the effect doesn't exist.",
      reality: "Post-hoc observed power is a transformation of the p-value and cannot establish absence of an effect. Report the confidence interval instead.",
    },
  ],

  relations: [
    { target: "statistical-power", type: "derived-from", note: "Comparison sample sizes are derived from the desired statistical power." },
    { target: "ab-testing", type: "applied-in", note: "Every A/B test needs a pre-computed per-arm sample size and duration." },
    { target: "confidence-intervals", type: "related-to", note: "Precision planning sets n so the interval's margin of error meets a target." },
    { target: "usability-testing", type: "contrasts-with", note: "Formative usability tests use problem-discovery models rather than power or precision calculations." },
    { target: "effect-size", type: "related-to", note: "The minimum effect size to detect is the main driver of the required sample." },
    { target: "sampling", type: "complementary-to", note: "Sample size says how many; sampling strategy says who, which determines representativeness." },
  ],

  formulas: [
    {
      id: "sample-size-formulas",
      name: "Sample size for a proportion, a mean and a two-proportion comparison",
      expression: "n = z²·p(1 − p) / E²      n = (z·σ / E)²      n per group = [ z₁₋α/₂·√(2p̄q̄) + z₁₋β·√(p₁q₁ + p₂q₂) ]² / (p₁ − p₂)²",
      contributor: "Standard normal-approximation formulas; power framework after Cohen (1988, 1992)",
      source: "cohen-1992",
      variables: [
        { symbol: "z", name: "Critical value for confidence", unit: "—", description: "1.96 for 95% (two-sided)." },
        { symbol: "z₁₋β", name: "Critical value for power", unit: "—", description: "0.84 for 80% power, 1.28 for 90%." },
        { symbol: "p", name: "Expected proportion", unit: "0–1", description: "Use 0.5 if unknown (most conservative)." },
        { symbol: "E", name: "Margin of error", unit: "proportion or unit of the mean", description: "Desired half-width of the interval." },
        { symbol: "σ", name: "Standard deviation", unit: "unit of the measure", description: "From a pilot, earlier data or literature." },
        { symbol: "p₁, p₂", name: "Baseline and target proportions", unit: "0–1", description: "The difference p₂ − p₁ is the minimum detectable effect." },
        { symbol: "p̄, q̄", name: "Average proportion and complement", unit: "0–1", description: "p̄ = (p₁ + p₂)/2, q̄ = 1 − p̄." },
      ],
      resultUnit: "participants or users (round up); per group for comparisons",
      assumptions: [
        "Random sampling or random assignment; independent observations.",
        "Normal approximation is adequate (moderate-to-large n, proportions not extreme).",
        "Baseline estimates (p, σ) are reasonably accurate.",
      ],
      conditions: [
        "Precision formulas for estimating a single proportion or mean.",
        "Two-proportion formula for equal-size A/B groups with a two-sided test.",
      ],
      steps: [
        "Choose confidence (z) and, for comparisons, power (z₁₋β).",
        "Set E (precision) or p₁ and p₂ (comparison).",
        "Insert baselines and compute.",
        "Round up to the next whole number.",
        "Inflate for drop-out or exclusions (n / (1 − expected loss)).",
      ],
      workedExample: {
        given: [
          "(a) Proportion: p = 0.5, E = 0.05, 95% confidence.",
          "(b) Mean: σ = 15 SUS points, E = 5, 95% confidence.",
          "(c) A/B: p₁ = 5%, p₂ = 6%, α = 0.05 two-sided, power 80%.",
        ],
        steps: [
          "(a) n = 1.96² × 0.25 / 0.0025 = 3.8416 × 100 = 384.2 → 385",
          "(b) n = (1.96 × 15 / 5)² = 5.88² ≈ 34.6 → 35",
          "(c) p̄ = 0.055: √(2 × 0.055 × 0.945) ≈ 0.3224; √(0.05×0.95 + 0.06×0.94) ≈ 0.3223",
          "(c) n = (1.96 × 0.3224 + 0.8416 × 0.3223)² / 0.01² ≈ (0.9032)² / 0.0001 ≈ 8,158",
        ],
        result: "(a) 385 respondents; (b) 35 participants; (c) about 8,158 users per variant (≈16,300 in total).",
      },
      interpretation: [
        "If the required n is infeasible, the study cannot answer that question at that precision. Change the question, the metric or the method.",
        "Comparison sample sizes scale with 1/(difference)²: detecting a 0.5-point change needs about four times as many users as a 1-point change.",
      ],
      commonErrors: [
        "Using the per-group formula result as the total sample.",
        "Planning for an optimistic effect size.",
        "Forgetting to round up or to allow for drop-out.",
        "Applying precision formulas to formative problem-discovery studies.",
      ],
      limitations: [
        "Normal approximation; less accurate for small n or extreme p.",
        "Sensitive to wrong baselines.",
        "Does not account for clustering or repeated measures without adjustment.",
      ],
      alternatives: [
        { name: "Finite population correction", expression: "n_adj = n / (1 + (n − 1)/N)", note: "When sampling a large fraction of a small population N." },
        { name: "Problem discovery (formative)", expression: "P(found) = 1 − (1 − p)ⁿ", note: "Probability of observing a problem affecting proportion p at least once in n participants." },
      ],
      calculator: "sample-size",
    },
  ],

  exercises: [
    {
      id: "sample-size-estimation-ex-survey",
      kind: "calculation",
      level: "beginner",
      title: "Plan a survey",
      prompt: [
        "You want to estimate the percentage of users who use keyboard shortcuts, within ±4 percentage points at 95% confidence, with no prior estimate. How many responses do you need? If you expect 20% of responses to be unusable, how many should you collect?",
      ],
      criteria: ["Uses p = 0.5", "Rounds up", "Inflates for exclusions"],
      exampleSolution: [
        "n = 1.96² × 0.25 / 0.04² = 0.9604 / 0.0016 = 600.25 → 601. Collect 601 / 0.8 ≈ 752 (round up to 752).",
      ],
    },
    {
      id: "sample-size-estimation-ex-ab",
      kind: "calculation",
      level: "intermediate",
      title: "Is this A/B test feasible?",
      prompt: [
        "Baseline sign-up rate is 10%. The team wants to detect an increase to 11% with 80% power at α = 0.05. The page gets 3,000 visitors per day, split 50/50. Compute the per-arm sample size and the test duration. What would you recommend?",
      ],
      criteria: ["Correct per-arm n", "Duration from traffic", "Recommendation weighs feasibility"],
      exampleSolution: [
        "p̄ = 0.105. n ≈ (1.96 × √(2 × 0.105 × 0.895) + 0.8416 × √(0.1 × 0.9 + 0.11 × 0.89))² / 0.01² ≈ (1.96 × 0.4335 + 0.8416 × 0.4334)² / 0.0001 ≈ 14,751 per arm.",
        "Total ≈ 29,500 visitors ≈ 10 days. Run for two full weeks to cover weekly cycles, which also gives a margin for exclusions.",
      ],
    },
    {
      id: "sample-size-estimation-ex-reflect",
      kind: "reflection",
      level: "advanced",
      title: "Which question are you asking?",
      prompt: [
        "For each request, state whether it is an estimation, comparison or discovery question, and propose an appropriate sample-size approach: (1) 'Find out what confuses people in onboarding.' (2) 'Is our checkout success rate above 85%?' (3) 'Does the new pricing page increase upgrades?'",
      ],
      criteria: ["Correct classification for each", "Appropriate method for each"],
    },
  ],

  quiz: [
    {
      id: "sample-size-estimation-q-effect",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "An A/B test plan needs 4,000 users per arm to detect a 2-percentage-point lift. Roughly how many are needed to detect a 1-point lift (same baseline, α and power)?",
      options: [
        { text: "About 2,000 per arm", correct: false, explanation: "Smaller effects need more data, not less." },
        { text: "About 8,000 per arm", correct: false, explanation: "n scales with the inverse square of the effect, not linearly." },
        { text: "About 16,000 per arm", correct: true, explanation: "Halving the effect roughly quadruples n: 4,000 × 4 ≈ 16,000." },
        { text: "About 4,000 per arm", correct: false, explanation: "The detectable effect strongly affects the required n." },
      ],
      explanation: "Sample size ∝ 1/(difference)², so small effects are expensive to detect.",
    },
    {
      id: "sample-size-estimation-q-five",
      kind: "scenario",
      level: "beginner",
      prompt: "A manager says: 'Nielsen says five users are enough, so test five and tell me the success rate for the whole customer base.' What is the best response?",
      options: [
        { text: "Agree: five users give an accurate success rate.", correct: false, explanation: "Five users give a very wide interval for a rate." },
        { text: "Five users can reveal common problems, but a precise success rate needs a larger sample; here is the interval we would get.", correct: true, explanation: "Separate problem discovery from estimation and show the uncertainty." },
        { text: "Refuse to test until 1,000 users are available.", correct: false, explanation: "Formative testing with small samples is valuable; just ask the right question." },
        { text: "Test five users twice and average.", correct: false, explanation: "That is still ten users, and changes nothing about the precision question." },
      ],
      explanation: "Match the sample-size logic to the question: discovery and estimation are different.",
    },
    {
      id: "sample-size-estimation-q-p",
      kind: "true-false",
      level: "intermediate",
      prompt: "When estimating a proportion with no prior information, using p = 0.5 gives the largest (most conservative) sample size.",
      options: [
        { text: "True", correct: true, explanation: "p(1 − p) is maximised at p = 0.5, so the required n is largest there." },
        { text: "False", correct: false, explanation: "p(1 − p) peaks at 0.25 when p = 0.5." },
      ],
      explanation: "p = 0.5 is the safe default when the expected proportion is unknown.",
    },
  ],

  flashcards: [
    { id: "sample-size-estimation-fc-prop", front: "Sample size for a proportion (precision)", back: "n = z²·p(1 − p)/E²; ≈ 385 for ±5 points at 95% with p = 0.5." },
    { id: "sample-size-estimation-fc-four", front: "Four quantities in power analysis", back: "α, power, effect size and n: fix three to determine the fourth." },
    { id: "sample-size-estimation-fc-square", front: "Effect size vs. sample size", back: "n ∝ 1/effect²: halving the effect ≈ quadruples n." },
  ],

  references: [
    { source: "cohen-1992", role: "primary", note: "Power primer: relations between α, power, effect size and n." },
    { source: "cohen-1988", role: "primary", note: "Comprehensive power analysis reference." },
    { source: "kohavi-tang-xu-2020", role: "explanatory", note: "Sample size and minimum detectable effect in online experiments." },
    { source: "greenland-et-al-2016", role: "explanatory", note: "Power misinterpretations, including post-hoc power." },
    { source: "sauro-lewis-2016", role: "explanatory", note: "Sample sizes for formative and summative UX studies." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "The formulas are standard statistical results, and the power framework is established methodology. The calculation is only as good as its inputs: the assumed baseline, variance and minimum effect. Problem-discovery sample sizes rest on separate, more contested assumptions.",

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
