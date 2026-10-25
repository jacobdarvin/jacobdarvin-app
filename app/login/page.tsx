import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <main
      className={`log flex min-h-svh items-center justify-center bg-background px-4 py-16 text-foreground`}
    >
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-5xl">Hey me!</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          If you&apos;re not me, congratulations on finding the secret login
          page!
        </p>
        <div className="mt-10">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
