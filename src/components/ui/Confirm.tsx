import React from "react";

interface ConfirmProps {
  label: string;
  fallback?: React.ReactNode;
  className?: string;
}

export function Confirm({ label, fallback = null, className }: ConfirmProps) {
  // Only display in development environment
  if (process.env.NODE_ENV !== "development") {
    return <>{fallback}</>;
  }

  return (
    <span
      className={`confirm-flag ${className || ""}`}
      title={`Confirm with client: ${label}`}
      data-confirm={label}
    >
      [CONFIRM: {label}]
    </span>
  );
}
