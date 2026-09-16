import { projectImages, siteImages } from "./siteImages";

export type ServiceHighlight = {
  heading: string;
  body: string;
  linkLabel?: string;
  linkHref?: string;
};

export type ServiceSection = {
  title: string;
  body: string;
  href?: string;
};

export type ServiceFamily = "construction" | "maintenance";

export const SERVICE_HIGHLIGHTS = {
  eliteTurf: {
    heading: "Elite Turf partnership",
    body: "We have a relationship with Elite Turf that allows our landscape customers access to discounted or preferred pricing on professional lawn applications.",
    linkLabel: "Visit Elite Turf Services",
    linkHref: "https://eliteturfsc.com/",
  },
  smartIrrigation: {
    heading: "Smart irrigation",
    body: "We install smart irrigation controllers based on the needs of each client. These allow remote control and adjustment of watering schedules and can make it easier for us to help customers manage irrigation settings.",
  },
  castLighting: {
    heading: "CAST landscape lighting",
    body: "We are certified installers for CAST Landscape Lighting systems and typically install CAST systems because of their quality, durability, and professional-grade construction.",
  },
  clifRock: {
    heading: "ClifRock certified installer",
    body: "We are a certified ClifRock installer. This gives us another specialized option for creating custom outdoor living features, particularly outdoor kitchens, water features, fire features, and related masonry-style elements.",
  },
  suppliers: {
    heading: "Long-term supplier relationships",
    body: "We have approximately 25 years of relationships with local landscape suppliers as well as suppliers throughout much of the Southeast. This gives us access to a broad selection of plants, materials, and specialty products.",
  },
} as const satisfies Record<string, ServiceHighlight>;

export type ServiceDef = {
  slug: string;
  /** Legacy / short id used in older paths */
  legacyId: string;
  name: string;
  navLabel: string;
  /** When false, the page exists and is linked from hubs/footer, not treated as a primary work category. */
  inNav: boolean;
  family: ServiceFamily;
  workCategory: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  body: string;
  /** Second paragraph: why the service matters on the property. */
  benefits?: string;
  sections: readonly ServiceSection[];
  bullets: readonly string[];
  tagline: string;
  ctaHeadline: string;
  ctaButton: string;
  metaTitle: string;
  metaDescription: string;
  galleryImage: string;
  galleryImageAlt: string;
  /** Photo beside the service copy. Falls back to related-project photos, then the hero. */
  aboutImage?: string;
  aboutImageAlt?: string;
  icon:
    | "landscaping"
    | "irrigation"
    | "hardscapes"
    | "lighting"
    | "water-features"
    | "kitchens"
    | "drainage"
    | "lawn"
    | "seasonal"
    | "garden"
    | "maintenance";
  /** Partnerships, products, or certifications unique to this service. */
  highlights?: readonly ServiceHighlight[];
};

export const services: ServiceDef[] = [
  {
    slug: "landscape-enhancements",
    legacyId: "design",
    name: "Landscape Enhancements",
    navLabel: "Landscape Enhancements",
    inNav: true,
    family: "construction",
    workCategory: "landscape-design",
    eyebrow: "Florence, SC",
    headline: "Improve the landscape",
    headlineAccent: "you already have",
    intro:
      "Landscape enhancements improve what is already there—beds, trees, shrubs, edging, and planting—without requiring a full-yard renovation.",
    body: "Landscape enhancements in Florence, SC improve the planting you already have—beds, trees, shrubs, edging, and new plants—without tearing out a finished yard. We look at what is working, what is tired, and what the property needs from the street and from the house, then install the plant and bed work as one job. New lawns and tired turf are a separate service: turf renovation and installation.",
    benefits:
      "The result is a landscape that looks more complete and is easier to live with: stronger curb appeal, healthier plants in soil that can actually support them, and updates you can enjoy without the cost or disruption of a full-yard rebuild.",
    sections: [
      {
        title: "Flower beds and planting",
        body: "We lay out and install beds, plants, and shrubs—including soil prep, edging, and mulch so new planting looks settled in from day one.",
      },
      {
        title: "Trees and shrubs",
        body: "New trees and shrubs are placed for scale, screening, and long-term health—not just for how they look on install day.",
      },
      {
        title: "Updates without a teardown",
        body: "Enhancements may include adding or replacing plants, trees, beds, edging, mulch, or rock without requiring a complete landscape renovation.",
      },
    ],
    bullets: [
      "Beds, trees, and shrubs installed as one planting plan.",
      "Site prep and soil work before anything goes in the ground.",
      "Updates when you need an improvement, not a full teardown.",
    ],
    tagline: "Beds, trees, and planting that improve the yard you have.",
    ctaHeadline: "Ready to refresh the planting?",
    ctaButton: "Request a free estimate",
    metaTitle: "Landscape Enhancements in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Landscape enhancements in Florence, SC: flower beds, trees, shrubs, and planting updates without a full renovation, from Innovative Landscape Design.",
    galleryImage: siteImages.bedAerial,
    galleryImageAlt: "Aerial view of a curved planting bed with seasonal color beside the lawn",
    icon: "landscaping",
    highlights: [SERVICE_HIGHLIGHTS.suppliers],
  },
  {
    slug: "turf-renovation-installation",
    legacyId: "turf-renovation",
    name: "Turf Renovation and Installation",
    navLabel: "Turf Renovation",
    inNav: true,
    family: "construction",
    workCategory: "landscape-design",
    eyebrow: "Sod and lawn rebuilds",
    headline: "New turf,",
    headlineAccent: "installed to last",
    intro:
      "Turf renovation and installation is the lawn-build side of the work: evaluate the existing turf, correct the soil and grade, install sod, and check irrigation so the new lawn can establish.",
    body: "Turf renovation and sod installation in Florence, SC is the lawn-build side of the landscape: we evaluate the existing turf and soil, correct grade issues that keep grass from taking, then install sod so the new lawn has a fair start. Ongoing mowing and turf treatments after install are lawn maintenance and turf care, not this service.",
    benefits:
      "A rebuilt lawn changes how the whole property looks and how it holds up in the Pee Dee heat. Even coverage, a grade that sheds water, and irrigation that can actually reach the turf mean you are not fighting bare spots and runoff after the crew leaves.",
    sections: [
      {
        title: "Sod installation",
        body: "We prep the soil, set the grade, and install sod so the new lawn sits on a surface that can hold it. Irrigation is checked so the turf can take after install.",
      },
      {
        title: "Turf renovation",
        body: "When a lawn is failing, we remove the tired turf, correct the grade, and rebuild it with soil prep, sod, and irrigation—rather than asking worn grass to recover on its own.",
      },
      {
        title: "Establishment",
        body: "We leave watering and care instructions so the new turf has a fair start after we leave the site.",
      },
    ],
    bullets: [
      "Existing turf and soil evaluated before we recommend a variety.",
      "Removals, grading, and soil prep before sod goes down.",
      "Irrigation coverage checked and establishment instructions at handover.",
    ],
    tagline: "Sod and lawn rebuilds, installed correctly.",
    ctaHeadline: "Need a new lawn or a turf rebuild?",
    ctaButton: "Request a free estimate",
    metaTitle: "Turf Renovation and Installation in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Turf renovation and sod installation in Florence, SC. Soil prep, grading, sod, and irrigation checks from Innovative Landscape Design.",
    galleryImage: siteImages.heroAerial,
    galleryImageAlt: "Striped front lawn after turf installation in Florence, SC",
    icon: "landscaping",
    highlights: [SERVICE_HIGHLIGHTS.suppliers],
  },
  {
    slug: "hardscapes",
    legacyId: "hardscapes",
    name: "Hardscapes",
    navLabel: "Hardscapes",
    inNav: true,
    family: "construction",
    workCategory: "hardscapes",
    eyebrow: "Outdoor living",
    headline: "Patios, walks, walls,",
    headlineAccent: "and fire features",
    intro:
      "Hardscapes are the built outdoor rooms—patios, walkways, steps, walls, and fire features set on a properly prepared base so they drain and last.",
    body: "Hardscapes in Florence, SC are the built outdoor rooms—patios, walkways, steps, walls, and fire features—set on a prepared base so they drain and last in local weather. We plan layout and elevations first, then excavate, compact the base, and install pavers, natural stone, or walls as part of the same job. Outdoor kitchens are a related build when you want cooking and gathering in the same space.",
    benefits:
      "A well-built hardscape gives you usable outdoor living, cleaner circulation through the yard, and a surface that does not heave or pond after storms. It also ties the house to the planting so the property reads as one landscape, not a patio dropped on the lawn.",
    sections: [
      {
        title: "Patios, walkways, and steps",
        body: "Paver and natural-stone surfaces laid on a compacted base, with joints and edges finished and the surrounding planting tied in.",
      },
      {
        title: "Walls",
        body: "Seating walls, retaining walls, and landscape walls designed for the grade and how you use the yard.",
      },
      {
        title: "Fire features",
        body: "Fire pits and masonry-style fire features built as part of the hardscape, including ClifRock options when that look is the right fit.",
      },
      {
        title: "Outdoor kitchens",
        body: "Layout, foundation, structure, appliances, and surrounding hardscape. See our outdoor kitchens page for the full process and ClifRock certification.",
        href: "/services/outdoor-kitchens",
      },
    ],
    bullets: [
      "Layout, elevations, and drainage planned before excavation.",
      "Compacted base, then pavers, stone, walls, or steps.",
      "Joints, edges, and surrounding landscape finished together.",
    ],
    tagline: "Built outdoor living that holds up in Florence.",
    ctaHeadline: "Ready for a patio or outdoor living space?",
    ctaButton: "Request a free estimate",
    metaTitle: "Hardscapes in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Hardscape patios, walkways, walls, steps, and fire features in Florence, SC. Proper base, drainage, and finish from Innovative Landscape Design.",
    galleryImage: siteImages.services.hardscapesCover,
    galleryImageAlt: "Brick courtyard with planters, palms, and planting beds",
    icon: "hardscapes",
    highlights: [SERVICE_HIGHLIGHTS.clifRock],
  },
  {
    slug: "outdoor-kitchens",
    legacyId: "kitchens",
    name: "Outdoor Kitchens",
    navLabel: "Outdoor Kitchens",
    inNav: false,
    family: "construction",
    workCategory: "hardscapes",
    eyebrow: "ClifRock certified",
    headline: "Cook and gather",
    headlineAccent: "in the landscape",
    intro:
      "An outdoor kitchen is planned as part of the landscape—layout, foundation, structure, appliances, and the hardscape around it—so it works as a real gathering space, not an add-on.",
    body: "An outdoor kitchen in Florence, SC is planned as part of the landscape—layout, foundation, structure, appliances, and the hardscape around it—so cooking and gathering actually work outside, not as an afterthought against the house.",
    benefits:
      "You get a gathering space you will use: cooking, seating, and traffic planned together, utilities run correctly, and surrounding patio and planting finished so the kitchen belongs in the yard.",
    sections: [
      {
        title: "Layout and features",
        body: "We plan cooking, seating, storage, and traffic so the kitchen fits how you actually use the yard.",
      },
      {
        title: "Foundation and structure",
        body: "Site prep and foundation come first, then the kitchen structure, utilities, and finishes.",
      },
      {
        title: "Surrounding landscape",
        body: "Patios, planting, lighting, and drainage around the kitchen are completed as part of the same outdoor living space.",
      },
    ],
    bullets: [
      "Certified ClifRock installer for custom outdoor living features.",
      "Grills, appliances, countertops, storage, and utilities coordinated in one build.",
      "Surrounding hardscape and landscape finished with the kitchen.",
    ],
    tagline: "Outdoor kitchens built into the landscape.",
    ctaHeadline: "Want an outdoor kitchen in your yard?",
    ctaButton: "Request a free estimate",
    metaTitle: "Outdoor Kitchens in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Outdoor kitchen design and construction in Florence, SC. ClifRock certified installer for custom kitchens, fire features, and outdoor living.",
    galleryImage: siteImages.services.hardscapesCover,
    galleryImageAlt: "Brick courtyard and sitting walls ready for outdoor living",
    aboutImage: projectImages.churchWalks,
    aboutImageAlt: "Herringbone paver walks and planting on a finished hardscape",
    icon: "kitchens",
    highlights: [SERVICE_HIGHLIGHTS.clifRock],
  },
  {
    slug: "outdoor-lighting",
    legacyId: "lighting",
    name: "Landscape Lighting",
    navLabel: "Landscape Lighting",
    inNav: true,
    family: "construction",
    workCategory: "outdoor-lighting",
    eyebrow: "CAST certified",
    headline: "Light architecture,",
    headlineAccent: "paths, and trees",
    intro:
      "Landscape lighting is designed for how the property should look and feel after dark—architecture, plantings, walkways, trees, and outdoor living areas.",
    body: "Landscape lighting in Florence, SC is designed for how the property should look and feel after dark—architecture, trees, walkways, and outdoor living areas. We evaluate the site, place fixtures, install wiring and controls, then aim everything so the light shows the landscape instead of washing the windows.",
    benefits:
      "The property is safer to walk at night, easier to welcome guests, and more useful after sunset. Aimed lighting also adds curb appeal without the glare of generic flood lights.",
    sections: [
      {
        title: "Walkways and safety",
        body: "Path and entrance lighting so residents and visitors can navigate the property after dark.",
      },
      {
        title: "Architecture and trees",
        body: "Uplighting and accent fixtures aimed to show the house, canopy, and structure—not a glare in the windows.",
      },
      {
        title: "Outdoor living areas",
        body: "Lighting for patios, kitchens, and gathering spaces so the landscape you built is usable at night.",
      },
    ],
    bullets: [
      "Certified CAST Landscape Lighting installer.",
      "Wiring, fixtures, transformers, and controls installed as a system.",
      "Fixtures aimed and adjusted after install.",
    ],
    tagline: "Professional-grade lighting, aimed correctly.",
    ctaHeadline: "Want your landscape to work after dark?",
    ctaButton: "Request a free estimate",
    metaTitle: "Landscape Lighting in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "CAST certified landscape lighting in Florence, SC. Fixture design, wiring, and aiming for architecture, walkways, trees, and outdoor living.",
    galleryImage: siteImages.services.lightingNight,
    galleryImageAlt: "Landscape lighting on trees, walks, and a stone water feature at night",
    aboutImage: siteImages.services.lightingNight,
    aboutImageAlt: "Uplighted trees and a lit water feature in a courtyard after dark",
    icon: "lighting",
    highlights: [SERVICE_HIGHLIGHTS.castLighting],
  },
  {
    slug: "water-features",
    legacyId: "water-features",
    name: "Water Features",
    navLabel: "Water Features",
    inNav: true,
    family: "construction",
    workCategory: "water-features",
    eyebrow: "Ponds & waterfalls",
    headline: "Waterfalls, ponds,",
    headlineAccent: "and streams",
    intro:
      "A water feature is sized and sited for the yard, then built as stone, plumbing, and planting together—so it looks settled in and keeps circulating.",
    body: "Water features in Florence, SC—waterfalls, ponds, and streams—are sized and sited for the yard, then built as stone, plumbing, and planting together. We plan type, size, and location, excavate, install the basin and circulation, and finish the surrounding landscape so the feature looks settled in.",
    benefits:
      "Moving water cools a sitting area, masks street noise, and gives the landscape a focal point you can hear from the house. Built as one system, it keeps circulating instead of turning into a maintenance headache.",
    sections: [
      {
        title: "Waterfalls and streams",
        body: "Moving water built with stone and planting so the feature reads as part of the grade, not a kit dropped in the corner.",
      },
      {
        title: "Ponds",
        body: "Basin, circulation, and surrounding landscape sized to the property and how you want to use it.",
      },
      {
        title: "Pumps and circulation",
        body: "Plumbing, pumps, and filtration or circulation components installed and tested before we walk you through operation.",
      },
    ],
    bullets: [
      "Type, size, and location planned before excavation.",
      "Basin, plumbing, pumps, and stone built as one system.",
      "Surrounding landscape completed with the feature.",
    ],
    tagline: "Moving water, built into the landscape.",
    ctaHeadline: "Ready for a waterfall or pond in your yard?",
    ctaButton: "Request a free estimate",
    metaTitle: "Water Features in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Custom waterfalls, ponds, and streams in Florence, SC. Basin, pumps, stone, and planting designed and built by Innovative Landscape Design.",
    galleryImage: siteImages.services.waterFeaturesCover,
    galleryImageAlt: "Multi-tiered backyard waterfall and stream with natural stone and plantings",
    icon: "water-features",
    highlights: [SERVICE_HIGHLIGHTS.clifRock],
  },
  {
    slug: "irrigation",
    legacyId: "irrigation",
    name: "Irrigation and Water Management",
    navLabel: "Irrigation",
    inNav: true,
    family: "construction",
    workCategory: "irrigation",
    eyebrow: "Water management",
    headline: "Sprinklers, drip,",
    headlineAccent: "and smart control",
    intro:
      "Irrigation and water management is designed around watering needs, the water source, and the landscape—then installed, tested, and programmed so coverage is even and water is not wasted.",
    body: "Irrigation and water management in Florence, SC is designed around the landscape, the water source, and how the property actually dries out in summer. We design or repair systems, install heads, valves, piping, drip, and controllers, then test coverage so turf and planting get water without wasting it.",
    benefits:
      "Even coverage keeps new planting and turf alive through heat, protects the investment in the landscape, and cuts down on dry spots, runoff, and overwatering. A system matched to the site is easier to live with than a one-zone timer fighting the whole yard.",
    sections: [
      {
        title: "New systems and repairs",
        body: "Design and install of new systems, or modify and repair what is already in the ground.",
      },
      {
        title: "Heads, valves, piping, and drip",
        body: "Spray, rotor, and drip as the planting requires—not one head type for the whole property.",
      },
      {
        title: "Smart controllers",
        body: "Smart controllers sized to the client, with remote schedule control and the ability for us to help manage settings after install. Many jobs use Orbit B-hyve with weather-based adjustment.",
      },
    ],
    bullets: [
      "Systems designed for the landscape and the water source.",
      "Heads, valves, piping, drip, and controllers installed and tested.",
      "Smart controllers for remote schedules and easier ongoing help.",
    ],
    tagline: "Water where the landscape needs it.",
    ctaHeadline: "Want watering that matches the landscape?",
    ctaButton: "Request a free estimate",
    metaTitle: "Irrigation and Water Management in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Irrigation and water management in Florence, SC. Sprinklers, drip, and smart controllers for efficient watering from Innovative Landscape Design.",
    galleryImage: projectImages.byrnesFountain,
    galleryImageAlt: "Stone waterfall and stream with brick walks at a Florence home",
    aboutImage: projectImages.byrnesStream,
    aboutImageAlt: "Stone waterfall moving water through a backyard landscape",
    icon: "irrigation",
    highlights: [SERVICE_HIGHLIGHTS.smartIrrigation],
  },
  {
    slug: "drainage-grading",
    legacyId: "drainage",
    name: "Drainage & Grading",
    navLabel: "Drainage",
    inNav: false,
    family: "construction",
    workCategory: "hardscapes",
    eyebrow: "Water in the right place",
    headline: "Move water away",
    headlineAccent: "from problem areas",
    intro:
      "Drainage and grading fix how water moves across the property—low spots, soggy beds, and runoff toward the house—before planting or hardscape is asked to live with a bad grade.",
    body: "Drainage and grading in Florence, SC fix how water moves across the property—low spots, soggy beds, and runoff toward the house—before planting or hardscape is asked to live with a bad grade. We evaluate elevations and flow, regrade where the soil is the problem, and install catch basins, piping, or swales when a system is needed.",
    benefits:
      "Getting water off the house, out of beds, and into the right path protects foundations, keeps turf from drowning, and makes the rest of the landscape last. It is often the difference between a yard that stays usable after rain and one that stays wet.",
    sections: [
      {
        title: "Evaluation",
        body: "Elevations, water flow, low areas, and where water is actually going during a rain.",
      },
      {
        title: "Grading",
        body: "Regrade areas where the soil itself is the problem, so water sheds the way it should.",
      },
      {
        title: "Drainage systems",
        body: "Catch basins, piping, swales, and related components when the grade alone is not enough.",
      },
    ],
    bullets: [
      "Elevations and water flow evaluated before we recommend a fix.",
      "Regrading where the soil is the problem.",
      "Catch basins, piping, and swales when a system is needed.",
    ],
    tagline: "Get water off the problem and into the right path.",
    ctaHeadline: "Have a low spot or a wet yard?",
    ctaButton: "Request a free estimate",
    metaTitle: "Drainage & Grading in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Yard drainage and grading in Florence, SC. We evaluate water flow, regrade low areas, and install catch basins, piping, and swales.",
    galleryImage: siteImages.services.landscapeCover,
    galleryImageAlt: "Finished front yard with planting beds and a striped lawn",
    icon: "drainage",
  },
  {
    slug: "total-landscape-maintenance",
    legacyId: "total-maintenance",
    name: "Total Landscape Maintenance",
    navLabel: "Total Maintenance",
    inNav: false,
    family: "maintenance",
    workCategory: "landscape-design",
    eyebrow: "Full-property program",
    headline: "One plan for the",
    headlineAccent: "whole landscape",
    intro:
      "Total landscape maintenance is the full-property program: lawn, beds, pruning, seasonal cleanup, and color on one schedule based on what the landscape actually needs.",
    body: "Total landscape maintenance in Florence, SC is the full-property care program: lawn, beds, pruning, seasonal cleanup, and color on one schedule based on what the landscape actually needs—not a generic mow-and-go list.",
    benefits:
      "One plan keeps the whole property presentation-ready: turf, beds, and seasonal work handled together so nothing is left to wait until it looks neglected. Homes, HOAs, and commercial sites can all run on a total plan with frequency matched to the site.",
    sections: [
      {
        title: "Lawn maintenance services",
        body: "Mowing, edging, trimming, and blowing as part of the same visit that covers the rest of the property.",
        href: "/services/lawn-maintenance",
      },
      {
        title: "Turf care",
        body: "Fertilization, weed control, and related lawn applications through our Elite Turf partnership.",
        href: "/services/turf-care",
      },
      {
        title: "Garden maintenance services",
        body: "Ornamental beds, plant health, and ongoing garden care—kept on the same plan as the lawn.",
        href: "/services/garden-maintenance",
      },
      {
        title: "Mulch and pine straw",
        body: "Bed refresh with mulch or pine straw, edges redefined, and surrounding lawn and hardscape cleaned.",
        href: "/services/mulch-and-pine-straw",
      },
      {
        title: "Pruning and cleanup",
        body: "Selective pruning for appearance, size, and plant health, with debris hauled off.",
        href: "/services/pruning-and-cleanup",
      },
      {
        title: "Seasonal cleanup",
        body: "Spring and fall debris, cutback, and bed cleanup so the property is ready for the next season.",
        href: "/services/seasonal-cleanup",
      },
      {
        title: "Seasonal color and enhancements",
        body: "Annuals and rotating color displays when you want beds to change with the season.",
        href: "/services/seasonal-color",
      },
    ],
    bullets: [
      "One plan for lawn, beds, pruning, and seasonal work.",
      "Frequency and scope set from the landscape, not a one-size checklist.",
      "Elite Turf applications available through the lawn portion of the program.",
      "Homes, HOAs, and commercial properties can all run on a total plan.",
    ],
    tagline: "The full-property care program.",
    ctaHeadline: "Want one plan for the whole property?",
    ctaButton: "Request a free estimate",
    metaTitle: "Total Landscape Maintenance in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Total landscape maintenance in Florence, SC: lawn, beds, pruning, seasonal cleanup, and color on one plan for homes and commercial properties.",
    galleryImage: siteImages.gardenEstate,
    galleryImageAlt: "Estate garden with seasonal color, palms, and a brick walk",
    icon: "maintenance",
    highlights: [SERVICE_HIGHLIGHTS.eliteTurf],
  },
  {
    slug: "lawn-maintenance",
    legacyId: "lawn-maintenance",
    name: "Lawn Maintenance Services",
    navLabel: "Lawn Maintenance",
    inNav: false,
    family: "maintenance",
    workCategory: "landscape-design",
    eyebrow: "Turf care",
    headline: "Mow, edge, trim,",
    headlineAccent: "and blow",
    intro:
      "Lawn maintenance is turf-only care: mow at the right height, edge beds and hard surfaces, trim what the mower cannot reach, and blow paved areas after each visit.",
    body: "Lawn maintenance in Florence, SC is turf-only care: we mow at the height the grass needs, edge beds and hard surfaces, trim what the mower cannot reach, and blow paved areas after each visit.",
    benefits:
      "A consistent mow-and-edge schedule keeps the property looking finished from the street, protects turf health, and makes the rest of the landscape read as cared-for. Height and frequency follow the season so the lawn is not scalped in summer or left ragged between visits.",
    sections: [
      {
        title: "Mowing, edging, and trimming",
        body: "Turf is cut at the height the grass needs, with clean edges and trim work on the spots a mower cannot reach.",
      },
      {
        title: "Cleanup after each visit",
        body: "Walks, drives, and other paved surfaces are blown or cleaned so the property looks finished when we leave.",
      },
      {
        title: "Turf applications",
        body: "Fertilization, pre-emergent and post-emergent weed control, and related treatments can be added through turf care and our Elite Turf partnership.",
        href: "/services/turf-care",
      },
    ],
    bullets: [
      "Mow, edge, trim, and blow on a set schedule.",
      "Height and frequency matched to the turf and the season.",
      "Preferred pricing on Elite Turf lawn applications.",
    ],
    tagline: "Clean turf, every visit.",
    ctaHeadline: "Need a lawn maintenance schedule?",
    ctaButton: "Request a free estimate",
    metaTitle: "Lawn Maintenance Services in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Lawn maintenance in Florence, SC: mowing, edging, trimming, and blowing for homes and commercial properties. Elite Turf applications available.",
    galleryImage: siteImages.aboutBackyard,
    galleryImageAlt: "Striped lawn after professional mowing in Florence, SC",
    icon: "lawn",
    highlights: [SERVICE_HIGHLIGHTS.eliteTurf],
  },
  {
    slug: "seasonal-cleanup",
    legacyId: "seasonal-cleanup",
    name: "Seasonal Cleanup",
    navLabel: "Seasonal Cleanup",
    inNav: false,
    family: "maintenance",
    workCategory: "landscape-design",
    eyebrow: "Spring and fall",
    headline: "Clear the debris",
    headlineAccent: "for the next season",
    intro:
      "Seasonal cleanup is the spring and fall reset: leaves, limbs, plant debris, cutback, and bed cleaning so the property is ready for the season ahead.",
    body: "Seasonal cleanup in Florence, SC is the spring and fall reset: leaves, limbs, plant debris, cutback, and bed cleaning so the property is ready for the season ahead. It is a defined visit, not a substitute for weekly lawn maintenance.",
    benefits:
      "Clearing debris and cutting back spent growth keeps beds from smothering, reduces hiding places for pests, and gives the lawn and planting a clean start. The property looks tended at the season change instead of carrying last year's mess into the next.",
    sections: [
      {
        title: "Leaf and debris removal",
        body: "Leaves, fallen limbs, and plant debris are cleared from lawns, beds, and hard surfaces.",
      },
      {
        title: "Cutback and bed cleaning",
        body: "We cut back or clean the plant material that needs it and tidy landscape beds before new growth or winter.",
      },
      {
        title: "Season changeover",
        body: "The goal is a property that is ready for the next season—not leftover piles and overgrown beds.",
      },
    ],
    bullets: [
      "Spring and fall visits sized to the property.",
      "Debris, cutback, and bed cleaning in one trip.",
      "Fits homes, HOAs, and commercial sites.",
    ],
    tagline: "A clean start for spring or fall.",
    ctaHeadline: "Need a spring or fall cleanup?",
    ctaButton: "Request a free estimate",
    metaTitle: "Seasonal Cleanup in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Seasonal landscape cleanup in Florence, SC: leaves, debris, cutback, and bed cleaning for spring and fall on homes and commercial properties.",
    galleryImage: siteImages.heroFrontYard,
    galleryImageAlt: "Maintained striped lawn and planting beds after seasonal cleanup",
    icon: "seasonal",
  },
  {
    slug: "seasonal-color",
    legacyId: "seasonal-color",
    name: "Seasonal Color and Enhancements",
    navLabel: "Seasonal Color",
    inNav: false,
    family: "maintenance",
    workCategory: "landscape-design",
    eyebrow: "Annuals and displays",
    headline: "Color that changes",
    headlineAccent: "with the season",
    intro:
      "Seasonal color and enhancements are rotating flowers and accent plants—designed, installed, and swapped so beds stay in bloom through the year.",
    body: "Seasonal color and enhancements in Florence, SC are rotating flowers and accent plants—designed, installed, and swapped so beds stay in bloom through the year. We remove spent material, amend soil, install the display, and finish with mulch and cleanup.",
    benefits:
      "Beds stay in season at the front door, an HOA entrance, or a commercial entrance, which is often the first thing people see. Color that is planned for the property looks intentional, not like leftover flats.",
    sections: [
      {
        title: "Display design",
        body: "Color combinations and plant choices are planned for the season, the bed, and how the property is seen from the street or entrance.",
      },
      {
        title: "Changeout and soil prep",
        body: "Spent annuals come out, soil is amended as needed, and new flowers go in so the bed looks intentional on day one.",
      },
      {
        title: "Mulch and finish",
        body: "Mulch, light fertilization, and cleanup finish the install so the display sits cleanly in the landscape.",
      },
    ],
    bullets: [
      "Seasonal displays designed for the property, not leftover flats.",
      "Removal, soil prep, install, and cleanup as one visit.",
      "Works at a front door, an HOA entrance, or a commercial bed.",
    ],
    tagline: "Beds that stay in season.",
    ctaHeadline: "Want seasonal color in your beds?",
    ctaButton: "Request a free estimate",
    metaTitle: "Seasonal Color and Enhancements in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Seasonal color and enhancements in Florence, SC. Design, changeout, and install for homes, HOAs, and commercial properties.",
    galleryImage: siteImages.ctaAerial,
    galleryImageAlt: "Aerial view of seasonal color in curved planting beds",
    icon: "garden",
    highlights: [SERVICE_HIGHLIGHTS.suppliers],
  },
  {
    slug: "garden-maintenance",
    legacyId: "garden-maintenance",
    name: "Garden Maintenance Services",
    navLabel: "Garden Maintenance",
    inNav: false,
    family: "maintenance",
    workCategory: "landscape-design",
    eyebrow: "Beds and ornamentals",
    headline: "Keep beds, shrubs,",
    headlineAccent: "and gardens healthy",
    intro:
      "Garden maintenance services are ongoing care of ornamental landscape and garden areas: weeding, bed cleanup, plant health, and the look of the planted beds between larger visits.",
    body: "Garden maintenance in Florence, SC is ongoing care of ornamental beds: weeding, deadheading, bed cleanup, and attention to plant health so the planted landscape stays in shape between larger visits.",
    benefits:
      "Regular bed care keeps weeds from taking over, plants performing, and the ornamental side of the property looking as finished as the lawn. It is the difference between a landscape that holds the design and one that slowly grows out of it.",
    sections: [
      {
        title: "Beds, weeds, and cleanup",
        body: "Weeding, deadheading, and bed cleanup keep ornamental areas looking tended between seasonal visits.",
      },
      {
        title: "Plant health",
        body: "We watch how ornamentals are performing and flag issues before a bed gets away from you.",
      },
      {
        title: "Mulch, pine straw, and pruning",
        body: "Those jobs can ride with garden maintenance or stand alone. See mulch and pine straw, and pruning and cleanup, when you want them as their own service.",
        href: "/services/mulch-and-pine-straw",
      },
    ],
    bullets: [
      "Weeding, bed cleanup, and plant health on a regular cadence.",
      "Focused on ornamentals—not a substitute for mowing.",
      "Mulch, pine straw, and pruning available with the plan or as their own services.",
    ],
    tagline: "Ornamental beds that stay in shape.",
    ctaHeadline: "Need the beds and shrubs looked after?",
    ctaButton: "Request a free estimate",
    metaTitle: "Garden Maintenance Services in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Garden maintenance in Florence, SC: pruning, weeding, bed care, mulch, and pine straw for ornamental landscapes on homes and commercial properties.",
    galleryImage: siteImages.gardenPath,
    galleryImageAlt: "Garden path through hostas and maintained planting beds",
    icon: "garden",
    highlights: [SERVICE_HIGHLIGHTS.suppliers],
  },
  {
    slug: "turf-care",
    legacyId: "turf-care",
    name: "Turf Care",
    navLabel: "Turf Care",
    inNav: false,
    family: "maintenance",
    workCategory: "landscape-design",
    eyebrow: "Lawn applications",
    headline: "Feed and protect",
    headlineAccent: "the turf",
    intro:
      "Turf care is the treatment side of the lawn: fertilization, weed control, and related applications so the grass stays healthy between mows.",
    body: "Turf care in Florence, SC is the treatment side of the lawn: fertilization, weed control, and related applications so the grass stays healthy between mows. This is not mowing, and it is not a sod rebuild—those are separate services.",
    benefits:
      "A feeding and weed-control plan matched to the season keeps turf dense, greener, and better able to crowd out weeds. That protects the look of the lawn and the investment in mowing or a new install.",
    sections: [
      {
        title: "Fertilization",
        body: "A feeding schedule matched to the turf and the season, not a one-size bag from the store.",
      },
      {
        title: "Weed control",
        body: "Pre-emergent and post-emergent treatments to keep the lawn from filling in with weeds.",
      },
      {
        title: "With lawn maintenance",
        body: "Turf care can sit on its own or run alongside a mowing schedule. See lawn maintenance services when you also need mow, edge, trim, and blow.",
        href: "/services/lawn-maintenance",
      },
    ],
    bullets: [
      "Professional lawn applications through Elite Turf.",
      "Fertilization and weed control on a plan, not a one-off spray.",
      "Pairs with lawn maintenance or a total landscape program.",
    ],
    tagline: "Treatments that keep the lawn healthy.",
    ctaHeadline: "Need fertilization or weed control?",
    ctaButton: "Request a free estimate",
    metaTitle: "Turf Care in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Turf care in Florence, SC: fertilization, weed control, and lawn applications through Elite Turf. Pair with lawn maintenance from Innovative Landscape Design.",
    galleryImage: siteImages.heroAerial,
    galleryImageAlt: "Striped lawn kept healthy with professional turf care",
    icon: "lawn",
    highlights: [SERVICE_HIGHLIGHTS.eliteTurf],
  },
  {
    slug: "mulch-and-pine-straw",
    legacyId: "mulch",
    name: "Mulch and Pine Straw",
    navLabel: "Mulch and Pine Straw",
    inNav: false,
    family: "maintenance",
    workCategory: "landscape-design",
    eyebrow: "Beds and edges",
    headline: "Fresh beds,",
    headlineAccent: "clean edges",
    intro:
      "Mulch and pine straw is a defined bed-refresh: measure, clean, redefine edges, install the material, and clean the surrounding lawn and hardscape.",
    body: "Mulch and pine straw in Florence, SC is a bed-refresh: we measure, clean, redefine edges, install the material, and clean the surrounding lawn and hardscape. You can buy it as its own visit or include it in a garden or total-maintenance plan.",
    benefits:
      "Fresh material holds moisture, keeps weeds down, and makes beds look finished from the street. Clean edges and a tidy install are often the fastest way to make a property look cared-for without a full planting overhaul.",
    sections: [
      {
        title: "Measure and prep",
        body: "Beds are measured, cleaned, and prepared so the new material sits on a tidy surface, not last year’s debris.",
      },
      {
        title: "Mulch or pine straw",
        body: "We install the material specified for the property—mulch or pine straw—at a depth that covers soil and holds moisture.",
      },
      {
        title: "Edges and cleanup",
        body: "Edges are redefined when needed, and surrounding lawn and hardscape are cleaned so the property looks finished.",
      },
    ],
    bullets: [
      "Beds measured, cleaned, and edged before material goes down.",
      "Mulch or pine straw installed to the spec for the property.",
      "Surrounding lawn and hardscape cleaned at the end of the visit.",
    ],
    tagline: "Beds refreshed, edges defined.",
    ctaHeadline: "Need mulch or pine straw installed?",
    ctaButton: "Request a free estimate",
    metaTitle: "Mulch and Pine Straw in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Mulch and pine straw installation in Florence, SC. We measure, edge, install, and clean up beds for homes and commercial properties.",
    galleryImage: siteImages.services.landscapeCover,
    galleryImageAlt: "Planting beds with mulch beside a striped lawn",
    icon: "garden",
    highlights: [SERVICE_HIGHLIGHTS.suppliers],
  },
  {
    slug: "pruning-and-cleanup",
    legacyId: "pruning",
    name: "Pruning and Cleanup",
    navLabel: "Pruning and Cleanup",
    inNav: false,
    family: "maintenance",
    workCategory: "landscape-design",
    eyebrow: "Trees and shrubs",
    headline: "Prune for health",
    headlineAccent: "and shape",
    intro:
      "Pruning and cleanup is selective work on trees and shrubs: cut for appearance, size, structure, and plant health, then haul the debris and leave the property clean.",
    body: "Pruning and cleanup in Florence, SC is selective work on trees and shrubs: we evaluate what the plant needs, prune for appearance, size, structure, and health, then haul the debris and leave the property clean.",
    benefits:
      "The right cuts keep plants in scale with the house, improve health, and open up sight lines without the one-shape shear that weakens shrubs. You get a cleaner landscape and plants that can keep growing well after we leave.",
    sections: [
      {
        title: "Evaluate first",
        body: "We look at what the plant needs—size, structure, dead wood, and how it sits in the landscape—before making cuts.",
      },
      {
        title: "Selective pruning",
        body: "Cuts are made for appearance, size, and plant health, not a one-shape-fits-all shear.",
      },
      {
        title: "Debris and cleanup",
        body: "Cut material is removed and the surrounding landscape is cleaned so the visit does not leave a pile behind.",
      },
    ],
    bullets: [
      "Trees and shrubs evaluated before we prune.",
      "Cuts for appearance, size, structure, and health.",
      "Debris hauled off and the property cleaned after.",
    ],
    tagline: "Shrubs and trees kept in shape.",
    ctaHeadline: "Need pruning on the property?",
    ctaButton: "Request a free estimate",
    metaTitle: "Pruning and Cleanup in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Pruning and cleanup in Florence, SC: selective tree and shrub pruning with debris removal for homes and commercial properties.",
    galleryImage: siteImages.aboutBackyard,
    galleryImageAlt: "Shrubs and trees kept in shape beside a backyard lawn",
    icon: "garden",
  },
];

export const constructionServices = services.filter((s) => s.family === "construction");
export const maintenanceServices = services.filter((s) => s.family === "maintenance");
export const navServices = constructionServices.filter((s) => s.inNav);

export function getServicesByFamily(family: ServiceFamily): ServiceDef[] {
  return services.filter((s) => s.family === family);
}

export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceByLegacyId(legacyId: string): ServiceDef | undefined {
  return services.find((s) => s.legacyId === legacyId);
}

export function getServiceByWorkCategory(category: string): ServiceDef | undefined {
  return services.find((s) => s.workCategory === category && s.inNav) ?? services.find((s) => s.workCategory === category);
}

export function isServiceSlug(slug: string): boolean {
  return services.some((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);

export function servicePath(slug: string): string {
  return `/services/${slug}`;
}
