"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE, isAuthor } from "@/lib/auth";
import type { FormState } from "./posts";

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
  if (!(await isAuthor(idToken))) {
    return { error: "This account can't post here." };
  }

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
