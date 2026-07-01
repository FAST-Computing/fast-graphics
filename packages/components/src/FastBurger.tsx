'use client';

import React from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastBurgerColor = 'primary' | 'secondary';

export interface FastBurgerProps {
  /** Which palette color to use for the stroke. */
  color?: FastBurgerColor;
  /** Checkbox size (em unit). */
  size?: number;
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FastBurger({
  color = 'primary',
  size = 2,
  checked,
  defaultChecked,
  onChange,
}: FastBurgerProps) {
  return (
    <StyledWrapper $color={color} $size={size}>
      <label className="hamburger">
        <input
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
        <svg viewBox="0 0 32 32">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          />
          <path className="line" d="M7 16 27 16" />
        </svg>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled('div')<{ $color: FastBurgerColor; $size: number }>`
  .hamburger {
    cursor: pointer;
  }

  .hamburger input {
    display: none;
  }

  .hamburger svg {
    height: ${p => p.$size}em;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
    stroke: ${p => (p.theme.palette[p.$color] as PaletteColor).contrastText};
  }

  .line {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
                stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  .hamburger input:checked + svg {
    transform: rotate(-45deg);
  }

  .hamburger input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
`;
