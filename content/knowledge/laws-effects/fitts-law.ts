import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "fitts-law",
  slug: "fitts-law",
  title: "Fitts's Law",
  alternateNames: ["Fitts' law", "Fitts's model of aimed movement", "Index of Difficulty model"],
  summary:
    "An empirical model of aimed movement: the time to acquire a target grows with the logarithm of the ratio between its distance and its width.",
  definition:
    "Fitts's law is an empirical regression model stating that movement time to a target is a linear function of the movement's **index of difficulty**, a logarithmic function of target distance divided by target width. In HCI it is most often written in the Shannon formulation, `MT = a + b · log₂(D/W + 1)`, where *a* and *b* are fitted to measured data for a specific device, user population and task.",
  primaryType: "law",
  secondaryTypes: ["model", "formula"],
  domain: "laws-effects",
  subcategory: "performance-laws",
  tags: ["pointing", "motor control", "target size", "touch", "information theory", "input devices"],
  difficulty: "beginner",
  disciplines: ["Human-computer interaction", "Experimental psychology", "Human factors", "Interaction design"],
  learningObjectives: [
    "Explain in plain language why big, close targets are faster to hit than small, distant ones.",
    "Calculate an index of difficulty and, given fitted constants, a predicted movement time.",
    "Apply the law to target sizing, placement, edges and spacing without overstating what it predicts.",
    "Evaluate when the law does not apply — decision time, errors, trajectory tasks and touch imprecision.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Pointing at something on a screen is a small physical task: your hand moves the mouse, or your finger travels across glass, and you have to stop *on* the thing you want. Fitts's law describes how long that takes.",
        "The idea is simple. **The farther away a target is, and the smaller it is, the longer it takes to hit.** A large button right next to your cursor is quick. A tiny link on the other side of the screen is slow, because you must travel far *and* slow down carefully at the end.",
        "The surprising part is the shape of the relationship. Doubling the distance does not double the time — time grows more gently, following a logarithm. What really matters is the *ratio* of distance to size: a target twice as far away but twice as big is about as easy as the original.",
      ],
      analogy:
        "Think of throwing a ball into a bucket. A wide bucket at your feet is easy. A narrow cup across the room needs a careful, slower throw. Moving a cursor works the same way: you make a fast movement towards the target, then smaller corrective movements as you get close — and smaller or farther targets need more corrections.",
      everydayExamples: [
        "A full-width 'Pay now' button on a phone is quicker to tap than a small text link.",
        "Right-click context menus open where your pointer already is, so the distance is almost zero.",
        "On desktop operating systems, menus placed against the screen edge are easy to hit because the pointer stops at the edge — you cannot overshoot.",
      ],
      vocabulary: [
        { term: "Target", meaning: "The thing you are trying to point at or tap: a button, link, icon or field." },
        { term: "Distance (D)", meaning: "How far the pointer or finger must travel to reach the centre of the target." },
        { term: "Width (W)", meaning: "The size of the target measured along the direction of movement." },
        { term: "Movement time (MT)", meaning: "How long it takes to move to the target and select it." },
        { term: "Index of difficulty (ID)", meaning: "A single number, in bits, that combines distance and width into how hard the movement is." },
      ],
    },
    intermediate: {
      explanation: [
        "In professional practice Fitts's law is a *comparative* tool. It tells you which of two layouts makes a pointing task harder, and by how much in relative terms. It does not tell you absolute times unless you have measured the constants for your device and users.",
        "The index of difficulty is `ID = log₂(D/W + 1)`, measured in bits. Each additional bit roughly means 'one more halving of the target relative to its distance'. A movement with D = 300 and W = 20 has ID = log₂(16) = 4 bits; making the target 40 wide drops it to about 3.1 bits.",
        "Designers use the law through four levers: **make frequent targets larger**, **move them closer to where the pointer or thumb already is**, **exploit screen edges and corners** (which behave as infinitely deep targets for a mouse), and **enlarge the clickable area beyond the visible label** — for example, making a whole table row or a label-plus-checkbox clickable.",
      ],
      howItWorks: [
        "Width is measured *along the axis of approach*. A wide but short button is easy to hit when approached horizontally and harder when approached vertically. For two-dimensional targets, a common practical approximation is to use the smaller of width and height.",
        "Distance is measured to the target's centre from where the movement starts — usually the current pointer position or the resting thumb position, not the top-left of the screen.",
        "The constant *a* captures start/stop overhead (including the click or tap itself); *b* captures how quickly a given device-and-person combination handles difficulty. A device with a smaller *b* is better at hard pointing tasks.",
      ],
      implementation: [
        "Audit primary actions: are the most frequent targets the largest and closest to the user's likely starting point?",
        "Expand hit areas with padding rather than enlarging visible chrome; make whole rows, cards or label-plus-control combinations clickable where it is semantically correct.",
        "Respect platform minimum target sizes and WCAG 2.2 target-size criteria, then go larger for primary actions.",
        "Separate small destructive targets from frequent ones: Fitts's law speeds pointing, but nearby targets also increase the chance of hitting the wrong one.",
        "For pop-up and contextual menus, open them at the pointer so the first item is near zero distance.",
      ],
      scenarios: [
        "A data table where only the 12 px row icon opens a record — making the whole row a link removes a high-ID movement from every interaction.",
        "A mobile checkout whose primary action sits at the top of a long form — moving it to a sticky bottom bar puts it within the thumb's natural range.",
        "A desktop toolbar of 16 px icons — increasing hit areas to 32 px while keeping icons visually small reduces ID by about one bit per icon at typical distances.",
      ],
    },
    advanced: {
      explanation: [
        "Fitts (1954) framed aimed movement through information theory: a movement selects one target from a range of possible endpoints, so its difficulty can be expressed in bits. His original index was `ID = log₂(2A/W)`, where A is the movement amplitude. MacKenzie (1992) argued for the **Shannon formulation** `log₂(A/W + 1)`, by analogy with Shannon's channel-capacity theorem; it fits data better at low difficulties and never produces negative IDs.",
        "The law is a regression model, so its constants are only meaningful inside the experiment that produced them. Proper estimation follows a standard protocol: vary D and W across several combinations, record movement times and endpoint positions, compute an **effective width** `We = 4.133 × SDx` from the spread of endpoints (which normalises the data to a 4% error rate), and fit MT against the effective ID.",
        "**Throughput** (bits/s) summarises device performance independent of particular targets. Soukoreff & MacKenzie (2004) recommend computing it as the mean of IDe/MT across conditions, and caution that comparing raw *b* slopes across studies is unreliable because it ignores the intercept and the error rate.",
      ],
      evidence: [
        "The law has been replicated across limbs, devices (mouse, stylus, joystick, eye gaze, touch), populations and environments since 1954 — it is among the most robust findings in HCI {{src:mackenzie-1992}}.",
        "Card, English & Burr (1978) showed mouse pointing followed Fitts's law and outperformed joysticks and key-based selection, an influential result in the adoption of the mouse {{src:card-english-burr-1978}}.",
        "For touch, finger contact adds imprecision unrelated to movement difficulty. Bi, Li & Zhai's **FFitts law** separates the absolute precision of the finger from the relative precision of the movement, improving prediction for small touch targets {{src:bi-li-zhai-2013}}.",
      ],
      debates: [
        "**Which formulation?** Original, Welford (`log₂(D/W + 0.5)`) and Shannon formulations all fit well; Shannon is dominant in HCI and used in ISO 9241-9 / ISO 9241-411 pointing-device evaluation, but the choice still matters when comparing published constants.",
        "**Nominal vs. effective width.** Using the drawn target width ignores what users actually did. Effective-width analysis is more faithful but needs endpoint data, which many practitioner studies do not record.",
        "**Is it really information-theoretic?** The analogy to Shannon's theorem is useful but contested; some researchers treat the law as a purely empirical speed–accuracy trade-off whose logarithmic form arises from iterative corrective sub-movements.",
      ],
      alternativeModels: [
        "The **[[steering-law|steering law]]** extends the logic to movements through a constrained path, such as cascading menus, where time scales linearly with path length divided by path width.",
        "The **[[keystroke-level-model|Keystroke-Level Model]]** uses a single average pointing operator (P ≈ 1.1 s) for coarse task estimates; Fitts's law can replace it when precision matters.",
        "The **[[hick-hyman-law|Hick-Hyman law]]** models decision time among choices — the cognitive part of selection that Fitts's law deliberately excludes.",
      ],
    },
  },

  origin: {
    contributors: ["Paul M. Fitts"],
    period: "1954, US Air Force aviation psychology research",
    problem:
      "Fitts wanted to quantify the capacity of the human motor system in the same terms Shannon had used for communication channels — to predict how quickly operators could make precise movements to controls.",
    narrative: [
      "Fitts's 1954 paper reported reciprocal tapping between two metal plates with a stylus, along with disc- and pin-transfer tasks, systematically varying amplitude and target width {{src:fitts-1954}}.",
      "The law entered HCI through work at Xerox PARC: Card, English and Burr used it in 1978 to compare pointing devices, and Card, Moran and Newell built it into their Model Human Processor {{src:card-moran-newell-1983}}.",
      "MacKenzie's 1992 review established the Shannon formulation and practices for HCI research; Soukoreff and MacKenzie's 2004 paper consolidated a standard evaluation method {{src:soukoreff-mackenzie-2004}}.",
    ],
  },

  application: {
    summary: [
      "Fitts's law informs **target sizing, placement and grouping**. It is most valuable when an interaction is repeated many times — toolbars, data-entry forms, games, keyboards and navigation — where small per-movement savings accumulate.",
    ],
    web: [
      "Make entire cards, rows and list items clickable when they lead to a single destination.",
      "Associate labels with checkboxes and radio buttons so the label text is part of the target.",
      "Place a form's primary action close to the last field rather than in a distant corner.",
    ],
    mobile: [
      "Size touch targets at or above platform guidance (Apple suggests at least 44×44 pt; Material suggests 48×48 dp) and above WCAG 2.2's 24×24 CSS px minimum.",
      "Place frequent actions where the thumb naturally rests; bottom navigation and sticky action bars reduce reach distance.",
    ],
    enterprise: [
      "In dense tools, keep visual density but expand invisible hit areas; offer keyboard shortcuts so expert users bypass pointing entirely.",
      "Avoid cascading hover menus with narrow paths — they are a steering-law problem as much as a Fitts's-law one.",
    ],
    services: [
      "Kiosks and terminals used standing, with gloves or in motion need larger targets than lab-tested desktop interfaces: measure in context.",
    ],
    steps: [
      "List the high-frequency pointing actions in the flow.",
      "For each, estimate D from the typical start position and W along the approach axis; calculate ID.",
      "Rank actions by frequency × ID to find where improvements pay off most.",
      "Redesign by enlarging hit areas, reducing distance, or using edges; recalculate.",
      "Validate with real users, especially for touch, where finger imprecision and occlusion matter.",
    ],
  },

  whenToUse: [
    "Comparing alternative layouts for repeated pointing or tapping tasks.",
    "Setting rules for target sizes and spacing in a design system.",
    "Evaluating input devices or interaction techniques in research.",
  ],
  whenNotToUse: [
    "Predicting total task time when decision-making, reading or searching dominate — Fitts's law covers only the movement.",
    "Quoting absolute millisecond predictions using constants borrowed from another study, device or population.",
    "Justifying giant targets everywhere: size competes with information density, and very large targets waste space without measurable benefit once ID is already low.",
  ],
  advantages: [
    "Highly replicated and quantitative.",
    "Gives a principled reason for decisions that otherwise look like taste.",
    "Cheap to apply as a comparative heuristic.",
  ],
  limitations: [
    "Models one-dimensional, rapid, aimed movements; two-dimensional targets need approximations.",
    "Excludes visual search, decision time and the cost of errors.",
    "Constants a and b are context-specific and must be measured.",
    "Touch input adds finger-size imprecision that classical Fitts's law underestimates.",
  ],
  misconceptions: [
    {
      myth: "Fitts's law says bigger is always better.",
      reality:
        "Benefits flatten logarithmically. Going from ID 1 to ID 0.5 saves very little time, while the space could serve other purposes. Fitts's law is about the *ratio* of distance to width, not size alone.",
    },
    {
      myth: "There are standard values of a and b for 'the mouse'.",
      reality:
        "Constants vary with the device, its gain settings, the user population and the experimental task. Use published values only to illustrate, never to predict your product's timings.",
    },
    {
      myth: "Fitts's law predicts how long it takes to find a button.",
      reality:
        "It predicts movement time once the user knows where the target is. Finding the target is a [[visual-hierarchy|visual hierarchy]] and visual-search problem.",
    },
  ],

  relations: [
    { target: "steering-law", type: "complementary-to", note: "The steering law extends Fitts's reasoning from reaching a target to moving through a constrained path." },
    { target: "hick-hyman-law", type: "complementary-to", note: "Hick-Hyman models the decision before a selection; Fitts's law models the movement after it." },
    { target: "keystroke-level-model", type: "applied-in", note: "KLM's pointing operator is an average of Fitts-type movements and can be replaced by a Fitts estimate." },
    { target: "wcag", type: "related-to", note: "WCAG 2.2 target-size success criteria 2.5.5 and 2.5.8 set minimum pointer target sizes, motivated partly by motor-impairment research." },
    { target: "touch-interactions", type: "applied-in", note: "Touch target sizing applies Fitts's law with an additional allowance for finger imprecision (FFitts law)." },
    { target: "human-factors-engineering", type: "developed-from", note: "The law originated in post-war human-factors research on control design for operators." },
  ],

  formulas: [
    {
      id: "fitts-shannon",
      name: "Fitts's law (Shannon formulation)",
      expression: "MT = a + b · log₂(D / W + 1)",
      contributor: "Fitts (1954); Shannon formulation popularised in HCI by MacKenzie (1992)",
      source: "mackenzie-1992",
      variables: [
        { symbol: "MT", name: "Movement time", unit: "s or ms", description: "Time from movement start to target selection." },
        { symbol: "D", name: "Distance", unit: "px, mm, pt", description: "Distance from the starting point to the target's centre." },
        { symbol: "W", name: "Width", unit: "same unit as D", description: "Target size along the axis of motion (use effective width We for research)." },
        { symbol: "a", name: "Intercept", unit: "s", description: "Empirically fitted start/stop time; includes the selection action." },
        { symbol: "b", name: "Slope", unit: "s/bit", description: "Empirically fitted time per bit of difficulty; inverse relates to device capability." },
        { symbol: "ID", name: "Index of difficulty", unit: "bits", description: "log₂(D/W + 1). Unitless ratio expressed in bits." },
      ],
      resultUnit: "seconds (MT) and bits (ID)",
      assumptions: [
        "The movement is a rapid, aimed movement to a known target location.",
        "D and W are in the same units, so D/W is a pure ratio.",
        "a and b were estimated for this device, population and task by regression on measured data.",
      ],
      conditions: [
        "Use for comparing pointing difficulty across designs, or for predicting times only with locally fitted constants.",
        "Use width along the approach axis; for 2D targets approximate with the smaller dimension or an angle-dependent width.",
      ],
      steps: [
        "Measure D from the start position to the target centre.",
        "Measure W along the direction of movement.",
        "Compute the ratio D/W and add 1.",
        "Take the base-2 logarithm to get ID in bits.",
        "If you have fitted constants, compute MT = a + b × ID.",
      ],
      workedExample: {
        given: [
          "A button 40 px wide, 400 px from the pointer.",
          "Hypothetical constants fitted in a local study: a = 0.10 s, b = 0.15 s/bit (illustrative only).",
        ],
        steps: [
          "D/W = 400 / 40 = 10",
          "ID = log₂(10 + 1) = log₂(11) ≈ 3.46 bits",
          "MT = 0.10 + 0.15 × 3.46 ≈ 0.62 s",
          "Doubling the width to 80 px: ID = log₂(6) ≈ 2.58 bits → MT ≈ 0.49 s",
        ],
        result: "≈ 3.46 bits; ≈ 0.62 s with the illustrative constants. Doubling width saves ≈ 0.13 s per movement in this context.",
      },
      interpretation: [
        "Compare IDs, not absolute times, unless your constants are locally measured. A reduction of one bit is meaningful; differences of a tenth of a bit are rarely noticeable.",
        "Because the relationship is logarithmic, the largest gains come from fixing the hardest targets — tiny, distant ones.",
      ],
      commonErrors: [
        "Measuring W perpendicular to the direction of movement.",
        "Using the visual size of an icon instead of its actual hit area.",
        "Mixing units (D in px, W in mm).",
        "Using the natural log or log₁₀ instead of log₂ — the ID is then not in bits.",
        "Treating constants from a published paper as universal.",
      ],
      limitations: [
        "Excludes decision and search time.",
        "Does not model errors or the cost of hitting a neighbouring target.",
        "Less accurate for very small touch targets (see FFitts law) and for very low IDs.",
      ],
      alternatives: [
        { name: "Original (Fitts, 1954)", expression: "ID = log₂(2D / W)", note: "Can produce negative ID when W > 2D; fits less well at low difficulty." },
        { name: "Welford (1960)", expression: "ID = log₂(D / W + 0.5)", note: "An intermediate formulation found to fit some data sets well." },
        { name: "Throughput", expression: "TP = IDe / MT, with IDe = log₂(D / We + 1) and We = 4.133 × SDx", note: "Device-level performance measure in bits/s used in ISO 9241-411-style evaluation." },
      ],
      calculator: "fitts",
    },
  ],
  lab: "fitts-lab",

  exercises: [
    {
      id: "fitts-ex-toolbar",
      kind: "calculation",
      level: "beginner",
      title: "Rank the toolbar",
      prompt: [
        "A toolbar has three buttons. From the usual pointer position: *Save* is 600 px away and 24 px wide; *Undo* is 200 px away and 24 px wide; *Export* is 800 px away and 120 px wide.",
        "Calculate the index of difficulty for each and rank them from hardest to easiest.",
      ],
      deliverable: "Three IDs in bits and a ranking.",
      criteria: ["Uses log₂(D/W + 1)", "Keeps units consistent", "Identifies the hardest target correctly"],
      exampleSolution: [
        "Save: log₂(600/24 + 1) = log₂(26) ≈ 4.70 bits. Undo: log₂(200/24 + 1) ≈ log₂(9.33) ≈ 3.22 bits. Export: log₂(800/120 + 1) ≈ log₂(7.67) ≈ 2.94 bits.",
        "Hardest to easiest: Save, Undo, Export — despite Export being farthest, its width makes it easiest. If Save is the most frequent action, it is the best candidate for enlarging or moving.",
      ],
    },
    {
      id: "fitts-ex-critique",
      kind: "critique",
      level: "intermediate",
      title: "Critique a mobile settings screen",
      prompt: [
        "Open the settings screen of an app you use daily. Identify three targets whose size or position makes them harder to acquire than their frequency of use justifies.",
        "For each, propose a change and state which variable (D or W) it affects, and any trade-off it creates (for example, accidental activation).",
      ],
      deliverable: "An annotated screenshot or a three-row table: target, problem, change, trade-off.",
      criteria: [
        "Measures or estimates hit areas, not just visual size",
        "Considers frequency of use",
        "Names at least one trade-off (density, error risk, reach)",
      ],
    },
    {
      id: "fitts-ex-research",
      kind: "assignment",
      level: "advanced",
      title: "Estimate your own constants",
      prompt: [
        "Run the Fitts's law lab for at least four distance–width combinations and 10 trials each.",
        "Report the fitted a, b and R², then explain why your constants should not be used to predict another person's or device's performance.",
      ],
      deliverable: "A short report with the regression output and a limitations paragraph.",
      criteria: ["At least four ID levels", "Reports R²", "Discusses learning effects and device dependence"],
    },
  ],

  quiz: [
    {
      id: "fitts-q-ratio",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A target is 300 px away and 30 px wide. Which change makes it easiest to hit?",
      options: [
        { text: "Move it to 150 px away", correct: false, explanation: "This halves D, giving D/W = 5 — the same as doubling the width, not better." },
        { text: "Make it 60 px wide", correct: false, explanation: "This doubles W, giving D/W = 5 — identical to halving the distance." },
        { text: "Both changes are equally effective", correct: true, explanation: "Fitts's law depends on the ratio D/W. Both changes give D/W = 5, so ID = log₂(6) ≈ 2.58 bits either way." },
        { text: "Neither matters; only colour matters", correct: false, explanation: "Colour affects finding the target, not the movement time modelled by Fitts's law." },
      ],
      explanation: "Distance and width enter the law only as a ratio. Halving distance and doubling width are mathematically identical.",
    },
    {
      id: "fitts-q-constants",
      kind: "true-false",
      level: "intermediate",
      prompt: "The constants a and b in Fitts's law are universal values that apply to all mice and touchscreens.",
      options: [
        { text: "True", correct: false, explanation: "a and b are regression coefficients estimated from data for a specific device, task and population." },
        { text: "False", correct: true, explanation: "They must be measured. Comparing devices is better done with throughput computed using effective width." },
      ],
      explanation: "Fitts's law is a regression model. Its constants describe the experiment that produced them.",
    },
    {
      id: "fitts-q-id",
      kind: "formula",
      level: "intermediate",
      prompt: "Using the Shannon formulation, what is the index of difficulty for D = 300 px and W = 20 px?",
      options: [
        { text: "4 bits", correct: true, explanation: "log₂(300/20 + 1) = log₂(16) = 4." },
        { text: "15 bits", correct: false, explanation: "15 is the ratio D/W, not its logarithm." },
        { text: "3.9 bits", correct: false, explanation: "This is close to log₂(15), forgetting the +1 of the Shannon formulation." },
        { text: "1.2 bits", correct: false, explanation: "This uses log₁₀(16); the ID must use log₂ to be in bits." },
      ],
      explanation: "ID = log₂(D/W + 1) = log₂(16) = 4 bits.",
    },
    {
      id: "fitts-q-scope",
      kind: "scenario",
      level: "advanced",
      prompt:
        "A team cites Fitts's law to justify placing a large 'Delete account' button directly beside a large 'Save' button on a mobile settings page, arguing that both are now 'fast'. What is the strongest critique?",
      options: [
        { text: "Fitts's law does not model the cost of errors; adjacent large targets raise the risk and consequence of mis-taps on a destructive action.", correct: true, explanation: "Fitts's law optimises acquisition speed only. For destructive actions, deliberately increasing distance and adding confirmation is good design." },
        { text: "Fitts's law only applies to mice, not touchscreens.", correct: false, explanation: "It applies to touch too, though finger imprecision adds error (FFitts law)." },
        { text: "Large buttons always increase ID.", correct: false, explanation: "Larger W reduces ID." },
        { text: "The buttons should be smaller to reduce visual clutter.", correct: false, explanation: "Clutter may matter, but this does not address the core problem of error consequence." },
      ],
      explanation: "Speed is not the only objective. Fitts's law should be balanced against error prevention for destructive actions.",
      revise: "fitts-law",
    },
  ],

  flashcards: [
    { id: "fitts-fc-1", front: "Fitts's law (Shannon formulation)", back: "MT = a + b · log₂(D/W + 1); a and b are fitted per device, task and population." },
    { id: "fitts-fc-2", front: "What does Fitts's law NOT model?", back: "Decision time, visual search, and the cost of errors." },
    { id: "fitts-fc-3", front: "Effective width We", back: "4.133 × SD of endpoint positions — normalises data to a ≈4% error rate." },
  ],

  references: [
    { source: "fitts-1954", role: "primary", note: "Original experiments and information-theoretic formulation." },
    { source: "mackenzie-1992", role: "primary", note: "Shannon formulation; review of HCI applications." },
    { source: "soukoreff-mackenzie-2004", role: "primary", note: "Effective width, throughput and evaluation standards." },
    { source: "card-english-burr-1978", role: "primary", note: "Application to pointing-device comparison." },
    { source: "bi-li-zhai-2013", role: "primary", note: "FFitts law for finger touch." },
    { source: "card-moran-newell-1983", role: "explanatory", note: "Integration into the Model Human Processor." },
    { source: "w3c-wcag-22", role: "standard", locator: "SC 2.5.8 Target Size (Minimum); SC 2.5.5 Target Size (Enhanced)", note: "Minimum target sizes." },
    { source: "apple-hig", role: "explanatory", locator: "Accessibility — hit targets", note: "Platform guidance on minimum touch target size." },
    { source: "material-3", role: "explanatory", locator: "Accessibility — touch targets", note: "Platform guidance on minimum touch target size." },
  ],
  evidence: "original-empirical",
  evidenceNote:
    "Supported by decades of controlled experiments across devices and populations. The evidence supports *relative* predictions of movement difficulty and device throughput; it does not support transferring constants between contexts or extending the law to decision-making or search.",

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
