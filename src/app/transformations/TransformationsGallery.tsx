"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TransformationFilters } from "../components/TransformationFilters";
import { TransformationProjectCard } from "../components/TransformationProjectCard";
import { CtaSection } from "../components/CtaSection";
import { filterProjects, beforeAfterProjects, type TransformationFilterId } from "@/lib/projects";

function buildFilterCounts() {
  const counts: Partial<Record<TransformationFilterId, number>> = { all: beforeAfterProjects.length };
  for (const project of beforeAfterProjects) {
    counts[project.serviceId as TransformationFilterId] =
      (counts[project.serviceId as TransformationFilterId] ?? 0) + 1;
  }
  return counts;
}

export function TransformationsGallery() {
  const [activeFilter, setActiveFilter] = useState<TransformationFilterId>("all");
  const filtered = useMemo(() => filterProjects(activeFilter), [activeFilter]);
  const counts = useMemo(() => buildFilterCounts(), []);

  return (
    <>
      <section className="border-b border-[var(--color-border-light)] bg-[var(--color-surface)] py-10 sm:py-12">
        <div className="container-main">
          <TransformationFilters active={activeFilter} onChange={setActiveFilter} counts={counts} />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-main space-y-12 sm:space-y-16">
          {filtered.length === 0 ? (
            <p className="text-[var(--color-muted)]">
              No projects yet.{" "}
              <Link href="/contact" className="font-semibold text-[var(--color-green)] hover:underline">Contact us</Link>.
            </p>
          ) : (
            filtered.map((project, index) => (
              <TransformationProjectCard
                key={project.id}
                project={project}
                featured={index === 0}
                autoReveal={index === 0}
                showStory
                showCta
              />
            ))
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
