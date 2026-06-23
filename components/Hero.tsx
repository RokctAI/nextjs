"use client";

import React from "react";
import { ShieldAlert, ArrowDown, ChevronRight, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-20 lg:py-32">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.06),transparent_50%)] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* Blur Orbs */}
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-orange-600/10 blur-[150px]"></div>
      <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-pink-600/5 blur-[150px]"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Hero Headline and Text */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 text-xs font-semibold text-orange-500">
              <Zap className="h-3 w-3" />
              <span>MINING-GRADE SPECIFICATIONS</span>
            </div>

            <h1 className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight">
              GEARED FOR THE <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-pink-500 bg-clip-text text-transparent">
                ULTIMATE FRONTLINE
              </span>
            </h1>

            <p className="max-w-xl text-lg md:text-xl leading-relaxed text-zinc-400">
              ROK engineers extreme-environment protective wear and high-pressure mine hydraulics. We build premium, anatomical safety suits and machinery components tailored to the toughest underground depths.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#womens-suits"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/25 hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
              >
                <span>Explore Women's Range</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#ppe"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900/40 px-8 py-4 text-base font-bold text-white hover:bg-zinc-800/80 transition-colors duration-200"
              >
                <span>View Full Catalog</span>
                <ArrowDown className="h-4 w-4 text-zinc-400" />
              </a>
            </div>

            {/* Micro Trust Stats */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5 max-w-lg">
              <div>
                <p className="font-display text-3xl font-black text-white">4000V</p>
                <p className="text-xs text-zinc-500 font-medium">Arc-Flash Shielding</p>
              </div>
              <div>
                <p className="font-display text-3xl font-black text-white">10k+</p>
                <p className="text-xs text-zinc-500 font-medium">Suits Deployed</p>
              </div>
              <div>
                <p className="font-display text-3xl font-black text-white">700 BAR</p>
                <p className="text-xs text-zinc-500 font-medium">Hydraulic Performance</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Block */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[420px] aspect-[4/5] rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-4 shadow-2xl">
              {/* Image simulation with high-end CSS graphics */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-950 flex flex-col justify-between p-6">
                
                {/* Visual HUD overlay */}
                <div className="flex justify-between items-start">
                  <div className="rounded-lg bg-black/50 border border-white/10 px-3 py-1.5 backdrop-blur-md">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">PRODUCT SKU: R-W02</span>
                  </div>
                  <span className="flex h-3 w-3 rounded-full bg-pink-500 animate-ping"></span>
                </div>

                {/* Conceptual Product Image container */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 mix-blend-color-dodge">
                  {/* Decorative glowing mechanical/fabric wireframe */}
                  <div className="h-64 w-64 rounded-full border-4 border-dashed border-orange-500/20 animate-spin"></div>
                </div>

                {/* Big stylized suit outline preview */}
                <div className="my-auto flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-20 w-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                    <Zap className="h-8 w-8" />
                  </div>
                  <span className="font-display text-xs font-bold tracking-widest text-pink-400 uppercase">SIGNATURE WOMEN'S WORKSUIT</span>
                  <p className="text-xs text-zinc-500 max-w-[200px]">Tailored ergonomic fit for female underground mine specialists.</p>
                </div>

                {/* Tagged Overlay Card */}
                <div className="rounded-xl border border-white/5 bg-zinc-950/80 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                      <ShieldAlert className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Reinforced Protection</h4>
                      <p className="text-[10px] text-zinc-500 font-medium">Rip-stop fire-retardant thread.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
