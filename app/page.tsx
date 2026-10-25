import Image from "next/image";
import { BsBoxFill } from "react-icons/bs";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
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
  { href: "/blog", icon: BsBoxFill, label: "Jacob's Blog" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-6 py-16">
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
        {links.map(({ href, icon, label }) => (
          <li key={href}>
            <SocialLink href={href} icon={icon}>
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
