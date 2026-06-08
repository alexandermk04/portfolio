"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { LanguageToggle } from "./LanguageToggle";

const SECTIONS = ["about", "experience", "projects", "interests", "contact"] as const;

export function Nav() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="font-display text-base font-extrabold tracking-tight">
          AK<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              {t(s)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-fg transition-transform ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-fg transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-fg transition-transform ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass border-t border-border md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {SECTIONS.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm font-medium text-muted last:border-0 hover:text-fg"
              >
                {t(s)}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}
