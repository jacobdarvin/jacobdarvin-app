"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiUrl, type Post } from "@/lib/log";

export type FormState = { error?: string };

const AUTH_COOKIE = "auth-token";

export async function login(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Firebase Auth REST API: same call the client SDK's signInWithEmailAndPassword makes.
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        returnSecureToken: true,
      }),
    },
  );

  if (!res.ok) {
    return { error: "Invalid email or password." };
  }

  const { idToken, expiresIn } = await res.json();
  (await cookies()).set(AUTH_COOKIE, idToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: Number(expiresIn),
    path: "/",
  });

  redirect("/post");
}

export async function logout() {
  (await cookies()).delete(AUTH_COOKIE);
  redirect("/");
}

export async function createPost(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  if (!token) {
    redirect("/login");
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

  const authorization = { Authorization: `Bearer ${token}` };
  const media: Record<string, string | null> = {};

  for (const field of ["image", "video", "audio"]) {
    const file = formData.get(field);
    media[field] = null;
    if (!(file instanceof File) || file.size === 0) continue;

    const upload = new FormData();
    upload.append("file", file);

    const res = await fetch(apiUrl("/blog/upload"), {
      method: "POST",
      headers: authorization,
      body: upload,
    });
    if (!res.ok) {
      return {
        error: errorMessage(`Uploading the ${field} failed`, res.status),
      };
    }
    media[field] = (await res.json()).url;
  }

  const res = await fetch(apiUrl("/blog/posts"), {
    method: "POST",
    headers: { ...authorization, "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      content,
      ...media,
      song_title: songTitle || null,
      song_url: songUrl || null,
    }),
  });
  if (!res.ok) {
    return { error: errorMessage("Couldn't publish the post", res.status) };
  }

  const post: Post = await res.json();
  revalidatePath("/log");
  redirect(`/log/${post.id}`);
}

function errorMessage(prefix: string, status: number) {
  return status === 401
    ? "Your session has expired. Log out and sign in again."
    : `${prefix} (${status}).`;
}
