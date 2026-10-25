import type { Metadata } from "next";
import { MoreEntries } from "@/components/blog/MoreEntries";
import { VideoFrame } from "@/components/blog/VideoFrame";
import { formatDate, getPosts, readTime, toISODate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Que se passe-t-il dans ma vie ?",
};

/** Fits a 4:3 frame on screen under the header. */
const frame = "mx-auto w-full max-w-[calc((100svh-6rem)*4/3)]";

export default async function BlogPage() {
  const [latest, ...others] = await getPosts();

  return (
    <>
      <section aria-label="Latest entry" className="px-4 md:px-8">
        <div className={frame}>
          {latest ? (
            <VideoFrame post={latest} href={`/blog/${latest.id}`}>
              <h1 className="font-serif text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em]">
                {latest.title}
              </h1>
              <p className="mt-3 text-sm text-white/75">
                <time dateTime={toISODate(latest.created_at)}>
                  {formatDate(latest.created_at)}
                </time>
                {" · "}
                {readTime(latest.content)}
              </p>
            </VideoFrame>
          ) : (
            <div className="flex aspect-4/3 items-center justify-center bg-card">
              <h1 className="font-serif text-[clamp(2.25rem,6vw,5rem)]">
                Test
              </h1>
            </div>
          )}
        </div>
      </section>

      {others.length > 0 && <MoreEntries posts={others} />}
    </>
  );
}
