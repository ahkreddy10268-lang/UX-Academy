import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "mental-models",
  slug: "mental-models",
  title: "Mental Models",
  alternateNames: ["User mental model", "Users' models", "Internal models"],
  summary:
    "The internal, simplified explanations people build of how a system works — which they use to predict what will happen and decide what to do.",
  definition:
    "A mental model is a person's internal representation of how something works, which they use to explain, predict and act. In HCI, the term usually refers to a **user's** model of a system, as distinct from the **designer's conceptual model** and the **system image** — the product's appearance, behaviour and documentation through which users form their model. Norman characterised users' mental models as typically incomplete, unstable, boundary-less, 'unscientific' and parsimonious.",
  primaryType: "concept",
  secondaryTypes: ["theory"],
  domain: "psychology",
  subcategory: "human-factors",
  tags: ["cognition", "conceptual model", "system image", "expectations", "learnability", "user research"],
  difficulty: "beginner",
  disciplines: ["Cognitive psychology", "Human-computer interaction", "User research", "Interaction design"],
  learningObjectives: [
    "Define a mental model and distinguish it from a conceptual model and the system image.",
    "Recognise symptoms of a mismatch between a user's mental model and the system.",
    "Use research methods to uncover users' mental models.",
    "Design a system image that communicates an appropriate conceptual model, and know when users need a 'how it works' model versus procedures.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Everyone carries little explanations in their head about how things work. You might believe that turning a thermostat higher makes a room warm up *faster* — that is a mental model. It helps you decide what to do, even when it is wrong.",
        "People do the same with apps. Someone may think that 'deleting' a photo removes it everywhere, or that a cloud folder is stored on their laptop. When their model matches how the product really works, it feels easy. When it does not, people make mistakes and lose trust.",
        "Designers cannot put a model directly into anyone's head. Users build it from what they see and experience: labels, layout, feedback, previous products. So designers must make the product *explain itself* through its design.",
      ],
      analogy:
        "A mental model is like a rough sketch map of a city in your head. It leaves out most streets and might put a park in the wrong place, but it is good enough to get you to work. If the city's signs and layout match your sketch, you rarely get lost.",
      everydayExamples: [
        "Many people believe pressing a lift button repeatedly makes it come faster.",
        "Users often think 'Save' in a cloud document is needed, even when changes are saved automatically.",
        "People expect a trash or bin icon to let them recover items, because physical bins can be emptied later.",
      ],
      vocabulary: [
        { term: "Mental model", meaning: "A person's internal explanation of how something works." },
        { term: "Conceptual model", meaning: "The designer's intended explanation of how the system works." },
        { term: "System image", meaning: "Everything the user can perceive about a system — its interface, behaviour, messages and documentation." },
        { term: "Mismatch", meaning: "When a user's mental model leads them to expect something the system does not do." },
      ],
    },
    intermediate: {
      explanation: [
        "Norman's framing in *The Design of Everyday Things* separates three models {{src:norman-2013}}. The **design model** (or conceptual model) is the designer's understanding of how the product works. The **user's model** is what the user believes. The designer communicates only through the **system image**. If the system image is unclear or inconsistent, users form an inaccurate model, however sound the design model is.",
        "Users' mental models are not complete or accurate replicas. Norman's early observations describe them as incomplete, limited in how far people can 'run' them mentally, unstable (details are forgotten), without firm boundaries between similar systems, superstitious and parsimonious {{src:norman-1983}}. This means designers should expect models to be borrowed from familiar products — a reason consistency with conventions (see [[jakobs-law]]) is so powerful.",
        "Mismatches show up as predictable errors: users perform actions that make sense in their model but not in the system's. Uncovering models is a research task: think-aloud observation, interviews asking users to explain how something works, card sorting for structure, and asking users to draw or predict what will happen.",
      ],
      howItWorks: [
        "Users bring prior models from similar products, the physical world and culture, and map them onto a new system.",
        "Each interaction either confirms or contradicts the model; feedback and visible state are the main sources of correction.",
        "Models are revised slowly; a single contradiction is often explained away rather than prompting a new model.",
        "A good conceptual model is simple, consistent and expressed through the interface's objects, labels and behaviour — so the system image teaches it.",
      ],
      implementation: [
        "Define the conceptual model explicitly before designing screens: the core objects, their relationships, and the actions on them.",
        "Use consistent names for the same objects and actions everywhere.",
        "Make system state and consequences visible — what is synced, where something is stored, what an action will affect.",
        "Leverage existing conventions where your conceptual model matches them; deliberately signal where it differs.",
        "Research users' current models before redesigning, especially for migrations from legacy tools.",
        "Use previews and undo so users can safely test their predictions.",
      ],
      scenarios: [
        "File sync: users assume files in a cloud folder exist on the device; when offline they cannot open them. Show availability status clearly.",
        "Banking: users think 'pending' transactions mean failure; explaining the states in the transaction list reduces support calls.",
        "Permissions: users assume removing someone from a team revokes access to shared documents; the system's model differs. Show what access remains.",
      ],
    },
    advanced: {
      explanation: [
        "The idea that minds build 'small-scale models' of reality to anticipate events was articulated by Kenneth Craik {{src:craik-1943}}. Johnson-Laird developed mental-model theory as an account of reasoning and language comprehension, in which people reason by constructing and inspecting models of possible situations {{src:johnson-laird-1983}}. The HCI use of the term, crystallised in the collection edited by Gentner and Stevens (1983), is related but looser: it covers people's knowledge of devices and systems {{src:norman-1983}}.",
        "Experiments on device models showed that a 'how it works' model can matter. Kieras and Bovair found that learners given a model of a control panel's internal workings learned procedures faster, retained them better and inferred procedures more effectively than learners given only procedures {{src:kieras-bovair-1984}}. Halasz and Moran found that a conceptual model of a calculator helped with novel problems but not routine ones {{src:halasz-moran-1983}}; Young analysed the different models users form of calculators {{src:young-1981}}.",
        "These results suggest a nuance designers often miss: **mental models help most for novel problems and troubleshooting**, much less for routine tasks, where procedural knowledge suffices. Investing in explaining how a system works pays off when users must recover from errors, handle unusual cases, or make consequential decisions (privacy settings, sync, permissions).",
      ],
      evidence: [
        "Controlled experiments support benefits of device models for learning, retention and inference of procedures {{src:kieras-bovair-1984}}, mainly for non-routine tasks {{src:halasz-moran-1983}}.",
        "Qualitative studies across domains consistently document incomplete and inconsistent user models, as Norman described {{src:norman-1983}}.",
        "Much practitioner use of 'mental model' is descriptive and not tied to a specific theory; claims should be supported by research with actual users.",
      ],
      debates: [
        "**What is a mental model?** The term covers everything from formal reasoning models (Johnson-Laird) to vague beliefs about a product. Its looseness makes it useful in practice but hard to test.",
        "**Should interfaces teach accurate models or hide complexity?** Some argue users only need a functional 'surrogate' model that predicts behaviour, not an accurate account of internals.",
        "**Metaphors.** Interface metaphors (desktop, folder, trash) borrow models quickly but carry misleading implications; deviations from the metaphor can cause errors.",
      ],
      alternativeModels: [
        "**[[gulfs-of-execution-and-evaluation|Gulfs of execution and evaluation]]** describe where mismatches between the user's model and the system become visible during action.",
        "**[[conceptual-models|Conceptual models]]** — the designer-side artefact — and object-oriented UX approaches make the intended model explicit.",
        "**[[distributed-cognition|Distributed cognition]]** locates knowledge partly in artefacts and other people, not only in individual heads.",
      ],
    },
  },

  origin: {
    contributors: ["Kenneth Craik", "Philip Johnson-Laird", "Donald Norman", "Dedre Gentner", "Albert Stevens", "David Kieras"],
    period: "Craik 1943; cognitive science and HCI from the early 1980s",
    problem:
      "How do people understand and predict the behaviour of complex systems they cannot see inside — and why do they make systematic errors when using them?",
    narrative: [
      "Craik proposed that thinking involves building small-scale models of the world {{src:craik-1943}}.",
      "In 1983, Johnson-Laird's book developed mental-model theory for reasoning {{src:johnson-laird-1983}}, and Gentner and Stevens's edited volume, including Norman's observations, established the term in research on how people understand devices {{src:norman-1983}}.",
      "Experimental HCI work tested the value of device models {{src:kieras-bovair-1984}} {{src:halasz-moran-1983}}. Norman's design books popularised the distinction between the design model, user's model and system image {{src:norman-2013}}.",
    ],
  },

  application: {
    summary: [
      "Use mental models as a research lens (*what do users believe?*) and as a design discipline (*what model does our system image teach?*). They matter most in systems with invisible state: sync, permissions, privacy, payments, AI behaviour.",
    ],
    web: [
      "Explain where data lives and who can see it, at the moment users make relevant choices.",
      "Use consistent object names across navigation, headings and actions.",
    ],
    mobile: [
      "Show sync, download and offline status where users access content.",
      "Respect platform conventions so users' existing models transfer.",
    ],
    enterprise: [
      "Map legacy users' models before migrations; preserve or explicitly re-teach key concepts.",
      "Model domain objects explicitly (object-oriented UX) so the interface reflects how users think about their work.",
    ],
    services: [
      "Citizens' models of eligibility and process often differ from policy; show what happens next and why.",
    ],
    steps: [
      "Research: ask users to explain, predict or draw how the system works; observe errors.",
      "Document current mental models and mismatches.",
      "Define the target conceptual model: objects, relationships, actions, states.",
      "Design the system image to express it: labels, structure, feedback, onboarding.",
      "Test with prediction tasks: 'What do you think will happen if…?'",
    ],
  },

  whenToUse: [
    "Diagnosing recurring user errors or support calls.",
    "Designing systems with invisible state or complex rules.",
    "Planning migrations, redesigns and new product categories.",
  ],
  whenNotToUse: [
    "As a substitute for research — assumed mental models are hypotheses until tested.",
    "To justify over-explaining routine tasks where procedures suffice.",
  ],
  advantages: [
    "Explains systematic errors as rational behaviour from a mistaken model.",
    "Connects research findings directly to design decisions.",
    "Applies across products and domains.",
  ],
  limitations: [
    "The concept is loosely defined and hard to measure precisely.",
    "Users' models are individual and varied; there is rarely one 'user mental model'.",
    "Evidence for benefits of teaching models is strongest for novel or troubleshooting tasks.",
  ],
  misconceptions: [
    {
      myth: "The goal is for users to understand exactly how the system works.",
      reality: "Users need a model good enough to predict outcomes and recover from errors. Accurate internals are often unnecessary.",
    },
    {
      myth: "Designers can give users a mental model.",
      reality: "Users construct models from the system image and prior experience. Designers influence models only through what users perceive {{src:norman-2013}}.",
    },
    {
      myth: "'Mental model' and 'conceptual model' are synonyms.",
      reality: "The conceptual (design) model is the designer's intended account; the mental model is what the user actually believes.",
    },
  ],

  relations: [
    { target: "conceptual-models", type: "contrasts-with", note: "The conceptual model is the designer's intended account; mental models are users' actual beliefs." },
    { target: "gulfs-of-execution-and-evaluation", type: "related-to", note: "Mismatched mental models widen the gulfs between intention, action and interpretation." },
    { target: "jakobs-law", type: "related-to", note: "Users transfer mental models from familiar products, the basis of Jakob's law." },
    { target: "signifiers", type: "applied-in", note: "Signifiers are part of the system image through which users form their models." },
    { target: "card-sorting", type: "measured-by", note: "Card sorting reveals users' mental models of how content is organised." },
    { target: "think-aloud-protocol", type: "measured-by", note: "Think-aloud sessions expose users' expectations and reasoning during use." },
  ],

  exercises: [
    {
      id: "mental-models-ex-interview",
      kind: "assignment",
      level: "intermediate",
      title: "Uncover a mental model",
      prompt: [
        "Interview two people about how a cloud storage or photo-sync service works. Ask them to explain what happens when they delete a file on their phone, and to draw where their files 'live'.",
        "Compare their explanations with how the service actually works. List the mismatches and the errors each could cause.",
      ],
      deliverable: "Two sketches with annotations and a mismatch table.",
      criteria: [
        "Uses prediction or explanation prompts, not leading questions",
        "Identifies concrete mismatches",
        "Links each mismatch to a possible error",
      ],
    },
    {
      id: "mental-models-ex-system-image",
      kind: "scenario",
      level: "advanced",
      title: "Redesign the system image",
      prompt: [
        "In a team workspace product, removing a user from a team does not remove their access to documents shared with them individually. Support receives many complaints about 'leaked' access.",
        "Define the conceptual model of access, then redesign the removal flow and document sharing UI so the system image communicates it.",
      ],
      deliverable: "Conceptual model diagram and flow redesign.",
      criteria: [
        "States the conceptual model explicitly",
        "Makes remaining access visible at the moment of removal",
        "Tests users' predictions after the redesign",
      ],
    },
  ],

  quiz: [
    {
      id: "mental-models-q-system-image",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In Norman's framework, how does a designer communicate their conceptual model to users?",
      options: [
        { text: "Through the system image: the interface, behaviour, messages and documentation", correct: true, explanation: "Users can only form models from what they perceive and experience of the system." },
        { text: "By telling users directly in a training session", correct: false, explanation: "Training is part of the system image at best; the core channel is the product itself." },
        { text: "Users automatically adopt the designer's model", correct: false, explanation: "Users construct their own models, often inaccurately." },
        { text: "Through the source code", correct: false, explanation: "Users rarely see the code; it is not how models are formed." },
      ],
      explanation: "The system image is the only bridge between design model and user's model.",
    },
    {
      id: "mental-models-q-routine",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "Studies such as Halasz & Moran (1983) and Kieras & Bovair (1984) suggest that giving users a 'how it works' model is most beneficial for…",
      options: [
        { text: "Novel problems, inference and troubleshooting", correct: true, explanation: "Models help users work out what to do in situations procedures did not cover." },
        { text: "Routine, well-practised tasks", correct: false, explanation: "Routine tasks can be done from procedural knowledge; models add little there." },
        { text: "Aesthetic preference", correct: false, explanation: "These studies measured learning and problem solving, not preference." },
        { text: "Pointing speed", correct: false, explanation: "Motor performance is modelled by Fitts's law, not mental models." },
      ],
      explanation: "Invest in explaining system behaviour where users must reason beyond routine procedures.",
    },
    {
      id: "mental-models-q-error",
      kind: "scenario",
      level: "intermediate",
      prompt: "Users repeatedly click 'Save' in a document editor that saves automatically, and some worry their work is lost. What is the most likely cause?",
      options: [
        { text: "Their mental model, built on older editors, expects manual saving, and the system image does not clearly show saved state.", correct: true, explanation: "Prior models transfer; without visible saved status, users cannot correct them." },
        { text: "The Save button is too small.", correct: false, explanation: "Size affects pointing, not the belief that saving is needed." },
        { text: "Users do not have a mental model.", correct: false, explanation: "Everyone forms some model; the issue is a mismatch." },
        { text: "Autosave violates WCAG.", correct: false, explanation: "Autosave is not an accessibility violation." },
      ],
      explanation: "Make state visible (e.g. 'All changes saved') to support an accurate model.",
    },
  ],

  flashcards: [
    { id: "mental-models-fc-1", front: "Design model, user's model, system image", back: "Designer's intended model; what the user believes; everything perceivable about the system — the only bridge between them." },
    { id: "mental-models-fc-2", front: "Norman's six properties of mental models (1983)", back: "Incomplete, limited ability to run, unstable, no firm boundaries, unscientific (superstitious), parsimonious." },
  ],

  references: [
    { source: "craik-1943", role: "primary", note: "Origin of the idea of internal small-scale models." },
    { source: "johnson-laird-1983", role: "primary", note: "Mental-model theory of reasoning." },
    { source: "norman-1983", role: "primary", note: "Observations on users' mental models." },
    { source: "kieras-bovair-1984", role: "primary", note: "Experimental evidence for device models." },
    { source: "halasz-moran-1983", role: "primary", note: "Conceptual models help with novel problems." },
    { source: "young-1981", role: "primary", note: "Users' models of calculators." },
    { source: "norman-2013", role: "explanatory", note: "Design model, user's model, system image." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "Mental models are an established concept with experimental support for the value of device models in learning and problem solving, and extensive qualitative evidence of incomplete and inconsistent user models. The concept is loosely defined in practice; specific claims about what users believe require research with those users.",

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
