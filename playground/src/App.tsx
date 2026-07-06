'use client';

import { useState } from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Typography,
} from '@mui/material';

import EggAltIcon from '@mui/icons-material/EggAlt';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import IcecreamIcon from '@mui/icons-material/Icecream';
import SetMealIcon from '@mui/icons-material/SetMeal';
import PetsIcon from '@mui/icons-material/Pets';

import type { BrandName } from '@fast/tokens';
import {
  FastCard,
  FastCardFA,
  FastButton,
  FastBurger,
  FastTable,
  FastLoader,
  FastThemeProvider,
  FastTextField,
  FastDialog,
  FastCheckbox,
  FastRadioBox,
  FastRadio,
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
              src="/cat6.jpg"
              alt=""
              sx={{ width: '100%', height: '420px', mb: 2 }}
            />
            <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 700 }}>
              Garfield
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
              This card accepts custom children, button label, icon and button color, and also images.
              That's quite a nice cat!
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
              <FastButton label="Pet the cat" icon={<WavingHandIcon />} color="primary" width="50%" height={40} animated/>
              <FastButton label="Feed the cat" icon={<SetMealIcon />} color="secondary" width="50%" height={40} animated/>
            </Box>
          </FastCard>
          <FastCard width="25%" height="auto">
            <Box
              component="img"
              src="/cat2.jpg"
              alt=""
              sx={{ width: '100%', height: '420px', objectFit: 'cover', mb: 2 }}
            />
            <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 700 }}>
              Simba
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
              This card accepts custom children, button label, icon and button color, and also images.
              You can't pet the cat.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
              <FastButton label="Pet the cat" icon={<WavingHandIcon />} color="primary" width="80%" height={40} variant="outlined" animated/>
              <FastButton icon={<SetMealIcon />} color="secondary" width="20%" height={40} variant="text" animated/>
            </Box>
          </FastCard>
          <FastCard width="25%" height="100%">
            <Box
              component="img"
              src="/cat4.jpg"
              alt=""
              sx={{ width: '100%', height: '420px', objectFit: 'cover', mb: 2 }}
            />
            <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 700 }}>
              Felix
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
              This card accepts custom children, button label, icon and button color, and also images.
              The cat is very sleepy.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
              <FastButton label="Don't wake up the cat" icon={<EggAltIcon />} color="primary" width="100%" height={40} disabled/>
            </Box>
          </FastCard>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 3 }}>
          <FastCardFA src="/cat3.jpg" width={300} height={420}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'inherit' }}>
              Whiskers
            </Typography>
            <Typography variant="body2" sx={{ color: 'inherit', opacity: 0.85 }}>
              The fluffiest cat in the neighborhood. Loves naps and salmon.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <FastButton label="Pet" color="primary" width="50%" height={30} animated/>
              <FastButton label="Feed" color="secondary" width="50%" height={30} animated/>
            </Box>
          </FastCardFA>
          <FastCardFA src="/cat5.jpg" width={300} height={420}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'inherit' }}>
              Luna
            </Typography>
            <Typography variant="body2" sx={{ color: 'inherit', opacity: 0.85 }}>
              Mysterious night owl. Expert hunter of toy mice.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <FastButton label="Pet" color="primary" width="100%" height={30} animated />
            </Box>
          </FastCardFA>
          <FastCardFA src="/cat1.jpg" width={300} height={420}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'inherit' }}>
              Loki
            </Typography>
            <Typography variant="body2" sx={{ color: 'inherit', opacity: 0.85 }}>
              Chaos gremlin. Will knock your glass off the table.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <FastButton icon={<WavingHandIcon />} color="primary" variant="outlined" width="100%" height={30} animated />
              <FastButton icon={<EggAltIcon />} color="secondary" variant="outlined" width="100%" height={30} animated />
            </Box>
          </FastCardFA>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Important cat data
        </Typography>
        <Typography sx={{ mb: 2 }}>
          A very relevant study about cats in the neighborhood, with sortable and pageable table.
        </Typography>

        <FastTable
          data={defaultData}
          columns={defaultColumns}
          color="secondary"
          width="75%"
          sortable
          pageable
          renderActions={(row) => (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <FastButton icon={<WavingHandIcon />} color="primary" variant="text" width="50%" height={26} fontSize={10} onClick={() => alert(`Petted ${row.name}!`)} />
              <FastButton icon={<SetMealIcon />} color="secondary" variant="text" width="50%" height={26} fontSize={10} onClick={() => alert(`Fed ${row.name}!`)} />
            </Box>
          )}
        />

        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Knowledge check
        </Typography>

        <FastButton label="Cats cove" onClick={() => setDialogOpen(true)} width="10%" height={40} />
        <FastDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Cats cove"
          actions={
            <>
              <FastButton label="Cancel" width="15%" onClick={() => setDialogOpen(false)} animated/>
              <FastButton label="Confirm" width="15%" onClick={() => setDialogOpen(false)} animated/>
            </>
          }
        >
          <Typography variant="body1">
            You are safe in this custom dialog. You can tell us who is your favourite cat without any ripercussion.
          </Typography>
          <FastTextField
            label="Insert your favourite cat"
            sx={{ mt: 2 }}
          />
        </FastDialog>

        <br />

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <FastCheckbox color="primary" label="Zoomies are good." />
          <FastCheckbox color="secondary" label="Napping is also good." />
        </Box>

        <br />

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <FastCheckbox color="primary" disabled checked label="Uncheck if cats are bad." />
          <FastCheckbox color="secondary" disabled label="Check if cats are bad." />
        </Box>

        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Choose the size and color of your cat
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <FastRadio color="primary" name="size" defaultChecked label="Small" />
          <FastRadio color="primary" name="size" label="Medium" />
          <FastRadio color="primary" name="size" label="Large" />
        </Box>

        <br />

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <FastRadio color="secondary" name="color" defaultChecked label="White" />
          <FastRadio color="secondary" name="color" label="Black" />
          <FastRadio color="secondary" name="color" disabled label="Cyan" />
        </Box>

        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Choose your favorite cat and its favourite food
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <FastRadioBox color="primary" name="cat" defaultChecked icon={<PetsIcon />} label="Whiskers" width={72} height={72} />
          <FastRadioBox color="primary" name="cat" icon={<PetsIcon />} label="Luna" width={72} height={72} />
          <FastRadioBox color="primary" name="cat" icon={<PetsIcon />} label="Milo" width={72} height={72} />
        </Box>

        <br />

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <FastRadioBox color="secondary" name="food" defaultChecked icon={<SetMealIcon />} label="Fish" width={72} height={72} />
          <FastRadioBox color="secondary" name="food" icon={<IcecreamIcon />} label="Icecream" width={72} height={72} />
          <FastRadioBox color="secondary" name="food" disabled icon={<EggAltIcon />} label="Eggs" width={72} height={72} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FastBurger color="primary" defaultChecked />
          <FastBurger color="secondary" />

          <FastLoader color="primary" size={128} />
          <FastLoader color="secondary" size={128} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <FastTextField
            label="This is short"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            width="10%"
          />
          <FastTextField
            label="And this is long. With error."
            error
            helperText="This field is required"
            width="25%"
          />
          <FastTextField
            label="Thin and disabled"
            disabled
            defaultValue="Cannot edit"
            height={32}
          />
          <FastTextField
            label="Secondary color"
            color="secondary"
            defaultValue="Secondary focus"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        
      </Box>
    </FastThemeProvider>
  );
}
