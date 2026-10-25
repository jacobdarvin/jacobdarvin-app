import "server-only";
import type { DocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/firebase-admin";
import type { Post } from "@/lib/log";

export const POSTS_TAG = "posts";

const posts = () => db().collection("posts");

const cacheOptions = { tags: [POSTS_TAG], revalidate: 3600 };

function toPost(doc: DocumentSnapshot): Post {
  const { created_at, ...data } = doc.data() ?? {};
  return {
    ...data,
    id: doc.id,
    created_at: (created_at as Timestamp).toMillis(),
  } as Post;
}

/** All posts, newest first. */
export const getPosts = unstable_cache(
  async (): Promise<Post[]> => {
    const snapshot = await posts().orderBy("created_at", "desc").get();
    return snapshot.docs.map(toPost);
  },
  ["posts"],
  cacheOptions,
);

/** A single post, or `null` if it doesn't exist. */
export const getPost = unstable_cache(
  async (id: string): Promise<Post | null> => {
    // Firestore treats "/" as a path separator, so such ids can't be posts.
    if (id.includes("/")) {
      return null;
    }
    const doc = await posts().doc(id).get();
    return doc.exists ? toPost(doc) : null;
  },
  ["post"],
  cacheOptions,
);
