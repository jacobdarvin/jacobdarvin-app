"use client";

import React from "react";
import Post from "../components/Post";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Young_Serif } from "next/font/google";
import { Post as PostType } from "../../types/post";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

export default function BlogPage() {
  const posts: PostType[] = [
    {
      title: "Building a Modern Portfolio with Next.js",
      date: "April 18, 2024",
      author: "Jacob Darvin",
      readTime: "8 min read",
      content: `Next.js has become my go-to framework for building modern web applications. It offers an incredible developer experience while producing highly optimized websites. In this post, I'll share how I built my portfolio using Next.js 14 with App Router.

The key advantages I've found are:
- Server Components for improved performance
- Built-in routing with minimal configuration
- Excellent TypeScript integration
- Vercel's deployment platform makes shipping updates a breeze`,
      slug: "building-modern-portfolio-nextjs",
    },
    {
      title: "Mastering TypeScript for Frontend Development",
      date: "April 10, 2024",
      author: "Jacob Darvin",
      readTime: "6 min read",
      content: "TypeScript has transformed how I build web applications...",
      slug: "mastering-typescript-frontend",
    },
    {
      title: "The Future of Web Development: AI Integration",
      date: "March 28, 2024",
      author: "Jacob Darvin",
      readTime: "5 min read",
      content: "AI is rapidly changing how we approach web development...",
      slug: "future-web-development-ai",
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
          <h1 className={`${youngSerif.className} text-4xl md:text-5xl mb-3`}>
            I am Jacob!
          </h1>
          <p className="text-white/70 text-lg">
            Thoughts, ideas, general life stuff.
          </p>
        </header>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="text-sm uppercase tracking-wider text-white/60 mb-4 font-medium">
            Featured Post
          </div>
          <div className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-colors">
            <Post post={featuredPost} variant="featured" />
          </div>
        </div>

        {/* Post Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Recent Articles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <Post post={post} variant="regular" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
