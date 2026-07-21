"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TransformationFilters } from "./TransformationFilters";
import { TransformationProjectCard } from "./TransformationProjectCard";
import {
  beforeAfterProjects,
  filterProjects,
  type BeforeAfterProject,
  type TransformationFilterId,
} from "@/lib/projects";
import { siteConfig } from "@/lib/siteConfig";

type BeforeAfterGalleryProps = {
  projects?: BeforeAfterProject[];
  featuredId?: string;
  showHeader?: boolean;
  showFilters?: boolean;
  showViewAll?: boolean;
  className?: string;
  id?: string;
};

function buildFilterCounts(projects: BeforeAfterProject[]) {
  const counts: Partial<Record<TransformationFilterId, number>> = { all: projects.length };
  for (const project of projects) {
    counts[project.serviceId as TransformationFilterId] =
      (counts[project.serviceId as TransformationFilterId] ?? 0) + 1;
  }
  return counts;
}

export function BeforeAfterGallery({
  projects = beforeAfterProjects,
  featuredId = siteConfig.featuredBeforeAfterId,
  showHeader = true,
  showFilters = true,
  showViewAll = false,
  className = "",
  id,
}: BeforeAfterGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<TransformationFilterId>("all");

  const filtered = useMemo(
    () => (showFilters ? filterProjects(activeFilter) : projects),
    [activeFilter, projects, showFilters],
  );

  const featured = useMemo(() => {
    const preferred = filtered.find((p) => p.id === featuredId);
    return preferred ?? filtered[0];
  }, [filtered, featuredId]);

  const rest = filtered.filter((p) => p.id !== featured?.id);
  const counts = useMemo(() => buildFilterCounts(projects), [projects]);

  return (
    <section id={id} className={className}>
      <div className="container-main">
        {showHeader && (
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="label-tag">Before & after</span>
              <h2 className="heading-section mt-3">See the transformation</h2>
              <p className="mt-4 text-[var(--color-muted)]">
                Drag the slider to compare results — each project matches landscape design, irrigation, hardscapes, or lighting.
              </p>
            </div>
            {showViewAll && (
              <Link
                href="/projects"
                className="btn-secondary shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2"
              >
                View all projects
              </Link>
            )}
          </div>
        )}

        {showFilters && (
          <TransformationFilters
            active={activeFilter}
            onChange={setActiveFilter}
            counts={counts}
            className={showHeader ? "mt-8" : ""}
          />
        )}

        {filtered.length === 0 ? (
          <p className="mt-10 text-[var(--color-muted)]">
            No projects in this category yet.{" "}
            <Link href="/contact" className="font-semibold text-[var(--color-green)] hover:underline">
              Request an estimate
            </Link>
            .
          </p>
        ) : (
          <div className="mt-10 space-y-6">
            {featured && <TransformationProjectCard project={featured} featured autoReveal />}
            {rest.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {rest.map((project) => (
                  <TransformationProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
