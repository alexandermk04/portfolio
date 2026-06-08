/**
 * Central place for personal data and links.
 * Update these values with your real URLs / email before deploying.
 */
export const siteConfig = {
  name: "Alexander Kranz",
  // Used for canonical URLs, sitemap, Open Graph. Override via NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexanderkranz.de",
  email: "alexanderkranz007@gmail.com",
  // TODO: confirm these handles/URLs
  linkedin: "https://www.linkedin.com/in/alexander-kranz",
  github: "https://github.com/alexanderkranz",
  location: {
    city: "Hamburg",
    country: "DE",
  },
} as const;
