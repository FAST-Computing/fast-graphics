'use client';

import React, { useState, useRef, useCallback } from 'react';
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
  /** Custom error message shown in red below the field. Implies error styling. */
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
  numeric?: boolean;
  stepper?: boolean;
  step?: number;
  min?: number;
  max?: number;
  precision?: number;
}

function clamp(num: number, min?: number, max?: number): number {
  let v = num;
  if (min !== undefined) v = Math.max(v, min);
  if (max !== undefined) v = Math.min(v, max);
  return v;
}

export function FastTextField({
  color: accent = 'primary',
  placeholder,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled,
  width,
  height = 52,
  error,
  helperText,
  required,
  numeric,
  stepper,
  step = 1,
  min,
  max,
  precision,
  errorMessage,
}: FastTextFieldProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const isControlled = controlledValue !== undefined;
  const displayValue = isControlled ? controlledValue : internalValue;
  const hasValue = displayValue !== '';
  const showError = !!(error || errorMessage || (required && touched && !hasValue));
  const autoMsg = required && touched && !hasValue && !helperText && !errorMessage ? '*This field is required' : '';
  const errorMsg = errorMessage || autoMsg;
  const inputRef = useRef<HTMLInputElement>(null);

  const commitValue = useCallback((raw: string) => {
    if (!isControlled) setInternalValue(raw);
  }, [isControlled]);

  const emitChange = useCallback((raw: string) => {
    if (onChange) {
      const nativeInput = inputRef.current;
      if (nativeInput) {
        Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype, 'value'
        )?.set?.call(nativeInput, raw);
        nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  }, [onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    if (numeric && raw !== '') {
      const cleaned = raw.replace(',', '.');
      if (!/^-?\d*\.?\d*$/.test(cleaned)) return;
      raw = cleaned;
    }
    commitValue(raw);
    if (raw) setTouched(false);
    onChange?.(e);
  };

  const handleBlur = () => {
    setFocused(false);
    if (required && !hasValue) setTouched(true);
    if (numeric && hasValue) {
      const num = parseFloat(displayValue);
      if (!isNaN(num)) {
        const clamped = clamp(num, min, max);
        const formatted = precision !== undefined ? clamped.toFixed(precision) : String(clamped);
        commitValue(formatted);
        emitChange(formatted);
      }
    }
  };

  const stepValue = (dir: 1 | -1) => {
    const current = parseFloat(displayValue) || 0;
    const next = clamp(current + dir * step, min, max);
    const formatted = precision !== undefined ? next.toFixed(precision) : String(next);
    commitValue(formatted);
    emitChange(formatted);
    inputRef.current?.focus();
  };

  return (
    <StyledWrapper $accent={accent} $w={width} $isPct={typeof width === 'string'} $h={height} $disabled={!!disabled} $error={showError} $float={hasValue || focused} $stepper={!!stepper} onClick={() => inputRef.current?.focus()}>
      <input
        ref={inputRef}
        type="text"
        inputMode={numeric ? 'decimal' : 'text'}
        className="field-input"
        value={displayValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        disabled={disabled}
        autoComplete="off"
      />
      <span className="float-label">
        {placeholder}
        {required && <span className="asterisk"> *</span>}
      </span>
      {stepper && (
        <div className="stepper-group">
          <button type="button" className="stepper-btn stepper-up" disabled={disabled} onClick={(e) => { e.stopPropagation(); stepValue(1); }}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M0 5l5-5 5 5z"/></svg>
          </button>
          <button type="button" className="stepper-btn stepper-down" disabled={disabled} onClick={(e) => { e.stopPropagation(); stepValue(-1); }}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M0 1l5 5 5-5z"/></svg>
          </button>
        </div>
      )}
      {helperText && <span className="field-helper">{helperText}</span>}
      {errorMsg && !helperText && (
        <span className="field-helper">{errorMsg}</span>
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
  $stepper: boolean;
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
    padding-right: ${p => (p.$stepper ? '36px' : '14px')};
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
    max-width: calc(100% - ${p => (p.$stepper ? '50px' : '28px')});
  }

  .stepper-group {
    position: absolute;
    right: 2px;
    top: 2px;
    bottom: 2px;
    display: flex;
    flex-direction: column;
    width: 28px;
    pointer-events: auto;
    z-index: 1;
  }

  .stepper-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: ${p => (p.$disabled ? 'default' : 'pointer')};
    color: ${p => (p.theme.palette[p.$accent] as PaletteColor).main};
    padding: 0;
    transition: background-color 0.12s ease, color 0.12s ease;

    &:hover:not(:disabled) {
      background: ${p => (p.theme.palette[p.$accent] as PaletteColor).main};
      color: ${p => (p.theme.palette[p.$accent] as PaletteColor).contrastText};
    }

    &:active:not(:disabled) {
      transform: scale(0.9);
    }

    &:disabled {
      opacity: 0.3;
    }
  }

  .stepper-up {
    border-bottom: 1px solid ${p => (p.theme.palette[p.$accent] as PaletteColor).main}44;
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
