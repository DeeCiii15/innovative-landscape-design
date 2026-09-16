import { audienceHubs } from "@/lib/audienceHubs";
import { siteConfig } from "@/lib/siteConfig";
import { BUSINESS_GEO, getSiteUrl, SERVICE_AREAS } from "@/lib/siteConstants";
import { services } from "@/lib/servicesData";

export function JsonLdLocalBusiness() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    name: siteConfig.name,
    url: getSiteUrl(),
    image: `${getSiteUrl()}${siteConfig.heroImage}`,
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
    areaServed: SERVICE_AREAS.map((city) => ({
      "@type": "City",
      name: city,
    })),
    openingHours: "Mo-Su 09:00-17:00",
    sameAs: siteConfig.social.map((profile) => profile.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landscaping services",
      itemListElement: [
        ...services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            url: `${getSiteUrl()}/services/${service.slug}`,
          },
        })),
        ...audienceHubs.map((hub) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: hub.name,
            url: `${getSiteUrl()}${hub.path}`,
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
