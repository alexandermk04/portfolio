"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { siteConfig } from "@/config/site";
import { EASE } from "@/lib/motion";

export function Hero() {
  const t = useTranslations("Hero");
  const reduce = useReducedMotion();
  const roles = t.raw("roles") as string[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-20"
    >
      {/* Animated aurora background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px] animate-aurora" />
        <div className="absolute top-20 -right-20 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-[120px] animate-aurora [animation-delay:-6s]" />
        <div className="absolute -bottom-24 left-10 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px] animate-aurora [animation-delay:-12s]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl"
      >
        <motion.p
          variants={item}
          className="text-sm font-semibold uppercase tracking-[0.25em] text-accent"
        >
          {t("greeting")}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-fg sm:text-8xl lg:text-9xl"
        >
          {t("shortName")}
          <span className="text-accent">.</span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-6 flex h-9 items-center text-xl font-semibold text-fg sm:text-2xl"
        >
          <span className="mr-2 text-muted">›</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={index}
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -12 }}
              transition={{ duration: 0.4 }}
            >
              {roles[index]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
        >
          {t("tagline")}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5"
          >
            {t("ctaContact")}
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
          >
            {t("ctaLinkedin")}
          </a>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-fg"
      >
        <span className="animate-float inline-block">↓ {t("scroll")}</span>
      </a>
    </section>
  );
}
