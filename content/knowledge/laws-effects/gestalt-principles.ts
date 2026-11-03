import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "gestalt-principles",
  slug: "gestalt-principles",
  title: "Gestalt Principles of Perceptual Grouping",
  alternateNames: ["Gestalt laws", "Laws of perceptual organisation", "Gestalt principles"],
  summary:
    "Principles describing how the visual system organises separate elements into groups and figures — by proximity, similarity, continuity, closure, common region, connectedness and more.",
  definition:
    "The Gestalt principles are descriptive regularities of **perceptual organisation**: the visual system tends to group elements that are close together (proximity), alike (similarity), aligned along smooth paths (good continuation), enclosed in a shared region (common region) or physically connected (connectedness), and to perceive whole forms and figures against grounds. They originate in early twentieth-century Gestalt psychology and are now studied quantitatively in vision science.",
  primaryType: "principle",
  secondaryTypes: ["theory", "concept"],
  domain: "laws-effects",
  subcategory: "gestalt",
  tags: ["perception", "grouping", "proximity", "similarity", "layout", "figure-ground", "Prägnanz"],
  difficulty: "beginner",
  disciplines: ["Perceptual psychology", "Visual design", "Information design", "Data visualisation"],
  learningObjectives: [
    "Name and recognise the main grouping principles in everyday interfaces.",
    "Use spacing, similarity and enclosure deliberately to communicate structure.",
    "Explain what happens when grouping cues conflict and how their strength depends on magnitude.",
    "Distinguish the original Gestalt claims from modern quantitative findings and from popular 'laws of UX' framing.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Your eyes don't see a page as a pile of separate dots, lines and words. Your brain automatically **groups** things into units — this label goes with that field, these icons form a toolbar, this text belongs to that picture. The Gestalt principles describe the rules it uses.",
        "The most useful ones for interface design are: **proximity** — things close together look like they belong together; **similarity** — things that look alike (same colour, shape or size) seem related; **common region** — things inside the same box or background are seen as a group; **connectedness** — things joined by a line feel linked; **continuity** — elements arranged along a line or curve are seen as a sequence; and **closure** — we mentally complete shapes with gaps.",
        "'Gestalt' is German for 'form' or 'shape'. The big idea is that the whole we perceive is different from a simple list of its parts.",
      ],
      analogy:
        "At a party, without anyone telling you, you see who is in which conversation — by how close they stand, which way they face and whether they share a table. Gestalt principles are the same instinct applied to shapes on a screen.",
      everydayExamples: [
        "A form where each label sits closer to its own field than to the field above it.",
        "Navigation links styled identically, so you read them as one menu.",
        "Cards that use a shared background to hold an image, title and price together.",
        "A progress indicator of dots connected by a line, read as one sequence of steps.",
      ],
      vocabulary: [
        { term: "Grouping", meaning: "Perceiving several elements as belonging to one unit." },
        { term: "Figure–ground", meaning: "Seeing one region as an object (figure) in front of a background (ground)." },
        { term: "Proximity", meaning: "Nearness: closer elements are grouped." },
        { term: "Similarity", meaning: "Likeness in colour, shape, size or orientation leads to grouping." },
        { term: "Prägnanz", meaning: "The tendency to perceive the simplest, most regular organisation available." },
      ],
    },
    intermediate: {
      explanation: [
        "In interface design, Gestalt principles turn layout into **meaning**: they tell users which elements relate without a single word. Proximity is the most economical tool — consistent spacing scales where *inner* spacing (within a group) is clearly smaller than *outer* spacing (between groups) do most of the grouping work. Common region (cards, panels, table rows) and connectedness (lines, borders) are stronger but visually heavier.",
        "Cues **interact**. If two items are close together but differently coloured, proximity and similarity compete; which wins depends on how large each difference is. Modern research measures this trade-off quantitatively rather than ranking principles in a fixed order {{src:wagemans-2012a}}.",
        "Gestalt principles also explain common failures: a label equidistant between two fields is ambiguous; an unrelated element styled like a button is mistaken for one (similarity); a line separating a heading from its content breaks the group it should introduce (common region and connectedness pulling against proximity).",
      ],
      howItWorks: [
        "**Proximity, similarity and good continuation** were among the factors Wertheimer described in 1923 using dot and line arrays {{src:wertheimer-1923}}.",
        "**Common region** — grouping by a shared enclosed area — was identified much later by Palmer (1992), who showed it can override proximity {{src:palmer-1992}}.",
        "**Uniform connectedness** — regions of uniform property that are connected are perceived as single units, possibly as an early step of organisation — was proposed by Palmer and Rock (1994) {{src:palmer-rock-1994}}.",
        "**Figure–ground** organisation determines which side of an edge 'owns' the contour; cues include size, convexity, symmetry and enclosure.",
      ],
      implementation: [
        "Define a spacing scale and rules: related items use smaller steps, separate groups use larger steps.",
        "Keep form labels closer to their own input than to anything else; group related fields with headings and space before using boxes.",
        "Style all interactive elements of one kind identically, and never style non-interactive elements like them.",
        "Use enclosure (cards, panels) when proximity alone cannot carry the grouping — e.g. in dense grids or varied content.",
        "Align elements on a grid to exploit continuity; misalignment suggests separation.",
      ],
      scenarios: [
        "A settings page where toggles are evenly spaced — introduce section headings and larger gaps between sections so related settings cluster.",
        "A chart legend placed far from the chart — move labels next to lines (direct labelling) so proximity does the matching.",
        "A product grid where prices sit closer to the next card's image than to their own — fix inner/outer spacing.",
      ],
    },
    advanced: {
      explanation: [
        "Wertheimer's 1923 paper set out factors of grouping with demonstrations rather than measurements {{src:wertheimer-1923}}. The Berlin school's broader theory — field forces in the brain and a global tendency towards *Prägnanz* — was criticised and largely abandoned for decades, while the demonstrations themselves remained compelling.",
        "A two-part centenary review in *Psychological Bulletin* documents the revival: grouping strength is now measured psychophysically (e.g. how proximity and similarity trade off), new principles have been added (common region, element and uniform connectedness, common fate generalised to synchrony), and figure–ground organisation is linked to neural border-ownership signals {{src:wagemans-2012a}}. The second part reassesses the theoretical foundations, including simplicity versus likelihood (Bayesian) accounts of why perception prefers certain organisations {{src:wagemans-2012b}}.",
        "For design, the key advanced insight is that grouping is **probabilistic and graded**. Principles are not laws that always win; each is a cue whose effect depends on its magnitude relative to competing cues, the viewer's task and attention, and context.",
      ],
      evidence: [
        "Quantitative studies show grouping by proximity follows lawful relationships with relative distances, and that proximity and similarity can be traded off against each other {{src:wagemans-2012a}}.",
        "Common region was demonstrated to produce grouping that could dominate proximity in controlled displays {{src:palmer-1992}}.",
      ],
      debates: [
        "**Simplicity vs likelihood.** Is perception driven by finding the simplest description (*Prägnanz*) or the most probable interpretation of the world (Bayesian inference)? The two can often be formally related, but the debate continues {{src:wagemans-2012b}}.",
        "**Fixed hierarchy of principles.** Popular design content often states that one principle (e.g. common region) 'beats' another. Evidence supports only magnitude-dependent trade-offs, not a universal ranking.",
        "**'Gestalt laws' in UX.** Practitioner collections list each principle as a separate 'law'. The original theory treats them as aspects of one organising process; splitting them is pedagogically useful but can hide their interactions.",
      ],
      alternativeModels: [
        "**Bayesian perceptual inference** models grouping as inference about the most likely causes of the image.",
        "**Feature integration and guided search** explain how grouped structures are then searched — see [[visual-hierarchy]].",
      ],
    },
  },

  origin: {
    contributors: ["Max Wertheimer", "Wolfgang Köhler", "Kurt Koffka", "Stephen Palmer", "Irvin Rock", "Johan Wagemans and colleagues"],
    period: "1910s–1930s Berlin school of Gestalt psychology; revived and quantified from the 1990s",
    problem:
      "Structuralist psychology tried to explain perception as the sum of elementary sensations. Gestalt psychologists argued that perception is organised into wholes whose properties cannot be derived from the parts alone.",
    narrative: [
      "Wertheimer's 1923 'Untersuchungen zur Lehre von der Gestalt II' presented the grouping factors with dot and line patterns {{src:wertheimer-1923}}.",
      "Interest declined mid-century as the theory's neural speculations were rejected, but the phenomena were adopted by graphic design education.",
      "Palmer and Rock added common region and uniform connectedness in the 1990s {{src:palmer-1992}} {{src:palmer-rock-1994}}; the 2012 Psychological Bulletin reviews summarise a century of research {{src:wagemans-2012a}}.",
    ],
    attributionNote:
      "Closure and figure–ground are often attributed loosely to 'the Gestalt psychologists'; figure–ground organisation was studied notably by Edgar Rubin (1915), who was not formally of the Berlin school. Common region and connectedness are later additions and should not be attributed to Wertheimer.",
  },

  application: {
    summary: [
      "Gestalt principles turn spacing, colour, shape and enclosure into an implicit language of relationships. They underpin spacing scales, card and list patterns, form layout, navigation grouping, icon systems and chart design.",
    ],
    web: [
      "Use spacing tokens with clear inner/outer relationships for forms and content sections.",
      "Use consistent link and button styles (similarity) so users learn what is interactive.",
      "Direct-label charts rather than relying on distant legends.",
    ],
    mobile: [
      "With little room for borders, rely on proximity and backgrounds (common region) to group list items and actions.",
      "Group bottom-sheet actions by function with dividers or spacing.",
    ],
    enterprise: [
      "In dense tables, zebra striping and column groups use common region and similarity to aid scanning.",
      "Group toolbar icons by function with separators so the toolbar reads as several meaningful clusters.",
    ],
    services: [
      "Printed forms and letters benefit from the same grouping rules: keep each question with its answer area and instructions.",
    ],
    steps: [
      "List the relationships the layout must express (what belongs with what).",
      "Express them first with proximity (spacing), then similarity, then enclosure if needed.",
      "Check for unintended groupings: equidistant labels, similar-looking unrelated items.",
      "Blur the layout: the groups you intended should remain visible as clusters.",
      "Test with users: can they say which controls belong together?",
    ],
  },

  whenToUse: [
    "Laying out forms, cards, navigation, dashboards and charts.",
    "Diagnosing why users misread relationships between elements.",
    "Defining spacing and container rules in a design system.",
  ],
  whenNotToUse: [
    "As a substitute for explicit labels when relationships are critical (e.g. which amount is being paid).",
    "As a fixed ranking of principles to settle design arguments — test the actual configuration.",
    "Relying on colour similarity alone to signal groups, which fails for colour-blind users.",
  ],
  advantages: [
    "Communicates structure without additional text or chrome.",
    "Reduces visual noise when spacing does the work of borders.",
    "Grounded in a century of perceptual research.",
  ],
  limitations: [
    "Principles are descriptive, not predictive formulas; strength depends on context and magnitude.",
    "Interactions between cues are hard to anticipate without testing.",
    "Grouping does not convey meaning to screen-reader users — structure must also exist in markup (lists, fieldsets, headings).",
  ],
  misconceptions: [
    {
      myth: "Gestalt principles are strict laws with a fixed order of strength.",
      reality:
        "They are graded cues that trade off depending on magnitudes and context {{src:wagemans-2012a}}.",
    },
    {
      myth: "All the Gestalt principles come from the 1920s.",
      reality:
        "Common region and uniform connectedness were introduced in the 1990s {{src:palmer-1992}} {{src:palmer-rock-1994}}.",
    },
    {
      myth: "Visual grouping is enough for accessibility.",
      reality:
        "Assistive technologies do not perceive spacing or colour; use semantic grouping such as fieldset/legend, lists and headings.",
    },
  ],

  relations: [
    { target: "law-of-proximity", type: "related-to", note: "Proximity is the grouping principle most used in layout and spacing systems." },
    { target: "law-of-similarity", type: "related-to", note: "Similarity in colour, shape or size groups elements and signals shared function." },
    { target: "law-of-common-region", type: "related-to", note: "Shared enclosures such as cards and panels create strong groups (Palmer, 1992)." },
    { target: "law-of-closure", type: "related-to", note: "Closure explains why incomplete shapes and icons are still recognised as wholes." },
    { target: "law-of-continuity", type: "related-to", note: "Good continuation groups aligned elements and supports grid-based layouts." },
    { target: "law-of-pragnanz", type: "related-to", note: "Prägnanz is the overarching tendency towards the simplest organisation." },
    { target: "figure-ground", type: "related-to", note: "Figure–ground organisation separates objects from backgrounds, underpinning layering and modals." },
    { target: "visual-hierarchy", type: "applied-in", note: "Hierarchy relies on grouping to present structure as well as order of emphasis." },
    { target: "spacing-scales", type: "applied-in", note: "Spacing scales encode proximity relationships as reusable tokens." },
  ],

  lab: "gestalt-lab",

  exercises: [
    {
      id: "gestalt-principles-ex-spot",
      kind: "scenario",
      level: "beginner",
      title: "Spot the principles",
      prompt: [
        "Open the home screen of a news or shopping app. Identify one example each of proximity, similarity, common region and connectedness.",
        "For each, state what relationship it communicates to you.",
      ],
      deliverable: "Four annotated examples.",
      criteria: ["Correctly names each principle", "Explains the relationship communicated", "Notes any ambiguous grouping"],
    },
    {
      id: "gestalt-principles-ex-form",
      kind: "critique",
      level: "intermediate",
      title: "Fix an ambiguous form",
      prompt: [
        "A form uses 16 px spacing everywhere: between label and input, between fields, and between sections. Labels sit above inputs.",
        "Propose a spacing system that makes label–input pairs and sections unambiguous. Explain which principle each decision uses and how you'd preserve the grouping for screen-reader users.",
      ],
      deliverable: "A spacing specification (e.g. 4/8/24/40 px roles) and markup notes.",
      criteria: ["Inner spacing clearly smaller than outer spacing", "Section grouping uses space or headings before boxes", "Uses fieldset/legend or headings semantically"],
      exampleSolution: [
        "Label→input 4–8 px; field→next field 24 px; section→section 40 px with a heading. Proximity makes label–input pairs and sections read correctly. Wrap sections in fieldset/legend (or headed regions) so the grouping also exists in the accessibility tree.",
      ],
    },
    {
      id: "gestalt-principles-ex-conflict",
      kind: "assignment",
      level: "advanced",
      title: "Measure a cue conflict",
      prompt: [
        "In the Gestalt lab, set up a grid where proximity groups dots into columns and colour similarity groups them into rows. Vary spacing until your perception flips.",
        "Ask three other people to do the same. Report the spacing ratio at which each perceived the flip and discuss why a fixed ranking of principles is misleading.",
      ],
      criteria: ["Controls one variable at a time", "Reports individual differences", "Connects findings to magnitude-dependent grouping"],
    },
  ],

  quiz: [
    {
      id: "gestalt-principles-q-label",
      kind: "scenario",
      level: "beginner",
      prompt: "In a form, each label is exactly halfway between the field above and the field below. Which principle is being violated, and what is the fix?",
      options: [
        { text: "Proximity — move each label closer to its own field than to any other", correct: true, explanation: "Equidistant labels give no proximity cue, so users can't tell which field a label belongs to." },
        { text: "Closure — draw full borders around every label", correct: false, explanation: "Closure concerns completing incomplete shapes; it doesn't address the ambiguity." },
        { text: "Similarity — make every label a different colour", correct: false, explanation: "Different colours would weaken grouping of labels as a category and add noise." },
        { text: "Figure–ground — add a background image", correct: false, explanation: "Figure–ground doesn't resolve which field a label belongs to." },
      ],
      explanation: "Proximity is the cheapest and strongest everyday grouping cue in forms.",
    },
    {
      id: "gestalt-principles-q-region",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Who introduced 'common region' as a grouping principle, and when?",
      options: [
        { text: "Stephen Palmer, 1992", correct: true, explanation: "Palmer's 1992 Cognitive Psychology paper introduced common region." },
        { text: "Max Wertheimer, 1923", correct: false, explanation: "Wertheimer described proximity, similarity and good continuation, not common region." },
        { text: "Don Norman, 1988", correct: false, explanation: "Norman wrote about affordances and mapping, not this grouping principle." },
        { text: "Jakob Nielsen, 1994", correct: false, explanation: "Nielsen is known for usability heuristics." },
      ],
      explanation: "Several widely taught 'Gestalt' principles are modern additions — attribution matters.",
    },
    {
      id: "gestalt-principles-q-ranking",
      kind: "true-false",
      level: "advanced",
      prompt: "Research shows common region always overrides proximity, whatever the spacing.",
      options: [
        { text: "True", correct: false, explanation: "Common region can dominate proximity in some displays, but outcomes depend on the strength of each cue." },
        { text: "False", correct: true, explanation: "Grouping cues trade off by magnitude; there is no universal fixed ranking." },
      ],
      explanation: "Treat principles as competing cues and test the actual layout.",
    },
  ],

  flashcards: [
    { id: "gestalt-principles-fc-core", front: "Core grouping principles for UI", back: "Proximity, similarity, common region, connectedness, continuity, closure, figure–ground." },
    { id: "gestalt-principles-fc-modern", front: "Which principles were added in the 1990s?", back: "Common region (Palmer 1992) and uniform connectedness (Palmer & Rock 1994)." },
    { id: "gestalt-principles-fc-a11y", front: "Visual grouping and screen readers", back: "Spacing and colour are not conveyed; use fieldset/legend, lists and headings." },
  ],

  references: [
    { source: "wertheimer-1923", role: "primary", note: "Original description of grouping factors." },
    { source: "palmer-1992", role: "primary", note: "Common region." },
    { source: "palmer-rock-1994", role: "primary", note: "Uniform connectedness." },
    { source: "wagemans-2012a", role: "primary", note: "Review of grouping and figure–ground research." },
    { source: "wagemans-2012b", role: "primary", note: "Review of theoretical foundations, including Prägnanz." },
    { source: "laws-of-ux", role: "further", note: "Popular practitioner framing of individual principles as 'laws'." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "The grouping phenomena are robustly demonstrated and increasingly quantified in vision science. Evidence supports graded, interacting cues; it does not support fixed rankings of principles or treating each popular 'Gestalt law' as an independent rule.",

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
