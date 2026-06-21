import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/PageHeader";
import { InterestsContent } from "./InterestsContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/interests",
    namespace: "InterestsPage",
  });
}

export default async function InterestsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("InterestsPage");

  // Mirror the contact/projects pattern: only surface a photo once the file
  // actually exists in /public, otherwise the row shows a glyph placeholder.
  const adventures = t.raw("adventures.items") as { image?: string }[];
  const availableImages = adventures
    .map((a) => a.image)
    .filter(
      (src): src is string =>
        Boolean(src) && existsSync(join(process.cwd(), "public", src!)),
    );

  return (
    <>
      <PageHeader title={t("heading")} lead={t("subheading")} />
      <InterestsContent availableImages={availableImages} />
    </>
  );
}
