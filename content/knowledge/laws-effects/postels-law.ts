import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "postels-law",
  slug: "postels-law",
  title: "Postel's Law",
  alternateNames: ["Robustness principle", "Be conservative in what you send, liberal in what you accept"],
  summary:
    "A protocol-design maxim from early Internet specifications: send well-formed output, and accept input you can still interpret. In UX it becomes: be flexible about harmless variation, precise about meaning, strict about safety, and consistent in what you send. It is a practitioner principle, not a scientific law.",
  definition:
    "**Postel's Law**, or the **robustness principle**, is Jon Postel's advice that a protocol implementation be conservative in what it sends and liberal in what it receives: send well-formed messages, but accept any message that can still be interpreted where the meaning is clear {{src:rfc-760}} {{src:rfc-791}}. It was written for independently built network software that had to interoperate {{src:rfc-791}} and was later stated as 'Be liberal in what you accept, and conservative in what you send' {{src:rfc-1122}}. A 2023 Internet Architecture Board document keeps its defences against defects and attacks but says that tolerating unexpected input is no longer best practice in all cases {{src:rfc-9413}}. Applied to interfaces it is an interpretation, not a tested law of user behaviour.",
  primaryType: "principle",
  secondaryTypes: [],
  domain: "laws-effects",
  subcategory: "popular-ux-laws",
  tags: ["robustness principle", "input validation", "forms", "normalisation", "interoperability", "APIs", "error handling", "security", "backward compatibility"],
  difficulty: "intermediate",
  disciplines: ["Network protocol design", "Software engineering", "Interaction design", "Application security"],
  learningObjectives: [
    "Explain the original protocol meaning of the robustness principle and distinguish it from its adaptation to user interfaces.",
    "Separate tolerant parsing, normalisation, validation, authorisation and output encoding for a given input, and decide which harmless variations to accept and which ambiguities to clarify or reject.",
    "Evaluate a form, import or API for over-tolerance, using the RFC 9413 critique and security guidance, and propose a design that accepts harmless variation without guessing or failing open.",
    "Write an accessible error response that identifies the field, explains the problem and suggests a correction while keeping the person's input.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "In the early Internet, many teams wrote their own software to send and receive the same kind of message. Specifications were never perfectly clear, so Jon Postel advised: when you send, follow the rules carefully; when you receive, accept anything you can still understand, and do not object to small technical errors when the meaning is clear {{src:rfc-760}} {{src:rfc-791}}. This became known as the **robustness principle**, or **Postel's Law** {{src:rfc-1122}}.",
        "Designers borrowed the idea for interfaces. If a person types a phone number with spaces, brackets or hyphens, the form can accept all of those and work out the same number, instead of rejecting the entry for using the 'wrong' format. That is being liberal in what you accept. Storing and sending the number in one standard form is being conservative in what you send.",
        "The borrowing has limits. Being flexible about **format** is different from guessing **meaning**: '03/04/2026' is 3 April in some countries and 4 March in others, so a careful system asks. And being flexible never means skipping the checks that keep data correct and people safe {{src:owasp-input-validation-cheat-sheet}}. The protocol community itself has since warned that tolerating everything can cause long-term problems {{src:rfc-9413}}.",
      ],
      analogy:
        "A good receptionist understands 'Dr Smith', 'Doctor Smith' and 'Smith, the cardiologist' as the same person, and writes the appointment down the same way every time. But when two doctors are called Smith, they ask which one, and they still check that you are the patient before giving out the results.",
      everydayExamples: [
        "A phone field that accepts '+44 20 1234 5678' and '+442012345678' alike.",
        "A name field that accepts 'O'Brien', 'Zoë' and names in non-Latin scripts.",
        "A card-number field that ignores the spaces people copy from the card.",
        "A booking form that asks which date you mean instead of guessing the day–month order.",
      ],
      vocabulary: [
        { term: "Robustness principle", meaning: "Be conservative in what you send and liberal in what you accept; also called Postel's Law." },
        { term: "Syntactic variation", meaning: "Different ways of writing the same value, such as spaces or brackets in a phone number." },
        { term: "Semantic validity", meaning: "Whether the value makes sense for the task: a real date, an end after a start, a number in range." },
        { term: "Normalisation", meaning: "Converting an accepted value into one standard representation." },
        { term: "Validation", meaning: "Checking that the interpreted value is allowed and meaningful before using it." },
        { term: "Fail open / fail safe", meaning: "On doubt or error, letting the action through (open) or stopping it and asking (safe)." },
      ],
    },
    intermediate: {
      explanation: [
        "**The original meaning.** RFC 760 (1980) and RFC 791 (1981) put the principle in a section titled 'Discussion': because each implementation must interoperate with others built by different people, and the specification might be read in different ways, an implementation should (in RFC 791, must) send well-formed datagrams and accept any it can interpret 'where the meaning is still clear' {{src:rfc-760}} {{src:rfc-791}}. RFC 1122 (1989) named it the robustness principle and, in the same section, told implementers to assume a network 'filled with malevolent entities' and to design protectively {{src:rfc-1122}}. Tolerance and defensive design were stated together from the start.",
        "**From protocols to people.** A protocol receiver handles messages from other software; a form handles text typed or pasted by a person. Academy interpretation: what carries over is the idea of absorbing harmless variation so the other side does not fail on trivia; what does not carry over automatically is the protocol context of machine-to-machine messages. RFC 9413 notes that where input is provided by users, flexibility can make a protocol more accessible to non-experts, citing HTML authoring {{src:rfc-9413}}. There is no experimental evidence in these sources that permissive interfaces always work better.",
        "**Five different operations.** Tolerant **parsing** reads a value written in an expected variety of ways. **Normalisation** turns it into one representation. **Validation** checks syntax and meaning, such as a booking whose end date is after its start {{src:owasp-input-validation-cheat-sheet}}. **Authorisation** checks that this person may do this: 'a valid account identifier does not mean the caller may access that account' {{src:owasp-input-validation-cheat-sheet}}. **Output encoding** and parameterised queries protect data where it is used, and validation does not replace them {{src:owasp-input-validation-cheat-sheet}}. Postel's Law speaks only to the first two.",
        "**Normalise, do not mutate.** Removing separators from a phone number after parsing it correctly is normalisation. Rewriting a name to strip an apostrophe or accent is damage: blocking apostrophes rejects legitimate names without making a database query any safer {{src:owasp-input-validation-cheat-sheet}}. Silently picking one reading of '03/04/2026', or quietly changing a financial, medical, legal or identity value, invents the person's intent. Where the meaning is not clear, the original wording itself does not apply: it covers only input whose meaning is still clear {{src:rfc-791}}.",
        "**Rejecting respectfully.** When input is rejected, WCAG requires that the item in error be identified and the error described in text {{src:w3c-wcag-22}}, and that known corrections be suggested unless that would compromise security or purpose {{src:w3c-understanding-error-suggestion}}. The Understanding document for 3.3.1 restates that the item and the error must be described in text {{src:w3c-understanding-error-identification}}, and the one for 3.3.3 notes that people with cognitive or visual disabilities may not work out how to correct an error they know about {{src:w3c-understanding-error-suggestion}}. For legal, financial and data-changing submissions, WCAG also requires that they be reversible, checked or confirmed {{src:w3c-wcag-22}}. WCAG does not require Postel's Law; it governs how errors are communicated whichever policy a product chooses.",
      ],
      howItWorks: [
        "Receive: accept input at the boundary, within size limits, before parsing it {{src:owasp-input-validation-cheat-sheet}}.",
        "Parse: interpret the representation if it is one of the expected forms; if not, stop.",
        "Normalise: convert harmless variation into one canonical value where the meaning is unambiguous.",
        "Validate: check syntax, meaning, ranges and relationships between fields {{src:owasp-input-validation-cheat-sheet}}, then permissions separately.",
        "Clarify or reject: ask when meaning is ambiguous; otherwise explain in text what is wrong and how to fix it {{src:w3c-wcag-22}}.",
        "Respond: keep what the person entered and offer the correction.",
        "Send: store and emit one documented, standards-based representation {{src:rfc-791}}.",
        "Maintain: log tolerated deviations, document temporary compatibility rules and retire them deliberately {{src:rfc-9413}}. (Academy framework drawn from these sources; not a published standard.)",
      ],
      implementation: [
        "List, for each field, the variations you will accept (separators, case, leading and trailing spaces, full-width digits) and the single form you will store.",
        "Accept the full range of real names and international text; limit length, not alphabet {{src:owasp-input-validation-cheat-sheet}}.",
        "For dates, times, currencies and decimal separators, use controls or explicit formats that remove ambiguity, or confirm the interpreted value back to the person.",
        "Show any normalisation that changes what the person sees ('Saved as +44 20 1234 5678') rather than altering it silently.",
        "Keep parsing permissive only before validation; keep validation, authorisation and safety checks strict.",
        "In APIs, specify required and optional fields, how unknown fields are handled and which versions are supported; document deprecations and remove accidental behaviour on a schedule {{src:rfc-9413}}.",
      ],
      scenarios: [
        "Illustrative scenario: a sign-up form rejects 'Siobhán Ní Dhuibhir' as 'invalid characters'. The fix is to accept Unicode letters, apostrophes, hyphens and spaces, limit only length, and store the name exactly as entered.",
        "Illustrative scenario: a sign-in form trims spaces and ignores letter case in the email address before looking the account up. That tolerance helps people who paste addresses. The password check, account lock-out and permission checks stay exactly as strict as before.",
        "Illustrative scenario: a spreadsheet import accepts comma- and semicolon-separated files and both common line endings, but when it cannot tell whether '1.234' is one thousand two hundred and thirty-four or one point two three four, it shows a preview and asks the person to choose the number format.",
        "Illustrative scenario: a public API has accepted an undocumented field name with a typo for years. The team documents both names, warns clients that use the typo, publishes a removal date and measures remaining usage before turning it off.",
      ],
    },
    advanced: {
      explanation: [
        "**Three kinds of robustness.** RFC 9413 separates robustness to software defects, to attacks and to the unexpected. The first two remain necessary: software must recover from faults, and invalid input must never let a sender access or change data or act beyond its permissions. The third, tolerating unexpected input or acting on a sender's inferred intent, 'is no longer considered best practice in all scenarios', and ignoring faulty or ambiguous input 'is almost always the incorrect solution' {{src:rfc-9413}}.",
        "**Why tolerance decays.** When receivers silently accept errors, senders never fix them; flaws become entrenched until every new implementation must copy them to interoperate, a state described as 'bug-for-bug compatible' {{src:rfc-9413}}. RFC 9413 gives a TLS example in which clients had to avoid a message shape that widely deployed servers mishandled, and describes two stable outcomes for an ecosystem: mostly strict, or mostly tolerant of the same mistakes {{src:rfc-9413}}. Its remedy is active maintenance: fixing specifications and implementations rather than absorbing problems indefinitely, while accepting that temporary tolerance is sometimes unavoidable {{src:rfc-9413}}.",
        "**Disagreement is the danger.** Two components that interpret the same input differently create gaps. In email, a module that 'fixes' a malformed message can stop later modules from recognising harmful content, so every module must make consistent assertions about the message {{src:rfc-7103}}. In HTTP, request smuggling exploits differences in parsing among recipients; the current HTTP/1.1 specification defines exactly where recipients may be lenient and where they must treat input as invalid {{src:rfc-9112}}. The UX parallel, as academy interpretation: a client-side form and a server that accept different formats will eventually disagree about what was submitted.",
        "**The dividing line must be explicit.** Already in 1998 the guide for standards writers warned that the rule had caused disputes in which each side blamed the other, and asked authors to specify sending and receiving behaviour separately and to state a dividing line between using as much of a message as possible and invoking error procedures, rejecting messages that could be read in different ways where errors are dangerous {{src:rfc-2360}}. The email community similarly concluded that Postel's directive was meant for legitimate variation and transit errors, not for any deviation, and that some malformations should be rejected {{src:rfc-7103}}.",
        "**Never fail open.** Tolerant input handling does not extend to authentication, authorisation, payment validation, data integrity or safety-critical rules. Academy position: when a value is ambiguous or potentially dangerous, stop and ask, or reject with an explanation; the cost of a clarifying step is small next to acting on a guess.",
      ],
      evidence: [
        "Original formulations: send well-formed datagrams, accept any that can be interpreted where the meaning is clear; 'should' in RFC 760, 'must' in RFC 791 {{src:rfc-760}} {{src:rfc-791}}. Read.",
        "Naming and defensive context: the principle as a general rule at every layer, alongside the instruction to assume malevolent senders and incomplete enumerations {{src:rfc-1122}}. Read.",
        "Early caution: conflicts between vendors; specify send and receive separately and define where tolerance ends {{src:rfc-2360}}. Read.",
        "Malformed email: some tolerance has worked better than rejection, but lenient handling now creates exploitable gaps; modules must agree on content {{src:rfc-7103}}. Read in relevant sections.",
        "Modern reassessment by the IAB: tolerance of the unexpected leads to protocol decay; active maintenance preferred {{src:rfc-9413}}. Read in full.",
        "Security: parsing differences among HTTP recipients enable request smuggling {{src:rfc-9112}}; validation of syntax and meaning is separate from authorisation and output encoding {{src:owasp-input-validation-cheat-sheet}}. Read.",
        "No source here reports an experiment measuring whether liberal input handling improves user outcomes; UX claims in this entry are professional interpretation.",
      ],
      debates: [
        "**Was the principle a success or a mistake?** RFC 9413 notes that many consider the principle instrumental to the Internet's success and best suited to early phases of design, and argues that its third aspect causes harm over time where implementations can be updated {{src:rfc-9413}}. Others in the IETF had already limited it to legitimate variations and transit errors {{src:rfc-7103}}.",
        "**How much flexibility should a user-facing system offer?** RFC 9413 allows that flexibility can help non-expert users {{src:rfc-9413}}, while security guidance requires strict, well-defined validation rules {{src:owasp-input-validation-cheat-sheet}}. Academy position: be generous about representation and strict about meaning and permission.",
      ],
      alternativeModels: [
        "**Strict parsing with clear errors**: reject anything outside the specification and explain why; simple and predictable, but unfriendly where variation is harmless.",
        "**Defined flexibility**: a specification that lists every accepted representation and exact error handling, distinct from relying on the robustness principle {{src:rfc-9413}}.",
        "**Active maintenance**: tolerate temporarily, report and fix the cause, and retire the workaround {{src:rfc-9413}}.",
      ],
    },
  },

  origin: {
    contributors: ["Jon Postel", "Robert Braden", "Martin Thomson", "David Schinazi"],
    period: "Internet Protocol specifications, 1980–1981; named in host requirements, 1989; reassessed by the IAB, 2023",
    problem:
      "How independently written network software could interoperate when specifications might be read in different ways.",
    narrative: [
      "Postel wrote the advice into the Internet Protocol specification in January 1980 and again in RFC 791 in September 1981, in each case after noting that, despite the aim to be explicit, there was the possibility of differing interpretations {{src:rfc-760}} {{src:rfc-791}}.",
      "RFC 1122 called it the robustness principle and gave the familiar phrasing {{src:rfc-1122}}. Later IETF documents limited its scope: RFC 2360 asked standard writers to define where tolerance ends {{src:rfc-2360}}, and RFC 7103 argued it covered legitimate variation, not any deviation {{src:rfc-7103}}. In 2023 the IAB's RFC 9413 reassessed it in favour of active protocol maintenance {{src:rfc-9413}}.",
      "UX practitioners adopted the maxim for forms and data entry; that adaptation is professional interpretation rather than part of the protocol record.",
    ],
    attributionNote:
      "The principle is attributed to Postel through RFC 760 and RFC 791, which he authored; the 'liberal in what you accept, conservative in what you send' wording quoted here is from RFC 1122. Status: RFC 791 and RFC 1122 are Internet Standards; RFC 760 is obsolete; RFC 2360 is a Best Current Practice; RFC 7103 and RFC 9413 are Informational; RFC 9112 is an Internet Standard. OWASP guidance is professional, not a standard.",
  },

  application: {
    summary: [
      "Be flexible about harmless variation, precise about meaning, strict about safety, and consistent in what you send (academy interpretation, not an RFC quotation). Decide per field which variations are harmless, normalise them visibly, ask when meaning is ambiguous, keep validation and permission checks strict, and treat every compatibility exception as temporary.",
      "Two counter-examples of excessive tolerance: (1) a payments form that silently reads '1.000' as one when the person meant one thousand; (2) an account lookup that matches 'similar' identifiers and so opens the wrong person's record. In both, guessing replaced asking.",
    ],
    web: [
      "Forms: accept separators in phone, card and postcode fields; accept international names unchanged {{src:owasp-input-validation-cheat-sheet}}; use explicit date and number formats or confirm the interpretation.",
      "Errors: identify the field and the problem in text, suggest a correction and keep what was entered {{src:w3c-wcag-22}} {{src:w3c-understanding-error-suggestion}}.",
    ],
    mobile: [
      "Use input types and keyboards that prevent ambiguity (numeric pads, date pickers) and accept pasted values with spaces or line breaks where the meaning is clear.",
    ],
    enterprise: [
      "APIs and integrations: publish a schema with required and optional fields and a rule for unknown fields; make server and client accept the same forms; version deliberately and give deprecated behaviour a documented end date {{src:rfc-9413}}.",
      "Imports and exports: support documented variants, show a preview when structure or encoding is uncertain, keep the original file, and export one documented format.",
    ],
    services: [
      "Identity and authentication: tolerate case and whitespace in identifiers before lookup, but never relax matching, authentication or authorisation; when in doubt, fail safe and explain {{src:owasp-input-validation-cheat-sheet}}.",
    ],
    steps: [
      "For each input, write the accepted variations, the canonical stored form, the validation rules and the error messages.",
      "Test with real-world variation: international names, pasted values, different locales, assistive technology.",
      "Check that the client, server and any downstream system parse the same input the same way.",
      "Review every ambiguous case and decide between asking, rejecting with a suggestion, or a documented default.",
      "Log tolerated deviations in integrations; schedule and announce the end of temporary compatibility rules.",
    ],
  },

  whenToUse: [
    "Designing data entry where people naturally write the same value in different ways.",
    "Defining how an API or import handles optional fields, versions and known variations.",
    "Reviewing validation and error handling for usability, accessibility and security together.",
  ],
  whenNotToUse: [
    "To guess the meaning of ambiguous input such as dates, decimal formats or similar identifiers.",
    "To relax authentication, authorisation, payment, integrity or safety checks.",
    "As a reason to keep accepting a client's bug indefinitely instead of fixing and retiring it {{src:rfc-9413}}.",
    "As evidence that more permissive interfaces are always more usable; no experimental evidence of that is cited here.",
  ],
  advantages: [
    "Removes needless rejections for harmless formatting, especially for international names and pasted values {{src:owasp-input-validation-cheat-sheet}}.",
    "Gives a clear division of labour: flexible at the boundary, consistent in storage and output {{src:rfc-791}}.",
    "Supports interoperability during transitions, when used as a temporary, documented measure {{src:rfc-9413}}.",
  ],
  limitations: [
    "Originally about machine-to-machine protocols; its use for human input is an adaptation.",
    "Tolerating the unexpected can entrench defects and reduce interoperability over time {{src:rfc-9413}}.",
    "Inconsistent tolerance between components creates security gaps {{src:rfc-7103}} {{src:rfc-9112}}.",
    "Says nothing about where tolerance should end; teams must define that line explicitly {{src:rfc-2360}}.",
  ],
  misconceptions: [
    {
      myth: "Postel's Law means accept everything.",
      reality:
        "The original covered input whose meaning is still clear {{src:rfc-791}}, and RFC 1122 paired it with assuming malicious senders {{src:rfc-1122}}. Ambiguous or invalid input should be clarified or rejected.",
    },
    {
      myth: "If the input parses, it is valid.",
      reality:
        "Parsing checks form; validation checks meaning and range, and authorisation checks permission. A well-formed account number may still belong to someone else {{src:owasp-input-validation-cheat-sheet}}.",
    },
    {
      myth: "Postel's Law is a proven law of usability.",
      reality:
        "It is an engineering maxim from protocol design, applied to UX by practitioners. The sources here are specifications and guidance, not user studies.",
    },
    {
      myth: "The IETF still recommends tolerating anything unexpected.",
      reality:
        "The IAB's RFC 9413 keeps robustness to defects and attacks but says tolerating the unexpected is no longer best practice in all scenarios {{src:rfc-9413}}.",
    },
    {
      myth: "Normalising input means it is safe.",
      reality:
        "Normalisation is not sanitisation and does not replace output encoding or parameterised queries {{src:owasp-input-validation-cheat-sheet}}.",
    },
  ],

  relations: [
    { target: "error-prevention", type: "complementary-to", note: "Accepting harmless variation prevents needless errors; clarifying ambiguity prevents wrong submissions." },
    { target: "error-messages", type: "applied-in", note: "When input must be rejected, the message identifies the field, explains why and suggests a fix." },
    { target: "teslers-law", type: "related-to", note: "Parsing variation moves complexity from the person to the system, which must then handle it correctly." },
    { target: "jakobs-law", type: "related-to", note: "Accepting the formats people already use respects learned conventions." },
    { target: "consistency-principle", type: "related-to", note: "Being conservative in what you send means one consistent representation in storage and output." },
    { target: "wcag", type: "related-to", note: "WCAG governs how input errors are identified and corrected, whatever tolerance policy is chosen." },
    { target: "user-control-and-freedom", type: "related-to", note: "Showing and confirming normalised or interpreted values keeps people in control of their data." },
    { target: "security-ux", type: "related-to", note: "Tolerant parsing must never relax authentication, authorisation or validation." },
  ],

  exercises: [
    {
      id: "postels-law-ex-classify",
      kind: "scenario",
      level: "beginner",
      title: "Accept, normalise, ask or reject?",
      prompt: [
        "Decide for each input whether to accept as is, accept and normalise, ask the person, or reject with a message: (a) a postcode typed in lower case with no space; (b) '05/06/2026' in a booking form used internationally; (c) the surname 'D'Arcy'; (d) a quantity of -3 items; (e) a card number pasted with spaces.",
      ],
      deliverable: "A table: input, decision, one-line reason.",
      criteria: [
        "Normalises harmless format differences (a, e)",
        "Accepts the name unchanged (c)",
        "Asks about the ambiguous date (b)",
        "Rejects the out-of-range quantity with a clear message (d)",
      ],
    },
    {
      id: "postels-law-ex-critique",
      kind: "critique",
      level: "intermediate",
      title: "Redesign an over-strict and over-loose form",
      prompt: [
        "Illustrative scenario: a money-transfer form rejects phone numbers with spaces and names with accents, but accepts amounts typed as '1.500' and '1,500' and guesses which was meant from the browser language.",
        "Identify which behaviours are too strict and which too tolerant. Redesign the fields, the validation rules and the error messages so harmless variation is accepted, ambiguous amounts are confirmed, and errors meet WCAG's identification and suggestion requirements.",
      ],
      deliverable: "Annotated before-and-after field specifications and error copy.",
      criteria: [
        "Accepts phone separators and international names",
        "Removes the guess about decimal separators by asking or confirming",
        "Error messages name the field, the problem and a fix in text",
        "Keeps the person's entered values after an error",
      ],
    },
    {
      id: "postels-law-ex-api",
      kind: "assignment",
      level: "advanced",
      title: "Plan the retirement of a compatibility quirk",
      prompt: [
        "Your API has silently accepted a misspelt field for years, and a few large clients depend on it. Using RFC 9413's argument, write a plan to document the current behaviour, measure its use, warn clients, set a removal date and confirm that client and server parsing agree afterwards.",
        "Include how you would handle a client that cannot update, and what security risks the quirk might hide.",
      ],
      deliverable: "A one-page deprecation plan with timeline, communication and success measures.",
      criteria: [
        "Treats the tolerance as temporary and documented",
        "Includes measurement of remaining use",
        "Addresses parsing consistency between components",
        "Considers clients that cannot update without making the quirk permanent by default",
      ],
    },
  ],

  quiz: [
    {
      id: "postels-law-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What did the original robustness principle advise?",
      options: [
        { text: "Send well-formed messages and accept any message you can still interpret", correct: true, explanation: "RFC 760 and RFC 791 say to send well-formed datagrams and accept those that can be interpreted where the meaning is clear." },
        { text: "Accept every message regardless of meaning", correct: false, explanation: "The wording is limited to input whose meaning is still clear." },
        { text: "Reject any message that deviates from the specification", correct: false, explanation: "That is the opposite of the liberal half of the principle." },
        { text: "Users always prefer permissive forms", correct: false, explanation: "The principle comes from protocol design, not from user studies." },
      ],
      explanation: "Conservative in sending, liberal in receiving, within the limit of clear meaning.",
    },
    {
      id: "postels-law-q-checks",
      kind: "scenario",
      level: "intermediate",
      prompt: "A form accepts an account number with spaces, removes them and finds a real account. What still needs to happen before money is moved?",
      options: [
        { text: "Check that the person is allowed to use that account and that the amount and other fields make sense", correct: true, explanation: "Parsing and normalisation do not establish permission or semantic validity." },
        { text: "Nothing: a valid account number proves the request is legitimate", correct: false, explanation: "A valid identifier does not mean the caller may access that account." },
        { text: "Only output encoding", correct: false, explanation: "Encoding protects where data is displayed or used; it does not check permission or meaning." },
        { text: "Re-add the spaces before saving", correct: false, explanation: "Storage should use one canonical form." },
      ],
      explanation: "Tolerant parsing, validation and authorisation are separate steps.",
    },
    {
      id: "postels-law-q-date",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "An international booking form receives '03/04/2026'. What is the best response?",
      options: [
        { text: "Ask or confirm which date is meant, or use a control that removes the ambiguity", correct: true, explanation: "The value can mean two different dates; the principle applies only where the meaning is clear." },
        { text: "Assume the order from the browser language", correct: false, explanation: "Browser language is not a reliable signal of what this person meant." },
        { text: "Reject it with 'Invalid date'", correct: false, explanation: "It is a valid date in either reading; the problem is ambiguity, not validity." },
        { text: "Store it exactly as typed and decide later", correct: false, explanation: "The ambiguity reaches every downstream system." },
      ],
      explanation: "Be flexible about format, never guess about meaning.",
    },
    {
      id: "postels-law-q-rfc9413",
      kind: "critique",
      level: "advanced",
      prompt: "According to RFC 9413 (2023), which statement is accurate?",
      options: [
        { text: "Robustness to defects and attacks remains necessary, but tolerating unexpected input is no longer best practice in all scenarios", correct: true, explanation: "The IAB document separates three aspects and recommends active maintenance over indefinite tolerance." },
        { text: "The robustness principle should be abandoned entirely", correct: false, explanation: "The document keeps the defences against defects and attacks." },
        { text: "Implementations should process ambiguous messages according to the sender's inferred intent", correct: false, explanation: "That interpretation is the one the document argues against." },
        { text: "It is a Standards Track requirement for all protocols", correct: false, explanation: "RFC 9413 is an Informational IAB document." },
      ],
      explanation: "Tolerance that hides problems leads to protocol decay; maintenance fixes them.",
    },
  ],

  flashcards: [
    { id: "postels-law-fc-1", front: "Robustness principle (original sense)", back: "Send well-formed messages; accept any message you can interpret where the meaning is clear (RFC 760, 791)." },
    { id: "postels-law-fc-2", front: "Parse, normalise, validate, authorise", back: "Four separate steps: read the variant, store one form, check meaning and range, check permission. Postel's Law covers only the first two." },
    { id: "postels-law-fc-3", front: "RFC 9413's three robustness aspects", back: "To defects (keep), to attacks (keep), to the unexpected (no longer best practice in all cases; prefer active maintenance)." },
    { id: "postels-law-fc-4", front: "Academy rule for UX", back: "Flexible about harmless variation, precise about meaning, strict about safety, consistent in what you send." },
    { id: "postels-law-fc-5", front: "Respectful rejection", back: "Identify the field and the error in text, suggest a fix, keep what was entered (WCAG 3.3.1, 3.3.3)." },
  ],

  references: [
    { source: "rfc-760", role: "primary", note: "Earliest RFC-series wording (section 3.2); obsolete; read." },
    { source: "rfc-791", role: "standard", note: "Internet Protocol, section 3.2: the principle with 'must'; read." },
    { source: "rfc-1122", role: "standard", note: "Section 1.2.2 names the robustness principle; read." },
    { source: "rfc-2360", role: "explanatory", note: "BCP 22, section 2.9: cautions and the dividing line; read." },
    { source: "rfc-7103", role: "explanatory", note: "Informational: malformed email, limits of tolerance; read in relevant sections." },
    { source: "rfc-9413", role: "explanatory", note: "IAB Informational reassessment; read in full." },
    { source: "rfc-9112", role: "standard", note: "HTTP/1.1 parsing rules and request smuggling (sections 2.2, 11); read." },
    { source: "owasp-input-validation-cheat-sheet", role: "explanatory", note: "Professional security guidance on validation; read in full." },
    { source: "w3c-wcag-22", role: "standard", locator: "SC 3.3.1, 3.3.3, 3.3.4", note: "Error identification, suggestion and prevention." },
    { source: "w3c-understanding-error-identification", role: "explanatory", note: "Informative Understanding document for SC 3.3.1." },
    { source: "w3c-understanding-error-suggestion", role: "explanatory", note: "Informative Understanding document for SC 3.3.3." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Postel's Law is an engineering maxim recorded in Internet specifications (RFC 760, RFC 791, RFC 1122), not an empirical finding. Its limits are documented by later IETF and IAB texts (RFC 2360, RFC 7103, and the 2023 reassessment RFC 9413) and by HTTP parsing requirements (RFC 9112); all were read in the relevant sections. Validation guidance comes from OWASP, which is professional guidance, and error-communication requirements from WCAG 2.2. None of these sources tests whether liberal input handling improves user outcomes. The translation to UX (accept harmless variation, ask about ambiguity, keep checks strict, output one form) and the eight-step framework are the academy's interpretation.",

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
  lastVerifiedAt: "2026-11-24",
});
