"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

type Item = {
  period: string;
  role: string;
  org: string;
  location: string;
  description: string;
  tags: string[];
};

export function Experience() {
  const t = useTranslations("Experience");
  const items = t.raw("items") as Item[];

  return (
    <Section
      id="experience"
      heading={t("heading")}
      subheading={t("subheading")}
      className="bg-bg-soft"
    >
      <ol className="relative ml-3 border-l border-border">
        {items.map((item, i) => (
          <li key={i} className="relative pb-12 pl-8 last:pb-0">
            <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />
            <Reveal delay={0.04 * i}>
              <div className="rounded-2xl border border-border bg-surface/50 p-5 transition-colors hover:border-accent/50">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-bold">
                    {item.role}{" "}
                    <span className="text-accent">· {item.org}</span>
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {item.period}
                  </span>
                </div>
                <p className="mt-0.5 text-xs uppercase tracking-wider text-muted">
                  {item.location}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
