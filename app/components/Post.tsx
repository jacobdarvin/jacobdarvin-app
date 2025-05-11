import { Young_Serif, Inter } from "next/font/google";
import { Post as PostType } from "../../types/post";
import Link from "next/link";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

interface PostProps {
  post: PostType;
  variant?: "featured" | "regular";
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

export default function Post({ post, variant = "regular" }: PostProps) {
  const date = formatTimestamp(post.created_at);
  const readTime = calculateReadTime(post.content);

  const isFeatured = variant === "featured";

  if (isFeatured) {
    return (
      <Link href={`/blog/${post.id}`}>
        <article className="w-full">
          <div className="mb-2">
            <time className="text-sm text-gray-400">{date}</time>
            <div className="text-sm text-gray-400 flex gap-2">
              <span>{readTime}</span>
            </div>
          </div>

          <h1 className={`${youngSerif.className} text-4xl mb-6 font-bold`}>
            {post.title}
          </h1>

          <div className={`prose prose-invert max-w-none ${inter.className}`}>
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </Link>
    );
  }

  // Regular post with truncated content (card style)
  return (
    <article>
      <time className="text-sm text-gray-400 block mb-1">{date}</time>
      <h3 className={`${youngSerif.className} text-xl mb-2`}>{post.title}</h3>
      <div className="text-sm text-gray-400 flex mb-3">
        <span>{readTime}</span>
      </div>
      <p className="text-white/80 mb-4 line-clamp-3">
        {post.content.split("\n\n")[0]}
      </p>
      {post.id && (
        <Link
          href={`/blog/${post.id}`}
          className="text-sm font-medium underline"
        >
          Read more
        </Link>
      )}
    </article>
  );
}
