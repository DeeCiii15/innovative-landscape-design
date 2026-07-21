import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfterReveal } from "@/app/components/BeforeAfterReveal";
import { CtaSection } from "@/app/components/CtaSection";
import { FaqSection } from "@/app/components/FaqSection";
import { PageHero } from "@/app/components/PageHero";
import { getSiteUrl } from "@/lib/siteConstants";
import { getServiceBySlug, serviceSlugs, type ServiceDef } from "@/lib/servicesData";
import { getFeaturedWorkForService, getWorkItemsByCategory, workCategoryPath, workItemPath } from "@/lib/workData";
import { siteConfig } from "@/lib/siteConfig";

type ServicePageProps = {
  params: Promise<{ serviceSlug: string }>;
};

function relatedProjectsHeading(service: ServiceDef): string {
  switch (service.slug) {
    case "landscape-design":
      return "Related landscape projects";
    case "irrigation":
      return "Related irrigation projects";
    case "hardscapes":
      return "Related hardscape projects";
    case "outdoor-lighting":
      return "Related lighting projects";
    default:
      return `Related ${service.name.toLowerCase()} projects`;
  }
}

function reviewsHeading(service: ServiceDef): string {
  switch (service.slug) {
    case "landscape-design":
      return "What clients say about our landscaping";
    case "irrigation":
      return "What clients say about our irrigation";
    case "hardscapes":
      return "What clients say about our hardscapes";
    case "outdoor-lighting":
      return "What clients say about our lighting";
    default:
      return `What clients say about our ${service.name.toLowerCase()}`;
  }
}

export function generateStaticParams() {
  return serviceSlugs.map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return { title: "Services" };

  const canonical = `/services/${service.slug}`;
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${getSiteUrl()}${canonical}`,
      images: [{ url: service.galleryImage, alt: service.galleryImageAlt }],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const relatedWork = getWorkItemsByCategory(service.workCategory);
  const featured = getFeaturedWorkForService(service.slug) ?? relatedWork[0];
  const reviews = siteConfig.reviews.filter((r) => r.serviceSlug === service.slug);

  return (
    <div>
      <PageHero
        title={`${service.headline} ${service.headlineAccent}`}
        description={service.intro}
        image={service.galleryImage}
        imageAlt={service.galleryImageAlt}
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-main grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-1">
            <p className="text-lg font-medium text-[var(--color-green)]">{service.tagline}</p>
            <p className="mt-5 leading-relaxed text-[var(--color-muted)]">{service.body}</p>
            <ul className="mt-6 hidden space-y-2.5 lg:block">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm text-[var(--color-ink-soft)]">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 size-4 shrink-0 text-[var(--color-green)]" aria-hidden>
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  {bullet}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="btn-primary mt-8 hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2 lg:inline-flex"
            >
              {service.ctaButton}
            </Link>
          </div>

          {featured && (
            <div className="surface-card order-2 overflow-hidden">
              <BeforeAfterReveal
                before={featured.before}
                after={featured.after}
                beforeAlt={featured.beforeAlt}
                afterAlt={featured.afterAlt}
                aspectClassName="aspect-[4/3]"
                autoReveal
              />
            </div>
          )}

          <div className="order-3 lg:hidden">
            <Link
              href="/contact"
              className="btn-primary inline-flex w-full justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2"
            >
              {service.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      {service.partner && (
        <section className="border-t border-[var(--color-border-light)] bg-[var(--color-canvas)] py-14 sm:py-16">
          <div className="container-main max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-3xl">
              {service.partner.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{service.partner.body}</p>
            <a
              href={service.partner.linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow mt-6 inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
            >
              {service.partner.linkLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7v8" />
              </svg>
            </a>
          </div>
        </section>
      )}

      <section className="section border-t border-[var(--color-border-light)] bg-[var(--color-surface)]">
        <div className="container-main">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="heading-section">{relatedProjectsHeading(service)}</h2>
              <p className="lead mt-4 max-w-2xl">See before-and-after examples of our {service.name.toLowerCase()} work.</p>
            </div>
            <Link
              href={workCategoryPath(service.workCategory)}
              className="link-arrow shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
            >
              View {service.name} gallery
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {relatedWork.slice(0, 4).map((item) => (
              <Link
                key={item.slug}
                href={workItemPath(item.categorySlug, item.slug)}
                className="surface-card group block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.after}
                    alt={item.afterAlt}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-5 py-5">
                  <h3 className="text-lg font-bold tracking-tight text-[var(--color-ink)]">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <FaqSection
          faqs={service.faqs}
          heading={`${service.name} FAQ`}
          lead={`Common questions about ${service.name.toLowerCase()} with ${siteConfig.name}.`}
          className="faq--canvas"
        />
      )}

      {reviews.length > 0 && (
        <section className="section border-t border-[var(--color-border-light)] bg-[var(--color-surface)]">
          <div className="container-main">
            <h2 className="heading-section">{reviewsHeading(service)}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {reviews.map((review) => (
                <blockquote key={review.id} className="surface-card px-6 py-6">
                  <p className="leading-relaxed text-[var(--color-ink-soft)]">&ldquo;{review.text}&rdquo;</p>
                  <footer className="mt-4 text-sm font-semibold text-[var(--color-ink)]">
                    {review.name}
                    <span className="font-normal text-[var(--color-muted)]"> · {review.location}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection headline={service.ctaHeadline} />
    </div>
  );
}
