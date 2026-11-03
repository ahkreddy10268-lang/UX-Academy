import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "system-usability-scale",
  slug: "system-usability-scale",
  title: "System Usability Scale (SUS)",
  alternateNames: ["SUS", "Brooke's SUS", "SUS questionnaire"],
  summary:
    "A ten-item post-test questionnaire that produces a single 0–100 score of perceived usability. The score is not a percentage; it gets its meaning from comparison with published norms.",
  definition:
    "The System Usability Scale is a standardised questionnaire of ten five-point Likert items, alternating positively and negatively worded statements, that yields a single composite score between 0 and 100 representing a respondent's **subjective assessment of usability**. It was developed by John Brooke at Digital Equipment Corporation in 1986 and published in 1996 {{src:brooke-1996}}.",
  primaryType: "research-instrument",
  secondaryTypes: ["metric"],
  domain: "metrics",
  subcategory: "usability-metrics",
  tags: ["questionnaire", "perceived usability", "satisfaction", "benchmarking", "post-test", "psychometrics"],
  difficulty: "beginner",
  disciplines: ["UX research", "Usability engineering", "Psychometrics", "Human factors"],
  learningObjectives: [
    "Explain what SUS measures, and what it does not.",
    "Score a SUS response correctly, including the reverse-scored items and the ×2.5 conversion.",
    "Interpret a SUS score against norms rather than as a percentage or school grade.",
    "Plan when to administer SUS and how to report it with a confidence interval.",
  ],
  prerequisites: ["usability"],

  levels: {
    beginner: {
      explanation: [
        "After someone has tried a product, you may want to know how easy it *felt* to use. The System Usability Scale is a short, standard questionnaire for exactly that. People answer ten statements on a scale from 'strongly disagree' to 'strongly agree', and their answers are combined into one number between 0 and 100.",
        "Half the statements are positive (for example, that the system was easy to use) and half are negative (for example, that it was unnecessarily complex). Alternating them makes people read each statement instead of ticking the same column all the way down.",
        "**A SUS score is not a percentage.** A score of 70 does not mean the product is '70% usable'. The number only makes sense when you compare it with other products, with an earlier version, or with the published average of about 68 {{src:lewis-2018-sus}}.",
      ],
      analogy:
        "SUS is like a standard thermometer for perceived usability. The number on its own means little, but because everyone uses the same thermometer you can tell whether today is warmer than yesterday, or warmer than average.",
      everydayExamples: [
        "After a usability test of a new banking app, each participant fills in SUS and the team compares the average with the old app.",
        "A software company sends SUS every quarter to track whether redesigns change how usable customers find the product.",
        "Two prototype navigation designs are tested with different groups; SUS gives one comparable number for each.",
      ],
      vocabulary: [
        { term: "Questionnaire", meaning: "A fixed set of questions given to everyone in the same way." },
        { term: "Likert item", meaning: "A statement people rate on an agree–disagree scale, here from 1 to 5." },
        { term: "Reverse-scored item", meaning: "A negatively worded statement where agreeing means *worse* usability, so its score is flipped." },
        { term: "Norm", meaning: "A reference value, here the average SUS score across many published studies." },
        { term: "Perceived usability", meaning: "How usable people feel a product is, as opposed to how well they actually performed." },
      ],
    },
    intermediate: {
      explanation: [
        "SUS is a **post-test, system-level** measure. Administer it after participants have used the product enough to form a view, usually at the end of a usability session or after a period of real use. Do not give it after every task. Task-level questionnaires such as the Single Ease Question serve that purpose.",
        "Scoring has three steps. For odd-numbered items (positively worded), the contribution is the response minus 1. For even-numbered items (negatively worded), it is 5 minus the response. Each item then contributes 0–4. Multiply the sum (0–40) by 2.5 to get 0–100. Score each respondent first, then average the respondents' scores.",
        "Interpretation is **normative**. Lewis's review puts the mean of large published data sets at about 68 {{src:lewis-2018-sus}}, and Bangor, Kortum & Miller (2008) analysed thousands of SUS administrations and reported high internal reliability {{src:bangor-kortum-miller-2008}}. Sauro and Lewis convert scores to percentile ranks and a curved letter grade {{src:sauro-lewis-2016}}. Use these to say 'above average' or 'in the bottom quartile', not 'good' or 'bad' in absolute terms.",
      ],
      howItWorks: [
        "The ten items cover, in paraphrase: willingness to use the system frequently; unnecessary complexity; ease of use; needing technical support; how well the functions are integrated; inconsistency; how quickly most people would learn it; awkwardness; confidence in use; and how much had to be learned before getting going.",
        "Alternating item tone was intended to reduce *acquiescence bias*, the tendency to agree. It also introduces errors: respondents who misread a negative item, and analysts who forget to reverse-score. Sauro & Lewis (2011) found an all-positive version produced statistically equivalent scores with fewer such mistakes {{src:sauro-lewis-2011}}.",
        "The score is treated as interval-level data for averaging and confidence intervals. This is standard practice, and a pragmatic assumption rather than a proven property.",
      ],
      implementation: [
        "Use the standard ten items unchanged, in order, on a 1–5 scale. Swapping 'system' for 'website' or 'app' is a commonly accepted adaptation.",
        "Require an answer to every item. If a participant cannot answer, record the scale midpoint (3) as Brooke recommends, and report how often you did so.",
        "Score respondent-by-respondent, then report the mean with a 95% confidence interval (see [[confidence-intervals]]), the sample size and a comparison point.",
        "For before/after comparisons, use the same audience, tasks and administration timing, or differences will reflect context rather than design.",
        "Pair SUS with behavioural measures such as [[task-success-rate|task success]] and time on task. Perceived and objective usability often disagree.",
      ],
      scenarios: [
        "A redesign moves the mean SUS from 62 to 71 with overlapping confidence intervals at n = 12. Report it as a promising change that needs a larger sample, not as proof of improvement.",
        "A stakeholder reads '74/100' as 'a C grade'. Explain that 74 sits above the ≈68 average, so it is above average, not mediocre.",
        "An enterprise tool scores 55. Expert users may still prefer it to alternatives, so SUS alone does not tell you whether to rebuild.",
      ],
    },
    advanced: {
      explanation: [
        "Psychometrically, SUS is short but reliable: Bangor et al. (2008) reported internal consistency (Cronbach's α) of about 0.9 {{src:bangor-kortum-miller-2008}}. Its validity rests on correlations with other usability questionnaires and with task performance, and on its sensitivity to differences between products.",
        "**Dimensionality** is debated. Lewis & Sauro (2009) reported two factors: a large 'usability' factor (eight items) and a 'learnability' factor (items 4 and 10) {{src:lewis-sauro-2009}}. Later analyses did not consistently reproduce that split, and Lewis's 2018 review concludes that SUS is best interpreted as a single overall score. Subscale scores should be used cautiously {{src:lewis-2018-sus}}.",
        "Because the scale is normative, its meaning depends on the reference distribution. Norms differ by product type and by whether respondents are new or experienced users. Brooke (2013) cautions that SUS is a quick, high-level measure, not a diagnostic: it tells you *whether* perceived usability is a problem, not *why* {{src:brooke-2013}}.",
      ],
      evidence: [
        "Brooke's original chapter presents SUS as a 'quick and dirty' tool designed for fast, low-cost comparisons in industrial settings {{src:brooke-1996}}.",
        "Bangor et al. analysed thousands of SUS responses collected across many studies and products, and report reliability and the distribution of scores {{src:bangor-kortum-miller-2008}}.",
        "Sauro & Lewis's comparison of the standard and all-positive versions found no meaningful score difference, but more scoring and response errors with the mixed-tone version {{src:sauro-lewis-2011}}.",
      ],
      debates: [
        "**One score or two?** The learnability factor is attractive for diagnosis, but its instability across data sets argues against reporting it routinely.",
        "**Interval or ordinal?** Averaging Likert-based composites assumes equal intervals. Most usability researchers accept this for multi-item scales; purists prefer non-parametric summaries.",
        "**Adjective labels.** Mapping scores to words ('good', 'excellent') aids communication but can imply absolute meaning the scale does not have.",
      ],
      alternativeModels: [
        "**[[umux-lite|UMUX-LITE]]**: a two-item instrument with a regression adjustment that tracks SUS closely; useful where questionnaire length is critical.",
        "**SUPR-Q, QUIS, CSUQ/PSSUQ**: longer instruments with subscales. They offer more diagnosis at the cost of time and comparability.",
        "**[[nasa-tlx|NASA-TLX]]**: measures workload, not usability. The two are complementary when a task feels demanding but the product is still considered usable.",
      ],
    },
  },

  origin: {
    contributors: ["John Brooke"],
    period: "1986 (developed at Digital Equipment Corporation, UK); published 1996",
    problem:
      "Industrial usability programmes needed a quick, cheap, standard way to compare the subjective usability of very different systems, without long questionnaires or expert analysis.",
    narrative: [
      "Brooke created SUS in 1986 at Digital Equipment Corporation as part of a usability engineering programme for office systems, and published it in 1996 in *Usability Evaluation in Industry* {{src:brooke-1996}}.",
      "Over the following decades SUS became the most widely used standardised usability questionnaire. Its strength is the large body of comparative data, not a uniquely superior design {{src:lewis-2018-sus}}.",
      "Brooke's 2013 retrospective reflects on its spread, misuses and scoring {{src:brooke-2013}}.",
    ],
    attributionNote:
      "SUS was developed in 1986, but its first formal publication is the 1996 chapter. The 'average of 68' comes from later aggregation work (Sauro, Lewis and others), not from Brooke's original publication.",
  },

  application: {
    summary: [
      "SUS works as a **benchmark and tracking metric**: it compares designs, versions and competitors on perceived usability using a widely understood instrument.",
    ],
    web: [
      "Run SUS at the end of moderated or unmoderated usability tests on a website, after the participant completes a set of representative tasks.",
      "Track quarterly SUS from a recruited panel to see whether major redesigns change perceived usability.",
    ],
    mobile: [
      "Administer SUS after a guided session with the app. For in-app intercepts, consider UMUX-LITE to reduce burden.",
    ],
    enterprise: [
      "Benchmark internal tools before procurement or redesign decisions; segment by role and experience level, because expert and novice norms differ.",
    ],
    services: [
      "Adapt the wording ('service' instead of 'system') with care, and state the adaptation when reporting. Comparison with system norms becomes weaker.",
    ],
    steps: [
      "Define what is being compared (versions, competitors, baseline) and the target audience.",
      "Choose a sample size that gives a useful confidence interval (see [[sample-size-estimation]]).",
      "Administer the standard ten items after participants have completed representative tasks.",
      "Score each respondent: odd items r − 1, even items 5 − r, sum × 2.5.",
      "Report the mean, the 95% confidence interval, n and a percentile or norm comparison.",
      "Combine with behavioural metrics and qualitative findings to explain the score.",
    ],
  },

  whenToUse: [
    "Benchmarking perceived usability across versions, competitors or alternative designs.",
    "Adding a standard, comparable subjective measure to a usability test.",
    "Tracking perceived usability over time with consistent methodology.",
  ],
  whenNotToUse: [
    "Diagnosing *why* something is hard to use. SUS gives no item-level diagnosis; use observation and interviews.",
    "Measuring after individual tasks. Use a task-level question instead.",
    "Comparing tiny samples and declaring a winner without confidence intervals.",
    "Measuring emotional appeal, trust or usefulness, which SUS does not target directly.",
  ],
  advantages: [
    "Short (about two minutes to complete) and technology-agnostic. It is widely used without licence fees; check the licence terms in Brooke's publications before reproducing the item wording.",
    "Large normative data set for interpretation.",
    "Reliable even with modest samples.",
  ],
  limitations: [
    "Measures perceived usability only; it can diverge from task performance.",
    "Negatively worded items cause respondent and scoring errors.",
    "Norm-referenced: the meaning depends on the comparison population.",
    "Not diagnostic; subscales are unstable.",
  ],
  misconceptions: [
    {
      myth: "A SUS score of 68 means the product is 68% usable.",
      reality: "SUS is a 0–100 *scale*, not a percentage. A score of 68 is roughly the 50th percentile of published scores, i.e. average.",
    },
    {
      myth: "You can average the raw item responses and multiply by 2.5.",
      reality: "Even-numbered items must be reverse-scored (5 − r) and odd items shifted (r − 1) before summing. Skipping this produces meaningless scores.",
    },
    {
      myth: "A high SUS means users succeeded at their tasks.",
      reality: "Perceived and objective usability correlate only moderately. People sometimes rate a system highly even after failing tasks, so measure [[task-success-rate|task success]] separately.",
    },
  ],

  relations: [
    { target: "usability", type: "measured-by", note: "SUS operationalises the satisfaction component of usability as defined in ISO 9241-11." },
    { target: "umux-lite", type: "related-to", note: "UMUX-LITE is a two-item alternative designed to correspond closely with SUS scores." },
    { target: "usability-testing", type: "applied-in", note: "SUS is typically administered at the end of a usability test session." },
    { target: "confidence-intervals", type: "complementary-to", note: "A SUS mean should always be reported with a confidence interval, because samples are small." },
    { target: "nasa-tlx", type: "contrasts-with", note: "NASA-TLX measures perceived workload rather than perceived usability; the two answer different questions." },
    { target: "questionnaires", type: "derived-from", note: "SUS is an application of Likert-type questionnaire design to usability measurement." },
    { target: "satisfaction", type: "measured-by", note: "SUS is the most common operational measure of satisfaction with an interactive system." },
  ],

  formulas: [
    {
      id: "sus-score",
      name: "SUS score",
      expression: "SUS = 2.5 × [ Σ₍odd i₎ (rᵢ − 1) + Σ₍even i₎ (5 − rᵢ) ]",
      contributor: "Brooke (1996)",
      source: "brooke-1996",
      variables: [
        { symbol: "rᵢ", name: "Response to item i", unit: "1–5", description: "1 = strongly disagree, 5 = strongly agree." },
        { symbol: "odd i", name: "Items 1, 3, 5, 7, 9", unit: "—", description: "Positively worded items; contribution = r − 1." },
        { symbol: "even i", name: "Items 2, 4, 6, 8, 10", unit: "—", description: "Negatively worded items; contribution = 5 − r." },
        { symbol: "SUS", name: "SUS score", unit: "0–100 scale points", description: "Composite score for one respondent; average across respondents." },
      ],
      resultUnit: "points on a 0–100 scale (not a percentage)",
      assumptions: [
        "The standard ten items were administered in order, on a 1–5 scale.",
        "All ten items were answered (missing items imputed at the midpoint and reported).",
        "The composite is treated as interval data for averaging.",
      ],
      conditions: [
        "Administer after the participant has used the system for representative tasks.",
        "Use the all-positive variant only with its own scoring, where every item contributes r − 1.",
      ],
      steps: [
        "For items 1, 3, 5, 7 and 9, subtract 1 from the response.",
        "For items 2, 4, 6, 8 and 10, subtract the response from 5.",
        "Sum the ten contributions (0–40).",
        "Multiply by 2.5 to obtain 0–100.",
        "Repeat for each respondent, then average and compute a confidence interval.",
      ],
      workedExample: {
        given: ["One respondent answered items 1–10 with: 4, 2, 4, 1, 5, 2, 4, 2, 4, 3."],
        steps: [
          "Odd items (1,3,5,7,9) = 4, 4, 5, 4, 4 → contributions 3 + 3 + 4 + 3 + 3 = 16",
          "Even items (2,4,6,8,10) = 2, 1, 2, 2, 3 → contributions 3 + 4 + 3 + 3 + 2 = 15",
          "Sum = 16 + 15 = 31",
          "SUS = 31 × 2.5 = 77.5",
        ],
        result: "SUS = 77.5, above the ≈68 average reported across published studies.",
      },
      interpretation: [
        "Compare means with norms (≈68 average), with earlier versions or with competitors, and always with a confidence interval.",
        "Differences of a few points between small groups are usually within sampling error.",
      ],
      commonErrors: [
        "Forgetting to reverse-score even items.",
        "Averaging item responses across respondents before scoring each respondent.",
        "Reporting SUS as a percentage or as a school grade without a curve.",
        "Administering after each task instead of after the session.",
      ],
      limitations: [
        "A single composite with no reliable subscale diagnosis.",
        "Norms depend on product type and user experience.",
        "Perceived, not objective, usability.",
      ],
      alternatives: [
        { name: "All-positive SUS", expression: "SUS₊ = 2.5 × Σ (rᵢ − 1)", note: "Every item is positively worded; Sauro & Lewis (2011) found equivalent scores with fewer errors." },
        { name: "UMUX-LITE (regression-adjusted)", expression: "0.65 × UMUX-LITE_raw + 22.9", note: "Two-item proxy calibrated to the SUS scale." },
      ],
      calculator: "sus",
    },
  ],

  exercises: [
    {
      id: "system-usability-scale-ex-score",
      kind: "calculation",
      level: "beginner",
      title: "Score three respondents",
      prompt: [
        "Respondent A answered 5,1,5,1,5,1,5,1,5,1. Respondent B answered 3,3,3,3,3,3,3,3,3,3. Respondent C answered 2,4,3,4,2,3,3,4,2,4.",
        "Score each respondent and compute the mean SUS.",
      ],
      deliverable: "Three scores and their mean.",
      criteria: ["Reverse-scores even items", "Multiplies by 2.5", "Scores respondents before averaging"],
      exampleSolution: [
        "A: odd 4×5 = 20, even 4×5 = 20 → 40 × 2.5 = 100. B: every item contributes 2 → 20 × 2.5 = 50. C: odd contributions 1+2+1+2+1 = 7, even 1+1+2+1+1 = 6 → 13 × 2.5 = 32.5.",
        "Mean = (100 + 50 + 32.5) / 3 = 60.8. Note that B's neutral answers score 50, not 68: the midpoint of the scale is not the average of real products.",
      ],
    },
    {
      id: "system-usability-scale-ex-report",
      kind: "assignment",
      level: "intermediate",
      title: "Write an honest SUS readout",
      prompt: [
        "A redesign was tested with 10 participants (mean SUS 73, SD 14) against a baseline of 10 participants (mean 64, SD 16).",
        "Write a one-paragraph readout for stakeholders that reports both means with 95% confidence intervals, compares them with the ≈68 norm, and states what can and cannot be concluded.",
      ],
      deliverable: "One paragraph plus the two intervals.",
      criteria: [
        "Uses t-based intervals (t₀.₉₇₅,₉ ≈ 2.262)",
        "Avoids claiming a definitive improvement when the intervals overlap",
        "Recommends a next step (larger sample or behavioural data)",
      ],
      exampleSolution: [
        "Redesign: 73 ± 2.262 × 14/√10 ≈ 73 ± 10.0 → 63–83. Baseline: 64 ± 2.262 × 16/√10 ≈ 64 ± 11.4 → 52.6–75.4.",
        "The redesign's mean is above the ≈68 average and the baseline's below it, but the intervals overlap substantially. The direction is encouraging; the evidence is not yet strong enough to claim an improvement. A larger sample, or a within-subjects comparison, would resolve it.",
      ],
    },
    {
      id: "system-usability-scale-ex-reflect",
      kind: "reflection",
      level: "advanced",
      title: "When SUS and behaviour disagree",
      prompt: [
        "Participants rated a product SUS 82 but only 55% completed the key task. Give three plausible explanations, and describe what you would do to find out which applies.",
      ],
      criteria: ["Considers social desirability and acquiescence", "Considers task selection and sample", "Proposes triangulating evidence"],
    },
  ],

  quiz: [
    {
      id: "system-usability-scale-q-percent",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A product scores 70 on the SUS. Which statement is most accurate?",
      options: [
        { text: "The product is 70% usable.", correct: false, explanation: "SUS is a 0–100 scale, not a percentage of usability." },
        { text: "The score is slightly above the commonly reported average of about 68.", correct: true, explanation: "SUS is interpreted against norms; 70 is near the middle of published distributions." },
        { text: "70% of users completed their tasks.", correct: false, explanation: "SUS measures perception, not task completion." },
        { text: "It is a C grade, so the product is mediocre.", correct: false, explanation: "School grading does not apply. Curved grading schemes place 70 around average." },
      ],
      explanation: "SUS gets its meaning from comparison. About 68 is the average across many published studies.",
    },
    {
      id: "system-usability-scale-q-scoring",
      kind: "formula",
      level: "intermediate",
      prompt: "A respondent answers 4 to every one of the ten SUS items. What is their SUS score?",
      options: [
        { text: "50", correct: true, explanation: "Odd items contribute 4 − 1 = 3 each (15); even items contribute 5 − 4 = 1 each (5); 20 × 2.5 = 50." },
        { text: "75", correct: false, explanation: "This treats all items as positive (3 × 10 × 2.5) and ignores reverse scoring." },
        { text: "100", correct: false, explanation: "Agreeing with negative statements lowers the score." },
        { text: "80", correct: false, explanation: "80 is 4/5 as a percentage; SUS is not computed that way." },
      ],
      explanation: "Agreeing with every statement, including the negative ones, is contradictory, and it lands at the scale midpoint of 50.",
    },
    {
      id: "system-usability-scale-q-diagnose",
      kind: "scenario",
      level: "intermediate",
      prompt: "Your SUS benchmark dropped from 74 to 66 after a release. What should you do first?",
      options: [
        { text: "Look at individual SUS items to pinpoint the broken feature.", correct: false, explanation: "SUS items are not diagnostic of specific features, and subscales are unstable." },
        { text: "Check whether the drop exceeds sampling error, then investigate causes with qualitative research and behavioural data.", correct: true, explanation: "Confirm the change is real (confidence intervals, comparable samples), then use diagnostic methods to find out why." },
        { text: "Roll back the release immediately.", correct: false, explanation: "Acting before checking whether the change is real or explained by sample differences is premature." },
        { text: "Replace SUS with NPS, which is more sensitive.", correct: false, explanation: "NPS measures recommendation intent, not usability, and is not more sensitive for this purpose." },
      ],
      explanation: "SUS signals *whether* something changed; other methods explain *why*.",
    },
    {
      id: "system-usability-scale-q-factors",
      kind: "true-false",
      level: "advanced",
      prompt: "Research consistently supports reporting SUS as two reliable subscales, usability and learnability.",
      options: [
        { text: "True", correct: false, explanation: "Lewis & Sauro (2009) reported two factors, but later analyses did not reproduce the split consistently." },
        { text: "False", correct: true, explanation: "Lewis's 2018 review recommends interpreting SUS primarily as a single overall score." },
      ],
      explanation: "Subscale scores should be used cautiously, if at all.",
    },
  ],

  flashcards: [
    { id: "system-usability-scale-fc-score", front: "SUS scoring rule", back: "Odd items r − 1, even items 5 − r; sum × 2.5 → 0–100." },
    { id: "system-usability-scale-fc-norm", front: "Average SUS score across published studies", back: "About 68 (Lewis, 2018; Sauro & Lewis, 2016). Not a percentage." },
    { id: "system-usability-scale-fc-not", front: "What SUS cannot tell you", back: "Why usability is good or bad: it is a benchmark, not a diagnostic." },
  ],

  references: [
    { source: "brooke-1996", role: "primary", note: "Original instrument and scoring." },
    { source: "brooke-2013", role: "primary", note: "Author's retrospective on use and misuse." },
    { source: "bangor-kortum-miller-2008", role: "primary", note: "Large-sample evaluation of reliability and score distributions." },
    { source: "lewis-sauro-2009", role: "primary", note: "Two-factor structure proposal." },
    { source: "lewis-2018-sus", role: "primary", note: "Review of norms, factor structure and future directions." },
    { source: "sauro-lewis-2011", role: "primary", note: "All-positive versus mixed-tone versions." },
    { source: "sauro-lewis-2016", role: "explanatory", note: "Percentiles, curved grading scale and statistical treatment." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "SUS's reliability and sensitivity are well supported by large peer-reviewed data sets. The evidence supports using it as a comparative measure of *perceived* usability. It does not support interpreting it as a percentage, treating its subscales as stable, or using it to diagnose specific problems.",

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
