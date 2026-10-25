import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { dmSerif } from "../fonts";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <div
      className={`blog ${dmSerif.variable} min-h-svh bg-background text-foreground`}
    >
      <BlogHeader />
      <main>{children}</main>
      <BlogFooter />
    </div>
  );
}
