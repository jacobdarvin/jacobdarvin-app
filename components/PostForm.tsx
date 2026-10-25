"use client";

import { startTransition, useActionState, useState } from "react";
import { createPost } from "@/app/actions";
import { MediaDropzone } from "@/components/MediaDropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PostForm() {
  const [state, formAction, pending] = useActionState(createPost, {});
  const [video, setVideo] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [coverIsAuto, setCoverIsAuto] = useState(true);

  const chooseVideo = async (file: File | null) => {
    setVideo(file);
    if (coverIsAuto) {
      setCover(file && (await captureFrame(file)));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        // Submitting by hand keeps the fields filled if publishing fails;
        // React resets forms that use the `action` prop after every submit.
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        for (const [field, file] of Object.entries({
          video,
          audio,
          image: cover,
        })) {
          if (file) data.set(field, file);
        }
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
        onChange={chooseVideo}
      />

      <MediaDropzone
        kind="audio"
        label="Audio"
        hint="MP3, M4A, WAV or OGG. Plays with the video on the post page; the log's featured entry keeps the video's own sound."
        file={audio}
        onChange={setAudio}
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
            className="rounded-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          name="title"
          placeholder="Untitled"
          required
          className="h-auto rounded-none border-0 border-b px-0 py-2 font-serif text-4xl focus-visible:border-foreground focus-visible:ring-0 md:text-5xl"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Text
        </label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write something…"
          rows={12}
          required
          className="rounded-none bg-card text-base"
        />
        <p className="text-xs text-muted-foreground">
          Supports ## headings, **bold**, *italic*, `code`, ```fenced code```,
          [links](https://…) and &lt;song&gt;Artist - Title&lt;/song&gt;.
        </p>
      </div>

      <MediaDropzone
        kind="image"
        label="Cover"
        hint="Taken from the video automatically. Shown before it loads."
        file={cover}
        onChange={(file) => {
          setCover(file);
          setCoverIsAuto(false);
        }}
        className="max-w-xs"
      />

      <Button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-none text-base"
      >
        {pending ? "Uploading and publishing…" : "Publish"}
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
