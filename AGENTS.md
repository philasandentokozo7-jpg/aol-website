<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a static-export Next.js 16 marketing site (npm). Standard commands live in `README.md` and `package.json` scripts (`dev`, `build`, `start`, `lint`, `typecheck`). The update script already runs `npm install`, so dependencies are ready when a session starts.

- Run the app in dev with `npm run dev` (serves on http://localhost:3000). It runs with no env vars — `src/config/site.ts` safely defaults to staging/noindex. Copy `.env.example` to `.env.local` only if you need to override public config.
- `npm run build` produces a static export in `out/`. Preview a built site with `npx serve out -l 3000`.
- The "Book a Free Consultation" modal is the main interactive feature. Its form posts to Netlify Forms (`aol-website-enquiries`); real submissions only work on a Netlify-hosted deploy. Under `npm run dev` the POST to `/` returns 200, so the flow appears to succeed and redirects to `/thank-you/` — this does NOT mean an enquiry was actually captured. Client-side validation runs fully locally and is the reliable thing to verify.
- The homepage "Google Reviews" section is live data via the Netlify Function `netlify/functions/google-rating.mts` (`/api/google-rating`). It requires `GOOGLE_PLACES_API_KEY` (Netlify dashboard env; Places API (New)); without it — and under plain `npm run dev`, where no functions run — the section intentionally renders nothing. To exercise it locally run `npx netlify dev` (port 8888); the function honours `GOOGLE_PLACES_API_BASE` as a test seam for pointing at a local mock of the Places API. Never hardcode ratings or reviews — the repo policy is genuine content or nothing.
- Never commit real `.env` secrets, and never publish the director's personal name, ID, tax number, or residential address (see `README.md` "Privacy").
