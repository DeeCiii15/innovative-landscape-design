import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/app/components/CtaSection";
import { HubWorkRow } from "@/app/components/HubWorkRow";
import { InnerPage } from "@/app/components/InnerPage";
import { PageHero } from "@/app/components/PageHero";
import { getServiceHubLink } from "@/lib/audienceHubs";
import { getProjectCover, getProjectGalleryImages, getProjects, getProjectsByService } from "@/lib/loadProjects";
import { socialTags } from "@/lib/seo";
import { getServiceBySlug, serviceHero, serviceSlugs, type ServiceDef, type ServiceHighlight, type ServiceSection } from "@/lib/servicesData";
import type { WorkItem } from "@/lib/workData";

type ServicePageProps = {
  params: Promise<{ serviceSlug: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
};

type ModulePhoto = {
  src: string;
  alt: string;
};

function relatedProjectsHeading(service: ServiceDef): string {
  return `Related ${service.name.toLowerCase()} projects`;
}

function modulePhoto(service: ServiceDef, related: WorkItem[]): ModulePhoto {
  if (service.aboutImage) {
    return { src: service.aboutImage, alt: service.aboutImageAlt ?? service.galleryImageAlt };
  }

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
    ...socialTags({
      title: service.metaTitle,
      description: service.metaDescription,
      path: canonical,
      image: { url: service.galleryImage, alt: service.galleryImageAlt },
    }),
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

function withHubFrom(href: string | undefined, fromHubId?: string): string | undefined {
  if (!href || !fromHubId || !href.startsWith("/services/")) return href;
  const [path, hash] = href.split("#");
  const url = new URL(path, "https://ildsc.com");
  url.searchParams.set("from", fromHubId);
  return `${url.pathname}${url.search}${hash ? `#${hash}` : ""}`;
}

export default async function ServicePage({ params, searchParams }: ServicePageProps) {
  const { serviceSlug } = await params;
  const { from } = await searchParams;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const taggedWork = getProjectsByService(service.slug);
  const relatedWork = taggedWork.length > 0 ? taggedWork : getProjects();
  const photo = modulePhoto(service, taggedWork);
  const included = includeItems(service);
  const hubLink = getServiceHubLink(service.family, from);
  const fromHubId = typeof from === "string" ? from : from?.[0];
  const hero = serviceHero(service);

  return (
    <InnerPage
      hero={
        <PageHero
          title={service.headline}
          accent={service.headlineAccent}
          image={hero.src}
          imageAlt={hero.alt}
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
                        href={withHubFrom(item.href, fromHubId)}
                        body={item.body}
                        linkLabel={item.linkLabel}
                      />
                    ))}
                  </ul>
                </div>
              ) : null}

              <nav className="service-module__hubs" aria-label="Other services">
                <Link
                  href={hubLink.href}
                  className="link-arrow service-module__hub-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
                >
                  {hubLink.label}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </nav>
            </div>

            <div className="service-module__media relative">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 900px) 44vw, 100vw"
                className="object-cover"
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
