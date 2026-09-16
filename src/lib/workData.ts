import { WORK_PATH } from "./siteConstants";
import { getServiceBySlug } from "./servicesData";
import type { ProjectPhoto, PropertyType } from "@/projects/types";

export type WorkItem = {
  slug: string;
  folder: string;
  title: string;
  name: string;
  description: string;
  /** Search snippet. Falls back to `description` when a project has no shorter meta. */
  metaDescription: string;
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
  type: string;
  serviceName: string;
};

export function workItemPath(itemSlug: string): string {
  return `${WORK_PATH}/${itemSlug}`;
}

/** Related link for a project — the tagged service page. */
export function getWorkRelatedHref(item: WorkItem): { href: string; label: string } {
  const service = getServiceBySlug(item.featuredServiceSlug);
  if (service) {
    return { href: `/services/${service.slug}`, label: service.name };
  }
  return { href: WORK_PATH, label: "Portfolio" };
}
