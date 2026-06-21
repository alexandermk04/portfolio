"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { LocationMap } from "@/components/LocationMap";

type Stat = { value: string; label: string };
type Peak = { name: string; elevation: string };
type Adventure = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  peaks?: Peak[];
};
type Language = { greeting: string; name: string; level: string; levelValue: number };
type Marathon = { city: string; label: string; year: string };

const LEVEL_SEGMENTS = 5;

/** Decorative glyph shown in the image frame until a real photo is dropped in. */
function AdventureGlyph({ id, className }: { id: string; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (id === "mountaineering") {
    return (
      <svg viewBox="0 0 48 48" className={className} aria-hidden {...common}>
        <path d="M4 40 L18 14 L26 28 L31 20 L44 40 Z" />
        <path d="M14 23 L18 19 L22 23" />
      </svg>
    );
  }
  if (id === "diving") {
    return (
      <svg viewBox="0 0 48 48" className={className} aria-hidden {...common}>
        <path d="M4 18 C9 13 13 23 18 18 C23 13 27 23 32 18 C37 13 41 23 44 18" />
        <path d="M4 30 C9 25 13 35 18 30 C23 25 27 35 32 30 C37 25 41 35 44 30" />
      </svg>
    );
  }
  // marathons — finish-line medal
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...common}>
      <circle cx="24" cy="31" r="9" />
      <path d="M24 26 V31 L28 33" />
      <path d="M17 23 L13 8 H21 L24 17 M31 23 L35 8 H27 L24 17" />
    </svg>
  );
}

/** Mountaineering: a peak listed with a bar scaled to its elevation. */
function PeakList({ peaks }: { peaks: Peak[] }) {
  const reduce = useReducedMotion();
  const max = Math.max(...peaks.map((p) => parseElevation(p.elevation)));

  return (
    <ul className="mt-6 space-y-3">
      {peaks.map((peak, i) => {
        const frac = max > 0 ? parseElevation(peak.elevation) / max : 1;
        return (
          <li key={peak.name}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-sm font-semibold sm:text-base">
                {peak.name}
              </span>
              <span className="font-mono text-sm text-accent">{peak.elevation}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full origin-left rounded-full bg-accent"
                initial={{ scaleX: reduce ? frac : 0 }}
                whileInView={{ scaleX: frac }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + 0.08 * i }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Pull the leading number out of strings like "6,263 m" / "6.263 m". */
function parseElevation(value: string): number {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

export function InterestsContent({ availableImages }: { availableImages: string[] }) {
  const t = useTranslations("InterestsPage");
  const reduce = useReducedMotion();
  const stats = t.raw("stats") as Stat[];
  const adventures = t.raw("adventures.items") as Adventure[];
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

        {/* Languages */}
        <div className="mt-20 sm:mt-28">
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

        {/* Adventures — alternating feature rows */}
        <div className="mt-16 space-y-16 sm:mt-24 sm:space-y-28">
          {adventures.map((adv, i) => {
            const showImage = availableImages.includes(adv.image);
            const imageRight = i % 2 === 1;
            return (
              <Reveal key={adv.id}>
                <article className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                  {/* Image / placeholder frame */}
                  <div className={imageRight ? "md:order-2" : ""}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-bg-soft">
                      {showImage ? (
                        <Image
                          src={adv.image}
                          alt={adv.imageAlt}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <>
                          <span className="grid-bg absolute inset-0 opacity-60" aria-hidden />
                          <AdventureGlyph
                            id={adv.id}
                            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-accent/70"
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Copy */}
                  <div className={imageRight ? "md:order-1" : ""}>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                      {adv.eyebrow}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                      {adv.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted">
                      {adv.description}
                    </p>

                    {adv.peaks && <PeakList peaks={adv.peaks} />}

                    {adv.id === "marathons" && (
                      <LocationMap
                        className="mt-6 max-w-md"
                        ariaLabel={t("marathons.ariaLabel")}
                        markers={marathons.map((m) => ({
                          id: m.city,
                          label: m.label,
                          sublabel: m.year,
                          labelDir: m.city === "hamburg" ? "left" : "right",
                        }))}
                      />
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
