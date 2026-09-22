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
} from "./siteConstants";

export {
  SITE_NAME,
  CANONICAL_SITE_URL,
  getSiteUrl,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SERVICE_AREAS,
  WORK_PATH,
};

export const siteConfig = {
  name: SITE_NAME,
  shortName: "ILD",
  tagline: "Beautiful, functional landscapes in Florence, SC",
  description:
    "Florence, SC landscape company for hardscapes, lighting, water features, irrigation, planting, and lawn care. Serving the Florence area for more than 20 years.",
  url: CANONICAL_SITE_URL,
  logo: "/images/logo-lockup.png",
  heroImage: siteImages.coitSunroomLawn,
  heroImageAlt: "A striped backyard lawn and planting beds in front of a white sunroom",
  phone: "(843) 230-1036",
  email: "service@ildsc.com",
  address: "2027 Rosedale St, Florence, SC 29501",
  social: [
    { name: "Instagram", href: "https://www.instagram.com/ild_innovativelandscapedesign/" },
    { name: "Facebook", href: "https://www.facebook.com/InnovativeLandscapeDesignLLC/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/innovative-landscape-design" },
  ],
  location: "Florence, SC",
  yearsServing: "more than 20",
  openingHours: "Mon–Sun, 9:00 AM – 5:00 PM",
  heroHeadline: "Landscapes built for Florence",
  heroSubheadline:
    "We design, install, and maintain landscapes in Florence—planting, hardscapes, lighting, water features, and irrigation.",
  featuredBeforeAfterId: "yard-redesign",
  aboutWelcome: "Florence's premier landscape design company",
  aboutLead: "Who we are",
  aboutIntro:
    "For more than 20 years, we've helped homeowners and businesses throughout the Florence area plan, build, and care for outdoor spaces—from the first design through planting, hardscapes, lighting, and water features.",
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
    "Innovative Landscape Design is a Florence, SC company that designs, installs, and maintains landscapes—planting, irrigation, hardscapes, outdoor lighting, and water features. We have served the Florence area for more than 20 years.",
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
      id: "review-bill-flynn",
      name: "Bill Flynn",
      source: "Google",
      rating: 5,
      text: "They removed my old grass in my yard, graded, and installed new sod. Awesome job. Thank you, Scott!!",
      service: "Turf renovation",
    },
    {
      id: "review-joe-young",
      name: "Joe Young",
      source: "Google",
      rating: 5,
      text: "ILD came and repaired lawn watering system. Great job, reasonable pricing, very prompt, nice person, will hire again.",
      service: "Irrigation",
    },
    {
      id: "review-danielle-nelson",
      name: "Danielle Nelson",
      source: "Google",
      rating: 5,
      text: "Awesome customer service and great landscaping, recommended.",
      service: "Landscaping",
    },
    {
      id: "review-joshua-adrian",
      name: "Joshua Adrian",
      source: "Google",
      rating: 5,
      text: "Man, these folks were helpful and knowledgeable. So glad we found them, as we had tried to find unique rocks elsewhere to no avail. Great folks!",
      service: "Hardscapes",
    },
    {
      id: "review-aaron-clark",
      name: "Aaron Clark",
      source: "Facebook",
      rating: 5,
      text: "I hired them to clear some brush in my yard. Scott and his crew were very professional and provided excellent and timely service.",
      service: "Cleanup",
    },
    {
      id: "review-susan-mcmurray-evans",
      name: "Susan McMurray-Evans",
      source: "Facebook",
      rating: 5,
      text: "Very professional, top-notch work. When you see a beautiful property in Florence, whether it's commercial or someone's home, if the lawn and gardens are gorgeous, chances are they are done by ILD. Call Scott!",
      service: "Landscape",
    },
    {
      id: "review-leslie-carpenter",
      name: "Leslie Carpenter",
      source: "Facebook",
      rating: 5,
      text: "Scott and his team put together the most spectacular garden and landscape designs. They also handle both commercial and residential property. If you need to start from scratch or just someone to maintain what you already have, they can take care of it!",
      service: "Landscape design",
    },
    {
      id: "review-jason-young",
      name: "Jason Young",
      source: "Facebook",
      rating: 5,
      text: "Such a great company to deal with, very knowledgeable! Scott is the man!",
      service: "Landscape",
    },
    {
      id: "review-chad-weisbeck",
      name: "Chad Weisbeck",
      source: "Facebook",
      rating: 5,
      text: "ILD has been taking care of my home and business landscape needs for years. I trust them to keep our home and facilities kept up, and I'm never disappointed. Thanks.",
      service: "Maintenance",
    },
  ],
  ctaHeadline: "Ready to have your dream landscape?",
  ctaSubheadline: "We can help!",
  featuredWorkSlug: "yard-redesign",
} as const;
