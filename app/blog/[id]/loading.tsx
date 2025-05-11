import React from 'react'
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BlogIdLoading() {
  return (
    <div className="min-h-screen bg-black text-white py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/blog"
          className="text-white/80 hover:text-white transition-colors flex items-center mb-10"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to blog
        </Link>

        <article>
          <header className="mb-8">
            {/* Title placeholder */}
            <div className="h-12 md:h-16 bg-white/10 rounded-lg animate-pulse mb-4 max-w-2xl"></div>
            
            {/* Date and read time placeholder */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-4 w-32 bg-white/10 rounded-full animate-pulse"></div>
              <div className="h-4 w-4 bg-white/10 rounded-full animate-pulse"></div>
              <div className="h-4 w-24 bg-white/10 rounded-full animate-pulse"></div>
            </div>
            
            {/* Feature image placeholder */}
            <div className="w-full h-64 md:h-96 bg-white/10 rounded-xl animate-pulse mb-8"></div>
          </header>

          {/* Content placeholders */}
          <div className="space-y-6">
            <div className="h-4 bg-white/10 rounded-full animate-pulse w-full"></div>
            <div className="h-4 bg-white/10 rounded-full animate-pulse w-full"></div>
            <div className="h-4 bg-white/10 rounded-full animate-pulse w-11/12"></div>
            <div className="h-4 bg-white/10 rounded-full animate-pulse w-full"></div>
            <div className="h-4 bg-white/10 rounded-full animate-pulse w-5/6"></div>
            <div className="h-4 bg-white/10 rounded-full animate-pulse w-full"></div>
            <div className="h-4 bg-white/10 rounded-full animate-pulse w-full"></div>
            <div className="h-4 bg-white/10 rounded-full animate-pulse w-4/5"></div>
            <div className="h-4 bg-white/10 rounded-full animate-pulse w-full"></div>
            <div className="h-4 bg-white/10 rounded-full animate-pulse w-3/4"></div>
          </div>
          
          {/* Footer placeholder */}
          <div className="mt-12 pt-8 border-t border-neutral-800">
            <div className="h-6 w-48 bg-white/10 rounded-full animate-pulse mb-3"></div>
            <div className="h-4 w-80 bg-white/10 rounded-full animate-pulse mb-4"></div>
            <div className="h-10 w-28 bg-white/10 rounded-full animate-pulse"></div>
          </div>
        </article>
      </div>
    </div>
  )
}
