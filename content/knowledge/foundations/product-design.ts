import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "product-design",
  slug: "product-design",
  title: "Product Design",
  alternateNames: ["Product designer", "Digital product design", "Industrial design (physical products)"],
  summary:
    "Designing a whole product so that it serves people and the business over time. In industry it grew from industrial design of physical goods; in technology companies a product designer typically owns the experience of a digital product, alongside product management and engineering.",
  definition:
    "**Product design** is the practice of designing a product as a whole, balancing what people need with what the business requires so that the product succeeds over time {{src:ixdf-product-design}}. The term has two common meanings. In **industrial design**, it is the design of products, devices and objects, typically focused on their appearance, function and manufacturability {{src:idsa-what-is-industrial-design}}. In **technology companies**, a product designer is usually responsible for the usability of a digital product and accountable for its experience, working with a product manager and an engineering lead {{src:cagan-four-big-risks}}.",
  primaryType: "discipline",
  secondaryTypes: [],
  domain: "foundations",
  subcategory: "core-concepts",
  tags: ["product designer", "industrial design", "digital products", "product team", "business goals", "roles"],
  difficulty: "beginner",
  disciplines: ["Product design", "Industrial design", "User experience", "Product management"],
  learningObjectives: [
    "Distinguish the industrial-design and digital-product meanings of product design.",
    "Describe the product designer's responsibilities in a product team and how they relate to product management and engineering.",
    "Explain how product design relates to UX, UI and interaction design, and why organisations draw those boundaries differently.",
    "Evaluate a design decision from the user's and the business's point of view at once.",
  ],
  prerequisites: ["user-experience"],

  levels: {
    beginner: {
      explanation: [
        "A **product** is something people use and someone has to sustain: a kettle, a banking app, a piece of accounting software. **Product design** is designing that product as a whole, so that it works for people and keeps working for the organisation that makes it {{src:ixdf-product-design}}.",
        "The term has two homes. In **industrial design**, product designers shape physical things; the US industrial designers' society says they typically focus on appearance, functionality and manufacturability, and often much more {{src:idsa-what-is-industrial-design}}. In **technology companies**, 'product designer' usually means someone who designs a digital product end to end, from research to the details of the interface.",
        "In a typical software team, Cagan describes three roles side by side: a product manager responsible for whether the product is valuable and viable, a lead engineer responsible for whether it is feasible, and a product designer responsible for usability and accountable for the product's experience, meaning every interaction users and customers have with it {{src:cagan-four-big-risks}}.",
      ],
      analogy:
        "Designing a single room is interior work; designing a house that a family can live in for twenty years, on budget and within planning rules, is closer to product design. Each room still matters, but the whole has to work.",
      everydayExamples: [
        "A product designer at a bank who researches how people save, designs the savings feature and checks it with engineers and the business.",
        "An industrial designer shaping a power drill so it is comfortable, safe and cheap to manufacture.",
        "A start-up's only designer who handles research, interface and brand at once.",
      ],
      vocabulary: [
        { term: "Product designer", meaning: "In technology companies, a designer responsible for a digital product's usability and accountable for its experience." },
        { term: "Industrial design", meaning: "The design of physical products, devices and objects; the older meaning of product design." },
        { term: "Product team", meaning: "Typically a product manager, a designer and engineers working together on one product." },
        { term: "Manufacturability", meaning: "How easily and cheaply a physical product can be made." },
      ],
    },
    intermediate: {
      explanation: [
        "**Two traditions.** The World Design Organization defines industrial design as a strategic problem-solving process that drives innovation, builds business success and improves quality of life through products, systems, services and experiences, with the human at the centre {{src:wdo-industrial-design-definition}}. Digital product design inherits that combination of user needs and business success and applies it to software.",
        "**The digital role.** The Interaction Design Foundation describes product designers as helping define product goals and roadmaps, advising on return on investment as well as interface details, and blending user needs with business goals; it places UX design within product design, much as UI design sits within UX {{src:ixdf-product-design}}. Cagan's framing is narrower and sharper: the designer owns usability risk and the product's experience, while value and viability belong to the product manager and feasibility to the engineers {{src:cagan-four-big-risks}}.",
        "**Boundaries vary.** The same page notes that brands define the product designer's role differently {{src:ixdf-product-design}}. In this academy's reading, the useful distinction is by scope: [[ui-design|UI design]] shapes the interface, [[interaction-design-discipline|interaction design]] the behaviour over time, [[user-experience|UX]] the person's whole experience, and product design the product as a sustained offering, which brings business and delivery decisions into the designer's view.",
      ],
      howItWorks: [
        "**Understand people and the market**: research users' needs and how the product fits the business.",
        "**Shape the product**: decide what it is, for whom, and what it should and should not do, with the product manager.",
        "**Design the experience**: flows, interactions, interface and content, tested with users.",
        "**Check feasibility early** with engineers and viability with the business {{src:cagan-four-big-risks}}.",
        "**Ship and keep improving**: measure outcomes and iterate across releases.",
      ],
      implementation: [
        "Work alongside the product manager and engineering lead from the start, not after decisions are made {{src:cagan-four-big-risks}}.",
        "Keep a written record of design decisions with the user and business reasons for each.",
        "Treat the roadmap as a design artefact you can influence with research.",
        "Agree in your organisation what 'product designer' covers, since roles differ between companies {{src:ixdf-product-design}}.",
      ],
      scenarios: [
        "Illustrative scenario: a product designer at a meal-kit company finds that customers cancel because recipes take too long. With the product manager, they reframe the roadmap around 20-minute meals rather than more recipes.",
        "Illustrative scenario: an industrial designer reshapes a medical device handle; user tests improve grip, and manufacturing confirms the new shape costs no more to mould.",
        "Illustrative scenario: a company hires a 'product designer' expecting only screens; the designer negotiates involvement in discovery and roadmap planning so that research can shape what is built.",
      ],
    },
    advanced: {
      explanation: [
        "Product design straddles two kinds of accountability: for the person's experience and for the product's success as an offering. The professional definitions in industrial design make that explicit, linking innovation, technology, research, business and customers {{src:wdo-industrial-design-definition}}. In software, Cagan's division of risks gives the designer a specific accountability while keeping value and viability with the product manager {{src:cagan-four-big-risks}}.",
        "Because the title is used differently by different organisations {{src:ixdf-product-design}}, claims about what product designers do should be read as descriptions of particular practices, not as a fixed standard.",
      ],
      evidence: [
        "Professional bodies define industrial design in terms of user needs, business success and wider impact {{src:wdo-industrial-design-definition}} {{src:idsa-what-is-industrial-design}}.",
        "A widely read product-management framework assigns the designer usability risk and accountability for the experience {{src:cagan-four-big-risks}}.",
        "These are definitions and role descriptions; no study read here measures the effect of the product-designer role on outcomes.",
      ],
      debates: [
        "**Is UX inside product design, or the other way round?** The Interaction Design Foundation places UX within product design {{src:ixdf-product-design}}; many organisations treat 'product designer' and 'UX designer' as near-synonyms. The answer depends on how an organisation defines the roles.",
        "**How much business ownership?** In Cagan's framing, business value and viability belong to the product manager {{src:cagan-four-big-risks}}; other descriptions give product designers a direct role in roadmaps and return on investment {{src:ixdf-product-design}}.",
      ],
      alternativeModels: [
        "[[user-experience|UX design]] as the discipline centred on the person's experience.",
        "[[experience-design|Experience design]], which starts from the experience a product should create.",
        "Industrial design as the physical-product tradition {{src:wdo-industrial-design-definition}}.",
      ],
    },
  },

  origin: {
    contributors: ["World Design Organization", "Industrial Designers Society of America", "Marty Cagan"],
    period: "Industrial design of physical products; the digital product designer role in software teams",
    problem:
      "Products must serve people and remain sustainable for the organisations that make them; designing only the surface or only the function leaves one of the two to chance {{src:ixdf-product-design}}.",
    narrative: [
      "Product design grew from industrial design, which professional bodies define as designing products, devices, objects and services with attention to people, function, manufacture and business success {{src:wdo-industrial-design-definition}} {{src:idsa-what-is-industrial-design}}.",
      "In software product teams as Cagan describes them, the product designer is one of three core roles, responsible for usability and accountable for the experience {{src:cagan-four-big-risks}}.",
    ],
    attributionNote:
      "The history of the role is described here only as far as the professional definitions and practitioner sources read support it; no historical study was read.",
  },

  application: {
    summary: [
      "Use product design thinking when decisions must balance the user's experience with the product's success over time, and make the role's scope explicit in your organisation.",
    ],
    web: [
      "Design a subscription site's sign-up, onboarding and cancellation as one product journey with business consequences.",
    ],
    mobile: [
      "Balance app-store constraints, platform conventions and business model in early design decisions.",
    ],
    enterprise: [
      "Design for the buyer and the daily user, who are often different people with different needs.",
    ],
    services: [
      "Treat the digital product as one part of a wider service and design how it connects to the rest.",
    ],
    steps: [
      "Agree the product designer's scope with product and engineering.",
      "Research user needs and business goals together.",
      "Design and test the experience.",
      "Check feasibility and viability early.",
      "Measure outcomes after release and iterate.",
    ],
  },

  whenToUse: [
    "Working on a product that must be sustained over many releases.",
    "Defining design roles in a product team.",
    "Explaining how design decisions connect to business outcomes.",
  ],
  whenNotToUse: [
    "As a label that makes interface-only work sound strategic without the access and accountability the role implies.",
    "To mean industrial design when the context is digital, or the reverse, without saying which.",
  ],
  advantages: [
    "Joins the user's experience and the product's success in one role.",
    "Clarifies collaboration with product management and engineering.",
    "Draws on a long industrial-design tradition of balancing people, function and manufacture.",
  ],
  limitations: [
    "Role boundaries differ between organisations.",
    "Sources are professional definitions and practitioner frameworks, not research.",
    "The physical and digital meanings are easily confused.",
  ],
  misconceptions: [
    {
      myth: "Product design is just UI design with a different title.",
      reality: "Product design covers the product as a whole, including goals and roadmap, while UI design shapes the interface {{src:ixdf-product-design}}.",
    },
    {
      myth: "A product designer owns every product decision.",
      reality: "In Cagan's framing, value and viability belong to the product manager and feasibility to the engineers; the designer owns usability and is accountable for the experience {{src:cagan-four-big-risks}}.",
    },
    {
      myth: "Product design only means physical products.",
      reality: "That is the industrial-design meaning; in technology companies the term usually means digital products {{src:idsa-what-is-industrial-design}} {{src:ixdf-product-design}}.",
    },
  ],

  relations: [
    { target: "user-experience", type: "related-to", note: "Product design treats the user's experience together with the product's success as an offering over time." },
    { target: "ui-design", type: "related-to", note: "UI design shapes the interface, one part of what a product designer is responsible for." },
    { target: "interaction-design-discipline", type: "related-to", note: "Interaction design shapes behaviour over time, part of designing a product's experience." },
    { target: "design-thinking", type: "related-to", note: "The desirability, feasibility and viability lenses describe the balance product design has to strike." },
    { target: "experience-design", type: "related-to", note: "Experience design asks what experience the product should create before deciding what it does." },
  ],

  exercises: [
    {
      id: "product-design-ex-roles",
      kind: "critique",
      level: "beginner",
      title: "Read a job advert",
      prompt: [
        "Find two job adverts titled 'product designer'. List the responsibilities in each and mark which concern the interface, the experience, the product's goals or the business.",
        "Say which meaning of product design each advert uses.",
      ],
      deliverable: "Two annotated responsibility lists.",
      criteria: ["Classifies responsibilities consistently", "Notices differences in scope"],
    },
    {
      id: "product-design-ex-decision",
      kind: "scenario",
      level: "intermediate",
      title: "One decision, two sides",
      prompt: [
        "A news app considers putting all articles behind a paywall. As the product designer, write the user-experience consequences and the business consequences, propose two alternatives, and say who in the team should decide each part.",
      ],
      deliverable: "A one-page decision note.",
      criteria: ["Covers user and business effects", "Names owners using the team roles", "Alternatives are testable"],
    },
    {
      id: "product-design-ex-scope",
      kind: "reflection",
      level: "advanced",
      title: "Define the role",
      prompt: [
        "Write a one-page description of the product designer's role for a new team, stating responsibilities, decisions shared with product and engineering, and what the role does not own. Justify each boundary.",
      ],
      criteria: ["Boundaries are explicit", "Justifications reference user and business outcomes", "Acknowledges that organisations differ"],
    },
  ],

  quiz: [
    {
      id: "product-design-q-meanings",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which pair describes the two common meanings of product design?",
      options: [
        { text: "Industrial design of physical products, and end-to-end design of digital products in technology companies", correct: true, explanation: "The context usually tells you which is meant." },
        { text: "Graphic design and marketing", correct: false, explanation: "These are related fields, not meanings of product design." },
        { text: "Front-end and back-end development", correct: false, explanation: "These are engineering roles." },
        { text: "Logo design and packaging", correct: false, explanation: "These belong to brand and packaging design." },
      ],
      explanation: "Say which meaning you mean.",
    },
    {
      id: "product-design-q-cagan",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In Cagan's product-team model, what is the product designer responsible for?",
      options: [
        { text: "Usability risk, and accountability for the product's experience", correct: true, explanation: "Value and viability sit with the product manager, feasibility with the lead engineer." },
        { text: "Business viability and pricing", correct: false, explanation: "These belong to the product manager in his framing." },
        { text: "Whether the system can be built", correct: false, explanation: "That is feasibility, the lead engineer's risk." },
        { text: "Only the visual style", correct: false, explanation: "The role covers every interaction users have with the product." },
      ],
      explanation: "Three roles, four risks.",
    },
    {
      id: "product-design-q-scope",
      kind: "scenario",
      level: "intermediate",
      prompt: "A designer is asked to 'make the checkout prettier' but has evidence that customers abandon because of surprise delivery costs. What would a product-design approach do?",
      options: [
        { text: "Raise the cost issue with the product manager and propose testing earlier, clearer delivery pricing, because the problem is the product, not the styling", correct: true, explanation: "Product design considers the whole offering, with the right owners." },
        { text: "Restyle the page as asked and say nothing", correct: false, explanation: "That ignores evidence about the real problem." },
        { text: "Change the delivery prices without consulting anyone", correct: false, explanation: "Pricing decisions involve the product manager and business." },
        { text: "Remove the checkout page", correct: false, explanation: "That would not solve the problem." },
      ],
      explanation: "Product design connects the experience to product decisions, with the right people.",
    },
    {
      id: "product-design-q-claim",
      kind: "critique",
      level: "advanced",
      prompt: "Someone says: 'Research proves companies with product designers make more money.' Which response fits the sources?",
      options: [
        { text: "The sources read are definitions and role descriptions; they do not measure the role's effect on revenue", correct: true, explanation: "No outcome study of the role was read." },
        { text: "Correct, the World Design Organization measured it", correct: false, explanation: "The WDO page gives a definition, not a measurement." },
        { text: "Wrong, product designers reduce revenue", correct: false, explanation: "There is no evidence for that either." },
        { text: "Correct, because the role is common", correct: false, explanation: "Popularity is not evidence of effect." },
      ],
      explanation: "Separate definitions from outcome evidence.",
    },
  ],

  flashcards: [
    { id: "product-design-fc-1", front: "Two meanings of product design", back: "Industrial design of physical products; end-to-end design of digital products in technology companies." },
    { id: "product-design-fc-2", front: "Product designer's responsibility (Cagan)", back: "Usability risk, and accountability for the product's experience." },
    { id: "product-design-fc-3", front: "WDO definition of industrial design", back: "A strategic problem-solving process that drives innovation, builds business success and improves quality of life through products, systems, services and experiences." },
    { id: "product-design-fc-4", front: "Why job titles differ", back: "Brands define the product designer's role differently; agree its scope explicitly." },
  ],

  references: [
    { source: "ixdf-product-design", role: "primary", note: "Product design and the product designer role; read." },
    { source: "cagan-four-big-risks", role: "primary", note: "The designer's responsibilities in a product team; read in full." },
    { source: "wdo-industrial-design-definition", role: "standard", note: "Professional definition of industrial design; read." },
    { source: "idsa-what-is-industrial-design", role: "explanatory", note: "Industrial design focus areas; read." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Product design is a professional discipline. The entry rests on professional definitions (WDO, IDSA), an educational account (Interaction Design Foundation) and a practitioner's role framework (Cagan), all read. They describe practice and roles; none measures outcomes, and the role is defined differently across organisations, which the entry states.",

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
