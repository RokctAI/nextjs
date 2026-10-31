"use client";

import { useId } from "react";

/* Studio render of the Athena-01 women's worksuit, drawn on a 400×600 canvas.
   Cylindrical shading on the blue shell, silver reflective tape clipped to the
   garment, and the five spec features (waist adjusters, knee pockets, yoke vent,
   harness D-rings, striping) as discrete parts so a feature can be lit. */

export const SUIT_W = 400;
export const SUIT_H = 600;

const OUTLINE =
  "M170 40 C150 46 132 52 118 60 C98 72 88 92 84 118 L54 326 C66 332 80 335 94 334 L114 214 L128 182 " +
  "C134 212 142 240 144 268 C140 290 132 306 128 328 L136 560 L194 562 L200 356 L206 562 L264 560 L272 328 " +
  "C268 306 260 290 256 268 C258 240 266 212 272 182 L286 214 L306 334 C320 335 334 332 346 326 L316 118 " +
  "C312 92 302 72 282 60 C268 52 250 46 230 40 Z";

export type SuitFeature = "waist" | "knee" | "vent" | "harness" | "stripe";

interface SuitRenderProps {
  className?: string;
  highlight?: SuitFeature | null;
}

export default function SuitRender({ className = "", highlight = null }: SuitRenderProps) {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${uid}-${n}`;
  const url = (n: string) => `url(#${id(n)})`;
  const lit = (f: SuitFeature) => highlight === f;

  return (
    <svg viewBox={`0 0 ${SUIT_W} ${SUIT_H}`} className={className} role="img" aria-label="Athena-01 women's signature worksuit">
      <defs>
        <linearGradient id={id("shell")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0b3b66" />
          <stop offset="0.3" stopColor="#1670b8" />
          <stop offset="0.5" stopColor="#2a86d0" />
          <stop offset="0.72" stopColor="#13629f" />
          <stop offset="1" stopColor="#082b4b" />
        </linearGradient>
        <linearGradient id={id("fall")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#000000" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id={id("tape")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f6f7f9" />
          <stop offset="0.45" stopColor="#c3c8d0" />
          <stop offset="0.55" stopColor="#e9ecf0" />
          <stop offset="1" stopColor="#8f96a1" />
        </linearGradient>
        <linearGradient id={id("metal")} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f3f4f6" />
          <stop offset="0.5" stopColor="#9aa1ab" />
          <stop offset="1" stopColor="#dfe2e6" />
        </linearGradient>
        <linearGradient id={id("panel")} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#0f4f86" />
          <stop offset="1" stopColor="#08304f" />
        </linearGradient>
        <pattern id={id("quilt")} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V9" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
        </pattern>
        <pattern id={id("mesh")} width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1" fill="#05203a" fillOpacity="0.55" />
        </pattern>
        <clipPath id={id("clip")}>
          <path d={OUTLINE} />
        </clipPath>
        <filter id={id("soft")} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={id("glow")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* contact shadow */}
      <ellipse cx="200" cy="572" rx="118" ry="12" fill="#1b1a17" opacity="0.28" filter={url("soft")} />

      <path d={OUTLINE} fill={url("shell")} />

      <g clipPath={url("clip")}>
        <path d={OUTLINE} fill={url("fall")} />

        {/* volume: folds at elbows, crotch and behind the knees */}
        <g fill="#031526" opacity="0.28">
          <path d="M70 226 C80 236 88 250 96 262 L92 270 C84 256 76 244 66 236 Z" />
          <path d="M330 226 C320 236 312 250 304 262 L308 270 C316 256 324 244 334 236 Z" />
          <path d="M186 356 L200 352 L214 356 L206 470 L200 360 L194 470 Z" />
          <path d="M150 300 C170 312 180 330 186 352 L176 352 C172 334 162 318 146 308 Z" />
          <path d="M250 300 C230 312 220 330 214 352 L224 352 C228 334 238 318 254 308 Z" />
        </g>
        {/* soft highlights on the forward planes */}
        <g fill="#ffffff" opacity="0.1">
          <path d="M150 70 C170 120 172 190 164 262 L176 264 C184 190 182 120 166 66 Z" />
          <path d="M152 370 C156 430 158 500 160 556 L170 556 C168 500 166 430 164 372 Z" />
          <path d="M226 370 C230 430 232 500 234 556 L242 556 C240 500 238 430 236 372 Z" />
        </g>

        {/* shoulder yoke with mesh vent beneath */}
        <path
          d="M104 86 Q200 140 296 86 L300 100 Q200 156 100 100 Z"
          fill={url("mesh")}
          opacity={lit("vent") ? 1 : 0.7}
        />
        <path d="M100 100 Q200 156 300 100" fill="none" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M118 60 Q200 116 282 60" fill="none" stroke="#05203a" strokeOpacity="0.5" strokeWidth="1.5" />

        {/* chest pockets with flaps */}
        {[146, 216].map((x) => (
          <g key={x}>
            <rect x={x} y={130} width="38" height="46" rx="3" fill="#000" opacity="0.12" />
            <path d={`M${x} 130h38v12a2 2 0 0 1-2 2h-34a2 2 0 0 1-2-2z`} fill={url("panel")} />
            <path d={`M${x + 3} 147h32v26h-32z`} fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeDasharray="2 2.5" />
          </g>
        ))}

        {/* reflective striping: chest, forearms, calves */}
        <g filter={lit("stripe") ? url("glow") : undefined}>
          {[
            [40, 196, 320],
            [30, 284, 100],
            [270, 284, 100],
            [100, 500, 200],
          ].map(([x, y, w]) => (
            <g key={`${x}-${y}`}>
              <rect x={x} y={y} width={w} height="17" fill={url("tape")} />
              <rect x={x} y={y + 7} width={w} height="3" fill="#ffffff" opacity="0.65" />
            </g>
          ))}
        </g>

        {/* tailored waist seam with gathered elastic adjusters */}
        <path d="M140 266 Q200 280 260 266 L260 278 Q200 292 140 278 Z" fill="#062440" opacity="0.45" />
        <g stroke={lit("waist") ? "#ffffff" : "#a9d2f3"} strokeOpacity={lit("waist") ? 0.95 : 0.55} strokeWidth="1.4" strokeLinecap="round">
          {[148, 153, 158, 163].map((x) => (
            <path key={x} d={`M${x} 266v12`} />
          ))}
          {[237, 242, 247, 252].map((x) => (
            <path key={x} d={`M${x} 266v12`} />
          ))}
        </g>

        {/* belt loops */}
        {[184, 214].map((x) => (
          <rect key={x} x={x} y={262} width="5" height="20" rx="1.5" fill="#062440" opacity="0.7" />
        ))}

        {/* knee pockets with quilted impact panels */}
        {[142, 212].map((x) => (
          <g key={x}>
            <rect x={x} y={420} width="46" height="64" rx="8" fill={url("panel")} />
            <rect x={x} y={420} width="46" height="64" rx="8" fill={url("quilt")} />
            <rect
              x={x + 3}
              y={423}
              width="40"
              height="58"
              rx="6"
              fill="none"
              stroke={lit("knee") ? "#ffffff" : "#ffffff"}
              strokeOpacity={lit("knee") ? 0.9 : 0.25}
              strokeWidth={lit("knee") ? 1.6 : 1}
              strokeDasharray="2 2.5"
            />
          </g>
        ))}

        {/* cuffs and hems */}
        <path d="M50 312 L96 320 L94 336 L48 328 Z M304 320 L350 312 L352 328 L306 336 Z" fill="#062440" opacity="0.55" />
        <path d="M134 544h62v20h-62zM204 544h62v20h-62z" fill="#062440" opacity="0.55" />
      </g>

      {/* collar */}
      <path d="M168 38 C176 56 188 72 200 82 C212 72 224 56 232 38 L240 42 C230 64 216 82 200 96 C184 82 170 64 160 42 Z" fill={url("panel")} />
      <path d="M170 40 C180 58 190 70 200 78 C210 70 220 58 230 40" fill="none" stroke="#ffffff" strokeOpacity="0.2" />

      {/* centre-front zip */}
      <rect x="198.5" y="92" width="3" height="262" fill={url("metal")} opacity="0.9" />
      <rect x="195" y="104" width="10" height="16" rx="2.5" fill={url("metal")} />
      <rect x="197.5" y="118" width="5" height="10" rx="2" fill="#c8ccd2" />

      {/* harness D-rings */}
      <g filter={lit("harness") ? url("glow") : undefined}>
        {[166, 228].map((x) => (
          <path
            key={x}
            d={`M${x} 280h12v8a6 6 0 0 1-12 0z`}
            fill="none"
            stroke={url("metal")}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        ))}
      </g>

      {/* fine edge light on the silhouette */}
      <path d={OUTLINE} fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1.5" />
    </svg>
  );
}
