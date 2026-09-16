import Image from "next/image";
import Link from "next/link";
import { servicePathWithHub } from "@/lib/audienceHubs";
import { WORK_PATH } from "@/lib/siteConstants";
import { getServiceBySlug, services, type ServiceDef } from "@/lib/servicesData";

type ServiceGroup = {
  heading: string;
  slugs: readonly string[];
  featured?: boolean;
};

type ServiceGalleryGridProps = {
  id?: string;
  heading?: string;
  lead?: string;
  slugs?: readonly string[];
  groups?: readonly ServiceGroup[];
  showHeader?: boolean;
  showViewAll?: boolean;
  className?: string;
  fromHubId?: string;
};

function cardsFromSlugs(slugs: readonly string[]): ServiceDef[] {
  return slugs.map((slug) => getServiceBySlug(slug)).filter((service): service is ServiceDef => Boolean(service));
}

function ServiceTile({ service, fromHubId }: { service: ServiceDef; fromHubId?: string }) {
  return (
    <Link
      href={fromHubId ? servicePathWithHub(service.slug, fromHubId) : `/services/${service.slug}`}
      className="project-tile focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
    >
      <Image
        src={service.galleryImage}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="project-tile__image object-cover"
      />
      <span className="project-tile__name">{service.name}</span>
    </Link>
  );
}

export function ServiceGalleryGrid({
  id = "services",
  heading = "Browse work by service",
  lead,
  slugs,
  groups,
  showHeader = true,
  showViewAll = true,
  className = "",
  fromHubId,
}: ServiceGalleryGridProps) {
  const seen = new Set<string>();
  const cards: ServiceDef[] = [];
  const orderedSlugs = groups?.length
    ? groups.flatMap((group) => group.slugs)
    : (slugs ?? services.map((service) => service.slug));

  for (const service of cardsFromSlugs(orderedSlugs)) {
    if (seen.has(service.slug)) continue;
    seen.add(service.slug);
    cards.push(service);
  }

  return (
    <section id={id || undefined} className={`hub-services scroll-mt-24 ${className}`.trim()}>
      <div className="container-main">
        {showHeader ? (
          <div className="hub-services__head">
            <div>
              <h2 className="heading-section">{heading}</h2>
              {lead ? <p className="lead mt-4 max-w-2xl">{lead}</p> : null}
            </div>
            {showViewAll ? (
              <Link
                href={WORK_PATH}
                className="link-arrow hidden shrink-0 sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
              >
                View the portfolio
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ) : null}
          </div>
        ) : null}

        <ul className="portfolio-index__grid">
          {cards.map((service) => (
            <li key={service.slug}>
              <ServiceTile service={service} fromHubId={fromHubId} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
