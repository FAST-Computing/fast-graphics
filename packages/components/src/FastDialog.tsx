'use client';

import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import type { DialogProps } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastDialogColor = 'primary' | 'secondary';

export interface FastDialogProps extends Omit<DialogProps, 'color' | 'title'> {
  /** Accent color for the header bar background. */
  color?: FastDialogColor;
  /** Title text or node rendered in the branded header bar. */
  title?: ReactNode;
  /** Footer action elements (buttons). */
  actions?: ReactNode;
  /** Close handler. Required for controlled open state. */
  onClose: () => void;
}

export function FastDialog({
  open,
  onClose,
  title,
  children,
  actions,
  color = 'primary',
  maxWidth = 'sm',
  ...rest
}: FastDialogProps) {
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth={maxWidth} {...rest} $accent={color}>
      {title && (
        <StyledHeader $accent={color}>
          <DialogTitle sx={{ color: 'inherit', fontSize: '1rem', fontWeight: 600, px: 3, py: 1 }}>
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: 'inherit', mr: 1 }}
          >
            <CloseIcon />
          </IconButton>
        </StyledHeader>
      )}
      <StyledContent>{children}</StyledContent>
      {actions && <StyledActions>{actions}</StyledActions>}
    </StyledDialog>
  );
}

const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== '$accent',
})<{ $accent: FastDialogColor }>`
  & .MuiPaper-root {
    border: none;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
    border-radius: 0;
    overflow: hidden;
  }

  & .MuiBackdrop-root {
    background-color: ${(p) => (p.theme.palette[p.$accent] as PaletteColor).dark}100;
  }
`;

const StyledHeader = styled('div')<{ $accent: FastDialogColor }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(p) => (p.theme.palette[p.$accent] as PaletteColor).main};
  color: ${(p) => (p.theme.palette[p.$accent] as PaletteColor).contrastText};
  padding-right: 4px;
`;

const StyledContent = styled(DialogContent)`
  padding: 24px;
`;

const StyledActions = styled(DialogActions)`
  padding: 12px 16px;
  gap: 8px;

  & .MuiButton-root {
    font-weight: 600;
    border-radius: 0;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
    transition: transform 0.05s ease;

    &:active {
      transform: translateY(3px);
    }
  }
`;
