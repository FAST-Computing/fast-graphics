'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme } from '@mui/material/styles';
import { FastBurger } from './FastBurger.js';
import type { FastBurgerColor } from './FastBurger.js';
import type { FastButtonColor } from './FastButton.js';
import { getColorSet } from './FastButton.js';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastDropdownColor = FastButtonColor;
export type FastDropdownVariant = 'default' | 'outlined' | 'text';

export interface FastDropdownProps {
  /** Which palette color to use. */
  color?: FastDropdownColor;
  /** Visual variant matching FastButton. */
  variant?: FastDropdownVariant;
  /** Button label text shown before the burger icon. */
  label?: string;
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Menu items */
  children?: React.ReactNode;
  /** Button width */
  width?: number | string;
}

export function FastDropdown({
  color = 'primary',
  variant = 'default',
  label = 'Actions',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
  width,
}: FastDropdownProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !open;
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        if (controlledOpen === undefined) setInternalOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, controlledOpen, onOpenChange]);

  return (
    <StyledWrapper ref={wrapperRef} $color={color} $variant={variant} $w={width} $isPct={typeof width === 'string'}>
      <button type="button" className="dropdown-trigger" onClick={toggle}>
        <span className="trigger-label">{label}</span>
        <span className="trigger-burger">
          <FastBurger color={color as FastBurgerColor} checked={open} onChange={toggle} />
        </span>
      </button>
      {open && (
        <div className="dropdown-menu">
          {children}
        </div>
      )}
    </StyledWrapper>
  );
}

type StyledProps = {
  $color: FastDropdownColor;
  $variant: FastDropdownVariant;
  $w?: number | string;
  $isPct: boolean;
  theme: MuiTheme;
};

const cs = (p: StyledProps) => getColorSet(p.$color, p.theme, false);

const StyledWrapper = styled('div')<{ $color: FastDropdownColor; $variant: FastDropdownVariant; $w?: number | string; $isPct: boolean }>`
  position: relative;
  display: inline-block;
  ${p => p.$w !== undefined ? `width: ${p.$isPct ? p.$w : `${p.$w}px`};` : ''}

  .dropdown-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 0 12px 0 16px;
    height: 44px;
    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    box-shadow: ${p => (p.$variant === 'default' ? '5px 5px 10px rgba(0, 0, 0, 0.103)' : 'none')};
    transition: background-color 0.15s ease;

    ${p => p.$variant === 'default'
      ? `
        color: ${cs(p).contrastText};
        background-color: ${cs(p).main};
        &:hover { background-color: ${cs(p).dark}; }
      `
      : `
        color: ${cs(p).main};
        background-color: transparent;
        &:hover { background-color: ${p.theme.palette.action.hover}; }
      `
    }

    ${p => p.$variant === 'outlined' ? `border: 2px solid ${cs(p).main};` : ''}
  }

  .dropdown-trigger:active {
    transform: translateY(2px);
  }

  .trigger-label {
    flex: 1;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .trigger-burger {
    display: flex;
    align-items: center;
    line-height: 0;
    pointer-events: none;
  }

  .trigger-burger svg {
    stroke: ${p => (p.$variant === 'default' ? cs(p).contrastText : cs(p).main)} !important;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    min-width: 200px;
    background: ${p => p.theme.palette.background.paper};
    border: 1px solid ${p => p.theme.palette.divider};
    border-top: ${p => (p.$variant === 'outlined' ? `1px solid ${p.theme.palette.divider}` : 'none')};
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
    padding: 4px 0;
    z-index: 1000;
  }

  .dropdown-menu > * {
    display: block;
    width: 100%;
    padding: 10px 16px;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${p => p.theme.palette.text.primary};
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .dropdown-menu > *:hover {
    background-color: ${p => p.theme.palette.action.hover};
  }

  .dropdown-menu > *:active {
    background-color: ${p => p.theme.palette.action.selected};
  }
`;
