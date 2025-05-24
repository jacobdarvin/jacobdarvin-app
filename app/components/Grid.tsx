"use client";

import { useState, useEffect } from "react";

interface GridProps {
  className?: string;
}

export default function Grid({ className }: GridProps) {
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
    transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
    transition: "transform 0.3s ease-out",
  };

  return (
    <div
      className={`fixed inset-0 overflow-hidden bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:50px_50px] z-0 pointer-events-none ${
        className || ""
      }`}
      style={gridStyle}
    />
  );
}
