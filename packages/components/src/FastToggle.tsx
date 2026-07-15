'use client';

import React from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastToggleColor = 'primary' | 'secondary';

export interface FastToggleProps {
  /** Which palette color to use when checked. */
  color?: FastToggleColor;
  /** Label text shown next to the toggle. */
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

export function FastToggle({
  color = 'primary',
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
}: FastToggleProps) {
  return (
    <StyledWrapper $color={color} $disabled={!!disabled}>
      <label className="toggle-label">
        <input
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
        />
        <div className="toggle-track">
          <div className="toggle-thumb" />
        </div>
        {label && <span className="toggle-text">{label}</span>}
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled('div')<{ $color: FastToggleColor; $disabled: boolean }>`
  display: inline-flex;
  opacity: ${p => (p.$disabled ? 0.35 : 1)};

  .toggle-label {
    cursor: ${p => (p.$disabled ? 'default' : 'pointer')};
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .toggle-label input {
    display: none;
  }

  .toggle-text {
    font-weight: 500;
    font-size: 0.9rem;
    color: ${p => p.theme.palette.text.primary};
  }

  .toggle-track {
    width: 44px;
    height: 24px;
    background: ${p => p.theme.palette.divider};
    position: relative;
    transition: background 0.3s ease;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .toggle-thumb {
    width: 20px;
    height: 20px;
    background: ${p => p.theme.palette.background.paper};
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.12);
    position: absolute;
    top: 2px;
    left: 2px;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  input:checked ~ .toggle-track {
    background: ${p => (p.theme.palette[p.$color] as PaletteColor).main};
  }

  input:checked ~ .toggle-track .toggle-thumb {
    transform: translateX(20px);
  }

  .toggle-label:active .toggle-thumb {
    transform: scale(0.85);
  }

  input:checked ~ .toggle-track .toggle-thumb {
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.15);
  }
`;
