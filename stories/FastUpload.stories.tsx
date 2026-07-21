import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastUpload } from '../packages/components/src/FastUpload';

const meta: Meta<typeof FastUpload> = {
  title: 'Inputs/FastUpload',
  component: FastUpload,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    label: { control: 'text' },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    maxSize: { control: 'number' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    width: { control: 'text' },
    height: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof FastUpload>;

export const Default: Story = {
  args: { label: 'Click to upload', width: '300px' },
};

export const Secondary: Story = {
  args: { ...Default.args, color: 'secondary' },
};

export const ImagesOnly: Story = {
  args: { ...Default.args, label: 'Upload cat photo', accept: 'image/*' },
};

export const Multiple: Story = {
  args: { ...Default.args, label: 'Upload documents', multiple: true, accept: '.pdf,.doc,.txt' },
};

export const WithHelper: Story = {
  args: { ...Default.args, helperText: 'Accepted: JPG, PNG, GIF. Max 5MB.' },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true },
};
