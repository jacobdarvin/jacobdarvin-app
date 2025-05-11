"use client";

import { useState, useEffect } from "react";

import Pill from "./components/Pill";
import Section from "./components/Section";
import Chevron from "./components/Chevron";
import Post from "./components/Post";

import { Young_Serif } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const gridStyle = {
    transform: `translate(${mousePosition.x * 20}px, ${
      mousePosition.y * 20
    }px)`,
    transition: "transform 0.3s ease-out",
  };

  useEffect(() => {
    // Apply scroll-smooth to html element for better scrolling
    document.documentElement.classList.add("scroll-smooth");
    return () => {
      document.documentElement.classList.remove("scroll-smooth");
    };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] relative overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#8881_0.7px,transparent_0.7px),linear-gradient(to_bottom,#8881_0.7px,transparent_0.7px)] bg-[size:50px_50px] z-0 pointer-events-none"
          style={gridStyle}
        />

        <main className="flex flex-col gap-6 items-center sm:items-start z-10 w-full max-w-md">
          <Section>
            <div className="flex items-end justify-between">
              <div>
                <span className="font-medium">Jacob Darvin • </span>
                <span className="text-neutral-500">Full Stack Engineer</span>
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

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Chevron targetId="black-section" />
        </div>
      </div>

      <div
        id="black-section"
        className="min-h-screen bg-black text-white flex items-center justify-center relative transition-colors duration-500 py-16"
      >
        <div className="flex flex-col max-w-2xl w-full">
          <Post
            post={{
              title: "My First Post!",
              date: "May 10, 2025",
              author: "Jacob Darvin",
              readTime: "5 min read",
              content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.

Vivamus luctus egestas leo. Duis ac turpis. Integer rutrum ante eu lacus. Vestibulum libero nisl, porta vel, scelerisque eget, malesuada at, neque. Vivamus eget nibh. Etiam cursus leo vel metus. Nulla facilisi.

Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue. Nam elit magna, hendrerit sit amet, tincidunt ac, viverra sed, nulla.`,
              slug: "my-first-post",
            }}
          />
          <div className="mt-4 self-start flex items-center">
            <Link href="/blog" className="flex items-center">
              See Blog
              <ChevronRight className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
