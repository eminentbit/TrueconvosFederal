import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

import { Container } from "./Container";

export type SectionTone = "default" | "muted" | "brand";

const toneStyles: Record<SectionTone, string> = {
  default: "bg-white",
  muted: "bg-surface",
  brand: "bg-brand text-white",
};

interface SectionProps extends ComponentProps<"section"> {
  tone?: SectionTone;
  /** Classes for the inner page-width container (spacing, layout). */
  containerClassName?: string;
}

/** Full-bleed page band with a centered, padded content column. */
export function Section({
  tone = "default",
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(toneStyles[tone], className)} {...props}>
      <Container className={cn("py-16 md:py-24", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
