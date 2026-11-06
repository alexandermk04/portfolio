import { siteConfig } from "@/config/site";

export function PersonJsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alexander Kranz",
    url: siteConfig.url,
    image: `${siteConfig.url}/portrait.jpeg`,
    jobTitle: locale === "de" ? "Data-Science-Student" : "Data Science Student",
    description:
      locale === "de"
        ? "Data-Science-Student, Praktikant bei Tesla in der Gigafactory Berlin-Brandenburg und Stipendiat der Studienstiftung des Deutschen Volkes."
        : "Data Science student, intern at Tesla Gigafactory Berlin-Brandenburg and scholarship holder of the Studienstiftung des Deutschen Volkes.",
    email: `mailto:${siteConfig.email}`,
    sameAs: [siteConfig.linkedin, siteConfig.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.country,
    },
    worksFor: { "@type": "Organization", name: "Tesla" },
    alumniOf: [
      { "@type": "Organization", name: "Otto" },
      { "@type": "Organization", name: "DB E&C" },
      { "@type": "CollegeOrUniversity", name: "UPV" },
    ],
    award: "Studienstiftung des Deutschen Volkes",
    knowsLanguage: ["German", "English", "Spanish"],
    knowsAbout: [
      "Data Science",
      "Machine Learning",
      "Statistics",
      "Python",
      "Running",
      "Diving"
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
