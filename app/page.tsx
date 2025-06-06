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
              <span className="text-neutral-500">
                Full Stack Engineer @ Harmoney
              </span>
            </div>
            <Image
              src="/me.jpeg"
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
            <Pill href="/cv.pdf" label="CV" handle="CV (2025)" />
            <Pill
              href="mailto:jacobisdarvin@gmail.com"
              label="Email"
              handle="jacobisdarvin@gmail.com"
            />
            <Pill
              href="https://facebook.com/jacobdarvin"
              label="Facebook"
              handle="Jacob Darvin"
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
          <div>
            <span className="font-medium">Staykay • </span>
            <span className="text-neutral-500">Co-Founder</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill
              href="https://staykay.ph"
              label="Link"
              handle="www.staykay.ph"
            />
            <Pill
              href="https://www.linkedin.com/company/staykay"
              label="LinkedIn"
              handle="staykay"
            />
            <Pill
              href="https://github.com/staykay-ph"
              label="GitHub"
              handle="staykay-ph"
            />
            <Pill
              href="mailto:hello@staykay.ph"
              label="Email"
              handle="hello@staykay.ph"
            />
            <Pill
              href="mailto:jacob@staykay.ph"
              label="Email"
              handle="jacob@staykay.ph"
            />
          </div>
          <p className={`${youngSerif.className} mt-6`}>
            And more than anything in this world, I am human.
          </p>
        </div>
      </main>
    </div>
  );
}
