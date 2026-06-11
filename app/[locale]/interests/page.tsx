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

  return (
    <>
      <PageHeader title={t("heading")} lead={t("subheading")} />
      <InterestsContent />
    </>
  );
}
