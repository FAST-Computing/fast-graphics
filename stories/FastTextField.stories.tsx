import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastTextField } from '../packages/components/src/FastTextField';
import { Box } from '@mui/material';

const meta: Meta<typeof FastTextField> = {
  title: 'Inputs/FastTextField',
  component: FastTextField,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary', 'primaryMain', 'primaryLight', 'primaryDark', 'secondaryMain', 'secondaryLight', 'secondaryDark', 'paper', 'text'] },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    defaultValue: { control: 'text' },
    type: { control: 'radio', options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'] },
    size: { control: 'radio', options: ['small', 'medium'] },
    fullWidth: { control: 'boolean' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    numeric: { control: 'boolean' },
    stepper: { control: 'boolean' },
    width: { control: 'text' },
    height: { control: 'number' },
    step: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    precision: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof FastTextField>;

// --- Legacy API: `placeholder` is the floating label, `label` is the value ---
export const LegacyDefault: Story = {
  args: { placeholder: 'Enter text', width: '300px' },
};

export const LegacyWithValue: Story = {
  args: { placeholder: 'Full name', label: 'Ada Lovelace', width: '300px' },
};

// --- New API: `label` is the floating label, `value`/`defaultValue` the value ---
export const Default: Story = {
  args: { label: 'Full name', defaultValue: 'Ada Lovelace', width: '300px' },
};

export const WithPlaceholder: Story = {
  args: { label: 'Email', placeholder: 'you@example.com', width: '300px' },
};

export const Password: Story = {
  args: { label: 'Password', type: 'password', width: '300px' },
};

export const FullWidth: Story = {
  args: { label: 'Full width', fullWidth: true },
  render: (args) => (
    <Box sx={{ width: 420 }}>
      <FastTextField {...args} />
    </Box>
  ),
};

export const Small: Story = {
  args: { label: 'Search', size: 'small', placeholder: 'Search…', width: '240px' },
};

export const WithEndAdornment: Story = {
  args: { label: 'Amount', endAdornment: <span>€</span>, width: '200px' },
};

export const WithError: Story = {
  args: { label: 'Email', defaultValue: 'not-an-email', errorMessage: 'This field is invalid', width: '300px' },
};

export const Required: Story = {
  args: { label: 'Required', required: true, width: '300px' },
};

export const Numeric: Story = {
  args: { label: 'Age', numeric: true, width: '150px' },
};

export const WithStepper: Story = {
  args: { label: 'Quantity', numeric: true, stepper: true, min: 0, max: 99, width: '160px' },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true, defaultValue: 'Cannot edit', width: '300px' },
};
