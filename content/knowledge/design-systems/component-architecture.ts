import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "component-architecture",
  slug: "component-architecture",
  title: "Component Architecture",
  alternateNames: ["Component composition", "Compound components", "Component anatomy", "Presentational and container components"],
  summary:
    "How a component is divided into parts and responsibilities — presentation, behaviour, data and layout — and how those parts are composed through children, slots and shared context instead of ever-growing prop lists.",
  definition:
    "Component architecture is the **internal structure and composition model of components**: which responsibilities a component holds (appearance, behaviour, accessibility, data), how it is split into **named parts** (a dialog's trigger, overlay, title and content), and how consumers assemble those parts — by passing **children**, filling **slots**, or using **compound components** that share state through context. Good architecture keeps each component focused, lets composition replace configuration, and avoids passing data through layers that do not use it (**prop drilling**).",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "components",
  tags: ["component architecture", "compound components", "composition", "slots", "children", "context", "prop drilling", "separation of concerns", "asChild"],
  difficulty: "intermediate",
  disciplines: ["Design systems", "Front-end engineering", "Interaction design"],
  learningObjectives: [
    "Separate presentation, behaviour, accessibility and data responsibilities in a component.",
    "Choose between props, children, slots and compound components for composition.",
    "Recognise prop drilling and prop sprawl, and refactor them.",
    "Keep accessible relationships (labels, descriptions, controls) intact across composed parts.",
  ],
  prerequisites: ["component-libraries", "atomic-design"],

  levels: {
    beginner: {
      explanation: [
        "A library app's 'Book card' component started simple. Then it gained a prop for an optional badge, another for a second button, another for showing the cover on the left or right, and one for loading the book's availability from the server. It now has 23 props, nobody knows which combinations work, and it cannot be used without a network connection.",
        "**Component architecture** is about deciding what each component is responsible for and how it is put together. A card can be made of smaller parts — a cover, a title, a set of actions — that teams arrange as they need, instead of one large component that tries to handle every case through settings.",
        "Well-structured components are easier to reuse, test and change, because each part does one job.",
      ],
      analogy:
        "A wall socket and plug: the socket defines a standard opening (a slot) and the appliance supplies what goes in it. The socket does not need a setting for every possible appliance.",
      everydayExamples: [
        "A dialog with a title, content and buttons that you fill in yourself.",
        "A card that accepts any content in its body.",
        "Tabs where you write each tab and its panel, and the component keeps them connected.",
      ],
      vocabulary: [
        { term: "Composition", meaning: "Building a component by putting smaller components together." },
        { term: "Children", meaning: "Content placed inside a component, which it displays." },
        { term: "Slot", meaning: "A named place in a component that the user fills, such as 'actions' or 'icon'." },
        { term: "Compound component", meaning: "A group of parts (Tabs, Tab, TabPanel) that share state and must be used together." },
        { term: "Prop drilling", meaning: "Passing data through layers of components that do not use it." },
      ],
    },
    intermediate: {
      explanation: [
        "**Separate concerns.** Primer's React library keeps components presentational and leaves fetching and submitting data to wrappers in each product {{src:primer-react-philosophy}}. The same split — a presentational component that renders props, and a product-level 'container' that fetches data and handles business rules — keeps shared components portable and testable.",
        "**Compose instead of configure.** React's documentation shows that content nested inside a component arrives as its `children` {{src:react-passing-props}}, and recommends extracting components and passing JSX as children before reaching for context, when data is passed through layers that only forward it — that is, prop drilling {{src:react-context}}. A card that renders `children` does not need a prop for every possible body.",
        "**Named parts.** Headless libraries expose components as parts: Radix gives access to each part so you can wrap them and add listeners, props or refs {{src:radix-primitives}}; React Aria breaks each component into parts with built-in states, render props and slots {{src:react-aria}}. The Open UI Community Group researches how design systems name components and their parts {{src:open-ui}}, which is useful when naming your own anatomy.",
        "**Compound components.** Tabs, menus and accordions are compound: the parts share state (which tab is selected) through context so consumers can arrange them freely. React suggests context for data many components need, such as a theme {{src:react-context}}; inside a compound component it carries the shared state and generated ids.",
      ],
      howItWorks: [
        "Composition moves variation to the consumer's markup: new layouts need new arrangements of parts, not new props, so the component's API stays small.",
        "Compound components keep the accessibility wiring (ids, `aria-controls`, `aria-selected`, keyboard handling) inside the component while the consumer controls layout and content.",
      ],
      implementation: [
        "List the component's anatomy (parts) before its props; name parts as the design tool does.",
        "Keep shared components presentational; wrap them in product components for data and business rules.",
        "Use `children` for free content, named slots for fixed places (icon, actions), compound parts for related widgets.",
        "Count props: when a component passes many props straight through to a child, extract that child and let consumers compose it.",
        "Keep accessible relationships inside the component: generated ids for labels, descriptions and `aria-controls`, so composition cannot break them [WCAG 2.2 SC 1.3.1 Info and Relationships, A; SC 4.1.2, A] {{src:w3c-wcag-22}}.",
      ],
      scenarios: [
        "**Illustrative.** The 23-prop book card becomes `BookCard` with parts `BookCard.Cover`, `BookCard.Title`, `BookCard.Meta` and `BookCard.Actions`; availability loading moves to the catalogue product's `BookCardWithAvailability` wrapper. The shared card drops to five props.",
        "**Illustrative.** A team passes `user` through Page → Layout → Sidebar → Menu → Avatar. Making Layout accept children and rendering `<Avatar user={user} />` directly at the page level removes three forwarding layers.",
        "**Design review protocol.** For a new component: what is its anatomy? Which parts are slots, which are compound parts? What data does it need, and is fetching kept out? Which props are only forwarded? Are ARIA relationships wired internally?",
      ],
    },
    advanced: {
      explanation: [
        "**Compound components with context.** A `Tabs` root holds the selected value and an id prefix in context; `Tab` and `TabPanel` read it to set `role`, `aria-selected`, `aria-controls` and `aria-labelledby`. The root implements the APG tabs keyboard model — arrow keys move between tabs and wrap, Home and End are optional {{src:w3c-apg-tabs}} — with a roving tabindex so only the active tab is in the tab sequence {{src:w3c-apg-keyboard}}.",
        "**Polymorphism and slots.** Radix's `asChild` lets a part render the consumer's element and merge its behaviour onto it, but Radix warns that changing the element makes the author responsible for accessibility, and that the consumer's component must spread props and forward refs {{src:radix-composition}}. Typed slot props (`icon`, `actions`) keep the contract checkable; see [[component-properties]].",
        "**Headless vs encapsulated styling.** Headless parts expose state as data attributes or render props so styling stays outside the behaviour {{src:react-aria}}; encapsulated components own their styles and expose variants. Systems often combine both: a headless behaviour layer, a styled layer with variants, and product wrappers.",
        "**Server and client boundaries.** In React Server Components apps, a compound component that uses context and state must be a client module; `'use client'` marks the module and its dependencies {{src:react-use-client}}. Keeping the static parts (title, cover) as server components and making only the interactive root a client component reduces client JavaScript; props crossing the boundary must be serialisable {{src:react-use-client}}.",
      ],
      evidence: [
        "Component architecture is **documented engineering practice**: React's documentation on children, context and prop drilling, Primer's presentational philosophy, and the headless libraries' part-based APIs {{src:react-passing-props}} {{src:react-context}} {{src:primer-react-philosophy}} {{src:radix-primitives}} {{src:react-aria}}. Keyboard models come from the APG, which is informative guidance {{src:w3c-apg-tabs}}. No controlled study comparing composition strategies was found.",
      ],
      debates: [
        "**Composition or configuration?** Composition is flexible but lets consumers build inconsistent layouts; configuration (props) enforces consistency but grows into prop sprawl.",
        "**Context or props?** React advises starting with props and children before context {{src:react-context}}; compound components are a deliberate exception where parts must share state.",
        "**How much markup control?** `asChild`-style polymorphism gives freedom at the cost of accessibility responsibility {{src:radix-composition}}.",
      ],
      alternativeModels: [
        "**Render props and hooks** — behaviour exposed as a function or hook that returns props to spread on your own elements; maximum control, more consumer code.",
        "**Web component slots** — native `<slot>` elements in custom elements provide named insertion points without a framework.",
      ],
    },
  },

  application: {
    summary: ["Component architecture applies to every reusable component, and most visibly to complex widgets (tabs, menus, dialogs, comboboxes) and layout containers (cards, page shells)."],
    web: ["Compound parts with context for widgets; children and slots for containers; client boundaries only on interactive roots."],
    mobile: ["Native component APIs use the same anatomy names and slot concepts (content, leading and trailing accessories)."],
    enterprise: ["Product teams wrap presentational components with data containers; the shared library stays data-free."],
    services: ["Documentation templates mirror component anatomy so content designers know what fills each slot."],
    steps: [
      "Draw the anatomy and name the parts.",
      "Assign responsibilities: presentation, behaviour, data.",
      "Choose children, slots or compound parts for each variable area.",
      "Wire accessibility relationships internally.",
      "Review prop counts and forwarding; refactor drilling.",
    ],
  },

  whenToUse: [
    "When designing or refactoring any shared component.",
    "When a component's prop list keeps growing to cover layout variations.",
  ],
  whenNotToUse: [
    "As a reason to split simple, stable components into many parts: a badge does not need compound parts.",
    "As a replacement for consistency rules: free composition still needs documented layouts.",
  ],
  advantages: [
    "Small, stable component APIs.",
    "Reusable presentational components, testable without data.",
    "Accessibility wiring kept inside components while layout stays flexible.",
  ],
  limitations: [
    "Compound components need documentation; consumers must know which parts go together.",
    "More freedom for consumers means more ways to produce inconsistent layouts.",
    "Context-based parts must run on the client in Server Components apps.",
  ],
  misconceptions: [
    {
      myth: "Context is the fix for prop drilling.",
      reality:
        "React recommends passing props first and extracting components that take children before using context {{src:react-context}}; context suits data many components need, or state shared by compound parts.",
    },
    {
      myth: "If consumers can compose freely, accessibility is their problem.",
      reality:
        "The component should own ids, roles, states and keyboard handling so composition cannot break them; consumers own content and labels.",
    },
  ],

  relations: [
    { target: "component-libraries", type: "applied-in", note: "Every library component follows an architecture." },
    { target: "component-properties", type: "complementary-to", note: "Props, slots and polymorphism are the public contract of the architecture." },
    { target: "component-state-management", type: "complementary-to", note: "Compound parts share state; where state lives is an architectural choice." },
    { target: "atomic-design", type: "related-to", note: "Atoms to organisms describe composition levels." },
    { target: "semantic-tokens", type: "applied-in", note: "Parts are styled with semantic tokens." },
    { target: "aria", type: "applied-in", note: "Compound components wire ARIA relationships between parts." },
  ],

  practice: {
    dos: [
      { text: "Name the anatomy first and expose complex widgets as compound parts that share state internally.", why: "Consumers control layout while ids, roles and keyboard handling stay in one tested place {{src:w3c-apg-tabs}}.", kind: "industry" },
      { text: "Keep shared components presentational; fetch and mutate data in product wrappers.", why: "Shared components stay portable and testable; Primer follows this split {{src:primer-react-philosophy}}.", kind: "system" },
      { text: "Accept children or named slots for variable content instead of adding layout props.", why: "Composition replaces configuration and limits prop sprawl {{src:react-passing-props}} {{src:react-context}}.", kind: "platform" },
    ],
    donts: [
      { text: "Don't forward props through components that do not use them.", why: "Prop drilling hides data flow; extract components and pass children first {{src:react-context}}.", kind: "platform" },
      { text: "Don't let consumers wire ARIA ids between parts by hand.", why: "Missing or mismatched ids break relationships [WCAG 2.2 SC 1.3.1, 4.1.2, A] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't make a whole page a client component to use one interactive part.", why: "'use client' marks the module and its dependencies as client code {{src:react-use-client}}.", kind: "platform" },
    ],
    examples: [
      {
        title: "Compound Tabs with React context, generated ids and a roving tabindex",
        language: "ts",
        code: `"use client";
import { createContext, useContext, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Ctx = { value: string; setValue: (v: string) => void; id: string; order: string[] };
const TabsCtx = createContext<Ctx | null>(null);
const useTabs = () => {
  const c = useContext(TabsCtx);
  if (!c) throw new Error("Tabs parts must be inside <Tabs>");
  return c;
};

export function Tabs({ defaultValue, order, children }: { defaultValue: string; order: string[]; children: ReactNode }) {
  const [value, setValue] = useState(defaultValue);
  const id = useId();
  return <TabsCtx.Provider value={{ value, setValue, id, order }}>{children}</TabsCtx.Provider>;
}

export function TabList({ label, children }: { label: string; children: ReactNode }) {
  const { value, setValue, order, id } = useTabs();
  const ref = useRef<HTMLDivElement>(null);
  const onKeyDown = (e: KeyboardEvent) => {           // APG tabs: arrows wrap, Home/End
    const i = order.indexOf(value);
    const next =
      e.key === "ArrowRight" ? order[(i + 1) % order.length] :
      e.key === "ArrowLeft"  ? order[(i - 1 + order.length) % order.length] :
      e.key === "Home" ? order[0] : e.key === "End" ? order[order.length - 1] : null;
    if (!next) return;
    e.preventDefault();
    setValue(next);                                     // automatic activation
    ref.current?.querySelector<HTMLElement>(\`#\${id}-tab-\${next}\`)?.focus();
  };
  return <div role="tablist" aria-label={label} ref={ref} onKeyDown={onKeyDown}>{children}</div>;
}

export function Tab({ value, children }: { value: string; children: ReactNode }) {
  const t = useTabs();
  const selected = t.value === value;
  return (
    <button role="tab" type="button" id={\`\${t.id}-tab-\${value}\`}
      aria-selected={selected} aria-controls={\`\${t.id}-panel-\${value}\`}
      tabIndex={selected ? 0 : -1}                       // roving tabindex
      onClick={() => t.setValue(value)}>{children}</button>
  );
}

export function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const t = useTabs();
  return (
    <div role="tabpanel" id={\`\${t.id}-panel-\${value}\`} aria-labelledby={\`\${t.id}-tab-\${value}\`}
      hidden={t.value !== value} tabIndex={0}>{children}</div>
  );
}

// <Tabs defaultValue="loans" order={["loans", "holds"]}>
//   <TabList label="My account"><Tab value="loans">Loans</Tab><Tab value="holds">Holds</Tab></TabList>
//   <TabPanel value="loans">…</TabPanel><TabPanel value="holds">…</TabPanel>
// </Tabs>`,
        caption: "Illustrative. Consumers arrange the parts; the component owns state, ids, roles and the APG keyboard model.",
      },
      {
        title: "Presentational component and product wrapper",
        language: "ts",
        code: `// shared library: presentational, server-safe, no data fetching
export function BookCard({ title, author, children }: { title: string; author: string; children?: React.ReactNode }) {
  return (
    <article className="card">
      <h3 className="t-sub">{title}</h3>
      <p className="label">{author}</p>
      {children /* actions slot, composed by the product */}
    </article>
  );
}

// catalogue product: container owns data and business rules
export async function BookCardWithAvailability({ isbn }: { isbn: string }) {
  const book = await getBook(isbn);                 // server data
  return (
    <BookCard title={book.title} author={book.author}>
      <ReserveButton isbn={isbn} available={book.available} />  {/* client island */}
    </BookCard>
  );
}`,
        caption: "Illustrative. The shared card stays data-free and server-rendered; only the reserve button is a client component.",
      },
    ],
  },

  exercises: [
    {
      id: "component-architecture-ex-anatomy",
      kind: "assignment",
      level: "beginner",
      title: "Draw the anatomy",
      prompt: ["Choose a dialog, a card and a set of tabs from any app. Draw each and label its parts. Mark which parts are always present and which are optional."],
      deliverable: "Three labelled anatomy sketches.",
      criteria: ["Parts named", "Optional parts marked", "Shared state identified for tabs"],
    },
    {
      id: "component-architecture-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Untangle a 23-prop card",
      prompt: [
        "Illustrative case. The library app's BookCard has 23 props, including `showBadge`, `badgeText`, `secondaryButtonLabel`, `coverPosition` and `fetchAvailability`. Its tabs version asks consumers to pass matching `id` and `aria-controls` strings by hand, and two products got them wrong.",
        "Work through the correction sequence.",
      ],
      deliverable: "A new anatomy, API and accessibility wiring plan.",
      criteria: ["Composition replaces flags", "Data moved to a wrapper", "ARIA wiring internalised"],
      exampleSolution: [
        "1. Symptoms: unknown prop combinations; data fetching inside a shared component; broken tab relationships.",
        "2. Impact: slow reviews, offline breakage, screen-reader users hearing tabs without panels.",
        "3. Causes: configuration over composition; mixed concerns; consumers wiring ids.",
        "4. Requirements: relationships programmatically determined [WCAG 2.2 SC 1.3.1, A]; names, roles, states [SC 4.1.2, A]; APG tabs keyboard model.",
        "5. Correction: compound `BookCard.Cover/Title/Meta/Actions`; `BookCardWithAvailability` wrapper in the catalogue; Tabs generates ids with useId and sets aria attributes itself.",
        "6. Validation: prop count before and after; accessibility tree check; keyboard test of tabs.",
        "7. Trade-off: consumers write a few more lines of markup; documentation shows the standard arrangement.",
      ],
    },
    {
      id: "component-architecture-ex-boundary",
      kind: "reflection",
      level: "advanced",
      title: "Place the client boundary",
      prompt: ["For a search page with a results list, filters, a sort menu and a pagination control, decide which components are server components and which need 'use client'. Justify each and state what props cross the boundary."],
      deliverable: "A component tree marked server/client with serialisable props listed.",
      criteria: ["Interactive parts identified", "Boundaries minimal", "Props serialisable"],
    },
  ],

  quiz: [
    {
      id: "component-architecture-q-children",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A card needs to show different content in its body in different places. What is the simplest architecture?",
      options: [
        { text: "Let the card accept children and render them in its body", correct: true, explanation: "Composition handles variable content." },
        { text: "Add a boolean prop for every possible body", correct: false, explanation: "That leads to prop sprawl." },
        { text: "Make a separate card component for every page", correct: false, explanation: "Duplication defeats reuse." },
        { text: "Hard-code the body content", correct: false, explanation: "It would not be reusable." },
      ],
      explanation: "Children make content variable without new props.",
    },
    {
      id: "component-architecture-q-drilling",
      kind: "scenario",
      level: "intermediate",
      prompt: "A `user` prop passes through Layout and Sidebar, which never use it, to reach Avatar. What does React's guidance suggest first?",
      options: [
        { text: "Extract components and pass JSX as children so the page renders Avatar with user directly", correct: true, explanation: "React recommends props and children before context." },
        { text: "Put every prop in global context", correct: false, explanation: "Context is easy to overuse." },
        { text: "Copy the user data into each component", correct: false, explanation: "Duplicated state goes out of sync." },
        { text: "Use a global variable", correct: false, explanation: "Hides data flow and breaks rendering." },
      ],
      explanation: "Composition removes forwarding layers.",
    },
    {
      id: "component-architecture-q-compound",
      kind: "critique",
      level: "advanced",
      prompt: "A compound Tabs component puts every tab in the tab sequence (tabIndex 0) and ignores arrow keys. What does the APG tabs pattern expect?",
      options: [
        { text: "Only the active tab is in the tab sequence; arrow keys move between tabs (roving tabindex)", correct: true, explanation: "Tab moves into and out of the tab list; arrows move within it." },
        { text: "Every tab should be reachable with Tab", correct: false, explanation: "That makes long tab lists slow and differs from the pattern." },
        { text: "Tabs should not be focusable", correct: false, explanation: "They must be operable by keyboard." },
        { text: "Use aria-hidden on inactive tabs", correct: false, explanation: "That would hide them from assistive technology." },
      ],
      explanation: "Compound parts implement the APG keyboard model.",
    },
  ],

  flashcards: [
    { id: "component-architecture-fc-define", front: "Component architecture", back: "How a component's responsibilities are split into parts and how consumers compose them (children, slots, compound parts)." },
    { id: "component-architecture-fc-drilling", front: "Prop drilling", back: "Passing data through components that only forward it; fix by extracting components and passing children, then context if needed." },
    { id: "component-architecture-fc-compound", front: "Compound component", back: "Parts such as Tabs, Tab and TabPanel that share state via context and wire ARIA relationships internally." },
    { id: "component-architecture-fc-presentational", front: "Presentational vs container", back: "Presentational components render props; containers (product wrappers) fetch data and apply business rules." },
  ],

  references: [
    { source: "react-passing-props", role: "primary", note: "children prop." },
    { source: "react-context", role: "primary", note: "Prop drilling, alternatives, context." },
    { source: "primer-react-philosophy", role: "primary", note: "Presentational components; data in wrappers." },
    { source: "radix-primitives", role: "explanatory", note: "Access to each part." },
    { source: "radix-composition", role: "explanatory", note: "asChild and responsibilities." },
    { source: "react-aria", role: "explanatory", note: "Parts, states, render props, slots." },
    { source: "open-ui", role: "explanatory", note: "Component naming research." },
    { source: "react-use-client", role: "explanatory", note: "Client boundaries; serialisable props." },
    { source: "w3c-apg-tabs", role: "explanatory", note: "Tabs keyboard model." },
    { source: "w3c-apg-keyboard", role: "explanatory", note: "Roving tabindex." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.3.1, 4.1.2." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Documented engineering practice (React documentation, Primer, headless libraries) and informative W3C APG guidance. No controlled comparison of composition strategies was found. Relationships and name–role–value are WCAG 2.2 success criteria.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
