# jacobdarvin.com

Personal site and log. Next.js 16 (App Router), React 19, Tailwind CSS 4.

```bash
pnpm install
pnpm dev
```

## Environment

Create `.env.local`:

| Variable                       | Used for                                                      |
| ------------------------------ | ------------------------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Signing in at `/login` (Firebase Auth email/password via REST) |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project, e.g. `jacobdarvin-app`                   |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Bucket for post media, e.g. `jacobdarvin-app.firebasestorage.app` |
| `FIREBASE_CLIENT_EMAIL`        | Service account email (Firebase console → Project settings → Service accounts) |
| `FIREBASE_PRIVATE_KEY`         | That service account's private key, with line breaks as `\n` |
| `LOG_AUTHOR_EMAIL`             | The only account allowed to sign in and post               |

The browser uploads post media straight to the bucket with signed URLs, so the
bucket needs a CORS rule allowing `PUT` with a `Content-Type` header from the
site's origins (and `http://localhost:3000` for development).

## Structure

- `app/` — routes. `/log` reads posts from Firestore; `/login` and `/post` are the
  private authoring flow, guarded by `proxy.ts` and powered by Server Actions in
  `app/api/` (`auth.ts`, `posts.ts`).
- `components/` — shared UI; `components/ui` holds shadcn-style primitives.
- `lib/log.ts` — the `Post` type and helpers shared with client components.
- `lib/posts.ts`, `lib/auth.ts`, `lib/firebase-admin.ts` — server-only Firestore
  reads, author checks and the Firebase Admin setup.
- `lib/markdown.ts` — renders the small markdown dialect used in posts (headings, bullets, emphasis, links).

The theme follows the visitor's OS light/dark preference.
