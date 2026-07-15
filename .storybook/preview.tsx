import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { FastThemeProvider } from '../packages/components/src/FastThemeProvider';
import '@fontsource/google-sans/latin.css';

const preview: Preview = {
  parameters: {
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
  decorators: [
    (Story) => (
      <FastThemeProvider brand="fast_core">
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      </FastThemeProvider>
    ),
  ],
};

export default preview;
