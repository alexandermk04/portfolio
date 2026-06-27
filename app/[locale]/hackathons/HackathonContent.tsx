"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

/** How many ticket cards are shown per page before pagination kicks in. */
const PAGE_SIZE = 4;

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

/** Minimalistic chevron control for paging through the ticket cards. */
function PageArrow({
  direction,
  label,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={direction === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

export function HackathonContent() {
  const t = useTranslations("HackathonsPage");
  const reduce = useReducedMotion();
  const items = t.raw("items") as Hackathon[];

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const [page, setPage] = useState(0);
  const start = page * PAGE_SIZE;
  const visible = items.slice(start, start + PAGE_SIZE);

  return (
    <div className="px-5 pb-20 pt-6 sm:pb-28">
      <div className="mx-auto max-w-6xl">

        {/* Ticket-style hackathon cards, paginated four at a time */}
        <div className="mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
              className="grid gap-6 sm:grid-cols-2"
            >
              {visible.map((item, i) => (
                <motion.article
                  key={`${item.year}-${item.name}-${start + i}`}
                  initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: reduce ? 0 : i % 2 === 0 ? -1 : 1,
                  }}
                  transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.06 * i }}
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
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-6">
              <PageArrow
                direction="prev"
                label={t("pagination.prev")}
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              />
              <span className="font-mono text-sm tabular-nums text-muted">
                {page + 1} / {totalPages}
              </span>
              <PageArrow
                direction="next"
                label={t("pagination.next")}
                disabled={page === totalPages - 1}
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              />
            </div>
          )}
        </div>

        {/* Map of hackathon locations (all locations, not paginated) */}
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
