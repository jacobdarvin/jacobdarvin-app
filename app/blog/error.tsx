"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function BlogError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-[65ch] px-4 py-24">
      <h1 className="font-display text-4xl">Couldn&apos;t load the blog</h1>
      <p className="mt-3 mb-6 text-muted-foreground">
        Something went wrong fetching posts.
      </p>
      <Button variant="outline" onClick={retry}>
        Try again
      </Button>
    </div>
  );
}
