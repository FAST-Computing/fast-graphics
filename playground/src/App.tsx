'use client';

import { useState } from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Button,
  Typography,
} from '@mui/material';

import EggAltIcon from '@mui/icons-material/EggAlt';
import CakeIcon from '@mui/icons-material/Cake';
import IcecreamIcon from '@mui/icons-material/Icecream';
import SetMealIcon from '@mui/icons-material/SetMeal';

import type { BrandName } from '@fast/tokens';
import {
  FastCard,
  FastButton,
  FastBurger,
  FastTable,
  FastLoader,
  FastThemeProvider,
  FastTextField,
  FastDialog,
  FastCheckbox,
} from '@fast/components';
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [textValue, setTextValue] = useState('');

  return (
    <FastThemeProvider brand={brand}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
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

        {/* Components demo */}
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          FAST Cats
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Cats are the best, and these cards are the best way to show them off. You can customize the card's width, height, and content. 
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FastCard width="25%" height="auto">
            <Box
              component="img"
              src="/cat1.jpg"
              alt=""
              sx={{ width: '100%', height: '420px', mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Nice cat
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
              This card accepts custom children, button label, icon and button color, and also images.
              That's quite a nice cat!
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
              <FastButton label="Feed the cat" icon={<SetMealIcon />} color="primary" width="50%" height={40} animated/>
              <FastButton label="Pet the cat" icon={<CakeIcon />} color="secondary" width="50%" height={40} animated/>
            </Box>
          </FastCard>
          <FastCard width="25%" height="auto">
            <Box
              component="img"
              src="/cat2.jpg"
              alt=""
              sx={{ width: '100%', height: '420px', objectFit: 'cover', mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Another nice cat
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
              This card accepts custom children, button label, icon and button color, and also images.
              You can't pet the cat.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
              <FastButton label="Feed the cat" icon={<SetMealIcon />} color="primary" width="100%" height={40} animated/>
            </Box>
          </FastCard>
          <FastCard width="25%" height="100%">
            <Box
              component="img"
              src="/cat4.jpg"
              alt=""
              sx={{ width: '100%', height: '420px', objectFit: 'cover', mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Sleepy cat
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
              This card accepts custom children, button label, icon and button color, and also images.
              The cat is sleeping.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
              <FastButton label="Don't wake up the cat" icon={<EggAltIcon />} color="primary" width="100%" height={40} />
            </Box>
          </FastCard>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Important cat data
        </Typography>
        <Typography sx={{ mb: 2 }}>
          A very relevant study about cats in the neighborhood, with sortable and pageable table.
        </Typography>

        <FastTable data={defaultData} columns={defaultColumns} color="secondary" width="75%" sortable pageable />

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FastBurger color="primary" defaultChecked />
          <FastBurger color="secondary" />

          <FastLoader color="primary" size={128} />
          <FastLoader color="secondary" size={128} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <FastCheckbox color="primary" />Whiskers is the best cat.
          <FastCheckbox color="secondary" />Also Luna is a good cat.
        </Box>

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <FastCheckbox color="primary" disabled checked />Uncheck if cats are bad.
          <FastCheckbox color="secondary" disabled />Check if cats are bad.
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <FastTextField
            label="Default"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            sx={{ minWidth: 200 }}
          />
          <FastTextField
            label="With error"
            error
            helperText="This field is required"
            sx={{ minWidth: 200 }}
          />
          <FastTextField
            label="Disabled"
            disabled
            defaultValue="Cannot edit"
            sx={{ minWidth: 200 }}
          />
          <FastTextField
            label="Secondary color"
            color="secondary"
            defaultValue="Secondary focus"
            sx={{ minWidth: 200 }}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <FastButton label="Open Dialog" onClick={() => setDialogOpen(true)} width={180} height={40} />
        <FastDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Example Dialog"
          actions={
            <>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={() => setDialogOpen(false)}
              >
                Confirm
              </Button>
            </>
          }
        >
          <Typography variant="body1" sx={{ mt: 2 }}>
            This is a branded dialog with a themed header bar.
            The header background uses the brand's primary color with auto-contrasting text.
          </Typography>
          <FastTextField
            label="Your name"
            sx={{ mt: 2, minWidth: 300 }}
          />
        </FastDialog>
      </Box>
    </FastThemeProvider>
  );
}
