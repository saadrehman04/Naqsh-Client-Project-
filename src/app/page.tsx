import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { WhySetsApart } from "@/components/sections/WhySetsApart";
import { CoreValues } from "@/components/sections/CoreValues";
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

      {/* 05 · Core Values */}
      <CoreValues />

      {/* 06 · Our 4-Step Approach */}
      <ApproachSection />

      {/* 07 · Seven Collections Section */}
      <div id="portfolio-preview">
        <CollectionGallery />
      </div>

      {/* 08 · Vision & Mission (Gifting with intention, popped below Seven Collections) */}
      <VisionMission />

      {/* 09 · Occasion Product Catalog */}
      <ProductCatalog />

      {/* 10 · Social Proof (conditionally rendered) */}
      <SocialProof />

      {/* 11 · Marquee Strip */}
      <BrandTicker />

      {/* 12 · CTA Band */}
      <CTABand />
    </>
  );
}
