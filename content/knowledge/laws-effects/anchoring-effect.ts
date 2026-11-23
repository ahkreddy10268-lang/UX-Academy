import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "anchoring-effect",
  slug: "anchoring-effect",
  title: "Anchoring Effect",
  alternateNames: ["Anchoring bias", "Anchoring heuristic", "Numeric anchoring"],
  summary:
    "An initial number can pull a later estimate or valuation toward it, even when the number is weakly relevant or arbitrary. The size and mechanism of the effect vary with the task, anchor type and judgment being made.",
  definition:
    "The **anchoring effect** is the tendency for a numerical judgment or valuation to be influenced by an initial value (the **anchor**) that is considered before the final estimate. In a common experimental design, people first compare a target with a high or low anchor and then give an absolute estimate; the resulting judgments often shift in the direction of the anchor {{src:tversky-kahneman-1974}}. Anchoring is well documented, but it is not one mechanism: insufficient adjustment, selective accessibility and response-scale distortion are among the proposed accounts {{src:epley-gilovich-2006}} {{src:mussweiler-strack-1999}} {{src:frederick-mochon-2012}}.",
  primaryType: "cognitive-bias",
  secondaryTypes: ["concept"],
  domain: "laws-effects",
  subcategory: "decision-biases",
  tags: ["judgment", "decision-making", "numeric judgment", "pricing", "estimation", "choice architecture", "behavioural economics"],
  difficulty: "intermediate",
  disciplines: ["Decision psychology", "Behavioural economics", "Consumer research", "Interaction design", "Product strategy"],
  learningObjectives: [
    "Define an anchor and identify how an initial value can influence a later numerical judgment or valuation.",
    "Distinguish insufficient adjustment, selective accessibility and scale distortion as different proposed explanations for anchoring.",
    "Interpret anchoring evidence across general-knowledge estimates and willingness-to-pay tasks without treating one effect size as universal.",
    "Design a fair interface test that measures anchor relevance, comprehension and user outcomes rather than optimising only for a higher price or conversion."
  ],
  prerequisites: [],
  levels: {
    beginner: {
      explanation: [
        "An **anchor** is a starting value that can influence the number someone gives next. When people are unsure how much something should cost, how long a task will take or how many people might use a feature, the first number they see can pull their estimate toward it.",
        "For example, imagine two groups are asked to estimate the price of the same chair. One group first sees a suggested value of £400; the other sees £900. Even if the suggested numbers are not reliable, the groups may give different estimates. The first number has acted as an anchor.",
        "Anchoring does not mean people copy the first number exactly. They often move away from it, but their final estimate can remain closer to the anchor than it would have been without it. The effect is a tendency, not a guarantee about every person or every task."
      ],
      analogy:
        "A ruler placed beside an object before you estimate its length can become the starting point for your judgment, even if the ruler is the wrong scale. An anchor is a starting reference that can pull the estimate that follows.",
      everydayExamples: [
        "A product page shows a high crossed-out price before the current price, shaping what a shopper thinks is a reasonable amount.",
        "A project estimate begins with an early guess of two weeks, and later estimates cluster around that duration even after new information appears.",
        "A donation form suggests £50 as the first amount, influencing the amounts people consider."
      ],
      vocabulary: [
        { term: "Anchor", meaning: "An initial value that can influence a later estimate or valuation." },
        { term: "Target judgment", meaning: "The estimate, valuation or decision the person is asked to make after encountering an anchor." },
        { term: "High and low anchors", meaning: "Starting values that are deliberately set above or below a comparison value to test whether judgments move with them." },
        { term: "Anchor relevance", meaning: "How closely the starting value relates to the target dimension, task or decision." },
        { term: "Anchoring effect", meaning: "A shift in a judgment toward an initial value, relative to a suitable comparison condition." }
      ]
    },
    intermediate: {
      explanation: [
        "Tversky and Kahneman's (1974) classic demonstration asked people to estimate the percentage of African countries in the United Nations. Before estimating, participants saw a wheel stop at either 10 or 65 and answered whether the true percentage was higher or lower than that number. The median estimates were 25 in the low-anchor group and 45 in the high-anchor group {{src:tversky-kahneman-1974}}.",
        "The wheel number had no valid informational connection to the question. The result showed that the final estimates were not independent of an arbitrary starting value. The two anchor conditions were compared across participant groups; the medians are group summaries, not a claim that every individual shifted by twenty percentage points.",
        "Anchors can be **externally provided** (a price, recommendation or number shown by the interface) or **self-generated** (a starting estimate a person produces from memory or prior experience). These conditions need not operate through the same process. Epley and Gilovich found that people adjusting from self-generated anchors often stop once they reach a plausible value, unless they are willing and able to search further {{src:epley-gilovich-2006}}.",
        "Anchoring appears in many kinds of numerical judgment, but the size is sensitive to the task. Price valuation, factual estimation, negotiation and legal judgment do not necessarily have the same boundary conditions. A result from a general-knowledge question is not a calibration rule for a product's pricing page."
      ],
      howItWorks: [
        "**Insufficient adjustment.** When people generate their own starting value, they may move away from it in small steps and stop when the answer seems plausible. That stopping point can be too close to the starting value {{src:epley-gilovich-2006}}.",
        "**Selective accessibility.** When an external anchor is presented with a comparison question (for example, 'Is the value higher or lower than 80?'), people may test the anchor-consistent possibility and retrieve information that supports it. This can make anchor-consistent knowledge more accessible for the later estimate {{src:mussweiler-strack-1999}}.",
        "**Scale distortion.** An anchor can influence how a response scale is used, not only what a person believes about the target. Frederick and Mochon argue that exposure to a numeric standard can change the way people use that specific scale; the effect may not transfer to other judgments on conceptually related scales {{src:frederick-mochon-2012}}.",
        "These explanations are not interchangeable and may be complementary in some tasks. The literature does not establish one mechanism that explains every anchoring result."
      ],
      implementation: [
        "Identify the anchor before evaluating a number: who introduced it, where it appears, whether it is relevant and what evidence supports it.",
        "For estimates, ask for an independent first judgment before showing a suggested value. Record the assumptions and evidence behind the estimate.",
        "For pricing, disclose the basis of comparison. A previous price, market range or recommended tier should be accurate, current and genuinely comparable.",
        "When testing anchors, randomise the high, low and no-anchor conditions; keep product features, timing, audience and wording otherwise constant.",
        "Measure the user's understanding of the reference value and the quality of the resulting decision. A higher willingness-to-pay or conversion rate is not proof that the anchor helped the user.",
        "Do not infer a psychological bias from a single click, chosen price or estimate. Ask whether the anchor changed the reference point, the information considered or simply the response scale."
      ],
      scenarios: [
        "A project-planning tool pre-fills a delivery estimate of 10 working days. Teams may treat this as the normal duration even when the task is new. Test whether estimates change when the field is blank, and ask teams to explain their assumptions before showing historical benchmarks.",
        "An online shop shows a reference price beside a sale price. The reference is useful only when it is a truthful, comparable price for the same product and relevant period; an invented or stale figure is misleading rather than helpful choice architecture.",
        "A donation page suggests £25, £50 and £100. The first visible amount may shape the range people consider. Test different orders and a blank/custom-first version while preserving the ability to enter any amount."
      ]
    },
    advanced: {
      explanation: [
        "Anchoring is an empirical family of effects rather than a single, fully settled cognitive mechanism. The 1974 heuristic account emphasised insufficient adjustment from a starting point. Later work developed selective-accessibility models for externally supplied anchors and scale-distortion accounts that locate part of the effect in how judgments are mapped onto response scales {{src:tversky-kahneman-1974}} {{src:mussweiler-strack-1999}} {{src:frederick-mochon-2012}}. Furnham and Boo’s literature review surveys how proposed mechanisms, task domains and individual differences contribute to variation in anchoring research; it is a narrative review, not a pooled effect-size estimate {{src:furnham-boo-2011}}.",
        "Schley and Weingarten's 2026 meta-analysis reintegrates fifty years of numeric-anchoring research. Its abstract reports 2,601 effect sizes (1,280 high-versus-low comparisons), with a large mean effect (Hedges' g = 0.825, 95% CI [0.765, 0.884]) and very high heterogeneity (I² = 93.73%). The authors report weaker or null effects in some conditions, including incidental numeric priming, anchors from different dimensions, and studies using incentives or debiasing interventions. The pooled effect therefore should not be used as a universal prediction for one interface or person {{src:schley-weingarten-2026}}.",
        "Economic valuation is a more specific test. Li, Maniadis and Sedikides (2021) meta-analysed 53 willingness-to-pay and willingness-to-accept studies. They reported a moderate overall effect, smaller than early estimates; high relevance and compatibility, buying tasks and non-laboratory experiments were associated with stronger effects, while selling tasks and incompatible anchors were associated with weaker effects. Their abstract cautions that the pooled estimate should be treated carefully {{src:li-maniadis-sedikides-2021}}.",
        "Yoon, Fong and Dimoka's work on willingness-to-pay found anchoring effects across several procedures and samples, while also showing that effect sizes differed between studies and were smaller than some early valuation findings. Their cross-study synthesis of 30 items across five studies reported a positive average correlation (r = .27) between the anchor and willingness-to-pay; it should be read as evidence for valuation anchoring in those tasks, not for every price display {{src:yoon-fong-dimoka-2019}}."
      ],
      evidence: [
        "The classic 1974 experiment demonstrated that an arbitrary wheel-generated number shifted group median estimates of the percentage of African countries in the UN (25 after a low anchor of 10; 45 after a high anchor of 65) {{src:tversky-kahneman-1974}}.",
        "The 2026 Management Science meta-analysis reports a large mean effect across 2,601 effect sizes but very high heterogeneity, alongside moderators associated with weaker or null effects {{src:schley-weingarten-2026}}.",
        "The 2021 economic meta-analysis found a moderate WTP/WTA effect that was smaller than estimates in early studies and varied with task and anchor compatibility {{src:li-maniadis-sedikides-2021}}.",
        "A peer-reviewed cross-study evaluation of WTP found a positive average association between anchors and willingness-to-pay, while documenting differences between valuation studies {{src:yoon-fong-dimoka-2019}}."
      ],
      debates: [
        "**One mechanism or several?** Insufficient adjustment is plausible for self-generated starting values; selective accessibility has evidence for externally supplied comparison anchors; scale distortion proposes that the response scale itself may be altered. No single account should be presented as a complete explanation for every task {{src:epley-gilovich-2006}} {{src:mussweiler-strack-1999}} {{src:frederick-mochon-2012}}.",
        "**Robustness versus heterogeneity.** The broad 2026 meta-analysis supports the robustness of numeric anchoring overall, but its very high I² shows that study effects differ substantially. Anchor relevance, dimensional compatibility, task, incentives and debiasing procedures matter {{src:schley-weingarten-2026}}.",
        "**Valuation is not general estimation.** WTP and WTA involve subjective preferences and real or hypothetical trade-offs. Their evidence should not be conflated with factual estimates or negotiation anchors {{src:li-maniadis-sedikides-2021}} {{src:yoon-fong-dimoka-2019}}.",
        "**Bias versus bounded-resource strategy.** A judgment pulled by an anchor can be described as biased against a normative benchmark, but some models argue that using salient information may be a resource-efficient strategy under limited time and cognitive capacity. Whether a judgment is maladaptive depends on its task, stakes and available information {{src:lieder-et-al-2018}}."
      ],
      alternativeModels: [
        "**Selective Accessibility Model.** An anchor-consistent comparison question can make compatible knowledge more accessible and influence the subsequent judgment {{src:mussweiler-strack-1999}}.",
        "**Scale Distortion Theory.** A numeric standard may change how a particular response scale is used, without changing the perceived target to the same extent {{src:frederick-mochon-2012}}.",
        "**Rational use of limited cognitive resources.** Lieder and colleagues propose that some anchoring patterns can arise from rational allocation of finite reasoning resources; this is a theoretical account, not proof that every anchor-based judgment is optimal {{src:lieder-et-al-2018}}."
      ]
    }
  },
  origin: {
    contributors: ["Amos Tversky", "Daniel Kahneman", "Nicholas Epley", "Thomas Gilovich", "Thomas Mussweiler", "Fritz Strack"],
    period: "1974 onward",
    problem: "Judgments under uncertainty often require a numerical estimate when the correct answer is not immediately available. Tversky and Kahneman showed that an initial value can influence such estimates, prompting decades of work on adjustment, selective accessibility, response scales and the task conditions that strengthen or weaken the effect.",
    narrative: [
      "Tversky and Kahneman's 1974 paper described adjustment from an anchor as one of three heuristics used in numerical prediction under uncertainty {{src:tversky-kahneman-1974}}.",
      "Epley and Gilovich later examined when people adjust from self-generated starting points and why those adjustments can stop too early {{src:epley-gilovich-2006}}.",
      "Mussweiler and Strack developed the selective-accessibility account for externally provided anchors, while Frederick and Mochon advanced a scale-distortion explanation {{src:mussweiler-strack-1999}} {{src:frederick-mochon-2012}}.",
      "The 2026 meta-analysis by Schley and Weingarten brings together a large body of numeric-anchoring research and examines moderators and theoretical integration {{src:schley-weingarten-2026}}."
    ],
    attributionNote: "Tversky and Kahneman's 1974 paper introduced anchoring and adjustment among three judgment heuristics; it did not establish that every later anchoring paradigm works through insufficient adjustment."
  },
  application: {
    summary: [
      "Anchors can influence how users estimate, compare and value things. In design, an anchor may be informative when it is a truthful and relevant reference; it becomes manipulative when the number is arbitrary, hidden, misleading or used to steer a decision against the user's interests."
    ],
    web: [
      "Pricing and commerce: present only accurate comparison prices, discounts and reference ranges; make the basis and period of comparison clear.",
      "Forms and donation flows: suggested amounts can help users decide, but provide an equally usable custom amount and test whether the suggested values fit the user's context.",
      "Dashboards and planning tools: avoid pre-filling a single unsupported forecast or estimate; show relevant ranges and assumptions."
    ],
    mobile: [
      "When suggesting budgets, limits or targets, explain where the starting value came from and allow users to edit or clear it.",
      "Do not use an arbitrary number in a notification or pop-up to shape a financial or health decision without context."
    ],
    enterprise: [
      "Project estimates: collect an independent estimate before sharing a benchmark, then compare with a relevant distribution and document differences.",
      "Negotiation and procurement: prepare a defensible range and evidence before receiving the other party's opening number."
    ],
    services: [
      "Public services and charitable giving: recommended contribution levels should be based on transparent needs or typical costs, with a clear option to choose another amount."
    ],
    steps: [
      "Identify the target judgment and the decision the number is meant to support.",
      "Record every number the user sees before making the judgment, including its source, relevance and order.",
      "Collect an independent estimate or baseline before exposing users to the anchor where feasible.",
      "For an experiment, randomise high-anchor, low-anchor and no-anchor conditions; preserve all other information.",
      "Measure the shift in estimates alongside comprehension, calibration, confidence and decision quality.",
      "Use an anchor only when it is accurate, relevant and transparent; provide an easy route to reject or replace it."
    ]
  },
  whenToUse: [
    "When reviewing numeric suggestions, price comparisons, target values, estimates, recommendations or opening offers.",
    "When a team needs to understand whether an initial number is shaping later judgments or decisions.",
    "When designing an estimation workflow that should be calibrated against independent evidence rather than inherited assumptions."
  ],
  whenNotToUse: [
    "Do not describe every first impression, visual emphasis or default as a numeric anchoring effect; the construct concerns a starting value influencing a later judgment.",
    "Do not use fabricated reference prices, arbitrary high suggestions or unsupported benchmarks to manipulate willingness-to-pay or perceived value.",
    "Do not apply results from factual estimation studies as a direct prediction for every consumer, financial or service decision."
  ],
  advantages: [
    "Makes the influence of initial numerical references visible during research and interface review.",
    "Encourages independent estimates, comparison ranges and transparent benchmark sources.",
    "Helps teams identify when an apparently neutral form field or suggested value is shaping a user's judgment."
  ],
  limitations: [
    "Anchoring is heterogeneous: effects vary across task, anchor type, dimension relevance, sample, incentive structure and judgment measure.",
    "Several mechanisms have been proposed; the same observed shift cannot identify which mechanism produced it.",
    "A judgment moving toward an anchor is not automatically harmful. A relevant benchmark can provide useful information, while an arbitrary anchor can mislead.",
    "Evidence from hypothetical willingness-to-pay tasks may not generalise to real purchases or every price interface."
  ],
  misconceptions: [
    {
      myth: "People always accept the first number they see.",
      reality: "Anchoring is a shift in judgment toward a starting value, not exact copying. Some anchors have weak or no effects, and users may reject a number when it is irrelevant, contradicted by strong knowledge or presented under conditions that reduce anchoring {{src:schley-weingarten-2026}}."
    },
    {
      myth: "Anchoring always happens because people do not adjust enough.",
      reality: "Insufficient adjustment is one account, particularly for self-generated anchors. Selective accessibility and scale distortion are other supported explanations; no single mechanism explains every task {{src:epley-gilovich-2006}} {{src:mussweiler-strack-1999}} {{src:frederick-mochon-2012}}."
    },
    {
      myth: "A high crossed-out price is always an effective and legitimate anchor.",
      reality: "Price anchors operate in a specific valuation context and effect sizes vary. A reference price must be accurate and comparable; otherwise the design is misleading rather than informative {{src:li-maniadis-sedikides-2021}}."
    },
    {
      myth: "The 1974 wheel experiment proves that any random number changes every kind of judgment.",
      reality: "The classic result was a particular numerical-estimation task. Later meta-analytic work finds substantial heterogeneity and weaker or null results under some conditions; do not generalise the classic example to every domain {{src:tversky-kahneman-1974}} {{src:schley-weingarten-2026}}."
    }
  ],
  relations: [
    { target: "framing-effect", type: "related-to", note: "Both concern context-sensitive judgments, but anchoring is influence from an initial reference value while framing concerns how equivalent choices are represented." },
    { target: "loss-aversion", type: "related-to", note: "A reference value can help define gains and losses, but anchoring shifts a judgment toward a starting value whereas loss aversion concerns asymmetric valuation around a reference point." },
    { target: "default-effect", type: "related-to", note: "A numeric default can act as an anchor, while the default effect also involves inaction, effort and implied endorsement." },
    { target: "availability-heuristic", type: "related-to", note: "Both are judgment heuristics, but availability relies on ease of retrieval while anchoring relies on an initial value influencing a later estimate." },
    { target: "product-design", type: "applied-in", note: "Numeric suggestions, comparison prices, targets and estimates in product interfaces can provide anchors and should be accurate, relevant and transparent." }
  ],
  exercises: [
    {
      id: "anchoring-effect-ex-identify",
      kind: "scenario",
      level: "beginner",
      title: "Spot the anchor in a form",
      prompt: [
        "A budgeting app opens with a suggested monthly savings target of £300. A user has not yet entered their income, expenses or savings goal.",
        "Identify the anchor, the target judgment and the information missing from the interface. Propose one alternative that helps the user form an independent estimate."
      ],
      deliverable: "A short annotated screen description and revised first-use flow.",
      criteria: ["Identifies the initial numeric anchor", "Distinguishes the target estimate from the suggested value", "Provides an independent or evidence-based starting route"]
    },
    {
      id: "anchoring-effect-ex-mechanisms",
      kind: "critique",
      level: "intermediate",
      title: "Choose the likely mechanism",
      prompt: [
        "Compare two cases: (A) a project manager starts from their own rough estimate and adjusts; (B) a shopper sees a reference price and is asked whether the product is worth more or less than it.",
        "Explain how insufficient adjustment and selective accessibility might apply, and state why the observed shift alone cannot prove which mechanism operated."
      ],
      deliverable: "A two-column mechanism comparison with one uncertainty per case.",
      criteria: ["Correctly distinguishes self-generated and externally provided anchors", "Explains the plausible mechanisms", "Avoids claiming that one observed effect identifies a unique mechanism"]
    },
    {
      id: "anchoring-effect-ex-experiment",
      kind: "assignment",
      level: "advanced",
      title: "Design a responsible pricing-anchor test",
      prompt: [
        "A service wants to test whether a suggested annual plan price changes customers' willingness-to-pay. Design high-anchor, low-anchor and no-anchor conditions.",
        "Specify how you will ensure the anchor is accurate and comparable, randomise participants, control other information, measure comprehension and decision quality, and protect customers from misleading reference prices."
      ],
      deliverable: "A one-page experiment protocol with conditions, outcomes and ethical guardrails.",
      criteria: ["Includes a no-anchor comparison", "Controls anchor relevance and other information", "Measures understanding and decision quality as well as WTP", "Uses a truthful reference value and preserves user choice"]
    }
  ],
  quiz: [
    {
      id: "anchoring-effect-q-definition",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which situation best illustrates a numeric anchoring effect?",
      options: [
        { text: "A suggested starting value pulls a later estimate toward it.", correct: true, explanation: "Anchoring concerns an initial value influencing a subsequent judgment." },
        { text: "A user remembers a vivid story and judges an event more likely.", correct: false, explanation: "That is closer to the availability heuristic." },
        { text: "A user prefers a preselected option because changing it takes effort.", correct: false, explanation: "That is a possible mechanism of the default effect, not numeric anchoring by itself." },
        { text: "A user chooses a positive description over a negative description of equivalent outcomes.", correct: false, explanation: "That is a framing effect." }
      ],
      explanation: "Look for an initial value and a later judgment that shifts toward it."
    },
    {
      id: "anchoring-effect-q-classic",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "In Tversky and Kahneman's 1974 wheel experiment, what were the median estimates after anchors of 10 and 65?",
      options: [
        { text: "25 after 10 and 45 after 65.", correct: true, explanation: "The group medians shifted in the direction of the arbitrary wheel value." },
        { text: "10 after 10 and 65 after 65.", correct: false, explanation: "Participants did not simply repeat the anchor." },
        { text: "45 after 10 and 25 after 65.", correct: false, explanation: "The direction is reversed." },
        { text: "Both groups estimated 35.", correct: false, explanation: "The original groups reported different medians." }
      ],
      explanation: "The anchor shifted the estimates, but the medians did not equal the anchors."
    },
    {
      id: "anchoring-effect-q-mechanisms",
      kind: "scenario",
      level: "advanced",
      prompt: "A person generates their own starting estimate and adjusts until it seems plausible. Which mechanism is most directly relevant?",
      options: [
        { text: "Insufficient adjustment from a self-generated anchor.", correct: true, explanation: "Epley and Gilovich describe adjustments that stop once a plausible value is reached." },
        { text: "Selective accessibility from testing an externally supplied anchor.", correct: false, explanation: "That account concerns anchor-consistent information made accessible by a comparison question." },
        { text: "Scale distortion only.", correct: false, explanation: "Scale distortion concerns the use of a response scale and is not the defining process in this self-generated example." },
        { text: "Availability of instances.", correct: false, explanation: "That heuristic uses ease of recall, not a starting number that pulls the estimate." }
      ],
      explanation: "Self-generated starting values are the clearest setting for the insufficient-adjustment account."
    },
    {
      id: "anchoring-effect-q-ethics",
      kind: "critique",
      level: "advanced",
      prompt: "An ecommerce team wants to display a fabricated 'was £900' price beside a £500 offer because it may increase perceived value. What is the best response?",
      options: [
        { text: "Do not use a fabricated reference price; any anchor must be accurate, comparable and transparent.", correct: true, explanation: "A misleading price anchor manipulates the comparison rather than informing the decision." },
        { text: "Use it if conversion increases.", correct: false, explanation: "Conversion does not make a false reference price legitimate." },
        { text: "Hide the original price source in a tooltip.", correct: false, explanation: "Users should not have to uncover the basis of a material comparison." },
        { text: "Use a larger anchor because all anchors have the same effect.", correct: false, explanation: "Anchor relevance, context and magnitude affect results; effects are heterogeneous." }
      ],
      explanation: "Ethical choice architecture requires truthful reference points and informed user choice."
    }
  ],
  flashcards: [
    { id: "anchoring-effect-fc-1", front: "What is an anchor?", back: "An initial value that can influence a later estimate, judgment or valuation." },
    { id: "anchoring-effect-fc-2", front: "Insufficient adjustment", back: "People adjust from a starting value but may stop once an estimate seems plausible, leaving the answer too close to the anchor." },
    { id: "anchoring-effect-fc-3", front: "Selective accessibility", back: "A comparison with an external anchor can make anchor-consistent information more accessible for the subsequent judgment." },
    { id: "anchoring-effect-fc-4", front: "Scale distortion", back: "An anchor may change how a response scale is used, not only how the target itself is represented." }
  ],
  references: [
    { source: "tversky-kahneman-1974", role: "primary", note: "Classic numeric-anchoring heuristic and wheel experiment; Science publisher abstract and metadata reviewed." },
    { source: "epley-gilovich-2006", role: "primary", note: "Two sets of experiments on insufficient adjustment from self-generated anchors; PubMed abstract and publisher record reviewed." },
    { source: "mussweiler-strack-1999", role: "primary", note: "Four studies supporting hypothesis-consistent testing and semantic priming in the Selective Accessibility Model; publisher abstract reviewed." },
    { source: "frederick-mochon-2012", role: "primary", note: "Scale-distortion account and experimental results; PubMed abstract and open manuscript identified." },
    { source: "furnham-boo-2011", role: "explanatory", note: "Literature review of anchoring mechanisms, individual differences, domains and applications; publisher abstract and open manuscript metadata reviewed." },
    { source: "li-maniadis-sedikides-2021", role: "primary", note: "Meta-analysis of 53 WTP/WTA studies; publisher abstract and author repository record reviewed." },
    { source: "yoon-fong-dimoka-2019", role: "primary", note: "Open-access multi-study investigation and cross-study analysis of valuation anchoring; full article sections reviewed." },
    { source: "schley-weingarten-2026", role: "primary", note: "Management Science meta-analysis of 2,601 effect sizes; publisher abstract and bibliographic record reviewed, published online 19 May 2026." },
    { source: "lieder-et-al-2018", role: "explanatory", note: "Theoretical review proposing that some anchoring patterns reflect rational use of bounded cognitive resources; publisher abstract reviewed." }
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "Numeric anchoring is supported by decades of experiments and a 2026 meta-analysis of 2,601 effect sizes, but the pooled effect has very high heterogeneity and several moderators. Valuation-specific meta-analysis finds a moderate effect smaller than early estimates. Mechanisms differ across self-generated and externally provided anchors; insufficient adjustment, selective accessibility, scale distortion and bounded-resource accounts should be presented as competing or complementary explanations rather than one settled process.",
  status: "drafted",
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
    activities: true
  },
  lastVerifiedAt: "2026-11-23"
});
