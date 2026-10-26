"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { formatDate, hasContent, toISODate, type Post } from "@/lib/log";

/**
 * A post in the grid; its video previews silently on hover. Posts with no
 * body aren't links, since there's nothing more to read than the title.
 */
export function PostThumb({ post }: { post: Post }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewProps = {
    className: "group block",
    onPointerEnter: () => videoRef.current?.play().catch(() => {}),
    onPointerLeave: () => videoRef.current?.pause(),
  };

  const thumb = (
    <>
      <div className="relative aspect-4/3 overflow-hidden bg-card">
        {post.video ? (
          <video
            ref={videoRef}
            // The fragment makes browsers show the first frame without a poster.
            src={`${post.video}#t=0.1`}
            poster={post.image ?? undefined}
            muted
            loop
            playsInline
            preload="metadata"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          post.image && (
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )
        )}
      </div>
      <h3 className="mt-4 font-serif text-2xl leading-tight whitespace-pre-line">{post.title}</h3>
      <time
        dateTime={toISODate(post.created_at)}
        className="mt-1 block text-sm text-muted-foreground"
      >
        {formatDate(post.created_at)}
      </time>
    </>
  );

  return hasContent(post) ? (
    <Link href={`/log/${post.id}`} {...previewProps}>
      {thumb}
    </Link>
  ) : (
    <div {...previewProps}>{thumb}</div>
  );
}
