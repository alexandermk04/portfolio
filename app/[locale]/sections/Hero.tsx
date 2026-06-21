"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

export function Hero() {
  const t = useTranslations("Hero");
  const roles = t.raw("roles") as string[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  const enter = (delay: number) => ({ "--enter-delay": `${delay}s` } as CSSProperties);

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

      <div className="mx-auto w-full max-w-6xl">
        <p
          className="animate-in text-sm font-semibold uppercase tracking-[0.25em] text-accent"
          style={enter(0.1)}
        >
          {t("greeting")}
        </p>

        <h1
          className="animate-in mt-4 font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-fg sm:text-8xl lg:text-9xl"
          style={enter(0.22)}
        >
          {t("shortName")}
          <span className="text-accent">.</span>
        </h1>

        <div
          className="animate-in mt-6 flex h-9 items-center text-xl font-semibold text-fg sm:text-2xl"
          style={enter(0.34)}
        >
          <span className="mr-2 text-muted">›</span>
          <span key={index} className="role-swap inline-block">
            {roles[index]}
          </span>
        </div>

        <p
          className="animate-in mt-7 max-w-xl text-lg leading-relaxed text-muted"
          style={enter(0.46)}
        >
          {t("tagline")}
        </p>

        <div className="animate-in mt-9 flex flex-wrap gap-4" style={enter(0.58)}>
          <Link
            href="/contact"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5"
          >
            {t("ctaContact")}
          </Link>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
          >
            {t("ctaLinkedin")}
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-fg"
      >
        <span className="animate-float inline-block">↓ {t("scroll")}</span>
      </a>
    </section>
  );
}
