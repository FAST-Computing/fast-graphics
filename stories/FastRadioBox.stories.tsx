import type { Meta, StoryObj } from '@storybook/react';
import { FastRadioBox } from '../packages/components/src/FastRadioBox';
import PetsIcon from '@mui/icons-material/Pets';

const meta: Meta<typeof FastRadioBox> = {
  title: 'Inputs/FastRadioBox',
  component: FastRadioBox,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    label: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastRadioBox>;

export const Default: Story = {
  args: { icon: <PetsIcon />, label: 'Cat', name: 'pet', width: 80, height: 80 },
};

export const Selected: Story = {
  args: { ...Default.args, defaultChecked: true },
};

export const Required: Story = {
  args: { ...Default.args, label: 'Required', required: true },
};
