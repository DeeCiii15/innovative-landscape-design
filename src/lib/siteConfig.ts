import { services } from "./servicesData";
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
import { workItems } from "./workData";

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
    "Florence, SC landscape company specializing in landscape design, irrigation, hardscapes, and outdoor lighting. Serving the Florence area for almost 20 years.",
  url: CANONICAL_SITE_URL,
  logo: "/images/grass-mark.png",
  heroImage: "/images/hero-aerial.jpg",
  heroImageAlt: "Aerial drone view of a landscaped residential yard",
  phone: "(843) 230-1036",
  email: "Scott@ildsc.com",
  address: "2027 Rosedale St, Florence, SC 29501",
  location: "Florence, SC",
  yearsServing: "almost 20",
  openingHours: "Mon–Sun, 9:00 AM – 5:00 PM",
  heroHeadline: "Beautiful landscapes, built for Florence",
  heroSubheadline:
    "Landscape design, irrigation, hardscapes, and outdoor lighting for homeowners across the Florence area.",
  featuredBeforeAfterId: "yard-redesign",
  aboutIntro:
    "Our team helps homeowners throughout the Florence area plan, build, and enhance outdoor spaces through landscape design, irrigation, hardscapes, and lighting—you bring the vision and we bring the execution.",
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
    "Innovative Landscape Design is a Florence, SC company focused on landscape design, irrigation, hardscapes, and outdoor lighting. We have served the Florence area for almost 20 years.",
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
    src: "/images/about-consultation.jpg",
    alt: "Landscape designer discussing yard plans with homeowners in their backyard",
  },
  aboutBg: "/images/about-bg.jpg",
  serviceAreas: [...SERVICE_AREAS],
  reviews: [
    {
      id: "review-1",
      name: "Sarah M.",
      location: "Florence, SC",
      rating: 5,
      text: "They transformed our front yard completely. The design process was easy to follow and the crew was professional from start to finish.",
      service: "Landscape Design",
      serviceSlug: "landscape-design",
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
  faqs: [
    {
      question: "What areas do you serve?",
      answer:
        "We serve Florence and surrounding communities including Quinby, Effingham, Timmonsville, Darlington, and Lake City. Contact us to confirm availability for your address.",
    },
    {
      question: "Do you offer free estimates?",
      answer:
        "Yes. We provide free on-site consultations and estimates for landscape design, irrigation, hardscapes, and outdoor lighting projects.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Timelines vary by scope. Focused upgrades like lighting or irrigation may take a few days to a week. Full redesigns and hardscape projects typically run two to four weeks depending on weather and materials.",
    },
    {
      question: "Can I see my design before work begins?",
      answer:
        "Absolutely. For landscape design projects we use interactive software so you can preview your future yard before any work starts on your property.",
    },
    {
      question: "Are you a certified lighting installer?",
      answer:
        "Yes. We are a certified Cast Lighting installer, trained to design and install professional outdoor lighting systems.",
    },
    {
      question: "What irrigation system do you use?",
      answer:
        "We install the latest Orbit B-hyve smart irrigation controllers with WeatherSense technology, so each zone of your yard gets the right amount of water.",
    },
  ],
  ctaHeadline: "Want to have your dream landscape?",
  ctaSubheadline: "We can help!",
  /** Featured work for home/OG */
  featuredWork: workItems.find((w) => w.slug === "yard-redesign") ?? workItems[0],
} as const;
