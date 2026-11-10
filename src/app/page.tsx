import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { WhySetsApart } from "@/components/sections/WhySetsApart";
import { CollectionGallery } from "@/components/sections/CollectionGallery";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
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

      {/* SECTION 06 — OUR APPROACH (4-Step Process & 3D GiftBox) */}
      <ApproachSection />

      {/* SECTION 07 — PRODUCT CATALOGUE (21 Gift Editions across 7 Collections) */}
      <ProductCatalog />

      {/* CLIENT TESTIMONIALS (Hidden until verified testimonials are provided) */}
      <SocialProof />

      {/* SECTION 08 — FAQ PREVIEW */}
      <HomeFaqPreview />

      {/* Marquee Strip */}
      <BrandTicker />

      {/* SECTION 09 — FINAL CTA */}
      <CTABand />
    </>
  );
}
