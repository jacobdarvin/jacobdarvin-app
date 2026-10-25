"use client";

import { useEffect } from "react";
import { BackLink } from "@/components/BackLink";
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
    <>
      <BackLink href="/">Back to home</BackLink>
      <h1 className="mb-3 font-serif text-3xl">Couldn&apos;t load the blog</h1>
      <p className="mb-6 text-muted-foreground">
        Something went wrong fetching posts.
      </p>
      <Button variant="outline" onClick={retry}>
        Try again
      </Button>
    </>
  );
}
