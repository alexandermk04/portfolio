"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";

const PAGES = ["experience", "hackathons", "interests"] as const;
type Page = (typeof PAGES)[number];

function Motif({ page }: { page: Page }) {
  if (page === "experience") {
    // Mini timeline: a rail with three knots, echoing the experience page.
    return (
      <div aria-hidden className="flex h-10 items-center">
        <div className="relative h-full w-px bg-border">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute -left-[3.5px] h-2 w-2 rounded-full border-2 border-accent bg-bg"
              style={{ top: `${i * 40}%` }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (page === "hackathons") {
    return (
      <div aria-hidden className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        {"{ 24–48h }"}
      </div>
    );
  }
  // interests: a small map-pin dot with a pulse ring
  return (
    <div aria-hidden className="relative flex h-10 w-10 items-center justify-center">
      <span className="absolute h-6 w-6 rounded-full bg-accent/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
    </div>
  );
}

export function Teasers() {
  const t = useTranslations("Home");
  const reduce = useReducedMotion();

  return (
    <section id="explore" className="scroll-mt-24 bg-bg-soft px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            {t("teasers.heading")}
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {PAGES.map((page, i) => (
            <motion.div
              key={page}
              initial={{ opacity: 0, y: reduce ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="h-full"
            >
              <Link
                href={`/${page}`}
                className={`group flex h-full flex-col rounded-2xl border bg-surface/50 p-6 transition-colors hover:border-accent/60 ${
                  page === "hackathons" ? "border-2 border-dashed border-border" : "border-border"
                }`}
              >
                <Motif page={page} />
                <h3 className="mt-5 font-display text-xl font-bold">
                  {t(`teasers.${page}.title`)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {t(`teasers.${page}.description`)}
                </p>
                <span className="mt-5 text-sm font-semibold text-accent">
                  {t(`teasers.${page}.cta`)}{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
