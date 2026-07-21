import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { CtaSection } from "../components/CtaSection";
import { PageHero } from "../components/PageHero";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: `Contact Landscape Design in Florence, SC | ${siteConfig.name}`,
  },
  description: `Contact ${siteConfig.name} in Florence, SC for landscape design, irrigation, hardscapes, and outdoor lighting.`,
  alternates: { canonical: "/contact" },
};

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

export default function ContactPage() {
  return (
    <div>
      <PageHero
        title="Let's talk about your project"
        description="Request a free estimate for landscape design, irrigation, hardscapes, or outdoor lighting."
        image={siteConfig.aboutBg}
        imageAlt="Landscape project in Florence, SC"
      />

      <section className="py-16 sm:py-24">
        <div className="container-main grid gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <div className="surface-card p-7 sm:p-9 lg:order-2">
            <h2 className="text-2xl font-bold text-[var(--color-ink)]">Send a message</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Fill out the form and we&apos;ll open your email app so you can send it directly.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="lg:order-1">
            <h2 className="heading-section">How to reach us</h2>
            <address className="mt-8 space-y-6 not-italic">
              <div>
                <p className="label-tag">Address</p>
                <p className="mt-2 text-[var(--color-muted)]">{siteConfig.address}</p>
              </div>
              <div>
                <p className="label-tag">Phone</p>
                <a href={`tel:${phoneDigits}`} className="mt-2 block text-xl font-bold text-[var(--color-ink)] hover:text-[var(--color-green)]">
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <p className="label-tag">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="mt-2 block font-semibold text-[var(--color-ink-soft)] hover:text-[var(--color-green)]">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="label-tag">Hours</p>
                <p className="mt-2 text-[var(--color-muted)]">{siteConfig.openingHours}</p>
              </div>
              <div>
                <p className="label-tag">Service area</p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{siteConfig.serviceAreas.join(" · ")}</p>
              </div>
            </address>

            <div className="mt-10 overflow-hidden rounded-xl ring-1 ring-[var(--color-border-light)]">
              <iframe
                title="Map to Innovative Landscape Design"
                src="https://maps.google.com/maps?q=2027+Rosedale+St,+Florence,+SC+29501&output=embed"
                className="h-64 w-full border-0 sm:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <p className="mt-6 text-sm text-[var(--color-muted)]">
              Have a question first?{" "}
              <Link href="/services/landscape-design#faq" className="font-semibold text-[var(--color-green)] hover:underline">
                Read our FAQs
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
