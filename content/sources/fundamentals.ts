/**
 * Sources for the UX & UI Fundamentals domain-completion work (owner request
 * 2026-11-19, D-132). Each note says what was actually read: a full text, an
 * abstract (via OpenAlex) or only the bibliographic record. Claims in the
 * entries are limited to what the note records.
 */
import { defineSources } from "../../lib/content/define";

export default defineSources([
  // ── Usefulness and utility ───────────────────────────────────────────────
  {
    id: "davis-1989",
    title: "Perceived usefulness, perceived ease of use, and user acceptance of information technology",
    authors: ["Davis, F. D."],
    container: "MIS Quarterly",
    year: 1989,
    volume: "13",
    issue: "3",
    pages: "319-340",
    doi: "10.2307/249008",
    type: "journal-article",
    tier: 1,
    topics: ["perceived usefulness", "perceived ease of use", "technology acceptance", "measurement scales"],
    access: "paywalled",
    verification: "bibliographic",
    lastVerifiedAt: "2026-11-19",
    notes:
      "Abstract read (OpenAlex); the article was not read. Develops and validates scales for perceived usefulness and perceived ease of use as hypothesised determinants of user acceptance; two studies, 152 users, four application programs; two six-item scales with reliabilities of .98 (usefulness) and .94 (ease of use). Perceived usefulness correlated with self-reported current usage (r = .63, study 1) and self-predicted future usage (r = .85, study 2); ease of use with current (r = .45) and future usage (r = .59); usefulness correlated more strongly with usage than ease of use did, and regression analyses suggest ease of use may be a causal antecedent of usefulness rather than a parallel determinant of use. The item wording and the formal definitions were not read.",
  },
  {
    id: "grudin-1992",
    title: "Utility and usability: research issues and development contexts",
    authors: ["Grudin, J."],
    container: "Interacting with Computers",
    year: 1992,
    volume: "4",
    issue: "2",
    pages: "209-217",
    doi: "10.1016/0953-5438(92)90005-Z",
    type: "journal-article",
    tier: 1,
    topics: ["utility", "usability", "information systems", "HCI history"],
    access: "paywalled",
    verification: "bibliographic",
    lastVerifiedAt: "2026-11-19",
    notes:
      "Abstract read (OpenAlex); the article was not read. Says it is notoriously difficult to separate the function of interactive software from its form; describes two US research communities, one focused on information-system functionality and organisational impact, the other on human-computer dialogues and user interfaces, drawing on different development contexts (in-house development versus off-the-shelf products), each with its own issues and terms; summarises their histories and points of contact.",
  },
  {
    id: "venkatesh-2003",
    title: "User acceptance of information technology: toward a unified view",
    authors: ["Venkatesh, V.", "Morris, M. G.", "Davis, G. B.", "Davis, F. D."],
    container: "MIS Quarterly",
    year: 2003,
    volume: "27",
    issue: "3",
    pages: "425-478",
    doi: "10.2307/30036540",
    type: "journal-article",
    tier: 1,
    topics: ["technology acceptance", "UTAUT", "user acceptance"],
    access: "paywalled",
    verification: "bibliographic",
    lastVerifiedAt: "2026-11-19",
    notes:
      "Abstract read (OpenAlex); the article was not read. Reviews and empirically compares eight acceptance models, including the technology acceptance model; with data from four organisations over six months they explained between 17 and 53 per cent of the variance in intention to use; the unified model (UTAUT), with four core determinants and up to four moderators, reached an adjusted R² of 69 per cent and 70 per cent when confirmed in two further organisations. The names of the four determinants are not given in the abstract and are not used in the entry.",
  },
  {
    id: "govuk-learning-user-needs",
    title: "Learning about users and their needs",
    authors: [],
    organisation: "Government Digital Service (UK)",
    container: "GOV.UK Service Manual",
    url: "https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs",
    type: "official-documentation",
    tier: 2,
    topics: ["user needs", "user research", "service design", "utility"],
    licence: "Open Government Licence v3.0.",
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-19",
    notes:
      "Read in full 2026-11-19. Government guidance: start by learning who will use a service and what they need, because otherwise you cannot build the right thing; defines user needs as the needs a user has of a service that it must satisfy for the right outcome; lists what to find out in discovery and to keep checking in alpha, beta and live; treat opinions not from users as assumptions to prove; research all kinds of users including staff who support them; write needs as 'I need/want/expect to … so that …'. Professional guidance.",
  },
  // ── Desirability ──────────────────────────────────────────────────────────
  {
    id: "moran-2016-desirability-toolkit",
    title: "Using the Microsoft Desirability Toolkit to test visual appeal",
    authors: ["Moran, K."],
    organisation: "Nielsen Norman Group",
    container: "Nielsen Norman Group articles",
    year: 2016,
    url: "https://www.nngroup.com/articles/microsoft-desirability-toolkit/",
    type: "professional-article",
    tier: 3,
    topics: ["desirability", "product reaction cards", "visual appeal", "attitudinal research"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-19",
    notes:
      "Published 28 February 2016; read in full 2026-11-19, with the companion list of the 118 words (/articles/desirability-reaction-words/). Attributes the method to Benedek (spelled 'Benedeck') and Miner's 2002 UPA paper: 118 product-reaction words on cards, participants pick the five that best describe the product at the end of a usability session; benefit, a controlled vocabulary, which cannot remove interpretation problems entirely; the words cover visual appeal, microcopy, functionality and the whole experience; adapt the list (about 25 or fewer for surveys), keep negative and neutral words (the originators aimed for at least 40 % negative), randomise order; a screenshot can be enough; report the percentage of participants choosing each word, compare groups or designs, and count brand words in advance. Practitioner method guidance, not a validation study. Its reference list dates the paper 2010 while naming the UPA 2002 conference.",
  },
]);
