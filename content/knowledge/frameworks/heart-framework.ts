import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "heart-framework",
  slug: "heart-framework",
  title: "HEART Framework",
  alternateNames: ["Google HEART", "HEART metrics", "Goals–Signals–Metrics (GSM) process"],
  summary:
    "A framework from Google for choosing user-centred metrics at scale across five categories — Happiness, Engagement, Adoption, Retention and Task success — derived through a Goals–Signals–Metrics process.",
  definition:
    "The **HEART framework** (Rodden, Hutchinson & Fu, 2010) is a measurement framework for large-scale web products. It names five categories of user-centred metrics — **Happiness**, **Engagement**, **Adoption**, **Retention** and **Task success** — and pairs them with a **Goals–Signals–Metrics** process: state the user-experience goal, identify behavioural or attitudinal signals that would indicate progress, then define specific, trackable metrics. It is designed to complement business and technical metrics, not to replace them.",
  primaryType: "framework",
  secondaryTypes: ["methodology"],
  domain: "frameworks",
  subcategory: "measurement",
  tags: ["metrics", "HEART", "Goals-Signals-Metrics", "analytics", "UX measurement", "product metrics"],
  difficulty: "intermediate",
  disciplines: ["UX research", "Product analytics", "Product management", "Data science"],
  learningObjectives: [
    "Name the five HEART categories and give an example metric for each.",
    "Apply the Goals–Signals–Metrics process to a feature or product.",
    "Distinguish attitudinal from behavioural metrics and explain why both are needed.",
    "Critique HEART metrics for validity, gaming and confounding.",
  ],
  prerequisites: ["usability"],

  levels: {
    beginner: {
      explanation: [
        "When a product has millions of users, you cannot watch them all. You need numbers that tell you whether the experience is getting better or worse. The HEART framework is a checklist of the kinds of numbers worth tracking.",
        "HEART stands for five things: **Happiness** — do people like it? **Engagement** — how much do they use it? **Adoption** — are new people starting to use it? **Retention** — do people keep coming back? **Task success** — can they actually do what they came to do, quickly and without errors?",
        "The other half of the framework is a thinking routine: start from a **goal**, ask what **signal** would show you are reaching it, then turn that signal into a **metric** you can track. That stops teams from measuring things just because they are easy to count.",
      ],
      analogy:
        "A doctor's check-up. No single number says 'healthy'. The doctor looks at several vital signs — heart rate, blood pressure, temperature — each telling a different part of the story. HEART gives a product its vital signs.",
      everydayExamples: [
        "A music app tracks how many new users create a playlist in their first week (Adoption).",
        "An email service tracks the percentage of messages sent without an error (Task success).",
        "A news site runs a short satisfaction survey after reading (Happiness).",
      ],
      vocabulary: [
        { term: "Metric", meaning: "A number you track over time, such as the percentage of users who return each week." },
        { term: "Signal", meaning: "An observable behaviour or attitude that would indicate progress towards a goal." },
        { term: "Attitudinal", meaning: "About what people think or feel, usually from surveys." },
        { term: "Behavioural", meaning: "About what people do, usually from logs and analytics." },
      ],
    },
    intermediate: {
      explanation: [
        "Rodden, Hutchinson and Fu introduced HEART to address a gap at Google: teams had plenty of business and technical metrics, which they summarised as PULSE (page views, uptime, latency, seven-day active users, earnings), but these said little about the quality of the user experience {{src:rodden-hutchinson-fu-2010}}.",
        "**Happiness** covers attitudinal measures such as satisfaction, perceived ease of use or visual appeal, typically from in-product surveys. **Engagement** is the depth and frequency of involvement — visits per user per week, or items created per user. **Adoption** is new users of a product or feature in a period. **Retention** is the rate at which users from one period are still active in a later one. **Task success** covers behavioural usability measures: efficiency (time), effectiveness (completion) and error rate.",
        "The **Goals–Signals–Metrics** process does the real work. Goal: 'users find the photo they want quickly'. Signal: fewer searches refined repeatedly; faster time from search to opening a photo. Metric: median time from first query to first photo opened, per user per week. The authors stress that you need not use every category — pick those that serve the project's goals {{src:rodden-hutchinson-fu-2010}}.",
      ],
      howItWorks: [
        "Metrics are usually normalised per user or expressed as rates, so they are comparable across time and between products of different sizes.",
        "Behavioural metrics come from logging; attitudinal metrics come from surveys, often with standardised items such as [[system-usability-scale|SUS]] or [[net-promoter-score|NPS]]. Combining both reveals cases where people use a feature heavily but dislike it, or like it but fail at it.",
        "HEART metrics are most informative when tracked against a baseline and used in experiments such as [[ab-testing|A/B tests]], where changes can be attributed to the design.",
      ],
      implementation: [
        "Write one or two UX goals for the product or feature before choosing metrics.",
        "For each relevant HEART category, list candidate signals; discard any that would not move if the goal was achieved.",
        "Define each metric exactly: numerator, denominator, time window and population.",
        "Instrument, baseline, and review metrics with qualitative research to explain *why* they move.",
        "Retire metrics that no longer inform decisions.",
      ],
      scenarios: [
        "A redesign of a settings page: the goal is fewer errors when changing notification preferences. Task success metric: percentage of preference changes not reverted within 24 hours.",
        "A new collaboration feature: Adoption = share of weekly active teams creating their first shared document; Retention = share of those still collaborating four weeks later.",
      ],
    },
    advanced: {
      explanation: [
        "HEART is a *taxonomy plus process*, not a validated psychometric model. Its categories are pragmatic groupings that help teams achieve coverage; they are not independent constructs, and in practice they overlap (for example, retention partly reflects happiness).",
        "Its most important contribution is methodological: insisting that metrics be **derived from goals** guards against the streetlight effect — measuring what is easy rather than what matters. The paper frames this as making UX measurable at large scale without losing a user-centred perspective {{src:rodden-hutchinson-fu-2010}}.",
        "Validity questions remain for each metric. Engagement can rise because a design is confusing — users click more to achieve less. Time on site can mean absorption or getting lost. A metric is only valid relative to the goal and the signal's interpretation, which is why qualitative research must accompany quantitative tracking.",
      ],
      evidence: [
        "The source is a short peer-reviewed CHI paper describing an approach used at Google, with case examples. It presents practice, not an experimental validation of the framework {{src:rodden-hutchinson-fu-2010}}.",
        "Widespread industry adoption shows usefulness as a planning tool; it does not establish that HEART-led measurement improves product outcomes compared with other approaches.",
      ],
      debates: [
        "**Engagement as a goal.** Treating engagement as inherently good can reward compulsive or manipulative designs. Many teams now pair engagement with wellbeing or task-success constraints.",
        "**Happiness via NPS.** Using NPS as the happiness metric is common but contested; see [[net-promoter-score|NPS]] for its measurement criticisms.",
        "**Category completeness.** HEART omits trust, accessibility and fairness, which some teams add as extra categories.",
      ],
      alternativeModels: [
        "**AARRR (pirate metrics)** — acquisition, activation, retention, referral, revenue — is a growth-funnel framework focused on business outcomes. See [[aarrr|AARRR]].",
        "**North Star Metric** — a single metric meant to capture delivered value; HEART metrics can serve as inputs. See [[north-star-metric|North Star Metric]].",
        "**PULSE** — the business and technical metrics that HEART was designed to complement.",
      ],
    },
  },

  origin: {
    contributors: ["Kerry Rodden", "Hilary Hutchinson", "Xin Fu"],
    period: "2010, Google",
    problem:
      "Large-scale web products were measured with business and technical metrics that did not reflect user-experience quality, while traditional UX methods did not scale to millions of users.",
    narrative: [
      "Researchers at Google presented the HEART framework and the Goals–Signals–Metrics process at CHI 2010, illustrated with examples from Google products {{src:rodden-hutchinson-fu-2010}}.",
      "The paper positioned HEART as a complement to PULSE metrics and argued that UX teams should help product teams define metrics aligned with user goals.",
    ],
  },

  application: {
    summary: [
      "HEART is used to define success metrics for products and features, to structure dashboards, and to set the outcome measures for experiments.",
    ],
    web: ["Track task success for critical flows (sign-up, checkout) as completion and error rates alongside time."],
    mobile: ["Use per-user weekly engagement and four-week retention cohorts for new features."],
    enterprise: [
      "Measure task success and efficiency for high-frequency workflows; engagement may be mandatory and therefore uninformative.",
    ],
    services: ["Combine digital HEART metrics with service-level measures such as failure demand and time to resolution."],
    steps: [
      "State UX goals for the product or feature.",
      "Choose the relevant HEART categories.",
      "Identify signals that would show progress for each goal and category.",
      "Define precise metrics with numerator, denominator, window and segment.",
      "Instrument, baseline, monitor and pair with qualitative research.",
    ],
  },

  whenToUse: [
    "Defining success metrics for a product, feature or redesign.",
    "Designing dashboards that reflect user experience, not only business performance.",
    "Choosing outcome metrics for A/B tests.",
  ],
  whenNotToUse: [
    "Small products with too little traffic for stable behavioural metrics — use qualitative research and task-based testing.",
    "As a mandatory five-metric template; the authors advise choosing only relevant categories.",
    "As a replacement for understanding why metrics move.",
  ],
  advantages: [
    "Gives coverage of experience quality beyond business metrics.",
    "The goals-first process prevents vanity metrics.",
    "Combines attitudinal and behavioural perspectives.",
  ],
  limitations: [
    "Not a validated measurement model; categories overlap.",
    "Behavioural metrics are ambiguous without qualitative context.",
    "Engagement metrics can incentivise manipulative design.",
    "Requires reliable instrumentation and sufficient scale.",
  ],
  misconceptions: [
    {
      myth: "You must track all five HEART categories.",
      reality: "Rodden and colleagues recommend choosing the categories that match your goals; some may be irrelevant to a given project.",
    },
    {
      myth: "Higher engagement always means a better experience.",
      reality: "Engagement can rise when users struggle or are manipulated. Interpret it against the goal and pair it with task success and happiness.",
    },
    {
      myth: "HEART is a single score.",
      reality: "It is a set of categories and a process for choosing metrics; combining them into one number defeats its purpose.",
    },
  ],

  relations: [
    { target: "task-success-rate", type: "measured-by", note: "Task success rate is a standard metric for HEART's Task success category." },
    { target: "system-usability-scale", type: "measured-by", note: "Standardised questionnaires such as SUS can serve as Happiness metrics." },
    { target: "net-promoter-score", type: "measured-by", note: "NPS is frequently used, with caveats, as a Happiness metric." },
    { target: "retention-rate", type: "measured-by", note: "Retention rate operationalises HEART's Retention category." },
    { target: "ab-testing", type: "applied-in", note: "HEART metrics often serve as outcome measures in controlled experiments." },
    { target: "aarrr", type: "contrasts-with", note: "AARRR focuses on growth-funnel business outcomes; HEART focuses on user-experience quality." },
    { target: "north-star-metric", type: "complementary-to", note: "HEART metrics can be the input metrics that drive a North Star Metric." },
    { target: "product-analytics", type: "applied-in", note: "Behavioural HEART metrics are implemented through product analytics instrumentation." },
  ],

  exercises: [
    {
      id: "heart-framework-ex-gsm",
      kind: "assignment",
      level: "intermediate",
      title: "Goals → Signals → Metrics for a feature",
      prompt: [
        "A recipe app is launching 'cook mode', which keeps the screen on and shows one step at a time.",
        "Write two UX goals, then for each relevant HEART category give a signal and a precisely defined metric.",
      ],
      deliverable: "A GSM table with category, goal, signal and metric (including numerator, denominator and time window).",
      criteria: [
        "Goals are user-centred, not business targets",
        "Only relevant categories are used, with justification",
        "Metrics are precisely defined and per-user or rate-based",
        "Includes at least one attitudinal and one behavioural metric",
      ],
      exampleSolution: [
        "Goal: cooks can follow recipes hands-free without losing their place. Task success — signal: fewer returns to the full recipe view during cooking; metric: share of cook-mode sessions with no exit to the full recipe before the final step, per week.",
        "Adoption — metric: share of weekly active users who start cook mode at least once in their first 7 days after release. Happiness — metric: mean rating on a one-question post-session ease survey from a random 5% sample.",
      ],
    },
    {
      id: "heart-framework-ex-critique",
      kind: "critique",
      level: "advanced",
      title: "Critique an engagement target",
      prompt: [
        "Leadership sets 'increase average session length by 20%' as the UX goal for a banking app.",
        "Explain the risks using HEART and GSM, and propose a better goal and metrics.",
      ],
      criteria: [
        "Identifies that longer sessions may indicate difficulty",
        "Reframes around user goals",
        "Proposes task-success and happiness metrics as balances",
      ],
    },
    {
      id: "heart-framework-ex-classify",
      kind: "scenario",
      level: "beginner",
      title: "Classify metrics",
      prompt: [
        "Classify each metric into a HEART category: (a) % of new accounts in the last 7 days that upload a photo; (b) median time to complete checkout; (c) average satisfaction rating; (d) % of January users active in March; (e) photos uploaded per user per week.",
      ],
      criteria: ["All five classified correctly"],
      exampleSolution: ["(a) Adoption; (b) Task success; (c) Happiness; (d) Retention; (e) Engagement."],
    },
  ],

  quiz: [
    {
      id: "heart-framework-q-letters",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What do the letters in HEART stand for?",
      options: [
        { text: "Happiness, Engagement, Adoption, Retention, Task success", correct: true, explanation: "These are the five categories from Rodden et al. (2010)." },
        { text: "Habit, Effort, Activation, Revenue, Traffic", correct: false, explanation: "These mix growth and business terms; not HEART." },
        { text: "Heuristics, Evaluation, Analysis, Research, Testing", correct: false, explanation: "These are research activities, not metric categories." },
        { text: "Happiness, Efficiency, Accessibility, Reliability, Trust", correct: false, explanation: "Plausible qualities, but not the HEART categories." },
      ],
      explanation: "HEART: Happiness, Engagement, Adoption, Retention, Task success.",
    },
    {
      id: "heart-framework-q-gsm",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "In the Goals–Signals–Metrics process, what is a 'signal'?",
      options: [
        { text: "An observable user behaviour or attitude that would indicate progress towards the goal", correct: true, explanation: "Signals bridge abstract goals and specific metrics." },
        { text: "The final number shown on the dashboard", correct: false, explanation: "That is the metric." },
        { text: "A business target set by leadership", correct: false, explanation: "Goals in GSM are user-experience goals; signals are evidence of progress." },
        { text: "An alert raised when a metric drops", correct: false, explanation: "That is monitoring, not the GSM concept." },
      ],
      explanation: "Goal → what would show it (signal) → how to track it (metric).",
    },
    {
      id: "heart-framework-q-engagement",
      kind: "scenario",
      level: "advanced",
      prompt: "After a navigation redesign, pages per session rose 30% while task completion for 'find a store' fell. What is the best interpretation?",
      options: [
        { text: "Users are likely struggling to find information; the engagement increase reflects difficulty, not value.", correct: true, explanation: "Engagement must be interpreted against the goal; falling task success suggests users are lost." },
        { text: "The redesign is a success because engagement increased.", correct: false, explanation: "This ignores the task-success regression and the meaning of the signal." },
        { text: "Task success is not a HEART metric, so it can be ignored.", correct: false, explanation: "Task success is one of the five HEART categories." },
        { text: "Pages per session is a Retention metric.", correct: false, explanation: "It is an engagement-type metric; retention concerns returning over time." },
      ],
      explanation: "Use multiple categories to check each other; engagement alone can mislead.",
    },
  ],

  flashcards: [
    { id: "heart-framework-fc-cats", front: "HEART categories", back: "Happiness, Engagement, Adoption, Retention, Task success (Rodden, Hutchinson & Fu, 2010)." },
    { id: "heart-framework-fc-gsm", front: "GSM process", back: "Goals (UX aims) → Signals (observable evidence) → Metrics (precise, trackable measures)." },
    { id: "heart-framework-fc-pulse", front: "PULSE metrics", back: "Page views, Uptime, Latency, Seven-day active users, Earnings — business/technical metrics HEART complements." },
  ],

  references: [
    { source: "rodden-hutchinson-fu-2010", role: "primary", note: "Original presentation of HEART and Goals–Signals–Metrics." },
    { source: "google-research", role: "further", note: "Hosts the public version of the paper." },
    { source: "sauro-lewis-2016", role: "further", note: "Measuring task success, time and satisfaction rigorously." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "Published as a peer-reviewed CHI paper describing an industrial practice with examples. That supports HEART as a credible, field-tested planning framework, not as a validated measurement model or a proven driver of better outcomes.",

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
