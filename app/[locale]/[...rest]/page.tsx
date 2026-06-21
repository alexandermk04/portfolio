import { notFound } from "next/navigation";

// Any URL under a valid locale that matches no other route lands here. Calling
// notFound() renders app/[locale]/not-found.tsx inside the locale layout (Nav,
// Footer, intl provider). Without this catch-all, unmatched paths fall through
// to Next's default 404 instead of our styled page.
export default function CatchAllNotFound() {
  notFound();
}
