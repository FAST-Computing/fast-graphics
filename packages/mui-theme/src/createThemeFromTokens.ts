import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { brandTokens, type BrandName } from '../../tokens/dist/index.js';

export type CreateThemeOptions = {
  /** If true, adds a few component defaults that match our layouts. */
  withComponentDefaults?: boolean;
};

export function createThemeFromTokens(brand: BrandName, options: CreateThemeOptions = {}): Theme {
  const t = brandTokens[brand];

  const theme = createTheme({
    palette: {
      primary: { 
        main: t.primary.main, 
        dark: t.primary.dark, 
        light: t.primary.light 
      },
      secondary: { 
        main: t.secondary.main, 
        dark: t.secondary.dark, 
        light: t.secondary.light 
      },
      background: {
        default: t.background.default,
        paper: t.background.paper,
      },
      text: {
        primary: t.text.primary,
        secondary: t.text.secondary,
      },
    },
    typography: {
      fontFamily: t.font.main,
    },
  });

  if (!options.withComponentDefaults) return theme;

  return createTheme(theme, {
    components: {
      MuiAppBar: {
        defaultProps: {
          color: 'primary',
        },
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained',
        },
      },
    },
  });
}
