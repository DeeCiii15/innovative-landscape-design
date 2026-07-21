import Link from "next/link";
import { BeforeAfterReveal } from "./BeforeAfterReveal";
import type { BeforeAfterProject } from "@/lib/projects";

type TransformationProjectCardProps = {
  project: BeforeAfterProject;
  featured?: boolean;
  autoReveal?: boolean;
  showStory?: boolean;
  showCta?: boolean;
};

export function TransformationProjectCard({
  project,
  featured = false,
  autoReveal = false,
  showStory = false,
  showCta = false,
}: TransformationProjectCardProps) {
  return (
    <article className="surface-card">
      <BeforeAfterReveal
        before={project.before}
        after={project.after}
        beforeAlt={project.beforeAlt}
        afterAlt={project.afterAlt}
        priority={featured}
        autoReveal={autoReveal}
        aspectClassName={featured ? "aspect-[16/10] sm:aspect-[2/1]" : "aspect-[4/3]"}
        className="rounded-b-none"
      />
      <div className={`${featured ? "px-6 py-6 sm:px-8" : "px-5 py-5 sm:px-6"}`}>
        <h3
          className={`font-bold tracking-tight text-[var(--color-ink)] ${featured ? "text-xl sm:text-2xl" : "text-lg"}`}
        >
          {project.title}
        </h3>
        <p className={`mt-3 leading-relaxed text-[var(--color-muted)] ${featured ? "text-base" : "text-sm"}`}>
          {project.description}
        </p>
        {showStory && (
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">{project.story}</p>
        )}
        {showCta && (
          <Link
            href="/contact"
            className="btn-secondary mt-6 inline-flex text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2"
          >
            Start a project like this
          </Link>
        )}
      </div>
    </article>
  );
}
