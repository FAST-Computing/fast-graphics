'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import type { PaletteColor } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
import type { TooltipProps } from '@mui/material';

export type FastTooltipColor = 'primary' | 'secondary' | 'paper' | 'text';

export interface FastTooltipProps extends Omit<TooltipProps, 'color'> {
  /** Accent color for the tooltip background. Supports palette colors plus paper/text for dark/light. */
  color?: FastTooltipColor;
}

export function FastTooltip({ color = 'primary', ...rest }: FastTooltipProps) {
  const theme = useTheme();
  const p = theme.palette;

  const colorMap: Record<FastTooltipColor, { bg: string; text: string }> = {
    primary: { bg: (p.primary as PaletteColor).main, text: (p.primary as PaletteColor).contrastText },
    secondary: { bg: (p.secondary as PaletteColor).main, text: (p.secondary as PaletteColor).contrastText },
    paper: { bg: p.background.paper, text: p.text.primary },
    text: { bg: p.text.primary, text: p.background.paper },
  };

  const c = colorMap[color];

  return (
    <Tooltip
      {...rest}
      slotProps={{
        tooltip: {
          sx: {
            background: c.bg,
            color: c.text,
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
            color: c.bg,
          },
        },
      }}
    />
  );
}
