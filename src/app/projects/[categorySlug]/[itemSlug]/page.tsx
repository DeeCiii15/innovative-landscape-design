import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfterReveal } from "@/app/components/BeforeAfterReveal";
import { CtaSection } from "@/app/components/CtaSection";
import { PageHero } from "@/app/components/PageHero";
import { getSiteUrl, WORK_PATH } from "@/lib/siteConstants";
import {
  getWorkCategory,
  getWorkItem,
  getWorkRelatedHref,
  workCategories,
  workCategoryPath,
  workItems,
  workItemPath,
} from "@/lib/workData";

type ItemPageProps = {
  params: Promise<{ categorySlug: string; itemSlug: string }>;
  searchParams: Promise<{ from?: string }>;
};

export function generateStaticParams() {
  return workItems.map((item) => ({
    categorySlug: item.categorySlug,
    itemSlug: item.slug,
  }));
}

export async function generateMetadata({ params }: ItemPageProps): Promise<Metadata> {
  const { categorySlug, itemSlug } = await params;
  const item = getWorkItem(categorySlug, itemSlug);
  if (!item) return { title: "Project" };

  const canonical = workItemPath(item.categorySlug, item.slug);
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical },
    openGraph: {
      title: `${item.title} | Innovative Landscape Design`,
      description: item.description,
      url: `${getSiteUrl()}${canonical}`,
      images: [{ url: item.after, alt: item.afterAlt }],
    },
  };
}

export default async function WorkItemPage({ params, searchParams }: ItemPageProps) {
  const { categorySlug, itemSlug } = await params;
  const { from } = await searchParams;
  const item = getWorkItem(categorySlug, itemSlug);
  if (!item) notFound();

  const category = getWorkCategory(item.categorySlug);
  const related = getWorkRelatedHref(item);
  const backHref =
    from && from.startsWith("/") && !from.startsWith("//") ? from : workCategoryPath(item.categorySlug);

  return (
    <div>
      <PageHero
        title={item.title}
        description={item.description}
        image={item.after}
        imageAlt={item.afterAlt}
      />

      <section className="py-16 sm:py-24">
        <div className="container-main max-w-5xl">
          <div className="mb-8 flex flex-wrap gap-4">
            <Link
              href={backHref}
              className="btn-secondary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2"
            >
              Back
            </Link>
            <Link
              href={related.href}
              className="text-sm font-semibold text-[var(--color-green)] hover:underline self-center"
            >
              {related.label}
            </Link>
          </div>

          <div className="surface-card overflow-hidden">
            <BeforeAfterReveal
              before={item.before}
              after={item.after}
              beforeAlt={item.beforeAlt}
              afterAlt={item.afterAlt}
              aspectClassName="aspect-[16/10] sm:aspect-[2/1]"
              autoReveal
              priority
            />
          </div>

          <div className="mt-10 max-w-3xl">
            <p className="leading-relaxed text-[var(--color-muted)]">{item.description}</p>
            <p className="mt-6 leading-relaxed text-[var(--color-ink-soft)]">{item.story}</p>
            <Link
              href="/contact"
              className="btn-primary mt-8 inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2"
            >
              Start a project like this
            </Link>
          </div>

          <div className="mt-16 border-t border-[var(--color-border-light)] pt-10">
            <h2 className="text-xl font-bold tracking-tight text-[var(--color-ink)]">More project categories</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {workCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={workCategoryPath(cat.slug)}
                    className={`rounded-md px-3 py-2 text-sm font-semibold ${
                      cat.slug === item.categorySlug
                        ? "bg-[var(--color-brand-dark)] text-white"
                        : "bg-[var(--color-surface)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={WORK_PATH} className="rounded-md px-3 py-2 text-sm font-semibold text-[var(--color-green)] hover:underline">
                  All projects
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
