import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await buildPageMetadata({
    locale: locale as Locale,
    path: "/imprint",
    namespace: "ImprintPage",
  });
  // Legal notice: useful to humans, not worth indexing.
  return { ...meta, robots: { index: false, follow: true } };
}

export default async function ImprintPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("ImprintPage");
  const { imprint, email } = siteConfig;

  return (
    <>
      <PageHeader title={t("heading")} lead={t("intro")} />
      <div className="px-5 pb-20 pt-6 sm:pb-28">
        <div className="mx-auto max-w-2xl space-y-10">
          <Reveal>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                {t("providerHeading")}
              </h2>
              <address className="mt-3 not-italic leading-relaxed text-fg">
                {imprint.name}
                <br />
                {imprint.street}
                <br />
                {imprint.postalCode} {imprint.city}
              </address>
            </section>
          </Reveal>

          <Reveal delay={0.06}>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                {t("contactHeading")}
              </h2>
              <p className="mt-3 leading-relaxed text-fg">
                {t("emailLabel")}:{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-accent transition-colors hover:text-fg"
                >
                  {email}
                </a>
              </p>
            </section>
          </Reveal>

          <Reveal delay={0.12}>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                {t("responsibleHeading")}
              </h2>
              <address className="mt-3 not-italic leading-relaxed text-fg">
                {imprint.name}
                <br />
                {imprint.street}
                <br />
                {imprint.postalCode} {imprint.city}
              </address>
            </section>
          </Reveal>

          <Reveal delay={0.18}>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                {t("disclaimerHeading")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t("disclaimer")}
              </p>
            </section>
          </Reveal>
        </div>
      </div>
    </>
  );
}
