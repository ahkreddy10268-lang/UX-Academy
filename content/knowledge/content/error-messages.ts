import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "error-messages",
  slug: "error-messages",
  title: "Error Messages",
  alternateNames: ["Validation messages", "Error copy", "Error notifications", "System messages"],
  summary:
    "Messages that tell people, when something has gone wrong, what happened, what they can do about it, and what has become of their work — placed where they will see it and announced to people who cannot see it.",
  definition:
    "An error message is a **pattern** of interface communication used when an action cannot be completed. It is the visible part of [[error-recovery|error recovery]]: it must let people recognise that something went wrong, understand what, and recover. GOV.UK's design system asks messages to describe what has happened and tell people how to fix it, in plain English {{src:govuk-error-message}}; NN/g groups good error handling into visibility, communication and efficiency {{src:nng-error-messages}}; WCAG 2.2 requires input errors to be identified and described in text (SC 3.3.1) and correction suggestions to be given where known, unless that would jeopardise security or the purpose of the content (SC 3.3.3) {{src:w3c-understanding-error-identification}} {{src:w3c-understanding-error-suggestion}}. A message is **not the same as an error code**: 'Error 0x643' records a fault for engineers; a message helps a person continue.",
  primaryType: "pattern",
  secondaryTypes: [],
  domain: "content",
  subcategory: "writing",
  tags: ["validation", "error summary", "inline validation", "accessibility", "security", "focus management", "heuristic 9"],
  difficulty: "intermediate",
  disciplines: ["UX writing", "Interaction design", "Accessibility", "Front-end development", "Security"],
  learningObjectives: [
    "Write messages that say what happened, why when it helps, and what to do next.",
    "Choose placement and timing: inline at the field, in a summary, or on a page of its own.",
    "Make errors perceivable and operable with assistive technology.",
    "Decide what not to reveal, for security and privacy, and how to keep the message useful anyway.",
  ],
  prerequisites: ["microcopy", "error-recovery"],

  levels: {
    beginner: {
      explanation: [
        "Something has gone wrong: a card was declined, a date is in the wrong format, the connection dropped. The person was in the middle of doing something, and now they have to stop. A good error message answers their questions straight away: What went wrong? Is it my fault or the system's? What do I do now? Have I lost what I typed?",
        "Compare 'Error 51' with 'Your card was declined. Check the card details or use a different card. Your basket has been saved.' The first is a code for an engineer. The second says what happened, what to do, and that nothing is lost.",
        "Shneiderman warned in 1982 that hostile, vague or coded messages — 'FATAL ERROR, RUN ABORTED', 'ILLEGAL CMD' — shake and discourage people {{src:shneiderman-1982}}. The same mistakes still appear today. GOV.UK lists words to avoid, including 'forbidden', 'illegal', 'you forgot', 'invalid', and jokes like 'oops' {{src:govuk-error-message}}.",
      ],
      analogy:
        "A good error message is like a helpful station announcement: 'The 8:15 to Leeds is cancelled because of a signal fault. Take the 8:32 from platform 4 — your ticket is valid.' A bad one is a red light on the departure board.",
      everydayExamples: [
        "A form says 'Enter a date of birth in the past' next to the date field, and lists the same error at the top of the page.",
        "A photo app says 'Couldn't upload — you're offline. We'll try again when you reconnect.'",
        "A sign-in page says 'Email or password is incorrect' without saying which, so attackers cannot learn which emails have accounts.",
      ],
      vocabulary: [
        { term: "Inline (field) error", meaning: "A message next to the field it is about." },
        { term: "Error summary", meaning: "A list of all errors at the top of a page after submitting, each linking to its field." },
        { term: "Validation", meaning: "Checking what someone entered against rules such as format or range." },
        { term: "Error code", meaning: "An identifier for a fault, useful to engineers and support, not a message for people." },
        { term: "User enumeration", meaning: "An attack that uses different messages to discover which accounts exist." },
      ],
    },
    intermediate: {
      explanation: [
        "**What to say.** Describe the specific problem and how to fix it: different errors need different messages — empty, too long, too short, wrong format, characters not allowed — and generic messages such as 'An error occurred' or 'This field is required' do not make sense out of context {{src:govuk-error-message}}. NN/g adds constructive advice, a positive tone without blaming people, and hiding error codes behind plain language {{src:nng-error-messages}}. Use instructions and descriptions consistently: 'Enter your first name' for an empty field, 'First name must be 35 characters or less' for a long one {{src:govuk-error-message}}. 'Why' is worth saying when it helps people fix the problem or decide; it is not always known, and sometimes cannot be shared.",
        "**Where and when.** Show the message next to its source {{src:nng-error-messages}}; after a failed submission, also show an error summary at the top, move keyboard focus to it, link each error to its field, and add 'Error:' to the start of the page title so screen readers announce it early {{src:govuk-error-summary}}. Keep everything the person entered, including the value that failed {{src:govuk-error-message}}. Avoid premature errors: NN/g warns against showing errors before people have finished {{src:nng-error-messages}}, and in two studies of 77 and 90 participants, showing errors after the whole form was completed performed best, while immediate feedback performed worst because people often ignored it and carried on {{src:bargas-avila-2007}}.",
        "**Not every problem is a field error.** GOV.UK advises against using field error messages to tell people they are not eligible, lack permission, or face a problem with the service they cannot fix; instead, take them to a page that explains the problem and what to do next {{src:govuk-error-message}}. Network failures, timeouts and outages are system errors: say what happened, whether anything was saved, and when or how to try again; 'sorry' belongs here, when something serious has gone wrong, not in routine validation {{src:govuk-writing-for-user-interfaces}}.",
      ],
      howItWorks: [
        "Classify the failure: input the person can fix, a condition they must know about (ineligible, no permission), or a system failure they cannot fix ([[error-states|error states]]).",
        "Write the message: what happened, how to fix it or what will happen next, and what has happened to their data.",
        "Place it: at the field; in an error summary after submission; or on a dedicated page for service problems {{src:govuk-error-message}} {{src:govuk-error-summary}}.",
        "Make it accessible: text, not colour alone; associate the message with the field; move focus to the summary; announce status changes {{src:w3c-understanding-error-identification}} {{src:w3c-understanding-status-messages}}.",
        "Check what it reveals: for sign-in and account recovery, use a generic message so attackers cannot tell whether an account exists {{src:owasp-authentication-cheat-sheet}}.",
        "Track how often each message is shown, and fix the cause of frequent ones {{src:govuk-error-message}}.",
      ],
      implementation: [
        "Keep a message set per field type (empty, format, range, length, characters) in the design system, with templates {{src:govuk-error-message}}.",
        "Use the same words at the field and in the summary, so they make sense out of context {{src:govuk-error-message}}.",
        "Associate field errors programmatically (for example with aria-describedby) and include a visually hidden 'Error:' prefix so screen readers hear what it is {{src:govuk-error-message}}.",
        "Do not clear fields when showing errors; keep both passing and failing answers {{src:govuk-error-message}}.",
        "Log technical codes for support and show a reference only when people may need to quote it.",
      ],
      scenarios: [
        "A payment fails with the gateway code 'DECLINED_51'. The message becomes 'Your card was declined. Check the card number and expiry date, or use a different card.' The code is logged, and shown as 'Reference: 51' only on the help page (illustrative).",
        "A file upload fails because the file is 30 MB and the limit is 10 MB. 'Upload failed' becomes 'The file must be smaller than 10 MB' — a description, because the instruction ('Upload a smaller file') would not say what the limit is.",
        "A sign-in form says 'No account found for sam@example.com'. A security review changes it to 'Email or password is incorrect' and adds rate limiting, accepting a small usability cost to prevent account enumeration {{src:owasp-authentication-cheat-sheet}}.",
      ],
    },
    advanced: {
      explanation: [
        "**Prevention first, recovery always.** The best error message is the one that never needs to appear: constraints, defaults, forgiving formats and good labels prevent many errors ([[error-prevention|error prevention]]). But some errors cannot be prevented — networks fail, cards expire — so every flow needs recovery designed for the errors that remain ([[error-recovery|error recovery]]).",
        "**Security and privacy constrain the message.** WCAG's requirement to suggest corrections has an explicit exception when a suggestion would jeopardise security {{src:w3c-understanding-error-suggestion}}. OWASP requires sign-in, password reset and recovery to respond with a generic message whether the ID or password is wrong, the account does not exist or it is locked, to prevent user enumeration — and notes this is a UX cost, to be decided by the application's criticality, with rate limiting reducing enumeration at scale {{src:owasp-authentication-cheat-sheet}}. Similar care applies to messages that could reveal someone else's data or internal system details: say what the person can do, not how the system failed internally.",
        "**Destructive actions.** When a delete, cancel or overwrite fails, the message must say clearly what state things are in — deleted or not, partly or fully — because people will act on that belief. When it succeeds but may be a mistake, an undo is often better than an error-style warning ([[user-control-and-freedom|user control and freedom]]).",
      ],
      evidence: [
        "Two studies (77 and 90 participants) found that presenting form errors after completion performed best and immediate feedback worst; participants often ignored immediate messages {{src:bargas-avila-2007}}. The studies examined timing and presentation, not wording.",
        "Shneiderman (1982) argued, from experience with novice users, that violent, vague or coded messages discourage people and shape their image of computers {{src:shneiderman-1982}}.",
        "NN/g's guidelines and the GOV.UK Design System's component guidance are professional syntheses of usability research and practice {{src:nng-error-messages}} {{src:govuk-error-message}}; WCAG 2.2 sets testable minimums (3.3.1 at Level A, 3.3.3 at Level AA) {{src:w3c-understanding-error-identification}} {{src:w3c-understanding-error-suggestion}}.",
      ],
      debates: [
        "**Inline validation timing.** Validating while people type catches mistakes early but can flag unfinished input; the Bargas-Avila studies favoured showing errors after completion {{src:bargas-avila-2007}}, and NN/g warns against premature errors {{src:nng-error-messages}}. Many teams validate a field when people leave it, and the whole form on submission; test with your own forms.",
        "**Apology and tone.** Some brands apologise in every message; GOV.UK keeps 'sorry' for serious failures and avoids it in validation, where it does not help fix anything {{src:govuk-writing-for-user-interfaces}} {{src:govuk-error-message}}. Humour, such as 'oops', is avoided in public services; NN/g notes that humour can irritate frustrated users {{src:nng-tone-of-voice}}.",
        "**Security versus usability.** Generic sign-in messages protect accounts but confuse legitimate users; OWASP leaves the decision to the application's risk, with rate limiting and CAPTCHA as complementary protections {{src:owasp-authentication-cheat-sheet}}.",
      ],
      alternativeModels: [
        "[[error-prevention|Error prevention]] — stopping errors through constraints, defaults and good design before a message is needed.",
        "[[error-states|Error states]] — the component and layout patterns that display errors; messages are their content.",
        "Undo — reversing an action instead of warning about it ([[user-control-and-freedom|user control and freedom]]).",
      ],
    },
  },

  origin: {
    contributors: ["Ben Shneiderman", "Jakob Nielsen", "Government Digital Service", "W3C Web Accessibility Initiative"],
    period: "System-message design discussed from the early 1980s; later codified in usability heuristics and in accessibility standards",
    problem:
      "Early systems reported failures as codes and alarms written for engineers, leaving users frightened, confused and unable to recover.",
    narrative: [
      "Shneiderman's 1982 article argued that system messages shape how novice users see computers and called for better design of them {{src:shneiderman-1982}}.",
      "'Help users recognise, diagnose and recover from errors' became Nielsen's ninth heuristic; NN/g's current guidelines frame it in terms of visibility, communication and efficiency {{src:nng-error-messages}}.",
      "Accessibility standards made the basics testable: WCAG requires errors to be identified and described in text and correction suggestions where known {{src:w3c-understanding-error-identification}} {{src:w3c-understanding-error-suggestion}}; design systems such as GOV.UK's codified placement, wording and summaries {{src:govuk-error-message}} {{src:govuk-error-summary}}.",
    ],
  },

  application: {
    summary: [
      "Every product that accepts input or depends on a network needs error messages for the failures that prevention cannot remove.",
    ],
    web: [
      "Form validation with field messages and an error summary; dedicated pages for service problems, not-found and ineligibility.",
    ],
    mobile: [
      "Offline and sync errors that say what was saved and when it will retry; messages short enough to fit without truncation.",
    ],
    enterprise: [
      "Permission errors that say who can grant access; batch-job failures that say which records failed and why.",
    ],
    services: [
      "Letters and texts about rejected applications that say what was wrong, what to send, and by when — with the same wording as the online form.",
    ],
    steps: [
      "List the failures each step can produce and classify them.",
      "Prevent what you can; design recovery for the rest.",
      "Write each message: what happened, what to do, what happened to their data.",
      "Place it at the field, in a summary or on its own page.",
      "Make it accessible and check what it reveals.",
      "Test, then track how often each message appears and fix the causes.",
    ],
  },

  whenToUse: [
    "Whenever an action cannot be completed and people need to know why or what to do.",
    "After form submission with input that does not meet the rules.",
    "When the system fails in a way people can work around, wait out or report.",
  ],
  whenNotToUse: [
    "For ineligibility, permissions or service problems the person cannot fix in the field — use an explanatory page {{src:govuk-error-message}}.",
    "Before people have finished entering a value — avoid premature errors {{src:nng-error-messages}}.",
    "As a substitute for preventing a common, predictable mistake.",
  ],
  advantages: [
    "People recover and continue instead of abandoning or calling support.",
    "Clear, specific messages reduce repeated errors.",
    "Accessible errors meet legal and ethical obligations.",
    "Tracked messages point to design problems worth fixing.",
  ],
  limitations: [
    "Messages cannot fix a confusing design; frequent errors usually mean the design should change.",
    "Security requirements sometimes force less specific messages.",
    "Evidence on wording is mostly professional guidance; experiments have focused on timing and placement.",
    "System failures may have unknown causes, limiting what can honestly be said.",
  ],
  misconceptions: [
    {
      myth: "Showing the technical error is honest and helpful.",
      reality:
        "Codes and jargon help engineers, not people; hide them behind plain language and keep them in logs or a reference {{src:nng-error-messages}} {{src:govuk-error-message}}.",
    },
    {
      myth: "Every error should explain its exact cause.",
      reality:
        "Some causes are unknown, and some must not be revealed — for example whether an account exists {{src:owasp-authentication-cheat-sheet}}. Say what the person can do.",
    },
    {
      myth: "Validating immediately, as people type, is always best.",
      reality:
        "Immediate feedback was often ignored in form studies, and premature errors frustrate people {{src:bargas-avila-2007}} {{src:nng-error-messages}}.",
    },
    {
      myth: "A red border shows the error.",
      reality:
        "Colour alone is not enough; errors must be identified and described in text {{src:w3c-understanding-error-identification}}.",
    },
  ],

  relations: [
    { target: "error-prevention", type: "contrasts-with", note: "Prevention stops errors before they happen; messages help people recover from those that remain." },
    { target: "nielsen-usability-heuristics", type: "related-to", note: "Heuristic 9: help users recognise, diagnose and recover from errors." },
    { target: "wcag", type: "measured-by", note: "WCAG 2.2 SC 3.3.1 (A) and 3.3.3 (AA) set testable minimums for error identification and suggestions." },
    { target: "tone-of-voice", type: "related-to", note: "Error messages need a serious, specific tone, whatever the brand voice." },
    { target: "form-design", type: "complementary-to", note: "Labels, hints and validation timing in form design decide how many errors occur and how they are fixed." },
    { target: "plain-language", type: "related-to", note: "Messages must be understandable at the moment of failure, without jargon or codes." },
  ],
  guide: { id: "nielsen-heuristics", anchor: "h9", label: "Heuristic 9 in the Nielsen heuristics guide" },

  practice: {
    dos: [
      { text: "Say what happened and how to fix it, specifically.", why: "Different errors need different messages; generic ones do not make sense out of context {{src:govuk-error-message}}.", kind: "industry" },
      { text: "Show errors at the field and in a summary that receives focus after submission.", why: "The summary tells keyboard and screen-reader users at once that there is a problem and links to each field {{src:govuk-error-summary}}.", kind: "industry" },
      { text: "Keep everything people entered.", why: "Preserved input lets people see what went wrong and edit instead of re-entering {{src:govuk-error-message}} {{src:nng-error-messages}}.", kind: "industry" },
      { text: "Use generic messages for sign-in and account recovery.", why: "Different messages let attackers discover which accounts exist {{src:owasp-authentication-cheat-sheet}}; WCAG allows withholding suggestions for security {{src:w3c-understanding-error-suggestion}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't show bare codes or jargon ('Error 0x643', 'form post error').", why: "They do not tell people what happened or what to do {{src:govuk-error-message}}.", kind: "industry" },
      { text: "Don't blame ('you forgot', 'illegal', 'invalid') or joke ('oops').", why: "Blaming and humour do not help fix the problem; GOV.UK lists these words to avoid {{src:govuk-error-message}}.", kind: "industry" },
      { text: "Don't rely on colour or a red border alone.", why: "Errors must be identified and described in text (WCAG 2.2 SC 3.3.1) {{src:w3c-understanding-error-identification}}.", kind: "standard" },
      { text: "Don't use field errors for problems people cannot fix.", why: "Ineligibility, missing permissions and service problems need a page that explains what to do next {{src:govuk-error-message}}.", kind: "industry" },
    ],
    examples: [
      {
        title: "Rewriting messages, and associating them in markup",
        language: "text",
        code: `REWRITES
Before                          After
Invalid input                   Enter a date of birth in the past
This field is required          Enter your postcode
Error 0x643                     We couldn't save your changes because the
                                connection dropped. Your draft is saved on
                                this device. Try again.
You forgot your password        (on sign-in) Email or password is incorrect
Access denied                   (page) You need editor access to change this
                                report. Ask Priya Shah (owner) for access.

MARKUP (field error, associated and announced)
<label for="dob">Date of birth</label>
<p id="dob-hint">For example, 27 3 1990</p>
<p id="dob-error">
  <span class="visually-hidden">Error:</span>
  Date of birth must be in the past
</p>
<input id="dob" aria-describedby="dob-hint dob-error" aria-invalid="true">

After submission: an error summary titled "There is a problem" at the top,
receiving focus, with a link to #dob; page title starts with "Error: ".`,
        caption:
          "Illustrative messages and markup. The structure follows GOV.UK Design System guidance; names and values are invented.",
      },
    ],
  },

  exercises: [
    {
      id: "error-messages-ex-rewrite",
      kind: "critique",
      level: "beginner",
      title: "Correct five error messages",
      prompt: [
        "Rewrite each message so it says what happened and what to do, without blame, jargon or jokes.",
        "(a) 'Invalid email' (someone typed 'sam@example'). (b) 'Oops! Something went wrong 🙈' (the server timed out while saving). (c) 'You forgot to select a delivery slot.' (d) 'ERR_CARD_EXP' (the card has expired). (e) 'Illegal characters in name.' (the name contains an emoji).",
      ],
      deliverable: "Five rewritten messages.",
      criteria: [
        "Each message is specific to the actual problem",
        "No blame words, jargon, codes or humour",
        "Each tells the person what to do next",
        "(b) says whether anything was saved and how to retry",
      ],
      exampleSolution: [
        "(a) 'Enter an email address in the correct format, like name@example.com'.",
        "(b) 'We couldn't save your changes. Your work is still on this page. Try again in a moment.'",
        "(c) 'Select a delivery slot'.",
        "(d) 'This card has expired. Use a different card or update the expiry date'.",
        "(e) 'Name must only include letters, spaces, hyphens and apostrophes' (adjust to the real rule).",
      ],
    },
    {
      id: "error-messages-ex-a11y",
      kind: "critique",
      level: "intermediate",
      title: "Find the accessibility failures",
      prompt: [
        "A checkout form shows errors this way: the field border turns red; a red message appears below the field but is not connected to it in the markup; focus stays on the 'Pay' button; nothing changes in the page title; the form clears the card number field.",
        "List each problem, explain who it affects, and say how to fix it.",
      ],
      deliverable: "A table of problems, affected users and fixes.",
      criteria: [
        "Colour-only identification (fails SC 3.3.1) — add text",
        "Message not associated with the field — associate it (for example aria-describedby) and add an 'Error:' prefix",
        "Focus not moved — add an error summary that receives focus and links to fields",
        "Page title unchanged — prefix with 'Error:'",
        "Input cleared — keep the entered values (card number may be re-entered only if security policy requires it, and the message should say so)",
      ],
    },
    {
      id: "error-messages-ex-security",
      kind: "scenario",
      level: "advanced",
      title: "Balance security and help",
      prompt: [
        "A password-reset page currently says either 'We've emailed you a reset link' or 'No account uses this email'. Security asks for a change. Support is worried that customers who mistype their email will wait for an email that never comes.",
        "Write the new message, and propose one or two design changes that reduce the support problem without reintroducing enumeration.",
      ],
      deliverable: "A message and design changes, each justified.",
      criteria: [
        "Uses the same response whether or not an account exists",
        "Shows the email address entered so people can spot a typo",
        "Suggests what to do if no email arrives, without confirming whether an account exists",
        "Mentions rate limiting as a complementary protection",
      ],
      exampleSolution: [
        "'If an account uses sam@exmaple.com, we've sent a reset link. Check the address is right; if nothing arrives in 10 minutes, check spam or try a different email.'",
        "Showing the typed address lets people catch 'exmaple'; the same response for all cases prevents enumeration; rate limiting reduces automated attempts {{src:owasp-authentication-cheat-sheet}}.",
      ],
    },
  ],

  quiz: [
    {
      id: "error-messages-q-best",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A card payment fails because the card has expired. Which message is best?",
      options: [
        { text: "“This card has expired. Use a different card or update the expiry date.”", correct: true, explanation: "Specific, says what to do, no blame or code." },
        { text: "“Payment error (code 54).”", correct: false, explanation: "A code without explanation or next step." },
        { text: "“Oops! Something went wrong.”", correct: false, explanation: "Vague and jokey at a stressful moment." },
        { text: "“Invalid card.”", correct: false, explanation: "'Invalid' adds nothing and does not say what to do." },
      ],
      explanation: "Say what happened and what to do.",
    },
    {
      id: "error-messages-q-signin",
      kind: "scenario",
      level: "intermediate",
      prompt: "What should a sign-in form say when the email is not registered?",
      options: [
        { text: "“Email or password is incorrect” — the same message as for a wrong password.", correct: true, explanation: "Different messages would let attackers find out which emails have accounts." },
        { text: "“No account exists for this email.”", correct: false, explanation: "Helpful to users, but it enables user enumeration." },
        { text: "“Error 401.”", correct: false, explanation: "A code tells people nothing about what happened or what to do." },
        { text: "Nothing — just clear the form.", correct: false, explanation: "Silence leaves people unsure what happened." },
      ],
      explanation: "Security constrains what an error can reveal; WCAG allows this exception.",
      revise: "error-recovery",
    },
    {
      id: "error-messages-q-timing",
      kind: "true-false",
      level: "intermediate",
      prompt: "Showing an error as soon as someone starts typing in a field is always the most usable choice.",
      options: [
        { text: "True", correct: false, explanation: "Premature errors frustrate people; in two studies immediate feedback was often ignored and performed worst." },
        { text: "False", correct: true, explanation: "Errors shown after completion performed best in those studies; many teams validate on leaving a field and on submission." },
      ],
      explanation: "Time messages so people can act on them.",
    },
    {
      id: "error-messages-q-page",
      kind: "critique",
      level: "advanced",
      prompt:
        "A benefits form shows a red field error, 'You are not eligible', under the 'Date of birth' field when an applicant is over the age limit. What is the main problem?",
      options: [
        { text: "Ineligibility is not something the person can fix in the field; it needs a page explaining why and what they can do instead.", correct: true, explanation: "GOV.UK advises against using error messages for ineligibility or problems people cannot fix." },
        { text: "The message should be in bold.", correct: false, explanation: "Styling does not address the wrong pattern." },
        { text: "It should say 'Invalid date of birth'.", correct: false, explanation: "The date is valid; the person is ineligible." },
        { text: "Nothing — field errors suit every problem.", correct: false, explanation: "Field errors are for input people can correct." },
      ],
      explanation: "Match the pattern to the kind of problem.",
    },
  ],

  flashcards: [
    { id: "error-messages-fc-1", front: "Four questions a good error message answers", back: "What happened? (Why, if it helps.) What can I do? What happened to what I entered?" },
    { id: "error-messages-fc-2", front: "Error summary (GOV.UK)", back: "At the top after submission, receives focus, links to each field, same wording as field messages; page title starts 'Error:'." },
    { id: "error-messages-fc-3", front: "WCAG 3.3.1 and 3.3.3", back: "3.3.1 (A): identify and describe errors in text. 3.3.3 (AA): suggest corrections where known, unless that jeopardises security." },
    { id: "error-messages-fc-4", front: "Why generic sign-in errors?", back: "To prevent user enumeration — attackers learning which accounts exist (OWASP)." },
    { id: "error-messages-fc-5", front: "Message vs error code", back: "A code identifies a fault for engineers; a message helps a person continue. Log codes; show plain language." },
  ],

  references: [
    { source: "nng-error-messages", role: "primary", note: "Read: visibility, communication and efficiency guidelines." },
    { source: "govuk-error-message", role: "primary", note: "Read: GOV.UK Design System error message component." },
    { source: "govuk-error-summary", role: "primary", note: "Read: error summary, focus and page title." },
    { source: "w3c-understanding-error-identification", role: "standard", note: "Read: WCAG 2.2 SC 3.3.1." },
    { source: "w3c-understanding-error-suggestion", role: "standard", note: "Read: WCAG 2.2 SC 3.3.3, including the security exception." },
    { source: "w3c-understanding-status-messages", role: "standard", note: "WCAG 2.2 SC 4.1.3 status messages." },
    { source: "owasp-authentication-cheat-sheet", role: "standard", note: "Read: generic authentication errors and user enumeration." },
    { source: "bargas-avila-2007", role: "primary", note: "Abstract read: timing of form error messages (two studies)." },
    { source: "shneiderman-1982", role: "primary", note: "Read in full 2026-11-17 (author's copy): system messages and novice users." },
    { source: "govuk-writing-for-user-interfaces", role: "explanatory", note: "Read: when to say sorry; no humorous error messages." },
    { source: "nng-tone-of-voice", role: "explanatory", note: "Read: humour can irritate frustrated users." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Error-message practice rests on professional guidance (NN/g, GOV.UK Design System), accessibility standards (WCAG 2.2 SC 3.3.1, 3.3.3, 4.1.3) and security guidance (OWASP), with limited experimental evidence: two studies on the timing of form errors (abstract read) and Shneiderman's early argument (opening read). Wording guidance is presented as practice, not as experimental findings.",

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
  lastVerifiedAt: "2026-11-16",
});
