import { WORK_PATH } from "./siteConstants";
import {
  getServiceByLegacyId,
  getServiceBySlug,
  services,
  type ServiceDef,
} from "./servicesData";
import { siteImages } from "./siteImages";
import { matchLiveLocationForWork } from "./locations";
import type { ProjectPhoto, PropertyType } from "@/projects/types";

export type WorkItem = {
  slug: string;
  folder: string;
  title: string;
  name: string;
  description: string;
  story: string;
  propertyType: PropertyType;
  placeLabel: string;
  city: string;
  neighborhood?: string;
  businessName?: string;
  serviceSlugs: readonly string[];
  featuredServiceSlug: string;
  photos: ProjectPhoto[];
  cover: ProjectPhoto;
  /** Display label for cards (neighborhood or business name). */
  locationLabel: string;
  /** Featured service slug — used by older category URLs. */
  categorySlug: string;
  type: string;
  serviceName: string;
};

export type WorkCategory = {
  slug: string;
  name: string;
  description: string;
  serviceSlug: string;
  image: string;
  imageAlt: string;
};

function categoryFromService(service: ServiceDef): WorkCategory {
  return {
    slug: service.slug,
    name: service.name,
    description: service.intro,
    serviceSlug: service.slug,
    image: service.galleryImage,
    imageAlt: service.galleryImageAlt,
  };
}

/** One portfolio filter per service page. */
export const portfolioCategories: WorkCategory[] = services.map(categoryFromService);

/** Legacy project-bucket URLs still used by redirects and older links. */
export const workCategories: WorkCategory[] = [
  {
    slug: "landscape-design",
    name: "Landscaping",
    description: "Planting, sod, beds, and full-yard landscape projects across the Florence area.",
    serviceSlug: "landscape-enhancements",
    image: siteImages.services.landscapeCover,
    imageAlt: "Landscaped front yard with a striped lawn, planting beds, and a brick home",
  },
  {
    slug: "irrigation",
    name: "Irrigation",
    description: "Irrigation and water management upgrades and installs that keep every zone healthy.",
    serviceSlug: "irrigation",
    image: siteImages.heroAerial,
    imageAlt: "Irrigation system installation in Florence, SC",
  },
  {
    slug: "hardscapes",
    name: "Hardscapes",
    description: "Patios, walks, walls, and outdoor living spaces built for everyday use.",
    serviceSlug: "hardscapes",
    image: siteImages.services.hardscapesCover,
    imageAlt: "Stepping-stone garden path with hostas and white flowers",
  },
  {
    slug: "outdoor-lighting",
    name: "Landscape Lighting",
    description: "Certified landscape lighting for safer walkways and stronger curb appeal.",
    serviceSlug: "outdoor-lighting",
    image: siteImages.services.lightingCover,
    imageAlt: "Home at dusk with uplit trees, a lit porch, and a brick walkway",
  },
  {
    slug: "water-features",
    name: "Water Features",
    description: "Waterfalls, ponds, and streams built into the landscape.",
    serviceSlug: "water-features",
    image: siteImages.services.waterFeaturesCover,
    imageAlt: "Multi-tiered backyard waterfall and stream with natural stone and plantings",
  },
];

export function workCategoryPath(categorySlug: string): string {
  return `${WORK_PATH}/${categorySlug}`;
}

export function workItemPath(itemSlug: string): string {
  return `${WORK_PATH}/${itemSlug}`;
}

export function getWorkCategory(slug: string): WorkCategory | undefined {
  return portfolioCategories.find((category) => category.slug === slug) ?? workCategories.find((category) => category.slug === slug);
}

export function portfolioFilterSlugs(): string[] {
  const slugs = new Set<string>();
  for (const category of portfolioCategories) slugs.add(category.slug);
  for (const category of workCategories) slugs.add(category.slug);
  return [...slugs];
}

/** Prefer live Location Hub over generic Primary Service when city matches */
export function getWorkRelatedHref(item: WorkItem): { href: string; label: string } {
  const location = matchLiveLocationForWork(`${item.placeLabel} ${item.city}`);
  if (location) {
    return {
      href: `${location.path}?from=${encodeURIComponent(workItemPath(item.slug))}`,
      label: `${location.city} landscape design`,
    };
  }
  const service = getServiceBySlug(item.featuredServiceSlug);
  if (service) {
    return { href: `/services/${service.slug}`, label: service.name };
  }
  return { href: WORK_PATH, label: "Portfolio" };
}

/** Compatibility helpers for older call sites */
export function legacyIdToCategorySlug(legacyId: string): string | undefined {
  return getServiceByLegacyId(legacyId)?.workCategory;
}
