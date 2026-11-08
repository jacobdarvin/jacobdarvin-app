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
  /** Colour of the title and text, one of `TEXT_COLORS`; the default if unset. */
  color?: string | null;
  /** Milliseconds since the epoch. */
  created_at: number;
};

/** The colours a post's text can take, like the swatches in Instagram. */
export const TEXT_COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#ff3b30" },
  { name: "Orange", value: "#ff9500" },
  { name: "Yellow", value: "#ffd60a" },
  { name: "Green", value: "#34c759" },
  { name: "Teal", value: "#5ac8fa" },
  { name: "Blue", value: "#0a84ff" },
  { name: "Purple", value: "#bf5af2" },
  { name: "Pink", value: "#ff6482" },
] as const;

export function isTextColor(value: unknown): value is string {
  return TEXT_COLORS.some((c) => c.value === value);
}

/** Inline style that tints a post's title with its chosen colour. */
export function titleStyle(post: Pick<Post, "color">) {
  return isTextColor(post.color) ? { color: post.color } : undefined;
}

/** Inline style that tints a post's markdown body with its chosen colour. */
export function bodyStyle(post: Pick<Post, "color">) {
  if (!isTextColor(post.color)) return undefined;
  return {
    "--tw-prose-invert-body": post.color,
    "--tw-prose-invert-headings": post.color,
    "--tw-prose-invert-bold": post.color,
    "--tw-prose-invert-links": post.color,
    "--tw-prose-invert-bullets": post.color,
    "--tw-prose-invert-counters": post.color,
  } as React.CSSProperties;
}

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
