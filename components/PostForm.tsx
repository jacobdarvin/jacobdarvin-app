"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { createPost } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PostForm() {
  const [state, formAction, pending] = useActionState(createPost, {});
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <p
          role="alert"
          className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}

      <div className="space-y-2">
        <span className="text-sm font-medium">Image</span>
        <label className="block cursor-pointer rounded-lg border-2 border-dashed p-6 transition-colors hover:border-ring">
          <input
            name="image"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
          />
          {preview ? (
            <span className="group relative block aspect-video">
              <Image
                src={preview}
                alt="Preview"
                fill
                unoptimized
                className="rounded-lg object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                Click to change image
              </span>
            </span>
          ) : (
            <span className="flex flex-col items-center text-muted-foreground">
              <FiUpload aria-hidden className="mb-2 size-8" />
              <span className="text-sm font-medium">
                Click to upload an image
              </span>
              <span className="mt-1 text-xs">PNG, JPG or GIF (max. 10 MB)</span>
            </span>
          )}
        </label>
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          name="title"
          placeholder="Enter post title"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your post content here…"
          rows={12}
          required
        />
        <p className="text-xs text-muted-foreground">
          Supports ## headings, **bold**, *italic*, `code`, ```fenced code```,
          [links](https://…) and &lt;song&gt;Artist - Title&lt;/song&gt;.
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Publishing…" : "Create post"}
      </Button>
    </form>
  );
}
