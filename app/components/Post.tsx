import { Young_Serif, Inter } from "next/font/google";
import { Post as PostType } from "../../types/post";

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
}

export default function Post({ post }: PostProps) {
  const {
    title,
    content,
    date,
    author = "Jacob Darvin",
    readTime = "3 min read",
  } = post;

  return (
    <article className="w-full ">
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
