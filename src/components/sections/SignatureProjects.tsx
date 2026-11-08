import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function SignatureProjects() {
  const { signatureProjects } = homeContent;

  return (
    <section
      className="section-y bg-[var(--ivory-deep)] border-y border-[var(--hairline)]"
      aria-labelledby="signature-projects-heading"
    >
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl" data-reveal="up">
            <SectionLabel variant="pine">{signatureProjects.label}</SectionLabel>
            <h2
              id="signature-projects-heading"
              className="t-h2 mt-2"
              data-reveal="lines"
            >
              {signatureProjects.heading}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--charcoal)] font-light leading-relaxed">
              {signatureProjects.intro}
            </p>
          </div>
          <div data-reveal="up" data-delay="0.1">
            <Link href="/portfolio" className="link-arrow">
              <span>Explore Full Portfolio & Catalogue</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10"
          data-reveal="stagger"
          data-stagger="0.1"
        >
          {signatureProjects.items.map((project, index) => (
            <article
              key={project.id}
              className="group rounded-[var(--radius-image)] bg-[var(--ivory)] border border-[var(--hairline)] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Authentic Product Photography */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#12100E]">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101D19]/90 backdrop-blur-md border border-[#C99A53]/40 text-[10px] font-sans uppercase tracking-[0.14em] text-[var(--ivory)] font-semibold">
                    <Sparkles className="w-3 h-3 text-[#C99A53]" aria-hidden="true" />
                    <span>{project.badge}</span>
                  </span>
                  <span className="font-serif text-sm text-[var(--ivory)]/90 bg-black/45 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/15">
                    0{index + 1}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-sans uppercase tracking-[0.16em] text-[#FBE2AA] font-semibold block">
                    {project.occasion}
                  </span>
                </div>
              </div>

              {/* Project Concept & Personalization Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[var(--black)] font-normal leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--charcoal)] font-light leading-relaxed">
                    {project.concept}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--hairline)] text-xs font-sans">
                    <div>
                      <span className="uppercase tracking-[0.14em] text-[var(--pine)] font-semibold block mb-1">
                        Personalization Details
                      </span>
                      <p className="text-[var(--charcoal)] font-light leading-relaxed">
                        {project.personalization}
                      </p>
                    </div>
                    <div>
                      <span className="uppercase tracking-[0.14em] text-[var(--chestnut)] font-semibold block mb-1">
                        Presentation Format
                      </span>
                      <p className="text-[var(--charcoal)] font-light leading-relaxed">
                        {project.presentation}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--hairline)] flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={project.href}
                    className="link-arrow text-xs"
                  >
                    <span>Explore Collection</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={`/contact?collection=${project.href.replace("/portfolio/", "")}`}
                    className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.14em] font-semibold text-[var(--pine)] hover:text-[var(--chestnut)] transition-colors"
                  >
                    <span>Request Similar Concept</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs font-sans tracking-[0.12em] uppercase text-[var(--charcoal)]/75">
          {signatureProjects.note}
        </p>
      </div>
    </section>
  );
}
