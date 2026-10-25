import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthorHeader } from "@/components/AuthorHeader";
import { formatDate, toISODate } from "@/lib/log";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Edit",
  robots: { index: false },
};

export default async function EditPostsPage() {
  const posts = await getPosts();

  return (
    <div className={`log min-h-svh bg-background text-foreground`}>
      <AuthorHeader />

      <main className="mx-auto max-w-3xl px-4 pt-8 pb-24">
        <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] mb-12">
          Edit
        </h1>
        {posts.length > 0 ? (
          <ul className="divide-y">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/edit/${post.id}`}
                  className="group flex items-center gap-4 py-4 transition-colors hover:underline md:gap-6"
                >
                  <div className="relative aspect-4/3 w-24 shrink-0 overflow-hidden bg-card md:w-32">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-serif text-xl md:text-2xl">
                      {post.title}
                    </h2>
                    <time
                      dateTime={toISODate(post.created_at)}
                      className="mt-1 block text-sm text-muted-foreground"
                    >
                      {formatDate(post.created_at)}
                    </time>
                  </div>
                  <span className="shrink-0 pr-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    Edit →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">
            No entries yet.{" "}
            <Link
              href="/post"
              className="text-foreground underline underline-offset-4"
            >
              Write the first one.
            </Link>
          </p>
        )}
      </main>
    </div>
  );
}
