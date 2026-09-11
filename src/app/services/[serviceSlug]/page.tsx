import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/app/components/CtaSection";
import { HubWorkRow } from "@/app/components/HubWorkRow";
import { InnerPage } from "@/app/components/InnerPage";
import { PageHero } from "@/app/components/PageHero";
import { getProjectCover, getProjectGalleryImages, getProjects, getProjectsByService } from "@/lib/loadProjects";
import { getSiteUrl } from "@/lib/siteConstants";
import { getServiceBySlug, serviceSlugs, type ServiceDef, type ServiceHighlight, type ServiceSection } from "@/lib/servicesData";
import type { WorkItem } from "@/lib/workData";

type ServicePageProps = {
  params: Promise<{ serviceSlug: string }>;
};

type ModulePhoto = {
  src: string;
  alt: string;
};

function relatedProjectsHeading(service: ServiceDef): string {
  return `Related ${service.name.toLowerCase()} projects`;
}

function modulePhoto(service: ServiceDef, related: WorkItem[]): ModulePhoto {
  const fallback: ModulePhoto = { src: service.galleryImage, alt: service.galleryImageAlt };

  for (const item of related) {
    const gallery = getProjectGalleryImages(item, service.slug);
    const photos = gallery.length > 0 ? gallery : [getProjectCover(item, service.slug)];
    const photo = photos.find((entry) => entry.src);
    if (photo?.src) return { src: photo.src, alt: photo.alt || item.name };
  }

  return fallback;
}

export function generateStaticParams() {
  return serviceSlugs.map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return { title: "Page not found" };

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

function IncludeItem({
  title,
  body,
  href,
  linkLabel,
}: {
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
}) {
  const isExternal = Boolean(href && /^https?:\/\//.test(href));

  return (
    <li>
      <span className="service-module__list-head">
        <span className="service-module__marker" aria-hidden="true" />
        <span className="service-module__list-title">{title}</span>
      </span>
      <span className="service-module__list-text">{body}</span>
      {href ? (
        isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow mt-2 inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
          >
            {linkLabel ?? "Learn more"}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7v8" />
            </svg>
          </a>
        ) : (
          <Link
            href={href}
            className="link-arrow mt-2 inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
          >
            {linkLabel ?? "Learn more"}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        )
      ) : null}
    </li>
  );
}

function includeItems(service: ServiceDef): {
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
}[] {
  const sections = service.sections.map((section: ServiceSection) => ({
    title: section.title,
    body: section.body,
    href: section.href,
    linkLabel: section.href ? "Learn more" : undefined,
  }));
  const highlights = (service.highlights ?? []).map((highlight: ServiceHighlight) => ({
    title: highlight.heading,
    body: highlight.body,
    href: highlight.linkHref,
    linkLabel: highlight.linkLabel,
  }));
  return [...sections, ...highlights];
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const taggedWork = getProjectsByService(service.slug);
  const relatedWork = taggedWork.length > 0 ? taggedWork : getProjects();
  const photo = modulePhoto(service, taggedWork);
  const included = includeItems(service);

  return (
    <InnerPage
      hero={
        <PageHero
          title={service.headline}
          accent={service.headlineAccent}
          image={service.galleryImage}
          imageAlt={service.galleryImageAlt}
        />
      }
    >
      <section className="service-module">
        <div className="container-main">
          <div className="service-module__grid">
            <div className="service-module__copy">
              <h2 className="heading-section service-module__heading">{service.name}</h2>
              <p className="lead service-module__body">{service.body}</p>
              {service.benefits ? <p className="lead service-module__body">{service.benefits}</p> : null}

              {included.length > 0 ? (
                <div className="service-module__includes">
                  <h3 className="service-module__includes-heading">What's included</h3>
                  <ul className="service-module__list">
                    {included.map((item) => (
                      <IncludeItem
                        key={item.title}
                        title={item.title}
                        body={item.body}
                        href={item.href}
                        linkLabel={item.linkLabel}
                      />
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="service-module__media relative">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 900px) 44vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {relatedWork.length > 0 ? (
        <HubWorkRow
          items={relatedWork}
          heading={taggedWork.length > 0 ? relatedProjectsHeading(service) : "Projects we're proud of"}
          serviceSlug={taggedWork.length > 0 ? service.slug : undefined}
        />
      ) : null}

      <CtaSection headline={service.ctaHeadline} />
    </InnerPage>
  );
}
