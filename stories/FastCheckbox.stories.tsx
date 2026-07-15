import type { Meta, StoryObj } from '@storybook/react';
import { FastCheckbox } from '../packages/components/src/FastCheckbox';

const meta: Meta<typeof FastCheckbox> = {
  title: 'Inputs/FastCheckbox',
  component: FastCheckbox,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'number' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastCheckbox>;

export const Default: Story = {
  args: { label: 'Accept terms' },
};

export const Checked: Story = {
  args: { ...Default.args, defaultChecked: true },
};

export const Required: Story = {
  args: { ...Default.args, label: 'Required', required: true },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true, checked: true, label: 'Disabled' },
};
