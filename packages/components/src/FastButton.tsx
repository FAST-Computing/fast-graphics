'use client';

import React from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';

/** Merge MUI palette types into Emotion's theme so styled can access palette. */
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {} // eslint-disable-line @typescript-eslint/no-empty-interface
}

export type FastButtonColor = 'primary' | 'secondary';

export interface FastButtonProps {
  /** Button text */
  label?: string;
  /** MUI icon node, e.g. <Payment /> */
  icon?: React.ReactNode;
  /** Which palette color to use. Text auto-contrasts. */
  color?: FastButtonColor;
  /** Button width (NOTE: PERCENTAGE VALUES CURRENTLY BREAK ANIMATIONS!) */
  width?: number | string;
  /** Button height */
  height?: number | string;
  /** Enable hover/active animations. Default true. */
  animated?: boolean;
}

/** Wallet-style button with mix-blend-mode hover effect.
 *  Text color auto-contrasts against the background, just like MUI Button.
 *
 *  ```tsx
 *  import { Icon } from '@mui/icons-material';
 *  <FastButton color="primary" icon={<Icon />} />
 *  ```
 */
export function FastButton({ 
    label = 'Default', 
    icon, 
    color = 'primary',
    width = 130,
    height = 40,
    animated = false,
}: FastButtonProps) {
  const size = typeof width === 'number' && typeof height === 'number' ? Math.max(width, height) : Math.max(130, 40);
  return (
    <StyledWrapper $color={color} $w={width} $h={height} $size={size} $animated={animated} $isPct={typeof width === 'string'}>
      <button className="Btn">
        <span className="Btn-content">
          {label}
          {icon}
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled('div')<{ $color: FastButtonColor; $w: number | string; $h: number | string; $size: number; $animated: boolean; $isPct: boolean }>`
  .Btn {
    width: ${p => p.$isPct ? p.$w : `${p.$w}px`};
    height: ${p => (typeof p.$h === 'string' ? p.$h : `${p.$h}px`)};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${p => (p.theme.palette[p.$color] as PaletteColor).main};
    border: none;
    cursor: pointer;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
    position: relative;
    overflow: hidden;
  }

  .Btn-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: ${p => (p.theme.palette[p.$color] as PaletteColor).contrastText};
    font-weight: 600;
  }

  ${p => p.$animated && `

  .Btn::before {
    width: ${p.$size}px;
    height: ${p.$size}px;
    position: absolute;
    z-index: 0;
    content: "";
    background-color: ${(p.theme.palette[p.$color] as PaletteColor).contrastText};
    border-radius: 50%;
    left: -100%;
    top: 0;
    transition-duration: .5s;
  }

  `}
  .Btn:hover .Btn-content {
    filter: invert(1);
  }

  .Btn:hover::before {
    transition-duration: .3s;
    transform: translate(100%,-50%);
    border-radius: 0;
  }

  .Btn:active {
    transform: translate(0px,3px);
    transition-duration: .05s;
  }
`;
