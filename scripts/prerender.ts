/**
 * Static prerender (SSG) step, run after `build:client` and `build:ssr`.
 *
 * Renders <App /> to HTML with the server bundle and injects it into
 * dist/index.html, so crawlers, link previews and no-JS visitors get the full
 * page — and both forms still POST natively to Formspree without JavaScript.
 * The client entry then hydrates this markup instead of re-rendering it.
 */
import { readFile, rm, writeFile } from "node:fs/promises";

const PLACEHOLDER = "<!--app-html-->";

const root = new URL("../", import.meta.url);
const templateUrl = new URL("dist/index.html", root);
const ssrDir = new URL("dist-ssr/", root);

const { render } = (await import(new URL("entry-server.js", ssrDir).href)) as {
  render: () => Promise<string>;
};

const template = await readFile(templateUrl, "utf8");

if (!template.includes(PLACEHOLDER)) {
  throw new Error(`prerender: "${PLACEHOLDER}" not found in dist/index.html`);
}

const appHtml = await render();
// Function replacer so `$&`-style sequences in the markup are not interpreted.
await writeFile(
  templateUrl,
  template.replace(PLACEHOLDER, () => appHtml),
);
await rm(ssrDir, { recursive: true, force: true });

console.log(
  `✓ prerendered dist/index.html (${(appHtml.length / 1024).toFixed(1)} kB of markup)`,
);
