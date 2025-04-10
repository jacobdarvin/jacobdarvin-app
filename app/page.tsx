import Image from "next/image";
import Pill from "./components/Pill";
import Section from "./components/Section";

import { Young_Serif } from "next/font/google";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">
        <Section>
          <div className="flex items-end justify-between">
            <div>
              <span className="font-medium">Jacob Darvin • </span>
              <span className="text-neutral-500">Full Stack Engineer</span>
            </div>
            <Image
              src="/me.jpeg"
              alt="Jacob Darvin"
              width={40}
              height={40}
              className="rounded-full"
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
          </div>
        </Section>

        <Section>
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
        </Section>
      </main>
    </div>
  );
}
