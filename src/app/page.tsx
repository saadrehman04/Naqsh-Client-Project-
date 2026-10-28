import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { WhySetsApart } from "@/components/sections/WhySetsApart";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { CollectionGallery } from "@/components/sections/CollectionGallery";
import { VisionMission } from "@/components/sections/VisionMission";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { SocialProof } from "@/components/sections/SocialProof";
import { CTABand } from "@/components/sections/CTABand";
import { BrandTicker } from "@/components/sections/BrandTicker";

export default function HomePage() {
  return (
    <>
      {/* 01 · Hero Section (Desk Set Master Crop) */}
      <Hero />

      {/* 02 · About Section */}
      <About />

      {/* 03 · Services Overview */}
      <ServicesTeaser />

      {/* 04 · What Sets Us Apart (Core Promises) */}
      <WhySetsApart />

      {/* 05 · Our 4-Step Approach */}
      <ApproachSection />

      {/* 06 · Seven Collections Section */}
      <div id="portfolio-preview">
        <CollectionGallery />
      </div>

      {/* 07 · Vision & Mission (Gifting with intention, popped below Seven Collections) */}
      <VisionMission />

      {/* 08 · Occasion Product Catalog */}
      <ProductCatalog />

      {/* 09 · Social Proof (conditionally rendered) */}
      <SocialProof />

      {/* 10 · Marquee Strip */}
      <BrandTicker />

      {/* 11 · CTA Band */}
      <CTABand />
    </>
  );
}
