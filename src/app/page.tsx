import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { VisionMission } from "@/components/sections/VisionMission";
import { WhySetsApart } from "@/components/sections/WhySetsApart";
import { CoreValues } from "@/components/sections/CoreValues";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* ABOUT US */}
      <About />

      {/* VISION & MISSION (ivory) */}
      <VisionMission />

      {/* 03 — WHY NAQSH */}
      <WhySetsApart />

      {/* CORE VALUES (ivory) */}
      <CoreValues />
    </>
  );
}
