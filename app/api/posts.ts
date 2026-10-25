"use server";

import { FieldValue } from "firebase-admin/firestore";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { isSignedInAsAuthor } from "@/lib/auth";
import { bucket, db } from "@/lib/firebase-admin";
import { POSTS_TAG } from "@/lib/posts";

export type FormState = { error?: string };

export type MediaField = "image" | "video" | "audio";

export type Upload = { field: MediaField; path: string; url: string };

const MEDIA_TYPES: Record<MediaField, string> = {
  image: "image/",
  video: "video/",
  audio: "audio/",
};

/** The shape of the paths `prepareUploads` hands out. */
const UPLOAD_PATH = /^log\/\d+-(image|video|audio)-[\w.-]+$/;

const SESSION_EXPIRED = "Your session has expired. Log out and sign in again.";

/**
 * Signed URLs for the browser to upload a post's files straight to Storage,
 * so they never pass through a request body size limit here.
 */
export async function prepareUploads(
  files: { field: MediaField; name: string; type: string }[],
): Promise<{ uploads: Upload[] } | { error: string }> {
  if (!(await isSignedInAsAuthor())) {
    return { error: SESSION_EXPIRED };
  }

  const uploads: Upload[] = [];
  for (const { field, name, type } of files) {
    if (!Object.hasOwn(MEDIA_TYPES, field) || !type.startsWith(MEDIA_TYPES[field])) {
      return { error: `The ${field} must be a ${field} file.` };
    }

    const path = `log/${Date.now()}-${field}-${name.replace(/[^\w.-]+/g, "-")}`;
    const [url] = await bucket()
      .file(path)
      .getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000,
        contentType: type,
      });
    uploads.push({ field, path, url });
  }
  return { uploads };
}

/** Publishes a post whose files `prepareUploads` already put in Storage. */
export async function createPost(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!(await isSignedInAsAuthor())) {
    return { error: SESSION_EXPIRED };
  }

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const songTitle = String(formData.get("song_title") ?? "").trim();
  const songUrl = String(formData.get("song_url") ?? "").trim();

  if (!title || !content) {
    return { error: "Title and content are required." };
  }
  if (songUrl && !/^https?:\/\//.test(songUrl)) {
    return { error: "The song link must start with http:// or https://." };
  }
  if (songUrl && !songTitle) {
    return { error: "Add the song's title to go with its link." };
  }

  const media: Record<MediaField, string | null> = {
    image: null,
    video: null,
    audio: null,
  };
  for (const field of Object.keys(media) as MediaField[]) {
    const path = formData.get(field);
    if (typeof path !== "string" || !path) continue;
    if (!UPLOAD_PATH.test(path)) {
      return { error: `The ${field} upload is invalid.` };
    }

    const file = bucket().file(path);
    try {
      await file.makePublic();
    } catch {
      return { error: `The ${field} didn't finish uploading. Try again.` };
    }
    media[field] = `https://storage.googleapis.com/${file.bucket.name}/${path}`;
  }

  const post = await db()
    .collection("posts")
    .add({
      title,
      content,
      ...media,
      song_title: songTitle || null,
      song_url: songUrl || null,
      created_at: FieldValue.serverTimestamp(),
    });

  updateTag(POSTS_TAG);
  redirect(`/log/${post.id}`);
}
