import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Hey me!</h1>
          <p className="text-sm text-muted-foreground">
            If you&apos;re not me, congratulations on finding the secret login
            page!
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
