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
  color?: FastRadioColor;
  icon?: React.ReactNode;
  label?: string;
  width?: number | string;
  height?: number | string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
  required?: boolean;
}

export function FastRadioBox({
  color = 'primary',
  icon,
  label,
  width = 72,
  height = 72,
  checked,
  defaultChecked,
  onChange,
  disabled,
  name,
  value,
  required,
}: FastRadioProps) {
  return (
    <StyledWrapper $color={color} $w={width} $h={height} $disabled={!!disabled} $isPct={typeof width === 'string'}>
      <label className="radio-label">
        <input
          type="radio"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          value={value}
          required={required}
        />
        <div className="radio-tile">
          {icon && <span className="radio-icon">{icon}</span>}
          {label && <span className="radio-text">{label}{required && <span className="asterisk"> *</span>}</span>}
        </div>
      </label>
    </StyledWrapper>
  );
}

type RadioTheme = { theme: MuiTheme } & { $color: FastRadioColor };

const pc = (p: RadioTheme) => p.theme.palette[p.$color] as PaletteColor;

const StyledWrapper = styled('div')<{
  $color: FastRadioColor;
  $w: number | string;
  $h: number | string;
  $disabled: boolean;
  $isPct: boolean;
}>`
  display: inline-flex;
  opacity: ${p => p.$disabled ? 0.35 : 1};

  .radio-label {
    cursor: ${p => p.$disabled ? 'default' : 'pointer'};
    display: flex;
  }

  .radio-label input {
    display: none;
  }

  .radio-tile {
    width: ${p => (p.$isPct ? p.$w : `${p.$w}px`)};
    height: ${p => (typeof p.$h === 'number' ? `${p.$h}px` : p.$h)};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 2px solid ${p => pc(p).main};
    background: transparent;
    color: ${p => pc(p).main};
    fill: ${p => pc(p).main};
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
    transition: background 0.2s ease, color 0.2s ease, fill 0.2s ease;
  }

  .radio-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
  }

  .radio-text {
    font-weight: 600;
    font-size: 0.8125rem;
    line-height: 1;
  }

  .asterisk {
    color: ${p => p.theme.palette.error.main};
  }

  input:checked + .radio-tile {
    background: ${p => pc(p).main};
    color: ${p => pc(p).contrastText};
    fill: ${p => pc(p).contrastText};
  }

  .radio-label:active .radio-tile {
    transform: translateY(2px);
  }

  .radio-tile {
    transition: background 0.2s ease, color 0.2s ease, fill 0.2s ease, transform 0.05s ease;
  }
`;
