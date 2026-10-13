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

const cs = (p: { theme: MuiTheme; $color: FastRadioColor }) => getColorSet(p.$color, p.theme, false);

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
  color,
  size = 28,
  label,
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
    <StyledWrapper $color={resolvedColor} $size={size} $disabled={resolvedDisabled} $error={!!group?.showError}>
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
        <svg viewBox="0 0 32 32" className="radio-svg">
          <rect className="box" x="3" y="3" width="26" height="26" />
          <rect className="dot" x="11" y="11" width="10" height="10" />
        </svg>
        {label && <span className="radio-text">{label}</span>}
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled('div')<{ $color: FastRadioColor; $size: number; $disabled: boolean; $error: boolean }>`
  display: inline-flex;
  opacity: ${p => p.$disabled ? 0.35 : 1};

  .radio-label {
    cursor: ${p => p.$disabled ? 'default' : 'pointer'};
    display: inline-flex;
    align-items: center;
    gap: 6px;
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

  .radio-text {
    font-weight: 500;
    font-size: 0.9rem;
    color: ${p => (p.theme.palette.text.primary)};
  }

  .radio-svg {
    width: ${p => p.$size}px;
    height: ${p => p.$size}px;
    display: block;
    box-shadow: ${p => p.$error
      ? `0 0 0 3px ${p.theme.palette.error.main}33, 5px 5px 10px rgba(0, 0, 0, 0.103)`
      : '5px 5px 10px rgba(0, 0, 0, 0.103)'};
  }

  .box {
    fill: transparent;
    stroke: ${p => p.$error ? p.theme.palette.error.main : cs(p).main};
    stroke-width: 2.5;
    transition: fill 0.2s ease;
  }

  .dot {
    fill: ${p => cs(p).contrastText};
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  input:checked + svg .box {
    fill: ${p => cs(p).main};
  }

  input:checked + svg .dot {
    opacity: 1;
  }

  input:focus-visible + svg {
    box-shadow: 0 0 0 3px ${p => cs(p).main}33, 5px 5px 10px rgba(0, 0, 0, 0.103);
  }

  .radio-label:active .radio-svg {
    transform: translateY(2px);
  }

  .radio-label .radio-svg {
    transition: transform 0.05s ease;
  }
`;
