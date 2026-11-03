"use client";
/**
 * Steering law tunnel experiment (Accot & Zhai 1997). The learner drags a
 * pointer along straight tunnels of different length A and width W without
 * touching the walls. Movement times for successful trials are regressed on
 * the steering index ID = A / W (lib/formulas/pointing.ts → steeringId).
 * Nothing is simulated: every number shown comes from this browser's trials.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { linearFit } from "@/lib/formulas/math";
import { steeringId } from "@/lib/formulas/pointing";
import { actions } from "@/lib/store/store";
import { ScatterFit } from "./charts";

const WIDTHS = [24, 40, 72];
const LENGTHS = [0.5, 0.9]; // fraction of the usable stage width
const REPEATS = 3;
const START = 44; // start / end zone width (px)

type Condition = { lengthFrac: number; width: number };
type Trial = { A: number; W: number; id: number; time: number; ok: boolean };

function plan(): Condition[] {
  const list: Condition[] = [];
  for (const lengthFrac of LENGTHS) for (const width of WIDTHS) for (let r = 0; r < REPEATS; r++) list.push({ lengthFrac, width });
  // Fisher–Yates shuffle so conditions are not blocked
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export function SteeringLab() {
  const stage = useRef<HTMLDivElement>(null);
  const [stageW, setStageW] = useState(640);
  const [queue, setQueue] = useState<Condition[]>([]);
  const [index, setIndex] = useState(-1);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [state, setState] = useState<"idle" | "ready" | "steering">("idle");
  const [message, setMessage] = useState("");
  const t0 = useRef(0);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setStageW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const running = index >= 0 && index < queue.length;
  const done = queue.length > 0 && index >= queue.length;
  const cond = running ? queue[index] : undefined;
  const usable = stageW - 2 * START - 32;
  const A = cond ? Math.round(usable * cond.lengthFrac) : 0;
  const W = cond?.width ?? 0;
  const left = (stageW - A) / 2; // tunnel start x
  const cy = 110; // tunnel centre y

  function start() {
    setQueue(plan());
    setIndex(0);
    setTrials([]);
    setState("ready");
    setMessage("Press in the start zone, then drag right through the tunnel to the finish.");
  }

  function finish(ok: boolean, time: number) {
    setTrials((t) => [...t, { A, W, id: steeringId([{ length: A, width: W }]), time, ok }]);
    if (ok) {
      setMessage(`${(time * 1000).toFixed(0)} ms — next tunnel.`);
      setIndex((i) => i + 1);
    } else {
      setMessage("You touched the wall — that attempt is recorded as an error. Try the same tunnel again.");
    }
    setState("ready");
  }

  function local(e: React.PointerEvent) {
    const r = stage.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function onDown(e: React.PointerEvent) {
    if (!running || state !== "ready") return;
    const p = local(e);
    if (p.x >= left - START && p.x <= left && Math.abs(p.y - cy) <= W / 2) {
      stage.current?.setPointerCapture?.(e.pointerId);
      setState("steering");
      t0.current = 0; // timing starts when the pointer enters the tunnel
      setMessage("");
    }
  }

  function onMove(e: React.PointerEvent) {
    if (state !== "steering") return;
    const p = local(e);
    if (p.x > left && t0.current === 0) t0.current = performance.now();
    if (p.x > left && Math.abs(p.y - cy) > W / 2) return finish(false, (performance.now() - (t0.current || performance.now())) / 1000);
    if (p.x >= left + A && t0.current) finish(true, (performance.now() - t0.current) / 1000);
  }

  function onUp() {
    if (state === "steering") {
      setState("ready");
      setMessage("Released before the finish — press in the start zone to try this tunnel again.");
    }
  }

  const summary = useMemo(() => {
    const ok = trials.filter((t) => t.ok);
    const groups = new Map<string, Trial[]>();
    for (const t of ok) {
      const k = `${t.A}×${t.W}`;
      (groups.get(k) ?? groups.set(k, []).get(k)!).push(t);
    }
    const rows = [...groups.values()]
      .map((g) => ({ A: g[0].A, W: g[0].W, id: g[0].id, mean: g.reduce((s, t) => s + t.time, 0) / g.length, n: g.length, errors: trials.filter((t) => !t.ok && t.A === g[0].A && t.W === g[0].W).length }))
      .sort((a, b) => a.id - b.id);
    const fit = rows.length >= 3 ? linearFit(rows.map((r) => r.id), rows.map((r) => r.mean)) : undefined;
    return { rows, fit, errors: trials.filter((t) => !t.ok).length };
  }, [trials]);

  useEffect(() => {
    if (done && summary.fit) actions.recordLabRun("steering-lab", `a = ${summary.fit.intercept.toFixed(3)} s, b = ${(summary.fit.slope * 1000).toFixed(1)} ms per unit ID, R² = ${summary.fit.r2.toFixed(2)}, ${summary.errors} wall contacts`);
  }, [done, summary.fit, summary.errors]);

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3">
          <p className="text-sm text-ink-2" aria-live="polite">
            {!running && !done && `${LENGTHS.length * WIDTHS.length} tunnels × ${REPEATS}, in random order. Needs a mouse, trackpad, pen or touch.`}
            {running && `Tunnel ${index + 1} of ${queue.length} · A = ${A} px, W = ${W} px · ID = ${(A / W).toFixed(1)}`}
            {done && "Finished — your results are below."}
          </p>
          <button type="button" onClick={start} className="h-9 rounded-sm bg-accent px-4 text-sm font-medium text-surface hover:bg-accent-ink">
            {index < 0 ? "Start" : "Restart"}
          </button>
        </div>
        <div
          ref={stage}
          role="application"
          aria-label="Steering area: drag from the start zone through the tunnel to the finish zone"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="relative h-56 touch-none select-none bg-soft"
        >
          {running && (
            <svg width={stageW} height={224} className="absolute inset-0" aria-hidden>
              <rect x={left - START} y={cy - W / 2} width={START} height={W} rx={4} className="fill-accent-wash stroke-accent" strokeWidth={1.5} />
              <rect x={left} y={cy - W / 2} width={A} height={W} className={state === "steering" ? "fill-c-wash" : "fill-surface"} />
              <line x1={left} x2={left + A} y1={cy - W / 2} y2={cy - W / 2} className="stroke-ink" strokeWidth={2} />
              <line x1={left} x2={left + A} y1={cy + W / 2} y2={cy + W / 2} className="stroke-ink" strokeWidth={2} />
              <rect x={left + A} y={cy - W / 2} width={START} height={W} rx={4} className="fill-ok-wash stroke-ok" strokeWidth={1.5} />
              <text x={left - START / 2} y={cy + W / 2 + 18} textAnchor="middle" className="fill-ink-2 text-[11px]">
                start
              </text>
              <text x={left + A + START / 2} y={cy + W / 2 + 18} textAnchor="middle" className="fill-ink-2 text-[11px]">
                finish
              </text>
            </svg>
          )}
          {!running && (
            <p className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-ink-3">{done ? "All tunnels complete." : "Press Start to show the first tunnel."}</p>
          )}
        </div>
        <p className="min-h-6 px-5 py-2.5 text-sm text-ink-2" aria-live="assertive">
          {message}
        </p>
      </div>

      {summary.rows.length > 0 && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="min-w-0 overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="label pb-2 text-left">Your data (successful trials)</caption>
              <thead>
                <tr className="border-b border-rule-strong text-left text-ink-3">
                  <th className="py-1.5 font-medium">A (px)</th>
                  <th className="font-medium">W (px)</th>
                  <th className="font-medium">ID = A/W</th>
                  <th className="font-medium">Mean time</th>
                  <th className="font-medium">Wall contacts</th>
                </tr>
              </thead>
              <tbody className="formula tabular">
                {summary.rows.map((r) => (
                  <tr key={`${r.A}-${r.W}`} className="border-b border-rule">
                    <td className="py-1.5">{r.A}</td>
                    <td>{r.W}</td>
                    <td>{r.id.toFixed(1)}</td>
                    <td>{(r.mean * 1000).toFixed(0)} ms</td>
                    <td>{r.errors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {summary.fit && (
              <p className="formula mt-4 text-sm">
                T ≈ {summary.fit.intercept.toFixed(3)} + {(summary.fit.slope * 1000).toFixed(1)} ms × ID · R² {summary.fit.r2.toFixed(2)}
              </p>
            )}
          </div>
          <ScatterFit
            title="Mean steering time against the steering index A/W; values in the adjacent table."
            points={summary.rows.map((r) => ({ x: r.id, y: r.mean }))}
            fit={summary.fit}
            xLabel="Steering index A/W"
            yLabel="Mean time (s)"
          />
        </div>
      )}
      {done && (
        <div className="rounded-lg bg-soft p-5 text-sm text-ink-2 ring-1 ring-rule">
          <p className="t-sub text-ink">Interpreting your result</p>
          <p className="mt-2">
            The steering law predicts time grows <em>linearly</em> with A/W — not logarithmically as in Fitts&apos;s law — because the constraint applies along the whole
            path, not only at the end. A high R² with only six conditions is easy to get and is weak evidence on its own. Wall contacts count speed–accuracy trade-off:
            if narrow tunnels produced many errors, you were going faster than the width allowed, and the slope understates the real cost of narrow paths such as
            cascading menus.
          </p>
        </div>
      )}
    </div>
  );
}
