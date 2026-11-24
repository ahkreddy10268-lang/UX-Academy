import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "power-law-of-practice",
  slug: "power-law-of-practice",
  title: "Power Law of Practice",
  alternateNames: ["Law of practice", "Log-log linear learning law", "Practice curve"],
  summary:
    "Performance time usually falls with practice, fast at first and then more slowly. A power function long served as the standard description, but individual data are often fitted better by exponential or delayed forms. Use the curve to reason about learning, never as a universal prediction for one person.",
  definition:
    "The **power law of practice** describes the time to perform a task as a power function of the number of practice trials, T(N) = A + B(N + E)^−α, so that early trials bring large gains and later trials smaller ones, approaching a floor A {{src:newell-rosenbloom-1980}}. Newell and Rosenbloom found that power functions fitted averaged practice data from many kinds of task better than exponentials {{src:evans-et-al-2018}}. Later analyses of individual learners found exponential functions fitting better, and showed that averaging can make exponential learners look like a power function {{src:heathcote-brown-mewhort-2000}}; delayed forms improved the fit further {{src:evans-et-al-2018}}, and a 2026 comparison found no model with a clear advantage for individuals {{src:weeks-et-al-2026}}.",
  primaryType: "law",
  secondaryTypes: [],
  domain: "laws-effects",
  subcategory: "performance-laws",
  tags: ["practice", "learning curve", "skill acquisition", "power function", "exponential function", "response time", "expert performance", "learnability"],
  difficulty: "intermediate",
  disciplines: ["Cognitive psychology", "Motor learning", "Mathematical psychology", "Human-computer interaction"],
  learningObjectives: [
    "State what the power law of practice describes and explain every parameter of T(N) = A + B(N + E)^−α, including why the curve approaches A rather than zero.",
    "Calculate predicted times from given parameters and interpret a log-log plot correctly, including when the asymptote must be subtracted first.",
    "Evaluate the evidence for power, exponential and delayed models, explaining how group averaging can produce a power-like curve from learners who are not individually power-law learners.",
    "Plan how a product team would measure learning in a repeated task, using speed together with errors, retention and transfer, and comparing more than one model.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "The first few times you do something new, such as filing an expense claim or using a new editing tool, you are slow. Each repetition makes you a little faster, but the gains shrink: the jump from the first to the fifth try is large, the jump from the fiftieth to the fifty-fifth small. Plotted as time against practice, this gives a curve that drops steeply and then flattens.",
        "Researchers long described that curve with a **power function**. Newell and Rosenbloom showed log-log plots of practice data from tasks as varied as mirror tracing, reading inverted text, using cursor-positioning devices, an on-line editing routine and a card game {{src:newell-rosenbloom-1980}}. The time never falls to zero: there is a floor, the **asymptote**, set by how fast the task can be done at all {{src:newell-rosenbloom-1980}}.",
        "The name sounds stronger than the evidence. Later researchers found that individual learners' curves were usually better fitted by **exponential** functions, and that the power-law shape partly came from averaging many people together {{src:heathcote-brown-mewhort-2000}}. So the safe lesson is: practice usually helps, gains usually shrink, and the exact curve differs between tasks and people.",
      ],
      analogy:
        "Moving into a new kitchen: the first week you open the wrong drawers and every meal is slow; after a month you hardly think about it, and after a year you are barely faster than after a month. You will never cook in zero time, because the cooking itself takes time. That floor is the asymptote.",
      everydayExamples: [
        "Getting faster at a weekly expense form over the first few weeks, then hardly faster after that.",
        "Learning the keyboard shortcuts of a new editor.",
        "A new cashier speeding up at the till over the first days.",
        "Typing a new password quickly after a few logins.",
      ],
      vocabulary: [
        { term: "Practice trial (N)", meaning: "One repetition of the task, counted from the start of measurement." },
        { term: "Performance time (T)", meaning: "The time taken on a trial, usually in seconds." },
        { term: "Asymptote (A)", meaning: "The floor the curve approaches with very long practice; not zero." },
        { term: "Exponent (α)", meaning: "How quickly the power curve falls; it is fitted to data, not universal." },
        { term: "Power function", meaning: "A curve of the form B·N^−α, a straight line on log-log axes." },
        { term: "Exponential function", meaning: "A curve of the form B·e^−rN, in which each trial removes a constant share of the remaining improvement." },
      ],
    },
    intermediate: {
      explanation: [
        "**The general form.** Newell and Rosenbloom's general power law is T(N) = A + B(N + E)^−α {{src:newell-rosenbloom-1980}}. A is the asymptote (A ≥ 0), the time approached as practice continues indefinitely. B scales how far above the asymptote performance starts. E counts trials of learning that happened before measurement began, so N + E is the true amount of practice. α is a positive exponent that controls the rate of decline. With A = 0 and E = 0 it reduces to the simple form T = B·N^−α {{src:newell-rosenbloom-1980}}, which assumes a task could in principle be done in no time at all.",
        "**Worked example (illustrative numbers, not data).** Take T(N) = 2 + 12·N^−0.5 seconds. Trial 1: 2 + 12/1 = 14 s. Trial 4: 2 + 12/2 = 8 s. Trial 9: 2 + 12/3 = 6 s. Trial 36: 2 + 12/6 = 4 s. The first three trials save 6 s; the next 27 save another 4 s; the curve keeps approaching 2 s without reaching it. Nothing about these numbers describes real users.",
        "**Reading log-log plots.** For the simple form, log T = log B − α log N, so the curve is a straight line with slope −α on log-log axes. With a non-zero asymptote or prior practice, the straight line appears only in log(T − A) against log(N + E) {{src:newell-rosenbloom-1980}}. Plotting raw log T against log N bends the line: prior practice distorts it at low N and the asymptote at high N {{src:newell-rosenbloom-1980}}. And because A and E are unknown until fitted, a straight-looking plot is not proof that a power function is the right model.",
        "**The exponential alternative.** An exponential law, T(N) = A + B·e^−rN, removes a constant proportion of the remaining improvement on every trial; for the power function that proportion keeps shrinking, as r/N {{src:evans-et-al-2018}}. Over a limited range of trials the two curves can look almost identical, which is why the shape alone cannot settle which describes a learner.",
        "**Not the same as other performance laws.** [[fitts-law|Fitts's law]] predicts the time of one aimed movement from distance and width; the [[steering-law|steering law]] predicts time through a constrained path; the [[hick-hyman-law|Hick-Hyman law]] relates decision time to choice uncertainty. The practice law describes how any of those times changes as the same task is repeated. In a repeated pointing task, both a Fitts's-law term and a practice curve can apply.",
      ],
      howItWorks: [
        "Choose a well-defined task and measure its completion time on every repetition {{src:newell-rosenbloom-1980}}.",
        "Plot time against trial number: typically a steep early drop and a flattening later.",
        "Fit candidate functions (power, exponential, delayed forms) to each person's data, not only to the group average {{src:heathcote-brown-mewhort-2000}}.",
        "Compare the fits with a method that accounts for model flexibility rather than by eye {{src:evans-et-al-2018}}.",
        "Interpret the fitted parameters as summaries of this task and these people: a starting cost, a floor and a rate.",
      ],
      implementation: [
        "Treat a learning curve as a measurement, not a target: record time, errors and success on each trial together.",
        "Analyse individuals before averaging; report how many learners follow each pattern.",
        "Measure retention after a delay and transfer to a related task, not only speed within one session.",
        "Use the asymptote as a design question: if experts plateau at a slow floor, the interface, not the people, may be the limit.",
        "Support both stages: visible guidance and menus for newcomers, and shortcuts or customisation that let practised users approach a lower floor.",
      ],
      scenarios: [
        "Illustrative scenario: a claims-processing tool is introduced. Over the first week, staff completion times drop quickly, then level off around a time that still includes re-typing the same address in three fields. The plateau points to a design fix (one address field reused), which lowers the floor for everyone rather than waiting for more practice.",
        "Illustrative scenario: a design team adds keyboard shortcuts for frequent actions and keeps the menu items, with the shortcut shown beside each. Newcomers use menus; frequent users gradually switch to shortcuts. The team checks error rates as well as speed, because faster but more error-prone work is not an improvement.",
        "Illustrative scenario: an onboarding flow makes new users repeat a setup task five times 'to build familiarity'. Repetition does speed people up, but if the task need not be repeated in real use, the exercise only adds time. Practice is a reason to support learning, not to impose repetition.",
      ],
    },
    advanced: {
      explanation: [
        "**The original claim.** Newell and Rosenbloom presented the power law as a ubiquitous regularity of practice and offered the chunking theory of learning to explain it {{src:newell-rosenbloom-1980}}. According to Evans and colleagues, they examined 15 experiments spanning motor skills, perceptual and memory decisions, complex routines and problem solving, and after averaging each data set across participants found the power function fitted better than the exponential in all of them {{src:evans-et-al-2018}}. The authors themselves noted that they did not claim all learning is log-log linear, and recorded growing doubts, including the argument that mixtures of processes could produce the shape {{src:newell-rosenbloom-1980}}.",
        "**The averaging problem.** Heathcote, Brown and Mewhort fitted power and exponential functions to 40 data sets representing 7,910 learning series from 475 subjects in 24 experiments. The exponential fitted better in all the unaveraged data sets, and averaging produced a bias in favour of the power function {{src:heathcote-brown-mewhort-2000}}. The mechanism: when learners differ in rate, all of them contribute to early improvement in the group average but only slow learners contribute later, so an average of exponential curves can resemble a power curve {{src:evans-et-al-2018}}. A power-like group curve therefore says little about any one person.",
        "**Delays and distributions.** Both power and exponential functions assume the rate of improvement only ever decreases, yet some learners start slowly, speed up and then level off. Evans and colleagues added one delay parameter τ, giving a delayed power A + B(τ + 1)/(τ + N^r) and a delayed exponential A + B(τ + 1)/(τ + e^rN), which reduce to the standard forms when τ = 0 {{src:evans-et-al-2018}}. Using hierarchical Bayesian models of the whole response-time distribution and a criterion that penalises flexibility, they reanalysed 17 data sets: an exponential form was preferred in 15, the delayed exponential in 11, the delayed power in 2 (both mental arithmetic), and the standard power never {{src:evans-et-al-2018}}.",
        "**Still unsettled.** A 2026 study compared six models, including two power models, an exponential, a hybrid and two dynamical models that allow non-monotonic learning and feedback, on two mirror-tracing experiments with haptic feedback. The power law was not necessarily the best description of individual learning, but no model had a clear advantage at the individual level {{src:weeks-et-al-2026}}. The study concerns one motor task; it does not settle every kind of skill.",
        "**Curve versus mechanism.** A fitted function is a description; mechanisms are separate theories. Crossman proposed that manual speed-skill is acquired through a kind of selective action {{src:crossman-1959}}; Anderson described a move from declarative to procedural knowledge through knowledge compilation {{src:anderson-1982}}; Logan proposed that practice builds a store of instances retrieved ever faster {{src:logan-1988}}. Both Anderson and Logan describe their mechanisms as producing a power-function speed-up {{src:anderson-1982}} {{src:logan-1988}}, which is one reason the functional form matters to theory, and why later evidence against a strict power form also bears on those theories {{src:evans-et-al-2018}}.",
      ],
      evidence: [
        "Original survey: log-log practice curves across many tasks; general form with asymptote and prior practice; chunking theory {{src:newell-rosenbloom-1980}}. Read in full (1980 technical report).",
        "Averaged comparison as later summarised: power better than exponential in all 15 averaged data sets {{src:evans-et-al-2018}}.",
        "Contrary evidence: exponential better in all unaveraged data sets (40 data sets, 7,910 series, 475 subjects); averaging biases towards a power function {{src:heathcote-brown-mewhort-2000}}. Abstract only.",
        "Refinement: delayed exponential preferred in 11 of 17 data sets, exponential forms in 15, standard power in none, with hierarchical Bayesian fitting and flexibility-penalised comparison {{src:evans-et-al-2018}}. Read in full.",
        "Current comparison: six models on mirror-tracing data; power law not necessarily best for individuals; no clear winner {{src:weeks-et-al-2026}}. Abstract only.",
        "No source here establishes a universal exponent, a universal threshold for expertise, or a forgetting rate.",
      ],
      debates: [
        "**Power or exponential?** Averaged data favoured the power function {{src:evans-et-al-2018}}; individual data favour exponential forms {{src:heathcote-brown-mewhort-2000}}, and delayed forms where learning starts slowly {{src:evans-et-al-2018}}. The answer depends on the level of analysis.",
        "**Is there one law at all?** Newell and Rosenbloom did not claim all learning follows the form {{src:newell-rosenbloom-1980}}, and the most recent comparison found no model clearly best for individuals {{src:weeks-et-al-2026}}. Task, feedback, prior experience and strategy changes may all shape the curve.",
        "**Does the functional form constrain theory?** Mechanisms that predict a power speed-up are disadvantaged if individual curves are exponential or delayed {{src:evans-et-al-2018}}.",
      ],
      alternativeModels: [
        "**Exponential law**: T = A + B·e^−rN, a constant relative learning rate {{src:evans-et-al-2018}}.",
        "**APEX function**: an exponential-based function that fitted better than a power function with a prior-practice term {{src:heathcote-brown-mewhort-2000}}.",
        "**Delayed exponential and delayed power**: add τ for an initial slow phase {{src:evans-et-al-2018}}.",
        "**Dynamical models**: allow non-monotonic learning and the influence of feedback {{src:weeks-et-al-2026}}.",
      ],
    },
  },

  formulas: [
    {
      id: "power-law-of-practice-general",
      name: "General power law of practice",
      expression: "T(N) = A + B · (N + E)^(−α)   (simple form: T = B · N^(−α))",
      contributor: "Newell & Rosenbloom (1980/1981)",
      source: "newell-rosenbloom-1980",
      variables: [
        { symbol: "T(N)", name: "Performance time", unit: "s", description: "Predicted time to complete the task on trial N." },
        { symbol: "N", name: "Practice trial", unit: "trials", description: "Number of measured repetitions, starting at 1." },
        { symbol: "A", name: "Asymptote", unit: "s", description: "Floor approached with unlimited practice; A ≥ 0. Not zero for real tasks." },
        { symbol: "B", name: "Scale", unit: "s", description: "How far above the asymptote performance starts (at N + E = 1)." },
        { symbol: "E", name: "Prior practice", unit: "trials", description: "Learning that happened before measurement began; E ≥ 0." },
        { symbol: "α", name: "Exponent", unit: "unitless", description: "Positive rate parameter fitted to data; controls how quickly the curve flattens." },
      ],
      resultUnit: "seconds",
      assumptions: [
        "The task stays the same across trials, and time is measured consistently.",
        "Performance improves monotonically; plateaus, slow starts and strategy changes are not modelled.",
        "Parameters are fitted to a specific task and person or group, not taken from another study.",
      ],
      conditions: [
        "Use to describe and summarise repeated performance of one task.",
        "Fit to individuals before averaging; compare with exponential and delayed forms.",
      ],
      steps: [
        "Record time on each trial N.",
        "Estimate A, B, E and α by fitting the function to the data.",
        "Predict T(N) = A + B(N + E)^−α for the trials of interest.",
        "Check the fit against alternative models using a method that accounts for the number of parameters.",
      ],
      workedExample: {
        given: [
          "Illustrative parameters, not data: A = 2 s, B = 12 s, E = 0, α = 0.5, so T(N) = 2 + 12·N^−0.5.",
        ],
        steps: [
          "N = 1: 2 + 12 × 1 = 14 s",
          "N = 4: 2 + 12 × 0.5 = 8 s",
          "N = 9: 2 + 12 × (1/3) = 6 s",
          "N = 36: 2 + 12 × (1/6) = 4 s",
          "Log-log check: log(T − 2) = log 12 − 0.5 · log N, a straight line of slope −0.5",
        ],
        result: "14, 8, 6 and 4 s on trials 1, 4, 9 and 36: large early gains, smaller later ones, approaching 2 s but never reaching it.",
      },
      interpretation: [
        "A is the practical floor: improve the design to lower it; more practice cannot go below it.",
        "Larger α means faster flattening; it is specific to the task and the people measured.",
        "A straight line appears on log-log axes only after subtracting A and adding E.",
      ],
      commonErrors: [
        "Treating α as a universal constant or a product KPI.",
        "Taking logs of raw times when the asymptote is not zero and calling the bend a failure of the law.",
        "Fitting only group averages and attributing the shape to each person.",
        "Assuming the curve reaches zero.",
      ],
      limitations: [
        "Individual data are often better fitted by exponential or delayed forms.",
        "Does not model plateaus, strategy switches, fatigue, forgetting or transfer.",
        "Describes the curve; it does not explain why learning happens.",
      ],
      alternatives: [
        { name: "Exponential law", expression: "T = A + B · e^(−rN)", note: "Constant relative learning rate; favoured for unaveraged data (Heathcote et al., 2000)." },
        { name: "Delayed exponential", expression: "T = A + B · (τ + 1) / (τ + e^(rN))", note: "Initial slow phase; preferred in 11 of 17 data sets (Evans et al., 2018)." },
        { name: "Delayed power", expression: "T = A + B · (τ + 1) / (τ + N^r)", note: "Delay added to the power form (Evans et al., 2018)." },
      ],
    },
  ],

  origin: {
    contributors: ["Allen Newell", "Paul Rosenbloom", "E. R. F. W. Crossman", "Andrew Heathcote", "Scott Brown", "Douglas Mewhort", "Nathan Evans"],
    period: "Practice curves from the 1920s; the power-law synthesis 1980–1981; exponential challenge 2000; delayed models 2018",
    problem: "Whether one mathematical form describes how performance improves with practice across tasks, and what that form says about the mechanisms of learning.",
    narrative: [
      "Newell and Rosenbloom traced the log-log regularity back to Snoddy's 1926 mirror-tracing study and assembled examples from many areas of psychology, proposing chunking as its explanation {{src:newell-rosenbloom-1980}}. Earlier work, including Crossman's theory of speed-skill, had already modelled practice {{src:crossman-1959}} {{src:evans-et-al-2018}}.",
      "The power form shaped theories of skill such as Anderson's knowledge compilation and Logan's instance theory {{src:anderson-1982}} {{src:logan-1988}}. In 2000 Heathcote and colleagues argued that individual data favour an exponential law {{src:heathcote-brown-mewhort-2000}}; in 2018 Evans and colleagues proposed delayed forms {{src:evans-et-al-2018}}; in 2026 Weeks and colleagues compared static and dynamical models without finding a clear winner {{src:weeks-et-al-2026}}.",
    ],
    attributionNote:
      "Newell and Rosenbloom's work is cited from the September 1980 technical report CMU-CS-80-145, read in full, which states it was to appear in the 1981 book edited by Anderson; the book chapter was not consulted. Snoddy (1926) is mentioned only as Newell and Rosenbloom report it. Heathcote et al. (2000), Weeks et al. (2026), Crossman (1959) and Anderson (1982) were read as abstracts; Logan (1988) as abstract and introduction; Evans et al. (2018) in full.",
  },

  application: {
    summary: [
      "Use the law to reason about learnability: expect large early gains and a floor; design for both newcomers and practised users; and measure real learning with time, errors, retention and transfer for individuals. Do not treat a fitted exponent as a goal, or use the promise of learning to excuse a needlessly difficult interface (academy interpretation).",
    ],
    web: [
      "Repeated workflows such as publishing or data entry: watch where practised users plateau and remove the steps that set the floor.",
      "Onboarding: give guidance for the first uses and let people skip it; never make people repeat tasks just to raise engagement.",
    ],
    mobile: [
      "Gestures and shortcuts: keep a visible alternative so people who have not yet learned the fast path are not stranded.",
    ],
    enterprise: [
      "Professional software: measure learning curves per person and per group, including people using assistive technology, so averages do not hide those who struggle.",
      "Training: combine practice with feedback, spaced sessions and realistic tasks; report accuracy and retention, not only speed.",
    ],
    services: [
      "Staff tools in services (call centres, clinics, counters): a falling time per case is good only if errors and outcomes for the people served do not get worse.",
    ],
    steps: [
      "Define the exact task and its success criteria.",
      "Record trial number, completion time, errors and success for each person.",
      "Plot individuals first; look for slow starts, plateaus or strategy changes.",
      "Fit at least two models (for example power and exponential) and compare them with a method that penalises extra parameters.",
      "Test retention after a delay and transfer to a related task.",
      "Decide whether a design change or a training change will lower the floor or speed up learning.",
    ],
  },

  whenToUse: [
    "Estimating how quickly people become efficient with a repeated task, from data you collect.",
    "Explaining why early usability tests show slower times than experienced use, and designing for both.",
    "Judging whether a plateau is a limit of the person or of the interface.",
  ],
  whenNotToUse: [
    "As a universal prediction for any individual: individual curves are often exponential or delayed {{src:heathcote-brown-mewhort-2000}} {{src:evans-et-al-2018}}.",
    "To justify an interface that is hard to learn because 'people will get faster'.",
    "As evidence for a number of hours needed to become an expert; the law defines no such threshold.",
    "To predict forgetting after practice stops; it describes improvement during practice only.",
  ],
  advantages: [
    "Summarises practice data with a few interpretable parameters: a starting cost, a floor and a rate {{src:newell-rosenbloom-1980}}.",
    "Captures the widely observed pattern of large early gains and diminishing later gains {{src:newell-rosenbloom-1980}}.",
    "Its history teaches how averaging and model choice can mislead {{src:heathcote-brown-mewhort-2000}}.",
  ],
  limitations: [
    "Individual data are generally fitted better by exponential forms; averaging biases towards a power function {{src:heathcote-brown-mewhort-2000}}.",
    "Assumes an always-decreasing rate of improvement; slow starts need delayed forms {{src:evans-et-al-2018}}.",
    "No model had a clear advantage for individuals in a recent motor-learning comparison {{src:weeks-et-al-2026}}.",
    "Speed alone says nothing about errors, understanding, retention or transfer.",
    "Several key papers were read as abstracts only (Heathcote et al., Weeks et al., Anderson, Crossman).",
  ],
  misconceptions: [
    {
      myth: "Everyone learns along the same power curve.",
      reality:
        "Learners differ in rate, and individual curves are often better fitted by exponentials; a power-like group curve can arise from averaging {{src:heathcote-brown-mewhort-2000}} {{src:evans-et-al-2018}}.",
    },
    {
      myth: "With enough practice the time falls to zero.",
      reality: "The general form approaches an asymptote A, the floor set by the task itself {{src:newell-rosenbloom-1980}}.",
    },
    {
      myth: "A straight line on a log-log plot proves the power law.",
      reality:
        "Straightness depends on subtracting the asymptote and adding prior practice, which must be estimated {{src:newell-rosenbloom-1980}}; exponential curves can look similar over limited ranges, so models must be compared formally {{src:evans-et-al-2018}}.",
    },
    {
      myth: "The power law says expertise takes 10,000 hours.",
      reality: "The law describes the shape of improvement; it sets no threshold for expertise.",
    },
    {
      myth: "It is the same as the learning curve in manufacturing.",
      reality:
        "Industrial learning curves measure cost or labour per unit across an organisation's cumulative production (manufacturing experience curves, such as Wright's law); Newell and Rosenbloom note they are log-log linear too but measure cost, not one person's performance time {{src:newell-rosenbloom-1980}}.",
    },
  ],

  relations: [
    { target: "fitts-law", type: "contrasts-with", note: "Fitts's law predicts the time of one aimed movement from distance and width; the practice law describes how a task's time changes with repetition." },
    { target: "steering-law", type: "contrasts-with", note: "The steering law predicts time through a constrained path; the practice law describes improvement across repeated performance." },
    { target: "hick-hyman-law", type: "contrasts-with", note: "Hick-Hyman relates decision time to choice uncertainty; the practice law describes how performance time changes with practice." },
    { target: "keystroke-level-model", type: "related-to", note: "KLM predicts practised, error-free execution times; the practice curve describes the learning that comes before that state." },
    { target: "goal-gradient-effect", type: "contrasts-with", note: "Goal gradient concerns effort as a goal approaches; the practice law concerns how performance speeds up with repetition." },
    { target: "flexibility-and-efficiency-of-use", type: "applied-in", note: "Accelerators for practised users exist because performance keeps improving with practice; novices still need the visible path." },
    { target: "learnability", type: "measured-by", note: "Learning curves are one way to measure how learnable a task or interface is." },
    { target: "task-success-rate", type: "complementary-to", note: "Faster times are meaningful only alongside success and error measures." },
  ],

  exercises: [
    {
      id: "power-law-of-practice-ex-calc",
      kind: "calculation",
      level: "beginner",
      title: "Calculate a practice curve",
      prompt: [
        "Illustrative parameters: T(N) = 3 + 9·N^−0.5 seconds.",
        "Compute T on trials 1, 9 and 81. Then find the trial N at which T = 4.5 s. Explain what the value 3 represents and why the time never reaches it.",
      ],
      deliverable: "Three predicted times, the trial for 4.5 s, and two sentences of interpretation.",
      criteria: [
        "T(1) = 12 s, T(9) = 6 s, T(81) = 4 s",
        "N = 36 for T = 4.5 s (9·N^−0.5 = 1.5, so √N = 6)",
        "Identifies 3 s as the asymptote, approached but never reached",
      ],
    },
    {
      id: "power-law-of-practice-ex-critique",
      kind: "critique",
      level: "intermediate",
      title: "Critique a learning-curve claim",
      prompt: [
        "Illustrative scenario: a team averages the task times of 40 users over 20 sessions, sees a smooth curve that is straight on log-log axes, and concludes that 'each user learns according to a power law with exponent 0.4, so after 100 sessions everyone will be at expert speed'.",
        "Identify every unsupported step in this conclusion and say what data and analysis would be needed instead.",
      ],
      deliverable: "A list of problems with a corrected analysis plan.",
      criteria: [
        "Separates group averages from individual curves and mentions the averaging bias",
        "Notes that straightness depends on asymptote and prior practice and does not prove the model",
        "Rejects the universal 'expert speed' claim and asks for errors, retention and transfer",
        "Proposes fitting more than one model per person",
      ],
    },
    {
      id: "power-law-of-practice-ex-study",
      kind: "assignment",
      level: "advanced",
      title: "Plan a learning study for a professional tool",
      prompt: [
        "Your team will redesign a frequent task in an internal finance tool. Plan a study that measures how quickly staff learn the old and new designs.",
        "Specify trials and sessions, the measures (time, errors, success, retention after a week, transfer to a related task), how you will analyse individuals, which models you will compare and how, and how you will include staff who use assistive technology.",
        "State what result would show that the new design lowers the floor rather than only the starting time.",
      ],
      deliverable: "A one-to-two-page study plan.",
      criteria: [
        "Measures accuracy, retention and transfer as well as time",
        "Analyses individuals and compares at least two model families formally",
        "Includes a decision rule about the asymptote",
        "Accounts for different learning speeds and assistive technology",
      ],
    },
  ],

  quiz: [
    {
      id: "power-law-of-practice-q-shape",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What pattern does the power law of practice describe?",
      options: [
        { text: "Large early gains in speed that shrink with further practice, approaching a floor", correct: true, explanation: "The curve drops steeply and then flattens towards the asymptote." },
        { text: "The same time saved on every trial", correct: false, explanation: "That would be a straight line; practice curves flatten." },
        { text: "Time falling to zero with enough practice", correct: false, explanation: "The general form approaches an asymptote above zero." },
        { text: "The time of one aimed movement", correct: false, explanation: "That is Fitts's law." },
      ],
      explanation: "Diminishing returns towards a floor.",
    },
    {
      id: "power-law-of-practice-q-calc",
      kind: "formula",
      level: "intermediate",
      prompt: "With T(N) = 2 + 12·N^−0.5 seconds (illustrative), what is the predicted time on trial 16?",
      options: [
        { text: "5 s", correct: true, explanation: "16^−0.5 = 1/4, so T = 2 + 12/4 = 5 s." },
        { text: "3 s", correct: false, explanation: "That would need 12 × N^−0.5 = 1, i.e. N = 144." },
        { text: "0.75 s", correct: false, explanation: "This ignores the asymptote of 2 s and misapplies the exponent." },
        { text: "14 s", correct: false, explanation: "14 s is the time on trial 1." },
      ],
      explanation: "Compute N^−α, multiply by B, then add A.",
    },
    {
      id: "power-law-of-practice-q-loglog",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "For T = A + B(N + E)^−α with A > 0, which plot is a straight line with slope −α?",
      options: [
        { text: "log(T − A) against log(N + E)", correct: true, explanation: "Subtracting the asymptote and adding prior practice linearises the general form." },
        { text: "T against N", correct: false, explanation: "The raw curve is not linear." },
        { text: "log T against log N, always", correct: false, explanation: "Only for the simple form with A = 0 and E = 0." },
        { text: "log T against N", correct: false, explanation: "That semi-log plot linearises an exponential, not a power function." },
      ],
      explanation: "A and E must be accounted for before the line is straight.",
    },
    {
      id: "power-law-of-practice-q-evidence",
      kind: "critique",
      level: "advanced",
      prompt: "What did Heathcote, Brown and Mewhort (2000) report?",
      options: [
        { text: "Exponential functions fitted better than power functions in all unaveraged data sets, and averaging biased results towards a power function", correct: true, explanation: "Their survey covered 40 data sets, 7,910 learning series and 475 subjects." },
        { text: "The power law fits every individual learner", correct: false, explanation: "Individual data favoured the exponential." },
        { text: "All learning is exponential, so the power law has no use", correct: false, explanation: "They argued for an exponential law of practice; later work proposed delayed forms and found no single winner for individuals." },
        { text: "Practice has no effect on response time", correct: false, explanation: "Both functions describe performance improving with practice." },
      ],
      explanation: "Level of analysis matters: group averages and individuals can differ.",
    },
  ],

  flashcards: [
    { id: "power-law-of-practice-fc-1", front: "General power law of practice", back: "T(N) = A + B(N + E)^−α: A asymptote, B scale, E prior practice, α rate. Approaches A, never zero." },
    { id: "power-law-of-practice-fc-2", front: "Log-log straight line", back: "log(T − A) vs log(N + E) has slope −α. Raw log T vs log N bends when A or E is non-zero." },
    { id: "power-law-of-practice-fc-3", front: "Averaging artefact", back: "Averaging learners with different exponential rates can produce a power-like group curve (Heathcote et al., 2000)." },
    { id: "power-law-of-practice-fc-4", front: "Delayed exponential", back: "A + B(τ + 1)/(τ + e^rN): allows a slow start; preferred in 11 of 17 data sets (Evans et al., 2018)." },
    { id: "power-law-of-practice-fc-5", front: "Measure learning, not just speed", back: "Time with errors and success, per person, plus retention after a delay and transfer to a related task." },
  ],

  references: [
    { source: "newell-rosenbloom-1980", role: "primary", note: "Original synthesis and general power form; 1980 technical report read in full." },
    { source: "heathcote-brown-mewhort-2000", role: "primary", note: "Exponential law for unaveraged data; averaging bias; abstract only." },
    { source: "evans-et-al-2018", role: "primary", note: "Delayed power and exponential laws; hierarchical Bayesian comparison; read in full." },
    { source: "weeks-et-al-2026", role: "primary", note: "Six-model comparison on mirror-tracing data; abstract only." },
    { source: "crossman-1959", role: "explanatory", note: "Early theory of speed-skill acquisition; abstract only." },
    { source: "anderson-1982", role: "explanatory", note: "Knowledge compilation account of skill acquisition; abstract only." },
    { source: "logan-1988", role: "explanatory", note: "Instance theory of automatisation; abstract and introduction." },
  ],
  evidence: "contested",
  evidenceNote:
    "Practice usually speeds performance, with diminishing gains, and power functions describe averaged practice data well; this is long established. Whether a power function is the right law is contested: analyses of individual learners favour exponential functions and show that averaging biases towards a power shape (abstract read), a full-text reanalysis of 17 data sets preferred delayed-exponential forms in most and never the standard power form, and a 2026 comparison on mirror-tracing data (abstract read) found no clear winner among six models for individuals. Results depend on task, measurement, feedback, prior experience and level of analysis. The original synthesis was read as a 1980 technical report, not the 1981 chapter. UX applications in this entry are the academy's interpretation, not tested in the cited studies.",

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
  lastVerifiedAt: "2026-11-24",
});
