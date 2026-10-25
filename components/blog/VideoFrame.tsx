"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Post } from "@/lib/blog";

type VideoFrameProps = {
  post: Pick<Post, "title" | "image" | "video" | "audio">;
  /** Makes the whole frame a link, e.g. to the post itself. */
  href?: string;
  /** Shown over the bottom of the frame. */
  children?: React.ReactNode;
};

/**
 * A 4:3 frame that autoplays the post's video with its sound: the separate
 * audio track if there is one, otherwise the video's own. Browsers block
 * sound until the visitor interacts with the page, so it falls back to
 * playing muted and turns the sound on at the first click or key press.
 */
export function VideoFrame({ post, href, children }: VideoFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const stopWaitingRef = useRef(() => {});
  const [soundOn, setSoundOn] = useState(false);

  // Mirrors the media elements' own state, so it is right however it changed.
  const syncSound = () => {
    const audio = audioRef.current;
    const video = videoRef.current;
    setSoundOn(audio ? !audio.paused : Boolean(video && !video.muted));
  };

  const setSound = useCallback(async (on: boolean) => {
    const video = videoRef.current;
    const audio = audioRef.current;
    try {
      if (audio) {
        if (on) await audio.play();
        else audio.pause();
      } else if (video) {
        video.muted = !on;
        await video.play();
      }
      return true;
    } catch {
      if (video) {
        video.muted = true;
        video.play().catch(() => {});
      }
      return false;
    }
  }, []);

  useEffect(() => {
    const enableOnInteraction = (event: Event) => {
      if ((event.target as Element).closest?.("[data-sound-toggle]")) return;
      stopWaiting();
      setSound(true);
    };
    const stopWaiting = () => {
      window.removeEventListener("pointerdown", enableOnInteraction);
      window.removeEventListener("keydown", enableOnInteraction);
    };
    stopWaitingRef.current = stopWaiting;

    setSound(true).then((playing) => {
      if (!playing) {
        window.addEventListener("pointerdown", enableOnInteraction);
        window.addEventListener("keydown", enableOnInteraction);
      }
    });
    return stopWaiting;
  }, [setSound]);

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden bg-card">
      {post.video ? (
        <video
          ref={videoRef}
          src={post.video}
          poster={post.image ?? undefined}
          autoPlay
          muted
          loop
          playsInline
          onVolumeChange={syncSound}
          className="size-full object-cover"
        />
      ) : (
        post.image && (
          <Image
            src={post.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )
      )}
      {post.audio && (
        <audio
          ref={audioRef}
          src={post.audio}
          loop
          onPlay={syncSound}
          onPause={syncSound}
        />
      )}

      {children && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-5 pt-24 text-white md:p-10 md:pt-32">
          {children}
        </div>
      )}

      {href && (
        <Link
          href={href}
          aria-label={post.title}
          className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
        />
      )}

      {(post.video || post.audio) && (
        <button
          type="button"
          data-sound-toggle
          onClick={() => {
            stopWaitingRef.current();
            setSound(!soundOn);
          }}
          className="absolute top-4 right-4 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-black/80"
        >
          {soundOn ? "Sound off" : "Sound on"}
        </button>
      )}
    </div>
  );
}
