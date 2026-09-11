export type PropertyType = "Residential" | "Commercial";

export type ProjectPhoto = {
  src: string;
  alt: string;
  file?: string;
  serviceSlugs?: readonly string[];
};
