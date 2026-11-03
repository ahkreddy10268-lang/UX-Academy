import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "visual-hierarchy",
  slug: "visual-hierarchy",
  title: "Visual Hierarchy",
  alternateNames: ["Hierarchy of emphasis", "Information hierarchy (visual)", "Visual weight"],
  summary:
    "The deliberate ordering of visual emphasis — through size, contrast, colour, position, spacing and grouping — so that people notice, read and act on content in the intended order.",
  definition:
    "Visual hierarchy is the arrangement of visual properties so that elements differ in **perceived importance**, guiding the order in which people attend to them. It works by exploiting how visual attention is guided: features such as size, luminance contrast, colour and position attract attention pre-attentively and in combination with the viewer's goals.",
  primaryType: "principle",
  secondaryTypes: ["concept"],
  domain: "visual",
  subcategory: "composition",
  tags: ["emphasis", "attention", "saliency", "layout", "typography", "scanning", "reading order"],
  difficulty: "beginner",
  disciplines: ["Visual design", "Interaction design", "Cognitive psychology", "Information design"],
  learningObjectives: [
    "Explain what visual hierarchy is and why every screen has one, intended or not.",
    "Use size, contrast, colour, position, spacing and grouping to create a clear order of emphasis.",
    "Relate hierarchy to the science of visual attention — preattentive features, saliency and goal-directed search.",
    "Critique scanning-pattern claims (such as the F-pattern) and evaluate a hierarchy with users.",
  ],
  prerequisites: ["gestalt-principles"],

  levels: {
    beginner: {
      explanation: [
        "When you look at a page, you never take it all in at once. Your eyes jump to something first — usually the biggest, boldest or most colourful thing — then to the next, and so on. **Visual hierarchy is designing that order on purpose.**",
        "Designers control the order with a small set of tools: **size** (bigger reads as more important), **contrast** (darker or brighter against the background stands out), **colour** (one accent colour among neutrals pops), **position** (the top and the start of a line are seen early), **spacing** (space around an element isolates it) and **grouping** (things close together are read as one unit).",
        "A good hierarchy has a clear first thing, a clear second level and quiet supporting detail. A weak one makes everything shout — or nothing — so people must work out for themselves what matters.",
      ],
      analogy:
        "A newspaper front page: the headline is huge, the subheadings are medium, the body text is small, and one photograph anchors the page. You know instantly what the main story is without reading a word.",
      everydayExamples: [
        "A product page where the price and 'Add to basket' button stand out from the specifications.",
        "An email inbox where unread messages are bold and read ones are regular weight.",
        "A form where the primary button is filled with colour and the secondary action is a plain text link.",
      ],
      vocabulary: [
        { term: "Emphasis", meaning: "Making an element stand out more than its surroundings." },
        { term: "Visual weight", meaning: "How strongly an element pulls the eye, from its size, darkness, colour and density." },
        { term: "Focal point", meaning: "The element intended to be seen first." },
        { term: "Saliency", meaning: "How much something stands out from what is around it." },
      ],
    },
    intermediate: {
      explanation: [
        "Hierarchy is relative: an element is emphasised only in comparison with its neighbours. Doubling the size of everything changes nothing. Effective hierarchies use **few levels** (typically three or four), with **clear steps** between them, and reserve the strongest emphasis for the single most important element or action.",
        "Different levers do different jobs. **Size and weight** set the reading order of text (headings → subheadings → body). **Luminance contrast** separates primary from secondary content. **Colour** is best used sparingly to mark interactivity, status or the primary action. **Position** exploits reading conventions (top-left start in left-to-right languages). **Space and grouping** use Gestalt proximity and common region to show what belongs together, so the hierarchy is also a *structure*.",
        "Visual hierarchy should mirror the **information hierarchy** — what matters most to the user's task — and the document structure (heading levels), so that screen-reader users receive the same order of importance that sighted users see.",
      ],
      howItWorks: [
        "Some features are detected **pre-attentively**: a single red item among grey ones, or a much larger item among small ones, is found almost instantly regardless of how many distractors there are {{src:treisman-gelade-1980}}.",
        "Attention is then **guided** by a combination of bottom-up saliency (what stands out) and top-down goals (what the viewer is looking for). Colour, motion, orientation and size are among the attributes most reliably shown to guide attention {{src:wolfe-horowitz-2004}}.",
        "When many elements compete with similar strength, saliency is diluted and search becomes slow and serial — the visual equivalent of everything shouting.",
      ],
      implementation: [
        "Start in greyscale: establish hierarchy with size, weight, spacing and luminance before adding colour.",
        "Define a type scale with distinct steps and map each step to a semantic role (display, heading, body, caption).",
        "Give each view one primary action; demote others to secondary and tertiary button styles.",
        "Use spacing to group related content and separate sections — space is cheaper than borders and boxes.",
        "Squint test or blur test: blur the screen and check whether the intended focal point still dominates.",
        "Match visual order to heading levels and DOM order for assistive-technology users.",
      ],
      scenarios: [
        "A dashboard with twelve equally styled metric cards — introduce a hero metric, group the rest, and demote rarely used ones.",
        "A pricing page where three plans look identical — emphasise the recommended plan through position, size or an accent outline, without hiding the others' key differences.",
        "An error state shown only as small red text under a field — increase salience with an icon, clear message near the field, and an error summary at the top of the form.",
      ],
    },
    advanced: {
      explanation: [
        "Visual hierarchy is a design principle, but it rests on a well-studied science of attention. **Feature integration theory** proposed that simple features are registered in parallel across the visual field while their binding into objects requires focused attention; it explains why a single distinct feature 'pops out' while conjunctions must be searched for {{src:treisman-gelade-1980}}. Later **guided search** accounts treat attention as steered by a priority map combining bottom-up feature contrast with top-down goals {{src:wolfe-horowitz-2004}}.",
        "**Computational saliency models** estimate bottom-up attention from local contrasts in intensity, colour and orientation across scales {{src:itti-koch-2001}}. They can predict early fixations on images reasonably well but are weaker for text-heavy interfaces where task and reading conventions dominate. Treat 'attention heat-map' tools built on such models as rough heuristics.",
        "In visualisation research, preattentive properties are used to design encodings that let viewers detect targets, boundaries and regions rapidly, but their effectiveness depends on the number, similarity and heterogeneity of distractors {{src:healey-enns-2012}}.",
      ],
      evidence: [
        "Laboratory visual-search studies robustly show pop-out for single distinctive features and slower, set-size-dependent search for feature conjunctions {{src:treisman-gelade-1980}}.",
        "Eye-tracking research by Nielsen Norman Group reports an F-shaped scanning pattern on text-heavy pages *when text lacks formatting and readers are not committed*, alongside other patterns (layer-cake, spotted, marking, bypassing, commitment) {{src:pernice-2017-f-pattern}}. This is practitioner research whose raw data is not public — the pattern describes a failure mode of weak hierarchy rather than a universal law.",
      ],
      debates: [
        "**Universal scanning patterns.** The F- and Z-pattern are often taught as rules for where to place content. The evidence describes common behaviour under particular conditions; strong hierarchy (clear headings, front-loaded words, visual grouping) changes the pattern. Design for the content's structure, not for a letter shape.",
        "**Bottom-up vs top-down.** Saliency matters most in the first moments; once users have a goal, they search for what they expect (shaped by [[jakobs-law|conventions]] and [[mental-models|mental models]]). Over-emphasis can even cause 'banner blindness' when salient elements resemble advertising.",
        "**Measurement.** Click maps, eye tracking and first-click tests measure different things; none alone validates a hierarchy.",
      ],
      alternativeModels: [
        "**Information scent** explains navigation choices by perceived relevance of labels rather than visual salience — hierarchy and scent must work together.",
        "**Typographic hierarchy** formalises the text-specific subset of this principle through type scales and styles (see [[modular-type-scale]]).",
      ],
    },
  },

  origin: {
    contributors: ["Graphic design and typography traditions", "Anne Treisman", "Jeremy Wolfe", "Laurent Itti & Christof Koch"],
    period: "Long-standing print practice; scientific grounding from the 1980s onwards",
    problem:
      "Designers needed ways to make complex information scannable, and psychologists sought to explain why some items are found instantly while others need effortful search.",
    narrative: [
      "The practice of hierarchy predates screens: typographers and editorial designers have long used scale, weight and position to rank information.",
      "Cognitive psychology supplied mechanisms: feature integration theory {{src:treisman-gelade-1980}}, guided search {{src:wolfe-horowitz-2004}} and computational saliency models {{src:itti-koch-2001}}.",
      "In web usability, eye-tracking studies popularised scanning patterns and reinforced advice to front-load content and use meaningful headings {{src:pernice-2017-f-pattern}}.",
    ],
    attributionNote:
      "Visual hierarchy has no single originator; it is a practice-derived principle with scientific explanations, not a named law.",
  },

  application: {
    summary: [
      "Hierarchy decides what gets noticed, read and clicked. It shapes type scales, spacing systems, button variants, colour roles and layout grids in a design system, and it is tested by asking whether users find and do the primary task without hesitation.",
    ],
    web: [
      "Use one H1 per page that names the page; make heading levels visually distinct and semantically correct.",
      "Front-load headings, link text and list items with the most informative words.",
      "Distinguish primary, secondary and tertiary actions consistently across the product.",
    ],
    mobile: [
      "With limited space, rely on size, weight and spacing more than on colour, and keep the primary action in a consistent, reachable position.",
      "Use progressive disclosure to keep secondary content from competing on small screens.",
    ],
    enterprise: [
      "Dense tools need hierarchy *within* density: subtle row striping, column grouping and consistent emphasis for key values.",
      "Status colours must be reserved for status; decorative use dilutes their salience.",
    ],
    services: [
      "Letters and forms in a service journey benefit from the same hierarchy rules: the required action and deadline should be the most prominent content.",
    ],
    steps: [
      "Define what users must notice first, second and third for this view's task.",
      "Create a greyscale layout using size, weight, spacing and position only.",
      "Add colour to mark interactivity, the primary action and status.",
      "Blur/squint test and first-click test with representative users.",
      "Check heading structure and DOM order match the visual order.",
    ],
  },

  whenToUse: [
    "Designing any screen, document or component with more than one piece of information.",
    "Diagnosing why users miss important content or actions.",
    "Defining type, colour and button variants in a design system.",
  ],
  whenNotToUse: [
    "As a substitute for good content: hierarchy cannot rescue content that is irrelevant or poorly written.",
    "To manipulate attention towards outcomes that harm users (e.g. visually hiding a cancellation option) — that is a deceptive pattern.",
    "Relying on a single cue, especially colour alone, which fails for colour-blind users and in greyscale contexts.",
  ],
  advantages: [
    "Reduces search time and cognitive effort.",
    "Communicates priorities and structure at a glance.",
    "Supports consistent decisions when encoded in a design system.",
  ],
  limitations: [
    "Perceived importance varies with culture, reading direction and user goals.",
    "Salience effects weaken with familiarity and can trigger banner blindness.",
    "Hard to measure directly; requires behavioural testing.",
  ],
  misconceptions: [
    {
      myth: "Users always read in an F-pattern, so put key content on the left.",
      reality:
        "The F-pattern is reported mainly for poorly formatted text read by uncommitted users; other patterns occur, and strong hierarchy changes behaviour {{src:pernice-2017-f-pattern}}.",
    },
    {
      myth: "More emphasis makes content more noticeable.",
      reality:
        "Emphasis is relative. When many elements are emphasised, none stands out and search slows down.",
    },
    {
      myth: "Visual hierarchy is purely aesthetic.",
      reality:
        "It directly affects task performance through attention guidance, and it must correspond to semantic structure for accessibility.",
    },
  ],

  relations: [
    { target: "gestalt-principles", type: "derived-from", note: "Grouping by proximity, similarity and common region is how hierarchy creates structure, not just order." },
    { target: "preattentive-processing", type: "derived-from", note: "Pop-out of distinctive features explains why size and contrast differences attract attention quickly." },
    { target: "von-restorff-effect", type: "related-to", note: "Distinctive items are more memorable; hierarchy uses isolation to make key items both noticed and remembered." },
    { target: "modular-type-scale", type: "applied-in", note: "A type scale provides the consistent size steps that typographic hierarchy depends on." },
    { target: "colour-contrast-ratio", type: "related-to", note: "Contrast creates emphasis, but accessibility thresholds bound how faint low-emphasis text may become." },
    { target: "cognitive-load-theory", type: "influences", note: "Clear hierarchy reduces extraneous load by sparing users the work of deciding what matters." },
    { target: "fitts-law", type: "complementary-to", note: "Hierarchy helps users find a target; Fitts's law governs how quickly they can then reach it." },
  ],

  lab: "hierarchy-lab",

  exercises: [
    {
      id: "visual-hierarchy-ex-greyscale",
      kind: "assignment",
      level: "beginner",
      title: "Greyscale first",
      prompt: [
        "Take a screenshot of a busy product page. Convert it to greyscale and blur it slightly.",
        "Write down the first three things you notice. Then write down the three things the page *should* make you notice. Compare.",
      ],
      deliverable: "Two ranked lists and one sentence explaining the mismatch.",
      criteria: ["Identifies the actual focal point", "Names the levers causing it (size, contrast, position…)", "Proposes one change per mismatch"],
    },
    {
      id: "visual-hierarchy-ex-redesign",
      kind: "critique",
      level: "intermediate",
      title: "Rebuild a settings card",
      prompt: [
        "A card contains a title, a description, a status badge, three secondary links and a 'Save changes' button, all in the same size and weight.",
        "Redesign it with no more than three type sizes and one accent colour. Justify each decision in terms of task priority.",
      ],
      deliverable: "A sketch or the hierarchy lab configuration plus a short rationale.",
      criteria: ["One clear primary action", "Grouping reflects relationships", "Colour used only for meaning", "Heading semantics considered"],
      exampleSolution: [
        "Title as the largest, semibold text; description one step smaller in secondary colour (≥ 4.5:1); status badge beside the title using a semantic colour plus text label; secondary links grouped below the description in link style; 'Save changes' as the only filled button, aligned with the content edge.",
      ],
    },
    {
      id: "visual-hierarchy-ex-test",
      kind: "assignment",
      level: "advanced",
      title: "Validate with a first-click test",
      prompt: [
        "Design two variants of a landing page hero that differ only in hierarchy. Run a first-click test with at least 10 people per variant for the task 'Start a free trial'.",
        "Report success rate with a confidence interval and discuss whether the difference is meaningful.",
      ],
      criteria: ["Variants differ only in hierarchy", "Reports uncertainty, not just percentages", "Discusses sample-size limits"],
    },
  ],

  quiz: [
    {
      id: "visual-hierarchy-q-relative",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A designer makes every heading, button and price on a page bold and red to 'make them stand out'. What is the most likely result?",
      options: [
        { text: "Nothing stands out, because emphasis is relative", correct: true, explanation: "When many elements share the strongest emphasis, none is distinguished and users must search." },
        { text: "Users notice everything faster", correct: false, explanation: "Competing salience slows search rather than speeding it up." },
        { text: "The page becomes more accessible", correct: false, explanation: "Red text may also fail contrast requirements and relies on colour." },
        { text: "Users read the page in an F-pattern", correct: false, explanation: "Scanning patterns are not caused by bold red elements." },
      ],
      explanation: "Hierarchy needs difference. Reserve the strongest emphasis for the most important item.",
    },
    {
      id: "visual-hierarchy-q-popout",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which target is typically found fastest, regardless of how many distractors are present?",
      options: [
        { text: "A single red circle among grey circles", correct: true, explanation: "A unique simple feature pops out pre-attentively in parallel search." },
        { text: "A red square among red circles and grey squares", correct: false, explanation: "This is a conjunction target; search typically slows as distractors increase." },
        { text: "A circle labelled 'Target' among circles labelled with other words", correct: false, explanation: "Reading labels requires serial attention." },
        { text: "Any element placed at the bottom-right", correct: false, explanation: "Position affects scanning order, but it does not create pop-out." },
      ],
      explanation: "Feature integration theory distinguishes parallel feature search from serial conjunction search {{src:treisman-gelade-1980}}.",
    },
    {
      id: "visual-hierarchy-q-fpattern",
      kind: "true-false",
      level: "advanced",
      prompt: "Eye-tracking research shows the F-pattern is a universal way people read all web pages.",
      options: [
        { text: "True", correct: false, explanation: "The reported conditions are unformatted text and uncommitted readers; other patterns are documented." },
        { text: "False", correct: true, explanation: "The F-pattern is a common default when hierarchy is weak, not a universal law." },
      ],
      explanation: "Use clear headings, front-loaded text and grouping to avoid the F-pattern's downside — missed content on the right and lower down.",
    },
  ],

  flashcards: [
    { id: "visual-hierarchy-fc-levers", front: "Six levers of visual hierarchy", back: "Size, contrast, colour, position, spacing, grouping." },
    { id: "visual-hierarchy-fc-squint", front: "Squint/blur test", back: "Blur the screen: the intended focal point should still dominate." },
    { id: "visual-hierarchy-fc-popout", front: "Pop-out", back: "A unique simple feature (colour, size, orientation) is found in parallel; conjunctions need serial search." },
  ],

  references: [
    { source: "treisman-gelade-1980", role: "primary", note: "Feature integration theory; pop-out vs conjunction search." },
    { source: "wolfe-horowitz-2004", role: "primary", note: "Attributes that guide visual attention." },
    { source: "itti-koch-2001", role: "primary", note: "Computational saliency models." },
    { source: "healey-enns-2012", role: "primary", note: "Preattentive processing applied to visualisation." },
    { source: "pernice-2017-f-pattern", role: "explanatory", note: "Practitioner eye-tracking findings on scanning patterns and conditions." },
    { source: "nngroup-articles", role: "further", note: "Further practitioner articles on visual design and scanning." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "The mechanisms (feature-based attention guidance, pop-out, saliency) are well established in experimental psychology. The design principle built on them is professional consensus; specific layout rules (F/Z patterns, 'top-left first') are conditional practitioner findings and should be validated with users.",

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
