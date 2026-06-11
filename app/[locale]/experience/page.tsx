import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/PageHeader";
import { Timeline } from "./Timeline";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/experience",
    namespace: "ExperiencePage",
  });
}

export default async function ExperiencePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("ExperiencePage");

  return (
    <>
      <PageHeader title={t("heading")} lead={t("intro")} />
      <Timeline />
    </>
  );
}
