#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = path.resolve(process.cwd(), "public/3d");
const CHROME_PATH =
  process.env.CHROME_PATH ||
  "/home/saad/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome";

fs.mkdirSync(OUT_DIR, { recursive: true });

async function compressWebpUnder60KB(pngBuffer, outPath, maxDim = 680) {
  let quality = 82;
  let webpBuffer = await sharp(pngBuffer)
    .resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
    .webp({ quality, alphaQuality: 85, effort: 6 })
    .toBuffer();

  while (webpBuffer.byteLength > 58 * 1024 && quality > 40) {
    quality -= 8;
    webpBuffer = await sharp(pngBuffer)
      .resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
      .webp({ quality, alphaQuality: 80, effort: 6 })
      .toBuffer();
  }

  fs.writeFileSync(outPath, webpBuffer);
  return webpBuffer.byteLength;
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    args: [
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    await page.route("**/3d/*.webp", (route) => route.abort());
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Hide floating WhatsApp pill during poster capture so it never overlaps corners
    await page.evaluate(() => {
      const wa = document.querySelector(".floating-whatsapp");
      if (wa instanceof HTMLElement) wa.style.display = "none";
      const header = document.querySelector(".site-header");
      if (header instanceof HTMLElement) header.style.display = "none";
    });

    const targets = [
      {
        name: "emblem",
        sectionSel: "[data-vision-scene]",
        sceneSel: '[data-scene="emblem"]',
        scrollFraction: 0.25,
        waitMs: 900,
      },
      {
        name: "box",
        sectionSel: "[data-approach-sequence]",
        sceneSel: '[data-scene="box"]',
        scrollFraction: 0.45,
        waitMs: 900,
      },
      {
        name: "seal",
        sectionSel: ".cta-band",
        sceneSel: '[data-scene="seal"]',
        scrollFraction: 0.0,
        waitMs: 1300,
      },
    ];

    for (const target of targets) {
      await page.evaluate(
        ({ sectionSel, scrollFraction }) => {
          const el = document.querySelector(sectionSel);
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const pinDist = Math.max(0, rect.height - window.innerHeight);
          const targetY =
            scrollFraction > 0
              ? top + pinDist * scrollFraction
              : Math.max(0, top - 140);
          window.scrollTo(0, targetY);
        },
        {
          sectionSel: target.sectionSel,
          scrollFraction: target.scrollFraction,
        }
      );

      await page.waitForFunction(
        (sel) =>
          document.querySelector(sel)?.getAttribute("data-3d-ready") === "true",
        target.sceneSel,
        { timeout: 15000 }
      );
      await page.waitForTimeout(target.waitMs);

      const clip = await page.evaluate((sel) => {
        const c = document.querySelector(`${sel} canvas`);
        if (!c) return null;
        const r = c.getBoundingClientRect();
        return {
          x: Math.max(0, Math.round(r.left)),
          y: Math.max(0, Math.round(r.top)),
          width: Math.round(r.width),
          height: Math.round(r.height),
        };
      }, target.sceneSel);

      const pngBuffer = await page.screenshot({
        type: "png",
        clip,
        omitBackground: true,
      });

      const outPath = path.join(OUT_DIR, `${target.name}.webp`);
      const bytes = await compressWebpUnder60KB(pngBuffer, outPath);
      console.log(
        `Generated ${outPath}: ${(bytes / 1024).toFixed(1)} KB (< 60 KB)`
      );
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
