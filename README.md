# Alexander Kranz — Personal Portfolio

Bilingual (🇩🇪 / 🇬🇧) personal website built to showcase skills and interests and to rank
for "Alexander Kranz" on Google.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · next-intl ·
deployed on Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /de)
npm run build    # production build
npm run lint
```

Routes: `/de` (default) and `/en`. Language toggle lives in the top navigation.

## Where to edit things

| What | Where |
| --- | --- |
| All page copy (both languages) | `messages/de.json`, `messages/en.json` |
| Personal links (LinkedIn, GitHub, email, domain) | `config/site.ts` |
| Colors, fonts, animations | `app/globals.css` (`@theme` block) |
| Page sections | `app/[locale]/sections/*` |
| SEO metadata & JSON-LD | `app/[locale]/layout.tsx`, `components/PersonJsonLd.tsx` |
| Social share image | `app/opengraph-image.tsx` |
| sitemap / robots | `app/sitemap.ts`, `app/robots.ts` |

### ⚠️ Before deploying — fill in real values

In `config/site.ts`: confirm `linkedin`, `github`, `email`, and `url` (your real domain).
The experience **dates** in `messages/*.json` are estimates — correct them.

Set the canonical site URL via env (used for canonical tags, sitemap, OG):

```
NEXT_PUBLIC_SITE_URL=https://your-domain.tld
```

## Deploy on Vercel + IONOS domain

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com) → **Add New Project** → import the repo (framework
   auto-detected as Next.js). Add the `NEXT_PUBLIC_SITE_URL` env var. Deploy.
3. In Vercel → **Project → Settings → Domains**, add your IONOS domain (and `www`).
4. In the **IONOS** DNS panel, set the records Vercel shows you — typically:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
   Wait for DNS to propagate; Vercel issues HTTPS automatically.
5. After it's live, submit the domain to **Google Search Console** and add the sitemap
   (`https://your-domain.tld/sitemap.xml`) to get indexed faster.

> Note: We deploy on Vercel (not IONOS static webspace) so we keep full Next.js features —
> server-rendered SEO metadata, on-the-fly OG image, and preview deployments.
