import { homeContent } from "@/content/home";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Ornament } from "@/components/ui/Ornament";

export function About() {
  const { about } = homeContent;
  return (
    <section
      className="about-section on-dark section-y relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Subtle diamond lattice texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url('/brand/diamond-lattice.svg')",
          backgroundSize: "160px 160px",
        }}
        aria-hidden="true"
      />

      {/* Subtle ambient warm glow */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201, 154, 83, 0.14) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x about-layout relative z-10">
        <div className="about-copy">
          <Ornament align="start" className="mb-6" />
          <h2
            id="about-heading"
            className="t-h2"
            data-reveal="lines"
          >
            {about.heading}
          </h2>
          <p className="t-lead" data-reveal="up" data-delay="0.08">
            {about.paragraph}
          </p>
          <p
            className="about-tagline font-sans text-[length:var(--fs-lead)] leading-[1.6] font-bold uppercase tracking-[0.06em] text-[var(--sage)] mt-8 sm:mt-10"
            data-reveal="up"
            data-delay="0.14"
          >
            {about.slogan}
          </p>
        </div>
        {/* Single client photo: copper wax seal with the NAQSH emblem */}
        <div className="w-full max-w-[34rem] lg:justify-self-end rounded-[var(--radius-image)] overflow-hidden shadow-2xl">
          <ImageFrame
            src={about.image}
            alt={about.imageAlt}
            aspectRatio="4/5"
            reveal="clip"
            parallax={0.08}
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
}
