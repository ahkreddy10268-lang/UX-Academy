/**
 * Accessibility — an educational comparison of three perspectives on
 * disability (individual/medical, social, WHO ICF) on the same five questions,
 * and, set apart from them, the rights-based lens of the UN CRPD, which is a
 * treaty that applies across all three rather than a fourth model. Content
 * restates content/knowledge/accessibility/accessibility-concept.ts.
 */
import { IllustrativeBadge } from "../primitives";

const ASPECTS = ["Where the difficulty is located", "What it asks us to examine", "Interventions it foregrounds", "What it explains well", "What it can leave out"] as const;

type Perspective = { name: string; origin: string; marker: string; rows: [string, string, string, string, string] };

const PERSPECTIVES: Perspective[] = [
  {
    name: "Individual (medical) model",
    origin: "Clinical and rehabilitation traditions",
    marker: "A",
    rows: [
      "In the person's impairment or health condition.",
      "Diagnosis, functional limits and individual needs.",
      "Treatment, rehabilitation, assistive devices and individual support.",
      "Health needs, pain and why some people need specific clinical or personal support.",
      "Inaccessible environments, services and attitudes; it can make the person the only place the problem lives.",
    ],
  },
  {
    name: "Social model",
    origin: "UPIAS and the Disability Alliance, 1976; developed by Oliver and others",
    marker: "B",
    rows: [
      "In a social organisation that takes little or no account of people with impairments.",
      "Barriers in buildings, products, information, policies, procedures and attitudes.",
      "Removing barriers, changing defaults and policy, and decisions made with disabled people.",
      "Exclusion and segregation, and why the fix is often redesign rather than individual adjustment.",
      "Impairment experiences, such as pain or fatigue, that removing barriers does not resolve; first framed around physical impairment.",
    ],
  },
  {
    name: "WHO ICF (biopsychosocial)",
    origin: "World Health Organization, 2001",
    marker: "C",
    rows: [
      "In the interaction between a health condition and contextual factors, environmental and personal.",
      "Body functions and structures, activities, participation, and environmental and personal factors together.",
      "Both individual support and environmental change; describing and measuring functioning.",
      "Functioning in context, combining clinical and environmental information in one framework.",
      "It is a classification, not a political account; some scholars argue it still frames disability through health.",
    ],
  },
];

const RIGHTS = ["Dignity and autonomy", "Non-discrimination", "Full participation and inclusion", "Accessibility", "Equality of opportunity", "Reasonable accommodation", "Universal design"];

export function DisabilityPerspectives() {
  return (
    <div className="space-y-4">
      <p className="flex flex-wrap items-center gap-2 text-xs text-ink-2">
        <span className="rounded-full border border-rule-strong bg-soft px-2.5 py-0.5 font-semibold text-ink">Educational comparison</span>
        Simplified for comparison: not a complete history of disability theory, and the perspectives overlap in practice.
      </p>

      <div className="grid gap-3 @4xl:grid-cols-3">
        {PERSPECTIVES.map((p) => (
          <section key={p.name} aria-labelledby={`dp-${p.marker}`} className="min-w-0 rounded-lg border border-rule bg-surface p-3.5">
            <h4 id={`dp-${p.marker}`} className="flex items-start gap-2">
              <span aria-hidden className="formula inline-grid h-6 w-6 shrink-0 place-items-center rounded-sm bg-c-wash text-xs font-semibold text-c-ink">
                {p.marker}
              </span>
              <span className="t-sub text-sm leading-snug text-ink">{p.name}</span>
            </h4>
            <p className="mt-1 pl-8 text-xs text-ink-3">{p.origin}</p>
            <dl className="mt-3 space-y-2.5">
              {ASPECTS.map((a, i) => (
                <div key={a} className={i === 4 ? "rounded-md border border-dashed border-rule-strong p-2" : ""}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                    {i + 1}. {a}
                  </dt>
                  <dd className="mt-0.5 text-sm text-ink-2">{p.rows[i]}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <div aria-hidden className="hidden grid-cols-3 text-ink-3 @4xl:grid">
        {[0, 1, 2].map((i) => (
          <svg key={i} viewBox="0 0 24 24" className="mx-auto h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21V4M6 10l6-6 6 6" />
          </svg>
        ))}
      </div>

      <section aria-labelledby="dp-rights" className="rounded-lg border-2 border-ink p-4">
        <h4 id="dp-rights" className="flex flex-wrap items-center gap-2">
          <span className="rounded-sm border border-ink px-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink">Not a fourth model</span>
          <span className="t-sub text-sm text-ink">Rights-based lens: UN Convention on the Rights of Persons with Disabilities (2006)</span>
        </h4>
        <p className="mt-2 text-sm text-ink-2">
          A human-rights treaty, not an account of what disability is. It applies across all three perspectives: whichever explains a situation best, states that ratify the Convention must act on these principles, including identifying and removing barriers to the physical environment, transport, information and communications, and public services.
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Principles and obligations">
          {RIGHTS.map((r) => (
            <li key={r} className="rounded-full border border-rule-strong bg-soft px-2.5 py-0.5 text-xs font-medium text-ink">
              {r}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="dp-case" className="rounded-lg border border-rule bg-soft p-4">
        <h4 id="dp-case" className="flex flex-wrap items-center gap-2">
          <span className="t-sub text-sm text-ink">Same situation, different questions</span>
          <IllustrativeBadge />
        </h4>
        <p className="mt-1 text-sm text-ink-2">A university publishes lecture videos without captions, and a deaf student cannot follow them.</p>
        <dl className="mt-2 grid gap-2 text-sm @3xl:grid-cols-2">
          <div>
            <dt className="font-semibold text-ink">A · Medical lens</dt>
            <dd className="text-ink-2">What does this student need? Arrange individual support.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">B · Social lens</dt>
            <dd className="text-ink-2">Why are videos published without captions? Caption every video by default.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">C · ICF lens</dt>
            <dd className="text-ink-2">Hearing function, the activity of following lectures, participation in study, and the environmental factor of missing captions, together.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Rights lens</dt>
            <dd className="text-ink-2">Equal access to education and information in accessible formats; reasonable accommodation, such as an interpreter for live seminars, where still needed.</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
