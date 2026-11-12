import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "consistency-principle",
  slug: "consistency-principle",
  title: "Consistency and Standards",
  alternateNames: ["Usability heuristic #4", "Consistency", "Be consistent", "Internal and external consistency"],
  summary:
    "The same thing should look, read and work the same way throughout a product, and follow the conventions people already know from other products, so that what they learn once keeps working.",
  definition:
    "Consistency and standards is the principle that people should not have to wonder whether different words, situations or actions mean the same thing, and that a product should follow platform and industry conventions {{src:nielsen-ten-heuristics-article}}. It has two scopes: **internal consistency**, within one product or family of products, and **external consistency**, with established conventions beyond it {{src:nng-consistency-standards}}. It is the fourth of Nielsen's ten heuristics. It does not mean every product must look the same, and it does not forbid breaking a convention when doing so clearly helps.",
  primaryType: "principle",
  secondaryTypes: ["heuristic"],
  domain: "heuristics",
  subcategory: "heuristic-sets",
  tags: ["consistency", "conventions", "standards", "design systems", "learnability", "Jakob's law", "heuristics"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "UI design", "Design systems", "Content design", "Accessibility"],
  learningObjectives: [
    "Distinguish internal from external consistency and give an example of each.",
    "Audit a product for consistency across visual design, layout, data entry and content.",
    "Decide when to follow a convention and when breaking it is justified.",
    "Use design tokens, components and governance to keep consistency at scale.",
  ],
  prerequisites: ["nielsen-usability-heuristics"],

  levels: {
    beginner: {
      explanation: [
        "Imagine a library app where the button to save a search says 'Save' on one screen, 'Bookmark' on another and shows only a star on a third. People are left asking: are these the same thing? Will the star do what 'Save' did? Every difference makes them stop and check.",
        "Consistency means **the same thing looks and works the same way everywhere**. Once people learn that the magnifying glass opens search or that the red button deletes, they can rely on it throughout the product.",
        "There is a second half: **standards**. People spend most of their time in other products, so they arrive expecting the logo to link home, the basket to be top right and underlined blue text to be a link. Following those conventions lets people use what they already know.",
      ],
      analogy:
        "Road signs. A stop sign looks the same in every town, so drivers do not have to read it carefully each time. A town that invented its own stop sign would get more accidents, however beautiful the design.",
      everydayExamples: [
        "Ctrl+C / ⌘C copies in almost every application.",
        "A shopping basket icon in the top-right corner of most online shops.",
        "The same date format in every form of a banking app.",
        "A product suite where 'Share' always sits in the same place.",
      ],
      vocabulary: [
        { term: "Internal consistency", meaning: "Things look and behave the same within one product or family of products." },
        { term: "External consistency", meaning: "A product follows conventions people know from elsewhere, such as the platform or the web." },
        { term: "Convention", meaning: "A widely shared way of doing something that people have learned to expect." },
        { term: "Platform guidelines", meaning: "The documented conventions of an operating system, such as iOS or Android." },
        { term: "Design system", meaning: "Shared components, tokens and guidance that keep many teams consistent." },
      ],
    },
    intermediate: {
      explanation: [
        "NN/g describes four layers where consistency can break {{src:nng-consistency-standards}}: **visual** (colours, type, icons), **page and button layout** (where things are placed), **user-entered data** (formats for dates, phone numbers, addresses), and **content** (the words used for the same thing). An audit should check each layer, because a product can be visually consistent while calling the same action three different names.",
        "External consistency is the idea popularised as [[jakobs-law|Jakob's Law]]: people spend most of their time on other sites, so they expect yours to work like those {{src:nng-user-mistakes}}. Following conventions also prevents errors: NN/g notes that deviating from conventions creates error-prone conditions {{src:nng-user-mistakes}}.",
        "Consistency is not sameness. Different things should look different; the same thing should look the same. And a convention can be broken when there is a clear gain, but NN/g advises doing so only when necessary or when it improves efficiency, because each break asks people to learn something new {{src:nng-consistency-standards}}.",
      ],
      howItWorks: [
        "Consistency makes learning transfer. When an action works the same way in a new place, people reuse what they learned instead of working it out again; NN/g links consistency to learnability for this reason {{src:nng-consistency-standards}}.",
        "Conventions work the same way across products: they are learned once, elsewhere, and recognised everywhere, which reduces what people must remember and lets them act on expectation.",
      ],
      implementation: [
        "Build from a design system: shared components, tokens and content guidelines are the most reliable way to keep many teams consistent {{src:nng-consistency-standards}}.",
        "Use one name for one thing in interface copy, and keep a glossary of action and object names.",
        "Keep navigation in the same relative order on every page where it repeats [WCAG 2.2 SC 3.2.3 Consistent Navigation, AA] {{src:w3c-wcag-22}}.",
        "Identify components with the same function consistently, including their labels and accessible names [WCAG 2.2 SC 3.2.4 Consistent Identification, AA] {{src:w3c-wcag-22}}.",
        "Put help mechanisms that repeat across pages (contact details, chat, help links) in the same relative order [WCAG 2.2 SC 3.2.6 Consistent Help, A] {{src:w3c-wcag-22}}.",
        "Follow the platform's conventions for navigation, gestures and system controls unless research shows a clear gain.",
      ],
      scenarios: [
        "**Illustrative.** A library app uses 'Save', 'Bookmark' and a star for the same action. Choosing one term ('Save'), one icon with a label and one component removes the doubt, and the change is made once in the design system.",
        "**Illustrative.** A bank's mobile forms accept dates as DD/MM/YYYY in one place and as a calendar picker in another. Choosing one pattern for each kind of date (birth dates typed, appointment dates picked) is consistent by kind, not identical everywhere.",
        "**Critique protocol.** Pick five common actions and five common objects. For each, list every label, icon, colour and position used across the product, plus how the platform names it. Any variation without a reason is a finding.",
      ],
    },
    advanced: {
      explanation: [
        "At scale, consistency is a **governance outcome**, not a design choice made once. Design tokens make visual decisions consistent by construction (one semantic colour for danger, one spacing scale); components make behaviour consistent; content guidelines make language consistent. What tokens and components cannot do is decide which differences are meaningful. That still needs review: NN/g recommends regular design reviews and a periodic consistency review to reduce UX debt {{src:nng-consistency-standards}}.",
        "Consistency has a **scope that must be chosen**: within a product, across a suite, with a brand, or with a platform. These can conflict. A cross-platform product can be consistent with itself (identical on iOS and Android) or with each platform (native on each). Neither is wrong; the decision should follow where people learned their expectations, and should be recorded so teams do not reopen it.",
        "Consistency is partly **measurable**. Inventories of components and copy show how many variants of the same thing exist; code and design-file linting can flag hard-coded values that bypass tokens; production analytics can compare task success or errors before and after a pattern is unified. Such numbers show where inconsistency exists; whether it harms users needs testing.",
      ],
      evidence: [
        "The heuristic is professional guidance. 'Be consistent' appeared in Nielsen and Molich's 1990 principles {{src:molich-nielsen-1990}}, and NN/g's current guidance draws on practice and usability testing rather than controlled experiments {{src:nng-consistency-standards}}. WCAG 2.2 makes three narrow forms of consistency normative: consistent navigation, consistent identification and consistent help {{src:w3c-wcag-22}}. The broader claims about learnability rest on the general psychology of transfer and on practitioner observation, not on measured effects for particular products.",
      ],
      debates: [
        "**Consistency vs innovation.** Strict consistency can freeze outdated patterns; breaking conventions can confuse. NN/g's advice is to break them only when necessary or clearly more efficient {{src:nng-consistency-standards}}.",
        "**Self-consistent or platform-consistent?** Cross-platform products must choose between looking the same everywhere and behaving natively on each platform.",
        "**Consistency vs fit.** A component that is consistent but wrong for a context (a dense table on a phone) helps no one; consistency should be judged by function, not appearance.",
      ],
      alternativeModels: [
        "**Jakob's Law** restates external consistency as an empirical expectation: people prefer sites that work like the ones they already know.",
        "**Design systems** operationalise internal consistency through tokens, components and governance, turning the heuristic into infrastructure.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Rolf Molich"],
    period: "1990 ('be consistent'); 1994 ('consistency and standards')",
    problem:
      "Products used different words, layouts and behaviours for the same things, and ignored conventions people had learned elsewhere, so every screen had to be learned afresh.",
    narrative: [
      "Nielsen and Molich's 1990 principles included 'be consistent' {{src:molich-nielsen-1990}}.",
      "Nielsen's 1994 revision named the heuristic consistency and standards, adding the expectation of following platform conventions {{src:nielsen-1994-heuristics}} {{src:nielsen-ten-heuristics-article}}.",
    ],
  },

  application: {
    summary: [
      "Consistency applies to every layer of a product — visual design, layout, data formats and words — and to the relationship between a product and the conventions around it. It is the principle design systems exist to deliver.",
    ],
    web: [
      "Follow web conventions (logo links home, visible links look like links, search where people look for it) unless research supports a change.",
      "Keep repeated navigation and help in the same relative order across pages.",
    ],
    mobile: [
      "Follow the platform's navigation, gesture and control conventions; decide deliberately whether a cross-platform app is self-consistent or platform-consistent.",
    ],
    enterprise: [
      "Suites of tools need consistency across products, which requires shared components, tokens and a vocabulary owned by a design-system team.",
    ],
    services: [
      "Use the same names for things in letters, emails, phone scripts and screens, so people recognise them across the service.",
    ],
    steps: [
      "Inventory components, labels, icons and data formats across the product.",
      "Group variants of the same thing and choose one, or document why variants differ.",
      "Encode the choices in tokens, components and a content glossary.",
      "Check platform conventions and record where you deliberately depart from them.",
      "Review new work against the system, and run a periodic consistency review.",
    ],
  },

  whenToUse: [
    "Any product with more than a handful of screens, and any family of products.",
    "Design reviews, design-system planning and content audits.",
  ],
  whenNotToUse: [
    "As a reason to make different things look alike: different functions should look different.",
    "As an argument against every improvement: break a convention when the gain is clear and tested, and document it.",
  ],
  advantages: [
    "Makes learning transfer, so people learn once and reuse.",
    "Reduces errors caused by unfamiliar or ambiguous patterns.",
    "Scales through design systems and is partly testable through WCAG 2.2.",
  ],
  limitations: [
    "Choosing the scope of consistency (product, suite, platform) involves trade-offs the heuristic does not resolve.",
    "Strict consistency can preserve outdated patterns.",
    "Measures of inconsistency show variation, not whether it harms users.",
  ],
  misconceptions: [
    {
      myth: "Consistency means everything should look the same.",
      reality:
        "The same thing should look and work the same way; different things should look different. Standards do not require every product to look identical {{src:nng-consistency-standards}}.",
    },
    {
      myth: "A design system guarantees consistency.",
      reality:
        "Tokens and components make visual and behavioural consistency easier, but words, data formats and judgement about meaningful differences still need review {{src:nng-consistency-standards}}.",
    },
  ],

  relations: [
    { target: "nielsen-usability-heuristics", type: "derived-from", note: "Heuristic 4 of Nielsen's ten usability heuristics." },
    { target: "jakobs-law", type: "related-to", note: "Jakob's Law is the popular statement of external consistency." },
    { target: "design-system", type: "applied-in", note: "Design systems are the main way consistency is delivered across teams." },
    { target: "semantic-tokens", type: "applied-in", note: "Semantic tokens make one decision, such as the danger colour, consistent by construction." },
    { target: "platform-design-guidelines", type: "related-to", note: "Platform guidelines document the conventions external consistency follows." },
    { target: "error-prevention", type: "influences", note: "Following conventions removes a common source of mistakes." },
  ],

  practice: {
    dos: [
      { text: "Use one name, one icon and one component for one action across the product.", why: "People should not have to wonder whether different words or icons mean the same thing {{src:nielsen-ten-heuristics-article}}.", kind: "industry" },
      { text: "Keep repeated navigation and help in the same relative order on every page.", why: "Predictable placement is required for navigation and help [WCAG 2.2 SC 3.2.3, AA; SC 3.2.6, A] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Encode visual and behavioural decisions in tokens and components, and review new work against them.", why: "Shared systems keep many teams consistent; periodic reviews catch drift {{src:nng-consistency-standards}}.", kind: "industry" },
    ],
    donts: [
      { text: "Don't give components with the same function different labels or accessible names on different pages.", why: "People and assistive technologies identify them by name [WCAG 2.2 SC 3.2.4 Consistent Identification, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't break a platform or web convention for novelty.", why: "Each break adds something to learn and creates error-prone conditions {{src:nng-consistency-standards}} {{src:nng-user-mistakes}}.", kind: "industry" },
      { text: "Don't make different functions look alike to appear consistent.", why: "A delete button styled like a save button is consistent in appearance and dangerous in meaning.", kind: "industry" },
    ],
    examples: [
      {
        title: "A consistency audit of one action",
        language: "text",
        code: `Action: keep a search for later            (illustrative library app)

Screen            Label       Icon     Component        Position
----------------  ----------  -------  ---------------  -----------------
Search results    "Save"      none     text button      above results
Catalogue item    "Bookmark"  ribbon   icon + label     top right
Saved searches    —           star     icon only        row end
Platform norm     "Save"      —        —                —

Finding   Three names and three icons for one action; one has no visible label.
Decision  "Save" with a bookmark icon, SaveButton component, same position on each screen.
Change    Once in the design system (component + content glossary), not per screen.
Check     Consistent Identification [WCAG 2.2 SC 3.2.4]: same accessible name "Save search".`,
        caption: "A structured analysis covering three of NN/g's four layers: visual, layout and content {{src:nng-consistency-standards}}.",
      },
      {
        title: "Consistency by construction in a component",
        language: "css",
        code: `/* Every destructive action uses the same role, so it looks the same everywhere. */
.button[data-intent="danger"] {
  background: var(--color-action-danger-background);
  color: var(--color-action-danger-text);
}

/* Avoid: a one-off value that drifts from the system */
.delete-link { color: #c0392b; }`,
        caption: "Illustrative. Semantic tokens make one decision apply everywhere; hard-coded values are where inconsistency creeps in.",
      },
    ],
  },

  exercises: [
    {
      id: "consistency-principle-ex-inventory",
      kind: "assignment",
      level: "beginner",
      title: "Count the variants",
      prompt: [
        "Pick one product. Find every way it lets you delete something. For each, note the label, icon, colour, position and whether it asks for confirmation.",
      ],
      deliverable: "A table of delete actions and a list of differences that have no reason.",
      criteria: ["All four layers considered", "Variants grouped", "Unjustified differences named"],
    },
    {
      id: "consistency-principle-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Unify a save action",
      prompt: [
        "Illustrative case. In a library app, saving a search is labelled 'Save', 'Bookmark' and a star icon on three screens. Support receives questions about where 'bookmarks' went, and screen-reader users hear three different names.",
        "Work through the correction sequence.",
      ],
      deliverable: "A unified pattern with label, icon, component, placement, accessible name and the governance change.",
      criteria: ["Cause located in the system, not one screen", "WCAG criterion cited", "Validation planned", "Trade-off named"],
      exampleSolution: [
        "1. Symptom: three labels and icons for one action.",
        "2. Impact: people doubt whether the actions are the same and cannot find saved items; screen-reader users hear different names.",
        "3. Cause: no shared component or content glossary, so each team chose its own.",
        "4. Requirement: same function, same identification [WCAG 2.2 SC 3.2.4, AA]; one name per thing {{src:nielsen-ten-heuristics-article}}.",
        "5. Correction: one SaveButton component with the visible label 'Save' and a bookmark icon, accessible name 'Save search', same placement on each screen; add 'Save' to the content glossary.",
        "6. Validation: re-audit the three screens; check names with a screen reader; watch support questions about lost bookmarks.",
        "7. Trade-off: people used to the star must relearn once; announce the change in release notes.",
      ],
    },
    {
      id: "consistency-principle-ex-scope",
      kind: "reflection",
      level: "advanced",
      title: "Choose a consistency scope",
      prompt: [
        "Your product runs on web, iOS and Android. Decide, for navigation, date entry and sharing, whether to be consistent with yourself or with each platform. Justify each decision and say how you would record and govern it.",
      ],
      deliverable: "A decision record per pattern with the evidence you would gather.",
      criteria: ["Considers where users learned expectations", "Names the cost of each option", "Defines governance"],
    },
  ],

  quiz: [
    {
      id: "consistency-principle-q-types",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Putting the shopping basket in the top-right corner because most shops do is an example of…",
      options: [
        { text: "External consistency", correct: true, explanation: "It follows a convention people learned from other products." },
        { text: "Internal consistency", correct: false, explanation: "Internal consistency is about matching other parts of your own product." },
        { text: "Visual hierarchy", correct: false, explanation: "Placement can affect hierarchy, but the reason here is convention." },
        { text: "Error recovery", correct: false, explanation: "Nothing is being recovered." },
      ],
      explanation: "External consistency means following conventions from beyond the product.",
    },
    {
      id: "consistency-principle-q-layers",
      kind: "scenario",
      level: "intermediate",
      prompt: "A product uses one colour palette and one button style everywhere, but calls the same thing 'Workspace', 'Project' and 'Board'. Which layer is inconsistent?",
      options: [
        { text: "Content", correct: true, explanation: "The words used for the same object differ." },
        { text: "Visual", correct: false, explanation: "The palette and buttons are consistent." },
        { text: "Page and button layout", correct: false, explanation: "Nothing in the scenario concerns placement." },
        { text: "None; colours are what matter", correct: false, explanation: "Consistency applies to words and data, not only visuals." },
      ],
      explanation: "Check all four layers: visual, layout, user-entered data and content.",
    },
    {
      id: "consistency-principle-q-wcag",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "Which WCAG 2.2 criterion is failed when a search icon is labelled 'Search' on one page and 'Find' on another?",
      options: [
        { text: "SC 3.2.4 Consistent Identification (AA)", correct: true, explanation: "Components with the same function must be identified consistently." },
        { text: "SC 3.2.3 Consistent Navigation (AA)", correct: false, explanation: "That concerns the order of repeated navigation, not names." },
        { text: "SC 1.4.11 Non-text Contrast (AA)", correct: false, explanation: "Contrast is unrelated." },
        { text: "SC 2.1.2 No Keyboard Trap (A)", correct: false, explanation: "Unrelated to labels." },
      ],
      explanation: "WCAG makes consistent identification and navigation normative.",
    },
  ],

  flashcards: [
    { id: "consistency-principle-fc-scopes", front: "Two scopes of consistency", back: "Internal (within the product or family) and external (with platform and industry conventions)." },
    { id: "consistency-principle-fc-layers", front: "NN/g's four layers of consistency", back: "Visual · page and button layout · user-entered data · content." },
    { id: "consistency-principle-fc-wcag", front: "WCAG 2.2 consistency criteria", back: "3.2.3 Consistent Navigation (AA), 3.2.4 Consistent Identification (AA), 3.2.6 Consistent Help (A)." },
  ],

  references: [
    { source: "nielsen-ten-heuristics-article", role: "primary", note: "Heuristic 4 as currently stated." },
    { source: "nielsen-1994-heuristics", role: "primary", note: "Revision that named the heuristic." },
    { source: "molich-nielsen-1990", role: "primary", note: "'Be consistent'." },
    { source: "nng-consistency-standards", role: "explanatory", note: "Internal and external consistency, four layers, design systems, reviews." },
    { source: "nng-user-mistakes", role: "explanatory", note: "Conventions and Jakob's Law in preventing mistakes." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 3.2.3, 3.2.4 (AA) and 3.2.6 (A)." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Consistency and standards is professional guidance with long use in heuristic evaluation; NN/g's recommendations come from practice and usability testing. Three specific forms of consistency are normative WCAG 2.2 success criteria (a W3C Recommendation). Claims about learnability are well grounded in practice but were not measured for particular products here.",

  guide: { id: "nielsen-heuristics", anchor: "h4", label: "Heuristic 4 in the Nielsen heuristics guide" },

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
