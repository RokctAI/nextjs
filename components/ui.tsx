import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { enquireHref } from "@/lib/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1360px] px-4 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  dark = false,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  action?: ReactNode;
}) {
  return (
    <div data-reveal className="grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <Eyebrow className={dark ? "text-brand-glow" : "text-brand"}>{eyebrow}</Eyebrow>
        <h2 className={`display mt-4 text-[clamp(2.4rem,5.2vw,4.6rem)] ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      </div>
      <div className="md:col-span-5 md:pb-2">
        {intro && <p className={`max-w-md text-[17px] leading-relaxed ${dark ? "text-mist" : "text-ink-2"}`}>{intro}</p>}
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
}

type Variant = "solid" | "outline" | "light" | "ghost-light";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-ink text-white hover:bg-brand",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-brand hover:text-white",
  "ghost-light": "border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink",
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
  external = false,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  "aria-label"?: string;
}) {
  const cls = `group inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-300 ${VARIANTS[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

/** Every product and service leads to the enquiry form with the item pre-filled. */
export function EnquireLink({
  item,
  label = "Enquire",
  variant = "outline",
  className = "",
}: {
  item: string;
  label?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <ButtonLink href={enquireHref(item)} variant={variant} className={`h-11 px-5 text-[14px] ${className}`} aria-label={`${label}: ${item}`}>
      {label}
    </ButtonLink>
  );
}
