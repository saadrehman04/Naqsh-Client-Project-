// Builds the link-preview (Open Graph) image: public/og/naqsh-share.png, 1200 x 630.
// Client request 2026-11-20 (Maria): black background, the NAQSH copper 3D wordmark, the tagline
// "Crafting Lasting Impressions" in ivory under it. The wordmark is the client's final file (assets/logo/final), trimmed but not altered;
// it already sits on black, so no transparency work is needed.
// Logo and tagline stay inside the centre 630 x 630 so square previews (WhatsApp) don't cut them.
// Needs a local Chrome (Playwright drives it). Run: node scripts/build-og-image.mjs
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(root, "public/og/naqsh-share.png");
const TAGLINE = "Crafting Lasting Impressions";

const wordmark = await sharp(path.join(root, "assets/logo/final/PNG/naqsh-wordmark_copper-shiny-3d.png"))
  .flatten({ background: "#000000" })
  .trim({ background: "#000000", threshold: 8 })
  .resize({ width: 1200 })
  .png()
  .toBuffer();
const font = (file) => readFile(path.join(root, "src/fonts", file)).then((b) => b.toString("base64"));

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "Mulish"; src: url(data:font/woff2;base64,${await font("Mulish-latin.woff2")}) format("woff2"); font-weight: 200 1000; }
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; background: #000; }
body { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 38px; }
img { width: 560px; height: auto; display: block; }
.rule { width: 56px; height: 1px; background: linear-gradient(90deg, transparent, #C07752, transparent); }
p { font-family: "Mulish", sans-serif; font-weight: 600; font-size: 20px; letter-spacing: .34em;
    text-transform: uppercase; padding-left: .34em; color: #F7F1E7; /* --ivory */ }
</style></head><body>
<img src="data:image/png;base64,${wordmark.toString("base64")}" alt="">
<span class="rule"></span>
<p>${TAGLINE}</p>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome" });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await mkdir(path.dirname(OUT), { recursive: true });
  const png = await page.screenshot({ type: "png" });
  const info = await sharp(png).png({ compressionLevel: 9 }).toFile(OUT);
  console.log(`og/naqsh-share.png  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
} finally {
  await browser.close();
}
