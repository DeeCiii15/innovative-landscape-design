import { getServiceBySlug, type ServiceDef } from "./servicesData";
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
    headline: "Build the yard you actually",
    headlineAccent: "use",
    intro:
      "Residential landscape services for homes in Florence, SC: planting, hardscapes, lighting, water features, irrigation, outdoor kitchens, turf, and drainage—designed and installed as one outdoor living space around the house.",
    aboutHeading: "About residential landscape services",
    body: "This is the project work for a home yard. We start with how you want to live outside: a patio you actually sit on, a front yard that looks finished from the street, lighting you can walk at night, and planting that fits the beds you have. If the space around the house does not match how you use it—no real gathering space, tired turf, water that sits after rain—residential landscape services are the install that changes it. Outdoor kitchens, hardscapes, lighting, water features, irrigation, turf, drainage, and landscape enhancements can be one job for the property instead of a string of disconnected add-ons.",
    benefits: [
      "One plan and one install for the outdoor space, not a pile of separate trades",
      "A yard built for how you actually live—not only for how it looks from the street",
      "Work that can move into lawn care after it is finished, so the install stays in shape",
    ],
    galleryHeading: "Residential landscape services",
    galleryLead: "See all of the different residential landscape services we offer.",
    metaTitle: "Landscape Services for Homes in Florence, SC",
    metaDescription:
      "Residential landscape services in Florence, SC: hardscapes, lighting, water features, irrigation, planting, outdoor kitchens, and drainage for homes.",
    galleryImage: siteImages.heroFrontYard,
    galleryImageAlt: "Finished front yard with planting beds and a striped lawn",
    aboutImage: siteImages.aboutBackyard,
    aboutImageAlt: "A finished backyard with layered planting beds, planters, and a lawn leading to the house",
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
    headline: "Keep the finished yard looking",
    headlineAccent: "right",
    intro:
      "Residential lawn care services for homes in Florence, SC: weekly mowing, garden and bed work, seasonal cleanup, and seasonal color—on a plan built around the yard at the house, not a commercial property.",
    aboutHeading: "About residential lawn care services",
    body: "This is ongoing care for a home yard. It is not a redesign, and it is not commercial groundskeeping for a storefront, office, or HOA common area. After the landscape is in—or for a yard you already have—the lawn still needs mowing, beds still need tending, and seasons still change the property around the house. You can start with mowing only, or put lawn, gardens, cleanup, and color on one residential plan so the whole yard stays even week to week.",
    benefits: [
      "A yard that looks tended week to week without you running the crew",
      "Start with lawn only, or add beds, cleanup, and color when you are ready",
      "The same team can take over a landscape we installed or one we did not",
    ],
    galleryHeading: "Lawn care services",
    galleryLead: "Each card is a maintenance service for homes. Open one for what it includes.",
    metaTitle: "Lawn Care Services for Homes in Florence, SC",
    metaDescription:
      "Residential landscape maintenance in Florence, SC: lawn care, garden maintenance, seasonal cleanup, and seasonal color for homes.",
    galleryImage: siteImages.heroFrontYard,
    galleryImageAlt: "Maintained residential lawn and planting beds",
    aboutImage: siteImages.aboutGardenBed,
    aboutImageAlt: "A curved planting bed with lime groundcover, pink flowers, and a flowering crepe myrtle beside the lawn",
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
    headlineAccent: "holds up",
    intro:
      "Commercial landscape services in Florence, SC for offices, retail, HOAs, churches, and other properties—hardscapes, lighting, irrigation, planting, and drainage scoped for a commercial site.",
    aboutHeading: "About commercial landscape services",
    body: "Commercial landscape services are the project work for a property people see every day—entries, parking, common areas, and the planting and lighting around them. The trades are the same ones we use on homes. The job is different: access, occupied sites, insurance, and a landscape that has to look right from the street on a schedule the business or HOA can live with.",
    benefits: [
      "Curb appeal that holds up to traffic, weather, and a public-facing site",
      "Work scoped around access, hours, and how the property operates",
      "The same landscape services as a home job, sized to a commercial or HOA site",
    ],
    galleryHeading: "Landscape services",
    galleryLead: "Each card is a service we design and install for businesses and HOAs. Open one for what it includes and related work.",
    metaTitle: "Commercial Landscape Services in Florence, SC",
    metaDescription:
      "Commercial landscape services in Florence, SC for businesses, HOAs, and property managers—hardscapes, lighting, irrigation, planting, and drainage.",
    galleryImage: siteImages.heroAerial,
    galleryImageAlt: "Aerial view of a maintained commercial-scale landscape",
    aboutImage: siteImages.services.hardscapesCover,
    aboutImageAlt: "Stepping-stone garden path with hostas and white flowers",
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
  },
  {
    id: "commercial-maintenance",
    audience: "commercial",
    family: "maintenance",
    path: COMMERCIAL_PROPERTY_MAINTENANCE_PATH,
    navLabel: "Property Maintenance Services",
    name: "Property Maintenance Services",
    navBlurb:
      "Recurring care so the property looks presentation-ready for customers, tenants, and the board.",
    eyebrow: "For businesses and HOAs",
    headline: "Keep the property",
    headlineAccent: "presentation-ready",
    intro:
      "Property maintenance services in Florence, SC: lawn care, garden and bed work, seasonal cleanup, and color for businesses, HOAs, and managed properties.",
    aboutHeading: "About property maintenance services",
    body: "Property maintenance is recurring care so a commercial or HOA landscape looks tended on a schedule the site can live with. It is not a redesign. If the planting and turf are already there, we pick up at maintain. If the property needs new landscape work, that is a separate conversation. You can put the whole grounds on one plan, or start with commercial lawn maintenance when turf is the main need.",
    benefits: [
      "A property that looks presentation-ready for customers, tenants, and the board",
      "One vendor for lawn, beds, cleanup, and color—or lawn only if that is the need",
      "A plan built from the site you have, including landscapes we did not install",
    ],
    galleryHeading: "Property maintenance services",
    galleryLead: "Each card is a maintenance service for businesses and HOAs. Open one for what it includes.",
    metaTitle: "Property Maintenance Services in Florence, SC",
    metaDescription:
      "Commercial landscape maintenance in Florence, SC for businesses and HOAs: lawn maintenance, garden care, seasonal cleanup, and seasonal color.",
    galleryImage: siteImages.heroAerial,
    galleryImageAlt: "Maintained commercial landscape and lawn",
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
