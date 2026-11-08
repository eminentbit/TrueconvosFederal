import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import type { SectionTone } from "./Section";

interface EyebrowProps {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
}

/** Small uppercase kicker shown above section titles. */
export function Eyebrow({
  children,
  tone = "default",
  className,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "text-sm font-bold tracking-eyebrow uppercase",
        tone === "brand" ? "text-on-brand-muted" : "text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Gold 64×4 accent bar used above key headlines. */
export function AccentRule({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("h-1 w-16 bg-accent", className)} />
  );
}

interface SectionHeadingProps {
  /** Used as the section's accessible name via `aria-labelledby`. */
  id: string;
  title: ReactNode;
  eyebrow?: ReactNode;
  tone?: SectionTone;
  className?: string;
}

export function SectionHeading({
  id,
  title,
  eyebrow,
  tone = "default",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-narrow flex-col gap-4", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <SectionTitle id={id}>{title}</SectionTitle>
    </div>
  );
}

export function SectionTitle({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <h2 id={id} className="text-section-title font-extrabold">
      {children}
    </h2>
  );
}
