"use client";
/**
 * Level-3 interactive concept explorers. Every quantity is computed by the
 * tested functions in lib/formulas — never re-implemented here.
 * Each explorer states what is manipulated, what the concept predicts, its
 * assumptions and what the demonstration cannot establish.
 */
import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { chunk, peakEnd } from "@/lib/formulas/experience";
import { fittsId, hickInformation, hickInformationEqual } from "@/lib/formulas/pointing";
import type { ExplorerId } from "../illustration-types";
import { C, Cursor, Dim, Label, STROKE } from "../primitives";

function Slider({ label, value, min, max, step = 1, onChange, unit = "", format }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; unit?: string; format?: (v: number) => string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-ink">
        <span>{label}</span>
        <span className="formula tabular text-ink-2">
          {format ? format(value) : value}
          {unit}
        </span>
      </label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2 w-full" />
    </div>
  );
}

function Shell({ title, controls, canvas, readout, predicts, assumptions, cannot, link }: { title: string; controls: ReactNode; canvas: ReactNode; readout: ReactNode; predicts: string; assumptions: string; cannot: string; link?: { href: string; label: string } }) {
  return (
    <section aria-label={`${title} explorer`} className="overflow-hidden rounded-md border border-rule bg-surface">
      <div className="grid md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="border-b border-rule bg-c-wash md:border-b-0 md:border-r">{canvas}</div>
        <div className="flex flex-col gap-5 p-5">
          <p className="label">Explore · {title}</p>
          {controls}
          <div aria-live="polite" className="rounded-sm border border-rule bg-paper p-3">
            {readout}
          </div>
        </div>
      </div>
      <dl className="grid gap-4 border-t border-rule p-5 text-sm sm:grid-cols-3">
        <div>
          <dt className="t-sub text-ink">What the concept predicts</dt>
          <dd className="mt-1 text-ink-2">{predicts}</dd>
        </div>
        <div>
          <dt className="t-sub text-ink">Assumptions</dt>
          <dd className="mt-1 text-ink-2">{assumptions}</dd>
        </div>
        <div>
          <dt className="t-sub text-ink">What this cannot show</dt>
          <dd className="mt-1 text-ink-2">{cannot}</dd>
        </div>
      </dl>
      {link && (
        <p className="border-t border-rule px-5 py-3 text-sm">
          <Link className="link" href={link.href}>
            {link.label} →
          </Link>
        </p>
      )}
    </section>
  );
}

/* ---------------- Fitts ---------------- */
function FittsExplorer() {
  const [D, setD] = useState(240);
  const [W, setW] = useState(32);
  const id = fittsId(D, W);
  const x0 = 50;
  const tx = x0 + D;
  return (
    <Shell
      title="Fitts's law"
      canvas={
        <svg viewBox="0 0 400 240" className="h-auto w-full" role="img" aria-label={`Start point and a target ${D} pixels away and ${W} pixels wide. Index of difficulty ${id.toFixed(2)} bits.`}>
          <rect x={tx - W / 2} y={40} width={W} height={150} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
          <path d={`M${x0} 160 C ${x0 + D * 0.35} 90, ${x0 + D * 0.75} 90, ${tx} 115`} fill="none" stroke={C.line} strokeWidth={STROKE.main} strokeDasharray="1 6" strokeLinecap="round" />
          <circle cx={x0} cy={160} r={7} fill={C.paper} stroke={C.line} strokeWidth={STROKE.main} />
          <Cursor x={tx - 2} y={110} />
          <Dim x1={x0} y1={214} x2={tx} y2={214} label={`D = ${D}`} />
          <Dim x1={tx - W / 2} y1={26} x2={tx + W / 2} y2={26} label={`W = ${W}`} />
        </svg>
      }
      controls={
        <>
          <Slider label="Distance D" value={D} min={40} max={320} step={10} onChange={setD} unit=" px" />
          <Slider label="Width W" value={W} min={6} max={120} step={2} onChange={setW} unit=" px" />
        </>
      }
      readout={
        <>
          <p className="formula text-xl text-ink">ID = {id.toFixed(2)} bits</p>
          <p className="mt-1 text-sm text-ink-2">
            log₂({D}/{W} + 1). {id > 4 ? "A hard target: far and small." : id < 2 ? "An easy target: near and large." : "Moderate difficulty."} Halve the distance or double the width and the ratio — and the difficulty — is the same.
          </p>
        </>
      }
      predicts="Movement time rises linearly with ID, so harder ratios take longer to hit."
      assumptions="Rapid aimed movement to a known target; width measured along the approach axis."
      cannot="Real times. Those need a and b fitted to your device and users — measure yours in the lab."
      link={{ href: "/labs/fitts-lab", label: "Measure your own a and b in the Fitts's law experiment" }}
    />
  );
}

/* ---------------- Hick-Hyman ---------------- */
function HickExplorer() {
  const [n, setN] = useState(8);
  const [skew, setSkew] = useState(false);
  const probs = skew ? [0.5, ...Array(n - 1).fill(0.5 / Math.max(1, n - 1))] : Array(n).fill(1 / n);
  const H = n === 1 ? 0 : skew ? hickInformation(probs).H : hickInformationEqual(n);
  const cols = Math.ceil(Math.sqrt(n));
  return (
    <Shell
      title="Hick-Hyman law"
      canvas={
        <svg viewBox="0 0 400 240" className="h-auto w-full" role="img" aria-label={`${n} choices${skew ? ", one chosen half the time" : ", equally likely"}. Information ${H.toFixed(2)} bits.`}>
          {probs.map((p, i) => {
            const c = i % cols;
            const r = Math.floor(i / cols);
            const cell = Math.min(300 / cols, 190 / Math.ceil(n / cols));
            const size = Math.max(8, Math.sqrt(p / Math.max(...probs)) * (cell - 10));
            const cx = 200 - (cols * cell) / 2 + c * cell + cell / 2;
            const cy = 120 - (Math.ceil(n / cols) * cell) / 2 + r * cell + cell / 2;
            return <rect key={i} x={cx - size / 2} y={cy - size / 2} width={size} height={size} rx={3} fill={i === 0 && skew ? C.base : C.soft} stroke={C.line} strokeWidth={STROKE.fine} />;
          })}
          <Label x={200} y={228} tone="line">area ∝ probability</Label>
        </svg>
      }
      controls={
        <>
          <Slider label="Number of choices n" value={n} min={1} max={16} onChange={setN} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={skew} onChange={(e) => setSkew(e.target.checked)} disabled={n < 2} /> One option is chosen half the time
          </label>
        </>
      }
      readout={
        <>
          <p className="formula text-xl text-ink">H = {H.toFixed(2)} bits</p>
          <p className="mt-1 text-sm text-ink-2">
            {skew ? "Unequal probabilities carry less information than equal ones — predictable choices are faster." : `log₂(${n}). Doubling the choices adds one bit.`}
          </p>
        </>
      }
      predicts="Choice reaction time grows linearly with information H, not with the raw number of options."
      assumptions="Practised, known stimulus–response mappings; the learner knows the probabilities."
      cannot="Menu-search time: scanning an unfamiliar list is visual search, which grows roughly linearly with items."
      link={{ href: "/labs/hick-lab", label: "Measure your own choice reaction times" }}
    />
  );
}

/* ---------------- Peak-end ---------------- */
function PeakEndExplorer() {
  const [m, setM] = useState([2, 3, 4, 8, 4, 3, 5, 6]);
  const r = peakEnd(m);
  const xs = (i: number) => 40 + (i / (m.length - 1)) * 320;
  const ys = (v: number) => 200 - v * 17;
  return (
    <Shell
      title="Peak-end rule"
      canvas={
        <svg viewBox="0 0 400 240" className="h-auto w-full" role="img" aria-label={`Experience curve. Peak ${r.peakValue}, end ${r.end}, peak-end average ${r.peakEndAverage}, moment-by-moment mean ${r.mean.toFixed(1)}.`}>
          <line x1="40" y1="200" x2="364" y2="200" stroke={C.line} strokeWidth={STROKE.fine} />
          <path d={"M" + m.map((v, i) => `${xs(i)} ${ys(v)}`).join(" L")} fill="none" stroke={C.line} strokeWidth={STROKE.main} />
          <line x1="40" y1={ys(r.peakEndAverage)} x2="364" y2={ys(r.peakEndAverage)} stroke={C.ink} strokeDasharray="6 4" strokeWidth={STROKE.fine} />
          <line x1="40" y1={ys(r.mean)} x2="364" y2={ys(r.mean)} stroke={C.mute} strokeDasharray="2 4" strokeWidth={STROKE.fine} />
          {m.map((v, i) => (
            <circle key={i} cx={xs(i)} cy={ys(v)} r={i === r.peakIndex || i === m.length - 1 ? 8 : 5} fill={i === r.peakIndex || i === m.length - 1 ? C.base : C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
          ))}
          <Label x={360} y={ys(r.peakEndAverage) - 6} anchor="end">peak-end {r.peakEndAverage.toFixed(1)}</Label>
          <Label x={360} y={ys(r.mean) + 14} anchor="end" tone="mute">mean {r.mean.toFixed(1)}</Label>
        </svg>
      }
      controls={
        <fieldset>
          <legend className="text-sm font-medium">Pleasantness of each moment (0–10)</legend>
          <div className="mt-2 grid grid-cols-4 gap-x-3 gap-y-2">
            {m.map((v, i) => (
              <label key={i} className="text-xs text-ink-3">
                {i + 1}
                <input type="range" min={0} max={10} value={v} aria-label={`Moment ${i + 1}`} onChange={(e) => setM((x) => x.map((y, j) => (j === i ? Number(e.target.value) : y)))} className="w-full" />
              </label>
            ))}
          </div>
        </fieldset>
      }
      readout={
        <>
          <p className="formula text-xl text-ink">peak-end {r.peakEndAverage.toFixed(1)} · mean {r.mean.toFixed(1)}</p>
          <p className="mt-1 text-sm text-ink-2">Raise only the last moment: the remembered rating moves, though most of the experience is unchanged. Lengthening a mild ending can make the memory better while the total gets worse.</p>
        </>
      }
      predicts="Remembered ratings track the average of the most intense and final moments more than the duration-weighted total."
      assumptions="One continuous episode with a clear end; ratings on a single pleasantness scale."
      cannot="That every product experience behaves this way — evidence comes mainly from medical and lab episodes."
    />
  );
}

/* ---------------- Chunking ---------------- */
function ChunkingExplorer() {
  const [text, setText] = useState("0207946083");
  const [size, setSize] = useState(1);
  const chunks = chunk(text.replace(/\D/g, "").slice(0, 16) || "0", size);
  const id = useId();
  return (
    <Shell
      title="Chunking"
      canvas={
        <div className="flex min-h-56 flex-wrap content-center items-center justify-center gap-2 p-6" aria-hidden>
          {chunks.map((c, i) => (
            <span key={i} className={`formula rounded-sm border border-line-control px-2.5 py-1.5 text-xl ${chunks.length <= 4 ? "bg-c-ink text-paper" : "bg-surface text-ink"}`}>
              {c}
            </span>
          ))}
        </div>
      }
      controls={
        <>
          <div>
            <label htmlFor={id} className="text-sm font-medium">
              Digits to remember
            </label>
            <input id={id} value={text} onChange={(e) => setText(e.target.value)} inputMode="numeric" className="formula mt-1 h-10 w-full rounded-sm border border-line-control bg-surface px-3" />
          </div>
          <Slider label="Group size" value={size} min={1} max={5} onChange={setSize} />
        </>
      }
      readout={
        <p className="text-sm text-ink-2">
          <span className="formula text-xl text-ink">{chunks.length} chunks</span> — {chunks.length <= 4 ? "within the ≈ 4-chunk estimate of working-memory capacity." : "more than the ≈ 4 chunks most people can hold without rehearsal."}
        </p>
      }
      predicts="Grouping items into meaningful units lets more raw information fit into a limited working memory."
      assumptions="Chunks only help when they are meaningful or practised; the ≈ 4 figure is Cowan's estimate, not Miller's 7 ± 2."
      cannot="How many menu items to show — choosing from visible options is recognition, not recall."
    />
  );
}

/* ---------------- Gestalt (proximity + similarity) ---------------- */
function GestaltExplorer() {
  const [gap, setGap] = useState(18);
  const [similar, setSimilar] = useState(false);
  const step = 30;
  const x = (c: number) => 40 + c * step + Math.floor(c / 2) * gap;
  return (
    <Shell
      title="Grouping"
      canvas={
        <svg viewBox="0 0 400 240" className="h-auto w-full" role="img" aria-label={`Dot grid. Pair gap ${gap} pixels; ${similar ? "rows alternate colour" : "all dots alike"}.`}>
          {[0, 1, 2, 3].flatMap((r) =>
            [0, 1, 2, 3, 4, 5, 6, 7].map((c) => <circle key={`${r}${c}`} cx={x(c)} cy={60 + r * 40} r={8} fill={similar && r % 2 ? C.base : C.line} />),
          )}
        </svg>
      }
      controls={
        <>
          <Slider label="Gap between column pairs (proximity)" value={gap} min={0} max={40} onChange={setGap} unit=" px" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={similar} onChange={(e) => setSimilar(e.target.checked)} /> Colour alternate rows (similarity)
          </label>
        </>
      }
      readout={
        <p className="text-sm text-ink-2">
          {similar && gap > 14 ? "Two cues now compete: spacing pulls columns into pairs, colour pulls rows together. Which wins depends on their relative strength." : gap > 14 ? "Spacing groups the dots into column pairs." : similar ? "Colour groups the dots into rows." : "A near-uniform grid: no strong grouping."}
        </p>
      }
      predicts="Elements that are close, or alike, are perceived as belonging together."
      assumptions="What you perceive is subjective; the explorer arranges cues, it cannot measure your perception."
      cannot="A universal ranking of principles — their strength depends on magnitudes and context."
      link={{ href: "/labs/gestalt-lab", label: "Open the full grouping lab (closure, region, connectedness)" }}
    />
  );
}

/* ---------------- Cognitive load (information density) ---------------- */
function CognitiveLoadExplorer() {
  const [noise, setNoise] = useState(2);
  const extras = ["Promo banner", "Social links", "Newsletter box", "Unrelated tips", "Decorative badge", "Secondary nav", "Chat bubble", "Legal footnote"];
  return (
    <Shell
      title="Information density"
      canvas={
        <div className="p-5" aria-hidden>
          <div className="mx-auto max-w-xs space-y-2 rounded-sm border border-line-control bg-surface p-4">
            <p className="text-sm font-semibold text-ink">Pay invoice</p>
            {extras.slice(0, noise).map((e, i) => (
              <div key={e} className={`rounded-xs border border-dashed border-rule-strong px-2 py-1 text-xs text-ink-3 ${i % 2 ? "ml-6" : ""}`}>
                {e}
              </div>
            ))}
            <div className="rounded-xs border border-line-control px-2 py-1.5 text-xs text-ink-2">Amount · £120.00</div>
            <div className="rounded-xs bg-c-ink px-2 py-1.5 text-center text-xs font-semibold text-paper">Pay now</div>
          </div>
        </div>
      }
      controls={<Slider label="Elements unrelated to the task" value={noise} min={0} max={extras.length} onChange={setNoise} />}
      readout={
        <p className="text-sm text-ink-2">
          <span className="formula text-xl text-ink">{2 + noise} elements</span>, of which {noise} do not help the task. {noise > 4 ? "Each one must be noticed and dismissed — extraneous load." : "The task-relevant elements stand out."}
        </p>
      }
      predicts="Removing material that does not serve the task frees limited working memory for the task itself."
      assumptions="The 'unrelated' elements are irrelevant to this learner's goal; relevance differs between people."
      cannot="Measure your load — the full lab compares your time and errors between a dense and a structured layout."
      link={{ href: "/labs/cognitive-load-lab", label: "Run the cognitive load comparison" }}
    />
  );
}

/* ---------------- Signifiers ---------------- */
function SignifiersExplorer() {
  const cues = [
    { id: "label", name: "Text label" },
    { id: "chevron", name: "Chevron" },
    { id: "edge", name: "Raised edge" },
    { id: "underline", name: "Underline" },
    { id: "cursor", name: "Pointer on hover" },
  ] as const;
  const [on, setOn] = useState<Record<string, boolean>>({ label: false, chevron: false, edge: false, underline: false, cursor: false });
  const count = Object.values(on).filter(Boolean).length;
  return (
    <Shell
      title="Signifiers"
      canvas={
        <svg viewBox="0 0 400 240" className="h-auto w-full" role="img" aria-label={`A rectangular element with ${count} of 5 cues showing it can be clicked.`}>
          {on.edge && <rect x="114" y="98" width="180" height="56" rx="5" fill={C.ink} opacity="0.28" />}
          <rect x="110" y="92" width="180" height="56" rx="5" fill={count ? C.ink : C.soft} stroke={on.edge ? C.line : "none"} strokeWidth={STROKE.main} />
          {on.label && (
            <text x="140" y="126" fontSize="16" fill={C.paper} fontFamily="var(--font-plex-sans), sans-serif" fontWeight="600">
              Continue
            </text>
          )}
          {on.chevron && <path d="M262 110 l10 10 -10 10" fill="none" stroke={C.paper} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
          {on.underline && <line x1="140" y1="164" x2="262" y2="164" stroke={C.ink} strokeWidth={STROKE.main} />}
          {on.cursor && <Cursor x={250} y={128} />}
        </svg>
      }
      controls={
        <fieldset>
          <legend className="text-sm font-medium">Add perceivable cues</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {cues.map((c) => (
              <label key={c.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={on[c.id]} onChange={(e) => setOn((s) => ({ ...s, [c.id]: e.target.checked }))} /> {c.name}
              </label>
            ))}
          </div>
        </fieldset>
      }
      readout={
        <p className="text-sm text-ink-2">
          {count === 0 ? "A flat shape: it may well be clickable — the affordance can exist — but nothing signals it." : `${count} cue${count > 1 ? "s" : ""} now communicate what the element does and where to act. A label usually does more than any visual effect.`}
        </p>
      }
      predicts="Perceivable cues make an element's possible actions discoverable without trial and error."
      assumptions="Cues are read through convention; what reads as clickable depends on the platform and the user's experience."
      cannot="How clear the element is for real users — only testing with them shows that."
    />
  );
}

const EXPLORERS: Record<ExplorerId, () => React.JSX.Element> = {
  fitts: FittsExplorer,
  hick: HickExplorer,
  "peak-end": PeakEndExplorer,
  chunking: ChunkingExplorer,
  gestalt: GestaltExplorer,
  "cognitive-load": CognitiveLoadExplorer,
  signifiers: SignifiersExplorer,
};

export function ConceptExplorer({ id }: { id: ExplorerId }) {
  const E = EXPLORERS[id];
  return <E />;
}
