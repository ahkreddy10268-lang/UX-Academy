import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "plain-language",
  slug: "plain-language",
  title: "Plain Language",
  alternateNames: ["Plain English", "Plain writing", "Clear language", "Clear communication"],
  summary:
    "Communication designed so that its intended readers can find what they need, understand it and use it — judged by what those readers can do, not by how short or simple the words look.",
  definition:
    "Plain language is a **principle of communication** defined by its outcome for readers. The International Plain Language Federation's definition, quoted by the Plain Language Association International, is: 'A communication is in plain language if its wording, structure, and design are so clear that the intended audience can easily find what they need, understand what they find, and use that information' {{src:plain-what-is-plain-language}}. The US Plain Writing Act of 2010 defines plain writing for federal documents as writing that is 'clear, concise, well-organized, and follows other best practices appropriate to the subject or field and intended audience' {{src:plain-writing-act-2010}}, and ISO published a plain-language standard in 2023, ISO 24495-1 {{src:iso-24495-1-2023}}. The definition covers **wording, structure and design** — not only vocabulary — and is relative to an **intended audience**: plain language for surgeons is not plain language for patients.",
  primaryType: "principle",
  secondaryTypes: [],
  domain: "content",
  subcategory: "writing",
  tags: ["plain English", "readability", "comprehension", "accessibility", "active voice", "jargon", "testing"],
  difficulty: "beginner",
  disciplines: ["Content design", "UX writing", "Accessibility", "Public administration", "Law"],
  learningObjectives: [
    "Define plain language by its outcome for an intended audience, not by word or sentence length.",
    "Revise text for structure, wording and design without losing meaning or precision.",
    "Explain what readability formulas can and cannot tell you.",
    "Test whether readers actually understand and can use a text.",
  ],
  prerequisites: ["ux-writing"],

  levels: {
    beginner: {
      explanation: [
        "A letter says: 'Failure to remit payment within the stipulated period may result in the imposition of additional charges.' A reader has to work out what it means: pay on time or you will be charged more. Plain language means writing the second version in the first place — 'Pay by 30 June or we'll add a £20 late fee' — so that people know what to do without decoding.",
        "It is not 'dumbing down'. Plain language keeps all the meaning and the precision — the date, the amount, the consequence — and removes the work of getting to it. GOV.UK reports research on legal language in which most people preferred clear English, and the preference was stronger for more complex issues and for more educated and specialist readers {{src:govuk-clear-language}}. NN/g found that domain experts in science, technology and medicine also wanted succinct, scannable content {{src:nng-plain-language-experts}}.",
        "Plain language is about the reader. The same text can be plain for one audience and not for another. The test is simple to state: can the people it is for find what they need, understand it and act on it? {{src:plain-what-is-plain-language}}",
      ],
      analogy:
        "Good directions from a local — 'Turn left at the bakery, it's the blue door' — are plain. They are not childish; they are exactly what you need, in the order you need it, in words you already know.",
      everydayExamples: [
        "A medicine label that says 'Take 2 tablets every 4 hours. No more than 8 in 24 hours' instead of a paragraph about dosage regimens.",
        "A tax form that asks 'Did you earn money from renting out a room?' instead of 'Declare any property income subject to the rent-a-room scheme'.",
        "A tenancy agreement with a one-page summary in everyday words before the legal clauses.",
      ],
      vocabulary: [
        { term: "Plain language", meaning: "Wording, structure and design so clear that the intended readers can find, understand and use the information." },
        { term: "Intended audience", meaning: "The specific people a text is for; plainness is judged against them." },
        { term: "Jargon", meaning: "Specialist words; fine for people who share them, a barrier for those who do not." },
        { term: "Readability formula", meaning: "A calculation from countable features such as sentence and word length that estimates difficulty." },
        { term: "Paraphrase test", meaning: "Asking readers to say in their own words what a text means, to check understanding." },
      ],
    },
    intermediate: {
      explanation: [
        "**Plain language works at three levels.** *Structure*: lead with what matters, use the order readers need (a procedure in time order), and use summaries before details. *Design*: meaningful headings, short chunks, lists and tables, readable type and enough contrast. *Expression*: familiar words, explained technical terms, sentences of reasonable length, personal pronouns and, usually, the active voice {{src:plain-what-is-plain-language}}. Rewriting words inside a badly organised document rarely makes it plain.",
        "**Active and passive voice.** The active voice ('You need an electronic travel authorisation') is usually shorter and clearer about who does what than the passive ('An electronic travel authorisation is needed'). But GOV.UK notes that the passive works when the outcome matters more than who acted, or when it keeps the focus on the reader — 'You'll be told what you need to do when you apply' rather than 'The Home Office will tell you…' {{src:govuk-clear-language}}. The rule is about clarity and focus, not grammar for its own sake.",
        "**Specialist words.** Plain language does not ban technical terms. GOV.UK allows specialist terms when people need them to complete a task, as long as they are explained the first time {{src:govuk-clear-language}}; NN/g points out that for physicians 'ventricular tachycardia' is shorter and more precise than any lay explanation, but warns writers to check that their audience really knows a term before relying on it {{src:nng-plain-language-experts}}. Use the words your readers use: search terms show, for example, whether more people look for 'lorry' or 'heavy goods vehicle' {{src:govuk-clear-language}}.",
      ],
      howItWorks: [
        "Name the audience and what they need to do after reading; decide what success looks like {{src:plain-what-is-plain-language}}.",
        "Put the main point and any action first; then the details people need to act.",
        "Organise in the order of use — steps in sequence, eligibility before how to apply.",
        "Choose familiar words; keep needed technical terms and explain them once.",
        "Keep sentences and paragraphs manageable — GOV.UK suggests splitting sentences over 25 words and keeping paragraphs to five sentences or fewer {{src:govuk-clear-language}}.",
        "Make requirements explicit: 'must' for legal requirements, 'need' for administrative steps, 'can' for options {{src:govuk-clear-language}}.",
        "Test with readers: paraphrase tests for short texts, usability tests for longer documents and forms {{src:digitalgov-test-for-understanding}}.",
      ],
      implementation: [
        "Write a one-sentence purpose for each document: who it is for and what they must be able to do.",
        "Draft the headings first, as questions or tasks the reader has; fill in the answers after.",
        "Replace nominalisations ('make a payment', 'provide confirmation') with verbs ('pay', 'confirm'); GOV.UK notes that words ending in '-ion' and '-ment' tend to lengthen sentences {{src:govuk-clear-language}}.",
        "Avoid negative contractions ('can't', 'don't'), which some readers find hard or misread as the opposite {{src:govuk-clear-language}}.",
        "Where a legal text must stay as it is, add a plain summary or guidance beside it rather than leaving readers alone with it.",
      ],
      scenarios: [
        "A pension provider's annual statement opens with three paragraphs about regulation. Moving 'Your pension is worth £48,200. If you keep paying in, you could get about £3,100 a year from age 67' to the top, with assumptions linked below, answers the reader's question first (illustrative).",
        "A hospital's consent form uses 'adverse event'. A paraphrase test shows that several patients read it as 'something unusual' rather than 'harm'. The form now says 'something that harms you' and keeps the clinical term for staff records (illustrative).",
        "A software release note for administrators keeps 'SAML' and 'SCIM' because its readers use them daily, but explains 'just-in-time provisioning' the first time it appears.",
      ],
    },
    advanced: {
      explanation: [
        "**Readability formulas measure text, not readers.** Formulas such as Flesch's Reading Ease, published in 1948 {{src:flesch-1948}}, estimate difficulty from countable features such as sentence and word length. Redish argued in 1981 that a formula can give a quick, general measure of difficulty but should not be used as a guide to rewriting, and listed aspects of writing formulas do not address {{src:redish-1981}}. In 2000 she added that formulas were developed for children's school books rather than adult technical documents, ignore differences between readers and the effects of content, layout and retrieval aids, and emphasise countable features over subtler contributors to comprehension — compared with testing with typical readers {{src:redish-2000}}. Mechanically shortening sentences to lower a score is the kind of rewriting Redish advises against; it can also split ideas that belong together.",
        "**Standards and law.** Plain language is required in some settings. The US Plain Writing Act of 2010 requires federal agencies to use plain writing in documents people need to obtain benefits or services, file taxes or comply with requirements; it excludes regulations {{src:plain-writing-act-2010}}. GOV.UK makes plain English mandatory for all its content {{src:govuk-clear-language}}. WCAG 2.2 includes a Level AAA criterion: when text requires reading ability above lower secondary education level, a simpler version or supplemental content should be available {{src:w3c-understanding-reading-level}}. ISO 24495-1:2023 sets out governing principles and guidelines; it is a paid standard and was not read for this entry, so its content is not described here {{src:iso-24495-1-2023}}.",
        "**Who benefits.** GOV.UK cites adult literacy data — for example, 1 in 6 adults in England with very poor literacy skills — and notes readers whose first language is not English {{src:govuk-clear-language}}. Plain language supports [[cognitive-accessibility|cognitive accessibility]], people reading under stress or on small screens, and experts short of time {{src:nng-plain-language-experts}}. Whether a text works is ultimately an empirical question answered by testing it with its readers {{src:digitalgov-test-for-understanding}}.",
      ],
      evidence: [
        "GOV.UK reports research into specialist legal language in which 80 % of people preferred sentences in clear English, with the preference increasing for more complex issues and for more educated and specialist readers; the underlying study is not named on the page {{src:govuk-clear-language}}.",
        "In an NN/g usability study, domain experts in science, technology and medicine preferred succinct, scannable content over dense, jargon-heavy pages (qualitative findings) {{src:nng-plain-language-experts}}.",
        "In NN/g's 1997 web-writing study, concise, scannable and objective versions of the same content scored higher in measured usability than a promotional control {{src:nielsen-1997-how-users-read}}.",
        "Readability formulas were developed on children's school texts and ignore reader differences, layout and content; testing with typical readers is the stronger check {{src:redish-2000}}.",
      ],
      debates: [
        "**Rules or outcomes?** Checklists ('sentences under 20 words', 'grade 8 reading level') are easy to apply and audit; the outcome definition — readers can find, understand and use — is harder to check but is what matters {{src:plain-what-is-plain-language}}. Treat numeric rules as prompts for revision, not as proof.",
        "**Precision and legal risk.** Lawyers and specialists sometimes resist plain language for fear of losing precision. GOV.UK's guidance keeps legal force with explicit words ('must', 'legally entitled') and allows specialist terms with explanations {{src:govuk-clear-language}}; the conflict is often between plainness and habit rather than plainness and precision.",
        "**One audience or many?** Writing for 'everyone' risks writing for no one; NN/g advises prioritising audiences and layering explanations for secondary readers {{src:nng-plain-language-experts}}.",
      ],
      alternativeModels: [
        "Easy Read (easy-to-read information) — a separate format for people with intellectual disabilities. Inclusion Europe's standards for it ask for short sentences with one idea each, images beside the text, and testing with people with intellectual disabilities; they add that the same rules can help other readers {{src:inclusion-europe-information-for-all}}. Plain language is broader and does not imply this format.",
        "[[readability-formulas|Readability formulas]] — quick text measures, useful as a prompt, not as a test of understanding.",
        "[[content-design|Content design]] — decides what content is needed and in what form; plain language governs how it is expressed.",
      ],
    },
  },

  origin: {
    contributors: ["International Plain Language Federation", "Plain Language Association International (PLAIN)", "US Congress (Plain Writing Act 2010)", "Government Digital Service", "Janice C. Redish"],
    period: "Long-standing movement in law and government; codified in US federal law in 2010 and in an ISO standard in 2023",
    problem:
      "Official, legal and technical documents were written for their authors' conventions rather than their readers, so people could not tell what they had to do, what they were entitled to, or what would happen.",
    narrative: [
      "Readability formulas from the 1940s, such as Flesch's, offered a way to estimate text difficulty {{src:flesch-1948}}; by 1981 Redish was warning that they should not guide rewriting {{src:redish-1981}}.",
      "In 2010 the US Plain Writing Act required federal agencies to use plain writing in documents the public needs {{src:plain-writing-act-2010}}; GOV.UK made plain English mandatory for its content {{src:govuk-clear-language}}.",
      "The International Plain Language Federation's outcome-based definition — find, understand, use — is widely quoted {{src:plain-what-is-plain-language}}, and ISO published 24495-1:2023 on plain-language principles and guidelines {{src:iso-24495-1-2023}}.",
    ],
    attributionNote:
      "The history of the plain-language movement before these documents is not covered by the sources read here and is not described. ISO 24495-1 was not read.",
  },

  application: {
    summary: [
      "Apply plain language to any text people must act on: interface copy, letters, forms, help, policies, contracts, medical and financial information.",
    ],
    web: [
      "Task-based pages with the answer first, meaningful headings and words people search for.",
    ],
    mobile: [
      "Very short, front-loaded sentences; one idea per screen or notification.",
    ],
    enterprise: [
      "Internal policies and procedures that staff can follow without asking a colleague; explain terms new staff will not know.",
    ],
    services: [
      "Letters, texts and forms that say what the person must do, by when, and what happens if they don't — with the legal text available but not leading.",
    ],
    steps: [
      "Define the audience and what they must be able to do.",
      "Structure the content in the order of use, main point first.",
      "Choose familiar words; explain necessary technical terms.",
      "Design for scanning: headings, lists, tables, short chunks.",
      "Check with a formula or checklist if useful, then test with readers.",
      "Revise from what readers misunderstand.",
    ],
  },

  whenToUse: [
    "For any content the public needs in order to act — benefits, health, money, safety, rights.",
    "In interfaces, forms and messages, where reading happens in the middle of a task.",
    "For specialist audiences too, when they are busy or reading outside their exact specialism.",
  ],
  whenNotToUse: [
    "As a reason to remove necessary precision, conditions or legal force — keep the meaning, change the expression.",
    "As a reason to drop shared technical terms for an expert audience who use them every day.",
    "As a substitute for testing: a text that passes a checklist can still be misunderstood.",
  ],
  advantages: [
    "People understand and act correctly more often, with less effort.",
    "Fewer follow-up questions, complaints and errors.",
    "More accessible, including to people with low literacy or reading in a second language.",
    "Clearer obligations and rights, which supports fairness and compliance.",
  ],
  limitations: [
    "What is plain depends on the audience; there is no universal threshold.",
    "Readability scores are weak proxies and can be gamed.",
    "Legal and institutional habits resist change.",
    "Testing with readers takes time, which is often not budgeted.",
  ],
  misconceptions: [
    {
      myth: "Plain language is dumbing down.",
      reality:
        "It keeps the meaning and precision and removes unnecessary effort; even experts prefer it {{src:nng-plain-language-experts}} {{src:govuk-clear-language}}.",
    },
    {
      myth: "Short sentences and a low readability score make a text plain.",
      reality:
        "Formulas measure countable features, not understanding; structure, design and the reader's knowledge matter as much {{src:redish-2000}}. Only testing with readers shows whether a text works.",
    },
    {
      myth: "Never use the passive voice.",
      reality:
        "The active voice is usually clearer, but the passive works when the outcome matters more than the actor or when it keeps the focus on the reader {{src:govuk-clear-language}}.",
    },
    {
      myth: "Plain language bans technical terms.",
      reality:
        "Use the terms readers need and know; explain them the first time for readers who may not {{src:govuk-clear-language}} {{src:nng-plain-language-experts}}.",
    },
  ],

  relations: [
    { target: "content-design", type: "applied-in", note: "Plain language governs how content is expressed once content design has decided what is needed." },
    { target: "ux-writing", type: "applied-in", note: "Interface words follow plain-language principles: users' words, main point first." },
    { target: "cognitive-accessibility", type: "related-to", note: "Clear wording, structure and design reduce barriers for people with cognitive and learning disabilities." },
    { target: "readability-formulas", type: "related-to", note: "Formulas give a quick estimate of difficulty, not a measure of understanding; testing with readers is the stronger check." },
    { target: "cognitive-load-theory", type: "related-to", note: "Unnecessary complexity in wording and structure adds effort that does not help the reader's task." },
    { target: "wcag", type: "related-to", note: "WCAG 2.2 SC 3.1.5 Reading Level (AAA) asks for simpler versions of text above lower secondary level." },
  ],

  practice: {
    dos: [
      { text: "Put the main point and the action first.", why: "Readers decide quickly whether a text is relevant; summaries before details help them find what they need {{src:plain-what-is-plain-language}}.", kind: "standard" },
      { text: "Use the words your readers use, and explain the technical terms they need.", why: "GOV.UK allows specialist terms with an explanation and recommends checking users' own search terms {{src:govuk-clear-language}}.", kind: "industry" },
      { text: "Say what is required with 'must', 'need' or 'can'.", why: "Explicit words keep legal and practical force clear without legal jargon {{src:govuk-clear-language}}.", kind: "industry" },
      { text: "Test understanding with readers, not only with a formula.", why: "Paraphrase and usability tests show whether people understand and can act {{src:digitalgov-test-for-understanding}}; formulas ignore readers and layout {{src:redish-2000}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't treat a readability score as proof of understanding.", why: "Formulas were developed for school books and measure countable features only {{src:redish-2000}}; Redish advises against using them to guide rewriting {{src:redish-1981}}.", kind: "standard" },
      { text: "Don't remove conditions, dates or consequences to make a text shorter.", why: "Plain language keeps the meaning; shorter but incomplete text fails the 'use' test {{src:plain-what-is-plain-language}}.", kind: "context" },
      { text: "Don't use negative contractions such as 'can't' in important instructions.", why: "Some readers find them hard or misread them as the opposite {{src:govuk-clear-language}}.", kind: "industry" },
    ],
    examples: [
      {
        title: "Before and after: a benefit letter paragraph",
        language: "text",
        code: `BEFORE
It has come to our attention that the documentation required in
support of your application for Council Tax Reduction has not been
received. In the absence of receipt of said documentation within
fourteen days of the date of this letter, it will not be possible
for your application to be progressed and it may be necessary for
it to be closed.

AFTER
We need proof of your income to finish your Council Tax Reduction
application.

Send us a copy of your last 3 payslips by 28 June.
- Upload them at council.example/upload, or
- post them to Council Tax, PO Box 123.

If we don't get them by 28 June, we'll close your application and
you'll need to apply again.

WHAT CHANGED (meaning kept)
- The action and the deadline come first; the date is a date, not "fourteen days".
- "Documentation" became the specific document: 3 payslips.
- Passive, impersonal phrases ("it will not be possible", "it may be
  necessary") became who does what.
- The consequence is still stated, plainly.`,
        caption:
          "Illustrative example. The 'after' version is not simpler in content — it is more specific: it names the document, the date and both ways to send it.",
      },
    ],
  },

  exercises: [
    {
      id: "plain-language-ex-rewrite",
      kind: "critique",
      level: "beginner",
      title: "Rewrite an instruction without losing meaning",
      prompt: [
        "Rewrite this notice from a water company in plain language. Keep every condition.",
        "'Customers are advised that, owing to essential maintenance works, a temporary interruption to the water supply may be experienced between the hours of 09:00 and 15:00 on Tuesday 4 March. Following restoration of supply, discolouration may be observed, in which event it is recommended that the cold tap be run until the water runs clear.'",
      ],
      deliverable: "A rewritten notice and a list of every fact you kept.",
      criteria: [
        "Leads with what will happen and when",
        "Keeps the date and times, the possibility (not certainty) of interruption, and the discolouration advice",
        "Uses 'you' and direct instructions",
        "Does not add or remove facts",
      ],
      exampleSolution: [
        "'Your water may be off on Tuesday 4 March, between 9am and 3pm, while we repair pipes. When it comes back on, it may look brown. If it does, run your cold tap until the water is clear.'",
        "Kept: date, times, 'may' (not certain), reason, discolouration possibility, cold tap, run until clear.",
      ],
    },
    {
      id: "plain-language-ex-score",
      kind: "scenario",
      level: "intermediate",
      title: "A good score, a confusing text",
      prompt: [
        "A team rewrote a pension leaflet until its readability tool reported 'Grade 6'. Usability testing then showed that 5 of 8 readers could not say how much they would need to pay in to get a bigger pension.",
        "Explain how both results can be true, and what the team should change.",
      ],
      deliverable: "An explanation and three specific changes.",
      criteria: [
        "Explains that formulas count sentence and word length and ignore structure, layout, content and reader knowledge",
        "Identifies likely problems the score cannot see (missing example, buried key fact, undefined concept)",
        "Proposes testing-led changes and retesting",
      ],
      exampleSolution: [
        "The formula measured short words and sentences; it cannot tell whether the answer to the reader's question is present, findable or understood.",
        "Changes: put a worked example at the top ('If you pay £50 more a month, you could get about £X more a year'); explain 'contribution' the first time; use a table comparing two choices; retest with new readers.",
      ],
    },
    {
      id: "plain-language-ex-audience",
      kind: "scenario",
      level: "advanced",
      title: "Plain for whom?",
      prompt: [
        "The same drug-interaction warning must appear (a) in a prescribing system used by pharmacists and (b) on a patient leaflet. The pharmacist version currently says 'Concomitant use with CYP3A4 inhibitors is contraindicated'.",
        "Decide what to keep, change or explain for each audience, and justify the decisions using the definition of plain language.",
      ],
      deliverable: "Two versions and a justification for each.",
      criteria: [
        "Keeps precise technical terms for pharmacists, who share them",
        "Removes or explains them for patients, with a concrete action",
        "Justifies both by the intended audience's ability to find, understand and use the information",
      ],
      exampleSolution: [
        "Pharmacists: keep 'CYP3A4 inhibitors' and 'contraindicated' — shared, precise terms — but put the warning where it is seen at the point of prescribing, and name common examples.",
        "Patients: 'Do not take this medicine with [named medicines, foods or drinks]. Ask your pharmacist before taking any other medicine.' (Illustrative: the actual list must come from the product information.) Both are plain for their audience.",
      ],
    },
  ],

  quiz: [
    {
      id: "plain-language-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which best describes plain language?",
      options: [
        { text: "Wording, structure and design so clear that the intended readers can find, understand and use the information", correct: true, explanation: "This is the outcome-based definition widely quoted from the International Plain Language Federation." },
        { text: "Writing at a 6th-grade reading level for everyone", correct: false, explanation: "Reading level is one possible guideline; plainness depends on the intended audience and on structure and design." },
        { text: "Avoiding all technical words", correct: false, explanation: "Needed technical words can stay, explained when necessary." },
        { text: "Making every sentence shorter than 15 words", correct: false, explanation: "Sentence length is a tool, not the definition." },
      ],
      explanation: "Plain language is defined by what readers can do.",
    },
    {
      id: "plain-language-q-passive",
      kind: "scenario",
      level: "intermediate",
      prompt:
        "Which sentence is the best choice for a visa application page, written to the applicant?",
      options: [
        { text: "“You'll be told what you need to do when you apply.”", correct: true, explanation: "The passive keeps the focus on the applicant; who tells them matters less than what they will learn." },
        { text: "“The Home Office will tell you what you need to do when you apply.”", correct: false, explanation: "Active and correct, but it shifts focus to the organisation without helping the reader; GOV.UK gives this exact pair as a case where the passive works better." },
        { text: "“Requirements will be communicated upon application.”", correct: false, explanation: "Passive and impersonal; 'communicated upon application' adds effort." },
        { text: "“Applicants are notified of requirements subsequent to submission.”", correct: false, explanation: "Formal, third person and vague about timing." },
      ],
      explanation: "Prefer active voice, but choose the passive when it keeps the focus on the reader or the outcome.",
    },
    {
      id: "plain-language-q-formula",
      kind: "true-false",
      level: "intermediate",
      prompt: "If a readability formula rates a text as easy, readers will understand it.",
      options: [
        { text: "True", correct: false, explanation: "Formulas count features such as sentence and word length; they ignore content, layout, structure and what readers already know." },
        { text: "False", correct: true, explanation: "Only testing with readers shows whether they understand and can use a text." },
      ],
      explanation: "Use formulas as a prompt; test with readers as the evidence.",
      revise: "content-design",
    },
    {
      id: "plain-language-q-expert",
      kind: "critique",
      level: "advanced",
      prompt:
        "A medical journal's editor rejects plain language because 'our readers are experts and plain language would insult them'. What is the strongest response?",
      options: [
        { text: "Plain language is relative to the audience: keep shared technical terms, but remove needless complexity — experts also prefer succinct, scannable text.", correct: true, explanation: "NN/g found experts prefer succinct content; plainness for experts keeps their precise vocabulary." },
        { text: "Experts should read texts at a 6th-grade level like everyone else.", correct: false, explanation: "Plain language does not impose one reading level on every audience." },
        { text: "The editor is right: plain language is only for the public.", correct: false, explanation: "Specialists benefit too, especially when busy or outside their exact specialism." },
        { text: "Replace all medical terms with everyday words.", correct: false, explanation: "That would reduce precision for an audience that shares the terms." },
      ],
      explanation: "Plain language for experts is precise and efficient, not simplified.",
    },
  ],

  flashcards: [
    { id: "plain-language-fc-1", front: "Plain language (IPLF definition)", back: "Wording, structure and design so clear that the intended audience can easily find what they need, understand it and use it." },
    { id: "plain-language-fc-2", front: "Three levels of plain language", back: "Structure (order, summaries), design (headings, layout, lists), expression (words, sentences, voice)." },
    { id: "plain-language-fc-3", front: "Why not trust readability scores?", back: "They count sentence and word length, were built on children's texts, and ignore readers, content and layout (Redish)." },
    { id: "plain-language-fc-4", front: "When is the passive voice fine?", back: "When the outcome matters more than the actor, or it keeps the focus on the reader (GOV.UK)." },
    { id: "plain-language-fc-5", front: "How do you know a text is plain?", back: "Test it: paraphrase tests for short texts, usability tests for longer ones and forms." },
  ],

  references: [
    { source: "plain-what-is-plain-language", role: "primary", note: "Read: IPLF definition and the five areas of plain language." },
    { source: "plain-writing-act-2010", role: "standard", note: "Read: statutory definition and scope (US federal agencies)." },
    { source: "iso-24495-1-2023", role: "standard", note: "Record only; paid standard not read." },
    { source: "govuk-clear-language", role: "primary", note: "Read: GOV.UK plain English guidance, active and passive voice, literacy, specialist terms." },
    { source: "nng-plain-language-experts", role: "explanatory", note: "Read: experts' preference for plain language." },
    { source: "digitalgov-test-for-understanding", role: "explanatory", note: "Read: paraphrase and usability testing." },
    { source: "w3c-understanding-reading-level", role: "standard", note: "Read: WCAG 2.2 SC 3.1.5 (AAA)." },
    { source: "flesch-1948", role: "primary", note: "Record only: the publication of a readability formula; not read." },
    { source: "redish-1981", role: "primary", note: "Abstract read: limitations of readability formulas." },
    { source: "redish-2000", role: "primary", note: "Abstract read: further limitations compared with testing with readers." },
    { source: "inclusion-europe-information-for-all", role: "explanatory", note: "Read: European easy-to-read standards (sentences, images, testing with readers); a statement of practice, not research." },
    { source: "nielsen-1997-how-users-read", role: "explanatory", note: "Read: related evidence on concise, scannable, objective writing." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Plain language is set out in law (US Plain Writing Act), public-sector guidance (GOV.UK, Digital.gov), an international definition and an ISO standard (not read). Empirical support cited here is limited to a reported preference study (source not named by GOV.UK), qualitative NN/g findings and an early web-writing study; the critique of readability formulas comes from Redish's abstracts. Specific numeric rules (sentence length, reading level) are presented as guidance, not findings.",

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
