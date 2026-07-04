# Master merge, July 2026

This merge keeps the Vue/Vite application as the deployed site while carrying forward every current content change from `master`. The resolution was replayed as small commits so each decision remains reviewable.

## Path mapping

The Vite build copies `public/` into the deployment artifact. Master’s content therefore keeps its original relative structure beneath that served root:

| Master path | Vue path |
| --- | --- |
| `_data/*.yml` | `public/_data/*.yml` |
| `assets/management-images/*` | `public/assets/management-images/original/*` |
| `assets/mentors-images/original/*` | `public/assets/mentors-images/original/*` |
| `assets/ourwork-images/original/*` | `public/assets/ourwork-images/original/*` |
| `assets/partners/*` | `public/assets/partners/*` |
| `assets/past-management-images/*` | `public/assets/past-management-images/original/*` |

Image filenames and content wording from `master` remain unchanged. The Vue image helper accepts filename extensions and resolves generated variants by stem.

## Resolution sequence

1. Imported the current mentor roster, Katri Lotamõis’s revised wording, and Lembitu Valdmets’s profile.
2. Preserved Karina Reisel’s refactor-only profile as inactive data while keeping her off the current mentor page.
3. Imported master’s membership promotions, additions, corrections, and graduate transitions.
4. Preserved refactor-only member names under `inactive` rather than guessing a new membership tier.
5. Imported the 2026 board, board history, placeholder, and referenced historical portraits.
6. Retained master’s exact portfolio image references; the source images were already byte-identical.
7. Added the TalTech engineering faculty partner and exact logo.
8. Restored master’s exact Estonian homepage and student-page wording in the locale files.
9. Represented project URLs as structured links and restored the mentor onboarding callout without raw HTML.
10. Applied master’s fixed board-portrait sizing in the Vue component.

## Files not restored

The old root Jekyll pages, layouts, includes, Sass tree, and `_config.yml` are not consumed by Vite or copied into `dist/`. Restoring them would create a second, stale application beside Vue.

The old shell image converters and committed `optimised/` images are also omitted. `scripts/optimise-images.js` generates the deployment variants from each `public/assets/*/original/` directory, so keeping both pipelines would create competing outputs.

No source record was discarded to satisfy a current roster change. Superseded mentor and member records remain explicitly inactive, and prior portraits remain in their source directories.

## Verification

Run these checks after resolving or changing the imported content:

```sh
npm ci
npm run optimise
npm run build
npm run build-storybook
npm audit --audit-level=high
git diff --check
```

The content audit should also confirm that every active YAML image reference has a matching source image stem under the mapped `public/assets` category.
