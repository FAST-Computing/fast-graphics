'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { getColorSet, type FastColor } from './colors.js';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastSelectColor = FastColor;

const cs = (p: { theme: MuiTheme; $accent: FastSelectColor }) => getColorSet(p.$accent, p.theme, false);

export interface FastSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FastSelectProps {
  /** Accent color for border, label, and focus ring. */
  color?: FastSelectColor;
  /** Options rendered in the listbox. */
  options: FastSelectOption[];
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Selection change handler. */
  onChange?: (value: string) => void;
  /** Blur handler (fires on select and on close). */
  onBlur?: () => void;
  /** Field name (submitted through a hidden input). */
  name?: string;
  /** Field id. */
  id?: string;
  /** Floating label text. */
  label?: string;
  /** Shown when no value is selected. */
  placeholder?: string;
  /** Disabled state — 0.35 opacity, no interactions. */
  disabled?: boolean;
  /** Shows asterisk, auto-validates on blur if empty. */
  required?: boolean;
  /** Red error styling. */
  error?: boolean;
  /** Custom error message shown in red below the field. Implies error styling. */
  errorMessage?: string;
  /** Helper text shown below the field (gray, or red when error is true). */
  helperText?: string;
  /** Stretch to the container width (width: 100%). */
  fullWidth?: boolean;
  /** Field width. Number → px, string → raw CSS. */
  width?: number | string;
  /** Field height. Default 52. */
  height?: number | string;
}

export const FastSelect = React.forwardRef<HTMLInputElement, FastSelectProps>(
  function FastSelect(props, ref) {
    const {
      color: accent = 'primary',
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      onBlur,
      name,
      id,
      label,
      placeholder = 'Select…',
      disabled,
      required,
      error,
      errorMessage,
      helperText,
      fullWidth,
      width,
      height = 52,
    } = props;

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const selectedValue = isControlled ? controlledValue : internalValue;
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);
    const [highlight, setHighlight] = useState(-1);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const hiddenRef = useRef<HTMLInputElement>(null);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        hiddenRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref],
    );

    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setOpen(false);
          onBlur?.();
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open, onBlur]);

    const selected = options.find(o => o.value === selectedValue);
    const hasValue = !!selectedValue;
    const showError = !!(error || errorMessage || (required && touched && !hasValue));
    const errorMsg = errorMessage || (required && touched && !hasValue ? 'This field is required' : '');

    const commit = (opt: FastSelectOption) => {
      if (opt.disabled) return;
      if (!isControlled) setInternalValue(opt.value);
      onChange?.(opt.value);
      setOpen(false);
      setFocused(false);
      setTouched(false);
      onBlur?.();
    };

    const openMenu = () => {
      if (disabled) return;
      setOpen(true);
      setHighlight(Math.max(0, options.findIndex(o => o.value === selectedValue)));
    };

    const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        openMenu();
        return;
      }
      if (!open) return;
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight(h => Math.min(options.length - 1, h + 1)); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight(h => Math.max(0, h - 1)); return; }
      if (e.key === 'Enter') {
        e.preventDefault();
        const opt = options[highlight];
        if (opt) commit(opt);
      }
    };

    const resolvedWidth = fullWidth ? '100%' : width;

    return (
      <StyledWrapper
        ref={wrapperRef}
        $accent={accent}
        $w={resolvedWidth}
        $isPct={typeof resolvedWidth === 'string'}
        $h={height}
        $disabled={!!disabled}
        $error={showError}
        $float={hasValue || focused}
      >
        <div
          className="select-trigger"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          aria-label={label}
          tabIndex={disabled ? -1 : 0}
          onClick={() => (open ? setOpen(false) : openMenu())}
          onKeyDown={handleTriggerKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
              setFocused(false);
              if (required && !hasValue) setTouched(true);
            }
          }}
        >
          <span className={`select-value${hasValue ? '' : ' placeholder'}`}>
            {selected ? selected.label : placeholder}
          </span>
          <ExpandMoreIcon className={`select-icon${open ? ' open' : ''}`} />
        </div>

        <span className="float-label">
          {label}
          {required && <span className="asterisk"> *</span>}
        </span>

        {open && (
          <div className="select-menu" role="listbox">
            {options.map((opt, i) => (
              <div
                key={opt.value}
                role="option"
                aria-selected={opt.value === selectedValue}
                className={`select-option${opt.value === selectedValue ? ' selected' : ''}${i === highlight ? ' highlight' : ''}${opt.disabled ? ' disabled' : ''}`}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => commit(opt)}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}

        <input
          ref={setRefs}
          id={id}
          name={name}
          className="select-value-input"
          value={selectedValue}
          readOnly
          tabIndex={-1}
          aria-hidden="true"
        />

        {(helperText || errorMsg) && <span className="field-helper">{errorMsg || helperText}</span>}
      </StyledWrapper>
    );
  },
);

const StyledWrapper = styled('div')<{
  $accent: FastSelectColor;
  $w?: number | string;
  $isPct: boolean;
  $h: number | string;
  $disabled: boolean;
  $error: boolean;
  $float: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  ${p => p.$w !== undefined ? `width: ${p.$isPct ? p.$w : `${p.$w}px`};` : ''}
  opacity: ${p => (p.$disabled ? 0.35 : 1)};
  height: ${p => (typeof p.$h === 'number' ? `${p.$h}px` : p.$h)};
  border: 2px solid ${p => p.$error ? p.theme.palette.error.main : cs(p).main};
  cursor: ${p => (p.$disabled ? 'default' : 'pointer')};
  transition: background-color 0.2s ease, border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus-within {
    box-shadow: 0 0 0 3px ${p => {
      const c = p.$error ? p.theme.palette.error.main : cs(p).main;
      return `${c}33`;
    }};
  }

  .select-trigger {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 14px;
    padding-top: ${p => (p.$float ? '10px' : '0')};
    outline: none;
    cursor: inherit;
  }

  .select-value {
    flex: 1;
    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 500;
    color: ${p => p.$error ? p.theme.palette.error.main : p.theme.palette.text.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.placeholder {
      color: ${p => p.theme.palette.text.secondary};
      opacity: 0.75;
    }
  }

  .select-icon {
    flex-shrink: 0;
    margin-left: 8px;
    font-size: 1.25rem;
    color: ${p => p.$error ? p.theme.palette.error.main : cs(p).main};
    transition: transform 0.15s ease;

    &.open { transform: rotate(180deg); }
  }

  .float-label {
    position: absolute;
    left: 14px;
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
    max-width: calc(100% - 50px);
  }

  .select-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: -2px;
    right: -2px;
    min-width: 100%;
    max-height: 260px;
    overflow-y: auto;
    background: ${p => p.theme.palette.background.paper};
    border: 1px solid ${p => p.theme.palette.divider};
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
    z-index: 1300;
    padding: 4px 0;
  }

  .select-option {
    padding: 10px 16px;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${p => p.theme.palette.text.primary};
    cursor: pointer;
    transition: background-color 0.12s ease;

    &.highlight { background: ${p => p.theme.palette.action.hover}; }
    &.selected {
      color: ${p => cs(p).contrastText};
      background: ${p => cs(p).main};
    }
    &.disabled {
      color: ${p => p.theme.palette.action.disabled};
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  .select-value-input {
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

  .asterisk { color: ${p => p.theme.palette.error.main}; }

  .field-helper {
    position: absolute;
    bottom: -18px;
    left: 2px;
    font-family: inherit;
    font-size: 0.75rem;
    color: ${p => p.$error ? p.theme.palette.error.main : p.theme.palette.text.secondary};
  }
`;
