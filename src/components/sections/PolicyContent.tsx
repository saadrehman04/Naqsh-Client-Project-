import { Fragment, type ReactNode } from "react";
import { Confirm } from "@/components/ui/Confirm";
import { SUPPORT_EMAIL, type PolicyDocument } from "@/content/policies";

/** Turns the support address inside policy text into a mailto link. */
function withEmailLink(text: string): ReactNode {
  const parts = text.split(SUPPORT_EMAIL);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="font-medium text-[var(--chestnut)] underline decoration-[var(--chestnut)]/35 underline-offset-4 hover:decoration-current"
        >
          {SUPPORT_EMAIL}
        </a>
      )}
    </Fragment>
  ));
}

/** Numbered policy sections (shared by the Data Privacy and Shipping & Delivery pages). */
export function PolicyContent({ policy }: { policy: PolicyDocument }) {
  return (
    <article className="section-y bg-[var(--ivory)]" aria-label={policy.title} data-reveal="fade">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="space-y-12 sm:space-y-14">
          {policy.sections.map((section, idx) => (
            <li key={section.heading} className="grid grid-cols-[2.25rem_1fr] sm:grid-cols-[3rem_1fr] gap-x-3 sm:gap-x-5">
              <span
                className="pt-1.5 font-sans text-sm sm:text-base font-semibold tabular-nums text-[var(--chestnut)]"
                aria-hidden="true"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <section className="min-w-0 border-t border-[var(--hairline)] pt-4">
                <h2 className="font-display font-normal text-[length:clamp(1.6rem,2.4vw,2.1rem)] leading-[1.15] tracking-[-0.01em] text-[var(--black)]">
                  {section.heading}
                </h2>

                {section.body?.map((para) => (
                  <p key={para} className="mt-4 font-sans text-[1.0625rem] leading-[1.75] text-[var(--charcoal)]">
                    {withEmailLink(para)}
                  </p>
                ))}

                {section.items && (
                  <ul className="mt-4 space-y-3.5">
                    {section.items.map((item) => (
                      <li
                        key={item.text}
                        className="relative ps-5 font-sans text-[1.0625rem] leading-[1.75] text-[var(--charcoal)]"
                      >
                        <span
                          className="absolute start-0 top-[0.72em] size-1.5 rotate-45 bg-[var(--terracotta)]"
                          aria-hidden="true"
                        />
                        {item.term && (
                          <strong className="font-semibold text-[var(--black)]">{item.term}: </strong>
                        )}
                        {withEmailLink(item.text)}
                      </li>
                    ))}
                  </ul>
                )}

                {section.confirmTag && (
                  <div className="pt-3">
                    <Confirm label={section.confirmTag} />
                  </div>
                )}
              </section>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
