import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "ux-writing",
  slug: "ux-writing",
  title: "UX Writing",
  alternateNames: ["Interface writing", "Product writing", "UX copywriting", "Content design for interfaces"],
  summary:
    "The design of the words people read and act on inside a product — labels, buttons, messages and instructions — so that they can predict what will happen, act, and understand the result.",
  definition:
    "UX writing is the practice of designing the language of an interface. NN/g describes it as writing carefully considered information that addresses people's contexts, needs and behaviours, using many of the same skills as visual and interaction design but working with words instead of pixels {{src:nng-ux-writing-study-guide}}. Its material is the text a person meets while using a product: names of things, labels, buttons, instructions, status and error messages, confirmations and empty states. Its aim is **task success and understanding**, not persuasion. That separates it from marketing and brand copywriting, which aim to attract and convince, and from editorial writing, which is read for its own sake. The short pieces of text it produces are often called [[microcopy|microcopy]]; the wider practice of deciding what content is needed at all, and in what form, is [[content-design|content design]].",
  primaryType: "discipline",
  secondaryTypes: [],
  domain: "content",
  subcategory: "writing",
  tags: ["interface writing", "microcopy", "voice and tone", "terminology", "labels", "messages"],
  difficulty: "beginner",
  disciplines: ["UX writing", "Interaction design", "Content design", "Technical communication"],
  learningObjectives: [
    "Explain how interface words help people predict an action and interpret its result.",
    "Distinguish UX writing from marketing copywriting, content design and general editorial writing.",
    "Choose a tone for a moment in an interaction, within a consistent voice.",
    "Evaluate interface words with users rather than by preference.",
  ],
  prerequisites: ["user-experience"],

  levels: {
    beginner: {
      explanation: [
        "Every product talks. A button says what will happen if you press it; a message says what just happened; a label says what to type. When those words are clear, people barely notice them. When they are vague ('Submit', 'Something went wrong', 'Invalid input'), people stop, guess or give up.",
        "UX writing is designing those words on purpose. A UX writer asks what the person is trying to do at this exact moment, what they need to know to do it, and which words they would use themselves. GOV.UK's guidance puts the goal simply: be as clear as possible and use the same language as your users, which reduces mistakes and helps people who struggle with reading or have limited English {{src:govuk-writing-for-user-interfaces}}.",
        "It is not advertising. A checkout page needs 'Pay £42.50', not 'Unlock your amazing new look!'. Persuasive or boastful language belongs to marketing; inside a task it gets in the way. In an early NN/g study, rewriting promotional web copy in neutral, objective language made the same site measurably easier to use {{src:nielsen-1997-how-users-read}}.",
      ],
      analogy:
        "Road signs are written for a driver moving at speed: one idea, the driver's own words, at the moment of decision. 'Exit 12 — Airport' works; a paragraph about the airport's history would not, however well written.",
      everydayExamples: [
        "A banking app's button reads 'Send £50 to Sam' instead of 'Confirm', so you know exactly what pressing it will do.",
        "A photo app asks 'Delete 3 photos? They'll stay in Recently deleted for 30 days.' — the second sentence answers the fear the first one raises.",
        "A sign-up form says 'We'll use your phone number only for delivery updates' beside the field that asks for it.",
      ],
      vocabulary: [
        { term: "UX writing", meaning: "Designing the words people read and act on inside a product." },
        { term: "Microcopy", meaning: "The short pieces of interface text: labels, buttons, hints, messages." },
        { term: "Voice", meaning: "The consistent personality of a product's language." },
        { term: "Tone", meaning: "How that voice adapts to the moment and the reader's state." },
        { term: "Terminology", meaning: "The agreed names for things in a product, used the same way everywhere." },
      ],
    },
    intermediate: {
      explanation: [
        "**Words bridge the two gulfs.** Before acting, a person needs to know what an action will do; afterwards, whether it worked ([[gulfs-of-execution-and-evaluation|the gulfs of execution and evaluation]]). Labels and buttons carry the first job: 'Send £50 to Sam' predicts the outcome, 'Submit' does not. Status, confirmation and error messages carry the second: '£50 sent to Sam Jones' confirms in the same words the button used ([[feedback-principle|feedback]]). Writing for the moment means knowing which job a piece of text is doing.",
        "**People scan.** Nielsen reported that 79 % of test users always scanned new pages and only 16 % read word by word; in the same work, a concise version of a site measured 58 % better in usability than a promotional control, a scannable version 47 %, an objective one 27 %, and all three combined 124 % {{src:nielsen-1997-how-users-read}}. These are 1997 figures from one study, but the direction has guided interface writing since: put the important words first and cut the rest. GOV.UK goes further: start with less, add help text only if research shows it is needed, and if you must explain how the interface works, fix the interface instead {{src:govuk-writing-for-user-interfaces}}.",
        "**Voice is constant; tone moves.** Mailchimp's style guide describes a voice that stays the same while tone changes with the situation and the reader's emotional state {{src:mailchimp-voice-and-tone}}. NN/g describes tone along four dimensions — formal–casual, serious–funny, respectful–irreverent, matter-of-fact–enthusiastic — and warns that humour can irritate people who are already frustrated {{src:nng-tone-of-voice}}. GOV.UK, writing for people who may be under stress, rules out humorous error messages entirely {{src:govuk-writing-for-user-interfaces}}.",
      ],
      howItWorks: [
        "Start from the task and the moment: what the person is trying to do, what they already know, and what they need next.",
        "Use their words. Search terms, support tickets and research transcripts show what people call things; GOV.UK suggests checking whether more people search for 'lorry' or 'heavy goods vehicle' {{src:govuk-clear-language}}.",
        "Name actions by their outcome ('Send', 'Delete 3 photos', 'Book appointment') and keep the same name from button to confirmation.",
        "Fix terminology once and reuse it: if it is a 'basket' on one screen, it is not a 'cart' on the next ([[consistency-principle|consistency]]).",
        "Test the words with people, in context, before polishing them.",
      ],
      implementation: [
        "Write with real content in the design from the start; placeholder text hides problems with length, order and meaning.",
        "Keep a shared terminology list and a voice and tone guide, with examples for success, warning, error and empty moments.",
        "Write for every state the design has — loading, empty, error, partial, success — not only the happy path.",
        "Review strings with accessibility in mind: link and button text that makes sense out of context, no instructions that rely on colour or position ('click the green button') {{src:govuk-writing-for-user-interfaces}}.",
        "Plan for translation: avoid idioms and puns, leave room for longer strings, and never assemble sentences from fragments.",
      ],
      scenarios: [
        "A subscription screen's button says 'Continue'. Pressing it charges the card. Changing it to 'Start subscription — £8/month' reduced the uncertainty at the moment of commitment (illustrative).",
        "A health app's team wants a playful voice. The writer keeps it for onboarding and success states, and writes appointment-cancellation and test-result messages in a plain, serious tone, because the reader's state changes even though the brand does not.",
        "A product calls the same thing 'workspace', 'project' and 'board' in different screens. The writer runs a terminology audit, picks the word customers use in support tickets, and updates every string together.",
      ],
    },
    advanced: {
      explanation: [
        "**UX writing, content design and copywriting.** The boundaries are contested and job titles vary by organisation. A useful working distinction: UX writing designs the words *within* an interface and its flows; [[content-design|content design]] starts earlier, asking what content is needed, for which user need, in what format and channel — a page, a tool, a form or no content at all {{src:winters-2019-what-is-content-design}}; content strategy plans the creation, delivery and governance of content across an organisation {{src:nng-content-strategy}}; marketing copywriting persuades. One person often does several of these. What matters is that someone owns the words in the product, with research behind them.",
        "**History.** Interface words were a usability concern long before the job title. In 1982 Shneiderman argued that for novice users 'the system appears only in the form of the messages on their screens', and that violent, vague or coded messages discourage them {{src:shneiderman-1982}}. Web-writing research in the 1990s showed that people scan and dislike promotional language {{src:nielsen-1997-how-users-read}}. Porter's 2009 post on microcopy drew attention to the smallest interface text {{src:porter-2009-microcopy}}, and practitioner books on UX writing followed {{src:podmajersky-2019}}.",
        "**Evaluation.** Words are designed, so they are tested like other design decisions: usability testing with realistic tasks, comprehension or paraphrase tests ('in your own words, what will happen if you press this?') {{src:digitalgov-test-for-understanding}}, tracking how often each error message is shown {{src:govuk-error-message}}, support-contact themes, and A/B tests where traffic allows. Preference ('which do you like better?') is weak evidence; whether people do the right thing and can say what will happen is strong evidence.",
      ],
      evidence: [
        "In NN/g's 1997 web-writing study, versions of the same site that were concise, scannable and objective scored 58 %, 47 % and 27 % higher in measured usability than a promotional control, and 124 % higher combined; 79 % of test users scanned rather than read word by word {{src:nielsen-1997-how-users-read}}. The study is old and reported by its authors; sample sizes are not given on the page.",
        "In an online survey of 50 respondents, changing only the tone of otherwise identical samples produced statistically significant but small differences in perceived friendliness and formality — about half a point to one point on a five-point scale {{src:nng-tone-of-voice}}.",
        "Applying a set of 20 form guidelines to real company forms led to faster completion, fewer submission attempts and higher satisfaction in a controlled experiment (N = 65) {{src:seckler-2014-web-forms}}. The guidelines themselves were not read for this entry, so the effect cannot be attributed to wording; it is the effect of the whole set.",
      ],
      debates: [
        "**Personality or plainness?** Brand voice guides encourage personality; public-service guidance says 'aim to be boring' and avoid humour where people may be stressed {{src:govuk-writing-for-user-interfaces}}. The evidence on tone shows real but small effects on perception {{src:nng-tone-of-voice}}; clarity failures stop tasks. Most teams resolve it by letting personality show only where it costs nothing.",
        "**Short or complete?** 'Fewer words' is a strong default {{src:govuk-writing-for-user-interfaces}}, but cutting the one sentence that answers a person's worry ('you won't be charged until…') can cost more than it saves. Length should follow the question the reader has at that moment.",
        "**Writer or designer?** Some teams treat words as a final polish by a writer; others insist words are drafted with the first sketch. Winters argues for working with design from the start rather than editing at the end {{src:winters-2019-what-is-content-design}}; many interface problems are naming and sequencing problems that are expensive to fix late.",
      ],
      alternativeModels: [
        "[[content-design|Content design]] — the wider practice of meeting a user need with the right content in the right form.",
        "Technical writing — documentation and help that people read outside the flow of a task ([[help-and-documentation|help and documentation]]).",
        "Marketing copywriting — persuasion and brand expression, outside the task.",
        "[[information-architecture|Information architecture]] — the structure and labels of navigation, where naming decisions overlap with UX writing.",
      ],
    },
  },

  origin: {
    contributors: ["Ben Shneiderman", "Jakob Nielsen", "Joshua Porter", "Torrey Podmajersky"],
    period: "Interface messages studied from the early 1980s; web writing research in the 1990s; established as a named practice from the late 2000s",
    problem:
      "Products were designed visually and technically while their words were left to whoever wrote the code or the marketing copy, so people met jargon, codes and vague labels at the moments that mattered most.",
    narrative: [
      "Shneiderman argued in 1982 that system messages shape how novices see a computer, and that hostile, vague or coded messages discourage them {{src:shneiderman-1982}}.",
      "In the 1990s, NN/g's studies of web reading reported scanning and the cost of promotional language {{src:nielsen-1997-how-users-read}}.",
      "In 2009, Porter's post on microcopy described how a single line of interface text could remove a recurring problem {{src:porter-2009-microcopy}}; dedicated UX-writing roles and books followed {{src:podmajersky-2019}}, alongside public-sector interface writing guidance such as GOV.UK's {{src:govuk-writing-for-user-interfaces}}.",
    ],
    attributionNote:
      "No single person founded UX writing. The dates for the job title's spread are not documented in the sources read for this entry, so none are given.",
  },

  application: {
    summary: [
      "UX writing applies wherever people act through words: apps, websites, devices, services, and the messages that connect them.",
    ],
    web: [
      "Navigation labels, page titles and headings that predict what follows; calls to action named by outcome.",
      "Form labels, hints and error messages that make sense when read alone by a screen reader.",
    ],
    mobile: [
      "Very short strings for small screens and buttons; front-load the important word, because truncation cuts the end.",
      "Permission requests that say why access is needed, at the moment it is needed.",
    ],
    enterprise: [
      "Consistent terminology across modules and roles; precise names for states such as 'Draft', 'Submitted', 'Approved'.",
      "Messages for experts that are short but still specific about what happened and what to do.",
    ],
    services: [
      "Letters, texts and emails that continue the language of the digital service, so a reference or status means the same thing everywhere.",
    ],
    steps: [
      "Understand the task, the moment and the reader's state.",
      "Collect the words people use: research, search terms, support contacts.",
      "Draft words in the design from the first sketch, for every state.",
      "Name actions by outcome and keep names consistent from action to result.",
      "Choose tone for the moment within the product's voice.",
      "Test comprehension and task success; revise.",
    ],
  },

  whenToUse: [
    "Whenever an interface asks people to decide, act or understand a result.",
    "When support contacts or errors cluster around a step, a label or a message.",
    "When the same thing is named differently in different parts of a product.",
  ],
  whenNotToUse: [
    "As a substitute for fixing a confusing interaction: if the words have to explain how the interface works, change the interface {{src:govuk-writing-for-user-interfaces}}.",
    "As a late polish on finished screens; naming and sequence problems need to be solved while the design is still changing.",
    "For deciding what content should exist at all — that is content design.",
  ],
  advantages: [
    "Reduces errors, hesitation and support contacts at the moments that matter.",
    "Makes products more accessible to people who struggle with reading or have limited English.",
    "Creates consistent terminology that helps people learn and trust a product.",
    "Cheap to change and to test compared with interaction or visual redesign.",
  ],
  limitations: [
    "Words cannot rescue a flow that asks for the wrong things in the wrong order.",
    "Strong evidence about specific wording choices is scarce; most guidance is professional practice.",
    "Small wording effects are hard to measure without large samples.",
    "Voice and tone guidance can drift into personality that hinders clarity.",
  ],
  misconceptions: [
    {
      myth: "UX writing is copywriting for apps.",
      reality:
        "Copywriting aims to persuade; UX writing aims to help people complete tasks and understand results. Promotional language inside a task made a site measurably harder to use in NN/g's study {{src:nielsen-1997-how-users-read}}.",
    },
    {
      myth: "Good UX writing is witty.",
      reality:
        "Tone should fit the moment. Humour can irritate people who are frustrated, and public services avoid it in error messages altogether {{src:nng-tone-of-voice}} {{src:govuk-writing-for-user-interfaces}}.",
    },
    {
      myth: "Shorter is always better.",
      reality:
        "Shorter is a strong default, but the right length is whatever answers the reader's question at that moment — sometimes one extra sentence prevents a mistake or an abandoned task.",
    },
  ],

  relations: [
    { target: "microcopy", type: "applied-in", note: "Microcopy — labels, buttons, hints and messages — is the main output of UX writing." },
    { target: "content-design", type: "related-to", note: "Content design decides what content is needed and in what form; UX writing designs the words within the interface. The boundary overlaps and titles vary." },
    { target: "gulfs-of-execution-and-evaluation", type: "related-to", note: "Labels help people predict an action (execution); messages help them interpret the result (evaluation)." },
    { target: "feedback-principle", type: "related-to", note: "UX writing supplies the words of feedback: confirmations, status and error messages." },
    { target: "tone-of-voice", type: "related-to", note: "Voice stays consistent while tone adapts to the moment and the reader's state." },
    { target: "usability-testing", type: "measured-by", note: "Interface words are evaluated by whether people complete tasks and understand results." },
  ],

  practice: {
    dos: [
      { text: "Name buttons by what they do ('Send £50', 'Delete 3 photos').", why: "An outcome-based label lets people predict the result before acting; generic labels ('Submit', 'OK') do not.", kind: "context" },
      { text: "Use the words your users use, found in research, search terms and support contacts.", why: "GOV.UK asks writers to use the same language as users, which reduces mistakes and helps people with limited English {{src:govuk-writing-for-user-interfaces}}.", kind: "industry" },
      { text: "Keep the same name for a thing from action to confirmation.", why: "Matching words let people check that what happened is what they asked for.", kind: "context" },
      { text: "Match tone to the reader's state, within one voice.", why: "Tone should change with the situation while the voice stays the same {{src:mailchimp-voice-and-tone}}; humour can irritate frustrated users {{src:nng-tone-of-voice}}.", kind: "industry" },
    ],
    donts: [
      { text: "Don't use promotional language inside a task.", why: "Boastful, subjective copy reduced measured usability compared with objective wording in NN/g's study {{src:nielsen-1997-how-users-read}}.", kind: "industry" },
      { text: "Don't refer to colour, shape or position ('click the green button').", why: "Not everyone perceives them, and screen-reader users never see them {{src:govuk-writing-for-user-interfaces}}.", kind: "standard" },
      { text: "Don't use words to explain an interface that should explain itself.", why: "If you have to explain how the interface works, GOV.UK advises fixing the interface {{src:govuk-writing-for-user-interfaces}}.", kind: "industry" },
    ],
    examples: [
      {
        title: "One transfer flow: before and after, by moment",
        language: "text",
        code: `MOMENT            BEFORE                          AFTER
Choose action     Transfer                        Send money
Field label       Amt                             Amount
Hint              —                               Arrives in about 2 hours
Button            Submit                          Send £50 to Sam Jones
In progress       Processing…                     Sending £50…
Success           Transaction successful          £50 sent to Sam Jones
                                                  Reference: RENT-MAY
Error (balance)   Error 51: insufficient funds    You have £32.10. Send a smaller
                                                  amount or add money first.

What changed
- Names describe outcomes and stay the same from button to result ("Send", "£50", "Sam Jones").
- The hint answers the question people have before sending (when will it arrive?).
- The error says what is true, what to do, and keeps the person in the flow.`,
        caption:
          "Illustrative bank-transfer strings. Each 'after' does a specific job at its moment: predict, guide, reassure, confirm or recover.",
      },
    ],
  },

  exercises: [
    {
      id: "ux-writing-ex-rewrite",
      kind: "critique",
      level: "beginner",
      title: "Correct the strings in a booking flow",
      prompt: [
        "A clinic's booking flow uses these strings. Rewrite each one so a patient knows what will happen or what to do. Keep your versions short.",
        "(a) Button on the last step: 'Submit'. (b) Field label: 'DOB'. (c) Success page heading: 'Request processed'. (d) Link at the bottom of a page: 'Click here'. (e) Message when no times are free: 'No results'.",
      ],
      deliverable: "Five rewritten strings, each with one sentence saying which job it does (predict, guide, confirm, recover).",
      criteria: [
        "The button names the outcome (for example, 'Book appointment')",
        "The label is spelled out ('Date of birth')",
        "Success confirms the specific booking (day, time, clinician)",
        "The link text makes sense on its own",
        "The empty message offers a next step",
      ],
      exampleSolution: [
        "(a) 'Book appointment' — predicts what pressing it does.",
        "(b) 'Date of birth' — the abbreviation is unnecessary and may be unfamiliar.",
        "(c) 'Appointment booked: Tuesday 14 May, 9:40, Dr Okafor' — confirms in the words the person chose.",
        "(d) 'Read the cancellation policy' — makes sense when read alone by a screen reader.",
        "(e) 'No appointments this week. Try next week or join the waiting list.' — explains and offers a way forward.",
      ],
    },
    {
      id: "ux-writing-ex-copy-vs-ux",
      kind: "critique",
      level: "intermediate",
      title: "Separate persuasion from the task",
      prompt: [
        "A checkout page for an online shop contains: heading 'Almost there — you're going to LOVE this!'; under the card field, 'Our state-of-the-art, world-class security keeps you safe'; button 'Let's do this! 🚀'; and a line at the bottom in small grey text: 'You will be charged £42.50 including delivery'.",
        "Decide what to keep, cut, move or rewrite, and justify each decision in terms of the person's task at this step.",
      ],
      deliverable: "A revised page outline and a short rationale for each change.",
      criteria: [
        "Moves the charge information to where the decision is made (the button or beside it)",
        "Replaces promotional claims with specific facts or removes them",
        "Names the button by its outcome and amount",
        "Keeps any brand personality where it does not compete with the task",
      ],
      exampleSolution: [
        "Heading: 'Check and pay' — tells people where they are.",
        "Security line: replace with something specific and true, such as 'Card details are encrypted', or remove it; boastful claims reduce credibility and add reading.",
        "Button: 'Pay £42.50' — the amount people need at the moment of commitment; this also makes the grey line at the bottom unnecessary.",
        "Personality can live on the confirmation page ('Thanks — your order is on its way'), where it does not compete with a decision.",
      ],
    },
    {
      id: "ux-writing-ex-tone",
      kind: "scenario",
      level: "advanced",
      title: "Choose tone for three moments in one product",
      prompt: [
        "A fitness app has a casual, encouraging voice. Write the message for (a) completing a first workout, (b) a payment failing for the annual plan, and (c) a heart-rate reading outside the safe range during exercise.",
        "For each, state where it sits on the four tone dimensions (formal–casual, serious–funny, respectful–irreverent, matter-of-fact–enthusiastic) and why.",
      ],
      deliverable: "Three messages with their tone profile and a one-line justification each.",
      criteria: [
        "Tone shifts with the reader's state while staying recognisably the same product",
        "The payment message says what happened and what to do, without humour",
        "The health message is serious, specific and action-first",
        "Justifications refer to the reader's state and the consequences of misunderstanding",
      ],
      exampleSolution: [
        "(a) 'First workout done. Nice start.' — casual, slightly enthusiastic; low stakes, positive moment.",
        "(b) 'Your card was declined, so your plan hasn't renewed. Update your card to keep your history and plans.' — casual but serious and matter-of-fact; money and loss are at stake.",
        "(c) 'Your heart rate is 185 bpm. Stop exercising and rest. If you feel chest pain or dizziness, call emergency services.' — formal enough to be taken seriously, fully serious and matter-of-fact; misunderstanding could cause harm. (Illustrative: real health thresholds and wording must come from clinicians.)",
      ],
    },
  ],

  quiz: [
    {
      id: "ux-writing-q-button",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "On the last step of a money transfer, which button label best follows UX writing practice?",
      options: [
        { text: "Send £50 to Sam Jones", correct: true, explanation: "It names the outcome, the amount and the recipient, so people can predict and check what will happen." },
        { text: "Submit", correct: false, explanation: "It says nothing about what will happen." },
        { text: "Let's go!", correct: false, explanation: "Personality without information at a moment of commitment." },
        { text: "Confirm transaction request", correct: false, explanation: "System language; it does not say what is being sent or to whom." },
      ],
      explanation: "Name actions by their outcome, in the user's words.",
    },
    {
      id: "ux-writing-q-copy",
      kind: "true-false",
      level: "beginner",
      prompt: "Persuasive marketing language inside a task can make the task harder to complete.",
      options: [
        { text: "True", correct: true, explanation: "In NN/g's study, replacing promotional language with objective wording measurably improved usability of the same content." },
        { text: "False", correct: false, explanation: "Promotional language adds reading and reduces credibility at the moment people need facts." },
      ],
      explanation: "UX writing aims at task success; persuasion belongs outside the task.",
    },
    {
      id: "ux-writing-q-tone",
      kind: "scenario",
      level: "intermediate",
      prompt:
        "A playful brand wants its error messages to say 'Whoops! Our hamsters fell off the wheel 🐹'. The errors include failed payments. What is the best response?",
      options: [
        { text: "Keep the voice recognisable but make error tone serious and specific: say what happened and what to do.", correct: true, explanation: "Tone should change with the reader's state; humour can irritate people who are frustrated, and it carries no information." },
        { text: "Use the joke everywhere — consistency of voice matters most.", correct: false, explanation: "Voice consistency does not mean the same tone in every moment." },
        { text: "Remove all personality from the whole product.", correct: false, explanation: "Personality can stay where it does not compete with a task or a worry." },
        { text: "Show the error code instead, so the message stays neutral.", correct: false, explanation: "A code is neutral but useless: it does not say what happened or what to do." },
      ],
      explanation: "Voice is constant; tone adapts to the moment.",
      revise: "tone-of-voice",
    },
    {
      id: "ux-writing-q-evaluate",
      kind: "critique",
      level: "advanced",
      prompt:
        "A team chooses between two button labels by asking 20 colleagues which they prefer. What is the main weakness of this evaluation?",
      options: [
        { text: "Preference among colleagues says little about whether users understand what will happen and act correctly.", correct: true, explanation: "Test with representative users: can they say what pressing it will do, and do they complete the task?" },
        { text: "Twenty people is always too few.", correct: false, explanation: "Sample size matters, but the larger problem is asking the wrong people the wrong question." },
        { text: "Button labels cannot be tested.", correct: false, explanation: "They can be tested with comprehension tests, usability tests and, with enough traffic, A/B tests." },
        { text: "They should have counted the characters instead.", correct: false, explanation: "Length is not a measure of understanding." },
      ],
      explanation: "Evaluate words by understanding and task success with real users, not by preference.",
      revise: "usability-testing",
    },
  ],

  flashcards: [
    { id: "ux-writing-fc-1", front: "UX writing vs marketing copywriting", back: "UX writing helps people complete tasks and understand results; copywriting persuades and expresses the brand." },
    { id: "ux-writing-fc-2", front: "Voice vs tone", back: "Voice is the product's consistent personality; tone adapts it to the moment and the reader's state." },
    { id: "ux-writing-fc-3", front: "Which two jobs do interface words do?", back: "Help people predict an action (labels, buttons) and interpret its result (status, confirmation, error)." },
    { id: "ux-writing-fc-4", front: "NN/g 1997: what improved usability?", back: "Concise (+58 %), scannable (+47 %), objective (+27 %), all three (+124 %) versus promotional copy — one early study." },
    { id: "ux-writing-fc-5", front: "How should interface words be evaluated?", back: "By whether representative users understand what will happen and complete the task — not by preference." },
  ],

  references: [
    { source: "nng-ux-writing-study-guide", role: "explanatory", note: "Read: NN/g definition of UX writing." },
    { source: "govuk-writing-for-user-interfaces", role: "primary", note: "Read: GOV.UK Service Manual guidance on interface writing." },
    { source: "nielsen-1997-how-users-read", role: "primary", note: "Read: scanning and the effects of concise, scannable and objective writing (1997 study)." },
    { source: "nng-tone-of-voice", role: "explanatory", note: "Read: four tone dimensions and a small survey of perceived tone." },
    { source: "mailchimp-voice-and-tone", role: "further", note: "Read: an example voice and tone guide." },
    { source: "shneiderman-1982", role: "primary", note: "Opening read: system messages and novice users." },
    { source: "porter-2009-microcopy", role: "explanatory", note: "Read: early post on microcopy." },
    { source: "podmajersky-2019", role: "further", note: "Bibliographic record only; not read." },
    { source: "winters-2019-what-is-content-design", role: "explanatory", note: "Read: content design as a wider practice." },
    { source: "nng-content-strategy", role: "explanatory", note: "Read: definition of content strategy (Halvorson)." },
    { source: "govuk-clear-language", role: "explanatory", note: "Read: using users' words, from search terms." },
    { source: "digitalgov-test-for-understanding", role: "explanatory", note: "Read: paraphrase and usability testing of content." },
    { source: "govuk-error-message", role: "explanatory", note: "Read: tracking how often error messages are shown." },
    { source: "seckler-2014-web-forms", role: "explanatory", note: "Abstract read: effect of a set of form guidelines." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "UX writing rests mainly on professional guidance from public-sector design teams, research consultancies and company style guides, supported by a small number of studies: NN/g's 1997 web-writing study (practitioner-reported), a small tone survey, and an experiment on a set of form guidelines in which wording was one factor among many. Controlled evidence about specific wording choices is scarce, so the entry presents most guidance as practice, not as established findings.",

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
