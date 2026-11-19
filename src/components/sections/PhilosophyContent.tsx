import { philosophyContent } from "@/content/philosophy";

/**
 * Our Philosophy body: the five principles as numbered editorial rows (term beside its text on
 * wide screens, stacked on phones), then the client's closing note set apart in italics.
 */
export function PhilosophyContent() {
  const { principles, closing } = philosophyContent;
  return (
    <section className="section-y bg-[var(--ivory)]" aria-label="Our principles">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="border-b border-[var(--hairline)]" data-reveal="stagger" data-stagger="0.08">
          {principles.map((item, idx) => (
            <li
              key={item.term}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-x-10 gap-y-3 border-t border-[var(--hairline)] py-8 sm:py-10"
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="font-sans text-sm sm:text-base font-semibold tabular-nums text-[var(--chestnut)]"
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display font-normal text-[length:var(--fs-h3)] leading-[1.15] tracking-[-0.01em] text-[var(--black)]">
                  {item.term}
                </h2>
              </div>
              <p className="ps-9 md:ps-0 md:pt-1.5 font-sans text-[length:var(--fs-body)] leading-[1.75] text-[var(--charcoal)] [text-wrap:pretty]">
                {item.text}
              </p>
            </li>
          ))}
        </ol>

        <figure className="mx-auto mt-16 sm:mt-20 max-w-3xl text-center" data-reveal="up">
          <span className="mx-auto block size-2.5 rotate-45 bg-[var(--terracotta)]" aria-hidden="true" />
          <blockquote className="mt-8 font-display italic text-[length:var(--fs-lead)] leading-[1.6] text-[var(--black)] [text-wrap:balance]">
            {closing}
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
