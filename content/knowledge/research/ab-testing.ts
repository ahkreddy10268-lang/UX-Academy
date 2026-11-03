import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "ab-testing",
  slug: "ab-testing",
  title: "A/B Testing",
  alternateNames: ["Online controlled experiment", "Split test", "Randomised controlled experiment (online)", "Bucket testing"],
  summary:
    "A randomised experiment in which live users are assigned at random to two or more variants and a pre-chosen metric is compared. Done properly, it is the strongest practical evidence of whether a change *causes* a difference.",
  definition:
    "A/B testing is a quantitative evaluative method in which users are **randomly assigned** to a control (A) and one or more treatments (B…), exposed to them in real use, and compared on a pre-registered primary metric. Statistical inference determines whether the observed difference is larger than expected from chance. Randomisation is what allows a causal interpretation {{src:kohavi-tang-xu-2020}}.",
  primaryType: "method",
  secondaryTypes: ["technique"],
  domain: "research",
  subcategory: "quantitative",
  tags: ["experimentation", "causality", "statistics", "conversion", "online experiments", "product analytics"],
  difficulty: "intermediate",
  disciplines: ["Product experimentation", "Statistics", "UX research", "Data science"],
  learningObjectives: [
    "Explain why randomisation lets an A/B test support causal claims that analytics alone cannot.",
    "Compute and interpret a two-proportion z-test, a confidence interval for the difference, and relative lift.",
    "Recognise threats to validity: peeking, sample ratio mismatch, novelty effects and multiple comparisons.",
    "Decide when to use A/B testing and when usability testing or other research is more appropriate.",
  ],
  prerequisites: ["confidence-intervals", "statistical-significance"],

  levels: {
    beginner: {
      explanation: [
        "Imagine you have two versions of a sign-up page and want to know which works better. An A/B test shows version A to some visitors and version B to others, **chosen at random**, then counts how many people sign up with each.",
        "Random assignment is the key. Because a coin-flip decides who sees what, the two groups are alike on average in every other way: time of day, device, mood, how much they wanted the product. So if B gets more sign-ups, the design is the most likely reason.",
        "Even with no real difference, the two groups will rarely have exactly the same numbers, just as two handfuls of coins rarely give identical heads. Statistics tells you whether a difference is big enough to be unlikely by chance alone.",
      ],
      analogy:
        "It works like a medical trial for designs. Half the patients get the new treatment and half get the standard one, chosen by lottery, so that a difference in recovery can be credited to the treatment.",
      everydayExamples: [
        "An online shop tests a new product-page layout against the current one and compares the share of visitors who add to basket.",
        "A news site tests two headlines and compares click-through.",
        "A subscription service tests a shorter checkout and compares completed purchases.",
      ],
      vocabulary: [
        { term: "Control (A)", meaning: "The current experience, used as the comparison." },
        { term: "Treatment / variant (B)", meaning: "The changed experience being tested." },
        { term: "Randomisation", meaning: "Assigning users to variants by chance so that groups are comparable." },
        { term: "Conversion rate", meaning: "The share of users who complete a target action." },
        { term: "Statistical significance", meaning: "A judgement that a difference is unlikely to be due to chance alone, at a chosen threshold." },
      ],
    },
    intermediate: {
      explanation: [
        "A trustworthy test is designed **before** it starts. Write the hypothesis, choose one primary metric (the *overall evaluation criterion*), set the significance level α (usually 0.05) and the power (usually 80%), and use them to compute the sample size per variant (see [[sample-size-estimation]]). Then run the test for the full planned duration, usually whole weeks to cover weekly cycles {{src:kohavi-tang-xu-2020}}.",
        "For conversion-type metrics, the standard analysis is the **two-proportion z-test**. It pools both groups to estimate the variance under the null hypothesis of no difference, computes z = (p₂ − p₁)/SE, and converts z to a two-sided p-value. Report alongside it the **confidence interval for the difference** and the **relative lift** (p₂ − p₁)/p₁.",
        "A/B tests answer *what* happened and *how much*, not *why*. They are complementary to [[usability-testing]], which reveals why users struggle but cannot estimate population effects. Teams that run both decide better than teams that run either alone.",
      ],
      howItWorks: [
        "Users (not page views) are typically the unit of randomisation, using a stable hash of a user identifier so each person sees one variant consistently.",
        "The p-value is the probability of seeing a difference at least this large *if there were no true difference*. It is not the probability that B is better {{src:greenland-et-al-2016}}.",
        "Sample size depends on the baseline rate, the smallest effect worth detecting, α and power. Small effects on low baseline rates need very large samples.",
      ],
      implementation: [
        "Pre-register hypothesis, primary metric, guardrail metrics (for example, error rate, page load time), α, power, minimum detectable effect and duration.",
        "Run an A/A test (two identical variants) to validate the instrumentation; a 'significant' A/A result signals a pipeline problem.",
        "Check the **sample ratio**: if you assigned 50/50 but observe 52/48 with large n, assignment or logging is broken. Investigate before interpreting {{src:fabijan-et-al-2019}}.",
        "Do not stop the test when the p-value first dips below 0.05 ('peeking'); use the planned sample size or a sequential method designed for repeated looks.",
        "Correct for multiple comparisons when testing many variants or metrics, and treat secondary findings as hypotheses.",
        "Report the effect size with its confidence interval, not only 'significant / not significant'.",
      ],
      scenarios: [
        "A variant increases clicks on a promotional banner by 15% but reduces purchases. A guardrail metric reveals a local optimum that harms the business goal.",
        "A test 'wins' on day 3 at p = 0.03 and is stopped. When re-run to the planned length, the effect disappears: a false positive produced by peeking.",
        "A redesigned navigation drops engagement in week 1 and recovers by week 3, a *change-aversion* or learning effect that a short test would have misread.",
      ],
    },
    advanced: {
      explanation: [
        "Online controlled experiments inherit the logic of randomised controlled trials: random assignment makes treatment independent of potential outcomes, so the difference in means estimates the **average treatment effect**. Kohavi et al.'s survey and their later book set out practice at web scale, including the overall evaluation criterion, A/A tests, ramp-up, and pitfalls {{src:kohavi-et-al-2009}} {{src:kohavi-tang-xu-2020}}.",
        "The pooled z-test assumes independent observations and a sample large enough for the normal approximation. Violations are common: if the unit of randomisation is the user but the metric is per page view, observations are correlated and naive standard errors are too small. The delta method or bootstrapping is then needed {{src:kohavi-tang-xu-2020}}.",
        "Repeated significance testing inflates the false-positive rate well above α; sequential designs and always-valid inference address this. Statistical significance also says nothing about practical importance. A tiny effect can be 'significant' with millions of users, so decisions should rest on the interval for the effect size {{src:greenland-et-al-2016}}.",
      ],
      evidence: [
        "Large-scale experimentation programmes report that most ideas, even those confidently expected to help, do not improve the target metric, which is one reason controlled experiments are valued over expert judgement {{src:kohavi-et-al-2009}}.",
        "Fabijan et al. documented sample ratio mismatch as a frequent, serious data-quality failure in production experimentation, with a taxonomy of causes {{src:fabijan-et-al-2019}}.",
        "Misinterpretations of p-values and confidence intervals are widespread among researchers; Greenland et al. catalogue them {{src:greenland-et-al-2016}}.",
      ],
      debates: [
        "**Frequentist vs. Bayesian analysis.** Bayesian approaches give 'probability B is better' statements that stakeholders find intuitive, but depend on priors and can be misused like p-values.",
        "**Novelty and primacy effects.** Short tests may capture curiosity about something new, or resistance to change, rather than steady-state behaviour.",
        "**Local optimisation.** Many small tests can optimise a metric while degrading long-term trust or brand. Guardrails and qualitative research are counterweights.",
        "**Ethics.** Experiments on users raise questions of consent and harm, especially for tests manipulating emotion, price or vulnerable groups.",
      ],
      alternativeModels: [
        "**Multi-armed bandits** shift traffic toward better-performing variants during the test. They maximise reward, but estimate effects less cleanly.",
        "**Quasi-experiments** (difference-in-differences, interrupted time series) are used when randomisation is impossible, with weaker causal claims.",
        "**[[usability-testing|Usability testing]]**: small-sample, qualitative diagnosis of why users struggle; complementary, not a substitute.",
      ],
    },
  },

  origin: {
    contributors: ["Ronald A. Fisher (randomised experiments)", "Ron Kohavi and colleagues (online controlled experiments)"],
    period: "Randomised experiments from the 1920s–1930s; online A/B testing from the late 1990s–2000s",
    problem:
      "Product teams needed to know whether changes actually improved outcomes. Correlational analytics and expert opinion were repeatedly wrong, and randomisation offered a way to isolate cause.",
    narrative: [
      "The logic comes from the randomised experiment in statistics and medicine. Web platforms made it cheap to randomise millions of users and measure behaviour directly.",
      "Kohavi, Longbotham, Sommerfield and Henne's 2009 survey consolidated lessons from large-scale experimentation, and the 2020 book by Kohavi, Tang and Xu became the standard practitioner reference {{src:kohavi-et-al-2009}} {{src:kohavi-tang-xu-2020}}.",
    ],
    attributionNote:
      "No single person 'invented' A/B testing. It is the application of randomised controlled experimentation to digital products.",
  },

  application: {
    summary: [
      "A/B testing fits **high-traffic decisions with a measurable outcome**: copy, layouts, flows, defaults, recommendations and pricing presentation. The design team brings hypotheses grounded in research; the experiment quantifies their effect.",
    ],
    web: [
      "Test checkout simplifications against conversion, with guardrails on refunds and support contacts.",
      "Test search-result layouts against successful searches (a click followed by no immediate return).",
    ],
    mobile: [
      "Use server-driven configuration or feature flags; app-store release cycles make rollback slower, so ramp up gradually.",
    ],
    enterprise: [
      "Traffic is often too low for classic A/B tests. Consider longer durations, within-account designs, or qualitative methods instead.",
    ],
    services: [
      "Randomise at the right unit (household, branch, account) when users interact, to avoid contamination between groups.",
    ],
    steps: [
      "Form a hypothesis from research (what change, for whom, why, expected effect).",
      "Choose the primary metric, guardrails, α, power and minimum detectable effect; compute sample size and duration.",
      "Implement randomisation and logging; run an A/A test if the pipeline is new.",
      "Run for the planned duration without peeking-based stopping; monitor guardrails and sample ratio.",
      "Analyse: effect, confidence interval, p-value, segments as exploratory only.",
      "Decide, document, and feed learnings back into research.",
    ],
  },

  whenToUse: [
    "Estimating the causal effect of a specific change on a measurable outcome.",
    "Choosing between well-defined alternatives with enough traffic to detect meaningful effects.",
    "Validating that a research-driven redesign improves behaviour at scale.",
  ],
  whenNotToUse: [
    "Discovering *why* users struggle, or what to build. Use generative and usability research.",
    "Low-traffic products where a test would take months to reach adequate power.",
    "Changes whose effect cannot be measured within the test window (long-term trust, brand).",
    "Ethically problematic manipulations, or where users would reasonably object to being experimented on.",
  ],
  advantages: [
    "Supports causal claims through randomisation.",
    "Measures real behaviour in real context.",
    "Quantifies the size of effects, not only their direction.",
  ],
  limitations: [
    "Requires substantial traffic for small effects.",
    "Explains what, not why.",
    "Vulnerable to peeking, sample ratio mismatch, interference between users, and novelty effects.",
    "Optimises measurable short-term metrics, which may not reflect long-term value.",
  ],
  misconceptions: [
    {
      myth: "p = 0.03 means there is a 97% chance that B is better.",
      reality: "The p-value is the probability of data at least this extreme *if there were no difference*. It is not the probability that a hypothesis is true.",
    },
    {
      myth: "You can stop as soon as the result becomes significant.",
      reality: "Repeatedly checking and stopping at the first significant result inflates false positives far above 5%. Use the planned sample or a sequential method.",
    },
    {
      myth: "A/B testing replaces usability testing.",
      reality: "A/B tests measure outcomes at scale; usability tests reveal causes with a few users. Each answers questions the other cannot.",
    },
    {
      myth: "Not significant means there is no effect.",
      reality: "A non-significant result with a wide confidence interval is inconclusive: the true effect may still be meaningful. Report the interval.",
    },
  ],

  relations: [
    { target: "usability-testing", type: "complementary-to", note: "Usability testing explains why behaviour occurs; A/B testing quantifies the causal effect of a change." },
    { target: "sample-size-estimation", type: "related-to", note: "A test's sample size and duration are set by a power calculation before launch." },
    { target: "statistical-significance", type: "related-to", note: "Significance testing decides whether an observed difference exceeds chance variation." },
    { target: "conversion-rate", type: "measured-by", note: "Most A/B tests use a conversion-type proportion as the primary metric." },
    { target: "confidence-intervals", type: "complementary-to", note: "The interval for the difference shows effect size and uncertainty, which p-values do not." },
    { target: "product-experimentation", type: "applied-in", note: "A/B testing is the core method of experimentation-driven product development." },
    { target: "heart-framework", type: "related-to", note: "HEART's goals–signals–metrics process helps choose meaningful experiment metrics." },
  ],

  formulas: [
    {
      id: "two-proportion-z-test",
      name: "Two-proportion z-test, difference CI and relative lift",
      expression: "z = (p₂ − p₁) / √[ p̄(1 − p̄)(1/n₁ + 1/n₂) ]      CI = (p₂ − p₁) ± z₁₋α/₂ · √[ p₁(1 − p₁)/n₁ + p₂(1 − p₂)/n₂ ]      lift = (p₂ − p₁) / p₁",
      contributor: "Standard large-sample test for two independent proportions; see Kohavi, Tang & Xu (2020)",
      source: "kohavi-tang-xu-2020",
      variables: [
        { symbol: "x₁, n₁", name: "Control conversions and users", unit: "count", description: "Successes and sample size in A." },
        { symbol: "x₂, n₂", name: "Treatment conversions and users", unit: "count", description: "Successes and sample size in B." },
        { symbol: "p₁, p₂", name: "Conversion rates", unit: "proportion", description: "x₁/n₁ and x₂/n₂." },
        { symbol: "p̄", name: "Pooled proportion", unit: "proportion", description: "(x₁ + x₂)/(n₁ + n₂), used for the SE under the null hypothesis." },
        { symbol: "z", name: "Test statistic", unit: "standard errors", description: "Converted to a two-sided p-value: p = 2(1 − Φ(|z|))." },
        { symbol: "α", name: "Significance level", unit: "—", description: "Chosen before the test, commonly 0.05." },
      ],
      resultUnit: "z (unitless), two-sided p-value, difference in percentage points with CI, relative lift (%)",
      assumptions: [
        "Users were randomly assigned; observations are independent (the analysis unit equals the randomisation unit).",
        "Sample sizes are large enough for the normal approximation (expected successes and failures in each group ≥ roughly 10).",
        "The sample size and stopping rule were fixed in advance.",
      ],
      conditions: [
        "Binary primary metric (converted / not converted) per randomised user.",
        "Use only after checking for sample ratio mismatch and instrumentation problems.",
      ],
      steps: [
        "Compute p₁ = x₁/n₁ and p₂ = x₂/n₂.",
        "Compute the pooled p̄ = (x₁ + x₂)/(n₁ + n₂).",
        "SE_pooled = √(p̄(1 − p̄)(1/n₁ + 1/n₂)); z = (p₂ − p₁)/SE_pooled.",
        "Two-sided p-value = 2 × (1 − Φ(|z|)).",
        "Unpooled SE = √(p₁(1 − p₁)/n₁ + p₂(1 − p₂)/n₂); CI = (p₂ − p₁) ± 1.96 × SE.",
        "Relative lift = (p₂ − p₁)/p₁.",
      ],
      workedExample: {
        given: ["Control: 500 conversions from 10,000 users (5.0%).", "Treatment: 560 conversions from 10,000 users (5.6%)."],
        steps: [
          "p̄ = 1,060 / 20,000 = 0.053",
          "SE_pooled = √(0.053 × 0.947 × (1/10,000 + 1/10,000)) ≈ 0.003168",
          "z = (0.056 − 0.050) / 0.003168 ≈ 1.894 → two-sided p ≈ 0.058",
          "Unpooled SE ≈ 0.003168; 95% CI for the difference = 0.006 ± 1.96 × 0.003168 → −0.02 to +1.22 percentage points",
          "Relative lift = 0.006 / 0.050 = +12%",
        ],
        result: "+0.6 pp (+12% relative), p ≈ 0.058, 95% CI −0.02 to +1.22 pp. Not significant at α = 0.05. The data are compatible with no effect and with a substantial one, so the test is underpowered for effects this size.",
      },
      interpretation: [
        "Decide using the interval. If its whole range is practically worthwhile, ship; if it includes zero and meaningful effects, the result is inconclusive.",
        "Relative lift sounds large on small baselines. Always state absolute and relative differences.",
      ],
      commonErrors: [
        "Reading the p-value as the probability that the variant is better.",
        "Stopping early when p first drops below α.",
        "Analysing per page view when randomisation was per user.",
        "Running many variants or metrics without correcting for multiple comparisons.",
        "Ignoring a sample ratio mismatch.",
      ],
      limitations: [
        "Normal approximation is poor for very small samples or rates near 0%/100%.",
        "Tests one primary metric; long-term and qualitative effects are not captured.",
        "Does not handle correlated observations or continuous metrics (use t-tests, the delta method or bootstrapping).",
      ],
      alternatives: [
        { name: "Chi-square test (2×2)", expression: "χ² = z² for a two-sided comparison", note: "Equivalent to the pooled z-test for two groups." },
        { name: "Fisher's exact test", expression: "Hypergeometric probabilities", note: "For small samples, such as usability-sized comparisons." },
        { name: "Bayesian beta-binomial", expression: "Posterior P(p₂ > p₁ | data)", note: "Intuitive probability statements; depends on priors." },
      ],
      calculator: "two-proportion-test",
    },
  ],

  method: {
    procedure: [
      "Define the hypothesis, primary metric, guardrails and minimum detectable effect.",
      "Compute sample size and duration from baseline rate, α and power.",
      "Implement random, consistent assignment and event logging; validate with an A/A test.",
      "Launch, ramp traffic safely, and monitor guardrails and the sample ratio.",
      "Run to the planned sample and duration; analyse the primary metric once.",
      "Report effect size, confidence interval and p-value; treat subgroup findings as exploratory.",
    ],
    participants: "Real users of the live product, randomly assigned. Typically thousands to millions, depending on baseline rate and effect size.",
    duration: "Determined by power analysis; at least one full weekly cycle, commonly one to four weeks.",
    inputs: ["Hypothesis grounded in research", "Variant designs", "Instrumented metrics", "Traffic"],
    outputs: ["Estimated effect with confidence interval", "Decision record", "Learnings for future hypotheses"],
    purpose: "evaluative",
    data: "quantitative",
  },

  exercises: [
    {
      id: "ab-testing-ex-calc",
      kind: "calculation",
      level: "intermediate",
      title: "Analyse a checkout test",
      prompt: [
        "Control: 2,000 users, 240 purchases. Variant: 2,000 users, 290 purchases. Compute the two conversion rates, the pooled z, the two-sided p-value, the 95% CI for the difference and the relative lift. Would you ship?",
      ],
      deliverable: "All five numbers and a decision with rationale.",
      criteria: ["Uses pooled SE for z", "Uses unpooled SE for the CI", "Interprets the interval, not only p"],
      exampleSolution: [
        "p₁ = 12.0%, p₂ = 14.5%. p̄ = 530/4,000 = 0.1325. SE_pooled = √(0.1325 × 0.8675 × 0.001) ≈ 0.01072; z ≈ 2.33; p ≈ 0.020.",
        "Unpooled SE = √(0.12 × 0.88/2,000 + 0.145 × 0.855/2,000) ≈ 0.01071; 95% CI = 2.5 ± 2.10 pp → +0.40 to +4.60 pp. Lift ≈ +20.8%.",
        "Significant at α = 0.05, and the whole interval is positive. Ship, provided the guardrails were fine, the sample ratio was correct and the test ran to its planned length.",
      ],
    },
    {
      id: "ab-testing-ex-plan",
      kind: "assignment",
      level: "advanced",
      title: "Write an experiment plan",
      prompt: [
        "Your research suggests that a simplified pricing page will reduce confusion. Write a one-page experiment plan: hypothesis, primary metric, two guardrails, minimum detectable effect, α, power, sample size per arm (use the sample-size calculator), duration, and how you will avoid peeking.",
      ],
      criteria: ["Hypothesis linked to research", "Sensible guardrails", "Sample size computed", "Stopping rule stated"],
    },
    {
      id: "ab-testing-ex-critique",
      kind: "critique",
      level: "intermediate",
      title: "Spot the validity threats",
      prompt: [
        "A team ran a test for 2 days, checked results hourly, stopped when p < 0.05, observed a 53/47 split between arms, and reported '+18% conversion'. List every threat to validity you can find and how to fix each.",
      ],
      criteria: ["Peeking", "Sample ratio mismatch", "Too short (weekly cycles, novelty)", "Reporting lift without CI"],
    },
  ],

  quiz: [
    {
      id: "ab-testing-q-random",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Why is random assignment essential in an A/B test?",
      options: [
        { text: "It makes the groups comparable, so differences can be attributed to the change.", correct: true, explanation: "Randomisation balances all other factors on average, which enables causal inference." },
        { text: "It guarantees a statistically significant result.", correct: false, explanation: "Randomisation does not affect whether an effect exists or is detected." },
        { text: "It reduces the sample size needed.", correct: false, explanation: "Sample size depends on effect size, baseline, α and power." },
        { text: "It ensures each user sees both versions.", correct: false, explanation: "In a standard A/B test each user sees one version consistently." },
      ],
      explanation: "Random assignment is what lets an A/B test answer causal questions.",
    },
    {
      id: "ab-testing-q-pvalue",
      kind: "true-false",
      level: "intermediate",
      prompt: "A p-value of 0.04 means there is a 96% probability that the variant is truly better than the control.",
      options: [
        { text: "True", correct: false, explanation: "The p-value is calculated assuming no true difference; it is not the probability of a hypothesis." },
        { text: "False", correct: true, explanation: "p = 0.04 means data at least this extreme would occur 4% of the time if there were no difference." },
      ],
      explanation: "This is one of the most common statistical misinterpretations (Greenland et al., 2016).",
    },
    {
      id: "ab-testing-q-peek",
      kind: "scenario",
      level: "advanced",
      prompt: "A dashboard shows the test's p-value updating live. After 4 days of a planned 21, p = 0.02. What should you do?",
      options: [
        { text: "Stop and ship. The result is significant.", correct: false, explanation: "Stopping at the first significant look inflates the false-positive rate." },
        { text: "Continue to the planned sample size unless a guardrail shows harm; analyse at the end.", correct: true, explanation: "Fixed-horizon tests are only valid when analysed at the planned horizon. Guardrail-based safety stops are legitimate." },
        { text: "Double the traffic to the variant to confirm faster.", correct: false, explanation: "Changing allocation mid-test complicates analysis and can bias results." },
        { text: "Run a usability test instead.", correct: false, explanation: "Usability testing answers a different question; the experiment should be completed properly." },
      ],
      explanation: "Peeking is a leading cause of false 'wins'. Use the planned horizon or a sequential design built for interim looks.",
      revise: "ab-testing",
    },
    {
      id: "ab-testing-q-vs-usability",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which question is better answered by a usability test than an A/B test?",
      options: [
        { text: "Does the new checkout increase completed purchases?", correct: false, explanation: "A causal, quantitative outcome question suited to A/B testing." },
        { text: "Why do users abandon the checkout at the delivery step?", correct: true, explanation: "Understanding causes of behaviour needs observation and conversation." },
        { text: "How large is the effect of the new button label on clicks?", correct: false, explanation: "Effect-size estimation at scale is what A/B testing does." },
        { text: "Does the new layout reduce support contacts across all users?", correct: false, explanation: "A population-level outcome is suited to experimentation." },
      ],
      explanation: "A/B tests tell you what happened and how much; usability tests tell you why.",
    },
  ],

  flashcards: [
    { id: "ab-testing-fc-z", front: "Pooled two-proportion z", back: "z = (p₂ − p₁)/√(p̄(1 − p̄)(1/n₁ + 1/n₂)), with p̄ = (x₁ + x₂)/(n₁ + n₂)." },
    { id: "ab-testing-fc-srm", front: "Sample ratio mismatch (SRM)", back: "Observed allocation differs from planned allocation: a sign of broken assignment or logging. Investigate before trusting results." },
    { id: "ab-testing-fc-peek", front: "Why not peek and stop early?", back: "Repeated testing inflates false positives above α. Use the planned horizon or a sequential method." },
  ],

  references: [
    { source: "kohavi-tang-xu-2020", role: "primary", note: "Standard reference on trustworthy online controlled experiments." },
    { source: "kohavi-et-al-2009", role: "primary", note: "Survey and practical guide to web experiments." },
    { source: "fabijan-et-al-2019", role: "primary", note: "Sample ratio mismatch taxonomy." },
    { source: "greenland-et-al-2016", role: "explanatory", note: "Misinterpretations of p-values, intervals and power." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "The causal logic of randomised experiments is established statistical theory, and large-scale practice is well documented in peer-reviewed and professional literature. Its conclusions are only as good as the execution: randomisation, instrumentation, pre-planned analysis and an appropriate metric. It supports causal claims about the tested change and metric, within the tested population and period.",

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
