'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createThemeFromTokens } from '../../mui-theme/dist/index.js';
import type { BrandName } from '../../tokens/dist/index.js';

export interface FastThemeProviderProps {
  /** Brand identifier. One of the 5 available brands. */
  brand: BrandName;
  /** React tree that will receive the generated MUI theme. */
  children: ReactNode;
  /** Inject MUI CssBaseline (normalize + global resets). Default true. */
  withCssBaseline?: boolean;
  /** Apply sensible MUI component defaults (AppBar color, Button variant). Default true. */
  withComponentDefaults?: boolean;
}

export function FastThemeProvider({
  brand,
  children,
  withCssBaseline = true,
  withComponentDefaults = true,
}: FastThemeProviderProps) {
  const theme = createThemeFromTokens(brand, { withComponentDefaults });
  return (
    <ThemeProvider theme={theme}>
      {withCssBaseline && <CssBaseline />}
      {children}
    </ThemeProvider>
  );
}
