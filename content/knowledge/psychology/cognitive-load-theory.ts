import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "cognitive-load-theory",
  slug: "cognitive-load-theory",
  title: "Cognitive Load Theory",
  alternateNames: ["CLT", "Sweller's cognitive load theory"],
  summary:
    "An instructional-design theory holding that learning is constrained by limited working memory, so material should minimise processing that does not contribute to understanding.",
  definition:
    "Cognitive Load Theory (CLT) is a theory of instructional design, originated by John Sweller, which assumes a working memory that is severely limited when handling novel information and a long-term memory of effectively unlimited schemas. It explains learning outcomes by the load a task imposes on working memory, traditionally divided into **intrinsic** load (set by the material's element interactivity relative to the learner's expertise), **extraneous** load (imposed by how information is presented) and **germane** load (resources devoted to schema construction).",
  primaryType: "theory",
  secondaryTypes: ["framework"],
  domain: "psychology",
  subcategory: "cognitive",
  tags: ["working memory", "learning", "instructional design", "complexity", "onboarding", "information density"],
  difficulty: "intermediate",
  disciplines: ["Educational psychology", "Cognitive psychology", "Instructional design", "Human-computer interaction"],
  learningObjectives: [
    "Explain the three classic types of cognitive load and the revision the theory's authors made to germane load.",
    "Identify sources of extraneous load in an interface, such as split attention and redundancy.",
    "Apply CLT-derived effects to onboarding, forms and dense professional tools — including the expertise reversal effect.",
    "Evaluate the limits of transferring an instructional-design theory to general interface design, and the problems of measuring load.",
  ],
  prerequisites: ["working-memory-model"],

  levels: {
    beginner: {
      explanation: [
        "Your mind can only juggle a few new things at once. When something is unfamiliar — a new app, a complex form, a tricky concept — that juggling space fills up quickly. Cognitive Load Theory is a set of ideas about what fills that space, and how to stop it overflowing.",
        "The theory separates **what is genuinely hard about the subject** from **what is hard because of the way it is presented**. Learning to read a balance sheet is hard in itself. Learning it from a page where the explanation is on one screen and the numbers are on another is harder for no good reason — that extra effort is wasted.",
        "Good design cannot make a difficult subject trivial, but it can remove the wasted effort so that the mind's limited capacity goes into understanding, not into hunting, remembering and decoding.",
      ],
      analogy:
        "Imagine carrying groceries from the car. Some bags are heavy because of what is inside (intrinsic load). Some trips are harder because the bags have no handles, the door is locked and the path is cluttered (extraneous load). You cannot make the shopping weigh less, but you can add handles, prop the door open and clear the path.",
      everydayExamples: [
        "A recipe that lists quantities next to each step is easier than one that makes you scroll back to the ingredient list every time.",
        "Assembly instructions with arrows drawn on the picture are easier than a picture with a separate numbered legend.",
        "A form that remembers your address from last time saves you from holding it in mind and retyping it.",
      ],
      vocabulary: [
        { term: "Working memory", meaning: "The small mental workspace that holds and manipulates information you are thinking about right now." },
        { term: "Long-term memory", meaning: "Your large, lasting store of knowledge and skills." },
        { term: "Schema", meaning: "An organised chunk of knowledge in long-term memory that lets you treat many details as one unit." },
        { term: "Intrinsic load", meaning: "Effort caused by the inherent complexity of what is being learned or done." },
        { term: "Extraneous load", meaning: "Effort caused by poor presentation — work that does not help understanding." },
      ],
    },
    intermediate: {
      explanation: [
        "CLT rests on a model of human cognitive architecture: novel information is processed in a working memory that can handle only a few interacting elements at a time and holds them only briefly; expertise consists of schemas stored in long-term memory that let many elements be processed as one {{src:sweller-van-merrienboer-paas-1998}}. Load is therefore always *relative to the person*: the same screen is high-load for a novice and low-load for an expert.",
        "**Intrinsic load** depends on *element interactivity* — how many elements must be considered simultaneously to understand the material {{src:sweller-1994}}. Configuring a pricing rule that combines region, currency, tax and discount is intrinsically high in interactivity; changing a display name is not. **Extraneous load** is imposed by design: split attention, redundant information, unexplained jargon, poor layout. The design goal is to reduce extraneous load, and to manage intrinsic load by sequencing and chunking rather than pretending it away.",
        "Applying CLT to interfaces requires care. CLT was developed for *instruction*, where the aim is lasting learning. Interfaces mix learning and doing: a user may want to complete a task with minimum effort and no learning at all. Hollender and colleagues argued that interface-induced load should be treated as a distinct form of extraneous load in technology-based learning {{src:hollender-et-al-2010}} — a useful bridge, but not proof that every CLT effect transfers to every product.",
      ],
      howItWorks: [
        "**Split-attention effect** — when people must mentally integrate sources that are physically or temporally separated (a diagram and its legend, an error message at the top of a long form and the field at the bottom), extra load is created; integrating the sources reduces it {{src:chandler-sweller-1991}}.",
        "**Redundancy effect** — presenting the same information in multiple forms (identical text on screen and narrated aloud) can increase load rather than help, because learners process both.",
        "**Worked-example effect** — for novices, studying worked solutions is often more effective than solving equivalent problems unaided, because unguided search consumes working memory {{src:sweller-1988}}.",
        "**Expertise reversal effect** — guidance that helps novices can hinder experts, who must reconcile redundant guidance with their existing schemas {{src:kalyuga-et-al-2003}}. In interfaces, this is the argument for adaptive or layered UIs and for dismissible onboarding.",
      ],
      implementation: [
        "Place instructions, labels, validation messages and help next to the element they refer to — eliminate split attention.",
        "Remove decorative or duplicated content that must still be read and dismissed.",
        "Sequence intrinsically complex tasks: break them into steps with one decision cluster per step, and show a summary before commit.",
        "Offer worked examples and sensible defaults in empty states and onboarding, then let experienced users skip or hide them.",
        "Externalise memory: show previous choices, keep context visible across steps, and prefer recognition over recall.",
        "Test with representative expertise levels — what is extraneous for an expert may be essential scaffolding for a novice.",
      ],
      scenarios: [
        "An analytics dashboard where chart legends sit in a separate panel — moving direct labels onto the series removes a split-attention cost on every reading.",
        "A tax-filing service with all 60 questions on one page — staging by topic manages intrinsic load without hiding anything required.",
        "A professional video editor whose onboarding tooltips cannot be dismissed — for experienced editors, this is extraneous load (expertise reversal).",
      ],
    },
    advanced: {
      explanation: [
        "Sweller's 1988 paper argued that means–ends problem solving, though effective at reaching a goal, imposes a heavy load that leaves little capacity for schema acquisition — explaining why solving many problems can produce little learning {{src:sweller-1988}}. The 1998 statement by Sweller, van Merriënboer and Paas formalised the three-load framework and the associated instructional effects {{src:sweller-van-merrienboer-paas-1998}}.",
        "The theory has been substantially revised. Germane load was originally an additive third load, which made the theory hard to falsify: any result could be explained by re-labelling load as germane. Sweller (2010) re-described germane load in terms of the working-memory resources devoted to dealing with intrinsic load {{src:sweller-2010}}, Kalyuga (2011) argued a separate germane category is unnecessary {{src:kalyuga-2011}}, and the authors' 20-year review adopts the resource-based view {{src:sweller-van-merrienboer-paas-2019}}. Modern CLT is effectively a two-load theory with a resource account of learning.",
        "The 2019 revision also bounds the theory: it applies to *biologically secondary* knowledge (culturally acquired, effortful — reading, mathematics, software) rather than *biologically primary* knowledge (acquired without instruction — such as general problem solving or recognising faces). This matters for UX: CLT is strongest where users must learn domain-specific, novel, high-interactivity material.",
      ],
      evidence: [
        "The core instructional effects (worked example, split attention, redundancy, expertise reversal) are supported by many controlled experiments in education, often with randomised designs and transfer tests {{src:sweller-van-merrienboer-paas-1998}} {{src:kalyuga-et-al-2003}}.",
        "Mayer and Moreno's multimedia-learning work offers converging techniques (segmenting, signalling, weeding) under a related theory of limited channel capacity {{src:mayer-moreno-2003}}.",
        "Measurement remains the weakest link. The most common measure is a single 9-point subjective mental-effort rating {{src:paas-1992}}; multi-item questionnaires that try to separate load types have been developed {{src:leppink-et-al-2013}}, but critics note that load is usually inferred from outcomes rather than measured independently {{src:de-jong-2010}}.",
      ],
      debates: [
        "**Falsifiability.** If any outcome can be explained post hoc by intrinsic, extraneous or germane load, the theory predicts little. The move to a resource account and element interactivity is partly a response to this critique {{src:de-jong-2010}}.",
        "**Transfer to interfaces.** Most evidence comes from learning tasks with learning outcomes. Evidence that the same effects govern task performance in everyday software is thinner and often indirect; claims like 'CLT proves minimal UIs are better' over-reach.",
        "**Subjective vs. objective measures.** Self-reported effort, dual-task performance, physiological signals (pupil dilation, heart-rate variability) and task outcomes often disagree; each captures a different aspect of mental effort. In product research, workload instruments such as [[nasa-tlx|NASA-TLX]] are more established than CLT-specific scales.",
      ],
      alternativeModels: [
        "**Mental workload** in human factors (see [[mental-workload]]) addresses operators' load during task performance rather than learning, with its own instruments.",
        "Mayer's **cognitive theory of multimedia learning** overlaps heavily, adding dual-channel (visual/verbal) assumptions drawn from [[dual-coding-theory|dual coding theory]].",
        "**Perceptual load** theory (see [[perceptual-load]]) concerns attentional selection, a different mechanism from working-memory load.",
      ],
    },
  },

  origin: {
    contributors: ["John Sweller", "Paul Chandler", "Fred Paas", "Jeroen van Merriënboer", "Slava Kalyuga"],
    period: "Late 1980s onward, University of New South Wales; major revisions 2010–2019",
    problem:
      "Why did students who solved many practice problems often fail to learn the underlying principles? Sweller sought an explanation grounded in the limits of human cognitive architecture.",
    narrative: [
      "Sweller's 1988 paper linked problem-solving strategy to working-memory load and schema acquisition {{src:sweller-1988}}. Through the 1990s, his group documented split-attention, redundancy and worked-example effects {{src:chandler-sweller-1991}}.",
      "The 1998 synthesis made CLT one of the most influential theories in instructional design {{src:sweller-van-merrienboer-paas-1998}}. The expertise reversal effect (2003) added the crucial insight that optimal design depends on the learner {{src:kalyuga-et-al-2003}}.",
      "From 2010 the theory was restructured around element interactivity, with germane load re-described as a resource rather than a load type {{src:sweller-2010}} {{src:sweller-van-merrienboer-paas-2019}}. HCI researchers began explicitly linking CLT to interface design around the same period {{src:hollender-et-al-2010}}.",
    ],
  },

  application: {
    summary: [
      "In UX, CLT is most useful as a **diagnostic vocabulary**: is this difficulty intrinsic to the user's job, or extraneous — created by us? It applies most strongly to learning-heavy experiences: onboarding, complex configuration, education, data analysis and professional tools.",
    ],
    web: [
      "Inline validation and help text next to fields instead of a summary at the top.",
      "Direct labelling of charts instead of separate legends.",
      "Multi-step flows for genuinely complex forms, with a persistent summary of choices.",
    ],
    mobile: [
      "Small screens increase split-attention risk; avoid flows that require remembering information from a previous screen — carry it forward.",
      "Use progressive disclosure for advanced settings rather than long scrolling lists.",
    ],
    enterprise: [
      "Experts benefit from density; novices from guidance. Provide layered modes, dismissible guidance and keyboard shortcuts (expertise reversal).",
      "Reduce extraneous load in high-stakes tools — consistent terminology, aligned data, and no context switching between windows to compare values.",
    ],
    services: [
      "Government and health services should not require citizens to remember reference numbers or eligibility rules across steps; show them where they are needed.",
    ],
    steps: [
      "Map the task and identify which elements must be considered *together* (intrinsic interactivity).",
      "Find extraneous load: split attention, redundancy, unexplained terms, memory demands, visual noise.",
      "Remove or integrate extraneous sources first.",
      "Manage intrinsic load by sequencing, chunking and defaults — without hiding essential information.",
      "Segment users by expertise and check whether guidance helps or hinders each group.",
      "Measure: task success, errors, time and a workload rating (e.g. NASA-TLX or a single effort item) before and after.",
    ],
  },

  whenToUse: [
    "Designing onboarding, tutorials, documentation and learning products.",
    "Diagnosing why a complex workflow overwhelms new users.",
    "Deciding how to sequence and integrate information in forms, configuration and data displays.",
  ],
  whenNotToUse: [
    "As a blanket argument for minimalism — removing information users need increases load because they must recall or search for it.",
    "As if subjective 'load' were directly measurable from a design without testing with users.",
    "For tasks dominated by perception, motor control or emotion, where other models are better suited.",
  ],
  advantages: [
    "Distinguishes inherent difficulty from design-created difficulty.",
    "Backed by a large body of controlled experimental research in education.",
    "Explains why the same design can help novices and hinder experts.",
  ],
  limitations: [
    "Developed for instruction; transfer to general task performance is plausible but less directly tested.",
    "Load types are hard to measure separately; most measures are subjective or indirect.",
    "The theory has changed significantly; older sources treat germane load in a way the authors have since revised.",
    "Does not address motivation, emotion or social context, which also shape effort.",
  ],
  misconceptions: [
    {
      myth: "Cognitive load is bad, so interfaces should minimise it.",
      reality:
        "Only *extraneous* load is waste. Intrinsic load comes with the task, and learning requires engaging with it. The aim is to free capacity for what matters, not to make every screen empty.",
    },
    {
      myth: "Fewer elements on screen always means lower cognitive load.",
      reality:
        "Hiding needed information forces recall and navigation, which can *increase* load. What matters is element interactivity and integration — see [[recognition-over-recall]] and [[progressive-disclosure]].",
    },
    {
      myth: "CLT says there are three additive types of load.",
      reality:
        "That was the 1998 formulation. Its authors now treat germane load as working-memory resources devoted to intrinsic load, not a separate additive load {{src:sweller-van-merrienboer-paas-2019}}.",
    },
    {
      myth: "Miller's 'seven plus or minus two' is the capacity limit CLT uses.",
      reality:
        "CLT relies on working memory being limited for novel interacting elements, but it does not depend on a specific number; later research suggests a smaller capacity of around four chunks {{src:cowan-2001}}.",
    },
  ],

  relations: [
    { target: "working-memory-model", type: "derived-from", note: "CLT's central assumption is a working memory with limited capacity and duration for novel information." },
    { target: "progressive-disclosure", type: "applied-in", note: "Staging complex options manages intrinsic load by reducing the number of elements handled at once." },
    { target: "recognition-over-recall", type: "complementary-to", note: "Keeping information visible removes the extraneous load of holding it in working memory." },
    { target: "nasa-tlx", type: "measured-by", note: "Workload instruments such as NASA-TLX are commonly used to estimate perceived load in product studies." },
    { target: "millers-law", type: "related-to", note: "Both draw on limits of short-term memory; CLT focuses on interacting elements rather than span." },
    { target: "schema-theory", type: "derived-from", note: "CLT explains expertise as schema acquisition, which reduces the number of elements working memory must hold." },
    { target: "information-density", type: "influences", note: "CLT informs decisions about how much information to present together and how to integrate it." },
    { target: "mental-workload", type: "contrasts-with", note: "Mental workload research addresses operator performance; CLT addresses learning, though they share mechanisms." },
  ],

  lab: "cognitive-load-lab",

  exercises: [
    {
      id: "cognitive-load-theory-ex-audit",
      kind: "critique",
      level: "intermediate",
      title: "Extraneous-load audit",
      prompt: [
        "Choose a multi-step form or configuration flow (insurance quote, router set-up, payroll run). Walk through it and list every point where you must remember, search for, or mentally integrate information.",
        "Classify each as intrinsic (part of the job) or extraneous (created by the design) and propose a fix for the three most costly extraneous items.",
      ],
      deliverable: "A table: moment, load source, intrinsic/extraneous, proposed fix.",
      criteria: [
        "Distinguishes intrinsic from extraneous load with reasons",
        "Identifies at least one split-attention or memory demand",
        "Fixes do not simply hide needed information",
      ],
      exampleSolution: [
        "Example row: 'Step 4 asks for the policy number shown only on step 1' — extraneous (memory demand) — carry the number forward in a persistent summary panel.",
        "Example row: 'Choosing excess level requires weighing premium vs. risk' — intrinsic — support with a worked comparison, not by removing the choice.",
      ],
    },
    {
      id: "cognitive-load-theory-ex-reversal",
      kind: "scenario",
      level: "advanced",
      title: "Design for the expertise reversal effect",
      prompt: [
        "A data-analysis tool is used by first-week analysts and by ten-year veterans. New analysts want guided steps; veterans complain that guidance slows them down.",
        "Propose an interface strategy grounded in CLT, and describe how you would test whether it reduces load for both groups.",
      ],
      deliverable: "A one-page proposal with a research plan.",
      criteria: [
        "Explicitly references expertise reversal",
        "Proposes adaptive or layered guidance rather than one compromise",
        "Includes a measure of workload or effort plus performance for each group",
      ],
    },
    {
      id: "cognitive-load-theory-ex-reflect",
      kind: "reflection",
      level: "beginner",
      title: "When did a screen overload you?",
      prompt: [
        "Recall a time an app or website made you feel overwhelmed. Was the difficulty in the task itself, or in how it was presented? What one change would have helped most?",
      ],
      criteria: ["Separates task difficulty from presentation difficulty"],
    },
  ],

  quiz: [
    {
      id: "cognitive-load-theory-q-types",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A checkout shows its error messages in a banner at the top of the page, while the faulty fields are far below. Which kind of load does this mainly create?",
      options: [
        { text: "Extraneous load", correct: true, explanation: "The difficulty comes from presentation: users must hold the message in mind and search for the field (split attention)." },
        { text: "Intrinsic load", correct: false, explanation: "Intrinsic load comes from the inherent complexity of the task, not from where messages are placed." },
        { text: "Germane load", correct: false, explanation: "Germane load (or germane resources) relates to effort that builds understanding; searching for a field does not." },
        { text: "No load — users can scroll", correct: false, explanation: "Scrolling while remembering a message is exactly the kind of working-memory demand CLT describes." },
      ],
      explanation: "Separating related information creates the split-attention effect, a classic source of extraneous load. Inline messages integrate the sources.",
    },
    {
      id: "cognitive-load-theory-q-reversal",
      kind: "scenario",
      level: "intermediate",
      prompt: "Step-by-step guidance improved new users' success in a tool, but experienced users became slower and less satisfied. Which CLT effect best explains this?",
      options: [
        { text: "Expertise reversal effect", correct: true, explanation: "Guidance that helps novices becomes redundant for experts, who must process and reconcile it with existing schemas." },
        { text: "Worked-example effect", correct: false, explanation: "That effect explains why examples help novices — not why the same support hurts experts." },
        { text: "Serial position effect", correct: false, explanation: "That concerns memory for items by their position in a list, unrelated to guidance and expertise." },
        { text: "Aesthetic-usability effect", correct: false, explanation: "That concerns perceived usability of attractive designs, not the interaction of guidance and expertise." },
      ],
      explanation: "The expertise reversal effect implies that interfaces serving mixed audiences should adapt or layer guidance.",
    },
    {
      id: "cognitive-load-theory-q-germane",
      kind: "true-false",
      level: "advanced",
      prompt: "According to the theory's original authors' 2019 review, germane load remains an independent third load that simply adds to intrinsic and extraneous load.",
      options: [
        { text: "True", correct: false, explanation: "The authors re-described germane load as working-memory resources devoted to intrinsic load, not an independent additive load." },
        { text: "False", correct: true, explanation: "Following critiques (e.g. Kalyuga, 2011), germane load is treated as a resource allocation rather than a separate source of load." },
      ],
      explanation: "Modern CLT is effectively a two-load theory (intrinsic, extraneous) with a resource account of germane processing.",
    },
    {
      id: "cognitive-load-theory-q-minimal",
      kind: "critique",
      level: "intermediate",
      prompt: "A team removes the visible list of recent projects from a dashboard 'to reduce cognitive load', so users must now type project names into search. What is the best critique?",
      options: [
        { text: "It may increase load: users must now recall names instead of recognising them.", correct: true, explanation: "Removing visible, needed information converts recognition into recall, adding working-memory demand." },
        { text: "It is correct: fewer elements always means less load.", correct: false, explanation: "CLT is about element interactivity and integration, not raw element count." },
        { text: "It has no effect on load, only on aesthetics.", correct: false, explanation: "Memory demands are central to cognitive load." },
        { text: "It reduces intrinsic load because the task is simpler.", correct: false, explanation: "The task (opening a project) is unchanged; only the presentation changed." },
      ],
      explanation: "Minimalism is not the same as low load. Hidden information must be recalled or searched for.",
      revise: "recognition-over-recall",
    },
  ],

  flashcards: [
    { id: "cognitive-load-theory-fc-1", front: "Intrinsic vs extraneous load", back: "Intrinsic: inherent complexity (element interactivity relative to expertise). Extraneous: imposed by presentation — the part design should remove." },
    { id: "cognitive-load-theory-fc-2", front: "Split-attention effect", back: "Load caused by having to mentally integrate physically or temporally separated information sources." },
    { id: "cognitive-load-theory-fc-3", front: "Expertise reversal effect", back: "Guidance that helps novices can hinder experts — design should adapt to expertise." },
  ],

  references: [
    { source: "sweller-1988", role: "primary", note: "Origin of the theory." },
    { source: "sweller-1994", role: "primary", note: "Intrinsic vs extraneous load and element interactivity." },
    { source: "sweller-van-merrienboer-paas-1998", role: "primary", note: "Canonical three-load framework." },
    { source: "sweller-2010", role: "primary", note: "Element interactivity account of the load types." },
    { source: "sweller-van-merrienboer-paas-2019", role: "primary", note: "Authors' revision of germane load and scope." },
    { source: "kalyuga-2011", role: "primary", note: "Critique of germane load as a separate type." },
    { source: "de-jong-2010", role: "primary", note: "Critique of conceptual clarity and measurement." },
    { source: "chandler-sweller-1991", role: "primary", note: "Split-attention and redundancy effects." },
    { source: "kalyuga-et-al-2003", role: "primary", note: "Expertise reversal effect." },
    { source: "paas-1992", role: "primary", note: "Subjective mental effort rating scale." },
    { source: "leppink-et-al-2013", role: "primary", note: "Multi-item instrument for load types." },
    { source: "mayer-moreno-2003", role: "explanatory", note: "Practical load-reduction techniques in multimedia learning." },
    { source: "hollender-et-al-2010", role: "explanatory", note: "Bridge between CLT and HCI." },
    { source: "cowan-2001", role: "further", note: "Working-memory capacity of about four chunks." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "Strong experimental support exists for specific instructional effects (worked example, split attention, redundancy, expertise reversal) in learning settings. Support for the load-type taxonomy itself is weaker because load types are hard to measure independently, and the theory has been revised. Applying CLT to everyday interface use is a reasoned extrapolation with indirect evidence, not a directly established result.",

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
