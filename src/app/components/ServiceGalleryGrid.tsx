import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { workCategories, workCategoryPath } from "@/lib/workData";
import { WORK_PATH } from "@/lib/siteConstants";

type ServiceGalleryGridProps = {
  id?: string;
  showHeader?: boolean;
  showViewAll?: boolean;
  /** Short line shown above the gallery cards */
  intro?: string;
  /** When false, cards render immediately (no scroll-triggered fade-in). */
  reveal?: boolean;
  className?: string;
};

function MaybeReveal({
  enabled,
  delay,
  children,
  className,
}: {
  enabled: boolean;
  delay?: number;
  children: ReactNode;
  className?: string;
}) {
  if (!enabled) {
    return <div className={className}>{children}</div>;
  }
  return (
    <Reveal delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

export function ServiceGalleryGrid({
  id = "projects",
  showHeader = true,
  showViewAll = true,
  intro,
  reveal = true,
  className = "",
}: ServiceGalleryGridProps) {
  return (
    <section id={id || undefined} className={`work section scroll-mt-24 ${className}`.trim()}>
      <div className="container-main">
        {showHeader && (
          <div className="work__head">
            <MaybeReveal enabled={reveal} className="section-head">
              <h2 className="heading-section section-head__title">Browse work by service</h2>
              <p className="lead">
                Select a category to view before-and-after projects for landscape design, irrigation, hardscapes, or
                lighting.
              </p>
            </MaybeReveal>
            {showViewAll && (
              <MaybeReveal enabled={reveal} delay={100}>
                <Link
                  href={WORK_PATH}
                  className="link-arrow hidden shrink-0 sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
                >
                  All projects
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </MaybeReveal>
            )}
          </div>
        )}

        {intro && <p className={`lead max-w-2xl ${showHeader ? "mt-2 mb-10" : "mb-10"}`}>{intro}</p>}

        <div className="work__grid">
          {workCategories.map((category, index) => (
            <MaybeReveal key={category.slug} enabled={reveal} delay={(index % 2) * 90}>
              <Link href={workCategoryPath(category.slug)} className="work-card">
                <div className="work-card__media">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(min-width: 700px) 44vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="work-card__body">
                  <div>
                    <h3 className="work-card__title">{category.name}</h3>
                    <p className="work-card__tagline">{category.description}</p>
                  </div>
                  <span className="work-card__arrow" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7v8" />
                    </svg>
                  </span>
                </div>
              </Link>
            </MaybeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
