import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "framing-effect",
  slug: "framing-effect",
  title: "Framing Effect",
  alternateNames: ["Decision framing", "Frame effect", "Valence framing"],
  summary:
    "A change in how equivalent options are described can change judgement or choice. Risky-choice, attribute and goal framing are distinct effects with different mechanisms and evidence.",
  definition:
    "A **framing effect** occurs when a decision-maker's judgement or preference changes because the same relevant options, outcomes or consequences are represented differently. In the classic risky-choice case, logically equivalent outcomes described as gains or losses can produce different risk preferences. The term also covers attribute framing and goal framing, which involve different tasks and should not be treated as one interchangeable effect {{src:tversky-kahneman-1981}} {{src:levin-schneider-gaeth-1998}}.",
  primaryType: "cognitive-bias",
  secondaryTypes: ["concept"],
  domain: "laws-effects",
  subcategory: "decision-biases",
  tags: ["decision-making", "choice architecture", "language", "risk communication", "prospect theory", "microcopy"],
  difficulty: "intermediate",
  disciplines: ["Decision psychology", "Behavioural economics", "Communication", "Interaction design", "UX writing"],
  learningObjectives: [
    "Define a decision frame and explain why logically equivalent descriptions should preserve the underlying options and outcomes.",
    "Distinguish risky-choice framing, attribute framing and goal framing, including the different judgements each typically measures.",
    "Reconstruct the classic gain/loss life-outcome problem and explain its between-group design without confusing the outcome probabilities with the observed choice percentages.",
    "Design and evaluate a fair interface-framing test that measures comprehension and decision quality as well as conversion."
  ],
  prerequisites: [],
  levels: {
    beginner: {
      explanation: [
        "The words around a choice can change how the choice feels. A message that says **90% of people succeed** may feel different from one that says **10% do not succeed**, even though the numbers describe the same result. When the options or facts stay equivalent but the description changes judgement or choice, researchers call this a framing effect.",
        "A frame is the way a decision is presented: which outcomes are named, what reference point is made salient, and which consequences are described first. A frame can change what people notice or think about; it does not necessarily change the underlying facts.",
        "Framing is not one single trick. Researchers distinguish risky-choice frames (gain versus loss descriptions of the same gamble), attribute frames (a positive or negative description of one attribute), and goal frames (emphasising the benefit of acting or the cost of not acting). These are related research families, not three names for the same experiment {{src:levin-schneider-gaeth-1998}}."
      ],
      analogy:
        "Two windows can look onto the same room but show different parts of it. The room has not changed; the view has. A decision frame is the window through which a person first sees the choice.",
      everydayExamples: [
        "A product states that a battery keeps 90% of its capacity after a year, rather than saying it loses 10%.",
        "A health reminder says that attending a screening helps detect a condition early, or that missing it can delay detection.",
        "A pricing page emphasises a monthly saving or the amount still payable."
      ],
      vocabulary: [
        { term: "Decision frame", meaning: "A decision-maker's representation of the available acts, outcomes and contingencies." },
        { term: "Description invariance", meaning: "The normative expectation that logically equivalent descriptions should not change a rational preference." },
        { term: "Risky-choice framing", meaning: "A gain/loss description of equivalent risky options that can shift risk preference." },
        { term: "Attribute framing", meaning: "A positive or negative description of one attribute, often changing evaluation of an object." },
        { term: "Goal framing", meaning: "A message that emphasises either the benefits of taking an action or the costs of not taking it." }
      ]
    },
    intermediate: {
      explanation: [
        "Tversky and Kahneman's (1981) life-outcome problem is the best-known risky-choice example. One group considered a programme expected to save 200 of 600 people for certain, or a gamble with a one-third chance of saving all 600 and a two-thirds chance of saving none. A separate group saw the equivalent loss description: 400 people die for certain, or a one-third chance that nobody dies and a two-thirds chance that all 600 die {{src:tversky-kahneman-1981}}.",
        "In the original samples, 72% of the gain-framed group chose the sure option, while 78% of the loss-framed group chose the gamble. Those percentages are **choice rates**, not the probabilities inside the options. The gain and loss versions were presented to separate groups (N = 152 and N = 155), not as a before-and-after change within the same people {{src:tversky-kahneman-1981}}.",
        "The three framing types ask different questions. Risky-choice framing tests willingness to accept a gamble. Attribute framing tests how a positively or negatively worded attribute changes an evaluation, such as judging meat labelled 75% lean versus 25% fat. Goal framing tests whether emphasising the benefits of acting or the costs of not acting changes a response, such as attending a health check. Levin, Schneider and Gaeth (1998) separated these types because they can involve different psychological processes and outcomes {{src:levin-schneider-gaeth-1998}}.",
        "A frame is only a strict equivalence test when the information is the same in substance: options, outcome amounts, probabilities, timing, eligibility and costs must be preserved. If one version adds a benefit, hides a fee or changes which fact is prominent, the manipulation is not simply a wording-only frame."
      ],
      howItWorks: [
        "A description establishes a reference point and makes some aspects of the outcomes more accessible than others. In prospect theory, outcomes are evaluated as gains or losses relative to a reference point; this can help explain risky-choice framing, but it is not a complete account of every framing effect {{src:kahneman-tversky-1979}} {{src:tversky-kahneman-1992}}.",
        "The wording and order of information can also affect which thoughts a person retrieves first. Query theory models preference construction as a sequence of memory queries; a 2025 meta-analysis found a small effect of decision frame on query order across its included studies {{src:composito-et-al-2025}}.",
        "The same person may also interpret a frame through prior knowledge, trust, numeracy, goals, culture, emotional state and the interface context. These factors can moderate an effect, so a result in one task does not guarantee the same result in another."
      ],
      implementation: [
        "For a wording test, write down the actual outcomes, probabilities, costs, timing and eligibility before drafting the two versions. Verify that these are equivalent.",
        "Classify the manipulation first: risky-choice, attribute or goal framing. Do not call a change in salience or information order a strict equivalent frame unless the underlying information is preserved.",
        "Keep material facts equally available. Do not place the unfavourable condition in fine print or make the alternative harder to inspect.",
        "Measure comprehension and recall of the underlying quantities. Ask participants to restate the options so you can tell whether a frame changed understanding rather than preference alone.",
        "Use outcome measures that reflect the user's interest: decision quality, calibrated confidence, perceived fairness, later regret and task completion. Conversion alone cannot establish that the frame helped the user.",
        "Test important frames with relevant user groups. Avoid assuming that a statistically detectable average effect applies equally to every audience or context."
      ],
      scenarios: [
        "An energy dashboard describes a plan as 'save up to £120 a year' in one variant and 'pay up to £120 more a year' in another. Before testing, confirm that the comparison baseline, usage assumptions and eligibility are identical.",
        "A health service tests a message about the benefit of booking a screening against a message about the cost of delaying it. This is goal framing, not the classic risky-choice task; assess comprehension, anxiety and informed uptake.",
        "A finance app describes an investment as 'a 70% chance of meeting the target' or 'a 30% chance of falling short'. The interface should also disclose the same absolute target, time horizon and uncertainty in both variants."
      ]
    },
    advanced: {
      explanation: [
        "Framing research is heterogeneous. A synthesis of risky-choice studies by Kühberger (1998) drew on 136 empirical papers, nearly 30,000 participants and 230 effect sizes. It found a framing effect overall, but the magnitude varied with study design, including the way the frame was manipulated and whether the outcome was a choice or a judgement {{src:kuhberger-1998-framing}}.",
        "Levin, Schneider and Gaeth's typology is an important classification safeguard: risky-choice, attribute and goal framing differ in task structure and likely process. A meta-analysis of risky-choice frames should not be used as a universal estimate for attribute wording or persuasive goal messages {{src:levin-schneider-gaeth-1998}}.",
        "Kühberger's 2023 systematic review places risky-choice framing within a broader family of designs and theories. It cautions against treating a framing effect as automatic proof of irrationality: description invariance is a useful benchmark, but context and cognitive processing help determine what a frame communicates {{src:kuhberger-2023-framing-review}}.",
        "Composto and colleagues' 2025 meta-analysis examined query theory as a process account. Across 27 papers reviewed, its query-order analysis included 33 effect sizes from 29 studies and 25 papers (N = 11,202), finding a small frame effect on query order (d = 0.34, 95% CI [0.27, 0.41]). The authors report partial mediation through query order and content; this supports one process account in the tested domains, not a universal mechanism for all frames {{src:composito-et-al-2025}}."
      ],
      evidence: [
        "The original risky-choice demonstration showed different risk preferences under logically equivalent gain and loss descriptions, using separate participant groups {{src:tversky-kahneman-1981}}.",
        "The 1998 meta-analysis found an overall framing effect in risky-choice studies, while documenting meaningful variation across study designs and outcome measures {{src:kuhberger-1998-framing}}.",
        "The 2025 query-theory meta-analysis found a small frame effect on query order and evidence consistent with partial mediation in the included tasks; it does not establish query theory as the sole mechanism {{src:composito-et-al-2025}}."
      ],
      debates: [
        "**Normative benchmark versus real communication.** Equivalent descriptions should not change preferences under description invariance, but many real messages are not equivalent: the frame can reveal a meaningful reference point or make a neglected consequence understandable. Researchers must distinguish a genuine preference reversal from a useful correction in attention.",
        "**Mechanism is plural.** Prospect theory, query theory, memory accessibility, affect and social interpretation can explain different parts of framing. Evidence for one account in a particular paradigm does not establish it as the mechanism for all framing effects.",
        "**Effect sizes are design-dependent.** Risky-choice meta-analyses combine different tasks, frames and response formats. A pooled effect should be read alongside the study's operational definition and the outcome it measured."
      ],
      alternativeModels: [
        "**Prospect theory** explains gain/loss risky-choice patterns using reference-dependent value and probability weighting; it is particularly relevant when outcomes are encoded relative to a reference point {{src:kahneman-tversky-1979}}.",
        "**Query theory** explains some framing effects through the order and content of memory queries that construct preferences; the 2025 synthesis provides evidence for this process account in the tasks it reviewed {{src:composito-et-al-2025}}."
      ]
    }
  },
  origin: {
    contributors: ["Amos Tversky", "Daniel Kahneman", "Irwin P. Levin", "Sandra L. Schneider", "Gary J. Gaeth"],
    period: "1981 onward; typology consolidated in 1998",
    problem: "Decision theory expects equivalent descriptions to preserve choice, yet experiments found that describing the same outcomes as gains or losses could shift preferences. Later work separated different framing paradigms so they would not be treated as one effect.",
    narrative: [
      "Tversky and Kahneman's 1981 paper described decision frames and demonstrated preference shifts across equivalent risky-choice problems {{src:tversky-kahneman-1981}}.",
      "Levin, Schneider and Gaeth's 1998 paper separated risky-choice, attribute and goal framing, arguing that different operational definitions can tap different processes {{src:levin-schneider-gaeth-1998}}.",
      "Later work investigated process accounts such as query theory, which links framing to attention and memory retrieval during preference construction {{src:composito-et-al-2025}}."
    ],
    attributionNote: "The phrase 'framing effect' covers several related paradigms. The 1981 risky-choice demonstration should not be presented as the origin of attribute and goal framing research."
  },
  application: {
    summary: [
      "Use framing research to make consequential information understandable and to test whether alternative descriptions change judgement. Use it to improve decision quality, not to conceal disadvantages or steer people against their interests."
    ],
    web: [
      "Pricing and checkout: disclose the same total price, recurring cost, fees and comparison baseline regardless of whether savings or costs are emphasised.",
      "Risk and performance dashboards: pair percentages with absolute counts, denominators, time windows and uncertainty.",
      "Consent and privacy: do not rely on positive wording to obscure what data are collected or how they are used."
    ],
    mobile: [
      "Keep gain/loss descriptions and their denominators visible at the point of decision; avoid forcing users to switch screens to compare equivalent information.",
      "Use concise labels, but make the full consequence and the alternative available before confirmation."
    ],
    enterprise: [
      "Procurement and analytics tools: preserve the same cost horizon, assumptions and risk distribution across comparison views.",
      "Internal performance communications: distinguish a genuine change in the underlying metric from a change in the way the metric is presented."
    ],
    services: [
      "Public health and financial services: evaluate benefit-focused and cost-focused messages for understanding, anxiety, fairness and informed action; protect the option to decline."
    ],
    steps: [
      "State the user decision and the information that must remain constant.",
      "Classify the frame as risky-choice, attribute or goal framing.",
      "Write both variants and map each sentence to the same underlying facts, outcomes and contingencies.",
      "Pilot-test whether participants understand the options and can recall the key quantities.",
      "Run a controlled test with a relevant sample and pre-specified user-centred outcomes.",
      "Choose the version that best supports informed, fair decisions, not simply the one with the highest click-through or conversion."
    ]
  },
  whenToUse: [
    "When reviewing gain/loss wording, risk disclosures, pricing comparisons or messages about the consequences of action and inaction.",
    "When a team suspects that the representation of a decision is influencing preference or comprehension.",
    "When testing whether alternative descriptions improve understanding without changing the underlying facts."
  ],
  whenNotToUse: [
    "Do not use framing as a synonym for any persuasive copy, visual hierarchy or information-order change.",
    "Do not claim a strict framing effect when the variants differ in actual costs, probabilities, timing, eligibility or available information.",
    "Do not use loss or fear frames to hide material facts, manufacture urgency or undermine informed consent."
  ],
  advantages: [
    "Makes the representation of a choice an explicit part of UX research and design.",
    "Encourages teams to check equivalence, disclosure and comprehension rather than relying on copy intuition."
  ],
  limitations: [
    "Different framing paradigms have different mechanisms and outcomes; a result from risky choice cannot automatically be generalised to attribute or goal framing.",
    "Effects vary by task, sample, context and response measure; a pooled mean is not an individual prediction.",
    "An observed preference difference may reflect improved understanding or a meaningful reference point rather than an irrational bias."
  ],
  misconceptions: [
    {
      myth: "The framing effect means any positive wording will persuade people more.",
      reality: "Framing research concerns specified manipulations and outcomes. Risky-choice, attribute and goal framing are distinct paradigms, and effects vary with the task {{src:levin-schneider-gaeth-1998}}."
    },
    {
      myth: "The Asian disease experiment showed the same people changing their minds when wording changed.",
      reality: "The gain and loss versions were presented to separate groups. The observed percentages compare different groups, not a within-person reversal {{src:tversky-kahneman-1981}}."
    },
    {
      myth: "A framing effect proves that the person made an irrational choice.",
      reality: "Description invariance is a normative benchmark, but the practical meaning of a frame depends on whether the descriptions are truly equivalent and what information each makes available."
    }
  ],
  relations: [
    { target: "loss-aversion", type: "related-to", note: "Prospect theory uses reference-dependent value and loss aversion to explain important risky-choice framing patterns, though framing has several other mechanisms." },
    { target: "default-effect", type: "related-to", note: "A preselected option can establish a reference point and frame the decision, while the default effect also has effort and endorsement mechanisms." },
    { target: "choice-overload", type: "related-to", note: "Both affect choice architecture, but framing concerns representation while choice overload concerns the burden of a choice set." },
    { target: "ux-writing", type: "applied-in", note: "Interface wording can express gain, loss, attribute and goal frames; ethical UX writing must preserve material facts and user control." },
    { target: "confirmation-bias", type: "related-to", note: "A frame can make frame-consistent information more accessible, while confirmation bias concerns seeking or interpreting evidence in line with prior beliefs." }
  ],
  exercises: [
    {
      id: "framing-effect-ex-equivalence",
      kind: "critique",
      level: "beginner",
      title: "Check whether two messages are equivalent",
      prompt: [
        "A subscription page has two headlines: Variant A says, 'Save £48 over a year'; Variant B says, 'Pay £4 more each month'. The page also shows a different plan duration in Variant B.",
        "Identify which parts are not equivalent and rewrite the test so the only intended change is the frame."
      ],
      deliverable: "A two-column equivalence table and corrected copy.",
      criteria: ["Identifies the different time horizon", "Preserves the same baseline, amount and eligibility", "Separates wording from a real price or plan change"]
    },
    {
      id: "framing-effect-ex-types",
      kind: "scenario",
      level: "intermediate",
      title: "Classify three framing tests",
      prompt: [
        "Classify each test: (1) 90% lean versus 10% fat; (2) 200 lives saved for sure versus an equivalent gamble; (3) emphasise the benefit of attending a check-up versus the cost of missing it.",
        "For each, name the outcome researchers would measure and explain why a risky-choice framing result should not be used as the effect-size estimate for all three."
      ],
      deliverable: "A three-row classification table with one outcome measure per row.",
      criteria: ["Correctly classifies risky-choice, attribute and goal framing", "Names a suitable outcome for each", "Explains why the paradigms are not interchangeable"]
    },
    {
      id: "framing-effect-ex-test",
      kind: "assignment",
      level: "advanced",
      title: "Design a fair interface-framing experiment",
      prompt: [
        "A financial service wants to compare '70% chance of reaching your target' with '30% chance of falling short'. Design a controlled study that preserves the underlying outcomes and measures both user understanding and decision quality.",
        "Specify the randomisation unit, primary and secondary measures, sample segments, manipulation check, safeguards and what result would make you reject the higher-conversion version."
      ],
      deliverable: "A one-page experiment protocol.",
      criteria: ["Preserves denominator, horizon, target and eligibility", "Includes comprehension and calibrated confidence", "Includes fairness and user-harm guardrails", "Does not select a winner on conversion alone"]
    }
  ],
  quiz: [
    {
      id: "framing-effect-q-definition",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which situation best illustrates a framing effect?",
      options: [
        { text: "The same treatment result is described as 90% survival or 10% mortality, and evaluations differ.", correct: true, explanation: "The descriptions can represent the same outcome while changing its presentation." },
        { text: "A treatment's actual survival rate rises from 80% to 90%.", correct: false, explanation: "The underlying outcome changed, so this is not just a change in description." },
        { text: "A user sees a new price after a discount expires.", correct: false, explanation: "The actual price changed; the example does not isolate framing." },
        { text: "A user chooses the cheapest of three plans.", correct: false, explanation: "A choice alone does not demonstrate a framing effect." }
      ],
      explanation: "A framing test changes representation while preserving the relevant underlying facts."
    },
    {
      id: "framing-effect-q-types",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "A study compares product ratings for meat labelled '75% lean' versus '25% fat'. Which framing type is this?",
      options: [
        { text: "Attribute framing", correct: true, explanation: "One attribute of an object is described positively or negatively." },
        { text: "Risky-choice framing", correct: false, explanation: "There is no choice between equivalent risky options." },
        { text: "Goal framing", correct: false, explanation: "The message is not comparing the benefits of acting with the costs of not acting." },
        { text: "Default effect", correct: false, explanation: "No option is preselected." }
      ],
      explanation: "The Levin, Schneider and Gaeth typology distinguishes attribute framing from risky-choice and goal framing."
    },
    {
      id: "framing-effect-q-asian-disease",
      kind: "scenario",
      level: "advanced",
      prompt: "In the classic life-outcome problem, what is the correct interpretation of 72% and 78%?",
      options: [
        { text: "They are the proportions choosing the sure gain and the risky loss options in two separate groups.", correct: true, explanation: "The percentages are choice rates from separate gain- and loss-framed samples." },
        { text: "They are the probabilities that the gamble saves 600 people.", correct: false, explanation: "The gamble's stated probability was one-third, not 72% or 78%." },
        { text: "They are the same participants' choices before and after changing the wording.", correct: false, explanation: "The original design compared separate groups." },
        { text: "They show that 72% of all people are risk averse and 78% are risk seeking.", correct: false, explanation: "The percentages describe choices in this experiment, not population traits." }
      ],
      explanation: "Keep choice proportions separate from the probabilities and outcomes inside each option."
    },
    {
      id: "framing-effect-q-ethics",
      kind: "critique",
      level: "advanced",
      prompt: "A checkout experiment shows that loss-framed copy increases conversion but also reduces accurate recall of recurring fees. What should the team do?",
      options: [
        { text: "Reject the version until users can accurately understand the same material fees and consequences.", correct: true, explanation: "A conversion increase does not justify worse comprehension of material terms." },
        { text: "Ship the version because conversion is the primary business metric.", correct: false, explanation: "This ignores a material user-understanding harm." },
        { text: "Hide the fee behind a help link so the frame stays persuasive.", correct: false, explanation: "That conceals material information and undermines informed choice." },
        { text: "Call the result a successful risky-choice framing effect.", correct: false, explanation: "The task is not necessarily a risky-choice paradigm, and the outcome is not a valid proof of user benefit." }
      ],
      explanation: "Evaluate informed understanding and fairness, not only the action rate."
    }
  ],
  flashcards: [
    { id: "framing-effect-fc-1", front: "What is a decision frame?", back: "A decision-maker's conception of the acts, outcomes and contingencies in a choice." },
    { id: "framing-effect-fc-2", front: "Three framing types", back: "Risky-choice framing, attribute framing and goal framing." },
    { id: "framing-effect-fc-3", front: "What must remain constant in an equivalence test?", back: "Options, outcomes, probabilities, timing, costs, eligibility and material information." },
    { id: "framing-effect-fc-4", front: "Asian disease study: what do 72% and 78% represent?", back: "Choice proportions in two separate samples, not gamble probabilities or a within-person reversal." }
  ],
  references: [
    { source: "tversky-kahneman-1981", role: "primary", note: "Original decision-frame definition and gain/loss risky-choice experiments; full text reviewed." },
    { source: "levin-schneider-gaeth-1998", role: "primary", note: "Typology separating risky-choice, attribute and goal framing; abstract and bibliographic record reviewed." },
    { source: "kuhberger-1998-framing", role: "primary", note: "Meta-analysis of risky-choice framing; abstract and bibliographic record reviewed." },
    { source: "kuhberger-2023-framing-review", role: "primary", note: "Systematic review of risky-choice framing effects; abstract and journal record reviewed." },
    { source: "kahneman-tversky-1979", role: "primary", note: "Prospect-theory foundation and reference-dependent value; full text reviewed; Crossref metadata matched." },
    { source: "composito-et-al-2025", role: "primary", note: "Open-access query-theory meta-analysis; publisher HTML and reported results reviewed." }
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "Risky-choice framing is supported by classic experiments and meta-analytic evidence, but effects vary by operationalisation, sample and response measure. The 2025 query-theory synthesis supports a process account in the studied decision domains; it does not establish one mechanism for all risky-choice, attribute and goal frames. A framing claim is only an equivalence test when the underlying information is preserved.",
  status: "drafted",
  quality: {
    classification: true, explanation: true, research: true, beginner: true, professional: true,
    examples: true, limitations: true, relationships: true, sources: true, activities: true
  },
  lastVerifiedAt: "2026-11-23"
});
