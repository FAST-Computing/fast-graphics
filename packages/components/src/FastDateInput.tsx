'use client';

import React, { useRef, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}

export type FastDateInputColor = 'primary' | 'secondary';

export interface FastDateInputProps {
  /** Accent colors. */
  color?: FastDateInputColor;
  /** Floating label text. */
  placeholder?: string;
  /** Controlled value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Change handler. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disabled state — 0.35 opacity, no interactions. */
  disabled?: boolean;
  /** Field width. Number → px, string → raw CSS. */
  width?: number | string;
  /** Field height. Number → px, string → raw CSS. */
  height?: number | string;
  /** Shows asterisk, auto-validates on blur if empty. */
  required?: boolean;
  /** Custom error message shown in red below the field. Implies error styling. */
  errorMessage?: string;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseDate(s: string): Date | null {
  if (!s) return null;
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDisplay(s: string): string {
  if (!s) return '';
  const [y, m, d] = s.split('-');
  return `${d}/${m}/${y}`;
}

function monthDays(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function monthStartWeekday(year: number, month: number): number {
  // 0 = Mon ... 6 = Sun. JS getDay(): 0=Sun, so shift.
  return (new Date(year, month, 1).getDay() + 6) % 7;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
  errorMessage,
}: FastDateInputProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => {
    const d = parseDate(isControlled ? controlledValue : (defaultValue || ''));
    return d ? d.getFullYear() : new Date().getFullYear();
  });
  const [viewMonth, setViewMonth] = useState(() => {
    const d = parseDate(isControlled ? controlledValue : (defaultValue || ''));
    return d ? d.getMonth() : new Date().getMonth();
  });

  const displayValue = isControlled ? controlledValue : internalValue;
  const hasValue = !!displayValue;
  const showError = !!(errorMessage || (required && touched && !hasValue));
  const errorMsg = errorMessage || (required && touched && !hasValue ? '*This field is required' : '');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const commitDate = useCallback((s: string) => {
    if (!isControlled) setInternalValue(s);
    setOpen(false);
    setFocused(false);
    setTouched(false);
    const ev = new Event('input', { bubbles: true }) as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange?.(ev);
  }, [isControlled, onChange]);

  const handleDayClick = (day: number) => {
    const s = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    commitDate(s);
  };

  const handleToday = () => {
    commitDate(todayStr());
  };

  const days: (number | null)[] = [];
  const total = monthDays(viewYear, viewMonth);
  const startWk = monthStartWeekday(viewYear, viewMonth);
  for (let i = 0; i < startWk; i++) days.push(null);
  for (let d = 1; d <= total; d++) days.push(d);

  return (
    <Wrapper ref={wrapperRef} $color={color} $w={width} $isPct={typeof width === 'string'} $h={height} $disabled={!!disabled} $float={hasValue || focused} $error={showError}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!wrapperRef.current?.contains(e.relatedTarget as Node)) { setFocused(false); if (required && !hasValue) setTouched(true); } }}
      tabIndex={disabled ? -1 : 0}
    >
      <Trigger onClick={() => { if (!disabled) setOpen(!open); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } }}>
        <div className="date-trigger">
          <span className="date-label">{hasValue ? formatDisplay(displayValue) : ''}</span>
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
            <NavBtn onClick={() => { if (viewMonth === 0) { setViewYear(v => v - 1); setViewMonth(11); } else setViewMonth(m => m - 1); }}>
              <ChevronLeftIcon sx={{ fontSize: 20 }} />
            </NavBtn>
            <NavTitle>{MONTHS[viewMonth]} {viewYear}</NavTitle>
            <NavBtn onClick={() => { if (viewMonth === 11) { setViewYear(v => v + 1); setViewMonth(0); } else setViewMonth(m => m + 1); }}>
              <ChevronRightIcon sx={{ fontSize: 20 }} />
            </NavBtn>
          </Nav>
          <Grid>
            {WEEKDAYS.map(w => <Weekday key={w}>{w}</Weekday>)}
            {days.map((d, i) => {
              const dateStr = d ? `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` : '';
              const isSelected = d && dateStr === displayValue;
              const isToday = d && dateStr === todayStr();
              return (
                <Day key={i} $color={color} $selected={!!isSelected} $today={!!isToday}
                  $empty={!d}
                  onClick={() => d && handleDayClick(d)}
                >
                  {d || ''}
                </Day>
              );
            })}
          </Grid>
          <PopupActions>
            <PopupBtn $color={color} onClick={handleToday}>Today</PopupBtn>
            <PopupBtn $color={color} onClick={() => { commitDate(''); }}>Clear</PopupBtn>
          </PopupActions>
        </Popup>
      )}

      <input ref={hiddenRef} type="hidden" value={displayValue} readOnly />

      {errorMsg && <span className="field-helper">{errorMsg}</span>}
    </Wrapper>
  );
}

type Palette = { theme: MuiTheme; $color: FastDateInputColor };
const pc = (p: Palette) => p.theme.palette[p.$color] as PaletteColor;

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
  .asterisk { color: ${p => p.theme.palette.error.main}; }
  .field-helper {
    position: absolute; bottom: -18px; left: 2px;
    font-family: inherit; font-size: 0.75rem; color: ${p => p.theme.palette.error.main};
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

const Day = styled('div')<{ $color: FastDateInputColor; $selected: boolean; $today: boolean; $empty: boolean }>`
  text-align: center;
  font-family: inherit; font-size: 0.8125rem; font-weight: 500;
  padding: 6px 0;
  cursor: ${p => (p.$empty ? 'default' : 'pointer')};
  color: ${p => p.$empty ? 'transparent' : p.$selected ? pc({ theme: p.theme, $color: p.$color }).contrastText : p.theme.palette.text.primary};
  background: ${p => p.$selected ? pc({ theme: p.theme, $color: p.$color }).main : (p.$today ? p.theme.palette.action.hover : 'transparent')};
  border-radius: 0;
  transition: background 0.1s ease;
  pointer-events: ${p => (p.$empty ? 'none' : 'auto')};

  &:hover {
    background: ${p => p.$selected ? pc({ theme: p.theme, $color: p.$color }).main : p.theme.palette.action.hover};
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
