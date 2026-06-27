import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

type Props = { params: Promise<{ locale: string }> };

type ContactOption = { id: "email" | "linkedin" | "github"; label: string; hint: string };

const OPTION_LINKS: Record<ContactOption["id"], { href: string; value: string; external: boolean }> = {
  email: { href: `mailto:${siteConfig.email}`, value: siteConfig.email, external: false },
  linkedin: { href: siteConfig.linkedin, value: "linkedin.com/in/alexander-kranz-a32628257/", external: true },
  github: { href: siteConfig.github, value: "github.com/alexandermk04", external: true },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/contact",
    namespace: "ContactPage",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("ContactPage");
  const options = t.raw("options") as ContactOption[];
  const hasPortrait = existsSync(join(process.cwd(), "public", "portrait.jpeg"));

  return (
    <>
      <PageHeader title={t("heading")} />
      <div className="px-5 pb-20 pt-6 sm:pb-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[2fr_3fr]">
          <Reveal>
            {hasPortrait ? (
              <Image
                src="/portrait.jpeg"
                alt={t("photoAlt")}
                width={640}
                height={800}
                className="w-full max-w-sm rounded-3xl border border-border object-cover"
                priority
              />
            ) : (
              <div className="flex aspect-[4/5] w-full max-w-sm flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-bg-soft">
                <span className="font-display text-6xl font-extrabold text-accent">
                  AK<span className="text-fg">.</span>
                </span>
              </div>
            )}
          </Reveal>

          <div>
            <Reveal delay={0.08}>
              <p className="text-xl leading-relaxed text-fg sm:text-2xl">
                {t("intro")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="mt-12 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                {t("optionsHeading")}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4">
              {options.map((option, i) => {
                const link = OPTION_LINKS[option.id];
                if (!link) return null;
                return (
                  <Reveal key={option.id} delay={0.2 + 0.07 * i}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-2xl border border-border bg-surface/50 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg hover:shadow-fg/5"
                    >
                      <span>
                        <span className="block font-display text-lg font-bold">
                          {option.label}{" "}
                          <span className="inline-block text-accent transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                        <span className="mt-0.5 block text-sm text-muted">
                          {option.hint}
                        </span>
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {link.value}
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
