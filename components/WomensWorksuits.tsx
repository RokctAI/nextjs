"use client";

import React, { useState } from "react";
import { Sparkles, Shield, User, HelpCircle, ChevronRight, CheckCircle, Info } from "lucide-react";

interface WomensWorksuitsProps {
  onAddProduct: (item: { id: string; name: string; category: string; price: string }) => void;
}

const HOTSPOTS = [
  {
    id: "hotspot-1",
    title: "Ergonomic Waist Adjusters",
    description: "Anatomically engineered elastic inserts tailored specifically for the female form. Removes bunching and allows full 3D range of motion when climbing and crawling.",
    coords: { top: "35%", left: "55%" }
  },
  {
    id: "hotspot-2",
    title: "Heavy-Duty Kevlar Knee Pockets",
    description: "Reinforced double-stitch protective panels built to hold standard mining knee inserts. High impact and tear resistance in narrow crawlways.",
    coords: { top: "72%", left: "45%" }
  },
  {
    id: "hotspot-3",
    title: "Ventilation Air-Flow Backing",
    description: "Secret mesh-lined vents beneath the shoulder yoke. Expels extreme humidity and dry air commonly found in ultra-deep mining operations.",
    coords: { top: "20%", left: "50%" }
  },
  {
    id: "hotspot-4",
    title: "Utility Harness System Integrated",
    description: "Reinforced D-rings and belt loops aligned precisely for safety harnesses, tool belts, and battery packs without compressing pressure points.",
    coords: { top: "45%", left: "38%" }
  },
  {
    id: "hotspot-5",
    title: "Triple Reflective Striping",
    description: "Class-3 high-visibility, flame-resistant neon tape positioned around chest, forearms, and calves for 360° sightlines in deep dark galleries.",
    coords: { top: "60%", left: "62%" }
  }
];

export default function WomensWorksuits({ onAddProduct }: WomensWorksuitsProps) {
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[0]);

  return (
    <section id="womens-suits" className="relative bg-zinc-950 py-24 border-y border-white/5">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.04),transparent_50%)]"></div>

      <div className="mx-auto max-w-7xl px-6 relative">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/5 px-4 py-1.5 text-xs font-semibold text-pink-400">
            <Sparkles className="h-3 w-3" />
            <span>ROK WOMAN SIGNATURE RANGE</span>
          </div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            WOMEN'S ERGONOMIC safety WORKSUITS
          </h2>
          <p className="text-base text-zinc-400">
            Most worksuits are shrunk-down men's designs. ROK is different. We engineered our suits from the ground up tailored to women's anatomy, boosting mobility, comfort, and compliance for female mining staff.
          </p>
        </div>

        {/* Product Interactive Display */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center bg-zinc-900/40 rounded-3xl border border-white/5 p-8 lg:p-12 backdrop-blur-sm">
          
          {/* Conceptual Image / Hotspot Interactive Graphic */}
          <div className="lg:col-span-6 relative aspect-[3/4] w-full rounded-2xl bg-gradient-to-b from-zinc-950 to-zinc-900 border border-white/5 flex items-center justify-center overflow-hidden">
            
            {/* Visual background HUD grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70"></div>
            
            {/* Conceptual Mockup Suit Outline */}
            <div className="relative h-4/5 w-3/5 rounded-3xl bg-zinc-900 border-2 border-white/5 flex flex-col justify-between p-8 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 via-orange-500/5 to-transparent"></div>
              
              {/* Suit details representation */}
              <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                <span>FRONT SPEC</span>
                <span>TAILORED CUT</span>
              </div>

              <div className="flex flex-col items-center justify-center space-y-6 my-auto text-center relative z-10">
                <User className="h-16 w-16 text-pink-500/40" />
                <div className="space-y-1">
                  <p className="font-display text-xs font-bold text-pink-400 uppercase tracking-widest">Model: Athena-01</p>
                  <p className="text-[10px] text-zinc-500">Premium Triple-Weave Canvas</p>
                </div>
              </div>

              <div className="flex justify-between items-end text-[10px] text-zinc-500 font-mono">
                <span>D12 RESISTANCE</span>
                <span>SABS CERTIFIED</span>
              </div>
            </div>

            {/* Hotspot buttons overlay */}
            {HOTSPOTS.map((hotspot) => {
              const isActive = activeHotspot.id === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspot(hotspot)}
                  style={{ top: hotspot.coords.top, left: hotspot.coords.left }}
                  className={`absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-pink-500 text-white scale-125 shadow-lg shadow-pink-500/50 ring-4 ring-pink-500/20"
                      : "bg-black/80 text-zinc-400 border border-white/10 hover:border-pink-500 hover:text-white"
                  }`}
                  aria-label={hotspot.title}
                >
                  <span className="text-xs font-black">!</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Info Display & Add Action */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            
            <div className="space-y-4">
              <span className="text-xs font-extrabold tracking-widest text-pink-500 uppercase">ANATOMICAL SPECIFICATIONS</span>
              <h3 className="font-display text-3xl font-extrabold text-white leading-tight">
                {activeHotspot.title}
              </h3>
              
              <div className="min-h-[110px] rounded-xl border border-white/5 bg-zinc-950/40 p-5">
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                  {activeHotspot.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-pink-500 mt-0.5 shrink-0" />
                <span className="text-xs text-zinc-400 font-medium">Breathable Cotton-Rich D59 Blends</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-pink-500 mt-0.5 shrink-0" />
                <span className="text-xs text-zinc-400 font-medium">Arc-flash and Fire-retardant threads</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-pink-500 mt-0.5 shrink-0" />
                <span className="text-xs text-zinc-400 font-medium">Acid-repellent treatment coating</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-pink-500 mt-0.5 shrink-0" />
                <span className="text-xs text-zinc-400 font-medium">D30 impact knee insert compatible</span>
              </div>
            </div>

            {/* Selection & RFQ Interaction */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/5">
              <div className="flex flex-col text-left w-full sm:w-auto">
                <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">RFQ UNIT PRICE</span>
                <span className="text-2xl font-black text-white">R 1,250.00 <span className="text-xs text-zinc-500 font-normal">/ unit (min 50)</span></span>
              </div>

              <button
                onClick={() => onAddProduct({
                  id: "womens-athena-01",
                  name: "Women's Signature Mining Worksuit (Athena-01)",
                  category: "Premium PPE Range",
                  price: "R 1,250.00"
                })}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-pink-700 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
              >
                Add Athena-01 to RFQ
              </button>
            </div>

            {/* Quick Hotspot selector for Mobile list view */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase block">Click Hotspots above or select spec item:</span>
              <div className="flex flex-wrap gap-2">
                {HOTSPOTS.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    onClick={() => setActiveHotspot(hotspot)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                      activeHotspot.id === hotspot.id
                        ? "bg-pink-500/10 border-pink-500/40 text-pink-400"
                        : "bg-zinc-950/50 border-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {hotspot.title.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
