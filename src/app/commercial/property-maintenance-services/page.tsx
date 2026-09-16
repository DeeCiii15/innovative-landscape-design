import type { Metadata } from "next";
import { AudienceHubPage } from "@/app/components/AudienceHubPage";
import { getAudienceHub } from "@/lib/audienceHubs";
import { socialTags } from "@/lib/seo";

const hub = getAudienceHub("commercial-maintenance")!;

export const metadata: Metadata = {
  title: { absolute: hub.metaTitle },
  description: hub.metaDescription,
  alternates: { canonical: hub.path },
  ...socialTags({
    title: hub.metaTitle,
    description: hub.metaDescription,
    path: hub.path,
    image: { url: hub.galleryImage, alt: hub.galleryImageAlt },
  }),
};

export default function CommercialPropertyMaintenanceServicesPage() {
  return <AudienceHubPage hubId={hub.id} />;
}
