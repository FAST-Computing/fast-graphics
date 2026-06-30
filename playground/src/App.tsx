'use client';

import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Divider,
} from '@mui/material';
import { createThemeFromTokens } from '@fast/mui-theme';
import type { BrandName } from '@fast/tokens';

import { TestComponent } from '@fast/components';

const BRANDS: BrandName[] = [
  'fast_core',
  'fast_argos',
  'fast_atlas',
  'simplifica_core',
  'simplifica_burlo',
];

export default function App() {
  const [brand, setBrand] = useState<BrandName>('fast_core');
  const theme = createThemeFromTokens(brand, { withComponentDefaults: true });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3 }}>
        {/* Brand selector */}
        <Typography variant="h5" sx={{ mb: 1 }}>
          @fast-graphics Playground
        </Typography>
        <ToggleButtonGroup
          value={brand}
          exclusive
          onChange={(_, next) => next && setBrand(next)}
          size="small"
          sx={{ mb: 3, flexWrap: 'wrap' }}
        >
          {BRANDS.map((b) => (
            <ToggleButton key={b} value={b} sx={{ textTransform: 'none' }}>
              {b}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Divider sx={{ mb: 3 }} />

        {/* Live component preview */}
        <TestComponent />
      </Box>
    </ThemeProvider>
  );
}
