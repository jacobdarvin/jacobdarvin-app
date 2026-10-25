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

const MEDIA_FIELDS = Object.keys(MEDIA_TYPES) as MediaField[];

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

  const fields = readFields(formData);
  if ("error" in fields) {
    return fields;
  }
  const media = await publishUploads(formData);
  if ("error" in media) {
    return media;
  }

  const post = await db()
    .collection("posts")
    .add({
      image: null,
      video: null,
      audio: null,
      ...fields,
      ...media,
      created_at: FieldValue.serverTimestamp(),
    });

  updateTag(POSTS_TAG);
  redirect(`/log/${post.id}`);
}

/**
 * Saves changes to a post. A media field with a new upload replaces the
 * file, one marked `keep_<field>` stays as it is, and any other is removed.
 */
export async function updatePost(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!(await isSignedInAsAuthor())) {
    return { error: SESSION_EXPIRED };
  }

  const fields = readFields(formData);
  if ("error" in fields) {
    return fields;
  }
  const media = await publishUploads(formData);
  if ("error" in media) {
    return media;
  }
  for (const field of MEDIA_FIELDS) {
    if (!(field in media) && !formData.has(`keep_${field}`)) {
      media[field] = null;
    }
  }

  try {
    // Firestore treats "/" as a path separator, so such ids can't be posts.
    if (id.includes("/")) throw new Error();
    await db().collection("posts").doc(id).update({ ...fields, ...media });
  } catch {
    return { error: "This post no longer exists." };
  }

  updateTag(POSTS_TAG);
  redirect(`/log/${id}`);
}

/** The post's text fields, checked. */
function readFields(formData: FormData) {
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

  return {
    title,
    content,
    song_title: songTitle || null,
    song_url: songUrl || null,
  };
}

/** Makes the form's uploaded files public and returns their URLs by field. */
async function publishUploads(
  formData: FormData,
): Promise<Partial<Record<MediaField, string | null>> | { error: string }> {
  const media: Partial<Record<MediaField, string | null>> = {};
  for (const field of MEDIA_FIELDS) {
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
  return media;
}

/** Deletes a post and the files uploaded for it. */
export async function deletePost(id: string): Promise<FormState> {
  if (!(await isSignedInAsAuthor())) {
    return { error: SESSION_EXPIRED };
  }
  // Firestore treats "/" as a path separator, so such ids can't be posts.
  if (id.includes("/")) {
    return { error: "This post no longer exists." };
  }

  const doc = db().collection("posts").doc(id);
  const snapshot = await doc.get();
  if (!snapshot.exists) {
    return { error: "This post no longer exists." };
  }
  await doc.delete();

  // Only files this app uploaded, found by the URL `publishUploads` built.
  const prefix = `https://storage.googleapis.com/${bucket().name}/`;
  await Promise.all(
    MEDIA_FIELDS.map((field) => {
      const url = snapshot.get(field);
      const path = typeof url === "string" && url.startsWith(prefix)
        ? url.slice(prefix.length)
        : null;
      return path && UPLOAD_PATH.test(path)
        ? bucket().file(path).delete({ ignoreNotFound: true }).catch(() => {})
        : null;
    }),
  );

  updateTag(POSTS_TAG);
  redirect("/edit");
}
