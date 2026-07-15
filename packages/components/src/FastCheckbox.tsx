'use client';

import React from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastCheckboxColor = 'primary' | 'secondary';

export interface FastCheckboxProps {
  /** Which palette color to use when checked. */
  color?: FastCheckboxColor;
  /** Checkbox size in px. Default 28. */
  size?: number;
  /** Label text shown next to the checkbox. */
  label?: string;
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disabled state */
  disabled?: boolean;
}

export function FastCheckbox({
  color = 'primary',
  size = 28,
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
}: FastCheckboxProps) {
  return (
    <StyledWrapper $color={color} $size={size} $disabled={!!disabled}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
        />
        <svg viewBox="0 0 32 32" className="checkbox-svg">
          <rect className="box" x="3" y="3" width="26" height="26" />
          <path className="check" d="M10 17l5 5 8-8" />
        </svg>
        {label && <span className="checkbox-text">{label}</span>}
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled('div')<{ $color: FastCheckboxColor; $size: number; $disabled: boolean }>`
  display: inline-flex;
  opacity: ${p => p.$disabled ? 0.35 : 1};

  .checkbox-label {
    cursor: ${p => p.$disabled ? 'default' : 'pointer'};
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .checkbox-label input {
    display: none;
  }

  .checkbox-text {
    font-weight: 500;
    font-size: 0.9rem;
    color: ${p => (p.theme.palette.text.primary)};
  }

  .checkbox-svg {
    width: ${p => p.$size}px;
    height: ${p => p.$size}px;
    display: block;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
  }

  .box {
    fill: transparent;
    stroke: ${p => (p.theme.palette[p.$color] as PaletteColor).main};
    stroke-width: 2.5;
    transition: fill 0.2s ease;
  }

  .check {
    fill: none;
    stroke: ${p => (p.theme.palette[p.$color] as PaletteColor).contrastText};
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 20;
    stroke-dashoffset: 20;
    transition: stroke-dashoffset 0.25s ease;
  }

  input:checked + svg .box {
    fill: ${p => (p.theme.palette[p.$color] as PaletteColor).main};
  }

  input:checked + svg .check {
    stroke-dashoffset: 0;
  }

  .checkbox-label:active .checkbox-svg {
    transform: translateY(2px);
  }

  .checkbox-label .checkbox-svg {
    transition: transform 0.05s ease;
  }
`;
