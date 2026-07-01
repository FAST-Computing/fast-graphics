'use client';

import { Box, Typography, Paper } from '@mui/material';
import { FastButton } from './FastButton.js';

import DarkModeIcon from '@mui/icons-material/DarkMode';

/** Drop this inside an MUI ThemeProvider */
export function FastCard() {
  return (
    <Box sx={{ bgcolor: 'background.default', pb: 4 }}>
      <Paper sx={{ p: 3, maxWidth: 360 }}>
        <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5 }}>
          Fast Card
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices velit id leo elementum tempor. 
          Integer fringilla luctus euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        </Typography>

        <FastButton label="Default" icon={<DarkModeIcon />} color="primary" width={300} height={40} />
      </Paper>
    </Box>
  );
}
