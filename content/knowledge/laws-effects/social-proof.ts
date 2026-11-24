import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "social-proof",
  slug: "social-proof",
  title: "Social Proof",
  alternateNames: ["Social validation"],
  summary:
    "People use what others do and approve as evidence about what is right, good or expected. That evidence can help a person decide, or mislead them when it is unrepresentative, manufactured or self-reinforcing, so a popularity signal is never a measure of quality on its own.",
  definition:
    "**Social proof** is the use of other people's behaviour or approval as evidence about what is correct, appropriate or worth choosing. Cialdini described the underlying presumption as a decisional shortcut: if most others are doing something, it is probably a sensible thing to do {{src:cialdini-reno-kallgren-1990}}. Social-influence research separates two reasons for following others: **informational** influence, accepting others' judgements as evidence about reality, and **normative** influence, conforming to others' expectations to be accepted {{src:deutsch-gerard-1955}}. It also separates two kinds of norm: **descriptive** norms (what most people do) and **injunctive** norms (what most people approve or disapprove of), which can point in different directions {{src:cialdini-reno-kallgren-1990}}.",
  primaryType: "cognitive-bias",
  secondaryTypes: [],
  domain: "laws-effects",
  subcategory: "decision-biases",
  tags: ["social influence", "descriptive norms", "injunctive norms", "conformity", "ratings", "reviews", "popularity signals", "testimonials", "herding", "persuasion ethics"],
  difficulty: "intermediate",
  disciplines: ["Social psychology", "Consumer research", "Interaction design", "Persuasion ethics"],
  learningObjectives: [
    "Distinguish informational from normative influence and descriptive from injunctive norms, and classify a given interface message by which norm it states and which motive it relies on.",
    "Explain why a descriptive-norm message about an undesirable behaviour can backfire, and rewrite such a message so the descriptive and injunctive norms agree.",
    "Explain how displayed popularity can become self-reinforcing, using the music-market and rating-manipulation experiments, and say why a high rating is not evidence of high quality on its own.",
    "Evaluate a product's social-proof elements for accuracy, representativeness, recency and effect on autonomy, and design a test that measures comprehension and decision quality, not only conversion.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "When you are not sure what to do, other people are a source of information. A busy restaurant, a course that thousands have finished, a product with many reviews: each tells you something about what others chose. Using that as evidence is **social proof**. Cialdini's argument was that simply copying what most others do usually works well enough and saves effort {{src:cialdini-reno-kallgren-1990}}.",
        "People follow others for two different reasons. Sometimes they think others know something they do not, and want to be right; this is **informational** influence. Sometimes they want to fit in or avoid disapproval; this is **normative** influence {{src:deutsch-gerard-1955}}. A broad review of the field describes three goals behind both: forming accurate views of reality, keeping good relationships with others, and maintaining a favourable view of oneself {{src:cialdini-goldstein-2004}}.",
        "Two kinds of norm matter in design. A **descriptive norm** says what most people actually do ('most guests reuse their towels'). An **injunctive norm** says what most people approve of ('most guests think reusing towels is the right thing to do'). They are easy to confuse because what is approved is often what is done, but they work differently and can conflict {{src:cialdini-reno-kallgren-1990}}.",
        "Social proof in interfaces is everywhere: star ratings, review counts, 'bestseller' badges, download counts, 'trending' lists and customer logos. These signals can help people decide, but only when they are true, current and drawn from people like the person deciding.",
      ],
      analogy:
        "In an unfamiliar town you choose the café with a queue rather than the empty one next door. The queue is evidence, but weak evidence: it may mean the coffee is good, or that the café opened earlier, is near the station, or is where a tour group was sent. The queue tells you what people did, not why.",
      everydayExamples: [
        "Choosing the product with 2,000 reviews over the one with 12, even at a similar average rating.",
        "A sign saying 'most visitors to this park take their litter home'.",
        "Joining a course because it shows 'over 10,000 learners enrolled'.",
        "Up-voting a comment that already has many up-votes.",
        "A software site showing the logos of well-known customers.",
      ],
      vocabulary: [
        { term: "Social proof", meaning: "Using other people's behaviour or approval as evidence about what to do or what is good." },
        { term: "Informational influence", meaning: "Following others because their choices seem to tell you something true about the situation." },
        { term: "Normative influence", meaning: "Following others to be accepted or to avoid disapproval, whether or not you think they are right." },
        { term: "Descriptive norm", meaning: "What most people in a group actually do." },
        { term: "Injunctive norm", meaning: "What most people in a group approve or disapprove of: what they think should be done." },
        { term: "Conformity", meaning: "Changing a judgement or behaviour to match a group, under real or imagined group pressure." },
        { term: "Popularity signal", meaning: "An interface element that reports others' choices or opinions: ratings, review counts, downloads, user counts, 'trending' labels." },
      ],
    },
    intermediate: {
      explanation: [
        "**Eight things that are often treated as one.** *Social proof* is the judgement shortcut: others' behaviour as evidence. *Informational* and *normative* influence are the two motives behind following others {{src:deutsch-gerard-1955}}. *Descriptive* and *injunctive* norms are two kinds of social information, about doing and about approving {{src:cialdini-reno-kallgren-1990}}. *Conformity* is the broader outcome, changing a judgement or behaviour to match a group; the classic Asch line-judgement studies measured it {{src:bond-smith-1996}}. *Digital popularity signals* (ratings, review counts, followers, downloads, trending labels) are interface reports of others' choices. *Testimonials and endorsements* are individual accounts selected by whoever publishes them. Academy interpretation: a testimonial is an anecdote chosen by the seller, not evidence of what most people do, so it is related to social proof but should not be read as a descriptive norm.",
        "**Why uncertainty matters.** On the informational account, others' choices are useful evidence when your own evidence is thin. Academy interpretation: the less a person can judge directly (a first purchase, an unfamiliar category, a product that cannot be tried), the more weight others' choices are likely to carry. This is an inference from the informational account, not a result measured in the studies read for this entry.",
        "**Which group counts.** In a hotel field experiment, signs saying most guests reused their towels raised reuse compared with the standard environmental appeal (44.1% against 35.1%). A second experiment found that saying most guests *who had stayed in this room* reused their towels worked best (49.3%), even though the authors considered that group less meaningful than identities guests rated as more important, such as fellow citizens {{src:goldstein-cialdini-griskevicius-2008}}. The researchers call this a provincial norm: the norm of people who shared one's immediate circumstances {{src:goldstein-cialdini-griskevicius-2008}}. For design, the comparison group should match the situation of the person deciding.",
        "**When the two norms conflict.** In field studies on littering, people littered more into an already littered setting than a clean one (41% against 11%), and the difference grew when a confederate's littering drew attention to the setting {{src:cialdini-reno-kallgren-1990}}. The littered floor showed a descriptive norm ('people litter here') that worked against the injunctive norm ('people disapprove of littering'). When the researchers made the injunctive norm salient instead, littering fell even in a littered setting {{src:cialdini-reno-kallgren-1990}}. The design lesson: a message saying 'too many people do X' states a descriptive norm in favour of X while trying to argue against it.",
        "**People underestimate their own susceptibility.** In a survey of 810 Californians, beliefs about what other people did predicted energy conservation better than other beliefs, although respondents rated those beliefs as the least important reason. In a field experiment, normative information changed behaviour more than other reasons to conserve, while people rated it least motivating {{src:nolan-et-al-2008}}. Asking users whether a social-proof element influenced them is therefore a weak test; observe what they do and check what they understood.",
      ],
      howItWorks: [
        "The person faces a choice and has limited evidence of their own: what to buy, which plan to pick, whether to join, whether a comment is worth reading.",
        "The interface shows information about other people: what they did (counts, ratings, 'most popular'), what they approved (endorsements, ratings of helpfulness), or both.",
        "The person uses it for accuracy (others may know something), for belonging (others may expect it), or both {{src:deutsch-gerard-1955}} {{src:cialdini-goldstein-2004}}. Which norm guides them depends partly on which one the design makes salient {{src:cialdini-reno-kallgren-1990}}.",
        "Their choice may then feed the next person's signal: a purchase adds to a count, a vote to a score. This feedback is what can make popularity self-reinforcing {{src:salganik-dodds-watts-2006}} {{src:muchnik-aral-taylor-2013}}.",
      ],
      implementation: [
        "Use only real, current data. State the population, the period and the count behind every social statistic: 'rated 4.6 by 1,240 verified buyers in the last 12 months' rather than 'customers love it'.",
        "Choose a comparison group that matches the person's situation (people on the same plan, in the same course, in the same area), as the hotel experiment suggests {{src:goldstein-cialdini-griskevicius-2008}}, and never invent one.",
        "Do not publicise an undesirable majority. If most people do not yet do the desired thing, state the injunctive norm or the reasons, not the descriptive norm {{src:cialdini-reno-kallgren-1990}}.",
        "Show the distribution behind an average and the number of ratings, so a 4.8 from 6 people is not read like a 4.8 from 6,000.",
        "Keep popularity and suitability separate: 'most popular' answers what others chose, not what fits this person. Offer filters and comparisons by the attributes that matter.",
        "Treat testimonials as illustrations: label them, do not present them as typical, and never write or edit them in a customer's name.",
      ],
      scenarios: [
        "Illustrative scenario: an online shop shows 'Bestseller' on a kettle that sells well only because it has been the default recommendation for two years. Shoppers read the badge as evidence of quality, when it partly measures the shop's own earlier placement. A clearer design shows the rating distribution and reviews by product attribute alongside sales rank.",
        "Illustrative scenario: a learning platform shows '12,431 learners enrolled' on a course, but most enrolled and never started. A completion figure ('3,100 completed; median 6 weeks') together with reviews from completers gives a learner better evidence about the time and difficulty involved.",
        "Illustrative scenario: a charity's donation page says 'Only 4% of visitors donate'. Intended to create urgency, it states a descriptive norm that most visitors do not donate. An injunctive message ('Most of our supporters believe no child should go without clean water') or a concrete reason avoids publicising the undesired majority.",
        "Illustrative scenario: a business-software site says 'Trusted by 5,000 teams' and shows logos of famous companies. If the logos come from free accounts or one-off trials, the claim misleads about how and how often the product is used; the honest version says what the number counts.",
      ],
    },
    advanced: {
      explanation: [
        "**Popularity can create popularity.** In an artificial online music market, 14,341 participants downloaded previously unknown songs, some seeing how often earlier participants had downloaded each song and some not. Stronger social influence made success both more unequal and less predictable. Quality mattered only partly: the best songs rarely did poorly and the worst rarely did well, but any other result was possible {{src:salganik-dodds-watts-2006}}. Academy interpretation of the abstract: visible popularity can amplify early, partly chance differences, so success does not simply track quality.",
        "**A single vote can bias a rating.** On a social news site, researchers randomly gave 101,281 new comments one artificial up-vote, one down-vote or nothing, without users knowing. The single up-vote made the first viewer 32% more likely to up-vote and, as positive herding accumulated over five months, raised final mean scores by 25% compared with control. Negative manipulation did not accumulate: users corrected down-voted comments. The positive herding varied by topic and by whether raters were friends or enemies of the commenter {{src:muchnik-aral-taylor-2013}}. Two cautions: this was one site, where up-votes were 4.6 times as common as down-votes, and the effect was produced by a mix of changed opinions and more people voting {{src:muchnik-aral-taylor-2013}}.",
        "**Ratings are constructed, not measured.** A 2026 systematic review of 423 peer-reviewed studies (2002–2025) argues that online ratings are signals shaped by who chooses to rate, emotion, social influence, platform design and distortion, and that producing and reading ratings form a recursive loop. It separates **signal fidelity** (how well a rating reflects what it claims to reflect) from **judgement accuracy** (how well people interpret it), and finds that evidence on decision quality and consumer welfare is limited: showing that ratings change behaviour does not show that they help consumers {{src:saxena-banerji-2026}}. The review was read as an abstract only.",
        "**Representativeness is a design responsibility.** Academy interpretation, drawing on the review's point that participation shapes ratings {{src:saxena-banerji-2026}}: people who rate are not a random sample of people who bought, average ratings hide distributions, old ratings may describe a different version of the product, and a rating collected under a prompt or incentive differs from one given unprompted. A designer who shows a rating decides how much of this the person can see.",
        "**Culture and time.** A meta-analysis of 133 Asch-type conformity studies from 17 countries found that conformity in US studies declined after the 1950s and that collectivist countries tended to show higher conformity than individualist ones {{src:bond-smith-1996}}. These were laboratory judgements of line length, not interface decisions; the transferable lesson is that the strength of social influence is not fixed across people, places or periods.",
        "**Ethics.** The hotel experiment also shows why a product must hold social statistics to a stricter standard than a field experiment's signs. The signs cited a '75%' participation figure supplied by the sign manufacturer and an earlier study the authors themselves call 'ostensible', and the room-specific version gave the same figure for each room without a reported room-level measurement {{src:goldstein-cialdini-griskevicius-2008}}. In a product, a social statistic presented as fact must be true for the population it names. Fabricated reviews, inflated counts and invented 'people viewing now' messages are [[deceptive-patterns|deceptive patterns]].",
      ],
      evidence: [
        "Five field studies on littering: descriptive and injunctive norms distinguished; behaviour followed whichever norm was made salient; littering 41% in a littered vs 11% in a clean setting in Study 1 (139 participants) {{src:cialdini-reno-kallgren-1990}}. Read in full.",
        "Two hotel field experiments: descriptive-norm signs raised towel reuse over an environmental appeal (44.1% vs 35.1%; 44.5% vs 37.2%), with the room-specific norm highest (49.3%) {{src:goldstein-cialdini-griskevicius-2008}}. One hotel; read in full.",
        "Survey of 810 people and a field experiment: normative information most effective and rated least motivating {{src:nolan-et-al-2008}}. Abstract only.",
        "Online music-market experiment with 14,341 participants: social influence increased inequality and unpredictability of success {{src:salganik-dodds-watts-2006}}. Abstract only.",
        "Randomised experiment on 101,281 comments: one artificial up-vote raised first-viewer up-voting by 32% and final scores by 25%; negative manipulation was corrected {{src:muchnik-aral-taylor-2013}}. One site; report read in full, supplement not read.",
        "Meta-analysis of 133 Asch-type studies in 17 countries: conformity declined in US studies over time and was higher in more collectivist countries {{src:bond-smith-1996}}. Abstract only.",
        "Systematic review of 423 studies on online ratings: ratings as constructed signals; behavioural influence does not establish consumer benefit {{src:saxena-banerji-2026}}. Abstract only.",
      ],
      debates: [
        "**Information or pressure?** The same behaviour, choosing the popular option, can reflect a reasonable inference or a wish to fit in {{src:deutsch-gerard-1955}}, and people are poor judges of their own reasons {{src:nolan-et-al-2008}}. A design cannot tell which motive it is engaging just by watching conversion; it has to test understanding and later satisfaction.",
        "**Wisdom of crowds or herding?** Aggregated opinions can pool independent knowledge, but only if the opinions are independent. Once people see earlier ratings, later ratings partly echo them {{src:muchnik-aral-taylor-2013}}, and early chance differences can be amplified {{src:salganik-dodds-watts-2006}}. Showing ratings before or only after a person rates is a design choice about which of the two a system gets.",
        "**How far field results transfer.** The norm experiments were run in one hotel, a few public settings and a regional energy study {{src:goldstein-cialdini-griskevicius-2008}} {{src:cialdini-reno-kallgren-1990}} {{src:nolan-et-al-2008}}, and conformity varies with culture and period {{src:bond-smith-1996}}. Expect the direction to hold more often than any particular size; test in your own context.",
      ],
      alternativeModels: [
        "**Informational account**: others' choices are taken as evidence about quality or correctness {{src:deutsch-gerard-1955}}. Academy interpretation: this predicts the strongest reliance when one's own evidence is weak.",
        "**Normative account**: people conform to others' expectations to be accepted {{src:deutsch-gerard-1955}}. Academy interpretation: this predicts stronger effects when a person's choice is visible to others.",
        "**Focus theory of normative conduct**: descriptive and injunctive norms both exist in a situation, and behaviour follows the one made salient {{src:cialdini-reno-kallgren-1990}}.",
        "**Cumulative advantage**: popularity signals feed back into choice, so outcomes depend on early, partly random differences {{src:salganik-dodds-watts-2006}}.",
      ],
    },
  },

  origin: {
    contributors: ["Morton Deutsch", "Harold Gerard", "Robert Cialdini", "Noah Goldstein", "Matthew Salganik", "Duncan Watts", "Sinan Aral"],
    period: "Social-influence research from the 1950s; norm-focus field studies from 1990; online experiments from 2006",
    problem:
      "Why people follow others, and when following others helps or misleads them: whether because others know something, because of social pressure, or because the situation draws attention to what others do or approve.",
    narrative: [
      "Conformity research grew from Asch's line-judgement studies; Deutsch and Gerard used variations of that procedure to separate informational from normative influence {{src:deutsch-gerard-1955}}. Later meta-analysis of the same procedure showed that conformity varies across countries and periods {{src:bond-smith-1996}}.",
      "Cialdini and colleagues argued that support for norms as an explanation had been mixed partly because researchers had not separated what people do from what they approve, and showed in field studies that behaviour follows whichever norm is made salient {{src:cialdini-reno-kallgren-1990}}. Field experiments then tested descriptive-norm messages in hotels and energy use {{src:goldstein-cialdini-griskevicius-2008}} {{src:nolan-et-al-2008}}, and a review drew the work together around goals of accuracy, affiliation and self-concept {{src:cialdini-goldstein-2004}}.",
      "Online experiments moved the question to digital popularity: a music market showed that visible download counts make success unequal and unpredictable {{src:salganik-dodds-watts-2006}}, and a randomised experiment on a news site showed that one artificial vote can bias later ratings {{src:muchnik-aral-taylor-2013}}. Recent reviews treat online ratings as constructed signals whose benefit to consumers is still largely unmeasured {{src:saxena-banerji-2026}}.",
    ],
    attributionNote:
      "Cialdini's argument that following others is a decisional shortcut is cited through Cialdini, Reno and Kallgren (1990), which summarises it; his book on influence was not consulted. Deutsch and Gerard (1955) was not read: it is cited only for the distinction its title names. Cialdini and Goldstein (2004), Nolan et al. (2008), Salganik et al. (2006), Bond and Smith (1996) and Saxena and Banerji (2026) were read as abstracts; Cialdini et al. (1990), Goldstein et al. (2008) and Muchnik et al. (2013) were read in full.",
  },

  application: {
    summary: [
      "Use social proof to give people honest evidence about what others like them chose and what they thought of it, in a form that improves their judgement rather than replacing it. Every social statistic should say who was counted, when and how.",
      "Five questions for reviewing a social-proof element (academy checklist): (1) Is it true and current? (2) Whose behaviour does it describe, and is that group relevant to this person? (3) Does it state the base (how many, of whom, over what period)? (4) Does it make a minority or an undesired behaviour look like the norm? (5) Does it help the person judge suitability, or only push them towards the popular option?",
    ],
    web: [
      "Ecommerce ratings and reviews: show the number of ratings, the distribution and recency, let people filter reviews by attributes they care about, and mark verified purchases; do not hide or suppress negative reviews.",
      "Popularity badges ('bestseller', 'most popular'): say what they measure and over what period, and do not award them to items promoted by default placement without saying so.",
      "Donation and public-service pages: state the injunctive norm or the reasons when the desired behaviour is not yet common {{src:cialdini-reno-kallgren-1990}}; use descriptive norms only when they are true and favourable {{src:goldstein-cialdini-griskevicius-2008}}.",
      "Recommendations and trending lists: label them as popularity-based, and offer other orders (relevance, newest, by rating with a minimum count) so early leaders do not lock in {{src:salganik-dodds-watts-2006}}.",
    ],
    mobile: [
      "App onboarding: 'Most people who set up a budget start with these three categories' can reduce uncertainty when it is true for comparable users; avoid follower and friend counts that pressure people into connecting or sharing.",
      "Social platforms: consider hiding scores until after a person has voted or rated, where independent judgement matters {{src:muchnik-aral-taylor-2013}}.",
    ],
    enterprise: [
      "SaaS customer counts and logos: say what is counted (paying organisations, active teams, trial accounts) and get permission for every logo; a testimonial is one customer's account, not a typical result.",
      "Internal tools: showing 'teams using this template' can help adoption of a standard, but tell people whether usage was mandated, which changes what the number means.",
    ],
    services: [
      "Learning platforms: report completions and typical time alongside enrolments, and show reviews from people at a similar starting level.",
      "Community adoption (energy, recycling, health): use comparison groups that match the person's situation {{src:goldstein-cialdini-griskevicius-2008}}, and combine descriptive and injunctive messages so people who already do well are not nudged down to the average.",
    ],
    steps: [
      "Inventory every social-proof element in one journey: ratings, counts, badges, testimonials, logos, 'trending', 'others also bought', activity notifications.",
      "For each, record the data source, the population, the period and the refresh rule, and answer the five review questions.",
      "Remove or correct anything that is fabricated, stale, unattributed or that makes an undesired majority visible.",
      "Redesign for calibration: add the base and the distribution, a relevant comparison group, and routes to judge suitability directly.",
      "Test with people: compare versions on comprehension of what the signal means, confidence that matches the evidence, later satisfaction and returns or cancellations, not only clicks or conversion.",
    ],
  },

  whenToUse: [
    "Helping people decide under uncertainty with honest information about what comparable people chose and how satisfied they were.",
    "Encouraging behaviour that is genuinely common and beneficial, by reporting the real descriptive norm for a relevant group.",
    "Auditing ratings, reviews, badges, counts and testimonials for accuracy, representativeness and manipulation risk.",
  ],
  whenNotToUse: [
    "When the data are fabricated, inflated, stale or drawn from a different population: that is deception, not social proof.",
    "When the desired behaviour is rare: publicising the majority who do not act states the opposite norm {{src:cialdini-reno-kallgren-1990}}.",
    "As a substitute for evidence of quality or suitability: popularity is partly path-dependent {{src:salganik-dodds-watts-2006}}.",
    "To pressure people with visible tallies of who has or has not joined, where the choice should be private.",
  ],
  advantages: [
    "Honest social information can reduce uncertainty and effort when people cannot judge an option directly.",
    "Descriptive-norm messages changed behaviour in field experiments {{src:goldstein-cialdini-griskevicius-2008}}, even where people rated them as unlikely to motivate them {{src:nolan-et-al-2008}}.",
    "The descriptive–injunctive distinction gives designers a concrete way to avoid messages that backfire {{src:cialdini-reno-kallgren-1990}}.",
  ],
  limitations: [
    "Effects in the field studies were moderate and came from a few settings; the size in any particular product is unknown until tested {{src:goldstein-cialdini-griskevicius-2008}}.",
    "Visible popularity can amplify chance and early manipulation, so ratings and rankings can drift from quality {{src:salganik-dodds-watts-2006}} {{src:muchnik-aral-taylor-2013}}.",
    "Influence on behaviour does not show benefit to the person; evidence on decision quality and welfare is limited {{src:saxena-banerji-2026}}.",
    "Several key sources were read as abstracts only, and the 1955 paper not at all; the entry limits its claims accordingly.",
    "Strength varies across cultures and periods {{src:bond-smith-1996}}.",
  ],
  misconceptions: [
    {
      myth: "Social proof just means people copy each other.",
      reality:
        "People follow others for different reasons, to be accurate or to be accepted {{src:deutsch-gerard-1955}}, and in response to different information, what others do or what they approve {{src:cialdini-reno-kallgren-1990}}. The design consequences of each differ.",
    },
    {
      myth: "Highly rated means high quality.",
      reality:
        "Ratings are constructed signals shaped by who rates, platform design and earlier ratings {{src:saxena-banerji-2026}}. One artificial up-vote raised final scores by 25% in a randomised experiment {{src:muchnik-aral-taylor-2013}}, and in a music market quality only partly predicted success {{src:salganik-dodds-watts-2006}}.",
    },
    {
      myth: "Telling people that many others behave badly motivates them to do better.",
      reality:
        "It states a descriptive norm in favour of the bad behaviour. In littering studies, attention to a littered setting increased littering; making the injunctive norm salient reduced it {{src:cialdini-reno-kallgren-1990}}.",
    },
    {
      myth: "People know when social information has influenced them.",
      reality:
        "Respondents rated normative information as the least motivating reason, yet it predicted and changed behaviour more than the others {{src:nolan-et-al-2008}}. Self-report is a poor test of a social-proof design.",
    },
    {
      myth: "A testimonial is social proof that most customers are satisfied.",
      reality:
        "Academy interpretation: a testimonial is one selected account. It can illustrate an experience but says nothing about how common that experience is.",
    },
  ],

  relations: [
    { target: "default-effect", type: "related-to", note: "Both can work as implied endorsement: a default suggests what the designer recommends, a popularity signal suggests what others found good." },
    { target: "deceptive-patterns", type: "applied-in", note: "Fake reviews, inflated counts and invented activity messages are social proof used deceptively." },
    { target: "ab-testing", type: "measured-by", note: "Comparing social-proof designs should measure comprehension, satisfaction and later returns as well as conversion." },
    { target: "sample-size-estimation", type: "related-to", note: "An average rating from a handful of raters is an unreliable estimate; the number and source of raters matter." },
    { target: "framing-effect", type: "related-to", note: "Choosing between a descriptive and an injunctive message is a framing decision with different behavioural effects." },
    { target: "nudge-theory", type: "related-to", note: "A descriptive-norm message is a form of nudge: it changes the information people see, not the options open to them." },
    { target: "persuasive-technology", type: "related-to", note: "Social influence is one of the strategies persuasive technology uses; its ethics depend on truthfulness and the person's interest." },
    { target: "trust", type: "related-to", note: "Social proof should calibrate trust to the evidence, not inflate it." },
    { target: "user-autonomy", type: "related-to", note: "Visible tallies and pressure messages can push people towards the popular choice against their own judgement." },
    { target: "social-learning-theory", type: "contrasts-with", note: "Social learning theory explains how people learn behaviours by observing others; social proof concerns using others' behaviour as evidence in a particular decision." },
  ],

  exercises: [
    {
      id: "social-proof-ex-classify",
      kind: "scenario",
      level: "beginner",
      title: "Classify the social signals",
      prompt: [
        "Illustrative scenario: a travel-booking page shows: (a) '4.3 ★ from 860 guest reviews'; (b) 'Most guests at this hotel choose breakfast'; (c) 'Guests agree: please respect quiet hours after 22:00'; (d) a quote from one guest, 'Best stay of my life!'; (e) 'Booked 14 times today'.",
        "For each, say whether it reports what people do (descriptive), what people approve (injunctive), a rating, or a single testimonial, and what a careful traveller can and cannot conclude from it.",
      ],
      deliverable: "A five-row table: signal, type, what it supports, what it does not support.",
      criteria: [
        "Separates descriptive from injunctive information correctly",
        "Treats the testimonial as one selected account, not as evidence of a majority",
        "Notes what is missing for each signal (base, period, population)",
      ],
    },
    {
      id: "social-proof-ex-critique",
      kind: "critique",
      level: "intermediate",
      title: "Critique and rewrite three social-proof messages",
      prompt: [
        "Illustrative scenario: a public energy-saving app plans three messages: (1) 'Only 12% of households in your city have switched to off-peak heating'; (2) 'Join 2 million people who trust EcoHome' (the figure counts all app downloads since launch); (3) a ranked list of 'Top savers in your street', with names.",
        "For each, identify the norm or signal it uses, the likely effect on someone who does not yet save energy, any accuracy or privacy problem, and whether it relies on informational or normative influence.",
        "Rewrite each so it is accurate, uses a relevant comparison group and does not publicise an undesired majority.",
      ],
      deliverable: "An analysis and a rewritten version of each message, with a one-line reason per change.",
      criteria: [
        "Identifies the backfire risk in message 1 and replaces it with an injunctive norm or a reason",
        "States what the figure in message 2 actually counts and corrects the claim",
        "Identifies the privacy and pressure problem in message 3",
        "Uses comparison groups that match the person's situation",
      ],
    },
    {
      id: "social-proof-ex-experiment",
      kind: "assignment",
      level: "advanced",
      title: "Design an ethical test of a review display",
      prompt: [
        "A marketplace wants to replace its average-star display with one that shows the rating distribution, the number of ratings and how recent they are. The commercial team predicts lower conversion on items with few ratings.",
        "Design an experiment comparing the current and proposed displays. Define outcome measures for conversion, comprehension (can people say what the rating is based on?), confidence calibration (does stated confidence track the evidence?), later satisfaction and returns, and differences between experienced and first-time buyers.",
        "Explain how you will avoid herding in the data you collect (for example, whether new raters see the current score before rating), and state a decision rule under which you would ship the new display even if conversion falls.",
      ],
      deliverable: "A one-to-two-page test plan with designs, measures, sample, analysis and an ethical decision rule.",
      criteria: [
        "Measures comprehension and decision quality, not only conversion",
        "Addresses rater independence with reference to the herding evidence",
        "Considers effects on different user groups",
        "States a decision rule that values accurate understanding over short-term conversion",
      ],
    },
  ],

  quiz: [
    {
      id: "social-proof-q-norms",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "'Most visitors to this park take their litter home.' What kind of social information is this?",
      options: [
        { text: "A descriptive norm: it reports what most people do", correct: true, explanation: "It states behaviour, not approval. An injunctive version would say what people think should be done." },
        { text: "An injunctive norm: it says what people approve of", correct: false, explanation: "The sentence reports what visitors do; it says nothing about what they approve." },
        { text: "A testimonial", correct: false, explanation: "A testimonial is one person's account; this is a claim about a majority." },
        { text: "Normative influence", correct: false, explanation: "Normative influence is a motive for following others, not a type of message; this message could engage either motive." },
      ],
      explanation: "Ask whether a message reports doing (descriptive) or approving (injunctive).",
    },
    {
      id: "social-proof-q-motive",
      kind: "scenario",
      level: "intermediate",
      prompt: "A new employee uses the expense tool the way colleagues do because they assume colleagues know the rules. Another uses it the same way because they do not want to look odd. Which statement is most accurate?",
      options: [
        { text: "The first reflects informational influence, the second normative influence, though the behaviour is the same", correct: true, explanation: "Informational influence is following others as evidence; normative influence is following others to be accepted." },
        { text: "Both reflect normative influence because both follow a group", correct: false, explanation: "Following a group is the outcome; the motives differ, and the first is about being right." },
        { text: "Both reflect injunctive norms", correct: false, explanation: "Injunctive norms concern approval; neither case says what colleagues approve, only what they do." },
        { text: "Neither is social proof, because nobody showed them a rating", correct: false, explanation: "Social proof covers any use of others' behaviour as evidence, not only interface ratings." },
      ],
      explanation: "The same choice can come from different motives, which matter for design and for how you test it.",
    },
    {
      id: "social-proof-q-backfire",
      kind: "critique",
      level: "intermediate",
      prompt: "A charity page says 'Sadly, 9 out of 10 visitors leave without donating.' What is the main problem?",
      options: [
        { text: "It states a descriptive norm in favour of not donating, which can make not donating seem normal", correct: true, explanation: "Littering studies show behaviour tends to follow the norm made salient; this message makes the undesired majority salient." },
        { text: "It is too short to persuade anyone", correct: false, explanation: "Length is not the issue; the norm it states is." },
        { text: "Statistics never influence behaviour", correct: false, explanation: "Descriptive-norm information did change behaviour in several field experiments." },
        { text: "Nothing, because it is true", correct: false, explanation: "Being true does not prevent a message from working against its aim; an injunctive message or a reason would avoid the problem." },
      ],
      explanation: "Do not publicise an undesired majority; state what people approve, or give reasons.",
    },
    {
      id: "social-proof-q-ratings",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "What did the randomised experiment on 101,281 comments (Muchnik, Aral and Taylor, 2013) find?",
      options: [
        { text: "One artificial up-vote raised later up-voting and final scores, while negative manipulation was largely corrected", correct: true, explanation: "First-viewer up-votes rose 32% and final mean scores 25%; down-voted comments were corrected by later users." },
        { text: "Ratings were unaffected by earlier ratings, confirming the wisdom of crowds", correct: false, explanation: "Earlier ratings biased later ones, which is the opposite of independent judgement." },
        { text: "Positive and negative manipulation had equal and opposite effects", correct: false, explanation: "The effects were asymmetric: positive herding accumulated, negative manipulation did not." },
        { text: "The bias was the same across all topics and relationships", correct: false, explanation: "Herding varied by topic and by whether raters were friends or enemies of the commenter." },
      ],
      explanation: "Visible ratings are not independent measurements; early signals can shape later ones.",
    },
  ],

  flashcards: [
    { id: "social-proof-fc-1", front: "Informational vs normative influence", back: "Informational: following others as evidence, to be right. Normative: following others to be accepted or avoid disapproval." },
    { id: "social-proof-fc-2", front: "Descriptive vs injunctive norm", back: "Descriptive: what most people do. Injunctive: what most people approve or disapprove of. They can conflict; behaviour tends to follow the one made salient." },
    { id: "social-proof-fc-3", front: "Why a high rating is not proof of quality", back: "Ratings depend on who rates, platform design and earlier ratings; one early up-vote raised final scores by 25% in a randomised experiment." },
    { id: "social-proof-fc-4", front: "Five checks for a social-proof element", back: "True and current? Relevant group? Base stated? Makes an undesired majority visible? Helps judge suitability or only pushes the popular option?" },
  ],

  references: [
    { source: "deutsch-gerard-1955", role: "primary", note: "Distinction between informational and normative social influence; not read, cited for the distinction only." },
    { source: "cialdini-reno-kallgren-1990", role: "primary", note: "Descriptive vs injunctive norms; focus theory; five littering field studies; read in full." },
    { source: "goldstein-cialdini-griskevicius-2008", role: "primary", note: "Hotel towel-reuse field experiments; provincial norms; read in full." },
    { source: "nolan-et-al-2008", role: "primary", note: "Normative influence underdetected; survey and field experiment; abstract only." },
    { source: "salganik-dodds-watts-2006", role: "primary", note: "Artificial music market; inequality and unpredictability; abstract only." },
    { source: "muchnik-aral-taylor-2013", role: "primary", note: "Randomised rating manipulation; asymmetric herding; read in full." },
    { source: "bond-smith-1996", role: "primary", note: "Meta-analysis of Asch-type conformity across cultures and time; abstract only." },
    { source: "cialdini-goldstein-2004", role: "explanatory", note: "Review of compliance and conformity; goals of accuracy, affiliation and self-concept; abstract only." },
    { source: "saxena-banerji-2026", role: "explanatory", note: "Systematic review of online ratings as constructed signals; abstract only." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "Field experiments (littering, hotel towel reuse, energy conservation) and large online experiments (a music market, a randomised rating manipulation) support the core claims: descriptive and injunctive norms differ and can conflict, descriptive-norm messages can change behaviour, and visible popularity can bias later choices and ratings. Three of these studies were read in full; the energy, music-market and conformity studies were read as abstracts. Field results come from few settings and effects were moderate; conformity varies across cultures and periods. The 1955 distinction between informational and normative influence is cited from its title and later attribution, not from reading the paper. Evidence that social-proof displays improve consumers' decisions or welfare is limited, according to a 2026 systematic review read as an abstract. The claim that uncertainty increases reliance on social information, the treatment of testimonials, and the review checklist are the academy's interpretation.",

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
  lastVerifiedAt: "2026-11-23",
});
