# @fast-graphics

Design tokens + MUI theme factory + branded React components for FAST-Computing and Simplifica.

```
packages/     → fast-graphics core
  tokens/       → design tokens (brand colors, fonts)
  mui-theme/    → token conversion into MUI themes
  components/   → custom components
playground/   → local testing via Vite
stories/      → Storybook docs showcase
```

---

## Quick Start

### Install

```bash
npm install @fast-computing/tokens @fast-computing/mui-theme @fast-computing/components \
  @mui/material @emotion/react @emotion/styled
```

### Provider

```tsx
import { FastThemeProvider } from '@fast-computing/fast-graphics/components';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FastThemeProvider brand="fast_core">
          {children}
        </FastThemeProvider>
      </body>
    </html>
  );
}
```

### Use a component

```tsx
import { FastButton } from '@fast-computing/fast-graphics/components';

<FastButton label="Click me" color="primary" animated />
```

### Fallback to MUI

```tsx
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

<Button variant="contained" color="primary">MUI works too</Button>
```

---

## Brands

| Brand | Name |
|-------|------|
| FAST Computing Core | `fast_core` |
| FAST Computing Argos | `fast_argos` |
| FAST Computing Atlas | `fast_atlas` |
| Simplifica Core | `simplifica_core` |
| Simplifica Burlo | `simplifica_burlo` |
| SmartTour | `smarttour` |

---

## Components

Full API documentation on [fast-graphics's Storybook](https://fast-computing.github.io/fast-graphics/).

---

## Development

```bash
npm run dev          # Vite playground (port 5173)
npm run storybook    # Storybook (port 6006)
npm run build        # build all packages
npm run build-storybook  # static Storybook output
```

Storybook is auto-deployed to GitHub Pages on push to `main`.

---

## Versioning & Releasing

Versioning is handled natively with **npm workspaces** — no extra tooling. All
three publishable packages (`@fast-computing/tokens`, `@fast-computing/mui-theme`,
`@fast-computing/components`) are versioned in lockstep from a single command,
so you never edit a `package.json` version by hand.

### 1. Bump the version (patch / minor / major)

```bash
npm run version:bump -- patch   # or: minor | major
```

This updates the version in all three packages **and** the root in one step,
without creating a git commit or tag (you control those).

### 2. Build & publish to GitHub Packages

```bash
npm run build
npm run publish
```

`npm run publish` pushes `@fast-computing/tokens`, `@fast-computing/mui-theme`,
and `@fast-computing/components` to `https://npm.pkg.github.com`. Internal
package dependencies use the `workspace:` protocol, so npm automatically rewrites
them to real version ranges in the published tarballs.

### 3. Tag & push

```bash
git tag v<version>
git push origin v<version>
```

### Bump guidelines

- **Major** — core changes (affects all apps)
- **Minor** — new tokens or components
- **Patch** — localized fixes

### Authentication

Publishing requires a GitHub Packages token. The repo `.npmrc` maps the
`@fast-computing` scope to GitHub Packages and reads the token from the
`GITHUB_TOKEN` environment variable, so set it before publishing:

```bash
export GITHUB_TOKEN=ghp_xxx   # PAT with read:packages + write:packages
```

> The `.npmrc` contains **no secret** — only the registry mapping and a
> reference to the env var.

---

## Tests

Automated tests can be executed **locally** on Storybook.
