import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "colour-contrast-ratio",
  slug: "colour-contrast-ratio",
  title: "Colour Contrast Ratio",
  alternateNames: ["WCAG contrast ratio", "Luminance contrast ratio", "Relative luminance contrast"],
  summary:
    "A formula from WCAG 2 that compares the relative luminance of two colours, producing a ratio from 1:1 to 21:1 used to judge whether text and interface graphics are legible.",
  definition:
    "The colour contrast ratio is defined in WCAG 2 as `(L1 + 0.05) / (L2 + 0.05)`, where L1 and L2 are the **relative luminances** of the lighter and darker colour. Relative luminance is computed from linearised sRGB channel values weighted by the eye's sensitivity to red, green and blue. The ratio ranges from 1:1 (identical colours) to 21:1 (black on white).",
  primaryType: "formula",
  secondaryTypes: ["metric", "standard"],
  domain: "type-colour",
  subcategory: "colour",
  tags: ["contrast", "accessibility", "luminance", "sRGB", "legibility", "colour tokens", "low vision"],
  difficulty: "beginner",
  disciplines: ["Accessibility", "Colour science", "Visual design", "Design systems"],
  learningObjectives: [
    "Explain why luminance contrast, not hue difference, determines legibility.",
    "Calculate relative luminance and a contrast ratio from hex colours.",
    "Apply the WCAG thresholds for normal text, large text and non-text elements.",
    "Evaluate the formula's known weaknesses and the status of proposed alternatives.",
  ],
  prerequisites: ["colour-models"],

  levels: {
    beginner: {
      explanation: [
        "Text is easy to read when it stands out clearly from its background. What matters most is not *which* colours you use but how different they are in **lightness**. Red text on a green background can be very hard to read even though the hues are completely different, because the two colours can be almost equally light.",
        "The contrast ratio turns that difference into a single number. Black on white is the maximum: **21:1**. Identical colours are **1:1**. The higher the number, the easier the text is to read — especially for people with low vision, older eyes, or anyone reading a phone in bright sunlight.",
        "WCAG sets minimum ratios. Normal body text needs at least **4.5:1**. Large text (roughly 24 px regular or 18.5 px bold and above) needs at least **3:1**, because thicker, larger letters are easier to see. Icons, input borders and other meaningful graphics also need at least **3:1** against what is next to them.",
      ],
      analogy:
        "Imagine photocopying your design in black and white. If the text almost disappears into the background in the grey copy, its contrast ratio is low — colour was doing the work, and lightness wasn't.",
      everydayExamples: [
        "Light grey placeholder text on a white input that is hard to read.",
        "White text on a bright yellow button that seems to vanish.",
        "Road signs designed with dark text on light backgrounds (or the reverse) for long-distance legibility.",
      ],
      vocabulary: [
        { term: "Luminance", meaning: "How much light a colour appears to emit — roughly, how light or dark it is." },
        { term: "Relative luminance (L)", meaning: "Luminance normalised so black is 0 and white is 1." },
        { term: "Contrast ratio", meaning: "(lighter L + 0.05) ÷ (darker L + 0.05), written like 4.5:1." },
        { term: "Large text", meaning: "In WCAG, at least 18 point (about 24 CSS px) or 14 point bold (about 18.66 CSS px)." },
      ],
    },
    intermediate: {
      explanation: [
        "Computing the ratio takes three steps. First, convert each sRGB channel from 0–255 to 0–1 and **linearise** it, undoing the gamma encoding that screens use. Second, combine the three linear channels into relative luminance with weights 0.2126 (R), 0.7152 (G) and 0.0722 (B) — green dominates because human vision is most sensitive to it. Third, divide the lighter luminance plus 0.05 by the darker plus 0.05 {{src:w3c-wcag-22}}.",
        "The thresholds are: **1.4.3 Contrast (Minimum), AA** — 4.5:1 for normal text, 3:1 for large text; **1.4.6 Contrast (Enhanced), AAA** — 7:1 and 4.5:1; **1.4.11 Non-text Contrast, AA** — 3:1 for user-interface components (such as input borders and focus indicators) and meaningful graphics against adjacent colours {{src:w3c-understanding-wcag-22}}.",
        "Thresholds are strict: the ratio is not rounded, so 4.499:1 fails 4.5:1. A classic edge case is `#767676` on white (≈ 4.54:1, passes) versus `#777777` on white (≈ 4.48:1, fails).",
      ],
      howItWorks: [
        "The `+ 0.05` term models a small amount of ambient light reflected from the screen (flare). It stops the ratio becoming infinite for pure black and compresses differences among very dark colours.",
        "Because the formula uses luminance only, two colours of very different hue can have a ratio near 1:1. This is also why designs that rely on colour alone (for example, red vs green status) fail people with colour-vision deficiencies — see 1.4.1 Use of Color.",
        "Inverting a pair (light text on dark vs dark text on light) gives exactly the same ratio, which is one of the formula's criticised properties.",
      ],
      implementation: [
        "Encode contrast in tokens: pair every text and icon token with the surface tokens it may sit on, and test every pair in CI.",
        "Check every state: hover, focus, disabled (exempt from 1.4.3 if inactive, but still consider users), selected, error and dark mode.",
        "Measure text over images or gradients at the lowest-contrast point, or add a scrim behind the text.",
        "Do not lean on the large-text exception for UI labels unless the type genuinely meets the size definition.",
        "Aim above the minimum for thin or light-weight fonts, which render with less effective contrast due to anti-aliasing.",
      ],
      scenarios: [
        "A brand blue `#2F6FDE` on white yields ≈ 4.72:1 — passes AA for body text but fails AAA; white text on the same blue gives the same ratio.",
        "Pure red `#FF0000` on white yields ≈ 4.00:1 — acceptable for large text (3:1) but fails for normal text (4.5:1).",
        "A text input with a `#D0D0D0` border on white fails 1.4.11 non-text contrast; users with low vision may not find the field.",
      ],
    },
    advanced: {
      explanation: [
        "Relative luminance is derived from the **sRGB** colour space (IEC 61966-2-1). The linearisation threshold in current WCAG text is 0.04045: channel values at or below it are divided by 12.92; above it, `((c + 0.055) / 1.055)^2.4`. Older WCAG text used 0.03928, inherited from an earlier sRGB draft; the W3C notes the change (made in May 2021) has no practical effect {{src:w3c-wcag-22}}. Indeed, no 8-bit channel value (n/255) falls between the two thresholds, so results are identical for hex colours.",
        "The 4.5:1 figure has a documented rationale: earlier ergonomic standards recommended 3:1 for normal vision; WCAG multiplies this by about 1.5 to compensate for the contrast-sensitivity loss typical of roughly 20/40 acuity, often associated with ageing {{src:w3c-understanding-wcag-22}}. The thresholds are therefore **engineered safety margins**, not perceptual constants.",
        "The formula is a luminance-contrast metric in a non-perceptually-uniform space. It ignores spatial frequency (stroke width and size), polarity (light-on-dark vs dark-on-light), surrounding luminance and display characteristics — all of which affect real legibility.",
      ],
      evidence: [
        "Contrast sensitivity research supports the general principle that legibility depends on luminance contrast and declines with low vision and age; the specific WCAG thresholds are a standards decision built on that research and earlier ergonomic recommendations {{src:w3c-understanding-wcag-22}}.",
        "Practitioners have documented cases where the WCAG 2 formula rates some combinations — notably mid-tone colours with white text, and dark-mode pairings — inconsistently with perceived legibility. This is the motivation for proposed perceptual alternatives.",
      ],
      debates: [
        "**APCA and WCAG 3.** The Accessible Perceptual Contrast Algorithm (APCA) has been proposed as a perceptually based replacement that accounts for polarity and font size/weight. It is **not** part of any published standard. The September 2026 WCAG 3 Working Draft states that its contrast measure is still to be determined {{src:w3c-wcag-3-wd}}. Using APCA as an *additional* design check is reasonable; replacing WCAG 2 compliance with it is not.",
        "**Symmetry.** Because the ratio is symmetric, it cannot reflect that light text on dark backgrounds often needs different treatment (e.g. heavier weight) than dark on light.",
      ],
      alternativeModels: [
        "**Perceptual lightness difference** in CIE L*a*b* or OKLab (ΔL) — more perceptually uniform, often used to build accessible palettes, but not the normative WCAG 2 test.",
        "**APCA** — proposed polarity-aware lightness-contrast model (Lc values) tied to font size and weight; draft research only.",
      ],
    },
  },

  origin: {
    contributors: ["W3C WCAG Working Group (WCAG 2.0, 2008)"],
    period: "Defined in WCAG 2.0 (2008); unchanged in 2.1 and 2.2 apart from the linearisation-threshold note",
    problem:
      "WCAG 1.0 asked for 'sufficient contrast' without a testable measure. WCAG 2.0 needed an objective, computable test that developers and tools could apply consistently.",
    narrative: [
      "The WCAG 2.0 working group adopted a ratio based on relative luminance in sRGB, borrowing the luminance weights and transfer function of the sRGB standard {{src:iec-61966-2-1}}.",
      "Thresholds were set from earlier ergonomics recommendations with a margin for reduced visual acuity {{src:w3c-understanding-wcag-22}}. Non-text contrast (1.4.11) was added in WCAG 2.1 {{src:w3c-wcag-21}}.",
    ],
    attributionNote:
      "The formula is a standards-body definition; it should not be attributed to a single author.",
  },

  application: {
    summary: [
      "Contrast ratio governs text colour, icon colour, input borders, focus indicators, chart elements and every state of every component. In a design system it is best enforced at the token level, so that compliant combinations are the default and failures are caught automatically.",
    ],
    web: [
      "Check body text, links, placeholder text, captions, error messages and text on images.",
      "Check focus indicators and form-field boundaries against 1.4.11 (3:1).",
    ],
    mobile: [
      "Test in both light and dark appearance; colours that pass on light surfaces often fail when inverted naively.",
      "Consider outdoor glare: aim above minimums for primary content.",
    ],
    enterprise: [
      "Data-dense tables often use low-contrast grey for secondary text — keep it at or above 4.5:1 or users with low vision lose information.",
      "Chart series colours must meet 3:1 against the background and should not rely on colour alone to distinguish series.",
    ],
    services: [
      "Printed and on-screen versions of the same service material should use the same contrast-checked palette.",
    ],
    steps: [
      "List every foreground/background pair your components produce, including states.",
      "Compute ratios (use the calculator) and compare with the applicable threshold.",
      "Adjust lightness, not hue, to fix failures; re-check the brand intent.",
      "Encode passing pairs as token rules and add automated checks.",
      "Validate with real users with low vision where possible.",
    ],
  },

  whenToUse: [
    "Checking any text or meaningful graphic against its background for WCAG 2 compliance.",
    "Building a colour palette and token system with guaranteed accessible pairings.",
    "Comparing alternative colour choices objectively during design review.",
  ],
  whenNotToUse: [
    "As the sole measure of readability — size, weight, typeface, line length and spacing also matter.",
    "To judge colours that convey information by hue alone; contrast ratio says nothing about colour-blind distinguishability between two foregrounds.",
    "Treating draft alternatives (e.g. APCA scores) as compliance evidence.",
  ],
  advantages: [
    "Objective, fully specified and easy to automate.",
    "Widely implemented in tools and browsers' developer tools.",
    "Directly tied to legally referenced success criteria.",
  ],
  limitations: [
    "Not perceptually uniform; ignores polarity, spatial frequency and font weight beyond the large-text cut-off.",
    "Assumes sRGB; wide-gamut (Display P3) colours must be mapped before testing.",
    "Does not handle transparency, gradients or text over images without manual sampling.",
    "A single cut-off encourages 'just passing' rather than comfortable reading.",
  ],
  misconceptions: [
    {
      myth: "A contrast ratio of 4.5:1 means the text is 4.5 times as bright as the background.",
      reality:
        "The ratio is of luminances *plus 0.05* each — a flare-adjusted quotient, not a simple brightness multiple.",
    },
    {
      myth: "Choosing contrasting hues (e.g. complementary colours) guarantees good contrast.",
      reality:
        "Complementary hues can have nearly equal luminance and a ratio close to 1:1. Contrast ratio is about lightness.",
    },
    {
      myth: "4.48:1 rounds up to 4.5:1, so it passes.",
      reality: "The threshold is strict and not rounded; 4.499:1 fails {{src:w3c-understanding-wcag-22}}.",
    },
    {
      myth: "WCAG has switched to APCA.",
      reality: "No published WCAG version uses APCA; WCAG 3 is a draft whose contrast method is undetermined {{src:w3c-wcag-3-wd}}.",
    },
  ],

  relations: [
    { target: "wcag", type: "derived-from", note: "The formula and its thresholds are defined in WCAG 2 success criteria 1.4.3, 1.4.6 and 1.4.11." },
    { target: "colour-vision-differences", type: "complementary-to", note: "Contrast ratio addresses lightness; colour-vision deficiency requires not relying on hue alone (1.4.1)." },
    { target: "design-tokens", type: "applied-in", note: "Accessible colour pairings are enforced most reliably as semantic token rules." },
    { target: "visual-hierarchy", type: "related-to", note: "Contrast is one of the strongest levers of visual hierarchy; accessibility thresholds bound how low secondary contrast may go." },
    { target: "perceptual-colour-spaces", type: "contrasts-with", note: "Perceptual spaces such as CIE Lab model lightness differences more uniformly than the WCAG luminance ratio." },
    { target: "semantic-colour-systems", type: "applied-in", note: "Semantic colour roles (text, surface, border) are defined with contrast constraints between them." },
  ],

  formulas: [
    {
      id: "wcag-contrast-ratio",
      name: "WCAG 2 contrast ratio",
      expression: "CR = (L₁ + 0.05) / (L₂ + 0.05),  L = 0.2126·R + 0.7152·G + 0.0722·B",
      contributor: "W3C WCAG 2.0 Working Group (2008), based on the sRGB standard (IEC 61966-2-1)",
      source: "w3c-wcag-22",
      variables: [
        { symbol: "CR", name: "Contrast ratio", unit: "ratio (x:1)", description: "From 1 to 21." },
        { symbol: "L₁", name: "Lighter relative luminance", unit: "0–1", description: "Relative luminance of the lighter of the two colours." },
        { symbol: "L₂", name: "Darker relative luminance", unit: "0–1", description: "Relative luminance of the darker colour." },
        { symbol: "R, G, B", name: "Linearised channels", unit: "0–1", description: "Each sRGB channel c = value/255, linearised: c ≤ 0.04045 → c/12.92; else ((c + 0.055)/1.055)^2.4." },
      ],
      resultUnit: "ratio, written as x:1",
      assumptions: [
        "Colours are opaque sRGB values.",
        "Text is rendered at the size and weight being judged; thin fonts may need more contrast than the formula implies.",
        "The background behind the text is uniform (or the worst-case point is sampled).",
      ],
      conditions: [
        "Normal text: ≥ 4.5:1 (AA, SC 1.4.3), ≥ 7:1 (AAA, SC 1.4.6).",
        "Large text (≥ 18 pt or ≥ 14 pt bold): ≥ 3:1 (AA), ≥ 4.5:1 (AAA).",
        "UI components and meaningful graphics: ≥ 3:1 against adjacent colours (AA, SC 1.4.11).",
        "Incidental text, logotypes and inactive components are exempt from 1.4.3.",
      ],
      steps: [
        "Convert each channel of both colours from 0–255 to 0–1.",
        "Linearise each channel with the sRGB transfer function.",
        "Compute L = 0.2126·R + 0.7152·G + 0.0722·B for each colour.",
        "Assign L₁ to the lighter colour and L₂ to the darker.",
        "Compute (L₁ + 0.05) / (L₂ + 0.05) and compare with the threshold without rounding.",
      ],
      workedExample: {
        given: ["Foreground #767676 (grey)", "Background #FFFFFF (white)"],
        steps: [
          "0x76 = 118 → c = 118/255 ≈ 0.4627 (> 0.04045)",
          "Linear = ((0.4627 + 0.055)/1.055)^2.4 ≈ 0.1812 for each channel",
          "L(grey) = (0.2126 + 0.7152 + 0.0722) × 0.1812 ≈ 0.1812; L(white) = 1",
          "CR = (1 + 0.05) / (0.1812 + 0.05) = 1.05 / 0.2312 ≈ 4.54",
        ],
        result: "≈ 4.54:1 — passes AA for normal text (4.5:1) and fails AAA (7:1). #777777 on white gives ≈ 4.48:1 and fails AA.",
      },
      interpretation: [
        "Treat thresholds as floors. A body-text pair at 4.6:1 is compliant but not generous; 7:1 or more gives comfortable reading for a wider range of people and conditions.",
        "A ratio below 3:1 for an icon or field border means some users may not perceive the control at all.",
      ],
      commonErrors: [
        "Averaging the RGB channels instead of using the luminance weights.",
        "Skipping linearisation and applying weights to gamma-encoded values.",
        "Testing text against the wrong background (e.g. the page, not the card it sits on).",
        "Rounding 4.47 up to 4.5.",
        "Testing semi-transparent colours without compositing them over the actual background first.",
      ],
      limitations: [
        "Ignores polarity, font weight (except the large-text rule) and spatial frequency.",
        "Defined for sRGB only.",
        "Not a perceptual difference metric.",
      ],
      alternatives: [
        { name: "WCAG 2.x historic threshold", expression: "c ≤ 0.03928 → c/12.92", note: "Earlier WCAG text; identical results for 8-bit colour values." },
        { name: "APCA (proposed, not standard)", expression: "Lc — polarity-aware lightness contrast", note: "Proposed for WCAG 3 discussion; WCAG 3's contrast measure remains undetermined." },
        { name: "Lightness difference", expression: "ΔL* in CIE Lab or ΔL in OKLab", note: "Useful for palette construction; not a WCAG compliance test." },
      ],
      calculator: "contrast-ratio",
    },
  ],
  lab: "contrast-lab",

  exercises: [
    {
      id: "colour-contrast-ratio-ex-calc",
      kind: "calculation",
      level: "beginner",
      title: "Check a button by hand",
      prompt: [
        "A button uses white text (#FFFFFF) on pure red (#FF0000). Calculate the contrast ratio. Is it acceptable for a 16 px regular label? For a 24 px label?",
      ],
      deliverable: "The ratio to two decimals and a pass/fail verdict for each size.",
      criteria: ["Linearises the red channel", "Uses the 0.2126 weight for red", "Applies different thresholds by text size"],
      exampleSolution: [
        "Red: R = 1 → linear 1; G = B = 0. L = 0.2126. White L = 1. CR = 1.05 / 0.2626 ≈ 4.00:1.",
        "16 px regular is normal text → needs 4.5:1 → fails. 24 px (≈ 18 pt) is large text → needs 3:1 → passes AA.",
      ],
    },
    {
      id: "colour-contrast-ratio-ex-tokens",
      kind: "assignment",
      level: "intermediate",
      title: "Audit a palette as token pairs",
      prompt: [
        "Take a design system palette (your own or a public one). List every text and icon token with the surfaces it may appear on, in light and dark themes.",
        "Compute every ratio and mark failures. Propose the smallest lightness adjustments that fix them.",
      ],
      deliverable: "A matrix of foreground × background tokens with ratios, verdicts and fixes.",
      criteria: ["Covers states and both themes", "Applies 1.4.3 and 1.4.11 correctly", "Fixes preserve the palette's character"],
    },
    {
      id: "colour-contrast-ratio-ex-critique",
      kind: "reflection",
      level: "advanced",
      title: "When the formula disagrees with your eyes",
      prompt: [
        "Find a colour pair that passes 4.5:1 but looks hard to read to you, and one that fails but looks fine (try orange backgrounds with white vs black text).",
        "Explain the disagreement using what the formula ignores. What would you ship, and how would you justify it to an auditor?",
      ],
      criteria: ["Identifies polarity, weight or hue effects", "Distinguishes compliance from comfort", "Does not propose non-compliant shipping as acceptable"],
    },
  ],

  quiz: [
    {
      id: "colour-contrast-ratio-q-threshold",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What is the WCAG 2 Level AA minimum contrast ratio for normal-size body text?",
      options: [
        { text: "4.5:1", correct: true, explanation: "SC 1.4.3 requires 4.5:1 for normal text at Level AA." },
        { text: "3:1", correct: false, explanation: "3:1 applies to large text and to non-text UI components, not normal text." },
        { text: "7:1", correct: false, explanation: "7:1 is the Level AAA enhanced threshold (SC 1.4.6)." },
        { text: "21:1", correct: false, explanation: "21:1 is the maximum possible ratio (black on white), not a requirement." },
      ],
      explanation: "Normal text: 4.5:1 (AA), 7:1 (AAA). Large text: 3:1 (AA), 4.5:1 (AAA).",
    },
    {
      id: "colour-contrast-ratio-q-hue",
      kind: "true-false",
      level: "intermediate",
      prompt: "Two colours with opposite hues on the colour wheel always have a high contrast ratio.",
      options: [
        { text: "True", correct: false, explanation: "The ratio depends on luminance only; complementary hues can be almost equally light." },
        { text: "False", correct: true, explanation: "Contrast ratio ignores hue. Pure red and pure green, for example, differ greatly in hue but the ratio reflects only their luminance difference." },
      ],
      explanation: "Lightness, not hue, drives the WCAG ratio — test with numbers, not intuition about the colour wheel.",
    },
    {
      id: "colour-contrast-ratio-q-calc",
      kind: "formula",
      level: "intermediate",
      prompt: "Colour A has relative luminance 1.0 and colour B has 0.2. What is the contrast ratio?",
      options: [
        { text: "4.2:1", correct: true, explanation: "(1.0 + 0.05) / (0.2 + 0.05) = 1.05 / 0.25 = 4.2." },
        { text: "5:1", correct: false, explanation: "This divides 1.0 by 0.2 and forgets the 0.05 flare terms." },
        { text: "0.24:1", correct: false, explanation: "The lighter luminance goes in the numerator, so the ratio is always ≥ 1." },
        { text: "4.5:1", correct: false, explanation: "That is the AA threshold, not this pair's ratio — and this pair fails it." },
      ],
      explanation: "Always add 0.05 to both luminances and put the lighter colour on top.",
    },
    {
      id: "colour-contrast-ratio-q-apca",
      kind: "scenario",
      level: "advanced",
      prompt: "A colleague proposes replacing WCAG 2 contrast checks in the design system with APCA because 'WCAG 3 uses it'. What is the best response?",
      options: [
        { text: "Keep WCAG 2 ratios as the compliance gate; APCA may be used as an extra perceptual check, since WCAG 3 is a draft whose contrast measure is undetermined.", correct: true, explanation: "This matches the current standards status and avoids non-compliance." },
        { text: "Adopt APCA only, since it is more accurate.", correct: false, explanation: "Perceptual merits aside, APCA is not normative; legal and procurement obligations reference WCAG 2." },
        { text: "Drop contrast checks; they are contested anyway.", correct: false, explanation: "Debate about the formula does not remove the legibility need or the compliance requirement." },
        { text: "Use APCA for light mode and WCAG 2 for dark mode.", correct: false, explanation: "Mixing methods by theme does not satisfy WCAG 2 compliance for either." },
      ],
      explanation: "Distinguish published standards from drafts and research proposals.",
      revise: "wcag",
    },
  ],

  flashcards: [
    { id: "colour-contrast-ratio-fc-formula", front: "WCAG contrast ratio formula", back: "(L₁ + 0.05) / (L₂ + 0.05), L₁ = lighter relative luminance." },
    { id: "colour-contrast-ratio-fc-weights", front: "Relative luminance weights", back: "0.2126 R + 0.7152 G + 0.0722 B (linearised sRGB)." },
    { id: "colour-contrast-ratio-fc-thresholds", front: "AA thresholds", back: "Normal text 4.5:1; large text 3:1; UI components & graphics 3:1." },
  ],

  references: [
    { source: "w3c-wcag-22", role: "standard", locator: "Definitions: relative luminance, contrast ratio, large scale; SC 1.4.3, 1.4.6, 1.4.11", note: "Normative formula and thresholds." },
    { source: "w3c-understanding-wcag-22", role: "explanatory", locator: "Understanding SC 1.4.3 Contrast (Minimum); SC 1.4.11 Non-text Contrast", note: "Rationale for 4.5:1 and 3:1; strict thresholds; exemptions." },
    { source: "w3c-wcag-21", role: "standard", note: "Introduced SC 1.4.11 Non-text Contrast." },
    { source: "iec-61966-2-1", role: "primary", note: "sRGB colour space and transfer function underlying relative luminance." },
    { source: "w3c-wcag-3-wd", role: "further", note: "Draft status; contrast measure undetermined." },
    { source: "webaim", role: "further", note: "Contrast checker and practitioner guidance." },
  ],
  evidence: "official-standard",
  evidenceNote:
    "The formula and thresholds are normative WCAG definitions. They rest on luminance-based contrast research and earlier ergonomic standards with a safety margin for low vision; they are not a perceptually uniform model, and known mismatches with perceived legibility are documented and debated.",

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
