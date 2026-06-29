import { createTheme } from '@mui/material/styles';
import { brandTokens } from '../../tokens/dist/index.js';
export function createThemeFromTokens(brand, options = {}) {
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