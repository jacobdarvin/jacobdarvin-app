import "server-only";
import { cookies } from "next/headers";
import { auth } from "@/lib/firebase-admin";

export const AUTH_COOKIE = "auth-token";

/**
 * Whether an ID token belongs to the log's author. Anyone can create a
 * Firebase account with the public API key, so a valid token isn't enough.
 */
export async function isAuthor(idToken: string) {
  const author = process.env.LOG_AUTHOR_EMAIL;
  if (!author) {
    throw new Error("LOG_AUTHOR_EMAIL is not set");
  }

  try {
    const { email } = await auth().verifyIdToken(idToken);
    return email?.toLowerCase() === author.toLowerCase();
  } catch {
    return false;
  }
}

/** Whether the current request is signed in as the author. */
export async function isSignedInAsAuthor() {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  return Boolean(token && (await isAuthor(token)));
}
