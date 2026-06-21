"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { EASE } from "@/lib/motion";

type Category = "club" | "coding" | "academic";
type Filter = "all" | Category;

type Project = {
  id: string;
  category: Category;
  featured?: boolean;
  title: string;
  org?: string;
  year?: string;
  description: string;
  image?: string;
  tags: string[];
  link?: { label: string; url: string };
};

const FILTERS: Filter[] = ["all", "club", "coding", "academic"];

/** Small decorative glyph per category — used as a placeholder cover and badge. */
function CategoryGlyph({ category, className }: { category: Category; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (category === "club") {
    // Three connected nodes — community.
    return (
      <svg viewBox="0 0 48 48" className={className} aria-hidden {...common}>
        <circle cx="24" cy="12" r="5" />
        <circle cx="12" cy="36" r="5" />
        <circle cx="36" cy="36" r="5" />
        <path d="M22 16 L14 32 M26 16 L34 32 M17 36 H31" />
      </svg>
    );
  }
  if (category === "coding") {
    // Code brackets.
    return (
      <svg viewBox="0 0 48 48" className={className} aria-hidden {...common}>
        <path d="M18 14 L8 24 L18 34 M30 14 L40 24 L30 34 M27 10 L21 38" />
      </svg>
    );
  }
  // academic — mortarboard.
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...common}>
      <path d="M4 18 L24 10 L44 18 L24 26 Z" />
      <path d="M14 22 V32 C14 34 33 34 33 32 V22" />
      <path d="M44 18 V28" />
    </svg>
  );
}

export function ProjectsContent({ availableImages }: { availableImages: string[] }) {
  const t = useTranslations("ProjectsPage");
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Filter>("all");

  const projects = t.raw("projects") as Project[];

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active, projects],
  );

  const hasImage = (src?: string) => Boolean(src && availableImages.includes(src));

  return (
    <div className="px-5 pb-20 pt-6 sm:pb-28">
      <div className="mx-auto max-w-6xl">

        {/* The special thing: an interactive category filter that animates the
            grid reflow, with a shared sliding pill behind the active chip. */}
        <Reveal>
          <div role="tablist" aria-label={t("heading")} className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const isActive = active === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(filter)}
                  className={`relative rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-accent text-surface"
                      : "border-border text-muted hover:border-accent/60 hover:text-fg"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilter"
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                    />
                  )}
                  {t(`filters.${filter}`)}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Filterable project grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const span = project.featured ? "sm:col-span-2 lg:col-span-3" : "";
              const showImage = hasImage(project.image);
              const Wrapper = project.link ? "a" : "div";
              return (
                <motion.article
                  key={project.id}
                  layout={!reduce}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                  transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : i * 0.04, ease: EASE }}
                  className={span}
                >
                  <Wrapper
                    {...(project.link
                      ? {
                          href: project.link.url,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className={`group flex h-full overflow-hidden rounded-2xl border border-border bg-surface/50 transition-colors hover:border-accent/60 ${
                      project.featured ? "flex-col md:flex-row" : "flex-col"
                    }`}
                  >
                    {/* Cover: real image when present, otherwise a glyph placeholder */}
                    <div
                      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-bg-soft ${
                        project.featured
                          ? "aspect-[16/10] md:aspect-auto md:w-2/5"
                          : "aspect-[16/7]"
                      }`}
                    >
                      {showImage ? (
                        <Image
                          src={project.image!}
                          alt={project.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <>
                          <span className="grid-bg absolute inset-0 opacity-60" aria-hidden />
                          <CategoryGlyph
                            category={project.category}
                            className="relative h-12 w-12 text-accent/70"
                          />
                        </>
                      )}
                      {project.featured && (
                        <span className="absolute left-4 top-4 rounded-full bg-accent px-2.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-widest text-surface">
                          {t("featuredLabel")}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-4 font-mono text-xs font-semibold uppercase tracking-widest text-muted">
                        <span>{t(`filters.${project.category}`)}</span>
                        {project.year && <span>{project.year}</span>}
                      </div>
                      <h3
                        className={`mt-3 font-display font-bold ${
                          project.featured ? "text-2xl sm:text-3xl" : "text-xl"
                        }`}
                      >
                        {project.title}
                      </h3>
                      {project.org && (
                        <p className="mt-1 text-sm font-medium text-accent">{project.org}</p>
                      )}
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                        {project.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-medium text-accent"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.link && (
                        <span className="mt-5 text-sm font-semibold text-accent">
                          {project.link.label}{" "}
                          <span className="inline-block transition-transform group-hover:translate-x-1">
                            ↗
                          </span>
                        </span>
                      )}
                    </div>
                  </Wrapper>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted">{t("emptyState")}</p>
        )}
      </div>
    </div>
  );
}
