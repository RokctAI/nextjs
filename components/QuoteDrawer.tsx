"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Minus, Plus, Send, Trash2, X } from "lucide-react";
import { QUOTE_ON_APPLICATION, type CartItem } from "@/components/types";

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onClearCart: () => void;
}

const EMPTY_FORM = { name: "", email: "", company: "", location: "", notes: "" };

const FIELDS: {
  key: keyof typeof EMPTY_FORM;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
}[] = [
  { key: "name", label: "Full Name", type: "text", placeholder: "e.g. Sarah Connor", autoComplete: "name" },
  { key: "email", label: "Corporate Email", type: "email", placeholder: "s.connor@mineralcorp.co.za", autoComplete: "email" },
  { key: "company", label: "Mining Enterprise", type: "text", placeholder: "Mineral Corp South Africa", autoComplete: "organization" },
  { key: "location", label: "Shaft Site / Delivery Location", type: "text", placeholder: "Rustenburg Shaft 4, North West", autoComplete: "off" },
];

const inputClass =
  "w-full border border-rule bg-[#f7f5ef] px-3 py-3 text-[15px] text-ink placeholder:text-ink-3/70 focus:border-ink focus:outline-none";

export default function QuoteDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQty,
  onClearCart,
}: QuoteDrawerProps) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);

    // Simulate API request submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClearCart();
      }, 500);
    }, 1800);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData(EMPTY_FORM);
    onClose();
  };

  const lineCount = items.length;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/70" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rfq-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-[540px] flex-col border-l-2 border-ink bg-paper shadow-[-16px_0_0_0_rgb(21_20_15/0.12)]"
      >
        {/* Form header */}
        <div className="hazard h-2.5" aria-hidden="true" />
        <div className="flex items-start justify-between gap-4 border-b border-ink px-5 py-5 sm:px-7">
          <div>
            <p className="eyebrow text-ink-3">Request for quotation</p>
            <h2 id="rfq-title" className="mt-1 font-display text-3xl font-extrabold uppercase leading-none text-ink">
              RFQ Basket Inquiry
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close quote request"
            className="flex h-10 w-10 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {isSuccess ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-6 px-5 sm:px-7">
            <span className="flex h-16 w-16 items-center justify-center bg-hivis text-ink">
              <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
            </span>
            <h3 className="font-display text-4xl font-extrabold uppercase leading-none text-ink">RFQ Submitted Successfully</h3>
            <p className="max-w-sm text-[15px] leading-relaxed text-ink-2">
              Thank you for choosing ROK. Our specialized industrial team is compiling your technical specifications. An engineer will reach out to you within 2 business hours.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="bg-ink px-6 py-3.5 font-display text-base font-bold uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ink-2"
            >
              Back to Site
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {/* Line items */}
            <section className="px-5 py-6 sm:px-7">
              <div className="flex items-baseline justify-between">
                <h3 className="eyebrow text-ink-3">Section A · Selected items</h3>
                <span className="font-mono text-[11px] tabular-nums text-ink-3">{String(lineCount).padStart(2, "0")} lines</span>
              </div>

              {items.length === 0 ? (
                <div className="mt-4 border border-dashed border-ink-3 px-6 py-10 text-center">
                  <p className="font-display text-xl font-bold uppercase text-ink">Your request basket is currently empty.</p>
                  <p className="mt-1 text-sm text-ink-3">Select products and services to request a bulk quote.</p>
                </div>
              ) : (
                <ul className="mt-4 border-t border-ink">
                  {items.map((item) => {
                    const isService = item.price === QUOTE_ON_APPLICATION;
                    return (
                      <li key={item.id} className="flex items-center justify-between gap-3 border-b border-rule py-4">
                        <div className="min-w-0">
                          <p className="line-clamp-2 font-display text-lg font-bold uppercase leading-tight text-ink">{item.name}</p>
                          <p className="mt-1 font-mono text-[11px] text-ink-3">
                            {item.category} · {item.price}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          {!isService && (
                            <div className="flex items-center border border-ink">
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, Math.max(10, item.quantity - 10))}
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="flex h-9 w-8 items-center justify-center text-ink hover:bg-paper-2"
                              >
                                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                              <span
                                className="min-w-[40px] border-x border-ink px-1 text-center font-mono text-sm font-semibold tabular-nums text-ink"
                                aria-label="Quantity"
                              >
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, item.quantity + 10)}
                                aria-label={`Increase quantity of ${item.name}`}
                                className="flex h-9 w-8 items-center justify-center text-ink hover:bg-paper-2"
                              >
                                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="flex h-9 w-9 items-center justify-center text-ink-3 transition-colors hover:bg-signal hover:text-paper"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {/* Procurement details */}
            <form onSubmit={handleSubmit} className="border-t border-ink bg-paper-2 px-5 py-6 sm:px-7">
              <h3 className="eyebrow text-ink-3">Section B · Procurement details</h3>

              <div className="mt-4 grid gap-4">
                {FIELDS.map((f) => (
                  <label key={f.key} className="block">
                    <span className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-2">
                      {f.label}
                    </span>
                    <input
                      type={f.type}
                      required
                      autoComplete={f.autoComplete}
                      value={formData[f.key]}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      className={inputClass}
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-2">
                    Custom Specs / Delivery Timeline
                  </span>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Specify custom sizing for women's worksuits or excavator model details here..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={items.length === 0 || isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-2 bg-ink px-6 py-4 font-display text-lg font-bold uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ink-2 disabled:cursor-not-allowed disabled:bg-paper-3 disabled:text-ink-3"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper border-t-transparent" aria-hidden="true" />
                    Transmitting RFQ Package...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 text-hivis" aria-hidden="true" />
                    Transmit Quote Request
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        <div className="border-t border-ink bg-ink px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/60 sm:px-7">
          ROK Industrial · ops@rokct.io · +27 (0) 11 405 ROKT
        </div>
      </div>
    </div>
  );
}
