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

export default function Post({ post, variant = "regular" }: PostProps) {
  const {
    title,
    content,
    date,
    author = "Jacob Darvin",
    readTime = "3 min read",
    slug,
  } = post;

  const isFeatured = variant === "featured";

  if (isFeatured) {
    return (
      <article className="w-full">
        <div className="mb-2">
          <time className="text-sm text-gray-400">{date}</time>
          <div className="text-sm text-gray-400 flex gap-2">
            {author && <span>{author}</span>}
            {readTime && (
              <>
                <span>•</span>
                <span>{readTime}</span>
              </>
            )}
          </div>
        </div>

        <h1 className={`${youngSerif.className} text-4xl mb-6 font-bold`}>
          {title}
        </h1>

        <div className={`prose prose-invert max-w-none ${inter.className}`}>
          {content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    );
  }

  // Regular post with truncated content (card style)
  return (
    <article>
      <time className="text-sm text-gray-400 block mb-1">{date}</time>
      <h3 className={`${youngSerif.className} text-xl mb-2`}>{title}</h3>
      <div className="text-sm text-gray-400 flex gap-2 mb-3">
        <span>{author}</span>
        <span>•</span>
        <span>{readTime}</span>
      </div>
      <p className="text-white/80 mb-4 line-clamp-3">
        {content.split("\n\n")[0]}
      </p>
      {slug && (
        <Link href={`/blog/${slug}`} className="text-sm font-medium underline">
          Read more
        </Link>
      )}
    </article>
  );
}
