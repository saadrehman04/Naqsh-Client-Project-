export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[var(--ivory)] focus:text-[var(--text-strong)] focus:border focus:border-[var(--pine)] focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
