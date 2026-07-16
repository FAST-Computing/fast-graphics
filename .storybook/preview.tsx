import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { FastThemeProvider } from '../packages/components/src/FastThemeProvider';
import '@fontsource/google-sans/latin.css';

const preview: Preview = {
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  globalTypes: {
    brand: {
      name: 'Brand',
      description: 'Select theme',
      defaultValue: 'fast_core',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'fast_core', title: 'FAST Core' },
          { value: 'fast_argos', title: 'FAST Argos' },
          { value: 'fast_atlas', title: 'FAST Atlas' },
          { value: 'simplifica_core', title: 'Simplifica Core' },
          { value: 'simplifica_burlo', title: 'Simplifica Burlo' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, { globals }) => {
      const brand = (globals as Record<string, string>)?.brand || 'fast_core';
      return (
        <FastThemeProvider brand={brand as any}>
          <div style={{ padding: 24 }}>
            <Story />
          </div>
        </FastThemeProvider>
      );
    },
  ],
};

export default preview;
