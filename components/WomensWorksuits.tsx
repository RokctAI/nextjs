"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import SuitDrawing, { SUIT_H, SUIT_W } from "@/components/SuitDrawing";
import type { AddToRfq } from "@/components/types";

interface WomensWorksuitsProps {
  onAddProduct: AddToRfq;
}

/* Callout positions are in drawing units (400×600) so they track the SVG. */
const HOTSPOTS = [
  {
    id: "hotspot-1",
    title: "Ergonomic Waist Adjusters",
    description: "Anatomically engineered elastic inserts tailored specifically for the female form. Removes bunching and allows full 3D range of motion when climbing and crawling.",
    at: { x: 251, y: 270 },
  },
  {
    id: "hotspot-2",
    title: "Heavy-Duty Kevlar Knee Pockets",
    description: "Reinforced double-stitch protective panels built to hold standard mining knee inserts. High impact and tear resistance in narrow crawlways.",
    at: { x: 235, y: 451 },
  },
  {
    id: "hotspot-3",
    title: "Ventilation Air-Flow Backing",
    description: "Secret mesh-lined vents beneath the shoulder yoke. Expels extreme humidity and dry air commonly found in ultra-deep mining operations.",
    at: { x: 262, y: 92 },
  },
  {
    id: "hotspot-4",
    title: "Utility Harness System Integrated",
    description: "Reinforced D-rings and belt loops aligned precisely for safety harnesses, tool belts, and battery packs without compressing pressure points.",
    at: { x: 172, y: 300 },
  },
  {
    id: "hotspot-5",
    title: "Triple Reflective Striping",
    description: "Class-3 high-visibility, flame-resistant neon tape positioned around chest, forearms, and calves for 360° sightlines in deep dark galleries.",
    at: { x: 76, y: 294 },
  },
];

const MATERIALS = [
  "Breathable Cotton-Rich D59 Blends",
  "Arc-flash and Fire-retardant threads",
  "Acid-repellent treatment coating",
  "D30 impact knee insert compatible",
];

const TITLE_BLOCK = [
  ["Model", "Athena-01"],
  ["SKU", "R-W02"],
  ["View", "Front spec · Tailored cut"],
  ["Shell", "Premium Triple-Weave Canvas"],
  ["Rating", "D12 Resistance"],
  ["Cert.", "SABS Certified"],
];

export default function WomensWorksuits({ onAddProduct }: WomensWorksuitsProps) {
  const [activeId, setActiveId] = useState(HOTSPOTS[0].id);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddProduct({
      id: "womens-athena-01",
      name: "Women's Signature Mining Worksuit (Athena-01)",
      category: "Premium PPE Range",
      price: "R 1,250.00",
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section id="womens-suits" className="scroll-mt-28 border-b border-ink bg-paper">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        {/* Section head */}
        <div className="grid gap-6 border-b border-ink py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-2">
            <span className="font-display text-7xl font-extrabold leading-none text-ink md:text-8xl">01</span>
          </div>
          <div className="md:col-span-6">
            <p className="eyebrow text-ink-3">ROK Woman · Signature range</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.9] text-ink md:text-6xl lg:text-7xl">
              Women&apos;s ergonomic safety worksuits
            </h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-ink-2 md:col-span-4">
            Most worksuits are shrunk-down men&apos;s designs. ROK is different. We engineered our suits from the ground up tailored to women&apos;s anatomy, boosting mobility, comfort, and compliance for female mining staff.
          </p>
        </div>

        <div className="grid lg:grid-cols-12">
          {/* Drawing sheet */}
          <div className="drafting relative flex flex-col border-ink lg:col-span-7 lg:border-r">
            <div className="flex items-center justify-between px-4 pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3 sm:px-6">
              <span>Front elevation</span>
              <span>Select a callout</span>
            </div>
            <div className="relative mx-auto w-full max-w-[460px] px-6 pb-8 pt-2 sm:pb-10">
              <div className="relative" style={{ aspectRatio: `${SUIT_W} / ${SUIT_H}` }}>
                <SuitDrawing className="absolute inset-0 h-full w-full" highlight={activeId} />
                {HOTSPOTS.map((h, i) => {
                  const isActive = h.id === activeId;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setActiveId(h.id)}
                      aria-pressed={isActive}
                      aria-label={`Callout ${i + 1}: ${h.title}`}
                      style={{ left: `${(h.at.x / SUIT_W) * 100}%`, top: `${(h.at.y / SUIT_H) * 100}%` }}
                      className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink font-mono text-xs font-semibold transition-all ${
                        isActive
                          ? "scale-110 bg-signal text-paper shadow-[0_0_0_5px_rgb(200_55_31/0.18)]"
                          : "bg-paper text-ink hover:bg-ink hover:text-paper"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Engineering title block */}
            <dl className="mt-auto grid grid-cols-2 gap-px border-t border-ink bg-rule sm:grid-cols-3">
              {TITLE_BLOCK.map(([k, v]) => (
                <div key={k} className="bg-paper px-4 py-3 sm:px-5">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-3">{k}</dt>
                  <dd className="mt-0.5 font-display text-base font-semibold uppercase tracking-wide text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Spec column */}
          <div className="flex flex-col border-t border-ink lg:col-span-5 lg:border-t-0">
            <div className="px-0 py-8 sm:px-2 lg:px-10 lg:py-10">
              <p className="eyebrow text-ink-3">Anatomical specifications</p>
              <ol className="mt-5 border-t border-ink">
                {HOTSPOTS.map((h, i) => {
                  const isActive = h.id === activeId;
                  return (
                    <li key={h.id} className="border-b border-rule">
                      <button
                        type="button"
                        onClick={() => setActiveId(h.id)}
                        aria-expanded={isActive}
                        className="flex w-full items-baseline gap-4 py-4 text-left"
                      >
                        <span
                          className={`font-mono text-xs font-semibold tabular-nums ${isActive ? "text-signal" : "text-ink-3"}`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-2xl font-bold uppercase leading-tight transition-colors ${
                            isActive ? "text-ink" : "text-ink-3 hover:text-ink"
                          }`}
                        >
                          {h.title}
                        </span>
                      </button>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ${
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <p className="overflow-hidden pl-9 text-[15px] leading-relaxed text-ink-2">
                          <span className="block pb-5">{h.description}</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {MATERIALS.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-sm font-medium text-ink-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center bg-ink">
                      <Check className="h-3 w-3 text-hivis" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price / RFQ block */}
            <div className="mt-auto border-t border-ink bg-ink text-paper on-dark">
              <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between lg:px-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60">RFQ unit price</p>
                  <p className="mt-1 whitespace-nowrap font-display text-5xl font-bold leading-none tabular-nums">
                    R 1,250<span className="text-paper/50">.00</span>
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-paper/60">per unit · minimum order 50</p>
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex items-center justify-center gap-2 whitespace-nowrap px-6 py-4 font-display text-lg font-bold uppercase tracking-[0.06em] transition-colors ${
                    added ? "bg-paper text-ink" : "bg-hivis text-ink hover:bg-hivis-deep"
                  }`}
                >
                  {added ? <Check className="h-5 w-5" aria-hidden="true" /> : <Plus className="h-5 w-5" aria-hidden="true" />}
                  {added ? "Added to RFQ" : "Add Athena-01 to RFQ"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
