import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

export function BackLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="mb-10 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <FiChevronLeft aria-hidden className="size-4" />
      {children}
    </Link>
  );
}
