import { MapPin } from "lucide-react";
import { CONTACT } from "@/lib/site";

/** Static, key-free location card: a stylised map drawn in code, linking out to Google Maps. */
export default function MapCard() {
  return (
    <a
      href={CONTACT.mapsHref}
      target="_blank"
      rel="noopener noreferrer"
      className="keep-light group relative block overflow-hidden rounded-[28px] bg-[#e9e6df]"
      aria-label="Open our location in Google Maps (opens in a new tab)"
    >
      <svg viewBox="0 0 600 380" className="block h-auto w-full" aria-hidden="true">
        <rect width="600" height="380" fill="#ebe8e1" />
        {/* terrain */}
        <path d="M0 80 C120 40 220 120 330 70 C430 26 520 60 600 30 V0 H0 Z" fill="#dfe3d6" />
        <path d="M0 330 C140 300 260 350 380 320 C470 298 540 320 600 300 V380 H0 Z" fill="#dfe3d6" />
        {/* river */}
        <path d="M-10 250 C90 230 160 280 250 250 C340 220 400 260 470 230 C530 205 570 220 610 200" fill="none" stroke="#bcd6ec" strokeWidth="14" strokeLinecap="round" />
        {/* roads */}
        <g stroke="#fff" strokeLinecap="round" fill="none">
          <path d="M0 170 C150 160 260 190 360 176 C460 162 520 150 600 156" strokeWidth="12" />
          <path d="M300 0 C292 100 312 200 300 380" strokeWidth="10" />
          <path d="M120 0 C150 90 200 150 240 380" strokeWidth="6" />
          <path d="M600 260 C500 250 420 214 360 176" strokeWidth="6" />
          <path d="M420 0 C430 60 440 120 470 380" strokeWidth="5" />
        </g>
        <g stroke="#d8d4cb" strokeWidth="2" fill="none">
          <path d="M0 170 C150 160 260 190 360 176 C460 162 520 150 600 156" />
        </g>
        {/* business park blocks */}
        <g fill="#d6d1c6">
          <rect x="318" y="120" width="40" height="28" rx="3" />
          <rect x="364" y="122" width="30" height="24" rx="3" />
          <rect x="318" y="196" width="34" height="26" rx="3" />
          <rect x="246" y="118" width="36" height="30" rx="3" />
        </g>
        <circle cx="330" cy="170" r="42" fill="#1670b8" opacity="0.12" className="origin-[330px_170px] motion-safe:animate-ping" />
      </svg>
      <span className="absolute left-[55%] top-[44.7%] -translate-x-1/2 -translate-y-full">
        <span className="flex h-11 w-11 items-center justify-center rounded-full rounded-bl-none bg-brand text-white shadow-[0_12px_24px_-8px_rgba(22,112,184,0.6)] [transform:rotate(-45deg)]">
          <MapPin className="h-5 w-5 [transform:rotate(45deg)]" aria-hidden="true" />
        </span>
      </span>
      <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-[18px] bg-white/95 px-5 py-4 backdrop-blur">
        <span>
          <span className="block text-[15px] font-semibold text-ink">Steelpoort, {CONTACT.region}</span>
          <span className="block text-[13px] text-ink-3">Open in Google Maps</span>
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-colors group-hover:bg-brand">
          ↗
        </span>
      </span>
    </a>
  );
}
