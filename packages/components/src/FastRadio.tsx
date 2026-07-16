'use client';

import React from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastRadioColor = 'primary' | 'secondary';

export interface FastRadioProps {
  /** Accent color when checked. */
  color?: FastRadioColor;
  /** Box size in px. Default 28. */
  size?: number;
  /** Label text shown next to the radio. */
  label?: string;
  /** Controlled checked state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  /** Change handler. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disabled state — 0.35 opacity. */
  disabled?: boolean;
  /** Radio group name. Radios with the same name form a single-select group. */
  name?: string;
  /** Radio value submitted with the form. */
  value?: string;
}

export function FastRadio({
  color = 'primary',
  size = 28,
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  name,
  value,
}: FastRadioProps) {
  return (
    <StyledWrapper $color={color} $size={size} $disabled={!!disabled}>
      <label className="radio-label">
        <input
          type="radio"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          value={value}
        />
        <svg viewBox="0 0 32 32" className="radio-svg">
          <rect className="box" x="3" y="3" width="26" height="26" />
          <rect className="dot" x="11" y="11" width="10" height="10" />
        </svg>
        {label && <span className="radio-text">{label}</span>}
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled('div')<{ $color: FastRadioColor; $size: number; $disabled: boolean }>`
  display: inline-flex;
  opacity: ${p => p.$disabled ? 0.35 : 1};

  .radio-label {
    cursor: ${p => p.$disabled ? 'default' : 'pointer'};
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .radio-label input {
    display: none;
  }

  .radio-text {
    font-weight: 500;
    font-size: 0.9rem;
    color: ${p => (p.theme.palette.text.primary)};
  }

  .radio-svg {
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

  .dot {
    fill: ${p => (p.theme.palette[p.$color] as PaletteColor).contrastText};
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  input:checked + svg .box {
    fill: ${p => (p.theme.palette[p.$color] as PaletteColor).main};
  }

  input:checked + svg .dot {
    opacity: 1;
  }

  .radio-label:active .radio-svg {
    transform: translateY(2px);
  }

  .radio-label .radio-svg {
    transition: transform 0.05s ease;
  }
`;
