import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Logo from "@/components/Logo";
import { ButtonLink, Container, Eyebrow, SectionHead } from "@/components/ui";
import { BRAND, COMMUNITY, FOUNDED, LEGAL_ENTITY, LEGAL_NAME, MISSION, OBJECTIVES, VALUES, VISION, WHY_US } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${LEGAL_ENTITY} is a 100% black woman-owned, multi-discipline service and supply company established in ${FOUNDED}. Our story, mission, vision and values.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
        eyebrow={`About ${BRAND}`}
        title={
          <>
            Woman-owned.
            <br />
            <span className="text-brand">Built for everyone on site.</span>
          </>
        }
        intro={`${LEGAL_ENTITY} is a 100% black woman-owned, multi-discipline service and supply company, established in ${FOUNDED}.`}
      />

      {/* Founding story */}
      <section className="pb-24 md:pb-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-5">
            <div className="stage relative flex aspect-square items-center justify-center overflow-hidden rounded-[36px]">
              <Logo size="xl" className="drop-shadow-[0_30px_40px_rgba(17,18,20,0.12)]" />
              <span className="absolute bottom-6 left-7 text-[13px] text-ink-3">Est. {FOUNDED}</span>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <Eyebrow className="text-brand">Our story</Eyebrow>
            <div data-reveal className="mt-6 space-y-6 text-[18px] leading-relaxed text-ink-2">
              <p className="display text-[clamp(1.7rem,2.8vw,2.5rem)] leading-[1.12] tracking-[-0.03em] text-ink">
                {LEGAL_NAME} was founded by a seasoned professional in the industry who resigned from her previous employer to
                create her own business.
              </p>
              <p>
                The company was created to address key business opportunities in the local mining industry while empowering
                women in a male-dominated sector. It grew from hands-on experience and a genuine interest in the business, at a
                time when women in the industry were still at a disadvantage.
              </p>
              <p>
                Today we specialise in the supply and management of personal protective equipment, pump repairs, hydraulic
                cylinder repairs, hydraulic hoses and fittings, plant maintenance and cleaning services, offering customised
                solutions that prioritise safety, comfort and operational efficiency.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & vision */}
      <section className="on-dark bg-night py-24 text-white md:py-32">
        <Container className="grid gap-6 lg:grid-cols-2">
          {[
            ["Mission", MISSION],
            ["Vision", VISION],
          ].map(([k, v], i) => (
            <article key={k} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }} className="rounded-[32px] bg-night-2 p-8 sm:p-12">
              <Eyebrow className="text-brand-glow">{k}</Eyebrow>
              <p className="mt-8 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.4] tracking-[-0.015em] text-white/90">{v}</p>
            </article>
          ))}
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHead eyebrow="Core values" title="What we stand on." intro="Five values guide how we work with clients, partners and each other." />
          <ol className="mt-14 border-t border-line">
            {VALUES.map((v, i) => (
              <li key={v.title} data-reveal className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-10">
                <span className="text-[13px] tabular-nums text-brand md:col-span-1 md:pt-3">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-[clamp(2rem,3.4vw,3rem)] text-ink md:col-span-4">{v.title}</h3>
                <p className="max-w-2xl text-[16px] leading-relaxed text-ink-2 md:col-span-7 md:pt-2">{v.body}</p>
              </li>
            ))}
          </ol>
          <div data-reveal className="mt-14">
            <p className="text-[13px] text-ink-3">Our objectives</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {OBJECTIVES.map((o) => (
                <li key={o} className="rounded-full bg-stage px-4 py-2 text-[14px] font-medium text-ink">
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Why us + empowerment */}
      <section className="bg-stage/50 py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Why choose us" title="Proactive by design." />
            <div data-reveal className="mt-10 rounded-[28px] bg-white p-8 shadow-[0_1px_0_var(--color-line)]">
              <h3 className="text-[19px] font-semibold tracking-[-0.015em] text-ink">Economic empowerment</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                We aim to create jobs, up-skill local people and increase economic activity in the communities and region where
                we work.
              </p>
              <h3 className="mt-8 text-[19px] font-semibold tracking-[-0.015em] text-ink">Community</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                We support smaller social responsibility projects in our area of operation, such as:
              </p>
              <ul className="mt-4 space-y-2 text-[15px] text-ink">
                {COMMUNITY.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {[...WHY_US.filter((w) => w.title !== "Empowering women"), ...WHY_US.filter((w) => w.title === "Empowering women")].map((w, i) => (
              <li
                key={w.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${(i % 2) * 90}ms` }}
                className={`rounded-[24px] p-7 ${w.title === "Empowering women" ? "ink-slab bg-ink text-white sm:col-span-2" : "bg-white shadow-[0_1px_0_var(--color-line)]"}`}
              >
                <span className={`text-[13px] tabular-nums ${w.title === "Empowering women" ? "text-gold" : "text-brand"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`mt-6 text-[20px] font-semibold tracking-[-0.015em] ${w.title === "Empowering women" ? "text-white" : "text-ink"}`}>{w.title}</h3>
                <p className={`mt-3 text-[15px] leading-relaxed ${w.title === "Empowering women" ? "text-white/75" : "text-ink-2"}`}>{w.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Team placeholder */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHead eyebrow="Our team" title="The people behind the work." intro="Team profiles are coming soon." />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="Team profiles coming soon">
            {Array.from({ length: 4 }, (_, i) => (
              <li key={i} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <div className="stage flex aspect-[4/5] items-end justify-center overflow-hidden rounded-[24px]">
                  <svg viewBox="0 0 200 220" className="h-[78%] w-auto text-stage-2" aria-hidden="true">
                    <circle cx="100" cy="72" r="40" fill="currentColor" />
                    <path d="M20 220 C24 160 60 128 100 128 C140 128 176 160 180 220 Z" fill="currentColor" />
                  </svg>
                </div>
                <p className="mt-4 text-[16px] font-semibold text-ink-3">Profile coming soon</p>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-16 flex flex-col items-start justify-between gap-6 keep-light rounded-[28px] bg-brand p-8 text-white sm:flex-row sm:items-center sm:p-12">
            <p className="display max-w-xl text-[clamp(1.8rem,3vw,2.6rem)]">Let&apos;s build a safer, more inclusive site together.</p>
            <ButtonLink href="/contact#enquiry" variant="light">
              Get in touch
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
