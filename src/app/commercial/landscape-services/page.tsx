import type { Metadata } from "next";
import { AudienceHubPage } from "@/app/components/AudienceHubPage";
import { getAudienceHub } from "@/lib/audienceHubs";
import { getSiteUrl } from "@/lib/siteConstants";

const hub = getAudienceHub("commercial-construction")!;

export const metadata: Metadata = {
  title: { absolute: hub.metaTitle },
  description: hub.metaDescription,
  alternates: { canonical: hub.path },
  openGraph: {
    title: hub.metaTitle,
    description: hub.metaDescription,
    url: `${getSiteUrl()}${hub.path}`,
    images: [{ url: hub.galleryImage, alt: hub.galleryImageAlt }],
  },
};

export default function CommercialLandscapeServicesPage() {
  return <AudienceHubPage hubId={hub.id} />;
}
