import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CtaSection } from "@/app/components/CtaSection";
import { PageHero } from "@/app/components/PageHero";
import { ProjectMosaic } from "@/app/components/ProjectMosaic";
import { getProjectBySlug, getProjectCover, getProjects } from "@/lib/loadProjects";
import { getSiteUrl, PRIMARY_STATE, WORK_PATH } from "@/lib/siteConstants";
import { getServiceBySlug } from "@/lib/servicesData";
import {
  getWorkCategory,
  portfolioFilterSlugs,
  workItemPath,
  type WorkItem,
} from "@/lib/workData";

type PortfolioSlugProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const slugs = new Set(portfolioFilterSlugs());
  for (const item of getProjects()) slugs.add(item.slug);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PortfolioSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getProjectBySlug(slug);
  if (item) {
    const cover = getProjectCover(item);
    const canonical = workItemPath(item.slug);
    return {
      title: item.title,
      description: item.description,
      alternates: { canonical },
      openGraph: {
        title: `${item.title} | Innovative Landscape Design`,
        description: item.description,
        url: `${getSiteUrl()}${canonical}`,
        images: cover.src ? [{ url: cover.src, alt: cover.alt }] : undefined,
      },
    };
  }

  const category = getWorkCategory(slug);
  if (!category) return { title: "Portfolio" };

  const canonical = `${WORK_PATH}/${category.slug}`;
  return {
    title: `${category.name} Gallery`,
    description: category.description,
    alternates: { canonical },
    openGraph: {
      title: `${category.name} Gallery | Innovative Landscape Design`,
      description: category.description,
      url: `${getSiteUrl()}${canonical}`,
      images: [{ url: category.image, alt: category.imageAlt }],
    },
  };
}

function galleryPhotos(item: WorkItem) {
  if (!item.cover.file) return item.photos;
  const withoutCover = item.photos.filter((photo) => photo.file !== item.cover.file);
  return withoutCover.length > 0 ? withoutCover : item.photos;
}

function ProjectPage({ item }: { item: WorkItem }) {
  const cover = getProjectCover(item);
  const photos = galleryPhotos(item);
  const services = item.serviceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
  const location = item.city ? `${item.city}, ${PRIMARY_STATE}` : item.placeLabel;
  const coverImage = cover.src;

  return (
    <div>
      <article className="project-page">
        {coverImage ? (
          <PageHero
            title="Explore our"
            accent="portfolio"
            image={coverImage}
            imageAlt={cover.alt}
            titleAs="p"
          />
        ) : null}

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

function CategoryPage({ slug }: { slug: string }) {
  if (!getWorkCategory(slug)) notFound();
  return redirect(WORK_PATH);
}

export default async function PortfolioSlugPage({ params }: PortfolioSlugProps) {
  const { slug } = await params;
  const item = getProjectBySlug(slug);
  if (item) return <ProjectPage item={item} />;
  if (getWorkCategory(slug)) return <CategoryPage slug={slug} />;
  notFound();
}
