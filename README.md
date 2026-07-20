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
npm install @fast/tokens @fast/mui-theme @fast/components \
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

## Versioning

- **Major** — core changes (affects all apps)
- **Minor** — new tokens or components
- **Fix** — localized fixes

Tag & push to publish to GitHub Packages:

```bash
git tag v<version>
git push origin v<version>
```
