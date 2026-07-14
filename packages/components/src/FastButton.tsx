'use client';

import React from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme } from '@mui/material/styles';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastButtonColor =
  | 'primary' | 'secondary'
  | 'primaryMain' | 'primaryLight' | 'primaryDark'
  | 'secondaryMain' | 'secondaryLight' | 'secondaryDark'
  | 'paper' | 'text';

export type FastButtonVariant = 'default' | 'outlined' | 'text';
export type FastButtonIconPosition = 'left' | 'right';
export type FastButtonAlign = 'center' | 'left' | 'right';

export interface FastButtonProps {
  label?: string;
  icon?: React.ReactNode;
  color?: FastButtonColor;
  variant?: FastButtonVariant;
  iconPosition?: FastButtonIconPosition;
  align?: FastButtonAlign;
  selected?: boolean;
  width?: number | string;
  height?: number | string;
  fontSize?: number | string;
  animated?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type ColorSet = { main: string; dark: string; light: string; contrastText: string };

export function getColorSet(color: FastButtonColor, theme: MuiTheme, _selected: boolean): ColorSet {
  const p = theme.palette;
  const pc = (c: 'primary' | 'secondary') => {
    const entry = p[c];
    return { main: entry.main, dark: entry.dark, light: entry.light, contrastText: entry.contrastText };
  };

  let base: ColorSet;
  switch (color) {
    case 'primary':
    case 'primaryMain':
      base = pc('primary'); break;
    case 'primaryLight':
      base = { ...pc('primary'), main: p.primary.light, contrastText: p.getContrastText(p.primary.light) }; break;
    case 'primaryDark':
      base = { ...pc('primary'), main: p.primary.dark }; break;
    case 'secondary':
    case 'secondaryMain':
      base = pc('secondary'); break;
    case 'secondaryLight':
      base = { ...pc('secondary'), main: p.secondary.light, contrastText: p.getContrastText(p.secondary.light) }; break;
    case 'secondaryDark':
      base = { ...pc('secondary'), main: p.secondary.dark }; break;
    case 'paper':
      base = { main: p.background.paper, dark: p.text.primary, light: p.background.paper, contrastText: p.text.primary }; break;
    case 'text':
      base = { main: p.text.primary, dark: p.text.primary, light: p.background.paper, contrastText: p.background.paper }; break;
  }

  return base;
}

export function FastButton({
    label = '',
    icon,
    color = 'primary',
    variant = 'default',
    iconPosition = 'left',
    align = 'center',
    selected = false,
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
    <StyledWrapper $color={color} $variant={variant} $w={width} $h={height} $animated={animated} $isPct={isPct} $hNum={heightNum} $fs={fontSize} $selected={selected} $iconPos={iconPosition} $align={align}>
      <button className="Btn" onClick={onClick} disabled={disabled}>
        <span className="Btn-content">
          {iconPosition === 'left' && icon}
          {label}
          {iconPosition === 'right' && icon}
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
  $selected: boolean;
  $iconPos: FastButtonIconPosition;
  $align: FastButtonAlign;
};

const cs = (p: StyledProps & { theme: MuiTheme }) => getColorSet(p.$color, p.theme, p.$selected);

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
    background-color: ${p => (p.$selected || p.$variant === 'default' ? cs(p).main : 'transparent')};
    border: ${p => (p.$variant === 'outlined' ? `2px solid ${cs(p).main}` : 'none')};
    cursor: pointer;
    box-shadow: ${p => (p.$selected || p.$variant === 'default' ? '5px 5px 10px rgba(0, 0, 0, 0.103)' : 'none')};
    position: relative;
    overflow: hidden;
    font-family: inherit;
    line-height: inherit;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
  }

  .Btn-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: ${p => p.$align === 'left' ? 'flex-start' : p.$align === 'right' ? 'flex-end' : 'center'};
    gap: 8px;
    padding: 0 12px;
    flex: 1;
    flex-direction: ${p => (p.$iconPos === 'right' ? 'row' : 'row')};
    color: ${p => (p.$selected || p.$variant === 'default' ? cs(p).contrastText : cs(p).main)};
    font-weight: 600;
    font-size: ${p => (p.$fs !== undefined ? (typeof p.$fs === 'number' ? `${p.$fs}px` : p.$fs) : 'inherit')};
    transition: color 0.2s ease;
  }

  ${p => p.$animated && `

  .Btn::before {
    position: absolute;
    inset: 0;
    z-index: 0;
    content: "";
    background-color: ${p.$variant === 'default' ? cs(p).contrastText : cs(p).main};
    clip-path: circle(0% at 0% 100%);
    transition: clip-path 0.45s ease;
  }

  `}

  ${p => `
  .Btn:hover .Btn-content {
    ${p.$variant === 'default' ? 'filter: invert(1);' : `color: ${cs(p).contrastText};`}
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
