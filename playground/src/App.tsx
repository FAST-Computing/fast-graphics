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
  FastTable,
  FastLoader,
  FastThemeProvider,
  FastTextField,
  FastDateInput,
  FastDialog,
  FastCheckbox,
  FastRadioBox,
  FastRadio,
  FastSlider,
  FastToggle,
  FastDropdown,
  FastSnackbar,
  FastEmptyState,
  FastTextArea,
  FastTooltip,
  FastUpload,
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
  const [selectedBtn, setSelectedBtn] = useState('');
  const [snackMsg, setSnackMsg] = useState('');
  const [snackType, setSnackType] = useState<'success' | 'error' | 'warning' | 'default'>('default');
  const [snackOpen, setSnackOpen] = useState(false);

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
          <FastCard width="25%" height="auto" inverted>
            <Box
              component="img"
              src="/cat6.jpg"
              alt=""
              sx={{ objectFit: 'cover', mb: 2, border: '2px solid', borderColor: 'divider' }}
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
              sx={{ objectFit: 'cover', mb: 2, border: '2px solid', borderColor: 'divider' }}
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
          <FastCard width="25%" height="auto">
            <Box
              component="img"
              src="/cat4.jpg"
              alt=""
              sx={{ objectFit: 'cover', mb: 2, border: '2px solid', borderColor: 'divider' }}
            />
            <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 700 }}>
              Felix
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
              This card accepts custom children, button label, icon and button color, and also images.
              The cat is very sleepy.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
              <FastButton label="Don't wake up the cat" icon={<EggAltIcon />} color="primary" width="100%" height={40} disabled iconPosition="right"/>
            </Box>
          </FastCard>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 3 }}>
          <FastCardFA src="/cat8.jpg" width={300} height={420} inverted>
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
          <FastCardFA src="/cat9.jpg" width={300} height={420}>
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
          Cats love icecream (click to toggle)
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <FastButton label="Paper" icon={<IcecreamIcon />} color="paper" variant="text" selected={selectedBtn === '1'} onClick={() => setSelectedBtn('1')} />
          <FastButton label="Text" icon={<IcecreamIcon />} color="text" variant="text" selected={selectedBtn === '2'} onClick={() => setSelectedBtn('2')} />
          <FastButton label="PMain" icon={<IcecreamIcon />} color="primary" variant="text" selected={selectedBtn === '3'} onClick={() => setSelectedBtn('3')} />
          <FastButton label="PLight" icon={<IcecreamIcon />} color="primaryLight" variant="text" selected={selectedBtn === '4'} onClick={() => setSelectedBtn('4')} />
          <FastButton label="PDark" icon={<IcecreamIcon />} color="primaryDark" variant="text" selected={selectedBtn === '5'} onClick={() => setSelectedBtn('5')} />
          <FastButton label="SMain" icon={<IcecreamIcon  />} color="secondary" variant="text" selected={selectedBtn === '6'} onClick={() => setSelectedBtn('6')} />
          <FastButton label="SLight" icon={<IcecreamIcon />} color="secondaryLight" variant="text" selected={selectedBtn === '7'} onClick={() => setSelectedBtn('7')} />
          <FastButton label="SDark" icon={<IcecreamIcon />} color="secondaryDark" variant="text" selected={selectedBtn === '8'} onClick={() => setSelectedBtn('8')} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Alignment
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxWidth: 300 }}>
          <FastButton label="Cats" icon={<IcecreamIcon />} iconPosition="left" color="primary" align="left" width="100%" animated/>
          <FastButton label="Love" icon={<IcecreamIcon />} iconPosition="left" color="secondary" align="center" width="100%" animated/>
          <FastButton label="Icecream" icon={<IcecreamIcon />} iconPosition="right" color="paper" align="right" width="100%" animated/>
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
          color="primary"
          width="75%"
          sortable
          pageable
          searchable
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
            placeholder="Insert your favourite cat"
          />
        </FastDialog>

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

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Customize your cat's stats
        </Typography>
        <Box sx={{ px: 1, gap: 2, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FastSlider color="primary" width="25%" defaultValue={40} label="Laziness" valueLabelDisplay="auto" />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FastSlider color="secondary" width="25%" defaultValue={70} step={5} label="Cuteness" marks valueLabelDisplay="auto" />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FastSlider color="primary" width="25%" defaultValue={100} label="Happiness" disabled />
          </Box>
        </Box>

        <br />
        
        <Box sx={{ px: 1, gap: 2, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <FastToggle color="primary" defaultChecked label="Soft fur" />
            <FastToggle color="secondary" label="Big eyes" />
            <FastToggle color="primary" disabled checked label="Always nice" />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FastLoader color="primary" size={128} />
          <FastLoader color="secondary" size={128} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          <FastDropdown color="primary" label="Actions" width="15%">
            <button type="button" onClick={() => alert('Edit')}>Edit profile</button>
            <button type="button" onClick={() => alert('Settings')}>Settings</button>
            <button type="button" onClick={() => alert('Logout')}>Logout</button>
          </FastDropdown>
          <FastDropdown color="secondary" label="Cat treats" variant="outlined" defaultOpen>
            <button type="button" onClick={() => alert('Fish')}>Fish</button>
            <button type="button" onClick={() => alert('Chicken')}>Chicken</button>
            <button type="button" onClick={() => alert('Beef')}>Beef</button>
          </FastDropdown>
          <FastDropdown color="primary" label="More treats" variant="text">
            <button type="button" onClick={() => alert('Fish')}>Fish</button>
            <button type="button" onClick={() => alert('Chicken')}>Chicken</button>
            <button type="button" onClick={() => alert('Beef')}>Beef</button>
          </FastDropdown>
        </Box>

        <Divider sx={{ my: 3 }} />
        

        <Typography variant="h6" sx={{  mb: 2, fontWeight: 'bold' }}>
          Cat form
        </Typography>
        <Typography sx={{ mb: 2 }}>
          A form to register your cat. You can use the date input and text field components to fill in the cat's information.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mt: 2 }}>
          <FastDateInput placeholder="Adoption date" width={200} required />
          <FastDateInput placeholder="Vaccination" color="secondary" width={200} />
          <FastDateInput placeholder="Expired" disabled width={200} defaultValue="2025-06-15" />
        </Box>

        <br />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <FastTextField
            placeholder="Name"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            required
            width="10%"
          />
          <FastTextField
            placeholder="Surname"
            width="15%"
            required
          />
          <FastTextField
            placeholder="Address"
            width="20%"
          />
          <FastTextField
            placeholder="Secondary color"
            color="secondary"
            disabled
            defaultValue="Disabled"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mt: 2 }}>
          <FastTextField placeholder="Age" numeric stepper step={1} min={0} max={99} width={120} required />
          <FastTextField placeholder="Height (cm)" numeric stepper step={0.5} precision={1} min={0} width={180} required />
          <FastTextField placeholder="Weight (kg)" numeric step={0.1} precision={1} width={160} />
          <FastTextField placeholder="Cats count" numeric stepper precision={0} width={140} />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mt: 2 }}>
          <FastTextArea placeholder="Cat biography" width={320} rows={4} />
          <FastTextArea placeholder="Notes (required)" required width={320} rows={3} />
          <FastTextArea placeholder="Disabled" disabled width={320} rows={2} defaultValue="Cannot edit" />
        </Box>

        <br />

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <FastCheckbox color="primary" label="Zoomies are good." required />
          <FastCheckbox color="secondary" label="Napping is also good." />
        </Box>

        <br />

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <FastCheckbox color="primary" disabled checked label="Uncheck if cats are bad." />
          <FastCheckbox color="secondary" disabled label="Check if cats are bad." />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Cat snacks
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <FastTooltip title="This is a nice tooltip" color="secondary">
            <FastButton label="Success" icon=<IcecreamIcon/> color="primary" width={140} height={40} animated onClick={() => { setSnackMsg('Profile saved!'); setSnackType('success'); setSnackOpen(true); }} />
          </FastTooltip>
          <FastTooltip title="Also this one is nice" color="paper" placement="top" arrow>
            <FastButton label="Warning" color="primary" width={140} height={40} onClick={() => { setSnackMsg('Warning: cat is hungry.'); setSnackType('warning'); setSnackOpen(true); }} />
          </FastTooltip>
          <FastButton label="Error" color="secondary" width={140} height={40} onClick={() => { setSnackMsg('Something went wrong.'); setSnackType('error'); setSnackOpen(true); }} />
          <FastButton label="With action" color="primary" variant="outlined" width={140} height={40} animated onClick={() => { setSnackMsg('Cat adopted!'); setSnackType('default'); setSnackOpen(true); }} />
        </Box>
        <FastSnackbar
          open={snackOpen}
          message={snackMsg}
          type={snackType}
          autoHideDuration={4000}
          onClose={() => setSnackOpen(false)}
          actionLabel={snackType === 'default' ? 'Undo' : undefined}
          onAction={() => { alert('Undone!'); setSnackOpen(false); }}
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          File upload
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <FastUpload label="Cat photo" accept="image/*" width={200} height={160} required />
          <FastUpload label="Documents" color="secondary" multiple accept=".pdf,.doc,.txt" width={260} height={160} helperText='Document formats are required'/>
          <FastUpload label="Disabled" disabled width={260} height={160} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Empty state
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          <FastEmptyState
            title="No results"
            description="Try adjusting your search or filters."
            action={<FastButton label="Clear filters" color="primary" variant="outlined" width={140} height={38} fontSize={13} animated />}
            imgWidth={160}
            imgHeight={160}
          />
        </Box>

      </Box>
    </FastThemeProvider>
  );
}
