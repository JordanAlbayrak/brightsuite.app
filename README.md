# brightsuite.app

The BrightSuite website: a home page with a card per app and a privacy page per app, in English and French, light and dark. Plain static files, no cookies, no trackers, nothing loaded from other sites.

- Edit `src/` (pages, privacy texts, CSS, images), then `node build.mjs`. Output goes to `docs/`, which GitHub Pages serves.
- No dependencies. Inter is self-hosted (`src/assets/fonts`, SIL Open Font License).
- Checks: `node tools/shots.mjs <dir with playwright> <out>` renders every page at phone and 2560x1440 in light and dark and fails on horizontal scroll, cookies or external requests. `node tools/lh.mjs <dir with lighthouse>` runs Lighthouse.
- BrightQueue screenshots: `git clone C:\Dev\BrightQ .brightq-build` (gitignored), `npm ci --ignore-scripts`, then `npm run build:mobile` with dummy local values for `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_API_BASE_URL` (no `.env`). `tools/brightq-demo-shot.mjs .brightq-build/out ...` renders it with demo lessons and aborts every other request.
- `STORE_LIVE` in `src/pages.mjs` switches the BrightPause button from GitHub to the Microsoft Store link once the listing is live.
