import { chromium } from "@playwright/test";
import fs from "fs";

const outDir = "/home/saad/.gemini/antigravity/brain/c4abbc9a-d922-4b55-82e1-6b3cebf80281/scratch/updates-verify";
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  const CHROME_PATH =
    process.env.CHROME_PATH ||
    "/home/saad/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome";

  const browser = await chromium.launch({
    headless: true,
    executablePath: fs.existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
    args: [
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--no-sandbox",
    ],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. Approach Section screenshot
  console.log("Capturing Approach section...");
  const approachEl = await page.$(".approach-scene");
  if (approachEl) {
    const box = await approachEl.boundingBox();
    if (box) {
      await page.evaluate((y) => window.scrollTo(0, y), box.y);
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `${outDir}/01-approach-adjusted.png`,
        clip: { x: 0, y: 0, width: 1440, height: Math.min(box.height, 950) },
      });
    }
  }

  // 2. Vision & Mission popped section
  console.log("Capturing Vision section...");
  const vEl = await page.$(".vision-panel");
  if (vEl) {
    const box = await vEl.boundingBox();
    if (box) {
      await page.evaluate((top) => window.scrollTo(0, top + 150), box.y);
      await page.waitForTimeout(1500);
      await page.screenshot({
        path: `${outDir}/02-vision-popped.png`,
      });
    }
  }

  // 3. Brand Ticker screenshot
  console.log("Capturing Brand Ticker...");
  const tickerEl = await page.$(".brand-ticker");
  if (tickerEl) {
    await tickerEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await tickerEl.screenshot({
      path: `${outDir}/03-brand-ticker.png`,
    });
  }

  // 4. Footer screenshot
  console.log("Capturing Footer...");
  const footerEl = await page.$(".site-footer");
  if (footerEl) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `${outDir}/04-footer-redesigned.png`,
    });
  }

  await browser.close();
  console.log("Verification finished successfully!");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
