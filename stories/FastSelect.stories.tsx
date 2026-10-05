import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastSelect } from '../packages/components/src/FastSelect';

const OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'tech', label: 'Technician' },
  { value: 'guest', label: 'Guest (disabled)', disabled: true },
];

const meta: Meta<typeof FastSelect> = {
  title: 'Inputs/FastSelect',
  component: FastSelect,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary', 'primaryMain', 'primaryLight', 'primaryDark', 'secondaryMain', 'secondaryLight', 'secondaryDark', 'paper', 'text'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    width: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FastSelect>;

export const Default: Story = {
  args: { label: 'Role', options: OPTIONS, width: '240px' },
};

export const WithValue: Story = {
  args: { ...Default.args, defaultValue: 'manager' },
};

export const WithHelper: Story = {
  args: { ...Default.args, helperText: 'Choose the user role' },
};

export const WithError: Story = {
  args: { ...Default.args, errorMessage: 'This field is required' },
};

export const Required: Story = {
  args: { ...Default.args, required: true },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true, defaultValue: 'tech' },
};

export const FullWidth: Story = {
  args: { label: 'Role', options: OPTIONS, fullWidth: true },
};
