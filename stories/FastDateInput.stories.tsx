import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastDateInput } from '../packages/components/src/FastDateInput';

const meta: Meta<typeof FastDateInput> = {
  title: 'Inputs/FastDateInput',
  component: FastDateInput,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary', 'primaryMain', 'primaryLight', 'primaryDark', 'secondaryMain', 'secondaryLight', 'secondaryDark', 'paper', 'text'] },
    mode: { control: 'radio', options: ['date', 'datetime-local'] },
    locale: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    width: { control: 'text' },
    min: { control: false },
    max: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof FastDateInput>;

export const Default: Story = {
  args: { placeholder: 'Select date', width: '240px' },
};

export const WithDateValue: Story = {
  args: { ...Default.args, defaultValue: new Date(2026, 6, 15) },
};

export const WithStringValue: Story = {
  args: { ...Default.args, defaultValue: '2026-07-15' },
};

export const WithMinMax: Story = {
  args: {
    ...Default.args,
    width: '260px',
    min: new Date(2026, 6, 1),
    max: new Date(2026, 6, 31),
    helperText: 'Only July 2026',
  },
};

export const DateTime: Story = {
  args: { ...Default.args, mode: 'datetime-local', placeholder: 'Select date & time', width: '280px' },
};

export const EnglishLocale: Story = {
  args: { ...Default.args, locale: 'en-GB' },
};

export const WithError: Story = {
  args: { ...Default.args, errorMessage: 'This field is invalid' },
};

export const Required: Story = {
  args: { ...Default.args, required: true },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true, defaultValue: new Date(2026, 6, 15) },
};
