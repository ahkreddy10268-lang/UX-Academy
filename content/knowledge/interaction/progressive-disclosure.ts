import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "progressive-disclosure",
  slug: "progressive-disclosure",
  title: "Progressive Disclosure",
  alternateNames: ["Layered disclosure", "Staged disclosure (linear variant)", "Multi-layer interfaces"],
  summary:
    "An interaction design principle: show people the few options and details they need first, and reveal advanced or rarely used ones on request — reducing complexity without removing capability.",
  definition:
    "**Progressive disclosure** is an interaction design principle that defers advanced or rarely needed features and information to secondary displays, revealed when the user asks for them. The initial display holds the most important, frequently used options; a clearly labelled control gives access to the rest. A linear variant, **staged disclosure**, splits a task into a sequence of steps, as in a wizard. The goal is lower initial complexity and fewer errors for novices, with full capability preserved for experts.",
  primaryType: "principle",
  secondaryTypes: ["pattern", "technique"],
  domain: "interaction",
  subcategory: "principles",
  tags: ["complexity", "learnability", "advanced settings", "wizards", "accordions", "information density", "novices and experts"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "Information architecture", "Content design", "HCI"],
  learningObjectives: [
    "Explain what progressive disclosure is and the problem it solves.",
    "Distinguish progressive (hierarchical) from staged (linear) disclosure.",
    "Decide what belongs on the initial versus secondary display, using evidence of frequency and importance.",
    "Recognise the risks — hidden features, extra clicks, deep nesting — and evaluate them.",
  ],
  prerequisites: ["cognitive-load-theory"],

  levels: {
    beginner: {
      explanation: [
        "Many products can do far more than most people need most of the time. Showing everything at once overwhelms newcomers and slows everyone down. **Progressive disclosure means showing the essentials first and keeping the rest one step away** — available, but out of the way.",
        "A familiar example is the print dialog: it shows printer, copies and page range, with a button for 'more settings' such as paper type and margins. Most people never need those, but anyone who does can find them.",
        "The trick is choosing well. What you show first tells people what matters. If you hide something they often need, they will struggle — so the split between 'first' and 'later' must be based on how people actually use the product.",
      ],
      analogy:
        "A restaurant menu that lists the main dishes, with a separate wine list and dessert menu brought on request. You are not handed everything at once, but nothing is withheld if you ask.",
      everydayExamples: [
        "'Show advanced options' links in settings screens.",
        "Expandable FAQ answers (accordions) under each question.",
        "A camera app that offers simple point-and-shoot by default and a 'Pro' mode with manual controls.",
        "Checkout flows that ask for delivery details first and payment second (staged disclosure).",
      ],
      vocabulary: [
        { term: "Initial display", meaning: "What people see first, before asking for more." },
        { term: "Secondary display", meaning: "Where advanced or rarely used features live, reached on request." },
        { term: "Staged disclosure", meaning: "Breaking a task into a sequence of steps, such as a wizard." },
        { term: "Discoverability", meaning: "How easily people can find out that a feature exists." },
      ],
    },
    intermediate: {
      explanation: [
        "Nielsen describes two design requirements: **get the split right** — frequently needed features up front, the rest deferred — and **make the progression obvious**, with a visible control whose label sets accurate expectations of what lies behind it {{src:nielsen-2006-progressive-disclosure}}. Deciding the split requires evidence: task analysis, field studies and usage data, interpreted with care, since high usage can reflect mistaken clicks.",
        "**Progressive** disclosure is hierarchical — most users stay on the initial display and few go deeper. **Staged** disclosure is linear — most users pass through every step. Staged disclosure suits tasks that divide into steps with little interdependence; it frustrates users when they must jump back and forth between interdependent steps, for example comparing options on one screen while choosing on another {{src:nielsen-2006-progressive-disclosure}}.",
        "Depth matters. Designs with more than two levels of disclosure usually perform poorly because people lose track of where things are; if three or more levels seem necessary, simplify or regroup features instead {{src:nielsen-2006-progressive-disclosure}}.",
      ],
      howItWorks: [
        "Progressive disclosure manages [[cognitive-load-theory|cognitive load]]: fewer visible options mean less to scan, interpret and choose from, which can also reduce decision time (see [[hick-hyman-law|Hick-Hyman law]]).",
        "It also supports **error prevention**: novices cannot misuse settings they never see. Carroll and Carrithers showed the power of this by making troublesome functions unreachable for learners {{src:carroll-carrithers-1984}}.",
        "The cost is **interaction cost and discoverability**: each hidden feature needs an extra action, and some people will never realise it exists. Good labels, consistent placement and search reduce the cost.",
      ],
      implementation: [
        "Rank features by frequency and importance per user group, using analytics plus observation.",
        "Put the top features in the initial display; defer the rest behind one clearly labelled control.",
        "Keep to two levels where possible; group advanced options logically, using card sorting to validate groupings.",
        "Label disclosure controls with what they reveal ('Paper and quality settings'), not just 'More'.",
        "Remember the user's choice when they regularly need advanced options, for example by keeping a section expanded.",
        "Make disclosed content accessible: use proper button semantics and `aria-expanded`, and manage focus when content appears.",
      ],
      scenarios: [
        "An analytics dashboard shows the three key metrics with an 'Explore all metrics' panel, rather than 40 charts on load.",
        "A form asks for optional company details only when the user ticks 'I'm buying for a business'.",
        "A photo editor offers one-tap filters with an 'Adjust' drawer for exposure, contrast and curves.",
      ],
    },
    advanced: {
      explanation: [
        "The empirical root of the principle is research on **learning complex systems**. In Carroll and Carrithers's 'training wheels' study, a word processor was modified so that error-prone advanced functions were unreachable for new users. Learners using it learned substantially faster, achieved more and understood the system better, while a control group spent almost a quarter of its time recovering from errors the training interface had blocked {{src:carroll-carrithers-1984}}.",
        "Shneiderman generalised the idea to **multi-layer interfaces**: users start in a simple layer and move to richer layers as their needs and skills grow, supporting universal usability across novices and experts {{src:shneiderman-2003}}. Contemporary forms include 'basic/pro' modes and role-based defaults.",
        "The design tension is between **simplicity for the majority** and **efficiency and visibility for the minority**. Experts may find disclosure layers slow; novices may never discover valuable features. Adaptive interfaces that rearrange options automatically try to resolve this, but they can break spatial memory and predictability — which is why adaptable, user-controlled layers are often preferred.",
      ],
      evidence: [
        "The training-wheels study provides controlled experimental evidence that blocking advanced functions helps novices learn a complex system {{src:carroll-carrithers-1984}}. It does not show that hiding features is beneficial for experienced users or in all contexts.",
        "Most current guidance on progressive disclosure is professional, based on usability testing experience rather than controlled experiments {{src:nielsen-2006-progressive-disclosure}}. Specific claims, such as the two-level guideline, are practitioner recommendations.",
      ],
      debates: [
        "**Hidden vs. discoverable.** Mobile design tends to hide more behind menus, and usability practitioners commonly report that options hidden behind menus are used less. The right trade-off depends on how important the hidden features are.",
        "**Adaptive vs. adaptable.** System-driven adaptation can reduce clutter but harms predictability; user-controlled layers preserve control but require users to know they exist.",
        "**Disclosure as dark pattern.** Burying cancellation, privacy or cost information behind layers is a misuse of the technique, and can be deceptive.",
      ],
      alternativeModels: [
        "Reducing the feature set altogether — a product-strategy decision rather than an interaction technique.",
        "Search- or command-palette access to advanced features, which avoids nested menus for experts.",
        "Contextual disclosure: showing options only when the current selection makes them relevant, as in context-sensitive toolbars.",
      ],
    },
  },

  origin: {
    contributors: ["John M. Carroll", "Caroline Carrithers", "Jakob Nielsen", "Ben Shneiderman"],
    period: "Training-wheels research 1980s; named guidance widespread by the 1990s–2000s",
    problem:
      "Powerful software overwhelmed new users, who made errors in features they did not need and struggled to learn the basics.",
    narrative: [
      "At IBM, Carroll and Carrithers demonstrated in 1984 that a reduced 'training wheels' interface helped novices learn a word processor faster and with fewer errors {{src:carroll-carrithers-1984}}.",
      "Progressive disclosure became a standard application design guideline; Nielsen's 2006 article summarised practice and distinguished staged disclosure {{src:nielsen-2006-progressive-disclosure}}.",
      "Shneiderman's multi-layer interface proposal framed layered complexity as a strategy for universal usability {{src:shneiderman-2003}}.",
    ],
    attributionNote:
      "The term 'progressive disclosure' is commonly linked to IBM-era interface research, but no single originating publication of the term was verified in this research session.",
  },

  application: {
    summary: [
      "Use progressive disclosure wherever a product serves both occasional and expert users, or where a task contains optional detail most people do not need.",
    ],
    web: [
      "FAQ accordions, 'Read more' sections and filter panels that expand on demand.",
      "Forms that reveal conditional fields only when an earlier answer makes them relevant.",
    ],
    mobile: [
      "Bottom sheets that open with essential actions and expand to reveal more.",
      "Basic/Pro modes in creation tools.",
    ],
    enterprise: [
      "Role-based defaults: show administrators configuration panels, and everyone else the daily workflow.",
      "Saved views and remembered expansion states for power users.",
    ],
    services: [
      "Letters and service pages that lead with what to do next, with detailed eligibility rules in a linked section.",
    ],
    steps: [
      "List all features and information for the screen or flow.",
      "Gather frequency and importance evidence per user group.",
      "Define the initial display: top tasks only.",
      "Group the remainder into one secondary level, with a clearly labelled control.",
      "Implement accessibly (button semantics, state, focus).",
      "Test discoverability: can people find a deferred feature when they need it?",
    ],
  },

  whenToUse: [
    "Feature-rich tools used by both novices and experts.",
    "Long forms with optional or conditional sections.",
    "Content with a clear summary-versus-detail structure.",
  ],
  whenNotToUse: [
    "When users frequently need the 'advanced' features — hiding them adds cost to every use.",
    "For information people need in order to make an informed decision, such as prices, fees and cancellation terms.",
    "When the hierarchy would need three or more levels — restructure instead.",
    "Staged disclosure for tasks with highly interdependent steps that users must compare across.",
  ],
  advantages: [
    "Reduces initial complexity and cognitive load.",
    "Improves learnability and reduces novice errors.",
    "Signals priority through placement.",
  ],
  limitations: [
    "Deferred features are less discoverable and used less.",
    "Adds clicks for users who need deferred features often.",
    "Depends on correctly identifying what is important, which varies between user groups.",
    "Can be abused to hide information users have a right to see.",
  ],
  misconceptions: [
    {
      myth: "Progressive disclosure means hiding everything except one button.",
      reality: "It means prioritising. Frequently needed features must stay visible; only less important ones are deferred.",
    },
    {
      myth: "Any accordion or 'More' menu is good progressive disclosure.",
      reality: "Disclosure works only when the split is evidence-based and the control clearly signals what it reveals.",
    },
    {
      myth: "Wizards are always easier than single-page forms.",
      reality: "Staged disclosure helps with independent steps, but hurts when users must compare or move back and forth between steps.",
    },
  ],

  relations: [
    { target: "cognitive-load-theory", type: "derived-from", note: "Progressive disclosure applies the idea of reducing extraneous load by presenting less at once." },
    { target: "hick-hyman-law", type: "related-to", note: "Fewer initial options can reduce decision time, as the Hick-Hyman law describes for choice reaction." },
    { target: "discoverability", type: "contrasts-with", note: "Deferring features trades off against how easily users discover them." },
    { target: "recognition-over-recall", type: "related-to", note: "Disclosed options must remain recognisable and findable, or users must recall where features hide." },
    { target: "card-sorting", type: "applied-in", note: "Card sorting helps decide how to group deferred, advanced options logically." },
    { target: "deceptive-patterns", type: "contrasts-with", note: "Hiding fees or cancellation behind layers turns the technique into a deceptive pattern." },
    { target: "interaction-cost", type: "related-to", note: "Each disclosure layer adds interaction cost for users who need what it hides." },
  ],

  lab: "disclosure-lab",

  exercises: [
    {
      id: "progressive-disclosure-ex-split",
      kind: "assignment",
      level: "beginner",
      title: "Split a settings screen",
      prompt: [
        "A video-call app's settings screen shows 24 options at once. List them (invent realistic ones if needed) and decide which belong on the initial display and which in an 'Advanced' section.",
        "Justify each decision by frequency or importance.",
      ],
      deliverable: "Two lists with a one-line justification per item.",
      criteria: ["No more than about a third of options in the initial display", "Justifications reference usage, not personal taste", "Safety- or privacy-critical options are not buried"],
    },
    {
      id: "progressive-disclosure-ex-wizard",
      kind: "scenario",
      level: "intermediate",
      title: "Wizard or single page?",
      prompt: [
        "An insurance quote requires: personal details, vehicle details, cover options (which change the price) and payment.",
        "Decide which parts should be staged into separate steps and which must appear together, and explain using the interdependence criterion.",
      ],
      criteria: ["Keeps cover options and price together", "Defers payment", "Uses the interdependence reasoning explicitly"],
      exampleSolution: [
        "Personal and vehicle details are independent and can be early steps. Cover options and the resulting price are interdependent — users compare and adjust — so they belong on one screen. Payment can be a final stage.",
      ],
    },
    {
      id: "progressive-disclosure-ex-a11y",
      kind: "critique",
      level: "advanced",
      title: "Audit a disclosure component",
      prompt: [
        "Inspect an accordion or 'Show more' control on a public website using only a keyboard and a screen reader.",
        "Report whether the state is announced, focus is managed and content is discoverable. Propose fixes.",
      ],
      criteria: ["Checks button semantics and expanded state", "Checks focus behaviour", "Fixes are specific and standards-based"],
    },
  ],

  quiz: [
    {
      id: "progressive-disclosure-q-definition",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which best describes progressive disclosure?",
      options: [
        { text: "Showing the most important options first and revealing advanced ones on request", correct: true, explanation: "This is the core idea: prioritise without removing capability." },
        { text: "Removing advanced features to simplify the product", correct: false, explanation: "Progressive disclosure defers features; removing them is a different decision." },
        { text: "Animating content so it appears gradually", correct: false, explanation: "Animation is unrelated; disclosure is about what is shown and when." },
        { text: "Showing all options but in smaller text", correct: false, explanation: "This keeps the complexity and harms readability." },
      ],
      explanation: "The initial display carries priority features; secondary displays hold the rest.",
    },
    {
      id: "progressive-disclosure-q-staged",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "When does staged disclosure (a wizard) work poorly?",
      options: [
        { text: "When users must compare and adjust across interdependent steps", correct: true, explanation: "Splitting interdependent decisions forces users to move back and forth." },
        { text: "When steps are independent of each other", correct: false, explanation: "This is when staged disclosure works well." },
        { text: "When the task is performed rarely", correct: false, explanation: "Infrequent tasks often benefit from guided steps." },
        { text: "When the task has a clear linear order", correct: false, explanation: "A clear linear order suits staged disclosure." },
      ],
      explanation: "Use stages for independent steps; keep interdependent decisions together.",
    },
    {
      id: "progressive-disclosure-q-training-wheels",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "What did Carroll and Carrithers's (1984) 'training wheels' study find?",
      options: [
        { text: "Novices using a system with error-prone functions blocked learned faster and better than those using the full system.", correct: true, explanation: "The training interface produced faster learning and better comprehension; the control group spent much of its time recovering from errors." },
        { text: "Experts preferred hidden advanced features.", correct: false, explanation: "The study concerned novice learners, not expert preferences." },
        { text: "Hiding features had no effect on learning.", correct: false, explanation: "There were substantial effects on learning speed and achievement." },
        { text: "Wizards outperformed single-page forms.", correct: false, explanation: "The study did not compare wizards with forms." },
      ],
      explanation: "Blocking advanced functions during learning reduced errors and sped up learning for novices.",
    },
    {
      id: "progressive-disclosure-q-ethics",
      kind: "scenario",
      level: "intermediate",
      prompt: "A subscription service shows the monthly price up front but places the auto-renewal annual commitment inside a collapsed 'Details' section. What is the best critique?",
      options: [
        { text: "Information needed for an informed decision should not be deferred; this misuses disclosure and may be deceptive.", correct: true, explanation: "Progressive disclosure is for optional detail, not decision-critical terms." },
        { text: "It is good progressive disclosure because it reduces clutter.", correct: false, explanation: "Reducing clutter does not justify hiding material terms." },
        { text: "It is fine as long as the section can be expanded.", correct: false, explanation: "Technical availability does not make critical information visible." },
        { text: "The price should also be hidden for consistency.", correct: false, explanation: "That compounds the problem." },
      ],
      explanation: "Never defer information people need to make an informed choice.",
      revise: "deceptive-patterns",
    },
  ],

  flashcards: [
    { id: "progressive-disclosure-fc-def", front: "Progressive disclosure", back: "Show essential options first; reveal advanced or rare ones on request via a clearly labelled control." },
    { id: "progressive-disclosure-fc-staged", front: "Progressive vs. staged disclosure", back: "Progressive = hierarchical (most stay on the first level). Staged = linear steps (most pass through all of them)." },
    { id: "progressive-disclosure-fc-levels", front: "How many disclosure levels?", back: "Aim for two; more than two usually tests poorly (practitioner guideline)." },
  ],

  references: [
    { source: "carroll-carrithers-1984", role: "primary", note: "Experimental evidence that blocking advanced functions aids novice learning." },
    { source: "nielsen-2006-progressive-disclosure", role: "explanatory", note: "Design criteria, staged disclosure and the two-level guideline." },
    { source: "shneiderman-2003", role: "primary", note: "Multi-layer interfaces for universal usability." },
    { source: "w3c-aria-apg", role: "further", locator: "Accordion and Disclosure patterns", note: "Accessible implementation patterns for disclosure widgets." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "The principle is mainstream professional guidance. Its core benefit for novices is supported by controlled research on training-wheels interfaces; specific rules such as 'no more than two levels' are practitioner recommendations from usability testing, not experimental findings.",

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
