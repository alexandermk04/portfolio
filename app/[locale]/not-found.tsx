import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-7xl font-extrabold gradient-text">404</p>
      <p className="mt-4 text-muted">Page not found · Seite nicht gefunden</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
      >
        ← Home
      </Link>
    </section>
  );
}
