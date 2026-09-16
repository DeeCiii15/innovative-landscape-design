import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import sharp from "sharp";

/** Tiny LQIP so the hero never flashes the dark green empty background. */
export const getHeroBlur = cache(async (src: string): Promise<string | undefined> => {
  if (!src.startsWith("/") || src.includes("..") || src.includes("\\")) return undefined;

  try {
    const file = path.join(process.cwd(), "public", src.slice(1));
    const buf = await sharp(await readFile(file))
      .rotate()
      .resize(24, 16, { fit: "cover" })
      .jpeg({ quality: 40 })
      .toBuffer();
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return undefined;
  }
});
