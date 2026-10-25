import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { BlogFooter } from "@/components/BlogFooter";
import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Que se passe-t-il dans ma vie ?",
};

const sectionLabel =
  "mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase";

export default async function BlogPage() {
  const [latest, ...others] = await getPosts();

  return (
    <>
      <BackLink href="/">Back to home</BackLink>

      <header className="mb-12">
        <h1 className="mb-3 font-serif text-4xl md:text-5xl">
          Jacob&apos;s Blog
        </h1>
        <p className="text-lg text-muted-foreground">
          Que se passe-t-il dans ma vie ?
        </p>
      </header>

      {latest ? (
        <>
          <section className="mb-16">
            <h2 className={sectionLabel}>Latest entry</h2>
            <PostCard post={latest} featured />
          </section>

          {others.length > 0 && (
            <section>
              <h2 className={sectionLabel}>Other entries</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {others.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <p className="text-muted-foreground">
          Nothing here yet. Check back soon.
        </p>
      )}

      <BlogFooter href="/" cta="Back to jacobdarvin.com">
        <p>
          Thanks for checking this out! Please don&apos;t take anything too
          seriously 😄
        </p>
        <p>
          Want to get in touch? Email me at{" "}
          <a
            href="mailto:jacobisdarvin@gmail.com"
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
          >
            jacobisdarvin@gmail.com
          </a>
        </p>
      </BlogFooter>
    </>
  );
}
