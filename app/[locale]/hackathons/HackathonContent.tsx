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
  /** Optional result: 1 = win, 2 = runner-up, 3 = third. Omit for "just took part". */
  placement?: 1 | 2 | 3;
};

/** Stamp-like badge on the ticket for a podium finish. */
function PlacementBadge({ placement, label }: { placement: 1 | 2 | 3; label: string }) {
  const winner = placement === 1;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-widest ${
        winner ? "bg-accent text-surface" : "border border-accent text-accent"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6 4h12v3a6 6 0 0 1-12 0Z" />
        <path d="M6 6H4v1a3 3 0 0 0 3 3M18 6h2v1a3 3 0 0 1-3 3M9 20h6M12 13v7" />
      </svg>
      {label}
    </span>
  );
}

export function HackathonContent() {
  const t = useTranslations("HackathonsPage");
  const reduce = useReducedMotion();
  const items = t.raw("items") as Hackathon[];

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
              {item.placement && (
                <div className="mt-3">
                  <PlacementBadge
                    placement={item.placement}
                    label={t(`placements.${item.placement}`)}
                  />
                </div>
              )}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
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
                // Hamburg sits right next to Berlin — flip its label to the left.
                labelDir: entry.id === "hamburg" ? ("left" as const) : ("right" as const),
                sublabel: entry.years
                  .sort((a, b) => Number(b) - Number(a))
                  .join(" · "),
              }))}
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
