import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeContent } from "@/content/home";
import { collections } from "@/content/collections";

export function PortfolioPreview() {
  const { portfolioPreview } = homeContent;

  const collectionBadges = [
    { bg: "bg-[var(--pine)]", text: "text-[var(--ivory)]" },
    { bg: "bg-[var(--chestnut)]", text: "text-[var(--ivory)]" },
    { bg: "bg-[var(--terracotta-deep)]", text: "text-[var(--ivory)]" },
    { bg: "bg-[var(--copper)]", text: "text-[var(--ivory)]" },
    { bg: "bg-[var(--charcoal)]", text: "text-[var(--ivory)]" },
    { bg: "bg-[var(--pine)]", text: "text-[var(--ivory)]" },
    { bg: "bg-[#4E6E4C]", text: "text-[var(--ivory)]" },
  ];

  return (
    <section
      id="portfolio-preview"
      className="relative bg-[var(--ivory-deep)]/30 py-24 sm:py-32 border-b border-[var(--border-light)] overflow-hidden"
      aria-labelledby="portfolio-preview-heading"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20" data-reveal="fade-up">
          <SectionLabel variant="pine" className="mb-4">
            {portfolioPreview.label}
          </SectionLabel>
          <h2
            id="portfolio-preview-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[var(--black)] leading-[1.15] mb-6"
          >
            {portfolioPreview.heading}
          </h2>
          <p className="font-sans text-base sm:text-lg text-[var(--charcoal)] leading-relaxed font-light">
            {portfolioPreview.intro}
          </p>
        </div>

        {/* Collections Grid with Colored Occasion Tags */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
          data-reveal="stagger"
        >
          {collections.map((collection, index) => {
            const isFeatured = index === 0;
            const badge = collectionBadges[index % collectionBadges.length];

            return (
              <div
                key={collection.slug}
                className={`group relative flex flex-col justify-between bg-[var(--ivory)] border border-[var(--border-light)] rounded-[var(--radius-card)] overflow-hidden transition-all duration-500 hover:border-[var(--copper)] hover:shadow-[0_16px_36px_-12px_rgba(42,39,37,0.14)] ${
                  isFeatured ? "md:col-span-2 lg:col-span-2 md:flex-row" : ""
                }`}
              >
                {/* Visual */}
                <div
                  className={`relative overflow-hidden bg-[var(--ivory-deep)] ${
                    isFeatured
                      ? "md:w-1/2 aspect-[4/3] md:aspect-auto"
                      : "aspect-[4/3] w-full"
                  }`}
                >
                  <Image
                    src={collection.image}
                    alt={collection.alt}
                    fill
                    sizes={
                      isFeatured
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    }
                    className="object-cover object-center transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className={`absolute top-4 left-4 z-10 inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full shadow-md ${badge.bg} ${badge.text}`}>
                    Occasion {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={`p-6 sm:p-8 flex flex-col justify-between ${
                    isFeatured ? "md:w-1/2" : "flex-1"
                  }`}
                >
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[var(--black)] mb-2.5 group-hover:text-[var(--terracotta)] transition-colors duration-300">
                      {collection.title}
                    </h3>
                    <p className="font-sans text-sm text-[var(--charcoal)] leading-relaxed mb-6 font-light">
                      {collection.tagline}
                    </p>

                    {/* Typical Inclusions Snippet */}
                    <div className="border-t border-[var(--border-light)]/70 pt-4 mb-6">
                      <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-[var(--sage)] mb-2.5 font-medium">
                        Typical Inclusions
                      </p>
                      <ul className="space-y-1.5">
                        {collection.typicalInclusions.slice(0, 3).map((item) => (
                          <li
                            key={item}
                            className="text-xs text-[var(--chestnut)]/90 flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--copper)] mt-1.5 flex-shrink-0" />
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <Link
                      href={`/portfolio/${collection.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.12em] uppercase font-semibold text-[var(--black)] group-hover:text-[var(--terracotta)] transition-colors duration-300"
                    >
                      <span>Explore Collection</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Pine Teal Editorial Note & Explore All Banner */}
        <div
          className="rounded-[var(--radius-card)] bg-[var(--pine)] text-[var(--ivory)] border border-[var(--sage)]/40 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
          data-reveal="fade-up"
        >
          {/* Subtle copper corner glow */}
          <div
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[var(--copper)]/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-2xl text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-[var(--khaki)] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[var(--khaki)]" />
              <span>Bespoke Occasion Gifting</span>
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl text-[var(--ivory)] font-normal mb-3">
              Tailored Around Your Milestones
            </h4>
            <p className="font-sans text-sm sm:text-base text-[var(--ivory)]/85 font-light leading-relaxed">
              {portfolioPreview.note}
            </p>
          </div>

          <div className="flex-shrink-0 relative z-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[var(--terracotta-deep)] hover:bg-[var(--chestnut)] text-[var(--ivory)] font-sans text-xs tracking-[0.16em] uppercase font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <span>View All 7 Collections</span>
              <ArrowUpRight className="w-4 h-4 text-[var(--khaki)]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
