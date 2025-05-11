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
  ];

  return (
    <div className="min-h-screen bg-black text-white py-16 flex justify-center">
      <div className="container mx-auto">
        <Link
          href="/"
          className="block text-white/80 hover:text-white transition-colors mb-4"
        >
          <ChevronLeft className="inline-block mr-1" />
          Back to home
        </Link>
        <h1 className={`${youngSerif.className} text-4xl md:text-5xl mb-2`}>
          My Blog
        </h1>
        <p className="text-white/80 mb-12">Thoughts, ideas, and projects</p>

        <div className="space-y-16">
          {posts.map((post) => (
            <Post key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
