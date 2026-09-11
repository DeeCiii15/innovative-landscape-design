import { services } from "./servicesData";
import { siteImages } from "./siteImages";
import {
  SITE_NAME,
  CANONICAL_SITE_URL,
  getSiteUrl,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SERVICE_AREAS,
  WORK_PATH,
  FLORENCE_LANDSCAPE_PATH,
} from "./siteConstants";

export {
  SITE_NAME,
  CANONICAL_SITE_URL,
  getSiteUrl,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SERVICE_AREAS,
  WORK_PATH,
  FLORENCE_LANDSCAPE_PATH,
};

export const siteConfig = {
  name: SITE_NAME,
  shortName: "ILD",
  tagline: "Beautiful, functional landscapes in Florence, SC",
  description:
    "Florence, SC landscape company for landscape design, installation, and maintenance—plus landscaping, hardscapes, outdoor lighting, water features, and irrigation. Serving the Florence area for almost 20 years.",
  url: CANONICAL_SITE_URL,
  logo: "/images/logo-ild-icon.png",
  heroImage: siteImages.heroFrontYard,
  heroImageAlt: "Aerial view of a striped front lawn framed by colorful planting beds and a brick home",
  phone: "(843) 230-1036",
  email: "Scott@ildsc.com",
  address: "2027 Rosedale St, Florence, SC 29501",
  social: [
    { name: "Instagram", href: "https://www.instagram.com/ild_innovativelandscapedesign/" },
    { name: "Facebook", href: "https://www.facebook.com/InnovativeLandscapeDesignLLC/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/innovative-landscape-design" },
  ],
  location: "Florence, SC",
  yearsServing: "almost 20",
  openingHours: "Mon–Sun, 9:00 AM – 5:00 PM",
  heroHeadline: "Landscapes built for Florence",
  heroSubheadline:
    "We design, install, and maintain landscapes in Florence—planting, hardscapes, lighting, water features, and irrigation.",
  featuredBeforeAfterId: "yard-redesign",
  aboutWelcome: "Florence's premier landscape design company",
  aboutLead: "Who we are",
  aboutIntro:
    "For nearly 20 years, we've helped homeowners and businesses throughout the Florence area plan, build, and care for outdoor spaces—from the first design through planting, hardscapes, lighting, and water features.",
  aboutBody:
    "We design and build beautiful, functional landscapes with creative solutions and high-quality work. A professional, personal approach grounded in integrity and reliability is how we earn the privilege to be the landscape company you trust—and we aim for results that exceed expectations every time.",
  aboutValues:
    "Passion drives us to go further for every customer. Reliability means we do what we say when we say we'll do it. Integrity keeps honesty and respect at the center of every job. We invest in people, equipment, and process so the finished landscape lasts—and we keep looking for better ways to serve our customers, staff, vendors, and community.",
  trustHeading: "Want to know what makes us the best?",
  trustBody:
    "We pride ourselves in being among the best in the Florence area. Learn more about our mission, values, and the team behind every project.",
  mission:
    "Innovative Landscape Design company designs and builds beautiful, functional landscapes using creative solutions and high quality services. Our professional and personal approach to serve our customers with integrity and reliability earns us the privilege to be the landscape company you trust.",
  vision: "Beautiful and functional landscapes that exceed your expectations.",
  coreValues: [
    {
      title: "Passion",
      body: "We put our emotions into exceeding our customer's expectation.",
    },
    {
      title: "Reliability",
      body: "We do what we say we are going to do when we say we are going to do it.",
    },
    {
      title: "Integrity",
      body: "We do everything with honesty, respect and professionalism.",
    },
    {
      title: "Vision",
      body: "We invest in the people, equipment, process and resources to deliver beautiful and functional landscapes.",
    },
    {
      title: "Innovative",
      body: "We are always looking for better ways to improve our commitments to our customers, staff, vendors and community.",
    },
  ],
  servicesIntro:
    "Innovative Landscape Design is a Florence, SC company that designs, installs, and maintains landscapes—planting, irrigation, hardscapes, outdoor lighting, and water features. We have served the Florence area for almost 20 years.",
  /** Compatibility shape for existing UI — prefer `services` from servicesData for new pages */
  services: services.map((s) => ({
    id: s.slug,
    legacyId: s.legacyId,
    title: s.name,
    tagline: s.tagline,
    summary: s.intro,
    bullets: s.bullets,
    icon: s.icon,
    galleryImage: s.galleryImage,
    galleryImageAlt: s.galleryImageAlt,
  })),
  teamPhoto: {
    src: siteImages.aboutConsultation,
    alt: "Landscape designer discussing yard plans with homeowners in their backyard",
  },
  aboutBg: siteImages.aboutBg,
  serviceAreas: [...SERVICE_AREAS],
  reviews: [
    {
      id: "review-1",
      name: "Sarah M.",
      location: "Florence, SC",
      rating: 5,
      text: "They transformed our front yard completely. The design process was easy to follow and the crew was professional from start to finish.",
      service: "Landscape Design",
      serviceSlug: "landscape-enhancements",
    },
    {
      id: "review-2",
      name: "James T.",
      location: "Quinby, SC",
      rating: 5,
      text: "Our irrigation system works flawlessly. No more dry spots in the lawn — everything looks green and even across the whole yard.",
      service: "Irrigation",
      serviceSlug: "irrigation",
    },
    {
      id: "review-3",
      name: "Patricia L.",
      location: "Effingham, SC",
      rating: 5,
      text: "The paver patio and sitting wall turned our backyard into somewhere we actually use. Quality work and great communication.",
      service: "Hardscapes",
      serviceSlug: "hardscapes",
    },
    {
      id: "review-4",
      name: "Robert K.",
      location: "Florence, SC",
      rating: 5,
      text: "The outdoor lighting made a huge difference. Walkways are safe at night and the house looks stunning after dark.",
      service: "Lighting",
      serviceSlug: "outdoor-lighting",
    },
  ],
  ctaHeadline: "Ready to have your dream landscape?",
  ctaSubheadline: "We can help!",
  featuredWorkSlug: "yard-redesign",
} as const;
