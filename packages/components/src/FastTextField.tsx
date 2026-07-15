'use client';

import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastTextFieldColor = 'primary' | 'secondary';

export interface FastTextFieldProps {
  color?: FastTextFieldColor;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  width?: number | string;
  height?: number | string;
  error?: boolean;
  helperText?: string;
  /** Mark as required — shows asterisk and auto-triggers error on blur if empty. */
  required?: boolean;
}

export function FastTextField({
  color: accent = 'primary',
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled,
  width,
  height = 52,
  error,
  helperText,
  required,
}: FastTextFieldProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const displayValue = isControlled ? value : internalValue;
  const hasValue = !!displayValue;
  const showError = !!(error || (required && touched && !hasValue));
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

  return (
    <StyledWrapper $accent={accent} $w={width} $isPct={typeof width === 'string'} $h={height} $disabled={!!disabled} $error={showError} $float={hasValue || focused} onClick={() => inputRef.current?.focus()}>
      <input
        ref={inputRef}
        type="text"
        className="field-input"
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        disabled={disabled}
      />
      <span className="float-label">
        {placeholder}
        {required && <span className="asterisk"> *</span>}
      </span>
      {helperText && <span className="field-helper">{helperText}</span>}
      {required && touched && !hasValue && !helperText && (
        <span className="field-helper">*This field is required</span>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled('div')<{
  $accent: FastTextFieldColor;
  $w?: number | string;
  $isPct: boolean;
  $h: number | string;
  $disabled: boolean;
  $error: boolean;
  $float: boolean;
}>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  ${p => p.$w !== undefined ? `width: ${p.$isPct ? p.$w : `${p.$w}px`};` : ''}
  opacity: ${p => (p.$disabled ? 0.35 : 1)};
  height: ${p => (typeof p.$h === 'number' ? `${p.$h}px` : p.$h)};
  border: 2px solid ${p => p.$error ? p.theme.palette.error.main : (p.theme.palette[p.$accent] as PaletteColor).main};
  cursor: ${p => (p.$disabled ? 'default' : 'text')};
  transition: background-color 0.2s ease, border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus-within {
    box-shadow: 0 0 0 3px ${p => {
      const c = p.$error ? p.theme.palette.error.main : (p.theme.palette[p.$accent] as PaletteColor).main;
      return `${c}33`;
    }};
  }

  &:hover:not(:disabled) {
    background: ${p => {
      const c = p.$error ? p.theme.palette.error.main : (p.theme.palette[p.$accent] as PaletteColor).main;
      return `${c}0d`;
    }};
  }

  &:hover:not(:disabled) .field-input {
    color: ${p => p.$error ? p.theme.palette.error.main : (p.theme.palette[p.$accent] as PaletteColor).main};
  }

  .field-input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 500;
    color: ${p => p.$error ? p.theme.palette.error.main : (p.theme.palette[p.$accent] as PaletteColor).main};
    padding: 0 14px;
    padding-top: ${p => (p.$float ? '10px' : '0')};

    &:disabled {
      cursor: not-allowed;
    }
  }

  .float-label {
    position: absolute;
    left: 14px;
    top: ${p => (p.$float ? '6px' : '50%')};
    transform: ${p => (p.$float ? 'translateY(0)' : 'translateY(-50%)')};
    font-family: inherit;
    font-size: ${p => (p.$float ? '0.7rem' : '0.9375rem')};
    font-weight: ${p => (p.$float ? '600' : '400')};
    color: ${p => p.$error ? p.theme.palette.error.main : (p.theme.palette[p.$accent] as PaletteColor).main};
    pointer-events: none;
    transition: all 0.15s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 28px);
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
    color: ${p => p.$error ? p.theme.palette.error.main : p.theme.palette.text.secondary};
  }
`;
