"use client";

import { ChevronDown } from "lucide-react";

interface ChevronProps {
  targetId: string;
}

export default function Chevron({ targetId }: ChevronProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToSection}
      className="flex flex-col items-center group"
      aria-label="Scroll down"
    >
      <span className="p-2 rounded-full bg-black">
        <ChevronDown className="h-5 w-5 text-white " />
      </span>
    </button>
  );
}
