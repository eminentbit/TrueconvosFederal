import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default scale. Without this, custom
 * tokens like `text-lead` are mistaken for colors and silently dropped when
 * combined with `text-white`. Keep in sync with `@theme` in globals.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "label",
        "ui",
        "lead",
        "card-title",
        "stat",
        "section-title",
        "display",
      ],
      tracking: ["eyebrow", "label"],
      container: ["page", "headline", "narrow"],
    },
  },
});

/** Compose conditional class names; later Tailwind classes win conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
