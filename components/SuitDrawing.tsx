/* Front-elevation technical drawing of the Athena-01 women's worksuit.
   Drawn on a 400×600 grid. Reflective tape is clipped to the garment outline,
   at chest, forearms and calves as described in the spec. */

export const SUIT_W = 400;
export const SUIT_H = 600;

const OUTLINE =
  "M170 40 L120 58 Q92 70 80 122 L52 330 L92 337 L116 214 L128 182 " +
  "Q136 226 143 268 Q134 296 127 330 L134 562 L194 562 L200 352 L206 562 L266 562 " +
  "L273 330 Q266 296 257 268 Q264 226 272 182 L284 214 L308 337 L348 330 L320 122 " +
  "Q308 70 280 58 L230 40 Z";

interface SuitDrawingProps {
  className?: string;
  highlight?: string | null;
}

function Tape({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="16" fill="var(--color-hivis)" />
      <rect x={x} y={y + 5.5} width={w} height="5" fill="#cfd1cb" />
    </g>
  );
}

export default function SuitDrawing({ className = "", highlight = null }: SuitDrawingProps) {
  const hl = (id: string) => (highlight === id ? "var(--color-signal)" : "var(--color-ink)");
  return (
    <svg viewBox={`0 0 ${SUIT_W} ${SUIT_H}`} className={className} aria-hidden="true">
      <defs>
        <clipPath id="suit-clip">
          <path d={OUTLINE} />
        </clipPath>
        <pattern id="mesh" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 6 6 0M-1 1 1 -1M5 7 7 5" stroke="var(--color-ink)" strokeWidth="0.8" />
        </pattern>
        <pattern id="kevlar" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 0h8M0 4h8" stroke="var(--color-ink)" strokeWidth="0.6" opacity="0.6" />
          <path d="M0 0v8M4 0v8" stroke="var(--color-ink)" strokeWidth="0.6" opacity="0.6" />
        </pattern>
      </defs>

      {/* centre line */}
      <path d="M200 14V590" stroke="var(--color-ink-3)" strokeWidth="0.75" strokeDasharray="10 4 2 4" />

      {/* garment body */}
      <path d={OUTLINE} fill="#f7f5ef" />

      <g clipPath="url(#suit-clip)">
        {/* shoulder yoke vent (hotspot 3) */}
        <path d="M118 58 Q200 112 282 58 L300 92 Q200 136 100 92 Z" fill="url(#mesh)" opacity={highlight === "hotspot-3" ? 0.9 : 0.45} />
        {/* reflective striping (hotspot 5) */}
        <g opacity={highlight && highlight !== "hotspot-5" ? 0.75 : 1}>
          <Tape x={60} y={196} w={280} />
          <Tape x={30} y={286} w={92} />
          <Tape x={278} y={286} w={92} />
          <Tape x={100} y={508} w={200} />
        </g>
        {/* knee pockets (hotspot 2) */}
        <rect x="142" y="420" width="46" height="62" fill="url(#kevlar)" stroke={hl("hotspot-2")} strokeWidth="1.5" />
        <rect x="212" y="420" width="46" height="62" fill="url(#kevlar)" stroke={hl("hotspot-2")} strokeWidth="1.5" />
      </g>

      {/* outline */}
      <path d={OUTLINE} fill="none" stroke="var(--color-ink)" strokeWidth="2.25" strokeLinejoin="round" />

      {/* collar */}
      <path d="M170 40 L178 80 L200 98 L222 80 L230 40" fill="none" stroke="var(--color-ink)" strokeWidth="1.75" strokeLinejoin="round" />
      {/* zip */}
      <path d="M200 98V348" stroke="var(--color-ink)" strokeWidth="1.5" />
      <path d="M197 98V348M203 98V348" stroke="var(--color-ink)" strokeWidth="0.5" strokeDasharray="1.5 2.5" />
      {/* yoke seam */}
      <path d="M100 92 Q200 136 300 92" fill="none" stroke={hl("hotspot-3")} strokeWidth="1.25" strokeDasharray="4 3" />
      {/* chest pockets */}
      <path d="M146 128h38v48h-38zM146 140h38" fill="none" stroke="var(--color-ink)" strokeWidth="1.25" />
      <path d="M216 128h38v48h-38zM216 140h38" fill="none" stroke="var(--color-ink)" strokeWidth="1.25" />
      {/* tailored waist with elastic adjusters (hotspot 1) */}
      <path d="M143 268 Q200 278 257 268" fill="none" stroke="var(--color-ink)" strokeWidth="1.25" />
      <g stroke={hl("hotspot-1")} strokeWidth="1.25">
        <path d="M146 262v14M151 263v14M156 264v14" />
        <path d="M244 264v14M249 263v14M254 262v14" />
      </g>
      {/* harness D-rings & belt loops (hotspot 4) */}
      <g fill="none" stroke={hl("hotspot-4")} strokeWidth="2">
        <path d="M166 262h10v8a5 5 0 0 1-10 0z" />
        <path d="M224 262h10v8a5 5 0 0 1-10 0z" />
        <path d="M184 266v14M216 266v14" strokeWidth="2.5" />
      </g>
      {/* cuffs and hems */}
      <path d="M55 312 L94 318M305 318 L345 312M134 546h60M206 546h60" stroke="var(--color-ink)" strokeWidth="1.25" />
      {/* stitch lines */}
      <path d="M131 330 Q200 344 269 330" fill="none" stroke="var(--color-ink-3)" strokeWidth="0.75" strokeDasharray="3 3" />

      {/* dimension line */}
      <g stroke="var(--color-ink-3)" strokeWidth="0.75" fill="var(--color-ink-3)">
        <path d="M376 40V562M370 40h12M370 562h12" />
        <path d="M376 40l-3 8h6zM376 562l-3-8h6z" />
      </g>
    </svg>
  );
}
