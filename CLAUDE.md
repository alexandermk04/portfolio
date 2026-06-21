@AGENTS.md

# Portfolio of Alexander Kranz

Bilingual (de/en) personal portfolio at alexanderkranz.de. Multi-page site: a hub
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
| `/hackathons` | Ticket-style cards, paginated 4 at a time (minimalistic arrow controls) + Europe map of all locations |
| `/interests` | Stats strip, alternating image/text feature rows (mountaineering w/ Ecuador peak list, scuba diving, marathons w/ embedded mini map), language cards. Photos use the `availableImages` existence-check placeholder pattern |
| `/contact` | Portrait (placeholder until `public/portrait.jpeg` exists), intro, all contact options |
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
  deep teal `#1d7a80`. Rule: no additional accent colors, no gradient text.
- Fonts: Fraunces (`font-display`, headings), Plus Jakarta Sans (`font-sans`, body),
  mono (`font-mono`) as a stylistic accent on the hackathons page.
- Scroll animations via `components/Reveal.tsx`; always respect `useReducedMotion`.
- Shared map: `components/LocationMap.tsx` renders the stylized Europe SVG from
  `lib/mapData.ts` (real lon/lat, equirectangular projection — extent is adjustable).

## Commands

- `npm run dev` / `npm run build` / `npm run lint`

## Open TODOs (placeholder content the owner still needs to replace)

- Hackathon entries in `HackathonsPage.items` (both message files)
- Interest photos at `public/interests/{mountaineering,diving,marathon}.jpg` (interests page shows glyph placeholders until then)
- Ecuador peaks/elevations + interest copy in `InterestsPage.adventures` (placeholder peaks — confirm which you summited)
- Language levels in `InterestsPage.languages`
- Marathon cities/years in `InterestsPage.marathons`
- Exact start months (`start` fields) in `ExperiencePage.items` (years correct, months estimated)
- LinkedIn/GitHub URLs in `config/site.ts`
- Portrait photo at `public/portrait.jpeg` (contact page shows a placeholder until then)
- **Legal:** real postal address in `siteConfig.imprint` — the `/imprint` page is required by German law and currently shows a placeholder address
