"use client";

import { startTransition, useActionState, useState } from "react";
import {
  createPost,
  prepareUploads,
  updatePost,
  type FormState,
  type MediaField,
} from "@/app/api/posts";
import { MediaDropzone } from "@/components/MediaDropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Post } from "@/lib/log";

/** Publishes a new post, or saves changes to `post` if one is given. */
export function PostForm({ post }: { post?: Post }) {
  const [video, setVideo] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [coverIsAuto, setCoverIsAuto] = useState(true);
  // The post's files that stay unless replaced or removed.
  const [saved, setSaved] = useState<Record<MediaField, string | null>>({
    video: post?.video ?? null,
    audio: post?.audio ?? null,
    image: post?.image ?? null,
  });
  const unsave = (field: MediaField) =>
    setSaved((current) => ({ ...current, [field]: null }));

  // Files go straight from the browser to Storage; the post only gets their paths.
  const [state, formAction, pending] = useActionState(
    async (prev: FormState, data: FormData): Promise<FormState> => {
      const files = Object.entries({ video, audio, image: cover }).filter(
        (entry): entry is [MediaField, File] => entry[1] !== null,
      );

      if (files.length > 0) {
        const prepared = await prepareUploads(
          files.map(([field, file]) => ({
            field,
            name: file.name,
            type: file.type,
          })),
        );
        if ("error" in prepared) {
          return prepared;
        }

        const error = await Promise.all(
          prepared.uploads.map(async ({ field, path, url }, i) => {
            const file = files[i][1];
            try {
              const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": file.type },
                body: file,
              });
              if (!res.ok) return `Uploading the ${field} failed (${res.status}).`;
            } catch {
              return `Uploading the ${field} failed. Check your connection and the bucket's CORS settings.`;
            }
            data.set(field, path);
          }),
        ).then((results) => results.find(Boolean));
        if (error) {
          return { error };
        }
      }

      for (const [field, url] of Object.entries(saved)) {
        if (url && !data.has(field)) data.set(`keep_${field}`, "1");
      }

      return post ? updatePost(post.id, prev, data) : createPost(prev, data);
    },
    {},
  );

  const chooseVideo = async (file: File | null) => {
    setVideo(file);
    unsave("video");
    if (coverIsAuto) {
      setCover(file && (await captureFrame(file)));
      unsave("image");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        // Submitting by hand keeps the fields filled if publishing fails;
        // React resets forms that use the `action` prop after every submit.
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => formAction(data));
      }}
      className="space-y-10"
    >
      {state.error && (
        <p
          role="alert"
          className="bg-destructive/15 p-3 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}

      <MediaDropzone
        kind="video"
        label="Video"
        hint="MP4, WebM or MOV, shown in a 4:3 frame. Up to 100 MB."
        file={video}
        src={saved.video}
        onChange={chooseVideo}
      />

      <MediaDropzone
        kind="audio"
        label="Audio"
        hint="MP3, M4A, WAV or OGG. Plays with the video on the post page; the log's featured entry keeps the video's own sound."
        file={audio}
        src={saved.audio}
        onChange={(file) => {
          setAudio(file);
          unsave("audio");
        }}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="song_title" className="text-sm font-medium">
            Song
          </label>
          <Input
            id="song_title"
            name="song_title"
            placeholder="Artist - Title"
            defaultValue={post?.song_title ?? ""}
            className="rounded-none"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="song_url" className="text-sm font-medium">
            Song link
          </label>
          <Input
            id="song_url"
            name="song_url"
            type="url"
            placeholder="https://…"
            defaultValue={post?.song_url ?? ""}
            className="rounded-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        {/* A textarea so the title can break over lines; it grows to fit. */}
        <Textarea
          id="title"
          name="title"
          placeholder="Untitled"
          defaultValue={post?.title}
          rows={1}
          required
          className="field-sizing-content min-h-0 resize-none rounded-none border-0 border-b px-0 py-2 font-serif text-4xl leading-tight focus-visible:border-foreground focus-visible:ring-0 md:text-5xl"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Text{" "}
          <span className="font-normal text-muted-foreground">
            (optional; without it the post can&apos;t be opened from the log)
          </span>
        </label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write something…"
          defaultValue={post?.content}
          rows={12}
          className="rounded-none bg-card text-base"
        />
        <p className="text-xs text-muted-foreground">
          Supports ## headings, ### subheadings, - bullets, **bold**,
          *italic*, [links](https://…) and &lt;song&gt;Artist -
          Title&lt;/song&gt;.
        </p>
      </div>

      <MediaDropzone
        kind="image"
        label="Cover"
        hint="Taken from the video automatically. Shown before it loads."
        file={cover}
        src={saved.image}
        onChange={(file) => {
          setCover(file);
          unsave("image");
          setCoverIsAuto(false);
        }}
        className="max-w-xs"
      />

      <Button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-none text-base"
      >
        {post
          ? pending
            ? "Uploading and saving…"
            : "Save changes"
          : pending
            ? "Uploading and publishing…"
            : "Publish"}
      </Button>
    </form>
  );
}

/** A still from about a second in, to use as the video's cover. */
async function captureFrame(file: File): Promise<File | null> {
  const url = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.src = url;

  try {
    await new Promise((resolve, reject) => {
      video.onloadeddata = resolve;
      video.onerror = reject;
    });
    video.currentTime = Math.min(1, video.duration / 2);
    await new Promise((resolve) => (video.onseeked = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.85),
    );
    const name = `${file.name.replace(/\.[^.]+$/, "")}-cover.jpg`;
    return blob && new File([blob], name, { type: "image/jpeg" });
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}
