import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "@/app/actions";
import { PostForm } from "@/components/PostForm";

export const metadata: Metadata = {
  title: "New entry",
  robots: { index: false },
};

export default function NewPostPage() {
  return (
    <div
      className={`log min-h-svh bg-background text-foreground`}
    >
      <header className="flex items-baseline justify-between gap-6 px-4 py-5 md:px-8">
        <Link
          href="/log"
          className="font-serif text-2xl transition-opacity hover:opacity-70"
        >
          log
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Log out
          </button>
        </form>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-8 pb-24">
        <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
          New entry
        </h1>
        <p className="mt-3 mb-12 text-muted-foreground">
          A video, its sound, a title and a few words.
        </p>
        <PostForm />
      </main>
    </div>
  );
}
