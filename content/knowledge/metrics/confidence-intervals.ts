import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "confidence-intervals",
  slug: "confidence-intervals",
  title: "Confidence Intervals",
  alternateNames: ["CI", "Interval estimate", "Margin of error (half-width)", "95% confidence interval"],
  summary:
    "A range computed from sample data, using a procedure that captures the true population value a stated proportion of the time (for example 95%). It is the honest way to report any UX metric from a sample.",
  definition:
    "A confidence interval is an **interval estimate** of a population parameter, built by a procedure with a known long-run coverage probability. For a mean with an unknown population standard deviation, the 95% interval is `x̄ ± t(0.975, n−1) · s/√n`. The confidence level describes the reliability of the *procedure*, not the probability that a particular computed interval contains the parameter {{src:cumming-2014}}.",
  primaryType: "concept",
  secondaryTypes: ["formula", "technique"],
  domain: "metrics",
  subcategory: "statistics",
  tags: ["statistics", "uncertainty", "estimation", "margin of error", "t-distribution", "reporting"],
  difficulty: "intermediate",
  disciplines: ["Statistics", "UX research", "Experimental psychology"],
  learningObjectives: [
    "Explain in plain language what a confidence interval tells you and what it does not.",
    "Compute a t-based interval for a mean, and know when to use other interval types.",
    "Use intervals to communicate uncertainty in UX metrics to stakeholders.",
    "Recognise and correct the common misinterpretations of confidence intervals.",
  ],
  prerequisites: ["descriptive-statistics", "standard-deviation"],

  levels: {
    beginner: {
      explanation: [
        "When you test with 12 people, you are not really interested in those 12. You want to know about **everyone** who will use the product. Their average score will not be exactly the same as your 12 people's average, because a different 12 would have given a different number.",
        "A confidence interval puts a **range** around your result to show how much it could plausibly differ. 'The average SUS was 72.5, with a 95% confidence interval from 65 to 80' says: our best estimate is 72.5, and values from about 65 to 80 are all compatible with our data.",
        "Narrow intervals mean a precise estimate; wide intervals mean uncertainty. Intervals shrink with **more participants** and with **less variation** between participants.",
      ],
      analogy:
        "A forecast of 'between 15 and 19 degrees tomorrow' says more than 'exactly 17': the range is more honest about what can be known, and the width tells you how confident the forecaster is.",
      everydayExamples: [
        "Opinion polls reported as '42% ± 3 points'.",
        "'Average task time 48 seconds (95% CI 39–59 s)' in a usability benchmark.",
        "Comparing two designs' SUS intervals to see whether they clearly differ.",
      ],
      vocabulary: [
        { term: "Population", meaning: "Everyone you want to draw conclusions about, such as all users of a product." },
        { term: "Sample", meaning: "The people you actually measured." },
        { term: "Margin of error", meaning: "Half the width of the interval: how far it extends either side of the estimate." },
        { term: "Confidence level", meaning: "How often the method captures the true value in the long run, usually 95%." },
        { term: "Standard error", meaning: "How much a sample statistic typically varies from sample to sample; s/√n for a mean." },
      ],
    },
    intermediate: {
      explanation: [
        "For a mean, use the **t-distribution**: x̄ ± t·s/√n with n − 1 degrees of freedom. With small n, t is noticeably larger than the normal value 1.96 (for n = 12, t ≈ 2.20), which widens the interval to account for the extra uncertainty in estimating s.",
        "Different measures need different intervals. Proportions such as task success need binomial methods, preferably adjusted-Wald for small samples (see [[task-success-rate]]). Task times are positively skewed, so Sauro & Lewis recommend computing the interval on log-transformed times and back-transforming (a geometric-mean interval) {{src:sauro-lewis-2016}}.",
        "Use intervals in every readout. They prevent over-claiming ('users prefer B') and under-claiming ('nothing to see here') by showing the range of effects the data support. Cumming argues for this **estimation** approach over a sole reliance on significance tests {{src:cumming-2014}}.",
      ],
      howItWorks: [
        "If you repeated a study many times and computed a 95% interval each time, about 95% of those intervals would contain the true population mean. Any single interval either does or does not.",
        "Width is proportional to s/√n: quadrupling the sample size halves the width.",
        "Higher confidence (99% instead of 95%) gives wider intervals; lower confidence (90%) gives narrower ones. Choose before analysis and report the level.",
      ],
      implementation: [
        "Report the point estimate, interval, confidence level and n together, e.g. 'SUS 72.5 (95% CI 64.9–80.1, n = 12)'.",
        "Show intervals as error bars in charts, labelled as 95% CIs (not standard deviations or standard errors).",
        "For comparisons, compute the interval for the *difference*. Overlapping individual intervals do not by themselves mean 'no difference'.",
        "Use 90% intervals for benchmark checks against a one-sided target if that matches your decision rule, and state why.",
      ],
      scenarios: [
        "A stakeholder asks whether average task time is under 60 s. The 95% CI is 39–59 s, so the data support the claim, just.",
        "A redesign's SUS interval (63–83) overlaps the baseline's (53–75): report the difference interval and avoid declaring a winner.",
      ],
    },
    advanced: {
      explanation: [
        "Confidence intervals are a frequentist construct: the parameter is fixed and the interval is random. Statements of the form 'there is a 95% probability that the true mean lies between 65 and 80' belong to Bayesian **credible intervals**, which require a prior. Hoekstra, Morey, Rouder and Wagenmakers showed that most researchers and students endorse such incorrect interpretations of CIs {{src:hoekstra-et-al-2014}}.",
        "The duality between intervals and tests is useful: a 95% interval for a difference that excludes zero corresponds to a two-sided test significant at α = 0.05. Intervals carry more information, namely the magnitude and the precision of the effect {{src:greenland-et-al-2016}}.",
        "Cumming's 'new statistics' programme emphasises effect sizes, intervals and meta-analytic thinking: single studies are noisy, and the interval shows how much a replication might differ ('the dance of the confidence intervals') {{src:cumming-2014}}.",
      ],
      evidence: [
        "Hoekstra et al. (2014) found that the incorrect interpretations of CIs were robust across experience levels, including among researchers {{src:hoekstra-et-al-2014}}.",
        "Greenland et al. (2016) list common misinterpretations of intervals and their relation to p-values {{src:greenland-et-al-2016}}.",
      ],
      debates: [
        "**Frequentist intervals vs. Bayesian credible intervals.** Credible intervals give the intuitive probability statement people want, but depend on priors.",
        "**Which interval for small-sample proportions?** Wald vs. adjusted-Wald vs. exact. For UX samples, adjusted-Wald is recommended.",
        "**Confidence level conventions.** 95% is a convention, not a law; some practitioners argue that 90% better reflects the stakes of design decisions.",
      ],
      alternativeModels: [
        "**Bootstrap intervals**: resampling-based, useful for medians and other statistics without simple formulas.",
        "**Bayesian credible intervals**: direct probability statements about parameters, given a prior.",
        "**Prediction intervals**: where a *single future observation* is likely to fall. These are wider than CIs for the mean.",
      ],
    },
  },

  origin: {
    contributors: ["Jerzy Neyman (formalisation of confidence intervals, 1930s)", "Geoff Cumming (estimation approach)"],
    period: "1930s theory; 2010s 'new statistics' reform movement",
    problem:
      "Researchers needed a principled way to state how precise an estimate from a sample is, beyond a yes/no significance decision.",
    narrative: [
      "Confidence intervals were formalised in frequentist statistics in the 1930s and became standard in the sciences.",
      "The replication crisis renewed calls to report intervals and effect sizes instead of relying only on p-values; Cumming's 2014 article is a widely cited statement of this view {{src:cumming-2014}}.",
      "In UX, Sauro & Lewis made small-sample intervals practical for usability metrics {{src:sauro-lewis-2016}}.",
    ],
    attributionNote:
      "Neyman's foundational papers are not yet in this academy's source registry, so the attribution is stated in general terms. It is marked for future source verification.",
  },

  application: {
    summary: [
      "Every quantitative UX result from a sample (SUS, task time, success rate, survey proportions, A/B differences) should be reported with an interval. It is the single most effective habit for honest research communication.",
    ],
    web: [
      "Benchmark dashboards: show each metric's interval and how it changes across releases.",
    ],
    mobile: [
      "App-store and in-app survey results: show the margin of error alongside percentages.",
    ],
    enterprise: [
      "Small user populations: intervals stop over-interpretation of results from 6–10 participants.",
    ],
    services: [
      "Service satisfaction surveys: report intervals per channel before comparing channels.",
    ],
    steps: [
      "Choose the right interval type for the measure (mean, proportion, skewed time, difference).",
      "Choose the confidence level (usually 95%) before analysis.",
      "Compute the estimate and its standard error.",
      "Apply the critical value (t for means, z for large-sample proportions) to obtain the margin.",
      "Report estimate, interval, level and n; visualise with labelled error bars.",
    ],
  },

  whenToUse: [
    "Reporting any metric estimated from a sample.",
    "Comparing designs, versions or segments.",
    "Deciding whether a result is precise enough to act on, or whether more data are needed.",
  ],
  whenNotToUse: [
    "Describing a complete population (for example, all employees surveyed), where there is no sampling uncertainty, though measurement error remains.",
    "With non-random, self-selected samples, as if the interval fixed representativeness: intervals quantify sampling error only, not bias.",
  ],
  advantages: [
    "Communicates magnitude and precision together.",
    "Reduces over-claiming from small samples.",
    "Maps directly onto significance tests when needed.",
  ],
  limitations: [
    "Captures random sampling error only, not bias from recruitment, task design or measurement.",
    "Frequently misinterpreted as a probability statement about the parameter.",
    "Assumptions (normality of the sampling distribution, independence) may not hold for small, skewed samples.",
  ],
  misconceptions: [
    {
      myth: "There is a 95% probability that the true mean lies within this particular interval.",
      reality: "In frequentist terms the true mean is fixed. 95% describes how often the *procedure* captures it across repeated samples. For direct probability statements, use a Bayesian credible interval.",
    },
    {
      myth: "If two confidence intervals overlap, the difference is not significant.",
      reality: "Individual intervals can overlap moderately while the difference is still significant. Compute the interval for the difference.",
    },
    {
      myth: "95% of individual users will fall within the confidence interval.",
      reality: "A CI is about the *mean*, not individuals. A prediction interval or the standard deviation describes individual spread.",
    },
  ],

  relations: [
    { target: "standard-deviation", type: "derived-from", note: "The interval's width is built from the sample standard deviation via the standard error." },
    { target: "statistical-significance", type: "complementary-to", note: "A 95% CI for a difference excluding zero corresponds to significance at α = 0.05, and adds magnitude." },
    { target: "sample-size-estimation", type: "related-to", note: "Sample size planning often targets a desired interval width (margin of error)." },
    { target: "task-success-rate", type: "applied-in", note: "Success rates need binomial intervals, preferably adjusted-Wald for small samples." },
    { target: "system-usability-scale", type: "applied-in", note: "SUS means should be reported with t-based intervals." },
    { target: "bayesian-reasoning", type: "contrasts-with", note: "Bayesian credible intervals offer the probability interpretation that confidence intervals do not." },
    { target: "margin-of-error", type: "related-to", note: "The margin of error is the half-width of a confidence interval." },
  ],

  formulas: [
    {
      id: "ci-mean-t",
      name: "Confidence interval for a mean (t-based)",
      expression: "CI = x̄ ± t(1 − α/2, n − 1) · s / √n",
      contributor: "Standard frequentist interval; Student's t-distribution",
      source: "sauro-lewis-2016",
      variables: [
        { symbol: "x̄", name: "Sample mean", unit: "unit of the measure", description: "Average of the n observations." },
        { symbol: "s", name: "Sample standard deviation", unit: "unit of the measure", description: "Computed with n − 1 in the denominator." },
        { symbol: "n", name: "Sample size", unit: "count", description: "Number of independent observations." },
        { symbol: "t", name: "Critical t value", unit: "—", description: "Quantile of the t-distribution with n − 1 degrees of freedom (≈ 2.201 for 95% at n = 12)." },
        { symbol: "α", name: "1 − confidence level", unit: "—", description: "0.05 for a 95% interval." },
      ],
      resultUnit: "same unit as the measure (lower and upper bound)",
      assumptions: [
        "Observations are independent and come from a random or representative sample.",
        "The sampling distribution of the mean is approximately normal (true for normal data, or for moderate n with moderate skew).",
      ],
      conditions: [
        "Use for means of roughly symmetric continuous measures (SUS, ratings).",
        "For skewed task times, compute on log values and back-transform; for proportions use binomial intervals.",
      ],
      steps: [
        "Compute x̄ and s (n − 1 denominator).",
        "Compute the standard error SE = s/√n.",
        "Find t for the chosen confidence and n − 1 degrees of freedom.",
        "Margin of error = t × SE.",
        "CI = x̄ ± margin.",
      ],
      workedExample: {
        given: ["12 participants' SUS scores: mean 72.5, standard deviation 12.0."],
        steps: [
          "SE = 12.0 / √12 ≈ 3.464",
          "t(0.975, 11) ≈ 2.201",
          "Margin = 2.201 × 3.464 ≈ 7.62",
          "CI = 72.5 ± 7.62 → 64.9 to 80.1",
        ],
        result: "SUS 72.5 (95% CI 64.9–80.1). The data are compatible with roughly average (≈68) through good perceived usability.",
      },
      interpretation: [
        "Values inside the interval are compatible with the data; values far outside are not. The centre is the best estimate, not the only plausible value.",
        "If the decision changes depending on where in the interval the truth lies, collect more data.",
      ],
      commonErrors: [
        "Using 1.96 instead of t with small n.",
        "Using the population SD formula (÷ n) instead of the sample SD (÷ n − 1).",
        "Plotting standard error or SD bars labelled as confidence intervals.",
        "Interpreting the interval as containing 95% of individual scores.",
      ],
      limitations: [
        "Sensitive to outliers and skew at small n.",
        "Ignores systematic bias.",
        "Assumes independence (violated by repeated measures unless handled).",
      ],
      alternatives: [
        { name: "Large-sample z interval", expression: "x̄ ± 1.96 · s/√n", note: "Approximates the t interval when n is large (≳ 30–50)." },
        { name: "Geometric-mean interval for times", expression: "exp( mean(ln x) ± t · sd(ln x)/√n )", note: "Recommended for positively skewed task times." },
        { name: "Adjusted-Wald for proportions", expression: "p_adj ± z√(p_adj(1 − p_adj)/(n + z²))", note: "For completion rates and other binary measures." },
      ],
      calculator: "confidence-interval-mean",
    },
  ],

  exercises: [
    {
      id: "confidence-intervals-ex-compute",
      kind: "calculation",
      level: "intermediate",
      title: "Interval for satisfaction ratings",
      prompt: [
        "Eight participants rated ease of use on a 7-point scale: 5, 6, 4, 7, 6, 5, 6, 5. Compute the mean, the standard deviation and the 95% CI (t(0.975, 7) ≈ 2.365).",
      ],
      deliverable: "x̄, s, SE, margin and interval.",
      criteria: ["Uses n − 1 for s", "Uses t not z", "Interval reported to one decimal"],
      exampleSolution: [
        "x̄ = 44/8 = 5.5. Deviations squared: 0.25, 0.25, 2.25, 2.25, 0.25, 0.25, 0.25, 0.25 = 6.0; s = √(6/7) ≈ 0.926. SE = 0.926/√8 ≈ 0.327. Margin = 2.365 × 0.327 ≈ 0.77.",
        "95% CI ≈ 4.7 to 6.3.",
      ],
    },
    {
      id: "confidence-intervals-ex-explain",
      kind: "reflection",
      level: "beginner",
      title: "Explain it to a stakeholder",
      prompt: [
        "Write two sentences that explain '72.5 (95% CI 64.9–80.1)' to a product manager without using the words 'probability' or 'significant'.",
      ],
      criteria: ["Plain language", "Conveys best estimate and plausible range", "Avoids the probability misinterpretation"],
    },
    {
      id: "confidence-intervals-ex-misread",
      kind: "critique",
      level: "advanced",
      title: "Correct the misreadings",
      prompt: [
        "A report states: 'There is a 95% chance the true SUS is between 65 and 80, and because the redesign's interval overlaps the old one, the redesign made no difference.' Identify both errors and rewrite the statement correctly.",
      ],
      criteria: ["Corrects the probability interpretation", "Corrects the overlap reasoning", "Recommends a difference interval"],
    },
  ],

  quiz: [
    {
      id: "confidence-intervals-q-meaning",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which statement correctly interprets a 95% confidence interval for a mean?",
      options: [
        { text: "95% of users' scores fall within the interval.", correct: false, explanation: "The interval concerns the mean, not individual scores." },
        { text: "The procedure that produced it captures the true mean in 95% of repeated samples.", correct: true, explanation: "Confidence refers to the long-run performance of the method." },
        { text: "There is a 95% probability the true mean lies in this specific interval.", correct: false, explanation: "That is a Bayesian credible-interval statement; in frequentist terms the parameter is fixed." },
        { text: "If repeated, 95% of future sample means will fall in this interval.", correct: false, explanation: "That is not guaranteed; replication means vary around the true mean, not around this interval." },
      ],
      explanation: "Confidence describes the method's long-run coverage, not a probability about a single computed interval.",
    },
    {
      id: "confidence-intervals-q-width",
      kind: "formula",
      level: "intermediate",
      prompt: "You want to halve the width of a confidence interval for a mean. Approximately how must the sample size change?",
      options: [
        { text: "Double it", correct: false, explanation: "Doubling n reduces width by a factor of √2 ≈ 1.41, not 2." },
        { text: "Quadruple it", correct: true, explanation: "Width ∝ 1/√n, so halving width requires 4× the sample." },
        { text: "Halve it", correct: false, explanation: "Smaller samples widen intervals." },
        { text: "Sample size does not affect width", correct: false, explanation: "Width depends directly on s/√n." },
      ],
      explanation: "Precision grows with the square root of the sample size.",
    },
    {
      id: "confidence-intervals-q-overlap",
      kind: "true-false",
      level: "advanced",
      prompt: "If the 95% CIs of two independent group means overlap at all, the difference between the groups cannot be statistically significant at α = 0.05.",
      options: [
        { text: "True", correct: false, explanation: "Intervals can overlap moderately while the difference is still significant." },
        { text: "False", correct: true, explanation: "Assess the difference directly with its own interval or a test." },
      ],
      explanation: "Comparing two individual intervals is a conservative and often misleading test.",
    },
  ],

  flashcards: [
    { id: "confidence-intervals-fc-formula", front: "95% CI for a mean", back: "x̄ ± t(0.975, n−1) · s/√n." },
    { id: "confidence-intervals-fc-meaning", front: "What does '95% confidence' refer to?", back: "The long-run capture rate of the procedure, not the probability for one interval." },
    { id: "confidence-intervals-fc-sqrt", front: "How does n affect CI width?", back: "Width ∝ 1/√n: 4× the sample halves the width." },
  ],

  references: [
    { source: "cumming-2014", role: "primary", note: "Estimation approach; intervals over dichotomous testing." },
    { source: "hoekstra-et-al-2014", role: "primary", note: "Evidence of widespread misinterpretation." },
    { source: "greenland-et-al-2016", role: "explanatory", note: "Guide to misinterpretations of intervals and p-values." },
    { source: "sauro-lewis-2016", role: "explanatory", note: "Intervals for UX metrics, including task times." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "Confidence intervals are established statistical theory. The evidence on how people misinterpret them is peer-reviewed. Their validity in a given study depends on independence, representative sampling and appropriate interval choice. They quantify random sampling error only.",

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
