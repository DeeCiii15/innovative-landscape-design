"use client";

import { transformationFilters, type TransformationFilterId } from "@/lib/projects";

type TransformationFiltersProps = {
  active: TransformationFilterId;
  onChange: (id: TransformationFilterId) => void;
  counts?: Partial<Record<TransformationFilterId, number>>;
  className?: string;
};

export function TransformationFilters({ active, onChange, counts, className = "" }: TransformationFiltersProps) {
  return (
    <div className={`project-filters ${className}`}>
      <p className="project-filters__label" id="project-filters-label">
        Browse by category
      </p>
      <div
        className="project-filters__tabs"
        role="tablist"
        aria-labelledby="project-filters-label"
      >
        {transformationFilters.map((filter) => {
          const isActive = active === filter.id;
          const count = counts?.[filter.id];
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(filter.id)}
              className={`project-filters__tab focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 ${
                isActive ? "project-filters__tab--active" : ""
              }`}
            >
              <span className="project-filters__tab-label">{filter.label}</span>
              {count !== undefined && (
                <span className="project-filters__tab-count">{count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
