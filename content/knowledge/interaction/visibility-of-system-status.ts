import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "visibility-of-system-status",
  slug: "visibility-of-system-status",
  title: "Visibility of System Status",
  alternateNames: ["Usability heuristic #1", "System status", "Keep users informed", "Provide feedback"],
  summary:
    "An interface should always tell people what it is doing, what has changed and where they are, through timely, appropriate feedback, so they never have to guess whether an action worked.",
  definition:
    "Visibility of system status is the principle that an interface keeps people informed about **its state and the results of their actions**, within a time that matches the action. Nielsen Norman Group describes it as how well the state of the system is conveyed to its users {{src:nng-visibility-system-status}}. It is the first of Nielsen's ten usability heuristics {{src:nielsen-ten-heuristics-article}}. It is not a rule to show everything: status that does not affect what the person does next is noise.",
  primaryType: "principle",
  secondaryTypes: ["heuristic"],
  domain: "interaction",
  subcategory: "principles",
  tags: ["feedback", "loading states", "progress indicators", "response time", "status messages", "live regions", "heuristics"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "UI design", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Explain what system status is and why people need it to act with confidence.",
    "Match the kind of feedback to how long an operation takes, using the 0.1 s, 1 s and 10 s limits.",
    "Specify the states a component must show (idle, pending, success, error, stale) and how each is announced to screen readers.",
    "Evaluate status in a critique or usability test, and decide what to instrument in production.",
  ],
  prerequisites: ["feedback-principle"],

  levels: {
    beginner: {
      explanation: [
        "You tap 'Pay' and nothing changes. Did it work? Should you tap again? If you do, will you be charged twice? Nothing about the payment went wrong, but you are stuck because the interface did not say what it was doing.",
        "Visibility of system status means the interface keeps you informed: the button shows it is working, a message confirms the payment went through, a step indicator shows you are on step 2 of 3, a badge shows your basket has two items. Each answers a question you would otherwise have to guess at: *Did it hear me? Is it working? Did it work? Where am I?*",
        "Good status is **timely** (it arrives while you still care), **appropriate** (it matches how important the change is) and **honest** (it does not say 'Saved' before the save has happened).",
      ],
      analogy:
        "A lift. You press the button and it lights up; the display shows which floor the car is on; a chime tells you it has arrived. None of this moves the lift faster, but without it you would press the button again and again.",
      everydayExamples: [
        "A 'Sending…' label that turns into 'Sent' on a message.",
        "A progress bar showing how much of a large upload is complete.",
        "A delivery tracker that shows the parcel is out for delivery.",
        "A page heading and a highlighted menu item that show where you are in a site.",
      ],
      vocabulary: [
        { term: "System status", meaning: "What the system is doing or has done: loading, saved, failed, offline, step 2 of 3." },
        { term: "Feedback", meaning: "The response an interface gives to an action, such as a pressed button or a confirmation message." },
        { term: "Progress indicator", meaning: "A spinner (no end shown) or a bar (percent done) that shows work is in progress." },
        { term: "Latency", meaning: "The delay between an action and the system's response." },
        { term: "Status message", meaning: "A short message about a change, such as 'Saved' or '3 results', that does not move focus." },
      ],
    },
    intermediate: {
      explanation: [
        "The right feedback depends on **how long the operation takes**. A widely used guide is the three limits Nielsen summarised in 1993 from Miller (1968) and Card, Robertson & Mackinlay (1991): about **0.1 s** feels instantaneous; about **1 s** keeps the user's flow of thought uninterrupted, though the delay is noticed; about **10 s** is the limit for keeping attention on the task {{src:nielsen-1993-response-times}} {{src:miller-1968}} {{src:card-robertson-mackinlay-1991}}. These are practitioner guidance drawn from earlier work, not the result of a single experiment.",
        "Status also has to be **relevant**. NN/g recommends showing 'backstage' information only when it changes what people do, for example low stock or the distance to free shipping, and keeping items that change state visible with an explanation rather than letting them silently disappear {{src:nng-visibility-system-status}}.",
        "Finally, status has to **reach everyone**. A spinner that appears visually but is never announced leaves screen-reader users in the same silence as the unchanged 'Pay' button.",
      ],
      howItWorks: [
        "Feedback closes what Norman calls the gulf of evaluation: after acting, people compare what they see with what they expected to decide whether their action worked {{src:norman-2013}}. Without visible status that comparison is impossible.",
        "Waiting feels shorter and less risky when people can see progress: Myers (1985) found users strongly preferred percent-done progress indicators during long operations {{src:myers-1985}}. Visible status also prevents repeated input: NN/g notes that changing a button's state stops people from tapping it again {{src:nng-visibility-system-status}}.",
      ],
      implementation: [
        "Under about 0.1 s: show the result directly; a pressed state is enough.",
        "About 0.1–1 s: acknowledge immediately (pressed or disabled state, inline change) but avoid flashing a spinner that appears and vanishes.",
        "About 1–10 s: show that work is in progress near where the action happened — an inline spinner, a skeleton for content that is loading, or a 'Saving…' label.",
        "Over about 10 s: show determinate progress (percent or steps), let people leave and keep working, offer Cancel, and notify on completion.",
        "Announce status changes that do not move focus as status messages so assistive technologies can present them [WCAG 2.2 SC 4.1.3 Status Messages, AA] {{src:w3c-wcag-22}} {{src:w3c-understanding-wcag-22}}.",
        "Let people pause, stop or hide content that updates automatically, such as live feeds or tickers [WCAG 2.2 SC 2.2.2 Pause, Stop, Hide, A] {{src:w3c-wcag-22}}.",
      ],
      scenarios: [
        "**Illustrative.** A library app's 'Renew loan' call takes 2–4 s. With no feedback, people tap repeatedly and create duplicate requests. An inline 'Renewing…' state on the button, a polite status message on success and a disabled button while pending removes the duplicates.",
        "**Illustrative.** A report export takes about 40 s. Replacing the spinner with 'Preparing report — 3 of 5 sections' and an email when it is ready lets people leave the page.",
        "**Critique protocol.** In a heuristic review, perform each primary action and note, for each: Was there feedback within about 0.1 s? Was progress shown for anything over about 1 s? Was the outcome confirmed? Was it announced? Rate any gap with a severity.",
      ],
    },
    advanced: {
      explanation: [
        "At system scale, visibility of status is a **component state model**, not a set of one-off spinners. Every component that starts work needs defined states — *idle, pending, success, error* and often *stale* (showing old data while refreshing) and *offline* — with specified visuals, copy, focus behaviour and announcements. Design-system tokens should name these states (for example status colours and motion durations for pending) so they look and behave the same everywhere.",
        "**Optimistic UI** shows the expected result before the server confirms it. It makes fast operations feel instant, but it changes what 'status' means: the interface is displaying a prediction. It is appropriate when failure is rare and easily reversed (liking a post), and inappropriate when failure is costly or common (payments). Whichever is chosen, the error path must roll back visibly and explain what happened.",
        "Accessibility shapes the implementation. Messages that do not take focus are exposed through live regions: `role=\"status\"` for polite updates such as 'Saved', `role=\"alert\"` only for urgent ones, and `aria-busy` on a region that is being updated {{src:w3c-understanding-wcag-22}}. Moving focus to every update is disorienting; announcing nothing is silent failure.",
        "Status can also be **measured** in production. Useful signals include repeated clicks on the same control within a short window, duplicate submissions, abandonment during long waits and the time from action to confirmed result. These are leads to investigate, not proof of a status problem.",
      ],
      evidence: [
        "The heuristic is professional guidance. Nielsen's 1994 factor analysis of 249 usability problems from 11 projects found a factor he named visibility of system status, which is evidence that the issue recurs across real projects rather than proof of its effect size {{src:nielsen-1994-heuristics}}. The response-time limits are a synthesis of Miller (1968) and Card et al. (1991), and Myers (1985) is a small study of user preference, not of task performance {{src:nielsen-1993-response-times}} {{src:myers-1985}}. Specific thresholds for when to prefer skeleton screens over spinners have little published support and should be treated as conventions.",
      ],
      debates: [
        "**How much status is too much?** Every toast and badge competes for attention. NN/g's advice to show backstage status only when it affects users is a filter, but deciding what 'affects users' requires research for each product {{src:nng-visibility-system-status}}.",
        "**Optimistic updates vs honest status.** Optimistic UI feels faster but briefly shows something that may not be true; teams disagree on where the line lies, especially in finance and health.",
        "**The Doherty threshold vs the three limits.** A 400 ms productivity target from IBM's 1982 report sits alongside Nielsen's limits; they answer different questions (throughput vs perception) and should not be merged into one rule.",
      ],
      alternativeModels: [
        "**Shneiderman's 'offer informative feedback'** frames the same idea as a golden rule, scaling feedback to the frequency and importance of the action.",
        "**Norman's gulf of evaluation** explains why status matters rather than prescribing it: people need to perceive, interpret and compare the system's state with their goal {{src:norman-2013}}.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Rolf Molich"],
    period: "1990 ('provide feedback'); 1994 ('visibility of system status')",
    problem:
      "Interactive systems often gave no sign of what they were doing, leaving people unable to tell whether an action had worked or the system had stalled.",
    narrative: [
      "Nielsen and Molich's 1990 list of usability principles included 'provide feedback' {{src:molich-nielsen-1990}}.",
      "In 1994 Nielsen re-derived the heuristics from 249 real usability problems; one resulting factor was named visibility of system status, and it became the first of the ten heuristics still in use {{src:nielsen-1994-heuristics}} {{src:nielsen-ten-heuristics-article}}.",
    ],
  },

  application: {
    summary: [
      "Visibility of system status applies to every action that takes time, every change of state and every place a person can be in a product. It is most visible in loading and saving, multi-step flows, background jobs, connectivity and notifications.",
    ],
    web: [
      "Give every async control a pending state and an announced result; mark updating regions with `aria-busy`.",
      "Show position with page titles, current-page navigation and step indicators.",
    ],
    mobile: [
      "Use the platform's progress and activity indicators so status reads as native; show offline state explicitly and queue actions visibly.",
    ],
    enterprise: [
      "Long-running jobs (imports, reports, batch updates) need a job list with progress, history and failure reasons, not a spinner tied to one page.",
    ],
    services: [
      "Across a service, status includes the steps outside the screen: confirmation emails, reference numbers and what happens next, so people do not phone to ask.",
    ],
    steps: [
      "List every action that starts work and every state the product can be in.",
      "Estimate the duration of each operation and choose feedback by the 0.1 s, 1 s and 10 s limits.",
      "Specify idle, pending, success, error, stale and offline states for each component, with copy and announcements.",
      "Review the flow with a screen reader and with throttled network speed.",
      "Instrument repeated clicks, duplicate submissions and abandonment during waits.",
    ],
  },

  whenToUse: [
    "Any action whose result is not instantly visible, any state that can change without the person acting, and any multi-step flow.",
    "Critiques and heuristic evaluations, as a first check on every primary action.",
  ],
  whenNotToUse: [
    "As a reason to announce everything: status that does not change what people do next adds noise; filter it out.",
    "As a substitute for speed: a progress indicator on a needlessly slow operation treats the symptom; make it faster where you can.",
    "As a licence for optimistic UI where failure is costly: for payments and irreversible actions, show real status instead.",
  ],
  advantages: [
    "Prevents repeated input and duplicate submissions.",
    "Lets people act with confidence and recover sooner when something fails.",
    "Builds trust by being honest about what the system is doing.",
  ],
  limitations: [
    "The time limits are heuristics synthesised from older work, not precise thresholds for every context.",
    "The heuristic says to inform but not how much; deciding what status matters needs research.",
    "Visual status alone excludes screen-reader users unless it is also announced.",
  ],
  misconceptions: [
    {
      myth: "Miller (1968) set the 0.1 s, 1 s and 10 s limits.",
      reality:
        "Nielsen (1993) summarised the three limits from Miller (1968) and Card, Robertson & Mackinlay (1991); Miller's own analysis used different figures for different kinds of transaction {{src:nielsen-1993-response-times}}.",
    },
    {
      myth: "A spinner satisfies the heuristic.",
      reality:
        "A spinner says only that something is happening. For long tasks people need progress, the option to cancel and a confirmed outcome, and the change must also be announced [WCAG 2.2 SC 4.1.3] {{src:w3c-wcag-22}}.",
    },
  ],

  relations: [
    { target: "nielsen-usability-heuristics", type: "derived-from", note: "Heuristic 1 of Nielsen's ten usability heuristics." },
    { target: "feedback-principle", type: "related-to", note: "Feedback is the mechanism; visibility of status is the principle that feedback must be timely and appropriate." },
    { target: "doherty-threshold", type: "related-to", note: "Response-time targets decide which kind of status feedback an operation needs." },
    { target: "loading-states", type: "applied-in", note: "Loading states are where status visibility is designed for content that is not ready yet." },
    { target: "interaction-states", type: "applied-in", note: "Pending, success and error states are how components make their status visible." },
    { target: "error-recovery", type: "complementary-to", note: "Visible status reveals that something failed; recovery explains what to do next." },
  ],

  lab: "feedback-lab",

  practice: {
    dos: [
      { text: "Choose feedback by duration: acknowledge within about 0.1 s, show progress beyond about 1 s, show determinate progress and Cancel beyond about 10 s.", why: "The three limits describe when people notice a delay and when they lose attention {{src:nielsen-1993-response-times}}.", kind: "industry" },
      { text: "Put status where the action happened: the button that was pressed, the row that changed.", why: "People look where they acted; a distant toast is easily missed and does not say which item changed.", kind: "industry" },
      { text: "Announce changes that do not move focus with `role=\"status\"`, and reserve `role=\"alert\"` for urgent errors.", why: "Status messages must be programmatically determinable so assistive technology can present them [WCAG 2.2 SC 4.1.3, AA] {{src:w3c-wcag-22}} {{src:w3c-understanding-wcag-22}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't show 'Saved' before the server confirms the save.", why: "False status is worse than none: people leave believing their work is safe.", kind: "industry" },
      { text: "Don't flash a full-page spinner for operations under about a second.", why: "A spinner that appears and vanishes reads as flicker and hides content people were reading.", kind: "context" },
      { text: "Don't let items silently disappear when their state changes.", why: "NN/g recommends keeping, for example, out-of-stock wish-list items visible with a message so people understand what happened {{src:nng-visibility-system-status}}.", kind: "industry" },
    ],
    examples: [
      {
        title: "A save button with honest, announced status",
        language: "ts",
        code: `type SaveState = "idle" | "pending" | "saved" | "error";

// <button aria-describedby="save-status" disabled={state === "pending"}>
//   {state === "pending" ? "Saving…" : "Save"}
// </button>
// <p id="save-status" role="status">{message}</p>

async function save(draft: Draft, set: (s: SaveState, msg: string) => void) {
  set("pending", "");                       // < 0.1 s: button changes at once
  const slow = setTimeout(() => set("pending", "Still saving…"), 1000); // > 1 s
  try {
    await api.save(draft);                  // status only after the server confirms
    set("saved", "Draft saved at " + new Date().toLocaleTimeString());
  } catch {
    set("error", "Not saved. Check your connection and try again.");
  } finally {
    clearTimeout(slow);
  }
}`,
        caption:
          "The status paragraph has `role=\"status\"`, so its text is announced politely without moving focus. 'Saved' appears only after confirmation, and a second message appears if the wait passes about one second. `api` and `Draft` are illustrative.",
      },
      {
        title: "Feedback by duration",
        language: "text",
        code: `Duration          What people notice                Feedback
----------------  --------------------------------  ---------------------------------------------
< ~0.1 s          feels instantaneous               the result itself; pressed state
~0.1 s – ~1 s     a delay, but flow continues       immediate acknowledgement; no flashing spinner
~1 s – ~10 s      waiting                           inline progress, skeleton for loading content
> ~10 s           attention drifts                  percent-done or steps, Cancel, notify when done`,
        caption: "Limits from Nielsen (1993), synthesising Miller (1968) and Card et al. (1991); the feedback column is common practice, not part of the original limits.",
      },
    ],
  },

  exercises: [
    {
      id: "visibility-of-system-status-ex-audit",
      kind: "assignment",
      level: "beginner",
      title: "Ask the four status questions",
      prompt: [
        "Pick one task in an app you use (send a message, pay, upload a photo). For each step, write down how the app answers: Did it hear me? Is it working? Did it work? Where am I?",
      ],
      deliverable: "A table of steps with the answer the interface gives to each question, and the gaps.",
      criteria: ["Every step checked against all four questions", "Gaps described as what the person cannot tell", "One improvement per gap"],
    },
    {
      id: "visibility-of-system-status-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix a silent renewal",
      prompt: [
        "Illustrative case. A library app's 'Renew loan' button sends a request that takes 2–4 s. The button does not change, no message appears, and the due date updates only after a refresh. Analytics show many loans renewed twice.",
        "Work through the correction: symptom, impact, cause, requirement, corrected design, validation, trade-off.",
      ],
      deliverable: "A state specification for the button and the row, with copy and announcements.",
      criteria: ["States defined (idle, pending, success, error)", "Feedback matched to duration", "Announcement specified with SC 4.1.3", "Validation method named"],
      exampleSolution: [
        "1. Symptom: no change after tapping; duplicate renewals.",
        "2. Impact: people cannot tell whether it worked and retry, creating duplicate requests and doubt about their due date.",
        "3. Cause: the component has no pending or success state, and the row does not re-render after the response.",
        "4. Requirement: feedback within about 0.1 s and visible progress beyond about 1 s {{src:nielsen-1993-response-times}}; status messages programmatically determinable [WCAG 2.2 SC 4.1.3, AA].",
        "5. Correction: the button shows 'Renewing…' and is disabled while pending; on success the row shows the new due date and a `role=\"status\"` message says 'Renewed until 14 March'; on error the button returns with an explanation.",
        "6. Validation: test with throttled network and a screen reader; watch duplicate renewals in analytics after release.",
        "7. Trade-off: disabling the button blocks a deliberate second tap; acceptable because renewal is idempotent from the person's point of view.",
      ],
    },
    {
      id: "visibility-of-system-status-ex-system",
      kind: "reflection",
      level: "advanced",
      title: "Specify status for a design system",
      prompt: [
        "Write the status contract every async component in your design system must follow: states, tokens, copy patterns, announcement rules, when optimistic UI is allowed, and which telemetry events are emitted.",
      ],
      deliverable: "A one-page specification with a decision rule for optimistic updates.",
      criteria: ["Complete state list", "Accessibility rules cited", "Optimistic UI limited by cost of failure", "Telemetry defined as signals, not proof"],
    },
  ],

  quiz: [
    {
      id: "visibility-of-system-status-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which design best shows system status after someone taps 'Send'?",
      options: [
        { text: "The button changes to 'Sending…', then the message shows 'Sent'", correct: true, explanation: "It acknowledges the tap at once and confirms the outcome." },
        { text: "Nothing changes until the message appears in the thread", correct: false, explanation: "During the delay people cannot tell whether the tap registered." },
        { text: "A full-screen spinner appears for every message", correct: false, explanation: "Heavy feedback for a short, frequent action interrupts more than it informs." },
        { text: "A sound plays, with no visual change", correct: false, explanation: "Sound alone is missed in silent mode and excludes people who cannot hear it." },
      ],
      explanation: "Good status is immediate, proportionate and confirms the result.",
    },
    {
      id: "visibility-of-system-status-q-limits",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "An export takes about 30 seconds. What feedback fits best?",
      options: [
        { text: "Determinate progress with Cancel, and a notification when it is ready", correct: true, explanation: "Beyond about 10 s people's attention drifts, so show progress, let them leave and tell them when it is done." },
        { text: "A small spinner on the button", correct: false, explanation: "A spinner gives no sense of how long remains for a long task." },
        { text: "No feedback; the file downloads when ready", correct: false, explanation: "Thirty seconds of silence invites repeated clicks." },
        { text: "A modal that blocks the page until done", correct: false, explanation: "Blocking a long task stops people doing anything else." },
      ],
      explanation: "Feedback follows duration: the 0.1 s, 1 s and 10 s limits.",
    },
    {
      id: "visibility-of-system-status-q-aria",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "A form autosaves and shows 'Saved' in small text. How should this reach screen-reader users?",
      options: [
        { text: "Put the text in an element with role=\"status\" so it is announced without moving focus", correct: true, explanation: "Status messages must be programmatically determinable without receiving focus [WCAG 2.2 SC 4.1.3]." },
        { text: "Move focus to the 'Saved' text each time", correct: false, explanation: "Moving focus on every autosave interrupts typing." },
        { text: "Use role=\"alert\" for every save", correct: false, explanation: "Alerts interrupt; a routine save is not urgent." },
        { text: "Nothing is needed; it is only a visual cue", correct: false, explanation: "Then screen-reader users never learn their work was saved." },
      ],
      explanation: "Use polite live regions for routine status and alerts only for urgent errors.",
    },
  ],

  flashcards: [
    { id: "visibility-of-system-status-fc-limits", front: "Three response-time limits", back: "≈0.1 s feels instant · ≈1 s keeps flow · ≈10 s keeps attention (Nielsen 1993, from Miller 1968 and Card et al. 1991)." },
    { id: "visibility-of-system-status-fc-questions", front: "Four status questions", back: "Did it hear me? Is it working? Did it work? Where am I?" },
    { id: "visibility-of-system-status-fc-aria", front: "Announcing status without moving focus", back: "role=\"status\" (polite) for routine updates; role=\"alert\" only for urgent ones [WCAG 2.2 SC 4.1.3]." },
  ],

  references: [
    { source: "nielsen-ten-heuristics-article", role: "primary", note: "Heuristic 1 as currently stated." },
    { source: "nielsen-1994-heuristics", role: "primary", note: "Factor analysis that produced the revised heuristics." },
    { source: "molich-nielsen-1990", role: "primary", note: "'Provide feedback' in the original principles." },
    { source: "nng-visibility-system-status", role: "explanatory", note: "Definition, relevance of backstage status, trust." },
    { source: "nielsen-1993-response-times", role: "explanatory", note: "The three response-time limits." },
    { source: "miller-1968", role: "primary", note: "Early analysis of response time, a basis for the limits." },
    { source: "card-robertson-mackinlay-1991", role: "primary", note: "Time constants that Nielsen cites alongside Miller." },
    { source: "myers-1985", role: "primary", note: "Preference for percent-done progress indicators." },
    { source: "norman-2013", role: "explanatory", note: "Gulf of evaluation." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 4.1.3 Status Messages (AA); SC 2.2.2 Pause, Stop, Hide (A)." },
    { source: "w3c-understanding-wcag-22", role: "standard", note: "Understanding SC 4.1.3, including role=status and role=alert techniques." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Visibility of system status is professional guidance with a long record of use in heuristic evaluation and support from Nielsen's 1994 analysis of real usability problems. The response-time limits are a synthesis, and the preference for progress indicators comes from a small early study. The accessibility requirement for status messages is a WCAG 2.2 success criterion, a W3C Recommendation.",

  guide: { id: "nielsen-heuristics", anchor: "h1", label: "Heuristic 1 in the Nielsen heuristics guide" },

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
  lastVerifiedAt: "2026-11-11",
});
