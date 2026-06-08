import { siteConfig } from "@/config/site";

export function PersonJsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alexander Kranz",
    url: siteConfig.url,
    image: `${siteConfig.url}/opengraph-image`,
    jobTitle: locale === "de" ? "Data-Science-Student" : "Data Science Student",
    description:
      locale === "de"
        ? "Data-Science-Student in Hamburg, Werkstudent bei der Deutschen Bahn und Stipendiat der Studienstiftung des Deutschen Volkes."
        : "Data Science student in Hamburg, working student at Deutsche Bahn and scholarship holder of the Studienstiftung des Deutschen Volkes.",
    email: `mailto:${siteConfig.email}`,
    sameAs: [siteConfig.linkedin, siteConfig.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.country,
    },
    worksFor: { "@type": "Organization", name: "Deutsche Bahn" },
    alumniOf: [
      { "@type": "Organization", name: "Otto" },
      { "@type": "CollegeOrUniversity", name: "Hamburg" },
    ],
    award: "Studienstiftung des Deutschen Volkes",
    knowsLanguage: ["German", "English", "Spanish"],
    knowsAbout: [
      "Data Science",
      "Machine Learning",
      "Statistics",
      "Python",
      "Running",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
