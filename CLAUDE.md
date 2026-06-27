@AGENTS.md

# Portfolio of Alexander Kranz

Bilingual (de/en) personal portfolio at alexander.kranz.eu. Multi-page site: a hub
homepage plus dedicated subpages, each with its own layout and design.

## Stack

- **Next.js 16 App Router** — `params`/`searchParams` are Promises (`await` them).
  Consult `node_modules/next/dist/docs/` before using unfamiliar APIs (see AGENTS.md).
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** — theme tokens live in `@theme` in `app/globals.css`; there is
  no tailwind.config file.
- **Motion** (`motion/react`) for animations; shared easing in `lib/motion.ts`.
- **next-intl 4** — locales `de` (default) + `en`, `localePrefix: "always"`;
  middleware lives in `proxy.ts` (Next 16 convention).
- No UI libraries. Do not add runtime dependencies without asking.

## Routes

| Route | Content |
|---|---|
| `/` | Hero ("Moin, I'm Alex"), about lead + facts, teaser cards, short contact section (`#contact`) |
| `/experience` | Dual-thread vertical timeline: both rails centered, work cards left / education right, knot spacing proportional to elapsed time (`start` fields), mobile merged with badges |
| `/projects` | Filterable project grid: category chips (all/club/coding/academic) with a shared sliding pill (Motion `layoutId`) + animated grid reflow; image cards with a glyph-placeholder fallback |
| `/hackathons` | Ticket-style cards, paginated 4 at a time (minimalistic arrow controls) + Europe map of all locations |
| `/interests` | Stats strip, alternating image/text feature rows (mountaineering w/ Ecuador peak list, scuba diving, marathons w/ embedded mini map), language cards. Photos use the `availableImages` existence-check placeholder pattern |
| `/contact` | Portrait (`public/portrait.jpeg`), intro, all contact options |
| `/imprint` | German legal notice (Impressum, § 5 DDG). `noindex`. Address comes from `siteConfig.imprint`; linked from the footer |

The homepage `#contact` section is the short version; the full version is `/contact`.
Each page: server `page.tsx` (awaits params, calls `setRequestLocale`, builds
metadata via `buildPageMetadata` in `lib/metadata.ts`) + a client content component.

## i18n workflow

- ALL copy lives in `messages/de.json` and `messages/en.json`. The two files must
  stay key-identical — always edit both.
- Structured content (arrays/objects) is read with `t.raw(...)` and typed locally
  in the consuming component.
- Stable data keys (e.g. map city ids in `city` fields) are referenced from TS —
  coordinates live in `lib/mapData.ts` (`CITY_COORDS`), not in messages.
- Navigation always via `Link`/`usePathname` from `@/i18n/navigation`, never
  `next/link` (except locale-independent files like `not-found.tsx`).

## Design system

- Warm cream background `#fbf7f0`, dark brown text `#2a2520`, **one accent**:
  deep teal `#176b70`. Rule: no additional accent colors, no gradient text.
- Fonts: Fraunces (`font-display`, headings), Plus Jakarta Sans (`font-sans`, body),
  mono (`font-mono`) as a stylistic accent on the hackathons page.
- Scroll animations via `components/Reveal.tsx`; always respect `useReducedMotion`.
- Shared map: `components/LocationMap.tsx` renders the stylized Europe SVG from
  `lib/mapData.ts` (real lon/lat, equirectangular projection — extent is adjustable).

## Commands

- `npm run dev` / `npm run build` / `npm run lint`

## Performance

- Every page is statically prerendered (SSG via `generateStaticParams`); the
  homepage ships **zero Motion JS**. Set `NEXT_PUBLIC_SITE_URL` in production so
  canonical / `og:image` URLs resolve to `alexander.kranz.eu` (otherwise the
  build falls back to that domain via `siteConfig.url`, and unset metadata bases
  warn with `localhost:3000`).
- Validated against a production build (localhost, 2026-06): TTFB <5 ms
  server-render, FCP ~80–480 ms, homepage HTML ~55 KB. Real-world load is
  network/CDN-bound, not compute-bound.
- **Above-the-fold entrances must not gate content behind `opacity:0`.** The
  hero's `.animate-in` uses the movement-only `rise-in` keyframe (no opacity) so
  server-rendered text is fully legible at first paint. The previous opacity fade
  made the hero text appear ~3 s after the background/header on slower loads,
  because a CSS load animation's clock starts at first paint. `.animate-in` also
  sets `will-change: transform` so the entrance runs on the compositor — without
  it the staggered transform competes with hydration JS for the main thread,
  stalls at the `from` offset, then snaps up when hydration finishes (a visible
  "jump"). Scroll reveals (`.reveal`) and the hero role-swap still fade via
  `enter-up` — fine below the fold. Always respect `useReducedMotion` /
  `prefers-reduced-motion` (CSS falls back to fully visible).

## Maintaining this file

Every change to the app must keep this CLAUDE.md coherent. When you add or rename
a route, change the stack, move config, or alter a design/performance rule, update
the relevant section here **in the same change** — a stale CLAUDE.md is a bug.
