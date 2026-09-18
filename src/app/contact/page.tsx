import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { InnerPage } from "../components/InnerPage";
import { PageHero } from "../components/PageHero";
import { socialTags } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { siteImages } from "@/lib/siteImages";

const title = `Contact Landscaper in Florence, SC | ${siteConfig.name}`;
const description = `Contact ${siteConfig.name} in Florence, SC for hardscapes, lighting, water features, irrigation, planting, and lawn care.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact" },
  ...socialTags({ title, description, path: "/contact" }),
};

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

export default function ContactPage() {
  return (
    <InnerPage
      hero={
        <PageHero
          title="Let's talk about your"
          accent="project"
          image={siteImages.coitCourtyard}
          imageAlt="Brick courtyard with a stone planter, palms, and seasonal color"
        />
      }
    >
      <section className="py-16 sm:py-24 bg-[var(--color-canvas)]">
        <div className="container-main grid gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <div className="surface-card p-7 sm:p-9 lg:order-2">
            <h2 className="text-2xl font-medium text-[var(--color-ink)]">Send a message</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Fill out the form and we&apos;ll get back to you.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="lg:order-1">
            <h2 className="heading-section">How to reach us</h2>
            <p className="lead mt-5">
              Request a free estimate for landscape design, installation, maintenance, or a specific service like
              hardscapes or lighting.
            </p>
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

            <div className="mt-10 overflow-hidden ring-1 ring-[var(--color-border-light)]">
              <iframe
                title="Map to Innovative Landscape Design"
                src="https://maps.google.com/maps?q=2027+Rosedale+St,+Florence,+SC+29501&output=embed"
                className="h-64 w-full border-0 sm:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <p className="mt-6 text-sm text-[var(--color-muted)]">
              Want to see how we work first?{" "}
              <Link href="/#process" className="font-semibold text-[var(--color-green)] hover:underline">
                See our process
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
