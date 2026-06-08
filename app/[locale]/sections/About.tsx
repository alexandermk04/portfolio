"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

type Fact = { label: string; value: string };

export function About() {
  const t = useTranslations("About");
  const paragraphs = t.raw("paragraphs") as string[];
  const facts = t.raw("facts") as Fact[];

  return (
    <Section id="about" heading={t("heading")}>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <p className="text-2xl font-medium leading-snug text-fg sm:text-3xl">
              {t("lead")}
            </p>
          </Reveal>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-1">
            {facts.map((f) => (
              <div key={f.label} className="bg-bg-soft p-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-accent-2">
                  {f.label}
                </dt>
                <dd className="mt-1 font-medium text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
