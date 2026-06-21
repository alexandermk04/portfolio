import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. {t("rights")}
        </p>
        <nav className="flex items-center gap-5">
          <Link
            href="/imprint"
            className="font-medium transition-colors hover:text-fg"
          >
            {t("imprint")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
