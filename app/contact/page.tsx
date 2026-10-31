import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import MapCard from "@/components/MapCard";
import { Container, Eyebrow } from "@/components/ui";
import { BRAND, CONTACT, LEGAL_ENTITY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${BRAND} for PPE, hydraulic systems, plant maintenance, machine rebuilding and cleaning services. Request a quote or send an enquiry.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
        eyebrow="Contact"
        title="Let's talk about your site."
        intro="Tell us what you need, from a single product to a full-site service, and we'll respond with a tailored solution."
      />
      <section id="enquiry" className="scroll-mt-24 pb-24 md:pb-32">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<ContactForm variant="full" />}>
              <ContactForm variant="full" prefillFromUrl />
            </Suspense>
          </div>
          <aside className="space-y-5 lg:col-span-5">
            <div className="ink-slab rounded-[28px] bg-ink p-8 text-white sm:p-10">
              <Eyebrow className="text-brand-glow">Direct</Eyebrow>
              <ul className="mt-8 space-y-7">
                <li className="flex gap-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-white/50" aria-hidden="true" />
                  <div>
                    <p className="text-[13px] text-white/50">Email</p>
                    <a href={`mailto:${CONTACT.email}`} className="mt-1 block break-all text-[20px] font-semibold hover:text-brand-glow">
                      {CONTACT.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-white/50" aria-hidden="true" />
                  <div>
                    <p className="text-[13px] text-white/50">Phone</p>
                    {CONTACT.phones.map((p) => (
                      <a key={p.href} href={p.href} className="mt-1 block text-[20px] font-semibold hover:text-brand-glow">
                        {p.display} <span className="text-[13px] font-normal text-white/50">{p.label}</span>
                      </a>
                    ))}
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-white/50" aria-hidden="true" />
                  <div>
                    <p className="text-[13px] text-white/50">Address</p>
                    <address className="mt-1 text-[17px] not-italic leading-relaxed text-white/90" data-redact="address">
                      {CONTACT.address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </li>
              </ul>
              <p className="mt-10 border-t border-white/10 pt-6 text-[13px] text-white/50">{LEGAL_ENTITY}</p>
            </div>
            <MapCard />
          </aside>
        </Container>
      </section>
    </>
  );
}
