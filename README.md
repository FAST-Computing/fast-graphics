# @fast-computing/fast-graphics

Tokens: 
- FAST Computing: **fast_core**, **fast_argos**, **fast_atlas**
- Simplifica: **simplifica_core**, **simplifica_burlo**


## Quick Start

### 1. Install

```bash
npm install @fast-computing/fast-graphics @mui/material @emotion/react @emotion/styled
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
        <AppThemeProvider brand="fast_core">{children}</AppThemeProvider>
      </body>
    </html>
  );
}
```

## Usage in components

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

> `useTheme` utile quando servono i valori puri (canvas, stili inline nativi, conditional logic). Per componenti MUI basta `sx`.

---

## API

### `createThemeFromTokens(brand, options?)`

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `brand` | `'fast_core' \| 'fast_argos' \| 'fast_atlas' \| 'simplifica_core' \| 'simplifica_burlo'` | — | Token name |
| `options.withComponentDefaults` | `boolean` | `false` | Adds default MUI (AppBar color primary, Button variant contained) |

---

## Structure

```
packages/
  tokens/       → design tokens + CSS vars generator
  mui-theme/    → createThemeFromTokens()
```

## Build

```bash
npm install
npm run build
```
