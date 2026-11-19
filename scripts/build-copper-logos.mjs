// Builds web copies of the client's final copper logos (assets/logo/final/PNG, black background).
// The artwork is not altered: each file is trimmed to its content, and the black background is
// turned into transparency by "un-multiplying" it (alpha = brightest channel, colour divided by
// alpha). Over black this reproduces the original pixels exactly; elsewhere it sits cleanly.
// Run: node scripts/build-copper-logos.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "assets/logo/final/PNG";
const OUT = "public/brand";

const JOBS = [
  // Header wordmark: shown ~134px wide, exported at 4x for sharp retina rendering.
  { src: "naqsh-wordmark_copper-shiny-2d.png", out: "copper-wordmark.webp", width: 640 },
  // Footer emblem: copper 3D finish (client choice 2026-11-19). Shown up to ~250px tall, exported at ~2.4x.
  { src: "logo1_copper-shiny-3d.png", out: "copper-emblem-3d.webp", height: 600 },
];

await mkdir(OUT, { recursive: true });

for (const job of JOBS) {
  const trimmed = await sharp(`${SRC}/${job.src}`).trim({ background: "#000000", threshold: 8 }).toBuffer();
  const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = Math.max(r, g, b);
    if (a === 0) {
      data[i + 3] = 0;
      continue;
    }
    data[i] = Math.round((r * 255) / a);
    data[i + 1] = Math.round((g * 255) / a);
    data[i + 2] = Math.round((b * 255) / a);
    data[i + 3] = a;
  }

  const resized = sharp(data, { raw: info }).resize({ width: job.width, height: job.height, fit: "inside" });
  const res = await resized.webp({ quality: 92, alphaQuality: 100, effort: 6 }).toFile(`${OUT}/${job.out}`);
  console.log(`${job.out}: ${res.width}x${res.height}, ${(res.size / 1024).toFixed(1)} KB`);
}
