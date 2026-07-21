import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastCardFA } from '../packages/components/src/FastCardFA';
import { FastButton } from '../packages/components/src/FastButton';
import { Typography, Box } from '@mui/material';

const IMG =
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=800&fit=crop';

const meta: Meta<typeof FastCardFA> = {
  title: 'Layout/FastCardFA',
  component: FastCardFA,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    inverted: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastCardFA>;

export const Default: Story = {
  args: {
    src: IMG,
    width: 320, height: 440,
    children: (
      <>
        <Typography variant="h6" sx={{ color: 'inherit', fontWeight: 700 }}>
          Whiskers
        </Typography>
        <Typography variant="body2" sx={{ color: 'inherit', opacity: 0.85 }}>
          The fluffiest cat in the neighborhood.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <FastButton label="Pet" color="primary" width={100} height={34} fontSize={13} />
        </Box>
      </>
    ),
  },
};

export const Inverted: Story = {
  args: { ...Default.args, inverted: true },
};
