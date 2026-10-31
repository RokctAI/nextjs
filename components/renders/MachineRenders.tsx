"use client";

import { useId, type ReactNode } from "react";

/* Hydraulic, plant and cleaning renders on a 400×400 canvas. Machined steel is
   built from banded linear gradients; painted parts use a lit base, an
   occlusion pass and a specular streak. */

interface RenderProps {
  className?: string;
  title: string;
  dark?: boolean;
}

function useIds() {
  const uid = useId().replace(/:/g, "");
  return { id: (n: string) => `${uid}-${n}`, url: (n: string) => `url(#${uid}-${n})` };
}

function Frame({ className, title, children }: RenderProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={title}>
      {children}
    </svg>
  );
}

function Chrome({ id, vertical = true }: { id: string; vertical?: boolean }) {
  return (
    <linearGradient id={id} x1="0" x2={vertical ? "0" : "1"} y1="0" y2={vertical ? "1" : "0"}>
      <stop offset="0" stopColor="#8a929c" />
      <stop offset="0.18" stopColor="#f7f8fa" />
      <stop offset="0.38" stopColor="#b9c0c9" />
      <stop offset="0.62" stopColor="#6c737d" />
      <stop offset="0.82" stopColor="#d5dae0" />
      <stop offset="1" stopColor="#7a818b" />
    </linearGradient>
  );
}

function Paint({ id, from, mid, to }: { id: string; from: string; mid: string; to: string }) {
  return (
    <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stopColor={from} />
      <stop offset="0.35" stopColor={mid} />
      <stop offset="1" stopColor={to} />
    </linearGradient>
  );
}

function Shadow({ id, cx, cy, rx, dark }: { id: string; cx: number; cy: number; rx: number; dark?: boolean }) {
  return (
    <>
      <filter id={id} x="-30%" y="-200%" width="160%" height="500%">
        <feGaussianBlur stdDeviation="9" />
      </filter>
      <ellipse cx={cx} cy={cy} rx={rx} ry="11" fill="#000" opacity={dark ? 0.6 : 0.26} filter={`url(#${id})`} />
    </>
  );
}

/* ---------- Hydraulic cylinder ---------- */
export function CylinderRender(props: RenderProps) {
  const { id, url } = useIds();
  return (
    <Frame {...props}>
      <defs>
        <Paint id={id("barrel")} from="#3b8fd6" mid="#1670b8" to="#0b3b66" />
        <Chrome id={id("rod")} />
        <Chrome id={id("steel")} />
      </defs>
      <Shadow id={id("sh")} cx={205} cy={262} rx={170} dark={props.dark} />
      <g transform="rotate(-14 200 200)">
        {/* base clevis */}
        <rect x="28" y="176" width="44" height="48" rx="8" fill={url("steel")} />
        <circle cx="38" cy="200" r="22" fill={url("steel")} />
        <circle cx="38" cy="200" r="9" fill="#24272c" />
        {/* barrel */}
        <rect x="62" y="166" width="196" height="68" rx="10" fill={url("barrel")} />
        <rect x="70" y="173" width="180" height="6" rx="3" fill="#fff" opacity="0.32" />
        <rect x="62" y="222" width="196" height="12" rx="6" fill="#000" opacity="0.18" />
        {/* ports */}
        {[96, 222].map((x) => (
          <g key={x}>
            <rect x={x - 9} y="150" width="18" height="18" rx="3" fill={url("steel")} />
            <path d={`M${x - 11} 150 h22 l-3 -10 h-16 z`} fill={url("steel")} />
          </g>
        ))}
        {/* gland */}
        <rect x="252" y="160" width="30" height="80" rx="6" fill={url("steel")} />
        <rect x="258" y="160" width="3" height="80" fill="#fff" opacity="0.4" />
        {/* chrome rod */}
        <rect x="282" y="186" width="96" height="28" rx="4" fill={url("rod")} />
        {/* rod eye */}
        <circle cx="378" cy="200" r="20" fill={url("steel")} />
        <circle cx="378" cy="200" r="8" fill="#24272c" />
      </g>
    </Frame>
  );
}

/* ---------- Hose assembly ---------- */
export function HoseRender(props: RenderProps) {
  const { id, url } = useIds();
  const P = "M86 318 C70 210 150 150 214 196 C274 240 344 196 320 92";
  const fitting = (x: number, y: number, rot: number) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x="-15" y="-6" width="30" height="34" rx="3" fill={url("ferrule")} />
      {[2, 9, 16].map((yy) => (
        <rect key={yy} x="-15" y={yy} width="30" height="2" fill="#5d646e" opacity="0.6" />
      ))}
      <path d="M-17 28 h34 l4 8 v12 l-4 8 h-34 l-4 -8 v-12 z" fill={url("nut")} />
      <rect x="-6" y="56" width="12" height="16" rx="2" fill={url("ferrule")} />
    </g>
  );
  return (
    <Frame {...props}>
      <defs>
        <linearGradient id={id("rubber")} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#3a3d43" />
          <stop offset="1" stopColor="#141518" />
        </linearGradient>
        <Chrome id={id("ferrule")} vertical={false} />
        <linearGradient id={id("nut")} x1="0" x2="1">
          <stop offset="0" stopColor="#c99a2e" />
          <stop offset="0.45" stopColor="#f6d77a" />
          <stop offset="1" stopColor="#9a7420" />
        </linearGradient>
      </defs>
      <Shadow id={id("sh")} cx={200} cy={352} rx={140} dark={props.dark} />
      <path d={P} fill="none" stroke={url("rubber")} strokeWidth="30" strokeLinecap="round" />
      <path d={P} fill="none" stroke="#5a5f68" strokeWidth="30" strokeDasharray="1.5 7" strokeLinecap="butt" opacity="0.55" />
      <path d={P} fill="none" stroke="#fff" strokeWidth="4" opacity="0.18" transform="translate(-6 -6)" strokeLinecap="round" />
      {fitting(86, 318, 172)}
      {fitting(320, 92, 190)}
    </Frame>
  );
}

/* ---------- Fittings ---------- */
export function FittingRender(props: RenderProps) {
  const { id, url } = useIds();
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a) * 0.62).toFixed(1)}`;
    }).join(" ");
  return (
    <Frame {...props}>
      <defs>
        <Chrome id={id("steel")} vertical={false} />
        <linearGradient id={id("brass")} x1="0" x2="1">
          <stop offset="0" stopColor="#b88a24" />
          <stop offset="0.4" stopColor="#f5d57a" />
          <stop offset="1" stopColor="#8f6a1c" />
        </linearGradient>
      </defs>
      <Shadow id={id("sh")} cx={200} cy={318} rx={150} dark={props.dark} />
      {/* elbow fitting */}
      <g>
        <path d="M70 300 v-90 a50 50 0 0 1 50 -50 h40" fill="none" stroke={url("steel")} strokeWidth="34" />
        <rect x="52" y="282" width="36" height="34" rx="3" fill={url("brass")} />
        <rect x="150" y="142" width="34" height="36" rx="3" fill={url("brass")} />
      </g>
      {/* straight union */}
      <g>
        <rect x="212" y="226" width="160" height="30" rx="4" fill={url("steel")} />
        <polygon points={hex(262, 241, 30)} fill={url("brass")} />
        <polygon points={hex(322, 241, 30)} fill={url("brass")} />
        <rect x="244" y="226" width="4" height="30" fill="#fff" opacity="0.4" />
      </g>
      {/* tee */}
      <g>
        <rect x="222" y="104" width="130" height="30" rx="4" fill={url("steel")} />
        <rect x="272" y="104" width="30" height="80" rx="4" fill={url("steel")} />
        <rect x="266" y="98" width="42" height="42" rx="6" fill={url("brass")} />
        <circle cx="287" cy="119" r="8" fill="#5b4310" opacity="0.6" />
      </g>
    </Frame>
  );
}

/* ---------- Pump ---------- */
export function PumpRender(props: RenderProps) {
  const { id, url } = useIds();
  return (
    <Frame {...props}>
      <defs>
        <Paint id={id("body")} from="#3b8fd6" mid="#1670b8" to="#0b3b66" />
        <Chrome id={id("steel")} />
        <radialGradient id={id("face")} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#4fa1e2" />
          <stop offset="1" stopColor="#0c4170" />
        </radialGradient>
      </defs>
      <Shadow id={id("sh")} cx={200} cy={312} rx={150} dark={props.dark} />
      {/* mounting flange */}
      <rect x="60" y="150" width="34" height="140" rx="6" fill={url("steel")} />
      {[166, 274].map((y) => (
        <circle key={y} cx="77" cy={y} r="6" fill="#2a2d33" />
      ))}
      {/* body */}
      <rect x="92" y="162" width="200" height="116" rx="18" fill={url("body")} />
      <rect x="104" y="170" width="176" height="8" rx="4" fill="#fff" opacity="0.28" />
      {[132, 172, 212, 252].map((x) => (
        <rect key={x} x={x} y="162" width="4" height="116" fill="#06223c" opacity="0.35" />
      ))}
      {/* end housing */}
      <ellipse cx="292" cy="220" rx="26" ry="58" fill={url("face")} />
      <ellipse cx="296" cy="220" rx="12" ry="26" fill={url("steel")} />
      {/* shaft */}
      <rect x="20" y="210" width="44" height="20" rx="3" fill={url("steel")} />
      {/* ports */}
      <rect x="160" y="118" width="40" height="46" rx="4" fill={url("steel")} />
      <rect x="152" y="110" width="56" height="14" rx="3" fill={url("steel")} />
      <rect x="226" y="126" width="30" height="38" rx="4" fill={url("steel")} />
      <rect x="220" y="118" width="42" height="12" rx="3" fill={url("steel")} />
    </Frame>
  );
}

/* ---------- Oil ---------- */
export function OilRender(props: RenderProps) {
  const { id, url } = useIds();
  return (
    <Frame {...props}>
      <defs>
        <linearGradient id={id("drum")} x1="0" x2="1">
          <stop offset="0" stopColor="#0b3b66" />
          <stop offset="0.35" stopColor="#2f86cf" />
          <stop offset="0.55" stopColor="#1670b8" />
          <stop offset="1" stopColor="#082b4b" />
        </linearGradient>
        <linearGradient id={id("amber")} x1="0" x2="1">
          <stop offset="0" stopColor="#9a6a10" />
          <stop offset="0.45" stopColor="#f2c14e" />
          <stop offset="1" stopColor="#8a5c0c" />
        </linearGradient>
        <Chrome id={id("steel")} vertical={false} />
      </defs>
      <Shadow id={id("sh")} cx={200} cy={344} rx={140} dark={props.dark} />
      {/* drum */}
      <rect x="110" y="96" width="150" height="240" rx="10" fill={url("drum")} />
      <ellipse cx="185" cy="98" rx="75" ry="14" fill="#0e4a7e" />
      <ellipse cx="185" cy="96" rx="70" ry="11" fill="#2b7fc5" />
      <circle cx="215" cy="96" r="7" fill={url("steel")} />
      {[160, 270].map((y) => (
        <rect key={y} x="110" y={y} width="150" height="8" fill="#06223c" opacity="0.4" />
      ))}
      <rect x="132" y="190" width="106" height="56" rx="4" fill="#f4f2ec" opacity="0.92" />
      <rect x="144" y="204" width="56" height="7" rx="3" fill="#0b3b66" />
      <rect x="144" y="218" width="80" height="5" rx="2.5" fill="#8b929c" />
      <rect x="144" y="228" width="64" height="5" rx="2.5" fill="#8b929c" />
      {/* bottle */}
      <path d="M266 200 h44 l10 18 v118 a8 8 0 0 1 -8 8 h-48 a8 8 0 0 1 -8 -8 v-118 z" fill={url("amber")} opacity="0.95" />
      <rect x="276" y="182" width="24" height="20" rx="3" fill="#1d1f24" />
      <rect x="264" y="250" width="58" height="40" rx="3" fill="#f4f2ec" opacity="0.9" />
      <rect x="272" y="262" width="34" height="5" rx="2.5" fill="#1670b8" />
      <rect x="272" y="272" width="42" height="4" rx="2" fill="#8b929c" />
      <rect x="262" y="214" width="6" height="110" rx="3" fill="#fff" opacity="0.3" />
    </Frame>
  );
}

/* ---------- Gears (plant maintenance) ---------- */
function gearPath(cx: number, cy: number, r: number, teeth: number, depth: number) {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const corners = [
      [a - step * 0.28, r - depth],
      [a - step * 0.16, r],
      [a + step * 0.16, r],
      [a + step * 0.28, r - depth],
    ];
    corners.forEach(([ang, rad]) => pts.push(`${(cx + rad * Math.cos(ang)).toFixed(1)},${(cy + rad * Math.sin(ang)).toFixed(1)}`));
  }
  return `M${pts.join(" L")} Z`;
}

export function GearsRender(props: RenderProps) {
  const { id, url } = useIds();
  return (
    <Frame {...props}>
      <defs>
        <radialGradient id={id("steel")} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#f4f6f8" />
          <stop offset="0.5" stopColor="#a9b0ba" />
          <stop offset="1" stopColor="#5f6670" />
        </radialGradient>
        <radialGradient id={id("blue")} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#5aa8e6" />
          <stop offset="0.55" stopColor="#1670b8" />
          <stop offset="1" stopColor="#0a3459" />
        </radialGradient>
        <radialGradient id={id("gold")} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fbe3a0" />
          <stop offset="0.6" stopColor="#e2ad2c" />
          <stop offset="1" stopColor="#8f6514" />
        </radialGradient>
      </defs>
      <Shadow id={id("sh")} cx={200} cy={350} rx={150} dark={props.dark} />
      <g className="origin-[150px_210px] motion-safe:animate-[spin_24s_linear_infinite]">
        <path d={gearPath(150, 210, 104, 14, 16)} fill={url("blue")} />
        <circle cx="150" cy="210" r="62" fill="#0b3b66" opacity="0.35" />
        <circle cx="150" cy="210" r="46" fill={url("steel")} />
        <circle cx="150" cy="210" r="16" fill="#1f2227" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (Math.PI / 3) * i;
          return <circle key={i} cx={+(150 + 30 * Math.cos(a)).toFixed(2)} cy={+(210 + 30 * Math.sin(a)).toFixed(2)} r="5" fill="#5f6670" />;
        })}
      </g>
      <g className="origin-[292px_134px] motion-safe:animate-[spin_14s_linear_infinite_reverse]">
        <path d={gearPath(292, 134, 64, 9, 13)} fill={url("gold")} />
        <circle cx="292" cy="134" r="28" fill={url("steel")} />
        <circle cx="292" cy="134" r="10" fill="#1f2227" />
      </g>
      <ellipse cx="118" cy="160" rx="40" ry="16" fill="#fff" opacity="0.16" transform="rotate(-35 118 160)" />
    </Frame>
  );
}

/* ---------- Spray lance (industrial cleaning) ---------- */
export function SprayRender(props: RenderProps) {
  const { id, url } = useIds();
  const drops = [
    [232, 170, 4],
    [262, 150, 3],
    [286, 196, 5],
    [314, 164, 3.5],
    [300, 232, 4],
    [338, 210, 3],
    [262, 214, 3],
    [346, 140, 2.5],
    [324, 268, 3.5],
    [356, 250, 2.5],
    [280, 124, 2.5],
  ];
  return (
    <Frame {...props}>
      <defs>
        <linearGradient id={id("fan")} x1="0" x2="1">
          <stop offset="0" stopColor="#bfe0fb" stopOpacity="0.95" />
          <stop offset="1" stopColor="#bfe0fb" stopOpacity="0" />
        </linearGradient>
        <Chrome id={id("steel")} />
        <Paint id={id("grip")} from="#3b8fd6" mid="#1670b8" to="#0b3b66" />
        <radialGradient id={id("drop")} cx="0.35" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#7fbdf0" />
        </radialGradient>
      </defs>
      <Shadow id={id("sh")} cx={190} cy={338} rx={150} dark={props.dark} />
      {/* spray fan */}
      <path d="M206 214 L388 96 L388 330 Z" fill={url("fan")} opacity="0.75" />
      <path d="M206 214 L388 150 M206 214 L388 214 M206 214 L388 280" stroke="#fff" strokeOpacity="0.5" strokeDasharray="2 6" />
      {drops.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={url("drop")} />
      ))}
      {/* lance */}
      <rect x="40" y="206" width="160" height="14" rx="7" fill={url("steel")} transform="rotate(-8 120 213)" />
      <rect x="186" y="200" width="26" height="22" rx="4" fill="#f2c14e" transform="rotate(-8 199 211)" />
      {/* trigger gun */}
      <path d="M30 212 h64 v20 c0 8 -6 12 -14 12 h-10 l-10 58 c-1 6 -6 10 -12 10 h-8 c-7 0 -11 -6 -10 -12 l10 -58 c-8 -2 -10 -8 -10 -14 z" fill={url("grip")} />
      <path d="M70 246 q14 18 2 34" fill="none" stroke="#14171b" strokeWidth="6" strokeLinecap="round" />
      <rect x="34" y="216" width="50" height="5" rx="2.5" fill="#fff" opacity="0.3" />
    </Frame>
  );
}

/* ---------- Chemical bottle (cleaning chemicals / domestic) ---------- */
export function BottleRender(props: RenderProps) {
  const { id, url } = useIds();
  return (
    <Frame {...props}>
      <defs>
        <linearGradient id={id("bottle")} x1="0" x2="1">
          <stop offset="0" stopColor="#d9dde2" />
          <stop offset="0.35" stopColor="#ffffff" />
          <stop offset="1" stopColor="#b5bbc3" />
        </linearGradient>
        <Paint id={id("trigger")} from="#3b8fd6" mid="#1670b8" to="#0b3b66" />
        <linearGradient id={id("liquid")} x1="0" x2="1">
          <stop offset="0" stopColor="#0f5794" />
          <stop offset="0.5" stopColor="#5aa8e6" />
          <stop offset="1" stopColor="#0f5794" />
        </linearGradient>
      </defs>
      <Shadow id={id("sh")} cx={200} cy={346} rx={110} dark={props.dark} />
      {/* spray bottle */}
      <path d="M130 140 h70 l14 34 v150 a14 14 0 0 1 -14 14 h-70 a14 14 0 0 1 -14 -14 v-150 z" fill={url("bottle")} />
      <path d="M118 250 h96 v74 a14 14 0 0 1 -14 14 h-68 a14 14 0 0 1 -14 -14 z" fill={url("liquid")} opacity="0.85" />
      <rect x="128" y="180" width="76" height="54" rx="4" fill="#fff" />
      <rect x="138" y="192" width="40" height="7" rx="3" fill="#0f5794" />
      <rect x="138" y="206" width="56" height="5" rx="2.5" fill="#8b929c" />
      <rect x="138" y="216" width="46" height="5" rx="2.5" fill="#8b929c" />
      <rect x="140" y="104" width="50" height="38" rx="6" fill={url("trigger")} />
      <path d="M140 104 h-40 a8 8 0 0 0 -8 8 v6 h48 z" fill={url("trigger")} />
      <path d="M150 142 q-6 24 -24 30" fill="none" stroke="#0b3b66" strokeWidth="8" strokeLinecap="round" />
      <rect x="124" y="160" width="6" height="160" rx="3" fill="#fff" opacity="0.7" />
      {/* canister */}
      <path d="M232 170 h80 a10 10 0 0 1 10 10 v148 a10 10 0 0 1 -10 10 h-80 a10 10 0 0 1 -10 -10 v-148 a10 10 0 0 1 10 -10 z" fill={url("bottle")} />
      <rect x="250" y="148" width="40" height="24" rx="4" fill="#f2c14e" />
      <path d="M296 180 h16 a6 6 0 0 1 6 6 v40 a6 6 0 0 1 -6 6 h-16 z" fill="#fff" opacity="0.6" />
      <rect x="234" y="236" width="76" height="60" rx="4" fill="#0f5794" />
      <rect x="244" y="250" width="42" height="6" rx="3" fill="#fff" />
      <rect x="244" y="262" width="56" height="4" rx="2" fill="#9cc6ec" />
    </Frame>
  );
}

/* ---------- Laundry: folded workwear stack ---------- */
export function LaundryRender(props: RenderProps) {
  const { id, url } = useIds();
  const layers = [
    { y: 270, c1: "#0b3b66", c2: "#1670b8" },
    { y: 222, c1: "#5e636b", c2: "#8b9098" },
    { y: 174, c1: "#0f5794", c2: "#3b8fd6" },
    { y: 126, c1: "#c9c5bc", c2: "#efece6" },
  ];
  return (
    <Frame {...props}>
      <defs>
        {layers.map((l, i) => (
          <linearGradient key={i} id={id(`l${i}`)} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={l.c2} />
            <stop offset="1" stopColor={l.c1} />
          </linearGradient>
        ))}
      </defs>
      <Shadow id={id("sh")} cx={200} cy={330} rx={140} dark={props.dark} />
      {layers.map((l, i) => (
        <g key={i}>
          <rect x="84" y={l.y} width="232" height="50" rx="16" fill={url(`l${i}`)} />
          <rect x="96" y={l.y + 6} width="208" height="4" rx="2" fill="#fff" opacity="0.28" />
          <path d={`M110 ${l.y + 40} h180`} stroke="#fff" strokeOpacity="0.25" strokeDasharray="3 4" />
        </g>
      ))}
      <rect x="84" y="140" width="232" height="9" fill="#d7dbe0" />
      <rect x="84" y="143" width="232" height="3" fill="#fff" />
    </Frame>
  );
}

/* ---------- Excavator (Yellow machines) ---------- */
export function ExcavatorRender(props: RenderProps) {
  const { id, url } = useIds();
  return (
    <Frame {...props}>
      <defs>
        <Paint id={id("paint")} from="#f8d77a" mid="#e9b52c" to="#a8780f" />
        <linearGradient id={id("track")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3b3e44" />
          <stop offset="1" stopColor="#121316" />
        </linearGradient>
        <linearGradient id={id("glass")} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#cfe5f7" />
          <stop offset="1" stopColor="#4b7aa3" />
        </linearGradient>
        <Chrome id={id("rod")} />
      </defs>
      <Shadow id={id("sh")} cx={186} cy={330} rx={160} dark={props.dark} />
      {/* tracks */}
      <rect x="40" y="276" width="220" height="48" rx="24" fill={url("track")} />
      {Array.from({ length: 11 }, (_, i) => (
        <rect key={i} x={52 + i * 19} y="316" width="10" height="8" rx="2" fill="#0a0a0c" />
      ))}
      {[66, 110, 154, 198, 236].map((x) => (
        <circle key={x} cx={x} cy="300" r="12" fill="#2b2e33" stroke="#555a62" strokeWidth="2" />
      ))}
      {/* upper body */}
      <rect x="54" y="226" width="196" height="50" rx="8" fill={url("paint")} />
      <rect x="42" y="236" width="40" height="40" rx="6" fill="#2a2c31" />
      <rect x="64" y="232" width="176" height="5" rx="2.5" fill="#fff" opacity="0.4" />
      {/* cab */}
      <path d="M150 226 v-74 a8 8 0 0 1 8 -8 h52 a10 10 0 0 1 10 8 l20 74 z" fill={url("paint")} />
      <path d="M160 220 v-62 a4 4 0 0 1 4 -4 h42 a6 6 0 0 1 6 5 l16 61 z" fill={url("glass")} />
      <path d="M170 160 l20 58" stroke="#fff" strokeOpacity="0.5" strokeWidth="6" />
      {/* boom */}
      <path d="M232 236 L300 120 L320 128 L262 244 Z" fill={url("paint")} />
      <path d="M300 120 L356 186 L342 198 L292 140 Z" fill={url("paint")} />
      <rect x="250" y="170" width="70" height="10" rx="5" fill={url("rod")} transform="rotate(-60 285 175)" />
      <circle cx="304" cy="124" r="10" fill="#2a2c31" />
      {/* bucket */}
      <path d="M340 186 l36 18 c4 30 -4 54 -24 70 l-40 -4 c10 -18 12 -40 4 -62 z" fill="#2c2e33" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${318 + i * 12} ${268 + i * 2} l-6 14 l12 -2 z`} fill="#c9ced6" />
      ))}
      <circle cx="350" cy="194" r="7" fill={url("rod")} />
    </Frame>
  );
}

/* ---------- Parts: bucket tooth, bearing, filter ---------- */
export function PartsRender(props: RenderProps) {
  const { id, url } = useIds();
  return (
    <Frame {...props}>
      <defs>
        <radialGradient id={id("steel")} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#f6f7f9" />
          <stop offset="0.55" stopColor="#a4abb5" />
          <stop offset="1" stopColor="#5d646e" />
        </radialGradient>
        <Paint id={id("paint")} from="#f8d77a" mid="#e9b52c" to="#a8780f" />
        <Paint id={id("filter")} from="#3b8fd6" mid="#1670b8" to="#0b3b66" />
      </defs>
      <Shadow id={id("sh")} cx={200} cy={322} rx={160} dark={props.dark} />
      {/* bearing */}
      <circle cx="132" cy="236" r="82" fill={url("steel")} />
      <circle cx="132" cy="236" r="60" fill="#2b2e33" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (Math.PI / 5) * i;
        return <circle key={i} cx={+(132 + 48 * Math.cos(a)).toFixed(2)} cy={+(236 + 48 * Math.sin(a)).toFixed(2)} r="11" fill={url("steel")} />;
      })}
      <circle cx="132" cy="236" r="34" fill={url("steel")} />
      <circle cx="132" cy="236" r="20" fill="#1c1e22" />
      {/* filter canister */}
      <rect x="236" y="120" width="92" height="176" rx="14" fill={url("filter")} />
      <rect x="236" y="120" width="92" height="22" rx="10" fill="#0b3b66" />
      <rect x="248" y="150" width="8" height="136" rx="4" fill="#fff" opacity="0.3" />
      {[176, 200, 224, 248].map((y) => (
        <rect key={y} x="236" y={y} width="92" height="3" fill="#06223c" opacity="0.4" />
      ))}
      {/* bucket tooth */}
      <path d="M232 318 l60 -36 l70 10 l-16 26 z" fill={url("paint")} />
      <path d="M292 282 l70 10 l-16 26 l-54 -2 z" fill="#000" opacity="0.15" />
    </Frame>
  );
}
