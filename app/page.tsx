"use client";

import { useState, useEffect } from "react";

import Pill from "./components/Pill";
import Section from "./components/Section";
import Chevron from "./components/Chevron";

import { Young_Serif } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Box, ChevronRight } from "lucide-react";

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
      <div className="flex items-center justify-center min-h-screen p-8 pb-20 relative overflow-hidden">
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
        <div className="flex flex-col max-w-3xl w-full px-6 md:px-0">
          <div className="mb-8">
            <h2
              className={`${youngSerif.className} text-4xl md:text-5xl mb-3 flex items-center`}
            >
              Jacob&apos;s Life Box
              <Box className="w-10 h-10 ml-4" />
            </h2>
            <p className="text-white/70 mb-6">
              I write about my thoughts, experiences, and things I&apos;ve
              learned along the way. My blog is a collection of personal
              stories, technical insights, and random musings that reflect my
              journey through life and technology.
            </p>
            <Link
              href="/blog"
              className="flex items-center bg-white/10 pl-5 pr-3 py-2.5 rounded-full hover:bg-white/15 transition-colors group border border-neutral-800 w-fit"
            >
              <span className="mr-2">Read my blog</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
