"use client";

import React from "react";
import { Hammer, ShieldCheck, Drill, Settings, FlameKindling, Activity, Calendar } from "lucide-react";

interface HydraulicsProps {
  onAddService: (item: { id: string; name: string; category: string; price: string }) => void;
}

const SERVICES = [
  {
    id: "hyd-cylinder",
    title: "Excavator Cylinder Remanufacturing",
    icon: Drill,
    description: "Complete overhaul of double-acting mining cylinders. Hard chrome electroplating, high-precision barrel honing, and high-performance poly-urethane seal integrations.",
    specs: ["700 BAR load tested", "Full SABS warranty"]
  },
  {
    id: "hyd-audit",
    title: "Ultrasonic Pressure & Leak Audits",
    icon: Activity,
    description: "Preventive non-destructive testing (NDT). Ultrasonic diagnostic tools scan high-pressure circuits to intercept micro-fractures before terminal system blowouts.",
    specs: ["Thermal imaging reports", "ISO 4406 cleanliness rating"]
  },
  {
    id: "hyd-hoses",
    title: "Mine-Spec High-Pressure Hose Assembly",
    icon: Settings,
    description: "Precision-crimped custom multi-spiral wire reinforcement hoses. Designed to resist extreme mechanical abrasion, abrasion, and intense vibration.",
    specs: ["Ultra-high bending tolerance", "Anti-scuff wrapping options"]
  },
  {
    id: "hyd-on-site",
    title: "24/7 Rapid Field Maintenance",
    icon: Hammer,
    description: "Dedicated industrial hydraulic technicians deployed directly to your mining shaft. Fluid contamination analysis, system purging, and emergency valve swaps.",
    specs: ["Under 2-hour dispatch", "Mine-cleared personnel"]
  }
];

export default function Hydraulics({ onAddService }: HydraulicsProps) {
  return (
    <section id="hydraulics" className="relative bg-zinc-950 py-24 border-t border-white/5 scroll-mt-20">
      {/* Visual Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.03),transparent_50%)]"></div>

      <div className="mx-auto max-w-7xl px-6 relative">
        
        {/* Section Header */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center mb-16">
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-xs font-semibold text-amber-500">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>HEAVY SYSTEM ENGINEERING</span>
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              MINE HYDRAULICS ENGINEERING SERVICES
            </h2>
            <p className="text-zinc-400 max-w-xl">
              When production stops, millions are lost. ROK delivers heavy-duty hydraulic restoration, certified pressure validation, and rapid on-site mine shutdowns. 
            </p>
          </div>

          <div className="lg:col-span-5 bg-zinc-900/20 border border-white/5 rounded-2xl p-6 text-left space-y-4 glass">
            <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">Request On-Site Diagnostics</h4>
            <p className="text-xs text-zinc-500">
              Schedule a mine-safe certified engineering team to audit your machinery's high-pressure hydraulic loops.
            </p>
            <button
              onClick={() => onAddService({
                id: "service-diagnostics-audit",
                name: "Mine Hydraulics Systems Field Audit",
                category: "Hydraulics Service",
                price: "Quote on Application"
              })}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-5 py-3 text-xs font-bold text-black transition-all duration-200"
            >
              <Calendar className="h-4 w-4" />
              Request System Audit Inquiry
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30 p-6 transition-all duration-300 hover:border-amber-500/20 hover:bg-zinc-900/50"
              >
                <div className="space-y-4">
                  {/* Service Icon */}
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 border border-white/5 text-amber-500 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base font-extrabold text-white group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed min-h-[70px]">
                    {service.description}
                  </p>

                  {/* Technical Specs */}
                  <ul className="space-y-1 pt-2">
                    {service.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500">
                        <span className="h-1 w-1 rounded-full bg-amber-500"></span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Service Inquiry Button */}
                <div className="pt-6 mt-6 border-t border-white/5">
                  <button
                    onClick={() => onAddService({
                      id: service.id,
                      name: service.title,
                      category: "Hydraulics Service",
                      price: "Quote on Application"
                    })}
                    className="w-full rounded-xl border border-white/5 bg-zinc-900 hover:bg-zinc-800 py-2.5 text-[10px] font-bold text-zinc-300 hover:text-white transition-colors"
                  >
                    Add Service to RFQ
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
