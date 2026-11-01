import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { Container } from "@/components/ui";
import { BRAND, BUILDER, CONTACT, FOUNDED, LEGAL_ENTITY, NAV, SERVICES } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="on-dark bg-night text-white">
      <Container>
        <div className="grid gap-12 border-b border-night-3 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <Logo tone="light" showLegal />
            <p className="mt-8 max-w-sm text-[16px] leading-relaxed text-mist">
              A 100% black woman-owned supplier of PPE, hydraulic systems, plant maintenance and cleaning services for
              mining, agriculture and government.
            </p>
            <Link
              href="/contact#enquiry"
              className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-brand hover:text-white"
            >
              Request a quote
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <nav aria-label="Services" className="md:col-span-3">
            <p className="eyebrow text-brand-glow">Services</p>
            <ul className="mt-5 space-y-3 text-[15px] text-mist">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="transition-colors hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-2">
            <p className="eyebrow text-brand-glow">Company</p>
            <ul className="mt-5 space-y-3 text-[15px] text-mist">
              {[{ href: "/", label: "Home" }, ...NAV].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="eyebrow text-brand-glow">Contact</p>
            <address className="mt-5 space-y-3 text-[15px] not-italic text-mist">
              <a href={`mailto:${CONTACT.email}`} className="block break-all text-white hover:text-brand-glow">
                {CONTACT.email}
              </a>
              {CONTACT.phones.map((p) => (
                <a key={p.href} href={p.href} className="block hover:text-white">
                  {p.display}
                </a>
              ))}
              <span className="block pt-1 leading-relaxed" data-redact="address">
                {CONTACT.address.join(", ")}
              </span>
            </address>
          </div>
        </div>

        {/* oversized wordmark */}
        <div className="overflow-hidden" aria-hidden="true">
          <p className="display translate-y-[18%] select-none text-center text-[21vw] leading-[0.8] tracking-[-0.05em] text-night-3 lg:text-[300px]">
            {BRAND.toLowerCase()}
          </p>
        </div>
      </Container>

      <div className="border-t border-night-3 bg-[#08090b]">
        <Container className="flex flex-col gap-3 py-6 text-[13px] text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND} · Built with{" "}
            <span role="img" aria-label="love" className="text-gold">
              ♥
            </span>{" "}
            by {BUILDER}
          </p>
          <p>
            {LEGAL_ENTITY} · 100% black woman-owned · Est. {FOUNDED} ·{" "}
            <a href="#" className="underline-offset-4 hover:text-white hover:underline">
              Privacy Policy
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
