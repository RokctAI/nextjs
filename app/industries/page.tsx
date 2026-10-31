import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Scene from "@/components/renders/Scenes";
import { ButtonLink, Container, EnquireLink, Eyebrow } from "@/components/ui";
import { INDUSTRIES, SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries Served",
  description:
    "PPE, hydraulics, plant maintenance and cleaning for mining, agriculture and government: the challenges each sector faces and how we address them.",
};

const RELATED: Record<string, string[]> = {
  mining: ["ppe-supply-and-management", "hydraulic-systems", "machine-rebuilding-and-refurbishment"],
  agriculture: ["hydraulic-systems", "ppe-supply-and-management", "cleaning-services"],
  government: ["ppe-supply-and-management", "cleaning-services", "plant-maintenance"],
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/industries", label: "Industries" },
        ]}
        eyebrow="Industries served"
        title="Mining. Agriculture. Government."
        intro="Each sector has its own conditions, risks and rules. Our experience across all three lets us offer strategic, effective and compliant solutions."
        actions={
          <>
            {INDUSTRIES.map((i) => (
              <ButtonLink key={i.id} href={`#${i.id}`} variant="outline" className="h-11 px-5 text-[14px]">
                {i.name}
              </ButtonLink>
            ))}
          </>
        }
      />

      {INDUSTRIES.map((ind, idx) => (
        <section key={ind.id} id={ind.id} className={`scroll-mt-20 py-20 md:py-28 ${idx % 2 === 0 ? "bg-stage/50" : ""}`}>
          <Container>
            <div data-reveal className="overflow-hidden rounded-[32px]">
              <Scene kind={ind.scene} className="aspect-[16/10] w-full md:aspect-[21/9]" />
            </div>
            <div className="mt-12 grid gap-12 lg:grid-cols-12">
              <div data-reveal className="lg:col-span-4">
                <Eyebrow className="text-brand">{String(idx + 1).padStart(2, "0")} · Sector</Eyebrow>
                <h2 className="display mt-4 text-[clamp(2.6rem,5vw,4.6rem)] text-ink">{ind.name}</h2>
                <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-ink-2">{ind.lede}</p>
                <div className="mt-8">
                  <EnquireLink item={`${ind.name} sector solutions`} label="Discuss your site" variant="solid" />
                </div>
              </div>
              <div data-reveal className="grid gap-5 sm:grid-cols-2 lg:col-span-8" style={{ ["--reveal-delay" as string]: "100ms" }}>
                <div className="rounded-[24px] bg-white p-7 shadow-[0_1px_0_var(--color-line)]">
                  <h3 className="eyebrow text-ink-3">The challenge</h3>
                  <ul className="mt-5 space-y-4">
                    {ind.challenges.map((c) => (
                      <li key={c} className="flex gap-3 text-[16px] leading-relaxed text-ink-2">
                        <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-3" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[24px] bg-ink p-7 text-white">
                  <h3 className="eyebrow text-brand-glow">How we address it</h3>
                  <ul className="mt-5 space-y-4">
                    {ind.response.map((r) => (
                      <li key={r} className="flex gap-3 text-[16px] leading-relaxed text-white/85">
                        <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[13px] text-ink-3">Related services</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {RELATED[ind.id].map((slug) => {
                      const s = SERVICES.find((x) => x.slug === slug)!;
                      return (
                        <li key={slug}>
                          <Link href={`/services/${slug}`} className="group inline-flex h-10 items-center gap-2 rounded-full border border-line-2 px-4 text-[14px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white">
                            {s.name}
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
