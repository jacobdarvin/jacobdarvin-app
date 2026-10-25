"use client";

import { useEffect, useRef } from "react";

type CreditRollProps = {
  /** Pinned in place while the text rolls over it. */
  frame: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Pins `frame` to the viewport and rolls `children` up over it as the page
 * scrolls, like film credits. The text starts just below the frame, so the
 * frame is shown on its own first, and the frame scrolls away once the last
 * line has left the top.
 */
export function CreditRoll({ frame, children }: CreditRollProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const sticky = stickyRef.current;
    const scrim = scrimRef.current;
    const text = textRef.current;
    if (!root || !sticky || !scrim || !text) return;

    let stickyTop = 0;
    let frameHeight = 0;
    let textHeight = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrolled = Math.max(
        0,
        stickyTop - root.getBoundingClientRect().top,
      );
      const remaining = frameHeight + textHeight - scrolled;
      const fade = frameHeight / 3;
      text.style.translate = `0 ${frameHeight - scrolled}px`;
      scrim.style.opacity = String(
        Math.max(0, Math.min(1, scrolled / fade, remaining / fade)),
      );
    };

    const measure = () => {
      stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      frameHeight = sticky.offsetHeight;
      textHeight = text.offsetHeight;
      // Long enough for the text to travel from the frame's bottom edge to
      // past its top while the frame stays pinned.
      root.style.height = `${2 * frameHeight + textHeight}px`;
      update();
    };

    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(sticky);
    observer.observe(text);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div ref={stickyRef} className="sticky top-12">
        {frame}
        <div
          ref={scrimRef}
          className="pointer-events-none absolute inset-0 bg-black/60 opacity-0"
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden mask-[linear-gradient(transparent,black_12%,black_88%,transparent)]">
          <div
            ref={textRef}
            className="absolute inset-x-0 top-0 translate-y-[100vh] px-5 py-16 text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.6)] md:px-10 [&_a]:pointer-events-auto"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
