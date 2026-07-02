'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createThemeFromTokens } from '@fast/mui-theme';
import type { BrandName } from '@fast/tokens';

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
