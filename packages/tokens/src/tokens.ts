export type BrandName = 
    'fast_core' | 'fast_argos' | 'fast_atlas' | 'simplifica_core' | 'simplifica_burlo' | 'smarttour';

export type BrandTokens = {
  primary: {
    main: string;
    dark: string;
    light: string;
  }
  secondary: {
    main: string;
    dark: string;
    light: string;
  }
  background: {
    default: string;
    paper: string
  }
  text: {
    primary: string;
    secondary: string;
  };
  font: {
    main: string;
    mono: string;
  }
};

/*
 * Source of truth for brand values.
 * Keep it framework-agnostic: no MUI types, no CSS preprocessor assumptions.
 */
export const brandTokens: Record<BrandName, BrandTokens> = {
  fast_core: {
    primary: {
      main: '#FF6A00',
      dark: '#d64800',
      light: '#ff8055',
    },
    secondary: {
      main: '#006b5e',
      dark: '#005246',
      light: '#54aa9b',
    },
    background: {
      default: '#dfe0df',
      paper: '#ffffff',
    },
    text: { 
      primary: '#0f0f0f',
      secondary: '#5a5a5a'
    },
    font: {
      main: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Roboto Mono", monospace',
    }
  },

  fast_argos: {
    primary: {
      main: '#643f4d',
      dark: '#554148',
      light: '#bda5ad',
    },
    secondary: {
      main: '#e98527',
      dark: '#c46e1d',
      light: '#fcad64',
    },
    background: {
      default: '#bda5ad',
      paper: '#ffffff',
    },
    text: { 
      primary: '#0f0f0f', 
      secondary: '#5a5a5a' 
    },
    font: {
      main: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Roboto Mono", monospace',
    }
  },

  fast_atlas: {
    primary: {
      main: '#334C66',
      dark: '#203244',
      light: '#507F90',
    },
    secondary: {
      main: '#e19f20',
      dark: '#ca902f',
      light: '#ffd9a0',
    },
    background: {
      default: '#BDC7CF',
      paper: '#FFFFFF',
    },
    text: { 
      primary: '#0f0f0f', 
      secondary: '#5a5a5a' 
    },
    font: {
      main: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Roboto Mono", monospace',
    }
  },

  simplifica_core: {
    primary: {
      main: '#d9cb11',
      dark: '#a9a000',
      light: '#f1eb67',
    },
    secondary: {
      main: '#7db741',
      dark: '#58921a',
      light: '#d2ff91',
    },
    background: {
      default: '#f3f3f3',
      paper: '#FFFFFF',
    },
    text: { 
      primary: '#2e2e2e', 
      secondary: '#77b844' 
    },
    font: {
      main: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Roboto Mono", monospace',
    }
  },

  simplifica_burlo: {
    primary: {
      main: '#0F6E56', // old: #1B9A75
      dark: '#094637',
      light: '#84c8bb',
    },
    secondary: {
      main: '#FABA59', // old: #FABA59
      dark: '#a77e3d',
      light: '#ffd9a0',
    },
    background: {
      default: '#EDF4F5',
      paper: '#FFFFFF',
    },
    text: { 
      primary: '#1A1A1A', 
      secondary: '#6B7280',
    },
    font: {
      main: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Roboto Mono", monospace',
    }
  },

  smarttour: {
    primary: {
      main: '#3B4CCA',
      dark: '#232D7A',
      light: '#8C98EC',
    },
    secondary: {
      main: '#FF6B57',
      dark: '#B84030',
      light: '#FFA396',
    },
    background: {
      default: '#F5F6FA',
      paper: '#FFFFFF',
    },
    text: { 
      primary: '#12131A',
      secondary: '#5A5E73',
    },
    font: {
      main: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Roboto Mono", monospace',
    }
}
};
