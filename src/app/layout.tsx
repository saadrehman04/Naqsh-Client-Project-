import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollEffectsGate } from "@/components/motion/ScrollEffectsGate";
import { MotionChrome } from "@/components/motion/MotionChrome";
import { constructMetadata, generateOrganizationSchema } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
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
      className={`${cormorant.variable} ${manrope.variable} antialiased`}
    >
      <head>
        {/* Add .js class before first paint so hidden starting states only apply when JS runs */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('reduced-motion');}",
          }}
        />
        {/* JSON-LD Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* Favicon & Theme */}
        <link rel="icon" href="/brand/emblem-black.svg" type="image/svg+xml" />
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
          <FloatingWhatsApp />
          <ScrollEffectsGate />
        </MotionProvider>
      </body>
    </html>
  );
}
