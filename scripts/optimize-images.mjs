#!/usr/bin/env node
/**
 * Compresses site and gallery photographs in place.
 * Skips logos and partner marks. Safe to re-run: already-small files are left alone.
 *
 *   npm run optimize-images
 *   node scripts/optimize-images.mjs path/to/photo.jpg
 *
 * `npm run dev` and `npm run build` run this automatically so new gallery
 * photos get the same treatment.
 */
import { readdir, rename, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_ROOT = path.join(ROOT, "public", "images");
const MAX_EDGE = 2400;
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;
const MIN_BYTES = 250_000;
const SKIP_DIRS = new Set(["trusted"]);
const SKIP_NAME = /^(logo|grass-mark)/i;
const PHOTO_EXT = new Set([".jpg", ".jpeg", ".webp"]);

function isPhoto(filePath) {
  return PHOTO_EXT.has(path.extname(filePath).toLowerCase());
}

function shouldSkip(filePath) {
  const rel = path.relative(IMAGES_ROOT, filePath);
  const parts = rel.split(path.sep);
  if (parts.some((part) => SKIP_DIRS.has(part))) return true;
  return SKIP_NAME.test(path.parse(filePath).name);
}

async function walk(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, acc);
    else if (entry.isFile()) acc.push(full);
  }
  return acc;
}

async function optimizeFile(filePath) {
  if (!isPhoto(filePath) || shouldSkip(filePath)) {
    return { skipped: true, filePath };
  }

  const before = await stat(filePath).catch(() => null);
  if (!before) return { skipped: true, filePath };
  if (before.size < MIN_BYTES) {
    return { skipped: true, filePath };
  }

  const image = sharp(filePath, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const needsResize = width > MAX_EDGE || height > MAX_EDGE;
  if (!needsResize && before.size < 380_000) {
    return { skipped: true, filePath };
  }

  const ext = path.extname(filePath).toLowerCase();
  const tmp = `${filePath}.opt.tmp${ext}`;
  let pipeline = image.resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: WEBP_QUALITY });
  } else {
    pipeline = pipeline.jpeg({
      quality: JPEG_QUALITY,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:2:0",
    });
  }

  await pipeline.toFile(tmp);
  const after = await stat(tmp);
  if (after.size >= before.size) {
    await unlink(tmp);
    return { skipped: true, filePath };
  }

  await rename(tmp, filePath);
  return { filePath, from: before.size, to: after.size };
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(0)}kb`;
}

const args = process.argv.slice(2).map((item) => path.resolve(item));
const files = args.length > 0 ? args : await walk(IMAGES_ROOT);

let saved = 0;
let changed = 0;
for (const file of files) {
  try {
    const result = await optimizeFile(file);
    if (result.skipped || result.from == null || result.to == null) continue;
    changed += 1;
    saved += result.from - result.to;
    console.log(`${kb(result.from)} → ${kb(result.to)}  ${path.relative(ROOT, result.filePath)}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Skipped ${path.relative(ROOT, file)}: ${message}`);
    await unlink(`${file}.opt.tmp${path.extname(file)}`).catch(() => {});
  }
}

if (args.length === 0) {
  console.log(changed === 0 ? "Images already optimized." : `Optimized ${changed} photos, saved ${kb(saved)}.`);
}
