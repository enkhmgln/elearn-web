<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Learned User Preferences

- Prefer a design-system gallery (components, colors, tokens, typography) over a product landing page when iterating on the template.
- Keep Mongolian/Cyrillic sample copy in the showcase so typography can be judged; do not switch the gallery to English-only labels.
- Keep `lib` generic and reusable; put domain endpoints and feature UI under `features/`.
- Prefer `export *` in barrel `index.ts` files over named re-exports.
- Prefer existing shadcn/Base UI primitives over hand-rolled equivalents when they exist.
- Format dates as `YYYY/MM/DD` (e.g. `2024/12/31`) and include time-ago helpers; storage helpers should be generic get/set only, not session wrappers.
- Do not add an input focus ring while typing, accordion hover underlines, or heavy class stacks on tab triggers.
- Always use bun (`bun add`, `bun remove`, `bunx --bun shadcn@latest`); do not use npm or npx for installs.
- Forms use TanStack Form + Zod through `lib/form` (`useForm`, `Form`, `TextField`); do not use react-hook-form or `useAppForm`. Password is `TextField type="password"`. Pass `form` once on `Form`, not on each field. `useForm` takes `schema`; pass `defaultValues` only to prefill (profile update).

## Learned Workspace Facts

- This is a reusable Next.js template using shadcn with Base UI (base-maia) and Lucide; the design-system gallery lives at `/showcase` (`features/showcase`), not on the home page.
- Root `html` uses `lang="mn"`.
- Custom GIP fonts live in `app/fonts/` and load with `next/font/local` in `app/layout.tsx`; one family covers `--font-sans`, `--font-heading`, and `--font-mono`. Do not host fonts from `public/` or use Google fonts.
- The backend REST envelope is `{ success, message, data }` with paginated lists as `{ count, next, previous, results }`; fetch it client-side through `lib/http` plus TanStack Query. `useMutation` toasts `error.message` by default. Client forms use `lib/form` (`useForm({ schema })`, `Form`, `TextField`) with Zod schemas under `features/`; `defaultValues` is only for prefills.
- App/env values live in `lib/constants.ts` as an uppercase object (`process.env.NEXT_PUBLIC_API_URL` without required/zod); keep only `.env` and `.env.example`.
- Result dialogs use `DialogFeedback` from `components/ui/dialog-feedback.tsx` (`success` | `error` | `warning`) with Lottie files in `assets/lottie/`. `Dialog` stays the shell; there is no info variant.
- Toasts use Sonner from `components/ui/sonner.tsx`, positioned `top-center`, title-only. Toast surface stays default; only the Lucide icon well is tinted by variant. Lottie stays on `DialogFeedback` only.
