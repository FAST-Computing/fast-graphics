# @fast/graphics

Design tokens + MUI theme factory + branded React components for FAST-Computing and Simplifica.

```
packages/
  tokens/       → design tokens (brand colors, fonts)
  mui-theme/    → createThemeFromTokens()
  components/   → 12 branded components
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

All 12 components live in `@fast/components`. See [COMPONENTS.md](./COMPONENTS.md) for full API.

| Component | Description |
|-----------|-------------|
| `FastThemeProvider` | Theme + CssBaseline from a brand name |
| `FastButton` | Wallet-style button, 3 variants, animated hover |
| `FastCard` | Simple Paper card wrapper |
| `FastCardFA` | Full-image card with gradient fade overlay |
| `FastTextField` | Branded text input (MUI TextField wrapper) |
| `FastDialog` | Modal dialog with branded header |
| `FastCheckbox` | Squared checkbox with animated checkmark |
| `FastRadio` | Squared radio button (inline dot) |
| `FastRadioBox` | Tile-style radio selector (icon + label) |
| `FastBurger` | Animated hamburger menu icon |
| `FastLoader` | Pulsing chevron loading indicator |
| `FastTable` | Data table with sort, pagination, actions |


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
