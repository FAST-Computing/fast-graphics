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

import EggAltIcon from '@mui/icons-material/EggAlt';
import CakeIcon from '@mui/icons-material/Cake';
import IcecreamIcon from '@mui/icons-material/Icecream';

import { createThemeFromTokens } from '@fast/mui-theme';
import type { BrandName } from '@fast/tokens';

import { FastCard, FastButton, FastBurger, FastTable } from '@fast/components';

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
          @fast/components - Playground
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

        {/* Live components preview */}
        <FastCard />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FastButton label="Egg" color="primary" icon={<EggAltIcon />} width={130} height={40} animated/>
          <FastButton label="Cake" color="secondary" icon={<CakeIcon />} width={130} height={40} animated/>
          <FastButton label="Icecream" color="primary" icon={<IcecreamIcon />} width={130} height={40} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FastBurger color="primary" defaultChecked />
          <FastBurger color="secondary" />
        </Box>

        <Divider sx={{ my: 3 }} />

        <FastTable color="secondary" width="50%" sortable pageable />

      </Box>
    </ThemeProvider>
  );
}
