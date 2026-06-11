import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Complete metadata for a subpage. Next.js merges metadata between layout and
 * page shallowly, so `openGraph`/`twitter` must be fully re-specified here —
 * otherwise the layout's images and siteName would be dropped.
 */
type PageNamespace =
  | "ExperiencePage"
  | "HackathonsPage"
  | "InterestsPage"
  | "ContactPage";

export async function buildPageMetadata({
  locale,
  path,
  namespace,
}: {
  locale: Locale;
  path: `/${string}`;
  namespace: PageNamespace;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const title = t("meta.title");
  const description = t("meta.description");
  const url = `/${locale}${path}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
        "x-default": `/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: tMeta("ogAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
