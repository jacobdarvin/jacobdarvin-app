export type Post = {
  id: string;
  title: string;
  content: string;
  /** Cover still, used as the video's poster. */
  image: string | null;
  video?: string | null;
  /** Played alongside the video in place of its own sound. */
  audio?: string | null;
  created_at: {
    _seconds: number;
    _nanoseconds: number;
  };
};

const REVALIDATE_SECONDS = 3600;

export function apiUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_API_NEST_URL;
  if (!base) {
    throw new Error("NEXT_PUBLIC_API_NEST_URL is not set");
  }
  return `${base}${path}`;
}

/** All posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const res = await fetch(apiUrl("/blog/posts"), {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }

  const posts: Post[] = await res.json();
  return posts.toSorted(
    (a, b) => b.created_at._seconds - a.created_at._seconds,
  );
}

/** A single post, or `null` if it doesn't exist. */
export async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(apiUrl(`/blog/posts/${encodeURIComponent(id)}`), {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch post ${id}: ${res.status}`);
  }

  // The API answers unknown ids with 200 and an empty body.
  const body = await res.text();
  return body ? JSON.parse(body) : null;
}

export function formatDate(timestamp: Post["created_at"]) {
  return new Date(timestamp._seconds * 1000).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function toISODate(timestamp: Post["created_at"]) {
  return new Date(timestamp._seconds * 1000).toISOString();
}

export function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 238))} min read`;
}

/** Plain-text summary of a post's markdown, for cards and meta descriptions. */
export function excerpt(content: string, maxLength = 160) {
  const text = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<\/?song>/g, "")
    .replace(/^#+\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, "")}…`;
}
