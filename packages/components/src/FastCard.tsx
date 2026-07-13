'use client';

import type { ReactNode } from 'react';
import { Box, Paper } from '@mui/material';

interface FastCardProps {
  /** Content rendered at the bottom over the image (title, text, buttons). */
  children?: ReactNode;
  /** Card width. */
  width?: number | string;
  /** Card height. */
  height?: number | string;
  /** Invert fade/background/text colors for dark mode. */
  inverted?: boolean;
}

export function FastCard({
  children,
  width = 360,
  height,
  inverted = false,
}: FastCardProps) {
  const isPct = typeof width === 'string';
  return (
    <Box sx={{
      bgcolor: inverted ? 'background.default' : 'background.default',
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
        bgcolor: inverted ? 'text.primary' : 'background.paper',
        color: inverted ? 'background.paper' : 'text.primary',
      }}>
        {children}
      </Paper>
    </Box>
  );
}
