interface ImportMetaEnv {
  /** Formspree form ID for the contact form (the part after /f/). */
  readonly VITE_FORMSPREE_CONTACT_FORM_ID?: string;
  /** Formspree form ID for the footer newsletter signup. */
  readonly VITE_FORMSPREE_NEWSLETTER_FORM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
