import type { Meta, StoryObj } from '@storybook/react';
import { FastThemeProvider } from '../packages/components/src/FastThemeProvider';
import { Typography } from '@mui/material';

const meta: Meta<typeof FastThemeProvider> = {
  title: 'Theme/FastThemeProvider',
  component: FastThemeProvider,
  tags: ['autodocs'],
  argTypes: {
    brand: {
      control: 'select',
      options: ['fast_core', 'fast_argos', 'fast_atlas', 'simplifica_core', 'simplifica_burlo'],
    },
    withCssBaseline: { control: 'boolean' },
    withComponentDefaults: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastThemeProvider>;

export const Default: Story = {
  args: {
    brand: 'fast_core',
    children: (
      <Typography variant="h4" sx={{ color: 'text.primary' }}>
        Hello FAST
      </Typography>
    ),
  },
};

export const Argos: Story = {
  args: {
    ...Default.args,
    brand: 'fast_argos',
  },
};
