import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastSlider } from '../packages/components/src/FastSlider';
import { Box } from '@mui/material';

const meta: Meta<typeof FastSlider> = {
  title: 'Inputs/FastSlider',
  component: FastSlider,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    label: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'number' },
    defaultValue: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    valueLabelDisplay: { control: 'radio', options: ['auto', 'on', 'off'] },
  },
};

export default meta;
type Story = StoryObj<typeof FastSlider>;

export const Default: Story = {
  args: { defaultValue: 50, width: '300px' },
};

export const Secondary: Story = {
  args: { ...Default.args, color: 'secondary' },
};

export const WithLabel: Story = {
  args: { ...Default.args, label: 'Volume' },
};

export const WithMarks: Story = {
  args: { ...Default.args, defaultValue: 50, step: 10, marks: true, valueLabelDisplay: 'auto' },
};

export const Disabled: Story = {
  args: { ...Default.args, defaultValue: 30, disabled: true },
};
