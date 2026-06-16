"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { LocationMap } from "@/components/LocationMap";

type Hackathon = {
  name: string;
  city: string;
  venue: string;
  year: string;
  summary: string;
  tech: string[];
};

type EarlierItem = {
  title: string;
  description: string;
  tags: string[];
};

export function HackathonContent() {
  const t = useTranslations("HackathonsPage");
  const reduce = useReducedMotion();
  const items = t.raw("items") as Hackathon[];
  const earlier = t.raw("earlier.items") as EarlierItem[];

  return (
    <div className="px-5 pb-20 pt-6 sm:pb-28">
      <div className="mx-auto max-w-6xl">

        {/* Ticket-style hackathon cards */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: reduce ? 0 : 28, rotate: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: reduce ? 0 : i % 2 === 0 ? -1 : 1,
              }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              whileHover={reduce ? undefined : { rotate: 0, y: -6 }}
              className="flex flex-col rounded-2xl border-2 border-dashed border-border bg-surface/60 p-6 transition-colors hover:border-accent/60"
            >
              <div className="flex items-baseline justify-between gap-4 font-mono text-xs font-semibold uppercase tracking-widest text-muted">
                <span>{item.year}</span>
                <span>{item.venue}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold">{item.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted sm:text-base">
                {item.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-medium text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Map of hackathon locations */}
        <div className="mt-20">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t("map.heading")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <LocationMap
              className="mx-auto mt-8 max-w-2xl"
              ariaLabel={t("map.ariaLabel")}
              markers={Object.values(
                items.reduce<
                  Record<string, { id: string; label: string; years: string[] }>
                >((acc, item) => {
                  const entry = (acc[item.city] ??= {
                    id: item.city,
                    label: item.venue,
                    years: [],
                  });
                  entry.years.push(item.year);
                  return acc;
                }, {}),
              ).map((entry) => ({
                id: entry.id,
                label: entry.label,
                sublabel: entry.years
                  .sort((a, b) => Number(b) - Number(a))
                  .join(" · "),
              }))}
            />
          </Reveal>
        </div>

        {/* Earlier competitions (Jugend forscht, Jugend debattiert) */}
        <div className="mt-20">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t("earlier.heading")}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {earlier.map((item, i) => (
              <Reveal key={item.title} delay={0.06 * i}>
                <div className="h-full rounded-2xl border border-border bg-surface/50 p-6">
                  <h3 className="font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
