import { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Compass,
  FileCheck,
  FilePen,
  Gift,
  MessagesSquare,
  Pencil,
  Settings,
  Sparkles,
  Truck,
  UserRoundPen,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import {
  servicesContent,
  type ConsultationIcon,
  type WorkflowIcon,
} from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Corporate Gifting Services · Premium Gifting Solutions & Gifting Consultation",
  description:
    "Premium corporate gifting solutions and one-on-one gifting consultations from NAQSH, from custom curation to seamless delivery.",
  path: "/services",
});

const CONSULTATION_ICONS: Record<ConsultationIcon, LucideIcon> = {
  guidance: Compass,
  personalised: UserRoundPen,
  brand: BadgeCheck,
  execution: Sparkles,
};

const WORKFLOW_ICONS: Record<WorkflowIcon, LucideIcon> = {
  requirement: FilePen,
  consultation: MessagesSquare,
  selection: Gift,
  customization: Pencil,
  review: FileCheck,
  production: Settings,
  delivery: Truck,
};

/** Icon discs cycle through token tints: ivory-deep, sage, terracotta. */
const DISC_TINTS = [
  "bg-[var(--ivory-deep)]",
  "bg-[color-mix(in_srgb,var(--sage)_22%,var(--ivory))]",
  "bg-[color-mix(in_srgb,var(--terracotta)_16%,var(--ivory))]",
];

const sectionHeading =
  "font-display font-normal text-[length:var(--fs-h2)] leading-[1.05] tracking-[-0.015em] text-[var(--black)] [text-wrap:balance]";

export default function ServicesPage() {
  const { header, premiumGifting, giftingConsultation, projectWorkflow } = servicesContent;

  return (
    <div className="bg-[var(--ivory)]">
      <PageHero
        title={premiumGifting.heading}
        subtitle={premiumGifting.body}
        label={header.label}
        image="/images/site/services-cover-hd.webp"
        imageTreatment="clear"
        imageQuality={90}
        imagePosition="70% center"
      />

      {/* Gifting Consultation (black band, terracotta accents) */}
      <section
        id={giftingConsultation.id}
        className="on-dark section-y scroll-mt-24 bg-[var(--black)] text-[var(--ivory)]"
        aria-labelledby="gifting-consultation-heading"
      >
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 rounded-[28px] border border-[var(--terracotta-on-dark)]/45 bg-[var(--black)] p-4 sm:p-6 lg:p-8 shadow-[0_0_60px_-20px_rgb(178_76_59/0.35)]">
            <div
              className="lg:col-span-5 relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[34rem] overflow-hidden rounded-[var(--radius-image)] bg-[var(--charcoal)]"
              data-reveal="clip"
              data-clip-from="left"
            >
              <Image
                src={giftingConsultation.image}
                alt={giftingConsultation.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[40%_center]"
              />
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between gap-10 px-2 pb-4 sm:px-4 lg:px-2 lg:py-4">
              <div data-reveal="up">
                <Ornament align="start" />
                <h2
                  id="gifting-consultation-heading"
                  className="mt-5 font-display font-normal text-[length:var(--fs-h2)] leading-[1.05] tracking-[-0.015em] text-[var(--ivory)] [text-wrap:balance]"
                >
                  {giftingConsultation.heading}
                </h2>
                <p className="mt-5 max-w-[38rem] font-sans text-[length:var(--fs-body)] leading-[1.75] text-[var(--ivory)]/80 [text-wrap:pretty]">
                  {giftingConsultation.body}
                </p>
              </div>

              <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {giftingConsultation.keyTerms.map((term, i) => {
                    const Icon = CONSULTATION_ICONS[term.icon];
                    return (
                      <li
                        key={term.label}
                        className="flex items-center gap-4 min-h-[5.5rem] rounded-2xl border border-[var(--terracotta-on-dark)] bg-[linear-gradient(90deg,rgb(178_76_59/0.16),transparent_75%)] px-5 py-4"
                        data-reveal="up"
                        data-delay={String(0.06 * i)}
                      >
                        <Icon
                          className="size-6 shrink-0 text-[var(--terracotta-on-dark)]"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        <span className="font-display text-[length:var(--fs-h4)] leading-[1.2] text-[var(--ivory)]">
                          {term.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-8">
                  <Button
                    href={giftingConsultation.ctaHref}
                    className="[--btn-bg:var(--chestnut)] [--btn-border:var(--chestnut)] [--btn-fill:var(--terracotta-on-dark)]"
                  >
                    {giftingConsultation.ctaText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Workflow (ivory) */}
      <section
        id={projectWorkflow.id}
        className="section-y scroll-mt-24 bg-[var(--ivory)]"
        aria-labelledby="project-workflow-heading"
      >
        <div className="container-x">
          <header className="max-w-[44rem]">
            <Ornament align="start" />
            <h2 id="project-workflow-heading" className={`mt-5 ${sectionHeading}`} data-reveal="lines">
              {projectWorkflow.heading}
            </h2>
            <p
              className="mt-5 font-sans text-[length:var(--fs-body)] leading-[1.7] text-[var(--charcoal)]"
              data-reveal="up"
              data-delay="0.06"
            >
              {projectWorkflow.intro}
            </p>
          </header>

          <ol className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {projectWorkflow.steps.map((step, i) => {
              const Icon = WORKFLOW_ICONS[step.icon];
              return (
                <li
                  key={step.name}
                  className="flex flex-col rounded-[var(--radius-card)] border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--ivory-deep)_55%,var(--ivory))] p-6"
                  data-reveal="up"
                  data-delay={String(0.05 * (i % 4))}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-sans text-[1.5rem] font-semibold leading-none tabular-nums text-[var(--chestnut)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex size-16 shrink-0 items-center justify-center rounded-full text-[var(--black)] ${DISC_TINTS[i % DISC_TINTS.length]}`}
                      aria-hidden="true"
                    >
                      <Icon className="size-7" strokeWidth={1.4} />
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[length:var(--fs-h4)] leading-[1.15] text-[var(--black)]">
                    {step.name}
                  </h3>
                  <p className="mt-3 font-sans text-[0.9375rem] leading-[1.65] text-[var(--charcoal)]">
                    {step.desc}
                  </p>
                </li>
              );
            })}

          </ol>

        </div>
      </section>
    </div>
  );
}
