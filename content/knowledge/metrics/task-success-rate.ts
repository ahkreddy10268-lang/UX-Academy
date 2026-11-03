import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "task-success-rate",
  slug: "task-success-rate",
  title: "Task Success Rate",
  alternateNames: ["Completion rate", "Task completion rate", "Success rate", "Effectiveness rate"],
  summary:
    "The proportion of participants who complete a task against defined success criteria. It is the most fundamental behavioural usability metric, and with small samples it should always be reported with an adjusted-Wald confidence interval.",
  definition:
    "Task success rate is the proportion *x/n* of attempts in which participants achieve a task's predefined goal state. It is a binary measure of **effectiveness**, one of the three components of usability in ISO 9241-11. Because usability samples are small, it is estimated with a binomial confidence interval; the **adjusted-Wald** interval is recommended for small samples {{src:sauro-lewis-2005}}.",
  primaryType: "metric",
  secondaryTypes: ["formula"],
  domain: "metrics",
  subcategory: "usability-metrics",
  tags: ["effectiveness", "completion rate", "binomial", "confidence interval", "benchmark", "small samples"],
  difficulty: "beginner",
  disciplines: ["UX research", "Usability engineering", "Statistics"],
  learningObjectives: [
    "Define task success criteria before testing.",
    "Calculate a success rate and its adjusted-Wald confidence interval.",
    "Explain why 8/10 does not mean '80% of all users will succeed'.",
    "Choose between binary, partial-credit and failure-type coding.",
  ],
  prerequisites: ["usability"],

  levels: {
    beginner: {
      explanation: [
        "The simplest question you can ask about a design is: **can people actually do the thing?** Task success rate counts how many people completed a task out of how many tried. If 7 of 10 participants booked an appointment correctly, the success rate is 70%.",
        "Before testing, you must decide what counts as success, for example 'reached the confirmation page with the correct date and time'. Without a clear definition, different observers will count differently.",
        "With small groups the number is uncertain. Seven out of ten could easily come from a design where the true success rate is 45% or 85%. That is why researchers report a **range**, called a confidence interval, as well as the percentage.",
      ],
      analogy:
        "Like a basketball player's free-throw percentage after just ten shots: 7 of 10 tells you something, but you would not bet that they are exactly a 70% shooter until you had seen many more shots.",
      everydayExamples: [
        "Out of 12 people, 9 found the 'cancel subscription' option without help: 75% success.",
        "In an unmoderated test of 200 participants, 156 correctly found a product's return policy: 78% success.",
        "Comparing success for 'change delivery address' before and after a navigation redesign.",
      ],
      vocabulary: [
        { term: "Success criteria", meaning: "The precise, observable end state that counts as completing the task." },
        { term: "Binary", meaning: "Each attempt is coded as success (1) or failure (0)." },
        { term: "Confidence interval", meaning: "A range that plausibly contains the true success rate for the whole user population." },
        { term: "Effectiveness", meaning: "The accuracy and completeness with which users achieve goals (ISO 9241-11)." },
      ],
    },
    intermediate: {
      explanation: [
        "Success rate operationalises **effectiveness**. It answers 'can users do it?', where time on task answers 'how efficiently?' and satisfaction measures answer 'how did it feel?'. Report it per task; an average across tasks of different difficulty hides where the problems are.",
        "Usability tests typically have 5–20 participants per group, where the textbook *Wald* interval (p ± z√(p(1−p)/n)) fails badly: it can extend below 0% or above 100%, and its coverage is often well below the nominal 95%. Agresti & Coull (1998) showed that adding z²/2 successes and z²/2 failures (about two of each at 95%) before applying the Wald formula gives far better coverage {{src:agresti-coull-1998}}. Sauro & Lewis (2005) evaluated binomial intervals on usability-style data and recommended this **adjusted-Wald** interval for completion rates {{src:sauro-lewis-2005}}.",
        "The interval is the honest headline. '7 of 10 succeeded (70%; 95% CI 39%–90%)' tells stakeholders the design may be fine or may fail more than half the time. More participants are needed for a precise estimate.",
      ],
      howItWorks: [
        "Compute p̂ = x/n for the point estimate.",
        "For the interval, compute p_adj = (x + z²/2)/(n + z²) and n_adj = n + z², then p_adj ± z·√(p_adj(1 − p_adj)/n_adj), clipped to [0, 1].",
        "Even 10 of 10 has an interval that does not reach 100% at its lower end (≈68%–100%). Perfect performance in a small test is not proof of perfect usability.",
      ],
      implementation: [
        "Write success criteria for every task before the first session, including what counts as an assist (usually a failure).",
        "Code each attempt independently with a second coder for a subset; resolve disagreements.",
        "Report per task: x/n, percentage, 95% adjusted-Wald CI, and the main failure reasons.",
        "Benchmark against a target or a previous version; compare intervals rather than point estimates.",
        "Pair with qualitative observations: the metric shows *that* people fail; observation shows *why*.",
      ],
      scenarios: [
        "Two designs score 6/8 and 7/8 success. Both intervals are wide and overlap almost entirely, so call it a tie and investigate failure reasons.",
        "An unmoderated benchmark of 120 participants gives 84/120 (70%; CI ≈ 61%–78%), precise enough to compare against a 75% target.",
      ],
    },
    advanced: {
      explanation: [
        "Binary success assumes the outcome is well-defined and independent across participants. For tasks with partial outcomes, some teams use **levels of success** (complete, partial, failure) or 'success with assistance'. This adds information but complicates interval estimation and comparability.",
        "Choice of interval matters most at small n and extreme proportions. The 'exact' Clopper–Pearson interval is conservative (too wide); the Wald interval is anti-conservative (too narrow). Adjusted-Wald performs close to nominal coverage across the range {{src:agresti-coull-1998}}. For a point estimate, Sauro & Lewis also discuss alternatives to the raw proportion when x/n is 0 or 1 {{src:sauro-lewis-2005}}.",
        "Comparing two success rates calls for a test suited to small samples, such as the N−1 two-proportion test discussed by Sauro & Lewis, or McNemar's test for within-subjects designs {{src:sauro-lewis-2016}}. Large-sample online comparisons use the two-proportion z-test (see [[ab-testing]]).",
      ],
      evidence: [
        "Agresti & Coull demonstrated that approximate intervals with added pseudo-observations outperform the 'exact' interval in coverage for binomial proportions {{src:agresti-coull-1998}}.",
        "Sauro & Lewis's comparison on usability-test-sized samples supports adjusted-Wald for completion-rate intervals {{src:sauro-lewis-2005}}.",
      ],
      debates: [
        "**What counts as success?** Strict criteria (correct and unassisted) and lenient criteria (reached the end) can produce very different rates; the definition must be reported.",
        "**Averaging across tasks.** An overall success rate weights tasks equally regardless of importance or frequency; some teams weight by task criticality.",
        "**Lab versus real world.** Assigned tasks with motivated participants usually overestimate real-world success.",
      ],
      alternativeModels: [
        "**Error rate**: counts slips and mistakes within attempts, giving more diagnostic detail than binary success.",
        "**Time on task**: efficiency, usually reported as a geometric mean for skewed times.",
        "**Single Usability Metric (SUM)**: combines success, time, errors and satisfaction into one standardised score.",
      ],
    },
  },

  origin: {
    contributors: ["Usability engineering practice", "Alan Agresti & Brent Coull (interval method)", "Jeff Sauro & James R. Lewis (application to usability)"],
    period: "Completion rates in usability engineering from the 1980s; adjusted-Wald interval 1998; usability recommendation 2005",
    problem:
      "Usability teams needed a simple behavioural measure of effectiveness, and an honest way to express its uncertainty with the small samples typical of usability testing.",
    narrative: [
      "Task completion has been a core measure since early usability engineering, and is enshrined in the ISO 9241-11 notion of effectiveness {{src:iso-9241-11-2018}}.",
      "Agresti & Coull's 1998 paper popularised the adjusted (pseudo-count) Wald interval {{src:agresti-coull-1998}}. Sauro & Lewis evaluated interval methods for usability data in 2005 and recommended adjusted-Wald {{src:sauro-lewis-2005}}, later consolidated in their textbook {{src:sauro-lewis-2016}}.",
    ],
  },

  application: {
    summary: [
      "Task success is the backbone of **summative usability benchmarks**: it shows whether critical tasks can be done, how a redesign compares, and where to look first.",
    ],
    web: [
      "Benchmark critical journeys (checkout, account recovery, search-to-purchase) in unmoderated studies with larger samples.",
    ],
    mobile: [
      "Include context-specific tasks (one-handed, interrupted). Success can drop markedly outside the lab.",
    ],
    enterprise: [
      "Track success for high-frequency workflows by role; failures there have direct productivity costs.",
    ],
    services: [
      "Measure end-to-end service completion (for example, a successfully submitted, error-free application), not only digital steps.",
    ],
    steps: [
      "Select critical tasks and write unambiguous success criteria.",
      "Recruit representative participants; decide moderated or unmoderated.",
      "Code each attempt as success or failure (with failure reasons).",
      "Compute x/n and the 95% adjusted-Wald interval per task.",
      "Compare with targets or previous versions using intervals; report failure themes.",
    ],
  },

  whenToUse: [
    "Any summative usability evaluation or benchmark.",
    "Checking whether critical tasks meet a minimum target.",
    "Comparing designs on effectiveness, with an appropriate test.",
  ],
  whenNotToUse: [
    "When tasks have no clear end state (exploratory browsing). Use qualitative or engagement measures.",
    "As the only metric when efficiency or satisfaction matters.",
    "Reporting a bare percentage from a small sample without an interval.",
  ],
  advantages: [
    "Easy to understand and communicate.",
    "Directly tied to user goals.",
    "Robust statistical treatment available even for small samples.",
  ],
  limitations: [
    "Binary coding loses nuance (near misses, slow successes).",
    "Depends heavily on the success definition.",
    "Lab task success tends to overestimate real-world success.",
    "Small samples give wide intervals.",
  ],
  misconceptions: [
    {
      myth: "8 out of 10 succeeded, so 80% of our users will succeed.",
      reality: "8/10 gives a 95% adjusted-Wald interval of roughly 48%–95%. The true population rate is uncertain.",
    },
    {
      myth: "If all five participants succeeded, the task has no usability problems.",
      reality: "5/5 is compatible with a true success rate well below 100% (the 95% adjusted-Wald lower bound is about 51%), and success can hide slow, error-prone or frustrated completions.",
    },
    {
      myth: "The standard Wald interval is fine for usability tests.",
      reality: "At small n it has poor coverage and can extend beyond 0–100%. Use adjusted-Wald.",
    },
  ],

  relations: [
    { target: "usability", type: "measured-by", note: "Task success operationalises the effectiveness component of usability." },
    { target: "usability-testing", type: "applied-in", note: "Success rates are collected in usability tests against predefined criteria." },
    { target: "confidence-intervals", type: "complementary-to", note: "Small-sample success rates require binomial confidence intervals to be interpreted honestly." },
    { target: "time-on-task", type: "complementary-to", note: "Time on task measures efficiency, the second ISO usability component." },
    { target: "error-rate", type: "related-to", note: "Error rate adds diagnostic detail within attempts that binary success hides." },
    { target: "system-usability-scale", type: "complementary-to", note: "SUS captures perceived usability, which can diverge from observed success." },
    { target: "effectiveness", type: "related-to", note: "Effectiveness is the ISO 9241-11 construct that task success measures." },
  ],

  formulas: [
    {
      id: "task-success-adjusted-wald",
      name: "Task success rate with adjusted-Wald confidence interval",
      expression: "p̂ = x / n      p_adj = (x + z²/2) / (n + z²)      CI = p_adj ± z · √[ p_adj (1 − p_adj) / (n + z²) ]",
      contributor: "Agresti & Coull (1998); recommended for usability by Sauro & Lewis (2005)",
      source: "agresti-coull-1998",
      variables: [
        { symbol: "x", name: "Successes", unit: "count", description: "Attempts meeting the success criteria." },
        { symbol: "n", name: "Attempts", unit: "count", description: "Total participants (or attempts) for the task." },
        { symbol: "p̂", name: "Observed success rate", unit: "proportion", description: "Point estimate x/n." },
        { symbol: "z", name: "Critical value", unit: "—", description: "1.96 for 95% confidence (1.645 for 90%)." },
        { symbol: "p_adj", name: "Adjusted proportion", unit: "proportion", description: "Centre of the adjusted-Wald interval." },
      ],
      resultUnit: "proportion (0–1) or percentage, with interval bounds",
      assumptions: [
        "Each attempt is an independent Bernoulli trial with the same underlying success probability.",
        "Participants are representative of the target population.",
        "Success criteria were defined before data collection and applied consistently.",
      ],
      conditions: [
        "Suitable for any n, and particularly recommended for small samples.",
        "Clip bounds to [0, 1].",
      ],
      steps: [
        "Count successes x and attempts n; compute p̂ = x/n.",
        "Choose z (1.96 for 95%) and compute z².",
        "Compute p_adj = (x + z²/2)/(n + z²).",
        "Compute the margin z·√(p_adj(1 − p_adj)/(n + z²)).",
        "Interval = p_adj ± margin, clipped to [0, 1]. Report p̂ with this interval.",
      ],
      workedExample: {
        given: ["7 of 10 participants completed the task; 95% confidence (z = 1.96)."],
        steps: [
          "p̂ = 7/10 = 0.70",
          "z² = 3.8416; p_adj = (7 + 1.9208)/(10 + 3.8416) = 8.9208/13.8416 ≈ 0.6445",
          "Margin = 1.96 × √(0.6445 × 0.3555 / 13.8416) ≈ 1.96 × 0.1287 ≈ 0.2522",
          "CI = 0.6445 ± 0.2522 → 0.392 to 0.897",
        ],
        result: "70% success (95% CI ≈ 39%–90%). For comparison, 10 of 10 gives ≈ 68%–100%.",
      },
      interpretation: [
        "The interval is the plausible range of the population success rate. If it lies entirely above your target, you have evidence of meeting it; if it straddles the target, you need more data.",
        "Intervals that overlap substantially do not show a difference. Use a proper two-proportion test to compare.",
      ],
      commonErrors: [
        "Using the plain Wald interval with small n.",
        "Reporting p_adj instead of p̂ as the success rate.",
        "Counting assisted completions as successes without saying so.",
        "Averaging success across tasks of different difficulty.",
      ],
      limitations: [
        "Binary outcome only.",
        "Assumes independent attempts (violated if a participant attempts the same task repeatedly).",
        "Does not address representativeness of the sample.",
      ],
      alternatives: [
        { name: "Wald (large samples only)", expression: "p̂ ± z√(p̂(1 − p̂)/n)", note: "Acceptable when n·p̂ and n·(1 − p̂) are both large; poor at usability-test sizes." },
        { name: "Clopper–Pearson 'exact'", expression: "Beta-distribution quantiles", note: "Guaranteed coverage but conservative (wide)." },
        { name: "Wilson score interval", expression: "(p̂ + z²/2n ± z√(p̂(1−p̂)/n + z²/4n²)) / (1 + z²/n)", note: "Performs similarly to adjusted-Wald; its centre equals p_adj." },
      ],
      calculator: "task-success",
    },
  ],

  exercises: [
    {
      id: "task-success-rate-ex-ci",
      kind: "calculation",
      level: "intermediate",
      title: "Interval for a small test",
      prompt: [
        "In a test with 8 participants, 6 completed the task. Calculate the observed success rate and the 95% adjusted-Wald interval. Does the interval support a claim that at least 70% of users can complete the task?",
      ],
      deliverable: "p̂, the interval and a one-sentence conclusion.",
      criteria: ["Correct p_adj", "Correct margin", "Conclusion acknowledges uncertainty"],
      exampleSolution: [
        "p̂ = 0.75. p_adj = (6 + 1.9208)/(8 + 3.8416) = 7.9208/11.8416 ≈ 0.669. Margin = 1.96 × √(0.669 × 0.331/11.8416) ≈ 1.96 × 0.1367 ≈ 0.268. CI ≈ 0.40 to 0.94.",
        "The interval runs from about 40% to 94%, well below 70% at its lower end, so the data do not support the claim. More participants are needed.",
      ],
    },
    {
      id: "task-success-rate-ex-criteria",
      kind: "assignment",
      level: "beginner",
      title: "Write success criteria",
      prompt: [
        "For the task 'Change the delivery address for your next order', write success criteria that two observers could apply consistently. Include what counts as failure and how assists are handled.",
      ],
      criteria: ["Observable end state", "Defines partial and assisted outcomes", "Unambiguous"],
    },
    {
      id: "task-success-rate-ex-compare",
      kind: "critique",
      level: "advanced",
      title: "Is it really better?",
      prompt: [
        "Design A: 9/12 success. Design B: 11/12 success. A colleague concludes B is better. Compute both intervals and explain what further evidence would justify the conclusion.",
      ],
      criteria: ["Computes both intervals", "Notes overlap", "Suggests a test or larger sample"],
    },
  ],

  quiz: [
    {
      id: "task-success-rate-q-interpret",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In a usability test, 9 of 10 participants succeeded. What is the best way to report this?",
      options: [
        { text: "90% of users can complete the task.", correct: false, explanation: "This overstates certainty; the sample is small." },
        { text: "90% success (9/10), with a 95% adjusted-Wald interval of roughly 57%–100%.", correct: true, explanation: "Report the observed rate, the raw counts and the interval." },
        { text: "The task is fully usable.", correct: false, explanation: "One failure and a wide interval do not support that claim." },
        { text: "The result is meaningless because n is small.", correct: false, explanation: "Small samples are informative when uncertainty is reported." },
      ],
      explanation: "Give raw counts, the percentage and the interval. The interval communicates the uncertainty of small samples.",
    },
    {
      id: "task-success-rate-q-wald",
      kind: "true-false",
      level: "intermediate",
      prompt: "For usability tests with fewer than 20 participants, the standard Wald interval p ± z√(p(1−p)/n) is the recommended interval.",
      options: [
        { text: "True", correct: false, explanation: "The Wald interval has poor coverage at small n and can exceed 0–100%." },
        { text: "False", correct: true, explanation: "The adjusted-Wald interval is recommended for small usability samples (Sauro & Lewis, 2005)." },
      ],
      explanation: "Adding z²/2 successes and failures (adjusted-Wald) fixes the Wald interval's small-sample problems.",
    },
    {
      id: "task-success-rate-q-padj",
      kind: "formula",
      level: "advanced",
      prompt: "For x = 5 and n = 5 at 95% confidence, what is p_adj (the centre of the adjusted-Wald interval)?",
      options: [
        { text: "≈ 0.79", correct: true, explanation: "(5 + 1.9208)/(5 + 3.8416) = 6.9208/8.8416 ≈ 0.783." },
        { text: "1.00", correct: false, explanation: "That is p̂, the observed proportion, not the adjusted centre." },
        { text: "≈ 0.50", correct: false, explanation: "That would be the centre with no data." },
        { text: "≈ 0.88", correct: false, explanation: "This adds only one success and one failure: 6/7 ≈ 0.86." },
      ],
      explanation: "p_adj shrinks extreme proportions toward 0.5 by adding about two successes and two failures at 95%.",
    },
  ],

  flashcards: [
    { id: "task-success-rate-fc-formula", front: "Adjusted-Wald centre p_adj", back: "(x + z²/2)/(n + z²); at 95%, about (x + 2)/(n + 4)." },
    { id: "task-success-rate-fc-report", front: "How to report task success", back: "x/n, percentage and 95% adjusted-Wald CI, per task, with failure reasons." },
    { id: "task-success-rate-fc-iso", front: "Which ISO 9241-11 component does task success measure?", back: "Effectiveness." },
  ],

  references: [
    { source: "sauro-lewis-2005", role: "primary", note: "Comparison of binomial intervals for completion rates; adjusted-Wald recommendation." },
    { source: "agresti-coull-1998", role: "primary", note: "Adjusted (pseudo-count) Wald interval." },
    { source: "iso-9241-11-2018", role: "standard", note: "Effectiveness as a component of usability." },
    { source: "sauro-lewis-2016", role: "explanatory", note: "Practical treatment of completion rates and comparisons." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "The statistical method is well supported by peer-reviewed statistics and usability research. The metric is only as valid as its success criteria and the representativeness of its participants. It supports conclusions about effectiveness on the tested tasks, not about overall product quality.",

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
