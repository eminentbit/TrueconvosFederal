# TrueConvos Federal

Marketing site for TrueConvos Federal (TrueConvos LLC): DevOps, cloud and
platform engineering for federal programs.

**Stack:** React 19 (with React Compiler) · Vite 8 · Tailwind CSS 4 ·
TypeScript 7 · Vitest · oxlint · Prettier

The page is **prerendered at build time**: `dist/index.html` ships the full
HTML, which React then hydrates. Crawlers, link previews and visitors without
JavaScript get the complete page, and both forms still POST natively to
Web3Forms without JS.

## Getting started

Requires Node 22.18+ (Node 24 recommended; see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # add your Web3Forms access keys
npm run dev                  # http://localhost:5173
```

## Scripts

| Script            | What it does                                               |
| ----------------- | ---------------------------------------------------------- |
| `npm run dev`     | Dev server with HMR                                        |
| `npm run build`   | Typecheck → client build → SSR build → prerender → `dist/` |
| `npm run preview` | Serve the production build locally                         |
| `npm run check`   | Typecheck + lint + format check + tests (what CI runs)     |
| `npm test`        | Run tests once (`npm run test:watch` for watch mode)       |
| `npm run lint`    | oxlint (React, hooks, jsx-a11y, import, Vitest rules)      |
| `npm run format`  | Prettier (also sorts Tailwind classes)                     |

## Environment variables

| Variable                               | Web3Forms form                      | Used by                      |
| -------------------------------------- | ----------------------------------- | ---------------------------- |
| `VITE_WEB3FORMS_CONTACT_ACCESS_KEY`    | "TrueConvos Federal — Contact"      | "Let's talk teaming" form    |
| `VITE_WEB3FORMS_NEWSLETTER_ACCESS_KEY` | "TrueConvos Federal — Mailing list" | "Get teaming updates" signup |

Web3Forms access keys are public by design (they ship in the page's HTML),
so these are not secrets. If one is missing, the build prints a warning and
that form shows an "unavailable" message rather than failing silently. In CI,
set them as GitHub repository **variables**.

### Forms (Web3Forms)

Both forms post to `https://api.web3forms.com/submit`. The access key picks
the form. Subject lines, recipient and redirect URL are set **per form in the
Web3Forms dashboard**, not in code.

- Field `name`s in the contact form ("Name", "Organization", "How can we
  help?") are the labels in the notification email.
- `email` must stay **lowercase**: Web3Forms uses it as the Reply-To address.
- Spam: a hidden `botcheck` honeypot plus Web3Forms' server-side filtering.
- Free plan: 250 submissions/month across all forms.

## Project structure

```
├── public/                  # Copied as-is to dist/ (favicon, robots.txt, PDF)
├── scripts/prerender.ts     # Injects server-rendered HTML into dist/index.html
├── src/
│   ├── app/                 # App shell: composes layout + sections
│   ├── components/
│   │   ├── brand/           # Logo
│   │   ├── icons/           # SVG icon components
│   │   ├── layout/          # SkipLink, TopBar, SiteHeader, SiteFooter
│   │   └── ui/              # Design-system primitives (Button, Section, Field…)
│   ├── config/              # site.ts (company facts), env.ts (typed env)
│   ├── content/             # Typed page copy/data (capabilities, past performance…)
│   ├── features/            # Self-contained features (contact, newsletter)
│   ├── hooks/               # Reusable hooks (useWeb3Forms)
│   ├── lib/                 # Framework-agnostic helpers (cn, Web3Forms client)
│   ├── sections/            # One component per page section
│   ├── styles/globals.css   # Tailwind entry + design tokens (@theme)
│   ├── test/setup.ts        # Vitest + Testing Library setup
│   ├── entry-client.tsx     # Browser entry (hydrate / render)
│   └── entry-server.tsx     # Build-time render entry
└── legacy/index.html        # Original static page, kept for reference
```

Tests are colocated with the code they cover (`*.test.ts(x)`).

## Conventions

- **Absolute imports:** `@/` maps to `src/` (configured in both
  `tsconfig.app.json` and `vite.config.ts`, so keep them in sync).
  ```ts
  import { Button } from "@/components/ui";
  ```
- **Content vs. markup:** copy and data live in `src/content` and
  `src/config/site.ts`; components only render them. Company facts (UEI,
  CAGE, NAICS, contact info) are defined once in `site.ts`.
- **Design tokens:** colors, type sizes and widths are defined in `@theme`
  in `globals.css` (`bg-brand`, `text-lead`, `max-w-page`, …). If you add a
  custom `text-*`, `tracking-*` or `max-w-*` token, register it in
  `src/lib/cn.ts` too. Otherwise `tailwind-merge` may treat it as a color and
  drop it.
- **Named exports only**, and plain function components. React Compiler
  handles memoization, so don't add `useMemo`/`useCallback` by hand.
- **Adding a nav section:** give the section an `id`, then add it to
  `src/content/navigation.ts`. A test fails if a nav link points at a missing
  `id`.

## Deployment

`npm run build` outputs a fully static `dist/` that any static host can serve
(Vercel, Netlify, Cloudflare Pages, S3 + CloudFront, nginx). Recommended
host settings:

- `assets/*`: `Cache-Control: public, max-age=31536000, immutable`
  (file names are content-hashed)
- `index.html`: `Cache-Control: no-cache`
- Security headers: `Strict-Transport-Security`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and a CSP that allows
  `form-action` / `connect-src` to `https://api.web3forms.com`

## Before launch

- [ ] Add `public/TrueConvos-Federal-Capability-Statement.pdf` (both download
      links point to it)
- [ ] Set both Web3Forms access keys in CI (repository variables) and on the
      host (`.env.local` already has them for local testing)
- [ ] In Web3Forms, for **each** form: verify `bd@trueconvos.com` (link in that
      inbox), then switch the recipient from the Gmail test inbox to it
      (Settings → Email Configuration)
- [ ] In Web3Forms, change each form's Website URL from `localhost` to the real
      domain, and set a Redirect URL (used only by no-JS submissions)
- [ ] Delete `legacy/` once you no longer need the original for comparison
