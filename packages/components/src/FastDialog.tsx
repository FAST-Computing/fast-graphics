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

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastDialogColor = 'primary' | 'secondary';

export interface FastDialogProps extends Omit<DialogProps, 'color' | 'title'> {
  color?: FastDialogColor;
  title?: ReactNode;
  actions?: ReactNode;
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
          <DialogTitle sx={{ color: 'inherit', fontWeight: 600, px: 3, py: 2 }}>
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: 'inherit', mr: 1 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
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
