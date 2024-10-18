import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return (
    <div className="flex flex-col gap-2 max-w-sm md:max-w-md">{children}</div>
  );
};

export default Section;
