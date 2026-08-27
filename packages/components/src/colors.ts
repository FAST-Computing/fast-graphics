import type { Theme as MuiTheme } from '@mui/material/styles';

export type FastColor =
  | 'primary' | 'secondary'
  | 'primaryMain' | 'primaryLight' | 'primaryDark'
  | 'secondaryMain' | 'secondaryLight' | 'secondaryDark'
  | 'paper' | 'text';

type ColorSet = { main: string; dark: string; light: string; contrastText: string };

export function getColorSet(color: FastColor, theme: MuiTheme, _selected: boolean): ColorSet {
  const p = theme.palette;
  const pc = (c: 'primary' | 'secondary') => {
    const entry = p[c];
    return { main: entry.main, dark: entry.dark, light: entry.light, contrastText: entry.contrastText };
  };

  let base: ColorSet;
  switch (color) {
    case 'primary':
    case 'primaryMain':
      base = pc('primary'); break;
    case 'primaryLight':
      base = { ...pc('primary'), main: p.primary.light, contrastText: p.getContrastText(p.primary.light) }; break;
    case 'primaryDark':
      base = { ...pc('primary'), main: p.primary.dark }; break;
    case 'secondary':
    case 'secondaryMain':
      base = pc('secondary'); break;
    case 'secondaryLight':
      base = { ...pc('secondary'), main: p.secondary.light, contrastText: p.getContrastText(p.secondary.light) }; break;
    case 'secondaryDark':
      base = { ...pc('secondary'), main: p.secondary.dark }; break;
    case 'paper':
      base = { main: p.background.paper, dark: p.text.primary, light: p.background.paper, contrastText: p.text.primary }; break;
    case 'text':
      base = { main: p.text.primary, dark: p.text.primary, light: p.background.paper, contrastText: p.background.paper }; break;
  }

  return base;
}
