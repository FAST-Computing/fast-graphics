'use client';

import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastDateInputColor = 'primary' | 'secondary';

export interface FastDateInputProps {
  /** Accent color. */
  color?: FastDateInputColor;
  /** Placeholder / floating label text. */
  placeholder?: string;
  /** Controlled value (YYYY-MM-DD). */
  value?: string;
  /** Default value (uncontrolled). */
  defaultValue?: string;
  /** Change handler receives the native event. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disabled state. */
  disabled?: boolean;
  /** Input width. */
  width?: number | string;
  /** Input height. */
  height?: number | string;
  /** Mark as required — shows asterisk and auto-triggers error if empty. */
  required?: boolean;
}

function formatDisplay(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export function FastDateInput({
  color = 'primary',
  placeholder = 'Select date',
  value: controlledValue,
  defaultValue,
  onChange,
  disabled,
  width,
  height = 52,
  required,
}: FastDateInputProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const displayValue = isControlled ? controlledValue : internalValue;
  const hasValue = !!displayValue;
  const showError = !!(required && touched && !hasValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    if (e.target.value) setTouched(false);
    onChange?.(e);
  };

  const handleBlur = () => {
    setFocused(false);
    if (required && !hasValue) setTouched(true);
  };

  const handleClick = () => {
    inputRef.current?.showPicker?.() || inputRef.current?.click();
  };

  return (
    <StyledWrapper $color={color} $w={width} $isPct={typeof width === 'string'} $h={height} $disabled={!!disabled} $float={hasValue || focused} $error={showError}
      onClick={handleClick}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      role="button"
    >
      <div className="date-trigger">
        <span className="date-label">{hasValue ? formatDisplay(displayValue) : ''}</span>
      </div>
      <span className="float-label">
        {placeholder}
        {required && <span className="asterisk"> *</span>}
      </span>
      <CalendarMonthIcon className="date-icon" />
      <input
        ref={inputRef}
        type="date"
        value={displayValue}
        onChange={handleChange}
        disabled={disabled}
        className="native-input"
      />
      {required && touched && !hasValue && (
        <span className="field-helper">*This field is required</span>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled('div')<{
  $color: FastDateInputColor;
  $w?: number | string;
  $isPct: boolean;
  $h: number | string;
  $disabled: boolean;
  $float: boolean;
  $error: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  ${p => p.$w !== undefined ? `width: ${p.$isPct ? p.$w : `${p.$w}px`};` : ''}
  opacity: ${p => (p.$disabled ? 0.35 : 1)};
  height: ${p => (typeof p.$h === 'number' ? `${p.$h}px` : p.$h)};
  border: 2px solid ${p => p.$error ? p.theme.palette.error.main : (p.theme.palette[p.$color] as PaletteColor).main};
  cursor: ${p => (p.$disabled ? 'default' : 'pointer')};
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    background: ${p => (p.theme.palette[p.$color] as PaletteColor).main};
  }

  &:hover:not(:disabled) .date-label {
    color: ${p => (p.theme.palette[p.$color] as PaletteColor).contrastText};
  }

  &:hover:not(:disabled) .float-label {
    color: ${p => (p.theme.palette[p.$color] as PaletteColor).contrastText};
  }

  &:hover:not(:disabled) .date-icon {
    color: ${p => (p.theme.palette[p.$color] as PaletteColor).contrastText};
  }

  &:active:not(:disabled) {
    transform: translateY(2px);
  }

  .native-input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
  }

  .date-trigger {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 14px;
    padding-top: ${p => (p.$float ? '10px' : '0')};
    cursor: pointer;
    outline: none;
    background: transparent;
    border: none;
    font-family: inherit;
  }

  .date-label {
    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 500;
    color: ${p => p.$error ? p.theme.palette.error.main : (p.theme.palette[p.$color] as PaletteColor).main};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s ease;
  }

  .float-label {
    position: absolute;
    left: 14px;
    top: ${p => (p.$float ? '6px' : '50%')};
    transform: ${p => (p.$float ? 'translateY(0)' : 'translateY(-50%)')};
    font-family: inherit;
    font-size: ${p => (p.$float ? '0.7rem' : '0.9375rem')};
    font-weight: ${p => (p.$float ? '600' : '400')};
    color: ${p => p.$error ? p.theme.palette.error.main : (p.theme.palette[p.$color] as PaletteColor).main};
    pointer-events: none;
    transition: all 0.15s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 60px);
  }

  .date-icon {
    flex-shrink: 0;
    margin-right: 10px;
    font-size: 1.5rem;
    color: ${p => p.$error ? p.theme.palette.error.main : (p.theme.palette[p.$color] as PaletteColor).main};
    transition: color 0.2s ease;
  }

  .asterisk {
    color: ${p => p.theme.palette.error.main};
  }

  .field-helper {
    position: absolute;
    bottom: -18px;
    left: 2px;
    font-family: inherit;
    font-size: 0.75rem;
    color: ${p => p.theme.palette.error.main};
  }
`;
