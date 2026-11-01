import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui";

/** Inner-page hero: breadcrumb, bold headline, intro, and an optional product stage. */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  actions,
  visual,
}: {
  crumbs: { href: string; label: string }[];
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <Container className={`grid gap-10 pb-16 pt-8 md:pb-24 ${visual ? "lg:grid-cols-12 lg:items-center" : ""}`}>
        <div className={visual ? "lg:col-span-6" : "max-w-4xl"}>
          <nav aria-label="Breadcrumb" className="animate-fade">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-3">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink-2">
                      {c.label}
                    </span>
                  ) : (
                    <Link href={c.href} className="hover:text-ink">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <Eyebrow className="mt-10 animate-rise text-brand md:mt-14">{eyebrow}</Eyebrow>
          <h1 className="display mt-5 animate-rise text-[clamp(2.9rem,6.6vw,6.4rem)] text-ink [animation-delay:80ms]">{title}</h1>
          <div className="mt-7 max-w-[36rem] animate-rise text-[18px] leading-relaxed text-ink-2 [animation-delay:160ms]">{intro}</div>
          {actions && <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:240ms]">{actions}</div>}
        </div>
        {visual && <div className="animate-fade [animation-delay:200ms] lg:col-span-6">{visual}</div>}
      </Container>
    </section>
  );
}
