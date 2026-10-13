'use client';

import React, { createContext, useCallback, useContext, useId, useRef, useState } from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme } from '@mui/material/styles';

import type { FastColor } from './colors.js';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastRadioGroupColor = FastColor;

/** State shared with the radios rendered inside a {@link FastRadioGroup}. */
export interface FastRadioGroupContextValue {
  /** Shared radio name. */
  name?: string;
  /** Currently selected value. */
  selected?: string;
  /** Report a selection made by a child radio. */
  select: (value: string) => void;
  /** True when the group is invalid and children should render their error treatment. */
  showError: boolean;
  /** Disables every radio in the group. */
  disabled?: boolean;
  /** Default accent color for the radios. */
  color?: FastRadioGroupColor;
}

export const FastRadioGroupContext = createContext<FastRadioGroupContextValue | null>(null);

/** Read the enclosing {@link FastRadioGroup} context (null when used standalone). */
export function useFastRadioGroup(): FastRadioGroupContextValue | null {
  return useContext(FastRadioGroupContext);
}

export interface FastRadioGroupProps {
  /** Shared radio name — children inherit it. */
  name?: string;
  /** Group label. Renders a red asterisk when `required`. */
  label?: string;
  /** Default accent color for the radios. A radio's own `color` wins. */
  color?: FastRadioGroupColor;
  /** Shows an asterisk and auto-validates on blur while no option is selected. */
  required?: boolean;
  /** Red error styling, driven by the parent. */
  error?: boolean;
  /** Custom error message shown in red below the group. Implies error styling. */
  errorMessage?: string;
  /** Helper text shown below the group (gray, or red when invalid). */
  helperText?: string;
  /** Disables every radio in the group. */
  disabled?: boolean;
  /** Layout direction of the radios. */
  orientation?: 'row' | 'column';
  /** Gap between radios. Number → px, string → raw CSS. */
  gap?: number | string;
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Selection change handler — receives the selected value. */
  onChange?: (value: string) => void;
  /** The radios to render. */
  children?: React.ReactNode;
}

export function FastRadioGroup({
  name,
  label,
  color,
  required,
  error,
  errorMessage,
  helperText,
  disabled,
  orientation = 'row',
  gap,
  value: controlledValue,
  defaultValue,
  onChange,
  children,
}: FastRadioGroupProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const selected = isControlled ? controlledValue : internalValue;
  const [touched, setTouched] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const helperId = useId();

  const hasSelection = selected !== undefined && selected !== '';
  const invalid = !!(required && touched && !hasSelection);
  const showError = !!(error || errorMessage || invalid);
  const message = errorMessage || (invalid ? 'This field is required' : '');

  const select = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (required && !wrapperRef.current?.contains(e.relatedTarget as Node)) {
      setTouched(true);
    }
  };

  return (
    <StyledWrapper
      ref={wrapperRef}
      $orientation={orientation}
      $gap={gap}
      $error={showError}
      onBlur={handleBlur}
    >
      {label && (
        <span className="group-label">
          {label}
          {required && <span className="asterisk"> *</span>}
        </span>
      )}

      <div
        className="group-items"
        role="radiogroup"
        aria-label={label}
        aria-required={required || undefined}
        aria-invalid={showError || undefined}
        aria-disabled={disabled || undefined}
        aria-describedby={message || helperText ? helperId : undefined}
      >
        <FastRadioGroupContext.Provider value={{ name, selected, select, showError, disabled, color }}>
          {children}
        </FastRadioGroupContext.Provider>
      </div>

      {(message || helperText) && (
        <span id={helperId} className={`group-helper${message ? ' error' : ''}`}>
          {message || helperText}
        </span>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled('div')<{
  $orientation: 'row' | 'column';
  $gap?: number | string;
  $error: boolean;
}>`
  display: inline-flex;
  flex-direction: column;
  gap: 8px;

  .group-label {
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${p => (p.$error ? p.theme.palette.error.main : p.theme.palette.text.primary)};
  }

  .asterisk {
    color: ${p => p.theme.palette.error.main};
  }

  .group-items {
    display: flex;
    flex-direction: ${p => p.$orientation};
    flex-wrap: wrap;
    align-items: ${p => (p.$orientation === 'row' ? 'center' : 'stretch')};
    gap: ${p => {
      if (p.$gap !== undefined) return typeof p.$gap === 'number' ? `${p.$gap}px` : p.$gap;
      return p.$orientation === 'row' ? '16px' : '8px';
    }};
  }

  .group-helper {
    font-family: inherit;
    font-size: 0.75rem;
    color: ${p => p.theme.palette.text.secondary};

    &.error {
      color: ${p => p.theme.palette.error.main};
    }
  }
`;
