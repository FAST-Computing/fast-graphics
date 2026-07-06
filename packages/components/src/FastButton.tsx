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
export type FastButtonVariant = 'default' | 'outlined' | 'text';

export interface FastButtonProps {
  /** Button text */
  label?: string;
  /** MUI icon node, e.g. <Payment /> */
  icon?: React.ReactNode;
  /** Which palette color to use. */
  color?: FastButtonColor;
  /** Visual variant */
  variant?: FastButtonVariant;
  /** Button width */
  width?: number | string;
  /** Button height */
  height?: number | string;
  /** Text font size. Number = px, string = raw CSS. */
  fontSize?: number | string;
  /** Enable hover/active animations. Default true. */
  animated?: boolean;
  /** Disable button */
  disabled?: boolean;
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
    label = '', 
    icon, 
    color = 'primary',
    variant = 'default',
    width = 130,
    height = 40,
    fontSize,
    animated = false,
    disabled = false,
    onClick,
}: FastButtonProps) {
  const isPct = typeof width === 'string';
  const heightNum = typeof height === 'number' ? height : parseInt(height) || 40;
  return (
    <StyledWrapper $color={color} $variant={variant} $w={width} $h={height} $animated={animated} $isPct={isPct} $hNum={heightNum} $fs={fontSize}>
      <button className="Btn" onClick={onClick} disabled={disabled}>
        <span className="Btn-content">
          {label}
          {icon}
        </span>
      </button>
    </StyledWrapper>
  );
}

type StyledProps = {
  $color: FastButtonColor;
  $variant: FastButtonVariant;
  $w: number | string;
  $h: number | string;
  $animated: boolean;
  $isPct: boolean;
  $hNum: number;
  $fs?: number | string;
};

const pc = (p: StyledProps & { theme: MuiTheme }) =>
  p.theme.palette[p.$color] as PaletteColor;

const StyledWrapper = styled('div')<StyledProps>`
  ${p => p.$isPct
    ? `width: ${p.$w}; display: block;`
    : `width: ${p.$w}px; display: inline-flex;`
  }

  .Btn {
    width: 100%;
    height: ${p => (typeof p.$h === 'string' ? p.$h : `${p.$h}px`)};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${p => (p.$variant === 'default' ? pc(p).main : 'transparent')};
    border: ${p => (p.$variant === 'outlined' ? `2px solid ${pc(p).main}` : 'none')};
    cursor: pointer;
    box-shadow: ${p => (p.$variant === 'default' ? '5px 5px 10px rgba(0, 0, 0, 0.103)' : 'none')};
    position: relative;
    overflow: hidden;
    font-family: inherit;
    line-height: inherit;
  }

  .Btn-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: ${p => (p.$variant === 'default' ? pc(p).contrastText : pc(p).main)};
    font-weight: 600;
    font-size: ${p => (p.$fs !== undefined ? (typeof p.$fs === 'number' ? `${p.$fs}px` : p.$fs) : 'inherit')};
    transition: color 0.25s ease;
  }

  ${p => p.$animated && `

  .Btn::before {
    position: absolute;
    inset: 0;
    z-index: 0;
    content: "";
    background-color: ${p.$variant === 'default' ? pc(p).contrastText : pc(p).main};
    clip-path: circle(0% at 0% 100%);
    transition: clip-path 0.45s ease;
  }

  `}
  
  ${p => `
  .Btn:hover .Btn-content {
    ${p.$variant === 'default' ? 'filter: invert(1);' : `color: ${pc(p).contrastText};`}
  }

  .Btn:hover::before {
    clip-path: circle(150% at 0% 100%);
    transition-duration: 0.5s;
  }
  `}

  .Btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  .Btn:active {
    transform: translate(0px,3px);
    transition-duration: .05s;
  }
`;
