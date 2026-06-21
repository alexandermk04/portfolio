import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/PageHeader";
import { ProjectsContent } from "./ProjectsContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/projects",
    namespace: "ProjectsPage",
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("ProjectsPage");

  // Mirror the contact-page portrait pattern: only surface an image once the
  // file actually exists in /public, otherwise the card shows a placeholder.
  const projects = t.raw("projects") as { image?: string }[];
  const availableImages = projects
    .map((p) => p.image)
    .filter(
      (src): src is string =>
        Boolean(src) && existsSync(join(process.cwd(), "public", src!)),
    );

  return (
    <>
      <PageHeader title={t("heading")} lead={t("subheading")} />
      <ProjectsContent availableImages={availableImages} />
    </>
  );
}
