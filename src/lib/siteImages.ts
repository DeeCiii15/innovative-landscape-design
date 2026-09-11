/**
 * Site photography (heroes, about, CTA, service covers).
 * Drop extra marketing photos in `public/images/site/misc/`.
 * Job galleries live in `public/images/projects/{slug}/`, not here.
 */
export const SITE_IMAGES_PATH = "/images/site";

export const siteImages = {
  heroAerial: `${SITE_IMAGES_PATH}/hero-aerial.jpg`,
  heroFrontYard: `${SITE_IMAGES_PATH}/hero-front-yard.jpg`,
  ctaAerial: `${SITE_IMAGES_PATH}/cta-aerial.jpg`,
  aboutBackyard: `${SITE_IMAGES_PATH}/about-backyard.jpg`,
  aboutGardenBed: `${SITE_IMAGES_PATH}/about-garden-bed.jpg`,
  aboutBg: `${SITE_IMAGES_PATH}/about-bg.jpg`,
  aboutConsultation: `${SITE_IMAGES_PATH}/about-consultation.jpg`,
  services: {
    landscapeCover: `${SITE_IMAGES_PATH}/services/landscape-cover.jpg`,
    hardscapesCover: `${SITE_IMAGES_PATH}/services/hardscapes-cover.jpg`,
    lightingCover: `${SITE_IMAGES_PATH}/services/lighting-cover.jpg`,
    waterFeaturesCover: `${SITE_IMAGES_PATH}/services/water-features-cover.jpg`,
    hardscapes: `${SITE_IMAGES_PATH}/services/hardscapes.jpg`,
    lighting: `${SITE_IMAGES_PATH}/services/lighting.jpg`,
    irrigation: `${SITE_IMAGES_PATH}/services/irrigation.jpg`,
    design: `${SITE_IMAGES_PATH}/services/design.jpg`,
  },
} as const;
