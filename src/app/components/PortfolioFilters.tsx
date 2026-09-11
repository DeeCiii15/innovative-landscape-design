"use client";

import { useState } from "react";
import Link from "next/link";
import {
  constructionServices,
  getServiceBySlug,
  maintenanceServices,
  type ServiceFamily,
} from "@/lib/servicesData";
import { workCategories, workCategoryPath } from "@/lib/workData";

function chipClass(active: boolean) {
  return active
    ? "rounded-md bg-[var(--color-brand-dark)] px-3 py-2 text-sm font-semibold text-white"
    : "rounded-md bg-[var(--color-surface)] px-3 py-2 text-sm font-semibold text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2";
}

function activeServiceSlug(currentSlug?: string | null) {
  if (!currentSlug) return null;
  const mapped = workCategories.find((category) => category.slug === currentSlug);
  return mapped?.serviceSlug ?? currentSlug;
}

function familyFromSlug(currentSlug?: string | null): ServiceFamily {
  const slug = activeServiceSlug(currentSlug);
  return getServiceBySlug(slug ?? "")?.family === "maintenance" ? "maintenance" : "construction";
}

export function PortfolioFilters({ currentSlug }: { currentSlug?: string | null }) {
  const active = activeServiceSlug(currentSlug);
  const [family, setFamily] = useState<ServiceFamily>(() => familyFromSlug(currentSlug));
  const services = family === "maintenance" ? maintenanceServices : constructionServices;

  return (
    <div className="flex flex-col gap-5">
      <div className="portfolio-flip" role="tablist" aria-label="Portfolio service type">
        <span
          className={`portfolio-flip__thumb${family === "maintenance" ? " portfolio-flip__thumb--right" : ""}`}
          aria-hidden
        />
        <button
          type="button"
          role="tab"
          aria-selected={family === "construction"}
          className={`portfolio-flip__btn${family === "construction" ? " is-active" : ""}`}
          onClick={() => setFamily("construction")}
        >
          Landscape services
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={family === "maintenance"}
          className={`portfolio-flip__btn${family === "maintenance" ? " is-active" : ""}`}
          onClick={() => setFamily("maintenance")}
        >
          Maintenance
        </button>
      </div>

      <div role="tabpanel" aria-label={family === "maintenance" ? "Maintenance services" : "Landscape services"}>
        <div className="flex flex-wrap gap-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={workCategoryPath(service.slug)}
              className={chipClass(active === service.slug)}
              aria-current={active === service.slug ? "page" : undefined}
            >
              {service.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
