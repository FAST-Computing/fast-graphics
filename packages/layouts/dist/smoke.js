import { createThemeFromTokens } from '../../mui-theme/dist/index.js';
import { brandTokens } from '../../tokens/dist/index.js';
import { DashboardLayout, LandingPageLayout } from './index.js';
// Compile-time smoke test: just ensure modules resolve and basic calls typecheck.
void DashboardLayout;
void LandingPageLayout;
const theme = createThemeFromTokens('corporate');
if (!theme.palette.primary.main) {
    throw new Error('Expected theme.palette.primary.main');
}
// Ensure tokens shape is available.
if (!brandTokens.corporate.primary) {
    throw new Error('Expected brandTokens.corporate.primary');
}
//# sourceMappingURL=smoke.js.map