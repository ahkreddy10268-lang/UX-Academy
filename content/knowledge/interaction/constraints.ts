import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "constraints",
  slug: "constraints",
  title: "Constraints",
  alternateNames: ["Design constraints", "Interaction constraints", "Physical, cultural, semantic and logical constraints", "Forcing functions"],
  summary:
    "Constraints limit the actions that are possible or sensible in an interface, so people are guided towards valid choices and away from errors — through the shape of a control, learned conventions, the meaning of the task and simple logic.",
  definition:
    "In interaction design, **constraints** are properties of a design that **limit the set of possible or plausible actions**, so that fewer things can go wrong and the right action is easier to find. Norman describes four kinds — **physical**, **cultural**, **semantic** and **logical** — and treats constraints as one of the fundamental principles of interaction, alongside affordances, signifiers, mappings, feedback and the conceptual model {{src:norman-1988}} {{src:norman-2013}}. A strong form, the **forcing function**, makes a step impossible to skip. Constraints guide by reducing alternatives; they are a means of [[error-prevention|error prevention]], not the same thing as it.",
  primaryType: "concept",
  secondaryTypes: ["principle"],
  domain: "interaction",
  subcategory: "principles",
  tags: ["constraints", "forcing functions", "error prevention", "slips", "conventions", "input validation", "disabled controls"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "UI design", "Human factors", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Explain what a constraint is and how it helps people choose a valid action.",
    "Recognise physical, cultural, semantic and logical constraints in digital interfaces, and know that the categories overlap.",
    "Decide when a forcing function is justified and what it costs.",
    "Distinguish constraints from affordances, signifiers, feedback, conventions and error prevention.",
    "Evaluate whether a constraint helps people or has become an unnecessary barrier, including for assistive-technology users.",
  ],
  prerequisites: ["affordances", "signifiers"],

  levels: {
    beginner: {
      explanation: [
        "Every interface offers many things you could do. Most of them would be wrong at a given moment. A **constraint** narrows those possibilities so that what is left is mostly right: a date picker that will not let you choose a return date before you leave, a slider that only moves along its track, a 'Next' step that only appears once the current one makes sense.",
        "Constraints come from different places. Some are built into the shape of a control (**physical**). Some come from conventions you have learned, such as × closing a window (**cultural**). Some come from what the situation means, such as a return following an outward trip (**semantic**). And some come from reasoning: if two seats are taken, the third passenger gets the last one (**logical**).",
        "Good constraints feel like help, not restriction: you rarely notice them because the wrong options never tempt you. Bad constraints feel like walls — a form that rejects your real name, a button that is grey without saying why.",
      ],
      analogy:
        "A key that only fits its lock one way up. You do not need instructions or a warning label; the shape of the key and the slot rules out the wrong attempt before you make it. A well-constrained interface does the same with options that should not be chosen.",
      everydayExamples: [
        "A date picker that greys out dates that cannot be booked.",
        "A quantity stepper that cannot go below 1.",
        "A card-number field that accepts only digits and spaces.",
        "A 'Delete project' button that stays inactive until you type the project's name.",
      ],
      vocabulary: [
        { term: "Constraint", meaning: "A property of a design that limits which actions are possible or sensible." },
        { term: "Physical constraint", meaning: "A limit set by the form of the control, such as a slider's track or a field that accepts only digits." },
        { term: "Cultural constraint", meaning: "A limit that comes from learned conventions, such as × meaning close." },
        { term: "Semantic constraint", meaning: "A limit that comes from the meaning of the situation, such as a return date after the outward one." },
        { term: "Logical constraint", meaning: "A limit that follows from reasoning, such as the only remaining option." },
        { term: "Forcing function", meaning: "A constraint that makes it impossible to continue until a required step is done." },
      ],
    },
    intermediate: {
      explanation: [
        "Constraints work because people face a choice among actions and must pick one. Every option removed is one fewer to consider and one fewer to get wrong. Norman's point is that the knowledge needed to act correctly does not have to be memorised: much of it can be **built into the world** — into the form of the controls, their arrangement and their behaviour {{src:norman-2013}}. Constraints are one of the main ways of doing that.",
        "Norman distinguishes four kinds, introduced with physical objects and applied throughout to technology {{src:norman-1988}} {{src:norman-2013}}. On screens, most physical constraints are simulated by software (a field that ignores letters, a thumb confined to a track), so cultural, semantic and logical constraints carry much of the load. The four are a **useful lens, not an exhaustive or exclusive taxonomy**: one design often uses several at once, and the boundaries between them are not sharp.",
        "**Forcing functions** are the strongest constraints: they make a step impossible to skip. Norman describes **interlocks** (actions must happen in the right order, such as a microwave that will not run with the door open), **lock-ins** (an operation stays active, such as warning before closing unsaved work) and **lockouts** (entry into a dangerous state is blocked) {{src:norman-2013}}. On screens, these include confirmation that requires typing a name before an irreversible delete, and a checkout that cannot be submitted until required information is present.",
        "Constraints are one tool for **preventing slips** — the right intention carried out wrongly {{src:norman-1983-design-rules}}. NN/g lists helpful constraints alongside suggestions, good defaults and forgiving formats as the main ways to prevent slips {{src:nng-slips}}. That list matters: a constraint is the right tool only where a clear rule defines what is valid; where the rule is fuzzy, a suggestion or a forgiving format serves people better.",
      ],
      howItWorks: [
        "**Physical (simulated).** The control's form or behaviour admits only valid input: a `type=\"date\"` picker with `min` and `max`, a numeric stepper, a drag that only drops on valid targets. Errors are impossible rather than reported afterwards.",
        "**Cultural.** Conventions narrow what people try: × closes, a primary button sits at the end of a dialog's action row, red marks danger, underlined text in body copy is a link. They are learned, so they vary between platforms and cultures, and they hold only when the design follows them consistently ([[jakobs-law]]).",
        "**Semantic.** The meaning of the task rules options out: a return cannot precede departure, a delivery slot cannot be in the past, a person cannot be their own manager. These constraints come from the domain, so they need knowledge of the domain — and of its exceptions — to design well.",
        "**Logical.** Reasoning leaves only one sensible option: the last free seat, the remaining unmatched item, the step that must come next. Showing what has been used up lets people infer what is left. Natural [[mapping|mappings]] are often a logical constraint: the control laid out like what it controls leaves one obvious choice.",
      ],
      implementation: [
        "Write down the rule a constraint enforces before building it; if you cannot state the rule, use a suggestion or a forgiving format instead.",
        "Prefer constraining at the point of choice (only valid dates selectable) over accepting anything and rejecting it at submission.",
        "Make constraints visible and explained: say why an option is unavailable ('Sold out', 'Before your departure date') rather than greying it out silently.",
        "Keep inactive controls perceivable and explained; use `aria-disabled` or an explanation where people need to discover the control and learn why it cannot be used yet. ARIA defines `aria-disabled` as perceivable but not operable {{src:w3c-wai-aria-12}}.",
        "Reserve forcing functions for irreversible or high-cost actions, and pair them with the alternatives WCAG gives for legal, financial and data changes: make them reversible, check the input, or let people review and confirm [WCAG 2.2 SC 3.3.4] {{src:w3c-wcag-22}}.",
        "Accept the full range of real input: names with apostrophes and accents, international phone numbers and addresses. Constrain format only where the system genuinely requires it, and normalise what you can.",
      ],
      scenarios: [
        "**Illustrative.** A flight-booking form lets people type any return date and rejects earlier dates afterwards with 'Return date must be after departure'. Replacing the free-text field with a calendar that starts at the departure date and disables earlier days removes the error class entirely — a semantic constraint applied as a simulated physical one.",
        "**Illustrative.** A team deletes the wrong project because 'Delete' sits beside 'Duplicate' in a menu. Adding a forcing function — type the project's name to enable Delete — prevents the slip, at the cost of a few seconds for a rare, irreversible action.",
        "**Critique protocol.** For each input and action, ask: What rule makes some choices invalid? Is it enforced at the point of choice, at submission, or not at all? Is the constraint visible and explained? Does it reject any valid real-world input? Can keyboard and screen-reader users discover it and learn why?",
      ],
    },
    advanced: {
      explanation: [
        "Constraints trade **freedom for reliability**, and the right balance depends on the cost of error. Where errors are rare and cheap, heavy constraints cost more in friction than they save. Where errors are costly or irreversible, the same constraints are worth their friction. This is why forcing functions suit deletion, payment and medication dosing far more than everyday settings.",
        "On screens the boundary between constraints, conventions and affordances is blurred. Norman argued in 1999 that designers were conflating real affordances, perceived affordances, conventions and constraints, and that on screens the real affordances are largely fixed by the hardware, so what designers actually manipulate are perceived affordances, conventions and feedback {{src:norman-1999}}. Read this way, most screen 'constraints' are rules the software enforces plus conventions people have learned — which is why they break when software behaves inconsistently.",
        "Constraints interact with **accessibility** in both directions. Restricting input to valid options helps people with cognitive and motor impairments make fewer errors. But constraints implemented as disabled controls can hide information: a disabled control is often skipped by keyboard focus, and WCAG exempts text in inactive components from contrast requirements [SC 1.4.3] {{src:w3c-wcag-22}} — Material Design similarly exempts disabled states from its contrast requirements {{src:m3-states}}. The result can be a control that some people cannot read and cannot learn about. An unavailable action usually needs a readable explanation, not only a greyed-out state.",
        "Over-constraint is a real failure mode. Validation patterns that encode one country's formats, length limits that truncate real names, and pickers that forbid legitimate edge cases turn a constraint into a barrier. A useful test is whether every constraint corresponds to a rule the business or the domain actually has; constraints added for the system's convenience should be challenged.",
      ],
      evidence: [
        "Norman's account of constraints is an analytic framework built from close study of everyday objects and of human error, not the result of controlled experiments; its support is its long use in design and evaluation {{src:norman-1988}} {{src:norman-2013}}. Norman's 1983 analysis of slips derived design rules from a classification of how correct intentions go wrong, which is the basis for constraints as a way of preventing them {{src:norman-1983-design-rules}}.",
        "Practitioner guidance converges on constraints as one of several slip-prevention techniques, beside suggestions, defaults and forgiving formats {{src:nng-slips}}. There is little published experimental work comparing the four categories with each other, and no evidence that they are the only kinds.",
      ],
      debates: [
        "**Disable or explain?** One position constrains early: disable an action until it is valid. Another lets people try and then explains what is missing, because disabled controls can be invisible, unreadable or unexplained to some users {{src:w3c-wai-aria-12}} {{src:w3c-wcag-22}}. Which works better depends on how discoverable the reason is; there is no general rule.",
        "**Where does a constraint end and a convention begin?** Norman's own clarification that designers conflated constraints, conventions and affordances shows how blurred the categories are on screens {{src:norman-1999}}; teams should name the mechanism a design relies on rather than argue about labels.",
        "**Constrain or forgive?** Strict input formats prevent invalid data but reject unusual valid data; forgiving formats accept variety and normalise it. NN/g recommends both, for different kinds of rule {{src:nng-slips}}.",
      ],
      alternativeModels: [
        "**Error prevention** frames the same ground as a usability heuristic with a broader toolkit — constraints, defaults, suggestions, confirmations ([[error-prevention]]).",
        "**Mistake-proofing (poka-yoke)** from manufacturing makes the wrong action physically impossible; forcing functions are its interaction-design equivalent.",
      ],
    },
  },

  origin: {
    contributors: ["Donald A. Norman"],
    period: "1983 (design rules from slips); 1988 (four kinds of constraint); 2013 (revised edition)",
    problem: "People made errors that the design could have ruled out, and designers relied on instructions and warnings instead of building the knowledge into the product.",
    narrative: [
      "Norman's 1983 analysis of slips argued that properties of systems make some errors likely and derived design rules to reduce them {{src:norman-1983-design-rules}}.",
      "*The Psychology of Everyday Things* (1988) set out physical, cultural, semantic and logical constraints and forcing functions, using doors, switches and appliances as well as computers {{src:norman-1988}}; the 2013 revision keeps them among the fundamental principles of interaction {{src:norman-2013}}.",
    ],
  },

  application: {
    summary: ["Constraints apply wherever people choose among options or enter data: forms, pickers, editors, configuration, destructive actions and multi-step flows."],
    web: [
      "Use native input types and attributes (`type`, `min`, `max`, `step`, `inputmode`, `autocomplete`) to constrain at the point of entry; explain unavailable options in text; keep inactive controls perceivable when people need to learn why they are inactive.",
    ],
    mobile: [
      "Show the keyboard that matches the input (numeric, email, telephone) and use pickers for bounded choices; keep large forcing functions for irreversible actions, since confirmation steps cost more on small screens.",
    ],
    enterprise: [
      "Encode business rules as constraints in workflows (approval before payment, required fields before submission), and show which rule blocks progress so specialists are not left guessing.",
    ],
    services: [
      "Across a service, constraints include what a channel allows (a form that only offers available appointment slots) and policy limits that must be explained before people invest effort.",
    ],
    steps: [
      "List the rules that make some choices invalid, with their source (domain, law, system).",
      "For each rule, choose the mechanism: constrain the choice, suggest, use a forgiving format, or check and confirm.",
      "Make each constraint visible and explained, including to assistive technologies.",
      "Test with real, varied input — international names, addresses, edge dates — to catch over-constraint.",
      "Reserve forcing functions for irreversible or high-cost actions and measure the friction they add.",
    ],
  },

  whenToUse: [
    "Where a clear rule defines valid input or a valid order of steps.",
    "Before irreversible, costly or dangerous actions, as a forcing function.",
    "In critiques and evaluations, to ask where errors are reported afterwards that could have been ruled out before.",
  ],
  whenNotToUse: [
    "Where the rule is fuzzy or has many legitimate exceptions — prefer suggestions and forgiving formats.",
    "To hide options without explanation, especially through disabled controls people cannot read or reach.",
    "As a forcing function on frequent, reversible actions, where the friction outweighs the errors prevented.",
  ],
  advantages: [
    "Prevents whole classes of error instead of reporting them afterwards.",
    "Reduces the knowledge people need to hold in their heads.",
    "Communicates the valid options directly in the interface.",
  ],
  limitations: [
    "Norman's four categories overlap and are not exhaustive; they describe where constraints come from, not a checklist to fill.",
    "Constraints help only where the rule is clear and correct; a wrong or over-strict rule blocks legitimate use.",
    "Constraints implemented as disabled controls can reduce what some users can perceive and learn.",
  ],
  misconceptions: [
    {
      myth: "Constraints and error prevention are the same thing.",
      reality:
        "Constraints are one means of preventing errors; error prevention also uses defaults, suggestions, forgiving formats and confirmations {{src:nng-slips}}. And constraints do more than prevent errors: they also communicate what the valid options are ([[error-prevention]]).",
    },
    {
      myth: "A disabled button is always the safest constraint.",
      reality:
        "Disabled controls can be skipped by keyboard focus and are exempt from contrast requirements [WCAG 2.2 SC 1.4.3] {{src:w3c-wcag-22}}, so some people cannot read them or learn why they are unavailable. Explain the reason, or let people try and show what is missing.",
    },
    {
      myth: "Every interface constraint is physical.",
      reality:
        "On screens most constraints are rules enforced by software plus learned conventions; Norman noted that what designers manipulate on screens are largely perceived affordances, conventions and feedback {{src:norman-1999}}.",
    },
  ],

  relations: [
    { target: "error-prevention", type: "applied-in", note: "Error prevention uses constraints, among other techniques, to rule out slips where a clear rule exists." },
    { target: "affordances", type: "contrasts-with", note: "Affordances are what actions are possible; constraints limit which of them can or should be taken." },
    { target: "signifiers", type: "complementary-to", note: "Signifiers show where and how to act; constraints remove options that should not be acted on." },
    { target: "feedback-principle", type: "complementary-to", note: "Constraints act before an action; feedback reports its result afterwards." },
    { target: "mapping", type: "related-to", note: "A natural mapping is often a logical constraint: the layout leaves one sensible choice." },
    { target: "jakobs-law", type: "related-to", note: "Cultural constraints depend on conventions people learned on other products." },
    { target: "user-control-and-freedom", type: "contrasts-with", note: "Constraints restrict; control and freedom let people leave and undo. Good designs balance both." },
  ],

  practice: {
    dos: [
      { text: "State the rule a constraint enforces, and constrain only where that rule is clear and correct.", why: "Constraints help where a clear rule defines valid input; elsewhere suggestions and forgiving formats serve people better {{src:nng-slips}}.", kind: "industry" },
      { text: "Constrain at the point of choice and explain unavailable options in text.", why: "Ruling out an invalid choice before it is made removes the error; an explanation keeps the constraint understandable.", kind: "industry" },
      { text: "Use forcing functions for irreversible, legal or financial actions, alongside reversal, checking or confirmation.", why: "WCAG 2.2 SC 3.3.4 requires such submissions to be reversible, checked or confirmed {{src:w3c-wcag-22}}; a forcing function makes the slip hard in the first place {{src:norman-2013}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't grey out an action without saying why.", why: "Inactive text is exempt from contrast requirements and may be skipped by focus, so the reason can be invisible to some users {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't encode one locale's formats as the only valid input.", why: "Over-constrained fields reject real names, addresses and phone numbers and block legitimate users.", kind: "industry" },
      { text: "Don't add forcing functions to frequent, reversible actions.", why: "The friction is paid every time while the errors prevented are cheap to undo.", kind: "context" },
    ],
    examples: [
      {
        title: "Semantic constraint at the point of choice",
        language: "ts",
        code: `// Return date: the meaning of 'return' rules out dates before departure.
// <label for="return">Return date</label>
// <p id="return-hint">From your departure date, 14 March, up to 12 months ahead.</p>
// <input id="return" type="date" min={departure} max={limit}
//        aria-describedby="return-hint" />

function returnLimits(departure: string, monthsAhead = 12) {
  const d = new Date(departure + "T12:00");
  const max = new Date(d);
  max.setMonth(max.getMonth() + monthsAhead);
  return { min: departure, max: max.toISOString().slice(0, 10) };
}`,
        caption: "The constraint (`min`, `max`) and its explanation (the hint, linked with `aria-describedby`) travel together, so people who cannot see the greyed-out days still learn the rule. Server-side validation is still needed; the constraint prevents slips, it does not enforce security.",
      },
    ],
  },

  exercises: [
    {
      id: "constraints-ex-spot",
      kind: "assignment",
      level: "beginner",
      title: "Find the four kinds in one app",
      prompt: ["Choose an app you use often. Find one example each of a physical (simulated), cultural, semantic and logical constraint. For each, write the rule it enforces and what error it prevents."],
      deliverable: "A four-row table: kind, example, rule, error prevented.",
      criteria: ["All four kinds found or an honest note where one is missing", "Each rule stated explicitly", "Overlaps between kinds acknowledged"],
    },
    {
      id: "constraints-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Turn a rejection into a constraint — or not",
      prompt: [
        "Illustrative case. A booking form accepts a free-text return date and rejects anything before departure with 'Invalid date'. It also requires phone numbers in the format 07xxx xxxxxx and rejects all others.",
        "For each rule, decide whether to constrain, suggest, use a forgiving format or validate and explain. Justify each decision and describe the corrected design.",
      ],
      deliverable: "A short decision table and the corrected field specifications.",
      criteria: ["The date rule is constrained at the point of choice and explained", "The phone rule is recognised as over-constrained", "Accessibility of the chosen mechanism is addressed"],
      exampleSolution: [
        "Return date: a clear semantic rule — constrain it. Use a date picker whose earliest selectable day is the departure date, with a hint that says so {{src:norman-2013}}.",
        "Phone number: the rule encodes one country's format and rejects valid numbers. Accept international formats, normalise spaces and symbols, and validate only what the system truly needs (for example, that it is a dialable number) {{src:nng-slips}}.",
        "Explain both rules in visible hint text linked to the fields so screen-reader users hear them too.",
      ],
    },
    {
      id: "constraints-ex-forcing",
      kind: "reflection",
      level: "advanced",
      title: "Decide where forcing functions belong",
      prompt: [
        "List the destructive or high-cost actions in a product you know. For each, decide whether it needs a forcing function, an undo, a confirmation, or nothing extra. Justify your choice by cost of error, frequency and reversibility, and check it against WCAG 2.2 SC 3.3.4.",
      ],
      deliverable: "A table of actions with the chosen mechanism and its justification.",
      criteria: ["Cost, frequency and reversibility considered for each", "Forcing functions reserved for irreversible or costly actions", "Accessibility of each mechanism addressed"],
    },
  ],

  quiz: [
    {
      id: "constraints-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A return-date calendar makes days before the departure date unselectable. What kind of constraint is it based on?",
      options: [
        { text: "Semantic — the meaning of 'return' rules those dates out", correct: true, explanation: "A return cannot come before the outward trip; the constraint comes from the meaning of the task." },
        { text: "Cultural — it follows a convention", correct: false, explanation: "No learned convention is involved; the rule follows from what a return trip is." },
        { text: "Physical — the screen cannot show those dates", correct: false, explanation: "The dates are shown; the software prevents choosing them because of their meaning." },
        { text: "It is feedback, not a constraint", correct: false, explanation: "Feedback reports a result after an action; this limits the choice before it." },
      ],
      explanation: "Semantic constraints come from the meaning of the situation. On screens they are often enforced by simulating a physical constraint.",
    },
    {
      id: "constraints-q-boundary",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which statement best distinguishes constraints from error prevention?",
      options: [
        { text: "Constraints are one technique error prevention uses; error prevention also relies on defaults, suggestions, forgiving formats and confirmations", correct: true, explanation: "Constraints limit options; error prevention is the broader goal with several tools." },
        { text: "They are two names for the same idea", correct: false, explanation: "Error prevention includes techniques that do not restrict options at all, such as suggestions." },
        { text: "Error prevention happens after an error; constraints happen before", correct: false, explanation: "Both act before the error; recovery is what happens after." },
        { text: "Constraints only apply to physical products", correct: false, explanation: "Most constraints in software are enforced by rules and conventions." },
      ],
      explanation: "Keep the mechanism (constraint) separate from the goal (prevention).",
    },
    {
      id: "constraints-q-disabled",
      kind: "scenario",
      level: "advanced",
      prompt: "A 'Submit' button stays disabled until a form is complete, with no explanation. What is the strongest objection?",
      options: [
        { text: "People may not be able to perceive the disabled button or learn what is missing — inactive text is exempt from contrast requirements and disabled controls are often skipped by focus", correct: true, explanation: "The constraint prevents premature submission but hides the rule; an explanation, or allowing the attempt and listing what is missing, keeps it usable [WCAG 2.2 SC 1.4.3]." },
        { text: "Disabled buttons are not allowed by WCAG", correct: false, explanation: "They are allowed; the issue is that their state and reason can be hidden." },
        { text: "Forms should never constrain submission", correct: false, explanation: "Constraining submission is reasonable; leaving it unexplained is the problem." },
        { text: "The button should be red", correct: false, explanation: "Colour alone would not explain anything and fails people who cannot see the difference." },
      ],
      explanation: "A constraint must stay perceivable and explained to everyone, not only effective.",
    },
  ],

  flashcards: [
    { id: "constraints-fc-four", front: "Norman's four kinds of constraint", back: "Physical · cultural · semantic · logical — a lens, not an exhaustive taxonomy." },
    { id: "constraints-fc-forcing", front: "Three forcing functions", back: "Interlock (right order), lock-in (keep active, e.g. save before quitting), lockout (block a dangerous state)." },
    { id: "constraints-fc-vs-prevention", front: "Constraints vs error prevention", back: "Constraints limit options; error prevention is the goal and also uses defaults, suggestions, forgiving formats and confirmations." },
    { id: "constraints-fc-disabled", front: "Disabled-control risk", back: "Exempt from contrast [WCAG 1.4.3], often unfocusable — explain why an action is unavailable." },
  ],

  references: [
    { source: "norman-2013", role: "primary", note: "Four kinds of constraint; forcing functions (interlocks, lock-ins, lockouts); knowledge in the world." },
    { source: "norman-1988", role: "primary", note: "First edition, where the four kinds and forcing functions are set out." },
    { source: "norman-1983-design-rules", role: "primary", note: "Slips of action and design rules derived from them." },
    { source: "norman-1999", role: "primary", note: "Conflation of affordances, conventions and constraints; what designers manipulate on screens." },
    { source: "nng-slips", role: "explanatory", note: "Constraints among four ways to prevent slips, beside suggestions, defaults and forgiving formats." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.3 inactive-component exception; SC 3.3.4 Error Prevention (Legal, Financial, Data)." },
    { source: "w3c-wai-aria-12", role: "standard", note: "aria-disabled: perceivable but not operable." },
    { source: "m3-states", role: "explanatory", note: "Disabled states exempt from Material's contrast requirements." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "Constraints are part of Norman's established theoretical framework for interaction design, built from analysis of everyday objects and human error rather than controlled experiments. The link to slip prevention rests on Norman's 1983 analysis and is echoed in practitioner guidance. The four categories are descriptive and overlapping; there is little experimental comparison between them. Accessibility statements are drawn from WCAG 2.2 and WAI-ARIA 1.2.",

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
  lastVerifiedAt: "2026-11-13",
});
