"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

type Stat = { value: string; label: string };
type Item = { title: string; description: string };

export function Interests() {
  const t = useTranslations("Interests");
  const stats = t.raw("stats") as Stat[];
  const items = t.raw("items") as Item[];

  return (
    <Section
      id="interests"
      heading={t("heading")}
      subheading={t("subheading")}
      className="bg-bg-soft"
    >
      <Reveal>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-bg-soft p-6 text-center sm:p-8"
            >
              <div className="font-display text-4xl font-extrabold sm:text-5xl">
                <span className="gradient-text">{s.value}</span>
              </div>
              <div className="mt-2 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={0.06 * i}>
            <div className="h-full rounded-2xl border border-border bg-surface/50 p-6">
              <h3 className="font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
