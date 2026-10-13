'use client';

import React from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme } from '@mui/material/styles';

import { getColorSet, type FastColor } from './colors.js';
import { useFastRadioGroup } from './FastRadioGroup.js';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastRadioColor = FastColor;

export interface FastRadioProps {
  /** Accent color when checked. */
  color?: FastRadioColor;
  /** Icon node displayed inside the tile (MUI icon). */
  icon?: React.ReactNode;
  /** Label text below the icon. */
  label?: string;
  /** Tile width. Number → px, string → raw CSS. Default 72. */
  width?: number | string;
  /** Tile height. Number → px, string → raw CSS. Default 72. */
  height?: number | string;
  /** Controlled checked state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  /** Change handler. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disabled state — 0.35 opacity. */
  disabled?: boolean;
  /** Radio group name for single-select behavior. */
  name?: string;
  /** Radio value submitted with the form. */
  value?: string;
}

export function FastRadioBox({
  color,
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
}: FastRadioProps) {
  const group = useFastRadioGroup();
  const resolvedColor = color ?? group?.color ?? 'primary';
  const resolvedName = name ?? group?.name;
  const resolvedDisabled = !!disabled || !!group?.disabled;
  const resolvedChecked = checked !== undefined
    ? checked
    : group && value !== undefined
      ? group.selected === value
      : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    if (group && value !== undefined) group.select(value);
  };

  return (
    <StyledWrapper
      $color={resolvedColor}
      $w={width}
      $h={height}
      $disabled={resolvedDisabled}
      $isPct={typeof width === 'string'}
      $error={!!group?.showError}
    >
      <label className="radio-label">
        <input
          type="radio"
          checked={resolvedChecked}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          disabled={resolvedDisabled}
          name={resolvedName}
          value={value}
        />
        <div className="radio-tile">
          {icon && <span className="radio-icon">{icon}</span>}
          {label && <span className="radio-text">{label}</span>}
        </div>
      </label>
    </StyledWrapper>
  );
}

type RadioTheme = { theme: MuiTheme } & { $color: FastRadioColor };

const pc = (p: RadioTheme) => getColorSet(p.$color, p.theme, false);

const StyledWrapper = styled('div')<{
  $color: FastRadioColor;
  $w: number | string;
  $h: number | string;
  $disabled: boolean;
  $isPct: boolean;
  $error: boolean;
}>`
  display: inline-flex;
  opacity: ${p => p.$disabled ? 0.35 : 1};

  .radio-label {
    cursor: ${p => p.$disabled ? 'default' : 'pointer'};
    display: flex;
  }

  .radio-label input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .radio-tile {
    width: ${p => (p.$isPct ? p.$w : `${p.$w}px`)};
    height: ${p => (typeof p.$h === 'number' ? `${p.$h}px` : p.$h)};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 2px solid ${p => p.$error ? p.theme.palette.error.main : pc(p).main};
    background: transparent;
    color: ${p => p.$error ? p.theme.palette.error.main : pc(p).main};
    fill: ${p => p.$error ? p.theme.palette.error.main : pc(p).main};
    box-shadow: ${p => p.$error
      ? `0 0 0 3px ${p.theme.palette.error.main}33, 5px 5px 10px rgba(0, 0, 0, 0.103)`
      : '5px 5px 10px rgba(0, 0, 0, 0.103)'};
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

  input:checked + .radio-tile {
    background: ${p => pc(p).main};
    color: ${p => pc(p).contrastText};
    fill: ${p => pc(p).contrastText};
  }

  input:focus-visible + .radio-tile {
    box-shadow: 0 0 0 3px ${p => pc(p).main}33, 5px 5px 10px rgba(0, 0, 0, 0.103);
  }

  .radio-label:active .radio-tile {
    transform: translateY(2px);
  }

  .radio-tile {
    transition: background 0.2s ease, color 0.2s ease, fill 0.2s ease, transform 0.05s ease;
  }
`;
