import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "design-thinking",
  slug: "design-thinking",
  title: "Design Thinking",
  alternateNames: ["Design-thinking process", "Desirability, feasibility and viability", "DFV lenses"],
  summary:
    "A human-centred approach to complex problems that alternates between opening up and narrowing down, and judges ideas through three lenses: desirable for people, feasible with technology, viable for the organisation.",
  definition:
    "**Design thinking** is a human-centred approach to solving complex problems that integrates the needs of people, the possibilities of technology and the requirements for business success {{src:ideo-design-thinking-intro}}. It is taught as a set of phases or modes, worked through in a rhythm of creating choices and making choices, and it judges ideas through three lenses: **desirability**, **feasibility** and **viability** {{src:ideo-design-thinking-intro}} {{src:ideo-design-thinking-process}}. The term comes from research about how designers work and was later adopted by management educators and consultancies {{src:kimbell-2011}}.",
  primaryType: "framework",
  secondaryTypes: ["methodology"],
  domain: "foundations",
  subcategory: "approaches",
  tags: ["innovation", "human-centred design", "desirability", "feasibility", "viability", "prototyping", "divergent thinking"],
  difficulty: "beginner",
  disciplines: ["Design", "Innovation management", "Product management", "Service design"],
  learningObjectives: [
    "Describe the rhythm of creating and making choices, and the phases or modes design thinking is taught in, without treating them as a fixed sequence.",
    "Define desirability, feasibility and viability as separate lenses and give the question each one asks.",
    "Assess a product idea against the three lenses and against usability, naming who should answer each question.",
    "Evaluate claims made for design thinking, using its documented critiques and the state of its evidence.",
  ],
  prerequisites: ["user-centred-design"],

  levels: {
    beginner: {
      explanation: [
        "Design thinking is a way of working on problems that do not have an obvious answer. A team learns about the people involved, frames the problem, generates many ideas, makes rough versions of the promising ones and tests them with people, then repeats. IDEO describes the heart of it as a rhythm: **creating choices** by going wide, then **making choices** by narrowing down {{src:ideo-design-thinking-process}}.",
        "The steps are taught in slightly different ways. Stanford's d.school names five modes: empathise, define, ideate, prototype and test {{src:dschool-bootleg}}. IDEO teaches seven phases, from framing the question to sharing the story, and stresses that in practice the work is not linear {{src:ideo-design-thinking-process}}.",
        "Design thinking also asks three questions of every idea {{src:ideo-design-thinking-intro}}. **Desirability**: are we solving a problem that matters to people? **Feasibility**: can we build it with today's technology and capabilities? **Viability**: can the solution succeed and endure within real-world constraints? An idea that fails any of the three is unlikely to work in the world.",
      ],
      analogy:
        "Planning a meal for friends: you find out what they like (desirable), check what your kitchen and skills can manage (feasible) and what you can afford and serve on time (viable). You try a dish before the day and adjust the recipe as you go.",
      everydayExamples: [
        "A council team interviews residents before redesigning how bulky-waste collections are booked.",
        "A start-up tests a paper prototype of an app with five people before writing any code.",
        "A product team drops an idea people love because the engineers cannot build it reliably in time.",
      ],
      vocabulary: [
        { term: "Creating and making choices", meaning: "Going wide to find ideas and insights, then narrowing to decide what to pursue; also called divergent and convergent thinking." },
        { term: "Desirability", meaning: "Whether the solution addresses a problem that matters to people." },
        { term: "Feasibility", meaning: "Whether it can be built with the technology, time and skills available." },
        { term: "Viability", meaning: "Whether it can succeed and last within the organisation's real-world constraints, such as cost, channels, law and brand." },
        { term: "Prototype", meaning: "A rough, early version of an idea made to learn from, not to ship." },
      ],
    },
    intermediate: {
      explanation: [
        "**The three lenses** are separate questions with different owners and evidence {{src:ideo-design-thinking-intro}}. Desirability is answered by learning from people. Feasibility is answered by people who will build the solution: Cagan frames it as whether engineers can build what is needed with the time, skills and technology they have {{src:cagan-four-big-risks}}. Viability is answered against the organisation's constraints. Cagan's list of business-viability risks includes fit with the go-to-market and sales channel, partner contracts and legal compliance, whether customers can be acquired cost-effectively, whether the product can be monetised and whether it is consistent with the brand promise {{src:cagan-four-big-risks}}.",
        "The lenses are weighed, not ticked. IDEO notes that teams place different weight on the three depending on what they believe matters, and that it applies a human-centred value system, asking what *should* be created as well as what can {{src:ideo-design-thinking-intro}}. A feasible, viable product that solves no real problem fails; so does a much-wanted product the organisation cannot sustain.",
        "**The three lenses are not the whole of product risk.** Cagan separates four risks: value (will customers buy it or users choose it), usability (can users figure out how to use it), feasibility and business viability {{src:cagan-four-big-risks}}. In this academy's reading, his value risk is the closest counterpart to desirability; usability is a separate question that the three lenses do not ask, which is why design thinking does not replace usability testing.",
        "In the vocabulary of this academy, the desirability lens asks a broader question than the quality called [[desirability]]: whether a problem matters to people, not only whether a finished product appeals to them. A product also needs [[usefulness]], the right functions that people can use well.",
      ],
      howItWorks: [
        "**Frame the question.** Define the challenge before solving it, often as 'How might we…?' {{src:ideo-design-thinking-process}}.",
        "**Gather inspiration.** Observe, interview and immerse yourself in people's experiences {{src:ideo-design-thinking-process}}.",
        "**Synthesise for action.** Sort and connect what you learned into themes that guide the next step {{src:ideo-design-thinking-process}}.",
        "**Generate ideas.** Explore many directions, then narrow toward promising concepts {{src:ideo-design-thinking-process}}.",
        "**Make ideas tangible.** Build early, rough prototypes to see how ideas play out {{src:ideo-design-thinking-process}}.",
        "**Test to learn.** Share prototypes with real people, observe, and improve {{src:ideo-design-thinking-process}}.",
        "**Share the story.** Explain the human need, the process and the value of the solution so others can act on it {{src:ideo-design-thinking-process}}.",
      ],
      implementation: [
        "Check each lens with the people who can answer it: users for desirability, engineers for feasibility, the business owner for viability {{src:cagan-four-big-risks}}.",
        "Tackle value and business-viability risks early, before investing in building {{src:cagan-four-big-risks}}.",
        "Treat the phases as a teaching structure; move between them as the evidence requires {{src:ideo-design-thinking-process}}.",
        "Keep usability testing in the plan: none of the three lenses asks whether people can use the solution.",
        "Write down which lens an idea is weakest on and what would change your mind.",
      ],
      scenarios: [
        "Illustrative scenario: a bank's team finds that small-business owners badly want instant invoice financing (desirable). Engineers confirm it can be built on existing systems (feasible). Compliance shows that the bank's licence does not cover it in two markets (not viable there), so the team launches where it is viable and reframes the question for the rest.",
        "Illustrative scenario: a hospital team prototypes a bedside app that patients like in tests. Feasibility review shows that the ward Wi-Fi cannot support it; the team returns to framing and designs a paper-and-kiosk version first.",
        "Illustrative scenario: a team presents 'design thinking' as a five-day workshop with no follow-up research. A reviewer points out that only one round of testing happened and that no viability check was made, so the output is a hypothesis, not a validated solution.",
      ],
    },
    advanced: {
      explanation: [
        "Kimbell distinguishes three accounts of design thinking in the literature: a cognitive style of individual designers, a general theory of design, and a resource for organisations {{src:kimbell-2011}}. Much popular writing slides between them, so a claim about 'design thinking' should say which account it uses.",
        "IDEO itself separates design thinking from human-centred design: human-centred design is the value orientation, that design should start with people; design thinking is a set of mindsets and methods for putting that belief into action {{src:ideo-design-thinking-intro}}. The standards-based meaning of human-centred design, ISO 9241-210, is covered in [[user-centred-design]].",
        "The evidence base is thin. Liedtka writes that the mechanisms by which design thinking might improve innovation outcomes have received little scholarly attention, and proposes one candidate mechanism, the reduction of decision-makers' cognitive biases, as a set of propositions for research {{src:liedtka-2015}}.",
      ],
      evidence: [
        "A perspective essay in a product-innovation journal finds the mechanisms linking design thinking to innovation outcomes under-studied and proposes cognitive-bias reduction as a mechanism to test; it is not an outcome study {{src:liedtka-2015}}. Abstract only.",
        "A review of the term's origins and uses identifies three accounts and argues that several issues undermine the claims made for design thinking {{src:kimbell-2011}}. Abstract only.",
        "The process and lens descriptions come from the organisations that teach the approach (IDEO, the d.school) and from a practitioner (Cagan); they describe practice, not tested effects {{src:ideo-design-thinking-intro}} {{src:cagan-four-big-risks}}.",
      ],
      debates: [
        "**Thinking or doing?** Kimbell argues that many accounts rely on a dualism between thinking and acting, ignore the diversity of designers' situated practices, and privilege the designer as the main agent; she proposes attending to the embodied routines of designers and others instead {{src:kimbell-2011}}.",
        "**Does it work?** Advocates present design thinking as an innovation method; Liedtka notes that its mechanisms have rarely been linked to research on cognition and decision-making {{src:liedtka-2015}}. Claims of improved outcomes need evidence from the context in which they are made.",
        "**Process or mindset?** Five modes, seven phases and the Double Diamond describe similar ground differently, and IDEO says the phases exist to make the approach teachable {{src:ideo-design-thinking-process}} {{src:dschool-bootleg}}. Treating any of them as a fixed recipe misreads all of them.",
      ],
      alternativeModels: [
        "[[double-diamond|The Double Diamond]]: four phases in two diverge-converge cycles, one for the problem and one for the solution.",
        "[[user-centred-design|User-centred design]] and ISO 9241-210: an iterative, standardised process centred on users, tasks and environments.",
        "[[lean-ux|Lean UX]]: build-measure-learn cycles that treat designs as hypotheses; see the comparison of the two.",
      ],
    },
  },

  origin: {
    contributors: ["David Kelley", "Tim Brown", "Jane Fulton Suri", "IDEO", "Stanford d.school"],
    period: "Research on how designers work; popularised by IDEO from the 1990s; d.school Bootleg 2018",
    problem:
      "Organisations wanted the ways professional designers solve problems to help them innovate and to help societies make change happen {{src:kimbell-2011}}.",
    narrative: [
      "The term grew out of research about how designers think and was then adopted by management educators and consultancies {{src:kimbell-2011}}.",
      "IDEO, which says it has practised human-centred design since its founding in 1978, gained wider recognition in the 1990s and helped popularise design thinking; it states that it did not invent it {{src:ideo-design-thinking-intro}}. David Kelley also helped found the Stanford d.school, whose Bootleg deck names the five modes {{src:ideo-design-thinking-intro}} {{src:dschool-bootleg}}.",
      "Tim Brown's definition, quoted on IDEO's site, joins the needs of people, the possibilities of technology and the requirements for business success, which became the three lenses {{src:ideo-design-thinking-intro}}. Brown also set out the approach in a 2008 Harvard Business Review article {{src:brown-2008}}, which is paywalled and was not read for this entry.",
    ],
    attributionNote:
      "Tim Brown's 2008 Harvard Business Review article is paywalled and was not read; his definition is quoted from IDEO's own site. The research literature on how designers think that preceded the term was not read for this entry.",
  },

  application: {
    summary: [
      "Use design thinking when the problem itself is unclear and the solution must work for people, for the technology and for the organisation at once; keep usability testing and outcome measurement alongside it.",
    ],
    web: [
      "Prototype a new service journey as clickable screens and test it with a few people before building.",
    ],
    mobile: [
      "Check feasibility early for anything that depends on device capabilities such as offline use or sensors.",
    ],
    enterprise: [
      "Bring legal, sales and support into the viability check; Cagan's list of viability risks names them {{src:cagan-four-big-risks}}.",
    ],
    services: [
      "Frame the challenge from the citizen's or customer's outcome, then test with the staff who will deliver the service.",
    ],
    steps: [
      "Frame the question as 'How might we…?'",
      "Learn from people; synthesise themes.",
      "Generate many ideas, then narrow.",
      "Prototype roughly and test with people.",
      "Check desirability, feasibility and viability with the people who can answer each.",
      "Iterate, then share the story and the evidence.",
    ],
  },

  whenToUse: [
    "Ill-defined problems where the right question is not yet known.",
    "Early-stage product or service ideas that need checking from the human, technical and business side at once.",
    "Aligning a cross-functional team around evidence from people rather than opinions.",
  ],
  whenNotToUse: [
    "Well-defined problems with a known solution, where a workshop adds delay without learning.",
    "As a substitute for usability testing, accessibility work or outcome measurement.",
    "As a one-off workshop presented as a validated solution.",
  ],
  advantages: [
    "Puts learning from people before solutions.",
    "Makes feasibility and viability explicit early, with named owners.",
    "Cheap prototypes reduce the cost of being wrong.",
  ],
  limitations: [
    "Little research evidence on whether and how it improves innovation outcomes.",
    "The term covers several different accounts, so claims about it are often vague.",
    "The three lenses leave out usability, which needs its own evidence.",
    "Often reduced to a fixed sequence of workshop steps, which its own teachers say it is not.",
  ],
  misconceptions: [
    {
      myth: "Design thinking is a fixed five-step process.",
      reality: "The modes and phases are a teaching structure; IDEO says that in practice the work is not linear {{src:ideo-design-thinking-process}}.",
    },
    {
      myth: "Viability just means profit.",
      reality: "Business viability also covers sales channels, contracts and legal compliance, the cost of acquiring customers, monetisation and the brand promise {{src:cagan-four-big-risks}}.",
    },
    {
      myth: "If an idea is desirable, feasible and viable, it will be easy to use.",
      reality: "Usability is a separate risk that the three lenses do not ask about {{src:cagan-four-big-risks}}.",
    },
    {
      myth: "Design thinking has been shown to improve innovation outcomes.",
      reality: "The mechanisms are under-studied; the research read here proposes mechanisms to test rather than reporting outcomes {{src:liedtka-2015}}.",
    },
  ],

  relations: [
    { target: "user-centred-design", type: "complementary-to", note: "Both put people at the start; UCD is the standardised, user-focused process, design thinking a broader innovation approach with business lenses." },
    { target: "double-diamond", type: "complementary-to", note: "Both describe a rhythm of opening up and narrowing down; the Double Diamond separates problem and solution into two cycles." },
    { target: "desirability", type: "related-to", note: "The desirability lens asks whether a problem matters to people, a broader question than how appealing a finished product is." },
    { target: "usefulness", type: "related-to", note: "Usefulness needs utility and usability; the three lenses do not ask about usability, so both are needed." },
    { target: "lean-ux", type: "contrasts-with", note: "Lean UX frames design as hypotheses tested in build-measure-learn cycles; design thinking frames it as human-centred exploration weighed through three lenses." },
    { target: "human-centred-design", type: "related-to", note: "IDEO calls human-centred design the value orientation and design thinking a way of applying it." },
  ],

  exercises: [
    {
      id: "design-thinking-ex-lenses",
      kind: "critique",
      level: "beginner",
      title: "Three lenses on one idea",
      prompt: [
        "Take a product idea you have heard recently, such as a new feature at work or a start-up pitch.",
        "Write the desirability, feasibility and viability question for it, say what evidence would answer each and who should provide it, and add the usability question the three lenses leave out.",
      ],
      deliverable: "A four-row table: question, evidence, owner.",
      criteria: ["Keeps the four questions distinct", "Names an owner for each", "Evidence is concrete, not opinion"],
    },
    {
      id: "design-thinking-ex-cycle",
      kind: "assignment",
      level: "intermediate",
      title: "One cycle, start to finish",
      prompt: [
        "Frame a small challenge as 'How might we…?'. Interview two people, cluster what you hear into two themes, generate at least ten ideas, choose one, make a paper prototype and test it with two people.",
        "Record what you changed after testing, which of the three lenses you could not yet answer, and what you would do next.",
      ],
      deliverable: "A one-page record of the cycle, with photos of the prototype.",
      criteria: ["Shows both widening and narrowing", "Test results changed the idea", "Names open feasibility or viability questions honestly"],
    },
    {
      id: "design-thinking-ex-claims",
      kind: "reflection",
      level: "advanced",
      title: "What is being claimed?",
      prompt: [
        "Find a published claim that design thinking improved an organisation's results.",
        "Classify the claim (documented fact, reported outcome or interpretation), say which of Kimbell's three accounts it relies on, and describe what evidence would make it convincing.",
      ],
      criteria: ["Labels the claim's evidence status correctly", "Identifies the account of design thinking used", "Proposes evidence with a comparison"],
    },
  ],

  quiz: [
    {
      id: "design-thinking-q-lenses",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which three lenses does design thinking use to judge ideas?",
      options: [
        { text: "Desirability, feasibility and viability", correct: true, explanation: "People, technology and the organisation, each with its own question." },
        { text: "Utility, usability and usefulness", correct: false, explanation: "These describe whether a product helps people do what they need; they are not the three lenses." },
        { text: "Empathise, define and ideate", correct: false, explanation: "These are modes of the d.school process, not lenses for judging ideas." },
        { text: "Speed, cost and quality", correct: false, explanation: "This is a project-management triangle, not the design-thinking lenses." },
      ],
      explanation: "The lenses ask whether people want it, whether it can be built and whether the organisation can sustain it.",
    },
    {
      id: "design-thinking-q-feasibility",
      kind: "scenario",
      level: "beginner",
      prompt: "Users love a prototype, the business case is strong, but engineers say the real-time feature cannot be built reliably with the current platform this year. Which lens does the idea fail?",
      options: [
        { text: "Feasibility", correct: true, explanation: "Feasibility asks whether it can be built with the technology, time and skills available." },
        { text: "Desirability", correct: false, explanation: "Users love it, so desirability is supported." },
        { text: "Viability", correct: false, explanation: "The business case is strong; the problem is building it." },
        { text: "Usability", correct: false, explanation: "Nothing in the scenario says people cannot use it." },
      ],
      explanation: "Each lens has its own evidence; here it is the engineers' judgement.",
    },
    {
      id: "design-thinking-q-viability",
      kind: "scenario",
      level: "intermediate",
      prompt: "A subscription app is wanted by users and easy to build, but app-store rules would take a large cut of every sale and the sales team cannot sell it through its usual channel. What does this mainly threaten?",
      options: [
        { text: "Viability: monetisation and the sales channel are business-viability risks", correct: true, explanation: "Cagan lists the sales channel and monetisation among viability risks." },
        { text: "Feasibility, because it involves app stores", correct: false, explanation: "The app is easy to build; the problem is whether the business model works." },
        { text: "Desirability, because users will dislike the price", correct: false, explanation: "Users want it; the issue is the organisation's ability to sustain it." },
        { text: "Nothing, because viability only means short-term profit", correct: false, explanation: "Viability covers channels, contracts, compliance, acquisition cost, monetisation and brand." },
      ],
      explanation: "Viability is broader than profit.",
    },
    {
      id: "design-thinking-q-evidence",
      kind: "critique",
      level: "advanced",
      prompt: "Which statement about the evidence for design thinking is best supported by the sources?",
      options: [
        { text: "Its mechanisms for improving innovation outcomes are under-studied; proposals such as cognitive-bias reduction are hypotheses to test", correct: true, explanation: "This matches Liedtka's perspective essay, which proposes rather than tests." },
        { text: "Controlled studies show it doubles innovation success", correct: false, explanation: "No such study is among the sources, and the essay read says the mechanisms are under-studied." },
        { text: "It has been shown not to work", correct: false, explanation: "Lack of evidence is not evidence of failure." },
        { text: "Its effectiveness is settled because IDEO uses it", correct: false, explanation: "An organisation's own account is not independent evidence." },
      ],
      explanation: "State what is known, what is proposed and who is making the claim.",
    },
  ],

  flashcards: [
    { id: "design-thinking-fc-1", front: "The three design-thinking lenses", back: "Desirability (does it matter to people?), feasibility (can we build it?), viability (can it succeed and endure within the organisation's constraints?)." },
    { id: "design-thinking-fc-2", front: "Business viability risks (Cagan)", back: "Sales channel, contracts and legal compliance, cost of acquiring customers, monetisation, brand promise." },
    { id: "design-thinking-fc-3", front: "d.school's five modes", back: "Empathize, define, ideate, prototype, test." },
    { id: "design-thinking-fc-4", front: "What the three lenses leave out", back: "Usability: whether people can use the solution, a separate risk needing its own evidence." },
    { id: "design-thinking-fc-5", front: "Kimbell's three accounts of design thinking", back: "A cognitive style, a general theory of design, and a resource for organisations." },
  ],

  references: [
    { source: "ideo-design-thinking-intro", role: "primary", note: "Definition, the three lenses, origins and relation to human-centred design; read in full." },
    { source: "ideo-design-thinking-process", role: "primary", note: "Creating and making choices; seven phases; read in full." },
    { source: "dschool-bootleg", role: "explanatory", note: "The five modes; tool page read." },
    { source: "cagan-four-big-risks", role: "explanatory", note: "Value, usability, feasibility and viability risks; read in full." },
    { source: "kimbell-2011", role: "primary", note: "Origins, three accounts and critique; abstract read." },
    { source: "liedtka-2015", role: "primary", note: "State of evidence and proposed mechanism; abstract read." },
    { source: "brown-2008", role: "further", note: "Tim Brown's Harvard Business Review article; paywalled, not read." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Design thinking is a professional framework. Its process and lenses are documented by the organisations that teach it (IDEO's pages, read in full; the d.school's tool page) and by a practitioner (Cagan, read in full). The research read is two abstracts: a critical review of what the term means and a perspective essay that finds the mechanisms linking design thinking to innovation outcomes under-studied. No outcome study was read, so the entry makes no claim that design thinking improves results.",

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
