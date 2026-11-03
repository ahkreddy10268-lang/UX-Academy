import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "peak-end-rule",
  slug: "peak-end-rule",
  title: "Peak-End Rule",
  alternateNames: ["Peak-end effect", "Duration neglect (related)", "Remembered utility"],
  summary:
    "People's memory of an experience is shaped mostly by its most intense moment and how it ended, with surprisingly little weight given to how long it lasted.",
  definition:
    "The peak-end rule is the empirical regularity that **retrospective evaluations** of an experience are well approximated by the average of its most intense moment (the peak) and its final moment (the end), while its **duration** has little independent influence (*duration neglect*). It describes **remembered** utility, which can diverge from the moment-by-moment **experienced** utility of the same episode.",
  primaryType: "concept",
  secondaryTypes: ["cognitive-bias"],
  domain: "laws-effects",
  subcategory: "memory-attention-effects",
  tags: ["memory", "experience", "emotion", "retrospective evaluation", "satisfaction", "journey design", "endings"],
  difficulty: "intermediate",
  disciplines: ["Behavioural economics", "Psychology of judgement", "Service design", "Customer experience"],
  learningObjectives: [
    "Explain the peak-end rule and duration neglect, and the difference between experienced and remembered utility.",
    "Describe the key experiments and the evidence from medical settings.",
    "Apply the rule ethically to journey endings, error recovery and the timing of satisfaction surveys.",
    "Evaluate boundary conditions and why the rule does not license neglecting the rest of the experience.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Think back to your last holiday or a long wait at a clinic. You probably don't remember it as an average of every minute. You remember the **best or worst moment**, and you remember **how it ended**.",
        "Psychologists found that our overall judgement of an experience leans heavily on those two moments — the **peak** and the **end** — and hardly at all on how long it lasted. That is the **peak-end rule**.",
        "For product design, this means a frustrating moment (a crash, a confusing error) and the final step of a journey (the confirmation, the goodbye) shape how people remember using your product — and whether they come back.",
      ],
      analogy:
        "A meal at a restaurant can be pleasant for an hour, but if the bill is wrong and the waiter is rude at the end, that's what you tell your friends about. A great dessert can rescue an average meal in memory.",
      everydayExamples: [
        "A delayed flight remembered mainly for the friendly crew member who sorted things out at the end.",
        "A theme-park day summed up by the best ride and the queue for the exit.",
        "An online order remembered for the delightful packaging rather than the slow delivery.",
      ],
      vocabulary: [
        { term: "Peak", meaning: "The most intense moment of an experience — the best or the worst." },
        { term: "End", meaning: "How the experience finished." },
        { term: "Duration neglect", meaning: "The tendency to give little weight to how long an experience lasted when judging it afterwards." },
        { term: "Retrospective evaluation", meaning: "How you rate an experience after it is over, from memory." },
      ],
    },
    intermediate: {
      explanation: [
        "Kahneman and colleagues (1993) asked people to hold a hand in painfully cold water twice: once for 60 seconds, and once for the same 60 seconds followed by 30 more seconds in which the water warmed slightly but was still unpleasant. Asked which trial they would repeat, most chose the **longer** one — objectively more pain, but a better ending {{src:kahneman-et-al-1993}}.",
        "Fredrickson and Kahneman (1993) found the same pattern for film clips: overall ratings were predicted by peak and end affect, while clip duration had little effect {{src:fredrickson-kahneman-1993}}. Redelmeier and Kahneman (1996) showed it in real medical procedures: patients' remembered pain from colonoscopy and lithotripsy correlated with the worst moment and the final minutes, not with how long the procedure took {{src:redelmeier-kahneman-1996}}.",
        "The practical implication is to treat **endings and peaks as design surfaces**: the last screen of a flow, the resolution of a support case, the moment an error is recovered. But the rule describes memory — it does not make the middle of the experience irrelevant to the person living through it.",
      ],
      howItWorks: [
        "Memory compresses an episode into a few representative moments; intensity and recency make the peak and the end representative.",
        "Retrospective measures (satisfaction surveys, NPS, reviews) capture remembered utility and therefore inherit this compression.",
        "Real-time measures (in-task ratings, behaviour, abandonment) capture experienced utility — a different quantity.",
      ],
      implementation: [
        "Design the final step of key journeys carefully: confirmation pages that say clearly what happened and what comes next; graceful sign-out and cancellation.",
        "Identify the likely negative peaks — payment failures, data loss, long waits — and invest in recovery: plain-language errors, preserved input, an easy route to help.",
        "Time satisfaction surveys consciously; asking immediately after a frustrating step measures that peak, not the whole relationship.",
        "Measure experienced and remembered quality separately when deciding priorities.",
      ],
      scenarios: [
        "A checkout with a confusing address step but a clear, reassuring confirmation page: remembered as acceptable, though abandonment at the address step still costs sales.",
        "A support chat that ends with a clear resolution summary and next steps is remembered better than one that ends abruptly, even if the same issue was fixed.",
        "A cancellation flow designed to be obstructive creates a strongly negative ending — likely shaping word-of-mouth about the whole product.",
      ],
    },
    advanced: {
      explanation: [
        "Kahneman, Wakker and Sarin (1997) distinguished **experienced utility** (the hedonic quality of moments) from **remembered utility** (the retrospective evaluation) and **decision utility** (the weight an outcome receives in choice) {{src:kahneman-wakker-sarin-1997}}. The peak-end rule is a model of remembered utility, and the cold-water study shows that decisions can follow memory rather than experience.",
        "Redelmeier, Katz and Kahneman (2003) tested the idea in a randomised trial with 682 colonoscopy patients: adding a short, less uncomfortable interval at the end reduced remembered unpleasantness and was associated with slightly higher rates of returning for a later colonoscopy {{src:redelmeier-katz-kahneman-2003}}. This is one of the few field experiments showing that manipulating an ending can change later behaviour.",
        "Related work shows that people also prefer **improving sequences** of outcomes over declining ones of equal total value {{src:loewenstein-prelec-1993}}, consistent with endings carrying special weight.",
      ],
      evidence: [
        "Laboratory evidence (cold pressor, film clips) and medical field studies support the rule for short, single episodes with a clear beginning and end.",
        "Studies of longer, multi-episode experiences report boundary conditions under which peak-end predicts less well {{src:miron-shatz-2009}}.",
        "Direct experimental evidence in digital products is sparse; most design claims are extrapolations from these studies.",
      ],
      debates: [
        "**How general is it?** Peak-end fits short, continuous, affectively intense episodes best. For long relationships with a product made of many episodes, overall trends and the frequency of good and bad moments may matter more.",
        "**What counts as 'the end'?** In digital products, endings are often ambiguous — a session ends when a tab is closed, not at a designed finale.",
        "**Ethics.** Engineering endings to make people forget poor experiences — or to make them repeat something that harms them — is manipulation. The cold-water study is a warning as much as a technique.",
      ],
      alternativeModels: [
        "The **[[serial-position-effect|serial position effect]]** concerns recall of list items, not evaluation of experiences, but shares an emphasis on endings (recency).",
        "**Sequence preference** research (Loewenstein & Prelec) emphasises the *trend* of an experience rather than just its peak and end.",
      ],
    },
  },

  origin: {
    contributors: ["Daniel Kahneman", "Barbara L. Fredrickson", "Charles A. Schreiber", "Donald A. Redelmeier"],
    period: "1993–1997 — hedonic psychology and behavioural economics",
    problem: "Kahneman's programme asked whether people's memories of experiences are a faithful summary of how those experiences felt — and whether choices based on memory serve people well.",
    narrative: [
      "In 1993, Kahneman, Fredrickson, Schreiber and Redelmeier published the cold-water study showing a preference for a longer, worse-in-total trial with a better end {{src:kahneman-et-al-1993}}; the same year Fredrickson and Kahneman reported duration neglect for film clips {{src:fredrickson-kahneman-1993}}.",
      "Redelmeier and Kahneman's colonoscopy and lithotripsy study (1996) moved the finding into clinical practice {{src:redelmeier-kahneman-1996}}, followed by a randomised trial in 2003 {{src:redelmeier-katz-kahneman-2003}}.",
      "The theoretical framing of experienced versus remembered utility was set out in 1997 {{src:kahneman-wakker-sarin-1997}}. Customer-experience and UX practice later adopted the idea as a principle for journey design.",
    ],
  },

  application: {
    summary: [
      "Use the rule to **prioritise investment in negative peaks and endings**, and to interpret retrospective metrics correctly — never as permission to ignore the experience in between.",
    ],
    web: [
      "Confirmation pages that clearly state outcome, reference number and next steps.",
      "Error recovery that preserves user input and explains how to fix the problem.",
      "Cancellation and account deletion flows that are respectful and quick.",
    ],
    mobile: [
      "End onboarding with the user accomplishing something real rather than a final marketing screen.",
      "After a failed upload or sync, show clear recovery and confirm success when it completes.",
    ],
    enterprise: [
      "Long tasks (imports, reports) should end with a clear summary of results and any issues to resolve.",
      "When an outage is resolved, close the loop with users — the resolution shapes how the incident is remembered.",
    ],
    services: [
      "Map service journeys to identify emotional peaks and the final touchpoint; design the hand-off at the end (a follow-up message, a clear outcome).",
      "Time post-service surveys deliberately and interpret results as remembered rather than experienced quality.",
    ],
    steps: [
      "Map the journey and mark expected emotional peaks (positive and negative) and the ending.",
      "Collect evidence: where do users abandon, complain or contact support?",
      "Reduce the intensity and frequency of negative peaks first; then design a clear, honest ending.",
      "Measure both in-task behaviour and retrospective satisfaction to see whether changes affect experience, memory, or both.",
    ],
  },

  whenToUse: [
    "Prioritising improvements in long or emotionally charged journeys (onboarding, checkout, claims, support).",
    "Designing completion, confirmation and exit moments.",
    "Interpreting retrospective survey results and choosing when to ask.",
  ],
  whenNotToUse: [
    "To justify leaving known pain points unfixed because 'only the end matters' — users abandon in the middle, and experienced utility matters to them.",
    "To manufacture positive memories that hide harm or encourage repeated use against users' interests.",
    "As a precise formula for satisfaction in long, multi-episode product relationships.",
  ],
  advantages: [
    "Directs scarce design effort to the moments with disproportionate influence on memory and word-of-mouth.",
    "Explains why retrospective and in-the-moment measures can disagree.",
  ],
  limitations: [
    "Best supported for short, single episodes; weaker for long, multi-episode experiences.",
    "Little direct experimental evidence in digital product contexts.",
    "Remembered utility is only one consideration; real-time frustration still drives abandonment.",
  ],
  misconceptions: [
    {
      myth: "Only the peak and the end matter, so the rest of the journey can be ignored.",
      reality:
        "The rule describes how experiences are *remembered*, not what they cost people while living through them. Users who abandon halfway never reach your designed ending.",
    },
    {
      myth: "The peak-end rule means every experience should end with a delightful animation.",
      reality: "A good ending is one that resolves the user's goal clearly. Decoration at the end does not compensate for an unresolved problem.",
    },
    {
      myth: "Longer experiences are always remembered as worse.",
      reality: "Duration has surprisingly little independent effect on retrospective evaluation in the classic studies {{src:fredrickson-kahneman-1993}} — which is why ending quality can outweigh length.",
    },
  ],

  relations: [
    { target: "serial-position-effect", type: "contrasts-with", note: "Both emphasise endings, but the serial position effect concerns recall of list items while peak-end concerns evaluation of experiences." },
    { target: "net-promoter-score", type: "related-to", note: "NPS and other retrospective measures capture remembered utility and are therefore shaped by peaks and endings." },
    { target: "customer-journey-mapping", type: "applied-in", note: "Journey maps make emotional peaks and endings visible so they can be prioritised." },
    { target: "error-recovery", type: "applied-in", note: "Good recovery reduces the intensity of negative peaks." },
    { target: "deceptive-patterns", type: "related-to", note: "Engineering memories to obscure poor treatment crosses into manipulation." },
    { target: "aesthetic-usability-effect", type: "related-to", note: "Both describe ways retrospective judgements of an experience can diverge from its objective quality." },
  ],

  exercises: [
    {
      id: "peak-end-rule-ex-journey",
      kind: "assignment",
      level: "beginner",
      title: "Find the peaks and the end",
      prompt: [
        "Pick a journey you completed recently (renewing a document, returning a product, booking travel). Sketch it as a line of steps and mark how you felt at each.",
        "Circle the most intense moment and the ending. How well do those two moments match your overall memory of the experience?",
      ],
      deliverable: "A simple emotion curve with the peak and end marked, plus two sentences of reflection.",
      criteria: ["Identifies a clear peak and ending", "Reflects honestly on whether memory matches the curve"],
    },
    {
      id: "peak-end-rule-ex-redesign",
      kind: "scenario",
      level: "intermediate",
      title: "Redesign a claims journey responsibly",
      prompt: [
        "An insurance claim journey has a long, stressful document-upload step (frequent failures) and ends with a generic 'Thank you' page with no information.",
        "Propose changes to the negative peak and the ending. Then explain why changing the ending alone would be insufficient and potentially unethical.",
      ],
      deliverable: "A short proposal (bullet points) plus an ethics paragraph.",
      criteria: [
        "Fixes the upload failures, not just their memory",
        "Designs an informative ending (status, timeline, contact)",
        "Explains the experienced vs. remembered distinction",
      ],
      exampleSolution: [
        "Peak: resumable uploads, clear file requirements before upload, preserved progress, specific error messages. End: a confirmation stating claim number, what happens next, expected timeline and how to add documents later. Ethics: a nicer ending without fixing uploads would hide a real cost to claimants and push failures into support calls.",
      ],
    },
    {
      id: "peak-end-rule-ex-survey",
      kind: "critique",
      level: "advanced",
      title: "Critique a survey trigger",
      prompt: [
        "A product triggers a satisfaction survey immediately after users encounter an error message. The team reports falling satisfaction and concludes the product is getting worse overall.",
        "Critique this inference using the peak-end rule and propose a better measurement design.",
      ],
      deliverable: "A short critique and a revised measurement plan.",
      criteria: ["Identifies sampling at a negative peak", "Separates experienced and remembered measures", "Proposes a less biased trigger or sampling scheme"],
    },
  ],

  quiz: [
    {
      id: "peak-end-rule-q-cold",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In the cold-water study, why did most participants prefer to repeat the longer trial?",
      options: [
        { text: "It ended with slightly less painful water, so it was remembered as less unpleasant.", correct: true, explanation: "The better ending improved the remembered evaluation despite more total pain." },
        { text: "It contained less total pain.", correct: false, explanation: "It contained the same 60 seconds plus 30 more seconds of discomfort — more total pain." },
        { text: "They were paid more for it.", correct: false, explanation: "Payment was not the manipulated factor." },
        { text: "They could not tell the trials apart.", correct: false, explanation: "Participants made a clear preference; the issue is how memory summarised them." },
      ],
      explanation: "Remembered utility followed the ending, not the total.",
    },
    {
      id: "peak-end-rule-q-duration",
      kind: "true-false",
      level: "intermediate",
      prompt: "In the classic studies, the duration of an experience was the strongest predictor of how people rated it afterwards.",
      options: [
        { text: "True", correct: false, explanation: "Duration had little independent effect — the phenomenon called duration neglect." },
        { text: "False", correct: true, explanation: "Peak and end intensity predicted retrospective ratings far better than duration." },
      ],
      explanation: "Duration neglect is part of the peak-end pattern.",
    },
    {
      id: "peak-end-rule-q-ethics",
      kind: "scenario",
      level: "advanced",
      prompt: "A subscription service makes cancellation slow and confusing but adds a warm, personalised farewell screen at the very end, citing the peak-end rule. What is the best evaluation?",
      options: [
        { text: "It misapplies the rule: the obstructive steps create a strong negative peak, and using memory effects to soften deliberate friction is manipulative.", correct: true, explanation: "The design both creates a bad peak and attempts to disguise it — ethically and practically weak." },
        { text: "It is a strong application because only the end is remembered.", correct: false, explanation: "Peaks are also weighted heavily; and the rule does not justify causing harm." },
        { text: "It is fine as long as the farewell screen is visually beautiful.", correct: false, explanation: "Aesthetics do not undo an obstructive experience." },
        { text: "The rule does not apply to digital products at all.", correct: false, explanation: "Evidence is thinner for digital products, but there is no reason to think memory works differently." },
      ],
      explanation: "Fix negative peaks; do not use endings to mask them.",
    },
    {
      id: "peak-end-rule-q-utility",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "Which measure most directly captures *experienced* rather than *remembered* utility?",
      options: [
        { text: "Moment-by-moment ratings or behavioural signals collected during the task.", correct: true, explanation: "Experienced utility is about each moment as it happens." },
        { text: "A satisfaction survey sent a week later.", correct: false, explanation: "That measures remembered utility." },
        { text: "Net Promoter Score.", correct: false, explanation: "NPS is a retrospective attitude question." },
        { text: "Online reviews.", correct: false, explanation: "Reviews are retrospective and also socially shaped." },
      ],
      explanation: "Different instruments measure different quantities; know which one you are using.",
    },
  ],

  flashcards: [
    { id: "peak-end-rule-fc-1", front: "Peak-end rule", back: "Retrospective evaluation ≈ average of the most intense moment and the end; duration largely neglected." },
    { id: "peak-end-rule-fc-2", front: "Experienced vs. remembered utility", back: "How moments feel as they happen vs. how the whole episode is evaluated afterwards." },
    { id: "peak-end-rule-fc-3", front: "Biggest design risk of the peak-end rule", back: "Using endings to mask harm instead of fixing negative peaks." },
  ],

  references: [
    { source: "kahneman-et-al-1993", role: "primary", note: "Cold-pressor study: preference for a better ending." },
    { source: "fredrickson-kahneman-1993", role: "primary", note: "Duration neglect in evaluations of film clips." },
    { source: "redelmeier-kahneman-1996", role: "primary", note: "Peak and end predict remembered pain in medical procedures." },
    { source: "redelmeier-katz-kahneman-2003", role: "primary", note: "Randomised trial of an extended, gentler ending." },
    { source: "kahneman-wakker-sarin-1997", role: "primary", note: "Experienced vs. remembered utility." },
    { source: "loewenstein-prelec-1993", role: "explanatory", note: "Preference for improving sequences." },
    { source: "miron-shatz-2009", role: "explanatory", note: "Boundary conditions in multi-episode events." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "Well supported for short, single, affectively intense episodes in the lab and in medical settings, including a randomised trial. Boundary conditions exist for longer and multi-episode experiences, and direct evidence in digital products is limited. The rule supports prioritising peaks and endings; it does not support neglecting the rest of the experience.",

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
