import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "usefulness",
  slug: "usefulness",
  title: "Usefulness",
  alternateNames: ["Useful", "Utility and usability", "Perceived usefulness"],
  summary:
    "Whether a product actually helps people get done what they need: it must offer the right functions (utility) and let people use them well (usability). Perceived usefulness, a person's own judgement, is a related but different measure.",
  definition:
    "In usability practice, **usefulness** is the combination of **utility**, whether a design provides the functions people need, and **usability**, how easily and pleasantly people can use those functions {{src:nielsen-usability-101}}. Neither is enough alone: an easy product that does not do what people need is not useful, and neither is a capable one they cannot operate. In technology-acceptance research, **perceived usefulness** is a different construct: a person's own judgement of how useful a system is, measured with a questionnaire scale {{src:davis-1989}}.",
  primaryType: "concept",
  secondaryTypes: [],
  domain: "foundations",
  subcategory: "core-concepts",
  tags: ["utility", "usability", "user needs", "perceived usefulness", "technology acceptance", "requirements"],
  difficulty: "beginner",
  disciplines: ["User experience", "Human-computer interaction", "Information systems", "Product management"],
  learningObjectives: [
    "Define utility, usability and usefulness and explain how the three relate.",
    "Diagnose whether a failing product has a utility problem, a usability problem or both, from evidence about what people need and what they do.",
    "Distinguish observed usefulness from perceived usefulness, and say what each kind of evidence can and cannot show.",
    "Write user needs in a form that can be checked against a product's functions.",
  ],
  prerequisites: ["usability"],

  levels: {
    beginner: {
      explanation: [
        "A calculator app with beautiful buttons that cannot do percentages is no help to someone who needs percentages. A tax tool that can file every kind of return but hides each option behind confusing menus is no help either. The first fails on **utility**: it does not offer what is needed. The second fails on **usability**: what is needed is there, but people cannot use it well.",
        "Nielsen's short formula puts the two together: **usefulness = utility + usability** {{src:nielsen-usability-101}}. He calls them equally important. A product is useful only when both hold, for the people and tasks it is meant for.",
        "Utility is judged against what people need, not against a count of features. That is why user research starts by finding out who the users are and what they are trying to do: as the UK government's service manual puts it, without that you cannot build the right thing {{src:govuk-learning-user-needs}}.",
      ],
      analogy:
        "A toolbox is useful when it holds the tools the job needs (utility) and you can find and handle each one (usability). A beautifully organised box of the wrong tools fails; so does the right set of tools tipped into a heap.",
      everydayExamples: [
        "A banking app that is easy to use but cannot show pending payments, which is the one thing you opened it for.",
        "A council website that lists every service you might need, under names nobody would search for.",
        "A photo editor whose one-tap filters do exactly what most people want, quickly.",
      ],
      vocabulary: [
        { term: "Utility", meaning: "Whether a design provides the functions people need: does it do what they need?" },
        { term: "Usability", meaning: "How easily and pleasantly people can use those functions." },
        { term: "Usefulness", meaning: "Utility and usability together: the product helps people get done what they need." },
        { term: "User need", meaning: "Something a person needs from a product or service to get the right outcome for them." },
        { term: "Perceived usefulness", meaning: "A person's own judgement of how useful a system is, measured with a questionnaire scale." },
      ],
    },
    intermediate: {
      explanation: [
        "**Utility** asks whether the design's functionality matches what people need {{src:nielsen-usability-101}}. It is judged against user needs, which GOV.UK defines as the needs a user has of a service that the service must satisfy for them to get the right outcome {{src:govuk-learning-user-needs}}. A function nobody needs adds no utility, and a missing function that a core task depends on removes a great deal.",
        "**Usability** asks how well people can use the functions that are there. Nielsen notes that utility can be studied with the same user research methods that improve usability {{src:nielsen-usability-101}}: interviews and observation reveal needs, and task-based testing shows whether people can meet them.",
        "The split has a history. Grudin describes two research communities that grew up apart: one concerned with what information systems do and their effect on organisations, the other with the dialogue between people and the interface. He also notes that the function of interactive software is notoriously hard to separate from its form {{src:grudin-1992}}. In practice, a usability test often uncovers missing functions, and an interview often reveals interface problems.",
        "**Perceived usefulness** is a separate idea. In Davis's technology acceptance research it is measured with a validated six-item scale and treated, together with perceived ease of use, as a determinant of whether people accept a technology {{src:davis-1989}}. It records what people believe, which can differ from what observation shows.",
      ],
      howItWorks: [
        "Find out what people need: who they are, what they are trying to do, how they do it now and where they struggle {{src:govuk-learning-user-needs}}.",
        "Write the needs down in a checkable form, for example 'I need to … so that …' {{src:govuk-learning-user-needs}}.",
        "Check utility: map each need to the function that meets it, and list needs that no function meets.",
        "Check usability: test whether representative people can complete the needed tasks with those functions.",
        "Judge usefulness from both together, for these people and these tasks. If adoption matters, add a measure of perceived usefulness.",
      ],
      implementation: [
        "Keep a list of user needs beside the feature list and review one against the other.",
        "When a product is not used, test both explanations: a utility gap (it does not do the job) and a usability gap (people cannot make it do the job).",
        "Treat ideas and requests that do not come from users as assumptions to be checked with research {{src:govuk-learning-user-needs}}.",
        "Report usefulness for named users and tasks, not as a single score for the whole product.",
      ],
      scenarios: [
        "Illustrative scenario: a team adds twelve features to a scheduling tool and sign-ups stay flat. Interviews show that clinics needed one thing the tool lacks, sending reminders by text message. The problem is utility, and better menus would not have fixed it.",
        "Illustrative scenario: an expenses app does everything finance asked for, but staff abandon it on their phones. Testing shows that the receipt-capture step fails on small screens. The utility is there; usability is the gap.",
        "Illustrative scenario: a survey shows high perceived usefulness for a new dashboard, but analytics show that few people open it after the first week. The belief and the behaviour disagree, so the team interviews users before deciding which to trust.",
      ],
    },
    advanced: {
      explanation: [
        "'Usefulness' is used in two research traditions that should not be merged. In usability engineering it is an analytic judgement about a product, utility plus usability {{src:nielsen-usability-101}}. In information-systems research, perceived usefulness is an attitude measured with questionnaire items and used to predict acceptance {{src:davis-1989}}. Evidence from one does not transfer automatically to the other.",
        "Davis's results are often summarised as 'usefulness beats ease of use'. The abstract reports that perceived usefulness correlated more strongly with use than perceived ease of use, and that ease of use may act through usefulness rather than directly {{src:davis-1989}}. These are correlations from two studies with 152 users of four programs, and they concern people's perceptions rather than observed task success.",
        "Acceptance research later moved toward unified models. Venkatesh and colleagues compared eight acceptance models, which explained between 17 and 53 per cent of the variance in intention to use, and proposed a unified model that explained about 70 per cent {{src:venkatesh-2003}}. Usefulness-type beliefs are one family of predictors among several.",
      ],
      evidence: [
        "Perceived usefulness correlated with self-reported current use (r = .63) and predicted future use (r = .85), more strongly than perceived ease of use (r = .45 and .59), in Davis's two validation studies {{src:davis-1989}}. Abstract only.",
        "In a comparison of eight acceptance models, explained variance in intention ranged from 17 to 53 per cent; a unified model reached about 70 per cent in new organisations {{src:venkatesh-2003}}. Abstract only.",
        "Nielsen's formula usefulness = utility + usability is a practitioner's definition, not an empirical finding {{src:nielsen-usability-101}}.",
      ],
      debates: [
        "**Can function and form be separated?** Grudin notes that they are notoriously hard to separate in interactive software, and that the split between utility and usability reflects two research communities and development contexts as much as two properties {{src:grudin-1992}}. Treat utility and usability as two questions to ask, not as two parts that can be designed separately.",
        "**Perception or observation?** Perceived usefulness predicts intention and self-reported use in acceptance studies {{src:davis-1989}}, but it is a belief. Whether a product helps people do their tasks is shown by observation and task outcomes. The two kinds of evidence answer different questions.",
      ],
      alternativeModels: [
        "The **technology acceptance model** treats perceived usefulness and perceived ease of use as determinants of acceptance {{src:davis-1989}}; see [[technology-acceptance-model]].",
        "**Unified acceptance models** combine predictors from eight earlier models {{src:venkatesh-2003}}.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Fred D. Davis", "Jonathan Grudin"],
    period: "Davis's acceptance scales, 1989; Grudin's account of utility and usability, 1992; Nielsen's definition in practitioner writing",
    problem:
      "Products failed for two different reasons, doing the wrong things and being hard to use, and the two research communities that studied them used different terms {{src:grudin-1992}}.",
    narrative: [
      "In information-systems research, Davis developed scales for perceived usefulness and perceived ease of use to predict whether people accept a technology {{src:davis-1989}}.",
      "Grudin traced how one community studied system functionality and organisational impact while another studied interfaces, and noted how hard function and form are to separate {{src:grudin-1992}}.",
      "In usability practice, Nielsen's definition, usefulness as utility plus usability, became the common shorthand {{src:nielsen-usability-101}}.",
    ],
  },

  application: {
    summary: [
      "Use the distinction to diagnose failure correctly: a utility gap needs different functions, a usability gap needs a better design of the functions you have, and many products need some of both.",
    ],
    web: [
      "Check top tasks against the site's functions and content before redesigning navigation.",
    ],
    mobile: [
      "Check that the tasks people need on the move are available on the phone, not only on the desktop version.",
    ],
    enterprise: [
      "Map each role's needs to system functions; a workaround such as a spreadsheet usually marks a utility gap.",
    ],
    services: [
      "Start from the outcome people need from the service, including staff who support them {{src:govuk-learning-user-needs}}.",
    ],
    steps: [
      "Research and write down user needs.",
      "Map needs to functions and list the gaps.",
      "Test the needed tasks with representative users.",
      "Classify each problem as utility, usability or both.",
      "Fix, then test again with the same tasks.",
    ],
  },

  whenToUse: [
    "Diagnosing why a product is not adopted or not used.",
    "Prioritising work between new functions and better design of existing ones.",
    "Explaining to stakeholders why an easy-to-use product can still fail.",
  ],
  whenNotToUse: [
    "As a single score for a whole product: usefulness holds for particular people and tasks.",
    "To treat a perceived-usefulness survey as proof that people can complete their tasks.",
  ],
  advantages: [
    "Separates two common causes of failure that need different fixes.",
    "Connects user research on needs with usability testing on tasks.",
    "Has a validated measure on the perception side (Davis's scales).",
  ],
  limitations: [
    "Utility and usability are hard to separate in practice, because function and form are intertwined.",
    "The formula usefulness = utility + usability is a definition, not a measurement method.",
    "Perceived usefulness is a belief and may differ from observed behaviour.",
  ],
  misconceptions: [
    {
      myth: "Usefulness and usability mean the same thing.",
      reality: "Usability is how well people can use the functions; usefulness also requires that the functions are the right ones {{src:nielsen-usability-101}}.",
    },
    {
      myth: "More features mean more utility.",
      reality: "Utility is judged against what people need. A function that meets no need adds nothing, and a missing function that a core task depends on can make the product useless for that task {{src:govuk-learning-user-needs}}.",
    },
    {
      myth: "If users rate a system as useful, it helps them do their work.",
      reality: "Perceived usefulness measures belief and predicts acceptance in studies {{src:davis-1989}}; whether people can complete their tasks is shown by observation.",
    },
  ],

  relations: [
    { target: "usability", type: "complementary-to", note: "Usability is one half of usefulness: how well people can use the functions that are there." },
    { target: "user-experience", type: "related-to", note: "Usefulness is one of the qualities a good user experience needs, alongside usability, accessibility and others." },
    { target: "desirability", type: "contrasts-with", note: "Usefulness asks whether a product helps people do what they need; desirability asks whether they want it." },
    { target: "jobs-to-be-done", type: "related-to", note: "Jobs-to-be-done research describes what people are trying to get done, the standard against which utility is judged." },
    { target: "technology-acceptance-model", type: "related-to", note: "Perceived usefulness is one of the two core constructs of the technology acceptance model." },
  ],

  exercises: [
    {
      id: "usefulness-ex-diagnose",
      kind: "critique",
      level: "beginner",
      title: "Utility or usability?",
      prompt: [
        "Pick an app or website you gave up on. Write one sentence about what you needed from it.",
        "Then decide: did it lack the function you needed (utility), make the function too hard to use (usability), or both? Give the evidence for your answer.",
      ],
      deliverable: "A need statement and a classified diagnosis with evidence.",
      criteria: ["States a specific need", "Classifies the failure correctly", "Gives observable evidence, not a general opinion"],
    },
    {
      id: "usefulness-ex-needs-map",
      kind: "assignment",
      level: "intermediate",
      title: "Map needs to functions",
      prompt: [
        "Write five user needs for a product you know in the form 'I need to … so that …'.",
        "Map each need to the function that meets it, mark needs with no function, and mark functions that meet no listed need. Plan one task-based test for the need you think is worst served.",
      ],
      deliverable: "A needs-to-functions table and a one-task test plan.",
      criteria: ["Needs are written from the user's side", "Gaps in both directions are marked", "The test checks usability of a function that exists"],
    },
    {
      id: "usefulness-ex-evidence",
      kind: "reflection",
      level: "advanced",
      title: "Belief and behaviour",
      prompt: [
        "A stakeholder shows a survey in which 80 % of staff rate a new tool as useful and argues that the project succeeded.",
        "Explain what this evidence shows and does not show, using the difference between perceived usefulness and observed usefulness, and propose two additional pieces of evidence.",
      ],
      criteria: ["Separates perception from behaviour", "Proposes behavioural or task-based evidence", "Does not dismiss the survey; places it correctly"],
    },
  ],

  quiz: [
    {
      id: "usefulness-q-formula",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In Nielsen's definition, what makes a design useful?",
      options: [
        { text: "It has both utility (the functions people need) and usability (people can use them well)", correct: true, explanation: "Usefulness needs both; either alone is not enough." },
        { text: "It is easy to use", correct: false, explanation: "That is usability only. An easy product that does not do what people need is not useful." },
        { text: "It has more features than competing products", correct: false, explanation: "Utility is judged against needs, not feature counts." },
        { text: "People say they like it", correct: false, explanation: "Liking is closer to satisfaction or desirability; it does not show that the product meets needs." },
      ],
      explanation: "Usefulness = utility + usability, for particular people and tasks.",
    },
    {
      id: "usefulness-q-diagnose",
      kind: "scenario",
      level: "beginner",
      prompt: "Testing shows that people complete every task in a booking app quickly, but clinics still keep a paper diary because the app cannot handle group appointments. What is the main problem?",
      options: [
        { text: "Utility: a function the clinics need is missing", correct: true, explanation: "The tasks that exist work well; the gap is a needed function." },
        { text: "Usability: the app is hard to use", correct: false, explanation: "The tests show people complete tasks quickly." },
        { text: "Desirability: the clinics dislike the visual design", correct: false, explanation: "Nothing in the scenario concerns appeal; the paper diary covers a missing function." },
        { text: "None: the paper diary is the clinics' preference", correct: false, explanation: "A workaround for a missing function is a classic sign of a utility gap, not a free preference." },
      ],
      explanation: "Workarounds outside the product often point to utility gaps.",
    },
    {
      id: "usefulness-q-perceived",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "In Davis's technology acceptance research, what is perceived usefulness?",
      options: [
        { text: "A person's own judgement of a system's usefulness, measured with a questionnaire scale and used to predict acceptance", correct: true, explanation: "It is an attitude measured with validated items, not an observation of task success." },
        { text: "The number of tasks users completed in a test", correct: false, explanation: "That is a behavioural usability measure, not a perception." },
        { text: "The same thing as Nielsen's utility", correct: false, explanation: "Utility is whether the functions match needs; perceived usefulness is a person's belief." },
        { text: "A measure of how attractive the interface looks", correct: false, explanation: "Appeal is a separate quality; perceived usefulness concerns expected benefit." },
      ],
      explanation: "Keep the analytic and the attitudinal senses of usefulness apart.",
    },
    {
      id: "usefulness-q-davis",
      kind: "critique",
      level: "advanced",
      prompt: "A slide says: 'Davis proved that usefulness matters more than usability.' Which correction is most accurate?",
      options: [
        { text: "Davis found that perceived usefulness correlated more strongly with reported use than perceived ease of use did, in two studies; these are correlations between perceptions, not a test of observed usability", correct: true, explanation: "It keeps the finding, its measures and its limits." },
        { text: "The slide is correct as written", correct: false, explanation: "'Proved' and 'usability' both overstate: the study measured perceived ease of use and found correlations." },
        { text: "Davis found that ease of use matters more than usefulness", correct: false, explanation: "The abstract reports the opposite pattern." },
        { text: "Davis studied visual appeal, not usefulness", correct: false, explanation: "The study developed scales for perceived usefulness and perceived ease of use." },
      ],
      explanation: "Report what was measured (perceptions), what was found (correlations) and in what sample.",
    },
  ],

  flashcards: [
    { id: "usefulness-fc-1", front: "Utility", back: "Whether a design provides the functions people need." },
    { id: "usefulness-fc-2", front: "Usefulness (Nielsen)", back: "Utility + usability: the right functions, usable by the intended people for their tasks." },
    { id: "usefulness-fc-3", front: "Perceived usefulness (Davis)", back: "A person's own judgement of a system's usefulness, measured with a questionnaire scale and used to predict acceptance." },
    { id: "usefulness-fc-4", front: "A sign of a utility gap", back: "People keep a workaround, such as a spreadsheet or a paper diary, for something the product cannot do." },
  ],

  references: [
    { source: "nielsen-usability-101", role: "explanatory", note: "Utility, usability and usefulness defined; read in full." },
    { source: "govuk-learning-user-needs", role: "explanatory", note: "User needs as the standard for utility; read in full." },
    { source: "davis-1989", role: "primary", note: "Perceived usefulness scale and its relation to use; abstract read." },
    { source: "grudin-1992", role: "primary", note: "Utility and usability as two research communities; abstract read." },
    { source: "venkatesh-2003", role: "primary", note: "Comparison of acceptance models; abstract read." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "The definition of usefulness as utility plus usability is a practitioner's definition, read in full. The research evidence concerns perceived usefulness: Davis's validation studies and Venkatesh and colleagues' model comparison, both read as abstracts, so the entry reports their headline results and not their item wording or detailed statistics. Grudin's account of utility and usability is also read as an abstract. No study read here measures observed usefulness directly; the entry says so where it matters.",

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
  lastVerifiedAt: "2026-11-19",
});
