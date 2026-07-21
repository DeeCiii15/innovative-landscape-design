import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TransformationProjectCard } from "@/app/components/TransformationProjectCard";
import { CtaSection } from "@/app/components/CtaSection";
import { PageHero } from "@/app/components/PageHero";
import { getSiteUrl, WORK_PATH } from "@/lib/siteConstants";
import { getServiceByWorkCategory } from "@/lib/servicesData";
import {
  getWorkCategory,
  getWorkItemsByCategory,
  workCategories,
} from "@/lib/workData";
import { beforeAfterProjects } from "@/lib/projects";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export function generateStaticParams() {
  return workCategories.map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getWorkCategory(categorySlug);
  if (!category) return { title: "Projects" };

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

export default async function WorkCategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getWorkCategory(categorySlug);
  if (!category) notFound();

  const items = getWorkItemsByCategory(category.slug);
  const service = getServiceByWorkCategory(category.slug);
  const legacyProjects = items
    .map((item) => beforeAfterProjects.find((p) => p.id === item.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const serviceDetailsLabel = (() => {
    if (!service) return null;
    switch (service.slug) {
      case "landscape-design":
        return "Get more details here on our landscape design services";
      case "irrigation":
        return "Get more details here on our irrigation services";
      case "hardscapes":
        return "Get more details here on our hardscape services";
      case "outdoor-lighting":
        return "Get more details here on our lighting services";
      default:
        return `Get more details here on our ${service.name.toLowerCase()} services`;
    }
  })();

  return (
    <div>
      <PageHero
        title={category.name}
        description={category.description}
        image={category.image}
        imageAlt={category.imageAlt}
      />

      <section className="py-16 sm:py-24">
        <div className="container-main">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            {service && serviceDetailsLabel && (
              <p className="text-sm text-[var(--color-muted)]">
                <Link href={`/services/${service.slug}`} className="font-semibold text-[var(--color-green)] hover:underline">
                  {serviceDetailsLabel}
                </Link>
              </p>
            )}
            <Link
              href={WORK_PATH}
              className="btn-secondary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2"
            >
              All projects
            </Link>
          </div>

          {legacyProjects.length === 0 ? (
            <p className="text-[var(--color-muted)]">
              Projects coming soon.{" "}
              <Link href="/contact" className="font-semibold text-[var(--color-green)] hover:underline">
                Contact us
              </Link>{" "}
              for a free estimate.
            </p>
          ) : (
            <div className="space-y-12 sm:space-y-16">
              {legacyProjects.map((project, index) => (
                <TransformationProjectCard
                  key={project.id}
                  project={project}
                  featured={index === 0}
                  autoReveal={index === 0}
                  showStory
                  showCta
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
