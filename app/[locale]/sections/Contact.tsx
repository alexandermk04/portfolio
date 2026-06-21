import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/config/site";

export async function Contact() {
  const t = await getTranslations("Contact");

  return (
    <Section id="contact" heading={t("heading")}>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-8 sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(26rem 26rem at top right, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 60%)",
          }}
        />
        <Reveal>
          <p className="max-w-2xl text-xl leading-relaxed text-fg sm:text-2xl">
            {t("text")}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5"
            >
              {t("emailLabel")}
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              {t("allOptions")} →
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
