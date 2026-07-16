'use client';

import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import type { SnackbarProps } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import NotificationsIcon from '@mui/icons-material/Notifications';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}

export type FastSnackbarColor = 'primary' | 'secondary';
export type FastSnackbarType = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface FastSnackbarProps extends Omit<SnackbarProps, 'color'> {
  /** Base palette color for the "default" type. */
  color?: FastSnackbarColor;
  /** Semantic type — changes the filled background color (success=green, error=red, etc.). */
  type?: FastSnackbarType;
  /** Notification message text (white on colored background). */
  message: string;
  /** Label for the optional action button (e.g. "Undo"). */
  actionLabel?: string;
  /** Click handler for the action button. */
  onAction?: () => void;
  /** Hide the close (X) button. */
  hideClose?: boolean;
}

function typeColor(palette: MuiTheme['palette'], type: FastSnackbarType, accent: FastSnackbarColor): string {
  switch (type) {
    case 'success': return palette.success.main;
    case 'error': return palette.error.main;
    case 'warning': return palette.warning.main;
    case 'info': return palette.info.main;
    default: return (palette[accent] as PaletteColor).main;
  }
}

function TypeIcon({ type }: { type: FastSnackbarType }) {
  const style = { fontSize: 22 };
  switch (type) {
    case 'success': return <CheckCircleIcon style={style} />;
    case 'error': return <ErrorIcon style={style} />;
    case 'warning': return <ErrorIcon style={style} />;
    case 'info': return <NotificationsIcon style={style} />;
    default: return <NotificationsIcon style={style} />;
  }
}

const drain = keyframes`
  from { transform: scaleX(1); }
  to   { transform: scaleX(0); }
`;

export function FastSnackbar({
  color = 'primary',
  type = 'default',
  message,
  actionLabel,
  onAction,
  hideClose = false,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  autoHideDuration,
  onClose,
  ...rest
}: FastSnackbarProps) {
  const handleClose = (e: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    onClose?.(e, reason as any);
  };

  const dur = autoHideDuration ?? undefined;

  return (
    <StyledSnackbar
      {...rest}
      $type={type}
      $accent={color}
      $duration={dur}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      message={
        <Bar $type={type} $accent={color} $duration={dur}>
          {dur !== undefined && dur > 0 && <div className="drain" />}
          <ContentArea>
            <TypeIcon type={type} />
            <span className="msg">{message}</span>
            {actionLabel && (
              <button className="action" onClick={onAction}>{actionLabel}</button>
            )}
            {!hideClose && (
              <button className="close" onClick={(e) => handleClose(e, 'close')} aria-label="close">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </ContentArea>
        </Bar>
      }
    />
  );
}

type P = { theme: MuiTheme; $type: FastSnackbarType; $accent: FastSnackbarColor; $duration?: number };

const bg = (p: P) => typeColor(p.theme.palette, p.$type, p.$accent);

const StyledSnackbar = styled(Snackbar, {
  shouldForwardProp: (prop) => prop !== '$type' && prop !== '$accent' && prop !== '$duration',
})<{ $type: FastSnackbarType; $accent: FastSnackbarColor; $duration?: number }>`
  & .MuiSnackbarContent-root {
    background: ${bg};
    border-radius: 0;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
    padding: 0;
    min-width: 320px;
    overflow: hidden;
  }

  & .MuiSnackbarContent-message {
    padding: 0;
    width: 100%;
  }
`;

const Bar = styled('div')<{ $type: FastSnackbarType; $accent: FastSnackbarColor; $duration?: number }>`
  position: relative;
  overflow: hidden;

  .drain {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.1);
    transform-origin: right center;
    transform: scaleX(1);
    pointer-events: none;
    animation: ${drain} 5000ms linear forwards;
    animation-duration: ${p => p.$duration ? `${p.$duration}ms` : '5000ms'};
  }
`;

const ContentArea = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  color: #fff;

  .msg {
    flex: 1;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.4;
  }

  .action {
    flex-shrink: 0;
    border: none;
    background: rgba(255, 255, 255, 0.15);
    font-family: inherit;
    font-size: 0.8125rem;
    font-weight: 500;
    color: inherit;
    cursor: pointer;
    padding: 4px 10px;
    transition: background 0.15s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  }

  .close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    color: inherit;
    cursor: pointer;
    opacity: 0.75;
    padding: 4px;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 1;
    }
  }
`;
