import { MAIN_SERVICE_SLUG } from "./siteConstants";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePartner = {
  heading: string;
  body: string;
  linkLabel: string;
  linkHref: string;
};

export type ServiceDef = {
  slug: string;
  /** Legacy / short id used in older paths */
  legacyId: string;
  name: string;
  navLabel: string;
  workCategory: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  body: string;
  bullets: readonly string[];
  tagline: string;
  faqs: readonly ServiceFaq[];
  ctaHeadline: string;
  ctaButton: string;
  metaTitle: string;
  metaDescription: string;
  galleryImage: string;
  galleryImageAlt: string;
  icon: "design" | "irrigation" | "hardscapes" | "lighting";
  partner?: ServicePartner;
};

export const services: ServiceDef[] = [
  {
    slug: "landscape-design",
    legacyId: "design",
    name: "Landscape Design",
    navLabel: "Landscape Design",
    workCategory: "landscape-design",
    eyebrow: "Florence, SC",
    headline: "Beautiful landscapes,",
    headlineAccent: "designed for your home",
    intro:
      "Innovative Landscape Design can craft a landscape using interactive computer software that allows you to view your future lawn before it is ever touched.",
    body: "Bring your vision to life with a fully customized interactive design process and a 3D design mock-up of a tailored solution just for you. Incorporate any feature you can think of—then we build it with creative solutions and high-quality work. After install, we partner with Elite Turf Services in Florence so your new landscape can get ongoing, professional turf care at a preferred rate.",
    bullets: [
      "Fully customized interactive design process.",
      "3D design mock-up of a tailored solution just for you.",
      "Incorporate any feature you can think of.",
      "Partnered with Elite Turf Services for ongoing turf treatments.",
    ],
    tagline: "Bring your vision to life.",
    faqs: [
      {
        question: "Can I see my design before work begins?",
        answer:
          "Absolutely. For landscape design projects we use interactive software so you can preview your future yard before any work starts on your property.",
      },
      {
        question: "Do you offer free estimates?",
        answer:
          "Yes. We provide free on-site consultations and estimates for landscape design and related outdoor projects.",
      },
      {
        question: "How long does a typical redesign take?",
        answer:
          "Timelines vary by scope. Full redesigns and larger install projects typically run two to four weeks depending on weather and materials.",
      },
      {
        question: "Who takes care of the lawn after landscaping is installed?",
        answer:
          "We work hand-in-hand with Elite Turf Services in Florence, SC. Through our partnership, you can continue with professional turf treatments—fertilization, weed control, and more—at a discounted rate so your new landscape stays at its best.",
      },
    ],
    ctaHeadline: "Ready to design your dream landscape?",
    ctaButton: "Request a free estimate",
    metaTitle: "Landscape Design in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Custom landscape design in Florence, SC with interactive 3D mock-ups. See your future yard before we build—serving Florence and nearby communities.",
    galleryImage: "/images/services/design.jpg",
    galleryImageAlt: "Landscape design project in Florence, SC",
    icon: "design",
    partner: {
      heading: "Ongoing turf care with Elite Turf Services",
      body: "We work hand-in-hand with Elite Turf Services in Florence, South Carolina. Once your landscaping is installed, you can continue with ongoing professional turf treatments—fertilization, weed control, and pest management—at a preferred discounted rate through our partnership, so you get some of the highest-level lawn care available in the Florence area.",
      linkLabel: "Visit Elite Turf Services",
      linkHref: "https://eliteturfsc.com/",
    },
  },
  {
    slug: "irrigation",
    legacyId: "irrigation",
    name: "Irrigation",
    navLabel: "Irrigation",
    workCategory: "irrigation",
    eyebrow: "Smart watering",
    headline: "Keep every zone",
    headlineAccent: "green and healthy",
    intro:
      "Irrigation can take your lawn to the next level. Innovative Landscape Design installs the latest Orbit B-hyve smart irrigation controllers, so you can manage watering from your phone.",
    body: "We use Orbit B-hyve smart sprinkler systems as part of our irrigation installs. WeatherSense technology uses local weather data to automatically adjust schedules—skipping cycles when rain or freeze is in the forecast and watering only when your landscape needs it.",
    bullets: [
      "Orbit B-hyve smart sprinkler controllers.",
      "Weather-based schedules that adjust automatically.",
      "Control and monitor every zone from your phone.",
    ],
    tagline: "Keep every zone green and healthy.",
    faqs: [
      {
        question: "What irrigation system do you use?",
        answer:
          "We install Orbit B-hyve smart irrigation controllers with WeatherSense technology, so watering adjusts to local weather and you can manage every zone from your phone.",
      },
      {
        question: "Do you offer free estimates for irrigation?",
        answer:
          "Yes. We provide free consultations and estimates for new irrigation installs and smart-controller upgrades.",
      },
    ],
    ctaHeadline: "Want smarter watering for your yard?",
    ctaButton: "Request a free estimate",
    metaTitle: "Irrigation Systems in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Orbit B-hyve smart irrigation installation in Florence, SC. Weather-based watering and phone control for healthier lawns and landscapes.",
    galleryImage: "/images/services/irrigation.jpg",
    galleryImageAlt: "Irrigation system installation in Florence, SC",
    icon: "irrigation",
    partner: {
      heading: "Powered by Orbit B-hyve",
      body: "Our irrigation installs use Orbit B-hyve smart controllers—the system we trust for weather-smart watering, app control, and reliable zone management. Learn more about how B-hyve helps keep lawns healthy while using water wisely.",
      linkLabel: "Learn about Orbit B-hyve",
      linkHref: "https://www.orbitonline.com/pages/what-is-b-hyve",
    },
  },
  {
    slug: "hardscapes",
    legacyId: "hardscapes",
    name: "Hardscapes",
    navLabel: "Hardscapes",
    workCategory: "hardscapes",
    eyebrow: "Outdoor living",
    headline: "Patios, walks, and walls",
    headlineAccent: "built to last",
    intro:
      "Looking for that beautiful hardscape for your lawn? Hardscapes can provide the look you desire—patios, walks, walls, and outdoor living spaces.",
    body: "Our team designs and builds hardscape features that take the look of your home to the next level, with quality materials and workmanship suited to Florence-area properties.",
    bullets: [
      "Get that look you love.",
      "Take the look of your home to the next level.",
      "Our experts are standing by to help you today.",
    ],
    tagline: "Complete hardscape solutions for your home.",
    faqs: [
      {
        question: "What hardscape projects do you build?",
        answer:
          "We build paver patios, walkways, seating walls, and outdoor living spaces tailored to your home and how you use your yard.",
      },
      {
        question: "Do you offer free estimates?",
        answer: "Yes. Contact us for a free on-site consultation and estimate for hardscape projects.",
      },
    ],
    ctaHeadline: "Ready for a patio or outdoor living space?",
    ctaButton: "Request a free estimate",
    metaTitle: "Hardscapes in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Hardscape patios, walks, and outdoor living spaces in Florence, SC. Quality design and install from Innovative Landscape Design.",
    galleryImage: "/images/services/hardscapes.jpg",
    galleryImageAlt: "Hardscape patio project in Florence, SC",
    icon: "hardscapes",
  },
  {
    slug: "outdoor-lighting",
    legacyId: "lighting",
    name: "Outdoor Lighting",
    navLabel: "Lighting",
    workCategory: "outdoor-lighting",
    eyebrow: "Cast Lighting certified",
    headline: "Illuminate walkways",
    headlineAccent: "and curb appeal",
    intro:
      "Lighting provides ideal illumination for walkways and entrance ways so residents and visitors can safely navigate around the property.",
    body: "As a certified Cast Lighting installer, we design and install professional outdoor lighting that improves safety and takes the look of your home to the next level after dark.",
    bullets: [
      "Properly illuminate your property.",
      "Take the look of your home to the next level.",
      "We are a certified Cast Lighting installer.",
    ],
    tagline: "Complete lighting solutions for your home.",
    faqs: [
      {
        question: "Are you a certified lighting installer?",
        answer:
          "Yes. We are a certified Cast Lighting installer, trained to design and install professional outdoor lighting systems.",
      },
      {
        question: "Do you offer free estimates for lighting?",
        answer: "Yes. We provide free consultations and estimates for outdoor lighting projects.",
      },
    ],
    ctaHeadline: "Want your landscape to shine after dark?",
    ctaButton: "Request a free estimate",
    metaTitle: "Outdoor Lighting in Florence, SC | Innovative Landscape Design",
    metaDescription:
      "Certified Cast Lighting outdoor lighting in Florence, SC. Safer walkways and beautiful curb appeal after dark.",
    galleryImage: "/images/services/lighting.jpg",
    galleryImageAlt: "Outdoor lighting installation in Florence, SC",
    icon: "lighting",
  },
];

export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceByLegacyId(legacyId: string): ServiceDef | undefined {
  return services.find((s) => s.legacyId === legacyId);
}

export function getServiceByWorkCategory(category: string): ServiceDef | undefined {
  return services.find((s) => s.workCategory === category);
}

export function isServiceSlug(slug: string): boolean {
  return services.some((s) => s.slug === slug);
}

export function getMainService(): ServiceDef {
  return getServiceBySlug(MAIN_SERVICE_SLUG)!;
}

export const serviceSlugs = services.map((s) => s.slug);
