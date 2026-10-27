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
  const src = path.join(srcDir, "new-hire-welcome-kit.png");
  // Trim the top 33% (printed lid copy that would sit behind the headline): 1800 x 905 (~2:1).
  const trimTop = Math.round(1350 * 0.33);
  const trimmed = await sharp(src)
    .extract({ left: 0, top: trimTop, width: 1800, height: 1350 - trimTop })
    .toBuffer();

  const desktop = await writeWebp(sharp(trimmed), path.join(outDir, "hero/hero-desktop.webp"), 80);
  console.log(`hero/hero-desktop.webp  ${kb(desktop)}`);

  // 4:5 portrait crop centered on the tray for mobile.
  const h = 1350 - trimTop;
  const w = Math.round((h * 4) / 5);
  const left = 420;
  const mobile = await writeWebp(
    sharp(trimmed).extract({ left, top: 0, width: w, height: h }),
    path.join(outDir, "hero/hero-mobile.webp"),
    80,
  );
  console.log(`hero/hero-mobile.webp  ${w}x${h}  ${kb(mobile)}`);
}

await products();
await hero();
console.log("Done. Originals untouched.");
