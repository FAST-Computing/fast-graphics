import type { Meta, StoryObj } from '@storybook/react';
import { FastRadio } from '../packages/components/src/FastRadio';

const meta: Meta<typeof FastRadio> = {
  title: 'Inputs/FastRadio',
  component: FastRadio,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'number' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastRadio>;

export const Default: Story = {
  args: { label: 'Option A', name: 'group' },
};

export const Selected: Story = {
  args: { ...Default.args, defaultChecked: true },
};

export const Required: Story = {
  args: { ...Default.args, label: 'Required', required: true },
};
