/**
 * Site photography (heroes, about, CTA, service covers).
 * Drop extra marketing photos in `public/images/site/misc/`.
 * Job galleries live in `public/images/projects/{slug}/`, not here.
 */
export const SITE_IMAGES_PATH = "/images/site";
export const PROJECTS_IMAGES_PATH = "/images/projects";

export const siteImages = {
  heroAerial: `${SITE_IMAGES_PATH}/hero-aerial.jpg`,
  heroFrontYard: `${SITE_IMAGES_PATH}/hero-front-yard.jpg`,
  ctaAerial: `${SITE_IMAGES_PATH}/cta-aerial.jpg`,
  ogShare: `${SITE_IMAGES_PATH}/og-share.jpg`,
  aboutBackyard: `${SITE_IMAGES_PATH}/about-backyard.jpg`,
  aboutGardenBed: `${SITE_IMAGES_PATH}/about-garden-bed.jpg`,
  aboutBg: `${SITE_IMAGES_PATH}/about-bg.jpg`,
  aboutConsultation: `${SITE_IMAGES_PATH}/about-consultation.jpg`,
  gardenPath: `${SITE_IMAGES_PATH}/garden-path.jpg`,
  gardenEstate: `${SITE_IMAGES_PATH}/garden-estate.jpg`,
  bedAerial: `${SITE_IMAGES_PATH}/bed-aerial.jpg`,
  services: {
    landscapeCover: `${SITE_IMAGES_PATH}/services/landscape-cover.jpg`,
    hardscapesCover: `${SITE_IMAGES_PATH}/services/hardscapes-cover.jpg`,
    lightingCover: `${SITE_IMAGES_PATH}/services/lighting-cover.jpg`,
    waterFeaturesCover: `${SITE_IMAGES_PATH}/services/water-features-cover.jpg`,
    hardscapes: `${SITE_IMAGES_PATH}/services/hardscapes.jpg`,
    lighting: `${SITE_IMAGES_PATH}/services/lighting.jpg`,
    lightingNight: `${SITE_IMAGES_PATH}/services/lighting-night.jpg`,
    irrigation: `${SITE_IMAGES_PATH}/services/irrigation.jpg`,
    design: `${SITE_IMAGES_PATH}/services/design-legend.jpg`,
  },
  process: {
    prepare: `${SITE_IMAGES_PATH}/process/prepare.jpg`,
    install: `${SITE_IMAGES_PATH}/process/install.jpg`,
    maintain: `${SITE_IMAGES_PATH}/process/maintain.jpg`,
  },
} as const;

const MANOR = `${PROJECTS_IMAGES_PATH}/florence-sc-commercial-landscape-the-manor`;
const BYRNES = `${PROJECTS_IMAGES_PATH}/florence-sc-residential-landscape-byrnes-boulevard`;
const COIT = `${PROJECTS_IMAGES_PATH}/florence-sc-residential-landscape-maintenance-coit-street`;
const CHURCH = `${PROJECTS_IMAGES_PATH}/bennettsville-sc-commercial-landscape-bennettsville-first-presbyterian-church`;

/** Project-gallery photos reused as page heroes and related marketing images. */
export const projectImages = {
  manorAerial: `${MANOR}/DJI_0139.JPG`,
  manorCourtyard: `${MANOR}/2018-04-28 11.17.19.jpg`,
  manorPergola: `${MANOR}/2018-04-28 11.17.28.jpg`,
  manorGazebo: `${MANOR}/20200731_115952.jpg`,
  manorPuttingGarden: `${MANOR}/20200731_120008.jpg`,
  manorPatio: `${MANOR}/20200827_193300.jpg`,
  byrnesFountain: `${BYRNES}/03.jpg`,
  byrnesStream: `${BYRNES}/01.jpg`,
  byrnesPineStraw: `${BYRNES}/06.jpg`,
  byrnesBeds: `${BYRNES}/10.jpg`,
  coitPorch: `${COIT}/04.jpg`,
  coitColorWall: `${COIT}/08.jpg`,
  coitPlanter: `${COIT}/11.jpg`,
  coitIsland: `${COIT}/15.jpg`,
  coitAnnuals: `${COIT}/28.jpg`,
  coitLawn: `${COIT}/34.jpg`,
  churchWalks: `${CHURCH}/08.jpg`,
} as const;
