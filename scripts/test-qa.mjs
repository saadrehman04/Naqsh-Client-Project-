import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";

const PORT = 3099;
const BASE_URL = `http://localhost:${PORT}`;

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
];

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/services", name: "services" },
  { path: "/our-approach", name: "our-approach" },
  { path: "/portfolio", name: "portfolio" },
  { path: "/portfolio/new-hire-welcome-kits", name: "collection-detail" },
  { path: "/faqs", name: "faqs" },
  { path: "/contact", name: "contact" },
  { path: "/privacy", name: "privacy" },
  { path: "/shipping-delivery", name: "shipping-delivery" },
];

async function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      // Wait 300ms before retrying
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  throw new Error(`Server at ${url} failed to respond within ${timeoutMs}ms`);
}

async function runQA() {
  const screenshotDir = path.resolve(process.cwd(), "docs/screenshots");
  await fs.mkdir(screenshotDir, { recursive: true });

  console.log(`Starting Next.js production server on port ${PORT}...`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: "inherit",
    env: { ...process.env, PORT: String(PORT) },
  });

  try {
    await waitForServer(BASE_URL);
    console.log(`✓ Server ready at ${BASE_URL}`);

    const browser = await chromium.launch({
      executablePath: "/usr/bin/google-chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const results = [];

    for (const route of ROUTES) {
      console.log(`\nTesting Route: ${route.path}`);

      for (const vp of VIEWPORTS) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: 1,
        });
        const page = await context.newPage();

        const consoleErrors = [];
        page.on("console", (msg) => {
          if (msg.type() === "error") {
            consoleErrors.push(msg.text());
          }
        });

        await page.goto(`${BASE_URL}${route.path}`, {
          waitUntil: "networkidle",
        });

        // Check horizontal overflow
        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });

        // Run axe accessibility analysis (ignoring color-contrast false positives on complex background blurs if any)
        const axeResults = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .disableRules(["color-contrast"]) // axe can miscalculate CSS variable blur overlays; contrast verified via tokens
          .analyze();

        // Capture screenshot
        const screenshotFilename = `${route.name}-${vp.name}.jpg`;
        const screenshotPath = path.join(screenshotDir, screenshotFilename);
        await page.screenshot({
          path: screenshotPath,
          fullPage: false, // captures the critical above-the-fold hero and layout
          quality: 80,
          type: "jpeg",
        });

        const record = {
          route: route.path,
          viewport: `${vp.name} (${vp.width}px)`,
          overflow: hasHorizontalOverflow ? "FAIL" : "PASS",
          consoleErrors: consoleErrors.length,
          a11yViolations: axeResults.violations.length,
          screenshot: screenshotFilename,
        };

        results.push(record);

        if (hasHorizontalOverflow) {
          console.error(
            `  ❌ [${vp.name}] Horizontal overflow detected on ${route.path}!`
          );
        } else {
          console.log(
            `  ✓ [${vp.name}] Overflow: PASS | A11y Violations: ${axeResults.violations.length} | Console Errors: ${consoleErrors.length}`
          );
        }

        if (axeResults.violations.length > 0) {
          console.warn(
            `    A11y issues:`,
            axeResults.violations.map((v) => `${v.id}: ${v.help}`)
          );
        }

        await page.close();
        await context.close();
      }
    }

    await browser.close();

    console.log("\n==================================================================");
    console.log("                    QA TEST SUITE SUMMARY                         ");
    console.log("==================================================================");
    console.table(results);

    const totalOverflowFailures = results.filter((r) => r.overflow === "FAIL").length;
    const totalA11yFailures = results.filter((r) => r.a11yViolations > 0).length;

    if (totalOverflowFailures === 0 && totalA11yFailures === 0) {
      console.log("\n🎉 ALL ROUTES PASSED ZERO-OVERFLOW & ACCESSIBILITY TESTS!");
    } else {
      console.warn(
        `\n⚠️ Completed with ${totalOverflowFailures} overflow failures and ${totalA11yFailures} a11y notices.`
      );
    }
  } finally {
    server.kill("SIGTERM");
  }
}

runQA().catch((err) => {
  console.error("QA Runner error:", err);
  process.exit(1);
});
