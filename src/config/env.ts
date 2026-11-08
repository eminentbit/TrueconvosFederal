import { readAccessKey } from "@/lib/web3forms";

/**
 * Typed access to build-time environment variables.
 * Declarations live in src/env.d.ts; values come from .env* files or CI.
 */
export const formAccessKeys = {
  contact: readAccessKey(import.meta.env.VITE_WEB3FORMS_CONTACT_ACCESS_KEY),
  newsletter: readAccessKey(
    import.meta.env.VITE_WEB3FORMS_NEWSLETTER_ACCESS_KEY,
  ),
} as const;
