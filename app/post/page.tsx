import type { Metadata } from "next";
import { AuthorHeader } from "@/components/AuthorHeader";
import { PostForm } from "@/components/PostForm";

export const metadata: Metadata = {
  title: "Post",
  robots: { index: false },
};

export default function NewPostPage() {
  return (
    <div className={`log min-h-svh bg-background text-foreground`}>
      <AuthorHeader />

      <main className="mx-auto max-w-3xl px-4 pt-8 pb-24">
        <h1 className="mb-12 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
          Post
        </h1>
        <PostForm />
      </main>
    </div>
  );
}
