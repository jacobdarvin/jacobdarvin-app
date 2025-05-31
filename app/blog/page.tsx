import React from "react";
import Post from "../components/Post";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Young_Serif } from "next/font/google";
import { Post as PostType } from "@/types/post";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getPosts() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog`, {
      method: "GET",
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function BlogPage() {
  const posts: PostType[] = await getPosts();

  const latestPost = posts.sort(
    (a, b) => b.created_at._seconds - a.created_at._seconds
  )[0];
  const regularPosts = posts.slice(1);

  return (
    <>
      <div className="container mx-auto px-4 max-w-5xl">
        <Link
          href="/"
          className="text-white/80 hover:text-white transition-colors flex items-center mb-10"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to home
        </Link>

        <header className="mb-12">
          <h1 className={`${youngSerif.className} text-4xl md:text-5xl mb-3 `}>
            Jacob&apos;s Blog
          </h1>
          <p className="text-white/70 text-lg">
            Thoughts and takeaways about the things that happen in my life.
          </p>
        </header>

        {/* Latest Post */}
        <div className="mb-16">
          <div className="text-sm uppercase tracking-wider text-white/60 mb-4 font-medium">
            Latest Entry
          </div>
          <Post post={latestPost} isLatest={true} />
        </div>

        {/* Post Grid */}
        <div className="text-sm uppercase tracking-wider text-white/60 mb-4 font-medium">
          Other Entries
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularPosts.length > 0 ? (
            regularPosts.map((post) => (
              <Post
                key={post.id || `post-${post.created_at._seconds}`}
                post={post}
              />
            ))
          ) : (
            <span>Nothing yet.</span>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800">
          <h1 className={`${youngSerif.className} text-xl md:text-2xl mr-2`}>
            Jacob&apos;s Blog
          </h1>
          <p className="text-white/70 mt-2">
            Thanks for checking this out! Please don&apos;t take anything too
            seriously 😄
          </p>
          <p className="text-white/70 mt-2">
            Want to get in touch? Email me at{" "}
            <a
              href="mailto:jacobisdarvin@gmail.com"
              className="underline text-white hover:text-white/80 transition-colors"
            >
              jacobisdarvin@gmail.com
            </a>
          </p>
          <Link
            href="/"
            className="inline-block mt-4 bg-neutral-900 hover:bg-neutral-900/50 transition-colors py-2 px-5 rounded-full border border-neutral-800"
          >
            Back to jacobdarvin.com
          </Link>
        </div>
      </div>
    </>
  );
}
