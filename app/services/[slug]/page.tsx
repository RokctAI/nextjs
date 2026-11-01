import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import Render from "@/components/renders/Render";
import WimFeature from "@/components/WimFeature";
import PpeShowcase from "@/components/PpeShowcase";
import SplitReveal from "@/components/split/SplitReveal";
import { SERVICE_SPLIT, SPLITS } from "@/components/split/cutaways";
import { ProductTile } from "@/components/Tiles";
import { ButtonLink, Container, EnquireLink, Eyebrow, SectionHead } from "@/components/ui";
import { BRAND, SERVICES, getService } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: `${s.intro}`,
    openGraph: { title: `${s.name} | ${BRAND}`, description: s.short },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const isPpe = service.slug === "ppe-supply-and-management";
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.name },
        ]}
        eyebrow={service.kicker}
        title={service.headline}
        intro={<p>{service.intro}</p>}
        actions={
          <>
            <EnquireLink item={service.name} label="Request a quote" variant="solid" className="h-12 px-6 text-[15px]" />
            <ButtonLink href="#offer" variant="outline">
              What we offer
            </ButtonLink>
          </>
        }
        visual={
          <SplitReveal
            {...SPLITS[SERVICE_SPLIT[service.slug]]}
            eager
            sizes="(min-width: 1024px) 600px, 100vw"
            className="mx-auto w-full max-w-[600px]"
          />
        }
      />

      <section id="offer" className="scroll-mt-24 bg-stage/50 py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow="What we offer"
            title={`${service.name}, in detail.`}
            intro="Choose a product or service to send an enquiry with it already filled in."
          />
          <ul className={`mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 ${service.offerings.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {service.offerings.map((o, i) => (
              <li key={o.name} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}>
                <ProductTile name={o.name} note={o.note} render={o.render} index={i + 1} />
              </li>
            ))}
            {service.offerings.length % 3 !== 0 && service.offerings.length !== 4 && (
              <li data-reveal className={service.offerings.length % 3 === 1 ? "lg:col-span-2" : ""}>
                <div className="flex h-full min-h-[320px] flex-col justify-between ink-slab rounded-[24px] bg-ink p-8 text-white">
                  <p className="eyebrow text-brand-glow">Something specific?</p>
                  <div>
                    <p className="display text-[clamp(1.9rem,2.6vw,2.5rem)]">Tell us what your machines or teams need.</p>
                    <div className="mt-8">
                      <EnquireLink item={service.name} label="Start an enquiry" variant="light" />
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </Container>
      </section>

      {isPpe && (
        <>
          <WimFeature />
          <section className="py-24 md:py-32">
            <Container>
              <SectionHead
                eyebrow="PPE catalogue"
                title="Mining-grade protective gear."
                intro="A selection of the protective equipment we supply. Combine items in one enquiry for a bulk quote."
              />
              <div className="mt-12">
                <PpeShowcase />
              </div>
            </Container>
          </section>
        </>
      )}

      <section className={`${isPpe ? "bg-stage/50" : ""} py-24 md:py-32`}>
        <Container className="grid gap-14 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-5">
            <Eyebrow className="text-brand">Scope</Eyebrow>
            <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.4rem)] text-ink">What&apos;s included</h2>
            <ul className="mt-8 border-t border-line">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-4 border-b border-line py-4 text-[16px] text-ink">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <Eyebrow className="text-brand">Benefits</Eyebrow>
            <ul className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {service.benefits.map((b, i) => (
                <li
                  key={b.title}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                  className="flex flex-col rounded-[24px] bg-white p-7 shadow-[0_1px_0_var(--color-line)]"
                >
                  <span className="display text-[44px] text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-8 text-[19px] font-semibold tracking-[-0.015em] text-ink">{b.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="on-dark bg-night py-20 text-white md:py-28">
        <Container className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div data-reveal>
            <Eyebrow className="text-brand-glow">Enquire</Eyebrow>
            <h2 className="display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.6rem)]">Talk to us about {service.name}.</h2>
          </div>
          <EnquireLink item={service.name} label="Request a quote" variant="light" className="h-12 px-6 text-[15px]" />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <h2 className="eyebrow text-ink-3">Other services</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group flex items-center gap-4 rounded-[22px] bg-white p-3 pr-5 shadow-[0_1px_0_var(--color-line)] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(17,18,20,0.35)]">
                  <span className="stage flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[16px]">
                    <Render kind={s.render} title={s.name} className="h-[86%] w-[86%] transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <span className="flex-1 text-[15px] font-semibold leading-snug text-ink">{s.name}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-1 group-hover:text-ink" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
