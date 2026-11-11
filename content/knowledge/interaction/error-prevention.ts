import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "error-prevention",
  slug: "error-prevention",
  title: "Error Prevention",
  alternateNames: ["Usability heuristic #5", "Prevent errors", "Slip prevention", "Mistake-proofing"],
  summary:
    "Design so that errors are hard to make in the first place — with constraints, good defaults, suggestions, forgiving formats and checks before costly actions — rather than relying on error messages afterwards.",
  definition:
    "Error prevention is the principle that a design should eliminate error-prone conditions, or check for them and ask people to confirm before they commit to an action {{src:nielsen-ten-heuristics-article}}. It rests on the difference between **slips** — the right intention carried out wrongly, often on autopilot — and **mistakes** — a wrong intention formed from an incorrect understanding of the system {{src:nng-slips}} {{src:nng-user-mistakes}}. It is the fifth of Nielsen's ten heuristics. It treats 'user error' as a design problem: the solution is to redesign the system, not to blame or retrain people {{src:nng-slips}}.",
  primaryType: "principle",
  secondaryTypes: ["heuristic"],
  domain: "interaction",
  subcategory: "principles",
  tags: ["errors", "slips", "mistakes", "constraints", "defaults", "forms", "validation", "heuristics"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "Form design", "Content design", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Distinguish slips from mistakes and explain why they need different prevention.",
    "Apply constraints, defaults, suggestions and forgiving formats to prevent slips.",
    "Prevent mistakes by matching people's mental models, following conventions and previewing results.",
    "Specify input attributes, validation timing and checks before high-stakes submissions.",
  ],
  prerequisites: ["mental-models"],

  levels: {
    beginner: {
      explanation: [
        "When people make errors in an interface, it is tempting to call it 'user error'. Nielsen Norman Group puts it the other way round: the designer is at fault for making the error too easy, so the answer is to redesign the system, not to scold people or train them harder {{src:nng-slips}}.",
        "Errors come in two kinds. A **slip** is when you mean to do the right thing but do something else — typing 'i' instead of 'o', tapping the button next to the one you wanted. A **mistake** is when you set out to do the wrong thing because you misunderstood — like adding air to your tyres because you mistook the oil warning light for the tyre-pressure light {{src:nng-slips}}.",
        "Error prevention stops both before they happen: it makes wrong inputs impossible or unlikely, fills in sensible defaults, suggests the right answer, accepts information in the forms people naturally type it, and makes sure people understand what an action will do before they take it.",
      ],
      analogy:
        "A petrol pump nozzle that does not fit a diesel car's tank. Nobody has to remember which fuel to use; the shape makes the wrong choice hard. Good interfaces build in the same kind of shape.",
      everydayExamples: [
        "A flight booking calendar that will not let you pick a return date before your departure.",
        "A search box that suggests correctly spelled terms as you type.",
        "A phone-number field that accepts spaces, dashes or brackets.",
        "An email app that warns 'You mentioned an attachment but none is attached'.",
      ],
      vocabulary: [
        { term: "Slip", meaning: "The right goal carried out wrongly, often while on autopilot." },
        { term: "Mistake", meaning: "A wrong goal formed from an incorrect understanding of how the system works." },
        { term: "Constraint", meaning: "A limit that makes a wrong input impossible, such as disabling past dates." },
        { term: "Default", meaning: "A value filled in for you that is likely to be right." },
        { term: "Forgiving format", meaning: "Accepting input in several reasonable forms instead of one exact pattern." },
      ],
    },
    intermediate: {
      explanation: [
        "**Slips** happen most when people know the task well and pay it little attention, so experts make them as well as novices {{src:nng-slips}}. NN/g recommends four ways to prevent them: helpful **constraints** where clear rules define acceptable input, **suggestions** that preempt typos, good **defaults** for repetitive or precise input, and **forgiving formatting** that accepts different ways of typing the same thing {{src:nng-slips}}.",
        "**Mistakes** happen when people's mental model does not match how the system works, so they form the wrong goal or misread the result. Preventing them means understanding those mental models through research, following conventions (people expect your product to work like others they use), communicating what controls do, and **previewing results** before people commit {{src:nng-user-mistakes}}.",
        "For both, high-stakes or destructive actions need a final check: a confirmation that states the consequence, or an undo that makes the action reversible {{src:nng-user-mistakes}}. Confirmation works only if it is rare; shown for routine actions it becomes a habit and stops preventing anything.",
      ],
      howItWorks: [
        "The slip/mistake distinction comes from research on human error. Norman's 1981 analysis of action slips classified errors in carrying out intentions {{src:norman-1981}}, and Reason's *Human Error* (1990) distinguished failures of execution (slips and lapses) from failures of planning (mistakes) {{src:reason-1990}}. Because they have different causes, they need different prevention: slips are reduced by constraints and checks at the point of action; mistakes by better information and conceptual design.",
        "In Norman's terms, mistakes often come from the gulf of execution (not knowing how to achieve a goal) and the gulf of evaluation (not understanding what the system did) {{src:norman-2013}} {{src:nng-user-mistakes}}. Prevention narrows both gulfs.",
      ],
      implementation: [
        "Constrain only where clear rules exist: valid date ranges, quantities in stock, options that are actually available {{src:nng-slips}}.",
        "Use the input's purpose to help: correct `type`, `inputmode` and `autocomplete` values reduce typing errors and let browsers fill known data [WCAG 2.2 SC 1.3.5 Identify Input Purpose, AA] {{src:w3c-wcag-22}}.",
        "Give labels or instructions where input is required, including the expected format [WCAG 2.2 SC 3.3.2 Labels or Instructions, A] {{src:w3c-wcag-22}}.",
        "Do not ask for information already given in the same process; fill it in or let people select it [WCAG 2.2 SC 3.3.7 Redundant Entry, A] {{src:w3c-wcag-22}}.",
        "For legal, financial or data-changing submissions, make them reversible, check input and allow correction, or provide a review step [WCAG 2.2 SC 3.3.4 Error Prevention (Legal, Financial, Data), AA] {{src:w3c-wcag-22}}.",
        "Validate when the person has finished a field, not while they are still typing, and keep their input when showing a problem.",
      ],
      scenarios: [
        "**Illustrative.** A library app's renewal form asks for a card number as exactly 14 digits with no spaces. People copy it from the card with spaces and are rejected. Accepting spaces and stripping them prevents the slip entirely.",
        "**Illustrative.** People think 'Return' in a library app means renewing, and lose their loan (a mistake). Renaming the action 'Return book (ends loan)', previewing the consequence and placing 'Renew' first matches their mental model.",
        "**Critique protocol.** For each input and destructive action, ask: What slips are possible here (typos, mis-taps, wrong item)? What mistakes (misunderstanding what it does)? Which are constrained, defaulted, suggested or previewed? Is there a check or undo where it matters?",
      ],
    },
    advanced: {
      explanation: [
        "In a design system, error prevention is built into **input components and their states**. Each field type encodes its constraints (`type`, `min`, `max`, `step`, `pattern`), purpose (`autocomplete`), keyboard (`inputmode`) and formatting rules once, so every form inherits them. Validation states — untouched, valid, invalid, pending — have defined visuals, copy and announcements: `aria-invalid` on the field and `aria-describedby` pointing to the message, so the problem is exposed to assistive technology as well as shown.",
        "Prevention, recovery and control form one system. Prevention lowers how often errors happen; error messages help people fix the ones that remain; undo lets people reverse them. The right balance depends on cost: for cheap, frequent actions, undo beats prevention that adds friction; for irreversible actions with high cost, prevention and a review step are worth the friction.",
        "Errors leave traces that can be measured. Useful signals are the validation-error rate per field, how often a field is corrected after an error, abandonment at the field where errors occur, and undo or 'cancel' use immediately after an action. These show where errors cluster; the cause, slip or mistake, usually needs observation to tell apart.",
        "Prevention can be overdone. Over-constrained inputs reject valid data (names with apostrophes, international phone numbers), and over-eager confirmations train people to click through. Each constraint should be justified by a real rule.",
      ],
      evidence: [
        "The slip/mistake distinction has a research basis in the study of human error {{src:norman-1981}} {{src:reason-1990}}; the books and paper are cited here for that classification, which this entry did not re-examine in the full text. The design recommendations are professional guidance from NN/g's practice and usability testing, not controlled experiments {{src:nng-slips}} {{src:nng-user-mistakes}}. The accessibility requirements are WCAG 2.2 success criteria, which are normative {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Prevent or allow and recover?** Preventing every possible error adds friction and can block valid input; allowing errors with good recovery and undo can be faster. The answer depends on the cost of the error.",
        "**Confirmation dialogs.** They catch some errors but habituate quickly; many designers prefer undo or a review step that shows the consequence instead.",
        "**Real-time validation.** Validating as people type catches slips early but can show errors for input that is merely incomplete; validating on leaving the field is a common compromise.",
      ],
      alternativeModels: [
        "**Mistake-proofing (poka-yoke)** from manufacturing applies the same idea through physical constraints that make the wrong action impossible.",
        "**Error recovery** is the complementary principle: help people recognise, diagnose and recover from the errors that prevention does not stop.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Rolf Molich", "Donald Norman", "James Reason"],
    period: "1981–1990 (error research); 1990 and 1994 (heuristic)",
    problem:
      "Interfaces blamed users for errors their design made easy, and relied on error messages after the fact instead of removing the conditions that caused the errors.",
    narrative: [
      "Research on human error in the 1980s distinguished errors of execution from errors of intention: Norman's classification of action slips (1981) and Reason's *Human Error* (1990) {{src:norman-1981}} {{src:reason-1990}}.",
      "Nielsen and Molich's 1990 principles included 'prevent errors' {{src:molich-nielsen-1990}}; Nielsen's 1994 revision kept error prevention as the fifth heuristic {{src:nielsen-1994-heuristics}} {{src:nielsen-ten-heuristics-article}}.",
    ],
  },

  application: {
    summary: [
      "Error prevention applies most to forms and data entry, destructive and high-stakes actions, and anywhere people's understanding of the system may differ from how it works.",
    ],
    web: [
      "Use correct input types, `inputmode` and `autocomplete`; accept flexible formats and normalise them; disable impossible options rather than rejecting them after submission.",
    ],
    mobile: [
      "Show the right keyboard for each field; make destructive actions harder to trigger by accident than to trigger on purpose (placement, spacing, undo).",
    ],
    enterprise: [
      "Preview the effect of bulk actions (how many records will change) before committing, and provide undo or a review step.",
    ],
    services: [
      "Prevent mistakes across a service with clear names and confirmation of what will happen next, such as what a cancellation actually ends.",
    ],
    steps: [
      "List the slips and mistakes possible at each input and action.",
      "Prevent slips with constraints, defaults, suggestions and forgiving formats.",
      "Prevent mistakes by researching mental models, following conventions and previewing results.",
      "Add a review step or confirmation only for costly, irreversible actions; prefer undo elsewhere.",
      "Encode constraints and validation states in input components.",
      "Measure errors per field and abandonment to find what prevention missed.",
    ],
  },

  whenToUse: [
    "Forms, data entry, destructive actions and any high-stakes or irreversible step.",
    "Reviews where usability tests show repeated errors at the same point.",
  ],
  whenNotToUse: [
    "As a reason to constrain input that has no clear rule: over-strict validation rejects valid names, addresses and numbers; accept and normalise instead.",
    "As a confirmation on every routine action: use undo, and reserve confirmation for what cannot be reversed.",
  ],
  advantages: [
    "Stops errors before they cost time, data or money.",
    "Reduces reliance on error messages, which many people misread or ignore.",
    "Many techniques are cheap to build once in input components.",
  ],
  limitations: [
    "Constraints can block valid input when the rules are not truly fixed.",
    "Mistakes need research to prevent; constraints alone do not fix a wrong mental model.",
    "Confirmations lose their effect when overused.",
  ],
  misconceptions: [
    {
      myth: "Error prevention means adding confirmation dialogs.",
      reality:
        "Confirmation is one of the last lines of defence. Constraints, defaults, suggestions, forgiving formats and clear previews prevent most errors without extra steps {{src:nng-slips}} {{src:nng-user-mistakes}}.",
    },
    {
      myth: "Only novices make errors.",
      reality:
        "Slips are common among experts, because well-practised tasks get less attention {{src:nng-slips}}.",
    },
  ],

  relations: [
    { target: "nielsen-usability-heuristics", type: "derived-from", note: "Heuristic 5 of Nielsen's ten usability heuristics." },
    { target: "error-recovery", type: "complementary-to", note: "Prevention lowers how often errors happen; recovery helps with those that remain." },
    { target: "form-design", type: "applied-in", note: "Most prevention techniques live in form fields and validation." },
    { target: "constraints", type: "applied-in", note: "Constraints make wrong input impossible where clear rules exist." },
    { target: "mental-models", type: "related-to", note: "Mistakes come from mental models that do not match the system." },
    { target: "user-control-and-freedom", type: "complementary-to", note: "Undo makes the errors that are not prevented cheap to reverse." },
  ],

  practice: {
    dos: [
      { text: "Constrain input where a clear rule exists: disable dates before departure, cap quantities at stock.", why: "Constraints make the slip impossible instead of reporting it afterwards {{src:nng-slips}}.", kind: "industry" },
      { text: "Accept the formats people naturally type and normalise them (spaces in card numbers, brackets in phone numbers).", why: "Forgiving formatting removes a whole class of slips {{src:nng-slips}}.", kind: "industry" },
      { text: "Give high-stakes submissions a review step or make them reversible.", why: "Legal, financial and data-changing submissions must be reversible, checked or confirmed [WCAG 2.2 SC 3.3.4, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't blame users in copy or design ('Invalid input!').", why: "Errors are a design problem; the fix is to redesign the system {{src:nng-slips}}.", kind: "industry" },
      { text: "Don't confirm every routine action.", why: "People learn to click through, so the confirmation stops preventing errors; use undo instead.", kind: "industry" },
      { text: "Don't validate while people are still typing, or clear their input when showing an error.", why: "Premature errors interrupt; cleared input forces people to start again and invites new slips.", kind: "context" },
    ],
    examples: [
      {
        title: "Preventing slips in a renewal form",
        language: "text",
        code: `<form>
  <label for="card">Library card number</label>
  <p id="card-hint">14 digits, spaces are fine</p>
  <input id="card" name="card" inputmode="numeric" autocomplete="off"
         aria-describedby="card-hint card-error" />
  <p id="card-error" hidden></p>          <!-- shown with aria-invalid="true" on the input -->

  <label for="until">Renew until</label>
  <input id="until" type="date" min="2026-11-12" max="2026-12-10" value="2026-11-26" />

  <label for="email">Email for the receipt</label>
  <input id="email" type="email" autocomplete="email" />

  <button type="submit">Review renewal</button>   <!-- review step before committing -->
</form>

<script>
  // Forgiving format: strip spaces and dashes before checking the length.
  const digits = card.value.replace(/[\\s-]/g, "");
  if (digits.length !== 14) {
    card.setAttribute("aria-invalid", "true");
    cardError.hidden = false;
    cardError.textContent = "Enter the 14 digits on the front of your card.";
  }
</script>`,
        caption:
          "Illustrative. The hint states the format; spaces are accepted; the date picker cannot go outside the allowed range and defaults to two weeks; email has its purpose declared [WCAG 2.2 SC 1.3.5]; the error is linked to the field with aria-describedby and aria-invalid; the review step follows SC 3.3.4.",
      },
      {
        title: "Slip or mistake? Choosing the prevention",
        language: "text",
        code: `Observed error                          Kind      Prevention
--------------------------------------  --------  ----------------------------------------
Return date before departure            slip      constrain the calendar
Typo in a search term                   slip      suggestions as people type
Card number rejected for spaces         slip      forgiving format, normalise
"Return" pressed to mean "Renew"        mistake   clearer name, preview consequence, research
Deleted the whole folder, meant a file  mistake   preview what will be deleted + undo`,
        caption: "Slips are prevented at the point of action; mistakes by better information and conceptual design {{src:nng-slips}} {{src:nng-user-mistakes}}.",
      },
    ],
  },

  exercises: [
    {
      id: "error-prevention-ex-classify",
      kind: "assignment",
      level: "beginner",
      title: "Slip or mistake?",
      prompt: [
        "Recall five errors you made in apps recently. For each, decide whether it was a slip or a mistake, and suggest one design change that would have prevented it.",
      ],
      deliverable: "A five-row table: error, slip or mistake, preventive design.",
      criteria: ["Correct classification", "Prevention matches the kind of error", "No blame on the user"],
    },
    {
      id: "error-prevention-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Stop rejecting valid card numbers",
      prompt: [
        "Illustrative case. A library app's renewal form rejects card numbers typed with spaces, clears the field on error and shows 'Invalid input'. Many renewals are abandoned at this field.",
        "Work through the correction sequence.",
      ],
      deliverable: "A corrected field specification: attributes, hint, validation timing, message and announcement.",
      criteria: ["Slip identified and prevented, not just reported", "WCAG criteria cited", "Validation plan", "Trade-off named"],
      exampleSolution: [
        "1. Symptom: valid card numbers rejected; the field clears; renewals abandoned.",
        "2. Impact: people believe their card is wrong and give up or phone the library.",
        "3. Cause: the validator expects 14 digits with no spaces, but cards print the number in groups; the error handler resets the field.",
        "4. Principle: prevent slips with forgiving formatting {{src:nng-slips}}; give instructions for the expected format [WCAG 2.2 SC 3.3.2, A].",
        "5. Correction: accept spaces and dashes and strip them; add the hint '14 digits, spaces are fine'; validate on leaving the field; keep the input; if the length is wrong, say 'Enter the 14 digits on the front of your card' with aria-invalid and aria-describedby.",
        "6. Validation: test with real cards and a screen reader; compare the error rate and abandonment at the field before and after.",
        "7. Trade-off: normalising input means the system must store one canonical form; document it so other services agree.",
      ],
    },
    {
      id: "error-prevention-ex-system",
      kind: "reflection",
      level: "advanced",
      title: "Design the prevention layer of an input library",
      prompt: [
        "For a design system's text, number, date and phone inputs, specify the constraints, formats accepted, validation timing, error states, announcements and telemetry each component provides by default.",
      ],
      deliverable: "A component specification table with the rule for when a constraint is allowed.",
      criteria: ["Constraints justified by real rules", "International input considered", "Accessibility attributes specified", "Telemetry defined"],
    },
  ],

  quiz: [
    {
      id: "error-prevention-q-slip",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "You mean to tap 'Reply' but tap 'Reply all' just below it. What kind of error is this?",
      options: [
        { text: "A slip", correct: true, explanation: "The intention was right; the action carried out was wrong." },
        { text: "A mistake", correct: false, explanation: "A mistake is a wrong intention from a misunderstanding." },
        { text: "Not an error; it is a design choice", correct: false, explanation: "The person did something they did not intend." },
        { text: "A system failure", correct: false, explanation: "The system did what was tapped." },
      ],
      explanation: "Slips are execution errors; mistakes are planning errors.",
    },
    {
      id: "error-prevention-q-choose",
      kind: "scenario",
      level: "intermediate",
      prompt: "People often book return flights before their departure date. What prevents this best?",
      options: [
        { text: "A calendar that does not allow return dates before the departure date", correct: true, explanation: "A constraint makes the slip impossible where a clear rule exists." },
        { text: "An error message after submission", correct: false, explanation: "That reports the error instead of preventing it." },
        { text: "A confirmation dialog for every booking", correct: false, explanation: "Routine confirmations become habits and miss the error." },
        { text: "Training users to check their dates", correct: false, explanation: "Errors are a design problem; redesign rather than retrain." },
      ],
      explanation: "Constrain where a clear rule exists.",
    },
    {
      id: "error-prevention-q-wcag",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "A bank transfer form submits immediately with no review and no way to cancel. Which WCAG 2.2 criterion does it fail?",
      options: [
        { text: "SC 3.3.4 Error Prevention (Legal, Financial, Data), Level AA", correct: true, explanation: "Financial submissions must be reversible, checked or confirmed." },
        { text: "SC 3.3.1 Error Identification, Level A", correct: false, explanation: "That concerns describing detected errors, not preventing them." },
        { text: "SC 1.4.3 Contrast (Minimum)", correct: false, explanation: "Unrelated." },
        { text: "No criterion; it is a business decision", correct: false, explanation: "WCAG requires one of the three safeguards for financial transactions." },
      ],
      explanation: "WCAG makes error prevention normative for legal, financial and data-changing submissions.",
    },
  ],

  flashcards: [
    { id: "error-prevention-fc-kinds", front: "Slip vs mistake", back: "Slip: right goal, wrong action (often on autopilot). Mistake: wrong goal from an incorrect mental model." },
    { id: "error-prevention-fc-slips", front: "Four ways to prevent slips (NN/g)", back: "Helpful constraints · suggestions · good defaults · forgiving formatting." },
    { id: "error-prevention-fc-mistakes", front: "Ways to prevent mistakes (NN/g)", back: "Research mental models · follow conventions · communicate affordances · preview results." },
  ],

  references: [
    { source: "nielsen-ten-heuristics-article", role: "primary", note: "Heuristic 5 as currently stated." },
    { source: "nielsen-1994-heuristics", role: "primary", note: "Revision that kept error prevention as a heuristic." },
    { source: "molich-nielsen-1990", role: "primary", note: "'Prevent errors'." },
    { source: "nng-slips", role: "explanatory", note: "Slips vs mistakes; constraints, suggestions, defaults, forgiving formatting." },
    { source: "nng-user-mistakes", role: "explanatory", note: "Mistakes, the two gulfs, conventions, previews, confirmation and undo." },
    { source: "norman-1981", role: "primary", note: "Classification of action slips (bibliographic record only)." },
    { source: "reason-1990", role: "primary", note: "Slips and lapses vs mistakes (bibliographic record only)." },
    { source: "norman-2013", role: "explanatory", note: "Gulfs of execution and evaluation." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.3.5 (AA), 3.3.2 (A), 3.3.4 (AA), 3.3.7 (A)." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Error prevention is professional guidance grounded in research on human error (Norman 1981; Reason 1990, cited here for their classification only) and in NN/g's practice and usability testing. The specific techniques are not tested here as controlled experiments. The accessibility requirements are WCAG 2.2 success criteria, a W3C Recommendation.",

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
