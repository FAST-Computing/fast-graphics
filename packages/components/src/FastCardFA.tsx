'use client';

import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme } from '@mui/material/styles';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export interface FastCardFAProps {
  /** Image source URL. */
  src: string;
  /** Image alt text. */
  imgAlt?: string;
  /** Card width. */
  width?: number | string;
  /** Card height. */
  height?: number | string;
  /** Invert fade/background/text colors for dark mode. */
  inverted?: boolean;
  /** Content rendered at the bottom over the image (title, text, buttons). */
  children?: ReactNode;
}

export function FastCardFA({
  src,
  imgAlt = '',
  width = 360,
  height = 480,
  inverted = false,
  children,
}: FastCardFAProps) {
  const isPct = typeof width === 'string';
  return (
    <StyledCard $w={width} $h={height} $isPct={isPct} $inverted={inverted}>
      <div className="card-image-wrap">
        <img className="card-img" src={src} alt={imgAlt} />
        <div className="card-fade" />
        {children && <div className="card-content">{children}</div>}
      </div>
    </StyledCard>
  );
}

type P = { $inverted: boolean; theme: MuiTheme };

const StyledCard = styled('div')<{ $w: number | string; $h: number | string; $isPct: boolean; $inverted: boolean }>`
  width: ${p => (p.$isPct ? p.$w : `${p.$w}px`)};
  height: ${p => (typeof p.$h === 'number' ? `${p.$h}px` : p.$h)};
  position: relative;
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
  background: ${p => p.$inverted ? p.theme.palette.text.primary : p.theme.palette.background.paper};

  .card-image-wrap {
    position: absolute;
    inset: 6px;
    overflow: hidden;
  }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .card-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 75%;
    background: ${(p: P) => p.$inverted
      ? `linear-gradient(transparent 20%, ${p.theme.palette.text.primary})`
      : `linear-gradient(transparent 20%, ${p.theme.palette.background.paper})`
    };
    backdrop-filter: blur(2px);
    mask-image: linear-gradient(transparent 20%, black 55%);
    -webkit-mask-image: linear-gradient(transparent 20%, black 55%);
    pointer-events: none;
  }

  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: ${(p: P) => p.$inverted ? p.theme.palette.background.paper : p.theme.palette.text.primary};
  }
`;
