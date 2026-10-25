import type { Post } from "@/lib/log";
import { PostThumb } from "./PostThumb";

export function MoreEntries({ posts }: { posts: Post[] }) {
  return (
    <section aria-labelledby="more-entries" className="px-4 py-24 md:px-8">
      <h2 id="more-entries" className="font-serif text-3xl md:text-4xl">
        More entries
      </h2>
      <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <PostThumb post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
