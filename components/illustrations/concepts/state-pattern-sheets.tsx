/**
 * Stage 4 plates, Batch 6 (session 36): empty, loading, skeleton,
 * progressive loading, error and data tables — all drawn on the shared async
 * state model (idle → loading → success | error; success → populated | empty).
 * Wait tiers come from lib/formulas/components waitFeedback.
 */
import { waitFeedback, type WaitTier } from "../../../lib/formulas/components";
import type { IllustrationEntry } from "../illustration-types";
import { Marker, S, TextBar, UiText } from "../system/sheet";
import { Link } from "./learning-sheets";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Box({ x, y, w, h, fill = S.surface, stroke = S.ruleStrong, dashed = false, rx = 6 }: { x: number; y: number; w: number; h: number; fill?: string; stroke?: string; dashed?: boolean; rx?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth="1" strokeDasharray={dashed ? "4 3" : undefined} {...hair} />;
}
function Pill({ x, y, w, label, tone = "ink" }: { x: number; y: number; w: number; label: string; tone?: "ink" | "accent" | "ok" | "error" }) {
  const fill = tone === "accent" ? S.accentWash : tone === "ok" ? S.okWash : tone === "error" ? S.errorWash : S.surface;
  const stroke = tone === "accent" ? S.accent : tone === "ok" ? S.ok : tone === "error" ? S.error : S.ink2;
  return (
    <g>
      <Box x={x} y={y} w={w} h={26} rx={13} fill={fill} stroke={stroke} />
      <UiText x={x + w / 2} y={y + 18} mono weight={600} anchor="middle">
        {label}
      </UiText>
    </g>
  );
}
const Bar = ({ x, y, w, h = 8 }: { x: number; y: number; w: number; h?: number }) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={S.ruleStrong} opacity={0.8} />;

/* ------------------------------------------------------------------ */
/* Empty states                                                         */
/* ------------------------------------------------------------------ */
const EMPTY_KINDS = [
  { kind: "first use", head: "No loans yet", act: "Browse catalogue" },
  { kind: "no results", head: "No match for “midlemarch”", act: "Search all branches" },
  { kind: "cleared", head: "All loans renewed", act: "View due dates" },
  { kind: "blocked", head: "Staff access only", act: "Ask at the desk" },
] as const;

export const emptyStatesPlate: IllustrationEntry = {
  slug: "empty-states",
  title: "Empty states plate",
  canvas: "sheet",
  description:
    "At the top, the async state model: loading leads to success or error, and success branches into populated or empty. A crossed link from error to empty marks that a failure must never be shown as 'nothing here'. Below, four empty-state cards in the library app, each with a heading and one action: first use ('No loans yet' — Browse catalogue), no results ('No match for midlemarch' — Search all branches), cleared ('All loans renewed' — View due dates) and blocked ('Staff access only' — Ask at the desk).",
  key: [
    { n: "1", label: "Empty is a branch of success", detail: "the request resolved with zero items" },
    { n: "2", label: "Never from error", detail: "a failure gets an error state, not 'nothing here'" },
    { n: "3", label: "Four kinds", detail: "first use, no results, cleared, blocked — different words for each" },
    { n: "4", label: "One next step", detail: "a heading, a reason and one action that works" },
  ],
  Art: ({ detail }) => {
    return (
      <g>
        <Pill x={8} y={30} w={84} label="loading" tone="accent" />
        <Pill x={130} y={10} w={84} label="success" tone="ok" />
        <Pill x={130} y={52} w={84} label="error" tone="error" />
        <Pill x={256} y={0} w={100} label="populated" />
        <Pill x={256} y={34} w={100} label="empty" tone="accent" />
        <Link from={[92, 40]} to={[128, 24]} />
        <Link from={[92, 46]} to={[128, 64]} />
        <Link from={[214, 20]} to={[254, 13]} />
        <Link from={[214, 26]} to={[254, 46]} />
        <line x1={214} y1={64} x2={262} y2={62} stroke={S.error} strokeWidth="1" strokeDasharray="3 2.5" {...hair} />
        <UiText x={226} y={92} mono tone="error">
          never shown as empty
        </UiText>
        <line x1={8} y1={100} x2={392} y2={100} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {EMPTY_KINDS.map((k, i) => {
          const x = 8 + (i % 2) * 196;
          const y = 112 + Math.floor(i / 2) * 92;
          return (
            <g key={k.kind}>
              <Box x={x} y={y} w={188} h={84} />
              <UiText x={x + 12} y={y + 20} mono tone="ink3">
                {k.kind}
              </UiText>
              <UiText x={x + 12} y={y + 42} weight={600}>
                {k.head}
              </UiText>
              <Box x={x + 12} y={y + 52} w={160} h={24} rx={5} fill={S.ink} stroke={S.ink} />
              <UiText x={x + 92} y={y + 69} anchor="middle" tone="surface" weight={600}>
                {k.act}
              </UiText>
            </g>
          );
        })}
        {detail && (
          <>
            <Marker x={392} y={46} n={1} />
            <Marker x={212} y={88} n={2} />
            <Marker x={8} y={108} n={3} />
            <Marker x={392} y={260} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Loading states                                                       */
/* ------------------------------------------------------------------ */
const WAIT_SAMPLES = [0.05, 0.8, 4, 25] as const;
const TIER_LABEL: Record<WaitTier, string> = { none: "nothing", "state-only": "busy state", looped: "spinner", "percent-done": "% done" };
const BANDS = [
  { x: 8, w: 78 },
  { x: 90, w: 92 },
  { x: 186, w: 102 },
  { x: 292, w: 100 },
] as const;

export const loadingStatesPlate: IllustrationEntry = {
  slug: "loading-states",
  title: "Loading states plate",
  canvas: "sheet",
  description: (() => {
    const tiers = WAIT_SAMPLES.map((s) => `${s} s → ${TIER_LABEL[waitFeedback(s)]}`).join("; ");
    return `A wait axis divided at 0.1, 2 and 10 seconds into four bands, each showing the feedback that fits an example wait: ${tiers}. Under the bands, a Renew button as it looks in each: unchanged; reading 'Renewing…'; with a small spinner; and a progress bar at 45% with 'about 20 s left'. Below, the button's state machine ignores a second press while pending, and a status message announces 'Renewing your loan' without moving focus.`;
  })(),
  key: [
    { n: "1", label: "≤ 0.1 s: nothing", detail: "feels instantaneous (Nielsen, after Miller 1968 and Card et al. 1991)" },
    { n: "2", label: "Under 2 s: busy state only", detail: "the control says 'Renewing…'; no looping animation (course reading of the sources)" },
    { n: "3", label: "2–10 s: looped indicator", detail: "NN/g: distracting under 1 s, not recommended beyond 10 s" },
    { n: "4", label: "Over 10 s: percent done", detail: "show progress and time left; announce as a status message" },
  ],
  Art: ({ detail }) => {
    const tiers = WAIT_SAMPLES.map((s) => waitFeedback(s));
    return (
      <g>
        {BANDS.map((b, i) => (
          <g key={i}>
            <Box x={b.x} y={14} w={b.w} h={44} rx={4} fill={i % 2 ? S.soft : S.surface} stroke={S.rule} />
            <UiText x={b.x + b.w / 2} y={32} mono weight={600} anchor="middle">
              {TIER_LABEL[tiers[i]]}
            </UiText>
            <UiText x={b.x + b.w / 2} y={50} mono tone="ink3" anchor="middle">
              {`${WAIT_SAMPLES[i]} s`}
            </UiText>
          </g>
        ))}
        {["0.1 s", "2 s", "10 s"].map((t, i) => (
          <UiText key={t} x={BANDS[i + 1].x - 2} y={76} mono tone="accent" anchor="middle">
            {t}
          </UiText>
        ))}
        {/* buttons */}
        <Box x={14} y={92} w={66} h={28} rx={6} fill={S.ink} stroke={S.ink} />
        <UiText x={47} y={111} anchor="middle" tone="surface" weight={600}>
          Renew
        </UiText>
        <Box x={96} y={92} w={84} h={28} rx={6} fill={S.ink} stroke={S.ink} />
        <UiText x={138} y={111} anchor="middle" tone="surface" weight={600}>
          Renewing…
        </UiText>
        <Box x={192} y={92} w={90} h={28} rx={6} fill={S.ink} stroke={S.ink} />
        <UiText x={226} y={111} anchor="middle" tone="surface" weight={600}>
          Renew
        </UiText>
        <circle cx={266} cy={106} r={7} fill="none" stroke={S.surface} strokeWidth="2" strokeDasharray="22 22" {...hair} />
        <Box x={298} y={92} w={88} h={12} rx={6} fill={S.soft} />
        <rect x={298} y={92} width={40} height={12} rx={6} fill={S.accent} />
        <UiText x={298} y={124} mono tone="ink2">
          45% · ~20 s
        </UiText>
        <line x1={8} y1={146} x2={392} y2={146} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* state machine + status */}
        <Pill x={8} y={168} w={74} label="idle" />
        <Pill x={130} y={168} w={92} label="pending" tone="accent" />
        <Pill x={290} y={168} w={92} label="renewed" tone="ok" />
        <Link from={[82, 181]} to={[128, 181]} />
        <Link from={[222, 181]} to={[288, 181]} />
        <path d="M156 168 C 146 140, 206 140, 196 168" fill="none" stroke={S.ink3} strokeWidth="1" strokeDasharray="3 2.5" {...hair} />
        <UiText x={176} y={216} mono tone="ink3" anchor="middle">
          press ignored
        </UiText>
        <Box x={8} y={238} w={384} h={40} fill={S.soft} />
        <UiText x={20} y={263} mono tone="accent">
          {`role="status"`}
        </UiText>
        <UiText x={150} y={263} tone="ink2">
          Renewing your loan
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={10} n={1} />
            <Marker x={90} y={10} n={2} />
            <Marker x={186} y={10} n={3} />
            <Marker x={392} y={10} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Skeleton screens                                                     */
/* ------------------------------------------------------------------ */
export const skeletonScreensPlate: IllustrationEntry = {
  slug: "skeleton-screens",
  title: "Skeleton screens plate",
  canvas: "sheet",
  description:
    "Two copies of the same catalogue row side by side. On the left, the skeleton: three book cards drawn as grey placeholders, each cover at a 2:3 aspect ratio with two text lines beneath. On the right, the loaded cards with covers and titles in exactly the same positions. Dashed guide lines run across both at the cover tops, cover bottoms and text lines, showing that nothing moves when content arrives. The heading 'Catalogue' is real on both sides. Below, a note that the shimmer sweeps three times and is off under reduced motion, and that placeholders are hidden from screen readers while a single status message says 'Loading catalogue'.",
  key: [
    { n: "1", label: "Same dimensions", detail: "2:3 covers and real line heights reserve the final space" },
    { n: "2", label: "No layout shift", detail: "content replaces placeholders in place (CLS ≤ 0.1 is good)" },
    { n: "3", label: "Real structure stays real", detail: "headings and navigation are never placeholders" },
    { n: "4", label: "Quiet and accessible", detail: "short shimmer, none under reduced motion; placeholders hidden, one status" },
  ],
  Art: ({ detail }) => {
    const cover = { w: 44, h: 66 };
    const cards = [0, 1, 2];
    const top = 46;
    return (
      <g>
        {[0, 1].map((side) => {
          const ox = side === 0 ? 8 : 208;
          return (
            <g key={side}>
              <Box x={ox} y={10} w={184} h={180} />
              <UiText x={ox + 12} y={32} weight={600}>
                Catalogue
              </UiText>
              {cards.map((c) => {
                const x = ox + 12 + c * 58;
                return (
                  <g key={c}>
                    {side === 0 ? (
                      <>
                        <rect x={x} y={top} width={cover.w} height={cover.h} rx={3} fill={S.ruleStrong} opacity={0.7} />
                        <Bar x={x} y={top + cover.h + 10} w={44} />
                        <Bar x={x} y={top + cover.h + 26} w={30} />
                      </>
                    ) : (
                      <>
                        <rect x={x} y={top} width={cover.w} height={cover.h} rx={3} fill={S.accentWash} stroke={S.accent} strokeWidth="0.8" {...hair} />
                        <rect x={x} y={top + cover.h + 10} width={44} height={8} rx={2} fill={S.ink2} />
                        <rect x={x} y={top + cover.h + 26} width={30} height={8} rx={2} fill={S.ink3} />
                      </>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
        {[top, top + cover.h, top + cover.h + 14, top + cover.h + 30].map((y) => (
          <line key={y} x1={8} y1={y} x2={392} y2={y} stroke={S.accent} strokeWidth="0.7" strokeDasharray="3 3" opacity={0.6} {...hair} />
        ))}
        <UiText x={100} y={174} mono tone="ink3" anchor="middle">
          loading
        </UiText>
        <UiText x={300} y={174} mono tone="ink3" anchor="middle">
          loaded
        </UiText>
        <line x1={8} y1={206} x2={392} y2={206} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <UiText x={8} y={232} mono tone="ink2">
          shimmer: 3 sweeps · off with reduced motion
        </UiText>
        <UiText x={8} y={256} mono tone="ink2">
          {`placeholders aria-hidden · 1 role="status"`}
        </UiText>
        <UiText x={8} y={280} tone="ink3">
          heading and navigation render for real
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={top} n={1} />
            <Marker x={392} y={top + cover.h} n={2} />
            <Marker x={192} y={22} n={3} />
            <Marker x={392} y={244} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Progressive loading                                                  */
/* ------------------------------------------------------------------ */
const REGIONS = [
  { name: "shell", start: 0, end: 1, note: "critical" },
  { name: "events", start: 1, end: 3, note: "streamed" },
  { name: "gallery", start: 2, end: 5, note: "lazy" },
  { name: "reviews", start: 3, end: 4, note: "paged" },
] as const;

export const progressiveLoadingPlate: IllustrationEntry = {
  slug: "progressive-loading",
  title: "Progressive loading plate",
  canvas: "sheet",
  description:
    "On the left, a branch page drawn top to bottom: the shell with the heading, hero photo and opening hours rendered first; an events region showing a skeleton until it streams in; a gallery whose images reserve their space and load lazily over blurred placeholders; and reviews loaded one page at a time with a 'Next page' link. On the right, an illustrative timeline with one lane per region, showing the shell finishing first and the other regions resolving later and independently. The hero photo is marked as the largest contentful paint element, loaded with high priority and never lazily.",
  key: [
    { n: "1", label: "Critical shell first", detail: "heading, LCP image (high priority, never lazy) and hours" },
    { n: "2", label: "Streamed regions", detail: "each Suspense boundary shows its skeleton, then its content or error" },
    { n: "3", label: "Lazy media with reserved space", detail: "no layout shift as images arrive" },
    { n: "4", label: "Lists in pages", detail: "pagination or virtualisation; keyboard can always get past" },
  ],
  Art: ({ detail }) => {
    const lane = (i: number) => 52 + i * 52;
    const tx = (t: number) => 236 + t * 30;
    return (
      <g>
        <Box x={8} y={10} w={200} h={282} />
        {/* shell */}
        <UiText x={20} y={32} weight={600}>
          Central Library
        </UiText>
        <rect x={20} y={40} width={176} height={40} rx={3} fill={S.accentWash} stroke={S.accent} strokeWidth="0.8" {...hair} />
        <UiText x={30} y={65} mono tone="accent">
          LCP · high priority
        </UiText>
        <UiText x={20} y={98} tone="ink2">
          Open 9–18
        </UiText>
        {/* events skeleton */}
        <Box x={20} y={108} w={176} h={52} dashed />
        <Bar x={30} y={120} w={120} />
        <Bar x={30} y={136} w={90} />
        <UiText x={186} y={152} mono tone="ink3" anchor="end">
          events
        </UiText>
        {/* gallery */}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={20 + i * 60} y={170} width={56} height={42} rx={3} fill={S.soft} stroke={S.ruleStrong} strokeDasharray="3 2" strokeWidth="0.8" {...hair} />
        ))}
        <UiText x={20} y={228} mono tone="ink3">
          lazy · reserved
        </UiText>
        {/* reviews */}
        <TextBar x={20} y={244} w={150} />
        <TextBar x={20} y={256} w={120} />
        <UiText x={20} y={282} tone="accent">
          Next page →
        </UiText>
        {/* timeline */}
        <UiText x={392} y={22} mono tone="ink3" anchor="end">
          illustrative
        </UiText>
        {REGIONS.map((r, i) => (
          <g key={r.name}>
            <UiText x={230} y={lane(i) - 6} mono>
              {r.name}
            </UiText>
            <line x1={tx(0)} y1={lane(i) + 8} x2={tx(5)} y2={lane(i) + 8} stroke={S.rule} strokeWidth="0.8" {...hair} />
            <rect x={tx(r.start)} y={lane(i) + 2} width={tx(r.end) - tx(r.start)} height={12} rx={6} fill={i === 0 ? S.accent : S.ruleStrong} />
            <UiText x={392} y={lane(i) - 6} mono tone="ink3" anchor="end">
              {r.note}
            </UiText>
          </g>
        ))}
        <line x1={tx(0)} y1={262} x2={tx(5)} y2={262} stroke={S.ink3} strokeWidth="0.9" {...hair} />
        <UiText x={tx(0)} y={282} mono tone="ink3">
          time →
        </UiText>
        {detail && (
          <>
            <Marker x={208} y={40} n={1} />
            <Marker x={208} y={108} n={2} />
            <Marker x={208} y={170} n={3} />
            <Marker x={208} y={262} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Error states                                                         */
/* ------------------------------------------------------------------ */
const BACKOFF_BASE_MS = 250;
const backoff = [1, 2, 3].map((n) => BACKOFF_BASE_MS * 2 ** (n - 1));

export const errorStatesPlate: IllustrationEntry = {
  slug: "error-states",
  title: "Error states plate",
  canvas: "sheet",
  description: `Four error classes as rows, each shown where it happens and with its own recovery. Validation: a date field with an icon and the message 'Enter a date after today' beside the value the person typed. Transient: a banner saying 'Nothing has been booked yet' with Try again, and automatic retries spaced by exponential backoff (${backoff.join(", ")} ms before jitter) with the same idempotency key. Permanent: 'This book is no longer available' with a link to similar titles and no retry. Crash: a dashed error boundary around the events calendar showing 'Calendar couldn't load — Reload calendar' while the rest of the page works. A note marks that the person's input is kept in every case and errors use an icon and text, not colour alone.`,
  key: [
    { n: "1", label: "Validation: fix at the field", detail: "message and icon beside the kept value (SC 3.3.1, 3.3.3)" },
    { n: "2", label: "Transient: safe retry", detail: "backoff with jitter; idempotency key; say whether anything was saved" },
    { n: "3", label: "Permanent: offer an alternative", detail: "retry cannot help, so none is offered" },
    { n: "4", label: "Crash: contain it", detail: "an error boundary keeps the rest of the page usable" },
  ],
  Art: ({ detail }) => {
    const row = (i: number) => 10 + i * 70;
    return (
      <g>
        {/* validation */}
        <UiText x={8} y={row(0) + 16} mono tone="ink3">
          validation
        </UiText>
        <Box x={100} y={row(0)} w={110} h={28} stroke={S.error} />
        <UiText x={110} y={row(0) + 19} mono>
          02/01/2026
        </UiText>
        <circle cx={226} cy={row(0) + 14} r={7} fill="none" stroke={S.error} strokeWidth="1.3" {...hair} />
        <UiText x={226} y={row(0) + 19} anchor="middle" tone="error" weight={700}>
          !
        </UiText>
        <UiText x={240} y={row(0) + 19} tone="error">
          Enter a date after today
        </UiText>
        <UiText x={100} y={row(0) + 48} mono tone="ink3">
          value kept
        </UiText>
        {/* transient */}
        <UiText x={8} y={row(1) + 16} mono tone="ink3">
          transient
        </UiText>
        <Box x={100} y={row(1)} w={292} h={30} fill={S.errorWash} stroke={S.error} />
        <UiText x={110} y={row(1) + 20}>
          Nothing booked yet
        </UiText>
        <UiText x={382} y={row(1) + 20} weight={600} anchor="end">
          Try again
        </UiText>
        {backoff.map((ms, i) => (
          <g key={ms}>
            <circle cx={110 + i * 70} cy={row(1) + 46} r={4} fill={S.ink3} />
            <UiText x={118 + i * 70} y={row(1) + 51} mono tone="ink3">
              {`${ms}`}
            </UiText>
          </g>
        ))}
        <UiText x={392} y={row(1) + 51} mono tone="ink3" anchor="end">
          ms + jitter
        </UiText>
        {/* permanent */}
        <UiText x={8} y={row(2) + 16} mono tone="ink3">
          permanent
        </UiText>
        <UiText x={100} y={row(2) + 16}>
          No longer available
        </UiText>
        <UiText x={100} y={row(2) + 38} tone="accent">
          See similar titles →
        </UiText>
        <UiText x={392} y={row(2) + 16} mono tone="ink3" anchor="end">
          no retry
        </UiText>
        {/* crash */}
        <UiText x={8} y={row(3) + 16} mono tone="ink3">
          crash
        </UiText>
        <Box x={100} y={row(3) - 4} w={200} h={64} dashed stroke={S.error} />
        <UiText x={112} y={row(3) + 20}>
          {`Calendar couldn't load`}
        </UiText>
        <UiText x={112} y={row(3) + 44} weight={600}>
          Reload calendar
        </UiText>
        <UiText x={312} y={row(3) + 20} mono tone="ink3">
          rest of
        </UiText>
        <UiText x={312} y={row(3) + 40} mono tone="ink3">
          page works
        </UiText>
        {detail && (
          <>
            <Marker x={100} y={row(0) - 2} n={1} />
            <Marker x={100} y={row(1) - 2} n={2} />
            <Marker x={240} y={row(2) + 10} n={3} />
            <Marker x={300} y={row(3) - 4} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Data tables                                                          */
/* ------------------------------------------------------------------ */
const TABLE_ROWS = [
  ["Middlemarch", "2 Nov", "£1.20"],
  ["Persuasion", "4 Nov", "£0.80"],
  ["Bleak House", "6 Nov", "£0.40"],
] as const;

export const dataTablesPlate: IllustrationEntry = {
  slug: "data-tables",
  title: "Data tables plate",
  canvas: "sheet",
  description:
    "A table of overdue loans with the caption 'Overdue loans, 248' above it. The header row is shaded and sticky; its 'Due date' header shows an upward arrow and is marked aria-sort ascending. A checkbox column has a select-all control, and each row's checkbox is named after its title, for example 'Select Middlemarch'. The title column is a row header and stays fixed on small screens; the fine column is right-aligned. Below, four small frames show the same table in each async state inside one frame: loading with skeleton rows, empty with a single full-width message, error with a banner and retry above the table, and populated.",
  key: [
    { n: "1", label: "Caption and header cells", detail: "caption, th scope=col and th scope=row (SC 1.3.1)" },
    { n: "2", label: "Sort state exposed", detail: "aria-sort on the sorted header, an arrow, and an announcement" },
    { n: "3", label: "Named selection", detail: "'Select Middlemarch', not 'Select' (SC 4.1.2)" },
    { n: "4", label: "Every state inside the frame", detail: "loading, empty, error and populated; errors never shown as 'no data'" },
  ],
  Art: ({ detail }) => {
    const cols = [8, 40, 180, 290, 392];
    const rh = 28;
    const y0 = 34;
    return (
      <g>
        <UiText x={8} y={22} weight={600}>
          Overdue loans, 248
        </UiText>
        <rect x={8} y={y0} width={384} height={rh} fill={S.soft} />
        <rect x={14} y={y0 + 8} width={12} height={12} rx={2} fill="none" stroke={S.ink2} strokeWidth="1" {...hair} />
        <UiText x={cols[1] + 6} y={y0 + 19} weight={600}>
          Title
        </UiText>
        <UiText x={cols[2] + 6} y={y0 + 19} weight={600} tone="accent">
          Due date ↑
        </UiText>
        <UiText x={cols[4] - 8} y={y0 + 19} weight={600} anchor="end">
          Fine
        </UiText>
        {TABLE_ROWS.map((r, i) => {
          const y = y0 + rh * (i + 1);
          return (
            <g key={r[0]}>
              <line x1={8} y1={y} x2={392} y2={y} stroke={S.rule} strokeWidth="0.8" {...hair} />
              <rect x={14} y={y + 8} width={12} height={12} rx={2} fill={i === 0 ? S.ink : "none"} stroke={S.ink2} strokeWidth="1" {...hair} />
              <UiText x={cols[1] + 6} y={y + 19} weight={600}>
                {r[0]}
              </UiText>
              <UiText x={cols[2] + 6} y={y + 19} mono>
                {r[1]}
              </UiText>
              <UiText x={cols[4] - 8} y={y + 19} mono anchor="end">
                {r[2]}
              </UiText>
            </g>
          );
        })}
        <rect x={8} y={y0} width={384} height={rh * 4} fill="none" stroke={S.ruleStrong} strokeWidth="1" {...hair} />
        <rect x={cols[1]} y={y0} width={cols[2] - cols[1]} height={rh * 4} fill="none" stroke={S.accent} strokeWidth="1" strokeDasharray="3 3" {...hair} />
        <UiText x={8} y={y0 + rh * 4 + 18} mono tone="ink3">
          {`aria-sort="ascending" · "Select Middlemarch"`}
        </UiText>
        {/* four states */}
        {[
          { l: "loading", t: "skel" },
          { l: "empty", t: "empty" },
          { l: "error", t: "error" },
          { l: "populated", t: "rows" },
        ].map((s, i) => {
          const x = 8 + i * 97;
          const y = 190;
          return (
            <g key={s.l}>
              <Box x={x} y={y} w={90} h={72} rx={4} />
              {s.t === "skel" && [0, 1, 2].map((k) => <Bar key={k} x={x + 8} y={y + 14 + k * 16} w={70 - k * 10} />)}
              {s.t === "empty" && (
                <UiText x={x + 45} y={y + 42} anchor="middle" tone="ink3">
                  No loans
                </UiText>
              )}
              {s.t === "error" && (
                <>
                  <rect x={x + 6} y={y + 8} width={78} height={22} rx={3} fill={S.errorWash} stroke={S.error} strokeWidth="0.8" {...hair} />
                  <UiText x={x + 45} y={y + 24} anchor="middle" tone="error">
                    Retry
                  </UiText>
                </>
              )}
              {s.t === "rows" && [0, 1, 2].map((k) => <line key={k} x1={x + 8} y1={y + 18 + k * 16} x2={x + 82} y2={y + 18 + k * 16} stroke={S.ink3} strokeWidth="1.2" {...hair} />)}
              <UiText x={x + 45} y={y + 92} mono tone="ink2" anchor="middle">
                {s.l}
              </UiText>
            </g>
          );
        })}
        {detail && (
          <>
            <Marker x={170} y={14} n={1} />
            <Marker x={290} y={y0 - 2} n={2} />
            <Marker x={372} y={y0 + rh * 4 + 14} n={3} />
            <Marker x={392} y={186} n={4} />
          </>
        )}
      </g>
    );
  },
};

