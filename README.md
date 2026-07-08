# @fast/graphics

Design tokens + MUI theme factory + branded React components for FAST-Computing and Simplifica.

```
packages/
  tokens/       → design tokens (brand colors, fonts)
  mui-theme/    → createThemeFromTokens()
  components/   → branded components
  playground/   → local testing via Vite
```


## Quick Start

### Install

```bash
npm install @fast/tokens @fast/mui-theme @fast/components \
  @mui/material @emotion/react @emotion/styled
```

### Provider

```tsx
// app/layout.tsx
import { FastThemeProvider } from '@fast/components';

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
'use client';
import { FastButton } from '@fast/components';

<FastButton label="Click me" color="primary" width={180} height={40} animated />
```


## Brands

| Brand | Name |
|-------|------|
| FAST Computing Core | `fast_core` |
| FAST Computing Argos | `fast_argos` |
| FAST Computing Atlas | `fast_atlas` |
| Simplifica Core | `simplifica_core` |
| Simplifica Burlo | `simplifica_burlo` |

## Components

All 14 components live in `@fast/components`. See [COMPONENTS.md](./COMPONENTS.md) for full API.


## Development

```bash
# dev server (Vite playground)
npm run dev

# build all packages
npm run build
```

## Versioning

- **Major** — core package changes (affects all apps)
- **Minor** — new tokens or components
- **Fix** — localized fixes

Tag commits and push to trigger GitHub Packages publish:

```bash
git tag v<version>
git push origin v<version>
```
