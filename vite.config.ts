/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";

import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

/** Variables the production bundle needs for the contact + newsletter forms. */
const PRODUCTION_ENV_KEYS = [
  "VITE_FORMSPREE_CONTACT_FORM_ID",
  "VITE_FORMSPREE_NEWSLETTER_FORM_ID",
] as const;

// https://vite.dev/config/
export default defineConfig(({ command, mode, isSsrBuild }) => {
  if (command === "build" && !isSsrBuild) {
    const env = loadEnv(mode, process.cwd(), "VITE_");
    const missing = PRODUCTION_ENV_KEYS.filter((key) => !env[key]?.trim());

    if (missing.length > 0) {
      console.warn(
        `\n⚠  Missing ${missing.join(", ")}. The affected forms will show an ` +
          `"unavailable" message until these are set (see .env.example).\n`,
      );
    }
  }

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
      css: false,
      restoreMocks: true,
      unstubGlobals: true,
    },
  };
});
