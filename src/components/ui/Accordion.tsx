"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Confirm } from "./Confirm";

interface AccordionItemProps {
  id?: string;
  question: string;
  answer: string;
  confirmTag?: string;
  name?: string;
  defaultOpen?: boolean;
}

export function AccordionItem({
  id,
  question,
  answer,
  confirmTag,
  name,
  defaultOpen = false,
}: AccordionItemProps) {
  return (
    <details
      id={id}
      name={name}
      open={defaultOpen}
      className={cn(
        "faq-item group border-b border-[var(--hairline)] py-5 sm:py-6 transition-colors duration-300"
      )}
    >
      <summary className="flex items-center justify-between gap-4 cursor-pointer select-none text-left">
        <span className="font-serif text-xl sm:text-2xl text-[var(--text-strong)] group-hover:text-[var(--chestnut)] transition-colors duration-200 leading-snug">
          {question}
        </span>
        <span
          className="faq-icon flex-none w-8 h-8 rounded-full border border-[var(--hairline)] flex items-center justify-center text-[var(--charcoal)] group-hover:border-[var(--chestnut)] group-hover:text-[var(--chestnut)] transition-colors duration-200"
          aria-hidden="true"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1V11M1 6H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </summary>

      <div className="faq-content-grid grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[var(--ease-out)]">
        <div className="overflow-hidden">
          <div className="pt-3 pb-2 text-[var(--text)] text-base sm:text-lg leading-relaxed max-w-prose">
            <p>{answer}</p>
            {confirmTag && (
              <div className="mt-2">
                <Confirm label={confirmTag} />
              </div>
            )}
          </div>
        </div>
      </div>
    </details>
  );
}

interface AccordionGroupProps {
  items: {
    id: string;
    question: string;
    answer: string;
    confirmTag?: string;
  }[];
  groupName?: string;
  className?: string;
}

export function AccordionGroup({
  items,
  groupName = "faq-group",
  className,
}: AccordionGroupProps) {
  return (
    <div
      className={cn(
        "divide-y divide-[var(--hairline)] border-t border-[var(--hairline)]",
        className
      )}
      data-reveal="stagger"
      data-stagger="0.08"
    >
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id || idx}
          id={item.id}
          name={groupName}
          question={item.question}
          answer={item.answer}
          confirmTag={item.confirmTag}
        />
      ))}
    </div>
  );
}
