import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "nasa-tlx",
  slug: "nasa-tlx",
  title: "NASA Task Load Index (NASA-TLX)",
  alternateNames: ["NASA-TLX", "TLX", "Task Load Index", "Raw TLX (RTLX)"],
  summary:
    "A multidimensional questionnaire for subjective workload. People rate six dimensions (mental, physical and temporal demand, performance, effort and frustration), which can be combined with or without weights.",
  definition:
    "NASA-TLX is a subjective, multidimensional workload assessment instrument developed at NASA Ames Research Center. An operator rates a just-completed task on six subscales from 0 to 100. The overall workload score is either a **weighted average**, with weights derived from 15 pairwise comparisons of the subscales, or an unweighted mean known as **Raw TLX** {{src:hart-staveland-1988}}.",
  primaryType: "research-instrument",
  secondaryTypes: ["metric"],
  domain: "metrics",
  subcategory: "usability-metrics",
  tags: ["workload", "mental workload", "human factors", "questionnaire", "cognitive load", "safety-critical"],
  difficulty: "intermediate",
  disciplines: ["Human factors", "Aviation psychology", "UX research", "Cognitive ergonomics"],
  learningObjectives: [
    "Name the six NASA-TLX subscales and what each captures.",
    "Compute Raw TLX and weighted TLX scores correctly.",
    "Choose when TLX is the right instrument and when a usability or task-ease measure is better.",
    "Interpret TLX scores comparatively, with awareness of its subjective nature.",
  ],
  prerequisites: ["mental-workload"],

  levels: {
    beginner: {
      explanation: [
        "Some tasks feel heavy: you have to think hard, hurry, or you end up frustrated. NASA-TLX is a questionnaire that asks people how demanding a task felt, broken into six parts instead of one vague 'how hard was it?'.",
        "The six parts are **mental demand** (how much thinking), **physical demand** (how much physical activity), **temporal demand** (how much time pressure), **performance** (how successful you felt), **effort** (how hard you had to work) and **frustration** (how irritated or stressed you were). Each is rated on a scale from 0 to 100.",
        "The ratings are then combined into one workload score. Higher means the task felt more demanding. Like most questionnaires, the score is most useful for **comparing**: design A against design B, or a task before and after a change.",
      ],
      analogy:
        "A good fitness tracker reports heart rate, distance, pace and how tired you feel, instead of just 'how hard was your run?'. NASA-TLX splits 'how hard was that task?' into separate readings you can inspect.",
      everydayExamples: [
        "Comparing how demanding two versions of a hospital medication-entry screen feel to nurses.",
        "Checking whether a new air-traffic display increases time pressure.",
        "Measuring whether a simplified checkout reduces frustration, not just completion time.",
      ],
      vocabulary: [
        { term: "Workload", meaning: "How much a task demands of a person, given their abilities and the situation." },
        { term: "Subscale", meaning: "One of the six separate dimensions rated in the questionnaire." },
        { term: "Pairwise comparison", meaning: "Choosing which of two dimensions mattered more for the task; repeated for all 15 pairs." },
        { term: "Raw TLX", meaning: "The simple average of the six ratings, with no weighting step." },
      ],
    },
    intermediate: {
      explanation: [
        "Administer TLX **immediately after** each task or condition, while the experience is fresh. Ratings are traditionally marked on a line divided into 20 intervals, scored 0–100 in steps of five. The **performance** subscale is anchored from 'good' (low) to 'poor' (high), so on every subscale a higher number means more workload.",
        "In the **weighted** procedure, participants also make 15 pairwise choices between the six dimensions ('which contributed more to the workload of this task?'). Each dimension's weight is the number of times it was chosen (0–5); the weights sum to 15. Overall workload = Σ(weight × rating) / 15.",
        "**Raw TLX** skips the comparisons and averages the six ratings. Hart's 20-year review notes that Raw TLX has become widespread and that comparisons with the weighted version have produced mixed results {{src:hart-2006}}. Raw TLX is quicker and is a defensible default, especially when the same tasks are compared across designs.",
      ],
      howItWorks: [
        "Workload is treated as an emergent experience shaped by task demands, the person's skill and strategy, and the circumstances. That is why TLX asks the person rather than measuring the task.",
        "The weighting step aims to capture *which sources* of load dominate a particular task, so that a physically demanding task and a mentally demanding task can both score as high-workload in their own way.",
        "Subscale profiles are often more informative than the overall score. A redesign can lower frustration while raising mental demand.",
      ],
      implementation: [
        "Decide in advance: Raw or weighted TLX, and whether weights are collected per task or once per participant.",
        "Explain each subscale's definition to participants before the first rating; the official materials include definitions {{src:nasa-tlx-site}}.",
        "Collect ratings right after each condition; counterbalance condition order to control learning and fatigue.",
        "Report subscale means as well as the overall score, with confidence intervals.",
        "Triangulate with performance (errors, time) and, where appropriate, physiological or secondary-task measures.",
      ],
      scenarios: [
        "Two dashboard layouts for incident responders: overall TLX is similar, but temporal demand is much higher for one. That points to information that is slow to locate under time pressure.",
        "A form simplification drops frustration from 60 to 35 while mental demand is unchanged. This suggests the gain came from fewer error recoveries, not less thinking.",
      ],
    },
    advanced: {
      explanation: [
        "Hart & Staveland (1988) developed TLX through a multi-year research programme on many laboratory and simulated flight tasks, seeking dimensions that were relevant to workload across task types and that reduced variability between raters {{src:hart-staveland-1988}}.",
        "TLX measures **subjective** workload. Subjective workload can dissociate from performance, because people may maintain performance by investing more effort, at the cost of fatigue or reduced spare capacity. That dissociation is a reason to measure workload separately from success.",
        "Psychometric debates concern the weighting procedure (does it add validity or only time?), whether the six subscales form a single construct, and whether scores are comparable across very different tasks. As with all rating scales, comparisons **within** a study and participant group are far more defensible than comparisons with numbers from other studies.",
      ],
      evidence: [
        "The original development work established the six dimensions and the weighting procedure across a wide range of experimental tasks {{src:hart-staveland-1988}}.",
        "Hart's 2006 review documents adoption well beyond aviation (medicine, automotive, HCI and more), common modifications, and the widespread use of Raw TLX {{src:hart-2006}}.",
      ],
      debates: [
        "**Weighted vs. Raw TLX.** Weighting is theoretically motivated but costs time; empirical comparisons are mixed. Many researchers now default to Raw TLX unless dimension weighting is itself of interest.",
        "**Modified subscales.** Teams sometimes drop or rename subscales (for example, physical demand for screen-based work). This harms comparability with other studies; document any change.",
        "**Workload vs. cognitive load.** TLX is often used as a proxy for [[cognitive-load-theory|cognitive load]], but cognitive load theory distinguishes intrinsic and extraneous load, a distinction TLX does not make.",
      ],
      alternativeModels: [
        "**Single-item measures** (for example, the Subjective Mental Effort Question) are faster but one-dimensional.",
        "**SWAT** (Subjective Workload Assessment Technique) uses three dimensions with conjoint scaling.",
        "**Objective measures**: secondary-task performance, pupillometry or heart-rate variability, which avoid self-report but bring their own validity questions.",
      ],
    },
  },

  origin: {
    contributors: ["Sandra G. Hart", "Lowell E. Staveland", "NASA Ames Research Center Human Performance Group"],
    period: "1980s; published 1988",
    problem:
      "Aviation and space operations needed a practical way to measure how demanding tasks were for operators, in a form that worked across very different tasks and reduced disagreement between raters.",
    narrative: [
      "The TLX emerged from NASA Ames research on workload in flight and laboratory tasks and was published as a chapter in *Human Mental Workload* (1988) {{src:hart-staveland-1988}}.",
      "NASA has distributed paper and later computer and app versions of the instrument with its instructions {{src:nasa-tlx-site}}.",
      "Two decades later, Hart reviewed hundreds of studies using TLX across domains, including the adoption of the Raw TLX shortcut {{src:hart-2006}}.",
    ],
  },

  application: {
    summary: [
      "In UX, TLX is most valuable for **demanding, high-stakes or time-pressured work**: clinical systems, control rooms, automotive interfaces, developer tools, and complex enterprise workflows, where 'usable' is not enough and the cost of mental strain matters.",
    ],
    web: [
      "Compare the workload of complex multi-step tasks such as configuring a cloud service or completing a tax return, across alternative designs.",
    ],
    mobile: [
      "Evaluate in-motion or interrupted use (navigation, field-work apps), where temporal demand and frustration are critical.",
    ],
    enterprise: [
      "Profile workload for operator roles (support agents, analysts) to locate the dominant source of strain before redesigning.",
    ],
    services: [
      "Assess staff-facing back-stage tools in service blueprints, where workload directly affects service quality.",
    ],
    steps: [
      "Define tasks and conditions to compare; choose Raw or weighted TLX.",
      "Brief participants on subscale definitions.",
      "After each condition, collect the six ratings (and pairwise comparisons, if weighted).",
      "Compute overall and subscale scores per participant and condition.",
      "Compare conditions with appropriate statistics and confidence intervals; interpret subscale profiles.",
    ],
  },

  whenToUse: [
    "Comparing designs for tasks where mental strain, time pressure or frustration have safety, error or wellbeing consequences.",
    "Understanding *which* source of demand dominates a task.",
    "Complementing performance measures where users may compensate for poor design with extra effort.",
  ],
  whenNotToUse: [
    "Measuring general perceived usability or satisfaction; use [[system-usability-scale|SUS]] or similar.",
    "Very short, trivial tasks where six ratings are disproportionate; a single ease question suffices.",
    "Comparing absolute scores with numbers from unrelated studies or populations.",
  ],
  advantages: [
    "Multidimensional profile instead of a single opinion.",
    "Long history across domains; free public materials from NASA.",
    "Raw TLX is quick to administer.",
  ],
  limitations: [
    "Subjective: affected by memory, expectations and self-presentation.",
    "The weighting procedure is time-consuming, with debated benefit.",
    "Scores are context-relative; there are no universal norms comparable to SUS.",
    "Modified versions reduce comparability.",
  ],
  misconceptions: [
    {
      myth: "A low performance rating means the person performed well, so it reduces workload.",
      reality: "On the TLX performance scale, low numbers mean the person felt they performed *well*. All six subscales are oriented so that higher means more workload; confusion here produces reversed results.",
    },
    {
      myth: "NASA-TLX measures cognitive load in the sense of cognitive load theory.",
      reality: "TLX measures perceived workload across six dimensions. It does not separate intrinsic from extraneous load, as [[cognitive-load-theory|cognitive load theory]] does.",
    },
    {
      myth: "You must always use the weighted procedure for valid results.",
      reality: "Raw TLX is widely used and comparisons with weighted scores are mixed. Choose deliberately and report which you used.",
    },
  ],

  relations: [
    { target: "mental-workload", type: "measured-by", note: "NASA-TLX is the most widely used subjective instrument for measuring mental workload." },
    { target: "cognitive-load-theory", type: "related-to", note: "TLX is often used as a proxy for cognitive load, but measures a broader, undifferentiated construct." },
    { target: "system-usability-scale", type: "contrasts-with", note: "SUS measures perceived usability of a system; TLX measures perceived demand of a task." },
    { target: "human-factors-engineering", type: "developed-from", note: "TLX originated in aviation human-factors research at NASA Ames." },
    { target: "usability-testing", type: "applied-in", note: "TLX can be administered after each task condition in a usability or comparative test." },
  ],

  formulas: [
    {
      id: "nasa-tlx-score",
      name: "NASA-TLX workload score (Raw and weighted)",
      expression: "Raw TLX = (Σ rᵢ) / 6      Weighted TLX = (Σ wᵢ · rᵢ) / 15",
      contributor: "Hart & Staveland (1988); Raw TLX discussed in Hart (2006)",
      source: "hart-staveland-1988",
      variables: [
        { symbol: "rᵢ", name: "Subscale rating", unit: "0–100", description: "Rating for one of six subscales: mental, physical, temporal demand, performance, effort, frustration. Higher = more workload." },
        { symbol: "wᵢ", name: "Subscale weight", unit: "0–5 (count)", description: "Times the subscale was chosen across the 15 pairwise comparisons. Σwᵢ = 15." },
        { symbol: "15", name: "Number of pairwise comparisons", unit: "—", description: "C(6,2) = 15 pairs of subscales." },
      ],
      resultUnit: "workload points on a 0–100 scale",
      assumptions: [
        "Ratings were collected immediately after the task, using standard subscale definitions.",
        "The performance subscale is oriented good (0) → poor (100).",
        "For weighted TLX, all 15 pairwise comparisons were completed, so weights sum to 15.",
      ],
      conditions: [
        "Compare scores within a study, across conditions with the same participants or comparable groups.",
        "State whether Raw or weighted TLX was used.",
      ],
      steps: [
        "Collect six ratings (0–100).",
        "Raw TLX: sum the six ratings and divide by 6.",
        "Weighted TLX: count each subscale's wins in the 15 pairwise comparisons (weights 0–5).",
        "Multiply each rating by its weight, sum the products, and divide by 15.",
        "Report subscale ratings alongside the overall score.",
      ],
      workedExample: {
        given: [
          "Ratings: mental 70, physical 10, temporal 55, performance 30, effort 60, frustration 45.",
          "Weights from pairwise comparisons: mental 5, physical 0, temporal 3, performance 2, effort 4, frustration 1 (sum 15).",
        ],
        steps: [
          "Raw TLX = (70 + 10 + 55 + 30 + 60 + 45) / 6 = 270 / 6 = 45.0",
          "Weighted products: 70×5 = 350, 10×0 = 0, 55×3 = 165, 30×2 = 60, 60×4 = 240, 45×1 = 45",
          "Sum of products = 860",
          "Weighted TLX = 860 / 15 ≈ 57.3",
        ],
        result: "Raw TLX = 45.0; weighted TLX ≈ 57.3. Weighting raises the score because the highest-rated dimensions (mental demand, effort) were also judged the most important.",
      },
      interpretation: [
        "Compare conditions: a lower score means the task felt less demanding. Examine subscales to locate the source of demand.",
        "There is no universal 'acceptable' threshold; interpret relative to alternatives and task criticality.",
      ],
      commonErrors: [
        "Reversing the performance scale (treating high as good).",
        "Dividing the weighted sum by 6 instead of 15.",
        "Weights that do not sum to 15 because of missing comparisons.",
        "Comparing scores across studies with different tasks or modified subscales.",
      ],
      limitations: [
        "Subjective and retrospective.",
        "Not diagnostic of interface causes on its own.",
        "Weighting adds administration time with debated benefit.",
      ],
      alternatives: [
        { name: "Raw TLX (RTLX)", expression: "(Σ rᵢ) / 6", note: "Unweighted; widely used and quicker." },
        { name: "Subscale profile", expression: "rᵢ reported per subscale", note: "Often more actionable than the overall score." },
      ],
      calculator: "nasa-tlx",
    },
  ],

  exercises: [
    {
      id: "nasa-tlx-ex-compute",
      kind: "calculation",
      level: "intermediate",
      title: "Raw versus weighted",
      prompt: [
        "Ratings: mental 40, physical 80, temporal 30, performance 20, effort 70, frustration 25. Weights: mental 1, physical 5, temporal 0, performance 2, effort 4, frustration 3.",
        "Compute Raw and weighted TLX, and explain the difference.",
      ],
      deliverable: "Two scores and a one-sentence explanation.",
      criteria: ["Raw = mean of six", "Weighted = Σwr / 15", "Explains the effect of weights"],
      exampleSolution: [
        "Raw = (40 + 80 + 30 + 20 + 70 + 25) / 6 = 265 / 6 ≈ 44.2.",
        "Weighted = (40 + 400 + 0 + 40 + 280 + 75) / 15 = 835 / 15 ≈ 55.7. Weighted is higher because physical demand, the highest rating, was also judged the most important source of load.",
      ],
    },
    {
      id: "nasa-tlx-ex-design",
      kind: "assignment",
      level: "advanced",
      title: "Plan a workload comparison",
      prompt: [
        "You are comparing two designs of a clinical order-entry screen with 12 nurses. Write a study plan covering: within- or between-subjects design, counterbalancing, Raw or weighted TLX (with justification), the performance measures you will triangulate with, and how you will report results.",
      ],
      criteria: ["Justifies design choice", "Controls order effects", "Triangulates with errors/time", "Reports subscales and CIs"],
    },
    {
      id: "nasa-tlx-ex-reflect",
      kind: "reflection",
      level: "beginner",
      title: "Your own workload",
      prompt: [
        "Think of the last time you filled in a long online form. Rate it on the six subscales from 0 to 100. Which dimension dominated, and what design change would reduce it?",
      ],
      criteria: ["Rates all six subscales", "Links the dominant dimension to a specific design cause"],
    },
  ],

  quiz: [
    {
      id: "nasa-tlx-q-subscales",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which of these is NOT one of the six NASA-TLX subscales?",
      options: [
        { text: "Temporal demand", correct: false, explanation: "Temporal demand (time pressure) is a TLX subscale." },
        { text: "Frustration", correct: false, explanation: "Frustration is a TLX subscale." },
        { text: "Learnability", correct: true, explanation: "Learnability is a usability attribute, not a TLX workload dimension." },
        { text: "Effort", correct: false, explanation: "Effort is a TLX subscale." },
      ],
      explanation: "The six subscales are mental, physical and temporal demand, performance, effort and frustration.",
    },
    {
      id: "nasa-tlx-q-weighted",
      kind: "formula",
      level: "intermediate",
      prompt: "All six subscales are rated 50 and the weights are 5, 4, 3, 2, 1, 0. What is the weighted TLX score?",
      options: [
        { text: "50", correct: true, explanation: "Σwr = 50 × 15 = 750; 750 / 15 = 50. Equal ratings give the same score whatever the weights." },
        { text: "125", correct: false, explanation: "This divides by 6 instead of 15." },
        { text: "25", correct: false, explanation: "There is no halving step in the formula." },
        { text: "It cannot be computed without the raw score.", correct: false, explanation: "The weighted score needs only ratings and weights." },
      ],
      explanation: "Weighted TLX = Σ(wᵢ rᵢ)/15; when every rating is equal, weighting has no effect.",
    },
    {
      id: "nasa-tlx-q-performance",
      kind: "true-false",
      level: "intermediate",
      prompt: "On the NASA-TLX performance subscale, a rating of 90 indicates the participant felt they performed very well.",
      options: [
        { text: "True", correct: false, explanation: "The performance scale runs from good (low) to poor (high), so 90 means they felt they performed poorly." },
        { text: "False", correct: true, explanation: "High performance ratings indicate *perceived failure*, consistent with higher workload." },
      ],
      explanation: "Every TLX subscale is oriented so that higher means more workload.",
    },
    {
      id: "nasa-tlx-q-choose",
      kind: "scenario",
      level: "advanced",
      prompt: "A team wants to know whether a redesigned air-ambulance dispatch screen makes the job feel less pressured, even if dispatch times stay the same. Which approach fits best?",
      options: [
        { text: "SUS after the session", correct: false, explanation: "SUS measures perceived usability, not task demand or time pressure." },
        { text: "NASA-TLX after each dispatch scenario, reporting temporal demand and overall workload", correct: true, explanation: "TLX targets perceived demand, with a specific time-pressure subscale." },
        { text: "NPS from dispatchers", correct: false, explanation: "Likelihood to recommend says nothing about task workload." },
        { text: "A/B test on dispatch time only", correct: false, explanation: "The question is about felt pressure when times may not change, which needs a workload measure." },
      ],
      explanation: "When the question is about how demanding a task feels, use a workload instrument and examine the relevant subscale.",
    },
  ],

  flashcards: [
    { id: "nasa-tlx-fc-six", front: "Six NASA-TLX subscales", back: "Mental, physical, temporal demand; performance; effort; frustration." },
    { id: "nasa-tlx-fc-weighted", front: "Weighted TLX formula", back: "Σ(wᵢ × rᵢ) / 15, weights from 15 pairwise comparisons (each 0–5)." },
    { id: "nasa-tlx-fc-raw", front: "Raw TLX", back: "Unweighted mean of the six ratings, widely used as a quicker alternative." },
  ],

  references: [
    { source: "hart-staveland-1988", role: "primary", note: "Development of the instrument, subscales and weighting." },
    { source: "hart-2006", role: "primary", note: "Twenty-year review; Raw TLX and modifications." },
    { source: "nasa-tlx-site", role: "explanatory", note: "Official materials and instructions." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "TLX is a well-established, extensively used instrument with a peer-reviewed development history. The evidence supports comparing subjective workload between conditions within a study. Whether weighting adds validity is unresolved, and the scores do not support universal thresholds or cross-study comparisons.",

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
