# RiseEdge Transport — File Recovery

Date: 2026-07-24

## Good news: nothing is lost

The complete RiseEdge Transport website lives safely in your private GitHub
repository: https://github.com/philasandentokozo7-jpg/riseedge-transport
(branch `master`, latest commit `5f7e801` — "Polish: faster nav, modern
corporate form, cleaner lead email, logo favicon", 17 July 2026).

Every version of every file ever committed is still stored in that
repository's history, so even files that were deleted during redesigns can
be brought back at any time.

## What is in this package

### `riseedge-transport-full-source/`
A complete copy of the current website source code, exactly as it exists on
GitHub today (commit `5f7e801`). This includes all pages, components, the
booking engine, Supabase migrations, tests, docs (GO-LIVE runbook,
compliance notes, master build plan), fonts, and images.

### `recovered-deleted-files/`
Files that were deleted from the website at some point during its redesigns
and no longer exist in the current version. Each was extracted from git
history at its last version before deletion:

| File | Deleted in | What it was |
|---|---|---|
| `public/fonts/satoshi-400/500/700.woff2` | "Geist/Inter type" restyle | Old Satoshi brand fonts |
| `public/images/car-hero.png` | Early cleanup | Original hero car photo (still in use today as `src/assets/car-hero.png`) |
| `public/og-image.png` | OG image swap | Old social-share image (identical to car-hero.png) |
| `public/images/services/*.webp` (7 photos) | "Remove AI service photography" | AI-generated service card photos (airport transfers, corporate, day hire, event shuttle, lift club, private trips, staff transport) |
| `src/components/Hero.astro` | Homepage light redesign | Old homepage hero component |
| `src/components/QuoteCalculator.tsx` | Sprint 5 booking engine | Old client-side quote calculator (replaced by the zone-pricing booking engine) |

## How to restore any other file yourself

From a clone of the repository:

```
git log --all --oneline -- path/to/file        # find the file's history
git show <commit>:path/to/file > restored-file  # extract any version
```
