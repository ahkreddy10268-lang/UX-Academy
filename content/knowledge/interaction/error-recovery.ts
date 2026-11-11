import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "error-recovery",
  slug: "error-recovery",
  title: "Error Recovery",
  alternateNames: ["Usability heuristic #9", "Help users recognise, diagnose and recover from errors", "Good error messages", "Error handling"],
  summary:
    "When something goes wrong, people need to notice it, understand what happened and know exactly how to fix it — without losing their work. Error recovery designs that whole path, not just the message.",
  definition:
    "Error recovery is the principle that interfaces should help people **recognise, diagnose and recover from errors**: error messages expressed in plain language, precisely indicating the problem and constructively suggesting a solution {{src:nielsen-ten-heuristics-article}}. It is the ninth of Nielsen's ten heuristics. It covers the whole path after an error — noticing it, understanding it, correcting it and continuing — including keeping what people already entered {{src:nng-error-messages}}. It is distinct from error prevention, which stops errors happening, and from the writing of error messages, which is one part of recovery.",
  primaryType: "principle",
  secondaryTypes: ["heuristic"],
  domain: "interaction",
  subcategory: "principles",
  tags: ["errors", "error messages", "validation", "forms", "retry", "error summary", "heuristics", "accessibility"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "Content design", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Describe the three steps of recovery — recognise, diagnose, recover — and what each needs from the interface.",
    "Write error messages that state the problem precisely and suggest a fix, without blame.",
    "Design field-level and form-level error states that keep input, move focus sensibly and are announced.",
    "Handle server and network errors with retries and honest status, and measure recovery in production.",
  ],
  prerequisites: ["error-prevention", "visibility-of-system-status"],

  levels: {
    beginner: {
      explanation: [
        "You fill in a twelve-field form, press Submit, and the page reloads with a red line at the top: 'An error occurred.' Several fields are now empty. Which field was wrong? What was wrong with it? You start again, and maybe give up.",
        "Error recovery is about what happens after something goes wrong. People need to **recognise** that there is a problem (it is visible, next to where it happened), **diagnose** it (the message says exactly what is wrong in plain words) and **recover** (it says how to fix it, and their work is still there).",
        "Errors cannot always be prevented. When they happen, a good interface turns them into a short detour instead of a dead end.",
      ],
      analogy:
        "A good sat-nav after a wrong turn. It notices at once, says 'Turn around when possible' or plans a new route, and keeps your destination. It does not say 'Navigation error' and forget where you were going.",
      everydayExamples: [
        "'Card number is missing two digits' next to the card field, with your other details still filled in.",
        "A search that says 'No results for \"Midlemarch\". Did you mean Middlemarch?'",
        "'You are offline. We'll send your message when you reconnect.'",
        "A delivery form that offers the matching town when the postcode and town do not match.",
      ],
      vocabulary: [
        { term: "Recognise", meaning: "Notice that something went wrong, and where." },
        { term: "Diagnose", meaning: "Understand what exactly went wrong." },
        { term: "Recover", meaning: "Fix it and carry on, ideally without redoing work." },
        { term: "Inline error", meaning: "A message shown next to the field or item it concerns." },
        { term: "Error summary", meaning: "A list at the top of a form linking to each field that needs attention." },
      ],
    },
    intermediate: {
      explanation: [
        "NN/g's guidelines group good error handling into three areas {{src:nng-error-messages}}. **Visibility**: show the error next to its source; use noticeable, redundant indicators (text, icon, border) and never colour or animation alone; match the treatment to the impact (a warning is not a blocking error; modal dialogs are for severe cases); and do not show errors before people have finished. **Communication**: plain language, hidden error codes, a precise description of the problem, constructive advice, and a tone that does not blame — avoid words like 'invalid' and 'illegal'. **Efficiency**: preserve the person's input, reduce the effort of correcting (offer the likely fix), and explain briefly how the system works when that prevents a repeat.",
        "Recovery has to work for everyone. WCAG 2.2 requires that a detected input error is identified and described in text [SC 3.3.1 Error Identification, A], and that a suggested correction is given when one is known [SC 3.3.3 Error Suggestion, AA] {{src:w3c-wcag-22}}. For legal, financial and data-changing submissions, it also requires that they can be reversed, checked or confirmed [SC 3.3.4, AA].",
        "Errors also arise outside forms: lost connections, timeouts, server failures, conflicts with someone else's edit. The same three steps apply — say what happened in human terms, keep what can be kept, and offer the next action (retry, save a copy, work offline).",
      ],
      howItWorks: [
        "Recovery depends on the gulf of evaluation: after acting, people compare the system's state with what they intended. An error message bridges that gulf only if it says precisely what differs and what to do about it {{src:norman-2013}}.",
        "Preserved input and a suggested fix turn recovery into editing rather than starting again, which reduces the effort and the chance of new errors {{src:nng-error-messages}}.",
      ],
      implementation: [
        "Show each field's error next to the field, in text, with an icon or other non-colour cue; link it to the field with `aria-describedby` and mark the field `aria-invalid=\"true\"` [WCAG 2.2 SC 3.3.1, A; SC 1.4.1 Use of Color, A] {{src:w3c-wcag-22}}.",
        "On submitting a form with errors, show a summary at the top that lists each problem as a link to its field, and move focus to the summary.",
        "Say what is wrong and how to fix it: 'Enter the 14 digits on the front of your card', not 'Invalid input' [WCAG 2.2 SC 3.3.3, AA] {{src:w3c-wcag-22}}.",
        "Keep everything the person entered, including the value that caused the error, so they can edit it {{src:nng-error-messages}}.",
        "Announce errors that appear without a focus change through a live region; use `role=\"alert\"` only for errors that need immediate attention [WCAG 2.2 SC 4.1.3 Status Messages, AA] {{src:w3c-wcag-22}}.",
        "For network and server failures, keep the draft, say whether the action happened, and offer Retry; retry automatically only where repeating the request is safe.",
      ],
      scenarios: [
        "**Illustrative.** A library app's sign-up form clears every field and shows 'An error occurred' when one field is wrong. Keeping the input, marking the two problem fields, and adding a linked summary turns a restart into two quick fixes.",
        "**Illustrative.** Renewing a loan fails because the connection drops. Instead of a generic failure, the app says 'Not renewed — you're offline. Retry when you're connected', keeps the selection and offers Retry.",
        "**Critique protocol.** Trigger every error you can — empty and malformed fields, a server error, going offline. For each, check: Is it visible near its cause? Is it in plain words? Does it say how to fix it? Is input kept? Is focus moved sensibly and is the error announced? Any 'no' is a finding.",
      ],
    },
    advanced: {
      explanation: [
        "At system level, error recovery is a **state model at two levels**. Each field moves between *pristine, editing, valid, invalid* and sometimes *validating*; the form moves between *idle, submitting, failed (field errors), failed (system error)* and *succeeded*. Field errors from the server must be mapped back onto the same field states the client uses, so a server-detected error appears exactly where a client-detected one would. Specifying these states in the component library prevents each team inventing its own error behaviour.",
        "Error styling must not depend on colour. A semantic token such as `color.text.danger` gives the colour, but the error state also needs an icon, a text prefix ('Error:') and a thicker or different border — so the meaning survives colour-vision deficiency and high-contrast modes [WCAG 2.2 SC 1.4.1, A] {{src:w3c-wcag-22}}. NN/g makes the same point: redundant indicators, never colour alone {{src:nng-error-messages}}.",
        "Transient failures need **retry logic** that is safe and honest: retry only idempotent requests (or send an idempotency key so the server ignores duplicates), back off between attempts, stop after a few, and tell people what happened. A payment retried silently twice is a worse error than the original timeout.",
        "Recovery is measurable. Useful signals: error rate per field and per message, the share of errors followed by a successful submit (recovery rate), time from error to recovery, abandonment after an error, and repeat errors on the same field. A field with a high error rate points to prevention; a high abandonment after an error points to the message or the lost input.",
      ],
      evidence: [
        "The heuristic is professional guidance. 'Good error messages' was among Nielsen and Molich's 1990 principles {{src:molich-nielsen-1990}}, and Nielsen's 1994 analysis kept error recovery as a heuristic {{src:nielsen-1994-heuristics}}. NN/g's detailed guidelines come from practice and usability research rather than controlled experiments on each guideline {{src:nng-error-messages}}. The accessibility requirements are WCAG 2.2 success criteria and are normative {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Inline validation timing.** Validating as people type catches errors early but can show errors for unfinished input; NN/g warns against premature errors while allowing real-time help for error-prone fields such as passwords {{src:nng-error-messages}}.",
        "**Summary, inline or both?** Inline messages are close to the cause; a summary helps screen-reader and keyboard users find every problem. Many teams use both for longer forms.",
        "**How much to explain.** Short messages are read; long ones explain more. A short message with a link to more detail is a common compromise {{src:nng-error-messages}}.",
      ],
      alternativeModels: [
        "**Error prevention** reduces how often recovery is needed; the two are complementary, not alternatives.",
        "**Undo** turns many errors into a single reversal, removing the need for a message at all for reversible actions.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Rolf Molich"],
    period: "1990 ('good error messages'); 1994 ('help users recognise, diagnose and recover from errors')",
    problem:
      "Systems reported errors as codes or vague failures, often after discarding the user's work, leaving people unable to tell what had gone wrong or how to continue.",
    narrative: [
      "Nielsen and Molich's 1990 principles included 'good error messages' {{src:molich-nielsen-1990}}.",
      "Nielsen's 1994 revision broadened it to helping users recognise, diagnose and recover from errors {{src:nielsen-1994-heuristics}} {{src:nielsen-ten-heuristics-article}}.",
    ],
  },

  application: {
    summary: [
      "Error recovery applies to forms, payments and submissions, search with no results, file uploads, connectivity and server failures, conflicts in shared editing, and any action that can fail.",
    ],
    web: [
      "Pair inline field errors with a linked error summary on submit; keep the input; move focus to the summary.",
      "Handle offline and timeout states explicitly, with Retry and preserved drafts.",
    ],
    mobile: [
      "Keep error text visible above the on-screen keyboard; queue actions when offline and say so.",
    ],
    enterprise: [
      "Bulk operations need a recovery report: which items succeeded, which failed and why, with a way to retry only the failures.",
    ],
    services: [
      "Recovery continues outside the screen: reference numbers, a clear next step and a contact route when the problem cannot be fixed online.",
    ],
    steps: [
      "List every error the system can produce, including server and network failures.",
      "For each, write what happened and how to fix it, in plain words, without blame.",
      "Place messages next to their cause; add a linked summary for forms.",
      "Keep input and drafts; offer the likely fix or Retry.",
      "Specify field and form states, focus movement and announcements in components.",
      "Measure recovery rate, abandonment after error and repeat errors.",
    ],
  },

  whenToUse: [
    "Every flow where an action can fail, and every form.",
    "Reviews and usability tests: trigger errors deliberately, not only the happy path.",
  ],
  whenNotToUse: [
    "As a substitute for prevention: a frequent error with a good message is still a frequent error; prevent it where you can.",
    "As a modal dialog for minor problems: reserve blocking dialogs for severe errors and show warnings inline {{src:nng-error-messages}}.",
  ],
  advantages: [
    "Turns failures into short detours instead of abandoned tasks.",
    "Many requirements are testable through WCAG 2.2.",
    "Error and recovery rates show where design needs work.",
  ],
  limitations: [
    "Some errors cannot be diagnosed precisely without exposing security or privacy details (for example, which of username or password was wrong).",
    "Good messages need content design and engineering together; server errors are often generic at the source.",
    "Recovery cannot undo every consequence, such as a payment already taken.",
  ],
  misconceptions: [
    {
      myth: "A red border is enough to show an error.",
      reality:
        "Colour alone fails people who cannot distinguish it; errors need text and another visual cue [WCAG 2.2 SC 1.4.1 and 3.3.1, A] {{src:w3c-wcag-22}} {{src:nng-error-messages}}.",
    },
    {
      myth: "Error recovery means writing better error messages.",
      reality:
        "The message is one part. Placement, timing, preserved input, focus, announcements and a suggested fix all decide whether people recover {{src:nng-error-messages}}.",
    },
  ],

  relations: [
    { target: "nielsen-usability-heuristics", type: "derived-from", note: "Heuristic 9 of Nielsen's ten usability heuristics." },
    { target: "error-prevention", type: "complementary-to", note: "Prevention lowers how often errors happen; recovery handles those that remain." },
    { target: "error-messages", type: "applied-in", note: "Error messages are the written part of recovery." },
    { target: "form-design", type: "applied-in", note: "Forms are where most recovery patterns live: inline errors, summaries, preserved input." },
    { target: "visibility-of-system-status", type: "related-to", note: "Showing that something failed is a form of system status." },
    { target: "user-control-and-freedom", type: "complementary-to", note: "Undo and exits let people recover from their own choices." },
  ],

  practice: {
    dos: [
      { text: "Say what went wrong and how to fix it, in plain words, next to where it happened.", why: "People must recognise, diagnose and recover; a precise, constructive message close to its source supports all three {{src:nng-error-messages}}.", kind: "industry" },
      { text: "Identify errors in text and with a non-colour cue, and link each message to its field.", why: "Errors must be identified and described in text [WCAG 2.2 SC 3.3.1, A], and colour must not be the only signal [SC 1.4.1, A] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Keep everything people entered, including the value that caused the error.", why: "Recovery then becomes editing rather than starting again {{src:nng-error-messages}}.", kind: "industry" },
    ],
    donts: [
      { text: "Don't show 'An error occurred' or a bare error code.", why: "People cannot diagnose or fix a problem they are not told about; codes belong in diagnostics, not in the message {{src:nng-error-messages}}.", kind: "industry" },
      { text: "Don't blame people ('Invalid input', 'Illegal character').", why: "Blaming copy discourages and rarely explains the fix; NN/g advises a positive, non-judgemental tone {{src:nng-error-messages}}.", kind: "industry" },
      { text: "Don't retry non-idempotent requests silently.", why: "A payment or order sent twice is worse than the original failure; retry only safe requests, or use idempotency keys, and say what happened.", kind: "context" },
    ],
    examples: [
      {
        title: "Accessible inline errors with a linked summary",
        language: "text",
        code: `<form novalidate aria-describedby="form-errors">
  <!-- Shown after submit when errors exist; receives focus. -->
  <div id="form-errors" tabindex="-1" role="alert">
    <h2>There are 2 problems</h2>
    <ul>
      <li><a href="#card">Enter the 14 digits on the front of your library card</a></li>
      <li><a href="#email">Enter an email address like name@example.com</a></li>
    </ul>
  </div>

  <label for="card">Library card number</label>
  <p id="card-hint">14 digits, spaces are fine</p>
  <p id="card-error" class="field-error">
    <svg aria-hidden="true" class="icon-error"></svg>
    <span class="visually-hidden">Error:</span>
    Enter the 14 digits on the front of your library card
  </p>
  <input id="card" name="card" value="1234 5678 9012" inputmode="numeric"
         aria-invalid="true" aria-describedby="card-hint card-error" />
  <!-- The entered value is kept so it can be edited, not retyped. -->

  <label for="email">Email</label>
  <p id="email-error" class="field-error">… same pattern …</p>
  <input id="email" type="email" autocomplete="email" value="name@example"
         aria-invalid="true" aria-describedby="email-error" />

  <button type="submit">Create account</button>
</form>`,
        caption:
          "Illustrative. Errors are in text with an icon and a hidden 'Error:' prefix (not colour alone, SC 1.4.1), linked to fields with aria-describedby (SC 3.3.1), suggest the fix (SC 3.3.3), keep the entered values, and the summary takes focus and is announced.",
      },
      {
        title: "Form and request state with safe retry",
        language: "ts",
        code: `type FieldErrors = Record<string, string>;            // field name → message
type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "invalid"; errors: FieldErrors }          // client or server field errors
  | { kind: "failed"; message: string; canRetry: boolean }
  | { kind: "done" };

async function submit(data: Renewal, set: (s: FormState) => void, attempt = 1): Promise<void> {
  const local = validate(data);                          // same messages as the server
  if (Object.keys(local).length) return set({ kind: "invalid", errors: local });
  set({ kind: "submitting" });
  try {
    const res = await api.renew(data, { idempotencyKey: data.requestId }); // duplicates ignored server-side
    if (res.fieldErrors) return set({ kind: "invalid", errors: res.fieldErrors }); // map onto the same fields
    set({ kind: "done" });
  } catch (e) {
    if (isTransient(e) && attempt < 3) {
      await wait(500 * 2 ** attempt);                    // back off, then retry
      return submit(data, set, attempt + 1);
    }
    set({ kind: "failed", message: "Not renewed. Check your connection and try again.", canRetry: true });
  }
}`,
        caption:
          "Illustrative. Server field errors land in the same state as client ones, so they appear on the same fields; retries are bounded, backed off and safe because of the idempotency key. `api`, `validate`, `isTransient`, `wait` and `Renewal` are placeholders.",
      },
    ],
  },

  exercises: [
    {
      id: "error-recovery-ex-messages",
      kind: "assignment",
      level: "beginner",
      title: "Rewrite five error messages",
      prompt: [
        "Collect five error messages from apps you use. For each, check: does it say what happened, in plain words, and how to fix it? Rewrite the weak ones.",
      ],
      deliverable: "Before and after for each message, with the problem in each original.",
      criteria: ["States the problem precisely", "Suggests a fix", "No blame or codes", "Plain language"],
    },
    {
      id: "error-recovery-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix a form that forgets",
      prompt: [
        "Illustrative case. A library sign-up form, on any error, reloads with all fields cleared and a red banner 'An error occurred'. Screen-reader users report not knowing anything went wrong.",
        "Work through the correction sequence.",
      ],
      deliverable: "A corrected error design with states, copy, focus and announcement.",
      criteria: ["All three recovery steps covered", "WCAG criteria cited with levels", "Input preserved", "Validation and trade-off named"],
      exampleSolution: [
        "1. Symptom: fields cleared; a vague banner; screen-reader users unaware of the error.",
        "2. Impact: people retype everything or abandon sign-up; some never learn why it failed.",
        "3. Cause: the server re-renders an empty form with a generic message; no field-level errors or focus handling.",
        "4. Requirements: identify and describe errors in text [WCAG 2.2 SC 3.3.1, A]; suggest corrections [SC 3.3.3, AA]; not colour alone [SC 1.4.1, A]; keep input {{src:nng-error-messages}}.",
        "5. Correction: keep all values; show inline messages next to each problem field with an icon and 'Error:' prefix; add a linked error summary that receives focus; mark fields aria-invalid and link messages with aria-describedby.",
        "6. Validation: test with a screen reader and keyboard; measure abandonment after error and recovery rate before and after.",
        "7. Trade-off: the summary repeats the inline messages; keep both short so the repetition helps rather than clutters.",
      ],
    },
    {
      id: "error-recovery-ex-system",
      kind: "reflection",
      level: "advanced",
      title: "Specify error states for a component library",
      prompt: [
        "Define the field and form error states for your design system, how server errors map onto them, the retry policy for network failures, the tokens and non-colour cues for errors, and the telemetry you will collect.",
      ],
      deliverable: "A specification with a state diagram and a retry rule.",
      criteria: ["Complete field and form states", "Server mapping defined", "Retry limited to safe requests", "Recovery metrics defined"],
    },
  ],

  quiz: [
    {
      id: "error-recovery-q-best",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which error message best helps someone recover?",
      options: [
        { text: "\"Enter the 14 digits on the front of your library card\" next to the card field", correct: true, explanation: "It is close to the cause, precise and says how to fix it." },
        { text: "\"Error 422\"", correct: false, explanation: "A code does not tell people what is wrong or what to do." },
        { text: "\"Invalid input\" at the top of the page", correct: false, explanation: "Vague, far from the cause and blaming." },
        { text: "A red border on the field with no text", correct: false, explanation: "Colour alone does not say what is wrong and excludes some people." },
      ],
      explanation: "Recognise, diagnose, recover: visible, precise, constructive.",
    },
    {
      id: "error-recovery-q-input",
      kind: "scenario",
      level: "intermediate",
      prompt: "A long form fails server validation on one field. What should happen to the other fields?",
      options: [
        { text: "Keep all entered values and mark only the field with the problem", correct: true, explanation: "Preserving input turns recovery into a quick edit." },
        { text: "Clear the form so people start fresh", correct: false, explanation: "That forces people to redo work and invites new errors." },
        { text: "Keep values but hide which field failed", correct: false, explanation: "People then cannot diagnose the problem." },
        { text: "Redirect to the home page with a message", correct: false, explanation: "That abandons the task entirely." },
      ],
      explanation: "Preserve input and point precisely to the problem.",
    },
    {
      id: "error-recovery-q-wcag",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "A form marks errors only by turning the field border red. Which WCAG 2.2 criteria does it fail?",
      options: [
        { text: "SC 1.4.1 Use of Color (A) and SC 3.3.1 Error Identification (A)", correct: true, explanation: "Colour is the only cue, and the error is not described in text." },
        { text: "SC 2.5.8 Target Size (Minimum) only", correct: false, explanation: "Target size is unrelated to identifying errors." },
        { text: "SC 1.4.3 Contrast (Minimum) only", correct: false, explanation: "Contrast may also matter, but the core failures are colour-only meaning and no text." },
        { text: "None; borders are acceptable error indicators", correct: false, explanation: "A border alone neither describes the error nor works without colour perception." },
      ],
      explanation: "Errors need text and a non-colour cue.",
    },
  ],

  flashcards: [
    { id: "error-recovery-fc-three", front: "Three steps of error recovery", back: "Recognise (visible, near the cause) · diagnose (precise, plain words) · recover (a fix, input kept)." },
    { id: "error-recovery-fc-wcag", front: "WCAG 2.2 error criteria", back: "3.3.1 Error Identification (A), 3.3.3 Error Suggestion (AA), 3.3.4 Error Prevention for legal/financial/data (AA), 1.4.1 Use of Color (A)." },
    { id: "error-recovery-fc-retry", front: "Safe retry", back: "Retry only idempotent requests (or use an idempotency key), back off, stop after a few attempts, and say what happened." },
  ],

  references: [
    { source: "nielsen-ten-heuristics-article", role: "primary", note: "Heuristic 9 as currently stated." },
    { source: "nielsen-1994-heuristics", role: "primary", note: "Revision that named the heuristic." },
    { source: "molich-nielsen-1990", role: "primary", note: "'Good error messages'." },
    { source: "nng-error-messages", role: "explanatory", note: "Visibility, communication and efficiency guidelines for error messages." },
    { source: "norman-2013", role: "explanatory", note: "Gulf of evaluation." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.1, 3.3.1 (A), 3.3.3, 3.3.4, 4.1.3 (AA)." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Error recovery is professional guidance from Nielsen's heuristics and NN/g's practice-based guidelines; individual guidelines are not experimentally tested here. The accessibility requirements are WCAG 2.2 success criteria, a W3C Recommendation.",

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
