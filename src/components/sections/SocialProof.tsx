import { siteConfig } from "@/content/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Image from "next/image";

export function SocialProof() {
  const hasTestimonials = siteConfig.testimonials && siteConfig.testimonials.length > 0;
  const hasLogos = siteConfig.clientLogos && siteConfig.clientLogos.length > 0;

  // Strict rule: Hidden until real client content exists. Never invent fake logos or testimonials.
  if (!hasTestimonials && !hasLogos) {
    return null;
  }

  return (
    <section
      id="social-proof"
      className="bg-[var(--ivory-warm)] py-20 sm:py-28 border-b border-[var(--border-light)] overflow-hidden"
      aria-label="Client Trust & Testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {hasLogos && (
          <div className="mb-16 sm:mb-20 text-center" data-reveal="fade-up">
            <SectionLabel variant="pine" className="mb-6 justify-center">
              Trusted By Leading Organizations
            </SectionLabel>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75">
              {siteConfig.clientLogos.map((client) => (
                <div
                  key={client.name}
                  className="relative h-10 w-28 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {hasTestimonials && (
          <div className="mx-auto max-w-7xl" data-reveal="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <SectionLabel variant="pine" className="mb-3 justify-center">
                Client Voices
              </SectionLabel>
              <h2 className="t-h2">Relationships Worth Celebrating.</h2>
            </div>
            <div
              className="social-proof-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 sm:gap-7"
              role="region"
              aria-label="Client testimonials. Scroll horizontally to see more."
              tabIndex={0}
            >
              {siteConfig.testimonials.map((t, idx) => (
                <blockquote
                  key={idx}
                  className="flex min-h-64 w-[min(84vw,25rem)] flex-none snap-start flex-col justify-between rounded-[var(--radius-card)] border border-[var(--border-light)] bg-[var(--ivory)] p-7 sm:p-8"
                >
                  <p className="font-serif text-lg text-[var(--black)] italic leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="border-t border-[var(--border-light)] pt-4">
                    <cite className="not-italic block">
                      <span className="font-sans font-medium text-sm text-[var(--black)] block">
                        {t.name}
                      </span>
                      <span className="text-xs text-[var(--pine)] block">
                        {t.role}, {t.company}
                      </span>
                    </cite>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
