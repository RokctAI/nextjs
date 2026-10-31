import { ArrowDown, ArrowRight } from "lucide-react";
import Pictogram, { type PictogramKind } from "@/components/Pictograms";

const SIGN: { kind: PictogramKind; label: string }[] = [
  { kind: "helmet", label: "Hardhat" },
  { kind: "goggles", label: "Goggles" },
  { kind: "respirator", label: "Respirator" },
  { kind: "glove", label: "Gloves" },
  { kind: "harness", label: "Harness" },
  { kind: "boot", label: "Boots" },
];

const STATS = [
  { value: "4000", unit: "V", label: "Arc-Flash Shielding" },
  { value: "10k", unit: "+", label: "Suits Deployed" },
  { value: "700", unit: "BAR", label: "Hydraulic Performance" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-ink bg-paper">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        {/* Sheet header row */}
        <div className="flex items-center justify-between border-b border-rule py-4 text-ink-3">
          <span className="eyebrow">Mining-grade specifications</span>
          <span className="eyebrow hidden sm:inline">PPE · Hydraulics · RFQ</span>
        </div>

        <div className="grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-8">
            <h1 className="font-display text-[clamp(3.4rem,8.6vw,8rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.01em] text-ink">
              Geared for the
              <span className="block">
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-[-0.06em] bottom-[0.08em] top-[0.52em] -z-0 bg-hivis"
                  />
                  <span className="relative">ultimate</span>
                </span>
              </span>
              <span className="block">frontline</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl">
              ROK engineers extreme-environment protective wear and high-pressure mine hydraulics. We build premium, anatomical safety suits and machinery components tailored to the toughest underground depths.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#womens-suits"
                className="group inline-flex items-center justify-between gap-6 bg-ink px-6 py-4 font-display text-lg font-bold uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ink-2"
              >
                Explore Women&apos;s Range
                <ArrowRight className="h-5 w-5 text-hivis transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#ppe"
                className="inline-flex items-center justify-between gap-6 border border-ink px-6 py-4 font-display text-lg font-bold uppercase tracking-[0.06em] text-ink transition-colors hover:bg-paper-2"
              >
                View Full Catalog
                <ArrowDown className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Site-entrance mandatory PPE sign */}
          <div className="lg:col-span-4 lg:self-center">
            <figure className="mx-auto max-w-[460px] border-[3px] border-ink bg-[#f7f5ef] shadow-[10px_10px_0_0_var(--color-ink)]">
              <div className="hazard h-4 border-b-[3px] border-ink" aria-hidden="true" />
              <div className="px-6 pb-6 pt-5 sm:px-8">
                <p className="eyebrow text-ink-3">Mandatory</p>
                <p className="mt-1 font-display text-[2rem] font-extrabold uppercase leading-[0.95] text-ink sm:text-[2.35rem]">
                  Protective equipment
                  <br />
                  must be worn
                </p>
                <ul className="mt-6 grid grid-cols-3 gap-x-4 gap-y-5">
                  {SIGN.map((s) => (
                    <li key={s.kind} className="flex flex-col items-center gap-2">
                      <span
                        className="flex aspect-square w-full max-w-[96px] items-center justify-center rounded-full bg-ink text-paper"
                        style={{ ["--cut" as string]: "var(--color-ink)" }}
                      >
                        <Pictogram kind={s.kind} className="h-[58%] w-[58%]" />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-2">{s.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <figcaption className="flex items-center justify-between border-t-[3px] border-ink bg-ink px-6 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-paper sm:px-8">
                <span>Built to SABS regulations</span>
                <span className="text-hivis">ROK</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Spec strip */}
      <div className="border-t border-ink bg-paper-2">
        <dl className="mx-auto grid max-w-[1320px] grid-cols-3 px-4 sm:px-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse justify-end py-6 sm:py-8 ${i > 0 ? "border-l border-rule pl-3 sm:pl-8" : "pr-3"}`}
            >
              <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 sm:text-[11px]">
                {s.label}
              </dt>
              <dd className="font-display text-[clamp(2rem,6vw,4.25rem)] font-bold leading-none tabular-nums text-ink">
                {s.value}
                <span className="ml-1 text-[0.45em] font-semibold tracking-wide text-ink-3">{s.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="hazard h-3" aria-hidden="true" />
    </section>
  );
}
