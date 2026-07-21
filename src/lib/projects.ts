/**
 * Compatibility shim — prefer `@/lib/workData` and `@/lib/servicesData` for new code.
 */
import { getServiceByLegacyId, getServiceBySlug, services } from "./servicesData";
import {
  getWorkItemBySlug,
  getWorkItemsByCategory,
  workItems,
  type WorkItem,
} from "./workData";

export type BeforeAfterProject = {
  id: string;
  title: string;
  service: string;
  serviceId: string;
  description: string;
  story: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  location: string;
  propertyType: string;
  scope: string;
  timeline: string;
  budgetTier: string;
};

function toLegacyProject(item: WorkItem): BeforeAfterProject {
  const service = getServiceBySlug(item.categorySlug) ?? getServiceByLegacyId(item.categorySlug);
  return {
    id: item.slug,
    title: item.title,
    service: item.serviceName,
    serviceId: service?.slug ?? item.categorySlug,
    description: item.description,
    story: item.story,
    before: item.before,
    after: item.after,
    beforeAlt: item.beforeAlt,
    afterAlt: item.afterAlt,
    location: item.locationLabel,
    propertyType: item.propertyType,
    scope: "",
    timeline: "",
    budgetTier: "",
  };
}

export const beforeAfterProjects: BeforeAfterProject[] = workItems.map(toLegacyProject);

export function getProjectById(id: string): BeforeAfterProject | undefined {
  const item = getWorkItemBySlug(id);
  return item ? toLegacyProject(item) : undefined;
}

export function getProjectForService(serviceId: string): BeforeAfterProject {
  const service = getServiceBySlug(serviceId) ?? getServiceByLegacyId(serviceId);
  const category = service?.workCategory ?? serviceId;
  const item = getWorkItemsByCategory(category)[0] ?? workItems[0];
  return toLegacyProject(item);
}

export const galleryServiceIds = services.map((s) => s.slug);

export type GalleryServiceId = (typeof galleryServiceIds)[number];

export function isGalleryServiceId(id: string): id is GalleryServiceId {
  return galleryServiceIds.includes(id);
}

export function getProjectsByService(serviceId: string): BeforeAfterProject[] {
  const service = getServiceBySlug(serviceId) ?? getServiceByLegacyId(serviceId);
  const category = service?.workCategory ?? serviceId;
  return getWorkItemsByCategory(category).map(toLegacyProject);
}

export function getGalleryServiceTitle(serviceId: string): string {
  const service = getServiceBySlug(serviceId) ?? getServiceByLegacyId(serviceId);
  return service?.name ?? serviceId;
}

export const transformationFilters = [
  { id: "all", label: "All" },
  ...services.map((s) => ({ id: s.slug, label: s.navLabel })),
] as const;

export type TransformationFilterId = (typeof transformationFilters)[number]["id"];

export function filterProjects(filterId: TransformationFilterId): BeforeAfterProject[] {
  if (filterId === "all") return beforeAfterProjects;
  return getProjectsByService(filterId);
}
