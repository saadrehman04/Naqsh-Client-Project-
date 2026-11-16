import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatbotLauncher } from "@/components/chatbot/ChatbotLauncher";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollEffectsGate } from "@/components/motion/ScrollEffectsGate";
import { MotionChrome } from "@/components/motion/MotionChrome";
import { constructMetadata, generateOrganizationSchema } from "@/lib/seo";
import "./globals.css";

/* Self-hosted (Latin, variable weight) so dev and build never depend on reaching Google Fonts. */
/* Client-selected pairing (font sheet option D, "Engraved & classical"): Marcellus + Mulish. */
const marcellus = localFont({
  src: "../fonts/Marcellus-latin.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-marcellus",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});

const mulish = localFont({
  src: "../fonts/Mulish-latin.woff2",
  weight: "300 800",
  style: "normal",
  variable: "--font-mulish",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${marcellus.variable} ${mulish.variable} antialiased`}
    >
      <head>
        {/* Add .js class before first paint so hidden starting states only apply when JS runs */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('reduced-motion');}else{document.documentElement.classList.add('motion-ok');}",
          }}
        />
        {/* JSON-LD Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* Favicon: terracotta emblem via src/app/icon.svg, apple-icon.png and public/favicon.ico */}
        <meta name="theme-color" content="#F7F1E7" />
      </head>
      <body className="flex flex-col min-h-screen bg-[var(--ivory)] text-[var(--text)]">
        <SkipLink />
        <MotionProvider>
          <MotionChrome />
          <Header />
          <div className="page-canvas relative isolate flex flex-col flex-1">
            <main
              id="main-content"
              className="main-content-surface relative z-10 flex-1 bg-[var(--ivory)]"
            >
              {children}
            </main>
            <Footer />
          </div>
          <ChatbotLauncher />
          <ScrollEffectsGate />
        </MotionProvider>
      </body>
    </html>
  );
}
