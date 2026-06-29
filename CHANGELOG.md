# @fast-graphics

## 1.0.0

Major cleanup and scope reduction. Dropped 3 packages (`assets`, `layouts`, `ui`), now focused on design tokens + MUI theme only.

### Breaking

- Removed `packages/assets` — CSS/SCSS variable generation pipeline (`cssVars.ts`, build scripts, dist CSS). Use `@fast/mui-theme` instead.
- Removed `packages/layouts` — React layout components (`DashboardLayout`, `LandingPageLayout`).
- Removed `packages/ui` — UI primitives (`FastButton`).
- Removed `.github/workflows/build-css.yml` — CSS CI pipeline gone with `assets` package.
- `@fast/tokens` no longer exports `cssVars` helpers.
- **Brand renamed**: `corporate` → `fast_core`, `argos` → `fast_argos`, `atlas` → `fast_atlas`.
- **Token structure flattened**: colors grouped by role (`primary.main/dark/light`, `secondary.main/dark/light`, `background.default/paper`, `font.main/mono`).
- `dist/` now in `.gitignore` — build artifacts no longer tracked.

### Features

- **2 new brands**: `simplifica_core`, `simplifica_burlo` — 5 brands total.
- **`@fast/tokens`** — Design tokens source of truth. 5 brands: `fast_core`, `fast_argos`, `fast_atlas`, `simplifica_core`, `simplifica_burlo`.
  - Brand color palette with full primary/secondary hierarchy (main, dark, light).
  - Background (default, paper) and text (primary, secondary) tokens.
  - Font family tokens (main + mono).
  - Framework-agnostic — no MUI/CSS deps.
- **`@fast/mui-theme`** — MUI theme factory from brand tokens.
  - `createThemeFromTokens(brand, options?)` — generates full MUI v9 `Theme`.
  - Supports all 5 brands with nested token structure.
  - Optional `withComponentDefaults` for preconfigured `AppBar` + `Button` defaults.
- Monorepo with npm workspaces — pruned to 2 packages.
- Dual entry points: `@fast-computing/fast-graphics/tokens` + `@fast-computing/fast-graphics/mui-theme`.
- Updated to `@mui/material` ^9.1.2 (latest v9).
- Published to GitHub Packages registry.
- Requires `@mui/material` ^9 + React 18/19 as peer dependencies.

### Changelog

#### v0.0.6 (2026-04-27)

- Fix missing GitHub Actions workflow file.

#### v0.0.5 (2026-04-27)

- Update Atlas brand palette colors.

#### v0.0.4 (2026-02-12)

- Fix `package.json` `files` field to include dist in published package.
- Convert imports to relative paths for standalone installation.
- Configure package for GitHub Packages publication under `@fast-computing` scope.
- Sync package-lock.json with dependencies.

#### v0.0.2 (2026-01-29)

- Split CSS output per brand: separate files for corporate, argos, atlas.
- Auto-build CSS on version bump via GitHub Actions.

#### v0.0.1 (2026-01-28)

- Initial project scaffold.
- Design tokens for 3 brands.
- CSS variable generation pipeline.
- CI with GitHub Actions.
- Package-lock committed for caching.
