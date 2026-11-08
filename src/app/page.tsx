import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { WhySetsApart } from "@/components/sections/WhySetsApart";
import { CollectionGallery } from "@/components/sections/CollectionGallery";
import { SignatureProjects } from "@/components/sections/SignatureProjects";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { NaqshSignature } from "@/components/sections/NaqshSignature";
import { SocialProof } from "@/components/sections/SocialProof";
import { HomeFaqPreview } from "@/components/sections/HomeFaqPreview";
import { BrandTicker } from "@/components/sections/BrandTicker";
import { CTABand } from "@/components/sections/CTABand";

export default function HomePage() {
  return (
    <>
      {/* SECTION 01 — HERO */}
      <Hero />

      {/* SECTION 02 — BRAND INTRODUCTION */}
      <About />

      {/* SECTION 03 — OUR SERVICES (4 Categories) */}
      <ServicesTeaser />

      {/* SECTION 04 — WHY NAQSH */}
      <WhySetsApart />

      {/* SECTION 05 — FEATURED COLLECTIONS (7 Collections) */}
      <div id="portfolio-preview">
        <CollectionGallery />
      </div>

      {/* SECTION 06 — SIGNATURE PROJECTS / PORTFOLIO */}
      <SignatureProjects />

      {/* SECTION 07 — OUR APPROACH (4-Step Process & 3D GiftBox) */}
      <ApproachSection />

      {/* SECTION 08 — THE NAQSH SIGNATURE (Interactive 3D Wax Seal & Finishing Craft) */}
      <NaqshSignature />

      {/* SECTION 09 — CLIENT TESTIMONIALS (Hidden until verified testimonials are provided) */}
      <SocialProof />

      {/* SECTION 10 — FAQ PREVIEW */}
      <HomeFaqPreview />

      {/* Marquee Strip */}
      <BrandTicker />

      {/* SECTION 11 — FINAL CTA */}
      <CTABand />
    </>
  );
}
