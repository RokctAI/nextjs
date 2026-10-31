"use client";

import { useId } from "react";

/* Sector illustrations on an 800×500 canvas. Calm, layered landscapes in the
   brand palette: depth comes from atmospheric gradients rather than outlines. */

export type SceneKind = "mining" | "agriculture" | "government";

interface SceneProps {
  kind: SceneKind;
  className?: string;
}

export default function Scene({ kind, className = "" }: SceneProps) {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${uid}-${n}`;
  const url = (n: string) => `url(#${uid}-${n})`;
  const label = { mining: "Mining landscape", agriculture: "Agricultural fields", government: "Government building" }[kind];

  return (
    <svg viewBox="0 0 800 500" className={className} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id("sky")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#dbe9f5" />
          <stop offset="0.7" stopColor="#f4efe6" />
          <stop offset="1" stopColor="#f1ebe0" />
        </linearGradient>
        <radialGradient id={id("sun")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fbe7ad" />
          <stop offset="0.6" stopColor="#f2c14e" />
          <stop offset="1" stopColor="#f2c14e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("far")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#b9c4cf" />
          <stop offset="1" stopColor="#d9dde0" />
        </linearGradient>
        <linearGradient id={id("mid")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8b97a4" />
          <stop offset="1" stopColor="#a9b1b9" />
        </linearGradient>
        <linearGradient id={id("near")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#4f5a66" />
          <stop offset="1" stopColor="#2b323a" />
        </linearGradient>
        <linearGradient id={id("blue")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2f86cf" />
          <stop offset="1" stopColor="#0b3b66" />
        </linearGradient>
        <linearGradient id={id("field")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a9b98a" />
          <stop offset="1" stopColor="#5f7448" />
        </linearGradient>
        <linearGradient id={id("stone")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fbfaf7" />
          <stop offset="1" stopColor="#d9d5cc" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill={url("sky")} />
      <circle cx="610" cy="150" r="120" fill={url("sun")} opacity="0.85" />

      {kind === "mining" && (
        <g>
          <path d="M0 300 C120 250 220 270 320 240 C430 206 520 250 640 226 C720 210 770 222 800 230 V500 H0 Z" fill={url("far")} />
          <path d="M0 350 C140 320 260 340 380 316 C500 292 620 330 800 300 V500 H0 Z" fill={url("mid")} />
          {/* headframe */}
          <g transform="translate(470 156)">
            <path d="M0 200 L40 0 L80 200" fill="none" stroke={url("blue")} strokeWidth="10" strokeLinejoin="round" />
            <path d="M14 130 L66 130 M24 80 L56 80 M8 170 L72 170" stroke="#0f5794" strokeWidth="6" />
            <path d="M20 130 L60 80 M60 130 L20 80 M14 170 L66 130 M66 170 L14 130" stroke="#0f5794" strokeWidth="3" opacity="0.7" />
            <circle cx="40" cy="6" r="22" fill="none" stroke="#e9b52c" strokeWidth="6" />
            <circle cx="40" cy="6" r="4" fill="#e9b52c" />
            <path d="M40 6 L140 200" stroke="#2b323a" strokeWidth="2" />
            <rect x="110" y="150" width="70" height="50" rx="4" fill="#e7e2d8" />
            <rect x="120" y="162" width="14" height="14" fill="#9fb8cf" />
            <rect x="142" y="162" width="14" height="14" fill="#9fb8cf" />
          </g>
          {/* strata cut-away */}
          <path d="M0 400 C160 376 300 392 440 370 C580 348 680 380 800 362 V500 H0 Z" fill={url("near")} />
          <path d="M0 440 C180 420 320 436 470 416 C620 396 700 424 800 410" fill="none" stroke="#69737d" strokeWidth="2" opacity="0.6" />
          <path d="M0 470 C200 456 360 468 520 452 C640 440 720 458 800 450" fill="none" stroke="#69737d" strokeWidth="2" opacity="0.5" />
          {/* lit tunnel */}
          <path d="M150 500 V452 a40 40 0 0 1 80 0 V500 Z" fill="#14181d" />
          <circle cx="190" cy="448" r="5" fill="#f2c14e" />
          <path d="M190 448 L160 500 L220 500 Z" fill="#f2c14e" opacity="0.18" />
          {/* haul road */}
          <path d="M800 336 C680 350 560 352 470 356" fill="none" stroke="#c9c2b4" strokeWidth="8" strokeLinecap="round" />
        </g>
      )}

      {kind === "agriculture" && (
        <g>
          <path d="M0 270 C140 240 260 260 400 236 C540 214 660 246 800 228 V500 H0 Z" fill={url("far")} />
          {/* fields in perspective */}
          <path d="M0 300 C200 280 600 280 800 300 V500 H0 Z" fill={url("field")} />
          <g stroke="#4c5f39" strokeWidth="3" opacity="0.55">
            {Array.from({ length: 13 }, (_, i) => {
              const x = -200 + i * 100;
              return <path key={i} d={`M400 290 L${x} 500`} />;
            })}
          </g>
          <path d="M0 360 C200 350 600 350 800 360" stroke="#e9d8a2" strokeWidth="16" opacity="0.5" fill="none" />
          {/* centre-pivot irrigation span */}
          <g>
            <path d="M120 318 L620 300" stroke="#c9ced6" strokeWidth="5" />
            <path d="M120 318 Q245 290 370 309 Q495 280 620 300" stroke="#a7aeb8" strokeWidth="2" fill="none" />
            {[120, 245, 370, 495, 620].map((x, i) => (
              <g key={x}>
                <path d={`M${x} ${318 - i * 4.5} l-10 40 M${x} ${318 - i * 4.5} l10 40`} stroke="#8b929c" strokeWidth="3" />
                <circle cx={x - 10} cy={358 - i * 4.5} r="6" fill="#2b323a" />
                <circle cx={x + 10} cy={358 - i * 4.5} r="6" fill="#2b323a" />
              </g>
            ))}
          </g>
          {/* tractor */}
          <g transform="translate(560 384)">
            <rect x="0" y="20" width="96" height="36" rx="6" fill={url("blue")} />
            <path d="M54 20 V-24 a6 6 0 0 1 6 -6 h30 a6 6 0 0 1 6 6 V20 Z" fill={url("blue")} />
            <rect x="62" y="-22" width="26" height="30" rx="3" fill="#cfe5f7" />
            <circle cx="76" cy="62" r="30" fill="#1c2026" />
            <circle cx="76" cy="62" r="13" fill="#e9b52c" />
            <circle cx="16" cy="70" r="18" fill="#1c2026" />
            <circle cx="16" cy="70" r="7" fill="#e9b52c" />
          </g>
        </g>
      )}

      {kind === "government" && (
        <g>
          <path d="M0 330 C160 300 300 320 420 300 C560 280 680 310 800 296 V500 H0 Z" fill={url("far")} />
          {/* trees */}
          {[90, 150, 650, 712].map((x, i) => (
            <g key={x}>
              <rect x={x - 3} y={330 - (i % 2) * 10} width="6" height="40" fill="#5e5145" />
              <ellipse cx={x} cy={318 - (i % 2) * 10} rx="30" ry="40" fill="#6f8461" />
              <ellipse cx={x - 8} cy={306 - (i % 2) * 10} rx="14" ry="18" fill="#8ea37d" opacity="0.7" />
            </g>
          ))}
          {/* civic building */}
          <g transform="translate(220 150)">
            <path d="M-10 74 L180 0 L370 74 Z" fill={url("stone")} />
            <path d="M30 64 L180 8 L330 64 Z" fill="#e7e2d8" />
            <circle cx="180" cy="44" r="12" fill="#e9b52c" />
            <rect x="-10" y="74" width="380" height="16" fill="#cfcac0" />
            {Array.from({ length: 7 }, (_, i) => (
              <g key={i}>
                <rect x={12 + i * 52} y="90" width="24" height="120" fill={url("stone")} />
                <rect x={12 + i * 52} y="90" width="6" height="120" fill="#fff" opacity="0.6" />
                <rect x={30 + i * 52} y="90" width="6" height="120" fill="#000" opacity="0.06" />
              </g>
            ))}
            <rect x="-4" y="210" width="368" height="14" fill="#d9d5cc" />
            <rect x="-24" y="224" width="408" height="14" fill="#cfcac0" />
            <rect x="-44" y="238" width="448" height="14" fill="#c4bfb4" />
            {/* flag */}
            <path d="M180 -30 V0" stroke="#5f6670" strokeWidth="3" />
            <path d="M181 -30 h40 l-8 10 l8 10 h-40 z" fill={url("blue")} />
          </g>
          <path d="M0 420 C200 404 600 404 800 420 V500 H0 Z" fill="#d6d0c4" />
          <path d="M330 500 L380 402 L420 402 L470 500 Z" fill="#e7e2d8" />
        </g>
      )}
    </svg>
  );
}
