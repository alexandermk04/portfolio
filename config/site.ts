/**
 * Central place for personal data and links.
 * Update these values with your real URLs / email before deploying.
 */
export const siteConfig = {
  name: "Alexander Kranz",
  // Used for canonical URLs, sitemap, Open Graph. Override via NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexander.kranz.eu",
  email: "alexanderkranz.contact@gmail.com",
  linkedin: "https://www.linkedin.com/in/alex-kranz",
  github: "https://github.com/alexandermk04",
  location: {
    city: "Berlin",
    country: "DE",
  },
  // Legal data shown in the Impressum (/imprint). Required by German law
  // (§ 5 DDG).
  imprint: {
    name: "Alexander Kranz",
    street: "Husumweg 13",
    postalCode: "22926",
    city: "Ahrensburg",
  },
} as const;
