import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent mb-4">
        404 — Page Not Found
      </span>
      <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-brand-dark mb-4">
        Lost in digital space?
      </h1>
      <p className="text-base text-brand-dark/75 max-w-md mb-8">
        The page you are looking for does not exist or has been moved to a new URL.
      </p>
      <Link
        href="/"
        className="px-6 py-3.5 rounded-xl bg-brand-dark text-brand-light font-semibold text-xs uppercase tracking-wider hover:bg-brand-accent hover:text-brand-light transition-all shadow-md active:scale-95"
      >
        Return to Home
      </Link>
    </div>
  );
}
