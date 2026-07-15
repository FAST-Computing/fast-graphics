import type { Meta, StoryObj } from '@storybook/react';
import { FastTextField } from '../packages/components/src/FastTextField';
import { Box } from '@mui/material';

const meta: Meta<typeof FastTextField> = {
  title: 'Inputs/FastTextField',
  component: FastTextField,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    placeholder: { control: 'text' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
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

export const Default: Story = {
  args: { placeholder: 'Enter text', width: '300px' },
};

export const WithError: Story = {
  args: { ...Default.args, errorMessage: 'This field is invalid' },
};

export const Required: Story = {
  args: { ...Default.args, placeholder: 'Required', required: true },
};

export const Numeric: Story = {
  args: { ...Default.args, placeholder: 'Age', numeric: true, width: '150px' },
};

export const WithStepper: Story = {
  args: { ...Default.args, placeholder: 'Quantity', numeric: true, stepper: true, min: 0, max: 99, width: '160px' },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true, defaultValue: 'Cannot edit' },
};
