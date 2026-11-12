import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "design-language",
  slug: "design-language",
  title: "Design Language",
  alternateNames: ["Visual language", "Product design language", "Interface language"],
  summary:
    "The shared vocabulary and grammar of a product family — type, colour, space, shape, icons, imagery, motion and voice, and the principles for combining them — that makes every screen recognisably part of the same whole.",
  definition:
    "A design language is the **vocabulary** of a product family's interface — typography, colour, space and layout, shape, iconography, imagery, motion and voice — together with the **grammar** that says how those elements combine and the **principles** that justify the choices. It is what lets people recognise a product and predict how it behaves. It is not the component library (that is one implementation of the language), not the brand identity alone (logos and marketing assets), and not a style-guide document (one way to record it). IBM, for example, presents its design language — philosophy, typeface, colour, grid, imagery — separately from Carbon, the system that implements it {{src:ibm-design-language}}.",
  primaryType: "concept",
  secondaryTypes: ["framework"],
  domain: "design-systems",
  subcategory: "foundations",
  tags: ["design language", "brand", "typography", "motion", "visual grammar", "design principles", "design tokens", "multi-platform"],
  difficulty: "intermediate",
  disciplines: ["Visual design", "Design systems", "Brand design", "Motion design", "Content design"],
  learningObjectives: [
    "Distinguish a design language from a brand identity, a style guide and a component library.",
    "Translate a brand principle into concrete interface decisions about type, space, colour and motion.",
    "Encode those decisions as semantic tokens and component contracts.",
    "Carry one design language across web, iOS and Android without breaking platform conventions.",
  ],
  prerequisites: ["design-system"],

  levels: {
    beginner: {
      explanation: [
        "Open two screens from the same library app. One uses a rounded typeface, soft shadows and bouncy animations; the other, built by a different team, uses a condensed typeface, hard edges and no motion at all. Each screen works, but together they feel like two different products, and people start to wonder whether they are.",
        "A **design language** is what prevents this. Like a spoken language, it has a **vocabulary** — the typefaces, colours, spacing, shapes, icons, images, motion and words the product uses — and a **grammar**, the rules for combining them: headings are always in this weight, important actions always look like this, things move this way when they appear. Behind both sit **principles**, such as 'calm and precise', that explain why.",
        "When a design language is clear, anyone on any team can design a new screen that fits, and people using the product recognise it at once.",
      ],
      analogy:
        "An architect's style. You can recognise a building by a particular architect from its proportions, materials and the way light enters, even if you have never seen that building before. The style is not any one wall; it is the consistent way decisions are made.",
      everydayExamples: [
        "Recognising an app's screen from a cropped screenshot because of its typeface and button shape.",
        "Animations that always feel quick and quiet in one product, and lively in another.",
        "Error messages that sound the same, in the same calm tone, across a website and its app.",
      ],
      vocabulary: [
        { term: "Design language", meaning: "The shared vocabulary and grammar of a product family's interface, with the principles behind it." },
        { term: "Vocabulary", meaning: "The elements a language uses: type, colour, space, shape, icons, imagery, motion, voice." },
        { term: "Grammar", meaning: "The rules for combining those elements, such as which weight headings use." },
        { term: "Design principle", meaning: "A short statement of intent that settles design decisions, such as 'calm and precise'." },
        { term: "Brand identity", meaning: "The logo, name and marketing assets; a design language extends brand into interface behaviour." },
      ],
    },
    intermediate: {
      explanation: [
        "A design language is built in layers. **Principles** state intent. **Foundations** turn intent into decisions: a type scale and its tone, a colour strategy, a spacing rhythm, a shape vocabulary (corner radii, borders), an icon style, an imagery style, motion behaviour and a voice. **Patterns and components** apply those decisions to real tasks. Kholmatova's book frames design systems as the way to create design languages for digital products {{src:kholmatova-2017}}.",
        "Motion shows how a principle becomes a rule. Carbon distinguishes **productive** motion — efficient and subtle, for task-focused moments such as button states and dropdowns — from **expressive** motion — vibrant and visible, reserved for occasional significant moments such as opening a page or a system alert; productive motion is significantly faster, and duration grows with the distance an element travels {{src:carbon-motion}}. The principle ('productivity first, expression where it matters') becomes easing curves and durations every component can share.",
        "In atomic design, the abstract parts of a language — colour palettes, fonts, and other invisible elements — are counted among the atoms from which everything else is built {{src:frost-2013}}. That is why a design language is upstream of components: change the language and every component that speaks it changes with it.",
      ],
      howItWorks: [
        "A design language works by constraint: a small set of decisions applied everywhere. People learn its patterns once and recognise them across screens and products, and designers spend effort on the problem instead of re-deciding type, spacing and motion.",
        "It is recorded at several levels of precision: principles in prose, foundations as tokens, grammar as component specifications and usage guidance, and examples as reference screens.",
      ],
      implementation: [
        "Write three to five principles that settle real arguments ('calm before clever'), not slogans.",
        "Turn each foundation into named decisions: type scale and weights, colour roles, spacing scale, radii, icon style, motion styles, voice rules.",
        "Encode the decisions as semantic tokens (for example `motion.duration.productive`, `font.weight.heading`) so components consume the language rather than copying values.",
        "Document the grammar with paired examples: correct and incorrect use of each foundation on the same task.",
        "Respect reduced-motion preferences: motion that is not essential must be able to be turned off [WCAG 2.2 SC 2.3.3 Animation from Interactions, AAA] {{src:w3c-wcag-22}}, and content that moves automatically for more than five seconds needs a way to pause, stop or hide it [SC 2.2.2, A].",
        "Review new components against the language, not only against the component library.",
      ],
      scenarios: [
        "**Illustrative.** A library app's new events section uses its own font and springy transitions. A design-language review traces both to missing decisions; adding expressive motion as a named style for rare moments and keeping events on the productive style resolves it.",
        "**Illustrative.** A council licenses the app with its own brand. The design language's principles, spacing and motion stay; only colour roles and the logo change through a brand theme.",
        "**Critique protocol.** Put five screens from different teams side by side. For each foundation (type, colour, space, shape, icons, imagery, motion, voice), note where they disagree and whether a written decision exists. Missing decisions are the findings, not the screens.",
      ],
    },
    advanced: {
      explanation: [
        "**From brand values to tokens.** A design language is the translation layer between brand strategy and code. Each brand value should be traceable to principles, then to foundation decisions, then to semantic tokens and finally to component contracts. When a decision cannot be traced, it is either missing a principle or arbitrary. Systems such as Material 3 encode these decisions in reference, system and component token classes {{src:m3-design-tokens}}, and Carbon's motion styles are published as shared easing and duration values {{src:carbon-motion}}.",
        "**Multi-platform translation.** One language rarely means identical pixels on every platform. Principles, semantic roles and voice should be shared; the expression of those decisions may adapt to each platform's conventions — native controls, navigation patterns, system type sizes. A language that overrides platform conventions to look identical everywhere trades the user's existing knowledge for the brand's consistency.",
        "**Governance.** A design language needs an owner and a change process: who may propose a new foundation decision, how it is reviewed against principles, and how changes are versioned and rolled out to every product. Without governance, languages drift team by team — the problem they were meant to solve.",
        "**Measuring drift.** Useful signals include the number of raw values that bypass tokens in code, one-off component variants, and how often reviews find foundation decisions missing. These show where the language is not being used; whether that harms users needs research.",
      ],
      evidence: [
        "Design languages are **documented practice**. IBM publishes its language separately from its implementation {{src:ibm-design-language}}; Carbon documents motion styles as language decisions {{src:carbon-motion}}; Material 3 encodes decisions as token classes {{src:m3-design-tokens}}; Kholmatova and Frost describe the practice from experience {{src:kholmatova-2017}} {{src:frost-2016}}. No controlled study was found that measures the effect of a design language on recognition, learnability or delivery speed; such claims are practitioner reports.",
      ],
      debates: [
        "**Brand expression vs platform convention.** Strong brands want identical interfaces everywhere; platform conventions favour native behaviour. Teams decide case by case which foundations must be identical and which may adapt.",
        "**How much to codify.** Fully specified languages are consistent but can feel rigid; loosely specified ones leave room for judgement but drift. Principles plus a small set of hard rules is a common middle ground.",
        "**Where motion belongs.** Some systems treat motion as part of the design language; others treat it as an engineering detail. Carbon's productive and expressive styles are an example of treating it as language {{src:carbon-motion}}.",
      ],
      alternativeModels: [
        "**Style guides** record visual rules in a document; they are a way of publishing a design language, without the tokens and components that enforce it.",
        "**Brand guidelines** cover identity and marketing; a design language extends them into interface behaviour, states and motion.",
      ],
    },
  },

  application: {
    summary: [
      "A design language sits between brand strategy and the design system: it turns principles into the decisions that tokens and components encode, and it is what makes a family of products feel like one.",
    ],
    web: [
      "Publish foundations as tokens consumed by CSS; document grammar with paired correct and incorrect examples.",
    ],
    mobile: [
      "Share principles, roles and voice with web; let type sizes, navigation and controls follow platform conventions.",
    ],
    enterprise: [
      "Suites of products need a language owner and a contribution process so that new products extend the language rather than fork it.",
    ],
    services: [
      "Voice and imagery rules carry the language into letters, emails, signage and support scripts.",
    ],
    steps: [
      "Agree three to five principles from brand values and research.",
      "Decide each foundation: type, colour, space, shape, icons, imagery, motion, voice.",
      "Encode the decisions as semantic tokens and component contracts.",
      "Document the grammar with paired examples on the same task.",
      "Set governance: ownership, proposals, review against principles, versioning.",
      "Review products for drift and feed findings back into the language.",
    ],
  },

  whenToUse: [
    "Product families, multi-platform products and organisations with several design teams.",
    "Before building a component library, so components express decisions rather than invent them.",
  ],
  whenNotToUse: [
    "As a substitute for usability: a coherent language can still be hard to use; test the tasks.",
    "As a reason to override platform conventions everywhere: share principles and roles, and adapt expression to each platform.",
  ],
  advantages: [
    "Makes products recognisable and predictable.",
    "Lets many teams design consistently without central approval of every screen.",
    "Gives tokens and components a reason for each value.",
  ],
  limitations: [
    "Principles can become slogans that settle nothing.",
    "A language needs governance or it drifts team by team.",
    "Its benefits are reported by practitioners, not measured in controlled studies.",
  ],
  misconceptions: [
    {
      myth: "The design language is the component library.",
      reality:
        "The library is one implementation of the language; IBM, for example, presents its design language separately from Carbon, which implements it {{src:ibm-design-language}}.",
    },
    {
      myth: "A design language is just colours and fonts.",
      reality:
        "It also covers space, shape, icons, imagery, motion and voice, and the grammar for combining them; motion styles such as Carbon's productive and expressive are language decisions {{src:carbon-motion}}.",
    },
  ],

  relations: [
    { target: "design-system", type: "applied-in", note: "A design system implements and governs a design language." },
    { target: "semantic-tokens", type: "applied-in", note: "Language decisions are encoded as semantic tokens components consume." },
    { target: "primitive-tokens", type: "related-to", note: "The language's palettes and scales become primitive tokens." },
    { target: "theme-architecture", type: "related-to", note: "Brand themes vary some language decisions (colour) while keeping others (space, motion, voice)." },
    { target: "atomic-design", type: "complementary-to", note: "In atomic design, palettes and fonts are among the atoms built from the language." },
    { target: "consistency-principle", type: "related-to", note: "A design language is how internal consistency is achieved across teams." },
  ],

  practice: {
    dos: [
      { text: "Trace every foundation decision to a principle, and encode it as a semantic token.", why: "Traceable decisions can be defended and changed systematically; arbitrary ones drift.", kind: "industry" },
      { text: "Name motion styles by purpose (productive, expressive) and reserve the expressive style for rare, significant moments.", why: "Carbon separates efficient task motion from occasional expressive motion, which is faster to apply consistently than per-component animation {{src:carbon-motion}}.", kind: "system" },
      { text: "Share principles, semantic roles and voice across platforms; adapt their expression to each platform's conventions.", why: "People bring platform knowledge with them; a language that overrides it trades usability for sameness.", kind: "context" },
    ],
    donts: [
      { text: "Don't write principles that cannot settle a decision ('delightful', 'modern').", why: "If a principle never decides between two options, it is decoration, not language.", kind: "team" },
      { text: "Don't let components carry raw values for type, colour, space or motion.", why: "Raw values bypass the language, so changing a decision means hunting through code.", kind: "industry" },
      { text: "Don't make motion essential to understanding, or impossible to switch off.", why: "Non-essential motion triggered by interaction should be able to be disabled [WCAG 2.2 SC 2.3.3, AAA] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "Arbitrary styling versus a principled design language",
        language: "css",
        code: `/* Before: each team decides values on the spot */
.events-card   { font: 500 19px/1.3 "Avenir"; border-radius: 14px; transition: transform 0.6s cubic-bezier(.3,1.6,.6,1); }
.loans-card    { font: 600 18px/1.4 "Inter";  border-radius: 6px;  transition: all 0.2s ease; }

/* After: the language's decisions, consumed as semantic tokens */
:root {
  /* principle: "calm and precise" → productive motion by default */
  --motion-duration-productive: var(--duration-fast);
  --motion-easing-standard:     var(--easing-standard);
  /* principle: "readable first" → one heading style */
  --font-heading:  600 var(--type-step-2) / 1.3 var(--font-family-sans);
  --radius-card:   var(--radius-md);
}
.card {
  font: var(--font-heading);
  border-radius: var(--radius-card);
  transition: box-shadow var(--motion-duration-productive) var(--motion-easing-standard);
}
@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}`,
        caption:
          "Illustrative. The primitive values (durations, easing curves, type steps, radii) are defined once below the semantic layer; the principle names in comments show where each decision comes from. Reduced-motion preferences are respected.",
      },
      {
        title: "Tracing a brand value to a component contract",
        language: "text",
        code: `Brand value        Principle             Foundation decision                 Semantic token(s)                       Component contract
-----------------  --------------------  ----------------------------------  --------------------------------------  ------------------------------------
Trustworthy        Calm and precise      Productive motion by default;       motion.duration.productive              Button: state changes use productive
                                         expressive only for alerts          motion.duration.expressive              motion; no bounce
Approachable       Readable first        One heading style; body ≥ 16 px     font.heading, font.body                 Card title uses font.heading only
Inclusive          Nothing by colour     Status = colour + icon + text       color.text.danger, icon.status.*        Error state requires icon and text
                   alone
Local, civic       Plain words           Voice: sentence case, no jargon     (content guideline, not a token)        Labels follow the content glossary`,
        caption: "Illustrative library-app example. Every component rule can be traced back through a token and a decision to a principle.",
      },
    ],
  },

  exercises: [
    {
      id: "design-language-ex-spot",
      kind: "assignment",
      level: "beginner",
      title: "Describe a product's design language",
      prompt: [
        "Choose an app you use often. Describe its vocabulary (type, colour, space, shape, icons, imagery, motion, voice) and two rules of its grammar. Guess one principle behind them.",
      ],
      deliverable: "A one-page description with screenshots annotated by foundation.",
      criteria: ["All eight foundations considered", "Grammar stated as rules", "Principle linked to evidence on screen"],
    },
    {
      id: "design-language-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Bring a drifting section back into the language",
      prompt: [
        "Illustrative case. A library app's new Events section uses a different typeface, large radii and springy 600 ms animations on every card. Other sections use one sans-serif, small radii and quick, subtle transitions. Teams disagree about who is right.",
        "Work through the correction sequence.",
      ],
      deliverable: "The missing language decisions, the tokens that encode them and the corrected Events card.",
      criteria: ["Cause identified as missing decisions, not one team's taste", "Principles cited", "Tokens defined", "Reduced motion handled"],
      exampleSolution: [
        "1. Symptom: the Events section looks and moves like a different product.",
        "2. Impact: people doubt they are in the same app; teams re-argue values on every new screen.",
        "3. Cause: the language has no written decisions for heading type, card radius or motion style, so each team chose its own.",
        "4. Principle: decisions trace to principles ('calm and precise'); motion styles distinguish productive from expressive moments {{src:carbon-motion}}.",
        "5. Correction: define font.heading, radius.card and the productive and expressive motion tokens; Events cards use productive motion; expressive is kept for a single 'event booked' confirmation.",
        "6. Validation: side-by-side review of all sections; check tokens replace raw values in code; test with reduced motion on.",
        "7. Trade-off: the Events team loses some visual distinctiveness; allow it in imagery, which the language leaves open.",
      ],
    },
    {
      id: "design-language-ex-trace",
      kind: "reflection",
      level: "advanced",
      title: "Build a traceability map",
      prompt: [
        "For a product you know, map three brand values to principles, foundation decisions, semantic tokens and component contracts. Mark every value in the product that cannot be traced, and propose how governance would prevent new untraceable values.",
      ],
      deliverable: "A traceability table and a short governance proposal.",
      criteria: ["Complete chains from value to component", "Untraceable values identified", "Governance includes review and versioning"],
    },
  ],

  quiz: [
    {
      id: "design-language-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which best describes a design language?",
      options: [
        { text: "The shared vocabulary and rules for type, colour, space, shape, icons, imagery, motion and voice, with the principles behind them", correct: true, explanation: "A language has vocabulary, grammar and principles." },
        { text: "The logo and brand colours", correct: false, explanation: "That is part of brand identity, not the whole interface language." },
        { text: "The component library", correct: false, explanation: "The library implements the language." },
        { text: "A PDF style guide", correct: false, explanation: "A document is one way to record a language." },
      ],
      explanation: "Vocabulary, grammar and principles.",
    },
    {
      id: "design-language-q-motion",
      kind: "scenario",
      level: "intermediate",
      prompt: "A team wants every button press to use a lively, bouncing animation. According to Carbon's motion guidance, what is the better choice?",
      options: [
        { text: "Use productive motion for routine interactions and save expressive motion for rare, significant moments", correct: true, explanation: "Carbon reserves expressive motion for occasional important moments." },
        { text: "Use expressive motion everywhere for a consistent brand feel", correct: false, explanation: "Constant expressive motion slows tasks and loses its emphasis." },
        { text: "Remove all motion", correct: false, explanation: "Productive motion supports feedback; it need not be removed." },
        { text: "Let each component team choose", correct: false, explanation: "That is how languages drift." },
      ],
      explanation: "Motion styles are language decisions applied by purpose.",
    },
    {
      id: "design-language-q-platform",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "A product ships on web, iOS and Android. What should the design language keep identical?",
      options: [
        { text: "Principles, semantic roles and voice, while letting controls and navigation follow each platform", correct: true, explanation: "Shared intent and meaning, adapted expression." },
        { text: "Every pixel, including navigation and system controls", correct: false, explanation: "That overrides platform conventions people rely on." },
        { text: "Nothing; each platform should have its own language", correct: false, explanation: "Then the product family loses coherence." },
        { text: "Only the logo", correct: false, explanation: "Too little to make products feel related." },
      ],
      explanation: "Share meaning; adapt expression.",
    },
  ],

  flashcards: [
    { id: "design-language-fc-define", front: "Design language", back: "Vocabulary (type, colour, space, shape, icons, imagery, motion, voice) + grammar + principles." },
    { id: "design-language-fc-not", front: "Design language vs component library", back: "The library implements the language; the language is upstream of components." },
    { id: "design-language-fc-motion", front: "Carbon's two motion styles", back: "Productive (efficient, subtle, routine tasks) and expressive (vibrant, rare significant moments)." },
    { id: "design-language-fc-trace", front: "Traceability chain", back: "Brand value → principle → foundation decision → semantic token → component contract." },
  ],

  references: [
    { source: "ibm-design-language", role: "primary", note: "A design language presented separately from its implementation." },
    { source: "carbon-motion", role: "primary", note: "Productive and expressive motion, easing and duration." },
    { source: "kholmatova-2017", role: "explanatory", note: "Design systems as the creation of design languages (scope only)." },
    { source: "frost-2013", role: "explanatory", note: "Palettes and fonts among the atoms." },
    { source: "frost-2016", role: "explanatory", note: "Atomic design and design systems practice." },
    { source: "m3-design-tokens", role: "explanatory", note: "Reference, system and component token classes." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 2.2.2 (A) and 2.3.3 (AAA) on motion." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Design languages are documented practice in published systems and practitioner books; their benefits are reported from experience rather than measured in controlled studies. Motion accessibility requirements are WCAG 2.2 success criteria.",

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
  lastVerifiedAt: "2026-11-11",
});
