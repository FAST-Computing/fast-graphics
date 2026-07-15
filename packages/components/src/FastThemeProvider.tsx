'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createThemeFromTokens } from '../../mui-theme/dist/index.js';
import type { BrandName } from '../../tokens/dist/index.js';

export interface FastThemeProviderProps {
  brand: BrandName;
  children: ReactNode;
  withCssBaseline?: boolean;
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
