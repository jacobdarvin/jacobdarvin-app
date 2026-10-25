import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 px-6 py-16">
      <h1 className="font-serif text-3xl">Page not found</h1>
      <p className="text-muted-foreground">
        There&apos;s nothing here. Maybe it moved, or never existed.
      </p>
      <Link
        href="/"
        className="underline underline-offset-4 hover:text-muted-foreground"
      >
        Back to jacobdarvin.com
      </Link>
    </main>
  );
}
