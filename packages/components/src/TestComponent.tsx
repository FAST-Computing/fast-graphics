'use client';

import { Box, Typography, Paper, Stack, Chip } from '@mui/material';
import { FastButton } from './FastButton.js';

import DarkModeIcon from '@mui/icons-material/DarkMode';

/** Drop this inside an MUI ThemeProvider */
export function TestComponent() {
  return (
    <Box sx={{ bgcolor: 'background.default', pb: 4 }}>
      {/* Sample card */}
      <Paper sx={{ p: 3, maxWidth: 360 }}>
        <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5 }}>
          Fast Card
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          A simple card powered by current brand tokens.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label="Token" color="primary" size="small" />
          <Chip label="MUI" color="secondary" size="small" />
        </Stack>
        <FastButton label="Default" icon={<DarkModeIcon />} color="primary" width={300} height={40} />
      </Paper>
    </Box>
  );
}
