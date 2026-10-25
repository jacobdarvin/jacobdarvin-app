"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import type { Post } from "@/lib/log";

type VideoFrameProps = {
  post: Pick<Post, "title" | "image" | "video">;
  /** Played in place of the video's own sound. */
  audio?: string | null;
  /** Makes the whole frame a link, e.g. to the post itself. */
  href?: string;
  /** Turns the sound on as soon as the browser allows; otherwise it starts off. */
  autoSound?: boolean;
  /** Shown over the middle of the frame, left-aligned. */
  children?: React.ReactNode;
};

/**
 * A 4:3 frame that autoplays the post's video muted. With `autoSound` it
 * then plays the `audio` track if one is given, otherwise the video's own
 * sound. Browsers block sound until the visitor interacts with the page, so
 * it stays muted and turns the sound on at the first click or key press.
 */
export function VideoFrame({
  post,
  audio,
  href,
  autoSound,
  children,
}: VideoFrameProps) {
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
    if (!autoSound) return;

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
  }, [autoSound, setSound]);

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
      {audio && (
        <audio
          ref={audioRef}
          src={audio}
          loop
          onPlay={syncSound}
          onPause={syncSound}
        />
      )}

      {children && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black/10 p-5 text-white md:p-10">
          <div className="max-w-full text-left">{children}</div>
        </div>
      )}

      {href && (
        <Link
          href={href}
          aria-label={post.title}
          className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
        />
      )}

      {(post.video || audio) && (
        <button
          type="button"
          data-sound-toggle
          aria-label={soundOn ? "Mute" : "Unmute"}
          onClick={() => {
            stopWaitingRef.current();
            setSound(!soundOn);
          }}
          // Above any overlay laid on the frame, like the post page's credits.
          className="absolute right-4 bottom-4 z-10 grid size-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {soundOn ? (
            <IoVolumeHigh aria-hidden className="size-5" />
          ) : (
            <IoVolumeMute aria-hidden className="size-5" />
          )}
        </button>
      )}
    </div>
  );
}
