"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { BRAND, SERVICES } from "@/lib/site";

const EMPTY = { name: "", email: "", phone: "", company: "", location: "", interest: "", message: "" };

const template = (item: string) => `Hello ${BRAND} team, I'd like to request a quote for: ${item}.`;

interface Props {
  variant?: "full" | "quick";
  /** Read ?enquiry= from the URL to pre-fill the product or service. */
  prefillFromUrl?: boolean;
}

export default function ContactForm({ variant = "full", prefillFromUrl = false }: Props) {
  return prefillFromUrl ? <PrefilledForm variant={variant} /> : <Form variant={variant} initialItem="" />;
}

function PrefilledForm({ variant }: { variant: "full" | "quick" }) {
  const params = useSearchParams();
  const item = (params.get("enquiry") ?? "").slice(0, 160);
  // Re-key on the item so a new enquiry link re-seeds the form.
  return <Form key={item} variant={variant} initialItem={item} />;
}

function Form({ variant, initialItem }: { variant: "full" | "quick"; initialItem: string }) {
  const [data, setData] = useState(() =>
    initialItem ? { ...EMPTY, interest: initialItem, message: template(initialItem) } : EMPTY
  );
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const quick = variant === "quick";

  useEffect(() => {
    if (initialItem && window.location.hash === "#enquiry") {
      nameRef.current?.focus({ preventScroll: true });
    }
  }, [initialItem]);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    // Simulated submission: no backend is connected yet.
    window.setTimeout(() => setState("sent"), 1400);
  };

  if (state === "sent") {
    return (
      <div role="status" className="flex animate-pop flex-col items-start gap-5 rounded-[28px] bg-white p-8 shadow-[0_1px_0_var(--color-line)] sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="display text-[36px] text-ink">Thank you. Your enquiry is in.</h3>
        <p className="max-w-md text-[16px] leading-relaxed text-ink-2">
          Thank you for choosing {BRAND}. Our team is reviewing your request and will be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setData(EMPTY);
            setState("idle");
          }}
          className="h-11 rounded-full border border-ink/20 px-5 text-[14px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const label = "mb-2 block text-[13px] font-medium text-ink-2";

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-white p-6 shadow-[0_1px_0_var(--color-line)] sm:p-10" aria-label="Enquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Full name</span>
          <input ref={nameRef} required autoComplete="name" value={data.name} onChange={set("name")} placeholder="e.g. Naledi Mokoena" className="field" />
        </label>
        <label className="block">
          <span className={label}>Email</span>
          <input type="email" required autoComplete="email" value={data.email} onChange={set("email")} placeholder="name@company.co.za" className="field" />
        </label>
        {!quick && (
          <>
            <label className="block">
              <span className={label}>Phone</span>
              <input type="tel" autoComplete="tel" value={data.phone} onChange={set("phone")} placeholder="Optional" className="field" />
            </label>
            <label className="block">
              <span className={label}>Company or organisation</span>
              <input autoComplete="organization" value={data.company} onChange={set("company")} placeholder="Company name" className="field" />
            </label>
            <label className="block sm:col-span-2">
              <span className={label}>Site or delivery location</span>
              <input autoComplete="off" value={data.location} onChange={set("location")} placeholder="Town, site or facility" className="field" />
            </label>
          </>
        )}
        <label className="block sm:col-span-2">
          <span className={label}>Product or service of interest</span>
          <input
            list="enquiry-options"
            value={data.interest}
            onChange={set("interest")}
            placeholder="Choose or type a product or service"
            className="field"
          />
          <datalist id="enquiry-options">
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name} />
            ))}
          </datalist>
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Message</span>
          <textarea
            required
            rows={quick ? 3 : 5}
            value={data.message}
            onChange={set("message")}
            placeholder="Quantities, sizes, machine models or timelines help us respond faster."
            className="field resize-none"
          />
        </label>
      </div>
      <div className="mt-7 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="max-w-xs text-[13px] leading-relaxed text-ink-3">We keep client information confidential and never share it with third parties.</p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-7 text-[15px] font-semibold text-white transition-colors hover:bg-brand disabled:cursor-wait disabled:opacity-70"
        >
          {state === "sending" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
              Sending enquiry…
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
