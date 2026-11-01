import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Render from "@/components/renders/Render";
import { EnquireLink } from "@/components/ui";
import type { RenderKey, Service } from "@/lib/site";

/** Shoppable-style product tile without a price: render on a studio stage, then name and an enquiry. */
export function ProductTile({
  name,
  note,
  render,
  meta,
  specs,
  dark = false,
  index,
}: {
  name: string;
  note: string;
  render: RenderKey;
  meta?: string;
  specs?: readonly string[];
  dark?: boolean;
  index?: number;
}) {
  return (
    <article className="group flex h-full flex-col">
      <div className={`relative aspect-[4/3.4] overflow-hidden rounded-[24px] ${dark ? "stage-dark" : "stage"}`}>
        {meta && (
          <span
            className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[12px] font-medium ${
              dark ? "bg-white/10 text-white/80" : "bg-white/80 text-ink-2 backdrop-blur"
            }`}
          >
            {meta}
          </span>
        )}
        {index !== undefined && (
          <span className={`absolute right-5 top-4 z-10 text-[12px] tabular-nums ${dark ? "text-white/40" : "text-ink-3"}`}>
            {String(index).padStart(2, "0")}
          </span>
        )}
        <Render
          kind={render}
          title={name}
          dark={dark}
          className="absolute inset-0 m-auto h-[84%] w-[84%] transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:-translate-y-2 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <h3 className={`text-[19px] font-semibold leading-snug tracking-[-0.015em] ${dark ? "text-white" : "text-ink"}`}>{name}</h3>
        <p className={`mt-2 text-[15px] leading-relaxed ${dark ? "text-mist" : "text-ink-2"}`}>{note}</p>
        {specs && specs.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {specs.map((s) => (
              <li
                key={s}
                className={`rounded-full px-3 py-1 text-[12.5px] ${dark ? "bg-white/[0.07] text-white/75" : "bg-stage text-ink-2"}`}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-5">
          <EnquireLink item={name} variant={dark ? "ghost-light" : "outline"} />
        </div>
      </div>
    </article>
  );
}

/** Service tile: leads with the render, opens the service page, with a direct enquiry. */
export function ServiceTile({ service, large = false, index }: { service: Service; large?: boolean; index: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_1px_0_var(--color-line)]">
      <Link href={`/services/${service.slug}`} className="absolute inset-0 z-10" aria-label={`Explore ${service.name}`} />
      <div className={`stage relative overflow-hidden ${large ? "min-h-[320px] flex-1 lg:min-h-[420px]" : "aspect-[16/10]"}`}>
        <span className="absolute left-6 top-5 text-[12px] font-medium tabular-nums text-ink-3">{String(index).padStart(2, "0")}</span>
        <Render
          kind={service.render}
          title={service.name}
          className={`absolute inset-0 m-auto transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:-translate-y-2 group-hover:scale-[1.05] ${
            large ? "h-[86%] w-[86%]" : "h-full w-full"
          }`}
        />
        <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-col gap-2 p-6 sm:p-7">
        <p className="eyebrow text-brand">{service.kicker}</p>
        <h3 className={`display ${large ? "text-[clamp(2rem,3.2vw,2.75rem)]" : "text-[28px]"} text-ink`}>{service.name}</h3>
        <p className="max-w-md text-[15px] leading-relaxed text-ink-2">{service.short}</p>
      </div>
    </article>
  );
}
