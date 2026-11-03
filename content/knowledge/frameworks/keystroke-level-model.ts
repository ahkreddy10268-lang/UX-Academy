import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "keystroke-level-model",
  slug: "keystroke-level-model",
  title: "Keystroke-Level Model (KLM)",
  alternateNames: ["KLM", "KLM-GOMS", "Keystroke-level GOMS"],
  summary:
    "An analytic model that predicts how long an expert takes to perform a routine task without errors, by adding up standard times for keystrokes, pointing, homing, mental preparation and system response.",
  definition:
    "The Keystroke-Level Model (Card, Moran & Newell, 1980) predicts **error-free expert execution time** for a specified method by decomposing it into primitive operators — K (keystroke), P (point), H (home hands), D (draw), M (mental preparation) and R (system response) — and summing their unit times: `T = Σ operator times`. It is the simplest member of the GOMS family of models.",
  primaryType: "model",
  secondaryTypes: ["method", "formula"],
  domain: "frameworks",
  subcategory: "analytical-models",
  tags: ["GOMS", "task analysis", "expert performance", "predictive evaluation", "efficiency", "shortcuts"],
  difficulty: "intermediate",
  disciplines: ["Human-computer interaction", "Cognitive engineering", "Usability engineering"],
  learningObjectives: [
    "Encode a task method as a sequence of KLM operators.",
    "Calculate predicted execution time using standard operator values and mental-operator placement rules.",
    "Compare alternative designs (e.g. menus vs shortcuts) by predicted expert time.",
    "Explain what the KLM cannot predict: learning, errors, novice behaviour and method choice.",
  ],
  prerequisites: ["fitts-law"],

  levels: {
    beginner: {
      explanation: [
        "Imagine timing every small physical and mental step of a routine task: pressing a key, moving the mouse to a button, moving your hand from keyboard to mouse, pausing to think 'what next?'. The Keystroke-Level Model gives each kind of step a standard time and **adds them up** to predict how long the task takes.",
        "It predicts the time for an **experienced user who knows exactly what to do and makes no mistakes**. That sounds narrow, but it is very useful: it lets you compare two designs on paper — before building anything — and see which one is faster for people who use it every day.",
      ],
      analogy:
        "It is like estimating a recipe's preparation time by adding up 'chop an onion: 1 minute', 'boil water: 5 minutes', 'stir: 10 seconds'. The estimate assumes a practised cook who never needs to reread the recipe — so it is a best case, not a beginner's experience.",
      everydayExamples: [
        "Copying text with Ctrl+C / Ctrl+V is faster than right-click → Copy → right-click → Paste for a practised user — the KLM shows by how much.",
        "Entering a date by typing 12/05 versus picking from a calendar widget.",
        "A cashier ringing up an item by barcode versus searching a product list.",
      ],
      vocabulary: [
        { term: "Operator", meaning: "A primitive action with a standard duration, such as a keystroke (K) or a pointing movement (P)." },
        { term: "Method", meaning: "The specific sequence of actions used to accomplish a task in a given design." },
        { term: "Mental operator (M)", meaning: "A pause to prepare, decide or recall before acting — about 1.35 seconds." },
        { term: "Homing (H)", meaning: "Moving a hand between keyboard and mouse." },
      ],
    },
    intermediate: {
      explanation: [
        "To use the KLM you first write down the **method** — the exact sequence of actions an expert would perform — then translate it into operators, insert mental operators using the placement heuristics, and sum. The result is a comparative prediction you can use to choose between designs or quantify the benefit of a shortcut.",
        "Standard unit times from Card, Moran & Newell (1980): **K** depends on typing skill (0.08 s for the best typists to 1.20 s for someone unfamiliar with a keyboard; 0.28 s for an average non-secretarial typist is a common default); **P** = 1.1 s for pointing with a mouse; **H** = 0.4 s to home hands; **M** = 1.35 s for mental preparation; **R(t)** = the system's response time when the user must wait. Later practitioner guidance (Kieras) added **B** = 0.1 s for pressing or releasing a mouse button, so a click is BB = 0.2 s.",
        "The hardest and most consequential judgement is **where to put M operators**. The original rules insert M before keystrokes and pointing actions that start a new cognitive step, then remove M where an action is fully anticipated from the previous one (e.g. pointing to a field and then clicking it), or where actions form a single 'chunk' such as typing a familiar word.",
      ],
      howItWorks: [
        "Write the method: e.g. 'move hand to mouse, point to File menu, click, point to Save, click'.",
        "Translate to operators: H P BB P BB.",
        "Insert M using Rule 0 (before keystrokes and command-selecting pointing): H M P BB M P BB.",
        "Remove anticipated M operators where the next step follows automatically from the previous one — this step requires judgement and should be documented.",
        "Sum the times; add R only where the user must wait for the system before continuing.",
      ],
      implementation: [
        "Model only routine, expert methods with known steps; do not model exploration.",
        "Model each competing design with the same assumptions and the same M-placement decisions, and record them.",
        "Use a K value appropriate to your users; state it explicitly.",
        "Replace P with a Fitts's-law estimate when pointing distances differ substantially between designs.",
        "Validate key predictions with a small timing study of experienced users if decisions depend on the numbers.",
      ],
      scenarios: [
        "Justifying keyboard shortcuts in a high-volume data-entry tool: removing an H and two P operators per record saves seconds per record and hours per week across a team.",
        "Comparing a dropdown with typeahead to a radio-button list for a frequently edited field.",
        "Estimating the time cost of adding a confirmation dialog to a routine action used hundreds of times a day.",
      ],
    },
    advanced: {
      explanation: [
        "Card, Moran & Newell (1980) proposed the KLM as an engineering model: given a task, a method, a command language and the user's motor skill parameters, predict execution time {{src:card-moran-newell-1980}}. It sits at the lowest level of the GOMS framework (Goals, Operators, Methods, Selection rules) developed in their 1983 book {{src:card-moran-newell-1983}}.",
        "The model deliberately excludes acquisition time (understanding the task), method selection, learning and errors. Its central theoretical commitment is that **skilled behaviour is routine cognitive skill** decomposable into serial, additive operators — an assumption that holds reasonably for routine tasks and breaks down when tasks overlap in parallel or require problem solving.",
        "John & Kieras (1996) placed the KLM within the GOMS family alongside CMN-GOMS, NGOMSL and CPM-GOMS, the last of which models parallel perceptual, cognitive and motor activity using critical-path analysis {{src:john-kieras-1996}}.",
      ],
      evidence: [
        "In their original validation across a range of tasks and systems, Card, Moran & Newell reported KLM predictions within roughly a fifth of observed expert times on average — good enough for design comparisons, not for precise forecasting {{src:card-moran-newell-1980}}.",
        "Subsequent GOMS research reported useful predictive accuracy in applied settings, and showed analysts' choices about method and M placement are the main source of variation between predictions {{src:john-kieras-1996}}.",
      ],
      debates: [
        "**M placement is subjective.** Two analysts can produce different predictions for the same method; documenting rules and decisions is essential.",
        "**Operator values date from 1980s hardware.** P = 1.1 s reflects early mouse studies; modern devices, touch and high-DPI screens differ. Many practitioners keep the original values for comparability and replace P with Fitts estimates when needed.",
        "**Touch and mobile.** Researchers have proposed adapted operators for touchscreens and gestures; there is no single agreed set.",
      ],
      alternativeModels: [
        "**[[goms|GOMS]] family** — CMN-GOMS and NGOMSL model goal hierarchies and learning; CPM-GOMS models parallel activity.",
        "**[[fitts-law|Fitts's law]]** — a more precise replacement for the fixed P operator.",
        "**[[cognitive-walkthrough|Cognitive walkthrough]]** — another analytic method, but focused on learnability for first-time users rather than expert speed.",
      ],
    },
  },

  origin: {
    contributors: ["Stuart K. Card", "Thomas P. Moran", "Allen Newell"],
    period: "1980, Xerox PARC",
    problem:
      "Designers lacked engineering-style tools to predict human performance before building systems, so interface choices were made by intuition or costly testing.",
    narrative: [
      "Card, Moran and Newell published the KLM in Communications of the ACM in 1980, with operator times and heuristic rules for mental operators {{src:card-moran-newell-1980}}.",
      "Their 1983 book, The Psychology of Human-Computer Interaction, placed it within the Model Human Processor and the GOMS framework {{src:card-moran-newell-1983}}.",
      "David Kieras's widely used practitioner tutorial later refined the procedure, including a separate mouse-button operator {{src:kieras-2001-klm}}.",
    ],
  },

  application: {
    summary: [
      "Use the KLM to **compare designs for efficiency of routine, high-frequency tasks** — especially in enterprise, operational and data-entry software, where small per-task savings multiply across thousands of repetitions.",
    ],
    web: [
      "Compare checkout or form-entry methods (typing vs selecting, single page vs multi-step) for returning users.",
      "Quantify the benefit of autofill and sensible defaults.",
    ],
    mobile: [
      "Use with adapted operators (tap, swipe) to compare navigation methods; validate on device because touch times differ from mouse values.",
    ],
    enterprise: [
      "Build a business case for shortcuts, bulk actions and keyboard-only workflows.",
      "Estimate the cost of new confirmation steps in high-volume operational tasks.",
    ],
    services: [
      "Call-centre and back-office tools: multiply predicted savings by task volume to estimate staff-time impact.",
    ],
    steps: [
      "Choose a benchmark task and specify the expert method in each design.",
      "Encode each method as operators (K, P, H, BB, D, R).",
      "Insert and prune M operators consistently; document every decision.",
      "Sum operator times; compare designs.",
      "Multiply savings by task frequency to estimate impact; validate with a timing study if the decision is high-stakes.",
    ],
  },

  whenToUse: [
    "Comparing alternative designs for routine tasks performed by skilled users.",
    "Estimating the efficiency benefit of shortcuts, defaults or fewer steps.",
    "Early design, before prototypes exist or when testing experts is expensive.",
  ],
  whenNotToUse: [
    "Evaluating learnability, discoverability or first-time use.",
    "Tasks dominated by problem solving, reading, creativity or decision-making.",
    "Predicting error rates or satisfaction.",
    "Absolute forecasting where ±20% would mislead a decision.",
  ],
  advantages: [
    "Fast, cheap and requires no participants.",
    "Makes efficiency trade-offs explicit and auditable.",
    "Useful for building business cases for efficiency improvements.",
  ],
  limitations: [
    "Assumes expert, error-free, serial behaviour.",
    "M placement relies on analyst judgement.",
    "Original operator values reflect 1980s keyboards and mice.",
    "Ignores fatigue, interruptions and parallel activity.",
  ],
  misconceptions: [
    {
      myth: "The KLM predicts how long users will take.",
      reality: "It predicts how long a skilled user takes to *execute* a known method without errors. Real users also learn, search, hesitate and make mistakes.",
    },
    {
      myth: "Fewer clicks always means a faster task.",
      reality: "The KLM counts mental preparation, homing and typing too. A method with fewer clicks but more decisions or more typing can be slower.",
    },
  ],

  relations: [
    { target: "goms", type: "derived-from", note: "The KLM is the simplest member of the GOMS family introduced by Card, Moran and Newell." },
    { target: "fitts-law", type: "complementary-to", note: "Fitts's law can replace the fixed pointing operator P when distances and target sizes differ between designs." },
    { target: "hick-hyman-law", type: "related-to", note: "The KLM's mental operator lumps together decision and preparation time that Hick-Hyman would make choice-dependent." },
    { target: "cognitive-walkthrough", type: "complementary-to", note: "Both are analytic, participant-free methods: KLM predicts expert efficiency, cognitive walkthrough examines first-time learnability." },
    { target: "usability-testing", type: "contrasts-with", note: "Usability testing observes real behaviour including errors and learning; the KLM predicts idealised expert behaviour." },
    { target: "time-on-task", type: "related-to", note: "KLM predictions estimate a lower bound for expert time on task that empirical measures can be compared against." },
  ],

  formulas: [
    {
      id: "klm-execution-time",
      name: "Keystroke-Level Model execution time",
      expression: "T = n_K·t_K + n_P·t_P + n_H·t_H + n_M·t_M + n_B·t_B + Σ R",
      contributor: "Card, Moran & Newell (1980); B operator from Kieras's practitioner guidance",
      source: "card-moran-newell-1980",
      variables: [
        { symbol: "K", name: "Keystroke", unit: "s", description: "Press a key or button. 0.08 (best typist) · 0.12 (good) · 0.20 (average skilled) · 0.28 (average non-secretary, common default) · 0.50 (typing random letters) · 1.20 (unfamiliar with keyboard)." },
        { symbol: "P", name: "Point", unit: "s", description: "Point with a mouse to a target on screen: 1.1 s average (excludes the button press)." },
        { symbol: "H", name: "Home", unit: "s", description: "Move hand between keyboard and mouse: 0.4 s." },
        { symbol: "M", name: "Mental preparation", unit: "s", description: "Prepare for the next step: 1.35 s. Placement follows heuristic rules." },
        { symbol: "B", name: "Mouse button press or release", unit: "s", description: "0.1 s each; a click is BB = 0.2 s." },
        { symbol: "R(t)", name: "System response", unit: "s", description: "Time the user must wait for the system (only when it blocks the user)." },
      ],
      resultUnit: "seconds",
      assumptions: [
        "The user is an expert who knows the method and makes no errors.",
        "Operators are performed serially and their times are additive.",
        "The chosen K value reflects the target users' typing skill.",
      ],
      conditions: [
        "Use for routine, well-learnt tasks with a defined method.",
        "Apply M-placement decisions consistently across the designs being compared.",
      ],
      steps: [
        "Write the method as a sequence of physical actions.",
        "Encode each action as K, P, H, B or D; add R where the user waits.",
        "Insert M before each new cognitive step (Rule 0), then remove M where actions are anticipated or chunked.",
        "Count each operator and multiply by its unit time.",
        "Sum to obtain T.",
      ],
      workedExample: {
        given: [
          "Task: save a document. User's hands are on the keyboard. Average non-secretary typist, t_K = 0.28 s.",
          "Design A: keyboard shortcut Ctrl+S. Design B: File menu → Save with the mouse.",
        ],
        steps: [
          "A: M K K = 1.35 + 0.28 + 0.28 = 1.91 s.",
          "B (Rule 0): H M P BB M P BB = 0.4 + 1.35 + 1.1 + 0.2 + 1.35 + 1.1 + 0.2 = 5.70 s.",
          "B (second M removed because choosing Save is anticipated once the menu is open): 4.35 s.",
        ],
        result: "Shortcut ≈ 1.9 s vs menu ≈ 4.4–5.7 s, depending on a documented M-placement decision.",
      },
      interpretation: [
        "Use differences between designs, not absolute values. Differences of several seconds on high-frequency tasks are meaningful; sub-second differences are within the model's error.",
        "The spread caused by M placement is a reminder to state and justify modelling decisions.",
      ],
      commonErrors: [
        "Counting a click as a K without stating the convention, or as P.",
        "Inconsistent M placement between designs.",
        "Adding R when the system responds faster than the user can continue anyway.",
        "Modelling novice behaviour.",
      ],
      limitations: [
        "No errors, learning, fatigue or parallel activity.",
        "Operator values may not match modern or touch devices.",
        "Typical accuracy is roughly ±20%: adequate for comparison, not precise prediction.",
      ],
      alternatives: [
        { name: "Fitts-refined pointing", expression: "t_P = a + b · log₂(D / W + 1)", note: "Replaces fixed P with a distance- and size-dependent estimate." },
        { name: "Drawing operator", expression: "t_D = 0.9·n_D + 0.16·l_D", note: "Original operator for drawing n_D straight-line segments of total length l_D (cm)." },
      ],
      calculator: "klm",
    },
  ],

  exercises: [
    {
      id: "keystroke-level-model-ex-copy",
      kind: "calculation",
      level: "intermediate",
      title: "Shortcut vs context menu",
      prompt: [
        "Model copying a selected word to the clipboard in two ways, with hands starting on the mouse and t_K = 0.28 s: (a) right-click → choose Copy; (b) move hand to keyboard and press Ctrl+C.",
        "Show your operator sequences, M decisions and totals.",
      ],
      deliverable: "Two operator strings with totals and a justification of each M.",
      criteria: ["Correct operators", "Explicit M decisions", "Correct arithmetic"],
      exampleSolution: [
        "(a) M BB P BB: 1.35 + 0.2 + 1.1 + 0.2 = 2.85 s (one M; selecting Copy is anticipated once the menu opens).",
        "(b) H M K K: 0.4 + 1.35 + 0.28 + 0.28 = 2.31 s.",
        "The shortcut saves about 0.5 s here — less than often claimed, because homing to the keyboard costs 0.4 s. If hands are already on the keyboard, the saving grows.",
      ],
    },
    {
      id: "keystroke-level-model-ex-business-case",
      kind: "assignment",
      level: "advanced",
      title: "Efficiency business case",
      prompt: [
        "Pick a routine task in a tool used at work (e.g. logging a support ticket). Model the current method and a redesigned method with the KLM.",
        "Multiply the saving by realistic daily task volumes and explain the uncertainty of your estimate, including M placement and operator values.",
      ],
      deliverable: "A one-page estimate with methods, totals, volumes and limitations.",
      criteria: ["Documents assumptions", "Uses consistent M rules", "Discusses ±20% model error and novice users"],
    },
  ],

  quiz: [
    {
      id: "keystroke-level-model-q-predicts",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What does the Keystroke-Level Model predict?",
      options: [
        { text: "Error-free execution time for an expert using a known method", correct: true, explanation: "This is its defined scope." },
        { text: "How long novices take to learn a system", correct: false, explanation: "Learning is excluded; cognitive walkthrough or testing address it." },
        { text: "How satisfied users will be", correct: false, explanation: "The KLM models time only." },
        { text: "How many errors users will make", correct: false, explanation: "The model assumes no errors." },
      ],
      explanation: "The KLM is an expert, error-free execution-time model.",
    },
    {
      id: "keystroke-level-model-q-calc",
      kind: "formula",
      level: "intermediate",
      prompt: "Using standard values (M = 1.35, P = 1.1, B = 0.1, H = 0.4), what is the time for the sequence H M P BB?",
      options: [
        { text: "3.05 s", correct: true, explanation: "0.4 + 1.35 + 1.1 + 0.2 = 3.05 s." },
        { text: "2.95 s", correct: false, explanation: "This counts BB as 0.1 s; a click is a press and a release, 0.2 s." },
        { text: "2.65 s", correct: false, explanation: "This omits homing (H = 0.4 s)." },
        { text: "1.70 s", correct: false, explanation: "This omits the mental operator (M = 1.35 s)." },
      ],
      explanation: "Sum every operator: H 0.4 + M 1.35 + P 1.1 + B 0.1 + B 0.1 = 3.05 s.",
    },
    {
      id: "keystroke-level-model-q-m",
      kind: "scenario",
      level: "advanced",
      prompt: "Two analysts model the same menu task and get 4.4 s and 5.7 s. What is the most likely cause?",
      options: [
        { text: "Different decisions about where to place or remove mental operators (M = 1.35 s)", correct: true, explanation: "One M difference accounts exactly for 1.35 s; M placement is the main source of analyst variation." },
        { text: "One analyst used Fitts's law instead of P", correct: false, explanation: "Possible but would rarely produce exactly 1.35 s of difference." },
        { text: "The model is random", correct: false, explanation: "The KLM is deterministic given the operator sequence." },
        { text: "Different screen resolutions", correct: false, explanation: "Standard P values do not depend on resolution." },
      ],
      explanation: "Because M is large relative to physical operators, M-placement judgements dominate inter-analyst differences. Document them.",
      revise: "keystroke-level-model",
    },
  ],

  flashcards: [
    { id: "keystroke-level-model-fc-1", front: "KLM operator values", back: "K 0.08–1.20 s (0.28 default) · P 1.1 s · H 0.4 s · M 1.35 s · B 0.1 s (click = 0.2 s) · R(t)." },
    { id: "keystroke-level-model-fc-2", front: "What the KLM excludes", back: "Learning, errors, novice exploration, method selection, parallel activity." },
    { id: "keystroke-level-model-fc-3", front: "Biggest source of KLM analyst variation", back: "Placement of mental operators (M)." },
  ],

  references: [
    { source: "card-moran-newell-1980", role: "primary", note: "Original model, operator values and M-placement heuristics." },
    { source: "card-moran-newell-1983", role: "primary", note: "GOMS framework and Model Human Processor." },
    { source: "john-kieras-1996", role: "primary", note: "Comparison of GOMS family techniques." },
    { source: "kieras-2001-klm", role: "explanatory", note: "Practitioner procedure and B operator." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "The KLM is an established engineering model validated in its original study and later GOMS research for routine expert tasks, with errors typically around a fifth of observed times. Evidence does not support using it for learning, errors or novice performance, and its operator values have not been systematically re-established for modern touch devices.",

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
