import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastCard } from '../packages/components/src/FastCard';
import { FastButton } from '../packages/components/src/FastButton';
import { Typography, Box } from '@mui/material';

const meta: Meta<typeof FastCard> = {
  title: 'Layout/FastCard',
  component: FastCard,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    inverted: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastCard>;

export const Default: Story = {
  args: {
    width: 360, height: 260,
    children: (
      <>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Meet Whiskers
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, flexGrow: 1 }}>
          A 3-year-old tabby who loves naps, salmon, and knocking things off tables.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <FastButton label="Adopt" color="primary" width={100} height={34} fontSize={13} />
          <FastButton label="Learn more" color="primary" variant="outlined" width={120} height={34} fontSize={13} />
        </Box>
      </>
    ),
  },
};

export const Inverted: Story = {
  args: { ...Default.args, inverted: true },
};
