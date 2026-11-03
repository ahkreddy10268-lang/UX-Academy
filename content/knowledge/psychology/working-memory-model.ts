import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "working-memory-model",
  slug: "working-memory-model",
  title: "Working Memory Model",
  alternateNames: ["Baddeley and Hitch model", "Multicomponent model of working memory", "Baddeley's working memory"],
  summary:
    "Baddeley and Hitch's model of the limited mental workspace used to hold and manipulate information, made of a central executive and specialised verbal and visuospatial subsystems.",
  definition:
    "The multicomponent working memory model, proposed by Alan Baddeley and Graham Hitch in 1974, describes short-term retention and manipulation of information as a system of interacting components: an attentional **central executive**, a speech-based **phonological loop**, a **visuospatial sketchpad**, and — added by Baddeley in 2000 — an **episodic buffer** that binds information from the subsystems and long-term memory into integrated episodes.",
  primaryType: "model",
  secondaryTypes: ["theory"],
  domain: "psychology",
  subcategory: "cognitive",
  tags: ["memory", "attention", "short-term memory", "multitasking", "dual-task", "cognition"],
  difficulty: "intermediate",
  disciplines: ["Cognitive psychology", "Neuropsychology", "Human-computer interaction"],
  learningObjectives: [
    "Describe the four components of the multicomponent model and what each does.",
    "Explain how working memory differs from the 'short-term store' of the Atkinson-Shiffrin model.",
    "Predict interference between tasks that share a subsystem, and apply this to multimodal interface design.",
    "Evaluate competing accounts of working memory, such as Cowan's embedded-processes model.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "When you hold a phone number in your head while dialling it, or picture a route while giving directions, you are using **working memory** — a small mental workspace for information you are actively using.",
        "Baddeley and Hitch proposed that this workspace is not one box but a small team. One part handles **sounds and words** (you repeat the number to yourself), another handles **images and space** (you picture the map), and a supervisor called the **central executive** decides what to focus on and coordinates the others.",
        "Because each part has limited room, doing two things that use the *same* part is hard — like remembering a number while listening to someone talk. Doing two things that use *different* parts — like remembering a number while looking at a map — is easier.",
      ],
      analogy:
        "Think of a small kitchen with one chef (the central executive), a narrow shelf for spoken notes (the phonological loop) and a small whiteboard for sketches (the visuospatial sketchpad). The chef can glance at both, but each holds only a little — and two cooks writing on the same whiteboard get in each other's way.",
      everydayExamples: [
        "Repeating a verification code under your breath while switching apps to type it.",
        "Finding it hard to read while someone is talking to you — both use verbal resources.",
        "Navigating by a mental picture of a building's layout.",
      ],
      vocabulary: [
        { term: "Central executive", meaning: "The attention-controlling part that focuses, switches and divides attention." },
        { term: "Phonological loop", meaning: "Holds speech-based information briefly and keeps it alive by silent rehearsal." },
        { term: "Visuospatial sketchpad", meaning: "Holds visual and spatial information such as shapes, positions and routes." },
        { term: "Episodic buffer", meaning: "A limited store that combines information from the other parts and long-term memory into a single episode." },
        { term: "Dual-task", meaning: "An experiment in which people do two tasks at once to see whether they compete for the same resources." },
      ],
    },
    intermediate: {
      explanation: [
        "Working memory is defined by function — holding information *while operating on it* — not merely by short duration. Baddeley and Hitch built the model on **dual-task experiments**: if a secondary task (such as remembering digits) disrupts a primary task (such as reasoning) only modestly, the two cannot both depend on a single, small store {{src:baddeley-hitch-1974}}.",
        "Each subsystem shows characteristic effects. The phonological loop produces the **word-length effect** — people recall fewer long words than short words, because the loop's capacity is roughly what can be rehearsed in about two seconds — and the effect disappears under *articulatory suppression* (repeating an irrelevant word aloud) {{src:baddeley-thomson-buchanan-1975}}. The sketchpad is disrupted by concurrent spatial tasks but much less by verbal ones.",
        "The **episodic buffer** was added because the original model could not explain how people hold far more information than the subsystems allow when it is meaningful (for example, recalling prose), or how information from different modalities is bound into a single representation {{src:baddeley-2000}}.",
      ],
      howItWorks: [
        "The central executive allocates attention: focusing, dividing between tasks, switching, and interfacing with long-term memory. It has no storage of its own in the revised model.",
        "The phonological loop combines a short-lived phonological store with an articulatory rehearsal process that refreshes it, and converts written words into phonological form.",
        "The visuospatial sketchpad holds visual appearance and spatial layout, and supports mental imagery and navigation.",
        "The episodic buffer is a limited-capacity, multidimensional store accessible to conscious awareness, binding features into chunks.",
      ],
      implementation: [
        "Never require users to transfer information between screens from memory — show codes, references and previous answers where they are needed.",
        "Avoid simultaneous verbal channels: narration plus dense on-screen text competes for the same resources.",
        "When adding a second modality (voice prompts, audio cues), use it for information the primary channel does not carry.",
        "Keep interruptions short and restore context (cursor position, partially entered data) after them — working memory decays and is easily displaced.",
        "In safety-critical or driving contexts, prefer interactions that do not load the subsystem already used by the primary task (e.g. limit visual demands while driving).",
      ],
      scenarios: [
        "Two-factor codes sent by SMS force users to hold six digits while switching apps; autofill from the message removes the phonological-loop burden.",
        "An in-car system that reads long menus aloud competes with conversation in the car; short, visual-light confirmations work better.",
        "A support agent listening to a caller while reading a long knowledge-base article suffers verbal interference; structured, scannable answers reduce it.",
      ],
    },
    advanced: {
      explanation: [
        "The model was a response to the **modal model** of Atkinson and Shiffrin, in which a single short-term store acts as the gateway to long-term memory {{src:atkinson-shiffrin-1968}}. Neuropsychological evidence challenged this: patient K.F. had severely impaired short-term verbal memory yet could still learn new long-term information {{src:shallice-warrington-1970}} — which a single gateway store would not allow.",
        "Baddeley's later reviews describe the model as a framework rather than a precise computational theory, and note open questions: the nature of the central executive, the capacity and format of the episodic buffer, and how far subsystems are separable in the brain {{src:baddeley-2012}}.",
        "A principal alternative is Cowan's **embedded-processes** model, in which working memory is the activated portion of long-term memory, with a focus of attention limited to around four chunks {{src:cowan-1988}} {{src:cowan-2001}}. Where Baddeley emphasises separable, domain-specific stores, Cowan emphasises a domain-general attentional limit. The models make different predictions about cross-modal interference, and evidence exists for both domain-specific and domain-general limits.",
      ],
      evidence: [
        "Dual-task interference patterns, the word-length effect, phonological similarity effects and articulatory suppression provide converging experimental support for a phonological loop {{src:baddeley-thomson-buchanan-1975}}.",
        "Neuropsychological dissociations, such as selective verbal or spatial short-term memory deficits, support the separation of subsystems {{src:shallice-warrington-1970}} {{src:baddeley-2012}}.",
        "The episodic buffer is less directly evidenced; it is a theoretical construct proposed to account for binding and for chunked recall of meaningful material {{src:baddeley-2000}}.",
      ],
      debates: [
        "**Separate stores vs. a shared attentional limit.** Cowan's account explains many findings with a single capacity limit; the multicomponent model explains modality-specific interference. Many researchers now accept both kinds of limit.",
        "**What is capacity?** Estimates differ by method: memory span tasks suggest about seven items (Miller's classic estimate), whereas methods that prevent rehearsal and chunking suggest about three to five chunks {{src:cowan-2001}}.",
        "**Is the central executive a homunculus?** Critics argue it labels rather than explains control; later work decomposes it into functions such as updating, shifting and inhibition.",
      ],
      alternativeModels: [
        "The **[[atkinson-shiffrin-model|Atkinson-Shiffrin modal model]]**: sensory register → short-term store → long-term store, with rehearsal as the transfer mechanism.",
        "Cowan's **embedded-processes model**: working memory as activated long-term memory with a capacity-limited focus of attention.",
        "**Time-based resource-sharing** accounts treat working memory as a single attentional resource switched between processing and refreshing.",
      ],
    },
  },

  origin: {
    contributors: ["Alan Baddeley", "Graham Hitch"],
    period: "1974; episodic buffer added 2000",
    problem:
      "The dominant modal model treated short-term memory as a single store and gateway to long-term memory, but it could not account for dual-task results or for patients with impaired short-term memory and intact long-term learning.",
    narrative: [
      "Baddeley and Hitch replaced the idea of a passive short-term store with a system for holding *and* processing information, supported by a series of dual-task experiments {{src:baddeley-hitch-1974}}.",
      "Through the 1970s–1990s the phonological loop became the best-characterised component, through effects such as word length and articulatory suppression {{src:baddeley-thomson-buchanan-1975}}.",
      "In 2000 Baddeley proposed the episodic buffer to explain binding and the integration of working memory with long-term knowledge {{src:baddeley-2000}}. His 2012 review surveys the model's development and controversies {{src:baddeley-2012}}.",
    ],
  },

  application: {
    summary: [
      "For designers, the model's practical message is twofold: **working memory is small and fragile**, so interfaces should hold information for the user; and **it has partly separate channels**, so concurrent demands on the same channel interfere more than demands spread across channels.",
    ],
    web: [
      "Persist order numbers, reference codes and previous answers on later steps rather than asking users to re-enter them.",
      "Avoid auto-playing audio or video narration over text-heavy pages.",
    ],
    mobile: [
      "Support one-time-code autofill and copy actions to remove app-switching memory demands.",
      "Restore state after interruptions such as calls or notifications.",
    ],
    enterprise: [
      "In monitoring tools, avoid requiring operators to compare values held in memory across screens — show comparisons side by side.",
      "Design alerts so a new alert does not erase context the operator was holding.",
    ],
    services: [
      "Phone services should not read out long option lists that callers must hold in mind; offer short menus and repeat options.",
    ],
    steps: [
      "Identify information users must hold between steps, screens or modalities.",
      "Externalise it — show it, carry it forward, or let the system remember it.",
      "Identify concurrent demands and the channel each uses (verbal, visual, spatial).",
      "Redistribute or remove competing demands on the same channel.",
      "Test with interruptions and multitasking typical of real use.",
    ],
  },

  whenToUse: [
    "Reasoning about multitasking, interruptions and multimodal interfaces (voice, in-car, AR).",
    "Explaining why memory demands across steps cause errors.",
    "Choosing which modality to use for secondary information.",
  ],
  whenNotToUse: [
    "As a source of a precise item limit for menus or navigation — capacity depends on chunking, familiarity and method.",
    "When the task depends mainly on long-term knowledge or recognition, where working memory limits are less binding.",
  ],
  advantages: [
    "Explains interference patterns between concurrent tasks.",
    "Supported by experimental and neuropsychological evidence.",
    "Provides a shared vocabulary between psychology and HCI.",
  ],
  limitations: [
    "A framework rather than a precise predictive model — it rarely yields numerical predictions for interface tasks.",
    "The central executive and episodic buffer are less precisely specified than the subsystems.",
    "Competing models explain many of the same findings with a single attentional limit.",
  ],
  misconceptions: [
    {
      myth: "Working memory and short-term memory are the same thing.",
      reality:
        "Short-term memory usually means passive brief storage. Working memory emphasises storage *and* manipulation under attentional control.",
    },
    {
      myth: "Working memory holds exactly seven items.",
      reality:
        "Capacity depends on the material, chunking and rehearsal. Estimates that control for rehearsal suggest around four chunks {{src:cowan-2001}}; see [[millers-law]] for the history of the 'seven' figure.",
    },
    {
      myth: "Multimodal interfaces always reduce load because they use more channels.",
      reality:
        "Different channels reduce interference only when they carry *different* information and do not both draw heavily on the central executive. Redundant narration of on-screen text can add load.",
    },
  ],

  relations: [
    { target: "atkinson-shiffrin-model", type: "developed-from", note: "The multicomponent model was developed as a replacement for the single short-term store of the modal model." },
    { target: "cognitive-load-theory", type: "influences", note: "Cognitive load theory assumes a limited working memory as its central constraint." },
    { target: "millers-law", type: "related-to", note: "Miller's span estimate is an early measure of short-term capacity; working memory models explain why span varies." },
    { target: "recognition-over-recall", type: "applied-in", note: "Designing for recognition reduces the amount of information that must be held in working memory." },
    { target: "selective-attention", type: "related-to", note: "The central executive is an attentional controller; attention and working memory are tightly linked." },
    { target: "multimodal-interaction", type: "applied-in", note: "Modality-specific subsystems inform when combining voice and visual channels reduces or increases interference." },
  ],

  lab: "serial-position-lab",

  exercises: [
    {
      id: "working-memory-model-ex-flow",
      kind: "critique",
      level: "beginner",
      title: "Find the memory hand-offs",
      prompt: [
        "Pick a flow that crosses apps or devices — logging in with a code, paying with a banking app, booking with a reference number.",
        "List every piece of information you must hold in your head while moving between steps, and propose how the system could hold it instead.",
      ],
      deliverable: "A list of memory hand-offs with a fix for each.",
      criteria: ["Identifies information held across steps", "Fixes externalise memory rather than shortening the information"],
    },
    {
      id: "working-memory-model-ex-interference",
      kind: "scenario",
      level: "intermediate",
      title: "Predict interference in a car",
      prompt: [
        "A driver is navigating an unfamiliar city (visuospatial demand) while a voice assistant reads three restaurant options with prices and ratings (verbal demand), and a passenger is talking.",
        "Using the multicomponent model, predict where interference will be greatest and redesign the assistant's output to reduce it.",
      ],
      deliverable: "A short analysis plus a redesigned interaction script.",
      criteria: [
        "Correctly assigns demands to subsystems",
        "Recognises central-executive load from divided attention",
        "Redesign reduces verbal list length or defers non-urgent information",
      ],
    },
    {
      id: "working-memory-model-ex-compare",
      kind: "reflection",
      level: "advanced",
      title: "Baddeley vs. Cowan for design",
      prompt: [
        "Explain one design decision for which the multicomponent model and Cowan's embedded-processes model would lead to different recommendations, and how you could test which matters in your product.",
      ],
      criteria: ["Characterises both models accurately", "Proposes a testable difference"],
    },
  ],

  quiz: [
    {
      id: "working-memory-model-q-components",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which component of Baddeley and Hitch's model is responsible for silently rehearsing a phone number?",
      options: [
        { text: "Phonological loop", correct: true, explanation: "It holds speech-based information and refreshes it by subvocal rehearsal." },
        { text: "Visuospatial sketchpad", correct: false, explanation: "That holds visual and spatial information, not rehearsed speech." },
        { text: "Episodic buffer", correct: false, explanation: "The buffer binds information into episodes; rehearsal of speech is the loop's job." },
        { text: "Long-term store", correct: false, explanation: "Long-term memory is not part of working memory's rehearsal mechanism." },
      ],
      explanation: "The phonological loop combines a brief phonological store with an articulatory rehearsal process.",
    },
    {
      id: "working-memory-model-q-dualtask",
      kind: "scenario",
      level: "intermediate",
      prompt: "Users must listen to spoken instructions while reading a dense paragraph of on-screen text. According to the model, why is this harder than listening while looking at a diagram?",
      options: [
        { text: "Listening and reading both load verbal (phonological) resources, so they interfere.", correct: true, explanation: "Written words are converted to phonological form, competing with the spoken instructions." },
        { text: "Diagrams are always easier to understand than text.", correct: false, explanation: "Not necessarily; the point is interference between channels, not inherent ease." },
        { text: "The visuospatial sketchpad cannot process diagrams.", correct: false, explanation: "Processing diagrams is precisely the sketchpad's role." },
        { text: "There is no difference; working memory is a single store.", correct: false, explanation: "The model's key claim is that subsystems are partly separate." },
      ],
      explanation: "Tasks sharing a subsystem interfere more than tasks spread across subsystems.",
    },
    {
      id: "working-memory-model-q-kf",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "Why was patient K.F. (Shallice & Warrington, 1970) important evidence against the Atkinson-Shiffrin modal model?",
      options: [
        { text: "K.F. had severely impaired short-term verbal memory yet could still form long-term memories, contradicting a single short-term gateway.", correct: true, explanation: "If all information had to pass through one short-term store, impairing it should impair long-term learning." },
        { text: "K.F. had perfect memory for pictures.", correct: false, explanation: "Picture memory is not what made the case significant." },
        { text: "K.F. showed that working memory holds exactly four items.", correct: false, explanation: "Capacity estimates come from other research, e.g. Cowan (2001)." },
        { text: "K.F. could not learn anything new.", correct: false, explanation: "The opposite: long-term learning was relatively preserved." },
      ],
      explanation: "The dissociation suggested short-term storage is not a single obligatory gateway to long-term memory.",
    },
  ],

  flashcards: [
    { id: "working-memory-model-fc-1", front: "Four components of the multicomponent model", back: "Central executive, phonological loop, visuospatial sketchpad, episodic buffer (added 2000)." },
    { id: "working-memory-model-fc-2", front: "Word-length effect", back: "People recall fewer long words than short words; evidence for a time-limited phonological loop." },
    { id: "working-memory-model-fc-3", front: "Cowan's alternative", back: "Working memory as activated long-term memory with a focus of attention of about four chunks." },
  ],

  references: [
    { source: "baddeley-hitch-1974", role: "primary", note: "Original multicomponent model." },
    { source: "baddeley-2000", role: "primary", note: "Episodic buffer." },
    { source: "baddeley-thomson-buchanan-1975", role: "primary", note: "Word-length effect and articulatory suppression." },
    { source: "atkinson-shiffrin-1968", role: "primary", note: "The modal model the theory replaced." },
    { source: "shallice-warrington-1970", role: "primary", note: "Neuropsychological dissociation." },
    { source: "cowan-1988", role: "primary", note: "Embedded-processes alternative." },
    { source: "cowan-2001", role: "primary", note: "Capacity of about four chunks." },
    { source: "baddeley-2012", role: "explanatory", note: "Review of theories, models and controversies." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "The model is supported by dual-task, word-length, suppression and neuropsychological evidence and remains the most widely used framework for working memory. The subsystems are better evidenced than the central executive and episodic buffer. Competing models account for much of the same data, so design implications should rely on robust effects (interference, limited capacity, decay) rather than on the model's exact architecture.",

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
