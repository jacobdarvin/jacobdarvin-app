"use client";

import React from "react";
import Post from "../components/Post";
import Link from "next/link";
import { Box, ChevronLeft } from "lucide-react";
import { Young_Serif } from "next/font/google";
import { Post as PostType } from "../../types/post";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

export default function BlogPage() {
  const posts: PostType[] = [
    {
      title: "Lorem Ipsum Dolor Sit Amet",
      date: "April 18, 2025",
      author: "Lorem Ipsum",
      readTime: "8 min read",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      slug: "lorem-ipsum-dolor-sit-amet",
    },
    {
      title: "Consectetur Adipiscing Elit",
      date: "April 10, 2025",
      author: "Lorem Ipsum",
      readTime: "6 min read",
      content:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      slug: "consectetur-adipiscing-elit",
    },
    {
      title: "Sed Do Eiusmod Tempor",
      date: "March 28, 2025",
      author: "Lorem Ipsum",
      readTime: "5 min read",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      slug: "sed-do-eiusmod-tempor",
    },
  ];

  // Get featured post (most recent)
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-black text-white py-8 md:py-16">
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
            Thoughts, ideas and general stuff.
          </p>
        </header>

        {/* Latest Post */}
        <div className="mb-16">
          <div className="text-sm uppercase tracking-wider text-white/60 mb-4 font-medium">
            Latest Post
          </div>
          <div className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-colors border border-neutral-800">
            <Post post={featuredPost} variant="featured" />
          </div>
        </div>

        {/* Post Grid */}
        <div className="text-sm uppercase tracking-wider text-white/60 mb-4 font-medium">
          Other Posts
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-colors border border-neutral-800"
            >
              <Post post={post} variant="regular" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
