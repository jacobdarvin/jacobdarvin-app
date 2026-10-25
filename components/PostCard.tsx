import Image from "next/image";
import Link from "next/link";
import {
  excerpt,
  formatDate,
  readTime,
  toISODate,
  type Post,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

export function PostCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.id}`}
      className="group block h-full rounded-xl border bg-card p-6 transition-colors hover:bg-accent md:p-8"
    >
      <article
        className={cn("flex h-full flex-col gap-4", featured && "md:flex-row")}
      >
        <div className="flex-1">
          <p className="mb-1 text-sm text-muted-foreground">
            <time dateTime={toISODate(post.created_at)}>
              {formatDate(post.created_at)}
            </time>
            {" · "}
            {readTime(post.content)}
          </p>
          <h3
            className={cn("mb-2 font-serif text-xl", featured && "md:text-4xl")}
          >
            {post.title}
          </h3>
          <p className="line-clamp-3 text-muted-foreground">
            {excerpt(post.content, 240)}
          </p>
        </div>
        {post.image && (
          <div
            className={cn(
              "relative h-48 shrink-0",
              featured && "md:h-auto md:w-1/3",
            )}
          >
            <Image
              src={post.image}
              alt=""
              fill
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 33vw"
                  : "(max-width: 768px) 100vw, 50vw"
              }
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </article>
    </Link>
  );
}
