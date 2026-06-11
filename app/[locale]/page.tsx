import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "./sections/Hero";
import { AboutLead } from "./sections/AboutLead";
import { Teasers } from "./sections/Teasers";
import { Contact } from "./sections/Contact";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <AboutLead />
      <Teasers />
      <Contact />
    </>
  );
}
