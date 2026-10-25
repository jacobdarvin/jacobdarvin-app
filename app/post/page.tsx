import type { Metadata } from "next";
import { logout } from "@/app/actions";
import { PostForm } from "@/components/PostForm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "New post",
  robots: { index: false },
};

export default function NewPostPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl space-y-6 rounded-xl border bg-card p-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create a new post
          </h1>
          <form action={logout}>
            <Button type="submit" variant="outline">
              Log out
            </Button>
          </form>
        </div>
        <PostForm />
      </div>
    </main>
  );
}
