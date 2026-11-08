import { StrictMode } from "react";
import { prerender } from "react-dom/static";

import { App } from "@/app/App";

/**
 * Build-time render used by scripts/prerender.ts. `prerender` waits for the
 * whole tree (including any future Suspense boundaries) before resolving.
 */
export async function render(): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  return new Response(prelude).text();
}
