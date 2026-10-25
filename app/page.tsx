import Image from "next/image";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoIosDocument, IoMdFilm } from "react-icons/io";
import { SocialLink } from "@/components/SocialLink";

const links = [
  {
    href: "https://linkedin.com/in/jacob-darvin",
    icon: FaLinkedin,
    label: "jacob-darvin",
  },
  {
    href: "https://github.com/jacobdarvin",
    icon: FaGithub,
    label: "jacobdarvin",
  },
  { href: "/cv.pdf", icon: IoIosDocument, label: "CV (2026)" },
  {
    href: "mailto:jacobisdarvin@gmail.com",
    icon: FaEnvelope,
    label: "jacobisdarvin@gmail.com",
  },
  { href: "/blog", icon: IoMdFilm, label: "log", inverted: true },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <header className="flex items-center gap-4">
        <Image
          src="/moi_1.jpeg"
          alt="Jacob Darvin"
          width={48}
          height={48}
          className="size-12 rounded-full"
          priority
        />
        <div>
          <h1 className="font-medium">Jacob Darvin</h1>
          <p className="text-sm text-muted-foreground">
            Engineering @ Harmoney
          </p>
        </div>
      </header>

      <ul className="flex flex-wrap gap-2">
        {links.map(({ href, icon, label, inverted }) => (
          <li key={href}>
            <SocialLink href={href} icon={icon} inverted={inverted}>
              {label}
            </SocialLink>
          </li>
        ))}
      </ul>

      <p className="font-serif">
        Je suis jeune, naïve et plein d&apos;ambition.
      </p>
    </main>
  );
}
