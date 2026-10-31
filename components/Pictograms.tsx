/* Mandatory-PPE style pictograms, drawn in code on a 48×48 grid.
   Glyphs fill with currentColor; cut lines use the --cut CSS variable so the
   same symbol reads on a dark disc or on paper. */

import type { ReactElement } from "react";

export type PictogramKind = "helmet" | "boot" | "glove" | "goggles" | "respirator" | "harness" | "suit";

const CUT = "var(--cut, var(--color-ink))";

const GLYPHS: Record<PictogramKind, ReactElement> = {
  helmet: (
    <g>
      <path d="M9 31c0-11 7-19 15-19s15 8 15 19z" fill="currentColor" />
      <rect x="5" y="31" width="38" height="4.5" rx="2.25" fill="currentColor" />
      <path d="M24 12.5V31" stroke={CUT} strokeWidth="2" />
      <rect x="20" y="17" width="8" height="5" rx="1" fill={CUT} />
      <rect x="21.5" y="18.3" width="5" height="2.4" fill="currentColor" />
    </g>
  ),
  boot: (
    <g>
      <path d="M13 7h12v19l11 5.5c3.4 1.7 5 3.8 5 7V40H11V31c0-2.2 1-3.6 2-4.6z" fill="currentColor" />
      <rect x="10" y="40" width="32" height="4" rx="1" fill="currentColor" />
      <path d="M31 29.5c3 1.4 4 4 4 8.5" stroke={CUT} strokeWidth="1.8" fill="none" />
      <path d="M13 13h12M13 18h12" stroke={CUT} strokeWidth="1.6" />
    </g>
  ),
  glove: (
    <g>
      <rect x="15" y="9" width="4.6" height="17" rx="2.3" fill="currentColor" />
      <rect x="20.4" y="6" width="4.6" height="20" rx="2.3" fill="currentColor" />
      <rect x="25.8" y="7.5" width="4.6" height="18.5" rx="2.3" fill="currentColor" />
      <rect x="31.2" y="11" width="4.4" height="15" rx="2.2" fill="currentColor" />
      <path d="M15 22h20.6v8c0 5-3 8-8 8h-4.6c-4 0-6.5-2-8-5l-5.5-9c-1-1.8.4-3.6 2.2-3 1 .3 1.8 1 2.4 2L15 26z" fill="currentColor" />
      <rect x="16.5" y="38" width="17" height="6" fill="currentColor" />
      <path d="M16.5 40.5h17" stroke={CUT} strokeWidth="1.2" />
    </g>
  ),
  goggles: (
    <g>
      <path d="M3 24h6M39 24h6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="7" y="15" width="34" height="17" rx="7" fill="currentColor" />
      <rect x="10.5" y="18.5" width="11.5" height="10" rx="4" fill={CUT} />
      <rect x="26" y="18.5" width="11.5" height="10" rx="4" fill={CUT} />
      <circle cx="24" cy="33.5" r="4" fill={CUT} />
    </g>
  ),
  respirator: (
    <g>
      <path d="M24 12c-6 0-10 3-11 9l-1 7c-.4 3 1.5 6 4.5 7.5L24 39l7.5-3.5c3-1.5 4.9-4.5 4.5-7.5l-1-7c-1-6-5-9-11-9z" fill="currentColor" />
      <rect x="3" y="24" width="12" height="13" rx="3" fill="currentColor" />
      <rect x="33" y="24" width="12" height="13" rx="3" fill="currentColor" />
      <path d="M6 28h6M6 30.5h6M6 33h6M36 28h6M36 30.5h6M36 33h6" stroke={CUT} strokeWidth="1.1" />
      <path d="M20 31h8M21 34h6" stroke={CUT} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  ),
  harness: (
    <g>
      <circle cx="24" cy="7.5" r="4.5" fill="currentColor" />
      <path d="M15 14h18l3 15h-4l-1 15h-5l-2-12-2 12h-5l-1-15h-4z" fill="currentColor" />
      <path d="M18 14l12 14M30 14 18 28M16.5 28h15" stroke={CUT} strokeWidth="1.8" />
      <path d="M17.5 30c2 3 4 4 6.5 4s4.5-1 6.5-4" stroke={CUT} strokeWidth="1.6" fill="none" />
      <circle cx="24" cy="16" r="2" fill="none" stroke={CUT} strokeWidth="1.4" />
    </g>
  ),
  suit: (
    <g>
      <circle cx="24" cy="6.5" r="4" fill="currentColor" />
      <path d="M16 12h16l5 15-3.5 1.5-3.5-9V27l1 17h-5l-2-14-2 14h-5l1-17v-7.5l-3.5 9L11 27z" fill="currentColor" />
      <path d="M17 20h14M14 25.5h4M30 25.5h4M18.5 38h4M25.5 38h4" stroke="var(--color-hivis)" strokeWidth="2" />
    </g>
  ),
};

interface PictogramProps {
  kind: PictogramKind;
  className?: string;
  title?: string;
}

export default function Pictogram({ kind, className = "", title }: PictogramProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {GLYPHS[kind]}
    </svg>
  );
}
