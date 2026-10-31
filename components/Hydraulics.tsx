"use client";

import { useState } from "react";
import { Activity, CalendarClock, Check, Drill, Hammer, Plus, Settings } from "lucide-react";
import PressureGauge from "@/components/PressureGauge";
import { QUOTE_ON_APPLICATION, type AddToRfq } from "@/components/types";

interface HydraulicsProps {
  onAddService: AddToRfq;
}

const SERVICES = [
  {
    id: "hyd-cylinder",
    title: "Excavator Cylinder Remanufacturing",
    icon: Drill,
    description: "Complete overhaul of double-acting mining cylinders. Hard chrome electroplating, high-precision barrel honing, and high-performance poly-urethane seal integrations.",
    specs: ["700 BAR load tested", "Full SABS warranty"],
  },
  {
    id: "hyd-audit",
    title: "Ultrasonic Pressure & Leak Audits",
    icon: Activity,
    description: "Preventive non-destructive testing (NDT). Ultrasonic diagnostic tools scan high-pressure circuits to intercept micro-fractures before terminal system blowouts.",
    specs: ["Thermal imaging reports", "ISO 4406 cleanliness rating"],
  },
  {
    id: "hyd-hoses",
    title: "Mine-Spec High-Pressure Hose Assembly",
    icon: Settings,
    description: "Precision-crimped custom multi-spiral wire reinforcement hoses. Designed to resist extreme mechanical abrasion, abrasion, and intense vibration.",
    specs: ["Ultra-high bending tolerance", "Anti-scuff wrapping options"],
  },
  {
    id: "hyd-on-site",
    title: "24/7 Rapid Field Maintenance",
    icon: Hammer,
    description: "Dedicated industrial hydraulic technicians deployed directly to your mining shaft. Fluid contamination analysis, system purging, and emergency valve swaps.",
    specs: ["Under 2-hour dispatch", "Mine-cleared personnel"],
  },
];

export default function Hydraulics({ onAddService }: HydraulicsProps) {
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const add = (id: string, name: string) => {
    onAddService({ id, name, category: "Hydraulics Service", price: QUOTE_ON_APPLICATION });
    setJustAddedId(id);
    window.setTimeout(() => setJustAddedId(null), 1500);
  };

  return (
    <section id="hydraulics" className="on-dark scroll-mt-28 bg-shaft text-paper">
      <div className="hazard h-3" aria-hidden="true" />
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        {/* Section head */}
        <div className="grid gap-6 border-b border-shaft-3 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-2">
            <span className="font-display text-7xl font-extrabold leading-none text-hivis md:text-8xl">03</span>
          </div>
          <div className="md:col-span-6">
            <p className="eyebrow text-paper/50">Heavy system engineering</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.9] md:text-6xl lg:text-7xl">
              Mine hydraulics engineering services
            </h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-paper/70 md:col-span-4">
            When production stops, millions are lost. ROK delivers heavy-duty hydraulic restoration, certified pressure validation, and rapid on-site mine shutdowns.
          </p>
        </div>

        <div className="grid gap-0 lg:grid-cols-12">
          {/* Gauge + diagnostics call */}
          <aside className="border-shaft-3 py-10 lg:col-span-5 lg:border-r lg:pr-10 lg:py-14">
            <div className="lg:sticky lg:top-32">
              <PressureGauge className="mx-auto w-full max-w-[340px]" />

              <div className="mt-10 border border-paper/15 bg-shaft-2 p-6">
                <p className="font-display text-2xl font-bold uppercase">Request On-Site Diagnostics</p>
                <p className="mt-2 text-[15px] leading-relaxed text-paper/65">
                  Schedule a mine-safe certified engineering team to audit your machinery&apos;s high-pressure hydraulic loops.
                </p>
                <button
                  type="button"
                  onClick={() => add("service-diagnostics-audit", "Mine Hydraulics Systems Field Audit")}
                  className={`mt-6 flex w-full items-center justify-center gap-2 px-5 py-4 font-display text-lg font-bold uppercase tracking-[0.06em] text-ink transition-colors ${
                    justAddedId === "service-diagnostics-audit" ? "bg-paper" : "bg-hivis hover:bg-hivis-deep"
                  }`}
                >
                  {justAddedId === "service-diagnostics-audit" ? (
                    <Check className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <CalendarClock className="h-5 w-5" aria-hidden="true" />
                  )}
                  {justAddedId === "service-diagnostics-audit" ? "Added to RFQ" : "Request System Audit Inquiry"}
                </button>
              </div>
            </div>
          </aside>

          {/* Work orders */}
          <ol className="lg:col-span-7">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const isAdded = justAddedId === service.id;
              return (
                <li
                  key={service.id}
                  className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-shaft-3 py-8 first:border-t-0 sm:gap-x-8 lg:pl-10 lg:py-10 lg:first:border-t-0"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="font-mono text-xs text-paper/45">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex h-12 w-12 items-center justify-center border border-paper/20 text-hivis">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-bold uppercase leading-[0.95]">{service.title}</h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-paper/65">{service.description}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {service.specs.map((spec) => (
                        <span
                          key={spec}
                          className="border border-paper/20 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-paper/80"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => add(service.id, service.title)}
                      aria-label={`Add ${service.title} to RFQ`}
                      className={`mt-6 inline-flex h-11 items-center gap-2 px-4 font-display text-[15px] font-bold uppercase tracking-[0.06em] transition-colors ${
                        isAdded ? "bg-hivis text-ink" : "border border-hivis text-hivis hover:bg-hivis hover:text-ink"
                      }`}
                    >
                      {isAdded ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                      {isAdded ? "Added" : "Add Service to RFQ"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
