export type Post = {
  id: string;
  title: string;
  content: string;
  /** Cover still, used as the video's poster. */
  image: string | null;
  video?: string | null;
  /** Played alongside the video in place of its own sound on the post page. */
  audio?: string | null;
  /** The song in the audio, credited on the post page. */
  song_title?: string | null;
  song_url?: string | null;
  /** Milliseconds since the epoch. */
  created_at: number;
};

/** A title's line breaks as spaces, for places that show it on one line. */
export function flatTitle(title: Post["title"]) {
  return title.replace(/\s*\n\s*/g, " ");
}

export function formatDate(timestamp: Post["created_at"]) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function toISODate(timestamp: Post["created_at"]) {
  return new Date(timestamp).toISOString();
}

/** Plain-text summary of a post's markdown, for cards and meta descriptions. */
export function excerpt(content: string, maxLength = 160) {
  const text = content
    .replace(/<\/?song>/g, "")
    .replace(/^#+\s+/gm, "")
    .replace(/^[-*] +/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, "")}…`;
}

/** Whether a post has a body worth opening, beyond its title and media. */
export function hasContent(post: Pick<Post, "content">) {
  return excerpt(post.content).length > 0;
}
