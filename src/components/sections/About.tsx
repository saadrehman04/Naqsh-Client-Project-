import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ImageFrame } from "@/components/ui/ImageFrame";

export function About() {
  const { about } = homeContent;
  return (
    <section className="section-y bg-[var(--ivory-deep)]/35 border-b border-[var(--hairline)] overflow-hidden" aria-labelledby="about-heading">
      <div className="container-x about-layout">
        <div className="about-copy" data-reveal="fade-up">
          <SectionLabel variant="pine">{about.label}</SectionLabel>
          <h2 id="about-heading" className="t-h2">Beyond the box, into an experience.</h2>
          <p className="t-lead text-[var(--charcoal)]">{about.text}</p>
          <div className="about-slogan"><span>{about.slogan}</span></div>
          <Link href="/our-approach" className="link-arrow"><span>Discover our approach</span><ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>
        <div className="about-images">
          <div className="about-main-image" data-speed="0.08">
            <ImageFrame src={about.image} alt={about.imageAlt} aspectRatio="4/5" reveal="clip" parallax sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="about-overlap-image" data-speed="-0.06" data-reveal="clip">
            <Image src="/images/products/excellence-award.webp" alt="Crystal employee appreciation award" fill sizes="(max-width: 768px) 42vw, 20vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
