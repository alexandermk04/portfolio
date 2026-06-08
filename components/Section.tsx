import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  heading,
  subheading,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-5 py-20 sm:py-28 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
              {subheading}
            </p>
          )}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
