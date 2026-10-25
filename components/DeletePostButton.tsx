"use client";

import { useActionState, useState } from "react";
import { deletePost, type FormState } from "@/app/api/posts";
import { Button } from "@/components/ui/button";

/** Deletes a post after asking once more, since it can't be undone. */
export function DeletePostButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);
  const [state, formAction, pending] = useActionState(
    (): Promise<FormState> => deletePost(id),
    {},
  );

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <p
          role="alert"
          className="bg-destructive/15 p-3 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}

      {confirming ? (
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-sm">
            Delete this entry and its files for good?
          </p>
          <Button
            type="submit"
            disabled={pending}
            className="rounded-none bg-destructive text-white hover:bg-destructive/90"
          >
            {pending ? "Deleting…" : "Delete"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => setConfirming(false)}
            className="rounded-none"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="text-sm text-destructive underline-offset-4 hover:underline"
        >
          Delete entry
        </button>
      )}
    </form>
  );
}
