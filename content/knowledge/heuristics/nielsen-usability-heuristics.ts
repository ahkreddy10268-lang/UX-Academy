import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "nielsen-usability-heuristics",
  slug: "nielsen-usability-heuristics",
  title: "Nielsen's 10 Usability Heuristics",
  alternateNames: ["Nielsen's heuristics", "Ten usability heuristics", "Nielsen–Molich heuristics"],
  summary:
    "Ten broad rules of thumb for interface usability, derived by Jakob Nielsen from practitioner experience and a 1994 factor analysis of usability problems — the most widely used heuristic set in UX.",
  definition:
    "Nielsen's 10 usability heuristics are a set of general principles for interaction design — visibility of system status, match with the real world, user control and freedom, consistency and standards, error prevention, recognition rather than recall, flexibility and efficiency, aesthetic and minimalist design, error recovery, and help and documentation. They are called **heuristics** because they are broad rules of thumb for spotting likely problems, not specific, testable design rules.",
  primaryType: "heuristic",
  secondaryTypes: ["principle", "guideline"],
  domain: "heuristics",
  subcategory: "heuristic-sets",
  tags: ["usability", "inspection", "design principles", "heuristic evaluation", "Nielsen", "match between system and the real world", "speak the user's language"],
  difficulty: "beginner",
  disciplines: ["Usability engineering", "Interaction design", "Human-computer interaction"],
  learningObjectives: [
    "Name and explain each of the ten heuristics in your own words with an interface example.",
    "Use the heuristics as a shared vocabulary to describe and prioritise usability problems.",
    "Explain where the heuristics came from and what kind of evidence supports them.",
    "Recognise the limits of heuristics — what they miss and why they cannot replace testing with users.",
  ],
  prerequisites: ["usability"],

  levels: {
    beginner: {
      explanation: [
        "When you use a badly designed app you often feel the problem before you can name it: you are lost, you cannot undo, the error message makes no sense. Nielsen's heuristics give those feelings names. They are ten short rules that describe what usable interfaces tend to do.",
        "The ten are: **1. Visibility of system status** — always show people what is happening. **2. Match between the system and the real world** — use their words and familiar conventions. **3. User control and freedom** — give a clear way out and an undo. **4. Consistency and standards** — the same thing should look and work the same way, here and in other products. **5. Error prevention** — design so mistakes are hard to make.",
        "**6. Recognition rather than recall** — show options rather than making people remember them. **7. Flexibility and efficiency of use** — offer shortcuts for experienced users without confusing beginners. **8. Aesthetic and minimalist design** — leave out what does not help. **9. Help users recognise, diagnose and recover from errors** — say what went wrong in plain language and how to fix it. **10. Help and documentation** — when help is needed, make it easy to find and focused on the task.",
        "They are called *heuristics* because they are rules of thumb: quick ways to spot probable problems. They do not tell you exactly what to build, and a design can follow all ten and still fail for real users.",
      ],
      analogy:
        "The heuristics work like a doctor's checklist of warning signs. A checklist helps a doctor notice things quickly and describe them consistently, but it is not a diagnosis — tests on the actual patient still decide what is really wrong.",
      everydayExamples: [
        "A file upload with a progress bar (heuristic 1) versus one that freezes silently.",
        "Gmail's 'Undo send' (heuristic 3).",
        "A date picker that disables impossible dates instead of rejecting them after submission (heuristic 5).",
        "An error that says 'Card number is 15 digits; Visa cards have 16' instead of 'Error 402' (heuristic 9).",
      ],
      vocabulary: [
        { term: "Heuristic", meaning: "A rule of thumb — a quick, general guide that is usually but not always right." },
        { term: "System status", meaning: "What the software is doing right now: loading, saved, failed, waiting for input." },
        { term: "Slip", meaning: "An error where you intend the right thing but do the wrong action, like clicking the button next to the one you meant." },
        { term: "Mistake", meaning: "An error where your plan itself is wrong, often because you misunderstood how the system works." },
        { term: "Accelerator", meaning: "A faster route for experienced users, such as a keyboard shortcut." },
      ],
    },
    intermediate: {
      explanation: [
        "In practice the heuristics do two jobs. They are an **inspection checklist** for [[heuristic-evaluation|heuristic evaluation]], and they are a **shared vocabulary** that lets a team say 'this is a recognition-versus-recall problem' instead of arguing about taste.",
        "Each heuristic covers a family of more specific guidelines. *Visibility of system status* includes loading indicators, save confirmations, selection states and position-in-flow indicators. *Error prevention* covers constraints, sensible defaults, confirmation of destructive actions and forgiving input formats. Good evaluators translate the broad heuristic into the specific rule that applies to the screen in front of them.",
        "Several heuristics are in tension. Minimalist design pulls against visible options (recognition over recall); flexibility for experts pulls against consistency for novices; confirmations that prevent errors add friction that slows people down. Applying the heuristics well means judging trade-offs for a specific context of use, not maximising every rule.",
      ],
      howItWorks: [
        "Heuristic 1 maps to feedback timing: Nielsen's response-time guidance (about 0.1 s feels instantaneous, about 1 s keeps the flow of thought, about 10 s is the limit of attention) gives practical thresholds for when to show progress {{src:nielsen-1993}}. These figures are design guidance built on earlier work such as Miller (1968), not precise perceptual constants {{src:miller-1968}}.",
        "Heuristic 4 has two scopes: internal consistency (within your product) and external consistency (with platform conventions and other products people use) — the latter is the idea popularised as [[jakobs-law|Jakob's Law]].",
        "Heuristic 6 is the interface form of the cognitive principle of [[recognition-over-recall|recognition over recall]]: recognising an item from cues is easier than recalling it from memory.",
        "Heuristic 9 concerns the wording and placement of error messages; heuristic 5 concerns designing so the error does not happen. Prefer 5 over 9 whenever possible.",
      ],
      implementation: [
        "Write each finding against one primary heuristic, with the screen, the evidence and a severity rating.",
        "Translate heuristics into product-specific checks (for example, 'every async action shows state within 1 s').",
        "Use the heuristics in design critiques and pull-request reviews, not only in formal evaluations.",
        "Pair heuristic findings with user research before investing in large redesigns.",
      ],
      scenarios: [
        "A banking app's transfer screen: no confirmation of the recipient's name before sending (error prevention), and a generic 'Something went wrong' failure (error recovery).",
        "An analytics dashboard where filters are applied silently with no visible indication (system status) and must be retyped on each visit (recognition rather than recall).",
        "A form that clears all fields after a validation error (user control and freedom; error recovery).",
      ],
    },
    advanced: {
      explanation: [
        "The heuristics have an unusual pedigree: part experience, part data reduction. Molich & Nielsen (1990) presented nine dialogue principles drawn from experience teaching and consulting {{src:molich-nielsen-1990}}, and Nielsen & Molich (1990) introduced heuristic evaluation using them {{src:nielsen-molich-1990}}. Nielsen (1994) then rated how well each of 101 heuristics, drawn from seven published sets, explained each of 249 usability problems from 11 earlier projects, and ran a principal components analysis of those ratings {{src:nielsen-1994-heuristics}}. The paper derived nine heuristics from the factors with the broadest explanatory coverage; the published list of ten also includes *help and documentation*, which is not among the nine named in the paper's abstract.",
        "The same analysis is a caution against over-reading the list: no small set of factors dominated. The seven most important factors together accounted for only about 30% of the variance in the problem ratings, and 25 factors were needed to reach about 62% {{src:nielsen-1994-heuristics}}.",
        "That derivation matters for interpretation. The heuristics are a **compression of known problem types**, optimised for explanatory coverage of problems found in projects of the early 1990s. They are not a theory of usability, and their categories are not mutually exclusive — the same problem can legitimately be filed under several heuristics.",
        "NN/g states the ten heuristics have remained unchanged since 1994, though their descriptions were reworded and expanded in 2020 {{src:nielsen-ten-heuristics-article}}. Their stability is partly a strength (broad principles age well) and partly a limitation: they say little directly about accessibility, ethics, trust, emotional experience, multi-device journeys or AI-driven systems.",
      ],
      evidence: [
        "The original evidence is the 1994 factor analysis; it shows the heuristics capture common problem types in that problem database, not that applying them improves outcomes — and even there the leading factors explained a minority of the variance {{src:nielsen-1994-heuristics}}.",
        "Studies of heuristic evaluation show substantial variability between evaluators using the same heuristics — the 'evaluator effect' {{src:hertzum-jacobsen-2001}} — so the heuristics alone do not produce reliable, repeatable findings.",
        "Critiques of evaluation-method comparison studies warn that much evidence on the effectiveness of heuristic-based methods comes from studies with validity problems {{src:gray-salzman-1998}}.",
      ],
      debates: [
        "**Generic or domain-specific?** Many researchers create domain-specific heuristic sets (games, voice, accessibility, AI). These can find more relevant problems but lose comparability and are often less rigorously derived.",
        "**Do they overlap other sets?** Shneiderman's golden rules, Norman's principles and ISO 9241-110's interaction principles cover much of the same ground with different emphases; see [[shneiderman-golden-rules|Shneiderman's Eight Golden Rules]].",
        "**Checklist or judgment?** Used mechanically, heuristics produce long lists of low-value findings. Used as prompts for expert judgment, they help experts notice and explain problems. The value depends on the evaluator.",
      ],
      alternativeModels: [
        "[[shneiderman-golden-rules|Shneiderman's Eight Golden Rules]] — earlier in book form (1987), more oriented to dialogue design and user control.",
        "[[gerhardt-powals-principles|Gerhardt-Powals' cognitive engineering principles]] — grounded explicitly in cognitive psychology.",
        "[[iso-9241-110|ISO 9241-110 interaction principles]] — the standards-body formulation of similar ideas.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Rolf Molich"],
    period: "1990 (original nine principles); 1994 (revised ten)",
    problem:
      "Formal usability testing was seen as too expensive for most projects. Nielsen and Molich wanted a cheap 'discount usability' method by which practitioners could inspect interfaces against a short list of principles.",
    narrative: [
      "The original 1990 set contained nine principles, including 'simple and natural dialogue', 'speak the user's language', 'minimise user memory load', 'be consistent', 'provide feedback', 'provide clearly marked exits', 'provide shortcuts', 'good error messages' and 'prevent errors' {{src:molich-nielsen-1990}}.",
      "In 1994 Nielsen compared 101 heuristics from seven published sets against 249 usability problems from 11 projects; a factor analysis yielded nine heuristics, which together with 'help and documentation' form the ten still in use {{src:nielsen-1994-heuristics}}.",
      "NN/g republished the list with expanded explanations in 2020; the names have stayed the same {{src:nielsen-ten-heuristics-article}}.",
    ],
  },

  application: {
    summary: [
      "The heuristics are used for expert inspection, design critique, design-system review and teaching. They are most valuable early and continuously — catching obvious problems before users are recruited, so that testing time is spent on problems only users can reveal.",
    ],
    web: [
      "Check every asynchronous action (save, submit, search) for visible status within about one second.",
      "Ensure form errors are shown next to the field, in plain language, with the user's input preserved.",
    ],
    mobile: [
      "Check that back navigation and gestures behave consistently with platform conventions.",
      "Prefer undo snackbars over confirmation dialogs for reversible destructive actions.",
    ],
    enterprise: [
      "Offer accelerators (keyboard shortcuts, bulk actions, saved filters) for expert, high-frequency users without hiding core paths from novices.",
      "Audit terminology against the users' domain language, not internal system names.",
    ],
    services: [
      "Apply heuristics across channels: is status visible in emails, letters and call-centre scripts as well as on screen?",
    ],
    steps: [
      "Define the users, tasks and context you are evaluating for.",
      "Walk through key tasks screen by screen, asking of each heuristic: is it violated here?",
      "Record each finding with location, evidence, violated heuristic, severity and a suggested fix.",
      "Merge findings across evaluators and prioritise by severity and frequency.",
      "Validate the most important findings with users before large changes.",
    ],
  },

  whenToUse: [
    "As a quick, low-cost inspection before or between rounds of user testing.",
    "As a shared vocabulary for design critiques and reviews.",
    "As a teaching framework for people new to usability.",
  ],
  whenNotToUse: [
    "As proof that a design is usable — passing all ten says nothing about whether real users can complete real tasks.",
    "As the only lens for accessibility, ethics, trust or domain-specific risks (use WCAG, domain heuristics and research).",
    "As a mechanical checklist applied by people without usability experience, which tends to generate many low-severity findings.",
  ],
  advantages: [
    "Short, memorable and widely known — a common language across teams.",
    "Broad enough to apply to almost any interactive system.",
    "Free and fast to apply.",
  ],
  limitations: [
    "Broad categories overlap; the same problem fits several heuristics.",
    "Derived from early-1990s problem data; silent on many modern concerns such as accessibility, privacy, deceptive patterns and AI.",
    "Finding quality depends heavily on evaluator expertise.",
    "Cannot reveal problems rooted in users' goals, mental models or context that the evaluator does not know.",
  ],
  misconceptions: [
    {
      myth: "The heuristics are scientific laws of usability.",
      reality:
        "They are rules of thumb derived from practitioner experience and a factor analysis of problem reports. They describe common problem types; they do not predict outcomes.",
    },
    {
      myth: "If a design satisfies all ten heuristics, it is usable.",
      reality:
        "Heuristics find many problems but miss others — especially those tied to users' goals, domain knowledge and context. Only research with representative users can establish usability for a context of use.",
    },
    {
      myth: "'Aesthetic and minimalist design' means making interfaces look sparse.",
      reality:
        "The heuristic is about **relevance**: every extra unit of information competes with the relevant units. A dense expert dashboard can satisfy it if everything shown supports the task.",
    },
  ],

  relations: [
    { target: "heuristic-evaluation", type: "applied-in", note: "Heuristic evaluation is the inspection method for which the heuristics were created." },
    { target: "shneiderman-golden-rules", type: "complementary-to", note: "Shneiderman's rules cover overlapping ground — consistency, feedback, error prevention, reversal, memory load — with a stronger emphasis on dialogue closure and user control." },
    { target: "recognition-over-recall", type: "derived-from", note: "Heuristic 6 applies the memory principle that recognition is easier than recall." },
    { target: "jakobs-law", type: "related-to", note: "Jakob's Law is a popular restatement of the external-consistency part of heuristic 4." },
    { target: "visibility-of-system-status", type: "related-to", note: "Heuristic 1 is the source of the widely used principle of visible system status." },
    { target: "error-prevention", type: "related-to", note: "Heuristic 5 names the general principle of designing errors out of the system." },
    { target: "iso-9241-110", type: "complementary-to", note: "ISO 9241-110's interaction principles express similar ideas in standards language." },
    { target: "aesthetic-usability-effect", type: "contrasts-with", note: "Heuristic 8 is about relevance of information, whereas the aesthetic-usability effect concerns how visual appeal shapes perceived usability." },
  ],

  lab: "feedback-lab",

  exercises: [
    {
      id: "nielsen-usability-heuristics-ex-match",
      kind: "scenario",
      level: "beginner",
      title: "Name the heuristic",
      prompt: [
        "For each problem, name the single heuristic it most clearly violates and explain why: (a) A 'Submit' button gives no response for six seconds. (b) A settings menu calls profiles 'Entities'. (c) A wizard has no Back button. (d) A search box forgets your last query each visit. (e) A dialog says 'Error: null pointer'.",
      ],
      deliverable: "Five heuristic names with one-sentence justifications.",
      criteria: ["Picks a defensible primary heuristic", "Explains the user impact, not only the rule"],
      exampleSolution: [
        "(a) Visibility of system status — no feedback during a delay. (b) Match between system and real world — internal jargon. (c) User control and freedom — no exit or reversal. (d) Recognition rather than recall — users must retype instead of recognising a previous query. (e) Help users recognise, diagnose and recover from errors — the message is technical and gives no remedy.",
      ],
    },
    {
      id: "nielsen-usability-heuristics-ex-tension",
      kind: "critique",
      level: "intermediate",
      title: "Resolve a heuristic tension",
      prompt: [
        "A team wants to remove a rarely used 'Advanced filters' panel to satisfy aesthetic and minimalist design. Expert users complain they will lose their efficiency.",
        "Which heuristics are in tension? Propose a design that respects both, and say what evidence you would collect to decide.",
      ],
      deliverable: "A short design proposal (≤200 words) with an evidence plan.",
      criteria: [
        "Names flexibility & efficiency vs. aesthetic & minimalist design",
        "Proposes a pattern such as progressive disclosure or saved views",
        "Identifies data that would settle the question (usage analytics, interviews, tests)",
      ],
    },
    {
      id: "nielsen-usability-heuristics-ex-gap",
      kind: "reflection",
      level: "advanced",
      title: "What the heuristics miss",
      prompt: [
        "Choose a product category that did not exist in 1994 (for example, a generative-AI assistant or a smart-home app). List three serious usability or experience problems in that category that none of the ten heuristics clearly captures. Draft an additional heuristic for one of them and explain how you would test whether it helps evaluators find real problems.",
      ],
      deliverable: "Three problems, one draft heuristic, and a validation idea.",
      criteria: ["Problems are genuinely outside the ten", "Validation plan compares evaluator performance against user-test findings"],
    },
  ],

  quiz: [
    {
      id: "nielsen-usability-heuristics-q-status",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A payment form shows nothing for several seconds after 'Pay' is pressed, so people press it again. Which heuristic is most directly violated?",
      options: [
        { text: "Visibility of system status", correct: true, explanation: "The system gives no timely feedback that the payment is in progress, so users cannot tell whether their action registered." },
        { text: "Aesthetic and minimalist design", correct: false, explanation: "Nothing irrelevant is being shown; the problem is missing information, not excess information." },
        { text: "Help and documentation", correct: false, explanation: "Documentation would not fix the absence of in-the-moment feedback." },
        { text: "Match between the system and the real world", correct: false, explanation: "The language and conventions are not the issue; the lack of feedback is." },
      ],
      explanation: "Feedback about ongoing work belongs to heuristic 1. A progress indicator plus disabling the button while processing also prevents the duplicate-payment error (heuristic 5).",
    },
    {
      id: "nielsen-usability-heuristics-q-origin",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "How was the 1994 version of the ten heuristics produced?",
      options: [
        { text: "By controlled experiments showing that each heuristic improves task success", correct: false, explanation: "No such experiments underlie the list; the heuristics were not validated one by one against outcomes." },
        { text: "By a factor analysis of how well 101 existing heuristics explained 249 real usability problems", correct: true, explanation: "Nielsen (1994) rated 101 heuristics from seven published sets against 249 problems from 11 projects and used factor analysis to find the principles with the broadest explanatory coverage." },
        { text: "By an ISO working group", correct: false, explanation: "ISO's interaction principles (ISO 9241-110) are a separate standard." },
        { text: "By eye-tracking studies at Nielsen Norman Group", correct: false, explanation: "The heuristics predate NN/g's eye-tracking work and were not derived from it." },
      ],
      explanation: "The heuristics compress common problem types found in real projects. That explains their breadth — and why they are not a predictive theory.",
    },
    {
      id: "nielsen-usability-heuristics-q-sufficient",
      kind: "true-false",
      level: "beginner",
      prompt: "An interface that has no violations of the ten heuristics can be considered usable without testing it with users.",
      options: [
        { text: "True", correct: false, explanation: "Heuristics cannot reveal problems that depend on users' goals, knowledge and context." },
        { text: "False", correct: true, explanation: "Usability is defined for specific users, goals and contexts of use; it has to be established with evidence from those users." },
      ],
      explanation: "Heuristics are an inspection aid. They complement, not replace, research with representative users.",
    },
    {
      id: "nielsen-usability-heuristics-q-minimal",
      kind: "scenario",
      level: "advanced",
      prompt:
        "A stakeholder cites 'aesthetic and minimalist design' to remove the column headers' sort controls from a data table used by analysts daily. What is the best response?",
      options: [
        { text: "Agree — fewer controls always means a better application of the heuristic.", correct: false, explanation: "The heuristic concerns irrelevant information, not the number of controls. Sorting is relevant to analysts' tasks." },
        { text: "Explain that the heuristic targets irrelevant content; sorting supports the core task and its removal would violate flexibility and efficiency of use.", correct: true, explanation: "Applying heuristics means judging relevance to users' tasks and weighing competing heuristics." },
        { text: "Replace sorting with a help article explaining how to export and sort in a spreadsheet.", correct: false, explanation: "That adds effort and moves the task outside the product; help does not compensate for removing a core capability." },
        { text: "Keep sorting but hide it in a settings page to satisfy both heuristics.", correct: false, explanation: "Hiding a high-frequency control raises interaction cost and forces recall rather than recognition." },
      ],
      explanation: "Heuristics conflict; resolving the conflict requires knowledge of the users' tasks and frequencies of use.",
      revise: "heuristic-evaluation",
    },
  ],

  flashcards: [
    { id: "nielsen-usability-heuristics-fc-1", front: "Nielsen's ten heuristics (names)", back: "System status · Real-world match · User control & freedom · Consistency & standards · Error prevention · Recognition over recall · Flexibility & efficiency · Aesthetic & minimalist design · Error recovery · Help & documentation." },
    { id: "nielsen-usability-heuristics-fc-2", front: "How were the 1994 heuristics derived?", back: "Factor analysis of ratings of 101 heuristics (from seven published sets) against 249 usability problems from 11 projects (Nielsen, CHI '94). The top seven factors explained only ≈30% of variance." },
    { id: "nielsen-usability-heuristics-fc-3", front: "Why are they called heuristics?", back: "They are broad rules of thumb for spotting likely problems — not specific, testable design rules or predictive laws." },
  ],

  references: [
    { source: "molich-nielsen-1990", role: "primary", note: "Original nine dialogue principles." },
    { source: "nielsen-molich-1990", role: "primary", note: "Introduction of heuristic evaluation." },
    { source: "nielsen-1994-heuristics", role: "primary", note: "Factor-analytic derivation of the revised ten." },
    { source: "nielsen-ten-heuristics-article", role: "explanatory", note: "Current published wording and examples (checked 2026-11-03)." },
    { source: "nielsen-1993", role: "explanatory", locator: "Chapter 5 — response times", note: "0.1 / 1 / 10 s response-time guidance." },
    { source: "miller-1968", role: "further", note: "Early response-time analysis underlying the time thresholds." },
    { source: "hertzum-jacobsen-2001", role: "further", note: "Evaluator effect in heuristic-based inspection." },
    { source: "gray-salzman-1998", role: "further", note: "Critique of evidence on inspection methods." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "A practitioner framework partly derived from data (a factor analysis of real usability problems). The evidence supports the heuristics as a **broad classification of common problem types**; it does not show that each heuristic predicts usability outcomes, nor that evaluations using them are reliable across evaluators.",

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
