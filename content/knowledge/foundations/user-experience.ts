import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "user-experience",
  slug: "user-experience",
  title: "User Experience (UX)",
  alternateNames: ["UX", "User experience design", "Experience of use"],
  summary:
    "A person's perceptions and responses before, during and after using a product, system or service: whether it does what they need, how easy it is, and what it feels like and means to them.",
  definition:
    "**User experience (UX)** is a person's perceptions and responses that result from the use, or anticipated use, of a product, system or service. ISO 9241-210 uses this definition (paraphrased here) and notes that it covers emotions, beliefs, preferences, perceptions, physical and psychological responses, behaviours and accomplishments that occur before, during and after use {{src:iso-9241-210-2019}}. Research treats UX as broader than [[usability|usability]]: it adds non-instrumental qualities such as beauty, stimulation and identity, and it is subjective, situated and changes over time {{src:hassenzahl-tractinsky-2006}}. *UX design* is the work of shaping those conditions; the experience itself happens in the person and cannot be designed directly.",
  primaryType: "discipline",
  secondaryTypes: ["concept"],
  domain: "foundations",
  subcategory: "core-concepts",
  tags: ["UX", "usability", "hedonic quality", "pragmatic quality", "experience over time", "UX vs UI"],
  difficulty: "beginner",
  disciplines: ["Human-computer interaction", "Product design", "Service design", "Psychology"],
  learningObjectives: [
    "Define user experience and explain how it differs from usability and from user interface design.",
    "Distinguish pragmatic (task-related) and hedonic (non-task) qualities of a product.",
    "Explain why UX is subjective, depends on context and changes before, during and after use.",
    "Recognise the limits of UX as a concept: what it can and cannot be measured or designed.",
  ],
  prerequisites: ["usability"],

  levels: {
    beginner: {
      explanation: [
        "User experience is what using something is like for a particular person. It includes whether the thing does what they needed, how much effort that took, and how they felt about it: confident or anxious, pleased or irritated, proud or embarrassed.",
        "It is wider than the screen. Someone booking a train ticket experiences the website, but also the confirmation email, the ticket on their phone at the barrier, and the refund process when the train is cancelled. A beautiful booking form does not rescue a refund that takes six weeks.",
        "It is also personal. The same app can be a relief for a commuter who uses it daily and a struggle for a tourist using it once in a hurry. That is why UX work starts with who the users are and what situation they are in, not with the interface.",
      ],
      analogy:
        "A restaurant meal is more than the food. The booking, the welcome, the wait, the bill and the memory of the evening all shape whether you go back. The chef controls the plate; everyone in the restaurant shapes the experience.",
      everydayExamples: [
        "A banking app that works perfectly but makes people nervous about whether a transfer went through has a usability success and an experience problem.",
        "A game is hard on purpose: high effort can be part of a good experience when the challenge is the point.",
        "Two people rate the same smartwatch differently because one wanted fitness data and the other wanted a piece of jewellery.",
      ],
      vocabulary: [
        { term: "User experience (UX)", meaning: "A person's perceptions and responses resulting from using, or expecting to use, a product, system or service." },
        { term: "Usability", meaning: "How effectively, efficiently and satisfactorily specified users achieve specified goals in a context of use; one part of UX." },
        { term: "Pragmatic quality", meaning: "How well a product supports getting a task done: usefulness and ease of use." },
        { term: "Hedonic quality", meaning: "Qualities that matter beyond the task: stimulation, novelty, beauty and what the product says about its owner." },
        { term: "User interface (UI)", meaning: "The parts of a system a person sees, hears and touches to use it; one of many things that shape UX." },
      ],
    },
    intermediate: {
      explanation: [
        "UX is usually described with two kinds of quality. **Pragmatic** qualities concern the task: is the product useful, and is it easy to use? **Hedonic** qualities concern the person: does it stimulate them, is it beautiful, does it express who they are? Hassenzahl's studies found that people judge these separately; in one study, perceived beauty was related mainly to hedonic attributes, while overall judgements of goodness drew on both {{src:hassenzahl-2004}}.",
        "Hassenzahl and Tractinsky's research agenda describes UX through three lenses: going **beyond the instrumental** (not only task performance), **emotion and affect** (what people feel), and the **experiential**, meaning that each experience is unique to a person, situation and moment {{src:hassenzahl-tractinsky-2006}}. That last point is why UX cannot be fully specified in advance: designers set the conditions, users have the experience.",
        "The definition is contested at the edges. A survey of researchers and practitioners by Law and colleagues found broad agreement that UX is dynamic, depends on context and is subjective, but no agreement on how far it extends, for instance whether it includes a brand or a whole service. They proposed scoping UX to the interaction with a product, system or service, rather than to every encounter with a company {{src:law-et-al-2009}}.",
      ],
      howItWorks: [
        "**Before use**, expectations formed by marketing, reviews and past products shape how people approach a product and what they notice.",
        "**During use**, momentary reactions to friction, delight, errors and feedback accumulate.",
        "**After use**, people remember and re-evaluate. Memory is selective, so the remembered experience can differ from the moment-by-moment one (see [[peak-end-rule|the peak-end rule]]).",
        "**Over time**, repeated use changes what matters: novelty fades, and reliability and fit with routines become more important.",
      ],
      implementation: [
        "Name the users and the context before discussing the interface: who, doing what, where, under what pressure.",
        "Set goals for both pragmatic and hedonic qualities, for example 'complete a transfer in under a minute without doubt that it worked'.",
        "Map the experience beyond the screen: before (expectations), during (the task) and after (confirmation, support, memory).",
        "Measure both: task success and time for the pragmatic side, standardised questionnaires and interviews for the perceived side.",
        "Re-evaluate after release, because experiences change with repeated use and changing context.",
      ],
      scenarios: [
        "A pension provider redesigns its forms and improves task success, but customers still feel uncertain. Interviews show the anxiety comes from not knowing what happens next, which is fixed by a clear timeline after submission rather than by the form.",
        "A fitness app with high novelty scores at launch loses users after a month. Research finds the hedonic appeal faded while the pragmatic value (tracking progress) was never strong enough to sustain use.",
      ],
    },
    advanced: {
      explanation: [
        "Research on UX grew from a critique of usability's focus on efficiency and task completion. Hassenzahl and Tractinsky framed UX as a research agenda rather than a settled construct, emphasising non-instrumental needs, affect and the situated, temporal nature of experience {{src:hassenzahl-tractinsky-2006}}. ISO 9241-210 later gave a short normative definition centred on perceptions and responses resulting from use or anticipated use {{src:iso-9241-210-2019}}.",
        "The pragmatic–hedonic distinction gives UX a measurable structure, and Hassenzahl's work shows the two dimensions are perceived separately and affect overall judgements differently {{src:hassenzahl-2004}}. It is a model, not a full account of experience: meaning, social context and long-term relationships with products are harder to capture with ratings.",
        "Scoping remains unresolved. Law and colleagues' survey found consensus on UX being dynamic, context-dependent and subjective, but divided views on its unit of analysis and on whether it can be measured at all; they argued for a focused definition tied to interaction with products, systems and services {{src:law-et-al-2009}}. In practice, 'UX' is also a job title and an organisational function, which adds a third meaning beyond the phenomenon and the discipline.",
      ],
      evidence: [
        "Studies of pragmatic and hedonic quality show that people distinguish the two and that each relates differently to judgements of beauty and goodness {{src:hassenzahl-2004}}.",
        "Survey evidence documents agreement on core properties of UX (dynamic, context-dependent, subjective) and disagreement on its scope and measurability {{src:law-et-al-2009}}.",
        "UX as a whole is a construct and a field of practice; there is no single experiment that validates it. Claims that 'good UX increases revenue by X%' usually come from case studies or vendor reports and should not be treated as general findings.",
      ],
      debates: [
        "**Can experience be designed?** Many researchers argue that only the conditions for an experience can be designed, because the experience depends on the person and the moment.",
        "**Measurement.** Questionnaires make perceived qualities comparable, but critics argue that reducing experience to scores loses what makes it an experience; qualitative methods capture more but generalise less.",
        "**Scope creep.** Using 'UX' for everything a company does makes the term less useful; the CX (customer experience) and service-design communities draw the boundaries differently.",
      ],
      alternativeModels: [
        "[[usability|Usability]] (ISO 9241-11) as the narrower, task-focused quality that UX extends.",
        "[[human-centred-design|Human-centred design]] as the process standard that frames how UX is achieved.",
        "[[service-design|Service design]] and customer experience as broader frames that cover every touchpoint with an organisation.",
      ],
    },
  },

  origin: {
    contributors: ["Marc Hassenzahl", "Noam Tractinsky", "Effie Law", "Virpi Roto", "Donald A. Norman", "ISO TC 159/SC 4"],
    period: "Term popularised in the 1990s; research agenda from the mid-2000s; ISO definition from 2010",
    problem:
      "Usability measured whether people could complete tasks, but not whether products were desirable, meaningful or enjoyable. Practice and research needed a concept for the whole experience of use.",
    narrative: [
      "In the 1990s the term 'user experience' spread through industry practice as products became consumer goods chosen for more than their function.",
      "In 2006 Hassenzahl and Tractinsky set out UX as a research agenda: beyond the instrumental, emotion and affect, and the experiential {{src:hassenzahl-tractinsky-2006}}.",
      "In 2009 Law and colleagues surveyed the field's understanding of the term and proposed a scoped definition {{src:law-et-al-2009}}. ISO 9241-210 carries a short normative definition, retained in its 2019 revision {{src:iso-9241-210-2019}}.",
    ],
    attributionNote:
      "Donald Norman is usually credited with popularising the term at Apple in the early 1990s. That attribution comes from practitioner accounts and is not used here as evidence for any claim about UX.",
  },

  application: {
    summary: [
      "In practice, UX is the frame that keeps a team looking beyond the interface: who the users are, what they need to achieve, how they feel before, during and after, and how that changes over time. It decides what to research and what to measure.",
    ],
    web: [
      "Follow a journey across pages, emails and support, not only the page being redesigned.",
      "Pair task metrics with a short standardised questionnaire to capture perceived quality.",
    ],
    mobile: [
      "Study use in real contexts: interrupted, one-handed, on the move, with poor connectivity.",
      "Watch for the experience of notifications and permissions, which shape trust as much as features do.",
    ],
    enterprise: [
      "Treat the buyer's and the daily user's experiences separately; they often conflict.",
      "Measure the cost of workarounds, which reveal where the experience fails real work.",
    ],
    services: [
      "Connect digital touchpoints with staff, documents and physical places; failures between channels are part of UX.",
    ],
    steps: [
      "Describe users, goals and context of use.",
      "Map the experience before, during and after use.",
      "Set pragmatic and hedonic goals in testable terms.",
      "Design and prototype the conditions for the experience.",
      "Evaluate with users: behaviour, perception and memory.",
      "Re-evaluate after release and over repeated use.",
    ],
  },

  whenToUse: [
    "Framing a project so that research and design look beyond interface details.",
    "Explaining why a usable product can still fail people, or why an effortful one can succeed.",
    "Choosing what to measure: task performance and perceived quality together.",
  ],
  whenNotToUse: [
    "As a synonym for visual or interface design; UI is one input to UX.",
    "As a single score that summarises everything; no instrument captures the whole experience.",
    "As a justification for unmeasurable claims ('we improved the UX') without saying what changed for whom.",
  ],
  advantages: [
    "Keeps the whole context of use in view, including what happens off-screen.",
    "Makes room for emotion, meaning and memory alongside efficiency.",
    "Connects research, design and evaluation around the people affected.",
  ],
  limitations: [
    "The scope of the term is contested, so teams can mean different things by it.",
    "Experience is subjective and changes over time, which limits what any one measurement shows.",
    "Hedonic and emotional qualities are harder to measure reliably than task performance.",
    "Popular claims about UX and business results often come from case studies or vendors rather than controlled evidence.",
  ],
  misconceptions: [
    {
      myth: "UX and UI are the same thing.",
      reality: "UI is the part of a system people interact with directly. UX is their perceptions and responses, shaped by the UI but also by content, performance, support, price and context.",
    },
    {
      myth: "Good UX means making everything as easy as possible.",
      reality: "Ease is one pragmatic quality. Some good experiences involve effort, challenge or deliberate friction, for example in games or in confirming a large payment.",
    },
    {
      myth: "Designers can design the user's experience.",
      reality: "Designers shape the conditions: the product, the content and the context. The experience happens in a particular person at a particular moment.",
    },
  ],

  relations: [
    { target: "usability", type: "related-to", note: "Usability is the task-focused part of UX: effectiveness, efficiency and satisfaction for specified users and goals." },
    { target: "ui-design", type: "contrasts-with", note: "UI design shapes the interface; UX is the person's response to the whole system, of which the interface is one part." },
    { target: "user-centred-design", type: "applied-in", note: "User-centred design is the process most teams use to improve UX." },
    { target: "aesthetic-usability-effect", type: "related-to", note: "Perceived beauty colours judgements of usability, an example of hedonic and pragmatic qualities interacting." },
    { target: "peak-end-rule", type: "related-to", note: "The remembered experience after use is shaped by its most intense and final moments." },
    { target: "human-computer-interaction", type: "developed-from", note: "UX research grew within HCI as a response to usability's focus on task performance." },
    { target: "service-design", type: "complementary-to", note: "Service design extends the view to every touchpoint with an organisation, beyond one product's use." },
  ],

  exercises: [
    {
      id: "user-experience-ex-before-after",
      kind: "assignment",
      level: "beginner",
      title: "Map an experience beyond the screen",
      prompt: [
        "Choose a service you used recently (a delivery, an appointment, a ticket). List what happened before, during and after the main interaction, and mark which moments were on a screen and which were not. Note one moment that changed how you felt about the whole service.",
      ],
      deliverable: "A before / during / after list with one marked turning point.",
      criteria: ["Includes off-screen moments", "Separates what happened from how it felt", "Identifies a turning point"],
    },
    {
      id: "user-experience-ex-qualities",
      kind: "scenario",
      level: "intermediate",
      title: "Separate pragmatic and hedonic goals",
      prompt: [
        "A team is redesigning a music app. Write two pragmatic goals and two hedonic goals for it, each stated so that it could be evaluated, and name a method you would use to check each one.",
      ],
      deliverable: "Four goals with an evaluation method each.",
      criteria: ["Goals are testable", "Hedonic goals are not disguised usability goals", "Methods fit the goal (behavioural vs perceived)"],
      exampleSolution: [
        "Pragmatic: 'Start a playlist within two taps from launch' (task test); 'Find a song by partial lyrics on first try in 80% of attempts' (task test). Hedonic: 'Discovery feels surprising rather than repetitive' (questionnaire stimulation scale and interviews); 'Users would be comfortable showing their profile to friends' (interviews about identity).",
      ],
    },
    {
      id: "user-experience-ex-critique",
      kind: "critique",
      level: "advanced",
      title: "Critique a UX claim",
      prompt: [
        "A case study says 'our redesign improved the UX by 40%'. Write a critique: what could have been measured, what the figure leaves out, and what you would need to know before accepting the claim.",
      ],
      deliverable: "A short critique with three questions you would ask.",
      criteria: ["Identifies the construct being measured", "Asks about baseline, sample and instrument", "Notes what a single score cannot show"],
    },
  ],

  quiz: [
    {
      id: "user-experience-q-ui",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which statement best describes the relationship between UI and UX?",
      options: [
        { text: "The UI is one of many things that shape the user's experience.", correct: true, explanation: "Content, performance, support, price and context shape UX as well as the interface." },
        { text: "They are two words for the same thing.", correct: false, explanation: "UI is the interactive surface; UX is the person's response to the whole system." },
        { text: "UX is the visual style of the UI.", correct: false, explanation: "Visual style is part of UI design; UX is broader than appearance." },
        { text: "UX only applies to websites.", correct: false, explanation: "UX applies to any product, system or service, including physical and service touchpoints." },
      ],
      explanation: "UX is the outcome in the person; UI is one designed input.",
    },
    {
      id: "user-experience-q-hedonic",
      kind: "scenario",
      level: "intermediate",
      prompt: "People can complete every task in a photo-editing app quickly, yet many describe it as dull and stop using it. Which quality is most likely weak?",
      options: [
        { text: "Hedonic quality", correct: true, explanation: "Stimulation and appeal are low even though task support (pragmatic quality) is good." },
        { text: "Pragmatic quality", correct: false, explanation: "Quick task completion indicates good pragmatic quality." },
        { text: "Effectiveness", correct: false, explanation: "Tasks are being completed, so effectiveness is fine." },
        { text: "Accessibility", correct: false, explanation: "Nothing in the scenario suggests barriers for people with disabilities." },
      ],
      explanation: "Pragmatic and hedonic qualities are judged separately; strong usability does not guarantee a good experience.",
    },
    {
      id: "user-experience-q-time",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Why do researchers describe UX as dynamic?",
      options: [
        { text: "Expectations before use, reactions during use and memory after use differ, and change with repeated use.", correct: true, explanation: "Experience unfolds over time and is re-evaluated in memory." },
        { text: "Because interfaces are animated.", correct: false, explanation: "Animation is a UI property; dynamism refers to how experience changes over time." },
        { text: "Because UX scores are recalculated daily.", correct: false, explanation: "No standard requires that; the point is about the phenomenon, not reporting." },
        { text: "Because users are always learning the interface.", correct: false, explanation: "Learning is one factor, but expectations, context and memory also change." },
      ],
      explanation: "Before, during, after and over time: each phase shapes the experience.",
      revise: "peak-end-rule",
    },
    {
      id: "user-experience-q-scope",
      kind: "true-false",
      level: "advanced",
      prompt: "Researchers agree on exactly how far the concept of user experience extends, for example whether it includes a brand.",
      options: [
        { text: "True", correct: false, explanation: "Survey evidence shows agreement on core properties but disagreement on scope." },
        { text: "False", correct: true, explanation: "Law et al. found consensus that UX is dynamic, contextual and subjective, but divided views on its boundaries." },
      ],
      explanation: "The core is shared; the edges are contested.",
    },
  ],

  flashcards: [
    { id: "user-experience-fc-1", front: "User experience (ISO 9241-210, paraphrased)", back: "A person's perceptions and responses resulting from the use or anticipated use of a product, system or service; before, during and after use." },
    { id: "user-experience-fc-2", front: "Pragmatic vs hedonic quality", back: "Pragmatic: support for the task (useful, easy). Hedonic: stimulation, beauty, identity. People judge them separately (Hassenzahl)." },
    { id: "user-experience-fc-3", front: "UX vs UI", back: "UI is the interface people interact with; UX is their response to the whole system, of which the UI is one part." },
  ],

  references: [
    { source: "iso-9241-210-2019", role: "standard", note: "Normative definition of user experience (paraphrased)." },
    { source: "hassenzahl-tractinsky-2006", role: "primary", note: "UX research agenda: beyond the instrumental, emotion and affect, the experiential." },
    { source: "law-et-al-2009", role: "primary", note: "Survey on understanding and scoping UX; proposed definition." },
    { source: "hassenzahl-2004", role: "primary", note: "Pragmatic and hedonic attributes, beauty and goodness judgements." },
    { source: "norman-nielsen-ux-definition", role: "further", note: "Practitioner definition contrasting UX with UI and usability." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "UX is an established construct and field of practice, defined in ISO 9241-210 and developed in HCI research. Its components are supported by studies (for example, pragmatic and hedonic qualities are perceived separately), but UX as a whole is not something one experiment can validate, its scope is still debated, and popular claims linking 'UX' to business results usually rest on case studies.",

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
  lastVerifiedAt: "2026-11-04",
});
