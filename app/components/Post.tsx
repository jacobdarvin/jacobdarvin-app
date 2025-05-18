import { Young_Serif } from "next/font/google";
import { Post as PostType } from "../../types/post";
import Link from "next/link";
import Image from "next/image";
import { calculateReadTime, formatTimestamp } from "@/utils/time";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

interface PostProps {
  post: PostType;
  isLatest?: boolean;
}

export default function Post({ post, isLatest = false }: PostProps) {
  const date = formatTimestamp(post.created_at);
  const readTime = calculateReadTime(post.content);

  return (
    <Link href={`/blog/${post.id}`}>
      <div
        className={
          "backdrop-blur-sm bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-colors border border-neutral-800 h-full"
        }
      >
        <article className="flex flex-col md:flex-row gap-4 h-full">
          <div className="flex-1">
            <time className="text-sm text-gray-400 block mb-1">{date}</time>
            <h3
              className={`${youngSerif.className} text-xl ${
                isLatest ? "md:text-4xl" : ""
              } mb-2`}
            >
              {post.title}
            </h3>
            <div className="text-sm text-gray-400 flex mb-3">
              <span>{readTime}</span>
            </div>
            <p className="text-white/80 mb-2 line-clamp-3">
              {post.content.split("\n\n")[0]}
            </p>
          </div>
          <div className="md:w-1/3 flex-shrink-0 h-[200px]">
            {post.image ? (
              <div className="relative h-full w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="rounded-lg object-cover object-top"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white/40">No image</span>
              </div>
            )}
          </div>
        </article>
      </div>
    </Link>
  );
}
