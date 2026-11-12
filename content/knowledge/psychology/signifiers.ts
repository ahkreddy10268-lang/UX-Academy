import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "signifiers",
  slug: "signifiers",
  title: "Signifiers",
  alternateNames: ["Signifier", "Interaction cues", "Clickability cues"],
  summary:
    "Perceivable signals — deliberate or accidental — that tell people what actions are possible and where to perform them.",
  definition:
    "A signifier is any perceivable indicator that communicates appropriate behaviour to a person: what can be done, and where or how to do it. Norman introduced the term to design in 2008 to separate the *communication* of an action from the action possibility itself (the [[affordances|affordance]]). Signifiers may be designed (labels, icons, shape, colour, cursor changes) or emergent and social (a worn path, a queue, a crowd of people at a door).",
  primaryType: "concept",
  secondaryTypes: ["principle"],
  domain: "psychology",
  subcategory: "human-factors",
  tags: ["discoverability", "visual design", "clickability", "flat design", "Norman", "interaction cues"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "Visual design", "Human-computer interaction", "Semiotics"],
  learningObjectives: [
    "Distinguish signifiers from affordances and explain why the distinction was introduced.",
    "Identify designed and social signifiers in physical and digital environments.",
    "Diagnose weak or missing signifiers in an interface and strengthen them without visual clutter.",
    "Evaluate the evidence about flat design and signifier strength.",
  ],
  prerequisites: ["affordances"],

  levels: {
    beginner: {
      explanation: [
        "A **signifier** is a clue that tells you what you can do and where. The word 'PUSH' on a door, the arrow on a lift button, the underline on a link, the blinking cursor in a text box — each is a signifier.",
        "Signifiers are different from what is actually possible. A door might open by pushing either side, but if only one side has a push plate, that plate is the signifier telling you where to push.",
        "Not all signifiers are designed. A path worn across a lawn tells you where people walk. A crowd gathered round one door tells you it is the entrance. These are **social signifiers** — people's behaviour signals what to do.",
      ],
      analogy:
        "Signifiers are like road signs. The road exists whether or not there are signs (the affordance), but signs tell you which way to go and where to turn. Without them, you can still drive — you will just get lost more often.",
      everydayExamples: [
        "A blue, underlined word on a web page signals a link.",
        "A drop shadow or raised appearance on a button signals that it can be pressed.",
        "Three dots ('…') signal that more options are available.",
        "A grey, faded button signals that the action is currently unavailable.",
      ],
      vocabulary: [
        { term: "Signifier", meaning: "A perceivable cue that communicates what action is possible and where." },
        { term: "Affordance", meaning: "The action possibility itself, which may or may not be signalled." },
        { term: "Social signifier", meaning: "A cue created by other people's behaviour, such as a queue or worn path." },
        { term: "Flat design", meaning: "A visual style that removes shading, texture and depth, often weakening traditional cues." },
      ],
    },
    intermediate: {
      explanation: [
        "Norman's 2008 column argued that designers who said they were 'adding affordances' were really adding perceivable cues, and proposed the term **signifier** for them {{src:norman-2008}}. In the revised *Design of Everyday Things*, the two are complementary: affordances determine what actions are possible; signifiers communicate where the action should take place {{src:norman-2013}}. When an action is possible but cannot be discovered, the problem is a missing or weak signifier.",
        "On screens, signifiers carry almost all the burden of discoverability, because the hardware affords touching or clicking everywhere. Signifiers include **visual form** (shape, borders, fills, shadows), **conventions** (underlined links, hamburger icons), **text** (button labels, instructions), **state changes** (hover, focus, pressed), **cursor changes** and **motion** (a list that bounces at its edge signals scrollability).",
        "Signifier strength is a design variable. Practitioner eyetracking research by Nielsen Norman Group compared strong, weak and flat clickability cues and reported that weak and flat signifiers required more user effort to find interactive elements {{src:moran-2017-flat-ui}}. Strong signifiers matter most for unfamiliar, infrequent or high-stakes actions; well-learned conventions can carry more minimal styling.",
      ],
      howItWorks: [
        "People scan for cues that match learned conventions; a cue that matches a convention is recognised quickly.",
        "Redundant cues (shape + colour + label) make signifiers robust for people with low vision or colour-vision deficiency.",
        "State-change signifiers (hover, focus, pressed) confirm interactivity at the moment of approach.",
        "Absence of a signifier is also information: elements that look like plain text are assumed non-interactive.",
      ],
      implementation: [
        "Give every interactive element at least one strong static cue — not just a hover state, which does not exist on touch screens.",
        "Use consistent styling for each interaction type across the product (all links look alike, all buttons look alike).",
        "Don't rely on colour alone; combine with underline, shape, icon or label (WCAG 1.4.1 Use of Color).",
        "Provide visible keyboard focus indicators — they are signifiers for keyboard users.",
        "Use text labels for ambiguous icons; icon-only controls depend on conventions users may not share.",
        "Remove misleading cues from non-interactive elements.",
      ],
      scenarios: [
        "Ghost buttons (outline only) on a busy photograph lose their signifier; add a solid fill or stronger contrast.",
        "A horizontally scrollable carousel with no partially visible next item gives no signal that more content exists.",
        "Icon-only toolbar buttons in an internal tool confuse new staff; adding tooltips and labels in a 'show labels' setting helps.",
      ],
    },
    advanced: {
      explanation: [
        "The signifier concept resolves a decades-long confusion in HCI vocabulary documented by McGrenere and Ho {{src:mcgrenere-ho-2000}}: Gibson's affordances concern action possibilities; design practice was manipulating *information about* action possibilities. Norman's signifier names that information. The term echoes semiotics, where a signifier is the form of a sign, though Norman's usage is practical rather than semiotic in a technical sense {{src:norman-2008}}.",
        "Norman stresses that signifiers need not be intentional. Social signifiers — traces of others' behaviour — are often more powerful than designed cues {{src:norman-2008}}. Digital equivalents include view counts, 'most popular' labels and visible activity, which can guide behaviour but also mislead (e.g. a busy path that is the wrong one).",
        "The flat-design debate is largely a debate about signifier strength. Flat styles remove depth cues that historically signalled pressability; the question is whether conventions, layout and text compensate. Evidence is limited: NN/g's eyetracking study is practitioner research rather than peer-reviewed work {{src:moran-2017-flat-ui}}, and an INTERACT 2015 study by Burmistrov and colleagues compared flat and traditional designs experimentally {{src:burmistrov-et-al-2015}} (its findings are not summarised here because the full text could not be reviewed). Treat 'flat design harms usability' as a context-dependent hypothesis, not an established law.",
      ],
      evidence: [
        "The concept is analytic and definitional; its usefulness lies in precise diagnosis.",
        "Practitioner eyetracking evidence suggests weak or flat clickability cues increase search effort {{src:moran-2017-flat-ui}}.",
        "Accessibility guidance requiring that information is not conveyed by colour alone, and that focus is visible, encodes signifier robustness as normative requirements (see [[wcag]]).",
      ],
      debates: [
        "**Minimalism vs. discoverability.** Strong signifiers add visual weight; removing them reduces clutter but risks undiscoverable actions. The balance depends on user familiarity and action frequency.",
        "**Conventions vs. signifiers.** Many digital 'signifiers' work only because of learned convention (blue underline). Norman treats conventions as a cultural constraint; they can change, as the hamburger icon did.",
        "**Is the term necessary?** Some argue 'cue' or 'indicator' suffice; others value Norman's term for fixing the affordance confusion.",
      ],
      alternativeModels: [
        "[[affordances|Affordances]] — the action possibilities signifiers communicate.",
        "[[visual-hierarchy|Visual hierarchy]] — determines which signifiers are noticed first.",
        "[[information-scent|Information scent]] — cues in link labels that signal what lies behind them.",
      ],
    },
  },

  origin: {
    contributors: ["Donald A. Norman"],
    period: "2008; integrated into The Design of Everyday Things (2013)",
    problem:
      "Designers routinely used 'affordance' to mean a visual cue, muddying a useful concept and making critiques imprecise.",
    narrative: [
      "Norman's 1999 article distinguished real and perceived affordances {{src:norman-1999}}, and McGrenere and Ho documented inconsistent HCI usage {{src:mcgrenere-ho-2000}}.",
      "In his 2008 *interactions* column 'Signifiers, not affordances', Norman proposed the term signifier for perceivable cues {{src:norman-2008}}.",
      "The 2013 revised *Design of Everyday Things* made signifiers one of its core design principles alongside affordances, mapping, feedback, constraints and conceptual models {{src:norman-2013}}.",
    ],
    attributionNote: "'Signifier' is an established term in semiotics (Saussure); Norman's design usage is a practical adaptation rather than a direct import of semiotic theory.",
  },

  application: {
    summary: [
      "Signifiers are the main lever for discoverability on screens. Design a consistent signifier system — what links, buttons, inputs, draggable items and disabled states look like — and apply it everywhere.",
    ],
    web: [
      "Underline or otherwise distinguish links within body text, not only by colour.",
      "Style buttons with a clear shape and label; avoid ghost buttons for primary actions.",
      "Use visible focus styles for keyboard users.",
    ],
    mobile: [
      "Hover states do not exist; static signifiers must carry the message.",
      "Show partial next items in carousels and edge fades to signal scrolling.",
      "Pair gestures with visible controls or onboarding hints.",
    ],
    enterprise: [
      "Signal editable fields, draggable rows and expandable sections consistently in dense tools.",
      "Offer labelled toolbars for new users; icon-only for experts.",
    ],
    services: [
      "Physical signage, queue markers and staff behaviour are service signifiers; align them with digital touchpoints.",
    ],
    steps: [
      "Inventory interaction types in the product.",
      "Define a signifier for each type, with redundancy beyond colour.",
      "Audit screens for missing, weak or misleading signifiers.",
      "Test discoverability with first-click or task-based testing.",
    ],
  },

  whenToUse: [
    "Diagnosing why users cannot find or recognise interactive elements.",
    "Defining interaction styling rules in a design system.",
    "Critiquing minimalist or flat visual styles.",
  ],
  whenNotToUse: [
    "To argue that every element needs heavy decoration — well-learned conventions and context can make lighter cues sufficient.",
    "As proof of usability; signifier choices should be validated with users.",
  ],
  advantages: [
    "Provides precise vocabulary separating action from communication.",
    "Directly actionable in visual and interaction design.",
    "Covers social and emergent cues, not only designed ones.",
  ],
  limitations: [
    "Signifier strength is not quantified by the concept itself.",
    "Many digital signifiers depend on culturally learned conventions.",
    "Evidence on flat design and signifier strength is limited and partly practitioner-based.",
  ],
  misconceptions: [
    {
      myth: "Signifier is just a new word for affordance.",
      reality: "Signifiers communicate; affordances are what is possible. An action can be possible with no signifier (hidden), and a signifier can point to an impossible action (false).",
    },
    {
      myth: "Hover states are sufficient signifiers.",
      reality: "Hover does not exist on touch screens and requires the user to already be near the element. Static cues are needed.",
    },
    {
      myth: "Flat design is proven to be less usable.",
      reality: "Evidence suggests weak signifiers cost effort {{src:moran-2017-flat-ui}}, but flat styles with strong conventions, labels and contrast can work well. It depends on signifier strength, not style labels.",
    },
  ],

  relations: [
    { target: "affordances", type: "contrasts-with", note: "Signifiers communicate the actions that affordances make possible." },
    { target: "feedback-principle", type: "complementary-to", note: "Signifiers say what an action will do before it; feedback says what it did after." },
    { target: "discoverability", type: "influences", note: "On screens, discoverability depends largely on signifiers." },
    { target: "visual-hierarchy", type: "related-to", note: "Hierarchy determines which signifiers attract attention first." },
    { target: "information-scent", type: "complementary-to", note: "Link labels act as signifiers of both interactivity and destination." },
    { target: "non-colour-indicators", type: "applied-in", note: "Robust signifiers use cues beyond colour, as accessibility guidance requires." },
    { target: "mental-models", type: "influences", note: "Signifiers are part of the system image from which users form mental models." },
  ],

  exercises: [
    {
      id: "signifiers-ex-system",
      kind: "assignment",
      level: "intermediate",
      title: "Define a signifier system",
      prompt: [
        "For a design system you know (or a fictional one), define the signifiers for: text links, primary buttons, secondary buttons, text inputs, draggable items, expandable sections and disabled controls.",
        "For each, specify at least two redundant cues and the focus/hover/pressed states.",
      ],
      deliverable: "A one-page specification table.",
      criteria: [
        "Each type has at least two cues beyond colour",
        "Includes keyboard focus",
        "Works without hover on touch",
      ],
    },
    {
      id: "signifiers-ex-social",
      kind: "reflection",
      level: "beginner",
      title: "Notice social signifiers",
      prompt: [
        "Over one day, note three social signifiers in the physical world and two in digital products (e.g. ratings, 'trending'). For each, is the signal reliable? Could it mislead?",
      ],
      criteria: ["Identifies social (behaviour-based) cues", "Considers reliability"],
    },
  ],

  quiz: [
    {
      id: "signifiers-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which of these is a signifier?",
      options: [
        { text: "A 'Pull' label on a door handle", correct: true, explanation: "It communicates what action to perform and where." },
        { text: "The door's ability to swing open", correct: false, explanation: "That is the affordance, not the cue." },
        { text: "The door's hinge mechanism", correct: false, explanation: "The hinge enables the action; it does not communicate it." },
        { text: "The weight of the door", correct: false, explanation: "Weight affects effort, not communication." },
      ],
      explanation: "Signifiers communicate; affordances enable.",
    },
    {
      id: "signifiers-q-touch",
      kind: "scenario",
      level: "intermediate",
      prompt: "A web app shows that list rows are clickable only through a hover highlight. On tablets, users don't realise rows open details. Why?",
      options: [
        { text: "Hover-only signifiers don't exist on touch screens, so there is no static cue of interactivity.", correct: true, explanation: "Without hover, nothing signals that the rows are clickable." },
        { text: "The rows lack an affordance on tablets.", correct: false, explanation: "Tapping still works; the affordance exists but is not signalled." },
        { text: "Tablet users have different mental models of lists.", correct: false, explanation: "The core issue is the missing cue, not the model." },
        { text: "The rows are too large.", correct: false, explanation: "Size helps tapping; it does not by itself signal interactivity." },
      ],
      explanation: "Add a static cue such as a chevron, a link-styled title or a visible 'View' action.",
    },
    {
      id: "signifiers-q-evidence",
      kind: "true-false",
      level: "advanced",
      prompt: "Research has conclusively established that flat design is less usable than skeuomorphic design in all contexts.",
      options: [
        { text: "True", correct: false, explanation: "Evidence is limited and context-dependent; what matters is signifier strength, not the style label." },
        { text: "False", correct: true, explanation: "Practitioner evidence suggests weak cues cost effort, but flat designs with strong signifiers can perform well." },
      ],
      explanation: "Treat claims about visual styles as hypotheses to test, not settled laws.",
    },
  ],

  flashcards: [
    { id: "signifiers-fc-1", front: "Signifier (Norman, 2008)", back: "Any perceivable indicator that communicates appropriate behaviour — what to do and where." },
    { id: "signifiers-fc-2", front: "Social signifier", back: "A cue created by others' behaviour (worn path, queue, ratings) rather than deliberate design." },
  ],

  references: [
    { source: "norman-2008", role: "primary", note: "Introduction of signifiers." },
    { source: "norman-2013", role: "primary", note: "Signifiers as a core design principle." },
    { source: "norman-1999", role: "primary", note: "Real vs perceived affordances — the confusion signifiers resolve." },
    { source: "mcgrenere-ho-2000", role: "primary", note: "Documented inconsistency in HCI usage of affordance." },
    { source: "moran-2017-flat-ui", role: "explanatory", note: "Practitioner eyetracking study of clickability signifiers." },
    { source: "burmistrov-et-al-2015", role: "further", note: "Experimental comparison of flat and traditional designs (not summarised)." },
    { source: "w3c-wcag-22", role: "standard", locator: "SC 1.4.1 Use of Color; SC 2.4.7 Focus Visible", note: "Normative requirements for robust, visible cues." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Signifiers are an analytic concept from a leading design theorist, widely adopted in professional practice. Direct evidence on signifier strength comes mainly from practitioner research; peer-reviewed comparisons of visual styles exist but are limited in number and generality. Accessibility standards provide normative support for redundant, visible cues.",

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
