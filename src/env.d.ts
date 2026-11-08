interface ImportMetaEnv {
  /** Web3Forms access key for the "Let's talk teaming" contact form. */
  readonly VITE_WEB3FORMS_CONTACT_ACCESS_KEY?: string;
  /** Web3Forms access key for the footer mailing-list signup. */
  readonly VITE_WEB3FORMS_NEWSLETTER_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
