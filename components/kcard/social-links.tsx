import { IconType } from "react-icons";

interface SocialLinkProps {
  icon: IconType;
  label: string;
  username: string;
  href: string;
}

export function SocialLink({
  icon: Icon,
  label,
  username,
  href,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col p-4 bg-neutral-50 border rounded-lg hover:shadow-lg transition-all hover:-translate-y-1 hover:bg-white"
    >
      <span className="flex items-center gap-2 text-xl font-bold">
        <Icon />
        {label}
      </span>
      <span className="text-muted-foreground">{username}</span>
    </a>
  );
}
