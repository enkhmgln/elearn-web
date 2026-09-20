<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Learned User Preferences

- Prefer a design-system gallery (components, colors, tokens, typography) over a product landing page when iterating on the template.
- Keep Mongolian/Cyrillic sample copy in the showcase so typography can be judged; do not switch the gallery to English-only labels.

## Learned Workspace Facts

- This is a reusable Next.js template using shadcn with Base UI (base-maia) and Lucide; the home page is the component showcase at `components/component-showcase.tsx`.
- Root `html` uses `lang="mn"`.
- Custom GIP fonts live in `app/fonts/` and load with `next/font/local` in `app/layout.tsx`; one family covers `--font-sans`, `--font-heading`, and `--font-mono`. Do not host fonts from `public/` or use Google fonts.
