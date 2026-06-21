import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";

type Fact = { label: string; value: string };

export async function AboutLead() {
  const t = await getTranslations("Home");
  const facts = t.raw("facts") as Fact[];

  return (
    <section id="about" className="scroll-mt-24 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="max-w-3xl text-2xl font-medium leading-snug text-fg sm:text-3xl">
            {t("aboutLead")}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {t("aboutText")}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-bg-soft p-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {f.label}
                </dt>
                <dd className="mt-1 font-medium text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
