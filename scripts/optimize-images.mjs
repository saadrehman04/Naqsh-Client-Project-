#!/usr/bin/env node
/**
 * Generates optimized WebP masters in public/images from the untouched originals in assets/images.
 * next/image then serves AVIF/WebP at the rendered size. Run: `npm run images`.
 * Originals are only read, never modified.
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const srcDir = path.join(root, "assets/images/products");
const outDir = path.join(root, "public/images");

/**
 * Two originals are swapped by filename (see docs/IMAGE-MAP.md). Map output slug -> source file by content.
 */
const SOURCE_OVERRIDES = {
  "wellness-kit": "independence-day-gift.png",
  "independence-day-gift": "wellness-kit.png",
};

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function writeWebp(pipeline, file, quality) {
  await pipeline.webp({ quality, effort: 6, smartSubsample: true }).toFile(file);
  const { size } = await stat(file);
  return size;
}

async function products() {
  await mkdir(path.join(outDir, "products"), { recursive: true });
  const files = (await readdir(srcDir)).filter((f) => f.endsWith(".png"));
  const slugs = files.map((f) => f.replace(/\.png$/, ""));
  for (const slug of slugs) {
    const source = SOURCE_OVERRIDES[slug] ?? `${slug}.png`;
    const out = path.join(outDir, "products", `${slug}.webp`);
    const size = await writeWebp(
      sharp(path.join(srcDir, source)).resize({ width: 1600, withoutEnlargement: true }),
      out,
      78,
    );
    console.log(`products/${slug}.webp  <- ${source}  ${kb(size)}`);
  }
}

async function hero() {
  await mkdir(path.join(outDir, "hero"), { recursive: true });
  // 2026-11-20: client's 2K hero (2752 x 1536 JPEG). Larger than the 2400w export, so it is only
  // scaled down (Lanczos3), no upscaling or sharpening; saved at q90 and served at quality 90.
  const src = path.join(root, "assets/images/site/hero-gift-box-2k.jpg");
  const desktop = await writeWebp(
    sharp(src).resize({ width: 2400, kernel: "lanczos3" }),
    path.join(outDir, "hero/hero-2k-desktop.webp"),
    90,
  );
  console.log(`hero/hero-2k-desktop.webp  2400w  ${kb(desktop)}`);

  // 4:5 portrait crop for phones and tablets, centred on the wax seal (x ~ 2085 of 2752) and kept
  // at native resolution (served directly, not re-encoded by next/image).
  const { width, height } = await sharp(src).metadata();
  const w = Math.round((height * 4) / 5);
  const left = Math.min(width - w, Math.max(0, Math.round(width * 0.758) - Math.round(w / 2)));
  const mobile = await writeWebp(
    sharp(src).extract({ left, top: 0, width: w, height }),
    path.join(outDir, "hero/hero-2k-mobile.webp"),
    88,
  );
  console.log(`hero/hero-2k-mobile.webp  ${w}w (crop from x=${left})  ${kb(mobile)}`);
}

/** Client-supplied section photos (assets/images/site). Optional crop: [left, top, width, height]. */
const SITE_IMAGES = [
  { src: "about-wax-seal.webp", out: "about-wax-seal" },
  { src: "why-heritage-box.webp", out: "why-heritage-box" },
  // Bottom 204 px of the original is an empty black band. Shown full-bleed and unblurred
  // (client request 2026-11-20), so it gets the same HD export as the home hero.
  { src: "services-cover.webp", out: "services-cover-hq", crop: [0, 0, 1500, 996], hq: true },
  { src: "portfolio-cover.png", out: "portfolio-cover" },
  // 2026-11-20: client's 2K contact photo (2752 x 1536 JPEG). Cropped from the top (same share as the
  // earlier version) to trim empty dark space above the stamp; scaled down to 2400w, no sharpening.
  { src: "contact-cover-2k.jpg", out: "contact-cover-2k", crop: [0, 360, 2752, 1176], hq: true, noSharpen: true },
  { src: "gifting-consultation.webp", out: "gifting-consultation" },
  { src: "contact-gift-box.webp", out: "contact-gift-box" },
];

async function site() {
  await mkdir(path.join(outDir, "site"), { recursive: true });
  for (const item of SITE_IMAGES) {
    let pipeline = sharp(path.join(root, "assets/images/site", item.src));
    if (item.crop) {
      const [left, top, width, height] = item.crop;
      pipeline = pipeline.extract({ left, top, width, height });
    }
    const out = path.join(outDir, "site", `${item.out}.webp`);
    // hq: full-bleed banners. One Lanczos3 upscale to 2400w with light sharpening, saved at q90.
    const size = item.hq
      ? await writeWebp(
          item.noSharpen
            ? pipeline.resize({ width: 2400, kernel: "lanczos3" }) // source larger than 2400w: downscale only
            : pipeline.resize({ width: 2400, kernel: "lanczos3" }).sharpen({ sigma: 0.9, m1: 0.6, m2: 1.4 }),
          out,
          90,
        )
      : await writeWebp(pipeline.resize({ width: 1600, withoutEnlargement: true }), out, 80);
    console.log(`site/${item.out}.webp  <- ${item.src}  ${kb(size)}`);
  }
}

// ONLY=hero (or products / site) regenerates one group; default runs all.
const only = process.env.ONLY;
if (!only || only === "products") await products();
if (!only || only === "hero") await hero();
if (!only || only === "site") await site();
console.log("Done. Originals untouched.");
