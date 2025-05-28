import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white py-8 md:py-16">
      {children}
    </div>
  );
}
