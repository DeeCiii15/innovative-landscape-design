import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaSection } from "@/app/components/CtaSection";
import { PageHero } from "@/app/components/PageHero";
import {
  FLORENCE_LANDSCAPE_PATH,
  FLORENCE_LANDSCAPE_TITLE,
  FLORENCE_LANDSCAPE_TITLE_SHORT,
  getSiteUrl,
  PRIMARY_STATE_ABBR,
  SERVICE_AREAS,
  WORK_PATH,
} from "@/lib/siteConstants";
import { getLocationByPath } from "@/lib/locations";
import { getMainService } from "@/lib/servicesData";
import { getWorkItemsByCategory, workItemPath } from "@/lib/workData";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: { absolute: FLORENCE_LANDSCAPE_TITLE },
  description: `Landscape design in Florence, ${PRIMARY_STATE_ABBR} from ${siteConfig.name}. Custom designs, irrigation, hardscapes, and outdoor lighting for homeowners across the Florence area.`,
  alternates: { canonical: FLORENCE_LANDSCAPE_PATH },
  openGraph: {
    title: FLORENCE_LANDSCAPE_TITLE,
    description: `Landscape design services for homes in Florence, ${PRIMARY_STATE_ABBR}.`,
    url: `${getSiteUrl()}${FLORENCE_LANDSCAPE_PATH}`,
  },
};

type LocationHubProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function FlorenceLandscapeHub({ searchParams }: LocationHubProps) {
  const location = getLocationByPath(FLORENCE_LANDSCAPE_PATH);
  if (!location || location.status !== "live") notFound();

  const { from } = await searchParams;
  const service = getMainService();
  const featuredWork = getWorkItemsByCategory(service.workCategory).slice(0, 3);
  const backHref =
    from && from.startsWith("/") && !from.startsWith("//") ? from : undefined;

  return (
    <div>
      <PageHero
        title={FLORENCE_LANDSCAPE_TITLE_SHORT}
        description={`Custom landscape design for homeowners in Florence and nearby communities including ${SERVICE_AREAS.filter((c) => c !== "Florence").join(", ")}.`}
        image={service.galleryImage}
        imageAlt={service.galleryImageAlt}
      />

      <section className="py-16 sm:py-24">
        <div className="container-main max-w-3xl">
          {backHref && (
            <Link href={backHref} className="mb-8 inline-flex text-sm font-semibold text-[var(--color-green)] hover:underline">
              Back to project
            </Link>
          )}
          <h2 className="heading-section">Why Florence homeowners choose us</h2>
          <p className="mt-5 leading-relaxed text-[var(--color-muted)]">{service.intro}</p>
          <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{service.body}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Request a free estimate
            </Link>
            <Link href={`/services/${service.slug}`} className="btn-secondary">
              Learn about landscape design
            </Link>
          </div>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-light)] bg-[var(--color-surface)]">
        <div className="container-main">
          <h2 className="heading-section">Local landmarks & neighborhoods we know</h2>
          <p className="lead mt-4 max-w-2xl">
            From West Florence to downtown, we design landscapes that fit how Florence homes and yards actually live.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["West Florence", "Downtown Florence", "Florence business district", ...SERVICE_AREAS.filter((c) => c !== "Florence")].map(
              (place) => (
                <li key={place}>
                  <h3 className="rounded-lg border border-[var(--color-border-light)] bg-white px-5 py-4 text-base font-semibold text-[var(--color-ink)]">
                    {place}
                  </h3>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-main">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="heading-section">Featured Florence-area projects</h2>
              <p className="lead mt-4">Browse related work, then request an estimate for your property.</p>
            </div>
            <Link href={WORK_PATH} className="link-arrow">
              All projects
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredWork.map((item) => (
              <Link
                key={item.slug}
                href={`${workItemPath(item.categorySlug, item.slug)}?from=${encodeURIComponent(FLORENCE_LANDSCAPE_PATH)}`}
                className="surface-card group block overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.after}
                    alt={item.afterAlt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-5 py-5">
                  <h3 className="font-bold tracking-tight text-[var(--color-ink)]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)] line-clamp-2">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection headline="Planning a landscape project in Florence?" />
    </div>
  );
}
