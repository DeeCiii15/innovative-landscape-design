import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/app/components/CtaSection";
import { PageHero } from "@/app/components/PageHero";
import { ProjectMosaic } from "@/app/components/ProjectMosaic";
import { getProjectBySlug, getProjectCover, getProjectPageHero, getProjects } from "@/lib/loadProjects";
import { socialTags } from "@/lib/seo";
import { PRIMARY_STATE_ABBR } from "@/lib/siteConstants";
import { getServiceBySlug } from "@/lib/servicesData";
import { workItemPath, type WorkItem } from "@/lib/workData";

type PortfolioSlugProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjects().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PortfolioSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getProjectBySlug(slug);
  if (!item) return { title: "Portfolio" };

  const cover = getProjectCover(item);
  const canonical = workItemPath(item.slug);
  const title = `${item.title} | Innovative Landscape Design`;
  return {
    title: item.title,
    description: item.metaDescription,
    alternates: { canonical },
    ...socialTags({
      title,
      description: item.metaDescription,
      path: canonical,
      image: cover.src ? { url: cover.src, alt: cover.alt } : undefined,
    }),
  };
}

function ProjectPage({ item }: { item: WorkItem }) {
  const hero = getProjectPageHero(item);
  const photos = item.photos;
  const services = item.serviceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
  const location = item.city ? `${item.city}, ${PRIMARY_STATE_ABBR}` : item.placeLabel;

  return (
    <div>
      <article className="project-page">
        <PageHero
          title="Explore our"
          accent="portfolio"
          image={hero.src}
          imageAlt={hero.alt}
          titleAs="p"
        />

        <div className="project-page__stack">
        <div className="container-main">
          <header className="project-page__intro">
            <div className="project-page__copy">
              <h1 className="project-page__title">{item.name}</h1>
              <p className="lead project-page__blurb">{item.description}</p>
            </div>
            <dl className="project-page__meta">
              {location ? (
                <div className="project-page__meta-block">
                  <dt>Location</dt>
                  <dd>{location}</dd>
                </div>
              ) : null}
              {services.length > 0 ? (
                <div className="project-page__meta-block">
                  <dt>Services</dt>
                  <dd>
                    {services.map((service, index) => (
                      <span key={service.slug}>
                        {index > 0 ? ", " : ""}
                        <Link href={`/services/${service.slug}`}>{service.name}</Link>
                      </span>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          </header>

          {photos.length > 0 ? (
            <ProjectMosaic photos={photos} />
          ) : (
            <p className="text-[var(--color-muted)]">Photos coming soon.</p>
          )}
        </div>
        </div>
      </article>

      <CtaSection />
    </div>
  );
}

export default async function PortfolioSlugPage({ params }: PortfolioSlugProps) {
  const { slug } = await params;
  const item = getProjectBySlug(slug);
  if (!item) notFound();
  return <ProjectPage item={item} />;
}
