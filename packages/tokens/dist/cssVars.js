import { brandTokens } from './tokens.js';
/**
 * Returns a CSS string with variables for the given brand.
 * Default selector is `:root[data-theme="<brand>"]` so multiple themes can coexist.
 */
export function generateCssVariables(brand, options = {}) {
    const tokens = brandTokens[brand];
    const selector = options.selector ?? `:root[data-theme="${brand}"]`;
    return `
${selector} {
  --brand-primary: ${tokens.primary};
  --brand-primary-dark: ${tokens.primaryDark};
  --brand-primary-light: ${tokens.primaryLight};
  --brand-secondary: ${tokens.secondary};
  --brand-background: ${tokens.background};
  --brand-background-paper: ${tokens.backgroundPaper};
  --brand-text-primary: ${tokens.text.primary};
  --brand-text-secondary: ${tokens.text.secondary};

  --brand-font-family: ${tokens.fontFamily};
  --brand-font-family-mono: ${tokens.fontFamilyMono};
}
`.trim();
}
export function generateAllCssVariables() {
    return ['corporate', 'argos', 'atlas']
        .map((b) => generateCssVariables(b))
        .join('\n\n');
}
//# sourceMappingURL=cssVars.js.map