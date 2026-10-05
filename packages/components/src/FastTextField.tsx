'use client';

import React, { useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme } from '@mui/material/styles';

import { getColorSet, type FastColor } from './colors.js';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastTextFieldColor = FastColor;
export type FastTextFieldSize = 'small' | 'medium';

const cs = (p: { theme: MuiTheme; $accent: FastTextFieldColor }) => getColorSet(p.$accent, p.theme, false);

export interface FastTextFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'color' | 'size' | 'onChange' | 'value' | 'defaultValue' | 'placeholder'
  > {
  /** Accent color for border, label, and focus ring. */
  color?: FastTextFieldColor;
  /**
   * Floating label (new API). For backwards compatibility, when none of the new
   * props (`value`, `defaultValue`, `name`, `type`, `fullWidth`, `size`,
   * `startAdornment`, `endAdornment`, `readOnly`) are used, `label` is treated
   * as the controlled value (legacy API) and `placeholder` as the floating label.
   */
  label?: React.ReactNode;
  /** Native placeholder, shown while focused and empty. Legacy API: floating label. */
  placeholder?: string;
  /** Controlled value (new API). */
  value?: string | number;
  /** Uncontrolled initial value (new API). */
  defaultValue?: string | number;
  /** Change handler. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Focus handler. */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /** Blur handler. */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Disabled state — 0.35 opacity, no interactions. */
  disabled?: boolean;
  /** Field width. Number → px, string → raw CSS. */
  width?: number | string;
  /** Field height. Default 52 (40 when size="small"). */
  height?: number | string;
  /** Stretch to the container width (width: 100%). */
  fullWidth?: boolean;
  /** Field size. Defaults to "medium". */
  size?: FastTextFieldSize;
  /** Node rendered at the start (left) of the field. */
  startAdornment?: React.ReactNode;
  /** Node rendered at the end (right) of the field. */
  endAdornment?: React.ReactNode;
  /** Red error styling (border, text). */
  error?: boolean;
  /** Custom error message shown in red below the field. Implies error styling. */
  errorMessage?: string;
  /** Helper text shown below the field (gray, or red when error is true). */
  helperText?: string;
  /** Shows asterisk, auto-validates on blur if empty. */
  required?: boolean;
  /** Restrict input to numeric values (int or float). */
  numeric?: boolean;
  /** Show up/down stepper buttons on the right. Implies numeric. */
  stepper?: boolean;
  /** Stepper increment / decrement step. Default 1. */
  step?: number;
  /** Minimum value (for numeric). */
  min?: number;
  /** Maximum value (for numeric). */
  max?: number;
  /** Decimal places for numeric (0 = integer). */
  precision?: number;
}

function clamp(num: number, min?: number, max?: number): number {
  let v = num;
  if (min !== undefined) v = Math.max(v, min);
  if (max !== undefined) v = Math.min(v, max);
  return v;
}

export const FastTextField = React.forwardRef<HTMLInputElement, FastTextFieldProps>(
  function FastTextField(props, ref) {
    const {
      color: accent = 'primary',
      label,
      placeholder,
      value,
      defaultValue,
      onChange,
      disabled,
      width,
      height,
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
      fullWidth,
      size = 'medium',
      startAdornment,
      endAdornment,
      type,
      onFocus,
      onBlur,
      ...rest
    } = props;

    // Backwards-compatible detection: the legacy API only used `label` (value) and
    // `placeholder` (floating label). Any new-API prop switches to the new semantics.
    const isNewApi =
      value !== undefined ||
      defaultValue !== undefined ||
      type !== undefined ||
      fullWidth !== undefined ||
      size !== 'medium' ||
      startAdornment !== undefined ||
      endAdornment !== undefined ||
      rest.name !== undefined ||
      rest.readOnly !== undefined;

    const externalValue = isNewApi
      ? value
      : (label as string | number | undefined);
    const floatingLabel: React.ReactNode = isNewApi ? label : placeholder;
    const placeholderText = isNewApi ? placeholder : undefined;

    const isControlled = externalValue !== undefined;
    const [internalValue, setInternalValue] = useState(
      isNewApi && defaultValue !== undefined ? String(defaultValue) : '',
    );
    const [focused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);

    const displayValue = isControlled ? String(externalValue ?? '') : internalValue;
    const hasValue = displayValue !== '';
    const showError = !!(error || errorMessage || (required && touched && !hasValue));
    const autoMsg = required && touched && !hasValue && !helperText && !errorMessage ? '*This field is required' : '';
    const errorMsg = errorMessage || autoMsg;

    const inputRef = useRef<HTMLInputElement>(null);
    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref],
    );

    const commitValue = useCallback((raw: string) => {
      if (!isControlled) setInternalValue(raw);
    }, [isControlled]);

    const emitChange = useCallback((raw: string) => {
      if (!onChange) return;
      const nativeInput = inputRef.current;
      if (!nativeInput) return;
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(nativeInput, raw);
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
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

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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
      onBlur?.(e);
    };

    const stepValue = (dir: 1 | -1) => {
      const current = parseFloat(displayValue) || 0;
      const next = clamp(current + dir * step, min, max);
      const formatted = precision !== undefined ? next.toFixed(precision) : String(next);
      commitValue(formatted);
      emitChange(formatted);
      inputRef.current?.focus();
    };

    const resolvedWidth = fullWidth ? '100%' : width;
    const resolvedHeight = height ?? (size === 'small' ? 40 : 52);

    return (
      <StyledWrapper
        $accent={accent}
        $w={resolvedWidth}
        $isPct={typeof resolvedWidth === 'string'}
        $h={resolvedHeight}
        $disabled={!!disabled}
        $error={showError}
        $float={hasValue || focused}
        $stepper={!!stepper}
        $hasStart={!!startAdornment}
        $hasEnd={!!endAdornment}
        $small={size === 'small'}
        onClick={() => inputRef.current?.focus()}
      >
        {startAdornment && <span className="field-adornment start">{startAdornment}</span>}
        <input
          {...rest}
          ref={setRefs}
          type={type ?? 'text'}
          inputMode={numeric ? 'decimal' : rest.inputMode}
          className="field-input"
          value={displayValue}
          placeholder={focused && !hasValue ? placeholderText : undefined}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          autoComplete={rest.autoComplete ?? 'off'}
          aria-label={typeof floatingLabel === 'string' ? floatingLabel : undefined}
        />
        <span className="float-label">
          {floatingLabel}
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
        {endAdornment && <span className="field-adornment end">{endAdornment}</span>}
        {helperText && <span className="field-helper">{helperText}</span>}
        {errorMsg && !helperText && (
          <span className="field-helper">{errorMsg}</span>
        )}
      </StyledWrapper>
    );
  },
);

const StyledWrapper = styled('div')<{
  $accent: FastTextFieldColor;
  $w?: number | string;
  $isPct: boolean;
  $h: number | string;
  $disabled: boolean;
  $error: boolean;
  $float: boolean;
  $stepper: boolean;
  $hasStart: boolean;
  $hasEnd: boolean;
  $small: boolean;
}>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  ${p => p.$w !== undefined ? `width: ${p.$isPct ? p.$w : `${p.$w}px`};` : ''}
  opacity: ${p => (p.$disabled ? 0.35 : 1)};
  height: ${p => (typeof p.$h === 'number' ? `${p.$h}px` : p.$h)};
  border: 2px solid ${p => p.$error ? p.theme.palette.error.main : cs(p).main};
  cursor: ${p => (p.$disabled ? 'default' : 'text')};
  transition: background-color 0.2s ease, border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus-within {
    box-shadow: 0 0 0 3px ${p => {
      const c = p.$error ? p.theme.palette.error.main : cs(p).main;
      return `${c}33`;
    }};
  }

  &:hover:not(:disabled) {
    background: ${p => {
      const c = p.$error ? p.theme.palette.error.main : cs(p).main;
      return `${c}0d`;
    }};
  }

  &:hover:not(:disabled) .field-input {
    color: ${p => p.$error ? p.theme.palette.error.main : p.theme.palette.text.primary};
  }

  .field-input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: ${p => (p.$small ? '0.875rem' : '0.9375rem')};
    font-weight: 500;
    color: ${p => p.$error ? p.theme.palette.error.main : p.theme.palette.text.primary};
    padding: 0 14px;
    padding-left: ${p => (p.$hasStart ? '40px' : '14px')};
    padding-right: ${p => (p.$stepper ? '36px' : p.$hasEnd ? '40px' : '14px')};
    padding-top: ${p => (p.$float ? '10px' : '0')};
    box-sizing: border-box;

    &:disabled {
      cursor: not-allowed;
    }

    &::placeholder {
      color: ${p => p.theme.palette.text.secondary};
      opacity: 0.7;
    }
  }

  .field-adornment {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${p => cs(p).main};
    pointer-events: auto;

    &.start { left: 10px; }
    &.end { right: 10px; }
  }

  .float-label {
    position: absolute;
    left: ${p => (p.$hasStart ? '40px' : '14px')};
    top: ${p => (p.$float ? '6px' : '50%')};
    transform: ${p => (p.$float ? 'translateY(0)' : 'translateY(-50%)')};
    font-family: inherit;
    font-size: ${p => (p.$float ? '0.7rem' : '0.9375rem')};
    font-weight: ${p => (p.$float ? '600' : '400')};
    color: ${p => p.$error ? p.theme.palette.error.main : cs(p).main};
    pointer-events: none;
    transition: all 0.15s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - ${p => (p.$stepper ? '50px' : p.$hasEnd ? '54px' : '28px')});
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
    color: ${p => cs(p).main};
    padding: 0;
    transition: background-color 0.12s ease, color 0.12s ease;

    &:hover:not(:disabled) {
      background: ${p => cs(p).main};
      color: ${p => cs(p).contrastText};
    }

    &:active:not(:disabled) {
      transform: scale(0.9);
    }

    &:disabled {
      opacity: 0.3;
    }
  }

  .stepper-up {
    border-bottom: 1px solid ${p => cs(p).main}44;
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
