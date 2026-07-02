'use client';

import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastTextFieldColor = 'primary' | 'secondary';

export interface FastTextFieldProps extends Omit<TextFieldProps, 'color'> {
  color?: FastTextFieldColor;
}

export function FastTextField({
  color = 'primary',
  ...rest
}: FastTextFieldProps) {
  return <StyledTextField $accent={color} {...rest} />;
}

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== '$accent',
})<{ $accent: FastTextFieldColor }>`
  & .MuiOutlinedInput-root {
    border-radius: 0px;
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(p) => (p.theme.palette[p.$accent] as PaletteColor).main};
      border-width: 2px;
    }
  }

  & .MuiInputLabel-root.Mui-focused {
    color: ${(p) => (p.theme.palette[p.$accent] as PaletteColor).main};
  }
`;
