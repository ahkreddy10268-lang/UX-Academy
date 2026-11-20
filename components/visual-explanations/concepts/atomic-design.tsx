/**
 * Atomic design — the five levels, each built from the one before, with the
 * search-form-to-page example from the entry. Restates
 * content/knowledge/design-systems/atomic-design.ts (Frost 2016). Text is real
 * HTML in an ordered list, so the reading order is the level order at every width.
 */
type Level = { n: string; name: string; what: string; example: string };

const LEVELS: Level[] = [
  { n: "1", name: "Atoms", what: "The smallest useful pieces: basic interface elements that cannot be broken down further and still work.", example: "A label, an input, a button." },
  { n: "2", name: "Molecules", what: "Simple groups of elements working as a unit, each doing one thing well.", example: "Label, input and button become a search form." },
  { n: "3", name: "Organisms", what: "Larger components forming a distinct section, made of molecules, atoms or other organisms.", example: "The search form, logo and menu become a header." },
  { n: "4", name: "Templates", what: "Page-level layouts of components that show the content structure, without final content.", example: "Sections arranged into a page layout, without final content." },
  { n: "5", name: "Pages", what: "A template filled with real, representative content, used to test whether the system holds up.", example: "The same layout with real content, to see whether everything works." },
];

export function AtomicDesignLevels() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">An interface is built from parts inside parts.</span> The five levels name them, from the smallest piece to a page with real content.
      </p>
      <ol className="space-y-2" aria-label="The five levels of atomic design">
        {LEVELS.map((l) => (
          <li key={l.n} className="grid min-w-0 gap-x-4 gap-y-1.5 rounded-lg border border-rule-strong bg-surface p-3.5 @2xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1.4fr)]">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="formula text-sm text-accent">{l.n}</span>
              <span className="t-sub text-base text-ink">{l.name}</span>
            </p>
            <p className="min-w-0 text-sm text-ink">{l.what}</p>
            <p className="min-w-0 text-sm text-ink-2">
              <span className="label block">Example</span>
              {l.example}
            </p>
          </li>
        ))}
      </ol>
      <div className="grid gap-3 @2xl:grid-cols-2">
        <section className="min-w-0 rounded-lg border border-rule bg-surface p-3.5" aria-label="Not a linear process">
          <p className="label">Not a linear process</p>
          <p className="mt-1.5 text-sm text-ink">Teams move constantly between abstract parts and concrete pages. The page level is where the system is tested against reality, and what is found there changes the parts.</p>
        </section>
        <section className="min-w-0 rounded-lg border border-rule bg-surface p-3.5" aria-label="Start from what exists">
          <p className="label">Start from what exists</p>
          <p className="mt-1.5 text-sm text-ink">An interface inventory collects one instance of every unique pattern in the current product, exposing redundancy and winning support for a system.</p>
        </section>
      </div>
      <p className="text-xs text-ink-2">The names are optional. GE’s design team found the chemistry terms confusing and used Principles, Basics, Components, Templates, Features and Applications instead; choose names that work for the organisation.</p>
    </div>
  );
}
