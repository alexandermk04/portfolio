import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes, Next.js internals, and static files
  // - extensionless root metadata routes (e.g. opengraph-image), which must be
  //   served directly and not locale-redirected to a non-existent /de/... route
  matcher: ["/((?!api|_next|_vercel|opengraph-image|twitter-image|.*\\..*).*)"],
};
