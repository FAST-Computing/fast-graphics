'use client';

import React from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme } from '@mui/material/styles';

import { getColorSet, type FastColor } from './colors.js';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastSegmentedColor = FastColor;

export interface FastSegmentedOption {
  /** Unique value identifying the segment. */
  value: string;
  /** Optional label text. */
  label?: string;
  /** Optional icon (MUI icon or any React node) shown before the label. */
  icon?: React.ReactNode;
}

export interface FastSegmentedToggleProps {
  /** Segments to render, in order. */
  options: FastSegmentedOption[];
  /** Currently selected option value (controlled). */
  value: string;
  /** Selection change handler. */
  onChange: (value: string) => void;
  /** Accent color of the sliding thumb. */
  color?: FastSegmentedColor;
  /** Disabled state — 0.4 opacity, no pointer events. */
  disabled?: boolean;
  /** Width of each segment in px. Default 120. */
  segmentWidth?: number;
  /** Height of each segment in px. Default 38. */
  height?: number;
  /** Accessible label for the radiogroup. */
  ariaLabel?: string;
}

export function FastSegmentedToggle({
  options,
  value,
  onChange,
  color = 'primary',
  disabled = false,
  segmentWidth = 120,
  height = 38,
  ariaLabel = 'Segmented control',
}: FastSegmentedToggleProps) {
  const count = options.length;
  const index = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (disabled || count === 0) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onChange(options[(index + 1) % count].value);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onChange(options[(index - 1 + count) % count].value);
    }
  };

  if (count === 0) return null;

  return (
    <StyledWrapper
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      $color={color}
      $disabled={disabled}
    >
      <StyledThumb $color={color} $index={index} $count={count} />

      {options.map((option) => {
        const active = option.value === value;
        return (
          <StyledSegment
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={option.label ?? option.value}
            tabIndex={active ? 0 : -1}
            onClick={() => {
              if (!active && !disabled) onChange(option.value);
            }}
            onKeyDown={handleKeyDown}
            $color={color}
            $active={active}
            $w={segmentWidth}
            $h={height}
          >
            {option.icon}
            {option.label && <span className="segment-label">{option.label}</span>}
          </StyledSegment>
        );
      })}
    </StyledWrapper>
  );
}

type ThumbProps = {
  $color: FastSegmentedColor;
  $index: number;
  $count: number;
};

const StyledThumb = styled('div')<ThumbProps>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc((100% - 8px) / ${p => p.$count});
  height: calc(100% - 8px);
  background-color: ${p => getColorSet(p.$color, p.theme, false).main};
  transform: translateX(${p => p.$index * 100}%);
  transition: transform 320ms cubic-bezier(0.34, 1.4, 0.64, 1);
`;

type WrapperProps = {
  $color: FastSegmentedColor;
  $disabled: boolean;
};

const StyledWrapper = styled('div')<WrapperProps>`
  display: inline-flex;
  position: relative;
  align-items: center;
  padding: 4px;
  background-color: ${p => p.theme.palette.background.paper};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.14);
  opacity: ${p => (p.$disabled ? 0.4 : 1)};
  pointer-events: ${p => (p.$disabled ? 'none' : 'auto')};
  user-select: none;
`;

type SegmentProps = {
  $color: FastSegmentedColor;
  $active: boolean;
  $w: number;
  $h: number;
};

const StyledSegment = styled('button')<SegmentProps>`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: ${p => `${p.$w}px`};
  height: ${p => `${p.$h}px`};
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-family: ${p => p.theme.typography.fontFamily};
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1;
  color: ${p =>
    p.$active
      ? getColorSet(p.$color, p.theme, false).contrastText
      : p.theme.palette.text.primary};
  transition: color 200ms ease;

  svg {
    font-size: 24px;
    flex-shrink: 0;
  }

  &:hover {
    color: ${p =>
      p.$active
        ? getColorSet(p.$color, p.theme, false).contrastText
        : p.theme.palette.text.secondary};
  }

  &:focus-visible {
    outline: 2px solid ${p => getColorSet(p.$color, p.theme, false).main};
    outline-offset: 2px;
  }
`;
