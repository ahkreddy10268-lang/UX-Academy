/**
 * Sources for disability, accessibility as a concept and disability rights:
 * the original social-model document, its academic development, WHO
 * frameworks and reports, and the UN Convention on the Rights of Persons with
 * Disabilities. Checked 2026-11-05 (see each record's notes).
 */
import { defineSources } from "../../lib/content/define";

export default defineSources([
  {
    id: "upias-disability-alliance-1976",
    title: "Fundamental Principles of Disability",
    authors: [],
    organisation: "Union of the Physically Impaired Against Segregation (UPIAS) and The Disability Alliance",
    publisher: "UPIAS and The Disability Alliance",
    year: 1976,
    url: "https://disability-studies.leeds.ac.uk/wp-content/uploads/sites/40/library/UPIAS-fundamental-principles.pdf",
    type: "technical-report",
    tier: 1,
    topics: ["social model of disability", "impairment and disability", "disability rights", "segregation"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-05",
    notes:
      "Read first-hand 2026-11-05 in the Leeds Disability Archive copy. A booklet summarising the discussion between the two organisations held on 22 November 1975, with a commentary from each; the introduction is dated November 1976. The digital copy is an unabridged version 'electronically scanned and reformatted from the original document by Mark Priestley, in consultation with Vic Finkelstein and Ken Davis (October 1997)', with original page numbers in brackets. The Union's commentary (original p. 14) defines impairment as 'lacking part of or all of a limb, or having a defective limb, organ or mechanism of the body' and disability as 'the disadvantage or restriction of activity caused by a contemporary social organisation which takes no or little account of people who have physical impairments'; it states 'it is society which disables physically impaired people'. The definitions refer to physical impairment. The document does not use the label 'social model'; it is the foundational statement of the ideas later given that name.",
  },
  {
    id: "oliver-1983",
    title: "Social Work with Disabled People",
    authors: ["Oliver, M."],
    publisher: "Macmillan",
    year: 1983,
    isbn: "978-0-333-32707-4",
    doi: "10.1007/978-1-349-86058-6",
    url: "https://link.springer.com/book/10.1007/978-1-349-86058-6",
    type: "book",
    tier: 2,
    topics: ["social model of disability", "social work", "disability studies"],
    access: "paywalled",
    verification: "bibliographic",
    notes:
      "Book in the Practical Social Work series; the DOI is the Springer (Palgrave) digital reissue. Not read here. Used only as an academic work that developed the UPIAS distinction for professional practice; the claim that Oliver named the 'social model' is a widely repeated attribution, stated as such, not a finding from this record.",
  },
  {
    id: "who-icf-2001",
    title: "International Classification of Functioning, Disability and Health (ICF)",
    authors: [],
    organisation: "World Health Organization",
    year: 2001,
    url: "https://www.who.int/classifications/international-classification-of-functioning-disability-and-health",
    type: "official-documentation",
    tier: 1,
    topics: ["ICF", "functioning", "environmental factors", "biopsychosocial"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-05",
    notes:
      "Checked 2026-11-05: the page states that the ICF was endorsed by all 191 WHO Member States at the Fifty-fourth World Health Assembly on 22 May 2001 (resolution WHA54.21), that it is WHO's framework for measuring health and disability at individual and population levels, and that because functioning and disability occur in a context it includes environmental factors. The component structure (body functions and structures, activities and participation, environmental and personal factors) is the classification's published structure; the page itself does not list it.",
  },
  {
    id: "un-crpd-2006",
    title: "Convention on the Rights of Persons with Disabilities",
    authors: [],
    organisation: "United Nations General Assembly",
    year: 2006,
    url: "https://www.un.org/disabilities/documents/convention/convoptprot-e.pdf",
    type: "standard",
    tier: 1,
    topics: ["disability rights", "accessibility", "reasonable accommodation", "universal design", "human rights"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-05",
    notes:
      "International human-rights treaty adopted by the UN General Assembly in December 2006. Text read 2026-11-05 in the UN's published PDF (Convention and Optional Protocol). Article 1 states the purpose (to promote, protect and ensure the full and equal enjoyment of all human rights and fundamental freedoms by all persons with disabilities, and respect for their inherent dignity) and that persons with disabilities include those with long-term physical, mental, intellectual or sensory impairments which in interaction with various barriers may hinder their full and effective participation on an equal basis with others. Article 2 defines reasonable accommodation (necessary and appropriate modification and adjustments not imposing a disproportionate or undue burden, where needed in a particular case) and universal design (usable by all people, to the greatest extent possible, without the need for adaptation or specialized design, and not excluding assistive devices where needed). Article 3 lists the general principles, including dignity and autonomy, non-discrimination, participation, respect for difference, equality of opportunity and accessibility. Article 9 requires measures to ensure access to the physical environment, transportation, information and communications and public facilities and services, including identifying and eliminating barriers. Article 21 covers access to information in accessible formats. A treaty sets obligations for the states that ratify it; nothing here is legal advice on any country's obligations.",
  },
  {
    id: "who-world-report-disability-2011",
    title: "World Report on Disability",
    authors: [],
    organisation: "World Health Organization and World Bank",
    publisher: "World Health Organization",
    year: 2011,
    isbn: "978-92-4-156418-2",
    url: "https://www.who.int/publications/i/item/9789241564182",
    type: "technical-report",
    tier: 1,
    topics: ["disability", "barriers", "environment", "rehabilitation", "participation"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-05",
    notes:
      "Checked 2026-11-05: the WHO page lists it as produced jointly by WHO and the World Bank, published 14 December 2011, and summarises that 'more than a billion people in the world today experience disability' (a 2011 estimate). The page now refers readers to the 2022 Global report on health equity for updated data. Uses the ICF framework of functioning in context.",
  },
  {
    id: "who-global-report-health-equity-disability-2022",
    title: "Global Report on Health Equity for Persons with Disabilities",
    authors: [],
    organisation: "World Health Organization",
    publisher: "World Health Organization",
    year: 2022,
    isbn: "978-92-4-006360-0",
    url: "https://www.who.int/publications/i/item/9789240063600",
    type: "technical-report",
    tier: 1,
    topics: ["health equity", "disability prevalence", "systemic barriers"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-05",
    notes:
      "Checked 2026-11-05: published 2 December 2022. The page states an estimated 1.3 billion people, or 16% of the global population, experience significant disability (the report's estimate, not a current measurement), and that persons with disabilities die earlier, have poorer health and experience more limitations in everyday functioning, owing to unfair conditions including in the health system itself.",
  },
]);
