import Pill from "./components/Pill";

import Image from "next/image";
import { Young_Serif } from "next/font/google";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20">
      <main className="flex flex-col gap-6 items-center sm:items-start max-w-md">
        <div className="flex flex-col gap-2">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-medium">Jacob Darvin • </span>
              <span className="text-neutral-400">Engineering @ Harmoney</span>
            </div>
            <Image
              src="/moi_1.jpeg"
              alt="Jacob Darvin"
              width={128}
              height={128}
              className="rounded-full w-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill
              href="https://linkedin.com/in/jacob-darvin"
              label="LinkedIn"
              handle="jacob-darvin"
            />
            <Pill
              href="https://github.com/jacobdarvin"
              label="GitHub"
              handle="jacobdarvin"
            />
            <Pill href="/cv.pdf" label="CV" handle="CV (2026)" />
            <Pill
              href="mailto:jacobisdarvin@gmail.com"
              label="Email"
              handle="jacobisdarvin@gmail.com"
            />
            <Pill
              href="/blog"
              label="Blog"
              handle="Jacob's Blog"
              contain={true}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* <div>
            <span className="font-medium">flashm8 • </span>
            <span className="text-neutral-400">Creator</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill
              href="https://flashm8.com"
              label="Link"
              handle="www.flashm8.com"
            />
            <Pill
              href="https://www.linkedin.com/company/flashm8"
              label="LinkedIn"
              handle="flashm8"
            />
            <Pill
              href="https://github.com/flashm8"
              label="GitHub"
              handle="flashm8"
            />
            <Pill
              href="mailto:hello@flashm8.com"
              label="Email"
              handle="hello@flashm8.com"
            />
            <Pill
              href="mailto:jacob@flashm8.com"
              label="Email"
              handle="jacob@flashm8.com"
            />
          </div> */}
          <p className={`${youngSerif.className}`}>
            Je suis jeune, naïve et plein d&apos;ambition.
          </p>
        </div>
      </main>
    </div>
  );
}
