import { routing } from "@/i18n/routing";
import de from "./messages/de.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof de;
  }
}
