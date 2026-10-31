import { Gauge, ShieldCheck } from "lucide-react";
import Pictogram from "@/components/Pictograms";

const ITEMS = [
  {
    code: "A",
    title: "SABS & CE Safety Certified",
    body: "Every fabric, stitch, and steel component matches strict SANS regulations for harsh conditions.",
    icon: <ShieldCheck className="h-7 w-7" strokeWidth={2.25} aria-hidden="true" />,
  },
  {
    code: "B",
    title: "Anatomical Gender-Fit",
    body: "Eliminating ill-fitting gear to prevent work-site accidents and dynamic mobility issues.",
    icon: <Pictogram kind="suit" className="h-8 w-8" />,
  },
  {
    code: "C",
    title: "700 BAR Tested System",
    body: "Advanced mine cylinders honed and quality-checked under absolute max hydraulic threshold.",
    icon: <Gauge className="h-7 w-7" strokeWidth={2.25} aria-hidden="true" />,
  },
];

export default function CertBand() {
  return (
    <section aria-label="Standards" className="on-dark border-b border-ink bg-shaft text-paper">
      <ul className="mx-auto grid max-w-[1320px] md:grid-cols-3">
        {ITEMS.map((item, i) => (
          <li
            key={item.code}
            className={`flex gap-5 px-4 py-8 sm:px-6 md:py-10 ${
              i > 0 ? "border-t border-shaft-3 md:border-l md:border-t-0" : ""
            }`}
          >
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center bg-hivis text-ink"
              style={{ ["--cut" as string]: "var(--color-hivis)" }}
            >
              {item.icon}
            </span>
            <div>
              <p className="font-display text-xl font-bold uppercase tracking-[0.04em]">{item.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-paper/65">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
