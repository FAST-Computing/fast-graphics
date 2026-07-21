export type BrandName = 'fast_core' | 'fast_argos' | 'fast_atlas' | 'simplifica_core' | 'simplifica_burlo' | 'smarttour';
export type BrandTokens = {
    primary: {
        main: string;
        dark: string;
        light: string;
    };
    secondary: {
        main: string;
        dark: string;
        light: string;
    };
    background: {
        default: string;
        paper: string;
    };
    text: {
        primary: string;
        secondary: string;
    };
    font: {
        main: string;
        mono: string;
    };
};
export declare const brandTokens: Record<BrandName, BrandTokens>;
//# sourceMappingURL=tokens.d.ts.map