'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastLoaderColor = 'primary' | 'secondary';

export interface FastLoaderProps {
  /** Which palette color to use for chevrons. */
  color?: FastLoaderColor;
  /** Chevron size in px. Default 48. */
  size?: number;
}

const drawPulse = keyframes`
  0%   { stroke-dashoffset: 30; opacity: 0; }
  30%  { stroke-dashoffset: 0;  opacity: 1; }
  65%  { stroke-dashoffset: 0;  opacity: 1; }
  90%  { stroke-dashoffset: 0;  opacity: 0; }
  100% { stroke-dashoffset: 30; opacity: 0; }
`;

export function FastLoader({
  color = 'primary',
  size = 48,
}: FastLoaderProps) {
  return (
    <StyledWrapper $color={color} $size={size}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="loader-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="chevron chevron-first"
          d="M14 16 22 24 14 32"
          strokeWidth="4"
        />
        <path
          className="chevron chevron-second"
          d="M22 16 30 24 22 32"
          strokeWidth="4"
        />
      </svg>
    </StyledWrapper>
  );
}

const StyledWrapper = styled('div')<{ $color: FastLoaderColor; $size: number }>`
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader-svg {
    width: 100%;
    height: 100%;
  }

  .chevron {
    stroke: ${p => (p.theme.palette[p.$color] as PaletteColor).main};
    fill: none;
    stroke-dasharray: 30;
  }

  .chevron-first {
    animation: ${drawPulse} 1s ease-in-out infinite;
  }

  .chevron-second {
    animation: ${drawPulse} 1s ease-in-out 0.12s infinite;
  }
`;
