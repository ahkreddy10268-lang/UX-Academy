import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "loss-aversion",
  slug: "loss-aversion",
  title: "Loss Aversion",
  alternateNames: ["Loss–gain asymmetry", "Loss aversion in prospect theory"],
  summary:
    "Relative to a reference point, losses are often weighted more heavily than equivalent gains. The size and reliability of the asymmetry depend on how loss aversion is defined and measured; there is no universal 'twice as much' rule.",
  definition:
    "Loss aversion is a **reference-dependent asymmetry** in subjective value: for otherwise comparable changes around a reference point, a loss is assigned greater negative value than the positive value assigned to an equivalent gain. In prospect theory, the value function is typically steeper for losses than gains, but empirical coefficients vary with the choice task, elicitation method, incentives and model specification {{src:kahneman-tversky-1979}} {{src:tversky-kahneman-1991}}.",
  primaryType: "cognitive-bias",
  secondaryTypes: ["concept"],
  domain: "laws-effects",
  subcategory: "decision-biases",
  tags: ["decision-making", "prospect theory", "reference dependence", "risk", "behavioural economics", "choice architecture"],
  difficulty: "intermediate",
  disciplines: ["Decision psychology", "Behavioural economics", "Consumer research", "Interaction design", "Product strategy"],
  learningObjectives: [
    "Define loss aversion relative to a reference point and explain the difference between a gain and a loss of the same objective size.",
    "Distinguish loss aversion from risk aversion, diminishing sensitivity, the endowment effect and status-quo bias.",
    "Interpret empirical estimates of loss aversion while accounting for task, model and sample heterogeneity.",
    "Evaluate interface decisions that invoke potential losses, keeping user control and informed choice ahead of conversion."
  ],
  prerequisites: [],
  levels: {
    beginner: {
      explanation: [
        "Imagine that you receive £20 unexpectedly and later lose £20. The two amounts are equal, but many people experience the loss as more consequential than the gain felt good. This tendency is called **loss aversion**.",
        "The idea depends on a **reference point**: the position you compare an outcome with. A £20 change can feel like a gain if you had £100 and now have £120, or a loss if you expected £140 and now have £120. The same final amount can be evaluated differently because the comparison point changed.",
        "Loss aversion is a tendency found in many decision tasks, not a rule that every person always dislikes every loss more than an equal gain. Its size differs across studies and situations, and a designer should not assume it from one user's click or cancellation."
      ],
      analogy:
        "Picture a score that starts at zero. Adding ten points moves the score up; removing ten moves it down. Loss aversion describes the common finding that the downward move can carry more subjective weight than the equal upward move.",
      everydayExamples: [
        "A person hesitates to switch away from a familiar plan because they focus on features they might lose.",
        "A user worries that deleting a saved draft will remove work they have already invested time in.",
        "A customer is more attentive to a fee being added than to an equivalent discount being offered."
      ],
      vocabulary: [
        { term: "Reference point", meaning: "The baseline against which an outcome is evaluated as a gain or a loss." },
        { term: "Gain", meaning: "An outcome that is better than the relevant reference point." },
        { term: "Loss", meaning: "An outcome that is worse than the relevant reference point." },
        { term: "Loss-aversion coefficient", meaning: "A model parameter comparing the weight assigned to losses with the weight assigned to gains in a specified task." },
        { term: "Diminishing sensitivity", meaning: "The change in subjective value from a small objective change tends to shrink as the starting magnitude grows within the gain or loss domain." }
      ]
    },
    intermediate: {
      explanation: [
        "Kahneman and Tversky's 1979 prospect theory replaced an absolute-wealth description with a value function defined over gains and losses relative to a reference point. In the commonly illustrated value function, the gain side is concave, the loss side is convex, and the loss side is steeper near the reference point {{src:kahneman-tversky-1979}}.",
        "Tversky and Kahneman's 1991 reference-dependent model makes three properties explicit: **reference dependence**, **loss aversion** and **diminishing sensitivity**. They are related, but not synonyms. Reference dependence defines the baseline; loss aversion is the asymmetry across that baseline; diminishing sensitivity is curvature within the gain or loss side {{src:tversky-kahneman-1991}}.",
        "Cumulative prospect theory later formalised the model for uncertain as well as risky prospects and separated the value function from probability weighting. Its loss-aversion parameter is a property of that model and its elicitation task, not a direct universal multiplier for all everyday decisions {{src:tversky-kahneman-1992}}.",
        "The popular phrase 'losses hurt twice as much as gains feel good' is therefore a poor definition. Estimates vary. Brown and colleagues' broad meta-analysis of 607 estimates from 150 articles reports a mean coefficient of 1.955, while a narrower meta-analysis of individual risky-choice estimates reports 1.31 across 19 datasets and very high heterogeneity. Those estimates have different scopes and should not be averaged or treated as a fixed personal ratio {{src:brown-et-al-2024}} {{src:walasek-mullett-stewart-2024}}."
      ],
      howItWorks: [
        "A decision is encoded relative to a reference point, such as the current state, an expectation, an endowment or a status quo. The same objective outcome can therefore be represented as a gain or a loss.",
        "The value function weights the loss side more steeply than the gain side near the reference point in the classic prospect-theory account {{src:kahneman-tversky-1979}}.",
        "A person then evaluates the options using both the subjective value of outcomes and, in prospect theory, decision weights applied to probabilities. Risk preference is not determined by loss aversion alone.",
        "Observed resistance to change can also result from effort, switching costs, habit, uncertainty or commitment. Those mechanisms must be investigated rather than labelled loss aversion automatically {{src:tversky-kahneman-1991}}."
      ],
      implementation: [
        "Identify the user's plausible reference point before interpreting a behaviour. Ask what they believe they currently have, what they expect to keep and what they think will change.",
        "When changing a product or service, state both what improves and what is removed, and make migration, export or rollback options visible.",
        "Do not infer loss aversion from a low cancellation rate, a high default retention rate or a low take-up rate; measure perceived losses and alternative explanations.",
        "For a pricing or feature experiment, keep total cost and service level explicit. Compare the same facts in both variants and examine understanding, regret and retention alongside conversion.",
        "Avoid manufactured losses, countdowns, disappearing progress or threatening copy used solely to create pressure. Give the user time and control to decide.",
        "Where a change is reversible, explain how to reverse it. Reversibility reduces the real stakes rather than merely reframing them."
      ],
      scenarios: [
        "A design tool removes a legacy feature. Users may value the feature as an existing entitlement; explain the replacement, provide export or a migration period, and measure task success rather than interpreting every complaint as bias.",
        "A bank changes a savings interface. An account holder may focus on the rate they would lose, but the decision also depends on withdrawal limits, guarantees, switching effort and the time horizon. Present those factors together.",
        "A learning platform considers a 'streak at risk' reminder. The reminder may exploit anticipated loss; test whether it supports the learner's own goal or creates guilt and compulsive checking."
      ]
    },
    advanced: {
      explanation: [
        "A loss-aversion coefficient usually appears as lambda (λ) in a specified reference-dependent value function. It compares the marginal weight of losses with gains under that model. It cannot be interpreted independently of the model's reference point, outcome scale, probability treatment, elicitation method and incentive structure {{src:tversky-kahneman-1992}}.",
        "Brown, Imai, Vieider and Camerer (2024) synthesised 607 empirical estimates from 150 articles across several disciplines. Their abstract reports a mean coefficient of 1.955 with a 95% interval [1.820, 2.102]. This broad synthesis describes reported estimates across many study designs; it is not a universal parameter for every individual or interface decision {{src:brown-et-al-2024}}.",
        "Walasek, Mullett and Stewart (2024) focused more narrowly on estimates of λ from risky-choice data. Their random-effects synthesis of 19 datasets from 17 published studies estimated 1.31 (95% CI [1.10, 1.53]) with very high heterogeneity (I² = 91.60%). In 12 of 19 datasets the interval included loss neutrality; in six it included the original λ = 2.25 estimate. Variation in incentive structures, elicitation and model specification limits a precise population estimate {{src:walasek-mullett-stewart-2024}}.",
        "The interpretation is actively debated. Gal and Rucker (2018) challenge the broad claim that losses are generally more impactful than gains, arguing that apparent loss aversion can depend on context, comparison and measurement. This critique does not erase the prospect-theory evidence; it warns against treating a model property as a universal psychological law {{src:gal-rucker-2018}}."
      ],
      evidence: [
        "Original prospect theory introduced a reference-dependent value function with a steeper loss side; the paper's model and experiments establish the foundational account {{src:kahneman-tversky-1979}}.",
        "The 1991 reference-dependent model separates reference dependence, loss aversion and diminishing sensitivity, and discusses how status-quo patterns can arise from other costs too {{src:tversky-kahneman-1991}}.",
        "The broad 2024 meta-analysis reports a mean coefficient of 1.955 from 607 estimates, but its broad inclusion scope spans disciplines and tasks {{src:brown-et-al-2024}}.",
        "The narrower risky-context meta-analysis reports a pooled λ of 1.31 with high heterogeneity and wide variation across available datasets {{src:walasek-mullett-stewart-2024}}."
      ],
      debates: [
        "**Generality and measurement.** Gal and Rucker (2018) question whether loss aversion is as general as often claimed. Different tasks may measure different combinations of reference dependence, status-quo preference, transaction costs and loss weighting {{src:gal-rucker-2018}}.",
        "**Coefficient is not a universal constant.** Broad cross-disciplinary estimates and narrowly defined risky-choice estimates answer different questions. A single pooled λ should not be used as a design constant or a personality score {{src:brown-et-al-2024}} {{src:walasek-mullett-stewart-2024}}.",
        "**Status quo has multiple causes.** Tversky and Kahneman note that thinking costs, transaction costs and psychological commitment can create resistance to change even without loss aversion. Product teams should diagnose these mechanisms separately {{src:tversky-kahneman-1991}}."
      ],
      alternativeModels: [
        "**Diminishing sensitivity** explains the curvature within gains and within losses; it is not the same property as the difference in slope across the reference point {{src:tversky-kahneman-1991}}.",
        "**Query theory** offers a process account in which attention and memory retrieval shape constructed preferences. It may explain some reference-dependent choice patterns without treating a single loss-weight parameter as a complete psychological mechanism {{src:composito-et-al-2025}}."
      ]
    }
  },
  origin: {
    contributors: ["Daniel Kahneman", "Amos Tversky"],
    period: "1979 prospect theory; reference-dependent model developed in 1991 and cumulative form in 1992",
    problem: "Expected-utility models did not adequately describe systematic choice patterns around gains, losses and reference points. Prospect theory introduced a value function over changes from a reference point and a separate treatment of probability weights.",
    narrative: [
      "Kahneman and Tversky's 1979 paper introduced prospect theory and described a value function that differs for gains and losses relative to a reference point {{src:kahneman-tversky-1979}}.",
      "Tversky and Kahneman's 1991 model examined loss aversion in riskless choice and distinguished it from reference dependence and diminishing sensitivity {{src:tversky-kahneman-1991}}.",
      "Their 1992 cumulative prospect theory extended the framework to uncertain prospects and formalised the model's treatment of gains, losses and probability weights {{src:tversky-kahneman-1992}}."
    ],
    attributionNote: "The phrase 'losses hurt twice as much' is a popular simplification, not a universal numerical claim established for all people and contexts."
  },
  application: {
    summary: [
      "Loss aversion is useful as one possible explanation for how users evaluate change around a reference point. It should be used as a hypothesis to test, not as a diagnosis based on clicks or retention."
    ],
    web: [
      "Subscription changes: explain which features, benefits and prices change; keep the cancellation or downgrade route clear.",
      "Migration flows: preserve access to user-created work and offer export, rollback or a clear transition period.",
      "Pricing: display the full cost and what is gained or lost over the same time horizon."
    ],
    mobile: [
      "Before deleting content or resetting progress, show exactly what will be removed and offer a recovery period where feasible.",
      "Do not rely on streak-loss messages or guilt cues to compel daily engagement."
    ],
    enterprise: [
      "When replacing a familiar workflow, identify real switching costs, training needs and data migration risks instead of calling resistance a bias.",
      "In procurement comparisons, disclose switching costs and service trade-offs on both sides of the reference point."
    ],
    services: [
      "When public services change eligibility or benefits, explain the baseline, the actual change, appeal routes and exceptions in plain language."
    ],
    steps: [
      "Define the user's likely reference point and the actual objective change.",
      "List real losses, gains, switching costs, effort and uncertainty separately.",
      "Check whether the observed behaviour can be explained without loss aversion.",
      "Test equivalent, transparent descriptions and include a manipulation check for perceived gains and losses.",
      "Measure comprehension, task outcomes, reversals, regret and fairness as well as the immediate action rate.",
      "Keep changes reversible where possible and never manufacture a threat of loss."
    ]
  },
  whenToUse: [
    "As a hypothesis when users resist a change that removes a familiar feature, benefit, entitlement or accumulated investment.",
    "When evaluating pricing, switching and migration decisions that are judged against a current state or expectation.",
    "When reviewing engagement patterns that may rely on threatened loss, streaks or the fear of losing progress."
  ],
  whenNotToUse: [
    "Do not explain every preference for the current state as loss aversion; effort, transaction costs, uncertainty and commitment are alternatives.",
    "Do not assume a universal coefficient such as 2 or use it to predict an individual user's behaviour.",
    "Do not use loss framing to create artificial scarcity, guilt, coercive cancellation obstacles or fear of losing user-created work."
  ],
  advantages: [
    "Makes the reference point explicit when analysing decisions about change.",
    "Connects behavioural evidence to practical design questions about reversibility, migration, pricing and user control."
  ],
  limitations: [
    "The size of loss aversion varies by task, model, outcome and sample; published meta-analyses do not support one universal value.",
    "Risky-choice estimates may not generalise to riskless choices, consumer interfaces or everyday product decisions.",
    "Observed status-quo preference can arise from effort, transaction costs, habit, uncertainty or commitment rather than loss aversion."
  ],
  misconceptions: [
    {
      myth: "Losses are always exactly twice as powerful as equivalent gains.",
      reality: "The ratio is not a universal constant. Estimates depend on the task and model; recent meta-analyses report different pooled values and substantial heterogeneity {{src:brown-et-al-2024}} {{src:walasek-mullett-stewart-2024}}."
    },
    {
      myth: "Loss aversion is the same as risk aversion.",
      reality: "Risk aversion is a preference over uncertain outcomes; loss aversion is an asymmetry in value for gains and losses around a reference point. Prospect theory can produce different risk attitudes in gains and losses through both value curvature and probability weighting {{src:kahneman-tversky-1979}}."
    },
    {
      myth: "People who stay with a default must be loss averse.",
      reality: "Inaction can reflect effort, transaction costs, endorsement, habit or commitment. The 1991 model explicitly notes that status-quo patterns can arise without loss aversion {{src:tversky-kahneman-1991}}."
    }
  ],
  relations: [
    { target: "framing-effect", type: "related-to", note: "Gain and loss frames can shift the reference point through which the same outcomes are evaluated, although framing effects have several other mechanisms." },
    { target: "anchoring-effect", type: "related-to", note: "An anchor can supply a starting reference for an estimate, whereas loss aversion concerns the unequal subjective weighting of gains and losses around a reference point." },
    { target: "default-effect", type: "related-to", note: "A default can become a reference point and make giving it up feel like a loss, but effort and implied endorsement can also explain default retention." },
    { target: "endowment-effect", type: "related-to", note: "The endowment effect is often linked to reference-dependent valuation, but ownership and transaction procedures also matter." },
    { target: "status-quo-bias", type: "related-to", note: "Loss aversion can contribute to a preference for the current state, but status-quo bias also has effort and transaction-cost explanations." },
    { target: "product-design", type: "applied-in", note: "Product changes, feature removals, migration and pricing decisions can create gains and losses relative to user expectations." }
  ],
  exercises: [
    {
      id: "loss-aversion-ex-reference",
      kind: "scenario",
      level: "beginner",
      title: "Find the reference point",
      prompt: [
        "A learner has 420 course points. A new assessment can add 40 points or remove 40 points from that total.",
        "Write one sentence describing the outcome as a gain and one as a loss. Then identify what the reference point is in each description and explain why the final total alone does not tell you how the change will be evaluated."
      ],
      deliverable: "A two-row gain/loss table with the reference point named.",
      criteria: ["Identifies the baseline", "Uses the same objective amount in both descriptions", "Does not infer that all people will react identically"]
    },
    {
      id: "loss-aversion-ex-diagnosis",
      kind: "critique",
      level: "intermediate",
      title: "Avoid a premature bias diagnosis",
      prompt: [
        "A software team removes a legacy export format. Customers resist the change and support tickets increase.",
        "List at least four explanations other than loss aversion, then design a short research plan to distinguish real switching costs from reference-dependent valuation."
      ],
      deliverable: "A hypothesis table and a three-step research plan.",
      criteria: ["Includes transaction cost, learning cost and uncertainty", "Identifies the reference point", "Proposes measures beyond a retention rate"]
    },
    {
      id: "loss-aversion-ex-ethical",
      kind: "assignment",
      level: "advanced",
      title: "Audit a loss-based engagement pattern",
      prompt: [
        "A learning app sends a push notification saying, 'Your 18-day streak will disappear unless you finish one lesson tonight.'",
        "Assess whether the notification supports the learner's own goal or creates pressure. Redesign the message and the control settings so the user can make an informed choice without losing their work."
      ],
      deliverable: "An ethical-design critique and revised notification flow.",
      criteria: ["Separates the learner's goal from the business goal", "Offers snooze or disable controls", "Does not threaten the loss of actual work", "Evaluates return behaviour and learner wellbeing rather than opens alone"]
    }
  ],
  quiz: [
    {
      id: "loss-aversion-q-definition",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which statement best defines loss aversion?",
      options: [
        { text: "A loss relative to a reference point is often weighted more heavily than an equivalent gain.", correct: true, explanation: "This captures the gain/loss asymmetry around a reference point." },
        { text: "People always avoid every uncertain outcome.", correct: false, explanation: "That describes an overgeneralised form of risk aversion, not loss aversion." },
        { text: "The value of every additional pound is constant at every wealth level.", correct: false, explanation: "This ignores reference dependence and diminishing sensitivity." },
        { text: "People never change a current setting.", correct: false, explanation: "Status-quo preference can have several causes and is not the definition of loss aversion." }
      ],
      explanation: "Loss aversion is about the relative value assigned to losses and gains around a reference point."
    },
    {
      id: "loss-aversion-q-distinction",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which distinction between loss aversion and diminishing sensitivity is correct?",
      options: [
        { text: "Loss aversion is the asymmetry across gains and losses; diminishing sensitivity is curvature within the gain or loss side.", correct: true, explanation: "The 1991 reference-dependent model treats these as separate properties." },
        { text: "They are two names for the same slope difference.", correct: false, explanation: "One concerns asymmetry across the reference point; the other concerns curvature within a side." },
        { text: "Diminishing sensitivity means every loss is smaller than every gain.", correct: false, explanation: "It does not compare a loss with a gain." },
        { text: "Loss aversion is a measure of how many risks a person accepts.", correct: false, explanation: "That confuses loss weighting with risk preference." }
      ],
      explanation: "Reference dependence, loss aversion and diminishing sensitivity should be explained separately."
    },
    {
      id: "loss-aversion-q-meta",
      kind: "scenario",
      level: "advanced",
      prompt: "A report quotes a loss-aversion coefficient of 1.955 and says every user values losses at almost twice the value of gains. What is the best critique?",
      options: [
        { text: "The estimate is a pooled result from one broad meta-analysis; it is not a universal individual-level constant and differs from narrower risky-choice estimates.", correct: true, explanation: "Different task scopes and model specifications produce different pooled values and high heterogeneity." },
        { text: "The result means that all users have the same loss sensitivity.", correct: false, explanation: "A mean does not describe every individual and the literature reports substantial variation." },
        { text: "The result means people are always risk averse when losing money.", correct: false, explanation: "Risk attitude also depends on value curvature, probabilities and the decision context." },
        { text: "A coefficient below 2 proves that loss aversion does not exist.", correct: false, explanation: "The coefficient is not a binary test and neutrality is approximately 1 in the specified model." }
      ],
      explanation: "Interpret a coefficient together with its model, sample and elicitation method."
    },
    {
      id: "loss-aversion-q-ux",
      kind: "critique",
      level: "advanced",
      prompt: "A product team sees that very few users cancel a subscription and concludes that users are loss averse. What evidence should it gather first?",
      options: [
        { text: "Investigate cancellation effort, information, switching costs, alternatives, expectations and perceived losses.", correct: true, explanation: "Retention alone cannot identify the psychological mechanism." },
        { text: "Increase the size of the cancellation button until the retention rate changes.", correct: false, explanation: "That changes friction and does not diagnose why users stay." },
        { text: "Assume the default is a loss-aversion reference point for everyone.", correct: false, explanation: "Defaults can operate through effort or implied endorsement and users differ." },
        { text: "Use the 1.955 meta-analytic coefficient to predict each customer's choice.", correct: false, explanation: "A pooled estimate is not an individual prediction or product-specific calibration." }
      ],
      explanation: "Treat loss aversion as a testable explanation, not a label assigned to retention."
    }
  ],
  flashcards: [
    { id: "loss-aversion-fc-1", front: "What is the reference point?", back: "The baseline against which an outcome is evaluated as a gain or a loss." },
    { id: "loss-aversion-fc-2", front: "Loss aversion versus risk aversion", back: "Loss aversion is a gain/loss value asymmetry around a reference point; risk aversion is a preference over uncertain outcomes." },
    { id: "loss-aversion-fc-3", front: "Loss aversion versus diminishing sensitivity", back: "Loss aversion compares the loss and gain sides; diminishing sensitivity describes curvature within each side." },
    { id: "loss-aversion-fc-4", front: "Why is λ not a universal constant?", back: "Its estimate depends on the choice task, reference point, incentives, elicitation method and model specification." }
  ],
  references: [
    { source: "kahneman-tversky-1979", role: "primary", note: "Foundational prospect-theory value function and reference-dependent gain/loss evaluation; full text reviewed; Crossref matched." },
    { source: "tversky-kahneman-1991", role: "primary", note: "Reference-dependent model; full text reviewed, including distinction between loss aversion, reference dependence and diminishing sensitivity." },
    { source: "tversky-kahneman-1992", role: "primary", note: "Cumulative prospect theory and formal treatment of losses, gains and probability weighting; publisher record and abstract reviewed." },
    { source: "brown-et-al-2024", role: "primary", note: "Broad meta-analysis of 607 empirical estimates; publisher abstract reviewed; full text not read in this session." },
    { source: "walasek-mullett-stewart-2024", role: "primary", note: "Risky-choice meta-analysis of 19 datasets; full open-access article reviewed." },
    { source: "gal-rucker-2018", role: "primary", note: "Critical review of generality of loss aversion; abstract and bibliographic record reviewed." },
    { source: "composito-et-al-2025", role: "explanatory", note: "Query-theory process account and meta-analysis; publisher HTML and results reviewed." }
  ],
  evidence: "contested",
  evidenceNote:
    "Reference-dependent loss weighting is a foundational prospect-theory claim, but generality and magnitude are contested. A broad cross-disciplinary meta-analysis reports a mean coefficient near 1.96, while a narrower risky-choice synthesis reports about 1.31 with very high heterogeneity; neither should be presented as a universal human constant. The 1991 model also notes that status-quo preference can arise from thinking costs, transaction costs and commitment without loss aversion.",
  status: "drafted",
  quality: {
    classification: true, explanation: true, research: true, beginner: true, professional: true,
    examples: true, limitations: true, relationships: true, sources: true, activities: true
  },
  lastVerifiedAt: "2026-11-23"
});
