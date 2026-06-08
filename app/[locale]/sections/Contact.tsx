"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/config/site";

export function Contact() {
  const t = useTranslations("Contact");

  const links = [
    { label: t("emailLabel"), href: `mailto:${siteConfig.email}`, external: false },
    { label: t("linkedinLabel"), href: siteConfig.linkedin, external: true },
    { label: t("githubLabel"), href: siteConfig.github, external: true },
  ];

  return (
    <Section id="contact" heading={t("heading")}>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-8 sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-[100px]"
        />
        <Reveal>
          <p className="max-w-2xl text-xl leading-relaxed text-fg sm:text-2xl">
            {t("text")}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-4">
            {links.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  i === 0
                    ? "bg-accent text-white shadow-lg shadow-accent/30"
                    : "border border-border text-fg hover:border-accent hover:text-accent"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
