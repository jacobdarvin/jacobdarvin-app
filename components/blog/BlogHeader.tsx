import Link from "next/link";

export function BlogHeader() {
  return (
    <header className="flex items-baseline justify-between gap-6 px-4 py-5 md:px-8">
      <Link
        href="/blog"
        className="font-display text-2xl transition-opacity hover:opacity-70"
      >
        log
      </Link>
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        jacobdarvin.com
      </Link>
    </header>
  );
}
