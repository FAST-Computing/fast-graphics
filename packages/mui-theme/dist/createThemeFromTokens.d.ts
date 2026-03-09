import type { Theme } from '@mui/material/styles';
import { type BrandName } from '../../tokens/dist/index.js';
export type CreateThemeOptions = {
    /** If true, adds a few component defaults that match our layouts. */
    withComponentDefaults?: boolean;
};
export declare function createThemeFromTokens(brand: BrandName, options?: CreateThemeOptions): Theme;
//# sourceMappingURL=createThemeFromTokens.d.ts.map