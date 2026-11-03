import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "millers-law",
  slug: "millers-law",
  title: "Miller's Law",
  alternateNames: ["The magical number seven, plus or minus two", "7 ± 2", "Memory span limit"],
  summary:
    "The popular name for Miller's 1956 observation that people can hold only a handful of items in immediate memory — and that recoding information into chunks stretches this limit. Often misapplied to menus.",
  definition:
    "\"Miller's law\" is a practitioner label, not Miller's own term, for findings reviewed in George Miller's 1956 paper: the span of **absolute judgement** along a single sensory dimension is limited to roughly seven categories, and the span of **immediate memory** is limited to roughly seven items — where the limit applies to **chunks** (meaningful units) rather than to raw bits of information. Later research puts the core capacity of short-term memory nearer **four chunks** when rehearsal and grouping are controlled.",
  primaryType: "concept",
  secondaryTypes: ["historical-contribution"],
  domain: "laws-effects",
  subcategory: "memory-attention-effects",
  tags: ["working memory", "short-term memory", "chunking", "memory span", "cognitive load", "information theory"],
  difficulty: "beginner",
  disciplines: ["Cognitive psychology", "Human-computer interaction", "Information design"],
  learningObjectives: [
    "Explain what Miller's 1956 paper actually reported and why '7 ± 2' became famous.",
    "Describe chunking and use it to make information easier to hold in mind.",
    "Explain why the memory-span limit does not justify capping visible menus or navigation at seven items.",
    "Evaluate modern estimates of short-term memory capacity, including Cowan's 'about four chunks'.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Try to remember a stranger's phone number long enough to type it. You can manage it — just — but if someone talks to you halfway through, it is gone. Your mind can only keep a few things 'live' at once.",
        "In 1956 the psychologist George Miller noticed that across many experiments people tended to max out at about **seven items, give or take two**, when asked to repeat back things they had just heard. That number became famous, and designers later nicknamed the idea \"Miller's law\".",
        "The most useful part of his paper is not the number but the trick of **chunking**: grouping small pieces into bigger, meaningful units. `4 9 1 7 7 6 2 0 0 1` is ten digits; `4917 762 001` is three chunks and far easier to hold.",
        "Crucially, the limit is about things you must **remember without seeing them**. A menu you can see on screen does not have to be memorised at all.",
      ],
      analogy:
        "Short-term memory is like holding things in your hands while walking across a room. You can carry a few loose items, but put them in a bag (a chunk) and you can carry far more — as long as the bag means something to you.",
      everydayExamples: [
        "Card numbers are printed in groups of four so you can copy them in chunks.",
        "A one-time passcode is easier to type from another device when it is shown as `482 913` rather than `482913`.",
        "Phone numbers are written with spaces or hyphens for the same reason.",
      ],
      vocabulary: [
        { term: "Short-term memory", meaning: "The small, temporary store holding what you are thinking about right now; it fades within seconds without rehearsal." },
        { term: "Memory span", meaning: "The longest list of items a person can repeat back correctly immediately after hearing or seeing it." },
        { term: "Chunk", meaning: "A group of items treated as a single meaningful unit — for example, a familiar word instead of its letters." },
        { term: "Absolute judgement", meaning: "Identifying a single stimulus (like a tone's pitch) from a set of categories without anything to compare it with." },
      ],
    },
    intermediate: {
      explanation: [
        "Miller's paper discussed two separate limits. **Absolute judgement**: when people label stimuli varying on one dimension (pitch, loudness, position on a line), accuracy collapses beyond roughly seven categories — a channel capacity of about 2.5 bits {{src:miller-1956}}. **Immediate memory span**: people can repeat back about seven items, but here the limit is roughly constant in *items* whatever their information content, so recoding several pieces into one chunk lets you hold more information.",
        "For designers, the defensible lesson is: **minimise what users must hold in memory between moments of interaction**, and when they must hold something, help them chunk it. This is the logic behind [[recognition-over-recall]] and part of the reasoning behind [[cognitive-load-theory]].",
        "The indefensible lesson — common in design articles — is a rule that menus, tabs or navigation must contain at most seven items. Visible options are *recognised*, not recalled; they live on the screen, not in working memory. Long lists are a matter of scanning, grouping and [[information-scent]], not memory span.",
      ],
      howItWorks: [
        "Capacity depends on what counts as a chunk for this person: an experienced developer sees `useEffect` as one unit; a novice sees nine letters.",
        "Span is reduced by interference (other information arriving), delay without rehearsal, and divided attention — all common in real interfaces.",
        "Chunking works best when the grouping is meaningful (dates, area codes, known words) rather than arbitrary.",
      ],
      implementation: [
        "Look for moments where users must carry information across screens — codes, reference numbers, product specs to compare, instructions to follow — and bring that information along instead.",
        "Format long strings (IBANs, licence keys, OTPs, card numbers) in groups of three or four, while still accepting input without spaces.",
        "Keep comparison data visible side by side rather than asking people to remember attributes from previous pages.",
        "In voice interfaces, where nothing persists on screen, keep spoken option lists short and offer 'repeat' — this is where span limits genuinely bite.",
      ],
      scenarios: [
        "A two-factor flow that shows a code on a phone and asks for it on a laptop: grouping the code and keeping it visible until entered reduces errors.",
        "A comparison table replacing 'open each plan in a new page' removes the need to remember prices and limits.",
        "A phone menu (IVR) with nine spoken options overloads memory; the same nine options on screen would be easy to scan.",
      ],
    },
    advanced: {
      explanation: [
        "Miller's 1956 paper is partly a playful essay; he suggests the recurrence of 'seven' across unrelated phenomena may be little more than coincidence, and he distinguishes sharply between information measured in bits and memory measured in chunks {{src:miller-1956}}. Reading it as a precise capacity law misreads its argument.",
        "Cowan (2001) reviewed evidence from tasks that prevent rehearsal and grouping and argued that the true capacity of the focus of attention is about **three to five chunks**, ≈4 {{src:cowan-2001}}. Seven-item spans, on this view, reflect chunking and rehearsal strategies layered on top of a smaller core store.",
        "Modern accounts place these limits within [[working-memory-model|working memory]] — a set of interacting components rather than a single box — and debate whether capacity is best described as a fixed number of slots, a continuous resource shared across items, or a consequence of interference and decay.",
      ],
      evidence: [
        "Memory span limits are among the oldest and most replicated findings in experimental psychology; Baddeley's (1994) retrospective in *Psychological Review* reviews their durable influence {{src:baddeley-1994}}.",
        "Cowan's estimate rests on converging evidence from change detection, running memory span and other paradigms designed to block chunking {{src:cowan-2001}}.",
        "There is no direct experimental evidence that limiting *visible* navigation to seven items improves usability; that claim is an extrapolation from a different task.",
      ],
      debates: [
        "**Slots vs. resources.** Is capacity a fixed number of discrete items, or a flexible resource that can be spread thinly over more items at lower precision?",
        "**What is a chunk?** Capacity estimates depend on how chunks are defined and measured, which differs by expertise and material — a reason fixed numbers travel badly into design.",
        "**Decay vs. interference.** Whether forgetting in the short term is driven by time or by competing information affects how designers should think about delays and interruptions.",
      ],
      alternativeModels: [
        "The **[[working-memory-model|multicomponent working memory model]]** (Baddeley & Hitch) replaces a single short-term store with specialised subsystems.",
        "**[[cognitive-load-theory|Cognitive load theory]]** applies working-memory limits to instruction and interface complexity.",
        "The **[[atkinson-shiffrin-model|Atkinson-Shiffrin model]]** is the modal model in which a limited short-term store feeds long-term memory.",
      ],
    },
  },

  origin: {
    contributors: ["George A. Miller"],
    period: "1956 — the early cognitive revolution",
    problem:
      "Psychologists were applying Shannon's information theory to perception and memory and wanted to know whether human channel capacity could be expressed in bits.",
    narrative: [
      "Miller's paper, originally an invited address, reviewed experiments on absolute judgement and memory span and observed a recurring limit around seven {{src:miller-1956}}.",
      "Its lasting contribution was the distinction between bits and chunks: because memory span is limited in chunks, recoding can greatly increase the information held — a foundation of the cognitive revolution.",
      "Over decades the title phrase escaped into popular culture and design writing, where it was compressed into rules about menu length that the paper never proposed. Cowan's 2001 reconsideration lowered the estimate of core capacity to about four {{src:cowan-2001}}.",
    ],
    attributionNote:
      "Miller did not name a 'law'. The label \"Miller's law\" comes from later practitioner writing; it should not be confused with other uses of the same name.",
  },

  application: {
    summary: [
      "Apply the finding where users must **hold information in mind without seeing it**. Design to remove that burden first; chunk what remains.",
    ],
    web: [
      "Keep important context visible during multi-step forms (for example, a summary of choices made so far).",
      "Group form fields into labelled sections so the page is processed as a few chunks.",
      "Show reference numbers on confirmation pages and in emails — don't expect users to remember them.",
    ],
    mobile: [
      "Offer 'copy' and autofill for one-time codes instead of relying on users to memorise and retype them.",
      "Preserve state when users switch apps mid-task so they don't need to remember where they were.",
    ],
    enterprise: [
      "Avoid workflows that require operators to remember IDs from one screen to type into another; pass the data or provide pick-lists.",
      "Use consistent, chunked formats for codes (`ORD-2026-00418`) so experts can hold them as a few units.",
    ],
    services: [
      "In telephone and voice services, keep spoken menus short, put the most-used options first, and always offer a way to repeat.",
    ],
    steps: [
      "Map the journey and mark every point where users must remember something from earlier.",
      "For each, ask: can we show it, carry it forward, or let the system remember it?",
      "Where memory is unavoidable, chunk the information meaningfully and reduce interference (no unnecessary interruptions).",
      "Test with realistic interruptions — a notification, a second device — not just a quiet lab.",
    ],
  },

  whenToUse: [
    "Designing tasks where information must be carried across screens, devices or time.",
    "Formatting long codes, numbers and identifiers.",
    "Designing voice and audio interfaces, where nothing remains visible.",
  ],
  whenNotToUse: [
    "As a cap on the number of visible menu items, tabs, cards or list rows — those depend on scanning and grouping, not memory span.",
    "As a precise number: capacity varies with material, expertise and how chunks are formed.",
  ],
  advantages: [
    "Points designers toward a real, well-evidenced human constraint.",
    "Chunking is cheap to implement and benefits almost everyone.",
  ],
  limitations: [
    "The famous number is an approximation that Miller himself treated with irony; modern estimates are lower.",
    "Lab span tasks use isolated items and immediate recall — far from typical interface use.",
    "Says nothing about how people scan, search or recognise visible information.",
  ],
  misconceptions: [
    {
      myth: "Navigation menus should never have more than seven items.",
      reality:
        "Miller studied recall of items people could no longer see. Menus are visible and support [[recognition-over-recall|recognition]]. Long menus can be fine if they are well grouped and labelled; short menus can fail if labels are unclear.",
    },
    {
      myth: "People can remember exactly seven things.",
      reality:
        "Span depends on the material, the person and whether they can chunk and rehearse. With rehearsal and grouping blocked, capacity is closer to four chunks {{src:cowan-2001}}.",
    },
    {
      myth: "Miller proposed 'Miller's law' as a design rule.",
      reality: "Miller wrote about psychological measurement and information theory; the 'law' label and the design rules were added by others decades later.",
    },
  ],

  relations: [
    { target: "working-memory-model", type: "related-to", note: "The working memory model is the modern framework in which memory-span limits are explained." },
    { target: "recognition-over-recall", type: "applied-in", note: "Because recall is constrained by memory span, interfaces that let users recognise options reduce memory burden." },
    { target: "cognitive-load-theory", type: "influences", note: "Cognitive load theory is built on the premise that working memory capacity is severely limited." },
    { target: "hick-hyman-law", type: "related-to", note: "Both emerged from 1950s applications of information theory to human performance." },
    { target: "serial-position-effect", type: "related-to", note: "Both are classic findings from immediate-memory experiments; the recency part of the serial position curve reflects the same limited short-term store." },
    { target: "progressive-disclosure", type: "applied-in", note: "Staging information reduces how much users must hold in mind at once." },
  ],

  exercises: [
    {
      id: "millers-law-ex-memory-audit",
      kind: "critique",
      level: "beginner",
      title: "Find the memory traps",
      prompt: [
        "Walk through a sign-up, booking or checkout flow you use. Note every point where you must remember something from a previous screen or another device.",
        "For each, propose a change that removes the need to remember (show it, carry it forward, autofill it) or, if that is impossible, chunks it.",
      ],
      deliverable: "A table: moment, what must be remembered, proposed change, whether it removes or reduces the burden.",
      criteria: [
        "Distinguishes information that is visible from information that must be recalled",
        "Prefers removing the burden over chunking it",
        "Proposes realistic changes",
      ],
      exampleSolution: [
        "Example row: 'Enter the 8-digit code sent by SMS' → offer platform one-time-code autofill; display the code grouped as 4+4 in the message; keep the entry field tolerant of spaces. This removes the burden for most users and reduces it for the rest.",
      ],
    },
    {
      id: "millers-law-ex-menu-debate",
      kind: "scenario",
      level: "intermediate",
      title: "Respond to the 'seven items' rule",
      prompt: [
        "A stakeholder insists the main navigation must be cut from eleven items to seven because \"Miller's law says people can only process seven things\".",
        "Write a short, respectful response explaining what Miller's research actually showed, what evidence would settle the navigation question, and what you would test instead.",
      ],
      deliverable: "A 150–250 word response.",
      criteria: [
        "Explains recall vs. recognition correctly",
        "Does not dismiss the concern about complexity",
        "Proposes an appropriate method, such as tree testing or usability testing",
      ],
      exampleSolution: [
        "A strong answer notes that Miller studied immediate recall of items no longer visible, whereas navigation is visible and scanned; that the real risks of a long menu are poor grouping and unclear labels; and proposes a [[tree-testing|tree test]] comparing the eleven-item and seven-item structures on findability.",
      ],
    },
    {
      id: "millers-law-ex-span",
      kind: "assignment",
      level: "advanced",
      title: "Chunking in practice",
      prompt: [
        "Run the serial position lab twice: once with unrelated words and once with words that form natural categories (e.g., three fruits, three tools, three animals).",
        "Compare total recall and explain the difference with reference to chunking, then discuss why your result cannot establish a general capacity number.",
      ],
      deliverable: "A short report with both scores and a paragraph on limitations.",
      criteria: ["Explains chunking accurately", "Identifies at least two confounds (practice, material, attention)"],
    },
  ],

  quiz: [
    {
      id: "millers-law-q-menu",
      kind: "scenario",
      level: "beginner",
      prompt: "A team cites Miller's law to cut a visible navigation bar from ten items to seven. What is the strongest critique?",
      options: [
        { text: "Miller's findings concern recalling items that are no longer visible; visible navigation relies on recognition and scanning.", correct: true, explanation: "Memory span limits what people can hold in mind, not what they can scan. The navigation question is about grouping and labels." },
        { text: "Miller's law actually says nine items is the maximum.", correct: false, explanation: "7 ± 2 is an approximate range, not a rule with a hard maximum — and it is about memory, not menus." },
        { text: "Miller's law only applies to children.", correct: false, explanation: "Miller reviewed experiments with adults." },
        { text: "Seven is too many; the limit is really one.", correct: false, explanation: "Even the lower modern estimate is about four chunks, and it still concerns recall, not visible menus." },
      ],
      explanation: "The defensible use of Miller's work is reducing what users must remember, not capping visible options.",
    },
    {
      id: "millers-law-q-cowan",
      kind: "true-false",
      level: "intermediate",
      prompt: "When rehearsal and chunking are prevented, research reviewed by Cowan (2001) suggests short-term memory capacity is about four chunks.",
      options: [
        { text: "True", correct: true, explanation: "Cowan argued for a capacity of about three to five chunks in the focus of attention." },
        { text: "False", correct: false, explanation: "Cowan's review explicitly argues for a lower limit than seven once strategies like rehearsal are controlled." },
      ],
      explanation: "Seven-item spans include strategic help from rehearsal and grouping; the core limit appears smaller.",
    },
    {
      id: "millers-law-q-chunks",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "What did Miller argue about the relationship between bits of information and memory span?",
      options: [
        { text: "Memory span is roughly constant in chunks, so recoding information into larger chunks lets people hold more bits.", correct: true, explanation: "This is the paper's central distinction: absolute judgement is limited in bits, immediate memory in chunks." },
        { text: "Memory span is constant at about 2.5 bits regardless of the material.", correct: false, explanation: "The ≈2.5-bit figure relates to absolute judgement on one dimension, not memory span." },
        { text: "Memory span increases linearly with the information content of each item.", correct: false, explanation: "Span in items stays roughly similar whether items carry little or much information." },
        { text: "Bits and chunks are the same thing.", correct: false, explanation: "Miller separated them; that separation is why chunking works." },
      ],
      explanation: "Recoding into chunks is the mechanism that makes Miller's paper useful for design.",
    },
    {
      id: "millers-law-q-best-use",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which design decision is the most defensible application of memory-span research?",
      options: [
        { text: "Showing a one-time code as two groups of three digits and supporting autofill.", correct: true, explanation: "It removes the need to remember where possible and chunks what remains." },
        { text: "Limiting a product grid to seven products per page.", correct: false, explanation: "Products are visible; scanning and filtering matter more than memory span." },
        { text: "Using exactly seven tabs in every settings screen.", correct: false, explanation: "There is no evidence for a universal tab count derived from memory span." },
        { text: "Removing labels from icons to reduce the number of items.", correct: false, explanation: "Removing labels increases recall demands — the opposite of the goal." },
      ],
      explanation: "Memory research supports reducing and chunking what must be held in mind.",
    },
  ],

  flashcards: [
    { id: "millers-law-fc-1", front: "What did Miller (1956) mean by a chunk?", back: "A meaningful unit that memory span counts as one item, however much information it contains." },
    { id: "millers-law-fc-2", front: "Modern estimate of core short-term capacity", back: "About 3–5 chunks (≈4) when rehearsal and grouping are prevented (Cowan, 2001)." },
    { id: "millers-law-fc-3", front: "Why doesn't Miller's law limit menu length?", back: "Menus are visible: they use recognition and scanning, not recall from memory." },
  ],

  references: [
    { source: "miller-1956", role: "primary", note: "Original review of absolute judgement and memory span; chunking." },
    { source: "cowan-2001", role: "primary", note: "Reconsideration of capacity: about four chunks." },
    { source: "baddeley-1994", role: "explanatory", note: "Retrospective on the paper's influence." },
    { source: "laws-of-ux", role: "further", note: "Example of the popular 'Miller's law' framing for designers." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "That short-term memory capacity is limited, and that chunking extends it, is strongly supported by decades of experiments. The exact capacity is debated (≈4 chunks in tightly controlled tasks; ≈7 items in classic span tasks). The popular design rule capping visible menu items at seven has **no direct empirical support**.",

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
