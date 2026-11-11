import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "error-states",
  slug: "error-states",
  title: "Error States",
  alternateNames: ["Error state", "Failure states", "Error UI", "Error boundaries", "Retry states"],
  summary:
    "How a component behaves and looks when something fails — classified by cause (input, transient, permanent, crash), shown where the failure happened, with the user's work kept and a safe way to retry.",
  definition:
    "An error state is the **`error` state of the async model** in [[component-state-management]], entered with a **failure payload** that says what went wrong and what can be done. Design starts with classification: **validation errors** (the input cannot be accepted — often a person's slip or mistake in Reason's sense {{src:reason-1990}}), **transient failures** (network drops and timeouts that a retry may fix), **permanent failures** (not found, not allowed) and **unexpected crashes** caught by error boundaries {{src:react-error-boundaries}}. Each class needs a different message, location and recovery. Message writing and recovery steps are covered in [[error-recovery]]; this entry covers the state and its engineering.",
  primaryType: "pattern",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "components",
  tags: ["error state", "validation", "retry", "exponential backoff", "jitter", "idempotency", "error boundary", "preserve input", "aria-invalid"],
  difficulty: "intermediate",
  disciplines: ["Interaction design", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Classify failures and choose message, placement and recovery for each class.",
    "Model error as a state with a typed payload, separate from empty and loading.",
    "Retry safely with backoff, jitter and idempotent requests, without losing input.",
    "Meet WCAG 2.2 error-handling criteria and avoid colour-only error styling.",
  ],
  prerequisites: ["component-state-management", "error-prevention"],

  levels: {
    beginner: {
      explanation: [
        "A member fills in a long room-booking form in the library app and presses 'Book'. The Wi-Fi drops. The page reloads with an empty form and a red line saying 'Error 503'. They have to type everything again — and they do not know whether the room was booked.",
        "An **error state** is how the interface behaves when something goes wrong. A good one says, in plain words, *what happened*, *whether anything was saved*, and *what to do next* — and it keeps everything the person typed.",
        "Errors are not all the same. A wrong date is something the person can fix; a dropped connection may fix itself if you try again; a page that no longer exists will not come back. Each needs different help.",
      ],
      analogy:
        "A good pharmacist who cannot fill a prescription: they tell you why (out of stock, wrong dosage, needs a doctor's signature), keep your prescription, and tell you what happens next — they do not throw the paper away and say 'Error'.",
      everydayExamples: [
        "A field that says 'Enter a date after today' next to the date you typed.",
        "A banner saying 'You're offline. Your changes are saved and will be sent when you reconnect.'",
        "A 'Try again' button after a page fails to load.",
      ],
      vocabulary: [
        { term: "Error state", meaning: "What a component shows and does after something fails." },
        { term: "Validation error", meaning: "Input that cannot be accepted, such as a date in the past." },
        { term: "Transient failure", meaning: "A temporary problem, such as a dropped connection, that may succeed on retry." },
        { term: "Retry", meaning: "Trying the failed action again." },
        { term: "Error boundary", meaning: "A part of the interface that catches crashes in the parts inside it and shows a fallback." },
      ],
    },
    intermediate: {
      explanation: [
        "**Classify, then design.** *Validation*: show the message at the field and in a summary, keep the input, move focus to the summary on submit. *Transient*: say it is temporary, keep the work, offer retry (or retry automatically and say so). *Permanent*: say what is not possible and offer an alternative (search, contact, go back). *Crash*: contain it to the smallest region with an error boundary and offer reload of that region; React's error boundaries display fallback UI instead of the part that crashed, but do not catch errors in event handlers, server rendering or asynchronous code {{src:react-error-boundaries}}.",
        "**Place the error where it happened.** Field errors at the field, section errors in the section, page errors at the top. NN/g's error-message guidelines — visible near the problem, in plain language, precise and constructive — apply to every class {{src:nng-error-messages}}.",
        "**Never wipe the user's work.** Re-render the form with every value kept; restore draft content after a crash. WCAG 2.2 requires that information previously entered in the same process is auto-populated or available to select [SC 3.3.7 Redundant Entry, A] {{src:w3c-wcag-22}}.",
        "**Not by colour alone.** Error styling uses an icon and text as well as colour [SC 1.4.1, A]; error text and the icon meet contrast [SC 1.4.3, AA; 1.4.11, AA] {{src:w3c-wcag-22}}. Use semantic error tokens, never the brand red.",
      ],
      howItWorks: [
        "Classification maps each failure to the recovery that can actually work, so people are not told to 'try again' when retrying cannot help, or to fix input that was fine.",
        "Keeping input and placing messages at the source shortens recovery to correcting one thing instead of redoing everything.",
      ],
      implementation: [
        "Define an error payload type: class, message, field (if any), retryable, and whether anything was saved.",
        "Identify the error in text and describe the item in error [WCAG 2.2 SC 3.3.1 Error Identification, A]; suggest a correction when known [SC 3.3.3 Error Suggestion, AA] {{src:w3c-wcag-22}}.",
        "For legal, financial or data-changing submissions, make them reversible, checked or confirmed [SC 3.3.4 Error Prevention (Legal, Financial, Data), AA] {{src:w3c-wcag-22}}.",
        "Mark invalid fields with `aria-invalid` and link messages with `aria-describedby`; announce form-level errors via focus to a summary, and background errors via a status or alert region [SC 4.1.3, AA].",
        "Retry transient failures with exponential backoff and jitter, and only for idempotent operations {{src:aws-backoff-jitter}}.",
      ],
      scenarios: [
        "**Illustrative.** The booking form keeps every value after a 503, shows 'We couldn't reach the booking system. Nothing has been booked yet. Try again', and the retry sends the same idempotency key so a double booking is impossible.",
        "**Illustrative.** A crash in the events calendar widget used to blank the whole branch page. An error boundary around the widget now shows 'The events calendar couldn't load — Reload calendar' while the rest of the page works.",
        "**Design review protocol.** For each action: which error classes can occur? Where does each appear? Is input kept? Does the message say whether anything was saved? Is retry safe (idempotent) and rate-limited? Is the error perceivable without colour?",
      ],
    },
    advanced: {
      explanation: [
        "**State mapping.** `loading → error{class, message, retryable, saved}`; `error → loading` on RETRY only when `retryable`; `error → idle` on EDIT for validation errors. An error never collapses into `empty` ([[empty-states]]), and a cached success must not hide a newer failure. Automatic retries are internal transitions (`error.retrying` with attempt count) that surface to the user only after a limit.",
        "**Backoff, jitter, idempotency.** Amazon's guidance: set timeouts on remote calls, retry with exponential backoff, add jitter (random delay) so clients do not retry in synchronised bursts, and retry operations with side effects only if they are idempotent {{src:aws-backoff-jitter}}. HTTP defines a method as idempotent when repeated identical requests have the same intended effect as one; PUT, DELETE and safe methods are idempotent, POST is not {{src:rfc-9110}} — so 'Book room' needs an idempotency key or a server check before retrying.",
        "**Optimistic updates.** When an optimistic change fails, React's `useOptimistic` returns the UI to the previous value; the documentation pairs this with a visible error message {{src:react-use-optimistic}}. The error state must say what was undone.",
        "**Telemetry.** Error rate by class and endpoint, retry trigger rate (manual vs automatic), recovery rate (errors followed by success within the session), abandonment after errors, duplicate-submission incidents, and validation errors per field (a high rate signals a design problem, not user failure).",
      ],
      evidence: [
        "Error classification draws on **established human-error theory** (Reason 1990, cited for the slip/mistake distinction; full text not read here) {{src:reason-1990}}, NN/g's error-message guidelines {{src:nng-error-messages}}, React's documentation of error boundaries and optimistic rollback {{src:react-error-boundaries}} {{src:react-use-optimistic}}, AWS engineering guidance on retries {{src:aws-backoff-jitter}} and the HTTP standard on idempotency {{src:rfc-9110}}. WCAG 2.2 criteria 3.3.1, 3.3.3, 3.3.4 and 3.3.7 are normative {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Validate on blur or on submit?** Early validation helps with format errors but interrupts people mid-entry; many systems validate on blur for format and on submit for completeness.",
        "**Automatic or manual retry?** Automatic retries hide brief blips; manual retry keeps people in control. A few silent attempts, then a visible state, is a common compromise.",
        "**Technical detail?** Error codes help support but confuse people; show plain language with an optional reference code.",
      ],
      alternativeModels: [
        "**Offline-first** — queue actions locally and sync later, turning many transient errors into a pending state.",
        "**Prevention over recovery** — constraints and confirmations that stop errors before they occur ([[error-prevention]]).",
      ],
    },
  },

  application: {
    summary: ["Error states apply to forms, data loading, uploads, payments, background sync and every component that calls a service."],
    web: ["Typed error payloads, field-level aria-invalid and aria-describedby, error summaries, region-level error boundaries, retry with backoff and idempotency keys."],
    mobile: ["Expect offline: queue and sync where possible; preserve drafts across app restarts."],
    enterprise: ["Show partial failures in batch operations item by item; never fail the whole batch silently."],
    services: ["Every digital error should name a human route (phone, counter) for permanent failures."],
    steps: [
      "List the failures each action can produce and classify them.",
      "Define the error payload and transitions in the state machine.",
      "Design placement, copy and recovery per class; keep all input.",
      "Make retries safe: idempotency, backoff, jitter, limits.",
      "Check WCAG 3.3.1, 3.3.3, 3.3.4, 3.3.7, 1.4.1 and 4.1.3; instrument error and recovery rates.",
    ],
  },

  whenToUse: [
    "Every component that validates input or calls a service.",
    "Whenever a failure could lose work or leave people unsure what happened.",
  ],
  whenNotToUse: [
    "To report non-problems: an empty result is not an error ([[empty-states]]).",
    "As a substitute for prevention: errors that can be designed away should be.",
  ],
  advantages: [
    "People recover faster and keep their work.",
    "Safe retries prevent duplicate side effects.",
    "Contained crashes keep the rest of the interface usable.",
  ],
  limitations: [
    "Classification needs back-end cooperation (meaningful error codes, idempotency support).",
    "Automatic retries can hide real outages if not monitored.",
    "Error boundaries do not catch every kind of error {{src:react-error-boundaries}}.",
  ],
  misconceptions: [
    {
      myth: "A 'Try again' button is always the right recovery.",
      reality:
        "Retrying helps transient failures only; validation errors need correction and permanent failures need an alternative. Retrying non-idempotent actions can repeat side effects {{src:aws-backoff-jitter}}.",
    },
    {
      myth: "Red text is enough to show an error.",
      reality:
        "Colour alone fails people who cannot perceive it [WCAG 2.2 SC 1.4.1]; pair it with text and an icon {{src:w3c-wcag-22}}.",
    },
  ],

  relations: [
    { target: "component-state-management", type: "derived-from", note: "Error is a state with a typed failure payload." },
    { target: "error-recovery", type: "complementary-to", note: "Messages and recovery steps from the user's side." },
    { target: "error-prevention", type: "contrasts-with", note: "Prevention avoids the error state altogether." },
    { target: "empty-states", type: "contrasts-with", note: "A failure must never be shown as empty." },
    { target: "loading-states", type: "related-to", note: "Retries return to loading; long waits often end in timeouts." },
    { target: "error-messages", type: "complementary-to", note: "Microcopy of error messages." },
  ],

  practice: {
    dos: [
      { text: "Classify each failure (validation, transient, permanent, crash) and give each its own placement and recovery.", why: "Recovery only works when it matches the cause; NN/g asks for precise, constructive messages near the problem {{src:nng-error-messages}}.", kind: "industry" },
      { text: "Keep everything the person entered, and say whether anything was saved.", why: "Re-entry is costly and WCAG 2.2 SC 3.3.7 Redundant Entry (A) requires earlier information to be available {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Retry only idempotent operations, with exponential backoff and jitter.", why: "Prevents duplicate side effects and synchronised retry bursts {{src:aws-backoff-jitter}} {{src:rfc-9110}}.", kind: "industry" },
    ],
    donts: [
      { text: "Don't show errors by colour alone or with brand colours.", why: "WCAG 2.2 SC 1.4.1 (A); semantic error tokens keep meaning consistent {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't let one crashed widget blank the page.", why: "Error boundaries contain failures to a region with a fallback {{src:react-error-boundaries}}.", kind: "platform" },
      { text: "Don't show raw codes such as 'Error 503' as the message.", why: "People need what happened and what to do; NN/g asks for plain language {{src:nng-error-messages}}.", kind: "industry" },
    ],
    examples: [
      {
        title: "Typed error payload, safe retry with backoff and jitter, preserved input",
        language: "ts",
        code: `type Failure =
  | { kind: "validation"; field: string; message: string }
  | { kind: "transient"; message: string; saved: boolean }
  | { kind: "permanent"; message: string; alternative: { label: string; href: string } };

type State<T> =
  | { status: "editing"; values: T }
  | { status: "submitting"; values: T; attempt: number }
  | { status: "error"; values: T; failure: Failure }          // values always kept
  | { status: "done"; bookingId: string };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Retries transient failures only; the idempotency key makes repeats safe. */
export async function submitWithRetry(body: BookingInput, key: string, maxAttempts = 3) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Idempotency-Key": key },
      body: JSON.stringify(body),
    }).catch(() => null);
    if (res?.ok) return res.json();
    const transient = !res || res.status === 503 || res.status === 429;
    if (!transient || attempt >= maxAttempts) throw await toFailure(res);
    const base = 250 * 2 ** (attempt - 1);                     // exponential backoff
    await sleep(base / 2 + Math.random() * base / 2);         // jitter
  }
}

/* Rendering rules
   validation → message at the field (aria-invalid + aria-describedby) and in a focused summary
   transient  → banner: "We couldn't reach the booking system. Nothing has been booked yet." + Try again
   permanent  → explain + alternative link; no retry button
   all        → icon + text + error token colour; values re-rendered from state.values */`,
        caption: "Illustrative. The key must be generated once per booking attempt and honoured by the server; base delays and limits are product choices.",
      },
    ],
  },

  exercises: [
    {
      id: "error-states-ex-classify",
      kind: "assignment",
      level: "beginner",
      title: "Classify the failures",
      prompt: ["For a sign-up form, list five things that could go wrong. Classify each as validation, transient, permanent or crash, and write the one-sentence message and next step for each."],
      deliverable: "A table of failures, classes, messages and recovery.",
      criteria: ["Classes correct", "Plain-language messages", "Recovery fits the class"],
    },
    {
      id: "error-states-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Rescue the booking form",
      prompt: [
        "Illustrative case. The room-booking form clears all fields on any error and shows 'Error 503' in red text. Pressing 'Book' twice during a slow response created two bookings. A bug in the room-photo carousel blanks the whole page.",
        "Work through the correction sequence.",
      ],
      deliverable: "A corrected error-state specification.",
      criteria: ["Input preserved", "Class-specific messages", "Idempotent retry", "Contained crash", "Non-colour cues"],
      exampleSolution: [
        "1. Symptoms: lost input, cryptic message, duplicate bookings, blank page on carousel failure.",
        "2. Impact: people retype or give up; double-booked rooms; no booking possible when photos fail.",
        "3. Causes: form reset on error; raw status code; POST retried without idempotency; no error boundary.",
        "4. Requirements: identify errors in text [WCAG 2.2 SC 3.3.1, A]; suggest corrections [SC 3.3.3, AA]; confirm or reverse bookings [SC 3.3.4, AA]; earlier input available [SC 3.3.7, A]; not colour alone [SC 1.4.1, A].",
        "5. Correction: keep values in the error state; transient banner saying nothing was booked, with retry using an idempotency key and ignored presses while submitting; error boundary around the carousel; icon + text + error token.",
        "6. Validation: simulate 503 and double-click; screen-reader check of the summary; carousel crash test.",
        "7. Trade-off: server must support idempotency keys; coordinate with the API team.",
      ],
    },
    {
      id: "error-states-ex-telemetry",
      kind: "reflection",
      level: "advanced",
      title: "Instrument failure and recovery",
      prompt: ["Design telemetry that distinguishes error classes, automatic vs manual retries, and recovery within a session. Which thresholds would trigger a design review, and which an engineering incident?"],
      deliverable: "Event schema, metrics and thresholds.",
      criteria: ["Classes separated", "Recovery defined", "Review vs incident thresholds"],
    },
  ],

  quiz: [
    {
      id: "error-states-q-input",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A form submission fails. What should happen to what the person typed?",
      options: [
        { text: "It should be kept so they can correct or retry", correct: true, explanation: "Never wipe input on error." },
        { text: "It should be cleared for security", correct: false, explanation: "Only secrets like passwords may need clearing." },
        { text: "It should be emailed to them", correct: false, explanation: "Unnecessary." },
        { text: "It does not matter", correct: false, explanation: "Re-entry is costly and error-prone." },
      ],
      explanation: "Preserve the user's work.",
    },
    {
      id: "error-states-q-class",
      kind: "scenario",
      level: "intermediate",
      prompt: "A request returns 404 for a book that has been withdrawn. What recovery fits?",
      options: [
        { text: "Explain it is no longer available and offer an alternative, such as similar titles", correct: true, explanation: "Permanent failures need alternatives, not retries." },
        { text: "A 'Try again' button", correct: false, explanation: "Retrying cannot bring it back." },
        { text: "Automatic retries every second", correct: false, explanation: "Wasteful and pointless." },
        { text: "Highlight the search field in red", correct: false, explanation: "The input was not wrong." },
      ],
      explanation: "Match recovery to the class.",
    },
    {
      id: "error-states-q-idempotent",
      kind: "critique",
      level: "advanced",
      prompt: "A POST that creates a booking timed out. Why is automatic retry risky, and what makes it safe?",
      options: [
        { text: "POST is not idempotent, so the first request may have succeeded; an idempotency key honoured by the server makes repeats safe", correct: true, explanation: "Retry only idempotent operations." },
        { text: "Retries are always safe", correct: false, explanation: "They can duplicate side effects." },
        { text: "Retrying immediately makes it safe", correct: false, explanation: "Timing does not create idempotency." },
        { text: "Use GET instead", correct: false, explanation: "GET must not change state." },
      ],
      explanation: "Idempotency before retries.",
    },
  ],

  flashcards: [
    { id: "error-states-fc-classes", front: "Four error classes", back: "Validation (fix input), transient (retry), permanent (alternative), crash (contain with a boundary)." },
    { id: "error-states-fc-retry", front: "Safe retry", back: "Only idempotent operations, with exponential backoff, jitter and a limit." },
    { id: "error-states-fc-boundary", front: "What error boundaries don't catch (React)", back: "Event handlers, server-side rendering, the boundary itself, asynchronous code." },
    { id: "error-states-fc-wcag", front: "WCAG 2.2 error criteria", back: "3.3.1 Error Identification (A), 3.3.3 Error Suggestion (AA), 3.3.4 Error Prevention L/F/D (AA), 3.3.7 Redundant Entry (A), 1.4.1 Use of Color (A)." },
  ],

  references: [
    { source: "nng-error-messages", role: "primary", note: "Error-message guidelines." },
    { source: "reason-1990", role: "primary", note: "Slips and mistakes (bibliographic)." },
    { source: "react-error-boundaries", role: "primary", note: "Error boundaries and their limits." },
    { source: "aws-backoff-jitter", role: "primary", note: "Timeouts, backoff, jitter, idempotency." },
    { source: "rfc-9110", role: "standard", note: "Idempotent methods." },
    { source: "react-use-optimistic", role: "explanatory", note: "Optimistic rollback." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.1, 1.4.3, 1.4.11, 3.3.1, 3.3.3, 3.3.4, 3.3.7, 4.1.3." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Established human-error theory (cited bibliographically), practitioner guidelines (NN/g), engineering guidance (AWS), platform documentation (React), the HTTP standard and WCAG 2.2 criteria.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
