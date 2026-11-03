import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "usability-testing",
  slug: "usability-testing",
  title: "Usability Testing",
  alternateNames: ["User testing", "Usability study", "Usability evaluation with users", "Task-based testing"],
  summary:
    "Observing representative users as they attempt realistic tasks with a product, in order to find where and why they struggle (formative) or to measure how well it performs (summative).",
  definition:
    "Usability testing is an **evaluative research method** in which representative participants attempt realistic tasks with a product or prototype while a researcher observes their behaviour — often with participants thinking aloud — and records problems, successes, times and comments. **Formative** testing aims to discover and explain problems in order to improve a design; **summative** testing measures performance (effectiveness, efficiency, satisfaction) against a benchmark, competitor or target.",
  primaryType: "method",
  secondaryTypes: ["methodology"],
  domain: "research",
  subcategory: "evaluation",
  tags: ["user research", "evaluation", "think-aloud", "sample size", "moderated", "unmoderated", "formative", "summative"],
  difficulty: "beginner",
  disciplines: ["UX research", "Usability engineering", "Human factors"],
  learningObjectives: [
    "Plan a usability test: goals, participants, tasks, protocol and measures.",
    "Moderate a think-aloud session without leading the participant.",
    "Explain the problem-discovery model, calculate expected discovery for a given sample, and critique the 'five users' rule.",
    "Choose between formative and summative designs, and between moderated and unmoderated formats.",
  ],
  prerequisites: ["usability"],

  levels: {
    beginner: {
      explanation: [
        "Usability testing means watching real people try to use something. You give someone a realistic task — 'find a train to Leeds that arrives before 10 am' — and watch what they do, without helping. Where they hesitate, get lost or give up, the design has a problem.",
        "Usually you ask people to **think aloud**: to say what they are looking at, trying and expecting as they go. This lets you hear *why* they struggle, not just see that they do.",
        "It is the most direct evidence you can get about usability. Experts can guess where problems are, but watching even a handful of people often reveals problems nobody on the team expected.",
      ],
      analogy:
        "It is like a dress rehearsal for a play. The script may look perfect on paper, but only when actors perform it in front of an audience do you see which jokes fall flat and which scenes confuse people.",
      everydayExamples: [
        "Watching five customers try to change their delivery address on a shopping site.",
        "Asking colleagues from another department to try a new expense form on a paper prototype.",
        "Running an unmoderated remote test where participants record their screens while completing tasks.",
      ],
      vocabulary: [
        { term: "Participant", meaning: "A person taking part in the test, chosen to represent the real users." },
        { term: "Task", meaning: "A realistic goal you ask the participant to achieve, written without giving away the answer." },
        { term: "Moderator", meaning: "The researcher who runs the session, gives tasks and asks neutral questions." },
        { term: "Think-aloud", meaning: "Asking participants to say their thoughts out loud as they work." },
        { term: "Formative / summative", meaning: "Formative testing finds problems to fix; summative testing measures how well a design performs." },
      ],
    },
    intermediate: {
      explanation: [
        "A test plan defines the **research questions**, the **participant profile** and recruitment criteria, **tasks and scenarios**, the **protocol** (introduction, consent, tasks, follow-up questions, debrief), and the **measures** — observed problems for formative tests; task success, time on task, errors and questionnaires such as the [[system-usability-scale|SUS]] for summative ones {{src:sauro-lewis-2016}}.",
        "Task wording matters. Good tasks state a goal and context in the user's language and avoid the interface's labels ('You want to stop receiving marketing emails' rather than 'Go to Notification Preferences'). Each task should have a defined success criterion so results can be judged consistently.",
        "**Moderated** sessions (in person or remote) allow probing and adapting; **unmoderated** sessions scale to more participants quickly but lose the ability to ask why and are more vulnerable to low-quality participation. Think-aloud is standard in formative testing; in summative testing it can change task times, so measurements are often taken without it.",
      ],
      howItWorks: [
        "**Classic think-aloud** following Ericsson and Simon asks participants to verbalise what they are attending to, with minimal prompts ('keep talking'); reports of current thought are thought not to change cognition much, while requests for explanations can {{src:ericsson-simon-1993}}.",
        "Practitioners routinely intervene more than the classic protocol allows. Boren and Ramey proposed treating the session as communication, using neutral acknowledgement tokens such as 'mm-hm' to keep participants talking without steering them {{src:boren-ramey-2000}}.",
        "**Problem discovery** follows diminishing returns: each extra participant tends to reveal fewer new problems, because common problems are seen early. The model below quantifies this for a given problem frequency {{src:nielsen-landauer-1993}}.",
      ],
      implementation: [
        "Write 3–5 research questions and derive tasks from them.",
        "Recruit participants who match the target users on the characteristics that affect the tasks (domain knowledge, experience, accessibility needs).",
        "Pilot the protocol with one person; fix confusing tasks before the real sessions.",
        "During sessions, stay neutral: do not explain the interface, praise or correct; answer questions with questions.",
        "Note each problem with participant, task, observed behaviour and quote; rate severity after all sessions.",
        "Synthesise across participants, report the problems by severity and frequency, and agree fixes.",
        "Iterate: test again after changes, ideally with new participants.",
      ],
      scenarios: [
        "Formative: three rounds of five participants on successive prototypes of a mobile onboarding flow.",
        "Summative: 40 participants complete five benchmark tasks on the current and redesigned versions to compare success rates and SUS scores.",
        "Accessibility-inclusive: sessions with screen-reader and switch users to find barriers automated checkers miss.",
      ],
    },
    advanced: {
      explanation: [
        "The best-known quantitative idea in usability testing is the **problem-discovery model**. Nielsen and Landauer modelled the number of problems found after *n* participants as `N(1 − (1 − λ)ⁿ)`, where λ is the probability that a single participant reveals a given problem; across the projects they analysed, λ averaged about 0.31 {{src:nielsen-landauer-1993}}. With λ = 0.31, five participants are expected to reveal about 85% of problems of that frequency — the origin of the 'five users' rule {{src:nielsen-2000-five-users}}.",
        "Virzi reported that 80% of problems were detected with four or five participants, that additional participants revealed less and less new information, and that the most severe problems were likely to be found in the first few sessions {{src:virzi-1992}}. Lewis showed that the severity claim did not hold generally and that required sample sizes depend strongly on the actual discovery rate {{src:lewis-1994}}.",
        "The model's assumptions are the crux of the debate. Problems differ greatly in how often they occur, so a single λ hides a long tail of rarely encountered problems; λ estimated from a small sample is biased upwards, which overstates how complete a small study is {{src:lewis-2001}}; and results depend on tasks, participants and the product's complexity. Faulkner's resampling showed large variability between random groups of five {{src:faulkner-2003}}, and Spool and Schroeder found that on large e-commerce sites five users revealed only a minority of the problems eventually found {{src:spool-schroeder-2001}}.",
      ],
      evidence: [
        "Comparative studies in which several professional teams test the same product (CUE studies) found that teams report very different problem sets, with most problems reported by only one team {{src:molich-et-al-2004}} — evidence of an evaluator effect in testing as well as inspection {{src:hertzum-jacobsen-2001}}.",
        "Small iterative tests are well supported as a *formative* practice: diminishing returns within a round and the chance to retest after changes favour several rounds of a few participants over one large round {{src:nielsen-2000-five-users}}.",
        "Summative claims (for example, 'task success improved from 70% to 85%') need sample sizes and confidence intervals appropriate to the measure — see [[confidence-intervals|confidence intervals]] and [[sample-size-estimation|sample size estimation]] {{src:sauro-lewis-2016}}.",
      ],
      debates: [
        "**'Five users is enough.'** Accurate only for formative testing, for problems that affect a large share of users, with a homogeneous user group and limited tasks, and as part of iterative rounds. Misapplied to summative measurement, diverse audiences or rare-but-critical problems, it is badly wrong.",
        "**Think-aloud reactivity.** Thinking aloud can slow participants and change strategies, especially when moderators ask for explanations. It is valuable for understanding, but distorts time measurements.",
        "**Lab versus remote versus unmoderated.** Remote and unmoderated tests trade control and depth for reach, realism of the participant's own environment and speed.",
      ],
      alternativeModels: [
        "[[heuristic-evaluation|Heuristic evaluation]] and [[cognitive-walkthrough|cognitive walkthrough]] — expert predictions without users; cheaper, less direct.",
        "[[ab-testing|A/B testing]] — measures behaviour at scale in production, showing *what* changed, rarely *why*.",
        "[[tree-testing|Tree testing]] and [[first-click-testing|first-click testing]] — narrow, scalable tests of navigation structure and initial choices.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Thomas Landauer", "Robert Virzi", "K. Anders Ericsson", "Herbert Simon", "James R. Lewis"],
    period: "Roots in 1970s–80s human-factors laboratory evaluation; discount methods and sample-size models in the early 1990s",
    problem:
      "Teams needed direct evidence of how real users experience a system, at a cost and speed compatible with product development.",
    narrative: [
      "Laboratory usability evaluation grew out of human-factors engineering. Ericsson and Simon's analysis of verbal reports gave think-aloud a methodological basis in cognitive psychology {{src:ericsson-simon-1993}}.",
      "In the early 1990s, Nielsen's discount usability engineering argued for small, frequent tests {{src:nielsen-1993}}, supported by problem-discovery models from Virzi and from Nielsen and Landauer {{src:virzi-1992}} {{src:nielsen-landauer-1993}}.",
      "From the mid-1990s onward, researchers including Lewis, Faulkner and Spool and Schroeder challenged the generality of small-sample rules, while CUE studies exposed the variability of professional testing {{src:lewis-1994}} {{src:faulkner-2003}} {{src:molich-et-al-2004}}.",
    ],
  },

  application: {
    summary: [
      "Usability testing is the backbone of evaluative UX research. Use it throughout design — on paper prototypes, interactive prototypes and live products — and as a benchmark before and after major changes.",
    ],
    web: [
      "Test key journeys (search, sign-up, checkout, account management) with tasks drawn from analytics and support tickets.",
      "Include participants on their own devices and browsers in remote sessions.",
    ],
    mobile: [
      "Test on real devices in realistic postures (one-handed, on the move) when context matters.",
      "Record both screen and hands where gestures are involved.",
    ],
    enterprise: [
      "Recruit actual role-holders; domain knowledge changes what counts as a problem.",
      "Use realistic data volumes — empty demo accounts hide real problems.",
    ],
    services: [
      "Test end-to-end journeys that span channels, such as an online application followed by a letter and a phone call.",
    ],
    steps: [
      "Define research questions and whether the study is formative or summative.",
      "Define the participant profile and recruit (include people with disabilities).",
      "Write realistic tasks with success criteria; pilot them.",
      "Run sessions with a neutral protocol (consent, warm-up, tasks, follow-up, debrief).",
      "Record observations, quotes and measures.",
      "Synthesise problems, rate severity, and report with evidence.",
      "Iterate the design and test again.",
    ],
  },

  method: {
    procedure: [
      "Define research questions, study type (formative or summative) and measures.",
      "Recruit representative participants against a screener.",
      "Prepare tasks, success criteria, protocol and consent materials; pilot.",
      "Conduct sessions: introduction and consent, warm-up, tasks (often with think-aloud), post-task and post-test questions, debrief.",
      "Analyse: list problems per participant and task, merge, rate severity; compute metrics for summative studies.",
      "Report findings and recommendations; plan the next iteration.",
    ],
    participants: "Formative: commonly 5–8 per distinct user group per round, repeated iteratively. Summative: typically 20 or more per group, set by the precision needed.",
    duration: "Sessions of 30–90 minutes; one to three weeks end to end including recruitment and analysis.",
    inputs: ["Prototype or product", "Research questions", "Participant screener", "Tasks with success criteria", "Protocol and consent form"],
    outputs: ["Prioritised usability problems with evidence", "Task success, time and error metrics", "Questionnaire scores (e.g. SUS)", "Recordings and highlight clips"],
    purpose: "evaluative",
    data: "mixed",
  },

  formulas: [
    {
      id: "problem-discovery-model",
      name: "Problem discovery model (cumulative binomial)",
      expression: "P(found) = 1 − (1 − p)ⁿ    ⇔    n = ln(1 − P) / ln(1 − p)",
      contributor: "Nielsen & Landauer (1993); Virzi (1992); see Lewis (1994, 2001) for refinements",
      source: "nielsen-landauer-1993",
      variables: [
        { symbol: "p", name: "Problem occurrence probability", unit: "proportion (0–1)", description: "Probability that a single participant encounters a given problem. Nielsen & Landauer's average across projects was ≈ 0.31." },
        { symbol: "n", name: "Number of participants", unit: "people", description: "Participants in a round of testing." },
        { symbol: "P", name: "Probability of discovery", unit: "proportion (0–1)", description: "Probability the problem is observed at least once — equivalently, the expected share of problems with this p that the study reveals." },
      ],
      resultUnit: "proportion (P) or participants (n, rounded up)",
      assumptions: [
        "Each participant independently has the same probability p of encountering the problem.",
        "Participants are drawn from a single, homogeneous user group and attempt the same tasks.",
        "A problem that occurs is always noticed and recorded by the researcher.",
      ],
      conditions: [
        "Use for planning formative studies and explaining diminishing returns.",
        "Apply per distinct user group; heterogeneous audiences need separate samples.",
        "Do not use to size summative studies that estimate success rates or compare designs — use confidence intervals and power analysis instead.",
      ],
      steps: [
        "Choose or estimate p for the problems you care about (for example, problems affecting at least 10% of users → p = 0.10).",
        "To find coverage for a planned n: compute (1 − p)ⁿ and subtract from 1.",
        "To find n for a target coverage P: compute ln(1 − P) / ln(1 − p) and round up.",
        "Repeat for different p values to see how rare problems change the answer.",
      ],
      workedExample: {
        given: ["p = 0.31 (Nielsen & Landauer's average)", "n = 5 participants", "Alternative: p = 0.10, target P = 0.90"],
        steps: [
          "(1 − 0.31)⁵ = 0.69⁵ ≈ 0.156",
          "P = 1 − 0.156 ≈ 0.84 — about 84% of problems with p = 0.31 are expected to be seen",
          "For p = 0.10 and n = 5: P = 1 − 0.9⁵ ≈ 0.41",
          "For p = 0.10 and P = 0.90: n = ln(0.10) / ln(0.90) ≈ 21.9 → 22 participants",
        ],
        result: "Five participants reveal ≈84% of problems affecting 31% of users, but only ≈41% of problems affecting 10% of users; 90% coverage of the latter needs ≈22.",
      },
      interpretation: [
        "The model says how likely you are to see a problem **of a given frequency** — not what share of all problems a study finds. Because real problems vary widely in frequency, a study can find most common problems and few rare ones.",
        "Choose p by asking 'what is the least common problem I need to be confident of seeing?' rather than relying on a published average.",
      ],
      commonErrors: [
        "Reading 'five users find 85% of problems' as a universal fact rather than a consequence of assuming p ≈ 0.31.",
        "Estimating p from the same small study and treating it as accurate — small-sample estimates of p are inflated.",
        "Pooling different user groups into one sample.",
        "Using the model to size summative studies.",
      ],
      limitations: [
        "Assumes homogeneous p across participants and independence between sessions.",
        "Does not account for problem severity, which is not reliably related to discovery order.",
        "Does not cover task, product and evaluator variability, which strongly affect which problems are seen.",
      ],
      alternatives: [
        { name: "Nielsen & Landauer (count form)", expression: "Found(n) = N · (1 − (1 − λ)ⁿ)", note: "Expected number of problems found out of N total, with λ the average discovery rate." },
        { name: "Adjusted p estimates", expression: "Combine deflation and Good–Turing adjustments of p̂ (Lewis, 2001)", note: "Corrects the upward bias of p estimated from small samples before projecting discovery." },
      ],
      calculator: "problem-discovery",
    },
  ],

  whenToUse: [
    "To find and understand usability problems in a design (formative).",
    "To measure and compare usability against a benchmark, previous version or competitor (summative).",
    "Before launch or major changes, when the cost of hidden problems is high.",
    "To build team empathy and evidence for prioritisation.",
  ],
  whenNotToUse: [
    "To answer 'would people want this?' — task-based testing evaluates use, not demand; use generative research or experiments.",
    "To estimate population-level metrics from a handful of participants.",
    "When participants cannot be recruited from the real user population and proxies would mislead (for example, clinicians or specialist operators).",
  ],
  advantages: [
    "Direct evidence of real behaviour and its causes.",
    "Works at any fidelity, from paper to production.",
    "Persuasive: observing users changes stakeholders' minds.",
    "Combines qualitative insight with optional quantitative measures.",
  ],
  limitations: [
    "Artificial tasks and settings can differ from real use.",
    "Think-aloud and observation can change behaviour.",
    "Small formative samples cannot support statistical claims.",
    "Results depend on task selection, participants and the researchers' skill (evaluator effect).",
    "Recruitment can be slow and expensive for specialist users.",
  ],
  misconceptions: [
    {
      myth: "You only ever need to test with five users.",
      reality:
        "Five participants per round is a reasonable heuristic for iterative formative testing of a homogeneous group when common problems matter. It is not a rule for summative measurement, diverse audiences or rare problems — the required number depends on p.",
    },
    {
      myth: "Usability testing tells you whether people like the product.",
      reality:
        "It shows whether people can use it to achieve tasks. Preference and desirability need other methods, and stated opinions in a test session are weak evidence.",
    },
    {
      myth: "If participants succeed, the design is fine.",
      reality:
        "Success with hesitation, workarounds or errors still signals problems; observing the path matters as much as the outcome.",
    },
  ],

  relations: [
    { target: "think-aloud-protocol", type: "applied-in", note: "Think-aloud is the standard technique for eliciting participants' reasoning in formative usability tests." },
    { target: "heuristic-evaluation", type: "complementary-to", note: "Inspection finds predicted problems cheaply; testing confirms them and reveals problems experts miss." },
    { target: "task-success-rate", type: "measured-by", note: "Task success is the primary effectiveness measure in summative usability tests." },
    { target: "system-usability-scale", type: "measured-by", note: "SUS is the most widely used post-test questionnaire for perceived usability." },
    { target: "sample-size-estimation", type: "related-to", note: "Summative tests need sample sizes derived from the desired precision, not the problem-discovery model." },
    { target: "usability", type: "measured-by", note: "Usability testing is the primary way to establish usability for specified users, goals and contexts." },
    { target: "formative-evaluation", type: "related-to", note: "Formative usability testing is the canonical example of formative evaluation." },
    { target: "unmoderated-testing", type: "related-to", note: "Unmoderated testing is a format of usability testing trading depth for scale." },
  ],

  exercises: [
    {
      id: "usability-testing-ex-tasks",
      kind: "assignment",
      level: "beginner",
      title: "Write unbiased tasks",
      prompt: [
        "Rewrite these leading tasks so they state a realistic goal without naming interface elements: (a) 'Click Account Settings and change your password.' (b) 'Use the filter panel to show only red shoes under £50.' (c) 'Go to the Help Centre and find the returns policy.'",
      ],
      deliverable: "Three rewritten tasks, each with a success criterion.",
      criteria: ["No interface labels or navigation hints", "Realistic motivation", "Clear, observable success criterion"],
      exampleSolution: [
        "(a) 'You think someone may know your password. Make sure they can no longer sign in.' Success: password changed.",
        "(b) 'You need red shoes for a wedding and can spend up to £50. Find a pair you would consider.' Success: a product page meeting both constraints.",
        "(c) 'You bought a jacket that doesn't fit. Find out whether you can send it back and how long you have.' Success: states the return window.",
      ],
    },
    {
      id: "usability-testing-ex-discovery",
      kind: "calculation",
      level: "intermediate",
      title: "How many participants?",
      prompt: [
        "Your team wants to be 85% confident of seeing any problem that affects at least 15% of users. Using the problem-discovery model, how many participants do you need? How does the answer change if you care about problems affecting 5% of users?",
        "Explain why the team should also consider testing in several rounds.",
      ],
      deliverable: "Two calculations and a short recommendation.",
      criteria: ["Uses n = ln(1 − P)/ln(1 − p) and rounds up", "Explains the effect of rare problems", "Connects to iterative testing"],
      exampleSolution: [
        "p = 0.15, P = 0.85: n = ln(0.15)/ln(0.85) ≈ 1.897/0.1625 ≈ 11.7 → 12 participants. p = 0.05: n = ln(0.15)/ln(0.95) ≈ 1.897/0.0513 ≈ 37 participants.",
        "Several rounds of 5–6 participants with fixes in between catch common problems early and let later rounds probe deeper issues, while the cumulative sample still grows.",
      ],
    },
    {
      id: "usability-testing-ex-moderate",
      kind: "critique",
      level: "advanced",
      title: "Critique a moderation transcript",
      prompt: [
        "Read this excerpt: Participant: 'I'm not sure where to go…' Moderator: 'Try the menu at the top — that's where Settings is.' Participant: 'Oh, OK.' Moderator: 'Great, did you find that easy?'",
        "Identify every moderation error, explain how each biases the data, and rewrite the exchange.",
      ],
      deliverable: "An annotated critique and a rewritten exchange.",
      criteria: ["Identifies leading help, a leading question and lost observation", "Rewrite uses neutral prompts", "Explains effects on task success and self-report validity"],
    },
  ],

  quiz: [
    {
      id: "usability-testing-q-formative",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What is the main goal of a formative usability test?",
      options: [
        { text: "To find and understand problems so the design can be improved", correct: true, explanation: "Formative testing informs design changes; it is diagnostic." },
        { text: "To prove statistically that the design meets a target", correct: false, explanation: "That is the goal of summative testing." },
        { text: "To measure how many people want the product", correct: false, explanation: "Demand is not what usability testing measures." },
        { text: "To check compliance with WCAG", correct: false, explanation: "Conformance is checked by an accessibility audit; testing with disabled users complements it." },
      ],
      explanation: "Formative tests diagnose; summative tests measure.",
    },
    {
      id: "usability-testing-q-five",
      kind: "formula",
      level: "intermediate",
      prompt: "Using P = 1 − (1 − p)ⁿ, what share of problems that affect 10% of users would you expect five participants to reveal?",
      options: [
        { text: "About 85%", correct: false, explanation: "85% corresponds to p ≈ 0.31, not 0.10." },
        { text: "About 41%", correct: true, explanation: "1 − 0.9⁵ = 1 − 0.59 ≈ 0.41." },
        { text: "About 50%", correct: false, explanation: "Five participants × 10% does not give a probability; the formula is not additive." },
        { text: "About 10%", correct: false, explanation: "That is the chance for one participant, not five." },
      ],
      explanation: "The 'five users' result depends on p. Less common problems need far larger samples.",
      revise: "sample-size-estimation",
    },
    {
      id: "usability-testing-q-thinkaloud",
      kind: "true-false",
      level: "intermediate",
      prompt: "In a summative test measuring time on task, asking participants to think aloud and explain their reasoning has no effect on the times recorded.",
      options: [
        { text: "True", correct: false, explanation: "Verbalising, and especially explaining, can slow participants and change strategies." },
        { text: "False", correct: true, explanation: "Think-aloud is valuable formatively, but distorts time measures; summative timing is often measured without it." },
      ],
      explanation: "Choose the protocol to suit the study's purpose.",
    },
    {
      id: "usability-testing-q-critique",
      kind: "scenario",
      level: "advanced",
      prompt:
        "A stakeholder says: 'We tested with five users and found 12 problems, so we found 85% of all problems and can launch.' What is the most accurate response?",
      options: [
        { text: "Correct — five users always find about 85% of problems.", correct: false, explanation: "The 85% figure assumes p ≈ 0.31 for every problem; real problems vary widely in frequency." },
        { text: "We have probably seen most common problems, but rare and severe problems — and problems for other user groups — may remain; the 85% figure is an assumption, not a measurement.", correct: true, explanation: "This reflects the model's assumptions, inflated small-sample estimates of p and heterogeneity across users." },
        { text: "We need 1,000 users to know anything.", correct: false, explanation: "Formative testing with small samples is valuable; the issue is over-claiming coverage." },
        { text: "Problem counts are a reliable measure of usability, so 12 is acceptable.", correct: false, explanation: "Counts depend on tasks, participants and evaluators; they are not a stable usability measure." },
      ],
      explanation: "Small formative tests are useful but cannot certify completeness.",
    },
  ],

  flashcards: [
    { id: "usability-testing-fc-1", front: "Problem discovery formula", back: "P = 1 − (1 − p)ⁿ; n = ln(1 − P) / ln(1 − p). With p = 0.31, n = 5 → ≈84%." },
    { id: "usability-testing-fc-2", front: "Formative vs summative usability testing", back: "Formative: find and explain problems to improve a design. Summative: measure performance against a target or comparison." },
    { id: "usability-testing-fc-3", front: "Three critiques of the 'five users' rule", back: "Problem frequencies vary (rare problems missed); small-sample p is inflated; heterogeneous users and tasks need larger or separate samples." },
  ],

  references: [
    { source: "nielsen-landauer-1993", role: "primary", note: "Problem-discovery model; average λ ≈ 0.31." },
    { source: "virzi-1992", role: "primary", note: "80% of problems with 4–5 participants; severity claim." },
    { source: "lewis-1994", role: "primary", note: "Additional considerations on sample size and severity." },
    { source: "lewis-2001", role: "primary", note: "Bias in small-sample estimates of p and adjustments." },
    { source: "faulkner-2003", role: "primary", note: "Variability of five-user samples." },
    { source: "spool-schroeder-2001", role: "primary", note: "Five users insufficient for large web sites." },
    { source: "molich-et-al-2004", role: "primary", note: "Variability between professional testing teams." },
    { source: "hertzum-jacobsen-2001", role: "primary", note: "Evaluator effect in think-aloud testing." },
    { source: "ericsson-simon-1993", role: "primary", note: "Theory of verbal reports underlying think-aloud." },
    { source: "boren-ramey-2000", role: "primary", note: "Think-aloud in practice; communication-based protocol." },
    { source: "nielsen-1993", role: "explanatory", note: "Discount usability engineering." },
    { source: "nielsen-2000-five-users", role: "explanatory", note: "Argument for iterative small tests." },
    { source: "sauro-lewis-2016", role: "explanatory", note: "Measurement and sample sizes in usability testing." },
    { source: "nielsen-thinking-aloud-article", role: "further", note: "Practitioner overview of think-aloud." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "Peer-reviewed research supports usability testing as the most direct method for identifying usability problems and the diminishing-returns pattern of problem discovery. The same literature shows that small-sample coverage claims depend on strong assumptions, and that results vary between teams, tasks and participants. Summative claims require appropriate statistics.",

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
