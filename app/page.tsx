import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SplitReveal from "@/components/split/SplitReveal";
import { SPLITS } from "@/components/split/cutaways";
import Scene from "@/components/renders/Scenes";
import WimFeature from "@/components/WimFeature";
import ContactForm from "@/components/ContactForm";
import { ServiceTile } from "@/components/Tiles";
import { ButtonLink, Container, Eyebrow, SectionHead } from "@/components/ui";
import { CONTACT, FOUNDED, INDUSTRIES, LEGAL_NAME, SERVICES, WHY_US } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesOverview />
      <WimFeature />
      <IndustriesTeaser />
      <PartnersBand />
      <QuickContact />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="stage absolute inset-x-0 bottom-0 top-0 lg:left-[50%] lg:rounded-bl-[48px]" aria-hidden="true" />
      <Container className="relative grid min-h-[calc(100svh-72px)] gap-10 pb-12 pt-10 lg:grid-cols-12 lg:gap-6 lg:pb-16 lg:pt-16">
        <div className="flex flex-col justify-center lg:col-span-6">
          <Eyebrow className="animate-rise text-brand">100% black woman-owned · Est. {FOUNDED}</Eyebrow>
          <h1 className="display mt-6 animate-rise text-[clamp(3rem,5.2vw,5.4rem)] text-ink [animation-delay:80ms]">
            Built for the people who keep industry moving.
          </h1>
          <p className="mt-8 max-w-[34rem] animate-rise text-[18px] leading-relaxed text-ink-2 [animation-delay:160ms] md:text-[19px]">
            PPE supply and management, hydraulic systems, plant maintenance, machine rebuilding and cleaning services for
            mining, agriculture and government.
          </p>
          <div className="mt-10 flex animate-rise flex-wrap gap-3 [animation-delay:240ms]">
            <ButtonLink href="/services">Explore services</ButtonLink>
            <ButtonLink href="/contact#enquiry" variant="outline">
              Request a quote
            </ButtonLink>
          </div>
        </div>

        {/* Product moment: real photo on the left, technical cutaway on the right */}
        <div className="relative flex flex-col items-center justify-center lg:col-span-6">
          <SplitReveal
            {...SPLITS.worksuit}
            eager
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 70vw, 100vw"
            className="w-full max-w-[min(560px,max(320px,calc((100svh-230px)*0.8)))] animate-fade [animation-delay:200ms]"
          />
          <p className="mt-5 flex items-center gap-3 text-[13px] text-ink-3">
            <span className="h-px w-8 bg-line-2" aria-hidden="true" />
            Hi-vis worksuit. Drag the handle to look inside.
          </p>
        </div>
      </Container>

      <div className="relative border-y border-line bg-page">
        <Container className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["100%", "Black woman-owned"],
            [String(FOUNDED), "Established"],
            ["3", "Sectors: mining, agriculture, government"],
          ].map(([v, l]) => (
            <div key={l} className="flex items-baseline gap-4 py-6 sm:flex-col sm:gap-1 sm:px-8 sm:py-8 sm:first:pl-0">
              <span className="display text-[44px] text-ink">{v}</span>
              <span className="text-[15px] text-ink-2">{l}</span>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-4">
            <Eyebrow className="text-brand">Who we are</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <p data-reveal className="display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.08] tracking-[-0.035em] text-ink">
              {LEGAL_NAME} was founded in {FOUNDED} by a seasoned industry professional who left her employer to build her
              own business, <span className="text-ink-3">and to make room for women in a sector built around men.</span>
            </p>
            <div className="mt-10" data-reveal>
              <ButtonLink href="/about" variant="outline">
                Our story
              </ButtonLink>
            </div>
          </div>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-[28px] bg-line sm:grid-cols-2 lg:grid-cols-5">
          {WHY_US.map((w, i) => (
            <li
              key={w.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              className="bg-page p-7 transition-colors duration-300 hover:bg-white"
            >
              <span className="text-[13px] tabular-nums text-brand">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.015em] text-ink">{w.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{w.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ServicesOverview() {
  const [first, ...rest] = SERVICES;
  return (
    <section className="bg-stage/50 py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Services"
          title={
            <>
              Five services.
              <br />
              One accountable partner.
            </>
          }
          intro="Every service is tailored to the site, the team and the job, whether that's PPE for a specific industry or a cleaning plan for your environment."
          action={<ButtonLink href="/services" variant="outline">All services</ButtonLink>}
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <div data-reveal className="lg:row-span-2">
            <ServiceTile service={first} large index={1} />
          </div>
          {rest.map((s, i) => (
            <div key={s.slug} data-reveal style={{ ["--reveal-delay" as string]: `${(i + 1) * 80}ms` }}>
              <ServiceTile service={s} index={i + 2} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function IndustriesTeaser() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Industries served"
          title="Where we work."
          intro="Our experience in mining, agriculture and government gives us a deep understanding of the challenges and safety requirements of each sector."
          action={<ButtonLink href="/industries" variant="outline">Industries</ButtonLink>}
        />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.id} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <Link href={`/industries#${ind.id}`} className="group block">
                <div className="overflow-hidden rounded-[24px]">
                  <Scene kind={ind.scene} className="aspect-[4/3] w-full transition-transform duration-[1200ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.04]" />
                </div>
                <div className="flex items-start justify-between gap-4 pt-5">
                  <div>
                    <h3 className="display text-[30px] text-ink">{ind.name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{ind.lede}</p>
                  </div>
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-2 transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function PartnersBand() {
  return (
    <section aria-labelledby="partners-title" className="border-y border-line py-16">
      <Container className="grid items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow className="text-ink-3">Clients and partners</Eyebrow>
          <h2 id="partners-title" className="mt-3 text-[20px] font-semibold tracking-[-0.015em] text-ink">
            Serving local mining companies, agricultural businesses and government agencies.
          </h2>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5" aria-label="Partner logos coming soon">
          {Array.from({ length: 5 }, (_, i) => (
            <li
              key={i}
              className="flex h-20 items-center justify-center rounded-[18px] border border-dashed border-line-2 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-3/70"
            >
              Logo
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function QuickContact() {
  return (
    <section className="bg-stage/50 py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-5">
          <Eyebrow className="text-brand">Quick enquiry</Eyebrow>
          <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.4rem)] text-ink">Tell us what your site needs.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-2">
            Send a short note and we&apos;ll come back to you with a tailored solution. For larger requirements, use the
            full form on our contact page.
          </p>
          <dl className="mt-10 space-y-5 text-[15px]">
            <div>
              <dt className="text-ink-3">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${CONTACT.email}`} className="text-[20px] font-semibold text-ink hover:text-brand">
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-3">Phone</dt>
              <dd className="mt-1 flex flex-wrap gap-x-5 text-[20px] font-semibold text-ink">
                {CONTACT.phones.map((p) => (
                  <a key={p.href} href={p.href} className="hover:text-brand">
                    {p.display}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>
        <div data-reveal className="lg:col-span-7" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <ContactForm variant="quick" />
        </div>
      </Container>
    </section>
  );
}
