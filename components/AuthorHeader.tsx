import Link from "next/link";
import { logout } from "@/app/api/auth";

const navLink =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

/** The header on the author's own pages. */
export function AuthorHeader() {
  return (
    <header className="flex items-baseline justify-between gap-6 px-4 py-5 md:px-8">
      <Link
        href="/log"
        className="font-serif text-2xl transition-opacity hover:opacity-70"
      >
        log
      </Link>
      <nav className="flex items-baseline gap-6">
        <Link href="/post" className={navLink}>
          New
        </Link>
        <Link href="/edit" className={navLink}>
          Edit
        </Link>
        <form action={logout}>
          <button type="submit" className={navLink}>
            Log out
          </button>
        </form>
      </nav>
    </header>
  );
}
