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
  width?: number | string;
  height?: number | string;
}

export function FastTextField({
  color = 'primary',
  width,
  height,
  ...rest
}: FastTextFieldProps) {
  return <StyledTextField $accent={color} $w={width} $h={height} $isPct={typeof width === 'string'} {...rest} />;
}

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== '$accent' && prop !== '$w' && prop !== '$h' && prop !== '$isPct',
})<{ $accent: FastTextFieldColor; $w?: number | string; $h?: number | string; $isPct: boolean }>`
  ${p => p.$w !== undefined
    ? `width: ${p.$isPct ? p.$w : `${p.$w}px`};`
    : ''
  }

  & .MuiOutlinedInput-root {
    border-radius: 0px;
    ${p => p.$h !== undefined
      ? `height: ${typeof p.$h === 'number' ? `${p.$h}px` : p.$h};`
      : ''
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(p) => (p.theme.palette[p.$accent] as PaletteColor).main};
      border-width: 2px;
    }
  }

  & .MuiInputLabel-root.Mui-focused {
    color: ${(p) => (p.theme.palette[p.$accent] as PaletteColor).main};
  }
`;
