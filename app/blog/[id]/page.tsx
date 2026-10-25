import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { BlogFooter } from "@/components/BlogFooter";
import { excerpt, formatDate, getPost, readTime, toISODate } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";

export async function generateMetadata({
  params,
}: PageProps<"/blog/[id]">): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    return {};
  }

  const description = excerpt(post.content);
  const images = post.image ? [{ url: post.image, alt: post.title }] : [];

  return {
    title: post.title,
    description,
    authors: [{ name: "Jacob Darvin" }],
    openGraph: {
      type: "article",
      url: `/blog/${id}`,
      siteName: "Jacob's Blog",
      title: post.title,
      description,
      publishedTime: toISODate(post.created_at),
      images,
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images,
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[id]">) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    notFound();
  }

  const html = await renderMarkdown(post.content);

  return (
    <>
      <BackLink href="/blog">Back to blog</BackLink>

      <article>
        <header className="mb-8">
          <h1 className="mb-4 font-serif text-3xl md:text-5xl">{post.title}</h1>
          <p className="text-muted-foreground">
            <time dateTime={toISODate(post.created_at)}>
              {formatDate(post.created_at)}
            </time>
            {" · "}
            {readTime(post.content)}
          </p>
        </header>

        {post.image && (
          <Image
            src={post.image}
            alt=""
            width={1200}
            height={600}
            sizes="(max-width: 896px) 100vw, 896px"
            className="mb-8 w-full rounded-xl"
            priority
          />
        )}

        <div
          className="prose prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-normal"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      <BlogFooter href="/blog" cta="More entries">
        <p>Thank you for reading! Check out more stuff from my blog.</p>
      </BlogFooter>
    </>
  );
}
