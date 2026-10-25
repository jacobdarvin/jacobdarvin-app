import { LogFooter } from "@/components/log/LogFooter";
import { LogHeader } from "@/components/log/LogHeader";

export default function LogLayout({ children }: LayoutProps<"/log">) {
  return (
    <div className={`log font-sans min-h-svh bg-background text-foreground`}>
      <LogHeader />
      <main>{children}</main>
      <LogFooter />
    </div>
  );
}
