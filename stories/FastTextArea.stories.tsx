import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastTextArea } from '../packages/components/src/FastTextArea';

const meta: Meta<typeof FastTextArea> = {
  title: 'Inputs/FastTextArea',
  component: FastTextArea,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    placeholder: { control: 'text' },
    width: { control: 'text' },
    rows: { control: 'number' },
    resize: { control: 'radio', options: ['none', 'vertical'] },
    minHeight: { control: 'number' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastTextArea>;

export const Default: Story = {
  args: { placeholder: 'Tell us about your cat', width: '360px', rows: 4 },
};

export const Secondary: Story = {
  args: { ...Default.args, color: 'secondary' },
};

export const WithValue: Story = {
  args: { ...Default.args, defaultValue: 'Whiskers is a 3-year-old tabby who loves naps and salmon.' },
};

export const Required: Story = {
  args: { ...Default.args, placeholder: 'Required field', required: true },
};

export const WithError: Story = {
  args: { ...Default.args, errorMessage: 'This field is required' },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true, defaultValue: 'Cannot edit this text.' },
};

export const Small: Story = {
  args: { ...Default.args, placeholder: 'Short note', rows: 2, width: '280px' },
};
