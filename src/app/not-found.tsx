import Link from "next/link";
import { Emblem } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-24 container-x">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center mb-6">
          <Emblem variant="copper" className="w-16 opacity-80" />
        </div>
        <p className="t-label text-[var(--pine)]">404 · Not Found</p>
        <h1 className="t-h2 text-[var(--text-strong)]">
          This page has not been wrapped yet.
        </h1>
        <p className="text-[var(--text)] text-base sm:text-lg font-light leading-relaxed">
          The page you are looking for is not here. Perhaps it has been moved or is
          still being curated.
        </p>
        <div className="pt-4">
          <Button href="/" variant="primary">
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}
