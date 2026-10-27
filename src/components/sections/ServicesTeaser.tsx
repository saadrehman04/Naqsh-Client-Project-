import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight, Gift, Compass } from "lucide-react";

export function ServicesTeaser() {
  const { servicesTeaser } = homeContent;

  const cardThemes = [
    {
      badgeBg: "bg-[var(--terracotta-deep)]",
      badgeText: "text-[var(--ivory)]",
      borderColor: "border-[var(--terracotta)]/30 hover:border-[var(--terracotta)]",
      iconBg: "bg-[var(--terracotta)]/15 text-[var(--chestnut)]",
      icon: Gift,
      accentColor: "text-[var(--chestnut)]",
      btnBg: "bg-[var(--terracotta-deep)] hover:bg-[var(--chestnut)] text-[var(--ivory)]",
    },
    {
      badgeBg: "bg-[var(--pine)]",
      badgeText: "text-[var(--ivory)]",
      borderColor: "border-[var(--pine)]/30 hover:border-[var(--pine)]",
      iconBg: "bg-[var(--pine)]/15 text-[var(--pine)]",
      icon: Compass,
      accentColor: "text-[var(--pine)]",
      btnBg: "bg-[var(--pine)] hover:bg-[#0E3D30] text-[var(--ivory)]",
    },
  ];

  return (
    <section
      className="section-y bg-[var(--ivory-warm)] border-t border-[var(--hairline)]"
      aria-labelledby="services-teaser-heading"
    >
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl" data-reveal="fade-up">
            <SectionLabel variant="pine">{servicesTeaser.label}</SectionLabel>
            <h2
              id="services-teaser-heading"
              className="t-h2 text-[var(--text-strong)]"
            >
              {servicesTeaser.heading}
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--black)] hover:bg-[var(--chestnut)] text-[var(--ivory)] text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
          >
            <span>View all services</span>
            <ArrowRight className="w-4 h-4 text-[var(--khaki)]" />
          </Link>
        </div>

        {/* Two Service Cards Grid with Distinct Palette Personas */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          data-reveal="stagger"
        >
          {servicesTeaser.services.map((service, index) => {
            const theme = cardThemes[index];
            const Icon = theme.icon;

            return (
              <Link
                key={service.title}
                href={service.link}
                className={`group card bg-[var(--ivory)] overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:-translate-y-1.5 transition-all duration-500 shadow-md ${theme.borderColor}`}
              >
                <div>
                  <div className="aspect-[16/10] sm:aspect-[16/9] rounded-[var(--radius-image)] overflow-hidden relative mb-6 border border-[var(--hairline)] bg-[var(--ivory-deep)]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-out)]"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-sans font-semibold tracking-wider uppercase shadow-sm ${theme.badgeBg} ${theme.badgeText}`}>
                        Service 0{index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-full ${theme.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className={`t-h3 text-[var(--text-strong)] group-hover:${theme.accentColor} transition-colors duration-200`}>
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-[var(--text)] text-base font-light leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--hairline)] flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-widest ${theme.accentColor} group-hover:underline`}>
                    {service.cta}
                  </span>
                  <div className={`w-9 h-9 rounded-full ${theme.btnBg} flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm`}>
                    <ArrowRight className="w-4 h-4 text-[var(--ivory)]" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
