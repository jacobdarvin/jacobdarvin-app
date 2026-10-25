import Link from "next/link";

export function BlogFooter() {
  return (
    <footer className="flex flex-wrap items-baseline justify-between gap-4 px-4 pt-8 pb-12 text-sm text-muted-foreground md:px-8">
      <p>
        Want to get in touch? Email me at{" "}
        <a
          href="mailto:jacobisdarvin@gmail.com"
          className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
        >
          jacobisdarvin@gmail.com
        </a>
      </p>
      <Link href="/" className="transition-colors hover:text-foreground">
        Back to jacobdarvin.com
      </Link>
    </footer>
  );
}
