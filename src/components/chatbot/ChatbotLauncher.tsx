"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MessageCircleQuestion, X } from "lucide-react";

// The panel and its knowledge base load only when the visitor first opens the chat,
// so they add nothing to the initial page weight.
const ChatPanel = dynamic(() => import("./ChatPanel").then((m) => m.ChatPanel), { ssr: false });

/** Floating bottom-right chat button (replaces the old WhatsApp pill). */
export function ChatbotLauncher() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Shrinks to the round icon while the footer's bottom line is on screen, so it never covers it.
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const line = document.querySelector("[data-footer-bottom]");
    if (!line) return;
    const io = new IntersectionObserver(([entry]) => setCompact(entry.isIntersecting));
    io.observe(line);
    return () => io.disconnect();
  }, []);

  function openChat() {
    setLoaded(true);
    setOpen(true); // ChatPanel focuses its input when it opens.
  }

  function closeChat() {
    setOpen(false);
    // After re-render: on phones the launcher is hidden while the sheet is open.
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }

  return (
    <>
      {loaded && <ChatPanel open={open} onClose={closeChat} inputRef={inputRef} />}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? closeChat() : openChat())}
        className={`floating-chat${open ? " is-open" : ""}${compact && !open ? " is-compact" : ""}`}
        aria-expanded={open}
        aria-controls="naqsh-chat-panel"
        aria-label={open ? "Close chat" : "Open chat: ask NAQSH a question"}
      >
        <span className="floating-chat-icon" aria-hidden="true">
          {open ? <X className="size-5" /> : <MessageCircleQuestion className="size-[1.375rem]" />}
        </span>
        <span className="floating-chat-copy" aria-hidden="true">
          <strong>Ask NAQSH</strong>
          <small>Questions? Chat with us</small>
        </span>
      </button>
    </>
  );
}
