import Link from "next/link";
import { ProjectGallery } from "./ProjectGallery";
import { workItemPath, type WorkItem } from "@/lib/workData";
import type { ProjectPhoto } from "@/projects/types";

type ProjectCardProps = {
  item: WorkItem;
  images: ProjectPhoto[];
  featured?: boolean;
  showStory?: boolean;
  showCta?: boolean;
  /** Full-width gallery with a laptop-friendly height and copy underneath. */
  compact?: boolean;
};

export function ProjectCard({
  item,
  images,
  featured = false,
  showStory = false,
  showCta = false,
  compact = false,
}: ProjectCardProps) {
  const href = workItemPath(item.slug);

  return (
    <article className={`surface-card project-card${compact ? " project-card--compact" : ""}`}>
      <div className="project-card__media">
        <ProjectGallery
          images={images}
          name={item.name}
          priority={featured}
          fillParent={compact}
          objectFit={compact ? "contain" : "cover"}
          marquee={compact}
          aspectClassName={compact ? "aspect-[16/9]" : featured ? "aspect-[16/10] sm:aspect-[2/1]" : "aspect-[4/3]"}
          className="rounded-none"
          sizes={compact ? "(min-width: 1024px) 78rem, 100vw" : undefined}
        />
      </div>
      <div className={`project-card__copy ${compact ? "px-5 py-4 sm:px-6 sm:py-5" : featured ? "px-6 py-6 sm:px-8" : "px-5 py-5 sm:px-6"}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-dark)]">
          {item.placeLabel}
        </p>
        <h3
          className={`mt-2 font-medium tracking-tight text-[var(--color-ink)] ${compact ? "text-lg" : featured ? "text-xl sm:text-2xl" : "text-lg"}`}
        >
          <Link
            href={href}
            className="hover:text-[var(--color-green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2"
          >
            {item.name}
          </Link>
        </h3>
        <p className={`mt-2 leading-relaxed text-[var(--color-muted)] ${compact ? "text-sm line-clamp-4" : featured ? "text-base" : "text-sm"}`}>
          {item.description}
        </p>
        {showStory && !compact ? (
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">{item.story}</p>
        ) : null}
        {showCta && (
          <Link
            href="/contact"
            className={`btn-primary inline-flex text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2 ${compact ? "mt-4" : "mt-6"}`}
          >
            Start a project like this
          </Link>
        )}
      </div>
    </article>
  );
}
