import Link from "next/link";

export function LogFooter() {
  return (
    <footer className="flex flex-wrap items-baseline justify-between gap-4 px-4 pt-8 pb-12 text-sm text-muted-foreground md:px-8">
      <p>
        <a
          href="mailto:jacobisdarvin@gmail.com"
          className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
        >
          jacobisdarvin@gmail.com
        </a>
      </p>
    </footer>
  );
}
