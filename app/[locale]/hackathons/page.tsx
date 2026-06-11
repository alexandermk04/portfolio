import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/PageHeader";
import { HackathonContent } from "./HackathonContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/hackathons",
    namespace: "HackathonsPage",
  });
}

export default async function HackathonsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("HackathonsPage");

  return (
    <>
      <PageHeader title={t("heading")} lead={t("subheading")} />
      <HackathonContent />
    </>
  );
}
