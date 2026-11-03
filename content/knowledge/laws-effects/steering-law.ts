import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "steering-law",
  slug: "steering-law",
  title: "Steering Law",
  alternateNames: ["Accot-Zhai steering law", "Law of trajectory-based tasks", "Tunnel law"],
  summary:
    "An empirical model of movement through a constrained path: the time to steer through a tunnel grows linearly with its length divided by its width.",
  definition:
    "The steering law (Accot & Zhai, 1997) predicts the time to move a pointer along a path without leaving its boundaries. For a straight tunnel of length A and width W, `MT = a + b · (A / W)`; for any path, the index of difficulty is the integral of `ds / W(s)` along it. Unlike [[fitts-law|Fitts's law]], difficulty grows *linearly*, not logarithmically, with the length-to-width ratio.",
  primaryType: "law",
  secondaryTypes: ["model", "formula"],
  domain: "laws-effects",
  subcategory: "performance-laws",
  tags: ["pointing", "menus", "cascading menus", "dragging", "gestures", "motor control"],
  difficulty: "intermediate",
  disciplines: ["Human-computer interaction", "Human factors", "Interaction design"],
  learningObjectives: [
    "Explain how steering through a path differs from pointing at a target.",
    "Calculate a steering index of difficulty for a path made of straight segments.",
    "Apply the law to cascading menus, sliders, drag interactions and gesture paths.",
    "Explain why path-based interactions raise accessibility concerns and how WCAG addresses them.",
  ],
  prerequisites: ["fitts-law"],

  levels: {
    beginner: {
      explanation: [
        "Some interactions are not about hitting a target but about **staying on a path** while you move: dragging along a narrow slider, moving sideways along a menu item to reach its sub-menu, or tracing a gesture. If you slip off the path, you fail and must start again.",
        "The steering law describes these movements. **Long, narrow paths are slow; short, wide paths are fast.** And unlike pointing, the cost rises steeply: a path twice as long and equally narrow takes roughly twice as long to steer through.",
      ],
      analogy:
        "Pointing is like throwing a dart: you can move fast and correct at the end. Steering is like carrying a full cup of coffee along a narrow corridor: you have to control the whole journey, and the narrower and longer the corridor, the slower you walk.",
      everydayExamples: [
        "A sub-menu that disappears when your pointer drifts slightly off the parent item while moving across to it.",
        "Dragging a tiny volume slider thumb along a thin track.",
        "Writing your signature inside a small box on a delivery driver's handheld device.",
      ],
      vocabulary: [
        { term: "Tunnel", meaning: "The allowed path the pointer must stay inside while moving." },
        { term: "Amplitude (A)", meaning: "The length of the path to be travelled." },
        { term: "Path width (W)", meaning: "How wide the allowed path is — how much room there is for wobble." },
        { term: "Trajectory-based task", meaning: "A task where the movement path itself matters, not only the end point." },
      ],
    },
    intermediate: {
      explanation: [
        "The steering law is the right model whenever an interface **constrains the path**, not just the destination: cascading (hierarchical) menus, drag-and-drop between narrow targets, sliders, drawing tools, swipe gestures with tolerance zones and path-based security gestures.",
        "Because difficulty grows linearly with A/W, narrow constraints are much more punishing than in pointing. A cascading menu with 20 px rows that must be traversed 150 px horizontally has a steering ID of 7.5; doubling row height halves it.",
        "The practical design response is to **widen the path, shorten it, or remove the constraint**: taller menu rows, sub-menus that open next to the pointer, delays or tolerance regions that keep a sub-menu open during diagonal movement, and alternatives to dragging.",
      ],
      howItWorks: [
        "For a straight tunnel the index of difficulty is simply A / W — a ratio, not a logarithm, so it is not expressed in bits.",
        "For a path made of straight segments with different widths, add each segment's length over its width: ID = Σ Lᵢ / Wᵢ. For curved or varying-width paths the law uses the integral ∫ ds / W(s).",
        "As with Fitts's law, a and b are regression constants that depend on the device, task and population; Accot & Zhai found the law held across several input devices but with different constants {{src:accot-zhai-1999}}.",
      ],
      implementation: [
        "Make menu rows tall enough to traverse comfortably; avoid narrow hover corridors.",
        "Keep sub-menus open briefly when the pointer moves towards them diagonally, or use a tolerance region; prefer click-to-open for deep hierarchies.",
        "Increase slider track hit areas well beyond the visible track; allow clicking on the track to jump and keyboard arrow input to adjust.",
        "Provide single-pointer alternatives for any drag or path-based gesture (WCAG 2.5.1 and 2.5.7).",
        "Avoid requiring precise drags on touch devices where finger occlusion hides the path.",
      ],
      scenarios: [
        "A desktop app's three-level hover menu collapses when users cut diagonally to the sub-menu — a steering failure; adding a short open delay and widening rows reduces errors.",
        "A Kanban board requires dragging cards into narrow columns — offering a 'Move to…' menu provides a non-path alternative.",
        "A photo editor's crop handles are 6 px wide — enlarging the hit area along the drag direction makes resizing less error-prone.",
      ],
    },
    advanced: {
      explanation: [
        "Accot & Zhai (1997) derived the steering law by imagining a tunnel as a sequence of goals that the pointer must cross, each behaving like a Fitts's-law task. As the number of goals grows, the summed logarithmic terms converge to a linear dependence on A/W, giving `MT = a + b · ∫ ds / W(s)` {{src:accot-zhai-1997}}.",
        "They validated the model on straight tunnels, narrowing tunnels and spiral paths, finding strong linear fits. The law therefore unifies a family of trajectory tasks under one index, much as Fitts's law did for pointing.",
        "Later work showed the law's scope and its limits. Device comparisons in steering produced different orderings from pointing studies {{src:accot-zhai-1999}}, and performance is not scale-invariant: very small and very large paths deviate from prediction as different motor strategies take over {{src:accot-zhai-2001}}.",
      ],
      evidence: [
        "Controlled experiments with straight, narrowing and spiral tunnels showed linear relationships between MT and the steering index {{src:accot-zhai-1997}}.",
        "Ahlström (2005) modelled cascading pull-down menu selection by combining Fitts's law and the steering law, and showed that 'force fields' that pull the pointer into sub-menus improved selection {{src:ahlstrom-2005}}.",
        "WCAG 2.2 includes success criteria for path-based gestures (2.5.1) and dragging movements (2.5.7), recognising that trajectory tasks exclude some users with motor impairments {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Constant-width assumption.** Real paths often have no hard boundary — users can drift but pay an error cost. Modelling 'soft' constraints remains an open area.",
        "**Curvature and corners.** The integral form ignores the extra cost of sharp turns, which experiments suggest can matter; corner-specific models have been proposed.",
        "**Speed–accuracy trade-off.** The law assumes users must stay inside the tunnel; if errors are tolerated, users trade speed for accuracy differently and the fit weakens.",
      ],
      alternativeModels: [
        "**[[fitts-law|Fitts's law]]** — for discrete aimed movements to a target; logarithmic in D/W.",
        "**Goal-crossing models** — selecting by crossing a line rather than landing in an area; Accot & Zhai showed crossing also follows a Fitts-like law.",
        "**[[keystroke-level-model|Keystroke-Level Model]]** — uses a fixed pointing operator and has no specific steering operator; steering estimates can refine it.",
      ],
    },
  },

  origin: {
    contributors: ["Johnny Accot", "Shumin Zhai"],
    period: "1997, IBM Almaden Research Center",
    problem:
      "Fitts's law could not describe tasks where the path itself is constrained — drawing, writing, navigating hierarchical menus — which were becoming central to graphical and pen interfaces.",
    narrative: [
      "Accot and Zhai presented the steering law at CHI '97, deriving it from Fitts's law via a goal-crossing thought experiment and testing it on several tunnel shapes {{src:accot-zhai-1997}}.",
      "They extended it in 1999 to compare input devices in trajectory tasks {{src:accot-zhai-1999}} and in 2001 to study how path scale affects performance {{src:accot-zhai-2001}}.",
    ],
    attributionNote:
      "Accot & Zhai built on earlier human-factors studies of constrained movement; their contribution was the general integral formulation and its systematic validation for HCI tasks.",
  },

  application: {
    summary: [
      "Use the steering law to evaluate any interaction where users must **keep the pointer or finger within a corridor**: hierarchical menus, drag-and-drop, sliders, drawing and gesture input. The most effective improvements usually remove the constraint rather than tune it.",
    ],
    web: [
      "Mega-menus and hover menus should tolerate diagonal movement towards open panels.",
      "Range sliders need generous hit areas and keyboard support.",
    ],
    mobile: [
      "Swipe gestures should have generous angular tolerance; avoid long precise drags.",
      "Offer tap alternatives to reorder-by-drag lists.",
    ],
    enterprise: [
      "Design and CAD tools: provide numeric input and snapping as alternatives to precise dragging.",
      "Replace deep hover cascades with click-to-open menus or command palettes.",
    ],
    services: [
      "Signature capture on handheld terminals: make capture areas as large as the device allows.",
    ],
    steps: [
      "Identify interactions where leaving a path causes failure or cancellation.",
      "Break each path into straight segments and estimate length and width.",
      "Compute ID = Σ Lᵢ / Wᵢ and find the segments that dominate.",
      "Widen, shorten or remove those constraints; provide non-path alternatives.",
      "Test with diverse users, including people using alternative pointing devices.",
    ],
  },

  whenToUse: [
    "Analysing cascading menus, sliders, drag-and-drop and gestures.",
    "Comparing devices or techniques for drawing and trajectory tasks.",
    "Arguing for wider tolerance regions in hover-based navigation.",
  ],
  whenNotToUse: [
    "Discrete pointing to a target — use Fitts's law.",
    "Very small or very large path scales, where the law's predictions degrade.",
    "Free-form tasks with no boundary or failure condition.",
  ],
  advantages: [
    "Simple, linear index that is easy to compute for segmented paths.",
    "Explains why hover menus and drags feel fragile.",
    "Supports accessibility arguments for path alternatives.",
  ],
  limitations: [
    "Assumes a hard boundary and constant speed–accuracy criteria.",
    "Ignores additional costs of corners and curvature.",
    "Constants are device- and task-specific.",
    "Scale effects limit predictions at extremes.",
  ],
  misconceptions: [
    {
      myth: "Steering is just Fitts's law applied along a path.",
      reality: "The derivation starts from Fitts's law, but the result is linear in A/W rather than logarithmic, so narrow paths are much more costly than narrow targets.",
    },
    {
      myth: "Hover menus are fine as long as items are big enough to click.",
      reality: "The click is a Fitts's-law task; reaching the sub-menu is a steering task. A menu can pass the first and fail the second.",
    },
  ],

  relations: [
    { target: "fitts-law", type: "derived-from", note: "Accot & Zhai derived the steering law by treating a tunnel as an infinite series of Fitts-type goal crossings." },
    { target: "navigation-patterns", type: "applied-in", note: "Cascading and mega-menu designs are classic steering tasks where corridor width determines error rates." },
    { target: "gesture-design", type: "applied-in", note: "Path-based gestures are trajectory tasks; their tolerance zones are the tunnel width." },
    { target: "wcag", type: "related-to", note: "WCAG 2.5.1 (Pointer Gestures) and 2.5.7 (Dragging Movements) require alternatives to path-based and dragging interactions." },
    { target: "keystroke-level-model", type: "related-to", note: "KLM's single pointing operator does not distinguish steering from pointing; a steering estimate can replace it for menu traversal." },
    { target: "motor-accessibility", type: "influences", note: "Narrow trajectories disproportionately exclude users with tremor or limited fine motor control." },
  ],

  formulas: [
    {
      id: "steering-law-segments",
      name: "Steering law (segmented path)",
      expression: "MT = a + b · ID,  ID = Σ Lᵢ / Wᵢ  (general: ID = ∫ ds / W(s))",
      contributor: "Accot & Zhai (1997)",
      source: "accot-zhai-1997",
      variables: [
        { symbol: "MT", name: "Movement time", unit: "s", description: "Time to traverse the whole path without leaving it." },
        { symbol: "Lᵢ", name: "Segment length", unit: "px, mm", description: "Length of straight segment i of the path." },
        { symbol: "Wᵢ", name: "Segment width", unit: "same unit as L", description: "Width of the corridor along segment i, perpendicular to movement." },
        { symbol: "ID", name: "Steering index of difficulty", unit: "unitless ratio", description: "Sum of length-to-width ratios; not in bits." },
        { symbol: "a", name: "Intercept", unit: "s", description: "Fitted constant for start/stop overhead." },
        { symbol: "b", name: "Slope", unit: "s per unit ID", description: "Fitted constant for time per unit of difficulty for this device and task." },
      ],
      resultUnit: "seconds (MT); unitless (ID)",
      assumptions: [
        "Leaving the corridor counts as an error, so users try to stay inside it.",
        "Each segment has approximately constant width.",
        "a and b were fitted for this device, task and population.",
      ],
      conditions: [
        "Use for constrained trajectories such as menus, sliders, drags and gestures.",
        "Use at typical interface scales; extreme scales deviate from prediction.",
      ],
      steps: [
        "Divide the path into straight segments.",
        "For each segment, measure length Lᵢ along the movement and width Wᵢ across it.",
        "Compute each ratio Lᵢ / Wᵢ and sum them to obtain ID.",
        "With locally fitted constants, compute MT = a + b × ID.",
      ],
      workedExample: {
        given: [
          "Cascading menu: move 150 px horizontally across a 20 px-tall parent item, then 100 px down a 180 px-wide sub-menu.",
          "Illustrative constants: a = 0.20 s, b = 0.10 s per unit ID (not universal).",
        ],
        steps: [
          "Segment 1: 150 / 20 = 7.50",
          "Segment 2: 100 / 180 ≈ 0.56",
          "ID ≈ 8.06 → MT ≈ 0.20 + 0.10 × 8.06 ≈ 1.01 s",
          "With 40 px rows: 150 / 40 + 0.56 ≈ 4.31 → MT ≈ 0.63 s",
        ],
        result: "ID ≈ 8.06 (MT ≈ 1.0 s illustrative). Doubling row height roughly halves the dominant term.",
      },
      interpretation: [
        "The narrowest, longest segment usually dominates — fix it first.",
        "Because the law is linear, halving a width doubles that segment's difficulty; small constraints matter a lot.",
      ],
      commonErrors: [
        "Using a logarithm (Fitts-style) instead of the linear ratio.",
        "Measuring width along the movement instead of across it.",
        "Ignoring that a click at the end adds a Fitts's-law term.",
      ],
      limitations: [
        "Ignores turn costs and curvature.",
        "Assumes hard boundaries; tolerant designs change user strategy.",
        "Accuracy degrades at very small or very large scales.",
      ],
      alternatives: [
        { name: "Straight tunnel", expression: "MT = a + b · A / W", note: "Special case for a single constant-width straight path." },
        { name: "Integral form", expression: "MT = a + b · ∫ ds / W(s)", note: "General form for curved or varying-width paths." },
      ],
      calculator: "steering",
    },
  ],

  exercises: [
    {
      id: "steering-law-ex-menu",
      kind: "calculation",
      level: "intermediate",
      title: "Compare two cascading menus",
      prompt: [
        "Menu A: users move 160 px across a 22 px-tall item, then 120 px down a 200 px-wide sub-menu. Menu B: users move 160 px across a 36 px-tall item, then the sub-menu opens adjacent to the pointer so only 60 px of downward movement is needed in a 200 px-wide panel.",
        "Compute the steering ID for both and identify which design change matters most.",
      ],
      deliverable: "Two ID values and a one-paragraph recommendation.",
      criteria: ["Uses linear L/W ratios", "Sums segments", "Identifies the dominant segment"],
      exampleSolution: [
        "A: 160/22 + 120/200 ≈ 7.27 + 0.60 = 7.87. B: 160/36 + 60/200 ≈ 4.44 + 0.30 = 4.74.",
        "Taller parent rows account for most of the gain (≈2.8 of ≈3.1 units). Reducing sub-menu travel helps but the narrow horizontal corridor dominates.",
      ],
    },
    {
      id: "steering-law-ex-audit",
      kind: "critique",
      level: "intermediate",
      title: "Find the tunnels",
      prompt: [
        "Audit a web app you use for interactions that require staying inside a path: hover menus, sliders, drags, gestures.",
        "For each, describe the failure if the user leaves the path and propose either a wider corridor or a non-path alternative that satisfies WCAG 2.5.7.",
      ],
      deliverable: "A table: interaction, failure mode, proposed fix, WCAG relevance.",
      criteria: ["Identifies at least three trajectory interactions", "Proposes at least one non-drag alternative", "Explains failure consequences"],
    },
  ],

  quiz: [
    {
      id: "steering-law-q-shape",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "How does steering difficulty change if a tunnel becomes twice as long but keeps the same width?",
      options: [
        { text: "It roughly doubles", correct: true, explanation: "The steering index is A/W, which is linear in length." },
        { text: "It increases by one bit", correct: false, explanation: "That is the logarithmic pattern of Fitts's law, not the steering law." },
        { text: "It stays the same", correct: false, explanation: "Longer constrained paths take longer to traverse." },
        { text: "It halves", correct: false, explanation: "Length increases difficulty; width decreases it." },
      ],
      explanation: "Unlike Fitts's law, the steering law is linear in the length-to-width ratio.",
    },
    {
      id: "steering-law-q-id",
      kind: "formula",
      level: "intermediate",
      prompt: "A path has two segments: 120 px long and 20 px wide, then 80 px long and 40 px wide. What is the steering ID?",
      options: [
        { text: "8", correct: true, explanation: "120/20 + 80/40 = 6 + 2 = 8." },
        { text: "3.33", correct: false, explanation: "This is total length / total width (200/60), which is not how segments combine." },
        { text: "2.81 bits", correct: false, explanation: "This applies a logarithm; the steering index is a linear ratio and not in bits." },
        { text: "4", correct: false, explanation: "This averages the two ratios instead of summing them." },
      ],
      explanation: "Each segment contributes Lᵢ/Wᵢ; the ratios are summed.",
    },
    {
      id: "steering-law-q-wcag",
      kind: "scenario",
      level: "advanced",
      prompt: "A team builds a list that can be reordered only by dragging items. Which response best combines the steering law and accessibility requirements?",
      options: [
        { text: "Provide a single-pointer alternative (e.g. 'Move up/down' buttons or a 'Move to…' menu), because dragging is a trajectory task and WCAG 2.5.7 requires an alternative.", correct: true, explanation: "This removes the constraint for those who cannot steer precisely and meets the success criterion." },
        { text: "Make the drag handles larger; that satisfies the steering law.", correct: false, explanation: "Larger handles help the initial grab (Fitts) but not the trajectory or the WCAG alternative requirement." },
        { text: "Dragging is a Fitts's-law task, so no change is needed if targets are 24 px.", correct: false, explanation: "Target size addresses pointing; dragging adds a constrained movement." },
        { text: "Add an animation to guide the drag.", correct: false, explanation: "Animation does not reduce steering difficulty or provide an alternative." },
      ],
      explanation: "Path-dependent interactions need alternatives; widening corridors helps but does not remove the barrier.",
      revise: "steering-law",
    },
  ],

  flashcards: [
    { id: "steering-law-fc-1", front: "Steering law (straight tunnel)", back: "MT = a + b · A/W — linear in the length-to-width ratio." },
    { id: "steering-law-fc-2", front: "Steering vs Fitts", back: "Fitts: log₂(D/W + 1) for reaching a target. Steering: ∫ds/W(s) for staying inside a path." },
  ],

  references: [
    { source: "accot-zhai-1997", role: "primary", note: "Derivation and validation of the steering law." },
    { source: "accot-zhai-1999", role: "primary", note: "Input-device evaluation in steering tasks." },
    { source: "accot-zhai-2001", role: "primary", note: "Scale effects in steering." },
    { source: "ahlstrom-2005", role: "primary", note: "Application to cascading menus." },
    { source: "w3c-wcag-22", role: "standard", locator: "SC 2.5.1 Pointer Gestures; SC 2.5.7 Dragging Movements", note: "Alternatives to path-based gestures and dragging." },
  ],
  evidence: "original-empirical",
  evidenceNote:
    "Supported by controlled laboratory experiments across tunnel shapes and input devices, with good linear fits at typical scales. Evidence is thinner for soft boundaries, sharp corners and extreme scales, and constants do not transfer between devices or tasks.",

  lab: "steering-lab",
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
