import { audienceHubs } from "@/lib/audienceHubs";
import { siteConfig } from "@/lib/siteConfig";
import {
  BUSINESS_GEO,
  FOUNDING_YEAR,
  GOOGLE_MAPS_URL,
  getSiteUrl,
  SERVICE_AREAS,
} from "@/lib/siteConstants";
import { services } from "@/lib/servicesData";

export function JsonLdLocalBusiness() {
  const base = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": `${base}/#localbusiness`,
    name: siteConfig.name,
    url: base,
    logo: `${base}${siteConfig.logo}`,
    image: `${base}${siteConfig.heroImage}`,
    foundingDate: String(FOUNDING_YEAR),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2027 Rosedale St",
      addressLocality: "Florence",
      addressRegion: "SC",
      postalCode: "29501",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    hasMap: GOOGLE_MAPS_URL,
    areaServed: SERVICE_AREAS.map((city) => ({
      "@type": "City",
      name: city,
    })),
    openingHours: "Mo-Su 09:00-17:00",
    sameAs: [GOOGLE_MAPS_URL, ...siteConfig.social.map((profile) => profile.href)],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landscaping services",
      itemListElement: [
        ...services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            url: `${base}/services/${service.slug}`,
          },
        })),
        ...audienceHubs.map((hub) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: hub.name,
            url: `${base}${hub.path}`,
          },
        })),
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
