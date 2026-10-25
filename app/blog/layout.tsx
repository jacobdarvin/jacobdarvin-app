import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogHeader } from "@/components/blog/BlogHeader";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <div className={`blog font-sans min-h-svh bg-background text-foreground`}>
      <BlogHeader />
      <main>{children}</main>
      <BlogFooter />
    </div>
  );
}
