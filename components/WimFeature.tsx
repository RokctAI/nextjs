"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import SuitRender, { SUIT_H, SUIT_W, type SuitFeature } from "@/components/renders/SuitRender";
import { Monogram } from "@/components/Logo";
import { Container, EnquireLink, Eyebrow } from "@/components/ui";
import { WIM_SUIT } from "@/lib/site";

/** Full-bleed product moment for the women's worksuit, with lit feature callouts. */
export default function WimFeature() {
  const [active, setActive] = useState<SuitFeature>(WIM_SUIT.features[0].id);

  return (
    <section aria-labelledby="wim-title" className="on-dark relative overflow-hidden bg-night text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 30% 40%, rgba(22,112,184,0.35) 0%, transparent 60%), radial-gradient(40% 50% at 80% 90%, rgba(233,181,44,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Brand mark as a large, faint watermark */}
      <Monogram className="pointer-events-none absolute -right-[18%] bottom-[3%] h-[min(86vw,720px)] w-[min(86vw,720px)] select-none opacity-[0.07] lg:-right-[4%] lg:-bottom-[12%]" />
      <Container className="relative grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
        {/* Product stage */}
        <div data-reveal className="relative lg:col-span-7">
          <p
            className="display pointer-events-none absolute inset-x-0 top-[6%] select-none text-center text-[22vw] leading-none tracking-[-0.06em] text-white/[0.04] lg:text-[220px]"
            aria-hidden="true"
          >
            WIM
          </p>
          <div className="relative mx-auto w-full max-w-[440px]" style={{ aspectRatio: `${SUIT_W} / ${SUIT_H}` }}>
            <SuitRender className="absolute inset-0 h-full w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]" highlight={active} />
            {WIM_SUIT.features.map((f, i) => {
              const on = f.id === active;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  aria-pressed={on}
                  aria-label={`Feature ${i + 1}: ${f.title}`}
                  style={{ left: `${(f.at.x / SUIT_W) * 100}%`, top: `${(f.at.y / SUIT_H) * 100}%` }}
                  className="group absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                >
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-500 ${
                      on ? "scale-100 bg-white/25 motion-safe:animate-ping" : "scale-75 bg-white/0"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`relative flex h-7 w-7 items-center justify-center rounded-full border text-[12px] font-semibold transition-all duration-300 ${
                      on ? "border-white bg-white text-ink" : "border-white/70 bg-night/60 text-white backdrop-blur group-hover:bg-white group-hover:text-ink"
                    }`}
                  >
                    {i + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product story */}
        <div className="flex flex-col lg:col-span-5 lg:pt-6">
          <div data-reveal>
            <Eyebrow className="text-brand-glow">{WIM_SUIT.range}</Eyebrow>
            <h2 id="wim-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">
              Cut for her.
              <br />
              <span className="text-mist">Not cut down.</span>
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-mist">{WIM_SUIT.intro}</p>
          </div>

          <ol data-reveal className="mt-10 border-t border-white/10" style={{ ["--reveal-delay" as string]: "120ms" }}>
            {WIM_SUIT.features.map((f, i) => {
              const on = f.id === active;
              return (
                <li key={f.id} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setActive(f.id)}
                    aria-expanded={on}
                    className="flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span className={`w-6 text-[13px] tabular-nums ${on ? "text-brand-glow" : "text-white/40"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`flex-1 text-[18px] font-semibold tracking-[-0.01em] transition-colors ${on ? "text-white" : "text-white/55 hover:text-white"}`}>
                      {f.title}
                    </span>
                    <Plus className={`h-4 w-4 transition-transform duration-300 ${on ? "rotate-45 text-white" : "text-white/40"}`} aria-hidden="true" />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <p className="overflow-hidden pl-10 text-[15px] leading-relaxed text-mist">
                      <span className="block pb-5">{f.description}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <ul className="mt-8 flex flex-wrap gap-2">
            {WIM_SUIT.materials.map((m) => (
              <li key={m} className="rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] text-white/80">
                {m}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <EnquireLink item={WIM_SUIT.name} label="Enquire about this suit" variant="light" className="h-12 px-6 text-[15px]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
