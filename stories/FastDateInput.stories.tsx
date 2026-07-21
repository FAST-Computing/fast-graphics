import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastDateInput } from '../packages/components/src/FastDateInput';

const meta: Meta<typeof FastDateInput> = {
  title: 'Inputs/FastDateInput',
  component: FastDateInput,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    errorMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    width: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FastDateInput>;

export const Default: Story = {
  args: { placeholder: 'Select date', width: '240px' },
};

export const Secondary: Story = {
  args: { ...Default.args, color: 'secondary' },
};

export const WithValue: Story = {
  args: { ...Default.args, defaultValue: '2026-07-15' },
};

export const Required: Story = {
  args: { ...Default.args, required: true },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true, defaultValue: '2026-07-15' },
};
