import type { Metadata } from "next";
import { MoreEntries } from "@/components/log/MoreEntries";
import { VideoFrame } from "@/components/log/VideoFrame";
import { formatDate, hasContent, toISODate } from "@/lib/log";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Log",
  description: "Que se passe-t-il dans ma vie ?",
};

/** Fits a 4:3 frame on screen under the header. */
const frame = "mx-auto w-full max-w-[calc((100svh-6rem)*4/3)]";

export default async function LogPage() {
  const [latest, ...others] = await getPosts();

  return (
    <>
      <section aria-label="Latest entry" className="px-4 md:px-8">
        <div className={frame}>
          {latest ? (
            <VideoFrame
              post={latest}
              href={hasContent(latest) ? `/log/${latest.id}` : undefined}
            >
              <h1 className="font-serif text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] whitespace-pre-line">
                {latest.title}
              </h1>
              <p className="mt-4 text-white/70">
                <time dateTime={toISODate(latest.created_at)}>
                  {formatDate(latest.created_at)}
                </time>
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
