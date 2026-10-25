import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

export function LogHeader() {
  return (
    <header className="flex items-baseline justify-between gap-6 px-4 py-5 md:px-8">
      <Link
        href="/log"
        className="font-serif text-2xl transition-opacity hover:opacity-70"
      >
        log
      </Link>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <IoMdArrowBack aria-hidden className="size-4" />
        Back
      </Link>
    </header>
  );
}
