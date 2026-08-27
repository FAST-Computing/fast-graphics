import type { StorybookConfig } from '@storybook/react-vite';
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from 'path';

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const currentDir = fileURLToPath(new URL('.', import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(ts|tsx)",
  ],
  staticDirs: ['../packages/public'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
  async viteFinal(vite) {
    vite.resolve = vite.resolve || {};
    vite.resolve.alias = {
      ...((vite.resolve?.alias as object) || {}),
      '@fast/tokens': path.resolve(currentDir, '../packages/tokens/src'),
      '@fast/mui-theme': path.resolve(currentDir, '../packages/mui-theme/src'),
      '@fast/components': path.resolve(currentDir, '../packages/components/src'),
    };
    vite.optimizeDeps = vite.optimizeDeps || {};
    vite.optimizeDeps.include = [...(vite.optimizeDeps?.include || []), 'aria-query', 'lz-string', '@testing-library/dom', '@testing-library/jest-dom'];
    return vite;
  },
};
export default config;