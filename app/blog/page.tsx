import React from "react";
import Post from "../components/Post";
import Link from "next/link";
import { Box, ChevronLeft } from "lucide-react";
import { Young_Serif } from "next/font/google";
import { Post as PostType } from "@/types/post";
import Grid from "../components/Grid";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getPosts() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog`, {
      method: "GET",
      next: { revalidate: 3600 },
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

  const latestPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-black text-white py-8 md:py-16">
      <Grid />
      <div className="container mx-auto px-4 max-w-5xl">
        <Link
          href="/"
          className="text-white/80 hover:text-white transition-colors flex items-center mb-10"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to home
        </Link>

        <header className="mb-12">
          <h1
            className={`${youngSerif.className} text-4xl md:text-5xl mb-3 flex items-center`}
          >
            Jacob&apos;s Life Box
            <Box className="w-10 h-10 ml-4" />
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
      </div>
    </div>
  );
}
