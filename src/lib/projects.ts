/**
 * Compatibility types for older gallery UI.
 * Live portfolio jobs are loaded from `@/lib/loadProjects`.
 */
import { getServiceByLegacyId, getServiceBySlug, services } from "./servicesData";

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

export const beforeAfterProjects: BeforeAfterProject[] = [];

export function getProjectById(id: string): BeforeAfterProject | undefined {
  void id;
  return undefined;
}

export const galleryServiceIds = services.map((s) => s.slug);

export type GalleryServiceId = (typeof galleryServiceIds)[number];

export function isGalleryServiceId(id: string): id is GalleryServiceId {
  return galleryServiceIds.includes(id);
}

export function getProjectsByService(serviceId: string): BeforeAfterProject[] {
  void serviceId;
  return [];
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
  void filterId;
  return [];
}
