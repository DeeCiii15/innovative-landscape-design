import { WORK_PATH } from "./siteConstants";
import { getServiceByLegacyId, getServiceByWorkCategory, type ServiceDef } from "./servicesData";
import { matchLiveLocationForWork } from "./locations";

export type WorkItem = {
  slug: string;
  title: string;
  categorySlug: string;
  serviceName: string;
  description: string;
  story: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  locationLabel: string;
  propertyType: string;
};

export type WorkCategory = {
  slug: string;
  name: string;
  description: string;
  serviceSlug: string;
  image: string;
  imageAlt: string;
};

/** Category registry aligned with Primary Services */
export const workCategories: WorkCategory[] = [
  {
    slug: "landscape-design",
    name: "Landscape Design",
    description: "Before-and-after landscape design projects across the Florence area.",
    serviceSlug: "landscape-design",
    image: "/images/services/design.jpg",
    imageAlt: "Landscape design project in Florence, SC",
  },
  {
    slug: "irrigation",
    name: "Irrigation",
    description: "Smart irrigation upgrades and installs that keep every zone healthy.",
    serviceSlug: "irrigation",
    image: "/images/services/irrigation.jpg",
    imageAlt: "Irrigation system installation in Florence, SC",
  },
  {
    slug: "hardscapes",
    name: "Hardscapes",
    description: "Patios, walks, walls, and outdoor living spaces built for everyday use.",
    serviceSlug: "hardscapes",
    image: "/images/services/hardscapes.jpg",
    imageAlt: "Hardscape patio project in Florence, SC",
  },
  {
    slug: "outdoor-lighting",
    name: "Outdoor Lighting",
    description: "Certified outdoor lighting for safer walkways and stronger curb appeal.",
    serviceSlug: "outdoor-lighting",
    image: "/images/services/lighting.jpg",
    imageAlt: "Outdoor lighting installation in Florence, SC",
  },
];

export const workItems: WorkItem[] = [
  {
    slug: "yard-redesign",
    title: "Full yard transformation",
    categorySlug: "landscape-design",
    serviceName: "Landscape Design",
    description:
      "From an ordinary lawn to a fully designed landscape with plantings, beds, and structure—see what a complete redesign can do for your property.",
    story:
      "The homeowners wanted curb appeal without losing a usable backyard for their kids. We removed tired turf, graded for drainage, and installed layered beds with native plantings, a stone border, and a refreshed walkway. The result reads polished from the street and feels lived-in up close.",
    before: "/images/before-after/design-before.jpg",
    beforeAlt: "Residential yard before landscape redesign",
    after: "/images/before-after/design-after.jpg",
    afterAlt: "Completed landscape design with lush plantings",
    locationLabel: "West Florence",
    propertyType: "Residential",
  },
  {
    slug: "lighting-upgrade",
    title: "Outdoor lighting upgrade",
    categorySlug: "outdoor-lighting",
    serviceName: "Outdoor Lighting",
    description:
      "The same property after professional outdoor lighting—walkways and entrances illuminated for safety and curb appeal.",
    story:
      "This client wanted their landscape to feel as inviting at night as it does during the day. As a certified Cast Lighting installer, we layered path lights, uplighting on key trees, and subtle accent fixtures along the front walk—safe navigation without a harsh floodlight look.",
    before: "/images/before-after/lighting-before.jpg",
    beforeAlt: "Residential landscape before outdoor lighting",
    after: "/images/before-after/lighting-after.jpg",
    afterAlt: "Residential landscape with outdoor lighting at dusk",
    locationLabel: "Downtown Florence",
    propertyType: "Residential",
  },
  {
    slug: "front-yard",
    title: "Front yard makeover",
    categorySlug: "hardscapes",
    serviceName: "Hardscapes",
    description:
      "A front yard brought to life with thoughtful design, hardscape elements, and plantings that complement the home.",
    story:
      "The existing front yard felt flat and disconnected from the house. We added a paver walk, defined planting beds, and low-maintenance shrubs sized to the facade. Hardscape and planting work together so the entry feels intentional from the curb.",
    before: "/images/before-after/hardscapes-before.jpg",
    beforeAlt: "Backyard before hardscape patio",
    after: "/images/before-after/hardscapes-after.jpg",
    afterAlt: "Completed hardscape patio and seating wall",
    locationLabel: "Quinby area",
    propertyType: "Residential",
  },
  {
    slug: "irrigation-system",
    title: "Smart irrigation upgrade",
    categorySlug: "irrigation",
    serviceName: "Irrigation",
    description:
      "Proper irrigation keeps every zone of your landscape healthy—automated watering that adapts to your yard's needs.",
    story:
      "Dry patches and runoff pointed to an outdated sprinkler layout. We installed Orbit B-hyve smart irrigation zoned by sun exposure, with weather-based auto-adjust so the lawn gets water where it needs it—not on the driveway.",
    before: "/images/before-after/irrigation-before.jpg",
    beforeAlt: "Yard with dry patches before irrigation upgrade",
    after: "/images/before-after/irrigation-after.jpg",
    afterAlt: "Lush evenly irrigated landscape",
    locationLabel: "Effingham area",
    propertyType: "Residential",
  },
  {
    slug: "patio-retreat",
    title: "Backyard patio retreat",
    categorySlug: "hardscapes",
    serviceName: "Hardscapes",
    description:
      "A blank side yard turned into an outdoor living space with pavers, seating walls, and low-voltage lighting.",
    story:
      "The clients wanted somewhere to grill and entertain without a full addition. We built a paver patio with a sitting wall, tied it into existing beds, and added lighting so the space works after sunset. It reads like an extension of the home.",
    before: "/images/placeholders/patio-before.jpg",
    beforeAlt: "Placeholder — backyard before patio hardscape",
    after: "/images/placeholders/patio-after.jpg",
    afterAlt: "Placeholder — completed backyard patio and seating wall",
    locationLabel: "Florence",
    propertyType: "Residential",
  },
  {
    slug: "commercial-curb",
    title: "Commercial curb appeal",
    categorySlug: "landscape-design",
    serviceName: "Landscape Design",
    description:
      "A professional entrance landscape that gives tenants and visitors a strong first impression.",
    story:
      "This small office park needed low-maintenance plantings that still looked sharp year-round. We replaced tired shrubs, refreshed mulch beds, and added seasonal color at the sign and entry—designed for visibility from the road and easy upkeep for facility staff.",
    before: "/images/placeholders/commercial-before.jpg",
    beforeAlt: "Placeholder — commercial property before landscape refresh",
    after: "/images/placeholders/commercial-after.jpg",
    afterAlt: "Placeholder — commercial entrance after landscape install",
    locationLabel: "Florence business district",
    propertyType: "Commercial",
  },
];

export function workCategoryPath(categorySlug: string): string {
  return `${WORK_PATH}/${categorySlug}`;
}

export function workItemPath(categorySlug: string, itemSlug: string): string {
  return `${WORK_PATH}/${categorySlug}/${itemSlug}`;
}

export function getWorkCategory(slug: string): WorkCategory | undefined {
  return workCategories.find((c) => c.slug === slug);
}

export function getWorkItemsByCategory(categorySlug: string): WorkItem[] {
  return workItems.filter((item) => item.categorySlug === categorySlug);
}

export function getWorkItem(categorySlug: string, itemSlug: string): WorkItem | undefined {
  return workItems.find((item) => item.categorySlug === categorySlug && item.slug === itemSlug);
}

export function getWorkItemBySlug(itemSlug: string): WorkItem | undefined {
  return workItems.find((item) => item.slug === itemSlug);
}

export function getFeaturedWorkForService(serviceSlug: string): WorkItem | undefined {
  const category = workCategories.find((c) => c.serviceSlug === serviceSlug);
  if (!category) return undefined;
  return getWorkItemsByCategory(category.slug)[0];
}

export function getRelatedServiceForWork(item: WorkItem): ServiceDef | undefined {
  return getServiceByWorkCategory(item.categorySlug);
}

/** Prefer live Location Hub over generic Primary Service when city matches */
export function getWorkRelatedHref(item: WorkItem): { href: string; label: string } {
  const location = matchLiveLocationForWork(item.locationLabel);
  if (location) {
    return { href: `${location.path}?from=${encodeURIComponent(workItemPath(item.categorySlug, item.slug))}`, label: `${location.city} landscape design` };
  }
  const service = getRelatedServiceForWork(item);
  if (service) {
    return { href: `/services/${service.slug}`, label: service.name };
  }
  return { href: WORK_PATH, label: "Projects" };
}

/** Compatibility helpers for older call sites */
export function legacyIdToCategorySlug(legacyId: string): string | undefined {
  return getServiceByLegacyId(legacyId)?.workCategory;
}
