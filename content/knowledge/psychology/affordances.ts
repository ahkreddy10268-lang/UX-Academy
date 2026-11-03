import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "affordances",
  slug: "affordances",
  title: "Affordances",
  alternateNames: ["Affordance", "Perceived affordance", "Action possibilities"],
  summary:
    "The action possibilities a thing offers to a particular agent — a concept from ecological psychology that HCI adopted, reinterpreted and argued about for decades.",
  definition:
    "In James J. Gibson's ecological psychology, an affordance is an action possibility that the environment offers an animal, defined by the relationship between the environment's properties and the animal's capabilities — and existing whether or not it is perceived. Donald Norman introduced the term to design, where it came to mean the perceived properties of an object that suggest how it can be used; Norman later distinguished **real affordances** from **perceived affordances** and, in 2008, argued that designers usually mean **[[signifiers]]**.",
  primaryType: "concept",
  secondaryTypes: ["theory"],
  domain: "psychology",
  subcategory: "human-factors",
  tags: ["ecological psychology", "perception", "interaction design", "Norman", "Gibson", "discoverability"],
  difficulty: "beginner",
  disciplines: ["Ecological psychology", "Human-computer interaction", "Interaction design", "Industrial design"],
  learningObjectives: [
    "Define an affordance in Gibson's original sense and in Norman's design sense.",
    "Explain why 'perceived affordance' and 'signifier' were introduced and how they differ from affordances.",
    "Classify affordances as perceptible, hidden or false (Gaver).",
    "Use precise vocabulary when critiquing an interface: what can be done vs. what communicates it.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "An **affordance** is what something lets you do. A chair affords sitting. A handle affords pulling. A flat, firm floor affords walking — for a person, not for a fish.",
        "The important idea is that an affordance depends on **both the object and the person**. A high shelf affords reaching for an adult but not for a small child. A tiny button affords tapping for someone with a stylus, but barely for a person with large fingers.",
        "In digital design, people often say a button 'has an affordance' because it *looks* clickable. Strictly, being clickable is the affordance; looking clickable is a *signal* about the affordance. Later in this entry you will see why that distinction matters.",
      ],
      analogy:
        "A tree branch affords climbing to a squirrel, perching to a bird and swinging to a child — the same branch, different affordances, because the creatures differ. Affordances live in the relationship, not in the branch alone.",
      everydayExamples: [
        "A door with a flat plate affords pushing; a door with a vertical bar handle affords pulling.",
        "A text field affords typing — but only if you can tell it is a text field.",
        "A swipeable card affords swiping even if nothing on screen tells you so (a hidden affordance).",
      ],
      vocabulary: [
        { term: "Affordance", meaning: "An action possibility that exists between an object and someone able to perform the action." },
        { term: "Perceived affordance", meaning: "An action possibility the person believes is there, based on what they see." },
        { term: "Hidden affordance", meaning: "An action that is possible but not visible or obvious." },
        { term: "False affordance", meaning: "Something that appears possible but is not — such as a fake button." },
      ],
    },
    intermediate: {
      explanation: [
        "Gibson coined *affordance* to describe what the environment offers an animal for good or ill {{src:gibson-1979}}. For Gibson, affordances are **relational** (they depend on the animal's body and abilities), **real** (they exist whether or not they are noticed) and **directly perceivable** in the structure of light — without needing inference.",
        "Norman brought the term into design in *The Psychology of Everyday Things*, emphasising the perceived properties that indicate how an object can be used {{src:norman-1988}}. This shift — from action possibility to *appearance suggesting action* — spread rapidly. In 1999, Norman clarified that on screens the real affordances are fixed by hardware (a screen affords touching anywhere; a mouse affords clicking), so what designers manipulate are **perceived affordances**, conventions and feedback {{src:norman-1999}}.",
        "Gaver offered a useful classification for technology {{src:gaver-1991}}: **perceptible affordances** (possible and visible), **hidden affordances** (possible but not perceptible — an unlabelled gesture), and **false affordances** (perceptible but not real — something that looks like a button but does nothing). He also described sequential and nested affordances, where acting on one reveals the next.",
      ],
      howItWorks: [
        "An affordance exists when the object's properties match the actor's capabilities: a target large enough for a finger affords tapping; one too small affords it poorly.",
        "Perception of an affordance depends on information available to the actor — shape, shading, labels, cursor changes, convention.",
        "Design problems usually fall into two kinds: the affordance is missing (the action is not possible), or the affordance exists but is not perceived (hidden affordance) — which is a signifier problem.",
      ],
      implementation: [
        "When critiquing, separate *can users do it?* (affordance) from *can users tell they can do it?* (signifier/perceived affordance).",
        "Eliminate false affordances: non-interactive elements that look interactive (underlined non-links, button-styled labels).",
        "Expose hidden affordances that matter: add visible controls or hints for gestures, drag handles for draggable items.",
        "Design affordances for the full range of bodies and abilities — target size, reach, motor precision, assistive technology.",
        "Use nested affordances deliberately: reveal secondary actions on hover/focus only if primary discoverability does not depend on them.",
      ],
      scenarios: [
        "A list where rows can be swiped to delete, with no visible hint: a hidden affordance. Add an overflow menu or edit mode.",
        "A heading styled in the brand's link colour: a false affordance that invites clicks.",
        "A slider too thin to grab on touch: the affordance is weak for fingers — enlarge the thumb and hit area.",
      ],
    },
    advanced: {
      explanation: [
        "McGrenere and Ho's analysis is the standard account of the conceptual drift {{src:mcgrenere-ho-2000}}. They show that Norman implicitly changed Gibson's concept: Gibson's affordance is independent of perception, whereas Norman's original usage tied it to perceived properties; their review of HCI literature found widely varying usage as a result. They propose separating the **affordance** itself (which bears on *usefulness* — what can be done) from the **perceptual information about the affordance** (which bears on *usability* — how easily it is discovered and used).",
        "Norman's own clarifications track this. In 1999 he wrote that designers were conflating real affordances, perceived affordances, conventions and constraints {{src:norman-1999}}. In 2008 he proposed 'signifier' for the perceivable cue, reserving 'affordance' for the relationship {{src:norman-2008}}. The 2013 revision of *The Design of Everyday Things* builds this into its principles: affordances determine what actions are possible; signifiers communicate where the action should take place {{src:norman-2013}}.",
        "Within ecological psychology, debates continue about whether affordances are properties of the environment, of the animal–environment system, or relations. For designers, the practical lesson is linguistic precision: 'this button lacks affordance' usually means 'this button lacks a signifier'.",
      ],
      evidence: [
        "Affordances are a theoretical construct; evidence for Gibson's broader ecological claims comes from perception and action research outside HCI.",
        "In HCI, the concept's value is primarily analytic. Evidence for *signifiers* — that visual cues change how readily users find interactive elements — is more directly testable; see [[signifiers]].",
        "The documented divergence in usage is itself an empirical finding of McGrenere and Ho's literature review {{src:mcgrenere-ho-2000}}.",
      ],
      debates: [
        "**Should HCI keep the word?** Some argue Norman's usage has diverged so far from Gibson's that 'affordance' should be retired in favour of signifier, convention and constraint; others value the relational emphasis.",
        "**Do screens have affordances?** Norman (1999) argued that screen-based objects have perceived affordances only; Gaver (1991) treated technology affordances as real and classifiable.",
        "**Social and cultural affordances.** Later work extends affordances to social action, where convention and culture shape what is perceived as possible.",
      ],
      alternativeModels: [
        "**[[signifiers|Signifiers]]** — perceivable indicators of where and how to act.",
        "**[[constraints|Constraints]]** — physical, logical, semantic and cultural limits on possible actions {{src:norman-2013}}.",
        "**[[ecological-psychology|Ecological psychology]]** — the broader theory of direct perception from which affordances come.",
      ],
    },
  },

  origin: {
    contributors: ["James J. Gibson", "Donald A. Norman", "William Gaver", "Joanna McGrenere", "Wayne Ho"],
    period: "Gibson, developed through the 1960s–1970s, fullest statement 1979; adopted in design from 1988",
    problem:
      "Gibson wanted to explain how animals perceive what they can do in their environment without elaborate inference. Norman wanted a way to explain why some everyday objects are self-explanatory and others confusing.",
    narrative: [
      "Gibson developed the concept over the 1960s and 1970s and gave its fullest statement in *The Ecological Approach to Visual Perception* {{src:gibson-1979}}.",
      "Norman's *Psychology of Everyday Things* introduced it to designers {{src:norman-1988}}. Gaver adapted it to technology {{src:gaver-1991}}.",
      "Norman clarified perceived affordances in 1999 {{src:norman-1999}}; McGrenere and Ho documented the drift and proposed a framework in 2000 {{src:mcgrenere-ho-2000}}; Norman introduced signifiers in 2008 {{src:norman-2008}} and incorporated them into the 2013 revised edition {{src:norman-2013}}.",
    ],
    attributionNote:
      "The word was coined by Gibson, not Norman. Popular design writing often attributes the concept to Norman without noting the change in meaning.",
  },

  application: {
    summary: [
      "Use affordances to ask *what actions are possible for these users?* — including those with different bodies and abilities — and signifiers to ask *how will they know?* Precise vocabulary leads to precise fixes.",
    ],
    web: [
      "Avoid styling non-interactive text like links or buttons (false affordances).",
      "Ensure every interactive element is operable by keyboard as well as pointer — otherwise the affordance does not exist for keyboard users.",
    ],
    mobile: [
      "Gestures are hidden affordances; provide visible alternatives for essential actions.",
      "Size and space touch targets so the tap affordance exists for a wide range of fingers.",
    ],
    enterprise: [
      "Drag-and-drop, inline editing and multi-select are often hidden; provide handles, edit icons or explicit modes.",
    ],
    services: [
      "Physical service touchpoints (kiosks, forms) should afford use by people with varied reach, grip and vision.",
    ],
    steps: [
      "List the actions users need to perform.",
      "For each, check whether the action is possible for all intended users (affordance).",
      "Check whether it is perceivable (signifier) and correctly interpreted.",
      "Remove false affordances and expose important hidden ones.",
      "Test discoverability with first-time users.",
    ],
  },

  whenToUse: [
    "Analysing whether actions are possible for users with different abilities and devices.",
    "Critiquing interfaces where actions are hidden or misleadingly suggested.",
    "Teaching precise interaction-design vocabulary.",
  ],
  whenNotToUse: [
    "As a vague synonym for 'looks clickable' — use 'signifier' for that.",
    "As evidence in itself; affordance analysis generates hypotheses to test with users.",
  ],
  advantages: [
    "Emphasises the relationship between product and person, including disability.",
    "Gaver's taxonomy gives a practical diagnostic for hidden and false affordances.",
  ],
  limitations: [
    "The term is used inconsistently, which causes miscommunication.",
    "Not a predictive model; it does not quantify how discoverable something is.",
    "Gibson's original theory is contested within psychology.",
  ],
  misconceptions: [
    {
      myth: "Norman invented affordances.",
      reality: "Gibson coined the term; Norman adapted it for design and later revised his usage {{src:norman-1999}} {{src:norman-2008}}.",
    },
    {
      myth: "A flat button 'has no affordance'.",
      reality: "If it can be clicked, the affordance exists. What it may lack is a signifier — a perceivable cue that it is clickable.",
    },
    {
      myth: "Affordances are properties of objects alone.",
      reality: "Affordances are relational: they depend on the actor's capabilities as well as the object {{src:gibson-1979}}.",
    },
  ],

  relations: [
    { target: "signifiers", type: "contrasts-with", note: "Affordances are action possibilities; signifiers are the perceivable cues that communicate them." },
    { target: "ecological-psychology", type: "derived-from", note: "The concept originates in Gibson's ecological approach to perception." },
    { target: "constraints", type: "complementary-to", note: "Constraints limit possible actions; affordances describe possible actions." },
    { target: "discoverability", type: "related-to", note: "Discoverability depends on affordances being perceivable." },
    { target: "mental-models", type: "related-to", note: "Perceived affordances shape the mental model users form of what an interface allows." },
    { target: "motor-accessibility", type: "applied-in", note: "Whether an action is afforded depends on users' motor capabilities." },
  ],

  exercises: [
    {
      id: "affordances-ex-gaver",
      kind: "critique",
      level: "beginner",
      title: "Classify affordances with Gaver",
      prompt: [
        "Choose one screen of an app you use. Find one perceptible affordance, one hidden affordance and one false affordance (or near-false: something that looks more interactive than it is).",
        "Explain each and propose a fix for the hidden and false ones.",
      ],
      deliverable: "Annotated screenshot.",
      criteria: ["Uses Gaver's categories correctly", "Distinguishes the action from its cue"],
    },
    {
      id: "affordances-ex-rewrite",
      kind: "reflection",
      level: "intermediate",
      title: "Rewrite the critique",
      prompt: [
        "A stakeholder writes: 'The new cards have no affordance, so nobody clicks them.' Rewrite this feedback using precise terms (affordance, signifier, convention, feedback), and propose two specific design changes.",
      ],
      criteria: ["Correctly identifies the problem as a signifier issue (if cards are clickable)", "Proposes changes to perceivable cues"],
      exampleSolution: [
        "'The cards afford clicking, but nothing signals it: there is no hover state, cursor change or visual convention suggesting interactivity. Add a hover/focus state and a visible 'View details' link or chevron.'",
      ],
    },
  ],

  quiz: [
    {
      id: "affordances-q-gibson",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "In Gibson's original sense, which statement about affordances is correct?",
      options: [
        { text: "They exist in the relationship between environment and animal, whether or not they are perceived.", correct: true, explanation: "Gibson treated affordances as real and relational, independent of perception." },
        { text: "They are visual cues added by designers.", correct: false, explanation: "That is closer to Norman's later 'signifier'." },
        { text: "They are properties of objects alone.", correct: false, explanation: "Affordances depend on the animal's capabilities as well." },
        { text: "They only exist on screens.", correct: false, explanation: "Gibson's concept concerned the natural environment." },
      ],
      explanation: "Gibson's affordances are relational and real; the design community's usage drifted towards perceived cues.",
    },
    {
      id: "affordances-q-false",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A blue, underlined heading that does nothing when clicked is an example of a…",
      options: [
        { text: "False affordance", correct: true, explanation: "It appears to afford clicking but does not." },
        { text: "Hidden affordance", correct: false, explanation: "Hidden affordances are possible actions that are not visible." },
        { text: "Perceptible affordance", correct: false, explanation: "That would require the click to actually do something." },
        { text: "Constraint", correct: false, explanation: "Constraints limit actions; this misleads about an action." },
      ],
      explanation: "Gaver's taxonomy: perceptible, hidden and false affordances.",
    },
    {
      id: "affordances-q-precise",
      kind: "critique",
      level: "advanced",
      prompt: "Which is the most precise critique of a clickable card with no hover state, cursor change or visual cue?",
      options: [
        { text: "The card affords clicking but lacks a signifier.", correct: true, explanation: "The action is possible; what is missing is the perceivable indication." },
        { text: "The card has no affordance.", correct: false, explanation: "If it is clickable, the affordance exists." },
        { text: "The card is a false affordance.", correct: false, explanation: "A false affordance looks actionable but is not; here it is actionable but does not look it." },
        { text: "The card violates Fitts's law.", correct: false, explanation: "Fitts's law concerns movement time, not discoverability." },
      ],
      explanation: "Norman (2008, 2013) recommends 'signifier' for the perceivable cue.",
      revise: "signifiers",
    },
  ],

  flashcards: [
    { id: "affordances-fc-1", front: "Who coined 'affordance'?", back: "James J. Gibson (ecological psychology); adapted for design by Donald Norman." },
    { id: "affordances-fc-2", front: "Gaver's three types", back: "Perceptible (possible and visible), hidden (possible, not visible), false (visible, not possible)." },
    { id: "affordances-fc-3", front: "Affordance vs signifier", back: "Affordance: what actions are possible. Signifier: what communicates where and how to act." },
  ],

  references: [
    { source: "gibson-1979", role: "primary", note: "Original theory of affordances." },
    { source: "norman-1988", role: "primary", note: "Introduction of affordances to design." },
    { source: "norman-1999", role: "primary", note: "Real vs perceived affordances." },
    { source: "norman-2008", role: "primary", note: "Signifiers proposed." },
    { source: "gaver-1991", role: "primary", note: "Technology affordances taxonomy." },
    { source: "mcgrenere-ho-2000", role: "primary", note: "Analysis of conceptual drift." },
    { source: "norman-2013", role: "explanatory", note: "Revised treatment of affordances and signifiers." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "Affordance is an established theoretical concept from ecological psychology and a standard analytic term in HCI. Its design usage is contested and inconsistent, as documented in the literature. It does not by itself make testable predictions about usability; claims about discoverability should be tested with users.",

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
