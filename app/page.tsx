import Image from "next/image";
import Pill from "./components/Pill";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-2 max-w-sm md:max-w-md">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-medium">Jacob Darvin • </span>
              <span className="opacity-50">Engineering @ Mindvalley</span>
            </div>
            <Image
              src="/images/me.jpeg"
              alt="Jacob Darvin"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill
              href="https://github.com/jacobdarvin"
              label="GitHub"
              handle="jacobdarvin"
            />
            <Pill
              href="https://linkedin.com/in/jacob-darvin"
              label="LinkedIn"
              handle="jacob-darvin"
            />
            <Pill href="https://x.com/__Darvin" label="X" handle="@__Darvin" />
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
              href="https://instagram.com/openw_indows"
              label="Instagram"
              handle="@openw_indows"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 max-w-sm md:max-w-md">
          <div>
            <span className="font-medium">Staykay • </span>
            <span className="opacity-50">Co-Founder</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill href="https://staykay.ph" label="Link" handle="staykay.ph" />
            <Pill
              href="https://github.com/staykay-ph"
              label="GitHub"
              handle="GitHub"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
