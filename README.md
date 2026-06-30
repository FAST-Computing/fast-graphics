# @fast-computing/fast-graphics

Tokens: 
- FAST Computing: **fast_core**, **fast_argos**, **fast_atlas**
- Simplifica: **simplifica_core**, **simplifica_burlo**


## Quick Start

### 1. Install

```bash
npm install @fast-computing/fast-graphics @mui/material @emotion/react @emotion/styled
```

> [!WARNING]
> `fast-graphics ^1.0.0` requires `@mui/material ^9.0.0`. If upgrading from an older `fast-graphics` version, upgrade `@mui/material` simultaneously, as shown above. Additionally, some syntax incompatibilities may arise due to the MUI update.

If you just need to install a specific >=1.0.0 version:

```bash
npm install @fast-computing/fast-graphics@version
```

### 2. Provider

```tsx
// components/ThemeProvider.tsx
'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createThemeFromTokens } from '@fast-computing/fast-graphics/mui-theme';
import type { BrandName } from '@fast-computing/fast-graphics/tokens';

type Props = { brand?: BrandName; children: React.ReactNode };

/* default token/brand, don't change it here */
export function AppThemeProvider({ brand = 'fast_core', children }: Props) {
  const theme = createThemeFromTokens(brand, { withComponentDefaults: true });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

### 3. `layout.tsx`

```tsx
// app/layout.tsx
import { AppThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        {/* Token/brand selection */}
        <AppThemeProvider brand="fast_core">{children}</AppThemeProvider>
      </body>
    </html>
  );
}
```

## Usage in components

### `useTheme()`

```tsx
'use client';
import { useTheme } from '@mui/material/styles';

export function MyCard() {
  const theme = useTheme();

  return (
    <div style={{ background: theme.palette.background.default, padding: 24 }}>
      <h2 style={{ color: theme.palette.text.primary }}>
        Hello FAST
      </h2>
      <p style={{ color: theme.palette.text.secondary }}>
        Secondary text
      </p>
    </div>
  );
}
```

### `sx` prop (idiomatic MUI)

```tsx
'use client';
import { Box, Typography, Button } from '@mui/material';

export function MyCard() {
  return (
    <Box sx={{ bgcolor: 'background.default', p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ color: 'text.primary' }}>
        Hello FAST
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Secondary text
      </Typography>
      <Button variant="contained" color="primary">
        Click
      </Button>
    </Box>
  );
}
```

> `useTheme` utile quando servono i valori puri (canvas, stili inline nativi, conditional logic). Per componenti MUI basta `sx`.

---

## API

### `createThemeFromTokens(brand, options?)`

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `brand` | `'fast_core' \| 'fast_argos' \| 'fast_atlas' \| 'simplifica_core' \| 'simplifica_burlo'` | — | Token name |
| `options.withComponentDefaults` | `boolean` | `false` | Adds default MUI (AppBar color primary, Button variant contained) |

---

## Components

Ready-made branded components importable via `@fast-computing/fast-graphics/components`.

### `BrandPreview`

Renders a visual dashboard of the active brand's palette, typography, and sample UI. Useful for quick brand QA inside any app.

```tsx
'use client';
import { BrandPreview } from '@fast-computing/fast-graphics/components';

export function PreviewPage() {
  return (
    <AppThemeProvider brand="fast_core">
      <BrandPreview />
    </AppThemeProvider>
  );
}
```

Swap the `brand` prop on `AppThemeProvider` to preview each brand identity instantly.

---

## Structure

```
packages/
  tokens/       → design tokens
  mui-theme/    → createThemeFromTokens()
  components/   → BrandPreview + future branded components
```

## Build

Rebuild package:

```bash
npm install
npm run build
```

Rebuild + generate .tgz for local use:

```bash
npm run build && cd packages/tokens && npm pack && cd ../mui-theme && npm pack && cd ../components && npm pack
```

## Versioning

To publish a new version to GitHub Packages:

1. Bump version in `package.json` (root + packages).
2. Commit changes.
3. Tag the commit with the version:

```bash
git tag v<version>
git push origin v<version>
```

Versioning notes:
- *Core* package changes needs to be marked as **major** updates (ex. v1.1.5 -> v2.0.0) - update required in every app
- *Low impact* changes, such as adding new tokens, needs to be marked as **minor** updates (ex. v1.1.5 -> v1.2.0)
- *Localized, small* changes, such as fixing a token, needs to be marked as **fix** updates (ex. v1.1.5 -> v1.1.6 ) - only specific apps need to be updated