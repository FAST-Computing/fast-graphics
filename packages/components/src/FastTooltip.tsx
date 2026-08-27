'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
import type { TooltipProps } from '@mui/material';

import { getColorSet, type FastColor } from './colors.js';

export type FastTooltipColor = FastColor;

export interface FastTooltipProps extends Omit<TooltipProps, 'color'> {
  /** Accent color for the tooltip background. Supports the full palette color set. */
  color?: FastTooltipColor;
}

export function FastTooltip({ color = 'primary', ...rest }: FastTooltipProps) {
  const theme = useTheme();

  const c = getColorSet(color, theme, false);

  return (
    <Tooltip
      {...rest}
      slotProps={{
        tooltip: {
          sx: {
            background: c.main,
            color: c.contrastText,
            borderRadius: 0,
            boxShadow: '5px 5px 10px rgba(0,0,0,0.15)',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.7rem',
            fontWeight: 600,
            padding: '6px 12px',
            lineHeight: 1.4,
          },
        },
        arrow: {
          sx: {
            color: c.main,
          },
        },
      }}
    />
  );
}
