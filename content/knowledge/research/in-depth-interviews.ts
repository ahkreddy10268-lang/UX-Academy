import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "in-depth-interviews",
  slug: "in-depth-interviews",
  title: "In-depth Interviews",
  alternateNames: ["User interviews", "Qualitative interviews", "Semi-structured interviews", "Depth interviews", "IDIs"],
  summary:
    "One-to-one conversations, guided by a few open questions and many follow-ups, that reveal people's experiences, motivations and mental models — strongest when they ask about specific past events, weakest when they ask people to predict or explain themselves.",
  definition:
    "An in-depth interview is a **qualitative research method** in which a researcher talks with one participant, asks open questions about a topic, listens, and follows up to learn more; in UX it is usually called a *user interview*, while other fields say in-depth, semi-structured or qualitative interview {{src:nng-user-interviews}}. It is **attitudinal**: it collects what people report about their behaviour, thoughts and feelings, not behaviour observed directly {{src:nng-user-interviews}}. Its value depends on the questions. Accounts of specific incidents carry more information than generalisations {{src:flanagan-1954}}, and people's explanations of why they acted can be plausible theories rather than recollections {{src:nisbett-wilson-1977}}.",
  primaryType: "method",
  secondaryTypes: [],
  domain: "research",
  subcategory: "qualitative",
  tags: ["generative research", "discovery", "interview guide", "probing", "self-report", "saturation", "thematic analysis"],
  difficulty: "beginner",
  disciplines: ["UX research", "Social science", "Market research", "Product management"],
  learningObjectives: [
    "Write an interview guide from research goals, with open questions about specific past events and nested follow-ups.",
    "Recognise and rewrite leading, hypothetical and double-barrelled questions.",
    "Explain the limits of self-report, and decide what interviews can and cannot establish.",
    "Plan a sample using the evidence on saturation, and analyse transcripts into themes.",
  ],
  prerequisites: ["research-questions"],

  levels: {
    beginner: {
      explanation: [
        "An interview is a conversation with a purpose. You talk with one person for about an hour about part of their life your product touches — how they plan holidays, manage money, care for a parent — so that you understand their experiences, what they care about and what gets in their way.",
        "Good interviews ask about **what happened**, not what people think *might* happen. 'Tell me about the last time you split a bill with friends' brings back a real story with details: who paid, what went wrong, how it felt. 'Would you use an app that splits bills automatically?' invites a polite 'Yes, probably', which tells you almost nothing.",
        "Interviews tell you what people *say*. People forget, leave out things they think are unimportant, and present themselves well {{src:nng-user-interviews}}. To learn what people actually *do*, combine interviews with observation or data.",
      ],
      analogy:
        "A doctor taking a history asks 'When did the pain start? What were you doing?' rather than 'Do you think you have a stomach problem?' — specific events give the clues; asking the patient for the diagnosis only gets their guess.",
      everydayExamples: [
        "A banking team interviews people who recently switched banks, asking them to tell the story of the switch from the first moment they considered it.",
        "A health-app team interviews people about their last attempt to change their diet, not about the app's features.",
        "A charity interviews volunteers about the last time they nearly quit, to understand what keeps people involved.",
      ],
      vocabulary: [
        { term: "Interview guide", meaning: "A short list of open questions and follow-ups that steers the conversation without scripting it." },
        { term: "Open question", meaning: "A question that cannot be answered with yes or no, such as 'Tell me about…'." },
        { term: "Probe", meaning: "A follow-up that asks for more, such as 'Tell me more about that' or 'What happened next?'." },
        { term: "Leading question", meaning: "A question that suggests the answer the interviewer expects." },
        { term: "Saturation", meaning: "The point at which further interviews stop producing new themes." },
      ],
    },
    intermediate: {
      explanation: [
        "**Start from goals, not questions.** An interview is a research study, not an informal chat: write concrete research goals first. Goals that are too broad, such as 'learn about users', produce interviews without usable insight {{src:nng-user-interviews}}. The guide then holds a few open questions with follow-ups nested beneath them, and is used flexibly: skip, reorder and follow what matters {{src:nng-user-interviews}}.",
        "**Ask for episodes.** Ask about particular events rather than general processes; recalling a specific incident brings back meaningful detail {{src:nng-user-interviews}}. This is the idea behind Flanagan's critical incident technique: collect accounts of specific incidents, complete enough that you can draw inferences about the person and clear enough that the purpose and consequences are evident {{src:flanagan-1954}}. 'The last time…' and 'a time when…' are the everyday versions.",
        "**Treat 'why' answers with care.** When people explain the causes of their own behaviour, they often report what seems a plausible cause rather than what actually influenced them {{src:nisbett-wilson-1977}}. Ask what happened, what they did and what they were thinking at the time; treat their explanations as their point of view, which is valuable, not as established causes.",
      ],
      howItWorks: [
        "Open with the purpose, how the information will be used, consent and recording; start with easy questions so the participant relaxes {{src:nng-user-interviews}}.",
        "Move to the main questions: specific recent episodes related to the research goals.",
        "Follow up and probe ('What happened next?', 'Tell me more about that'), and use neutral acknowledgements rather than agreement {{src:nng-user-interviews}}.",
        "Close by asking whether anything important was missed; then write notes immediately and transcribe.",
        "Analyse across interviews: code the transcripts and develop themes, for example with thematic analysis {{src:braun-clarke-2006}}.",
      ],
      implementation: [
        "Write three to five research goals tied to decisions the team must make.",
        "Draft a guide of a few open questions with nested follow-ups; pilot it with one or two people {{src:nng-user-interviews}}.",
        "Recruit people with the experience you need, not 'anyone'; screen for it.",
        "Record with consent; have a second person take notes if possible.",
        "Keep interviews and usability tests apart, or keep interview questions from priming people about the design they will then test {{src:nng-user-interviews}}.",
      ],
      scenarios: [
        "Asked 'How do you budget?', a participant describes a neat monthly spreadsheet. Asked 'Tell me about last month's budget', she admits she abandoned it in week two — the specific episode, not the general account, shows the real problem.",
        "A participant says he left a fitness app 'because it was too expensive'. Probing the last weeks of use shows he stopped opening it after an injury, two months before he cancelled. Price was the reason he gave; the episode suggests a different story.",
        "A product manager wants to ask 'Would you pay for premium?'. The researcher replaces it with 'Tell me about the last time you paid for an app or upgrade — what made you do it?'",
      ],
    },
    advanced: {
      explanation: [
        "**What interviews can establish.** They are well suited to experiences, meanings, vocabulary, mental models and motivations as people understand them, and to generating hypotheses. They are poor evidence for frequencies, for future behaviour and for the causes of behaviour. Self-report is limited by memory, by what participants think is relevant and by social desirability {{src:nng-user-interviews}}, and causal explanations may rest on implicit theories rather than access to the real causes {{src:nisbett-wilson-1977}}. Pair interviews with observation or behavioural data when behaviour matters.",
        "**How many interviews.** Qualitative samples are usually purposive and sized by saturation, the point where new interviews stop yielding new themes. In Guest, Bunce and Johnson's analysis of sixty interviews, saturation occurred within the first twelve, and basic elements of metathemes appeared as early as six {{src:guest-2006-saturation}}. A systematic review of empirical tests found saturation within 9–17 interviews, particularly for relatively homogeneous populations and narrowly defined objectives; studies spanning countries, or seeking meta-themes or the full meaning of codes, needed more {{src:hennink-kaiser-2022}}. In UX this means planning roughly a dozen interviews per distinct user group with a focused goal — and more when groups differ or the question is broad.",
        "**Analysis is a method too.** Braun and Clarke describe thematic analysis as widely used but poorly demarcated, and set out guidelines for doing it deliberately and rigorously {{src:braun-clarke-2006}}. Themes do not 'emerge' by themselves: they are constructed by researchers, so analysis should be documented and, where possible, discussed with others.",
      ],
      evidence: [
        "In one data set of sixty in-depth interviews, saturation was reached within the first twelve interviews, with elements of metathemes present by six {{src:guest-2006-saturation}}.",
        "Across 23 studies, those using empirical data reached saturation within 9–17 interviews, mainly with homogeneous populations and narrow objectives {{src:hennink-kaiser-2022}}.",
        "People often cannot report the influences on their own judgments and instead give plausible causal theories; reports are accurate when the real influence is salient and plausible {{src:nisbett-wilson-1977}}.",
      ],
      debates: [
        "**Saturation as a sample-size rule.** It is the most common justification for interview numbers, but Guest and colleagues note that it gives little guidance before data collection {{src:guest-2006-saturation}}, and the review shows the numbers depend on how homogeneous the sample is and what kind of saturation is meant {{src:hennink-kaiser-2022}}. Some researchers working in an interpretive tradition question whether saturation fits their analysis at all.",
        "**Say versus do.** Interviews are criticised as unreliable about behaviour; the defence is that they are not meant to measure behaviour but to understand experience and meaning. Both positions agree that interview claims about what people do need corroborating data {{src:nng-user-interviews}}.",
        "**Structure.** Fully structured interviews make answers comparable; unstructured ones follow the participant. Most UX interviews are semi-structured: a guide used flexibly {{src:nng-user-interviews}}.",
      ],
      alternativeModels: [
        "[[contextual-inquiry|Contextual inquiry]] — interviews during real work in its setting; less reliance on memory.",
        "[[surveys|Surveys]] — the same questions to many people; breadth and frequencies, little depth.",
        "[[focus-groups|Focus groups]] — group discussion; reveals shared language and disagreement, but group dynamics shape what individuals say.",
        "[[diary-studies|Diary studies]] — participants record events close to when they happen, reducing recall problems.",
      ],
    },
  },

  origin: {
    contributors: ["John C. Flanagan", "Virginia Braun", "Victoria Clarke", "Greg Guest"],
    period: "Long-established in the social sciences; adopted in UX as 'user interviews' for discovery",
    problem:
      "Teams need to understand people's experiences, needs and reasoning before designing, and many of these cannot be observed directly or counted.",
    narrative: [
      "Interviewing has no single originator; it is a basic method across social science, market research and psychology, where it goes by names such as in-depth, semi-structured or qualitative interview {{src:nng-user-interviews}}.",
      "Flanagan's critical incident technique (1954) formalised collecting accounts of specific incidents rather than general opinions, an approach reflected in today's 'tell me about the last time…' questions {{src:flanagan-1954}}.",
      "Work on analysis and sample size — thematic analysis {{src:braun-clarke-2006}}, and empirical tests of saturation {{src:guest-2006-saturation}} {{src:hennink-kaiser-2022}} — gave practitioners more explicit guidance on how to analyse interviews and how many to run.",
    ],
    attributionNote:
      "No inventor is named because the method predates any single source; the contributors listed shaped specific practices this entry describes.",
  },

  application: {
    summary: [
      "Use in-depth interviews in discovery, to understand people's experiences, needs, language and reasoning — and combine them with observation or data whenever the question is about behaviour.",
    ],
    web: [
      "Interview recent customers about how they chose — what they compared, who they asked — before redesigning a product's comparison or checkout pages.",
    ],
    mobile: [
      "Ask about the moments the app is used in: where people are, what they are doing and what interrupts them.",
    ],
    enterprise: [
      "Interview people in each role of a process separately, and plan to observe the work too: experienced staff describe the official process more readily than their workarounds.",
    ],
    services: [
      "Ask people to tell the story of a service episode — applying for a benefit, reporting a fault — from the first trigger to the end, including contacts outside the service.",
    ],
    steps: [
      "Write research goals tied to decisions.",
      "Draft and pilot a guide of open, episode-based questions with follow-ups.",
      "Recruit people with the relevant experience, per user group.",
      "Interview with consent and recording; probe and stay neutral.",
      "Write notes at once; transcribe.",
      "Code and develop themes; report with quotes and the evidence behind each theme.",
    ],
  },

  method: {
    procedure: [
      "Define research goals linked to decisions the team must make.",
      "Write a guide: warm-up, a few open questions about specific episodes, nested follow-ups, close; pilot it.",
      "Recruit and screen participants with the relevant experience.",
      "Conduct the interview: consent, easy start, episode questions, probes, neutral acknowledgement, close.",
      "Record and transcribe; write a summary straight after each interview.",
      "Analyse across interviews: code, develop and review themes; check claims against other evidence where behaviour is involved.",
    ],
    participants:
      "Purposive samples sized by saturation: empirical tests found about 9–17 interviews for homogeneous groups with focused goals; more for diverse groups or broad questions.",
    duration: "Interviews of about 45–60 minutes; a study of one to three weeks including analysis.",
    inputs: ["Research goals", "Interview guide", "Screener and recruitment", "Consent form", "Recording set-up"],
    outputs: ["Recordings and transcripts", "Per-interview summaries", "Codes and themes with supporting quotes", "Inputs to personas, journey maps and need statements"],
    purpose: "generative",
    data: "qualitative",
  },

  whenToUse: [
    "In discovery, to understand experiences, needs, motivations and mental models.",
    "When the topic is past or private and cannot easily be observed.",
    "To learn people's own words for things.",
    "To generate hypotheses to test with behavioural methods.",
  ],
  whenNotToUse: [
    "To evaluate whether a design works — use usability testing.",
    "To measure how often something happens or how many people want something — use surveys or analytics.",
    "To predict what people will do or buy — hypothetical answers are unreliable.",
    "When you can observe the work as it happens — contextual inquiry captures detail interviews miss.",
  ],
  advantages: [
    "Depth: experiences, reasons, emotions and context in participants' own words.",
    "Flexible: follow unexpected leads in the moment.",
    "Works for past, private or rare events that cannot be observed.",
    "Builds empathy in the teams that watch or listen.",
  ],
  limitations: [
    "Reports, not observations: memory, omissions and social desirability shape answers.",
    "Explanations of one's own behaviour may be inferred, not recalled.",
    "Quality depends on the interviewer; leading questions compromise validity.",
    "Small purposive samples cannot establish frequencies.",
    "Analysis is time-consuming and depends on researchers' interpretation.",
  ],
  misconceptions: [
    {
      myth: "Asking people what they want is the way to find out what to build.",
      reality:
        "People are poor predictors of their own future behaviour and of solutions they have not used. Ask about past episodes and the problems in them, and design from those.",
    },
    {
      myth: "An interview is a usability test without the prototype.",
      reality:
        "Interviews are generative and attitudinal — learning about people's lives and needs; usability tests are evaluative and behavioural — watching people use a design {{src:nng-user-interviews}}.",
    },
    {
      myth: "Five interviews are always enough.",
      reality:
        "Empirical tests of saturation found 9–17 interviews for homogeneous groups with narrow goals, and more for diverse samples or broad questions {{src:hennink-kaiser-2022}}.",
    },
    {
      myth: "If a participant tells you why they did something, you know the cause.",
      reality:
        "People often give a plausible explanation rather than the actual influence {{src:nisbett-wilson-1977}}. Record it as their account, and look for corroborating evidence.",
    },
  ],

  relations: [
    { target: "usability-testing", type: "contrasts-with", note: "Interviews are generative and attitudinal; usability tests are evaluative and behavioural." },
    { target: "surveys", type: "contrasts-with", note: "Interviews give depth from few people; surveys give breadth and frequencies from many." },
    { target: "thematic-analysis", type: "complementary-to", note: "Interview transcripts are commonly analysed by coding and developing themes." },
    { target: "personas", type: "applied-in", note: "Interview findings are a main input when building personas." },
    { target: "stakeholder-interviews", type: "related-to", note: "The same technique applied to people inside the organisation, with different goals." },
    { target: "sample-size-estimation", type: "related-to", note: "Interview samples are sized by saturation, not by statistical precision." },
  ],

  practice: {
    dos: [
      { text: "Ask about the last time something happened.", why: "Specific episodes bring back detail that general questions do not {{src:nng-user-interviews}} {{src:flanagan-1954}}.", kind: "industry" },
      { text: "Write research goals before questions.", why: "Goals that are too broad produce interviews without actionable insight {{src:nng-user-interviews}}.", kind: "industry" },
      { text: "Acknowledge neutrally: 'I see', 'Okay', or repeat their words.", why: "Neutral cues show you are listening without signalling which answers you prefer {{src:nng-user-interviews}}.", kind: "industry" },
      { text: "Plan roughly a dozen interviews per distinct group with a focused goal, and review for new themes as you go.", why: "Empirical tests found saturation within 9–17 interviews for homogeneous groups and narrow goals {{src:hennink-kaiser-2022}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't ask people to predict their behaviour ('Would you use…?').", why: "Hypothetical questions invite polite agreement and say little about what people will do.", kind: "context" },
      { text: "Don't ask leading or double-barrelled questions.", why: "Leading questions compromise the validity of interview data {{src:nng-user-interviews}}; two questions in one get one answer.", kind: "industry" },
      { text: "Don't report interview percentages as if they were survey results.", why: "Purposive samples of a dozen people show what exists and why, not how common it is.", kind: "standard" },
    ],
    examples: [
      {
        title: "An interview guide built from one research goal",
        language: "text",
        code: `GOAL  Understand what makes sharing costs among friends awkward,
      so we can decide whether reminders belong in the product.

WARM-UP (5 min)
  Tell me a bit about who you usually spend money with.

MAIN (35 min)
  Tell me about the last time you split a cost with friends.
    - What was it for? Who paid at first?
    - What happened afterwards? How long did it take?
    - How did you feel when … (use their words)?
  Tell me about a time it went badly.
    - What did you do? What did you not do?

PROBES (use any time)
  Tell me more about that.  /  What happened next?  /  What do you mean by "…"?

CLOSE (5 min)
  Is there anything about this we haven't talked about that matters to you?

AVOID
  "Would you use automatic reminders?"         (hypothetical)
  "Isn't it annoying when people don't pay?"   (leading)
  "How do you track and settle debts?"         (double-barrelled, general)`,
        caption:
          "Illustrative guide. Every main question asks for a specific episode; follow-ups are nested so they can be skipped when the story already covers them; the AVOID list names the three question faults this entry's exercise corrects.",
      },
    ],
  },

  exercises: [
    {
      id: "in-depth-interviews-ex-rewrite",
      kind: "critique",
      level: "beginner",
      title: "Correct five questions",
      prompt: [
        "Name the fault in each question and rewrite it as an open question about a specific episode.",
        "(a) 'Would you use a feature that reminds you to pay friends back?' (b) 'Don't you find splitting bills stressful?' (c) 'How often and how do you pay people back?' (d) 'Why do you prefer cash?' (asked before the participant mentioned cash) (e) 'Do you use our app?'",
      ],
      deliverable: "Five faults named and five rewritten questions.",
      criteria: [
        "(a) hypothetical/future, (b) leading, (c) double-barrelled and general, (d) presupposes and asks for a cause, (e) closed",
        "Each rewrite is open and asks for a past episode",
        "No rewrite names the solution or suggests an answer",
      ],
      exampleSolution: [
        "(a) Hypothetical. 'Tell me about the last time someone owed you money after a night out.'",
        "(b) Leading. 'How did you feel the last time you split a bill?'",
        "(c) Two questions, and general. 'Tell me about the last time you paid someone back. What did you use?'",
        "(d) Presupposes a preference and asks for a cause. 'Tell me about the last few times you paid a friend — how did you do it?'",
        "(e) Closed. 'Tell me about the last time you opened a money app. What were you doing?'",
      ],
    },
    {
      id: "in-depth-interviews-ex-guide",
      kind: "assignment",
      level: "intermediate",
      title: "Write a guide from a goal",
      prompt: [
        "Research goal: understand why first-time buyers abandon a mortgage application part-way.",
        "Write a guide with a warm-up, two main episode questions with three nested follow-ups each, a probe list and a close. Then pilot it with one person and note one change.",
      ],
      deliverable: "A one-page guide and a note on what the pilot changed.",
      criteria: [
        "Main questions ask about specific past episodes",
        "Follow-ups are nested and skippable",
        "No hypothetical, leading or double-barrelled questions",
        "A concrete change from the pilot",
      ],
    },
    {
      id: "in-depth-interviews-ex-sample",
      kind: "scenario",
      level: "advanced",
      title: "Plan the sample and the claims",
      prompt: [
        "A team plans six interviews with 'customers' — a mix of small-business owners and consumers in three countries — to decide which of two features to build first. Their draft report template has a slide headed '% of users who want feature A'.",
        "Critique the plan using the evidence on saturation and the limits of self-report, and propose a better one.",
      ],
      deliverable: "Three problems and a revised plan.",
      criteria: [
        "Notes that a mixed, multi-country sample needs more interviews per group than a homogeneous one",
        "Notes that interview percentages are not frequencies, and stated wants are not behaviour",
        "Proposes separate groups, episode-based questions about the problems, and a behavioural or survey method for prioritising",
      ],
      exampleSolution: [
        "Six interviews across two very different groups and three countries is far below the 9–17 per homogeneous group in which saturation was found; outliers such as multi-country studies needed more.",
        "'% who want feature A' treats a purposive sample as a survey and stated wishes as future behaviour.",
        "Revised: about a dozen interviews per group in one market first, asking about recent episodes of the problems each feature addresses; then size the problems with a survey or usage data before choosing.",
      ],
    },
  ],

  quiz: [
    {
      id: "in-depth-interviews-q-best",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which question is most likely to produce useful interview data about splitting costs with friends?",
      options: [
        { text: "“Tell me about the last time you split a cost with friends.”", correct: true, explanation: "It is open and asks for a specific episode, which brings back real detail." },
        { text: "“Would you use an app that splits costs automatically?”", correct: false, explanation: "Hypothetical questions invite polite agreement." },
        { text: "“Isn't it annoying when friends don't pay you back?”", correct: false, explanation: "It leads the participant towards an answer." },
        { text: "“Do you split costs with friends?”", correct: false, explanation: "Closed: it can be answered yes or no." },
      ],
      explanation: "Open questions about specific past events give the richest, most trustworthy accounts.",
    },
    {
      id: "in-depth-interviews-q-vs-test",
      kind: "true-false",
      level: "beginner",
      prompt: "A user interview and a usability test answer the same question in different ways.",
      options: [
        { text: "True", correct: false, explanation: "They answer different questions: interviews learn about people's experiences and needs; usability tests evaluate a design by watching it being used." },
        { text: "False", correct: true, explanation: "Interviews are generative and attitudinal; usability tests are evaluative and behavioural." },
      ],
      explanation: "Choose the method by the question: understanding people or evaluating a design.",
      revise: "usability-testing",
    },
    {
      id: "in-depth-interviews-q-why",
      kind: "scenario",
      level: "intermediate",
      prompt:
        "A participant says she stopped using a meal-kit service “because it was too expensive”. What should the interviewer do next?",
      options: [
        { text: "Ask her to tell the story of her last few weeks with the service, up to cancelling.", correct: true, explanation: "The episode may reveal other influences; her stated reason is her account, not necessarily the cause." },
        { text: "Record 'price' as the reason and move on.", correct: false, explanation: "People often give plausible causes rather than actual ones; the story may show something else." },
        { text: "Ask: “So would a cheaper plan have kept you?”", correct: false, explanation: "A hypothetical, leading question that invites agreement." },
        { text: "Ask her to rate the price from 1 to 10.", correct: false, explanation: "A rating adds no understanding of what happened." },
      ],
      explanation: "Treat explanations as accounts and look for what the events themselves show.",
    },
    {
      id: "in-depth-interviews-q-saturation",
      kind: "critique",
      level: "advanced",
      prompt:
        "A plan reads: “We'll run 5 interviews — that's the standard number.” The participants span three countries and two very different user types. What is the strongest critique?",
      options: [
        { text: "Saturation depends on the sample: tests found about 9–17 interviews for homogeneous groups, and more for diverse or multi-country samples.", correct: true, explanation: "Five is a usability-testing heuristic, not an interview standard, and this sample is far from homogeneous." },
        { text: "Interviews need at least 100 participants to be valid.", correct: false, explanation: "Qualitative interview samples are small by design; the issue is sizing for saturation." },
        { text: "The number is fine because interviews are qualitative.", correct: false, explanation: "Qualitative studies still need enough interviews to stop producing new themes." },
        { text: "They should run a focus group instead.", correct: false, explanation: "That changes the method without addressing the sample." },
      ],
      explanation: "Plan per distinct group, and review for new themes as you go.",
    },
  ],

  flashcards: [
    { id: "in-depth-interviews-fc-1", front: "Interview vs usability test", back: "Interview: generative, attitudinal, no design. Usability test: evaluative, behavioural, people use a design." },
    { id: "in-depth-interviews-fc-2", front: "Three question faults to avoid", back: "Leading, hypothetical ('Would you…?'), double-barrelled." },
    { id: "in-depth-interviews-fc-3", front: "Why ask about the last time?", back: "Specific episodes bring back concrete, checkable detail; general questions get idealised summaries." },
    { id: "in-depth-interviews-fc-4", front: "Saturation in empirical tests", back: "About 9–17 interviews for homogeneous groups with narrow goals; more for diverse or broad studies (Hennink & Kaiser)." },
    { id: "in-depth-interviews-fc-5", front: "What is a participant's 'why' answer?", back: "Their account — valuable — but possibly a plausible theory rather than the actual cause." },
  ],

  references: [
    { source: "nng-user-interviews", role: "explanatory", note: "Read: definition, interviews vs usability tests, guide, probing, limits of self-report." },
    { source: "flanagan-1954", role: "primary", note: "Abstract read: the critical incident technique — accounts of specific incidents." },
    { source: "nisbett-wilson-1977", role: "primary", note: "Abstract read: limits of reports on the causes of one's own behaviour." },
    { source: "guest-2006-saturation", role: "primary", note: "Abstract read: saturation within twelve of sixty interviews." },
    { source: "hennink-kaiser-2022", role: "primary", note: "Abstract read: systematic review; saturation within 9–17 interviews for homogeneous samples." },
    { source: "braun-clarke-2006", role: "primary", note: "Abstract read: thematic analysis as a flexible, rigorous analytic method." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "Interviewing is long established; the specific claims here rest on peer-reviewed work on specific incidents, self-report and saturation, and on practitioner guidance. All academic sources were read as abstracts only; the saturation figures come from particular studies and depend on sample homogeneity and the kind of saturation measured.",

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
