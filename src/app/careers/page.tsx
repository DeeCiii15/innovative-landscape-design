import type { Metadata } from "next";
import Link from "next/link";
import { CareerForm } from "@/app/components/CareerForm";
import { CtaSection } from "@/app/components/CtaSection";
import { InnerPage } from "@/app/components/InnerPage";
import { PageHero } from "@/app/components/PageHero";
import { siteConfig } from "@/lib/siteConfig";
import { CAREERS_PATH, getSiteUrl } from "@/lib/siteConstants";

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

export const metadata: Metadata = {
  title: { absolute: `Careers | Landscape Jobs in Florence, SC` },
  description: `Work with ${siteConfig.name} in Florence, SC. Landscape construction, lawn care, irrigation, and design roles on a team that builds and maintains outdoor spaces.`,
  alternates: { canonical: CAREERS_PATH },
  openGraph: {
    title: `Careers | ${siteConfig.name}`,
    description: `Join the ${siteConfig.name} team in Florence, SC.`,
    url: `${getSiteUrl()}${CAREERS_PATH}`,
  },
};

export default function CareersPage() {
  return (
    <InnerPage
      hero={
        <PageHero
          title="Work with"
          accent="us"
          image={siteConfig.aboutBg}
          imageAlt="Landscape crew work in Florence, SC"
        />
      }
    >
      <section className="py-16 sm:py-24 bg-[var(--color-canvas)]">
        <div className="container-main grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="heading-section">Join the team</h2>
            <p className="lead mt-5">
              {siteConfig.name} designs, builds, and maintains landscapes in the Florence area. If you want outdoor work
              with a crew that shows up and finishes the job, send a note — even if you don&apos;t see a posted opening.
            </p>
            <ul className="mt-8 space-y-3 text-[var(--color-ink-soft)]">
              <li>Landscape construction crew</li>
              <li>Lawn and landscape maintenance</li>
              <li>Irrigation</li>
              <li>Design</li>
            </ul>
            <p className="mt-8 text-sm text-[var(--color-muted)]">
              Prefer to call?{" "}
              <a href={`tel:${phoneDigits}`} className="font-semibold text-[var(--color-green)] hover:underline">
                {siteConfig.phone}
              </a>
              {" · "}
              <Link href="/contact" className="font-semibold text-[var(--color-green)] hover:underline">
                Contact
              </Link>
            </p>
          </div>

          <div className="surface-card p-7 sm:p-9">
            <h2 className="text-2xl font-medium text-[var(--color-ink)]">Apply</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Fill this out and we&apos;ll open your email so you can send it directly.
            </p>
            <div className="mt-8">
              <CareerForm />
            </div>
          </div>
        </div>
      </section>

      <CtaSection headline="Not looking for a job?" subheadline="Request a free estimate for a home or commercial property." />
    </InnerPage>
  );
}
