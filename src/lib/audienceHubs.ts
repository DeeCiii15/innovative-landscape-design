import { getServiceBySlug, type ServiceDef, type ServiceFamily } from "./servicesData";
import { siteImages } from "./siteImages";

export type Audience = "residential" | "commercial";
export type HubFamily = "construction" | "maintenance";

/** A labelled cluster of service cards on a hub page. `featured` renders a single wide card. */
export type HubServiceGroup = {
  heading: string;
  slugs: readonly string[];
  featured?: boolean;
};

export type AudienceHub = {
  id: string;
  audience: Audience;
  family: HubFamily;
  path: string;
  navLabel: string;
  name: string;
  navBlurb: string;
  eyebrow: string;
  headline: string;
  /** Italic serif word(s) in the hero, same role as “Florence” on the home hero. */
  headlineAccent: string;
  intro: string;
  aboutHeading: string;
  body: string;
  benefits: readonly string[];
  galleryHeading: string;
  galleryLead: string;
  metaTitle: string;
  metaDescription: string;
  galleryImage: string;
  galleryImageAlt: string;
  /** Photo shown beside the about intro (not the hero). */
  aboutImage: string;
  aboutImageAlt: string;
  serviceSlugs: readonly string[];
  /** Grouped card layout for the hub services section. Omit to list `serviceSlugs` in one grid. */
  serviceGroups?: readonly HubServiceGroup[];
  workHeading: string;
  workLead: string;
  /** Short label for this hub in the project-vs-care switch. */
  switchLabel: string;
  /**
   * Hub-specific proof facts. The page prepends the years-in-business and
   * service-area facts from site data. Only claims already made elsewhere on the site.
   */
  proofFacts: readonly string[];
  siblingPath: string;
  siblingLabel: string;
  otherAudiencePath: string;
  otherAudienceLabel: string;
  /** Locked featured job on this hub. Resolved by slug, even if it is not tagged to the hub's services. */
  featuredWorkSlug: string;
};

export const CONSTRUCTION_SERVICE_SLUGS = [
  "outdoor-kitchens",
  "hardscapes",
  "outdoor-lighting",
  "water-features",
  "irrigation",
  "turf-renovation-installation",
  "drainage-grading",
  "landscape-enhancements",
] as const;

export const MAINTENANCE_SERVICE_SLUGS = [
  "total-landscape-maintenance",
  "lawn-maintenance",
  "seasonal-cleanup",
  "seasonal-color",
  "garden-maintenance",
  "turf-care",
  "mulch-and-pine-straw",
  "pruning-and-cleanup",
] as const;

/** Plant and turf · Build · Systems */
export const CONSTRUCTION_SERVICE_GROUPS: readonly HubServiceGroup[] = [
  { heading: "Plant and turf", slugs: ["landscape-enhancements", "turf-renovation-installation"] },
  { heading: "Build", slugs: ["outdoor-kitchens", "hardscapes", "water-features"] },
  { heading: "Systems", slugs: ["outdoor-lighting", "irrigation", "drainage-grading"] },
];

/** The full program leads as a wide card; single services follow. */
export const MAINTENANCE_SERVICE_GROUPS: readonly HubServiceGroup[] = [
  { heading: "The program", slugs: ["total-landscape-maintenance"], featured: true },
  { heading: "Lawn", slugs: ["lawn-maintenance", "turf-care"] },
  { heading: "Beds and plants", slugs: ["garden-maintenance", "mulch-and-pine-straw", "pruning-and-cleanup"] },
  { heading: "Seasonal", slugs: ["seasonal-cleanup", "seasonal-color"] },
];

export const RESIDENTIAL_LANDSCAPE_PATH = "/residential/landscape-services";
export const RESIDENTIAL_LAWN_CARE_PATH = "/residential/lawn-care-services";
export const COMMERCIAL_LANDSCAPE_PATH = "/commercial/landscape-services";
export const COMMERCIAL_PROPERTY_MAINTENANCE_PATH = "/commercial/property-maintenance-services";

export const audienceHubs: readonly AudienceHub[] = [
  {
    id: "residential-construction",
    audience: "residential",
    family: "construction",
    path: RESIDENTIAL_LANDSCAPE_PATH,
    navLabel: "Landscape Services",
    name: "Landscape Services",
    navBlurb:
      "Design and install the outdoor space—planting, hardscapes, lighting, water features, irrigation, kitchens, and drainage—as one job.",
    eyebrow: "For homeowners",
    headline: "Build the landscape of your",
    headlineAccent: "dreams",
    intro:
      "We design and build landscapes for homes in Florence, SC—turning the space around the house into a finished outdoor place to live, not a collection of leftover projects.",
    aboutHeading: "Residential landscape services",
    body: "This is the project work for a home yard. We start with how you want to live outside: a patio you actually sit on, a front yard that looks finished from the street, lighting you can walk at night, and planting that fits the beds you have. If the space around the house does not match how you use it—no real gathering space, tired turf, water that sits after rain—residential landscape services are the install that changes it. The patio, the planting, the lighting, and the rest of the yard can be one job for the property instead of a string of disconnected add-ons.",
    benefits: [
      "One plan and one install for the outdoor space, not a pile of separate trades",
      "A yard built for how you actually live—not only for how it looks from the street",
      "Work that can move into lawn care after it is finished, so the install stays in shape",
    ],
    galleryHeading: "Services we offer",
    galleryLead: "What we can plan and install around the house.",
    metaTitle: "Landscape Services for Homes in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Residential landscape services in Florence, SC: hardscapes, lighting, water features, irrigation, planting, outdoor kitchens, and drainage for homes.",
    galleryImage: siteImages.services.landscapeCover,
    galleryImageAlt: "Finished front yard with planting beds and a striped lawn",
    aboutImage: siteImages.aboutBackyard,
    aboutImageAlt: "A striped backyard lawn leading to a white sunroom, framed by trees and planting beds",
    serviceSlugs: CONSTRUCTION_SERVICE_SLUGS,
    serviceGroups: CONSTRUCTION_SERVICE_GROUPS,
    workHeading: "Featured landscape work in Florence",
    workLead: "Here are some residential landscape service projects we've done.",
    switchLabel: "Landscape Services",
    proofFacts: ["Certified ClifRock and CAST lighting installer", "Planting, hardscapes, lighting, water, and drainage as one job"],
    siblingPath: RESIDENTIAL_LAWN_CARE_PATH,
    siblingLabel: "Lawn Care Services",
    otherAudiencePath: COMMERCIAL_LANDSCAPE_PATH,
    otherAudienceLabel: "Commercial Landscape Services",
    featuredWorkSlug: "florence-sc-residential-landscape-byrnes-boulevard",
  },
  {
    id: "residential-maintenance",
    audience: "residential",
    family: "maintenance",
    path: RESIDENTIAL_LAWN_CARE_PATH,
    navLabel: "Lawn Care Services",
    name: "Lawn Care Services",
    navBlurb: "Ongoing care for the yard you have: mowing, beds, seasonal cleanup, and color.",
    eyebrow: "For homeowners",
    headline: "Keep the yard looking",
    headlineAccent: "right",
    intro:
      "We care for home yards in Florence, SC. Once the landscape is in—or if you already have a yard you like—we keep it looking right week to week, on a plan built around the house.",
    aboutHeading: "Residential lawn care services",
    body: "This is ongoing care for a home yard. It is not a redesign, and it is not commercial groundskeeping for a storefront, office, or HOA common area. After the landscape is in—or for a yard you already have—the lawn still needs mowing, beds still need tending, and seasons still change the property around the house. You can start with mowing only, or put lawn, gardens, cleanup, and color on one residential plan so the whole yard stays even week to week.",
    benefits: [
      "A yard that looks tended week to week without you running the crew",
      "Start with lawn only, or add beds, cleanup, and color when you are ready",
      "The same team can take over a landscape we installed or one we did not",
    ],
    galleryHeading: "Services we offer",
    galleryLead: "The care that keeps a home landscape looking right after it is in.",
    metaTitle: "Lawn Care Services for Homes in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Residential landscape maintenance in Florence, SC: lawn care, garden maintenance, seasonal cleanup, and seasonal color for homes.",
    galleryImage: siteImages.ctaAerial,
    galleryImageAlt: "Aerial view of a maintained lawn and planting beds",
    aboutImage: siteImages.aboutGardenBed,
    aboutImageAlt: "Seasonal color in a planting bed along a maintained walk",
    serviceSlugs: MAINTENANCE_SERVICE_SLUGS,
    serviceGroups: MAINTENANCE_SERVICE_GROUPS,
    workHeading: "Featured lawn care in Florence",
    workLead: "See some homes that we care for on a weekly basis.",
    switchLabel: "Lawn Care Services",
    proofFacts: ["One crew for lawn, beds, cleanup, and color", "Start with mowing only and add the rest when ready"],
    siblingPath: RESIDENTIAL_LANDSCAPE_PATH,
    siblingLabel: "Landscape Services",
    otherAudiencePath: COMMERCIAL_PROPERTY_MAINTENANCE_PATH,
    otherAudienceLabel: "Property Maintenance Services",
    featuredWorkSlug: "florence-sc-residential-landscape-maintenance-coit-street",
  },
  {
    id: "commercial-construction",
    audience: "commercial",
    family: "construction",
    path: COMMERCIAL_LANDSCAPE_PATH,
    navLabel: "Landscape Services",
    name: "Commercial Landscape Services",
    navBlurb:
      "Project work for offices, retail, HOAs, and other properties—hardscapes, lighting, irrigation, planting, and drainage.",
    eyebrow: "For businesses and HOAs",
    headline: "Commercial landscaping that",
    headlineAccent: "lasts",
    intro:
      "We design and install landscapes for businesses and HOAs in Florence, SC—so the property looks finished from the street and is built to last.",
    aboutHeading: "Commercial landscape services",
    body: "Commercial landscape services are the project work for a property people see every day—entries, parking, common areas, and the planting and lighting around them. The trades are the same ones we use on homes. The job is different: access, occupied sites, insurance, and a landscape that has to look right from the street on a schedule the business or HOA can live with.",
    benefits: [
      "Curb appeal that lasts through traffic, weather, and a public-facing site",
      "Work scoped around access, hours, and how the property operates",
      "The same landscape services as a home job, sized to a commercial or HOA site",
    ],
    galleryHeading: "Services we offer",
    galleryLead: "What we can plan and install for a business or HOA site.",
    metaTitle: "Commercial Landscape Services in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Commercial landscape services in Florence, SC for businesses, HOAs, and property managers—hardscapes, lighting, irrigation, planting, and drainage.",
    galleryImage: siteImages.gardenEstate,
    galleryImageAlt: "Estate garden with seasonal color, palms, and a brick walk",
    aboutImage: siteImages.services.hardscapesCover,
    aboutImageAlt: "A brick courtyard with planters, palms, and planting beds beside the house",
    serviceSlugs: CONSTRUCTION_SERVICE_SLUGS,
    serviceGroups: CONSTRUCTION_SERVICE_GROUPS,
    workHeading: "Featured commercial landscape work in Florence",
    workLead: "Here are some commercial landscape projects we've done.",
    switchLabel: "Landscape Services",
    proofFacts: ["Scoped around access, hours, and occupied sites"],
    siblingPath: COMMERCIAL_PROPERTY_MAINTENANCE_PATH,
    siblingLabel: "Property Maintenance Services",
    otherAudiencePath: RESIDENTIAL_LANDSCAPE_PATH,
    otherAudienceLabel: "Landscape Services",
    featuredWorkSlug: "florence-sc-commercial-landscape-the-manor",
  },
  {
    id: "commercial-maintenance",
    audience: "commercial",
    family: "maintenance",
    path: COMMERCIAL_PROPERTY_MAINTENANCE_PATH,
    navLabel: "Property Maintenance Services",
    name: "Property Maintenance Services",
    navBlurb:
      "Recurring care so the property looks sharp for customers, tenants, and the board.",
    eyebrow: "For businesses and HOAs",
    headline: "Keep the property looking",
    headlineAccent: "sharp",
    intro:
      "We care for landscapes at businesses and HOAs in Florence, SC—keeping the grounds looking sharp on a schedule the site can actually live with.",
    aboutHeading: "Property maintenance services",
    body: "Property maintenance is recurring care so a commercial or HOA landscape looks tended on a schedule the site can live with. It is not a redesign. If the planting and turf are already there, we pick up at maintain. If the property needs new landscape work, that is a separate conversation. You can put the whole grounds on one plan, or start with commercial lawn maintenance when turf is the main need.",
    benefits: [
      "A property that looks sharp for customers, tenants, and the board",
      "One vendor for lawn, beds, cleanup, and color—or lawn only if that is the need",
      "A plan built from the site you have, including landscapes we did not install",
    ],
    galleryHeading: "Services we offer",
    galleryLead: "The care that keeps a commercial landscape looking sharp week to week.",
    metaTitle: "Property Maintenance Services in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Commercial landscape maintenance in Florence, SC for businesses and HOAs: lawn maintenance, garden care, seasonal cleanup, and seasonal color.",
    galleryImage: siteImages.gardenPath,
    galleryImageAlt: "Maintained garden path and planting at a commercial property",
    aboutImage: siteImages.services.landscapeCover,
    aboutImageAlt: "Landscaped front yard with a striped lawn, planting beds, and a brick home",
    serviceSlugs: MAINTENANCE_SERVICE_SLUGS,
    serviceGroups: MAINTENANCE_SERVICE_GROUPS,
    workHeading: "Featured property maintenance in Florence",
    workLead: "See some properties that we care for on a weekly basis.",
    switchLabel: "Property Maintenance",
    proofFacts: ["One vendor for lawn, beds, cleanup, and color"],
    siblingPath: COMMERCIAL_LANDSCAPE_PATH,
    siblingLabel: "Commercial Landscape Services",
    otherAudiencePath: RESIDENTIAL_LAWN_CARE_PATH,
    otherAudienceLabel: "Lawn Care Services",
    featuredWorkSlug: "bennettsville-sc-commercial-landscape-bennettsville-first-presbyterian-church",
  },
];

export function getAudienceHub(id: string): AudienceHub | undefined {
  return audienceHubs.find((hub) => hub.id === id);
}

export function getAudienceHubByPath(path: string): AudienceHub | undefined {
  return audienceHubs.find((hub) => hub.path === path);
}

export function getHubsForAudience(audience: Audience): AudienceHub[] {
  return audienceHubs.filter((hub) => hub.audience === audience);
}

export function getHubServices(hub: AudienceHub): ServiceDef[] {
  return hub.serviceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is ServiceDef => Boolean(service));
}

export function getHubsForFamily(family: HubFamily): {
  residential: AudienceHub;
  commercial: AudienceHub;
} {
  const residential = audienceHubs.find((hub) => hub.audience === "residential" && hub.family === family)!;
  const commercial = audienceHubs.find((hub) => hub.audience === "commercial" && hub.family === family)!;
  return { residential, commercial };
}

function seeOtherServicesLabel(hub: AudienceHub): string {
  if (hub.audience === "residential") {
    return hub.family === "construction"
      ? "See other residential landscape services"
      : "See other residential lawn care services";
  }
  return hub.family === "construction"
    ? "See other commercial landscape services"
    : "See other commercial property maintenance services";
}

/** One hub link from a service page, matching the hub the visitor came from. */
export function getServiceHubLink(
  family: ServiceFamily,
  fromHubId?: string | string[],
): { href: string; label: string } {
  const requested = Array.isArray(fromHubId) ? fromHubId[0] : fromHubId;
  const { residential } = getHubsForFamily(family);
  const match = audienceHubs.find((hub) => hub.id === requested && hub.family === family);
  const hub = match ?? residential;
  return {
    href: `${hub.path}#services`,
    label: seeOtherServicesLabel(hub),
  };
}

export function servicePathWithHub(slug: string, hubId: string): string {
  return `/services/${slug}?from=${encodeURIComponent(hubId)}`;
}
