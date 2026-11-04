import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "jakobs-law",
  slug: "jakobs-law",
  title: "Jakob's Law",
  alternateNames: ["Jakob's Law of the Internet User Experience", "Law of conventions"],
  summary:
    "Jakob Nielsen's principle that users spend most of their time on other products, so they expect yours to work the way those already do — an argument for following established conventions.",
  definition:
    "Jakob's Law, stated by Jakob Nielsen in 2000, holds that **users spend most of their time on other sites**, and therefore prefer a site to work the same way as the sites they already know. It is a design principle grounded in the psychology of learned expectations (mental models and transfer of learning), not an empirical law with a measured effect size.",
  primaryType: "principle",
  secondaryTypes: ["rule-of-thumb"],
  domain: "laws-effects",
  subcategory: "popular-ux-laws",
  tags: ["conventions", "consistency", "mental models", "learnability", "patterns", "familiarity"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "Information architecture", "Usability engineering"],
  learningObjectives: [
    "State Jakob's Law and its source accurately.",
    "Explain the psychological basis — learned mental models and transfer — that makes conventions valuable.",
    "Decide when to follow a convention and when deviating is justified.",
    "Distinguish external consistency (with other products) from internal consistency (within a product).",
  ],
  prerequisites: ["mental-models"],

  levels: {
    beginner: {
      explanation: [
        "People do not learn your product from scratch. They arrive with habits formed by every other website and app they use: the logo in the top-left goes home, the magnifying glass means search, the basket is in the top-right, underlined blue text is a link.",
        "Jakob's Law says: because people spend **most of their time elsewhere**, they expect your product to work like the ones they already know. When it does, they can use it without thinking. When it doesn't, they stumble — even if your new idea is clever.",
      ],
      analogy:
        "Every car puts the accelerator on the right and the brake to its left. A car with the pedals swapped might be 'logical' in some way, but every driver would struggle — their habits come from all the other cars they have driven.",
      everydayExamples: [
        "Online shops keep the basket in the top-right corner and a 'Checkout' button inside it.",
        "Pulling down on a list to refresh it works in most mobile apps, so people try it everywhere.",
        "Most login forms put email above password, followed by the sign-in button.",
      ],
      vocabulary: [
        { term: "Convention", meaning: "A design pattern so widely used that people expect it." },
        { term: "Mental model", meaning: "A person's internal picture of how something works, built from experience." },
        { term: "External consistency", meaning: "Working the same way as other products people use." },
        { term: "Internal consistency", meaning: "Working the same way across all parts of one product." },
      ],
    },
    intermediate: {
      explanation: [
        "Professionally, Jakob's Law is an argument for **spending innovation where it creates value** and using conventions everywhere else. Navigation, forms, search, checkout and account management are rarely where products win; making them predictable frees users' attention for what is distinctive.",
        "The principle is a specific case of the broader heuristic of *consistency and standards* in [[nielsen-usability-heuristics|Nielsen's usability heuristics]]: follow platform and industry conventions so users do not have to wonder whether different words, situations or actions mean the same thing.",
        "Conventions are **context-specific**. Users of news sites, online shops and corporate sites hold different expectations about where things are, and iOS, Android, Windows and macOS each have their own conventions. 'Follow conventions' therefore means 'follow the conventions of *your users'* other experiences'.",
      ],
      howItWorks: [
        "Repeated exposure to a pattern builds expectations about where elements are and what they do.",
        "When an interface matches those expectations, users transfer existing knowledge and act with little conscious effort.",
        "When it violates them, users must notice the mismatch, inhibit their habit and learn a new behaviour — a cost paid on every first encounter and sometimes repeatedly.",
      ],
      implementation: [
        "Audit the products your users use most often for the same tasks; document the shared conventions.",
        "Follow platform guidelines (Apple HIG, Material Design) for platform-native behaviour.",
        "Reserve novel interaction for areas where it delivers a clear, tested benefit.",
        "If you break a convention, make the new behaviour discoverable, consistent and tested with real users.",
        "Never exploit conventions — e.g. swapping the usual positions of 'Cancel' and 'Confirm' to induce mistaken clicks is a deceptive pattern.",
      ],
      scenarios: [
        "A redesigned shop moves the basket to the bottom-left for visual balance; users repeatedly fail to find it — reverting to the convention resolves it.",
        "A banking app uses a novel swipe-to-pay gesture; testing shows it is learnable and reduces accidental payments, so the deviation is justified and taught on first use.",
        "An enterprise tool for a niche profession follows that profession's established software conventions rather than consumer-app patterns.",
      ],
    },
    advanced: {
      explanation: [
        "Nielsen introduced the principle in his 22 July 2000 Alertbox, 'End of Web Design', as 'Jakob's Law of the Internet User Experience', arguing that websites should tone down distinctive design in interaction, navigation and terminology {{src:nielsen-2000-end-of-web-design}}. The name 'law' is rhetorical: the claim is a reasoned principle drawn from usability observation.",
        "Its scientific grounding lies in research on **mental models**, **schemas** and **transfer of learning**. Roth et al. (2010) showed that users hold shared, site-type-specific expectations about where common web objects are located, providing empirical support for the idea that conventions shape what users look for and where {{src:roth-2010}}.",
        "Norman frames standardisation as a powerful constraint: when a design cannot make its operation obvious, a shared standard lets people learn once and apply the knowledge everywhere — while noting that premature standardisation can lock in poor solutions {{src:norman-2013}}.",
      ],
      evidence: [
        "Empirical studies of object-location expectations show consistent, convention-driven mental models for common web elements, differing by site type {{src:roth-2010}}.",
        "The principle itself is professional guidance; there is no single study that measures 'Jakob's Law' as an effect {{src:nielsen-2000-end-of-web-design}}.",
      ],
      debates: [
        "**Convention vs innovation.** Strict adherence can entrench mediocre patterns and slow progress; most significant interface innovations once violated conventions. The useful question is whether the gain outweighs the relearning cost for your users.",
        "**Whose conventions?** Conventions differ across platforms, cultures, age groups and domains; a 'universal' convention may be local.",
        "**Conventions evolve.** The hamburger menu, pull-to-refresh and swipe gestures moved from novel to conventional; designers contribute to that evolution.",
      ],
      alternativeModels: [
        "**[[mental-models|Mental models]]** — the psychological mechanism behind Jakob's Law.",
        "**[[consistency-principle|Consistency and standards]]** — the broader heuristic covering internal and external consistency.",
        "**[[teslers-law|Tesler's Law]]** — another practitioner maxim, about where complexity should live rather than where patterns come from.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen"],
    period: "2000, Nielsen Norman Group Alertbox",
    problem:
      "In the early web, many sites invented their own navigation and interaction styles, forcing users to relearn each site.",
    narrative: [
      "Nielsen's 'End of Web Design' (2000) argued that the web had become a single user experience and that individual sites should conform to its conventions — the passage that introduced 'Jakob's Law of the Internet User Experience' {{src:nielsen-2000-end-of-web-design}}.",
      "The principle was later popularised in practitioner collections such as Laws of UX {{src:laws-of-ux}}.",
    ],
    attributionNote: "Named by and after Jakob Nielsen himself; the 'law' label is rhetorical rather than scientific.",
  },

  application: {
    summary: [
      "Apply Jakob's Law to **commodity interactions** — navigation, search, forms, checkout, authentication, settings — and to platform-native behaviour, so users' existing knowledge transfers directly.",
    ],
    web: [
      "Logo links to home; primary navigation at the top or left; search with a magnifying-glass icon and a visible input.",
      "Standard form patterns: labels above fields, inline validation, primary action after the last field.",
    ],
    mobile: [
      "Follow platform conventions for back navigation, tab bars, gestures and system dialogs.",
      "Do not override system gestures (e.g. edge swipes) with custom behaviour.",
    ],
    enterprise: [
      "Match conventions of the tools your users already use daily (e.g. spreadsheet-like keyboard behaviour in grids).",
      "Keep internal consistency across modules built by different teams via a design system.",
    ],
    services: [
      "Government and public services benefit from shared design systems so citizens recognise patterns across services.",
    ],
    steps: [
      "Identify the tasks and the products users already perform them in.",
      "Document the conventions (location, labels, behaviour).",
      "Decide per element: follow, adapt or break — and justify breaks with user value.",
      "Test deviations with representative users.",
      "Encode chosen conventions in the design system.",
    ],
  },

  whenToUse: [
    "Designing standard flows such as navigation, search, checkout and sign-in.",
    "Evaluating a redesign that introduces novel interaction patterns.",
    "Arguing for platform-native behaviour over custom components.",
  ],
  whenNotToUse: [
    "As a reason never to innovate where a new pattern offers substantial, tested benefit.",
    "When the prevailing convention is harmful (e.g. inaccessible or deceptive patterns).",
    "When your users come from a domain with different conventions from mainstream consumer products.",
  ],
  advantages: [
    "Reduces learning cost and errors.",
    "Directs innovation effort to where it matters.",
    "Easy to communicate to stakeholders.",
  ],
  limitations: [
    "A principle, not a measured law; no quantitative prediction.",
    "Conventions vary by platform, culture and domain.",
    "Can be used to justify copying competitors uncritically.",
  ],
  misconceptions: [
    {
      myth: "Jakob's Law means copying competitors.",
      reality: "It means matching users' learned expectations for common interactions. Copying a competitor's flaws or deceptive patterns is not required — and differentiation remains essential where it adds value.",
    },
    {
      myth: "Jakob's Law is a scientific law like Fitts's law.",
      reality: "It is a named design principle from a 2000 practitioner article. Its support comes from research on mental models and transfer, not from a direct measurement of the 'law'.",
    },
  ],

  relations: [
    { target: "mental-models", type: "derived-from", note: "Jakob's Law follows from the fact that users' mental models are built from their experience of other products." },
    { target: "consistency-principle", type: "related-to", note: "Jakob's Law is the external-consistency part of the 'consistency and standards' principle." },
    { target: "nielsen-usability-heuristics", type: "related-to", note: "Heuristic 4, consistency and standards, expresses the same idea in Nielsen's heuristic set." },
    { target: "signifiers", type: "related-to", note: "Conventions act as learned signifiers: users read meaning into familiar placements and icons." },
    { target: "navigation-patterns", type: "applied-in", note: "Navigation is where convention-following has the most direct effect on findability." },
    { target: "deceptive-patterns", type: "contrasts-with", note: "Some deceptive patterns deliberately exploit conventions, such as swapping the expected position of confirm and cancel." },
  ],

  exercises: [
    {
      id: "jakobs-law-ex-audit",
      kind: "assignment",
      level: "beginner",
      title: "Convention audit",
      prompt: [
        "Pick three online shops your target users are likely to use. Record where each places search, basket, account and primary navigation, and what each calls them.",
        "Compare with your own (or a chosen) shop and list every deviation.",
      ],
      deliverable: "A comparison table and a list of deviations.",
      criteria: ["Covers location and labels", "Uses at least three reference products", "Lists deviations precisely"],
    },
    {
      id: "jakobs-law-ex-break",
      kind: "critique",
      level: "intermediate",
      title: "Should this convention be broken?",
      prompt: [
        "A product team wants to replace the standard top-left back button in their iOS app with a custom gesture to 'feel unique'.",
        "Write a recommendation weighing user expectations, platform conventions, accessibility and the claimed benefit. State what evidence would change your recommendation.",
      ],
      deliverable: "A 200-word recommendation.",
      criteria: ["References platform conventions", "Considers discoverability and accessibility", "Specifies decisive evidence"],
      exampleSolution: [
        "Keep the standard back affordance: users' expectations come from every other iOS app, and system back gestures already exist. A custom-only gesture is less discoverable and harder for some assistive-technology users. Uniqueness is not a user benefit.",
        "I would reconsider only if usability testing showed the custom gesture was discovered and used successfully by most users without instruction and offered a clear task benefit, with an accessible alternative retained.",
      ],
    },
  ],

  quiz: [
    {
      id: "jakobs-law-q-statement",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What is the core reasoning of Jakob's Law?",
      options: [
        { text: "Users spend most of their time on other sites, so they expect yours to work the same way", correct: true, explanation: "This is Nielsen's statement of the law." },
        { text: "Users always prefer the most innovative design", correct: false, explanation: "The law argues the opposite for common interactions." },
        { text: "Every design should have exactly seven navigation items", correct: false, explanation: "That is a misreading of Miller's research, unrelated to Jakob's Law." },
        { text: "Complexity can only be moved, not removed", correct: false, explanation: "That is Tesler's Law." },
      ],
      explanation: "Jakob's Law is about expectations learned elsewhere.",
    },
    {
      id: "jakobs-law-q-type",
      kind: "true-false",
      level: "intermediate",
      prompt: "Jakob's Law is an empirically measured law of human behaviour with a known effect size.",
      options: [
        { text: "True", correct: false, explanation: "It is a principle from a 2000 practitioner article; no study measures it as a single effect." },
        { text: "False", correct: true, explanation: "It is best classified as a design principle supported indirectly by mental-model and transfer research." },
      ],
      explanation: "Classify popular 'laws' by what they are: Jakob's Law is a principle.",
    },
    {
      id: "jakobs-law-q-context",
      kind: "scenario",
      level: "advanced",
      prompt: "You are designing software for air-traffic controllers. A colleague cites Jakob's Law to argue for consumer-app patterns like swipe-to-dismiss. What is the strongest response?",
      options: [
        { text: "Jakob's Law points to *these users'* conventions — their existing operational tools and training — not consumer apps.", correct: true, explanation: "Conventions are domain-specific; external consistency means consistency with the users' own experience." },
        { text: "Jakob's Law only applies to websites, so it is irrelevant.", correct: false, explanation: "The underlying idea applies to any product where users bring prior expectations." },
        { text: "Use swipe-to-dismiss because most people know it.", correct: false, explanation: "In a safety-critical domain, accidental dismissal is a serious risk and the users' expectations come from specialist tools." },
        { text: "Conventions don't matter for experts.", correct: false, explanation: "Experts rely heavily on well-learnt conventions." },
      ],
      explanation: "Apply Jakob's Law to the conventions your actual users have learnt.",
      revise: "mental-models",
    },
  ],

  flashcards: [
    { id: "jakobs-law-fc-1", front: "Jakob's Law (Nielsen, 2000)", back: "Users spend most of their time on other sites, so they prefer yours to work the same way." },
    { id: "jakobs-law-fc-2", front: "Psychological basis of Jakob's Law", back: "Learned mental models and transfer of learning — shown, e.g., by shared expectations of where web objects are." },
  ],

  references: [
    { source: "nielsen-2000-end-of-web-design", role: "primary", note: "Original statement of the law." },
    { source: "roth-2010", role: "primary", note: "Empirical evidence for convention-driven mental models of web layouts." },
    { source: "norman-2013", role: "explanatory", note: "Standardisation as a design constraint." },
    { source: "laws-of-ux", role: "further", note: "Popular presentation." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "The law itself is professional guidance from a practitioner article. It is consistent with empirical research on mental models and object-location expectations, which supports the value of conventions for common interactions, but there is no direct measurement of 'Jakob's Law' and the evidence does not imply conventions should never be broken.",

  lab: "jakob-lab",
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
