// Builds web copies of the client's final copper logos (assets/logo/final/PNG, black background).
// The artwork is not altered: each file is trimmed to its content, and the black background is
// turned into transparency by "un-multiplying" it (alpha = brightest channel, colour divided by
// alpha). Over black this reproduces the original pixels exactly; elsewhere it sits cleanly.
// A job with `pdf` renders the client's vector PDF first (poppler's pdftocairo), for the sharpest
// possible raster; others read the PNG exports.
// Run: node scripts/build-copper-logos.mjs
import sharp from "sharp";
import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";

const SRC = "assets/logo/final/PNG";
const PDF = "assets/logo/final/PDF";
const OUT = "public/brand";

/** Renders one PDF page to PNG at `dpi` and returns the bytes. */
async function renderPdf(file, dpi) {
  const dir = await mkdtemp(path.join(tmpdir(), "naqsh-logo-"));
  try {
    const base = path.join(dir, "page");
    execFileSync("pdftocairo", ["-png", "-r", String(dpi), "-singlefile", file, base]);
    // Drop a 2px edge: the page size is not a whole number of pixels, so the last row/column
    // renders as a half-covered grey line that would stop the black trim.
    const png = await readFile(`${base}.png`);
    const { width, height } = await sharp(png).metadata();
    return await sharp(png).extract({ left: 2, top: 2, width: width - 4, height: height - 4 }).png().toBuffer();
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

const JOBS = [
  // Header wordmark: shown ~134px wide, exported at 4x for sharp retina rendering.
  { src: "naqsh-wordmark_copper-shiny-2d.png", out: "copper-wordmark.webp", width: 640 },
  // Footer (and phone menu) emblem: the client's FINAL copper 3D emblem (updated files of 2026-11-19,
  // confirmed 2026-11-20), rendered from the vector PDF. Shown up to ~250px tall, exported at ~2.4x.
  { pdf: "logo1_copper-shiny-3d.pdf", dpi: 60, out: "copper-emblem-final.webp", height: 600 },
];

await mkdir(OUT, { recursive: true });

for (const job of JOBS) {
  const input = job.pdf ? await renderPdf(`${PDF}/${job.pdf}`, job.dpi) : `${SRC}/${job.src}`;
  const trimmed = await sharp(input).trim({ background: "#000000", threshold: 8 }).toBuffer();
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
