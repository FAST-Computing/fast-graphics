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
  const isPct = typeof width === 'string';
  return (
    <Box sx={{
      bgcolor: 'background.default',
      pb: 4,
      width: isPct ? width : undefined,
    }}>
      <Paper sx={{
        p: 2,
        borderRadius: 0,
        width: isPct ? '100%' : undefined,
        maxWidth: isPct ? undefined : width,
        height,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {children}
      </Paper>
    </Box>
  );
}
