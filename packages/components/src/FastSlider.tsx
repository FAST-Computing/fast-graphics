'use client';

import React from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';
import { Slider } from '@mui/material';
import type { SliderProps } from '@mui/material';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastSliderColor = 'primary' | 'secondary';

export interface FastSliderProps extends SliderProps {
  color?: FastSliderColor;
  width?: number | string;
  height?: number | string;
  /** Label text shown above the slider. */
  label?: string;
}

export function FastSlider({ color = 'primary', width, height, label, ...rest }: FastSliderProps) {
  return (
    <StyledWrapper $w={width} $isPct={typeof width === 'string'} $disabled={rest.disabled}>
      {label && <span className="slider-label">{label}</span>}
      <StyledSlider $accent={color} $h={height} {...rest} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled('div')<{ $w?: number | string; $isPct: boolean; $disabled?: boolean }>`
  ${p => p.$w !== undefined ? `width: ${p.$isPct ? p.$w : `${p.$w}px`};` : ''}
  opacity: ${p => (p.$disabled ? 0.4 : 1)};

  .slider-label {
    display: block;
    margin-bottom: 4px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: ${p => p.theme.palette.text.primary};
  }
`;

const StyledSlider = styled(Slider, {
  shouldForwardProp: (prop) => prop !== '$accent' && prop !== '$h',
})<{ $accent: FastSliderColor; $h?: number | string }>`
  color: ${(p) => (p.theme.palette[p.$accent] as PaletteColor).main};
  width: 100%;
  padding: 13px 0;
  height: ${p => (p.$h !== undefined ? (typeof p.$h === 'number' ? `${p.$h}px` : p.$h) : '6px')};

  & .MuiSlider-rail {
    height: inherit;
    border-radius: 0;
    background: ${(p) => p.theme.palette.divider};
    opacity: 1;
  }

  & .MuiSlider-track {
    height: inherit;
    border-radius: 0;
    border: none;
  }

  & .MuiSlider-thumb {
    width: 16px;
    height: 16px;
    border-radius: 0;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
    transition: box-shadow 0.15s ease, transform 0.08s ease;

    &:hover {
      box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.15);
    }

    &.Mui-active {
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
    }
  }

  & .MuiSlider-valueLabel {
    border-radius: 0;
    background: ${(p) => (p.theme.palette[p.$accent] as PaletteColor).main};
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 2px 8px;

    &::before {
      display: none;
    }
  }

  & .MuiSlider-mark {
    border-radius: 0;
    width: 3px;
    height: 3px;
    background: ${(p) => p.theme.palette.divider};
  }

  & .MuiSlider-markActive {
    background: ${(p) => (p.theme.palette[p.$accent] as PaletteColor).main};
  }

  & .MuiSlider-markLabel {
    font-family: inherit;
    font-size: 0.75rem;
    color: ${(p) => p.theme.palette.text.secondary};
  }

  &.Mui-disabled {
    opacity: 0.4;
  }
`;
