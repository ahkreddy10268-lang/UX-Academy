import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "gulfs-of-execution-and-evaluation",
  slug: "gulfs-of-execution-and-evaluation",
  title: "Gulfs of Execution and Evaluation",
  alternateNames: ["The two gulfs", "Gulf of execution", "Gulf of evaluation", "Norman's gulfs"],
  summary:
    "Two gaps every interaction must bridge: working out how to make the system do what you want (execution), and working out what the system did (evaluation).",
  definition:
    "The gulfs of execution and evaluation are a model of the distance between a person's goals and a system's physical state. The **gulf of execution** is the gap between what a person intends and the actions the system allows; the **gulf of evaluation** is the gap between the system's output and the person's ability to perceive, interpret and judge whether the goal was met. Described by Hutchins, Hollan and Norman (1985) and Norman (1986), the gulfs are bridged from both sides — by users' effort and by design — and are elaborated in Norman's **seven stages of action**.",
  primaryType: "model",
  secondaryTypes: ["concept"],
  domain: "psychology",
  subcategory: "human-factors",
  tags: ["seven stages of action", "feedback", "direct manipulation", "Norman", "usability evaluation", "mental models"],
  difficulty: "beginner",
  disciplines: ["Human-computer interaction", "Cognitive engineering", "Interaction design"],
  learningObjectives: [
    "Define the gulf of execution and the gulf of evaluation with interface examples.",
    "Map an interaction onto the seven stages of action and locate where it breaks down.",
    "Choose design techniques that narrow each gulf (signifiers, mapping, constraints, feedback, visible state).",
    "Explain semantic and articulatory distance in direct-manipulation interfaces.",
  ],
  prerequisites: ["mental-models"],

  levels: {
    beginner: {
      explanation: [
        "Every time you use something, you cross two gaps. First: **How do I make it do what I want?** That is the **gulf of execution**. Second: **Did it work?** That is the **gulf of evaluation**.",
        "A hotel shower with unmarked dials has a wide gulf of execution — you don't know which way gives hot water. A printer that shows nothing after you press Print has a wide gulf of evaluation — you can't tell whether anything happened.",
        "Good design narrows both gulfs. Clear controls and labels make it obvious what to do. Clear feedback makes it obvious what happened.",
      ],
      analogy:
        "Talking to someone across a river: you have to shout loud enough to be heard (execution), and you have to be able to hear and understand their reply (evaluation). A bridge — good design — makes both directions easy.",
      everydayExamples: [
        "A light switch that turns on a lamp across the room: easy execution, but evaluation is hard if you can't see the lamp.",
        "An online form that says 'Submitted — we'll email you within 24 hours': a narrow gulf of evaluation.",
        "A TV remote with 50 unlabelled buttons: a wide gulf of execution.",
      ],
      vocabulary: [
        { term: "Gulf of execution", meaning: "The gap between what you want to do and knowing how to do it with the system." },
        { term: "Gulf of evaluation", meaning: "The gap between what the system did and your ability to tell what happened." },
        { term: "Feedback", meaning: "Information the system gives about the result of an action." },
        { term: "Seven stages of action", meaning: "Norman's breakdown of an interaction from goal to evaluation." },
      ],
    },
    intermediate: {
      explanation: [
        "Norman's cognitive-engineering account describes interaction as a cycle {{src:norman-1986}}. In the revised *Design of Everyday Things*, the **seven stages of action** are: *goal* (form the goal); *plan*, *specify* and *perform* (the execution side); *perceive*, *interpret* and *compare* (the evaluation side) {{src:norman-2013}}. Each stage is a place where users can get stuck, and each suggests a design question.",
        "Execution questions: *What can I do? What alternatives exist? How do I do it?* — answered by [[signifiers]], [[mapping]], [[constraints]] and visible options. Evaluation questions: *What happened? What does it mean? Is it what I wanted?* — answered by [[feedback-principle|feedback]], visible system status and a clear [[conceptual-models|conceptual model]].",
        "The gulfs can be bridged from either side. Users can bridge them by learning the system, forming better mental models and paying attention. Designers can bridge them by changing the interface. Usability work aims to move the burden from users to the design.",
      ],
      howItWorks: [
        "Goal → plan → specify → perform: the user translates an intention into a sequence of physical actions the system accepts.",
        "Perceive → interpret → compare: the user translates the system's output back into terms of the goal.",
        "Breakdowns at execution produce 'I don't know how to…'; breakdowns at evaluation produce 'Did that work?' or misinterpretation.",
        "Many real interactions are opportunistic: they start from perceiving something interesting in the world, not from a goal — the cycle can begin at any stage {{src:norman-2013}}.",
      ],
      implementation: [
        "Execution: make possible actions visible, label them in users' language, map controls to outcomes, constrain invalid actions.",
        "Evaluation: give immediate feedback for every action, show system state, describe results in goal terms ('Payment sent to Alex'), not system terms ('Transaction 4012 posted').",
        "Use previews and undo so users can evaluate before committing.",
        "In usability testing, classify observed problems by stage to choose the right kind of fix.",
      ],
      scenarios: [
        "A thermostat with a single up/down control but no display of current vs. target temperature: evaluation gulf. Show both values.",
        "A data import that silently skips invalid rows: wide evaluation gulf. Report rows imported and skipped, with reasons.",
        "A photo editor whose crop tool is hidden in a nested menu: execution gulf. Surface it in the toolbar when an image is selected.",
      ],
    },
    advanced: {
      explanation: [
        "Hutchins, Hollan and Norman introduced the gulfs in their analysis of **direct manipulation** {{src:hutchins-hollan-norman-1985}}. They decomposed the feeling of 'directness' into two kinds of distance. **Semantic distance** is the gap between what the user wants to express and what the interface's language can express (can I say what I mean?). **Articulatory distance** is the gap between the meaning of an expression and its form (does the form of the action resemble its meaning — dragging a file to a folder vs. typing `mv`?). Both apply to execution and evaluation. Their point was that direct manipulation reduces distance, but at a cost in generality and expressive power.",
        "This analysis complemented Shneiderman's description of direct manipulation's properties — continuous representation of objects, physical actions instead of complex syntax, and rapid, incremental, reversible operations with immediately visible results {{src:shneiderman-1983}}. Where Shneiderman listed features, Hutchins, Hollan and Norman explained *why* they work in cognitive terms.",
        "The seven-stage model is an **approximate** theory of action, not a precise cognitive model; Norman describes it as a framework for analysis {{src:norman-1986}}. It is closely related to evaluative methods: the [[cognitive-walkthrough|cognitive walkthrough]] asks stage-like questions about whether users will form the right intention, notice the correct action, associate it with their goal and see progress.",
      ],
      evidence: [
        "The gulfs are an analytic model from cognitive engineering, widely used in HCI teaching and evaluation; they are not a quantitative law.",
        "The model's influence is evident in evaluation methods and design principles such as feedback and visibility of system status, though direct experimental tests of the model as such are rare.",
      ],
      debates: [
        "**Goal-driven bias.** The model assumes goal-directed action; situated-action perspectives argue much human activity is improvised in response to circumstances — see [[situated-action]].",
        "**Generality vs. directness.** Reducing articulatory distance (direct manipulation) can limit expressive power; command languages can be 'farther' but more powerful for experts {{src:hutchins-hollan-norman-1985}}.",
        "**Individual vs. distributed.** The model centres on one person and one system; collaborative and distributed work spreads execution and evaluation across people and artefacts.",
      ],
      alternativeModels: [
        "**[[seven-stages-of-action|Seven stages of action]]** — the detailed stage model built on the gulfs.",
        "**[[goms|GOMS]]** and the **[[keystroke-level-model|Keystroke-Level Model]]** — quantitative models of the execution side for skilled users {{src:card-moran-newell-1983}}.",
        "**[[situated-action|Situated action]]** and **[[activity-theory|activity theory]]** — alternatives emphasising context over pre-formed plans.",
      ],
    },
  },

  origin: {
    contributors: ["Edwin Hutchins", "James Hollan", "Donald A. Norman"],
    period: "1985–1986, University of California San Diego (cognitive engineering)",
    problem:
      "Why do direct-manipulation interfaces feel easier than command languages, and how can designers analyse where any interaction becomes difficult?",
    narrative: [
      "Hutchins, Hollan and Norman's 1985 paper 'Direct Manipulation Interfaces' introduced the gulfs and the notions of semantic and articulatory distance {{src:hutchins-hollan-norman-1985}}, responding in part to Shneiderman's 1983 account of direct manipulation {{src:shneiderman-1983}}.",
      "Norman's chapter 'Cognitive Engineering' in *User Centered System Design* (1986) presented the stages of action and the gulfs as a basis for design {{src:norman-1986}}.",
      "*The Psychology of Everyday Things* (1988) brought the seven stages to designers {{src:norman-1988}}; the 2013 revision updated the stage names and emphasised that cycles can start anywhere {{src:norman-2013}}.",
    ],
  },

  application: {
    summary: [
      "Use the gulfs as a **diagnostic lens** in design reviews and usability testing: for every failure, ask whether the user did not know how to act (execution) or could not tell what happened (evaluation). The answer points to different fixes.",
    ],
    web: [
      "Show validation results inline as users type or on blur; confirm submissions with what will happen next.",
      "Surface primary actions where users look for them; label in task language.",
    ],
    mobile: [
      "Provide visible feedback for taps (pressed states, haptics) and for background actions (upload progress).",
      "Avoid gesture-only actions that widen the execution gulf.",
    ],
    enterprise: [
      "Summarise the effect of bulk actions before and after execution ('42 records will be archived' → '42 archived, 3 failed').",
      "Use previews for complex configuration so users can evaluate before applying.",
    ],
    services: [
      "Service journeys often have long evaluation gulfs (waiting for a decision); status updates and expected timelines narrow them.",
    ],
    steps: [
      "Pick a key task and write the user's goal in their own words.",
      "Walk through the seven stages, noting the interface element that supports each.",
      "Mark stages with weak or missing support.",
      "Design fixes: signifiers/mapping/constraints for execution; feedback/state/conceptual clarity for evaluation.",
      "Verify with users: observe whether they act without hesitation and correctly describe the result.",
    ],
  },

  whenToUse: [
    "Structuring a design critique or heuristic review.",
    "Classifying usability-test findings to choose the right fix.",
    "Teaching why feedback and visibility matter.",
  ],
  whenNotToUse: [
    "As a precise predictive model of time or errors — use GOMS/KLM or empirical testing for that.",
    "For highly exploratory or social activity where goals are not formed in advance, without acknowledging its goal-driven bias.",
  ],
  advantages: [
    "Simple, memorable and applicable to any interactive system.",
    "Connects directly to concrete design principles.",
    "Bridges cognitive theory and practical evaluation.",
  ],
  limitations: [
    "Qualitative; does not quantify the size of a gulf.",
    "Assumes goal-directed individual action.",
    "Stages are idealised; real interaction interleaves and skips them.",
  ],
  misconceptions: [
    {
      myth: "The gulfs only matter for novices.",
      reality: "Experts face them too in unfamiliar features, error states and complex systems; expertise narrows them through learning, not by eliminating them.",
    },
    {
      myth: "Feedback alone solves usability problems.",
      reality: "Feedback narrows the evaluation gulf; it does nothing for users who cannot work out how to act in the first place.",
    },
    {
      myth: "The seven stages are a strict sequence.",
      reality: "Norman notes that activity can start at any stage and that people often skip or loop stages {{src:norman-2013}}.",
    },
  ],

  relations: [
    { target: "seven-stages-of-action", type: "complementary-to", note: "The seven stages elaborate the two gulfs into execution and evaluation steps." },
    { target: "mental-models", type: "related-to", note: "Mismatched mental models widen both gulfs." },
    { target: "feedback-principle", type: "applied-in", note: "Feedback is the primary design tool for narrowing the gulf of evaluation." },
    { target: "signifiers", type: "applied-in", note: "Signifiers narrow the gulf of execution by showing what actions are possible." },
    { target: "direct-manipulation", type: "related-to", note: "The gulfs were introduced to explain why direct manipulation feels direct." },
    { target: "cognitive-walkthrough", type: "influences", note: "Cognitive walkthrough questions mirror the stages of execution and evaluation." },
    { target: "visibility-of-system-status", type: "applied-in", note: "Visible system status helps users perceive and interpret results." },
  ],

  exercises: [
    {
      id: "gulfs-of-execution-and-evaluation-ex-stages",
      kind: "critique",
      level: "beginner",
      title: "Seven stages of a coffee machine",
      prompt: [
        "Choose a device or app you find frustrating (a coffee machine, a parking meter, a smart-home app). Walk through one task using the seven stages of action.",
        "Mark which stage(s) fail, and say whether the problem is on the execution or evaluation side.",
      ],
      deliverable: "A seven-row table with one design fix for each failing stage.",
      criteria: ["Uses all seven stages", "Classifies failures correctly", "Fixes match the gulf type"],
    },
    {
      id: "gulfs-of-execution-and-evaluation-ex-findings",
      kind: "assignment",
      level: "intermediate",
      title: "Classify usability findings",
      prompt: [
        "Take ten findings from a usability study (yours or a published case study). Classify each as an execution or evaluation problem, and by stage.",
        "Identify whether one gulf dominates and what that suggests about the design's weaknesses.",
      ],
      deliverable: "A classified findings list and a one-paragraph synthesis.",
      criteria: ["Justifies each classification", "Draws a design-level conclusion"],
    },
    {
      id: "gulfs-of-execution-and-evaluation-ex-distance",
      kind: "reflection",
      level: "advanced",
      title: "Semantic vs. articulatory distance",
      prompt: [
        "Compare renaming 200 files in a graphical file manager and with a command-line tool. Analyse each in terms of semantic and articulatory distance for execution and evaluation. When is the 'less direct' interface better?",
      ],
      criteria: ["Defines both distances correctly", "Recognises the trade-off between directness and expressive power"],
    },
  ],

  quiz: [
    {
      id: "gulfs-of-execution-and-evaluation-q-classify",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "After uploading a file, users can't tell whether the upload succeeded. Which gulf is too wide?",
      options: [
        { text: "Gulf of evaluation", correct: true, explanation: "Users cannot perceive or interpret the result of their action." },
        { text: "Gulf of execution", correct: false, explanation: "Users managed to perform the action; the problem is understanding the outcome." },
        { text: "Both equally", correct: false, explanation: "Execution succeeded; evaluation failed." },
        { text: "Neither — this is a performance issue", correct: false, explanation: "Performance may be involved, but the missing feedback is an evaluation problem." },
      ],
      explanation: "Missing or unclear feedback widens the gulf of evaluation.",
    },
    {
      id: "gulfs-of-execution-and-evaluation-q-stages",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which list gives the execution stages of Norman's seven stages of action (2013 edition)?",
      options: [
        { text: "Plan, specify, perform", correct: true, explanation: "These follow the goal and translate it into action." },
        { text: "Perceive, interpret, compare", correct: false, explanation: "These are the evaluation stages." },
        { text: "Goal, feedback, mapping", correct: false, explanation: "Feedback and mapping are design principles, not stages." },
        { text: "Search, select, confirm", correct: false, explanation: "These are not Norman's stage names." },
      ],
      explanation: "Goal; then plan, specify, perform (execution); then perceive, interpret, compare (evaluation).",
    },
    {
      id: "gulfs-of-execution-and-evaluation-q-articulatory",
      kind: "scenario",
      level: "advanced",
      prompt: "Dragging a document icon onto a printer icon to print it, rather than typing a print command, primarily reduces which kind of distance in Hutchins, Hollan & Norman's analysis?",
      options: [
        { text: "Articulatory distance", correct: true, explanation: "The form of the action (moving the document to the printer) resembles its meaning." },
        { text: "Semantic distance", correct: false, explanation: "Semantic distance concerns whether the interface's language can express the user's intention at all; both methods can express 'print this'." },
        { text: "Index of difficulty", correct: false, explanation: "That is a Fitts's law term." },
        { text: "Information scent", correct: false, explanation: "Information scent concerns navigation cues." },
      ],
      explanation: "Articulatory distance is the gap between an expression's meaning and its physical form.",
    },
  ],

  flashcards: [
    { id: "gulfs-of-execution-and-evaluation-fc-1", front: "Gulf of execution vs evaluation", back: "Execution: from intention to action ('How do I do it?'). Evaluation: from system output to understanding ('Did it work?')." },
    { id: "gulfs-of-execution-and-evaluation-fc-2", front: "Seven stages of action (2013)", back: "Goal; plan, specify, perform; perceive, interpret, compare." },
    { id: "gulfs-of-execution-and-evaluation-fc-3", front: "Semantic vs articulatory distance", back: "Semantic: can the interface express what I mean? Articulatory: does the form of the action resemble its meaning?" },
  ],

  references: [
    { source: "hutchins-hollan-norman-1985", role: "primary", note: "Introduction of the gulfs and semantic/articulatory distance." },
    { source: "norman-1986", role: "primary", note: "Stages of action and cognitive engineering." },
    { source: "norman-1988", role: "primary", note: "Seven stages of action for designers." },
    { source: "norman-2013", role: "primary", note: "Revised seven stages and design principles." },
    { source: "shneiderman-1983", role: "primary", note: "Direct manipulation properties." },
    { source: "card-moran-newell-1983", role: "further", note: "Quantitative models of skilled execution (GOMS)." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "The gulfs and seven stages are an established analytic model in cognitive engineering and HCI, foundational to design principles and evaluation methods. They are qualitative and rarely tested directly as a model; their value lies in diagnosis and in organising design principles, not in quantitative prediction.",

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
