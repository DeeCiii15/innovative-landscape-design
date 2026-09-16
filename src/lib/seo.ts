import type { Metadata } from "next";
import { getShareOrigin, shareAssetUrl } from "./siteConstants";
import { siteImages } from "./siteImages";

export const defaultShareImage = {
  url: siteImages.ogShare,
  alt: "Striped front lawn and colorful planting beds in Florence, SC",
  width: 1200,
  height: 630,
} as const;

type ShareImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export function socialTags({
  title,
  description,
  path,
  image = defaultShareImage,
}: {
  title: string;
  description: string;
  path: string;
  image?: ShareImage;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const imageUrl = shareAssetUrl(image.url);
  const images = [
    {
      url: imageUrl,
      alt: image.alt,
      ...(image.width && image.height
        ? { width: image.width, height: image.height }
        : {}),
    },
  ];

  return {
    openGraph: {
      title,
      description,
      url: `${getShareOrigin()}${path === "/" ? "" : path}`,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
