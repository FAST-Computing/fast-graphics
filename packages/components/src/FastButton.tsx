'use client';

import React from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme } from '@mui/material/styles';

import { getColorSet, type FastColor } from './colors.js';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastButtonColor = FastColor;
export { getColorSet };

export type FastButtonVariant = 'default' | 'outlined' | 'text';
export type FastButtonIconPosition = 'left' | 'right';
export type FastButtonAlign = 'center' | 'left' | 'right';
export type FastButtonType = 'button' | 'submit' | 'reset';

export interface FastButtonProps {
  /** Button text content. */
  label?: string;
  /** MUI icon or any React node to display alongside the label. */
  icon?: React.ReactNode;
  /** Image source URL to display inside the button. */
  imgSrc?: string;
  /** Alt text for the image. */
  imgAlt?: string;
  /** Image size. Number → px applies to both width and height. Defaults to ~50% of the button height. */
  imgSize?: number | string;
  /** Color from the extended palette. */
  color?: FastButtonColor;
  /** Visual style variant. */
  variant?: FastButtonVariant;
  /** Whether the icon appears before or after the label text. */
  iconPosition?: FastButtonIconPosition;
  /** Content alignment within the button. */
  align?: FastButtonAlign;
  /** Visually selected state — fills background with the color's own main value regardless of variant. */
  selected?: boolean;
  /** Button width. Number → px, string → raw CSS (e.g. "100%"). */
  width?: number | string;
  /** Button height. Number → px, string → raw CSS. */
  height?: number | string;
  /** Text font size. Number → px */
  fontSize?: number | string;
  /** Enable the clip-path circular reveal animation on hover. */
  animated?: boolean;
  /** Animation speed in ms. Only applies when "animated" is enabled. Defaults to 450. */
  animationSpeed?: number;
  /** Disabled state — 0.4 opacity, no pointer events. */
  disabled?: boolean;
  /** Native HTML button type. Defaults to "button" to prevent accidental form submits. */
  type?: FastButtonType;
  /** Click handler. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const FastButton = React.forwardRef<HTMLDivElement, FastButtonProps>(function FastButton({
    label = '',
    icon,
    imgSrc,
    imgAlt = '',
    imgSize,
    color = 'primary',
    variant = 'default',
    iconPosition = 'left',
    align = 'center',
    selected = false,
    width = 130,
    height = 40,
    fontSize,
    animated = false,
    animationSpeed = 450,
    disabled = false,
    type = 'button',
    onClick,
    ...rest
}, ref) {
  const isPct = typeof width === 'string';
  const heightNum = typeof height === 'number' ? height : parseInt(height) || 40;
  return (
    <StyledWrapper ref={ref} $color={color} $variant={variant} $w={width} $h={height} $animated={animated} $animSpeed={animationSpeed} $isPct={isPct} $hNum={heightNum} $fs={fontSize} $selected={selected} $iconPos={iconPosition} $align={align} $imgSize={imgSize} {...rest}>
      <button className="Btn" type={type} onClick={onClick} disabled={disabled}>
        <span className="Btn-content">
          {iconPosition === 'left' && icon}
          {iconPosition === 'left' && imgSrc && <img className="Btn-img" src={imgSrc} alt={imgAlt} />}
          {label && label}
          {iconPosition === 'right' && imgSrc && <img className="Btn-img" src={imgSrc} alt={imgAlt} />}
          {iconPosition === 'right' && icon}
        </span>
      </button>
    </StyledWrapper>
  );
});

type StyledProps = {
  $color: FastButtonColor;
  $variant: FastButtonVariant;
  $w: number | string;
  $h: number | string;
  $animated: boolean;
  $animSpeed: number;
  $isPct: boolean;
  $hNum: number;
  $fs?: number | string;
  $selected: boolean;
  $iconPos: FastButtonIconPosition;
  $align: FastButtonAlign;
  $imgSize?: number | string;
};

const cs = (p: StyledProps & { theme: MuiTheme }) => getColorSet(p.$color, p.theme, p.$selected);

const imgSizeCss = (p: StyledProps): string => {
  if (p.$imgSize !== undefined) {
    return typeof p.$imgSize === 'number' ? `${p.$imgSize}px` : p.$imgSize;
  }
  return `${Math.round((p.$hNum || 40) * 0.5)}px`;
};

const StyledWrapper = styled('div')<StyledProps>`
  ${p => p.$isPct
    ? `width: ${p.$w}; display: block;`
    : `width: ${p.$w}px; display: inline-flex;`
  }

  .Btn {
    width: 100%;
    height: ${p => (typeof p.$h === 'string' ? p.$h : `${p.$h}px`)};
    display: flex;
    align-items: center;
    padding: 0 ${p => {
      const h = p.$hNum || 40;
      const pad = Math.min(16, Math.max(4, Math.round(h * 0.3)));
      return `${pad}px`;
    }};
    background-color: ${p => (p.$selected || p.$variant === 'default' ? cs(p).main : 'transparent')};
    border: ${p => (p.$variant === 'outlined' ? `2px solid ${cs(p).main}` : 'none')};
    cursor: pointer;
    box-shadow: ${p => (p.$selected || p.$variant === 'default' ? '5px 5px 10px rgba(0, 0, 0, 0.103)' : 'none')};
    position: relative;
    overflow: hidden;
    font-family: inherit;
    line-height: inherit;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
  }

  .Btn-content {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${p => p.$align === 'left' ? 'flex-start' : p.$align === 'right' ? 'flex-end' : 'center'};
    gap: ${p => {
      const h = p.$hNum || 40;
      const g = Math.min(10, Math.max(2, Math.round(h * 0.2)));
      return `${g}px`;
    }};
    min-width: 0;
    color: ${p => (p.$selected || p.$variant === 'default' ? cs(p).contrastText : cs(p).main)};
    font-weight: 600;
    font-size: ${p => (p.$fs !== undefined ? (typeof p.$fs === 'number' ? `${p.$fs}px` : p.$fs) : 'inherit')};
    transition: color 0.2s ease, filter 0.2s ease;

    svg {
      font-size: ${p => {
        if (!p.$isPct && typeof p.$w === 'number') {
          const h = p.$hNum || 40;
          const pad = Math.min(16, Math.max(4, Math.round(h * 0.3)));
          const innerW = p.$w - 2 * pad;
          if (innerW > 0) return `min(1em, ${innerW}px)`;
        }
        return '1em';
      }};
      flex-shrink: 0;
    }

    .Btn-img {
      width: ${p => imgSizeCss(p)};
      height: ${p => imgSizeCss(p)};
      flex-shrink: 0;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  ${p => p.$animated && `

  .Btn::before {
    position: absolute;
    inset: 0;
    z-index: 0;
    content: "";
    background-color: ${p.$variant === 'default' ? cs(p).contrastText : cs(p).main};
    clip-path: circle(0% at 0% 100%);
    transition: clip-path ${p.$animSpeed}ms ease;
  }

  `}

  ${p => `
  .Btn:hover .Btn-content {
    ${p.$variant === 'default' ? 'filter: invert(1);' : `color: ${cs(p).contrastText};`}
  }

  .Btn:hover::before {
    clip-path: circle(150% at 0% 100%);
    transition-duration: ${p.$animated ? `${p.$animSpeed + 50}ms` : '0s'};
  }
  `}

  .Btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  .Btn:active {
    transform: translate(0px,3px);
    transition-duration: .05s;
  }
`;
