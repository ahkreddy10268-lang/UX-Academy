import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "data-tables",
  slug: "data-tables",
  title: "Data Tables",
  alternateNames: ["Tables", "Data grid", "Sortable table", "Table component", "Interactive grid"],
  summary:
    "The component for comparing many records across the same attributes — with real table semantics, sorting, selection, sticky headers and a plan for small screens — that must also handle every async state: loading, empty, error and populated.",
  definition:
    "A data table presents **records in rows and attributes in columns** so people can scan, compare, sort and act. It is a composite organism that combines nearly every pattern in this stage: loading skeletons, empty and no-results states, error banners, pagination or virtualisation, sorting and selection. Accessibility starts with the choice of model: the W3C APG describes a **table** as a static structure whose cells are not focusable, and a **grid** as an interactive composite widget navigated with arrow keys {{src:w3c-apg-table}} {{src:w3c-apg-grid}}. Most tables should be native HTML tables with proper headers {{src:w3c-wai-tables-tutorial}}; only spreadsheet-like editing needs a grid.",
  primaryType: "pattern",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "components",
  tags: ["data table", "data grid", "sorting", "aria-sort", "caption", "scope", "sticky header", "row selection", "pagination", "virtualisation", "responsive tables"],
  difficulty: "advanced",
  disciplines: ["Interaction design", "Front-end engineering", "Accessibility", "Information design"],
  learningObjectives: [
    "Choose between a static table and an interactive grid.",
    "Mark up tables with captions, header cells, scope and aria-sort.",
    "Design sorting, selection, column visibility and sticky headers.",
    "Handle async states, small screens and very large datasets accessibly.",
  ],
  prerequisites: ["component-state-management", "empty-states", "loading-states", "error-states"],

  levels: {
    beginner: {
      explanation: [
        "A branch librarian needs to find which overdue loans are older than 30 days. The library app shows loans as a long list of cards, each with the title, member, due date and fines in different places. Comparing them means reading every card.",
        "A **data table** lines records up in rows and their details in columns. Because every due date sits in the same column, the eye can run down it; clicking the column heading sorts by it; ticking rows lets the librarian act on several at once.",
        "Tables need care: a screen reader must know which heading belongs to each cell, keyboards must reach every control, and on a phone a wide table must still be readable.",
      ],
      analogy:
        "A train timetable: stations down the side, departure times across the top. You can read across a row or down a column — something a paragraph of text could never let you do.",
      everydayExamples: [
        "A bank statement with date, description and amount columns.",
        "An email inbox sortable by sender or date.",
        "A product comparison table on a shopping site.",
      ],
      vocabulary: [
        { term: "Row", meaning: "One record, such as one loan." },
        { term: "Column", meaning: "One attribute across all records, such as the due date." },
        { term: "Header cell", meaning: "The label of a row or column, which screen readers announce with each cell." },
        { term: "Caption", meaning: "The title of the table, read before its contents." },
        { term: "Sticky header", meaning: "A header row that stays visible while the table scrolls." },
      ],
    },
    intermediate: {
      explanation: [
        "**Semantics first.** Use `<table>`, a `<caption>`, `<th>` for headers and `<td>` for data; where header direction is unclear set `scope` to `col` or `row`, and use `id`/`headers` only for complex multi-level tables {{src:w3c-wai-tables-tutorial}}. Table structure must be programmatically determinable [WCAG 2.2 SC 1.3.1, A] {{src:w3c-wcag-22}}.",
        "**Sorting.** Make column headers buttons; set `aria-sort` on the sorted header, as the APG table pattern describes {{src:w3c-apg-table}}, and announce the new order as a status message [SC 4.1.3, AA]. Show the direction with an icon *and* the accessible state, not colour.",
        "**Table or grid?** In a table, every widget in a cell is its own tab stop; if there are many, the APG notes a grid can dramatically shorten the tab sequence {{src:w3c-apg-table}}. A grid takes one tab stop and uses arrow keys, Home and End (and optionally Page Up/Down) to move between cells {{src:w3c-apg-grid}}, typically with a roving tabindex ([[component-state-management]]). Choose a grid only for spreadsheet-like work; it is more to build and to learn.",
        "**Small screens.** NN/g's mobile-table guidance: keep columns legible, treat rotation as a last resort, stick the header row and the first column, make horizontal scrolling obvious, let people choose which columns to see, and use accordions for groups of data {{src:nng-mobile-tables}}. Reflow at 320 CSS px is required for most content, but data tables are an allowed exception to two-dimensional scrolling [SC 1.4.10, AA] {{src:w3c-wcag-22}}; the scroll container itself must be keyboard-focusable and labelled.",
        "**Layout and density.** Right-align numbers, left-align text, keep row height on the spacing scale, and offer a density setting rather than one-off compact tables.",
      ],
      howItWorks: [
        "Aligning attributes in columns lets people compare by scanning one column instead of reading every record; header associations give screen-reader users the same context for each cell.",
        "One component that owns loading, empty, error and populated states keeps behaviour consistent wherever tables appear.",
      ],
      implementation: [
        "Start with native table markup: caption, th with scope, td.",
        "Make sortable headers buttons with aria-sort on the sorted column; announce sort changes.",
        "Give selection checkboxes names that include the row ('Select Middlemarch'), plus a select-all with mixed state.",
        "Keep the header sticky inside a labelled, focusable scroll container; stick the first column on small screens {{src:nng-mobile-tables}}.",
        "Render all async states inside the table frame: skeleton rows while loading, a no-results row spanning all columns, an error banner above the table with retry.",
        "Use pagination for findable, shareable positions; use virtualisation only for very large, scroll-browsed sets.",
      ],
      scenarios: [
        "**Illustrative.** The overdue-loans table has a caption 'Overdue loans, 248', sortable 'Due date' and 'Fine' headers with aria-sort, row checkboxes named by title, and a bulk 'Send reminder' action. Sorting announces 'Sorted by due date, oldest first'.",
        "**Illustrative.** On a phone, the table keeps 'Title' fixed on the left and lets the librarian choose two of five other columns, instead of shrinking all six until unreadable.",
        "**Design review protocol.** Is this a table or a grid? Does every data cell have a header? Is sorting state exposed? Are loading, empty and error states inside the frame? What happens at 320 px? Can keyboard users reach every action?",
      ],
    },
    advanced: {
      explanation: [
        "**Async states.** The table runs one machine for its data — `loading` (skeleton rows of real row height) → `success` (`populated` | `empty`) | `error` — and a second for interactions such as sorting and paging, which keep the previous rows visible with `aria-busy` while refetching ([[loading-states]]). Empty and no-results states sit in a single full-width row ([[empty-states]]); errors appear above the table and never as 'No data' ([[error-states]]).",
        "**Large datasets.** Virtualisation renders only visible rows; TanStack Virtual is a headless utility that renders no markup itself {{src:tanstack-virtual}}. With rows missing from the DOM, expose `aria-rowcount` for the total and `aria-rowindex` on each rendered row, as the APG grid pattern describes for hidden rows {{src:w3c-apg-grid}}. Keep the sticky header outside the virtualised body, and keep focus on a rendered row while scrolling.",
        "**Keyboard model.** In a grid, implement the APG keys — arrows move by cell, Home/End by row edge, Ctrl+Home/End to the first/last cell, optional Page Up/Down {{src:w3c-apg-grid}} — with a roving tabindex so the grid is one tab stop {{src:w3c-apg-keyboard}}. In a table, keep interactive cells few and in natural tab order [SC 2.1.1, A; SC 2.4.3, A] {{src:w3c-wcag-22}}.",
        "**Telemetry.** Time to find a row (search vs scroll vs sort), sort and filter usage per column (unused columns are candidates for hiding), zero-result filter combinations, bulk-action error rates, and abandonment during long loads.",
      ],
      evidence: [
        "Table guidance rests on **W3C accessibility documents** — the WAI tables tutorial and the APG table and grid patterns (informative) {{src:w3c-wai-tables-tutorial}} {{src:w3c-apg-table}} {{src:w3c-apg-grid}} — WCAG 2.2 criteria (normative) {{src:w3c-wcag-22}}, NN/g's mobile-table research {{src:nng-mobile-tables}} and library documentation {{src:tanstack-virtual}}. The scenarios are illustrative.",
      ],
      debates: [
        "**Cards or table on mobile?** Cards are readable but lose column comparison; sticky first column with chosen columns keeps comparison.",
        "**Pagination or infinite scroll?** Pagination supports finding and returning; infinite scroll suits browsing but hides totals and the footer.",
        "**Grid for everything?** Grids shorten tab sequences but add an unfamiliar keyboard model; use them for editing, not reading.",
      ],
      alternativeModels: [
        "**Lists with key-value rows** — for few records with many attributes, a definition list per record reads better than a wide table.",
        "**Charts** — when the task is seeing a trend rather than looking up values.",
      ],
    },
  },

  application: {
    summary: ["Data tables apply to admin tools, reports, transaction histories, comparison pages and any record-heavy interface."],
    web: ["Native table markup, sortable header buttons with aria-sort, labelled scroll containers, sticky headers, async states inside the frame; grid only for editing."],
    mobile: ["Sticky first column, column chooser, legible widths, and visible horizontal-scroll cues."],
    enterprise: ["Bulk actions, saved views, column visibility and density settings; virtualisation for very large sets."],
    services: ["Printed reports keep headers on every page and avoid relying on colour."],
    steps: [
      "Decide table or grid from the task (reading vs editing).",
      "Mark up caption, headers and scope; define columns, alignment and density tokens.",
      "Add sorting, selection and column visibility with exposed states.",
      "Design loading, empty, no-results and error states inside the frame.",
      "Plan small screens and large datasets; test keyboard and screen readers.",
    ],
  },

  whenToUse: [
    "When people compare many records across the same attributes.",
    "When records must be sorted, filtered or acted on in bulk.",
  ],
  whenNotToUse: [
    "For layout: tables are for data, not for positioning content.",
    "For few records with many unrelated attributes: use a definition list or cards.",
  ],
  advantages: [
    "Fast comparison and lookup across records.",
    "Sorting, filtering and bulk actions in one place.",
    "Native semantics give screen readers rich context.",
  ],
  limitations: [
    "Wide tables are hard on small screens.",
    "Interactive grids are complex to build and learn.",
    "Virtualisation removes rows from find-in-page and the DOM.",
  ],
  misconceptions: [
    {
      myth: "Every interactive table should be an ARIA grid.",
      reality:
        "The APG describes tables as static structures and grids as interactive widgets; use a grid when many widgets would make the tab sequence long or for spreadsheet-like editing {{src:w3c-apg-table}}.",
    },
    {
      myth: "Tables must never scroll horizontally.",
      reality:
        "Data tables are an allowed exception to WCAG 2.2's reflow requirement [SC 1.4.10] {{src:w3c-wcag-22}}; make the scrolling region obvious, focusable and labelled, and stick key columns {{src:nng-mobile-tables}}.",
    },
  ],

  relations: [
    { target: "component-state-management", type: "derived-from", note: "The table runs data and interaction state machines." },
    { target: "empty-states", type: "applied-in", note: "No-results and first-use states inside the table frame." },
    { target: "loading-states", type: "applied-in", note: "Skeleton rows and refetch indicators." },
    { target: "error-states", type: "applied-in", note: "Error banners with retry above the table." },
    { target: "progressive-loading", type: "applied-in", note: "Pagination and virtualisation for large sets." },
    { target: "keyboard-accessibility", type: "related-to", note: "Grid keyboard models and tab sequence." },
  ],

  practice: {
    dos: [
      { text: "Use native table markup with a caption, th headers and scope; reserve ARIA grids for editing.", why: "Header associations convey structure [WCAG 2.2 SC 1.3.1] {{src:w3c-wai-tables-tutorial}}; tables are static, grids interactive {{src:w3c-apg-table}}.", kind: "standard" },
      { text: "Expose sorting with aria-sort on the sorted header and announce the change.", why: "The APG table pattern places aria-sort on the sorted header {{src:w3c-apg-table}}; SC 4.1.3 for the announcement.", kind: "standard" },
      { text: "Render loading, empty, no-results and error states inside the table frame.", why: "People keep their place and never confuse a failure with 'no data'.", kind: "system" },
    ],
    donts: [
      { text: "Don't shrink every column to fit a phone.", why: "Columns must stay legible; stick key columns and let people choose others {{src:nng-mobile-tables}}.", kind: "industry" },
      { text: "Don't virtualise without aria-rowcount and aria-rowindex.", why: "Screen readers cannot know the size or position otherwise {{src:w3c-apg-grid}}.", kind: "standard" },
      { text: "Don't use generic 'Select' labels on row checkboxes.", why: "Each control needs a name that identifies its row [SC 4.1.2, 2.4.6] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "Accessible sortable table with selection, async states and a labelled scroll region",
        language: "ts",
        code: `type Sort = { key: "title" | "due" | "fine"; dir: "ascending" | "descending" };

export function OverdueTable({ state, sort, onSort, selected, onSelect }: {
  state: { status: "loading" } | { status: "error"; message: string; retry: () => void } | { status: "success"; rows: Loan[]; total: number };
  sort: Sort; onSort: (k: Sort["key"]) => void;
  selected: Set<string>; onSelect: (id: string, on: boolean) => void;
}) {
  const header = (key: Sort["key"], label: string, numeric = false) => (
    <th scope="col" aria-sort={sort.key === key ? sort.dir : undefined} className={numeric ? "num" : undefined}>
      <button type="button" onClick={() => onSort(key)}>{label}<SortIcon active={sort.key === key} dir={sort.dir} /></button>
    </th>
  );
  return (
    <>
      {state.status === "error" && <ErrorBanner message={state.message} onRetry={state.retry} />}
      <p role="status" className="sr-only">{\`Sorted by \${sort.key}, \${sort.dir}\`}</p>
      <div className="table-scroll" role="region" aria-labelledby="overdue-cap" tabIndex={0}>
        <table aria-busy={state.status === "loading" || undefined}>
          <caption id="overdue-cap">Overdue loans{state.status === "success" ? \`, \${state.total}\` : ""}</caption>
          <thead className="sticky">
            <tr>
              <td><SelectAll rows={state.status === "success" ? state.rows : []} selected={selected} /></td>
              {header("title", "Title")}{header("due", "Due date")}{header("fine", "Fine", true)}
            </tr>
          </thead>
          <tbody>
            {state.status === "loading" && <SkeletonRows count={10} columns={4} />}
            {state.status === "success" && state.rows.length === 0 && (
              <tr><td colSpan={4}><EmptyState heading="No overdue loans" body="Everything is back on time." /></td></tr>
            )}
            {state.status === "success" && state.rows.map((r) => (
              <tr key={r.id}>
                <td><input type="checkbox" aria-label={\`Select \${r.title}\`}
                  checked={selected.has(r.id)} onChange={(e) => onSelect(r.id, e.target.checked)} /></td>
                <th scope="row">{r.title}</th>
                <td>{r.due}</td>
                <td className="num">{r.fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}`,
        caption: "Illustrative. Native semantics, aria-sort, named selection, a focusable labelled scroll region, and all async states inside one frame; errors never render as 'no data'.",
      },
    ],
  },

  exercises: [
    {
      id: "data-tables-ex-structure",
      kind: "assignment",
      level: "beginner",
      title: "Turn cards into a table",
      prompt: ["Take a list of cards from an app (orders, loans, bookings). Choose the columns, write the caption and header labels, and say which columns should be sortable and why."],
      deliverable: "A table sketch with caption, headers and sortable columns marked.",
      criteria: ["One record per row", "Clear headers", "Sorting justified"],
    },
    {
      id: "data-tables-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Repair the overdue-loans table",
      prompt: [
        "Illustrative case. The overdue-loans table is built from div elements with bold text as headers. Sorting is shown only by a blue header colour. Every row has a checkbox labelled 'Select'. When the loans API fails, the table says 'No data'. On a phone, six columns shrink to unreadable widths.",
        "Work through the correction sequence.",
      ],
      deliverable: "A corrected table specification.",
      criteria: ["Semantics fixed", "Sort exposed", "Names fixed", "Error separated", "Mobile plan"],
      exampleSolution: [
        "1. Symptoms: no header announcements; invisible sort state; ambiguous checkboxes; misleading 'No data'; unreadable mobile view.",
        "2. Impact: screen-reader users cannot interpret cells or selection; colour-blind users miss sort; librarians think there are no overdue loans.",
        "3. Causes: div layout; colour-only state; generic labels; empty shown on failure; no small-screen design.",
        "4. Requirements: structure programmatically determined [WCAG 2.2 SC 1.3.1, A]; not colour alone [SC 1.4.1, A]; names [SC 4.1.2, A]; errors identified [SC 3.3.1, A]; tables may scroll horizontally [SC 1.4.10 exception].",
        "5. Correction: native table with caption and scoped headers; header buttons with aria-sort and an icon; 'Select {title}' labels; error banner with retry; sticky title column and a column chooser on phones.",
        "6. Validation: screen-reader table navigation; keyboard pass; API failure simulation; 390 px check.",
        "7. Trade-off: column chooser adds a control; default columns cover the main task.",
      ],
    },
    {
      id: "data-tables-ex-grid",
      kind: "reflection",
      level: "advanced",
      title: "Table, grid or virtualised grid?",
      prompt: ["For (a) a 30-row fines report, (b) a 500-row editable stock sheet and (c) a 200,000-row audit log, choose table, grid or virtualised grid. Specify keyboard model, ARIA properties and async states for each."],
      deliverable: "Three specifications with justification.",
      criteria: ["Model fits the task", "APG keys and properties correct", "Async states covered"],
    },
  ],

  quiz: [
    {
      id: "data-tables-q-why",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Why use a table rather than cards for overdue loans?",
      options: [
        { text: "Aligned columns let people compare and sort the same attribute across many records", correct: true, explanation: "Comparison is the table's strength." },
        { text: "Tables load faster", correct: false, explanation: "Not inherently." },
        { text: "Cards are not allowed", correct: false, explanation: "They suit other tasks." },
        { text: "Tables need no accessibility work", correct: false, explanation: "They need careful semantics." },
      ],
      explanation: "Tables are for comparison.",
    },
    {
      id: "data-tables-q-sort",
      kind: "scenario",
      level: "intermediate",
      prompt: "How should a table expose that it is sorted by due date, ascending?",
      options: [
        { text: "aria-sort=\"ascending\" on the Due date header, an icon, and an announced status", correct: true, explanation: "State, visual cue and announcement." },
        { text: "Make the header blue", correct: false, explanation: "Colour alone fails SC 1.4.1." },
        { text: "Add 'sorted' to every cell", correct: false, explanation: "Noise for screen readers." },
        { text: "Nothing; order is visible", correct: false, explanation: "Not to assistive technology." },
      ],
      explanation: "Expose sort state programmatically.",
    },
    {
      id: "data-tables-q-grid",
      kind: "critique",
      level: "advanced",
      prompt: "A read-only report table was built as an ARIA grid with every cell focusable. What does the APG suggest?",
      options: [
        { text: "Use a static table: its cells are not focusable; grids are for interactive tabular widgets", correct: true, explanation: "Table vs grid per the APG." },
        { text: "Keep the grid; it is always better", correct: false, explanation: "It adds an unnecessary keyboard model." },
        { text: "Remove headers", correct: false, explanation: "Headers are essential." },
        { text: "Make every cell a tab stop", correct: false, explanation: "That lengthens the tab sequence." },
      ],
      explanation: "Choose the model by the task.",
    },
  ],

  flashcards: [
    { id: "data-tables-fc-table-grid", front: "Table vs grid (APG)", back: "Table: static structure, cells not focusable. Grid: interactive composite widget, one tab stop, arrow-key navigation." },
    { id: "data-tables-fc-markup", front: "Essential table markup", back: "caption, th with scope (col/row), td; aria-sort on the sorted header." },
    { id: "data-tables-fc-virtual", front: "Virtualised table ARIA", back: "aria-rowcount for the total, aria-rowindex on each rendered row." },
    { id: "data-tables-fc-wcag", front: "WCAG 2.2 for tables", back: "1.3.1 Info and Relationships (A), 2.1.1 Keyboard (A), 1.4.1 Use of Color (A), 4.1.2 Name, Role, Value (A), 4.1.3 Status Messages (AA); tables are an exception to 1.4.10 Reflow." },
  ],

  references: [
    { source: "w3c-apg-table", role: "primary", note: "Static tables; aria-sort; grid alternative." },
    { source: "w3c-apg-grid", role: "primary", note: "Grid keyboard model; rowcount and rowindex." },
    { source: "w3c-wai-tables-tutorial", role: "primary", note: "th, scope, headers, caption." },
    { source: "nng-mobile-tables", role: "primary", note: "Mobile table guidelines." },
    { source: "w3c-apg-keyboard", role: "explanatory", note: "Roving tabindex." },
    { source: "tanstack-virtual", role: "explanatory", note: "Headless virtualisation." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.3.1, 1.4.1, 1.4.10, 2.1.1, 2.4.3, 2.4.6, 3.3.1, 4.1.2, 4.1.3." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "W3C informative guidance (WAI tutorial, APG) and normative WCAG 2.2 criteria, NN/g mobile-table research and library documentation. Scenarios are illustrative.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
