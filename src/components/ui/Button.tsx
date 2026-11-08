import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "accent";
type Size = "sm" | "md" | "lg";

interface StyleProps {
  variant?: Variant;
  size?: Size;
}

// Every variant carries a 2px border so outlined and filled buttons line up.
const baseStyles =
  "inline-flex items-center justify-center rounded-md border-2 font-semibold no-underline transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-70";

const variantStyles: Record<Variant, string> = {
  primary:
    "border-brand bg-brand text-white hover:border-brand-hover hover:bg-brand-hover hover:text-white",
  outline:
    "border-brand bg-transparent text-brand hover:bg-brand hover:text-white",
  accent:
    "border-accent bg-accent text-brand hover:border-accent-hover hover:bg-accent-hover hover:text-brand",
};

const sizeStyles: Record<Size, string> = {
  sm: "min-h-11 px-4.5 py-2.5 text-base",
  md: "min-h-12 px-5.5 py-2.5 text-base",
  lg: "min-h-12 px-6.5 py-3 text-lead",
};

function buttonStyles({
  variant = "primary",
  size = "lg",
  className,
}: StyleProps & { className?: string | undefined }) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}

/** An anchor styled as a button — for navigation, downloads and CTAs. */
export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: ComponentProps<"a"> & StyleProps) {
  return (
    <a className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </a>
  );
}
