import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { WhySetsApart } from "@/components/sections/WhySetsApart";
import { VisionMission } from "@/components/sections/VisionMission";
import { CoreValues } from "@/components/sections/CoreValues";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { SocialProof } from "@/components/sections/SocialProof";
import { CTABand } from "@/components/sections/CTABand";

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

      {/* 05 · Vision & Mission (Black luxury background) */}
      <VisionMission />

      {/* 06 · Core Values */}
      <CoreValues />

      {/* 07 · Our 4-Step Approach */}
      <ApproachSection />

      {/* 08 · Occasion Portfolio Preview */}
      <PortfolioPreview />

      {/* 09 · Social Proof (conditionally rendered) */}
      <SocialProof />

      <div className="portfolio-marquee" aria-label="Welcome Kits · Client Gifts · Ramadan and Eid · Event Giveaways · Souvenirs · Awards"><span>Welcome Kits · Client Gifts · Ramadan &amp; Eid · Event Giveaways · Souvenirs · Awards · </span><span aria-hidden="true">Welcome Kits · Client Gifts · Ramadan &amp; Eid · Event Giveaways · Souvenirs · Awards · </span></div>

      {/* 10 · CTA Band */}
      <CTABand />
    </>
  );
}
