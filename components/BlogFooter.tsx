import Link from "next/link";

export function BlogFooter({
  href,
  cta,
  children,
}: {
  href: string;
  cta: string;
  children: React.ReactNode;
}) {
  return (
    <footer className="mt-16 border-t pt-8">
      <p className="font-serif text-xl md:text-2xl">Jacob&apos;s Blog</p>
      <div className="mt-2 space-y-2 text-muted-foreground">{children}</div>
      <Link
        href={href}
        className="mt-4 inline-block rounded-full border bg-card px-5 py-2 text-sm transition-colors hover:bg-accent"
      >
        {cta}
      </Link>
    </footer>
  );
}
