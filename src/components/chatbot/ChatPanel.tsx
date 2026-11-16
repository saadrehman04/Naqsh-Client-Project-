"use client";

import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import Link from "next/link";
import { ArrowUpRight, SendHorizontal, X } from "lucide-react";
import { answer } from "@/lib/chatbot/engine";
import { starterQuestions } from "@/lib/chatbot/knowledge";
import { DISPLAY_PHONE, getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  link?: { label: string; href: string };
  /** Follow-up question chips. */
  chips?: string[];
  /** Set on fallback replies: the visitor's question, prefilled into WhatsApp. */
  whatsappQuestion?: string;
}

const WELCOME: Message = {
  id: 0,
  from: "bot",
  text: "Assalam-o-Alaikum! I'm the NAQSH assistant. Ask me about our services, gift collections, customization, delivery or ordering.",
  chips: starterQuestions,
};

// Non-breaking hyphens keep the phone number on one line.
const PHONE_NOWRAP = DISPLAY_PHONE.replace(/-/g, "\u2011");
const FALLBACK_TEXT = `I don't have an answer to that here. Our team will be glad to help you directly on WhatsApp at ${PHONE_NOWRAP}.`;

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

/**
 * Chat window. Answers come from the built-in engine (src/lib/chatbot); anything it cannot
 * answer confidently is referred to WhatsApp with the visitor's question prefilled.
 */
export function ChatPanel({ open, onClose, inputRef }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const logRef = useRef<HTMLDivElement>(null);

  // Focus the input whenever the panel opens (also after the lazy first load).
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, inputRef]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function ask(question: string) {
    const q = question.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: q }]);
    setDraft("");
    setTyping(true);

    const reply = answer(q);
    let message: Message;
    if (reply.kind === "answer") {
      message = {
        id: nextId.current++,
        from: "bot",
        text: reply.entry.answer,
        link: reply.entry.link,
        chips: reply.related.map((r) => r.question),
      };
    } else if (reply.kind === "smalltalk") {
      message = { id: nextId.current++, from: "bot", text: reply.text };
    } else {
      message = { id: nextId.current++, from: "bot", text: FALLBACK_TEXT, whatsappQuestion: q };
    }

    // A short pause reads as a reply rather than an instant swap.
    window.setTimeout(() => {
      setMessages((m) => [...m, message]);
      setTyping(false);
    }, 450);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(draft);
  }

  const lastBotId = [...messages].reverse().find((m) => m.from === "bot")?.id;

  return (
    <div
      id="naqsh-chat-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="naqsh-chat-title"
      hidden={!open}
      className="chat-panel"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-[var(--black)] px-4 py-3.5 text-[var(--ivory)]">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--terracotta-on-dark)]/70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/emblem-ivory.svg" alt="" className="h-6 w-auto" />
        </span>
        <div className="min-w-0 flex-1">
          <p id="naqsh-chat-title" className="font-display text-[1.25rem] leading-tight">
            Ask NAQSH
          </p>
          <p className="font-sans text-[0.75rem] text-[var(--ivory)]/70">
            Answers about our gifting services
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-full text-[var(--ivory)]/80 transition-colors hover:bg-[var(--ivory)]/10 hover:text-[var(--ivory)] focus-visible:outline-2 focus-visible:outline-[var(--ivory)]"
          aria-label="Close chat"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
        data-lenis-prevent
        className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 space-y-4"
      >
        {messages.map((m) => (
          <div key={m.id} className={cn("flex flex-col", m.from === "user" ? "items-end" : "items-start")}>
            <div
              className={cn(
                "max-w-[88%] whitespace-pre-line rounded-2xl px-4 py-3 font-sans text-[0.9375rem] leading-[1.6]",
                m.from === "user"
                  ? "rounded-ee-md bg-[var(--terracotta)] text-[var(--ivory)]"
                  : "rounded-es-md bg-[var(--ivory-deep)] text-[var(--charcoal)]"
              )}
            >
              <span className="sr-only">{m.from === "user" ? "You: " : "NAQSH assistant: "}</span>
              {m.text}
            </div>

            {(m.link || m.whatsappQuestion) && (
              <div className="mt-2 flex flex-wrap gap-2">
                {m.whatsappQuestion && (
                  <a
                    href={getWhatsAppUrl(`Hello Naqsh, I have a question: ${m.whatsappQuestion}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chat-action chat-action--solid"
                  >
                    Chat on WhatsApp
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                )}
                {m.link && (
                  <Link href={m.link.href} className="chat-action">
                    {m.link.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                )}
              </div>
            )}

            {m.chips && m.chips.length > 0 && m.id === lastBotId && !typing && (
              <div className="mt-3 flex flex-wrap gap-2" aria-label="Suggested questions">
                {m.chips.map((c) => (
                  <button key={c} type="button" onClick={() => ask(c)} className="chat-chip">
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {typing && (
          <div className="flex items-center gap-1.5 rounded-2xl rounded-es-md bg-[var(--ivory-deep)] px-4 py-3.5 w-fit" aria-label="NAQSH assistant is typing">
            <span className="chat-dot" />
            <span className="chat-dot [animation-delay:150ms]" />
            <span className="chat-dot [animation-delay:300ms]" />
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={onSubmit} className="border-t border-[var(--hairline)] bg-[var(--ivory)] p-3">
        <div className="flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--ivory)] ps-4 pe-1.5 focus-within:border-[var(--terracotta)]">
          <label htmlFor="naqsh-chat-input" className="sr-only">
            Type your question
          </label>
          <input
            ref={inputRef}
            id="naqsh-chat-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type your question…"
            autoComplete="off"
            maxLength={300}
            className="min-w-0 flex-1 bg-transparent py-3 font-sans text-[0.9375rem] text-[var(--black)] placeholder:text-[var(--charcoal)]/70 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!draft.trim() || typing}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--terracotta)] text-[var(--ivory)] transition-colors hover:bg-[var(--chestnut)] disabled:opacity-40"
            aria-label="Send question"
          >
            <SendHorizontal className="size-[1.125rem] rtl:-scale-x-100" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-center font-sans text-[0.75rem] text-[var(--charcoal)]">
          Prefer a person?{" "}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--chestnut)] underline-offset-2 hover:underline"
          >
            WhatsApp {DISPLAY_PHONE}
          </a>
        </p>
      </form>
    </div>
  );
}
