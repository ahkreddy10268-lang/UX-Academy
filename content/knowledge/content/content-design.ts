import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "content-design",
  slug: "content-design",
  title: "Content Design",
  alternateNames: ["Content designing", "User-centred content design"],
  summary:
    "A way of working that starts from evidence of what people need to do or know, then decides what content will meet that need, in what form, where and when — and keeps it accurate until it is no longer needed.",
  definition:
    "Content design is a **user-centred discipline** for deciding what content should exist and in what form. GOV.UK describes it as taking a user need and meeting it in the best way possible {{src:govuk-understand-content-design}}; Sarah Winters, who helped establish the practice at the UK Government Digital Service {{src:content-design-london-about}}, defines it as answering a user need in the best way for the user to consume it, using data and evidence to give people what they need, when they need it, in the way they expect {{src:winters-2019-what-is-content-design}}. The answer may be a page, a short tool, a form question, a letter, a poster, or removing content that duplicates or contradicts other content {{src:govuk-understand-content-design}}. Writing is one part of it; research, structure, format, channel and maintenance are the others. Its interface-level counterpart is [[ux-writing|UX writing]]; its organisation-level counterpart is content strategy.",
  primaryType: "discipline",
  secondaryTypes: [],
  domain: "content",
  subcategory: "writing",
  tags: ["user needs", "content strategy", "content audit", "content model", "structured content", "governance", "GOV.UK"],
  difficulty: "intermediate",
  disciplines: ["Content design", "Service design", "Information architecture", "UX research"],
  learningObjectives: [
    "Write a user need and decide the format that meets it best — including no new content.",
    "Distinguish content design from UX writing and from content strategy.",
    "Use a content inventory, audit and content model to plan and structure content.",
    "Plan for maintenance and retirement, and evaluate whether content works.",
  ],
  prerequisites: ["ux-writing", "user-centred-design"],

  levels: {
    beginner: {
      explanation: [
        "Imagine a council website with a 3,000-word page called 'School meals policy'. Parents arrive with one question: can my child get free school meals, and how do I apply? Content design starts with that question rather than with the policy. The best answer might be three eligibility questions, a result and an 'Apply' button — not a page at all.",
        "Content designers begin with evidence of what people need: search terms, calls to the contact centre, research, analytics {{src:govuk-identify-user-needs}}. They write the need down ('As a parent, I need to know whether my child can get free school meals, so that I can apply'), and then decide what content — if any — meets it, in which format, and where people will look for it.",
        "Content is never finished. It goes out of date, contradicts newer content, or stops being needed. Part of content design is giving every piece an owner and a review date, and removing what no longer helps {{src:govuk-retire-content}}.",
      ],
      analogy:
        "A good pharmacist does not hand you the whole leaflet about a medicine; they tell you how much to take, when, and what to watch for — and the leaflet exists for anyone who needs more. Content design decides which of those you need, at which moment, and keeps them correct when the dose changes.",
      everydayExamples: [
        "Replacing a long 'Eligibility' page with a short checker that asks people questions and gives them their answer.",
        "Merging three help articles that give different answers about refunds into one, and redirecting the others.",
        "Rewriting a renewal letter, the email that follows it and the website page so they use the same words for the same steps.",
      ],
      vocabulary: [
        { term: "User need", meaning: "Something a person needs to do or find out, written from their side: 'As a… I need to… so that…'." },
        { term: "Content inventory", meaning: "A list of all the content you have, with details such as owner, date and format." },
        { term: "Content audit", meaning: "A judgement of each piece in the inventory: keep, update, merge or remove." },
        { term: "Content model", meaning: "A description of the types of content, their parts and how they relate." },
        { term: "Content strategy", meaning: "The plan for creating, delivering and governing content across an organisation." },
      ],
    },
    intermediate: {
      explanation: [
        "**Start with the need, then choose the format.** GOV.UK user needs follow a three-part template — who, what they need to do, why — written in language users would recognise, and based on actions or tasks {{src:govuk-identify-user-needs}}. Only then does the team decide whether to reduce, split, reformat, relocate or remove content, or publish somewhere else entirely {{src:govuk-understand-content-design}}. GOV.UK organises its mainstream guidance by task rather than by audience or department, and from the moment a need arises to the moment a task is done {{src:govuk-plan-new-content}}.",
        "**Content design, UX writing and content strategy.** NN/g quotes Halvorson's definition of content strategy as 'the ongoing practice of planning for the creation, delivery, and governance of useful, usable, and effective content', and stresses that strategy comes before tactics such as copywriting {{src:nng-content-strategy}}. Content design works within that plan on specific needs: what content, in which form and channel {{src:winters-2019-what-is-content-design}}. [[ux-writing|UX writing]] designs the words inside an interface. In practice the roles overlap and one person may do all three.",
        "**Know what you have.** A content inventory lists every piece of content with its characteristics; a content audit judges each piece and decides whether to keep, update or remove it. NN/g recommends doing both, starting with the most used content or the content behind top tasks, and treating them as ongoing rather than one-off {{src:nng-content-audits}}.",
      ],
      howItWorks: [
        "Research: gather evidence of needs — analytics, search terms, contact-centre data, previous research — and work with user researchers when needs are complex {{src:govuk-identify-user-needs}}.",
        "Write the needs and map the journey: what people know, feel and must decide at each step, across online and offline channels {{src:winters-2019-what-is-content-design}}.",
        "Decide format and place: a page, a tool, a form question, a letter, a poster — or no new content {{src:govuk-understand-content-design}}.",
        "Structure it: define content types, their parts and relationships in a content model so the design, the CMS and the authors agree {{src:lovinger-2012-content-modelling}}.",
        "Create, share for critique, test with users, and iterate {{src:winters-2019-what-is-content-design}}.",
        "Maintain: assign owners and review dates; update, withdraw or unpublish what no longer meets a need {{src:govuk-retire-content}}.",
      ],
      implementation: [
        "Keep a backlog of user needs, each linked to the content that meets it; content with no need is a candidate for removal.",
        "Pair with researchers and designers from the start; content designers are not a substitute for user research {{src:govuk-identify-user-needs}}.",
        "Agree a content model with developers before building templates, so content can be reused and filtered without copying.",
        "Write for accessibility from the start — headings, link text, tables, forms, images and documents all affect who can use the content {{src:govuk-understand-accessibility}}.",
        "Decide on translations from evidence of need, and publish them as separate versions rather than mixing languages on one page, which causes problems for screen-reader users {{src:govuk-consider-translations}}.",
      ],
      scenarios: [
        "A bank's help centre has 14 articles about card disputes. An audit finds four outdated, three duplicates and two that contradict the app. The team merges them into one task-based article per dispute type, redirects the rest and adds review dates (illustrative).",
        "A service team planned an app to remind patients about appointments. Journey mapping shows most missed appointments come from people who never received the letter. The content designer recommends rewriting the letter and the text message first (illustrative).",
        "A university wants each faculty to publish its own course pages. A content model defines a 'Course' type with fixed fields (entry requirements, fees, start dates) so they can be compared and filtered, while leaving a free-text description to each faculty.",
      ],
    },
    advanced: {
      explanation: [
        "**Origins.** Content design took shape as a named practice in the UK government's digital work: GOV.UK's guidance treats it as the standard way of planning and writing content {{src:govuk-understand-content-design}}, and Content Design London states that its founder, Sarah Winters (formerly Richards), helped implement the practice at the Government Digital Service {{src:content-design-london-about}}. Her book *Content Design* (2017) set out the approach {{src:richards-2017}}; the definition quoted here comes from her 2019 article, which cites it {{src:winters-2019-what-is-content-design}}. It shares the premise of [[user-centred-design|user-centred design]] that design starts from evidence of what users need {{src:govuk-identify-user-needs}}, and works within content strategy {{src:nng-content-strategy}}.",
        "**Beyond the interface.** Because it starts from needs rather than screens, content design applies to help centres, letters, phone scripts, forms and whole service journeys. Winters gives the example of a health service planning an expensive app whose need would have been better met by a poster in doctors' surgeries {{src:winters-2019-what-is-content-design}}. The skill is choosing the smallest, clearest intervention that meets the need.",
        "**Evaluation and governance.** Content can be tested like other design: paraphrase and usability tests show whether people understand and can act {{src:digitalgov-test-for-understanding}}; analytics, search terms and contact-centre data show whether needs are being met {{src:govuk-identify-user-needs}}. Governance asks who owns each piece and when it will be reviewed; NN/g's content-strategy lifecycle cycles content through planning, creation and maintenance until it is unpublished {{src:nng-content-strategy}}. GOV.UK's test for withdrawing content — 'will leaving it as it is get in the way of a non-specialist user?' — is a compact governance rule {{src:govuk-retire-content}}.",
      ],
      evidence: [
        "The practice is documented mainly in public-sector guidance and practitioner sources {{src:govuk-understand-content-design}} {{src:winters-2019-what-is-content-design}} {{src:nng-content-audits}}; no controlled study comparing content-designed services with conventionally written ones was found for this entry.",
        "Supporting evidence comes from related work: people scan and perform better with concise, scannable, objective web writing {{src:nielsen-1997-how-users-read}}, and GOV.UK reports research in which most people, especially specialists, preferred clear language in legal documents {{src:govuk-clear-language}}.",
      ],
      debates: [
        "**Title and scope.** 'Content designer', 'UX writer' and 'content strategist' are used inconsistently. Some organisations use content design for all three; others use UX writing for product teams and content design for services. The scope matters more than the title: who decides what content exists, who writes it and who maintains it.",
        "**Less content, or more?** Content design often removes content — duplication, out-of-date pages, things better published elsewhere {{src:govuk-understand-content-design}}. That can conflict with stakeholders who measure output in pages, and with SEO or legal teams who want more on the page. Winters argues for chasing quality rather than traffic {{src:winters-2019-what-is-content-design}}.",
        "**Structure versus effort.** Highly structured content enables reuse and filtering, but asks authors to break content into many fields; Lovinger advises structuring only where it serves a function {{src:lovinger-2012-content-modelling}}.",
      ],
      alternativeModels: [
        "[[ux-writing|UX writing]] — the words inside an interface and its flows.",
        "Content strategy — the organisation-wide plan for creation, delivery and governance of content.",
        "[[information-architecture|Information architecture]] — organising and labelling content across a site or product.",
        "Technical communication — documentation written for reference and learning.",
      ],
    },
  },

  origin: {
    contributors: ["Sarah Winters (formerly Richards)", "Government Digital Service", "Kristina Halvorson", "Rachel Lovinger"],
    period: "Established as a named practice in UK government digital work (GDS); the sources read do not date it precisely",
    problem:
      "Organisations published content from their own point of view — by department, policy or product — so people could not find or act on what they needed, and content multiplied, duplicated and went out of date.",
    narrative: [
      "Halvorson's 2009 definition framed content strategy as planning for the creation, delivery and governance of content {{src:nng-content-strategy}} {{src:halvorson-2009}}.",
      "At the UK Government Digital Service, content design became the standard way of planning and writing GOV.UK content around user needs {{src:govuk-understand-content-design}} {{src:content-design-london-about}}.",
      "Richards's *Content Design* (2017) described the practice for a wider audience {{src:richards-2017}}; Content Design London's account presents it as a process of research, user needs, journey and channel mapping, language and emotion, creation, sharing and iteration {{src:winters-2019-what-is-content-design}}.",
    ],
    attributionNote:
      "The sources read do not give an exact date or originator for the term 'content design'. The GDS connection is documented by GOV.UK's guidance and by Content Design London's account of its founder, which is a company's description of itself.",
  },

  application: {
    summary: [
      "Use content design whenever people need to find out or do something — on a website, in an app, in a letter or across a service — and especially when content has grown, duplicated or drifted out of date.",
    ],
    web: [
      "Task-based guidance pages, help centres and eligibility tools organised around what people need to do, not around the organisation.",
    ],
    mobile: [
      "Deciding which information belongs in the app at the moment of a task and which belongs in help, email or a website.",
    ],
    enterprise: [
      "Internal policies, onboarding and knowledge bases: inventory, audit and consolidate so staff find one current answer.",
      "Content models shared across products, so the same facts are written once and reused.",
    ],
    services: [
      "Letters, texts, phone scripts and web pages for one journey, written to the same needs in the same words.",
      "Choosing offline channels — a poster, a leaflet — when that is where the need arises.",
    ],
    steps: [
      "Gather evidence of user needs.",
      "Write the needs and map the journey across channels.",
      "Inventory and audit existing content.",
      "Decide format and place — including no new content.",
      "Model the content's structure; create, test and iterate.",
      "Assign owners and review dates; update, withdraw or remove.",
    ],
  },

  whenToUse: [
    "Planning new content or a new service, before anything is written.",
    "When content is duplicated, contradictory or out of date.",
    "When contact-centre calls or search terms show people cannot find or understand something.",
    "When the same journey runs across web, app, letters and phone.",
  ],
  whenNotToUse: [
    "As a replacement for user research on complex needs — content designers work with researchers {{src:govuk-identify-user-needs}}.",
    "Where a document's form is fixed by law or contract; content design can still add a plain summary or guidance alongside it.",
    "For persuasive campaign copy whose aim is reach rather than meeting a need, although the same research methods help there too.",
  ],
  advantages: [
    "Content that meets real needs, so people find answers and complete tasks.",
    "Less content to maintain: duplication and out-of-date pages are removed.",
    "Consistent language across channels and teams.",
    "Content structured for reuse, filtering and translation.",
  ],
  limitations: [
    "Needs organisational support: owners, review dates and authority to remove content.",
    "Research and audits take time that output-focused teams may not budget.",
    "Evidence for the practice is mostly professional experience rather than controlled studies.",
    "Highly structured content can burden authors if structure has no clear purpose.",
  ],
  misconceptions: [
    {
      myth: "Content design is a new name for copywriting.",
      reality:
        "Writing is one step. Content design decides whether content is needed, in what form and where — sometimes a tool, a form question or no content at all {{src:govuk-understand-content-design}}.",
    },
    {
      myth: "Content design is only for digital.",
      reality:
        "It starts from the need, not the channel; the best answer can be a letter or a poster {{src:winters-2019-what-is-content-design}}.",
    },
    {
      myth: "Once published, content is done.",
      reality:
        "Content cycles through planning, creation and maintenance until it is removed {{src:nng-content-strategy}}; out-of-date content can actively mislead {{src:govuk-retire-content}}.",
    },
  ],

  relations: [
    { target: "user-centred-design", type: "related-to", note: "Content design shares UCD's premise: evidence of user needs first, then design and iteration." },
    { target: "content-strategy", type: "related-to", note: "Content strategy plans creation, delivery and governance across an organisation; content design meets specific needs within it." },
    { target: "information-architecture", type: "complementary-to", note: "IA organises and labels content across a product; content design decides what each piece is and how it is structured." },
    { target: "content-audit", type: "complementary-to", note: "Audits judge whether existing content still meets a need and should be kept, updated or removed." },
    { target: "jobs-to-be-done", type: "related-to", note: "Content designers express needs as user or job stories." },
    { target: "accessibility-concept", type: "related-to", note: "How content is written and formatted decides who can use it." },
  ],

  practice: {
    dos: [
      { text: "Write the user need before writing any content.", why: "Every published piece should meet a valid need, written from the user's side {{src:govuk-identify-user-needs}}.", kind: "industry" },
      { text: "Consider removing, merging or relocating content before adding more.", why: "Reducing, splitting, reformatting and removing duplication are all content-design outcomes {{src:govuk-understand-content-design}}.", kind: "industry" },
      { text: "Inventory and audit together, starting with top tasks.", why: "An inventory says what exists; only an audit says what is good and what to do with it {{src:nng-content-audits}}.", kind: "industry" },
      { text: "Give every piece an owner and a review date.", why: "Content cycles through maintenance until it is removed; without owners it drifts {{src:nng-content-strategy}}.", kind: "team" },
    ],
    donts: [
      { text: "Don't organise content by department or policy.", why: "GOV.UK organises guidance by task, from when a need arises to when it is met {{src:govuk-plan-new-content}}.", kind: "industry" },
      { text: "Don't keep out-of-date content in front of current answers.", why: "Ask whether leaving it 'will get in the way of a non-specialist user'; if so, withdraw or unpublish it {{src:govuk-retire-content}}.", kind: "industry" },
      { text: "Don't mix languages on one page.", why: "Translations on the same page cause problems for screen-reader users; publish them separately {{src:govuk-consider-translations}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "From need to content decision: a content-design brief",
        language: "text",
        code: `USER NEED
As a parent of a child at a state school
I need to know whether my child can get free school meals
So that I can apply before the start of term

EVIDENCE
- 1,240 searches a month for "free school meals" (site search)
- 31 % of school-office calls in September are about eligibility
- Current page: 3,100 words, organised by policy section

DECISION
Format     Short eligibility checker (4 questions) + result + "Apply" link
           (not a longer page)
Remove     2 duplicate pages; redirect to the checker
Structure  Content type "Eligibility check": question, help text,
           result (eligible / not eligible / unsure), next step
Channels   Same wording in the September letter and the school-office script
Measure    Completion of the checker; calls about eligibility; applications
Owner      School meals team · review every July and when rules change`,
        caption:
          "Illustrative brief. The figures are invented for the example; the structure — need, evidence, decision, measure, owner — is the point.",
      },
    ],
  },

  exercises: [
    {
      id: "content-design-ex-need",
      kind: "assignment",
      level: "beginner",
      title: "Turn a page into a user need and a decision",
      prompt: [
        "A gym's website has a page called 'Membership terms and conditions (v7)'. Contact-centre data shows most people who read it want to know one thing: how to cancel and whether they will be charged again.",
        "Write the user need in the 'As a… I need to… So that…' form, and decide what content should meet it. Say what happens to the existing page.",
      ],
      deliverable: "A user need, a content decision and a note on the existing page.",
      criteria: [
        "The need is written from the member's side, in their words",
        "The decision is a task-based answer (for example a 'Cancel your membership' page or flow), not more terms",
        "The legal terms are kept but no longer the main route to the answer",
      ],
    },
    {
      id: "content-design-ex-audit",
      kind: "critique",
      level: "intermediate",
      title: "Correct an audit decision",
      prompt: [
        "A team's audit spreadsheet for a help centre recommends: (1) 'Refunds (2019)' — keep, still gets traffic; (2) 'Refunds policy' and 'How to get a refund' — keep both, different audiences; (3) 'Shipping to Northern Ireland' — remove, low traffic; (4) 'Card declined?' — keep, no owner listed.",
        "Correct the decisions that are weak and explain why, using evidence you would want to check.",
      ],
      deliverable: "A corrected decision and reasoning for each row.",
      criteria: [
        "Questions keeping old content because of traffic (traffic may mean it is misleading people)",
        "Merges or clarifies duplicates around one task",
        "Does not remove content only for low traffic if it meets a real need for a small group",
        "Requires an owner and review date for every kept page",
      ],
      exampleSolution: [
        "(1) Traffic alone does not justify it: check whether it contradicts current policy; if so, update it into the current page or withdraw it and redirect.",
        "(2) Two pages answering one task invite contradictions: merge into one task-based page, with the policy linked from it.",
        "(3) Low traffic may reflect a small but real group with a specific need; keep it if it is accurate and needed, and check search terms.",
        "(4) Keep, but assign an owner and a review date before it is marked done.",
      ],
    },
    {
      id: "content-design-ex-format",
      kind: "scenario",
      level: "advanced",
      title: "Choose the format and channel",
      prompt: [
        "A hospital trust finds that many patients arrive for scans without having fasted, so scans are cancelled. Options on the table: (a) a 2,000-word web page on scan preparation; (b) a new app with reminders; (c) rewriting the appointment letter and adding a text message the day before; (d) a poster in GP surgeries.",
        "Choose and justify a combination, and say how you would measure whether it worked.",
      ],
      deliverable: "A choice with justification and a measure.",
      criteria: [
        "Starts from where and when the need arises (before the appointment, at home)",
        "Prefers changing existing channels people already receive over a new app",
        "Names a behavioural measure (cancelled scans due to not fasting)",
      ],
      exampleSolution: [
        "Rewrite the letter so fasting instructions come first, in plain words, and add a text message the evening before ('Don't eat after 10pm tonight. Water is fine.'). These reach patients when the need arises, without asking them to install anything.",
        "Keep a short web page for details, linked from the letter. Measure the rate of scans cancelled for not fasting, before and after.",
      ],
    },
  ],

  quiz: [
    {
      id: "content-design-q-start",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Where does content design start?",
      options: [
        { text: "With evidence of what people need to do or find out", correct: true, explanation: "Content design starts by taking a user need and meeting it in the best way possible." },
        { text: "With a draft of the page", correct: false, explanation: "Writing comes after deciding whether content is needed and in what form." },
        { text: "With the organisation's structure", correct: false, explanation: "Organising content by department is what content design moves away from." },
        { text: "With SEO keywords", correct: false, explanation: "Search terms are evidence of needs, but the need is the starting point." },
      ],
      explanation: "Need first, then format, then words.",
    },
    {
      id: "content-design-q-strategy",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which statement best distinguishes content strategy from content design?",
      options: [
        { text: "Strategy plans creation, delivery and governance across an organisation; design meets specific needs with specific content.", correct: true, explanation: "Halvorson's definition of strategy is about planning and governance; content design works on particular needs within it." },
        { text: "Strategy is for marketing; design is for products.", correct: false, explanation: "Both apply to any content." },
        { text: "Strategy writes the words; design chooses the layout.", correct: false, explanation: "Neither definition is about layout versus words." },
        { text: "They are the same thing with different names.", correct: false, explanation: "They overlap, but operate at different levels." },
      ],
      explanation: "Different levels of the same concern: organisation-wide plan versus need-by-need design.",
      revise: "ux-writing",
    },
    {
      id: "content-design-q-remove",
      kind: "scenario",
      level: "intermediate",
      prompt:
        "A council's 2021 page about bin collection days still ranks above the current one in search and gives the wrong day for some streets. What should happen?",
      options: [
        { text: "Unpublish or withdraw the old page and redirect to the current one.", correct: true, explanation: "Out-of-date content that gets in the way of people finding the current answer should be withdrawn or removed." },
        { text: "Keep it — it still gets traffic.", correct: false, explanation: "The traffic is people being misled." },
        { text: "Add a note at the bottom saying it may be out of date.", correct: false, explanation: "People act on the top of the page; a note at the bottom does not prevent the error." },
        { text: "Write a third page explaining which page to trust.", correct: false, explanation: "That adds content instead of fixing the problem." },
      ],
      explanation: "Maintenance includes removing content.",
    },
    {
      id: "content-design-q-model",
      kind: "critique",
      level: "advanced",
      prompt:
        "A team proposes splitting every help article into 25 structured fields 'for future reuse', though nothing yet reuses or filters them. What is the strongest critique?",
      options: [
        { text: "Structure should serve a function; splitting content into fields nobody uses burdens authors without benefit.", correct: true, explanation: "Lovinger advises asking how structured content really needs to be and avoiding breaking it up when it serves no purpose." },
        { text: "Structured content is always bad for accessibility.", correct: false, explanation: "Structure can help accessibility; the problem here is purpose." },
        { text: "Help articles cannot be structured.", correct: false, explanation: "They can; the question is whether it is worth it." },
        { text: "More fields always improve search.", correct: false, explanation: "Only if search uses them, and authors fill them in consistently." },
      ],
      explanation: "Model the structure you need now, with room to grow.",
    },
  ],

  flashcards: [
    { id: "content-design-fc-1", front: "Content design in one sentence", back: "Meet a user need with the right content, in the right form and place — possibly no new content — and keep it current." },
    { id: "content-design-fc-2", front: "GOV.UK user-need template", back: "As a… (who) I need to… (what) So that… (why) — written in the user's language, based on a task." },
    { id: "content-design-fc-3", front: "Inventory vs audit", back: "Inventory: what content exists and its details. Audit: how good each piece is and what to do with it." },
    { id: "content-design-fc-4", front: "Content strategy (Halvorson)", back: "The ongoing practice of planning for the creation, delivery and governance of useful, usable and effective content." },
    { id: "content-design-fc-5", front: "Content model", back: "The types of content, their parts (attributes) and how they relate — shared by designers, developers and authors." },
  ],

  references: [
    { source: "govuk-understand-content-design", role: "primary", note: "Read: GOV.UK's description of content design." },
    { source: "winters-2019-what-is-content-design", role: "primary", note: "Read: definition and process by the practice's best-known proponent." },
    { source: "content-design-london-about", role: "explanatory", note: "Read: Winters's role at GDS (a company's own account)." },
    { source: "richards-2017", role: "further", note: "Bibliographic record only; not read." },
    { source: "govuk-identify-user-needs", role: "primary", note: "Read: user needs, the template and sources of evidence." },
    { source: "govuk-plan-new-content", role: "explanatory", note: "Read: task-based mainstream guidance." },
    { source: "govuk-retire-content", role: "explanatory", note: "Read: withdrawing and unpublishing content." },
    { source: "govuk-understand-accessibility", role: "explanatory", note: "Read: what makes content accessible." },
    { source: "govuk-consider-translations", role: "explanatory", note: "Read: deciding on and publishing translations." },
    { source: "nng-content-strategy", role: "explanatory", note: "Read: content strategy, Halvorson's definition, lifecycle." },
    { source: "halvorson-2009", role: "further", note: "Bibliographic record only; not read." },
    { source: "nng-content-audits", role: "explanatory", note: "Read: content inventories and audits." },
    { source: "lovinger-2012-content-modelling", role: "explanatory", note: "Read: content models and structured content." },
    { source: "digitalgov-test-for-understanding", role: "explanatory", note: "Read: testing content for understanding." },
    { source: "nielsen-1997-how-users-read", role: "explanatory", note: "Read: related evidence on web writing." },
    { source: "govuk-clear-language", role: "explanatory", note: "Read: reported preference for clear language." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Content design is documented in public-sector guidance (GOV.UK), by its best-known practitioner (whose company sells training) and by NN/g. No controlled study of the practice as a whole was found; supporting evidence comes from related research on reading and plain language. The origin is described from GOV.UK and Content Design London's own account; the 2017 book was not read.",

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
