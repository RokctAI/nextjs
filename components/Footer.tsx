import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/Logo";

const COLUMNS = [
  {
    title: "PPE Catalog",
    links: [
      ["Women's Worksuits Range", "#womens-suits"],
      ["Full-Body Fall Harnesses", "#ppe"],
      ["SABS Steel-Toe Boots", "#ppe"],
      ["Arc-Flash Mine Helmets", "#ppe"],
    ],
  },
  {
    title: "Hydraulics",
    links: [
      ["Excavator Cylinder Reman", "#hydraulics"],
      ["Field Contamination Audits", "#hydraulics"],
      ["Custom High-Pressure Crimping", "#hydraulics"],
      ["Emergency Fluid Purges", "#hydraulics"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="on-dark border-t-2 border-hivis bg-shaft text-paper">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 md:grid-cols-12 md:py-20">
          <div className="col-span-2 md:col-span-4">
            <Logo tone="paper" />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-paper/60">
              ROK is a registered manufacturer and service provider of heavy-duty industrial mining equipment, certified PPE wear, and hydraulic automation rigs.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="col-span-1 md:col-span-2">
              <p className="eyebrow text-hivis">{col.title}</p>
              <ul className="mt-5 space-y-3 text-[15px] text-paper/70">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="transition-colors hover:text-paper">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-4">
            <p className="eyebrow text-hivis">Mine Operations</p>
            <ul className="mt-5 space-y-4 text-[15px]">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-paper/50" aria-hidden="true" />
                <span className="font-display text-2xl font-bold tracking-wide">+27 (0) 11 405 ROKT</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-paper/50" aria-hidden="true" />
                <a href="mailto:ops@rokct.io" className="font-mono text-paper/80 hover:text-paper">
                  ops@rokct.io
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-paper/50" aria-hidden="true" />
                <span className="text-paper/70">Industria West, Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the bottom edge like a stencil plate */}
      <div className="overflow-hidden border-t border-shaft-3">
        <div className="mx-auto flex max-w-[1320px] items-end justify-between gap-6 px-4 sm:px-6">
          <p
            aria-hidden="true"
            className="translate-y-[14%] select-none font-display text-[34vw] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-shaft-3 lg:text-[420px]"
          >
            ROK
          </p>
          <div className="hidden pb-12 text-right md:block">
            <p className="font-display text-4xl font-bold uppercase leading-[0.95] text-paper/85 lg:text-5xl">
              Precision PPE &amp;
              <br />
              heavy-duty mining hydraulics
            </p>
            <a
              href="#top"
              className="mt-6 inline-flex items-center gap-2 border border-paper/25 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:border-hivis hover:text-hivis"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-shaft-3 bg-ink">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-4 py-5 font-mono text-[11px] text-paper/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} ROK Industrial · Built with{" "}
            <span role="img" aria-label="love" className="text-hivis">
              ♥
            </span>{" "}
            by ROKCT
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="hover:text-paper">Privacy Policy</a>
            <a href="#" className="hover:text-paper">SABS Certifications</a>
            <a href="#" className="hover:text-paper">Verification Gateway</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
