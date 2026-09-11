import { siteImages } from "./siteImages";

export type ProcessSection = {
  title: string;
  body: string;
  href?: string;
};

export type ProcessPartner = {
  heading: string;
  body: string;
  linkLabel?: string;
  linkHref?: string;
};

export type ProcessStep = {
  slug: string;
  name: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  /** One-line description for the process strip */
  line: string;
  body: string;
  sections: readonly ProcessSection[];
  appliesTo: readonly { slug: string; label: string }[];
  ctaHeadline: string;
  metaTitle: string;
  metaDescription: string;
  galleryImage: string;
  galleryImageAlt: string;
  partner?: ProcessPartner;
};

export const processSteps: ProcessStep[] = [
  {
    slug: "design",
    name: "Landscape Design",
    navLabel: "Design",
    eyebrow: "How we plan",
    headline: "See the landscape",
    headlineAccent: "before we build it",
    intro:
      "Design is the planning step: we learn the property and the goal, then produce a layout you can review in 2D and 3D before installation starts.",
    line: "A 2D and 3D plan before anyone breaks ground.",
    body: "We meet with the customer to understand goals, style, budget, and property needs; evaluate existing site conditions; develop layout, plant, hardscape, irrigation, lighting, drainage, and other recommendations as needed; then create a 2D and 3D plan for presentation and installation. We can take a project from that plan through grading, drainage, irrigation, planting, sod, hardscapes, landscape lighting, water features, outdoor kitchens, and final installation.",
    sections: [
      {
        title: "Goals, style, and budget",
        body: "The first meeting is about how you live in the yard, what you want to change, and what the project needs to cost.",
      },
      {
        title: "Site evaluation",
        body: "We look at existing conditions—grade, drainage, planting, hardscape, and how the house sits on the lot—before recommending a layout.",
      },
      {
        title: "2D and 3D presentation",
        body: "You review a 2D and 3D plan so the layout, plants, and built features are clear before anyone mobilizes on site.",
      },
    ],
    appliesTo: [
      { slug: "landscape-enhancements", label: "Landscape enhancements" },
      { slug: "turf-renovation-installation", label: "Turf renovation and installation" },
      { slug: "hardscapes", label: "Hardscapes" },
      { slug: "outdoor-kitchens", label: "Outdoor kitchens" },
      { slug: "outdoor-lighting", label: "Landscape lighting" },
      { slug: "water-features", label: "Water features" },
      { slug: "irrigation", label: "Irrigation and water management" },
      { slug: "drainage-grading", label: "Drainage and grading" },
    ],
    ctaHeadline: "Ready to plan the landscape?",
    metaTitle: "Landscape Design in Florence, SC | 2D & 3D Plans",
    metaDescription:
      "Landscape design in Florence, SC: we evaluate the site, plan plants, hardscape, irrigation, lighting, and drainage, then present 2D and 3D plans before install.",
    galleryImage: siteImages.services.landscapeCover,
    galleryImageAlt: "Designed front yard with planting beds and a striped lawn",
  },
  {
    slug: "installation",
    name: "Landscape Installation",
    navLabel: "Installation",
    eyebrow: "How we build",
    headline: "From the plan",
    headlineAccent: "to a finished yard",
    intro:
      "Installation is the build: site prep, removals, grading, then the plants, sod, stone, irrigation, lighting, and other elements in the project—finished with cleanup and care instructions.",
    line: "Site prep through planting, stone, lighting, and handover.",
    body: "We prepare the site; remove or modify existing landscaping as needed; complete grading and soil preparation; lay out and install plants, trees, shrubs, sod, mulch, stone, edging, irrigation, lighting, and other landscape elements included in the project; then finish with cleanup and customer care instructions. We invest in professional equipment, experienced employees, and better installation processes so projects finish efficiently with a high-quality result.",
    sections: [
      {
        title: "Site prep and removals",
        body: "Existing landscaping is removed or modified as the plan requires so the new work is not fighting old grade, sod, or debris.",
      },
      {
        title: "Grading and soil",
        body: "Grading and soil preparation happen before plants, sod, or hardscape go in, so water and roots have a fair start.",
      },
      {
        title: "Install and handover",
        body: "Plants, trees, shrubs, sod, mulch, stone, edging, irrigation, lighting, and other elements in the project are laid out and installed. We clean up and leave care instructions.",
      },
    ],
    appliesTo: [
      { slug: "landscape-enhancements", label: "Landscape enhancements" },
      { slug: "turf-renovation-installation", label: "Turf renovation and installation" },
      { slug: "hardscapes", label: "Hardscapes" },
      { slug: "outdoor-kitchens", label: "Outdoor kitchens" },
      { slug: "outdoor-lighting", label: "Landscape lighting" },
      { slug: "water-features", label: "Water features" },
      { slug: "irrigation", label: "Irrigation and water management" },
      { slug: "drainage-grading", label: "Drainage and grading" },
    ],
    ctaHeadline: "Have a plan you want built?",
    metaTitle: "Landscape Installation in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Landscape installation in Florence, SC: site prep, grading, planting, sod, hardscape, irrigation, and lighting—finished with cleanup and care instructions.",
    galleryImage: siteImages.heroFrontYard,
    galleryImageAlt: "Finished front lawn with planting beds after landscape installation",
  },
  {
    slug: "maintenance",
    name: "Landscape Maintenance",
    navLabel: "Maintenance",
    eyebrow: "How we care for it",
    headline: "A plan for the",
    headlineAccent: "finished landscape",
    intro:
      "Maintenance is ongoing property care. We evaluate the landscape and build a plan around what it actually needs—not a generic mow-and-go list.",
    line: "A care plan matched to the finished landscape.",
    body: "We evaluate the property and establish a maintenance plan based on the landscape. Services may include mowing, pruning, weed control, bed maintenance, seasonal cleanup, mulch or pine straw, seasonal color, and general landscape care. Through our Elite Turf partnership, landscape customers can also access discounted or preferred pricing on professional lawn applications.",
    sections: [
      {
        title: "Total landscape maintenance",
        body: "An ongoing program for the entire property that can include lawn care, garden maintenance, seasonal cleanup, seasonal color, turf care, mulch, and pruning.",
        href: "/services/total-landscape-maintenance",
      },
      {
        title: "Lawn maintenance services",
        body: "Mow turf at the appropriate height, edge beds and hard surfaces, trim areas inaccessible to mowers, and blow or clean paved surfaces after service.",
        href: "/services/lawn-maintenance",
      },
      {
        title: "Turf care",
        body: "Fertilization, weed control, and related lawn applications through our Elite Turf partnership.",
        href: "/services/turf-care",
      },
      {
        title: "Seasonal cleanup",
        body: "Remove leaves, fallen limbs, plant debris, and seasonal buildup; cut back or clean appropriate plant material; clean landscape beds; and prepare the property for the upcoming season.",
        href: "/services/seasonal-cleanup",
      },
      {
        title: "Seasonal color and enhancements",
        body: "Design seasonal color displays; prepare planting areas; remove previous seasonal material; install flowers and accent plants; and finish with mulch and cleanup.",
        href: "/services/seasonal-color",
      },
      {
        title: "Garden maintenance services",
        body: "Ornamental beds, plant health, and ongoing garden care.",
        href: "/services/garden-maintenance",
      },
      {
        title: "Mulch and pine straw",
        body: "Measure, edge, install mulch or pine straw, and clean surrounding lawn and hardscape.",
        href: "/services/mulch-and-pine-straw",
      },
      {
        title: "Pruning and cleanup",
        body: "Selective pruning for appearance, size, and plant health, with debris removed.",
        href: "/services/pruning-and-cleanup",
      },
    ],
    appliesTo: [
      { slug: "total-landscape-maintenance", label: "Total landscape maintenance" },
      { slug: "lawn-maintenance", label: "Lawn maintenance services" },
      { slug: "turf-care", label: "Turf care" },
      { slug: "seasonal-cleanup", label: "Seasonal cleanup" },
      { slug: "seasonal-color", label: "Seasonal color and enhancements" },
      { slug: "garden-maintenance", label: "Garden maintenance services" },
      { slug: "mulch-and-pine-straw", label: "Mulch and pine straw" },
      { slug: "pruning-and-cleanup", label: "Pruning and cleanup" },
    ],
    ctaHeadline: "Want a maintenance plan for the landscape?",
    metaTitle: "Landscape Maintenance in Florence, SC | Lawn, Beds & Seasonal Care",
    metaDescription:
      "Landscape maintenance in Florence, SC: mowing, pruning, beds, mulch, seasonal color, and turf care. Custom plans from Innovative Landscape Design.",
    galleryImage: siteImages.heroFrontYard,
    galleryImageAlt: "Maintained striped lawn and planting beds in Florence, SC",
    partner: {
      heading: "Elite Turf partnership",
      body: "We have a relationship with Elite Turf that allows our landscape customers access to discounted or preferred pricing on professional lawn applications.",
      linkLabel: "Visit Elite Turf Services",
      linkHref: "https://eliteturfsc.com/",
    },
  },
];

/**
 * The four-phase overview used by the process story on the homepage,
 * service pages, and audience hubs. Prep is broken out of installation
 * so the visual story reads Design -> Prep -> Install -> Maintain.
 */
export type ProcessPhase = {
  slug: "design" | "prep" | "install" | "maintain";
  step: number;
  /** One-word label shown on the rail / node */
  label: string;
  /** Short headline for the phase */
  title: string;
  /** One sentence of supporting copy */
  line: string;
  image: string;
  imageAlt: string;
};

export const processPhases: readonly ProcessPhase[] = [
  {
    slug: "design",
    step: 1,
    label: "Design",
    title: "Design",
    line: "We meet on site, learn the goals and budget, then present a 2D and 3D plan you can review before anyone breaks ground.",
    image: siteImages.aboutConsultation,
    imageAlt: "Landscape designer reviewing a site plan on a tablet with homeowners in their yard",
  },
  {
    slug: "prep",
    step: 2,
    label: "Prepare",
    title: "Prepare",
    line: "Removals, grading, drainage, and soil work come first so the new landscape is not fighting old grade or debris.",
    image: "/images/before-after/hardscapes-before.jpg",
    imageAlt: "Yard cleared and graded ahead of landscape installation",
  },
  {
    slug: "install",
    step: 3,
    label: "Install",
    title: "Install",
    line: "Plants, sod, stone, irrigation, lighting, and water features go in as designed, finished with cleanup and care instructions.",
    image: siteImages.services.hardscapes,
    imageAlt: "Finished patio, walls, and planting after landscape installation",
  },
  {
    slug: "maintain",
    step: 4,
    label: "Maintain",
    title: "Maintain",
    line: "A care plan built around the landscape, from mowing and beds to pruning, seasonal cleanup, and color, so it looks like the plan for years.",
    image: siteImages.heroFrontYard,
    imageAlt: "Professionally maintained front lawn and planting beds",
  },
];

export function getProcessStep(slug: string): ProcessStep | undefined {
  return processSteps.find((step) => step.slug === slug);
}
