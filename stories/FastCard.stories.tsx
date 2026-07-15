import type { Meta, StoryObj } from '@storybook/react';
import { FastCard } from '../packages/components/src/FastCard';
import { Typography } from '@mui/material';

const meta: Meta<typeof FastCard> = {
  title: 'Layout/FastCard',
  component: FastCard,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    inverted: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastCard>;

export const Default: Story = {
  args: {
    width: 360, height: 200,
    children: <Typography variant="h6">Card content</Typography>,
  },
};

export const Inverted: Story = {
  args: { ...Default.args, inverted: true },
};
