import { BRAND, LEGAL_NAME } from "@/lib/site";

interface LogoProps {
  tone?: "ink" | "light";
  className?: string;
  showLegal?: boolean;
}

/** Monogram: a T whose stem becomes the first stroke of an M, cradled by the
    gold crescent from the client's mark. Redrawn as clean geometry. */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M5 26 C7 40 19 46 30 44 C38 42.5 43 37 44.5 30 C40 37 33 40.5 26 40.5 C15.5 40.5 7.5 34.5 5 26 Z" fill="var(--color-gold)" />
      <path d="M6 7 H27 V12.5 H19.5 V36 H13.5 V12.5 H6 Z" fill="var(--color-brand)" />
      <path d="M22 16 H27.5 L33 26 L38.5 16 H44 V36 H38.5 V25.5 L33 34.5 L27.5 25.5 V36 H22 Z" fill="var(--color-brand)" />
    </svg>
  );
}

/** Wordmark: tight, confident grotesk with the "ou" pair set in brand blue
    and the crescent swept underneath, echoing the monogram. */
export default function Logo({ tone = "ink", className = "", showLegal = false }: LogoProps) {
  const fg = tone === "ink" ? "text-ink" : "text-white";
  const lower = BRAND.toLowerCase();
  const split = lower.indexOf("ou");
  return (
    <span className={`inline-flex items-center gap-2.5 ${fg} ${className}`}>
      <Monogram className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none" aria-hidden="true">
        <span className="relative font-display text-[23px] font-extrabold tracking-[-0.045em]">
          {split > 0 ? (
            <>
              {lower.slice(0, split)}
              <span className={tone === "ink" ? "text-brand" : "text-brand-glow"}>ou</span>
              {lower.slice(split + 2)}
            </>
          ) : (
            lower
          )}
          <svg
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
            className="absolute -bottom-[5px] left-[2%] h-[5px] w-[96%]"
            aria-hidden="true"
          >
            <path d="M0 1 C25 9 75 9 100 1 C75 5.5 25 5.5 0 1 Z" fill="var(--color-gold)" />
          </svg>
        </span>
        {showLegal && (
          <span className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.3em] opacity-60">{LEGAL_NAME.replace(BRAND, "").trim()}</span>
        )}
      </span>
      <span className="sr-only">{LEGAL_NAME}</span>
    </span>
  );
}
