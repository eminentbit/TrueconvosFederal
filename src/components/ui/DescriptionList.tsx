import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface DescriptionItemProps {
  term: ReactNode;
  children: ReactNode;
  tone?: "default" | "brand";
  className?: string;
}

/** A labelled fact (dt/dd pair). Render inside a <dl>. */
export function DescriptionItem({
  term,
  children,
  tone = "default",
  className,
}: DescriptionItemProps) {
  return (
    <div className={className}>
      <dt
        className={cn(
          "text-label tracking-label uppercase",
          tone === "brand" ? "text-on-brand-muted" : "text-muted",
        )}
      >
        {term}
      </dt>
      <dd className="mt-1 text-lg font-semibold">{children}</dd>
    </div>
  );
}
