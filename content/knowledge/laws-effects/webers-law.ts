import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "webers-law",
  slug: "webers-law",
  title: "Weber's Law",
  alternateNames: ["Weber's law of just noticeable differences", "Weber fraction", "Relative difference threshold"],
  summary:
    "The smallest change people can reliably detect in a stimulus tends to be a constant fraction of the starting intensity, within a limited range. The fraction differs by sense, task and measurement, and the law bends at low intensities. Use it to plan perceptual tests, never as a design rule.",
  definition:
    "**Weber's law** states that the difference threshold, the smallest change in a stimulus that can be discriminated at a chosen level of reliability, is approximately proportional to the reference intensity: ΔI / I = k, or ΔI = k·I {{src:haigh-apthorp-bizo-2021}}. The ratio k is the **Weber fraction**. It is named after Ernst Heinrich Weber {{src:weber-1834}}, whose experiments on discriminating weights it generalises {{src:penconek-2025}}. The law holds for many stimuli over broad ranges but is violated in many cases, especially at very low intensities {{src:haigh-apthorp-bizo-2021}} {{src:penconek-2025}}. It is a separate claim from Fechner's logarithmic law; the common name 'Weber–Fechner law' joins two logically independent laws {{src:algom-2021}}.",
  primaryType: "law",
  secondaryTypes: [],
  domain: "laws-effects",
  subcategory: "performance-laws",
  tags: ["psychophysics", "just noticeable difference", "difference threshold", "Weber fraction", "perception", "psychometric function", "haptics", "sound", "brightness"],
  difficulty: "intermediate",
  disciplines: ["Psychophysics", "Perception science", "Cognitive psychology", "Human-computer interaction"],
  learningObjectives: [
    "State Weber's law in the form ΔI / I = k, define I, ΔI and k, and calculate a difference threshold from a given Weber fraction.",
    "Explain how a difference threshold is measured with a discrimination task and a psychometric function, and why the reference, the criterion, the repetitions and the range tested change the result.",
    "Distinguish Weber's law from detection thresholds, from the above-threshold ratio principle and from Fechner's logarithmic law, and identify where the law fails.",
    "Plan a perceptual-threshold test for a product's brightness, sound or vibration steps without using the law in place of accessibility requirements or user research.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Hold a 100 g letter and someone adds 2 g: you may notice. Hold a 500 g parcel and they add the same 2 g: you probably will not. To notice a change to the heavier parcel, the added weight has to be larger. Early experiments on weight discrimination found that the change needed grows in proportion to the starting weight {{src:penconek-2025}}.",
        "That pattern is **Weber's law**: the smallest change you can reliably notice, the **just noticeable difference** (JND), is roughly a fixed fraction of what you started with {{src:haigh-apthorp-bizo-2021}}. If the fraction were 0.02, you would need about 2 units of change at 100 units and about 10 units at 500 units. The 0.02 is only an example.",
        "Two cautions keep the idea honest. The fraction is not the same for every sense, task or person, and the law holds only over a range: at very low intensities people need proportionally larger changes {{src:haigh-apthorp-bizo-2021}} {{src:penconek-2025}}. And noticing a *difference* is not the same as noticing that something is there at all.",
      ],
      analogy:
        "Candles in a room: lighting one more candle in a room lit by a single candle makes an obvious difference; lighting one more in a room lit by a hundred is hard to notice. To see a change in the bright room, many more candles must be added.",
      everydayExamples: [
        "A volume step that is obvious when audio is quiet but hard to hear when it is already loud.",
        "One more lamp brightening a dim room noticeably but making little difference in a bright one.",
        "A phone vibration strength step that is felt at low settings but not at high ones.",
        "Noticing a small change in a light bag more easily than the same change in a heavy one.",
      ],
      vocabulary: [
        { term: "Reference intensity (I)", meaning: "The starting stimulus that a change is compared with, in physical units such as grams, decibels or milliseconds." },
        { term: "Difference threshold (ΔI)", meaning: "The smallest change from I that is discriminated at the chosen criterion; also called the just noticeable difference (JND)." },
        { term: "Weber fraction (k)", meaning: "ΔI divided by I. Constant if Weber's law holds; it differs between senses, tasks and conditions." },
        { term: "Absolute threshold", meaning: "The weakest stimulus that can be detected at all. A different measurement from a difference threshold." },
        { term: "Psychometric function", meaning: "A curve of how often people judge the comparison as greater, plotted against the comparison's intensity." },
        { term: "Criterion", meaning: "The response level that defines the threshold, for example 75 % 'greater' judgements; changing it changes ΔI." },
      ],
    },
    intermediate: {
      explanation: [
        "**The law and its terms.** In its strict form, JND / I = k {{src:haigh-apthorp-bizo-2021}}. I is the reference intensity, ΔI (the JND) is the change that can be discriminated at the chosen criterion, and k is the Weber fraction; Haigh and colleagues note that k is also called the Weber constant {{src:haigh-apthorp-bizo-2021}}. 'Constant' means constant across intensities within one experiment, not a single number shared by all senses.",
        "**Worked example (illustrative numbers, not data).** Suppose k = 0.02. At I = 100 units, ΔI = 0.02 × 100 = 2 units. At I = 500 units, ΔI = 0.02 × 500 = 10 units. Both thresholds are the same 2 % of their reference. 0.02 is chosen for easy arithmetic; it is not a human constant, and real Weber fractions depend on the modality, the stimulus and the method.",
        "**How thresholds are measured.** Participants compare a fixed reference with comparison stimuli that differ by controlled amounts, many times each, and say which is greater. Plotting the proportion of 'greater' judgements against the comparison gives a **psychometric function**, and the threshold is read from its spread or slope {{src:haigh-apthorp-bizo-2021}}. In Haigh and colleagues' time study, 24 adults heard pairs of tones and judged which interval was longer, at six reference durations from 100 to 3,200 ms, with 20 comparisons for each of five test intervals per reference {{src:haigh-apthorp-bizo-2021}}.",
        "**Why the details matter.** The threshold depends on the reference used, the criterion that defines it (a 75 % point gives a different ΔI from an 84 % point), the number of repeated trials behind each estimate, and the range of intensities tested. Thresholds are estimates with noise; a fraction measured at one part of the range says nothing about parts that were not tested.",
        "**Not the same as other performance laws.** [[fitts-law|Fitts's law]], the [[steering-law|steering law]] and the [[hick-hyman-law|Hick-Hyman law]] predict how long an action or decision takes; Weber's law describes what change can be perceived. It also differs from the [[power-law-of-practice|power law of practice]], which describes how time falls with repetition.",
      ],
      howItWorks: [
        "Fix a reference stimulus I and present comparison stimuli slightly above and below it {{src:haigh-apthorp-bizo-2021}}.",
        "On each trial, ask which of the two is greater (longer, louder, brighter, heavier); repeat many trials per comparison.",
        "Plot the proportion of 'comparison greater' responses against comparison intensity to obtain a psychometric function {{src:haigh-apthorp-bizo-2021}}.",
        "Read the difference threshold ΔI from the function at a stated criterion, such as the distance from the 50 % point to the 75 % point.",
        "Repeat at several reference intensities and compute ΔI / I at each. A flat set of fractions supports Weber's law over that range; a set that rises at low intensities shows a deviation {{src:penconek-2025}}.",
      ],
      implementation: [
        "State the modality, stimulus, device, environment, task and criterion with every Weber fraction you report.",
        "Measure at several references across the range the product actually uses, including the low end where deviations are expected.",
        "Use enough trials per comparison to estimate each threshold, and report its uncertainty.",
        "Treat thresholds as minimums for a perceivable change, not as targets: a step that is 'just noticeable' in a quiet lab may be missed in real use.",
        "Keep accessibility standards, such as minimum contrast, as requirements in their own right; a threshold study does not replace them.",
      ],
      scenarios: [
        "Illustrative scenario: a smartwatch team designs five vibration strengths. Equal physical steps feel distinct at the weak end and nearly identical at the strong end. The team measures difference thresholds on the actual device, on the wrist, at several reference strengths, and spaces the levels so that each step is comfortably above the measured threshold for the people tested.",
        "Illustrative scenario: a media app's volume control uses equal steps in output level. Testers report that the top steps sound the same. Rather than assume a Weber fraction from a textbook, the team runs a short comparison test with real headphones and speakers, and checks whether the top steps are perceptibly different at all in the listening conditions users have.",
        "Illustrative scenario: a team proposes choosing text colours 'by Weber's law' instead of checking contrast. This is a misuse: legibility requirements are set by accessibility standards and tested with people; a discrimination law about one stimulus dimension does not define them.",
      ],
    },
    advanced: {
      explanation: [
        "**Origins.** Weber's 1834 book, whose title names the pulse, resorption, hearing and touch {{src:weber-1834}}, is the historical source cited here for the law. As later summarised, his experiments on lifted weights found the JND proportional to the reference weight, and the relation was later written JND = k·I {{src:penconek-2025}}. The original Latin was not read for this entry; claims about it come from the secondary sources cited.",
        "**Where it holds and where it bends.** Penconek's review of earlier work describes Weber's law as broadly holding in vision, audition, pressure, smell and taste, but only within a reasonable range of intensities {{src:penconek-2025}}. For light brightness, Weber fractions rise sharply at low intensities; the historical data Penconek cites show the largest fractions, at the dimmest levels, about 70 times those at medium to high levels {{src:penconek-2025}}. For pure tones, the fraction falls slightly with intensity (the 'near miss'), and one review he cites concluded that the law held between 10 and 40 dB for 1,000 Hz tones but not below or above {{src:penconek-2025}}. These figures are reported second-hand here and illustrate that each modality must be measured on its own terms.",
        "**A modern test in one modality.** Haigh, Apthorp and Bizo asked whether time perception follows Weber's law between 100 and 3,200 ms. Individual Weber fractions ranged from 0.05 to 0.12 and condition means from 0.09 to 0.10; the shortest interval had a significantly higher fraction than three middle conditions, and a slight rise at the longest interval was not significant {{src:haigh-apthorp-bizo-2021}}. When models were compared with a criterion that penalises extra parameters, Weber's law and Getty's generalised form fitted best and could not be separated, and individual profiles varied {{src:haigh-apthorp-bizo-2021}}. This supports Weber's law for auditory durations in that range, for that sample and task; it does not show that every sense behaves the same way.",
        "**Threshold form versus ratio principle.** Weber's law proper concerns the threshold. The **ratio principle** extends proportionality above threshold: the difference ΔI(p) needed for any probability p of a correct choice is k·I {{src:penconek-2025}}. In Penconek's computational model, a simulated decision circuit with global inhibition, proportionality approximately held near threshold (p of 2/3 and 0.75) but broke for easy discriminations (p = 0.85), giving a mildly convex relation between intensity and Weber fraction; the model did not explain the size of low-intensity deviations {{src:penconek-2025}}. This is evidence about a proposed mechanism, not a new human experiment.",
        "**Weber's law is not Fechner's law.** Fechner proposed that perceived magnitude grows with the logarithm of physical intensity; that interpretation required the additional assumption that perceived change is proportional to the measured JND {{src:penconek-2025}}. Algom argues that 'Weber–Fechner law' is a misnomer: the two laws are logically independent, Weber's law is not indispensable for deriving Fechner's law, Fechner arguably did not use it in his original derivations, and the principle that subjective distance is set by physical ratio (which he calls the Weber principle) is often mistaken for Weber's law {{src:algom-2021}}. Fechner's law has its own entry in the taxonomy: [[fechners-law|Fechner's law]].",
      ],
      evidence: [
        "Definition, measurement and a modality-specific test: strict form JND / I = k; thresholds from psychometric functions; time perception between 100 and 3,200 ms consistent with Weber's law in 24 adults {{src:haigh-apthorp-bizo-2021}}. Read in full.",
        "Range and deviations, as reviewed: broad support across senses within a range; higher fractions at low intensity, largest for brightness; mild deviations for pure tones {{src:penconek-2025}}. Read in full except some methods detail; historical figures are second-hand.",
        "Mechanism: a computational choice-circuit model reproduces Weber's law near threshold and mild violations of the ratio principle {{src:penconek-2025}}. Model-based, not a human experiment.",
        "Conceptual correction: Weber's law and Fechner's law are logically independent; the Weber principle is distinct from Weber's law {{src:algom-2021}}. Abstract only.",
        "Historical source: Weber (1834), digitised by ETH Library {{src:weber-1834}}. Located, not read.",
        "No source here establishes a universal Weber fraction, a design value for any interface property, or a link between Weber's law and user preference.",
      ],
      debates: [
        "**How far does the law hold?** It is approximate and range-limited; deviations at low intensity are well documented, and whether fractions rise again at high intensity is debated {{src:penconek-2025}}. In time perception, whether sensitivity worsens at longer intervals was not supported in one test {{src:haigh-apthorp-bizo-2021}}.",
        "**What produces it?** Fechner treated it as a law of perception, Wundt as a law of judgement; recent work models it as emerging from how a decision circuit compares two inputs {{src:penconek-2025}}. The mechanism is not settled.",
        "**Which law is meant?** Uses of 'Weber–Fechner law' often blur the threshold law, the Weber principle and Fechner's logarithmic scale {{src:algom-2021}}.",
      ],
      alternativeModels: [
        "**Generalised Weber's law**: ΔI = k·I + c, which makes the Weber fraction k + c/I rise at low intensities; reported as Fechner's generalisation {{src:penconek-2025}}.",
        "**Generalised models for timing**: Getty's model adds a residual noise term, and Killeen and Weiss's a further free parameter, to describe fractions that rise at short durations {{src:haigh-apthorp-bizo-2021}}.",
        "**Fechner's law**: a logarithmic relation between physical intensity and perceived magnitude, a different claim from the threshold law {{src:algom-2021}} {{src:penconek-2025}}.",
      ],
    },
  },

  formulas: [
    {
      id: "webers-law-threshold",
      name: "Weber's law (threshold form)",
      expression: "ΔI / I = k   ⇔   ΔI = k · I",
      contributor: "After E. H. Weber (1834); notation as in Haigh et al. (2021)",
      source: "haigh-apthorp-bizo-2021",
      variables: [
        { symbol: "I", name: "Reference intensity", unit: "stimulus units", description: "The starting stimulus, in physical units of the modality (g, dB, ms, cd/m², vibration amplitude)." },
        { symbol: "ΔI", name: "Difference threshold (JND)", unit: "stimulus units", description: "The smallest change from I discriminated at the chosen criterion, such as 75 % 'greater' judgements." },
        { symbol: "k", name: "Weber fraction", unit: "unitless", description: "ΔI / I. Measured, not assumed; differs between modalities, stimuli, tasks and criteria." },
      ],
      resultUnit: "stimulus units (same as I)",
      assumptions: [
        "I lies within the range over which the law has been shown to hold for this modality and task.",
        "ΔI is estimated from a controlled discrimination task with a stated criterion and enough repeated trials.",
        "k was measured under conditions comparable to the ones it is applied to.",
      ],
      conditions: [
        "Use to describe how difference thresholds scale across a tested range of one stimulus dimension.",
        "Do not extend below or above the tested range, or to another modality, device or population, without measuring.",
      ],
      steps: [
        "Measure ΔI at a reference I from a psychometric function at a stated criterion.",
        "Compute k = ΔI / I; repeat at several references.",
        "If the fractions are approximately equal, predict ΔI = k · I for other references inside the tested range.",
        "If they rise at the low end, describe the deviation, for example with ΔI = k · I + c.",
      ],
      workedExample: {
        given: ["Illustrative Weber fraction, not a human constant: k = 0.02. References I = 100 units and I = 500 units."],
        steps: [
          "I = 100: ΔI = 0.02 × 100 = 2 units",
          "I = 500: ΔI = 0.02 × 500 = 10 units",
          "Check: 2 / 100 = 10 / 500 = 0.02",
        ],
        result: "A threshold of 2 units at 100 and 10 units at 500: the absolute step grows fivefold while the relative step stays 2 %.",
      },
      interpretation: [
        "Smaller k means finer discrimination in that modality and task.",
        "ΔI grows with I: the same absolute change is easier to notice at low references than at high ones, inside the range where the law holds.",
        "A threshold is a minimum at a criterion, not a comfortable or meaningful step size.",
      ],
      commonErrors: [
        "Treating an example k (such as 0.02) as a universal human value.",
        "Applying a k from one sense, device or study to another.",
        "Assuming the law holds at very low intensities.",
        "Reading ΔI as the change needed to notice a stimulus at all (that is an absolute threshold).",
        "Calling the law 'Weber–Fechner' and inferring a logarithmic perceived scale from it.",
      ],
      limitations: [
        "Approximate and range-limited; Weber fractions often rise at low intensities.",
        "The value of ΔI depends on the criterion, method and number of trials.",
        "Describes discrimination of one dimension; it does not predict preference, meaning or legibility.",
      ],
      alternatives: [
        { name: "Generalised Weber's law", expression: "ΔI = k · I + c", note: "Weber fraction k + c/I rises at low intensities (reported by Penconek, 2025)." },
        { name: "Ratio principle", expression: "ΔI(p) = k · I for any choice probability p", note: "Proportionality above threshold; broke for easy discriminations in a 2025 model (Penconek, 2025)." },
        { name: "Fechner's law", expression: "perceived magnitude ∝ log I", note: "A separate law about perceived magnitude; not implied by Weber's law (Algom, 2021)." },
      ],
    },
  ],

  origin: {
    contributors: ["Ernst Heinrich Weber", "Gustav Theodor Fechner", "Wilhelm Wundt", "Daniel Algom"],
    period: "Weber's observations 1834; Fechner's psychophysics 1860; continuing tests and models to the present",
    problem: "How the smallest perceivable change in a stimulus relates to the stimulus's size, and whether one relation holds across senses and intensities.",
    narrative: [
      "In 1834 Weber published anatomical and physiological observations whose title names the pulse, resorption, hearing and touch {{src:weber-1834}}; his weight-discrimination results are the usual origin of the proportional threshold rule {{src:penconek-2025}}. Fechner later interpreted the rule as a law of perception and proposed a logarithmic relation between stimulus and sensation; Wundt instead treated it as a law of judgement {{src:penconek-2025}}.",
      "Experiments from the nineteenth century onwards found the law broadly supported within ranges and violated at low intensities {{src:penconek-2025}}. Modern work tests it in specific domains, such as interval timing {{src:haigh-apthorp-bizo-2021}}, models its mechanism {{src:penconek-2025}}, and corrects the habit of merging it with Fechner's law {{src:algom-2021}}.",
    ],
    attributionNote:
      "Weber (1834) was located as a digitised original (DataCite DOI 10.3931/e-rara-70261) but its Latin text was not read; what Weber found is reported here from Penconek (2025) and the abstract of Algom (2021). Algom was read as an abstract only. Haigh, Apthorp and Bizo (2021) was read in full; Penconek (2025) in full apart from some model details. Historical figures for brightness and tones are Penconek's summaries of older studies, not checked against the originals.",
  },

  application: {
    summary: [
      "Use Weber's law as a reason to measure perceptual steps, not as a value to apply. When a product offers levels of brightness, volume or vibration, the change people can notice may grow with the starting level, so equal physical steps may not feel equal. Test on the actual device, in realistic conditions, with the people who will use it. The law does not set font sizes, button sizes, colour contrast, prices or preferences, and it never replaces accessibility requirements (academy interpretation).",
    ],
    web: [
      "Media players: check whether volume steps near the top of the range are still perceptibly different on common headphones and speakers.",
    ],
    mobile: [
      "Screen brightness and haptics: measure difference thresholds for vibration strengths and brightness steps on the device itself, at several starting levels, before fixing the number of levels.",
    ],
    enterprise: [
      "Alarms and monitoring tools: when severity is signalled by sound or light intensity, verify that each level is reliably distinguishable in the working environment, and pair intensity with another cue so meaning never depends on discrimination alone.",
    ],
    services: [
      "Physical service touchpoints (kiosks, vehicles, wearables): test thresholds under real noise, light and movement, and with people of different ages and sensory abilities.",
    ],
    steps: [
      "Name the stimulus dimension and its physical unit (for example vibration amplitude or output level).",
      "Choose several reference levels across the range the product uses, including the lowest.",
      "Run a two-option comparison task with many trials per comparison, on the real device and in realistic conditions.",
      "Fit psychometric functions, state the criterion, and compute ΔI and ΔI / I at each reference.",
      "Space product levels comfortably above the measured thresholds, and confirm with people that the levels are distinct and meaningful in use.",
      "Keep accessibility requirements and redundant cues (text, icons, patterns) regardless of the result.",
    ],
  },

  whenToUse: [
    "Planning how many perceptibly different levels of brightness, sound or vibration a product can offer, and measuring them.",
    "Explaining why equal physical steps can feel unequal across a range.",
    "Reading psychophysics or perception research that reports Weber fractions.",
  ],
  whenNotToUse: [
    "To set font sizes, spacing, button sizes or type scales; the law describes discrimination thresholds, not design ratios.",
    "To choose colour contrast or decide legibility; use accessibility standards and testing.",
    "To reason about prices, discounts or preferences.",
    "To predict thresholds outside the tested range, especially at low intensities {{src:penconek-2025}}.",
    "As a single 'human' Weber fraction for any sense.",
  ],
  advantages: [
    "Summarises how discrimination scales with intensity in one interpretable number within a range {{src:haigh-apthorp-bizo-2021}}.",
    "Comes with an established measurement method: discrimination tasks and psychometric functions {{src:haigh-apthorp-bizo-2021}}.",
    "Its known failures teach where intuition about 'equal steps' goes wrong {{src:penconek-2025}}.",
  ],
  limitations: [
    "Approximate and range-limited; fractions rise at low intensities, strongly so for brightness {{src:penconek-2025}}.",
    "The fraction depends on modality, stimulus, task, criterion and person; individual profiles can differ {{src:haigh-apthorp-bizo-2021}}.",
    "The above-threshold ratio principle need not hold even where the threshold law does {{src:penconek-2025}}.",
    "Says nothing on its own about perceived magnitude scales, preference or meaning {{src:algom-2021}}.",
    "Weber (1834) was not read, and Algom (2021) only as an abstract.",
  ],
  misconceptions: [
    {
      myth: "There is one Weber fraction for human perception.",
      reality:
        "Each modality, stimulus and method gives its own value; for interval timing between 100 and 3,200 ms one study found fractions of about 0.09 to 0.10 on average {{src:haigh-apthorp-bizo-2021}}, a result that does not transfer to brightness or touch.",
    },
    {
      myth: "Weber's law holds at every intensity.",
      reality: "It holds over limited ranges; fractions are typically higher at low intensities {{src:haigh-apthorp-bizo-2021}} {{src:penconek-2025}}.",
    },
    {
      myth: "The JND is the weakest stimulus you can detect.",
      reality: "That is the absolute (detection) threshold. The JND is the smallest discriminable *difference* from a reference that is already present.",
    },
    {
      myth: "Weber's law and Fechner's law are the same 'Weber–Fechner law'.",
      reality:
        "They are logically independent; Fechner's logarithmic law is not implied by Weber's law, and the ratio-based Weber principle is a third, different idea {{src:algom-2021}}.",
    },
    {
      myth: "Weber's law tells designers which font sizes, prices or contrast ratios to use.",
      reality:
        "It describes discrimination thresholds for one stimulus dimension under controlled conditions. Design values need their own evidence, and contrast is governed by accessibility standards.",
    },
  ],

  relations: [
    { target: "fechners-law", type: "contrasts-with", note: "Fechner's law proposes a logarithmic scale of perceived magnitude; it is a separate claim, not implied by Weber's threshold law." },
    { target: "modular-type-scale", type: "related-to", note: "Ratio-based type scales are sometimes justified by appeal to Weber; the law concerns discrimination thresholds, not the right ratio between sizes." },
    { target: "colour-contrast-ratio", type: "contrasts-with", note: "Contrast ratio is a standardised legibility measure; a Weber fraction is a measured discrimination threshold and does not replace it." },
    { target: "feedback-principle", type: "applied-in", note: "Feedback by sound, light or vibration must change by more than a perceivable amount to be noticed; thresholds should be measured, not assumed." },
    { target: "fitts-law", type: "contrasts-with", note: "Fitts's law predicts movement time; Weber's law describes the smallest perceivable change in a stimulus." },
    { target: "hick-hyman-law", type: "contrasts-with", note: "Hick-Hyman relates decision time to choice uncertainty; Weber's law relates discrimination thresholds to intensity." },
    { target: "steering-law", type: "contrasts-with", note: "The steering law predicts time through a constrained path; Weber's law concerns perception, not movement." },
    { target: "power-law-of-practice", type: "contrasts-with", note: "Both are quantitative laws with limited ranges; the practice law describes time across repetitions, Weber's law perceptual thresholds." },
  ],

  exercises: [
    {
      id: "webers-law-ex-calc",
      kind: "calculation",
      level: "beginner",
      title: "Calculate thresholds and a Weber fraction",
      prompt: [
        "Illustrative numbers. (a) With k = 0.05, find ΔI at references of 40 and 200 units.",
        "(b) A test measures thresholds of 3 units at 60, 6 units at 120 and 12 units at 240. Compute ΔI / I at each reference and say whether these data are consistent with Weber's law.",
        "(c) Using your answer to (b), would a change from 240 to 245 units be expected to reach the threshold? Explain in one sentence.",
      ],
      deliverable: "Worked answers with one sentence of interpretation for each part.",
      criteria: [
        "(a) ΔI = 2 units at 40 and 10 units at 200",
        "(b) Fractions 0.05, 0.05, 0.05: constant across this range, so consistent with Weber's law here",
        "(c) No: a 5-unit change is below the 12-unit threshold at 240",
        "States that the fraction applies only to the tested range and conditions",
      ],
    },
    {
      id: "webers-law-ex-deviation",
      kind: "critique",
      level: "intermediate",
      title: "Interpret a deviation at low intensity",
      prompt: [
        "Illustrative data from a threshold study at five reference levels: I = 2, 5, 20, 80, 320 units; measured ΔI = 0.6, 0.75, 1.5, 4.5, 16.5 units.",
        "Compute ΔI / I at each level. Describe where the data follow Weber's law and where they do not. Show that ΔI = 0.05·I + 0.5 reproduces the data, and explain what the constant 0.5 does to the Weber fraction.",
        "A colleague concludes, 'Weber's law is false for this sense.' Write a more accurate conclusion.",
      ],
      deliverable: "A table of fractions and a short written interpretation.",
      criteria: [
        "Fractions 0.30, 0.15, 0.075, 0.056 and about 0.052",
        "Identifies near-constant fractions at the higher references and a rise at low intensity",
        "Explains that c / I adds most to the fraction when I is small",
        "Concludes that the law approximates the data over part of the range, not everywhere, rather than declaring it simply true or false",
      ],
    },
    {
      id: "webers-law-ex-plan",
      kind: "assignment",
      level: "advanced",
      title: "Plan a haptic threshold test for a wearable",
      prompt: [
        "Your team must choose how many vibration strengths a wrist-worn device should offer for notifications. Plan a study that measures difference thresholds on the device.",
        "Specify the stimulus dimension and its unit, the reference levels (including the lowest), the comparison steps, the task, the number of trials, the criterion, the participants (including older adults and people with reduced touch sensitivity), and the conditions (sitting, walking, worn over clothing).",
        "Explain how you will turn the measured thresholds into product levels, and what redundant cues the design will keep regardless of the result.",
      ],
      deliverable: "A one-to-two-page study plan.",
      criteria: [
        "Uses a controlled comparison task and psychometric functions with a stated criterion",
        "Measures several references across the real range, including the low end",
        "Tests on the real device and in realistic conditions with varied participants",
        "Spaces levels above thresholds with a margin and keeps non-haptic cues",
        "Does not treat a published Weber fraction from another modality as a substitute",
      ],
    },
  ],

  quiz: [
    {
      id: "webers-law-q-jnd",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What does a just noticeable difference (JND) measure?",
      options: [
        { text: "The smallest change from a reference stimulus that is discriminated at a chosen criterion", correct: true, explanation: "It is a difference threshold relative to a reference." },
        { text: "The weakest stimulus that can be detected at all", correct: false, explanation: "That is the absolute (detection) threshold." },
        { text: "How much people like a stimulus", correct: false, explanation: "Weber's law is about discrimination, not preference." },
        { text: "The time needed to respond to a stimulus", correct: false, explanation: "Response time is a different measure." },
      ],
      explanation: "A JND is about telling two stimuli apart, not about detecting one.",
    },
    {
      id: "webers-law-q-calc",
      kind: "formula",
      level: "intermediate",
      prompt: "With an illustrative Weber fraction k = 0.04, what is the difference threshold at a reference of 250 units?",
      options: [
        { text: "10 units", correct: true, explanation: "ΔI = k · I = 0.04 × 250 = 10." },
        { text: "4 units", correct: false, explanation: "That treats k as an absolute step rather than a fraction." },
        { text: "0.04 units", correct: false, explanation: "k is a ratio; multiply it by I." },
        { text: "6,250 units", correct: false, explanation: "That divides I by k instead of multiplying." },
      ],
      explanation: "Multiply the reference by the Weber fraction.",
    },
    {
      id: "webers-law-q-measure",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "A team reports a Weber fraction for vibration but not the criterion used to define the threshold. Why is that a problem?",
      options: [
        { text: "The threshold, and so the fraction, changes with the criterion; a 75 % point and an 84 % point give different values", correct: true, explanation: "The criterion is part of the definition of ΔI." },
        { text: "It is not a problem; Weber fractions are the same at every criterion", correct: false, explanation: "A stricter criterion gives a larger ΔI." },
        { text: "The criterion only matters for absolute thresholds", correct: false, explanation: "Difference thresholds also depend on it." },
        { text: "Criteria apply only to visual stimuli", correct: false, explanation: "Every threshold estimate needs one." },
      ],
      explanation: "Report the reference, criterion, trials and range with every threshold.",
    },
    {
      id: "webers-law-q-fechner",
      kind: "critique",
      level: "advanced",
      prompt: "Which statement about Weber's law and Fechner's law is accurate?",
      options: [
        { text: "They are logically independent; Fechner's logarithmic law is not automatically implied by Weber's threshold law", correct: true, explanation: "Algom (2021) argues the joint name is a misnomer." },
        { text: "They are one law, the Weber–Fechner law", correct: false, explanation: "That is the misnomer Algom criticises." },
        { text: "Weber's law states that perceived magnitude is the logarithm of intensity", correct: false, explanation: "That is Fechner's proposal." },
        { text: "Fechner's law was derived from Weber's 1834 data alone", correct: false, explanation: "Algom argues Fechner arguably did not use Weber's law in his original derivations." },
      ],
      explanation: "Keep the threshold law, the Weber principle and Fechner's scale apart.",
    },
    {
      id: "webers-law-q-evidence",
      kind: "critique",
      level: "advanced",
      prompt: "Penconek (2025) found that the ratio principle broke for easy discriminations. What kind of evidence is this?",
      options: [
        { text: "A computational model of a decision circuit, which shows a possible mechanism but is not a new human experiment", correct: true, explanation: "The study simulated a network of model neurons." },
        { text: "A large human experiment across all senses", correct: false, explanation: "No new human data were collected." },
        { text: "Proof that Weber's law is false", correct: false, explanation: "The model reproduced the law near threshold." },
        { text: "A design guideline for interface brightness", correct: false, explanation: "It makes no design claims." },
      ],
      explanation: "Match the claim to the type of study.",
    },
  ],

  flashcards: [
    { id: "webers-law-fc-1", front: "Weber's law", back: "ΔI / I = k, so ΔI = k·I: the difference threshold is approximately proportional to the reference intensity, within a range." },
    { id: "webers-law-fc-2", front: "Weber fraction k", back: "ΔI divided by I. Measured, not assumed; differs by modality, stimulus, task and criterion. Example k = 0.02 gives 2 at 100 and 10 at 500." },
    { id: "webers-law-fc-3", front: "JND vs absolute threshold", back: "JND: smallest discriminable change from a reference. Absolute threshold: weakest stimulus detectable at all." },
    { id: "webers-law-fc-4", front: "Where Weber's law bends", back: "Fractions rise at low intensities (most for brightness); the above-threshold ratio principle can fail for easy discriminations." },
    { id: "webers-law-fc-5", front: "Weber vs Fechner", back: "Logically independent laws (Algom, 2021). Fechner's is a logarithmic scale of perceived magnitude; it is not implied by Weber's threshold law." },
  ],

  references: [
    { source: "weber-1834", role: "primary", note: "Historical source (Latin); digitised original located, not read." },
    { source: "haigh-apthorp-bizo-2021", role: "primary", note: "Definition, psychometric measurement and a test in time perception; read in full." },
    { source: "algom-2021", role: "primary", note: "Weber's and Fechner's laws are independent; the Weber principle; abstract only." },
    { source: "penconek-2025", role: "primary", note: "Review of range and deviations; ratio principle; computational model; read in full except some model detail." },
  ],
  evidence: "original-empirical",
  evidenceNote:
    "That discrimination thresholds grow roughly in proportion to intensity over limited ranges is a long-standing empirical regularity with many documented exceptions, especially at low intensities. One modern test supports it for auditory durations of 100 to 3,200 ms in 24 adults (read in full). Ranges and deviations for brightness and tones are reported second-hand from a 2025 paper's review; that paper's own contribution is a computational model, not human data. The distinction between Weber's and Fechner's laws rests on a 2021 theoretical paper read as an abstract. Weber's 1834 original was not read. UX applications are the academy's interpretation and were not tested in the cited studies.",

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
