import type { Meta, StoryObj } from '@storybook/react';
import { FastRadio } from '../packages/components/src/FastRadio';
import { Box } from '@mui/material';
import IcecreamIcon from '@mui/icons-material/Icecream';

const meta: Meta<typeof FastRadio> = {
  title: 'Inputs/FastRadio',
  component: FastRadio,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'number' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastRadio>;

export const Default: Story = {
  args: { label: 'Option A', name: 'group' },
};

export const RadioGroup: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <FastRadio color="primary" name="size" label="Small" defaultChecked />
      <FastRadio color="primary" name="size" label="Medium" />
      <FastRadio color="primary" name="size" label="Large" />
    </Box>
  ),
};

