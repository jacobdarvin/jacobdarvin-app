import { Young_Serif } from "next/font/google";
import { Post as PostType } from "../../types/post";
import Link from "next/link";
import Image from "next/image";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

interface PostProps {
  post: PostType;
  isLatest?: boolean;
}

const calculateReadTime = (content: string): string => {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

const formatTimestamp = (timestamp: {
  _seconds: number;
  _nanoseconds: number;
}): string => {
  return new Date(timestamp._seconds * 1000).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function Post({ post, isLatest = false }: PostProps) {
  const date = formatTimestamp(post.created_at);
  const readTime = calculateReadTime(post.content);

  return (
    <Link href={`/blog/${post.id}`}>
      <div
        className={
          "bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-colors border border-neutral-800"
        }
      >
        <article className="flex flex-col md:flex-row gap-4">
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
          <div className="md:w-1/3 flex-shrink-0">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                className="w-full h-full aspect-square object-cover rounded-lg"
                width={800}
                height={800}
              />
            ) : (
              <div className="w-full h-full aspect-square bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white/40">No image</span>
              </div>
            )}
          </div>
        </article>
      </div>
    </Link>
  );
}
