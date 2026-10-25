"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export function BackLink() {
  const router = useRouter();

  return (
    <Link
      href="/"
      onClick={(event) => {
        if (window.history.length > 1) {
          event.preventDefault();
          router.back();
        }
      }}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <IoMdArrowBack aria-hidden className="size-4" />
      Back
    </Link>
  );
}
