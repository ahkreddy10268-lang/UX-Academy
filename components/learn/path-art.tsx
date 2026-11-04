/**
 * Path artwork: one small original scene per learning path, drawn from the
 * subject itself (a sitemap for information architecture, a contrast pair for
 * accessibility, a confidence band for metrics). Same 400×300 plate language as
 * components/illustrations — token colours only (var(--c*), --ink, --surface),
 * no text that carries meaning, decorative (the card title names the path).
 * These are NOT registry plates: they are keyed by path id, not by entry slug.
 */
import type { ReactNode } from "react";
import type { Palette } from "@/lib/content/categories";

const L = "var(--ink)"; // neutral line
const B = "var(--c)"; // solid category fill
const S = "var(--c-soft)";
const I = "var(--c-ink)";
const P = "var(--surface)"; // paper knock-out
const W = 2.25;
const stroke = { stroke: L, strokeWidth: W, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Palette each path is drawn in (presentation only). */
export const PATH_PALETTE: Record<string, Palette> = {
  "ux-fundamentals": "core",
  "ui-fundamentals": "peach",
  "product-design": "indigo",
  "interaction-design": "cyan",
  "hci-fundamentals": "violet",
  "cognitive-psychology": "violet",
  "ux-research": "teal",
  "usability-engineering": "rose",
  "information-architecture": "cyan",
  "visual-design": "peach",
  "design-systems": "peach",
  accessibility: "green",
  "product-strategy": "indigo",
  "advanced-ux-metrics": "blue",
  "ai-ux": "indigo",
  "service-design": "slate",
};

/** Colour-family class for a path (shared by the catalogue card and the path hero). */
export const pathCat = (id: string) => `cat-${PATH_PALETTE[id] ?? "core"}`;

const Screen = ({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children?: ReactNode }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={10} fill={P} {...stroke} />
    <rect x={x} y={y} width={w} height={16} rx={10} fill={S} stroke="none" />
    <rect x={x} y={y + 10} width={w} height={6} fill={S} stroke="none" />
    {children}
  </g>
);
const Person = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-26} r={11} fill={B} {...stroke} />
    <path d="M-20 14c0-18 8-28 20-28s20 10 20 28z" fill={S} {...stroke} />
  </g>
);

const scenes: Record<string, ReactNode> = {
  // a person's journey: need → screen → outcome
  "ux-fundamentals": (
    <>
      <path d="M70 200C130 120 190 250 250 170S330 120 340 130" fill="none" stroke={L} strokeWidth={W} strokeDasharray="2 8" strokeLinecap="round" />
      <Person x={70} y={205} />
      <Screen x={165} y={120} w={90} h={70}>
        <rect x={177} y={148} width={40} height={8} rx={4} fill={B} />
        <rect x={177} y={164} width={62} height={6} rx={3} fill={S} />
      </Screen>
      <circle cx={335} cy={125} r={26} fill={B} {...stroke} />
      <path d="M323 126l8 8 14-16" fill="none" stroke={P} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // a screen with type scale, grid and swatches
  "ui-fundamentals": (
    <>
      <Screen x={60} y={50} w={200} h={200}>
        <text x={78} y={102} fontSize={40} fontWeight={700} fill={I} fontFamily="var(--font-newsreader), serif">Aa</text>
        <rect x={78} y={118} width={120} height={7} rx={3.5} fill={L} opacity={0.75} />
        <rect x={78} y={132} width={96} height={6} rx={3} fill={L} opacity={0.35} />
        {[0, 1, 2].map((i) => <rect key={i} x={78 + i * 56} y={156} width={48} height={52} rx={6} fill={i === 1 ? B : S} {...stroke} strokeWidth={1.25} />)}
        <rect x={78} y={218} width={70} height={18} rx={9} fill={B} />
      </Screen>
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={310} cy={80 + i * 46} r={17} fill={i % 2 ? S : B} {...stroke} />)}
    </>
  ),
  // two diamonds (discover/define → develop/deliver) feeding a rising metric
  "product-design": (
    <>
      <path d="M40 150l50-60 50 60-50 60z" fill={S} {...stroke} />
      <path d="M140 150l50-60 50 60-50 60z" fill={B} {...stroke} />
      <circle cx={140} cy={150} r={7} fill={P} {...stroke} />
      <path d="M260 210V150M290 210V120M320 210V84M350 210V50" {...stroke} strokeWidth={14} stroke={S} />
      <path d="M255 190L300 140l25-20 40-50" fill="none" stroke={L} strokeWidth={W} strokeLinecap="round" />
      <path d="M40 232h320" stroke={L} strokeWidth={1.25} />
    </>
  ),
  // pointer travelling to a target, with a button pressed
  "interaction-design": (
    <>
      {[70, 46, 22].map((r, i) => <circle key={r} cx={290} cy={110} r={r} fill={i === 2 ? B : i === 1 ? S : "none"} {...stroke} strokeWidth={i ? W : 1.25} />)}
      <path d="M60 220C120 220 170 150 262 118" fill="none" stroke={L} strokeWidth={W} strokeDasharray="2 8" strokeLinecap="round" />
      <path d="M262 118l-6 24 10-8 12 18 8-5-12-18 12-3z" fill={P} {...stroke} strokeWidth={1.75} />
      <rect x={60} y={232} width={130} height={36} rx={18} fill={B} {...stroke} />
      <path d="M215 250h40" stroke={L} strokeWidth={W} strokeLinecap="round" />
    </>
  ),
  // human ↔ machine action cycle
  "hci-fundamentals": (
    <>
      <Person x={90} y={170} s={1.5} />
      <Screen x={250} y={80} w={110} h={140}>
        <rect x={264} y={112} width={82} height={44} rx={6} fill={S} />
        <circle cx={305} cy={188} r={12} fill={B} />
      </Screen>
      <path d="M150 120C185 80 215 80 245 105" fill="none" {...stroke} />
      <path d="M238 96l10 10-14 3" fill="none" {...stroke} />
      <path d="M250 200C215 245 185 245 150 215" fill="none" {...stroke} stroke={I} />
      <path d="M156 206l-8 10 14 4" fill="none" {...stroke} stroke={I} />
    </>
  ),
  // head with memory slots and grouped chunks
  "cognitive-psychology": (
    <>
      <path d="M110 250V190C70 170 80 120 110 100c10-30 40-50 80-50 50 0 80 30 80 70 0 30-14 44-24 56v74z" fill={S} {...stroke} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={150 + i * 28} y={110} width={20} height={20} rx={5} fill={i < 3 ? B : P} {...stroke} strokeWidth={1.75} />)}
      <path d="M150 160h104" stroke={L} strokeWidth={1.25} strokeDasharray="3 6" />
      {[0, 1, 2].map((i) => <circle key={i} cx={165 + i * 30} cy={190} r={9} fill={P} {...stroke} strokeWidth={1.75} />)}
      <path d="M300 190h60M300 215h40M300 240h50" stroke={L} strokeWidth={5} strokeLinecap="round" opacity={0.35} />
    </>
  ),
  // magnifier over sticky notes and a speech bubble
  "ux-research": (
    <>
      {[[50, 70, 70], [135, 90, 64], [70, 160, 64], [160, 175, 70]].map(([x, y, s], i) => (
        <rect key={i} x={x} y={y} width={s} height={s} rx={6} fill={i % 2 ? S : B} {...stroke} strokeWidth={1.75} transform={`rotate(${(i - 1.5) * 4} ${x + s / 2} ${y + s / 2})`} />
      ))}
      <circle cx={270} cy={130} r={52} fill={P} fillOpacity={0.7} {...stroke} />
      <path d="M308 168l48 48" {...stroke} strokeWidth={9} />
      <path d="M244 118h52M244 134h34" stroke={L} strokeWidth={5} strokeLinecap="round" opacity={0.55} />
      <path d="M300 40h66a10 10 0 0 1 10 10v26a10 10 0 0 1-10 10h-40l-16 14v-14h-10a10 10 0 0 1-10-10V50a10 10 0 0 1 10-10z" fill={S} {...stroke} strokeWidth={1.75} />
    </>
  ),
  // task checklist with stopwatch
  "usability-engineering": (
    <>
      <rect x={50} y={50} width={190} height={200} rx={12} fill={P} {...stroke} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={72} y={78 + i * 55} width={26} height={26} rx={6} fill={i < 2 ? B : P} {...stroke} strokeWidth={1.75} />
          {i < 2 && <path d={`M78 ${91 + i * 55}l5 5 9-11`} fill="none" stroke={P} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />}
          <rect x={112} y={86 + i * 55} width={100 - i * 18} height={8} rx={4} fill={L} opacity={0.4} />
        </g>
      ))}
      <circle cx={310} cy={150} r={52} fill={S} {...stroke} />
      <path d="M310 98V84M296 84h28M310 150V118M310 150l24 14" fill="none" {...stroke} />
      <path d="M310 98a52 52 0 0 1 40 30" fill="none" stroke={B} strokeWidth={8} strokeLinecap="round" />
    </>
  ),
  // sitemap tree
  "information-architecture": (
    <>
      <path d="M200 90V120M80 120h240M80 120v30M200 120v30M320 120v30M60 190v-0M80 190v30M200 190v30M320 190v30M200 150" fill="none" {...stroke} strokeWidth={1.75} />
      <rect x={150} y={52} width={100} height={38} rx={10} fill={B} {...stroke} />
      {[80, 200, 320].map((x) => (
        <g key={x}>
          <rect x={x - 44} y={150} width={88} height={34} rx={9} fill={S} {...stroke} />
          <rect x={x - 32} y={220} width={64} height={28} rx={8} fill={P} {...stroke} strokeWidth={1.75} />
        </g>
      ))}
    </>
  ),
  // hierarchy of shapes + colour swatches
  "visual-design": (
    <>
      <circle cx={120} cy={120} r={62} fill={B} {...stroke} />
      <rect x={200} y={90} width={80} height={80} rx={10} fill={S} {...stroke} />
      <path d="M320 170l32-56 32 56z" fill={P} {...stroke} transform="translate(-24 6)" />
      {["var(--c)", "var(--c-soft)", "var(--c-wash)", "var(--surface)"].map((f, i) => <circle key={i} cx={100 + i * 56} cy={240} r={16} fill={f} {...stroke} strokeWidth={1.75} />)}
    </>
  ),
  // tokens → components → screens
  "design-systems": (
    <>
      {[0, 1, 2].map((i) => <rect key={i} x={50} y={60 + i * 62} width={44} height={44} rx={8} fill={i === 1 ? B : S} {...stroke} />)}
      <path d="M100 82h50M100 144h50M100 206h50" {...stroke} strokeWidth={1.75} stroke={L} strokeDasharray="2 6" />
      <rect x={150} y={60} width={100} height={170} rx={12} fill={P} {...stroke} />
      <rect x={166} y={80} width={68} height={30} rx={15} fill={B} />
      <rect x={166} y={124} width={68} height={12} rx={6} fill={S} />
      <rect x={166} y={146} width={46} height={12} rx={6} fill={S} />
      <rect x={166} y={178} width={68} height={34} rx={8} fill={S} {...stroke} strokeWidth={1.25} />
      <path d="M256 144h40" {...stroke} strokeWidth={1.75} strokeDasharray="2 6" />
      {[0, 1].map((i) => <rect key={i} x={304} y={84 + i * 80} width={58} height={96 - 20} rx={8} fill={i ? S : B} {...stroke} />)}
    </>
  ),
  // contrast pair, keyboard key and focus ring
  accessibility: (
    <>
      <circle cx={110} cy={120} r={66} fill={P} {...stroke} />
      <path d="M110 54a66 66 0 0 1 0 132z" fill={L} />
      <circle cx={110} cy={120} r={66} fill="none" {...stroke} />
      <rect x={220} y={64} width={80} height={72} rx={12} fill={S} {...stroke} />
      <path d="M244 100h32M262 84v32" {...stroke} strokeWidth={1.75} />
      <rect x={210} y={170} width={140} height={60} rx={14} fill={B} {...stroke} />
      <rect x={202} y={162} width={156} height={76} rx={19} fill="none" stroke={I} strokeWidth={2} strokeDasharray="5 5" />
      <rect x={40} y={232} width={140} height={14} rx={7} fill={L} opacity={0.2} />
    </>
  ),
  // axes, a direction and a goal flag
  "product-strategy": (
    <>
      <path d="M60 50V240H350" fill="none" {...stroke} />
      <path d="M60 240L140 200 190 205 250 130 320 80" fill="none" stroke={B} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 240L140 220 220 215 330 210" fill="none" stroke={L} strokeWidth={1.75} strokeDasharray="3 7" strokeLinecap="round" />
      <path d="M320 80V40" {...stroke} /><path d="M320 40h34l-8 12 8 12h-34z" fill={B} {...stroke} strokeWidth={1.75} />
      <circle cx={190} cy={205} r={9} fill={P} {...stroke} />
    </>
  ),
  // trend line with confidence band
  "advanced-ux-metrics": (
    <>
      <path d="M50 250H360M50 250V50" fill="none" {...stroke} strokeWidth={1.75} />
      <path d="M60 200L120 170 180 180 240 120 300 100 350 90V150L300 160 240 180 180 220 120 215 60 235z" fill={S} opacity={0.9} />
      <path d="M60 218L120 192 180 200 240 150 300 130 350 120" fill="none" stroke={I} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      {[[60, 218], [120, 192], [180, 200], [240, 150], [300, 130], [350, 120]].map(([x, y]) => <circle key={x} cx={x} cy={y} r={5} fill={P} {...stroke} strokeWidth={1.75} />)}
    </>
  ),
  // conversation with a machine, uncertainty as a confidence bar
  "ai-ux": (
    <>
      <path d="M50 60h160a12 12 0 0 1 12 12v50a12 12 0 0 1-12 12H100l-28 24v-24H62a12 12 0 0 1-12-12V72a12 12 0 0 1 12-12z" fill={P} {...stroke} />
      <path d="M70 84h110M70 102h70" stroke={L} strokeWidth={5} strokeLinecap="round" opacity={0.4} />
      <path d="M190 170h150a12 12 0 0 1 12 12v50a12 12 0 0 1-12 12h-10v24l-28-24H190a12 12 0 0 1-12-12v-50a12 12 0 0 1 12-12z" fill={B} {...stroke} />
      <path d="M270 214l5-14 5 14 14 5-14 5-5 14-5-14-14-5z" fill={P} stroke="none" transform="translate(-20 -14)" />
      <rect x={60} y={190} width={96} height={10} rx={5} fill={P} {...stroke} strokeWidth={1.75} />
      <rect x={60} y={190} width={62} height={10} rx={5} fill={I} />
    </>
  ),
  // blueprint: lanes with a line of visibility
  "service-design": (
    <>
      {[0, 1, 2].map((i) => <rect key={i} x={40} y={50 + i * 66} width={320} height={56} rx={8} fill={i === 2 ? S : P} {...stroke} strokeWidth={1.25} />)}
      <path d="M40 182H360" stroke={I} strokeWidth={2.5} strokeDasharray="8 6" />
      {[[80, 78], [170, 78], [260, 78]].map(([x, y]) => <circle key={x} cx={x} cy={y} r={14} fill={B} {...stroke} strokeWidth={1.75} />)}
      {[[110, 144], [200, 144], [290, 144]].map(([x, y]) => <rect key={x} x={x - 20} y={y - 12} width={40} height={24} rx={7} fill={S} {...stroke} strokeWidth={1.75} />)}
      <rect x={140} y={222} width={120} height={22} rx={7} fill={P} {...stroke} strokeWidth={1.75} />
      <path d="M80 92V140M170 92l-30 40M260 92l-30 40M200 156V222" fill="none" stroke={L} strokeWidth={1.25} />
    </>
  ),
};

export function PathArt({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 300" className="block h-auto w-full bg-c-wash" aria-hidden focusable="false">
      {scenes[id] ?? null}
    </svg>
  );
}
