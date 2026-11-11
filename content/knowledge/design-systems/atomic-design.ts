import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "atomic-design",
  slug: "atomic-design",
  title: "Atomic Design",
  alternateNames: ["Atoms, molecules, organisms", "Atomic design methodology", "Brad Frost's atomic design"],
  summary:
    "Brad Frost's methodology for building interface design systems in five stages — atoms, molecules, organisms, templates and pages — used together as a mental model for seeing an interface as both a whole and a collection of parts.",
  definition:
    "Atomic design is a methodology, introduced by Brad Frost in 2013, for creating interface design systems through **five stages**: **atoms** (basic elements such as a label, an input or a button), **molecules** (simple groups of elements functioning together as a unit, such as a search form), **organisms** (relatively complex components forming distinct sections, such as a header), **templates** (page-level objects that place components in a layout and show the content structure) and **pages** (templates with real representative content) {{src:frost-2013}} {{src:frost-2016}}. In Frost's words it is 'not a linear process, but rather a mental model' for seeing an interface as a whole and as parts at the same time {{src:frost-2016}}. It is not a required folder structure, and its chemistry names are optional.",
  primaryType: "methodology",
  secondaryTypes: ["framework"],
  domain: "design-systems",
  subcategory: "foundations",
  tags: ["atomic design", "components", "component hierarchy", "pattern library", "interface inventory", "React", "Figma", "Brad Frost"],
  difficulty: "beginner",
  disciplines: ["Design systems", "UI design", "Front-end engineering"],
  learningObjectives: [
    "Describe the five stages and give an example of each.",
    "Run an interface inventory to start a design system from an existing product.",
    "Decompose a real pattern into atoms, molecules and organisms, and test it with real content at the page stage.",
    "Judge where the model helps and where it misleads in modern component code: false molecules, rigid nesting, state boundaries.",
  ],
  prerequisites: ["design-system"],

  levels: {
    beginner: {
      explanation: [
        "Look at a library website's header. It has a logo, a menu and a search box. The search box itself is made of a label, a text field and a button. And the header sits on every page, above different content. An interface is built from parts inside parts.",
        "**Atomic design** names those levels. **Atoms** are the smallest useful pieces: a label, an input, a button. **Molecules** are small groups that do one job: a label, input and button become a search form. **Organisms** are larger sections: the search form, logo and menu become a header. **Templates** arrange sections into a page layout without final content. **Pages** fill a template with real content to see whether everything works.",
        "The point is not the chemistry. It is the habit of moving between the small parts and the whole page, so that parts are built to fit together and pages are built from shared parts.",
      ],
      analogy:
        "LEGO. Single bricks (atoms) snap into small assemblies like a window (molecules), which become a wall section (organisms); a building plan (template) arranges sections, and the finished model with its furniture (page) shows whether the plan works.",
      everydayExamples: [
        "The same search form appearing in a site's header and on its search page.",
        "A product card repeated in a grid on a shop's category page.",
        "A news site's article page and its live-blog page sharing one header and footer.",
      ],
      vocabulary: [
        { term: "Atom", meaning: "A basic interface element that cannot be broken down further and still work: a label, an input, a button." },
        { term: "Molecule", meaning: "A simple group of elements working as a unit, such as a search form." },
        { term: "Organism", meaning: "A larger component forming a distinct section, such as a header or a product grid." },
        { term: "Template", meaning: "A page-level layout of components that shows the content structure." },
        { term: "Page", meaning: "A template filled with real representative content, used to test the system." },
      ],
    },
    intermediate: {
      explanation: [
        "Frost's book defines each stage precisely {{src:frost-2016}}. Atoms include basic HTML elements that 'can't be broken down any further without ceasing to be functional'. Molecules are 'relatively simple groups of UI elements functioning together as a unit' and should follow the single-responsibility principle: do one thing and do it well. Organisms are 'relatively complex UI components composed of groups of molecules and/or atoms and/or other organisms', forming distinct sections — either different parts (a header) or the same molecule repeated (a product grid). Templates articulate content structure; pages test the system with real content, which often sends designers back to adjust molecules and organisms.",
        "The stages are not a sequence to complete in order. Frost stresses that atomic design is 'not a linear process' {{src:frost-2016}}: teams move constantly between abstract parts and concrete pages, and the page stage is where the system is tested against reality.",
        "The names are optional. Frost reports that GE's design team found the chemistry terms confusing for colleagues and used 'Principles', 'Basics', 'Components', 'Templates', 'Features' and 'Applications' instead, and he endorses choosing names that work for the organisation {{src:frost-2016}}.",
      ],
      howItWorks: [
        "The method starts from the existing product with an **interface inventory**: a cross-disciplinary group screenshots one instance of every unique UI pattern by category, presents the findings, and uses the collection to expose redundancy and win support for a system {{src:frost-2016}}.",
        "Patterns are then built from the smallest reusable pieces upward and tested downward with real content at the page stage; findings at the page stage change the parts.",
      ],
      implementation: [
        "Run an interface inventory before designing new components; one instance of each unique pattern is enough.",
        "Give each molecule a single responsibility; if a component does several unrelated jobs, split it.",
        "Test organisms and templates with real, varied content — long names, empty states, errors — at the page stage.",
        "Name stages in whatever words your organisation understands; keep the hierarchy, not necessarily the chemistry.",
        "Keep accessibility at the level where it is decided: labels belong to the field molecule, keyboard behaviour to the organism that owns the interaction [WCAG 2.2 SC 1.3.1 Info and Relationships, A; SC 2.1.1 Keyboard, A] {{src:w3c-wcag-22}}.",
        "Do not force every component into exactly one level; record the ambiguous ones and move on.",
      ],
      scenarios: [
        "**Illustrative.** A library app has three search boxes built by three teams. The inventory puts them side by side; the team builds one search-field molecule and uses it in the header organism and the catalogue page.",
        "**Illustrative.** A 'book card' looks right with sample titles but breaks with a 90-character title and no cover image. The page stage reveals it; the card molecule gains truncation rules and a missing-image state.",
        "**Critique protocol.** Pick a screen and decompose it. For each component, ask: what single job does it do, what is it made of, where else is it used? Components with no clear job or used only once are candidates for merging back.",
      ],
    },
    advanced: {
      explanation: [
        "**In component code**, atomic design maps onto composition, not onto folders. React and Figma both favour composable components with **slots** (children or named regions) over deep, rigid nesting. A card that accepts arbitrary children is more reusable than a 'CardWithTitleImageAndTwoButtons' organism. Over-abstraction shows up as **false molecules**: wrappers around a single atom that add a name but no responsibility, or abstractions created before a second use exists.",
        "**State boundaries** are where the chemistry metaphor is silent. A practical rule: atoms and most molecules are presentational and controlled by props; organisms often own interaction state (an autocomplete's open state and active option) and coordinate their parts; data fetching and business state usually live above the template, in pages or application code. Getting this boundary wrong makes molecules impossible to reuse.",
        "**Tokens sit beneath atoms.** Frost's 2013 description already counted colour palettes and fonts among the atoms {{src:frost-2013}}; in today's systems those decisions are primitive and semantic tokens, consumed by atoms, so a theme can change every level without touching the component tree.",
        "**Accessible composition.** Complex organisms such as comboboxes, menus and data grids need the keyboard and ARIA patterns that define them; the ARIA Authoring Practices describe such patterns as informative guidance {{src:w3c-aria-apg}}. Splitting an organism into molecules must not split the roles and states that only make sense together.",
      ],
      evidence: [
        "Atomic design is a **practitioner methodology** described in Frost's blog post and book {{src:frost-2013}} {{src:frost-2016}}, widely adopted and adapted in industry. No controlled study was found comparing it with other ways of structuring component libraries; claims about its benefits for consistency and speed are practitioner reports. Frost himself presents it as a mental model rather than a rigid process.",
      ],
      debates: [
        "**Is a card a molecule or an organism?** Classification arguments are common and rarely matter; Frost's own advice is to adapt the taxonomy to the organisation {{src:frost-2016}}.",
        "**Five levels or fewer?** Many teams collapse the levels to primitives, components and patterns, finding the middle levels hard to tell apart.",
        "**Bottom-up risk.** Building atoms first can produce a library of parts that do not combine well; the page stage and work on real screens are the counterweight.",
      ],
      alternativeModels: [
        "**Primitives, components, patterns**: a three-level model used by many systems, trading the metaphor for plainer terms.",
        "**Feature-first organisation**: grouping code by product feature rather than by component level, with a shared library only for genuinely reused parts.",
      ],
    },
  },

  origin: {
    contributors: ["Brad Frost"],
    period: "2013 (blog post); 2016 (book)",
    problem:
      "Web teams designed and built page by page, producing many near-duplicate patterns and no shared system as responsive design multiplied the layouts each component had to support.",
    narrative: [
      "On 10 June 2013 Frost published 'Atomic Design', arguing that teams were 'designing systems of components', not pages, and introducing the five levels {{src:frost-2013}}.",
      "His 2016 book expanded the methodology, its workflow and the interface inventory, and is freely readable online {{src:frost-2016}}.",
    ],
  },

  method: {
    procedure: [
      "Gather representatives of every discipline involved in the product (design, front-end and back-end development, content, product management).",
      "Agree a screenshot tool and UI categories (global elements, navigation, forms, buttons, images, media and so on), and assign categories to participants.",
      "Screenshot one instance of each unique pattern within a fixed time box.",
      "Present each category to the group; discuss rationale, inconsistencies and naming.",
      "Combine the results into one inventory document and agree next steps with stakeholders.",
      "Build the system: atoms, molecules and organisms from the inventory; templates for key layouts; pages with real content to test and refine the parts.",
    ],
    participants: "A cross-disciplinary product team; Frost stresses that all disciplines responsible for the product should take part.",
    duration: "Frost finds 30–90 minutes enough for a first screenshot pass of the interface inventory; building and maintaining the system is ongoing.",
    inputs: ["The existing live product or prototypes", "A shared screenshot tool or template", "A list of UI categories"],
    outputs: ["An interface inventory of unique patterns", "Agreed names for patterns", "A pattern library structured by level", "Templates and representative pages used for testing"],
    purpose: "both",
    data: "qualitative",
  },

  application: {
    summary: [
      "Atomic design helps teams start a design system from an existing product (through the inventory), decompose interfaces into reusable parts, and keep testing those parts against real pages.",
    ],
    web: [
      "Structure the component library by responsibility and composition; use the page stage to test components with real content.",
    ],
    mobile: [
      "The same decomposition applies to native component libraries; platform controls often serve as atoms.",
    ],
    enterprise: [
      "Inventories across several products reveal duplicate components and build the case for a shared system.",
    ],
    services: [
      "The parts-and-whole habit applies to service artefacts too: forms, letters and screens assembled from shared content blocks.",
    ],
    steps: [
      "Run an interface inventory with the whole team.",
      "Group duplicates and agree names for each unique pattern.",
      "Build shared atoms and molecules with single responsibilities.",
      "Compose organisms and templates; prefer slots over rigid nesting.",
      "Test with real, varied content at the page stage and adjust the parts.",
      "Adapt the stage names to your organisation and record ambiguous cases.",
    ],
  },

  whenToUse: [
    "Starting a design system from an existing product with inconsistent patterns.",
    "Teaching teams to think in reusable parts and whole pages at once.",
  ],
  whenNotToUse: [
    "As a mandatory folder structure or a classification exam: use composition and responsibility to organise code, and plainer level names if the metaphor confuses.",
    "To abstract components before there is a second use: wait for real reuse rather than creating speculative molecules.",
  ],
  advantages: [
    "Gives teams a shared vocabulary for levels of components.",
    "The interface inventory makes inconsistency visible and builds support for a system.",
    "The page stage keeps the system tested against real content.",
  ],
  limitations: [
    "Level boundaries (molecule or organism?) are often ambiguous.",
    "It says little about state management, data and behaviour boundaries in code.",
    "Bottom-up building can produce parts that do not combine well without page-level testing.",
    "Its benefits are practitioner reports, not measured in controlled studies.",
  ],
  misconceptions: [
    {
      myth: "Atomic design is a linear process: build all atoms, then molecules, then organisms.",
      reality: "Frost describes it as 'not a linear process, but rather a mental model', with constant movement between parts and pages {{src:frost-2016}}.",
    },
    {
      myth: "You must use the chemistry names.",
      reality: "Frost endorses adapting the taxonomy; GE's team used Principles, Basics, Components, Templates, Features and Applications {{src:frost-2016}}.",
    },
    {
      myth: "Templates and pages are the same thing.",
      reality: "Templates show content structure with placeholder content; pages put real representative content in to test the system {{src:frost-2016}}.",
    },
  ],

  relations: [
    { target: "design-system", type: "applied-in", note: "Atomic design is one way to structure the components of a design system." },
    { target: "component-architecture", type: "related-to", note: "Composition, slots and state boundaries are where atomic design meets component code." },
    { target: "component-libraries", type: "applied-in", note: "Pattern libraries are often organised by atomic levels." },
    { target: "primitive-tokens", type: "related-to", note: "Palettes and fonts that Frost counted among atoms are today's primitive tokens." },
    { target: "semantic-tokens", type: "related-to", note: "Atoms consume semantic tokens, so themes change every level without code changes." },
    { target: "theme-architecture", type: "related-to", note: "Because atoms consume tokens, a theme re-skins the whole hierarchy." },
    { target: "design-language", type: "complementary-to", note: "The language supplies the decisions; atomic design organises the parts that express them." },
  ],

  practice: {
    dos: [
      { text: "Start with an interface inventory: one screenshot of every unique pattern, by category, with the whole team.", why: "Seeing near-duplicates side by side exposes redundancy and builds support for a system {{src:frost-2016}}.", kind: "industry" },
      { text: "Give each molecule one responsibility and compose larger components through slots (children) rather than fixed nesting.", why: "Single-responsibility parts are easier to test and reuse {{src:frost-2016}}; slots let organisms adapt without new variants.", kind: "industry" },
      { text: "Test organisms and templates at the page stage with real, varied content.", why: "Pages show whether the parts hold up with real content and send changes back to the parts {{src:frost-2016}}.", kind: "industry" },
    ],
    donts: [
      { text: "Don't create false molecules: wrappers around a single atom that add a name but no responsibility.", why: "They add layers to maintain and hide the real component.", kind: "team" },
      { text: "Don't treat the levels as a strict sequence or a classification exam.", why: "Frost describes a mental model, not a linear process; arguing about levels delays useful work {{src:frost-2016}}.", kind: "industry" },
      { text: "Don't split an accessible interaction across components that cannot share its roles and states.", why: "Patterns such as a combobox need their input, list and options to work together [WCAG 2.2 SC 4.1.2 Name, Role, Value, A] {{src:w3c-wcag-22}} {{src:w3c-aria-apg}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "Search autocomplete decomposed into atoms, molecules and an organism",
        language: "text",
        code: `Level      Part                     Responsibility                                State owned
---------  -----------------------  --------------------------------------------  ------------------------------
Atoms      Label                    names the field                               none
           TextInput                accepts text                                  none (controlled by props)
           IconButton (clear)       one action, accessible name "Clear search"    none
           Option                   one suggestion row                            none (selected via props)
Molecules  SearchField              Label + TextInput + IconButton                none (value via props)
           SuggestionList           listbox of Options                            none (active index via props)
Organism   SearchAutocomplete       field + list + status message; combobox       query, open/closed, active
                                    keyboard model (arrows, Enter, Escape)        option, results
Template   Catalogue header         logo + nav + SearchAutocomplete               layout only
Page       Catalogue (real data)    tests long titles, no results, slow network   data fetching lives here`,
        caption: "Illustrative. The organism owns interaction state and the combobox pattern as a whole; atoms and molecules stay presentational; data fetching lives at the page.",
      },
      {
        title: "Composition with slots instead of rigid nesting",
        language: "ts",
        code: `// Molecule: presentational, one job, controlled by props.
function SearchField({ id, label, value, onChange, onClear, inputProps }: SearchFieldProps) {
  return (
    <div className="search-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} {...inputProps} />
      {value && <button type="button" aria-label="Clear search" onClick={onClear}>×</button>}
    </div>
  );
}

// Organism: owns interaction state and the combobox roles; rows come in through a slot.
function SearchAutocomplete({ results, renderOption }: { results: Book[]; renderOption: (b: Book) => React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const open = query.length > 0 && results.length > 0;
  return (
    <div>
      <SearchField id="q" label="Search the catalogue" value={query} onChange={setQuery} onClear={() => setQuery("")}
        inputProps={{ role: "combobox", "aria-expanded": open, "aria-controls": "q-list",
          "aria-activedescendant": active >= 0 ? \`q-opt-\${active}\` : undefined }} />
      {open && (
        <ul id="q-list" role="listbox">
          {results.map((b, i) => (
            <li key={b.id} id={\`q-opt-\${i}\`} role="option" aria-selected={i === active}>{renderOption(b)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
        caption:
          "Illustrative and shortened (keyboard handling omitted). The organism keeps the combobox roles together; `renderOption` is a slot, so the same organism serves book, author and event searches without new variants {{src:w3c-aria-apg}}.",
      },
    ],
  },

  exercises: [
    {
      id: "atomic-design-ex-decompose",
      kind: "assignment",
      level: "beginner",
      title: "Decompose a screen",
      prompt: [
        "Take a screenshot of one page from a site you use. Mark the atoms, molecules, organisms and the template. Note one place where you were unsure of the level.",
      ],
      deliverable: "An annotated screenshot and a sentence on the ambiguous case.",
      criteria: ["All five levels identified", "Each molecule has one job", "Ambiguity recorded rather than forced"],
    },
    {
      id: "atomic-design-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Untangle an over-abstracted search",
      prompt: [
        "Illustrative case. A library's design system has 'SearchInputAtom', 'SearchInputWrapperMolecule' (which only wraps the atom), 'HeaderSearchOrganism' and 'CatalogueSearchOrganism' (two near-identical copies, each fetching data and managing its own dropdown). Screen-reader users report that suggestions are not announced in one of them.",
        "Work through the correction sequence.",
      ],
      deliverable: "A corrected component structure with responsibilities, state ownership and accessibility notes.",
      criteria: ["False molecule removed", "Duplicate organisms merged via slots", "State boundaries placed deliberately", "Combobox kept whole"],
      exampleSolution: [
        "1. Symptom: two search organisms behave differently; one is inaccessible.",
        "2. Impact: inconsistent behaviour for everyone and missing announcements for screen-reader users.",
        "3. Cause: a false molecule adds a layer with no responsibility; duplicate organisms each re-implement state and ARIA; data fetching is mixed into the organisms.",
        "4. Principles: single responsibility for molecules {{src:frost-2016}}; combobox roles and states kept together [WCAG 2.2 SC 4.1.2, A].",
        "5. Correction: delete the wrapper; one SearchField molecule; one SearchAutocomplete organism with a renderOption slot; data fetching moves to the page; the organism owns query, open state and active option.",
        "6. Validation: keyboard and screen-reader test of both placements; check both pages use the same organism.",
        "7. Trade-off: the shared organism needs a slightly richer API (slots, labels as props), which must be documented.",
      ],
    },
    {
      id: "atomic-design-ex-inventory",
      kind: "reflection",
      level: "advanced",
      title: "Plan an interface inventory and its follow-up",
      prompt: [
        "Plan an interface inventory for a product with three teams: participants, categories, time box, outputs, and how you will turn the findings into a prioritised component roadmap with state boundaries and naming decided.",
      ],
      deliverable: "A one-page plan with an agenda and a template for the inventory document.",
      criteria: ["Cross-disciplinary participants", "Time-boxed screenshot pass", "Clear outputs and next steps", "Naming adapted to the organisation"],
    },
  ],

  quiz: [
    {
      id: "atomic-design-q-stages",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A label, a text input and a button combined into a search form are…",
      options: [
        { text: "A molecule", correct: true, explanation: "A simple group of elements functioning together as a unit." },
        { text: "An atom", correct: false, explanation: "Each of the three parts is an atom; together they are more." },
        { text: "An organism", correct: false, explanation: "An organism is a larger section, such as a header that contains the search form." },
        { text: "A template", correct: false, explanation: "Templates are page-level layouts." },
      ],
      explanation: "Atoms → molecules → organisms → templates → pages.",
    },
    {
      id: "atomic-design-q-page",
      kind: "scenario",
      level: "intermediate",
      prompt: "A book card looks perfect with sample data but breaks with a 90-character title. Which stage is designed to reveal this?",
      options: [
        { text: "Pages: templates filled with real representative content", correct: true, explanation: "The page stage tests whether the parts hold up with real content." },
        { text: "Atoms", correct: false, explanation: "Atoms are tested in isolation, without real content in context." },
        { text: "Templates", correct: false, explanation: "Templates show structure with placeholder content." },
        { text: "None; content is not atomic design's concern", correct: false, explanation: "Frost stresses content and design together." },
      ],
      explanation: "Pages test the system with reality and feed changes back.",
    },
    {
      id: "atomic-design-q-state",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "In a search autocomplete built with React, where should the open state and active option usually live?",
      options: [
        { text: "In the organism that owns the combobox interaction, with atoms and molecules controlled by props", correct: true, explanation: "The organism coordinates its parts and keeps the accessible pattern whole." },
        { text: "In each atom separately", correct: false, explanation: "Distributed state makes the parts impossible to coordinate." },
        { text: "In a global store for every component", correct: false, explanation: "Global state for local interaction couples unrelated parts." },
        { text: "In the template", correct: false, explanation: "Templates are layouts and should not own interaction state." },
      ],
      explanation: "Presentational atoms and molecules; stateful organisms; data at the page.",
    },
  ],

  flashcards: [
    { id: "atomic-design-fc-stages", front: "The five stages of atomic design", back: "Atoms · molecules · organisms · templates · pages." },
    { id: "atomic-design-fc-model", front: "Is atomic design a linear process?", back: "No — Frost calls it a mental model for seeing the whole and the parts at the same time." },
    { id: "atomic-design-fc-inventory", front: "Interface inventory", back: "A cross-disciplinary, time-boxed screenshot collection of every unique UI pattern, by category; the starting point for a system." },
    { id: "atomic-design-fc-false", front: "False molecule", back: "A wrapper around one atom that adds a name but no responsibility." },
  ],

  references: [
    { source: "frost-2013", role: "primary", note: "Original statement of the five levels." },
    { source: "frost-2016", role: "primary", note: "Chapters 2 and 4: methodology and interface inventory." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.3.1, 2.1.1, 4.1.2 (A)." },
    { source: "w3c-aria-apg", role: "explanatory", note: "Combobox and other composite patterns (informative guidance)." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Atomic design is a practitioner methodology described by its author in a blog post and a freely available book; its benefits are reported from practice, not measured in controlled studies. Accessibility requirements cited are WCAG 2.2 success criteria; the ARIA Authoring Practices are informative.",

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
  lastVerifiedAt: "2026-11-11",
});
