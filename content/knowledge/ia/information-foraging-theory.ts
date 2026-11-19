import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "information-foraging-theory",
  slug: "information-foraging-theory",
  title: "Information Foraging Theory",
  alternateNames: ["IFT", "Information foraging", "Pirolli and Card's foraging theory"],
  summary:
    "A theory of information seeking that borrows from behavioural ecology: people estimate the gain and the cost of each source from the cues in front of them, and follow, consume or leave accordingly.",
  definition:
    "**Information foraging theory** (IFT) is a theory of how people seek information, developed by Peter Pirolli, Stuart Card and colleagues at the Palo Alto Research Center {{src:nielsen-2003-information-foraging}}. Drawing on rational analysis of cognition, behavioural ecology and microeconomics, it aims to explain and predict how people adapt their information seeking to the environment they work in, and how environments can be shaped to suit people {{src:pirolli-2007}}. Its central idea is a cost-benefit analysis: a person estimates the gain to expect from a source and the cost of finding and consuming it, using experience or the cues the design offers {{src:nielsen-2003-information-foraging}}.",
  primaryType: "theory",
  secondaryTypes: [],
  domain: "ia",
  subcategory: "findability",
  tags: ["information seeking", "information scent", "navigation", "findability", "cost-benefit", "patch leaving", "behavioural ecology"],
  difficulty: "intermediate",
  disciplines: ["Information architecture", "Human-information interaction", "Cognitive science", "Web usability"],
  learningObjectives: [
    "Describe the foraging analogy and its three decisions (which path to follow, which items to consume, when to leave a source), with a web example of each.",
    "Distinguish the theory from information scent, one of its concepts, and from the design rules practitioners have drawn from it.",
    "Explain a visitor's link choice or exit as a cost-benefit estimate, naming the cues and the need the explanation assumes.",
    "Judge a claim made in the theory's name by saying whether it is a research finding, professional guidance or interpretation, and what would test it.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Looking for an answer, you rarely read everything. You scan a page, click the link that looks most promising, skim what opens, and then either keep reading or go back and try another route. Information foraging theory describes this as **foraging**: like an animal searching for food, a person weighs what each option is likely to give against what it will cost to get {{src:nielsen-2003-information-foraging}}.",
        "Nielsen's account of the theory is organised around three decisions {{src:nielsen-2003-information-foraging}}. **Scent**: which path to follow, judged from cues that suggest whether it leads to what you need. **Diet**: which items are worth consuming at all. **Patch leaving**: when to stop working through one source and look elsewhere. On the web, a site or a page is a *patch*.",
        "The theory is about someone pursuing an information need. The same link can look promising for one need and useless for another, because what a cue means depends on what the person is looking for {{src:budiu-2020-information-scent}}.",
      ],
      analogy:
        "Picture a forager in open country with several berry bushes. From a distance she can see which bushes look heavy with fruit (scent), she picks the ones worth the walk (diet), and she moves on when her bush thins out and the next one is close (patch leaving). A person on the web does the same with links and sites, using labels and summaries where she used the look of the bush.",
      everydayExamples: [
        "Scanning a search results page and opening the result whose title names your exact problem.",
        "Opening three tabs, skimming each for a few seconds and closing two.",
        "Giving up on a site's menu and going back to the search engine because another source looks easier to use.",
      ],
      vocabulary: [
        { term: "Information need", meaning: "What the person is trying to find out; the standard against which every cue is judged." },
        { term: "Patch", meaning: "A source of information, such as a web page or a whole site." },
        { term: "Information scent", meaning: "The person's imperfect estimate of the value a source will deliver, derived from how the source is represented and from what they already know." },
        { term: "Diet selection", meaning: "Deciding which available items are worth consuming, by weighing expected gain against effort." },
        { term: "Patch leaving", meaning: "Deciding to stop working in one source and go to another." },
      ],
    },
    intermediate: {
      explanation: [
        "At the centre of the theory is **cost-benefit analysis for navigation**. A person asks what gain to expect from an information source such as a page, and what it is likely to cost, in time and effort, to find and consume it. Both answers are estimates, made from experience or from cues the design provides {{src:nielsen-2003-information-foraging}}. Fu and Pirolli's SNIF-ACT model puts this into computational form: it quantifies the perceived relevance of a link to a user's goal by spreading activation, and treats the choice to click a link or go back as a Bayesian satisficing decision that combines earlier and current assessments of link-text relevance {{src:fu-pirolli-2007}}.",
        "**Scent** is the estimate of value. Budiu describes it as the user's imperfect estimate of what a source will deliver, built from the source's *representation* (the link label, any text or image beside it, the surrounding page) and from what the user already knows about the brand or the subject {{src:budiu-2020-information-scent}}. Chi and colleagues define it for modelling purposes as the subjective sense of the value and cost of reaching a page, based on perceptual cues {{src:chi-pirolli-chen-pitkow-2001}}. Nielsen's reading is that people keep following a trail while the scent seems to strengthen, and give up when progress no longer seems worth the effort {{src:nielsen-2003-information-foraging}}.",
        "Scent is an estimate, so it can be wrong. The true value of a page is unknown until it has been read {{src:budiu-2020-information-scent}}. A label cannot change what a page contains; it can only change what visitors expect, which is why a mismatch between expectation and content costs them effort and, as Budiu argues, trust.",
        "**Diet** and **patch leaving** extend the same logic. For diet, Nielsen's example is a fox that should skip large rabbits that are hard to catch and hunt small ones; he applies it to the web as content that must both look worth consuming and be easy to reach. For patch leaving, he describes the choice to stay or go as depending on how far away the next patch is {{src:nielsen-2003-information-foraging}}.",
      ],
      howItWorks: [
        "A person has an information need and meets a set of possible sources.",
        "Each source is represented by cues: link labels, snippets, images, position and context on the page. The person combines these with what they already know about the source or the subject {{src:budiu-2020-information-scent}}.",
        "From the cues they estimate how valuable the source is for this need and how costly it will be to reach and read, which is its scent {{src:nielsen-2003-information-foraging}}.",
        "They follow the best-scented link or skip it. In the SNIF-ACT model, links on a page are evaluated one after another, and the choice is to click or to go back {{src:fu-pirolli-2007}}.",
        "Having arrived, they keep consuming the source or leave for another, and the cycle repeats with what they have learned.",
      ],
      implementation: [
        "Write links and category descriptions so they say what is at the destination, and avoid invented terms or slogans as navigation labels, which carry no scent for the thing being sought {{src:nielsen-2003-information-foraging}}.",
        "On each page, show that the visitor is still on the path they chose: where they are and how it relates to their task {{src:nielsen-2003-information-foraging}}.",
        "Do not rely on surrounding context to explain a link. On small screens the context may not be visible, so a more specific label is safer {{src:budiu-2020-information-scent}}.",
        "Show sample content and prominent navigation or search early, so the site looks worth consuming and easy to use {{src:nielsen-2003-information-foraging}}.",
        "Treat each of these as a hypothesis for your own users: check them with a first-click or tree test rather than assuming the theory has settled the question.",
      ],
      scenarios: [
        "Illustrative scenario: a clinic site calls its opening-hours page 'Your visit'. A parent looking for Sunday hours sees 'Your visit', 'Our services' and 'Contact'. For this need none of the three labels signals the answer, so the theory leads you to expect hesitation or an exit to another source; relabelling the first link 'Opening hours' would raise its scent for this need.",
        "Illustrative scenario: a landing page opens with one large photograph and a logo, with no text on the first screen. A visitor arriving from search has few cues to judge whether the page matches their need and may leave without scrolling. Adding two lines that name what the page covers gives them something to estimate from.",
        "Illustrative scenario: two recipe sites contain similar recipes. Search results offer ten alternatives one click away from either. On Nielsen's reading of patch leaving, easy alternatives make a shorter stay more likely on both, so the more useful design question is how quickly a visitor can tell that this page holds what they need.",
      ],
    },
    advanced: {
      explanation: [
        "IFT is better described as a family than a single claim. It is a theory of adaptive information seeking built on rational analysis of cognition and microeconomic cost-benefit reasoning {{src:pirolli-2007}}; computational models, SNIF-ACT among them {{src:fu-pirolli-2007}}; and scent-based algorithms that infer an information need from a surfing pattern or predict surfing from a need {{src:chi-pirolli-chen-pitkow-2001}}. Design rules such as 'label links by their destination' sit a step further out: they are practitioners' applications of the theory, not parts of it {{src:nielsen-2003-information-foraging}}.",
        "The theory has been extended from individuals to groups. Social foraging describes how people who look for information, and those who contribute to it, leave traces such as reviews and tags that add to the scent other people perceive {{src:budiu-2020-information-scent}}.",
        "Its scope follows from how it is framed. The models and tools in the sources read here begin from a stated information need or goal, and scent is defined relative to that need {{src:chi-pirolli-chen-pitkow-2001}} {{src:budiu-2020-information-scent}}. How well the theory describes browsing with no goal at all is not addressed in the parts of those sources read here.",
      ],
      evidence: [
        "SNIF-ACT, a computational model derived from the theory, is presented as explaining web navigation behaviour {{src:fu-pirolli-2007}}. Abstract only: the tasks, participants and fit were not read.",
        "Two scent-based algorithms, one inferring information needs from surfing patterns and one predicting surfing from needs, were evaluated empirically and reported as effective {{src:chi-pirolli-chen-pitkow-2001}}. Abstract only: the data and measures were not read.",
        "Pirolli's book is described as presenting empirical tests of the theory's predictions and its application to user-interface design {{src:pirolli-2007}}. Abstract only.",
      ],
      debates: [
        "**Research and its popular reading.** The design rules usually quoted in the theory's name come from Nielsen and Budiu, who write as practitioners. Nielsen's claim that visits to any single website will keep getting shorter is his prediction from the patch-leaving logic, and the article gives no data for it {{src:nielsen-2003-information-foraging}}. Treat it as a hypothesis to test, not a finding.",
        "**An adaptive, cost-benefit account against other accounts of searching.** IFT assumes people adapt to the cost structure of their environment. Bates's berrypicking model was proposed as a closer description of real searching than the traditional information-retrieval model {{src:bates-1989}}. The two make different claims about what searching is, and this entry does not weigh them.",
        "**'Lazy' users.** Nielsen summarises the theory by calling users selfish, lazy and ruthless in their cost-benefit analyses {{src:nielsen-2003-information-foraging}}. That wording is his characterisation. The research sources describe adaptive behaviour under rational analysis {{src:pirolli-2007}}.",
      ],
      alternativeModels: [
        "Bates's **berrypicking** model of searching, proposed as closer to real searcher behaviour than the traditional information-retrieval model and as a guide to search-interface design {{src:bates-1989}}.",
        "The **traditional information-retrieval model** that berrypicking was proposed against, in which a query is matched to documents {{src:bates-1989}}.",
      ],
    },
  },

  origin: {
    contributors: ["Peter Pirolli", "Stuart Card"],
    period: "Pirolli and Card's journal article, 1999; Pirolli's book, 2007",
    problem:
      "Information environments hold far more than anyone can consume, so people need adaptive strategies for deciding where to look and when to stop. The theory was developed to explain and predict those strategies {{src:pirolli-2007}}.",
    narrative: [
      "The theory was developed at the Palo Alto Research Center, formerly Xerox PARC, by Stuart Card, Peter Pirolli and colleagues, using the behaviour of foraging animals as an analogy for how people gather information {{src:nielsen-2003-information-foraging}}. Pirolli and Card published an article titled 'Information foraging' in *Psychological Review* in 1999 {{src:pirolli-card-1999}}.",
      "Computational models and tools followed. The scent-based algorithms of Chi and colleagues appeared in 2001 {{src:chi-pirolli-chen-pitkow-2001}}, Pirolli's book setting out the theory and its tests in 2007 {{src:pirolli-2007}}, and the SNIF-ACT navigation model in the same year {{src:fu-pirolli-2007}}.",
      "Web usability took the theory up through practitioner articles. Nielsen's 2003 piece called information foraging the most important concept to emerge from human-computer interaction research since 1993, which is his judgement {{src:nielsen-2003-information-foraging}}, and NN/g has since published explanations of scent aimed at designers {{src:budiu-2020-information-scent}}.",
    ],
    attributionNote:
      "The 1999 article and the 2007 book were not read for this entry, so it does not attribute equations, parameters or findings to them. Its account of the theory rests on their abstracts, on the abstracts of later papers, and on two NN/g articles read in full.",
  },

  application: {
    summary: [
      "In design work the theory is most often used as a lens on choice points: a menu, a results page, a link in running text. For each one, ask what the visitor can see, what that suggests about the destination for their need, and what it will cost them to find out.",
    ],
    web: [
      "Label links by what is at the destination and add a summary where the label alone cannot carry it {{src:nielsen-2003-information-foraging}}.",
      "Check that the first screen of a landing page gives enough cues to judge relevance without scrolling {{src:budiu-2020-information-scent}}.",
    ],
    mobile: [
      "Use more specific link names where the surrounding context may be off screen {{src:budiu-2020-information-scent}}.",
    ],
    enterprise: [
      "Academy interpretation: internal search results and intranet menus are choice points too, and the same reading applies. Test it with staff doing real tasks.",
    ],
    services: [
      "Academy interpretation: a phone menu is a trail of spoken labels, and each option is a cue the caller judges against what they called about.",
    ],
    steps: [
      "Write the visitor's need as one sentence.",
      "List the choice points between where they start and where the answer is.",
      "At each, list the cues they can see and judge whether each suggests value for this need.",
      "Note what each choice is likely to cost in time and effort, and where a wrong choice leaves them.",
      "Test the weakest choice points with first-click or tree tests.",
      "Revise the labels or structure and test again.",
    ],
  },

  whenToUse: [
    "Explaining why people pass over, abandon or leave a page, in terms of cues and cost.",
    "Reviewing navigation labels, search results and link summaries against a stated need.",
    "Framing a findability problem as a cost-benefit problem so that fixes address cues, not only layout.",
  ],
  whenNotToUse: [
    "As proof that a particular label or structure will work: the theory suggests what to test, and the test settles it.",
    "To justify a design rule from the fox analogy alone. The analogy illustrates the theory; it is not evidence for the rule.",
    "For numerical predictions, unless you are using one of the formal models and its data.",
  ],
  advantages: [
    "Gives designers one vocabulary for cues, effort and choice.",
    "Produces predictions that can be checked with first-click, tree-testing and analytics data.",
    "Has computational models behind it as well as practitioner guidance {{src:fu-pirolli-2007}}.",
  ],
  limitations: [
    "This entry rests on abstracts and two practitioner articles. It cannot report how well the models fitted the data, which parameters they use, or what the 1999 article found.",
    "Most design advice attached to the theory is practitioner interpretation without data in the sources read.",
    "The models and tools in the sources read start from a stated information need, so they say little about aimless browsing.",
    "Scent is an estimate of value, so a theory about estimates cannot say how good the content behind a link is.",
  ],
  misconceptions: [
    {
      myth: "Information foraging theory and information scent are the same thing.",
      reality:
        "Scent is one central concept in the theory {{src:budiu-2020-information-scent}}. The theory also covers which items to consume and when to leave a source, and rests on weighing cost against gain {{src:nielsen-2003-information-foraging}}.",
    },
    {
      myth: "The theory says people are lazy, or behave like animals.",
      reality:
        "The research sources frame behaviour as adaptive, analysed with rational analysis and cost-benefit reasoning {{src:pirolli-2007}}. 'Selfish, lazy and ruthless' is Nielsen's summary, not a finding {{src:nielsen-2003-information-foraging}}.",
    },
    {
      myth: "A link has a fixed amount of scent, whoever reads it.",
      reality:
        "Scent is relative to a need. The same label can have strong scent for one need and weak scent for another, and prior knowledge of the brand or subject changes it too {{src:budiu-2020-information-scent}}.",
    },
    {
      myth: "Stronger scent is always better, so a more enticing label is always better.",
      reality:
        "Scent is an estimate, and the true value of a page is known only after reading it {{src:budiu-2020-information-scent}}. Budiu argues that enticing labels that the content does not support use up visitors' trust.",
    },
  ],

  relations: [
    { target: "information-architecture", type: "applied-in", note: "Information architecture is where the theory's cost-benefit reading of labels, grouping and routes is applied: navigation works when labels carry scent toward what people need." },
    { target: "tree-testing", type: "related-to", note: "Tree testing shows where people expect an item to be from category names alone, which are the cues a scent-based choice relies on." },
    { target: "discoverability", type: "related-to", note: "Discoverability asks whether people notice that a function or content exists; foraging theory describes how they choose among sources once they are looking for something." },
    { target: "plain-language", type: "related-to", note: "Nielsen advises plain words rather than invented terms for navigation, because made-up labels carry no scent for the thing being sought." },
    { target: "information-scent", type: "related-to", note: "Scent is the theory's best-known concept and is treated as a topic in its own right." },
  ],

  exercises: [
    {
      id: "information-foraging-theory-ex-scent-read",
      kind: "critique",
      level: "beginner",
      title: "Read the scent",
      prompt: [
        "Choose a website you use and write down one information need in a sentence, for example 'find out whether the library is open on Sunday'.",
        "List the labels in its main navigation. For each, mark whether it signals the answer to your need strongly, weakly or not at all, and write the cue that made you decide.",
        "Now pick a second need on the same site and mark the labels again.",
      ],
      deliverable: "Two short tables of labels with a rating and a reason for each.",
      criteria: [
        "Each rating is tied to a cue that is visible on the page",
        "Shows that the same label is rated differently for the two needs",
        "Does not claim to know what the pages behind the labels contain unless opened",
      ],
    },
    {
      id: "information-foraging-theory-ex-cost-benefit",
      kind: "scenario",
      level: "intermediate",
      title: "Estimate gain and cost at each step",
      prompt: [
        "A visitor to a council website wants to report a missed bin collection. Choose a real council site, or invent a simple one and say so, and list the choice points from the home page to the report form.",
        "At each choice point, state the cues the visitor sees, what gain those cues suggest, and what a wrong choice would cost. Predict the step where a visitor is most likely to leave, and say which cue or cost drives your prediction.",
        "Describe how you would check your prediction with a first-click test.",
      ],
      deliverable: "A step table plus a short plan for a first-click test.",
      criteria: [
        "Separates what the visitor can see from what is actually on the page",
        "Names both a gain estimate and a cost estimate for each choice point",
        "States the prediction in a form a test could contradict",
      ],
    },
    {
      id: "information-foraging-theory-ex-evidence",
      kind: "reflection",
      level: "advanced",
      title: "What does the evidence support?",
      prompt: [
        "Take one design rule said to follow from information foraging theory, for example 'make every visit short and easy' or 'label links by their destination'.",
        "Say which of these it is: a research finding, professional guidance, or interpretation. Name the source it comes from and what that source shows or does not show. Then describe what data from your own product would test it.",
      ],
      criteria: [
        "Classifies the rule correctly and names its source",
        "Does not credit the theory with evidence the source does not give",
        "Proposes data that could count against the rule",
      ],
    },
  ],

  quiz: [
    {
      id: "information-foraging-theory-q-decisions",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Nielsen's account of information foraging theory is organised around which three decisions?",
      options: [
        { text: "Which path to follow (scent), which items to consume (diet), and when to leave a source (patch leaving)", correct: true, explanation: "These are the three headings of his account of the theory and each maps to a choice a visitor makes on the web." },
        { text: "Findability, discoverability and learnability", correct: false, explanation: "These are three qualities of a design, not decisions a forager makes, and none of them is a part of the theory." },
        { text: "Recall, recognition and rehearsal", correct: false, explanation: "These come from memory research. The theory is about choosing among information sources, not about how information is stored." },
        { text: "Gain, loss and risk", correct: false, explanation: "This mixes in decision theory. The theory's cost-benefit idea is about expected gain and cost of reaching a source, not gain and loss framing." },
      ],
      explanation: "Scent, diet and patch leaving together describe how a person chooses a path, decides what is worth consuming and decides when to move on.",
      revise: "information-foraging-theory",
    },
    {
      id: "information-foraging-theory-q-patch",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In the foraging analogy, what is a 'patch' on the web?",
      options: [
        { text: "A source of information, such as a page or a whole site", correct: true, explanation: "A patch is where the forager finds information to consume; Nielsen treats each site as a patch." },
        { text: "A small software fix released after testing", correct: false, explanation: "This is the software meaning of the word. In this theory a patch is an area to forage in, like a clump of bushes." },
        { text: "A link label that attracts clicks", correct: false, explanation: "A label is a cue that gives a patch its scent. It is not the patch itself." },
        { text: "The goal the visitor is trying to reach", correct: false, explanation: "The goal is the information need. A patch is one of the places the person looks for something that meets it." },
      ],
      explanation: "Patches are sources; scent is how a patch is judged from a distance; patch leaving is moving between them.",
      revise: "information-foraging-theory",
    },
    {
      id: "information-foraging-theory-q-relative",
      kind: "scenario",
      level: "intermediate",
      prompt: "Two visitors open the same page, which has a link labelled 'Food'. One is looking for cheese and the other for a facial cleanser. What does information scent predict about that link?",
      options: [
        { text: "It has strong scent for the first visitor and weak scent for the second, because scent is relative to the need", correct: true, explanation: "The same source can emit very different scent for different needs. The label is the same; the match to the need is not." },
        { text: "It has the same scent for both, because scent is a property of the label", correct: false, explanation: "This treats scent as fixed in the link. Scent is an estimate a person makes about a source for a particular need." },
        { text: "It has strong scent for both, because a short label is easy to read", correct: false, explanation: "Ease of reading affects effort, but scent concerns expected value for the need, which differs here." },
        { text: "Neither visitor forms an estimate, because scent only applies to clickbait", correct: false, explanation: "Scent applies to every source a person considers, and clickbait is only the case where the estimate and the true value disagree." },
      ],
      explanation: "A link's scent depends on the person's need and what they already know, not on the link alone.",
      revise: "information-foraging-theory",
    },
    {
      id: "information-foraging-theory-q-patch-leaving",
      kind: "scenario",
      level: "intermediate",
      prompt: "A recipe site has pages that take effort to scan, and a search engine offers ten alternatives one click away. Using Nielsen's reading of patch leaving, what is predicted about visits?",
      options: [
        { text: "Visitors are more likely to leave sooner, because moving to another source is easy", correct: true, explanation: "Nielsen reasons that when the next patch is easy to reach, a forager moves on earlier. That reasoning is his application of the theory to the web." },
        { text: "Visitors stay longer, because there are so many alternatives to compare", correct: false, explanation: "This reverses the logic. Easy access to alternatives lowers the cost of leaving, which favours moving on." },
        { text: "Time on the site is unaffected, because patch leaving depends only on content quality", correct: false, explanation: "In this account the distance to the next patch matters as well as what is in the current one." },
        { text: "Visitors leave only when the site has weak scent, so nothing is predicted", correct: false, explanation: "Scent and patch leaving are separate decisions. A site with strong scent can still be left when alternatives are easy to reach." },
      ],
      explanation: "Patch leaving weighs what is left in the current source against the cost of reaching another.",
      revise: "information-foraging-theory",
    },
    {
      id: "information-foraging-theory-q-claim",
      kind: "critique",
      level: "advanced",
      prompt: "A colleague says: 'Foraging theory has shown that visits are getting shorter, so every page must work as a quick snack.' Which reply is the most accurate use of the sources?",
      options: [
        { text: "Shorter visits are Nielsen's 2003 prediction from the patch-leaving logic, and his article gives no data for it, so treat it as a hypothesis and check it against your own analytics", correct: true, explanation: "This separates the prediction (interpretation) from a finding and says what would test it." },
        { text: "That is right: the 1999 research proved that visits shorten as search improves", correct: false, explanation: "The entry's sources do not report such a result, and the 1999 article was not read, so nothing here supports 'proved'." },
        { text: "That is wrong, because foraging theory only describes animals", correct: false, explanation: "The theory borrows from behavioural ecology but was developed to explain human information seeking." },
        { text: "That is irrelevant, because SNIF-ACT predicts that visits get longer", correct: false, explanation: "The abstract of the SNIF-ACT paper describes modelling link choices on a page, not predicting trends in visit length." },
      ],
      explanation: "Good use of the theory means saying whether a claim is a finding, guidance or an interpretation, and how it could be tested.",
      revise: "information-foraging-theory",
    },
  ],

  flashcards: [
    { id: "information-foraging-theory-fc-1", front: "Three decisions in Nielsen's account of foraging theory", back: "Scent (which path to follow), diet (which items to consume) and patch leaving (when to move on to another source)." },
    { id: "information-foraging-theory-fc-2", front: "Information scent is relative to what?", back: "To an information need and the person's knowledge. The same link can have strong scent for one need and weak scent for another." },
    { id: "information-foraging-theory-fc-3", front: "What is a patch on the web?", back: "A source of information such as a page or site; Nielsen treats each site as a patch." },
    { id: "information-foraging-theory-fc-4", front: "The theory's cost-benefit question", back: "What gain to expect from a source, and what it will cost to find and consume it, both estimated from experience or cues." },
  ],

  references: [
    { source: "pirolli-card-1999", role: "primary", note: "Pirolli and Card's journal article 'Information foraging'; bibliographic record only, not read." },
    { source: "pirolli-2007", role: "primary", note: "The book-length statement of the theory; abstract read." },
    { source: "fu-pirolli-2007", role: "primary", note: "SNIF-ACT, a computational model of web navigation motivated by the theory; abstract read." },
    { source: "chi-pirolli-chen-pitkow-2001", role: "primary", note: "Scent-based algorithms for needs and surfing patterns; abstract read." },
    { source: "bates-1989", role: "further", note: "The berrypicking model as another account of searching; abstract read." },
    { source: "nielsen-2003-information-foraging", role: "explanatory", note: "Practitioner account of scent, diet and patch leaving; read in full." },
    { source: "budiu-2020-information-scent", role: "explanatory", note: "Practitioner account of information scent and social foraging; read in full." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "The theory is set out in peer-reviewed journal articles and a monograph, and has produced a computational model of web navigation and scent-based tools that were evaluated against user data. This entry rests on the abstracts of that work and on two practitioner articles read in full. The 1999 article and the 2007 book, and the data and fit of the model and tool evaluations, were not read, so the entry can say what the theory proposes and that models built on it were tested, but not how well they performed. The design rules attached to the theory are practitioner interpretation, and Nielsen's prediction of ever shorter visits has no data behind it in the article read. Competing accounts of searching, such as berrypicking, are named but not compared, and no replication literature was examined.",

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
