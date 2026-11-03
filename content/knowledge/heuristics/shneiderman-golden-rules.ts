import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "shneiderman-golden-rules",
  slug: "shneiderman-golden-rules",
  title: "Shneiderman's Eight Golden Rules",
  alternateNames: ["Eight Golden Rules of Interface Design", "Shneiderman's golden rules"],
  summary:
    "Eight principles of interface design from Ben Shneiderman's textbook Designing the User Interface — consistency, universal usability, feedback, closure, error prevention, reversal, user control and reduced memory load.",
  definition:
    "Shneiderman's Eight Golden Rules are design principles presented in *Designing the User Interface* (first edition 1987) for building interactive systems that are learnable, efficient and controllable. In the sixth edition they are: strive for consistency; seek universal usability; offer informative feedback; design dialogs to yield closure; prevent errors; permit easy reversal of actions; keep users in control; and reduce short-term memory load. They are **principles**, intended to be interpreted and refined for each environment, not a checklist of testable rules.",
  primaryType: "heuristic",
  secondaryTypes: ["principle"],
  domain: "heuristics",
  subcategory: "heuristic-sets",
  tags: ["design principles", "Shneiderman", "dialogue design", "user control", "feedback"],
  difficulty: "beginner",
  disciplines: ["Human-computer interaction", "Interaction design", "Software engineering"],
  learningObjectives: [
    "Name the eight rules and illustrate each with an interface example.",
    "Explain the less obvious rules — dialog closure and user control — and why they matter for confidence and trust.",
    "Map the rules against Nielsen's heuristics, identifying overlaps and differences in emphasis.",
    "Recognise when the rules need adaptation, for example in automated or AI-driven systems.",
  ],
  prerequisites: ["usability"],

  levels: {
    beginner: {
      explanation: [
        "Ben Shneiderman, a computer scientist at the University of Maryland, wrote one of the first major textbooks on interface design. In it he summarised good practice as eight 'golden rules'. They are a compact description of what makes software feel dependable.",
        "**1. Strive for consistency** — similar situations should use the same words, layouts and actions. **2. Seek universal usability** — design for people with different skills, ages, abilities and devices; give beginners explanations and experts shortcuts. **3. Offer informative feedback** — every action should get a response, small for frequent actions and larger for rare or important ones. **4. Design dialogs to yield closure** — group steps into sequences with a clear beginning, middle and end, so people know when they are done.",
        "**5. Prevent errors** — make mistakes hard to make, and if they happen, offer simple, specific recovery. **6. Permit easy reversal of actions** — undo lowers anxiety and encourages exploration. **7. Keep users in control** — people, especially experienced ones, want the system to respond to them rather than surprise them. **8. Reduce short-term memory load** — do not make people remember information from one screen to use on another.",
      ],
      analogy:
        "On a well-run train journey the signs are consistent at every station, there is help for first-time travellers and fast lanes for commuters, announcements tell you what is happening, the ticket confirms you are done, barriers stop you boarding the wrong train, you can change your booking, you decide when to travel, and you never need to memorise the platform — it is printed on the board.",
      everydayExamples: [
        "Checkout flows ending with an order-confirmation page (closure).",
        "Undo in a text editor or 'Restore' in an email trash folder (easy reversal).",
        "A recipient's name displayed on a payment screen so you do not have to remember an account number (reduced memory load).",
        "Keyboard shortcuts listed next to menu items (universal usability for novices and experts).",
      ],
      vocabulary: [
        { term: "Closure", meaning: "The feeling of having finished a task, given by a clear end point such as a confirmation." },
        { term: "Reversal", meaning: "The ability to undo or go back after an action." },
        { term: "Universal usability", meaning: "Designing so that people with diverse abilities, experience and technology can use a system." },
        { term: "Short-term memory load", meaning: "How much information a person must hold in mind at once to complete a step." },
      ],
    },
    intermediate: {
      explanation: [
        "The rules are most useful in **dialogue and workflow design**: deciding how a sequence of screens behaves, how the system responds and how much the user must hold in mind. They are also a good review lens for design systems, since consistency, feedback patterns and undo are system-level decisions.",
        "Compared with [[nielsen-usability-heuristics|Nielsen's heuristics]], the rules share most core ideas — consistency, feedback, error prevention, reversal and memory load map closely. Shneiderman adds explicit emphasis on **closure** (structuring tasks into completed units) and on **user control**, and his 'universal usability' rule brings diversity of users and devices into the principles. Nielsen's list adds explicit coverage of real-world language, minimalist design and help and documentation.",
        "Shneiderman presents the rules as principles to be **interpreted, refined and extended** for each environment. A team building a medical device and a team building a game would apply 'prevent errors' and 'keep users in control' very differently.",
      ],
      howItWorks: [
        "Feedback should be proportionate: modest for frequent, minor actions; substantial for infrequent or major ones. This avoids both silent systems and noisy ones.",
        "Closure works at several scales — a single form submission, a multi-step wizard, an onboarding sequence — each needs an unambiguous signal of completion.",
        "Error prevention and simple error handling are paired: constrain inputs where possible; where errors still occur, keep the user's work and point to the exact fix.",
        "User control relates to predictability: surprising automatic behaviour, hard-to-interrupt processes and hidden state erode the sense of control even when the automation is helpful.",
        "Memory load reduction is the same cognitive concern as [[recognition-over-recall|recognition over recall]] and is grounded in the limits of [[working-memory-model|working memory]].",
      ],
      implementation: [
        "Define consistent patterns (terminology, button order, feedback components) in the design system and audit for drift.",
        "Provide layered help and accelerators to serve novices and experts — tooltips and onboarding, plus shortcuts and bulk actions.",
        "Make every destructive or consequential action reversible where technically feasible; reserve confirmations for irreversible ones.",
        "End every task flow with an explicit completion state and a sensible next step.",
        "Carry information forward between steps (summaries, persistent selections) rather than asking users to remember it.",
      ],
      scenarios: [
        "An insurance claim wizard with no final confirmation, leaving users to phone to check it was received (closure).",
        "A photo app that applies automatic 'enhancements' without a visible way to switch them off (user control; reversal).",
        "A two-factor login that shows the code on one device and makes the user remember it while switching apps (memory load).",
      ],
    },
    advanced: {
      explanation: [
        "The golden rules emerged from Shneiderman's synthesis of early HCI research and practice, and they reflect the dominant paradigm of their time — **direct manipulation**, which Shneiderman named and characterised in 1983: continuous representation of objects, physical actions instead of complex syntax, and rapid, incremental, reversible operations with immediately visible results {{src:shneiderman-1983}}. Rules 3, 6 and 7 restate those properties as general design guidance.",
        "The rules first appeared in book form in the first edition of *Designing the User Interface* (1987) {{src:shneiderman-1987}} and have been revised through later editions; the sixth edition (2016) presents the version above {{src:shneiderman-2016}}. Wording has changed across editions, so citations should name the edition used.",
        "Unlike Nielsen's 1994 heuristics, the rules were not derived from a quantitative analysis of problem data. Their authority comes from Shneiderman's standing and their consistency with research on feedback, errors and memory, which makes them **professional guidance grounded in research**, not empirically validated laws.",
      ],
      evidence: [
        "Individual rules connect to established research: reduced memory load to working-memory limits (originally framed through [[millers-law|Miller's]] 1956 'seven plus or minus two' {{src:miller-1956}}, now more often estimated near four chunks {{src:cowan-2001}}); feedback and reversibility to direct-manipulation research {{src:shneiderman-1983}}.",
        "There is little research testing the rule set as a whole, for example its effectiveness as an inspection checklist compared with other heuristic sets.",
      ],
      debates: [
        "**User control versus automation.** Intelligent and AI-driven systems act on the user's behalf, which strains the 'keep users in control' principle. Shneiderman himself has argued in later work for designs that combine high automation with high human control rather than trading one for the other {{src:shneiderman-2020}}.",
        "**Is 'reduce short-term memory load' still framed correctly?** Popular summaries attach the 7±2 figure, but modern working-memory research suggests smaller capacity limits and a strong dependence on chunking and familiarity. The design implication — minimise what must be remembered — is unaffected.",
        "**Rule overlap.** Error prevention, reversal and control overlap substantially; this is intentional emphasis rather than a classification scheme.",
      ],
      alternativeModels: [
        "[[nielsen-usability-heuristics|Nielsen's 10 heuristics]] — similar scope, derived partly from problem data, more commonly used in heuristic evaluation.",
        "[[norman-design-principles|Norman's design principles]] — affordances, signifiers, mapping, constraints, feedback and conceptual models; more focused on perception and understanding.",
        "[[iso-9241-110|ISO 9241-110]] — standardised interaction principles, including controllability and error tolerance.",
      ],
    },
  },

  origin: {
    contributors: ["Ben Shneiderman"],
    period: "1980s; first book edition 1987, revised through the 6th edition (2016)",
    problem:
      "As interactive computing spread beyond specialists, designers needed compact, teachable principles for building systems that ordinary users could learn and control.",
    narrative: [
      "Shneiderman developed the rules at the University of Maryland's Human-Computer Interaction Lab and published them in *Designing the User Interface* {{src:shneiderman-1987}}.",
      "His 1983 characterisation of direct manipulation informed several of the rules {{src:shneiderman-1983}}.",
      "Later editions, co-authored with Plaisant and others, revised the wording — notably broadening the second rule towards universal usability {{src:shneiderman-2016}}.",
    ],
    attributionNote:
      "Exact rule wording differs between editions. Earlier versions are commonly reported as framing rule 2 around enabling frequent users to use shortcuts and rule 7 around supporting an internal locus of control; check the specific edition before quoting.",
  },

  application: {
    summary: [
      "Use the rules to structure workflow design, design-system principles and design reviews — particularly for task flows where feedback, completion, reversal and user control determine whether people feel confident.",
    ],
    web: [
      "Give every form submission and long-running operation proportionate feedback and a clear completion state.",
      "Preserve entered data after errors and highlight exactly which fields need correcting.",
    ],
    mobile: [
      "Use undo affordances (snackbars, 'Undo' gestures) rather than modal confirmations for reversible actions.",
      "Keep users in control of notifications, background syncing and automatic actions with visible settings.",
    ],
    enterprise: [
      "Provide accelerators for expert operators and progressive help for occasional users of the same tool.",
      "Show summaries and context across multi-step processes so operators do not have to remember values between screens.",
    ],
    services: [
      "Design closure across channels: confirmation emails, reference numbers and clear next steps after an application or claim.",
    ],
    steps: [
      "Map a key task as a sequence of user actions and system responses.",
      "At each step, check the eight rules — especially feedback, reversibility and memory load.",
      "Mark the task's end point and verify it gives unambiguous closure.",
      "Check the flow for novices and experts separately (universal usability).",
      "Turn recurring fixes into design-system patterns to sustain consistency.",
    ],
  },

  whenToUse: [
    "Designing or reviewing multi-step workflows and dialogues.",
    "Defining design-system principles for feedback, undo and error handling.",
    "Teaching foundational interaction design alongside Nielsen's heuristics.",
  ],
  whenNotToUse: [
    "As the sole basis for a formal heuristic evaluation where comparability with industry practice matters (Nielsen's set is more widely used).",
    "As evidence that a design works for its users — the rules are principles, not research findings about your product.",
    "Unmodified for highly automated, safety-critical or AI-driven systems, which need domain-specific guidance on control and oversight.",
  ],
  advantages: [
    "Concise and memorable.",
    "Strong on task structure (closure) and user control, which other sets underplay.",
    "Explicitly includes diversity of users through universal usability.",
  ],
  limitations: [
    "Not derived from systematic problem data; limited validation as an evaluation instrument.",
    "Wording varies across editions, which complicates citation and comparison.",
    "Broad principles that need interpretation; novices may apply them superficially.",
    "Rooted in a desktop, direct-manipulation paradigm; adaptation is needed for voice, ambient and AI-mediated interaction.",
  ],
  misconceptions: [
    {
      myth: "Shneiderman's rules and Nielsen's heuristics are competing, incompatible frameworks.",
      reality:
        "They overlap heavily. Most rules map onto one or more of Nielsen's heuristics; the differences are of emphasis (closure, control, universal usability vs. real-world match, minimalism, help).",
    },
    {
      myth: "'Reduce short-term memory load' means never show more than seven items.",
      reality:
        "The rule is about not requiring people to *remember* information between steps. It does not limit how many items can be *displayed*, and the 7±2 figure is an outdated estimate of memory capacity — see [[millers-law|Miller's Law]].",
    },
    {
      myth: "'Keep users in control' means avoiding automation.",
      reality:
        "Automation is compatible with control when its behaviour is predictable, visible and interruptible, and users can override it.",
    },
  ],

  relations: [
    { target: "nielsen-usability-heuristics", type: "complementary-to", note: "The two sets overlap on consistency, feedback, error prevention, reversal and memory load; each adds emphases the other lacks." },
    { target: "direct-manipulation", type: "derived-from", note: "Rules on feedback, reversal and control restate properties of direct-manipulation interfaces that Shneiderman characterised in 1983." },
    { target: "recognition-over-recall", type: "related-to", note: "Rule 8 (reduce short-term memory load) is the same cognitive concern expressed as an interface principle." },
    { target: "working-memory-model", type: "derived-from", note: "The memory-load rule rests on the limited capacity of working memory." },
    { target: "user-control-and-freedom", type: "related-to", note: "Rules 6 and 7 together cover the principle of user control and freedom." },
    { target: "heuristic-evaluation", type: "applied-in", note: "The rules can serve as the principle set in a heuristic evaluation, though Nielsen's set is more common." },
    { target: "universal-design", type: "related-to", note: "Rule 2 brings diversity of users, abilities and devices into core interface principles." },
  ],

  exercises: [
    {
      id: "shneiderman-golden-rules-ex-map",
      kind: "assignment",
      level: "intermediate",
      title: "Map the rules to Nielsen's heuristics",
      prompt: [
        "Create a two-column table mapping each of Shneiderman's eight rules to the closest of Nielsen's ten heuristics. Mark where the mapping is strong, partial or absent.",
        "Then write two sentences: which ideas appear only in Shneiderman's set, and which only in Nielsen's?",
      ],
      deliverable: "A mapping table and a short conclusion.",
      criteria: [
        "Maps feedback ↔ visibility of system status; reversal and control ↔ user control and freedom; memory load ↔ recognition rather than recall",
        "Identifies closure as having no direct Nielsen equivalent",
        "Identifies real-world match, minimalist design, and help and documentation as Nielsen-only emphases",
      ],
      exampleSolution: [
        "Consistency ↔ Consistency & standards (strong). Universal usability ↔ Flexibility & efficiency (partial — Nielsen does not cover diverse abilities explicitly). Informative feedback ↔ Visibility of system status (strong). Closure ↔ none (partial overlap with status). Prevent errors ↔ Error prevention + error recovery (strong). Easy reversal ↔ User control & freedom (strong). Keep users in control ↔ User control & freedom (partial). Reduce memory load ↔ Recognition rather than recall (strong).",
        "Only Shneiderman: closure and explicit universal usability. Only Nielsen: match with the real world, aesthetic and minimalist design, help and documentation.",
      ],
    },
    {
      id: "shneiderman-golden-rules-ex-closure",
      kind: "critique",
      level: "beginner",
      title: "Find the missing closure",
      prompt: [
        "Pick three online tasks you completed recently (a booking, a form, a purchase). For each, describe how the system signalled completion — or failed to.",
        "Redesign the weakest one so the end state gives unambiguous closure and a sensible next step.",
      ],
      deliverable: "Three short observations and one redesigned end state (sketch or description).",
      criteria: ["Identifies a concrete completion signal or its absence", "Redesign includes confirmation, reference details and next step"],
    },
    {
      id: "shneiderman-golden-rules-ex-ai",
      kind: "reflection",
      level: "advanced",
      title: "User control in an AI assistant",
      prompt: [
        "An email assistant drafts and schedules replies automatically. Using rules 3, 6 and 7, specify how the product should keep users in control without removing the benefits of automation.",
      ],
      deliverable: "A one-page interaction specification.",
      criteria: ["Automation is visible and predictable", "Every automated action is reversible or reviewable", "Users can set the level of automation"],
    },
  ],

  quiz: [
    {
      id: "shneiderman-golden-rules-q-closure",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which design best applies 'design dialogs to yield closure'?",
      options: [
        { text: "A booking flow ending on a confirmation page with a reference number and next steps", correct: true, explanation: "A clear end point tells users the sequence is complete, letting them stop thinking about it." },
        { text: "A booking flow that returns to the home page immediately after payment", correct: false, explanation: "With no completion signal, users cannot be sure the booking succeeded." },
        { text: "A booking flow with keyboard shortcuts for each step", correct: false, explanation: "Shortcuts support expert efficiency (universal usability), not closure." },
        { text: "A booking flow that hides optional steps", correct: false, explanation: "This reduces complexity but does not mark the end of the task." },
      ],
      explanation: "Closure is about structuring tasks into sequences with a recognisable beginning, middle and end.",
    },
    {
      id: "shneiderman-golden-rules-q-memory",
      kind: "true-false",
      level: "intermediate",
      prompt: "'Reduce short-term memory load' means a menu should never display more than seven items.",
      options: [
        { text: "True", correct: false, explanation: "The rule concerns information users must hold in mind, not how much can be displayed. Displayed menus are recognised, not recalled." },
        { text: "False", correct: true, explanation: "Visible options reduce memory load. The rule warns against requiring users to remember information across steps." },
      ],
      explanation: "Displaying options is the remedy for memory load, not its cause. The 7±2 figure is also an outdated capacity estimate.",
      revise: "millers-law",
    },
    {
      id: "shneiderman-golden-rules-q-compare",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which idea is emphasised in Shneiderman's rules but has no direct equivalent in Nielsen's ten heuristics?",
      options: [
        { text: "Consistency", correct: false, explanation: "Both sets include consistency explicitly." },
        { text: "Dialog closure", correct: true, explanation: "Nielsen's heuristics do not single out the structuring of tasks into completed units." },
        { text: "Error prevention", correct: false, explanation: "Both sets include error prevention." },
        { text: "Undo and reversal", correct: false, explanation: "Nielsen's 'user control and freedom' covers undo and redo." },
      ],
      explanation: "The sets overlap heavily; closure and universal usability are Shneiderman's distinctive emphases.",
    },
    {
      id: "shneiderman-golden-rules-q-control",
      kind: "scenario",
      level: "advanced",
      prompt:
        "A smart thermostat silently changes the schedule based on learned behaviour. Users report feeling 'the house has a mind of its own', although energy use falls. Which response best applies the golden rules?",
      options: [
        { text: "Remove the learning feature; automation always violates user control.", correct: false, explanation: "The rules do not forbid automation; they require it to be predictable and controllable." },
        { text: "Keep learning, but show proposed changes with informative feedback, allow one-step reversal and let users set how much the system may change on its own.", correct: true, explanation: "This applies feedback, reversal and control together, preserving the benefit of automation." },
        { text: "Add a help page explaining the learning algorithm.", correct: false, explanation: "Documentation does not restore control at the moment the system acts." },
        { text: "Make the schedule consistent with other thermostats on the market.", correct: false, explanation: "Consistency is not the cause of the problem; unpredictability is." },
      ],
      explanation: "'Keep users in control' is satisfied by visibility, predictability and override, not by avoiding automation.",
    },
  ],

  flashcards: [
    { id: "shneiderman-golden-rules-fc-1", front: "Shneiderman's eight golden rules (6th ed.)", back: "Consistency · Universal usability · Informative feedback · Dialogs yield closure · Prevent errors · Easy reversal · Keep users in control · Reduce short-term memory load." },
    { id: "shneiderman-golden-rules-fc-2", front: "Two emphases unique to Shneiderman vs. Nielsen", back: "Dialog closure and universal usability (diverse users, abilities and devices)." },
    { id: "shneiderman-golden-rules-fc-3", front: "First book appearance of the golden rules", back: "Designing the User Interface, 1st edition (Addison-Wesley, 1987)." },
  ],

  references: [
    { source: "shneiderman-1987", role: "primary", note: "First book edition presenting the rules." },
    { source: "shneiderman-2016", role: "primary", locator: "Section 3.3.4", note: "Sixth-edition wording used in this entry." },
    { source: "shneiderman-1983", role: "primary", note: "Direct manipulation — the paradigm behind feedback, reversal and control." },
    { source: "shneiderman-golden-rules-page", role: "explanatory", note: "Author's web summary (could not be re-checked on 2026-11-03)." },
    { source: "miller-1956", role: "further", note: "Historical basis of the memory-load rationale." },
    { source: "cowan-2001", role: "further", note: "Modern capacity estimate for working memory." },
    { source: "shneiderman-2020", role: "further", note: "Human-centred AI: combining high automation with high human control." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Authoritative professional principles grounded in HCI research on feedback, errors and memory, but not derived from systematic problem data and not validated as a set. Individual rules inherit the evidence of the research they summarise; the rule set as a whole should be treated as expert guidance.",

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
