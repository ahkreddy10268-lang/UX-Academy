/**
 * Interactive labs (simulations). Each id maps to a client component in
 * components/labs/registry.tsx. Entries link to a lab with `lab: "<id>"`.
 */
export type Lab = {
  id: string;
  title: string;
  summary: string;
  concepts: string[]; // entry or taxonomy slugs
  kind: "experiment" | "simulation" | "tool";
  assumptions: string[];
};

export const labs: Lab[] = [
  {
    id: "fitts-lab",
    title: "Fitts's Law experiment",
    summary: "Click targets of varying size and distance. Your own movement times are fitted by regression to estimate your a and b.",
    concepts: ["fitts-law"],
    kind: "experiment",
    assumptions: [
      "Times are measured in your browser with performance.now(); precision is typically around 0.1–1 ms but event latency adds noise.",
      "The first trials in each condition include learning effects; outliers are not removed.",
      "Nominal width is used (not effective width) so results are comparable with the formula, not with ISO throughput studies.",
    ],
  },
  {
    id: "hick-lab",
    title: "Hick-Hyman choice reaction",
    summary: "Respond to a lit stimulus among 1, 2, 4 or 8 alternatives and see whether your reaction time grows with the information in the choice.",
    concepts: ["hick-hyman-law"],
    kind: "experiment",
    assumptions: [
      "Alternatives are equally likely, so information = log₂(n).",
      "Keyboard responses are used to avoid adding pointing time.",
      "Error trials are excluded from the mean reaction time.",
    ],
  },
  {
    id: "contrast-lab",
    title: "Colour contrast checker",
    summary: "Pick foreground and background colours and calculate the WCAG 2.x contrast ratio and pass/fail against each threshold.",
    concepts: ["colour-contrast-ratio", "wcag"],
    kind: "tool",
    assumptions: [
      "Implements the WCAG 2.x relative-luminance formula for sRGB colours.",
      "Does not compute APCA or any other perceptual contrast model: they are research in progress, and the WCAG 3 Working Draft (10 September 2026) has not chosen a contrast algorithm. The lab explains what the ratio misses instead.",
      "Does not model transparency, anti-aliasing or font weight beyond the large-text definition.",
    ],
  },
  {
    id: "gestalt-lab",
    title: "Gestalt grouping playground",
    summary: "Change spacing, colour, shape and enclosure of a dot grid and observe which groups you perceive.",
    concepts: ["gestalt-principles", "law-of-proximity", "law-of-similarity", "law-of-common-region"],
    kind: "simulation",
    assumptions: [
      "Grouping is perceptual and subjective — the lab shows the configuration; it cannot measure what you see.",
      "Principles interact; when cues conflict, strength depends on magnitudes, not on a fixed ranking.",
    ],
  },
  {
    id: "hierarchy-lab",
    title: "Visual hierarchy studio",
    summary: "Adjust size, weight, contrast, spacing and position of elements in a card and watch the reading order change.",
    concepts: ["visual-hierarchy"],
    kind: "simulation",
    assumptions: [
      "The 'predicted reading order' is a simple weighted saliency heuristic for teaching, not an eye-tracking model.",
    ],
  },
  {
    id: "cognitive-load-lab",
    title: "Cognitive load comparison",
    summary: "Complete the same task in a dense and a structured interface and compare your time and errors.",
    concepts: ["cognitive-load-theory", "recognition-over-recall", "progressive-disclosure"],
    kind: "experiment",
    assumptions: [
      "A single person's comparison is anecdotal and confounded by order (learning) effects; the lab randomises the order to reduce this.",
    ],
  },
  {
    id: "disclosure-lab",
    title: "Progressive disclosure",
    summary: "Explore the same settings presented all at once, staged, and with an advanced section — and see what each reveals or hides.",
    concepts: ["progressive-disclosure"],
    kind: "simulation",
    assumptions: ["Illustrative interface; no measurement."],
  },
  {
    id: "feedback-lab",
    title: "System status & feedback",
    summary: "Trigger an action and switch between feedback strategies — none, spinner, progress, optimistic UI — under different latencies.",
    concepts: ["visibility-of-system-status", "doherty-threshold", "nielsen-usability-heuristics"],
    kind: "simulation",
    assumptions: [
      "Latency is simulated with timers; real networks vary more.",
      "Time thresholds shown (≈0.1 s, ≈1 s, ≈10 s) are Nielsen's (1993) guidance figures, not hard perceptual limits.",
    ],
  },
  {
    id: "serial-position-lab",
    title: "Serial position memory test",
    summary: "Memorise a list of words, recall them, and plot your recall by position to look for primacy and recency.",
    concepts: ["serial-position-effect", "millers-law", "working-memory-model"],
    kind: "experiment",
    assumptions: [
      "A single run has very few data points; repeat several times before drawing conclusions.",
      "Immediate free recall is tested — delayed recall typically weakens the recency effect.",
    ],
  },
  {
    id: "type-scale-lab",
    title: "Type scale & responsive layout",
    summary: "Generate a modular type scale and preview it at different viewport widths, line lengths and line heights.",
    concepts: ["modular-type-scale", "line-length", "responsive-composition"],
    kind: "tool",
    assumptions: ["Rendering uses your browser's fonts; metrics differ between typefaces."],
  },
  {
    id: "responsive-lab",
    title: "Responsive layout simulator",
    summary: "Drag the viewport width and watch a 12/8/4-column grid reflow at breakpoints, with column widths computed live.",
    concepts: ["responsive-composition", "grid-systems", "grid-calculations"],
    kind: "simulation",
    assumptions: [
      "Breakpoints at 600 and 1024 CSS px are a common convention (similar to several design systems), not a standard.",
      "Column widths use the Formula Lab grid calculation: (container − 2·margin − (columns − 1)·gutter) / columns.",
      "Real layouts also adapt content, not just columns — this shows only the grid mechanics.",
    ],
  },
  {
    id: "steering-lab",
    title: "Steering law tunnel experiment",
    summary: "Drag through straight tunnels of different length and width without touching the walls. Your own times are regressed on A/W to estimate your a and b.",
    concepts: ["steering-law"],
    kind: "experiment",
    assumptions: [
      "Straight tunnels of constant width only — the simplest case of the steering law (Accot & Zhai 1997); curved and narrowing paths integrate width along the path.",
      "Timing starts when the pointer enters the tunnel and stops when it reaches the finish; wall contacts are counted as errors and the tunnel is repeated.",
      "Six conditions, three repetitions each, in random order; there is no practice block, so early trials include learning.",
      "Mouse, trackpad, pen and touch all work but give different constants — compare results only within one device.",
    ],
  },
  {
    id: "cvd-lab",
    title: "Colour vision deficiency simulator",
    summary: "See your palette and text colours as they may appear with protanopia, deuteranopia and tritanopia, and find the pairs that can only be told apart by hue.",
    concepts: ["colour-vision-differences", "colour-contrast-ratio"],
    kind: "simulation",
    assumptions: [
      "Uses the severity-1.0 (dichromacy) matrices of Machado, Oliveira & Fernandes (2009), applied in linear sRGB; milder anomalous trichromacy is not simulated.",
      "Assumes a standard sRGB display; real appearance depends on the screen, ambient light and the individual.",
      "A simulation cannot tell you what anyone actually sees — test with people who have colour vision deficiencies.",
    ],
  },
  {
    id: "jakob-lab",
    title: "Jakob's law: familiar and unfamiliar positions",
    summary: "Find a named control on a mock shop page, sometimes where many sites put it and sometimes in the mirror position, and compare how long each takes you.",
    concepts: ["jakobs-law"],
    kind: "experiment",
    assumptions: [
      "Only position changes: the label, size and distance from the start point are the same in both conditions, so the difference is not a Fitts's-law effect.",
      "The 'familiar' position (top right for Basket and Sign in) is a widely used convention on shopping sites, assumed rather than measured here; your own browsing history decides how familiar it is to you.",
      "Two practice trials are discarded; sixteen scored trials in random order. Medians are reported because search times are skewed.",
      "It tests location conventions only. Unfamiliar icons, wording or interaction patterns carry further costs that this lab does not measure.",
    ],
  },
  {
    id: "colour-lab",
    title: "Colour explorer: hue, saturation and value",
    summary: "Move hue, saturation and value and see the colour, its hex and RGB values, its brightness and its contrast with white and black text.",
    concepts: ["colour-contrast-ratio", "hsv"],
    kind: "simulation",
    assumptions: [
      "Colours are sRGB on a standard display; luminance and contrast use the WCAG 2.x formulas.",
      "HSV's value is max(R, G, B). It is a convenient way to pick colours, not a measure of perceived lightness.",
      "Contrast against pure white and pure black only; check real foreground and background pairs in the contrast checker.",
    ],
  },
  {
    id: "token-lab",
    title: "Design Token Lab",
    summary: "Switch between light, dark and high-contrast themes, remap semantic roles to primitives, edit a primitive's value and watch a live preview, the contrast of every documented pair and the exported token files update together.",
    concepts: ["theme-architecture", "semantic-tokens", "primitive-tokens", "design-tokens", "colour-contrast-ratio"],
    kind: "tool",
    assumptions: [
      "Uses the illustrative library-app palette from the token lessons; the high-contrast theme's 7:1 text target (WCAG 2.2 SC 1.4.6, AAA) is this lab's choice.",
      "Contrast is the WCAG 2.x ratio from lib/formulas, checked only for the documented role pairs; a passing table is necessary, not sufficient, for an accessible theme.",
      "Colour roles only: no typography, spacing or motion tokens. Exports show the shape of DTCG, CSS and Tailwind v4 output, not any one build tool's exact files.",
    ],
  },
];
