/** First focusable element on the page — lets keyboard users bypass the nav. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only font-semibold focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}
