import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "microcopy",
  slug: "microcopy",
  title: "Microcopy",
  alternateNames: ["Interface copy", "UI text", "UI strings"],
  summary:
    "The short pieces of text inside an interface — labels, buttons, hints, tooltips, confirmations, status and empty-state messages — that answer a person's question at the moment it arises.",
  definition:
    "Microcopy is a **pattern** of interface text: short, contextual words attached to a specific control, field or state. Joshua Porter, in an early 2009 post on the subject, described it as small copy — a sentence, a phrase or a single word — that is 'extremely contextual' and answers a specific question people have at that point {{src:porter-2009-microcopy}}. It includes field labels, hint text, placeholders, button and link text, tooltips, confirmation and success messages, status messages, empty states and error messages. It is the main output of [[ux-writing|UX writing]], but shortness alone does not make it good: 'Submit', 'Invalid input' and 'Click here' are short and unhelpful. Good microcopy is judged by whether it helps people act correctly and understand what happened.",
  primaryType: "pattern",
  secondaryTypes: [],
  domain: "content",
  subcategory: "writing",
  tags: ["labels", "buttons", "hint text", "placeholders", "tooltips", "confirmations", "empty states", "forms", "accessibility"],
  difficulty: "beginner",
  disciplines: ["UX writing", "Interaction design", "Accessibility", "Front-end development"],
  learningObjectives: [
    "Identify the kinds of microcopy and the question each one answers.",
    "Write labels, buttons and hints that predict outcomes and prevent errors.",
    "Recognise accessibility problems in interface text, such as placeholder-only labels and context-free links.",
    "Evaluate microcopy by behaviour and comprehension, not by length or preference.",
  ],
  prerequisites: ["ux-writing"],

  levels: {
    beginner: {
      explanation: [
        "Look at any form: 'Email address' above a box, 'We'll send your receipt here' under it, a button saying 'Pay £24.00'. Each of these is microcopy — a few words that tell you what to do, why, or what will happen. You notice it mostly when it is missing or wrong.",
        "Porter's example shows how much a single line can do. On a checkout form, payments kept failing because people entered an address that did not match their card. Adding one line — 'Be sure to enter the billing address associated with your credit card' — stopped the errors {{src:porter-2009-microcopy}}. That is an anecdote, not a study, but it shows the idea: the right words, in the right place, at the right moment.",
        "Microcopy is not decoration and not slogans. Every piece should answer a question the person actually has: What goes here? What happens if I press this? Did it work? Is this safe? Can I change it later?",
      ],
      analogy:
        "Microcopy is like the labels on a well-organised kitchen's jars and switches: 'Sugar', 'Oven — hot surface', 'Fan: high'. Nobody reads them for pleasure; everyone relies on them at the moment of doing something.",
      everydayExamples: [
        "Under a password field: 'At least 12 characters. A short sentence works well.'",
        "Beside a username field on sign-up: 'You can change this later.'",
        "An empty inbox: 'No messages yet. When someone writes to you, it will appear here.'",
      ],
      vocabulary: [
        { term: "Label", meaning: "The name of a field or control, always visible and associated with it." },
        { term: "Hint text", meaning: "Extra guidance near a field, such as a format or a reason for asking." },
        { term: "Placeholder", meaning: "Text inside an empty field that disappears when you type." },
        { term: "Call to action", meaning: "The text of a button or link that starts an action." },
        { term: "Status message", meaning: "A message about progress or a result that appears without moving focus, such as '3 results'." },
      ],
    },
    intermediate: {
      explanation: [
        "**Each kind of microcopy answers a different question.** Labels: what is this? Hints: how do I fill it in, and why are you asking? Buttons and links: what will happen? Status and confirmation: did it work, and what changed? Empty states: why is nothing here, and what can I do? Error messages: what went wrong and how do I fix it ([[error-messages|error messages]])? Writing microcopy starts by asking which question the person has at that moment ([[ux-writing|UX writing]]).",
        "**Labels outside the field; placeholders are not labels.** NN/g's research lists seven problems with placeholders used instead of labels: they disappear and strain short-term memory, prevent people checking answers before submitting, make errors harder to fix, irritate keyboard users, make fields less noticeable, can be mistaken for pre-filled data, and sometimes must be deleted by hand; even as extra hints, important instructions inside fields carry some of the same problems {{src:nng-form-placeholders}}. WCAG 2.2 requires labels or instructions when content needs input (SC 3.3.2), without cluttering the page {{src:w3c-understanding-labels-instructions}}.",
        "**Reassurance at the point of worry.** Much of Porter's microcopy reduces commitment — 'You can change this at any time', 'You can unsubscribe at any time' — by answering a fear at the exact moment it arises {{src:porter-2009-microcopy}}. Reassurance must be true: 'We'll never share your email' next to a pre-ticked marketing box is misleading microcopy, and manipulative wording such as guilt-tripping opt-outs is a [[deceptive-patterns|deceptive pattern]].",
      ],
      howItWorks: [
        "Identify the moment: what is the person trying to do, and what might they be unsure of?",
        "Pick the right kind of text: a label, a hint, a button, a status message, an empty state.",
        "Write the shortest text that fully answers the question; put the key word first.",
        "Keep words consistent with the rest of the interface and with what happens next.",
        "Make it accessible: labels programmatically associated, link and button text meaningful out of context, no reliance on colour or position {{src:govuk-writing-for-user-interfaces}}.",
        "Test it: do people fill the field correctly and predict what the button does?",
      ],
      implementation: [
        "Keep labels visible and associated with their fields; use placeholders, if at all, only for non-essential examples {{src:nng-form-placeholders}}.",
        "Name buttons by outcome ('Save draft', 'Delete account'); avoid 'OK', 'Yes' and 'Submit' where the outcome matters.",
        "Put hints between the label and the field, so screen readers and sighted users meet them before typing.",
        "Write empty states that explain status and suggest a next step, rather than leaving a blank area {{src:nng-empty-states}}.",
        "Use status messages that assistive technology announces without moving focus (WCAG 4.1.3) {{src:w3c-understanding-status-messages}}.",
        "Store strings centrally with a short note on where each appears and what it must do, so translators and other writers keep its meaning.",
      ],
      scenarios: [
        "A sign-up form's 'Date of birth' field gets frequent errors. The hint 'For example, 27 3 1990' and splitting the field into day, month and year reduce them; the hint alone would not have fixed a single free-text box (illustrative).",
        "A deletion dialog asks 'Are you sure?' with 'OK' and 'Cancel'. Rewritten as 'Delete project “Atlas”? This removes 34 files for everyone in the team.' with 'Delete project' and 'Keep project', people stop deleting by reflex (illustrative).",
        "A banking app shows a tooltip on hover explaining a pending payment. On phones there is no hover, so the explanation moves into visible text under the amount.",
      ],
    },
    advanced: {
      explanation: [
        "**Microcopy and the wider discipline.** Microcopy is where [[ux-writing|UX writing]] becomes visible, but it depends on decisions made above it: terminology chosen across the product, a voice and tone guide, and [[content-design|content design]] decisions about what information belongs in the flow at all. GOV.UK's advice to start with less and add help text only when research shows it is needed {{src:govuk-writing-for-user-interfaces}} is a reminder that some microcopy problems are design problems: if a field needs a paragraph of explanation, the question may be wrong.",
        "**Evidence.** Controlled evidence for specific microcopy choices is limited. The strongest is for forms: in an eye-tracking experiment (N = 65), applying a set of 20 form guidelines to real company forms led to faster completion, fewer submission attempts and higher satisfaction {{src:seckler-2014-web-forms}}; error timing has been studied separately ([[error-messages|error messages]]) {{src:bargas-avila-2007}}. Placeholder guidance comes from usability research reported by NN/g {{src:nng-form-placeholders}}. Much other microcopy advice is professional practice and should be tested in context.",
        "**Consistency across states.** A control's text must stay true in every state: a button that says 'Save' must not save and publish; a toggle labelled 'Notifications' must make clear whether it is on; a busy button ('Saving…') should say what it is doing ([[interaction-states|interaction states]]). Inconsistency between a label and its result is one of the most common sources of mistrust.",
      ],
      evidence: [
        "Applying a set of 20 web-form guidelines (not read here, so their content is not attributed) improved completion time, submission attempts, eye movements and satisfaction in a controlled experiment (N = 65); the effect is of the whole set {{src:seckler-2014-web-forms}}.",
        "NN/g's usability research documents seven problems when placeholders replace labels, including memory strain and difficulty fixing errors {{src:nng-form-placeholders}}.",
        "Porter's checkout example — one line about the billing address removing a recurring payment error — is a practitioner anecdote, not controlled evidence {{src:porter-2009-microcopy}}.",
      ],
      debates: [
        "**Personality in microcopy.** Playful microcopy can make a product feel human; it can also add reading, confuse people reading in a second language and sound wrong when something has gone wrong. Most guidance accepts personality in low-stakes moments and plainness in high-stakes ones {{src:govuk-writing-for-user-interfaces}}.",
        "**Floating labels and other compromises.** Patterns that move labels into or out of fields try to save space while keeping labels visible; NN/g's placeholder findings suggest testing them carefully, especially with keyboard and screen-reader users {{src:nng-form-placeholders}}.",
        "**Help text or better design?** Adding hints is cheap, so it is tempting; GOV.UK advises adding help text only when research shows it is needed {{src:govuk-writing-for-user-interfaces}}.",
      ],
      alternativeModels: [
        "[[error-messages|Error messages]] — the microcopy of failure, with its own rules for placement, specificity and accessibility.",
        "[[empty-states|Empty states]] — the design pattern whose text explains why nothing is shown and what to do.",
        "[[signifiers|Signifiers]] — the wider set of cues, visual and verbal, that show what can be done.",
      ],
    },
  },

  origin: {
    contributors: ["Joshua Porter", "Kinneret Yifrah"],
    period: "Term in practitioner use by 2009; the practice of writing interface labels and messages is older",
    problem:
      "Small interface texts were written last, by whoever built the screen, so people met cryptic labels, vague buttons and silent states at the moments they needed guidance.",
    narrative: [
      "Porter's 2009 post 'Writing microcopy' described small, contextual copy that answers specific questions and reduces people's worries {{src:porter-2009-microcopy}}.",
      "Practitioner books on microcopy followed {{src:yifrah-2017}}, and public-sector design guidance set rules for interface text, such as GOV.UK's guidance on writing for user interfaces {{src:govuk-writing-for-user-interfaces}}.",
    ],
    attributionNote:
      "The sources read do not establish who coined or popularised the term, so no coinage is claimed; Porter's post is cited as an early description.",
  },

  application: {
    summary: [
      "Microcopy appears on every interactive surface; it matters most where people decide, commit, wait or recover.",
    ],
    web: [
      "Form labels and hints, checkout buttons with amounts, link text that makes sense alone, search 'no results' messages.",
    ],
    mobile: [
      "Short labels that survive truncation; permission prompts that explain why; visible text instead of hover tooltips.",
    ],
    enterprise: [
      "Precise names for actions with side effects ('Approve and notify finance'); state labels that match the workflow.",
    ],
    services: [
      "Text messages and email subject lines that continue the interface's words: the same reference, status and next step.",
    ],
    steps: [
      "Find the moment and the question the person has.",
      "Choose the kind of text that answers it: label, hint, button, status, empty state, error.",
      "Write the shortest complete answer, key word first.",
      "Check consistency with the result and with other screens.",
      "Check accessibility: associated labels, meaningful link text, no colour or position references.",
      "Test with people and with assistive technology; revise.",
    ],
  },

  whenToUse: [
    "Wherever a control, field or state could leave someone unsure what to do or what happened.",
    "At moments of commitment: payments, deletions, sharing, sign-ups.",
    "At moments of worry: personal data, irreversible steps, waiting.",
  ],
  whenNotToUse: [
    "To explain an interface that should be simpler — fix the design instead {{src:govuk-writing-for-user-interfaces}}.",
    "To add reassurance that is not true, or wording that pressures people into a choice.",
    "To carry essential information in a tooltip or placeholder that some people will never see.",
  ],
  advantages: [
    "Prevents errors and hesitation at the point of action.",
    "Cheap to change and test.",
    "Builds trust when words match what actually happens.",
    "Makes interfaces more accessible when labels and link text are meaningful.",
  ],
  limitations: [
    "Cannot fix a flow that asks the wrong questions or in the wrong order.",
    "Evidence for specific wording choices is limited and often context-specific.",
    "Short strings are easy to misread in translation without context notes.",
    "Too much microcopy adds reading and clutter.",
  ],
  misconceptions: [
    {
      myth: "Any short interface text is good microcopy.",
      reality:
        "'Submit', 'Invalid' and 'Click here' are short and unhelpful. Good microcopy answers the person's question at that moment.",
    },
    {
      myth: "Placeholders can replace labels to keep forms clean.",
      reality:
        "Disappearing placeholders strain memory, hide what was asked and make errors harder to fix {{src:nng-form-placeholders}}.",
    },
    {
      myth: "Microcopy is the final polish after design.",
      reality:
        "Labels and messages shape how a flow works; writing them late hides naming and sequence problems until they are expensive to fix.",
    },
  ],

  relations: [
    { target: "empty-states", type: "applied-in", note: "Empty states depend on microcopy that explains why nothing is shown and what to do next." },
    { target: "error-messages", type: "related-to", note: "Error messages are the microcopy of failure, with their own rules for placement, specificity and recovery." },
    { target: "signifiers", type: "related-to", note: "Labels and button text are verbal signifiers of what can be done." },
    { target: "visibility-of-system-status", type: "related-to", note: "Status, progress and confirmation messages are microcopy." },
    { target: "deceptive-patterns", type: "contrasts-with", note: "Manipulative wording (guilt-tripping opt-outs, false reassurance) turns microcopy into a deceptive pattern." },
    { target: "form-design", type: "complementary-to", note: "Labels, hints and validation messages are part of form design." },
  ],

  practice: {
    dos: [
      { text: "Keep labels visible and outside the field.", why: "Placeholders that replace labels disappear when typing and cause memory, checking and error-fixing problems {{src:nng-form-placeholders}}.", kind: "industry" },
      { text: "Name buttons by their outcome, including amounts where money is involved.", why: "People need to predict what pressing will do; 'Pay £24.00' answers that, 'Continue' does not.", kind: "context" },
      { text: "Put reassurance where the worry happens.", why: "Microcopy is most useful when it answers a concern at the moment it arises {{src:porter-2009-microcopy}}.", kind: "industry" },
      { text: "Write link text that makes sense on its own.", why: "Screen-reader users often hear links listed out of context; 'click here' is not accessible link text {{src:govuk-writing-for-user-interfaces}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't put essential information only in a tooltip or placeholder.", why: "Placeholders disappear as people type {{src:nng-form-placeholders}}; tooltips that need hover are unavailable on touch screens, so some people never see the information.", kind: "standard" },
      { text: "Don't refer to colour, shape or position ('the green button', 'on the left').", why: "Not everyone perceives them; screen-reader users never see them {{src:govuk-writing-for-user-interfaces}}.", kind: "standard" },
      { text: "Don't use guilt or pressure in opt-out text.", why: "Wording that shames people into a choice is manipulative and erodes trust.", kind: "context" },
    ],
    examples: [
      {
        title: "Microcopy for one form field, every state",
        language: "text",
        code: `FIELD: phone number on a delivery form

Label            Phone number
Hint             We'll text you if the driver can't find your address.
                 (answers "why do you need this?")
Placeholder      — none (hint already explains; no example needed)
Optional marker  (optional)   ← if it is optional, say so in the label
Error: empty     Enter a phone number, or remove the tick for text updates
Error: format    Enter a phone number, like 07700 900 982
Success (later)  Delivery updates will go to 07700 900 982

Accessibility notes
- Label and hint are associated with the input (for example via
  <label for> and aria-describedby), so screen readers read both.
- The error text is associated with the field and repeated in the
  error summary.
- No instruction relies on colour or position.`,
        caption:
          "Illustrative strings for one field. Each piece answers a different question at a different moment: what, why, how, what went wrong, what happened.",
      },
    ],
  },

  exercises: [
    {
      id: "microcopy-ex-labels",
      kind: "critique",
      level: "beginner",
      title: "Correct a sign-up form",
      prompt: [
        "A sign-up form has: fields with placeholders only ('Name', 'Email', 'Password') and no labels; a line under the form, 'Fields in red are required'; a button 'Go'; and a link 'Click here to read our privacy policy'.",
        "List every microcopy problem, including accessibility problems, and rewrite each piece.",
      ],
      deliverable: "A list of problems and a corrected version of each string.",
      criteria: [
        "Adds visible, associated labels instead of placeholder-only fields",
        "Replaces the colour reference with text (mark optional fields, or say what is required)",
        "Names the button by outcome ('Create account')",
        "Rewrites the link so it makes sense alone ('Read our privacy policy')",
        "Adds a password hint stating the rule before people type",
      ],
      exampleSolution: [
        "Labels 'Full name', 'Email address', 'Password' above each field; placeholders removed.",
        "'Fields in red are required' → mark the optional field '(optional)' instead; colour cannot carry meaning alone.",
        "Password hint: 'At least 12 characters'. Button: 'Create account'. Link: 'Read our privacy policy'.",
      ],
    },
    {
      id: "microcopy-ex-dialog",
      kind: "scenario",
      level: "intermediate",
      title: "Compare wording for a destructive action",
      prompt: [
        "A project tool shows this when someone deletes a project: title 'Are you sure?', body 'This action cannot be undone.', buttons 'OK' and 'Cancel'. Support reports that people delete the wrong project.",
        "Propose new wording and justify each choice. Then say whether wording alone is enough.",
      ],
      deliverable: "New title, body and buttons, with a justification, and a design recommendation beyond words.",
      criteria: [
        "Names the specific object and consequence (project name, files, who is affected)",
        "Uses outcome-named buttons ('Delete project' / 'Keep project')",
        "Recognises that a confirmation people see constantly becomes a reflex, and proposes undo or a recoverable delete where possible",
      ],
      exampleSolution: [
        "Title: 'Delete “Atlas”?'. Body: 'This removes 34 files for all 6 members.' Buttons: 'Delete project' and 'Keep project'.",
        "Words help people notice which project they chose, but if deletions are frequent the stronger fix is a trash or undo period, so the dialog is not the only protection ([[user-control-and-freedom]]).",
      ],
    },
    {
      id: "microcopy-ex-reassure",
      kind: "assignment",
      level: "advanced",
      title: "Write and test reassurance",
      prompt: [
        "On a mortgage-application form, 40 % of people abandon at the step that asks for their employer's phone number (illustrative figure).",
        "Write microcopy to address the likely worry, plan a small test to check it, and say what result would show it worked — and what would show the problem is not words at all.",
      ],
      deliverable: "Microcopy, a test plan and success and failure criteria.",
      criteria: [
        "Answers a specific worry truthfully (when and why the employer is contacted)",
        "Places the text beside the field, not in a tooltip",
        "Plans a behavioural test (completion of the step) plus comprehension questions",
        "States what would show the question itself should change (for example, people lack the number)",
      ],
      exampleSolution: [
        "Hint: 'We only call to confirm you work there, after you accept an offer. We won't discuss your application.' (Only if this is true.)",
        "Test: compare completion of the step with and without the hint, and ask five people what will happen if they enter the number. If completion stays low and people say they do not know the number, the fix is to accept the employer's name and look the number up — a design change, not a wording change.",
      ],
    },
  ],

  quiz: [
    {
      id: "microcopy-q-placeholder",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Why should a placeholder not replace a field label?",
      options: [
        { text: "It disappears when people type, so they can lose track of what was asked and cannot check or fix answers easily.", correct: true, explanation: "NN/g lists memory strain and difficulty checking and fixing errors among seven problems." },
        { text: "Placeholders are not allowed by HTML.", correct: false, explanation: "They are allowed; they are just not labels." },
        { text: "Placeholders make forms look cluttered.", correct: false, explanation: "Replacing labels with placeholders is usually done to reduce clutter — that is the trap." },
        { text: "Placeholders cannot be translated.", correct: false, explanation: "They can be translated; translation is not the issue." },
      ],
      explanation: "Keep labels visible; use placeholders, if at all, for non-essential examples.",
    },
    {
      id: "microcopy-q-button",
      kind: "scenario",
      level: "intermediate",
      prompt:
        "On the last step of a subscription sign-up, which button text is best?",
      options: [
        { text: "Start subscription — £8 a month", correct: true, explanation: "It names the outcome and the cost at the moment of commitment." },
        { text: "Continue", correct: false, explanation: "It hides that this step charges the card." },
        { text: "Let's go!", correct: false, explanation: "Enthusiasm without information." },
        { text: "Submit", correct: false, explanation: "System language that predicts nothing." },
      ],
      explanation: "Commitment buttons should say what will happen, including money.",
      revise: "ux-writing",
    },
    {
      id: "microcopy-q-short",
      kind: "true-false",
      level: "beginner",
      prompt: "The shorter a piece of microcopy is, the better it is.",
      options: [
        { text: "True", correct: false, explanation: "'Submit' is short and unhelpful; sometimes one extra sentence prevents an error." },
        { text: "False", correct: true, explanation: "Microcopy is judged by whether it answers the person's question at that moment." },
      ],
      explanation: "Aim for the shortest complete answer, not the shortest text.",
    },
    {
      id: "microcopy-q-tooltip",
      kind: "critique",
      level: "advanced",
      prompt:
        "A banking app explains, only in a hover tooltip, that a 'Pending' payment can still be cancelled. What is the main problem?",
      options: [
        { text: "Essential information is hidden where touch and some keyboard users may never see it; it should be visible near the status.", correct: true, explanation: "Hover does not exist on touch screens; essential guidance belongs in visible text." },
        { text: "Tooltips should use more formal language.", correct: false, explanation: "Tone is not the problem; visibility is." },
        { text: "'Pending' should be in capitals.", correct: false, explanation: "Capitals do not make information discoverable." },
        { text: "There is no problem if the tooltip is well written.", correct: false, explanation: "Well-written text that people cannot see does not help them." },
      ],
      explanation: "Put information people need to act in visible text.",
    },
  ],

  flashcards: [
    { id: "microcopy-fc-1", front: "Microcopy", back: "Short, contextual interface text — labels, hints, buttons, status, empty states, errors — answering the question a person has at that moment." },
    { id: "microcopy-fc-2", front: "Question each kind answers", back: "Label: what is this? Hint: how/why? Button: what will happen? Status: did it work? Empty state: why nothing? Error: what went wrong and how to fix?" },
    { id: "microcopy-fc-3", front: "Placeholder vs label", back: "Labels stay visible and associated; placeholders disappear and should never replace labels." },
    { id: "microcopy-fc-4", front: "Accessible link text", back: "Makes sense on its own when read out of context — never 'click here'." },
    { id: "microcopy-fc-5", front: "Microcopy vs UX writing", back: "Microcopy is the output (the strings); UX writing is the discipline that decides and designs them." },
  ],

  references: [
    { source: "porter-2009-microcopy", role: "primary", note: "Read: an early post describing microcopy (anecdotal)." },
    { source: "yifrah-2017", role: "further", note: "Bibliographic record only; not read." },
    { source: "nng-form-placeholders", role: "primary", note: "Read: seven problems with placeholders replacing labels." },
    { source: "w3c-understanding-labels-instructions", role: "standard", note: "Read: WCAG 2.2 SC 3.3.2." },
    { source: "w3c-understanding-status-messages", role: "standard", note: "WCAG 2.2 SC 4.1.3 status messages." },
    { source: "govuk-writing-for-user-interfaces", role: "primary", note: "Read: interface writing guidance, link text, colour and position references." },
    { source: "nng-empty-states", role: "explanatory", note: "Empty states and their messages." },
    { source: "seckler-2014-web-forms", role: "explanatory", note: "Abstract read: effect of a set of form guidelines." },
    { source: "bargas-avila-2007", role: "explanatory", note: "Abstract read: timing of error messages in forms." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Microcopy guidance is mostly professional practice (GOV.UK, NN/g, practitioner writing), with WCAG success criteria for labels and status messages and limited experimental evidence for forms (a set of guidelines studied together). The origin story is a practitioner anecdote. Specific wording choices should be tested in context.",

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
