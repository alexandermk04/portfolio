import { Reveal } from "./Reveal";

type PageHeaderProps = {
  title: string;
  lead?: string;
  eyebrow?: string;
};

export function PageHeader({ title, lead, eyebrow }: PageHeaderProps) {
  return (
    <div className="px-5 pb-4 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {lead}
            </p>
          )}
        </Reveal>
      </div>
    </div>
  );
}
