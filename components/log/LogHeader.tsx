import Link from "next/link";
import { BackLink } from "./BackLink";

export function LogHeader() {
  return (
    <header className="flex items-baseline justify-between gap-6 px-4 py-5 md:px-8">
      <Link
        href="/log"
        className="font-serif text-2xl transition-opacity hover:opacity-70"
      >
        log
      </Link>
      <BackLink />
    </header>
  );
}
