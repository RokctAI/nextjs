interface LogoProps {
  tone?: "ink" | "paper";
  className?: string;
}

/** ROK mark: a hex-nut outline holding the R, with the "Industrial" plate beneath the wordmark. */
export default function Logo({ tone = "ink", className = "" }: LogoProps) {
  const fg = tone === "ink" ? "text-ink" : "text-paper";
  return (
    <span className={`inline-flex items-center gap-3 ${fg} ${className}`}>
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden="true">
        <polygon
          points="20,2 36,11 36,29 20,38 4,29 4,11"
          fill="currentColor"
        />
        <polygon
          points="20,7.5 31.5,14 31.5,26 20,32.5 8.5,26 8.5,14"
          fill="none"
          stroke="var(--color-hivis)"
          strokeWidth="1.5"
        />
        <text
          x="20"
          y="26.5"
          textAnchor="middle"
          fontFamily="var(--font-barlow-condensed)"
          fontWeight="800"
          fontSize="18"
          fill="var(--color-hivis)"
        >
          R
        </text>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[26px] font-extrabold tracking-[0.12em]">ROK</span>
        <span className="mt-1 font-mono text-[9px] font-medium uppercase tracking-[0.32em] opacity-70">
          Industrial
        </span>
      </span>
    </span>
  );
}
