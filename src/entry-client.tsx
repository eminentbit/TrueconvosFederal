import "@fontsource-variable/public-sans/wght.css";
import "@/styles/globals.css";

import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import { App } from "@/app/App";

const container = document.getElementById("root");
if (!container) throw new Error("Missing #root element in index.html");

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production builds ship prerendered markup (scripts/prerender.ts), so we
// hydrate it. The dev server serves an empty shell, so we render from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
