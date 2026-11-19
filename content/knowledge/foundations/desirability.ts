import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "desirability",
  slug: "desirability",
  title: "Desirability",
  alternateNames: ["Desirable", "Product desirability", "Appeal"],
  summary:
    "Whether people want a product and would choose it: the appeal it has beyond doing the job, including how it makes them feel and what it says about them. It is separate from usefulness and is studied with attitudinal methods.",
  definition:
    "**Desirability** is the degree to which people want a product: its appeal beyond whether it works, including what it expresses about them and how it makes them feel. Hassenzahl and Tractinsky describe user experience research as a response to technology becoming not only more useful and usable but also 'fashionable, fascinating things to desire' {{src:hassenzahl-tractinsky-2006}}. In practice, desirability is studied with attitudinal methods such as product reaction words {{src:moran-2016-desirability-toolkit}}.",
  primaryType: "concept",
  secondaryTypes: [],
  domain: "foundations",
  subcategory: "core-concepts",
  tags: ["appeal", "hedonic quality", "beauty", "emotion", "product reaction cards", "brand"],
  difficulty: "beginner",
  disciplines: ["User experience", "Product design", "Brand", "User research"],
  learningObjectives: [
    "Explain how desirability differs from usefulness and from usability, with an example of each combination.",
    "Distinguish judgements of beauty from judgements of goodness, and say what Hassenzahl's studies found about each.",
    "Plan and analyse a small product-reaction-word study, including how to choose the words and report the results.",
    "Judge what desirability evidence can and cannot show about whether people will choose or keep using a product.",
  ],
  prerequisites: ["usefulness"],

  levels: {
    beginner: {
      explanation: [
        "Two apps can do the same job equally well and still feel very different. One feels dated and fussy; the other feels calm, trustworthy and like something you would recommend. **Desirability** is that difference: whether people want the product, not only whether it works.",
        "It is a separate question from usefulness. A product can be useful and unloved, or appealing and useless. Researchers who study user experience point out that interactive products became not only useful and usable but also things people want to own and be seen with {{src:hassenzahl-tractinsky-2006}}.",
        "Because desirability is about feelings and meanings, it is studied by asking people for reactions. A common practitioner method gives people a list of words, such as 'calm', 'busy', 'professional' or 'dated', and asks them to pick the few that best describe a design {{src:moran-2016-desirability-toolkit}}.",
      ],
      analogy:
        "Two kettles boil water equally fast. You still choose one because it looks right in your kitchen and feels good to pour from. That pull toward one of two equally capable things is desirability.",
      everydayExamples: [
        "Choosing one music app over another with the same catalogue because it feels more 'you'.",
        "Trusting one bank's app more than another because it looks calm and professional.",
        "Keeping an old phone case because you like what it says about you, although a new one would protect better.",
      ],
      vocabulary: [
        { term: "Desirability", meaning: "How much people want a product, beyond whether it works." },
        { term: "Pragmatic attributes", meaning: "Perceived usability: how well people judge that a product supports their goals." },
        { term: "Hedonic attributes", meaning: "Qualities such as stimulation and identification: what a product offers beyond the task, including what it says about its owner." },
        { term: "Product reaction words", meaning: "A fixed list of adjectives from which people pick the few that best describe a design." },
      ],
    },
    intermediate: {
      explanation: [
        "Hassenzahl's studies separate two judgements people make about a product. In two studies of MP3-player skins, **goodness** (overall satisfaction) depended on both perceived usability and hedonic attributes, and after people had used the skins, perceived usability became a strong determinant of it. **Beauty** depended largely on **identification**, the product's ability to communicate personal values to others {{src:hassenzahl-2004}}.",
        "The two also changed differently with use. Perceived usability and goodness were affected by experience, including actual usability problems, while hedonic attributes and beauty stayed stable over time {{src:hassenzahl-2004}}. Desirability is therefore not the same as usability, and a first impression of beauty may survive problems that lower people's judgement of how good the product is.",
        "The **Microsoft Desirability Toolkit**, also called product reaction cards, was introduced by Benedek and Miner in 2002: 118 cards, each with a reaction word, from which participants pick the five that best describe the product, typically at the end of a usability session {{src:moran-2016-desirability-toolkit}}. Its main benefit is a controlled vocabulary, which makes answers easier to compare than free comments, although it cannot remove differences in how people read a word {{src:moran-2016-desirability-toolkit}}.",
      ],
      howItWorks: [
        "Decide what you want to learn, for example whether a redesign reads as 'trustworthy' rather than 'cheap'.",
        "Choose the words: keep positive, negative and neutral ones (the originators aimed for at least 40 % negative), shorten the list (about 25 or fewer for surveys) and randomise the order {{src:moran-2016-desirability-toolkit}}.",
        "Show the design, interactive or as a screenshot, and ask people to choose the five words that best describe it {{src:moran-2016-desirability-toolkit}}.",
        "Count the percentage of participants who chose each word, rank them, and compare groups or versions {{src:moran-2016-desirability-toolkit}}.",
        "If the brand has target attributes, decide in advance which words express them and count how many participants chose at least one {{src:moran-2016-desirability-toolkit}}.",
      ],
      implementation: [
        "Decide the target words before you test, so that results are not read selectively afterwards.",
        "Ask people why they chose each word; the reasons are often more useful than the counts.",
        "Report percentages with the number of participants, and compare versions or groups rather than reading one result in isolation {{src:moran-2016-desirability-toolkit}}.",
        "Pair desirability results with task-based testing, so that appeal is not mistaken for usefulness.",
      ],
      scenarios: [
        "Illustrative scenario: a bank redesigns its app to look 'modern'. In a reaction-word study the new version is described as 'fresh' but also as 'cheap', a word the team had listed as a risk. They adjust the colour and type before launch and retest.",
        "Illustrative scenario: a fitness app scores well on usability, but people describe it as 'boring' and 'impersonal'. The team explores motivation and personality in the design while keeping the task flows that test well.",
        "Illustrative scenario: two candidate home pages are each described as 'calm' by most participants, but only one is described as 'trustworthy'. The difference, not the shared word, informs the choice.",
      ],
    },
    advanced: {
      explanation: [
        "Desirability sits within the broader shift that Hassenzahl and Tractinsky describe: from a narrow view of products as tools to a view of user experience that includes what makes technology desirable {{src:hassenzahl-tractinsky-2006}}. Their paper is explicitly a research agenda and a proposal, not a finding.",
        "Research and practice measure different things. Hassenzahl's studies measured beauty, goodness, perceived usability and hedonic attributes with questionnaire scales {{src:hassenzahl-2004}}. Product reaction words are a practitioner method for eliciting and comparing reactions, not a validated scale {{src:moran-2016-desirability-toolkit}}. Neither measures whether people will buy or keep using a product.",
        "In design thinking, desirability is also used as one of three lenses, alongside feasibility and viability, for judging ideas: see [[design-thinking]]. That use is broader: it asks whether people would want a proposed solution at all, before anything is designed in detail.",
      ],
      evidence: [
        "In two studies of four MP3-player skins, goodness depended on perceived usability and hedonic attributes, while beauty depended largely on identification {{src:hassenzahl-2004}}. Abstract only.",
        "Perceived usability and goodness changed with experience of use, while hedonic attributes and beauty remained stable {{src:hassenzahl-2004}}. Abstract only.",
        "Product reaction words are documented as a practitioner method with guidance on adapting and analysing them; the sources read do not report a validation study {{src:moran-2016-desirability-toolkit}}.",
      ],
      debates: [
        "**Is desirability just aesthetics?** The reaction-word list covers visual appeal, microcopy, functionality and the experience as a whole {{src:moran-2016-desirability-toolkit}}, and Hassenzahl found beauty to be driven by identification rather than by usability {{src:hassenzahl-2004}}. Desirability is wider than visual style, and visual style is only part of it.",
        "**Does appeal predict choice?** The sources read measure reactions and judgements, not purchase, adoption or retention. Claims that a more desirable design will sell or retain better need behavioural evidence.",
      ],
      alternativeModels: [
        "The [[aesthetic-usability-effect]] concerns how beauty influences perceived usability, a narrower question than desirability.",
        "Hassenzahl's distinction between pragmatic and hedonic quality treats desirability-related qualities as one dimension of product perception {{src:hassenzahl-2004}}.",
      ],
    },
  },

  origin: {
    contributors: ["Marc Hassenzahl", "Noam Tractinsky", "Joey Benedek", "Trish Miner"],
    period: "Product reaction cards, 2002; Hassenzahl's studies, 2004; research agenda, 2006",
    problem:
      "Usability work measured whether people could use a product, but not whether they wanted it; practitioners needed a way to capture intangible responses such as desirability and fun {{src:moran-2016-desirability-toolkit}}.",
    narrative: [
      "At Microsoft, Benedek and Miner developed product reaction cards as a practitioner method for eliciting reactions in usability sessions {{src:moran-2016-desirability-toolkit}}.",
      "Hassenzahl's studies separated beauty from goodness and pragmatic from hedonic quality {{src:hassenzahl-2004}}, and Hassenzahl and Tractinsky set out a research agenda for user experience beyond the product as a tool {{src:hassenzahl-tractinsky-2006}}.",
    ],
    attributionNote:
      "Benedek and Miner's 2002 conference paper could not be found at a legitimate public address and was not read; the method is described, and attributed to them, from Moran's account. Moran's reference list dates the paper 2010 while naming the 2002 conference.",
  },

  application: {
    summary: [
      "Treat desirability as its own question, measured with its own methods, and always alongside evidence that the product is useful and usable.",
    ],
    web: [
      "Test whether a redesign communicates the intended brand attributes with a short reaction-word list {{src:moran-2016-desirability-toolkit}}.",
    ],
    mobile: [
      "Compare reactions to screenshots before building, when the visual direction is still cheap to change {{src:moran-2016-desirability-toolkit}}.",
    ],
    enterprise: [
      "Academy interpretation: even in tools people must use, words such as 'trustworthy' or 'dated' affect confidence and adoption, so check them alongside task performance.",
    ],
    services: [
      "Academy interpretation: ask how the service makes people feel at key moments, not only whether they completed the task.",
    ],
    steps: [
      "Decide the attributes the design should communicate.",
      "Build a balanced, shortened word list.",
      "Collect five-word choices and the reasons for them.",
      "Report percentages per word, by group and version.",
      "Combine with usability and usefulness evidence before deciding.",
    ],
  },

  whenToUse: [
    "Comparing visual directions or brand expressions before or after a redesign.",
    "Explaining why a usable product is still not chosen or recommended.",
    "Checking that a design does not communicate unintended attributes such as 'cheap' or 'intimidating'.",
  ],
  whenNotToUse: [
    "As evidence that people can complete their tasks; use task-based testing for that.",
    "As a forecast of sales or retention without behavioural data.",
  ],
  advantages: [
    "Puts appeal and meaning on the agenda alongside usefulness and usability.",
    "Reaction words give a controlled, comparable vocabulary for attitudes.",
    "Cheap to run, even with screenshots.",
  ],
  limitations: [
    "Reactions depend on how people read the words; a controlled vocabulary reduces this but does not remove it.",
    "Product reaction words are a practitioner method without a validation study in the sources read.",
    "Desirability measured in a session does not show what people will choose or keep using.",
  ],
  misconceptions: [
    {
      myth: "Desirability just means the design looks nice.",
      reality: "Reactions cover functionality, wording and the whole experience {{src:moran-2016-desirability-toolkit}}, and beauty itself was driven by identification, what the product says about its owner {{src:hassenzahl-2004}}.",
    },
    {
      myth: "If people find a product beautiful, they will judge it good.",
      reality: "Hassenzahl found that beauty and goodness had different causes: goodness depended on usability and hedonic attributes and changed with use, while beauty stayed stable {{src:hassenzahl-2004}}.",
    },
    {
      myth: "A useful and usable product is automatically desirable.",
      reality: "Desirability is a separate question; a product can work well and still feel dated or impersonal.",
    },
  ],

  relations: [
    { target: "usefulness", type: "contrasts-with", note: "Usefulness asks whether a product helps people do what they need; desirability asks whether they want it." },
    { target: "user-experience", type: "related-to", note: "User experience research widened attention from products as tools to what makes them desirable." },
    { target: "aesthetic-usability-effect", type: "related-to", note: "The aesthetic-usability effect concerns how beauty colours perceived usability, a narrower question than desirability." },
    { target: "design-thinking", type: "related-to", note: "Design thinking uses desirability as one of three lenses, with feasibility and viability, for judging ideas." },
    { target: "emotional-design", type: "related-to", note: "Emotional design deals with the feelings a product evokes, one source of its desirability." },
  ],

  exercises: [
    {
      id: "desirability-ex-words",
      kind: "assignment",
      level: "beginner",
      title: "Run a five-word reaction study",
      prompt: [
        "Choose two websites from the same sector. Build a list of 20 reaction words with at least eight negative or neutral ones.",
        "Ask three people to pick the five words that best describe each site and to say why. Tabulate the percentage choosing each word.",
      ],
      deliverable: "A word list, a results table per site, and three quoted reasons.",
      criteria: ["Word list is balanced", "Results are reported as percentages with the number of people", "Reasons are recorded, not only counts"],
    },
    {
      id: "desirability-ex-quadrant",
      kind: "critique",
      level: "intermediate",
      title: "Useful, desirable, both or neither",
      prompt: [
        "Find one product for each combination: useful and desirable; useful but not desirable; desirable but not useful; neither.",
        "For each, say what evidence you would collect to confirm the classification, naming the method for each quality.",
      ],
      deliverable: "A four-cell table with a product, a reason and a method in each cell.",
      criteria: ["Keeps the two qualities separate", "Chooses attitudinal methods for desirability and task-based ones for usefulness"],
    },
    {
      id: "desirability-ex-claim",
      kind: "reflection",
      level: "advanced",
      title: "From reactions to decisions",
      prompt: [
        "A team reports that 70 % of participants called the new design 'innovative' and concludes that it will increase sign-ups.",
        "Explain what the evidence supports, what it does not, and what further evidence would test the sign-up claim.",
      ],
      criteria: ["Separates reaction data from behavioural outcomes", "Proposes a behavioural test", "Notes sample size and comparison"],
    },
  ],

  quiz: [
    {
      id: "desirability-q-distinct",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which statement best separates desirability from usefulness?",
      options: [
        { text: "Usefulness is whether the product helps people do what they need; desirability is whether they want it", correct: true, explanation: "They are separate questions; a product can have one without the other." },
        { text: "They are the same: a useful product is always desirable", correct: false, explanation: "A product can work well and still feel dated or impersonal." },
        { text: "Desirability is a measure of how quickly tasks are completed", correct: false, explanation: "That is an efficiency (usability) measure." },
        { text: "Usefulness is about looks; desirability is about features", correct: false, explanation: "This swaps and distorts both definitions." },
      ],
      explanation: "Keep usefulness (helps with needs) and desirability (wanted) apart.",
    },
    {
      id: "desirability-q-cards",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In the product reaction card method, what do participants do?",
      options: [
        { text: "Pick the few words, typically five, that best describe the product from a fixed list", correct: true, explanation: "A controlled vocabulary makes reactions comparable." },
        { text: "Rate each of 118 words on a seven-point scale", correct: false, explanation: "The method asks for a small selection, not ratings of every word." },
        { text: "Sort cards into categories to design navigation", correct: false, explanation: "That describes card sorting, a different method for information architecture." },
        { text: "Write a free paragraph about the design", correct: false, explanation: "The point of the cards is to avoid free-form wording that is hard to compare." },
      ],
      explanation: "Product reaction cards trade nuance for comparability.",
    },
    {
      id: "desirability-q-hassenzahl",
      kind: "scenario",
      level: "intermediate",
      prompt: "After a week of use, people's ratings of how good an app is have dropped because of usability problems, but their ratings of its beauty are unchanged. Is this consistent with Hassenzahl's findings?",
      options: [
        { text: "Yes: goodness depended on perceived usability and changed with experience, while beauty stayed stable", correct: true, explanation: "This matches the pattern reported for the MP3-player skins." },
        { text: "No: beauty and goodness always move together", correct: false, explanation: "The studies found that they had different causes and behaved differently over time." },
        { text: "No: usability problems should lower beauty first", correct: false, explanation: "Beauty depended largely on identification and stayed stable." },
        { text: "It cannot be judged, because beauty cannot be measured", correct: false, explanation: "The studies measured beauty with questionnaire items." },
      ],
      explanation: "Beauty and goodness are different judgements.",
    },
    {
      id: "desirability-q-evidence",
      kind: "critique",
      level: "advanced",
      prompt: "Which conclusion from a reaction-word study with 15 participants is best supported?",
      options: [
        { text: "Version B was described as 'trustworthy' by more participants than version A, so B better communicates that attribute in this sample", correct: true, explanation: "It stays within what reaction data can show and names the sample." },
        { text: "Version B will increase sales because it is more desirable", correct: false, explanation: "Reaction data does not measure purchasing; that needs behavioural evidence." },
        { text: "Version B is more usable because people liked it", correct: false, explanation: "Liking is not evidence of task success." },
        { text: "The results generalise to all customers", correct: false, explanation: "A small sample and a chosen word list limit generalisation." },
      ],
      explanation: "Desirability evidence describes reactions; behaviour needs other evidence.",
    },
  ],

  flashcards: [
    { id: "desirability-fc-1", front: "Desirability", back: "How much people want a product, beyond whether it works." },
    { id: "desirability-fc-2", front: "Beauty versus goodness (Hassenzahl 2004)", back: "Beauty depended largely on identification and stayed stable; goodness depended on usability and hedonic attributes and changed with use." },
    { id: "desirability-fc-3", front: "Product reaction cards", back: "118 words from Benedek and Miner (2002); participants pick the five that best describe a product. A controlled vocabulary for reactions." },
    { id: "desirability-fc-4", front: "Reaction-word results", back: "Report the percentage of participants choosing each word, with the sample size, and compare versions or groups." },
  ],

  references: [
    { source: "hassenzahl-2004", role: "primary", note: "Beauty, goodness, pragmatic and hedonic attributes; abstract read." },
    { source: "hassenzahl-tractinsky-2006", role: "primary", note: "User experience research agenda; abstract read." },
    { source: "moran-2016-desirability-toolkit", role: "explanatory", note: "Product reaction cards: method and analysis; read in full." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "The research evidence comes from Hassenzahl's two studies and the research agenda by Hassenzahl and Tractinsky, both read as abstracts, so results are reported at the level of their abstracts. Product reaction cards are a practitioner method described from Moran's article, read in full; the originating 2002 paper could not be found at a legitimate address and was not read, and no validation study was read. None of the sources measures whether desirability predicts choice, purchase or retention.",

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
