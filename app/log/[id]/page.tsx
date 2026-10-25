import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IoMusicalNotes } from "react-icons/io5";
import { MoreEntries } from "@/components/log/MoreEntries";
import { VideoFrame } from "@/components/log/VideoFrame";
import { excerpt, formatDate, readTime, toISODate } from "@/lib/log";
import { renderMarkdown } from "@/lib/markdown";
import { getPost, getPosts } from "@/lib/posts";

export async function generateMetadata({
  params,
}: PageProps<"/log/[id]">): Promise<Metadata> {
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
      url: `/log/${id}`,
      siteName: "Jacob's Log",
      title: post.title,
      description,
      publishedTime: toISODate(post.created_at),
      images,
      videos: post.video ? [{ url: post.video }] : undefined,
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images,
    },
  };
}

export default async function LogPostPage({
  params,
}: PageProps<"/log/[id]">) {
  const { id } = await params;
  const [post, posts] = await Promise.all([getPost(id), getPosts()]);
  if (!post) {
    notFound();
  }

  const html = await renderMarkdown(post.content);
  const others = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <article className="px-4 md:px-8">
        <div className="mx-auto w-full max-w-[calc((100svh-6rem)*4/3)]">
          <VideoFrame post={post} audio={post.audio} />
        </div>

        <div className="mx-auto max-w-[65ch] pt-16">
          <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
            {post.title}
          </h1>
          <p className="mt-4 text-muted-foreground">
            <time dateTime={toISODate(post.created_at)}>
              {formatDate(post.created_at)}
            </time>
            {" · "}
            {readTime(post.content)}
          </p>
          {post.song_title && (
            <p className="mt-2 flex items-center gap-2 text-muted-foreground">
              <IoMusicalNotes aria-label="Song" className="size-4 shrink-0" />
              {post.song_url && /^https?:\/\//.test(post.song_url) ? (
                <a
                  href={post.song_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
                >
                  {post.song_title}
                </a>
              ) : (
                <span className="text-foreground">{post.song_title}</span>
              )}
            </p>
          )}
          <div
            className="prose prose-lg mt-10 max-w-none prose-invert prose-headings:font-serif prose-headings:font-normal"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>

      {others.length > 0 && <MoreEntries posts={others} />}
    </>
  );
}
