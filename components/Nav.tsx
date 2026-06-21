"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageToggle } from "./LanguageToggle";

const ITEMS = [
  { key: "experience", href: "/experience" },
  { key: "projects", href: "/projects" },
  { key: "hackathons", href: "/hackathons" },
  { key: "interests", href: "/interests" },
  { key: "contact", href: "/contact" },
] as const;

export function Nav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      style={{ "--enter-y": "-80px" } as CSSProperties}
      className={`animate-in fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="font-display text-base font-extrabold tracking-tight">
          AK<span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`relative text-sm font-medium transition-colors hover:text-fg ${
                isActive(item.href) ? "text-fg" : "text-muted"
              }`}
            >
              {t(item.key)}
              {isActive(item.href) && (
                <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </Link>
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
            {ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-border/60 py-3 text-sm font-medium last:border-0 hover:text-fg ${
                  isActive(item.href) ? "text-fg" : "text-muted"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
