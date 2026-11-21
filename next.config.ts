import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Classic static rendering + revalidate (see docs/DECISIONS.md). Cache Components is off on purpose.
  cacheComponents: false,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75, 80, 90],
    // 2400: the HD hero exports (home, services), for retina desktops.
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920, 2400],
    imageSizes: [64, 96, 128, 256, 384],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      // www.naqshonline.co -> naqshonline.co (one canonical host for Google; www added in Vercel
      // 2026-11-21). Permanent (308), keeps the path.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.naqshonline.co" }],
        destination: "https://naqshonline.co/:path*",
        permanent: true,
      },
      // Annual Event Giveaways was retired (its products moved to other collections).
      { source: "/portfolio/annual-event-giveaways", destination: "/portfolio", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
