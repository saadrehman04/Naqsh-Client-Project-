import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { WhySetsApart } from "@/components/sections/WhySetsApart";
import { CollectionGallery } from "@/components/sections/CollectionGallery";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* 01 — BRAND INTRODUCTION */}
      <About />

      {/* 02 — OUR SERVICES (4 Categories) */}
      <ServicesTeaser />

      {/* 03 — WHY NAQSH */}
      <WhySetsApart />

      {/* 04 — FEATURED COLLECTIONS (3 collections, static grid) */}
      <div id="portfolio-preview">
        <CollectionGallery limit={3} />
      </div>
    </>
  );
}
