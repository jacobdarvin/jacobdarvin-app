import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorHeader } from "@/components/AuthorHeader";
import { DeletePostButton } from "@/components/DeletePostButton";
import { PostForm } from "@/components/PostForm";
import { getPost } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Edit entry",
  robots: { index: false },
};

export default async function EditPostPage({
  params,
}: PageProps<"/edit/[id]">) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    notFound();
  }

  return (
    <div className={`log min-h-svh bg-background text-foreground`}>
      <AuthorHeader />

      <main className="mx-auto max-w-3xl px-4 pt-8 pb-24">
        <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
          Edit entry
        </h1>
        <p className="mt-3 mb-12 text-muted-foreground">
          <Link
            href={`/log/${post.id}`}
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
          >
            {post.title}
          </Link>
        </p>
        {/* Keyed so switching posts starts the form afresh. */}
        <PostForm key={post.id} post={post} />

        <section className="mt-16 border-t pt-8">
          <DeletePostButton key={post.id} id={post.id} />
        </section>
      </main>
    </div>
  );
}
