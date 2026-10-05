'use client';

import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { getColorSet, type FastColor } from './colors.js';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}

export type FastDateInputColor = FastColor;
export type FastDateInputMode = 'date' | 'datetime-local';
export type FastDateValue = Date | string | null | undefined;

const cs = (p: { theme: MuiTheme; $color: FastDateInputColor }) => getColorSet(p.$color, p.theme, false);

export interface FastDateInputProps {
  /** Accent colors. */
  color?: FastDateInputColor;
  /** Floating label text. */
  placeholder?: string;
  /** Controlled value — a Date, an ISO string, or null. */
  value?: FastDateValue;
  /** Uncontrolled initial value. */
  defaultValue?: FastDateValue;
  /** Legacy change handler (native input event; target.value is the ISO string). */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** New change handler that receives a Date (or null when cleared). */
  onDateChange?: (value: Date | null) => void;
  /** Blur handler. */
  onBlur?: () => void;
  /** Field name (submitted through a hidden input). */
  name?: string;
  /** Field id. */
  id?: string;
  /** "date" (default) or "datetime-local". */
  mode?: FastDateInputMode;
  /** BCP-47 locale used for month/weekday/value formatting. Default "it-IT". */
  locale?: string;
  /** Earliest selectable date. */
  min?: Date;
  /** Latest selectable date. */
  max?: Date;
  /** Disabled state — 0.35 opacity, no interactions. */
  disabled?: boolean;
  /** Read-only state — value shown but calendar cannot be opened. */
  readOnly?: boolean;
  /** Field width. Number → px, string → raw CSS. */
  width?: number | string;
  /** Stretch to the container width (width: 100%). */
  fullWidth?: boolean;
  /** Field height. Number → px, string → raw CSS. */
  height?: number | string;
  /** Red error styling. */
  error?: boolean;
  /** Shows asterisk, auto-validates on blur if empty. */
  required?: boolean;
  /** Custom error message shown in red below the field. Implies error styling. */
  errorMessage?: string;
  /** Helper text shown below the field (gray, or red when error is true). */
  helperText?: string;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function toDateString(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function toDateTimeString(d: Date): string {
  return `${toDateString(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function toDate(value: FastDateValue, mode: FastDateInputMode): Date | null {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  const s = String(value);
  const [y, m, d] = s.split('T')[0].split('-').map(Number);
  if (!y || !m || !d) return null;
  if (mode === 'datetime-local' && s.includes('T')) {
    const [hh, mm] = s.split('T')[1].split(':').map(Number);
    return new Date(y, m - 1, d, hh || 0, mm || 0);
  }
  return new Date(y, m - 1, d);
}

function normalize(value: FastDateValue, mode: FastDateInputMode): string {
  if (!value) return '';
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? '' : mode === 'datetime-local' ? toDateTimeString(value) : toDateString(value);
  }
  const s = String(value);
  if (mode === 'datetime-local') {
    return s.includes('T') ? s.slice(0, 16) : `${s.slice(0, 10)}T00:00`;
  }
  return s.slice(0, 10);
}

function todayStr(): string {
  return toDateString(new Date());
}

function monthDays(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function monthStartWeekday(year: number, month: number): number {
  // 0 = Mon ... 6 = Sun.
  return (new Date(year, month, 1).getDay() + 6) % 7;
}

function dateKey(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export const FastDateInput = React.forwardRef<HTMLInputElement, FastDateInputProps>(
  function FastDateInput(props, ref) {
    const {
      color = 'primary',
      placeholder = 'Select date',
      value: controlledValue,
      defaultValue,
      onChange,
      onDateChange,
      onBlur,
      name,
      id,
      mode = 'date',
      locale = 'it-IT',
      min,
      max,
      disabled,
      readOnly,
      width,
      height = 52,
      fullWidth,
      required,
      error,
      errorMessage,
      helperText,
    } = props;

    const isControlled = controlledValue !== undefined;
    const initial = normalize(isControlled ? controlledValue : defaultValue, mode);
    const [internalValue, setInternalValue] = useState(initial);
    const [focused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(() => (initial.includes('T') ? initial.split('T')[1].slice(0, 5) : '00:00'));

    const displayValue = isControlled ? normalize(controlledValue, mode) : internalValue;
    const parsed = toDate(displayValue, mode);
    const hasValue = !!displayValue;
    const showError = !!(error || errorMessage || (required && touched && !hasValue));
    const errorMsg = errorMessage || (required && touched && !hasValue ? 'This field is required' : '');

    const [viewYear, setViewYear] = useState(() => (parsed ? parsed.getFullYear() : new Date().getFullYear()));
    const [viewMonth, setViewMonth] = useState(() => (parsed ? parsed.getMonth() : new Date().getMonth()));

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
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    useEffect(() => {
      if (!isControlled) return;
      const d = toDate(controlledValue, mode);
      if (d) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
        if (mode === 'datetime-local') {
          setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}`);
        }
      }
    }, [controlledValue, isControlled, mode]);

    const emitChange = useCallback((raw: string) => {
      if (!onChange) return;
      const nativeInput = hiddenRef.current;
      if (!nativeInput) return;
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(nativeInput, raw);
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
    }, [onChange]);

    const commit = useCallback((raw: string) => {
      if (!isControlled) setInternalValue(raw);
      setOpen(false);
      setFocused(false);
      setTouched(false);
      emitChange(raw);
      onDateChange?.(toDate(raw, mode));
      onBlur?.();
    }, [emitChange, isControlled, mode, onDateChange, onBlur]);

    const handleDayClick = (day: number) => {
      const dateStr = dateKey(viewYear, viewMonth, day);
      commit(mode === 'datetime-local' ? `${dateStr}T${time}` : dateStr);
    };

    const handleToday = () => {
      commit(mode === 'datetime-local' ? `${todayStr()}T${time}` : todayStr());
    };

    const handleClear = () => {
      commit('');
    };

    const monthNames = useMemo(
      () => Array.from({ length: 12 }, (_, m) => new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2024, m, 1))),
      [locale],
    );

    const weekdayNames = useMemo(
      () => Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(2024, 0, 1 + i))),
      [locale],
    );

    const valueFormatter = useMemo(
      () =>
        new Intl.DateTimeFormat(locale, mode === 'datetime-local'
          ? { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }
          : { day: '2-digit', month: '2-digit', year: 'numeric' }),
      [locale, mode],
    );

    const isDisabledDay = (year: number, month: number, day: number): boolean => {
      const d = new Date(year, month, day);
      if (min && d < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
      if (max && d > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
      return false;
    };

    const days: (number | null)[] = [];
    const total = monthDays(viewYear, viewMonth);
    const startWk = monthStartWeekday(viewYear, viewMonth);
    for (let i = 0; i < startWk; i++) days.push(null);
    for (let d = 1; d <= total; d++) days.push(d);

    const displayLabel = parsed ? valueFormatter.format(parsed) : '';
    const interactive = !disabled && !readOnly;
    const resolvedWidth = fullWidth ? '100%' : width;

    return (
      <Wrapper
        ref={wrapperRef}
        $color={color}
        $w={resolvedWidth}
        $isPct={typeof resolvedWidth === 'string'}
        $h={height}
        $disabled={!!disabled}
        $float={hasValue || focused}
        $error={showError}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
            setFocused(false);
            if (required && !hasValue) setTouched(true);
            onBlur?.();
          }
        }}
      >
        <Trigger
          role="button"
          tabIndex={interactive ? 0 : -1}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-disabled={!interactive}
          onClick={() => { if (interactive) setOpen(!open); }}
          onKeyDown={(e) => { if (interactive && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setOpen(!open); } }}
        >
          <div className="date-trigger">
            <span className="date-label">{displayLabel}</span>
          </div>
          <span className="float-label">
            {placeholder}
            {required && <span className="asterisk"> *</span>}
          </span>
          <CalendarMonthIcon className="date-icon" />
        </Trigger>

        {open && (
          <Popup $color={color}>
            <Nav>
              <NavBtn type="button" onClick={() => { if (viewMonth === 0) { setViewYear(v => v - 1); setViewMonth(11); } else setViewMonth(m => m - 1); }}>
                <ChevronLeftIcon sx={{ fontSize: 20 }} />
              </NavBtn>
              <NavTitle>{monthNames[viewMonth]} {viewYear}</NavTitle>
              <NavBtn type="button" onClick={() => { if (viewMonth === 11) { setViewYear(v => v + 1); setViewMonth(0); } else setViewMonth(m => m + 1); }}>
                <ChevronRightIcon sx={{ fontSize: 20 }} />
              </NavBtn>
            </Nav>
            <Grid>
              {weekdayNames.map(w => <Weekday key={w}>{w}</Weekday>)}
              {days.map((d, i) => {
                if (!d) return <Day key={i} $color={color} $selected={false} $today={false} $disabled $empty>.</Day>;
                const key = dateKey(viewYear, viewMonth, d);
                const selected = key === displayValue.slice(0, 10);
                const isToday = key === todayStr();
                const dayDisabled = isDisabledDay(viewYear, viewMonth, d);
                return (
                  <Day
                    key={i}
                    $color={color}
                    $selected={selected}
                    $today={isToday}
                    $disabled={dayDisabled}
                    $empty={false}
                    onClick={() => { if (!dayDisabled) handleDayClick(d); }}
                  >
                    {d}
                  </Day>
                );
              })}
            </Grid>
            {mode === 'datetime-local' && (
              <TimeRow>
                <input type="time" className="time-input" value={time} onChange={(e) => setTime(e.target.value)} />
              </TimeRow>
            )}
            <PopupActions>
              <PopupBtn type="button" $color={color} onClick={handleToday}>Today</PopupBtn>
              <PopupBtn type="button" $color={color} onClick={handleClear}>Clear</PopupBtn>
            </PopupActions>
          </Popup>
        )}

        <input
          ref={setRefs}
          id={id}
          name={name}
          type="text"
          className="date-value-input"
          value={displayValue}
          onChange={onChange}
          readOnly
          tabIndex={-1}
          aria-hidden="true"
        />

        {(helperText || errorMsg) && <span className="field-helper">{errorMsg || helperText}</span>}
      </Wrapper>
    );
  },
);

type Palette = { theme: MuiTheme; $color: FastDateInputColor };
const pc = (p: Palette) => getColorSet(p.$color, p.theme, false);

const Wrapper = styled('div')<{
  $color: FastDateInputColor;
  $w?: number | string; $isPct: boolean; $h: number | string;
  $disabled: boolean; $float: boolean; $error: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  ${p => p.$w !== undefined ? `width: ${p.$isPct ? p.$w : `${p.$w}px`};` : ''}
  opacity: ${p => (p.$disabled ? 0.35 : 1)};
  height: ${p => (typeof p.$h === 'number' ? `${p.$h}px` : p.$h)};
  border: 2px solid ${p => p.$error ? p.theme.palette.error.main : pc(p).main};
  cursor: ${p => (p.$disabled ? 'default' : 'pointer')};
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) { background: ${(p: any) => pc(p).main}; }
  &:hover:not(:disabled) .date-label { color: ${(p: any) => pc(p).contrastText}; }
  &:hover:not(:disabled) .float-label { color: ${(p: any) => pc(p).contrastText}; }
  &:hover:not(:disabled) .date-icon { color: ${(p: any) => pc(p).contrastText}; }

  .date-trigger {
    flex: 1; height: 100%; display: flex; align-items: center;
    padding: 0 14px; padding-top: ${p => (p.$float ? '10px' : '0')};
    cursor: pointer; outline: none; background: transparent; border: none; font-family: inherit;
  }
  .date-label {
    font-family: inherit; font-size: 0.9375rem; font-weight: 500;
    color: ${p => p.$error ? p.theme.palette.error.main : p.theme.palette.text.primary};
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 0.2s ease;
  }
  .float-label {
    position: absolute; left: 14px;
    top: ${p => (p.$float ? '6px' : '50%')}; transform: ${p => (p.$float ? 'translateY(0)' : 'translateY(-50%)')};
    font-family: inherit; font-size: ${p => (p.$float ? '0.7rem' : '0.9375rem')};
    font-weight: ${p => (p.$float ? '600' : '400')};
    color: ${p => p.$error ? p.theme.palette.error.main : pc(p).main};
    pointer-events: none; transition: all 0.15s ease;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: calc(100% - 60px);
  }
  .date-icon {
    flex-shrink: 0; margin-right: 10px; font-size: 1.5rem;
    color: ${p => p.$error ? p.theme.palette.error.main : p.theme.palette.text.primary};
    transition: color 0.2s ease;
  }
  .date-value-input {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }
  .asterisk { color: ${p => p.theme.palette.error.main}; }
  .field-helper {
    position: absolute; bottom: -18px; left: 2px;
    font-family: inherit; font-size: 0.75rem;
    color: ${p => p.$error ? p.theme.palette.error.main : p.theme.palette.text.secondary};
  }
`;

const Trigger = styled('div')`
  display: flex; align-items: center; width: 100%; height: 100%;
  &:active { transform: translateY(2px); }
`;

const Popup = styled('div')<{ $color: FastDateInputColor }>`
  position: absolute;
  top: calc(100% + 6px);
  left: -2px;
  width: 100%;
  min-width: 280px;
  background: ${p => p.theme.palette.background.paper};
  border: 1px solid ${p => p.theme.palette.divider};
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
  z-index: 1300;
  padding: 12px;
`;

const Nav = styled('div')`
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 10px;
`;

const NavBtn = styled('button')`
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border: none; background: none;
  cursor: pointer; color: ${p => p.theme.palette.text.secondary};
  transition: background 0.12s ease;
  &:hover { background: ${p => p.theme.palette.action.hover}; }
`;

const NavTitle = styled('span')`
  font-family: inherit; font-size: 0.875rem; font-weight: 600;
  color: ${p => p.theme.palette.text.primary};
`;

const Grid = styled('div')`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const Weekday = styled('div')`
  text-align: center;
  font-family: inherit; font-size: 0.7rem; font-weight: 600;
  color: ${p => p.theme.palette.text.secondary};
  padding: 6px 0;
`;

const Day = styled('div')<{ $color: FastDateInputColor; $selected: boolean; $today: boolean; $disabled: boolean; $empty: boolean }>`
  text-align: center;
  font-family: inherit; font-size: 0.8125rem; font-weight: 500;
  padding: 6px 0;
  cursor: ${p => (p.$empty || p.$disabled ? 'default' : 'pointer')};
  color: ${p => p.$empty
    ? 'transparent'
    : p.$disabled
      ? p.theme.palette.action.disabled
      : p.$selected
        ? pc({ theme: p.theme, $color: p.$color }).contrastText
        : p.theme.palette.text.primary};
  background: ${p => p.$selected ? pc({ theme: p.theme, $color: p.$color }).main : (p.$today ? p.theme.palette.action.hover : 'transparent')};
  border-radius: 0;
  transition: background 0.1s ease;
  pointer-events: ${p => (p.$empty || p.$disabled ? 'none' : 'auto')};

  &:hover {
    background: ${p => p.$selected ? pc({ theme: p.theme, $color: p.$color }).main : p.theme.palette.action.hover};
  }
`;

const TimeRow = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  .time-input {
    font-family: inherit;
    font-size: 0.8125rem;
    padding: 6px 8px;
    border: 1px solid ${p => p.theme.palette.divider};
    background: ${p => p.theme.palette.background.paper};
    color: ${p => p.theme.palette.text.primary};
    width: 100%;
  }
`;

const PopupActions = styled('div')`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const PopupBtn = styled('button', {
  shouldForwardProp: (prop) => prop !== '$color',
})<{ $color: FastDateInputColor }>`
  flex: 1;
  padding: 6px 0;
  border: none;
  background: none;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(p: any) => pc(p).main};
  cursor: pointer;
  transition: background 0.12s ease;
  &:hover { background: ${p => p.theme.palette.action.hover}; }
`;
