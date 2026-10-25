import Link from "next/link";
import type { IconType } from "react-icons";

type SocialLinkProps = {
  href: string;
  icon: IconType;
  children: React.ReactNode;
  inverted?: boolean;
};

const base =
  "inline-flex items-center gap-2 rounded-full border border-foreground px-4 py-2 text-sm font-medium transition-colors";
const outlined = `${base} hover:bg-accent`;
const invertedClass = `${base} font-serif bg-foreground text-background hover:animate-glitch`;

export function SocialLink({
  href,
  icon: Icon,
  children,
  inverted,
}: SocialLinkProps) {
  const className = inverted ? invertedClass : outlined;
  const content = (
    <>
      <Icon aria-hidden className="size-4" />
      {children}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
}
