import { createTheme } from '@mui/material/styles';
import { brandTokens } from '../../tokens/dist/index.js';
export function createThemeFromTokens(brand, options = {}) {
    const t = brandTokens[brand];
    const theme = createTheme({
        palette: {
            primary: { main: t.primary, dark: t.primaryDark, light: t.primaryLight },
            secondary: { main: t.secondary },
            background: {
                default: t.background,
                paper: t.backgroundPaper,
            },
            text: {
                primary: t.text.primary,
                secondary: t.text.secondary,
            },
            ...(brand === 'argos' && t.info ? { info: { main: t.info } } : null),
        },
        shape: {
            borderRadius: t.borderRadius,
        },
        spacing: t.spacing,
        typography: {
            fontFamily: t.fontFamily,
        },
    });
    if (!options.withComponentDefaults)
        return theme;
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
//# sourceMappingURL=createThemeFromTokens.js.map