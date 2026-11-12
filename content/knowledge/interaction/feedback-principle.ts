import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "feedback-principle",
  slug: "feedback-principle",
  title: "Feedback",
  alternateNames: ["Feedback principle", "Interaction feedback", "System feedback", "Action feedback"],
  summary:
    "Feedback is the information an interface returns about the result of an action — immediate, informative and in proportion to the action — so people can tell whether what they did worked and decide what to do next.",
  definition:
    "In interaction design, **feedback** is the communication of the **result of an action** back to the person who took it {{src:norman-2013}}. Norman treats it as one of the fundamental principles of interaction, alongside affordances, signifiers, constraints, mappings and the conceptual model {{src:norman-2013}}. Feedback closes the loop between doing and knowing: without it people cannot evaluate whether an action succeeded. It is a property of each interaction; [[visibility-of-system-status]] is the related heuristic that asks a whole system to keep people informed in time.",
  primaryType: "concept",
  secondaryTypes: ["principle"],
  domain: "interaction",
  subcategory: "principles",
  tags: ["feedback", "response time", "acknowledgement", "confirmation", "progress", "status messages", "gulf of evaluation"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "UI design", "Human factors", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Explain what feedback is and why people need it to evaluate the result of an action.",
    "Judge feedback by three qualities: immediate, informative and proportionate to the action.",
    "Distinguish the acknowledgement of an action from the confirmation of its outcome, and design both.",
    "Choose channels (visual, auditory, haptic, announced) so feedback reaches everyone, including screen-reader users.",
  ],
  prerequisites: ["gulfs-of-execution-and-evaluation"],

  levels: {
    beginner: {
      explanation: [
        "Every time you act on an interface you ask a silent question: *did that work?* Feedback is the interface's answer. A button that changes as you press it, a message that says 'Jacket added', a counter that goes from 1 to 2 — each tells you what happened because of what you did.",
        "Feedback matters because most of what software does is invisible. You cannot see a request travel to a server or a file being written; you only see what the screen shows you. If it shows nothing, you guess — and people who guess press again, give up, or phone someone.",
        "Good feedback has three qualities. It is **immediate**: it arrives while you still remember what you did. It is **informative**: it says what changed, not just that something happened. It is **proportionate**: a small, routine action gets a small response; only something important interrupts you.",
      ],
      analogy:
        "A light switch with a bulb at the far end of a long corridor. You flip it and, if the bulb is out of sight, you cannot tell whether the light came on. A small indicator on the switch would answer the question where you are standing — that indicator is feedback.",
      everydayExamples: [
        "A keyboard key that clicks and a character that appears as you type it.",
        "A lift button that lights up when pressed.",
        "A payment terminal that beeps and shows 'Approved'.",
        "A basket badge that changes from 1 to 2 after 'Add to basket'.",
      ],
      vocabulary: [
        { term: "Feedback", meaning: "Information returned to a person about the result of their action." },
        { term: "Acknowledgement", meaning: "Feedback that the action was received, such as a pressed button or 'Sending…'." },
        { term: "Confirmation", meaning: "Feedback that the action's outcome happened, such as 'Sent' or 'Payment approved'." },
        { term: "Feedforward", meaning: "Information before an action about what it will do; feedback comes after." },
        { term: "Gulf of evaluation", meaning: "The effort needed to tell from what the system shows whether an action achieved its goal." },
      ],
    },
    intermediate: {
      explanation: [
        "Feedback is the second half of an action. Norman's account of action separates **execution** (working out what to do and doing it) from **evaluation** (perceiving what happened, interpreting it and comparing it with the goal) {{src:norman-2013}}. Feedback is what evaluation works on. When it is missing or ambiguous the gulf of evaluation is wide, even if the action itself was easy ([[gulfs-of-execution-and-evaluation]]).",
        "Norman describes what makes feedback work: it must be **immediate**, it must be **informative**, and it must be **planned and prioritised** — too much feedback can be as unhelpful as too little, because a stream of beeps and messages buries the one that matters {{src:norman-2013}}.",
        "Timing has its own guidance. Miller analysed acceptable response times for different kinds of conversational transactions with computers {{src:miller-1968}}, and Nielsen later summarised widely used limits of about 0.1 s (feels instantaneous), 1 s (flow of thought uninterrupted) and 10 s (attention held) {{src:nielsen-1993-response-times}}. These are practitioner guidance drawn from earlier work, not thresholds measured for every context.",
      ],
      howItWorks: [
        "**Acknowledge, then confirm.** Many actions take longer than the person waits. Good designs answer twice: an immediate acknowledgement that the input was received (the button changes to 'Adding…') and a later confirmation of the outcome ('Jacket added'). Collapsing the two into one late message leaves a silent gap; confirming before the outcome is known is a false answer.",
        "**Feedback shapes perceived time.** Myers found that people strongly preferred percent-done progress indicators during long operations {{src:myers-1985}}, and Harrison and colleagues showed that how a progress bar moves changes how long the same wait feels {{src:harrison-2007-progress-bar}}. Feedback does not make work faster, but it changes how the wait is experienced and whether people interrupt it.",
        "**Feedback and feedforward work as a pair.** Signifiers and labels tell people what an action will do before they act (feedforward); feedback tells them what it did afterwards {{src:norman-2013}}. A clear 'Delete 3 files' button and a '3 files deleted · Undo' message are two halves of one design.",
      ],
      implementation: [
        "Give every control an immediate visible response to input — a pressed or busy state — even when the result will take time.",
        "Put feedback where the action happened (the button, the row, the field) and say what changed in specific words: 'Jacket added', not 'Success'.",
        "Match weight to importance: inline text or a small change for routine actions; a dialog only when the person must decide something.",
        "For waits beyond about a second show progress near the action, and beyond about ten seconds show how much is done and offer Cancel {{src:nielsen-1993-response-times}}.",
        "Do not rely on one sense: pair colour with text or icons [WCAG 2.2 SC 1.4.1 Use of Color, A], and expose messages that do not take focus as status messages [SC 4.1.3 Status Messages, AA] {{src:w3c-wcag-22}}.",
        "Report failures as feedback too: say what did not happen and what the person can do, and keep their input.",
      ],
      scenarios: [
        "**Illustrative.** A shop's 'Add to basket' takes about 1.5 s to reach the server. With no change on the button, people press again and end up with two jackets. Changing the button to 'Adding…' at once, then showing 'Jacket added' beside it and updating the basket count, removes the duplicates without making the request faster.",
        "**Illustrative.** A note-taking app saves silently in the background. People keep pressing Ctrl+S and copying text elsewhere 'to be safe'. A quiet 'Saved 10:42' near the title, announced politely to screen readers, answers the question they were really asking.",
        "**Critique protocol.** For each primary action, record: the acknowledgement (what changes, how fast), the confirmation (what says it worked), the failure message, the channel (visual only? announced?) and whether the weight of the feedback matches the importance of the action.",
      ],
    },
    advanced: {
      explanation: [
        "Feedback operates on **several time scales at once**. An inner loop acknowledges input within a fraction of a second (a pressed state, a character on screen); a middle loop reports progress; an outer loop confirms the outcome, sometimes minutes later and outside the screen (an email, a delivered parcel). Designing feedback means deciding what each loop shows and making sure none of them contradicts another.",
        "Feedback is also how people **detect their own slips**. Norman's analysis of slips — the intention was right but the action went wrong — derives design rules from how such errors arise {{src:norman-1983-design-rules}}; a slip that produces clear, specific feedback can be noticed and undone, while a slip that produces generic or no feedback is discovered late, if at all. This is why specific feedback ('3 files deleted · Undo') supports [[error-recovery]] in a way that 'Done' cannot.",
        "In complex and automated systems the cost of poor feedback grows: when the system acts on its own, people need feedback about what it did and why, not only about what they did. The same qualities apply — timely, informative, prioritised — but the hard design question becomes *which* of many state changes deserve a person's attention.",
        "Feedback must reach people through more than one channel. Visual changes can be missed by screen-reader users unless they are exposed programmatically; colour alone fails people who cannot distinguish it; sound fails in silent mode; haptics are absent on most desktops. Robust feedback is redundant across channels where it matters {{src:w3c-wcag-22}}.",
      ],
      evidence: [
        "Norman's principles are an established theoretical framework in HCI rather than the result of one experiment; their support is the large body of design and evaluation work built on them {{src:norman-1988}} {{src:norman-2013}}.",
        "Specific claims about feedback have their own evidence: Myers (1985) reported a strong preference for percent-done progress indicators in a small study {{src:myers-1985}}; Harrison et al. (2007) found that progress-bar behaviour changed perceived duration {{src:harrison-2007-progress-bar}}. The 0.1 s, 1 s and 10 s limits are a synthesis of Miller (1968) and later work, not a single measurement {{src:nielsen-1993-response-times}} {{src:miller-1968}}.",
      ],
      debates: [
        "**How much feedback is enough?** Norman warns that excessive feedback is itself a design failure {{src:norman-2013}}, yet products accumulate toasts, badges and sounds because each one solves a local problem. There is no general rule for the right amount; it has to be decided per product, ideally with research.",
        "**Optimistic feedback.** Showing the expected result before the system confirms it makes interfaces feel instant but means the feedback is briefly a prediction. Teams disagree on where that is acceptable; the cost of the prediction being wrong is the usual deciding factor.",
      ],
      alternativeModels: [
        "**Control loops.** Engineering describes feedback as the output of a process fed back to adjust its input. In interaction design the 'controller' is a person, so the loop includes perception and interpretation, which is why the same signal can be clear to one person and meaningless to another.",
        "**Visibility of system status** frames the same need as a heuristic for evaluating a whole interface rather than a principle of each interaction ([[visibility-of-system-status]]).",
      ],
    },
  },

  origin: {
    contributors: ["Donald A. Norman", "Robert B. Miller", "Jakob Nielsen"],
    period: "1968 (response time); 1988 (feedback as a design principle); 1993 (response-time limits)",
    problem: "Interactive systems often did their work out of sight and gave people no reliable way to tell whether an action had worked.",
    narrative: [
      "Miller's 1968 analysis of response time in human–computer conversation treated the system's reply as part of the dialogue and asked how long people could wait for it {{src:miller-1968}}.",
      "Norman's *The Psychology of Everyday Things* (1988) made feedback a named principle of design, beside visibility, constraints and mappings, using everyday objects as well as computers {{src:norman-1988}}; the revised edition (2013) places it among the fundamental principles of interaction and adds signifiers {{src:norman-2013}}.",
      "Nielsen's response-time limits (1993) turned the timing question into guidance practitioners still use {{src:nielsen-1993-response-times}}.",
    ],
  },

  application: {
    summary: [
      "Feedback applies to every action a person takes: pressing, typing, dragging, submitting, deleting, speaking. It is designed per control and per flow, and it extends beyond the screen to emails, notifications and physical outcomes.",
    ],
    web: [
      "Pressed and busy states on every control; inline confirmation where the action happened; `role=\"status\"` for messages that do not move focus; errors next to the field that caused them.",
    ],
    mobile: [
      "Touch has no hover, so feedback on press matters more; use the platform's pressed states and, sparingly, haptics — always with a visible equivalent.",
    ],
    enterprise: [
      "Bulk and background operations need feedback that survives navigation: a job list or notification with progress and outcome, not only a message on the page that started them.",
    ],
    services: [
      "Across a service, feedback includes confirmation emails, reference numbers and what happens next, so people do not need to call to find out whether their request arrived.",
    ],
    steps: [
      "List the primary actions in a flow.",
      "For each, specify the acknowledgement, the progress (if any), the confirmation and the failure message.",
      "Set the weight of each by importance and frequency; remove feedback nobody acts on.",
      "Check every message is specific, placed at the action and announced where it does not take focus.",
      "Test with slow network conditions and a screen reader.",
    ],
  },

  whenToUse: [
    "For every action whose result is not instantly and obviously visible.",
    "When designing error handling and undo, which depend on specific feedback about what happened.",
    "In critiques and evaluations, as a first question for each primary action: how does the person know it worked?",
  ],
  whenNotToUse: [
    "As a reason to confirm every trivial action with a message: when the result is itself visible (a character appears, a checkbox ticks), extra feedback is noise.",
    "As a substitute for speed or reliability: feedback about a slow or failing operation is necessary, but it does not fix the operation.",
  ],
  advantages: [
    "Prevents repeated input and duplicate actions.",
    "Lets people notice and recover from their own slips.",
    "Builds trust by making the system's behaviour predictable.",
  ],
  limitations: [
    "The principle says what feedback must achieve, not how much of it a given product needs; that has to be decided with evidence.",
    "Timing guidance is a synthesis from older work and does not fit every context, such as games or real-time control.",
    "Feedback in one channel can exclude people; making it robust across channels takes deliberate work.",
  ],
  misconceptions: [
    {
      myth: "Feedback means showing a success message after every action.",
      reality:
        "Feedback is any information about the result of an action, and often the best feedback is the result itself — the item appearing in the list. Norman warns that too much feedback is as much a failure as too little {{src:norman-2013}}.",
    },
    {
      myth: "Feedback and visibility of system status are the same thing.",
      reality:
        "Feedback is the response to a person's action; visibility of system status is a heuristic that also covers state the person did not cause (a sync running, being offline) and where they are in the product ([[visibility-of-system-status]]).",
    },
  ],

  relations: [
    { target: "visibility-of-system-status", type: "applied-in", note: "Heuristic 1 asks a whole system to provide timely, appropriate feedback about its state." },
    { target: "gulfs-of-execution-and-evaluation", type: "related-to", note: "Feedback is what the person evaluates; poor feedback widens the gulf of evaluation." },
    { target: "signifiers", type: "complementary-to", note: "Signifiers tell people what an action will do before they act; feedback tells them what it did." },
    { target: "error-recovery", type: "applied-in", note: "Specific feedback about what went wrong is the first step of recovery." },
    { target: "doherty-threshold", type: "related-to", note: "Response-time targets decide how quickly feedback must arrive." },
    { target: "interaction-states", type: "applied-in", note: "Pressed, busy, success and error states are how components give feedback." },
  ],

  lab: "feedback-lab",

  practice: {
    dos: [
      { text: "Respond to input at once with a visible change on the control, even when the outcome will take longer.", why: "Feedback must be immediate; a silent delay invites repeated input {{src:norman-2013}} {{src:nielsen-1993-response-times}}.", kind: "industry" },
      { text: "Say what changed, in the words of the task: 'Jacket added', '3 files deleted · Undo'.", why: "Informative feedback lets people evaluate the result and notice slips; generic 'Success' does not {{src:norman-2013}}.", kind: "industry" },
      { text: "Expose messages that do not take focus as status messages, and never signal by colour alone.", why: "WCAG 2.2 SC 4.1.3 Status Messages (AA) and SC 1.4.1 Use of Color (A) {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't confirm an outcome before it has happened ('Saved' while the save is still in flight).", why: "False feedback is worse than none: people act on it and lose work.", kind: "industry" },
      { text: "Don't interrupt routine actions with dialogs or stacked toasts.", why: "Feedback must be prioritised; excessive feedback buries the messages that matter {{src:norman-2013}}.", kind: "context" },
      { text: "Don't rely on sound or haptics alone.", why: "They are missed in silent mode or absent on the device; a visible equivalent is needed.", kind: "industry" },
    ],
    examples: [
      {
        title: "Acknowledge, then confirm",
        language: "ts",
        code: `type AddState = "idle" | "adding" | "added" | "failed";

// <button aria-describedby="basket-msg" aria-busy={state === "adding"}>
//   {state === "adding" ? "Adding…" : "Add to basket"}
// </button>
// <p id="basket-msg" role="status">{message}</p>

async function add(item: Item, set: (s: AddState, msg: string) => void) {
  set("adding", "");                         // acknowledgement: at once
  try {
    const basket = await api.add(item);      // the outcome
    set("added", \`\${item.name} added · \${basket.count} items\`); // confirmation: specific
  } catch {
    set("failed", \`\${item.name} wasn't added. Try again.\`);     // failure is feedback too
  }
}`,
        caption: "The button changes on press; the message names the item and the new count only after the server answers, and is announced without moving focus. `api` and `Item` are illustrative.",
      },
    ],
  },

  exercises: [
    {
      id: "feedback-principle-ex-trace",
      kind: "assignment",
      level: "beginner",
      title: "Trace the answer to 'did that work?'",
      prompt: [
        "Choose three actions in an app you use (send, delete, save). For each, write down what changes on screen immediately, what confirms the outcome and what happens when it fails.",
      ],
      deliverable: "A three-row table: action, acknowledgement, confirmation, failure feedback, and one improvement.",
      criteria: ["Acknowledgement and confirmation recorded separately", "Failure feedback checked, not assumed", "Improvements are specific to the action"],
    },
    {
      id: "feedback-principle-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix the double jacket",
      prompt: [
        "Illustrative case. A shop's 'Add to basket' takes about 1.5 s. The button does not change; after the response a toast says 'Success' at the top of the screen. Many orders contain duplicate items.",
        "Redesign the feedback: acknowledgement, confirmation, failure, placement, wording and announcement.",
      ],
      deliverable: "A short specification of the button and message states with copy.",
      criteria: ["Immediate acknowledgement on the control", "Specific confirmation at the action", "Failure keeps the person's choice", "Announcement specified [WCAG 2.2 SC 4.1.3]"],
      exampleSolution: [
        "Acknowledge on press: the button reads 'Adding…' and ignores further presses while the request is in flight.",
        "Confirm at the action: beside the button, 'Rain jacket (M) added · 2 items', in a `role=\"status\"` element; the basket badge updates.",
        "Fail specifically: 'Rain jacket wasn't added — check your connection and try again', with the size still selected.",
        "Remove the generic top-of-screen toast: it is far from the action and says nothing about what changed {{src:norman-2013}}.",
      ],
    },
    {
      id: "feedback-principle-ex-loops",
      kind: "reflection",
      level: "advanced",
      title: "Design three loops for one action",
      prompt: [
        "For an action whose outcome arrives minutes later (submitting an expense, ordering a prescription), specify the inner loop (input acknowledged), middle loop (progress) and outer loop (outcome, possibly off-screen). State what each loop shows, on which channel, and how you prevent the loops contradicting each other.",
      ],
      deliverable: "A one-page loop specification with channels and failure cases.",
      criteria: ["All three loops specified", "Channels chosen for reach, not only visibility", "Contradictions between loops considered", "Failure in each loop handled"],
    },
  ],

  quiz: [
    {
      id: "feedback-principle-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which is the clearest feedback after someone taps 'Add to basket'?",
      options: [
        { text: "The button shows 'Adding…', then 'Rain jacket added · 2 items' appears beside it", correct: true, explanation: "It acknowledges the tap at once and then says exactly what changed." },
        { text: "A toast saying 'Success' at the top of the screen", correct: false, explanation: "It is far from the action and does not say what changed." },
        { text: "Nothing visible changes; the basket updates on the next page", correct: false, explanation: "People cannot evaluate the action and will often tap again." },
        { text: "A dialog the person must close", correct: false, explanation: "A routine action does not justify interrupting the person." },
      ],
      explanation: "Good feedback is immediate, informative and proportionate.",
    },
    {
      id: "feedback-principle-q-ack",
      kind: "scenario",
      level: "intermediate",
      prompt: "A save takes 3 seconds. The team proposes showing 'Saved' immediately to make the app feel fast. What is the problem?",
      options: [
        { text: "It confirms an outcome that has not happened yet; acknowledge immediately, confirm after the save", correct: true, explanation: "Acknowledgement and confirmation are different answers; giving the second too early is false feedback." },
        { text: "Nothing; feedback should always be instant", correct: false, explanation: "Instant acknowledgement is right; instant confirmation of an unknown outcome is not." },
        { text: "Saves should never show feedback", correct: false, explanation: "People need to know their work is safe." },
        { text: "The message should be a sound instead", correct: false, explanation: "The channel does not fix the false timing." },
      ],
      explanation: "Separate 'we received it' from 'it worked'.",
    },
    {
      id: "feedback-principle-q-slips",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "Why does specific feedback ('3 files deleted · Undo') help with slips more than 'Done'?",
      options: [
        { text: "It lets the person notice that the result differs from what they intended, and act at once", correct: true, explanation: "A slip is a correct intention carried out wrongly; it can only be caught if the feedback shows what actually happened." },
        { text: "It is shorter to read", correct: false, explanation: "It is longer; its value is that it is informative." },
        { text: "It meets a WCAG success criterion that 'Done' fails", correct: false, explanation: "WCAG does not prescribe the wording; the benefit here is about detecting errors." },
        { text: "It prevents the slip from happening", correct: false, explanation: "Feedback comes after the action; prevention is the job of constraints and design before it." },
      ],
      explanation: "Feedback is how people detect their own slips; it must say what actually happened {{src:norman-1983-design-rules}}.",
    },
  ],

  flashcards: [
    { id: "feedback-principle-fc-qualities", front: "Three qualities of good feedback", back: "Immediate · informative · proportionate (planned and prioritised; too much is as bad as too little)." },
    { id: "feedback-principle-fc-two-answers", front: "Acknowledgement vs confirmation", back: "Acknowledgement: 'I received your input' (at once). Confirmation: 'the outcome happened' (when it has)." },
    { id: "feedback-principle-fc-feedforward", front: "Feedforward vs feedback", back: "Feedforward: what an action will do (before). Feedback: what it did (after)." },
    { id: "feedback-principle-fc-gulf", front: "Feedback and the gulf of evaluation", back: "Feedback is what people evaluate; missing or vague feedback widens the gulf of evaluation." },
  ],

  references: [
    { source: "norman-2013", role: "primary", note: "Feedback among the fundamental principles of interaction; its qualities; feedforward; the action cycle." },
    { source: "norman-1988", role: "primary", note: "First edition, where feedback is set out as a design principle." },
    { source: "miller-1968", role: "primary", note: "Response time in human–computer conversational transactions." },
    { source: "myers-1985", role: "primary", note: "Preference for percent-done progress indicators." },
    { source: "harrison-2007-progress-bar", role: "primary", note: "Progress-bar behaviour changes perceived duration." },
    { source: "norman-1983-design-rules", role: "primary", note: "Slips of action and design rules derived from them." },
    { source: "nielsen-1993-response-times", role: "explanatory", note: "The 0.1 s, 1 s and 10 s limits." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.1 Use of Color (A); SC 4.1.3 Status Messages (AA)." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "Feedback is an established principle in HCI from Norman's theory of action, used and tested in design practice for decades rather than derived from one experiment. Specific claims carry their own evidence: progress-indicator preference (Myers 1985, small study), perceived duration (Harrison et al. 2007), and response-time limits that are a synthesis rather than a measurement. Accessibility requirements are WCAG 2.2 success criteria.",

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
  lastVerifiedAt: "2026-11-12",
});
