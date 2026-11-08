import { getFormspreeEndpoint } from "@/lib/formspree";

/**
 * Typed, validated access to build-time environment variables.
 * Declarations live in src/env.d.ts; values come from .env* files or CI.
 */
export const formEndpoints = {
  contact: getFormspreeEndpoint(import.meta.env.VITE_FORMSPREE_CONTACT_FORM_ID),
  newsletter: getFormspreeEndpoint(
    import.meta.env.VITE_FORMSPREE_NEWSLETTER_FORM_ID,
  ),
} as const;
