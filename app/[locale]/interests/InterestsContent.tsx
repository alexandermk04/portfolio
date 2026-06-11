"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { LocationMap } from "@/components/LocationMap";

type Stat = { value: string; label: string };
type Item = { title: string; description: string };
type Language = { greeting: string; name: string; level: string; levelValue: number };
type Marathon = { city: string; label: string; year: string };

const LEVEL_SEGMENTS = 5;

export function InterestsContent() {
  const t = useTranslations("InterestsPage");
  const reduce = useReducedMotion();
  const stats = t.raw("stats") as Stat[];
  const items = t.raw("items") as Item[];
  const languages = t.raw("languages.items") as Language[];
  const marathons = t.raw("marathons.items") as Marathon[];

  return (
    <div className="px-5 pb-20 pt-6 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        {/* Stats strip */}
        <Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-bg-soft p-6 text-center sm:p-8">
                <div className="font-display text-4xl font-extrabold text-accent sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Interest cards */}
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

        {/* Languages */}
        <div className="mt-20">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t("languages.heading")}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {languages.map((lang, i) => (
              <Reveal key={lang.name} delay={0.08 * i}>
                <div className="h-full rounded-2xl border border-border bg-surface/50 p-6">
                  <p className="font-display text-4xl font-bold italic text-accent">
                    {lang.greeting}
                  </p>
                  <p className="mt-4 font-semibold text-fg">{lang.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{lang.level}</p>
                  <div className="mt-4 flex gap-1.5">
                    {Array.from({ length: LEVEL_SEGMENTS }, (_, seg) => (
                      <motion.span
                        key={seg}
                        initial={{ scaleX: reduce ? 1 : 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + 0.07 * seg }}
                        className={`h-1.5 flex-1 origin-left rounded-full ${
                          seg < lang.levelValue ? "bg-accent" : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Marathon map */}
        <div className="mt-20">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t("marathons.heading")}
            </h2>
            <p className="mt-2 font-mono text-xs text-muted">{t("marathons.note")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <LocationMap
              className="mx-auto mt-8 max-w-2xl"
              ariaLabel={t("marathons.ariaLabel")}
              markers={marathons.map((m) => ({
                id: m.city,
                label: m.label,
                sublabel: m.year,
              }))}
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
