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
import SetMealIcon from '@mui/icons-material/SetMeal';

import { createThemeFromTokens } from '@fast/mui-theme';
import type { BrandName } from '@fast/tokens';

import { FastCard, FastButton, FastBurger, FastTable } from '@fast/components';
import { defaultData, defaultColumns } from './data/tableData.js';

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

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FastCard width={360} height={600}>
            <Box
              component="img"
              src="/cat1.jpg"
              alt=""
              sx={{ width: '100%', height: 'auto', mb: 2, borderRadius: 1 }}
            />
            <Typography variant="body2" sx={{ color: 'text.primary', mb: 2, flexGrow: 1 }}>
              This card accepts custom children, button label, icon and button color, and also images. 
              That's quite a nice cat!
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
              <FastButton label="Feed the cat" icon={<SetMealIcon />} color="primary" width={180} height={40} animated/>
              <FastButton label="Pet" icon={<CakeIcon />} color="secondary" width={120} height={40} animated/>
            </Box>
          </FastCard>
          <FastCard width={260} height={300}>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5 }}>
              Fast Card 2
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary', mb: 2, flexGrow: 1 }}>
              This card accepts custom children, button label, icon and button color. 
              It's also definitely shorter! Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Nam ultrices velit id leo elementum tempor.
            </Typography>
            <FastButton label="Free Icecream" icon={<IcecreamIcon />} color="primary" width={210} height={40} animated/>
          </FastCard>
          <FastCard width={420} height={410}>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5 }}>
              Fast Card 3
            </Typography>
            <Box
              component="img"
              src="/cat4.jpg"
              alt=""
              sx={{ width: '100%', height: 'auto', mb: 2, borderRadius: 1 }}
            />
            <Typography variant="body2" sx={{ color: 'text.primary', flexGrow: 1 }}>
              Meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow. 
              Said the cat.
            </Typography>
          </FastCard>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FastButton label="Egg" color="primary" icon={<EggAltIcon />} width={130} height={40} animated/>
          <FastButton label="Cake" color="secondary" icon={<CakeIcon />} width={130} height={40} animated/>
          <FastButton label="Not Animated" color="primary" icon={<IcecreamIcon />} width={200} height={40} />
          <FastButton label="Egg" color="secondary" icon={<EggAltIcon />} width={250} height={40} animated/>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FastBurger color="primary" defaultChecked />
          <FastBurger color="secondary" />
        </Box>

        <Divider sx={{ my: 3 }} />

        <FastTable data={defaultData} columns={defaultColumns} color="secondary" width="50%" sortable pageable />

      </Box>
    </ThemeProvider>
  );
}
