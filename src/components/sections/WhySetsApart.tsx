import Image from "next/image";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";

const promiseImages = [
  { src: "/images/products/independence-day-gift.webp", alt: "Independence Day gift set" },
  { src: "/images/products/pakistan-heritage-gift-set.webp", alt: "Pakistan heritage gift set" },
  { src: "/images/products/excellence-award.webp", alt: "Excellence Award" },
  { src: "/images/products/new-hire-welcome-kit.webp", alt: "New Hire Welcome Kit" },
];

export function WhySetsApart() {
  const { whyUs } = homeContent;
  return (
    <section
      className="why-section on-dark section-y relative overflow-hidden"
      aria-labelledby="why-us-heading"
    >
      {/* Subtle ambient copper glow */}
      <div
        className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(171, 108, 73, 0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x why-layout relative z-10" data-why-promises>
        <div className="why-copy">
          <header className="why-intro">
            <div data-reveal="up">
              <SectionLabel variant="khaki">{whyUs.label}</SectionLabel>
            </div>
            <h2 id="why-us-heading" className="t-h2" data-reveal="lines">
              {whyUs.heading}
            </h2>
            <p className="t-lead" data-reveal="up" data-delay="0.1">
              {whyUs.intro}
            </p>
          </header>
          <ol className="promise-list">
            {whyUs.promises.map((promise, index) => (
              <li
                className={`promise-item relative border-t-0 ${index === 0 ? "is-active" : ""}`}
                key={promise.title}
                data-why-item
              >
                <span
                  className="promise-hairline"
                  data-draw="left"
                  aria-hidden="true"
                />
                <span className="promise-number" data-reveal="up" data-delay="0.06">
                  0{index + 1}
                </span>
                <div data-reveal="up" data-delay="0.12">
                  <h3>{promise.title}</h3>
                  <p>{promise.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="why-visual" aria-hidden="true" data-cursor-label="Explore">
          {promiseImages.map((image, index) => (
            <div
              className={`why-visual-image ${index === 0 ? "is-active" : ""}`}
              key={image.src}
              data-why-image
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          ))}
          <div className="why-visual-caption">
            Thoughtful by principle. Professional by design.
          </div>
        </div>
      </div>
    </section>
  );
}
