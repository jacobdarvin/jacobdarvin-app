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
| `NEXT_PUBLIC_API_NEST_URL`     | Log API (e.g. `https://api.jacobdarvin.com`)                 |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Signing in at `/login` (Firebase Auth email/password via REST) |

## Structure

- `app/` — routes. `/log` reads posts from the API; `/login` and `/post` are the
  private authoring flow, guarded by `proxy.ts` and powered by Server Actions in
  `app/actions.ts`.
- `components/` — shared UI; `components/ui` holds shadcn-style primitives.
- `lib/log.ts` — API client and post helpers.
- `lib/markdown.ts` — renders the small markdown dialect used in posts (Shiki for code).

The theme follows the visitor's OS light/dark preference.
