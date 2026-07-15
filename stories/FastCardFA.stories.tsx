import type { Meta, StoryObj } from '@storybook/react';
import { FastCardFA } from '../packages/components/src/FastCardFA';
import { FastButton } from '../packages/components/src/FastButton';
import { Typography, Box } from '@mui/material';

const meta: Meta<typeof FastCardFA> = {
  title: 'Layout/FastCardFA',
  component: FastCardFA,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    inverted: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastCardFA>;

export const Default: Story = {
  args: {
    src: '/cat1.jpg',
    width: 300, height: 420,
    children: (
      <>
        <Typography variant="h6" sx={{ color: 'inherit', fontWeight: 700 }}>Whiskers</Typography>
        <Typography variant="body2" sx={{ color: 'inherit', opacity: 0.85 }}>The fluffiest cat.</Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <FastButton label="Pet" color="primary" width={80} height={30} fontSize={12} />
        </Box>
      </>
    ),
  },
};

export const Inverted: Story = {
  args: { ...Default.args, inverted: true },
};
