/**
 * The ten heuristic chapters of the Nielsen guide. Guide-specific teaching
 * (everyday explanation, reasoning, mockups, consequences, accessibility,
 * checklist, distinctions) lives here; analogies, scenarios, practice rules,
 * platform application, misconceptions, quizzes and exercises are read from
 * each heuristic's own entry by slug. Heuristic 2 has no dedicated entry
 * (D-116), so its chapter carries its own content in `own`.
 * All interface examples are illustrative.
 */
import type { GuideInput } from "../../../lib/content/guide";

export const heuristics: GuideInput["heuristics"] = [
  /* ------------------------------------------------------------------ 1 */
  {
    n: 1,
    name: "Visibility of system status",
    entry: "visibility-of-system-status",
    oneLiner: "Never leave people guessing what the system is doing.",
    everyday:
      "Whenever you press, type or wait, the interface should answer: *I heard you*, *I'm working on it*, *it worked* or *it didn't*. Silence is the problem — people fill it with guesses, and the guesses are often wrong.",
    why:
      "Software works out of sight. A person cannot see a request travel to a server, a file being written or a payment being authorised, so the only evidence that anything happened is what the screen shows. Without that evidence, people cannot tell a slow system from a broken one, or a finished action from an ignored one.",
    psychology:
      "Norman's **gulf of evaluation** describes the effort needed to work out whether an action achieved its goal ([[gulfs-of-execution-and-evaluation]]). Feedback narrows that gulf. Timing matters too: Nielsen summarised earlier work by Miller (1968) and Card et al. (1991) as three practical limits — about 0.1 s feels instantaneous, about 1 s keeps the flow of thought, about 10 s is the limit of attention {{src:nielsen-1993-response-times}}. They are design guidance from those studies, not universal technical thresholds.",
    behaviour:
      "When status is missing, people repeat actions (double payments, duplicate posts), abandon tasks they think have failed, reload pages and lose work, or call support. When status is clear, they wait patiently for long operations because they know progress is being made.",
    bad: {
      title: "A Save button that says nothing",
      description: "The person presses Save. The button does not change, no message appears, and the page looks exactly as before. They cannot tell whether their changes were kept.",
      mock: {
        title: "Profile settings",
        elements: [
          { k: "heading", text: "Profile" },
          { k: "field", label: "Display name", value: "Ama Mensah" },
          { k: "field", label: "Email", value: "ama@example.org" },
          { k: "buttons", items: [{ text: "Save" }], mark: 1 },
          { k: "text", text: "(nothing happens after the click)", small: true, mark: 2 },
        ],
        alt: "A profile form with a Save button. After pressing it, the screen is unchanged: no message, no change to the button, no sign that saving started or finished.",
        notes: [
          { n: 1, text: "The button looks the same before, during and after saving." },
          { n: 2, text: "No status at all: people press again or leave unsure." },
        ],
      },
    },
    good: {
      title: "Saving, saved, or failed — always said",
      description: "The button shows 'Saving…' while the request runs; a quiet message then says 'Saved just now', or, on failure, 'Couldn't save. Check your connection and try again' with the edits kept.",
      mock: {
        title: "Profile settings",
        elements: [
          { k: "heading", text: "Profile" },
          { k: "field", label: "Display name", value: "Ama Mensah" },
          { k: "field", label: "Email", value: "ama@example.org" },
          { k: "buttons", items: [{ text: "Saving…", state: "busy" }], mark: 1 },
          { k: "banner", tone: "ok", text: "Saved just now", mark: 2 },
        ],
        alt: "The same profile form. The Save button reads 'Saving…' with a small busy indicator while the request runs, then a green confirmation reads 'Saved just now'.",
        notes: [
          { n: 1, text: "Immediate feedback on the control that was pressed." },
          { n: 2, text: "A clear end state, announced to screen readers as a status message." },
        ],
      },
    },
    demo: "save",
    consequences: [
      "Duplicate actions: repeated presses create double orders, payments or messages.",
      "False failures: people abandon work that actually succeeded, or retry and overwrite it.",
      "False successes: optimistic interfaces that show 'Done' before the server agrees can mislead when the request later fails — the risk of optimistic UI.",
      "Support load and distrust: people stop believing the interface and check in other ways (email receipts, phone calls).",
    ],
    accessibility: [
      "Announce status changes without moving focus by using a status message region (`role=\"status\"`) [WCAG 2.2 SC 4.1.3 Status Messages, AA] {{src:w3c-wcag-22}}.",
      "Do not rely on colour or animation alone: a spinner needs a text label such as 'Saving…', and success needs words, not only a green tick [SC 1.4.1 Use of Color, A].",
      "Long-running animated indicators shown next to other content need a way to pause, stop or hide them if they run longer than five seconds [SC 2.2.2, A].",
    ],
    checklist: [
      "Does every important action receive visible feedback within about a second?",
      "Can people see when a process is still running, and roughly how long it will take?",
      "Are success and failure states both designed and clearly different?",
      "Can people tell whether their changes were saved?",
      "Are long operations shown with progress, and can they continue in the background?",
      "Are status changes announced to screen-reader users without moving focus?",
    ],
    related: [
      { n: 9, difference: "Heuristic 1 covers all status, including normal progress and success. Heuristic 9 is specifically about the message once something has gone wrong." },
      { n: 5, difference: "Clear status prevents some errors (no double submission), but preventing errors by design is heuristic 5." },
    ],
    check: "visibility-of-system-status-q-limits",
    exercise: "visibility-of-system-status-ex-correct",
  },

  /* ------------------------------------------------------------------ 2 */
  {
    n: 2,
    name: "Match between the system and the real world",
    addressedIn: "nielsen-usability-heuristics",
    oneLiner: "Use the words, order and conventions people already know.",
    everyday:
      "An interface should talk the way its users talk and arrange things the way they expect. If a banking app says 'Execute ledger reconciliation' when people think 'check my transactions', every screen asks them to translate — and translation is where mistakes happen.",
    why:
      "Systems are built by teams who use internal names for things: database fields, departments, product codes. Those names leak into the interface. NN/g describes the heuristic as speaking the users' language with familiar words, phrases and concepts rather than system-oriented terms, and following real-world conventions so information appears in a natural, logical order {{src:nng-match-real-world}}.",
    psychology:
      "People approach a new interface with **mental models** built from the rest of their lives ([[mental-models]]). When labels, order and metaphors fit those models, they can predict what will happen; when they do not, people must stop and reason. Familiar words are also recognised faster than unfamiliar ones, so jargon adds reading effort before any decision is made.",
    behaviour:
      "Mismatched language makes people hesitate, guess, open the wrong section, or give up and search elsewhere. Matched language lets them move without thinking about the interface at all — attention stays on their task.",
    bad: {
      title: "System language on a banking screen",
      description: "Menu items expose the bank's internal process names. A customer who wants to see last week's payments has to guess which item that is.",
      mock: {
        title: "Online banking",
        elements: [
          { k: "nav", items: ["Ledger ops", "Instrument mgmt", "Counterparties"], active: 0, mark: 1 },
          { k: "heading", text: "Execute ledger reconciliation" },
          { k: "field", label: "Posting window (UTC)", placeholder: "T-7 → T", mark: 2 },
          { k: "buttons", items: [{ text: "Run" }] },
        ],
        alt: "A banking screen whose menu reads Ledger ops, Instrument mgmt and Counterparties, with a page titled 'Execute ledger reconciliation' and a field labelled 'Posting window (UTC)' showing 'T-7 → T'.",
        notes: [
          { n: 1, text: "Internal department names instead of customer tasks." },
          { n: 2, text: "Technical notation for a simple date range." },
        ],
      },
    },
    good: {
      title: "The customer's words and order",
      description: "The same functions named after customer tasks, with dates written as people say them. Specialist terms remain available where a specialist audience needs them.",
      mock: {
        title: "Online banking",
        elements: [
          { k: "nav", items: ["Accounts", "Payments", "Payees"], active: 0, mark: 1 },
          { k: "heading", text: "Review your transactions" },
          { k: "chips", items: ["Last 7 days", "This month", "Custom dates"], active: 0, mark: 2 },
          { k: "list", items: ["Mon 9 Nov · Grocer · –£42.10", "Sun 8 Nov · Salary · +£2,140.00"] },
        ],
        alt: "The same bank with a menu of Accounts, Payments and Payees, a page titled 'Review your transactions', date choices 'Last 7 days', 'This month' and 'Custom dates', and a list of recent transactions in date order.",
        notes: [
          { n: 1, text: "Menu named after what customers want to do." },
          { n: 2, text: "Plain date choices in the order people use them." },
        ],
      },
    },
    consequences: [
      "People cannot find features that exist, because they are named after the organisation rather than the task.",
      "Misunderstood labels cause mistakes — 'Archive' read as 'Delete', or a 'Close' button that cancels an order.",
      "Icons and metaphors from one culture can mean something else in another (a mailbox, a hand gesture, a colour).",
    ],
    accessibility: [
      "Plain, familiar words help everyone, and especially people with cognitive or learning disabilities and people reading in a second language.",
      "Expand abbreviations and acronyms the first time they appear, or provide a way to find their meaning (WCAG 2.2 SC 3.1.4 Abbreviations, AAA) {{src:w3c-wcag-22}}.",
      "Visible labels and their accessible names should match, so people who speak commands to voice control can say what they see [SC 2.5.3 Label in Name, A].",
    ],
    checklist: [
      "Are labels written in the users' words, verified with research or search logs?",
      "Is information ordered the way people think about the task (by date, by step, by importance to them)?",
      "Are specialist terms used only for audiences who use them, and explained where needed?",
      "Do icons and metaphors carry the same meaning for your users' cultures and contexts?",
      "Are units, formats and conventions local (dates, currency, measurements)?",
    ],
    related: [
      { n: 6, difference: "Heuristic 2 is about *what* things are called and how they are ordered; heuristic 6 is about whether options are *visible* so people need not remember them. A familiar word hidden in a menu still has to be recalled." },
      { n: 4, difference: "External consistency (heuristic 4) asks you to follow platform and industry conventions; heuristic 2 asks you to follow the users' real-world conventions and language. They often agree, but a domain's language can differ from generic platform wording." },
    ],
    own: {
      analogy:
        "A good interpreter does not translate word by word; they say what the listener would say. An interface that matches the real world is the interpreter between the system's internals and the person's goals.",
      scenario:
        "**Illustrative.** A hospital booking system lists clinics by internal codes ('OPD-ENT-2'). Patients ringing to book cannot tell which clinic treats ear problems. Renaming entries to 'Ear, nose and throat clinic (outpatients)', keeping the code in small text for staff, removes most of the calls asking which code to choose.",
      dos: [
        "Name navigation and actions after users' tasks, found through research, search logs or support tickets.",
        "Present information in the order people think about it — the steps of a journey, the dates of a trip, the items in a basket.",
        "Keep specialist terms for specialist audiences, and explain them in place when a mixed audience uses the screen.",
      ],
      donts: [
        "Don't expose database fields, internal team names or codes as labels.",
        "Don't assume an icon or metaphor is universal; test it with the people who will use it.",
        "Don't 'simplify' expert tools by removing the precise terms their users rely on — matching the real world means *their* real world.",
      ],
      implementation: [
        "Collect the words users actually use (interviews, search queries, support tickets) and keep a product glossary.",
        "Run a terminology review on every new screen: replace system terms with task terms, or explain them.",
        "Localise formats (dates, currency, units, names) rather than translating words alone.",
        "Use card sorting or tree testing to check that labels and groupings match how people think ([[card-sorting]]).",
      ],
      web: ["Write link and button labels as the task ('Track my parcel'), not the system object ('Shipment status query')."],
      mobile: ["Follow platform wording for common actions (Share, Delete, Done) so labels match what people see in every other app."],
      enterprise: ["Use the domain's own vocabulary — clinicians, accountants and engineers expect precise terms — but hide implementation names such as table or service identifiers."],
      mistakes: [
        { myth: "Matching the real world means avoiding all technical terms.", reality: "It means using the users' terms. For a radiologist, 'DICOM series' *is* the real world; for a patient it is jargon." },
        { myth: "A realistic skeuomorphic look is what this heuristic asks for.", reality: "It is about language, order and conventions. A flat interface can match the real world; a leather-textured one can still use system jargon." },
      ],
      quiz: {
        id: "guide-nielsen-h2-q-match",
        kind: "scenario",
        level: "intermediate",
        prompt: "An online pharmacy's checkout asks for 'NHS number (CHI/H&C if applicable)'. Many customers stop at this step. Which change best applies heuristic 2?",
        options: [
          { text: "Ask 'Do you have an NHS number? (optional)', explain where to find it, and accept the regional formats without naming them", correct: true, explanation: "It uses the customer's language and keeps the precise formats working behind the scenes." },
          { text: "Make the field mandatory so data is complete", correct: false, explanation: "That increases abandonment and does not fix the unfamiliar wording." },
          { text: "Move the field to a later step", correct: false, explanation: "The wording problem remains wherever it appears." },
          { text: "Add a tooltip that repeats the same acronyms", correct: false, explanation: "Help that uses the same jargon does not help." },
        ],
        explanation: "Speak the users' language; keep system precision behind the scenes.",
      },
      exercise: {
        id: "guide-nielsen-h2-ex-rename",
        kind: "critique",
        level: "intermediate",
        title: "Rename a system-speak screen",
        prompt: [
          "Take a screen from a product you use (or your own) and list every label, heading and button. Mark each one that uses internal, technical or unexplained terms. Rewrite them in the users' words and reorder the content the way users think about the task.",
        ],
        deliverable: "A before/after label table and a one-paragraph rationale.",
        criteria: ["Every system term identified", "Rewrites use the users' words", "Order follows the users' task", "Specialist terms kept where the audience needs them"],
      },
    },
  },

  /* ------------------------------------------------------------------ 3 */
  {
    n: 3,
    name: "User control and freedom",
    entry: "user-control-and-freedom",
    oneLiner: "Give people a clearly marked way out — and a way back.",
    everyday:
      "Everyone taps the wrong thing sometimes. A usable interface lets you undo, cancel, go back or close without penalty, so trying something never feels dangerous.",
    why:
      "People explore interfaces to learn them, and they make slips while doing it. If every action is permanent, exploring becomes risky and people slow down or avoid features. NN/g frames the heuristic around a clearly marked 'emergency exit' for unwanted states {{src:nng-user-control-freedom}}.",
    psychology:
      "A sense of control lowers anxiety and supports learning by trial. **Slips** — the right intention carried out wrongly, such as tapping the button next to the one you meant — are common and expected ([[error-prevention]]). Reversibility turns a slip from a loss into a moment's correction.",
    behaviour:
      "With undo and clear exits, people act quickly and recover silently. Without them, they hesitate before every action, hunt for a way out of modal dialogs, or close the whole app to escape a state they did not want.",
    bad: {
      title: "Delete means gone",
      description: "A swipe or a single click removes a saved address with no confirmation and no undo. The person meant to edit it.",
      mock: {
        title: "Saved addresses",
        device: "mobile",
        elements: [
          { k: "heading", text: "Saved addresses" },
          { k: "list", items: ["Home · 14 Elm Road", "Work · 2 Market Street"], mark: 1 },
          { k: "text", text: "Address deleted.", tone: "error", mark: 2 },
        ],
        alt: "A mobile list of saved addresses after one was deleted by accident. A message says 'Address deleted.' with no way to undo it.",
        notes: [
          { n: 1, text: "Edit and delete sit close together; a slip is easy." },
          { n: 2, text: "The message reports the loss but offers no way back." },
        ],
      },
    },
    good: {
      title: "Act now, undo for a while",
      description: "The address disappears at once, and a message offers Undo for several seconds. Permanent removal of something valuable uses a separate, clearly labelled step.",
      mock: {
        title: "Saved addresses",
        device: "mobile",
        elements: [
          { k: "heading", text: "Saved addresses" },
          { k: "list", items: ["Work · 2 Market Street"] },
          { k: "toast", text: "Home address removed", action: "Undo", mark: 1 },
          { k: "buttons", items: [{ text: "Add address", variant: "secondary" }] },
        ],
        alt: "The same mobile list after deleting the home address. A message at the bottom reads 'Home address removed' with an Undo action.",
        notes: [{ n: 1, text: "Undo is visible and reachable by keyboard and screen reader, and stays long enough to use." }],
      },
    },
    demo: "undo",
    consequences: [
      "Lost data from slips that could have been reversed.",
      "People trapped in flows (wizards without Back, modals without Close) abandon the task or the product.",
      "Over-used confirmation dialogs train people to click 'Yes' without reading — then real mistakes get through.",
    ],
    accessibility: [
      "Undo controls in temporary messages must be reachable by keyboard and stay long enough to use, or the time limit must be adjustable [WCAG 2.2 SC 2.2.1 Timing Adjustable, A] {{src:w3c-wcag-22}}.",
      "Dialogs must close with Escape and return focus to where it was; no keyboard trap [SC 2.1.2 No Keyboard Trap, A].",
      "For legal, financial or data-changing submissions, offer reversal, checking or confirmation [SC 3.3.4 Error Prevention (Legal, Financial, Data), AA].",
    ],
    checklist: [
      "Can every destructive or consequential action be undone, or is it confirmed?",
      "Does every flow have Back and Cancel, and does every dialog have a visible Close?",
      "Does Escape close overlays and return focus to the trigger?",
      "Is Undo offered instead of a confirmation where the action is reversible?",
      "Are labels specific ('Discard draft', not 'OK')?",
    ],
    related: [
      { n: 5, difference: "Heuristic 5 stops the mistake before it happens; heuristic 3 lets people reverse it afterwards. Undo is often the better choice than a confirmation that interrupts every time." },
      { n: 9, difference: "Heuristic 9 helps people understand and fix an error the system reports; heuristic 3 lets them leave or reverse any state, error or not." },
    ],
    check: "user-control-and-freedom-q-undo",
    exercise: "user-control-and-freedom-ex-correct",
  },

  /* ------------------------------------------------------------------ 4 */
  {
    n: 4,
    name: "Consistency and standards",
    entry: "consistency-principle",
    oneLiner: "Same meaning, same look, same behaviour — here and elsewhere.",
    everyday:
      "If a blue button saves on one page, it should save on every page. If every other app puts search at the top, yours probably should too. Consistency means people learn something once and use it everywhere.",
    why:
      "Every difference between two similar things forces people to ask whether the difference means something. Internal consistency (within your product) and external consistency (with platforms and products people already use) both reduce that question. NN/g notes that users spend most of their time on other sites and apps, so they bring expectations with them {{src:nng-consistency-standards}} — the idea popularised as [[jakobs-law|Jakob's Law]].",
    psychology:
      "Consistent patterns become **schemas**: once learnt, they are recognised and used with little conscious effort. Inconsistency breaks that automaticity and turns routine actions back into problem solving. It also undermines trust — people wonder whether the different-looking button is broken or dangerous.",
    behaviour:
      "Consistent interfaces feel predictable; people move quickly and transfer skills between screens. Inconsistent ones cause hesitation, misclicks on look-alike controls, and missed actions styled differently from the rest.",
    bad: {
      title: "Three buttons for one action",
      description: "The same primary action — continuing to the next step — appears as a dark button, a text link and an outlined button on three screens, in different positions and with different words.",
      mock: {
        title: "Checkout steps",
        elements: [
          { k: "text", text: "Step 1 · Delivery", small: true },
          { k: "buttons", items: [{ text: "Continue" }], mark: 1 },
          { k: "divider" },
          { k: "text", text: "Step 2 · Payment", small: true },
          { k: "buttons", items: [{ text: "Proceed ›", variant: "link" }], mark: 2 },
          { k: "divider" },
          { k: "text", text: "Step 3 · Review", small: true },
          { k: "buttons", items: [{ text: "Next", variant: "secondary" }], mark: 3 },
        ],
        alt: "Three checkout steps where the action to move forward is a dark 'Continue' button, then a text link 'Proceed', then an outlined 'Next' button, each in a different position.",
        notes: [
          { n: 1, text: "Primary button." },
          { n: 2, text: "Same action as a link with a different word." },
          { n: 3, text: "Same action as a secondary-style button — it now looks optional." },
        ],
      },
    },
    good: {
      title: "One component, one word, one place",
      description: "Every step uses the same primary button, the same verb pattern and the same position, from the design system.",
      mock: {
        title: "Checkout steps",
        elements: [
          { k: "text", text: "Step 1 · Delivery", small: true },
          { k: "buttons", items: [{ text: "Continue to payment" }, { text: "Back", variant: "ghost" }], mark: 1 },
          { k: "divider" },
          { k: "text", text: "Step 2 · Payment", small: true },
          { k: "buttons", items: [{ text: "Continue to review" }, { text: "Back", variant: "ghost" }] },
          { k: "divider" },
          { k: "text", text: "Step 3 · Review", small: true },
          { k: "buttons", items: [{ text: "Place order" }, { text: "Back", variant: "ghost" }], mark: 2 },
        ],
        alt: "The same three steps with an identical dark primary button in the same position on each, labelled 'Continue to payment', 'Continue to review' and finally 'Place order', each with a quiet Back button.",
        notes: [
          { n: 1, text: "Same component and position on every step." },
          { n: 2, text: "Different label only where the action really differs." },
        ],
      },
    },
    consequences: [
      "People miss actions that look different from the pattern they learnt.",
      "Look-alike controls with different behaviour cause errors (a 'Close' that deletes).",
      "Every inconsistency becomes a support question and a design-review argument.",
    ],
    accessibility: [
      "Navigation repeated on several pages must appear in the same relative order [WCAG 2.2 SC 3.2.3 Consistent Navigation, AA] {{src:w3c-wcag-22}}.",
      "Components with the same function must be identified consistently — same name, same icon [SC 3.2.4 Consistent Identification, AA].",
      "Help mechanisms repeated across pages must be in the same relative place [SC 3.2.6 Consistent Help, A].",
    ],
    checklist: [
      "Does each action use the same component, label and position everywhere?",
      "Do icons and words mean the same thing on every screen?",
      "Does the product follow platform conventions people know from other apps?",
      "Is navigation in the same order on every page?",
      "Where you break a convention, is there a user need that justifies it?",
    ],
    related: [
      { n: 7, difference: "Heuristic 4 serves predictability for everyone; heuristic 7 adds accelerators for experts. Good accelerators are consistent too — the same shortcut does the same thing everywhere." },
      { n: 2, difference: "External consistency follows platform and industry conventions; heuristic 2 follows the users' real-world language. When they conflict, the users' task usually wins." },
    ],
    check: "consistency-principle-q-layers",
    exercise: "consistency-principle-ex-correct",
  },

  /* ------------------------------------------------------------------ 5 */
  {
    n: 5,
    name: "Error prevention",
    entry: "error-prevention",
    oneLiner: "Design the mistake out instead of explaining it afterwards.",
    everyday:
      "A good error message is useful, but a design where the error cannot happen is better. A date picker that does not let you pick a date in the past is kinder than a form that rejects it after you submit.",
    why:
      "Every error costs time and confidence, and some are costly in money or data. Prevention removes the cost entirely. Nielsen's own wording prefers eliminating error-prone conditions, or checking for them and asking for confirmation, over good error messages {{src:nielsen-ten-heuristics-article}}.",
    psychology:
      "Errors come in two kinds. **Slips** are the right intention done wrongly (typing a digit twice); they are prevented with constraints, forgiving formats and good defaults. **Mistakes** are wrong intentions built on a wrong understanding (choosing the wrong plan); they are prevented with clearer information before the decision {{src:nng-slips}} {{src:nng-user-mistakes}}.",
    behaviour:
      "Where errors are prevented, people move through forms and flows without interruption. Where they are not, people learn to distrust each step, re-check everything, or abandon after the second rejection.",
    bad: {
      title: "Accepts anything, rejects later",
      description: "A booking form takes a free-text date. It accepts '31/02' and a date in the past, and only says something is wrong after the whole form is submitted.",
      mock: {
        title: "Book a study room",
        elements: [
          { k: "field", label: "Date", value: "31/02/2026", mark: 1 },
          { k: "field", label: "Time", value: "25:00" },
          { k: "buttons", items: [{ text: "Book room" }] },
          { k: "banner", tone: "error", text: "Booking failed. Please check the form.", mark: 2 },
        ],
        alt: "A booking form with a free-text date field containing 31/02/2026 and a time of 25:00. After submitting, a banner says 'Booking failed. Please check the form.'",
        notes: [
          { n: 1, text: "Impossible values are accepted." },
          { n: 2, text: "The problem appears only after submission, without saying which field." },
        ],
      },
    },
    good: {
      title: "Only valid choices are possible",
      description: "The date picker shows available days and disables the rest, explaining why. Times are chosen from open slots, so impossible bookings cannot be made.",
      mock: {
        title: "Book a study room",
        elements: [
          { k: "field", label: "Date", value: "Thu 12 Nov", hint: "Rooms can be booked up to 14 days ahead. Past dates are unavailable.", mark: 1 },
          { k: "chips", items: ["10:00", "11:00", "14:00", "16:00"], active: 2, mark: 2 },
          { k: "buttons", items: [{ text: "Book room for 14:00" }] },
        ],
        alt: "The same booking form with a date picker set to Thursday 12 November and a hint that rooms can be booked up to 14 days ahead. Available times are shown as choices — 10:00, 11:00, 14:00, 16:00 — with 14:00 selected.",
        notes: [
          { n: 1, text: "Constraints and the reason for them are shown before the choice." },
          { n: 2, text: "Choosing from valid options removes typing errors." },
        ],
      },
    },
    demo: "date",
    consequences: [
      "Wasted time re-entering data after late rejection.",
      "Costly irreversible errors: wrong payee, wrong date, deleted data.",
      "Over-zealous validation (errors shown while someone is still typing) is a failure too — it interrupts and blames people for unfinished input.",
    ],
    accessibility: [
      "Explain input constraints in visible text before entry, not only in placeholder text or after an error [WCAG 2.2 SC 3.3.2 Labels or Instructions, A] {{src:w3c-wcag-22}}.",
      "Identify the purpose of common fields so browsers can autofill them, which prevents typing errors [SC 1.3.5 Identify Input Purpose, AA].",
      "Do not ask people to re-enter information they already gave in the same process [SC 3.3.7 Redundant Entry, A].",
    ],
    checklist: [
      "Are impossible or invalid choices removed or disabled, with the reason shown?",
      "Are defaults safe and likely to be correct?",
      "Are formats forgiving (spaces in card numbers, different date separators)?",
      "Is validation timed well — after a field is left, not while typing?",
      "Are consequential actions confirmed with specific wording, or made reversible?",
    ],
    related: [
      { n: 9, difference: "Heuristic 5 acts before the error; heuristic 9 helps after it. Prefer prevention, but always design recovery for the errors you cannot prevent." },
      { n: 3, difference: "Undo (heuristic 3) is often better than a confirmation (heuristic 5) for reversible actions: it does not interrupt, and it works after the fact." },
    ],
    check: "error-prevention-q-choose",
    exercise: "error-prevention-ex-correct",
  },

  /* ------------------------------------------------------------------ 6 */
  {
    n: 6,
    name: "Recognition rather than recall",
    entry: "recognition-over-recall",
    oneLiner: "Show the options; don't make people remember them.",
    everyday:
      "Picking a face from a line-up is easier than describing it from memory. Interfaces should work the same way: show recent items, visible choices and the information people need, instead of asking them to remember it from another screen.",
    why:
      "Memory is limited and fragile, and every item someone has to hold in mind competes with the task itself. Making options and information visible moves the burden from the person's head to the screen, where it costs nothing to keep.",
    psychology:
      "Recognition uses cues to retrieve information; recall has to generate it unaided, which is harder and less reliable. Working memory holds only a few items at once ([[working-memory-model]], [[cognitive-load-theory]]), so interfaces that require recall consume capacity that the task needs.",
    behaviour:
      "When people must recall, they write things down, switch between tabs to copy details, make transcription errors, or give up. When the interface supports recognition, they choose from what they see and keep going.",
    bad: {
      title: "Remember the code from the other page",
      description: "To request a replacement part, a technician must type a product code that was shown on a previous page and is no longer visible.",
      mock: {
        title: "Request a replacement",
        elements: [
          { k: "heading", text: "Replacement request" },
          { k: "field", label: "Product code", placeholder: "e.g. XR-2200-B-17", mark: 1 },
          { k: "field", label: "Quantity", value: "1" },
          { k: "buttons", items: [{ text: "Submit request" }] },
        ],
        alt: "A replacement request form asking for a product code such as XR-2200-B-17 in an empty text field, with no way to see or choose the product here.",
        notes: [{ n: 1, text: "The code is required but nowhere on this screen; people must remember or copy it." }],
      },
    },
    good: {
      title: "Choose from what's in front of you",
      description: "The products from the current job are listed with names, images and codes. The technician selects one; recent choices appear first.",
      mock: {
        title: "Request a replacement",
        elements: [
          { k: "heading", text: "Replacement request" },
          { k: "text", text: "Parts on this job", small: true },
          { k: "list", items: ["Filter cartridge · XR-2200-B-17", "Pump seal · XR-2200-S-04"], checks: true, mark: 1 },
          { k: "chips", items: ["Recent: Valve kit", "Recent: Gasket set"], mark: 2 },
          { k: "buttons", items: [{ text: "Request selected part" }] },
        ],
        alt: "The same request form listing the parts on the current job with names and codes and selection boxes, plus chips for recently requested parts.",
        notes: [
          { n: 1, text: "Relevant options visible in context." },
          { n: 2, text: "Recent items shortcut repeated work." },
        ],
      },
    },
    consequences: [
      "Transcription errors when people copy codes, numbers or names between screens.",
      "Hidden features remain unused because nothing reminds people they exist.",
      "Overloaded memory leads to slower work and more mistakes later in the task.",
    ],
    accessibility: [
      "Do not require people to remember or transcribe information to log in; allow paste and password managers, or offer another method [WCAG 2.2 SC 3.3.8 Accessible Authentication (Minimum), AA] {{src:w3c-wcag-22}}.",
      "Keep previously entered information available instead of asking again [SC 3.3.7 Redundant Entry, A].",
      "Visible labels (not placeholder-only fields) keep instructions on screen while people type [SC 3.3.2, A].",
    ],
    checklist: [
      "Is information needed for a step visible on that step?",
      "Are choices offered (menus, lists, recent items, autocomplete) instead of blank fields where possible?",
      "Are labels visible while people type, not only placeholders?",
      "Can people paste, autofill and use password managers?",
      "Do hidden menus hide anything people need often?",
    ],
    related: [
      { n: 8, difference: "Heuristic 8 removes what is irrelevant; heuristic 6 keeps what is relevant visible. Minimalism that hides needed options trades one problem for another." },
      { n: 2, difference: "Heuristic 2 makes labels familiar; heuristic 6 makes them visible. People need both to choose without thinking." },
    ],
    check: "recognition-over-recall-q-similar",
    exercise: "recognition-over-recall-ex-audit",
  },

  /* ------------------------------------------------------------------ 7 */
  {
    n: 7,
    name: "Flexibility and efficiency of use",
    entry: "flexibility-and-efficiency-of-use",
    oneLiner: "Let experts go faster without making beginners lost.",
    everyday:
      "The first time you use a tool you want obvious buttons. The hundredth time you want a shortcut. A flexible interface offers both: a clear default path, and faster routes for people who repeat the task.",
    why:
      "Products serve people at different stages of skill, and repeated tasks multiply small inefficiencies. NN/g describes accelerators — shortcuts, gestures, bulk actions, saved preferences — that speed up frequent users and may be unseen by novices {{src:nng-flexibility-efficiency}}.",
    psychology:
      "With practice, people move from deliberate step-by-step use to fluent, automatic use. Interfaces that only support the deliberate stage cap expert speed; time saved per action matters when an action is repeated hundreds of times a day ([[keystroke-level-model]]).",
    behaviour:
      "Without accelerators, experienced users resent the product and invent workarounds (spreadsheets, scripts). With well-designed accelerators that are discoverable, people graduate to them naturally — and beginners are never forced to learn them.",
    bad: {
      title: "Ten identical actions, one at a time",
      description: "A librarian must mark ten returned books as checked in, opening each record and pressing the same button ten times.",
      mock: {
        title: "Returns",
        elements: [
          { k: "heading", text: "Returned today (10)" },
          { k: "list", items: ["Middlemarch · Check in ›", "Persuasion · Check in ›", "Villette · Check in ›"], mark: 1 },
          { k: "text", text: "… 7 more, each opened separately", small: true },
        ],
        alt: "A list of ten returned books where each must be opened and checked in individually.",
        notes: [{ n: 1, text: "No way to act on several items at once." }],
      },
    },
    good: {
      title: "Select many, act once — default path unchanged",
      description: "Checkboxes and a 'Check in selected' action handle the batch; the single-item path still works the same for occasional users. A keyboard shortcut is shown next to the action.",
      mock: {
        title: "Returns",
        elements: [
          { k: "heading", text: "Returned today (10)" },
          { k: "list", items: ["Middlemarch", "Persuasion", "Villette"], checks: true, mark: 1 },
          { k: "buttons", items: [{ text: "Check in 10 selected" }, { text: "Select all", variant: "ghost" }], mark: 2 },
          { k: "text", text: "Tip: press C to check in the selected books", small: true, mark: 3 },
        ],
        alt: "The same list with selection boxes, a 'Check in 10 selected' button, a Select all option and a hint that pressing C checks in the selected books.",
        notes: [
          { n: 1, text: "Selection adds a fast path without removing the slow one." },
          { n: 2, text: "Bulk action labelled with its count." },
          { n: 3, text: "The shortcut is discoverable where it is used." },
        ],
      },
    },
    consequences: [
      "Expert users waste time and look for alternatives.",
      "Hidden, undocumented shortcuts help no one and can conflict with assistive technology.",
      "Bad 'flexibility' — endless settings — moves design decisions onto users.",
    ],
    accessibility: [
      "Single-character shortcuts must be possible to turn off or remap, or only active when the relevant component has focus [WCAG 2.2 SC 2.1.4 Character Key Shortcuts, A] {{src:w3c-wcag-22}}.",
      "Everything a gesture or shortcut does must also be possible through a visible control [SC 2.5.1 Pointer Gestures, A; SC 2.1.1 Keyboard, A].",
      "Show shortcuts in menus and tooltips so they can be discovered without documentation.",
    ],
    checklist: [
      "Which tasks are repeated most often, and do they have a faster path?",
      "Are accelerators discoverable from the slow path (shown in menus, tooltips)?",
      "Does the default path stay simple for beginners?",
      "Can shortcuts be turned off or remapped?",
      "Do bulk actions say how many items they affect, and can they be undone?",
    ],
    related: [
      { n: 4, difference: "Accelerators must be consistent (heuristic 4) to be learnable; flexibility must never break the shared default behaviour." },
      { n: 8, difference: "Advanced options belong out of the default view (heuristic 8), but reachable when needed (heuristic 7) — progressive disclosure serves both." },
    ],
    check: "flexibility-and-efficiency-of-use-q-discover",
    exercise: "flexibility-and-efficiency-of-use-ex-correct",
  },

  /* ------------------------------------------------------------------ 8 */
  {
    n: 8,
    name: "Aesthetic and minimalist design",
    entry: "aesthetic-and-minimalist-design",
    oneLiner: "Every element you add competes with the ones that matter.",
    everyday:
      "This heuristic is not about making things look sparse or pretty. It is about relevance: each extra word, banner or metric takes attention away from what people came to do. Keep what helps the task; remove or defer the rest.",
    why:
      "Attention is limited, and visual competition is not neutral — irrelevant elements slow people down and can hide the important ones. NN/g stresses that the heuristic is about keeping content and design focused on essentials, not about flat design {{src:nng-aesthetic-minimalist}}.",
    psychology:
      "Visual search slows as the number of competing items grows, and salient but irrelevant items capture attention first. Clear [[visual-hierarchy]] directs the eye to what matters. Removing noise lowers extraneous cognitive load, freeing capacity for the task ([[cognitive-load-theory]]).",
    behaviour:
      "In cluttered interfaces people miss key information, scan instead of read, and ignore banners entirely ('banner blindness'). In focused interfaces they find the next step quickly and trust that what is shown matters.",
    bad: {
      title: "A dashboard that shows everything",
      description: "Twelve equal-weight metrics, three promotional banners and a notifications strip compete for attention. The one number the manager needs — overdue items — is lost.",
      mock: {
        title: "Branch dashboard",
        elements: [
          { k: "banner", tone: "info", text: "New! Try our updated reports module", action: "Learn more" },
          { k: "banner", tone: "warn", text: "Scheduled maintenance Saturday 02:00–04:00" },
          { k: "metrics", items: [{ label: "Visits", value: "1,204" }, { label: "Logins", value: "389" }, { label: "Page views", value: "8,112" }, { label: "Avg session", value: "4m12s" }, { label: "Overdue", value: "37" }, { label: "Bounce", value: "41%" }], mark: 1 },
          { k: "chips", items: ["12 notifications", "3 tips", "Survey"], mark: 2 },
        ],
        alt: "A dashboard with two banners, six equally weighted metrics including Visits, Logins, Page views, Average session, Overdue and Bounce rate, and chips for notifications, tips and a survey.",
        notes: [
          { n: 1, text: "The metric that drives today's work (Overdue 37) has the same weight as vanity metrics." },
          { n: 2, text: "Notifications and promotions compete with the task." },
        ],
      },
    },
    good: {
      title: "The task first, the rest on request",
      description: "The dashboard leads with what the branch manager acts on — overdue items and today's holds — and keeps traffic analytics one click away. It is still dense with information; the information is relevant.",
      mock: {
        title: "Branch dashboard",
        elements: [
          { k: "heading", text: "Today at Central Library" },
          { k: "metrics", items: [{ label: "Overdue", value: "37" }, { label: "Holds ready", value: "12" }, { label: "Due today", value: "58" }], mark: 1 },
          { k: "list", items: ["37 overdue · send reminders", "12 holds ready · notify members"], mark: 2 },
          { k: "buttons", items: [{ text: "View traffic analytics", variant: "link" }], mark: 3 },
        ],
        alt: "The same dashboard showing three task metrics — Overdue 37, Holds ready 12, Due today 58 — a short action list, and a link to traffic analytics.",
        notes: [
          { n: 1, text: "Metrics chosen for the user's primary tasks." },
          { n: 2, text: "Each number leads to its action." },
          { n: 3, text: "Secondary analysis deferred, not deleted." },
        ],
      },
    },
    consequences: [
      "Important warnings and actions are overlooked among irrelevant ones.",
      "People ignore entire regions of the screen that look promotional.",
      "Over-zealous minimalism (hiding labels, icons without text, removing needed data) causes the opposite problem.",
    ],
    accessibility: [
      "Minimal does not mean low contrast: text must keep 4.5:1 and meaningful non-text elements 3:1 [WCAG 2.2 SC 1.4.3, 1.4.11, AA] {{src:w3c-wcag-22}}.",
      "Icon-only controls still need accessible names, and often visible labels for clarity [SC 4.1.2, A].",
      "Less visual noise helps people with attention and cognitive disabilities and people using screen magnification.",
    ],
    checklist: [
      "Does every element support a user task on this screen?",
      "Is the most important information the most prominent?",
      "Are secondary items deferred (progressive disclosure) rather than deleted?",
      "Are promotions and notifications kept out of task areas?",
      "Did simplifying remove labels, contrast or information people need?",
    ],
    related: [
      { n: 6, difference: "Heuristic 6 asks you to keep needed options visible; heuristic 8 asks you to remove irrelevant ones. The skill is deciding which is which for this user and task." },
      { n: 7, difference: "Advanced features can be deferred (heuristic 8) yet reachable for experts (heuristic 7)." },
    ],
    check: "aesthetic-and-minimalist-design-q-dense",
    exercise: "aesthetic-and-minimalist-design-ex-correct",
  },

  /* ------------------------------------------------------------------ 9 */
  {
    n: 9,
    name: "Help users recognise, diagnose and recover from errors",
    entry: "error-recovery",
    oneLiner: "Say what went wrong, in plain words, and how to fix it.",
    everyday:
      "When something fails, a good message answers four questions: what happened, why (if known), what you can do now, and what happened to what you already entered. 'Error 402' answers none of them.",
    why:
      "Errors will happen despite prevention — networks fail, cards expire, people mistype. At that moment people are already frustrated; a vague or blaming message makes it worse and leaves them stuck. NN/g's guidelines ask for messages that are visible, near the problem, in plain language, precise, constructive and polite {{src:nng-error-messages}}.",
    psychology:
      "An error interrupts the plan a person was following. To continue they must understand the failure (evaluation) and form a new plan (execution) — the two gulfs again ([[gulfs-of-execution-and-evaluation]]). Precise, constructive messages shorten both; generic ones leave people to diagnose the system themselves.",
    behaviour:
      "With good messages people correct the problem and continue. With poor ones they retry the same thing, abandon, or contact support — and sometimes assume the action succeeded when it did not.",
    bad: {
      title: "A code instead of an answer",
      description: "A payment fails and the page shows only an error code. The person does not know whether they were charged, what to change, or whether the order exists.",
      mock: {
        title: "Checkout",
        elements: [
          { k: "heading", text: "Payment" },
          { k: "banner", tone: "error", text: "Error 402. Operation failed.", mark: 1 },
          { k: "field", label: "Card number", placeholder: "", mark: 2 },
          { k: "buttons", items: [{ text: "Pay £84.00" }] },
        ],
        alt: "A checkout payment step showing 'Error 402. Operation failed.' above an empty card number field.",
        notes: [
          { n: 1, text: "No cause, no next step, no word on the order's status." },
          { n: 2, text: "The card details were wiped." },
        ],
      },
    },
    good: {
      title: "What happened, what to do, what's safe",
      description: "The message explains that the payment was declined, that the order has not been placed and nothing was charged, suggests checking the card or using another method, and keeps the entered details.",
      mock: {
        title: "Checkout",
        elements: [
          { k: "heading", text: "Payment" },
          { k: "banner", tone: "error", text: "We couldn't process your payment. Check your card details or try another payment method. Your order has not been placed and you have not been charged.", mark: 1 },
          { k: "field", label: "Card number", value: "•••• •••• •••• 4821", state: "error", hint: "Your bank declined this card.", mark: 2 },
          { k: "buttons", items: [{ text: "Try again" }, { text: "Use another method", variant: "secondary" }], mark: 3 },
        ],
        alt: "The same payment step with a message: 'We couldn't process your payment. Check your card details or try another payment method. Your order has not been placed and you have not been charged.' The card number is kept and marked with 'Your bank declined this card.' Buttons offer Try again and Use another method.",
        notes: [
          { n: 1, text: "What happened, and the state of the order." },
          { n: 2, text: "Error placed at the field, with the input kept." },
          { n: 3, text: "Two concrete ways forward." },
        ],
      },
    },
    consequences: [
      "People retry blindly, sometimes creating duplicate orders or locking accounts.",
      "Wiped input forces re-entry and invites new errors.",
      "Blaming language ('You entered an invalid value') damages trust.",
    ],
    accessibility: [
      "Identify the field in error and describe the error in text [WCAG 2.2 SC 3.3.1 Error Identification, A] {{src:w3c-wcag-22}}.",
      "Suggest a correction when one is known [SC 3.3.3 Error Suggestion, AA].",
      "Mark invalid fields programmatically (`aria-invalid`, `aria-describedby`) and announce form errors — move focus to an error summary on submit, or use a status message for background failures [SC 4.1.2, A; SC 4.1.3, AA].",
    ],
    checklist: [
      "Does each message say what happened, in plain language?",
      "Does it say why, when the cause is known?",
      "Does it offer a concrete next step?",
      "Does it say what happened to the person's data or order?",
      "Is the message placed at the problem, with input preserved?",
      "Is it perceivable without colour and announced to assistive technology?",
    ],
    related: [
      { n: 5, difference: "Heuristic 5 prevents the error; heuristic 9 handles the ones that still happen. A product needs both." },
      { n: 1, difference: "Heuristic 1 covers all status; heuristic 9 is the specific design of failure messages and recovery." },
      { n: 10, difference: "A good error message is help at the moment of failure; heuristic 10 covers help people seek out themselves." },
    ],
    check: "error-recovery-q-input",
    exercise: "error-recovery-ex-correct",
  },

  /* ------------------------------------------------------------------ 10 */
  {
    n: 10,
    name: "Help and documentation",
    entry: "help-and-documentation",
    oneLiner: "When help is needed, put it where the question arises.",
    everyday:
      "The best interface needs no manual. When some help is still needed — a tricky field, a rare task, a new feature — it should be short, about the task in hand, and easy to find without leaving the work.",
    why:
      "Some tasks are inherently complex, and some users are new. Nielsen's wording says it is better if the system needs no documentation, but where help is needed it should be easy to search, focused on the user's task, list concrete steps and not be too large {{src:nng-help-documentation}}. NN/g distinguishes proactive help (onboarding, tips) from reactive help (documentation people seek), and favours help pulled in at the moment of need {{src:nng-help-documentation}}.",
    psychology:
      "People rarely read instructions up front; they look for help when they are stuck, with a specific question. Help that answers that question in context — a 'pull' revelation — is used and remembered; help pushed before it is needed is skipped and forgotten.",
    behaviour:
      "Contextual help keeps people in the flow and reduces support contacts. Generic manuals send people away from their task, and many give up before finding the answer.",
    bad: {
      title: "Sent to a 60-page manual",
      description: "A tax-form field has a single link to a PDF user guide. The answer to the person's question is on page 37.",
      mock: {
        title: "Expenses claim",
        elements: [
          { k: "field", label: "Allowable mileage rate", placeholder: "" },
          { k: "buttons", items: [{ text: "Need help? Read the user guide (PDF, 60 pages)", variant: "link" }], mark: 1 },
          { k: "buttons", items: [{ text: "Submit claim" }] },
        ],
        alt: "An expenses form with an empty field 'Allowable mileage rate' and a link to a 60-page PDF user guide as the only help.",
        notes: [{ n: 1, text: "Help is far from the question and not about this task." }],
      },
    },
    good: {
      title: "A short answer at the field, more if needed",
      description: "A help link next to the field opens a short explanation with the current rate and an example calculation, and links to the full policy for those who need it.",
      mock: {
        title: "Expenses claim",
        elements: [
          { k: "field", label: "Allowable mileage rate", value: "45p per mile", hint: "For the first 10,000 business miles this tax year.", mark: 1 },
          { k: "banner", tone: "info", text: "Example: 120 miles × 45p = £54.00. Rates differ for motorcycles and bicycles.", action: "Full policy", mark: 2 },
          { k: "buttons", items: [{ text: "Submit claim" }] },
        ],
        alt: "The same form with the rate pre-filled as 45 pence per mile, a hint about the first 10,000 business miles, and an inline help panel with an example calculation and a link to the full policy.",
        notes: [
          { n: 1, text: "The most likely answer is built into the field." },
          { n: 2, text: "Short, task-specific help on request, with a path to more." },
        ],
      },
    },
    consequences: [
      "People abandon tasks or contact support for answers that exist somewhere.",
      "Long onboarding tours are skipped and their content lost.",
      "Relying on documentation to explain a confusing design hides the design problem.",
    ],
    accessibility: [
      "If a help mechanism (contact details, chat, self-help) is repeated across pages, keep it in the same relative place [WCAG 2.2 SC 3.2.6 Consistent Help, A] {{src:w3c-wcag-22}}.",
      "Offer context-sensitive help for inputs where it is needed (SC 3.3.5 Help, AAA).",
      "Help that appears on hover or focus must be dismissible, hoverable and persistent [SC 1.4.13 Content on Hover or Focus, AA].",
    ],
    checklist: [
      "Could the design be changed so this help is unnecessary?",
      "Is help available at the point of need, about the current task?",
      "Is it short, with concrete steps, and searchable?",
      "Can people reach more detail without leaving their work?",
      "Is help in the same place on every page, and accessible by keyboard?",
    ],
    related: [
      { n: 9, difference: "Error messages are help delivered by the system at the moment of failure; heuristic 10 covers help people look for themselves." },
      { n: 2, difference: "Help that uses the same jargon as the interface does not help; heuristic 2 applies to documentation too." },
    ],
    check: "help-and-documentation-q-pull",
    exercise: "help-and-documentation-ex-correct",
  },
];
