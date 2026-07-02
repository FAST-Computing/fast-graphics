'use client';

import type { ReactNode } from 'react';
import { Box, Paper } from '@mui/material';

interface FastCardProps {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
}

export function FastCard({
  children,
  width = 360,
  height,
}: FastCardProps) {
  return (
    <Box sx={{ bgcolor: 'background.default', pb: 4 }}>
      <Paper sx={{ p: 3, maxWidth: width, height, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Paper>
    </Box>
  );
}
