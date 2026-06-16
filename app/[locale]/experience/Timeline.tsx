"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/Reveal";

type Thread = "work" | "education";

type Item = {
  thread: Thread;
  date: string;
  /** "YYYY-MM" — drives chronological order and the proportional spacing. */
  start: string;
  title: string;
  org: string;
  location: string;
  description: string;
  tags: string[];
};

/* Vertical scale: px per month between consecutive knots, clamped so cards
   never overlap (MIN_GAP) and large pauses don't blow up the page (MAX_GAP). */
const PX_PER_MONTH = 14;
const MIN_GAP = 32;
const MAX_GAP = 360;

const monthsOf = (start: string) => {
  const [year, month] = start.split("-").map(Number);
  return year * 12 + month;
};

const byStartDesc = (a: Item, b: Item) => monthsOf(b.start) - monthsOf(a.start);

function Knot({ current, side }: { current?: boolean; side: "left" | "right" }) {
  const reduce = useReducedMotion();

  return (
    <>
      {/* connector from card edge to the rail */}
      <span
        aria-hidden
        className={`absolute top-[34px] h-px w-6 bg-border ${
          side === "right" ? "-right-6" : "-left-6"
        }`}
      />
      <span
        className={`absolute top-7 z-10 flex h-3.5 w-3.5 ${
          side === "right" ? "-right-[31px]" : "-left-[31px]"
        }`}
      >
        {current && !reduce && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-accent"
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: [1, 2], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="relative h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />
      </span>
    </>
  );
}

function MobileKnot({ current }: { current?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <span className="absolute -left-[7px] top-1.5 flex h-3.5 w-3.5">
      {current && !reduce && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-accent"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: [1, 2], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="relative h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />
    </span>
  );
}

function ThreadBadge({ thread, label }: { thread: Thread; label: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        thread === "work"
          ? "bg-accent text-white"
          : "border border-accent text-accent"
      }`}
    >
      {label}
    </span>
  );
}

function Card({ item, badge }: { item: Item; badge?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/50 p-5 transition-colors hover:border-accent/50">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-lg font-bold">
          {item.title} <span className="text-accent">· {item.org}</span>
        </h3>
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
          {item.date}
          {badge && <ThreadBadge thread={item.thread} label={badge} />}
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
  );
}

function Column({
  items,
  side,
  latestStart,
}: {
  items: Item[];
  side: "left" | "right";
  latestStart: number;
}) {
  return (
    <ol>
      {items.map((item, i) => {
        const gapMonths =
          i === 0
            ? latestStart - monthsOf(item.start)
            : monthsOf(items[i - 1].start) - monthsOf(item.start);
        const marginTop =
          i === 0
            ? gapMonths * PX_PER_MONTH
            : Math.min(Math.max(gapMonths * PX_PER_MONTH, MIN_GAP), MAX_GAP);

        return (
          <li
            key={`${item.org}-${item.date}`}
            className="relative"
            style={{ marginTop }}
          >
            <Knot current={i === 0} side={side === "left" ? "right" : "left"} />
            <Reveal delay={0.06 * i}>
              <Card item={item} />
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

export function Timeline() {
  const t = useTranslations("ExperiencePage");
  const items = (t.raw("items") as Item[]).slice().sort(byStartDesc);
  const latestStart = monthsOf(items[0].start);
  const work = items.filter((item) => item.thread === "work");
  const education = items.filter((item) => item.thread === "education");

  return (
    <div className="px-5 pb-20 pt-10 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        {/* Mobile: one merged rail, thread shown as a badge per card */}
        <ol className="relative ml-3 border-l border-border md:hidden">
          {items.map((item, i) => (
            <li
              key={`${item.org}-${item.date}`}
              className="relative pb-10 pl-8 last:pb-0"
            >
              <MobileKnot current={i === 0} />
              <Reveal delay={0.04 * i}>
                <Card item={item} badge={t(`threads.${item.thread}`)} />
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Desktop: both rails in the middle, cards fan outwards; vertical
            distance between knots is proportional to elapsed time */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[1fr_88px_1fr]">
            <Reveal>
              <h2 className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                {t("threads.work")}
              </h2>
            </Reveal>
            <div />
            <Reveal>
              <h2 className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                {t("threads.education")}
              </h2>
            </Reveal>
          </div>
          <div className="mt-8 grid grid-cols-[1fr_88px_1fr] pb-2">
            <Column items={work} side="left" latestStart={latestStart} />
            <div aria-hidden className="relative">
              <span className="absolute inset-y-0 left-6 w-px bg-border" />
              <span className="absolute inset-y-0 right-6 w-px bg-border" />
            </div>
            <Column items={education} side="right" latestStart={latestStart} />
          </div>
        </div>
      </div>
    </div>
  );
}
