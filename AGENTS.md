<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Learned User Preferences

- Prefer a design-system gallery (components, colors, tokens, typography) over a product landing page when iterating on the template.
- Keep Mongolian/Cyrillic sample copy in the showcase so typography can be judged; do not switch the gallery to English-only labels.
- Keep `lib` generic and reusable; put domain endpoints and feature UI under `features/`. No `components/` folder inside a feature (root `components/` is the design system). Split a feature by flow (`auth/login`, `location/city`): `view.tsx` is a page body (`LoginView`), `list.tsx` is a list widget (`CityList`). Shared `api.ts` and `types.ts` stay at the feature root. `User` lives in `features/user`, not auth. Legal/HTML docs live in `features/common`; site chrome (navbar/footer) in `features/public`. `app/` pages only return the view. Nested REST paths use `:param` in `defineQuery` (`/api/location/cities/:cityId/districts/`); leftover params become the query string.
- Prefer `export *` in barrel `index.ts` files over named re-exports.
- Prefer existing shadcn/Base UI primitives over hand-rolled equivalents; use `Link`, `Button`, and `next/image` instead of raw `a`/`button`/`img`.
- Format dates as `YYYY/MM/DD` (e.g. `2024/12/31`) and include time-ago helpers; reuse core date/utils rather than reimplementing them in features. Storage helpers should be generic get/set only, not session wrappers.
- Do not add an input focus ring while typing, accordion hover underlines, or heavy class stacks on tab triggers.
- Always use bun (`bun add`, `bun remove`, `bunx --bun shadcn@latest`); do not use npm or npx for installs.
- Forms use TanStack Form + Zod through `lib/form` (`useForm`, `Form`, `TextField`); do not use react-hook-form or `useAppForm`. Inputs use floating labels (`label` on `Input`/`TextField`). Password is `TextField type="password"`. Pass `form` once on `Form`, not on each field. `useForm` takes `schema`; pass `defaultValues` only to prefill (profile update). On validation errors, show the error message only—do not error-style the label or input border.
- Do not open or use the browser unless the user explicitly asks; they verify UI themselves after changes.
- Use `constants.APP_NAME` for brand/copy, not hardcoded product names.

## Learned Workspace Facts

- This is a reusable Next.js template using shadcn with Base UI (base-maia) and Lucide; the design-system gallery lives at `/showcase` (`features/showcase`), not on the home page.
- Root `html` uses `lang="mn"`.
- Custom GIP fonts live in `assets/fonts/` and load with `next/font/local` via `@/assets/fonts`; one family covers `--font-sans`, `--font-heading`, and `--font-mono`. Do not host fonts from `public/` or use Google fonts.
- The backend REST envelope is `{ success, message, data }` with paginated lists as `{ count, next, previous, results }`; fetch it client-side through `lib/http` plus TanStack Query. `useMutation` toasts `error.message` by default. Client forms use `lib/form` (`useForm({ schema })`, `Form`, `TextField`) with Zod schemas under `features/`; `defaultValues` is only for prefills. Raw HTML endpoints use `defineTextQuery` (e.g. `/terms/`, `/privacy/`).
- App/env values live in `lib/constants.ts` as an uppercase object (`process.env.NEXT_PUBLIC_API_URL` without required/zod); keep only `.env` and `.env.example`.
- Auth routes use `app/(auth)/`; public marketing/legal use `app/(public)/`; authenticated/dashboard routes use `app/(main)/` (no public navbar/footer; gate in the layout directly—no MainGate wrapper). Auth shared chrome (logo, banner, logged-in redirect home) lives in `app/(auth)/layout`; login/signup keep forms in `view.tsx` (no separate form file). Root metadata lives in `lib/metadata.ts`: default title is `constants.APP_NAME`, other pages use the template `AppName | %s`. `app/not-found.tsx` is inline (no separate NotFoundView).
- Client session lives in `lib/session` (not under `features/auth`); tokens/user persist via generic storage. On login, write session (and user when returned); account/navbar UI reads session—do not fetch `/me` just for the menu, and avoid a guest-button flash before client hydrate.
- Result dialogs use `DialogFeedback` from `components/ui/dialog-feedback.tsx` (`success` | `error` | `warning`) with Lottie files in `assets/lottie/`. `Dialog` stays the shell; there is no info variant. Two action buttons stay in one row.
- Toasts use Sonner from `components/ui/sonner.tsx`, positioned `top-center`, title-only, with theme foreground text (not richColors white). Toast surface stays default; only the Lucide icon well is tinted by variant. Lottie stays on `DialogFeedback` only.
