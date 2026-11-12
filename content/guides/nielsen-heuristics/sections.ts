/**
 * Narrative, comparison, method, severity, advanced and assessment sections
 * of the Nielsen guide. Historical and methodological claims are cited to
 * sources in the registry; scenarios are labelled illustrative.
 */
import type { GuideInput } from "../../../lib/content/guide";

export const hero: GuideInput["hero"] = {
  eyebrow: "Guide · Nielsen's 10 usability heuristics",
  headline: "Design interfaces people can actually use.",
  lede: "Learn to recognise, understand and solve usability problems using Jakob Nielsen's ten principles of interaction design — then run a heuristic evaluation of your own.",
  outcomes: [
    "Explain all ten heuristics in your own words and tell similar ones apart.",
    "Recognise violations in real interfaces and say why they hurt people.",
    "Recommend better designs and justify trade-offs between heuristics.",
    "Run, rate and report a heuristic evaluation — and know its limits.",
  ],
  minutes: 90,
  levels: "Beginner to advanced",
};

export const story: GuideInput["story"] = {
  title: "The transfer that happened twice",
  question: "When an interface goes quiet, who is to blame for what happens next?",
  setup: [
    "**Illustrative scenario.** Imagine opening a banking app to send £250 to a friend. You choose the recipient, type the amount and press **Transfer**. Nothing happens: the button looks the same, no message appears, the screen does not change.",
    "After a few seconds you press **Transfer** again. A moment later two confirmations arrive. £500 has left your account.",
  ],
  prompts: [
    "What went wrong — and at which moment?",
    "Was the problem caused by the person, or by the interface?",
    "Which feedback should the system have given after the first press?",
    "How could the design have made the second transfer impossible?",
  ],
  debrief: [
    "The person did exactly what a reasonable person does when a system seems not to respond: they tried again. The failure belongs to the design. It showed no **status** after the first press (heuristic 1), did nothing to **prevent** the duplicate (heuristic 5), and offered **no way back** once the second transfer was sent (heuristic 3).",
    "**Usability** is how well specific people can use a product to reach their goals effectively, efficiently and with satisfaction in a given context ([[usability]]). It is part of the wider [[user-experience]], and it is shaped moment by moment by [[interaction-design-discipline|interaction design]] — what the interface does after each action.",
    "Small design failures compound: one missing message led to a duplicate payment, a support call, perhaps a lost customer. Because such problems are easy to create and hard to see from inside a team, designers need a **systematic way** to look for them. Nielsen's heuristics are the most widely used checklist for that job {{src:nielsen-ten-heuristics-article}}.",
  ],
  takeaway: "When people repeat an action, the interface probably failed to tell them the first one worked.",
};

export const framework: GuideInput["framework"] = {
  question: "Where did ten short rules come from — and why do practitioners still use them?",
  body: [
    "Nielsen's 10 usability heuristics are **broad rules of thumb** for interaction design. They do not tell you what to build; they help you notice where an interface is likely to cause problems and describe those problems in a shared vocabulary ([[nielsen-usability-heuristics]]).",
    "They began as part of **discount usability engineering**: in 1990 Rolf Molich and Jakob Nielsen proposed that practitioners could inspect a design against a short list of principles instead of always running expensive studies. Their experiments showed that a single evaluator finds only a minority of problems, while several evaluators together find substantially more {{src:nielsen-molich-1990}}.",
    "In 1994 Nielsen refined the list using data. He rated how well 101 heuristics from seven published sets explained 249 usability problems from 11 projects, and used factor analysis to find the principles with the broadest coverage {{src:nielsen-1994-heuristics}}. The ten heuristics in use today come from that work; NN/g states they have not changed since, though the explanations were rewritten in 2020 {{src:nielsen-ten-heuristics-article}}.",
    "They are **heuristics, not laws**. The same analysis showed no small set of principles explains most problems — the top factors together covered only about 30% of the variance {{src:nielsen-1994-heuristics}}. Use them as prompts for expert judgment, then check what you find with real users.",
  ],
  timeline: [
    { year: "1990", title: "Nine dialogue principles", detail: "Molich and Nielsen publish nine principles for human–computer dialogue {{src:molich-nielsen-1990}}." },
    { year: "1990", title: "Heuristic evaluation introduced", detail: "Nielsen and Molich show that aggregating several independent evaluators finds far more problems than one {{src:nielsen-molich-1990}}." },
    { year: "1994", title: "The ten heuristics", detail: "A factor analysis of 249 problems against 101 heuristics yields the set still used today {{src:nielsen-1994-heuristics}}." },
    { year: "2020", title: "Explanations updated", detail: "NN/g rewrites the descriptions and examples; the ten heuristics themselves are unchanged {{src:nielsen-ten-heuristics-article}}." },
  ],
  original: [
    "Simple and natural dialogue",
    "Speak the user's language",
    "Minimise user memory load",
    "Be consistent",
    "Provide feedback",
    "Provide clearly marked exits",
    "Provide shortcuts",
    "Good error messages",
    "Prevent errors",
  ],
  takeaway: "Ten rules distilled from real problems: use them to see and name issues, not to replace testing.",
};

export const comparisons: GuideInput["comparisons"] = [
  {
    id: "prevention-vs-recovery",
    a: 5,
    b: 9,
    aDefinition: "Error prevention removes the conditions that cause errors or checks before a commitment.",
    bDefinition: "Error recovery helps people understand an error that has happened and fix it.",
    difference: "Timing: prevention acts **before** the error, recovery **after**.",
    scenario: "**Illustrative.** A delivery form asks for a postcode.",
    aApplies: "Look up the address from the postcode and let people pick it, so a typo cannot produce an invalid address.",
    bApplies: "If a postcode is not recognised, say so at the field, keep the input and suggest checking for missing spaces or letters.",
    takeaway: "Prevent what you can; recover gracefully from the rest.",
  },
  {
    id: "status-vs-error-feedback",
    a: 1,
    b: 9,
    aDefinition: "Visibility of system status keeps people informed about what is happening at all times.",
    bDefinition: "Error recovery is the specific design of messages and paths once something fails.",
    difference: "Scope: status covers **every** state (working, done, failed); heuristic 9 covers the **failure message and the way out**.",
    scenario: "**Illustrative.** Uploading a 200 MB video.",
    aApplies: "Show progress, time remaining and a clear 'Uploaded' state.",
    bApplies: "If the upload fails at 80%, explain why (connection lost), say what was kept, and offer to resume rather than restart.",
    takeaway: "Every error is a status, but not every status is an error.",
  },
  {
    id: "recognition-vs-match",
    a: 6,
    b: 2,
    aDefinition: "Recognition rather than recall makes options and information visible so people need not remember them.",
    bDefinition: "Match with the real world uses the users' language, order and conventions.",
    difference: "Heuristic 2 is about **what** a label says; heuristic 6 is about **whether it is visible** when needed.",
    scenario: "**Illustrative.** Choosing a delivery option at checkout.",
    aApplies: "Show the delivery options as a visible list with prices and dates, not a code to remember from an earlier page.",
    bApplies: "Name them as customers would — 'Next-day', 'Collect in store' — not 'SVC-ND' and 'CNC'.",
    takeaway: "Familiar words still fail if they are hidden; visible options still fail if no one understands them.",
  },
  {
    id: "consistency-vs-flexibility",
    a: 4,
    b: 7,
    aDefinition: "Consistency and standards make similar things look and behave the same, inside the product and with conventions.",
    bDefinition: "Flexibility and efficiency add accelerators for frequent users.",
    difference: "Consistency protects **everyone's** predictability; flexibility adds **optional speed** for some. Accelerators must not break the shared behaviour.",
    scenario: "**Illustrative.** An email client with a keyboard shortcut to archive.",
    aApplies: "Archive uses the same icon, label and position on every screen, and works the same as on other platforms.",
    bApplies: "Pressing E archives the selected message for experts, and the shortcut is shown next to the Archive button so others can learn it.",
    takeaway: "Add speed on top of consistency, never instead of it.",
  },
  {
    id: "control-vs-prevention",
    a: 3,
    b: 5,
    aDefinition: "User control and freedom gives clear exits, cancel and undo.",
    bDefinition: "Error prevention avoids errors before they happen, including through confirmations.",
    difference: "Prevention interrupts **before** an action; control lets people **reverse** it after. For reversible actions, undo is often the better choice.",
    scenario: "**Illustrative.** Archiving a conversation in a chat app.",
    aApplies: "Archive immediately and show 'Conversation archived — Undo' for a few seconds.",
    bApplies: "A confirmation dialog ('Archive this conversation?') — reasonable only for permanent or high-cost actions; for archiving it adds friction every time.",
    takeaway: "Confirm the irreversible; make the rest undoable.",
  },
  {
    id: "minimalism-vs-recognition",
    a: 8,
    b: 6,
    aDefinition: "Aesthetic and minimalist design removes irrelevant information that competes with what matters.",
    bDefinition: "Recognition rather than recall keeps needed options and information visible.",
    difference: "Both concern what is on screen: heuristic 8 removes the **irrelevant**, heuristic 6 keeps the **relevant**. The tension appears when 'clean' design hides things people need.",
    scenario: "**Illustrative.** A mobile app moving all navigation into a hamburger menu.",
    aApplies: "The home screen looks calmer, with fewer competing elements.",
    bApplies: "Frequently used sections are now hidden, and people must remember they exist — NN/g notes hidden menus can violate recognition rather than recall {{src:moran-gordon-2023}}.",
    takeaway: "Remove noise, not needed options.",
  },
  {
    id: "help-vs-error-messages",
    a: 10,
    b: 9,
    aDefinition: "Help and documentation provide task-focused assistance people can find when they need it.",
    bDefinition: "Good error messages explain a failure and the way to fix it, at the moment it happens.",
    difference: "Who starts it: people **seek** help (heuristic 10); the system **delivers** an error message (heuristic 9).",
    scenario: "**Illustrative.** Setting up two-factor authentication.",
    aApplies: "A 'How does this work?' link beside the QR code opens three short steps with screenshots.",
    bApplies: "If the six-digit code is wrong, say it has expired or was mistyped, and offer to show a new code.",
    takeaway: "Help answers the questions people ask; error messages answer the questions the failure raises.",
  },
];

export const overlap: GuideInput["overlap"] = [
  "The heuristics overlap by design — they compress families of problems, and one problem often violates several. In the opening story, the duplicate transfer involves **status** (no feedback), **prevention** (no protection against a second submission) and **control** (no way to reverse it).",
  "In a report, file each finding under the **primary** heuristic — the one whose fix would solve it — and list the others as secondary. What matters is the problem, its impact and the fix; the classification is a tool for understanding, not an end in itself {{src:nielsen-1994-heuristics}}.",
];

export const process: GuideInput["process"] = {
  question: "How do professionals turn ten principles into a reliable list of problems to fix?",
  intro: [
    "A **heuristic evaluation** is an inspection by several evaluators who examine an interface independently against a set of heuristics, then combine and rate what they found ([[heuristic-evaluation]]). NN/g describes three core steps — prepare, evaluate independently, consolidate {{src:moran-gordon-2023}}; the seven stages below expand them into a complete project, from scoping to validating fixes.",
  ],
  stages: [
    {
      title: "Define the evaluation",
      goal: "Agree what you are evaluating, for whom and why.",
      points: [
        "Scope: which product, flows and screens; which platforms and devices.",
        "Target users and their goals; the context of use (where, on what device, under what pressure).",
        "The tasks that matter most — the ones people must complete for the product to succeed.",
        "The objective: a pre-launch check, a redesign baseline, or a competitor comparison.",
      ],
    },
    {
      title: "Prepare the evaluation",
      goal: "Give every evaluator the same brief and the same tools.",
      points: [
        "Recruit about three to five evaluators as a practical starting point; NN/g recommends three to five people evaluating independently {{src:moran-gordon-2023}}. In Nielsen's case studies a single evaluator found a given major problem only about 42% of the time and a minor one about 32% {{src:nielsen-1995-problems-found}}.",
        "Treat evaluator numbers as guidance, not a guarantee: the evaluator effect means different evaluators find different problems, so even several will miss some {{src:hertzum-jacobsen-2001}}.",
        "Share the scope, realistic tasks, the heuristic list and a findings template; run a short practice round together.",
      ],
    },
    {
      title: "Conduct independent inspections",
      goal: "Find problems without being influenced by others.",
      points: [
        "Each evaluator works alone, typically for one to two hours {{src:moran-gordon-2023}}.",
        "First pass: explore and complete the key tasks to understand the flow. Second pass: inspect each screen and element in detail.",
        "For each problem record the location, what happened, the heuristic(s), evidence (a screenshot) and the likely effect on users.",
      ],
    },
    {
      title: "Consolidate findings",
      goal: "Turn individual notes into one de-duplicated list.",
      points: [
        "Combine everyone's findings — affinity diagramming works well {{src:moran-gordon-2023}}.",
        "Merge duplicates, settle the primary heuristic for overlapping findings, and discuss disagreements.",
        "Look for patterns: recurring problems usually point to a shared component or a systemic decision.",
      ],
    },
    {
      title: "Assign severity ratings",
      goal: "Decide what to fix first.",
      points: [
        "Rate each problem on Nielsen's 0–4 scale (below), considering frequency, impact and persistence {{src:nielsen-severity-ratings}}.",
        "Collect ratings from each evaluator independently after the inspection, then average them; Nielsen notes individual ratings are unreliable {{src:nielsen-severity-ratings}}.",
        "Record the reasoning, not just the number.",
      ],
    },
    {
      title: "Recommend improvements",
      goal: "Make each finding actionable.",
      points: [
        "For every finding: problem, evidence, heuristic, user impact, severity, recommendation and expected outcome.",
        "Recommend the direction of the fix, not a finished design; link to design-system components where they solve it.",
        "Group fixes that share a cause, so one change resolves several findings.",
      ],
    },
    {
      title: "Validate improvements",
      goal: "Check that fixes work for real people.",
      points: [
        "Test the most severe and least certain findings with users before large investments ([[usability-testing]]).",
        "Measure task completion, error rates and time on task before and after the change ([[task-success-rate]]).",
        "Collect qualitative feedback, and run an accessibility evaluation — heuristics do not replace WCAG testing.",
      ],
    },
  ],
  takeaway: "Several independent eyes, one consolidated list, ratings with reasons, and testing to confirm.",
};

export const severity: GuideInput["severity"] = {
  intro: [
    "Nielsen's severity scale turns a list of problems into a priority order {{src:nielsen-severity-ratings}}. It combines three factors and, as Nielsen notes, the market impact of a problem.",
  ],
  scale: [
    { rating: 0, label: "Not a usability problem", meaning: "I don't agree this is a usability problem at all.", example: "A button colour some evaluators dislike but that meets contrast and conventions." },
    { rating: 1, label: "Cosmetic problem", meaning: "Need not be fixed unless extra time is available.", example: "Inconsistent capitalisation in two menu items." },
    { rating: 2, label: "Minor usability problem", meaning: "Fixing this should be given low priority.", example: "A filter resets when the page reloads, but people can set it again quickly." },
    { rating: 3, label: "Major usability problem", meaning: "Important to fix; give high priority.", example: "A form clears all fields after any validation error." },
    { rating: 4, label: "Usability catastrophe", meaning: "Imperative to fix before the product can be released.", example: "Payment fails silently, and people cannot tell whether an order was placed." },
  ],
  factors: [
    { name: "Frequency", question: "Is it common or rare?" },
    { name: "Impact", question: "Will it be easy or difficult for users to overcome?" },
    { name: "Persistence", question: "Is it a one-time problem people learn to avoid, or will it bother them repeatedly?" },
  ],
  caveats: [
    "The scale is an ordinal judgment, not a measurement: a 4 is not 'twice' a 2, and averaging is a way to reduce individual bias, not a formula with validated properties.",
    "Severity estimates are more reliable when several evaluators rate independently after the inspection than when one person rates during it {{src:nielsen-severity-ratings}}.",
    "Accessibility failures that block a task for some people (for example a keyboard trap) deserve a high rating even if few users are affected in your analytics.",
  ],
};

export const reportFields: GuideInput["reportFields"] = [
  { field: "Finding ID", description: "A unique identifier, such as F07." },
  { field: "Screen", description: "Where the problem occurs." },
  { field: "User task", description: "The task the problem affects." },
  { field: "Observation", description: "What the evaluator saw, described factually." },
  { field: "Heuristic", description: "The primary heuristic violated (others as secondary)." },
  { field: "Evidence", description: "A screenshot, recording or step-by-step reproduction." },
  { field: "User impact", description: "Why it matters to the people using the product." },
  { field: "Severity", description: "0–4, agreed after independent ratings." },
  { field: "Recommendation", description: "The direction of the fix." },
  { field: "Priority", description: "The recommended order of work, considering severity and effort." },
];

export const advanced: GuideInput["advanced"] = [
  {
    title: "Limitations of heuristic evaluation",
    body: [
      "Heuristic evaluation predicts problems; it does not observe them. It can flag issues real users never hit and miss ones that only appear in real contexts, with real data and real stakes. Evidence on how well inspection methods predict user problems comes partly from studies with validity problems {{src:gray-salzman-1998}}. Use it alongside testing, not instead of it.",
    ],
  },
  {
    title: "The evaluator effect and subjectivity",
    body: [
      "Evaluators using the same method on the same system find substantially different sets of problems {{src:hertzum-jacobsen-2001}}. Mitigate it with several independent evaluators, a shared brief, evidence for every finding, and calibration sessions — and report findings as expert judgments, not facts.",
    ],
  },
  {
    title: "Overlapping heuristics",
    body: [
      "Because the ten heuristics compress families of problems, many findings fit more than one. Argue about the fix, not the category: choose a primary heuristic for reporting, list the others, and move on.",
    ],
  },
  {
    title: "Domain-specific heuristics",
    body: [
      "Researchers and practitioners have written heuristic sets for games, voice, medical devices, accessibility and AI. They can surface problems the general ten miss, but are often less rigorously derived. Add them to the ten when the domain needs it, rather than replacing the ten.",
    ],
  },
  {
    title: "Accessibility and WCAG",
    body: [
      "The heuristics were not written for accessibility, though several align with WCAG 2.2 success criteria: status messages (4.1.3) with heuristic 1, consistent navigation and identification (3.2.3, 3.2.4) with heuristic 4, error identification and suggestion (3.3.1, 3.3.3) with heuristic 9, consistent help (3.2.6) with heuristic 10 {{src:w3c-wcag-22}}. A heuristic evaluation is not a conformance evaluation; use WCAG and testing with disabled people for that ([[wcag]]).",
    ],
  },
  {
    title: "Mobile and touch",
    body: [
      "The heuristics apply to mobile, but the problems look different: small targets and accidental taps (error prevention, target size), hidden gestures (recognition rather than recall), interrupted sessions and unreliable networks (system status, error recovery). Evaluate on real devices, one-handed and on slow connections.",
    ],
  },
  {
    title: "Enterprise and expert tools",
    body: [
      "In complex professional software, density is often necessary and experts value speed. Judge minimalism by relevance to expert tasks, weigh flexibility heavily, and include domain experts among the evaluators — Nielsen found evaluators with both usability and domain expertise found more problems {{src:nielsen-1992-heuristic}}.",
    ],
  },
  {
    title: "Voice and conversational interfaces",
    body: [
      "With no screen, system status, recognition and help must be carried by speech and timing: confirming what was understood, offering choices aloud, and recovering from misrecognition. The ten still prompt useful questions, but the design patterns differ substantially from screens.",
    ],
  },
  {
    title: "AI-powered interfaces",
    body: [
      "Probabilistic systems raise problems the ten do not name directly: uncertain outputs, sources, calibrated trust and user oversight. The heuristics still help — status during generation, control over AI actions, recovery from wrong answers — but pair them with human–AI interaction guidance ([[human-ai-interaction]]).",
    ],
  },
  {
    title: "Ethics, privacy and trust",
    body: [
      "An interface can satisfy all ten heuristics and still manipulate people — for example a frictionless, consistent flow that nudges them into sharing data. The heuristics concern usability, not whether a design serves people's interests; evaluate deceptive patterns, consent and privacy separately ([[deceptive-patterns]]).",
    ],
  },
];

export const mistakes: GuideInput["mistakes"] = [
  { mistake: "Treating the heuristics as a checklist to score.", correction: "They are prompts for expert judgment. A screen can pass every item and still fail people; findings need evidence and impact." },
  { mistake: "Evaluating alone.", correction: "One evaluator finds a minority of problems; use several independent evaluators and consolidate {{src:nielsen-molich-1990}}." },
  { mistake: "Reporting violations without impact.", correction: "'Violates heuristic 4' tells a team nothing. Say what happens to users, how often, and how bad it is." },
  { mistake: "Confusing personal taste with usability.", correction: "Prefer evidence: conventions, platform guidelines, research. 'I don't like the colour' is a 0 unless it causes a real problem." },
  { mistake: "Skipping validation.", correction: "Heuristic findings are hypotheses. Test the severe and uncertain ones with users before investing in large changes." },
  { mistake: "Ignoring accessibility because 'the heuristics passed'.", correction: "The heuristics are not WCAG. Run an accessibility evaluation as a separate activity." },
];

export const assessment: GuideInput["assessment"] = {
  intro: "Twelve questions that ask you to apply the heuristics, not recite them. Each answer explains why it is right or wrong.",
  questions: [
    {
      id: "guide-nielsen-a-story",
      kind: "scenario",
      level: "beginner",
      prompt: "A person presses 'Transfer', sees no change, presses again, and two transfers are made. Which heuristic is the primary violation?",
      options: [
        { text: "Visibility of system status — the first press produced no feedback", correct: true, explanation: "The missing feedback caused the repeat; fixing it removes the reason to press again." },
        { text: "Aesthetic and minimalist design", correct: false, explanation: "Nothing irrelevant was shown; something relevant was missing." },
        { text: "Help and documentation", correct: false, explanation: "No help would prevent this; feedback would." },
        { text: "Consistency and standards", correct: false, explanation: "The button may be consistent; it is silent." },
      ],
      explanation: "Error prevention (blocking the second submission) is a strong secondary heuristic.",
    },
    {
      id: "guide-nielsen-a-classify",
      kind: "scenario",
      level: "intermediate",
      prompt: "A form clears every field when one field is invalid, and shows 'Invalid input' at the top. What is the best primary classification and fix?",
      options: [
        { text: "Heuristic 9: keep the input, mark the field and say what is wrong and how to fix it", correct: true, explanation: "Recovery is the core problem: people cannot see what failed and must start again." },
        { text: "Heuristic 8: shorten the form", correct: false, explanation: "Shorter forms help, but the failure is in error handling." },
        { text: "Heuristic 7: add a keyboard shortcut to submit", correct: false, explanation: "Speed does not address lost input or unclear errors." },
        { text: "Heuristic 2: change the label 'Invalid input'", correct: false, explanation: "Wording helps, but the cleared fields and missing location remain." },
      ],
      explanation: "Secondary: heuristic 5 (validate the field earlier) and heuristic 3 (don't destroy work).",
    },
    {
      id: "guide-nielsen-a-confirm",
      kind: "critique",
      level: "advanced",
      prompt: "A design review proposes adding 'Are you sure?' dialogs to every delete action in a notes app to satisfy error prevention. What is the strongest response?",
      options: [
        { text: "Prefer immediate deletion with Undo for reversible deletes; reserve confirmation for permanent, high-cost actions", correct: true, explanation: "Frequent confirmations become automatic clicks and add friction; undo protects without interrupting." },
        { text: "Agree: more confirmation always means fewer errors", correct: false, explanation: "Habituation means people click through confirmations without reading." },
        { text: "Remove delete altogether", correct: false, explanation: "That removes user control." },
        { text: "Add a second confirmation for safety", correct: false, explanation: "That doubles the friction and the habituation." },
      ],
      explanation: "Heuristics 3 and 5 trade off; context decides.",
    },
    {
      id: "guide-nielsen-a-dense",
      kind: "scenario",
      level: "advanced",
      prompt: "Air-traffic controllers use a screen dense with data. A consultant calls it a violation of 'aesthetic and minimalist design'. When is the consultant right?",
      options: [
        { text: "Only if information on screen is irrelevant to the controllers' tasks or competes with critical items", correct: true, explanation: "The heuristic is about relevance, not visual density." },
        { text: "Always — dense screens violate minimalism", correct: false, explanation: "Expert interfaces can be dense and minimalist in the heuristic's sense." },
        { text: "Never — expert tools are exempt", correct: false, explanation: "Irrelevant clutter harms experts too." },
        { text: "When the screen has more than 20 elements", correct: false, explanation: "No count defines the heuristic." },
      ],
      explanation: "Judge minimalism by task relevance.",
    },
    {
      id: "guide-nielsen-a-severity",
      kind: "scenario",
      level: "intermediate",
      prompt: "On checkout, the 'Apply voucher' button sometimes fails silently. It happens to about 1 in 20 customers who use vouchers, and they cannot tell whether the discount was applied. Which severity is most defensible?",
      options: [
        { text: "3 — major: uncommon but high impact on a money task, and people cannot overcome it themselves", correct: true, explanation: "Impact and persistence are high; frequency is moderate within the affected task." },
        { text: "1 — cosmetic", correct: false, explanation: "It affects money and trust, not just appearance." },
        { text: "0 — not a problem, since most customers succeed", correct: false, explanation: "Frequency alone does not decide severity." },
        { text: "2 — minor, because only voucher users are affected", correct: false, explanation: "The impact on those users is serious." },
      ],
      explanation: "Severity weighs frequency, impact and persistence; record the reasoning.",
    },
    {
      id: "guide-nielsen-a-hidden",
      kind: "critique",
      level: "intermediate",
      prompt: "A redesign moves a banking app's four main sections into a hamburger menu 'to look cleaner'. Which pair of heuristics is in tension?",
      options: [
        { text: "Aesthetic and minimalist design versus recognition rather than recall", correct: true, explanation: "Cleaner screens can hide options people need to see." },
        { text: "Help and documentation versus error prevention", correct: false, explanation: "Neither is the main issue." },
        { text: "Flexibility versus help", correct: false, explanation: "Not the central conflict." },
        { text: "System status versus consistency", correct: false, explanation: "Not the central conflict." },
      ],
      explanation: "Remove noise, not needed options.",
    },
    {
      id: "guide-nielsen-a-evaluators",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Why do professionals use several independent evaluators?",
      options: [
        { text: "Each evaluator finds only part of the problems, and different evaluators find different ones", correct: true, explanation: "Aggregating independent evaluators finds substantially more problems." },
        { text: "To vote on whether the design is good", correct: false, explanation: "Evaluation is not a vote." },
        { text: "Because one evaluator's findings are always wrong", correct: false, explanation: "They are incomplete, not wrong." },
        { text: "Because WCAG requires it", correct: false, explanation: "WCAG does not specify heuristic evaluation." },
      ],
      explanation: "This is also why consolidation and independent severity ratings matter.",
    },
    {
      id: "guide-nielsen-a-jargon",
      kind: "scenario",
      level: "beginner",
      prompt: "A travel site's filter is labelled 'Ancillaries'. Users ignore it, and support gets calls asking how to add luggage. Which heuristic applies most directly?",
      options: [
        { text: "Match between the system and the real world", correct: true, explanation: "'Ancillaries' is industry language; customers think 'Bags and seats'." },
        { text: "Flexibility and efficiency of use", correct: false, explanation: "Speed is not the problem." },
        { text: "User control and freedom", correct: false, explanation: "People can leave; they just cannot find the feature." },
        { text: "Error recovery", correct: false, explanation: "No error message is involved." },
      ],
      explanation: "Use the users' words.",
    },
    {
      id: "guide-nielsen-a-shortcut",
      kind: "scenario",
      level: "advanced",
      prompt: "A team adds single-letter keyboard shortcuts to a web app to help experts. What must they also do?",
      options: [
        { text: "Let people turn them off or remap them (or activate them only on focus), and keep every action available through visible controls", correct: true, explanation: "WCAG 2.2 SC 2.1.4 and the principle that accelerators add to, not replace, the default path." },
        { text: "Nothing; shortcuts are optional", correct: false, explanation: "Single-key shortcuts can be triggered by speech input and need controls." },
        { text: "Remove the buttons to reduce clutter", correct: false, explanation: "That breaks the beginner path." },
        { text: "Document them only in the help centre", correct: false, explanation: "Shortcuts should be discoverable in context." },
      ],
      explanation: "Flexibility must not cost accessibility or learnability.",
    },
    {
      id: "guide-nielsen-a-message",
      kind: "critique",
      level: "beginner",
      prompt: "Which payment error message best follows heuristic 9?",
      options: [
        { text: "'We couldn't process your payment. Check your card details or try another method. Your order has not been placed.'", correct: true, explanation: "It says what happened, what to do and what state the order is in." },
        { text: "'Error 402.'", correct: false, explanation: "A code with no meaning or next step." },
        { text: "'You entered invalid data.'", correct: false, explanation: "Blaming and imprecise." },
        { text: "'Something went wrong. Please try later.'", correct: false, explanation: "No cause, no concrete action, no order status." },
      ],
      explanation: "What happened · why · what to do · what happened to my data.",
    },
    {
      id: "guide-nielsen-a-validate",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "Your evaluation found 31 problems. What should happen before the team redesigns the checkout?",
      options: [
        { text: "Test the most severe and uncertain findings with representative users, then prioritise fixes", correct: true, explanation: "Heuristic findings are expert predictions; testing confirms which matter." },
        { text: "Fix all 31 in order of discovery", correct: false, explanation: "Order should follow severity and validation." },
        { text: "Ask the evaluators to vote on a new design", correct: false, explanation: "Design decisions need evidence from users." },
        { text: "Nothing; heuristic findings are proven problems", correct: false, explanation: "They are hypotheses until observed." },
      ],
      explanation: "Inspection and testing complement each other.",
    },
    {
      id: "guide-nielsen-a-ethics",
      kind: "true-false",
      level: "advanced",
      prompt: "If an interface satisfies all ten heuristics, it treats its users ethically.",
      options: [
        { text: "False", correct: true, explanation: "A smooth, consistent flow can still manipulate people, for example into sharing data; ethics needs separate evaluation." },
        { text: "True", correct: false, explanation: "Usability and ethics are different questions." },
      ],
      explanation: "The heuristics concern usability, not whose interests a design serves.",
    },
  ],
  fromEntries: ["nielsen-usability-heuristics-q-origin", "heuristic-evaluation-q-severity", "heuristic-evaluation-q-expertise"],
};

export const references: GuideInput["references"] = [
  { source: "nielsen-ten-heuristics-article", note: "The ten heuristics, unchanged since 1994; 2020 explanations." },
  { source: "molich-nielsen-1990", note: "The original nine dialogue principles." },
  { source: "nielsen-molich-1990", note: "Heuristic evaluation introduced; several evaluators find more problems." },
  { source: "nielsen-1994-heuristics", note: "Factor analysis behind the ten heuristics." },
  { source: "nielsen-1993-response-times", note: "0.1 / 1 / 10 s response-time limits." },
  { source: "nielsen-severity-ratings", note: "0–4 severity scale; frequency, impact, persistence." },
  { source: "moran-gordon-2023", note: "Prepare, evaluate independently, consolidate." },
  { source: "nielsen-1995-problems-found", note: "Single-evaluator detection rates." },
  { source: "nielsen-1992-heuristic", note: "Usability specialists and double experts find more problems." },
  { source: "hertzum-jacobsen-2001", note: "The evaluator effect." },
  { source: "gray-salzman-1998", note: "Validity problems in evaluation-method studies." },
  { source: "nng-match-real-world", note: "Heuristic 2." },
  { source: "nng-user-control-freedom", note: "Heuristic 3." },
  { source: "nng-consistency-standards", note: "Heuristic 4." },
  { source: "nng-slips", note: "Slips (heuristic 5)." },
  { source: "nng-user-mistakes", note: "Mistakes (heuristic 5)." },
  { source: "nng-flexibility-efficiency", note: "Heuristic 7." },
  { source: "nng-aesthetic-minimalist", note: "Heuristic 8." },
  { source: "nng-error-messages", note: "Heuristic 9." },
  { source: "nng-help-documentation", note: "Heuristic 10." },
  { source: "w3c-wcag-22", note: "Success criteria referenced in each chapter." },
];
