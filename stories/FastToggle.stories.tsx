import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastToggle } from '../packages/components/src/FastToggle';

const meta: Meta<typeof FastToggle> = {
  title: 'Inputs/FastToggle',
  component: FastToggle,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastToggle>;

export const Default: Story = {
  args: { label: 'Enable notifications' },
};

export const Secondary: Story = {
  args: { ...Default.args, color: 'secondary' },
};

export const Checked: Story = {
  args: { ...Default.args, defaultChecked: true },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true, checked: true },
};
