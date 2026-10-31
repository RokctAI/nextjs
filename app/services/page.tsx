import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Render from "@/components/renders/Render";
import { ButtonLink, Container, EnquireLink } from "@/components/ui";
import { SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "PPE supply and management, hydraulic systems, plant maintenance, cleaning services, and machine rebuilding and refurbishment for mining, agriculture and government.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
        ]}
        eyebrow="Services"
        title="Everything the frontline runs on."
        intro="Five services, each tailored to the site, the team and the job. Explore a service, or send us an enquiry and we'll put together a solution."
        actions={<ButtonLink href="/contact#enquiry">Request a quote</ButtonLink>}
      />
      <section className="pb-24 md:pb-32">
        <Container>
          <ul className="space-y-6">
            {SERVICES.map((s, i) => (
              <li key={s.slug} data-reveal>
                <article className="group grid overflow-hidden rounded-[32px] bg-white shadow-[0_1px_0_var(--color-line)] lg:grid-cols-2">
                  <Link
                    href={`/services/${s.slug}`}
                    aria-label={`Explore ${s.name}`}
                    className={`stage relative block aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[460px] ${i % 2 ? "lg:order-2" : ""}`}
                  >
                    <span className="absolute left-7 top-6 text-[13px] tabular-nums text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <Render
                      kind={s.render}
                      title={s.name}
                      className="absolute inset-0 m-auto h-[80%] w-[80%] transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:-translate-y-2 group-hover:scale-[1.04]"
                    />
                  </Link>
                  <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
                    <p className="eyebrow text-brand">{s.kicker}</p>
                    <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.6rem)] text-ink">{s.name}</h2>
                    <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-2">{s.short}</p>
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {s.offerings.map((o) => (
                        <li key={o.name} className="rounded-full bg-stage px-3.5 py-1.5 text-[13px] text-ink-2">
                          {o.name}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-9 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/services/${s.slug}`}
                        className="group/l inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-semibold text-white transition-colors hover:bg-brand"
                      >
                        Explore
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/l:translate-x-1" aria-hidden="true" />
                      </Link>
                      <EnquireLink item={s.name} />
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
