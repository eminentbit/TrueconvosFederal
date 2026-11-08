import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

// 16px text keeps iOS Safari from zooming the page when a field is focused.
const controlStyles =
  "w-full rounded-md border border-field bg-white p-3 text-base font-normal text-brand placeholder:text-muted user-invalid:border-danger";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input className={cn(controlStyles, "min-h-11", className)} {...props} />
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea className={cn(controlStyles, "resize-y", className)} {...props} />
  );
}

interface FieldProps {
  label: ReactNode;
  /** A single form control; the wrapping <label> associates it implicitly. */
  children: ReactNode;
  className?: string;
}

export function Field({ label, children, className }: FieldProps) {
  return (
    <label
      className={cn("flex flex-col gap-1.5 text-ui font-semibold", className)}
    >
      {label}
      {children}
    </label>
  );
}

/**
 * Formspree honeypot. Hidden from people and assistive tech; bots that fill
 * it in are discarded server-side.
 */
export function Honeypot() {
  return (
    <input
      type="text"
      name="_gotcha"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="hidden"
    />
  );
}
