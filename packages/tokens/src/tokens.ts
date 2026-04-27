export type BrandName = 'corporate' | 'argos' | 'atlas';

export type BrandTokens = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  background: string;
  backgroundPaper: string;
  text: {
    primary: string;
    secondary: string;
  };
  fontFamily: string;
  fontFamilyMono: string;
  borderRadius: number;
  spacing: number;

  // Optional per-brand extensions
  info?: string;
  sidebarBg?: string;
  sidebarText?: string;
  gradientPrimary?: string;
  gradientHero?: string;
  shadowPrimary?: string;
  shadowElevated?: string;
};

/**
 * Source of truth for brand values.
 * Keep it framework-agnostic: no MUI types, no CSS preprocessor assumptions.
 */
export const brandTokens: Record<BrandName, BrandTokens> = {
  corporate: {
    primary: '#FF6A00',
    primaryDark: '#333000',
    primaryLight: '#632986',
    secondary: '#6c757d',
    background: '#f8f9fa',
    backgroundPaper: '#ffffff',
    text: {
      primary: '#212529',
      secondary: '#6c757d',
    },
    fontFamily:
      '"Montserrat", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilyMono: '"Fira Code", "Roboto Mono", monospace',
    borderRadius: 8,
    spacing: 8,
  },

  argos: {
    primary: '#FF00FF',
    primaryDark: '#1a252f',
    primaryLight: '#34495e',
    secondary: '#95a5a6',
    info: '#3498db',
    background: '#ecf0f1',
    backgroundPaper: '#ffffff',
    sidebarBg: '#2c3e50',
    sidebarText: '#ecf0f1',
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilyMono: '"Roboto Mono", monospace',
    borderRadius: 6,
    spacing: 8,
  },

  atlas: {
    primary: '#334C66',
    primaryDark: '#203244',
    primaryLight: '#507F90',
    secondary: '#FABA59', 
    background: '#BDC7CF', 
    backgroundPaper: '#FFFFFF',
    text: {
      primary: '#203244',
      secondary: '#507F90',
    },
    gradientPrimary: 'linear-gradient(135deg, #334C66 0%, #203244 100%)',
    gradientHero: 'linear-gradient(135deg, #203244 0%, #334C66 50%, #507F90 100%)',
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilyMono: '"Roboto Mono", monospace',
    borderRadius: 12,
    spacing: 8,
    shadowPrimary: '0 8px 24px rgba(32, 50, 68, 0.25)',
    shadowElevated: '0 10px 40px rgba(0, 0, 0, 0.1)',
  },
};
