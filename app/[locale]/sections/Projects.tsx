"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/Section";

type Item = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

export function Projects() {
  const t = useTranslations("Projects");
  const reduce = useReducedMotion();
  const items = t.raw("items") as Item[];

  return (
    <Section id="projects" heading={t("heading")} subheading={t("subheading")}>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: reduce ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 * i }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 p-6"
          >
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <h3 className="font-display text-xl font-bold">{item.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-bg px-2.5 py-0.5 text-xs font-medium text-accent-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
