"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { cn } from "@/lib/utils";

type Kind = "video" | "audio" | "image";

const nouns: Record<Kind, string> = {
  video: "a video",
  audio: "an audio file",
  image: "an image",
};

type MediaDropzoneProps = {
  kind: Kind;
  label: string;
  hint: string;
  file: File | null;
  onChange: (file: File | null) => void;
  className?: string;
};

/**
 * Click or drop a file in; shows a playable preview once chosen. The parent
 * holds the file and adds it to the form data itself.
 */
export function MediaDropzone({
  kind,
  label,
  hint,
  file,
  onChange,
  className,
}: MediaDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const url = useMemo(() => file && URL.createObjectURL(file), [file]);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  const accept = (candidate: File | undefined) => {
    if (candidate?.type.startsWith(`${kind}/`)) onChange(candidate);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <span className="text-sm font-medium">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept={`${kind}/*`}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          accept(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      {file && url ? (
        <div>
          {kind === "video" && (
            <video
              src={url}
              controls
              muted
              playsInline
              className="aspect-4/3 w-full bg-card object-cover"
            />
          )}
          {kind === "audio" && <audio src={url} controls className="w-full" />}
          {kind === "image" && (
            // eslint-disable-next-line @next/next/no-img-element -- local blob preview
            <img
              src={url}
              alt="Cover preview"
              className="aspect-4/3 w-full bg-card object-cover"
            />
          )}
          <div className="mt-2 flex items-baseline justify-between gap-4 text-sm">
            <span className="truncate text-muted-foreground">
              {file.name} · {formatBytes(file.size)}
            </span>
            <span className="flex shrink-0 gap-4">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="underline-offset-4 hover:underline"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => onChange(null)}
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Remove
              </button>
            </span>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            accept(e.dataTransfer.files[0]);
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 border border-dashed border-input bg-card p-6 text-center text-muted-foreground transition-colors hover:border-ring hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            kind === "audio" ? "h-32" : "aspect-4/3",
            dragging && "border-foreground text-foreground",
          )}
        >
          <FiUpload aria-hidden className="size-6 shrink-0" />
          <span className="text-sm font-medium">
            Drop {nouns[kind]} here, or click to choose
          </span>
          <span className="text-xs">{hint}</span>
        </button>
      )}
    </div>
  );
}

function formatBytes(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
