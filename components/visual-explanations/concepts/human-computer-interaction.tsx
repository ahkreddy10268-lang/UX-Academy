/**
 * Human-computer interaction — Level-2 figures. Every label restates
 * content/knowledge/foundations/human-computer-interaction.ts. Two kinds of
 * claim are kept apart on purpose: dated events and publications (sourced) and
 * interpretive framings such as waves and paradigms (the cited authors' readings,
 * not findings). Built from HTML/CSS text so everything reflows and is read in order.
 */
import { ProcessCycle } from "../diagrams/process-cycle";
import { DiagramNode, FlowArrow, IllustrativeBadge, Marker, Tag } from "../primitives";

/* ------------------------------------------------------------------ */
/* 1 · Person, task, technology, context                                */
/* ------------------------------------------------------------------ */

const ELEMENTS = [
  { name: "Person", asks: "Abilities, expectations, knowledge, limits, goals", note: "Perception, memory, attention, motor control, culture, age and ability vary between people." },
  { name: "Task", asks: "What they are trying to get done, how often, how critical", note: "The same action means different things inside different tasks." },
  { name: "Technology", asks: "What the system can sense, show and do", note: "Input and output devices, interface structure, system behaviour and feedback." },
  { name: "Context", asks: "Where, when, with whom, under what pressure", note: "Setting, interruptions, other people, organisation and culture." },
] as const;

export function HciInteractionModel() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 @2xl:grid-cols-2">
        {ELEMENTS.map((e, i) => (
          <DiagramNode key={e.name} title={<span className="flex items-center gap-2"><Marker n={i + 1} tone="c" />{e.name}</span>} tone={i % 3 === 0 ? "wash" : "surface"}>
            <p className="font-medium text-ink">{e.asks}</p>
            <p className="mt-1">{e.note}</p>
          </DiagramNode>
        ))}
      </div>
      <div className="grid items-center gap-2 @2xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
        <DiagramNode title="Interaction" tone="accent">
          Actions by the person, responses and feedback from the system, as they try to do the task in the setting.
        </DiagramNode>
        <FlowArrow fixed="right" />
        <DiagramNode title="Outcomes" tone="soft">
          Task success, effort and errors; what people understand, feel and remember; effects on others.
        </DiagramNode>
        <FlowArrow fixed="right" />
        <DiagramNode title="Evaluation" tone="soft">
          Measuring or observing the outcomes, then changing the design, the technology or our understanding of the people.
        </DiagramNode>
      </div>
      <div className="rounded-lg border border-rule bg-soft p-4">
        <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink">
          Change one element and the others shift <IllustrativeBadge />
        </p>
        <dl className="mt-2 grid gap-x-6 gap-y-2 text-sm @2xl:grid-cols-3">
          <div>
            <dt className="font-semibold text-ink">Context: desk → moving train</dt>
            <dd className="text-ink-2">What the person can look at and reach changes, so legibility and target size matter more.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Person: first-time → daily user</dt>
            <dd className="text-ink-2">Needs move from discoverability toward speed; the same screen can fail either group.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Technology: touch → voice</dt>
            <dd className="text-ink-2">Feedback and error recovery work differently, and the context decides whether voice is acceptable at all.</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-ink-3">The elements influence one another and are open to interpretation, so this is a way of asking questions, not a linear chain of cause and effect.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · Interdisciplinary ecosystem                                      */
/* ------------------------------------------------------------------ */

const DISCIPLINES = [
  { name: "Computer science", gives: "Interactive systems, architectures and what is computationally possible" },
  { name: "Cognitive psychology", gives: "Models of memory, perception, attention, learning and decision-making" },
  { name: "Human factors and ergonomics", gives: "Human capabilities, limits, safety and workload" },
  { name: "Interaction design", gives: "Shaping behaviour, feedback and system responses" },
  { name: "Social science", gives: "Social context, collaboration, culture and organisational behaviour" },
  { name: "Anthropology and ethnography", gives: "Ways of understanding people in their own settings" },
  { name: "Design", gives: "Form, experience, meaning and communication" },
  { name: "Artificial intelligence", gives: "Adaptive, intelligent and agent-based interaction" },
  { name: "Information science", gives: "How information is organised, found and used" },
] as const;

export function HciEcosystem() {
  return (
    <div className="space-y-4">
      <DiagramNode title="Human-computer interaction" tone="accent">
        Designs, evaluates and implements interactive systems for people, and studies the phenomena around them.
      </DiagramNode>
      <ul className="grid gap-2 @xl:grid-cols-2 @4xl:grid-cols-3">
        {DISCIPLINES.map((d) => (
          <li key={d.name}>
            <DiagramNode title={d.name} tone="surface" className="h-full">
              <span className="text-ink-2">Contributes: {d.gives}</span>
            </DiagramNode>
          </li>
        ))}
      </ul>
      <div className="rounded-lg border border-rule bg-soft p-4 text-sm">
        <p className="font-semibold text-ink">Where the assumptions differ</p>
        <ul className="mt-2 grid gap-1.5 text-ink-2 @2xl:grid-cols-3">
          <li><Tag>Isolate or situate</Tag> A psychologist may isolate one variable in a laboratory; an ethnographer may argue that doing so removes what matters.</li>
          <li><Tag>Predict or understand</Tag> Cognitive models predict performance; situated accounts explain what happened in a setting.</li>
          <li><Tag>Build or study</Tag> Computer science and design make things; social science often studies what making them does.</li>
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Timeline                                                         */
/* ------------------------------------------------------------------ */

type Kind = "System" | "Research" | "Framing";
type Item = { when: string; what: string; who?: string; why: string; cite: string; kind: Kind };
type Era = { label: string; items: Item[] };

const ERAS: Era[] = [
  {
    label: "Vision and early systems",
    items: [
      { when: "1945", what: "Memex idea", who: "Vannevar Bush", why: "Cited as the origin of hypertext.", cite: "Myers 1998", kind: "Research" },
      { when: "1960", what: "Man-computer symbiosis", who: "J. C. R. Licklider", why: "Imagined a close, cooperative partnership between people and computers.", cite: "Licklider 1960", kind: "Research" },
      { when: "1962", what: "Augmenting human intellect framework", who: "Douglas Engelbart, SRI", why: "A programme for using computers to augment human capability.", cite: "Engelbart 1962", kind: "Research" },
      { when: "1963", what: "Sketchpad", who: "Ivan Sutherland, MIT", why: "The first demonstration of direct manipulation, with a light pen.", cite: "Myers 1998", kind: "System" },
      { when: "1965", what: "The mouse", who: "Engelbart, SRI (part of NLS)", why: "A pointing device for the NLS system.", cite: "Myers 1998", kind: "System" },
      { when: "1968", what: "NLS demonstration", who: "Engelbart and English", why: "Showed mouse use, tiled windows, linking and remote multi-user participation.", cite: "Myers 1998; Engelbart and English 1968", kind: "System" },
    ],
  },
  {
    label: "Interactive computing for everyone; HCI takes shape",
    items: [
      { when: "1974–81", what: "Overlapping windows, WYSIWYG editing, the Xerox Star", who: "Xerox PARC", why: "Windows and a WYSIWYG editor appear in 1974; the Star (1981) combined mouse, icons and a large widget set.", cite: "Myers 1998", kind: "System" },
      { when: "1982–83", what: "Direct manipulation named and described", who: "Ben Shneiderman", why: "Described interfaces where people act on visible objects with immediate feedback.", cite: "Myers 1998; Shneiderman 1983", kind: "Research" },
      { when: "Early 1980s", what: "HCI emerges as a field", who: "Converging fields", why: "Personal computing, cognitive science, human factors, software engineering, graphics and information retrieval converge.", cite: "Carroll, Brief Intro", kind: "Framing" },
      { when: "1983", what: "The Psychology of Human-Computer Interaction", who: "Card, Moran and Newell", why: "Cognitive modelling of interaction: Model Human Processor and GOMS. One institution's account says it established the field's name.", cite: "Card et al. 1983; CMU HCII", kind: "Research" },
      { when: "1984", what: "Apple Macintosh", who: "Apple", why: "Promoted its interface toolkit to developers more actively than earlier systems.", cite: "Myers 1998", kind: "System" },
      { when: "1986", what: "User Centered System Design", who: "Norman and Draper (eds)", why: "Brought user-centred system design into the discussion.", cite: "Norman and Draper 1986", kind: "Research" },
    ],
  },
  {
    label: "Networks, situation and ubiquity",
    items: [
      { when: "1987", what: "Plans and Situated Actions", who: "Lucy Suchman", why: "Argued that action is shaped by its circumstances and that plans are resources.", cite: "Suchman 1987", kind: "Research" },
      { when: "1990", what: "World Wide Web", who: "Tim Berners-Lee, CERN", why: "Created at CERN; hypertext becomes a global system.", cite: "Myers 1998", kind: "System" },
      { when: "1991", what: "The Computer for the 21st Century", who: "Mark Weiser", why: "Set an agenda for computing that recedes into everyday settings.", cite: "Weiser 1991", kind: "Research" },
      { when: "1992", what: "Gesture recognition reaches wide notice", who: "Apple Newton", why: "Pen and gesture input become widely visible.", cite: "Myers 1998", kind: "System" },
      { when: "1994", what: "HCI Institute founded at Carnegie Mellon", who: "CMU", why: "Described by CMU as the first academic unit dedicated to HCI; one institution's account.", cite: "CMU HCII", kind: "System" },
      { when: "1995", what: "Cognition in the Wild", who: "Edwin Hutchins", why: "Treated cognition as distributed across people, tools and procedures.", cite: "Hutchins 1995", kind: "Research" },
      { when: "1997", what: "Tangible interfaces", who: "Hiroshi Ishii and Brygg Ullmer", why: "Gave digital information physical, graspable form.", cite: "Ishii and Ullmer 1997", kind: "Research" },
    ],
  },
  {
    label: "Framings and new kinds of interaction",
    items: [
      { when: "2001", what: "Where the Action Is", who: "Paul Dourish", why: "Developed embodied interaction as a foundation for design.", cite: "Dourish 2001", kind: "Research" },
      { when: "2005", what: "Three faces of HCI", who: "Jonathan Grudin", why: "Traced three research foci: computer operation, information systems management, discretionary use.", cite: "Grudin 2005", kind: "Framing" },
      { when: "2006", what: "Second and third wave HCI", who: "Susanne Bødker", why: "Second wave: groups and work settings. Third wave: broader contexts, experience, participation.", cite: "Bødker 2006", kind: "Framing" },
      { when: "2011", what: "Third-paradigm HCI", who: "Harrison, Sengers and Tatar", why: "Described a third paradigm cutting across HCI topic areas.", cite: "Harrison et al. 2011", kind: "Framing" },
      { when: "2019", what: "Guidelines for human-AI interaction", who: "Amershi and colleagues", why: "Design guidelines for AI-infused systems, synthesised from research and practice.", cite: "Amershi et al. 2019", kind: "Research" },
    ],
  },
];

export function HciTimeline() {
  return (
    <div className="space-y-5">
      <p className="flex flex-wrap items-center gap-2 text-sm text-ink-2">
        <Tag>System</Tag> a built system or product <Tag tone="c">Research</Tag> a publication or programme <Tag tone="accent">Framing</Tag> an interpretation of the field, not a finding
      </p>
      <ol className="space-y-5">
        {ERAS.map((era) => (
          <li key={era.label}>
            <p className="t-sub text-sm text-ink">{era.label}</p>
            <ul className="mt-2 space-y-2 border-l border-rule-strong pl-4">
              {era.items.map((it) => (
                <li key={it.when + it.what} className="grid gap-x-4 gap-y-0.5 text-sm @2xl:grid-cols-[6.5rem_minmax(0,1fr)]">
                  <span className="formula tabular font-semibold text-c-ink">{it.when}</span>
                  <span className="min-w-0">
                    <span className="font-semibold text-ink">{it.what}</span>
                    {it.who && <span className="text-ink-2"> · {it.who}</span>} <Tag tone={it.kind === "Research" ? "c" : it.kind === "Framing" ? "accent" : "neutral"}>{it.kind}</Tag>
                    <span className="block text-ink-2">{it.why}</span>
                    <span className="block text-xs text-ink-3">Source: {it.cite}</span>
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="rounded-lg border border-rule bg-soft p-3 text-sm text-ink-2">
        <span className="font-semibold text-ink">Read this as a selection, not a sequence of replacements.</span> Dates are those the cited sources give; periods overlap, earlier approaches stay in use, and accounts of the field differ. HCI has no single founder or agreed start date.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · Interaction paradigms                                            */
/* ------------------------------------------------------------------ */

const PARADIGMS = [
  { name: "Command-based", relation: "The person recalls and types commands; the system executes them.", enables: "Precise, scriptable control for people who know the vocabulary.", limits: "Relies on recall and exact syntax; little to see or explore.", cite: "Shneiderman 1983" },
  { name: "Graphical interface", relation: "The person chooses among windows, icons and menus shown on screen.", enables: "Options are visible, so people can recognise instead of recall.", limits: "Screen space and navigation depth limit how much can be shown.", cite: "Myers 1998" },
  { name: "Direct manipulation", relation: "The person acts on visible objects and sees the effect at once.", enables: "Immediate feedback and a sense of acting on the thing itself.", limits: "Awkward for abstract or very large sets of operations.", cite: "Shneiderman 1983; Hutchins et al. 1985" },
  { name: "Touch and mobile", relation: "The person touches the display and uses gestures, often on the move.", enables: "Direct contact, and use in many settings including while moving.", limits: "Fingers and small screens add motor and attention constraints; context varies widely.", cite: "Carroll, Brief Intro; Myers 1998" },
  { name: "Ubiquitous and tangible", relation: "Technology sits in the surroundings or takes physical, graspable form.", enables: "Interaction fits into everyday settings and physical activity.", limits: "Fewer shared conventions; behaviour depends heavily on the setting, so it is harder to study in a laboratory.", cite: "Weiser 1991; Ishii and Ullmer 1997" },
  { name: "Conversational and AI-based", relation: "The person talks or types to a system whose behaviour adapts and may vary.", enables: "Flexible requests and systems that adapt to the person.", limits: "Behaviour is not always predictable, which raises questions of control, transparency and trust.", cite: "Amershi et al. 2019; Shneiderman 2020" },
] as const;

export function HciParadigms() {
  return (
    <div className="space-y-4">
      <ul className="grid gap-3 @2xl:grid-cols-2 @5xl:grid-cols-3">
        {PARADIGMS.map((p) => (
          <li key={p.name}>
            <DiagramNode title={p.name} tone="surface" className="h-full">
              <dl className="space-y-1.5 text-sm">
                <div>
                  <dt className="label">User and system</dt>
                  <dd>{p.relation}</dd>
                </div>
                <div>
                  <dt className="label">Enables</dt>
                  <dd>{p.enables}</dd>
                </div>
                <div>
                  <dt className="label">Limits</dt>
                  <dd>{p.limits}</dd>
                </div>
              </dl>
              <p className="mt-2 text-xs text-ink-3">Source: {p.cite}</p>
            </DiagramNode>
          </li>
        ))}
      </ul>
      <p className="rounded-lg border border-rule bg-soft p-3 text-sm text-ink-2">
        <span className="font-semibold text-ink">These coexist; none simply replaced the one before.</span> A terminal command, a drag, a tap and a spoken request are each still the best fit for some person, task and context. The sources describe each paradigm; the limits listed are widely discussed trade-offs, not measured findings.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · Research and design cycle                                        */
/* ------------------------------------------------------------------ */

export function HciCycle() {
  return (
    <ProcessCycle
      entry="Describe the people, tasks, technology and context of use."
      activities={[
        { name: "Understand people and context", methods: ["Field studies", "Contextual inquiry", "Interviews", "Prior research"], output: "A description of people, tasks and setting, with the questions to answer" },
        { name: "Define the problem and requirements", methods: ["Task analysis", "Scenarios", "Measurable goals"], output: "Requirements stated so they can be tested" },
        { name: "Design, prototype and implement", methods: ["Sketches", "Prototypes", "Working software"], output: "An interaction concept the people can try" },
        { name: "Evaluate with people", methods: ["Usability tests", "Controlled experiments", "Field trials", "Predictive models"], output: "Evidence of what works, for whom and in which setting" },
      ]}
      hub={{ title: "Throughout", points: ["Theory and prior evidence", "Methods chosen for the question", "Ethics and who is affected"] }}
      decision={{ question: "Does the evidence support the design for these people and this context?", yes: "Release, then keep observing use.", no: "Iterate: return to whichever activity needs work, often back to understanding the people or the setting." }}
      footer={
        <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink-2">
          <span className="font-semibold text-ink">A frame, not a fixed order.</span> Gould and Lewis stressed early focus on users, empirical measurement and iteration. ISO 9241-210 gives a human-centred design process; it organises design activity and does not define HCI as a whole.
        </p>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Perspectives and their units of analysis                         */
/* ------------------------------------------------------------------ */

const PERSPECTIVES = [
  { name: "Human factors and ergonomics", unit: "The person and equipment, fitted to human capabilities and limits", question: "What can people safely and reliably do with this?", cannot: "What the work and the setting mean to the people in them" },
  { name: "Cognitive modelling", unit: "The individual user as an information processor", question: "How long will an expert take, and where will errors occur?", cannot: "Whether a team will adopt it, or what it means to people" },
  { name: "User-centred design", unit: "People's goals, tasks and understanding within a design process", question: "What do these users need, and does the design meet it?", cannot: "A general account of how groups coordinate work" },
  { name: "Work and participation", unit: "Groups and the settings where they work", question: "How does the technology fit what people actually do together?", cannot: "A general performance number for a task" },
  { name: "Distributed and situated accounts", unit: "People with others, tools and procedures in a setting", question: "How is the work achieved across people and artefacts?", cannot: "Predicted times for a routine task, or statistical generalisation" },
  { name: "Experience and meaning", unit: "Broader use contexts and experience over time", question: "What does it mean to people, and how does that change with use?", cannot: "Which of two layouts is quicker to operate" },
] as const;

export function HciPerspectives() {
  return (
    <div className="space-y-4">
      <ul className="grid gap-3 @2xl:grid-cols-2 @5xl:grid-cols-3">
        {PERSPECTIVES.map((l) => (
          <li key={l.name}>
            <DiagramNode title={l.name} tone="surface" className="h-full">
              <dl className="space-y-1.5 text-sm">
                <div>
                  <dt className="label">Unit of analysis</dt>
                  <dd>{l.unit}</dd>
                </div>
                <div>
                  <dt className="label">Typical question</dt>
                  <dd>{l.question}</dd>
                </div>
                <div>
                  <dt className="label">Cannot show</dt>
                  <dd>{l.cannot}</dd>
                </div>
              </dl>
            </DiagramNode>
          </li>
        ))}
      </ul>
      <p className="rounded-lg border border-rule bg-soft p-3 text-sm text-ink-2">
        <span className="font-semibold text-ink">Lenses, not rankings.</span> They differ in what they treat as the thing to explain, they overlap, and one project often uses several. The groupings are interpretive framings from the cited authors, not validated stages.
      </p>
    </div>
  );
}
