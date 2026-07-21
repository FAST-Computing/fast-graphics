'use client';

import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastTextAreaColor = 'primary' | 'secondary';
export type FastTextAreaResize = 'none' | 'vertical';

export interface FastTextAreaProps {
  /** Accent color for border, label, and focus ring. */
  color?: FastTextAreaColor;
  /** Floating label text. */
  placeholder?: string;
  /** Controlled value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Change handler. */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Disabled state — 0.35 opacity, no interactions. */
  disabled?: boolean;
  /** Field width. Number → px, string → raw CSS. */
  width?: number | string;
  /** Number of visible text rows. Default 4. */
  rows?: number;
  /** Resize behavior. Default "vertical". */
  resize?: FastTextAreaResize;
  /** Minimum height in px. Overrides row-based height. */
  minHeight?: number;
  /** Red error styling (border, text helper). */
  error?: boolean;
  /** Custom error message shown in red below the field. Implies error styling. */
  errorMessage?: string;
  /** Helper text shown below the field (gray, or red when error is true). */
  helperText?: string;
  /** Shows asterisk, auto-validates on blur if empty. */
  required?: boolean;
}

export function FastTextArea({
  color: accent = 'primary',
  placeholder,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled,
  width,
  rows = 4,
  resize = 'none',
  minHeight,
  error,
  helperText,
  required,
  errorMessage,
}: FastTextAreaProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const isControlled = controlledValue !== undefined;
  const displayValue = isControlled ? controlledValue : internalValue;
  const hasValue = displayValue !== '';
  const showError = !!(error || errorMessage || (required && touched && !hasValue));
  const autoMsg = required && touched && !hasValue && !helperText && !errorMessage ? '*This field is required' : '';
  const errorMsg = errorMessage || autoMsg;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const heightPx = minHeight || rows * 24 + 20;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    if (e.target.value) setTouched(false);
    onChange?.(e);
  };

  const handleBlur = () => {
    setFocused(false);
    if (required && !hasValue) setTouched(true);
  };

  return (
    <StyledWrapper $accent={accent} $w={width} $isPct={typeof width === 'string'} $disabled={!!disabled} $error={showError} $float={hasValue || focused} $h={heightPx} $resize={resize} onClick={() => inputRef.current?.focus()}>
      <textarea
        ref={inputRef}
        className="field-input"
        rows={rows}
        value={displayValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        disabled={disabled}
        aria-label={placeholder || ''}
      />
      <span className="float-label">
        {placeholder}
        {required && <span className="asterisk"> *</span>}
      </span>
      {helperText && <span className="field-helper">{helperText}</span>}
      {errorMsg && !helperText && (
        <span className="field-helper">{errorMsg}</span>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled('div')<{
  $accent: FastTextAreaColor;
  $w?: number | string;
  $isPct: boolean;
  $disabled: boolean;
  $error: boolean;
  $float: boolean;
  $h: number;
  $resize: FastTextAreaResize;
}>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  ${p => p.$w !== undefined ? `width: ${p.$isPct ? p.$w : `${p.$w}px`};` : ''}
  opacity: ${p => (p.$disabled ? 0.35 : 1)};
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
    color: ${p => p.$error ? p.theme.palette.error.main : p.theme.palette.text.primary};
  }

  .field-input {
    width: 100%;
    min-height: ${p => `${p.$h}px`};
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 500;
    color: ${p => p.$error ? p.theme.palette.error.main : p.theme.palette.text.primary};
    padding: 0 14px;
    padding-top: ${p => (p.$float ? '18px' : '8px')};
    padding-bottom: 8px;
    resize: ${p => p.$resize};
    line-height: 1.5;
    box-sizing: border-box;

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
